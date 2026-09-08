/* Integration checks for the course sequence and guided handwriting workflow. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const context=vm.createContext({console,document:{readyState:'loading',addEventListener(){},querySelector(){return null;}},LR:{round:1},makeFallbackLessonPack:()=>({})});
context.window=context;
for(const file of ['k12-curriculum.js','k12-expanded-grade-menus.js',...['g8','g9','g10','g11','g12'].map(g=>`k12-classic-25-${g}.js`),'k12-g8-25-extension.js','k12-classic-25.js']){
  vm.runInContext(read(`components/${file}`),context,{filename:file});
}
const curriculum=vm.runInContext('CURR',context);
for(const [grade,subject,count] of [['g8','eng',25],['g8','math',26],['g8','sci',25],['g8','hist',26],['g8','alg1',20],['g9','math',20],['g10','math',20],['g11','math',8],['g12','math',8]]){
  context.K12Classic25.installGrade(grade);
  const records=Object.entries(context.K12_CLASSIC_25_DATA).filter(([key])=>key.startsWith(`${grade}:${subject}:`));
  assert.equal(records.length,count,`${grade}:${subject} lesson count`);
  const topics=context.K12_CLASSIC_25_TOPICS[`${grade}:${subject}`];
  assert.ok(topics.flatMap(t=>t.lessons).length<=count,'Topic metadata cannot contain extra lessons');
  for(const [key,record] of records){
    const pack=curriculum[grade][subject][key.split(':')[2]];
    assert.equal(pack.name,record.name,'Loader must preserve bank names');
    for(let i=0;i<25;i++){
      context.LR.round=i+1;
      assert.equal(JSON.stringify(pack.gen()),JSON.stringify(record.questions[i]),'Loader must use the actual authored question');
    }
    const clone=pack.gen();
    if(Array.isArray(clone.choices)){
      clone.choices.push('test mutation');
      assert.ok(!record.questions[24].choices.includes('test mutation'),'Question copies must be independent');
    }
  }
}
for(const grade of ['g9','g10']){
  assert.ok(!Object.keys(context.K12_CLASSIC_25_DATA).some(key=>key.startsWith(`${grade}:alg1:`)),`${grade} should use its requested math course`);
}
const moleculeLab=context.K12_CLASSIC_25_DATA['g8:sci:L21'];
assert.equal(moleculeLab.questions.length,25,'Molecule lab has 25 build challenges');
assert.ok(moleculeLab.questions.every(question=>question.type==='atom-build'&&question.formula&&Object.keys(question.atoms||{}).length),'Every molecule challenge defines its required atoms');
assert.deepEqual(JSON.parse(JSON.stringify(moleculeLab.questions[0].atoms)),{H:2,O:1},'Water requires two hydrogen atoms and one oxygen atom');
const lessonCoreSource=read('components/k12-lesson-core.js');
assert.ok(lessonCoreSource.includes('renderAtomBuild(q)')&&lessonCoreSource.includes('q.type === "atom-build"'),'Lesson runner supports interactive atom-building questions');
assert.ok(lessonCoreSource.includes('renderJeopardy(q)')&&lessonCoreSource.includes('score>=target'),'Lesson runner supports $3,000 Jeopardy challenges');
assert.ok(lessonCoreSource.includes('renderMathGrid(q)')&&lessonCoreSource.includes('q.type === "math-grid"'),'Lesson runner supports Equation Grid math challenges');
const historyJeopardy=context.K12_CLASSIC_25_DATA['g8:hist:L26'];
const mathGrid=context.K12_CLASSIC_25_DATA['g8:math:L26'];
assert.ok(historyJeopardy.questions.every(question=>question.type==='jeopardy'&&question.targetScore===3000),'History Jeopardy requires $3,000');
assert.ok(mathGrid.questions.every(question=>question.type==='math-grid'&&question.tiles.length===3),'Math uses three-tile Equation Grid challenges');
assert.ok(lessonCoreSource.includes('if(level>3) return;'),'Question voice is limited to Pre-K through Grade 3');
const readingSource=read('components/k12-progress-ui.js');
assert.ok(readingSource.includes('const canReadAloud=readingLevel<=3;'),'Reading voice controls are limited to Pre-K through Grade 3');
for(const [key,record] of Object.entries(context.K12_CLASSIC_25_DATA)){
  if(!(/^g11:/.test(key)||/^g(?:9|12):math:/.test(key)||/^g10:math:L(?:5|10|15)$/.test(key))) continue;
  assert.equal(record.questions.length,25,key);
  assert.equal(new Set(record.questions.map(q=>q.q)).size,25,`Unique prompts: ${key}`);
  for(const question of record.questions){
    assert.ok(question.explain&&question.explain!==question.answer,`Reasoned explanation: ${key}`);
    assert.ok(!/removes the need to examine|always produces one certain/.test(JSON.stringify(question)),`No generic distractors: ${key}`);
    assert.equal(question.choices.filter(c=>c===question.answer).length,1,`One matching answer: ${key}`);
    assert.equal(new Set(question.choices).size,question.choices.length,`Unique choices: ${key}`);
  }
}
for(const [grade,label] of [['g9','Geometry'],['g10','Algebra 2'],['g11','Precalculus'],['g12','Calculus']]){
  assert.equal(curriculum[grade].math.showName,`Grade ${grade.slice(1)} ${label}`);
}
// Exercise the actual access functions with simulated authoritative plans.
const account=read('components/k12-account.js');
const access=vm.createContext({authoritativeSubscriptionSubjects:()=>['math'],loggedIn:true,currentPortalRole:'parent',subscriptionAccessAllowed:()=>true,anySubjectAllowed:()=>true});
for(const name of ['subjectAllowed','gateAllowedSection']){
  const start=account.indexOf(`function ${name}(`);
  const end=account.indexOf('\nfunction ',start+1);
  vm.runInContext(account.slice(start,end),access);
}
assert.equal(access.subjectAllowed('alg1'),true);
assert.equal(access.gateAllowedSection('g8-alg1'),true);
assert.equal(access.gateAllowedSection('g1-handwriting'),false);
access.authoritativeSubscriptionSubjects=()=>['eng'];
assert.equal(access.gateAllowedSection('g3-handwriting'),true);
assert.equal(access.subjectAllowed('alg1'),false);

const navigationSource=read('components/k12-progress-ui.js');
const navigationStart=navigationSource.indexOf('function normalizeAppSection(');
const navigationEnd=navigationSource.indexOf('\nfunction show(',navigationStart);
const navigation=vm.createContext({document:{getElementById:id=>['home','g1-eng','g1-math','g9-math','g10-math'].includes(id)?{id}:null}});
vm.runInContext(navigationSource.slice(navigationStart,navigationEnd),navigation);
assert.equal(navigation.normalizeAppSection('grade1-eng'),'g1-eng','Older Grade 1 English route opens English');
assert.equal(navigation.normalizeAppSection('grade1-math'),'g1-math','Older Grade 1 Math route opens Math');
assert.equal(navigation.normalizeAppSection('g9-alg1'),'g9-math','Old Grade 9 Algebra route opens Geometry');
assert.equal(navigation.normalizeAppSection('g10-alg1'),'g10-math','Old Grade 10 Algebra route opens Algebra 2');
assert.equal(navigation.normalizeAppSection('missing-section'),'home','Invalid routes cannot leave a blank page');

// Content changes must reject old checkpoints without discarding unrelated work.
const core=read('components/k12-lesson-core.js');
let checkpoint={version:1,grade:'g11',subj:'math',lesson:'L1',current:{q:'Old algebra question'},round:3,total:25};
const resume=vm.createContext({LESSON_CHECKPOINT_VERSION:1,lessonCheckpointKey:()=> 'test',window:{K12_CLASSIC_25_DATA:{'g11:math:L1':{contentVersion:'20260907.1'}},learnMasterStore:{getItem:()=>JSON.stringify(checkpoint)}}});
const checkpointStart=core.indexOf('function readLessonCheckpoint(');
vm.runInContext(core.slice(checkpointStart,core.indexOf('\nfunction ',checkpointStart+1)),resume);
assert.equal(resume.readLessonCheckpoint('g11','math','L1'),null,'Old course checkpoints cannot reintroduce replaced questions');
checkpoint.contentVersion='20260907.1';
assert.equal(resume.readLessonCheckpoint('g11','math','L1').round,3,'Current content checkpoints still resume');
checkpoint.grade='g8';delete checkpoint.contentVersion;
assert.equal(resume.readLessonCheckpoint('g8','math','L1').round,3,'Unchanged lesson checkpoints still resume');

// Minimal DOM/event adapter runs the component's real handlers without a browser.
const ids=new Map();
class Element {
  constructor(tag='div',attrs={}){
    this.tagName=tag;this.attrs=attrs;this.children=[];this.events={};this.dataset={};this.checked='checked' in attrs;this.disabled='disabled' in attrs;this.hidden='hidden' in attrs;
    for(const [key,value] of Object.entries(attrs)){
      if(key.startsWith('data-')) this.dataset[key.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=value;
    }
    if(attrs.id)this.id=attrs.id;
    this.value=attrs.value||'';
  }
  set id(value){this._id=value;ids.set(value,this);}
  get id(){return this._id;}
  set innerHTML(value){
    this.html=value;this.children=[];
    for(const match of value.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi)){
      const attrs={};
      for(const attr of match[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g))attrs[attr[1]]=attr[2]??'';
      this.children.push(new Element(match[1],attrs));
    }
  }
  get innerHTML(){return this.html||'';}
  appendChild(child){this.children.push(child);}
  get lastElementChild(){return this.children[this.children.length-1]||null;}
  insertBefore(child,before){const index=this.children.indexOf(before);if(index<0)this.children.push(child);else this.children.splice(index,0,child);}
  addEventListener(type,fn){this.events[type]=fn;}
  emit(type,extra={}){return this.events[type]?.({target:this,preventDefault(){},...extra});}
  querySelectorAll(selector){
    if(selector.startsWith('#'))return this.children.filter(el=>el.id===selector.slice(1));
    const attr=selector.match(/^\[([^=\]]+)(?:="([^"]+)")?\]$/);
    if(attr)return this.children.filter(el=>attr[1] in el.attrs&&(attr[2]===undefined||el.attrs[attr[1]]===attr[2]));
    return this.children.filter(el=>el.tagName===selector);
  }
  querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
  focus(){}
  getBoundingClientRect(){return {left:0,top:0,width:500,height:210};}
  setPointerCapture(id){this.pointer=id;}
  hasPointerCapture(id){return this.pointer===id;}
  releasePointerCapture(){this.pointer=null;}
  getContext(){return new Proxy({font:'12px sans-serif',measureText(text){return {width:text.length*parseInt(this.font)*0.6};}},{get:(target,key)=>target[key]||(()=>{})});}
}
const host=new Element();
const menus=Array.from({length:6},()=>new Element());
let menuLookup=0,init;
const saved=new Map();
let learner='test-one',permitted=true;
const doc={readyState:'loading',addEventListener:(event,fn)=>{init=fn;},createElement:tag=>new Element(tag),getElementById:id=>ids.get(id),querySelector:selector=>selector==='.container'?host:menus[menuLookup++%6]};
const handwriting=vm.createContext({document:doc,requireLessonSubjectAccess:()=>permitted,getActiveKidId:()=>learner,getStoreKey:()=>`progress_${learner}`,learnMasterStore:{getItem:key=>saved.get(key),setItem:(key,value)=>saved.set(key,value)},show(){},console});
handwriting.window=handwriting;
vm.runInContext(read('components/k12-handwriting.js'),handwriting);
init();
assert.equal(host.children.length,3,'Three registered handwriting sections');
assert.ok(menus.every(menu=>menu.children.length===1),'Each grade and English menu has a handwriting button');
for(const records of Object.values(handwriting.K12HandwritingLessons)){
  assert.equal(records.length,5);
  for(const record of records){assert.equal(record.targets.length,25);assert.ok(record.targets.every(Boolean));}
}
handwriting.openHandwriting('g1');
let section=ids.get('g1-handwriting');
section.querySelector('[data-handwriting-lesson="capitals"]').emit('click');
assert.equal(ids.get('handwritingNext').disabled,true);
assert.equal(ids.get('handwritingReview').disabled,true,'Blank canvas cannot be marked as practiced');
let canvas=ids.get('handwritingCanvas');
canvas.emit('pointerdown',{pointerId:1,button:0,clientX:30,clientY:35});
canvas.emit('pointermove',{pointerId:1,clientX:60,clientY:65});
canvas.emit('pointerup',{pointerId:1});
assert.equal(ids.get('handwritingReview').disabled,false);
ids.get('handwritingReview').checked=true;ids.get('handwritingReview').emit('change');
assert.equal(ids.get('handwritingNext').disabled,false);
section.querySelector('[data-handwriting-clear]').emit('click');
assert.equal(ids.get('handwritingNext').disabled,true,'Clearing ink also clears the self-check');
section.querySelector('[value="paper"]').emit('change');
assert.equal(ids.get('handwritingScreen').hidden,true);
ids.get('handwritingReview').checked=true;ids.get('handwritingReview').emit('change');
ids.get('handwritingNext').emit('click');
assert.equal(JSON.parse(saved.get('progress_test-one_handwriting_v1'))['g1:capitals'].completed,1);
handwriting.openHandwriting('g1');
section.querySelector('[data-handwriting-lesson="capitals"]').emit('click');
assert.ok(section.innerHTML.includes('Step 2 of 25'),'Saved practice resumes at the next step');
section.querySelector('[value="paper"]').emit('change');
for(let i=1;i<25;i++){
  section.querySelector('[value="paper"]').emit('change');
  ids.get('handwritingReview').checked=true;ids.get('handwritingReview').emit('change');ids.get('handwritingNext').emit('click');
}
assert.ok(section.innerHTML.includes('Practice complete!'));
assert.equal(JSON.parse(saved.get('progress_test-one_handwriting_v1'))['g1:capitals'].completed,25);
learner='test-two';
handwriting.openHandwriting('g1');
assert.ok(section.innerHTML.includes('0 of 25 steps completed'),'Progress is isolated per learner');
for(const grade of ['g2','g3']){
  handwriting.openHandwriting(grade);
  const gradeSection=ids.get(`${grade}-handwriting`);
  gradeSection.querySelector('[data-handwriting-lesson]').emit('click');
  assert.ok(gradeSection.innerHTML.includes('Step 1 of 25'),'Longer handwriting models render');
}
const previous=section.innerHTML;
permitted=false;handwriting.openHandwriting('g2');
assert.equal(section.innerHTML,previous,'Blocked access does not open a handwriting lesson');
for(const file of fs.readdirSync(path.join(root,'components')).filter(file=>file.endsWith('.js'))){
  new vm.Script(read(`components/${file}`),{filename:file});
}
console.log('PASS: course sequence, topic coverage, 25-question playback, cloning, content quality, access mapping, handwriting drawing/clear/paper/resume/completion, learner isolation, and JavaScript syntax.');
