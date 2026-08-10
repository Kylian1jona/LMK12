/* ===========================
   Confetti
=========================== */
const confetti = { canvas:null, ctx:null, parts:[], running:false };
function confettiResize(){
  if(!confetti.canvas) return;
  const dpr = window.devicePixelRatio || 1;
  confetti.canvas.width = Math.floor(window.innerWidth * dpr);
  confetti.canvas.height = Math.floor(window.innerHeight * dpr);
  confetti.ctx.setTransform(dpr,0,0,dpr,0,0);
}
function launchConfetti(intensity=120){
  confetti.canvas = confetti.canvas || $("confettiCanvas");
  if(!confetti.canvas) return;
  confetti.ctx = confetti.ctx || confetti.canvas.getContext("2d");
  confettiResize();
  const w = window.innerWidth, h = window.innerHeight;
  const colors = ["#ef4444","#f97316","#ffffff","#fde68a","#fff7ed"];
  for(let i=0;i<intensity;i++){
    confetti.parts.push({
      x: Math.random()*w, y: -20 - Math.random()*h*0.2,
      vx: (Math.random()-0.5)*6, vy: Math.random()*3 + 3,
      r: Math.random()*4 + 3, rot: Math.random()*Math.PI,
      vr: (Math.random()-0.5)*0.2, c: colors[Math.floor(Math.random()*colors.length)],
      life: 140 + Math.random()*80
    });
  }
  if(!confetti.running){ confetti.running = true; requestAnimationFrame(confettiTick); }
}
function confettiTick(){
  const ctx = confetti.ctx;
  if(!ctx){ confetti.running=false; return; }
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  const h = window.innerHeight;
  confetti.parts = confetti.parts.filter(p=>p.life>0);
  confetti.parts.forEach(p=>{
    p.life -= 1; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.vy += 0.02;
    if(p.y > h + 40) p.life = 0;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.c;
    ctx.fillRect(-p.r, -p.r, p.r*2, p.r*2);
    ctx.restore();
  });
  if(confetti.parts.length) requestAnimationFrame(confettiTick);
  else{ confetti.running = false; ctx.clearRect(0,0,window.innerWidth,window.innerHeight); }
}
window.addEventListener("resize", ()=>confettiResize());

/* ===========================
   Points + Learners + Storage (per user)
=========================== */
const STORE_KEY = "learnmaster_progress_v2";
const PLAYGROUND_UNLOCK_COST = 5;
const PLAYGROUND_UNLOCK_KEY = "learnmaster_playground_unlock_v1";
const DEFAULT_STATS = {
  correct:0,
  wrong:0,
  lessonsCompleted:0,
  lastLesson:"",
  readingMinutes:0,
  lessonStreak:0,
  bestLessonStreak:0,
  lastLessonDate:""
};
function blankState(){ return { points:0, learners:0, owned:[], stats:{...DEFAULT_STATS} }; }
let state = blankState();

function getStoreKeyForKid(kidId){ return STORE_KEY + "_kid_" + String(kidId || getActiveKidId()); }
function getStoreKey(){ return getStoreKeyForKid(getActiveKidId()); }

function loadState(){
  state = blankState();
  try{
    const raw = learnMasterStore.getItem(getStoreKey());
    if(raw){
      const parsed = JSON.parse(raw);
      if(typeof parsed.points === "number") state.points = parsed.points;
      if(typeof parsed.learners === "number") state.learners = parsed.learners;
      if(Array.isArray(parsed.owned)) state.owned = parsed.owned;
      if(parsed.stats && typeof parsed.stats === "object"){
        state.stats = {...DEFAULT_STATS, ...parsed.stats};
      }
    }
  }catch(e){}
}
function saveState(){ learnMasterStore.setItem(getStoreKey(), JSON.stringify(state)); }

function getPlaygroundUnlockKey(kidId=getActiveKidId()){
  return PLAYGROUND_UNLOCK_KEY + "_kid_" + String(kidId || "kid1");
}

function playgroundUnlocked(){
  return learnMasterStore.getItem(getPlaygroundUnlockKey()) === "1";
}

function unlockPlayground(){
  safeClick();
  if(playgroundUnlocked()){
    show("playground");
    return;
  }
  if(state.learners < PLAYGROUND_UNLOCK_COST){
    const needed = PLAYGROUND_UNLOCK_COST - state.learners;
    toast(`Need ${needed} more Learner${needed === 1 ? "" : "s"} to unlock Playground.`);
    speakGlobal(`You need ${needed} more learners to unlock the playground.`);
    return;
  }
  state.learners -= PLAYGROUND_UNLOCK_COST;
  saveState();
  learnMasterStore.setItem(getPlaygroundUnlockKey(), "1");
  renderAllBadges();
  renderConvertButtons();
  updateUserUI();
  toast("Playground unlocked!");
  speakGlobal("Playground unlocked.");
  show("playground");
}

function addPoints(delta){
  state.points = Math.max(0, state.points + delta);
  saveState();
  renderAllBadges();
  renderConvertButtons();
  updateUserUI();
}
function convertPoints(){
  safeClick();
  if(state.points < 20){ toast("Need 20⭐ points to convert."); speakGlobal("You need twenty points to convert."); return; }
  state.points -= 20;
  state.learners += 5;
  saveState();
  safePlay($("rewardSfx"));
  renderAllBadges();
  renderConvertButtons();
  renderShop();
  renderGrade10LessonButtons();
  updateUserUI();
  launchConfetti(150);
  toast("Converted! +5💎");
  speakGlobal("Great! You earned five learners!");
}
function resetProgress(){ accountUnlock("resetCurrentKid"); }

function renderAllBadges(){
  const ids = [
    "shopPoints","shopLearners",
    "prekPoints","prekLearners","pkaPoints","pkaLearners","pkcPoints","pkcLearners","pksPoints","pksLearners",
    "kPoints","kLearners","kscPoints","kscLearners","ksbPoints","ksbLearners","krPoints","krLearners",
    "g1Points","g1Learners","g1asPoints","g1asLearners","g1gPoints","g1gLearners","g1mPoints","g1mLearners",
    "g2Points","g2Learners",
"g3Points","g3Learners",
"g4Points","g4Learners",
"g5Points","g5Learners",
"g6Points","g6Learners",
"g7Points","g7Learners",
"g8Points","g8Learners",
"g9Points","g9Learners",
"g10Points","g10Learners",
"lrPoints","lrLearners",

    "menuPoints","menuLearners"
  ];
  ids.forEach(id=>{
    const el = $(id);
    if(!el) return;
    if(id.toLowerCase().includes("points")) el.textContent = String(state.points);
    if(id.toLowerCase().includes("learners")) el.textContent = String(state.learners);
  });
}
function renderConvertButtons(){
  const can = state.points >= 20;
  const b = $("convertBtn2");
  if(!b) return;
  b.disabled = !can;
  b.textContent = can ? "Convert 20⭐ → 5💎" : "Need 20⭐ → 5💎";
}

/* ===========================
   Voice
=========================== */
const VOICE_ENABLED_PREF_KEY = "learnmaster_voice_enabled_v1";
let voiceOn = learnMasterStore.getItem(VOICE_ENABLED_PREF_KEY) !== "off";
const VOICE_PREF_KEY = "learnmaster_voice_pref_v1";
let voiceType = learnMasterStore.getItem(VOICE_PREF_KEY) || "female";
const MUSIC_PREF_KEY = "learnmaster_music_pref_v1";
let musicOn = learnMasterStore.getItem(MUSIC_PREF_KEY) === "on";
let MUSIC_TIMER = 0;
let musicStep = 0;

function playMusicNote(){
  if(!musicOn) return;
  try{
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if(!AudioContextClass) return;
    K12_AUDIO_CONTEXT = K12_AUDIO_CONTEXT || new AudioContextClass();
    if(K12_AUDIO_CONTEXT.state === "suspended") K12_AUDIO_CONTEXT.resume().catch(()=>{});
    const notes = [261.63,329.63,392,329.63,293.66,349.23,440,349.23];
    const oscillator = K12_AUDIO_CONTEXT.createOscillator();
    const gain = K12_AUDIO_CONTEXT.createGain();
    const now = K12_AUDIO_CONTEXT.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.value = notes[musicStep++ % notes.length];
    gain.gain.setValueAtTime(.0001,now);
    gain.gain.exponentialRampToValueAtTime(.018,now+.04);
    gain.gain.exponentialRampToValueAtTime(.0001,now+.72);
    oscillator.connect(gain);
    gain.connect(K12_AUDIO_CONTEXT.destination);
    oscillator.start(now);
    oscillator.stop(now+.75);
  }catch(e){}
}

function startMusic(){
  if(!musicOn || MUSIC_TIMER) return;
  playMusicNote();
  MUSIC_TIMER = window.setInterval(playMusicNote,900);
}

function stopMusic(){
  window.clearInterval(MUSIC_TIMER);
  MUSIC_TIMER = 0;
}

function toggleMusic(){
  safePlay($("clickSfx"));
  musicOn = !musicOn;
  learnMasterStore.setItem(MUSIC_PREF_KEY,musicOn ? "on" : "off");
  if(musicOn) startMusic();
  else stopMusic();
  renderVoiceControls();
  toast(musicOn ? "Music turned on." : "Music turned off.");
}

function getSpeechVoices(){
  try{
    return typeof speechSynthesis !== "undefined" ? speechSynthesis.getVoices() : [];
  }catch(e){
    return [];
  }
}

function getPreferredSpeechVoice(){
  const voices = getSpeechVoices().filter(v=>/^en/i.test(v.lang || ""));
  if(!voices.length) return null;
  const wantMale = voiceType === "male";
  const nameMatch = voices.find(v=>{
    const name = String(v.name || "").toLowerCase();
    return wantMale
      ? /(male|david|mark|daniel|george|guy|alex|fred)/.test(name)
      : /(female|zira|samantha|susan|hazel|karen|victoria|ava|aria)/.test(name);
  });
  return nameMatch || voices[0] || null;
}

function renderVoiceControls(){
  if($("voiceItem")) $("voiceItem").textContent = voiceOn ? "Voice: On" : "Voice: Off";
  if($("settingsVoiceBtn")) $("settingsVoiceBtn").textContent = voiceOn ? "Voice: On" : "Voice: Off";
  if($("musicItem")) $("musicItem").textContent = musicOn ? "Music: On" : "Music: Off";
  if($("settingsMusicBtn")) $("settingsMusicBtn").textContent = musicOn ? "Music: On" : "Music: Off";
  if($("voiceFemaleBtn")) $("voiceFemaleBtn").classList.toggle("active", voiceType === "female");
  if($("voiceMaleBtn")) $("voiceMaleBtn").classList.toggle("active", voiceType === "male");
}
function toggleVoice(){
  safeClick();
  voiceOn = !voiceOn;
  learnMasterStore.setItem(VOICE_ENABLED_PREF_KEY,voiceOn ? "on" : "off");
  renderVoiceControls();
  if(!voiceOn) try{ speechSynthesis.cancel(); }catch(e){}
  toast(voiceOn ? "Voice turned on." : "Voice turned off.");
}
function setVoiceType(type){
  safeClick();
  voiceType = type === "male" ? "male" : "female";
  learnMasterStore.setItem(VOICE_PREF_KEY, voiceType);
  renderVoiceControls();
  speakGlobal(voiceType === "male" ? "Male voice selected." : "Female voice selected.");
}
function speakGlobal(t){
  if(!voiceOn) return;
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    const preferredVoice = getPreferredSpeechVoice();
    if(preferredVoice) u.voice = preferredVoice;
    u.rate = 0.9;
    u.pitch = voiceType === "male" ? 0.9 : 1.08;
    u.lang = "en-US";
    speechSynthesis.speak(u);
  }catch(e){}
}

function cancelLessonVoice(){
  try{ speechSynthesis.cancel(); }catch(e){}
}

document.addEventListener("visibilitychange",()=>{
  if(document.hidden) cancelLessonVoice();
});
window.addEventListener("pagehide",cancelLessonVoice);

/* ===========================
   Navigation
=========================== */
const TIMED_LESSON_SECTIONS=new Set([
  "prek-add","prek-count","prek-shapes",
  "k-syll-count","k-syll-build","k-rhymes",
  "g1-addsub","g1-graphs","g1-money",
  "early-bank","lessonRunner"
]);
let universalLessonTimerSection="", universalLessonElapsedMs=0;
let universalLessonActiveSince=0, universalLessonTimerHandle=0;
let visibleAppSection="home";

