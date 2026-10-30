import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=process.argv[2]||path.resolve(import.meta.dirname,'..');
const window={};
const context=vm.createContext({window});
for(const relative of [
  'components/k12-senior-lessons-20261024.js',
  'components/k12-senior-more-20261024.js',
  'components/k12-classic-25-g11.js',
  'components/k12-classic-25-g12.js',
  'components/k12-special-format-lessons.js',
  'components/k12-g8-special-formats.js'
]) vm.runInContext(fs.readFileSync(path.join(root,relative),'utf8'),context,{filename:relative});
const standard=Object.entries(window.K12_CLASSIC_25_DATA).filter(([,v])=>v.contentVersion==='senior-more-20261024.1');
const special=Object.entries(window.K12_EARLY_BANKS).filter(([,v])=>v.contentVersion==='senior-more-20261024.1');
if(standard.length!==20||special.length!==20||window.K12_SENIOR_SPECIAL_FORMATS.length!==20) throw Error(`Wrong counts ${standard.length}/${special.length}`);
for(const grade of ['g11','g12']){
  if(standard.filter(([key])=>key.startsWith(grade+':')).length!==10) throw Error(`${grade} standard count`);
  if(special.filter(([key])=>key.startsWith(grade+':')).length!==10) throw Error(`${grade} special count`);
}
for(const [key,record] of [...standard,...special]){
  if(record.questions.length!==25) throw Error(`${key} has ${record.questions.length} questions`);
  if(/checkbox|dropdown|drag|matching|ranking|special/i.test(record.name)) throw Error(`${key} has a format-based title`);
  for(const [i,q] of record.questions.entries()){
    if(!q.q) throw Error(`${key} Q${i+1}: no prompt`);
    if(['mc','dropdown'].includes(q.type)&&(!Array.isArray(q.choices)||new Set(q.choices).size!==q.choices.length||!q.choices.includes(q.answer))) throw Error(`${key} Q${i+1}: bad choices`);
    if(q.type==='selectall'&&(!Array.isArray(q.choices)||q.choices.length!==6||new Set(q.choices).size!==6||q.answers.length!==2||!q.answers.every(a=>q.choices.includes(a))||q.requiredSelections!==2)) throw Error(`${key} Q${i+1}: bad checkbox`);
    if(q.type==='drag'&&(!Array.isArray(q.pairs)||q.pairs.length!==4||new Set(q.pairs.map(p=>p.match)).size!==4)) throw Error(`${key} Q${i+1}: bad matching`);
    if(q.type==='ranking'&&(!Array.isArray(q.items)||q.items.length!==5||new Set(q.items).size!==5||q.items.some((item,j)=>j&&Number(item)<=Number(q.items[j-1])))) throw Error(`${key} Q${i+1}: bad ranking`);
  }
}
for(const item of [...window.K12_G8_SPECIAL_FORMATS,...window.K12_SENIOR_SPECIAL_FORMATS]){
  if(/checkbox|dropdown|drag|matching|ranking|special/i.test(item.title)) throw Error(`Format-based menu title: ${item.title}`);
}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(!html.includes('k12-senior-more-20261024.js?v=20261024.1')||!html.includes('k12-expanded-grade-menus.js?v=mixed-lessons-20261029.1')) throw Error('New scripts are not linked');
const log=fs.readFileSync(path.join(root,'components/auth-shell.js'),'utf8');
if(!log.includes('40 more Grade 11 and 12 lessons')) throw Error('Update log missing');
console.log('PASS: 20 standard + 20 interactive lessons, 1,000 valid questions, clean names, update log');
