const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');

class Element{
  constructor(){this.children=[];this.hidden=false;this.classList={add(){},remove(){},toggle(){}};}
  append(...nodes){this.children.push(...nodes);}
  replaceChildren(){this.children=[];}
  querySelector(){return this.children.find(item=>item.children?.length)?.children?.[0]||null;}
  setAttribute(){}
  focus(){}
}
const elements=new Map([
  ['pg2Question',new Element()],['pg2Interactive',new Element()],['playgroundGameMessage',new Element()]
]);
const frames=[];
const context=vm.createContext({
  document:{getElementById:id=>elements.get(id)||null,createElement:()=>new Element(),querySelectorAll:()=>[]},
  window:{addEventListener(){}},
  requestAnimationFrame:callback=>{frames.push(callback);return frames.length;},
  cancelAnimationFrame(){},performance:{now:()=>0},console
});
vm.runInContext(fs.readFileSync('components/k12-playground.js','utf8'),context);
const run=code=>vm.runInContext(code,context);
const answer=index=>{
  const choices=elements.get('pg2Question').children[1];
  assert.ok(choices?.children[index],`Question choice ${index} exists`);
  choices.children[index].onclick();
};
assert.equal(run('PLAYGROUND_GAMES.length'),5);
assert.equal(run('CAREER_PATHS.length'),5);
assert.equal(run('PLAYGROUND_PUZZLES.escape.length'),3);

run('PLAYGROUND_STATE.mode="escape";PLAYGROUND_STATE.escape={x:3,y:3,doors:[false,false,false],done:false};escapeMove(1,0)');
assert.equal(run('PLAYGROUND_STATE.escape.doors[0]'),false);
answer(1);
assert.equal(run('PLAYGROUND_STATE.escape.doors[0]'),true);
run('escapeMove(1,0)');
assert.equal(run('PLAYGROUND_STATE.escape.x'),4);

run('PLAYGROUND_STATE.mode="parkour";PLAYGROUND_STATE.parkour={step:0,jump:0,done:false};parkourJump()');
answer(1);
while(frames.length)frames.shift()(1000);
assert.equal(run('PLAYGROUND_STATE.parkour.step'),1);

run('PLAYGROUND_STATE.mode="defense";PLAYGROUND_STATE.defense={wave:0,health:3,energy:3,selected:"circuit",towers:[],enemies:[],running:false,done:false};buildDefense(0)');
answer(0);
assert.equal(run('PLAYGROUND_STATE.defense.towers[0].type'),'circuit');
assert.equal(run('PLAYGROUND_STATE.defense.energy'),2);

run('PLAYGROUND_STATE.mode="market";marketTrade("AUR",1)');
assert.equal(run('marketState().cash'),964);
run('marketNextDay()');
answer(1);
assert.equal(run('marketState().day'),1);
assert.equal(run('marketState().prices.AUR'),39);

run('PLAYGROUND_STATE.mode="career";chooseCareer("engineer");answerCareer(0)');
assert.equal(run('careerState().score'),1);
run('nextCareerChallenge()');
assert.equal(run('careerState().step'),1);
console.log('Playground game mechanics: 5 games, puzzles, movement, defense, market, and career checks passed.');
