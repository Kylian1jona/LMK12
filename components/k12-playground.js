/* LearnMaster Playground: five free, curriculum-led games. */
const PLAYGROUND_GAMES=[
  {id:"escape",name:"Escape the School",eyebrow:"TOP-DOWN ADVENTURE",icon:"▦",description:"Explore four rooms. Solve math, science, and vocabulary locks to reach the exit."},
  {id:"parkour",name:"Math Parkour",eyebrow:"PLATFORM CHALLENGE",icon:"↗",description:"Solve a problem to make each jump and cross the sky course."},
  {id:"defense",name:"Science Tower Defense",eyebrow:"STRATEGY LAB",icon:"⌁",description:"Choose circuits, chemical reactions, and forces to protect the lab."},
  {id:"market",name:"Stock Market Simulator",eyebrow:"VIRTUAL ECONOMY",icon:"▥",description:"Build a practice portfolio and learn how price changes and risk affect it."},
  {id:"career",name:"Career Quest",eyebrow:"REAL-WORLD DECISIONS",icon:"✦",description:"Try five careers through practical, job-based challenges."}
];
const PLAYGROUND_PUZZLES={
  escape:[
    {prompt:"Math room: What is 7 × 8?",choices:["54","56","64"],answer:1,explain:"Seven groups of eight make 56."},
    {prompt:"Science lab: What completes a simple electric circuit?",choices:["A closed path","An open switch","A plastic gap"],answer:0,explain:"Current flows when the path is closed."},
    {prompt:"Library: Which word means 'careful and exact'?",choices:["Precise","Hasty","Vague"],answer:0,explain:"Precise means accurate and exact."}
  ],
  parkour:[
    {prompt:"What is 18 ÷ 3?",choices:["5","6","9"],answer:1,explain:"18 split into three equal groups is 6."},
    {prompt:"What is 25% of 80?",choices:["15","20","25"],answer:1,explain:"One quarter of 80 is 20."},
    {prompt:"Solve: 4x = 28",choices:["6","7","8"],answer:1,explain:"Divide both sides by 4 to get x = 7."},
    {prompt:"What is 3/4 + 1/8?",choices:["4/12","7/8","1"],answer:1,explain:"3/4 is 6/8, so the sum is 7/8."},
    {prompt:"A $30 item is 10% off. What is the sale price?",choices:["$27","$20","$33"],answer:0,explain:"Ten percent of $30 is $3; $30 − $3 = $27."}
  ],
  defense:{
    circuit:{prompt:"Why does the electric barrier need a closed circuit?",choices:["Current needs a complete path","Current travels only through air","An open path is stronger"],answer:0,explain:"An electric current needs a complete path."},
    reaction:{prompt:"How can a base help neutralize an acid spill?",choices:["By reacting with the acid","By adding more acid","By removing all water instantly"],answer:0,explain:"An acid and a base can react to make a less acidic mixture."},
    force:{prompt:"Which force can slow a rolling rock?",choices:["Friction","Brightness","Evaporation"],answer:0,explain:"Friction opposes motion between surfaces."}
  },
  market:[
    {prompt:"If a $20 share rises 10%, what is its new price?",choices:["$21","$22","$30"],answer:1,explain:"Ten percent of $20 is $2, so the new price is $22."},
    {prompt:"What is diversification?",choices:["Buying different investments","Buying only one stock","Spending all your cash"],answer:0,explain:"Different investments can reduce concentration risk."},
    {prompt:"A share falls from $50 to $40. What percent did it lose?",choices:["10%","20%","25%"],answer:1,explain:"The $10 loss is 20% of the original $50."},
    {prompt:"Which portfolio is more concentrated?",choices:["All money in one stock","Money across three stocks","Cash plus several stocks"],answer:0,explain:"Holding only one stock puts all the risk in one company."}
  ]
};
const CAREER_PATHS=[
  {id:"engineer",name:"Engineer",icon:"⚙",description:"Design and test solutions.",challenges:[
    {prompt:"A bridge model bends under a heavy load. What should you do first?",choices:["Measure where it bends and test a stronger design","Paint it a new color","Ignore the result"],answer:0,explain:"Engineers use test results to improve a design."},
    {prompt:"Your team has a limited material budget. Which plan is best?",choices:["Choose the most expensive material automatically","Compare strength and cost before choosing","Skip testing"],answer:1,explain:"A good design balances performance and cost."}]},
  {id:"nurse",name:"Nurse",icon:"✚",description:"Observe, communicate, and care.",challenges:[
    {prompt:"A patient says they feel dizzy after standing. What is the safest first response?",choices:["Help them sit and tell the care team","Tell them to run","Ignore them"],answer:0,explain:"Safety and clear communication come first."},
    {prompt:"You notice a change in a patient's temperature. What should you do?",choices:["Guess the number","Hide the change","Record it accurately and report it"],answer:2,explain:"Care teams rely on accurate observations."}]},
  {id:"chef",name:"Chef",icon:"♨",description:"Plan food, timing, and safety.",challenges:[
    {prompt:"A recipe serves 4 but you need 8 servings. What happens to each ingredient amount?",choices:["Halve it","Double it","Leave it unchanged"],answer:1,explain:"Eight is twice four, so double the recipe."},
    {prompt:"A cutting board held raw chicken. What should happen before cutting fruit?",choices:["Wash and sanitize the board","Wipe it with a dry cloth","Use it immediately"],answer:0,explain:"Cleaning helps prevent cross-contamination."}]},
  {id:"architect",name:"Architect",icon:"⌂",description:"Design spaces people can use.",challenges:[
    {prompt:"A doorway is too narrow for a wheelchair. What is the right design response?",choices:["Add a sign only","Leave it as drawn","Widen the doorway and check access standards"],answer:2,explain:"Accessible design considers how people move through a space."},
    {prompt:"A plan uses 1 cm to represent 2 m. How long is a 6 m wall on the plan?",choices:["3 cm","6 cm","12 cm"],answer:0,explain:"Six divided by two equals three centimeters."}]},
  {id:"journalist",name:"Journalist",icon:"✎",description:"Verify facts and tell clear stories.",challenges:[
    {prompt:"Two sources disagree about an event. What should you do?",choices:["Check evidence and seek another reliable source","Publish the first claim","Make up a compromise"],answer:0,explain:"Journalists verify claims before publication."},
    {prompt:"Which opening gives readers the clearest fact?",choices:["Something happened somewhere.","The council approved a new park Tuesday.","Everyone will love this."],answer:1,explain:"A clear opening states a verifiable event."}]}
];
const PLAYGROUND_STATE={mode:"escape",raf:0,lastTime:0,puzzleOpen:false,escape:null,parkour:null,defense:null,market:null,career:null};
const $pg=id=>document.getElementById(id);
const pgSafe=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[char]);

