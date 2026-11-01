import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('components/k12-g1-english-more-20261031.js','utf8');
const context={window:{}};
vm.runInNewContext(source,context);
const banks=context.window.K12_EARLY_BANKS;
const keys=Object.keys(banks);
assert.equal(keys.length,20,'Expected 20 Grade 1 English lessons');
assert.equal(context.window.K12_G1_ENGLISH_MORE_KEYS.length,20);
const menu=fs.readFileSync('components/early-sections.js','utf8');
const groups=fs.readFileSync('components/k12-early-skill-groups.js','utf8');
const html=fs.readFileSync('index.html','utf8');
assert.ok(html.includes('components/k12-g1-english-more-20261031.js?v=20261031.1'));
let total=0;
for(const key of keys){
  assert.ok(key.startsWith('g1:eng:'));
  const lesson=banks[key];
  assert.equal(lesson.questions.length,25,`${key} question count`);
  assert.ok(menu.includes(`lessonCard("${key}"`),`${key} menu card missing`);
  assert.ok(groups.includes(key.split(':').at(-1)),`${key} group missing`);
  for(const [index,q] of lesson.questions.entries()){
    assert.ok(q.q&&q.audio,`${key} Q${index+1} lacks prompt or read aloud text`);
    if(q.type==='mc'||q.type==='dropdown'){
      assert.equal(q.choices.length,4,`${key} Q${index+1} choices`);
      assert.equal(new Set(q.choices).size,4,`${key} Q${index+1} duplicate choice`);
      assert.ok(q.choices.includes(q.answer),`${key} Q${index+1} missing answer`);
    }else if(q.type==='drag'){
      assert.equal(q.pairs.length,4,`${key} Q${index+1} matching pairs`);
      assert.equal(new Set(q.pairs.map(pair=>pair.word)).size,4,`${key} Q${index+1} repeated word`);
      assert.equal(new Set(q.pairs.map(pair=>pair.match)).size,4,`${key} Q${index+1} repeated match`);
    }else throw Error(`${key} Q${index+1} unsupported type ${q.type}`);
  }
  total+=lesson.questions.length;
}
assert.equal(total,500);
console.log('PASS: 20 Grade 1 English lessons, 500 valid questions, menu cards, and skill groups');
