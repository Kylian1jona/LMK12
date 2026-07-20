/* ===========================
   Pre-K: Emoji Addition
=========================== */
const PKA_EMOJIS = ["🍎","🍌","🍒","⭐","🧸","🚗","🧡","🎁","🟠","🍉"];
let pkaQ = 1, pkaCorrect = 0, pkaScore = 0;
const PKA_TOTAL = 20;

function setChoiceButtons(prefix, choices){
  choices.forEach((choice, index)=>{
    const btn = $(prefix + index);
    if(btn) btn.textContent = typeof answerOptionLabel === "function" ? answerOptionLabel(choice) : choice;
  });
}

function padTextChoices(choices, fillers){
  const out = [...choices];
  fillers.forEach(filler=>{
    if(out.length < 4 && !out.includes(filler)) out.push(filler);
  });
  return out.slice(0,4).sort(()=>Math.random()-0.5);
}

function speakQuestionWithChoices(question, choices){
  speakGlobal(`${question} Choices: ${choices.join(", ")}.`);
}

function pkaGen(){
  $("pkaReport").classList.add("d-none");
  $("pkaNextBtn").disabled = true;
  $("pkaFb").textContent = "";

  const a = randInt(1,5);
  const b = randInt(1,5);
  pkaCorrect = a+b;

  const e = PKA_EMOJIS[Math.floor(Math.random()*PKA_EMOJIS.length)];
  $("pkaObj1").innerHTML = e.repeat(a);
  $("pkaObj2").innerHTML = e.repeat(b);
  $("pkaQ").textContent = `${a} + ${b} = ?`;
  $("pkaProg").textContent = `Exercise ${pkaQ} of ${PKA_TOTAL}`;

  const arr = make3Choices(pkaCorrect, 1, 12);
  setChoiceButtons("pka", arr);

  speakQuestionWithChoices(`What is ${a} plus ${b}?`, arr);
}
function pkaAnswer(i){
  safeClick();
  const chosen = Number($("pka"+i).textContent);
  if(chosen === pkaCorrect){
    pkaScore++;
    $("pkaFb").textContent = "🎉 Correct!";
    correctReward("Correct!");
    $("pkaNextBtn").disabled = false;
  }else{
    $("pkaFb").textContent = "❌ Try again";
    const msg = `Not quite. The correct answer is ${pkaCorrect}. Count both groups together.`;
    $("pkaFb").textContent = msg;
    wrongPenalty(msg);
  }
}
function pkaNext(){
  safeClick();
  if($("pkaNextBtn").disabled) return;
  if(pkaQ < PKA_TOTAL){ pkaQ++; pkaGen(); }
  else pkaFinish();
}
function pkaFinish(){
  $("pkaReport").classList.remove("d-none");
  $("pkaScoreLine").textContent = `You got ${pkaScore} out of ${PKA_TOTAL}!`;
  const stars = clamp(Math.round((pkaScore/PKA_TOTAL)*5), 1, 5);
  $("pkaStars").textContent = "⭐".repeat(stars);
  launchConfetti(220);
  speakGlobal("Great job!");
}
function pkaRestart(){ safeClick(); pkaQ = 1; pkaScore = 0; pkaGen(); }

/* ===========================
   Pre-K: Counting
=========================== */
const PKC_PICS = ["🍎","⭐","🧸","🟠","🚗","🐶","🍌","🎁","🍉","🦁","🐱","🐸"];
let pkcRound = 1, pkcAnswer = 0;
const PKC_TOTAL = 10;