function cancelPlaygroundLoop(){cancelAnimationFrame(PLAYGROUND_STATE.raf);PLAYGROUND_STATE.raf=0;PLAYGROUND_STATE.lastTime=0;if(PLAYGROUND_STATE.defense)PLAYGROUND_STATE.defense.running=false;if(PLAYGROUND_STATE.parkour)PLAYGROUND_STATE.parkour.jump=0;}
function playgroundMessage(message){const element=$pg("playgroundGameMessage");if(element)element.textContent=message;}
function renderPlayground(){
  cancelPlaygroundLoop();
  const host=$pg("playgroundPanel");if(!host)return;
  host.innerHTML=`<div class="pg2-shell"><header class="pg2-hero"><div><span>PLAYGROUND · FREE TO PLAY</span><h1>Learn by playing</h1><p>Five adventures built around real decisions, useful skills, and hands-on challenges.</p></div><div class="pg2-hero-mark" aria-hidden="true">✦</div></header><div class="pg2-layout"><nav class="pg2-game-list" aria-label="Choose a game">${PLAYGROUND_GAMES.map(game=>`<button type="button" data-pg-game="${game.id}" onclick="switchPlaygroundGame('${game.id}')"><span class="pg2-icon">${game.icon}</span><span><small>${game.eyebrow}</small><strong>${game.name}</strong><em>${game.description}</em></span></button>`).join("")}</nav><section class="pg2-content"><div id="pg2GameHost"></div></section></div></div>`;
  switchPlaygroundGame(PLAYGROUND_STATE.mode);
}
function switchPlaygroundGame(mode){
  if(!PLAYGROUND_GAMES.some(game=>game.id===mode))return;
  cancelPlaygroundLoop();PLAYGROUND_STATE.mode=mode;PLAYGROUND_STATE.puzzleOpen=false;
  document.querySelectorAll("[data-pg-game]").forEach(button=>{const active=button.dataset.pgGame===mode;button.classList.toggle("active",active);button.setAttribute("aria-current",active?"true":"false");});
  const game=PLAYGROUND_GAMES.find(item=>item.id===mode);
  const host=$pg("pg2GameHost");if(!host)return;
  const canvasGame=["escape","parkour","defense"].includes(mode);
  host.innerHTML=`<div class="pg2-content-head"><span>${game.eyebrow}</span><h2>${game.name}</h2><p>${game.description}</p></div><div class="pg2-status" id="playgroundGameMessage" role="status" aria-live="polite"></div>${canvasGame?`<div class="pg2-stage"><canvas id="pg2Canvas" width="900" height="560" aria-label="${game.name} game board"></canvas><div class="pg2-question" id="pg2Question" hidden></div></div><div class="pg2-controls" id="pg2Controls"></div>`:`<div class="pg2-question pg2-question-inline" id="pg2Question" hidden></div><div id="pg2Interactive"></div>`}`;
  if(mode==="escape")initEscape();
  if(mode==="parkour")initParkour();
  if(mode==="defense")initDefense();
  if(mode==="market")renderMarket();
  if(mode==="career")renderCareer();
}
function resetPlaygroundGame(){PLAYGROUND_STATE[PLAYGROUND_STATE.mode]=null;switchPlaygroundGame(PLAYGROUND_STATE.mode);}
function playgroundCanvas(){return $pg("pg2Canvas")?.getContext("2d");}
function showPlaygroundQuestion(question,onCorrect){
  const host=$pg("pg2Question");if(!host)return;
  PLAYGROUND_STATE.puzzleOpen=true;host.hidden=false;host.replaceChildren();
  const title=document.createElement("h3");title.textContent=question.prompt;
  const choices=document.createElement("div");choices.className="pg2-question-choices";
  const feedback=document.createElement("p");feedback.className="pg2-question-feedback";feedback.setAttribute("role","status");
  question.choices.forEach((choice,index)=>{const button=document.createElement("button");button.type="button";button.textContent=choice;button.onclick=()=>{
    if(index!==question.answer){feedback.textContent=`Try again. ${question.explain}`;button.classList.add("incorrect");return;}
    feedback.textContent=question.explain;PLAYGROUND_STATE.puzzleOpen=false;host.hidden=true;onCorrect();
  };choices.append(button);});
  host.append(title,choices,feedback);choices.querySelector("button")?.focus();
}
function drawGridLabel(ctx,text,x,y){ctx.fillStyle="#203c48";ctx.font="700 17px Fredoka, sans-serif";ctx.fillText(text,x,y);}

