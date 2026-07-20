/* K12 grade 5-6 lesson generators
   Split from components/k12-lessons.js. Keep loaded as a classic script.
*/

/* ---------- GRADE 5 ENGLISH ---------- */
function gen_g5_eng_L1(){
  const it = pick([
    {t:"The sky turned dark and the wind blew hard. People opened umbrellas.", q:"What can you infer?", a:"It may rain.", w:["It is snowing.","It is midnight.","A guess without clues"]},
    {t:"Sam packed a swimsuit and sunscreen before leaving home.", q:"What can you infer?", a:"Sam is going swimming.", w:["Sam is going skiing.","Sam is going to sleep.","A guess without clues"]},
    {t:"The sky turned dark and the wind blew hard. People opened umbrellas.", q:"What can you infer?", a:"It may rain.", w:["It is snowing.","It is midnight.","A guess without clues"]},
    {t:"Sam packed a swimsuit and sunscreen before leaving home.", q:"What can you infer?", a:"Sam is going swimming.", w:["Sam is going skiing.","Sam is going to sleep.","A guess without clues"]},
    {t:"The sky turned dark and the wind blew hard. People opened umbrellas.", q:"What can you infer?", a:"It may rain.", w:["It is snowing.","It is midnight.","A guess without clues"]},
    {t:"Sam packed a swimsuit and sunscreen before leaving home.", q:"What can you infer?", a:"Sam is going swimming.", w:["Sam is going skiing.","Sam is going to sleep.","A guess without clues"]},
    {t:"The sky turned dark and the wind blew hard. People opened umbrellas.", q:"What can you infer?", a:"It may rain.", w:["It is snowing.","It is midnight.","A guess without clues"]},
    {t:"Sam packed a swimsuit and sunscreen before leaving home.", q:"What can you infer?", a:"Sam is going swimming.", w:["Sam is going skiing.","Sam is going to sleep.","A guess without clues"]},
    {t:"The sky turned dark and the wind blew hard. People opened umbrellas.", q:"What can you infer?", a:"It may rain.", w:["It is snowing.","It is midnight.","A guess without clues"]},
    {t:"Sam packed a swimsuit and sunscreen before leaving home.", q:"What can you infer?", a:"Sam is going swimming.", w:["Sam is going skiing.","Sam is going to sleep.","A guess without clues"]}
  ]);
  const q = `${it.t}\n\n${it.q}`;
  return mcQuestion(q, it.a, it.w, "Make an inference.");
}
function gen_g5_eng_L2(){
  const it = pick([
    {q:'"The classroom was a zoo." This is…', a:"Metaphor", w:["Fact","Question","Personification"]},
    {q:'"I was so hungry I could eat a horse." This is…', a:"Hyperbole", w:["Simile","Title","Personification"]},
    {q:'"The classroom was a zoo." This is…', a:"Metaphor", w:["Fact","Question","Personification"]},
    {q:'"I was so hungry I could eat a horse." This is…', a:"Hyperbole", w:["Simile","Title","Personification"]},
    {q:'"The classroom was a zoo." This is…', a:"Metaphor", w:["Fact","Question","Personification"]},
    {q:'"I was so hungry I could eat a horse." This is…', a:"Hyperbole", w:["Simile","Title","Personification"]},
    {q:'"The classroom was a zoo." This is…', a:"Metaphor", w:["Fact","Question","Personification"]},
    {q:'"I was so hungry I could eat a horse." This is…', a:"Hyperbole", w:["Simile","Title","Personification"]},
    {q:'"The classroom was a zoo." This is…', a:"Metaphor", w:["Fact","Question","Personification"]},
    {q:'"I was so hungry I could eat a horse." This is…', a:"Hyperbole", w:["Simile","Title","Personification"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Figurative language.");
}
function gen_g5_eng_L3(){
  const it = pick([
    {q:"Problem/solution text tells…", a:"A problem and how it is fixed", w:["Only jokes","Only poems","Compare and contrast"]},
    {q:"Cause/effect shows…", a:"Why something happens", w:["A menu","A map","Compare and contrast"]},
    {q:"Problem/solution text tells…", a:"A problem and how it is fixed", w:["Only jokes","Only poems","Compare and contrast"]},
    {q:"Cause/effect shows…", a:"Why something happens", w:["A menu","A map","Compare and contrast"]},
    {q:"Problem/solution text tells…", a:"A problem and how it is fixed", w:["Only jokes","Only poems","Compare and contrast"]},
    {q:"Cause/effect shows…", a:"Why something happens", w:["A menu","A map","Compare and contrast"]},
    {q:"Problem/solution text tells…", a:"A problem and how it is fixed", w:["Only jokes","Only poems","Compare and contrast"]},
    {q:"Cause/effect shows…", a:"Why something happens", w:["A menu","A map","Compare and contrast"]},
    {q:"Problem/solution text tells…", a:"A problem and how it is fixed", w:["Only jokes","Only poems","Compare and contrast"]},
    {q:"Cause/effect shows…", a:"Why something happens", w:["A menu","A map","Compare and contrast"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Text structure question.");
}
function gen_g5_eng_L4(){
  return g5Question([
    {
      q:"Every Saturday, Maya visits the community garden. She waters tomatoes, pulls weeds, and helps collect vegetables for families. What is the main idea?",
      a:"Maya helps at a community garden",
      w:["Maya dislikes vegetables","Families only grow flowers","Roots"]
    },
    {
      q:"Dolphins communicate using clicks and whistles. They also work together to find food and protect one another. What is the main idea?",
      a:"Dolphins communicate and work together",
      w:["Dolphins live in trees","Dolphins cannot hear","Small detail"]
    },
    {
      q:"Recycling paper, plastic, and metal reduces trash. It also helps save natural resources. What is the main idea?",
      a:"Recycling helps the environment",
      w:["Trash should be left outside","Metal cannot be recycled","Small detail"]
    },
    {
      q:"Every Saturday, Maya visits the community garden. She waters tomatoes, pulls weeds, and helps collect vegetables for families. What is the main idea?",
      a:"Maya helps at a community garden",
      w:["Maya dislikes vegetables","Families only grow flowers","Roots"]
    },
    {
      q:"Dolphins communicate using clicks and whistles. They also work together to find food and protect one another. What is the main idea?",
      a:"Dolphins communicate and work together",
      w:["Dolphins live in trees","Dolphins cannot hear","Small detail"]
    },
    {
      q:"Recycling paper, plastic, and metal reduces trash. It also helps save natural resources. What is the main idea?",
      a:"Recycling helps the environment",
      w:["Trash should be left outside","Metal cannot be recycled","Small detail"]
    },
    {
      q:"Every Saturday, Maya visits the community garden. She waters tomatoes, pulls weeds, and helps collect vegetables for families. What is the main idea?",
      a:"Maya helps at a community garden",
      w:["Maya dislikes vegetables","Families only grow flowers","Roots"]
    },
    {
      q:"Dolphins communicate using clicks and whistles. They also work together to find food and protect one another. What is the main idea?",
      a:"Dolphins communicate and work together",
      w:["Dolphins live in trees","Dolphins cannot hear","Small detail"]
    },
    {
      q:"Recycling paper, plastic, and metal reduces trash. It also helps save natural resources. What is the main idea?",
      a:"Recycling helps the environment",
      w:["Trash should be left outside","Metal cannot be recycled","Small detail"]
    },
    {
      q:"Every Saturday, Maya visits the community garden. She waters tomatoes, pulls weeds, and helps collect vegetables for families. What is the main idea?",
      a:"Maya helps at a community garden",
      w:["Maya dislikes vegetables","Families only grow flowers","Roots"]
    }
  ], "Choose the main idea.");
}


/* ---------- L5: SUPPORTING DETAILS ---------- */
function gen_g5_eng_L5(){
  return g5Question([
    {
      q:"Main idea: Bees are important pollinators. Which detail supports the main idea?",
      a:"Bees move pollen between flowers",
      w:["Bees are yellow and black","Some people wear hats","Roots"]
    },
    {
      q:"Main idea: Reading every day improves skills. Which detail supports the main idea?",
      a:"Daily reading builds vocabulary",
      w:["Books can have colorful covers","Libraries have chairs","Unrelated meaning"]
    },
    {
      q:"Main idea: Exercise benefits the body. Which detail supports the main idea?",
      a:"Exercise helps strengthen muscles",
      w:["Sneakers come in many colors","Sports teams have names","Small detail"]
    },
    {
      q:"Main idea: Bees are important pollinators. Which detail supports the main idea?",
      a:"Bees move pollen between flowers",
      w:["Bees are yellow and black","Some people wear hats","Roots"]
    },
    {
      q:"Main idea: Reading every day improves skills. Which detail supports the main idea?",
      a:"Daily reading builds vocabulary",
      w:["Books can have colorful covers","Libraries have chairs","Unrelated meaning"]
    },
    {
      q:"Main idea: Exercise benefits the body. Which detail supports the main idea?",
      a:"Exercise helps strengthen muscles",
      w:["Sneakers come in many colors","Sports teams have names","Small detail"]
    },
    {
      q:"Main idea: Bees are important pollinators. Which detail supports the main idea?",
      a:"Bees move pollen between flowers",
      w:["Bees are yellow and black","Some people wear hats","Roots"]
    },
    {
      q:"Main idea: Reading every day improves skills. Which detail supports the main idea?",
      a:"Daily reading builds vocabulary",
      w:["Books can have colorful covers","Libraries have chairs","Unrelated meaning"]
    },
    {
      q:"Main idea: Exercise benefits the body. Which detail supports the main idea?",
      a:"Exercise helps strengthen muscles",
      w:["Sneakers come in many colors","Sports teams have names","Small detail"]
    },
    {
      q:"Main idea: Bees are important pollinators. Which detail supports the main idea?",
      a:"Bees move pollen between flowers",
      w:["Bees are yellow and black","Some people wear hats","Roots"]
    }
  ], "Select the supporting detail.");
}


/* ---------- L6: AUTHOR'S PURPOSE ---------- */
function gen_g5_eng_L6(){
  return g5Question([
    {
      q:"A passage explains how tornadoes form and how to stay safe. The author's purpose is to…",
      a:"Inform",
      w:["Entertain with a fairy tale","Persuade you to buy shoes","Cover color"]
    },
    {
      q:"An advertisement says, 'Choose Bright Bike Helmets for the safest ride!' The author's purpose is to…",
      a:"Persuade",
      w:["Inform about dinosaurs","Entertain with a mystery","Cover color"]
    },
    {
      q:"A funny story describes a dog that learns to skateboard. The author's purpose is to…",
      a:"Entertain",
      w:["Persuade you to recycle","Inform about weather","Cover color"]
    },
    {
      q:"A passage explains how tornadoes form and how to stay safe. The author's purpose is to…",
      a:"Inform",
      w:["Entertain with a fairy tale","Persuade you to buy shoes","Cover color"]
    },
    {
      q:"An advertisement says, 'Choose Bright Bike Helmets for the safest ride!' The author's purpose is to…",
      a:"Persuade",
      w:["Inform about dinosaurs","Entertain with a mystery","Cover color"]
    },
    {
      q:"A funny story describes a dog that learns to skateboard. The author's purpose is to…",
      a:"Entertain",
      w:["Persuade you to recycle","Inform about weather","Cover color"]
    },
    {
      q:"A passage explains how tornadoes form and how to stay safe. The author's purpose is to…",
      a:"Inform",
      w:["Entertain with a fairy tale","Persuade you to buy shoes","Cover color"]
    },
    {
      q:"An advertisement says, 'Choose Bright Bike Helmets for the safest ride!' The author's purpose is to…",
      a:"Persuade",
      w:["Inform about dinosaurs","Entertain with a mystery","Cover color"]
    },
    {
      q:"A funny story describes a dog that learns to skateboard. The author's purpose is to…",
      a:"Entertain",
      w:["Persuade you to recycle","Inform about weather","Cover color"]
    },
    {
      q:"A passage explains how tornadoes form and how to stay safe. The author's purpose is to…",
      a:"Inform",
      w:["Entertain with a fairy tale","Persuade you to buy shoes","Cover color"]
    }
  ], "Determine the author's purpose.");
}


/* ---------- L7: CONTEXT CLUES ---------- */
function gen_g5_eng_L7(){
  return g5Question([
    {
      q:'The desert was ARID, with almost no rain and very few plants. What does "arid" mean?',
      a:"Very dry",
      w:["Very cold","Very crowded","Roots"]
    },
    {
      q:'Lena was RELUCTANT to jump into the pool because the water looked cold. What does "reluctant" mean?',
      a:"Not willing at first",
      w:["Very excited","Ready immediately","Median"]
    },
    {
      q:'The glass vase was FRAGILE, so we carried it carefully. What does "fragile" mean?',
      a:"Easily broken",
      w:["Very heavy","Full of water","Median"]
    },
    {
      q:'The audience was SILENT during the speech; no one made a sound. What does "silent" mean?',
      a:"Quiet",
      w:["Angry","Confused","Plain"]
    },
    {
      q:'The desert was ARID, with almost no rain and very few plants. What does "arid" mean?',
      a:"Very dry",
      w:["Very cold","Very crowded","Roots"]
    },
    {
      q:'Lena was RELUCTANT to jump into the pool because the water looked cold. What does "reluctant" mean?',
      a:"Not willing at first",
      w:["Very excited","Ready immediately","Median"]
    },
    {
      q:'The glass vase was FRAGILE, so we carried it carefully. What does "fragile" mean?',
      a:"Easily broken",
      w:["Very heavy","Full of water","Median"]
    },
    {
      q:'The audience was SILENT during the speech; no one made a sound. What does "silent" mean?',
      a:"Quiet",
      w:["Angry","Confused","Plain"]
    },
    {
      q:'The desert was ARID, with almost no rain and very few plants. What does "arid" mean?',
      a:"Very dry",
      w:["Very cold","Very crowded","Roots"]
    },
    {
      q:'Lena was RELUCTANT to jump into the pool because the water looked cold. What does "reluctant" mean?',
      a:"Not willing at first",
      w:["Very excited","Ready immediately","Median"]
    }
  ], "Use context clues.");
}


/* ---------- L8: SYNONYMS AND ANTONYMS ---------- */
function gen_g5_eng_L8(){
  return g5Question([
    {
      q:"Choose the synonym for RAPID.",
      a:"Quick",
      w:["Slow","Quiet","Unrelated meaning"]
    },
    {
      q:"Choose the antonym for GENEROUS.",
      a:"Selfish",
      w:["Kind","Giving","Reptile"]
    },
    {
      q:"Choose the synonym for ANCIENT.",
      a:"Very old",
      w:["Brand new","Very loud","Unrelated meaning"]
    },
    {
      q:"Choose the antonym for SCARCE.",
      a:"Abundant",
      w:["Limited","Rare","Unrelated meaning"]
    },
    {
      q:"Choose the synonym for RAPID.",
      a:"Quick",
      w:["Slow","Quiet","Unrelated meaning"]
    },
    {
      q:"Choose the antonym for GENEROUS.",
      a:"Selfish",
      w:["Kind","Giving","Reptile"]
    },
    {
      q:"Choose the synonym for ANCIENT.",
      a:"Very old",
      w:["Brand new","Very loud","Unrelated meaning"]
    },
    {
      q:"Choose the antonym for SCARCE.",
      a:"Abundant",
      w:["Limited","Rare","Unrelated meaning"]
    },
    {
      q:"Choose the synonym for RAPID.",
      a:"Quick",
      w:["Slow","Quiet","Unrelated meaning"]
    },
    {
      q:"Choose the antonym for GENEROUS.",
      a:"Selfish",
      w:["Kind","Giving","Reptile"]
    }
  ], "Choose the matching word meaning.");
}


/* ---------- L9: PREFIXES AND SUFFIXES ---------- */
function gen_g5_eng_L9(){
  return g5Question([
    {
      q:'What does the prefix "re-" mean in REBUILD?',
      a:"Again",
      w:["Not","Before","Plain"]
    },
    {
      q:'What does the prefix "un-" mean in UNFAIR?',
      a:"Not",
      w:["Full of","After","Plain"]
    },
    {
      q:'What does the suffix "-less" mean in CARELESS?',
      a:"Without",
      w:["Full of","One who","Plain"]
    },
    {
      q:'What does the suffix "-ful" mean in HELPFUL?',
      a:"Full of",
      w:["Without","Before","Plain"]
    },
    {
      q:'What does the prefix "re-" mean in REBUILD?',
      a:"Again",
      w:["Not","Before","Plain"]
    },
    {
      q:'What does the prefix "un-" mean in UNFAIR?',
      a:"Not",
      w:["Full of","After","Plain"]
    },
    {
      q:'What does the suffix "-less" mean in CARELESS?',
      a:"Without",
      w:["Full of","One who","Plain"]
    },
    {
      q:'What does the suffix "-ful" mean in HELPFUL?',
      a:"Full of",
      w:["Without","Before","Plain"]
    },
    {
      q:'What does the prefix "re-" mean in REBUILD?',
      a:"Again",
      w:["Not","Before","Plain"]
    },
    {
      q:'What does the prefix "un-" mean in UNFAIR?',
      a:"Not",
      w:["Full of","After","Plain"]
    }
  ], "Find the meaning of the word part.");
}


/* ---------- L10: SUBJECT AND PREDICATE ---------- */
function gen_g5_eng_L10(){
  return g5Question([
    {
      q:'In the sentence "The spotted puppy chased the ball," what is the complete subject?',
      a:"The spotted puppy",
      w:["Chased the ball","The ball","Adverb"]
    },
    {
      q:'In the sentence "Our science class built a model volcano," what is the complete predicate?',
      a:"Built a model volcano",
      w:["Our science class","Model volcano","Adverb"]
    },
    {
      q:'In the sentence "The tall oak tree shaded the picnic table," what is the complete subject?',
      a:"The tall oak tree",
      w:["Shaded the picnic table","The picnic table","Adverb"]
    },
    {
      q:'In the sentence "My little brother cleaned his room," what is the complete predicate?',
      a:"Cleaned his room",
      w:["My little brother","His room","Adverb"]
    },
    {
      q:'In the sentence "The spotted puppy chased the ball," what is the complete subject?',
      a:"The spotted puppy",
      w:["Chased the ball","The ball","Adverb"]
    },
    {
      q:'In the sentence "Our science class built a model volcano," what is the complete predicate?',
      a:"Built a model volcano",
      w:["Our science class","Model volcano","Adverb"]
    },
    {
      q:'In the sentence "The tall oak tree shaded the picnic table," what is the complete subject?',
      a:"The tall oak tree",
      w:["Shaded the picnic table","The picnic table","Adverb"]
    },
    {
      q:'In the sentence "My little brother cleaned his room," what is the complete predicate?',
      a:"Cleaned his room",
      w:["My little brother","His room","Adverb"]
    },
    {
      q:'In the sentence "The spotted puppy chased the ball," what is the complete subject?',
      a:"The spotted puppy",
      w:["Chased the ball","The ball","Adverb"]
    },
    {
      q:'In the sentence "Our science class built a model volcano," what is the complete predicate?',
      a:"Built a model volcano",
      w:["Our science class","Model volcano","Adverb"]
    }
  ], "Identify the requested sentence part.");
}


/* ---------- L11: VERB TENSE ---------- */
function gen_g5_eng_L11(){
  return g5Question([
    {
      q:"Choose the sentence written in PAST tense.",
      a:"The team won the game yesterday.",
      w:["The team will win tomorrow.","The team wins often.","Adverb"]
    },
    {
      q:"Choose the sentence written in FUTURE tense.",
      a:"We will visit the museum.",
      w:["We visited the museum.","We visit the museum.","Adverb"]
    },
    {
      q:"Which word correctly completes the sentence? Yesterday, Mia ___ her bicycle.",
      a:"Rode",
      w:["Rides","Will ride","Adverb"]
    },
    {
      q:"Which word correctly completes the sentence? Tomorrow, I ___ my project.",
      a:"Will finish",
      w:["Finished","Finishing yesterday","Adverb"]
    },
    {
      q:"Choose the sentence written in PAST tense.",
      a:"The team won the game yesterday.",
      w:["The team will win tomorrow.","The team wins often.","Adverb"]
    },
    {
      q:"Choose the sentence written in FUTURE tense.",
      a:"We will visit the museum.",
      w:["We visited the museum.","We visit the museum.","Adverb"]
    },
    {
      q:"Which word correctly completes the sentence? Yesterday, Mia ___ her bicycle.",
      a:"Rode",
      w:["Rides","Will ride","Adverb"]
    },
    {
      q:"Which word correctly completes the sentence? Tomorrow, I ___ my project.",
      a:"Will finish",
      w:["Finished","Finishing yesterday","Adverb"]
    },
    {
      q:"Choose the sentence written in PAST tense.",
      a:"The team won the game yesterday.",
      w:["The team will win tomorrow.","The team wins often.","Adverb"]
    },
    {
      q:"Choose the sentence written in FUTURE tense.",
      a:"We will visit the museum.",
      w:["We visited the museum.","We visit the museum.","Adverb"]
    }
  ], "Choose the correct verb tense.");
}


/* ---------- L12: PUNCTUATION ---------- */
function gen_g5_eng_L12(){
  return g5Question([
    {
      q:"Which sentence uses a comma correctly?",
      a:"After lunch, we went outside.",
      w:["After, lunch we went outside.","After lunch we, went outside.","After lunch we went outside,"]
    },
    {
      q:"Which sentence is punctuated correctly?",
      a:'MIA SAID, "I FOUND MY BOOK!"',
      w:['MIA SAID "I FOUND MY BOOK!','MIA SAID, I FOUND MY BOOK!"','MIA SAID, "I FOUND MY BOOK"!']
    },
    {
      q:"Which sentence uses an apostrophe correctly?",
      a:"The dog's leash is blue.",
      w:["The dogs leash is blue.","The dogs' leash is blue for one dog.","The dog leash's is blue."]
    },
    {
      q:"Which sentence uses a colon correctly?",
      a:"I need three items: paper, glue, and scissors.",
      w:["I need: three items paper, glue, and scissors.","I: need three items paper and glue.","I need three items paper: glue and scissors."]
    },
    {
      q:"Which sentence uses a comma correctly?",
      a:"After lunch, we went outside.",
      w:["After, lunch we went outside.","After lunch we, went outside.","After lunch we went outside,"]
    },
    {
      q:"Which sentence is punctuated correctly?",
      a:'MIA SAID, "I FOUND MY BOOK!"',
      w:['MIA SAID "I FOUND MY BOOK!','MIA SAID, I FOUND MY BOOK!"','MIA SAID, "I FOUND MY BOOK"!']
    },
    {
      q:"Which sentence uses an apostrophe correctly?",
      a:"The dog's leash is blue.",
      w:["The dogs leash is blue.","The dogs' leash is blue for one dog.","The dog leash's is blue."]
    },
    {
      q:"Which sentence uses a colon correctly?",
      a:"I need three items: paper, glue, and scissors.",
      w:["I need: three items paper, glue, and scissors.","I: need three items paper and glue.","I need three items paper: glue and scissors."]
    },
    {
      q:"Which sentence uses a comma correctly?",
      a:"After lunch, we went outside.",
      w:["After, lunch we went outside.","After lunch we, went outside.","After lunch we went outside,"]
    },
    {
      q:"Which sentence is punctuated correctly?",
      a:'MIA SAID, "I FOUND MY BOOK!"',
      w:['MIA SAID "I FOUND MY BOOK!','MIA SAID, I FOUND MY BOOK!"','MIA SAID, "I FOUND MY BOOK"!']
    }
  ], "Choose the sentence with correct punctuation.");
}



/* ---------- GRADE 5 MATH ---------- */
function gen_g5_math_L1(){
  const a = randInt(1,9);
  const b = randInt(1,9);
  const q = `What is ${a}.${b} + 0.${a} ?`;
  const ans = (a + b/10 + a/10).toFixed(1);
  const opts = shuffle([ans, (Number(ans)+0.1).toFixed(1), (Number(ans)-0.1).toFixed(1)]);
  return mcQuestion(q, ans, opts.filter(x=>x!==ans).slice(0,2), "Add decimals.");
}
function gen_g5_math_L2(){
  const it = pick([
    {q:"1/2 + 1/4 = ?", a:"3/4", w:["2/6","1/6","4/4"]},
    {q:"3/4 − 1/4 = ?", a:"2/4", w:["1/4","3/8","4/4"]},
    {q:"1/3 + 1/3 = ?", a:"2/3", w:["1/6","3/3","4/4"]},
    {q:"1/2 + 1/4 = ?", a:"3/4", w:["2/6","1/6","4/4"]},
    {q:"3/4 − 1/4 = ?", a:"2/4", w:["1/4","3/8","4/4"]},
    {q:"1/3 + 1/3 = ?", a:"2/3", w:["1/6","3/3","4/4"]},
    {q:"1/2 + 1/4 = ?", a:"3/4", w:["2/6","1/6","4/4"]},
    {q:"3/4 − 1/4 = ?", a:"2/4", w:["1/4","3/8","4/4"]},
    {q:"1/3 + 1/3 = ?", a:"2/3", w:["1/6","3/3","4/4"]},
    {q:"1/2 + 1/4 = ?", a:"3/4", w:["2/6","1/6","4/4"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Fraction operation.");
}
function gen_g5_math_L3(){
  const a = randInt(2,9), b = randInt(2,9), c = randInt(2,9);
  const q = `${a} + ${b} × ${c} = ?`;
  const ans = a + b*c;
  const opts = make3Choices(ans, 0, 200).map(String);
  return mcQuestion(q, String(ans), opts.filter(x=>x!==String(ans)).slice(0,2), "Use order of operations.");
}
/* =========================================================
   GRADE 5 MATH - NEW LESSONS L4 TO L11
========================================================= */

/* ---------- L4: DECIMAL PLACE VALUE ---------- */
function gen_g5_math_L4(){
  return g5Question([
    {
      q:"In the number 4.672, what digit is in the HUNDREDTHS place?",
      a:"7",
      w:["6","2","8"]
    },
    {
      q:"In the number 18.305, what digit is in the TENTHS place?",
      a:"3",
      w:["0","5","4"]
    },
    {
      q:"In the number 9.481, what digit is in the THOUSANDTHS place?",
      a:"1",
      w:["8","4","2"]
    },
    {
      q:"In the number 62.94, what digit is in the ONES place?",
      a:"2",
      w:["6","9","3"]
    },
    {
      q:"In the number 4.672, what digit is in the HUNDREDTHS place?",
      a:"7",
      w:["6","2","8"]
    },
    {
      q:"In the number 18.305, what digit is in the TENTHS place?",
      a:"3",
      w:["0","5","4"]
    },
    {
      q:"In the number 9.481, what digit is in the THOUSANDTHS place?",
      a:"1",
      w:["8","4","2"]
    },
    {
      q:"In the number 62.94, what digit is in the ONES place?",
      a:"2",
      w:["6","9","3"]
    },
    {
      q:"In the number 4.672, what digit is in the HUNDREDTHS place?",
      a:"7",
      w:["6","2","8"]
    },
    {
      q:"In the number 18.305, what digit is in the TENTHS place?",
      a:"3",
      w:["0","5","4"]
    }
  ], "Find the digit in the named place.");
}


/* ---------- L5: COMPARE DECIMALS ---------- */
function gen_g5_math_L5(){
  return g5Question([
    {
      q:"Which number is greater?",
      a:"4.75",
      w:["4.57","4.07","5.75"]
    },
    {
      q:"Which number is smallest?",
      a:"0.38",
      w:["0.83","0.68","1.38"]
    },
    {
      q:"Which symbol makes this true? 6.41 ___ 6.14",
      a:">",
      w:["<","=","True"]
    },
    {
      q:"Which symbol makes this true? 2.500 ___ 2.5",
      a:"=",
      w:[">","<","True"]
    },
    {
      q:"Which number is greater?",
      a:"4.75",
      w:["4.57","4.07","5.75"]
    },
    {
      q:"Which number is smallest?",
      a:"0.38",
      w:["0.83","0.68","1.38"]
    },
    {
      q:"Which symbol makes this true? 6.41 ___ 6.14",
      a:">",
      w:["<","=","True"]
    },
    {
      q:"Which symbol makes this true? 2.500 ___ 2.5",
      a:"=",
      w:[">","<","True"]
    },
    {
      q:"Which number is greater?",
      a:"4.75",
      w:["4.57","4.07","5.75"]
    },
    {
      q:"Which number is smallest?",
      a:"0.38",
      w:["0.83","0.68","1.38"]
    }
  ], "Compare the decimal numbers.");
}


/* ---------- L6: EQUIVALENT FRACTIONS ---------- */
function gen_g5_math_L6(){
  return g5Question([
    {
      q:"Which fraction is equivalent to 1/2?",
      a:"4/8",
      w:["3/8","5/8","1/2"]
    },
    {
      q:"Which fraction is equivalent to 3/4?",
      a:"6/8",
      w:["4/8","7/8","1/2"]
    },
    {
      q:"Which fraction is equivalent to 2/3?",
      a:"4/6",
      w:["3/6","5/6","1/2"]
    },
    {
      q:"Which fraction is equivalent to 1/5?",
      a:"2/10",
      w:["3/10","5/10","1/2"]
    },
    {
      q:"Which fraction is equivalent to 1/2?",
      a:"4/8",
      w:["3/8","5/8","1/2"]
    },
    {
      q:"Which fraction is equivalent to 3/4?",
      a:"6/8",
      w:["4/8","7/8","1/2"]
    },
    {
      q:"Which fraction is equivalent to 2/3?",
      a:"4/6",
      w:["3/6","5/6","1/2"]
    },
    {
      q:"Which fraction is equivalent to 1/5?",
      a:"2/10",
      w:["3/10","5/10","1/2"]
    },
    {
      q:"Which fraction is equivalent to 1/2?",
      a:"4/8",
      w:["3/8","5/8","1/2"]
    },
    {
      q:"Which fraction is equivalent to 3/4?",
      a:"6/8",
      w:["4/8","7/8","1/2"]
    }
  ], "Find the equivalent fraction.");
}


/* ---------- L7: MIXED NUMBERS ---------- */
function gen_g5_math_L7(){
  return g5Question([
    {
      q:"Convert 7/4 to a mixed number.",
      a:"1 3/4",
      w:["2 1/4","1 1/4","Number"]
    },
    {
      q:"Convert 11/3 to a mixed number.",
      a:"3 2/3",
      w:["2 3/3","4 1/3","Number"]
    },
    {
      q:"Convert 2 1/2 to an improper fraction.",
      a:"5/2",
      w:["3/2","4/2","1/2"]
    },
    {
      q:"Convert 3 3/4 to an improper fraction.",
      a:"15/4",
      w:["12/4","14/4","1/2"]
    },
    {
      q:"Convert 7/4 to a mixed number.",
      a:"1 3/4",
      w:["2 1/4","1 1/4","Number"]
    },
    {
      q:"Convert 11/3 to a mixed number.",
      a:"3 2/3",
      w:["2 3/3","4 1/3","Number"]
    },
    {
      q:"Convert 2 1/2 to an improper fraction.",
      a:"5/2",
      w:["3/2","4/2","1/2"]
    },
    {
      q:"Convert 3 3/4 to an improper fraction.",
      a:"15/4",
      w:["12/4","14/4","1/2"]
    },
    {
      q:"Convert 7/4 to a mixed number.",
      a:"1 3/4",
      w:["2 1/4","1 1/4","Number"]
    },
    {
      q:"Convert 11/3 to a mixed number.",
      a:"3 2/3",
      w:["2 3/3","4 1/3","Number"]
    }
  ], "Work with mixed numbers.");
}


/* ---------- L8: VOLUME ---------- */
function gen_g5_math_L8(){
  return g5Question([
    {
      q:"A rectangular prism has length 4, width 3, and height 2. What is its volume?",
      a:"24 Cubic units",
      w:["12 Cubic units","18 Cubic units","Area"]
    },
    {
      q:"A box measures 5 × 2 × 3 units. What is its volume?",
      a:"30 Cubic units",
      w:["10 Cubic units","25 Cubic units","Area"]
    },
    {
      q:"A cube has side length 4 units. What is its volume?",
      a:"64 Cubic units",
      w:["16 Cubic units","48 Cubic units","Area"]
    },
    {
      q:"Which formula finds the volume of a rectangular prism?",
      a:"Length × width × height",
      w:["Length + width + height","Length × width","Area"]
    },
    {
      q:"A rectangular prism has length 4, width 3, and height 2. What is its volume?",
      a:"24 Cubic units",
      w:["12 Cubic units","18 Cubic units","Area"]
    },
    {
      q:"A box measures 5 × 2 × 3 units. What is its volume?",
      a:"30 Cubic units",
      w:["10 Cubic units","25 Cubic units","Area"]
    },
    {
      q:"A cube has side length 4 units. What is its volume?",
      a:"64 Cubic units",
      w:["16 Cubic units","48 Cubic units","Area"]
    },
    {
      q:"Which formula finds the volume of a rectangular prism?",
      a:"Length × width × height",
      w:["Length + width + height","Length × width","Area"]
    },
    {
      q:"A rectangular prism has length 4, width 3, and height 2. What is its volume?",
      a:"24 Cubic units",
      w:["12 Cubic units","18 Cubic units","Area"]
    },
    {
      q:"A box measures 5 × 2 × 3 units. What is its volume?",
      a:"30 Cubic units",
      w:["10 Cubic units","25 Cubic units","Area"]
    }
  ], "Find the volume.");
}


/* ---------- L9: COORDINATE PLANE ---------- */
function gen_g5_math_L9(){
  return g5Question([
    {
      q:"Which ordered pair names a point 3 units right and 5 units up from the origin?",
      a:"(3, 5)",
      w:["(5, 3)","(-3, 5)","Area"]
    },
    {
      q:"In the ordered pair (7, 2), what is the x-coordinate?",
      a:"7",
      w:["2","9","8"]
    },
    {
      q:"In the ordered pair (4, 9), what is the y-coordinate?",
      a:"9",
      w:["4","13","10"]
    },
    {
      q:"A point lies on the y-axis. Which could be its ordered pair?",
      a:"(0, 6)",
      w:["(6, 0)","(4, 6)","Area"]
    },
    {
      q:"Which ordered pair names a point 3 units right and 5 units up from the origin?",
      a:"(3, 5)",
      w:["(5, 3)","(-3, 5)","Area"]
    },
    {
      q:"In the ordered pair (7, 2), what is the x-coordinate?",
      a:"7",
      w:["2","9","8"]
    },
    {
      q:"In the ordered pair (4, 9), what is the y-coordinate?",
      a:"9",
      w:["4","13","10"]
    },
    {
      q:"A point lies on the y-axis. Which could be its ordered pair?",
      a:"(0, 6)",
      w:["(6, 0)","(4, 6)","Area"]
    },
    {
      q:"Which ordered pair names a point 3 units right and 5 units up from the origin?",
      a:"(3, 5)",
      w:["(5, 3)","(-3, 5)","Area"]
    },
    {
      q:"In the ordered pair (7, 2), what is the x-coordinate?",
      a:"7",
      w:["2","9","8"]
    }
  ], "Use the coordinate plane.");
}


/* ---------- L10: PATTERNS ---------- */
function gen_g5_math_L10(){
  return g5Question([
    {
      q:"What is the next number? 6, 12, 18, 24, ___",
      a:"30",
      w:["28","36","31"]
    },
    {
      q:"What is the next number? 100, 90, 80, 70, ___",
      a:"60",
      w:["50","75","61"]
    },
    {
      q:"The rule is multiply by 3. What comes after 4, 12, 36?",
      a:"108",
      w:["72","39","109"]
    },
    {
      q:"What rule describes this pattern? 5, 10, 15, 20",
      a:"Add 5",
      w:["Multiply by 5","Subtract 5","Sum"]
    },
    {
      q:"What is the next number? 6, 12, 18, 24, ___",
      a:"30",
      w:["28","36","31"]
    },
    {
      q:"What is the next number? 100, 90, 80, 70, ___",
      a:"60",
      w:["50","75","61"]
    },
    {
      q:"The rule is multiply by 3. What comes after 4, 12, 36?",
      a:"108",
      w:["72","39","109"]
    },
    {
      q:"What rule describes this pattern? 5, 10, 15, 20",
      a:"Add 5",
      w:["Multiply by 5","Subtract 5","Sum"]
    },
    {
      q:"What is the next number? 6, 12, 18, 24, ___",
      a:"30",
      w:["28","36","31"]
    },
    {
      q:"What is the next number? 100, 90, 80, 70, ___",
      a:"60",
      w:["50","75","61"]
    }
  ], "Find the number pattern.");
}


/* ---------- L11: WORD PROBLEMS ---------- */
function gen_g5_math_L11(){
  return g5Question([
    {
      q:"A school bought 24 boxes of pencils. Each box has 12 pencils. How many pencils did the school buy?",
      a:"288",
      w:["248","212","289"]
    },
    {
      q:"A runner completed 3.5 miles on Monday and 2.4 miles on Tuesday. How many miles altogether?",
      a:"5.9 Miles",
      w:["5.1 Miles","6.9 Miles","Miles"]
    },
    {
      q:"Four friends equally share 36 cookies. How many cookies does each friend get?",
      a:"9",
      w:["8","12","10"]
    },
    {
      q:"A tank holds 60 liters of water. 18 liters are used. How many liters remain?",
      a:"42 Liters",
      w:["48 Liters","32 Liters","Liters"]
    },
    {
      q:"A school bought 24 boxes of pencils. Each box has 12 pencils. How many pencils did the school buy?",
      a:"288",
      w:["248","212","289"]
    },
    {
      q:"A runner completed 3.5 miles on Monday and 2.4 miles on Tuesday. How many miles altogether?",
      a:"5.9 Miles",
      w:["5.1 Miles","6.9 Miles","Miles"]
    },
    {
      q:"Four friends equally share 36 cookies. How many cookies does each friend get?",
      a:"9",
      w:["8","12","10"]
    },
    {
      q:"A tank holds 60 liters of water. 18 liters are used. How many liters remain?",
      a:"42 Liters",
      w:["48 Liters","32 Liters","Liters"]
    },
    {
      q:"A school bought 24 boxes of pencils. Each box has 12 pencils. How many pencils did the school buy?",
      a:"288",
      w:["248","212","289"]
    },
    {
      q:"A runner completed 3.5 miles on Monday and 2.4 miles on Tuesday. How many miles altogether?",
      a:"5.9 Miles",
      w:["5.1 Miles","6.9 Miles","Miles"]
    }
  ], "Solve the word problem.");
}


/* ---------- GRADE 5 SCIENCE ---------- */
function gen_g5_sci_L1(){
  const it = pick([
    {q:"The planet closest to the Sun is…", a:"Mercury", w:["Mars","Saturn","Climate"]},
    {q:"Earth is the ___ planet from the Sun.", a:"Third", w:["Second","Fifth","Climate"]},
    {q:"The Sun is a…", a:"Star", w:["Planet","Comet","Climate"]},
    {q:"The planet closest to the Sun is…", a:"Mercury", w:["Mars","Saturn","Climate"]},
    {q:"Earth is the ___ planet from the Sun.", a:"Third", w:["Second","Fifth","Climate"]},
    {q:"The Sun is a…", a:"Star", w:["Planet","Comet","Climate"]},
    {q:"The planet closest to the Sun is…", a:"Mercury", w:["Mars","Saturn","Climate"]},
    {q:"Earth is the ___ planet from the Sun.", a:"Third", w:["Second","Fifth","Climate"]},
    {q:"The Sun is a…", a:"Star", w:["Planet","Comet","Climate"]},
    {q:"The planet closest to the Sun is…", a:"Mercury", w:["Mars","Saturn","Climate"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Solar system question.");
}
function gen_g5_sci_L2(){
  const it = pick([
    {q:"The cell part that controls the cell is the…", a:"Nucleus", w:["Wall","Tail","Organ system"]},
    {q:"Plant cells have a…", a:"Cell wall", w:["Wheels","Bones","Roots"]},
    {q:"The cell part that controls the cell is the…", a:"Nucleus", w:["Wall","Tail","Organ system"]},
    {q:"Plant cells have a…", a:"Cell wall", w:["Wheels","Bones","Roots"]},
    {q:"The cell part that controls the cell is the…", a:"Nucleus", w:["Wall","Tail","Organ system"]},
    {q:"Plant cells have a…", a:"Cell wall", w:["Wheels","Bones","Roots"]},
    {q:"The cell part that controls the cell is the…", a:"Nucleus", w:["Wall","Tail","Organ system"]},
    {q:"Plant cells have a…", a:"Cell wall", w:["Wheels","Bones","Roots"]},
    {q:"The cell part that controls the cell is the…", a:"Nucleus", w:["Wall","Tail","Organ system"]},
    {q:"Plant cells have a…", a:"Cell wall", w:["Wheels","Bones","Roots"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Cells question.");
}
function gen_g5_sci_L3(){
  const it = pick([
    {q:"Sand and water is a…", a:"Mixture", w:["Pure element","Star","Element"]},
    {q:"Dissolving sugar in water makes a…", a:"Solution", w:["Rock","Shadow","Climate"]},
    {q:"Sand and water is a…", a:"Mixture", w:["Pure element","Star","Element"]},
    {q:"Dissolving sugar in water makes a…", a:"Solution", w:["Rock","Shadow","Climate"]},
    {q:"Sand and water is a…", a:"Mixture", w:["Pure element","Star","Element"]},
    {q:"Dissolving sugar in water makes a…", a:"Solution", w:["Rock","Shadow","Climate"]},
    {q:"Sand and water is a…", a:"Mixture", w:["Pure element","Star","Element"]},
    {q:"Dissolving sugar in water makes a…", a:"Solution", w:["Rock","Shadow","Climate"]},
    {q:"Sand and water is a…", a:"Mixture", w:["Pure element","Star","Element"]},
    {q:"Dissolving sugar in water makes a…", a:"Solution", w:["Rock","Shadow","Climate"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Mixtures and solutions.");
}
function gen_g5_sci_L4(){
  return g5Question([
    {
      q:"What causes day and night on Earth?",
      a:"Earth rotating on its axis",
      w:["Earth changing size","The moon disappearing","Climate"]
    },
    {
      q:"About how long does one full Earth rotation take?",
      a:"24 Hours",
      w:["7 Days","365 Days","Climate"]
    },
    {
      q:"Earth's revolution around the Sun takes about…",
      a:"365 Days",
      w:["24 Hours","30 Minutes","Climate"]
    },
    {
      q:"The imaginary line Earth spins around is called its…",
      a:"Axis",
      w:["Crater","Shadow","Area"]
    },
    {
      q:"What causes day and night on Earth?",
      a:"Earth rotating on its axis",
      w:["Earth changing size","The moon disappearing","Climate"]
    },
    {
      q:"About how long does one full Earth rotation take?",
      a:"24 Hours",
      w:["7 Days","365 Days","Climate"]
    },
    {
      q:"Earth's revolution around the Sun takes about…",
      a:"365 Days",
      w:["24 Hours","30 Minutes","Climate"]
    },
    {
      q:"The imaginary line Earth spins around is called its…",
      a:"Axis",
      w:["Crater","Shadow","Area"]
    },
    {
      q:"What causes day and night on Earth?",
      a:"Earth rotating on its axis",
      w:["Earth changing size","The moon disappearing","Climate"]
    },
    {
      q:"About how long does one full Earth rotation take?",
      a:"24 Hours",
      w:["7 Days","365 Days","Climate"]
    }
  ], "Answer the Earth and space question.");
}


/* ---------- L5: WEATHER AND CLIMATE ---------- */
function gen_g5_sci_L5(){
  return g5Question([
    {
      q:"Weather describes conditions over a…",
      a:"Short period of time",
      w:["Very long period only","Distance in space","Climate"]
    },
    {
      q:"Climate describes the usual weather patterns of a place over…",
      a:"Many years",
      w:["A few minutes","One afternoon only","Climate"]
    },
    {
      q:"Which tool measures temperature?",
      a:"Thermometer",
      w:["Ruler","Compass","Temperature"]
    },
    {
      q:"Dark clouds, wind, and falling rain describe…",
      a:"Weather",
      w:["A food chain","A rock type","Climate"]
    },
    {
      q:"Weather describes conditions over a…",
      a:"Short period of time",
      w:["Very long period only","Distance in space","Climate"]
    },
    {
      q:"Climate describes the usual weather patterns of a place over…",
      a:"Many years",
      w:["A few minutes","One afternoon only","Climate"]
    },
    {
      q:"Which tool measures temperature?",
      a:"Thermometer",
      w:["Ruler","Compass","Temperature"]
    },
    {
      q:"Dark clouds, wind, and falling rain describe…",
      a:"Weather",
      w:["A food chain","A rock type","Climate"]
    },
    {
      q:"Weather describes conditions over a…",
      a:"Short period of time",
      w:["Very long period only","Distance in space","Climate"]
    },
    {
      q:"Climate describes the usual weather patterns of a place over…",
      a:"Many years",
      w:["A few minutes","One afternoon only","Climate"]
    }
  ], "Choose the correct weather or climate answer.");
}


/* ---------- L6: WATER CYCLE ---------- */
function gen_g5_sci_L6(){
  return g5Question([
    {
      q:"When liquid water changes into water vapor, it is called…",
      a:"Evaporation",
      w:["Precipitation","Collection","Friction"]
    },
    {
      q:"When water vapor cools and forms clouds, it is called…",
      a:"Condensation",
      w:["Erosion","Germination","Climate"]
    },
    {
      q:"Rain, snow, sleet, and hail are forms of…",
      a:"Precipitation",
      w:["Evaporation","Photosynthesis","Friction"]
    },
    {
      q:"Water gathering in lakes and oceans is called…",
      a:"Collection",
      w:["Condensation","Rotation","Topic detail"]
    },
    {
      q:"When liquid water changes into water vapor, it is called…",
      a:"Evaporation",
      w:["Precipitation","Collection","Friction"]
    },
    {
      q:"When water vapor cools and forms clouds, it is called…",
      a:"Condensation",
      w:["Erosion","Germination","Climate"]
    },
    {
      q:"Rain, snow, sleet, and hail are forms of…",
      a:"Precipitation",
      w:["Evaporation","Photosynthesis","Friction"]
    },
    {
      q:"Water gathering in lakes and oceans is called…",
      a:"Collection",
      w:["Condensation","Rotation","Topic detail"]
    },
    {
      q:"When liquid water changes into water vapor, it is called…",
      a:"Evaporation",
      w:["Precipitation","Collection","Friction"]
    },
    {
      q:"When water vapor cools and forms clouds, it is called…",
      a:"Condensation",
      w:["Erosion","Germination","Climate"]
    }
  ], "Identify the water cycle stage.");
}


/* ---------- L7: PLANT SYSTEMS ---------- */
function gen_g5_sci_L7(){
  return g5Question([
    {
      q:"Which plant part absorbs water from the soil?",
      a:"Roots",
      w:["Flowers","Fruit","Stem"]
    },
    {
      q:"Which plant part carries water from the roots upward?",
      a:"Stem",
      w:["Seed","Petal","Roots"]
    },
    {
      q:"Plants use sunlight to make food through…",
      a:"Photosynthesis",
      w:["Hibernation","Erosion","Roots"]
    },
    {
      q:"Which gas do plants take in to make food?",
      a:"Carbon dioxide",
      w:["Helium","Steam","Friction"]
    },
    {
      q:"Which plant part absorbs water from the soil?",
      a:"Roots",
      w:["Flowers","Fruit","Stem"]
    },
    {
      q:"Which plant part carries water from the roots upward?",
      a:"Stem",
      w:["Seed","Petal","Roots"]
    },
    {
      q:"Plants use sunlight to make food through…",
      a:"Photosynthesis",
      w:["Hibernation","Erosion","Roots"]
    },
    {
      q:"Which gas do plants take in to make food?",
      a:"Carbon dioxide",
      w:["Helium","Steam","Friction"]
    },
    {
      q:"Which plant part absorbs water from the soil?",
      a:"Roots",
      w:["Flowers","Fruit","Stem"]
    },
    {
      q:"Which plant part carries water from the roots upward?",
      a:"Stem",
      w:["Seed","Petal","Roots"]
    }
  ], "Choose the correct plant system answer.");
}


/* ---------- L8: FOOD CHAINS ---------- */
function gen_g5_sci_L8(){
  return g5Question([
    {
      q:"In a food chain, plants are called…",
      a:"Producers",
      w:["Predators only","Decomposers only","Reptile"]
    },
    {
      q:"Which organism is a consumer?",
      a:"Rabbit",
      w:["Grass","Sunlight","Roots"]
    },
    {
      q:"In the chain grass → rabbit → fox, what eats the rabbit?",
      a:"Fox",
      w:["Grass","Sun","Rabbit"]
    },
    {
      q:"Mushrooms that break down dead material are…",
      a:"Decomposers",
      w:["Planets","Minerals","Climate"]
    },
    {
      q:"In a food chain, plants are called…",
      a:"Producers",
      w:["Predators only","Decomposers only","Reptile"]
    },
    {
      q:"Which organism is a consumer?",
      a:"Rabbit",
      w:["Grass","Sunlight","Roots"]
    },
    {
      q:"In the chain grass → rabbit → fox, what eats the rabbit?",
      a:"Fox",
      w:["Grass","Sun","Rabbit"]
    },
    {
      q:"Mushrooms that break down dead material are…",
      a:"Decomposers",
      w:["Planets","Minerals","Climate"]
    },
    {
      q:"In a food chain, plants are called…",
      a:"Producers",
      w:["Predators only","Decomposers only","Reptile"]
    },
    {
      q:"Which organism is a consumer?",
      a:"Rabbit",
      w:["Grass","Sunlight","Roots"]
    }
  ], "Answer the food chain question.");
}


/* ---------- L9: PHYSICAL CHANGES ---------- */
function gen_g5_sci_L9(){
  return g5Question([
    {
      q:"Which is a physical change?",
      a:"Ice melting",
      w:["Wood burning","Metal rusting","Friction"]
    },
    {
      q:"Cutting paper into smaller pieces is a…",
      a:"Physical change",
      w:["Chemical change","Weather pattern","Climate"]
    },
    {
      q:"Which change forms a new substance?",
      a:"Chemical change",
      w:["Physical change","Size change only","4/4"]
    },
    {
      q:"Dissolving sugar in water is usually considered a…",
      a:"Physical change",
      w:["Planetary change","Life cycle","Larva"]
    },
    {
      q:"Which is a physical change?",
      a:"Ice melting",
      w:["Wood burning","Metal rusting","Friction"]
    },
    {
      q:"Cutting paper into smaller pieces is a…",
      a:"Physical change",
      w:["Chemical change","Weather pattern","Climate"]
    },
    {
      q:"Which change forms a new substance?",
      a:"Chemical change",
      w:["Physical change","Size change only","4/4"]
    },
    {
      q:"Dissolving sugar in water is usually considered a…",
      a:"Physical change",
      w:["Planetary change","Life cycle","Larva"]
    },
    {
      q:"Which is a physical change?",
      a:"Ice melting",
      w:["Wood burning","Metal rusting","Friction"]
    },
    {
      q:"Cutting paper into smaller pieces is a…",
      a:"Physical change",
      w:["Chemical change","Weather pattern","Climate"]
    }
  ], "Identify the type of change.");
}


/* ---------- L10: FORCE AND MOTION ---------- */
function gen_g5_sci_L10(){
  return g5Question([
    {
      q:"A push or a pull is called a…",
      a:"Force",
      w:["Cell","Climate","Gravity"]
    },
    {
      q:"What force pulls objects toward Earth?",
      a:"Gravity",
      w:["Evaporation","Magnetism only in clouds","Friction"]
    },
    {
      q:"Friction usually causes a moving object to…",
      a:"Slow down",
      w:["Grow larger","Turn into water","Gravity"]
    },
    {
      q:"A stronger push on a ball usually makes it move…",
      a:"Faster",
      w:["Into a plant","Without direction","Roots"]
    },
    {
      q:"A push or a pull is called a…",
      a:"Force",
      w:["Cell","Climate","Gravity"]
    },
    {
      q:"What force pulls objects toward Earth?",
      a:"Gravity",
      w:["Evaporation","Magnetism only in clouds","Friction"]
    },
    {
      q:"Friction usually causes a moving object to…",
      a:"Slow down",
      w:["Grow larger","Turn into water","Gravity"]
    },
    {
      q:"A stronger push on a ball usually makes it move…",
      a:"Faster",
      w:["Into a plant","Without direction","Roots"]
    },
    {
      q:"A push or a pull is called a…",
      a:"Force",
      w:["Cell","Climate","Gravity"]
    },
    {
      q:"What force pulls objects toward Earth?",
      a:"Gravity",
      w:["Evaporation","Magnetism only in clouds","Friction"]
    }
  ], "Answer the force and motion question.");
}


/* ---------- L11: FORMS OF ENERGY ---------- */
function gen_g5_sci_L11(){
  return g5Question([
    {
      q:"Energy from the Sun that we can see is called…",
      a:"Light energy",
      w:["Soil energy","Root energy","Roots"]
    },
    {
      q:"A ringing bell produces mostly…",
      a:"Sound energy",
      w:["Plant energy","Weather energy","Roots"]
    },
    {
      q:"A toaster changes electrical energy mainly into…",
      a:"Heat energy",
      w:["Moon energy","Wind only","Gravity"]
    },
    {
      q:"A moving bicycle has…",
      a:"Mechanical energy",
      w:["Cell wall energy","Precipitation energy","Gravity"]
    },
    {
      q:"Energy from the Sun that we can see is called…",
      a:"Light energy",
      w:["Soil energy","Root energy","Roots"]
    },
    {
      q:"A ringing bell produces mostly…",
      a:"Sound energy",
      w:["Plant energy","Weather energy","Roots"]
    },
    {
      q:"A toaster changes electrical energy mainly into…",
      a:"Heat energy",
      w:["Moon energy","Wind only","Gravity"]
    },
    {
      q:"A moving bicycle has…",
      a:"Mechanical energy",
      w:["Cell wall energy","Precipitation energy","Gravity"]
    },
    {
      q:"Energy from the Sun that we can see is called…",
      a:"Light energy",
      w:["Soil energy","Root energy","Roots"]
    },
    {
      q:"A ringing bell produces mostly…",
      a:"Sound energy",
      w:["Plant energy","Weather energy","Roots"]
    }
  ], "Identify the form of energy.");
}
/* ---------- GRADE 6 ENGLISH ---------- */
function gen_g6_eng_L1(){
  const it = pick([
    {t:"Jordan practiced every day. He made mistakes, but he kept trying. Soon he improved.", a:"Practice helps you improve.", w:["Never practice.","Mistakes mean stop.","Trying is useless."]},
    {t:"The friends shared supplies and worked together to finish the project on time.", a:"Teamwork can lead to success.", w:["Work alone always.","Sharing is bad.","Teamwork slows everyone down."]},
    {t:"Jordan practiced every day. He made mistakes, but he kept trying. Soon he improved.", a:"Practice helps you improve.", w:["Never practice.","Mistakes mean stop.","Trying is useless."]},
    {t:"The friends shared supplies and worked together to finish the project on time.", a:"Teamwork can lead to success.", w:["Work alone always.","Sharing is bad.","Teamwork slows everyone down."]},
    {t:"Jordan practiced every day. He made mistakes, but he kept trying. Soon he improved.", a:"Practice helps you improve.", w:["Never practice.","Mistakes mean stop.","Trying is useless."]},
    {t:"The friends shared supplies and worked together to finish the project on time.", a:"Teamwork can lead to success.", w:["Work alone always.","Sharing is bad.","Teamwork slows everyone down."]},
    {t:"Jordan practiced every day. He made mistakes, but he kept trying. Soon he improved.", a:"Practice helps you improve.", w:["Never practice.","Mistakes mean stop.","Trying is useless."]},
    {t:"The friends shared supplies and worked together to finish the project on time.", a:"Teamwork can lead to success.", w:["Work alone always.","Sharing is bad.","Teamwork slows everyone down."]},
    {t:"Jordan practiced every day. He made mistakes, but he kept trying. Soon he improved.", a:"Practice helps you improve.", w:["Never practice.","Mistakes mean stop.","Trying is useless."]},
    {t:"The friends shared supplies and worked together to finish the project on time.", a:"Teamwork can lead to success.", w:["Work alone always.","Sharing is bad.","Teamwork slows everyone down."]}
  ]);
  const q = `${it.t}\n\nWhich statement best shows the THEME?`;
  return mcQuestion(q, it.a, it.w, "Choose the theme.");
}
function gen_g6_eng_L2(){
  const it = pick([
    {q:'"The trail was TREACHEROUS, so we walked carefully." TREACHEROUS means…', a:"Dangerous", w:["Easy","Funny","Unrelated meaning"]},
    {q:'"The room was DIM, so it was hard to see." DIM means…', a:"Not bright", w:["Very loud","Very fast","Unrelated meaning"]},
    {q:'"The trail was TREACHEROUS, so we walked carefully." TREACHEROUS means…', a:"Dangerous", w:["Easy","Funny","Unrelated meaning"]},
    {q:'"The room was DIM, so it was hard to see." DIM means…', a:"Not bright", w:["Very loud","Very fast","Unrelated meaning"]},
    {q:'"The trail was TREACHEROUS, so we walked carefully." TREACHEROUS means…', a:"Dangerous", w:["Easy","Funny","Unrelated meaning"]},
    {q:'"The room was DIM, so it was hard to see." DIM means…', a:"Not bright", w:["Very loud","Very fast","Unrelated meaning"]},
    {q:'"The trail was TREACHEROUS, so we walked carefully." TREACHEROUS means…', a:"Dangerous", w:["Easy","Funny","Unrelated meaning"]},
    {q:'"The room was DIM, so it was hard to see." DIM means…', a:"Not bright", w:["Very loud","Very fast","Unrelated meaning"]},
    {q:'"The trail was TREACHEROUS, so we walked carefully." TREACHEROUS means…', a:"Dangerous", w:["Easy","Funny","Unrelated meaning"]},
    {q:'"The room was DIM, so it was hard to see." DIM means…', a:"Not bright", w:["Very loud","Very fast","Unrelated meaning"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Use context clues.");
}
function gen_g6_eng_L3(){
  const q = "Type the evidence word: In nonfiction, a FACT is something you can _____.";
  return inputQuestion(q, "prove", "In nonfiction, a fact is something you can prove.");
}
function gen_g6_eng_L4(){const it=pick([
    {q:"The main idea is what a text is mostly ___.",a:"about"},
    {q:"Details help support the main ___.",a:"idea"},
    {q:"The main idea is what a text is mostly ___.",a:"about"},
    {q:"Details help support the main ___.",a:"idea"},
    {q:"The main idea is what a text is mostly ___.",a:"about"},
    {q:"Details help support the main ___.",a:"idea"},
    {q:"The main idea is what a text is mostly ___.",a:"about"},
    {q:"Details help support the main ___.",a:"idea"},
    {q:"The main idea is what a text is mostly ___.",a:"about"},
    {q:"Details help support the main ___.",a:"idea"}
]);return fillBlankQuestion(it.q,it.a);}
function gen_g6_eng_L5(){return matchQuestion([{left:"Main Idea",right:"Big point"},{left:"Detail",right:"Supports the point"},{left:"Summary",right:"Short retell"}]);}
function gen_g6_eng_L6(){const it=pick([
    {q:"A summary should include the most important…",a:"Ideas",w:["Jokes","Colors","Small detail"]},
    {q:"A summary should include the most important…",a:"Ideas",w:["Jokes","Colors","Small detail"]},
    {q:"A summary should include the most important…",a:"Ideas",w:["Jokes","Colors","Small detail"]},
    {q:"A summary should include the most important…",a:"Ideas",w:["Jokes","Colors","Small detail"]},
    {q:"A summary should include the most important…",a:"Ideas",w:["Jokes","Colors","Small detail"]},
    {q:"A summary should include the most important…",a:"Ideas",w:["Jokes","Colors","Small detail"]},
    {q:"A summary should include the most important…",a:"Ideas",w:["Jokes","Colors","Small detail"]},
    {q:"A summary should include the most important…",a:"Ideas",w:["Jokes","Colors","Small detail"]},
    {q:"A summary should include the most important…",a:"Ideas",w:["Jokes","Colors","Small detail"]},
    {q:"A summary should include the most important…",a:"Ideas",w:["Jokes","Colors","Small detail"]}
]);return mcQuestion(it.q,it.a,it.w,"Summarizing.");}
function gen_g6_eng_L7(){const it=pick([
    {q:"Theme is the message or lesson of a…",a:"Story",w:["Number","Map","Setting only"]},
    {q:"Theme is the message or lesson of a…",a:"Story",w:["Number","Map","Setting only"]},
    {q:"Theme is the message or lesson of a…",a:"Story",w:["Number","Map","Setting only"]},
    {q:"Theme is the message or lesson of a…",a:"Story",w:["Number","Map","Setting only"]},
    {q:"Theme is the message or lesson of a…",a:"Story",w:["Number","Map","Setting only"]},
    {q:"Theme is the message or lesson of a…",a:"Story",w:["Number","Map","Setting only"]},
    {q:"Theme is the message or lesson of a…",a:"Story",w:["Number","Map","Setting only"]},
    {q:"Theme is the message or lesson of a…",a:"Story",w:["Number","Map","Setting only"]},
    {q:"Theme is the message or lesson of a…",a:"Story",w:["Number","Map","Setting only"]},
    {q:"Theme is the message or lesson of a…",a:"Story",w:["Number","Map","Setting only"]}
]);return speedQuestion(it.q,it.a,it.w,10);}
function gen_g6_eng_L8(){const it=pick([
    {bad:"the best title matches the main idea",good:"The best title matches the main idea."},
    {bad:"the best title matches the main idea",good:"The best title matches the main idea."},
    {bad:"the best title matches the main idea",good:"The best title matches the main idea."},
    {bad:"the best title matches the main idea",good:"The best title matches the main idea."},
    {bad:"the best title matches the main idea",good:"The best title matches the main idea."},
    {bad:"the best title matches the main idea",good:"The best title matches the main idea."},
    {bad:"the best title matches the main idea",good:"The best title matches the main idea."},
    {bad:"the best title matches the main idea",good:"The best title matches the main idea."},
    {bad:"the best title matches the main idea",good:"The best title matches the main idea."},
    {bad:"the best title matches the main idea",good:"The best title matches the main idea."}
]);return editSentenceQuestion(it.bad,it.good);}

function gen_g6_eng_L9(){const it=pick([
    {q:"An author may write to inform, persuade, or…",a:"Entertain",w:["Sleep","Hide","Cover color"]},
    {q:"An author may write to inform, persuade, or…",a:"Entertain",w:["Sleep","Hide","Cover color"]},
    {q:"An author may write to inform, persuade, or…",a:"Entertain",w:["Sleep","Hide","Cover color"]},
    {q:"An author may write to inform, persuade, or…",a:"Entertain",w:["Sleep","Hide","Cover color"]},
    {q:"An author may write to inform, persuade, or…",a:"Entertain",w:["Sleep","Hide","Cover color"]},
    {q:"An author may write to inform, persuade, or…",a:"Entertain",w:["Sleep","Hide","Cover color"]},
    {q:"An author may write to inform, persuade, or…",a:"Entertain",w:["Sleep","Hide","Cover color"]},
    {q:"An author may write to inform, persuade, or…",a:"Entertain",w:["Sleep","Hide","Cover color"]},
    {q:"An author may write to inform, persuade, or…",a:"Entertain",w:["Sleep","Hide","Cover color"]},
    {q:"An author may write to inform, persuade, or…",a:"Entertain",w:["Sleep","Hide","Cover color"]}
]);return mcQuestion(it.q,it.a,it.w,"Author's purpose.");}
function gen_g6_eng_L10(){return matchQuestion([{left:"Persuade",right:"Convince"},{left:"Inform",right:"Teach"},{left:"Entertain",right:"Amuse"}]);}
function gen_g6_eng_L11(){const it=pick([
    {q:"Tone means the author's ___.",a:"attitude"},
    {q:"A funny tone may feel ___.",a:"humorous"},
    {q:"Tone means the author's ___.",a:"attitude"},
    {q:"A funny tone may feel ___.",a:"humorous"},
    {q:"Tone means the author's ___.",a:"attitude"},
    {q:"A funny tone may feel ___.",a:"humorous"},
    {q:"Tone means the author's ___.",a:"attitude"},
    {q:"A funny tone may feel ___.",a:"humorous"},
    {q:"Tone means the author's ___.",a:"attitude"},
    {q:"A funny tone may feel ___.",a:"humorous"}
]);return fillBlankQuestion(it.q,it.a);}
function gen_g6_eng_L12(){const it=pick([
    {q:"Tone is the author's attitude; mood is the reader's…",a:"Feeling",w:["Spelling","Title","Topic detail"]},
    {q:"Tone is the author's attitude; mood is the reader's…",a:"Feeling",w:["Spelling","Title","Topic detail"]},
    {q:"Tone is the author's attitude; mood is the reader's…",a:"Feeling",w:["Spelling","Title","Topic detail"]},
    {q:"Tone is the author's attitude; mood is the reader's…",a:"Feeling",w:["Spelling","Title","Topic detail"]},
    {q:"Tone is the author's attitude; mood is the reader's…",a:"Feeling",w:["Spelling","Title","Topic detail"]},
    {q:"Tone is the author's attitude; mood is the reader's…",a:"Feeling",w:["Spelling","Title","Topic detail"]},
    {q:"Tone is the author's attitude; mood is the reader's…",a:"Feeling",w:["Spelling","Title","Topic detail"]},
    {q:"Tone is the author's attitude; mood is the reader's…",a:"Feeling",w:["Spelling","Title","Topic detail"]},
    {q:"Tone is the author's attitude; mood is the reader's…",a:"Feeling",w:["Spelling","Title","Topic detail"]},
    {q:"Tone is the author's attitude; mood is the reader's…",a:"Feeling",w:["Spelling","Title","Topic detail"]}
]);return speedQuestion(it.q,it.a,it.w,10);}
function gen_g6_eng_L13(){const it=pick([
    {bad:"the author believes recycling is important",good:"The author believes recycling is important."},
    {bad:"the author believes recycling is important",good:"The author believes recycling is important."},
    {bad:"the author believes recycling is important",good:"The author believes recycling is important."},
    {bad:"the author believes recycling is important",good:"The author believes recycling is important."},
    {bad:"the author believes recycling is important",good:"The author believes recycling is important."},
    {bad:"the author believes recycling is important",good:"The author believes recycling is important."},
    {bad:"the author believes recycling is important",good:"The author believes recycling is important."},
    {bad:"the author believes recycling is important",good:"The author believes recycling is important."},
    {bad:"the author believes recycling is important",good:"The author believes recycling is important."},
    {bad:"the author believes recycling is important",good:"The author believes recycling is important."}
]);return editSentenceQuestion(it.bad,it.good);}

function gen_g6_eng_L14(){return matchQuestion([{left:"Cause",right:"Why it happened"},{left:"Effect",right:"What happened"}]);}
function gen_g6_eng_L15(){const it=pick([
    {q:"Compare means to tell how things are…",a:"Alike",w:["Broken","Hidden","Unrelated meaning"]},
    {q:"Contrast means to tell how things are…",a:"Different",w:["Same","Empty","Unrelated meaning"]},
    {q:"Compare means to tell how things are…",a:"Alike",w:["Broken","Hidden","Unrelated meaning"]},
    {q:"Contrast means to tell how things are…",a:"Different",w:["Same","Empty","Unrelated meaning"]},
    {q:"Compare means to tell how things are…",a:"Alike",w:["Broken","Hidden","Unrelated meaning"]},
    {q:"Contrast means to tell how things are…",a:"Different",w:["Same","Empty","Unrelated meaning"]},
    {q:"Compare means to tell how things are…",a:"Alike",w:["Broken","Hidden","Unrelated meaning"]},
    {q:"Contrast means to tell how things are…",a:"Different",w:["Same","Empty","Unrelated meaning"]},
    {q:"Compare means to tell how things are…",a:"Alike",w:["Broken","Hidden","Unrelated meaning"]},
    {q:"Contrast means to tell how things are…",a:"Different",w:["Same","Empty","Unrelated meaning"]}
]);return mcQuestion(it.q,it.a,it.w,"Compare and contrast.");}
function gen_g6_eng_L16(){const it=pick([
    {q:"Problem and solution text presents an issue and a…",a:"solution"},
    {q:"Problem and solution text presents an issue and a…",a:"solution"},
    {q:"Problem and solution text presents an issue and a…",a:"solution"},
    {q:"Problem and solution text presents an issue and a…",a:"solution"},
    {q:"Problem and solution text presents an issue and a…",a:"solution"},
    {q:"Problem and solution text presents an issue and a…",a:"solution"},
    {q:"Problem and solution text presents an issue and a…",a:"solution"},
    {q:"Problem and solution text presents an issue and a…",a:"solution"},
    {q:"Problem and solution text presents an issue and a…",a:"solution"},
    {q:"Problem and solution text presents an issue and a…",a:"solution"}
]);return fillBlankQuestion(it.q,it.a);}
function gen_g6_eng_L17(){const it=pick([
    {q:"Sequence text uses order words like first, next, and…",a:"Finally",w:["Loudly","Blue","Compare and contrast"]},
    {q:"Sequence text uses order words like first, next, and…",a:"Finally",w:["Loudly","Blue","Compare and contrast"]},
    {q:"Sequence text uses order words like first, next, and…",a:"Finally",w:["Loudly","Blue","Compare and contrast"]},
    {q:"Sequence text uses order words like first, next, and…",a:"Finally",w:["Loudly","Blue","Compare and contrast"]},
    {q:"Sequence text uses order words like first, next, and…",a:"Finally",w:["Loudly","Blue","Compare and contrast"]},
    {q:"Sequence text uses order words like first, next, and…",a:"Finally",w:["Loudly","Blue","Compare and contrast"]},
    {q:"Sequence text uses order words like first, next, and…",a:"Finally",w:["Loudly","Blue","Compare and contrast"]},
    {q:"Sequence text uses order words like first, next, and…",a:"Finally",w:["Loudly","Blue","Compare and contrast"]},
    {q:"Sequence text uses order words like first, next, and…",a:"Finally",w:["Loudly","Blue","Compare and contrast"]},
    {q:"Sequence text uses order words like first, next, and…",a:"Finally",w:["Loudly","Blue","Compare and contrast"]}
]);return speedQuestion(it.q,it.a,it.w,10);}
function gen_g6_eng_L18(){const it=pick([
    {bad:"description text gives details about a topic",good:"Description text gives details about a topic."},
    {bad:"description text gives details about a topic",good:"Description text gives details about a topic."},
    {bad:"description text gives details about a topic",good:"Description text gives details about a topic."},
    {bad:"description text gives details about a topic",good:"Description text gives details about a topic."},
    {bad:"description text gives details about a topic",good:"Description text gives details about a topic."},
    {bad:"description text gives details about a topic",good:"Description text gives details about a topic."},
    {bad:"description text gives details about a topic",good:"Description text gives details about a topic."},
    {bad:"description text gives details about a topic",good:"Description text gives details about a topic."},
    {bad:"description text gives details about a topic",good:"Description text gives details about a topic."},
    {bad:"description text gives details about a topic",good:"Description text gives details about a topic."}
]);return editSentenceQuestion(it.bad,it.good);}

function gen_g6_eng_L19(){return matchQuestion([{left:"Large",right:"Big"},{left:"Small",right:"Tiny"},{left:"Quick",right:"Fast"}]);}
function gen_g6_eng_L20(){return matchQuestion([{left:"Hot",right:"Cold"},{left:"Happy",right:"Sad"},{left:"Early",right:"Late"}]);}
function gen_g6_eng_L21(){const it=pick([
    {q:"Context clues help readers find word…",a:"Meanings",w:["Pages","Fonts","Unrelated meaning"]},
    {q:"Context clues help readers find word…",a:"Meanings",w:["Pages","Fonts","Unrelated meaning"]},
    {q:"Context clues help readers find word…",a:"Meanings",w:["Pages","Fonts","Unrelated meaning"]},
    {q:"Context clues help readers find word…",a:"Meanings",w:["Pages","Fonts","Unrelated meaning"]},
    {q:"Context clues help readers find word…",a:"Meanings",w:["Pages","Fonts","Unrelated meaning"]},
    {q:"Context clues help readers find word…",a:"Meanings",w:["Pages","Fonts","Unrelated meaning"]},
    {q:"Context clues help readers find word…",a:"Meanings",w:["Pages","Fonts","Unrelated meaning"]},
    {q:"Context clues help readers find word…",a:"Meanings",w:["Pages","Fonts","Unrelated meaning"]},
    {q:"Context clues help readers find word…",a:"Meanings",w:["Pages","Fonts","Unrelated meaning"]},
    {q:"Context clues help readers find word…",a:"Meanings",w:["Pages","Fonts","Unrelated meaning"]}
]);return mcQuestion(it.q,it.a,it.w,"Context clues.");}
function gen_g6_eng_L22(){const it=pick([
    {q:"A stronger word for good is ___.",a:"excellent"},
    {q:"A stronger word for bad is ___.",a:"terrible"},
    {q:"A stronger word for good is ___.",a:"excellent"},
    {q:"A stronger word for bad is ___.",a:"terrible"},
    {q:"A stronger word for good is ___.",a:"excellent"},
    {q:"A stronger word for bad is ___.",a:"terrible"},
    {q:"A stronger word for good is ___.",a:"excellent"},
    {q:"A stronger word for bad is ___.",a:"terrible"},
    {q:"A stronger word for good is ___.",a:"excellent"},
    {q:"A stronger word for bad is ___.",a:"terrible"}
]);return fillBlankQuestion(it.q,it.a);}
function gen_g6_eng_L23(){const it=pick([
    {q:"Synonyms have similar meanings.",a:"True",w:["False","Only sometimes","Unrelated meaning"]},
    {q:"Synonyms have similar meanings.",a:"True",w:["False","Only sometimes","Unrelated meaning"]},
    {q:"Synonyms have similar meanings.",a:"True",w:["False","Only sometimes","Unrelated meaning"]},
    {q:"Synonyms have similar meanings.",a:"True",w:["False","Only sometimes","Unrelated meaning"]},
    {q:"Synonyms have similar meanings.",a:"True",w:["False","Only sometimes","Unrelated meaning"]},
    {q:"Synonyms have similar meanings.",a:"True",w:["False","Only sometimes","Unrelated meaning"]},
    {q:"Synonyms have similar meanings.",a:"True",w:["False","Only sometimes","Unrelated meaning"]},
    {q:"Synonyms have similar meanings.",a:"True",w:["False","Only sometimes","Unrelated meaning"]},
    {q:"Synonyms have similar meanings.",a:"True",w:["False","Only sometimes","Unrelated meaning"]},
    {q:"Synonyms have similar meanings.",a:"True",w:["False","Only sometimes","Unrelated meaning"]}
]);return speedQuestion(it.q,it.a,it.w,10);}

function gen_g6_eng_L24(){const it=pick([
    {q:"Break the ice means to…",a:"Start conversation",w:["Break water","Freeze","Unrelated meaning"]},
    {q:"Break the ice means to…",a:"Start conversation",w:["Break water","Freeze","Unrelated meaning"]},
    {q:"Break the ice means to…",a:"Start conversation",w:["Break water","Freeze","Unrelated meaning"]},
    {q:"Break the ice means to…",a:"Start conversation",w:["Break water","Freeze","Unrelated meaning"]},
    {q:"Break the ice means to…",a:"Start conversation",w:["Break water","Freeze","Unrelated meaning"]},
    {q:"Break the ice means to…",a:"Start conversation",w:["Break water","Freeze","Unrelated meaning"]},
    {q:"Break the ice means to…",a:"Start conversation",w:["Break water","Freeze","Unrelated meaning"]},
    {q:"Break the ice means to…",a:"Start conversation",w:["Break water","Freeze","Unrelated meaning"]},
    {q:"Break the ice means to…",a:"Start conversation",w:["Break water","Freeze","Unrelated meaning"]},
    {q:"Break the ice means to…",a:"Start conversation",w:["Break water","Freeze","Unrelated meaning"]}
]);return mcQuestion(it.q,it.a,it.w,"Idioms.");}
function gen_g6_eng_L25(){const it=pick([
    {q:"Hit the books means to ___.",a:"study"},
    {q:"Piece of cake means something is ___.",a:"easy"},
    {q:"Hit the books means to ___.",a:"study"},
    {q:"Piece of cake means something is ___.",a:"easy"},
    {q:"Hit the books means to ___.",a:"study"},
    {q:"Piece of cake means something is ___.",a:"easy"},
    {q:"Hit the books means to ___.",a:"study"},
    {q:"Piece of cake means something is ___.",a:"easy"},
    {q:"Hit the books means to ___.",a:"study"},
    {q:"Piece of cake means something is ___.",a:"easy"}
]);return fillBlankQuestion(it.q,it.a);}
function gen_g6_eng_L26(){return matchQuestion([{left:"Better late than never",right:"Doing it late is better than not doing it"},{left:"Practice makes perfect",right:"Practice improves skill"}]);}
function gen_g6_eng_L27(){const it=pick([
    {bad:"honesty is the best policy",good:"Honesty is the best policy."},
    {bad:"honesty is the best policy",good:"Honesty is the best policy."},
    {bad:"honesty is the best policy",good:"Honesty is the best policy."},
    {bad:"honesty is the best policy",good:"Honesty is the best policy."},
    {bad:"honesty is the best policy",good:"Honesty is the best policy."},
    {bad:"honesty is the best policy",good:"Honesty is the best policy."},
    {bad:"honesty is the best policy",good:"Honesty is the best policy."},
    {bad:"honesty is the best policy",good:"Honesty is the best policy."},
    {bad:"honesty is the best policy",good:"Honesty is the best policy."},
    {bad:"honesty is the best policy",good:"Honesty is the best policy."}
]);return editSentenceQuestion(it.bad,it.good);}
function gen_g6_eng_L28(){const it=pick([
    {q:"An idiom is usually not meant literally.",a:"True",w:["False","Never","Median"]},
    {q:"An idiom is usually not meant literally.",a:"True",w:["False","Never","Median"]},
    {q:"An idiom is usually not meant literally.",a:"True",w:["False","Never","Median"]},
    {q:"An idiom is usually not meant literally.",a:"True",w:["False","Never","Median"]},
    {q:"An idiom is usually not meant literally.",a:"True",w:["False","Never","Median"]},
    {q:"An idiom is usually not meant literally.",a:"True",w:["False","Never","Median"]},
    {q:"An idiom is usually not meant literally.",a:"True",w:["False","Never","Median"]},
    {q:"An idiom is usually not meant literally.",a:"True",w:["False","Never","Median"]},
    {q:"An idiom is usually not meant literally.",a:"True",w:["False","Never","Median"]},
    {q:"An idiom is usually not meant literally.",a:"True",w:["False","Never","Median"]}
]);return speedQuestion(it.q,it.a,it.w,10);}

function gen_g6_eng_L29(){const it=pick([
    {q:"___ going to the park.",a:"They're"},
    {q:"Put the books over ___.",a:"there"},
    {q:"___ going to the park.",a:"They're"},
    {q:"Put the books over ___.",a:"there"},
    {q:"___ going to the park.",a:"They're"},
    {q:"Put the books over ___.",a:"there"},
    {q:"___ going to the park.",a:"They're"},
    {q:"Put the books over ___.",a:"there"},
    {q:"___ going to the park.",a:"They're"},
    {q:"Put the books over ___.",a:"there"}
]);return fillBlankQuestion(it.q,it.a);}
function gen_g6_eng_L30(){const it=pick([
    {q:"I want ___ cookies.",a:"Two",w:["To","Too","Cookies"]},
    {q:"I am going ___ school.",a:"To",w:["Two","Too","School"]},
    {q:"I want ___ cookies.",a:"Two",w:["To","Too","Cookies"]},
    {q:"I am going ___ school.",a:"To",w:["Two","Too","School"]},
    {q:"I want ___ cookies.",a:"Two",w:["To","Too","Cookies"]},
    {q:"I am going ___ school.",a:"To",w:["Two","Too","School"]},
    {q:"I want ___ cookies.",a:"Two",w:["To","Too","Cookies"]},
    {q:"I am going ___ school.",a:"To",w:["Two","Too","School"]},
    {q:"I want ___ cookies.",a:"Two",w:["To","Too","Cookies"]},
    {q:"I am going ___ school.",a:"To",w:["Two","Too","School"]}
]);return mcQuestion(it.q,it.a,it.w,"To, too, two.");}
function gen_g6_eng_L31(){const it=pick([
    {bad:"your going to win",good:"You're going to win."},
    {bad:"your going to win",good:"You're going to win."},
    {bad:"your going to win",good:"You're going to win."},
    {bad:"your going to win",good:"You're going to win."},
    {bad:"your going to win",good:"You're going to win."},
    {bad:"your going to win",good:"You're going to win."},
    {bad:"your going to win",good:"You're going to win."},
    {bad:"your going to win",good:"You're going to win."},
    {bad:"your going to win",good:"You're going to win."},
    {bad:"your going to win",good:"You're going to win."}
]);return editSentenceQuestion(it.bad,it.good);}
function gen_g6_eng_L32(){const it=pick([
    {q:"___ raining outside.",a:"It's"},
    {q:"The dog wagged ___ tail.",a:"its"},
    {q:"___ raining outside.",a:"It's"},
    {q:"The dog wagged ___ tail.",a:"its"},
    {q:"___ raining outside.",a:"It's"},
    {q:"The dog wagged ___ tail.",a:"its"},
    {q:"___ raining outside.",a:"It's"},
    {q:"The dog wagged ___ tail.",a:"its"},
    {q:"___ raining outside.",a:"It's"},
    {q:"The dog wagged ___ tail.",a:"its"}
]);return fillBlankQuestion(it.q,it.a);}
function gen_g6_eng_L33(){return matchQuestion([{left:"Pair",right:"Two of something"},{left:"Pear",right:"Fruit"},{left:"See",right:"Use eyes"},{left:"Sea",right:"Ocean"}]);}

function gen_g6_eng_L34(){const it=pick([
    {q:"A preposition shows location, time, or…",a:"Direction",w:["Color","Volume","Area"]},
    {q:"A preposition shows location, time, or…",a:"Direction",w:["Color","Volume","Area"]},
    {q:"A preposition shows location, time, or…",a:"Direction",w:["Color","Volume","Area"]},
    {q:"A preposition shows location, time, or…",a:"Direction",w:["Color","Volume","Area"]},
    {q:"A preposition shows location, time, or…",a:"Direction",w:["Color","Volume","Area"]},
    {q:"A preposition shows location, time, or…",a:"Direction",w:["Color","Volume","Area"]},
    {q:"A preposition shows location, time, or…",a:"Direction",w:["Color","Volume","Area"]},
    {q:"A preposition shows location, time, or…",a:"Direction",w:["Color","Volume","Area"]},
    {q:"A preposition shows location, time, or…",a:"Direction",w:["Color","Volume","Area"]},
    {q:"A preposition shows location, time, or…",a:"Direction",w:["Color","Volume","Area"]}
]);return mcQuestion(it.q,it.a,it.w,"Prepositions.");}
function gen_g6_eng_L35(){const it=pick([
    {q:"In the phrase 'under the table,' under is a ___.",a:"preposition"},
    {q:"In the phrase 'under the table,' under is a ___.",a:"preposition"},
    {q:"In the phrase 'under the table,' under is a ___.",a:"preposition"},
    {q:"In the phrase 'under the table,' under is a ___.",a:"preposition"},
    {q:"In the phrase 'under the table,' under is a ___.",a:"preposition"},
    {q:"In the phrase 'under the table,' under is a ___.",a:"preposition"},
    {q:"In the phrase 'under the table,' under is a ___.",a:"preposition"},
    {q:"In the phrase 'under the table,' under is a ___.",a:"preposition"},
    {q:"In the phrase 'under the table,' under is a ___.",a:"preposition"},
    {q:"In the phrase 'under the table,' under is a ___.",a:"preposition"}
]);return fillBlankQuestion(it.q,it.a);}
function gen_g6_eng_L36(){return matchQuestion([{left:"Above",right:"Higher than"},{left:"Below",right:"Lower than"},{left:"Between",right:"In the middle"}]);}
function gen_g6_eng_L37(){const it=pick([
    {q:"Before, after, and during can show…",a:"Time",w:["Weight","Sound","Plain"]},
    {q:"Before, after, and during can show…",a:"Time",w:["Weight","Sound","Plain"]},
    {q:"Before, after, and during can show…",a:"Time",w:["Weight","Sound","Plain"]},
    {q:"Before, after, and during can show…",a:"Time",w:["Weight","Sound","Plain"]},
    {q:"Before, after, and during can show…",a:"Time",w:["Weight","Sound","Plain"]},
    {q:"Before, after, and during can show…",a:"Time",w:["Weight","Sound","Plain"]},
    {q:"Before, after, and during can show…",a:"Time",w:["Weight","Sound","Plain"]},
    {q:"Before, after, and during can show…",a:"Time",w:["Weight","Sound","Plain"]},
    {q:"Before, after, and during can show…",a:"Time",w:["Weight","Sound","Plain"]},
    {q:"Before, after, and during can show…",a:"Time",w:["Weight","Sound","Plain"]}
]);return speedQuestion(it.q,it.a,it.w,10);}
function gen_g6_eng_L38(){const it=pick([
    {bad:"the cat is under the chair",good:"The cat is under the chair."},
    {bad:"the cat is under the chair",good:"The cat is under the chair."},
    {bad:"the cat is under the chair",good:"The cat is under the chair."},
    {bad:"the cat is under the chair",good:"The cat is under the chair."},
    {bad:"the cat is under the chair",good:"The cat is under the chair."},
    {bad:"the cat is under the chair",good:"The cat is under the chair."},
    {bad:"the cat is under the chair",good:"The cat is under the chair."},
    {bad:"the cat is under the chair",good:"The cat is under the chair."},
    {bad:"the cat is under the chair",good:"The cat is under the chair."},
    {bad:"the cat is under the chair",good:"The cat is under the chair."}
]);return editSentenceQuestion(it.bad,it.good);}

function gen_g6_eng_L39(){const it=pick([
    {q:"A root is the base part of a…",a:"Word",w:["Sentence only","Paragraph only","Roots"]},
    {q:"A root is the base part of a…",a:"Word",w:["Sentence only","Paragraph only","Roots"]},
    {q:"A root is the base part of a…",a:"Word",w:["Sentence only","Paragraph only","Roots"]},
    {q:"A root is the base part of a…",a:"Word",w:["Sentence only","Paragraph only","Roots"]},
    {q:"A root is the base part of a…",a:"Word",w:["Sentence only","Paragraph only","Roots"]},
    {q:"A root is the base part of a…",a:"Word",w:["Sentence only","Paragraph only","Roots"]},
    {q:"A root is the base part of a…",a:"Word",w:["Sentence only","Paragraph only","Roots"]},
    {q:"A root is the base part of a…",a:"Word",w:["Sentence only","Paragraph only","Roots"]},
    {q:"A root is the base part of a…",a:"Word",w:["Sentence only","Paragraph only","Roots"]},
    {q:"A root is the base part of a…",a:"Word",w:["Sentence only","Paragraph only","Roots"]}
]);return mcQuestion(it.q,it.a,it.w,"Roots.");}
function gen_g6_eng_L40(){return matchQuestion([{left:"photo",right:"light"},{left:"bio",right:"life"},{left:"geo",right:"earth"}]);}
function gen_g6_eng_L41(){return matchQuestion([{left:"port",right:"carry"},{left:"scrib/script",right:"write"},{left:"dict",right:"say"}]);}
function gen_g6_eng_L42(){const it=pick([
    {q:"Preview means to see ___.",a:"before"},
    {q:"Rewrite means to write ___.",a:"again"},
    {q:"Preview means to see ___.",a:"before"},
    {q:"Rewrite means to write ___.",a:"again"},
    {q:"Preview means to see ___.",a:"before"},
    {q:"Rewrite means to write ___.",a:"again"},
    {q:"Preview means to see ___.",a:"before"},
    {q:"Rewrite means to write ___.",a:"again"},
    {q:"Preview means to see ___.",a:"before"},
    {q:"Rewrite means to write ___.",a:"again"}
]);return fillBlankQuestion(it.q,it.a);}
function gen_g6_eng_L43(){const it=pick([
    {q:"The root bio means…",a:"Life",w:["Light","Sound","Roots"]},
    {q:"The root bio means…",a:"Life",w:["Light","Sound","Roots"]},
    {q:"The root bio means…",a:"Life",w:["Light","Sound","Roots"]},
    {q:"The root bio means…",a:"Life",w:["Light","Sound","Roots"]},
    {q:"The root bio means…",a:"Life",w:["Light","Sound","Roots"]},
    {q:"The root bio means…",a:"Life",w:["Light","Sound","Roots"]},
    {q:"The root bio means…",a:"Life",w:["Light","Sound","Roots"]},
    {q:"The root bio means…",a:"Life",w:["Light","Sound","Roots"]},
    {q:"The root bio means…",a:"Life",w:["Light","Sound","Roots"]},
    {q:"The root bio means…",a:"Life",w:["Light","Sound","Roots"]}
]);return speedQuestion(it.q,it.a,it.w,10);}

function gen_g6_eng_L44(){const it=pick([
    {q:"In 'She kicked the ball,' the direct object is…",a:"Ball",w:["She","Kicked","Topic detail"]},
    {q:"In 'She kicked the ball,' the direct object is…",a:"Ball",w:["She","Kicked","Topic detail"]},
    {q:"In 'She kicked the ball,' the direct object is…",a:"Ball",w:["She","Kicked","Topic detail"]},
    {q:"In 'She kicked the ball,' the direct object is…",a:"Ball",w:["She","Kicked","Topic detail"]},
    {q:"In 'She kicked the ball,' the direct object is…",a:"Ball",w:["She","Kicked","Topic detail"]},
    {q:"In 'She kicked the ball,' the direct object is…",a:"Ball",w:["She","Kicked","Topic detail"]},
    {q:"In 'She kicked the ball,' the direct object is…",a:"Ball",w:["She","Kicked","Topic detail"]},
    {q:"In 'She kicked the ball,' the direct object is…",a:"Ball",w:["She","Kicked","Topic detail"]},
    {q:"In 'She kicked the ball,' the direct object is…",a:"Ball",w:["She","Kicked","Topic detail"]},
    {q:"In 'She kicked the ball,' the direct object is…",a:"Ball",w:["She","Kicked","Topic detail"]}
]);return mcQuestion(it.q,it.a,it.w,"Direct objects.");}
function gen_g6_eng_L45(){const it=pick([
    {q:"In 'Mom gave Sam a gift,' the indirect object is…",a:"Sam",w:["Mom","Gift","Topic detail"]},
    {q:"In 'Mom gave Sam a gift,' the indirect object is…",a:"Sam",w:["Mom","Gift","Topic detail"]},
    {q:"In 'Mom gave Sam a gift,' the indirect object is…",a:"Sam",w:["Mom","Gift","Topic detail"]},
    {q:"In 'Mom gave Sam a gift,' the indirect object is…",a:"Sam",w:["Mom","Gift","Topic detail"]},
    {q:"In 'Mom gave Sam a gift,' the indirect object is…",a:"Sam",w:["Mom","Gift","Topic detail"]},
    {q:"In 'Mom gave Sam a gift,' the indirect object is…",a:"Sam",w:["Mom","Gift","Topic detail"]},
    {q:"In 'Mom gave Sam a gift,' the indirect object is…",a:"Sam",w:["Mom","Gift","Topic detail"]},
    {q:"In 'Mom gave Sam a gift,' the indirect object is…",a:"Sam",w:["Mom","Gift","Topic detail"]},
    {q:"In 'Mom gave Sam a gift,' the indirect object is…",a:"Sam",w:["Mom","Gift","Topic detail"]},
    {q:"In 'Mom gave Sam a gift,' the indirect object is…",a:"Sam",w:["Mom","Gift","Topic detail"]}
]);return speedQuestion(it.q,it.a,it.w,10);}
function gen_g6_eng_L46(){return matchQuestion([{left:"Direct Object",right:"Receives action"},{left:"Indirect Object",right:"Receives direct object"}]);}
function gen_g6_eng_L47(){const it=pick([
    {q:"A sentence usually has a subject and a ___.",a:"predicate"},
    {q:"A sentence usually has a subject and a ___.",a:"predicate"},
    {q:"A sentence usually has a subject and a ___.",a:"predicate"},
    {q:"A sentence usually has a subject and a ___.",a:"predicate"},
    {q:"A sentence usually has a subject and a ___.",a:"predicate"},
    {q:"A sentence usually has a subject and a ___.",a:"predicate"},
    {q:"A sentence usually has a subject and a ___.",a:"predicate"},
    {q:"A sentence usually has a subject and a ___.",a:"predicate"},
    {q:"A sentence usually has a subject and a ___.",a:"predicate"},
    {q:"A sentence usually has a subject and a ___.",a:"predicate"}
]);return fillBlankQuestion(it.q,it.a);}
function gen_g6_eng_L48(){const it=pick([
    {bad:"she gave tom a pencil",good:"She gave Tom a pencil."},
    {bad:"she gave tom a pencil",good:"She gave Tom a pencil."},
    {bad:"she gave tom a pencil",good:"She gave Tom a pencil."},
    {bad:"she gave tom a pencil",good:"She gave Tom a pencil."},
    {bad:"she gave tom a pencil",good:"She gave Tom a pencil."},
    {bad:"she gave tom a pencil",good:"She gave Tom a pencil."},
    {bad:"she gave tom a pencil",good:"She gave Tom a pencil."},
    {bad:"she gave tom a pencil",good:"She gave Tom a pencil."},
    {bad:"she gave tom a pencil",good:"She gave Tom a pencil."},
    {bad:"she gave tom a pencil",good:"She gave Tom a pencil."}
]);return editSentenceQuestion(it.bad,it.good);}

function gen_g6_eng_L49(){const it=pick([
    {q:"A pronoun takes the place of a…",a:"Noun",w:["Verb","Comma","Adverb"]},
    {q:"A pronoun takes the place of a…",a:"Noun",w:["Verb","Comma","Adverb"]},
    {q:"A pronoun takes the place of a…",a:"Noun",w:["Verb","Comma","Adverb"]},
    {q:"A pronoun takes the place of a…",a:"Noun",w:["Verb","Comma","Adverb"]},
    {q:"A pronoun takes the place of a…",a:"Noun",w:["Verb","Comma","Adverb"]},
    {q:"A pronoun takes the place of a…",a:"Noun",w:["Verb","Comma","Adverb"]},
    {q:"A pronoun takes the place of a…",a:"Noun",w:["Verb","Comma","Adverb"]},
    {q:"A pronoun takes the place of a…",a:"Noun",w:["Verb","Comma","Adverb"]},
    {q:"A pronoun takes the place of a…",a:"Noun",w:["Verb","Comma","Adverb"]},
    {q:"A pronoun takes the place of a…",a:"Noun",w:["Verb","Comma","Adverb"]}
]);return mcQuestion(it.q,it.a,it.w,"Pronouns.");}
function gen_g6_eng_L50(){const it=pick([
    {q:"An antecedent is the noun a pronoun replaces.",a:"True",w:["False","Never","Adverb"]},
    {q:"An antecedent is the noun a pronoun replaces.",a:"True",w:["False","Never","Adverb"]},
    {q:"An antecedent is the noun a pronoun replaces.",a:"True",w:["False","Never","Adverb"]},
    {q:"An antecedent is the noun a pronoun replaces.",a:"True",w:["False","Never","Adverb"]},
    {q:"An antecedent is the noun a pronoun replaces.",a:"True",w:["False","Never","Adverb"]},
    {q:"An antecedent is the noun a pronoun replaces.",a:"True",w:["False","Never","Adverb"]},
    {q:"An antecedent is the noun a pronoun replaces.",a:"True",w:["False","Never","Adverb"]},
    {q:"An antecedent is the noun a pronoun replaces.",a:"True",w:["False","Never","Adverb"]},
    {q:"An antecedent is the noun a pronoun replaces.",a:"True",w:["False","Never","Adverb"]},
    {q:"An antecedent is the noun a pronoun replaces.",a:"True",w:["False","Never","Adverb"]}
]);return speedQuestion(it.q,it.a,it.w,10);}
function gen_g6_eng_L51(){const it=pick([
    {q:"Maria lost ___ pencil.",a:"her"},
    {q:"The boys brought ___ lunches.",a:"their"},
    {q:"Maria lost ___ pencil.",a:"her"},
    {q:"The boys brought ___ lunches.",a:"their"},
    {q:"Maria lost ___ pencil.",a:"her"},
    {q:"The boys brought ___ lunches.",a:"their"},
    {q:"Maria lost ___ pencil.",a:"her"},
    {q:"The boys brought ___ lunches.",a:"their"},
    {q:"Maria lost ___ pencil.",a:"her"},
    {q:"The boys brought ___ lunches.",a:"their"}
]);return fillBlankQuestion(it.q,it.a);}
function gen_g6_eng_L52(){const it=pick([
    {bad:"tom told ben he was late",good:"Tom told Ben that Tom was late."},
    {bad:"tom told ben he was late",good:"Tom told Ben that Tom was late."},
    {bad:"tom told ben he was late",good:"Tom told Ben that Tom was late."},
    {bad:"tom told ben he was late",good:"Tom told Ben that Tom was late."},
    {bad:"tom told ben he was late",good:"Tom told Ben that Tom was late."},
    {bad:"tom told ben he was late",good:"Tom told Ben that Tom was late."},
    {bad:"tom told ben he was late",good:"Tom told Ben that Tom was late."},
    {bad:"tom told ben he was late",good:"Tom told Ben that Tom was late."},
    {bad:"tom told ben he was late",good:"Tom told Ben that Tom was late."},
    {bad:"tom told ben he was late",good:"Tom told Ben that Tom was late."}
]);return editSentenceQuestion(it.bad,it.good);}
function gen_g6_eng_L53(){return matchQuestion([{left:"He",right:"Singular male"},{left:"They",right:"Plural people"},{left:"It",right:"Thing or animal"}]);}
/* ---------- GRADE 6 MATH ---------- */

function gen_g6_math_L1(){
  const a = randInt(1,9), b = randInt(2,10);
  const q = `Ratio: ${a} to ${b}\nWhich is the correct ratio form?`;
  const ans = `${a}:${b}`;
  return mcQuestion(q, ans, [`${b}:${a}`, `${a+b}:${b}`], "Choose the correct ratio.");
}

function gen_g6_math_L2(){
  const a = randInt(-12,12), b = randInt(-12,12);
  const q = `${a} + (${b}) = ?`;
  const ans = a + b;
  const opts = make3Choices(ans, -24, 24).map(String);
  return mcQuestion(q, String(ans), opts.filter(x=>x!==String(ans)).slice(0,2), "Add integers.");
}

function gen_g6_math_L3(){
  const x = randInt(2,9);
  const a = randInt(2,9);
  const b = randInt(1,9);
  const q = `If x = ${x}, what is ${a}x + ${b}?`;
  const ans = a*x + b;
  const opts = make3Choices(ans, 0, 200).map(String);
  return mcQuestion(q, String(ans), opts.filter(x=>x!==String(ans)).slice(0,2), "Evaluate the expression.");
}

function gen_g6_math_L4(){
  const n = randInt(1,20);
  const q = `Solve: x > ${n}. Which value is a solution?`;
  const ans = n + randInt(1,5);
  const opts = make3Choices(ans, 0, 30).map(String);
  return mcQuestion(q, String(ans), opts.filter(x=>x!==String(ans)).slice(0,2), "Greater means bigger.");
}

function gen_g6_math_L5(){
  const n = randInt(1,15);
  const q = `Which inequality represents numbers greater than ${n}?`;
  const ans = `x > ${n}`;
  return mcQuestion(q, ans, [`x < ${n}`, `x = ${n}`], "Greater than means right on the number line.");
}

function gen_g6_math_L6(){
  const n = randInt(1,15);
  const q = `Which inequality represents numbers less than ${n}?`;
  const ans = `x < ${n}`;
  return mcQuestion(q, ans, [`x > ${n}`, `x = ${n}`], "Less than means left on the number line.");
}

function gen_g6_math_L7(){
  const base = randInt(2,6);
  const exp = randInt(2,4);
  const q = `Which expression represents ${base} multiplied by itself ${exp} times?`;
  const ans = `${base}^${exp}`;
  return mcQuestion(q, ans, [`${base}×${exp}`, `${exp}^${base}`], "Repeated multiplication uses exponents.");
}

function gen_g6_math_L8(){
  const base = randInt(2,5);
  const exp = randInt(2,3);
  const ans = Math.pow(base, exp);
  const q = `Evaluate: ${base}^${exp}`;
  const opts = make3Choices(ans, 0, 200).map(String);
  return mcQuestion(q, String(ans), opts.filter(x=>x!==String(ans)).slice(0,2), "Multiply repeatedly.");
}

function gen_g6_math_L9(){
  const exp = randInt(1,4);
  const ans = Math.pow(10, exp);
  const q = `What is 10^${exp}?`;
  const opts = make3Choices(ans, 1, 10000).map(String);
  return mcQuestion(q, String(ans), opts.filter(x=>x!==String(ans)).slice(0,2), "Count the zeros.");
}

function gen_g6_math_L10(){
  const q = "What are the two axes on a coordinate plane?";
  return mcQuestion(q, "x-axis and y-axis",
    ["horizontal and vertical lines", "north and south axes"],
    "The coordinate plane has two axes.");
}

function gen_g6_math_L11(){
  const x = randInt(1,9);
  const y = randInt(1,9);
  const q = `What is the ordered pair for a point ${x} units right and ${y} units up?`;
  const ans = `(${x}, ${y})`;
  return mcQuestion(q, ans,
    [`(${y}, ${x})`, `(${x})`],
    "Ordered pair format is (x, y).");
}

function gen_g6_math_L12(){
  const x = randInt(1,9);
  const y = randInt(1,9);
  const q = `Which point is ${x} units right and ${y} units up?`;
  const ans = `(${x}, ${y})`;
  return mcQuestion(q, ans,
    [`(${y}, ${x})`, `(-${x}, ${y})`],
    "Move right for x, up for y.");
}

function gen_g6_math_L13(){
  const n = randInt(2,30);

  function isPrime(num){
    for(let i=2;i<num;i++){
      if(num % i === 0) return false;
    }
    return num > 1;
  }

  const ans = isPrime(n) ? "Prime" : "Composite";
  const q = `Is ${n} prime or composite?`;

  return mcQuestion(q, ans,
    [ans === "Prime" ? "Composite" : "Prime", "Neither"],
    "Check factors.");
}

function gen_g6_math_L14(){
  const n = randInt(10,40);
  const q = `Which number is a factor of ${n}?`;

  let factors = [];
  for(let i=1;i<=n;i++){
    if(n % i === 0) factors.push(i);
  }

  const ans = factors[randInt(0,factors.length-1)];
  const opts = make3Choices(ans, 1, n).map(String);

  return mcQuestion(q, String(ans),
    opts.filter(x=>x!==String(ans)).slice(0,2),
    "A factor divides evenly.");
}
function gen_g6_math_L15(){
  return g6ExtraQuestion([
    {q:"What is the greatest common factor of 12 and 18?", a:"6", w:["3","36","7"]},
    {q:"What is the greatest common factor of 16 and 24?", a:"8", w:["4","12","9"]},
    {q:"What is the greatest common factor of 20 and 30?", a:"10", w:["5","15","11"]},
    {q:"What is the greatest common factor of 27 and 36?", a:"9", w:["6","12","10"]},
    {q:"What is the greatest common factor of 12 and 18?", a:"6", w:["3","36","7"]},
    {q:"What is the greatest common factor of 16 and 24?", a:"8", w:["4","12","9"]},
    {q:"What is the greatest common factor of 20 and 30?", a:"10", w:["5","15","11"]},
    {q:"What is the greatest common factor of 27 and 36?", a:"9", w:["6","12","10"]},
    {q:"What is the greatest common factor of 12 and 18?", a:"6", w:["3","36","7"]},
    {q:"What is the greatest common factor of 16 and 24?", a:"8", w:["4","12","9"]}
  ], "Find the greatest common factor.");
}


/* ---------- L16: LEAST COMMON MULTIPLE ---------- */
function gen_g6_math_L16(){
  return g6ExtraQuestion([
    {q:"What is the least common multiple of 4 and 6?", a:"12", w:["10","24","13"]},
    {q:"What is the least common multiple of 5 and 8?", a:"40", w:["13","20","41"]},
    {q:"What is the least common multiple of 6 and 9?", a:"18", w:["15","54","19"]},
    {q:"What is the least common multiple of 3 and 7?", a:"21", w:["10","14","22"]},
    {q:"What is the least common multiple of 4 and 6?", a:"12", w:["10","24","13"]},
    {q:"What is the least common multiple of 5 and 8?", a:"40", w:["13","20","41"]},
    {q:"What is the least common multiple of 6 and 9?", a:"18", w:["15","54","19"]},
    {q:"What is the least common multiple of 3 and 7?", a:"21", w:["10","14","22"]},
    {q:"What is the least common multiple of 4 and 6?", a:"12", w:["10","24","13"]},
    {q:"What is the least common multiple of 5 and 8?", a:"40", w:["13","20","41"]}
  ], "Find the least common multiple.");
}


/* ---------- L17: UNIT RATES ---------- */
function gen_g6_math_L17(){
  return g6ExtraQuestion([
    {
      q:"A car travels 180 miles in 3 hours. What is its unit rate?",
      a:"60 Miles per hour",
      w:["90 Miles per hour","183 Miles per hour","15 Minutes later"]
    },
    {
      q:"Four notebooks cost $12. What is the cost per notebook?",
      a:"$3",
      w:["$4","$8","Notebook"]
    },
    {
      q:"A baker makes 48 muffins in 6 batches. How many muffins per batch?",
      a:"8 Muffins",
      w:["42 Muffins","12 Muffins","Muffins"]
    },
    {
      q:"A cyclist rides 35 miles in 5 hours. What is the unit rate?",
      a:"7 Miles per hour",
      w:["30 Miles per hour","40 Miles per hour","15 Minutes later"]
    },
    {
      q:"A car travels 180 miles in 3 hours. What is its unit rate?",
      a:"60 Miles per hour",
      w:["90 Miles per hour","183 Miles per hour","15 Minutes later"]
    },
    {
      q:"Four notebooks cost $12. What is the cost per notebook?",
      a:"$3",
      w:["$4","$8","Notebook"]
    },
    {
      q:"A baker makes 48 muffins in 6 batches. How many muffins per batch?",
      a:"8 Muffins",
      w:["42 Muffins","12 Muffins","Muffins"]
    },
    {
      q:"A cyclist rides 35 miles in 5 hours. What is the unit rate?",
      a:"7 Miles per hour",
      w:["30 Miles per hour","40 Miles per hour","15 Minutes later"]
    },
    {
      q:"A car travels 180 miles in 3 hours. What is its unit rate?",
      a:"60 Miles per hour",
      w:["90 Miles per hour","183 Miles per hour","15 Minutes later"]
    },
    {
      q:"Four notebooks cost $12. What is the cost per notebook?",
      a:"$3",
      w:["$4","$8","Notebook"]
    }
  ], "Find the unit rate.");
}


/* ---------- L18: PERCENT OF A NUMBER ---------- */
function gen_g6_math_L18(){
  return g6ExtraQuestion([
    {q:"What is 50% of 80?", a:"40", w:["30","50","41"]},
    {q:"What is 25% of 60?", a:"15", w:["20","35","16"]},
    {q:"What is 10% of 250?", a:"25", w:["10","50","26"]},
    {q:"What is 75% of 40?", a:"30", w:["20","35","31"]},
    {q:"What is 50% of 80?", a:"40", w:["30","50","41"]},
    {q:"What is 25% of 60?", a:"15", w:["20","35","16"]},
    {q:"What is 10% of 250?", a:"25", w:["10","50","26"]},
    {q:"What is 75% of 40?", a:"30", w:["20","35","31"]},
    {q:"What is 50% of 80?", a:"40", w:["30","50","41"]},
    {q:"What is 25% of 60?", a:"15", w:["20","35","16"]}
  ], "Find the percent of the number.");
}


/* ---------- L19: DIVIDE FRACTIONS ---------- */
function gen_g6_math_L19(){
  return g6ExtraQuestion([
    {q:"1/2 ÷ 1/4 = ?", a:"2", w:["1/8","1","3"]},
    {q:"3/4 ÷ 1/2 = ?", a:"1 1/2", w:["3/8","2 1/2","4/4"]},
    {q:"2/3 ÷ 1/3 = ?", a:"2", w:["1","3","4"]},
    {q:"5/6 ÷ 5/12 = ?", a:"2", w:["1/2","10","3"]},
    {q:"1/2 ÷ 1/4 = ?", a:"2", w:["1/8","1","3"]},
    {q:"3/4 ÷ 1/2 = ?", a:"1 1/2", w:["3/8","2 1/2","4/4"]},
    {q:"2/3 ÷ 1/3 = ?", a:"2", w:["1","3","4"]},
    {q:"5/6 ÷ 5/12 = ?", a:"2", w:["1/2","10","3"]},
    {q:"1/2 ÷ 1/4 = ?", a:"2", w:["1/8","1","3"]},
    {q:"3/4 ÷ 1/2 = ?", a:"1 1/2", w:["3/8","2 1/2","4/4"]}
  ], "Divide fractions by multiplying by the reciprocal.");
}


/* ---------- L20: DECIMAL OPERATIONS ---------- */
function gen_g6_math_L20(){
  return g6ExtraQuestion([
    {q:"4.75 + 2.6 = ?", a:"7.35", w:["6.35","7.95","8.35"]},
    {q:"9.4 - 3.28 = ?", a:"6.12", w:["6.22","5.12","7.12"]},
    {q:"2.5 × 4 = ?", a:"10", w:["6.5","100","11"]},
    {q:"12.6 ÷ 3 = ?", a:"4.2", w:["3.2","42","5.2"]},
    {q:"  4.75 + 2.6 = ?", a:"7.35", w:["6.35","7.95","8.35"]},
    {q:"9.4 - 3.28 = ?", a:"6.12", w:["6.22","5.12","7.12"]},
    {q:"2.5 × 4 = ?", a:"10", w:["6.5","100","11"]},
    {q:"12.6 ÷ 3 = ?", a:"4.2", w:["3.2","42","5.2"]},
    {q:"4.75 + 2.6 = ?", a:"7.35", w:["6.35","7.95","8.35"]},
    {q:"9.4 - 3.28 = ?", a:"6.12", w:["6.22","5.12","7.12"]}
  ], "Solve the decimal operation.");
}


/* ---------- L21: SURFACE AREA ---------- */
function gen_g6_math_L21(){
  return g6ExtraQuestion([
    {
      q:"A cube has side length 3 units. What is its surface area?",
      a:"54 Square units",
      w:["27 Square units","18 Square units","Area"]
    },
    {
      q:"Which formula finds the surface area of a cube with side length s?",
      a:"6 × S × s",
      w:["S × s × s","4 × S","Area"]
    },
    {
      q:"A rectangular prism has six flat surfaces called…",
      a:"Faces",
      w:["Angles only","Axes","Area"]
    },
    {
      q:"A cube has side length 5 units. What is its surface area?",
      a:"150 Square units",
      w:["125 Square units","100 Square units","Area"]
    },
    {
      q:"A cube has side length 3 units. What is its surface area?",
      a:"54 Square units",
      w:["27 Square units","18 Square units","Area"]
    },
    {
      q:"Which formula finds the surface area of a cube with side length s?",
      a:"6 × S × s",
      w:["S × s × s","4 × S","Area"]
    },
    {
      q:"A rectangular prism has six flat surfaces called…",
      a:"Faces",
      w:["Angles only","Axes","Area"]
    },
    {
      q:"A cube has side length 5 units. What is its surface area?",
      a:"150 Square units",
      w:["125 Square units","100 Square units","Area"]
    },
    {
      q:"A cube has side length 3 units. What is its surface area?",
      a:"54 Square units",
      w:["27 Square units","18 Square units","Area"]
    },
    {
      q:"Which formula finds the surface area of a cube with side length s?",
      a:"6 × S × s",
      w:["S × s × s","4 × S","Area"]
    }
  ], "Find or describe surface area.");
}


/* ---------- L22: MEAN, MEDIAN AND RANGE ---------- */
function gen_g6_math_L22(){
  return g6ExtraQuestion([
    {
      q:"What is the mean of 4, 6, and 8?",
      a:"6",
      w:["4","8","7"]
    },
    {
      q:"What is the median of 3, 7, 9, 10, and 12?",
      a:"9",
      w:["7","10","8"]
    },
    {
      q:"What is the range of 5, 11, 13, and 20?",
      a:"15",
      w:["20","8","16"]
    },
    {
      q:"What is the mean of 10, 12, 14, and 16?",
      a:"13",
      w:["12","14","15"]
    },
    {
      q:"What is the mean of 4, 6, and 8?",
      a:"6",
      w:["4","8","7"]
    },
    {
      q:"What is the median of 3, 7, 9, 10, and 12?",
      a:"9",
      w:["7","10","8"]
    },
    {
      q:"What is the range of 5, 11, 13, and 20?",
      a:"15",
      w:["20","8","16"]
    },
    {
      q:"What is the mean of 10, 12, 14, and 16?",
      a:"13",
      w:["12","14","15"]
    },
    {
      q:"What is the mean of 4, 6, and 8?",
      a:"6",
      w:["4","8","7"]
    },
    {
      q:"What is the median of 3, 7, 9, 10, and 12?",
      a:"9",
      w:["7","10","8"]
    }
  ], "Solve the data question.");
}


/* ---------- GRADE 6 SCIENCE ---------- */
function gen_g6_sci_L1(){
  const it = pick([
    {q:"The organelle that makes energy is the…", a:"Mitochondria", w:["Nucleus","Ribosome","Gravity"]},
    {q:"The cell membrane controls what goes…", a:"In and out", w:["Up and down","Left and right","Organ system"]},
    {q:"Which organelle releases energy during respiration?", a:"Mitochondria", w:["Chloroplast","Nucleus","1/2"]},
{q:"Which structure protects and supports the cell?", a:"Cell membrane", w:["Ribosome","Vacuole","Organ system"]},
{q:"Ribosomes are responsible for making…", a:"Proteins", w:["Energy","Lipids","Gravity"]},
{q:"Which organelle stores materials like water and food?", a:"Vacuole", w:["Nucleus","Mitochondria","Organ system"]},
{q:"Which organelle contains DNA?", a:"Nucleus", w:["Cytoplasm","Ribosome","Organ system"]},
{q:"Which part is found in both plant and animal cells?", a:"Mitochondria", w:["Cell wall","Chloroplast","Reptile"]},
{q:"Which organelle controls cell activities?", a:"Nucleus", w:["Vacuole","Ribosome","Organ system"]},
{q:"Which structure allows materials to pass in and out?", a:"Cell membrane", w:["Cell wall","Nucleus","Organ system"]},

  ]);
  return mcQuestion(it.q, it.a, it.w, "Cells and organelles.");
}
function gen_g6_sci_L2(){
  const it = pick([
    {q:"Heat, light, and sound are forms of…", a:"Energy", w:["Metal","Plastic","Plain"]},
    {q:"Energy cannot be created or destroyed. It can be…", a:"Changed", w:["Erased","Broken","Gravity"]},
    {q:"Heat, light, and sound are forms of…", a:"Energy", w:["Metal","Plastic","Plain"]},
    {q:"Energy cannot be created or destroyed. It can be…", a:"Changed", w:["Erased","Broken","Gravity"]},
    {q:"Heat, light, and sound are forms of…", a:"Energy", w:["Metal","Plastic","Plain"]},
    {q:"Energy cannot be created or destroyed. It can be…", a:"Changed", w:["Erased","Broken","Gravity"]},
    {q:"Heat, light, and sound are forms of…", a:"Energy", w:["Metal","Plastic","Plain"]},
    {q:"Energy cannot be created or destroyed. It can be…", a:"Changed", w:["Erased","Broken","Gravity"]},
    {q:"Heat, light, and sound are forms of…", a:"Energy", w:["Metal","Plastic","Plain"]},
    {q:"Energy cannot be created or destroyed. It can be…", a:"Changed", w:["Erased","Broken","Gravity"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Energy concept.");
}
function gen_g6_sci_L3(){
  const it = pick([
    {q:"The layer of Earth we live on is the…", a:"Crust", w:["Core","Mantle","Climate"]},
    {q:"Weather happens in the…", a:"Atmosphere", w:["Core","Mantle","Climate"]},
    {q:"The layer of Earth we live on is the…", a:"Crust", w:["Core","Mantle","Climate"]},
    {q:"Weather happens in the…", a:"Atmosphere", w:["Core","Mantle","Climate"]},
    {q:"The layer of Earth we live on is the…", a:"Crust", w:["Core","Mantle","Climate"]},
    {q:"Weather happens in the…", a:"Atmosphere", w:["Core","Mantle","Climate"]},
    {q:"The layer of Earth we live on is the…", a:"Crust", w:["Core","Mantle","Climate"]},
    {q:"Weather happens in the…", a:"Atmosphere", w:["Core","Mantle","Climate"]},
    {q:"The layer of Earth we live on is the…", a:"Crust", w:["Core","Mantle","Climate"]},
    {q:"Weather happens in the…", a:"Atmosphere", w:["Core","Mantle","Climate"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Earth systems.");
}
function gen_g6_sci_L4(){
  const it = pick([
    {q:"Igneous rocks form from…", a:"Magma or lava", w:["Sediment","Heat and pressure","Climate"]},
    {q:"Sedimentary rocks are made from…", a:"Layers of sediment", w:["Magma","Crystals","Climate"]},
    {q:"Igneous rocks form from…", a:"Magma or lava", w:["Sediment","Heat and pressure","Climate"]},
    {q:"Sedimentary rocks are made from…", a:"Layers of sediment", w:["Magma","Crystals","Climate"]},
    {q:"Igneous rocks form from…", a:"Magma or lava", w:["Sediment","Heat and pressure","Climate"]},
    {q:"Sedimentary rocks are made from…", a:"Layers of sediment", w:["Magma","Crystals","Climate"]},
    {q:"Igneous rocks form from…", a:"Magma or lava", w:["Sediment","Heat and pressure","Climate"]},
    {q:"Sedimentary rocks are made from…", a:"Layers of sediment", w:["Magma","Crystals","Climate"]},
    {q:"Igneous rocks form from…", a:"Magma or lava", w:["Sediment","Heat and pressure","Climate"]},
    {q:"Sedimentary rocks are made from…", a:"Layers of sediment", w:["Magma","Crystals","Climate"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Types of rocks.");
}

function gen_g6_sci_L5(){
  const it = pick([
    {q:"Which tool measures temperature?", a:"Thermometer", w:["Barometer","Scale","Temperature"]},
    {q:"Water freezes at about…", a:"0°C", w:["50°C","100°C","Topic detail"]},
    {q:"Which tool measures temperature?", a:"Thermometer", w:["Barometer","Scale","Temperature"]},
    {q:"Water freezes at about…", a:"0°C", w:["50°C","100°C","Topic detail"]},
    {q:"Which tool measures temperature?", a:"Thermometer", w:["Barometer","Scale","Temperature"]},
    {q:"Water freezes at about…", a:"0°C", w:["50°C","100°C","Topic detail"]},
    {q:"Which tool measures temperature?", a:"Thermometer", w:["Barometer","Scale","Temperature"]},
    {q:"Water freezes at about…", a:"0°C", w:["50°C","100°C","Topic detail"]},
    {q:"Which tool measures temperature?", a:"Thermometer", w:["Barometer","Scale","Temperature"]},
    {q:"Water freezes at about…", a:"0°C", w:["50°C","100°C","Topic detail"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Estimating temperature.");
}

function gen_g6_sci_L6(){
  const it = pick([
    {q:"Which unit is best for measuring a road?", a:"Miles", w:["Inches","Ounces","Road"]},
    {q:"A pencil is best measured in…", a:"Inches", w:["Miles","Pounds","Measured"]},
    {q:"Which unit is best for measuring a road?", a:"Miles", w:["Inches","Ounces","Road"]},
    {q:"A pencil is best measured in…", a:"Inches", w:["Miles","Pounds","Measured"]},
    {q:"Which unit is best for measuring a road?", a:"Miles", w:["Inches","Ounces","Road"]},
    {q:"A pencil is best measured in…", a:"Inches", w:["Miles","Pounds","Measured"]},
    {q:"Which unit is best for measuring a road?", a:"Miles", w:["Inches","Ounces","Road"]},
    {q:"A pencil is best measured in…", a:"Inches", w:["Miles","Pounds","Measured"]},
    {q:"Which unit is best for measuring a road?", a:"Miles", w:["Inches","Ounces","Road"]},
    {q:"A pencil is best measured in…", a:"Inches", w:["Miles","Pounds","Measured"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Customary distance units.");
}

function gen_g6_sci_L7(){
  const it = pick([
    {q:"Which unit measures mass?", a:"Grams", w:["Liters","Meters","Mass"]},
    {q:"Which unit measures liquid volume?", a:"Liters", w:["Grams","Kilograms","Friction"]},
    {q:"Which unit measures mass?", a:"Grams", w:["Liters","Meters","Mass"]},
    {q:"Which unit measures liquid volume?", a:"Liters", w:["Grams","Kilograms","Friction"]},
    {q:"Which unit measures mass?", a:"Grams", w:["Liters","Meters","Mass"]},
    {q:"Which unit measures liquid volume?", a:"Liters", w:["Grams","Kilograms","Friction"]},
    {q:"Which unit measures mass?", a:"Grams", w:["Liters","Meters","Mass"]},
    {q:"Which unit measures liquid volume?", a:"Liters", w:["Grams","Kilograms","Friction"]},
    {q:"Which unit measures mass?", a:"Grams", w:["Liters","Meters","Mass"]},
    {q:"Which unit measures liquid volume?", a:"Liters", w:["Grams","Kilograms","Friction"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Metric units.");
}

function gen_g6_sci_L8(){
  const it = pick([
    {q:"Which part controls the plant cell?", a:"Nucleus", w:["Cell wall","Vacuole","Roots"]},
    {q:"Which part helps plants make food?", a:"Chloroplast", w:["Mitochondria","Ribosome","Roots"]},
    {q:"Which part controls the plant cell?", a:"Nucleus", w:["Cell wall","Vacuole","Roots"]},
    {q:"Which part helps plants make food?", a:"Chloroplast", w:["Mitochondria","Ribosome","Roots"]},
    {q:"Which part controls the plant cell?", a:"Nucleus", w:["Cell wall","Vacuole","Roots"]},
    {q:"Which part helps plants make food?", a:"Chloroplast", w:["Mitochondria","Ribosome","Roots"]},
    {q:"Which part controls the plant cell?", a:"Nucleus", w:["Cell wall","Vacuole","Roots"]},
    {q:"Which part helps plants make food?", a:"Chloroplast", w:["Mitochondria","Ribosome","Roots"]},
    {q:"Which part controls the plant cell?", a:"Nucleus", w:["Cell wall","Vacuole","Roots"]},
    {q:"Which part helps plants make food?", a:"Chloroplast", w:["Mitochondria","Ribosome","Roots"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Plant cell parts.");
}

function gen_g6_sci_L9(){
  const it = pick([
    {q:"Which part produces energy in cells?", a:"Mitochondria", w:["Nucleus","Cell wall","Gravity"]},
    {q:"Animal cells do NOT have a…", a:"Cell wall", w:["Nucleus","Cytoplasm","Reptile"]},
    {q:"Which part produces energy in cells?", a:"Mitochondria", w:["Nucleus","Cell wall","Gravity"]},
    {q:"Animal cells do NOT have a…", a:"Cell wall", w:["Nucleus","Cytoplasm","Reptile"]},
    {q:"Which part produces energy in cells?", a:"Mitochondria", w:["Nucleus","Cell wall","Gravity"]},
    {q:"Animal cells do NOT have a…", a:"Cell wall", w:["Nucleus","Cytoplasm","Reptile"]},
    {q:"Which part produces energy in cells?", a:"Mitochondria", w:["Nucleus","Cell wall","Gravity"]},
    {q:"Animal cells do NOT have a…", a:"Cell wall", w:["Nucleus","Cytoplasm","Reptile"]},
    {q:"Which part produces energy in cells?", a:"Mitochondria", w:["Nucleus","Cell wall","Gravity"]},
    {q:"Animal cells do NOT have a…", a:"Cell wall", w:["Nucleus","Cytoplasm","Reptile"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Animal cell parts.");
}

function gen_g6_sci_L10(){
  const it = pick([
    {q:"Both plant and animal cells have a…", a:"Nucleus", w:["Cell wall","Chloroplast","Reptile"]},
    {q:"Only plant cells have…", a:"Chloroplasts", w:["Mitochondria","Ribosomes","Roots"]},
    {q:"Both plant and animal cells have a…", a:"Nucleus", w:["Cell wall","Chloroplast","Reptile"]},
    {q:"Only plant cells have…", a:"Chloroplasts", w:["Mitochondria","Ribosomes","Roots"]},
    {q:"Both plant and animal cells have a…", a:"Nucleus", w:["Cell wall","Chloroplast","Reptile"]},
    {q:"Only plant cells have…", a:"Chloroplasts", w:["Mitochondria","Ribosomes","Roots"]},
    {q:"Both plant and animal cells have a…", a:"Nucleus", w:["Cell wall","Chloroplast","Reptile"]},
    {q:"Only plant cells have…", a:"Chloroplasts", w:["Mitochondria","Ribosomes","Roots"]},
    {q:"Both plant and animal cells have a…", a:"Nucleus", w:["Cell wall","Chloroplast","Reptile"]},
    {q:"Only plant cells have…", a:"Chloroplasts", w:["Mitochondria","Ribosomes","Roots"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Comparing cells.");
}

function gen_g6_sci_L11(){
  const it = pick([
    {q:"Speed equals…", a:"Distance ÷ time", w:["Time ÷ distance","Distance × time","15 Minutes later"]},
    {q:"If distance increases, speed…", a:"Increases", w:["Decreases","Stays the same","Same"]},
    {q:"Speed equals…", a:"Distance ÷ time", w:["Time ÷ distance","Distance × time","15 Minutes later"]},
    {q:"If distance increases, speed…", a:"Increases", w:["Decreases","Stays the same","Same"]},
    {q:"Speed equals…", a:"Distance ÷ time", w:["Time ÷ distance","Distance × time","15 Minutes later"]},
    {q:"If distance increases, speed…", a:"Increases", w:["Decreases","Stays the same","Same"]},
    {q:"Speed equals…", a:"Distance ÷ time", w:["Time ÷ distance","Distance × time","15 Minutes later"]},
    {q:"If distance increases, speed…", a:"Increases", w:["Decreases","Stays the same","Same"]},
    {q:"Speed equals…", a:"Distance ÷ time", w:["Time ÷ distance","Distance × time","15 Minutes later"]},
    {q:"If distance increases, speed…", a:"Increases", w:["Decreases","Stays the same","Same"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Calculating speed.");
}

function gen_g6_sci_L12(){
  const it = pick([
    {q:"Distance equals…", a:"Speed × time", w:["Time ÷ speed","Speed ÷ time","15 Minutes later"]},
    {q:"If speed is zero, distance is…", a:"Zero", w:["High","Unknown","Distance"]},
    {q:"Distance equals…", a:"Speed × time", w:["Time ÷ speed","Speed ÷ time","15 Minutes later"]},
    {q:"If speed is zero, distance is…", a:"Zero", w:["High","Unknown","Distance"]},
    {q:"Distance equals…", a:"Speed × time", w:["Time ÷ speed","Speed ÷ time","15 Minutes later"]},
    {q:"If speed is zero, distance is…", a:"Zero", w:["High","Unknown","Distance"]},
    {q:"Distance equals…", a:"Speed × time", w:["Time ÷ speed","Speed ÷ time","15 Minutes later"]},
    {q:"If speed is zero, distance is…", a:"Zero", w:["High","Unknown","Distance"]},
    {q:"Distance equals…", a:"Speed × time", w:["Time ÷ speed","Speed ÷ time","15 Minutes later"]},
    {q:"If speed is zero, distance is…", a:"Zero", w:["High","Unknown","Distance"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Calculating distance.");
}

function gen_g6_sci_L13(){
  const it = pick([
    {q:"Newton’s third law says forces come in…", a:"Pairs", w:["Singles","Circles","Area"]},
    {q:"Every action has an equal and opposite…", a:"Reaction", w:["Force","Motion","Unrelated meaning"]},
    {q:"A force that resists motion between surfaces is called…", a:"Friction", w:["Gravity","Inertia","Magnetism"]},
{q:"When you push on a wall, the wall pushes back with an equal force called a…", a:"Reaction force", w:["Net force","Contact","Gravity"]},
{q:"If a swimmer pushes water backward, the water pushes the swimmer…", a:"Forward", w:["Down","Sideways","Different event"]},
{q:"Newton’s third law applies to forces acting on…", a:"Different objects", w:["One object","Only moving objects","Gravity"]},
{q:"A rocket moves upward because exhaust gases are pushed…", a:"Downward", w:["Upward","Outward","Friction"]},
{q:"When a book rests on a table, the table pushes up with a force called…", a:"Normal force", w:["Friction","Gravity","Magnetism"]},
{q:"In an action–reaction pair, the forces are always equal in…", a:"Magnitude", w:["Direction","Mass","Gravity"]},
{q:"Action–reaction forces do not cancel because they act on…", a:"Different objects", w:["The same object","The same point","Area"]}

  ]);
  return mcQuestion(it.q, it.a, it.w, "Newton’s third law.");
}


   function gen_g6_sci_L14(){
  const it = pick([
    {q:"Balanced forces cause motion to…", a:"Stay the same", w:["Speed up","Slow down","Gravity"]},
    {q:"Unbalanced forces cause…", a:"Change in motion", w:["No motion","No force","Gravity"]},
    {q:"A force that slows an object down is called…", a:"Friction", w:["Gravity","Magnetism","Thermal energy"]},
    {q:"Gravity pulls objects…", a:"Toward earth", w:["Away from earth","Sideways","Gravity"]},
    {q:"A push or a pull is called a…", a:"Force", w:["Mass","Speed","Gravity"]},
    {q:"When forces are balanced, an object at rest will…", a:"Stay at rest", w:["Start moving","Speed up","Gravity"]},
    {q:"Unbalanced forces can change an object’s…", a:"Speed or direction", w:["Color","Temperature","Gravity"]},
    {q:"Friction happens when two surfaces…", a:"Rub together", w:["Float","Separate","Gravity"]},
    {q:"More force usually causes more…", a:"Acceleration", w:["Friction","Mass","1/2"]},
    {q:"Air resistance is a type of…", a:"Friction", w:["Gravity","Magnetism","Thermal energy"]},
  ]);

  return mcQuestion(it.q, it.a, it.w, "Choose the correct answer about forces and motion.");
}
/* ---------- L15-L22 FIXED FORMAT ---------- */

function gen_g6_sci_L15(){
  const it = pick([
    {q:"The smallest unit of an element is an…", a:"Atom", w:["Organ","Ecosystem","Roots"]},
    {q:"A substance made of one kind of atom is an…", a:"Element", w:["Habitat","Rock layer","Reptile"]},
    {q:"Which particle has a negative charge?", a:"Electron", w:["Proton","Neutron","Charge"]},
    {q:"Which particle has a positive charge?", a:"Proton", w:["Electron","Molecule","Charge"]},
    {q:"The smallest unit of an element is an…", a:"Atom", w:["Organ","Ecosystem","Roots"]},
    {q:"A substance made of one kind of atom is an…", a:"Element", w:["Habitat","Rock layer","Reptile"]},
    {q:"Which particle has a negative charge?", a:"Electron", w:["Proton","Neutron","Charge"]},
    {q:"Which particle has a positive charge?", a:"Proton", w:["Electron","Molecule","Charge"]},
    {q:"The smallest unit of an element is an…", a:"Atom", w:["Organ","Ecosystem","Roots"]},
    {q:"A substance made of one kind of atom is an…", a:"Element", w:["Habitat","Rock layer","Reptile"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Atoms and elements.");
}

function gen_g6_sci_L16(){
  const it = pick([
    {q:"Density is mass divided by…", a:"Volume", w:["Temperature","Distance","Area"]},
    {q:"An object denser than water will usually…", a:"Sink", w:["Float","Evaporate","Friction"]},
    {q:"20 grams / 5 mL = ___", a:"4 G/ml", w:["25 G/ml","15 G/ml","Grams"]},
    {q:"More mass in the same volume means…", a:"More dense", w:["Less dense","No matter","Friction"]},
    {q:"Density is mass divided by…", a:"Volume", w:["Temperature","Distance","Area"]},
    {q:"An object denser than water will usually…", a:"Sink", w:["Float","Evaporate","Friction"]},
    {q:"20 grams / 5 mL = ___", a:"4 G/ml", w:["25 G/ml","15 G/ml","Grams"]},
    {q:"More mass in the same volume means…", a:"More dense", w:["Less dense","No matter","Friction"]},
    {q:"Density is mass divided by…", a:"Volume", w:["Temperature","Distance","Area"]},
    {q:"An object denser than water will usually…", a:"Sink", w:["Float","Evaporate","Friction"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Density concepts.");
}

function gen_g6_sci_L17(){
  const it = pick([
    {q:"Heat through direct contact is…", a:"Conduction", w:["Evaporation","Photosynthesis","Friction"]},
    {q:"Warm air rising is…", a:"Convection", w:["Erosion","Magnetism","Gravity"]},
    {q:"Energy from the Sun travels by…", a:"Radiation", w:["Friction","Germination","Gravity"]},
    {q:"Heat through direct contact is…", a:"Conduction", w:["Evaporation","Photosynthesis","Friction"]},
    {q:"Warm air rising is…", a:"Convection", w:["Erosion","Magnetism","Gravity"]},
    {q:"Energy from the Sun travels by…", a:"Radiation", w:["Friction","Germination","Gravity"]},
    {q:"Heat through direct contact is…", a:"Conduction", w:["Evaporation","Photosynthesis","Friction"]},
    {q:"Warm air rising is…", a:"Convection", w:["Erosion","Magnetism","Gravity"]},
    {q:"Energy from the Sun travels by…", a:"Radiation", w:["Friction","Germination","Gravity"]},
    {q:"Heat through direct contact is…", a:"Conduction", w:["Evaporation","Photosynthesis","Friction"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g6_sci_L18(){
  const it = pick([
    {q:"The height of a wave is called ___.", a:"amplitude"},
    {q:"The distance between wave crests is ___.", a:"wavelength"},
    {q:"Sound needs a material called a ___.", a:"medium"},
    {q:"Greater amplitude makes sound ___.", a:"louder"},
    {q:"The height of a wave is called ___.", a:"amplitude"},
    {q:"The distance between wave crests is ___.", a:"wavelength"},
    {q:"Sound needs a material called a ___.", a:"medium"},
    {q:"Greater amplitude makes sound ___.", a:"louder"},
    {q:"The height of a wave is called ___.", a:"amplitude"},
    {q:"The distance between wave crests is ___.", a:"wavelength"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g6_sci_L19(){
  return matchQuestion([
    {left:"Producer", right:"Makes its own food"},
    {left:"Consumer", right:"Eats organisms"},
    {left:"Decomposer", right:"Breaks down dead material"},
    {left:"Ecosystem", right:"Living and nonliving interactions"}
  ]);
}

function gen_g6_sci_L20(){
  const it = pick([
    {bad:"plants use sunlight water and carbon dioxide.", good:"Plants use sunlight, water, and carbon dioxide."},
    {bad:"photosynthesis makes oxygen", good:"Photosynthesis makes oxygen."},
    {bad:"cells release energy through respiration", good:"Cells release energy through respiration."},
    {bad:"chloroplasts help plants make food", good:"Chloroplasts help plants make food."},
    {bad:"plants use sunlight water and carbon dioxide.", good:"Plants use sunlight, water, and carbon dioxide."},
    {bad:"photosynthesis makes oxygen", good:"Photosynthesis makes oxygen."},
    {bad:"cells release energy through respiration", good:"Cells release energy through respiration."},
    {bad:"chloroplasts help plants make food", good:"Chloroplasts help plants make food."},
    {bad:"plants use sunlight water and carbon dioxide.", good:"Plants use sunlight, water, and carbon dioxide."},
    {bad:"photosynthesis makes oxygen", good:"Photosynthesis makes oxygen."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g6_sci_L21(){
  const it = pick([
    {q:"Weather is short-term atmospheric conditions.", a:"True", w:["False","Only sometimes","Climate"]},
    {q:"Climate describes patterns over many years.", a:"True", w:["False","Never","Climate"]},
    {q:"A barometer measures air pressure.", a:"True", w:["False","Only temperature","Temperature"]},
    {q:"Weather is short-term atmospheric conditions.", a:"True", w:["False","Only sometimes","Climate"]},
    {q:"Climate describes patterns over many years.", a:"True", w:["False","Never","Climate"]},
    {q:"A barometer measures air pressure.", a:"True", w:["False","Only temperature","Temperature"]},
    {q:"Weather is short-term atmospheric conditions.", a:"True", w:["False","Only sometimes","Climate"]},
    {q:"Climate describes patterns over many years.", a:"True", w:["False","Never","Climate"]},
    {q:"A barometer measures air pressure.", a:"True", w:["False","Only temperature","Temperature"]},
    {q:"Weather is short-term atmospheric conditions.", a:"True", w:["False","Only sometimes","Climate"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g6_sci_L22(){
  return matchQuestion([
    {left:"Biosphere", right:"Living things"},
    {left:"Hydrosphere", right:"Water"},
    {left:"Geosphere", right:"Rocks and land"},
    {left:"Atmosphere", right:"Gases around Earth"}
  ]);
}


/* ---------- L23-L47 NEW GRADE 6 SCIENCE ---------- */

function gen_g6_sci_L23(){
  const it = pick([
    {q:"Energy is the ability to do…", a:"Work", w:["Nothing","Color","Gravity"]},
    {q:"Which is a form of energy?", a:"Light", w:["Sand","Wood","Gravity"]},
    {q:"Energy can move or be…", a:"Stored", w:["Deleted","Painted","Gravity"]},
    {q:"Energy is the ability to do…", a:"Work", w:["Nothing","Color","Gravity"]},
    {q:"Which is a form of energy?", a:"Light", w:["Sand","Wood","Gravity"]},
    {q:"Energy can move or be…", a:"Stored", w:["Deleted","Painted","Gravity"]},
    {q:"Energy is the ability to do…", a:"Work", w:["Nothing","Color","Gravity"]},
    {q:"Which is a form of energy?", a:"Light", w:["Sand","Wood","Gravity"]},
    {q:"Energy can move or be…", a:"Stored", w:["Deleted","Painted","Gravity"]},
    {q:"Energy is the ability to do…", a:"Work", w:["Nothing","Color","Gravity"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Energy basics.");
}

function gen_g6_sci_L24(){
  const it = pick([
    {q:"Kinetic energy is energy of ___.", a:"motion"},
    {q:"A rolling ball has ___ energy.", a:"kinetic"},
    {q:"A moving car has ___ energy.", a:"kinetic"},
    {q:"The faster an object moves, the more ___ energy it has.", a:"kinetic"},
    {q:"Kinetic energy is energy of ___.", a:"motion"},
    {q:"A rolling ball has ___ energy.", a:"kinetic"},
    {q:"A moving car has ___ energy.", a:"kinetic"},
    {q:"The faster an object moves, the more ___ energy it has.", a:"kinetic"},
    {q:"Kinetic energy is energy of ___.", a:"motion"},
    {q:"A rolling ball has ___ energy.", a:"kinetic"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g6_sci_L25(){
  const it = pick([
    {bad:"potential energy is stored energy.", good:"Potential energy is stored energy."},
    {bad:"a book on a shelf has potential energy", good:"A book on a shelf has potential energy."},
    {bad:"height can increase potential energy", good:"Height can increase potential energy."},
    {bad:"potential energy is stored energy.", good:"Potential energy is stored energy."},
    {bad:"a book on a shelf has potential energy", good:"A book on a shelf has potential energy."},
    {bad:"height can increase potential energy", good:"Height can increase potential energy."},
    {bad:"potential energy is stored energy.", good:"Potential energy is stored energy."},
    {bad:"a book on a shelf has potential energy", good:"A book on a shelf has potential energy."},
    {bad:"height can increase potential energy", good:"Height can increase potential energy."},
    {bad:"potential energy is stored energy.", good:"Potential energy is stored energy."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g6_sci_L26(){
  return matchQuestion([
    {left:"Flashlight", right:"Chemical to light"},
    {left:"Speaker", right:"Electrical to sound"},
    {left:"Toaster", right:"Electrical to thermal"},
    {left:"Plant", right:"Light to chemical"}
  ]);
}

function gen_g6_sci_L27(){
  const it = pick([
    {q:"A moving skateboard has…", a:"Kinetic energy", w:["No energy","Only chemical energy","Gravity"]},
    {q:"A stretched rubber band has…", a:"Potential energy", w:["No energy","Only light energy","Gravity"]},
    {q:"A falling rock changes potential energy into…", a:"Kinetic energy", w:["Sound only","Light only","Plain"]},
    {q:"A moving skateboard has…", a:"Kinetic energy", w:["No energy","Only chemical energy","Gravity"]},
    {q:"A stretched rubber band has…", a:"Potential energy", w:["No energy","Only light energy","Gravity"]},
    {q:"A falling rock changes potential energy into…", a:"Kinetic energy", w:["Sound only","Light only","Plain"]},
    {q:"A moving skateboard has…", a:"Kinetic energy", w:["No energy","Only chemical energy","Gravity"]},
    {q:"A stretched rubber band has…", a:"Potential energy", w:["No energy","Only light energy","Gravity"]},
    {q:"A falling rock changes potential energy into…", a:"Kinetic energy", w:["Sound only","Light only","Plain"]},
    {q:"A moving skateboard has…", a:"Kinetic energy", w:["No energy","Only chemical energy","Gravity"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g6_sci_L28(){
  const it = pick([
    {q:"A group of organs working together is a…", a:"Body system", w:["Cell wall","Food chain","Roots"]},
    {q:"The nervous system sends…", a:"Signals", w:["Rocks","Roots","Stem"]},
    {q:"The respiratory system helps you…", a:"Breathe", w:["Digest rocks","Make light","Roots"]},
    {q:"A group of organs working together is a…", a:"Body system", w:["Cell wall","Food chain","Roots"]},
    {q:"The nervous system sends…", a:"Signals", w:["Rocks","Roots","Stem"]},
    {q:"The respiratory system helps you…", a:"Breathe", w:["Digest rocks","Make light","Roots"]},
    {q:"A group of organs working together is a…", a:"Body system", w:["Cell wall","Food chain","Roots"]},
    {q:"The nervous system sends…", a:"Signals", w:["Rocks","Roots","Stem"]},
    {q:"The respiratory system helps you…", a:"Breathe", w:["Digest rocks","Make light","Roots"]},
    {q:"A group of organs working together is a…", a:"Body system", w:["Cell wall","Food chain","Roots"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Body systems.");
}

function gen_g6_sci_L29(){
  return matchQuestion([
    {left:"Skull", right:"Protects brain"},
    {left:"Ribs", right:"Protect chest organs"},
    {left:"Spine", right:"Supports body"},
    {left:"Bones", right:"Give structure"}
  ]);
}

function gen_g6_sci_L30(){
  const it = pick([
    {q:"Muscles help the body ___.", a:"move"},
    {q:"Muscles work by contracting and ___.", a:"relaxing"},
    {q:"The heart is a type of ___.", a:"muscle"},
    {q:"Muscles attach to ___.", a:"bones"},
    {q:"Muscles help the body ___.", a:"move"},
    {q:"Muscles work by contracting and ___.", a:"relaxing"},
    {q:"The heart is a type of ___.", a:"muscle"},
    {q:"Muscles attach to ___.", a:"bones"},
    {q:"Muscles help the body ___.", a:"move"},
    {q:"Muscles work by contracting and ___.", a:"relaxing"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g6_sci_L31(){
  const it = pick([
    {bad:"the heart pumps blood.", good:"The heart pumps blood."},
    {bad:"blood carries oxygen to cells", good:"Blood carries oxygen to cells."},
    {bad:"arteries carry blood away from the heart", good:"Arteries carry blood away from the heart."},
    {bad:"the heart pumps blood.", good:"The heart pumps blood."},
    {bad:"blood carries oxygen to cells", good:"Blood carries oxygen to cells."},
    {bad:"arteries carry blood away from the heart", good:"Arteries carry blood away from the heart."},
    {bad:"the heart pumps blood.", good:"The heart pumps blood."},
    {bad:"blood carries oxygen to cells", good:"Blood carries oxygen to cells."},
    {bad:"arteries carry blood away from the heart", good:"Arteries carry blood away from the heart."},
    {bad:"the heart pumps blood.", good:"The heart pumps blood."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g6_sci_L32(){
  const it = pick([
    {q:"The digestive system breaks down…", a:"Food", w:["Light","Sound","Roots"]},
    {q:"The stomach uses acid to help digest…", a:"Food", w:["Air","Rocks","Climate"]},
    {q:"The small intestine absorbs…", a:"Nutrients", w:["Planets","Sound waves","Plain"]},
    {q:"The digestive system breaks down…", a:"Food", w:["Light","Sound","Roots"]},
    {q:"The stomach uses acid to help digest…", a:"Food", w:["Air","Rocks","Climate"]},
    {q:"The small intestine absorbs…", a:"Nutrients", w:["Planets","Sound waves","Plain"]},
    {q:"The digestive system breaks down…", a:"Food", w:["Light","Sound","Roots"]},
    {q:"The stomach uses acid to help digest…", a:"Food", w:["Air","Rocks","Climate"]},
    {q:"The small intestine absorbs…", a:"Nutrients", w:["Planets","Sound waves","Plain"]},
    {q:"The digestive system breaks down…", a:"Food", w:["Light","Sound","Roots"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g6_sci_L33(){
  return matchQuestion([
    {left:"Carbohydrates", right:"Quick energy"},
    {left:"Proteins", right:"Build and repair"},
    {left:"Lipids", right:"Long-term energy"},
    {left:"Nucleic acids", right:"Genetic information"}
  ]);
}

function gen_g6_sci_L34(){
  const it = pick([
    {q:"Proteins help build and repair…", a:"Tissues", w:["Clouds","Planets","Climate"]},
    {q:"Enzymes are usually…", a:"Proteins", w:["Rocks","Gases","Friction"]},
    {q:"Proteins are made from…", a:"Amino acids", w:["Sand","Light","Gravity"]},
    {q:"Proteins help build and repair…", a:"Tissues", w:["Clouds","Planets","Climate"]},
    {q:"Enzymes are usually…", a:"Proteins", w:["Rocks","Gases","Friction"]},
    {q:"Proteins are made from…", a:"Amino acids", w:["Sand","Light","Gravity"]},
    {q:"Proteins help build and repair…", a:"Tissues", w:["Clouds","Planets","Climate"]},
    {q:"Enzymes are usually…", a:"Proteins", w:["Rocks","Gases","Friction"]},
    {q:"Proteins are made from…", a:"Amino acids", w:["Sand","Light","Gravity"]},
    {q:"Proteins help build and repair…", a:"Tissues", w:["Clouds","Planets","Climate"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Proteins.");
}

function gen_g6_sci_L35(){
  const it = pick([
    {q:"Carbohydrates give the body ___.", a:"energy"},
    {q:"Sugar is a type of ___.", a:"carbohydrate"},
    {q:"Starch is a type of ___.", a:"carbohydrate"},
    {q:"Plants store sugar as ___.", a:"starch"},
    {q:"Carbohydrates give the body ___.", a:"energy"},
    {q:"Sugar is a type of ___.", a:"carbohydrate"},
    {q:"Starch is a type of ___.", a:"carbohydrate"},
    {q:"Plants store sugar as ___.", a:"starch"},
    {q:"Carbohydrates give the body ___.", a:"energy"},
    {q:"Sugar is a type of ___.", a:"carbohydrate"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g6_sci_L36(){
  const it = pick([
    {bad:"lipids include fats oils and waxes.", good:"Lipids include fats, oils, and waxes."},
    {bad:"lipids store long term energy", good:"Lipids store long-term energy."},
    {bad:"cell membranes contain lipids", good:"Cell membranes contain lipids."},
    {bad:"lipids include fats oils and waxes.", good:"Lipids include fats, oils, and waxes."},
    {bad:"lipids store long term energy", good:"Lipids store long-term energy."},
    {bad:"cell membranes contain lipids", good:"Cell membranes contain lipids."},
    {bad:"lipids include fats oils and waxes.", good:"Lipids include fats, oils, and waxes."},
    {bad:"lipids store long term energy", good:"Lipids store long-term energy."},
    {bad:"cell membranes contain lipids", good:"Cell membranes contain lipids."},
    {bad:"lipids include fats oils and waxes.", good:"Lipids include fats, oils, and waxes."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g6_sci_L37(){
  const it = pick([
    {q:"Enzymes speed up chemical…", a:"Reactions", w:["Planets","Rocks","Climate"]},
    {q:"Most enzymes are…", a:"Proteins", w:["Metals","Clouds","Climate"]},
    {q:"Enzymes help cells work more…", a:"Efficiently", w:["Slowly only","Loudly","Organ system"]},
    {q:"Enzymes speed up chemical…", a:"Reactions", w:["Planets","Rocks","Climate"]},
    {q:"Most enzymes are…", a:"Proteins", w:["Metals","Clouds","Climate"]},
    {q:"Enzymes help cells work more…", a:"Efficiently", w:["Slowly only","Loudly","Organ system"]},
    {q:"Enzymes speed up chemical…", a:"Reactions", w:["Planets","Rocks","Climate"]},
    {q:"Most enzymes are…", a:"Proteins", w:["Metals","Clouds","Climate"]},
    {q:"Enzymes help cells work more…", a:"Efficiently", w:["Slowly only","Loudly","Organ system"]},
    {q:"Enzymes speed up chemical…", a:"Reactions", w:["Planets","Rocks","Climate"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g6_sci_L38(){
  return matchQuestion([
    {left:"Stamen", right:"Male flower part"},
    {left:"Pistil", right:"Female flower part"},
    {left:"Petal", right:"Attracts pollinators"},
    {left:"Ovary", right:"Contains ovules"}
  ]);
}

function gen_g6_sci_L39(){
  const it = pick([
    {q:"Pollination moves pollen to the ___.", a:"pistil"},
    {q:"Bees can carry ___.", a:"pollen"},
    {q:"Wind can help some plants ___.", a:"pollinate"},
    {q:"Pollen comes from the ___.", a:"stamen"},
    {q:"Pollination moves pollen to the ___.", a:"pistil"},
    {q:"Bees can carry ___.", a:"pollen"},
    {q:"Wind can help some plants ___.", a:"pollinate"},
    {q:"Pollen comes from the ___.", a:"stamen"},
    {q:"Pollination moves pollen to the ___.", a:"pistil"},
    {q:"Bees can carry ___.", a:"pollen"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g6_sci_L40(){
  const it = pick([
    {bad:"fertilization happens when ***** joins egg.", good:"Fertilization happens when ***** joins egg."},
    {bad:"fertilization can lead to seed formation", good:"Fertilization can lead to seed formation."},
    {bad:"plant eggs are found in ovules", good:"Plant eggs are found in ovules."},
    {bad:"fertilization happens when ***** joins egg.", good:"Fertilization happens when ***** joins egg."},
    {bad:"fertilization can lead to seed formation", good:"Fertilization can lead to seed formation."},
    {bad:"plant eggs are found in ovules", good:"Plant eggs are found in ovules."},
    {bad:"fertilization happens when ***** joins egg.", good:"Fertilization happens when ***** joins egg."},
    {bad:"fertilization can lead to seed formation", good:"Fertilization can lead to seed formation."},
    {bad:"plant eggs are found in ovules", good:"Plant eggs are found in ovules."},
    {bad:"fertilization happens when ***** joins egg.", good:"Fertilization happens when ***** joins egg."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g6_sci_L41(){
  const it = pick([
    {q:"Seeds protect the young plant called an…", a:"Embryo", w:["Organ","Ecosystem","Roots"]},
    {q:"Fruit often helps spread…", a:"Seeds", w:["Rocks","Clouds","Roots"]},
    {q:"A seed coat helps…", a:"Protect the seed", w:["Make thunder","Form planets","Roots"]},
    {q:"Seeds protect the young plant called an…", a:"Embryo", w:["Organ","Ecosystem","Roots"]},
    {q:"Fruit often helps spread…", a:"Seeds", w:["Rocks","Clouds","Roots"]},
    {q:"A seed coat helps…", a:"Protect the seed", w:["Make thunder","Form planets","Roots"]},
    {q:"Seeds protect the young plant called an…", a:"Embryo", w:["Organ","Ecosystem","Roots"]},
    {q:"Fruit often helps spread…", a:"Seeds", w:["Rocks","Clouds","Roots"]},
    {q:"A seed coat helps…", a:"Protect the seed", w:["Make thunder","Form planets","Roots"]},
    {q:"Seeds protect the young plant called an…", a:"Embryo", w:["Organ","Ecosystem","Roots"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Seed formation.");
}

function gen_g6_sci_L42(){
  return matchQuestion([
    {left:"Seed", right:"Starting stage"},
    {left:"Germination", right:"Seed begins growing"},
    {left:"Seedling", right:"Young plant"},
    {left:"Adult plant", right:"Can reproduce"}
  ]);
}

function gen_g6_sci_L43(){
  const it = pick([
    {q:"The Sun is at the center of our…", a:"Solar system", w:["Cell","Food web","Roots"]},
    {q:"Earth is the ___ planet from the Sun.", a:"Third", w:["First","Seventh","Climate"]},
    {q:"Planets orbit the…", a:"Sun", w:["Moon","Asteroid only","Climate"]},
    {q:"The Sun is at the center of our…", a:"Solar system", w:["Cell","Food web","Roots"]},
    {q:"Earth is the ___ planet from the Sun.", a:"Third", w:["First","Seventh","Climate"]},
    {q:"Planets orbit the…", a:"Sun", w:["Moon","Asteroid only","Climate"]},
    {q:"The Sun is at the center of our…", a:"Solar system", w:["Cell","Food web","Roots"]},
    {q:"Earth is the ___ planet from the Sun.", a:"Third", w:["First","Seventh","Climate"]},
    {q:"Planets orbit the…", a:"Sun", w:["Moon","Asteroid only","Climate"]},
    {q:"The Sun is at the center of our…", a:"Solar system", w:["Cell","Food web","Roots"]}
  ]);
  return speedQuestion(it.q, it.a, it.w, 10);
}

function gen_g6_sci_L44(){
  const it = pick([
    {q:"A moon orbits a ___.", a:"planet"},
    {q:"Jupiter is the largest ___.", a:"planet"},
    {q:"Earth has one natural ___.", a:"moon"},
    {q:"Mars has two small ___.", a:"moons"},
    {q:"A moon orbits a ___.", a:"planet"},
    {q:"Jupiter is the largest ___.", a:"planet"},
    {q:"Earth has one natural ___.", a:"moon"},
    {q:"Mars has two small ___.", a:"moons"},
    {q:"A moon orbits a ___.", a:"planet"},
    {q:"Jupiter is the largest ___.", a:"planet"}
  ]);
  return fillBlankQuestion(it.q, it.a);
}

function gen_g6_sci_L45(){
  return matchQuestion([
    {left:"Star", right:"Hot ball of gas"},
    {left:"Constellation", right:"Star pattern"},
    {left:"Sun", right:"Closest star to Earth"},
    {left:"Light-year", right:"Distance light travels in one year"}
  ]);
}

function gen_g6_sci_L46(){
  const it = pick([
    {bad:"our galaxy is the milky way.", good:"Our galaxy is the Milky Way."},
    {bad:"galaxies contain stars gas and dust", good:"Galaxies contain stars, gas, and dust."},
    {bad:"the universe contains many galaxies", good:"The universe contains many galaxies."},
    {bad:"our galaxy is the milky way.", good:"Our galaxy is the Milky Way."},
    {bad:"galaxies contain stars gas and dust", good:"Galaxies contain stars, gas, and dust."},
    {bad:"the universe contains many galaxies", good:"The universe contains many galaxies."},
    {bad:"our galaxy is the milky way.", good:"Our galaxy is the Milky Way."},
    {bad:"galaxies contain stars gas and dust", good:"Galaxies contain stars, gas, and dust."},
    {bad:"the universe contains many galaxies", good:"The universe contains many galaxies."},
    {bad:"our galaxy is the milky way.", good:"Our galaxy is the Milky Way."}
  ]);
  return editSentenceQuestion(it.bad, it.good);
}

function gen_g6_sci_L47(){
  const it = pick([
    {q:"A spacecraft without people onboard is a…", a:"Probe", w:["Root","Cell","Roots"]},
    {q:"Astronauts need spacesuits because space has almost no…", a:"Air", w:["Soil","Rain","Roots"]},
    {q:"A telescope helps scientists observe…", a:"Space", w:["Digestion","Pollen","Organ system"]},
    {q:"A spacecraft without people onboard is a…", a:"Probe", w:["Root","Cell","Roots"]},
    {q:"Astronauts need spacesuits because space has almost no…", a:"Air", w:["Soil","Rain","Roots"]},
    {q:"A telescope helps scientists observe…", a:"Space", w:["Digestion","Pollen","Organ system"]},
    {q:"A spacecraft without people onboard is a…", a:"Probe", w:["Root","Cell","Roots"]},
    {q:"Astronauts need spacesuits because space has almost no…", a:"Air", w:["Soil","Rain","Roots"]},
    {q:"A telescope helps scientists observe…", a:"Space", w:["Digestion","Pollen","Organ system"]},
    {q:"A spacecraft without people onboard is a…", a:"Probe", w:["Root","Cell","Roots"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Space exploration.");
}