function formatUniversalLessonTime(milliseconds){
  const totalSeconds=Math.max(0,Math.floor(milliseconds/1000));
  const minutes=Math.floor(totalSeconds/60);
  const seconds=totalSeconds%60;
  return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

function universalLessonTimerDisplay(){
  if(universalLessonTimerSection==="early-bank") return $("earlyBankTimer");
  return $("universalLessonTimer");
}

function ensureUniversalLessonTimer(sectionId){
  if(sectionId==="early-bank") return $("earlyBankTimer");
  const section=$(sectionId);
  if(!section) return null;
  document.querySelectorAll(".universal-lesson-timer").forEach(timer=>timer.remove());
  const badge=document.createElement("div");
  badge.className="badge-pill universal-lesson-timer";
  badge.innerHTML='⏱ Time: <span id="universalLessonTimer">00:00</span>';
  const heading=section.querySelector("h1");
  if(heading) heading.insertAdjacentElement("afterend",badge);
  else section.prepend(badge);
  return $("universalLessonTimer");
}

function updateUniversalLessonTimer(){
  const active=universalLessonActiveSince?Date.now()-universalLessonActiveSince:0;
  const display=universalLessonTimerDisplay();
  if(display) display.textContent=formatUniversalLessonTime(universalLessonElapsedMs+active);
}

function resumeUniversalLessonTimer(){
  if(!universalLessonTimerSection||universalLessonActiveSince||document.hidden) return;
  universalLessonActiveSince=Date.now();
  updateUniversalLessonTimer();
  clearInterval(universalLessonTimerHandle);
  universalLessonTimerHandle=setInterval(updateUniversalLessonTimer,1000);
}

function pauseUniversalLessonTimer(){
  if(universalLessonActiveSince){
    universalLessonElapsedMs+=Date.now()-universalLessonActiveSince;
    universalLessonActiveSince=0;
  }
  clearInterval(universalLessonTimerHandle);
  universalLessonTimerHandle=0;
  updateUniversalLessonTimer();
}

function startUniversalLessonTimer(sectionId){
  pauseUniversalLessonTimer();
  universalLessonTimerSection=sectionId;
  universalLessonElapsedMs=0;
  universalLessonActiveSince=0;
  ensureUniversalLessonTimer(sectionId);
  resumeUniversalLessonTimer();
}

function restartUniversalLessonTimer(){
  if(!universalLessonTimerSection) return;
  universalLessonElapsedMs=0;
  universalLessonActiveSince=0;
  resumeUniversalLessonTimer();
}

document.addEventListener("visibilitychange",()=>{
  if(document.hidden) pauseUniversalLessonTimer();
  else if(TIMED_LESSON_SECTIONS.has(universalLessonTimerSection)) resumeUniversalLessonTimer();
});
window.addEventListener("pagehide",pauseUniversalLessonTimer);

function show(id){
  if(!loggedIn){ showLogin(""); return; }
  if(!gateAllowedSection(id)){
    if(typeof hideCorrectFeedbackOverlay==="function") hideCorrectFeedbackOverlay();
    if(typeof clearLessonAdvanceTimers==="function") clearLessonAdvanceTimers();
    showPaywall();
    toast("Choose a plan to unlock this.");
    return;
  }
  if(typeof hideCorrectFeedbackOverlay==="function") hideCorrectFeedbackOverlay();
  if(id!=="lessonRunner" && typeof clearLessonAdvanceTimers==="function") clearLessonAdvanceTimers();
  if(["settings","analysis","addUserPage"].includes(id)) hidePaywall();
  cancelLessonVoice();
  if(TIMED_LESSON_SECTIONS.has(id)){
    if(universalLessonTimerSection!==id||visibleAppSection!==id) startUniversalLessonTimer(id);
    else resumeUniversalLessonTimer();
  }else{
    pauseUniversalLessonTimer();
  }
  visibleAppSection=id;
  const sections = [
    "home","grades","reading","settings","addUserPage","analysis","shop","playground",
    "parentPortal","adminPortal","curriculumStandards",
    "prek","prek-add","prek-count","prek-shapes",
    "kinder","k-syll-count","k-syll-build","k-rhymes",
    "grade1","g1-addsub","g1-graphs","g1-money","early-bank",
    "grade2","g2-eng","g2-math","g2-sci","g2-hist",
"grade3","g3-eng","g3-math","g3-sci","g3-hist",
"grade4","g4-eng","g4-math","g4-sci","g4-hist",
"grade5","g5-eng","g5-math","g5-sci","g5-hist",
"grade6","g6-eng","g6-math","g6-sci","g6-hist",
"grade7","g7-eng","g7-math","g7-sci","g7-hist",
"grade8","g8-eng","g8-math","g8-sci","g8-hist",
"grade9","g9-eng","g9-math","g9-sci","g9-hist",
"grade10","g10-eng","g10-math","g10-sci","g10-hist",
"lessonRunner",

  ];
  sections.forEach(s=>{ const el = $(s); if(el) el.classList.toggle("d-none", s!==id); });
  safeClick();
  window.scrollTo(0,0);
  if(id==="shop") renderShop();
  if(id==="playground" && typeof renderPlayground === "function") renderPlayground();
  if(id==="reading" && !$("readingPanel")?.innerHTML.trim()) renderReadingHome();
  if(id==="settings") renderSettings();
  if(id==="analysis") renderAnalysis();
  if(id==="addUserPage" && $("addUserCount")) $("addUserCount").textContent = String(learnerCount());
}

/* ===========================
   Shop
=========================== */
const TOYS = [

{
id:"teddy",
name:"Teddy Bear",
img:"images/toys/teddy.png",
cost:20
},

{
id:"legoClassic",
name:"LEGO Classic",
img:"images/toys/lego-classic.png",
cost:60
},

{
id:"barbie",
name:"Barbie Doll",
img:"images/toys/barbie.png",
cost:55
},

{
id:"hotwheels",
name:"Hot Wheels",
img:"images/toys/hot-wheels.png",
cost:35
},

{
id:"rccar",
name:"RC Car",
img:"images/toys/rc-car.png",
cost:150
},

{
id:"train",
name:"Wooden Train",
img:"images/toys/wooden-train.png",
cost:120
},

{
id:"dinosaur",
name:"Dinosaur Toy",
img:"images/toys/dinosaur.png",
cost:45
},

{
id:"unicorn",
name:"Unicorn Plush",
img:"images/toys/unicorn.png",
cost:35
},

{
id:"basketball",
name:"Basketball",
img:"images/toys/basketball.png",
cost:40
},

{
id:"soccer",
name:"Soccer Ball",
img:"images/toys/soccer.png",
cost:40
},

{
id:"playdoh",
name:"Play-Doh",
img:"images/toys/playdoh.png",
cost:30
},

{
id:"slime",
name:"Slime Kit",
img:"images/toys/slime-kit.png",
cost:35
},

{
id:"craft",
name:"Craft Kit",
img:"images/toys/craft-kit.png",
cost:50
},

{
id:"science",
name:"Science Kit",
img:"images/toys/science-kit.png",
cost:90
},

{
id:"robot",
name:"Robot Kit",
img:"images/toys/robot-kit.png",
cost:150
},

{
id:"puzzleCube",
name:"Puzzle Cube",
img:"images/toys/puzzle-cube.png",
cost:45
},

{
id:"crayonSet",
name:"Crayon Set",
img:"images/toys/crayon-set.png",
cost:25
},

{
id:"storyBook",
name:"Story Book",
img:"images/toys/story-book.png",
cost:40
},

{
id:"microscope",
name:"Microscope",
img:"images/toys/microscope.png",
cost:110
},

{
id:"kite",
name:"Kite",
img:"images/toys/kite.png",
cost:55
},

{
id:"headphones",
name:"Headphones",
img:"images/toys/headphones.png",
cost:80
},

{
id:"artEasel",
name:"Art Easel",
img:"images/toys/art-easel.png",
cost:95
},

{
id:"kickScooter",
name:"Kick Scooter",
img:"images/toys/kick-scooter.png",
cost:130
}

];
function shopAllowed(){
  return anySubjectAllowed();
}

const ACTIVITY_REWARDS = [
  {
    id:"reward_reading_20",
    item:{ id:"readingBadge", name:"Reading Star Badge", emoji:"RS" },
    title:"Read for 20 minutes",
    desc:"Log 20 reading minutes to claim this free shop item.",
    ready:()=>ensureStats().readingMinutes >= 20,
    progress:()=>`${Math.min(ensureStats().readingMinutes, 20)} / 20 minutes`
  },
  {
    id:"reward_lessons_5",
    item:{ id:"lessonCrown", name:"Lesson Champion Crown", emoji:"LC" },
    title:"Finish 5 lessons",
    desc:"Complete 5 lessons to claim this free shop item.",
    ready:()=>ensureStats().lessonsCompleted >= 5,
    progress:()=>`${Math.min(ensureStats().lessonsCompleted, 5)} / 5 lessons`
  }
];

function allOwnedItems(){
  return [
    ...TOYS,
    ...ACTIVITY_REWARDS.map(r=>({...r.item, cost:0}))
  ];
}

function renderActivityRewards(grid){
  ACTIVITY_REWARDS.forEach(reward=>{
    const owned = state.owned.includes(reward.item.id);
    const ready = reward.ready();
    const div = document.createElement("div");
    div.className = "shop-item " + (owned ? "owned" : (ready ? "" : "locked"));
    div.innerHTML = `
      <div class="d-flex align-items-center justify-content-between gap-2 flex-wrap">
        <div class="d-flex align-items-center gap-3">
          <div class="shop-emoji">${reward.item.emoji}</div>
          <div>
            <div style="font-weight:900;font-size:1.05rem;">${reward.item.name}</div>
            <div class="small-note">${reward.desc}</div>
            <div class="small-note fw-bold">${reward.progress()}</div>
          </div>
        </div>
        <div class="text-end">
          ${
            owned
            ? `<span class="badge-pill">Claimed</span>`
            : `<button type="button" class="btn btn-main fw-bold" ${ready ? "" : "disabled"} onclick="claimActivityReward('${reward.id}')">
                 ${ready ? "Claim free" : "Locked"}
               </button>`
          }
        </div>
      </div>
    `;
    grid.appendChild(div);
  });
}

function claimActivityReward(rewardId){
  safeClick();
  const reward = ACTIVITY_REWARDS.find(r=>r.id===rewardId);
  if(!reward) return;
  if(state.owned.includes(reward.item.id)){ toast("Already claimed."); return; }
  if(!reward.ready()){ toast("Finish the activity first."); return; }
  state.owned.push(reward.item.id);
  saveState();
  renderShop();
  renderAnalysis();
  updateUserUI();
  launchConfetti(120);
  toast(`Free item claimed: ${reward.item.name}!`);
}

function renderShop(){
  renderAllBadges();
  renderConvertButtons();
  const grid = $("shopGrid");
  if(!grid) return;
  grid.innerHTML = "";
  if(!shopAllowed()){
    grid.innerHTML = `
      <div class="quiz-card">
        <h2 style="font-weight:900;font-family:'Baloo 2',cursive;">Shop Locked</h2>
        <p class="small-note">Choose a subject plan to use the shop and claim activity rewards.</p>
        <button type="button" class="btn btn-main" onclick="showPaywall()">View Plans</button>
      </div>
    `;
    if($("ownedLine")) $("ownedLine").textContent = "";
    return;
  }
  renderActivityRewards(grid);

  TOYS.forEach(toy=>{
    const owned = state.owned.includes(toy.id);
    const canBuy = state.learners >= toy.cost && !owned;
    const div = document.createElement("div");
    div.className = "shop-item " + (owned ? "owned" : (canBuy ? "" : "locked"));
    div.innerHTML = `
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-3">
${
  toy.img
  ? `<img class="shop-img" src="${toy.img}" alt="${toy.name}">`
  : `<div class="shop-emoji">${toy.emoji}</div>`
}
          <div>
            <div style="font-weight:900;font-size:1.05rem;">${toy.name}</div>
            <div class="small-note">Cost: 💎 ${toy.cost}</div>
          </div>
        </div>
        <div class="text-end">
          ${
            owned
            ? `<span class="badge-pill">Owned</span>`
            : `<button type="button" class="btn btn-main fw-bold" ${canBuy ? "" : "disabled"} onclick="buyToy('${toy.id}')">
                 ${canBuy ? "Buy" : "Need 💎"}
               </button>`
          }
        </div>
      </div>
    `;
    grid.appendChild(div);
  });
  const ownedNames = allOwnedItems().filter(t=>state.owned.includes(t.id)).map(t=>(t.emoji ? t.emoji + " " : "") + t.name);
  if($("ownedLine")) $("ownedLine").textContent = ownedNames.length
    ? `Owned: ${ownedNames.join(" • ")}`
    : "Owned: none yet — earn 💎 and buy your first toy!";
}
function buyToy(id){
  safeClick();
  if(!shopAllowed()){ toast("Shop is locked. Choose a subject plan."); showPaywall(); return; }
  const toy = TOYS.find(t=>t.id===id);
  if(!toy) return;
  if(state.owned.includes(id)){ toast("Already owned!"); return; }
  if(state.learners < toy.cost){ toast("Not enough Learners."); speakGlobal("Not enough learners."); return; }
  state.learners -= toy.cost;
  state.owned.push(id);
  saveState();
  safePlay($("rewardSfx"));
  renderAllBadges();
  renderShop();
  if(typeof renderPlayground === "function" && $("playgroundPanel")) renderPlayground();
  updateUserUI();
  launchConfetti(120);
  toast(`Bought: ${toy.name}!`);
  speakGlobal("Nice! You bought a toy!");
}
function showReading() {
  location.hash = "";
  show("reading");
  renderReadingHome();
}

function htmlSafe(value){
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const READING_LIBRARY = {
g2:{
    title:"Grade 2",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Main Idea", body:["The main idea tells what a passage is mostly about. Details should point back to that big idea. This idea helps readers understand Main Idea while they read. Readers can notice important words and details, think about how the parts fit together, and explain the idea in their own words. Looking at more than one example makes the meaning clearer and helps readers recognize the same skill in a new passage.","When you read, ask what most sentences have in common. That question helps you choose the best main idea. When readers practice Main Idea, they should reread the important part and use clues from the text. They can talk through their thinking, point to the words that helped them, and check that their explanation matches the passage. With practice, the skill becomes easier to recognize and use independently."]},
        {title:"Story Elements", body:["A story has characters, setting, problem, and solution. These parts work together to help the story make sense. This idea helps readers understand Story Elements while they read. Readers can notice important words and details, think about how the parts fit together, and explain the idea in their own words. Looking at more than one example makes the meaning clearer and helps readers recognize the same skill in a new passage.","Good readers notice who is in the story, where it happens, what goes wrong, and how the problem is fixed. When readers practice Story Elements, they should reread the important part and use clues from the text. They can talk through their thinking, point to the words that helped them, and check that their explanation matches the passage. With practice, the skill becomes easier to recognize and use independently."]},
        {title:"Sequence of Events", body:["Sequence tells the order in which events happen. Words such as first, next, then, and finally help readers follow the order. This idea helps readers understand Sequence of Events while they read. Readers can notice important words and details, think about how the parts fit together, and explain the idea in their own words. Looking at more than one example makes the meaning clearer and helps readers recognize the same skill in a new passage.","Putting events in order makes a story easier to understand and retell. When readers practice Sequence of Events, they should reread the important part and use clues from the text. They can talk through their thinking, point to the words that helped them, and check that their explanation matches the passage. With practice, the skill becomes easier to recognize and use independently."]},
        {title:"Cause and Effect", body:["A cause is why something happens. An effect is what happens because of the cause. This idea helps readers understand Cause and Effect while they read. Readers can notice important words and details, think about how the parts fit together, and explain the idea in their own words. Looking at more than one example makes the meaning clearer and helps readers recognize the same skill in a new passage.","If rain falls all night, the wet playground is the effect. When readers practice Cause and Effect, they should reread the important part and use clues from the text. They can talk through their thinking, point to the words that helped them, and check that their explanation matches the passage. With practice, the skill becomes easier to recognize and use independently."]},
        {title:"Context Clues", body:["Context clues are words near an unfamiliar word that help explain its meaning. This idea helps readers understand Context Clues while they read. Readers can notice important words and details, think about how the parts fit together, and explain the idea in their own words. Looking at more than one example makes the meaning clearer and helps readers recognize the same skill in a new passage.","Readers can look for examples, descriptions, or opposites to figure out a new word. When readers practice Context Clues, they should reread the important part and use clues from the text. They can talk through their thinking, point to the words that helped them, and check that their explanation matches the passage. With practice, the skill becomes easier to recognize and use independently."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Word Problems", body:["A math word problem tells a little story with numbers. Read it twice before choosing an operation. Understanding Word Problems means knowing what the numbers and symbols represent. Learners can use objects, drawings, number lines, words, and equations to show the same idea in different ways. Connecting these representations makes the process easier to understand and helps learners choose a method that fits the problem.","Look for what the question asks, then decide whether to add, subtract, count groups, or compare. To use Word Problems, learners should work one step at a time and keep their work organized. They can estimate or predict first, solve carefully, and then check whether the answer makes sense. Explaining the method aloud or in writing helps show what was understood and where a mistake may have happened."]},
        {title:"Place Value", body:["Place value tells what each digit is worth. In 352, the 3 means three hundreds, the 5 means five tens, and the 2 means two ones. Understanding Place Value means knowing what the numbers and symbols represent. Learners can use objects, drawings, number lines, words, and equations to show the same idea in different ways. Connecting these representations makes the process easier to understand and helps learners choose a method that fits the problem.","Understanding place value helps you compare, add, and subtract numbers. To use Place Value, learners should work one step at a time and keep their work organized. They can estimate or predict first, solve carefully, and then check whether the answer makes sense. Explaining the method aloud or in writing helps show what was understood and where a mistake may have happened."]},
        {title:"Addition Strategies", body:["Addition combines amounts. You can count on, make a ten, use doubles, or break numbers into parts. Understanding Addition Strategies means knowing what the numbers and symbols represent. Learners can use objects, drawings, number lines, words, and equations to show the same idea in different ways. Connecting these representations makes the process easier to understand and helps learners choose a method that fits the problem.","Choosing a strategy can make addition faster and easier. To use Addition Strategies, learners should work one step at a time and keep their work organized. They can estimate or predict first, solve carefully, and then check whether the answer makes sense. Explaining the method aloud or in writing helps show what was understood and where a mistake may have happened."]},
        {title:"Subtraction Strategies", body:["Subtraction can mean taking away, finding a difference, or finding a missing part. Understanding Subtraction Strategies means knowing what the numbers and symbols represent. Learners can use objects, drawings, number lines, words, and equations to show the same idea in different ways. Connecting these representations makes the process easier to understand and helps learners choose a method that fits the problem.","You can count back, count up, or use addition facts to solve subtraction problems. To use Subtraction Strategies, learners should work one step at a time and keep their work organized. They can estimate or predict first, solve carefully, and then check whether the answer makes sense. Explaining the method aloud or in writing helps show what was understood and where a mistake may have happened."]},
        {title:"Shapes and Attributes", body:["Shapes can be described by their sides, corners, and faces. A square has four equal sides and four corners. Understanding Shapes and Attributes means knowing what the numbers and symbols represent. Learners can use objects, drawings, number lines, words, and equations to show the same idea in different ways. Connecting these representations makes the process easier to understand and helps learners choose a method that fits the problem.","Looking at attributes helps you sort and compare shapes. To use Shapes and Attributes, learners should work one step at a time and keep their work organized. They can estimate or predict first, solve carefully, and then check whether the answer makes sense. Explaining the method aloud or in writing helps show what was understood and where a mistake may have happened."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Animal Groups", body:["Animals can be grouped by shared traits. Birds have feathers, fish live in water, and reptiles often have scales. Learning about Animal Groups begins with careful observation. Scientists compare what they see, look for patterns, ask questions, and describe how different parts are connected. Examples from the world around us make the idea easier to understand and show why it is important in everyday life.","Grouping animals helps scientists compare living things and explain how they are alike or different. When studying Animal Groups, learners can describe what happens first, what changes, and what stays the same. They can compare examples and use evidence to explain what they notice. Clear descriptions help separate what was actually observed from what someone thinks may have caused it."]},
        {title:"Plant Parts", body:["Roots take in water, stems hold plants up, leaves make food, and flowers help plants reproduce. Learning about Plant Parts begins with careful observation. Scientists compare what they see, look for patterns, ask questions, and describe how different parts are connected. Examples from the world around us make the idea easier to understand and show why it is important in everyday life.","Each plant part has an important job that helps the plant survive. When studying Plant Parts, learners can describe what happens first, what changes, and what stays the same. They can compare examples and use evidence to explain what they notice. Clear descriptions help separate what was actually observed from what someone thinks may have caused it."]},
        {title:"Weather", body:["Weather describes the air outside at a certain time and place. It can be sunny, cloudy, rainy, windy, hot, or cold. Learning about Weather begins with careful observation. Scientists compare what they see, look for patterns, ask questions, and describe how different parts are connected. Examples from the world around us make the idea easier to understand and show why it is important in everyday life.","Scientists use tools such as thermometers and rain gauges to measure weather. When studying Weather, learners can describe what happens first, what changes, and what stays the same. They can compare examples and use evidence to explain what they notice. Clear descriptions help separate what was actually observed from what someone thinks may have caused it."]},
        {title:"Matter", body:["Matter is anything that takes up space. Solids, liquids, and gases are three common states of matter. Learning about Matter begins with careful observation. Scientists compare what they see, look for patterns, ask questions, and describe how different parts are connected. Examples from the world around us make the idea easier to understand and show why it is important in everyday life.","A solid keeps its shape, a liquid takes the shape of its container, and a gas spreads out. When studying Matter, learners can describe what happens first, what changes, and what stays the same. They can compare examples and use evidence to explain what they notice. Clear descriptions help separate what was actually observed from what someone thinks may have caused it."]},
        {title:"Habitats", body:["A habitat is the place where a plant or animal lives. It provides food, water, shelter, and space. Learning about Habitats begins with careful observation. Scientists compare what they see, look for patterns, ask questions, and describe how different parts are connected. Examples from the world around us make the idea easier to understand and show why it is important in everyday life.","Forests, deserts, oceans, and grasslands are examples of habitats. When studying Habitats, learners can describe what happens first, what changes, and what stays the same. They can compare examples and use evidence to explain what they notice. Clear descriptions help separate what was actually observed from what someone thinks may have caused it."]}
      ]}
    }
  },
  g3:{
    title:"Grade 3",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Inference", body:["An inference is a smart idea based on clues in the text and what you already know. This idea helps readers understand Inference while they read. Readers can notice important words and details, think about how the parts fit together, and explain the idea in their own words. Looking at more than one example makes the meaning clearer and helps readers recognize the same skill in a new passage.","If a character grabs an umbrella, you can infer it may be raining or cloudy. When readers practice Inference, they should reread the important part and use clues from the text. They can talk through their thinking, point to the words that helped them, and check that their explanation matches the passage. With practice, the skill becomes easier to recognize and use independently."]},
        {title:"Theme", body:["Theme is the lesson or message a story teaches. It may be about honesty, courage, friendship, or responsibility. This idea helps readers understand Theme while they read. Readers can notice important words and details, think about how the parts fit together, and explain the idea in their own words. Looking at more than one example makes the meaning clearer and helps readers recognize the same skill in a new passage.","Readers use the characters' actions and the ending to identify the theme. When readers practice Theme, they should reread the important part and use clues from the text. They can talk through their thinking, point to the words that helped them, and check that their explanation matches the passage. With practice, the skill becomes easier to recognize and use independently."]},
        {title:"Point of View", body:["Point of view tells who is telling the story. First-person narrators use words such as I and we. This idea helps readers understand Point of View while they read. Readers can notice important words and details, think about how the parts fit together, and explain the idea in their own words. Looking at more than one example makes the meaning clearer and helps readers recognize the same skill in a new passage.","Third-person narrators usually use names and pronouns such as he, she, and they. When readers practice Point of View, they should reread the important part and use clues from the text. They can talk through their thinking, point to the words that helped them, and check that their explanation matches the passage. With practice, the skill becomes easier to recognize and use independently."]},
        {title:"Prefixes and Suffixes", body:["A prefix is added to the beginning of a word, while a suffix is added to the end. This idea helps readers understand Prefixes and Suffixes while they read. Readers can notice important words and details, think about how the parts fit together, and explain the idea in their own words. Looking at more than one example makes the meaning clearer and helps readers recognize the same skill in a new passage.","Knowing common prefixes and suffixes helps readers understand unfamiliar words. When readers practice Prefixes and Suffixes, they should reread the important part and use clues from the text. They can talk through their thinking, point to the words that helped them, and check that their explanation matches the passage. With practice, the skill becomes easier to recognize and use independently."]},
        {title:"Summarizing", body:["A summary gives the most important parts of a text in a shorter form. This idea helps readers understand Summarizing while they read. Readers can notice important words and details, think about how the parts fit together, and explain the idea in their own words. Looking at more than one example makes the meaning clearer and helps readers recognize the same skill in a new passage.","A strong summary includes the main idea and key details without adding opinions. When readers practice Summarizing, they should reread the important part and use clues from the text. They can talk through their thinking, point to the words that helped them, and check that their explanation matches the passage. With practice, the skill becomes easier to recognize and use independently."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Multiplication", body:["Multiplication is a fast way to add equal groups. Three groups of four can be written as 3 x 4. Understanding Multiplication means knowing what the numbers and symbols represent. Learners can use objects, drawings, number lines, words, and equations to show the same idea in different ways. Connecting these representations makes the process easier to understand and helps learners choose a method that fits the problem.","Arrays, skip counting, and repeated addition can all show multiplication. To use Multiplication, learners should work one step at a time and keep their work organized. They can estimate or predict first, solve carefully, and then check whether the answer makes sense. Explaining the method aloud or in writing helps show what was understood and where a mistake may have happened."]},
        {title:"Division", body:["Division separates a total into equal groups or finds how many equal groups can be made. Understanding Division means knowing what the numbers and symbols represent. Learners can use objects, drawings, number lines, words, and equations to show the same idea in different ways. Connecting these representations makes the process easier to understand and helps learners choose a method that fits the problem.","Multiplication and division are related operations, so multiplication facts can help solve division. To use Division, learners should work one step at a time and keep their work organized. They can estimate or predict first, solve carefully, and then check whether the answer makes sense. Explaining the method aloud or in writing helps show what was understood and where a mistake may have happened."]},
        {title:"Fractions", body:["A fraction names equal parts of a whole. The numerator tells how many parts are selected, and the denominator tells how many equal parts make the whole. Understanding Fractions means knowing what the numbers and symbols represent. Learners can use objects, drawings, number lines, words, and equations to show the same idea in different ways. Connecting these representations makes the process easier to understand and helps learners choose a method that fits the problem.","Fractions can be shown with models, number lines, or sets of objects. To use Fractions, learners should work one step at a time and keep their work organized. They can estimate or predict first, solve carefully, and then check whether the answer makes sense. Explaining the method aloud or in writing helps show what was understood and where a mistake may have happened."]},
        {title:"Area and Perimeter", body:["Area measures the space inside a shape, while perimeter measures the distance around it. Understanding Area and Perimeter means knowing what the numbers and symbols represent. Learners can use objects, drawings, number lines, words, and equations to show the same idea in different ways. Connecting these representations makes the process easier to understand and helps learners choose a method that fits the problem.","Rectangular area can be found by multiplying length by width. To use Area and Perimeter, learners should work one step at a time and keep their work organized. They can estimate or predict first, solve carefully, and then check whether the answer makes sense. Explaining the method aloud or in writing helps show what was understood and where a mistake may have happened."]},
        {title:"Rounding Numbers", body:["Rounding gives a nearby number that is easier to use. Look at the digit to the right of the place being rounded. Understanding Rounding Numbers means knowing what the numbers and symbols represent. Learners can use objects, drawings, number lines, words, and equations to show the same idea in different ways. Connecting these representations makes the process easier to understand and helps learners choose a method that fits the problem.","If that digit is 5 or more, round up. If it is 4 or less, keep the rounding digit the same. To use Rounding Numbers, learners should work one step at a time and keep their work organized. They can estimate or predict first, solve carefully, and then check whether the answer makes sense. Explaining the method aloud or in writing helps show what was understood and where a mistake may have happened."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Life Cycles", body:["A life cycle shows how a living thing grows and changes. Many animals begin as eggs or babies, then become adults. Learning about Life Cycles begins with careful observation. Scientists compare what they see, look for patterns, ask questions, and describe how different parts are connected. Examples from the world around us make the idea easier to understand and show why it is important in everyday life.","Some life cycles have big changes, such as a caterpillar changing into a butterfly. When studying Life Cycles, learners can describe what happens first, what changes, and what stays the same. They can compare examples and use evidence to explain what they notice. Clear descriptions help separate what was actually observed from what someone thinks may have caused it."]},
        {title:"Food Chains", body:["A food chain shows how energy moves from one organism to another. Plants are producers because they make their own food. Learning about Food Chains begins with careful observation. Scientists compare what they see, look for patterns, ask questions, and describe how different parts are connected. Examples from the world around us make the idea easier to understand and show why it is important in everyday life.","Animals are consumers because they get energy by eating plants or other animals. When studying Food Chains, learners can describe what happens first, what changes, and what stays the same. They can compare examples and use evidence to explain what they notice. Clear descriptions help separate what was actually observed from what someone thinks may have caused it."]},
        {title:"Forces and Motion", body:["A force is a push or pull that can change how an object moves. Learning about Forces and Motion begins with careful observation. Scientists compare what they see, look for patterns, ask questions, and describe how different parts are connected. Examples from the world around us make the idea easier to understand and show why it is important in everyday life.","Gravity, friction, and magnetism are forces that affect objects in different ways. When studying Forces and Motion, learners can describe what happens first, what changes, and what stays the same. They can compare examples and use evidence to explain what they notice. Clear descriptions help separate what was actually observed from what someone thinks may have caused it."]},
        {title:"Rocks and Soil", body:["Rocks are made of minerals, and soil contains tiny rock pieces, air, water, and decayed material. Learning about Rocks and Soil begins with careful observation. Scientists compare what they see, look for patterns, ask questions, and describe how different parts are connected. Examples from the world around us make the idea easier to understand and show why it is important in everyday life.","Different types of soil hold water differently and support different plants. When studying Rocks and Soil, learners can describe what happens first, what changes, and what stays the same. They can compare examples and use evidence to explain what they notice. Clear descriptions help separate what was actually observed from what someone thinks may have caused it."]},
        {title:"Inherited Traits", body:["Inherited traits are characteristics passed from parents to offspring. Eye color and leaf shape can be inherited traits. Learning about Inherited Traits begins with careful observation. Scientists compare what they see, look for patterns, ask questions, and describe how different parts are connected. Examples from the world around us make the idea easier to understand and show why it is important in everyday life.","Some traits are influenced by the environment, such as stronger muscles from exercise. When studying Inherited Traits, learners can describe what happens first, what changes, and what stays the same. They can compare examples and use evidence to explain what they notice. Clear descriptions help separate what was actually observed from what someone thinks may have caused it."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"Communities", body:["A community is a place where people live, work, and help one another. Learning about Communities helps students understand how people, places, choices, and events are connected. Important details include who was involved, where and when events happened, what problems people faced, and how their decisions affected the community. Putting details in order makes the topic easier to understand.","Communities may be rural, suburban, or urban, and each type has different features. Students can understand Communities more clearly by using maps, timelines, pictures, objects, and written accounts. Comparing more than one source can show different experiences and help students ask better questions. The goal is to explain what happened, why it mattered, and how it influenced what came next."]},
        {title:"Maps and Globes", body:["Maps show places from above, while globes are round models of Earth. Learning about Maps and Globes helps students understand how people, places, choices, and events are connected. Important details include who was involved, where and when events happened, what problems people faced, and how their decisions affected the community. Putting details in order makes the topic easier to understand.","Map keys, symbols, and compass roses help readers understand location and direction. Students can understand Maps and Globes more clearly by using maps, timelines, pictures, objects, and written accounts. Comparing more than one source can show different experiences and help students ask better questions. The goal is to explain what happened, why it mattered, and how it influenced what came next."]},
        {title:"Local Government", body:["Local governments provide services such as roads, parks, libraries, police, and fire protection. Learning about Local Government helps students understand how people, places, choices, and events are connected. Important details include who was involved, where and when events happened, what problems people faced, and how their decisions affected the community. Putting details in order makes the topic easier to understand.","Citizens can attend meetings, vote, and share ideas to help improve their community. Students can understand Local Government more clearly by using maps, timelines, pictures, objects, and written accounts. Comparing more than one source can show different experiences and help students ask better questions. The goal is to explain what happened, why it mattered, and how it influenced what came next."]}
      ]}
    }
  },
  g4:{
    title:"Grade 4",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Author's Purpose", body:["Authors usually write to inform, persuade, or entertain. The purpose shapes the details they choose. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Author's Purpose. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","A text full of facts may inform. A text asking you to agree may persuade. A complete explanation of Author's Purpose should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Text Structure", body:["Text structure is the way information is organized. Common structures include sequence, compare and contrast, cause and effect, and problem and solution. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Text Structure. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Recognizing the structure helps readers understand how ideas fit together. A complete explanation of Text Structure should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Figurative Language", body:["Figurative language creates meaning beyond the exact words. Similes compare using like or as, while metaphors make direct comparisons. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Figurative Language. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Personification gives human actions or feelings to nonhuman things. A complete explanation of Figurative Language should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Summarizing Informational Text", body:["A good informational summary states the main idea and the most important supporting details. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Summarizing Informational Text. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Minor examples and personal opinions should usually be left out. A complete explanation of Summarizing Informational Text should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Character Development", body:["Characters change because of experiences, choices, and conflicts. Readers track these changes from the beginning to the end. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Character Development. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","A character's words, actions, and thoughts reveal personality and motivation. A complete explanation of Character Development should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Fractions", body:["A fraction names part of a whole. The denominator tells how many equal parts make the whole. Understanding Fractions requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Equivalent fractions name the same amount even when the numbers look different. Accurate work with Fractions includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Multi-Digit Multiplication", body:["Multi-digit multiplication can be solved using place value, partial products, or the standard algorithm. Understanding Multi-Digit Multiplication requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Estimating first helps you decide whether your final answer is reasonable. Accurate work with Multi-Digit Multiplication includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Long Division", body:["Division can be solved by dividing, multiplying, subtracting, and bringing down the next digit. Understanding Long Division requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Checking with multiplication helps confirm the quotient and remainder. Accurate work with Long Division includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Angles", body:["An angle is formed by two rays meeting at one endpoint. Acute angles are less than 90 degrees, right angles equal 90 degrees, and obtuse angles are greater than 90 degrees. Understanding Angles requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","A protractor is used to measure angles. Accurate work with Angles includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Decimals", body:["Decimals represent parts of a whole using place value. Tenths and hundredths can be compared by lining up decimal points. Understanding Decimals requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Decimals can also be shown with money, grids, and number lines. Accurate work with Decimals includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Energy", body:["Energy is the ability to cause change. Light, heat, sound, electrical energy, and motion are common forms. A deeper understanding of Energy connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Energy can move from place to place or change form, such as electricity changing into light. Studying Energy also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Earth's Surface", body:["Weathering breaks rock into smaller pieces, erosion moves those pieces, and deposition drops them in a new place. A deeper understanding of Earth's Surface connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Water, wind, ice, and gravity all shape Earth's surface. Studying Earth's Surface also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Plant and Animal Adaptations", body:["An adaptation is a trait or behavior that helps an organism survive. Thick fur, camouflage, and migration are examples. A deeper understanding of Plant and Animal Adaptations connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Adaptations develop over many generations and match an organism's environment. Studying Plant and Animal Adaptations also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Electric Circuits", body:["A circuit is a complete path through which electric current can flow. A simple circuit may include a battery, wires, and a bulb. A deeper understanding of Electric Circuits connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","If the path is broken, the current stops and the bulb turns off. Studying Electric Circuits also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Waves", body:["Waves transfer energy from one place to another. Sound waves travel through matter, while light waves can travel through empty space. A deeper understanding of Waves connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Wavelength, amplitude, and frequency describe different features of waves. Studying Waves also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"Exploration", body:["Explorers traveled for trade, land, wealth, religion, and knowledge. Their journeys connected distant regions. Understanding Exploration requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","Exploration also caused conflict, disease, and major changes for Indigenous peoples. A strong account of Exploration compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"Colonial Life", body:["Colonial communities developed different economies based on geography and resources. Understanding Colonial Life requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","Daily life included farming, trades, family work, and local government. A strong account of Colonial Life compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"American Revolution", body:["The American Revolution grew from disagreements about taxes, representation, and political rights. Understanding American Revolution requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","Colonists and Britain fought over who had the authority to govern the colonies. A strong account of American Revolution compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]}
      ]}
    }
  },
  g5:{
    title:"Grade 5",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Text Evidence", body:["Text evidence is a detail from the passage that supports an answer. Strong evidence connects directly to the question. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Text Evidence. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","When you make a claim about a text, choose a quote or detail that proves it. A complete explanation of Text Evidence should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Theme and Summary", body:["Theme is the central message of a story, while a summary retells its most important events. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Theme and Summary. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","A strong reader explains how the events and characters support the theme. A complete explanation of Theme and Summary should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Compare and Contrast", body:["Comparing shows how two things are alike, while contrasting shows how they are different. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Compare and Contrast. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Writers may organize comparisons by subject or by individual features. A complete explanation of Compare and Contrast should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Point of View", body:["Point of view affects what information the reader receives. A narrator may know everything or only one character's thoughts. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Point of View. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Readers should consider how the story would change if another character told it. A complete explanation of Point of View should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Argument and Evidence", body:["An argument includes a claim supported by reasons and evidence. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Argument and Evidence. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Strong evidence is relevant, accurate, and clearly connected to the claim. A complete explanation of Argument and Evidence should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Decimals", body:["Decimals show parts of a whole using place value. Tenths, hundredths, and thousandths get smaller as you move right. Understanding Decimals requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Line up decimal points before adding or subtracting decimals. Accurate work with Decimals includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Fraction Operations", body:["Fractions with unlike denominators must be rewritten with a common denominator before adding or subtracting. Understanding Fraction Operations requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Multiplying fractions involves multiplying numerators and denominators, then simplifying. Accurate work with Fraction Operations includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Volume", body:["Volume measures the space inside a three-dimensional figure. Rectangular prism volume is length times width times height. Understanding Volume requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Volume is written in cubic units because it measures three dimensions. Accurate work with Volume includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Coordinate Plane", body:["The coordinate plane uses an x-axis and y-axis to locate points. Ordered pairs are written as x first, then y. Understanding Coordinate Plane requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Starting at the origin, move horizontally for x and vertically for y. Accurate work with Coordinate Plane includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Numerical Expressions", body:["Numerical expressions contain numbers and operation symbols. Parentheses and the order of operations tell which calculation comes first. Understanding Numerical Expressions requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Careful grouping helps prevent errors when evaluating expressions. Accurate work with Numerical Expressions includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Mixtures and Solutions", body:["A mixture combines materials that can often be separated. A solution is a mixture where one material dissolves in another. A deeper understanding of Mixtures and Solutions connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Salt water is a solution because salt spreads evenly through the water. Studying Mixtures and Solutions also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Matter and Properties", body:["Matter can be described by properties such as mass, volume, density, conductivity, and solubility. A deeper understanding of Matter and Properties connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Physical properties can be observed without changing the identity of a substance. Studying Matter and Properties also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Earth and Space", body:["Earth rotates once each day and revolves around the Sun once each year. A deeper understanding of Earth and Space connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","The Moon revolves around Earth, and its changing appearance is called the lunar phases. Studying Earth and Space also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Human Body Systems", body:["Body systems work together to keep the body functioning. The respiratory system brings in oxygen, and the circulatory system carries it to cells. A deeper understanding of Human Body Systems connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","The digestive system breaks down food so nutrients can enter the bloodstream. Studying Human Body Systems also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Ecosystem Changes", body:["Ecosystems change because of weather, natural disasters, human activity, and changes in populations. A deeper understanding of Ecosystem Changes connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Some organisms adapt, move, or die when their environment changes. Studying Ecosystem Changes also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"The Constitution", body:["The Constitution created a federal government with legislative, executive, and judicial branches. Understanding The Constitution requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","Checks and balances help prevent any one branch from becoming too powerful. A strong account of The Constitution compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"Westward Expansion", body:["Westward expansion increased the size of the United States and created new opportunities for settlers. Understanding Westward Expansion requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","It also displaced Native nations and caused conflict over land and resources. A strong account of Westward Expansion compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"Civil War", body:["The Civil War was caused by deep disagreements over slavery, states' rights, and political power. Understanding Civil War requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","The war preserved the Union and led to the abolition of slavery through the Thirteenth Amendment. A strong account of Civil War compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]}
      ]}
    }
  },
  g6:{
    title:"Grade 6",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Main Idea", body:["The main idea is what a passage is mostly about. It is the big point the author wants the reader to understand. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Main Idea. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Supporting details are facts, examples, reasons, or descriptions that explain the main idea. A complete explanation of Main Idea should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Author's Purpose and Tone", body:["An author's purpose is the reason for writing, while tone is the attitude shown toward the topic. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Author's Purpose and Tone. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Word choice, sentence structure, and selected details help reveal tone. A complete explanation of Author's Purpose and Tone should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Text Structure", body:["Writers organize ideas using structures such as cause and effect, compare and contrast, sequence, and problem and solution. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Text Structure. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Recognizing structure helps readers locate important connections between ideas. A complete explanation of Text Structure should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Context and Connotation", body:["Context helps determine a word's meaning, while connotation refers to the feelings or ideas connected to a word. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Context and Connotation. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Two words may have similar dictionary meanings but very different emotional effects. A complete explanation of Context and Connotation should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Central Idea and Evidence", body:["The central idea is the most important point in an informational text. It is developed through facts, examples, and explanations. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Central Idea and Evidence. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Readers should identify which details are essential and which are minor. A complete explanation of Central Idea and Evidence should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Fractions", body:["A fraction shows part of a whole. The numerator tells how many parts are counted, and the denominator tells how many equal parts are in the whole. Understanding Fractions requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Fractions are used when sharing, measuring, comparing, and solving real-world problems. Accurate work with Fractions includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Ratios", body:["A ratio compares two quantities using division. Ratios can be written with words, a colon, or a fraction bar. Understanding Ratios requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Equivalent ratios can be found by multiplying or dividing both quantities by the same number. Accurate work with Ratios includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Integers", body:["Integers include positive numbers, negative numbers, and zero. They can represent temperature, elevation, money, and direction. Understanding Integers requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","On a number line, numbers farther right are greater. Accurate work with Integers includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Expressions and Equations", body:["An expression represents a quantity, while an equation states that two expressions are equal. Understanding Expressions and Equations requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Variables stand for unknown or changing values. Accurate work with Expressions and Equations includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Statistics", body:["Statistics uses data to answer questions. Measures such as mean, median, mode, and range describe a data set. Understanding Statistics requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Graphs and tables make patterns and differences easier to see. Accurate work with Statistics includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Ecosystems", body:["An ecosystem is made of living and nonliving things interacting in one area. A deeper understanding of Ecosystems connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Producers make food, consumers eat other organisms, and decomposers break down dead material. Studying Ecosystems also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Cells", body:["Cells are the basic units of life. Plant and animal cells share many structures, but plant cells also have cell walls and chloroplasts. A deeper understanding of Cells connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Organelles perform specific jobs that keep cells alive. Studying Cells also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Weather and Climate", body:["Weather describes short-term atmospheric conditions, while climate describes long-term patterns in a region. A deeper understanding of Weather and Climate connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Temperature, precipitation, wind, and air pressure are important measurements. Studying Weather and Climate also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Earth's Systems", body:["Earth's geosphere, hydrosphere, atmosphere, and biosphere interact continuously. A deeper understanding of Earth's Systems connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","A change in one system can affect the others. Studying Earth's Systems also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Energy Transfer", body:["Energy can be transferred through conduction, convection, and radiation. A deeper understanding of Energy Transfer connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","These processes explain how heat moves through solids, fluids, and empty space. Studying Energy Transfer also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"Early Civilizations", body:["Early civilizations grew near rivers because water supported farming, transportation, and trade. Understanding Early Civilizations requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","Governments, writing systems, religions, and social classes developed as cities expanded. A strong account of Early Civilizations compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"Ancient Greece", body:["Ancient Greece influenced government, philosophy, art, mathematics, and literature. Understanding Ancient Greece requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","City-states such as Athens and Sparta developed different political and social systems. A strong account of Ancient Greece compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"Ancient Rome", body:["Rome changed from a republic into a large empire. Roman law, engineering, language, and government influenced later societies. Understanding Ancient Rome requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","The empire weakened because of political conflict, economic problems, invasions, and division. A strong account of Ancient Rome compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]}
      ]}
    }
  },
  g7:{
    title:"Grade 7",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Theme and Evidence", body:["In Grade 7, readers connect theme to specific evidence. A theme is stronger when it can be supported by repeated choices, conflicts, and consequences. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Theme and Evidence. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Good analysis explains how evidence proves the idea instead of simply listing events from the text. A complete explanation of Theme and Evidence should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Character and Conflict", body:["Characters are shaped by internal and external conflicts. Internal conflict happens within a character, while external conflict involves another person, society, nature, or technology. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Character and Conflict. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Readers track how conflict influences decisions and changes. A complete explanation of Character and Conflict should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Argument Structure", body:["An argument includes a claim, reasons, evidence, and sometimes a counterclaim. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Argument Structure. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Strong readers evaluate whether the evidence is relevant, sufficient, and credible. A complete explanation of Argument Structure should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Figurative Language", body:["Authors use imagery, metaphor, simile, symbolism, and personification to create layers of meaning. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Figurative Language. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","The effect of figurative language depends on context, tone, and purpose. A complete explanation of Figurative Language should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Text Connections", body:["Readers compare how two texts address the same topic or theme. They may differ in evidence, perspective, structure, or tone. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Text Connections. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Comparing texts reveals how authors shape information for different audiences. A complete explanation of Text Connections should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Ratios and Rates", body:["A ratio compares two quantities, while a rate compares quantities with different units. Unit rates make comparisons easier. Understanding Ratios and Rates requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","When reading a math explanation, watch for labels. The units often reveal what the numbers mean. Accurate work with Ratios and Rates includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Proportional Relationships", body:["A proportional relationship has a constant ratio between two quantities. It can be represented by a table, graph, or equation of the form y = kx. Understanding Proportional Relationships requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","The constant k is the unit rate and determines the steepness of the graph. Accurate work with Proportional Relationships includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Rational Numbers", body:["Rational numbers include integers, fractions, and terminating or repeating decimals. Understanding Rational Numbers requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Operations with rational numbers follow sign rules and the order of operations. Accurate work with Rational Numbers includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Expressions and Equations", body:["Equivalent expressions have the same value for every possible variable value. Understanding Expressions and Equations requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","The distributive property and combining like terms help simplify expressions. Accurate work with Expressions and Equations includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Probability", body:["Probability measures how likely an event is to occur. It ranges from 0 for impossible events to 1 for certain events. Understanding Probability requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Experimental probability is based on trials, while theoretical probability is based on possible outcomes. Accurate work with Probability includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Cells and Systems", body:["Cells are the basic units of living things. In multicellular organisms, cells work together as tissues, organs, and systems. A deeper understanding of Cells and Systems connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Reading science text means tracking how small parts connect to larger systems. Studying Cells and Systems also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Genetics", body:["Genes are sections of DNA that influence traits. Organisms inherit one set of genetic information from each parent. A deeper understanding of Genetics connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Genetic variation helps explain why individuals in a species are similar but not identical. Studying Genetics also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Chemical Reactions", body:["A chemical reaction rearranges atoms to form new substances. Evidence may include color change, gas production, temperature change, or formation of a solid. A deeper understanding of Chemical Reactions connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Mass is conserved because atoms are not created or destroyed. Studying Chemical Reactions also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Plate Tectonics", body:["Earth's crust is broken into plates that move slowly over the mantle. A deeper understanding of Plate Tectonics connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Plate movement causes earthquakes, volcanoes, mountain building, and seafloor spreading. Studying Plate Tectonics also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Ecological Relationships", body:["Organisms interact through competition, predation, mutualism, commensalism, and parasitism. A deeper understanding of Ecological Relationships connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","These relationships affect population size and ecosystem stability. Studying Ecological Relationships also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"Primary Sources", body:["A primary source comes from the time being studied, such as a letter, diary, speech, map, or photograph. Understanding Primary Sources requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","Historians read primary sources by asking who made them, when they were made, and what viewpoint they show. A strong account of Primary Sources compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"The Middle Ages", body:["Medieval societies were shaped by feudalism, religion, agriculture, and local loyalties. Understanding The Middle Ages requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","Trade, towns, and universities later helped transform European life. A strong account of The Middle Ages compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"The Renaissance", body:["The Renaissance was a period of renewed interest in art, science, literature, and classical learning. Understanding The Renaissance requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","New ideas spread through printing, trade, and growing cities. A strong account of The Renaissance compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"The Reformation", body:["The Reformation challenged religious authority and created new Christian denominations. Understanding The Reformation requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","Religious conflict also affected politics, education, and daily life. A strong account of The Reformation compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"Global Exploration", body:["European exploration connected continents through trade, migration, conquest, and cultural exchange. Understanding Global Exploration requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","The Columbian Exchange moved plants, animals, diseases, and people across the Atlantic. A strong account of Global Exploration compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]}
      ]}
    }
  },
  g8:{
    title:"Grade 8",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Claims and Reasons", body:["An argument includes a claim, reasons, and evidence. Strong readers separate what the author believes from how the author supports it. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Claims and Reasons. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","A reason explains why a claim might be true; evidence gives facts or examples that support the reason. A complete explanation of Claims and Reasons should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Counterclaims", body:["A counterclaim presents an opposing position. Strong arguments acknowledge counterclaims and respond with reasoning and evidence. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Counterclaims. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Refuting a counterclaim shows why the original claim remains stronger. A complete explanation of Counterclaims should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Narrative Structure", body:["Narratives often follow exposition, rising action, climax, falling action, and resolution. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Narrative Structure. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Authors may change the order through flashbacks, foreshadowing, or multiple perspectives. A complete explanation of Narrative Structure should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Rhetorical Appeals", body:["Writers use ethos to build credibility, pathos to appeal to emotion, and logos to use logic and evidence. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Rhetorical Appeals. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Effective arguments often combine all three appeals. A complete explanation of Rhetorical Appeals should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Evaluating Sources", body:["Reliable sources identify authors, provide evidence, and distinguish facts from opinions. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Evaluating Sources. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Readers should check publication date, purpose, expertise, and supporting references. A complete explanation of Evaluating Sources should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Linear Relationships", body:["A linear relationship changes by a constant amount. Tables, graphs, and equations can all show this pattern. Understanding Linear Relationships requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","The slope tells the rate of change, and the intercept often tells the starting amount. Accurate work with Linear Relationships includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Systems of Equations", body:["A system of equations contains two or more equations with the same variables. The solution makes every equation true. Understanding Systems of Equations requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Systems can be solved by graphing, substitution, or elimination. Accurate work with Systems of Equations includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Functions", body:["A function assigns exactly one output to each input. Functions can be represented with tables, graphs, equations, or mappings. Understanding Functions requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","The vertical line test helps determine whether a graph represents a function. Accurate work with Functions includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Transformations", body:["Translations, rotations, reflections, and dilations move or resize figures on a coordinate plane. Understanding Transformations requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Rigid transformations preserve length and angle measure. Accurate work with Transformations includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Scientific Notation", body:["Scientific notation writes very large or very small numbers as a number from 1 to 10 multiplied by a power of ten. Understanding Scientific Notation requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Exponents show how many places the decimal point moves. Accurate work with Scientific Notation includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Forces and Motion", body:["Forces can change an object's speed, direction, or shape. A net force is the overall force after all pushes and pulls are combined. A deeper understanding of Forces and Motion connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Science passages often describe cause and effect, so look for what force caused which motion. Studying Forces and Motion also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Newton's Laws", body:["Newton's laws explain inertia, acceleration, and action-reaction force pairs. A deeper understanding of Newton's Laws connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Acceleration depends on both net force and mass. Studying Newton's Laws also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Waves and Electromagnetic Energy", body:["Waves transfer energy without permanently moving matter from one place to another. A deeper understanding of Waves and Electromagnetic Energy connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","The electromagnetic spectrum includes radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, and gamma rays. Studying Waves and Electromagnetic Energy also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Atoms and the Periodic Table", body:["Atoms contain protons, neutrons, and electrons. The number of protons identifies the element. A deeper understanding of Atoms and the Periodic Table connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","The periodic table organizes elements by atomic number and repeating chemical properties. Studying Atoms and the Periodic Table also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Earth and Space Systems", body:["Gravity controls the motion of planets, moons, and satellites. Stars produce energy through nuclear fusion. A deeper understanding of Earth and Space Systems connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Models help scientists explain patterns that occur across extremely large distances. Studying Earth and Space Systems also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"Civic Ideas", body:["Civic history studies rights, responsibilities, laws, and government. These ideas shape how communities make decisions. Understanding Civic Ideas requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","When reading civic documents, identify the problem being addressed and the solution being proposed. A strong account of Civic Ideas compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"The Constitution", body:["The Constitution created a stronger federal system while dividing power among branches and between federal and state governments. Understanding The Constitution requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","The Bill of Rights protects individual freedoms and limits government power. A strong account of The Constitution compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"Industrialization", body:["Industrialization increased factory production, urban growth, and technological change. Understanding Industrialization requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","It also created difficult working conditions, environmental problems, and new labor movements. A strong account of Industrialization compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"Reform Movements", body:["Reformers worked to change education, labor, voting rights, slavery, prisons, and public health. Understanding Reform Movements requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","Social movements often combined moral arguments, political action, and public organizing. A strong account of Reform Movements compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"Reconstruction", body:["Reconstruction attempted to rebuild the South and define freedom after the Civil War. Understanding Reconstruction requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","New amendments expanded citizenship and voting rights, but discrimination and violence limited progress. A strong account of Reconstruction compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]}
      ]}
    }
  },
  g9:{
    title:"Grade 9",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Literary Analysis", body:["Literary analysis explains how an author creates meaning through character, structure, imagery, and language. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Literary Analysis. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","A strong paragraph makes a claim, cites evidence, and explains how the evidence supports the claim. A complete explanation of Literary Analysis should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Epic and Heroic Traditions", body:["Epics often feature heroic journeys, supernatural challenges, cultural values, and large conflicts. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Epic and Heroic Traditions. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Readers examine how the hero's choices reflect the values of the society that created the story. A complete explanation of Epic and Heroic Traditions should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Dramatic Structure", body:["Drama develops through dialogue, stage directions, conflict, and performance. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Dramatic Structure. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Soliloquies and asides reveal thoughts that other characters may not hear. A complete explanation of Dramatic Structure should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Poetry Analysis", body:["Poetry uses sound, imagery, structure, and figurative language to create concentrated meaning. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Poetry Analysis. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Line breaks, rhythm, repetition, and form affect how a poem is read. A complete explanation of Poetry Analysis should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Research and Synthesis", body:["Research synthesis combines information from multiple credible sources into a new explanation or argument. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Research and Synthesis. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Writers must cite sources and explain connections rather than merely list facts. A complete explanation of Research and Synthesis should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Algebra Models", body:["Algebra models use variables and equations to represent real situations. The variable should always be defined clearly. Understanding Algebra Models requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","After solving, reread the question to make sure the answer fits the situation and units. Accurate work with Algebra Models includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Linear Equations", body:["Linear equations represent relationships with a constant rate of change. Understanding Linear Equations requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Solutions can be found using inverse operations while preserving equality on both sides. Accurate work with Linear Equations includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Quadratic Functions", body:["Quadratic functions create parabolic graphs. Their equations often include a squared variable. Understanding Quadratic Functions requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","The vertex, axis of symmetry, and intercepts describe important features of the graph. Accurate work with Quadratic Functions includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Exponents", body:["Exponent rules simplify repeated multiplication involving powers with the same base. Understanding Exponents requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Negative exponents represent reciprocals, while zero exponents equal one for nonzero bases. Accurate work with Exponents includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Data and Regression", body:["Scatter plots show relationships between two quantitative variables. A trend line can model the overall pattern. Understanding Data and Regression requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Correlation describes association but does not automatically prove causation. Accurate work with Data and Regression includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Biology Evidence", body:["Biology texts often use evidence from cells, DNA, organisms, or ecosystems to explain living systems. A deeper understanding of Biology Evidence connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Look for data, diagrams, and cause-effect explanations that connect structure to function. Studying Biology Evidence also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Cellular Respiration", body:["Cellular respiration releases usable energy from glucose. In many organisms, it occurs mainly in mitochondria. A deeper understanding of Cellular Respiration connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","The process uses oxygen and produces carbon dioxide, water, and ATP. Studying Cellular Respiration also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Photosynthesis", body:["Photosynthesis captures light energy to build glucose from carbon dioxide and water. A deeper understanding of Photosynthesis connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Chloroplasts contain pigments that absorb light, and oxygen is released as a product. Studying Photosynthesis also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Evolution", body:["Evolution is change in inherited traits within populations over generations. A deeper understanding of Evolution connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Natural selection favors traits that improve survival and reproduction in a particular environment. Studying Evolution also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Ecology and Population Change", body:["Population size changes because of births, deaths, immigration, and emigration. A deeper understanding of Ecology and Population Change connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Limiting factors such as food, water, disease, and space affect carrying capacity. Studying Ecology and Population Change also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"Historical Context", body:["Historical context is the background around an event: time, place, beliefs, economics, and conflicts. Understanding Historical Context requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","Understanding context helps readers avoid judging the past only by today's assumptions. A strong account of Historical Context compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"Revolutions", body:["Political revolutions often grow from inequality, economic crisis, new ideas, and weak leadership. Understanding Revolutions requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","Revolutions can expand rights while also producing conflict, instability, and violence. A strong account of Revolutions compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"Imperialism", body:["Imperialism occurs when powerful nations control other territories politically, economically, or militarily. Understanding Imperialism requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","Imperial rule changed borders, economies, cultures, and resistance movements. A strong account of Imperialism compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"World War I", body:["World War I grew from militarism, alliances, imperial rivalry, and nationalism. Understanding World War I requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","Trench warfare, new technology, and total war caused enormous destruction. A strong account of World War I compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"Interwar Period", body:["The years between the world wars included economic crisis, political extremism, social change, and fragile international cooperation. Understanding Interwar Period requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","These conditions contributed to the rise of authoritarian governments. A strong account of Interwar Period compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]}
      ]}
    }
  },
  g10:{
    title:"Grade 10",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Rhetorical Analysis", body:["Rhetorical analysis studies how a writer persuades an audience. Ethos builds credibility, pathos appeals to emotion, and logos uses logic. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Rhetorical Analysis. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","A strong reader explains why a strategy works for a particular audience and purpose. A complete explanation of Rhetorical Analysis should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Satire", body:["Satire uses humor, irony, exaggeration, or ridicule to criticize people, institutions, or ideas. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Satire. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Readers must identify both the surface humor and the deeper target of criticism. A complete explanation of Satire should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Allegory", body:["An allegory tells one story while representing a broader political, moral, or social meaning. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Allegory. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Characters, settings, and events often symbolize larger ideas. A complete explanation of Allegory should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Comparative Literature", body:["Comparative analysis studies how two texts treat similar themes, conflicts, or historical experiences. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Comparative Literature. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Strong comparisons explain meaningful similarities and differences in technique and purpose. A complete explanation of Comparative Literature should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]},
        {title:"Style and Diction", body:["Diction is an author's word choice, while style includes sentence structure, tone, imagery, and organization. This concept helps readers examine how meaning is built across a text. Readers can pay attention to important words, details, patterns, and relationships, then connect those observations directly to Style and Diction. Studying several examples shows how the concept may appear in different kinds of writing while still keeping its essential features.","Formal, informal, technical, and poetic diction create different effects. A complete explanation of Style and Diction should be clear, specific, and supported by the text. Readers should identify the strongest evidence, explain the connection instead of merely listing details, and check that the conclusion fits the entire passage. Repeated practice builds accuracy and prepares readers to apply the skill to more complex texts."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Geometry Reasoning", body:["Geometry reading often depends on definitions, diagrams, and logical steps. Pay attention to given information and what must be proven. Understanding Geometry Reasoning requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Proofs work like arguments: each step needs a reason that connects it to the conclusion. Accurate work with Geometry Reasoning includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Congruence and Similarity", body:["Congruent figures have the same shape and size, while similar figures have the same shape but may differ in size. Understanding Congruence and Similarity requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Transformations and proportional reasoning help establish congruence or similarity. Accurate work with Congruence and Similarity includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Trigonometry", body:["Right-triangle trigonometry relates angles to side lengths using sine, cosine, and tangent. Understanding Trigonometry requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","These ratios can be used to find missing sides or angles. Accurate work with Trigonometry includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Circles", body:["Circle relationships involve radius, diameter, circumference, arcs, chords, and central angles. Understanding Circles requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Many circle formulas depend on pi and proportional reasoning. Accurate work with Circles includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]},
        {title:"Probability Models", body:["Probability models describe possible outcomes and their likelihoods. Compound events combine two or more events. Understanding Probability Models requires connecting definitions, numerical relationships, visual models, and symbolic procedures. Each step should follow logically from the information given, and every number or symbol should have a clear meaning. Comparing multiple representations helps reveal why a method works instead of reducing the topic to a rule that is simply memorized.","Tree diagrams, tables, and formulas help organize outcomes. Accurate work with Probability Models includes selecting an appropriate strategy, showing the reasoning, keeping track of labels or units, and checking the final result. An estimate, inverse operation, substitution, graph, or second solution method can provide useful confirmation. Clear mathematical explanations show both the calculation and the relationship that makes the calculation valid."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Chemistry Systems", body:["Chemistry explains matter by studying atoms, bonds, reactions, and energy. Small particle changes can explain large visible changes. A deeper understanding of Chemistry Systems connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","When reading chemistry, connect symbols and equations to what happens to particles. Studying Chemistry Systems also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Atomic Structure", body:["Atoms contain a dense nucleus of protons and neutrons surrounded by electrons in energy levels. A deeper understanding of Atomic Structure connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Isotopes have the same number of protons but different numbers of neutrons. Studying Atomic Structure also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Chemical Bonding", body:["Ionic bonds form through electron transfer, while covalent bonds form through electron sharing. A deeper understanding of Chemical Bonding connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Bond type influences properties such as melting point, conductivity, and solubility. Studying Chemical Bonding also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Chemical Reactions", body:["Balanced chemical equations show that atoms are conserved during reactions. A deeper understanding of Chemical Reactions connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Reaction types include synthesis, decomposition, replacement, combustion, and acid-base reactions. Studying Chemical Reactions also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]},
        {title:"Stoichiometry", body:["Stoichiometry uses balanced equations and mole ratios to calculate amounts of reactants and products. A deeper understanding of Stoichiometry connects scientific vocabulary with observations, evidence, patterns, and cause-and-effect relationships. Scientists use models and investigations to explain processes that may be too large, too small, too fast, or too slow to observe directly. Each explanation should remain consistent with the available evidence.","Units and conversion factors must be tracked carefully to avoid errors. Studying Stoichiometry also involves interpreting information from descriptions, diagrams, measurements, tables, or experiments. Strong scientific reasoning identifies the evidence, explains how it supports a claim, and recognizes when more information is needed. Comparing different examples helps distinguish the central scientific principle from details that vary between situations."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"Cause and Consequence", body:["Major historical events usually have multiple causes and consequences. Some causes are immediate, while others build over time. Understanding Cause and Consequence requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","Careful readers separate short-term effects from long-term changes. A strong account of Cause and Consequence compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"World War II", body:["World War II grew from unresolved tensions, aggressive expansion, dictatorship, and failures of diplomacy. Understanding World War II requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","The war transformed global politics and caused unprecedented military and civilian destruction. A strong account of World War II compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"The Cold War", body:["The Cold War was a global rivalry between the United States and the Soviet Union. Understanding The Cold War requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","Competition occurred through alliances, arms races, proxy wars, technology, and ideology. A strong account of The Cold War compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"Decolonization", body:["After World War II, many colonies gained independence through negotiation, protest, or armed struggle. Understanding Decolonization requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","New nations faced challenges involving borders, economic dependence, identity, and political stability. A strong account of Decolonization compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]},
        {title:"Globalization", body:["Globalization increases connections through trade, technology, migration, culture, and communication. Understanding Globalization requires attention to chronology, geography, cause and consequence, and the viewpoints of the people involved. Events develop within particular political, economic, social, and cultural conditions. Examining those conditions helps explain why people made certain choices and why the results were different across groups and places.","It creates opportunities while also raising questions about inequality, labor, environment, and national sovereignty. A strong account of Globalization compares evidence from more than one source and considers the purpose and perspective behind each account. It separates immediate causes from long-term conditions and short-term effects from lasting changes. This approach produces a fuller explanation without assuming that one viewpoint or one cause tells the entire story."]}
      ]}
    }
  }
}

