/* Pre-K interactive lesson source. */
/* ===========================
   Pre-K: Emoji Addition
=========================== */
const PKA_EMOJIS = ["🍎","🍌","🍒","⭐","🧸","🚗","🧡","🎁","🟠","🍉"];
let pkaQ = 1, pkaCorrect = 0, pkaScore = 0;
const PKA_TOTAL = 20;

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
  if(typeof pauseUniversalLessonTimer==="function") pauseUniversalLessonTimer();
  $("prek-add")?.querySelector(":scope > .cardish > .quiz-card")?.classList.add("d-none");
  $("pkaReport").classList.remove("d-none");
  $("pkaScoreLine").textContent = `You got ${pkaScore} out of ${PKA_TOTAL}!`;
  const stars = clamp(Math.round((pkaScore/PKA_TOTAL)*5), 1, 5);
  $("pkaStars").textContent = "⭐".repeat(stars);
  recordLearningStat("lesson", {title:"Emoji Addition", lessonId:"special:prek-add"});
  launchConfetti(220);
  speakGlobal("Great job!");
}
function pkaRestart(){ safeClick(); prepareSpecialLesson("prek-add"); pkaQ = 1; pkaScore = 0; pkaGen(); }

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
  if(typeof pauseUniversalLessonTimer==="function") pauseUniversalLessonTimer();
  $("prek-count")?.querySelector(":scope > .cardish > .quiz-card")?.classList.add("d-none");
  safePlay($("rewardSfx"));
  $("pkcReward").classList.remove("d-none");
  $("pkcStars").textContent = "⭐".repeat(5);
  $("pkcSummary").textContent = `Nice counting! Keep earning ⭐ points and convert to 💎 Learners.`;
  recordLearningStat("lesson", {title:"Count the Objects", lessonId:"special:prek-count"});
  launchConfetti(180);
  speakGlobal("Amazing counting!");
}
function pkcReset(){ safeClick(); prepareSpecialLesson("prek-count"); pkcRound = 1; pkcGen(); }

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
    if(typeof pauseUniversalLessonTimer==="function") pauseUniversalLessonTimer();
    $("prek-shapes")?.querySelector(":scope > .cardish > .quiz-card")?.classList.add("d-none");
    $("pksDone").classList.remove("d-none");
    $("pksStars").textContent = "⭐".repeat(5);
    recordLearningStat("lesson", {title:"Shapes Match", lessonId:"special:prek-shapes"});
    launchConfetti(170);
    speakGlobal("Great shapes!");
  }
}
function pksReset(){ safeClick(); prepareSpecialLesson("prek-shapes"); pksRound = 1; pksGen(); }

(function(){
  const letters="ABCDEFGHIJKLMNOPQRSTUVWXY".split("");
  const letterQuestions=letters.map((letter,index)=>({q:`Which is the letter ${letter}?`,a:letter,w:[letters[(index+1)%25],letters[(index+5)%25],letters[(index+11)%25]]}));
  const soundWords=["apple","ball","cat","dog","egg","fish","goat","hat","igloo","jam","kite","lion","moon","nest","octopus","pig","queen","rabbit","sun","turtle","umbrella","van","wagon","x-ray","yarn"];
  const soundQuestions=soundWords.map((word,index)=>({q:`What sound does ${word} begin with?`,a:word[0].toUpperCase(),w:[soundWords[(index+3)%25][0].toUpperCase(),soundWords[(index+7)%25][0].toUpperCase(),soundWords[(index+13)%25][0].toUpperCase()]}));
  const rhymeRows=[["cat","hat"],["dog","log"],["sun","fun"],["cake","lake"],["bee","tree"],["mouse","house"],["star","car"],["boat","goat"],["pig","wig"],["ring","sing"],["fox","box"],["bear","chair"],["moon","spoon"],["duck","truck"],["light","kite"],["frog","log"],["snail","pail"],["sock","rock"],["bug","rug"],["hen","pen"],["corn","horn"],["blue","shoe"],["fish","dish"],["king","wing"],["jam","ham"]];
  const rhymeDistractors=["leaf","book","desk","milk","jump"];
  const rhymeQuestions=rhymeRows.map(([word,answer],index)=>({q:`Which word rhymes with ${word}?`,a:answer,w:[rhymeDistractors[index%5],rhymeDistractors[(index+1)%5],rhymeDistractors[(index+2)%5]]}));
  const additionQuestions=Array.from({length:25},(_,index)=>{
    const left=index%5+1, right=Math.floor(index/5)+1, answer=left+right;
    const firstGroup="●".repeat(left), secondGroup="●".repeat(right);
    return {q:`Count the dots: ${firstGroup} + ${secondGroup}. How many altogether?`,a:String(answer),w:[String(Math.max(1,answer-1)),String(answer+1),String(answer+2)]};
  });
  const countingQuestions=Array.from({length:25},(_,index)=>{
    const amount=index%20+1;
    const item=["stars","apples","blocks","balls","flowers","dots","hearts","moons","kites","books","cars","fish","birds","cups","hats","trees","rings","shells","bears","drums","boats","keys","socks","leaves","flags"][index];
    const marks="●".repeat(amount);
    return {q:`Count the ${item}: ${marks}`,a:String(amount),w:[String(Math.max(0,amount-1)),String(amount+1),String(amount+2)]};
  });
  const shapeRows=[
    ["Which shape is round with no corners?","circle"],["Which shape has three sides?","triangle"],["Which shape has four equal sides?","square"],["Which shape looks like a stretched circle?","oval"],["Which shape has five points?","star"],
    ["A clock is usually shaped like a...","circle"],["A slice of pizza often looks like a...","triangle"],["A floor tile can look like a...","square"],["An egg is shaped like an...","oval"],["Which shape has four sides, with two long and two short?","rectangle"],
    ["Which shape can roll most easily?","circle"],["Which shape has exactly three corners?","triangle"],["Which shape has four corners and equal sides?","square"],["Which shape has no straight sides?","circle"],["Which shape looks like a door?","rectangle"],
    ["Which shape looks like a ball from the front?","circle"],["Which shape looks like a party hat?","triangle"],["Which shape looks like a picture frame?","rectangle"],["Which shape looks like an egg?","oval"],["Which shape has points that shine in the sky?","star"],
    ["Which shape has zero corners?","circle"],["Which shape has 3 sides and 3 corners?","triangle"],["Which shape has 4 equal sides and 4 corners?","square"],["Which shape is longer than it is wide and has 4 corners?","rectangle"],["Which shape is curved and longer than a circle?","oval"]
  ];
  const shapePool=["circle","triangle","square","rectangle","oval","star"];
  const shapeQuestions=shapeRows.map(([q,a],index)=>({q,a,w:shapePool.filter(shape=>shape!==a).slice(index%3,index%3+3)}));
  Object.assign(window.K12_EARLY_BANKS,{
    "prek:eng:letters":{name:"Letter Names",questions:letterQuestions},
    "prek:eng:sounds":{name:"Beginning Sounds",questions:soundQuestions},
    "prek:eng:rhymes":{name:"Rhyming Words",questions:rhymeQuestions},
    "prek:math:addition":{name:"Picture Addition",questions:additionQuestions},
    "prek:math:counting":{name:"Counting to 20",questions:countingQuestions},
    "prek:math:shapes":{name:"Shape Match",questions:shapeQuestions}
  });
})();
