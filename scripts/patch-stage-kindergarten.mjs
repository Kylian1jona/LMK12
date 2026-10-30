import fs from 'node:fs';
import path from 'node:path';

const stage=process.argv[2];
if(!stage||!fs.existsSync(path.join(stage,'index.html')))throw Error('Prepared stage required');
const root=path.resolve(import.meta.dirname,'..');
const localMenu=fs.readFileSync(path.join(root,'components/early-sections.js'),'utf8');
const menuPath=path.join(stage,'components/early-sections.js');
let menu=fs.readFileSync(menuPath,'utf8');
function addCards(arrayName,keys){
  const cards=keys.map(key=>{
    const escaped=key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const match=localMenu.match(new RegExp(`lessonCard\\("${escaped}"[^\\n]*\\)`));
    if(!match)throw Error(`Missing local lesson card: ${key}`);
    if(menu.includes(`lessonCard("${key}"`))throw Error(`Published lesson already exists: ${key}`);
    return match[0];
  });
  const start=menu.indexOf(`const ${arrayName}=[`);
  const end=menu.indexOf('].join("");',start);
  if(start<0||end<0)throw Error(`Missing menu: ${arrayName}`);
  menu=menu.slice(0,end).trimEnd()+',\n        '+cards.join(',\n        ')+'\n      '+menu.slice(end);
}
addCards('kinderEnglish',['k:eng:initial-blends','k:eng:word-families','k:eng:opposites','k:eng:action-words','k:eng:sentence-meaning']);
addCards('kinderMath',['k:math:subitize','k:math:compare-groups','k:math:shape-attributes','k:math:picture-graphs','k:math:ordinal-positions']);
fs.writeFileSync(menuPath,menu);

const indexPath=path.join(stage,'index.html');
let html=fs.readFileSync(indexPath,'utf8');
const anchor='<script src="components/k12-g1-regular-lessons.js?v=20261022.1"></script>';
if(!html.includes(anchor))throw Error('Missing lesson script anchor');
html=html.replace(anchor,anchor+'\n<script src="components/k12-k-regular-lessons.js?v=20261023.1"></script>');
html=html.replace('components/early-sections.js?v=g1-regular-20261022.1','components/early-sections.js?v=k-regular-20261023.1');
html=html.replace('components/auth-shell.js?v=lesson-first-20261022.1','components/auth-shell.js?v=k-regular-20261023.1');
fs.writeFileSync(indexPath,html);

const logPath=path.join(stage,'components/auth-shell.js');
let log=fs.readFileSync(logPath,'utf8');
const heading='<h2 id="profileUpdatesTitle">Update log</h2>';
if(!log.includes(heading))throw Error('Missing update log heading');
log=log.replace(heading,heading+'<article><time datetime="2026-10-23">October 23, 2026</time><h3>More Kindergarten reading and Math</h3><p>10 new lessons add 250 questions. Practice beginning blends, word families, opposites, action words, reading sentences, small groups, shape features, picture graphs, and positions.</p></article>');
fs.writeFileSync(logPath,log);
console.log(JSON.stringify({stage,kindergartenCards:(menu.match(/lessonCard\("k:(?:eng|math):/g)||[]).length,bankBytes:fs.statSync(path.join(stage,'components/k12-k-regular-lessons.js')).size}));
