/* ===========================
   Toy Playground
=========================== */
var PLAYGROUND_MODES = [
  { id:"math", name:"Math Quest", category:"learn", tip:"Solve five quick math puzzles." },
  { id:"words", name:"Word Wizard", category:"learn", tip:"Build reading and vocabulary skills." },
  { id:"science", name:"Science Explorer", category:"learn", tip:"Explore everyday science facts." },
  { id:"toybox", name:"Toy Box", tip:"Click a toy to place it. Drag toys around the stage." },
  { id:"flyer", name:"Sky Flyer", tip:"Jump through eight gates without crashing." },
  { id:"runner", name:"Lane Dash", tip:"Dodge blocks and collect eight stars." },
  { id:"brick", name:"Brick Bounce", tip:"Move the paddle to clear every brick." },
  { id:"pop", name:"Star Pop", tip:"Pop twenty moving stars before time runs out." },
  { id:"memory", name:"Toy Match", tip:"Flip cards and find every toy pair." },
  { id:"maze", name:"Maze Quest", tip:"Find eight gems, then reach the exit." },
  { id:"catch", name:"Toy Catch", tip:"Catch twelve toys before missing five." }
];

var PG = {
  mode:"toybox",
  running:false,
  last:0,
  raf:0,
  state:{},
  keys:{},
  images:{},
  level:0,
  started:false
};

var PLAYGROUND_QUESTIONS = {
  words:[
    {q:"Which word rhymes with cat?",choices:["hat","sun","dog"],answer:0,why:"Cat and hat end with the same sound."},
    {q:"Which word means the opposite of hot?",choices:["warm","cold","bright"],answer:1,why:"Cold is the opposite of hot."},
    {q:"Which word is a noun?",choices:["jump","happy","garden"],answer:2,why:"A garden is a place, so it is a noun."},
    {q:"Choose the correct sentence.",choices:["She run fast.","She runs fast.","She running fast."],answer:1,why:"She runs fast uses the correct verb form."},
    {q:"What does enormous mean?",choices:["very large","very quiet","very old"],answer:0,why:"Enormous means very large."},
    {q:"Which word has a long A sound?",choices:["cake","cat","cap"],answer:0,why:"The a in cake says its name."},
    {q:"Which word completes: The birds ___ flying.",choices:["is","are","am"],answer:1,why:"Birds is plural, so use are."}
  ],
  wordsBuilder:[
    {q:"Which word is a synonym for brave?",choices:["courageous","careless","quiet"],answer:0,why:"Courageous means brave."},
    {q:"Choose the sentence with correct punctuation.",choices:["Where is my book?","Where is my book.","Where is my book!"],answer:0,why:"A direct question ends with a question mark."},
    {q:"Which word is an adjective?",choices:["quickly","colorful","swim"],answer:1,why:"Colorful describes a person, place, or thing."},
    {q:"What does predict mean?",choices:["to guess what may happen","to repeat exactly","to explain the past"],answer:0,why:"To predict is to say what you think may happen next."},
    {q:"Which sentence uses their correctly?",choices:["Their dog is friendly.","Their going home.","Put it over their."],answer:0,why:"Their shows that the dog belongs to them."}
  ],
  wordsChallenge:[
    {q:"Which phrase is a metaphor?",choices:["The classroom was a zoo.","The room was loud.","The room sounded like a zoo."],answer:0,why:"A metaphor compares two things without using like or as."},
    {q:"Which word best replaces ambiguous?",choices:["unclear","obvious","careful"],answer:0,why:"Ambiguous means open to more than one meaning."},
    {q:"Which sentence uses a semicolon correctly?",choices:["I studied; I felt ready.","I; studied hard.","I studied; and."],answer:0,why:"A semicolon can join two closely related complete sentences."},
    {q:"What is the main purpose of a counterclaim?",choices:["To present an opposing view","To repeat the title","To list sources"],answer:0,why:"A counterclaim presents a viewpoint that differs from the claim."},
    {q:"Which sentence uses parallel structure?",choices:["She likes reading, drawing, and singing.","She likes reading, to draw, and songs.","She likes read, drawing, and to sing."],answer:0,why:"The three activities use the same verb form."}
  ],
  science:[
    {q:"What do plants need to make food?",choices:["sunlight","plastic","sand only"],answer:0,why:"Plants use sunlight to make food."},
    {q:"Which state of water is ice?",choices:["gas","liquid","solid"],answer:2,why:"Ice is solid water."},
    {q:"Which body part pumps blood?",choices:["heart","lungs","stomach"],answer:0,why:"The heart pumps blood through the body."},
    {q:"What force pulls objects toward Earth?",choices:["sound","gravity","light"],answer:1,why:"Gravity pulls objects toward Earth."},
    {q:"Which animal is a mammal?",choices:["frog","dolphin","butterfly"],answer:1,why:"A dolphin is a mammal that breathes air."},
    {q:"What happens when water gets very warm?",choices:["It evaporates.","It becomes rock.","It disappears forever."],answer:0,why:"Warm water can evaporate into water vapor."},
    {q:"Which part of a plant takes in water?",choices:["flower","roots","leaves"],answer:1,why:"Roots absorb water from the soil."}
  ],
  scienceBuilder:[
    {q:"What do we call an animal that eats plants and animals?",choices:["omnivore","herbivore","producer"],answer:0,why:"An omnivore eats both plants and animals."},
    {q:"Which material is a good conductor of electricity?",choices:["copper","rubber","dry wood"],answer:0,why:"Copper lets electric current flow easily."},
    {q:"What is the first step of the water cycle when liquid water becomes vapor?",choices:["evaporation","condensation","precipitation"],answer:0,why:"Evaporation changes liquid water into vapor."},
    {q:"Which organ helps exchange oxygen and carbon dioxide?",choices:["lungs","kidneys","stomach"],answer:0,why:"The lungs move oxygen into blood and carbon dioxide out."},
    {q:"What happens to a shadow when a light moves closer to an object?",choices:["It usually grows larger.","It disappears.","It always turns blue."],answer:0,why:"A closer light usually makes the object's shadow larger."}
  ],
  scienceChallenge:[
    {q:"What is the role of a decomposer in an ecosystem?",choices:["Break down dead matter","Make sunlight","Stop all food chains"],answer:0,why:"Decomposers return nutrients from dead matter to the environment."},
    {q:"Which statement follows Newton's third law?",choices:["For every action there is an equal and opposite reaction.","Mass disappears in motion.","Energy is never transferred."],answer:0,why:"Forces between two interacting objects act in opposite directions."},
    {q:"What does pH below 7 indicate?",choices:["An acid","A neutral substance","A base"],answer:0,why:"On the pH scale, a value below 7 is acidic."},
    {q:"Which process uses DNA to make an RNA copy?",choices:["transcription","translation","diffusion"],answer:0,why:"Transcription copies information from DNA into RNA."},
    {q:"What does a control group help scientists do?",choices:["Compare results","Change every variable","Prove every prediction"],answer:0,why:"A control group gives a comparison for the tested variable."}
  ]
};

