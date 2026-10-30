import fs from 'node:fs';
import path from 'node:path';

const stage=process.argv[2];
if(!stage||!fs.existsSync(path.join(stage,'index.html')))throw Error('Prepared stage required');
const root=path.resolve(import.meta.dirname,'..');
const read=file=>fs.readFileSync(file,'utf8').replaceAll('\r\n','\n');
function edit(relative,change){
  const file=path.join(stage,relative),before=read(file),after=change(before);
  if(after===before)throw Error(`No change in ${relative}`);
  fs.writeFileSync(file,after);
}
function segment(source,start,end){
  const first=source.indexOf(start),last=source.indexOf(end,first);
  if(first<0||last<0)throw Error(`Missing segment ${start}`);
  return source.slice(first,last);
}
const menuStart='  function renderSubject(grade,subject){';
const menuEnd='  async function openExpandedSubject(grade,subject){';
const local=read(path.join(root,'components/k12-expanded-grade-menus.js'));
edit('components/k12-expanded-grade-menus.js',source=>source.replace(segment(source,menuStart,menuEnd),segment(local,menuStart,menuEnd)));
edit('components/auth-shell.js',source=>{
  const anchor='<h2 id="profileUpdatesTitle">Update log</h2>';
  if(!source.includes(anchor))throw Error('Missing update log');
  return source.replace(anchor,anchor+'<article><time datetime="2026-10-23">October 23, 2026</time><h3>10 more Grade 8 lesson formats</h3><p>Two new 25-question lessons in each Grade 8 subject add 250 questions across English, Math, Algebra 1, Science, and History. Clearly labeled boxes mix checkboxes, dropdowns, drag-and-drop matching, and ranking. Every checkbox question has six options and exactly two correct choices.</p></article>');
});
edit('index.html',source=>{
  const anchor='<script src="components/k12-special-format-lessons.js?v=20261023.1"></script>';
  if(!source.includes(anchor))throw Error('Missing format lesson script');
  source=source.replace(anchor,anchor+'\n<script src="components/k12-g8-special-formats.js?v=20261023.2"></script>');
  const oldVersion='k12-expanded-grade-menus.js?v=g8-25-lessons-20260907.1';
  if(!source.includes(oldVersion))throw Error('Missing expanded menu script');
  return source.replace(oldVersion,'k12-expanded-grade-menus.js?v=g8-special-formats-20261023.2');
});
console.log(JSON.stringify({stage,bankBytes:fs.statSync(path.join(stage,'components/k12-g8-special-formats.js')).size,lessons:10}));