function readingButton(label, action){
  const b = document.createElement("button");
  b.type = "button";
  b.className = "btn btn-main reading-card-action";
  b.textContent = label;
  b.onclick = action;
  return b;
}

function readingStepNavigation(currentStep){
  const steps = ["Grade", "Subject", "Passage"];
  return `<ol class="reading-stepper" aria-label="Reading steps">
    ${steps.map((label,index)=>{
      const step = index + 1;
      const state = step < currentStep ? "is-complete" : (step === currentStep ? "is-current" : "");
      return `<li class="${state}" ${step === currentStep ? 'aria-current="step"' : ""}><span>${step < currentStep ? "✓" : step}</span><b>${label}</b></li>`;
    }).join("")}
  </ol>`;
}

function readingViewHeader(step, title, description, backLabel=""){
  return `
    ${readingStepNavigation(step)}
    <div class="reading-view-head">
      <div>
        <span class="reading-view-step">STEP ${step} OF 3</span>
        <h2>${htmlSafe(title)}</h2>
        <p>${htmlSafe(description)}</p>
      </div>
      ${backLabel ? `<button type="button" class="reading-back-btn" id="readingBackBtn" aria-label="${htmlSafe(backLabel)}">← ${htmlSafe(backLabel)}</button>` : ""}
    </div>
  `;
}

