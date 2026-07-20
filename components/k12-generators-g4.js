/* K12 grade 4 lesson generators
   Split from components/k12-lessons.js. Keep loaded as a classic script.
*/

/* =========================================================
   GRADE 4 ENGLISH
   L1 - L4   = Context Clues
   L5 - L8   = Synonyms and Antonyms
   L9 - L12  = Theme
========================================================= */

/* ---------- CONTEXT CLUES ---------- */

function gen_g4_eng_L1(){
  const it = pick([
    {
      q:'"The canyon was ENORMOUS, bigger than anything we had seen." ENORMOUS means…',
      a:"Very big",
      w:["Very small","Very fast","Unrelated meaning"]
    },
    {
      q:'"Mia was EXHAUSTED after running five miles, so she rested." EXHAUSTED means…',
      a:"Very tired",
      w:["Very excited","Very hungry","Unrelated meaning"]
    },
    {
      q:'"The kitten was TINY, small enough to fit in my hand." TINY means…',
      a:"Very small",
      w:["Very loud","Very strong","Unrelated meaning"]
    },
    {
      q:'"The canyon was ENORMOUS, bigger than anything we had seen." ENORMOUS means…',
      a:"Very big",
      w:["Very small","Very fast","Unrelated meaning"]
    },
    {
      q:'"Mia was EXHAUSTED after running five miles, so she rested." EXHAUSTED means…',
      a:"Very tired",
      w:["Very excited","Very hungry","Unrelated meaning"]
    },
    {
      q:'"The kitten was TINY, small enough to fit in my hand." TINY means…',
      a:"Very small",
      w:["Very loud","Very strong","Unrelated meaning"]
    },
    {
      q:'"The canyon was ENORMOUS, bigger than anything we had seen." ENORMOUS means…',
      a:"Very big",
      w:["Very small","Very fast","Unrelated meaning"]
    },
    {
      q:'"Mia was EXHAUSTED after running five miles, so she rested." EXHAUSTED means…',
      a:"Very tired",
      w:["Very excited","Very hungry","Unrelated meaning"]
    },
    {
      q:'"The kitten was TINY, small enough to fit in my hand." TINY means…',
      a:"Very small",
      w:["Very loud","Very strong","Unrelated meaning"]
    },
    {
      q:'"The canyon was ENORMOUS, bigger than anything we had seen." ENORMOUS means…',
      a:"Very big",
      w:["Very small","Very fast","Unrelated meaning"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Use the words around the unknown word.");
}

function gen_g4_eng_L2(){
  const it = pick([
    {
      q:'"A HABITAT is the place where an animal lives." What does HABITAT mean?',
      a:"A place where an animal lives",
      w:["A kind of food","A type of weather","Reptile"]
    },
    {
      q:'"A NOCTURNAL animal is active at night." What does NOCTURNAL mean?',
      a:"Active at night",
      w:["Active only in water","Active only in winter","Reptile"]
    },
    {
      q:'"A PREDATOR is an animal that hunts other animals for food." PREDATOR means…',
      a:"An animal that hunts",
      w:["An animal that sleeps all day","A plant that grows tall","Reptile"]
    },
    {
      q:'"A HABITAT is the place where an animal lives." What does HABITAT mean?',
      a:"A place where an animal lives",
      w:["A kind of food","A type of weather","Reptile"]
    },
    {
      q:'"A NOCTURNAL animal is active at night." What does NOCTURNAL mean?',
      a:"Active at night",
      w:["Active only in water","Active only in winter","Reptile"]
    },
    {
      q:'"A PREDATOR is an animal that hunts other animals for food." PREDATOR means…',
      a:"An animal that hunts",
      w:["An animal that sleeps all day","A plant that grows tall","Reptile"]
    },
    {
      q:'"A HABITAT is the place where an animal lives." What does HABITAT mean?',
      a:"A place where an animal lives",
      w:["A kind of food","A type of weather","Reptile"]
    },
    {
      q:'"A NOCTURNAL animal is active at night." What does NOCTURNAL mean?',
      a:"Active at night",
      w:["Active only in water","Active only in winter","Reptile"]
    },
    {
      q:'"A PREDATOR is an animal that hunts other animals for food." PREDATOR means…',
      a:"An animal that hunts",
      w:["An animal that sleeps all day","A plant that grows tall","Reptile"]
    },
    {
      q:'"A HABITAT is the place where an animal lives." What does HABITAT mean?',
      a:"A place where an animal lives",
      w:["A kind of food","A type of weather","Reptile"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Look for the definition in the sentence.");
}

function gen_g4_eng_L3(){
  const it = pick([
    {
      q:'"Many PRECIOUS items, such as gold, diamonds, and rare coins, were locked away." PRECIOUS means…',
      a:"Valuable",
      w:["Broken","Common","Unrelated meaning"]
    },
    {
      q:'"FRAGILE objects, like glass cups and thin ornaments, must be handled carefully." FRAGILE means…',
      a:"Easily broken",
      w:["Very heavy","Very soft","Unrelated meaning"]
    },
    {
      q:'"He enjoyed OUTDOOR activities, such as hiking, biking, and camping." OUTDOOR means…',
      a:"Done outside",
      w:["Done quietly","Done at school","Unrelated meaning"]
    },
    {
      q:'"Many PRECIOUS items, such as gold, diamonds, and rare coins, were locked away." PRECIOUS means…',
      a:"Valuable",
      w:["Broken","Common","Unrelated meaning"]
    },
    {
      q:'"FRAGILE objects, like glass cups and thin ornaments, must be handled carefully." FRAGILE means…',
      a:"Easily broken",
      w:["Very heavy","Very soft","Unrelated meaning"]
    },
    {
      q:'"He enjoyed OUTDOOR activities, such as hiking, biking, and camping." OUTDOOR means…',
      a:"Done outside",
      w:["Done quietly","Done at school","Unrelated meaning"]
    },
    {
      q:'"Many PRECIOUS items, such as gold, diamonds, and rare coins, were locked away." PRECIOUS means…',
      a:"Valuable",
      w:["Broken","Common","Unrelated meaning"]
    },
    {
      q:'"FRAGILE objects, like glass cups and thin ornaments, must be handled carefully." FRAGILE means…',
      a:"Easily broken",
      w:["Very heavy","Very soft","Unrelated meaning"]
    },
    {
      q:'"He enjoyed OUTDOOR activities, such as hiking, biking, and camping." OUTDOOR means…',
      a:"Done outside",
      w:["Done quietly","Done at school","Unrelated meaning"]
    },
    {
      q:'"Many PRECIOUS items, such as gold, diamonds, and rare coins, were locked away." PRECIOUS means…',
      a:"Valuable",
      w:["Broken","Common","Unrelated meaning"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Examples can help explain a word.");
}

function gen_g4_eng_L4(){
  const it = pick([
    {
      q:'"Unlike his TIMID brother, Jay was brave enough to hold the snake." TIMID means…',
      a:"Shy or fearful",
      w:["Brave","Angry","Unrelated meaning"]
    },
    {
      q:'"The first path was SMOOTH, but the second path was rough and rocky." SMOOTH means…',
      a:"Not rough",
      w:["Very steep","Very dark","Unrelated meaning"]
    },
    {
      q:'"Lena was GENEROUS and shared her snacks, while her brother kept everything." GENEROUS means…',
      a:"Willing to share",
      w:["Unwilling to help","Very sleepy","Unrelated meaning"]
    },
    {
      q:'"Unlike his TIMID brother, Jay was brave enough to hold the snake." TIMID means…',
      a:"Shy or fearful",
      w:["Brave","Angry","Unrelated meaning"]
    },
    {
      q:'"The first path was SMOOTH, but the second path was rough and rocky." SMOOTH means…',
      a:"Not rough",
      w:["Very steep","Very dark","Unrelated meaning"]
    },
    {
      q:'"Lena was GENEROUS and shared her snacks, while her brother kept everything." GENEROUS means…',
      a:"Willing to share",
      w:["Unwilling to help","Very sleepy","Unrelated meaning"]
    },
    {
      q:'"Unlike his TIMID brother, Jay was brave enough to hold the snake." TIMID means…',
      a:"Shy or fearful",
      w:["Brave","Angry","Unrelated meaning"]
    },
    {
      q:'"The first path was SMOOTH, but the second path was rough and rocky." SMOOTH means…',
      a:"Not rough",
      w:["Very steep","Very dark","Unrelated meaning"]
    },
    {
      q:'"Lena was GENEROUS and shared her snacks, while her brother kept everything." GENEROUS means…',
      a:"Willing to share",
      w:["Unwilling to help","Very sleepy","Unrelated meaning"]
    },
    {
      q:'"Unlike his TIMID brother, Jay was brave enough to hold the snake." TIMID means…',
      a:"Shy or fearful",
      w:["Brave","Angry","Unrelated meaning"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Contrast clues show an opposite idea.");
}

/* ---------- SYNONYMS AND ANTONYMS ---------- */

function gen_g4_eng_L5(){
  const it = pick([
    { q:"Which word is a synonym for BRAVE?", a:"Courageous", w:["Afraid","Careless","Unrelated meaning"] },
    { q:"Which word is a synonym for QUICK?", a:"Fast", w:["Slow","Weak","Unrelated meaning"] },
    { q:"Which word is a synonym for JOYFUL?", a:"Happy", w:["Sad","Tired","Unrelated meaning"] },
    { q:"Which word is a synonym for LARGE?", a:"Huge", w:["Tiny","Short","Unrelated meaning"] },
    { q:"Which word is a synonym for BRAVE?", a:"Courageous", w:["Afraid","Careless","Unrelated meaning"] },
    { q:"Which word is a synonym for QUICK?", a:"Fast", w:["Slow","Weak","Unrelated meaning"] },
    { q:"Which word is a synonym for JOYFUL?", a:"Happy", w:["Sad","Tired","Unrelated meaning"] },
    { q:"Which word is a synonym for LARGE?", a:"Huge", w:["Tiny","Short","Unrelated meaning"] },
    { q:"Which word is a synonym for BRAVE?", a:"Courageous", w:["Afraid","Careless","Unrelated meaning"] },
    { q:"Which word is a synonym for QUICK?", a:"Fast", w:["Slow","Weak","Unrelated meaning"] }
  ]);
  return mcQuestion(it.q, it.a, it.w, "A synonym means nearly the same thing.");
}

function gen_g4_eng_L6(){
  const it = pick([
    { q:"Which word is an antonym for HOT?", a:"Cold", w:["Warm","Boiling","Unrelated meaning"] },
    { q:"Which word is an antonym for EMPTY?", a:"Full", w:["Blank","Open","Unrelated meaning"] },
    { q:"Which word is an antonym for LOUD?", a:"Quiet", w:["Noisy","Bright","Unrelated meaning"] },
    { q:"Which word is an antonym for ARRIVE?", a:"Leave", w:["Enter","Come","Unrelated meaning"] },
    { q:"Which word is an antonym for HOT?", a:"Cold", w:["Warm","Boiling","Unrelated meaning"] },
    { q:"Which word is an antonym for EMPTY?", a:"Full", w:["Blank","Open","Unrelated meaning"] },
    { q:"Which word is an antonym for LOUD?", a:"Quiet", w:["Noisy","Bright","Unrelated meaning"] },
    { q:"Which word is an antonym for ARRIVE?", a:"Leave", w:["Enter","Come","Unrelated meaning"] },
    { q:"Which word is an antonym for HOT?", a:"Cold", w:["Warm","Boiling","Unrelated meaning"] },
    { q:"Which word is an antonym for EMPTY?", a:"Full", w:["Blank","Open","Unrelated meaning"] }
  ]);
  return mcQuestion(it.q, it.a, it.w, "An antonym means the opposite.");
}

function gen_g4_eng_L7(){
  const it = pick([
    {
      q:"Complete the relationship: Begin is to start as finish is to…",
      a:"End",
      w:["Open","Run","Finish"]
    },
    {
      q:"Complete the relationship: Tall is to short as wide is to…",
      a:"Narrow",
      w:["Large","Heavy","Wide"]
    },
    {
      q:"Complete the relationship: Happy is to joyful as angry is to…",
      a:"Mad",
      w:["Calm","Funny","Angry"]
    },
    {
      q:"Complete the relationship: Begin is to start as finish is to…",
      a:"End",
      w:["Open","Run","Finish"]
    },
    {
      q:"Complete the relationship: Tall is to short as wide is to…",
      a:"Narrow",
      w:["Large","Heavy","Wide"]
    },
    {
      q:"Complete the relationship: Happy is to joyful as angry is to…",
      a:"Mad",
      w:["Calm","Funny","Angry"]
    },
    {
      q:"Complete the relationship: Begin is to start as finish is to…",
      a:"End",
      w:["Open","Run","Finish"]
    },
    {
      q:"Complete the relationship: Tall is to short as wide is to…",
      a:"Narrow",
      w:["Large","Heavy","Wide"]
    },
    {
      q:"Complete the relationship: Happy is to joyful as angry is to…",
      a:"Mad",
      w:["Calm","Funny","Angry"]
    },
    {
      q:"Complete the relationship: Begin is to start as finish is to…",
      a:"End",
      w:["Open","Run","Finish"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Think about how the words are related.");
}

function gen_g4_eng_L8(){
  const it = pick([
    {
      q:'Choose the stronger word: "The lion ___ across the field after its prey."',
      a:"Sprinted",
      w:["Went","Moved","Prey"]
    },
    {
      q:'Choose the better word: "The baby ___ softly in her crib."',
      a:"Giggled",
      w:["Made noise","Did something","Something"]
    },
    {
      q:'Choose the more precise word: "The glass vase ___ onto the floor."',
      a:"Shattered",
      w:["Went","Sat","Floor"]
    },
    {
      q:'Choose the stronger word: "The lion ___ across the field after its prey."',
      a:"Sprinted",
      w:["Went","Moved","Prey"]
    },
    {
      q:'Choose the better word: "The baby ___ softly in her crib."',
      a:"Giggled",
      w:["Made noise","Did something","Something"]
    },
    {
      q:'Choose the more precise word: "The glass vase ___ onto the floor."',
      a:"Shattered",
      w:["Went","Sat","Floor"]
    },
    {
      q:'Choose the stronger word: "The lion ___ across the field after its prey."',
      a:"Sprinted",
      w:["Went","Moved","Prey"]
    },
    {
      q:'Choose the better word: "The baby ___ softly in her crib."',
      a:"Giggled",
      w:["Made noise","Did something","Something"]
    },
    {
      q:'Choose the more precise word: "The glass vase ___ onto the floor."',
      a:"Shattered",
      w:["Went","Sat","Floor"]
    },
    {
      q:'Choose the stronger word: "The lion ___ across the field after its prey."',
      a:"Sprinted",
      w:["Went","Moved","Prey"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Choose the most precise word.");
}

/* ---------- THEME ---------- */

function gen_g4_eng_L9(){
  const it = pick([
    {
      q:"A boy practices basketball every day and finally makes the team. What is the theme?",
      a:"Hard work can lead to success",
      w:["Sports are always easy","Never try something new","Setting only"]
    },
    {
      q:"A girl returns a lost wallet even though she wants the money. What is the theme?",
      a:"Doing the right thing matters",
      w:["Keep everything you find","Money is the only important thing","Friction"]
    },
    {
      q:"Two friends forgive each other after an argument. What is the theme?",
      a:"Friendship can overcome disagreements",
      w:["Friends should never speak","Arguments are fun","Setting only"]
    },
    {
      q:"A boy practices basketball every day and finally makes the team. What is the theme?",
      a:"Hard work can lead to success",
      w:["Sports are always easy","Never try something new","Setting only"]
    },
    {
      q:"A girl returns a lost wallet even though she wants the money. What is the theme?",
      a:"Doing the right thing matters",
      w:["Keep everything you find","Money is the only important thing","Friction"]
    },
    {
      q:"Two friends forgive each other after an argument. What is the theme?",
      a:"Friendship can overcome disagreements",
      w:["Friends should never speak","Arguments are fun","Setting only"]
    },
    {
      q:"A boy practices basketball every day and finally makes the team. What is the theme?",
      a:"Hard work can lead to success",
      w:["Sports are always easy","Never try something new","Setting only"]
    },
    {
      q:"A girl returns a lost wallet even though she wants the money. What is the theme?",
      a:"Doing the right thing matters",
      w:["Keep everything you find","Money is the only important thing","Friction"]
    },
    {
      q:"Two friends forgive each other after an argument. What is the theme?",
      a:"Friendship can overcome disagreements",
      w:["Friends should never speak","Arguments are fun","Setting only"]
    },
    {
      q:"A boy practices basketball every day and finally makes the team. What is the theme?",
      a:"Hard work can lead to success",
      w:["Sports are always easy","Never try something new","Setting only"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Theme is the message or lesson.");
}

function gen_g4_eng_L10(){
  const it = pick([
    {
      q:"Tara is afraid to perform, but she takes a deep breath and sings on stage. What is the theme?",
      a:"Courage means facing your fears",
      w:["Never sing for others","Only talent matters","Friction"]
    },
    {
      q:"Evan shares his lunch with a new student sitting alone. What is the theme?",
      a:"Kindness helps others feel welcome",
      w:["Always eat alone","New students do not need friends","Setting only"]
    },
    {
      q:"A family works together to repair their garden after a storm. What is the theme?",
      a:"Teamwork can solve problems",
      w:["Gardens never need care","Working alone is always best","Setting only"]
    },
    {
      q:"Tara is afraid to perform, but she takes a deep breath and sings on stage. What is the theme?",
      a:"Courage means facing your fears",
      w:["Never sing for others","Only talent matters","Friction"]
    },
    {
      q:"Evan shares his lunch with a new student sitting alone. What is the theme?",
      a:"Kindness helps others feel welcome",
      w:["Always eat alone","New students do not need friends","Setting only"]
    },
    {
      q:"A family works together to repair their garden after a storm. What is the theme?",
      a:"Teamwork can solve problems",
      w:["Gardens never need care","Working alone is always best","Setting only"]
    },
    {
      q:"Tara is afraid to perform, but she takes a deep breath and sings on stage. What is the theme?",
      a:"Courage means facing your fears",
      w:["Never sing for others","Only talent matters","Friction"]
    },
    {
      q:"Evan shares his lunch with a new student sitting alone. What is the theme?",
      a:"Kindness helps others feel welcome",
      w:["Always eat alone","New students do not need friends","Setting only"]
    },
    {
      q:"A family works together to repair their garden after a storm. What is the theme?",
      a:"Teamwork can solve problems",
      w:["Gardens never need care","Working alone is always best","Setting only"]
    },
    {
      q:"Tara is afraid to perform, but she takes a deep breath and sings on stage. What is the theme?",
      a:"Courage means facing your fears",
      w:["Never sing for others","Only talent matters","Friction"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Find the message in the short story.");
}

function gen_g4_eng_L11(){
  const it = pick([
    {
      q:"Carlos studies after failing a test, then improves his grade. His actions support the theme that…",
      a:"Mistakes can help us improve",
      w:["Giving up is best","Studying never helps","Setting only"]
    },
    {
      q:"Nia includes a classmate who is being left out. Her actions support the theme that…",
      a:"Inclusion is important",
      w:["Leaving people out is kind","Friendship is unnecessary","Setting only"]
    },
    {
      q:"A character admits breaking a window instead of blaming someone else. This supports the theme that…",
      a:"Honesty is important",
      w:["Lying solves problems","Accidents should be hidden","Setting only"]
    },
    {
      q:"Carlos studies after failing a test, then improves his grade. His actions support the theme that…",
      a:"Mistakes can help us improve",
      w:["Giving up is best","Studying never helps","Setting only"]
    },
    {
      q:"Nia includes a classmate who is being left out. Her actions support the theme that…",
      a:"Inclusion is important",
      w:["Leaving people out is kind","Friendship is unnecessary","Setting only"]
    },
    {
      q:"A character admits breaking a window instead of blaming someone else. This supports the theme that…",
      a:"Honesty is important",
      w:["Lying solves problems","Accidents should be hidden","Setting only"]
    },
    {
      q:"Carlos studies after failing a test, then improves his grade. His actions support the theme that…",
      a:"Mistakes can help us improve",
      w:["Giving up is best","Studying never helps","Setting only"]
    },
    {
      q:"Nia includes a classmate who is being left out. Her actions support the theme that…",
      a:"Inclusion is important",
      w:["Leaving people out is kind","Friendship is unnecessary","Setting only"]
    },
    {
      q:"A character admits breaking a window instead of blaming someone else. This supports the theme that…",
      a:"Honesty is important",
      w:["Lying solves problems","Accidents should be hidden","Setting only"]
    },
    {
      q:"Carlos studies after failing a test, then improves his grade. His actions support the theme that…",
      a:"Mistakes can help us improve",
      w:["Giving up is best","Studying never helps","Setting only"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Use the character's actions to find the theme.");
}

function gen_g4_eng_L12(){
  const it = pick([
    {
      q:'Which detail best supports the theme "Never give up"?',
      a:"Maya tried again after falling off her bike",
      w:["Maya owned a blue bike","The day was sunny","Setting only"]
    },
    {
      q:'Which detail best supports the theme "Be kind to others"?',
      a:"Sam helped the new student find his classroom",
      w:["Sam had a red backpack","The school had two floors","Setting only"]
    },
    {
      q:'Which detail best supports the theme "Teamwork matters"?',
      a:"The team worked together to build the bridge",
      w:["The bridge was brown","The river was cold","Friction"]
    },
    {
      q:'Which detail best supports the theme "Never give up"?',
      a:"Maya tried again after falling off her bike",
      w:["Maya owned a blue bike","The day was sunny","Setting only"]
    },
    {
      q:'Which detail best supports the theme "Be kind to others"?',
      a:"Sam helped the new student find his classroom",
      w:["Sam had a red backpack","The school had two floors","Setting only"]
    },
    {
      q:'Which detail best supports the theme "Teamwork matters"?',
      a:"The team worked together to build the bridge",
      w:["The bridge was brown","The river was cold","Friction"]
    },
    {
      q:'Which detail best supports the theme "Never give up"?',
      a:"Maya tried again after falling off her bike",
      w:["Maya owned a blue bike","The day was sunny","Setting only"]
    },
    {
      q:'Which detail best supports the theme "Be kind to others"?',
      a:"Sam helped the new student find his classroom",
      w:["Sam had a red backpack","The school had two floors","Setting only"]
    },
    {
      q:'Which detail best supports the theme "Teamwork matters"?',
      a:"The team worked together to build the bridge",
      w:["The bridge was brown","The river was cold","Friction"]
    },
    {
      q:'Which detail best supports the theme "Never give up"?',
      a:"Maya tried again after falling off her bike",
      w:["Maya owned a blue bike","The day was sunny","Setting only"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Choose the evidence that supports the theme.");
}
function gen_g4_eng_L13(){
  return g4Question([
    {
      q:"Every morning, Carlos feeds his dog, fills its water bowl, and takes it outside for a walk. What is the main idea?",
      a:"Carlos takes care of his dog",
      w:["Carlos does not like animals","The dog sleeps all day","Reptile"]
    },
    {
      q:"Trees provide shade, homes for animals, and oxygen for people to breathe. What is the main idea?",
      a:"Trees are important",
      w:["Trees only grow in winter","Animals do not need trees","Reptile"]
    },
    {
      q:"Nina practiced the piano each afternoon. After several weeks, she performed her song confidently. What is the main idea?",
      a:"Practice helped nina improve",
      w:["Nina stopped playing music","Nina lost her piano","Small detail"]
    },
    {
      q:"The library offers books, computers, and quiet places for students to study. What is the main idea?",
      a:"The library helps students learn",
      w:["The library sells food","Students cannot read there","Small detail"]
    },
    {
      q:"Every morning, Carlos feeds his dog, fills its water bowl, and takes it outside for a walk. What is the main idea?",
      a:"Carlos takes care of his dog",
      w:["Carlos does not like animals","The dog sleeps all day","Reptile"]
    },
    {
      q:"Trees provide shade, homes for animals, and oxygen for people to breathe. What is the main idea?",
      a:"Trees are important",
      w:["Trees only grow in winter","Animals do not need trees","Reptile"]
    },
    {
      q:"Nina practiced the piano each afternoon. After several weeks, she performed her song confidently. What is the main idea?",
      a:"Practice helped nina improve",
      w:["Nina stopped playing music","Nina lost her piano","Small detail"]
    },
    {
      q:"The library offers books, computers, and quiet places for students to study. What is the main idea?",
      a:"The library helps students learn",
      w:["The library sells food","Students cannot read there","Small detail"]
    },
    {
      q:"Every morning, Carlos feeds his dog, fills its water bowl, and takes it outside for a walk. What is the main idea?",
      a:"Carlos takes care of his dog",
      w:["Carlos does not like animals","The dog sleeps all day","Reptile"]
    },
    {
      q:"Trees provide shade, homes for animals, and oxygen for people to breathe. What is the main idea?",
      a:"Trees are important",
      w:["Trees only grow in winter","Animals do not need trees","Reptile"]
    }
  ], "Choose the main idea.");
}


/* ---------- L14: SUPPORTING DETAILS ---------- */
function gen_g4_eng_L14(){
  return g4Question([
    {
      q:"Main idea: Exercise helps keep people healthy. Which detail best supports the main idea?",
      a:"Running can strengthen your heart and muscles",
      w:["Sneakers can be blue","Parks have benches","Small detail"]
    },
    {
      q:"Main idea: Penguins are suited for cold climates. Which detail supports the main idea?",
      a:"Penguins have thick feathers and body fat",
      w:["Penguins walk on two feet","Some animals live in forests","Reptile"]
    },
    {
      q:"Main idea: Recycling is useful. Which detail supports the main idea?",
      a:"Recycling reduces the amount of trash",
      w:["Trash cans have lids","Paper can be white","Small detail"]
    },
    {
      q:"Main idea: Bees help flowers grow. Which detail supports the main idea?",
      a:"Bees carry pollen from flower to flower",
      w:["Bees can buzz","Flowers come in many colors","Roots"]
    },
    {
      q:"Main idea: Exercise helps keep people healthy. Which detail best supports the main idea?",
      a:"Running can strengthen your heart and muscles",
      w:["Sneakers can be blue","Parks have benches","Small detail"]
    },
    {
      q:"Main idea: Penguins are suited for cold climates. Which detail supports the main idea?",
      a:"Penguins have thick feathers and body fat",
      w:["Penguins walk on two feet","Some animals live in forests","Reptile"]
    },
    {
      q:"Main idea: Recycling is useful. Which detail supports the main idea?",
      a:"Recycling reduces the amount of trash",
      w:["Trash cans have lids","Paper can be white","Small detail"]
    },
    {
      q:"Main idea: Bees help flowers grow. Which detail supports the main idea?",
      a:"Bees carry pollen from flower to flower",
      w:["Bees can buzz","Flowers come in many colors","Roots"]
    },
    {
      q:"Main idea: Exercise helps keep people healthy. Which detail best supports the main idea?",
      a:"Running can strengthen your heart and muscles",
      w:["Sneakers can be blue","Parks have benches","Small detail"]
    },
    {
      q:"Main idea: Penguins are suited for cold climates. Which detail supports the main idea?",
      a:"Penguins have thick feathers and body fat",
      w:["Penguins walk on two feet","Some animals live in forests","Reptile"]
    }
  ], "Find the supporting detail.");
}


/* ---------- L15: AUTHOR'S PURPOSE ---------- */
function gen_g4_eng_L15(){
  return g4Question([
    {
      q:"A passage gives facts about how volcanoes erupt. Why did the author write it?",
      a:"To inform",
      w:["To persuade you to buy a volcano","To tell a silly fairy tale","Cover color"]
    },
    {
      q:"A poster says, 'Join our school clean-up day and help make our playground beautiful!' Why was it written?",
      a:"To persuade",
      w:["To explain moon phases","To entertain with a mystery","Cover color"]
    },
    {
      q:"A story tells about a mouse who accidentally becomes king of the forest. Why was it written?",
      a:"To entertain",
      w:["To give weather facts","To persuade you to recycle","Cover color"]
    },
    {
      q:"A recipe explains each step for making fruit salad. Why was it written?",
      a:"To inform",
      w:["To describe a fictional dragon","To sell a bicycle","Cover color"]
    },
    {
      q:"A passage gives facts about how volcanoes erupt. Why did the author write it?",
      a:"To inform",
      w:["To persuade you to buy a volcano","To tell a silly fairy tale","Cover color"]
    },
    {
      q:"A poster says, 'Join our school clean-up day and help make our playground beautiful!' Why was it written?",
      a:"To persuade",
      w:["To explain moon phases","To entertain with a mystery","Cover color"]
    },
    {
      q:"A story tells about a mouse who accidentally becomes king of the forest. Why was it written?",
      a:"To entertain",
      w:["To give weather facts","To persuade you to recycle","Cover color"]
    },
    {
      q:"A recipe explains each step for making fruit salad. Why was it written?",
      a:"To inform",
      w:["To describe a fictional dragon","To sell a bicycle","Cover color"]
    },
    {
      q:"A passage gives facts about how volcanoes erupt. Why did the author write it?",
      a:"To inform",
      w:["To persuade you to buy a volcano","To tell a silly fairy tale","Cover color"]
    },
    {
      q:"A poster says, 'Join our school clean-up day and help make our playground beautiful!' Why was it written?",
      a:"To persuade",
      w:["To explain moon phases","To entertain with a mystery","Cover color"]
    }
  ], "Choose the author's purpose.");
}


/* ---------- L16: POINT OF VIEW ---------- */
function gen_g4_eng_L16(){
  return g4Question([
    {
      q:'"I packed my backpack and hurried to catch the bus." What point of view is used?',
      a:"First person",
      w:["Third person","Second person only","Area"]
    },
    {
      q:'"Marcus opened the door and looked for his missing shoes." What point of view is used?',
      a:"Third person",
      w:["First person","The author is marcus","Area"]
    },
    {
      q:'"We cheered when our class won the reading contest." What point of view is used?',
      a:"First person",
      w:["Third person","No point of view","Area"]
    },
    {
      q:'"Ava carefully placed the baby bird back in its nest." What point of view is used?',
      a:"Third person",
      w:["First person","Second person only","Reptile"]
    },
    {
      q:'"I packed my backpack and hurried to catch the bus." What point of view is used?',
      a:"First person",
      w:["Third person","Second person only","Area"]
    },
    {
      q:'"Marcus opened the door and looked for his missing shoes." What point of view is used?',
      a:"Third person",
      w:["First person","The author is marcus","Area"]
    },
    {
      q:'"We cheered when our class won the reading contest." What point of view is used?',
      a:"First person",
      w:["Third person","No point of view","Area"]
    },
    {
      q:'"Ava carefully placed the baby bird back in its nest." What point of view is used?',
      a:"Third person",
      w:["First person","Second person only","Reptile"]
    },
    {
      q:'"I packed my backpack and hurried to catch the bus." What point of view is used?',
      a:"First person",
      w:["Third person","Second person only","Area"]
    },
    {
      q:'"Marcus opened the door and looked for his missing shoes." What point of view is used?',
      a:"Third person",
      w:["First person","The author is marcus","Area"]
    }
  ], "Identify the point of view.");
}


/* ---------- L17: CAUSE AND EFFECT ---------- */
function gen_g4_eng_L17(){
  return g4Question([
    {
      q:"The rain poured all night, so the soccer field became muddy. What is the effect?",
      a:"The soccer field became muddy",
      w:["The rain poured all night","The team bought new shoes","Climate"]
    },
    {
      q:"Liam studied carefully for the spelling test, and he earned a high score. What is the cause?",
      a:"Liam studied carefully",
      w:["He earned a high score","The test disappeared","Disappeared"]
    },
    {
      q:"Because the temperature dropped below freezing, the puddle turned to ice. What is the effect?",
      a:"The puddle turned to ice",
      w:["The temperature dropped","The sun grew larger","Friction"]
    },
    {
      q:"Sasha forgot to charge her tablet, so it turned off during class. What is the cause?",
      a:"Sasha forgot to charge her tablet",
      w:["The tablet turned off","Class ended early","Early"]
    },
    {
      q:"The rain poured all night, so the soccer field became muddy. What is the effect?",
      a:"The soccer field became muddy",
      w:["The rain poured all night","The team bought new shoes","Climate"]
    },
    {
      q:"Liam studied carefully for the spelling test, and he earned a high score. What is the cause?",
      a:"Liam studied carefully",
      w:["He earned a high score","The test disappeared","Disappeared"]
    },
    {
      q:"Because the temperature dropped below freezing, the puddle turned to ice. What is the effect?",
      a:"The puddle turned to ice",
      w:["The temperature dropped","The sun grew larger","Friction"]
    },
    {
      q:"Sasha forgot to charge her tablet, so it turned off during class. What is the cause?",
      a:"Sasha forgot to charge her tablet",
      w:["The tablet turned off","Class ended early","Early"]
    },
    {
      q:"The rain poured all night, so the soccer field became muddy. What is the effect?",
      a:"The soccer field became muddy",
      w:["The rain poured all night","The team bought new shoes","Climate"]
    },
    {
      q:"Liam studied carefully for the spelling test, and he earned a high score. What is the cause?",
      a:"Liam studied carefully",
      w:["He earned a high score","The test disappeared","Disappeared"]
    }
  ], "Identify the cause or effect.");
}


/* ---------- L18: SEQUENCE OF EVENTS ---------- */
function gen_g4_eng_L18(){
  return g4Question([
    {
      q:"First, Malik planted a seed. Next, he watered it. What will most likely happen later?",
      a:"The seed may begin to grow",
      w:["The seed becomes a rock","The water disappears forever","Roots"]
    },
    {
      q:"Which word shows that an event happened last?",
      a:"Finally",
      w:["First","Next","Last"]
    },
    {
      q:"To make toast, you get bread, place it in the toaster, and then wait for it to cook. What happens first?",
      a:"Get the bread",
      w:["Wait for it to cook","Eat the toast before making it","Making"]
    },
    {
      q:"Which sequence is correct for brushing teeth?",
      a:"Put toothpaste on brush, brush teeth, rinse",
      w:["Rinse, sleep, find a brush","Brush teeth, buy shoes, rinse","Compare and contrast"]
    },
    {
      q:"First, Malik planted a seed. Next, he watered it. What will most likely happen later?",
      a:"The seed may begin to grow",
      w:["The seed becomes a rock","The water disappears forever","Roots"]
    },
    {
      q:"Which word shows that an event happened last?",
      a:"Finally",
      w:["First","Next","Last"]
    },
    {
      q:"To make toast, you get bread, place it in the toaster, and then wait for it to cook. What happens first?",
      a:"Get the bread",
      w:["Wait for it to cook","Eat the toast before making it","Making"]
    },
    {
      q:"Which sequence is correct for brushing teeth?",
      a:"Put toothpaste on brush, brush teeth, rinse",
      w:["Rinse, sleep, find a brush","Brush teeth, buy shoes, rinse","Compare and contrast"]
    },
    {
      q:"First, Malik planted a seed. Next, he watered it. What will most likely happen later?",
      a:"The seed may begin to grow",
      w:["The seed becomes a rock","The water disappears forever","Roots"]
    },
    {
      q:"Which word shows that an event happened last?",
      a:"Finally",
      w:["First","Next","Last"]
    }
  ], "Choose the correct order of events.");
}


/* ---------- L19: HOMOPHONES ---------- */
function gen_g4_eng_L19(){
  return g4Question([
    {
      q:"Choose the correct word: I want to ___ the new movie.",
      a:"See",
      w:["Sea","Seed","Roots"]
    },
    {
      q:"Choose the correct word: The dog wagged ___ tail.",
      a:"Its",
      w:["It's","Its'","Tail"]
    },
    {
      q:"Choose the correct word: We went ___ the library after school.",
      a:"To",
      w:["Two","Too","School"]
    },
    {
      q:"Choose the correct word: Please put the book over ___.",
      a:"There",
      w:["Their","They're","Over"]
    },
    {
      q:"Choose the correct word: I want to ___ the new movie.",
      a:"See",
      w:["Sea","Seed","Roots"]
    },
    {
      q:"Choose the correct word: The dog wagged ___ tail.",
      a:"Its",
      w:["It's","Its'","Tail"]
    },
    {
      q:"Choose the correct word: We went ___ the library after school.",
      a:"To",
      w:["Two","Too","School"]
    },
    {
      q:"Choose the correct word: Please put the book over ___.",
      a:"There",
      w:["Their","They're","Over"]
    },
    {
      q:"Choose the correct word: I want to ___ the new movie.",
      a:"See",
      w:["Sea","Seed","Roots"]
    },
    {
      q:"Choose the correct word: The dog wagged ___ tail.",
      a:"Its",
      w:["It's","Its'","Tail"]
    }
  ], "Choose the correct homophone.");
}


/* ---------- L20: COMPLETE SENTENCES ---------- */
function gen_g4_eng_L20(){
  return g4Question([
    {
      q:"Which is a complete sentence?",
      a:"The small cat slept on the sofa.",
      w:["Under the large table.","Running through the park.","Adverb"]
    },
    {
      q:"Which is a complete sentence?",
      a:"My friend brought her lunch.",
      w:["Because it was raining.","The bright red umbrella.","Adverb"]
    },
    {
      q:"Which sentence has both a subject and a predicate?",
      a:"The birds built a nest.",
      w:["In the tall tree.","After the storm.","Reptile"]
    },
    {
      q:"Which is a sentence fragment?",
      a:"Because the bus was late.",
      w:["We arrived at school.","The teacher opened the door.","Adverb"]
    },
    {
      q:"Which is a complete sentence?",
      a:"The small cat slept on the sofa.",
      w:["Under the large table.","Running through the park.","Adverb"]
    },
    {
      q:"Which is a complete sentence?",
      a:"My friend brought her lunch.",
      w:["Because it was raining.","The bright red umbrella.","Adverb"]
    },
    {
      q:"Which sentence has both a subject and a predicate?",
      a:"The birds built a nest.",
      w:["In the tall tree.","After the storm.","Reptile"]
    },
    {
      q:"Which is a sentence fragment?",
      a:"Because the bus was late.",
      w:["We arrived at school.","The teacher opened the door.","Adverb"]
    },
    {
      q:"Which is a complete sentence?",
      a:"The small cat slept on the sofa.",
      w:["Under the large table.","Running through the park.","Adverb"]
    },
    {
      q:"Which is a complete sentence?",
      a:"My friend brought her lunch.",
      w:["Because it was raining.","The bright red umbrella.","Adverb"]
    }
  ], "Choose the complete sentence or fragment.");
}


/* ---------- L21: PUNCTUATION ---------- */
function gen_g4_eng_L21(){
  return g4Question([
    {
      q:"Which sentence uses commas correctly?",
      a:"I packed apples, crackers, and juice.",
      w:["I packed, apples crackers and juice.","I packed apples crackers, and, juice.","I packed apples crackers and juice,"]
    },
    {
      q:"Which sentence uses quotation marks correctly?",
      a:'MOM SAID, "PLEASE CLEAN YOUR ROOM."',
      w:['MOM SAID, PLEASE "CLEAN YOUR ROOM.','MOM "SAID, PLEASE CLEAN YOUR ROOM.','MOM SAID, "PLEASE CLEAN YOUR ROOM".']
    },
    {
      q:"Which sentence uses an apostrophe correctly for one dog's bowl?",
      a:"The dog's bowl is empty.",
      w:["The dogs bowl is empty.","The dogs' bowl is empty for one dog.","The dog bowl's is empty."]
    },
    {
      q:"Which sentence uses a question mark correctly?",
      a:"Where did you put my pencil?",
      w:["Where did you put my pencil.","Where did you put? my pencil.","Where did you put my pencil"]
    },
    {
      q:"Which sentence uses commas correctly?",
      a:"I packed apples, crackers, and juice.",
      w:["I packed, apples crackers and juice.","I packed apples crackers, and, juice.","I packed apples crackers and juice,"]
    },
    {
      q:"Which sentence uses quotation marks correctly?",
      a:'MOM SAID, "PLEASE CLEAN YOUR ROOM."',
      w:['MOM SAID, PLEASE "CLEAN YOUR ROOM.','MOM "SAID, PLEASE CLEAN YOUR ROOM.','MOM SAID, "PLEASE CLEAN YOUR ROOM".']
    },
    {
      q:"Which sentence uses an apostrophe correctly for one dog's bowl?",
      a:"The dog's bowl is empty.",
      w:["The dogs bowl is empty.","The dogs' bowl is empty for one dog.","The dog bowl's is empty."]
    },
    {
      q:"Which sentence uses a question mark correctly?",
      a:"Where did you put my pencil?",
      w:["Where did you put my pencil.","Where did you put? my pencil.","Where did you put my pencil"]
    },
    {
      q:"Which sentence uses commas correctly?",
      a:"I packed apples, crackers, and juice.",
      w:["I packed, apples crackers and juice.","I packed apples crackers, and, juice.","I packed apples crackers and juice,"]
    },
    {
      q:"Which sentence uses quotation marks correctly?",
      a:'MOM SAID, "PLEASE CLEAN YOUR ROOM."',
      w:['MOM SAID, PLEASE "CLEAN YOUR ROOM.','MOM "SAID, PLEASE CLEAN YOUR ROOM.','MOM SAID, "PLEASE CLEAN YOUR ROOM".']
    }
  ], "Choose the correctly punctuated sentence.");
}



/* =========================================================
   GRADE 4 MATH
   L1 - L4   = Multi-Digit Multiplication
   L5 - L8   = Factors and Multiples
   L9 - L12  = Equivalent Fractions
========================================================= */

/* ---------- MULTI-DIGIT MULTIPLICATION ---------- */

function gen_g4_math_L1(){
  const a = randInt(12, 99);
  const b = randInt(2, 9);
  const ans = a * b;
  const q = `${a} × ${b} = ?`;
  const opts = make3Choices(ans, 0, 900).map(String);

  return mcQuestion(
    q,
    String(ans),
    opts.filter(x => x !== String(ans)).slice(0, 2),
    "Multiply the 2-digit number by the 1-digit number."
  );
}

function gen_g4_math_L2(){
  const a = randInt(100, 499);
  const b = randInt(2, 9);
  const ans = a * b;
  const q = `${a} × ${b} = ?`;
  const opts = make3Choices(ans, 0, 5000).map(String);

  return mcQuestion(
    q,
    String(ans),
    opts.filter(x => x !== String(ans)).slice(0, 2),
    "Multiply each place value carefully."
  );
}

function gen_g4_math_L3(){
  const a = randInt(12, 49);
  const b = randInt(11, 29);
  const ans = a * b;
  const q = `${a} × ${b} = ?`;
  const opts = make3Choices(ans, 0, 2000).map(String);

  return mcQuestion(
    q,
    String(ans),
    opts.filter(x => x !== String(ans)).slice(0, 2),
    "Multiply tens and ones."
  );
}

function gen_g4_math_L4(){
  const it = pick([
    {
      q:"A theater has 24 rows with 6 seats in each row. How many seats are there?",
      a:"144",
      w:["120","164","145"]
    },
    {
      q:"A store packs 32 pencils in each box. How many pencils are in 4 boxes?",
      a:"128",
      w:["124","136","129"]
    },
    {
      q:"There are 18 stickers on each sheet. How many stickers are on 12 sheets?",
      a:"216",
      w:["206","226","217"]
    },
    {
      q:"A theater has 24 rows with 6 seats in each row. How many seats are there?",
      a:"144",
      w:["120","164","145"]
    },
    {
      q:"A store packs 32 pencils in each box. How many pencils are in 4 boxes?",
      a:"128",
      w:["124","136","129"]
    },
    {
      q:"There are 18 stickers on each sheet. How many stickers are on 12 sheets?",
      a:"216",
      w:["206","226","217"]
    },
    {
      q:"A theater has 24 rows with 6 seats in each row. How many seats are there?",
      a:"144",
      w:["120","164","145"]
    },
    {
      q:"A store packs 32 pencils in each box. How many pencils are in 4 boxes?",
      a:"128",
      w:["124","136","129"]
    },
    {
      q:"There are 18 stickers on each sheet. How many stickers are on 12 sheets?",
      a:"216",
      w:["206","226","217"]
    },
    {
      q:"A theater has 24 rows with 6 seats in each row. How many seats are there?",
      a:"144",
      w:["120","164","145"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Multiply to solve the word problem.");
}

/* ---------- FACTORS AND MULTIPLES ---------- */

function gen_g4_math_L5(){
  const it = pick([
    { q:"Which number is a factor of 24?", a:"6", w:["5","7","8"] },
    { q:"Which number is a factor of 36?", a:"9", w:["7","8","10"] },
    { q:"Which number is a factor of 40?", a:"8", w:["6","9","7"] },
    { q:"Which number is a factor of 56?", a:"7", w:["5","9","8"] },
    { q:"Which number is a factor of 24?", a:"6", w:["5","7","8"] },
    { q:"Which number is a factor of 36?", a:"9", w:["7","8","10"] },
    { q:"Which number is a factor of 40?", a:"8", w:["6","9","7"] },
    { q:"Which number is a factor of 56?", a:"7", w:["5","9","8"] },
    { q:"Which number is a factor of 24?", a:"6", w:["5","7","8"] },
    { q:"Which number is a factor of 36?", a:"9", w:["7","8","10"] }
  ]);
  return mcQuestion(it.q, it.a, it.w, "A factor divides a number evenly.");
}

function gen_g4_math_L6(){
  const it = pick([
    { q:"Which number is a multiple of 6?", a:"36", w:["35","37","38"] },
    { q:"Which number is a multiple of 8?", a:"48", w:["45","50","49"] },
    { q:"Which number is a multiple of 9?", a:"63", w:["62","65","64"] },
    { q:"Which number is a multiple of 7?", a:"42", w:["40","44","43"] },
    { q:"Which number is a multiple of 6?", a:"36", w:["35","37","38"] },
    { q:"Which number is a multiple of 8?", a:"48", w:["45","50","49"] },
    { q:"Which number is a multiple of 9?", a:"63", w:["62","65","64"] },
    { q:"Which number is a multiple of 7?", a:"42", w:["40","44","43"] },
    { q:"Which number is a multiple of 6?", a:"36", w:["35","37","38"] },
    { q:"Which number is a multiple of 8?", a:"48", w:["45","50","49"] }
  ]);
  return mcQuestion(it.q, it.a, it.w, "A multiple is found by multiplying.");
}

function gen_g4_math_L7(){
  const it = pick([
    {
      q:"Which number is prime?",
      a:"17",
      w:["12","21","18"]
    },
    {
      q:"Which number is composite?",
      a:"18",
      w:["11","13","19"]
    },
    {
      q:"A number with exactly two factors is called…",
      a:"Prime",
      w:["Composite","Even","Sum"]
    },
    {
      q:"Which number is composite?",
      a:"25",
      w:["19","23","26"]
    },
    {
      q:"Which number is prime?",
      a:"17",
      w:["12","21","18"]
    },
    {
      q:"Which number is composite?",
      a:"18",
      w:["11","13","19"]
    },
    {
      q:"A number with exactly two factors is called…",
      a:"Prime",
      w:["Composite","Even","Sum"]
    },
    {
      q:"Which number is composite?",
      a:"25",
      w:["19","23","26"]
    },
    {
      q:"Which number is prime?",
      a:"17",
      w:["12","21","18"]
    },
    {
      q:"Which number is composite?",
      a:"18",
      w:["11","13","19"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Prime numbers have exactly two factors.");
}

function gen_g4_math_L8(){
  const it = pick([
    {
      q:"Which is a factor pair of 36?",
      a:"4 And 9",
      w:["5 And 7","3 And 10","Sum"]
    },
    {
      q:"Which is a factor pair of 48?",
      a:"6 And 8",
      w:["5 And 9","4 And 10","Sum"]
    },
    {
      q:"Which is a factor pair of 30?",
      a:"5 And 6",
      w:["4 And 8","3 And 9","Sum"]
    },
    {
      q:"Which is a factor pair of 72?",
      a:"8 And 9",
      w:["7 And 10","6 And 10","Sum"]
    },
    {
      q:"Which is a factor pair of 36?",
      a:"4 And 9",
      w:["5 And 7","3 And 10","Sum"]
    },
    {
      q:"Which is a factor pair of 48?",
      a:"6 And 8",
      w:["5 And 9","4 And 10","Sum"]
    },
    {
      q:"Which is a factor pair of 30?",
      a:"5 And 6",
      w:["4 And 8","3 And 9","Sum"]
    },
    {
      q:"Which is a factor pair of 72?",
      a:"8 And 9",
      w:["7 And 10","6 And 10","Sum"]
    },
    {
      q:"Which is a factor pair of 36?",
      a:"4 And 9",
      w:["5 And 7","3 And 10","Sum"]
    },
    {
      q:"Which is a factor pair of 48?",
      a:"6 And 8",
      w:["5 And 9","4 And 10","Sum"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "A factor pair multiplies to make the number.");
}

/* ---------- EQUIVALENT FRACTIONS ---------- */

function gen_g4_math_L9(){
  const it = pick([
    {
      q:"A model has 1 out of 2 equal parts shaded. Which fraction shows the same amount?",
      a:"2/4",
      w:["1/4","3/4","1/2"]
    },
    {
      q:"A model has 2 out of 3 equal parts shaded. Which fraction shows the same amount?",
      a:"4/6",
      w:["3/6","5/6","1/2"]
    },
    {
      q:"A model has 3 out of 4 equal parts shaded. Which fraction shows the same amount?",
      a:"6/8",
      w:["4/8","7/8","1/2"]
    },
    {
      q:"A model has 1 out of 2 equal parts shaded. Which fraction shows the same amount?",
      a:"2/4",
      w:["1/4","3/4","1/2"]
    },
    {
      q:"A model has 2 out of 3 equal parts shaded. Which fraction shows the same amount?",
      a:"4/6",
      w:["3/6","5/6","1/2"]
    },
    {
      q:"A model has 3 out of 4 equal parts shaded. Which fraction shows the same amount?",
      a:"6/8",
      w:["4/8","7/8","1/2"]
    },
    {
      q:"A model has 1 out of 2 equal parts shaded. Which fraction shows the same amount?",
      a:"2/4",
      w:["1/4","3/4","1/2"]
    },
    {
      q:"A model has 2 out of 3 equal parts shaded. Which fraction shows the same amount?",
      a:"4/6",
      w:["3/6","5/6","1/2"]
    },
    {
      q:"A model has 3 out of 4 equal parts shaded. Which fraction shows the same amount?",
      a:"6/8",
      w:["4/8","7/8","1/2"]
    },
    {
      q:"A model has 1 out of 2 equal parts shaded. Which fraction shows the same amount?",
      a:"2/4",
      w:["1/4","3/4","1/2"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Equivalent fractions represent the same amount.");
}

function gen_g4_math_L10(){
  const it = pick([
    { q:"Complete the equivalent fraction: 1/2 = ?/6", a:"3/6", w:["2/6","4/6","1/2"] },
    { q:"Complete the equivalent fraction: 2/3 = ?/9", a:"6/9", w:["4/9","7/9","1/2"] },
    { q:"Complete the equivalent fraction: 3/4 = ?/8", a:"6/8", w:["5/8","7/8","1/2"] },
    { q:"Complete the equivalent fraction: 1/5 = ?/10", a:"2/10", w:["3/10","5/10","1/2"] },
    { q:"Complete the equivalent fraction: 1/2 = ?/6", a:"3/6", w:["2/6","4/6","1/2"] },
    { q:"Complete the equivalent fraction: 2/3 = ?/9", a:"6/9", w:["4/9","7/9","1/2"] },
    { q:"Complete the equivalent fraction: 3/4 = ?/8", a:"6/8", w:["5/8","7/8","1/2"] },
    { q:"Complete the equivalent fraction: 1/5 = ?/10", a:"2/10", w:["3/10","5/10","1/2"] },
    { q:"Complete the equivalent fraction: 1/2 = ?/6", a:"3/6", w:["2/6","4/6","1/2"] },
    { q:"Complete the equivalent fraction: 2/3 = ?/9", a:"6/9", w:["4/9","7/9","1/2"] }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Multiply the numerator and denominator by the same number.");
}

function gen_g4_math_L11(){
  const it = pick([
    {
      q:"Which pair of fractions is equivalent?",
      a:"1/2 And 4/8",
      w:["1/2 And 3/8","1/2 And 5/8","1/2"]
    },
    {
      q:"Which pair of fractions is equivalent?",
      a:"2/3 And 6/9",
      w:["2/3 And 5/9","2/3 And 7/9","1/2"]
    },
    {
      q:"Which pair of fractions is equivalent?",
      a:"3/5 And 6/10",
      w:["3/5 And 5/10","3/5 And 7/10","1/2"]
    },
    {
      q:"Which pair of fractions is equivalent?",
      a:"1/2 And 4/8",
      w:["1/2 And 3/8","1/2 And 5/8","1/2"]
    },
    {
      q:"Which pair of fractions is equivalent?",
      a:"2/3 And 6/9",
      w:["2/3 And 5/9","2/3 And 7/9","1/2"]
    },
    {
      q:"Which pair of fractions is equivalent?",
      a:"3/5 And 6/10",
      w:["3/5 And 5/10","3/5 And 7/10","1/2"]
    },
    {
      q:"Which pair of fractions is equivalent?",
      a:"1/2 And 4/8",
      w:["1/2 And 3/8","1/2 And 5/8","1/2"]
    },
    {
      q:"Which pair of fractions is equivalent?",
      a:"2/3 And 6/9",
      w:["2/3 And 5/9","2/3 And 7/9","1/2"]
    },
    {
      q:"Which pair of fractions is equivalent?",
      a:"3/5 And 6/10",
      w:["3/5 And 5/10","3/5 And 7/10","1/2"]
    },
    {
      q:"Which pair of fractions is equivalent?",
      a:"1/2 And 4/8",
      w:["1/2 And 3/8","1/2 And 5/8","1/2"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Equivalent fractions have the same value.");
}

function gen_g4_math_L12(){
  const it = pick([
    {
      q:"Kayla ate 1/2 of a pizza. Which fraction could also describe how much she ate?",
      a:"4/8",
      w:["3/8","5/8","1/2"]
    },
    {
      q:"Ben colored 2/4 of a rectangle. What equivalent fraction shows the colored part?",
      a:"1/2",
      w:["1/4","3/4","1/3"]
    },
    {
      q:"A garden uses 3/6 of its space for flowers. Which equivalent fraction matches?",
      a:"1/2",
      w:["1/3","2/3","Roots"]
    },
    {
      q:"Kayla ate 1/2 of a pizza. Which fraction could also describe how much she ate?",
      a:"4/8",
      w:["3/8","5/8","1/2"]
    },
    {
      q:"Ben colored 2/4 of a rectangle. What equivalent fraction shows the colored part?",
      a:"1/2",
      w:["1/4","3/4","1/3"]
    },
    {
      q:"A garden uses 3/6 of its space for flowers. Which equivalent fraction matches?",
      a:"1/2",
      w:["1/3","2/3","Roots"]
    },
    {
      q:"Kayla ate 1/2 of a pizza. Which fraction could also describe how much she ate?",
      a:"4/8",
      w:["3/8","5/8","1/2"]
    },
    {
      q:"Ben colored 2/4 of a rectangle. What equivalent fraction shows the colored part?",
      a:"1/2",
      w:["1/4","3/4","1/3"]
    },
    {
      q:"A garden uses 3/6 of its space for flowers. Which equivalent fraction matches?",
      a:"1/2",
      w:["1/3","2/3","Roots"]
    },
    {
      q:"Kayla ate 1/2 of a pizza. Which fraction could also describe how much she ate?",
      a:"4/8",
      w:["3/8","5/8","1/2"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Use equivalent fractions to solve the problem.");
}
function gen_g4_math_L13(){
  const it = pick([
    {q:"36 ÷ 6 = ?", a:"6", w:["5","7","8"]},
    {q:"54 ÷ 9 = ?", a:"6", w:["7","8","5"]},
    {q:"72 ÷ 8 = ?", a:"9", w:["8","10","11"]},
    {q:"42 ÷ 7 = ?", a:"6", w:["5","8","7"]},
    {q:"81 ÷ 9 = ?", a:"9", w:["8","7","10"]},
    {q:"36 ÷ 6 = ?", a:"6", w:["5","7","8"]},
    {q:"54 ÷ 9 = ?", a:"6", w:["7","8","5"]},
    {q:"72 ÷ 8 = ?", a:"9", w:["8","10","11"]},
    {q:"42 ÷ 7 = ?", a:"6", w:["5","8","7"]},
    {q:"81 ÷ 9 = ?", a:"9", w:["8","7","10"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Solve the division fact.");
}


/* ---------- L14: LONG DIVISION ---------- */
function gen_g4_math_L14(){
  const it = pick([
    {q:"84 ÷ 4 = ?", a:"21", w:["24","20","22"]},
    {q:"96 ÷ 3 = ?", a:"32", w:["33","29","31"]},
    {q:"144 ÷ 6 = ?", a:"24", w:["26","22","25"]},
    {q:"125 ÷ 5 = ?", a:"25", w:["20","30","26"]},
    {q:"168 ÷ 8 = ?", a:"21", w:["22","18","20"]},
    {q:"84 ÷ 4 = ?", a:"21", w:["24","20","22"]},
    {q:"96 ÷ 3 = ?", a:"32", w:["33","29","31"]},
    {q:"144 ÷ 6 = ?", a:"24", w:["26","22","25"]},
    {q:"125 ÷ 5 = ?", a:"25", w:["20","30","26"]},
    {q:"168 ÷ 8 = ?", a:"21", w:["22","18","20"]}
  ]);
  return mcQuestion(it.q, it.a, it.w, "Divide carefully.");
}


/* ---------- L15: ADDITION AND SUBTRACTION WORD PROBLEMS ---------- */
function gen_g4_math_L15(){
  return g4Question([
    {
      q:"The school library had 2,450 books and bought 375 more. How many books does it have now?",
      a:"2,825",
      w:["2,725","2,075","Now"]
    },
    {
      q:"A store had 1,250 balloons. It sold 468. How many balloons remain?",
      a:"782",
      w:["792","818","783"]
    },
    {
      q:"A class collected 845 cans in April and 679 cans in May. How many cans altogether?",
      a:"1,524",
      w:["1,414","1,514","Altogether"]
    },
    {
      q:"A stadium has 4,000 seats. If 2,675 seats are filled, how many seats are empty?",
      a:"1,325",
      w:["1,425","1,225","Empty"]
    },
    {
      q:"The school library had 2,450 books and bought 375 more. How many books does it have now?",
      a:"2,825",
      w:["2,725","2,075","Now"]
    },
    {
      q:"A store had 1,250 balloons. It sold 468. How many balloons remain?",
      a:"782",
      w:["792","818","783"]
    },
    {
      q:"A class collected 845 cans in April and 679 cans in May. How many cans altogether?",
      a:"1,524",
      w:["1,414","1,514","Altogether"]
    },
    {
      q:"A stadium has 4,000 seats. If 2,675 seats are filled, how many seats are empty?",
      a:"1,325",
      w:["1,425","1,225","Empty"]
    },
    {
      q:"The school library had 2,450 books and bought 375 more. How many books does it have now?",
      a:"2,825",
      w:["2,725","2,075","Now"]
    },
    {
      q:"A store had 1,250 balloons. It sold 468. How many balloons remain?",
      a:"782",
      w:["792","818","783"]
    }
  ], "Solve the word problem.");
}


/* ---------- L16: COMPARING FRACTIONS ---------- */
function gen_g4_math_L16(){
  return g4Question([
    {
      q:"Which fraction is greater?",
      a:"3/4",
      w:["1/4","2/4","1/2"]
    },
    {
      q:"Which fraction is smaller?",
      a:"2/8",
      w:["5/8","7/8","1/2"]
    },
    {
      q:"Which symbol makes this true? 5/6 ___ 3/6",
      a:">",
      w:["<","=","True"]
    },
    {
      q:"Which symbol makes this true? 4/10 ___ 7/10",
      a:"<",
      w:[">","=","True"]
    },
    {
      q:"Which fraction is greater?",
      a:"3/4",
      w:["1/4","2/4","1/2"]
    },
    {
      q:"Which fraction is smaller?",
      a:"2/8",
      w:["5/8","7/8","1/2"]
    },
    {
      q:"Which symbol makes this true? 5/6 ___ 3/6",
      a:">",
      w:["<","=","True"]
    },
    {
      q:"Which symbol makes this true? 4/10 ___ 7/10",
      a:"<",
      w:[">","=","True"]
    },
    {
      q:"Which fraction is greater?",
      a:"3/4",
      w:["1/4","2/4","1/2"]
    },
    {
      q:"Which fraction is smaller?",
      a:"2/8",
      w:["5/8","7/8","1/2"]
    }
  ], "Compare fractions with like denominators.");
}


/* ---------- L17: MIXED NUMBERS ---------- */
function gen_g4_math_L17(){
  return g4Question([
    {
      q:"Which mixed number means one whole and three fourths?",
      a:"1 3/4",
      w:["3 1/4","1 1/3","Unrelated meaning"]
    },
    {
      q:"How many whole numbers are in 2 1/5?",
      a:"2",
      w:["1","5","3"]
    },
    {
      q:"Which mixed number is greater?",
      a:"3 1/2",
      w:["2 1/2","1 3/4","Greater"]
    },
    {
      q:"What mixed number represents 6/4?",
      a:"1 2/4",
      w:["2 4/4","1 1/4","Represents"]
    },
    {
      q:"Which mixed number means one whole and three fourths?",
      a:"1 3/4",
      w:["3 1/4","1 1/3","Unrelated meaning"]
    },
    {
      q:"How many whole numbers are in 2 1/5?",
      a:"2",
      w:["1","5","3"]
    },
    {
      q:"Which mixed number is greater?",
      a:"3 1/2",
      w:["2 1/2","1 3/4","Greater"]
    },
    {
      q:"What mixed number represents 6/4?",
      a:"1 2/4",
      w:["2 4/4","1 1/4","Represents"]
    },
    {
      q:"Which mixed number means one whole and three fourths?",
      a:"1 3/4",
      w:["3 1/4","1 1/3","Unrelated meaning"]
    },
    {
      q:"How many whole numbers are in 2 1/5?",
      a:"2",
      w:["1","5","3"]
    }
  ], "Work with mixed numbers.");
}


/* ---------- L18: DECIMAL PLACE VALUE ---------- */
function gen_g4_math_L18(){
  return g4Question([
    {
      q:"In the number 4.7, the digit 7 is in the ___ place.",
      a:"Tenths",
      w:["Ones","Hundreds","Place"]
    },
    {
      q:"In the number 2.35, which digit is in the hundredths place?",
      a:"5",
      w:["3","2","6"]
    },
    {
      q:"Which decimal represents six tenths?",
      a:"0.6",
      w:["0.06","6.0","1.6"]
    },
    {
      q:"Which decimal represents twenty-five hundredths?",
      a:"0.25",
      w:["2.5","0.025","1.25"]
    },
    {
      q:"In the number 4.7, the digit 7 is in the ___ place.",
      a:"Tenths",
      w:["Ones","Hundreds","Place"]
    },
    {
      q:"In the number 2.35, which digit is in the hundredths place?",
      a:"5",
      w:["3","2","6"]
    },
    {
      q:"Which decimal represents six tenths?",
      a:"0.6",
      w:["0.06","6.0","1.6"]
    },
    {
      q:"Which decimal represents twenty-five hundredths?",
      a:"0.25",
      w:["2.5","0.025","1.25"]
    },
    {
      q:"In the number 4.7, the digit 7 is in the ___ place.",
      a:"Tenths",
      w:["Ones","Hundreds","Place"]
    },
    {
      q:"In the number 2.35, which digit is in the hundredths place?",
      a:"5",
      w:["3","2","6"]
    }
  ], "Use decimal place value.");
}


/* ---------- L19: ANGLES ---------- */
function gen_g4_math_L19(){
  return g4Question([
    {
      q:"An angle measuring exactly 90 degrees is called a…",
      a:"Right angle",
      w:["Acute angle","Obtuse angle","Area"]
    },
    {
      q:"An angle smaller than 90 degrees is called an…",
      a:"Acute angle",
      w:["Right angle","Obtuse angle","Area"]
    },
    {
      q:"An angle greater than 90 degrees but less than 180 degrees is called an…",
      a:"Obtuse angle",
      w:["Acute angle","Right angle","Area"]
    },
    {
      q:"Which tool can be used to measure an angle?",
      a:"Protractor",
      w:["Thermometer","Clock","Area"]
    },
    {
      q:"An angle measuring exactly 90 degrees is called a…",
      a:"Right angle",
      w:["Acute angle","Obtuse angle","Area"]
    },
    {
      q:"An angle smaller than 90 degrees is called an…",
      a:"Acute angle",
      w:["Right angle","Obtuse angle","Area"]
    },
    {
      q:"An angle greater than 90 degrees but less than 180 degrees is called an…",
      a:"Obtuse angle",
      w:["Acute angle","Right angle","Area"]
    },
    {
      q:"Which tool can be used to measure an angle?",
      a:"Protractor",
      w:["Thermometer","Clock","Area"]
    },
    {
      q:"An angle measuring exactly 90 degrees is called a…",
      a:"Right angle",
      w:["Acute angle","Obtuse angle","Area"]
    },
    {
      q:"An angle smaller than 90 degrees is called an…",
      a:"Acute angle",
      w:["Right angle","Obtuse angle","Area"]
    }
  ], "Identify the angle.");
}


/* ---------- L20: AREA AND PERIMETER ---------- */
function gen_g4_math_L20(){
  return g4Question([
    {
      q:"A rectangle has length 6 units and width 4 units. What is its area?",
      a:"24 Square units",
      w:["20 Square units","10 Square units","Area"]
    },
    {
      q:"A rectangle has length 7 units and width 3 units. What is its perimeter?",
      a:"20 Units",
      w:["21 Units","10 Units","Area"]
    },
    {
      q:"A square has side length 5 units. What is its area?",
      a:"25 Square units",
      w:["20 Square units","10 Square units","Area"]
    },
    {
      q:"A square has side length 8 units. What is its perimeter?",
      a:"32 Units",
      w:["64 Units","16 Units","Area"]
    },
    {
      q:"A rectangle has length 6 units and width 4 units. What is its area?",
      a:"24 Square units",
      w:["20 Square units","10 Square units","Area"]
    },
    {
      q:"A rectangle has length 7 units and width 3 units. What is its perimeter?",
      a:"20 Units",
      w:["21 Units","10 Units","Area"]
    },
    {
      q:"A square has side length 5 units. What is its area?",
      a:"25 Square units",
      w:["20 Square units","10 Square units","Area"]
    },
    {
      q:"A square has side length 8 units. What is its perimeter?",
      a:"32 Units",
      w:["64 Units","16 Units","Area"]
    },
    {
      q:"A rectangle has length 6 units and width 4 units. What is its area?",
      a:"24 Square units",
      w:["20 Square units","10 Square units","Area"]
    },
    {
      q:"A rectangle has length 7 units and width 3 units. What is its perimeter?",
      a:"20 Units",
      w:["21 Units","10 Units","Area"]
    }
  ], "Find the area or perimeter.");
}


/* =========================================================
   GRADE 4 SCIENCE
   L1 - L4   = Living Things and Ecosystems
   L5 - L8   = Earth's Surface
   L9 - L12  = Matter
   L13 - L16 = Energy and Motion
   L17 - L20 = Earth and Space
========================================================= */

/* ---------- LIVING THINGS AND ECOSYSTEMS ---------- */

function gen_g4_sci_L1(){
  const it = pick([
    {
      q:"Which plant structure takes in water from the soil?",
      a:"ROOTS",
      w:["Flowers","Fruit","Stem"],
      image:{ src:"images/g4-sci-l1-q1-roots-water.png", alt:"Plant roots taking in water from soil" }
    },
    {
      q:"A bird's wings help it to…",
      a:"FLY",
      w:["Breathe underwater","Grow leaves","Dig in soil"],
      image:{ src:"images/g4-sci-l1-q2-bird-wings.png", alt:"Bird flying with wings spread" }
    },
    {
      q:"Which animal structure helps a fish move through water?",
      a:"FINS",
      w:["Fur","Claws","Scales"],
      image:{ src:"images/g4-sci-l1-q3-fish-fins.png", alt:"Fish swimming with fins" }
    },
    {
      q:"Which plant structure takes in water from the soil?",
      a:"ROOTS",
      w:["Flowers","Fruit","Stem"],
      image:{ src:"images/g4-sci-l1-q1-roots-water.png", alt:"Plant roots taking in water from soil" }
    },
    {
      q:"A bird's wings help it to…",
      a:"FLY",
      w:["Breathe underwater","Grow leaves","Dig in soil"],
      image:{ src:"images/g4-sci-l1-q2-bird-wings.png", alt:"Bird flying with wings spread" }
    },
    {
      q:"Which animal structure helps a fish move through water?",
      a:"FINS",
      w:["Fur","Claws","Scales"],
      image:{ src:"images/g4-sci-l1-q3-fish-fins.png", alt:"Fish swimming with fins" }
    },
    {
      q:"Which plant structure takes in water from the soil?",
      a:"ROOTS",
      w:["Flowers","Fruit","Stem"],
      image:{ src:"images/g4-sci-l1-q1-roots-water.png", alt:"Plant roots taking in water from soil" }
    },
    {
      q:"A bird's wings help it to…",
      a:"FLY",
      w:["Breathe underwater","Grow leaves","Dig in soil"],
      image:{ src:"images/g4-sci-l1-q2-bird-wings.png", alt:"Bird flying with wings spread" }
    },
    {
      q:"Which animal structure helps a fish move through water?",
      a:"FINS",
      w:["Fur","Claws","Scales"],
      image:{ src:"images/g4-sci-l1-q3-fish-fins.png", alt:"Fish swimming with fins" }
    },
    {
      q:"Which plant structure takes in water from the soil?",
      a:"ROOTS",
      w:["Flowers","Fruit","Stem"],
      image:{ src:"images/g4-sci-l1-q1-roots-water.png", alt:"Plant roots taking in water from soil" }
    }
  ]);
  const question = mcQuestion(it.q, it.a, it.w, "Structures help living things survive.");
  question.image = it.image;
  return question;
}

function gen_g4_sci_L2(){
  const it = pick([
    {
      q:"In an ecosystem, plants are called…",
      a:"Producers",
      w:["Consumers","Predators","Reptile"]
    },
    {
      q:"Animals that eat plants or other animals are called…",
      a:"Consumers",
      w:["Producers","Rocks","Reptile"]
    },
    {
      q:"Why are plants producers?",
      a:"They make their own food",
      w:["They hunt animals","They eat rocks","Reptile"]
    },
    {
      q:"In an ecosystem, plants are called…",
      a:"Producers",
      w:["Consumers","Predators","Reptile"]
    },
    {
      q:"Animals that eat plants or other animals are called…",
      a:"Consumers",
      w:["Producers","Rocks","Reptile"]
    },
    {
      q:"Why are plants producers?",
      a:"They make their own food",
      w:["They hunt animals","They eat rocks","Reptile"]
    },
    {
      q:"In an ecosystem, plants are called…",
      a:"Producers",
      w:["Consumers","Predators","Reptile"]
    },
    {
      q:"Animals that eat plants or other animals are called…",
      a:"Consumers",
      w:["Producers","Rocks","Reptile"]
    },
    {
      q:"Why are plants producers?",
      a:"They make their own food",
      w:["They hunt animals","They eat rocks","Reptile"]
    },
    {
      q:"In an ecosystem, plants are called…",
      a:"Producers",
      w:["Consumers","Predators","Reptile"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Think about how organisms get energy.");
}

function gen_g4_sci_L3(){
  const it = pick([
    {
      q:"In the food chain grass → rabbit → fox, what does the rabbit eat?",
      a:"Grass",
      w:["Fox","Sunlight","Roots"]
    },
    {
      q:"What usually begins a food chain?",
      a:"A producer",
      w:["A predator","A rock","Reptile"]
    },
    {
      q:"In the food chain plant → caterpillar → bird, the bird gets energy from the…",
      a:"Caterpillar",
      w:["Soil","Rain","Reptile"]
    },
    {
      q:"In the food chain grass → rabbit → fox, what does the rabbit eat?",
      a:"Grass",
      w:["Fox","Sunlight","Roots"]
    },
    {
      q:"What usually begins a food chain?",
      a:"A producer",
      w:["A predator","A rock","Reptile"]
    },
    {
      q:"In the food chain plant → caterpillar → bird, the bird gets energy from the…",
      a:"Caterpillar",
      w:["Soil","Rain","Reptile"]
    },
    {
      q:"In the food chain grass → rabbit → fox, what does the rabbit eat?",
      a:"Grass",
      w:["Fox","Sunlight","Roots"]
    },
    {
      q:"What usually begins a food chain?",
      a:"A producer",
      w:["A predator","A rock","Reptile"]
    },
    {
      q:"In the food chain plant → caterpillar → bird, the bird gets energy from the…",
      a:"Caterpillar",
      w:["Soil","Rain","Reptile"]
    },
    {
      q:"In the food chain grass → rabbit → fox, what does the rabbit eat?",
      a:"Grass",
      w:["Fox","Sunlight","Roots"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Energy moves through a food chain.");
}

function gen_g4_sci_L4(){
  const it = pick([
    {
      q:"A food web shows…",
      a:"Many connected food chains",
      w:["Only one animal","Only the weather","Reptile"]
    },
    {
      q:"If fewer insects live in a habitat, birds that eat insects may have…",
      a:"Less food",
      w:["More sunlight","More roots","Reptile"]
    },
    {
      q:"Why can one animal be part of several food chains?",
      a:"It may eat or be eaten by different organisms",
      w:["It never needs energy","It can turn into a plant","Reptile"]
    },
    {
      q:"A food web shows…",
      a:"Many connected food chains",
      w:["Only one animal","Only the weather","Reptile"]
    },
    {
      q:"If fewer insects live in a habitat, birds that eat insects may have…",
      a:"Less food",
      w:["More sunlight","More roots","Reptile"]
    },
    {
      q:"Why can one animal be part of several food chains?",
      a:"It may eat or be eaten by different organisms",
      w:["It never needs energy","It can turn into a plant","Reptile"]
    },
    {
      q:"A food web shows…",
      a:"Many connected food chains",
      w:["Only one animal","Only the weather","Reptile"]
    },
    {
      q:"If fewer insects live in a habitat, birds that eat insects may have…",
      a:"Less food",
      w:["More sunlight","More roots","Reptile"]
    },
    {
      q:"Why can one animal be part of several food chains?",
      a:"It may eat or be eaten by different organisms",
      w:["It never needs energy","It can turn into a plant","Reptile"]
    },
    {
      q:"A food web shows…",
      a:"Many connected food chains",
      w:["Only one animal","Only the weather","Reptile"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Food webs show connected relationships.");
}

/* ---------- EARTH'S SURFACE ---------- */

function gen_g4_sci_L5(){
  const it = pick([
    {
      q:"A mineral is a naturally occurring material found in…",
      a:"Earth",
      w:["A computer","A storybook","Climate"]
    },
    {
      q:"Rocks are made of one or more…",
      a:"Minerals",
      w:["Clouds","Animals","Reptile"]
    },
    {
      q:"Which property can help identify a mineral?",
      a:"Hardness",
      w:["Favorite color","Age of a person","Person"]
    },
    {
      q:"A mineral is a naturally occurring material found in…",
      a:"Earth",
      w:["A computer","A storybook","Climate"]
    },
    {
      q:"Rocks are made of one or more…",
      a:"Minerals",
      w:["Clouds","Animals","Reptile"]
    },
    {
      q:"Which property can help identify a mineral?",
      a:"Hardness",
      w:["Favorite color","Age of a person","Person"]
    },
    {
      q:"A mineral is a naturally occurring material found in…",
      a:"Earth",
      w:["A computer","A storybook","Climate"]
    },
    {
      q:"Rocks are made of one or more…",
      a:"Minerals",
      w:["Clouds","Animals","Reptile"]
    },
    {
      q:"Which property can help identify a mineral?",
      a:"Hardness",
      w:["Favorite color","Age of a person","Person"]
    },
    {
      q:"A mineral is a naturally occurring material found in…",
      a:"Earth",
      w:["A computer","A storybook","Climate"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Rocks and minerals are part of Earth's surface.");
}

function gen_g4_sci_L6(){
  const it = pick([
    {
      q:"Weathering changes rocks by…",
      a:"BREAKING THEM INTO SMALLER PIECES",
      w:["Turning them into animals","Making them disappear instantly","Changing color only"],
      image:{ src:"images/Weatheringq3.png", alt:"Weathering breaks rocks into smaller pieces over time" }
    },
    {
      q:"Tree roots growing into cracks can cause…",
      a:"WEATHERING",
      w:["Moon phases","Electricity","Animal migration"],
      image:{ src:"images/Weatheringq1.png", alt:"Tree roots growing into rock cracks cause weathering" }
    },
    {
      q:"Freezing water inside a rock crack can make the rock…",
      a:"BREAK APART",
      w:["Float into space","Become a plant","Turn into glass"],
      image:{ src:"images/Weatheringq2.png", alt:"Freezing water expands in a rock crack and breaks the rock apart" }
    },
    {
      q:"Weathering changes rocks by…",
      a:"BREAKING THEM INTO SMALLER PIECES",
      w:["Turning them into animals","Making them disappear instantly","Changing color only"],
      image:{ src:"images/Weatheringq3.png", alt:"Weathering breaks rocks into smaller pieces over time" }
    },
    {
      q:"Tree roots growing into cracks can cause…",
      a:"WEATHERING",
      w:["Moon phases","Electricity","Animal migration"],
      image:{ src:"images/Weatheringq1.png", alt:"Tree roots growing into rock cracks cause weathering" }
    },
    {
      q:"Freezing water inside a rock crack can make the rock…",
      a:"BREAK APART",
      w:["Float into space","Become a plant","Turn into glass"],
      image:{ src:"images/Weatheringq2.png", alt:"Freezing water expands in a rock crack and breaks the rock apart" }
    },
    {
      q:"Weathering changes rocks by…",
      a:"BREAKING THEM INTO SMALLER PIECES",
      w:["Turning them into animals","Making them disappear instantly","Changing color only"],
      image:{ src:"images/Weatheringq3.png", alt:"Weathering breaks rocks into smaller pieces over time" }
    },
    {
      q:"Tree roots growing into cracks can cause…",
      a:"WEATHERING",
      w:["Moon phases","Electricity","Animal migration"],
      image:{ src:"images/Weatheringq1.png", alt:"Tree roots growing into rock cracks cause weathering" }
    },
    {
      q:"Freezing water inside a rock crack can make the rock…",
      a:"BREAK APART",
      w:["Float into space","Become a plant","Turn into glass"],
      image:{ src:"images/Weatheringq2.png", alt:"Freezing water expands in a rock crack and breaks the rock apart" }
    },
    {
      q:"Weathering changes rocks by…",
      a:"BREAKING THEM INTO SMALLER PIECES",
      w:["Turning them into animals","Making them disappear instantly","Changing color only"],
      image:{ src:"images/Weatheringq3.png", alt:"Weathering breaks rocks into smaller pieces over time" }
    }
  ]);
  const q = mcQuestion(it.q, it.a, it.w, "Weathering breaks rock down.");
  q.image = it.image;
  return q;
}

function gen_g4_sci_L7(){
  const it = pick([
    {
      q:"Erosion is the movement of soil and rock by…",
      a:"Wind or water",
      w:["Music or books","Light bulbs","Roots"]
    },
    {
      q:"Deposition happens when moved sediment is…",
      a:"Dropped in a new place",
      w:["Turned into energy","Eaten by plants","Roots"]
    },
    {
      q:"A river carrying sand downstream is an example of…",
      a:"Erosion",
      w:["Moonlight","Magnetism","Gravity"]
    },
    {
      q:"Erosion is the movement of soil and rock by…",
      a:"Wind or water",
      w:["Music or books","Light bulbs","Roots"]
    },
    {
      q:"Deposition happens when moved sediment is…",
      a:"Dropped in a new place",
      w:["Turned into energy","Eaten by plants","Roots"]
    },
    {
      q:"A river carrying sand downstream is an example of…",
      a:"Erosion",
      w:["Moonlight","Magnetism","Gravity"]
    },
    {
      q:"Erosion is the movement of soil and rock by…",
      a:"Wind or water",
      w:["Music or books","Light bulbs","Roots"]
    },
    {
      q:"Deposition happens when moved sediment is…",
      a:"Dropped in a new place",
      w:["Turned into energy","Eaten by plants","Roots"]
    },
    {
      q:"A river carrying sand downstream is an example of…",
      a:"Erosion",
      w:["Moonlight","Magnetism","Gravity"]
    },
    {
      q:"Erosion is the movement of soil and rock by…",
      a:"Wind or water",
      w:["Music or books","Light bulbs","Roots"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Erosion moves material; deposition drops it.");
}

function gen_g4_sci_L8(){
  const it = pick([
    {
      q:"Over time, rivers can form valleys by…",
      a:"Eroding rock and soil",
      w:["Adding electricity","Changing into clouds","Roots"]
    },
    {
      q:"A sand dune changes shape mainly because of…",
      a:"Wind",
      w:["Paper","Shadows","Area"]
    },
    {
      q:"A beach can grow when waves leave sand behind. This is called…",
      a:"Deposition",
      w:["Evaporation","Predation","Friction"]
    },
    {
      q:"Over time, rivers can form valleys by…",
      a:"Eroding rock and soil",
      w:["Adding electricity","Changing into clouds","Roots"]
    },
    {
      q:"A sand dune changes shape mainly because of…",
      a:"Wind",
      w:["Paper","Shadows","Area"]
    },
    {
      q:"A beach can grow when waves leave sand behind. This is called…",
      a:"Deposition",
      w:["Evaporation","Predation","Friction"]
    },
    {
      q:"Over time, rivers can form valleys by…",
      a:"Eroding rock and soil",
      w:["Adding electricity","Changing into clouds","Roots"]
    },
    {
      q:"A sand dune changes shape mainly because of…",
      a:"Wind",
      w:["Paper","Shadows","Area"]
    },
    {
      q:"A beach can grow when waves leave sand behind. This is called…",
      a:"Deposition",
      w:["Evaporation","Predation","Friction"]
    },
    {
      q:"Over time, rivers can form valleys by…",
      a:"Eroding rock and soil",
      w:["Adding electricity","Changing into clouds","Roots"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Landforms can change slowly over time.");
}

/* ---------- MATTER ---------- */

function gen_g4_sci_L9(){
  const it = pick([
    {
      q:"Which state of matter has a definite shape and definite volume?",
      a:"Solid",
      w:["Liquid","Gas","Friction"]
    },
    {
      q:"Which state of matter takes the shape of its container but keeps its volume?",
      a:"Liquid",
      w:["Solid","Gas","Friction"]
    },
    {
      q:"Which state of matter spreads out to fill its container?",
      a:"Gas",
      w:["Solid","Liquid","Friction"]
    },
    {
      q:"Which state of matter has a definite shape and definite volume?",
      a:"Solid",
      w:["Liquid","Gas","Friction"]
    },
    {
      q:"Which state of matter takes the shape of its container but keeps its volume?",
      a:"Liquid",
      w:["Solid","Gas","Friction"]
    },
    {
      q:"Which state of matter spreads out to fill its container?",
      a:"Gas",
      w:["Solid","Liquid","Friction"]
    },
    {
      q:"Which state of matter has a definite shape and definite volume?",
      a:"Solid",
      w:["Liquid","Gas","Friction"]
    },
    {
      q:"Which state of matter takes the shape of its container but keeps its volume?",
      a:"Liquid",
      w:["Solid","Gas","Friction"]
    },
    {
      q:"Which state of matter spreads out to fill its container?",
      a:"Gas",
      w:["Solid","Liquid","Friction"]
    },
    {
      q:"Which state of matter has a definite shape and definite volume?",
      a:"Solid",
      w:["Liquid","Gas","Friction"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Matter can be solid, liquid, or gas.");
}

function gen_g4_sci_L10(){
  const it = pick([
    {
      q:"Which is a physical property of matter?",
      a:"Color",
      w:["Homework","Friendship","Friction"]
    },
    {
      q:"Which property tells how much matter is in an object?",
      a:"Mass",
      w:["Story","Weather forecast","Friction"]
    },
    {
      q:"An object's ability to float or sink is a type of…",
      a:"Physical property",
      w:["Character trait","Food chain","Chain"]
    },
    {
      q:"Which is a physical property of matter?",
      a:"Color",
      w:["Homework","Friendship","Friction"]
    },
    {
      q:"Which property tells how much matter is in an object?",
      a:"Mass",
      w:["Story","Weather forecast","Friction"]
    },
    {
      q:"An object's ability to float or sink is a type of…",
      a:"Physical property",
      w:["Character trait","Food chain","Chain"]
    },
    {
      q:"Which is a physical property of matter?",
      a:"Color",
      w:["Homework","Friendship","Friction"]
    },
    {
      q:"Which property tells how much matter is in an object?",
      a:"Mass",
      w:["Story","Weather forecast","Friction"]
    },
    {
      q:"An object's ability to float or sink is a type of…",
      a:"Physical property",
      w:["Character trait","Food chain","Chain"]
    },
    {
      q:"Which is a physical property of matter?",
      a:"Color",
      w:["Homework","Friendship","Friction"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Properties help describe matter.");
}

function gen_g4_sci_L11(){
  const it = pick([
    {
      q:"Melting ice is a physical change because it…",
      a:"Is still water",
      w:["Becomes a new substance","Disappears forever","Friction"]
    },
    {
      q:"Which is an example of a physical change?",
      a:"Cutting paper",
      w:["Burning wood","Rusting metal","Metal"]
    },
    {
      q:"Freezing water changes it from a liquid to a…",
      a:"Solid",
      w:["Gas only","New chemical","Friction"]
    },
    {
      q:"Melting ice is a physical change because it…",
      a:"Is still water",
      w:["Becomes a new substance","Disappears forever","Friction"]
    },
    {
      q:"Which is an example of a physical change?",
      a:"Cutting paper",
      w:["Burning wood","Rusting metal","Metal"]
    },
    {
      q:"Freezing water changes it from a liquid to a…",
      a:"Solid",
      w:["Gas only","New chemical","Friction"]
    },
    {
      q:"Melting ice is a physical change because it…",
      a:"Is still water",
      w:["Becomes a new substance","Disappears forever","Friction"]
    },
    {
      q:"Which is an example of a physical change?",
      a:"Cutting paper",
      w:["Burning wood","Rusting metal","Metal"]
    },
    {
      q:"Freezing water changes it from a liquid to a…",
      a:"Solid",
      w:["Gas only","New chemical","Friction"]
    },
    {
      q:"Melting ice is a physical change because it…",
      a:"Is still water",
      w:["Becomes a new substance","Disappears forever","Friction"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "A physical change does not make a new substance.");
}

function gen_g4_sci_L12(){
  const it = pick([
    {
      q:"Trail mix is an example of a…",
      a:"Mixture",
      w:["Single gas","Planet","Friction"]
    },
    {
      q:"Salt dissolved in water makes a…",
      a:"Solution",
      w:["Rock","Food chain","Variable"]
    },
    {
      q:"Which mixture can be separated by picking out its parts?",
      a:"Fruit salad",
      w:["Salt water","Melted ice","Ice"]
    },
    {
      q:"Trail mix is an example of a…",
      a:"Mixture",
      w:["Single gas","Planet","Friction"]
    },
    {
      q:"Salt dissolved in water makes a…",
      a:"Solution",
      w:["Rock","Food chain","Variable"]
    },
    {
      q:"Which mixture can be separated by picking out its parts?",
      a:"Fruit salad",
      w:["Salt water","Melted ice","Ice"]
    },
    {
      q:"Trail mix is an example of a…",
      a:"Mixture",
      w:["Single gas","Planet","Friction"]
    },
    {
      q:"Salt dissolved in water makes a…",
      a:"Solution",
      w:["Rock","Food chain","Variable"]
    },
    {
      q:"Which mixture can be separated by picking out its parts?",
      a:"Fruit salad",
      w:["Salt water","Melted ice","Ice"]
    },
    {
      q:"Trail mix is an example of a…",
      a:"Mixture",
      w:["Single gas","Planet","Friction"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Mixtures contain materials combined together.");
}

/* ---------- ENERGY AND MOTION ---------- */

function gen_g4_sci_L13(){
  const it = pick([
    {
      q:"Light, heat, sound, and electrical energy are all…",
      a:"Forms of energy",
      w:["Kinds of rocks","Parts of a plant","Roots"]
    },
    {
      q:"A ringing bell produces mainly…",
      a:"Sound energy",
      w:["Soil energy","Root energy","Roots"]
    },
    {
      q:"A toaster changes electrical energy mainly into…",
      a:"Heat energy",
      w:["Rock energy","Water energy","Gravity"]
    },
    {
      q:"Light, heat, sound, and electrical energy are all…",
      a:"Forms of energy",
      w:["Kinds of rocks","Parts of a plant","Roots"]
    },
    {
      q:"A ringing bell produces mainly…",
      a:"Sound energy",
      w:["Soil energy","Root energy","Roots"]
    },
    {
      q:"A toaster changes electrical energy mainly into…",
      a:"Heat energy",
      w:["Rock energy","Water energy","Gravity"]
    },
    {
      q:"Light, heat, sound, and electrical energy are all…",
      a:"Forms of energy",
      w:["Kinds of rocks","Parts of a plant","Roots"]
    },
    {
      q:"A ringing bell produces mainly…",
      a:"Sound energy",
      w:["Soil energy","Root energy","Roots"]
    },
    {
      q:"A toaster changes electrical energy mainly into…",
      a:"Heat energy",
      w:["Rock energy","Water energy","Gravity"]
    },
    {
      q:"Light, heat, sound, and electrical energy are all…",
      a:"Forms of energy",
      w:["Kinds of rocks","Parts of a plant","Roots"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Energy comes in different forms.");
}

function gen_g4_sci_L14(){
  const it = pick([
    {
      q:"Light travels from the Sun to Earth as…",
      a:"Light energy",
      w:["Soil","Metal","Roots"]
    },
    {
      q:"Which object is a source of light?",
      a:"A flashlight",
      w:["A closed book","A rock","Gravity"]
    },
    {
      q:"A shadow forms when light is…",
      a:"Blocked",
      w:["Eaten","Turned into water","Gravity"]
    },
    {
      q:"Light travels from the Sun to Earth as…",
      a:"Light energy",
      w:["Soil","Metal","Roots"]
    },
    {
      q:"Which object is a source of light?",
      a:"A flashlight",
      w:["A closed book","A rock","Gravity"]
    },
    {
      q:"A shadow forms when light is…",
      a:"Blocked",
      w:["Eaten","Turned into water","Gravity"]
    },
    {
      q:"Light travels from the Sun to Earth as…",
      a:"Light energy",
      w:["Soil","Metal","Roots"]
    },
    {
      q:"Which object is a source of light?",
      a:"A flashlight",
      w:["A closed book","A rock","Gravity"]
    },
    {
      q:"A shadow forms when light is…",
      a:"Blocked",
      w:["Eaten","Turned into water","Gravity"]
    },
    {
      q:"Light travels from the Sun to Earth as…",
      a:"Light energy",
      w:["Soil","Metal","Roots"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Light energy helps us see.");
}

function gen_g4_sci_L15(){
  const it = pick([
    {
      q:"A lamp uses electrical energy to produce…",
      a:"Light and heat",
      w:["Soil and rocks","Roots and leaves","Roots"]
    },
    {
      q:"What provides electrical energy to a flashlight?",
      a:"A battery",
      w:["A spoon","A leaf","Roots"]
    },
    {
      q:"Heat energy usually moves from a warmer object to a…",
      a:"Cooler object",
      w:["Louder object","Taller object","Gravity"]
    },
    {
      q:"A lamp uses electrical energy to produce…",
      a:"Light and heat",
      w:["Soil and rocks","Roots and leaves","Roots"]
    },
    {
      q:"What provides electrical energy to a flashlight?",
      a:"A battery",
      w:["A spoon","A leaf","Roots"]
    },
    {
      q:"Heat energy usually moves from a warmer object to a…",
      a:"Cooler object",
      w:["Louder object","Taller object","Gravity"]
    },
    {
      q:"A lamp uses electrical energy to produce…",
      a:"Light and heat",
      w:["Soil and rocks","Roots and leaves","Roots"]
    },
    {
      q:"What provides electrical energy to a flashlight?",
      a:"A battery",
      w:["A spoon","A leaf","Roots"]
    },
    {
      q:"Heat energy usually moves from a warmer object to a…",
      a:"Cooler object",
      w:["Louder object","Taller object","Gravity"]
    },
    {
      q:"A lamp uses electrical energy to produce…",
      a:"Light and heat",
      w:["Soil and rocks","Roots and leaves","Roots"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Heat and electricity are forms of energy.");
}

function gen_g4_sci_L16(){
  const it = pick([
    {
      q:"A push or a pull is called a…",
      a:"Force",
      w:["Mineral","Solution","Gravity"]
    },
    {
      q:"Kicking a soccer ball causes it to…",
      a:"Move",
      w:["Become a plant","Change into water","Roots"]
    },
    {
      q:"A stronger push on a toy car will usually make it move…",
      a:"Faster",
      w:["Into a liquid","Without direction","Friction"]
    },
    {
      q:"A push or a pull is called a…",
      a:"Force",
      w:["Mineral","Solution","Gravity"]
    },
    {
      q:"Kicking a soccer ball causes it to…",
      a:"Move",
      w:["Become a plant","Change into water","Roots"]
    },
    {
      q:"A stronger push on a toy car will usually make it move…",
      a:"Faster",
      w:["Into a liquid","Without direction","Friction"]
    },
    {
      q:"A push or a pull is called a…",
      a:"Force",
      w:["Mineral","Solution","Gravity"]
    },
    {
      q:"Kicking a soccer ball causes it to…",
      a:"Move",
      w:["Become a plant","Change into water","Roots"]
    },
    {
      q:"A stronger push on a toy car will usually make it move…",
      a:"Faster",
      w:["Into a liquid","Without direction","Friction"]
    },
    {
      q:"A push or a pull is called a…",
      a:"Force",
      w:["Mineral","Solution","Gravity"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Forces can change motion.");
}

/* ---------- EARTH AND SPACE ---------- */

function gen_g4_sci_L17(){
  const it = pick([
    {
      q:"Water changing from liquid into water vapor is called…",
      a:"Evaporation",
      w:["Erosion","Deposition","Friction"]
    },
    {
      q:"Clouds form during which part of the water cycle?",
      a:"Condensation",
      w:["Predation","Weathering","Climate"]
    },
    {
      q:"Rain and snow falling from clouds are forms of…",
      a:"Precipitation",
      w:["Electricity","Minerals","Gravity"]
    },
    {
      q:"Water changing from liquid into water vapor is called…",
      a:"Evaporation",
      w:["Erosion","Deposition","Friction"]
    },
    {
      q:"Clouds form during which part of the water cycle?",
      a:"Condensation",
      w:["Predation","Weathering","Climate"]
    },
    {
      q:"Rain and snow falling from clouds are forms of…",
      a:"Precipitation",
      w:["Electricity","Minerals","Gravity"]
    },
    {
      q:"Water changing from liquid into water vapor is called…",
      a:"Evaporation",
      w:["Erosion","Deposition","Friction"]
    },
    {
      q:"Clouds form during which part of the water cycle?",
      a:"Condensation",
      w:["Predation","Weathering","Climate"]
    },
    {
      q:"Rain and snow falling from clouds are forms of…",
      a:"Precipitation",
      w:["Electricity","Minerals","Gravity"]
    },
    {
      q:"Water changing from liquid into water vapor is called…",
      a:"Evaporation",
      w:["Erosion","Deposition","Friction"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Follow water through the water cycle.");
}

function gen_g4_sci_L18(){
  const it = pick([
    {
      q:"Weather describes conditions in the atmosphere over a…",
      a:"Short period of time",
      w:["Million years only","Food chain","Climate"]
    },
    {
      q:"Which tool measures temperature?",
      a:"Thermometer",
      w:["Ruler","Magnet","Gravity"]
    },
    {
      q:"A pattern of weather over a long time is called…",
      a:"Climate",
      w:["Erosion","Matter","Friction"]
    },
    {
      q:"Weather describes conditions in the atmosphere over a…",
      a:"Short period of time",
      w:["Million years only","Food chain","Climate"]
    },
    {
      q:"Which tool measures temperature?",
      a:"Thermometer",
      w:["Ruler","Magnet","Gravity"]
    },
    {
      q:"A pattern of weather over a long time is called…",
      a:"Climate",
      w:["Erosion","Matter","Friction"]
    },
    {
      q:"Weather describes conditions in the atmosphere over a…",
      a:"Short period of time",
      w:["Million years only","Food chain","Climate"]
    },
    {
      q:"Which tool measures temperature?",
      a:"Thermometer",
      w:["Ruler","Magnet","Gravity"]
    },
    {
      q:"A pattern of weather over a long time is called…",
      a:"Climate",
      w:["Erosion","Matter","Friction"]
    },
    {
      q:"Weather describes conditions in the atmosphere over a…",
      a:"Short period of time",
      w:["Million years only","Food chain","Climate"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Weather can be measured and observed.");
}

function gen_g4_sci_L19(){
  const it = pick([
    {
      q:"Which object is at the center of our solar system?",
      a:"The sun",
      w:["The moon","Earth","Roots"]
    },
    {
      q:"Earth is a planet that travels around the…",
      a:"Sun",
      w:["Clouds","Ocean","Climate"]
    },
    {
      q:"The Sun is best described as a…",
      a:"Star",
      w:["Planet","Moon","Climate"]
    },
    {
      q:"Which object is at the center of our solar system?",
      a:"The sun",
      w:["The moon","Earth","Roots"]
    },
    {
      q:"Earth is a planet that travels around the…",
      a:"Sun",
      w:["Clouds","Ocean","Climate"]
    },
    {
      q:"The Sun is best described as a…",
      a:"Star",
      w:["Planet","Moon","Climate"]
    },
    {
      q:"Which object is at the center of our solar system?",
      a:"The sun",
      w:["The moon","Earth","Roots"]
    },
    {
      q:"Earth is a planet that travels around the…",
      a:"Sun",
      w:["Clouds","Ocean","Climate"]
    },
    {
      q:"The Sun is best described as a…",
      a:"Star",
      w:["Planet","Moon","Climate"]
    },
    {
      q:"Which object is at the center of our solar system?",
      a:"The sun",
      w:["The moon","Earth","Roots"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "The solar system includes the Sun and planets.");
}

function gen_g4_sci_L20(){
  const it = pick([
    {
      q:"Why does the Moon appear to change shape during the month?",
      a:"We see different lit parts of the moon",
      w:["The moon breaks apart","Clouds create the moon","Area"]
    },
    {
      q:"When the Moon appears fully lit, it is called a…",
      a:"Full moon",
      w:["New moon","Solar system","Roots"]
    },
    {
      q:"When the Moon appears dark from Earth, it is called a…",
      a:"New moon",
      w:["Full moon","Sun","Climate"]
    },
    {
      q:"Why does the Moon appear to change shape during the month?",
      a:"We see different lit parts of the moon",
      w:["The moon breaks apart","Clouds create the moon","Area"]
    },
    {
      q:"When the Moon appears fully lit, it is called a…",
      a:"Full moon",
      w:["New moon","Solar system","Roots"]
    },
    {
      q:"When the Moon appears dark from Earth, it is called a…",
      a:"New moon",
      w:["Full moon","Sun","Climate"]
    },
    {
      q:"Why does the Moon appear to change shape during the month?",
      a:"We see different lit parts of the moon",
      w:["The moon breaks apart","Clouds create the moon","Area"]
    },
    {
      q:"When the Moon appears fully lit, it is called a…",
      a:"Full moon",
      w:["New moon","Solar system","Roots"]
    },
    {
      q:"When the Moon appears dark from Earth, it is called a…",
      a:"New moon",
      w:["Full moon","Sun","Climate"]
    },
    {
      q:"Why does the Moon appear to change shape during the month?",
      a:"We see different lit parts of the moon",
      w:["The moon breaks apart","Clouds create the moon","Area"]
    }
  ]);
  return mcQuestion(it.q, it.a, it.w, "Moon phases happen as the Moon travels around Earth.");
}
function gen_g4_sci_L21(){
  return g4Question([
    {
      q:"A polar bear's thick fur helps it survive in a…",
      a:"Cold habitat",
      w:["Hot desert","Deep volcano","Reptile"]
    },
    {
      q:"A duck's webbed feet help it…",
      a:"Swim",
      w:["Dig through rock","Fly to the moon","Climate"]
    },
    {
      q:"A cactus stores water to survive in a…",
      a:"Dry environment",
      w:["Frozen ocean","Rainy swamp only","Climate"]
    },
    {
      q:"Camouflage helps an animal…",
      a:"Blend into its surroundings",
      w:["Make its own sunlight","Change into a plant","Reptile"]
    },
    {
      q:"A polar bear's thick fur helps it survive in a…",
      a:"Cold habitat",
      w:["Hot desert","Deep volcano","Reptile"]
    },
    {
      q:"A duck's webbed feet help it…",
      a:"Swim",
      w:["Dig through rock","Fly to the moon","Climate"]
    },
    {
      q:"A cactus stores water to survive in a…",
      a:"Dry environment",
      w:["Frozen ocean","Rainy swamp only","Climate"]
    },
    {
      q:"Camouflage helps an animal…",
      a:"Blend into its surroundings",
      w:["Make its own sunlight","Change into a plant","Reptile"]
    },
    {
      q:"A polar bear's thick fur helps it survive in a…",
      a:"Cold habitat",
      w:["Hot desert","Deep volcano","Reptile"]
    },
    {
      q:"A duck's webbed feet help it…",
      a:"Swim",
      w:["Dig through rock","Fly to the moon","Climate"]
    }
  ], "Choose the adaptation answer.");
}


/* ---------- L22: HABITATS ---------- */
function gen_g4_sci_L22(){
  return g4Question([
    {
      q:"A habitat provides an organism with food, water, shelter, and…",
      a:"Space",
      w:["Homework","Metal","Reptile"]
    },
    {
      q:"Which animal is best suited for an ocean habitat?",
      a:"Dolphin",
      w:["Camel","Squirrel","Reptile"]
    },
    {
      q:"Which habitat receives very little rainfall?",
      a:"Desert",
      w:["Rainforest","Pond","Reptile"]
    },
    {
      q:"Frogs commonly live near ponds because they need…",
      a:"Water",
      w:["Sand only","Snow all year","Year"]
    },
    {
      q:"A habitat provides an organism with food, water, shelter, and…",
      a:"Space",
      w:["Homework","Metal","Reptile"]
    },
    {
      q:"Which animal is best suited for an ocean habitat?",
      a:"Dolphin",
      w:["Camel","Squirrel","Reptile"]
    },
    {
      q:"Which habitat receives very little rainfall?",
      a:"Desert",
      w:["Rainforest","Pond","Reptile"]
    },
    {
      q:"Frogs commonly live near ponds because they need…",
      a:"Water",
      w:["Sand only","Snow all year","Year"]
    },
    {
      q:"A habitat provides an organism with food, water, shelter, and…",
      a:"Space",
      w:["Homework","Metal","Reptile"]
    },
    {
      q:"Which animal is best suited for an ocean habitat?",
      a:"Dolphin",
      w:["Camel","Squirrel","Reptile"]
    }
  ], "Identify the habitat fact.");
}


/* ---------- L23: FOSSILS ---------- */
function gen_g4_sci_L23(){
  return g4Question([
    {
      q:"Fossils are preserved remains or traces of organisms that lived…",
      a:"Long ago",
      w:["Only today","Only in space","Organ system"]
    },
    {
      q:"A footprint preserved in rock can be a…",
      a:"Fossil",
      w:["Weather forecast","Magnet","Gravity"]
    },
    {
      q:"Scientists study fossils to learn about…",
      a:"Past life on earth",
      w:["Future video games","Today's lunch","Climate"]
    },
    {
      q:"Fossils are most often found in…",
      a:"Rock",
      w:["Clouds","Sunlight","Roots"]
    },
    {
      q:"Fossils are preserved remains or traces of organisms that lived…",
      a:"Long ago",
      w:["Only today","Only in space","Organ system"]
    },
    {
      q:"A footprint preserved in rock can be a…",
      a:"Fossil",
      w:["Weather forecast","Magnet","Gravity"]
    },
    {
      q:"Scientists study fossils to learn about…",
      a:"Past life on earth",
      w:["Future video games","Today's lunch","Climate"]
    },
    {
      q:"Fossils are most often found in…",
      a:"Rock",
      w:["Clouds","Sunlight","Roots"]
    },
    {
      q:"Fossils are preserved remains or traces of organisms that lived…",
      a:"Long ago",
      w:["Only today","Only in space","Organ system"]
    },
    {
      q:"A footprint preserved in rock can be a…",
      a:"Fossil",
      w:["Weather forecast","Magnet","Gravity"]
    }
  ], "Answer the fossil question.");
}


/* ---------- L24: EARTH'S LAYERS ---------- */
function gen_g4_sci_L24(){
  return g4Question([
    {
      q:"The outer layer of Earth where we live is the…",
      a:"Crust",
      w:["Core","Sun","Climate"]
    },
    {
      q:"The hottest central part of Earth is the…",
      a:"Core",
      w:["Crust","Cloud","Climate"]
    },
    {
      q:"Which layer is beneath Earth's crust?",
      a:"Mantle",
      w:["Ocean","Moon","Climate"]
    },
    {
      q:"Earth's layers include the crust, mantle, and…",
      a:"Core",
      w:["Leaf","Rainbow","Roots"]
    },
    {
      q:"The outer layer of Earth where we live is the…",
      a:"Crust",
      w:["Core","Sun","Climate"]
    },
    {
      q:"The hottest central part of Earth is the…",
      a:"Core",
      w:["Crust","Cloud","Climate"]
    },
    {
      q:"Which layer is beneath Earth's crust?",
      a:"Mantle",
      w:["Ocean","Moon","Climate"]
    },
    {
      q:"Earth's layers include the crust, mantle, and…",
      a:"Core",
      w:["Leaf","Rainbow","Roots"]
    },
    {
      q:"The outer layer of Earth where we live is the…",
      a:"Crust",
      w:["Core","Sun","Climate"]
    },
    {
      q:"The hottest central part of Earth is the…",
      a:"Core",
      w:["Crust","Cloud","Climate"]
    }
  ], "Choose the correct Earth layer.");
}


/* ---------- L25: NATURAL RESOURCES ---------- */
function gen_g4_sci_L25(){
  return g4Question([
    {
      q:"Which is a renewable resource?",
      a:"Sunlight",
      w:["Coal","Oil","Roots"]
    },
    {
      q:"Which resource can be replaced naturally over time?",
      a:"Wind energy",
      w:["Gasoline","Coal","Friction"]
    },
    {
      q:"Coal and oil are called nonrenewable because they…",
      a:"Take very long to form",
      w:["Grow on trees each week","Come from rain clouds","Climate"]
    },
    {
      q:"Turning off unused lights helps conserve…",
      a:"Energy",
      w:["Moon phases","Fossils","Gravity"]
    },
    {
      q:"Which is a renewable resource?",
      a:"Sunlight",
      w:["Coal","Oil","Roots"]
    },
    {
      q:"Which resource can be replaced naturally over time?",
      a:"Wind energy",
      w:["Gasoline","Coal","Friction"]
    },
    {
      q:"Coal and oil are called nonrenewable because they…",
      a:"Take very long to form",
      w:["Grow on trees each week","Come from rain clouds","Climate"]
    },
    {
      q:"Turning off unused lights helps conserve…",
      a:"Energy",
      w:["Moon phases","Fossils","Gravity"]
    },
    {
      q:"Which is a renewable resource?",
      a:"Sunlight",
      w:["Coal","Oil","Roots"]
    },
    {
      q:"Which resource can be replaced naturally over time?",
      a:"Wind energy",
      w:["Gasoline","Coal","Friction"]
    }
  ], "Choose the natural resource answer.");
}


/* ---------- L26: MAGNETISM ---------- */
function gen_g4_sci_L26(){
  return g4Question([
    {
      q:"Which object is most likely attracted to a magnet?",
      a:"Iron nail",
      w:["Wooden spoon","Plastic cup","Gravity"]
    },
    {
      q:"Magnets have a north pole and a…",
      a:"South pole",
      w:["Water pole","Light pole","Gravity"]
    },
    {
      q:"Two opposite magnetic poles will…",
      a:"Attract",
      w:["Always disappear","Turn into water","Unrelated meaning"]
    },
    {
      q:"Two like magnetic poles will usually…",
      a:"Repel",
      w:["Attract strongly","Melt","Gravity"]
    },
    {
      q:"Which object is most likely attracted to a magnet?",
      a:"Iron nail",
      w:["Wooden spoon","Plastic cup","Gravity"]
    },
    {
      q:"Magnets have a north pole and a…",
      a:"South pole",
      w:["Water pole","Light pole","Gravity"]
    },
    {
      q:"Two opposite magnetic poles will…",
      a:"Attract",
      w:["Always disappear","Turn into water","Unrelated meaning"]
    },
    {
      q:"Two like magnetic poles will usually…",
      a:"Repel",
      w:["Attract strongly","Melt","Gravity"]
    },
    {
      q:"Which object is most likely attracted to a magnet?",
      a:"Iron nail",
      w:["Wooden spoon","Plastic cup","Gravity"]
    },
    {
      q:"Magnets have a north pole and a…",
      a:"South pole",
      w:["Water pole","Light pole","Gravity"]
    }
  ], "Answer the magnetism question.");
}


/* ---------- L27: SOUND ENERGY ---------- */
function gen_g4_sci_L27(){
  return g4Question([
    {
      q:"Sound is produced when objects…",
      a:"Vibrate",
      w:["Freeze","Turn green","Plain"]
    },
    {
      q:"Sound travels through matter in the form of…",
      a:"Waves",
      w:["Roots","Shadows","Friction"]
    },
    {
      q:"Which object produces sound energy when struck?",
      a:"Drum",
      w:["Pillow sitting still","Empty paper","Plain"]
    },
    {
      q:"A louder sound usually comes from stronger…",
      a:"Vibrations",
      w:["Fossils","Moon phases","Plain"]
    },
    {
      q:"Sound is produced when objects…",
      a:"Vibrate",
      w:["Freeze","Turn green","Plain"]
    },
    {
      q:"Sound travels through matter in the form of…",
      a:"Waves",
      w:["Roots","Shadows","Friction"]
    },
    {
      q:"Which object produces sound energy when struck?",
      a:"Drum",
      w:["Pillow sitting still","Empty paper","Plain"]
    },
    {
      q:"A louder sound usually comes from stronger…",
      a:"Vibrations",
      w:["Fossils","Moon phases","Plain"]
    },
    {
      q:"Sound is produced when objects…",
      a:"Vibrate",
      w:["Freeze","Turn green","Plain"]
    },
    {
      q:"Sound travels through matter in the form of…",
      a:"Waves",
      w:["Roots","Shadows","Friction"]
    }
  ], "Choose the sound energy answer.");
}


/* ---------- L28: SCIENTIFIC INVESTIGATION ---------- */
function gen_g4_sci_L28(){
  return g4Question([
    {
      q:"A testable question can be answered by conducting an…",
      a:"Experiment",
      w:["Argument only","Imaginary story","Story"]
    },
    {
      q:"During an experiment, information you record is called…",
      a:"Data",
      w:["Decoration","Fiction","Cover color"]
    },
    {
      q:"A prediction about what may happen in an experiment is a…",
      a:"Hypothesis",
      w:["Habitat","Planet","Reptile"]
    },
    {
      q:"For a fair test, a scientist should change only…",
      a:"One variable at a time",
      w:["Everything at once","The answer after testing","Variable"]
    },
    {
      q:"A testable question can be answered by conducting an…",
      a:"Experiment",
      w:["Argument only","Imaginary story","Story"]
    },
    {
      q:"During an experiment, information you record is called…",
      a:"Data",
      w:["Decoration","Fiction","Cover color"]
    },
    {
      q:"A prediction about what may happen in an experiment is a…",
      a:"Hypothesis",
      w:["Habitat","Planet","Reptile"]
    },
    {
      q:"For a fair test, a scientist should change only…",
      a:"One variable at a time",
      w:["Everything at once","The answer after testing","Variable"]
    },
    {
      q:"A testable question can be answered by conducting an…",
      a:"Experiment",
      w:["Argument only","Imaginary story","Story"]
    },
    {
      q:"During an experiment, information you record is called…",
      a:"Data",
      w:["Decoration","Fiction","Cover color"]
    }
  ], "Use scientific investigation skills.");
}
