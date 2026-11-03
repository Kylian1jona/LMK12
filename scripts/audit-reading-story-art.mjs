import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=path.resolve(import.meta.dirname,'..');
const context=vm.createContext({window:{}});
vm.runInContext(fs.readFileSync(path.join(root,'components','k12-reading-stories.js'),'utf8'),context);
const library=context.window.LearnMasterOriginalStories;
let count=0;
for(const gradeId of ['prek','k','g1','g2','g3']){
  const stories=library[gradeId]?.subjects?.stories?.topics;
  assert.equal(stories?.length,gradeId==='prek'?17:10,`${gradeId} story count`);
  if(gradeId==='prek'){
    const titles=stories.map(story=>story.title);
    assert.equal(new Set(titles).size,17,'Pre-K story titles must be unique');
    for(const title of ['The Three Little Pigs','Goldilocks and the Three Bears','Cinderella','The Tortoise and the Hare','Little Red Riding Hood','Jack and the Beanstalk','The Ugly Duckling','The Three Billy Goats Gruff'])
      assert.ok(titles.includes(title),`Pre-K is missing ${title}`);
  }
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
assert.equal(count,57);
console.log(`PASS: ${count} illustrated stories across Pre-K through Grade 3`);
