/* K12 spelling lesson add-ons
   Split from components/k12-lessons.js. Keep loaded as a classic script.
*/

function spellingChoiceQuestion(words){
  const round=Math.max(1,Math.min(25,Number(LR.round)||1));
  const it=words[(round-1)%words.length];
  const wrong=[...(it.wrong||[])];
  if(words.length!==5||wrong.length!==3) throw new Error("Each spelling-choice lesson must provide five words and three lesson-owned misconceptions per word.");
  const tier=Math.ceil(round/5);
  const explain=`“${it.correct}” is the standard spelling for ${it.clue}; the other forms misuse the sound-spelling or affix pattern.`;
  if(tier===3){const trueClaim=round%2===1;const claim=trueClaim?it.correct:wrong[0];return {type:"truefalse",q:`True or false: “${claim}” is the correct spelling for ${it.clue}.`,answer:trueClaim,audio:"Decide whether the spelling is correct.",explain};}
  if(tier===4) return {...inputQuestion(`Without choices, type the correct spelling for: ${it.clue}.`,it.correct,"Spell the word independently."),explain};
  if(tier===5) return {...inputQuestion(`A draft uses “${wrong[0]}” for ${it.clue}. What is the correct spelling?`,it.correct,"Correct the spelling and verify the meaning."),explain:`${explain} The mastery check requires correcting the authentic error and confirming that the corrected word fits the meaning.`};
  const prompt=tier===1?`Which spelling correctly names ${it.clue}?`:`Which spelling follows the word pattern for ${it.clue}?`;
  return {...mcQuestion(prompt, it.correct, wrong, "Choose the correctly spelled word."),explain};
}

function spellingTypeQuestion(words){
  const round=Math.max(1,Math.min(25,Number(LR.round)||1));
  const it=words[(round-1)%words.length];
  if(words.length!==5||!it.wrong) throw new Error("Each typed-spelling lesson must provide five words and a lesson-owned misconception.");
  const tier=Math.ceil(round/5);
  const explain=`“${it.answer}” follows the sound-spelling pattern in the spoken prompt; “${it.wrong}” does not.`;
  if(tier===3){const trueClaim=round%2===1;return {type:"truefalse",q:`True or false: “${trueClaim?it.answer:it.wrong}” correctly spells the word in this prompt: ${it.prompt}`,answer:trueClaim,audio:"Evaluate the proposed spelling.",explain};}
  if(tier===5) return {...inputQuestion(`The draft uses “${it.wrong}” for this prompt: ${it.prompt} What correction does the sound-spelling evidence support?`,it.answer,"Correct and verify the spelling."),explain:`${explain} The corrected spelling must match both the spoken sequence and the conventional written form.`};
  const prompt=tier===1?`${it.prompt} How is the word spelled?`:tier===2?`${it.prompt} Which spelling matches this sound pattern? Type it.`:`${it.prompt} What correction should replace “${it.wrong}”?`;
  return {...inputQuestion(prompt, it.answer, "Type the correctly spelled word."),explain};
}

function spellingDragLesson(title, pairs){
  const round=Math.max(1,Math.min(25,Number(LR.round)||1));
  if(pairs.length!==5) throw new Error("Each spelling relationship lesson must provide five lesson-owned pairs.");
  const pair=pairs[(round-1)%pairs.length];
  const wrong=pairs.filter(p=>p!==pair).map(p=>p.right).slice(0,3);
  const tier=Math.ceil(round/5);
  const explain=`“${pair.left}” matches “${pair.right}” in this lesson's word-pattern relationship.`;
  if(tier===3){const trueClaim=round%2===1;const claim=trueClaim?pair.right:wrong[0];return {type:"truefalse",q:`True or false: “${pair.left}” matches “${claim}.”`,answer:trueClaim,audio:"Check the spelling relationship.",explain};}
  if(tier===5) return {...mcQuestion(`A student matched “${pair.left}” with “${wrong[0]}.” Which relationship corrects the error?`,pair.right,wrong,"Correct the relationship and justify the rule."),explain:`${explain} The mastery item requires identifying why the proposed match fails and replacing it with the exact relationship.`};
  const prompt=tier===1?`Which rule or meaning matches “${pair.left}”?`:tier===2?`Which rule or meaning correctly applies to “${pair.left}”?`:`Which match remains correct after analyzing the word parts in “${pair.left}”?`;
  return {...mcQuestion(prompt,pair.right,wrong,"Choose the exact spelling relationship."),explain};
}