function pkcGen(){
  $("pkcReward").classList.add("d-none");
  $("pkcFb").textContent = "";
  $("pkcNextBtn").disabled = true;

  pkcAnswer = randInt(1,20);
  const em = PKC_PICS[Math.floor(Math.random()*PKC_PICS.length)];
  $("pkcObjs").textContent = em.repeat(pkcAnswer);
  $("pkcProg").textContent = `Round ${pkcRound} of ${PKC_TOTAL}`;

  const choices = make3Choices(pkcAnswer, 1, 20);
  setChoiceButtons("pkc", choices);

  speakQuestionWithChoices("Count the pictures. How many do you see?", choices);
}
function pkcPick(i){
  safeClick();
  const chosen = Number($("pkc"+i).textContent);
  if(chosen === pkcAnswer){
    $("pkcFb").textContent = "🎉 Correct!";
    correctReward("Correct!");
    $("pkcNextBtn").disabled = false;
  }else{
    $("pkcFb").textContent = "❌ Try again!";
    const msg = `Not quite. There are ${pkcAnswer} pictures. Count each picture one time.`;
    $("pkcFb").textContent = msg;
    wrongPenalty(msg);
  }
}
function pkcNext(){
  safeClick();
  if($("pkcNextBtn").disabled) return;
  if(pkcRound < PKC_TOTAL){ pkcRound++; pkcGen(); }
  else pkcFinish();
}
function pkcFinish(){
  safePlay($("rewardSfx"));
  $("pkcReward").classList.remove("d-none");
  $("pkcStars").textContent = "⭐".repeat(5);
  $("pkcSummary").textContent = `Nice counting! Keep earning ⭐ points and convert to 💎 Learners.`;
  launchConfetti(180);
  speakGlobal("Amazing counting!");
}
function pkcReset(){ safeClick(); pkcRound = 1; pkcGen(); }

/* ===========================
   Pre-K: Shapes
=========================== */
const SHAPES = [
  {name:"CIRCLE", emoji:"🔴"},
  {name:"SQUARE", emoji:"🟥"},
  {name:"TRIANGLE", emoji:"🔺"}
];
const EXTRA_SHAPE = {name:"DIAMOND", emoji:"◆"};
let pksRound = 1;
const PKS_TOTAL = 10;
let pksCorrectEmoji = "";
let pksCorrectName = "";

function pksGen(){
  $("pksDone").classList.add("d-none");
  $("pksFb").textContent = "";
  $("pksNextBtn").disabled = true;
  $("pksProg").textContent = `Round ${pksRound} of ${PKS_TOTAL}`;

  const target = SHAPES[randInt(0, SHAPES.length-1)];
  $("pksQ").textContent = `Tap the ${target.name}`;
  pksCorrectEmoji = target.emoji;
  pksCorrectName = target.name;

  const opts = [...SHAPES, EXTRA_SHAPE].sort(()=>Math.random()-0.5);
  ["pks0","pks1","pks2","pks3"].forEach((id, idx)=>{
    $(id).textContent = opts[idx].emoji;
    $(id).dataset.correct = (opts[idx].emoji === pksCorrectEmoji) ? "1" : "0";
  });

  speakQuestionWithChoices(`Tap the ${target.name.toLowerCase()}.`, opts.map(item=>item.name.toLowerCase()));
}
function pksPick(i){
  safeClick();
  const btn = $("pks"+i);
  const isCorrect = btn.dataset.correct === "1";
  if(isCorrect){
    $("pksFb").textContent = "🎉 Correct!";
    correctReward("Correct!");
    $("pksNextBtn").disabled = false;
  }else{
    $("pksFb").textContent = "❌ Try again!";
    const msg = `Not quite. Look for the ${pksCorrectName.toLowerCase()}.`;
    $("pksFb").textContent = msg;
    wrongPenalty(msg);
  }
}
function pksNext(){
  safeClick();
  if($("pksNextBtn").disabled) return;
  if(pksRound < PKS_TOTAL){ pksRound++; pksGen(); }
  else{
    $("pksDone").classList.remove("d-none");
    $("pksStars").textContent = "⭐".repeat(5);
    launchConfetti(170);
    speakGlobal("Great shapes!");
  }
}
function pksReset(){ safeClick(); pksRound = 1; pksGen(); }

