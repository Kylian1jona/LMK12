/* Grade 1 interactive lesson source. */
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
  else finishSpecialLesson("g1-addsub", "Amazing math!", "g1-addsub");
}
function g1asReset(){ safeClick(); prepareSpecialLesson("g1-addsub"); g1asRound = 1; g1asGen(); }

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
  else finishSpecialLesson("g1-graphs", "Great graph work!", "g1-graphs");
}
function g1gReset(){ safeClick(); prepareSpecialLesson("g1-graphs"); g1gRound = 1; g1gGen(); }

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
  else finishSpecialLesson("g1-money", "Great money counting!", "g1-money");
}
function g1mReset(){ safeClick(); prepareSpecialLesson("g1-money"); g1mRound = 1; g1mGen(); }

(function(){
  const vowelRows=[
    ["cat","short a"],["map","short a"],["cake","long a"],["rain","long a"],["bed","short e"],["hen","short e"],["feet","long e"],["tree","long e"],
    ["pig","short i"],["sit","short i"],["kite","long i"],["light","long i"],["hot","short o"],["fox","short o"],["home","long o"],["boat","long o"],
    ["sun","short u"],["cup","short u"],["cube","long u"],["mule","long u"],["cap","short a"],["seed","long e"],["fin","short i"],["rope","long o"],["tub","short u"]
  ];
  const vowels=vowelRows.map(([word,answer])=>({q:`Which vowel sound is heard in ${word}?`,a:answer,w:["short a","long e","short o","long i"].filter(value=>value!==answer).slice(0,3)}));
  vowels.forEach(question=>{while(question.w.length<3) question.w.push(["short e","long o","long u"].find(value=>value!==question.a&&!question.w.includes(value)));});
  const sightRows=[
    ["I ___ a red ball.","see"],["We ___ to school.","go"],["The dog is ___ the table.","under"],["She ___ my friend.","is"],["___ are two birds.","There"],
    ["Can ___ help me?","you"],["I ___ like apples.","do"],["He ___ a blue hat.","has"],["We play ___ the park.","at"],["This gift is ___ you.","for"],
    ["___ cat is sleeping.","The"],["I want ___ read.","to"],["They ___ happy.","are"],["Please come ___ me.","with"],["I ___ my family.","love"],
    ["___ is your name?","What"],["The book is ___ the desk.","on"],["I can ___ the music.","hear"],["We ___ lunch at noon.","eat"],["She ___ run fast.","can"],
    ["Look ___ the bright moon.","at"],["___ went home after class.","We"],["The puppy is ___ little.","very"],["I ___ a yellow flower.","see"],["Please ___ the door.","open"]
  ];
  const sightPool=["see","go","under","is","There","you","do","has","at","for","The","to","are","with","love","What","on","hear","eat","can","We","very","open"];
  const sight=sightRows.map(([q,a],index)=>({q,a,w:[sightPool[(index+3)%sightPool.length],sightPool[(index+8)%sightPool.length],sightPool[(index+14)%sightPool.length]].filter(value=>value!==a)}));
  sight.forEach((question,index)=>{while(question.w.length<3){const candidate=sightPool[(index+question.w.length+17)%sightPool.length];if(candidate!==question.a&&!question.w.includes(candidate))question.w.push(candidate);}});
  const sentenceRows=[
    ["Which is a complete sentence?","The bird sings.","On the tall tree","Running very fast","The yellow"],
    ["Which sentence begins with a capital letter?","My dog can swim.","my dog can swim.","my Dog can swim.","MY dog can swim."],
    ["Which sentence ends correctly?","We went home.","We went home","We went home,","We went home!."],
    ["Which sentence asks a question?","Where is my book?","My book is here.","Find my book.","What a good book!"],
    ["Which sentence shows excitement?","That was amazing!","That was amazing.","Was that amazing?","that was amazing"],
    ["Choose the correct sentence.","Sam and Mia play.","sam and Mia play.","Sam and Mia play","Sam And Mia play."],
    ["Which words form a complete thought?","The frog jumps.","The green frog","Across the pond","Jumping quickly"],
    ["Choose the sentence with the correct noun.","The teacher reads.","The quickly reads.","The happy reads.","The under reads."],
    ["Choose the sentence with the correct verb.","Birds fly south.","Birds blue south.","Birds soft south.","Birds nest south."],
    ["Which sentence uses I correctly?","Mia and I draw.","Mia and me draws.","mia and I draw","Mia And I draw."],
    ["Which sentence is about one cat?","The cat sleeps.","The cats sleep.","The dogs sleep.","The cat sleep are."],
    ["Which sentence is about more than one dog?","The dogs bark.","The dog barks.","The dog bark.","A dogs barks."],
    ["Choose the correct word order.","We read books.","Read we books.","Books we read the.","We books read a."],
    ["Which sentence has a naming part and an action part?","The baby laughs.","The little baby","Laughing loudly","In the room"],
    ["Which sentence uses a period correctly?","It is raining.","It is raining?","It is raining!","It is raining,"],
    ["Which sentence uses a question mark correctly?","Can you help me?","Can you help me.","Can you help me!","Can you help me,"],
    ["Which sentence uses an exclamation mark correctly?","Watch out!","Watch out.","Watch out?","Watch out,"],
    ["Choose the correctly capitalized name.","Ava has a kite.","ava has a kite.","Ava Has a kite.","AVA has a Kite."],
    ["Choose the correctly capitalized day.","We play on Monday.","We play on monday.","we play on Monday.","We Play on monday."],
    ["Which sentence uses and correctly?","Ben and Leo run.","Ben but Leo run.","Ben or Leo both run.","Ben and Leo runs is."],
    ["Which sentence tells something?","The sun is warm.","Is the sun warm?","How warm is it?","Wow, it is warm!"],
    ["Which group is not a complete sentence?","Under the table","The mouse hides.","We found it.","It ran away."],
    ["Choose the sentence with a describing word.","The fluffy cat sleeps.","The cat sleeps.","Cats sleep.","The cat is."],
    ["Which sentence makes sense?","The fish swims in water.","The fish flies to the moon.","The water reads a fish.","Swims the in fish."],
    ["Choose the best ending punctuation: I love this game___","!","?",",",":"]
  ];
  const sentences=sentenceRows.map(([q,a,...w])=>({q,a,w}));
  const addSub=Array.from({length:25},(_,index)=>{
    const add=index%2===0, left=12+index*3, right=2+index%9, answer=add?left+right:left-right;
    return {q:`What is ${left} ${add?"+":"−"} ${right}?`,a:String(answer),w:[String(answer+1),String(Math.max(0,answer-1)),String(answer+2)]};
  });
  const graphRows=Array.from({length:25},(_,index)=>{
    const apples=index%7+2, bananas=(index*2)%7+1, more=apples>bananas?"apples":bananas>apples?"bananas":"the same number";
    return {q:`A picture graph shows ${apples} apples and ${bananas} bananas. Which group has more?`,a:more,w:["apples","bananas","the same number","not enough information"].filter(value=>value!==more).slice(0,3)};
  });
  const coinValues=[1,5,10,25];
  const money=Array.from({length:25},(_,index)=>{
    const first=coinValues[index%4], second=coinValues[(index+1)%4], answer=first+second;
    return {q:`A ${first}-cent coin and a ${second}-cent coin are worth how many cents altogether?`,a:String(answer),w:[String(answer+1),String(Math.max(1,answer-1)),String(answer+5)]};
  });
  Object.assign(window.K12_EARLY_BANKS,{
    "g1:eng:vowels":{name:"Vowel Sounds",questions:vowels},
    "g1:eng:sight":{name:"Sight Words",questions:sight},
    "g1:eng:sentences":{
      name:"Sentence Basics",
      questions:sentences,
      video:{src:"components/days_of_the_week_kids.mp4",title:"Days of the Week"}
    },
    "g1:math:addsub":{name:"Addition and Subtraction",questions:addSub},
    "g1:math:graphs":{name:"Data and Graphs",questions:graphRows},
    "g1:math:money":{name:"Money Counting",questions:money}
  });
})();
