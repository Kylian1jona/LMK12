import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const core=fs.readFileSync('components/k12-lesson-core.js','utf8');
const start=core.indexOf('const LESSON_PROMPT_LEAD=');
const end=core.indexOf('function normalizeLessonQuestion(',start);
assert.ok(start>=0&&end>start);
const context={};
vm.runInNewContext(core.slice(start,end)+'\nglobalThis.clean=removeLessonPromptLead;',context);
const early=fs.readFileSync('components/k12-early-expanded-lessons.js','utf8');
const leadStart=early.indexOf('const promptLeads=');
const leadEnd=early.indexOf('function addBank(',leadStart);
assert.ok(leadStart>=0&&leadEnd>leadStart);
vm.runInNewContext(early.slice(leadStart,leadEnd)+'\nglobalThis.leads=promptLeads;',context);
assert.equal(context.leads.length,25);
for(const lead of context.leads){
  assert.equal(context.clean(`${lead} Which word rhymes with cat?`),'Which word rhymes with cat?');
  assert.equal(context.clean(`${lead} Read this sentence aloud.`),'Read this sentence aloud.');
}
const banks={window:{K12_EARLY_BANKS:Object.create(null)}};
vm.runInNewContext(early,banks);
for(const [key,lesson] of Object.entries(banks.window.K12_EARLY_BANKS)){
  if(!key.startsWith('g1:eng:'))continue;
  for(const q of lesson.questions)assert.equal(context.clean(q.q),q.q,`${key} still has a question lead-in`);
}
console.log('PASS: all 25 early-grade lead-ins are removed from displayed questions and read-aloud; Grade 1 English bank text starts with the question');
