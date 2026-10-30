import fs from 'node:fs';
import path from 'node:path';

const stage=process.argv[2];
if(!stage||!fs.existsSync(path.join(stage,'index.html')))throw Error('Prepared stage required');
function edit(relative,transform){
  const file=path.join(stage,relative);
  const before=fs.readFileSync(file,'utf8');
  const after=transform(before);
  if(after===before)throw Error(`No change in ${relative}`);
  fs.writeFileSync(file,after);
}
edit('components/grade2-4-sections.js',source=>{
  for(const [grade,markup] of [
    ['g2','<button type="button" class="btn btn-main" onclick="show(\'reading\');renderReadingGrade(\'g2\')">Reading</button>'],
    ['g3','<button type="button" class="btn btn-main" onclick="openGradeTyping()">Typing</button>'],
    ['g4','<button type="button" class="btn btn-main" onclick="openGradeTyping()">Typing</button>']
  ]){
    const anchor=`<button type="button" class="btn btn-main" onclick="show('${grade}-hist')">History</button>`;
    if(!source.includes(anchor))throw Error(`Missing ${grade} subject menu`);
    source=source.replace(anchor,anchor+'\n      '+markup);
  }
  return source;
});
edit('components/grade5-6-sections.js',source=>{
  const anchor='<button type="button" class="btn btn-main" onclick="show(\'g5-hist\')">History</button>';
  if(!source.includes(anchor))throw Error('Missing Grade 5 subject menu');
  return source.replace(anchor,anchor+'\n      <button type="button" class="btn btn-main" onclick="openGradeTyping()">Typing</button>');
});
edit('components/k12-extras.js',source=>{
  const anchor='  home();\n})();';
  if(!source.includes(anchor))throw Error('Missing Extras initializer');
  return source.replace(anchor,`  window.openGradeTyping=()=>{\n    show('grades');\n    if(document.getElementById('grades')?.classList.contains('d-none'))return;\n    selectTab(1);\n    studioLibrary('typing',true);\n  };\n${anchor}`);
});
edit('components/auth-shell.js',source=>{
  const heading='<h2 id="profileUpdatesTitle">Update log</h2>';
  if(!source.includes(heading))throw Error('Missing update log heading');
  return source.replace(heading,heading+'<article><time datetime="2026-10-23">October 23, 2026</time><h3>Reading and Typing in grade menus</h3><p>Grade 2 now opens its reading passages directly from the subject choices. Grades 3, 4, and 5 now have Typing buttons that open the full keyboard practice course.</p></article>');
});
edit('index.html',source=>{
  for(const [oldValue,newValue] of [
    ['grade2-4-sections.js?v=g4-more-lessons-20261010.3','grade2-4-sections.js?v=grade-subjects-20261023.1'],
    ['grade5-6-sections.js?v=grade5-expanded-20261010.2','grade5-6-sections.js?v=grade-subjects-20261023.1'],
    ['k12-extras.js?v=learned-keys-only-20261010.3','k12-extras.js?v=grade-subjects-20261023.1'],
    ['auth-shell.js?v=k-drag-20261023.1','auth-shell.js?v=grade-subjects-20261023.1']
  ]){
    if(!source.includes(oldValue))throw Error(`Missing script ${oldValue}`);
    source=source.replace(oldValue,newValue);
  }
  return source;
});
console.log(JSON.stringify({stage,changes:['Grade 2 Reading','Grade 3 Typing','Grade 4 Typing','Grade 5 Typing','Update log']}));
