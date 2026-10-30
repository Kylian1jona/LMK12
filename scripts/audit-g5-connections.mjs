import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=process.argv[2]||path.resolve(import.meta.dirname,'..');
const window={};
const listeners={};
const menus=Object.fromEntries(['eng','math','sci'].map(subject=>[`#g5-${subject} .lesson-columns`,{dataset:{},children:[],appendChild(child){this.children.push(child);}}]));
const document={readyState:'loading',addEventListener(name,callback){listeners[name]=callback;},querySelector:selector=>menus[selector]||null,createElement:()=>({className:'',innerHTML:''})};
const context=vm.createContext({window,document});
for(const relative of ['components/k12-g5-connections-20261029.js','components/k12-classic-25-g5.js']){
  vm.runInContext(fs.readFileSync(path.join(root,relative),'utf8'),context,{filename:relative});
}
window.K12AddGrade5Connections();
listeners.DOMContentLoaded?.();
const data=window.K12_CLASSIC_25_DATA;
const fresh=Object.entries(data).filter(([,record])=>record.contentVersion==='g5-connections-20261029.2');
if(fresh.length!==30)throw Error(`Expected 30 new lessons; found ${fresh.length}`);
for(const subject of ['eng','math','sci']){
  const lessons=fresh.filter(([key])=>key.startsWith(`g5:${subject}:`));
  if(lessons.length!==10)throw Error(`${subject} has ${lessons.length} new lessons`);
  const menu=menus[`#g5-${subject} .lesson-columns`];
  if(menu.children.length!==2||menu.children.some(column=>(column.innerHTML.match(/startLesson\('g5'/g)||[]).length!==5))throw Error(`${subject} menu does not show all 10 lessons`);
  for(const [key,lesson] of lessons){
    if(lesson.questions.length!==25)throw Error(`${key} has ${lesson.questions.length} questions`);
    const types=new Set(lesson.questions.map(q=>q.type));
    if([...['mc','dropdown','selectall','drag','fill']].some(type=>!types.has(type)))throw Error(`${key} is missing a format`);
    for(const [index,q] of lesson.questions.entries()){
      if(!q.q)throw Error(`${key} Q${index+1} has no prompt`);
      if(q.q.includes('Solve both Grade 5 prompts'))throw Error(`${key} Q${index+1} has the old prompt prefix`);
      if(['mc','dropdown'].includes(q.type)&&(!q.choices.includes(q.answer)||new Set(q.choices).size!==4))throw Error(`${key} Q${index+1} choices invalid`);
      if(q.type==='selectall'&&(q.choices.length!==6||new Set(q.choices).size!==6||q.answers.length!==2||!q.answers.every(answer=>q.choices.includes(answer))))throw Error(`${key} Q${index+1} select-two invalid`);
      if(q.type==='drag'&&(q.pairs.length!==4||new Set(q.pairs.map(pair=>pair.match)).size!==4))throw Error(`${key} Q${index+1} matching invalid`);
      if(q.type==='fill'&&(!q.answer||!q.q.includes('____')))throw Error(`${key} Q${index+1} fill-in invalid`);
    }
  }
  console.log(`g5:${subject}: 10 lessons, 250 questions, five formats each`);
}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(!html.includes('k12-g5-connections-20261029.js'))throw Error('Grade 5 extension is not linked');
console.log('PASS: 30 Grade 5 lessons, 750 questions, with drag-and-drop and fill-ins in every lesson');
