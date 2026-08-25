const fs=require("node:fs");
const vm=require("node:vm");

const source=fs.readFileSync("components/k12-lesson-core.js","utf8");
const context={
  window:{},
  document:{
    addEventListener(){},
    getElementById(){ return null; },
    querySelector(){ return null; },
    querySelectorAll(){ return []; }
  },
  console,
  setTimeout(){ return 0; },
  clearTimeout(){},
  setInterval(){ return 0; },
  clearInterval(){},
  speechSynthesis:{cancel(){}},
  bootstrap:{},
  Image:function(){}
};
context.window.addEventListener=()=>{};
vm.createContext(context);
vm.runInContext(source,context,{filename:"k12-lesson-core.js"});

function normalize(question){
  context.auditQuestion=structuredClone(question);
  return vm.runInContext("normalizeLessonQuestion(auditQuestion,{name:'Audit lesson'})",context);
}
const three=normalize({type:"mc",q:"What is in Pam's bag?",choices:["apple","book","hat"],answer:"apple"});
const five=normalize({type:"mc",q:"Choose one.",choices:["A","B","C","D","E"],answer:"E"});
context.auditAnswer="apple";
context.auditWrongs=["book","hat"];
const legacy=vm.runInContext("fourChoices(auditAnswer,auditWrongs)",context);
const sameMembers=(actual,expected)=>actual.length===expected.length&&expected.every(choice=>actual.includes(choice));
const report={
  threeChoicesPreserved:sameMembers(three.choices,["apple","book","hat"]),
  fiveChoicesPreserved:sameMembers(five.choices,["A","B","C","D","E"]),
  legacyThreeChoiceNotPadded:sameMembers(legacy,["apple","book","hat"]),
  noFiller:[...three.choices,...five.choices,...legacy].every(choice=>!/^(?:Almost|Not this one|Review the clue|Try another answer|Keep thinking)$/i.test(choice))
};
report.failures=Object.entries(report).filter(([,passed])=>passed===false).map(([name])=>name);
console.log(JSON.stringify(report,null,2));
if(report.failures.length) process.exitCode=1;
