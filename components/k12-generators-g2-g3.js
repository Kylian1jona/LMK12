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
    "Choose the best answer:",
    "Select the correct answer:",
    "Read carefully and answer:",
    "Pick the best response:",
    "Think about the lesson and answer:",
    "Choose the correct response:",
    "Look closely and answer:",
    "Select the best response:",
    "Answer this question:"
  ];
  return `${leads[n]} ${q}`;
}

function g23Pick(items){
  return k12RoundPick(items);
}

pick = k12RoundPick;

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