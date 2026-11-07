const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");

const root=path.resolve(__dirname,"..");
const context=vm.createContext({window:{K12_EARLY_BANKS:Object.create(null)}});
for(const file of [
  "k12-classic-25-prek.js",
  "k12-classic-25-kindergarten.js",
  "k12-classic-25-g1.js",
  "k12-early-expanded-lessons.js",
  "k12-prek-more-20261101.js",
  "k12-early-more-20261101.js",
  "k12-early-more-20261101b.js",
  "k12-prek-20-lessons.js",
  "k12-g1-regular-lessons.js",
  "k12-g1-english-more-20261031.js",
  "k12-g1-english-more-20261031b.js",
  "k12-k-regular-lessons.js",
  "k12-interactive-math-lessons.js"
]){
  vm.runInContext(fs.readFileSync(path.join(root,"components",file),"utf8"),context,{filename:file});
}

const banks=context.window.K12_EARLY_BANKS;
const failures=[];
const menuSource=fs.readFileSync(path.join(root,"components","early-sections.js"),"utf8");
const lessonButtons=[...menuSource.matchAll(/lessonCard\("([^"]+)"/g)]
  .map(match=>match[1]).filter(key=>!key.includes(":sort-"));
for(const key of lessonButtons){
  if(!banks[key]) failures.push(`${key} has a lesson button but no question bank.`);
}
for(const prefix of ["prek:","g1:"]){
  const visible=lessonButtons.filter(key=>key.startsWith(prefix));
  const expectedVisible=prefix==="g1:"?119:96;
  if(visible.length!==expectedVisible) failures.push(`${prefix.slice(0,-1)} should show ${expectedVisible} requested lessons, found ${visible.length}.`);
  if(new Set(visible).size!==visible.length) failures.push(`${prefix.slice(0,-1)} repeats a lesson button.`);
}
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
    const interactive=["block-add","number-line","fraction-build"].includes(question.type);
    const choicesQuestion=["mc","dropdown"].includes(question.type);
    const matching=question.type==="drag";
    if(!choicesQuestion&&!interactive&&!matching) failures.push(`${label} has an unsupported question type.`);
    if(!prompt) failures.push(`${label} has no prompt.`);
    if(!matching&&!answer) failures.push(`${label} has no answer.`);
    if(!audio) failures.push(`${label} has no audio text.`);
    const promptKey=`${prompt.toLowerCase()}\u0000${audio.toLowerCase()}\u0000${choices.join("\u0000").toLowerCase()}\u0000${matching&&!question.pairs?(question.options||[]).map(option=>option.text).sort().join("\u0000").toLowerCase():""}`;
    if(prompts.has(promptKey)) failures.push(`${label} repeats an earlier prompt and audio cue.`);
    prompts.add(promptKey);
    if(choicesQuestion&&(choices.length<3||choices.length>5)) failures.push(`${label} must contain three, four, or five choices.`);
    if(choices.some(choice=>/^(?:almost|placeholder|none of (?:these|the above))$/i.test(choice.trim()))) failures.push(`${label} contains a filler answer choice.`);
    if(choicesQuestion&&!choices.includes(answer)) failures.push(`${label} does not include its answer among the choices.`);
    if(matching&&question.pairs&&(!Array.isArray(question.pairs)||question.pairs.length<3||question.pairs.some(pair=>!pair.word||!pair.match))) failures.push(`${label} needs valid matching pairs.`);
    if(matching&&!question.pairs&&(!Array.isArray(question.categories)||question.categories.length!==3||!Array.isArray(question.options)||question.options.length!==9||new Set(question.options.map(option=>option.id)).size!==9||question.categories.some(category=>question.options.filter(option=>option.category===category.id).length!==3))) failures.push(`${label} needs nine cards in three valid categories.`);
    if(new Set(choices).size!==choices.length) failures.push(`${label} repeats an answer choice.`);
    if(question.blend){
      if(!Array.isArray(question.blend.letters)||question.blend.letters.length!==3) failures.push(`${label} must contain exactly three blending letters.`);
      if(!Array.isArray(question.blend.sounds)||question.blend.sounds.length!==3||question.blend.sounds.some(sound=>!String(sound||"").trim())) failures.push(`${label} must contain exactly three spoken sound cues.`);
      if(String(question.blend.word||"")!==answer) failures.push(`${label} blending word does not match its answer.`);
    }
  });
}

const gradeOneScience=Object.keys(banks).filter(key=>key.startsWith("g1:sci:"));
if(gradeOneScience.length!==23) failures.push(`Expected 23 Grade 1 science lessons, found ${gradeOneScience.length}.`);
const expectedLessons=298;
const report={
  lessons:Object.keys(banks).length,
  questions:Object.values(banks).reduce((sum,record)=>sum+(record.questions?.length||0),0),
  failures
};
if(report.lessons!==expectedLessons) failures.push(`Expected ${expectedLessons} lessons, found ${report.lessons}.`);
console.log(JSON.stringify(report,null,2));
if(failures.length) process.exitCode=1;
