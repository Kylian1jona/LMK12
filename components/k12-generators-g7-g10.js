/* K12 grade 7-10 lesson generators
   Split from components/k12-lessons.js. Keep loaded as a classic script.
*/

function gen_g7_eng_L1(){
  const it = pick([
    {q:"What is the theme of a story?", a:"The lesson or message", w:["The setting only","The title","Setting only"]},
    {q:"Which theme best fits a story about never giving up?", a:"Perseverance", w:["Weather","Transportation","Setting only"]},
    {q:"Central idea means...", a:"The main point of a text", w:["A tiny detail","A character name","Unrelated meaning"]},
    {q:"What is the theme of a story?", a:"The lesson or message", w:["The setting only","The title","Setting only"]},
    {q:"Which theme best fits a story about never giving up?", a:"Perseverance", w:["Weather","Transportation","Setting only"]},
    {q:"Central idea means...", a:"The main point of a text", w:["A tiny detail","A character name","Unrelated meaning"]},
    {q:"What is the theme of a story?", a:"The lesson or message", w:["The setting only","The title","Setting only"]},
    {q:"Which theme best fits a story about never giving up?", a:"Perseverance", w:["Weather","Transportation","Setting only"]},
    {q:"Central idea means...", a:"The main point of a text", w:["A tiny detail","A character name","Unrelated meaning"]},
    {q:"What is the theme of a story?", a:"The lesson or message", w:["The setting only","The title","Setting only"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Theme and central idea.");
}

function gen_g7_eng_L2(){
  const it = pick([
    {q:"Which is text evidence?", a:"A quote from the passage", w:["A random guess","A personal opinion only","Personal opinion"]},
    {q:"Good text evidence should...", a:"Support your answer", w:["Be unrelated","Ignore the question","Personal opinion"]},
    {q:"Which phrase introduces evidence?", a:"According to the text", w:["I feel like","Maybe","Personal opinion"]},
    {q:"Which is text evidence?", a:"A quote from the passage", w:["A random guess","A personal opinion only","Personal opinion"]},
    {q:"Good text evidence should...", a:"Support your answer", w:["Be unrelated","Ignore the question","Personal opinion"]},
    {q:"Which phrase introduces evidence?", a:"According to the text", w:["I feel like","Maybe","Personal opinion"]},
    {q:"Which is text evidence?", a:"A quote from the passage", w:["A random guess","A personal opinion only","Personal opinion"]},
    {q:"Good text evidence should...", a:"Support your answer", w:["Be unrelated","Ignore the question","Personal opinion"]},
    {q:"Which phrase introduces evidence?", a:"According to the text", w:["I feel like","Maybe","Personal opinion"]},
    {q:"Which is text evidence?", a:"A quote from the passage", w:["A random guess","A personal opinion only","Personal opinion"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Text evidence.");
}

function gen_g7_eng_L3(){
  const it = pick([
    {q:"Author's purpose means...", a:"Why the author wrote the text", w:["Where the book was printed","How long the book is","Unrelated meaning"]},
    {q:"A text that gives facts is usually written to...", a:"Inform", w:["Hide","Confuse","Cover color"]},
    {q:"A story written for fun is usually meant to...", a:"Entertain", w:["Measure","Subtract","Cover color"]},
    {q:"Author's purpose means...", a:"Why the author wrote the text", w:["Where the book was printed","How long the book is","Unrelated meaning"]},
    {q:"A text that gives facts is usually written to...", a:"Inform", w:["Hide","Confuse","Cover color"]},
    {q:"A story written for fun is usually meant to...", a:"Entertain", w:["Measure","Subtract","Cover color"]},
    {q:"Author's purpose means...", a:"Why the author wrote the text", w:["Where the book was printed","How long the book is","Unrelated meaning"]},
    {q:"A text that gives facts is usually written to...", a:"Inform", w:["Hide","Confuse","Cover color"]},
    {q:"A story written for fun is usually meant to...", a:"Entertain", w:["Measure","Subtract","Cover color"]},
    {q:"Author's purpose means...", a:"Why the author wrote the text", w:["Where the book was printed","How long the book is","Unrelated meaning"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Author's purpose.");
}

function gen_g7_eng_L4(){
  return matchQuestion([
    {left:"quickly", right:"Adverb"},
    {left:"beautiful", right:"Adjective"},
    {left:"teacher", right:"Noun"},
    {left:"running", right:"Verb"}
  ]);
}

function gen_g7_eng_L5(){
  const it = pick([
    {q:"The word 'fragile' most nearly means...", a:"Easily broken", w:["Very loud","Extremely fast","Unrelated meaning"]},
    {q:"The word 'ancient' most nearly means...", a:"Very old", w:["Very new","Very small","Unrelated meaning"]},
    {q:"The word 'reluctant' means...", a:"Unwilling", w:["Excited","Invisible","Unrelated meaning"]},
    {q:"The word 'fragile' most nearly means...", a:"Easily broken", w:["Very loud","Extremely fast","Unrelated meaning"]},
    {q:"The word 'ancient' most nearly means...", a:"Very old", w:["Very new","Very small","Unrelated meaning"]},
    {q:"The word 'reluctant' means...", a:"Unwilling", w:["Excited","Invisible","Unrelated meaning"]},
    {q:"The word 'fragile' most nearly means...", a:"Easily broken", w:["Very loud","Extremely fast","Unrelated meaning"]},
    {q:"The word 'ancient' most nearly means...", a:"Very old", w:["Very new","Very small","Unrelated meaning"]},
    {q:"The word 'reluctant' means...", a:"Unwilling", w:["Excited","Invisible","Unrelated meaning"]},
    {q:"The word 'fragile' most nearly means...", a:"Easily broken", w:["Very loud","Extremely fast","Unrelated meaning"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Vocabulary in context.");
}

function gen_g7_eng_L6(){
  const it = pick([
    {q:"Which is a complete sentence?", a:"The dog barked loudly.", w:["Because the dog","Running fast","Adverb"]},
    {q:"A compound sentence joins...", a:"Two complete thoughts", w:["Two letters","Two numbers","Adverb"]},
    {q:"Which word can join two complete sentences?", a:"And", w:["Purple","Quickly","Adverb"]},
    {q:"Which is a complete sentence?", a:"The dog barked loudly.", w:["Because the dog","Running fast","Adverb"]},
    {q:"A compound sentence joins...", a:"Two complete thoughts", w:["Two letters","Two numbers","Adverb"]},
    {q:"Which word can join two complete sentences?", a:"And", w:["Purple","Quickly","Adverb"]},
    {q:"Which is a complete sentence?", a:"The dog barked loudly.", w:["Because the dog","Running fast","Adverb"]},
    {q:"A compound sentence joins...", a:"Two complete thoughts", w:["Two letters","Two numbers","Adverb"]},
    {q:"Which word can join two complete sentences?", a:"And", w:["Purple","Quickly","Adverb"]},
    {q:"Which is a complete sentence?", a:"The dog barked loudly.", w:["Because the dog","Running fast","Adverb"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Sentence structure.");
}

function gen_g7_eng_L7(){
  const it = pick([
    {q:"The author's main ___ was to inform readers.", a:"purpose"},
    {q:"The ___ of the story is to be honest.", a:"theme"},
    {q:"Use text ___ to support your answer.", a:"evidence"},
    {q:"The author's main ___ was to inform readers.", a:"purpose"},
    {q:"The ___ of the story is to be honest.", a:"theme"},
    {q:"Use text ___ to support your answer.", a:"evidence"},
    {q:"The author's main ___ was to inform readers.", a:"purpose"},
    {q:"The ___ of the story is to be honest.", a:"theme"},
    {q:"Use text ___ to support your answer.", a:"evidence"},
    {q:"The author's main ___ was to inform readers.", a:"purpose"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g7_eng_L8(){
  const it = pick([
    {bad:"the students found evidence in the passage.", good:"The students found evidence in the passage."},
    {bad:"the theme of the story is courage", good:"The theme of the story is courage."},
    {bad:"authors write to inform persuade or entertain", good:"Authors write to inform, persuade, or entertain."},
    {bad:"the students found evidence in the passage.", good:"The students found evidence in the passage."},
    {bad:"the theme of the story is courage", good:"The theme of the story is courage."},
    {bad:"authors write to inform persuade or entertain", good:"Authors write to inform, persuade, or entertain."},
    {bad:"the students found evidence in the passage.", good:"The students found evidence in the passage."},
    {bad:"the theme of the story is courage", good:"The theme of the story is courage."},
    {bad:"authors write to inform persuade or entertain", good:"Authors write to inform, persuade, or entertain."},
    {bad:"the students found evidence in the passage.", good:"The students found evidence in the passage."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g7_eng_L9(){
  return matchQuestion([
    {left:"Theme", right:"Message of a text"},
    {left:"Evidence", right:"Proof from the text"},
    {left:"Inform", right:"Give facts"},
    {left:"Purpose", right:"Reason for writing"}
  ]);
}

function gen_g7_eng_L10(){
  const it = pick([
    {q:"Theme means...", a:"Message", w:["Setting","Font","Unrelated meaning"]},
    {q:"Evidence means...", a:"Proof", w:["Guess","Title","Unrelated meaning"]},
    {q:"Purpose means...", a:"Reason", w:["Color","Page","Unrelated meaning"]},
    {q:"Theme means...", a:"Message", w:["Setting","Font","Unrelated meaning"]},
    {q:"Evidence means...", a:"Proof", w:["Guess","Title","Unrelated meaning"]},
    {q:"Purpose means...", a:"Reason", w:["Color","Page","Unrelated meaning"]},
    {q:"Theme means...", a:"Message", w:["Setting","Font","Unrelated meaning"]},
    {q:"Evidence means...", a:"Proof", w:["Guess","Title","Unrelated meaning"]},
    {q:"Purpose means...", a:"Reason", w:["Color","Page","Unrelated meaning"]},
    {q:"Theme means...", a:"Message", w:["Setting","Font","Unrelated meaning"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g7_math_L1(){
  const it = pick([
    {q:"-3 + 7 = ?", a:"4", w:["-10","10","5"]},
    {q:"-5 - 2 = ?", a:"-7", w:["7","3","13"]},
    {q:"8 + -12 = ?", a:"-4", w:["20","4","1"]},
    {q:"-3 + 7 = ?", a:"4", w:["-10","10","5"]},
    {q:"-5 - 2 = ?", a:"-7", w:["7","3","13"]},
    {q:"8 + -12 = ?", a:"-4", w:["20","4","1"]},
    {q:"-3 + 7 = ?", a:"4", w:["-10","10","5"]},
    {q:"-5 - 2 = ?", a:"-7", w:["7","3","13"]},
    {q:"8 + -12 = ?", a:"-4", w:["20","4","1"]},
    {q:"-3 + 7 = ?", a:"4", w:["-10","10","5"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Integer operations.");
}

function gen_g7_math_L2(){
  const it = pick([
    {q:"A ratio of 2:3 means...", a:"2 Compared to 3", w:["2 Plus 3 only","2 Divided by 0","Unrelated meaning"]},
    {q:"If 3 pencils cost $6, 1 pencil costs...", a:"$2", w:["$3","$6","Costs"]},
    {q:"Which is equivalent to 4:8?", a:"1:2", w:["2:1","8:4","1/2"]},
    {q:"A ratio of 2:3 means...", a:"2 Compared to 3", w:["2 Plus 3 only","2 Divided by 0","Unrelated meaning"]},
    {q:"If 3 pencils cost $6, 1 pencil costs...", a:"$2", w:["$3","$6","Costs"]},
    {q:"Which is equivalent to 4:8?", a:"1:2", w:["2:1","8:4","1/2"]},
    {q:"A ratio of 2:3 means...", a:"2 Compared to 3", w:["2 Plus 3 only","2 Divided by 0","Unrelated meaning"]},
    {q:"If 3 pencils cost $6, 1 pencil costs...", a:"$2", w:["$3","$6","Costs"]},
    {q:"Which is equivalent to 4:8?", a:"1:2", w:["2:1","8:4","1/2"]},
    {q:"A ratio of 2:3 means...", a:"2 Compared to 3", w:["2 Plus 3 only","2 Divided by 0","Unrelated meaning"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Ratios and rates.");
}

function gen_g7_math_L3(){
  const it = pick([
    {q:"Simplify: 3x + 2x", a:"5X", w:["6X","X","Simplify"]},
    {q:"Evaluate 2x when x = 5", a:"10", w:["7","25","11"]},
    {q:"Which is an expression?", a:"4X + 3", w:["X = 9","12 > 5","Variable"]},
    {q:"Simplify: 3x + 2x", a:"5X", w:["6X","X","Simplify"]},
    {q:"Evaluate 2x when x = 5", a:"10", w:["7","25","11"]},
    {q:"Which is an expression?", a:"4X + 3", w:["X = 9","12 > 5","Variable"]},
    {q:"Simplify: 3x + 2x", a:"5X", w:["6X","X","Simplify"]},
    {q:"Evaluate 2x when x = 5", a:"10", w:["7","25","11"]},
    {q:"Which is an expression?", a:"4X + 3", w:["X = 9","12 > 5","Variable"]},
    {q:"Simplify: 3x + 2x", a:"5X", w:["6X","X","Simplify"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Expressions.");
}

function gen_g7_math_L4(){
  const it = pick([
    {q:"x + 5 = 12. x = ?", a:"7", w:["17","5","8"]},
    {q:"x - 3 = 9. x = ?", a:"12", w:["6","27","13"]},
    {q:"4x = 20. x = ?", a:"5", w:["16","24","6"]},
    {q:"x + 5 = 12. x = ?", a:"7", w:["17","5","8"]},
    {q:"x - 3 = 9. x = ?", a:"12", w:["6","27","13"]},
    {q:"4x = 20. x = ?", a:"5", w:["16","24","6"]},
    {q:"x + 5 = 12. x = ?", a:"7", w:["17","5","8"]},
    {q:"x - 3 = 9. x = ?", a:"12", w:["6","27","13"]},
    {q:"4x = 20. x = ?", a:"5", w:["16","24","6"]},
    {q:"x + 5 = 12. x = ?", a:"7", w:["17","5","8"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "One-step equations.");
}

function gen_g7_math_L5(){
  const it = pick([
    {q:"A number plus 8 is 20. What is the number?", a:"12", w:["28","8","13"]},
    {q:"You owe $5 and earn $9. What is your balance?", a:"$4", w:["-$14","-$4","Balance"]},
    {q:"A recipe uses 2 cups for 4 people. For 8 people?", a:"4 Cups", w:["2 Cups","8 Cups","Cups"]},
    {q:"A number plus 8 is 20. What is the number?", a:"12", w:["28","8","13"]},
    {q:"You owe $5 and earn $9. What is your balance?", a:"$4", w:["-$14","-$4","Balance"]},
    {q:"A recipe uses 2 cups for 4 people. For 8 people?", a:"4 Cups", w:["2 Cups","8 Cups","Cups"]},
    {q:"A number plus 8 is 20. What is the number?", a:"12", w:["28","8","13"]},
    {q:"You owe $5 and earn $9. What is your balance?", a:"$4", w:["-$14","-$4","Balance"]},
    {q:"A recipe uses 2 cups for 4 people. For 8 people?", a:"4 Cups", w:["2 Cups","8 Cups","Cups"]},
    {q:"A number plus 8 is 20. What is the number?", a:"12", w:["28","8","13"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Real-world math.");
}

function gen_g7_math_L6(){
  return matchQuestion([
    {left:"-4 + 10", right:"6"},
    {left:"3x when x = 4", right:"12"},
    {left:"6:12 simplified", right:"1:2"},
    {left:"x + 5 = 12", right:"x = 7"}
  ]);
}

function gen_g7_math_L7(){
  const it = pick([
    {q:"x + 2 = 9", a:"7", w:["11","18","8"]},
    {q:"-6 + 4", a:"-2", w:["10","2","0"]},
    {q:"5x = 25", a:"5", w:["20","30","6"]},
    {q:"x + 2 = 9", a:"7", w:["11","18","8"]},
    {q:"-6 + 4", a:"-2", w:["10","2","0"]},
    {q:"5x = 25", a:"5", w:["20","30","6"]},
    {q:"x + 2 = 9", a:"7", w:["11","18","8"]},
    {q:"-6 + 4", a:"-2", w:["10","2","0"]},
    {q:"5x = 25", a:"5", w:["20","30","6"]},
    {q:"x + 2 = 9", a:"7", w:["11","18","8"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g7_sci_L1(){
  const it = pick([
    {q:"The basic unit of life is the...", a:"Cell", w:["Rock","Cloud","Climate"]},
    {q:"The nucleus controls many cell activities.", a:"True", w:["False","Maybe","Organ system"]},
    {q:"Plant cells have...", a:"Cell walls", w:["No structures","Only bones","Roots"]},
    {q:"The basic unit of life is the...", a:"Cell", w:["Rock","Cloud","Climate"]},
    {q:"The nucleus controls many cell activities.", a:"True", w:["False","Maybe","Organ system"]},
    {q:"Plant cells have...", a:"Cell walls", w:["No structures","Only bones","Roots"]},
    {q:"The basic unit of life is the...", a:"Cell", w:["Rock","Cloud","Climate"]},
    {q:"The nucleus controls many cell activities.", a:"True", w:["False","Maybe","Organ system"]},
    {q:"Plant cells have...", a:"Cell walls", w:["No structures","Only bones","Roots"]},
    {q:"The basic unit of life is the...", a:"Cell", w:["Rock","Cloud","Climate"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Cells.");
}

function gen_g7_sci_L2(){
  const it = pick([
    {q:"The heart belongs to the...", a:"Circulatory system", w:["Digestive system","Solar system","Roots"]},
    {q:"The lungs help with...", a:"Respiration", w:["Digestion","Photosynthesis","Roots"]},
    {q:"The stomach helps break down...", a:"Food", w:["Light","Sound","Plain"]},
    {q:"The heart belongs to the...", a:"Circulatory system", w:["Digestive system","Solar system","Roots"]},
    {q:"The lungs help with...", a:"Respiration", w:["Digestion","Photosynthesis","Roots"]},
    {q:"The stomach helps break down...", a:"Food", w:["Light","Sound","Plain"]},
    {q:"The heart belongs to the...", a:"Circulatory system", w:["Digestive system","Solar system","Roots"]},
    {q:"The lungs help with...", a:"Respiration", w:["Digestion","Photosynthesis","Roots"]},
    {q:"The stomach helps break down...", a:"Food", w:["Light","Sound","Plain"]},
    {q:"The heart belongs to the...", a:"Circulatory system", w:["Digestive system","Solar system","Roots"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Body systems.");
}

function gen_g7_sci_L3(){
  const it = pick([
    {q:"A producer makes its own food. Example:", a:"Grass", w:["Lion","Mushroom","Example"]},
    {q:"A consumer gets energy by...", a:"Eating organisms", w:["Making sunlight","Turning into soil","Roots"]},
    {q:"Decomposers break down...", a:"Dead material", w:["New stars","Plastic toys only","Topic detail"]},
    {q:"A producer makes its own food. Example:", a:"Grass", w:["Lion","Mushroom","Example"]},
    {q:"A consumer gets energy by...", a:"Eating organisms", w:["Making sunlight","Turning into soil","Roots"]},
    {q:"Decomposers break down...", a:"Dead material", w:["New stars","Plastic toys only","Topic detail"]},
    {q:"A producer makes its own food. Example:", a:"Grass", w:["Lion","Mushroom","Example"]},
    {q:"A consumer gets energy by...", a:"Eating organisms", w:["Making sunlight","Turning into soil","Roots"]},
    {q:"Decomposers break down...", a:"Dead material", w:["New stars","Plastic toys only","Topic detail"]},
    {q:"A producer makes its own food. Example:", a:"Grass", w:["Lion","Mushroom","Example"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Ecosystems.");
}

function gen_g7_sci_L4(){
  const it = pick([
    {q:"Force is a push or a...", a:"Pull", w:["Color","Sound","Plain"]},
    {q:"Gravity pulls objects...", a:"Toward each other", w:["Into music","Away from mass always","Gravity"]},
    {q:"More mass usually means more...", a:"Inertia", w:["Brightness","Volume","Unrelated meaning"]},
    {q:"Force is a push or a...", a:"Pull", w:["Color","Sound","Plain"]},
    {q:"Gravity pulls objects...", a:"Toward each other", w:["Into music","Away from mass always","Gravity"]},
    {q:"More mass usually means more...", a:"Inertia", w:["Brightness","Volume","Unrelated meaning"]},
    {q:"Force is a push or a...", a:"Pull", w:["Color","Sound","Plain"]},
    {q:"Gravity pulls objects...", a:"Toward each other", w:["Into music","Away from mass always","Gravity"]},
    {q:"More mass usually means more...", a:"Inertia", w:["Brightness","Volume","Unrelated meaning"]},
    {q:"Force is a push or a...", a:"Pull", w:["Color","Sound","Plain"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Forces.");
}

function gen_g8_eng_L1(){
  const it = pick([
    {q:"Central idea means...", a:"The main point of a text", w:["A tiny example","The page number","Unrelated meaning"]},
    {q:"Which detail best supports a central idea?", a:"A fact that explains the main point", w:["A random sentence","A character's shoe color only","Adverb"]},
    {q:"The central idea should connect to...", a:"Most details in the text", w:["Only one unrelated word","The font size","Small detail"]},
    {q:"Central idea means...", a:"The main point of a text", w:["A tiny example","The page number","Unrelated meaning"]},
    {q:"Which detail best supports a central idea?", a:"A fact that explains the main point", w:["A random sentence","A character's shoe color only","Adverb"]},
    {q:"The central idea should connect to...", a:"Most details in the text", w:["Only one unrelated word","The font size","Small detail"]},
    {q:"Central idea means...", a:"The main point of a text", w:["A tiny example","The page number","Unrelated meaning"]},
    {q:"Which detail best supports a central idea?", a:"A fact that explains the main point", w:["A random sentence","A character's shoe color only","Adverb"]},
    {q:"The central idea should connect to...", a:"Most details in the text", w:["Only one unrelated word","The font size","Small detail"]},
    {q:"Central idea means...", a:"The main point of a text", w:["A tiny example","The page number","Unrelated meaning"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Central idea.");
}

function gen_g8_eng_L2(){
  const it = pick([
    {q:"Text structure means...", a:"How information is organized", w:["How many pages there are","The author's name","Unrelated meaning"]},
    {q:"Cause and effect explains...", a:"Why something happened and what resulted", w:["Only where something happened","Only a list of names","Compare and contrast"]},
    {q:"Compare and contrast shows...", a:"Similarities and differences", w:["Only dates","Only definitions","Unrelated meaning"]},
    {q:"Text structure means...", a:"How information is organized", w:["How many pages there are","The author's name","Unrelated meaning"]},
    {q:"Cause and effect explains...", a:"Why something happened and what resulted", w:["Only where something happened","Only a list of names","Compare and contrast"]},
    {q:"Compare and contrast shows...", a:"Similarities and differences", w:["Only dates","Only definitions","Unrelated meaning"]},
    {q:"Text structure means...", a:"How information is organized", w:["How many pages there are","The author's name","Unrelated meaning"]},
    {q:"Cause and effect explains...", a:"Why something happened and what resulted", w:["Only where something happened","Only a list of names","Compare and contrast"]},
    {q:"Compare and contrast shows...", a:"Similarities and differences", w:["Only dates","Only definitions","Unrelated meaning"]},
    {q:"Text structure means...", a:"How information is organized", w:["How many pages there are","The author's name","Unrelated meaning"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Text structure.");
}

function gen_g8_eng_L3(){
  const it = pick([
    {q:"A claim is...", a:"A statement the writer tries to prove", w:["A random fact with no point","The last word in a sentence","Adverb"]},
    {q:"Strong evidence should be...", a:"Relevant and specific", w:["Unrelated and confusing","Only an opinion","Personal opinion"]},
    {q:"An argument needs a claim and...", a:"Evidence", w:["A drawing only","A title only","Personal opinion"]},
    {q:"A claim is...", a:"A statement the writer tries to prove", w:["A random fact with no point","The last word in a sentence","Adverb"]},
    {q:"Strong evidence should be...", a:"Relevant and specific", w:["Unrelated and confusing","Only an opinion","Personal opinion"]},
    {q:"An argument needs a claim and...", a:"Evidence", w:["A drawing only","A title only","Personal opinion"]},
    {q:"A claim is...", a:"A statement the writer tries to prove", w:["A random fact with no point","The last word in a sentence","Adverb"]},
    {q:"Strong evidence should be...", a:"Relevant and specific", w:["Unrelated and confusing","Only an opinion","Personal opinion"]},
    {q:"An argument needs a claim and...", a:"Evidence", w:["A drawing only","A title only","Personal opinion"]},
    {q:"A claim is...", a:"A statement the writer tries to prove", w:["A random fact with no point","The last word in a sentence","Adverb"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Claims and evidence.");
}

function gen_g8_eng_L4(){
  return matchQuestion([
    {left:"analysis", right:"Noun"},
    {left:"argue", right:"Verb"},
    {left:"carefully", right:"Adverb"},
    {left:"powerful", right:"Adjective"}
  ]);
}

function gen_g8_eng_L5(){
  const it = pick([
    {q:"Tone means...", a:"The author's attitude", w:["The number of paragraphs","The setting only","Unrelated meaning"]},
    {q:"Mood means...", a:"The feeling created for the reader", w:["The author's address","The page count","Unrelated meaning"]},
    {q:"Words like gloomy and dark often create a ___ mood.", a:"Sad", w:["Funny","Excited","Mood"]},
    {q:"Tone means...", a:"The author's attitude", w:["The number of paragraphs","The setting only","Unrelated meaning"]},
    {q:"Mood means...", a:"The feeling created for the reader", w:["The author's address","The page count","Unrelated meaning"]},
    {q:"Words like gloomy and dark often create a ___ mood.", a:"Sad", w:["Funny","Excited","Mood"]},
    {q:"Tone means...", a:"The author's attitude", w:["The number of paragraphs","The setting only","Unrelated meaning"]},
    {q:"Mood means...", a:"The feeling created for the reader", w:["The author's address","The page count","Unrelated meaning"]},
    {q:"Words like gloomy and dark often create a ___ mood.", a:"Sad", w:["Funny","Excited","Mood"]},
    {q:"Tone means...", a:"The author's attitude", w:["The number of paragraphs","The setting only","Unrelated meaning"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Tone and mood.");
}

function gen_g8_eng_L6(){
  const it = pick([
    {q:"The word 'analyze' most nearly means...", a:"Study carefully", w:["Throw away","Copy quickly","Unrelated meaning"]},
    {q:"The word 'contrast' means...", a:"Show differences", w:["Make louder","Hide facts","Unrelated meaning"]},
    {q:"The word 'significant' means...", a:"Important", w:["Tiny","Unknown","Unrelated meaning"]},
    {q:"The word 'analyze' most nearly means...", a:"Study carefully", w:["Throw away","Copy quickly","Unrelated meaning"]},
    {q:"The word 'contrast' means...", a:"Show differences", w:["Make louder","Hide facts","Unrelated meaning"]},
    {q:"The word 'significant' means...", a:"Important", w:["Tiny","Unknown","Unrelated meaning"]},
    {q:"The word 'analyze' most nearly means...", a:"Study carefully", w:["Throw away","Copy quickly","Unrelated meaning"]},
    {q:"The word 'contrast' means...", a:"Show differences", w:["Make louder","Hide facts","Unrelated meaning"]},
    {q:"The word 'significant' means...", a:"Important", w:["Tiny","Unknown","Unrelated meaning"]},
    {q:"The word 'analyze' most nearly means...", a:"Study carefully", w:["Throw away","Copy quickly","Unrelated meaning"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Academic vocabulary.");
}

function gen_g8_eng_L7(){
  const it = pick([
    {q:"The writer's ___ is the point they try to prove.", a:"claim"},
    {q:"Cause and ___ explains why something happened and what resulted.", a:"effect"},
    {q:"The author's ___ shows their attitude toward the topic.", a:"tone"},
    {q:"The writer's ___ is the point they try to prove.", a:"claim"},
    {q:"Cause and ___ explains why something happened and what resulted.", a:"effect"},
    {q:"The author's ___ shows their attitude toward the topic.", a:"tone"},
    {q:"The writer's ___ is the point they try to prove.", a:"claim"},
    {q:"Cause and ___ explains why something happened and what resulted.", a:"effect"},
    {q:"The author's ___ shows their attitude toward the topic.", a:"tone"},
    {q:"The writer's ___ is the point they try to prove.", a:"claim"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g8_eng_L8(){
  const it = pick([
    {bad:"the author uses evidence to support the claim.", good:"The author uses evidence to support the claim."},
    {bad:"tone is the authors attitude", good:"Tone is the author's attitude."},
    {bad:"compare and contrast shows similarities and differences", good:"Compare and contrast shows similarities and differences."},
    {bad:"the author uses evidence to support the claim.", good:"The author uses evidence to support the claim."},
    {bad:"tone is the authors attitude", good:"Tone is the author's attitude."},
    {bad:"compare and contrast shows similarities and differences", good:"Compare and contrast shows similarities and differences."},
    {bad:"the author uses evidence to support the claim.", good:"The author uses evidence to support the claim."},
    {bad:"tone is the authors attitude", good:"Tone is the author's attitude."},
    {bad:"compare and contrast shows similarities and differences", good:"Compare and contrast shows similarities and differences."},
    {bad:"the author uses evidence to support the claim.", good:"The author uses evidence to support the claim."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g8_eng_L9(){
  return matchQuestion([
    {left:"Claim", right:"Point to prove"},
    {left:"Tone", right:"Author's attitude"},
    {left:"Text structure", right:"Organization of information"},
    {left:"Evidence", right:"Proof"}
  ]);
}

function gen_g8_eng_L10(){
  const it = pick([
    {q:"Claim means...", a:"Point", w:["Guess","Font","Unrelated meaning"]},
    {q:"Tone means...", a:"Attitude", w:["Number","Planet","Unrelated meaning"]},
    {q:"Evidence means...", a:"Proof", w:["Weather","Shape","Unrelated meaning"]},
    {q:"Claim means...", a:"Point", w:["Guess","Font","Unrelated meaning"]},
    {q:"Tone means...", a:"Attitude", w:["Number","Planet","Unrelated meaning"]},
    {q:"Evidence means...", a:"Proof", w:["Weather","Shape","Unrelated meaning"]},
    {q:"Claim means...", a:"Point", w:["Guess","Font","Unrelated meaning"]},
    {q:"Tone means...", a:"Attitude", w:["Number","Planet","Unrelated meaning"]},
    {q:"Evidence means...", a:"Proof", w:["Weather","Shape","Unrelated meaning"]},
    {q:"Claim means...", a:"Point", w:["Guess","Font","Unrelated meaning"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}
function gen_g8_math_L1(){
  const it = pick([
    {q:"Solve: x + 4 = 12", a:"8", w:["16","3","9"]},
    {q:"Solve: 2x = 18", a:"9", w:["20","16","10"]},
    {q:"Solve: x - 7 = 5", a:"12", w:["2","35","13"]},
    {q:"Solve: x + 4 = 12", a:"8", w:["16","3","9"]},
    {q:"Solve: 2x = 18", a:"9", w:["20","16","10"]},
    {q:"Solve: x - 7 = 5", a:"12", w:["2","35","13"]},
    {q:"Solve: x + 4 = 12", a:"8", w:["16","3","9"]},
    {q:"Solve: 2x = 18", a:"9", w:["20","16","10"]},
    {q:"Solve: x - 7 = 5", a:"12", w:["2","35","13"]},
    {q:"Solve: x + 4 = 12", a:"8", w:["16","3","9"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Linear equations.");
}

function gen_g8_math_L2(){
  const it = pick([
    {q:"Slope means...", a:"Rate of change", w:["Total area","A random point","Unrelated meaning"]},
    {q:"In y = 3x + 2, the slope is...", a:"3", w:["2","5","4"]},
    {q:"A positive slope goes...", a:"Up from left to right", w:["Down from left to right","Straight down only","Variable"]},
    {q:"Slope means...", a:"Rate of change", w:["Total area","A random point","Unrelated meaning"]},
    {q:"In y = 3x + 2, the slope is...", a:"3", w:["2","5","4"]},
    {q:"A positive slope goes...", a:"Up from left to right", w:["Down from left to right","Straight down only","Variable"]},
    {q:"Slope means...", a:"Rate of change", w:["Total area","A random point","Unrelated meaning"]},
    {q:"In y = 3x + 2, the slope is...", a:"3", w:["2","5","4"]},
    {q:"A positive slope goes...", a:"Up from left to right", w:["Down from left to right","Straight down only","Variable"]},
    {q:"Slope means...", a:"Rate of change", w:["Total area","A random point","Unrelated meaning"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Slope.");
}

function gen_g8_math_L3(){
  const it = pick([
    {q:"A function has...", a:"One output for each input", w:["Many random outputs for one input","No pattern ever","Ever"]},
    {q:"If f(x)=x+2, f(3) = ?", a:"5", w:["6","1","4"]},
    {q:"Input-output tables show...", a:"Relationships", w:["Only spelling","Only weather","Climate"]},
    {q:"A function has...", a:"One output for each input", w:["Many random outputs for one input","No pattern ever","Ever"]},
    {q:"If f(x)=x+2, f(3) = ?", a:"5", w:["6","1","4"]},
    {q:"Input-output tables show...", a:"Relationships", w:["Only spelling","Only weather","Climate"]},
    {q:"A function has...", a:"One output for each input", w:["Many random outputs for one input","No pattern ever","Ever"]},
    {q:"If f(x)=x+2, f(3) = ?", a:"5", w:["6","1","4"]},
    {q:"Input-output tables show...", a:"Relationships", w:["Only spelling","Only weather","Climate"]},
    {q:"A function has...", a:"One output for each input", w:["Many random outputs for one input","No pattern ever","Ever"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Functions.");
}

function gen_g8_math_L4(){
  return matchQuestion([
    {left:"3²", right:"9"},
    {left:"4²", right:"16"},
    {left:"5²", right:"25"},
    {left:"10²", right:"100"}
  ]);
}

function gen_g8_math_L5(){
  const it = pick([
    {q:"Pythagorean Theorem is...", a:"A² + b² = c²", w:["A + b = c","Ab = c","Theorem"]},
    {q:"The longest side of a right triangle is the...", a:"Hypotenuse", w:["Radius","Diameter","Area"]},
    {q:"If the legs are 3 and 4, the hypotenuse is...", a:"5", w:["6","7","4"]},
    {q:"Pythagorean Theorem is...", a:"A² + b² = c²", w:["A + b = c","Ab = c","Theorem"]},
    {q:"The longest side of a right triangle is the...", a:"Hypotenuse", w:["Radius","Diameter","Area"]},
    {q:"If the legs are 3 and 4, the hypotenuse is...", a:"5", w:["6","7","4"]},
    {q:"Pythagorean Theorem is...", a:"A² + b² = c²", w:["A + b = c","Ab = c","Theorem"]},
    {q:"The longest side of a right triangle is the...", a:"Hypotenuse", w:["Radius","Diameter","Area"]},
    {q:"If the legs are 3 and 4, the hypotenuse is...", a:"5", w:["6","7","4"]},
    {q:"Pythagorean Theorem is...", a:"A² + b² = c²", w:["A + b = c","Ab = c","Theorem"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Pythagorean Theorem.");
}

function gen_g8_math_L6(){
  const it = pick([
    {q:"Scientific notation uses powers of...", a:"10"},
    {q:"1,000 = 1 × 10___", a:"3"},
    {q:"5 × 10² = ___", a:"500"},
    {q:"Scientific notation uses powers of...", a:"10"},
    {q:"1,000 = 1 × 10___", a:"3"},
    {q:"5 × 10² = ___", a:"500"},
    {q:"Scientific notation uses powers of...", a:"10"},
    {q:"1,000 = 1 × 10___", a:"3"},
    {q:"5 × 10² = ___", a:"500"},
    {q:"Scientific notation uses powers of...", a:"10"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g8_math_L7(){
  const it = pick([
    {bad:"the slope of y = 2x + 1 is 2", good:"The slope of y = 2x + 1 is 2."},
    {bad:"functions have one output for each input", good:"Functions have one output for each input."},
    {bad:"the hypotenuse is the longest side", good:"The hypotenuse is the longest side."},
    {bad:"the slope of y = 2x + 1 is 2", good:"The slope of y = 2x + 1 is 2."},
    {bad:"functions have one output for each input", good:"Functions have one output for each input."},
    {bad:"the hypotenuse is the longest side", good:"The hypotenuse is the longest side."},
    {bad:"the slope of y = 2x + 1 is 2", good:"The slope of y = 2x + 1 is 2."},
    {bad:"functions have one output for each input", good:"Functions have one output for each input."},
    {bad:"the hypotenuse is the longest side", good:"The hypotenuse is the longest side."},
    {bad:"the slope of y = 2x + 1 is 2", good:"The slope of y = 2x + 1 is 2."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g8_math_L8(){
  return matchQuestion([
    {left:"Slope", right:"Rate of change"},
    {left:"Hypotenuse", right:"Longest side"},
    {left:"Function", right:"One output per input"},
    {left:"Scientific notation", right:"Powers of ten"}
  ]);
}

function gen_g8_math_L9(){
  const it = pick([
    {q:"Slope of y = 5x + 3", a:"5", w:["3","8","6"]},
    {q:"6²", a:"36", w:["12","18","37"]},
    {q:"2 × 10³", a:"2000", w:["200","20000","2001"]},
    {q:"Slope of y = 5x + 3", a:"5", w:["3","8","6"]},
    {q:"6²", a:"36", w:["12","18","37"]},
    {q:"2 × 10³", a:"2000", w:["200","20000","2001"]},
    {q:"Slope of y = 5x + 3", a:"5", w:["3","8","6"]},
    {q:"6²", a:"36", w:["12","18","37"]},
    {q:"2 × 10³", a:"2000", w:["200","20000","2001"]},
    {q:"Slope of y = 5x + 3", a:"5", w:["3","8","6"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g8_math_L10(){
  const it = pick([
    {q:"A graph with a constant rate of change is...", a:"Linear", w:["Quadratic","Circular","Area"]},
    {q:"A line with zero slope is...", a:"Horizontal", w:["Vertical","Diagonal","Area"]},
    {q:"A line with an undefined slope is...", a:"Vertical", w:["Horizontal","Curved","Area"]},
    {q:"A graph with a constant rate of change is...", a:"Linear", w:["Quadratic","Circular","Area"]},
    {q:"A line with zero slope is...", a:"Horizontal", w:["Vertical","Diagonal","Area"]},
    {q:"A line with an undefined slope is...", a:"Vertical", w:["Horizontal","Curved","Area"]},
    {q:"A graph with a constant rate of change is...", a:"Linear", w:["Quadratic","Circular","Area"]},
    {q:"A line with zero slope is...", a:"Horizontal", w:["Vertical","Diagonal","Area"]},
    {q:"A line with an undefined slope is...", a:"Vertical", w:["Horizontal","Curved","Area"]},
    {q:"A graph with a constant rate of change is...", a:"Linear", w:["Quadratic","Circular","Area"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Graphing.");
}

function gen_g8_sci_L1(){
  const it = pick([
    {q:"Atoms are made of...", a:"Protons, neutrons, and electrons", w:["Cells only","Rocks only","Climate"]},
    {q:"Protons have a ___ charge.", a:"Positive", w:["Negative","No","Charge"]},
    {q:"Electrons have a ___ charge.", a:"Negative", w:["Positive","No","Charge"]},
    {q:"Atoms are made of...", a:"Protons, neutrons, and electrons", w:["Cells only","Rocks only","Climate"]},
    {q:"Protons have a ___ charge.", a:"Positive", w:["Negative","No","Charge"]},
    {q:"Electrons have a ___ charge.", a:"Negative", w:["Positive","No","Charge"]},
    {q:"Atoms are made of...", a:"Protons, neutrons, and electrons", w:["Cells only","Rocks only","Climate"]},
    {q:"Protons have a ___ charge.", a:"Positive", w:["Negative","No","Charge"]},
    {q:"Electrons have a ___ charge.", a:"Negative", w:["Positive","No","Charge"]},
    {q:"Atoms are made of...", a:"Protons, neutrons, and electrons", w:["Cells only","Rocks only","Climate"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Atomic structure.");
}

function gen_g8_sci_L2(){
  const it = pick([
    {q:"A chemical reaction creates...", a:"New substances", w:["Only louder sound","Nothing different","Plain"]},
    {q:"Rust forming is an example of...", a:"Chemical change", w:["Physical change","Gravity","Friction"]},
    {q:"Signs of a chemical reaction include...", a:"Gas or color change", w:["No change","Only size change","Friction"]},
    {q:"A chemical reaction creates...", a:"New substances", w:["Only louder sound","Nothing different","Plain"]},
    {q:"Rust forming is an example of...", a:"Chemical change", w:["Physical change","Gravity","Friction"]},
    {q:"Signs of a chemical reaction include...", a:"Gas or color change", w:["No change","Only size change","Friction"]},
    {q:"A chemical reaction creates...", a:"New substances", w:["Only louder sound","Nothing different","Plain"]},
    {q:"Rust forming is an example of...", a:"Chemical change", w:["Physical change","Gravity","Friction"]},
    {q:"Signs of a chemical reaction include...", a:"Gas or color change", w:["No change","Only size change","Friction"]},
    {q:"A chemical reaction creates...", a:"New substances", w:["Only louder sound","Nothing different","Plain"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Chemical reactions.");
}

function gen_g8_sci_L3(){
  const it = pick([
    {q:"Genes are made of...", a:"DNA", w:["Water","Sunlight","Roots"]},
    {q:"Traits can be passed from...", a:"Parents to offspring", w:["Rocks to clouds","Tables to chairs","Climate"]},
    {q:"Genetics is the study of...", a:"Heredity", w:["Weather","Sound waves","Plain"]},
    {q:"Genes are made of...", a:"DNA", w:["Water","Sunlight","Roots"]},
    {q:"Traits can be passed from...", a:"Parents to offspring", w:["Rocks to clouds","Tables to chairs","Climate"]},
    {q:"Genetics is the study of...", a:"Heredity", w:["Weather","Sound waves","Plain"]},
    {q:"Genes are made of...", a:"DNA", w:["Water","Sunlight","Roots"]},
    {q:"Traits can be passed from...", a:"Parents to offspring", w:["Rocks to clouds","Tables to chairs","Climate"]},
    {q:"Genetics is the study of...", a:"Heredity", w:["Weather","Sound waves","Plain"]},
    {q:"Genes are made of...", a:"DNA", w:["Water","Sunlight","Roots"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Genetics.");
}

function gen_g8_sci_L4(){
  return matchQuestion([
    {left:"Proton", right:"Positive charge"},
    {left:"Electron", right:"Negative charge"},
    {left:"Neutron", right:"No charge"},
    {left:"Nucleus", right:"Center of atom"}
  ]);
}

function gen_g8_sci_L5(){
  const it = pick([
    {q:"Natural selection means organisms with helpful traits...", a:"Survive and reproduce", w:["Always disappear","Never change","Unrelated meaning"]},
    {q:"Adaptations help organisms...", a:"Survive", w:["Stop needing food","Make electricity","Gravity"]},
    {q:"Camouflage helps an animal...", a:"Blend into its environment", w:["Become a plant","Make light","Reptile"]},
    {q:"Natural selection means organisms with helpful traits...", a:"Survive and reproduce", w:["Always disappear","Never change","Unrelated meaning"]},
    {q:"Adaptations help organisms...", a:"Survive", w:["Stop needing food","Make electricity","Gravity"]},
    {q:"Camouflage helps an animal...", a:"Blend into its environment", w:["Become a plant","Make light","Reptile"]},
    {q:"Natural selection means organisms with helpful traits...", a:"Survive and reproduce", w:["Always disappear","Never change","Unrelated meaning"]},
    {q:"Adaptations help organisms...", a:"Survive", w:["Stop needing food","Make electricity","Gravity"]},
    {q:"Camouflage helps an animal...", a:"Blend into its environment", w:["Become a plant","Make light","Reptile"]},
    {q:"Natural selection means organisms with helpful traits...", a:"Survive and reproduce", w:["Always disappear","Never change","Unrelated meaning"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Evolution.");
}

function gen_g8_sci_L6(){
  const it = pick([
    {q:"The smallest unit of an element is an...", a:"atom"},
    {q:"DNA carries genetic ___.", a:"information"},
    {q:"A positive particle is a ___.", a:"proton"},
    {q:"The smallest unit of an element is an...", a:"atom"},
    {q:"DNA carries genetic ___.", a:"information"},
    {q:"A positive particle is a ___.", a:"proton"},
    {q:"The smallest unit of an element is an...", a:"atom"},
    {q:"DNA carries genetic ___.", a:"information"},
    {q:"A positive particle is a ___.", a:"proton"},
    {q:"The smallest unit of an element is an...", a:"atom"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g8_sci_L7(){
  const it = pick([
    {bad:"atoms contain protons neutrons and electrons", good:"Atoms contain protons, neutrons, and electrons."},
    {bad:"dna carries genetic information", good:"DNA carries genetic information."},
    {bad:"chemical reactions form new substances", good:"Chemical reactions form new substances."},
    {bad:"atoms contain protons neutrons and electrons", good:"Atoms contain protons, neutrons, and electrons."},
    {bad:"dna carries genetic information", good:"DNA carries genetic information."},
    {bad:"chemical reactions form new substances", good:"Chemical reactions form new substances."},
    {bad:"atoms contain protons neutrons and electrons", good:"Atoms contain protons, neutrons, and electrons."},
    {bad:"dna carries genetic information", good:"DNA carries genetic information."},
    {bad:"chemical reactions form new substances", good:"Chemical reactions form new substances."},
    {bad:"atoms contain protons neutrons and electrons", good:"Atoms contain protons, neutrons, and electrons."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g8_sci_L8(){
  return matchQuestion([
    {left:"DNA", right:"Genetic information"},
    {left:"Adaptation", right:"Helps survival"},
    {left:"Chemical reaction", right:"Forms new substances"},
    {left:"Atom", right:"Basic unit of matter"}
  ]);
}

function gen_g8_sci_L9(){
  const it = pick([
    {q:"Electron charge", a:"Negative", w:["Positive","Neutral","Charge"]},
    {q:"DNA carries...", a:"Genetic information", w:["Heat","Sound","Plain"]},
    {q:"Rusting is a...", a:"Chemical change", w:["Physical change","Phase change","Change"]},
    {q:"Electron charge", a:"Negative", w:["Positive","Neutral","Charge"]},
    {q:"DNA carries...", a:"Genetic information", w:["Heat","Sound","Plain"]},
    {q:"Rusting is a...", a:"Chemical change", w:["Physical change","Phase change","Change"]},
    {q:"Electron charge", a:"Negative", w:["Positive","Neutral","Charge"]},
    {q:"DNA carries...", a:"Genetic information", w:["Heat","Sound","Plain"]},
    {q:"Rusting is a...", a:"Chemical change", w:["Physical change","Phase change","Change"]},
    {q:"Electron charge", a:"Negative", w:["Positive","Neutral","Charge"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g8_sci_L10(){
  const it = pick([
    {q:"Matter is made of...", a:"Atoms", w:["Cells","Molecules only","Friction"]},
    {q:"The nucleus contains protons and...", a:"Neutrons", w:["Electrons","Ions","And"]},
    {q:"Inherited characteristics are called...", a:"Traits", w:["Mixtures","Molecules","Related example"]},
    {q:"Matter is made of...", a:"Atoms", w:["Cells","Molecules only","Friction"]},
    {q:"The nucleus contains protons and...", a:"Neutrons", w:["Electrons","Ions","And"]},
    {q:"Inherited characteristics are called...", a:"Traits", w:["Mixtures","Molecules","Related example"]},
    {q:"Matter is made of...", a:"Atoms", w:["Cells","Molecules only","Friction"]},
    {q:"The nucleus contains protons and...", a:"Neutrons", w:["Electrons","Ions","And"]},
    {q:"Inherited characteristics are called...", a:"Traits", w:["Mixtures","Molecules","Related example"]},
    {q:"Matter is made of...", a:"Atoms", w:["Cells","Molecules only","Friction"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Matter and heredity.");
}
function gen_g9_eng_L1(){
  const it = pick([
    {q:"Literary analysis means...", a:"Studying how a text creates meaning", w:["Counting the number of pages","Only naming the author","Unrelated meaning"]},
    {q:"A symbol in literature is...", a:"An object or idea with deeper meaning", w:["A spelling mistake","A random number","Median"]},
    {q:"Analyzing a character means studying...", a:"Traits, actions, and motives", w:["Only their name","Only the book cover","Unrelated meaning"]},
    {q:"Literary analysis means...", a:"Studying how a text creates meaning", w:["Counting the number of pages","Only naming the author","Unrelated meaning"]},
    {q:"A symbol in literature is...", a:"An object or idea with deeper meaning", w:["A spelling mistake","A random number","Median"]},
    {q:"Analyzing a character means studying...", a:"Traits, actions, and motives", w:["Only their name","Only the book cover","Unrelated meaning"]},
    {q:"Literary analysis means...", a:"Studying how a text creates meaning", w:["Counting the number of pages","Only naming the author","Unrelated meaning"]},
    {q:"A symbol in literature is...", a:"An object or idea with deeper meaning", w:["A spelling mistake","A random number","Median"]},
    {q:"Analyzing a character means studying...", a:"Traits, actions, and motives", w:["Only their name","Only the book cover","Unrelated meaning"]},
    {q:"Literary analysis means...", a:"Studying how a text creates meaning", w:["Counting the number of pages","Only naming the author","Unrelated meaning"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Literary analysis.");
}

function gen_g9_eng_L2(){
  const it = pick([
    {q:"A claim is strongest when it is supported by...", a:"Clear evidence", w:["Random guesses","Only opinions","Personal opinion"]},
    {q:"Evidence from a text should be...", a:"Relevant to the claim", w:["Unrelated","Made up","Personal opinion"]},
    {q:"Reasoning explains...", a:"How evidence supports a claim", w:["How to draw a circle","Where the book was printed","Personal opinion"]},
    {q:"A claim is strongest when it is supported by...", a:"Clear evidence", w:["Random guesses","Only opinions","Personal opinion"]},
    {q:"Evidence from a text should be...", a:"Relevant to the claim", w:["Unrelated","Made up","Personal opinion"]},
    {q:"Reasoning explains...", a:"How evidence supports a claim", w:["How to draw a circle","Where the book was printed","Personal opinion"]},
    {q:"A claim is strongest when it is supported by...", a:"Clear evidence", w:["Random guesses","Only opinions","Personal opinion"]},
    {q:"Evidence from a text should be...", a:"Relevant to the claim", w:["Unrelated","Made up","Personal opinion"]},
    {q:"Reasoning explains...", a:"How evidence supports a claim", w:["How to draw a circle","Where the book was printed","Personal opinion"]},
    {q:"A claim is strongest when it is supported by...", a:"Clear evidence", w:["Random guesses","Only opinions","Personal opinion"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Claims and reasoning.");
}

function gen_g9_eng_L3(){
  const it = pick([
    {q:"Rhetoric is the use of language to...", a:"Persuade or affect an audience", w:["Solve equations","Measure temperature","Cover color"]},
    {q:"Ethos appeals to...", a:"Credibility", w:["Emotion only","Logic only","Gravity"]},
    {q:"Logos appeals to...", a:"Logic and reason", w:["Sound only","Color","Plain"]},
    {q:"Rhetoric is the use of language to...", a:"Persuade or affect an audience", w:["Solve equations","Measure temperature","Cover color"]},
    {q:"Ethos appeals to...", a:"Credibility", w:["Emotion only","Logic only","Gravity"]},
    {q:"Logos appeals to...", a:"Logic and reason", w:["Sound only","Color","Plain"]},
    {q:"Rhetoric is the use of language to...", a:"Persuade or affect an audience", w:["Solve equations","Measure temperature","Cover color"]},
    {q:"Ethos appeals to...", a:"Credibility", w:["Emotion only","Logic only","Gravity"]},
    {q:"Logos appeals to...", a:"Logic and reason", w:["Sound only","Color","Plain"]},
    {q:"Rhetoric is the use of language to...", a:"Persuade or affect an audience", w:["Solve equations","Measure temperature","Cover color"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Rhetorical appeals.");
}

function gen_g9_eng_L4(){
  return matchQuestion([
    {left:"persuasive", right:"Adjective"},
    {left:"argue", right:"Verb"},
    {left:"evidence", right:"Noun"},
    {left:"clearly", right:"Adverb"}
  ]);
}

function gen_g9_eng_L5(){
  const it = pick([
    {q:"Theme development means...", a:"How a theme grows across a text", w:["Only the first sentence","The page layout","Adverb"]},
    {q:"A repeated idea in a story can help reveal...", a:"Theme", w:["Font size","The publisher","Setting only"]},
    {q:"Character choices often help develop...", a:"Theme", w:["Punctuation only","Book length","Adverb"]},
    {q:"Theme development means...", a:"How a theme grows across a text", w:["Only the first sentence","The page layout","Adverb"]},
    {q:"A repeated idea in a story can help reveal...", a:"Theme", w:["Font size","The publisher","Setting only"]},
    {q:"Character choices often help develop...", a:"Theme", w:["Punctuation only","Book length","Adverb"]},
    {q:"Theme development means...", a:"How a theme grows across a text", w:["Only the first sentence","The page layout","Adverb"]},
    {q:"A repeated idea in a story can help reveal...", a:"Theme", w:["Font size","The publisher","Setting only"]},
    {q:"Character choices often help develop...", a:"Theme", w:["Punctuation only","Book length","Adverb"]},
    {q:"Theme development means...", a:"How a theme grows across a text", w:["Only the first sentence","The page layout","Adverb"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Theme development.");
}

function gen_g9_eng_L6(){
  const it = pick([
    {q:"Which sentence is correct?", a:"The author explains the theme clearly.", w:["The author explain the theme clearly.","The author explaining theme.","Adverb"]},
    {q:"Choose the correct verb: The students ___ evidence.", a:"Analyze", w:["Analyzes","Analyzing","Adverb"]},
    {q:"A semicolon can join...", a:"Two closely related complete sentences", w:["Two random letters","Only nouns","Adverb"]},
    {q:"Which sentence is correct?", a:"The author explains the theme clearly.", w:["The author explain the theme clearly.","The author explaining theme.","Adverb"]},
    {q:"Choose the correct verb: The students ___ evidence.", a:"Analyze", w:["Analyzes","Analyzing","Adverb"]},
    {q:"A semicolon can join...", a:"Two closely related complete sentences", w:["Two random letters","Only nouns","Adverb"]},
    {q:"Which sentence is correct?", a:"The author explains the theme clearly.", w:["The author explain the theme clearly.","The author explaining theme.","Adverb"]},
    {q:"Choose the correct verb: The students ___ evidence.", a:"Analyze", w:["Analyzes","Analyzing","Adverb"]},
    {q:"A semicolon can join...", a:"Two closely related complete sentences", w:["Two random letters","Only nouns","Adverb"]},
    {q:"Which sentence is correct?", a:"The author explains the theme clearly.", w:["The author explain the theme clearly.","The author explaining theme.","Adverb"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Grammar and usage.");
}

function gen_g9_eng_L7(){
  const it = pick([
    {q:"The writer used ___ to persuade the audience.", a:"rhetoric"},
    {q:"A strong claim needs clear ___.", a:"evidence"},
    {q:"Ethos is an appeal to ___.", a:"credibility"},
    {q:"The writer used ___ to persuade the audience.", a:"rhetoric"},
    {q:"A strong claim needs clear ___.", a:"evidence"},
    {q:"Ethos is an appeal to ___.", a:"credibility"},
    {q:"The writer used ___ to persuade the audience.", a:"rhetoric"},
    {q:"A strong claim needs clear ___.", a:"evidence"},
    {q:"Ethos is an appeal to ___.", a:"credibility"},
    {q:"The writer used ___ to persuade the audience.", a:"rhetoric"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g9_eng_L8(){
  const it = pick([
    {bad:"the author uses rhetoric to persuade readers.", good:"The author uses rhetoric to persuade readers."},
    {bad:"a claim should be supported by evidence", good:"A claim should be supported by evidence."},
    {bad:"ethos pathos and logos are rhetorical appeals", good:"Ethos, pathos, and logos are rhetorical appeals."},
    {bad:"the author uses rhetoric to persuade readers.", good:"The author uses rhetoric to persuade readers."},
    {bad:"a claim should be supported by evidence", good:"A claim should be supported by evidence."},
    {bad:"ethos pathos and logos are rhetorical appeals", good:"Ethos, pathos, and logos are rhetorical appeals."},
    {bad:"the author uses rhetoric to persuade readers.", good:"The author uses rhetoric to persuade readers."},
    {bad:"a claim should be supported by evidence", good:"A claim should be supported by evidence."},
    {bad:"ethos pathos and logos are rhetorical appeals", good:"Ethos, pathos, and logos are rhetorical appeals."},
    {bad:"the author uses rhetoric to persuade readers.", good:"The author uses rhetoric to persuade readers."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g9_eng_L9(){
  return matchQuestion([
    {left:"Ethos", right:"Credibility"},
    {left:"Logos", right:"Logic"},
    {left:"Pathos", right:"Emotion"},
    {left:"Claim", right:"Point to prove"}
  ]);
}

function gen_g9_eng_L10(){
  const it = pick([
    {q:"Ethos means...", a:"Credibility", w:["Emotion","Weather","Unrelated meaning"]},
    {q:"Logos means...", a:"Logic", w:["Sound","Color","Plain"]},
    {q:"Claim means...", a:"Point", w:["Guess","Planet","Unrelated meaning"]},
    {q:"Ethos means...", a:"Credibility", w:["Emotion","Weather","Unrelated meaning"]},
    {q:"Logos means...", a:"Logic", w:["Sound","Color","Plain"]},
    {q:"Claim means...", a:"Point", w:["Guess","Planet","Unrelated meaning"]},
    {q:"Ethos means...", a:"Credibility", w:["Emotion","Weather","Unrelated meaning"]},
    {q:"Logos means...", a:"Logic", w:["Sound","Color","Plain"]},
    {q:"Claim means...", a:"Point", w:["Guess","Planet","Unrelated meaning"]},
    {q:"Ethos means...", a:"Credibility", w:["Emotion","Weather","Unrelated meaning"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g9_math_L1(){
  const it = pick([
    {q:"Simplify: 4x + 3x", a:"7X", w:["12X","X","Simplify"]},
    {q:"Solve: x + 9 = 20", a:"11", w:["29","180","12"]},
    {q:"Evaluate 3x when x = 6", a:"18", w:["9","36","19"]},
    {q:"Simplify: 4x + 3x", a:"7X", w:["12X","X","Simplify"]},
    {q:"Solve: x + 9 = 20", a:"11", w:["29","180","12"]},
    {q:"Evaluate 3x when x = 6", a:"18", w:["9","36","19"]},
    {q:"Simplify: 4x + 3x", a:"7X", w:["12X","X","Simplify"]},
    {q:"Solve: x + 9 = 20", a:"11", w:["29","180","12"]},
    {q:"Evaluate 3x when x = 6", a:"18", w:["9","36","19"]},
    {q:"Simplify: 4x + 3x", a:"7X", w:["12X","X","Simplify"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Algebra review.");
}

function gen_g9_math_L2(){
  const it = pick([
    {q:"A quadratic equation often has x raised to the...", a:"Second power", w:["First power only","Zero power only","Variable"]},
    {q:"Which is quadratic?", a:"X² + 3x + 2", w:["X + 5","3X - 1","Quadratic"]},
    {q:"The graph of a quadratic is a...", a:"Parabola", w:["Circle only","Straight line only","Area"]},
    {q:"A quadratic equation often has x raised to the...", a:"Second power", w:["First power only","Zero power only","Variable"]},
    {q:"Which is quadratic?", a:"X² + 3x + 2", w:["X + 5","3X - 1","Quadratic"]},
    {q:"The graph of a quadratic is a...", a:"Parabola", w:["Circle only","Straight line only","Area"]},
    {q:"A quadratic equation often has x raised to the...", a:"Second power", w:["First power only","Zero power only","Variable"]},
    {q:"Which is quadratic?", a:"X² + 3x + 2", w:["X + 5","3X - 1","Quadratic"]},
    {q:"The graph of a quadratic is a...", a:"Parabola", w:["Circle only","Straight line only","Area"]},
    {q:"A quadratic equation often has x raised to the...", a:"Second power", w:["First power only","Zero power only","Variable"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Quadratics.");
}

function gen_g9_math_L3(){
  const it = pick([
    {q:"A system of equations has...", a:"Two or more equations", w:["Only one number","No variables","Roots"]},
    {q:"The solution to a system is where graphs...", a:"Intersect", w:["Disappear","Become words","Roots"]},
    {q:"Solve quickly: x + y = 5 and x = 2. y = ?", a:"3", w:["7","10","4"]},
    {q:"A system of equations has...", a:"Two or more equations", w:["Only one number","No variables","Roots"]},
    {q:"The solution to a system is where graphs...", a:"Intersect", w:["Disappear","Become words","Roots"]},
    {q:"Solve quickly: x + y = 5 and x = 2. y = ?", a:"3", w:["7","10","4"]},
    {q:"A system of equations has...", a:"Two or more equations", w:["Only one number","No variables","Roots"]},
    {q:"The solution to a system is where graphs...", a:"Intersect", w:["Disappear","Become words","Roots"]},
    {q:"Solve quickly: x + y = 5 and x = 2. y = ?", a:"3", w:["7","10","4"]},
    {q:"A system of equations has...", a:"Two or more equations", w:["Only one number","No variables","Roots"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Systems of equations.");
}

function gen_g9_math_L4(){
  return matchQuestion([
    {left:"x²", right:"x times x"},
    {left:"2³", right:"8"},
    {left:"5⁰", right:"1"},
    {left:"3⁴", right:"81"}
  ]);
}

function gen_g9_math_L5(){
  const it = pick([
    {q:"Mean means...", a:"Average", w:["Largest only","Smallest only","Unrelated meaning"]},
    {q:"Median means...", a:"Middle value", w:["Total sum","Difference","Unrelated meaning"]},
    {q:"Mode means...", a:"Most frequent value", w:["Least frequent value","Range","Unrelated meaning"]},
    {q:"Mean means...", a:"Average", w:["Largest only","Smallest only","Unrelated meaning"]},
    {q:"Median means...", a:"Middle value", w:["Total sum","Difference","Unrelated meaning"]},
    {q:"Mode means...", a:"Most frequent value", w:["Least frequent value","Range","Unrelated meaning"]},
    {q:"Mean means...", a:"Average", w:["Largest only","Smallest only","Unrelated meaning"]},
    {q:"Median means...", a:"Middle value", w:["Total sum","Difference","Unrelated meaning"]},
    {q:"Mode means...", a:"Most frequent value", w:["Least frequent value","Range","Unrelated meaning"]},
    {q:"Mean means...", a:"Average", w:["Largest only","Smallest only","Unrelated meaning"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Statistics.");
}

function gen_g9_math_L6(){
  const it = pick([
    {q:"The graph of a quadratic is a ___.", a:"parabola"},
    {q:"The ___ is the middle value of a data set.", a:"median"},
    {q:"Anything except zero to the zero power equals ___.", a:"1"},
    {q:"The graph of a quadratic is a ___.", a:"parabola"},
    {q:"The ___ is the middle value of a data set.", a:"median"},
    {q:"Anything except zero to the zero power equals ___.", a:"1"},
    {q:"The graph of a quadratic is a ___.", a:"parabola"},
    {q:"The ___ is the middle value of a data set.", a:"median"},
    {q:"Anything except zero to the zero power equals ___.", a:"1"},
    {q:"The graph of a quadratic is a ___.", a:"parabola"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g9_math_L7(){
  const it = pick([
    {bad:"the graph of a quadratic is a parabola", good:"The graph of a quadratic is a parabola."},
    {bad:"mean is the average of a data set", good:"Mean is the average of a data set."},
    {bad:"systems of equations can be solved by graphing", good:"Systems of equations can be solved by graphing."},
    {bad:"the graph of a quadratic is a parabola", good:"The graph of a quadratic is a parabola."},
    {bad:"mean is the average of a data set", good:"Mean is the average of a data set."},
    {bad:"systems of equations can be solved by graphing", good:"Systems of equations can be solved by graphing."},
    {bad:"the graph of a quadratic is a parabola", good:"The graph of a quadratic is a parabola."},
    {bad:"mean is the average of a data set", good:"Mean is the average of a data set."},
    {bad:"systems of equations can be solved by graphing", good:"Systems of equations can be solved by graphing."},
    {bad:"the graph of a quadratic is a parabola", good:"The graph of a quadratic is a parabola."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g9_math_L8(){
  return matchQuestion([
    {left:"x²", right:"x times x"},
    {left:"Mean", right:"Average"},
    {left:"Parabola", right:"Quadratic graph"},
    {left:"System solution", right:"Point of intersection"}
  ]);
}

function gen_g9_math_L9(){
  const it = pick([
    {q:"5x when x = 2", a:"10", w:["7","25","11"]},
    {q:"3²", a:"9", w:["6","8","10"]},
    {q:"median of 2, 5, 9", a:"5", w:["2","9","6"]},
    {q:"5x when x = 2", a:"10", w:["7","25","11"]},
    {q:"3²", a:"9", w:["6","8","10"]},
    {q:"median of 2, 5, 9", a:"5", w:["2","9","6"]},
    {q:"5x when x = 2", a:"10", w:["7","25","11"]},
    {q:"3²", a:"9", w:["6","8","10"]},
    {q:"median of 2, 5, 9", a:"5", w:["2","9","6"]},
    {q:"5x when x = 2", a:"10", w:["7","25","11"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g9_math_L10(){
  const it = pick([
    {q:"A linear graph is usually a...", a:"Straight line", w:["Circle","Parabola only","Area"]},
    {q:"The solution of two lines on a graph is their...", a:"Intersection", w:["Color","Title","Area"]},
    {q:"A quadratic expression has degree...", a:"2", w:["1","0","3"]},
    {q:"A linear graph is usually a...", a:"Straight line", w:["Circle","Parabola only","Area"]},
    {q:"The solution of two lines on a graph is their...", a:"Intersection", w:["Color","Title","Area"]},
    {q:"A quadratic expression has degree...", a:"2", w:["1","0","3"]},
    {q:"A linear graph is usually a...", a:"Straight line", w:["Circle","Parabola only","Area"]},
    {q:"The solution of two lines on a graph is their...", a:"Intersection", w:["Color","Title","Area"]},
    {q:"A quadratic expression has degree...", a:"2", w:["1","0","3"]},
    {q:"A linear graph is usually a...", a:"Straight line", w:["Circle","Parabola only","Area"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Algebra connections.");
}

function gen_g9_sci_L1(){
  const it = pick([
    {q:"Cells are the basic unit of...", a:"Life", w:["Weather","Rocks","Climate"]},
    {q:"Mitochondria help cells release...", a:"Energy", w:["Sand","Sound","Plain"]},
    {q:"DNA is found in cells and carries...", a:"Genetic information", w:["Rainfall","Gravity","Cover color"]},
    {q:"Cells are the basic unit of...", a:"Life", w:["Weather","Rocks","Climate"]},
    {q:"Mitochondria help cells release...", a:"Energy", w:["Sand","Sound","Plain"]},
    {q:"DNA is found in cells and carries...", a:"Genetic information", w:["Rainfall","Gravity","Cover color"]},
    {q:"Cells are the basic unit of...", a:"Life", w:["Weather","Rocks","Climate"]},
    {q:"Mitochondria help cells release...", a:"Energy", w:["Sand","Sound","Plain"]},
    {q:"DNA is found in cells and carries...", a:"Genetic information", w:["Rainfall","Gravity","Cover color"]},
    {q:"Cells are the basic unit of...", a:"Life", w:["Weather","Rocks","Climate"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Cell biology.");
}

function gen_g9_sci_L2(){
  const it = pick([
    {q:"DNA stands for...", a:"Deoxyribonucleic acid", w:["Daily nutrition amount","Digital number array","Array"]},
    {q:"DNA contains instructions for...", a:"Traits", w:["Weather","Sound waves","Plain"]},
    {q:"Genes are sections of...", a:"DNA", w:["Clouds","Rocks","Climate"]},
    {q:"DNA stands for...", a:"Deoxyribonucleic acid", w:["Daily nutrition amount","Digital number array","Array"]},
    {q:"DNA contains instructions for...", a:"Traits", w:["Weather","Sound waves","Plain"]},
    {q:"Genes are sections of...", a:"DNA", w:["Clouds","Rocks","Climate"]},
    {q:"DNA stands for...", a:"Deoxyribonucleic acid", w:["Daily nutrition amount","Digital number array","Array"]},
    {q:"DNA contains instructions for...", a:"Traits", w:["Weather","Sound waves","Plain"]},
    {q:"Genes are sections of...", a:"DNA", w:["Clouds","Rocks","Climate"]},
    {q:"DNA stands for...", a:"Deoxyribonucleic acid", w:["Daily nutrition amount","Digital number array","Array"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "DNA and genes.");
}

function gen_g9_sci_L3(){
  const it = pick([
    {q:"Ecology is the study of...", a:"Interactions among organisms and environments", w:["Only planets","Only machines","Climate"]},
    {q:"A population is...", a:"Members of one species in an area", w:["All weather in a month","One single rock","Area"]},
    {q:"A community includes...", a:"Different populations living together", w:["Only one organism","Only nonliving things","Organ system"]},
    {q:"Ecology is the study of...", a:"Interactions among organisms and environments", w:["Only planets","Only machines","Climate"]},
    {q:"A population is...", a:"Members of one species in an area", w:["All weather in a month","One single rock","Area"]},
    {q:"A community includes...", a:"Different populations living together", w:["Only one organism","Only nonliving things","Organ system"]},
    {q:"Ecology is the study of...", a:"Interactions among organisms and environments", w:["Only planets","Only machines","Climate"]},
    {q:"A population is...", a:"Members of one species in an area", w:["All weather in a month","One single rock","Area"]},
    {q:"A community includes...", a:"Different populations living together", w:["Only one organism","Only nonliving things","Organ system"]},
    {q:"Ecology is the study of...", a:"Interactions among organisms and environments", w:["Only planets","Only machines","Climate"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Ecology.");
}

function gen_g9_sci_L4(){
  return matchQuestion([
    {left:"Cell", right:"Basic unit of life"},
    {left:"Mitochondria", right:"Releases energy"},
    {left:"DNA", right:"Genetic information"},
    {left:"Gene", right:"Section of DNA"}
  ]);
}

function gen_g9_sci_L5(){
  const it = pick([
    {q:"Energy enters most ecosystems through...", a:"Sunlight", w:["Plastic","Metal","Roots"]},
    {q:"Producers convert sunlight into food using...", a:"Photosynthesis", w:["Gravity","Evaporation","Friction"]},
    {q:"Energy decreases as it moves up a food chain.", a:"True", w:["False","Never","Gravity"]},
    {q:"Energy enters most ecosystems through...", a:"Sunlight", w:["Plastic","Metal","Roots"]},
    {q:"Producers convert sunlight into food using...", a:"Photosynthesis", w:["Gravity","Evaporation","Friction"]},
    {q:"Energy decreases as it moves up a food chain.", a:"True", w:["False","Never","Gravity"]},
    {q:"Energy enters most ecosystems through...", a:"Sunlight", w:["Plastic","Metal","Roots"]},
    {q:"Producers convert sunlight into food using...", a:"Photosynthesis", w:["Gravity","Evaporation","Friction"]},
    {q:"Energy decreases as it moves up a food chain.", a:"True", w:["False","Never","Gravity"]},
    {q:"Energy enters most ecosystems through...", a:"Sunlight", w:["Plastic","Metal","Roots"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Energy flow.");
}

function gen_g9_sci_L6(){
  const it = pick([
    {q:"DNA carries genetic ___.", a:"information"},
    {q:"A group of one species in an area is a ___.", a:"population"},
    {q:"Producers use sunlight during ___.", a:"photosynthesis"},
    {q:"DNA carries genetic ___.", a:"information"},
    {q:"A group of one species in an area is a ___.", a:"population"},
    {q:"Producers use sunlight during ___.", a:"photosynthesis"},
    {q:"DNA carries genetic ___.", a:"information"},
    {q:"A group of one species in an area is a ___.", a:"population"},
    {q:"Producers use sunlight during ___.", a:"photosynthesis"},
    {q:"DNA carries genetic ___.", a:"information"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g9_sci_L7(){
  const it = pick([
    {bad:"cells are the basic unit of life", good:"Cells are the basic unit of life."},
    {bad:"dna carries genetic information", good:"DNA carries genetic information."},
    {bad:"photosynthesis helps producers make food", good:"Photosynthesis helps producers make food."},
    {bad:"cells are the basic unit of life", good:"Cells are the basic unit of life."},
    {bad:"dna carries genetic information", good:"DNA carries genetic information."},
    {bad:"photosynthesis helps producers make food", good:"Photosynthesis helps producers make food."},
    {bad:"cells are the basic unit of life", good:"Cells are the basic unit of life."},
    {bad:"dna carries genetic information", good:"DNA carries genetic information."},
    {bad:"photosynthesis helps producers make food", good:"Photosynthesis helps producers make food."},
    {bad:"cells are the basic unit of life", good:"Cells are the basic unit of life."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g9_sci_L8(){
  return matchQuestion([
    {left:"Population", right:"One species in an area"},
    {left:"Community", right:"Different populations together"},
    {left:"Producer", right:"Makes its own food"},
    {left:"Ecology", right:"Study of interactions"}
  ]);
}

function gen_g9_sci_L9(){
  const it = pick([
    {q:"DNA carries...", a:"Genetic information", w:["Sound","Heat","Plain"]},
    {q:"Producers use...", a:"Sunlight", w:["Plastic","Metal","Roots"]},
    {q:"Ecology studies...", a:"Organism interactions", w:["Spelling","Triangles","Area"]},
    {q:"DNA carries...", a:"Genetic information", w:["Sound","Heat","Plain"]},
    {q:"Producers use...", a:"Sunlight", w:["Plastic","Metal","Roots"]},
    {q:"Ecology studies...", a:"Organism interactions", w:["Spelling","Triangles","Area"]},
    {q:"DNA carries...", a:"Genetic information", w:["Sound","Heat","Plain"]},
    {q:"Producers use...", a:"Sunlight", w:["Plastic","Metal","Roots"]},
    {q:"Ecology studies...", a:"Organism interactions", w:["Spelling","Triangles","Area"]},
    {q:"DNA carries...", a:"Genetic information", w:["Sound","Heat","Plain"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g9_sci_L10(){
  const it = pick([
    {q:"The process of cell division for body cells is...", a:"Mitosis", w:["Meiosis only","Evaporation","Friction"]},
    {q:"Homeostasis means keeping internal conditions...", a:"Stable", w:["Random","Frozen only","Unrelated meaning"]},
    {q:"Enzymes help speed up...", a:"Chemical reactions", w:["Reading speed","Gravity","Friction"]},
    {q:"The process of cell division for body cells is...", a:"Mitosis", w:["Meiosis only","Evaporation","Friction"]},
    {q:"Homeostasis means keeping internal conditions...", a:"Stable", w:["Random","Frozen only","Unrelated meaning"]},
    {q:"Enzymes help speed up...", a:"Chemical reactions", w:["Reading speed","Gravity","Friction"]},
    {q:"The process of cell division for body cells is...", a:"Mitosis", w:["Meiosis only","Evaporation","Friction"]},
    {q:"Homeostasis means keeping internal conditions...", a:"Stable", w:["Random","Frozen only","Unrelated meaning"]},
    {q:"Enzymes help speed up...", a:"Chemical reactions", w:["Reading speed","Gravity","Friction"]},
    {q:"The process of cell division for body cells is...", a:"Mitosis", w:["Meiosis only","Evaporation","Friction"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Biology connections.");
}
function gen_g10_eng_L1(){
  const it = pick([
    {q:"Theme development means...", a:"How a theme is built throughout a text", w:["Only the title","The number of chapters","Unrelated meaning"]},
    {q:"A theme can be developed through...", a:"Characters, conflict, and events", w:["Only page numbers","Only punctuation","Adverb"]},
    {q:"A universal theme is...", a:"A message many people can relate to", w:["A math formula","A spelling rule","Setting only"]},
    {q:"Theme development means...", a:"How a theme is built throughout a text", w:["Only the title","The number of chapters","Unrelated meaning"]},
    {q:"A theme can be developed through...", a:"Characters, conflict, and events", w:["Only page numbers","Only punctuation","Adverb"]},
    {q:"A universal theme is...", a:"A message many people can relate to", w:["A math formula","A spelling rule","Setting only"]},
    {q:"Theme development means...", a:"How a theme is built throughout a text", w:["Only the title","The number of chapters","Unrelated meaning"]},
    {q:"A theme can be developed through...", a:"Characters, conflict, and events", w:["Only page numbers","Only punctuation","Adverb"]},
    {q:"A universal theme is...", a:"A message many people can relate to", w:["A math formula","A spelling rule","Setting only"]},
    {q:"Theme development means...", a:"How a theme is built throughout a text", w:["Only the title","The number of chapters","Unrelated meaning"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Theme development.");
}

function gen_g10_eng_L2(){
  const it = pick([
    {q:"Ethos appeals to...", a:"Credibility", w:["Emotion","Logic","Gravity"]},
    {q:"Pathos appeals to...", a:"Emotion", w:["Credibility","Statistics only","Gravity"]},
    {q:"Logos appeals to...", a:"Logic", w:["Fear only","Character names","Names"]},
    {q:"Ethos appeals to...", a:"Credibility", w:["Emotion","Logic","Gravity"]},
    {q:"Pathos appeals to...", a:"Emotion", w:["Credibility","Statistics only","Gravity"]},
    {q:"Logos appeals to...", a:"Logic", w:["Fear only","Character names","Names"]},
    {q:"Ethos appeals to...", a:"Credibility", w:["Emotion","Logic","Gravity"]},
    {q:"Pathos appeals to...", a:"Emotion", w:["Credibility","Statistics only","Gravity"]},
    {q:"Logos appeals to...", a:"Logic", w:["Fear only","Character names","Names"]},
    {q:"Ethos appeals to...", a:"Credibility", w:["Emotion","Logic","Gravity"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Rhetorical appeals.");
}

function gen_g10_eng_L3(){
  const it = pick([
    {q:"Research writing should use...", a:"Credible sources", w:["Made-up facts","Only guesses","Guesses"]},
    {q:"A thesis statement gives...", a:"The main argument or focus", w:["Only the date","Only the author's birthday","Birthday"]},
    {q:"Citing sources helps avoid...", a:"Plagiarism", w:["Reading","Paragraphs","Median"]},
    {q:"Research writing should use...", a:"Credible sources", w:["Made-up facts","Only guesses","Guesses"]},
    {q:"A thesis statement gives...", a:"The main argument or focus", w:["Only the date","Only the author's birthday","Birthday"]},
    {q:"Citing sources helps avoid...", a:"Plagiarism", w:["Reading","Paragraphs","Median"]},
    {q:"Research writing should use...", a:"Credible sources", w:["Made-up facts","Only guesses","Guesses"]},
    {q:"A thesis statement gives...", a:"The main argument or focus", w:["Only the date","Only the author's birthday","Birthday"]},
    {q:"Citing sources helps avoid...", a:"Plagiarism", w:["Reading","Paragraphs","Median"]},
    {q:"Research writing should use...", a:"Credible sources", w:["Made-up facts","Only guesses","Guesses"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Research writing.");
}

function gen_g10_eng_L4(){
  return matchQuestion([
    {left:"credible", right:"Adjective"},
    {left:"research", right:"Noun"},
    {left:"argue", right:"Verb"},
    {left:"effectively", right:"Adverb"}
  ]);
}

function gen_g10_eng_L5(){
  const it = pick([
    {q:"Syntax means...", a:"Sentence structure", w:["Word meaning only","Story setting","Adverb"]},
    {q:"A short sentence can create...", a:"Emphasis", w:["A chemical reaction","A fraction","Adverb"]},
    {q:"Writers vary syntax to improve...", a:"Style and meaning", w:["Temperature","Mass","Median"]},
    {q:"Syntax means...", a:"Sentence structure", w:["Word meaning only","Story setting","Adverb"]},
    {q:"A short sentence can create...", a:"Emphasis", w:["A chemical reaction","A fraction","Adverb"]},
    {q:"Writers vary syntax to improve...", a:"Style and meaning", w:["Temperature","Mass","Median"]},
    {q:"Syntax means...", a:"Sentence structure", w:["Word meaning only","Story setting","Adverb"]},
    {q:"A short sentence can create...", a:"Emphasis", w:["A chemical reaction","A fraction","Adverb"]},
    {q:"Writers vary syntax to improve...", a:"Style and meaning", w:["Temperature","Mass","Median"]},
    {q:"Syntax means...", a:"Sentence structure", w:["Word meaning only","Story setting","Adverb"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Syntax.");
}

function gen_g10_eng_L6(){
  const it = pick([
    {q:"Poetry often uses...", a:"Imagery, rhythm, and figurative language", w:["Only facts","Only equations","Variable"]},
    {q:"A metaphor compares two things...", a:"Without using like or as", w:["Using only numbers","With a ruler","Compare and contrast"]},
    {q:"Imagery appeals to...", a:"The senses", w:["Only grammar rules","Only page numbers","Numbers"]},
    {q:"Poetry often uses...", a:"Imagery, rhythm, and figurative language", w:["Only facts","Only equations","Variable"]},
    {q:"A metaphor compares two things...", a:"Without using like or as", w:["Using only numbers","With a ruler","Compare and contrast"]},
    {q:"Imagery appeals to...", a:"The senses", w:["Only grammar rules","Only page numbers","Numbers"]},
    {q:"Poetry often uses...", a:"Imagery, rhythm, and figurative language", w:["Only facts","Only equations","Variable"]},
    {q:"A metaphor compares two things...", a:"Without using like or as", w:["Using only numbers","With a ruler","Compare and contrast"]},
    {q:"Imagery appeals to...", a:"The senses", w:["Only grammar rules","Only page numbers","Numbers"]},
    {q:"Poetry often uses...", a:"Imagery, rhythm, and figurative language", w:["Only facts","Only equations","Variable"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Poetry.");
}

function gen_g10_eng_L7(){
  const it = pick([
    {q:"A thesis gives the main ___ of an essay.", a:"argument"},
    {q:"Pathos appeals to the audience's ___.", a:"emotions"},
    {q:"Syntax is sentence ___.", a:"structure"},
    {q:"A thesis gives the main ___ of an essay.", a:"argument"},
    {q:"Pathos appeals to the audience's ___.", a:"emotions"},
    {q:"Syntax is sentence ___.", a:"structure"},
    {q:"A thesis gives the main ___ of an essay.", a:"argument"},
    {q:"Pathos appeals to the audience's ___.", a:"emotions"},
    {q:"Syntax is sentence ___.", a:"structure"},
    {q:"A thesis gives the main ___ of an essay.", a:"argument"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g10_eng_L8(){
  const it = pick([
    {bad:"credible sources make research stronger.", good:"Credible sources make research stronger."},
    {bad:"pathos appeals to emotion", good:"Pathos appeals to emotion."},
    {bad:"syntax affects style rhythm and meaning", good:"Syntax affects style, rhythm, and meaning."},
    {bad:"credible sources make research stronger.", good:"Credible sources make research stronger."},
    {bad:"pathos appeals to emotion", good:"Pathos appeals to emotion."},
    {bad:"syntax affects style rhythm and meaning", good:"Syntax affects style, rhythm, and meaning."},
    {bad:"credible sources make research stronger.", good:"Credible sources make research stronger."},
    {bad:"pathos appeals to emotion", good:"Pathos appeals to emotion."},
    {bad:"syntax affects style rhythm and meaning", good:"Syntax affects style, rhythm, and meaning."},
    {bad:"credible sources make research stronger.", good:"Credible sources make research stronger."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g10_eng_L9(){
  return matchQuestion([
    {left:"Pathos", right:"Emotion"},
    {left:"Ethos", right:"Credibility"},
    {left:"Syntax", right:"Sentence structure"},
    {left:"Thesis", right:"Main argument"}
  ]);
}

function gen_g10_eng_L10(){
  const it = pick([
    {q:"Ethos means...", a:"Credibility", w:["Emotion","Weather","Unrelated meaning"]},
    {q:"Pathos means...", a:"Emotion", w:["Logic","Shape","Unrelated meaning"]},
    {q:"Syntax means...", a:"Structure", w:["Setting","Sound","Plain"]},
    {q:"Ethos means...", a:"Credibility", w:["Emotion","Weather","Unrelated meaning"]},
    {q:"Pathos means...", a:"Emotion", w:["Logic","Shape","Unrelated meaning"]},
    {q:"Syntax means...", a:"Structure", w:["Setting","Sound","Plain"]},
    {q:"Ethos means...", a:"Credibility", w:["Emotion","Weather","Unrelated meaning"]},
    {q:"Pathos means...", a:"Emotion", w:["Logic","Shape","Unrelated meaning"]},
    {q:"Syntax means...", a:"Structure", w:["Setting","Sound","Plain"]},
    {q:"Ethos means...", a:"Credibility", w:["Emotion","Weather","Unrelated meaning"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g10_math_L1(){
  const it = pick([
    {q:"Geometry studies...", a:"Shapes, lines, and space", w:["Only spelling","Only weather","Area"]},
    {q:"A triangle has...", a:"3 Sides", w:["4 Sides","5 Sides","Area"]},
    {q:"The sum of angles in a triangle is...", a:"180°", w:["90°","360°","Area"]},
    {q:"Geometry studies...", a:"Shapes, lines, and space", w:["Only spelling","Only weather","Area"]},
    {q:"A triangle has...", a:"3 Sides", w:["4 Sides","5 Sides","Area"]},
    {q:"The sum of angles in a triangle is...", a:"180°", w:["90°","360°","Area"]},
    {q:"Geometry studies...", a:"Shapes, lines, and space", w:["Only spelling","Only weather","Area"]},
    {q:"A triangle has...", a:"3 Sides", w:["4 Sides","5 Sides","Area"]},
    {q:"The sum of angles in a triangle is...", a:"180°", w:["90°","360°","Area"]},
    {q:"Geometry studies...", a:"Shapes, lines, and space", w:["Only spelling","Only weather","Area"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Geometry basics.");
}

function gen_g10_math_L2(){
  const it = pick([
    {q:"Similar figures have...", a:"Same shape, proportional sizes", w:["Same color only","Same area always","1/2"]},
    {q:"If figures are similar, corresponding angles are...", a:"Equal", w:["Always different","Missing","Area"]},
    {q:"Scale factor compares...", a:"Side lengths", w:["Only colors","Only names","Compare and contrast"]},
    {q:"Similar figures have...", a:"Same shape, proportional sizes", w:["Same color only","Same area always","1/2"]},
    {q:"If figures are similar, corresponding angles are...", a:"Equal", w:["Always different","Missing","Area"]},
    {q:"Scale factor compares...", a:"Side lengths", w:["Only colors","Only names","Compare and contrast"]},
    {q:"Similar figures have...", a:"Same shape, proportional sizes", w:["Same color only","Same area always","1/2"]},
    {q:"If figures are similar, corresponding angles are...", a:"Equal", w:["Always different","Missing","Area"]},
    {q:"Scale factor compares...", a:"Side lengths", w:["Only colors","Only names","Compare and contrast"]},
    {q:"Similar figures have...", a:"Same shape, proportional sizes", w:["Same color only","Same area always","1/2"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Similarity.");
}

function gen_g10_math_L3(){
  const it = pick([
    {q:"Trigonometry studies relationships in...", a:"Triangles", w:["Sentences","Ecosystems","Roots"]},
    {q:"Sine, cosine, and tangent are...", a:"Trig ratios", w:["Chemical elements","Types of rocks","1/2"]},
    {q:"SOH-CAH-TOA helps remember...", a:"Trigonometric ratios", w:["Grammar rules","Food chains","1/2"]},
    {q:"Trigonometry studies relationships in...", a:"Triangles", w:["Sentences","Ecosystems","Roots"]},
    {q:"Sine, cosine, and tangent are...", a:"Trig ratios", w:["Chemical elements","Types of rocks","1/2"]},
    {q:"SOH-CAH-TOA helps remember...", a:"Trigonometric ratios", w:["Grammar rules","Food chains","1/2"]},
    {q:"Trigonometry studies relationships in...", a:"Triangles", w:["Sentences","Ecosystems","Roots"]},
    {q:"Sine, cosine, and tangent are...", a:"Trig ratios", w:["Chemical elements","Types of rocks","1/2"]},
    {q:"SOH-CAH-TOA helps remember...", a:"Trigonometric ratios", w:["Grammar rules","Food chains","1/2"]},
    {q:"Trigonometry studies relationships in...", a:"Triangles", w:["Sentences","Ecosystems","Roots"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Trigonometry.");
}

function gen_g10_math_L4(){
  return matchQuestion([
    {left:"Triangle", right:"3 sides"},
    {left:"Right angle", right:"90°"},
    {left:"Triangle angle sum", right:"180°"},
    {left:"Similar figures", right:"Same shape"}
  ]);
}

function gen_g10_math_L5(){
  const it = pick([
    {q:"A polynomial can have...", a:"Variables and exponents", w:["Only one letter no matter what","No numbers","Friction"]},
    {q:"Simplify: 2x + 5x", a:"7X", w:["10X","3X","Simplify"]},
    {q:"The degree of x² + 3x + 1 is...", a:"2", w:["3","1","4"]},
    {q:"A polynomial can have...", a:"Variables and exponents", w:["Only one letter no matter what","No numbers","Friction"]},
    {q:"Simplify: 2x + 5x", a:"7X", w:["10X","3X","Simplify"]},
    {q:"The degree of x² + 3x + 1 is...", a:"2", w:["3","1","4"]},
    {q:"A polynomial can have...", a:"Variables and exponents", w:["Only one letter no matter what","No numbers","Friction"]},
    {q:"Simplify: 2x + 5x", a:"7X", w:["10X","3X","Simplify"]},
    {q:"The degree of x² + 3x + 1 is...", a:"2", w:["3","1","4"]},
    {q:"A polynomial can have...", a:"Variables and exponents", w:["Only one letter no matter what","No numbers","Friction"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Polynomials.");
}

function gen_g10_math_L6(){
  const it = pick([
    {q:"Statistics helps analyze...", a:"Data", w:["Only poems","Only cells","Organ system"]},
    {q:"Range means...", a:"Largest minus smallest", w:["Average","Middle value","Unrelated meaning"]},
    {q:"A box plot shows...", a:"Spread of data", w:["Parts of speech","Chemical bonds only","Median"]},
    {q:"Statistics helps analyze...", a:"Data", w:["Only poems","Only cells","Organ system"]},
    {q:"Range means...", a:"Largest minus smallest", w:["Average","Middle value","Unrelated meaning"]},
    {q:"A box plot shows...", a:"Spread of data", w:["Parts of speech","Chemical bonds only","Median"]},
    {q:"Statistics helps analyze...", a:"Data", w:["Only poems","Only cells","Organ system"]},
    {q:"Range means...", a:"Largest minus smallest", w:["Average","Middle value","Unrelated meaning"]},
    {q:"A box plot shows...", a:"Spread of data", w:["Parts of speech","Chemical bonds only","Median"]},
    {q:"Statistics helps analyze...", a:"Data", w:["Only poems","Only cells","Organ system"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Statistics.");
}

function gen_g10_math_L7(){
  const it = pick([
    {q:"The sum of triangle angles is ___ degrees.", a:"180"},
    {q:"Sine, cosine, and tangent are trig ___.", a:"ratios"},
    {q:"Range is largest minus ___.", a:"smallest"},
    {q:"The sum of triangle angles is ___ degrees.", a:"180"},
    {q:"Sine, cosine, and tangent are trig ___.", a:"ratios"},
    {q:"Range is largest minus ___.", a:"smallest"},
    {q:"The sum of triangle angles is ___ degrees.", a:"180"},
    {q:"Sine, cosine, and tangent are trig ___.", a:"ratios"},
    {q:"Range is largest minus ___.", a:"smallest"},
    {q:"The sum of triangle angles is ___ degrees.", a:"180"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g10_math_L8(){
  const it = pick([
    {bad:"a triangle has three sides", good:"A triangle has three sides."},
    {bad:"similar figures have the same shape", good:"Similar figures have the same shape."},
    {bad:"range is the largest value minus the smallest value", good:"Range is the largest value minus the smallest value."},
    {bad:"a triangle has three sides", good:"A triangle has three sides."},
    {bad:"similar figures have the same shape", good:"Similar figures have the same shape."},
    {bad:"range is the largest value minus the smallest value", good:"Range is the largest value minus the smallest value."},
    {bad:"a triangle has three sides", good:"A triangle has three sides."},
    {bad:"similar figures have the same shape", good:"Similar figures have the same shape."},
    {bad:"range is the largest value minus the smallest value", good:"Range is the largest value minus the smallest value."},
    {bad:"a triangle has three sides", good:"A triangle has three sides."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g10_math_L9(){
  return matchQuestion([
    {left:"Triangle angle sum", right:"180°"},
    {left:"Similar figures", right:"Same shape"},
    {left:"Range", right:"Largest minus smallest"},
    {left:"Polynomial degree", right:"Highest exponent"}
  ]);
}

function gen_g10_math_L10(){
  const it = pick([
    {q:"Triangle sides", a:"3", w:["4","5","2"]},
    {q:"4x + 6x", a:"10X", w:["24X","2X","Related example"]},
    {q:"Range of 2, 5, 9", a:"7", w:["5","11","8"]},
    {q:"Triangle sides", a:"3", w:["4","5","2"]},
    {q:"4x + 6x", a:"10X", w:["24X","2X","Related example"]},
    {q:"Range of 2, 5, 9", a:"7", w:["5","11","8"]},
    {q:"Triangle sides", a:"3", w:["4","5","2"]},
    {q:"4x + 6x", a:"10X", w:["24X","2X","Related example"]},
    {q:"Range of 2, 5, 9", a:"7", w:["5","11","8"]},
    {q:"Triangle sides", a:"3", w:["4","5","2"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g10_sci_L1(){
  const it = pick([
    {q:"Chemistry studies...", a:"Matter and its changes", w:["Only planets","Only grammar","Friction"]},
    {q:"Matter is anything that has mass and...", a:"Takes up space", w:["Writes essays","Makes music","Friction"]},
    {q:"A substance made of one type of atom is an...", a:"Element", w:["Ecosystem","Organ","Roots"]},
    {q:"Chemistry studies...", a:"Matter and its changes", w:["Only planets","Only grammar","Friction"]},
    {q:"Matter is anything that has mass and...", a:"Takes up space", w:["Writes essays","Makes music","Friction"]},
    {q:"A substance made of one type of atom is an...", a:"Element", w:["Ecosystem","Organ","Roots"]},
    {q:"Chemistry studies...", a:"Matter and its changes", w:["Only planets","Only grammar","Friction"]},
    {q:"Matter is anything that has mass and...", a:"Takes up space", w:["Writes essays","Makes music","Friction"]},
    {q:"A substance made of one type of atom is an...", a:"Element", w:["Ecosystem","Organ","Roots"]},
    {q:"Chemistry studies...", a:"Matter and its changes", w:["Only planets","Only grammar","Friction"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Chemistry basics.");
}

function gen_g10_sci_L2(){
  const it = pick([
    {q:"The periodic table organizes...", a:"Elements", w:["Sentences","Triangles","Adverb"]},
    {q:"Elements in the same group often have similar...", a:"Properties", w:["Book titles","Paragraphs","Median"]},
    {q:"The atomic number tells the number of...", a:"Protons", w:["Clouds","Cells","Climate"]},
    {q:"The periodic table organizes...", a:"Elements", w:["Sentences","Triangles","Adverb"]},
    {q:"Elements in the same group often have similar...", a:"Properties", w:["Book titles","Paragraphs","Median"]},
    {q:"The atomic number tells the number of...", a:"Protons", w:["Clouds","Cells","Climate"]},
    {q:"The periodic table organizes...", a:"Elements", w:["Sentences","Triangles","Adverb"]},
    {q:"Elements in the same group often have similar...", a:"Properties", w:["Book titles","Paragraphs","Median"]},
    {q:"The atomic number tells the number of...", a:"Protons", w:["Clouds","Cells","Climate"]},
    {q:"The periodic table organizes...", a:"Elements", w:["Sentences","Triangles","Adverb"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Periodic table.");
}

function gen_g10_sci_L3(){
  const it = pick([
    {q:"Chemical bonding happens when atoms...", a:"Share or transfer electrons", w:["Write paragraphs","Form food chains","Median"]},
    {q:"Ionic bonds involve transfer of...", a:"Electrons", w:["Sunlight","Water","Roots"]},
    {q:"Covalent bonds involve sharing...", a:"Electrons", w:["Rocks","Organs","Climate"]},
    {q:"Chemical bonding happens when atoms...", a:"Share or transfer electrons", w:["Write paragraphs","Form food chains","Median"]},
    {q:"Ionic bonds involve transfer of...", a:"Electrons", w:["Sunlight","Water","Roots"]},
    {q:"Covalent bonds involve sharing...", a:"Electrons", w:["Rocks","Organs","Climate"]},
    {q:"Chemical bonding happens when atoms...", a:"Share or transfer electrons", w:["Write paragraphs","Form food chains","Median"]},
    {q:"Ionic bonds involve transfer of...", a:"Electrons", w:["Sunlight","Water","Roots"]},
    {q:"Covalent bonds involve sharing...", a:"Electrons", w:["Rocks","Organs","Climate"]},
    {q:"Chemical bonding happens when atoms...", a:"Share or transfer electrons", w:["Write paragraphs","Form food chains","Median"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Chemical bonding.");
}

function gen_g10_sci_L4(){
  return matchQuestion([
    {left:"Element", right:"One type of atom"},
    {left:"Proton", right:"Positive particle"},
    {left:"Ionic bond", right:"Electron transfer"},
    {left:"Covalent bond", right:"Electron sharing"}
  ]);
}

function gen_g10_sci_L5(){
  const it = pick([
    {q:"Climate describes...", a:"Long-term weather patterns", w:["One minute of weather","Only clouds","Climate"]},
    {q:"Greenhouse gases trap...", a:"Heat", w:["Sound","Soil","Friction"]},
    {q:"Carbon dioxide is a...", a:"Greenhouse gas", w:["Type of triangle","Grammar rule","Friction"]},
    {q:"Climate describes...", a:"Long-term weather patterns", w:["One minute of weather","Only clouds","Climate"]},
    {q:"Greenhouse gases trap...", a:"Heat", w:["Sound","Soil","Friction"]},
    {q:"Carbon dioxide is a...", a:"Greenhouse gas", w:["Type of triangle","Grammar rule","Friction"]},
    {q:"Climate describes...", a:"Long-term weather patterns", w:["One minute of weather","Only clouds","Climate"]},
    {q:"Greenhouse gases trap...", a:"Heat", w:["Sound","Soil","Friction"]},
    {q:"Carbon dioxide is a...", a:"Greenhouse gas", w:["Type of triangle","Grammar rule","Friction"]},
    {q:"Climate describes...", a:"Long-term weather patterns", w:["One minute of weather","Only clouds","Climate"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Climate science.");
}

function gen_g10_sci_L6(){
  const it = pick([
    {q:"Matter has mass and takes up ___.", a:"space"},
    {q:"The atomic number equals the number of ___.", a:"protons"},
    {q:"Covalent bonds share ___.", a:"electrons"},
    {q:"Matter has mass and takes up ___.", a:"space"},
    {q:"The atomic number equals the number of ___.", a:"protons"},
    {q:"Covalent bonds share ___.", a:"electrons"},
    {q:"Matter has mass and takes up ___.", a:"space"},
    {q:"The atomic number equals the number of ___.", a:"protons"},
    {q:"Covalent bonds share ___.", a:"electrons"},
    {q:"Matter has mass and takes up ___.", a:"space"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g10_sci_L7(){
  const it = pick([
    {bad:"chemistry studies matter and its changes", good:"Chemistry studies matter and its changes."},
    {bad:"the periodic table organizes elements", good:"The periodic table organizes elements."},
    {bad:"greenhouse gases trap heat", good:"Greenhouse gases trap heat."},
    {bad:"chemistry studies matter and its changes", good:"Chemistry studies matter and its changes."},
    {bad:"the periodic table organizes elements", good:"The periodic table organizes elements."},
    {bad:"greenhouse gases trap heat", good:"Greenhouse gases trap heat."},
    {bad:"chemistry studies matter and its changes", good:"Chemistry studies matter and its changes."},
    {bad:"the periodic table organizes elements", good:"The periodic table organizes elements."},
    {bad:"greenhouse gases trap heat", good:"Greenhouse gases trap heat."},
    {bad:"chemistry studies matter and its changes", good:"Chemistry studies matter and its changes."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g10_sci_L8(){
  return matchQuestion([
    {left:"Matter", right:"Has mass and volume"},
    {left:"Element", right:"One type of atom"},
    {left:"Greenhouse gas", right:"Traps heat"},
    {left:"Periodic table", right:"Organizes elements"}
  ]);
}

function gen_g10_sci_L9(){
  const it = pick([
    {q:"Atomic number counts...", a:"Protons", w:["Neutrons","Clouds","Climate"]},
    {q:"Covalent bonds share...", a:"Electrons", w:["Sunlight","Water","Roots"]},
    {q:"Greenhouse gases trap...", a:"Heat", w:["Sound","Soil","Friction"]},
    {q:"Atomic number counts...", a:"Protons", w:["Neutrons","Clouds","Climate"]},
    {q:"Covalent bonds share...", a:"Electrons", w:["Sunlight","Water","Roots"]},
    {q:"Greenhouse gases trap...", a:"Heat", w:["Sound","Soil","Friction"]},
    {q:"Atomic number counts...", a:"Protons", w:["Neutrons","Clouds","Climate"]},
    {q:"Covalent bonds share...", a:"Electrons", w:["Sunlight","Water","Roots"]},
    {q:"Greenhouse gases trap...", a:"Heat", w:["Sound","Soil","Friction"]},
    {q:"Atomic number counts...", a:"Protons", w:["Neutrons","Clouds","Climate"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g10_sci_L10(){
  const it = pick([
    {q:"A chemical equation shows...", a:"Reactants and products", w:["Only weather","Only grammar","Variable"]},
    {q:"Conservation of mass means mass is not...", a:"Created or destroyed", w:["Spelled or read","Heated only","Unrelated meaning"]},
    {q:"Acids often have pH...", a:"Less than 7", w:["Exactly 14","Always 7","Always"]},
    {q:"A chemical equation shows...", a:"Reactants and products", w:["Only weather","Only grammar","Variable"]},
    {q:"Conservation of mass means mass is not...", a:"Created or destroyed", w:["Spelled or read","Heated only","Unrelated meaning"]},
    {q:"Acids often have pH...", a:"Less than 7", w:["Exactly 14","Always 7","Always"]},
    {q:"A chemical equation shows...", a:"Reactants and products", w:["Only weather","Only grammar","Variable"]},
    {q:"Conservation of mass means mass is not...", a:"Created or destroyed", w:["Spelled or read","Heated only","Unrelated meaning"]},
    {q:"Acids often have pH...", a:"Less than 7", w:["Exactly 14","Always 7","Always"]},
    {q:"A chemical equation shows...", a:"Reactants and products", w:["Only weather","Only grammar","Variable"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Chemistry connections.");
}

