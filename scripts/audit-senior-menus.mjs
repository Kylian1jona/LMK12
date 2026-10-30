import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=process.argv[2]||path.resolve(import.meta.dirname,'..');
const sections=new Map();
for(const grade of ['g11','g12']) for(const subject of ['eng','math','sci','hist']) sections.set(`${grade}-${subject}`,{id:`${grade}-${subject}`,innerHTML:''});
const document={readyState:'loading',addEventListener(){},getElementById:id=>sections.get(id)||null,querySelector:()=>null};
const window={K12Classic25:{ensureGrade:async()=>true}};
const CURR={g11:{},g12:{}};
const context=vm.createContext({window,document,CURR,show(){},safeClick(){},console});
for(const relative of [
  'components/k12-senior-lessons-20261024.js',
  'components/k12-senior-more-20261024.js',
  'components/k12-classic-25-g11.js',
  'components/k12-classic-25-g12.js',
  'components/k12-expanded-grade-menus.js'
]) vm.runInContext(fs.readFileSync(path.join(root,relative),'utf8'),context,{filename:relative});
for(const grade of ['g11','g12']) for(const [subject,expected] of Object.entries({eng:6,math:16,sci:6,hist:6})){
  await window.openExpandedSubject(grade,subject);
  const html=sections.get(`${grade}-${subject}`).innerHTML;
  const standard=(html.match(/onclick="startLesson\('/g)||[]).length;
  const special=(html.match(/onclick="startUnifiedEarlyLesson\('/g)||[]).length;
  if(standard!==expected||special!==({eng:2,math:4,sci:2,hist:2})[subject]) throw Error(`${grade}:${subject} buttons: ${standard} standard, ${special} interactive`);
  if(html.includes('special-format-tag')||html.includes('special-format-box')) throw Error(`${grade}:${subject} still reveals format boxes`);
  console.log(`${grade}:${subject}: ${standard} standard, ${special} interactive`);
}
console.log('PASS: all new lessons appear in the Grade 11 and 12 subject menus');