/* ===========================
   Kindergarten lessons (3)
=========================== */
const SYLLABLE_WORDS = [
  {word:"banana", syl:["ba","na","na"], count:3, pic:"🍌"},
  {word:"pizza", syl:["pi","zza"], count:2, pic:"🍕"},
  {word:"pencil", syl:["pen","cil"], count:2, pic:"✏️"},
  {word:"rainbow", syl:["rain","bow"], count:2, pic:"🌈"},
  {word:"monkey", syl:["mon","key"], count:2, pic:"🐵"},
  {word:"tiger", syl:["ti","ger"], count:2, pic:"🐯"},
  {word:"apple", syl:["ap","ple"], count:2, pic:"🍎"},
  {word:"cookie", syl:["coo","kie"], count:2, pic:"🍪"},
  {word:"elephant", syl:["el","e","phant"], count:3, pic:"🐘"},
  {word:"computer", syl:["com","pu","ter"], count:3, pic:"💻"},
  {word:"music", syl:["mu","sic"], count:2, pic:"🎵"},
  {word:"sunshine", syl:["sun","shine"], count:2, pic:"🌞"},
];
let kscIdx = 0, kscRound = 1;
const KSC_TOTAL = 12;

function kscLoad(){
  const item = SYLLABLE_WORDS[kscIdx % SYLLABLE_WORDS.length];
  $("kscPic").textContent = item.pic;
  $("kscWord").textContent = item.word.toUpperCase();
  $("kscFb").textContent = "";
  $("kscProg").textContent = `Round ${kscRound} of ${KSC_TOTAL}`;
  $("kscNextBtn").disabled = true;
  $("kscWord").onclick = () => { safeClick(); speakGlobal(item.word); };
  speakQuestionWithChoices(`How many syllables in ${item.word}?`, ["1", "2", "3", "4"]);
}
function kscPick(n){
  safeClick();
  const item = SYLLABLE_WORDS[kscIdx % SYLLABLE_WORDS.length];
  if(n === item.count){
    $("kscFb").textContent = "🎉 Correct!";
    correctReward("Great job!");
    $("kscNextBtn").disabled = false;
  }else{
    $("kscFb").textContent = "❌ Try again!";
    const msg = `Not quite. ${item.word} has ${item.count} syllables. Clap each part of the word.`;
    $("kscFb").textContent = msg;
    wrongPenalty(msg);
  }
}
function kscNext(){
  safeClick();
  if($("kscNextBtn").disabled) return;
  if(kscRound < KSC_TOTAL){ kscRound++; kscIdx = (kscIdx + 1) % SYLLABLE_WORDS.length; kscLoad(); }
  else{ safePlay($("rewardSfx")); toast("Finished!"); launchConfetti(160); speakGlobal("Awesome syllables!"); kscRound = 1; kscIdx = 0; kscLoad(); }
}
function kscReset(){ safeClick(); kscRound = 1; kscIdx = 0; kscLoad(); }

/* Build the Word */
let ksbIdx = 8, ksbRound = 1;
const KSB_TOTAL = 10;
let ksbBuild = [];

