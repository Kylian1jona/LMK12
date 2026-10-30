import fs from 'node:fs';
import path from 'node:path';

const stage=process.argv[2];
if(!stage||!fs.existsSync(path.join(stage,'index.html'))) throw Error('Prepared live stage required');
const root=path.resolve(import.meta.dirname,'..');
const extension='components/k12-senior-lessons-20261024.js';
fs.copyFileSync(path.join(root,extension),path.join(stage,extension));

function replaceOnce(relative,from,to){
  const file=path.join(stage,relative);
  const source=fs.readFileSync(file,'utf8');
  if(!source.includes(from)||source.split(from).length!==2) throw Error(`Expected unique text missing in ${relative}: ${from}`);
  fs.writeFileSync(file,source.replace(from,to));
}
replaceOnce('index.html',
  '<script src="components/k12-classic-25.js?v=grade2-english-prompts-20261023.1"></script>',
  '<script src="components/k12-senior-lessons-20261024.js?v=20261024.1"></script>\n<script src="components/k12-classic-25.js?v=grade2-english-prompts-20261023.1"></script>');
replaceOnce('index.html',
  'components/auth-shell.js?v=grade-subjects-20261023.1',
  'components/auth-shell.js?v=senior-lessons-20261024.1');
replaceOnce('components/auth-shell.js',
  '<h2 id="profileUpdatesTitle">Update log</h2>',
  '<h2 id="profileUpdatesTitle">Update log</h2><article><time datetime="2026-10-24">October 24, 2026</time><h3>20 new Grade 11 and 12 lessons</h3><p>Grade 11 and Grade 12 each gain 10 lessons across English, Math, Science, and History. Every lesson has 25 questions, adding 500 new questions in all.</p></article>');
console.log(JSON.stringify({stage,extension,updateLog:true}));
