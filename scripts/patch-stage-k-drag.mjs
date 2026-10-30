import fs from 'node:fs';
import path from 'node:path';

const stage=process.argv[2];
if(!stage||!fs.existsSync(path.join(stage,'index.html')))throw Error('Prepared stage required');
const root=path.resolve(import.meta.dirname,'..');
const localMenu=fs.readFileSync(path.join(root,'components/early-sections.js'),'utf8');
const menuPath=path.join(stage,'components/early-sections.js');
let menu=fs.readFileSync(menuPath,'utf8');
function appendCards(arrayName,keys){
  const cards=keys.map(key=>{
    const line=localMenu.split('\n').find(item=>item.includes(`lessonCard("${key}"`));
    if(!line)throw Error(`Missing local card: ${key}`);
    if(menu.includes(`lessonCard("${key}"`))throw Error(`Already published: ${key}`);
    return line.trim().replace(/,$/,'');
  });
  const start=menu.indexOf(`const ${arrayName}=[`);
  const end=menu.indexOf('].join("");',start);
  if(start<0||end<0)throw Error(`Missing menu: ${arrayName}`);
  menu=menu.slice(0,end).trimEnd()+',\n        '+cards.join(',\n        ')+'\n      '+menu.slice(end);
}
appendCards('kinderEnglish',['k:eng:sort-short-vowels','k:eng:sort-blends','k:eng:sort-word-families','k:eng:sort-sentence-marks']);
appendCards('kinderMath',['k:math:sort-sums','k:math:sort-differences','k:math:sort-number-forms','k:math:sort-solid-shapes']);
fs.writeFileSync(menuPath,menu);

const indexPath=path.join(stage,'index.html');
let html=fs.readFileSync(indexPath,'utf8');
const anchor='<script src="components/k12-k-regular-lessons.js?v=20261023.1"></script>';
if(!html.includes(anchor))throw Error('Missing Kindergarten script anchor');
html=html.replace(anchor,anchor+'\n<script src="components/k12-k-drag-lessons.js?v=20261023.1"></script>');
html=html.replace('components/early-sections.js?v=k-regular-20261023.1','components/early-sections.js?v=k-drag-20261023.1');
html=html.replace('components/auth-shell.js?v=k-regular-20261023.1','components/auth-shell.js?v=k-drag-20261023.1');
fs.writeFileSync(indexPath,html);

const logPath=path.join(stage,'components/auth-shell.js');
let log=fs.readFileSync(logPath,'utf8');
const heading='<h2 id="profileUpdatesTitle">Update log</h2>';
if(!log.includes(heading))throw Error('Missing update log heading');
log=log.replace(heading,heading+'<article><time datetime="2026-10-23">October 23, 2026</time><h3>Kindergarten drag-and-drop practice</h3><p>Eight new English and Math sorting lessons add 200 nine-card rounds. Sort vowel sounds, blends, word families, sentences, sums, subtraction, number forms, and solid shapes by dragging or tapping cards.</p></article>');
fs.writeFileSync(logPath,log);
console.log(JSON.stringify({stage,kindergartenCards:(menu.match(/lessonCard\("k:(?:eng|math):/g)||[]).length,bankBytes:fs.statSync(path.join(stage,'components/k12-k-drag-lessons.js')).size}));