/* Four connected rooms with three curriculum locks. */
function initEscape(){
  PLAYGROUND_STATE.escape??={x:2,y:3,doors:[false,false,false],done:false};
  $pg("pg2Controls").innerHTML=`<div class="pg2-control-copy">Move with arrow keys, WASD, or the buttons. Walk into a gold door to solve its lock.</div><div class="pg2-direction-pad"><button type="button" onclick="escapeMove(0,-1)" aria-label="Move up">↑</button><button type="button" onclick="escapeMove(-1,0)" aria-label="Move left">←</button><button type="button" onclick="escapeMove(0,1)" aria-label="Move down">↓</button><button type="button" onclick="escapeMove(1,0)" aria-label="Move right">→</button></div><button type="button" class="pg2-reset" onclick="resetPlaygroundGame()">Restart</button>`;
  playgroundMessage("Find the first gold door and solve its math lock.");drawEscape();
}
function drawEscape(){
  const ctx=playgroundCanvas(),s=PLAYGROUND_STATE.escape;if(!ctx||!s)return;
  const tile=52,ox=82,oy=72;ctx.clearRect(0,0,900,560);ctx.fillStyle="#dbeaf0";ctx.fillRect(0,0,900,560);
  ctx.fillStyle="#f8f5e9";ctx.fillRect(ox,oy,14*tile,8*tile);
  for(let y=0;y<8;y++)for(let x=0;x<14;x++){
    const wall=y===0||y===7||x===0||x===13||([4,7,10].includes(x)&&y!==3);
    ctx.fillStyle=wall?"#345265":(x+y)%2?"#edf5ee":"#f9fbf4";ctx.fillRect(ox+x*tile,oy+y*tile,tile-2,tile-2);
    if([4,7,10].includes(x)&&y===3){const index=[4,7,10].indexOf(x);ctx.fillStyle=s.doors[index]?"#59b58c":"#e9a94b";ctx.fillRect(ox+x*tile+5,oy+y*tile+4,tile-12,tile-10);ctx.fillStyle="#fff";ctx.font="bold 22px Arial";ctx.fillText(s.doors[index]?"✓":"●",ox+x*tile+17,oy+y*tile+32);}
  }
  ["MATH","SCIENCE","WORDS","EXIT"].forEach((label,index)=>drawGridLabel(ctx,label,ox+[1,5,8,11][index]*tile,oy+tile+15));
  [[2,5],[5,5],[8,5],[11,5]].forEach(([x,y])=>{ctx.fillStyle="#b28a61";ctx.fillRect(ox+x*tile+7,oy+y*tile+11,35,23);});
  ctx.fillStyle="#37b790";ctx.fillRect(ox+12*tile+10,oy+3*tile+7,30,36);ctx.fillStyle="#fff";ctx.font="bold 16px Arial";ctx.fillText("E",ox+12*tile+19,oy+3*tile+31);
  const px=ox+s.x*tile+25,py=oy+s.y*tile+25;ctx.fillStyle="#164a72";ctx.beginPath();ctx.arc(px,py,19,0,Math.PI*2);ctx.fill();ctx.fillStyle="#fff";ctx.font="bold 22px Arial";ctx.fillText("★",px-12,py+8);
  drawGridLabel(ctx,`Doors opened: ${s.doors.filter(Boolean).length} / 3`,ox,37);
}
function escapeMove(dx,dy){
  if(PLAYGROUND_STATE.mode!=="escape"||PLAYGROUND_STATE.puzzleOpen)return;
  const s=PLAYGROUND_STATE.escape;if(!s||s.done)return;
  const x=s.x+dx,y=s.y+dy;
  if(x<1||x>12||y<1||y>6||([4,7,10].includes(x)&&y!==3))return;
  const door=[4,7,10].indexOf(x);
  if(door>=0&&!s.doors[door]){
    showPlaygroundQuestion(PLAYGROUND_PUZZLES.escape[door],()=>{s.doors[door]=true;playgroundMessage(`${["Math","Science","Vocabulary"][door]} door unlocked. Keep exploring!`);drawEscape();});return;
  }
  s.x=x;s.y=y;drawEscape();
  if(x===12&&y===3&&s.doors.every(Boolean)){s.done=true;playgroundMessage("You escaped the school! Every room is unlocked. Restart to play again.");}
}

