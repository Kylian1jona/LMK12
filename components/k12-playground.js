/* ===========================
   Toy Playground
=========================== */
var PLAYGROUND_MODES = [
  { id:"toybox", name:"Toy Box", tip:"Click a toy to place it. Drag toys around the stage." },
  { id:"flyer", name:"Sky Flyer", tip:"Press Space, click, or tap Jump to fly through the gaps." },
  { id:"runner", name:"Lane Dash", tip:"Move left and right to dodge blocks and collect stars." },
  { id:"brick", name:"Brick Bounce", tip:"Move the paddle to clear every brick." },
  { id:"pop", name:"Star Pop", tip:"Click as many moving stars as you can before time runs out." },
  { id:"memory", name:"Toy Match", tip:"Flip cards and find every toy pair." },
  { id:"maze", name:"Maze Quest", tip:"Move through the maze and collect all the coins." },
  { id:"catch", name:"Toy Catch", tip:"Move the basket and catch falling toys." }
];

var PG = {
  mode:"toybox",
  running:false,
  last:0,
  raf:0,
  state:{},
  keys:{},
  images:{},
  started:false
};

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
        <h1>Unlock Toy Playground</h1>
        <p class="small-note">Spend ${cost} Learners once for this learner to open the toy games and toy stage.</p>
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
  if(typeof playgroundUnlocked === "function" && !playgroundUnlocked()){
    renderPlaygroundLock(panel);
    return;
  }
  preloadPlaygroundToys();
  panel.innerHTML = `
    <div class="playground-head">
      <div>
        <h1>Toy Playground</h1>
        <p class="small-note">Use your shop toys, then jump into quick arcade games.</p>
      </div>
      <div class="scorebar">
        <button type="button" class="btn btn-main" onclick="show('shop')">Shop</button>
        <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
      </div>
    </div>

    <div class="playground-game-row" id="playgroundGameButtons"></div>

    <div class="playground-stage" id="playgroundStage">
      <canvas id="playgroundCanvas" width="960" height="540" aria-label="Interactive playground game canvas"></canvas>
      <div class="toy-play-layer" id="toyPlayLayer"></div>
    </div>

    <div class="playground-toolbar">
      <button type="button" class="btn btn-main" id="playgroundStartBtn" onclick="startPlaygroundGame()">Start</button>
      <button type="button" class="btn btn-main" onclick="pausePlaygroundGame()">Pause</button>
      <button type="button" class="btn btn-main" onclick="resetPlaygroundGame()">Reset</button>
      <button type="button" class="btn btn-main" onclick="addRandomPlaygroundToy()">Add Toy</button>
      <button type="button" class="btn btn-main" onclick="shufflePlaygroundToys()">Shuffle Toys</button>
      <button type="button" class="btn btn-main" onclick="clearPlaygroundToys()">Clear Toys</button>
    </div>

    <div class="playground-touch-controls">
      <button type="button" onclick="playgroundAction('left')">Left</button>
      <button type="button" onclick="playgroundAction('up')">Jump</button>
      <button type="button" onclick="playgroundAction('right')">Right</button>
      <button type="button" onclick="playgroundAction('down')">Down</button>
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
  row.innerHTML = PLAYGROUND_MODES.map(mode=>`
    <button type="button" class="playground-game-btn" data-playground-mode="${mode.id}" onclick="switchPlaygroundGame('${mode.id}')">
      ${playgroundSafe(mode.name)}
    </button>
  `).join("");
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
    btn.classList.toggle("active", btn.dataset.playgroundMode === PG.mode);
  });
  const mode = PLAYGROUND_MODES.find(item=>item.id === PG.mode);
  setPlaygroundStatus(mode ? mode.tip : "");
  const layer = $("toyPlayLayer");
  if(layer) layer.classList.toggle("is-hidden", PG.mode !== "toybox");
  const startBtn = $("playgroundStartBtn");
  if(startBtn) startBtn.textContent = PG.mode === "toybox" ? "Add Random Toy" : "Start";
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
  PG.state = {};
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
  if(PG.mode === "toybox"){
    addRandomPlaygroundToy();
    return;
  }
  if(PG.state.over || PG.state.win) resetPlaygroundGame(true);
  PG.running = true;
  PG.started = true;
  PG.last = performance.now();
  if(!PG.raf) PG.raf = requestAnimationFrame(playgroundTick);
}

function pausePlaygroundGame(){
  cancelPlaygroundLoop();
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
  }
}

function playgroundAction(action){
  if(PG.mode === "toybox"){
    if(action === "up") addRandomPlaygroundToy();
    if(action === "down") shufflePlaygroundToys();
    return;
  }
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
  if(PG.mode === "brick" && type === "move") PG.state.paddleX = Math.max(80, Math.min(880, p.x));
  if(PG.mode === "pop" && type === "down") popStarAt(p.x, p.y);
  if(PG.mode === "memory" && type === "down") flipMemoryAt(p.x, p.y);
  if(PG.mode === "catch" && type === "move") PG.state.basketX = Math.max(70, Math.min(890, p.x));
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
  PG.state = { bird:{x:160,y:250,vy:0}, gates:[], spawn:0, score:0, over:false };
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
  drawLabel(ctx, `Score ${s.score}`, 24, 38, 24);
  if(!PG.started) drawCenterNotice(ctx, "Sky Flyer", "Tap Jump to start flying");
  if(s.over) drawCenterNotice(ctx, "Game Over", `Final score: ${s.score}`);
}

function initRunnerGame(){
  PG.state = { lane:1, items:[], spawn:0, score:0, speed:260, over:false };
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
      if(item.kind === "star") s.score++;
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
  drawLabel(ctx, `Score ${s.score}`, 24, 38, 24);
  if(!PG.started) drawCenterNotice(ctx, "Lane Dash", "Use Left and Right to start");
  if(s.over) drawCenterNotice(ctx, "Crash", `Stars collected: ${s.score}`);
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
  PG.state = {targets:[], score:0, time:30, over:false};
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
  const hit = s.targets.findIndex(t=>Math.hypot(t.x - x, t.y - y) < t.r);
  if(hit >= 0){
    s.targets.splice(hit, 1);
    s.score++;
    addPopTarget();
    if(!PG.running) startPlaygroundGame();
  }
}

function drawPopGame(ctx){
  const s = PG.state;
  s.targets.forEach(t=>{
    ctx.fillStyle = "#ffd34d";
    drawStar(ctx, t.x, t.y, t.r);
  });
  drawLabel(ctx, `Score ${s.score}`, 24, 38, 24);
  drawLabel(ctx, `Time ${Math.ceil(s.time)}`, 800, 38, 24);
  if(!PG.started) drawCenterNotice(ctx, "Star Pop", "Click a star to begin");
  if(s.over) drawCenterNotice(ctx, "Time", `You popped ${s.score} stars`);
}

function initMemoryGame(){
  const toys = playgroundPlayableToys().slice(0, 6);
  const cards = [...toys, ...toys]
    .map((toy, index)=>({toy, key:toy.id + "-" + index, flipped:false, matched:false}))
    .sort(()=>Math.random() - .5);
  PG.state = {cards, first:null, lock:0, score:0, win:false};
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
  drawLabel(ctx, `Matches ${s.score}/6`, 24, 38, 24);
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
  const coins = new Set();
  map.forEach((row, r)=>row.split("").forEach((cell, c)=>{
    if(cell === ".") coins.add(c + "," + r);
  }));
  PG.state = {map, player:{c:1,r:1}, coins, score:0, win:false};
  PG.state.coins.delete("1,1");
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
  s.win = s.coins.size === 0;
  PG.started = true;
}

function drawMazeGame(ctx){
  const s = PG.state;
  const cell = 48, ox = 192, oy = 76;
  s.map.forEach((row, r)=>row.split("").forEach((v, c)=>{
    ctx.fillStyle = v === "#" ? "#71422d" : "#fffaf2";
    ctx.fillRect(ox + c*cell, oy + r*cell, cell - 3, cell - 3);
    if(s.coins.has(c + "," + r)){
      ctx.fillStyle = "#ffd34d";
      ctx.beginPath();
      ctx.arc(ox + c*cell + cell/2, oy + r*cell + cell/2, 9, 0, Math.PI*2);
      ctx.fill();
    }
  }));
  drawToy(ctx, playgroundAvatarToy(), ox + s.player.c*cell + 5, oy + s.player.r*cell + 5, 38, 38);
  drawLabel(ctx, `Coins ${s.score}`, 24, 38, 24);
  if(!PG.started) drawCenterNotice(ctx, "Maze Quest", "Use direction buttons or arrow keys");
  if(s.win) drawCenterNotice(ctx, "Maze Cleared", `Coins collected: ${s.score}`);
}

function initCatchGame(){
  PG.state = {basketX:480, drops:[], spawn:0, score:0, missed:0, over:false};
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
  drawLabel(ctx, `Caught ${s.score}`, 24, 38, 24);
  drawLabel(ctx, `Missed ${s.missed}/5`, 780, 38, 24);
  if(!PG.started) drawCenterNotice(ctx, "Toy Catch", "Move the basket to begin");
  if(s.over) drawCenterNotice(ctx, "Round Over", `Toys caught: ${s.score}`);
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