function addEnglishSpellingLessons(){
  const spellingTeks={
    g2:["§110.4(b)(2)(B)","decode and spell words using grade-level phonetic knowledge"],
    g3:["§110.5(b)(2)(B)","spell words using sound-spelling patterns and orthographic rules"],
    g4:["§110.6(b)(2)(B)","spell words using prefixes, suffixes, roots, and syllable patterns"],
    g5:["§110.7(b)(2)(B)","spell words using advanced orthographic patterns and affixes"],
    g6:["§110.22(b)(10)(D)(ix)","edit for correct spelling, including commonly confused terms"],
    g7:["§110.23(b)(2)(C)","determine meaning and usage of academic words from Greek and Latin roots"],
    g8:["§110.24(b)(2)(C)","determine meaning and usage of academic words from roots and affixes"],
    g9:["§110.36(b)(10)(D)","edit drafts for correct spelling and conventions"],
    g10:["§110.37(b)(10)(D)","edit drafts for correct spelling and conventions"]
  };
  const spellingSets = {
    g2:[
      { id:"L11", name:"Spelling: Short Vowels", gen:()=>spellingChoiceQuestion([
        {clue:"a small animal that says meow", correct:"CAT", wrong:["CET","CIT","COT"]},
        {clue:"a farm animal with a curly tail", correct:"PIG", wrong:["PEG","PUG","PAG"]},
        {clue:"the star that lights daytime", correct:"SUN", wrong:["SAN","SIN","SEN"]},
        {clue:"a place to sleep", correct:"BED", wrong:["BAD","BID","BUD"]},
        {clue:"a container used for drinking", correct:"CUP", wrong:["CAP","COP","CEP"]}
      ]) },
      { id:"L12", name:"Spelling Drag: Word Families", gen:()=>spellingDragLesson("Drag each word to its word family.", [
        {left:"cat", right:"-at family"},
        {left:"hop", right:"-op family"},
        {left:"sun", right:"-un family"},
        {left:"big", right:"-ig family"},
        {left:"hen", right:"-en family"}
      ]) }
    ],
    g3:[
      { id:"L145", name:"Spelling Drag: Fix the Word", gen:()=>spellingDragLesson("Drag each misspelled word to the correct spelling.", [
        {left:"frend", right:"friend"},
        {left:"becuz", right:"because"},
        {left:"peple", right:"people"},
        {left:"skool", right:"school"},
        {left:"enuf", right:"enough"}
      ]) },
      { id:"L146", name:"Spelling Patterns", gen:()=>spellingTypeQuestion([
        {prompt:"The word is f r i e n d.", answer:"friend", wrong:"frend"},
        {prompt:"The word is b e c a u s e.", answer:"because", wrong:"becuz"},
        {prompt:"The word is p e o p l e.", answer:"people", wrong:"peple"},
        {prompt:"The word is s c h o o l.", answer:"school", wrong:"skool"},
        {prompt:"The word is e n o u g h.", answer:"enough", wrong:"enuf"}
      ]) }
    ],
    g4:[
      { id:"L22", name:"Spelling: Prefixes", gen:()=>spellingChoiceQuestion([
        {clue:"not fair", correct:"UNFAIR", wrong:["INFAIR","DISFAIR","NONFAIR"]},
        {clue:"write again", correct:"REWRITE", wrong:["RE-WRIGHT","REWIRTE","REWRIGHT"]},
        {clue:"view before", correct:"PREVIEW", wrong:["PREVEIW","PERVIEW","PRE-VUE"]},
        {clue:"understand incorrectly", correct:"MISUNDERSTAND", wrong:["MISSUNDERSTAND","MISUNDERSTEND","MIS-UNDERSTAND"]},
        {clue:"not possible", correct:"IMPOSSIBLE", wrong:["INPOSSIBLE","IMPOSIBLE","UNPOSSIBLE"]}
      ]) },
      { id:"L23", name:"Spelling Drag: Prefix Meanings", gen:()=>spellingDragLesson("Drag each prefix word to its meaning.", [
        {left:"rewrite", right:"write again"},
        {left:"unhappy", right:"not happy"},
        {left:"preview", right:"see before"},
        {left:"disagree", right:"not agree"},
        {left:"misread", right:"read incorrectly"}
      ]) }
    ],
    g5:[
      { id:"L13", name:"Spelling: Suffixes", gen:()=>spellingChoiceQuestion([
        {clue:"full of hope", correct:"HOPEFUL", wrong:["HOPEFULL","HOPEFULE","HOPFUL"]},
        {clue:"without care", correct:"CARELESS", wrong:["CARELES","CARELISS","CAIRLESS"]},
        {clue:"in a quick way", correct:"QUICKLY", wrong:["QUICKLEY","QUICKILY","QUICKALLY"]},
        {clue:"the state of being happy", correct:"HAPPINESS", wrong:["HAPPYNESS","HAPPINES","HAPINESS"]},
        {clue:"able to be enjoyed", correct:"ENJOYABLE", wrong:["ENJOYIBLE","ENJOYEBLE","ENJOYABEL"]}
      ]) },
      { id:"L14", name:"Spelling Drag: Suffix Rules", gen:()=>spellingDragLesson("Drag each word to its spelling rule.", [
        {left:"happier", right:"change y to i"},
        {left:"running", right:"double final consonant"},
        {left:"hopeful", right:"drop silent e"},
        {left:"careless", right:"add suffix"},
        {left:"happiness", right:"change y to i before -ness"}
      ]) }
    ],
    g6:[
      { id:"L54", name:"Spelling: Homophones", gen:()=>spellingChoiceQuestion([
        {clue:"belongs to them", correct:"THEIR", wrong:["THERE","THEY'RE","THIER"]},
        {clue:"in that place", correct:"THERE", wrong:["THEIR","THEY'RE","THARE"]},
        {clue:"they are", correct:"THEY'RE", wrong:["THERE","THEIR","THEYRE"]},
        {clue:"belonging to you", correct:"YOUR", wrong:["YOU'RE","YORE","YOURE"]},
        {clue:"you are", correct:"YOU'RE", wrong:["YOUR","YORE","YOURE"]}
      ]) },
      { id:"L55", name:"Spelling Drag: Homophones", gen:()=>spellingDragLesson("Drag each homophone to its meaning.", [
        {left:"their", right:"belongs to them"},
        {left:"there", right:"in that place"},
        {left:"they're", right:"they are"},
        {left:"your", right:"belongs to you"},
        {left:"you're", right:"you are"}
      ]) }
    ],
    g7:[
      { id:"L11", name:"Spelling: Academic Words", gen:()=>spellingChoiceQuestion([
        {clue:"study closely", correct:"ANALYZE", wrong:["ANALIZE","ANALYSE","ANNALYZE"]},
        {clue:"proof that supports a claim", correct:"EVIDENCE", wrong:["EVIDENSE","EVIDANCE","EVIDINCE"]},
        {clue:"a reasoned final judgment", correct:"CONCLUSION", wrong:["CONCLUTION","CONCLUSHION","CONCLUSSION"]},
        {clue:"information surrounding a word or event", correct:"CONTEXT", wrong:["CONTEX","CONTEKST","CONTEXTT"]},
        {clue:"explain the meaning of evidence", correct:"INTERPRET", wrong:["INTERPERT","INTERPRETATE","INTREPRET"]}
      ]) },
      { id:"L12", name:"Spelling Drag: Word Parts", gen:()=>spellingDragLesson("Drag each academic word to its clue.", [
        {left:"analysis", right:"careful study"},
        {left:"evidence", right:"proof"},
        {left:"conclusion", right:"ending idea"},
        {left:"context", right:"surrounding information"},
        {left:"interpretation", right:"reasoned explanation of meaning"}
      ]) }
    ],
    g8:[
      { id:"L11", name:"Spelling: Argument Words", gen:()=>spellingChoiceQuestion([
        {clue:"a point to prove", correct:"CLAIM", wrong:["CLAME","CLAYM","CLAIME"]},
        {clue:"taking a different position", correct:"OPPOSING", wrong:["OPOSEING","OPPOSENG","OPPOSSING"]},
        {clue:"worthy of belief", correct:"CREDIBLE", wrong:["CREDITABLE","CREDIBAL","CREDDIBLE"]},
        {clue:"a response to an opposing claim", correct:"REBUTTAL", wrong:["REBUTAL","REBUTTLE","RIBUTTAL"]},
        {clue:"sound and convincing", correct:"VALID", wrong:["VALLID","VALAD","VALLED"]}
      ]) },
      { id:"L12", name:"Spelling Drag: Argument Terms", gen:()=>spellingDragLesson("Drag each argument word to its meaning.", [
        {left:"claim", right:"point to prove"},
        {left:"evidence", right:"supporting proof"},
        {left:"credible", right:"trustworthy"},
        {left:"opposing", right:"against"},
        {left:"rebuttal", right:"response to an opposing claim"}
      ]) }
    ],
    g9:[
      { id:"L11", name:"Spelling: Literary Terms", gen:()=>spellingChoiceQuestion([
        {clue:"a comparison using like or as", correct:"SIMILE", wrong:["SIMILIE","SIMALY","SIMILEE"]},
        {clue:"repetition of beginning consonant sounds", correct:"ALLITERATION", wrong:["ALITERATION","ALLITIRATION","ALLITTERATION"]},
        {clue:"an author's deliberate word choice", correct:"DICTION", wrong:["DICTIAN","DICKTION","DIKTION"]},
        {clue:"a reference to another text or event", correct:"ALLUSION", wrong:["ILLUSION","ALUSION","ALLUSSION"]},
        {clue:"a contrast between expectation and reality", correct:"IRONY", wrong:["IRONIE","IRONEY","IARONY"]}
      ]) },
      { id:"L12", name:"Spelling Drag: Literary Terms", gen:()=>spellingDragLesson("Drag each literary term to its clue.", [
        {left:"simile", right:"like or as comparison"},
        {left:"metaphor", right:"direct comparison"},
        {left:"diction", right:"word choice"},
        {left:"alliteration", right:"repeated beginning sound"},
        {left:"allusion", right:"reference to another text or event"}
      ]) }
    ],
    g10:[
      { id:"L11", name:"Spelling: Rhetoric Words", gen:()=>spellingChoiceQuestion([
        {clue:"an appeal based on logic and evidence", correct:"LOGOS", wrong:["LOGUS","LOGOSE","LOGOES"]},
        {clue:"an appeal based on credibility", correct:"ETHOS", wrong:["EATHOS","ETHUS","ETHOSE"]},
        {clue:"an appeal based on emotion", correct:"PATHOS", wrong:["PATHUS","PATHOSE","PATHOES"]},
        {clue:"the art of effective persuasion", correct:"RHETORIC", wrong:["RETHORIC","RHETORICK","RHETERRIC"]},
        {clue:"a statement that contradicts itself yet may reveal truth", correct:"PARADOX", wrong:["PARADOCKS","PARIDOX","PARADOXX"]}
      ]) },
      { id:"L12", name:"Spelling Drag: Rhetoric Words", gen:()=>spellingDragLesson("Drag each rhetoric word to its meaning.", [
        {left:"ethos", right:"credibility"},
        {left:"logos", right:"logic"},
        {left:"pathos", right:"emotion"},
        {left:"rhetoric", right:"persuasive language"},
        {left:"paradox", right:"seeming contradiction that can reveal truth"}
      ]) }
    ]
  };

  Object.entries(spellingSets).forEach(([grade, lessons])=>{
    const english = CURR[grade]?.eng;
    if(!english) return;
    lessons.forEach(lesson=>{
      const standard=spellingTeks[grade];
      english[lesson.id] = { name:lesson.name, gen:lesson.gen, teks:standard?{expectation:standard[0],expectationText:standard[1]}:null };
    });
  });
}

addEnglishSpellingLessons();
