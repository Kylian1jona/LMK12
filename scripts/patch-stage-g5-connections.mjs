import fs from 'node:fs';
import path from 'node:path';

const stage=process.argv[2];
if(!stage||!fs.existsSync(path.join(stage,'index.html')))throw Error('Prepared live stage required');
const root=path.resolve(import.meta.dirname,'..');
for(const relative of ['components/k12-g5-connections-20261029.js','components/k12-early-skill-groups.js','components/k12-expanded-grade-menus.js']){
  fs.copyFileSync(path.join(root,relative),path.join(stage,relative));
}
function replaceOnce(relative,from,to){
  const file=path.join(stage,relative);
  const text=fs.readFileSync(file,'utf8');
  if(text.split(from).length!==2)throw Error(`Expected unique text missing in ${relative}: ${from}`);
  fs.writeFileSync(file,text.replace(from,to));
}
replaceOnce('index.html','auth-shell.js?v=mixed-lessons-20261024.1','auth-shell.js?v=g5-connections-20261029.1');
replaceOnce('index.html',
  '<script src="components/k12-senior-more-20261024.js?v=20261024.1"></script>',
  '<script src="components/k12-senior-more-20261024.js?v=20261024.1"></script>\n<script src="components/k12-g5-connections-20261029.js?v=20261029.1"></script>');
replaceOnce('index.html','k12-classic-25.js?v=mixed-lessons-20261024.1','k12-classic-25.js?v=g5-connections-20261029.1');
replaceOnce('index.html','k12-early-skill-groups.js?v=20261024.2','k12-early-skill-groups.js?v=mixed-lessons-20261029.1');
replaceOnce('index.html','k12-expanded-grade-menus.js?v=mixed-lessons-20261024.1','k12-expanded-grade-menus.js?v=mixed-lessons-20261029.1');
replaceOnce('components/k12-classic-25.js','const release="mixed-lessons-20261024.1";','const release="g5-connections-20261029.1";');
replaceOnce('components/k12-classic-25.js','  function installGrade(grade){','  function installGrade(grade){\n    if(grade===\'g5\'&&typeof window.K12AddGrade5Connections===\'function\') window.K12AddGrade5Connections();');
replaceOnce('components/auth-shell.js',
  '<h2 id="profileUpdatesTitle">Update log</h2>',
  '<h2 id="profileUpdatesTitle">Update log</h2><article><time datetime="2026-10-29">October 29, 2026</time><h3>30 more Grade 5 lessons</h3><p>Ten new lessons each in English, Math, and Science add 750 two-skill questions. Every lesson mixes multiple choice, dropdown, select-two, and drag-and-drop matching practice.</p></article>');
console.log(JSON.stringify({stage,g5Lessons:30,earlyGroups:'mixed',updateLog:true}));
