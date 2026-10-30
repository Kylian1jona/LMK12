import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=process.argv[2]||path.resolve(import.meta.dirname,'..');
function render(relative,tag){
  const classes=new Map();
  const context={
    HTMLElement:class {constructor(){this.dataset={};this.innerHTML='';}},
    customElements:{define(name,klass){classes.set(name,klass);}}
  };
  vm.runInNewContext(fs.readFileSync(path.join(root,relative),'utf8'),context,{filename:relative});
  const element=new (classes.get(tag))();
  element.connectedCallback();
  return element.innerHTML;
}
const early=render('components/early-sections.js','k12-early-sections');
const grades=render('components/grade2-4-sections.js','k12-grade2-4-sections');
function between(source,start,end){
  const a=source.indexOf(start),b=source.indexOf(end,a);
  if(a<0||b<0) throw Error(`Missing section ${start}`);
  return source.slice(a,b);
}
const prekEnglish=between(early,'id="prek-eng"','id="prek-math"');
const prekMath=between(early,'id="prek-math"','id="kinder"');
const grade2English=between(grades,'id="g2-eng"','id="g2-math"');
for(const [name,html] of [['Pre-K English',prekEnglish],['Pre-K Math',prekMath]]){
  const keys=[...html.matchAll(/data-lesson-key="([^"]+)"/g)].map(match=>match[1]);
  const groups=(html.match(/class="early-lesson-group"/g)||[]).length;
  if(keys.length===0||new Set(keys).size!==keys.length||groups<3) throw Error(`${name} lesson grouping invalid`);
  console.log(`${name}: ${keys.length} distinct lessons in ${groups} groups`);
}
for(let lesson=1;lesson<=12;lesson++){
  if(grade2English.split(`startLesson('g2','eng','L${lesson}')`).length!==2) throw Error(`Grade 2 English L${lesson} missing or duplicated`);
}
if((grade2English.match(/class="lesson-column(?:\s|")/g)||[]).length!==5) throw Error('Grade 2 English group count incorrect');
if(!grade2English.includes("startUnifiedEarlyLesson('g2:eng:format-dropdown','g2-eng')")) throw Error('Dropdown lesson missing');
console.log('Grade 2 English: 12 distinct lessons in four skill groups, plus dropdown lesson');
