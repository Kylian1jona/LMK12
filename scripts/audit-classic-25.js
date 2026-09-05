const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");

const root=path.resolve(__dirname,"..");
const grades=["g2","g3","g4","g5","g6","g7","g8","g9","g10","g11","g12"];
const context=vm.createContext({window:{}});
context.window=context;
const repairFile=path.join(root,"components","k12-classic-bank-repair.js");
vm.runInContext(fs.readFileSync(repairFile,"utf8"),context,{filename:repairFile});
for(const grade of grades){
  const file=path.join(root,"components",`k12-classic-25-${grade}.js`);
  vm.runInContext(fs.readFileSync(file,"utf8"),context,{filename:file});
}
const curriculumFile=path.join(root,"components","k12-curriculum.js");
vm.runInContext(fs.readFileSync(curriculumFile,"utf8"),context,{filename:curriculumFile});
const numberSenseFile=path.join(root,"components","k12-g2-number-sense-lessons.js");
context.document={readyState:"loading",addEventListener(){},querySelector(){return null;}};
vm.runInContext(fs.readFileSync(numberSenseFile,"utf8"),context,{filename:numberSenseFile});

const data=context.K12_CLASSIC_25_DATA||{};
const failures=[];
const forbidden=/(?:\bTEKS\b|Texas Education Agency|§\s*\d|difficultyBand|sequenceLength|generatorOwnedTrueFalse|Build the skill:|Apply the skill in context:|Mastery defense:)/i;
const prefix=/^(?:Choose the best answer|Select the correct answer|Read carefully and answer|Pick the best response|Think about the lesson and answer|Choose the correct response|Look closely and answer|Select the best response|Answer this question)\s*:/i;

const selectorFiles=[
  "components/grade2-4-sections.js",
  "components/grade5-6-sections.js",
  "components/grade7-10-sections.js",
  "components/history-runner.js"
];
const selectorPattern=/startLesson\('([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\)/g;
const selectorKeys=new Set();
for(const file of selectorFiles){
  const source=fs.readFileSync(path.join(root,file),"utf8");
  for(const match of source.matchAll(selectorPattern)) selectorKeys.add(`${match[1]}:${match[2]}:${match[3]}`);
}
for(const grade of ["g11","g12"]){
  for(const subject of ["eng","math","sci","hist"]){
    for(const lesson of ["L1","L2"]) selectorKeys.add(`${grade}:${subject}:${lesson}`);
  }
}
for(let lesson=8;lesson<=32;lesson++) selectorKeys.add(`g2:math:L${lesson}`);

for(const [key,record] of Object.entries(data)){
  if(!selectorKeys.has(key)) failures.push(`${key} has no lesson button.`);
  if(!record?.name) failures.push(`${key} has no lesson name.`);
  if(!Array.isArray(record?.questions)||record.questions.length!==25){
    failures.push(`${key} does not contain exactly 25 questions.`);
    continue;
  }
  const seen=new Set();
  record.questions.forEach((question,index)=>{
    const label=`${key} question ${index+1}`;
    const prompt=String(question?.q||"").trim();
    const fingerprint=prompt.toLowerCase().replace(/\s+/g," ");
    if(!prompt) failures.push(`${label} has no prompt.`);
    if(seen.has(fingerprint)) failures.push(`${label} repeats an earlier prompt.`);
    seen.add(fingerprint);
    if(prefix.test(prompt)) failures.push(`${label} starts with an instruction prefix.`);
    if(forbidden.test(JSON.stringify(question))) failures.push(`${label} contains removed curriculum code.`);
    if(question.type==="mc"){
      if(!Array.isArray(question.choices)||question.choices.length<2) failures.push(`${label} has invalid choices.`);
      if(!question.choices?.map(String).includes(String(question.answer))) failures.push(`${label} does not include its answer among the choices.`);
      if(new Set(question.choices?.map(value=>String(value).toLowerCase())).size!==question.choices?.length) failures.push(`${label} repeats an answer choice.`);
    }
  });
}
for(const key of selectorKeys){
  if(!data[key]) failures.push(`${key} has no explicit question bank.`);
}

const byGrade=Object.fromEntries(grades.map(grade=>[
  grade,
  Object.keys(data).filter(key=>key.startsWith(`${grade}:`)).length
]));
const report={
  lessons:Object.keys(data).length,
  questions:Object.values(data).reduce((sum,record)=>sum+(record.questions?.length||0),0),
  selectors:selectorKeys.size,
  byGrade,
  failures
};
console.log(JSON.stringify(report,null,2));
if(failures.length) process.exitCode=1;
