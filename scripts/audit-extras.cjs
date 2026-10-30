// Run with Playwright available, or set PLAYWRIGHT_PATH to its installation.
const {chromium} = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname,'..');
(async () => {
  const browser = await chromium.launch({headless:true, ...(process.env.BROWSER_PATH ? {executablePath:process.env.BROWSER_PATH} : {})});
  try {
    const page = await browser.newPage({viewport:{width:1280,height:1000}});
    const errors=[]; page.on('pageerror',error => errors.push(error.message));
    await page.setContent('<html><head><style>.d-none{display:none!important}body{margin:20px;font-family:Arial}</style></head><body><k12-core-sections></k12-core-sections></body></html>');
    await page.addStyleTag({path:path.join(root,'k12.css')});
    await page.addScriptTag({path:path.join(root,'components/core-sections.js')});
    await page.addScriptTag({path:path.join(root,'components/extras-lab-bench.js')});
    await page.evaluate(() => {document.querySelectorAll('.section').forEach(el => el.classList.add('d-none'));document.querySelector('#grades').classList.remove('d-none');});
    await page.addScriptTag({path:path.join(root,'components/k12-extras.js')});
    await page.click('#extrasTab');
    assert.equal(await page.locator('.extras-card').count(),7);
    assert.equal(await page.locator('#extrasGradePanel').isVisible(),false);
    await page.focus('#extrasTab'); await page.keyboard.press('ArrowLeft');
    assert.equal(await page.locator('#extrasGradePanel').isVisible(),true);
    await page.keyboard.press('ArrowRight');
    await page.click('[data-open="spelling"]');
    assert.equal(await page.locator('.extras-course-resume').count(),1);
    assert.equal(await page.locator('.extras-group-progress').count(),3);
    await page.click('[data-level="0"][data-lesson="0"]');
    await page.click('[data-all]');
    assert.equal(await page.locator('[data-continue]').getAttribute('data-continue'),'spelling');
    assert.equal(await page.locator('[data-continue]').getAttribute('data-lesson'),'0');
    const words=[
      ['cat','ship','rain','tree','light','jump','clock','green','smile','bright'],
      ['because','friend','careful','running','happiness','teacher','quickly','knowing','beautiful','surprise'],
      ['necessary','separate','accommodate','conscience','perseverance','achievement','environment','rhythm','recommend','independent']
    ];
    let completed=0;
    const studioIds=process.env.EXTRAS_IDS ? process.env.EXTRAS_IDS.split(',') : ['spelling','typing','lifeskills','money','labs','handwriting','tracing'];
    for (const id of studioIds) {
      const levelCount=id==='typing'?5:3;
      for (let level=0;level<levelCount;level++) {
        await page.click(`[data-open="${id}"]`);
        for(let index=0;index<10;index++) {
          await page.click(`[data-level="${level}"][data-lesson="${index}"]`);
          assert.equal(await page.locator('#extrasNext').isDisabled(),true);
          if(id==='spelling') {
            await page.fill('#extrasAnswer','wrong'); await page.locator('#extrasForm button').click();
            assert.equal(await page.locator('#extrasNext').isDisabled(),true);
            await page.fill('#extrasAnswer',words[level][index]); await page.locator('#extrasForm button').click();
          } else if(id==='typing') {
            if(level===0&&index===0) {
              assert.ok(await page.locator('.extras-keyboard [data-key]').count() >= 45);
              assert.equal(await page.locator('.extras-keyboard .is-next').count(),1);
            }
            if(level===4&&index===3) assert.match(await page.locator('.extras-typing-goals').innerText(),/15 WPM/);
            await page.fill('#extrasType','wrong');
            assert.equal(await page.locator('#extrasNext').isDisabled(),true);
            await page.fill('#extrasType',await page.locator('.extras-type-target').innerText());
            assert.match(await page.locator('.extras-stars').innerText(),/★/);
          } else if(id==='handwriting'||id==='tracing') {
            await page.click('#extrasDrawDone');
            assert.equal(await page.locator('#extrasNext').isDisabled(),true);
            await page.locator('#extrasCanvas').scrollIntoViewIfNeeded();
            const box=await page.locator('#extrasCanvas').boundingBox();
            const drawAttempt=async() => {
              await page.mouse.move(box.x+20,box.y+box.height*.3); await page.mouse.down();
              for(let step=1;step<=24;step++) await page.mouse.move(box.x+20+(box.width-40)*step/24,box.y+box.height*(step%2?.72:.28));
              await page.mouse.up();
            };
            if(index===0) {
              await drawAttempt();
              await page.click('#extrasUndo'); await page.click('#extrasDrawDone');
              assert.equal(await page.locator('#extrasNext').isDisabled(),true);
            }
            await drawAttempt();
            await page.click('#extrasDrawDone');
          } else if(id==='labs') {
            await require('./lab-test-helper.cjs')(page,level,index);
          } else {
            const answer=id==='money'? index%3 : id==='labs' ? 0 : [[0,1,2,0,1,0,0,1,2,0],[2,0,1,2,0,1,2,0,0,1],[1,2,0,1,2,2,0,1,0,0]][level][index];
            await page.click(`[data-choice="${(answer+1)%3}"]`);
            assert.equal(await page.locator('#extrasNext').isDisabled(),true);
            await page.click(`[data-choice="${answer}"]`);
          }
          assert.equal(await page.locator('#extrasNext').isEnabled(),true,`${id} level ${level} lesson ${index+1}: ${await page.locator('#extrasFeedback').innerText()} ${await page.locator('#extrasDrawResult').count() ? await page.locator('#extrasDrawResult').innerText() : ''}`);
          completed++;
          if(index<9) await page.click('[data-back]');
          else await page.click('#extrasNext');
        }
        assert.match(await page.locator('.extras-finish h2').innerText(),/complete/);
        await page.click('#extrasHome');
      }
    }
    await page.screenshot({path:path.join(process.env.TEMP || root,'lmk-extras-desktop.png'),fullPage:true});
    await page.setViewportSize({width:390,height:844});
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),true,'Mobile library overflow');
    await page.screenshot({path:path.join(process.env.TEMP || root,'lmk-extras-mobile.png'),fullPage:true});
    await page.click('[data-open="typing"]');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),true,'Mobile studio overflow');
    assert.deepEqual(errors,[]);
    const expected=studioIds.reduce((sum,id) => sum+(id==='typing'?50:30),0);
    assert.equal(completed,expected);
    console.log(JSON.stringify({studios:studioIds.length,typingLessons:studioIds.includes('typing')?50:0,completedActivities:completed,mobileOverflow:false,pageErrors:errors}));
  } finally {await browser.close();}
})().catch(error => {console.error(error);process.exitCode=1;});
