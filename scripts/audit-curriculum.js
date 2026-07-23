const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const files = [
  "components/k12-helpers.js",
  "components/k12-governance.js",
  "components/k12-lesson-core.js",
  "components/k12-generators-g2-g3.js",
  "components/k12-generators-g4.js",
  "components/k12-generators-g5-g6.js",
  "components/k12-generators-g7-g10.js",
  "components/k12-curriculum.js",
  "components/k12-mastery-tools.js",
  "components/k12-history-progression.js",
  "components/k12-spelling-lessons.js",
  "components/k12-secondary-g7-progression.js",
  "components/k12-secondary-g8-progression.js",
  "components/k12-secondary-g9-progression.js",
  "components/k12-secondary-g10-progression.js",
  "components/k12-teks-contracts.js",
  "components/k12-curriculum-release.js"
].filter(file=>fs.existsSync(path.join(root, file)));

const quietConsole = {
  log(){}, info(){}, warn(){},
  error(...args){ process.stderr.write(`${args.join(" ")}\n`); }
};
const context = vm.createContext({
  console: quietConsole,
  Math,
  JSON,
  Date,
  Set,
  Map,
  structuredClone,
  setTimeout(){ return 0; },
  clearTimeout(){},
  setInterval(){ return 0; },
  clearInterval(){},
  window: {},
  document: {
    getElementById(){ return null; },
    querySelector(){ return null; },
    querySelectorAll(){ return []; },
    createElement(){ return {}; },
    body: { appendChild(){} }
  },
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} }
});
context.window = context;

for(const file of files){
  const source = fs.readFileSync(path.join(root, file), "utf8");
  vm.runInContext(source, context, { filename:file });
}