function ksbLoad(){
  const item = SYLLABLE_WORDS[ksbIdx % SYLLABLE_WORDS.length];
  $("ksbPic").textContent = item.pic;
  $("ksbWord").textContent = item.word.toUpperCase();
  $("ksbProg").textContent = `Round ${ksbRound} of ${KSB_TOTAL}`;
  $("ksbFb").textContent = "";
  $("ksbBuild").textContent = "";
  $("ksbNextBtn").disabled = true;
  ksbBuild = [];

  const tiles = [...item.syl].sort(()=>Math.random()-0.5);
  const wrap = $("ksbTiles");
  wrap.innerHTML = "";
  tiles.forEach(s=>{
    const b = document.createElement("button");
    b.type = "button";
    b.className = "btn btn-main";
    b.style.borderRadius = "14px";
    b.style.fontSize = "22px";
    b.textContent = s.toUpperCase();
    b.onclick = () => {
      safeClick();
      ksbBuild.push(s);
      $("ksbBuild").textContent = ksbBuild.map(x=>x.toUpperCase()).join(" - ");
      speakGlobal(s);
    };
    wrap.appendChild(b);
  });

  speakGlobal("Build the word using syllables.");
}
function ksbClear(){ safeClick(); ksbBuild = []; $("ksbBuild").textContent = ""; $("ksbFb").textContent = ""; }
function ksbCheck(){
  safeClick();
  const item = SYLLABLE_WORDS[ksbIdx % SYLLABLE_WORDS.length];
  if(ksbBuild.length !== item.syl.length){ $("ksbFb").textContent = "Tap all syllables first!"; speakGlobal("Tap all syllables first."); return; }
  const ok = item.syl.join("|") === ksbBuild.join("|");
  if(ok){
    $("ksbFb").textContent = "🎉 Correct!";
    correctReward("Great job!");
    $("ksbNextBtn").disabled = false;
    speakGlobal(item.word);
    launchConfetti(90);
  }else{
    $("ksbFb").textContent = "❌ Not yet! Try again";
    const msg = `Not quite. Build ${item.word} in this order: ${item.syl.join(", ")}.`;
    $("ksbFb").textContent = msg;
    wrongPenalty(msg);
  }
}
function ksbNext(){
  safeClick();
  if($("ksbNextBtn").disabled) return;
  if(ksbRound < KSB_TOTAL){ ksbRound++; ksbIdx = (ksbIdx + 1) % SYLLABLE_WORDS.length; ksbLoad(); }
  else{ safePlay($("rewardSfx")); toast("Finished!"); launchConfetti(170); speakGlobal("Amazing building words!"); ksbRound = 1; ksbIdx = 8; ksbLoad(); }
}
function ksbReset(){ safeClick(); ksbRound = 1; ksbIdx = 8; ksbLoad(); }

/* Rhymes */
const RHYMES = [
  {word:"cat", pic:"🐱", good:"hat", bad:["dog","sun"]},
  {word:"ball", pic:"⚽", good:"tall", bad:["fish","cup"]},
  {word:"cake", pic:"🎂", good:"snake", bad:["tree","sock"]},
  {word:"star", pic:"⭐", good:"car", bad:["book","moon"]},
  {word:"fish", pic:"🐟", good:"dish", bad:["rain","shoe"]},
  {word:"bed", pic:"🛏️", good:"red", bad:["blue","toy"]},
  {word:"frog", pic:"🐸", good:"log", bad:["map","pen"]},
  {word:"boat", pic:"⛵", good:"goat", bad:["ring","cake"]},
  {word:"kite", pic:"🪁", good:"night", bad:["day","sun"]},
  {word:"tree", pic:"🌳", good:"bee", bad:["cat","car"]},
  {word:"sock", pic:"🧦", good:"rock", bad:["hat","bed"]},
  {word:"moon", pic:"🌙", good:"spoon", bad:["ball","frog"]},
];
let krRound = 1, krIdx = 0;
const KR_TOTAL = 12;
let krCorrect = "";
let krChoices = [];

