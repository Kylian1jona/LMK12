import vm from 'node:vm';
import assert from 'node:assert/strict';
const base=process.argv[2];
if(!base)throw Error('Deploy URL required');
async function read(name){const response=await fetch(new URL(name,base));if(!response.ok)throw Error(`${name}: HTTP ${response.status}`);return response.text();}
const [html,bankSource,menu,groups,log]=await Promise.all([
  'index.html','components/k12-g1-english-more-20261031.js','components/early-sections.js','components/k12-early-skill-groups.js','components/auth-shell.js'
].map(read));
assert.ok(html.includes('k12-g1-english-more-20261031.js?v=20261031.1'));
assert.ok(html.includes('early-sections.js?v=g1-english-more-20261031.1'));
assert.ok(html.includes('k12-early-skill-groups.js?v=g1-english-more-20261031.1'));
assert.ok(log.includes('20 more Grade 1 English lessons'));
const context={window:{}};
vm.runInNewContext(bankSource,context);
const entries=Object.entries(context.window.K12_EARLY_BANKS);
assert.equal(entries.length,20);
for(const [key,lesson] of entries){
  assert.equal(lesson.questions.length,25);
  assert.ok(menu.includes(`lessonCard("${key}"`));
  assert.ok(groups.includes(key.split(':').at(-1)));
}
console.log(`PASS: ${base} serves 20 Grade 1 English lessons and 500 questions`);
