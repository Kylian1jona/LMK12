import vm from 'node:vm';
import assert from 'node:assert/strict';
const base=process.argv[2];
if(!base)throw Error('Deploy URL required');
async function read(name){const response=await fetch(new URL(name,base));if(!response.ok)throw Error(`${name}: HTTP ${response.status}`);return response.text();}
const [html,bankSource,moreSource,menu,groups,log,core]=await Promise.all([
  'index.html','components/k12-g1-english-more-20261031.js','components/k12-g1-english-more-20261031b.js','components/early-sections.js','components/k12-early-skill-groups.js','components/auth-shell.js','components/k12-lesson-core.js'
].map(read));
assert.ok(html.includes('k12-g1-english-more-20261031.js?v=20261031.1'));
assert.ok(html.includes('k12-g1-english-more-20261031b.js?v=20261031.1'));
assert.ok(html.includes('early-sections.js?v=g1-english-more-20261031.2'));
assert.ok(html.includes('k12-early-skill-groups.js?v=g1-english-more-20261031.2'));
assert.ok(log.includes('20 more Grade 1 English lessons'));
assert.ok(core.includes('EARLY_PROMPT_LEAD'));
const context={window:{}};
vm.runInNewContext(bankSource,context);
vm.runInNewContext(moreSource,context);
const entries=Object.entries(context.window.K12_EARLY_BANKS);
assert.equal(entries.length,40);
for(const [key,lesson] of entries){
  assert.equal(lesson.questions.length,25);
  assert.ok(menu.includes(`lessonCard("${key}"`));
  assert.ok(groups.includes(key.split(':').at(-1)));
}
console.log(`PASS: ${base} serves 40 added Grade 1 English lessons and 1,000 questions`);