function krGen(){
  $("krFb").textContent = "";
  $("krNextBtn").disabled = true;
  $("krProg").textContent = `Round ${krRound} of ${KR_TOTAL}`;

  const item = RHYMES[krIdx % RHYMES.length];
  $("krPic").textContent = item.pic;
  $("krWord").textContent = item.word.toUpperCase();

  krCorrect = item.good.toUpperCase();
  const opts = padTextChoices([item.good, ...item.bad].map(x=>x.toUpperCase()), ["MAP", "PEN", "TOY", "SUN", "BOOK"]);
  krChoices = opts;
  setChoiceButtons("kr", opts);

  speakQuestionWithChoices(`Pick the word that rhymes with ${item.word}.`, opts);
}
function krPick(i){
  safeClick();
  const item = RHYMES[krIdx % RHYMES.length];
  const chosen = $("kr"+i).textContent;
  if(chosen === krCorrect){
    $("krFb").textContent = "🎉 Correct!";
    correctReward("Nice rhyming!");
    $("krNextBtn").disabled = false;
  }else{
    $("krFb").textContent = "❌ Try again!";
    const msg = `Not quite. ${krCorrect} rhymes with ${item.word}. Listen for the ending sound.`;
    $("krFb").textContent = msg;
    wrongPenalty(msg);
  }
}
function krNext(){
  safeClick();
  if($("krNextBtn").disabled) return;
  if(krRound < KR_TOTAL){ krRound++; krIdx++; krGen(); }
  else{ safePlay($("rewardSfx")); toast("Finished!"); launchConfetti(180); speakGlobal("Great rhyming!"); krRound = 1; krIdx = 0; krGen(); }
}
function krReset(){ safeClick(); krRound = 1; krIdx = 0; krGen(); }

/* ===========================
   Grade 1 lessons (3)
=========================== */
let g1asRound = 1;
const G1AS_TOTAL = 15;
let g1asA=0,g1asB=0,g1asOp="+";
let g1asSolved=false;

function g1asGen(){
  $("g1asFb").textContent = "";
  $("g1asNextBtn").disabled = true;
  g1asSolved = false;
  $("g1asInput").value = "";
  $("g1asProg").textContent = `Round ${g1asRound} of ${G1AS_TOTAL}`;

  const threeDigit = Math.random() < 0.55;
  const min = threeDigit ? 100 : 10;
  const max = threeDigit ? 299 : 99;
  g1asOp = Math.random() < 0.5 ? "+" : "−";

  if(g1asOp === "+"){
    g1asA = randInt(min, max);
    g1asB = randInt(10, threeDigit ? 199 : 99);
  }else{
    g1asA = randInt(min, max);
    g1asB = randInt(10, Math.min(g1asA, threeDigit ? 199 : 99));
    if(g1asB > g1asA) [g1asA,g1asB] = [g1asB,g1asA];
  }

  $("g1asA").textContent = g1asA;
  $("g1asB").textContent = g1asB;
  $("g1asOp").textContent = " " + g1asOp + " ";
  $("g1asBlocks").innerHTML = renderBlocks(g1asA) + "<br>" + renderBlocks(g1asB);
  g1asSpeak();
}
function renderBlocks(n){
  const h = Math.floor(n/100);
  const t = Math.floor((n%100)/10);
  const o = n%10;
  const H = h ? ("🟥".repeat(h) + ` <span class="small-note">(${h} hundreds)</span>`) : "";
  const T = t ? ("🟥".repeat(t) + ` <span class="small-note">(${t} tens)</span>`) : "";
  const O = o ? ("🟥".repeat(o) + ` <span class="small-note">(${o} ones)</span>`) : "";
  return `<span style="font-size:20px">${H} ${T} ${O}</span>`;
}
function g1asAns(){ return g1asOp==="+" ? (g1asA+g1asB) : (g1asA-g1asB); }
function g1asSpeak(){
  const opWord = g1asOp==="+" ? "plus" : "minus";
  speakGlobal(`What is ${g1asA} ${opWord} ${g1asB}?`);
}
function g1asCheck(){
  safeClick();
  if(g1asSolved) return;
  const raw = $("g1asInput").value;
  if(raw === ""){ $("g1asFb").textContent = "Type an answer!"; speakGlobal("Type an answer."); return; }
  const val = Number(raw);
  if(!Number.isFinite(val)){ $("g1asFb").textContent = "Type an answer!"; speakGlobal("Type an answer."); return; }
  const correct = g1asAns();
  if(val === correct){
    $("g1asFb").textContent = "🎉 Correct!";
    correctReward("Correct!");
    $("g1asNextBtn").disabled = false;
    g1asSolved = true;
    launchConfetti(80);
  }else{
    $("g1asFb").textContent = "❌ Try again!";
    const msg = `Not quite. The correct answer is ${correct}. Check the ${g1asOp === "+" ? "addition" : "subtraction"} again.`;
    $("g1asFb").textContent = msg;
    wrongPenalty(msg);
  }
}
function g1asNext(){
  safeClick();
  if($("g1asNextBtn").disabled) return;
  if(g1asRound < G1AS_TOTAL){ g1asRound++; g1asGen(); }
  else{ safePlay($("rewardSfx")); toast("Finished!"); launchConfetti(210); speakGlobal("Amazing math!"); g1asRound = 1; g1asGen(); }
}
function g1asReset(){ safeClick(); g1asRound = 1; g1asGen(); }

