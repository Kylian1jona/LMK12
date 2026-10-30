import fs from 'node:fs';
import path from 'node:path';

const root=process.argv[2]||path.resolve(import.meta.dirname,'..');
const file=path.join(root,'components/grade2-4-sections.js');
const source=fs.readFileSync(file,'utf8');
const start=source.indexOf('<div id="g2-eng" class="section d-none">');
const end=source.indexOf('<div id="g2-math" class="section d-none">',start);
if(start<0||end<0) throw Error('Grade 2 English menu not found');
const old=source.slice(start,end);
for(let lesson=1;lesson<=12;lesson++){
  if(!old.includes(`startLesson('g2','eng','L${lesson}')`)) throw Error(`Grade 2 English L${lesson} missing`);
}
const menu=`<div id="g2-eng" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 2 English</h1>
    <p class="small-note">Choose a skill group, then pick a lesson.</p>
    <div class="lesson-columns" aria-label="Grade 2 English lesson groups">
      <div class="lesson-column">
        <h3>Words &amp; Grammar</h3>
        <p>Learn word types and how words change.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L1')">Nouns &amp; Verbs</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L4')">Adjectives</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L5')">Past vs Present</button>
      </div>
      <div class="lesson-column">
        <h3>Build Sentences</h3>
        <p>Complete and edit sentences.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L2')">Sentence Fix</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L7')">Fill in the Blank</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L8')">Sentence Editing</button>
      </div>
      <div class="lesson-column">
        <h3>Reading &amp; Sounds</h3>
        <p>Understand what you read and hear.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L3')">Reading Check</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L6')">Syllables</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L9')">Memory Match</button>
      </div>
      <div class="lesson-column">
        <h3>Spelling &amp; Challenges</h3>
        <p>Practice spelling with games and timed rounds.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L10')">Speed Challenge</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L11')">Spelling: Short Vowels</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L12')">Spelling Drag</button>
      </div>
      <div class="lesson-column special-format-box">
        <span class="special-format-tag">DROPDOWN MENU</span>
        <h3>Choose One Word</h3>
        <p>Complete each Grade 2 sentence using a dropdown list.</p>
        <button type="button" class="btn btn-main" onclick="startUnifiedEarlyLesson('g2:eng:format-dropdown','g2-eng')">Dropdown: Complete a Sentence</button>
      </div>
    </div>
    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade2')">Back to Grade 2</button>
    </div>
  </div>
</div>

`;
for(let lesson=1;lesson<=12;lesson++){
  const count=menu.split(`startLesson('g2','eng','L${lesson}')`).length-1;
  if(count!==1) throw Error(`Grade 2 English L${lesson} count ${count}`);
}
fs.writeFileSync(file,source.slice(0,start)+menu+source.slice(end));
console.log('Grouped 12 Grade 2 English lessons into four skill sections');
