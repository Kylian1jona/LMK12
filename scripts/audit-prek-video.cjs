const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(process.env.TEST_URL||'http://127.0.0.1:8766',{waitUntil:'networkidle'});
    await page.evaluate(()=>{loggedIn=true;document.getElementById('loginWall').style.display='none';document.body.classList.remove('login-open');gateAllowedSection=()=>true;show('prek');});
    const video=page.locator('#prek .prek-welcome-video video');
    await video.waitFor();
    assert.equal(await video.getAttribute('controls'),'');
    assert.equal(await video.getAttribute('playsinline'),'');
    await page.waitForFunction(()=>document.querySelector('#prek video').readyState>=1);
    const media=await video.evaluate(el=>({duration:el.duration,width:el.videoWidth,height:el.videoHeight,source:el.currentSrc}));
    assert.ok(media.duration>0&&media.width>0&&media.height>0);
    assert.match(media.source,/draft-media\/prek-welcome\.mp4/);
    await video.evaluate(async el=>{el.muted=true;await el.play();});
    await page.waitForTimeout(250);
    assert.equal(await video.evaluate(el=>el.paused),false);
    await page.setViewportSize({width:390,height:844});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    assert.deepEqual(errors,[]);
    console.log(`Pre-K video passed: ${media.width}x${media.height}, ${media.duration.toFixed(1)} seconds, playable on desktop and phone layout.`);
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
