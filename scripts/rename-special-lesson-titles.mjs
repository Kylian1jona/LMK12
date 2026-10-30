import fs from 'node:fs';
import path from 'node:path';

const root=process.argv[2]||path.resolve(import.meta.dirname,'..');
const titles=new Map([
  ['Checkboxes: Select Two Correct Sentences','Strong Sentences'],
  ['Dropdown: Academic Vocabulary','Academic Vocabulary'],
  ['Drag & Drop Ranking: Rational Numbers','Rational Numbers in Order'],
  ['Checkboxes: Equivalent Expressions','Equivalent Expressions'],
  ['Dropdown: Solve Linear Equations','Linear Equation Solutions'],
  ['Drag & Drop Matching: Equations and Solutions','Equations and Solutions'],
  ['Checkboxes: Select Two Metals','Metals and Nonmetals'],
  ['Drag & Drop Matching: Science Terms','Science Terms and Meanings'],
  ['Drag & Drop Ranking: U.S. History Timeline','U.S. History Timeline'],
  ['Dropdown: Civics Vocabulary','Civics Vocabulary'],
  ['Dropdown: Complete a Sentence','Complete a Sentence'],
  ['Checkboxes: Select Two Sums','Two Sums'],
  ['Drag & Drop Ranking: Order Decimals','Decimals in Order']
]);
for(const relative of [
  'components/k12-g8-special-formats.js',
  'components/k12-special-format-lessons.js',
  'components/grade2-4-sections.js',
  'components/grade5-6-sections.js',
  'components/early-sections.js',
  'components/grade7-10-sections.js',
  'components/k12-classic-25-g2.js',
  'components/k12-curriculum.js',
  'components/k12-spelling-lessons.js',
  'components/k12-g8-category-lessons.js',
  'components/k12-g8-category-lessons-more.js',
  'components/k12-g8-category-lessons-extra.js'
]){
  const file=path.join(root,relative);
  let value=fs.readFileSync(file,'utf8');
  for(const [oldTitle,newTitle] of titles){
    value=value.replaceAll(oldTitle,newTitle).replaceAll(oldTitle.replaceAll('&','&amp;'),newTitle);
  }
  value=value.replaceAll('Drag & Drop: ','').replaceAll('Spelling Drag: ','');
  value=value.replaceAll('Parts of Speech (Drag)','Parts of Speech');
  value=value.replaceAll('>Spelling Drag</button>','>Spelling Practice</button>');
  if(relative.includes('sections.js')){
    value=value.replaceAll('class="lesson-column special-format-box"','class="lesson-column"');
    value=value.replace(/<span class="special-format-tag">[^<]*<\/span>/g,'');
    value=value.replaceAll('>Spelling Drag</button>','>Spelling Practice</button>');
    value=value.replaceAll('<h3>Select Exactly Two</h3>','<h3>Two Sums</h3>');
    value=value.replaceAll('<h3>Match Science Terms</h3>','<h3>Science Terms and Meanings</h3>');
  }
  fs.writeFileSync(file,value);
}
console.log('Renamed existing interactive lesson titles in '+root);