/* A question unlocks each animated platform jump. */
function initParkour(){
  PLAYGROUND_STATE.parkour??={step:0,jump:0,done:false};
  $pg("pg2Controls").innerHTML=`<div class="pg2-control-copy">Solve a question before every jump. Press Space or use the jump button.</div><button type="button" class="pg2-primary-action" onclick="parkourJump()">Solve & jump</button><button type="button" class="pg2-reset" onclick="resetPlaygroundGame()">Restart</button>`;
  playgroundMessage(`Platform ${PLAYGROUND_STATE.parkour.step+1} of 6. Solve to reach the next one.`);drawParkour();
}
function drawParkour(){
  const ctx=playgroundCanvas(),s=PLAYGROUND_STATE.parkour;if(!ctx||!s)return;
  const xs=[65,205,345,485,625,765],ys=[400,345,390,315,355,280];
  ctx.clearRect(0,0,900,560);const sky=ctx.createLinearGradient(0,0,0,560);sky.addColorStop(0,"#a9dff5");sky.addColorStop(1,"#eff9ff");ctx.fillStyle=sky;ctx.fillRect(0,0,900,560);
  ctx.fillStyle="#fff9";[[100,120],[460,80],[750,155]].forEach(([x,y])=>{ctx.beginPath();ctx.ellipse(x,y,65,22,0,0,Math.PI*2);ctx.fill();});
  xs.forEach((x,i)=>{ctx.fillStyle=i<=s.step?"#1a8e83":"#54798f";ctx.fillRect(x,ys[i],96,18);ctx.fillStyle="#d7a16e";ctx.fillRect(x+9,ys[i]+18,78,12);ctx.fillStyle="#fff";ctx.font="bold 15px Arial";ctx.fillText(String(i+1),x+43,ys[i]+15);});
  const from=s.step,to=Math.min(s.step+1,5),travel=s.jump||0;
  const x=xs[from]+48+(xs[to]-xs[from])*travel,y=ys[from]-24+(ys[to]-ys[from])*travel-Math.sin(Math.PI*travel)*95;
  ctx.fillStyle="#f9a555";ctx.beginPath();ctx.arc(x,y,22,0,Math.PI*2);ctx.fill();ctx.fillStyle="#173c52";ctx.font="bold 22px Arial";ctx.fillText("★",x-13,y+8);
  drawGridLabel(ctx,`Jumps completed: ${s.step} / 5`,40,45);
}
function parkourJump(){
  if(PLAYGROUND_STATE.mode!=="parkour"||PLAYGROUND_STATE.puzzleOpen)return;
  const s=PLAYGROUND_STATE.parkour;if(!s||s.done||s.jump)return;
  showPlaygroundQuestion(PLAYGROUND_PUZZLES.parkour[s.step],()=>{
    const start=performance.now();
    const tick=now=>{s.jump=Math.min(1,(now-start)/650);drawParkour();if(s.jump<1){PLAYGROUND_STATE.raf=requestAnimationFrame(tick);return;}
      s.step++;s.jump=0;s.done=s.step===5;drawParkour();playgroundMessage(s.done?"Course complete! You solved every jump.":`Nice landing! Platform ${s.step+1} of 6.`);};
    PLAYGROUND_STATE.raf=requestAnimationFrame(tick);
  });
}

