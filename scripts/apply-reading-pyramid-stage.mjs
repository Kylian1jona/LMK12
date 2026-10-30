import fs from 'node:fs';
import path from 'node:path';
const stage=process.argv[2];
if(!stage||!fs.existsSync(path.join(stage,'index.html')))throw Error('Prepared stage required');
function edit(name,before,after){
  const file=path.join(stage,name);let content=fs.readFileSync(file,'utf8');
  if(!content.includes(before))throw Error(`${name}: expected text missing: ${before.slice(0,70)}`);
  content=content.replace(before,after);fs.writeFileSync(file,content);
}
function copy(name){const target=path.join(stage,name);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(name,target);}
const pyramidCard='  const pyramidCard=(grade,description)=>`<button type="button" class="early-lesson-card" data-lesson-key="${grade}:eng:pyramid-reading" onclick="openReadingPyramid(\'${grade}\')"><span aria-hidden="true">📚</span><div><strong>Reading Pyramid</strong><small>${description}</small></div><b>Start &rarr;</b></button>`;';
edit('components/early-sections.js','  const lessonCard=',`${pyramidCard}\n  const lessonCard=`);
edit('components/early-sections.js','        lessonCard("k:eng:sentence-meaning","kinder-eng","Read and Understand","Read a sentence and answer about it.","READ"),','        lessonCard("k:eng:sentence-meaning","kinder-eng","Read and Understand","Read a sentence and answer about it.","READ"),\n        pyramidCard("k","Build short sentences one word at a time with picture clues."),');
edit('components/early-sections.js','        lessonCard("g1:eng:story-questions","g1-eng","Read a Short Story and Answer Questions","Read short passages and recall key details.","READ"),','        lessonCard("g1:eng:story-questions","g1-eng","Read a Short Story and Answer Questions","Read short passages and recall key details.","READ"),\n        pyramidCard("g1","Build longer sentences one word at a time with picture clues."),');
edit('components/k12-early-skill-groups.js','sentence-meaning\']','sentence-meaning pyramid-reading\']');
edit('components/k12-early-skill-groups.js','story-questions reading-clues\']','story-questions reading-clues pyramid-reading\']');
edit('components/k12-account.js','  const earlySubjectMatch = sectionId.match','  if(sectionId === "readingPyramid") return subjectAllowed("eng");\n  const earlySubjectMatch = sectionId.match');
edit('components/k12-progress-ui.js','"g1-math","g1-sci",','"g1-math","g1-sci","readingPyramid",');
edit('components/auth-shell.js','<h2 id="profileUpdatesTitle">Update log</h2>','<h2 id="profileUpdatesTitle">Update log</h2><article><time datetime="2026-10-29">October 29, 2026</time><h3>Reading pyramids and more ways to answer</h3><p>Kindergarten and Grade 1 English now have picture-guided reading pyramids. Grade 1 builds longer sentences. Grade 5 English questions begin with the question itself, and the new Grade 5 lessons add fill-in-the-blank practice alongside matching, multiple choice, dropdowns, and select-two questions.</p></article>');
edit('index.html','<link rel="stylesheet" href="components/extras-lab-bench.css?v=20260920.1">','<link rel="stylesheet" href="components/extras-lab-bench.css?v=20260920.1">\n<link rel="stylesheet" href="components/k12-reading-pyramids.css?v=20261029.1">');
for(const [name,version] of [['auth-shell.js','reading-pyramids-20261029.1'],['early-sections.js','reading-pyramids-20261029.1'],['k12-account.js','reading-pyramids-20261029.1'],['k12-progress-ui.js','reading-pyramids-20261029.1'],['k12-g5-connections-20261029.js','20261029.2'],['k12-early-skill-groups.js','reading-pyramids-20261029.1']]){
  const file=path.join(stage,'index.html');let html=fs.readFileSync(file,'utf8');const re=new RegExp(`(<script src="components/${name.replaceAll('.','\\.')}\\?v=)[^"<]+`);if(!re.test(html))throw Error(`Missing script ${name}`);html=html.replace(re,`$1${version}`);fs.writeFileSync(file,html);
}
edit('index.html','<script src="components/k12-early-skill-groups.js?v=reading-pyramids-20261029.1"></script>','<script src="components/k12-early-skill-groups.js?v=reading-pyramids-20261029.1"></script>\n<script src="components/k12-reading-pyramids.js?v=20261029.1"></script>');
for(const name of ['components/k12-reading-pyramids.js','components/k12-reading-pyramids.css','components/k12-g5-connections-20261029.js'])copy(name);
console.log(`Patched ${stage}`);
