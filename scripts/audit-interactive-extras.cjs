const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
const exercise=require('./lab-test-helper.cjs');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1360,height:1040}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(process.env.TEST_URL||'http://127.0.0.1:8765',{waitUntil:'networkidle'});
  await page.evaluate(()=>{loggedIn=true;document.getElementById('loginWall').style.display='none';document.body.classList.remove('login-open');gateAllowedSection=()=>true;show('grades');});
  await page.click('#extrasTab');await page.click('[data-open=labs]');
  for(let level=0;level<3;level++)for(let index=0;index<10;index++){
    await page.click(`[data-level="${level}"][data-lesson="${index}"]`);
    await exercise(page,level,index);
    if(level===0&&index===0){
      await page.locator('.bench').scrollIntoViewIfNeeded();
      await page.screenshot({path:'labs-desktop.png'});
      await page.setViewportSize({width:390,height:844});
      await page.locator('.bench-layout').scrollIntoViewIfNeeded();
      await page.screenshot({path:'labs-mobile.png'});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'No horizontal overflow on phone');
      await page.setViewportSize({width:1360,height:1040});
    }
    await page.click('[data-back]');
    console.log(`Interactive lab ${level*10+index+1}/30 passed.`);
  }
  assert.deepEqual(errors,[]);
  console.log('All 30 labs passed: prediction, live controls, distinct trials, goal checks, evidence, conclusion, progress and mobile layout.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
