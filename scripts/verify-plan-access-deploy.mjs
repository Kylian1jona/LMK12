const base=process.argv[2];
if(!base)throw Error('Deploy URL required');
async function read(name){const response=await fetch(new URL(name,base));if(!response.ok)throw Error(`${name}: HTTP ${response.status}`);return response.text();}
const [html,shell,account]=await Promise.all(['index.html','components/auth-shell.js','components/k12-account.js'].map(read));
if(!html.includes('auth-shell.js?v=plan-access-20261029.1')||!html.includes('k12-account.js?v=plan-access-20261029.1'))throw Error('New scripts are not referenced');
if(!shell.includes('No payment is processed')||!shell.includes('Start plan'))throw Error('Plan confirmation copy missing');
if(/checkoutCardNumber|checkoutExpiry|checkoutCvc|checkoutZip/.test(shell+account))throw Error('Card fields are still required');
if(!account.includes('santa:    { name: "Math + English Plan", price: 12'))throw Error('Plus price mismatch');
if(!account.includes('requestSubscriptionPlan(checkout.planId)'))throw Error('Plan activation is not wired');
console.log(`PASS: ${base} serves card-free plan activation`);
