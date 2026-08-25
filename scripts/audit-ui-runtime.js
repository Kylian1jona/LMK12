const fs=require("node:fs");
const path=require("node:path");

const root=path.resolve(__dirname,"..");
const componentFiles=fs.readdirSync(path.join(root,"components"))
  .filter(file=>file.endsWith(".js"))
  .map(file=>`components/${file}`);
const files=["index.html","k12.js",...componentFiles];
const source=files.map(file=>fs.readFileSync(path.join(root,file),"utf8")).join("\n");
const failures=[];

const handlers=[...source.matchAll(/\bon(?:click|change|input|submit|keydown)=["']\s*([A-Za-z_$][\w$]*)\s*\(/g)]
  .map(match=>match[1])
  .filter(name=>name!=="if");
const definitions=new Set([
  ...[...source.matchAll(/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(match=>match[1]),
  ...[...source.matchAll(/\bwindow\.([A-Za-z_$][\w$]*)\s*=/g)].map(match=>match[1])
]);
for(const handler of new Set(handlers)){
  if(!definitions.has(handler)) failures.push(`Inline handler ${handler} is not defined.`);
}

const index=fs.readFileSync(path.join(root,"index.html"),"utf8");
const assets=[...index.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
  .map(match=>match[1].split("?")[0])
  .filter(value=>value&&!value.startsWith("#")&&!/^https?:/.test(value));
for(const asset of assets){
  if(!fs.existsSync(path.join(root,asset))) failures.push(`Missing local asset ${asset}.`);
}

const css=fs.readFileSync(path.join(root,"k12.css"),"utf8");
let cssDepth=0;
for(const character of css){
  if(character==="{") cssDepth++;
  if(character==="}") cssDepth--;
  if(cssDepth<0){ failures.push("Stylesheet has an unmatched closing brace."); break; }
}
if(cssDepth!==0) failures.push("Stylesheet braces are unbalanced.");

function sourceDeclaresId(id){
  const escaped=id.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  const literalId=new RegExp(`\\bid=["']${escaped}["']`);
  const dynamicSubjectPage=new RegExp(`\\bsubjectPage\\(\\s*["']${escaped}["']`);
  return literalId.test(source)||dynamicSubjectPage.test(source);
}

const newSectionIds=["prek-eng","prek-math","kinder-eng","kinder-math","g1-eng","g1-math","paymentStatus"];
const requiredIds=["home","grades","reading","settings","analysis","shop","playground","lessonRunner","lrQuestion","lrChoices","lrNextBtn","subscriptionPaywallStatus","checkoutConfirmButton","checkoutCardNumber","checkoutExpiry","checkoutCvc","checkoutZip",...newSectionIds];
for(const id of requiredIds){
  if(!sourceDeclaresId(id)) failures.push(`Required UI element #${id} is missing.`);
}

const progressSource=fs.readFileSync(path.join(root,"components","k12-progress-ui.js"),"utf8");
const visibleSectionsMatch=progressSource.match(/\bconst\s+sections\s*=\s*\[([\s\S]*?)\]\s*;/);
if(!visibleSectionsMatch){
  failures.push("Visible-section navigation list could not be found.");
}else{
  const visibleSectionIds=new Set(
    [...visibleSectionsMatch[1].matchAll(/["']([^"']+)["']/g)].map(match=>match[1])
  );
  for(const id of newSectionIds){
    if(!visibleSectionIds.has(id)) failures.push(`Required UI section #${id} is not registered for navigation.`);
  }
}

for(const legacyId of ["early-bank","prek-add","prek-count","prek-shapes","k-syll-count","k-syll-build","k-rhymes","g1-addsub","g1-graphs","g1-money"]){
  if(progressSource.includes(`"${legacyId}"`)) failures.push(`Legacy navigation target ${legacyId} is still active.`);
}

const requiredHandlers=["openPaymentStatusPage","renderPaymentStatusPage","saveAdminPaymentStatus","requestSubscriptionPlan","refreshSubscriptionAccess","enforceSubscriptionAccess","setVoiceName","previewVoice"];
for(const handler of requiredHandlers){
  if(!definitions.has(handler)) failures.push(`Required UI handler ${handler} is not defined.`);
}

const authShell=fs.readFileSync(path.join(root,"components","auth-shell.js"),"utf8");
for(const legacyCardId of ["cardNumber","cardExpiry","cardCVC","cardZip"]){
  if(new RegExp(`\\bid=["']${legacyCardId}["']`).test(authShell)) failures.push(`Legacy card entry field #${legacyCardId} is still rendered.`);
}

const accountSource=fs.readFileSync(path.join(root,"components","k12-account.js"),"utf8");
const mainNav=fs.readFileSync(path.join(root,"components","main-nav.js"),"utf8");
if((mainNav.match(/navigateFromAppMenu\(['"]shop['"]\)/g)||[]).length<2) failures.push("Shop is not restored in both desktop and drawer navigation.");
if(/#grades[^{}]*#cardShop[^{}]*\{[^{}]*display\s*:\s*none/i.test(css)) failures.push("The Shop grade card is still hidden by CSS.");
if(!/sectionId\s*===\s*["']shop["']\)\s*return\s+true/.test(accountSource)) failures.push("Signed-in learners cannot navigate to the restored Shop without a subject plan.");
if(!/function\s+shopAllowed\s*\(\)\s*\{\s*return\s+Boolean\(loggedIn\)/.test(progressSource)) failures.push("The restored Shop is still tied to paid subject access.");

const graceMigration=fs.readFileSync(path.join(root,"supabase","migrations","202608230001_add_automatic_access_grace.sql"),"utf8");
if(!/payment_status\s*=\s*['"]active['"][\s\S]{0,180}payment_due_on\s*=\s*current_date\s*\+\s*30/.test(graceMigration)) failures.push("Plan selection does not start automatic non-Stripe access.");
if(!/current_date\s*<=\s*profile_due_on\s*\+\s*14/.test(graceMigration)) failures.push("The subscription migration is missing its 14-day grace rule.");

const lessonCoreSource=fs.readFileSync(path.join(root,"components","k12-lesson-core.js"),"utf8");
if(!/function\s+requireLessonSubjectAccess\s*\(/.test(lessonCoreSource)) failures.push("Lesson entry is missing its subscription guard.");
if(!/function\s+launchLessonPack\s*\([^)]*\)\s*\{\s*if\s*\(\s*!requireLessonSubjectAccess\(subj\)\s*\)/.test(lessonCoreSource)) failures.push("Lesson launch does not enforce subject access.");
if(!/sectionId\s*===\s*["']lessonRunner["'][\s\S]{0,240}subjectAllowed\(activeLessonSubject\)/.test(accountSource)) failures.push("Lesson runner navigation is not tied to the active paid subject.");
if(!/function\s+subjectAllowed\s*\([^)]*\)\s*\{\s*const\s+subjects\s*=\s*authoritativeSubscriptionSubjects\(\)/.test(accountSource)) failures.push("Subject access is not derived from the server-authoritative plan.");
if(!/dataset\.choiceCount\s*=\s*Array\.isArray\(q\.choices\)/.test(lessonCoreSource)) failures.push("Lesson answers are missing their dynamic choice-count layout marker.");
if(!/#lrChoices\[data-choice-count=["']3["']\][\s\S]{0,220}grid-column\s*:\s*1\s*\/\s*-1/.test(css)) failures.push("Three-choice lessons do not give the last answer a full-width row.");
if(!/#lrChoices\[data-choice-count=["']5["']\][\s\S]{0,220}grid-column\s*:\s*1\s*\/\s*-1/.test(css)) failures.push("Five-choice lessons do not show the last answer on a full-width row.");
if(!/const\s+TEST_CHECKOUT_CARD\s*=\s*["']4242424242424242["']/.test(accountSource)) failures.push("The checkout is not restricted to the standard test card.");
if(!/clearTestCheckoutCard\(\);[\s\S]{0,280}requestSubscriptionPlan\(checkout\.planId\)/.test(accountSource)) failures.push("Test-card fields are not cleared before the plan request.");
if(/requestSubscriptionPlan\([^)]*(?:Card|Expiry|Cvc|Zip)/.test(accountSource)) failures.push("Card-field data is being passed into the subscription request.");
for(const legacyPaymentToken of ["learnmaster_last_payment_v1","validCardLike","PROMO_CODES","pendingNewKid","finishPaidKidAdd","openCheckout(\"member\")"]){
  if(accountSource.includes(legacyPaymentToken)) failures.push(`Legacy local-payment code ${legacyPaymentToken} is still present.`);
}

const report={
  files:files.length,
  inlineHandlers:new Set(handlers).size,
  localAssets:assets.length,
  requiredIds:requiredIds.length,
  requiredSections:newSectionIds.length,
  requiredHandlers:requiredHandlers.length,
  failures
};
console.log(JSON.stringify(report,null,2));
if(failures.length) process.exitCode=1;