/* Match each threat to a scientific defense, then run the wave. */
const DEFENSE_TOOLS={circuit:{name:"Electric circuit",icon:"⚡",beats:"robot"},reaction:{name:"Neutralizing reaction",icon:"◈",beats:"acid"},force:{name:"Friction barrier",icon:"▰",beats:"rock"}};
const DEFENSE_WAVES=[["robot","acid","rock"],["acid","rock","robot"],["rock","robot","acid"]];
function initDefense(){
  PLAYGROUND_STATE.defense??={wave:0,health:3,energy:3,selected:"circuit",towers:[],enemies:[],running:false,done:false};
  const controls=$pg("pg2Controls");
  controls.innerHTML=`<div class="pg2-control-copy">Choose a defense, then click a lane or use its button. Answer the science question to build it. Each wave gives you three builds.</div><div class="pg2-tool-row">${Object.entries(DEFENSE_TOOLS).map(([id,tool])=>`<button type="button" data-defense-tool="${id}" onclick="selectDefenseTool('${id}')">${tool.icon} ${tool.name}</button>`).join("")}</div><div class="pg2-lane-row"><button type="button" onclick="buildDefense(0)">Place lane 1</button><button type="button" onclick="buildDefense(1)">Place lane 2</button><button type="button" onclick="buildDefense(2)">Place lane 3</button></div><button type="button" class="pg2-primary-action" onclick="startDefenseWave()">Start wave</button><button type="button" class="pg2-reset" onclick="resetPlaygroundGame()">Restart</button>`;
  $pg("pg2Canvas").onclick=event=>{const rect=event.currentTarget.getBoundingClientRect();const y=(event.clientY-rect.top)*560/rect.height;const lane=Math.floor((y-110)/120);if(lane>=0&&lane<3)buildDefense(lane);};
  selectDefenseTool(PLAYGROUND_STATE.defense.selected);drawDefense();
}
function selectDefenseTool(id){const s=PLAYGROUND_STATE.defense;if(!s||!DEFENSE_TOOLS[id])return;s.selected=id;document.querySelectorAll("[data-defense-tool]").forEach(button=>button.classList.toggle("active",button.dataset.defenseTool===id));playgroundMessage(`Selected ${DEFENSE_TOOLS[id].name}. Click a lane to build.`);}
function buildDefense(lane){
  const s=PLAYGROUND_STATE.defense;if(!s||s.running||s.done||PLAYGROUND_STATE.puzzleOpen)return;
  if(s.energy<=0){playgroundMessage("No builds left this wave. Start the wave.");return;}
  if(s.towers.some(tower=>tower.lane===lane)){playgroundMessage("That lane already has a defense.");return;}
  const type=s.selected;
  showPlaygroundQuestion(PLAYGROUND_PUZZLES.defense[type],()=>{s.towers.push({lane,type});s.energy--;drawDefense();playgroundMessage(`${DEFENSE_TOOLS[type].name} built in lane ${lane+1}. ${s.energy} builds left.`);});
}
function startDefenseWave(){
  const s=PLAYGROUND_STATE.defense;if(!s||s.running||s.done)return;
  s.running=true;s.enemies=DEFENSE_WAVES[s.wave].map((type,lane)=>({lane,type,x:785,alive:true}));
  playgroundMessage(`Wave ${s.wave+1} is moving. Watch the defenses work!`);
  const tick=now=>{const delta=Math.min(50,now-(PLAYGROUND_STATE.lastTime||now));PLAYGROUND_STATE.lastTime=now;
    s.enemies.forEach(enemy=>{if(!enemy.alive)return;enemy.x-=delta*.23;
      const tower=s.towers.find(item=>item.lane===enemy.lane);
      if(enemy.x<400&&tower?.type&&DEFENSE_TOOLS[tower.type].beats===enemy.type){enemy.alive=false;return;}
      if(enemy.x<110){enemy.alive=false;s.health--;}
    });drawDefense();
    if(s.enemies.some(enemy=>enemy.alive)){PLAYGROUND_STATE.raf=requestAnimationFrame(tick);return;}
    s.running=false;PLAYGROUND_STATE.lastTime=0;s.wave++;s.towers=[];s.energy=3;
    if(s.health<=0){s.done=true;playgroundMessage("The lab was breached. Restart and match each defense to its threat.");}
    else if(s.wave>=3){s.done=true;playgroundMessage("Lab defended! You used science to survive all three waves.");}
    else playgroundMessage(`Wave clear. ${s.health} lab shields remain. Prepare wave ${s.wave+1}.`);
    drawDefense();};
  PLAYGROUND_STATE.raf=requestAnimationFrame(tick);
}
function drawDefense(){
  const ctx=playgroundCanvas(),s=PLAYGROUND_STATE.defense;if(!ctx||!s)return;
  ctx.clearRect(0,0,900,560);ctx.fillStyle="#e8f4ee";ctx.fillRect(0,0,900,560);drawGridLabel(ctx,`Wave ${Math.min(s.wave+1,3)} / 3   Lab shields: ${s.health}   Builds: ${s.energy}`,38,48);
  [0,1,2].forEach(lane=>{const y=110+lane*120;ctx.fillStyle=lane%2?"#dce9e4":"#f4f8ec";ctx.fillRect(85,y,740,105);ctx.fillStyle="#174f61";ctx.fillRect(86,y+15,25,74);ctx.fillStyle="#fff";ctx.font="bold 16px Arial";ctx.fillText(String(lane+1),92,y+57);ctx.fillStyle="#adcabc";ctx.fillRect(120,y+75,690,5);});
  s.towers.forEach(tower=>{const y=110+tower.lane*120;ctx.fillStyle="#235b76";ctx.fillRect(300,y+23,65,58);ctx.fillStyle="#fff";ctx.font="bold 31px Arial";ctx.fillText(DEFENSE_TOOLS[tower.type].icon,315,y+64);});
  s.enemies.filter(enemy=>enemy.alive).forEach(enemy=>{const y=110+enemy.lane*120;ctx.fillStyle=enemy.type==="robot"?"#8567b5":enemy.type==="acid"?"#78b255":"#a07556";ctx.beginPath();ctx.arc(enemy.x,y+50,30,0,Math.PI*2);ctx.fill();ctx.fillStyle="#fff";ctx.font="bold 14px Arial";ctx.fillText(enemy.type.toUpperCase(),enemy.x-25,y+55);});
  ctx.fillStyle="#45606a";ctx.font="15px Fredoka, sans-serif";(DEFENSE_WAVES[Math.min(s.wave,2)]||[]).forEach((type,lane)=>ctx.fillText(`Lane ${lane+1} · ${type}`,105+lane*260,535));
}

