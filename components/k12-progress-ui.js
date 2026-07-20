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
let voiceOn = true;
const VOICE_PREF_KEY = "learnmaster_voice_pref_v1";
let voiceType = learnMasterStore.getItem(VOICE_PREF_KEY) || "female";

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
  if($("voiceFemaleBtn")) $("voiceFemaleBtn").classList.toggle("active", voiceType === "female");
  if($("voiceMaleBtn")) $("voiceMaleBtn").classList.toggle("active", voiceType === "male");
}
function toggleVoice(){
  safeClick();
  voiceOn = !voiceOn;
  if($("voiceItem")) $("voiceItem").textContent = voiceOn ? "🔊 Voice: On" : "🔈 Voice: Off";
  if($("settingsVoiceBtn")) $("settingsVoiceBtn").textContent = voiceOn ? "Voice: On" : "Voice: Off";
  renderVoiceControls();
  if(!voiceOn) try{ speechSynthesis.cancel(); }catch(e){}
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

/* ===========================
   Navigation
=========================== */
function show(id){
  if(!loggedIn){ showLogin(""); return; }
  if(!gateAllowedSection(id)){
    showPaywall();
    toast("Choose a plan to unlock this.");
    return;
  }
  if(["settings","analysis","addUserPage"].includes(id)) hidePaywall();
  const sections = [
    "home","grades","reading","settings","addUserPage","analysis","shop","playground",
    "prek","prek-add","prek-count","prek-shapes",
    "kinder","k-syll-count","k-syll-build","k-rhymes",
    "grade1","g1-addsub","g1-graphs","g1-money",
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
        {title:"Main Idea", body:["The main idea tells what a passage is mostly about. Details should point back to that big idea.","When you read, ask what most sentences have in common. That question helps you choose the best main idea."]},
        {title:"Story Elements", body:["A story has characters, setting, problem, and solution. These parts work together to help the story make sense.","Good readers notice who is in the story, where it happens, what goes wrong, and how the problem is fixed."]},
        {title:"Sequence of Events", body:["Sequence tells the order in which events happen. Words such as first, next, then, and finally help readers follow the order.","Putting events in order makes a story easier to understand and retell."]},
        {title:"Cause and Effect", body:["A cause is why something happens. An effect is what happens because of the cause.","If rain falls all night, the wet playground is the effect."]},
        {title:"Context Clues", body:["Context clues are words near an unfamiliar word that help explain its meaning.","Readers can look for examples, descriptions, or opposites to figure out a new word."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Word Problems", body:["A math word problem tells a little story with numbers. Read it twice before choosing an operation.","Look for what the question asks, then decide whether to add, subtract, count groups, or compare."]},
        {title:"Place Value", body:["Place value tells what each digit is worth. In 352, the 3 means three hundreds, the 5 means five tens, and the 2 means two ones.","Understanding place value helps you compare, add, and subtract numbers."]},
        {title:"Addition Strategies", body:["Addition combines amounts. You can count on, make a ten, use doubles, or break numbers into parts.","Choosing a strategy can make addition faster and easier."]},
        {title:"Subtraction Strategies", body:["Subtraction can mean taking away, finding a difference, or finding a missing part.","You can count back, count up, or use addition facts to solve subtraction problems."]},
        {title:"Shapes and Attributes", body:["Shapes can be described by their sides, corners, and faces. A square has four equal sides and four corners.","Looking at attributes helps you sort and compare shapes."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Animal Groups", body:["Animals can be grouped by shared traits. Birds have feathers, fish live in water, and reptiles often have scales.","Grouping animals helps scientists compare living things and explain how they are alike or different."]},
        {title:"Plant Parts", body:["Roots take in water, stems hold plants up, leaves make food, and flowers help plants reproduce.","Each plant part has an important job that helps the plant survive."]},
        {title:"Weather", body:["Weather describes the air outside at a certain time and place. It can be sunny, cloudy, rainy, windy, hot, or cold.","Scientists use tools such as thermometers and rain gauges to measure weather."]},
        {title:"Matter", body:["Matter is anything that takes up space. Solids, liquids, and gases are three common states of matter.","A solid keeps its shape, a liquid takes the shape of its container, and a gas spreads out."]},
        {title:"Habitats", body:["A habitat is the place where a plant or animal lives. It provides food, water, shelter, and space.","Forests, deserts, oceans, and grasslands are examples of habitats."]}
      ]}
    }
  },
  g3:{
    title:"Grade 3",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Inference", body:["An inference is a smart idea based on clues in the text and what you already know.","If a character grabs an umbrella, you can infer it may be raining or cloudy."]},
        {title:"Theme", body:["Theme is the lesson or message a story teaches. It may be about honesty, courage, friendship, or responsibility.","Readers use the characters' actions and the ending to identify the theme."]},
        {title:"Point of View", body:["Point of view tells who is telling the story. First-person narrators use words such as I and we.","Third-person narrators usually use names and pronouns such as he, she, and they."]},
        {title:"Prefixes and Suffixes", body:["A prefix is added to the beginning of a word, while a suffix is added to the end.","Knowing common prefixes and suffixes helps readers understand unfamiliar words."]},
        {title:"Summarizing", body:["A summary gives the most important parts of a text in a shorter form.","A strong summary includes the main idea and key details without adding opinions."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Multiplication", body:["Multiplication is a fast way to add equal groups. Three groups of four can be written as 3 x 4.","Arrays, skip counting, and repeated addition can all show multiplication."]},
        {title:"Division", body:["Division separates a total into equal groups or finds how many equal groups can be made.","Multiplication and division are related operations, so multiplication facts can help solve division."]},
        {title:"Fractions", body:["A fraction names equal parts of a whole. The numerator tells how many parts are selected, and the denominator tells how many equal parts make the whole.","Fractions can be shown with models, number lines, or sets of objects."]},
        {title:"Area and Perimeter", body:["Area measures the space inside a shape, while perimeter measures the distance around it.","Rectangular area can be found by multiplying length by width."]},
        {title:"Rounding Numbers", body:["Rounding gives a nearby number that is easier to use. Look at the digit to the right of the place being rounded.","If that digit is 5 or more, round up. If it is 4 or less, keep the rounding digit the same."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Life Cycles", body:["A life cycle shows how a living thing grows and changes. Many animals begin as eggs or babies, then become adults.","Some life cycles have big changes, such as a caterpillar changing into a butterfly."]},
        {title:"Food Chains", body:["A food chain shows how energy moves from one organism to another. Plants are producers because they make their own food.","Animals are consumers because they get energy by eating plants or other animals."]},
        {title:"Forces and Motion", body:["A force is a push or pull that can change how an object moves.","Gravity, friction, and magnetism are forces that affect objects in different ways."]},
        {title:"Rocks and Soil", body:["Rocks are made of minerals, and soil contains tiny rock pieces, air, water, and decayed material.","Different types of soil hold water differently and support different plants."]},
        {title:"Inherited Traits", body:["Inherited traits are characteristics passed from parents to offspring. Eye color and leaf shape can be inherited traits.","Some traits are influenced by the environment, such as stronger muscles from exercise."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"Communities", body:["A community is a place where people live, work, and help one another.","Communities may be rural, suburban, or urban, and each type has different features."]},
        {title:"Maps and Globes", body:["Maps show places from above, while globes are round models of Earth.","Map keys, symbols, and compass roses help readers understand location and direction."]},
        {title:"Local Government", body:["Local governments provide services such as roads, parks, libraries, police, and fire protection.","Citizens can attend meetings, vote, and share ideas to help improve their community."]}
      ]}
    }
  },
  g4:{
    title:"Grade 4",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Author's Purpose", body:["Authors usually write to inform, persuade, or entertain. The purpose shapes the details they choose.","A text full of facts may inform. A text asking you to agree may persuade."]},
        {title:"Text Structure", body:["Text structure is the way information is organized. Common structures include sequence, compare and contrast, cause and effect, and problem and solution.","Recognizing the structure helps readers understand how ideas fit together."]},
        {title:"Figurative Language", body:["Figurative language creates meaning beyond the exact words. Similes compare using like or as, while metaphors make direct comparisons.","Personification gives human actions or feelings to nonhuman things."]},
        {title:"Summarizing Informational Text", body:["A good informational summary states the main idea and the most important supporting details.","Minor examples and personal opinions should usually be left out."]},
        {title:"Character Development", body:["Characters change because of experiences, choices, and conflicts. Readers track these changes from the beginning to the end.","A character's words, actions, and thoughts reveal personality and motivation."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Fractions", body:["A fraction names part of a whole. The denominator tells how many equal parts make the whole.","Equivalent fractions name the same amount even when the numbers look different."]},
        {title:"Multi-Digit Multiplication", body:["Multi-digit multiplication can be solved using place value, partial products, or the standard algorithm.","Estimating first helps you decide whether your final answer is reasonable."]},
        {title:"Long Division", body:["Division can be solved by dividing, multiplying, subtracting, and bringing down the next digit.","Checking with multiplication helps confirm the quotient and remainder."]},
        {title:"Angles", body:["An angle is formed by two rays meeting at one endpoint. Acute angles are less than 90 degrees, right angles equal 90 degrees, and obtuse angles are greater than 90 degrees.","A protractor is used to measure angles."]},
        {title:"Decimals", body:["Decimals represent parts of a whole using place value. Tenths and hundredths can be compared by lining up decimal points.","Decimals can also be shown with money, grids, and number lines."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Energy", body:["Energy is the ability to cause change. Light, heat, sound, electrical energy, and motion are common forms.","Energy can move from place to place or change form, such as electricity changing into light."]},
        {title:"Earth's Surface", body:["Weathering breaks rock into smaller pieces, erosion moves those pieces, and deposition drops them in a new place.","Water, wind, ice, and gravity all shape Earth's surface."]},
        {title:"Plant and Animal Adaptations", body:["An adaptation is a trait or behavior that helps an organism survive. Thick fur, camouflage, and migration are examples.","Adaptations develop over many generations and match an organism's environment."]},
        {title:"Electric Circuits", body:["A circuit is a complete path through which electric current can flow. A simple circuit may include a battery, wires, and a bulb.","If the path is broken, the current stops and the bulb turns off."]},
        {title:"Waves", body:["Waves transfer energy from one place to another. Sound waves travel through matter, while light waves can travel through empty space.","Wavelength, amplitude, and frequency describe different features of waves."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"Exploration", body:["Explorers traveled for trade, land, wealth, religion, and knowledge. Their journeys connected distant regions.","Exploration also caused conflict, disease, and major changes for Indigenous peoples."]},
        {title:"Colonial Life", body:["Colonial communities developed different economies based on geography and resources.","Daily life included farming, trades, family work, and local government."]},
        {title:"American Revolution", body:["The American Revolution grew from disagreements about taxes, representation, and political rights.","Colonists and Britain fought over who had the authority to govern the colonies."]}
      ]}
    }
  },
  g5:{
    title:"Grade 5",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Text Evidence", body:["Text evidence is a detail from the passage that supports an answer. Strong evidence connects directly to the question.","When you make a claim about a text, choose a quote or detail that proves it."]},
        {title:"Theme and Summary", body:["Theme is the central message of a story, while a summary retells its most important events.","A strong reader explains how the events and characters support the theme."]},
        {title:"Compare and Contrast", body:["Comparing shows how two things are alike, while contrasting shows how they are different.","Writers may organize comparisons by subject or by individual features."]},
        {title:"Point of View", body:["Point of view affects what information the reader receives. A narrator may know everything or only one character's thoughts.","Readers should consider how the story would change if another character told it."]},
        {title:"Argument and Evidence", body:["An argument includes a claim supported by reasons and evidence.","Strong evidence is relevant, accurate, and clearly connected to the claim."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Decimals", body:["Decimals show parts of a whole using place value. Tenths, hundredths, and thousandths get smaller as you move right.","Line up decimal points before adding or subtracting decimals."]},
        {title:"Fraction Operations", body:["Fractions with unlike denominators must be rewritten with a common denominator before adding or subtracting.","Multiplying fractions involves multiplying numerators and denominators, then simplifying."]},
        {title:"Volume", body:["Volume measures the space inside a three-dimensional figure. Rectangular prism volume is length times width times height.","Volume is written in cubic units because it measures three dimensions."]},
        {title:"Coordinate Plane", body:["The coordinate plane uses an x-axis and y-axis to locate points. Ordered pairs are written as x first, then y.","Starting at the origin, move horizontally for x and vertically for y."]},
        {title:"Numerical Expressions", body:["Numerical expressions contain numbers and operation symbols. Parentheses and the order of operations tell which calculation comes first.","Careful grouping helps prevent errors when evaluating expressions."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Mixtures and Solutions", body:["A mixture combines materials that can often be separated. A solution is a mixture where one material dissolves in another.","Salt water is a solution because salt spreads evenly through the water."]},
        {title:"Matter and Properties", body:["Matter can be described by properties such as mass, volume, density, conductivity, and solubility.","Physical properties can be observed without changing the identity of a substance."]},
        {title:"Earth and Space", body:["Earth rotates once each day and revolves around the Sun once each year.","The Moon revolves around Earth, and its changing appearance is called the lunar phases."]},
        {title:"Human Body Systems", body:["Body systems work together to keep the body functioning. The respiratory system brings in oxygen, and the circulatory system carries it to cells.","The digestive system breaks down food so nutrients can enter the bloodstream."]},
        {title:"Ecosystem Changes", body:["Ecosystems change because of weather, natural disasters, human activity, and changes in populations.","Some organisms adapt, move, or die when their environment changes."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"The Constitution", body:["The Constitution created a federal government with legislative, executive, and judicial branches.","Checks and balances help prevent any one branch from becoming too powerful."]},
        {title:"Westward Expansion", body:["Westward expansion increased the size of the United States and created new opportunities for settlers.","It also displaced Native nations and caused conflict over land and resources."]},
        {title:"Civil War", body:["The Civil War was caused by deep disagreements over slavery, states' rights, and political power.","The war preserved the Union and led to the abolition of slavery through the Thirteenth Amendment."]}
      ]}
    }
  },
  g6:{
    title:"Grade 6",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Main Idea", body:["The main idea is what a passage is mostly about. It is the big point the author wants the reader to understand.","Supporting details are facts, examples, reasons, or descriptions that explain the main idea."]},
        {title:"Author's Purpose and Tone", body:["An author's purpose is the reason for writing, while tone is the attitude shown toward the topic.","Word choice, sentence structure, and selected details help reveal tone."]},
        {title:"Text Structure", body:["Writers organize ideas using structures such as cause and effect, compare and contrast, sequence, and problem and solution.","Recognizing structure helps readers locate important connections between ideas."]},
        {title:"Context and Connotation", body:["Context helps determine a word's meaning, while connotation refers to the feelings or ideas connected to a word.","Two words may have similar dictionary meanings but very different emotional effects."]},
        {title:"Central Idea and Evidence", body:["The central idea is the most important point in an informational text. It is developed through facts, examples, and explanations.","Readers should identify which details are essential and which are minor."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Fractions", body:["A fraction shows part of a whole. The numerator tells how many parts are counted, and the denominator tells how many equal parts are in the whole.","Fractions are used when sharing, measuring, comparing, and solving real-world problems."]},
        {title:"Ratios", body:["A ratio compares two quantities using division. Ratios can be written with words, a colon, or a fraction bar.","Equivalent ratios can be found by multiplying or dividing both quantities by the same number."]},
        {title:"Integers", body:["Integers include positive numbers, negative numbers, and zero. They can represent temperature, elevation, money, and direction.","On a number line, numbers farther right are greater."]},
        {title:"Expressions and Equations", body:["An expression represents a quantity, while an equation states that two expressions are equal.","Variables stand for unknown or changing values."]},
        {title:"Statistics", body:["Statistics uses data to answer questions. Measures such as mean, median, mode, and range describe a data set.","Graphs and tables make patterns and differences easier to see."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Ecosystems", body:["An ecosystem is made of living and nonliving things interacting in one area.","Producers make food, consumers eat other organisms, and decomposers break down dead material."]},
        {title:"Cells", body:["Cells are the basic units of life. Plant and animal cells share many structures, but plant cells also have cell walls and chloroplasts.","Organelles perform specific jobs that keep cells alive."]},
        {title:"Weather and Climate", body:["Weather describes short-term atmospheric conditions, while climate describes long-term patterns in a region.","Temperature, precipitation, wind, and air pressure are important measurements."]},
        {title:"Earth's Systems", body:["Earth's geosphere, hydrosphere, atmosphere, and biosphere interact continuously.","A change in one system can affect the others."]},
        {title:"Energy Transfer", body:["Energy can be transferred through conduction, convection, and radiation.","These processes explain how heat moves through solids, fluids, and empty space."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"Early Civilizations", body:["Early civilizations grew near rivers because water supported farming, transportation, and trade.","Governments, writing systems, religions, and social classes developed as cities expanded."]},
        {title:"Ancient Greece", body:["Ancient Greece influenced government, philosophy, art, mathematics, and literature.","City-states such as Athens and Sparta developed different political and social systems."]},
        {title:"Ancient Rome", body:["Rome changed from a republic into a large empire. Roman law, engineering, language, and government influenced later societies.","The empire weakened because of political conflict, economic problems, invasions, and division."]}
      ]}
    }
  },
  g7:{
    title:"Grade 7",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Theme and Evidence", body:["In Grade 7, readers connect theme to specific evidence. A theme is stronger when it can be supported by repeated choices, conflicts, and consequences.","Good analysis explains how evidence proves the idea instead of simply listing events from the text."]},
        {title:"Character and Conflict", body:["Characters are shaped by internal and external conflicts. Internal conflict happens within a character, while external conflict involves another person, society, nature, or technology.","Readers track how conflict influences decisions and changes."]},
        {title:"Argument Structure", body:["An argument includes a claim, reasons, evidence, and sometimes a counterclaim.","Strong readers evaluate whether the evidence is relevant, sufficient, and credible."]},
        {title:"Figurative Language", body:["Authors use imagery, metaphor, simile, symbolism, and personification to create layers of meaning.","The effect of figurative language depends on context, tone, and purpose."]},
        {title:"Text Connections", body:["Readers compare how two texts address the same topic or theme. They may differ in evidence, perspective, structure, or tone.","Comparing texts reveals how authors shape information for different audiences."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Ratios and Rates", body:["A ratio compares two quantities, while a rate compares quantities with different units. Unit rates make comparisons easier.","When reading a math explanation, watch for labels. The units often reveal what the numbers mean."]},
        {title:"Proportional Relationships", body:["A proportional relationship has a constant ratio between two quantities. It can be represented by a table, graph, or equation of the form y = kx.","The constant k is the unit rate and determines the steepness of the graph."]},
        {title:"Rational Numbers", body:["Rational numbers include integers, fractions, and terminating or repeating decimals.","Operations with rational numbers follow sign rules and the order of operations."]},
        {title:"Expressions and Equations", body:["Equivalent expressions have the same value for every possible variable value.","The distributive property and combining like terms help simplify expressions."]},
        {title:"Probability", body:["Probability measures how likely an event is to occur. It ranges from 0 for impossible events to 1 for certain events.","Experimental probability is based on trials, while theoretical probability is based on possible outcomes."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Cells and Systems", body:["Cells are the basic units of living things. In multicellular organisms, cells work together as tissues, organs, and systems.","Reading science text means tracking how small parts connect to larger systems."]},
        {title:"Genetics", body:["Genes are sections of DNA that influence traits. Organisms inherit one set of genetic information from each parent.","Genetic variation helps explain why individuals in a species are similar but not identical."]},
        {title:"Chemical Reactions", body:["A chemical reaction rearranges atoms to form new substances. Evidence may include color change, gas production, temperature change, or formation of a solid.","Mass is conserved because atoms are not created or destroyed."]},
        {title:"Plate Tectonics", body:["Earth's crust is broken into plates that move slowly over the mantle.","Plate movement causes earthquakes, volcanoes, mountain building, and seafloor spreading."]},
        {title:"Ecological Relationships", body:["Organisms interact through competition, predation, mutualism, commensalism, and parasitism.","These relationships affect population size and ecosystem stability."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"Primary Sources", body:["A primary source comes from the time being studied, such as a letter, diary, speech, map, or photograph.","Historians read primary sources by asking who made them, when they were made, and what viewpoint they show."]},
        {title:"The Middle Ages", body:["Medieval societies were shaped by feudalism, religion, agriculture, and local loyalties.","Trade, towns, and universities later helped transform European life."]},
        {title:"The Renaissance", body:["The Renaissance was a period of renewed interest in art, science, literature, and classical learning.","New ideas spread through printing, trade, and growing cities."]},
        {title:"The Reformation", body:["The Reformation challenged religious authority and created new Christian denominations.","Religious conflict also affected politics, education, and daily life."]},
        {title:"Global Exploration", body:["European exploration connected continents through trade, migration, conquest, and cultural exchange.","The Columbian Exchange moved plants, animals, diseases, and people across the Atlantic."]}
      ]}
    }
  },
  g8:{
    title:"Grade 8",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Claims and Reasons", body:["An argument includes a claim, reasons, and evidence. Strong readers separate what the author believes from how the author supports it.","A reason explains why a claim might be true; evidence gives facts or examples that support the reason."]},
        {title:"Counterclaims", body:["A counterclaim presents an opposing position. Strong arguments acknowledge counterclaims and respond with reasoning and evidence.","Refuting a counterclaim shows why the original claim remains stronger."]},
        {title:"Narrative Structure", body:["Narratives often follow exposition, rising action, climax, falling action, and resolution.","Authors may change the order through flashbacks, foreshadowing, or multiple perspectives."]},
        {title:"Rhetorical Appeals", body:["Writers use ethos to build credibility, pathos to appeal to emotion, and logos to use logic and evidence.","Effective arguments often combine all three appeals."]},
        {title:"Evaluating Sources", body:["Reliable sources identify authors, provide evidence, and distinguish facts from opinions.","Readers should check publication date, purpose, expertise, and supporting references."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Linear Relationships", body:["A linear relationship changes by a constant amount. Tables, graphs, and equations can all show this pattern.","The slope tells the rate of change, and the intercept often tells the starting amount."]},
        {title:"Systems of Equations", body:["A system of equations contains two or more equations with the same variables. The solution makes every equation true.","Systems can be solved by graphing, substitution, or elimination."]},
        {title:"Functions", body:["A function assigns exactly one output to each input. Functions can be represented with tables, graphs, equations, or mappings.","The vertical line test helps determine whether a graph represents a function."]},
        {title:"Transformations", body:["Translations, rotations, reflections, and dilations move or resize figures on a coordinate plane.","Rigid transformations preserve length and angle measure."]},
        {title:"Scientific Notation", body:["Scientific notation writes very large or very small numbers as a number from 1 to 10 multiplied by a power of ten.","Exponents show how many places the decimal point moves."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Forces and Motion", body:["Forces can change an object's speed, direction, or shape. A net force is the overall force after all pushes and pulls are combined.","Science passages often describe cause and effect, so look for what force caused which motion."]},
        {title:"Newton's Laws", body:["Newton's laws explain inertia, acceleration, and action-reaction force pairs.","Acceleration depends on both net force and mass."]},
        {title:"Waves and Electromagnetic Energy", body:["Waves transfer energy without permanently moving matter from one place to another.","The electromagnetic spectrum includes radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, and gamma rays."]},
        {title:"Atoms and the Periodic Table", body:["Atoms contain protons, neutrons, and electrons. The number of protons identifies the element.","The periodic table organizes elements by atomic number and repeating chemical properties."]},
        {title:"Earth and Space Systems", body:["Gravity controls the motion of planets, moons, and satellites. Stars produce energy through nuclear fusion.","Models help scientists explain patterns that occur across extremely large distances."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"Civic Ideas", body:["Civic history studies rights, responsibilities, laws, and government. These ideas shape how communities make decisions.","When reading civic documents, identify the problem being addressed and the solution being proposed."]},
        {title:"The Constitution", body:["The Constitution created a stronger federal system while dividing power among branches and between federal and state governments.","The Bill of Rights protects individual freedoms and limits government power."]},
        {title:"Industrialization", body:["Industrialization increased factory production, urban growth, and technological change.","It also created difficult working conditions, environmental problems, and new labor movements."]},
        {title:"Reform Movements", body:["Reformers worked to change education, labor, voting rights, slavery, prisons, and public health.","Social movements often combined moral arguments, political action, and public organizing."]},
        {title:"Reconstruction", body:["Reconstruction attempted to rebuild the South and define freedom after the Civil War.","New amendments expanded citizenship and voting rights, but discrimination and violence limited progress."]}
      ]}
    }
  },
  g9:{
    title:"Grade 9",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Literary Analysis", body:["Literary analysis explains how an author creates meaning through character, structure, imagery, and language.","A strong paragraph makes a claim, cites evidence, and explains how the evidence supports the claim."]},
        {title:"Epic and Heroic Traditions", body:["Epics often feature heroic journeys, supernatural challenges, cultural values, and large conflicts.","Readers examine how the hero's choices reflect the values of the society that created the story."]},
        {title:"Dramatic Structure", body:["Drama develops through dialogue, stage directions, conflict, and performance.","Soliloquies and asides reveal thoughts that other characters may not hear."]},
        {title:"Poetry Analysis", body:["Poetry uses sound, imagery, structure, and figurative language to create concentrated meaning.","Line breaks, rhythm, repetition, and form affect how a poem is read."]},
        {title:"Research and Synthesis", body:["Research synthesis combines information from multiple credible sources into a new explanation or argument.","Writers must cite sources and explain connections rather than merely list facts."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Algebra Models", body:["Algebra models use variables and equations to represent real situations. The variable should always be defined clearly.","After solving, reread the question to make sure the answer fits the situation and units."]},
        {title:"Linear Equations", body:["Linear equations represent relationships with a constant rate of change.","Solutions can be found using inverse operations while preserving equality on both sides."]},
        {title:"Quadratic Functions", body:["Quadratic functions create parabolic graphs. Their equations often include a squared variable.","The vertex, axis of symmetry, and intercepts describe important features of the graph."]},
        {title:"Exponents", body:["Exponent rules simplify repeated multiplication involving powers with the same base.","Negative exponents represent reciprocals, while zero exponents equal one for nonzero bases."]},
        {title:"Data and Regression", body:["Scatter plots show relationships between two quantitative variables. A trend line can model the overall pattern.","Correlation describes association but does not automatically prove causation."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Biology Evidence", body:["Biology texts often use evidence from cells, DNA, organisms, or ecosystems to explain living systems.","Look for data, diagrams, and cause-effect explanations that connect structure to function."]},
        {title:"Cellular Respiration", body:["Cellular respiration releases usable energy from glucose. In many organisms, it occurs mainly in mitochondria.","The process uses oxygen and produces carbon dioxide, water, and ATP."]},
        {title:"Photosynthesis", body:["Photosynthesis captures light energy to build glucose from carbon dioxide and water.","Chloroplasts contain pigments that absorb light, and oxygen is released as a product."]},
        {title:"Evolution", body:["Evolution is change in inherited traits within populations over generations.","Natural selection favors traits that improve survival and reproduction in a particular environment."]},
        {title:"Ecology and Population Change", body:["Population size changes because of births, deaths, immigration, and emigration.","Limiting factors such as food, water, disease, and space affect carrying capacity."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"Historical Context", body:["Historical context is the background around an event: time, place, beliefs, economics, and conflicts.","Understanding context helps readers avoid judging the past only by today's assumptions."]},
        {title:"Revolutions", body:["Political revolutions often grow from inequality, economic crisis, new ideas, and weak leadership.","Revolutions can expand rights while also producing conflict, instability, and violence."]},
        {title:"Imperialism", body:["Imperialism occurs when powerful nations control other territories politically, economically, or militarily.","Imperial rule changed borders, economies, cultures, and resistance movements."]},
        {title:"World War I", body:["World War I grew from militarism, alliances, imperial rivalry, and nationalism.","Trench warfare, new technology, and total war caused enormous destruction."]},
        {title:"Interwar Period", body:["The years between the world wars included economic crisis, political extremism, social change, and fragile international cooperation.","These conditions contributed to the rise of authoritarian governments."]}
      ]}
    }
  },
  g10:{
    title:"Grade 10",
    subjects:{
      eng:{ title:"English", topics:[
        {title:"Rhetorical Analysis", body:["Rhetorical analysis studies how a writer persuades an audience. Ethos builds credibility, pathos appeals to emotion, and logos uses logic.","A strong reader explains why a strategy works for a particular audience and purpose."]},
        {title:"Satire", body:["Satire uses humor, irony, exaggeration, or ridicule to criticize people, institutions, or ideas.","Readers must identify both the surface humor and the deeper target of criticism."]},
        {title:"Allegory", body:["An allegory tells one story while representing a broader political, moral, or social meaning.","Characters, settings, and events often symbolize larger ideas."]},
        {title:"Comparative Literature", body:["Comparative analysis studies how two texts treat similar themes, conflicts, or historical experiences.","Strong comparisons explain meaningful similarities and differences in technique and purpose."]},
        {title:"Style and Diction", body:["Diction is an author's word choice, while style includes sentence structure, tone, imagery, and organization.","Formal, informal, technical, and poetic diction create different effects."]}
      ]},
      math:{ title:"Math", topics:[
        {title:"Geometry Reasoning", body:["Geometry reading often depends on definitions, diagrams, and logical steps. Pay attention to given information and what must be proven.","Proofs work like arguments: each step needs a reason that connects it to the conclusion."]},
        {title:"Congruence and Similarity", body:["Congruent figures have the same shape and size, while similar figures have the same shape but may differ in size.","Transformations and proportional reasoning help establish congruence or similarity."]},
        {title:"Trigonometry", body:["Right-triangle trigonometry relates angles to side lengths using sine, cosine, and tangent.","These ratios can be used to find missing sides or angles."]},
        {title:"Circles", body:["Circle relationships involve radius, diameter, circumference, arcs, chords, and central angles.","Many circle formulas depend on pi and proportional reasoning."]},
        {title:"Probability Models", body:["Probability models describe possible outcomes and their likelihoods. Compound events combine two or more events.","Tree diagrams, tables, and formulas help organize outcomes."]}
      ]},
      sci:{ title:"Science", topics:[
        {title:"Chemistry Systems", body:["Chemistry explains matter by studying atoms, bonds, reactions, and energy. Small particle changes can explain large visible changes.","When reading chemistry, connect symbols and equations to what happens to particles."]},
        {title:"Atomic Structure", body:["Atoms contain a dense nucleus of protons and neutrons surrounded by electrons in energy levels.","Isotopes have the same number of protons but different numbers of neutrons."]},
        {title:"Chemical Bonding", body:["Ionic bonds form through electron transfer, while covalent bonds form through electron sharing.","Bond type influences properties such as melting point, conductivity, and solubility."]},
        {title:"Chemical Reactions", body:["Balanced chemical equations show that atoms are conserved during reactions.","Reaction types include synthesis, decomposition, replacement, combustion, and acid-base reactions."]},
        {title:"Stoichiometry", body:["Stoichiometry uses balanced equations and mole ratios to calculate amounts of reactants and products.","Units and conversion factors must be tracked carefully to avoid errors."]}
      ]},
      hist:{ title:"History", topics:[
        {title:"Cause and Consequence", body:["Major historical events usually have multiple causes and consequences. Some causes are immediate, while others build over time.","Careful readers separate short-term effects from long-term changes."]},
        {title:"World War II", body:["World War II grew from unresolved tensions, aggressive expansion, dictatorship, and failures of diplomacy.","The war transformed global politics and caused unprecedented military and civilian destruction."]},
        {title:"The Cold War", body:["The Cold War was a global rivalry between the United States and the Soviet Union.","Competition occurred through alliances, arms races, proxy wars, technology, and ideology."]},
        {title:"Decolonization", body:["After World War II, many colonies gained independence through negotiation, protest, or armed struggle.","New nations faced challenges involving borders, economic dependence, identity, and political stability."]},
        {title:"Globalization", body:["Globalization increases connections through trade, technology, migration, culture, and communication.","It creates opportunities while also raising questions about inequality, labor, environment, and national sovereignty."]}
      ]}
    }
  }
}

function readingButton(label, action){
  const b = document.createElement("button");
  b.type = "button";
  b.className = "btn btn-main";
  b.textContent = label;
  b.onclick = action;
  return b;
}

function renderReadingHome(){
  const panel = $("readingPanel");
  if(!panel) return;
  const gradeIds = Object.keys(READING_LIBRARY);
  const topicCount = gradeIds.reduce((total, gradeId)=>{
    const subjects = READING_LIBRARY[gradeId]?.subjects || {};
    return total + Object.values(subjects).reduce((sum, subject)=>sum + (subject.topics?.length || 0), 0);
  }, 0);
  panel.innerHTML = `
    <section class="reading-home-hero">
      <div class="reading-home-copy">
        <span class="reading-eyebrow">Build a daily reading habit</span>
        <h2>Find your next great lesson</h2>
        <p>Explore clear, age-ready passages across language arts, math, science, and history. Listen aloud or read at your own pace.</p>
        <div class="reading-home-stats">
          <span><strong>${gradeIds.length}</strong> grade levels</span>
          <span><strong>${topicCount}</strong> reading topics</span>
          <span><strong>${ensureStats().readingMinutes}</strong> minutes logged</span>
        </div>
      </div>
      <div class="reading-book-stack" aria-hidden="true"><span>ABC</span><span>123</span><span>SCI</span></div>
    </section>
    <div class="reading-section-heading">
      <div><span class="reading-eyebrow">Browse the library</span><h3>Choose your grade</h3></div>
      <p>Pick a level, then choose a subject and passage.</p>
    </div>
    <div class="reading-grid" id="readingGrid"></div>
  `;
  const grid = $("readingGrid");
  gradeIds.forEach((gradeId, index)=>{
    const grade = READING_LIBRARY[gradeId];
    const subjectCount = Object.keys(grade.subjects || {}).length;
    const gradeTopicCount = Object.values(grade.subjects || {}).reduce((sum, subject)=>sum + (subject.topics?.length || 0), 0);
    const card = document.createElement("div");
    card.className = `reading-card reading-grade-card reading-grade-${(index % 4) + 1}`;
    card.innerHTML = `<div class="reading-grade-number">${htmlSafe(String(index + 1).padStart(2,"0"))}</div><div class="reading-card-icon" aria-hidden="true">${["📘","📗","📙","📕"][index % 4]}</div><h3>${htmlSafe(grade.title)}</h3><p>${subjectCount} subjects · ${gradeTopicCount} topics</p>`;
    const openButton = readingButton("Explore reading", ()=>renderReadingGrade(gradeId));
    openButton.classList.add("reading-open-btn");
    card.appendChild(openButton);
    grid.appendChild(card);
  });
}

function renderReadingGrade(gradeId){
  const grade = READING_LIBRARY[gradeId];
  const panel = $("readingPanel");
  if(!grade || !panel) return;
  panel.innerHTML = `
    <h2 class="text-center">${htmlSafe(grade.title)} Reading</h2>
    <p class="small-note text-center">Choose a subject.</p>
    <div class="reading-grid" id="readingGrid"></div>
    <div class="lesson-back-row"><button type="button" class="btn btn-main" id="readingBackBtn">Back</button></div>
  `;
  const grid = $("readingGrid");
  Object.keys(grade.subjects).forEach(subjId=>{
    const subj = grade.subjects[subjId];
    const card = document.createElement("div");
    card.className = "reading-card";
    card.innerHTML = `<h3>${htmlSafe(subj.title)}</h3><p>${subj.topics.length} topic${subj.topics.length === 1 ? "" : "s"}</p>`;
    card.appendChild(readingButton("Open", ()=>renderReadingSubject(gradeId, subjId)));
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
    <h2 class="text-center">${htmlSafe(grade.title)} ${htmlSafe(subj.title)}</h2>
    <p class="small-note text-center">Choose a reading passage.</p>
    <div class="reading-grid" id="readingGrid"></div>
    <div class="lesson-back-row"><button type="button" class="btn btn-main" id="readingBackBtn">Back</button></div>
  `;
  const grid = $("readingGrid");
  subj.topics.forEach((topic, index)=>{
    const card = document.createElement("div");
    card.className = "reading-card";
    card.innerHTML = `<h3>${htmlSafe(topic.title)}</h3><p>${htmlSafe(topic.body[0]).slice(0, 110)}...</p>`;
    card.appendChild(readingButton("Read", ()=>renderReadingTopic(gradeId, subjId, index)));
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
    <h2 class="text-center">${htmlSafe(topic.title)}</h2>
    <div class="reading-passage">
      ${topic.body.map(p=>`<p>${htmlSafe(p)}</p>`).join("")}
    </div>
    <div class="reading-voice-row">
      <button type="button" class="btn btn-main" id="readingSpeakBtn">Read aloud</button>
      <button type="button" class="btn btn-main" id="readingStopBtn">Stop voice</button>
    </div>
    <div class="lesson-back-row"><button type="button" class="btn btn-main" id="readingBackBtn">Back</button></div>
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
    <div class="settings-head settings-hero">
      <div>
        <span class="settings-eyebrow">Personal learning space</span>
        <h1>Settings</h1>
        <p>Shape the profile, goals, sound, and look of the active learner’s experience.</p>
      </div>
      <div class="settings-learner-summary">
        <div class="avatar avatar-preview-lg" id="settingsAvatarPreview">${htmlSafe(avatar)}</div>
        <div><span>Active learner</span><strong>${htmlSafe(name || "Learner")}</strong></div>
      </div>
    </div>

    <div class="settings-summary-strip">
      <div><span>Plan</span><strong>${htmlSafe(planLabel)}</strong></div>
      <div><span>Lessons</span><strong>${stats.lessonsCompleted}</strong></div>
      <div><span>Reading</span><strong>${stats.readingMinutes} min</strong></div>
      <div><span>Streak</span><strong>${stats.lessonStreak || 0} days</strong></div>
    </div>

    <div class="settings-grid">
      <div class="settings-block settings-profile-block">
        <div class="settings-block-title"><span>01</span><div><h3>Profile</h3><p>Your learner’s name, avatar, and goals.</p></div></div>
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
      </div>

      <div class="settings-block settings-learning-block">
        <div class="settings-block-title"><span>02</span><div><h3>Learning</h3><p>Sound, practice, and rewards.</p></div></div>
        <button type="button" class="btn btn-main" onclick="toggleVoice()" id="settingsVoiceBtn">${voiceOn ? "Voice: On" : "Voice: Off"}</button>
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
        <div class="settings-block-title"><span>03</span><div><h3>Theme</h3><p>Make the space feel like yours.</p></div></div>
        <p class="small-note">Choose the color style for this website.</p>
        <div class="theme-choice-grid" id="themeChoices"></div>
      </div>

      <div class="settings-block settings-account-block">
        <div class="settings-block-title"><span>04</span><div><h3>Account</h3><p>Plan and learner management.</p></div></div>
        <p class="small-note">Learners: ${learnerTotal} / ${MAX_KIDS_PER_ACCOUNT}</p>
        <p class="small-note">Active plan: ${htmlSafe(planLabel)}</p>
        <p class="small-note">Reading minutes: ${stats.readingMinutes}</p>
        <p class="small-note">Lessons finished: ${stats.lessonsCompleted}</p>
        <p class="small-note">Lesson streak: ${stats.lessonStreak || 0} day${(stats.lessonStreak || 0) === 1 ? "" : "s"}</p>
        <button type="button" class="btn btn-main" onclick="accountUnlock('addKid')" ${learnerTotal >= MAX_KIDS_PER_ACCOUNT ? "disabled" : ""}>Add learner ($5)</button>
        <button type="button" class="btn btn-main" onclick="show('analysis')">Open analysis</button>
      </div>

      <div class="settings-block settings-delete-block">
        <div class="settings-block-title"><span>!</span><div><h3>Delete user</h3><p>Permanent learner controls.</p></div></div>
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
  toast("Settings saved.");
}

function setAvatarColor(colorId){
  updateActiveKidProfile({ avatarColor: colorId });
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
  toast("Avatar updated.");
}

function useTypedAvatarText(){
  const avatar = ($("settingsAvatarText")?.value || "").trim().slice(0,2).toUpperCase();
  if(!avatar){ toast("Type an avatar first."); return; }
  updateActiveKidProfile({ avatar, avatarImage:"" });
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
  const correctShare = attempts ? Math.round((stats.correct / attempts) * 100) : 0;
  const wrongShare = attempts ? 100 - correctShare : 0;
  const lessonGoal = Math.max(1, Number(kid?.dailyLessonGoal || 3));
  const readingGoal = Math.max(1, Number(kid?.readingGoal || 20));
  const lessonGoalProgress = Math.min(100, Math.round((stats.lessonsCompleted / lessonGoal) * 100));
  const readingGoalProgress = Math.min(100, Math.round((stats.readingMinutes / readingGoal) * 100));
  const nextGoal = state.points >= 20
    ? "Ready to convert 20 points into 5 Learners."
    : `${pointsToConvert} more point${pointsToConvert === 1 ? "" : "s"} until the next conversion.`;
  panel.innerHTML = `
    <div class="analysis-head">
      <div>
        <h1>Progress Analysis</h1>
        <p class="small-note">A quick snapshot for the active learner.</p>
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

    <div class="analysis-charts">
      <section class="analysis-chart-card accuracy-chart-card">
        <div class="chart-title"><div><span>Answer performance</span><h3>Accuracy split</h3></div><strong>${accuracy}%</strong></div>
        <div class="donut-chart-wrap">
          <div class="donut-chart" style="--chart-value:${accuracy}"><div><strong>${attempts}</strong><span>attempts</span></div></div>
          <div class="chart-legend">
            <div><i class="legend-dot correct-dot"></i><span>Correct</span><strong>${stats.correct}</strong></div>
            <div><i class="legend-dot wrong-dot"></i><span>Try again</span><strong>${stats.wrong}</strong></div>
          </div>
        </div>
      </section>

      <section class="analysis-chart-card response-chart-card">
        <div class="chart-title"><div><span>Response mix</span><h3>Correct vs. try again</h3></div></div>
        <div class="bar-chart" role="img" aria-label="${stats.correct} correct answers and ${stats.wrong} try-again answers">
          <div class="bar-column"><div class="bar-track-vertical"><div class="bar-fill correct-bar" style="height:${correctShare}%"></div></div><strong>${stats.correct}</strong><span>Correct</span></div>
          <div class="bar-column"><div class="bar-track-vertical"><div class="bar-fill wrong-bar" style="height:${wrongShare}%"></div></div><strong>${stats.wrong}</strong><span>Try again</span></div>
        </div>
      </section>

      <section class="analysis-chart-card goals-chart-card">
        <div class="chart-title"><div><span>Goal progress</span><h3>Learning targets</h3></div></div>
        <div class="goal-chart-row"><div><strong>Lessons completed</strong><span>${stats.lessonsCompleted} / ${lessonGoal}</span></div><div class="goal-chart-track"><i style="width:${lessonGoalProgress}%"></i></div></div>
        <div class="goal-chart-row"><div><strong>Reading minutes</strong><span>${stats.readingMinutes} / ${readingGoal}</span></div><div class="goal-chart-track"><i style="width:${readingGoalProgress}%"></i></div></div>
        <div class="goal-chart-row"><div><strong>Points conversion</strong><span>${Math.min(state.points,20)} / 20</span></div><div class="goal-chart-track"><i style="width:${Math.min(100,(state.points/20)*100)}%"></i></div></div>
      </section>
    </div>
  `;
}

/* ===========================
   Scoring rules
=========================== */
function correctReward(msg="Correct!"){
  safePlay($("correct"));
  addPoints(+2);
  recordLearningStat("correct");
  if(Math.random() < 0.2) launchConfetti(45);
  speakGlobal(msg);
}
function wrongPenalty(msg="Try again!"){
  safePlay($("wrong"));
  recordLearningStat("wrong");
  addPoints(-1);
  speakGlobal(msg);
}