function renderReadingHome(){
  const panel = $("readingPanel");
  if(!panel) return;
  panel.innerHTML = `
    ${readingViewHeader(1, "Choose your grade", `${Object.keys(READING_LIBRARY).length} grade levels available`)}
    <div class="reading-grid" id="readingGrid"></div>
  `;
  const grid = $("readingGrid");
  Object.keys(READING_LIBRARY).forEach(gradeId=>{
    const grade = READING_LIBRARY[gradeId];
    const card = document.createElement("div");
    card.className = "reading-card reading-grade-card";
    card.innerHTML = `<span class="reading-grade-number" aria-hidden="true">${htmlSafe(grade.title.replace("Grade ", ""))}</span><div><span class="reading-card-kicker">GRADE LEVEL</span><h3>${htmlSafe(grade.title)}</h3><p>${Object.keys(grade.subjects).length} subjects</p></div>`;
    card.appendChild(readingButton("Explore grade", ()=>renderReadingGrade(gradeId)));
    grid.appendChild(card);
  });
}

function renderReadingGrade(gradeId){
  const grade = READING_LIBRARY[gradeId];
  const panel = $("readingPanel");
  if(!grade || !panel) return;
  panel.innerHTML = `
    ${readingViewHeader(2, `${grade.title} Reading`, "Choose a subject to see its passages.", "All grades")}
    <div class="reading-grid" id="readingGrid"></div>
  `;
  const grid = $("readingGrid");
  Object.keys(grade.subjects).forEach(subjId=>{
    const subj = grade.subjects[subjId];
    const card = document.createElement("div");
    card.className = `reading-card reading-subject-card reading-subject-${htmlSafe(subjId)}`;
    card.innerHTML = `<span class="reading-subject-mark" aria-hidden="true">${htmlSafe(subj.title.charAt(0))}</span><h3>${htmlSafe(subj.title)}</h3><p>${subj.topics.length} passage${subj.topics.length === 1 ? "" : "s"}</p>`;
    card.appendChild(readingButton("View passages", ()=>renderReadingSubject(gradeId, subjId)));
    grid.appendChild(card);
  });
  $("readingBackBtn").onclick = renderReadingHome;
}

