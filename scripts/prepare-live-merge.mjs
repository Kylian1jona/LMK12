import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const stage=fs.mkdtempSync(path.join(os.tmpdir(),'lmk12-live-merge-'));
const origin='https://k12-learning.netlify.app/';
const skip=new Set(['components/k12-prek-drag-lessons-more.js','components/k12-lesson-likes.js','components/k12-category-sort.js']);
const paths=[];
for(const name of ['components','images','draft-media']){
  fs.cpSync(path.join(root,name),path.join(stage,name),{recursive:true});
  for(const file of fs.readdirSync(path.join(root,name),{recursive:true,withFileTypes:true})){
    if(!file.isFile()) continue;
    const relative=path.relative(root,path.join(file.parentPath,file.name)).replaceAll('\\','/');
    if(!skip.has(relative)) paths.push(relative);
  }
}
for(const name of ['index.html','k12.css','k12.js','_headers']){
  fs.copyFileSync(path.join(root,name),path.join(stage,name));
  if(name!=='_headers') paths.push(name);
}

const failures=[];let downloaded=0,matched=0,missing=0;
async function fetchOne(relative){
  const local=path.join(stage,relative);
  const remote=new URL(relative.split('/').map(encodeURIComponent).join('/'),origin);
  const isMedia=relative.startsWith('images/')||relative.startsWith('draft-media/');
  try{
    if(isMedia){
      const head=await fetch(remote,{method:'HEAD'});
      if(head.status===404){missing++;return;}
      if(!head.ok) throw Error(`HEAD ${head.status}`);
      const length=Number(head.headers.get('content-length'));
      if(length&&length===fs.statSync(local).size){matched++;return;}
    }
    const response=await fetch(remote);
    if(response.status===404){missing++;return;}
    if(!response.ok) throw Error(`GET ${response.status}`);
    fs.mkdirSync(path.dirname(local),{recursive:true});
    fs.writeFileSync(local,Buffer.from(await response.arrayBuffer()));
    downloaded++;
  }catch(error){failures.push(`${relative}: ${error.message}`);}
}
let cursor=0;
await Promise.all(Array.from({length:16},async()=>{while(cursor<paths.length) await fetchOne(paths[cursor++]);}));
if(failures.length){console.error(failures.slice(0,20).join('\n'));throw Error(`${failures.length} published files could not be checked`);}

let html=fs.readFileSync(path.join(stage,'index.html'),'utf8');
const before='<script src="components/k12-interactive-math-lessons.js';
if(!html.includes(before)) throw Error('Could not find Pre-K lesson script position');
if(!html.includes('components/k12-prek-drag-lessons-more.js'))html=html.replace(before,'<script src="components/k12-prek-drag-lessons-more.js?v=20261021.2"></script>\n'+before);
fs.writeFileSync(path.join(stage,'index.html'),html);
fs.copyFileSync(path.join(root,'components/k12-prek-drag-lessons-more.js'),path.join(stage,'components/k12-prek-drag-lessons-more.js'));

