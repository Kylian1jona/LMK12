/* K12 spelling lesson add-ons
   Split from components/k12-lessons.js. Keep loaded as a classic script.
*/

function spellingChoiceQuestion(words){
  const it = pick(words);
  return mcQuestion(`Choose the correct spelling for "${it.clue}".`, it.correct, it.wrong, "Choose the correctly spelled word.");
}
function spellingTypeQuestion(words){
  const it = pick(words);
  return inputQuestion(`Type the correct spelling: ${it.prompt}`, it.answer, "Type the correctly spelled word.");
}

function spellingDragLesson(title, pairs){
  return dragQuestion(title, pairs, "Drag each spelling word to its rule or correction.");
}

function addEnglishSpellingLessons(){
  const spellingSets = {
    g2:[
      { id:"L11", name:"Spelling: Short Vowels", gen:()=>spellingChoiceQuestion([
        {clue:"a small animal that says meow", correct:"CAT", wrong:["CET","CIT"]},
        {clue:"a farm animal", correct:"PIG", wrong:["PEG","PUG"]},
        {clue:"something bright in the sky", correct:"SUN", wrong:["SAN","SIN"]}
      ]) },
      { id:"L12", name:"Spelling Drag: Word Families", gen:()=>spellingDragLesson("Drag each word to its word family.", [
        {left:"cat", right:"-at family"},
        {left:"hop", right:"-op family"},
        {left:"sun", right:"-un family"},
        {left:"big", right:"-ig family"}
      ]) }
    ],

    g4:[
      { id:"L22", name:"Spelling: Prefixes", gen:()=>spellingChoiceQuestion([
        {clue:"not fair", correct:"UNFAIR", wrong:["INFAIR","DISFAIR"]},
        {clue:"do again", correct:"REWRITE", wrong:["UNWRITE","PREWRITE"]},
        {clue:"before view", correct:"PREVIEW", wrong:["REVIEWED","UNVIEW"]}
      ]) },
      { id:"L23", name:"Spelling Drag: Prefix Meanings", gen:()=>spellingDragLesson("Drag each prefix word to its meaning.", [
        {left:"rewrite", right:"write again"},
        {left:"unhappy", right:"not happy"},
        {left:"preview", right:"see before"},
        {left:"disagree", right:"not agree"}
      ]) }
    ],
    g5:[
      { id:"L13", name:"Spelling: Suffixes", gen:()=>spellingChoiceQuestion([
        {clue:"full of hope", correct:"HOPEFUL", wrong:["HOPEFULL","HOPEFULE"]},
        {clue:"without care", correct:"CARELESS", wrong:["CARELES","CARELISS"]},
        {clue:"in a quick way", correct:"QUICKLY", wrong:["QUICKLEY","QUICKILY"]}
      ]) },
      { id:"L14", name:"Spelling Drag: Suffix Rules", gen:()=>spellingDragLesson("Drag each word to its spelling rule.", [
        {left:"happier", right:"change y to i"},
        {left:"running", right:"double final consonant"},
        {left:"hopeful", right:"drop silent e"},
        {left:"careless", right:"add suffix"}
      ]) }
    ],
    g6:[
      { id:"L54", name:"Spelling: Homophones", gen:()=>spellingChoiceQuestion([
        {clue:"belongs to them", correct:"THEIR", wrong:["THERE","THEY'RE"]},
        {clue:"in that place", correct:"THERE", wrong:["THEIR","THEY'RE"]},
        {clue:"they are", correct:"THEY'RE", wrong:["THERE","THEIR"]}
      ]) },
      { id:"L55", name:"Spelling Drag: Homophones", gen:()=>spellingDragLesson("Drag each homophone to its meaning.", [
        {left:"their", right:"belongs to them"},
        {left:"there", right:"in that place"},
        {left:"they're", right:"they are"},
        {left:"your", right:"belongs to you"}
      ]) }
    ],
    g7:[
      { id:"L11", name:"Spelling: Academic Words", gen:()=>spellingChoiceQuestion([
        {clue:"study closely", correct:"ANALYZE", wrong:["ANALIZE","ANALYSE"]},
        {clue:"proof", correct:"EVIDENCE", wrong:["EVIDENSE","EVIDANCE"]},
        {clue:"a final decision", correct:"CONCLUSION", wrong:["CONCLUTION","CONCLUSHION"]}
      ]) },
      { id:"L12", name:"Spelling Drag: Word Parts", gen:()=>spellingDragLesson("Drag each academic word to its clue.", [
        {left:"analysis", right:"careful study"},
        {left:"evidence", right:"proof"},
        {left:"conclusion", right:"ending idea"},
        {left:"context", right:"surrounding information"}
      ]) }
    ],
    g8:[
      { id:"L11", name:"Spelling: Argument Words", gen:()=>spellingChoiceQuestion([
        {clue:"a point to prove", correct:"CLAIM", wrong:["CLAME","CLAYM"]},
        {clue:"a different view", correct:"OPPOSING", wrong:["OPOSEING","OPPOSENG"]},
        {clue:"trustworthy", correct:"CREDIBLE", wrong:["CREDITABLE","CREDIBAL"]}
      ]) },
      { id:"L12", name:"Spelling Drag: Argument Terms", gen:()=>spellingDragLesson("Drag each argument word to its meaning.", [
        {left:"claim", right:"point to prove"},
        {left:"evidence", right:"supporting proof"},
        {left:"credible", right:"trustworthy"},
        {left:"opposing", right:"against"}
      ]) }
    ],
    g9:[
      { id:"L11", name:"Spelling: Literary Terms", gen:()=>spellingChoiceQuestion([
        {clue:"a comparison using like or as", correct:"SIMILE", wrong:["SIMILIE","SIMALY"]},
        {clue:"a repeated sound", correct:"ALLITERATION", wrong:["ALITERATION","ALLITIRATION"]},
        {clue:"word choice", correct:"DICTION", wrong:["DICTIAN","DICKTION"]}
      ]) },
      { id:"L12", name:"Spelling Drag: Literary Terms", gen:()=>spellingDragLesson("Drag each literary term to its clue.", [
        {left:"simile", right:"like or as comparison"},
        {left:"metaphor", right:"direct comparison"},
        {left:"diction", right:"word choice"},
        {left:"alliteration", right:"repeated beginning sound"}
      ]) }
    ],
    g10:[
      { id:"L11", name:"Spelling: Rhetoric Words", gen:()=>spellingChoiceQuestion([
        {clue:"logical appeal", correct:"LOGOS", wrong:["LOGUS","LOGOSE"]},
        {clue:"credibility appeal", correct:"ETHOS", wrong:["EATHOS","ETHUS"]},
        {clue:"emotional appeal", correct:"PATHOS", wrong:["PATHUS","PATHOSE"]}
      ]) },
      { id:"L12", name:"Spelling Drag: Rhetoric Words", gen:()=>spellingDragLesson("Drag each rhetoric word to its meaning.", [
        {left:"ethos", right:"credibility"},
        {left:"logos", right:"logic"},
        {left:"pathos", right:"emotion"},
        {left:"rhetoric", right:"persuasive language"}
      ]) }
    ]
  };

  Object.entries(spellingSets).forEach(([grade, lessons])=>{
    const english = CURR[grade]?.eng;
    if(!english) return;
    lessons.forEach(lesson=>{
      english[lesson.id] = { name:lesson.name, gen:lesson.gen };
    });
  });
}
