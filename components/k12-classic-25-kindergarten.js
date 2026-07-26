/* Kindergarten interactive lesson source. */
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
  else finishSpecialLesson("k-syll-count", "Awesome syllables!", "k-syll-count");
}
function kscReset(){ safeClick(); prepareSpecialLesson("k-syll-count"); kscRound = 1; kscIdx = 0; kscLoad(); }

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
  else finishSpecialLesson("k-syll-build", "Amazing word building!", "k-syll-build");
}
function ksbReset(){ safeClick(); prepareSpecialLesson("k-syll-build"); ksbRound = 1; ksbIdx = 8; ksbLoad(); }

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
  else finishSpecialLesson("k-rhymes", "Great rhyming!", "k-rhymes");
}
function krReset(){ safeClick(); prepareSpecialLesson("k-rhymes"); krRound = 1; krIdx = 0; krGen(); }

(function(){
  const counting=Array.from({length:25},(_,index)=>{
    const number=index+1;
    return {q:`What number comes after ${number}?`,a:String(number+1),w:[String(number),String(number+2),String(Math.max(0,number-1))]};
  });
  const addition=Array.from({length:25},(_,index)=>{
    const left=index%6, right=Math.floor(index/6)+1, answer=left+right;
    return {q:`What is ${left} + ${right}?`,a:String(answer),w:[String(Math.max(0,answer-1)),String(answer+1),String(answer+2)]};
  });
  const patternRows=[
    ["circle, square, circle, square","circle"],["red, blue, red, blue","red"],["1, 2, 1, 2","1"],["triangle, triangle, star, triangle, triangle, star","triangle"],
    ["small, big, small, big","small"],["yellow, green, yellow, green","yellow"],["A, B, A, B","A"],["square, circle, triangle, square, circle, triangle","square"],
    ["2, 4, 2, 4","2"],["clap, stomp, clap, stomp","clap"],["star, heart, star, heart","star"],["up, down, up, down","up"],
    ["red, red, blue, red, red, blue","red"],["1, 1, 3, 1, 1, 3","1"],["circle, star, star, circle, star, star","circle"],
    ["left, right, left, right","left"],["big, small, small, big, small, small","big"],["A, A, B, A, A, B","A"],
    ["triangle, square, square, triangle, square, square","triangle"],["5, 6, 5, 6","5"],["sun, moon, sun, moon","sun"],
    ["green, purple, purple, green, purple, purple","green"],["tap, tap, clap, tap, tap, clap","tap"],["oval, diamond, oval, diamond","oval"],["1, 2, 3, 1, 2, 3","1"]
  ];
  const patterns=patternRows.map(([sequence,answer],index)=>({q:`What comes next: ${sequence}, ___?`,a:answer,w:["stop","different",index%2?"blue":"4"].filter(value=>value!==answer).slice(0,3)}));
  patterns.forEach((question,index)=>{ while(question.w.length<3) question.w.push(["square","9","jump"][question.w.length]); });
  Object.assign(window.K12_EARLY_BANKS,{
    "k:math:counting":{name:"Counting to 30",questions:counting},
    "k:math:addition":{name:"Addition Within 10",questions:addition},
    "k:math:patterns":{name:"Shapes and Patterns",questions:patterns}
  });
})();