/* Graphs */
const GRAPH_SETS = [
  { title:"Favorite Fruits", items:[{name:"Apples", emoji:"🍎"},{name:"Bananas", emoji:"🍌"},{name:"Grapes", emoji:"🍇"}] },
  { title:"Pets at Home", items:[{name:"Dogs", emoji:"🐶"},{name:"Cats", emoji:"🐱"},{name:"Fish", emoji:"🐟"}] },
  { title:"Favorite Toys", items:[{name:"Balls", emoji:"⚽"},{name:"Cars", emoji:"🚗"},{name:"Teddies", emoji:"🧸"}] },
];
let g1gRound = 1;
const G1G_TOTAL = 12;
let g1gCorrectChoice = "";
let g1gQType = "more";
let g1gPickName = "";
let g1gSet = null;
let g1gChoices = [];

function g1gGen(){
  $("g1gFb").textContent = "";
  $("g1gNextBtn").disabled = true;
  $("g1gProg").textContent = `Round ${g1gRound} of ${G1G_TOTAL}`;

  const base = GRAPH_SETS[Math.floor(Math.random()*GRAPH_SETS.length)];
  g1gSet = { title: base.title, items: base.items.map(x=>({ ...x, count: randInt(2,6) })) };
  $("g1gTitle").textContent = g1gSet.title;

  const g = $("g1gGraph");
  g.innerHTML = "";
  g1gSet.items.forEach(it=>{
    const line = document.createElement("div");
    line.style.fontSize = "22px";
    line.style.margin = "6px 0";
    line.innerHTML = `<strong>${it.name}:</strong> <span style="font-size:28px">${it.emoji.repeat(it.count)}</span> <span class="small-note">(${it.count})</span>`;
    g.appendChild(line);
  });

  g1gQType = Math.random() < 0.5 ? "more" : "howmany";
  if(g1gQType === "more"){
    $("g1gQ").textContent = "Which has the MOST?";
    const max = Math.max(...g1gSet.items.map(i=>i.count));
    const winners = g1gSet.items.filter(i=>i.count===max);
    g1gCorrectChoice = winners[Math.floor(Math.random()*winners.length)].name;
    g1gPickName = "";
  }else{
    const pick = g1gSet.items[Math.floor(Math.random()*g1gSet.items.length)];
    g1gPickName = pick.name;
    $("g1gQ").textContent = `How many ${pick.name}?`;
    g1gCorrectChoice = String(pick.count);
  }

  let choices;
  if(g1gQType === "more") choices = padTextChoices(g1gSet.items.map(i=>i.name), ["None", "All the same", "Not shown"]);
  else choices = make3Choices(Number(g1gCorrectChoice), 1, 10).map(String);
  g1gChoices = choices;

  setChoiceButtons("g1g", choices);

  g1gSpeak();
}
function g1gSpeak(){
  if(g1gQType === "more") speakQuestionWithChoices("Which one has the most?", g1gChoices);
  else speakQuestionWithChoices(`How many ${g1gPickName}?`, g1gChoices);
}
function g1gPick(i){
  safeClick();
  const chosen = $("g1g"+i).textContent;
  if(chosen === g1gCorrectChoice){
    $("g1gFb").textContent = "🎉 Correct!";
    correctReward("Correct!");
    $("g1gNextBtn").disabled = false;
    launchConfetti(60);
  }else{
    $("g1gFb").textContent = "❌ Try again!";
    const msg = `Not quite. The correct choice is ${g1gCorrectChoice}. Compare the graph counts before picking.`;
    $("g1gFb").textContent = msg;
    wrongPenalty(msg);
  }
}
function g1gNext(){
  safeClick();
  if($("g1gNextBtn").disabled) return;
  if(g1gRound < G1G_TOTAL){ g1gRound++; g1gGen(); }
  else{ safePlay($("rewardSfx")); toast("Finished!"); launchConfetti(200); speakGlobal("Great graphs!"); g1gRound = 1; g1gGen(); }
}
function g1gReset(){ safeClick(); g1gRound = 1; g1gGen(); }