function renderReadingSubject(gradeId, subjId){
  const grade = READING_LIBRARY[gradeId];
  const subj = grade?.subjects?.[subjId];
  const panel = $("readingPanel");
  if(!grade || !subj || !panel) return;
  panel.innerHTML = `
    ${readingViewHeader(3, `${grade.title} · ${subj.title}`, "Choose a passage and start reading.", "Subjects")}
    <div class="reading-grid" id="readingGrid"></div>
  `;
  const grid = $("readingGrid");
  subj.topics.forEach((topic, index)=>{
    const card = document.createElement("div");
    card.className = "reading-card reading-topic-card";
    card.innerHTML = `<span class="reading-card-kicker">PASSAGE ${index + 1}</span><h3>${htmlSafe(topic.title)}</h3><p>${htmlSafe(topic.body[0]).slice(0, 88)}...</p>`;
    card.appendChild(readingButton("Start reading", ()=>renderReadingTopic(gradeId, subjId, index)));
    grid.appendChild(card);
  });
  $("readingBackBtn").onclick = ()=>renderReadingGrade(gradeId);
}

function readingTopicSpeech(grade, subj, topic){
  const body = Array.isArray(topic.body) ? topic.body.join(" ") : "";
  return `${grade.title}. ${subj.title}. ${topic.title}. ${body}`;
}