function playgroundIsLearningMode(mode=PG.mode){ return ["math","words","science"].includes(mode); }

function playgroundShuffle(items){
  const result=[...items];
  for(let i=result.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [result[i],result[j]]=[result[j],result[i]];
  }
  return result;
}

function playgroundShuffleAnswers(question){
  const choices=playgroundShuffle(question.choices.map((label,index)=>({label,correct:index===question.answer})));
  return {...question,choices:choices.map(choice=>choice.label),answer:choices.findIndex(choice=>choice.correct)};
}

function playgroundMathQuestions(){
  const questions=[];
  for(let i=0;i<5;i++){
    let a,b,answer,question;
    if(PG.level===2){
      a=2+Math.floor(Math.random()*11); b=2+Math.floor(Math.random()*10);
      if(i%2){answer=a*a-b;question=`What is ${a}² − ${b}?`;}
      else{answer=a*b;question=`What is ${a} × ${b}?`;}
    }else if(PG.level===1){
      a=3+Math.floor(Math.random()*10);b=2+Math.floor(Math.random()*9);
      if(i%2){answer=a;question=`What is ${a*b} ÷ ${b}?`;}
      else{answer=a*b;question=`What is ${a} × ${b}?`;}
    }else{
      a=3+Math.floor(Math.random()*18);b=2+Math.floor(Math.random()*12);
      const subtract=i%2===1;
      const x=subtract?a+b:a;
      answer=subtract?a:a+b;
      question=`What is ${x} ${subtract?"−":"+"} ${b}?`;
    }
    const options=playgroundShuffle([answer,answer+2,answer-2]);
    questions.push({q:question,choices:options.map(String),answer:options.indexOf(answer),why:`${question.slice(8,-1)} = ${answer}.`});
  }
  return questions;
}

function setPlaygroundLevel(level){
  if(!Number.isInteger(level) || level<0 || level>2 || !playgroundIsLearningMode()) return;
  PG.level=level;
  resetPlaygroundGame();
}

function renderPlaygroundQuestion(){
  const host=$("playgroundLearning");
  if(!host || !playgroundIsLearningMode()) return;
  const s=PG.state;
  const levels=`<div class="playground-levels" role="group" aria-label="Game difficulty">${["Beginner","Builder","Challenge"].map((label,i)=>`<button type="button" class="${PG.level===i?"active":""}" aria-pressed="${PG.level===i}" onclick="setPlaygroundLevel(${i})">${label}</button>`).join("")}</div>`;
  if(s.done){
    host.innerHTML=`<div class="playground-quiz-wrap">${levels}<div class="playground-quiz-card"><span class="playground-quiz-kicker">ROUND COMPLETE</span><h2>Great work!</h2><p>You answered ${s.score} of ${s.questions.length} correctly.</p><button type="button" class="btn btn-main" onclick="resetPlaygroundGame()">Play again</button></div></div>`;
    return;
  }
  const item=s.questions[s.index];
  host.innerHTML=`<div class="playground-quiz-wrap">${levels}<div class="playground-quiz-card"><span class="playground-quiz-kicker">QUESTION ${s.index+1} OF ${s.questions.length} · SCORE ${s.score}</span><h2>${playgroundSafe(item.q)}</h2><div class="playground-quiz-choices">${item.choices.map((choice,i)=>`<button type="button" class="playground-quiz-choice ${s.selected!==null?(i===item.answer?"correct":s.selected===i?"incorrect":""):""}" onclick="answerPlaygroundQuestion(${i})" ${s.selected!==null?"disabled":""}>${playgroundSafe(choice)}</button>`).join("")}</div><div class="playground-quiz-feedback" role="status" aria-live="polite">${s.selected===null?"Choose an answer to see why.":`${s.selected===item.answer?"Correct!":"Good try!"} ${playgroundSafe(item.why)}`}</div>${s.selected!==null?`<button type="button" class="btn btn-main" onclick="nextPlaygroundQuestion()">${s.index===s.questions.length-1?"See score":"Next question"}</button>`:""}</div></div>`;
}

function answerPlaygroundQuestion(index){
  if(!playgroundIsLearningMode() || PG.state.selected!==null || PG.state.done) return;
  const s=PG.state;
  if(index<0 || index>=s.questions[s.index].choices.length) return;
  s.selected=index;
  if(index===s.questions[s.index].answer) s.score++;
  renderPlaygroundQuestion();
}

function nextPlaygroundQuestion(){
  if(!playgroundIsLearningMode() || PG.state.selected===null || PG.state.done) return;
  PG.state.index++;
  PG.state.selected=null;
  PG.state.done=PG.state.index>=PG.state.questions.length;
  renderPlaygroundQuestion();
}

