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
const requiredIds=["home","grades","reading","settings","analysis","shop","playground","lessonRunner","lrQuestion","lrChoices","lrNextBtn","subscriptionPaywallStatus","checkoutConfirmButton",...newSectionIds];
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

const requiredHandlers=["openPaymentStatusPage","renderPaymentStatusPage","saveAdminPaymentStatus","requestSubscriptionPlan","refreshSubscriptionAccess","enforceSubscriptionAccess"];
for(const handler of requiredHandlers){
  if(!definitions.has(handler)) failures.push(`Required UI handler ${handler} is not defined.`);
}

const authShell=fs.readFileSync(path.join(root,"components","auth-shell.js"),"utf8");
for(const legacyCardId of ["cardNumber","cardExpiry","cardCVC","cardZip"]){
  if(new RegExp(`\\bid=["']${legacyCardId}["']`).test(authShell)) failures.push(`Legacy card entry field #${legacyCardId} is still rendered.`);
}

const accountSource=fs.readFileSync(path.join(root,"components","k12-account.js"),"utf8");
const lessonCoreSource=fs.readFileSync(path.join(root,"components","k12-lesson-core.js"),"utf8");
if(!/function\s+requireLessonSubjectAccess\s*\(/.test(lessonCoreSource)) failures.push("Lesson entry is missing its subscription guard.");
if(!/function\s+launchLessonPack\s*\([^)]*\)\s*\{\s*if\s*\(\s*!requireLessonSubjectAccess\(subj\)\s*\)/.test(lessonCoreSource)) failures.push("Lesson launch does not enforce subject access.");
if(!/sectionId\s*===\s*["']lessonRunner["'][\s\S]{0,240}subjectAllowed\(activeLessonSubject\)/.test(accountSource)) failures.push("Lesson runner navigation is not tied to the active paid subject.");
if(!/function\s+subjectAllowed\s*\([^)]*\)\s*\{\s*const\s+subjects\s*=\s*authoritativeSubscriptionSubjects\(\)/.test(accountSource)) failures.push("Subject access is not derived from the server-authoritative plan.");
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