function readReadingTopic(gradeId, subjId, topicIndex){
  safeClick();
  const grade = READING_LIBRARY[gradeId];
  const subj = grade?.subjects?.[subjId];
  const topic = subj?.topics?.[topicIndex];
  if(!grade || !subj || !topic) return;
  speakGlobal(readingTopicSpeech(grade, subj, topic));
}

function stopVoice(){
  safeClick();
  try{ speechSynthesis.cancel(); }catch(e){}
}

function renderReadingTopic(gradeId, subjId, topicIndex){
  const grade = READING_LIBRARY[gradeId];
  const subj = grade?.subjects?.[subjId];
  const topic = subj?.topics?.[topicIndex];
  const panel = $("readingPanel");
  if(!grade || !subj || !topic || !panel) return;
  panel.innerHTML = `
    <div class="reading-reader-head">
      <button type="button" class="reading-back-btn" id="readingBackBtn" aria-label="Back to passages">← Passages</button>
      <div class="reading-reader-actions">
        <button type="button" class="btn btn-main" id="readingSpeakBtn">▶ Read aloud</button>
        <button type="button" class="reading-stop-btn" id="readingStopBtn">Stop</button>
      </div>
    </div>
    <article class="reading-passage">
      <span class="reading-view-step">${htmlSafe(grade.title)} · ${htmlSafe(subj.title)}</span>
      <h2>${htmlSafe(topic.title)}</h2>
      ${topic.body.map(p=>`<p>${htmlSafe(p)}</p>`).join("")}
    </article>
  `;
  $("readingSpeakBtn").onclick = ()=>readReadingTopic(gradeId, subjId, topicIndex);
  $("readingStopBtn").onclick = ()=>stopVoice();
  $("readingBackBtn").onclick = ()=>renderReadingSubject(gradeId, subjId);
}

