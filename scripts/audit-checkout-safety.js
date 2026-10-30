const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const account=fs.readFileSync('components/k12-account.js','utf8');
const shell=fs.readFileSync('components/auth-shell.js','utf8');
for(const [id,value] of [['checkoutCardNumber','4242 4242 4242 4242'],['checkoutExpiry','12/30'],['checkoutCvc','123'],['checkoutZip','12345']]){
  assert.ok(shell.includes(`id="${id}"`));
  assert.ok(shell.includes(`value="${value}" readonly`),`${id} should show a trial value and reject real card entry`);
}
assert.ok(shell.includes('No payment is processed'),'Plan confirmation must describe billing accurately');
for(const plan of ['elf','santa','reindeer'])assert.ok(shell.includes(`openCheckout('${plan}')`));
assert.ok(!/requestSubscriptionPlan\([^)]*(?:Card|Expiry|Cvc|Zip)/.test(account),'Card details must not be sent to the plan service');
const start=account.indexOf('async function confirmPayment()');
const end=account.indexOf('/* ===========================',start);
assert.ok(start>=0&&end>start);
const requested=[];let shown='';
const fields={payErr:{textContent:''},checkoutConfirmButton:{disabled:false,textContent:''}};
const context={
  $:id=>fields[id]||null,
  checkout:{planId:'elf'},
  PLAN_CATALOG:{elf:{name:'English Plan'},santa:{name:'Math + English Plan'},reindeer:{name:'All Subjects'}},
  safeClick(){},
  async requestSubscriptionPlan(plan){requested.push(plan);return {ok:true};},
  bootstrap:{Modal:{getInstance(){return {hide(){}}}}},
  document:{getElementById(){return {}; }},
  applyAccessUI(){},updateUserUI(){},hidePaywall(){},
  show(page){shown=page;},toast(){},speakGlobal(){}
};
vm.createContext(context);
vm.runInContext(account.slice(start,end),context);
Promise.all(['elf','santa','reindeer'].map(async plan=>{
  context.checkout.planId=plan;
  await vm.runInContext('confirmPayment()',context);
})).then(()=>{
  assert.deepEqual(requested,['elf','santa','reindeer']);
  assert.equal(shown,'home');
  assert.equal(fields.payErr.textContent,'');
  console.log('PASS: Starter, Plus, and Max use readonly trial card details; plan starts without payment processing');
}).catch(error=>{console.error(error);process.exitCode=1;});
