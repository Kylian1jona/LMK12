import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=path.resolve(import.meta.dirname,'..');
const context=vm.createContext({window:{}});
vm.runInContext(fs.readFileSync(path.join(root,'components','k12-reading-stories.js'),'utf8'),context);
const library=context.window.LearnMasterOriginalStories;
let count=0;
for(const gradeId of ['k','g1','g2','g3']){
  const stories=library[gradeId]?.subjects?.stories?.topics;
  assert.equal(stories?.length,10,`${gradeId} needs ten stories`);
  for(const story of stories){
    const art=story.illustration;
    assert.ok(art?.alt?.length>20,`${story.title} needs a descriptive image label`);
    const imagePath=path.resolve(root,art.src);
    assert.ok(imagePath.startsWith(path.join(root,'images','reading-stories')+path.sep));
    assert.ok(fs.existsSync(imagePath),`${story.title} is missing its picture`);
    assert.match(fs.readFileSync(imagePath,'utf8'),/^<svg\b[\s\S]*<\/svg>$/);
    count++;
  }
}
assert.equal(count,40);
console.log(`PASS: ${count} illustrated stories across Kindergarten through Grade 3`);
