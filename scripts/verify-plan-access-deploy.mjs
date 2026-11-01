const base=process.argv[2];
if(!base)throw Error('Deploy URL required');
async function read(name){const response=await fetch(new URL(name,base));if(!response.ok)throw Error(`${name}: HTTP ${response.status}`);return response.text();}
const [html,shell,account]=await Promise.all(['index.html','components/auth-shell.js','components/k12-account.js'].map(read));
if(!html.includes('auth-shell.js?v=')||!html.includes('k12-account.js?v='))throw Error('Auth scripts are not referenced');
if(!shell.includes('No payment is processed')||!shell.includes('Start plan'))throw Error('Plan confirmation copy missing');
for(const [id,value] of [['checkoutCardNumber','4242 4242 4242 4242'],['checkoutExpiry','12/30'],['checkoutCvc','123'],['checkoutZip','12345']])if(!shell.includes(`id="${id}" type="text" value="${value}" readonly`))throw Error(`${id} is not prefilled and read only`);
if(!account.includes('santa:    { name: "Math + English Plan", price: 12'))throw Error('Plus price mismatch');
if(!account.includes('requestSubscriptionPlan(checkout.planId)'))throw Error('Plan activation is not wired');
console.log(`PASS: ${base} serves trial-card selection for all plans`);