const sectionsPath=path.join(stage,'components/early-sections.js');
let sections=fs.readFileSync(sectionsPath,'utf8');
function appendCards(arrayName,firstKey,cards){
  if(sections.includes(firstKey))return;
  const start=sections.indexOf(`const ${arrayName}=[`);
  const end=sections.indexOf('].join("");',start);
  if(start<0||end<0)throw Error(`Could not find ${arrayName} lesson menu`);
  sections=sections.slice(0,end).trimEnd()+',\n        '+cards.join(',\n        ')+'\n      '+sections.slice(end);
}
appendCards('prekEnglish','prek:eng:sort-animal-homes',[
  'lessonCard("prek:eng:sort-animal-homes","prek-eng","Drag & Drop: Animal Homes","Sort picture cards into farm, ocean, and forest.","🐄")',
  'lessonCard("prek:eng:sort-foods","prek-eng","Drag & Drop: Foods and Drinks","Sort fruit, vegetables, and drinks.","🍎")',
  'lessonCard("prek:eng:sort-weather","prek-eng","Drag & Drop: Weather","Sort sunny, rainy, and snowy pictures.","☀️")',
  'lessonCard("prek:eng:sort-first-sounds","prek-eng","Drag & Drop: First Sounds","Sort picture words by M, S, and T.","M")',
  'lessonCard("prek:eng:sort-everyday-things","prek-eng","Drag & Drop: Everyday Things","Sort things we wear, eat, and ride.","👕")'
]);
appendCards('prekMath','prek:math:sort-shapes',[
  'lessonCard("prek:math:sort-shapes","prek-math","Drag & Drop: Shapes","Sort circles, squares, and triangles.","▲")',
  'lessonCard("prek:math:sort-count-1-3","prek-math","Drag & Drop: Count Pictures","Sort groups of one, two, and three.","123")',
  'lessonCard("prek:math:sort-patterns","prek-math","Drag & Drop: Patterns","Sort AB, AAB, and ABB patterns.","AB")',
  'lessonCard("prek:math:sort-small-sums","prek-math","Drag & Drop: Small Sums","Sort sums that make three, four, or five.","+")',
  'lessonCard("prek:math:sort-more-less-same","prek-math","Drag & Drop: Compare Groups","See which side has more, or if they match.","⚖")'
]);
appendCards('prekEnglish','prek:eng:sort-bdf-sounds',[
  'lessonCard("prek:eng:sort-bdf-sounds","prek-eng","Drag & Drop: B, D, F Sounds","Sort picture words by their first sound.","BDF")',
  'lessonCard("prek:eng:sort-syllables","prek-eng","Drag & Drop: Word Beats","Clap words with one, two, or three beats.","👏")',
  'lessonCard("prek:eng:sort-living-things","prek-eng","Drag & Drop: Living Things","Sort animals, plants, and objects.","🌱")',
  'lessonCard("prek:eng:sort-feelings","prek-eng","Drag & Drop: Feelings","Sort happy, sad, and scared faces.","😊")',
  'lessonCard("prek:eng:sort-places","prek-eng","Drag & Drop: Places","Sort home, school, and playground pictures.","🏠")'
]);
appendCards('prekMath','prek:math:sort-colors',[
  'lessonCard("prek:math:sort-colors","prek-math","Drag & Drop: Colors","Sort red, blue, and yellow pictures.","🎨")',
  'lessonCard("prek:math:sort-count-4-6","prek-math","Drag & Drop: Count to Six","Sort groups of four, five, and six.","456")',
  'lessonCard("prek:math:sort-number-forms","prek-math","Drag & Drop: Number Forms","Match ways to show one, two, and three.","123")',
  'lessonCard("prek:math:sort-corners","prek-math","Drag & Drop: Shape Corners","Sort shapes with zero, three, and four corners.","▲")',
  'lessonCard("prek:math:sort-group-changes","prek-math","Drag & Drop: Group Changes","Sort adding, taking away, and staying the same.","+−")'
]);
fs.writeFileSync(sectionsPath,sections);

const authPath=path.join(stage,'components/auth-shell.js');
let auth=fs.readFileSync(authPath,'utf8');
const logHead='<h2 id="profileUpdatesTitle">Update log</h2>';
if(!auth.includes(logHead)) throw Error('Could not find published update log');
const note='<article><time datetime="2026-10-21">October 21, 2026</time><h3>More Pre-K picture sorting</h3><p>10 more drag-and-drop lessons add 250 questions in English and Math. Sort first sounds, word beats, feelings, colors, counting, number forms, and more with nine picture cards per question.</p></article>';
if(!auth.includes('More Pre-K picture sorting'))auth=auth.replace(logHead,logHead+note);
fs.writeFileSync(authPath,auth);

console.log(JSON.stringify({stage,filesChecked:paths.length,downloaded,matched,missing,htmlBytes:html.length},null,2));
