import fs from 'node:fs';
import path from 'node:path';

const stage=process.argv[2];
if(!stage||!fs.existsSync(path.join(stage,'index.html')))throw Error('Prepared stage required');
const root=path.resolve(import.meta.dirname,'..');
const local=relative=>fs.readFileSync(path.join(root,relative),'utf8').replaceAll('\r\n','\n');
function edit(relative,work){
  const file=path.join(stage,relative),before=fs.readFileSync(file,'utf8').replaceAll('\r\n','\n'),after=work(before);
  if(before===after)throw Error(`No change to ${relative}`);
  fs.writeFileSync(file,after);
}
function segment(source,start,end){
  const from=source.indexOf(start),to=source.indexOf(end,from);
  if(from<0||to<0)throw Error(`Could not find segment ${start}`);
  return source.slice(from,to);
}
function replaceOnce(source,oldText,newText){
  if(!source.includes(oldText))throw Error(`Missing anchor ${oldText.slice(0,70)}`);
  return source.replace(oldText,newText);
}

const coreLocal=local('components/k12-lesson-core.js');
edit('components/k12-lesson-core.js',source=>{
  source=replaceOnce(source,'  if(q.type === "order" && Array.isArray(q.items)) return q.items.join(", ");',
    '  if(q.type === "ranking" && Array.isArray(q.items)) return q.items.join(", ");\n  if(q.type === "order" && Array.isArray(q.items)) return q.items.join(", ");');
  source=replaceOnce(source,'  if(q.type === "order"){\n    return `Not quite. The correct order',
    '  if(q.type === "order" || q.type === "ranking"){\n    return `Not quite. The correct order');
  const highlight=segment(coreLocal,'  if(q?.type === "dropdown"){','  if(q?.type === "order"){');
  source=replaceOnce(source,'  if(q?.type === "order"){',highlight+'  if(q?.type === "order"){');
  const speech=segment(coreLocal,'  if(q.type === "dropdown" && Array.isArray(q.choices))','  if(q.type === "order" && Array.isArray(q.items)){');
  source=replaceOnce(source,'  if(q.type === "order" && Array.isArray(q.items)){',speech+'  if(q.type === "order" && Array.isArray(q.items)){');
  source=replaceOnce(source,'  const gradeLabel=grade==="prek"?"Pre-K":grade==="k"?"Kindergarten":"Grade 1";',
    '  const gradeLabel=grade==="prek"?"Pre-K":grade==="k"?"Kindergarten":`Grade ${String(grade).replace(/^g/,"")}`;');
  const validation=segment(coreLocal,'  if(q.type === "dropdown"){\n    if(!Array.isArray(q.choices)','  if(q.type === "order"){\n    if(!Array.isArray(q.items)');
  source=replaceOnce(source,'  if(q.type === "order"){\n    if(!Array.isArray(q.items)',validation+'  if(q.type === "order"){\n    if(!Array.isArray(q.items)');
  const restore=segment(coreLocal,'  }else if(q.type==="dropdown"){','  }else if(q.type==="order"&&Array.isArray(response)){');
  source=replaceOnce(source,'  }else if(q.type==="order"&&Array.isArray(response)){',restore+'  }else if(q.type==="order"&&Array.isArray(response)){');
  const render=segment(coreLocal,'  else if(q.type === "dropdown"){\n    renderDropdown(q);','  else if(q.type === "order"){\n    renderOrder(q);');
  source=replaceOnce(source,'  else if(q.type === "order"){\n    renderOrder(q);',render+'  else if(q.type === "order"){\n    renderOrder(q);');
  const countCheck=segment(coreLocal,'    if(q.requiredSelections && picked.length!==q.requiredSelections){','    LR.savedResponse=[...picked];');
  source=replaceOnce(source,'    LR.savedResponse=[...picked];',countCheck+'    LR.savedResponse=[...picked];');
  const check=segment(coreLocal,'  if(q.type === "dropdown"){\n    const picked=document.querySelector','  const user = $("lrInput").value.trim();');
  source=replaceOnce(source,'  const user = $("lrInput").value.trim();',check+'  const user = $("lrInput").value.trim();');
  const specialRender=segment(coreLocal,'function renderSelectAll(q){','function renderOrder(q){');
  const originalRender=segment(source,'function renderSelectAll(q){','function renderOrder(q){');
  source=replaceOnce(source,originalRender,specialRender);
  return source;
});

for(const [relative,sectionId,key] of [
  ['components/grade2-4-sections.js','g2-eng','g2:eng:format-dropdown'],
  ['components/grade2-4-sections.js','g3-math','g3:math:format-checkboxes'],
  ['components/grade2-4-sections.js','g4-sci','g4:sci:format-matching'],
  ['components/grade5-6-sections.js','g5-math','g5:math:format-ranking']
]){
  edit(relative,source=>{
    const line=local(relative).split('\n').find(value=>value.includes(`startUnifiedEarlyLesson('${key}'`));
    if(!line||source.includes(key))throw Error(`Could not insert ${key}`);
    const from=source.indexOf(`<div id="${sectionId}"`);
    const to=source.indexOf('<div id="',from+1);
    if(from<0)throw Error(`Missing ${sectionId} section`);
    const slice=source.slice(from,to<0?undefined:to);
    const anchor='    <div class="lesson-back-row">';
    const position=slice.indexOf(anchor);
    if(position<0)throw Error(`Missing ${sectionId} back row`);
    const close=slice.lastIndexOf('    </div>',position);
    if(close<0)throw Error(`Missing ${sectionId} lesson columns close`);
    return source.slice(0,from+close)+line.trim()+'\n\n'+source.slice(from+close);
  });
}

const cssLocal=local('k12.css');
const cssStart='.section[id^="g"][id*="-"] .lesson-column.special-format-box';
edit('k12.css',source=>{
  if(source.includes(cssStart))throw Error('Special styles already published');
  return source+'\n'+cssLocal.slice(cssLocal.indexOf(cssStart));
});
edit('components/auth-shell.js',source=>{
  const heading='<h2 id="profileUpdatesTitle">Update log</h2>';
  return replaceOnce(source,heading,heading+'<article><time datetime="2026-10-23">October 23, 2026</time><h3>Four new lesson formats</h3><p>New 25-question lessons add checkboxes in Grade 3 Math, dropdowns in Grade 2 English, drag-and-drop matching in Grade 4 Science, and drag-and-drop ranking in Grade 5 Math. Each has a labeled box in its subject menu. Checkbox questions show six choices and ask for exactly two.</p></article>');
});
edit('index.html',source=>{
  const versions=[
    ['k12.css?v=lesson-first-20261022.1','k12.css?v=special-formats-20261023.1'],
    ['grade2-4-sections.js?v=grade-subjects-20261023.1','grade2-4-sections.js?v=special-formats-20261023.1'],
    ['grade5-6-sections.js?v=grade-subjects-20261023.1','grade5-6-sections.js?v=special-formats-20261023.1'],
    ['k12-lesson-core.js?v=lesson-first-20261022.1','k12-lesson-core.js?v=special-formats-20261023.1']
  ];
  for(const [oldValue,newValue] of versions)source=replaceOnce(source,oldValue,newValue);
  const anchor='<script src="components/k12-k-drag-lessons.js?v=20261023.1"></script>';
  return replaceOnce(source,anchor,anchor+'\n<script src="components/k12-special-format-lessons.js?v=20261023.1"></script>');
});
console.log(JSON.stringify({stage,formats:4,questions:100,bankBytes:fs.statSync(path.join(stage,'components/k12-special-format-lessons.js')).size}));
