const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const account=fs.readFileSync('components/k12-account.js','utf8');
const shell=fs.readFileSync('components/auth-shell.js','utf8');
assert.ok(!/checkoutCardNumber|checkoutExpiry|checkoutCvc|checkoutZip|4242 4242/.test(shell+account),'Card entry should not be required');
assert.ok(shell.includes('No payment is processed'),'Plan confirmation must describe billing accurately');
const start=account.indexOf('async function confirmPayment()');
const end=account.indexOf('/* ===========================',start);
assert.ok(start>=0&&end>start);
let requested='',shown='';
const fields={payErr:{textContent:''},checkoutConfirmButton:{disabled:false,textContent:''}};
const context={
  $:id=>fields[id]||null,
  checkout:{planId:'santa'},
  PLAN_CATALOG:{santa:{name:'Math + English Plan'}},
  safeClick(){},
  async requestSubscriptionPlan(plan){requested=plan;return {ok:true};},
  bootstrap:{Modal:{getInstance(){return {hide(){}}}}},
  document:{getElementById(){return {}; }},
  applyAccessUI(){},updateUserUI(){},hidePaywall(){},
  show(page){shown=page;},toast(){},speakGlobal(){}
};
vm.createContext(context);
vm.runInContext(account.slice(start,end),context);
vm.runInContext('confirmPayment()',context).then(()=>{
  assert.equal(requested,'santa');
  assert.equal(shown,'home');
  assert.equal(fields.payErr.textContent,'');
  console.log('PASS: plan starts without card fields or payment processing');
}).catch(error=>{console.error(error);process.exitCode=1;});
