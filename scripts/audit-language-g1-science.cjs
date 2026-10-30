const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');

(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(60000);
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(process.env.TEST_URL||'http://127.0.0.1:8767',{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>typeof show==='function'&&typeof setLanguage==='function'&&window.K12_EARLY_BANKS);
    await page.evaluate(()=>{
      loggedIn=true;
      document.getElementById('loginWall').style.display='none';
      document.body.classList.remove('login-open');
      gateAllowedSection=()=>true;
      requireLessonSubjectAccess=()=>true;
      show('grade1');
    });
    const scienceButton=page.locator('#grade1 [data-subject="sci"]');
    await scienceButton.waitFor();
    assert.equal(await scienceButton.innerText(),'Science');
    await scienceButton.click();
    assert.equal(await page.locator('#g1-sci .early-lesson-card').count(),6);
    assert.equal(await page.locator('#g1-sci h1').innerText(),'Grade 1 Science');
    const bankSummary=await page.evaluate(()=>Object.fromEntries(Object.entries(K12_EARLY_BANKS).filter(([key])=>key.startsWith('g1:sci:')).map(([key,bank])=>[key,bank.questions.length])));
    assert.equal(Object.keys(bankSummary).length,6);
    assert.ok(Object.values(bankSummary).every(count=>count===25));

    const expected={es:'Ciencias de 1.er grado',fr:'Sciences — niveau 1',zh:'一年级科学',hi:'कक्षा 1 विज्ञान'};
    for(const [language,title] of Object.entries(expected)){
      await page.evaluate(language=>setLanguage(language),language);
      await page.waitForFunction(text=>document.querySelector('#g1-sci h1')?.textContent.trim()===text,title);
      assert.equal(await page.locator('#g1-sci h1').innerText(),title);
      assert.equal(await page.evaluate(()=>document.documentElement.lang),language==='zh'?'zh-Hans':language);
    }
    await page.evaluate(()=>setLanguage('en'));
    await page.locator('#g1-sci .early-lesson-card').first().click();
    await page.waitForFunction(()=>typeof LR!=='undefined'&&LR.current&&document.querySelector('#lrQuestion')?.textContent.trim());
    assert.equal(await page.evaluate(()=>LR.total),25);
    await page.evaluate(()=>lrPick(LR.current.answer));
    assert.match(await page.locator('#lrFb').innerText(),/correct/i);
    await page.setViewportSize({width:390,height:844});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    assert.deepEqual(errors,[]);
    console.log('PASS: five-language switching, Grade 1 Science route, 6 banks, 150 questions, scoring, and phone layout.');
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
