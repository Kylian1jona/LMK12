/* Headless Chrome smoke test for the current lesson runner.
   Produces desktop/mobile screenshots in the system temp directory. */
const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");
const WebSocket = require("ws");

const root = path.resolve(__dirname, "..");
const chromePath = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
].find(candidate=>fs.existsSync(candidate));
if(!chromePath) throw new Error("Chrome or Edge is required for the lesson UI smoke test.");

const mimeTypes = {
  ".html":"text/html; charset=utf-8",
  ".js":"text/javascript; charset=utf-8",
  ".css":"text/css; charset=utf-8",
  ".json":"application/json; charset=utf-8",
  ".png":"image/png",
  ".jpg":"image/jpeg",
  ".jpeg":"image/jpeg",
  ".svg":"image/svg+xml",
  ".mp3":"audio/mpeg"
};

function wait(ms){
  return new Promise(resolve=>setTimeout(resolve, ms));
}

async function waitFor(check, timeoutMs=15000){
  const started = Date.now();
  while(Date.now()-started<timeoutMs){
    const value = await check();
    if(value) return value;
    await wait(100);
  }
  throw new Error("Timed out while preparing the lesson UI smoke test.");
}

class CdpClient{
  constructor(url){
    this.socket = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.socket.on("message", raw=>{
      const message = JSON.parse(String(raw));
      if(!message.id) return;
      const pending = this.pending.get(message.id);
      if(!pending) return;
      this.pending.delete(message.id);
      if(message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result);
    });
  }

  async ready(){
    if(this.socket.readyState===WebSocket.OPEN) return;
    await new Promise((resolve,reject)=>{
      this.socket.once("open",resolve);
      this.socket.once("error",reject);
    });
  }

  send(method, params={}){
    const id = this.nextId++;
    return new Promise((resolve,reject)=>{
      this.pending.set(id,{resolve,reject});
      this.socket.send(JSON.stringify({id,method,params}));
    });
  }

  close(){
    this.socket.close();
  }
}

async function evaluate(client, expression){
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise:true,
    returnByValue:true
  });
  if(result.exceptionDetails) throw new Error(result.exceptionDetails.text || "Browser evaluation failed.");
  return result.result.value;
}

async function screenshot(client, file){
  const result = await client.send("Page.captureScreenshot", {
    format:"png",
    captureBeyondViewport:true,
    fromSurface:true
  });
  fs.writeFileSync(file, Buffer.from(result.data, "base64"));
}