/* Fictional assets and day-by-day price changes. No money is used. */
const MARKET_ASSETS=[{id:"AUR",name:"Aurora Tech",risk:"High",price:36},{id:"RIV",name:"River Utilities",risk:"Low",price:22},{id:"GRO",name:"Green Grocer",risk:"Medium",price:28}];
const MARKET_CHANGES=[[8,1,3],[-6,2,1],[5,-1,-2],[-8,2,4],[9,1,-1],[-3,2,2],[7,-1,3],[-5,1,2],[4,1,-2],[3,1,2]];
const MARKET_EVENTS=["New product excitement boosts Aurora Tech.","Investors favor steady utilities as tech cools.","A supply change affects grocery costs.","A market dip reminds investors that prices can fall.","A strong report lifts technology shares.","Mixed news produces uneven returns.","A new contract lifts Aurora Tech.","Risk concerns cause a short pullback.","Several companies report steady sales.","The final trading day closes."];
function marketState(){return PLAYGROUND_STATE.market??={day:0,cash:1000,holdings:{AUR:0,RIV:0,GRO:0},prices:{AUR:36,RIV:22,GRO:28},history:[1000],event:"Start with $1,000 in virtual cash. Buy shares, then advance the day.",done:false};}
function marketValue(){const s=marketState();return Math.round(s.cash+MARKET_ASSETS.reduce((sum,asset)=>sum+s.holdings[asset.id]*s.prices[asset.id],0));}
function marketTrade(id,change){const s=marketState();if(s.done||!s.prices[id])return;const price=s.prices[id];if(change>0&&s.cash<price){s.event="Not enough virtual cash for that share.";renderMarket();return;}if(change<0&&s.holdings[id]<1){s.event="You do not own a share to sell.";renderMarket();return;}s.holdings[id]+=change;s.cash-=change*price;s.event=`${change>0?"Bought":"Sold"} one ${id} share for $${price}.`;renderMarket();}
function marketNextDay(){const s=marketState();if(s.done||PLAYGROUND_STATE.puzzleOpen)return;showPlaygroundQuestion(PLAYGROUND_PUZZLES.market[s.day%PLAYGROUND_PUZZLES.market.length],()=>{MARKET_ASSETS.forEach((asset,index)=>{s.prices[asset.id]=Math.max(5,Math.round(s.prices[asset.id]*(1+MARKET_CHANGES[s.day][index]/100)));});s.event=MARKET_EVENTS[s.day];s.day++;s.history.push(marketValue());s.done=s.day>=10;renderMarket();});}
function renderMarket(){
  const host=$pg("pg2Interactive"),s=marketState();if(!host)return;
  const total=marketValue(),gain=total-1000,invested=total-s.cash,largest=Math.max(...MARKET_ASSETS.map(asset=>s.holdings[asset.id]*s.prices[asset.id]));
  const risk=invested===0?"No holdings yet":largest/invested>.7?"Concentrated":largest/invested>.45?"Moderate":"Diversified";
  const points=s.history.map((value,index)=>`${20+index*45},${130-(value-1000)*.3}`).join(" ");
  host.innerHTML=`<div class="pg2-market-summary"><article><small>PORTFOLIO VALUE</small><strong>$${total}</strong><span class="${gain>=0?"positive":"negative"}">${gain>=0?"+":""}$${gain} from start</span></article><article><small>VIRTUAL CASH</small><strong>$${s.cash}</strong><span>Available to invest</span></article><article><small>RISK MIX</small><strong>${risk}</strong><span>Spread holdings to reduce concentration</span></article></div><div class="pg2-market-chart"><div><b>Day ${s.day} of 10</b><span>Portfolio history</span></div><svg viewBox="0 0 500 170" role="img" aria-label="Portfolio value over time"><line x1="15" y1="130" x2="490" y2="130" stroke="#b6cbc7" stroke-width="2"/><polyline points="${points}" fill="none" stroke="#127d75" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></div><p class="pg2-event" role="status">${pgSafe(s.event)}</p><div class="pg2-stock-grid">${MARKET_ASSETS.map(asset=>`<article><div><small>${asset.id} · ${asset.risk} risk</small><h3>${asset.name}</h3></div><strong>$${s.prices[asset.id]}</strong><span>You own ${s.holdings[asset.id]} share${s.holdings[asset.id]===1?"":"s"}</span><div><button type="button" onclick="marketTrade('${asset.id}',1)" ${s.done?"disabled":""}>Buy 1</button><button type="button" onclick="marketTrade('${asset.id}',-1)" ${s.done?"disabled":""}>Sell 1</button></div></article>`).join("")}</div><div class="pg2-bottom-actions"><button type="button" class="pg2-primary-action" onclick="marketNextDay()" ${s.done?"disabled":""}>${s.done?"Simulation complete":"Next trading day"}</button><button type="button" class="pg2-reset" onclick="resetPlaygroundGame()">Start over</button></div><p class="pg2-disclaimer">Fictional companies and virtual money. Prices in this game do not reflect real markets.</p>`;
  playgroundMessage(s.done?`Simulation complete. Final portfolio: $${total}. ${risk} risk mix.`:"Buy or sell shares, then answer a question to advance the day.");
}

