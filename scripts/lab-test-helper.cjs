const assert=require('node:assert/strict');
module.exports=async function exerciseLab(page,level,index){
  await page.locator('[data-run]').click();
  assert.match(await page.locator('.bench-message').innerText(),/prediction/i);
  assert.equal(await page.locator('[data-conclusion="0"]').isDisabled(),true);
  await page.fill('#benchPrediction','Changing the condition will change what I observe.');
  await page.locator('[data-run]').click();
  assert.equal(await page.locator('[data-conclusion="0"]').isDisabled(),true);
  if(level===1&&index===2){
    for(const b of await page.locator('[data-part]').all())await b.click();
    await page.locator('[data-switch]').click();
    assert.match(await page.locator('.bench-note').innerText(),/complete/);
  }else if(level===2&&index===7){await page.locator('[data-tare]').click();}
  else if(level===0&&index===2){await page.selectOption('[data-control=material]','1');}
  else {
    await page.locator('[data-control]').first().evaluate((el,ratio)=>{el.value=el.tagName==='SELECT'?String(el.options.length-1):ratio?'0.273':el.max;el.dispatchEvent(new Event('input',{bubbles:true}));},level===2&&index===6);
  }
  await page.locator('[data-run]').click();
  if(level===2&&index===1)await page.locator('[data-run]').click();
  assert.equal(await page.locator('[data-conclusion="0"]').isDisabled(),false,`Lab ${level}:${index} should unlock after its experiment goal`);
  assert.ok(await page.locator('.bench-notebook tbody tr').count()>=2);
  await page.locator('[data-conclusion="1"]').click();
  assert.equal(await page.locator('#extrasNext').isDisabled(),true);
  await page.locator('[data-conclusion="0"]').click();
  assert.equal(await page.locator('#extrasNext').isDisabled(),false);
};