async function main(){
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "learnmaster-chrome-"));
  const outputDir = path.join(os.tmpdir(), "learnmaster-ui-smoke");
  fs.mkdirSync(outputDir, {recursive:true});

  const server = http.createServer((request,response)=>{
    const pathname = decodeURIComponent(String(request.url || "/").split("?")[0]);
    const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const target = path.resolve(root, relative);
    if(target!==root&&!target.startsWith(`${root}${path.sep}`)){
      response.writeHead(403).end("Forbidden");
      return;
    }
    fs.readFile(target,(error,data)=>{
      if(error){
        response.writeHead(error.code==="ENOENT"?404:500).end(error.code==="ENOENT"?"Not found":"Server error");
        return;
      }
      response.writeHead(200,{"Content-Type":mimeTypes[path.extname(target).toLowerCase()]||"application/octet-stream"});
      response.end(data);
    });
  });
  await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
  const appPort = server.address().port;

  const chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-port=0",
    `--user-data-dir=${profile}`,
    "about:blank"
  ], {stdio:"ignore", windowsHide:true});

  let client;
  try{
    const debugFile = path.join(profile,"DevToolsActivePort");
    const debugPort = await waitFor(()=>{
      if(!fs.existsSync(debugFile)) return 0;
      return Number(fs.readFileSync(debugFile,"utf8").split(/\r?\n/)[0])||0;
    });
    const target = await (await fetch(`http://127.0.0.1:${debugPort}/json/new?http://127.0.0.1:${appPort}/`, {method:"PUT"})).json();
    client = new CdpClient(target.webSocketDebuggerUrl);
    await client.ready();
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Emulation.setDeviceMetricsOverride", {
      width:1440,
      height:900,
      deviceScaleFactor:1,
      mobile:false
    });

    await waitFor(async()=>{
      try{
        return await evaluate(client, `document.readyState==="complete" && typeof startLesson==="function" && window.K12CurrentLessons?.count?.()===627`);
      }catch(error){
        return false;
      }
    },30000);

    await evaluate(client, `(()=>{
      loggedIn = true;
      gateAllowedSection = ()=>true;
      document.getElementById("loginWall")?.remove();
      document.querySelector("k12-site-footer")?.remove();
      startLesson("g2","eng","L1");
      window.scrollTo(0,0);
      return true;
    })()`);
    await wait(300);

    const collect = `(()=>({
      width:window.innerWidth,
      scrollWidth:document.documentElement.scrollWidth,
      question:document.getElementById("lrQuestion")?.textContent?.trim(),
      questionTop:Math.round(document.getElementById("lrQuestion")?.getBoundingClientRect().top||0),
      panelWidth:Math.round(document.getElementById("lrQuestionPanel")?.getBoundingClientRect().width||0),
      choiceCount:document.querySelectorAll("#lrChoices .choice-btn").length,
      choices:[...document.querySelectorAll("#lrChoices .choice-btn")].map(button=>{
        const rect=button.getBoundingClientRect();
        return {width:Math.round(rect.width),top:Math.round(rect.top),bottom:Math.round(rect.bottom)};
      }),
      selectorCount:document.querySelectorAll("button[data-lesson-id]").length,
      catalogCount:window.K12CurrentLessons?.count?.(),
      loggedIn,
      homeClass:document.getElementById("home")?.className,
      runnerClass:document.getElementById("lessonRunner")?.className,
      homeDisplay:getComputedStyle(document.getElementById("home")).display,
      runnerDisplay:getComputedStyle(document.getElementById("lessonRunner")).display,
      selectorFailures:window.K12_CURRENT_LESSONS_AUDIT?.invalidSelectors||[],
      releaseFailures:window.LEARNMASTER_CURRICULUM_RELEASE_AUDIT?.failures||[]
    }))()`;
    const desktop = await evaluate(client, collect);
    const desktopFile = path.join(outputDir,"lesson-desktop.png");
    await screenshot(client,desktopFile);

    await client.send("Emulation.setDeviceMetricsOverride", {
      width:390,
      height:844,
      deviceScaleFactor:1,
      mobile:true
    });
    await evaluate(client, "window.scrollTo(0,0)");
    await wait(250);
    const mobile = await evaluate(client, collect);
    const mobileFile = path.join(outputDir,"lesson-mobile.png");
    await screenshot(client,mobileFile);

    await client.send("Emulation.setDeviceMetricsOverride", {
      width:1440,
      height:900,
      deviceScaleFactor:1,
      mobile:false
    });
    await evaluate(client, `show("g2-eng"); window.scrollTo(0,0)`);
    await wait(250);
    const collectSelector = `(()=>( {
      width:window.innerWidth,
      scrollWidth:document.documentElement.scrollWidth,
      sectionDisplay:getComputedStyle(document.getElementById("g2-eng")).display,
      columnCount:document.querySelectorAll("#g2-eng .lesson-column").length,
      lessonButtonCount:document.querySelectorAll("#g2-eng button[data-lesson-id]").length,
      catalogLessonCount:window.K12CurrentLessons.entries().filter(entry=>entry.grade==="g2"&&entry.subject==="eng").length,
      firstLesson:document.querySelector("#g2-eng button[data-lesson-id]")?.textContent?.replace(/\\s+/g," ").trim()
    }))()`;
    const selectorDesktop = await evaluate(client, collectSelector);
    const selectorDesktopFile = path.join(outputDir,"selector-desktop.png");
    await screenshot(client,selectorDesktopFile);

    await client.send("Emulation.setDeviceMetricsOverride", {
      width:390,
      height:844,
      deviceScaleFactor:1,
      mobile:true
    });
    await evaluate(client, "window.scrollTo(0,0)");
    await wait(250);
    const selectorMobile = await evaluate(client, collectSelector);
    const selectorMobileFile = path.join(outputDir,"selector-mobile.png");
    await screenshot(client,selectorMobileFile);

    const forbidden = /^(?:undefined\b|Question \d+ of 25\b|Build the skill:|Apply the skill in context:|Use two clues and reason:|Error analysis:|Evidence synthesis:|Multi-condition reasoning:|Challenge review:|Mastery defense:)/i;
    const failures = [];
    if(desktop.catalogCount!==627||desktop.selectorCount!==627) failures.push("The current catalog or selector count is not 627.");
    if(desktop.choiceCount!==4) failures.push("The sample lesson did not render four answer choices.");
    if(new Set(desktop.choices.map(choice=>choice.top)).size!==2) failures.push("Desktop answer choices are not arranged in two balanced rows.");
    if([...desktop.choices,...mobile.choices].some(choice=>choice.width<150)) failures.push("An answer choice is too narrow to read comfortably.");
    if(desktop.questionTop<=0||desktop.panelWidth<=0||mobile.questionTop<=0||mobile.panelWidth<=0) failures.push("The lesson screen is not visibly rendered.");
    if(desktop.scrollWidth>desktop.width||mobile.scrollWidth>mobile.width) failures.push("The lesson screen has horizontal overflow.");
    if(forbidden.test(desktop.question||"")) failures.push("The visible question still has a generated prefix.");
    if(desktop.selectorFailures.length||desktop.releaseFailures.length) failures.push("Runtime selector or release validation failed.");
    if(mobile.questionTop>580) failures.push(`The mobile question begins too low in the viewport (${mobile.questionTop}px).`);
    if(selectorDesktop.sectionDisplay==="none"||selectorMobile.sectionDisplay==="none") failures.push("The lesson selector screen is not visibly rendered.");
    if(selectorDesktop.lessonButtonCount!==selectorDesktop.catalogLessonCount||selectorDesktop.firstLesson!=="Nouns & Verbs") failures.push("The Grade 2 English selector does not show the current lesson labels.");
    if(selectorDesktop.scrollWidth>selectorDesktop.width||selectorMobile.scrollWidth>selectorMobile.width) failures.push("The lesson selector screen has horizontal overflow.");

    process.stdout.write(`${JSON.stringify({
      desktop,
      mobile,
      selector:{desktop:selectorDesktop,mobile:selectorMobile},
      screenshots:{
        desktop:desktopFile,
        mobile:mobileFile,
        selectorDesktop:selectorDesktopFile,
        selectorMobile:selectorMobileFile
      },
      failures
    },null,2)}\n`);
    if(failures.length) process.exitCode=1;
  }finally{
    client?.close();
    chrome.kill();
    await new Promise(resolve=>server.close(resolve));
    await Promise.race([
      new Promise(resolve=>chrome.once("exit",resolve)),
      wait(1500)
    ]);
    if(path.resolve(profile).startsWith(path.resolve(os.tmpdir())+path.sep)){
      try{
        fs.rmSync(profile,{recursive:true,force:true,maxRetries:10,retryDelay:100});
      }catch(error){
        if(error?.code!=="EPERM") throw error;
      }
    }
  }
}

main().catch(error=>{
  console.error(error);
  process.exitCode=1;
});