/* Two decision challenges in each of five professions. */
function careerState(){return PLAYGROUND_STATE.career??={id:null,step:0,score:0,answered:false,feedback:""};}
function chooseCareer(id){if(!CAREER_PATHS.some(path=>path.id===id))return;PLAYGROUND_STATE.career={id,step:0,score:0,answered:false,feedback:""};renderCareer();}
function answerCareer(index){const s=careerState(),path=CAREER_PATHS.find(item=>item.id===s.id);if(!path||s.answered)return;const challenge=path.challenges[s.step];s.answered=true;if(index===challenge.answer)s.score++;s.feedback=`${index===challenge.answer?"Good decision. ":"Consider another approach. "}${challenge.explain}`;renderCareer();}
function nextCareerChallenge(){const s=careerState();s.step++;s.answered=false;s.feedback="";renderCareer();}
function renderCareer(){
  const host=$pg("pg2Interactive"),s=careerState();if(!host)return;
  const path=CAREER_PATHS.find(item=>item.id===s.id);
  if(!path){host.innerHTML=`<div class="pg2-career-intro"><h3>Choose a career to explore</h3><p>Each role has two realistic decisions. Think through the evidence, then see why an answer works.</p></div><div class="pg2-career-grid">${CAREER_PATHS.map(item=>`<button type="button" onclick="chooseCareer('${item.id}')"><span>${item.icon}</span><strong>${item.name}</strong><small>${item.description}</small></button>`).join("")}</div>`;playgroundMessage("Pick a career to begin.");return;}
  if(s.step>=path.challenges.length){host.innerHTML=`<div class="pg2-career-complete"><span>${path.icon}</span><h3>${path.name} quest complete</h3><p>You made ${s.score} strong decision${s.score===1?"":"s"} out of ${path.challenges.length}.</p><button type="button" class="pg2-primary-action" onclick="PLAYGROUND_STATE.career=null;renderCareer()">Explore another career</button></div>`;playgroundMessage("Quest complete. Try another occupation.");return;}
  const question=path.challenges[s.step];
  host.innerHTML=`<div class="pg2-career-challenge"><div class="pg2-career-step"><span>${path.icon} ${path.name}</span><b>Decision ${s.step+1} of ${path.challenges.length}</b></div><h3>${pgSafe(question.prompt)}</h3><div class="pg2-career-choices">${question.choices.map((choice,index)=>`<button type="button" onclick="answerCareer(${index})" ${s.answered?"disabled":""}>${pgSafe(choice)}</button>`).join("")}</div>${s.answered?`<p class="pg2-career-feedback" role="status">${pgSafe(s.feedback)}</p><button type="button" class="pg2-primary-action" onclick="nextCareerChallenge()">${s.step===path.challenges.length-1?"See results":"Next decision"}</button>`:""}<button type="button" class="pg2-reset" onclick="PLAYGROUND_STATE.career=null;renderCareer()">Choose another career</button></div>`;
  playgroundMessage(`Think like a ${path.name.toLowerCase()}: choose the best next step.`);
}

window.addEventListener("keydown",event=>{
  if($pg("playground")?.classList.contains("d-none")||event.target.closest("input,textarea,select,button"))return;
  const mode=PLAYGROUND_STATE.mode;
  if(mode==="escape"){
    const moves={ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0],ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1]};
    if(moves[event.key]){event.preventDefault();escapeMove(...moves[event.key]);}
  }else if(mode==="parkour"&&(event.key===" "||event.key==="Enter")){event.preventDefault();parkourJump();}
});
