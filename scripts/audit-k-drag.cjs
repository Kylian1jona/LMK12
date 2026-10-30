const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const context=vm.createContext({window:{K12_EARLY_BANKS:Object.create(null)}});
vm.runInContext(fs.readFileSync(path.join(root,'components/k12-k-drag-lessons.js'),'utf8'),context);
const banks=context.window.K12_EARLY_BANKS;
const menu=fs.readFileSync(path.join(root,'components/early-sections.js'),'utf8');
const failures=[];
for(const [key,lesson] of Object.entries(banks)){
  if(!menu.includes(`lessonCard("${key}"`))failures.push(`${key}: missing menu card`);
  if(lesson.questions.length!==25)failures.push(`${key}: expected 25 rounds`);
  const sets=new Set();
  for(const [index,question] of lesson.questions.entries()){
    const label=`${key} round ${index+1}`;
    if(question.type!=='drag'||question.categories.length!==3||question.options.length!==9)failures.push(`${label}: expected three groups and nine cards`);
    const categories=new Set(question.categories.map(item=>item.id));
    const texts=new Set(question.options.map(item=>item.text));
    if(texts.size!==9)failures.push(`${label}: repeated card text`);
    if(question.options.some(item=>!categories.has(item.category)))failures.push(`${label}: invalid group`);
    if(question.categories.some(category=>question.options.filter(item=>item.category===category.id).length!==3))failures.push(`${label}: each group needs three cards`);
    const signature=question.options.map(item=>`${item.category}:${item.text}`).sort().join('|');
    if(sets.has(signature))failures.push(`${label}: repeated card set`);
    sets.add(signature);
  }
}
if(Object.keys(banks).length!==8)failures.push(`Expected eight lessons, found ${Object.keys(banks).length}`);
console.log(JSON.stringify({lessons:Object.keys(banks).length,rounds:Object.values(banks).reduce((sum,lesson)=>sum+lesson.questions.length,0),failures},null,2));
if(failures.length)process.exitCode=1;