function playgroundSafe(value){
  if(typeof htmlSafe === "function") return htmlSafe(value);
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function playgroundAllToys(){
  return typeof TOYS !== "undefined" && Array.isArray(TOYS) ? TOYS : [];
}

function playgroundOwnedIds(){
  return typeof state !== "undefined" && Array.isArray(state.owned) ? state.owned : [];
}

function playgroundPlayableToys(){
  const toys = playgroundAllToys();
  const owned = new Set(playgroundOwnedIds());
  const ownedToys = toys.filter(toy=>owned.has(toy.id));
  if(ownedToys.length) return ownedToys.map(toy=>({...toy, demo:false}));
  return toys.slice(0, 8).map(toy=>({...toy, demo:true}));
}

function playgroundAvatarToy(){
  return playgroundPlayableToys()[0] || playgroundAllToys()[0] || null;
}

function preloadPlaygroundToys(){
  playgroundAllToys().forEach(toy=>{
    if(!toy.img || PG.images[toy.id]) return;
    const img = new Image();
    img.src = toy.img;
    PG.images[toy.id] = img;
  });
}

function renderPlaygroundLock(panel){
  cancelPlaygroundLoop();
  const learners = typeof state !== "undefined" ? Number(state.learners) || 0 : 0;
  const cost = typeof PLAYGROUND_UNLOCK_COST === "number" ? PLAYGROUND_UNLOCK_COST : 5;
  const remaining = Math.max(0, cost - learners);
  panel.innerHTML = `
    <div class="playground-lock">
      <div>
        <p class="lock-kicker">Playground access</p>
        <h1>Unlock Playground</h1>
        <p class="small-note">Spend ${cost} Learners once for this learner to open educational games, arcade games, and the toy stage.</p>
      </div>
      <div class="playground-lock-meter">
        <strong>${learners} / ${cost}</strong>
        <span>Learners ready</span>
      </div>
      <div class="playground-lock-actions">
        <button type="button" class="btn btn-main" onclick="unlockPlayground()" ${learners >= cost ? "" : "disabled"}>
          ${learners >= cost ? `Unlock for ${cost} Learners` : `Need ${remaining} more Learner${remaining === 1 ? "" : "s"}`}
        </button>
        <button type="button" class="btn btn-main" onclick="show('shop')">Earn and shop</button>
        <button type="button" class="btn btn-main" onclick="show('grades')">Back to grades</button>
      </div>
    </div>
  `;
}

function renderPlayground(){
  const panel = $("playgroundPanel");
  if(!panel) return;
  cancelPlaygroundLoop();
  PG.keys={};
  if(typeof playgroundUnlocked === "function" && !playgroundUnlocked()){
    renderPlaygroundLock(panel);
    return;
  }
  preloadPlaygroundToys();
  panel.innerHTML = `
    <div class="playground-head">
      <div>
        <h1>Playground</h1>
        <p class="small-note">Practice a skill or pick a game just for fun.</p>
      </div>
      <div class="scorebar">
        <button type="button" class="btn btn-main" onclick="show('shop')">Shop</button>
        <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
      </div>
    </div>

    <div id="playgroundGameButtons"></div>
    <div id="playgroundLearning" class="playground-learning" hidden></div>

    <div class="playground-stage" id="playgroundStage">
      <canvas id="playgroundCanvas" width="960" height="540" aria-label="Interactive playground game canvas"></canvas>
      <div class="toy-play-layer" id="toyPlayLayer"></div>
    </div>

    <div class="playground-toolbar" id="playgroundToolbar">
      <button type="button" class="btn btn-main" id="playgroundStartBtn" onclick="startPlaygroundGame()">Start</button>
      <button type="button" class="btn btn-main" id="playgroundPauseBtn" onclick="pausePlaygroundGame()">Pause</button>
      <button type="button" class="btn btn-main" onclick="resetPlaygroundGame()">Reset</button>
      <button type="button" class="btn btn-main" data-toy-control onclick="addRandomPlaygroundToy()">Add Toy</button>
      <button type="button" class="btn btn-main" data-toy-control onclick="shufflePlaygroundToys()">Shuffle Toys</button>
      <button type="button" class="btn btn-main" data-toy-control onclick="clearPlaygroundToys()">Clear Toys</button>
    </div>

    <div class="playground-touch-controls" id="playgroundTouchControls">
      <button type="button" data-playground-action="left" onclick="playgroundAction('left')">Left</button>
      <button type="button" data-playground-action="up" onclick="playgroundAction('up')">Up / Jump</button>
      <button type="button" data-playground-action="right" onclick="playgroundAction('right')">Right</button>
      <button type="button" data-playground-action="down" onclick="playgroundAction('down')">Down</button>
    </div>

    <div class="playground-status" id="playgroundStatus"></div>
    <div class="toy-shelf" id="playgroundToyShelf"></div>
  `;

  renderPlaygroundModeButtons();
  renderPlaygroundToyShelf();
  bindPlaygroundCanvas();
  switchPlaygroundGame(PG.mode || "toybox", true);
}

function renderPlaygroundModeButtons(){
  const row = $("playgroundGameButtons");
  if(!row) return;
  row.innerHTML = `<section class="playground-mode-group"><h2>Educational games</h2><div class="playground-game-row">${PLAYGROUND_MODES.filter(mode=>mode.category==="learn").map(playgroundModeButton).join("")}</div></section><section class="playground-mode-group"><h2>Just for fun</h2><div class="playground-game-row">${PLAYGROUND_MODES.filter(mode=>mode.category!=="learn").map(playgroundModeButton).join("")}</div></section>`;
}

function playgroundModeButton(mode){
  return `<button type="button" class="playground-game-btn" data-playground-mode="${mode.id}" aria-pressed="false" onclick="switchPlaygroundGame('${mode.id}')"><strong>${playgroundSafe(mode.name)}</strong><small>${playgroundSafe(mode.tip)}</small></button>`;
}

function renderPlaygroundToyShelf(){
  const shelf = $("playgroundToyShelf");
  if(!shelf) return;
  const toys = playgroundPlayableToys();
  const ownedCount = playgroundAllToys().filter(toy=>playgroundOwnedIds().includes(toy.id)).length;
  const note = ownedCount
    ? "Your owned toys"
    : "Demo toys shown until you buy toys in the shop";
  shelf.innerHTML = `
    <div class="toy-shelf-head">
      <strong>${playgroundSafe(note)}</strong>
      <span>${toys.length} available here</span>
    </div>
    <div class="toy-token-grid">
      ${toys.map(toy=>`
        <button type="button" class="toy-token" onclick="addPlaygroundToy('${toy.id}')">
          <img src="${toy.img}" alt="${playgroundSafe(toy.name)}">
          <span>${playgroundSafe(toy.name)}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function setPlaygroundStatus(text){
  const status = $("playgroundStatus");
  if(status) status.textContent = text || "";
}

function setPlaygroundActiveButton(){
  document.querySelectorAll("[data-playground-mode]").forEach(btn=>{
    const active=btn.dataset.playgroundMode === PG.mode;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed",String(active));
  });
  const mode = PLAYGROUND_MODES.find(item=>item.id === PG.mode);
  setPlaygroundStatus(mode ? mode.tip : "");
  const learning=playgroundIsLearningMode();
  const quiz=$("playgroundLearning");
  if(quiz) quiz.hidden=!learning;
  ["playgroundStage","playgroundToolbar","playgroundTouchControls","playgroundToyShelf"].forEach(id=>{
    const el=$(id);
    if(el) el.hidden=learning;
  });
  const layer = $("toyPlayLayer");
  if(layer) layer.classList.toggle("is-hidden", PG.mode !== "toybox");
  const startBtn = $("playgroundStartBtn");
  if(startBtn){
    startBtn.hidden=["toybox","memory","maze"].includes(PG.mode);
    startBtn.textContent="Start";
    startBtn.disabled=false;
  }
  const pauseBtn=$("playgroundPauseBtn");
  if(pauseBtn) pauseBtn.hidden=PG.mode==="toybox" || PG.mode==="memory" || PG.mode==="maze";
  document.querySelectorAll("[data-toy-control]").forEach(btn=>btn.hidden=PG.mode!=="toybox");
  const actions={toybox:[],flyer:["up"],runner:["left","right"],brick:["left","right"],pop:[],memory:[],maze:["left","up","right","down"],catch:["left","right"]};
  document.querySelectorAll("[data-playground-action]").forEach(btn=>{
    btn.hidden=!(actions[PG.mode]||[]).includes(btn.dataset.playgroundAction);
    if(btn.dataset.playgroundAction==="up") btn.textContent=PG.mode==="flyer"?"Jump":"Up";
  });
  const controls=$("playgroundTouchControls");
  if(controls) controls.hidden=learning || !(actions[PG.mode]||[]).length;
}

function playgroundCtx(){
  const canvas = $("playgroundCanvas");
  return canvas ? canvas.getContext("2d") : null;
}

function bindPlaygroundCanvas(){
  const canvas = $("playgroundCanvas");
  if(!canvas) return;
  canvas.onpointerdown = event=>playgroundPointer("down", event);
  canvas.onpointermove = event=>playgroundPointer("move", event);
  canvas.onpointerup = event=>playgroundPointer("up", event);
}

function playgroundPoint(event){
  const canvas = $("playgroundCanvas");
  const rect = canvas.getBoundingClientRect();
  return {
    x:(event.clientX - rect.left) * canvas.width / rect.width,
    y:(event.clientY - rect.top) * canvas.height / rect.height
  };
}

function cancelPlaygroundLoop(){
  if(PG.raf) cancelAnimationFrame(PG.raf);
  PG.raf = 0;
  PG.running = false;
}

function switchPlaygroundGame(modeId, keepToys){
  if(!PLAYGROUND_MODES.some(mode=>mode.id === modeId)) modeId = "toybox";
  cancelPlaygroundLoop();
  PG.mode = modeId;
  PG.started = false;
  resetPlaygroundGame(keepToys);
}

function resetPlaygroundGame(keepToys){
  cancelPlaygroundLoop();
  PG.started=false;
  PG.state = {};
  if(playgroundIsLearningMode()){
    const key=PG.mode+(PG.level===1?"Builder":PG.level===2?"Challenge":"");
    const bank=PG.mode==="math"?playgroundMathQuestions():playgroundShuffle(PLAYGROUND_QUESTIONS[key]).map(playgroundShuffleAnswers);
    PG.state={questions:bank.slice(0,5),index:0,score:0,selected:null,done:false};
    setPlaygroundActiveButton();
    renderPlaygroundQuestion();
    return;
  }
  if(PG.mode === "flyer") initFlyerGame();
  if(PG.mode === "runner") initRunnerGame();
  if(PG.mode === "brick") initBrickGame();
  if(PG.mode === "pop") initPopGame();
  if(PG.mode === "memory") initMemoryGame();
  if(PG.mode === "maze") initMazeGame();
  if(PG.mode === "catch") initCatchGame();
  if(PG.mode === "toybox" && !keepToys && !$("toyPlayLayer")?.children.length) addRandomPlaygroundToy();
  setPlaygroundActiveButton();
  drawPlayground();
}

function startPlaygroundGame(){
  if(playgroundIsLearningMode()) return;
  if(PG.mode === "toybox"){
    addRandomPlaygroundToy();
    return;
  }
  if(PG.state.over || PG.state.win) resetPlaygroundGame(true);
  PG.running = true;
  PG.started = true;
  PG.last = performance.now();
  const startBtn=$("playgroundStartBtn");
  if(startBtn){ startBtn.textContent="Playing"; startBtn.disabled=true; }
  if(!PG.raf) PG.raf = requestAnimationFrame(playgroundTick);
}

function pausePlaygroundGame(){
  cancelPlaygroundLoop();
  const startBtn=$("playgroundStartBtn");
  if(startBtn){ startBtn.textContent="Resume"; startBtn.disabled=false; }
  drawPlayground();
}

function playgroundTick(now){
  const dt = Math.min(0.04, (now - PG.last) / 1000 || 0.016);
  PG.last = now;
  updatePlayground(dt);
  drawPlayground();
  if(PG.running && !PG.state.over && !PG.state.win){
    PG.raf = requestAnimationFrame(playgroundTick);
  }else{
    PG.running = false;
    PG.raf = 0;
    const startBtn=$("playgroundStartBtn");
    if(startBtn && (PG.state.over || PG.state.win)){
      startBtn.textContent="Play Again";
      startBtn.disabled=false;
    }
    if(PG.state.over || PG.state.win){
      const mode=PLAYGROUND_MODES.find(item=>item.id===PG.mode);
      const replay=PG.mode==="memory"?"Press Reset to play again.":"Press Play Again or Reset for another round.";
      setPlaygroundStatus(`${mode?.name || "Game"}: ${PG.state.win?"You win!":"Round over."} ${replay}`);
    }
  }
}

function playgroundAction(action){
  if(PG.mode === "toybox"){
    if(action === "up") addRandomPlaygroundToy();
    if(action === "down") shufflePlaygroundToys();
    return;
  }
  if((PG.state.over || PG.state.win) && !["memory","maze"].includes(PG.mode)) resetPlaygroundGame(true);
  if(PG.mode === "flyer" && action === "up") PG.state.bird.vy = -430;
  if(PG.mode === "runner"){
    if(action === "left") PG.state.lane = Math.max(0, PG.state.lane - 1);
    if(action === "right") PG.state.lane = Math.min(2, PG.state.lane + 1);
  }
  if(PG.mode === "brick"){
    if(action === "left") PG.state.paddleX -= 70;
    if(action === "right") PG.state.paddleX += 70;
    PG.state.paddleX = Math.max(80, Math.min(880, PG.state.paddleX));
  }
  if(PG.mode === "maze"){
    moveMaze(action);
  }
  if(PG.mode === "catch"){
    if(action === "left") PG.state.basketX -= 80;
    if(action === "right") PG.state.basketX += 80;
    PG.state.basketX = Math.max(70, Math.min(890, PG.state.basketX));
  }
  if(!PG.running && PG.mode !== "memory" && PG.mode !== "maze") startPlaygroundGame();
  drawPlayground();
}

function playgroundPointer(type, event){
  const p = playgroundPoint(event);
  if(PG.mode === "flyer" && type === "down"){
    playgroundAction("up");
    startPlaygroundGame();
  }
  if(PG.mode === "brick" && (type === "move" || type === "down")){
    if(type === "down" && !PG.running) startPlaygroundGame();
    PG.state.paddleX = Math.max(80, Math.min(880, p.x));
  }
  if(PG.mode === "pop" && type === "down") popStarAt(p.x, p.y);
  if(PG.mode === "memory" && type === "down") flipMemoryAt(p.x, p.y);
  if(PG.mode === "catch" && (type === "move" || type === "down")){
    if(type === "down" && !PG.running) startPlaygroundGame();
    PG.state.basketX = Math.max(70, Math.min(890, p.x));
  }
  drawPlayground();
}

function updatePlayground(dt){
  if(PG.mode === "flyer") updateFlyerGame(dt);
  if(PG.mode === "runner") updateRunnerGame(dt);
  if(PG.mode === "brick") updateBrickGame(dt);
  if(PG.mode === "pop") updatePopGame(dt);
  if(PG.mode === "memory") updateMemoryGame(dt);
  if(PG.mode === "catch") updateCatchGame(dt);
}

function drawPlayground(){
  const ctx = playgroundCtx();
  if(!ctx) return;
  drawPlaygroundBack(ctx);
  if(PG.mode === "toybox") drawToybox(ctx);
  if(PG.mode === "flyer") drawFlyerGame(ctx);
  if(PG.mode === "runner") drawRunnerGame(ctx);
  if(PG.mode === "brick") drawBrickGame(ctx);
  if(PG.mode === "pop") drawPopGame(ctx);
  if(PG.mode === "memory") drawMemoryGame(ctx);
  if(PG.mode === "maze") drawMazeGame(ctx);
  if(PG.mode === "catch") drawCatchGame(ctx);
}

function drawPlaygroundBack(ctx){
  ctx.clearRect(0,0,960,540);
  const sky = ctx.createLinearGradient(0,0,0,540);
  sky.addColorStop(0,"#fff8ea");
  sky.addColorStop(1,"#fef1d4");
  ctx.fillStyle = sky;
  ctx.fillRect(0,0,960,540);
  ctx.fillStyle = "#ffe2b6";
  ctx.fillRect(0,438,960,102);
  ctx.fillStyle = "#f6a15d";
  ctx.globalAlpha = 0.16;
  for(let x=0; x<960; x+=80) ctx.fillRect(x,455,42,10);
  ctx.globalAlpha = 1;
}

function drawLabel(ctx, text, x, y, size){
  ctx.fillStyle = "#71422d";
  ctx.font = `900 ${size || 24}px Fredoka, system-ui, sans-serif`;
  ctx.fillText(text, x, y);
}

function drawCenterNotice(ctx, title, body){
  ctx.fillStyle = "rgba(255,255,255,.86)";
  roundRect(ctx, 230, 160, 500, 170, 18, true);
  ctx.strokeStyle = "rgba(246,161,93,.35)";
  ctx.lineWidth = 3;
  roundRect(ctx, 230, 160, 500, 170, 18, false);
  ctx.textAlign = "center";
  drawLabel(ctx, title, 480, 220, 30);
  ctx.font = "800 20px Fredoka, system-ui, sans-serif";
  ctx.fillStyle = "#71422d";
  ctx.fillText(body, 480, 266);
  ctx.textAlign = "left";
}

function roundRect(ctx, x, y, w, h, r, fill){
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  if(fill) ctx.fill();
  else ctx.stroke();
}

function drawToy(ctx, toy, x, y, w, h){
  const img = toy && PG.images[toy.id];
  if(img && img.complete){
    ctx.drawImage(img, x, y, w, h);
    return;
  }
  ctx.fillStyle = "#f6a15d";
  roundRect(ctx, x, y, w, h, 14, true);
}

function initFlyerGame(){
  PG.state = { bird:{x:160,y:250,vy:0}, gates:[], spawn:0, score:0, target:8, over:false, win:false };
}

function updateFlyerGame(dt){
  const s = PG.state;
  s.spawn -= dt;
  if(s.spawn <= 0){
    s.gates.push({x:980, gap:120 + Math.random()*250, passed:false});
    s.spawn = 1.35;
  }
  s.bird.vy += 980 * dt;
  s.bird.y += s.bird.vy * dt;
  s.gates.forEach(g=>{
    g.x -= 230 * dt;
    if(!g.passed && g.x + 76 < s.bird.x){
      g.passed = true;
      s.score++;
      if(s.score>=s.target) s.win=true;
    }
  });
  s.gates = s.gates.filter(g=>g.x > -110);
  s.gates.forEach(g=>{
    const hitX = s.bird.x + 46 > g.x && s.bird.x < g.x + 76;
    const safeY = s.bird.y > g.gap && s.bird.y + 46 < g.gap + 150;
    if(hitX && !safeY) s.over = true;
  });
  if(s.bird.y < 0 || s.bird.y > 492) s.over = true;
}

function drawFlyerGame(ctx){
  const s = PG.state;
  s.gates.forEach(g=>{
    ctx.fillStyle = "#58b67a";
    roundRect(ctx, g.x, 0, 76, g.gap, 14, true);
    roundRect(ctx, g.x, g.gap + 150, 76, 540 - g.gap - 150, 14, true);
  });
  drawToy(ctx, playgroundAvatarToy(), s.bird.x - 6, s.bird.y - 6, 64, 64);
  drawLabel(ctx, `Gates ${s.score}/${s.target}`, 24, 38, 24);
  if(!PG.started) drawCenterNotice(ctx, "Sky Flyer", "Tap Jump to start flying");
  if(s.over) drawCenterNotice(ctx, "Game Over", `Final score: ${s.score}`);
  if(s.win) drawCenterNotice(ctx, "You Win!", "Eight gates cleared");
}

function initRunnerGame(){
  PG.state = { lane:1, items:[], spawn:0, score:0, target:8, speed:260, over:false, win:false };
}

function updateRunnerGame(dt){
  const s = PG.state;
  s.spawn -= dt;
  s.speed += dt * 8;
  if(s.spawn <= 0){
    s.items.push({
      lane:Math.floor(Math.random()*3),
      y:-40,
      kind:Math.random() < .35 ? "star" : "block"
    });
    s.spawn = Math.max(.42, .9 - s.score * .01);
  }
  s.items.forEach(item=>item.y += s.speed * dt);
  s.items.forEach(item=>{
    if(item.hit) return;
    if(item.lane === s.lane && item.y > 360 && item.y < 460){
      item.hit = true;
      if(item.kind === "star"){
        s.score++;
        if(s.score>=s.target) s.win=true;
      }
      else s.over = true;
    }
  });
  s.items = s.items.filter(item=>item.y < 600 && !item.hit);
}

function drawRunnerGame(ctx){
  const s = PG.state;
  const lanes = [270,480,690];
  ctx.fillStyle = "#6b4a3a";
  roundRect(ctx, 190, 40, 580, 470, 26, true);
  ctx.strokeStyle = "rgba(255,255,255,.45)";
  ctx.lineWidth = 4;
  [375,585].forEach(x=>{
    ctx.setLineDash([18,20]);
    ctx.beginPath();
    ctx.moveTo(x,52);
    ctx.lineTo(x,500);
    ctx.stroke();
  });
  ctx.setLineDash([]);
  s.items.forEach(item=>{
    const x = lanes[item.lane];
    if(item.kind === "star"){
      ctx.fillStyle = "#ffd34d";
      drawStar(ctx, x, item.y, 24);
    }else{
      ctx.fillStyle = "#ef6b4a";
      roundRect(ctx, x - 32, item.y - 32, 64, 64, 12, true);
    }
  });
  drawToy(ctx, playgroundAvatarToy(), lanes[s.lane] - 42, 402, 84, 84);
  drawLabel(ctx, `Stars ${s.score}/${s.target}`, 24, 38, 24);
  if(!PG.started) drawCenterNotice(ctx, "Lane Dash", "Use Left and Right to start");
  if(s.over) drawCenterNotice(ctx, "Crash", `Stars collected: ${s.score}`);
  if(s.win) drawCenterNotice(ctx, "You Win!", "Eight stars collected");
}

function drawStar(ctx, x, y, r){
  ctx.beginPath();
  for(let i=0;i<10;i++){
    const a = -Math.PI/2 + i * Math.PI / 5;
    const rr = i % 2 ? r * .45 : r;
    ctx.lineTo(x + Math.cos(a)*rr, y + Math.sin(a)*rr);
  }
  ctx.closePath();
  ctx.fill();
}

function initBrickGame(){
  const bricks = [];
  for(let r=0; r<4; r++){
    for(let c=0; c<8; c++) bricks.push({x:90+c*98, y:70+r*38, w:82, h:24, live:true});
  }
  PG.state = {paddleX:480, ball:{x:480,y:360,vx:210,vy:-260}, bricks, score:0, over:false, win:false};
}

function updateBrickGame(dt){
  const s = PG.state;
  if(PG.keys.ArrowLeft) s.paddleX -= 420 * dt;
  if(PG.keys.ArrowRight) s.paddleX += 420 * dt;
  s.paddleX = Math.max(80, Math.min(880, s.paddleX));
  const b = s.ball;
  b.x += b.vx * dt;
  b.y += b.vy * dt;
  if(b.x < 18 || b.x > 942) b.vx *= -1;
  if(b.y < 18) b.vy *= -1;
  if(b.y > 520) s.over = true;
  if(b.y > 430 && b.y < 460 && Math.abs(b.x - s.paddleX) < 78){
    b.vy = -Math.abs(b.vy);
    b.vx += (b.x - s.paddleX) * 3;
  }
  s.bricks.forEach(brick=>{
    if(!brick.live) return;
    if(b.x > brick.x && b.x < brick.x + brick.w && b.y > brick.y && b.y < brick.y + brick.h){
      brick.live = false;
      b.vy *= -1;
      s.score++;
    }
  });
  s.win = s.bricks.every(brick=>!brick.live);
}

function drawBrickGame(ctx){
  const s = PG.state;
  s.bricks.forEach((brick, i)=>{
    if(!brick.live) return;
    ctx.fillStyle = ["#f6a15d","#ffd978","#ef6b4a","#58b67a"][i % 4];
    roundRect(ctx, brick.x, brick.y, brick.w, brick.h, 8, true);
  });
  ctx.fillStyle = "#71422d";
  roundRect(ctx, s.paddleX - 78, 452, 156, 18, 9, true);
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(s.ball.x, s.ball.y, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#f6a15d";
  ctx.lineWidth = 4;
  ctx.stroke();
  drawLabel(ctx, `Bricks ${s.score}/${s.bricks.length}`, 24, 38, 24);
  if(!PG.started) drawCenterNotice(ctx, "Brick Bounce", "Start, then move the paddle");
  if(s.over) drawCenterNotice(ctx, "Try Again", "The ball got away");
  if(s.win) drawCenterNotice(ctx, "You Win", "Every brick is cleared");
}

function initPopGame(){
  PG.state = {targets:[], score:0, target:20, time:30, over:false, win:false};
  for(let i=0;i<7;i++) addPopTarget();
}

function addPopTarget(){
  const r = 22 + Math.random()*16;
  PG.state.targets.push({
    x:80 + Math.random()*800,
    y:80 + Math.random()*340,
    r,
    vx:(Math.random()-.5)*130,
    vy:(Math.random()-.5)*130
  });
}

function updatePopGame(dt){
  const s = PG.state;
  s.time -= dt;
  if(s.time <= 0){ s.time = 0; s.over = true; }
  s.targets.forEach(t=>{
    t.x += t.vx * dt;
    t.y += t.vy * dt;
    if(t.x < t.r || t.x > 960 - t.r) t.vx *= -1;
    if(t.y < t.r || t.y > 438 - t.r) t.vy *= -1;
  });
}

function popStarAt(x, y){
  const s = PG.state;
  if(s.over || s.win) return;
  const hit = s.targets.findIndex(t=>Math.hypot(t.x - x, t.y - y) < t.r);
  if(hit >= 0){
    s.targets.splice(hit, 1);
    s.score++;
    if(s.score>=s.target) s.win=true;
    addPopTarget();
    if(!PG.running && !s.win) startPlaygroundGame();
  }
}

function drawPopGame(ctx){
  const s = PG.state;
  s.targets.forEach(t=>{
    ctx.fillStyle = "#ffd34d";
    drawStar(ctx, t.x, t.y, t.r);
  });
  drawLabel(ctx, `Stars ${s.score}/${s.target}`, 24, 38, 24);
  drawLabel(ctx, `Time ${Math.ceil(s.time)}`, 800, 38, 24);
  if(!PG.started) drawCenterNotice(ctx, "Star Pop", "Click a star to begin");
  if(s.over) drawCenterNotice(ctx, "Time", `You popped ${s.score} stars`);
  if(s.win) drawCenterNotice(ctx, "You Win!", "Twenty stars popped");
}

function initMemoryGame(){
  const toys = playgroundPlayableToys().slice(0, 6);
  const cards = playgroundShuffle([...toys, ...toys]
    .map((toy, index)=>({toy, key:toy.id + "-" + index, flipped:false, matched:false})));
  PG.state = {cards, total:toys.length, first:null, lock:0, score:0, win:false};
}

function updateMemoryGame(dt){
  const s = PG.state;
  if(s.lock > 0){
    s.lock -= dt;
    if(s.lock <= 0){
      s.cards.forEach(card=>{
        if(!card.matched) card.flipped = false;
      });
      s.first = null;
    }
  }
}

function memoryCardAt(x, y){
  const startX = 180, startY = 88, w = 130, h = 116, gap = 18;
  const c = Math.floor((x - startX) / (w + gap));
  const r = Math.floor((y - startY) / (h + gap));
  if(c < 0 || c > 3 || r < 0 || r > 2) return -1;
  const localX = x - startX - c * (w + gap);
  const localY = y - startY - r * (h + gap);
  if(localX < 0 || localX > w || localY < 0 || localY > h) return -1;
  const idx = r * 4 + c;
  return idx < PG.state.cards.length ? idx : -1;
}

function flipMemoryAt(x, y){
  const s = PG.state;
  if(s.lock > 0 || s.win) return;
  const idx = memoryCardAt(x, y);
  if(idx < 0) return;
  const card = s.cards[idx];
  if(card.flipped || card.matched) return;
  card.flipped = true;
  if(s.first === null){
    s.first = idx;
  }else{
    const first = s.cards[s.first];
    if(first.toy.id === card.toy.id){
      first.matched = true;
      card.matched = true;
      s.score++;
      s.first = null;
      s.win = s.cards.every(item=>item.matched);
    }else{
      s.lock = .85;
    }
  }
  PG.started = true;
  if(!PG.running && !s.win) startPlaygroundGame();
}

function drawMemoryGame(ctx){
  const s = PG.state;
  const startX = 180, startY = 88, w = 130, h = 116, gap = 18;
  s.cards.forEach((card, i)=>{
    const c = i % 4, r = Math.floor(i / 4);
    const x = startX + c * (w + gap);
    const y = startY + r * (h + gap);
    ctx.fillStyle = card.matched ? "#e6f7df" : (card.flipped ? "#ffffff" : "#f6a15d");
    roundRect(ctx, x, y, w, h, 16, true);
    if(card.flipped || card.matched){
      drawToy(ctx, card.toy, x + 20, y + 10, 90, 90);
    }else{
      ctx.fillStyle = "#fff5e7";
      drawStar(ctx, x + w/2, y + h/2, 28);
    }
  });
  drawLabel(ctx, `Matches ${s.score}/${s.total}`, 24, 38, 24);
  if(s.win) drawCenterNotice(ctx, "Matched", "All toy pairs found");
}

function initMazeGame(){
  const map = [
    "############",
    "#..#.......#",
    "#.##.###.#.#",
    "#....#...#.#",
    "####.#.###.#",
    "#......#...#",
    "#.####...#.#",
    "############"
  ];
  const open=[];
  map.forEach((row, r)=>row.split("").forEach((cell, c)=>{
    if(cell === "." && !(c===1 && r===1) && !(c===10 && r===5)) open.push(c + "," + r);
  }));
  const coins = new Set(playgroundShuffle(open).slice(0,8));
  PG.state = {map, player:{c:1,r:1}, exit:{c:10,r:5}, coins, total:coins.size, score:0, win:false};
}

function moveMaze(action){
  const s = PG.state;
  const dirs = {left:[-1,0], right:[1,0], up:[0,-1], down:[0,1]};
  const d = dirs[action];
  if(!d || s.win) return;
  const nc = s.player.c + d[0];
  const nr = s.player.r + d[1];
  if(s.map[nr]?.[nc] === "#") return;
  s.player.c = nc;
  s.player.r = nr;
  const key = nc + "," + nr;
  if(s.coins.delete(key)) s.score++;
  s.win = s.coins.size === 0 && nc===s.exit.c && nr===s.exit.r;
  PG.started = true;
  if(s.win) setPlaygroundStatus("Maze cleared! Press Reset to explore a new maze.");
}

function drawMazeGame(ctx){
  const s = PG.state;
  const cell = 48, ox = 192, oy = 76;
  s.map.forEach((row, r)=>row.split("").forEach((v, c)=>{
    ctx.fillStyle = v === "#" ? "#71422d" : (c===s.exit.c && r===s.exit.r ? "#9ae2b8" : "#fffaf2");
    ctx.fillRect(ox + c*cell, oy + r*cell, cell - 3, cell - 3);
    if(c===s.exit.c && r===s.exit.r){
      ctx.fillStyle="#175b39";
      ctx.font="800 11px Fredoka, system-ui, sans-serif";
      ctx.fillText("EXIT",ox+c*cell+7,oy+r*cell+28);
    }
    if(s.coins.has(c + "," + r)){
      ctx.fillStyle = "#ffd34d";
      ctx.beginPath();
      ctx.arc(ox + c*cell + cell/2, oy + r*cell + cell/2, 9, 0, Math.PI*2);
      ctx.fill();
    }
  }));
  drawToy(ctx, playgroundAvatarToy(), ox + s.player.c*cell + 5, oy + s.player.r*cell + 5, 38, 38);
  drawLabel(ctx, `Gems ${s.score}/${s.total}`, 24, 38, 24);
  if(!PG.started) drawCenterNotice(ctx, "Maze Quest", "Collect eight gems, then find EXIT");
  if(s.win) drawCenterNotice(ctx, "Maze Cleared", "All gems found and exit reached");
}

function initCatchGame(){
  PG.state = {basketX:480, drops:[], spawn:0, score:0, target:12, missed:0, over:false, win:false};
}

function updateCatchGame(dt){
  const s = PG.state;
  if(PG.keys.ArrowLeft) s.basketX -= 440 * dt;
  if(PG.keys.ArrowRight) s.basketX += 440 * dt;
  s.basketX = Math.max(70, Math.min(890, s.basketX));
  s.spawn -= dt;
  if(s.spawn <= 0){
    const toys = playgroundPlayableToys();
    s.drops.push({
      x:70 + Math.random()*820,
      y:-60,
      vy:130 + Math.random()*90 + s.score*3,
      toy:toys[Math.floor(Math.random()*toys.length)]
    });
    s.spawn = Math.max(.45, .95 - s.score*.015);
  }
  s.drops.forEach(drop=>drop.y += drop.vy * dt);
  s.drops.forEach(drop=>{
    if(drop.done) return;
    if(drop.y > 405 && Math.abs(drop.x - s.basketX) < 74){
      drop.done = true;
      s.score++;
      if(s.score>=s.target) s.win=true;
    }else if(drop.y > 540){
      drop.done = true;
      s.missed++;
      if(s.missed >= 5) s.over = true;
    }
  });
  s.drops = s.drops.filter(drop=>!drop.done);
}

function drawCatchGame(ctx){
  const s = PG.state;
  s.drops.forEach(drop=>drawToy(ctx, drop.toy, drop.x - 34, drop.y - 34, 68, 68));
  ctx.fillStyle = "#71422d";
  roundRect(ctx, s.basketX - 80, 438, 160, 38, 16, true);
  ctx.fillStyle = "#fff5e7";
  roundRect(ctx, s.basketX - 65, 428, 130, 24, 14, true);
  drawLabel(ctx, `Caught ${s.score}/${s.target}`, 24, 38, 24);
  drawLabel(ctx, `Missed ${s.missed}/5`, 780, 38, 24);
  if(!PG.started) drawCenterNotice(ctx, "Toy Catch", "Move the basket to begin");
  if(s.over) drawCenterNotice(ctx, "Round Over", `Toys caught: ${s.score}`);
  if(s.win) drawCenterNotice(ctx, "You Win!", "Twelve toys caught");
}

function drawToybox(ctx){
  drawLabel(ctx, "Toy Box", 34, 48, 34);
  ctx.font = "800 22px Fredoka, system-ui, sans-serif";
  ctx.fillStyle = "#71422d";
  ctx.fillText("Click toy buttons below to place them here.", 34, 88);
  ctx.fillText("Drag, stack, shuffle, and clear your playground toys.", 34, 118);
  ctx.strokeStyle = "rgba(246,161,93,.38)";
  ctx.lineWidth = 5;
  ctx.setLineDash([16, 12]);
  roundRect(ctx, 52, 150, 856, 270, 24, false);
  ctx.setLineDash([]);
}

function addPlaygroundToy(toyId){
  const toy = playgroundAllToys().find(item=>item.id === toyId);
  if(!toy) return;
  if(PG.mode !== "toybox") switchPlaygroundGame("toybox", true);
  const layer = $("toyPlayLayer");
  if(!layer) return;
  const piece = document.createElement("button");
  piece.type = "button";
  piece.className = "playground-toy";
  piece.style.left = `${70 + Math.random()*640}px`;
  piece.style.top = `${70 + Math.random()*260}px`;
  piece.style.setProperty("--angle", `${Math.round(Math.random()*18 - 9)}deg`);
  piece.innerHTML = `<img src="${toy.img}" alt="${playgroundSafe(toy.name)}"><span>${playgroundSafe(toy.name)}</span>`;
  piece.ondblclick = ()=>{
    piece.classList.remove("toy-hop");
    void piece.offsetWidth;
    piece.classList.add("toy-hop");
  };
  layer.appendChild(piece);
  makePlaygroundToyDraggable(piece);
}

function addRandomPlaygroundToy(){
  const toys = playgroundPlayableToys();
  if(!toys.length) return;
  addPlaygroundToy(toys[Math.floor(Math.random()*toys.length)].id);
}

function clearPlaygroundToys(){
  const layer = $("toyPlayLayer");
  if(layer) layer.innerHTML = "";
}

function shufflePlaygroundToys(){
  const layer = $("toyPlayLayer");
  if(!layer) return;
  [...layer.children].forEach(piece=>{
    piece.style.left = `${45 + Math.random()*700}px`;
    piece.style.top = `${60 + Math.random()*290}px`;
    piece.style.setProperty("--angle", `${Math.round(Math.random()*28 - 14)}deg`);
  });
}

function makePlaygroundToyDraggable(piece){
  let startX = 0, startY = 0, baseX = 0, baseY = 0;
  piece.onpointerdown = event=>{
    event.preventDefault();
    piece.setPointerCapture?.(event.pointerId);
    piece.classList.add("dragging");
    startX = event.clientX;
    startY = event.clientY;
    baseX = parseFloat(piece.style.left) || 0;
    baseY = parseFloat(piece.style.top) || 0;
  };
  piece.onpointermove = event=>{
    if(!piece.classList.contains("dragging")) return;
    const layer = $("toyPlayLayer");
    const maxX = Math.max(0, (layer?.clientWidth || 900) - piece.offsetWidth);
    const maxY = Math.max(0, (layer?.clientHeight || 500) - piece.offsetHeight);
    const x = Math.max(0, Math.min(maxX, baseX + event.clientX - startX));
    const y = Math.max(0, Math.min(maxY, baseY + event.clientY - startY));
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
  };
  piece.onpointerup = event=>{
    piece.releasePointerCapture?.(event.pointerId);
    piece.classList.remove("dragging");
  };
}

window.addEventListener("keydown", event=>{
  const playground = $("playground");
  if(!playground || playground.classList.contains("d-none")) return;
  PG.keys[event.key] = true;
  if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"," "].includes(event.key)) event.preventDefault();
  if(event.key === "ArrowLeft") playgroundAction("left");
  if(event.key === "ArrowRight") playgroundAction("right");
  if(event.key === "ArrowUp" || event.key === " ") playgroundAction("up");
  if(event.key === "ArrowDown") playgroundAction("down");
});

window.addEventListener("keyup", event=>{
  PG.keys[event.key] = false;
});

window.addEventListener("blur",()=>{
  PG.keys={};
  if(PG.running) pausePlaygroundGame();
});
