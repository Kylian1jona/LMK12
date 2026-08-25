const fs=require("node:fs");
const vm=require("node:vm");

const source=fs.readFileSync("components/k12-account.js","utf8");
const checkoutBlock=source.slice(
  source.indexOf("const TEST_CHECKOUT_CARD"),
  source.indexOf("async function confirmPayment")
);
const fields={
  checkoutCardNumber:{value:"4111 1111 1111 1111"},
  checkoutExpiry:{value:"12/99"},
  checkoutCvc:{value:"123"},
  checkoutZip:{value:"12345"}
};
const context={
  $:id=>fields[id] || null,
  PLAN_CATALOG:{},
  checkout:{},
  bootstrap:{Modal:function(){}},
  document:{getElementById(){ return {}; }},
  safeClick(){},
  toast(){}
};

vm.createContext(context);
vm.runInContext(checkoutBlock,context);
const realCardMessage=vm.runInContext("validateTestCheckoutCard()",context);
fields.checkoutCardNumber.value="4242 4242 4242 4242";
fields.checkoutExpiry.value="01/20";
const expiredMessage=vm.runInContext("validateTestCheckoutCard()",context);
fields.checkoutExpiry.value="12/99";
const validMessage=vm.runInContext("validateTestCheckoutCard()",context);
vm.runInContext("clearTestCheckoutCard()",context);

const report={
  realCardRejected:/Real cards are not accepted/.test(realCardMessage),
  expiredCardRejected:/future/.test(expiredMessage),
  testCardAccepted:validMessage==="",
  fieldsCleared:Object.values(fields).every(field=>field.value==="")
};
report.failures=Object.entries(report).filter(([,passed])=>passed===false).map(([name])=>name);
console.log(JSON.stringify(report,null,2));
if(report.failures.length) process.exitCode=1;
