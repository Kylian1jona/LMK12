import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('components/k12-reading-pyramids.js','utf8');
const sandbox={window:{},document:{readyState:'loading',addEventListener(){}}};
vm.runInNewContext(source,sandbox);
const scenes=sandbox.window.K12_READING_PYRAMID_SCENES;
for(const grade of ['k','g1']){
  assert.equal(scenes[grade].length,8);
  for(const scene of scenes[grade]){
    assert.ok(scene.picture&&scene.setting&&scene.label);
    assert.ok(scene.words.every(word=>/^[a-z]+$/.test(word)));
    assert.ok(scene.words.length>=(grade==='k'?4:7));
  }
}
assert.ok(Math.min(...scenes.g1.map(scene=>scene.words.length))>Math.max(...scenes.k.map(scene=>scene.words.length)));
const html=fs.readFileSync('index.html','utf8');
for(const asset of ['components/k12-reading-pyramids.js','components/k12-reading-pyramids.css'])assert.ok(html.includes(asset));
for(const grade of ['k','g1'])assert.ok(fs.readFileSync('components/early-sections.js','utf8').includes(`pyramidCard("${grade}"`));
assert.ok(fs.readFileSync('components/k12-account.js','utf8').includes('sectionId === "readingPyramid"'));
assert.ok(fs.readFileSync('components/k12-progress-ui.js','utf8').includes('"readingPyramid",'));
console.log('PASS: 8 picture pyramids per grade; Grade 1 lines are longer; assets and navigation are wired');