const auditSource = `(() => {
  const failures=[];
  const warnings=[];
  const totals={lessons:0,questions:0,trueFalse:0,byGrade:{},bySubject:{}};
  const badFiller=/unsupported conclusion|unrelated meaning|random guess|fictional planet|only map colors/i;
  const masterySignal=/mastery|evaluate|analy|justify|synthesi|defend|verify|compare|evidence|error|reason|multi-step|multiple conditions/i;
  const expectationPattern=/^§\\d+\\.\\d+\\([bcd]\\)\\(\\d+\\)(?:\\([A-Za-z0-9]+\\))*$/;
  const signature=q=>JSON.stringify([
    String(q.q||"").replace(/\\s+/g," ").trim(),
    q.answer,
    Array.isArray(q.answers)?[...q.answers].map(String).sort():null,
    Array.isArray(q.items)?q.items.map(String):null,
    Array.isArray(q.pairs)?q.pairs:null,
    Array.isArray(q.choices)?[...q.choices].map(String).sort():null
  ]);

  for(const [grade,subjects] of Object.entries(CURR)){
    for(const [subject,lessons] of Object.entries(subjects||{})){
      if(!lessons||typeof lessons!=="object") continue;
      for(const [lessonId,pack] of Object.entries(lessons)){
        if(lessonId==="showName"||!pack||typeof pack!=="object") continue;
        const key=grade+":"+subject+":"+lessonId;
        totals.lessons++;
        totals.byGrade[grade]=(totals.byGrade[grade]||0)+1;
        totals.bySubject[subject]=(totals.bySubject[subject]||0)+1;
        if(typeof pack.gen!=="function"){
          failures.push(key+" has no generator");
          continue;
        }

        const expectedCourse=TEKS_COURSES[grade]?.[subject];
        const expectation=String(pack.teks?.expectation||"").replace(/^Â(?=§)/,"");
        if(!expectedCourse) failures.push(key+" has no TEKS course contract");
        if(expectedCourse&&pack.teks?.code!==expectedCourse[0]) failures.push(key+" is assigned to "+String(pack.teks?.code)+" instead of "+expectedCourse[0]);
        if(!expectationPattern.test(expectation)) failures.push(key+" has an invalid TEKS student-expectation code: "+String(pack.teks?.expectation));
        if(expectedCourse&&expectation&&!expectation.startsWith(expectedCourse[0]+"(")) failures.push(key+" expectation "+expectation+" does not belong to "+expectedCourse[0]);
        if(!pack.teks?.expectationText) failures.push(key+" has no TEKS expectation text");
        if(!/tea\\.texas\\.gov/i.test(String(pack.teks?.source||""))) failures.push(key+" has no official TEA source");
        if(pack.image) failures.push(key+" still exposes a lesson image");
        if(pack.curriculumRelease!==window.LEARNMASTER_CURRICULUM_RELEASE) failures.push(key+" is not from the current curriculum release");
        if(pack.releaseVerified!==true) failures.push(key+" did not pass the release guard");

        const seen=new Set();
        const tiers=[];
        let explicitTrueFalse=0;
        for(let round=1;round<=25;round++){
          LR.round=round;
          let q;
          try{ q=pack.gen(); }
          catch(error){ failures.push(key+" round "+round+" threw: "+error.message); continue; }
          totals.questions++;
          if(!q||typeof q!=="object"||!String(q.q||"").trim()){
            failures.push(key+" round "+round+" returned no question");
            continue;
          }

          const tier=Number(q.difficulty);
          const expected=Math.ceil(round/5);
          const stage=["Foundation","Apply","Reason","Challenge","Mastery"][expected-1];
          tiers.push(tier);
          if(tier!==expected) failures.push(key+" round "+round+" has difficulty "+tier+" instead of "+expected);
          if(q.difficultyLabel!==stage) failures.push(key+" round "+round+" has stage "+String(q.difficultyLabel)+" instead of "+stage);

          if(q.type==="truefalse"){
            explicitTrueFalse++;
            totals.trueFalse++;
            if(typeof q.answer!=="boolean") failures.push(key+" round "+round+" true/false answer is not boolean");
          }
          if(q.type==="mc"||q.type==="speed"){
            const choices=(q.choices||[]).map(String);
            if(choices.length!==4) failures.push(key+" round "+round+" has "+choices.length+" choices instead of 4");
            if(new Set(choices).size!==choices.length) failures.push(key+" round "+round+" has duplicate choices");
            if(!choices.includes(String(q.answer))) failures.push(key+" round "+round+" choices omit the answer");
          }

          if(badFiller.test(JSON.stringify(q))) failures.push(key+" round "+round+" contains generic filler content");
          const explanation=String(q.explain||q.explanation||"").replace(/\\s+/g," ").trim();
          if(explanation.length<20) failures.push(key+" round "+round+" has no question-specific explanation");
          if(q.image) failures.push(key+" round "+round+" still exposes a question image");
          if(round>20&&!masterySignal.test(String(q.q||"")+" "+explanation)) failures.push(key+" round "+round+" does not require mastery-level reasoning");
          if(q.curriculumRelease!==window.LEARNMASTER_CURRICULUM_RELEASE) failures.push(key+" round "+round+" is not from the current curriculum release");

          const sig=signature(q);
          if(seen.has(sig)) failures.push(key+" round "+round+" duplicates an earlier question");
          seen.add(sig);
          try{
            const repeated=pack.gen();
            if(signature(repeated)!==sig) failures.push(key+" round "+round+" is nondeterministic or draws from a shared/random pool");
          }catch(error){
            failures.push(key+" round "+round+" failed its deterministic repeat check: "+error.message);
          }
        }
        if(seen.size!==25) failures.push(key+" exposes only "+seen.size+" distinct questions");
        if(explicitTrueFalse===0) failures.push(key+" has no generator-authored true/false question");
        if(tiers.some((tier,index)=>index&&tier<tiers[index-1])) failures.push(key+" difficulty is not progressive");
      }
    }
  }

  if(totals.lessons!==627) failures.push("Expected 627 lessons; found "+totals.lessons);
  if(totals.questions!==15675) failures.push("Expected 15,675 questions; found "+totals.questions);
  if((totals.bySubject.hist||0)!==45) failures.push("Expected 45 generator-owned history lessons; found "+(totals.bySubject.hist||0));
  const release=window.LEARNMASTER_CURRICULUM_RELEASE_AUDIT;
  if(!release||release.failures?.length) failures.push("The final curriculum release guard did not pass cleanly");
  return {totals,failures,warnings,contract:window.LEARNMASTER_TEKS_AUDIT,release};
})()`;

const result = vm.runInContext(auditSource, context, { filename:"curriculum-audit.vm.js" });
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if(result.failures.length) process.exitCode = 1;