function renderSettings(){
  const panel = $("settingsPanel");
  if(!panel) return;
  const kid = getActiveKid();
  const name = kid ? (kid.name || kid.username || "") : "";
  const avatar = getKidAvatarText(kid);
  const kids = loadKids();
  const stats = ensureStats();
  const learnerTotal = learnerCount(kids);
  const subjects = getPurchasedSubjects();
  const planLabel = subjects.includes("all") ? "All subjects" : (subjects.length ? subjects.map(s=>s.toUpperCase()).join(", ") : "No subject plan");
  panel.innerHTML = `
    <div class="settings-head">
      <div>
        <span class="lm-page-kicker">MY LEARNING SPACE</span>
        <h1>Settings & profile</h1>
        <p class="small-note">Keep your profile, goals, sound, and account choices in one calm place.</p>
      </div>
      <div class="avatar avatar-preview-lg" id="settingsAvatarPreview">${htmlSafe(avatar)}</div>
    </div>

    <div class="settings-grid">
      <div class="settings-block settings-profile-block">
        <h3>Profile</h3>
        <label class="settings-label" for="settingsDisplayName">Display name</label>
        <input id="settingsDisplayName" class="form-control" value="${htmlSafe(name)}">

        <label class="settings-label" for="settingsAvatarText">Avatar text</label>
        <input id="settingsAvatarText" class="form-control" maxlength="2" value="${htmlSafe(avatar)}">

        <div class="settings-label">Avatar color</div>
        <div class="avatar-color-grid" id="avatarColorChoices"></div>

        <div class="settings-label">Avatar picture or emoji</div>
        <div class="avatar-preset-grid" id="avatarPresetChoices"></div>
        <button type="button" class="btn btn-main mt-2" onclick="useTypedAvatarText()">Use typed avatar</button>

        <label class="settings-label" for="settingsDailyLessonGoal">Daily lesson goal</label>
        <input id="settingsDailyLessonGoal" class="form-control" type="number" min="1" max="20" value="${htmlSafe(kid?.dailyLessonGoal || 3)}">

        <label class="settings-label" for="settingsReadingGoal">Daily reading goal</label>
        <input id="settingsReadingGoal" class="form-control" type="number" min="5" max="180" step="5" value="${htmlSafe(kid?.readingGoal || 20)}">

        <button type="button" class="btn btn-main mt-3" onclick="saveProfileSettings()">Save profile</button>
        <p class="settings-save-status" id="settingsSaveStatus" role="status" aria-live="polite"></p>
      </div>

      <div class="settings-block settings-learning-block">
        <h3>Learning</h3>
        <button type="button" class="btn btn-main" onclick="toggleVoice()" id="settingsVoiceBtn">${voiceOn ? "Voice: On" : "Voice: Off"}</button>
        <button type="button" class="btn btn-main" onclick="toggleMusic()" id="settingsMusicBtn">${musicOn ? "Music: On" : "Music: Off"}</button>
        <div class="settings-label">Voice type</div>
        <div class="voice-choice-row">
          <button type="button" class="btn btn-main" id="voiceFemaleBtn" onclick="setVoiceType('female')">Female voice</button>
          <button type="button" class="btn btn-main" id="voiceMaleBtn" onclick="setVoiceType('male')">Male voice</button>
        </div>
        <button type="button" class="btn btn-main" onclick="logReadingMinutes(20)">Log 20 reading minutes</button>
        <button type="button" class="btn btn-main" onclick="show('shop')">Activity rewards</button>
        <button type="button" class="btn btn-main" onclick="showPaywall()">Subscription details</button>
        <button type="button" class="btn btn-main" onclick="resetProgress()">Reset progress</button>
      </div>

      <div class="settings-block settings-theme-block">
        <h3>Theme</h3>
        <p class="small-note">Choose the color style for this website.</p>
        <div class="theme-choice-grid" id="themeChoices"></div>
      </div>

      <div class="settings-block settings-account-block">
        <h3>Account</h3>
        <p class="small-note">Learners: ${learnerTotal} / ${MAX_KIDS_PER_ACCOUNT}</p>
        <p class="small-note">Active plan: ${htmlSafe(planLabel)}</p>
        <p class="small-note">Reading minutes: ${stats.readingMinutes}</p>
        <p class="small-note">Lessons finished: ${stats.lessonsCompleted}</p>
        <p class="small-note">Lesson streak: ${stats.lessonStreak || 0} day${(stats.lessonStreak || 0) === 1 ? "" : "s"}</p>
        <button type="button" class="btn btn-main" onclick="accountUnlock('addKid')" ${learnerTotal >= MAX_KIDS_PER_ACCOUNT ? "disabled" : ""}>Add learner ($5)</button>
        <button type="button" class="btn btn-main" onclick="show('analysis')">Open analysis</button>
      </div>

      <div class="settings-block settings-delete-block">
        <h3>Delete user</h3>
        <p class="small-note">Delete a learner and their saved progress on this device.</p>
        <div class="user-delete-list" id="deleteUserList"></div>
      </div>
    </div>
  `;

  const colors = $("avatarColorChoices");
  Object.keys(AVATAR_COLORS).forEach(colorId=>{
    const color = AVATAR_COLORS[colorId];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "avatar-color-btn";
    btn.style.background = color.bg;
    btn.style.color = color.fg;
    btn.textContent = getKidAvatarText(kid);
    btn.title = colorId;
    btn.onclick = ()=>setAvatarColor(colorId);
    colors.appendChild(btn);
  });
  const presets = $("avatarPresetChoices");
  if(presets){
    AVATAR_PRESETS.forEach(preset=>{
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "avatar-preset-btn";
      btn.title = preset.label;
      btn.setAttribute("aria-label", preset.label);
      if(preset.type === "image"){
        const img = document.createElement("img");
        img.src = preset.src;
        img.alt = "";
        btn.appendChild(img);
        if(kid?.avatarImage === preset.src) btn.classList.add("active");
      }else{
        btn.textContent = preset.value;
        if(!kid?.avatarImage && kid?.avatar === preset.value) btn.classList.add("active");
      }
      btn.onclick = ()=>setAvatarPreset(preset.id);
      presets.appendChild(btn);
    });
  }
  const themes = $("themeChoices");
  if(themes){
    Object.keys(THEMES).forEach(themeId=>{
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "theme-choice-btn" + (getTheme() === themeId ? " active" : "");
      btn.dataset.theme = themeId;
      btn.setAttribute("aria-pressed", String(getTheme() === themeId));
      btn.textContent = THEMES[themeId];
      btn.onclick = ()=>setTheme(themeId);
      themes.appendChild(btn);
    });
  }
  applyAvatar($("settingsAvatarPreview"), kid);
  renderVoiceControls();
  renderDeleteUserList();
}