/* Money */
let g1mRound = 1;
const G1M_TOTAL = 12;
let g1mCorrect = 0;
let g1mChoices = [];

function coinLine(label, emoji, count, valueEach){
  if(count<=0) return "";
  return `<div>${label} (${valueEach}¢): <span style="font-size:28px">${emoji.repeat(count)}</span> <span class="small-note">x${count}</span></div>`;
}
function g1mGen(){
  $("g1mFb").textContent = "";
  $("g1mNextBtn").disabled = true;
  $("g1mProg").textContent = `Round ${g1mRound} of ${G1M_TOTAL}`;

  let q = randInt(0,2), d = randInt(0,3), n = randInt(0,3), p = randInt(0,6);
  g1mCorrect = q*25 + d*10 + n*5 + p*1;
  if(g1mCorrect === 0){ p = 3; g1mCorrect = 3; }

  while(g1mCorrect > 60){
    if(q>0) q--;
    else if(d>0) d--;
    else if(n>0) n--;
    else if(p>0) p--;
    g1mCorrect = q*25 + d*10 + n*5 + p*1;
  }

  const html =
    coinLine("Quarters", "🟡", q, 25) +
    coinLine("Dimes", "🔘", d, 10) +
    coinLine("Nickels", "⚪", n, 5) +
    coinLine("Pennies", "🟤", p, 1);

  $("g1mCoins").innerHTML = html || `<div>Pennies (1¢): <span style="font-size:28px">🟤🟤🟤</span></div>`;

  const opts = make3Choices(g1mCorrect, 1, 60);
  g1mChoices = opts;
  setChoiceButtons("g1m", opts);

  speakQuestionWithChoices("How many cents in all?", opts);
}
function g1mPick(i){
  safeClick();
  const chosen = Number($("g1m"+i).textContent);
  if(chosen === g1mCorrect){
    $("g1mFb").textContent = "🎉 Correct!";
    correctReward("Correct!");
    $("g1mNextBtn").disabled = false;
  }else{
    $("g1mFb").textContent = "❌ Try again!";
    const msg = `Not quite. The coins total ${g1mCorrect} cents. Add each coin value together.`;
    $("g1mFb").textContent = msg;
    wrongPenalty(msg);
  }
}
function g1mNext(){
  safeClick();
  if($("g1mNextBtn").disabled) return;
  if(g1mRound < G1M_TOTAL){ g1mRound++; g1mGen(); }
  else{ safePlay($("rewardSfx")); toast("Finished!"); launchConfetti(200); speakGlobal("Great money counting!"); g1mRound = 1; g1mGen(); }
}
function g1mReset(){ safeClick(); g1mRound = 1; g1mGen(); }
