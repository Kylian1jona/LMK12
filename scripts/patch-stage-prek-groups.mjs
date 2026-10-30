import fs from 'node:fs';
import path from 'node:path';

const stage=process.argv[2];
if(!stage) throw Error('Staged site directory required');
const file=path.join(stage,'components/early-sections.js');
let source=fs.readFileSync(file,'utf8');
const helper=`  const prekLessonGroups=(cards,groups)=>groups.map(([title,description,start,end])=>\`
    <section class="early-lesson-group" aria-label="\${title}">
      <header><h3>\${title}</h3><p>\${description}</p></header>
      <div class="early-lesson-group-cards">\${cards.slice(start,end).join("")}</div>
    </section>\`).join("");
`;
const first='  const gradeMenu=';
if(!source.includes(first)) throw Error('Pre-K helper insertion point missing');
source=source.replace(first,helper+first);
for(const name of ['prekEnglish','prekMath']){
  const begin=source.indexOf(`const ${name}=[`);
  const end=source.indexOf('].join("");',begin);
  if(begin<0||end<0) throw Error(`${name} array missing`);
  source=source.slice(0,end)+'];'+source.slice(end+'].join("");'.length);
}
const english='subjectPage("prek-eng","prek","Pre-K","English","A",prekEnglish)';
const math='subjectPage("prek-math","prek","Pre-K","Math","+",prekMath)';
if(!source.includes(english)||!source.includes(math)) throw Error('Pre-K render calls missing');
source=source.replace(english,`subjectPage("prek-eng","prek","Pre-K","English","A",prekLessonGroups(prekEnglish,[
          ["Everyday Words","Colors, sizes, positions, and comparisons.",0,4],
          ["Letters & Sounds","Match letters, beginning sounds, and rhymes.",4,9],
          ["Our World","Animals, body parts, weather, and daily routines.",9,14],
          ["More Words","Actions, feelings, opposites, and places.",14,19],
          ["Listen & Rhyme","Hear beginning sounds and rhyming words.",19,24],
          ["Picture Sorting","Drag and drop familiar pictures into groups.",24,29],
          ["More Sorting","Practice sounds, syllables, feelings, and places.",29]
        ]))`);
source=source.replace(math,`subjectPage("prek-math","prek","Pre-K","Math","+",prekLessonGroups(prekMath,[
          ["Shapes & Counting","Identify shapes and count small groups.",0,4],
          ["Compare & Pattern","Find more, less, and what comes next.",4,6],
          ["Number Stories","Count, combine, and order small groups.",6,11],
          ["More Number Skills","Explore zero, patterns, and sorting.",11,16],
          ["Sort Math Pictures","Group shapes, counts, patterns, and sums.",16,21],
          ["More Math Sorting","Practice colors, number forms, and changes.",21]
        ]))`);
fs.writeFileSync(file,source);
console.log('Grouped published Pre-K lessons without changing their content');