function renderDeleteUserList(){
  const wrap = $("deleteUserList");
  if(!wrap) return;
  const kids = loadKids();
  const activeId = getActiveKidId();
  wrap.innerHTML = kids.map(k=>{
    const label = htmlSafe(k.name || k.username || "User");
    const username = htmlSafe(k.username || k.id || "");
    const activeText = k.id === activeId ? "Active learner" : "Saved learner";
    const disabled = kids.length <= 1 ? "disabled" : "";
    return `
      <div class="user-delete-row">
        <div class="user-delete-meta">
          <strong>${label}</strong>
          <span>${username} - ${activeText}</span>
        </div>
        <button type="button" class="btn btn-main danger-btn" onclick="requestDeleteKid('${htmlSafe(k.id)}')" ${disabled}>Delete</button>
      </div>
    `;
  }).join("");
}

function saveProfileSettings(){
  const kid = getActiveKid();
  const name = ($("settingsDisplayName")?.value || "").trim();
  const avatar = ($("settingsAvatarText")?.value || "").trim().slice(0,2).toUpperCase();
  const dailyLessonGoal = clamp(Number($("settingsDailyLessonGoal")?.value || 3), 1, 20);
  const readingGoal = clamp(Number($("settingsReadingGoal")?.value || 20), 5, 180);
  const patch = {
    name: name || getActiveKid()?.username || "User",
    dailyLessonGoal,
    readingGoal
  };
  if(avatar && (!kid?.avatarImage || avatar !== getKidAvatarText(kid))){
    patch.avatar = avatar;
    patch.avatarImage = "";
  }else if(!kid?.avatarImage){
    patch.avatar = avatar || undefined;
  }
  updateActiveKidProfile(patch);
  const status = $("settingsSaveStatus");
  if(status) status.textContent = "Saved! Your profile and daily goals are up to date.";
  toast("Settings saved.");
}

function setAvatarColor(colorId){
  updateActiveKidProfile({ avatarColor: colorId });
  renderSettings();
  toast("Avatar updated.");
}

function setAvatarPreset(presetId){
  const preset = AVATAR_PRESETS.find(p=>p.id === presetId);
  if(!preset) return;
  if(preset.type === "image"){
    updateActiveKidProfile({ avatarImage:preset.src, avatar:preset.label.slice(0,2).toUpperCase() });
  }else{
    updateActiveKidProfile({ avatar:preset.value, avatarImage:"" });
  }
  renderSettings();
  toast("Avatar updated.");
}

function useTypedAvatarText(){
  const avatar = ($("settingsAvatarText")?.value || "").trim().slice(0,2).toUpperCase();
  if(!avatar){ toast("Type an avatar first."); return; }
  updateActiveKidProfile({ avatar, avatarImage:"" });
  renderSettings();
  toast("Avatar updated.");
}

function ensureStats(){
  if(!state.stats || typeof state.stats !== "object") state.stats = {...DEFAULT_STATS};
  state.stats = {...DEFAULT_STATS, ...state.stats};
  return state.stats;
}

function getStatsForKid(kidId){
  try{
    const raw = learnMasterStore.getItem(getStoreKeyForKid(kidId));
    if(!raw) return {...DEFAULT_STATS};
    const parsed = JSON.parse(raw);
    return {...DEFAULT_STATS, ...(parsed.stats || {})};
  }catch(e){
    return {...DEFAULT_STATS};
  }
}

function getProgressForKid(kidId){
  try{
    const raw = learnMasterStore.getItem(getStoreKeyForKid(kidId));
    if(!raw) return { points:0, learners:0, owned:[], stats:{...DEFAULT_STATS} };
    const parsed = JSON.parse(raw);
    return {
      points:Number(parsed.points) || 0,
      learners:Number(parsed.learners) || 0,
      owned:Array.isArray(parsed.owned) ? parsed.owned : [],
      stats:{...DEFAULT_STATS, ...(parsed.stats || {})}
    };
  }catch(e){
    return { points:0, learners:0, owned:[], stats:{...DEFAULT_STATS} };
  }
}

function localDateKey(date=new Date()){
  const y = date.getFullYear();
  const m = String(date.getMonth()+1).padStart(2,"0");
  const d = String(date.getDate()).padStart(2,"0");
  return `${y}-${m}-${d}`;
}

function yesterdayKey(){
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return localDateKey(d);
}

function updateLessonStreak(stats){
  const today = localDateKey();
  if(stats.lastLessonDate === today) return;
  if(stats.lastLessonDate === yesterdayKey()){
    stats.lessonStreak = (Number(stats.lessonStreak) || 0) + 1;
  }else{
    stats.lessonStreak = 1;
  }
  stats.bestLessonStreak = Math.max(Number(stats.bestLessonStreak) || 0, stats.lessonStreak);
  stats.lastLessonDate = today;
}

function recordLearningStat(type, extra={}){
  const stats = ensureStats();
  if(type === "correct") stats.correct++;
  if(type === "wrong") stats.wrong++;
  if(type === "lesson"){
    stats.lessonsCompleted++;
    updateLessonStreak(stats);
    if(extra.title) stats.lastLesson = String(extra.title);
  }
  saveState();
  if($("settingsPanel")) renderSettings();
  if($("analysisPanel")) renderAnalysis();
  if($("shopGrid")) renderShop();
}

function renderAnalysis(){
  const panel = $("analysisPanel");
  if(!panel) return;
  const stats = ensureStats();
  const kid = getActiveKid();
  const attempts = stats.correct + stats.wrong;
  const accuracy = attempts ? Math.round((stats.correct / attempts) * 100) : 0;
  const owned = Array.isArray(state.owned) ? state.owned.length : 0;
  const pointsToConvert = Math.max(0, 20 - state.points);
  const nextGoal = state.points >= 20
    ? "Ready to convert 20 points into 5 Learners."
    : `${pointsToConvert} more point${pointsToConvert === 1 ? "" : "s"} until the next conversion.`;
  panel.innerHTML = `
    <div class="analysis-head">
      <div>
        <span class="lm-page-kicker">YOUR GROWTH</span>
        <h1>Progress</h1>
        <p class="small-note">A clear look at goals, accuracy, completed lessons, and reading time.</p>
      </div>
      <button type="button" class="btn btn-main" onclick="show('settings')">Settings</button>
    </div>

    <div class="analysis-grid">
      <div class="metric-card"><b>${state.points}</b><span>Points</span></div>
      <div class="metric-card"><b>${state.learners}</b><span>Learners</span></div>
      <div class="metric-card"><b>${stats.correct}</b><span>Correct answers</span></div>
      <div class="metric-card"><b>${stats.wrong}</b><span>Try-again answers</span></div>
      <div class="metric-card"><b>${stats.lessonsCompleted}</b><span>Lessons finished</span></div>
      <div class="metric-card"><b>${stats.lessonStreak || 0}</b><span>Lesson streak</span></div>
      <div class="metric-card"><b>${stats.readingMinutes}</b><span>Reading minutes</span></div>
      <div class="metric-card"><b>${owned}</b><span>Shop items owned</span></div>
    </div>

    <div class="analysis-panel">
      <div class="analysis-row">
        <span>Accuracy</span>
        <strong>${attempts ? accuracy + "%" : "No answers yet"}</strong>
      </div>
      <div class="progress-track"><div style="width:${accuracy}%"></div></div>
      <p>${htmlSafe(nextGoal)}</p>
      <p>Daily goals: ${htmlSafe(kid?.dailyLessonGoal || 3)} lessons and ${htmlSafe(kid?.readingGoal || 20)} reading minutes.</p>
      <p>Best lesson streak: ${stats.bestLessonStreak || 0} day${(stats.bestLessonStreak || 0) === 1 ? "" : "s"}.</p>
      <p>${stats.lastLesson ? "Last finished lesson: " + htmlSafe(stats.lastLesson) : "Finish a lesson to begin building a history."}</p>
    </div>
  `;
}

/* ===========================
   Scoring rules
=========================== */
let correctFeedbackTimer = null;
let correctFeedbackHideTimer = null;
function hideCorrectFeedbackOverlay(){
  clearTimeout(correctFeedbackTimer);
  clearTimeout(correctFeedbackHideTimer);
  correctFeedbackTimer=null;
  correctFeedbackHideTimer=null;
  const overlay=$("correctFeedbackOverlay");
  if(!overlay) return;
  overlay.classList.remove("is-visible","is-fading");
  overlay.setAttribute("aria-hidden","true");
}
function showCorrectFeedbackOverlay(message="You earned 2 points!"){
  let overlay=$("correctFeedbackOverlay");
  if(!overlay){
    overlay=document.createElement("div");
    overlay.id="correctFeedbackOverlay";
    overlay.className="correct-feedback-overlay";
    overlay.setAttribute("role","status");
    overlay.setAttribute("aria-live","assertive");
    overlay.setAttribute("aria-hidden","true");
    overlay.innerHTML=`<div class="correct-feedback-card"><span class="correct-check" aria-hidden="true">&#10003;</span><h2>CORRECT!</h2><p>You earned 2 points!</p></div>`;
    document.body.appendChild(overlay);
  }
  clearTimeout(correctFeedbackTimer);
  clearTimeout(correctFeedbackHideTimer);
  overlay.classList.remove("is-fading");
  overlay.classList.add("is-visible");
  overlay.setAttribute("aria-hidden","false");
  const messageNode=overlay.querySelector("p");
  if(messageNode) messageNode.textContent=message;
  correctFeedbackTimer=setTimeout(()=>overlay.classList.add("is-fading"),2100);
  correctFeedbackHideTimer=setTimeout(hideCorrectFeedbackOverlay,2500);
}
function correctReward(msg="Correct!"){
  safePlay($("correct"));
  addPoints(+2);
  recordLearningStat("correct");
  if(Math.random() < 0.2) launchConfetti(45);
  speakGlobal(msg);
  showCorrectFeedbackOverlay("You earned 2 points!");
}
function wrongPenalty(msg="Try again!"){
  safePlay($("wrong"));
  recordLearningStat("wrong");
  addPoints(-1);
  speakGlobal(msg);
}
