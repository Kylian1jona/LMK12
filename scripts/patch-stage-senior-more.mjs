import fs from 'node:fs';
import path from 'node:path';

const stage=process.argv[2];
if(!stage||!fs.existsSync(path.join(stage,'index.html'))) throw Error('Prepared live stage required');
const root=path.resolve(import.meta.dirname,'..');
fs.copyFileSync(path.join(root,'components/k12-senior-more-20261024.js'),path.join(stage,'components/k12-senior-more-20261024.js'));

function edit(relative,transform){
  const file=path.join(stage,relative);
  const old=fs.readFileSync(file,'utf8');
  const next=transform(old);
  if(next===old) throw Error(`No change made to ${relative}`);
  fs.writeFileSync(file,next);
}
function once(value,from,to,label){
  if(value.split(from).length!==2) throw Error(`Expected unique ${label}: ${from}`);
  return value.replace(from,to);
}
edit('index.html',value=>{
  const versions={
    'auth-shell.js?v=senior-lessons-20261024.1':'auth-shell.js?v=mixed-lessons-20261024.1',
    'early-sections.js?v=lesson-groups-20261024.1':'early-sections.js?v=lesson-titles-20261024.1',
    'grade2-4-sections.js?v=lesson-groups-20261024.1':'grade2-4-sections.js?v=lesson-titles-20261024.1',
    'grade5-6-sections.js?v=special-formats-20261023.1':'grade5-6-sections.js?v=lesson-titles-20261024.1',
    'grade7-10-sections.js?v=expanded-grades-20260905.1':'grade7-10-sections.js?v=lesson-titles-20261024.1',
    'k12-special-format-lessons.js?v=20261023.1':'k12-special-format-lessons.js?v=lesson-titles-20261024.1',
    'k12-g8-special-formats.js?v=20261023.2':'k12-g8-special-formats.js?v=lesson-titles-20261024.1',
    'k12-curriculum.js?v=course-sequence-20260907.1':'k12-curriculum.js?v=lesson-titles-20261024.1',
    'k12-spelling-lessons.js?v=classic25-20260726.2':'k12-spelling-lessons.js?v=lesson-titles-20261024.1',
    'k12-classic-25.js?v=grade2-english-prompts-20261023.1':'k12-classic-25.js?v=mixed-lessons-20261024.1',
    'k12-g8-category-lessons.js?v=20261018.3':'k12-g8-category-lessons.js?v=lesson-titles-20261024.1',
    'k12-g8-category-lessons-more.js?v=20261018.4':'k12-g8-category-lessons-more.js?v=lesson-titles-20261024.1',
    'k12-g8-category-lessons-extra.js?v=20261020.1':'k12-g8-category-lessons-extra.js?v=lesson-titles-20261024.1',
    'k12-expanded-grade-menus.js?v=g8-special-formats-20261023.2':'k12-expanded-grade-menus.js?v=mixed-lessons-20261024.1'
  };
  for(const [from,to] of Object.entries(versions)) value=once(value,from,to,'index.html');
  return once(value,
    '<script src="components/k12-senior-lessons-20261024.js?v=20261024.1"></script>',
    '<script src="components/k12-senior-lessons-20261024.js?v=20261024.1"></script>\n<script src="components/k12-senior-more-20261024.js?v=20261024.1"></script>',
    'new senior script');
});
edit('components/k12-classic-25.js',value=>once(value,'const release="grade2-english-prompts-20261023.1";','const release="mixed-lessons-20261024.1";','classic release'));
edit('components/auth-shell.js',value=>once(value,
  '<h2 id="profileUpdatesTitle">Update log</h2>',
  '<h2 id="profileUpdatesTitle">Update log</h2><article><time datetime="2026-10-24">October 24, 2026</time><h3>40 more Grade 11 and 12 lessons</h3><p>20 standard lessons and 20 interactive lessons add 1,000 questions across Grades 11 and 12. Interactive lessons now sit among other lessons under skill-based names across the site.</p></article>',
  'update log heading'));
edit('components/k12-expanded-grade-menus.js',value=>{
  const local=fs.readFileSync(path.join(root,'components/k12-expanded-grade-menus.js'),'utf8');
  const oldStart=value.indexOf("    if(grade==='g8'){");
  const oldEnd=value.indexOf('    section.innerHTML=',oldStart);
  const newStart=local.indexOf('    const formats=[...(window.K12_G8_SPECIAL_FORMATS');
  const newEnd=local.indexOf('    section.innerHTML=',newStart);
  if(oldStart<0||oldEnd<0||newStart<0||newEnd<0) throw Error('Could not locate menu format block');
  value=value.slice(0,oldStart)+local.slice(newStart,newEnd)+value.slice(oldEnd);
  const localInitStart=local.indexOf("    for(const id of ['g2-eng'");
  const localInitEnd=local.indexOf('    for(const [grade,config]',localInitStart);
  if(localInitStart<0||localInitEnd<0) throw Error('Could not locate early grade mix block');
  return once(value,'    Object.keys(CONFIG).forEach(renderGradeMenu);',
    '    Object.keys(CONFIG).forEach(renderGradeMenu);\n'+local.slice(localInitStart,localInitEnd).trimEnd(),
    'menu init');
});
console.log(JSON.stringify({stage,added:'20 standard + 20 interactive lessons',menus:'mixed',log:true}));
