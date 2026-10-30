import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=process.argv[2]||path.resolve(import.meta.dirname,'..');
const window={};
const context=vm.createContext({window});
for(const file of [
  'components/k12-senior-lessons-20261024.js',
  'components/k12-classic-25-g11.js',
  'components/k12-classic-25-g12.js'
]) vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
const all=window.K12_CLASSIC_25_DATA;
const newEntries=Object.entries(all).filter(([,v])=>v.contentVersion==='senior-20261024.1');
for(const grade of ['g11','g12']){
  const entries=newEntries.filter(([key])=>key.startsWith(`${grade}:`));
  if(entries.length!==10) throw Error(`${grade} has ${entries.length} new lessons`);
  const bySubject={};
  for(const [key,lesson] of entries){
    const [,subject]=key.split(':');
    bySubject[subject]=(bySubject[subject]||0)+1;
    if(lesson.questions.length!==25) throw Error(`${key}: ${lesson.questions.length} questions`);
    if(!lesson.name||!lesson.topic) throw Error(`${key}: missing display text`);
    for(const [i,q] of lesson.questions.entries()){
      if(q.type!=='mc'||!q.q||!q.explain||!q.audio||q.choices.length!==4||new Set(q.choices).size!==4||!q.choices.includes(q.answer)) throw Error(`${key} Q${i+1} invalid`);
    }
  }
  if(JSON.stringify(bySubject)!==JSON.stringify({math:4,eng:2,sci:2,hist:2})) throw Error(`${grade}: wrong subject mix ${JSON.stringify(bySubject)}`);
  console.log(`${grade}: 10 new lessons, 250 questions, ${JSON.stringify(bySubject)}`);
}
if(newEntries.length!==20) throw Error(`Expected 20 new lessons, found ${newEntries.length}`);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(!html.includes('components/k12-senior-lessons-20261024.js?v=20261024.1')) throw Error('Extension is not loaded by index.html');
const log=fs.readFileSync(path.join(root,'components/auth-shell.js'),'utf8');
if(!log.includes('20 new Grade 11 and 12 lessons')) throw Error('Update log is missing');
console.log('PASS: 20 lessons and 500 valid multiple-choice questions; script and update log linked');
