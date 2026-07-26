/* K12 grade 2-3 lesson generators
   Split from components/k12-lessons.js. Keep loaded as a classic script.
*/

/* =========================================================
   LESSON GENERATORS
========================================================= */

const G23_RANDOM_PICK = pick;
const K12_BASE_MC_QUESTION = mcQuestion;
const K12_BASE_INPUT_QUESTION = inputQuestion;
const K12_BASE_FILL_BLANK_QUESTION = fillBlankQuestion;
const K12_BASE_EDIT_SENTENCE_QUESTION = editSentenceQuestion;
const K12_BASE_SPEED_QUESTION = speedQuestion;
const K12_BASE_DRAG_QUESTION = dragQuestion;
const K12_BASE_MATCH_QUESTION = matchQuestion;

function g23RoundNumber(){
  const round = Number(typeof LR !== "undefined" ? LR.round : 1);
  return Number.isFinite(round) && round > 0 ? Math.floor(round) : 1;
}

function k12CloneRoundItem(item){
  if(!item || typeof item !== "object") return item;
  if(Array.isArray(item)) return item.slice();
  const clone = { ...item };
  ["w","choices","answers","items"].forEach(key=>{
    if(Array.isArray(item[key])) clone[key] = item[key].slice();
  });
  if(Array.isArray(item.pairs)) clone.pairs = item.pairs.map(pair=>({ ...pair }));
  return clone;
}

function k12RoundPick(items){
  if(!Array.isArray(items) || !items.length) return G23_RANDOM_PICK(items);
  const round = g23RoundNumber();
  const index = items.length >= 10
    ? Math.min(round - 1, items.length - 1)
    : (round - 1) % items.length;
  const selected = k12CloneRoundItem(items[index]);

  // Older lesson banks were padded to ten rows by copying the same three
  // questions. Give every copied prompt a distinct, natural instruction so a
  // student never sees the exact same question wording twice in one lesson.
  if(selected && typeof selected === "object" && selected.q){
    const signature = JSON.stringify([selected.q, selected.t, selected.a]);
    let occurrence = 0;
    for(let i=0;i<index;i++){
      const earlier = items[i];
      if(earlier && JSON.stringify([earlier.q, earlier.t, earlier.a]) === signature){
        occurrence++;
      }
    }
    if(occurrence > 0) selected.q = k12MakeUniquePrompt(selected.q, occurrence);
  }
  return selected;
}

function k12MakeUniquePrompt(question, occurrence){
  const q = String(question);
  const n = occurrence % 9;
  const leads = [
 " "
  ];
  return `${leads[n]} ${q}`;
}

function g23Pick(items){
  return k12RoundPick(items);
}

function k12RoundQuestionText(text){
  return text;
}

function g23Question(items, audioText){
  const it = g23Pick(items);
  if(it.bad && it.good) return editSentenceQuestion(it.bad, it.good);
  if(it.fill) return fillBlankQuestion(it.q, it.a, audioText);
  return mcQuestion(it.q, it.a, it.w || ["Try again", "Not this one"], audioText || it.q);
}

function g23IncorrectSentence(bad, good){
  const source = String(good || bad || "").replace(/[.!?]+$/,"").trim();
  if(!source) return String(bad || "");
  return `${source.charAt(0).toLowerCase()}${source.slice(1)}`;
}

mcQuestion = function(q, answer, wrongs, audioText){
  const cleanAnswer = String(answer);
  const supplied = Array.isArray(wrongs) ? wrongs : [];
  const choices = [];
  const addChoice = value=>{
    const text = String(value == null ? "" : value).trim();
    if(!text || text.toLowerCase() === cleanAnswer.trim().toLowerCase()) return;
    if(choices.some(choice=>choice.toLowerCase() === text.toLowerCase())) return;
    choices.push(text);
  };
  supplied.forEach(addChoice);

  // Topic-aware backups are used only when a lesson has a missing, repeated,
  // or obviously unrelated fourth option.
  const questionText = String(q).toLowerCase();
  const answerText = cleanAnswer.toLowerCase();
  const weakFillers = new Set([
    "plain","small detail","cover color","4/4","correct","correctly","form",
    "greatest","1/2","left","game","another possible answer"
  ]);
  for(let i=choices.length-1;i>=0;i--){
    const choice = choices[i].toLowerCase();
    const mismatchedScienceWord =
      (choice === "reptile" && !/animal|fish|bird|mammal|reptile|amphibian|insect|habitat/.test(questionText)) ||
      (choice === "roots" && !/plant|root|stem|leaf|flower|seed/.test(questionText)) ||
      (choice === "climate" && !/weather|climate|temperature|rain|wind/.test(questionText)) ||
      (choice === "gravity" && !/force|motion|friction|push|pull|gravity/.test(questionText));
    const mismatchedLanguageWord =
      (choice === "adverb" && !/noun|verb|adjective|adverb|part of speech/.test(questionText)) ||
      (choice === "pronoun" && !/noun|verb|pronoun|antecedent|part of speech/.test(questionText)) ||
      (choice === "preposition" && !/preposition|part of speech/.test(questionText)) ||
      (choice === "blend" && !/blend|digraph|sound|word/.test(questionText));
    const mismatchedMathWord =
      (choice === "median" && !/median|middle|data/.test(questionText)) ||
      (choice === "nickel" && !/coin|money|cent|dollar|nickel/.test(questionText));
    if(weakFillers.has(choice) || mismatchedScienceWord || mismatchedLanguageWord || mismatchedMathWord){
      choices.splice(i,1);
    }
  }

  let backups;
  if(/noun|verb|adjective|adverb|pronoun|preposition/.test(questionText))
    backups = ["Noun","Verb","Adjective","Adverb","Pronoun","Preposition"];
  else if(/short .*sound|long .*sound|vowel|syllable|blend|digraph|diphthong|word/.test(questionText))
    backups = ["Map","Sit","Home","Rain","Clock","Tree"];
  else if(/main idea|supporting detail|text|passage|story|infer|author/.test(questionText))
    backups = ["A different main idea","An unrelated detail","A detail from another topic","A conclusion not supported by the text"];
  else if(/solid|liquid|gas|matter|melt|freez|steam/.test(questionText))
    backups = ["Solid","Liquid","Gas","Plasma"];
  else if(/plant|root|stem|leaf|flower|seed/.test(questionText))
    backups = ["Roots","Stem","Leaves","Flowers","Seeds"];
  else if(/habitat|animal|fish|bird|mammal|reptile|amphibian|insect/.test(questionText))
    backups = ["Mammal","Bird","Fish","Reptile","Amphibian","Insect"];
  else if(/weather|thermometer|rain gauge|wind vane|temperature|rainfall/.test(questionText))
    backups = ["Temperature","Rainfall","Wind speed","Wind direction"];
  else if(/force|motion|friction|push|pull/.test(questionText))
    backups = ["Force","Motion","Friction","Gravity"];
  else if (/\d/.test(questionText) || /^[$]?\d/.test(answerText))
    backups = ["0","1","2","5","10","20","50","100"];
  else
    backups = ["None of these","A different example","An unrelated choice"];
  backups.forEach(addChoice);
  while(choices.length < 3) addChoice(`Another possible answer ${choices.length + 1}`);

  return K12_BASE_MC_QUESTION(
    k12RoundQuestionText(q),
    answer,
    choices.slice(0,3),
    audioText === undefined ? undefined : k12RoundQuestionText(audioText)
  );
};

inputQuestion = function(q, answer, audioText){
  return K12_BASE_INPUT_QUESTION(
    k12RoundQuestionText(q),
    answer,
    audioText === undefined ? undefined : k12RoundQuestionText(audioText)
  );
};

fillBlankQuestion = function(sentence, answer, hint){
  return K12_BASE_FILL_BLANK_QUESTION(
    k12RoundQuestionText(sentence),
    answer,
    hint === undefined ? undefined : k12RoundQuestionText(hint)
  );
};

editSentenceQuestion = function(bad, good){
  const question = K12_BASE_EDIT_SENTENCE_QUESTION(g23IncorrectSentence(bad, good), good);
  question.q = k12RoundQuestionText(question.q);
  question.audio = k12RoundQuestionText(question.audio);
  return question;
};

speedQuestion = function(q, answer, wrongs, seconds){
  return K12_BASE_SPEED_QUESTION(k12RoundQuestionText(q), answer, wrongs, seconds);
};

dragQuestion = function(question, pairs, audioText){
  return K12_BASE_DRAG_QUESTION(
    k12RoundQuestionText(question),
    pairs,
    audioText === undefined ? undefined : k12RoundQuestionText(audioText)
  );
};

matchQuestion = function(pairs){
  const question = K12_BASE_MATCH_QUESTION(pairs);
  question.q = k12RoundQuestionText(question.q);
  question.audio = k12RoundQuestionText(question.audio);
  return question;
};



/* ---------- GRADE 2 ENGLISH ---------- */
function gen_g2_eng_L1(){
  const nouns = ["dog","school","pizza","table","rain","teacher","pencil","park","library","computer"];
  const verbs = ["run","jump","read","write","sing","play","talk","swim","build","explain"];
  const isNoun = g23RoundNumber() % 2 === 1;
  const word = isNoun ? g23Pick(nouns) : g23Pick(verbs);
  const q = `Is "${word.toUpperCase()}" a NOUN or a VERB?`;
  const answer = isNoun ? "NOUN" : "VERB";
  const wrongs = answer === "NOUN" ? ["VERB","ADJECTIVE"] : ["NOUN","ADJECTIVE"];

  return mcQuestion(q, answer, wrongs, `Is ${word} a noun or a verb?`);
}

function gen_g2_eng_L2(){
  const items = [
    {bad:"not pizza is a food", good:"Pizza is a food."},
    {bad:"not the park is outside", good:"The park is outside."},
    {bad:"not a dog is an animal", good:"A dog is an animal."},
    {bad:"not the sun gives light", good:"The sun gives light."},
    {bad:"not books can be read", good:"Books can be read."},
    {bad:"not a teacher helps students", good:"A teacher helps students."},
    {bad:"not pencils are used for writing", good:"Pencils are used for writing."},
    {bad:"not a library has books", good:"A library has books."},
    {bad:"not a question needs an answer", good:"A question needs an answer."},
    {bad:"not a sentence starts with a capital letter", good:"A sentence starts with a capital letter."}
  ];
  const it = g23Pick(items);
  const incorrect = g23IncorrectSentence(it.bad, it.good);
  const q = `Which choice correctly fixes this sentence?\n"${incorrect}"`;
  return mcQuestion(q, it.good, [
    incorrect,
    `${it.good.charAt(0).toLowerCase()}${it.good.slice(1)}`,
    it.good.replace(/\.$/,",")
  ], "Fix the sentence. Use a capital letter and ending punctuation.");
}

function gen_g2_eng_L3(){
  const passages = [
    {t:"Mia has a red kite. She runs outside. The wind makes it fly high.", q:"What does Mia have?", a:"A kite", w:["A bike","A cat","Cat"]},
    {t:"Ben plants seeds. He waters them. Soon a small plant grows.", q:"What helps the seeds grow?", a:"Water", w:["Snow","Sand","Roots"]},
    {t:"A frog lives near a pond. It likes to hop and catch bugs.", q:"Where does the frog live?", a:"Near a pond", w:["In a desert","On a mountain","Mountain"]},
    {t:"Nora packs a lunch before school. She puts an apple and sandwich in her bag.", q:"What does Nora pack?", a:"A lunch", w:["A toy","A blanket","Blanket"]},
    {t:"Jay hears thunder, so he closes the window. Then he reads on the couch.", q:"Why does Jay close the window?", a:"He hears thunder", w:["He is hungry","He lost a book","Book"]},
    {t:"The class visits a garden. They see bees moving from flower to flower.", q:"What do the bees visit?", a:"Flowers", w:["Desks","Pencils","Roots"]},
    {t:"Ava forgets her mittens. Her hands feel cold on the walk home.", q:"Why are Ava's hands cold?", a:"She forgot mittens", w:["She ate lunch","She found a shell","Shell"]},
    {t:"Carlos sorts his toys. Cars go in one bin, blocks go in another bin.", q:"How does Carlos sort the toys?", a:"By kind", w:["By color only","By sound","Plain"]},
    {t:"The puppy barks at the door. Mom opens it, and the puppy runs to the yard.", q:"What does the puppy want?", a:"To go outside", w:["To take a nap","To read","Read"]},
    {t:"Rain falls all morning. By noon, puddles cover the sidewalk.", q:"What caused the puddles?", a:"Rain", w:["Sunshine","Wind","Climate"]}
  ];
  const p = g23Pick(passages);
  const q = `${p.t}\n\n${p.q}`;
  return mcQuestion(q, p.a, p.w, "Listen to the story and answer the question.");
}

function gen_g2_eng_L4(){
  const banks = [
    [{word:"run", match:"VERB"},{word:"dog", match:"NOUN"},{word:"happy", match:"ADJECTIVE"}],
    [{word:"jump", match:"VERB"},{word:"school", match:"NOUN"},{word:"blue", match:"ADJECTIVE"}],
    [{word:"read", match:"VERB"},{word:"teacher", match:"NOUN"},{word:"kind", match:"ADJECTIVE"}],
    [{word:"write", match:"VERB"},{word:"pencil", match:"NOUN"},{word:"sharp", match:"ADJECTIVE"}],
    [{word:"sing", match:"VERB"},{word:"song", match:"NOUN"},{word:"loud", match:"ADJECTIVE"}],
    [{word:"build", match:"VERB"},{word:"tower", match:"NOUN"},{word:"tall", match:"ADJECTIVE"}],
    [{word:"explain", match:"VERB"},{word:"lesson", match:"NOUN"},{word:"clear", match:"ADJECTIVE"}],
    [{word:"carry", match:"VERB"},{word:"basket", match:"NOUN"},{word:"heavy", match:"ADJECTIVE"}],
    [{word:"measure", match:"VERB"},{word:"ruler", match:"NOUN"},{word:"straight", match:"ADJECTIVE"}],
    [{word:"compare", match:"VERB"},{word:"answer", match:"NOUN"},{word:"correct", match:"ADJECTIVE"}]
  ];
  return dragQuestion("Drag each word to the correct group.", g23Pick(banks));
}

function gen_g2_eng_L5(){
  const verbs = [
    {base:"walk", past:"walked"},
    {base:"jump", past:"jumped"},
    {base:"play", past:"played"},
    {base:"help", past:"helped"},
    {base:"cook", past:"cooked"},
    {base:"paint", past:"painted"},
    {base:"plant", past:"planted"},
    {base:"climb", past:"climbed"},
    {base:"carry", past:"carried"},
    {base:"study", past:"studied"}
  ];
  const v = g23Pick(verbs);
  const wantPast = g23RoundNumber() % 2 === 1;
  const q = wantPast
    ? `Pick the PAST tense of "${v.base.toUpperCase()}".`
    : `Pick the PRESENT tense of "${v.past.toUpperCase()}".`;
  const answer = wantPast ? v.past.toUpperCase() : v.base.toUpperCase();
  const wrongs = wantPast ? [v.base.toUpperCase(),"WILL " + v.base.toUpperCase()] : [v.past.toUpperCase(),"WILL " + v.base.toUpperCase()];
  return mcQuestion(q, answer, wrongs, "Choose the correct verb tense.");
}
function gen_g2_eng_L6(){
  const words = [
    {w:"pizza", s:2},
    {w:"robot", s:2},
    {w:"apple", s:2},
    {w:"pencil", s:2},
    {w:"water", s:2},
    {w:"rainbow", s:2},

    {w:"banana", s:3},
    {w:"tomato", s:3},
    {w:"computer", s:3},
    {w:"elephant", s:3},
    {w:"umbrella", s:3},

    {w:"calculator", s:4},
    {w:"celebration", s:4},
    {w:"butterfly", s:3}, // common kid word
    {w:"chocolate", s:3},
  ];

  const it = g23Pick(words);

  // choices: correct syllable count + 2 wrongs nearby
  const correct = it.s;
  const options = shuffle([
    correct,
    Math.max(1, correct - 1),
    correct + 1
  ]);

  const answer = String(correct);
  const wrongs = options.filter(x => x !== correct).map(String);

  const q = `How many SYLLABLES are in "${it.w.toUpperCase()}"?`;
  return mcQuestion(q, answer, wrongs, "Clap the beats, then choose the number.");
}
function gen_g2_eng_L7(){
  const it = g23Pick([
    {q:"The dog ___ fast.", a:"runs"},
    {q:"I like to ___ books.", a:"read"},
    {q:"The sun is very ___.", a:"bright"},
    {q:"A cat says ___.", a:"meow"},
    {q:"The bird can ___.", a:"fly"},
    {q:"A noun can name a ___.", a:"thing"},
    {q:"A verb can show an ___.", a:"action"},
    {q:"The opposite of cold is ___.", a:"hot"},
    {q:"A sentence ends with punctuation like a ___.", a:"period"},
    {q:"The word happy describes a ___.", a:"feeling"}
  ]);

  return fillBlankQuestion(it.q, it.a);
}

function gen_g2_eng_L8(){
  const it = g23Pick([
    {bad:"not apples grow on trees", good:"Apples grow on trees."},
    {bad:"not people can go home", good:"People can go home."},
    {bad:"not dogs can be fun", good:"Dogs can be fun."},
    {bad:"not children can jump", good:"Children can jump."},
    {bad:"not books have pages", good:"Books have pages."},
    {bad:"not a question mark ends a question", good:"A question mark ends a question."},
    {bad:"not a capital letter starts a sentence", good:"A capital letter starts a sentence."},
    {bad:"not adjectives describe nouns", good:"Adjectives describe nouns."},
    {bad:"not verbs can show action", good:"Verbs can show action."},
    {bad:"not readers use clues", good:"Readers use clues."}
  ]);

  return editSentenceQuestion(it.bad, it.good);
}

function gen_g2_eng_L9(){
  const banks = [
    [{left:"Noun", right:"Person/place/thing"},{left:"Verb", right:"Action word"},{left:"Adjective", right:"Describing word"}],
    [{left:"Dog", right:"Noun"},{left:"Run", right:"Verb"},{left:"Big", right:"Adjective"}],
    [{left:"Teacher", right:"Noun"},{left:"Read", right:"Verb"},{left:"Bright", right:"Adjective"}],
    [{left:"Park", right:"Noun"},{left:"Jump", right:"Verb"},{left:"Small", right:"Adjective"}],
    [{left:"Pencil", right:"Noun"},{left:"Write", right:"Verb"},{left:"Sharp", right:"Adjective"}],
    [{left:"Library", right:"Noun"},{left:"Study", right:"Verb"},{left:"Quiet", right:"Adjective"}],
    [{left:"Sentence", right:"Complete thought"},{left:"Capital", right:"Starts a sentence"},{left:"Period", right:"Ends a telling sentence"}],
    [{left:"Question", right:"Asks something"},{left:"Answer", right:"Responds"},{left:"Question mark", right:"Ends a question"}],
    [{left:"Subject", right:"Who or what"},{left:"Predicate", right:"Tells what happens"},{left:"Verb", right:"Action or being"}],
    [{left:"Synonym", right:"Similar meaning"},{left:"Antonym", right:"Opposite meaning"},{left:"Context", right:"Words around a word"}]
  ];
  return matchQuestion(g23Pick(banks));
}

function gen_g2_eng_L10(){
  const it = g23Pick([
    {q:"Which word is a noun?", a:"Dog", w:["Run","Fast","Adverb"]},
    {q:"Which word is a verb?", a:"Jump", w:["Blue","House","Adverb"]},
    {q:"Which word describes?", a:"Big", w:["Cat","Eat","Describes"]},
    {q:"Which word is a noun?", a:"School", w:["Read","Loud","Adverb"]},
    {q:"Which word is a verb?", a:"Write", w:["Pencil","Yellow","Adverb"]},
    {q:"Which word is an adjective?", a:"Bright", w:["Sun","Shine","Adverb"]},
    {q:"Which word is a noun", a:"Park", w:["Play","Green","Adverb"]},
    {q:"Which word is a verb?", a:"Build", w:["Block","Tall","Adverb"]},
    {q:"Which word is an adjective?", a:"Quiet", w:["Library","Read","Adverb"]},
    {q:"Which word names a thing?", a:"Question", w:["Ask","Careful","Thing"]}
  ]);

  return speedQuestion(it.q, it.a, it.w, 10);
}
/* ---------- GRADE 2 MATH ---------- */
function gen_g2_math_L1(){
  const round = g23RoundNumber();
  const plus = round <= 5;
  let a = 20 + (round * 17);
  let b = 8 + (round * 9);
  if(!plus){
    a += 120;
    b += 35;
  }
  const q = plus ? `${a} + ${b} = ?` : `${a} − ${b} = ?`;
  const ans = plus ? (a+b) : (a-b);
  const choices = make3Choices(ans, 0, 300).map(String);
  return mcQuestion(q, String(ans), choices.filter(x=>x!==String(ans)).slice(0,2), `What is ${a} ${plus?"plus":"minus"} ${b}?`);
}

function gen_g2_math_L2(){
  const round = g23RoundNumber();
  const n = 100 + (round * 83) + (round % 3) * 7;
  const place = g23Pick(["ones","tens","hundreds","ones","tens","hundreds","ones","tens","hundreds","hundreds"]);
  const h = Math.floor(n/100);
  const t = Math.floor((n%100)/10);
  const o = n%10;
  const correct = place==="hundreds" ? h : place==="tens" ? t : o;
  const q = `Number: ${n}\nWhat digit is in the ${place.toUpperCase()} place?`;
  const opts = make3Choices(correct, 0, 9).map(String);
  return mcQuestion(q, String(correct), opts.filter(x=>x!==String(correct)).slice(0,2), "Find the digit in the place value.");
}

function gen_g2_math_L3(){
  // time to 5 minutes – we show digital and ask which is the same (simple)
  const hour = ((g23RoundNumber() + 2) % 12) + 1;
  const mins = g23Pick([0,5,10,15,20,25,30,35,40,45,50,55]);
  const mm = String(mins).padStart(2,"0");
  const correct = `${hour}:${mm}`;
  const wrong1 = `${hour}:${String((mins+5)%60).padStart(2,"0")}`;
  const wrong2 = `${((hour%12)+1)}:${mm}`;
  const q = `Pick the time that matches: ${hour}:${mm}`;
  return mcQuestion(q, correct, [wrong1, wrong2], "Choose the matching time.");
}

function gen_g2_math_L4(){
  const mode = g23Pick(["5","5","10","10","5","10","5","10","5","10"]);
  const step = Number(mode);
  const start = step === 5 ? (g23RoundNumber() - 1) * 5 : (g23RoundNumber() - 1) * 10;
  const missingIndex = Math.min(5, 1 + Math.ceil(g23RoundNumber() / 2));
  const seq = [];
  for(let i=0;i<6;i++) seq.push(start + i*step);
  const answer = seq[missingIndex];
  seq[missingIndex] = "__";
  const q = `Skip count by ${step}s:\n${seq.join(", ")}\nWhat number goes in the blank?`;
  const opts = make3Choices(answer, 0, 100).map(String);
  return mcQuestion(q, String(answer), opts.filter(x=>x!==String(answer)).slice(0,2), `Skip count by ${step}s. What number is missing?`);
}

function gen_g2_math_L5(){
  const problems = [
    {q:"Lia has 12 apples. She buys 8 more. How many apples now?", a:20},
    {q:"Ben has 30 stickers. He gives away 7. How many left?", a:23},
    {q:"A box has 15 crayons. Another box has 14 crayons. How many total?", a:29},
    {q:"There are 40 cookies. Kids eat 12. How many remain?", a:28},
    {q:"Mia reads 18 pages on Monday and 23 pages on Tuesday. How many pages total?", a:41},
    {q:"A class has 52 pencils. Students use 19. How many pencils are left?", a:33},
    {q:"Nora saves 35 shells and finds 28 more. How many shells now?", a:63},
    {q:"There are 74 tickets. The class uses 36. How many tickets remain?", a:38},
    {q:"A shelf has 46 books. Another shelf has 37 books. How many books total?", a:83},
    {q:"A farmer picks 95 berries and sells 48. How many berries are left?", a:47},
  ];
  const p = g23Pick(problems);
  const opts = make3Choices(p.a, 0, 60).map(String);
  return mcQuestion(p.q, String(p.a), opts.filter(x=>x!==String(p.a)).slice(0,2), "Solve the word problem.");
}
function gen_g2_math_L6(){
  const banks = [
    [{left:"Penny", right:"1 Cent"},{left:"Nickel", right:"5 Cents"},{left:"Dime", right:"10 Cents"}],
    [{left:"Quarter", right:"25 Cents"},{left:"Nickel", right:"5 Cents"},{left:"Penny", right:"1 Cent"}],
    [{left:"2 nickels", right:"10 Cents"},{left:"2 dimes", right:"20 Cents"},{left:"2 quarters", right:"50 Cents"}],
    [{left:"10 + 5", right:"15"},{left:"25 + 5", right:"30"},{left:"10 + 10", right:"20"}],
    [{left:"3 nickels", right:"15 Cents"},{left:"3 dimes", right:"30 Cents"},{left:"4 quarters", right:"1 Dollar"}],
    [{left:"$1", right:"100 Cents"},{left:"50 cents", right:"2 Quarters"},{left:"20 cents", right:"2 Dimes"}],
    [{left:"30 + 25", right:"55"},{left:"40 - 15", right:"25"},{left:"60 - 10", right:"50"}],
    [{left:"Half dollar", right:"50 Cents"},{left:"5 dimes", right:"50 Cents"},{left:"10 nickels", right:"50 Cents"}],
    [{left:"75 cents", right:"3 Quarters"},{left:"35 cents", right:"Quarter + Dime"},{left:"6 cents", right:"Nickel + Penny"}],
    [{left:"$1.25", right:"125 Cents"},{left:"$0.90", right:"90 Cents"},{left:"$0.45", right:"45 Cents"}]
  ];
  return matchQuestion(g23Pick(banks));
}

function gen_g2_math_L7(){
  const it = g23Pick([
    {q:"What is 23 + 44?", a:"67", w:["77","66","68"]},
    {q:"What is 29 + 39?", a:"68", w:["78","58","69"]},
    {q:"What is 48 - 19?", a:"29", w:["39","27","30"]},
    {q:"What is 37 + 28?", a:"65", w:["55","75","66"]},
    {q:"What is 92 - 46?", a:"46", w:["56","44","47"]},
    {q:"What is 125 + 34?", a:"159", w:["149","169","160"]},
    {q:"What is 180 - 65?", a:"115", w:["125","105","116"]},
    {q:"What is 246 + 38?", a:"284", w:["274","294","285"]},
    {q:"What is 300 - 128?", a:"172", w:["182","162","173"]},
    {q:"What is 175 + 149?", a:"324", w:["314","334","325"]}
  ]);

  return speedQuestion(it.q, it.a, it.w, 10);
}
/* ---------- GRADE 2 SCIENCE ---------- */
function gen_g2_sci_L1(){
  const qset = [
    {q:"Ice is a...", a:"Solid", w:["Liquid","Gas","Mixture"]},
    {q:"Water you can pour is a...", a:"Liquid", w:["Solid","Gas","Mixture"]},
    {q:"Air you breathe is a...", a:"Gas", w:["Solid","Liquid","Mixture"]},
    {q:"A solid keeps its...", a:"Shape", w:["Color","Size","Weight"]},
    {q:"Steam is water as a...", a:"Gas", w:["Solid","Liquid","Mixture"]},
    {q:"Melting changes ice into...", a:"Liquid water", w:["Ice","Steam","Snow"]},
    {q:"Freezing changes water into...", a:"Ice", w:["Steam","Rain","Liquid water"]},
    {q:"A liquid takes the shape of its...", a:"Container", w:["Color","Weight","Temperature"]},
    {q:"Matter can be solid, liquid, or...", a:"Gas", w:["Mixture","Energy","Light"]},
    {q:"Heating can change a liquid into a...", a:"Gas", w:["Solid","Ice","Mixture"]}
  ];
  const it = g23Pick(qset);
  return mcQuestion(it.q, it.a, it.w, "Choose the correct state of matter.");
}

function gen_g2_sci_L2(){
  const qset = [
    {q:"A salmon is a...", a:"Fish", w:["Bird","Mammal","Reptile"]},
    {q:"A robin is a...", a:"Bird", w:["Reptile","Fish","Amphibian"]},
    {q:"A snake is a...", a:"Reptile", w:["Bird","Insect","Amphibian"]},
    {q:"A frog is an...", a:"Amphibian", w:["Mammal","Fish","Reptile"]},
    {q:"A butterfly is an...", a:"Insect", w:["Fish","Bird","Reptile"]},
    {q:"A dog is a...", a:"Mammal", w:["Reptile","Amphibian","Insect"]},
    {q:"A lizard is a...", a:"Reptile", w:["Mammal","Bird","Amphibian"]},
    {q:"Animals with feathers are usually...", a:"Birds", w:["Fish","Insects","Reptile"]},
    {q:"Animals that live part of life in water and part on land can be...", a:"Amphibians", w:["Mammals","Birds","Reptile"]},
    {q:"Animals with six legs are usually...", a:"Insects", w:["Fish","Reptiles","Reptile"]}
  ];
  const it = g23Pick(qset);
  return mcQuestion(it.q, it.a, it.w, "Pick the animal group.");
}

function gen_g2_sci_L3(){
  const qset = [
    {q:"Butterfly life cycle starts as an...", a:"Egg", w:["Puppy","Seed","Roots"]},
    {q:"A tadpole grows into a...", a:"Frog", w:["Bird","Fish","Reptile"]},
    {q:"A caterpillar changes into a...", a:"Butterfly", w:["Snake","Frog","Larva"]},
    {q:"A seed can grow into a...", a:"Plant", w:["Rock","Cloud","Roots"]},
    {q:"A young frog is called a...", a:"Tadpole", w:["Calf","Chick","Larva"]},
    {q:"A butterfly changes inside a...", a:"Chrysalis", w:["Nest","Pond","Larva"]},
    {q:"A plant life cycle can begin with a...", a:"Seed", w:["Stone","Feather","Reptile"]},
    {q:"A chick hatches from an...", a:"Egg", w:["Leaf","Shell only","Roots"]},
    {q:"Living things grow and...", a:"Change", w:["Disappear","Melt","And"]},
    {q:"The adult stage comes after earlier life cycle...", a:"Stages", w:["Colors","Toys","Larva"]}
  ];
  const it = g23Pick(qset);
  return mcQuestion(it.q, it.a, it.w, "Think about life cycles.");
}

function gen_g2_sci_L4(){
  const qset = [
    {q:"Leaves help a plant make...", a:"Food", w:["Toys","Sand","Roots"]},
    {q:"Roots take in...", a:"Water", w:["Sunlight","Stars","Roots"]},
    {q:"The flower helps make...", a:"Seeds", w:["Rocks","Clouds","Roots"]},
    {q:"The stem helps carry...", a:"Water", w:["Cars","Music","Roots"]},
    {q:"Roots also help hold a plant in the...", a:"Soil", w:["Sky","Wind","Roots"]},
    {q:"A seed can grow into a new...", a:"Plant", w:["Fish","Rock","Reptile"]},
    {q:"Plants use sunlight, air, and water to make...", a:"Food", w:["Plastic","Sound","Roots"]},
    {q:"The stem supports the plant and carries...", a:"Water", w:["Sand","Toys","Roots"]},
    {q:"Flowers can help plants make...", a:"Seeds", w:["Clouds","Metal","Roots"]},
    {q:"Leaves take in light from the...", a:"Sun", w:["Moon","Soil","Roots"]}
  ];
  const it = g23Pick(qset);
  return mcQuestion(it.q, it.a, it.w, "Choose the correct plant part job.");
}

/* ---------- GRADE 3 ENGLISH ---------- */
function gen_g3_eng_L1(){
  const it = g23Pick([
    {q:"Which word has a short a sound?", a:"Cat", w:["Cake","Rain","Plain"]},
    {q:"Which word has a short i sound?", a:"Pig", w:["Bike","Time","Plain"]},
    {q:"Which word has a short o sound?", a:"Dog", w:["Rope","Home","Plain"]},
    {q:"Which word has a short a sound?", a:"Cat", w:["Cake","Rain","Plain"]},
    {q:"Which word has a short i sound?", a:"Pig", w:["Bike","Time","Plain"]},
    {q:"Which word has a short o sound?", a:"Dog", w:["Rope","Home","Plain"]},
    {q:"Which word has a short a sound?", a:"Cat", w:["Cake","Rain","Plain"]},
    {q:"Which word has a short i sound?", a:"Pig", w:["Bike","Time","Plain"]},
    {q:"Which word has a short o sound?", a:"Dog", w:["Rope","Home","Plain"]},
    {q:"Which word has a short a sound?", a:"Cat", w:["Cake","Rain","Plain"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Short vowel sounds.");
}

function gen_g3_eng_L2(){
  const it = g23Pick([
    {q:"Which word has a long a sound?", a:"Cake", w:["Cat","Ran","Plain"]},
    {q:"Which word has a long i sound?", a:"Bike", w:["Pig","Hit","Plain"]},
    {q:"Which word has a long o sound?", a:"Home", w:["Dog","Hop","Plain"]},
    {q:"Which word has a long a sound?", a:"Cake", w:["Cat","Ran","Plain"]},
    {q:"Which word has a long i sound?", a:"Bike", w:["Pig","Hit","Plain"]},
    {q:"Which word has a long o sound?", a:"Home", w:["Dog","Hop","Plain"]},
    {q:"Which word has a long a sound?", a:"Cake", w:["Cat","Ran","Plain"]},
    {q:"Which word has a long i sound?", a:"Bike", w:["Pig","Hit","Plain"]},
    {q:"Which word has a long o sound?", a:"Home", w:["Dog","Hop","Plain"]},
    {q:"Which word has a long a sound?", a:"Cake", w:["Cat","Ran","Plain"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L3(){
  const it = g23Pick([
    {q:"Fill in the long vowel word: c___ke", a:"a"},
    {q:"Fill in the short vowel word: p___g", a:"i"},
    {q:"Fill in the long vowel word: h___me", a:"o"},
    {q:"Fill in the short vowel word: d___g", a:"o"},
    {q:"Fill in the long vowel word: c___ke", a:"a"},
    {q:"Fill in the short vowel word: p___g", a:"i"},
    {q:"Fill in the long vowel word: h___me", a:"o"},
    {q:"Fill in the short vowel word: d___g", a:"o"},
    {q:"Fill in the long vowel word: c___ke", a:"a"},
    {q:"Fill in the short vowel word: p___g", a:"i"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L4(){
  return matchQuestion([
    {left:"cat", right:"short a"},
    {left:"pig", right:"short i"},
    {left:"dog", right:"short o"},
    {left:"sun", right:"short u"},
    {left:"cat", right:"short a"},
    {left:"pig", right:"short i"},
    {left:"dog", right:"short o"},
    {left:"sun", right:"short u"},
    {left:"cat", right:"short a"},
    {left:"pig", right:"short i"}
  ]);
}

function gen_g3_eng_L5(){
  const it = g23Pick([
    {bad:"cak has a long a sound", good:"Cake has a long a sound."},
    {bad:"bike has a long i sound", good:"Bike has a long i sound."},
    {bad:"home has a long o sound", good:"Home has a long o sound."},
    {bad:"cak has a long a sound", good:"Cake has a long a sound."},
    {bad:"bike has a long i sound", good:"Bike has a long i sound."},
    {bad:"home has a long o sound", good:"Home has a long o sound."},
    {bad:"cak has a long a sound", good:"Cake has a long a sound."},
    {bad:"bike has a long i sound", good:"Bike has a long i sound."},
    {bad:"home has a long o sound", good:"Home has a long o sound."},
    {bad:"cak has a long a sound", good:"Cake has a long a sound."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L6(){
  const it = g23Pick([
    {q:"Which word has a short e sound?", a:"Bed", w:["Bead","Bee","Plain"]},
    {q:"Which word has a short u sound?", a:"Cup", w:["Cute","Mule","Plain"]},
    {q:"Which word has a short o sound?", a:"Fox", w:["Rope","Coat","Plain"]},
    {q:"Which word has a short e sound?", a:"Bed", w:["Bead","Bee","Plain"]},
    {q:"Which word has a short u sound?", a:"Cup", w:["Cute","Mule","Plain"]},
    {q:"Which word has a short o sound?", a:"Fox", w:["Rope","Coat","Plain"]},
    {q:"Which word has a short e sound?", a:"Bed", w:["Bead","Bee","Plain"]},
    {q:"Which word has a short u sound?", a:"Cup", w:["Cute","Mule","Plain"]},
    {q:"Which word has a short o sound?", a:"Fox", w:["Rope","Coat","Plain"]},
    {q:"Which word has a short e sound?", a:"Bed", w:["Bead","Bee","Plain"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Vowel review.");
}

function gen_g3_eng_L7(){
  const it = g23Pick([
    {q:"Which word begins with a blend?", a:"Stop", w:["Ship","Chat","Blend"]},
    {q:"Which word begins with a blend?", a:"Frog", w:["Thin","Shop","Blend"]},
    {q:"Which word begins with a blend?", a:"Clap", w:["Chin","That","Blend"]},
    {q:"Which word begins with a blend?", a:"Stop", w:["Ship","Chat","Blend"]},
    {q:"Which word begins with a blend?", a:"Frog", w:["Thin","Shop","Blend"]},
    {q:"Which word begins with a blend?", a:"Clap", w:["Chin","That","Blend"]},
    {q:"Which word begins with a blend?", a:"Stop", w:["Ship","Chat","Blend"]},
    {q:"Which word begins with a blend?", a:"Frog", w:["Thin","Shop","Blend"]},
    {q:"Which word begins with a blend?", a:"Clap", w:["Chin","That","Blend"]},
    {q:"Which word begins with a blend?", a:"Stop", w:["Ship","Chat","Blend"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L8(){
  const it = g23Pick([
    {q:"The digraph in 'ship' is ___", a:"sh"},
    {q:"The digraph in 'chat' is ___", a:"ch"},
    {q:"The digraph in 'thin' is ___", a:"th"},
    {q:"The digraph in 'wheel' is ___", a:"wh"},
    {q:"The digraph in 'ship' is ___", a:"sh"},
    {q:"The digraph in 'chat' is ___", a:"ch"},
    {q:"The digraph in 'thin' is ___", a:"th"},
    {q:"The digraph in 'wheel' is ___", a:"wh"},
    {q:"The digraph in 'ship' is ___", a:"sh"},
    {q:"The digraph in 'chat' is ___", a:"ch"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L9(){
  return matchQuestion([
    {left:"sh", right:"ship"},
    {left:"ch", right:"chat"},
    {left:"th", right:"thin"},
    {left:"wh", right:"wheel"},
    {left:"sh", right:"ship"},
    {left:"ch", right:"chat"},
    {left:"th", right:"thin"},
    {left:"wh", right:"wheel"},
    {left:"sh", right:"ship"},
    {left:"ch", right:"chat"}
  ]);
}

function gen_g3_eng_L10(){
  const it = g23Pick([
    {bad:"sh is a blend", good:"Sh is a digraph."},
    {bad:"st in stop is a digraph", good:"St in stop is a blend."},
    {bad:"ch in chat is a blend", good:"Ch in chat is a digraph."},
    {bad:"sh is a blend", good:"Sh is a digraph."},
    {bad:"st in stop is a digraph", good:"St in stop is a blend."},
    {bad:"ch in chat is a blend", good:"Ch in chat is a digraph."},
    {bad:"sh is a blend", good:"Sh is a digraph."},
    {bad:"st in stop is a digraph", good:"St in stop is a blend."},
    {bad:"ch in chat is a blend", good:"Ch in chat is a digraph."},
    {bad:"sh is a blend", good:"Sh is a digraph."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}
/* ===========================
   GRADE 3 ENGLISH L11-L20
   =========================== */

function gen_g3_eng_L11(){
  const it = g23Pick([
    {q:"Which word ends with a blend?", a:"Milk", w:["Ship","Chat","Blend"]},
    {q:"Which word ends with a blend?", a:"Hand", w:["Thin","Wish","Blend"]},
    {q:"Which word ends with a blend?", a:"Jump", w:["Chin","Shop","Blend"]},
    {q:"Which word ends with a blend?", a:"Milk", w:["Ship","Chat","Blend"]},
    {q:"Which word ends with a blend?", a:"Hand", w:["Thin","Wish","Blend"]},
    {q:"Which word ends with a blend?", a:"Jump", w:["Chin","Shop","Blend"]},
    {q:"Which word ends with a blend?", a:"Milk", w:["Ship","Chat","Blend"]},
    {q:"Which word ends with a blend?", a:"Hand", w:["Thin","Wish","Blend"]},
    {q:"Which word ends with a blend?", a:"Jump", w:["Chin","Shop","Blend"]},
    {q:"Which word ends with a blend?", a:"Milk", w:["Ship","Chat","Blend"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Ending blends.");
}

function gen_g3_eng_L12(){
  const it = g23Pick([
    {q:"Which word has a blend?", a:"Flag", w:["Ship","Chat","Blend"]},
    {q:"Which word has a blend?", a:"Brick", w:["Thin","Wheel","Blend"]},
    {q:"Which word has a blend?", a:"Slide", w:["Chin","Shop","Blend"]},
    {q:"Which word has a blend?", a:"Flag", w:["Ship","Chat","Blend"]},
    {q:"Which word has a blend?", a:"Brick", w:["Thin","Wheel","Blend"]},
    {q:"Which word has a blend?", a:"Slide", w:["Chin","Shop","Blend"]},
    {q:"Which word has a blend?", a:"Flag", w:["Ship","Chat","Blend"]},
    {q:"Which word has a blend?", a:"Brick", w:["Thin","Wheel","Blend"]},
    {q:"Which word has a blend?", a:"Slide", w:["Chin","Shop","Blend"]},
    {q:"Which word has a blend?", a:"Flag", w:["Ship","Chat","Blend"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L13(){
  const it = g23Pick([
    {q:"The vowel pattern in 'ball' is ___", a:"all"},
    {q:"The vowel pattern in 'talk' is ___", a:"alk"},
    {q:"The vowel pattern in 'walk' is ___", a:"alk"},
    {q:"The vowel pattern in 'salt' is ___", a:"alt"},
    {q:"The vowel pattern in 'ball' is ___", a:"all"},
    {q:"The vowel pattern in 'talk' is ___", a:"alk"},
    {q:"The vowel pattern in 'walk' is ___", a:"alk"},
    {q:"The vowel pattern in 'salt' is ___", a:"alt"},
    {q:"The vowel pattern in 'ball' is ___", a:"all"},
    {q:"The vowel pattern in 'talk' is ___", a:"alk"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L14(){
  return matchQuestion([
    {left:"oi", right:"coin"},
    {left:"oy", right:"toy"},
    {left:"ou", right:"cloud"},
    {left:"ow", right:"cow"},
    {left:"oi", right:"coin"},
    {left:"oy", right:"toy"},
    {left:"ou", right:"cloud"},
    {left:"ow", right:"cow"},
    {left:"oi", right:"coin"},
    {left:"oy", right:"toy"}
  ]);
}

function gen_g3_eng_L15(){
  const it = g23Pick([
    {bad:"the r in car changes the vowel sound", good:"The r in car changes the vowel sound."},
    {bad:"star has an r controlled vowel", good:"Star has an r-controlled vowel."},
    {bad:"bird has an r controlled vowel", good:"Bird has an r-controlled vowel."},
    {bad:"the r in car changes the vowel sound", good:"The r in car changes the vowel sound."},
    {bad:"star has an r controlled vowel", good:"Star has an r-controlled vowel."},
    {bad:"bird has an r controlled vowel", good:"Bird has an r-controlled vowel."},
    {bad:"the r in car changes the vowel sound", good:"The r in car changes the vowel sound."},
    {bad:"star has an r controlled vowel", good:"Star has an r-controlled vowel."},
    {bad:"bird has an r controlled vowel", good:"Bird has an r-controlled vowel."},
    {bad:"the r in car changes the vowel sound", good:"The r in car changes the vowel sound."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L16(){
  const it = g23Pick([
    {q:"Which word has an r-controlled vowel?", a:"Fork", w:["Cake","Pig","Plain"]},
    {q:"Which word has a diphthong?", a:"Coin", w:["Cat","Bed","Nickel"]},
    {q:"Which word has a variant vowel?", a:"Ball", w:["Pen","Sun","Plain"]},
    {q:"Which word has an r-controlled vowel?", a:"Fork", w:["Cake","Pig","Plain"]},
    {q:"Which word has a diphthong?", a:"Coin", w:["Cat","Bed","Nickel"]},
    {q:"Which word has a variant vowel?", a:"Ball", w:["Pen","Sun","Plain"]},
    {q:"Which word has an r-controlled vowel?", a:"Fork", w:["Cake","Pig","Plain"]},
    {q:"Which word has a diphthong?", a:"Coin", w:["Cat","Bed","Nickel"]},
    {q:"Which word has a variant vowel?", a:"Ball", w:["Pen","Sun","Plain"]},
    {q:"Which word has an r-controlled vowel?", a:"Fork", w:["Cake","Pig","Plain"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Vowel patterns.");
}

function gen_g3_eng_L17(){
  const it = g23Pick([
    {q:"Which word has an ar sound?", a:"Star", w:["Bird","Fork","Reptile"]},
    {q:"Which word has an er sound?", a:"Her", w:["Car","Horn","Plain"]},
    {q:"Which word has an or sound?", a:"Fork", w:["Bird","Star","Reptile"]},
    {q:"Which word has an ar sound?", a:"Star", w:["Bird","Fork","Reptile"]},
    {q:"Which word has an er sound?", a:"Her", w:["Car","Horn","Plain"]},
    {q:"Which word has an or sound?", a:"Fork", w:["Bird","Star","Reptile"]},
    {q:"Which word has an ar sound?", a:"Star", w:["Bird","Fork","Reptile"]},
    {q:"Which word has an er sound?", a:"Her", w:["Car","Horn","Plain"]},
    {q:"Which word has an or sound?", a:"Fork", w:["Bird","Star","Reptile"]},
    {q:"Which word has an ar sound?", a:"Star", w:["Bird","Fork","Reptile"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L18(){
  const it = g23Pick([
    {q:"The r-controlled vowel in 'bird' is ___", a:"ir"},
    {q:"The r-controlled vowel in 'car' is ___", a:"ar"},
    {q:"The r-controlled vowel in 'fork' is ___", a:"or"},
    {q:"The r-controlled vowel in 'her' is ___", a:"er"},
    {q:"The r-controlled vowel in 'bird' is ___", a:"ir"},
    {q:"The r-controlled vowel in 'car' is ___", a:"ar"},
    {q:"The r-controlled vowel in 'fork' is ___", a:"or"},
    {q:"The r-controlled vowel in 'her' is ___", a:"er"},
    {q:"The r-controlled vowel in 'bird' is ___", a:"ir"},
    {q:"The r-controlled vowel in 'car' is ___", a:"ar"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L19(){
  return matchQuestion([
    {left:"basketball", right:"3 syllables"},
    {left:"computer", right:"3 syllables"},
    {left:"banana", right:"3 syllables"},
    {left:"elephant", right:"3 syllables"},
    {left:"basketball", right:"3 syllables"},
    {left:"computer", right:"3 syllables"},
    {left:"banana", right:"3 syllables"},
    {left:"elephant", right:"3 syllables"},
    {left:"basketball", right:"3 syllables"},
    {left:"computer", right:"3 syllables"}
  ]);
}

function gen_g3_eng_L20(){
  const it = g23Pick([
    {bad:"banana has two syllables", good:"Banana has three syllables."},
    {bad:"computer has one syllable", good:"Computer has three syllables."},
    {bad:"elephant has two syllables", good:"Elephant has three syllables."},
    {bad:"banana has two syllables", good:"Banana has three syllables."},
    {bad:"computer has one syllable", good:"Computer has three syllables."},
    {bad:"elephant has two syllables", good:"Elephant has three syllables."},
    {bad:"banana has two syllables", good:"Banana has three syllables."},
    {bad:"computer has one syllable", good:"Computer has three syllables."},
    {bad:"elephant has two syllables", good:"Elephant has three syllables."},
    {bad:"banana has two syllables", good:"Banana has three syllables."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

/* ===========================
   GRADE 3 ENGLISH L21-L30
   =========================== */

function gen_g3_eng_L21(){
  const it = g23Pick([
    {q:"Which word begins with an open syllable?", a:"Tiger", w:["Cat","Dog","Plain"]},
    {q:"Which word has an open first syllable?", a:"Robot", w:["Frog","Stop","Plain"]},
    {q:"Which word has an open syllable?", a:"Music", w:["Hand","Jump","Plain"]},
    {q:"Which word begins with an open syllable?", a:"Tiger", w:["Cat","Dog","Plain"]},
    {q:"Which word has an open first syllable?", a:"Robot", w:["Frog","Stop","Plain"]},
    {q:"Which word has an open syllable?", a:"Music", w:["Hand","Jump","Plain"]},
    {q:"Which word begins with an open syllable?", a:"Tiger", w:["Cat","Dog","Plain"]},
    {q:"Which word has an open first syllable?", a:"Robot", w:["Frog","Stop","Plain"]},
    {q:"Which word has an open syllable?", a:"Music", w:["Hand","Jump","Plain"]},
    {q:"Which word begins with an open syllable?", a:"Tiger", w:["Cat","Dog","Plain"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Open syllables.");
}

function gen_g3_eng_L22() {
  const it = g23Pick([
    {q:"Which word begins with a closed syllable?", a:"Rabbit", w:["Tiger","Music","Plain"]},
    {q:"Which word has a closed first syllable?", a:"Picnic", w:["Robot","Basic","Plain"]},
    {q:"Which word has a closed syllable?", a:"Sunset", w:["Paper","Later","Plain"]},
    {q:"Which word begins with a closed syllable?", a:"Rabbit", w:["Tiger","Music","Plain"]},
    {q:"Which word has a closed first syllable?", a:"Picnic", w:["Robot","Basic","Plain"]},
    {q:"Which word has a closed syllable?", a:"Sunset", w:["Paper","Later","Plain"]},
    {q:"Which word begins with a closed syllable?", a:"Rabbit", w:["Tiger","Music","Plain"]},
    {q:"Which word has a closed first syllable?", a:"Picnic", w:["Robot","Basic","Plain"]},
    {q:"Which word has a closed syllable?", a:"Sunset", w:["Paper","Later","Plain"]},
    {q:"Which word begins with a closed syllable?", a:"Rabbit", w:["Tiger","Music","Plain"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L23(){
  const it = g23Pick([
    {q:"Divide the word: basket", a:"bas-ket"},
    {q:"Divide the word: rabbit", a:"rab-bit"},
    {q:"Divide the word: sunset", a:"sun-set"},
    {q:"Divide the word: picnic", a:"pic-nic"},
    {q:"Divide the word: basket", a:"bas-ket"},
    {q:"Divide the word: rabbit", a:"rab-bit"},
    {q:"Divide the word: sunset", a:"sun-set"},
    {q:"Divide the word: picnic", a:"pic-nic"},
    {q:"Divide the word: basket", a:"bas-ket"},
    {q:"Divide the word: rabbit", a:"rab-bit"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L24(){
  return matchQuestion([
    {left:"bas-ket", right:"basket"},
    {left:"rab-bit", right:"rabbit"},
    {left:"sun-set", right:"sunset"},
    {left:"pic-nic", right:"picnic"},
    {left:"bas-ket", right:"basket"},
    {left:"rab-bit", right:"rabbit"},
    {left:"sun-set", right:"sunset"},
    {left:"pic-nic", right:"picnic"},
    {left:"bas-ket", right:"basket"},
    {left:"rab-bit", right:"rabbit"}
  ]);
}

function gen_g3_eng_L25(){
  const it = g23Pick([
    {bad:"said follows regular spelling rules", good:"Said is an irregular word."},
    {bad:"does is easy to sound out", good:"Does is an irregular word."},
    {bad:"one follows normal phonics rules", good:"One is an irregular word."},
    {bad:"said follows regular spelling rules", good:"Said is an irregular word."},
    {bad:"does is easy to sound out", good:"Does is an irregular word."},
    {bad:"one follows normal phonics rules", good:"One is an irregular word."},
    {bad:"said follows regular spelling rules", good:"Said is an irregular word."},
    {bad:"does is easy to sound out", good:"Does is an irregular word."},
    {bad:"one follows normal phonics rules", good:"One is an irregular word."},
    {bad:"said follows regular spelling rules", good:"Said is an irregular word."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L26(){
  const it = g23Pick([
    {q:"Which is an irregular word?", a:"Said", w:["Cat","Dog","4/4"]},
    {q:"Which is an irregular word?", a:"Does", w:["Run","Jump","4/4"]},
    {q:"Which is an irregular word?", a:"One", w:["Sun","Bed","4/4"]},
    {q:"Which is an irregular word?", a:"Said", w:["Cat","Dog","4/4"]},
    {q:"Which is an irregular word?", a:"Does", w:["Run","Jump","4/4"]},
    {q:"Which is an irregular word?", a:"One", w:["Sun","Bed","4/4"]},
    {q:"Which is an irregular word?", a:"Said", w:["Cat","Dog","4/4"]},
    {q:"Which is an irregular word?", a:"Does", w:["Run","Jump","4/4"]},
    {q:"Which is an irregular word?", a:"One", w:["Sun","Bed","4/4"]},
    {q:"Which is an irregular word?", a:"Said", w:["Cat","Dog","4/4"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Irregular words.");
}

function gen_g3_eng_L27(){
  const it = g23Pick([
    {q:"Which high-frequency word is correct?", a:"Because", w:["Becus","Becose","Correct"]},
    {q:"Which high-frequency word is correct?", a:"People", w:["Peeple","Pepol","Correct"]},
    {q:"Which high-frequency word is correct?", a:"Friend", w:["Frend","Freind","Correct"]},
    {q:"Which high-frequency word is correct?", a:"Because", w:["Becus","Becose","Correct"]},
    {q:"Which high-frequency word is correct?", a:"People", w:["Peeple","Pepol","Correct"]},
    {q:"Which high-frequency word is correct?", a:"Friend", w:["Frend","Freind","Correct"]},
    {q:"Which high-frequency word is correct?", a:"Because", w:["Becus","Becose","Correct"]},
    {q:"Which high-frequency word is correct?", a:"People", w:["Peeple","Pepol","Correct"]},
    {q:"Which high-frequency word is correct?", a:"Friend", w:["Frend","Freind","Correct"]},
    {q:"Which high-frequency word is correct?", a:"Because", w:["Becus","Becose","Correct"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L28(){
  const it = g23Pick([
    {q:"Complete the word: bec___se", a:"au"},
    {q:"Complete the word: fri___nd", a:"e"},
    {q:"Complete the word: peo___le", a:"p"},
    {q:"Complete the word: d___es", a:"o"},
    {q:"Complete the word: bec___se", a:"au"},
    {q:"Complete the word: fri___nd", a:"e"},
    {q:"Complete the word: peo___le", a:"p"},
    {q:"Complete the word: d___es", a:"o"},
    {q:"Complete the word: bec___se", a:"au"},
    {q:"Complete the word: fri___nd", a:"e"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L29(){
  return matchQuestion([
    {left:"said", right:"irregular"},
    {left:"does", right:"irregular"},
    {left:"friend", right:"high-frequency"},
    {left:"people", right:"high-frequency"},
    {left:"said", right:"irregular"},
    {left:"does", right:"irregular"},
    {left:"friend", right:"high-frequency"},
    {left:"people", right:"high-frequency"},
    {left:"said", right:"irregular"},
    {left:"does", right:"irregular"}
  ]);
}

function gen_g3_eng_L30(){
  const it = g23Pick([
    {bad:"freind is spelled correctly", good:"Friend is spelled correctly."},
    {bad:"pepol is the correct spelling", good:"People is the correct spelling."},
    {bad:"becus is the correct spelling", good:"Because is the correct spelling."},
    {bad:"freind is spelled correctly", good:"Friend is spelled correctly."},
    {bad:"pepol is the correct spelling", good:"People is the correct spelling."},
    {bad:"becus is the correct spelling", good:"Because is the correct spelling."},
    {bad:"freind is spelled correctly", good:"Friend is spelled correctly."},
    {bad:"pepol is the correct spelling", good:"People is the correct spelling."},
    {bad:"becus is the correct spelling", good:"Because is the correct spelling."},
    {bad:"freind is spelled correctly", good:"Friend is spelled correctly."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}
/* ===========================
   GRADE 3 ENGLISH L31-L60
   =========================== */

function gen_g3_eng_L31(){
  const it = g23Pick([
    {q:"The main idea tells what the text is mostly about.", a:"True", w:["False","Maybe","Small detail"]},
    {q:"Which is a main idea?", a:"Dogs make good pets.", w:["The dog is brown.","The dog has a collar.","Small detail"]},
    {q:"A main idea is supported by…", a:"Details", w:["Titles","Commas","Small detail"]},
    {q:"The main idea tells what the text is mostly about.", a:"True", w:["False","Maybe","Small detail"]},
    {q:"Which is a main idea?", a:"Dogs make good pets.", w:["The dog is brown.","The dog has a collar.","Small detail"]},
    {q:"A main idea is supported by…", a:"Details", w:["Titles","Commas","Small detail"]},
    {q:"The main idea tells what the text is mostly about.", a:"True", w:["False","Maybe","Small detail"]},
    {q:"Which is a main idea?", a:"Dogs make good pets.", w:["The dog is brown.","The dog has a collar.","Small detail"]},
    {q:"A main idea is supported by…", a:"Details", w:["Titles","Commas","Small detail"]},
    {q:"The main idea tells what the text is mostly about.", a:"True", w:["False","Maybe","Small detail"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Main idea.");
}

function gen_g3_eng_L32(){
  const it = g23Pick([
    {q:"A supporting detail should…", a:"Help the main idea", w:["Change the topic","End the story","Small detail"]},
    {q:"Which supports 'Cats are playful'?", a:"Cats chase toys.", w:["Cars are fast.","Birds fly.","Reptile"]},
    {q:"Details give…", a:"More information", w:["Less information","No information","Cover color"]},
    {q:"A supporting detail should…", a:"Help the main idea", w:["Change the topic","End the story","Small detail"]},
    {q:"Which supports 'Cats are playful'?", a:"Cats chase toys.", w:["Cars are fast.","Birds fly.","Reptile"]},
    {q:"Details give…", a:"More information", w:["Less information","No information","Cover color"]},
    {q:"A supporting detail should…", a:"Help the main idea", w:["Change the topic","End the story","Small detail"]},
    {q:"Which supports 'Cats are playful'?", a:"Cats chase toys.", w:["Cars are fast.","Birds fly.","Reptile"]},
    {q:"Details give…", a:"More information", w:["Less information","No information","Cover color"]},
    {q:"A supporting detail should…", a:"Help the main idea", w:["Change the topic","End the story","Small detail"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L33(){
  const it = g23Pick([
    {q:"Main idea: Bees help plants grow. Detail: Bees carry ___.", a:"pollen"},
    {q:"Main idea: Exercise is healthy. Detail: Running makes your heart ___.", a:"stronger"},
    {q:"Main idea: Reading is helpful. Detail: Books teach us new ___.", a:"things"},
    {q:"Main idea: Bees help plants grow. Detail: Bees carry ___.", a:"pollen"},
    {q:"Main idea: Exercise is healthy. Detail: Running makes your heart ___.", a:"stronger"},
    {q:"Main idea: Reading is helpful. Detail: Books teach us new ___.", a:"things"},
    {q:"Main idea: Bees help plants grow. Detail: Bees carry ___.", a:"pollen"},
    {q:"Main idea: Exercise is healthy. Detail: Running makes your heart ___.", a:"stronger"},
    {q:"Main idea: Reading is helpful. Detail: Books teach us new ___.", a:"things"},
    {q:"Main idea: Bees help plants grow. Detail: Bees carry ___.", a:"pollen"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L34(){
  return matchQuestion([
    {left:"Main Idea", right:"What the text is mostly about"},
    {left:"Detail", right:"Supports the main idea"},
    {left:"Title", right:"Names the text"},
    {left:"Topic", right:"Subject of the text"},
    {left:"Main Idea", right:"What the text is mostly about"},
    {left:"Detail", right:"Supports the main idea"},
    {left:"Title", right:"Names the text"},
    {left:"Topic", right:"Subject of the text"},
    {left:"Main Idea", right:"What the text is mostly about"},
    {left:"Detail", right:"Supports the main idea"}
  ]);
}

function gen_g3_eng_L35(){
  const it = g23Pick([
    {bad:"details are not important", good:"Details are important."},
    {bad:"the main idea is always a tiny fact", good:"The main idea is what the text is mostly about."},
    {bad:"supporting details change the topic", good:"Supporting details help the main idea."},
    {bad:"details are not important", good:"Details are important."},
    {bad:"the main idea is always a tiny fact", good:"The main idea is what the text is mostly about."},
    {bad:"supporting details change the topic", good:"Supporting details help the main idea."},
    {bad:"details are not important", good:"Details are important."},
    {bad:"the main idea is always a tiny fact", good:"The main idea is what the text is mostly about."},
    {bad:"supporting details change the topic", good:"Supporting details help the main idea."},
    {bad:"details are not important", good:"Details are important."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L36(){
  const it = g23Pick([
    {q:"Which detail supports: Plants need water?", a:"Rain helps plants grow.", w:["Fish swim fast.","The pencil is red.","Reptile"]},
    {q:"Which detail supports: School is important?", a:"Students learn new skills.", w:["Pizza is hot.","Dogs bark loudly.","Small detail"]},
    {q:"Which detail supports: Birds can fly?", a:"They use wings.", w:["Shoes have laces.","Cars need gas.","Friction"]},
    {q:"Which detail supports: Plants need water?", a:"Rain helps plants grow.", w:["Fish swim fast.","The pencil is red.","Reptile"]},
    {q:"Which detail supports: School is important?", a:"Students learn new skills.", w:["Pizza is hot.","Dogs bark loudly.","Small detail"]},
    {q:"Which detail supports: Birds can fly?", a:"They use wings.", w:["Shoes have laces.","Cars need gas.","Friction"]},
    {q:"Which detail supports: Plants need water?", a:"Rain helps plants grow.", w:["Fish swim fast.","The pencil is red.","Reptile"]},
    {q:"Which detail supports: School is important?", a:"Students learn new skills.", w:["Pizza is hot.","Dogs bark loudly.","Small detail"]},
    {q:"Which detail supports: Birds can fly?", a:"They use wings.", w:["Shoes have laces.","Cars need gas.","Friction"]},
    {q:"Which detail supports: Plants need water?", a:"Rain helps plants grow.", w:["Fish swim fast.","The pencil is red.","Reptile"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Main idea review.");
}

function gen_g3_eng_L37(){
  const it = g23Pick([
    {q:"If Sam grabs an umbrella, you can infer it might…", a:"Rain", w:["Snow inside","Be sunny forever","A guess without clues"]},
    {q:"If Mia smiles after opening a gift, she feels…", a:"Happy", w:["Angry","Sleepy","Feels"]},
    {q:"An inference uses clues and…", a:"What you know", w:["Random guesses","Spelling rules","A guess without clues"]},
    {q:"If Sam grabs an umbrella, you can infer it might…", a:"Rain", w:["Snow inside","Be sunny forever","A guess without clues"]},
    {q:"If Mia smiles after opening a gift, she feels…", a:"Happy", w:["Angry","Sleepy","Feels"]},
    {q:"An inference uses clues and…", a:"What you know", w:["Random guesses","Spelling rules","A guess without clues"]},
    {q:"If Sam grabs an umbrella, you can infer it might…", a:"Rain", w:["Snow inside","Be sunny forever","A guess without clues"]},
    {q:"If Mia smiles after opening a gift, she feels…", a:"Happy", w:["Angry","Sleepy","Feels"]},
    {q:"An inference uses clues and…", a:"What you know", w:["Random guesses","Spelling rules","A guess without clues"]},
    {q:"If Sam grabs an umbrella, you can infer it might…", a:"Rain", w:["Snow inside","Be sunny forever","A guess without clues"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L38(){
  const it = g23Pick([
    {q:"Text clues help readers make an ___.", a:"inference"},
    {q:"If a character is shaking, they may feel ___.", a:"scared"},
    {q:"If the sidewalk is wet, it may have ___.", a:"rained"},
    {q:"Text clues help readers make an ___.", a:"inference"},
    {q:"If a character is shaking, they may feel ___.", a:"scared"},
    {q:"If the sidewalk is wet, it may have ___.", a:"rained"},
    {q:"Text clues help readers make an ___.", a:"inference"},
    {q:"If a character is shaking, they may feel ___.", a:"scared"},
    {q:"If the sidewalk is wet, it may have ___.", a:"rained"},
    {q:"Text clues help readers make an ___.", a:"inference"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L39(){
  return matchQuestion([
    {left:"Be kind to others", right:"Theme"},
    {left:"The boy found a dog", right:"Detail"},
    {left:"Never give up", right:"Theme"},
    {left:"The story happens at school", right:"Setting"},
    {left:"Be kind to others", right:"Theme"},
    {left:"The boy found a dog", right:"Detail"},
    {left:"Never give up", right:"Theme"},
    {left:"The story happens at school", right:"Setting"},
    {left:"Be kind to others", right:"Theme"},
    {left:"The boy found a dog", right:"Detail"}
  ]);
}

function gen_g3_eng_L40(){
  const it = g23Pick([
    {bad:"theme is only the title", good:"Theme is the lesson or message of a story."},
    {bad:"inference means copying one sentence", good:"Inference means using clues and what you know."},
    {bad:"text clues do not help readers", good:"Text clues help readers understand meaning."},
    {bad:"theme is only the title", good:"Theme is the lesson or message of a story."},
    {bad:"inference means copying one sentence", good:"Inference means using clues and what you know."},
    {bad:"text clues do not help readers", good:"Text clues help readers understand meaning."},
    {bad:"theme is only the title", good:"Theme is the lesson or message of a story."},
    {bad:"inference means copying one sentence", good:"Inference means using clues and what you know."},
    {bad:"text clues do not help readers", good:"Text clues help readers understand meaning."},
    {bad:"theme is only the title", good:"Theme is the lesson or message of a story."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L41(){
  const it = g23Pick([
    {q:"If a character stomps away, they may feel…", a:"Angry", w:["Excited","Hungry","Feel"]},
    {q:"If a character whispers, they may be trying to be…", a:"Quiet", w:["Loud","Fast","Trying"]},
    {q:"If a character studies hard, they are likely…", a:"Responsible", w:["Careless","Lazy","Likely"]},
    {q:"If a character stomps away, they may feel…", a:"Angry", w:["Excited","Hungry","Feel"]},
    {q:"If a character whispers, they may be trying to be…", a:"Quiet", w:["Loud","Fast","Trying"]},
    {q:"If a character studies hard, they are likely…", a:"Responsible", w:["Careless","Lazy","Likely"]},
    {q:"If a character stomps away, they may feel…", a:"Angry", w:["Excited","Hungry","Feel"]},
    {q:"If a character whispers, they may be trying to be…", a:"Quiet", w:["Loud","Fast","Trying"]},
    {q:"If a character studies hard, they are likely…", a:"Responsible", w:["Careless","Lazy","Likely"]},
    {q:"If a character stomps away, they may feel…", a:"Angry", w:["Excited","Hungry","Feel"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Infer meaning.");
}

function gen_g3_eng_L42(){
  const it = g23Pick([
    {q:"A theme is usually…", a:"A lesson", w:["A comma","A spelling word","Setting only"]},
    {q:"Inference uses…", a:"Clues", w:["Only pictures","Nothing","A guess without clues"]},
    {q:"If a character shares, the theme may be…", a:"Kindness", w:["Weather","Money","Setting only"]},
    {q:"A theme is usually…", a:"A lesson", w:["A comma","A spelling word","Setting only"]},
    {q:"Inference uses…", a:"Clues", w:["Only pictures","Nothing","A guess without clues"]},
    {q:"If a character shares, the theme may be…", a:"Kindness", w:["Weather","Money","Setting only"]},
    {q:"A theme is usually…", a:"A lesson", w:["A comma","A spelling word","Setting only"]},
    {q:"Inference uses…", a:"Clues", w:["Only pictures","Nothing","A guess without clues"]},
    {q:"If a character shares, the theme may be…", a:"Kindness", w:["Weather","Money","Setting only"]},
    {q:"A theme is usually…", a:"A lesson", w:["A comma","A spelling word","Setting only"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L43(){
  const it = g23Pick([
    {q:"Authors write to inform, entertain, or ___.", a:"persuade"},
    {q:"A funny story is usually written to ___.", a:"entertain"},
    {q:"A fact article is usually written to ___.", a:"inform"},
    {q:"Authors write to inform, entertain, or ___.", a:"persuade"},
    {q:"A funny story is usually written to ___.", a:"entertain"},
    {q:"A fact article is usually written to ___.", a:"inform"},
    {q:"Authors write to inform, entertain, or ___.", a:"persuade"},
    {q:"A funny story is usually written to ___.", a:"entertain"},
    {q:"A fact article is usually written to ___.", a:"inform"},
    {q:"Authors write to inform, entertain, or ___.", a:"persuade"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L44(){
  return matchQuestion([
    {left:"Persuade", right:"Convince the reader"},
    {left:"Inform", right:"Teach facts"},
    {left:"Entertain", right:"Tell a fun story"},
    {left:"Purpose", right:"Reason for writing"},
    {left:"Persuade", right:"Convince the reader"},
    {left:"Inform", right:"Teach facts"},
    {left:"Entertain", right:"Tell a fun story"},
    {left:"Purpose", right:"Reason for writing"},
    {left:"Persuade", right:"Convince the reader"},
    {left:"Inform", right:"Teach facts"}
  ]);
}

function gen_g3_eng_L45(){
  const it = g23Pick([
    {bad:"to inform means to tell jokes", good:"To inform means to teach facts."},
    {bad:"to persuade means to teach only facts", good:"To persuade means to convince the reader."},
    {bad:"to entertain means to convince", good:"To entertain means to interest or amuse the reader."},
    {bad:"to inform means to tell jokes", good:"To inform means to teach facts."},
    {bad:"to persuade means to teach only facts", good:"To persuade means to convince the reader."},
    {bad:"to entertain means to convince", good:"To entertain means to interest or amuse the reader."},
    {bad:"to inform means to tell jokes", good:"To inform means to teach facts."},
    {bad:"to persuade means to teach only facts", good:"To persuade means to convince the reader."},
    {bad:"to entertain means to convince", good:"To entertain means to interest or amuse the reader."},
    {bad:"to inform means to tell jokes", good:"To inform means to teach facts."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L46(){
  const it = g23Pick([
    {q:"A recipe is mostly written to…", a:"Inform", w:["Entertain","Persuade","Cover color"]},
    {q:"A comic story is mostly written to…", a:"Entertain", w:["Inform","Warn","Cover color"]},
    {q:"An ad for a toy is mostly written to…", a:"Persuade", w:["Entertain","Explain grammar","Cover color"]},
    {q:"A recipe is mostly written to…", a:"Inform", w:["Entertain","Persuade","Cover color"]},
    {q:"A comic story is mostly written to…", a:"Entertain", w:["Inform","Warn","Cover color"]},
    {q:"An ad for a toy is mostly written to…", a:"Persuade", w:["Entertain","Explain grammar","Cover color"]},
    {q:"A recipe is mostly written to…", a:"Inform", w:["Entertain","Persuade","Cover color"]},
    {q:"A comic story is mostly written to…", a:"Entertain", w:["Inform","Warn","Cover color"]},
    {q:"An ad for a toy is mostly written to…", a:"Persuade", w:["Entertain","Explain grammar","Cover color"]},
    {q:"A recipe is mostly written to…", a:"Inform", w:["Entertain","Persuade","Cover color"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Author's purpose.");
}

function gen_g3_eng_L47(){
  const it = g23Pick([
    {q:"Which text tries to persuade?", a:"Buy this backpack!", w:["Frogs are amphibians.","The cat ran home.","Reptile"]},
    {q:"Which text informs?", a:"Plants need sunlight.", w:["Please vote for me!","The dragon laughed.","Roots"]},
    {q:"Which text entertains?", a:"A silly story", w:["A science article","A warning sign","Cover color"]},
    {q:"Which text tries to persuade?", a:"Buy this backpack!", w:["Frogs are amphibians.","The cat ran home.","Reptile"]},
    {q:"Which text informs?", a:"Plants need sunlight.", w:["Please vote for me!","The dragon laughed.","Roots"]},
    {q:"Which text entertains?", a:"A silly story", w:["A science article","A warning sign","Cover color"]},
    {q:"Which text tries to persuade?", a:"Buy this backpack!", w:["Frogs are amphibians.","The cat ran home.","Reptile"]},
    {q:"Which text informs?", a:"Plants need sunlight.", w:["Please vote for me!","The dragon laughed.","Roots"]},
    {q:"Which text entertains?", a:"A silly story", w:["A science article","A warning sign","Cover color"]},
    {q:"Which text tries to persuade?", a:"Buy this backpack!", w:["Frogs are amphibians.","The cat ran home.","Reptile"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L48(){
  const it = g23Pick([
    {q:"The author's purpose is the reason for ___.", a:"writing"},
    {q:"Persuade means to ___.", a:"convince"},
    {q:"Inform means to teach ___.", a:"facts"},
    {q:"The author's purpose is the reason for ___.", a:"writing"},
    {q:"Persuade means to ___.", a:"convince"},
    {q:"Inform means to teach ___.", a:"facts"},
    {q:"The author's purpose is the reason for ___.", a:"writing"},
    {q:"Persuade means to ___.", a:"convince"},
    {q:"Inform means to teach ___.", a:"facts"},
    {q:"The author's purpose is the reason for ___.", a:"writing"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L49(){
  return matchQuestion([
    {left:"Sequence", right:"Order of events"},
    {left:"Cause and Effect", right:"Why something happened"},
    {left:"Compare and Contrast", right:"How things are alike and different"},
    {left:"Problem and Solution", right:"Problem and how it is fixed"},
    {left:"Sequence", right:"Order of events"},
    {left:"Cause and Effect", right:"Why something happened"},
    {left:"Compare and Contrast", right:"How things are alike and different"},
    {left:"Problem and Solution", right:"Problem and how it is fixed"},
    {left:"Sequence", right:"Order of events"},
    {left:"Cause and Effect", right:"Why something happened"}
  ]);
}

function gen_g3_eng_L50(){
  const it = g23Pick([
    {bad:"sequence means no order", good:"Sequence means the order of events."},
    {bad:"cause tells what happened after only", good:"Cause tells why something happened."},
    {bad:"compare means only differences", good:"Compare means to tell how things are alike."},
    {bad:"sequence means no order", good:"Sequence means the order of events."},
    {bad:"cause tells what happened after only", good:"Cause tells why something happened."},
    {bad:"compare means only differences", good:"Compare means to tell how things are alike."},
    {bad:"sequence means no order", good:"Sequence means the order of events."},
    {bad:"cause tells what happened after only", good:"Cause tells why something happened."},
    {bad:"compare means only differences", good:"Compare means to tell how things are alike."},
    {bad:"sequence means no order", good:"Sequence means the order of events."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L51(){
  const it = g23Pick([
    {q:"Words like first, next, and finally show…", a:"Sequence", w:["Cause","Theme","Setting only"]},
    {q:"Words like because and so show…", a:"Cause and effect", w:["Spelling","Setting","Compare and contrast"]},
    {q:"Words like both and unlike show…", a:"Compare and contrast", w:["Rhyme","Vowels","Plain"]},
    {q:"Words like first, next, and finally show…", a:"Sequence", w:["Cause","Theme","Setting only"]},
    {q:"Words like because and so show…", a:"Cause and effect", w:["Spelling","Setting","Compare and contrast"]},
    {q:"Words like both and unlike show…", a:"Compare and contrast", w:["Rhyme","Vowels","Plain"]},
    {q:"Words like first, next, and finally show…", a:"Sequence", w:["Cause","Theme","Setting only"]},
    {q:"Words like because and so show…", a:"Cause and effect", w:["Spelling","Setting","Compare and contrast"]},
    {q:"Words like both and unlike show…", a:"Compare and contrast", w:["Rhyme","Vowels","Plain"]},
    {q:"Words like first, next, and finally show…", a:"Sequence", w:["Cause","Theme","Setting only"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Text structure.");
}

function gen_g3_eng_L52(){
  const it = g23Pick([
    {q:"The cause tells…", a:"Why it happened", w:["Only the title","The ending only","Topic detail"]},
    {q:"The effect tells…", a:"What happened", w:["Who wrote it","How to spell","Spell"]},
    {q:"Because is a clue word for…", a:"Cause", w:["Setting","Dialogue","For"]},
    {q:"The cause tells…", a:"Why it happened", w:["Only the title","The ending only","Topic detail"]},
    {q:"The effect tells…", a:"What happened", w:["Who wrote it","How to spell","Spell"]},
    {q:"Because is a clue word for…", a:"Cause", w:["Setting","Dialogue","For"]},
    {q:"The cause tells…", a:"Why it happened", w:["Only the title","The ending only","Topic detail"]},
    {q:"The effect tells…", a:"What happened", w:["Who wrote it","How to spell","Spell"]},
    {q:"Because is a clue word for…", a:"Cause", w:["Setting","Dialogue","For"]},
    {q:"The cause tells…", a:"Why it happened", w:["Only the title","The ending only","Topic detail"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L53(){
  const it = g23Pick([
    {q:"A problem is something that needs a ___.", a:"solution"},
    {q:"A solution is how a problem gets ___.", a:"fixed"},
    {q:"Text structure means how writing is ___.", a:"organized"},
    {q:"A problem is something that needs a ___.", a:"solution"},
    {q:"A solution is how a problem gets ___.", a:"fixed"},
    {q:"Text structure means how writing is ___.", a:"organized"},
    {q:"A problem is something that needs a ___.", a:"solution"},
    {q:"A solution is how a problem gets ___.", a:"fixed"},
    {q:"Text structure means how writing is ___.", a:"organized"},
    {q:"A problem is something that needs a ___.", a:"solution"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L54(){
  return matchQuestion([
    {left:"First, next, last", right:"Sequence"},
    {left:"Because", right:"Cause"},
    {left:"Both", right:"Compare"},
    {left:"Problem fixed", right:"Solution"},
    {left:"First, next, last", right:"Sequence"},
    {left:"Because", right:"Cause"},
    {left:"Both", right:"Compare"},
    {left:"Problem fixed", right:"Solution"},
    {left:"First, next, last", right:"Sequence"},
    {left:"Because", right:"Cause"}
  ]);
}

function gen_g3_eng_L55(){
  const it = g23Pick([
    {bad:"sensory details use only numbers", good:"Sensory details use the five senses."},
    {bad:"the word sweet describes sound", good:"The word sweet describes taste."},
    {bad:"the word loud describes smell", good:"The word loud describes sound."},
    {bad:"sensory details use only numbers", good:"Sensory details use the five senses."},
    {bad:"the word sweet describes sound", good:"The word sweet describes taste."},
    {bad:"the word loud describes smell", good:"The word loud describes sound."},
    {bad:"sensory details use only numbers", good:"Sensory details use the five senses."},
    {bad:"the word sweet describes sound", good:"The word sweet describes taste."},
    {bad:"the word loud describes smell", good:"The word loud describes sound."},
    {bad:"sensory details use only numbers", good:"Sensory details use the five senses."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L56(){
  const it = g23Pick([
    {q:"Which is a sight detail?", a:"The red bird flew.", w:["The soup smelled spicy.","The bell rang loudly.","Reptile"]},
    {q:"Which word describes sight?", a:"Bright", w:["Sour","Noisy","Sight"]},
    {q:"A sight detail tells what you…", a:"See", w:["Hear","Taste","You"]},
    {q:"Which is a sight detail?", a:"The red bird flew.", w:["The soup smelled spicy.","The bell rang loudly.","Reptile"]},
    {q:"Which word describes sight?", a:"Bright", w:["Sour","Noisy","Sight"]},
    {q:"A sight detail tells what you…", a:"See", w:["Hear","Taste","You"]},
    {q:"Which is a sight detail?", a:"The red bird flew.", w:["The soup smelled spicy.","The bell rang loudly.","Reptile"]},
    {q:"Which word describes sight?", a:"Bright", w:["Sour","Noisy","Sight"]},
    {q:"A sight detail tells what you…", a:"See", w:["Hear","Taste","You"]},
    {q:"Which is a sight detail?", a:"The red bird flew.", w:["The soup smelled spicy.","The bell rang loudly.","Reptile"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Sight details.");
}

function gen_g3_eng_L57(){
  const it = g23Pick([
    {q:"Which is a sound detail?", a:"The drum boomed.", w:["The candy was sweet.","The blanket was soft.","Plain"]},
    {q:"Which word describes sound?", a:"Loud", w:["Sticky","Blue","Plain"]},
    {q:"A sound detail tells what you…", a:"Hear", w:["Smell","See","Plain"]},
    {q:"Which is a sound detail?", a:"The drum boomed.", w:["The candy was sweet.","The blanket was soft.","Plain"]},
    {q:"Which word describes sound?", a:"Loud", w:["Sticky","Blue","Plain"]},
    {q:"A sound detail tells what you…", a:"Hear", w:["Smell","See","Plain"]},
    {q:"Which is a sound detail?", a:"The drum boomed.", w:["The candy was sweet.","The blanket was soft.","Plain"]},
    {q:"Which word describes sound?", a:"Loud", w:["Sticky","Blue","Plain"]},
    {q:"A sound detail tells what you…", a:"Hear", w:["Smell","See","Plain"]},
    {q:"Which is a sound detail?", a:"The drum boomed.", w:["The candy was sweet.","The blanket was soft.","Plain"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L58(){
  const it = g23Pick([
    {q:"The cookies smelled ___.", a:"sweet"},
    {q:"The lemon tasted ___.", a:"sour"},
    {q:"The soup smelled ___.", a:"spicy"},
    {q:"The cookies smelled ___.", a:"sweet"},
    {q:"The lemon tasted ___.", a:"sour"},
    {q:"The soup smelled ___.", a:"spicy"},
    {q:"The cookies smelled ___.", a:"sweet"},
    {q:"The lemon tasted ___.", a:"sour"},
    {q:"The soup smelled ___.", a:"spicy"},
    {q:"The cookies smelled ___.", a:"sweet"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L59(){
  return matchQuestion([
    {left:"soft", right:"Touch"},
    {left:"loud", right:"Sound"},
    {left:"sweet", right:"Taste"},
    {left:"bright", right:"Sight"},
    {left:"soft", right:"Touch"},
    {left:"loud", right:"Sound"},
    {left:"sweet", right:"Taste"},
    {left:"bright", right:"Sight"},
    {left:"soft", right:"Touch"},
    {left:"loud", right:"Sound"}
  ]);
}

function gen_g3_eng_L60(){
  const it = g23Pick([
    {bad:"soft is a sound detail", good:"Soft is a touch detail."},
    {bad:"bright is a taste detail", good:"Bright is a sight detail."},
    {bad:"sour is a smell detail only", good:"Sour is a taste detail."},
    {bad:"soft is a sound detail", good:"Soft is a touch detail."},
    {bad:"bright is a taste detail", good:"Bright is a sight detail."},
    {bad:"sour is a smell detail only", good:"Sour is a taste detail."},
    {bad:"soft is a sound detail", good:"Soft is a touch detail."},
    {bad:"bright is a taste detail", good:"Bright is a sight detail."},
    {bad:"sour is a smell detail only", good:"Sour is a taste detail."},
    {bad:"soft is a sound detail", good:"Soft is a touch detail."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}
/* ===========================
   GRADE 3 ENGLISH L61-L90
   =========================== */

function gen_g3_eng_L61(){
  const it = g23Pick([
    {q:"A topic sentence tells what the paragraph is mostly about.", a:"True", w:["False","Maybe","Adverb"]},
    {q:"Which is a topic sentence?", a:"Dogs need daily care.", w:["My dog is brown.","He has a blue leash.","Adverb"]},
    {q:"A topic sentence usually comes near the…", a:"Beginning", w:["Middle only","End only","Adverb"]},
    {q:"A topic sentence tells what the paragraph is mostly about.", a:"True", w:["False","Maybe","Adverb"]},
    {q:"Which is a topic sentence?", a:"Dogs need daily care.", w:["My dog is brown.","He has a blue leash.","Adverb"]},
    {q:"A topic sentence usually comes near the…", a:"Beginning", w:["Middle only","End only","Adverb"]},
    {q:"A topic sentence tells what the paragraph is mostly about.", a:"True", w:["False","Maybe","Adverb"]},
    {q:"Which is a topic sentence?", a:"Dogs need daily care.", w:["My dog is brown.","He has a blue leash.","Adverb"]},
    {q:"A topic sentence usually comes near the…", a:"Beginning", w:["Middle only","End only","Adverb"]},
    {q:"A topic sentence tells what the paragraph is mostly about.", a:"True", w:["False","Maybe","Adverb"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Topic sentences.");
}

function gen_g3_eng_L62(){
  const it = g23Pick([
    {q:"Which is stronger?", a:"Reading helps people learn.", w:["Books.","The page is white.","White"]},
    {q:"Which is a strong topic sentence?", a:"Healthy food helps our bodies.", w:["Apples are red.","I ate lunch.","Adverb"]},
    {q:"A strong topic sentence is…", a:"Clear", w:["Confusing","Off topic","Adverb"]},
    {q:"Which is stronger?", a:"Reading helps people learn.", w:["Books.","The page is white.","White"]},
    {q:"Which is a strong topic sentence?", a:"Healthy food helps our bodies.", w:["Apples are red.","I ate lunch.","Adverb"]},
    {q:"A strong topic sentence is…", a:"Clear", w:["Confusing","Off topic","Adverb"]},
    {q:"Which is stronger?", a:"Reading helps people learn.", w:["Books.","The page is white.","White"]},
    {q:"Which is a strong topic sentence?", a:"Healthy food helps our bodies.", w:["Apples are red.","I ate lunch.","Adverb"]},
    {q:"A strong topic sentence is…", a:"Clear", w:["Confusing","Off topic","Adverb"]},
    {q:"Which is stronger?", a:"Reading helps people learn.", w:["Books.","The page is white.","White"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L63(){
  const it = g23Pick([
    {q:"A paragraph should stay on one main ___.", a:"idea"},
    {q:"Details should support the topic ___.", a:"sentence"},
    {q:"The main idea tells what the paragraph is mostly ___.", a:"about"},
    {q:"A paragraph should stay on one main ___.", a:"idea"},
    {q:"Details should support the topic ___.", a:"sentence"},
    {q:"The main idea tells what the paragraph is mostly ___.", a:"about"},
    {q:"A paragraph should stay on one main ___.", a:"idea"},
    {q:"Details should support the topic ___.", a:"sentence"},
    {q:"The main idea tells what the paragraph is mostly ___.", a:"about"},
    {q:"A paragraph should stay on one main ___.", a:"idea"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L64(){
  return matchQuestion([
    {left:"Topic Sentence", right:"Main sentence"},
    {left:"Detail", right:"Supports the topic"},
    {left:"Paragraph", right:"Group of sentences"},
    {left:"Main Idea", right:"Mostly about"},
    {left:"Topic Sentence", right:"Main sentence"},
    {left:"Detail", right:"Supports the topic"},
    {left:"Paragraph", right:"Group of sentences"},
    {left:"Main Idea", right:"Mostly about"},
    {left:"Topic Sentence", right:"Main sentence"},
    {left:"Detail", right:"Supports the topic"}
  ]);
}

function gen_g3_eng_L65(){
  const it = g23Pick([
    {bad:"dogs", good:"Dogs make wonderful pets."},
    {bad:"pizza", good:"Pizza is a popular food."},
    {bad:"school", good:"School helps students learn."},
    {bad:"dogs", good:"Dogs make wonderful pets."},
    {bad:"pizza", good:"Pizza is a popular food."},
    {bad:"school", good:"School helps students learn."},
    {bad:"dogs", good:"Dogs make wonderful pets."},
    {bad:"pizza", good:"Pizza is a popular food."},
    {bad:"school", good:"School helps students learn."},
    {bad:"dogs", good:"Dogs make wonderful pets."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L66(){
  const it = g23Pick([
    {q:"Which detail supports: Gardens need care?", a:"Plants must be watered.", w:["Shoes can be blue.","Cars drive fast.","Roots"]},
    {q:"Which topic sentence is best?", a:"Soccer is a fun sport.", w:["The ball is round.","I have shoes.","Adverb"]},
    {q:"A paragraph about birds should include details about…", a:"Birds", w:["Trains","Candy","Reptile"]},
    {q:"Which detail supports: Gardens need care?", a:"Plants must be watered.", w:["Shoes can be blue.","Cars drive fast.","Roots"]},
    {q:"Which topic sentence is best?", a:"Soccer is a fun sport.", w:["The ball is round.","I have shoes.","Adverb"]},
    {q:"A paragraph about birds should include details about…", a:"Birds", w:["Trains","Candy","Reptile"]},
    {q:"Which detail supports: Gardens need care?", a:"Plants must be watered.", w:["Shoes can be blue.","Cars drive fast.","Roots"]},
    {q:"Which topic sentence is best?", a:"Soccer is a fun sport.", w:["The ball is round.","I have shoes.","Adverb"]},
    {q:"A paragraph about birds should include details about…", a:"Birds", w:["Trains","Candy","Reptile"]},
    {q:"Which detail supports: Gardens need care?", a:"Plants must be watered.", w:["Shoes can be blue.","Cars drive fast.","Roots"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Topic sentence review.");
}

function gen_g3_eng_L67(){
  const it = g23Pick([
    {q:"Which word links ideas?", a:"Because", w:["Table","Blue","Ideas"]},
    {q:"Which word shows contrast?", a:"But", w:["Dog","Sun","Compare and contrast"]},
    {q:"Which word adds information?", a:"Also", w:["Chair","Happy","Cover color"]},
    {q:"Which word links ideas?", a:"Because", w:["Table","Blue","Ideas"]},
    {q:"Which word shows contrast?", a:"But", w:["Dog","Sun","Compare and contrast"]},
    {q:"Which word adds information?", a:"Also", w:["Chair","Happy","Cover color"]},
    {q:"Which word links ideas?", a:"Because", w:["Table","Blue","Ideas"]},
    {q:"Which word shows contrast?", a:"But", w:["Dog","Sun","Compare and contrast"]},
    {q:"Which word adds information?", a:"Also", w:["Chair","Happy","Cover color"]},
    {q:"Which word links ideas?", a:"Because", w:["Table","Blue","Ideas"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L68(){
  const it = g23Pick([
    {q:"A sequence word: ___, next, finally", a:"first"},
    {q:"A sequence word: first, ___, last", a:"next"},
    {q:"A sequence word: first, next, ___", a:"finally"},
    {q:"A sequence word: ___, next, finally", a:"first"},
    {q:"A sequence word: first, ___, last", a:"next"},
    {q:"A sequence word: first, next, ___", a:"finally"},
    {q:"A sequence word: ___, next, finally", a:"first"},
    {q:"A sequence word: first, ___, last", a:"next"},
    {q:"A sequence word: first, next, ___", a:"finally"},
    {q:"A sequence word: ___, next, finally", a:"first"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L69(){
  return matchQuestion([
    {left:"also", right:"Adds information"},
    {left:"but", right:"Shows contrast"},
    {left:"because", right:"Shows cause"},
    {left:"finally", right:"Shows sequence"}
  ]);
}

function gen_g3_eng_L70(){
  const it = g23Pick([
    {bad:"I stayed inside but it was raining", good:"I stayed inside because it was raining."},
    {bad:"I like apples because oranges", good:"I like apples and oranges."},
    {bad:"First I woke up because I brushed my teeth", good:"First I woke up, then I brushed my teeth."},
    {bad:"I stayed inside but it was raining", good:"I stayed inside because it was raining."},
    {bad:"I like apples because oranges", good:"I like apples and oranges."},
    {bad:"First I woke up because I brushed my teeth", good:"First I woke up, then I brushed my teeth."},
    {bad:"I stayed inside but it was raining", good:"I stayed inside because it was raining."},
    {bad:"I like apples because oranges", good:"I like apples and oranges."},
    {bad:"First I woke up because I brushed my teeth", good:"First I woke up, then I brushed my teeth."},
    {bad:"I stayed inside but it was raining", good:"I stayed inside because it was raining."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L71(){
  const it = g23Pick([
    {q:"Which transition shows time?", a:"Next", w:["Blue","Loud","15 Minutes later"]},
    {q:"Which transition shows addition?", a:"Also", w:["Under","Sour","Sum"]},
    {q:"Which transition shows contrast?", a:"However", w:["Table","Jump","Compare and contrast"]},
    {q:"Which transition shows time?", a:"Next", w:["Blue","Loud","15 Minutes later"]},
    {q:"Which transition shows addition?", a:"Also", w:["Under","Sour","Sum"]},
    {q:"Which transition shows contrast?", a:"However", w:["Table","Jump","Compare and contrast"]},
    {q:"Which transition shows time?", a:"Next", w:["Blue","Loud","15 Minutes later"]},
    {q:"Which transition shows addition?", a:"Also", w:["Under","Sour","Sum"]},
    {q:"Which transition shows contrast?", a:"However", w:["Table","Jump","Compare and contrast"]},
    {q:"Which transition shows time?", a:"Next", w:["Blue","Loud","15 Minutes later"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Transition words.");
}

function gen_g3_eng_L72(){
  const it = g23Pick([
    {q:"Use a linking word: I was tired, ___ I rested.", a:"So", w:["Table","Green","Rested"]},
    {q:"Use a linking word: I wanted to play, ___ it rained.", a:"But", w:["Pencil","Quick","Climate"]},
    {q:"Use a linking word: I studied ___ I had a test.", a:"Because", w:["Chair","Soft","Test"]},
    {q:"Use a linking word: I was tired, ___ I rested.", a:"So", w:["Table","Green","Rested"]},
    {q:"Use a linking word: I wanted to play, ___ it rained.", a:"But", w:["Pencil","Quick","Climate"]},
    {q:"Use a linking word: I studied ___ I had a test.", a:"Because", w:["Chair","Soft","Test"]},
    {q:"Use a linking word: I was tired, ___ I rested.", a:"So", w:["Table","Green","Rested"]},
    {q:"Use a linking word: I wanted to play, ___ it rained.", a:"But", w:["Pencil","Quick","Climate"]},
    {q:"Use a linking word: I studied ___ I had a test.", a:"Because", w:["Chair","Soft","Test"]},
    {q:"Use a linking word: I was tired, ___ I rested.", a:"So", w:["Table","Green","Rested"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L73(){
  const it = g23Pick([
    {q:"Editing checks spelling, punctuation, and ___.", a:"capitalization"},
    {q:"A sentence should begin with a capital ___.", a:"letter"},
    {q:"A statement usually ends with a ___.", a:"period"},
    {q:"Editing checks spelling, punctuation, and ___.", a:"capitalization"},
    {q:"A sentence should begin with a capital ___.", a:"letter"},
    {q:"A statement usually ends with a ___.", a:"period"},
    {q:"Editing checks spelling, punctuation, and ___.", a:"capitalization"},
    {q:"A sentence should begin with a capital ___.", a:"letter"},
    {q:"A statement usually ends with a ___.", a:"period"},
    {q:"Editing checks spelling, punctuation, and ___.", a:"capitalization"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L74(){
  return matchQuestion([
    {left:"Editing", right:"Fix errors"},
    {left:"Revising", right:"Improve ideas"},
    {left:"Capital letter", right:"Starts a sentence"},
    {left:"Period", right:"Ends a statement"}
  ]);
}

function gen_g3_eng_L75(){
  const it = g23Pick([
    {bad:"my dog likes to run.", good:"My dog likes to run."},
    {bad:"we went to texas.", good:"We went to Texas."},
    {bad:"sam and i played.", good:"Sam and I played."},
    {bad:"my dog likes to run.", good:"My dog likes to run."},
    {bad:"we went to texas.", good:"We went to Texas."},
    {bad:"sam and i played.", good:"Sam and I played."},
    {bad:"my dog likes to run.", good:"My dog likes to run."},
    {bad:"we went to texas.", good:"We went to Texas."},
    {bad:"sam and i played.", good:"Sam and I played."},
    {bad:"my dog likes to run.", good:"My dog likes to run."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L76(){
  const it = g23Pick([
    {q:"Which sentence is correct?", a:"Where are you going?", w:["Where are you going.","Where are you going!","Adverb"]},
    {q:"Which sentence is correct?", a:"I like pizza.", w:["I like pizza","Adverb","Pronoun"]},
    {q:"Which sentence is correct?", a:"Wow, that is amazing!", w:["Wow that is amazing","Wow, that is amazing.","Adverb"]},
    {q:"Which sentence is correct?", a:"Where are you going?", w:["Where are you going.","Where are you going!","Adverb"]},
    {q:"Which sentence is correct?", a:"I like pizza.", w:["I like pizza","Adverb","Pronoun"]},
    {q:"Which sentence is correct?", a:"Wow, that is amazing!", w:["Wow that is amazing","Wow, that is amazing.","Adverb"]},
    {q:"Which sentence is correct?", a:"Where are you going?", w:["Where are you going.","Where are you going!","Adverb"]},
    {q:"Which sentence is correct?", a:"I like pizza.", w:["I like pizza","Adverb","Pronoun"]},
    {q:"Which sentence is correct?", a:"Wow, that is amazing!", w:["Wow that is amazing","Wow, that is amazing.","Adverb"]},
    {q:"Which sentence is correct?", a:"Where are you going?", w:["Where are you going.","Where are you going!","Adverb"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Punctuation.");
}

function gen_g3_eng_L77(){
  const it = g23Pick([
    {q:"Choose the correct sentence.", a:"The cat ran home.", w:["The cat ran home","Adverb","Pronoun"]},
    {q:"Choose the correct sentence.", a:"Did you see it?", w:["Did you see it.","Adverb","Pronoun"]},
    {q:"Choose the correct sentence.", a:"I love reading!", w:["I love reading","Adverb","Pronoun"]},
    {q:"Choose the correct sentence.", a:"The cat ran home.", w:["The cat ran home","Adverb","Pronoun"]},
    {q:"Choose the correct sentence.", a:"Did you see it?", w:["Did you see it.","Adverb","Pronoun"]},
    {q:"Choose the correct sentence.", a:"I love reading!", w:["I love reading","Adverb","Pronoun"]},
    {q:"Choose the correct sentence.", a:"The cat ran home.", w:["The cat ran home","Adverb","Pronoun"]},
    {q:"Choose the correct sentence.", a:"Did you see it?", w:["Did you see it.","Adverb","Pronoun"]},
    {q:"Choose the correct sentence.", a:"I love reading!", w:["I love reading","Adverb","Pronoun"]},
    {q:"Choose the correct sentence.", a:"The cat ran home.", w:["The cat ran home","Adverb","Pronoun"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L78(){
  const it = g23Pick([
    {q:"Fix: my name is sam.", a:"My name is Sam."},
    {q:"Fix: where is the book.", a:"Where is the book?"},
    {q:"Fix: i went home", a:"I went home."},
    {q:"Fix: my name is sam.", a:"My name is Sam."},
    {q:"Fix: where is the book.", a:"Where is the book?"},
    {q:"Fix: i went home", a:"I went home."},
    {q:"Fix: my name is sam.", a:"My name is Sam."},
    {q:"Fix: where is the book.", a:"Where is the book?"},
    {q:"Fix: i went home", a:"I went home."},
    {q:"Fix: my name is sam.", a:"My name is Sam."}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L79(){
  return matchQuestion([
    {left:"bright", right:"Describes sight"},
    {left:"crunchy", right:"Describes sound/texture"},
    {left:"sweet", right:"Describes taste"},
    {left:"smooth", right:"Describes touch"}
  ]);
}

function gen_g3_eng_L80(){
  const it = g23Pick([
    {bad:"the flower was nice", good:"The bright red flower smelled sweet."},
    {bad:"the dog was good", good:"The small brown dog wagged its tail happily."},
    {bad:"the cake was good", good:"The warm chocolate cake tasted sweet."},
    {bad:"the flower was nice", good:"The bright red flower smelled sweet."},
    {bad:"the dog was good", good:"The small brown dog wagged its tail happily."},
    {bad:"the cake was good", good:"The warm chocolate cake tasted sweet."},
    {bad:"the flower was nice", good:"The bright red flower smelled sweet."},
    {bad:"the dog was good", good:"The small brown dog wagged its tail happily."},
    {bad:"the cake was good", good:"The warm chocolate cake tasted sweet."},
    {bad:"the flower was nice", good:"The bright red flower smelled sweet."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L81(){
  const it = g23Pick([
    {q:"Which detail describes a character?", a:"Mia had curly hair and a kind smile.", w:["The room was cold.","The tree was tall.","Tall"]},
    {q:"Which word describes personality?", a:"Brave", w:["Round","Blue","Personality"]},
    {q:"Character details tell about a person or…", a:"Animal", w:["Punctuation","Comma","Reptile"]},
    {q:"Which detail describes a character?", a:"Mia had curly hair and a kind smile.", w:["The room was cold.","The tree was tall.","Tall"]},
    {q:"Which word describes personality?", a:"Brave", w:["Round","Blue","Personality"]},
    {q:"Character details tell about a person or…", a:"Animal", w:["Punctuation","Comma","Reptile"]},
    {q:"Which detail describes a character?", a:"Mia had curly hair and a kind smile.", w:["The room was cold.","The tree was tall.","Tall"]},
    {q:"Which word describes personality?", a:"Brave", w:["Round","Blue","Personality"]},
    {q:"Character details tell about a person or…", a:"Animal", w:["Punctuation","Comma","Reptile"]},
    {q:"Which detail describes a character?", a:"Mia had curly hair and a kind smile.", w:["The room was cold.","The tree was tall.","Tall"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Character details.");
}

function gen_g3_eng_L82(){
  const it = g23Pick([
    {q:"Which detail describes setting?", a:"The forest was dark and quiet.", w:["He felt proud.","She had curly hair.","Hair"]},
    {q:"Setting tells where and when a story…", a:"Happens", w:["Rhymes","Spells","Plain"]},
    {q:"Which is a setting detail?", a:"The beach was sunny.", w:["Tom was nervous.","Lily smiled.","Smiled"]},
    {q:"Which detail describes setting?", a:"The forest was dark and quiet.", w:["He felt proud.","She had curly hair.","Hair"]},
    {q:"Setting tells where and when a story…", a:"Happens", w:["Rhymes","Spells","Plain"]},
    {q:"Which is a setting detail?", a:"The beach was sunny.", w:["Tom was nervous.","Lily smiled.","Smiled"]},
    {q:"Which detail describes setting?", a:"The forest was dark and quiet.", w:["He felt proud.","She had curly hair.","Hair"]},
    {q:"Setting tells where and when a story…", a:"Happens", w:["Rhymes","Spells","Plain"]},
    {q:"Which is a setting detail?", a:"The beach was sunny.", w:["Tom was nervous.","Lily smiled.","Smiled"]},
    {q:"Which detail describes setting?", a:"The forest was dark and quiet.", w:["He felt proud.","She had curly hair.","Hair"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L83(){
  const it = g23Pick([
    {q:"Add detail: The puppy was ___.", a:"playful"},
    {q:"Add detail: The sky was ___.", a:"cloudy"},
    {q:"Add detail: The soup tasted ___.", a:"salty"},
    {q:"Add detail: The puppy was ___.", a:"playful"},
    {q:"Add detail: The sky was ___.", a:"cloudy"},
    {q:"Add detail: The soup tasted ___.", a:"salty"},
    {q:"Add detail: The puppy was ___.", a:"playful"},
    {q:"Add detail: The sky was ___.", a:"cloudy"},
    {q:"Add detail: The soup tasted ___.", a:"salty"},
    {q:"Add detail: The puppy was ___.", a:"playful"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L84(){
  return matchQuestion([
    {left:"Character", right:"Who the story is about"},
    {left:"Setting", right:"Where and when"},
    {left:"Detail", right:"Extra information"},
    {left:"Describe", right:"Tell more about"}
  ]);
}

function gen_g3_eng_L85(){
  const it = g23Pick([
    {bad:"unhappy means very happy", good:"Unhappy means not happy."},
    {bad:"redo means do before", good:"Redo means do again."},
    {bad:"preheat means heat after", good:"Preheat means heat before."},
    {bad:"unhappy means very happy", good:"Unhappy means not happy."},
    {bad:"redo means do before", good:"Redo means do again."},
    {bad:"preheat means heat after", good:"Preheat means heat before."},
    {bad:"unhappy means very happy", good:"Unhappy means not happy."},
    {bad:"redo means do before", good:"Redo means do again."},
    {bad:"preheat means heat after", good:"Preheat means heat before."},
    {bad:"unhappy means very happy", good:"Unhappy means not happy."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L86(){
  const it = g23Pick([
    {q:"The suffix in helpful is…", a:"Ful", w:["Help","Un","Plain"]},
    {q:"The suffix in teacher is…", a:"Er", w:["Teach","Re","Plain"]},
    {q:"The suffix in quickly is…", a:"Ly", w:["Quick","Pre","Plain"]},
    {q:"The suffix in helpful is…", a:"Ful", w:["Help","Un","Plain"]},
    {q:"The suffix in teacher is…", a:"Er", w:["Teach","Re","Plain"]},
    {q:"The suffix in quickly is…", a:"Ly", w:["Quick","Pre","Plain"]},
    {q:"The suffix in helpful is…", a:"Ful", w:["Help","Un","Plain"]},
    {q:"The suffix in teacher is…", a:"Er", w:["Teach","Re","Plain"]},
    {q:"The suffix in quickly is…", a:"Ly", w:["Quick","Pre","Plain"]},
    {q:"The suffix in helpful is…", a:"Ful", w:["Help","Un","Plain"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Suffixes.");
}

function gen_g3_eng_L87(){
  const it = g23Pick([
    {q:"A prefix comes at the…", a:"Beginning", w:["End","Middle only","Plain"]},
    {q:"A suffix comes at the…", a:"End", w:["Beginning","Middle only","Plain"]},
    {q:"Word parts help with…", a:"Meaning", w:["Only color","Only size","Median"]},
    {q:"A prefix comes at the…", a:"Beginning", w:["End","Middle only","Plain"]},
    {q:"A suffix comes at the…", a:"End", w:["Beginning","Middle only","Plain"]},
    {q:"Word parts help with…", a:"Meaning", w:["Only color","Only size","Median"]},
    {q:"A prefix comes at the…", a:"Beginning", w:["End","Middle only","Plain"]},
    {q:"A suffix comes at the…", a:"End", w:["Beginning","Middle only","Plain"]},
    {q:"Word parts help with…", a:"Meaning", w:["Only color","Only size","Median"]},
    {q:"A prefix comes at the…", a:"Beginning", w:["End","Middle only","Plain"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L88(){
  const it = g23Pick([
    {q:"The prefix un- means ___.", a:"not"},
    {q:"The prefix re- means ___.", a:"again"},
    {q:"The prefix pre- means ___.", a:"before"},
    {q:"The prefix un- means ___.", a:"not"},
    {q:"The prefix re- means ___.", a:"again"},
    {q:"The prefix pre- means ___.", a:"before"},
    {q:"The prefix un- means ___.", a:"not"},
    {q:"The prefix re- means ___.", a:"again"},
    {q:"The prefix pre- means ___.", a:"before"},
    {q:"The prefix un- means ___.", a:"not"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L89(){
  return matchQuestion([
    {left:"-ful", right:"Full of"},
    {left:"-less", right:"Without"},
    {left:"-er", right:"One who"},
    {left:"-ly", right:"In a way"}
  ]);
}

function gen_g3_eng_L90(){
  const it = g23Pick([
    {bad:"careless means full of care", good:"Careless means without care."},
    {bad:"hopeful means without hope", good:"Hopeful means full of hope."},
    {bad:"runner means one who paints", good:"Runner means one who runs."},
    {bad:"careless means full of care", good:"Careless means without care."},
    {bad:"hopeful means without hope", good:"Hopeful means full of hope."},
    {bad:"runner means one who paints", good:"Runner means one who runs."},
    {bad:"careless means full of care", good:"Careless means without care."},
    {bad:"hopeful means without hope", good:"Hopeful means full of hope."},
    {bad:"runner means one who paints", good:"Runner means one who runs."},
    {bad:"careless means full of care", good:"Careless means without care."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}
/* ===========================
   GRADE 3 ENGLISH L91-L144
   =========================== */

function gen_g3_eng_L91(){
  const it = g23Pick([
    {q:"Which is a compound word?", a:"Sunflower", w:["Sunny","Flow","Roots"]},
    {q:"Which is a compound word?", a:"Toothbrush", w:["Teeth","Brushy","Plain"]},
    {q:"Which is a compound word?", a:"Raindrop", w:["Rainy","Droped","Plain"]},
    {q:"Which is a compound word?", a:"Sunflower", w:["Sunny","Flow","Roots"]},
    {q:"Which is a compound word?", a:"Toothbrush", w:["Teeth","Brushy","Plain"]},
    {q:"Which is a compound word?", a:"Raindrop", w:["Rainy","Droped","Plain"]},
    {q:"Which is a compound word?", a:"Sunflower", w:["Sunny","Flow","Roots"]},
    {q:"Which is a compound word?", a:"Toothbrush", w:["Teeth","Brushy","Plain"]},
    {q:"Which is a compound word?", a:"Raindrop", w:["Rainy","Droped","Plain"]},
    {q:"Which is a compound word?", a:"Sunflower", w:["Sunny","Flow","Roots"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Compound words.");
}

function gen_g3_eng_L92(){
  const it = g23Pick([
    {q:"sun + shine =", a:"Sunshine", w:["Sunny","Shiny","Shine"]},
    {q:"rain + bow =", a:"Rainbow", w:["Raining","Bowrain","Climate"]},
    {q:"cup + cake =", a:"Cupcake", w:["Cakecup","Cupper","Cake"]},
    {q:"sun + shine =", a:"Sunshine", w:["Sunny","Shiny","Shine"]},
    {q:"rain + bow =", a:"Rainbow", w:["Raining","Bowrain","Climate"]},
    {q:"cup + cake =", a:"Cupcake", w:["Cakecup","Cupper","Cake"]},
    {q:"sun + shine =", a:"Sunshine", w:["Sunny","Shiny","Shine"]},
    {q:"rain + bow =", a:"Rainbow", w:["Raining","Bowrain","Climate"]},
    {q:"cup + cake =", a:"Cupcake", w:["Cakecup","Cupper","Cake"]},
    {q:"sun + shine =", a:"Sunshine", w:["Sunny","Shiny","Shine"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L93(){
  const it = g23Pick([
    {q:"Split: football", a:"foot + ball"},
    {q:"Split: playground", a:"play + ground"},
    {q:"Split: notebook", a:"note + book"},
    {q:"Split: backpack", a:"back + pack"},
    {q:"Split: football", a:"foot + ball"},
    {q:"Split: playground", a:"play + ground"},
    {q:"Split: notebook", a:"note + book"},
    {q:"Split: backpack", a:"back + pack"},
    {q:"Split: football", a:"foot + ball"},
    {q:"Split: playground", a:"play + ground"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L94(){
  return matchQuestion([
    {left:"sunflower", right:"sun + flower"},
    {left:"toothbrush", right:"tooth + brush"},
    {left:"raincoat", right:"rain + coat"},
    {left:"bedroom", right:"bed + room"}
  ]);
}

function gen_g3_eng_L95(){
  const it = g23Pick([
    {bad:"football is not a compound word", good:"Football is a compound word."},
    {bad:"sunflower has one small word", good:"Sunflower has two small words."},
    {bad:"rainbow means rain plus boat", good:"Rainbow means rain plus bow."},
    {bad:"football is not a compound word", good:"Football is a compound word."},
    {bad:"sunflower has one small word", good:"Sunflower has two small words."},
    {bad:"rainbow means rain plus boat", good:"Rainbow means rain plus bow."},
    {bad:"football is not a compound word", good:"Football is a compound word."},
    {bad:"sunflower has one small word", good:"Sunflower has two small words."},
    {bad:"rainbow means rain plus boat", good:"Rainbow means rain plus bow."},
    {bad:"football is not a compound word", good:"Football is a compound word."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L96(){
  const it = g23Pick([
    {q:"Which word is made from two words?", a:"Bedroom", w:["Bedded","Roomy","Words"]},
    {q:"Which word is made from rain + coat?", a:"Raincoat", w:["Rainy","Coating","Climate"]},
    {q:"Which word is made from note + book?", a:"Notebook", w:["Noted","Booking","Book"]},
    {q:"Which word is made from two words?", a:"Bedroom", w:["Bedded","Roomy","Words"]},
    {q:"Which word is made from rain + coat?", a:"Raincoat", w:["Rainy","Coating","Climate"]},
    {q:"Which word is made from note + book?", a:"Notebook", w:["Noted","Booking","Book"]},
    {q:"Which word is made from two words?", a:"Bedroom", w:["Bedded","Roomy","Words"]},
    {q:"Which word is made from rain + coat?", a:"Raincoat", w:["Rainy","Coating","Climate"]},
    {q:"Which word is made from note + book?", a:"Notebook", w:["Noted","Booking","Book"]},
    {q:"Which word is made from two words?", a:"Bedroom", w:["Bedded","Roomy","Words"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Compound words review.");
}

function gen_g3_eng_L97(){
  const it = g23Pick([
    {q:"Which word sounds like 'see'?", a:"Sea", w:["Say","Sit","Plain"]},
    {q:"Which word sounds like 'two'?", a:"Too", w:["Toe","Tow","Plain"]},
    {q:"Which word sounds like 'right'?", a:"Write", w:["Ride","Road","Plain"]},
    {q:"Which word sounds like 'see'?", a:"Sea", w:["Say","Sit","Plain"]},
    {q:"Which word sounds like 'two'?", a:"Too", w:["Toe","Tow","Plain"]},
    {q:"Which word sounds like 'right'?", a:"Write", w:["Ride","Road","Plain"]},
    {q:"Which word sounds like 'see'?", a:"Sea", w:["Say","Sit","Plain"]},
    {q:"Which word sounds like 'two'?", a:"Too", w:["Toe","Tow","Plain"]},
    {q:"Which word sounds like 'right'?", a:"Write", w:["Ride","Road","Plain"]},
    {q:"Which word sounds like 'see'?", a:"Sea", w:["Say","Sit","Plain"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L98(){
  const it = g23Pick([
    {q:"A bat can be an animal or a ___.", a:"sports tool"},
    {q:"A bark can be a dog sound or part of a ___.", a:"tree"},
    {q:"A ring can be jewelry or a ___.", a:"sound"},
    {q:"A bat can be an animal or a ___.", a:"sports tool"},
    {q:"A bark can be a dog sound or part of a ___.", a:"tree"},
    {q:"A ring can be jewelry or a ___.", a:"sound"},
    {q:"A bat can be an animal or a ___.", a:"sports tool"},
    {q:"A bark can be a dog sound or part of a ___.", a:"tree"},
    {q:"A ring can be jewelry or a ___.", a:"sound"},
    {q:"A bat can be an animal or a ___.", a:"sports tool"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L99(){
  return matchQuestion([
    {left:"there", right:"a place"},
    {left:"their", right:"belongs to them"},
    {left:"they're", right:"they are"},
    {left:"where", right:"asks about place"}
  ]);
}

function gen_g3_eng_L100(){
  const it = g23Pick([
    {bad:"I have to apples", good:"I have two apples."},
    {bad:"I want two go outside", good:"I want to go outside."},
    {bad:"I like pizza to", good:"I like pizza too."},
    {bad:"I have to apples", good:"I have two apples."},
    {bad:"I want two go outside", good:"I want to go outside."},
    {bad:"I like pizza to", good:"I like pizza too."},
    {bad:"I have to apples", good:"I have two apples."},
    {bad:"I want two go outside", good:"I want to go outside."},
    {bad:"I like pizza to", good:"I like pizza too."},
    {bad:"I have to apples", good:"I have two apples."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L101(){
  const it = g23Pick([
    {q:"Choose the correct word: I went over ___.", a:"There", w:["Their","They're","Over"]},
    {q:"Choose the correct word: ___ going home.", a:"They're", w:["There","Their","Home"]},
    {q:"Choose the correct word: That is ___ dog.", a:"Their", w:["There","They're","Dog"]},
    {q:"Choose the correct word: I went over ___.", a:"There", w:["Their","They're","Over"]},
    {q:"Choose the correct word: ___ going home.", a:"They're", w:["There","Their","Home"]},
    {q:"Choose the correct word: That is ___ dog.", a:"Their", w:["There","They're","Dog"]},
    {q:"Choose the correct word: I went over ___.", a:"There", w:["Their","They're","Over"]},
    {q:"Choose the correct word: ___ going home.", a:"They're", w:["There","Their","Home"]},
    {q:"Choose the correct word: That is ___ dog.", a:"Their", w:["There","They're","Dog"]},
    {q:"Choose the correct word: I went over ___.", a:"There", w:["Their","They're","Over"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Homophones.");
}

function gen_g3_eng_L102(){
  const it = g23Pick([
    {q:"Which pair are homophones?", a:"Too / two", w:["Dog / cat","Fast / quick","Quick"]},
    {q:"Which pair are homophones?", a:"Sea / see", w:["Run / ran","Big / small","Small"]},
    {q:"Which pair are homophones?", a:"Right / write", w:["Read / book","Pen / pencil","Pencil"]},
    {q:"Which pair are homophones?", a:"Too / two", w:["Dog / cat","Fast / quick","Quick"]},
    {q:"Which pair are homophones?", a:"Sea / see", w:["Run / ran","Big / small","Small"]},
    {q:"Which pair are homophones?", a:"Right / write", w:["Read / book","Pen / pencil","Pencil"]},
    {q:"Which pair are homophones?", a:"Too / two", w:["Dog / cat","Fast / quick","Quick"]},
    {q:"Which pair are homophones?", a:"Sea / see", w:["Run / ran","Big / small","Small"]},
    {q:"Which pair are homophones?", a:"Right / write", w:["Read / book","Pen / pencil","Pencil"]},
    {q:"Which pair are homophones?", a:"Too / two", w:["Dog / cat","Fast / quick","Quick"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L103(){
  const it = g23Pick([
    {q:"The root 'photo' means ___.", a:"light"},
    {q:"The root 'tele' means ___.", a:"far"},
    {q:"The root 'graph' means ___.", a:"write"},
    {q:"The root 'photo' means ___.", a:"light"},
    {q:"The root 'tele' means ___.", a:"far"},
    {q:"The root 'graph' means ___.", a:"write"},
    {q:"The root 'photo' means ___.", a:"light"},
    {q:"The root 'tele' means ___.", a:"far"},
    {q:"The root 'graph' means ___.", a:"write"},
    {q:"The root 'photo' means ___.", a:"light"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L104(){
  return matchQuestion([
    {left:"spect", right:"look"},
    {left:"port", right:"carry"},
    {left:"dict", right:"say"},
    {left:"scrib", right:"write"}
  ]);
}

function gen_g3_eng_L105(){
  const it = g23Pick([
    {bad:"photo means sound", good:"Photo means light."},
    {bad:"tele means near", good:"Tele means far."},
    {bad:"dict means carry", good:"Dict means say."},
    {bad:"photo means sound", good:"Photo means light."},
    {bad:"tele means near", good:"Tele means far."},
    {bad:"dict means carry", good:"Dict means say."},
    {bad:"photo means sound", good:"Photo means light."},
    {bad:"tele means near", good:"Tele means far."},
    {bad:"dict means carry", good:"Dict means say."},
    {bad:"photo means sound", good:"Photo means light."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L106(){
  const it = g23Pick([
    {q:"Which word uses the root 'photo'?", a:"Photograph", w:["Telephone","Transport","Roots"]},
    {q:"Which word uses the root 'tele'?", a:"Telescope", w:["Photosynthesis","Script","Roots"]},
    {q:"Which word uses the root 'port'?", a:"Transport", w:["Dictate","Inspect","Roots"]},
    {q:"Which word uses the root 'photo'?", a:"Photograph", w:["Telephone","Transport","Roots"]},
    {q:"Which word uses the root 'tele'?", a:"Telescope", w:["Photosynthesis","Script","Roots"]},
    {q:"Which word uses the root 'port'?", a:"Transport", w:["Dictate","Inspect","Roots"]},
    {q:"Which word uses the root 'photo'?", a:"Photograph", w:["Telephone","Transport","Roots"]},
    {q:"Which word uses the root 'tele'?", a:"Telescope", w:["Photosynthesis","Script","Roots"]},
    {q:"Which word uses the root 'port'?", a:"Transport", w:["Dictate","Inspect","Roots"]},
    {q:"Which word uses the root 'photo'?", a:"Photograph", w:["Telephone","Transport","Roots"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Greek and Latin roots.");
}

function gen_g3_eng_L107(){
  const it = g23Pick([
    {q:"A word with 'spect' is…", a:"Inspect", w:["Candle","Playful","Spect'"]},
    {q:"A word with 'dict' is…", a:"Predict", w:["Raincoat","Happy","A guess without clues"]},
    {q:"A word with 'scrib' is…", a:"Describe", w:["Jumping","Loudly","Scrib'"]},
    {q:"A word with 'spect' is…", a:"Inspect", w:["Candle","Playful","Spect'"]},
    {q:"A word with 'dict' is…", a:"Predict", w:["Raincoat","Happy","A guess without clues"]},
    {q:"A word with 'scrib' is…", a:"Describe", w:["Jumping","Loudly","Scrib'"]},
    {q:"A word with 'spect' is…", a:"Inspect", w:["Candle","Playful","Spect'"]},
    {q:"A word with 'dict' is…", a:"Predict", w:["Raincoat","Happy","A guess without clues"]},
    {q:"A word with 'scrib' is…", a:"Describe", w:["Jumping","Loudly","Scrib'"]},
    {q:"A word with 'spect' is…", a:"Inspect", w:["Candle","Playful","Spect'"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L108(){
  const it = g23Pick([
    {q:"The root spect means ___.", a:"look"},
    {q:"The root port means ___.", a:"carry"},
    {q:"The root dict means ___.", a:"say"},
    {q:"The root scrib means ___.", a:"write"},
    {q:"The root spect means ___.", a:"look"},
    {q:"The root port means ___.", a:"carry"},
    {q:"The root dict means ___.", a:"say"},
    {q:"The root scrib means ___.", a:"write"},
    {q:"The root spect means ___.", a:"look"},
    {q:"The root port means ___.", a:"carry"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L109(){
  return matchQuestion([
    {left:"friend", right:"correct"},
    {left:"because", right:"correct"},
    {left:"people", right:"correct"},
    {left:"school", right:"correct"}
  ]);
}

function gen_g3_eng_L110(){
  const it = g23Pick([
    {bad:"frend is spelled correctly", good:"Friend is spelled correctly."},
    {bad:"becuz is spelled correctly", good:"Because is spelled correctly."},
    {bad:"skool is spelled correctly", good:"School is spelled correctly."},
    {bad:"frend is spelled correctly", good:"Friend is spelled correctly."},
    {bad:"becuz is spelled correctly", good:"Because is spelled correctly."},
    {bad:"skool is spelled correctly", good:"School is spelled correctly."},
    {bad:"frend is spelled correctly", good:"Friend is spelled correctly."},
    {bad:"becuz is spelled correctly", good:"Because is spelled correctly."},
    {bad:"skool is spelled correctly", good:"School is spelled correctly."},
    {bad:"frend is spelled correctly", good:"Friend is spelled correctly."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L111(){
  const it = g23Pick([
    {q:"Which word is spelled correctly?", a:"Friend", w:["Freind","Frend","Correctly"]},
    {q:"Which word is spelled correctly?", a:"Because", w:["Becuz","Becose","Correctly"]},
    {q:"Which word is spelled correctly?", a:"People", w:["Pepol","Peeple","Correctly"]},
    {q:"Which word is spelled correctly?", a:"Friend", w:["Freind","Frend","Correctly"]},
    {q:"Which word is spelled correctly?", a:"Because", w:["Becuz","Becose","Correctly"]},
    {q:"Which word is spelled correctly?", a:"People", w:["Pepol","Peeple","Correctly"]},
    {q:"Which word is spelled correctly?", a:"Friend", w:["Freind","Frend","Correctly"]},
    {q:"Which word is spelled correctly?", a:"Because", w:["Becuz","Becose","Correctly"]},
    {q:"Which word is spelled correctly?", a:"People", w:["Pepol","Peeple","Correctly"]},
    {q:"Which word is spelled correctly?", a:"Friend", w:["Freind","Frend","Correctly"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Spelling.");
}

function gen_g3_eng_L112(){
  const it = g23Pick([
    {q:"Which word belongs in the -ake family?", a:"Cake", w:["Cat","Cup","Family"]},
    {q:"Which word belongs in the -ight family?", a:"Light", w:["Late","Log","Gravity"]},
    {q:"Which word belongs in the -ain family?", a:"Rain", w:["Ran","Rope","Climate"]},
    {q:"Which word belongs in the -ake family?", a:"Cake", w:["Cat","Cup","Family"]},
    {q:"Which word belongs in the -ight family?", a:"Light", w:["Late","Log","Gravity"]},
    {q:"Which word belongs in the -ain family?", a:"Rain", w:["Ran","Rope","Climate"]},
    {q:"Which word belongs in the -ake family?", a:"Cake", w:["Cat","Cup","Family"]},
    {q:"Which word belongs in the -ight family?", a:"Light", w:["Late","Log","Gravity"]},
    {q:"Which word belongs in the -ain family?", a:"Rain", w:["Ran","Rope","Climate"]},
    {q:"Which word belongs in the -ake family?", a:"Cake", w:["Cat","Cup","Family"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L113(){
  const it = g23Pick([
    {q:"Fix the spelling: frend", a:"friend"},
    {q:"Fix the spelling: becuz", a:"because"},
    {q:"Fix the spelling: peple", a:"people"},
    {q:"Fix the spelling: skool", a:"school"},
    {q:"Fix the spelling: frend", a:"friend"},
    {q:"Fix the spelling: becuz", a:"because"},
    {q:"Fix the spelling: peple", a:"people"},
    {q:"Fix the spelling: skool", a:"school"},
    {q:"Fix the spelling: frend", a:"friend"},
    {q:"Fix the spelling: becuz", a:"because"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L114(){
  return matchQuestion([
    {left:"frend", right:"friend"},
    {left:"becuz", right:"because"},
    {left:"peple", right:"people"},
    {left:"skool", right:"school"}
  ]);
}

function gen_g3_eng_L115(){
  const it = g23Pick([
    {bad:"The cat is under the table has no preposition.", good:"Under is the preposition."},
    {bad:"The book is on the desk has no preposition.", good:"On is the preposition."},
    {bad:"The dog ran around the yard has no preposition.", good:"Around is the preposition."},
    {bad:"The cat is under the table has no preposition.", good:"Under is the preposition."},
    {bad:"The book is on the desk has no preposition.", good:"On is the preposition."},
    {bad:"The dog ran around the yard has no preposition.", good:"Around is the preposition."},
    {bad:"The cat is under the table has no preposition.", good:"Under is the preposition."},
    {bad:"The book is on the desk has no preposition.", good:"On is the preposition."},
    {bad:"The dog ran around the yard has no preposition.", good:"Around is the preposition."},
    {bad:"The cat is under the table has no preposition.", good:"Under is the preposition."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L116(){
  const it = g23Pick([
    {q:"Which word is a preposition?", a:"Under", w:["Happy","Run","Preposition"]},
    {q:"Which word is a preposition?", a:"Behind", w:["Loud","Eat","Preposition"]},
    {q:"Which word is a preposition?", a:"Beside", w:["Smile","Quick","Preposition"]},
    {q:"Which word is a preposition?", a:"Under", w:["Happy","Run","Preposition"]},
    {q:"Which word is a preposition?", a:"Behind", w:["Loud","Eat","Preposition"]},
    {q:"Which word is a preposition?", a:"Beside", w:["Smile","Quick","Preposition"]},
    {q:"Which word is a preposition?", a:"Under", w:["Happy","Run","Preposition"]},
    {q:"Which word is a preposition?", a:"Behind", w:["Loud","Eat","Preposition"]},
    {q:"Which word is a preposition?", a:"Beside", w:["Smile","Quick","Preposition"]},
    {q:"Which word is a preposition?", a:"Under", w:["Happy","Run","Preposition"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Prepositions.");
}

function gen_g3_eng_L117(){
  const it = g23Pick([
    {q:"The ball is ___ the box.", a:"In", w:["Run","Blue","Box"]},
    {q:"The cat is ___ the chair.", a:"Under", w:["Sing","Soft","Chair"]},
    {q:"The book is ___ the desk.", a:"On", w:["Jump","Red","Desk"]},
    {q:"The ball is ___ the box.", a:"In", w:["Run","Blue","Box"]},
    {q:"The cat is ___ the chair.", a:"Under", w:["Sing","Soft","Chair"]},
    {q:"The book is ___ the desk.", a:"On", w:["Jump","Red","Desk"]},
    {q:"The ball is ___ the box.", a:"In", w:["Run","Blue","Box"]},
    {q:"The cat is ___ the chair.", a:"Under", w:["Sing","Soft","Chair"]},
    {q:"The book is ___ the desk.", a:"On", w:["Jump","Red","Desk"]},
    {q:"The ball is ___ the box.", a:"In", w:["Run","Blue","Box"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L118(){
  const it = g23Pick([
    {q:"Complete: The dog ran ___ the house.", a:"around"},
    {q:"Complete: The bird flew ___ the tree.", a:"above"},
    {q:"Complete: The shoes are ___ the bed.", a:"under"},
    {q:"Complete: The dog ran ___ the house.", a:"around"},
    {q:"Complete: The bird flew ___ the tree.", a:"above"},
    {q:"Complete: The shoes are ___ the bed.", a:"under"},
    {q:"Complete: The dog ran ___ the house.", a:"around"},
    {q:"Complete: The bird flew ___ the tree.", a:"above"},
    {q:"Complete: The shoes are ___ the bed.", a:"under"},
    {q:"Complete: The dog ran ___ the house.", a:"around"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L119(){
  return matchQuestion([
    {left:"under", right:"below"},
    {left:"above", right:"over"},
    {left:"beside", right:"next to"},
    {left:"inside", right:"in"}
  ]);
}

function gen_g3_eng_L120(){
  const it = g23Pick([
    {bad:"The pencil is on the desk has no preposition", good:"The preposition is on."},
    {bad:"The cat hid under the bed has no preposition", good:"The preposition is under."},
    {bad:"The bird flew over the tree has no preposition", good:"The preposition is over."},
    {bad:"The pencil is on the desk has no preposition", good:"The preposition is on."},
    {bad:"The cat hid under the bed has no preposition", good:"The preposition is under."},
    {bad:"The bird flew over the tree has no preposition", good:"The preposition is over."},
    {bad:"The pencil is on the desk has no preposition", good:"The preposition is on."},
    {bad:"The cat hid under the bed has no preposition", good:"The preposition is under."},
    {bad:"The bird flew over the tree has no preposition", good:"The preposition is over."},
    {bad:"The pencil is on the desk has no preposition", good:"The preposition is on."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L121(){
  const it = g23Pick([
    {q:"Which verb is past tense?", a:"Walked", w:["Walk","Will walk","Adverb"]},
    {q:"Which verb is present tense?", a:"Runs", w:["Ran","Will run","Adverb"]},
    {q:"Which verb is future tense?", a:"Will jump", w:["Jumped","Jumps","Adverb"]},
    {q:"Which verb is past tense?", a:"Walked", w:["Walk","Will walk","Adverb"]},
    {q:"Which verb is present tense?", a:"Runs", w:["Ran","Will run","Adverb"]},
    {q:"Which verb is future tense?", a:"Will jump", w:["Jumped","Jumps","Adverb"]},
    {q:"Which verb is past tense?", a:"Walked", w:["Walk","Will walk","Adverb"]},
    {q:"Which verb is present tense?", a:"Runs", w:["Ran","Will run","Adverb"]},
    {q:"Which verb is future tense?", a:"Will jump", w:["Jumped","Jumps","Adverb"]},
    {q:"Which verb is past tense?", a:"Walked", w:["Walk","Will walk","Adverb"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Verb tense.");
}

function gen_g3_eng_L122(){
  const it = g23Pick([
    {q:"Past tense of walk is…", a:"Walked", w:["Walks","Will walk","Walk"]},
    {q:"Past tense of jump is…", a:"Jumped", w:["Jumps","Will jump","Jump"]},
    {q:"Past tense of play is…", a:"Played", w:["Plays","Will play","Play"]},
    {q:"Past tense of walk is…", a:"Walked", w:["Walks","Will walk","Walk"]},
    {q:"Past tense of jump is…", a:"Jumped", w:["Jumps","Will jump","Jump"]},
    {q:"Past tense of play is…", a:"Played", w:["Plays","Will play","Play"]},
    {q:"Past tense of walk is…", a:"Walked", w:["Walks","Will walk","Walk"]},
    {q:"Past tense of jump is…", a:"Jumped", w:["Jumps","Will jump","Jump"]},
    {q:"Past tense of play is…", a:"Played", w:["Plays","Will play","Play"]},
    {q:"Past tense of walk is…", a:"Walked", w:["Walks","Will walk","Walk"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L123(){
  const it = g23Pick([
    {q:"Complete: She ___ to school every day.", a:"walks"},
    {q:"Complete: He ___ the ball now.", a:"kicks"},
    {q:"Complete: The dog ___ loudly.", a:"barks"},
    {q:"Complete: She ___ to school every day.", a:"walks"},
    {q:"Complete: He ___ the ball now.", a:"kicks"},
    {q:"Complete: The dog ___ loudly.", a:"barks"},
    {q:"Complete: She ___ to school every day.", a:"walks"},
    {q:"Complete: He ___ the ball now.", a:"kicks"},
    {q:"Complete: The dog ___ loudly.", a:"barks"},
    {q:"Complete: She ___ to school every day.", a:"walks"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L124(){
  return matchQuestion([
    {left:"walked", right:"past"},
    {left:"walks", right:"present"},
    {left:"will walk", right:"future"},
    {left:"jumped", right:"past"}
  ]);
}

function gen_g3_eng_L125(){
  const it = g23Pick([
    {bad:"Yesterday, I walk to school.", good:"Yesterday, I walked to school."},
    {bad:"Tomorrow, I played outside.", good:"Tomorrow, I will play outside."},
    {bad:"Now, she ran fast.", good:"Now, she runs fast."},
    {bad:"Yesterday, I walk to school.", good:"Yesterday, I walked to school."},
    {bad:"Tomorrow, I played outside.", good:"Tomorrow, I will play outside."},
    {bad:"Now, she ran fast.", good:"Now, she runs fast."},
    {bad:"Yesterday, I walk to school.", good:"Yesterday, I walked to school."},
    {bad:"Tomorrow, I played outside.", good:"Tomorrow, I will play outside."},
    {bad:"Now, she ran fast.", good:"Now, she runs fast."},
    {bad:"Yesterday, I walk to school.", good:"Yesterday, I walked to school."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L126(){
  const it = g23Pick([
    {q:"Yesterday means use…", a:"Past tense", w:["Future tense","No verb","Adverb"]},
    {q:"Tomorrow means use…", a:"Future tense", w:["Past tense","No verb","Adverb"]},
    {q:"Right now means use…", a:"Present tense", w:["Past tense","Future only","Unrelated meaning"]},
    {q:"Yesterday means use…", a:"Past tense", w:["Future tense","No verb","Adverb"]},
    {q:"Tomorrow means use…", a:"Future tense", w:["Past tense","No verb","Adverb"]},
    {q:"Right now means use…", a:"Present tense", w:["Past tense","Future only","Unrelated meaning"]},
    {q:"Yesterday means use…", a:"Past tense", w:["Future tense","No verb","Adverb"]},
    {q:"Tomorrow means use…", a:"Future tense", w:["Past tense","No verb","Adverb"]},
    {q:"Right now means use…", a:"Present tense", w:["Past tense","Future only","Unrelated meaning"]},
    {q:"Yesterday means use…", a:"Past tense", w:["Future tense","No verb","Adverb"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Verb tense review.");
}

function gen_g3_eng_L127(){
  const it = g23Pick([
    {q:"Which is an action verb?", a:"Run", w:["Is","Was","Adverb"]},
    {q:"Which is a linking verb?", a:"Is", w:["Jump","Swim","Adverb"]},
    {q:"Which is a helping verb?", a:"Has", w:["Throw","Sleep","Adverb"]},
    {q:"Which is an action verb?", a:"Run", w:["Is","Was","Adverb"]},
    {q:"Which is a linking verb?", a:"Is", w:["Jump","Swim","Adverb"]},
    {q:"Which is a helping verb?", a:"Has", w:["Throw","Sleep","Adverb"]},
    {q:"Which is an action verb?", a:"Run", w:["Is","Was","Adverb"]},
    {q:"Which is a linking verb?", a:"Is", w:["Jump","Swim","Adverb"]},
    {q:"Which is a helping verb?", a:"Has", w:["Throw","Sleep","Adverb"]},
    {q:"Which is an action verb?", a:"Run", w:["Is","Was","Adverb"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L128(){
  const it = g23Pick([
    {q:"An action verb shows what someone can ___.", a:"do"},
    {q:"In 'Birds fly,' the action verb is ___.", a:"fly"},
    {q:"In 'Sam runs,' the action verb is ___.", a:"runs"},
    {q:"An action verb shows what someone can ___.", a:"do"},
    {q:"In 'Birds fly,' the action verb is ___.", a:"fly"},
    {q:"In 'Sam runs,' the action verb is ___.", a:"runs"},
    {q:"An action verb shows what someone can ___.", a:"do"},
    {q:"In 'Birds fly,' the action verb is ___.", a:"fly"},
    {q:"In 'Sam runs,' the action verb is ___.", a:"runs"},
    {q:"An action verb shows what someone can ___.", a:"do"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L129(){
  return matchQuestion([
    {left:"run", right:"action verb"},
    {left:"is", right:"linking verb"},
    {left:"has", right:"helping verb"},
    {left:"jump", right:"action verb"}
  ]);
}

function gen_g3_eng_L130(){
  const it = g23Pick([
    {bad:"run is a linking verb", good:"Run is an action verb."},
    {bad:"is can show action like jumping", good:"Is is a linking verb."},
    {bad:"has can help another verb", good:"Has can be a helping verb."},
    {bad:"run is a linking verb", good:"Run is an action verb."},
    {bad:"is can show action like jumping", good:"Is is a linking verb."},
    {bad:"has can help another verb", good:"Has can be a helping verb."},
    {bad:"run is a linking verb", good:"Run is an action verb."},
    {bad:"is can show action like jumping", good:"Is is a linking verb."},
    {bad:"has can help another verb", good:"Has can be a helping verb."},
    {bad:"run is a linking verb", good:"Run is an action verb."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L131(){
  const it = g23Pick([
    {q:"Choose the verb: The dog barks.", a:"Barks", w:["Dog","The","Adverb"]},
    {q:"Choose the verb: Mia sings.", a:"Sings", w:["Mia","The","Adverb"]},
    {q:"Choose the verb: Birds fly.", a:"Fly", w:["Birds","The","Reptile"]},
    {q:"Choose the verb: The dog barks.", a:"Barks", w:["Dog","The","Adverb"]},
    {q:"Choose the verb: Mia sings.", a:"Sings", w:["Mia","The","Adverb"]},
    {q:"Choose the verb: Birds fly.", a:"Fly", w:["Birds","The","Reptile"]},
    {q:"Choose the verb: The dog barks.", a:"Barks", w:["Dog","The","Adverb"]},
    {q:"Choose the verb: Mia sings.", a:"Sings", w:["Mia","The","Adverb"]},
    {q:"Choose the verb: Birds fly.", a:"Fly", w:["Birds","The","Reptile"]},
    {q:"Choose the verb: The dog barks.", a:"Barks", w:["Dog","The","Adverb"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Choose the verb.");
}

function gen_g3_eng_L132(){
  const it = g23Pick([
    {q:"Which is a verb?", a:"Dance", w:["Table","Blue","Adverb"]},
    {q:"Which is a verb?", a:"Write", w:["Pencil","Green","Adverb"]},
    {q:"Which is a verb?", a:"Think", w:["Chair","Round","Adverb"]},
    {q:"Which is a verb?", a:"Dance", w:["Table","Blue","Adverb"]},
    {q:"Which is a verb?", a:"Write", w:["Pencil","Green","Adverb"]},
    {q:"Which is a verb?", a:"Think", w:["Chair","Round","Adverb"]},
    {q:"Which is a verb?", a:"Dance", w:["Table","Blue","Adverb"]},
    {q:"Which is a verb?", a:"Write", w:["Pencil","Green","Adverb"]},
    {q:"Which is a verb?", a:"Think", w:["Chair","Round","Adverb"]},
    {q:"Which is a verb?", a:"Dance", w:["Table","Blue","Adverb"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L133(){
  const it = g23Pick([
    {q:"Do not becomes ___.", a:"don't"},
    {q:"Can not becomes ___.", a:"can't"},
    {q:"I am becomes ___.", a:"I'm"},
    {q:"We are becomes ___.", a:"we're"},
    {q:"They are becomes ___.", a:"they're"},
    {q:"She is becomes ___.", a:"she's"},
    {q:"He is becomes ___.", a:"he's"},
    {q:"It is becomes ___.", a:"it's"},
    {q:"You are becomes ___.", a:"you're"},
    {q:"Will not becomes ___.", a:"won't"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L134(){
  return matchQuestion([
    {left:"do not", right:"don't"},
    {left:"can not", right:"can't"},
    {left:"I am", right:"I'm"},
    {left:"we are", right:"we're"}
  ]);
}

function gen_g3_eng_L135(){
  const it = g23Pick([
    {bad:"dont is correct", good:"Don't is correct."},
    {bad:"cant is correct", good:"Can't is correct."},
    {bad:"im is correct", good:"I'm is correct."},
    {bad:"dont is correct", good:"Don't is correct."},
    {bad:"cant is correct", good:"Can't is correct."},
    {bad:"im is correct", good:"I'm is correct."},
    {bad:"dont is correct", good:"Don't is correct."},
    {bad:"cant is correct", good:"Can't is correct."},
    {bad:"im is correct", good:"I'm is correct."},
    {bad:"dont is correct", good:"Don't is correct."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L136(){
  const it = g23Pick([
    {q:"What does can't mean?", a:"Can not", w:["Can it","Could not","Median"]},
    {q:"What does I'm mean?", a:"I am", w:["I will","I have","Median"]},
    {q:"What does we're mean?", a:"We are", w:["We were","We will","Median"]},
    {q:"What does can't mean?", a:"Can not", w:["Can it","Could not","Median"]},
    {q:"What does I'm mean?", a:"I am", w:["I will","I have","Median"]},
    {q:"What does we're mean?", a:"We are", w:["We were","We will","Median"]},
    {q:"What does can't mean?", a:"Can not", w:["Can it","Could not","Median"]},
    {q:"What does I'm mean?", a:"I am", w:["I will","I have","Median"]},
    {q:"What does we're mean?", a:"We are", w:["We were","We will","Median"]},
    {q:"What does can't mean?", a:"Can not", w:["Can it","Could not","Median"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Contractions.");
}

function gen_g3_eng_L137(){
  const it = g23Pick([
    {q:"Choose the contraction for will not.", a:"Won't", w:["Willn't","Wonted","Not"]},
    {q:"Choose the contraction for they are.", a:"They're", w:["Their","There","Are"]},
    {q:"Choose the contraction for she is.", a:"She's", w:["Shes","Shees","She"]},
    {q:"Choose the contraction for will not.", a:"Won't", w:["Willn't","Wonted","Not"]},
    {q:"Choose the contraction for they are.", a:"They're", w:["Their","There","Are"]},
    {q:"Choose the contraction for she is.", a:"She's", w:["Shes","Shees","She"]},
    {q:"Choose the contraction for will not.", a:"Won't", w:["Willn't","Wonted","Not"]},
    {q:"Choose the contraction for they are.", a:"They're", w:["Their","There","Are"]},
    {q:"Choose the contraction for she is.", a:"She's", w:["Shes","Shees","She"]},
    {q:"Choose the contraction for will not.", a:"Won't", w:["Willn't","Wonted","Not"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L138(){
  const it = g23Pick([
    {q:"Expand: don't", a:"do not"},
    {q:"Expand: can't", a:"can not"},
    {q:"Expand: they're", a:"they are"},
    {q:"Expand: she's", a:"she is"},
    {q:"Expand: don't", a:"do not"},
    {q:"Expand: can't", a:"can not"},
    {q:"Expand: they're", a:"they are"},
    {q:"Expand: she's", a:"she is"},
    {q:"Expand: don't", a:"do not"},
    {q:"Expand: can't", a:"can not"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L139(){
  return matchQuestion([
    {left:"and", right:"adds ideas"},
    {left:"but", right:"shows contrast"},
    {left:"or", right:"shows choice"},
    {left:"because", right:"shows reason"}
  ]);
}

function gen_g3_eng_L140(){
  const it = g23Pick([
    {bad:"I like apples but bananas.", good:"I like apples and bananas."},
    {bad:"I wanted to play and it was raining.", good:"I wanted to play, but it was raining."},
    {bad:"Do you want milk and juice?", good:"Do you want milk or juice?"},
    {bad:"I like apples but bananas.", good:"I like apples and bananas."},
    {bad:"I wanted to play and it was raining.", good:"I wanted to play, but it was raining."},
    {bad:"Do you want milk and juice?", good:"Do you want milk or juice?"},
    {bad:"I like apples but bananas.", good:"I like apples and bananas."},
    {bad:"I wanted to play and it was raining.", good:"I wanted to play, but it was raining."},
    {bad:"Do you want milk and juice?", good:"Do you want milk or juice?"},
    {bad:"I like apples but bananas.", good:"I like apples and bananas."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_eng_L141(){
  const it = g23Pick([
    {q:"Choose the conjunction: I like cats ___ dogs.", a:"And", w:["Under","Blue","Dogs"]},
    {q:"Choose the conjunction: I wanted cake, ___ I ate fruit.", a:"But", w:["Fast","Table","Fruit"]},
    {q:"Choose the conjunction: Do you want red ___ blue?", a:"Or", w:["Jump","Soft","Blue"]},
    {q:"Choose the conjunction: I like cats ___ dogs.", a:"And", w:["Under","Blue","Dogs"]},
    {q:"Choose the conjunction: I wanted cake, ___ I ate fruit.", a:"But", w:["Fast","Table","Fruit"]},
    {q:"Choose the conjunction: Do you want red ___ blue?", a:"Or", w:["Jump","Soft","Blue"]},
    {q:"Choose the conjunction: I like cats ___ dogs.", a:"And", w:["Under","Blue","Dogs"]},
    {q:"Choose the conjunction: I wanted cake, ___ I ate fruit.", a:"But", w:["Fast","Table","Fruit"]},
    {q:"Choose the conjunction: Do you want red ___ blue?", a:"Or", w:["Jump","Soft","Blue"]},
    {q:"Choose the conjunction: I like cats ___ dogs.", a:"And", w:["Under","Blue","Dogs"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Conjunctions.");
}

function gen_g3_eng_L142(){
  const it = g23Pick([
    {q:"Which word joins ideas?", a:"And", w:["Dog","Chair","Ideas"]},
    {q:"Which word shows a choice?", a:"Or", w:["Run","Tall","Choice"]},
    {q:"Which word shows contrast?", a:"But", w:["Green","Pencil","Compare and contrast"]},
    {q:"Which word joins ideas?", a:"And", w:["Dog","Chair","Ideas"]},
    {q:"Which word shows a choice?", a:"Or", w:["Run","Tall","Choice"]},
    {q:"Which word shows contrast?", a:"But", w:["Green","Pencil","Compare and contrast"]},
    {q:"Which word joins ideas?", a:"And", w:["Dog","Chair","Ideas"]},
    {q:"Which word shows a choice?", a:"Or", w:["Run","Tall","Choice"]},
    {q:"Which word shows contrast?", a:"But", w:["Green","Pencil","Compare and contrast"]},
    {q:"Which word joins ideas?", a:"And", w:["Dog","Chair","Ideas"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_eng_L143(){
  const it = g23Pick([
    {q:"Complete: I studied ___ I had a test.", a:"because"},
    {q:"Complete: I like soccer ___ basketball.", a:"and"},
    {q:"Complete: I was tired, ___ I kept working.", a:"but"},
    {q:"Complete: I studied ___ I had a test.", a:"because"},
    {q:"Complete: I like soccer ___ basketball.", a:"and"},
    {q:"Complete: I was tired, ___ I kept working.", a:"but"},
    {q:"Complete: I studied ___ I had a test.", a:"because"},
    {q:"Complete: I like soccer ___ basketball.", a:"and"},
    {q:"Complete: I was tired, ___ I kept working.", a:"but"},
    {q:"Complete: I studied ___ I had a test.", a:"because"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_eng_L144(){
  return matchQuestion([
    {left:"I like tea ___ milk.", right:"and"},
    {left:"Do you want cake ___ pie?", right:"or"},
    {left:"I was cold, ___ I wore a coat.", right:"so"},
    {left:"I tried, ___ it was hard.", right:"but"}
  ]);
}
/* ---------- GRADE 3 MATH ---------- */
function gen_g3_math_L1(){
  const it = g23Pick([
    {q:"In 347, the digit 3 is in the…", a:"Hundreds", w:["Tens","Ones","The"]},
    {q:"In 582, the digit 8 is worth…", a:"80", w:["8","800","81"]},
    {q:"In 901, the digit 9 is worth…", a:"900", w:["90","9","901"]},
    {q:"In 624, the digit 2 is worth…", a:"20", w:["200","2","21"]},
    {q:"In 347, the digit 3 is in the…", a:"Hundreds", w:["Tens","Ones","The"]},
    {q:"In 582, the digit 8 is worth…", a:"80", w:["8","800","81"]},
    {q:"In 901, the digit 9 is worth…", a:"900", w:["90","9","901"]},
    {q:"In 624, the digit 2 is worth…", a:"20", w:["200","2","21"]},
    {q:"In 347, the digit 3 is in the…", a:"Hundreds", w:["Tens","Ones","The"]},
    {q:"In 582, the digit 8 is worth…", a:"80", w:["8","800","81"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Place value.");
}

function gen_g3_math_L2(){
  const it = g23Pick([
    {q:"Write 432 in expanded form.", a:"400 + 30 + 2", w:["40 + 300 + 2","400 + 3 + 20","Form"]},
    {q:"Write 567 in expanded form.", a:"500 + 60 + 7", w:["50 + 600 + 7","500 + 6 + 70","Form"]},
    {q:"Write 214 in expanded form.", a:"200 + 10 + 4", w:["20 + 100 + 4","200 + 1 + 40","Form"]},
    {q:"Write 432 in expanded form.", a:"400 + 30 + 2", w:["40 + 300 + 2","400 + 3 + 20","Form"]},
    {q:"Write 567 in expanded form.", a:"500 + 60 + 7", w:["50 + 600 + 7","500 + 6 + 70","Form"]},
    {q:"Write 214 in expanded form.", a:"200 + 10 + 4", w:["20 + 100 + 4","200 + 1 + 40","Form"]},
    {q:"Write 432 in expanded form.", a:"400 + 30 + 2", w:["40 + 300 + 2","400 + 3 + 20","Form"]},
    {q:"Write 567 in expanded form.", a:"500 + 60 + 7", w:["50 + 600 + 7","500 + 6 + 70","Form"]},
    {q:"Write 214 in expanded form.", a:"200 + 10 + 4", w:["20 + 100 + 4","200 + 1 + 40","Form"]},
    {q:"Write 432 in expanded form.", a:"400 + 30 + 2", w:["40 + 300 + 2","400 + 3 + 20","Form"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_math_L3(){
  const it = g23Pick([
    {q:"Write three hundred twenty-five in standard form.", a:"325"},
    {q:"Write four hundred six in standard form.", a:"406"},
    {q:"Write eight hundred ninety-two in standard form.", a:"892"},
    {q:"Write six hundred forty in standard form.", a:"640"},
    {q:"Write three hundred twenty-five in standard form.", a:"325"},
    {q:"Write four hundred six in standard form.", a:"406"},
    {q:"Write eight hundred ninety-two in standard form.", a:"892"},
    {q:"Write six hundred forty in standard form.", a:"640"},
    {q:"Write three hundred twenty-five in standard form.", a:"325"},
    {q:"Write four hundred six in standard form.", a:"406"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_math_L4(){
  return matchQuestion([
    {left:"123", right:"One hundred twenty-three"},
    {left:"456", right:"Four hundred fifty-six"},
    {left:"789", right:"Seven hundred eighty-nine"},
    {left:"205", right:"Two hundred five"}
  ]);
}

function gen_g3_math_L5(){
  const it = g23Pick([
    {bad:"the 5 in 567 is worth 500", good:"The 5 in 567 is worth 500."},
    {bad:"the 3 in 832 is worth 30", good:"The 3 in 832 is worth 30."},
    {bad:"the 7 in 271 is worth 70", good:"The 7 in 271 is worth 70."},
    {bad:"the 5 in 567 is worth 500", good:"The 5 in 567 is worth 500."},
    {bad:"the 3 in 832 is worth 30", good:"The 3 in 832 is worth 30."},
    {bad:"the 7 in 271 is worth 70", good:"The 7 in 271 is worth 70."},
    {bad:"the 5 in 567 is worth 500", good:"The 5 in 567 is worth 500."},
    {bad:"the 3 in 832 is worth 30", good:"The 3 in 832 is worth 30."},
    {bad:"the 7 in 271 is worth 70", good:"The 7 in 271 is worth 70."},
    {bad:"the 5 in 567 is worth 500", good:"The 5 in 567 is worth 500."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_math_L6(){
  const it = g23Pick([
    {q:"In 685, which digit is in the tens place?", a:"8", w:["6","5","9"]},
    {q:"In 241, which digit is in the hundreds place?", a:"2", w:["4","1","3"]},
    {q:"In 903, which digit is in the ones place?", a:"3", w:["9","0","4"]},
    {q:"In 718, which digit is in the tens place?", a:"1", w:["7","8","2"]},
    {q:"In 685, which digit is in the tens place?", a:"8", w:["6","5","9"]},
    {q:"In 241, which digit is in the hundreds place?", a:"2", w:["4","1","3"]},
    {q:"In 903, which digit is in the ones place?", a:"3", w:["9","0","4"]},
    {q:"In 718, which digit is in the tens place?", a:"1", w:["7","8","2"]},
    {q:"In 685, which digit is in the tens place?", a:"8", w:["6","5","9"]},
    {q:"In 241, which digit is in the hundreds place?", a:"2", w:["4","1","3"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Place value review.");
}

function gen_g3_math_L7(){
  const it = g23Pick([
    {q:"Which number is greater?", a:"456", w:["354","246","457"]},
    {q:"Which number is greater?", a:"782", w:["728","672","783"]},
    {q:"Which number is greater?", a:"905", w:["590","850","906"]},
    {q:"Which number is greater?", a:"456", w:["354","246","457"]},
    {q:"Which number is greater?", a:"782", w:["728","672","783"]},
    {q:"Which number is greater?", a:"905", w:["590","850","906"]},
    {q:"Which number is greater?", a:"456", w:["354","246","457"]},
    {q:"Which number is greater?", a:"782", w:["728","672","783"]},
    {q:"Which number is greater?", a:"905", w:["590","850","906"]},
    {q:"Which number is greater?", a:"456", w:["354","246","457"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_math_L8(){
  const it = g23Pick([
    {q:"Fill in: 532 ___ 523", a:">"},
    {q:"Fill in: 411 ___ 411", a:"="},
    {q:"Fill in: 289 ___ 298", a:"<"},
    {q:"Fill in: 704 ___ 699", a:">"},
    {q:"Fill in: 532 ___ 523", a:">"},
    {q:"Fill in: 411 ___ 411", a:"="},
    {q:"Fill in: 289 ___ 298", a:"<"},
    {q:"Fill in: 704 ___ 699", a:">"},
    {q:"Fill in: 532 ___ 523", a:">"},
    {q:"Fill in: 411 ___ 411", a:"="}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_math_L9(){
  return matchQuestion([
    {left:"145", right:"Smallest"},
    {left:"278", right:"Second"},
    {left:"523", right:"Third"},
    {left:"901", right:"Greatest"}
  ]);
}

function gen_g3_math_L10(){
  const it = g23Pick([
    {bad:"782 is less than 699", good:"782 is greater than 699."},
    {bad:"345 is greater than 543", good:"345 is less than 543."},
    {bad:"401 is less than 399", good:"401 is greater than 399."},
    {bad:"782 is less than 699", good:"782 is greater than 699."},
    {bad:"345 is greater than 543", good:"345 is less than 543."},
    {bad:"401 is less than 399", good:"401 is greater than 399."},
    {bad:"782 is less than 699", good:"782 is greater than 699."},
    {bad:"345 is greater than 543", good:"345 is less than 543."},
    {bad:"401 is less than 399", good:"401 is greater than 399."},
    {bad:"782 is less than 699", good:"782 is greater than 699."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_math_L11(){
  const it = g23Pick([
    {q:"Order from least to greatest: 321, 213, 132", a:"132, 213, 321", w:["321, 213, 132","213, 132, 321","Greatest"]},
    {q:"Order from least to greatest: 450, 405, 504", a:"405, 450, 504", w:["504, 450, 405","450, 405, 504","Greatest"]},
    {q:"Order from least to greatest: 700, 670, 760", a:"670, 700, 760", w:["760, 700, 670","700, 760, 670","Greatest"]},
    {q:"Order from least to greatest: 321, 213, 132", a:"132, 213, 321", w:["321, 213, 132","213, 132, 321","Greatest"]},
    {q:"Order from least to greatest: 450, 405, 504", a:"405, 450, 504", w:["504, 450, 405","450, 405, 504","Greatest"]},
    {q:"Order from least to greatest: 700, 670, 760", a:"670, 700, 760", w:["760, 700, 670","700, 760, 670","Greatest"]},
    {q:"Order from least to greatest: 321, 213, 132", a:"132, 213, 321", w:["321, 213, 132","213, 132, 321","Greatest"]},
    {q:"Order from least to greatest: 450, 405, 504", a:"405, 450, 504", w:["504, 450, 405","450, 405, 504","Greatest"]},
    {q:"Order from least to greatest: 700, 670, 760", a:"670, 700, 760", w:["760, 700, 670","700, 760, 670","Greatest"]},
    {q:"Order from least to greatest: 321, 213, 132", a:"132, 213, 321", w:["321, 213, 132","213, 132, 321","Greatest"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Ordering numbers.");
}

function gen_g3_math_L12(){
  const it = g23Pick([
    {q:"Which number comes first when ordering from least to greatest: 234, 432, 324?", a:"234", w:["432","324","235"]},
    {q:"Which number comes last when ordering from least to greatest: 615, 561, 651?", a:"651", w:["561","615","652"]},
    {q:"Which number is in the middle: 819, 891, 918?", a:"891", w:["819","918","892"]},
    {q:"Which number comes first when ordering from least to greatest: 234, 432, 324?", a:"234", w:["432","324","235"]},
    {q:"Which number comes last when ordering from least to greatest: 615, 561, 651?", a:"651", w:["561","615","652"]},
    {q:"Which number is in the middle: 819, 891, 918?", a:"891", w:["819","918","892"]},
    {q:"Which number comes first when ordering from least to greatest: 234, 432, 324?", a:"234", w:["432","324","235"]},
    {q:"Which number comes last when ordering from least to greatest: 615, 561, 651?", a:"651", w:["561","615","652"]},
    {q:"Which number is in the middle: 819, 891, 918?", a:"891", w:["819","918","892"]},
    {q:"Which number comes first when ordering from least to greatest: 234, 432, 324?", a:"234", w:["432","324","235"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_math_L13(){
  const it = g23Pick([
    {q:"Round 43 to the nearest ten.", a:"40"},
    {q:"Round 67 to the nearest ten.", a:"70"},
    {q:"Round 82 to the nearest ten.", a:"80"},
    {q:"Round 95 to the nearest ten.", a:"100"},
    {q:"Round 43 to the nearest ten.", a:"40"},
    {q:"Round 67 to the nearest ten.", a:"70"},
    {q:"Round 82 to the nearest ten.", a:"80"},
    {q:"Round 95 to the nearest ten.", a:"100"},
    {q:"Round 43 to the nearest ten.", a:"40"},
    {q:"Round 67 to the nearest ten.", a:"70"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_math_L14(){
  return matchQuestion([
    {left:"149", right:"100"},
    {left:"250", right:"300"},
    {left:"372", right:"400"},
    {left:"821", right:"800"}
  ]);
}

function gen_g3_math_L15(){
  const it = g23Pick([
    {bad:"46 rounds to 50 because 6 is 5 or more", good:"46 rounds to 50 because 6 is 5 or more."},
    {bad:"72 rounds to 70 because 2 is less than 5", good:"72 rounds to 70 because 2 is less than 5."},
    {bad:"185 rounds to 200 to the nearest hundred", good:"185 rounds to 200 to the nearest hundred."},
    {bad:"46 rounds to 50 because 6 is 5 or more", good:"46 rounds to 50 because 6 is 5 or more."},
    {bad:"72 rounds to 70 because 2 is less than 5", good:"72 rounds to 70 because 2 is less than 5."},
    {bad:"185 rounds to 200 to the nearest hundred", good:"185 rounds to 200 to the nearest hundred."},
    {bad:"46 rounds to 50 because 6 is 5 or more", good:"46 rounds to 50 because 6 is 5 or more."},
    {bad:"72 rounds to 70 because 2 is less than 5", good:"72 rounds to 70 because 2 is less than 5."},
    {bad:"185 rounds to 200 to the nearest hundred", good:"185 rounds to 200 to the nearest hundred."},
    {bad:"46 rounds to 50 because 6 is 5 or more", good:"46 rounds to 50 because 6 is 5 or more."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_math_L16(){
  const it = g23Pick([
    {q:"Round 348 to the nearest ten.", a:"350", w:["300","340","351"]},
    {q:"Round 521 to the nearest ten.", a:"520", w:["500","530","521"]},
    {q:"Round 786 to the nearest ten.", a:"790", w:["780","700","791"]},
    {q:"Round 634 to the nearest ten.", a:"630", w:["600","640","631"]},
    {q:"Round 348 to the nearest ten.", a:"350", w:["300","340","351"]},
    {q:"Round 521 to the nearest ten.", a:"520", w:["500","530","521"]},
    {q:"Round 786 to the nearest ten.", a:"790", w:["780","700","791"]},
    {q:"Round 634 to the nearest ten.", a:"630", w:["600","640","631"]},
    {q:"Round 348 to the nearest ten.", a:"350", w:["300","340","351"]},
    {q:"Round 521 to the nearest ten.", a:"520", w:["500","530","521"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Rounding to tens.");
}

function gen_g3_math_L17(){
  const it = g23Pick([
    {q:"Round 348 to the nearest hundred.", a:"300", w:["350","400","301"]},
    {q:"Round 521 to the nearest hundred.", a:"500", w:["520","600","501"]},
    {q:"Round 786 to the nearest hundred.", a:"800", w:["700","790","801"]},
    {q:"Round 388 to the nearest hundred.", a:"400", w:["350","300","401"]},
    {q:"Round 521 to the nearest hundred.", a:"500", w:["520","600","501"]},
    {q:"Round 786 to the nearest hundred.", a:"800", w:["700","790","801"]},
    {q:"Round 348 to the nearest hundred.", a:"300", w:["350","400","301"]},
    {q:"Round 521 to the nearest hundred.", a:"500", w:["520","600","501"]},
    {q:"Round 786 to the nearest hundred.", a:"800", w:["700","790","801"]},
    {q:"Round 348 to the nearest hundred.", a:"300", w:["350","400","301"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_math_L18(){
  const it = g23Pick([
    {q:"Round 464 to the nearest hundred.", a:"500"},
    {q:"Round 232 to the nearest hundred.", a:"200"},
    {q:"Round 750 to the nearest hundred.", a:"800"},
    {q:"Round 619 to the nearest hundred.", a:"600"},
    {q:"Round 464 to the nearest hundred.", a:"500"},
    {q:"Round 232 to the nearest hundred.", a:"200"},
    {q:"Round 750 to the nearest hundred.", a:"800"},
    {q:"Round 619 to the nearest hundred.", a:"600"},
    {q:"Round 464 to the nearest hundred.", a:"500"},
    {q:"Round 232 to the nearest hundred.", a:"200"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_math_L19(){
  return matchQuestion([
    {left:"42 + 19", right:"About 60"},
    {left:"81 + 17", right:"About 100"},
    {left:"34 + 28", right:"About 60"},
    {left:"53 + 46", right:"About 100"}
  ]);
}

function gen_g3_math_L20(){
  const it = g23Pick([
    {bad:"38 plus 42 is about 70", good:"38 plus 42 is about 80."},
    {bad:"61 plus 18 is about 90", good:"61 plus 18 is about 80."},
    {bad:"24 plus 27 is about 40", good:"24 plus 27 is about 50."},
    {bad:"38 plus 42 is about 70", good:"38 plus 42 is about 80."},
    {bad:"61 plus 18 is about 90", good:"61 plus 18 is about 80."},
    {bad:"24 plus 27 is about 40", good:"24 plus 27 is about 50."},
    {bad:"38 plus 42 is about 70", good:"38 plus 42 is about 80."},
    {bad:"61 plus 18 is about 90", good:"61 plus 18 is about 80."},
    {bad:"24 plus 27 is about 40", good:"24 plus 27 is about 50."},
    {bad:"38 plus 42 is about 70", good:"38 plus 42 is about 80."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}
/* ===========================
   GRADE 3 MATH L21-L40
   =========================== */

function gen_g3_math_L21(){
  const it = g23Pick([
    {q:"Estimate: 126 + 278", a:"400", w:["300","500","401"]},
    {q:"Estimate: 341 + 162", a:"500", w:["400","600","501"]},
    {q:"Estimate: 487 + 215", a:"700", w:["600","800","701"]},
    {q:"Estimate: 126 + 278", a:"400", w:["300","500","401"]},
    {q:"Estimate: 341 + 162", a:"500", w:["400","600","501"]},
    {q:"Estimate: 487 + 215", a:"700", w:["600","800","701"]},
    {q:"Estimate: 126 + 278", a:"400", w:["300","500","401"]},
    {q:"Estimate: 341 + 162", a:"500", w:["400","600","501"]},
    {q:"Estimate: 487 + 215", a:"700", w:["600","800","701"]},
    {q:"Estimate: 126 + 278", a:"400", w:["300","500","401"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Estimate sums.");
}

function gen_g3_math_L22(){
  const it = g23Pick([
    {q:"Estimate: 58 + 41", a:"100", w:["90","110","101"]},
    {q:"Estimate: 72 + 29", a:"100", w:["90","120","101"]},
    {q:"Estimate: 34 + 67", a:"100", w:["90","110","101"]},
    {q:"Estimate: 58 + 41", a:"100", w:["90","110","101"]},
    {q:"Estimate: 72 + 29", a:"100", w:["90","120","101"]},
    {q:"Estimate: 34 + 67", a:"100", w:["90","110","101"]},
    {q:"Estimate: 58 + 41", a:"100", w:["90","110","101"]},
    {q:"Estimate: 72 + 29", a:"100", w:["90","120","101"]},
    {q:"Estimate: 34 + 67", a:"100", w:["90","110","101"]},
    {q:"Estimate: 58 + 41", a:"100", w:["90","110","101"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_math_L23(){
  const it = g23Pick([
    {q:"Estimate: 193 + 206", a:"400"},
    {q:"Estimate: 451 + 140", a:"600"},
    {q:"Estimate: 305 + 278", a:"600"},
    {q:"Estimate: 622 + 181", a:"800"},
    {q:"Estimate: 193 + 206", a:"400"},
    {q:"Estimate: 451 + 140", a:"600"},
    {q:"Estimate: 305 + 278", a:"600"},
    {q:"Estimate: 622 + 181", a:"800"},
    {q:"Estimate: 193 + 206", a:"400"},
    {q:"Estimate: 451 + 140", a:"600"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_math_L24(){
  return matchQuestion([
    {left:"145 + 255", right:"400"},
    {left:"378 + 211", right:"600"},
    {left:"492 + 101", right:"600"},
    {left:"601 + 196", right:"800"}
  ]);
}

function gen_g3_math_L25(){
  const it = g23Pick([
    {bad:"198 plus 203 is about 300", good:"198 plus 203 is about 400."},
    {bad:"451 plus 151 is about 500", good:"451 plus 151 is about 600."},
    {bad:"289 plus 322 is about 500", good:"289 plus 322 is about 600."},
    {bad:"198 plus 203 is about 300", good:"198 plus 203 is about 400."},
    {bad:"451 plus 151 is about 500", good:"451 plus 151 is about 600."},
    {bad:"289 plus 322 is about 500", good:"289 plus 322 is about 600."},
    {bad:"198 plus 203 is about 300", good:"198 plus 203 is about 400."},
    {bad:"451 plus 151 is about 500", good:"451 plus 151 is about 600."},
    {bad:"289 plus 322 is about 500", good:"289 plus 322 is about 600."},
    {bad:"198 plus 203 is about 300", good:"198 plus 203 is about 400."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_math_L26(){
  const it = g23Pick([
    {q:"Estimate: 483 - 201", a:"300", w:["200","400","301"]},
    {q:"Estimate: 691 - 289", a:"400", w:["300","500","401"]},
    {q:"Estimate: 552 - 148", a:"400", w:["300","500","401"]},
    {q:"Estimate: 483 - 201", a:"300", w:["200","400","301"]},
    {q:"Estimate: 691 - 289", a:"400", w:["300","500","401"]},
    {q:"Estimate: 552 - 148", a:"400", w:["300","500","401"]},
    {q:"Estimate: 483 - 201", a:"300", w:["200","400","301"]},
    {q:"Estimate: 691 - 289", a:"400", w:["300","500","401"]},
    {q:"Estimate: 552 - 148", a:"400", w:["300","500","401"]},
    {q:"Estimate: 483 - 201", a:"300", w:["200","400","301"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Estimate differences.");
}

function gen_g3_math_L27(){
  const it = g23Pick([
    {q:"Estimate: 81 - 39", a:"40", w:["30","50","41"]},
    {q:"Estimate: 62 - 22", a:"40", w:["30","50","41"]},
    {q:"Estimate: 95 - 44", a:"50", w:["40","60","51"]},
    {q:"Estimate: 81 - 39", a:"40", w:["30","50","41"]},
    {q:"Estimate: 62 - 22", a:"40", w:["30","50","41"]},
    {q:"Estimate: 95 - 44", a:"50", w:["40","60","51"]},
    {q:"Estimate: 81 - 39", a:"40", w:["30","50","41"]},
    {q:"Estimate: 62 - 22", a:"40", w:["30","50","41"]},
    {q:"Estimate: 95 - 44", a:"50", w:["40","60","51"]},
    {q:"Estimate: 81 - 39", a:"40", w:["30","50","41"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_math_L28(){
  const it = g23Pick([
    {q:"Estimate: 506 - 194", a:"300"},
    {q:"Estimate: 421 - 118", a:"300"},
    {q:"Estimate: 835 - 224", a:"600"},
    {q:"Estimate: 710 - 289", a:"400"},
    {q:"Estimate: 506 - 194", a:"300"},
    {q:"Estimate: 421 - 118", a:"300"},
    {q:"Estimate: 835 - 224", a:"600"},
    {q:"Estimate: 710 - 289", a:"400"},
    {q:"Estimate: 506 - 194", a:"300"},
    {q:"Estimate: 421 - 118", a:"300"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_math_L29(){
  return matchQuestion([
    {left:"404 - 197", right:"200"},
    {left:"612 - 188", right:"400"},
    {left:"801 - 295", right:"500"},
    {left:"735 - 142", right:"600"}
  ]);
}

function gen_g3_math_L30(){
  const it = g23Pick([
    {bad:"605 minus 198 is about 300", good:"605 minus 198 is about 400."},
    {bad:"792 minus 301 is about 600", good:"792 minus 301 is about 500."},
    {bad:"432 minus 129 is about 200", good:"432 minus 129 is about 300."},
    {bad:"605 minus 198 is about 300", good:"605 minus 198 is about 400."},
    {bad:"792 minus 301 is about 600", good:"792 minus 301 is about 500."},
    {bad:"432 minus 129 is about 200", good:"432 minus 129 is about 300."},
    {bad:"605 minus 198 is about 300", good:"605 minus 198 is about 400."},
    {bad:"792 minus 301 is about 600", good:"792 minus 301 is about 500."},
    {bad:"432 minus 129 is about 200", good:"432 minus 129 is about 300."},
    {bad:"605 minus 198 is about 300", good:"605 minus 198 is about 400."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_math_L31(){
  const it = g23Pick([
    {q:"234 + 145 =", a:"379", w:["369","389","380"]},
    {q:"321 + 257 =", a:"578", w:["568","588","579"]},
    {q:"412 + 176 =", a:"588", w:["578","598","589"]},
    {q:"234 + 145 =", a:"379", w:["369","389","380"]},
    {q:"321 + 257 =", a:"578", w:["568","588","579"]},
    {q:"412 + 176 =", a:"588", w:["578","598","589"]},
    {q:"234 + 145 =", a:"379", w:["369","389","380"]},
    {q:"321 + 257 =", a:"578", w:["568","588","579"]},
    {q:"412 + 176 =", a:"588", w:["578","598","589"]},
    {q:"234 + 145 =", a:"379", w:["369","389","380"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Three-digit addition.");
}

function gen_g3_math_L32(){
  const it = g23Pick([
    {q:"156 + 223 =", a:"379", w:["369","389","380"]},
    {q:"412 + 145 =", a:"557", w:["547","567","558"]},
    {q:"288 + 311 =", a:"599", w:["589","609","600"]},
    {q:"156 + 223 =", a:"379", w:["369","389","380"]},
    {q:"412 + 145 =", a:"557", w:["547","567","558"]},
    {q:"288 + 311 =", a:"599", w:["589","609","600"]},
    {q:"156 + 223 =", a:"379", w:["369","389","380"]},
    {q:"412 + 145 =", a:"557", w:["547","567","558"]},
    {q:"288 + 311 =", a:"599", w:["589","609","600"]},
    {q:"156 + 223 =", a:"379", w:["369","389","380"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_math_L33(){
  const it = g23Pick([
    {q:"245 + 132 =", a:"377"},
    {q:"364 + 215 =", a:"579"},
    {q:"187 + 401 =", a:"588"},
    {q:"522 + 176 =", a:"698"},
    {q:"245 + 132 =", a:"377"},
    {q:"364 + 215 =", a:"579"},
    {q:"187 + 401 =", a:"588"},
    {q:"522 + 176 =", a:"698"},
    {q:"245 + 132 =", a:"377"},
    {q:"364 + 215 =", a:"579"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_math_L34(){
  return matchQuestion([
    {left:"111 + 222", right:"333"},
    {left:"245 + 155", right:"400"},
    {left:"321 + 279", right:"600"},
    {left:"501 + 199", right:"700"}
  ]);
}

function gen_g3_math_L35(){
  const it = g23Pick([
    {bad:"245 plus 155 equals 300", good:"245 plus 155 equals 400."},
    {bad:"321 plus 279 equals 500", good:"321 plus 279 equals 600."},
    {bad:"501 plus 199 equals 600", good:"501 plus 199 equals 700."},
    {bad:"245 plus 155 equals 300", good:"245 plus 155 equals 400."},
    {bad:"321 plus 279 equals 500", good:"321 plus 279 equals 600."},
    {bad:"501 plus 199 equals 600", good:"501 plus 199 equals 700."},
    {bad:"245 plus 155 equals 300", good:"245 plus 155 equals 400."},
    {bad:"321 plus 279 equals 500", good:"321 plus 279 equals 600."},
    {bad:"501 plus 199 equals 600", good:"501 plus 199 equals 700."},
    {bad:"245 plus 155 equals 300", good:"245 plus 155 equals 400."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_math_L36(){
  const it = g23Pick([
    {q:"A store sold 234 toys on Monday and 156 on Tuesday. Total?", a:"390", w:["380","400","391"]},
    {q:"A library had 321 books and got 178 more. Total?", a:"499", w:["489","509","500"]},
    {q:"A school raised 412 dollars and then 188 more. Total?", a:"600", w:["590","610","601"]},
    {q:"A store sold 234 toys on Monday and 156 on Tuesday. Total?", a:"390", w:["380","400","391"]},
    {q:"A library had 321 books and got 178 more. Total?", a:"499", w:["489","509","500"]},
    {q:"A school raised 412 dollars and then 188 more. Total?", a:"600", w:["590","610","601"]},
    {q:"A store sold 234 toys on Monday and 156 on Tuesday. Total?", a:"390", w:["380","400","391"]},
    {q:"A library had 321 books and got 178 more. Total?", a:"499", w:["489","509","500"]},
    {q:"A school raised 412 dollars and then 188 more. Total?", a:"600", w:["590","610","601"]},
    {q:"A store sold 234 toys on Monday and 156 on Tuesday. Total?", a:"390", w:["380","400","391"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Addition word problems.");
}

function gen_g3_math_L37(){
  const it = g23Pick([
    {q:"543 - 121 =", a:"422", w:["432","412","423"]},
    {q:"800 - 235 =", a:"565", w:["555","575","566"]},
    {q:"674 - 252 =", a:"422", w:["412","432","423"]},
    {q:"543 - 121 =", a:"422", w:["432","412","423"]},
    {q:"800 - 235 =", a:"565", w:["555","575","566"]},
    {q:"674 - 252 =", a:"422", w:["412","432","423"]},
    {q:"543 - 121 =", a:"422", w:["432","412","423"]},
    {q:"800 - 235 =", a:"565", w:["555","575","566"]},
    {q:"674 - 252 =", a:"422", w:["412","432","423"]},
    {q:"543 - 121 =", a:"422", w:["432","412","423"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Three-digit subtraction.");
}

function gen_g3_math_L38(){
  const it = g23Pick([
    {q:"623 - 201 =", a:"422", w:["412","432","423"]},
    {q:"741 - 219 =", a:"522", w:["512","532","523"]},
    {q:"900 - 378 =", a:"522", w:["512","532","523"]},
    {q:"623 - 201 =", a:"422", w:["412","432","423"]},
    {q:"741 - 219 =", a:"522", w:["512","532","523"]},
    {q:"900 - 378 =", a:"522", w:["512","532","523"]},
    {q:"623 - 201 =", a:"422", w:["412","432","423"]},
    {q:"741 - 219 =", a:"522", w:["512","532","523"]},
    {q:"900 - 378 =", a:"522", w:["512","532","523"]},
    {q:"623 - 201 =", a:"422", w:["412","432","423"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_math_L39(){
  const it = g23Pick([
    {q:"534 - 112 =", a:"422"},
    {q:"701 - 179 =", a:"522"},
    {q:"850 - 328 =", a:"522"},
    {q:"690 - 268 =", a:"422"},
    {q:"534 - 112 =", a:"422"},
    {q:"701 - 179 =", a:"522"},
    {q:"850 - 328 =", a:"522"},
    {q:"690 - 268 =", a:"422"},
    {q:"534 - 112 =", a:"422"},
    {q:"701 - 179 =", a:"522"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_math_L40(){
  return matchQuestion([
    {left:"500 - 100", right:"400"},
    {left:"700 - 200", right:"500"},
    {left:"800 - 300", right:"500"},
    {left:"900 - 400", right:"500"}
  ]);
}
/* ===========================
   GRADE 3 MATH L41-L60
   =========================== */

function gen_g3_math_L41(){
  const it = g23Pick([
    {bad:"700 minus 275 equals 525", good:"700 minus 275 equals 425."},
    {bad:"632 minus 218 equals 514", good:"632 minus 218 equals 414."},
    {bad:"850 minus 325 equals 625", good:"850 minus 325 equals 525."},
    {bad:"700 minus 275 equals 525", good:"700 minus 275 equals 425."},
    {bad:"632 minus 218 equals 514", good:"632 minus 218 equals 414."},
    {bad:"850 minus 325 equals 625", good:"850 minus 325 equals 525."},
    {bad:"700 minus 275 equals 525", good:"700 minus 275 equals 425."},
    {bad:"632 minus 218 equals 514", good:"632 minus 218 equals 414."},
    {bad:"850 minus 325 equals 625", good:"850 minus 325 equals 525."},
    {bad:"700 minus 275 equals 525", good:"700 minus 275 equals 425."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_math_L42(){
  const it = g23Pick([
    {q:"A class had 650 pencils. They used 225. How many are left?", a:"425", w:["525","325","426"]},
    {q:"A store had 780 apples. It sold 340. How many are left?", a:"440", w:["540","430","441"]},
    {q:"There were 900 tickets. 475 were sold. How many are left?", a:"425", w:["525","400","426"]},
    {q:"A class had 650 pencils. They used 225. How many are left?", a:"425", w:["525","325","426"]},
    {q:"A store had 780 apples. It sold 340. How many are left?", a:"440", w:["540","430","441"]},
    {q:"There were 900 tickets. 475 were sold. How many are left?", a:"425", w:["525","400","426"]},
    {q:"A class had 650 pencils. They used 225. How many are left?", a:"425", w:["525","325","426"]},
    {q:"A store had 780 apples. It sold 340. How many are left?", a:"440", w:["540","430","441"]},
    {q:"There were 900 tickets. 475 were sold. How many are left?", a:"425", w:["525","400","426"]},
    {q:"A class had 650 pencils. They used 225. How many are left?", a:"425", w:["525","325","426"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Subtraction word problems.");
}

function gen_g3_math_L43(){
  const it = g23Pick([
    {q:"4 quarters equal…", a:"$1.00", w:["$0.25","$0.50","$0.75"]},
    {q:"10 dimes equal…", a:"$1.00", w:["$0.10","$0.50","$0.90"]},
    {q:"20 nickels equal…", a:"$1.00", w:["$0.20","$0.75","$0.95"]},
    {q:"2 quarters equal…", a:"$0.50", w:["$0.20","$0.25","$0.75"]},
    {q:"5 dimes equal…", a:"$0.50", w:["$0.05","$0.25","$1.00"]},
    {q:"10 nickels equal…", a:"$0.50", w:["$0.10","$0.25","$1.00"]},
    {q:"3 quarters equal…", a:"$0.75", w:["$0.30","$0.50","$1.00"]},
    {q:"7 dimes equal…", a:"$0.70", w:["$0.07","$0.50","$0.80"]},
    {q:"8 nickels equal…", a:"$0.40", w:["$0.08","$0.35","$0.80"]},
    {q:"1 quarter and 2 dimes equal…", a:"$0.45", w:["$0.30","$0.35","$0.50"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_math_L44(){
  const it = g23Pick([
    {q:"$1.25 + $2.00 =", a:"$3.25"},
    {q:"$3.50 + $1.25 =", a:"$4.75"},
    {q:"$2.10 + $0.90 =", a:"$3.00"},
    {q:"$5.00 - $1.50 =", a:"$3.50"},
    {q:"$1.25 + $2.00 =", a:"$3.25"},
    {q:"$3.50 + $1.25 =", a:"$4.75"},
    {q:"$2.10 + $0.90 =", a:"$3.00"},
    {q:"$5.00 - $1.50 =", a:"$3.50"},
    {q:"$1.25 + $2.00 =", a:"$3.25"},
    {q:"$3.50 + $1.25 =", a:"$4.75"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_math_L45(){
  return matchQuestion([
    {left:"Need", right:"Food"},
    {left:"Want", right:"Toy"},
    {left:"Save", right:"Keep money for later"},
    {left:"Spend", right:"Use money to buy something"}
  ]);
}

function gen_g3_math_L46(){
  const it = g23Pick([
    {bad:"a budget helps you plan money", good:"A budget helps you plan money."},
    {bad:"saving means keeping money for later", good:"Saving means keeping money for later."},
    {bad:"food is a need and toys are wants", good:"Food is a need, and toys are wants."},
    {bad:"a budget helps you plan money", good:"A budget helps you plan money."},
    {bad:"saving means keeping money for later", good:"Saving means keeping money for later."},
    {bad:"food is a need and toys are wants", good:"Food is a need, and toys are wants."},
    {bad:"a budget helps you plan money", good:"A budget helps you plan money."},
    {bad:"saving means keeping money for later", good:"Saving means keeping money for later."},
    {bad:"food is a need and toys are wants", good:"Food is a need, and toys are wants."},
    {bad:"a budget helps you plan money", good:"A budget helps you plan money."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_math_L47(){
  const it = g23Pick([
    {q:"You have $5. You buy a snack for $2. How much is left?", a:"$3", w:["$2","$7","Left"]},
    {q:"You have $10. You spend $4. How much is left?", a:"$6", w:["$5","$14","Left"]},
    {q:"You save $3 each week for 2 weeks. How much do you save?", a:"$6", w:["$5","$9","Save"]},
    {q:"You have $5. You buy a snack for $2. How much is left?", a:"$3", w:["$2","$7","Left"]},
    {q:"You have $10. You spend $4. How much is left?", a:"$6", w:["$5","$14","Left"]},
    {q:"You save $3 each week for 2 weeks. How much do you save?", a:"$6", w:["$5","$9","Save"]},
    {q:"You have $5. You buy a snack for $2. How much is left?", a:"$3", w:["$2","$7","Left"]},
    {q:"You have $10. You spend $4. How much is left?", a:"$6", w:["$5","$14","Left"]},
    {q:"You save $3 each week for 2 weeks. How much do you save?", a:"$6", w:["$5","$9","Save"]},
    {q:"You have $5. You buy a snack for $2. How much is left?", a:"$3", w:["$2","$7","Left"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Financial literacy.");
}

function gen_g3_math_L48(){
  const it = g23Pick([
    {q:"Which is usually a need?", a:"Food", w:["Video game","Candy","Game"]},
    {q:"Which is usually a want?", a:"Toy", w:["Water","Shelter","Want"]},
    {q:"What does saving mean?", a:"Keeping money for later", w:["Spending all money","Losing money","Median"]},
    {q:"Which is usually a need?", a:"Food", w:["Video game","Candy","Game"]},
    {q:"Which is usually a want?", a:"Toy", w:["Water","Shelter","Want"]},
    {q:"What does saving mean?", a:"Keeping money for later", w:["Spending all money","Losing money","Median"]},
    {q:"Which is usually a need?", a:"Food", w:["Video game","Candy","Game"]},
    {q:"Which is usually a want?", a:"Toy", w:["Water","Shelter","Want"]},
    {q:"What does saving mean?", a:"Keeping money for later", w:["Spending all money","Losing money","Median"]},
    {q:"Which is usually a need?", a:"Food", w:["Video game","Candy","Game"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_math_L49(){
  const it = g23Pick([
    {q:"12 + 8 - 5 =", a:"15"},
    {q:"30 - 10 + 6 =", a:"26"},
    {q:"5 × 3 + 4 =", a:"19"},
    {q:"20 ÷ 4 + 7 =", a:"12"},
    {q:"12 + 8 - 5 =", a:"15"},
    {q:"30 - 10 + 6 =", a:"26"},
    {q:"5 × 3 + 4 =", a:"19"},
    {q:"20 ÷ 4 + 7 =", a:"12"},
    {q:"12 + 8 - 5 =", a:"15"},
    {q:"30 - 10 + 6 =", a:"26"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_math_L50(){
  return matchQuestion([
    {left:"8 + 7", right:"15"},
    {left:"20 - 6", right:"14"},
    {left:"4 × 5", right:"20"},
    {left:"18 ÷ 3", right:"6"}
  ]);
}

function gen_g3_math_L51(){
  const it = g23Pick([
    {bad:"6 times 4 equals 20", good:"6 times 4 equals 24."},
    {bad:"30 divided by 5 equals 5", good:"30 divided by 5 equals 6."},
    {bad:"18 plus 7 equals 24", good:"18 plus 7 equals 25."},
    {bad:"6 times 4 equals 20", good:"6 times 4 equals 24."},
    {bad:"30 divided by 5 equals 5", good:"30 divided by 5 equals 6."},
    {bad:"18 plus 7 equals 24", good:"18 plus 7 equals 25."},
    {bad:"6 times 4 equals 20", good:"6 times 4 equals 24."},
    {bad:"30 divided by 5 equals 5", good:"30 divided by 5 equals 6."},
    {bad:"18 plus 7 equals 24", good:"18 plus 7 equals 25."},
    {bad:"6 times 4 equals 20", good:"6 times 4 equals 24."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_math_L52(){
  const it = g23Pick([
    {q:"Which operation solves: 6 groups of 4?", a:"Multiplication", w:["Subtraction","Addition","1/2"]},
    {q:"Which operation solves: share 20 into 5 groups?", a:"Division", w:["Addition","Multiplication","1/2"]},
    {q:"Which operation solves: 32 more than 18?", a:"Addition", w:["Division","Subtraction","1/2"]},
    {q:"Which operation solves: 6 groups of 4?", a:"Multiplication", w:["Subtraction","Addition","1/2"]},
    {q:"Which operation solves: share 20 into 5 groups?", a:"Division", w:["Addition","Multiplication","1/2"]},
    {q:"Which operation solves: 32 more than 18?", a:"Addition", w:["Division","Subtraction","1/2"]},
    {q:"Which operation solves: 6 groups of 4?", a:"Multiplication", w:["Subtraction","Addition","1/2"]},
    {q:"Which operation solves: share 20 into 5 groups?", a:"Division", w:["Addition","Multiplication","1/2"]},
    {q:"Which operation solves: 32 more than 18?", a:"Addition", w:["Division","Subtraction","1/2"]},
    {q:"Which operation solves: 6 groups of 4?", a:"Multiplication", w:["Subtraction","Addition","1/2"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Mixed operations.");
}

function gen_g3_math_L53(){
  const it = g23Pick([
    {q:"9 × 3 =", a:"27", w:["24","30","28"]},
    {q:"36 ÷ 6 =", a:"6", w:["5","7","8"]},
    {q:"45 - 18 =", a:"27", w:["26","28","29"]},
    {q:"9 × 3 =", a:"27", w:["24","30","28"]},
    {q:"36 ÷ 6 =", a:"6", w:["5","7","8"]},
    {q:"45 - 18 =", a:"27", w:["26","28","29"]},
    {q:"9 × 3 =", a:"27", w:["24","30","28"]},
    {q:"36 ÷ 6 =", a:"6", w:["5","7","8"]},
    {q:"45 - 18 =", a:"27", w:["26","28","29"]},
    {q:"9 × 3 =", a:"27", w:["24","30","28"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_math_L54(){
  const it = g23Pick([
    {q:"7 × 4 - 8 =", a:"20"},
    {q:"40 ÷ 5 + 9 =", a:"17"},
    {q:"25 + 15 - 6 =", a:"34"},
    {q:"6 × 6 + 4 =", a:"40"},
    {q:"7 × 4 - 8 =", a:"20"},
    {q:"40 ÷ 5 + 9 =", a:"17"},
    {q:"25 + 15 - 6 =", a:"34"},
    {q:"6 × 6 + 4 =", a:"40"},
    {q:"7 × 4 - 8 =", a:"20"},
    {q:"40 ÷ 5 + 9 =", a:"17"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_math_L55(){
  return matchQuestion([
    {left:"12 ÷ 3", right:"4"},
    {left:"20 ÷ 5", right:"4"},
    {left:"24 ÷ 6", right:"4"},
    {left:"32 ÷ 8", right:"4"}
  ]);
}

function gen_g3_math_L56(){
  const it = g23Pick([
    {bad:"24 cookies shared by 6 kids gives each kid 3", good:"24 cookies shared by 6 kids gives each kid 4."},
    {bad:"18 pencils shared by 3 students gives each student 5", good:"18 pencils shared by 3 students gives each student 6."},
    {bad:"30 toys in 5 boxes means 7 toys in each box", good:"30 toys in 5 boxes means 6 toys in each box."},
    {bad:"24 cookies shared by 6 kids gives each kid 3", good:"24 cookies shared by 6 kids gives each kid 4."},
    {bad:"18 pencils shared by 3 students gives each student 5", good:"18 pencils shared by 3 students gives each student 6."},
    {bad:"30 toys in 5 boxes means 7 toys in each box", good:"30 toys in 5 boxes means 6 toys in each box."},
    {bad:"24 cookies shared by 6 kids gives each kid 3", good:"24 cookies shared by 6 kids gives each kid 4."},
    {bad:"18 pencils shared by 3 students gives each student 5", good:"18 pencils shared by 3 students gives each student 6."},
    {bad:"30 toys in 5 boxes means 7 toys in each box", good:"30 toys in 5 boxes means 6 toys in each box."},
    {bad:"24 cookies shared by 6 kids gives each kid 3", good:"24 cookies shared by 6 kids gives each kid 4."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g3_math_L57(){
  const it = g23Pick([
    {q:"24 apples are shared equally among 6 baskets. How many in each?", a:"4", w:["5","6","3"]},
    {q:"18 cookies are shared among 3 kids. How many each?", a:"6", w:["5","7","8"]},
    {q:"32 crayons are put into 8 boxes. How many in each?", a:"4", w:["6","8","5"]},
    {q:"24 apples are shared equally among 6 baskets. How many in each?", a:"4", w:["5","6","3"]},
    {q:"18 cookies are shared among 3 kids. How many each?", a:"6", w:["5","7","8"]},
    {q:"32 crayons are put into 8 boxes. How many in each?", a:"4", w:["6","8","5"]},
    {q:"24 apples are shared equally among 6 baskets. How many in each?", a:"4", w:["5","6","3"]},
    {q:"18 cookies are shared among 3 kids. How many each?", a:"6", w:["5","7","8"]},
    {q:"32 crayons are put into 8 boxes. How many in each?", a:"4", w:["6","8","5"]},
    {q:"24 apples are shared equally among 6 baskets. How many in each?", a:"4", w:["5","6","3"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Division word problems.");
}

function gen_g3_math_L58(){
  const it = g23Pick([
    {q:"21 ÷ 3 =", a:"7", w:["6","8","9"]},
    {q:"36 ÷ 4 =", a:"9", w:["8","7","10"]},
    {q:"40 ÷ 5 =", a:"8", w:["7","9","10"]},
    {q:"21 ÷ 3 =", a:"7", w:["6","8","9"]},
    {q:"36 ÷ 4 =", a:"9", w:["8","7","10"]},
    {q:"40 ÷ 5 =", a:"8", w:["7","9","10"]},
    {q:"21 ÷ 3 =", a:"7", w:["6","8","9"]},
    {q:"36 ÷ 4 =", a:"9", w:["8","7","10"]},
    {q:"40 ÷ 5 =", a:"8", w:["7","9","10"]},
    {q:"21 ÷ 3 =", a:"7", w:["6","8","9"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g3_math_L59(){
  const it = g23Pick([
    {q:"There are 28 students in 4 equal teams. Each team has __ students.", a:"7"},
    {q:"There are 45 stickers shared by 5 kids. Each kid gets __ stickers.", a:"9"},
    {q:"There are 36 books on 6 shelves. Each shelf has __ books.", a:"6"},
    {q:"There are 24 cupcakes in 3 boxes. Each box has __ cupcakes.", a:"8"},
    {q:"There are 28 students in 4 equal teams. Each team has __ students.", a:"7"},
    {q:"There are 45 stickers shared by 5 kids. Each kid gets __ stickers.", a:"9"},
    {q:"There are 36 books on 6 shelves. Each shelf has __ books.", a:"6"},
    {q:"There are 24 cupcakes in 3 boxes. Each box has __ cupcakes.", a:"8"},
    {q:"There are 28 students in 4 equal teams. Each team has __ students.", a:"7"},
    {q:"There are 45 stickers shared by 5 kids. Each kid gets __ stickers.", a:"9"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g3_math_L60(){
  return matchQuestion([
    {left:"15 ÷ 3", right:"5"},
    {left:"42 ÷ 6", right:"7"},
    {left:"56 ÷ 8", right:"7"},
    {left:"72 ÷ 9", right:"8"}
  ]);
}
/* ---------- GRADE 3 SCIENCE ---------- */
function gen_g3_sci_L1(){
  const qset = [
    {q:"A desert is a type of…", a:"Habitat", w:["Weather","Rock","Reptile"]},
    {q:"Fish live in a…", a:"Water habitat", w:["Desert","Forest","Reptile"]},
    {q:"Birds build nests in their…", a:"Habitat", w:["Food","Water","Reptile"]},
  ];
  const it = g23Pick(qset);
  return mcQuestion(it.q, it.a, it.w, "Think about habitats.");
}

function gen_g3_sci_L2(){
  const qset = [
    {q:"A thermometer measures…", a:"Temperature", w:["Wind","Rain","Climate"]},
    {q:"A rain gauge measures…", a:"Rainfall", w:["Heat","Time","Climate"]},
    {q:"A wind vane shows…", a:"Wind direction", w:["Temperature","Rain","Climate"]},
  ];
  const it = g23Pick(qset);
  return mcQuestion(it.q, it.a, it.w, "Choose the weather tool.");
}

function gen_g3_sci_L3(){
  const qset = [
    {q:"A push or pull is a…", a:"Force", w:["Sound","Light","Plain"]},
    {q:"Forces can change an object’s…", a:"Motion", w:["Color","Size","Gravity"]},
    {q:"Friction makes things move…", a:"Slower", w:["Faster","Invisible","Gravity"]},
  ];
  const it = g23Pick(qset);
  return mcQuestion(it.q, it.a, it.w, "Think about forces and motion.");
}

/* =========================================================
   GRADE 2-3: 25-QUESTION TEKS MASTERY SEQUENCES

   These contracts replace the early placeholder generators above. Every
   lesson owns a deterministic sequence of twenty-five distinct questions. The
   active question is selected only by LR.round, so no shared question or
   distractor pool can leak unrelated content into a lesson.

   Official sources (Texas Education Agency):
   - Grade 2 compiled TEKS, revised June 2024
   - Grade 3 compiled TEKS, revised June 2024
   - 19 TAC Chapter 112, Subchapter A, Science, updated August 2024
========================================================= */

const G23_TEKS_OFFICIAL_SOURCES = Object.freeze({
  g2:"https://tea.texas.gov/curriculum-and-instruction/curriculum-standards/grade2-teks-062024.pdf",
  g3:"https://tea.texas.gov/curriculum-and-instruction/curriculum-standards/grade3-teks-062024.pdf",
  science:"https://tea.texas.gov/about-tea/laws-and-rules/sboe-rules-tac/sboe-tac-currently-in-effect/ch112a.pdf"
});

const G23_TEKS_EXPECTATION_TEXT = Object.assign(Object.create(null), {
  "§110.4(b)(2)(B)(iii)":"decode multisyllabic words with closed syllables; open syllables; VCe syllables; vowel teams, including digraphs and diphthongs; r-controlled syllables; and final stable syllables",
  "§110.4(b)(3)(B)":"use context within and beyond a sentence to determine the meaning of unfamiliar words",
  "§110.4(b)(6)(G)":"evaluate details read to determine key ideas",
  "§110.4(b)(11)(D)(i)":"edit drafts using standard English conventions, including complete sentences with subject-verb agreement",
  "§110.4(b)(11)(D)(ii)":"edit drafts using standard English conventions, including past, present, and future verb tense",
  "§110.4(b)(11)(D)(iii)":"edit drafts using standard English conventions, including singular, plural, common, and proper nouns",
  "§110.4(b)(11)(D)(x)":"edit drafts using standard English conventions, including end punctuation, apostrophes in contractions, and commas with items in a series and in dates",
  "§110.4(b)(11)(D)(xi)":"edit drafts using standard English conventions, including correct spelling of words with grade-appropriate orthographic patterns and rules and high-frequency words",
  "§111.4(b)(2)(A)":"use concrete and pictorial models to compose and decompose numbers up to 1,200 in more than one way as a sum of so many thousands, hundreds, tens, and ones",
  "§111.4(b)(4)(B)":"add up to four two-digit numbers and subtract two-digit numbers using mental strategies and algorithms based on knowledge of place value and properties of operations",
  "§111.4(b)(4)(C)":"solve one-step and multi-step word problems involving addition and subtraction within 1,000 using a variety of strategies based on place value, including algorithms",
  "§111.4(b)(5)(A)":"determine the value of a collection of coins up to one dollar",
  "§111.4(b)(6)(A)":"model, create, and describe contextual multiplication situations in which equivalent sets of concrete objects are joined",
  "§111.4(b)(9)(G)":"read and write time to the nearest one-minute increment using analog and digital clocks and distinguish between a.m. and p.m.",
  "§112.4(b)(6)(A)":"classify matter by observable physical properties, including texture, flexibility, and relative temperature, and identify whether a material is a solid or liquid",
  "§112.4(b)(13)(A)":"identify the roots, stems, leaves, flowers, fruits, and seeds of plants and compare how those structures help different plants meet their basic needs for survival",
  "§112.4(b)(13)(C)":"record and compare how being part of a group helps animals obtain food, defend themselves, and cope with changes",
  "§112.4(b)(13)(D)":"investigate and describe some of the unique life cycles of animals where young animals do not resemble their parents, including butterflies and frogs",
  "§110.5(b)(2)(A)(i)":"decode multisyllabic words with multiple sound-spelling patterns such as eigh, ough, and en",
  "§110.5(b)(2)(A)(ii)":"decode multisyllabic words with closed syllables; open syllables; VCe syllables; vowel teams, including digraphs and diphthongs; r-controlled syllables; and final stable syllables",
  "§110.5(b)(2)(A)(iii)":"decode compound words, contractions, and abbreviations",
  "§110.5(b)(2)(A)(iv)":"decode words using knowledge of syllable division patterns such as VCCV, VCV, and VCCCV with accent shifts",
  "§110.5(b)(2)(A)(v)":"decode words using knowledge of prefixes",
  "§110.5(b)(2)(A)(vi)":"decode words using knowledge of suffixes, including how they can change base words such as dropping e, changing y to i, and doubling final consonants",
  "§110.5(b)(2)(A)(vii)":"identify and read high-frequency words from a research-based list",
  "§110.5(b)(2)(B)(i)":"spell multisyllabic words with closed syllables; open syllables; VCe syllables; vowel teams, including digraphs and diphthongs; r-controlled syllables; and final stable syllables",
  "§110.5(b)(2)(B)(ii)":"spell homophones",
  "§110.5(b)(2)(B)(iii)":"spell compound words, contractions, and abbreviations",
  "§110.5(b)(2)(B)(iv)":"spell multisyllabic words with multiple sound-spelling patterns",
  "§110.5(b)(2)(B)(v)":"spell words using knowledge of syllable division patterns such as VCCV, VCV, and VCCCV"
});

Object.assign(G23_TEKS_EXPECTATION_TEXT, {
  "§110.5(b)(3)(A)":"use print or digital resources to determine meaning, syllabication, and pronunciation",
  "§110.5(b)(3)(B)":"use context within and beyond a sentence to determine the meaning of unfamiliar words and multiple-meaning words",
  "§110.5(b)(3)(C)":"identify the meaning of and use words with affixes such as im- (into), non-, dis-, in- (not, non), pre-, -ness, -y, and -ful",
  "§110.5(b)(3)(D)":"identify, use, and explain the meaning of antonyms, synonyms, idioms, homophones, and homographs in a text",
  "§110.5(b)(6)(F)":"make inferences and use evidence to support understanding",
  "§110.5(b)(6)(G)":"evaluate details read to determine key ideas",
  "§110.5(b)(8)(A)":"infer the theme of a work, distinguishing theme from topic",
  "§110.5(b)(9)(D)(i)":"recognize characteristics and structures of informational text, including the central idea with supporting evidence",
  "§110.5(b)(9)(D)(iii)":"recognize characteristics and structures of informational text, including organizational patterns such as cause and effect and problem and solution",
  "§110.5(b)(10)(A)":"explain the author's purpose and message within a text",
  "§110.5(b)(10)(B)":"explain how the use of text structure contributes to the author's purpose",
  "§110.5(b)(10)(D)":"describe how the author's use of imagery, literal and figurative language such as simile, and sound devices such as onomatopoeia achieves specific purposes",
  "§110.5(b)(11)(B)(i)":"develop drafts into a focused, structured, and coherent piece of writing by organizing with purposeful structure, including an introduction and a conclusion",
  "§110.5(b)(11)(B)(ii)":"develop drafts into a focused, structured, and coherent piece of writing by developing an engaging idea with relevant details",
  "§110.5(b)(11)(C)":"revise drafts to improve sentence structure and word choice by adding, deleting, combining, and rearranging ideas for coherence and clarity",
  "§110.5(b)(11)(D)(i)":"edit drafts using standard English conventions, including complete simple and compound sentences with subject-verb agreement",
  "§110.5(b)(11)(D)(ii)":"edit drafts using standard English conventions, including past, present, and future verb tense",
  "§110.5(b)(11)(D)(vi)":"edit drafts using standard English conventions, including prepositions and prepositional phrases",
  "§110.5(b)(11)(D)(viii)":"edit drafts using standard English conventions, including coordinating conjunctions to form compound subjects, predicates, and sentences",
  "§110.5(b)(11)(D)(ix)":"edit drafts using standard English conventions, including capitalization of official titles of people, holidays, and geographical names and places",
  "§110.5(b)(11)(D)(x)":"edit drafts using standard English conventions, including punctuation marks, including apostrophes in contractions and possessives and commas in compound sentences and items in a series",
  "§110.5(b)(11)(D)(xi)":"edit drafts using standard English conventions, including correct spelling of words with grade-appropriate orthographic patterns and rules and high-frequency words"
});

Object.assign(G23_TEKS_EXPECTATION_TEXT, {
  "§111.5(b)(2)(A)":"compose and decompose numbers up to 100,000 using objects, pictorial models, and numbers, including expanded notation as appropriate"
});

Object.assign(G23_TEKS_EXPECTATION_TEXT, {
  "§111.5(b)(2)(B)":"describe the mathematical relationships found in the base-10 place value system through the hundred thousands place",
  "§111.5(b)(2)(C)":"represent a number on a number line as being between two consecutive multiples of 10, 100, 1,000, or 10,000 and use words to describe relative size of numbers in order to round whole numbers",
  "§111.5(b)(2)(D)":"compare and order whole numbers up to 100,000 and represent comparisons using the symbols >, <, or =",
  "§111.5(b)(4)(A)":"solve with fluency one-step and two-step problems involving addition and subtraction within 1,000 using strategies based on place value, properties of operations, and the relationship between addition and subtraction",
  "§111.5(b)(4)(B)":"round to the nearest 10 or 100 or use compatible numbers to estimate solutions to addition and subtraction problems"
});

Object.assign(G23_TEKS_EXPECTATION_TEXT, {
  "§111.5(b)(4)(C)":"determine the value of a collection of coins and bills",
  "§111.5(b)(4)(F)":"recall facts to multiply up to 10 by 10 with automaticity and recall the corresponding division facts",
  "§111.5(b)(4)(J)":"determine a quotient using the relationship between multiplication and division",
  "§111.5(b)(4)(K)":"solve one-step and two-step problems involving multiplication and division within 100 using strategies based on objects; pictorial models, including arrays, area models, and equal groups; properties of operations; or recall of facts",
  "§111.5(b)(9)(C)":"identify the costs and benefits of planned and unplanned spending decisions",
  "§111.5(b)(9)(F)":"identify decisions involving income, spending, saving, credit, and charitable giving",
  "§112.5(b)(1)(D)":"use tools, including hand lenses; metric rulers; Celsius thermometers; wind vanes; rain gauges; graduated cylinders; beakers; digital scales; hot plates; meter sticks; magnets; notebooks; Sun, Earth, Moon system models; timing devices; materials to support observation of habitats of organisms such as terrariums, aquariums, and collecting nets; and materials to support digital data collection such as computers, tablets, and cameras, to observe, measure, test, and analyze information",
  "§112.5(b)(7)(A)":"demonstrate and describe forces acting on an object in contact or at a distance, including magnetism, gravity, and pushes and pulls",
  "§112.5(b)(12)(A)":"explain how temperature and precipitation affect animal growth and behavior through migration and hibernation and plant responses through dormancy"
});

const G23_TEKS_LESSON_CONTRACTS = Object.create(null);

function g23SequenceRound(){
  return Math.max(1, Math.min(25, g23RoundNumber()));
}

function g23DifficultyBand(round){
  return Math.min(5, Math.ceil(round / 5));
}

function g23DifficultyLead(round){
  return [
    "Build the skill:",
    "Apply the skill in context:",
    "Use two clues and reason:",
    "Challenge—analyze the complex example:",
    "Mastery—evaluate the evidence, diagnose errors, and justify the conclusion:"
  ][g23DifficultyBand(round) - 1];
}

function g23UniqueWrongs(answer, wrongs){
  const answerKey = String(answer).trim();
  const clean = [];
  (wrongs || []).forEach(value=>{
    const text = String(value).trim();
    if(!text || text === answerKey) return;
    if(clean.some(item=>item === text)) return;
    clean.push(text);
  });
  if(clean.length !== 3){
    throw new Error(`A Grade 2-3 TEKS item must supply exactly three lesson-specific distractors; received ${clean.length}.`);
  }
  return clean;
}

function g23MasteryQuestion(spec, item, round){
  const prompt = `${g23DifficultyLead(round)} Question ${round} of 25. ${item.q}`;
  const wrongs = g23UniqueWrongs(item.a, item.w);
  const explanation = item.explain || `${item.a} is correct because it applies ${spec.code}: ${spec.expectation}`;
  const explicitTrueFalse = [3,7,11,15,19,23].includes(round);
  let question;
  if(explicitTrueFalse){
    const trueClaim = round === 3 || round === 11 || round === 19 || round === 23;
    const claim = trueClaim ? String(item.a) : wrongs[0];
    question = {
      type:"truefalse",
      q:`${prompt} True or false: the response “${claim}” correctly answers this item.`,
      answer:trueClaim,
      audio:`${prompt} True or false. The response is ${claim}.`,
      explain:trueClaim ? `True. ${explanation}` : `False. The correct response is “${item.a}.” ${explanation}`,
      generatorOwnedTrueFalse:true
    };
  }else{
    question = K12_BASE_MC_QUESTION(prompt, String(item.a), wrongs, item.audio || prompt);
    question.explain = explanation;
  }
  question.teksStudentExpectation = {
    code:spec.code,
    text:spec.expectation,
    source:spec.source,
    verifiedSource:"Texas Education Agency",
    lesson:spec.lesson,
    reviewStatus:"generator contract implemented"
  };
  question.sequencePosition = round;
  question.sequenceLength = 25;
  question.difficultyBand = g23DifficultyBand(round);
  question.difficultyLabel = ["foundation","apply","reason","challenge","mastery"][question.difficultyBand - 1];
  return question;
}

/*
 * Questions 21-25 are not copies with a harder-sounding prefix. Each one
 * starts from that lesson's own most demanding contracted example, then adds
 * a second task: evidence evaluation, misconception diagnosis, comparison,
 * justification, or synthesis. No item or distractor is drawn from a shared
 * question pool.
 */
function g23BuildLessonMasteryItem(spec, item, round){
  const answer = String(item.a);
  const wrongs = g23UniqueWrongs(answer, item.w);
  const misconception = wrongs[(round - 21) % wrongs.length];
  const alternate = wrongs[(round - 20) % wrongs.length];
  const reasoning = String(item.explain || `The response must apply ${spec.code}: ${spec.expectation}.`);
  const original = String(item.q);
  const subject = spec.generatorName.includes("_math_")
    ? "mathematical"
    : spec.generatorName.includes("_sci_")
      ? "scientific"
      : "language-arts";
  const evidence = subject === "mathematical"
    ? "the quantities, operation, model, or related fact"
    : subject === "scientific"
      ? "the observation, measured evidence, and cause-and-effect relationship"
      : "the words in the text, its structure, or the relevant language convention";
  const variant = round - 20;

  if(variant === 1){
    return {
      q:`Solve this ${subject} task, then evaluate whether the conclusion and its evidence satisfy every condition: ${original}`,
      a:`Conclusion: ${answer}. Evidence and reasoning: ${reasoning}`,
      w:[
        `Conclusion: ${misconception}. Evidence is unnecessary once a choice has been made.`,
        `Conclusion: ${answer}. Evidence: an unrelated detail supports every possible conclusion.`,
        `Conclusion: ${alternate}. Evidence: the conditions in the original task can be ignored.`
      ],
      explain:`A mastery response must be accurate and supported by ${evidence}. ${reasoning}`
    };
  }

  if(variant === 2){
    return {
      q:`A student answered “${misconception}” for this ${subject} task: ${original} Which feedback identifies the error and gives a supported correction?`,
      a:`Replace “${misconception}” with “${answer}”; ${reasoning}`,
      w:[
        `Keep “${misconception}” because the task's conditions do not need to be checked.`,
        `Replace it with “${alternate}” without using ${evidence}.`,
        `Accept every response because evidence cannot distinguish a correct conclusion from an error.`
      ],
      explain:`The first response does not satisfy the task. The correction is ${answer}, supported by ${evidence}. ${reasoning}`
    };
  }

  if(variant === 3){
    return {
      q:`Two students disagree about this ${subject} task: ${original} Student A concludes “${answer}.” Student B concludes “${misconception}.” Which evaluation uses the task's conditions and relevant evidence?`,
      a:`Student A is correct; ${reasoning}`,
      w:[
        `Student B is correct because “${misconception}” does not need support.`,
        `Both students must be correct because the original conditions cannot rule out a response.`,
        `Neither response can be evaluated using ${evidence}.`
      ],
      explain:`Student A's conclusion is the one supported by the task. ${reasoning}`
    };
  }

  if(variant === 4){
    return {
      q:`Full credit requires three things: an accurate conclusion, relevant support, and rejection of a competing misconception. Apply all three requirements to this task: ${original}`,
      a:`Choose “${answer}”; support it with ${reasoning} Reject “${misconception}” because it does not satisfy the evidence or conditions.`,
      w:[
        `Choose “${misconception}”; a conclusion does not need evidence or error analysis.`,
        `Choose “${answer},” but use an unrelated fact as the only support and do not evaluate alternatives.`,
        `Choose “${alternate}” because repeating a competing response counts as correcting it.`
      ],
      explain:`The complete evaluation gives ${answer}, supports it with ${evidence}, and explains why ${misconception} fails. ${reasoning}`
    };
  }

  return {
    q:`Synthesize a final mastery response to this ${subject} task: ${original} Which option states the conclusion, justifies it, and corrects the identified error?`,
    a:`Conclusion: ${answer}. Justification: ${reasoning} Error correction: “${misconception}” is not supported by the task.`,
    w:[
      `Conclusion: ${misconception}. Justification: evidence is optional. Error correction: preserve the original error.`,
      `Conclusion: ${alternate}. Justification: repeat the choice without analyzing the task. Error correction: none.`,
      `Conclusion: ${answer}. Justification: ${evidence} supports every conflicting response equally.`
    ],
    explain:`Synthesis combines a correct conclusion, relevant justification, and explicit correction of an unsupported response. ${reasoning}`
  };
}

function g23RegisterLesson(generatorName, config){
  if(typeof config.build !== "function") throw new Error(`Missing builder for ${generatorName}`);
  const spec = Object.freeze({
    ...config,
    expectation:G23_TEKS_EXPECTATION_TEXT[config.code] || config.expectation,
    generatorName,
    source:config.source || (generatorName.includes("_g2_") ? G23_TEKS_OFFICIAL_SOURCES.g2 : G23_TEKS_OFFICIAL_SOURCES.g3),
    sequenceLength:25
  });
  G23_TEKS_LESSON_CONTRACTS[generatorName] = spec;
  globalThis[generatorName] = function(){
    const round = g23SequenceRound();
    // Existing lesson banks contain twenty individually authored rows. The
    // fifth tier reuses rows 16-20 only as lesson-owned source material and
    // transforms each into a distinct multi-condition mastery task.
    const buildRound = round > 20 ? round - 5 : round;
    const builtItem = spec.build(buildRound, g23DifficultyBand(round));
    const item = round > 20
      ? g23BuildLessonMasteryItem(spec, builtItem, round)
      : builtItem;
    if(!item || !item.q || item.a === undefined) throw new Error(`Invalid item ${round} for ${generatorName}`);
    return g23MasteryQuestion(spec, item, round);
  };
}

function g23NumberWrongs(answer, spread){
  const step = Math.max(1, Math.abs(Number(spread) || 1));
  const value = Number(answer);
  return [value + step, value + (step * 2), value + (step * 10)].map(String);
}

function g23Money(cents){
  return `$${(cents / 100).toFixed(2)}`;
}

function g23Cap(text){
  const value = String(text);
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function g23Misspellings(word){
  const value = String(word).toLowerCase();
  const vowels = value.replace(/[aeiou]/, match=>({a:"e",e:"i",i:"e",o:"u",u:"o"}[match]));
  const dropped = value.length > 4 ? value.slice(0,-1) : `${value}${value.slice(-1)}`;
  const swapped = value.length > 3 ? `${value.slice(0,-2)}${value.slice(-1)}${value.slice(-2,-1)}` : `${value}e`;
  const results = [];
  [vowels,dropped,swapped,`${value}e`].forEach(candidate=>{
    if(candidate !== value && !results.includes(candidate)) results.push(candidate);
  });
  while(results.length < 3) results.push(`${value}${results.length + 1}`);
  return results.slice(0,3);
}

function g23InstallSpecList(prefix, specs, builder){
  specs.forEach((spec,index)=>g23RegisterLesson(`${prefix}${index + 1}`, {
    ...spec,
    build:(round,level)=>builder(spec, round, level, index + 1)
  }));
}

/* ---------- Grade 2 English: 10 individually contracted lessons ---------- */

const G23_G2_SENTENCE_ROWS = [
  ["The rabbit","hops","across the quiet garden"], ["Two puppies","chase","a rolling red ball"],
  ["My science partner","records","the temperature each morning"], ["The bright stars","shine","above the campsite"],
  ["A careful reader","checks","the paragraph for evidence"], ["Those busy ants","carry","crumbs into their nest"],
  ["Our class","visits","the community library on Friday"], ["The old oak tree","shelters","three small birds"],
  ["Several musicians","practice","before the evening concert"], ["The blue whale","breathes","air through its blowhole"],
  ["A strong magnet","attracts","the iron paper clips"], ["The soccer players","pass","the ball across the field"],
  ["Maya and Luis","compare","their two solution strategies"], ["The patient baker","measures","each ingredient precisely"],
  ["Our neighborhood creek","flows","toward the larger river"], ["The young inventors","test","their redesigned paper bridge"],
  ["A desert tortoise","stores","water inside its body"], ["The crossing guard","helps","families reach school safely"],
  ["The migrating geese","follow","the same route each autumn"], ["A skilled author","revises","sentences to make ideas clearer"]
];

const G23_G2_READING_ROWS = [
  ["Beavers build dams from branches and mud. The dam slows a stream and creates a pond where the beavers can live safely.","A beaver dam creates a safer pond","Beavers use branches and mud","The dam slows the stream"],
  ["A rain gauge stood in the school garden. After the storm, Nia measured two inches of water and recorded it on the class chart.","Nia measured rainfall after a storm","The gauge was in the garden","She recorded two inches"],
  ["Jordan sorted the recycling. Paper went into the blue bin, cans into the gray bin, and glass into the green bin.","Jordan sorted recycling by material","Paper went in the blue bin","Glass went in the green bin"],
  ["The library book was due Friday. Eli placed it beside his backpack Thursday night so he would remember it in the morning.","Eli planned how to return a book on time","The book was due Friday","He put it by his backpack"],
  ["A sunflower bends toward sunlight during the day. Its broad leaves also capture light that the plant uses to make food.","Sunflowers use sunlight","The leaves are broad","The plant makes food"],
  ["When the temperature dropped, Priya covered the garden plants with cloth. The cloth trapped warmth near their leaves overnight.","Priya protected plants from cold","The temperature dropped","Cloth trapped warmth"],
  ["The drummer tapped the small drum softly, then struck the large drum firmly. The second sound was lower and much louder.","Different drum strikes create different sounds","The first tap was soft","The second sound was louder"],
  ["Sea turtles hatch on sandy beaches. The tiny turtles crawl toward the brightest horizon, which is usually over the ocean.","Hatchling turtles move from beach to ocean","They hatch in sand","They follow the bright horizon"],
  ["A city planted trees beside the playground. Years later, their branches shaded the slides and kept the ground cooler.","Trees made the playground cooler","The city planted them","Branches shaded the slides"],
  ["Mateo tested two paper airplanes. The plane with wider wings stayed in the air longer, so he used wide wings in his final design.","Mateo used test evidence to improve a plane","He tested two planes","Wide wings stayed up longer"],
  ["Honeybees carry pollen between flowers. This helps many plants form fruits and seeds.","Bees help flowering plants reproduce","Bees carry pollen","Plants form fruit and seeds"],
  ["The class wanted quieter chairs. They attached felt pads under each chair leg, and the scraping sound almost disappeared.","Felt pads reduced chair noise","Pads went under chair legs","The scraping almost stopped"],
  ["A cactus has a thick stem that stores water. A waxy coating slows water loss in the dry desert air.","Cactus structures conserve water","Its stem is thick","Its coating is waxy"],
  ["Lena read the recipe twice before cooking. She gathered every tool and ingredient, then followed the numbered steps in order.","Lena prepared carefully and followed a procedure","She read twice","She followed numbered steps"],
  ["Snow melted on the sunny roof first. The shaded side stayed icy until the afternoon temperature rose.","Sunlight affects how quickly snow melts","The sunny side melted first","Shade stayed icy longer"],
  ["Owls hunt mostly at night. Their large eyes gather dim light, and their soft feathers help them fly quietly.","Owls have structures that help nighttime hunting","Their eyes gather dim light","Their feathers are quiet"],
  ["The bus was delayed by a flooded road. The driver chose a safe alternate route and arrived ten minutes late.","The driver changed routes because of flooding","The road was flooded","The bus was ten minutes late"],
  ["Keisha marked equal spaces on a bottle. She poured in one cup at a time and created a tool for comparing liquid amounts.","Keisha built a measuring tool","She marked equal spaces","She added one cup at a time"],
  ["During recess, a loose gate swung in the wind. Omar told a teacher instead of touching it, and the custodian secured it.","Omar responded safely to a hazard","The gate was loose","The custodian secured it"],
  ["Rosa's first paragraph repeated one fact three times. She replaced two repetitions with new evidence, making the paragraph clearer.","Rosa improved a paragraph by revising","One fact was repeated","She added new evidence"]
];

const G23_G2_WORD_ROWS = [
  ["careful","taking time to avoid mistakes","Nora was careful, checking every measurement twice."], ["fragile","easy to break","The fragile glass was wrapped in thick paper before moving."], ["enormous","very large","The enormous whale was longer than the small boat."],
  ["observe","watch closely","Scientists observe the nest without touching it."], ["swift","moving quickly","The swift rabbit crossed the field in seconds."], ["scarce","hard to find or limited","After months without rain, clean pond water became scarce."],
  ["drowsy","ready to sleep","After the long trip, Leo felt drowsy and yawned."], ["sturdy","strong and not easily damaged","The sturdy bridge held every test weight."], ["vanish","disappear","The puddles will vanish when sunlight dries the water."],
  ["fortunate","having good luck","We were fortunate that the storm ended before the trip."], ["reluctant","not willing or eager","Mia was reluctant to step onto the wobbly board and stayed back."], ["essential","completely necessary","Water is essential; the plant cannot survive without it."],
  ["inspect","examine carefully","The engineer will inspect every joint for cracks."], ["abundant","available in large amounts","After the rainy month, wildflowers were abundant across the field."], ["predict","say what is likely to happen","Use the pattern to predict what will happen next."],
  ["conserve","protect from waste or loss","Turn off the faucet to conserve water."], ["transparent","allowing light through so objects can be seen","The transparent window let us see the garden outside."],
  ["adapt","change to fit new conditions","Animals may adapt when their environment changes."], ["conclude","decide after considering evidence","After comparing the data, the class can conclude which material is strongest."],
  ["efficient","working well without wasting time or materials","The efficient plan used fewer materials and finished the job sooner."]
];

const G23_G2_SYLLABLE_WORDS = [
  ["sunset",2], ["robot",2], ["picnic",2], ["basket",2], ["music",2],
  ["volcano",3], ["animal",3], ["computer",3], ["tomorrow",3], ["butterfly",3],
  ["community",4], ["calculator",4], ["celebration",4], ["temperature",4], ["experiment",4],
  ["communication",5], ["investigation",5], ["electricity",5], ["opportunity",5], ["responsibility",6]
];

const G23_G2_ENGLISH_SPECS = [
  {lesson:"Nouns & Verbs",code:"§110.4(b)(11)(D)(i)",expectation:"edit complete sentences for subject-verb agreement"},
  {lesson:"Sentence Fix",code:"§110.4(b)(11)(D)(i)",expectation:"edit drafts using complete sentences with subject-verb agreement"},
  {lesson:"Reading Check",code:"§110.4(b)(6)(G)",expectation:"evaluate details read to determine key ideas"},
  {lesson:"Parts of Speech",code:"§110.4(b)(11)(D)(iii)",expectation:"edit drafts using singular, plural, common, and proper nouns"},
  {lesson:"Past vs Present",code:"§110.4(b)(11)(D)(ii)",expectation:"edit drafts using past, present, and future verb tense"},
  {lesson:"Syllables",code:"§110.4(b)(2)(B)(iii)",expectation:"decode multisyllabic words with closed, open, VCe, vowel-team, r-controlled, and final stable syllables"},
  {lesson:"Context Fill",code:"§110.4(b)(3)(B)",expectation:"use context within and beyond a sentence to determine the meaning of unfamiliar words"},
  {lesson:"Sentence Editing",code:"§110.4(b)(11)(D)(x)",expectation:"edit end punctuation, apostrophes in contractions, and commas in a series and dates"},
  {lesson:"Noun Match",code:"§110.4(b)(11)(D)(iii)",expectation:"edit drafts using singular, plural, common, and proper nouns"},
  {lesson:"Spelling Challenge",code:"§110.4(b)(11)(D)(xi)",expectation:"edit for correct spelling of grade-appropriate patterns and high-frequency words"}
];

function g23BuildG2English(spec, round, level, lessonNo){
  const row = G23_G2_SENTENCE_ROWS[round - 1];
  const [subject,verb,ending] = row;
  if(lessonNo === 1){
    const correct = `${subject} ${verb} ${ending}.`;
    const wrongVerb = verb.endsWith("s") ? verb.slice(0,-1) : `${verb}s`;
    return {q:`Which sentence has a noun subject and a verb that agree?`,a:correct,w:[`${subject} ${wrongVerb} ${ending}.`,`${subject} ${ending} ${verb}.`,`${verb} ${subject.toLowerCase()} ${ending}.`],explain:`“${subject}” is the subject, and “${verb}” agrees with it.`};
  }
  if(lessonNo === 2){
    const correct = `${subject} ${verb} ${ending}.`;
    return {q:`Revise this fragment into a complete sentence: “${subject.toLowerCase()} / ${verb} / ${ending}”`,a:correct,w:[`${subject} ${verb}.`,`${verb} ${ending}.`,`${subject}, ${verb} ${ending}`],explain:"The correct revision includes a complete subject, predicate, capitalization, and end punctuation."};
  }
  if(lessonNo === 3){
    const p = G23_G2_READING_ROWS[round - 1];
    const askMain = level >= 3;
    return {q:`Read: ${p[0]} ${askMain ? "Which key idea is best supported by both details?" : "Which detail is stated in the text?"}`,a:askMain?p[1]:p[2],w:askMain?[p[2],p[3],"The passage gives no key idea"]:[p[3],p[1],"A detail not mentioned in the passage"],explain:askMain?`Both stated details support “${p[1]}.”`:`The text directly states: ${p[2]}.`};
  }
  if(lessonNo === 4 || lessonNo === 9){
    const proper = ["Texas","Monday","Ava","Houston","July"][round % 5];
    const common = subject.replace(/^(The|A|An|My|Our|Those|Several) /i,"").split(" ")[0].replace(/[^A-Za-z]/g,"").toLowerCase();
    const plural = `${common.replace(/s$/,"")}s`;
    const target = lessonNo === 4 ? (round % 2 ? proper : common) : (round % 2 ? plural : proper);
    const answer = /^[A-Z]/.test(target) ? "proper noun" : (target.endsWith("s") ? "plural common noun" : "singular common noun");
    return {q:`Classify the noun “${target}” as it is used by itself.`,a:answer,w:["verb",answer==="proper noun"?"singular common noun":"proper noun",answer==="plural common noun"?"singular common noun":"plural common noun"],explain:`“${target}” is a ${answer}.`};
  }
  if(lessonNo === 5){
    const base = verb.replace(/ies$/, "y").replace(/ed$/,"").replace(/s$/,"");
    const past = base.endsWith("e") ? `${base}d` : `${base}ed`;
    const future = `will ${base}`;
    const tense = level <= 2 ? "past" : level <= 4 ? "future" : (round % 2 ? "present" : "past");
    const answer = tense === "past" ? past : tense === "future" ? future : base;
    return {q:`Complete the sentence with the ${tense.toUpperCase()}-tense form: “Tomorrow or yesterday, the students ___ carefully.” Base verb: ${base}`,a:answer,w:[base,past,future].filter(x=>x!==answer).concat([`${base}ing`]).slice(0,3),explain:`“${answer}” is the ${tense}-tense form of “${base}.”`};
  }
  if(lessonNo === 6){
    const [word,count] = G23_G2_SYLLABLE_WORDS[round - 1];
    return {q:`Decode “${word}.” How many spoken syllables does it contain?`,a:String(count),w:[String(Math.max(1,count-1)),String(count+1),String(count+2)],explain:`Clapping the spoken parts in “${word}” gives ${count} syllables.`};
  }
  if(lessonNo === 7){
    const [word,meaning,context] = G23_G2_WORD_ROWS[round - 1];
    return {q:`Use the sentence and nearby clues. What does “${word}” mean? ${context}`,a:meaning,w:["the opposite of the context clue","a person or place named in the sentence","an action unrelated to the sentence"],explain:`The context supports the meaning “${meaning}.”`};
  }
  if(lessonNo === 8){
    const series = ["pencils","notebooks","rulers"];
    const correct = `On July ${round}, we packed ${series[0]}, ${series[1]}, and ${series[2]}.`;
    return {q:`Which revision uses capitals, commas, and end punctuation correctly?`,a:correct,w:[`on july ${round} we packed ${series.join(" ")}`,`On July ${round}, we packed ${series[0]} ${series[1]} and ${series[2]}`,`On July ${round} we packed, ${series[0]}, ${series[1]} and ${series[2]}?`],explain:"The correct sentence capitalizes the date, places commas in the series, and ends with a period."};
  }
  const [word] = G23_G2_WORD_ROWS[round - 1];
  return {q:`Which spelling correctly completes this sentence? “The writer chose the word ___ after checking a dictionary.”`,a:word,w:g23Misspellings(word),explain:`“${word}” follows the correct spelling pattern.`};
}

g23InstallSpecList("gen_g2_eng_L", G23_G2_ENGLISH_SPECS, g23BuildG2English);

/* ---------- Grade 2 Mathematics: 7 individually contracted lessons ---------- */

const G23_G2_MATH_SPECS = [
  {lesson:"2-3 Digit Add/Sub",code:"§111.4(b)(4)(C)",expectation:"solve one-step and multi-step addition and subtraction word problems within 1,000"},
  {lesson:"Place Value",code:"§111.4(b)(2)(A)",expectation:"compose and decompose numbers up to 1,200 in more than one way"},
  {lesson:"Time to the Minute",code:"§111.4(b)(9)(G)",expectation:"read and write time to the nearest one-minute increment and distinguish a.m. and p.m."},
  {lesson:"Equal Groups",code:"§111.4(b)(6)(A)",expectation:"model, create, and describe contextual multiplication situations with equivalent sets"},
  {lesson:"Word Problems",code:"§111.4(b)(4)(C)",expectation:"solve one-step and multi-step addition and subtraction word problems within 1,000"},
  {lesson:"Money",code:"§111.4(b)(5)(A)",expectation:"determine the value of a collection of coins up to one dollar"},
  {lesson:"Add/Sub Fluency",code:"§111.4(b)(4)(B)",expectation:"add up to four two-digit numbers and subtract two-digit numbers using place-value strategies and algorithms"}
];

function g23BuildG2Math(spec, round, level, lessonNo){
  if(lessonNo === 1){
    const start = 90 + (round * 17) + (level * 20);
    const change = 18 + (round * 6);
    const second = 12 + (round * 3);
    const subtract = round % 2 === 0;
    const answer = subtract ? start - change + second : start + change - second;
    const q = subtract
      ? `A reading program had ${start} books. Students borrowed ${change}, then returned ${second}. How many books are there now?`
      : `A school collected ${start} cans on Monday and ${change} Tuesday, then used ${second} for an art project. How many remain?`;
    return {q,a:String(answer),w:g23NumberWrongs(answer, level * 10),explain:`Write the two operations in story order. The result is ${answer}, which is within 1,000.`};
  }
  if(lessonNo === 2){
    const n = Math.min(1200, 214 + (round * 43));
    const h = Math.floor(n / 100), t = Math.floor((n % 100) / 10), o = n % 10;
    const trade = level >= 3 && h > 0;
    const answer = trade ? `${h-1} hundreds + ${t+10} tens + ${o} ones` : `${h} hundreds + ${t} tens + ${o} ones`;
    return {q:`Which decomposition represents ${n}${trade?" after trading one hundred for ten tens":""}?`,a:answer,w:[`${h} hundreds + ${t+1} tens + ${o} ones`,`${h} hundreds + ${t} tens + ${o+1} ones`,`${h+1} hundreds + ${t} tens + ${o} ones`],explain:`The place values total ${n}. A traded hundred becomes ten tens without changing the number.`};
  }
  if(lessonNo === 3){
    const hour = ((round + 6) % 12) + 1;
    const minute = (round * 7 + level) % 60;
    const period = round % 2 ? "a.m." : "p.m.";
    const answer = `${hour}:${String(minute).padStart(2,"0")} ${period}`;
    return {q:`A ${period==="a.m."?"morning":"evening"} clock shows ${minute} minutes after ${hour}. Write the exact digital time with a.m. or p.m.`,a:answer,w:[`${hour}:${String((minute+5)%60).padStart(2,"0")} ${period}`,`${hour}:${String(minute).padStart(2,"0")} ${period==="a.m."?"p.m.":"a.m."}`,`${(hour%12)+1}:${String(minute).padStart(2,"0")} ${period}`],explain:`${minute} minutes after ${hour} is ${answer}.`};
  }
  if(lessonNo === 4){
    const groups = 2 + ((round + level) % 9);
    const each = 2 + ((round * 2 + level) % 9);
    const total = groups * each;
    const answer = `${groups} equal groups of ${each}; ${total} objects total`;
    return {q:`A gardener puts ${each} seedlings in each of ${groups} identical trays. Which model and total match the situation?`,a:answer,w:[`${each} equal groups of ${groups+1}; ${each*(groups+1)} total`,`${groups} groups of ${each-1}; ${groups*(each-1)} total`,`One group of ${groups+each}; ${groups+each} total`],explain:`Joining ${groups} equivalent sets of ${each} gives ${total}.`};
  }
  if(lessonNo === 5){
    const first = 125 + round * 19;
    const added = 48 + round * 7;
    const removed = level < 3 ? 0 : 21 + round * 3;
    const answer = first + added - removed;
    const extra = removed ? ` Then ${removed} were used.` : "";
    return {q:`The art room had ${first} sheets of paper and received ${added} more.${extra} How many sheets are left?`,a:String(answer),w:g23NumberWrongs(answer,10+level),explain:`Add the delivery${removed?", then subtract the amount used":""}: the answer is ${answer}.`};
  }
  if(lessonNo === 6){
    const quarters = round % 3;
    const dimes = (round + level) % 3;
    const nickels = (round * 2) % 3;
    const pennies = (round * 3 + level) % 10;
    const cents = quarters*25 + dimes*10 + nickels*5 + pennies;
    const answer = `${cents}¢ (${g23Money(cents)})`;
    return {q:`Find the value: ${quarters} quarter(s), ${dimes} dime(s), ${nickels} nickel(s), and ${pennies} penny/pennies.`,a:answer,w:[`${cents+5}¢ (${g23Money(cents+5)})`,`${cents+10}¢ (${g23Money(cents+10)})`,`${cents+25}¢ (${g23Money(cents+25)})`],explain:`Multiply each coin count by its value and add: ${answer}.`};
  }
  const a = 21 + (round * 3) + (level * 5);
  const b = 12 + (round * 2);
  const c = level >= 4 ? 10 + round : 0;
  const subtract = round % 2 === 0;
  const answer = subtract ? a + b - c : a + b + c;
  const expression = subtract ? `${a} + ${b} − ${c}` : [a,b,c].filter(Boolean).join(" + ");
  return {q:`Use place value or an efficient algorithm: ${expression} = ?`,a:String(answer),w:g23NumberWrongs(answer, level),explain:`Combining tens and ones carefully gives ${answer}.`};
}

g23InstallSpecList("gen_g2_math_L", G23_G2_MATH_SPECS, g23BuildG2Math);

/* ---------- Grade 2 Science: 4 individually contracted lessons ---------- */

const G23_G2_SCIENCE_SPECS = [
  {lesson:"States and Properties of Matter",code:"§112.4(b)(6)(A)",expectation:"classify matter by observable physical properties and identify whether a material is a solid or liquid",source:G23_TEKS_OFFICIAL_SOURCES.science},
  {lesson:"Animal Group Survival",code:"§112.4(b)(13)(C)",expectation:"record and compare how being part of a group helps animals obtain food, defend themselves, and cope with changes",source:G23_TEKS_OFFICIAL_SOURCES.science},
  {lesson:"Unique Life Cycles",code:"§112.4(b)(13)(D)",expectation:"investigate and describe animal life cycles in which young animals do not resemble their parents, including butterflies and frogs",source:G23_TEKS_OFFICIAL_SOURCES.science},
  {lesson:"Plant Structures",code:"§112.4(b)(13)(A)",expectation:"identify plant structures and compare how they help plants meet basic needs for survival",source:G23_TEKS_OFFICIAL_SOURCES.science}
];

const G23_G2_MATTER_ROWS = [
  ["wooden block","solid","rigid"], ["orange juice","liquid","takes the shape of its cup"], ["rubber band","solid","flexible"], ["cooking oil","liquid","flows"],
  ["metal spoon","solid","smooth and rigid"], ["water","liquid","takes the shape of its bottle"], ["cotton cloth","solid","soft and flexible"], ["milk","liquid","can be poured"],
  ["sandpaper","solid","rough"], ["honey","liquid","flows slowly"], ["aluminum foil","solid","flexible"], ["rainwater","liquid","takes the shape of a puddle"],
  ["plastic ruler","solid","rigid"], ["dish soap","liquid","flows and takes a container's shape"], ["wax paper","solid","smooth and flexible"], ["melted ice","liquid","can be poured"],
  ["ceramic tile","solid","hard and rigid"], ["warm soup","liquid","has a relative temperature and flows"], ["wool mitten","solid","soft and flexible"], ["cold syrup","liquid","flows and has a relative temperature"]
];

const G23_G2_ANIMAL_ROWS = [
  ["wolves","surround prey and share food","obtain food"], ["musk oxen","form a circle around calves","defend themselves"], ["penguins","huddle tightly in winter wind","cope with cold"], ["meerkats","take turns watching for predators","defend themselves"],
  ["dolphins","work together to herd fish","obtain food"], ["ants","follow scent trails to food","obtain food"], ["zebras","stay in a herd with many watchful eyes","defend themselves"], ["geese","fly in a V formation to reduce effort","cope with migration"],
  ["lions","hunt cooperatively","obtain food"], ["prairie dogs","give alarm calls","defend themselves"], ["bees","signal the direction of flowers","obtain food"], ["elephants","protect calves in the center of the herd","defend themselves"],
  ["orcas","coordinate to catch fast prey","obtain food"], ["flamingos","gather where food is plentiful","obtain food"], ["bison","stand together during a storm","cope with weather"], ["fish schools","turn together when a predator approaches","defend themselves"],
  ["chimpanzees","share information about fruit trees","obtain food"], ["caribou","migrate as a herd to seasonal feeding grounds","cope with change"], ["crows","call others when danger appears","defend themselves"], ["wild dogs","care for pups while others hunt","obtain food and protect young"]
];

const G23_G2_LIFE_ROWS = [
  ["butterfly","egg → caterpillar → chrysalis → adult"], ["frog","egg → tadpole → froglet → adult"], ["butterfly","egg → larva → pupa → winged adult"], ["frog","jelly-like egg → gilled tadpole → four-legged froglet → adult"],
  ["moth","egg → caterpillar → cocoon → adult"], ["toad","egg → tadpole → toadlet → adult"], ["butterfly","caterpillar eats and grows before forming a chrysalis"], ["frog","tadpole grows legs before its tail becomes shorter"],
  ["moth","larva and adult have very different body forms"], ["frog","young live mainly in water before adults live on land and water"], ["butterfly","pupa is the stage between caterpillar and adult"], ["frog","froglet is the stage between tadpole and adult"],
  ["butterfly","the egg hatches into a caterpillar, not a tiny winged adult"], ["frog","the egg hatches into a tadpole, not a tiny adult frog"], ["moth","a cocoon protects the transforming pupa"], ["toad","a tadpole develops lungs and legs as it changes"],
  ["butterfly","metamorphosis changes crawling larva into flying adult"], ["frog","metamorphosis changes an aquatic tadpole into an adult frog"], ["moth","each stage has structures suited to different needs"], ["frog","observations across time show the ordered pattern of change"]
];

const G23_G2_PLANT_ROWS = [
  ["roots","absorb water and anchor the plant"], ["stem","supports the plant and moves water"], ["leaves","capture light used to make food"], ["flowers","help the plant reproduce"],
  ["fruit","protects seeds and can help spread them"], ["seeds","contain a young plant and stored food"], ["deep roots","reach water farther below dry soil"], ["wide leaves","capture more light in a shady place"],
  ["thick stem","stores water for dry conditions"], ["waxy leaves","slow water loss"], ["flexible stem","bends without breaking in wind"], ["bright flowers","attract some pollinators"],
  ["hooked fruit","can attach to animal fur and move seeds"], ["floating seed","can travel to a new place on water"], ["fibrous roots","hold loose soil in many places"], ["taproot","stores food and reaches deep water"],
  ["needlelike leaves","reduce water loss in cold or dry air"], ["vine stem","climbs toward available sunlight"], ["flower petals","surround and protect reproductive structures"], ["seed coat","protects the young plant until conditions support growth"]
];

function g23BuildG2Science(spec, round, level, lessonNo){
  if(lessonNo === 1){
    const [sample,state,property] = G23_G2_MATTER_ROWS[round-1];
    return {q:`A student observes ${sample}. Which classification uses an observable property as evidence?`,a:`It is a ${state} because it ${property}.`,w:[`It is a gas because it is useful.`,`It is a ${state==="solid"?"liquid":"solid"} because of its color.`,`Its state cannot be classified by observation.`],explain:`The observable evidence “${property}” supports classifying ${sample} as a ${state}.`};
  }
  if(lessonNo === 2){
    const [animal,behavior,benefit] = G23_G2_ANIMAL_ROWS[round-1];
    return {q:`Scientists observe that ${animal} ${behavior}. How does group behavior help survival?`,a:`It helps them ${benefit}.`,w:["It changes every animal into a different species.","It removes the need for food, water, and shelter.","It guarantees that weather and predators disappear."],explain:`The observation is evidence that group behavior helps ${animal} ${benefit}.`};
  }
  if(lessonNo === 3){
    const [animal,pattern] = G23_G2_LIFE_ROWS[round-1];
    return {q:`Which observation accurately describes a ${animal} life cycle in which the young differs from the parent?`,a:pattern,w:["The young is always a smaller copy of the adult.","The stages can occur in any random order.","The organism never changes its body structures as it grows."],explain:`The ${animal} undergoes an ordered life cycle: ${pattern}.`};
  }
  const [part,functionText] = G23_G2_PLANT_ROWS[round-1];
  return {q:`A plant must survive in its environment. Which structure-function explanation is supported by science?`,a:`${g23Cap(part)} ${functionText}.`,w:[`${g23Cap(part)} makes the plant an animal.`,`${g23Cap(part)} removes every basic need of the plant.`,`${g23Cap(part)} has no connection to plant survival.`],explain:`The structure is ${part}; its function is that it ${functionText}.`};
}

g23InstallSpecList("gen_g2_sci_L", G23_G2_SCIENCE_SPECS, g23BuildG2Science);

/* ---------- Grade 3 English: 144 individually contracted lessons ---------- */

const G23_G3_ELAR_GROUPS = [
  {names:["Short Vowels","Long Vowels","Vowel Sounds","CVC Words","Silent E Words","Vowel Review"],codes:["§110.5(b)(2)(A)(ii)","§110.5(b)(2)(A)(ii)","§110.5(b)(2)(A)(ii)","§110.5(b)(2)(A)(ii)","§110.5(b)(2)(A)(ii)","§110.5(b)(2)(A)(ii)"],expectation:"decode multisyllabic words with closed, open, VCe, vowel-team, r-controlled, and final stable syllables"},
  {names:["Blends","Digraphs","Trigraphs","Beginning Blends","Ending Blends","Blends Review"],codes:["§110.5(b)(2)(A)(i)","§110.5(b)(2)(A)(ii)","§110.5(b)(2)(A)(i)","§110.5(b)(2)(A)(i)","§110.5(b)(2)(A)(i)","§110.5(b)(2)(A)(i)"],expectation:"decode multisyllabic words with multiple sound-spelling patterns"},
  {names:["Variant Vowels","Diphthongs","R-Controlled Vowels","Vowel Patterns","R-Vowel Words","Vowel Pattern Review"],codes:["§110.5(b)(2)(A)(i)","§110.5(b)(2)(A)(ii)","§110.5(b)(2)(A)(ii)","§110.5(b)(2)(A)(i)","§110.5(b)(2)(A)(ii)","§110.5(b)(2)(A)(ii)"],expectation:"decode multisyllabic words with grade-level sound-spelling and vowel patterns"},
  {names:["Multisyllabic Words","Syllable Parts","Open Syllables","Closed Syllables","Divide Syllables","Syllable Review"],codes:["§110.5(b)(2)(A)(i)","§110.5(b)(2)(A)(iv)","§110.5(b)(2)(A)(ii)","§110.5(b)(2)(A)(ii)","§110.5(b)(2)(A)(iv)","§110.5(b)(2)(A)(iv)"],expectation:"decode words using multisyllabic sound-spelling and syllable-division patterns"},
  {names:["Irregular Words","Tricky Words","High-Frequency Words","Irregular Spelling","Read Irregular Words","Irregular Words Review"],codes:["§110.5(b)(2)(A)(vii)","§110.5(b)(2)(A)(vii)","§110.5(b)(2)(A)(vii)","§110.5(b)(2)(B)(iv)","§110.5(b)(2)(A)(vii)","§110.5(b)(2)(A)(vii)"],expectation:"identify, read, and spell high-frequency or multisyllabic words with grade-level patterns"},
  {names:["Main Idea","Supporting Details","Find the Main Idea","Key Details","Main Idea Practice","Main Idea Review"],codes:["§110.5(b)(6)(G)","§110.5(b)(9)(D)(i)","§110.5(b)(6)(G)","§110.5(b)(9)(D)(i)","§110.5(b)(6)(G)","§110.5(b)(6)(G)"],expectation:"evaluate details to determine key ideas and identify a central idea with supporting evidence"},
  {names:["Inference","Use Text Clues","Theme","Infer Feelings","Infer Meaning","Inference Review"],codes:["§110.5(b)(6)(F)","§110.5(b)(6)(F)","§110.5(b)(8)(A)","§110.5(b)(6)(F)","§110.5(b)(6)(F)","§110.5(b)(6)(F)"],expectation:"make inferences and use evidence to support understanding; infer theme when appropriate"},
  {names:["Author's Purpose","Persuade","Inform","Entertain","Purpose Practice","Author's Purpose Review"],codes:["§110.5(b)(10)(A)","§110.5(b)(10)(A)","§110.5(b)(10)(A)","§110.5(b)(10)(A)","§110.5(b)(10)(A)","§110.5(b)(10)(A)"],expectation:"explain the author's purpose and message within a text"},
  {names:["Text Structure","Sequence","Compare and Contrast","Cause and Effect","Problem and Solution","Text Structure Review"],codes:["§110.5(b)(9)(D)(iii)","§110.5(b)(9)(D)(iii)","§110.5(b)(10)(B)","§110.5(b)(9)(D)(iii)","§110.5(b)(9)(D)(iii)","§110.5(b)(10)(B)"],expectation:"recognize informational organizational patterns and explain how structure contributes to purpose"},
  {names:["Sensory Details","Sight Details","Sound Details","Smell and Taste Details","Touch Details","Sensory Review"],codes:["§110.5(b)(10)(D)","§110.5(b)(10)(D)","§110.5(b)(10)(D)","§110.5(b)(10)(D)","§110.5(b)(10)(D)","§110.5(b)(10)(D)"],expectation:"describe how imagery and literal or figurative language achieve specific purposes"},
  {names:["Topic Sentences","Strong Topic Sentences","Paragraph Main Idea","Choose Topic Sentence","Fix Topic Sentence","Topic Sentence Review"],codes:["§110.5(b)(11)(B)(i)","§110.5(b)(11)(B)(i)","§110.5(b)(11)(B)(i)","§110.5(b)(11)(B)(i)","§110.5(b)(11)(C)","§110.5(b)(11)(B)(i)"],expectation:"develop and revise focused writing organized with a purposeful structure"},
  {names:["Linking Words","Sequence Words","Compare Words","Cause Words","Transition Words","Linking Words Review"],codes:["§110.5(b)(11)(C)","§110.5(b)(11)(C)","§110.5(b)(11)(C)","§110.5(b)(11)(C)","§110.5(b)(11)(C)","§110.5(b)(11)(C)"],expectation:"revise drafts by combining and rearranging ideas for coherence and clarity"},
  {names:["Editing","Revising","Capitalization","Punctuation","Sentence Fixes","Editing Review"],codes:["§110.5(b)(11)(D)(i)","§110.5(b)(11)(C)","§110.5(b)(11)(D)(ix)","§110.5(b)(11)(D)(x)","§110.5(b)(11)(D)(i)","§110.5(b)(11)(D)(x)"],expectation:"revise for clarity and edit using grade-level standard English conventions"},
  {names:["Descriptive Details","Add Details","Describe Characters","Describe Settings","Strong Details","Description Review"],codes:["§110.5(b)(11)(B)(ii)","§110.5(b)(11)(B)(ii)","§110.5(b)(11)(B)(ii)","§110.5(b)(11)(B)(ii)","§110.5(b)(11)(B)(ii)","§110.5(b)(11)(B)(ii)"],expectation:"develop an engaging idea with specific and relevant details"},
  {names:["Prefixes","Suffixes","Word Parts","Prefix Meanings","Suffix Meanings","Prefixes and Suffixes Review"],codes:["§110.5(b)(3)(C)","§110.5(b)(3)(C)","§110.5(b)(3)(C)","§110.5(b)(2)(A)(v)","§110.5(b)(2)(A)(vi)","§110.5(b)(3)(C)"],expectation:"identify meanings of affixes and decode words using prefixes or suffixes"},
  {names:["Compound Words","Build Compound Words","Split Compound Words","Compound Word Meanings","Compound Word Practice","Compound Words Review"],codes:["§110.5(b)(2)(A)(iii)","§110.5(b)(2)(B)(iii)","§110.5(b)(2)(A)(iii)","§110.5(b)(3)(B)","§110.5(b)(2)(B)(iii)","§110.5(b)(2)(A)(iii)"],expectation:"decode, spell, and determine meanings of compound words in context"},
  {names:["Homophones","Homonyms","There Their They're","To Two Too","Word Meaning Clues","Homophones Review"],codes:["§110.5(b)(2)(B)(ii)","§110.5(b)(3)(D)","§110.5(b)(2)(B)(ii)","§110.5(b)(2)(B)(ii)","§110.5(b)(3)(B)","§110.5(b)(3)(D)"],expectation:"spell homophones and explain homophones or homographs in context"},
  {names:["Greek Roots","Latin Roots","Root Meanings","Root Word Practice","Build Words from Roots","Roots Review"],codes:["§110.5(b)(3)(B)","§110.5(b)(3)(B)","§110.5(b)(3)(A)","§110.5(b)(3)(B)","§110.5(b)(3)(C)","§110.5(b)(3)(A)"],expectation:"use context and reference resources to determine meaning, syllabication, and pronunciation of words"},
  {names:["Spelling","Common Spelling Patterns","Word Families","Spelling Rules","Correct Spelling","Spelling Review"],codes:["§110.5(b)(11)(D)(xi)","§110.5(b)(2)(B)(i)","§110.5(b)(2)(B)(iv)","§110.5(b)(2)(B)(v)","§110.5(b)(11)(D)(xi)","§110.5(b)(11)(D)(xi)"],expectation:"spell grade-appropriate multisyllabic words using orthographic and syllable patterns"},
  {names:["Prepositions","Prepositional Phrases","Location Words","Time Words","Choose Preposition","Prepositions Review"],codes:["§110.5(b)(11)(D)(vi)","§110.5(b)(11)(D)(vi)","§110.5(b)(11)(D)(vi)","§110.5(b)(11)(D)(vi)","§110.5(b)(11)(D)(vi)","§110.5(b)(11)(D)(vi)"],expectation:"edit drafts using prepositions and prepositional phrases"},
  {names:["Verb Tense","Past Tense","Present Tense","Future Tense","Fix Verb Tense","Verb Tense Review"],codes:["§110.5(b)(11)(D)(ii)","§110.5(b)(11)(D)(ii)","§110.5(b)(11)(D)(ii)","§110.5(b)(11)(D)(ii)","§110.5(b)(11)(D)(ii)","§110.5(b)(11)(D)(ii)"],expectation:"edit drafts using past, present, and future verb tense"},
  {names:["Verb Types","Action Verbs","Linking Verbs","Helping Verbs","Choose the Verb","Verb Types Review"],codes:["§110.5(b)(11)(D)(i)","§110.5(b)(11)(D)(i)","§110.5(b)(11)(D)(i)","§110.5(b)(11)(D)(i)","§110.5(b)(11)(D)(i)","§110.5(b)(11)(D)(i)"],expectation:"edit complete simple and compound sentences with subject-verb agreement"},
  {names:["Contractions","Apostrophes","Make Contractions","Expand Contractions","Contraction Practice","Contractions Review"],codes:["§110.5(b)(2)(A)(iii)","§110.5(b)(11)(D)(x)","§110.5(b)(2)(B)(iii)","§110.5(b)(2)(A)(iii)","§110.5(b)(11)(D)(x)","§110.5(b)(2)(B)(iii)"],expectation:"decode and spell contractions and edit apostrophes in contractions"},
  {names:["Conjunctions","And But Or","Join Sentences","Choose Conjunction","Fix Conjunctions","Conjunctions Review"],codes:["§110.5(b)(11)(D)(viii)","§110.5(b)(11)(D)(viii)","§110.5(b)(11)(D)(viii)","§110.5(b)(11)(D)(viii)","§110.5(b)(11)(D)(viii)","§110.5(b)(11)(D)(viii)"],expectation:"edit coordinating conjunctions to form compound subjects, predicates, and sentences"}
];

const G23_PHONICS_WORDS = Object.freeze({
  closed:["rabbit","picnic","basket","magnet","helmet","dentist","napkin","problem","fabric","traffic","fantastic","athletic","insect","pumpkin","subject","hundred","plastic","contest","district","instruction"],
  vce:["sunrise","inside","cupcake","bedtime","invite","complete","athlete","mistake","explode","confuse","translate","concrete","compete","remote","include","illustrate","calculate","demonstrate","communicate","investigate"],
  teams:["rainbow","oatmeal","seacoast","daydream","teacher","freedom","beneath","seasonal","repeated","agreement","treatment","appealing","roadway","snowflake","moonlight","complaining","meaningful","disagreement","preheating","cooperating"],
  blends:["problem","plastic","blanket","shelter","cranberry","fragment","district","instrument","scramble","splendid","construct","subtract","springtime","thunderstorm","transport","strengthen","instruction","grandparent","misprinted","demonstrate"],
  digraphs:["sunshine","toothbrush","chicken","whisper","graphing","shadow","thimble","weather","elephant","dolphin","paragraph","photograph","whenever","childhood","shipwreck","thoughtful","earthquake","wheelchair","shelter","thankfulness"],
  trigraphs:["scratchy","kitchen","watchful","pitcher","stretching","catching","dispatch","matchbox","patchwork","switching","latchkey","butcher","hatching","sketchbook","itching","cheerful","chocolate","children","sandwich","adventure"],
  variant:["eight","weightless","neighbor","freight","although","doughnut","shoulder","thoughtful","roughen","toughness","enough","brought","throughout","daughter","straighten","heighten","borough","thorough","counterweight","breakthrough"],
  diphthong:["cowboy","enjoyment","oyster","fountain","avoidance","loyalty","poisonous","outnumber","boundary","appointment","destroyer","announcement","moisture","household","powerful","disappoint","employment","throughout","downstairs","playground"],
  rcontrol:["garden","harvest","corner","morning","purple","birthday","surface","returning","important","furniture","performer","stormy","carpet","thirteen","northern","departure","circumstance","organization","determination","environment"],
  irregular:["because","through","enough","thought","although","different","important","probably","beautiful","favorite","straight","caught","brought","certain","necessary","knowledge","business","interesting","especially","environment"]
});

const G23_SYLLABLE_DIVISIONS = [
  ["rabbit","rab/bit"], ["robot","ro/bot"], ["sunset","sun/set"], ["music","mu/sic"], ["napkin","nap/kin"],
  ["hotel","ho/tel"], ["basket","bas/ket"], ["moment","mo/ment"], ["problem","prob/lem"], ["pilot","pi/lot"],
  ["fantastic","fan/tas/tic"], ["computer","com/pu/ter"], ["important","im/por/tant"], ["adventure","ad/ven/ture"], ["remember","re/mem/ber"],
  ["volunteer","vol/un/teer"], ["celebrate","cel/e/brate"], ["instrument","in/stru/ment"], ["information","in/for/ma/tion"], ["investigation","in/ves/ti/ga/tion"]
];

const G23_G3_INFORMATION_ROWS = [
  ["Prairie dogs dig connected tunnels with sleeping rooms and several exits. Their burrows offer shade in summer and shelter from predators. Alarm calls warn the colony when danger approaches.","Prairie dog burrows and communication support survival","Burrows have several exits"],
  ["Wetlands hold water after heavy rain. Plants slow the moving water, while soil absorbs part of it. These processes can reduce flooding downstream.","Wetlands can reduce flooding","Wetland soil absorbs water"],
  ["Engineers tested three bridge models with equal loads. The triangular design bent least because its braces spread force through the frame. They selected that design for another test.","Test evidence helped engineers select a strong bridge design","The triangular model bent least"],
  ["A compost pile contains food scraps, dry leaves, air, and moisture. Decomposers break the materials into nutrient-rich matter. Gardeners mix that matter into soil.","Composting turns discarded material into a soil resource","Decomposers break down scraps"],
  ["Monarch butterflies travel thousands of miles in stages. No single butterfly completes the entire round trip. Several generations continue the route using inherited behaviors.","Monarch migration is completed across generations","The trip covers thousands of miles"],
  ["A watershed is land that drains toward one body of water. Rain falling on streets, fields, and forests may all enter the same river. Pollution anywhere in the watershed can therefore affect that river.","Activities across a watershed can affect shared water","Water drains toward one body"],
  ["The printing press allowed pages to be copied much faster than handwriting. Books became less expensive and more widely available. As access grew, more people could exchange ideas through print.","Faster printing increased access to books and ideas","Books became less expensive"],
  ["Mangrove trees grow along tropical coasts. Their tangled roots trap sediment and weaken waves. The roots also create shelter for young fish.","Mangrove roots protect coasts and provide habitat","Roots weaken waves"],
  ["A lunar month follows the Moon's changing appearance. The Moon does not make its own light; people see sunlight reflected from different portions of it. The pattern repeats in about a month.","The Moon's visible phases form a repeating pattern","Moonlight is reflected sunlight"],
  ["Public libraries lend more than books. Many provide computers, research databases, meeting spaces, and classes. These shared resources help community members learn and work.","Libraries provide varied community learning resources","Many libraries provide computers"],
  ["Desert plants receive little rainfall. Some store water in thick stems, while others grow wide shallow roots that quickly absorb rain. Different structures solve the same water problem.","Desert plants have structures that help them obtain or store water","Some plants store water in stems"],
  ["Sound begins when matter vibrates. A tight guitar string vibrates faster than a loose one and produces a higher pitch. Changing tension therefore changes the sound.","String tension affects vibration and pitch","Tight strings vibrate faster"],
  ["A community garden divided a large lot into small plots. Families grew vegetables, neighbors shared tools, and students studied insects there. One space served several community needs.","A community garden can provide food, cooperation, and learning","Families grew vegetables"],
  ["Reusable bottles require materials and energy to manufacture. However, using one bottle many times can replace many single-use bottles. The environmental result depends partly on repeated use.","Repeated use affects the environmental benefit of a reusable bottle","One bottle can replace many disposable bottles"],
  ["Maps use scale to represent large distances in small spaces. A map key explains symbols, and a compass rose shows direction. Readers combine these features to interpret location.","Several map features help readers interpret place and distance","A map key explains symbols"],
  ["Owls have forward-facing eyes that support depth perception. Fringed feathers reduce flight noise, and sensitive hearing helps locate prey. Together these structures support nighttime hunting.","Several owl structures support hunting at night","Fringed feathers reduce noise"],
  ["During drought, a town limited lawn watering and repaired leaking pipes. Household water use fell, but officials continued measuring reservoir levels. Conservation and monitoring worked together.","The town used several strategies to manage limited water","Workers repaired leaks"],
  ["A seed bank stores seeds under controlled conditions. If a plant population is damaged by disease or habitat loss, stored seeds may help restore it. Careful records identify every sample.","Seed banks preserve plant diversity for possible future restoration","Records identify seed samples"],
  ["Coral reefs occupy a small part of the ocean but shelter many species. Rising water temperatures can cause corals to lose helpful algae. Protecting reefs requires understanding this relationship.","Coral reef health depends on environmental conditions and biological relationships","Reefs shelter many species"],
  ["Revision is more than correcting spelling. Writers may reorganize ideas, replace vague words, or add evidence for readers. These changes improve meaning and clarity.","Revision improves a text's meaning and organization","Writers may add evidence"]
];

const G23_G3_INFERENCE_ROWS = [
  ["Kai entered with a dripping umbrella and shook water from his jacket. Outside, tires hissed across the street.","It is raining","Kai's umbrella and jacket are wet","Evidence can reveal information not stated directly"],
  ["Mina reread the directions, erased one measurement, and cut a fresh piece of cardboard before testing the model again.","Mina is correcting an error","She rechecks a measurement and replaces a piece","Careful revision can improve results"],
  ["The dog stood beside its empty bowl, looked at Noor, and tapped the bowl with one paw.","The dog wants food or water","The bowl is empty and the dog signals toward it","Actions can communicate needs"],
  ["After the final whistle, the blue team exchanged high fives while the other team slowly packed its equipment.","The blue team probably won","One team celebrates after the whistle","Effort and outcomes cause emotional responses"],
  ["Ava moved the young plant away from the dark hallway. Two days after placing it near a window, its stem stood straighter.","More light helped the plant","The plant improved near the window","Living things respond to environmental conditions"],
  ["The museum sign said CLOSED, but workers carried ladders and paint through the front doors.","The museum is being maintained or prepared","Workers have repair tools while visitors are excluded","Temporary closure can support improvement"],
  ["Luis packed an extra water bottle, a map, and a light jacket. He checked the trail forecast before sunrise.","Luis is preparing for a hike","He packs outdoor supplies and checks a trail forecast","Preparation supports safety"],
  ["Every table was covered with flour. A warm loaf cooled by the window while the timer sounded near the oven.","Someone has been baking bread","Flour, a loaf, timer, and oven are present","Processes leave evidence"],
  ["When the lights flickered, Simone saved her document and unplugged the computer before thunder shook the windows.","A storm may interrupt electricity","Lights flicker and thunder follows","Recognizing warning signs supports wise choices"],
  ["The pond level dropped each week, and muddy shore appeared where ducks had floated in May.","The pond is losing water","Measurements fall and exposed shore grows","Patterns over time reveal change"],
  ["Rafi whispered in the hallway and gently closed the door marked RECORDING IN PROGRESS.","Rafi is trying not to disturb a recording","He whispers and closes the marked door gently","Respect includes responding to others' needs"],
  ["The class chart showed the shaded cup stayed five degrees cooler than the cup in sunlight.","Sunlight warmed the exposed cup more","The chart records a five-degree difference","Data supports explanations"],
  ["Priya's bookmark was on page 84 yesterday and page 132 today. She carried the novel to lunch.","Priya is engaged in reading the novel","Her bookmark advanced and she keeps the book nearby","Repeated choices show interest"],
  ["The first paper bridge sagged under four blocks. After adding triangular braces, it held twelve.","The braces strengthened the bridge","The redesigned bridge holds three times the load","Evidence should guide design"],
  ["Marcus opened the cage outdoors, but the rehabilitated bird remained on the branch for a minute before flying away.","The bird hesitated before returning to the wild","It waits after the cage opens","Transitions may require courage"],
  ["The grocery shelf was empty below a sign advertising batteries before the approaching hurricane.","People bought supplies for the storm","Batteries are sold out before a hurricane","People prepare when danger is expected"],
  ["Leah compared two sources and crossed out a claim that appeared only on an advertisement with no evidence.","Leah is evaluating source reliability","She rejects an unsupported advertising claim","Reliable conclusions require credible evidence"],
  ["Although the puzzle was difficult, Andre sorted edge pieces, studied the picture, and continued after two failed attempts.","Andre is persistent and strategic","He changes strategy and keeps working","Persistence includes thoughtful adjustment"],
  ["The new trail curved around the nesting area, and signs asked hikers to keep dogs leashed during spring.","The trail rules protect nesting animals","The route and leash rule limit disturbance","Communities can balance access with protection"],
  ["After reading both proposals, council members chose the costlier plan because it protected the wetland and reduced future flood damage.","Long-term benefits outweighed the higher initial cost","The selected plan protects land and limits later damage","Strong decisions consider more than immediate cost"]
];

const G23_G3_PURPOSE_ROWS = [
  ["Sea otters wrap themselves in kelp while resting so currents do not carry them away.","inform","explain a sea otter behavior"],
  ["Choose a reusable lunch container this week; one small change can prevent many disposable bags from becoming trash.","persuade","encourage readers to reduce lunch waste"],
  ["The tiny dragon sneezed a silver cloud, and every spoon in the castle began to sing.","entertain","amuse readers with an imaginary event"],
  ["A thermometer measures temperature, while a rain gauge measures precipitation.","inform","compare the jobs of two weather tools"],
  ["Our park needs more shade. Ask the council to plant native trees beside the playground.","persuade","convince the council to add shade trees"],
  ["Jada opened the old map, and a paper ship sailed out across her desk.","entertain","tell a surprising fantasy scene"],
  ["Compost forms when decomposers break food scraps and leaves into simpler material.","inform","explain how compost forms"],
  ["Walk or bike for short trips when it is safe; doing so reduces traffic and air pollution.","persuade","encourage safer low-pollution travel"],
  ["The moonlit scarecrow stepped down from its post to return a lost mitten.","entertain","tell a gentle imaginary story"],
  ["A map scale connects a distance on paper to a larger distance in the real world.","inform","define the purpose of map scale"],
  ["Support the school book drive because every student deserves interesting choices to read.","persuade","gain support for a book drive"],
  ["When Omar whispered the secret word, his backpack politely asked for a vacation.","entertain","create humor through personification"],
  ["Mangrove roots trap sediment, weaken waves, and shelter young fish near tropical coasts.","inform","describe several functions of mangrove roots"],
  ["Keep dogs leashed near nesting birds so the adults can feed and protect their young.","persuade","change visitor behavior to protect wildlife"],
  ["The last library book blinked awake and rearranged its ending before sunrise.","entertain","engage readers with a magical event"],
  ["Sound travels as vibrations through matter such as air, water, and solids.","inform","explain a basic property of sound"],
  ["Vote for the longer recess plan; movement can help students return to class ready to focus.","persuade","build support for a longer recess"],
  ["A nervous cloud practiced making tiny raindrops before its first thunderstorm.","entertain","give a cloud human feelings in a story"],
  ["A primary source was created during the time being studied, while a secondary source analyzes information later.","inform","distinguish two kinds of historical sources"],
  ["The wetland plan costs more today, but protecting the area can prevent greater flood damage later; choose the plan with lasting benefits.","persuade","convince readers to consider long-term benefits"]
];

const G23_G3_STRUCTURE_ROWS = [
  ["First, rinse the jar. Next, add soil and seeds. Finally, place it near sunlight.","sequence","time-order words organize steps"],
  ["Heavy rain filled the creek, so water spread across the low road.","cause and effect","rain is the cause and flooding is the effect"],
  ["Both frogs and toads are amphibians, but frogs usually have smoother, wetter skin.","compare and contrast","the text states a similarity and a difference"],
  ["The garden soil dried too quickly. Students added mulch, which slowed water loss.","problem and solution","dry soil is addressed by adding mulch"],
  ["Before dawn the team packed tools; at sunrise they began the trail survey; by noon they had mapped every turn.","sequence","events appear in chronological order"],
  ["The metal lid warmed in sunlight and expanded slightly, making it easier to twist.","cause and effect","heating causes expansion"],
  ["A rectangle and a square each have four right angles; unlike most rectangles, a square has four equal sides.","compare and contrast","shared and different attributes are explained"],
  ["Noise from chair legs interrupted reading. Felt pads under the legs nearly eliminated the scraping.","problem and solution","felt pads address disruptive noise"],
  ["A caterpillar hatches, grows, forms a chrysalis, and later emerges as a butterfly.","sequence","life-cycle stages are ordered"],
  ["Because the wetland plants slow runoff, less soil washes into the river.","cause and effect","slower runoff results in less erosion"],
  ["Solar and wind power are renewable; solar panels use light, whereas turbines use moving air.","compare and contrast","two energy sources are compared"],
  ["The bridge bent under the load, so engineers added triangular braces before retesting it.","problem and solution","braces solve a design weakness"],
  ["After gathering sources, the writer sorted notes, drafted paragraphs, and then revised the conclusion.","sequence","transition words order the writing process"],
  ["A drought reduced available grass; as a result, some grazing animals moved to a new area.","cause and effect","limited grass causes movement"],
  ["Libraries and museums both preserve information, but libraries organize texts while museums often display objects.","compare and contrast","similar purposes and different collections are shown"],
  ["The trail crossed a nesting site. Planners curved the new path around the habitat.","problem and solution","the route is changed to protect nests"],
  ["First the town measured water use, then repaired leaks, and finally compared the new totals.","sequence","the actions follow a measured order"],
  ["Warm ocean water stressed coral, causing it to lose the algae that provide much of its food.","cause and effect","temperature change produces biological effects"],
  ["A firsthand diary records one person's experience, while a history article combines evidence from many sources.","compare and contrast","two source types are distinguished"],
  ["The original plan was inexpensive but increased flood risk. Engineers proposed a costlier wetland design that reduced long-term damage.","problem and solution","a safer design addresses future flooding"]
];

const G23_G3_SENSORY_ROWS = [
  ["Amber sunlight flashed across the rippled pond.","sight","amber sunlight flashed"], ["Dry leaves crackled under every hurried step.","sound","leaves crackled"],
  ["The bread released a warm, yeasty smell.","smell","warm, yeasty smell"], ["Tart lemon made her tongue tingle.","taste","tart lemon"],
  ["The rough rope scratched his palm.","touch","rough rope scratched"], ["Silver fog curled between the dark trees.","sight","silver fog curled"],
  ["A low drumbeat thudded through the hall.","sound","drumbeat thudded"], ["Sharp smoke stung the air near the campfire.","smell","sharp smoke"],
  ["The soup tasted earthy, salty, and slightly sweet.","taste","earthy, salty, and slightly sweet"], ["Cold rain tapped her cheeks like tiny pebbles.","touch","cold rain tapped her cheeks"],
  ["Neon signs painted wavy colors on the wet street.","sight","neon signs painted wavy colors"], ["The hinges squealed before the heavy door boomed shut.","sound","hinges squealed and door boomed"],
  ["Pine and damp soil scented the shaded trail.","smell","pine and damp soil"], ["The berry was first sweet, then surprisingly sour.","taste","sweet, then surprisingly sour"],
  ["The sun-warmed stone felt smooth beneath her fingers.","touch","warm smooth stone"], ["A thin gold line appeared where the horizon met the sea.","sight","thin gold line at the horizon"],
  ["Rain whispered on the roof before thunder cracked overhead.","sound","rain whispered and thunder cracked"], ["Peppermint and cocoa drifted from the busy kitchen.","smell","peppermint and cocoa"],
  ["Smoky pepper lingered after the crisp bite.","taste","smoky pepper"], ["Icy wind pressed through the fabric and numbed his fingertips.","touch","icy wind numbed fingertips"]
];

const G23_G3_WRITING_TOPICS = [
  ["school gardens","They provide fresh food and places for science observations."], ["wetlands","They hold water and provide habitat."],
  ["reading routines","A regular schedule helps readers build stamina."], ["community libraries","They share books, technology, classes, and meeting space."],
  ["safe bicycle travel","Helmets, visible clothing, and traffic rules reduce risk."], ["animal adaptations","Body structures and behaviors support survival."],
  ["water conservation","Repairing leaks and reducing waste protects limited supplies."], ["weather tools","Different tools measure temperature, wind, and rainfall."],
  ["recycling choices","Sorting correctly helps materials be processed again."], ["map features","Keys, scales, and compass roses communicate location."],
  ["bridge design","Testing shapes and materials reveals stronger solutions."], ["pollinators","Many plants depend on animals to move pollen."],
  ["primary sources","Objects and records from a time provide historical evidence."], ["healthy soil","Air, water, organisms, and organic matter support plant growth."],
  ["public parks","Shared outdoor spaces support play, nature, and community events."], ["renewable energy","Sunlight and wind can generate electricity without being used up."],
  ["responsible research","Writers compare credible sources and cite borrowed information."], ["revision","Writers reorganize, clarify, and strengthen ideas for readers."],
  ["habitat protection","Thoughtful rules can reduce disturbance while allowing access."], ["long-term planning","Strong decisions compare present costs with future effects."]
];

const G23_G3_TRANSITION_ROWS = [
  ["measure the materials","build the model","Next"], ["the rain continued","the creek rose","As a result"],
  ["frogs have smooth skin","toads often have drier skin","In contrast"], ["the first design was light","it was also strong","In addition"],
  ["gather credible sources","organize the notes","Afterward"], ["the class reduced waste","trash totals fell","Consequently"],
  ["both maps show Texas","one emphasizes rivers","However"], ["the seed received water","it began to sprout","Therefore"],
  ["read the whole paragraph","state its central idea","Then"], ["the path was longer","it protected the nesting site","Nevertheless"],
  ["the cup in sunlight warmed","the shaded cup stayed cooler","Meanwhile"], ["plants need light","they also need water and nutrients","Furthermore"],
  ["the team identified a problem","members proposed three solutions","Subsequently"], ["the bridge held ten blocks","the first model held only four","By comparison"],
  ["the drought reduced grass","the herd migrated","For this reason"], ["the writer added evidence","the claim became stronger","As a result"],
  ["the town repaired leaks","it continued measuring use","At the same time"], ["the source was recent","its claim lacked evidence","Even so"],
  ["the plan cost more initially","it prevented greater future damage","Ultimately"], ["evaluate each option","select the solution best supported by evidence","Finally"]
];

const G23_G3_AFFIX_ROWS = [
  ["preview","pre-","before","view beforehand"], ["disagree","dis-","not or opposite","not agree"], ["nonfiction","non-","not","writing that is not fiction"], ["incorrect","in-","not","not correct"],
  ["impossible","im-","not","not possible"], ["kindness","-ness","state or quality","the quality of being kind"], ["helpful","-ful","full of","full of help"], ["rainy","-y","having","having rain"],
  ["preheat","pre-","before","heat beforehand"], ["disconnect","dis-","apart or not","separate a connection"], ["nontoxic","non-","not","not toxic"], ["inactive","in-","not","not active"],
  ["impatient","im-","not","not patient"], ["darkness","-ness","state or quality","the state of being dark"], ["thoughtful","-ful","full of","showing much thought"], ["rocky","-y","having","having many rocks"],
  ["prearrange","pre-","before","arrange beforehand"], ["disapprove","dis-","not or opposite","not approve"], ["nonrenewable","non-","not","not renewable"], ["resourceful","-ful","full of","able to find useful solutions"]
];

const G23_G3_COMPOUND_ROWS = [
  ["sunlight","sun + light","light from the sun"], ["raincoat","rain + coat","a coat worn for rain"], ["toothbrush","tooth + brush","a brush for teeth"], ["playground","play + ground","ground designed for play"],
  ["bookcase","book + case","a case or shelf for books"], ["moonlight","moon + light","light seen from the moon"], ["wildlife","wild + life","plants and animals living wild"], ["snowflake","snow + flake","a flake of snow"],
  ["fireproof","fire + proof","resistant to fire"], ["waterproof","water + proof","resistant to water"], ["earthquake","earth + quake","a shaking of Earth"], ["thunderstorm","thunder + storm","a storm with thunder"],
  ["schoolhouse","school + house","a building used as a school"], ["grandparent","grand + parent","a parent's parent"], ["lighthouse","light + house","a tower whose light guides ships"], ["wheelchair","wheel + chair","a chair that moves on wheels"],
  ["breakthrough","break + through","an important advance"], ["counterweight","counter + weight","a weight that balances another"], ["headquarters","head + quarters","the main offices of an organization"], ["daydream","day + dream","a dreamlike thought while awake"]
];

const G23_G3_HOMOPHONE_ROWS = [
  ["Please ___ your name at the top.","write",["right","rite","wright"]], ["Turn ___ at the corner.","right",["write","rite","wright"]],
  ["The sailors crossed the ___.","sea",["see","C","sie"]], ["I can ___ the lighthouse.","see",["sea","C","sie"]],
  ["___ bringing their notebooks.","They're",["Their","There","Theyre"]], ["The students placed ___ projects here.","their",["there","they're","ther"]],
  ["Set the boxes over ___.","there",["their","they're","ther"]], ["We need ___ rulers.","two",["to","too","tow"]],
  ["The class walked ___ the garden.","to",["two","too","tow"]], ["The backpack was ___ heavy.","too",["to","two","tow"]],
  ["A honeybee may visit a ___.","flower",["flour","flouer","flor"]], ["The baker measured the ___.","flour",["flower","flouer","flor"]],
  ["The strong wind ___ all night.","blew",["blue","blu","bleu"]], ["The map line was ___.","blue",["blew","blu","bleu"]],
  ["We waited for the bell to ___.","ring",["wring","ringe","wryng"]], ["Do not ___ water from the wet cloth onto the floor.","wring",["ring","ringe","wryng"]],
  ["The hikers followed the forest ___.","trail",["trial","trale","trayl"]], ["The new design passed its final ___.","trial",["trail","trale","trayl"]],
  ["The council must ___ whether to protect the site.","decide",["de-side","desside","deside"]], ["Credible evidence can ___ a conclusion.","support",["suport","sapport","suppourt"]]
];

const G23_G3_ROOT_ROWS = [
  ["telescope","tele","far","an instrument for viewing faraway objects"], ["telephone","phon","sound","a device that carries sound across distance"], ["photograph","photo","light","an image made by recording light"], ["geology","geo","earth","the study of Earth"],
  ["biology","bio","life","the study of life"], ["thermometer","therm","heat","a tool that measures temperature"], ["aquatic","aqua","water","living in or related to water"], ["audible","aud","hear","able to be heard"],
  ["transport","port","carry","carry from one place to another"], ["inspect","spect","look","look at closely"], ["construct","struct","build","build by joining parts"], ["predict","dict","say","say what may happen before it occurs"],
  ["manuscript","script","write","a written or typed document"], ["circumference","circum","around","distance around a circle"], ["submarine","mar","sea","a vessel that travels under the sea"], ["solar","sol","sun","related to the sun"],
  ["multilingual","multi","many","using many languages"], ["microscope","micro","small","a tool for viewing very small objects"], ["chronology","chron","time","events arranged by time"], ["biodiversity","bio","life","the variety of living things in a place"]
];

const G23_G3_PREPOSITION_ROWS = [
  ["The notebook rests beneath the map.","beneath the map","location"], ["We will meet after lunch.","after lunch","time"],
  ["The hikers walked through the tunnel.","through the tunnel","location or movement"], ["Before sunrise, the team checked its tools.","Before sunrise","time"],
  ["A heron stood beside the quiet pond.","beside the quiet pond","location"], ["During the storm, everyone remained indoors.","During the storm","time"],
  ["The roots spread below the soil.","below the soil","location"], ["The class revised drafts until dismissal.","until dismissal","time"],
  ["The bridge extends across the creek.","across the creek","location or movement"], ["We recorded temperature throughout the week.","throughout the week","time"],
  ["A seedling grew between two stones.","between two stones","location"], ["The museum opens at nine o'clock.","at nine o'clock","time"],
  ["The geese flew above the wetland.","above the wetland","location"], ["Following the experiment, students compared data.","Following the experiment","time"],
  ["Place the rain gauge away from the roof.","away from the roof","location"], ["The pond level fell within three weeks.","within three weeks","time"],
  ["The trail curves around the nesting site.","around the nesting site","location or movement"], ["The council will vote on Tuesday.","on Tuesday","time"],
  ["The strongest brace sits underneath the platform.","underneath the platform","location"], ["Despite the delay, the researchers completed work before sunset.","before sunset","time"]
];

const G23_G3_TENSE_ROWS = [
  ["walk","walked","walks","will walk"], ["study","studied","studies","will study"], ["carry","carried","carries","will carry"], ["observe","observed","observes","will observe"],
  ["measure","measured","measures","will measure"], ["compare","compared","compares","will compare"], ["record","recorded","records","will record"], ["revise","revised","revises","will revise"],
  ["plan","planned","plans","will plan"], ["stop","stopped","stops","will stop"], ["try","tried","tries","will try"], ["explain","explained","explains","will explain"],
  ["investigate","investigated","investigates","will investigate"], ["construct","constructed","constructs","will construct"], ["predict","predicted","predicts","will predict"], ["identify","identified","identifies","will identify"],
  ["demonstrate","demonstrated","demonstrates","will demonstrate"], ["communicate","communicated","communicates","will communicate"], ["analyze","analyzed","analyzes","will analyze"], ["justify","justified","justifies","will justify"]
];

const G23_G3_VERB_ROWS = [
  ["The scientist","measures","is","has measured"], ["Two engineers","test","are","have tested"], ["Our class","records","seems","has recorded"], ["The migrating birds","follow","appear","have followed"],
  ["A careful writer","revises","becomes","has revised"], ["The wetland plants","slow","remain","have slowed"], ["Each student","compares","is","has compared"], ["The bridge braces","support","look","have supported"],
  ["A thermometer","measures","seems","has measured"], ["The readers","infer","are","have inferred"], ["One strong magnet","attracts","remains","has attracted"], ["The research teams","investigate","appear","have investigated"],
  ["The city planner","explains","is","has explained"], ["Several sources","support","seem","have supported"], ["The new evidence","changes","becomes","has changed"], ["Those detailed maps","show","are","have shown"],
  ["The revised design","protects","looks","has protected"], ["Every credible claim","includes","is","has included"], ["Long-term planning","reduces","remains","has reduced"], ["The final paragraph","synthesizes","becomes","has synthesized"]
];

const G23_G3_CONTRACTION_ROWS = [
  ["do not","don't"], ["cannot","can't"], ["is not","isn't"], ["will not","won't"], ["did not","didn't"],
  ["they are","they're"], ["we are","we're"], ["you are","you're"], ["it is","it's"], ["that is","that's"],
  ["I will","I'll"], ["we will","we'll"], ["she will","she'll"], ["they will","they'll"], ["you will","you'll"],
  ["I have","I've"], ["we have","we've"], ["they have","they've"], ["could not","couldn't"], ["should not","shouldn't"]
];

const G23_G3_CONJUNCTION_ROWS = [
  ["The model was light","it was strong","and"], ["The route was longer","it protected the habitat","but"], ["We can repair the old tool","we can replace it","or"], ["The rain ended","the creek kept rising","but"],
  ["Maya measured temperature","Luis recorded rainfall","and"], ["Use a print source","check a reliable database","or"], ["The claim sounded convincing","it lacked evidence","but"], ["The class reduced waste","recycling totals improved","and"],
  ["Wear a helmet","follow traffic rules","and"], ["The team can add braces","it can choose a new material","or"], ["The first paragraph gives context","the second presents evidence","and"], ["The source was recent","its author was not identified","but"],
  ["The cup was shaded","it remained cooler","and"], ["The writer could delete the repeated fact","she could replace it with evidence","or"], ["The wetland plan cost more","it reduced future flood damage","but"], ["Owls see in dim light","their feathers reduce sound","and"],
  ["The bridge passed one test","engineers continued evaluating it","but"], ["Readers may reread a sentence","they may consult a glossary","or"], ["The council considered present cost","it also considered long-term effects","and"], ["The solution was not the cheapest","the evidence showed it was the safest","but"]
];

function g23PhonicsSequence(groupIndex, variant){
  if(groupIndex === 0) return [G23_PHONICS_WORDS.closed,G23_PHONICS_WORDS.vce,G23_PHONICS_WORDS.teams,G23_PHONICS_WORDS.closed,G23_PHONICS_WORDS.vce,G23_PHONICS_WORDS.teams][variant-1];
  if(groupIndex === 1) return [G23_PHONICS_WORDS.blends,G23_PHONICS_WORDS.digraphs,G23_PHONICS_WORDS.trigraphs,G23_PHONICS_WORDS.blends,G23_PHONICS_WORDS.blends,G23_PHONICS_WORDS.digraphs][variant-1];
  if(groupIndex === 2) return [G23_PHONICS_WORDS.variant,G23_PHONICS_WORDS.diphthong,G23_PHONICS_WORDS.rcontrol,G23_PHONICS_WORDS.variant,G23_PHONICS_WORDS.rcontrol,G23_PHONICS_WORDS.diphthong][variant-1];
  return G23_PHONICS_WORDS.irregular;
}

function g23SyllableDistractors(word, correct){
  const cuts = [];
  for(let i=1;i<word.length;i++){
    const candidate = `${word.slice(0,i)}/${word.slice(i)}`;
    if(candidate !== correct && !cuts.includes(candidate)) cuts.push(candidate);
  }
  cuts.push(word, `${word}/`);
  return cuts.filter((value,index,array)=>value!==correct && array.indexOf(value)===index).slice(0,3);
}

function g23BuildG3English(spec, round, level, groupIndex, variant){
  if(groupIndex <= 2 || groupIndex === 4){
    const words = g23PhonicsSequence(groupIndex, variant);
    const word = words[round - 1];
    const label = spec.lesson.toLowerCase();
    return {q:`Decode the grade-level word for this ${label} lesson. Which spelling is correct in the sentence “The reader carefully decoded ___”?`,a:word,w:g23Misspellings(word),explain:`“${word}” is the correctly spelled word and demonstrates the sound-spelling focus for ${spec.lesson}.`};
  }
  if(groupIndex === 3){
    const [word,division] = G23_SYLLABLE_DIVISIONS[round - 1];
    return {q:`Which division best supports decoding the multisyllabic word “${word}”?`,a:division,w:g23SyllableDistractors(word,division),explain:`The division ${division} separates pronounceable syllable parts and supports accurate decoding.`};
  }
  if(groupIndex === 5){
    const row = G23_G3_INFORMATION_ROWS[round - 1];
    const askDetail = variant === 2 || variant === 4;
    return {q:`Read the informational paragraph: ${row[0]} ${askDetail?"Which supporting detail is stated and relevant?":"Which central or key idea is best supported by the whole paragraph?"}`,a:askDetail?row[2]:row[1],w:askDetail?[row[1],"A detail that contradicts the paragraph","A detail about an unrelated topic"]:[row[2],"The paragraph has no central idea","Every sentence is an unrelated fact"],explain:askDetail?`“${row[2]}” is explicit evidence in the paragraph.`:`The details work together to support “${row[1]}.”`};
  }
  if(groupIndex === 6){
    const row = G23_G3_INFERENCE_ROWS[round - 1];
    if(variant === 2) return {q:`Read: ${row[0]} Which detail is the strongest evidence for the inference “${row[1]}”?`,a:row[2],w:["The inference alone, without any text detail","A fact that is not in the passage","A reader's unrelated personal preference"],explain:`“${row[2]}” directly supports the inference.`};
    if(variant === 3) return {q:`Read: ${row[0]} Which theme is supported by the character, event, and evidence?`,a:row[3],w:["Weather is the topic of every story","A theme must be one word","The passage contains no broader message"],explain:`The events support the theme “${row[3]}.”`};
    return {q:`Read: ${row[0]} What inference is best supported by specific evidence?`,a:row[1],w:["The opposite conclusion is definitely true","No conclusion can be drawn from observable details","A conclusion about an unrelated person or event"],explain:`The inference “${row[1]}” is supported by: ${row[2]}.`};
  }
  if(groupIndex === 7){
    const row = G23_G3_PURPOSE_ROWS[round - 1];
    if(variant >= 2 && variant <= 4){
      const target = ["persuade","inform","entertain"][variant-2];
      const yes = row[1] === target;
      const answer = yes ? `Yes; the author writes to ${row[2]}.` : `No; the author writes to ${row[1]}—to ${row[2]}.`;
      return {q:`Read: ${row[0]} Is the author's main purpose to ${target}?`,a:answer,w:[`Yes, because every text is written to ${target}.`,`No; the passage has no message or purpose.`,`The purpose cannot be explained with text evidence.`],explain:`The language and message show that the author intends to ${row[1]}: ${row[2]}.`};
    }
    return {q:`Read: ${row[0]} What is the author's purpose and message?`,a:`To ${row[1]}—to ${row[2]}`,w:["To present unrelated details with no message","To hide all information from the reader","To use a purpose contradicted by the text"],explain:`The content and wording show a purpose to ${row[1]} and a message that aims to ${row[2]}.`};
  }
  if(groupIndex === 8){
    const row = G23_G3_STRUCTURE_ROWS[round - 1];
    const targets = [null,"sequence","compare and contrast","cause and effect","problem and solution",null];
    const target = targets[variant - 1];
    if(target){
      const yes = row[1] === target;
      return {q:`Read: ${row[0]} Does this paragraph use ${target} as its main organizational pattern?`,a:yes?`Yes; ${row[2]}.`:`No; it uses ${row[1]} because ${row[2]}.`,w:[`Yes, only because it contains more than one sentence.`,`No; informational texts never use organizational patterns.`,`The pattern cannot be identified from signal words and relationships.`],explain:`The relationship among ideas is ${row[1]}: ${row[2]}.`};
    }
    return {q:`Read: ${row[0]} Which structure organizes the ideas, and what evidence proves it?`,a:`${g23Cap(row[1])}; ${row[2]}`,w:["Description; the text only lists colors","Question and answer; the reader is directly interviewed","No structure; the sentences have no relationship"],explain:`The paragraph uses ${row[1]} because ${row[2]}.`};
  }
  if(groupIndex === 9){
    const row = G23_G3_SENSORY_ROWS[round - 1];
    const target = [null,"sight","sound","smell or taste","touch",null][variant-1];
    if(target){
      const match = target === row[1] || (target === "smell or taste" && (row[1] === "smell" || row[1] === "taste"));
      return {q:`Read: “${row[0]}” Does the key imagery primarily appeal to ${target}?`,a:match?`Yes; “${row[2]}” appeals to ${row[1]}.`:`No; “${row[2]}” primarily appeals to ${row[1]}.`,w:["Yes, because all descriptive words appeal to every sense equally.","No; imagery never creates a sensory impression.","The sense cannot be identified from the author's words."],explain:`The phrase “${row[2]}” creates ${row[1]} imagery.`};
    }
    return {q:`Read: “${row[0]}” Which phrase creates imagery, and which sense does it address?`,a:`“${row[2]}” — ${row[1]}`,w:["No phrase creates an image","The sentence only gives an exact numerical measurement","Every word appeals only to sight"],explain:`“${row[2]}” appeals most directly to ${row[1]}.`};
  }
  if(groupIndex === 10){
    const [topic,detail] = G23_G3_WRITING_TOPICS[round - 1];
    const answer = `${g23Cap(topic)} serve an important purpose. ${detail}`;
    return {q:`Choose the strongest topic sentence and supporting direction for a focused paragraph about ${topic}.`,a:answer,w:[`I have many thoughts about many different things.`,`This paragraph is about ${topic}, and that is all.`,`${detail} A completely unrelated fact should come next.`],explain:"The answer names a focused topic and establishes a direction that the relevant detail supports."};
  }
  if(groupIndex === 11){
    const [first,second,transition] = G23_G3_TRANSITION_ROWS[round - 1];
    const answer = `${g23Cap(first)}. ${transition}, ${second}.`;
    return {q:`Which revision links these ideas with a transition that makes their relationship clear? Idea 1: ${first}. Idea 2: ${second}.`,a:answer,w:[`${g23Cap(first)}. On the other hand, ${second}.`,`Things happened. Something else happened.`,`Because ${first}, although ${second}, meanwhile.`],explain:`“${transition}” accurately signals the relationship between the two ideas.`};
  }
  if(groupIndex === 12){
    const [subject,verb,ending] = G23_G2_SENTENCE_ROWS[round - 1];
    const date = `Monday, July ${round}`;
    const correct = `${date}, ${subject.toLowerCase()} ${verb} ${ending}.`;
    return {q:`Edit the draft for a complete sentence, capitalization, commas, and end punctuation: “${date.toLowerCase()} ${subject.toLowerCase()} ${verb} ${ending}”`,a:correct,w:[`${date} ${subject.toLowerCase()}, ${verb} ${ending}`,`${date.toLowerCase()}, ${subject.toLowerCase()} ${verb} ${ending}.`,`${date}, ${subject.toLowerCase()} ${verb}, ${ending}?`],explain:"The revision uses a complete subject and predicate, correct capitalization, comma placement, and a period."};
  }
  if(groupIndex === 13){
    const [topic,detail] = G23_G3_WRITING_TOPICS[round - 1];
    const precise = detail.replace(/\.$/,"");
    return {q:`A writer is developing an engaging paragraph about ${topic}. Which sentence adds the most specific, relevant detail?`,a:`${precise}; this evidence helps readers understand the topic.`,w:["It is nice and good in many ways.","I once saw something different on television.","The paragraph should change to a completely unrelated topic."],explain:`The answer develops the topic with this relevant detail: ${precise}.`};
  }
  if(groupIndex === 14){
    const [word,affix,meaning,whole] = G23_G3_AFFIX_ROWS[round - 1];
    if(variant === 1 || variant === 4) return {q:`In the word “${word},” what is the prefix and what does it contribute?`,a:`${affix} means “${meaning}”`,w:["-ed means past tense","-s means more than one","The word contains no meaningful affix"],explain:`The prefix ${affix} contributes the meaning “${meaning},” so the word means ${whole}.`};
    if(variant === 2 || variant === 5) return {q:`Use morphology to determine the meaning of “${word}.”`,a:whole,w:["the opposite of its base and affix meanings","a meaning unrelated to either word part","a proper noun naming a specific place"],explain:`Combining the affix meaning with the base yields “${whole}.”`};
    return {q:`Which analysis correctly divides “${word}” into a meaningful affix and base?`,a:`${affix} + base; ${whole}`,w:["Every letter is an unrelated word part","The final letter alone supplies the complete meaning","The word cannot be analyzed using morphology"],explain:`The affix ${affix} combines with a base to produce the meaning ${whole}.`};
  }
  if(groupIndex === 15){
    const [word,parts,meaning] = G23_G3_COMPOUND_ROWS[round - 1];
    return {q:`Decode “${word}” in context. Which analysis gives its parts and meaning?`,a:`${parts}; ${meaning}`,w:["It has one unrelated word part and no meaning","Its meaning must be the opposite of both parts","It is an abbreviation rather than a complete word"],explain:`The compound ${word} combines ${parts} to mean ${meaning}.`};
  }
  if(groupIndex === 16){
    const [sentence,answer,alternatives] = G23_G3_HOMOPHONE_ROWS[round - 1];
    return {q:`Use meaning and grammar to choose the correctly spelled word: “${sentence}”`,a:answer,w:alternatives,explain:`“${answer}” has the spelling and meaning required by this sentence.`};
  }
  if(groupIndex === 17){
    const [word,root,rootMeaning,whole] = G23_G3_ROOT_ROWS[round - 1];
    return {q:`A reference entry identifies ${root} as a word part meaning “${rootMeaning}.” Use that information and context to determine “${word}.”`,a:`${word}: ${whole}`,w:[`${word}: the opposite of ${whole}`,`${word}: a meaning unrelated to “${rootMeaning}”`,`${word}: a punctuation mark with no word meaning`],explain:`The reference clue ${root} = “${rootMeaning}” supports the meaning “${whole}.”`};
  }
  if(groupIndex === 18){
    const sequences = [G23_PHONICS_WORDS.irregular,G23_PHONICS_WORDS.teams,G23_PHONICS_WORDS.rcontrol,G23_PHONICS_WORDS.closed,G23_PHONICS_WORDS.variant,G23_PHONICS_WORDS.vce];
    const word = sequences[variant-1][round-1];
    return {q:`Apply grade-level orthographic and syllable patterns. Which spelling correctly completes “The student accurately wrote ___ in the final draft”?`,a:word,w:g23Misspellings(word),explain:`“${word}” is the correct spelling.`};
  }
  if(groupIndex === 19){
    const [sentence,phrase,relation] = G23_G3_PREPOSITION_ROWS[round - 1];
    return {q:`Read: “${sentence}” Which prepositional phrase functions correctly, and what relationship does it show?`,a:`${phrase} — ${relation}`,w:["The subject — an action","The main verb — a person","No phrase in the sentence shows a relationship"],explain:`“${phrase}” is a prepositional phrase that shows ${relation}.`};
  }
  if(groupIndex === 20){
    const [base,past,present,future] = G23_G3_TENSE_ROWS[round - 1];
    const target = variant === 2 ? "past" : variant === 3 ? "present" : variant === 4 ? "future" : ["past","present","future"][round%3];
    const answer = target === "past" ? past : target === "present" ? present : future;
    return {q:`Choose the ${target}-tense form of “${base}” to complete: “The researcher ___ the evidence carefully.”`,a:answer,w:[base,past,present,future].filter(value=>value!==answer).slice(0,3),explain:`“${answer}” correctly expresses ${target} tense.`};
  }
  if(groupIndex === 21){
    const [subject,action,linking,helping] = G23_G3_VERB_ROWS[round - 1];
    const type = variant === 3 ? "linking" : variant === 4 ? "helping" : "action";
    const verb = type === "linking" ? linking : type === "helping" ? helping : action;
    const complement = type === "linking" ? "ready for the next step" : "the evidence carefully";
    const answer = `${subject} ${verb} ${complement}.`;
    let wrongVerb;
    if(type === "linking") wrongVerb = ({is:"are",are:"is",seems:"seem",remain:"remains",becomes:"become",appear:"appears",looks:"look"}[verb] || `${verb}s`);
    else if(type === "helping") wrongVerb = verb.startsWith("has ") ? verb.replace(/^has /,"have ") : verb.replace(/^have /,"has ");
    else wrongVerb = verb.endsWith("s") ? verb.slice(0,-1) : `${verb}s`;
    return {q:`Which sentence uses a ${type} verb and maintains subject-verb agreement?`,a:answer,w:[`${subject} ${wrongVerb} ${complement}.`,`${verb} ${subject.toLowerCase()} ${complement}.`,`${subject} ${complement} ${verb}.`],explain:`“${verb}” functions as a ${type} verb and agrees with “${subject}.”`};
  }
  if(groupIndex === 22){
    const [expanded,contraction] = G23_G3_CONTRACTION_ROWS[round - 1];
    const askExpand = variant === 4 || (variant === 6 && level >= 3);
    return askExpand
      ? {q:`Which words are correctly represented by the contraction “${contraction}”?`,a:expanded,w:[`${expanded} now`,`${expanded} later`,"a possessive noun rather than two words"],explain:`“${contraction}” expands to “${expanded}.”`}
      : {q:`Which contraction correctly combines “${expanded}” and places the apostrophe where letters are omitted?`,a:contraction,w:g23Misspellings(contraction),explain:`“${contraction}” correctly represents “${expanded}” with an apostrophe.`};
  }
  const [first,second,conjunction] = G23_G3_CONJUNCTION_ROWS[round - 1];
  const correct = `${first}, ${conjunction} ${second.toLowerCase()}.`;
  return {q:`Join the related ideas with the coordinating conjunction that expresses their relationship: “${first}.” “${second}.”`,a:correct,w:[`${first}, because ${second.toLowerCase()}.`,`${first} ${second.toLowerCase()} ${conjunction}.`,`${conjunction} ${first.toLowerCase()}, ${second.toLowerCase()}.`],explain:`“${conjunction}” accurately coordinates the ideas and the comma forms a correct compound sentence.`};
}

let g23G3EnglishLesson = 0;
G23_G3_ELAR_GROUPS.forEach((group,groupIndex)=>{
  group.names.forEach((lesson,variantIndex)=>{
    g23G3EnglishLesson++;
    const variant = variantIndex + 1;
    g23RegisterLesson(`gen_g3_eng_L${g23G3EnglishLesson}`, {
      lesson,
      code:group.codes[variantIndex],
      expectation:group.expectation,
      source:G23_TEKS_OFFICIAL_SOURCES.g3,
      build:(round,level)=>g23BuildG3English({lesson},round,level,groupIndex,variant)
    });
  });
});

/* ---------- Grade 3 Mathematics: 60 individually contracted lessons ---------- */

const G23_G3_MATH_NAMES = [
  "Place Value to 100,000","Expanded Form","Standard Form","Word Form Match","Place Value Fix","Place Value Review",
  "Compare Numbers","Greater Than & Less Than","Order Numbers","Compare Review","Least to Greatest","Ordering Practice",
  "Round to Tens","Round to Hundreds","Rounding Rules","Rounding Tens Practice","Rounding Hundreds Practice","Rounding Review",
  "Estimate Sums Match","Estimate Sums Fix","Estimate Sums MC","Estimate Sums Speed","Estimate Sums Fill","Estimate Sums Review","Estimate Sums Correction",
  "Estimate Differences MC","Estimate Differences Speed","Estimate Differences Fill","Estimate Differences Match","Estimate Differences Fix",
  "Three-Digit Addition MC","Three-Digit Addition Speed","Three-Digit Addition Fill","Three-Digit Addition Match","Three-Digit Addition Fix","Addition Word Problems",
  "Three-Digit Subtraction MC","Three-Digit Subtraction Speed","Three-Digit Subtraction Fill","Three-Digit Subtraction Match","Three-Digit Subtraction Fix","Subtraction Word Problems",
  "Money Values","Money Math","Needs vs Wants","Budget Basics","Money Word Problems","Financial Literacy Review",
  "Mixed Operations Fill","Mixed Operations Match","Mixed Operations Fix","Choose the Operation","Mixed Operations Speed","Mixed Operations Challenge",
  "Division Facts Match","Division Fix","Division Word Problems","Division Speed","Division Fill Blanks","Division Review"
];

function g23G3MathContract(lessonNo){
  if(lessonNo <= 2) return ["§111.5(b)(2)(A)","compose and decompose numbers up to 100,000 using expanded notation"];
  if(lessonNo <= 6) return ["§111.5(b)(2)(B)","describe mathematical relationships in the base-10 system through the hundred-thousands place"];
  if(lessonNo <= 12) return ["§111.5(b)(2)(D)","compare and order whole numbers up to 100,000 using >, <, or ="];
  if(lessonNo <= 18) return ["§111.5(b)(2)(C)","locate numbers between consecutive multiples of powers of ten and round whole numbers"];
  if(lessonNo <= 30) return ["§111.5(b)(4)(B)","round to the nearest 10 or 100 or use compatible numbers to estimate addition and subtraction solutions"];
  if(lessonNo <= 42) return ["§111.5(b)(4)(A)","solve one-step and two-step addition and subtraction problems within 1,000 with fluency"];
  if(lessonNo <= 44) return ["§111.5(b)(4)(C)","determine the value of a collection of coins and bills"];
  if(lessonNo === 45 || lessonNo === 47) return ["§111.5(b)(9)(C)","identify costs and benefits of planned and unplanned spending decisions"];
  if(lessonNo === 46 || lessonNo === 48) return ["§111.5(b)(9)(F)","identify decisions involving income, spending, saving, credit, and charitable giving"];
  if(lessonNo <= 54) return ["§111.5(b)(4)(K)","solve one-step and two-step multiplication and division problems within 100"];
  if(lessonNo === 55 || lessonNo === 58 || lessonNo === 60) return ["§111.5(b)(4)(F)","recall multiplication facts through 10 by 10 and corresponding division facts"];
  if(lessonNo === 56 || lessonNo === 59) return ["§111.5(b)(4)(J)","determine quotients using the relationship between multiplication and division"];
  return ["§111.5(b)(4)(K)","solve one-step and two-step multiplication and division problems within 100"];
}

function g23NumberWords(value){
  const ones=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
  const tens=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
  const under100=n=>n<20?ones[n]:`${tens[Math.floor(n/10)]}${n%10?`-${ones[n%10]}`:""}`;
  const under1000=n=>n<100?under100(n):`${ones[Math.floor(n/100)]} hundred${n%100?` ${under100(n%100)}`:""}`;
  if(value<1000) return under1000(value);
  const thousands=Math.floor(value/1000), rest=value%1000;
  return `${under1000(thousands)} thousand${rest?` ${under1000(rest)}`:""}`;
}

function g23RoundTo(value,unit){
  return Math.round(value/unit)*unit;
}

function g23BuildG3Math(spec, round, level, lessonNo){
  if(lessonNo <= 6){
    const n = level===1 ? 214+round*137 : level===2 ? 1200+round*431 : level===3 ? 10000+round*811 : 30000+round*1703;
    const tenThousands=Math.floor(n/10000), thousands=Math.floor((n%10000)/1000), hundreds=Math.floor((n%1000)/100), tens=Math.floor((n%100)/10), ones=n%10;
    const expanded=[tenThousands*10000,thousands*1000,hundreds*100,tens*10,ones].filter(Boolean).join(" + ");
    if(lessonNo===1){
      const placeIndex=(round-1)%5;
      const placeNames=["ones","tens","hundreds","thousands","ten-thousands"];
      const digits=[ones,tens,hundreds,thousands,tenThousands];
      const values=[ones,tens*10,hundreds*100,thousands*1000,tenThousands*10000];
      return {q:`In ${n.toLocaleString()}, what is the value of the digit ${digits[placeIndex]} in the ${placeNames[placeIndex]} place?`,a:String(values[placeIndex]),w:g23NumberWrongs(values[placeIndex],10**Math.min(placeIndex,3)),explain:`The ${placeNames[placeIndex]} digit contributes ${values[placeIndex].toLocaleString()} to the number.`};
    }
    if(lessonNo===2) return {q:`Which expanded notation composes ${n.toLocaleString()}?`,a:expanded,w:[`${n-10} + 10`,expanded.replace(/ \+ /," − "),`${ones*10000} + ${tens*1000} + ${hundreds*100} + ${thousands*10} + ${tenThousands}`],explain:`Adding the nonzero place values in ${expanded} gives ${n.toLocaleString()}.`};
    if(lessonNo===3) return {q:`Write this in standard form: ${expanded}.`,a:n.toLocaleString(),w:[(n+100).toLocaleString(),(n-10).toLocaleString(),(n+1000).toLocaleString()],explain:`Combining every place-value term produces ${n.toLocaleString()}.`};
    if(lessonNo===4) return {q:`Which word form names ${n.toLocaleString()}?`,a:g23NumberWords(n),w:[g23NumberWords(Math.max(0,n-100)),g23NumberWords(n+10),g23NumberWords(n+1000)],explain:`The digits and places read “${g23NumberWords(n)}.”`};
    const claim = `${tenThousands} ten-thousands + ${thousands} thousands + ${hundreds} hundreds + ${tens} tens + ${ones} ones`;
    if(lessonNo===5) return {q:`A student wrote ${claim} for ${n.toLocaleString()}. Which evaluation is correct?`,a:"The decomposition is correct.",w:["The thousands and hundreds digits must switch.","Every place value should be multiplied by ten.","The ones digit should always be zero."],explain:"Each coefficient matches the corresponding digit in the number."};
    return {q:`Which statement about ${n.toLocaleString()} is true?`,a:`Its expanded form is ${expanded}.`,w:[`Its word form is ${g23NumberWords(n+100)}.`,`Its hundreds digit is ${thousands}.`,`It is ten times ${n.toLocaleString()}.`],explain:`The expanded form lists the actual value contributed by each nonzero digit.`};
  }
  if(lessonNo <= 12){
    const a=1200+round*311+level*701;
    const b=a+(round%2?level*10:-level*10);
    const c=a+((round%3)+1)*100;
    const sorted=[a,b,c].sort((x,y)=>x-y);
    if(lessonNo===9 || lessonNo===11 || lessonNo===12) return {q:`Order the numbers from least to greatest: ${[b,c,a].map(n=>n.toLocaleString()).join(", ")}.`,a:sorted.map(n=>n.toLocaleString()).join(" < "),w:[sorted.slice().reverse().map(n=>n.toLocaleString()).join(" < "),`${a.toLocaleString()} = ${b.toLocaleString()} = ${c.toLocaleString()}`,`${sorted[1].toLocaleString()} < ${sorted[0].toLocaleString()} < ${sorted[2].toLocaleString()}`],explain:"Compare from the greatest place first, then continue right until digits differ."};
    const symbol=a>b?">":a<b?"<":"=";
    return {q:`Choose the comparison supported by place value: ${a.toLocaleString()} ___ ${b.toLocaleString()}.`,a:`${a.toLocaleString()} ${symbol} ${b.toLocaleString()}`,w:[`${a.toLocaleString()} ${symbol===">"?"<":">"} ${b.toLocaleString()}`,`${a.toLocaleString()} = ${b.toLocaleString()}`,`${b.toLocaleString()} ${symbol} ${a.toLocaleString()}`],explain:`The first unequal place proves that ${a.toLocaleString()} ${symbol} ${b.toLocaleString()}.`};
  }
  if(lessonNo <= 18){
    const n=137+round*173+level*411;
    const unit=lessonNo===13||lessonNo===16?10:lessonNo===14||lessonNo===17?100:[10,100,1000][(round-1)%3];
    const answer=g23RoundTo(n,unit);
    return {q:`Round ${n.toLocaleString()} to the nearest ${unit.toLocaleString()}. Which two consecutive multiples contain it, and what is the rounded value?`,a:`${Math.floor(n/unit)*unit} and ${Math.floor(n/unit)*unit+unit}; rounds to ${answer.toLocaleString()}`,w:[`Rounds to ${(answer+unit).toLocaleString()}`,`Rounds to ${Math.max(0,answer-unit).toLocaleString()}`,`Rounds to ${n.toLocaleString()} because rounding never changes a number`],explain:`${n.toLocaleString()} lies between consecutive multiples of ${unit}; its position is closest to ${answer.toLocaleString()}.`};
  }
  if(lessonNo <= 30){
    const addition=lessonNo<=25;
    const a=180+round*21+level*70;
    const b=addition?95+round*13:70+round*5;
    const exact=addition?a+b:a-b;
    const estimate=g23RoundTo(a,level<3?10:100)+(addition?1:-1)*g23RoundTo(b,level<3?10:100);
    const symbol=addition?"+":"−";
    const estimateUnit=level<3?10:100;
    return {q:`Estimate ${a} ${symbol} ${b} by rounding each number to the nearest ${estimateUnit}.`,a:String(estimate),w:[String(estimate+estimateUnit),String(Math.max(0,estimate-estimateUnit)),String(estimate+(estimateUnit*2))],explain:`Round both numbers first, then ${addition?"add":"subtract"}; the estimate is ${estimate}.`};
  }
  if(lessonNo <= 42){
    const addition=lessonNo<=36;
    const a=addition?120+round*17:650+round*11;
    const b=55+round*9;
    const c=level>=3?20+round*4:0;
    const answer=addition?Math.min(1000,a+b+c):a-b-c;
    const expression=addition?`${a} + ${b}${c?` + ${c}`:""}`:`${a} − ${b}${c?` − ${c}`:""}`;
    const context=lessonNo===36||lessonNo===42;
    return {q:context?`A collection starts with ${a} items, ${addition?"receives":"uses"} ${b}, and ${c?`${addition?"receives":"uses"} ${c} more`:"has no second change"}. How many remain or total?`:`Solve with a place-value strategy: ${expression}.`,a:String(answer),w:g23NumberWrongs(answer,level*10),explain:`Perform the operation(s) in order and check reasonableness. The result is ${answer}.`};
  }
  if(lessonNo <= 48){
    if(lessonNo===43 || lessonNo===44){
      const dollars=2+level+Math.floor(round/5), quarters=round%4, dimes=(round+1)%5, nickels=round%3, pennies=(round*3)%10;
      const cents=dollars*100+quarters*25+dimes*10+nickels*5+pennies;
      return {q:`Find the value of ${dollars} one-dollar bill(s), ${quarters} quarter(s), ${dimes} dime(s), ${nickels} nickel(s), and ${pennies} penny/pennies.`,a:g23Money(cents),w:[g23Money(cents-5),g23Money(cents+5),g23Money(cents+25)],explain:`Add each bill and coin value to get ${g23Money(cents)}.`};
    }
    const cost=12+round+level*3, saved=20+round*2;
    if(lessonNo===45 || lessonNo===47) return {q:`A student has $${saved}. A planned school supply costs $${cost}; an unplanned toy costs $${cost-3}. Which decision identifies a cost and benefit?`,a:`Buy the needed supply: it costs $${cost}, and the benefit is being prepared while preserving $${saved-cost}.`,w:["Buy both without checking whether enough money remains.","Spend everything because unplanned purchases have no costs.","Choose only by color because benefits never matter."],explain:"The answer explicitly compares the financial cost, practical benefit, and money remaining."};
    return {q:`A student receives $${saved} and wants to spend, save, and give. Which plan identifies all three decisions and stays within the income?`,a:`Spend $${Math.floor(saved/2)}, save $${saved-Math.floor(saved/2)-2}, and give $2.`,w:[`Spend $${saved}, save $5, and give $2.`,`Borrow money without a repayment plan and call it saving.`,`Record no income or spending and assume the budget balances.`],explain:"The three allocations add to the available income and distinguish spending, saving, and giving."};
  }
  if(lessonNo <= 54){
    const groups=2+((round+level)%9), each=2+((round*2)%9), product=groups*each;
    const extra=level>=4?groups:0;
    const answer=extra?product-extra:product;
    return {q:`A maker prepares ${groups} boxes with ${each} parts each${extra?`, then uses ${extra} parts`:""}. Which equation and solution represent the situation?`,a:extra?`${groups} × ${each} − ${extra} = ${answer}`:`${groups} × ${each} = ${answer}`,w:[`${groups} + ${each} = ${groups+each}`,`${product} ÷ ${each+1} = ${Math.floor(product/(each+1))}`,`${each} − ${groups} = ${each-groups}`],explain:`Equal groups require multiplication${extra?", followed by subtraction":""}; the result is ${answer}.`};
  }
  const divisor=2+((round+level)%9), quotient=2+((round*3+level)%9), total=divisor*quotient;
  return {q:`${total} objects are partitioned into ${divisor} equal groups. How many are in each group, and which multiplication fact verifies it?`,a:`${quotient}; because ${divisor} × ${quotient} = ${total}`,w:[`${divisor}; because ${divisor} + ${quotient} = ${total}`,`${quotient+1}; because ${divisor} × ${quotient+1} = ${total}`,`${Math.max(1,quotient-1)}; because division does not relate to multiplication`],explain:`The related fact ${divisor} × ${quotient} = ${total} proves ${total} ÷ ${divisor} = ${quotient}.`};
}

G23_G3_MATH_NAMES.forEach((lesson,index)=>{
  const lessonNo=index+1;
  const [code,expectation]=g23G3MathContract(lessonNo);
  g23RegisterLesson(`gen_g3_math_L${lessonNo}`, {
    lesson,code,expectation,source:G23_TEKS_OFFICIAL_SOURCES.g3,
    build:(round,level)=>g23BuildG3Math({lesson},round,level,lessonNo)
  });
});

/* ---------- Grade 3 Science: 3 individually contracted lessons ---------- */

const G23_G3_SCIENCE_SPECS = [
  {lesson:"Habitats and Seasonal Responses",code:"§112.5(b)(12)(A)",expectation:"explain how temperature and precipitation affect animal growth and behavior through migration and hibernation and plant responses through dormancy",source:G23_TEKS_OFFICIAL_SOURCES.science},
  {lesson:"Weather Tools and Evidence",code:"§112.5(b)(1)(D)",expectation:"use Celsius thermometers, wind vanes, rain gauges, and digital tools to observe, measure, test, and analyze information",source:G23_TEKS_OFFICIAL_SOURCES.science},
  {lesson:"Forces and Motion",code:"§112.5(b)(7)(A)",expectation:"demonstrate and describe contact and distance forces, including magnetism, gravity, pushes, and pulls",source:G23_TEKS_OFFICIAL_SOURCES.science}
];

const G23_G3_HABITAT_ROWS = [
  ["days become colder and insects become scarce","many birds migrate toward warmer areas with more food","migration"],
  ["winter temperatures fall and plant food is limited","some bears reduce activity and survive on stored energy","hibernation"],
  ["rainfall stops for several months","some grasses stop active growth until moisture returns","dormancy"],
  ["spring temperature rises and insects increase","migrating swallows return to nesting areas","migration"],
  ["pond water becomes very cold","some frogs greatly reduce activity in protected mud","seasonal inactivity"],
  ["a long dry season begins","some wildflower seeds remain inactive in soil","dormancy"],
  ["northern lakes freeze and open water disappears","geese travel south to available water","migration"],
  ["winter limits food and temperatures stay low","bats remain inactive in sheltered caves","hibernation"],
  ["rainfall returns after a dry season","dormant desert plants resume growth","ending dormancy"],
  ["summer heat dries shallow ponds","some animals move to deeper, cooler water","movement caused by conditions"],
  ["autumn temperatures fall each week","monarch butterflies begin traveling toward warmer regions","migration"],
  ["snow covers food sources","a ground squirrel lowers activity and uses stored fat","hibernation"],
  ["soil is cold and water is unavailable as ice","many buds remain inactive until spring","dormancy"],
  ["coastal rainfall increases and temporary pools form","frogs gather where eggs and tadpoles can develop","growth and reproductive response"],
  ["a drought reduces flowering plants","nectar-feeding animals move toward wetter habitat","movement caused by precipitation"],
  ["warm spring conditions last longer than usual","some insects emerge earlier in the season","growth response to temperature"],
  ["early frost arrives before normal migration time","birds that depend on insects face less available food","temperature affects behavior and resources"],
  ["several weeks of rain increase grass growth","grazing animals find more food for their young","precipitation supports growth"],
  ["a warmer winter shortens the inactive period","hibernating animals may use stored energy differently","temperature affects hibernation"],
  ["a region becomes hotter and drier over several seasons","organisms may migrate, enter dormancy, or fail to thrive","combined temperature and precipitation effects"]
];

const G23_G3_WEATHER_ROWS = [
  ["air temperature","Celsius thermometer","degrees Celsius"], ["amount of rainfall","rain gauge","millimeters or centimeters of precipitation"],
  ["wind direction","wind vane","a compass direction"], ["change in temperature over a day","Celsius thermometer and a time-labeled table","degrees Celsius at repeated times"],
  ["rainfall during two storms","rain gauge and comparison table","precipitation totals for each storm"], ["direction of wind before a front","wind vane","direction observations over time"],
  ["temperature in sun and shade","two Celsius thermometers","paired temperature measurements"], ["weekly precipitation pattern","rain gauge and bar graph","daily rainfall totals"],
  ["weather at two Texas locations","thermometers, wind vanes, and rain gauges","temperature, wind direction, and precipitation"], ["whether a cup is warmer after heating","Celsius thermometer","before-and-after temperature"],
  ["which location received more rain","rain gauges placed in open areas","comparable precipitation depths"], ["whether wind direction changed","wind-vane observations at regular times","a sequence of compass directions"],
  ["a month of temperature changes","Celsius thermometer and line graph","daily temperatures plotted over time"], ["accuracy of two rainfall readings","rain gauges positioned away from roofs","measurements without roof runoff"],
  ["a digital weather data set","computer or tablet","organized measurements for analysis"], ["morning versus afternoon conditions","thermometer, wind vane, and rain gauge","time-stamped weather measurements"],
  ["evidence for a cold-front passage","digital temperature and wind records","a temperature drop with a wind shift"], ["precipitation across three weeks","rain gauge and scaled graph","totals that can be compared"],
  ["possible tool error","a second calibrated thermometer","measurements that can be checked against each other"], ["a complete local weather comparison","multiple tools plus a table and graph","organized evidence across variables and time"]
];

const G23_G3_FORCE_ROWS = [
  ["a hand moves a wagon forward","push","contact force"], ["a child draws a wagon closer by its handle","pull","contact force"],
  ["a paper clip moves toward a magnet without touching it","magnetism","force at a distance"], ["a dropped ball accelerates toward the ground","gravity","force at a distance"],
  ["two carts collide and change direction","pushes during collision","contact forces"], ["a magnet repels another magnet","magnetism","force at a distance"],
  ["a foot kicks a stationary soccer ball","push","contact force changes motion"], ["Earth keeps the Moon in orbit","gravity","force at a distance"],
  ["a rope draws a bucket upward","pull","contact force"], ["a stronger shove makes an empty cart speed up","push","contact force changes speed"],
  ["a magnet attracts an iron nail through paper","magnetism","distance force through a thin material"], ["a book remains on a table instead of falling through it","the table's upward push and gravity","balanced contact and distance forces"],
  ["a bat changes the direction of a moving ball","push from impact","contact force changes direction"], ["a parachutist moves downward toward Earth","gravity","distance force"],
  ["opposite magnet poles move together","magnetic attraction","force at a distance"], ["like magnet poles move apart","magnetic repulsion","force at a distance"],
  ["two students pull equally on opposite ends of a rope and it stays centered","balanced pulls","contact forces with no net change"], ["one student pulls harder and the rope moves","unbalanced pull","contact force changes motion"],
  ["a rolling ball slows after hitting a wall and reverses","wall's push during contact","contact force changes speed and direction"], ["a model shows gravity, a hand push, and magnetic attraction acting in one system","multiple contact and distance forces","forces can interact and produce motion patterns"]
];

function g23BuildG3Science(spec, round, level, lessonNo){
  if(lessonNo===1){
    const [condition,response,kind]=G23_G3_HABITAT_ROWS[round-1];
    return {q:`In a habitat, ${condition}. Which explanation connects the environmental change to an organism response?`,a:`${g23Cap(response)}; this is ${kind}.`,w:["The condition cannot affect any organism's growth or behavior.","Every organism responds in exactly the same way regardless of habitat.","The response occurs without any relationship to temperature or precipitation."],explain:`The change in temperature or precipitation affects resources and conditions, producing ${kind}: ${response}.`};
  }
  if(lessonNo===2){
    const [variable,tool,evidence]=G23_G3_WEATHER_ROWS[round-1];
    return {q:`A team needs to investigate ${variable}. Which tool-and-recording plan produces relevant evidence?`,a:`Use ${tool} and record ${evidence}.`,w:["Use a hand lens and record only opinions.","Use a ruler once and label the result as every weather variable.","Choose no measurement tool and infer the value from a photograph alone."],explain:`${g23Cap(tool)} directly measures or supports analysis of ${variable}; ${evidence} is the relevant evidence.`};
  }
  const [event,force,classification]=G23_G3_FORCE_ROWS[round-1];
  return {q:`Analyze this event: ${event}. Which force description is correct?`,a:`${g23Cap(force)} — ${classification}`,w:["Sound — it always causes every change in position","Temperature — it is the only possible force","No force acts because motion never changes"],explain:`The event demonstrates ${force}, classified as ${classification}.`};
}

g23InstallSpecList("gen_g3_sci_L", G23_G3_SCIENCE_SPECS, g23BuildG3Science);

window.LEARNMASTER_G23_TEKS_CONTRACTS = G23_TEKS_LESSON_CONTRACTS;
window.LEARNMASTER_G23_SEQUENCE_AUDIT = {
  generatorCount:Object.keys(G23_TEKS_LESSON_CONTRACTS).length,
  questionsPerLesson:25,
  explicitTrueFalsePositions:[3,7,11,15,19,23],
  difficultyBands:5,
  source:"Texas Education Agency"
};

// The legacy definitions near the top temporarily wrapped the shared question
// helpers. The 25-question contracts above call their captured base helpers
// directly, so restore the shared helpers before Grade 4-10 scripts load.
mcQuestion = K12_BASE_MC_QUESTION;
inputQuestion = K12_BASE_INPUT_QUESTION;
fillBlankQuestion = K12_BASE_FILL_BLANK_QUESTION;
editSentenceQuestion = K12_BASE_EDIT_SENTENCE_QUESTION;
speedQuestion = K12_BASE_SPEED_QUESTION;
dragQuestion = K12_BASE_DRAG_QUESTION;
matchQuestion = K12_BASE_MATCH_QUESTION;
