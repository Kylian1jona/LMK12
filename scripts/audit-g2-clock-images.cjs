const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');

const context=vm.createContext({window:{},document:{readyState:'loading',addEventListener(){},querySelector(){return null;}},LR:{round:1},makeFallbackLessonPack:()=>({})});
context.window=context;
vm.runInContext(fs.readFileSync('components/k12-curriculum.js','utf8'),context);
vm.runInContext(fs.readFileSync('components/k12-classic-25-g2.js','utf8'),context);

const expected=['4:00','5:05','6:10','7:15','8:20','9:25','10:30','11:35','12:40','1:45','2:50','3:55','8:08','9:15','10:22','11:29','12:36','1:44','2:51','3:58','4:05','5:12','6:20','7:27','8:34'];
const questions=context.K12_CLASSIC_25_DATA['g2:math:L3'].questions;
assert.equal(questions.length,expected.length);
questions.forEach((question,index)=>{
  const [hour,minute]=expected[index].split(':').map(Number);
  assert(question.image.src.startsWith('data:image/svg+xml,'),`Question ${index+1} must use a precise clock diagram`);
  const svg=decodeURIComponent(question.image.src.slice('data:image/svg+xml,'.length));
  const hands=[...svg.matchAll(/<line x1="260" y1="260" x2="([\d.]+)" y2="([\d.]+)"/g)];
  assert.equal(hands.length,2,`Question ${index+1} needs two hands`);
  const angle=hand=>(Math.atan2(Number(hand[1])-260,260-Number(hand[2]))*180/Math.PI+360)%360;
  const close=(actual,wanted)=>Math.min(Math.abs(actual-wanted),360-Math.abs(actual-wanted))<0.1;
  assert(close(angle(hands[0]),((hour%12)+minute/60)*30),`Question ${index+1} hour hand is wrong`);
  assert(close(angle(hands[1]),minute*6),`Question ${index+1} minute hand is wrong`);
  assert.equal(question.audio,question.q);
  assert(question.choices.includes(question.answer));
  if(index<12) assert(!question.q.includes(expected[index]),`Question ${index+1} reveals its answer`);
});
assert.match(questions[18].q,/2:56 a\.m\./);
assert.equal(questions[18].answer,'False');
console.log('PASS: all 25 Grade 2 clocks match their intended times; questions do not reveal the answer');
