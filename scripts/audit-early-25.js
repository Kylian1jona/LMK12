const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");

const root=path.resolve(__dirname,"..");
const context=vm.createContext({window:{K12_EARLY_BANKS:Object.create(null)}});
for(const file of [
  "k12-classic-25-prek.js",
  "k12-classic-25-kindergarten.js",
  "k12-classic-25-g1.js"
]){
  vm.runInContext(fs.readFileSync(path.join(root,"components",file),"utf8"),context,{filename:file});
}

const banks=context.window.K12_EARLY_BANKS;
const failures=[];
for(const [key,record] of Object.entries(banks)){
  if(!record.name) failures.push(`${key} has no lesson name.`);
  if(!Array.isArray(record.questions)||record.questions.length!==25){
    failures.push(`${key} does not contain exactly 25 questions.`);
    continue;
  }
  const prompts=new Set();
  record.questions.forEach((question,index)=>{
    const label=`${key} question ${index+1}`;
    const prompt=String(question.q||"").trim();
    const audio=String(question.audio||"").trim();
    const answer=String(question.answer??"").trim();
    const choices=(question.choices||[]).map(String);
    if(question.type!=="mc") failures.push(`${label} is not an explicit multiple-choice question.`);
    if(!prompt) failures.push(`${label} has no prompt.`);
    if(!answer) failures.push(`${label} has no answer.`);
    if(!audio) failures.push(`${label} has no audio text.`);
    const promptKey=`${prompt.toLowerCase()}\u0000${audio.toLowerCase()}`;
    if(prompts.has(promptKey)) failures.push(`${label} repeats an earlier prompt and audio cue.`);
    prompts.add(promptKey);
    if(choices.length!==4) failures.push(`${label} must contain exactly four choices.`);
    if(!choices.includes(answer)) failures.push(`${label} does not include its answer among the choices.`);
    if(new Set(choices).size!==choices.length) failures.push(`${label} repeats an answer choice.`);
  });
}

const expectedLessons=31;
const report={
  lessons:Object.keys(banks).length,
  questions:Object.values(banks).reduce((sum,record)=>sum+(record.questions?.length||0),0),
  failures
};
if(report.lessons!==expectedLessons) failures.push(`Expected ${expectedLessons} lessons, found ${report.lessons}.`);
console.log(JSON.stringify(report,null,2));
if(failures.length) process.exitCode=1;
