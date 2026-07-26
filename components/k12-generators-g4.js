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
    },
    {
      q:"A bird's wings help it to…",
      a:"FLY",
      w:["Breathe underwater","Grow leaves","Dig in soil"],
    },
    {
      q:"Which animal structure helps a fish move through water?",
      a:"FINS",
      w:["Fur","Claws","Scales"],
    },
    {
      q:"Which plant structure takes in water from the soil?",
      a:"ROOTS",
      w:["Flowers","Fruit","Stem"],
    },
    {
      q:"A bird's wings help it to…",
      a:"FLY",
      w:["Breathe underwater","Grow leaves","Dig in soil"],
    },
    {
      q:"Which animal structure helps a fish move through water?",
      a:"FINS",
      w:["Fur","Claws","Scales"],
    },
    {
      q:"Which plant structure takes in water from the soil?",
      a:"ROOTS",
      w:["Flowers","Fruit","Stem"],
    },
    {
      q:"A bird's wings help it to…",
      a:"FLY",
      w:["Breathe underwater","Grow leaves","Dig in soil"],
    },
    {
      q:"Which animal structure helps a fish move through water?",
      a:"FINS",
      w:["Fur","Claws","Scales"],
    },
    {
      q:"Which plant structure takes in water from the soil?",
      a:"ROOTS",
      w:["Flowers","Fruit","Stem"],
    }
  ]);
  const question = mcQuestion(it.q, it.a, it.w, "Structures help living things survive.");
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
    },
    {
      q:"Tree roots growing into cracks can cause…",
      a:"WEATHERING",
      w:["Moon phases","Electricity","Animal migration"],
    },
    {
      q:"Freezing water inside a rock crack can make the rock…",
      a:"BREAK APART",
      w:["Float into space","Become a plant","Turn into glass"],
    },
    {
      q:"Weathering changes rocks by…",
      a:"BREAKING THEM INTO SMALLER PIECES",
      w:["Turning them into animals","Making them disappear instantly","Changing color only"],
    },
    {
      q:"Tree roots growing into cracks can cause…",
      a:"WEATHERING",
      w:["Moon phases","Electricity","Animal migration"],
    },
    {
      q:"Freezing water inside a rock crack can make the rock…",
      a:"BREAK APART",
      w:["Float into space","Become a plant","Turn into glass"],
    },
    {
      q:"Weathering changes rocks by…",
      a:"BREAKING THEM INTO SMALLER PIECES",
      w:["Turning them into animals","Making them disappear instantly","Changing color only"],
    },
    {
      q:"Tree roots growing into cracks can cause…",
      a:"WEATHERING",
      w:["Moon phases","Electricity","Animal migration"],
    },
    {
      q:"Freezing water inside a rock crack can make the rock…",
      a:"BREAK APART",
      w:["Float into space","Become a plant","Turn into glass"],
    },
    {
      q:"Weathering changes rocks by…",
      a:"BREAKING THEM INTO SMALLER PIECES",
      w:["Turning them into animals","Making them disappear instantly","Changing color only"],
    }
  ]);
  const q = mcQuestion(it.q, it.a, it.w, "Weathering breaks rock down.");
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

/* =========================================================
   GRADE 4 TEKS MASTERY REBUILD (2026)

   Every lesson below owns a sequenced bank of exactly 25 questions. The
   lesson runner uses LR.round, so questions 1-25 are delivered once in five
   bands: Foundation, Apply, Reason, Challenge, and Mastery. Rounds 21-25
   use the lesson's own content for error analysis, evidence synthesis, and
   multi-condition reasoning instead of sampling from a repeating pool.

   Official TEA sources:
   ELAR: https://legacycms.tea.texas.gov/sites/default/files/ch110a.pdf
   Math: https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect/ch111a.pdf
   Science: https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect/ch112a.pdf
========================================================= */

const G4_TEKS_BANKS = Object.create(null);
const G4_TEKS_CURSORS = Object.create(null);
const G4_DIFFICULTY_BANDS = Object.freeze(["Foundation","Apply","Reason","Challenge","Mastery"]);
const G4_TEKS_SOURCE = {
  eng:"https://legacycms.tea.texas.gov/sites/default/files/ch110a.pdf",
  math:"https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect/ch111a.pdf",
  sci:"https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect/ch112a.pdf"
};

function g4Item(q, a, w1, w2, w3, explain){
  return {q:String(q), a:String(a), w:[String(w1), String(w2), String(w3)], explain:String(explain)};
}

function g4TaskText(value){
  return String(value || "").replace(/\s+/g, " ").trim().replace(/[.!?]+$/, "");
}

function g4MasteryItems(subject, lesson, standard, expectation, items){
  const prompts=[
    (item,wrong)=>`Which answer correctly resolves “${g4TaskText(item.q)}” and replaces the incorrect choice “${wrong}”?`,
    (item,wrong)=>`Which answer to “${g4TaskText(item.q)}” is supported by all relevant evidence rather than “${wrong}”?`,
    (item,wrong)=>`Which answer satisfies every condition in “${g4TaskText(item.q)}”?`,
    (item,wrong)=>`When “${item.a}” and “${wrong}” are compared for “${g4TaskText(item.q)},” which answer remains defensible?`,
    (item,wrong)=>`Which answer solves “${g4TaskText(item.q)}” without making the error shown by “${wrong}”?`
  ];
  return items.slice(15,20).map((item,phase)=>{
    const wrong=item.w[phase%item.w.length];
    const masteryItem = g4Item(
      prompts[phase](item,wrong),
      item.a,
      ...item.w,
      `${item.a} is the defensible answer. ${item.explain} The response "${wrong}" fails at least one condition, so the correction uses the complete ${subject} lesson evidence.`
    );
    masteryItem.trueFalseContext = item.q;
    return masteryItem;
  });
}

function g4Register(subject, lesson, standard, expectation, items){
  const key = `${subject}.${lesson}`;
  if(!Array.isArray(items) || items.length !== 20){
    throw new Error(`Grade 4 ${key} must define exactly 20 lesson-owned foundation-through-challenge questions before mastery; found ${items?.length || 0}.`);
  }
  const lessonItems=[...items,...g4MasteryItems(subject,lesson,standard,expectation,items)];
  const seen = new Set();
  const normalized = lessonItems.map((item, index)=>{
    if(!item || !item.q || !item.a || !Array.isArray(item.w) || item.w.length !== 3 || !item.explain){
      throw new Error(`Grade 4 ${key} question ${index + 1} is incomplete.`);
    }
    const signature = item.q.trim().toLowerCase();
    if(seen.has(signature)) throw new Error(`Duplicate Grade 4 question in ${key}: ${item.q}`);
    seen.add(signature);
    if(new Set([item.a, ...item.w].map(String)).size !== 4){
      throw new Error(`Grade 4 ${key} question ${index + 1} must have four distinct answer choices.`);
    }
    const trueFalseSlot = (index + 1) % 4 === 0;
    const claimIsTrue = ((index + 1) / 4) % 2 === 1;
    const claimedAnswer = claimIsTrue ? item.a : item.w[0];
    const trueFalseContext = item.trueFalseContext || item.q;
    const delivered = trueFalseSlot ? {
      type:"truefalse",
      q:`True or false: “${claimedAnswer}” correctly answers “${g4TaskText(trueFalseContext)}.”`,
      answer:claimIsTrue,
      explain:claimIsTrue
        ? `The statement is true. ${item.explain}`
        : `The statement is false. ${item.explain} The correct answer is "${item.a}," not "${claimedAnswer}."`
    } : item;
    const section = subject === "eng" ? "110.6" : subject === "math" ? "111.6" : "112.6";
    const expectationCode = `§${section}(b)${standard.replace(/^4\./, "").replace(/^(\d+)/, "($1)")}`;
    const expectationMeta = Object.freeze({code:expectationCode, text:expectation, source:G4_TEKS_SOURCE[subject]});
    return Object.freeze({
      ...delivered,
      difficulty:Math.ceil((index + 1) / 5),
      difficultyTier:Math.ceil((index + 1) / 5),
      difficultyBand:G4_DIFFICULTY_BANDS[Math.floor(index / 5)],
      sequence:index + 1,
      lessonId:`g4:${subject}:${lesson}`,
      teksExpectation:expectationMeta,
      teksStudentExpectation:expectationMeta,
      teksText:expectation,
      teksSource:G4_TEKS_SOURCE[subject]
    });
  });
  G4_TEKS_BANKS[key] = Object.freeze({subject, lesson, standard, expectation, items:Object.freeze(normalized)});
}

function g4BankQuestion(subject, lesson){
  const key = `${subject}.${lesson}`;
  const bank = G4_TEKS_BANKS[key];
  if(!bank) throw new Error(`Missing Grade 4 TEKS bank: ${key}`);
  let index;
  if(typeof LR !== "undefined" && Number(LR.round) >= 1 && Number(LR.round) <= 25){
    index = Math.max(0, Math.min(24, Number(LR.round || 1) - 1));
  }else{
    index = G4_TEKS_CURSORS[key] || 0;
    G4_TEKS_CURSORS[key] = (index + 1) % 25;
  }
  const item = bank.items[index];
  const question = item.type === "truefalse"
    ? {type:"truefalse", q:item.q, answer:item.answer, audio:item.q}
    : mcQuestion(item.q, item.a, item.w, item.q);
  const authoredExplanation=String(item.explain||"").trim();
  question.explain = authoredExplanation.length >= 12
    ? authoredExplanation
    : `${authoredExplanation} This calculation directly verifies the answer to "${item.q}".`;
  question.difficulty = item.difficulty;
  question.difficultyTier = item.difficultyTier;
  question.difficultyBand = item.difficultyBand;
  question.sequence = item.sequence;
  question.lessonId = item.lessonId;
  question.teksExpectation = item.teksExpectation;
  question.teksStudentExpectation = item.teksStudentExpectation;
  question.teksText = item.teksText;
  question.teksSource = item.teksSource;
  return question;
}

/* ---------- Grade 4 ELAR: 21 lesson-specific banks ---------- */

g4Register("eng","L1","4.3(B)","Use context within and beyond a sentence to determine the relevant meaning of unfamiliar or multiple-meaning words",[
  g4Item('The puppy was famished, so it gobbled every bite of food. What does "famished" mean?',"Very hungry","Very playful","Very sleepy","Very small","Gobbled every bite is evidence that famished means very hungry."),
  g4Item('The trail was narrow; only one hiker could walk on it at a time. What does "narrow" mean?',"Not wide","Very steep","Covered in mud","Easy to follow","Only one hiker fitting at a time shows that narrow means not wide."),
  g4Item('Nora was reluctant to dive, so she stayed on the edge of the pool. What does "reluctant" mean?',"Unwilling or hesitant","Ready and excited","Unable to swim","Loud and cheerful","Staying on the edge rather than diving shows hesitation."),
  g4Item('The glass ornament was fragile. Luis wrapped it in cloth before carrying it. What does "fragile" mean?',"Easily broken","Very valuable","Brightly colored","Difficult to lift","Wrapping the ornament protects something that is easily broken."),
  g4Item('After the storm, the once-clear creek was murky, and we could not see the rocks below. What does "murky" mean?',"Cloudy or dark","Fast-moving","Very shallow","Filled with fish","Not seeing through the water shows that murky means cloudy or dark."),
  g4Item('The crowd was jubilant when the final goal was scored; fans cheered and hugged. What does "jubilant" mean?',"Extremely joyful","Quietly worried","Confused","Disappointed","Cheering and hugging after a win are clues for extreme joy."),
  g4Item('Ava gave a concise report: in three sentences, she stated every important fact. What does "concise" mean?',"Brief but complete","Long and repetitive","Mostly incorrect","Difficult to hear","Three sentences containing every important fact describes writing that is brief but complete."),
  g4Item('The abandoned cabin looked desolate. No people, animals, or lights could be seen for miles. What does "desolate" mean?',"Empty and lonely","Warm and welcoming","Recently repaired","Small but crowded","The absence of people, animals, and lights supports empty and lonely."),
  g4Item('Although the first plan failed, the team was resilient and quickly tried a different approach. What does "resilient" mean?',"Able to recover from difficulty","Certain to make mistakes","Unwilling to cooperate","Careful to avoid work","Trying again after failure demonstrates the ability to recover."),
  g4Item('Mina scrutinized the map, checking every symbol before choosing a route. What does "scrutinized" mean?',"Examined closely","Folded carelessly","Copied from memory","Ignored completely","Checking every symbol is evidence that scrutinized means examined closely."),
  g4Item('The coach called the last drill optional, so players could choose whether to complete it. What does "optional" mean?',"Not required","Extremely difficult","Done as a team","Scheduled for later","Being able to choose whether to do it means it is not required."),
  g4Item('The medicine alleviated Jayden\'s sore throat; within an hour, the pain was much weaker. What does "alleviated" mean?',"Made less severe","Made permanent","Caused suddenly","Measured carefully","The pain becoming weaker shows that the medicine made it less severe."),
  g4Item('The principal\'s decision was impartial. She listened to both teams and favored neither one. What does "impartial" mean?',"Fair and unbiased","Quick and final","Strict and angry","Popular with everyone","Favoring neither side is direct evidence of fairness and lack of bias."),
  g4Item('The scientist called the result preliminary because more trials were needed before a final conclusion. What does "preliminary" mean?',"Coming before the final result","Proven beyond doubt","Unrelated to the test","Recorded incorrectly","A result that comes before more trials and a final conclusion is preliminary."),
  g4Item('Rain was imminent: dark clouds gathered, thunder sounded, and the first drops began to fall. What does "imminent" mean?',"About to happen","Impossible to predict","Already finished","Unlikely this week","Dark clouds, thunder, and first drops show rain is about to happen."),
  g4Item('The article presents a compelling case for recycling by using facts about landfill space and ocean waste. What does "compelling" mean?',"Strongly convincing","Funny but untrue","Brief and unclear","Ordinary and expected","Relevant facts that build a strong case make the argument convincing."),
  g4Item('Kai\'s explanation was ambiguous. Half the group thought he meant Tuesday, while the others thought he meant Thursday. What does "ambiguous" mean?',"Open to more than one meaning","Supported by exact data","Spoken too quietly","Easy for everyone to understand","Two reasonable interpretations show that the explanation has more than one possible meaning."),
  g4Item('The mayor proposed a feasible solution: the town had enough money, workers, and time to complete it. What does "feasible" mean?',"Possible and practical","Illegal to attempt","Certain to fail","Needlessly expensive","Having the needed money, workers, and time makes the solution possible and practical."),
  g4Item('The two accounts were contradictory. One witness said the door was open, but the other insisted it was closed. What does "contradictory" mean?',"In conflict with each other","Identical in every detail","Based on careful measurement","Missing an important date","Open and closed cannot both describe the door at the same time, so the accounts conflict."),
  g4Item('The evidence was inconclusive: one test supported the claim, another opposed it, and a third showed no change. What does "inconclusive" mean?',"Not leading to a firm decision","Clearly proving the claim","Collected by one person","Too simple to measure","Mixed results do not support one firm conclusion.")
]);

g4Register("eng","L2","4.3(B)","Use context within and beyond a sentence to determine the relevant meaning of unfamiliar or multiple-meaning words",[
  g4Item('A habitat is the natural home of a plant or animal. What does "habitat" mean?',"A natural home","A source of food","A stage of growth","A weather event","The sentence directly defines habitat as a natural home."),
  g4Item('A peninsula, land almost surrounded by water, extends from the coast. What is a peninsula?',"Land almost surrounded by water","Water surrounded by land","A high flat area","A narrow river","The words after peninsula provide its definition."),
  g4Item('A nocturnal animal is active mainly at night. What does "nocturnal" mean?',"Active mainly at night","Sleeping through winter","Living underground","Hunting in groups","The sentence directly states that nocturnal animals are active mainly at night."),
  g4Item('Evaporation is the process by which liquid water changes into water vapor. What is evaporation?',"Liquid changing into vapor","Vapor changing into liquid","Ice changing into liquid","Water falling from clouds","The phrase after is gives the exact definition."),
  g4Item('A democracy is a system of government in which citizens choose their leaders. What is a democracy?',"Government in which citizens choose leaders","Government led by one inherited ruler","A court that interprets laws","A meeting without voting","The sentence defines democracy through citizen choice."),
  g4Item('The author used an anecdote, or a brief story about a real event, to begin the article. What is an anecdote?',"A brief story about a real event","A list of sources","An imagined setting","A formal definition","The phrase after or restates the meaning of anecdote."),
  g4Item('Pollination—the transfer of pollen from one flower part to another—helps plants reproduce. What is pollination?',"The transfer of pollen","The growth of roots","The loss of leaves","The movement of water","The words between dashes explicitly define pollination."),
  g4Item('An isthmus, a narrow strip of land joining two larger areas, connected the regions. What is an isthmus?',"A narrow strip joining larger land areas","A mountain between valleys","An island near shore","A deep ocean trench","The appositive phrase directly defines isthmus."),
  g4Item('The material was translucent, meaning it allowed some light through but did not show a clear image. What does "translucent" mean?',"Allowing some light through","Blocking all light","Producing its own light","Reflecting a perfect image","The sentence supplies the definition after meaning."),
  g4Item('The committee reached consensus—a decision everyone could accept—after a long discussion. What is consensus?',"A decision everyone can accept","A vote won by one person","An argument without evidence","A rule made in secret","The dash definition identifies consensus as shared acceptance."),
  g4Item('The biologist observed mutualism, a relationship in which both organisms benefit. What is mutualism?',"A relationship benefiting both organisms","A relationship harming both organisms","A change in one organism\'s habitat","A competition for the same resource","The appositive defines mutualism as a relationship benefiting both organisms."),
  g4Item('An embargo is an official ban on trade with a particular country. What is an embargo?',"An official trade ban","A tax on local property","A route between ports","A promise to lower prices","The predicate directly defines embargo."),
  g4Item('The narrator is omniscient; that is, the narrator knows every character\'s thoughts. What does "omniscient" mean here?',"Knowing every character\'s thoughts","Speaking as a character","Describing only the setting","Telling events out of order","That is introduces a direct explanation of omniscient."),
  g4Item('The soil was impermeable—it did not allow water to pass through it. What does "impermeable" mean?',"Not allowing liquid to pass through","Absorbing water rapidly","Breaking apart in water","Containing many nutrients","The clause after the dash gives the meaning."),
  g4Item('A renewable resource can be replaced naturally within a useful amount of time. Which meaning matches "renewable"?',"Able to be replaced naturally","Unable to be measured","Found only underground","Used without any effect","The sentence defines a renewable resource by natural replacement."),
  g4Item('The speaker made a rebuttal, a response that challenged the opposing claim with evidence. What is a rebuttal?',"An evidence-based response to an opposing claim","A statement introducing a topic","A question with no answer","A summary that agrees with every claim","The appositive directly explains the purpose of a rebuttal."),
  g4Item('The species is endemic to the island, meaning it occurs naturally nowhere else. What does "endemic" mean?',"Naturally limited to one place","Able to live in every climate","Recently brought by people","In danger of immediate extinction","Meaning signals the direct definition: naturally occurring nowhere else."),
  g4Item('A catalyst is something that causes or speeds up change without being used up in the process. What is a catalyst?',"Something that speeds change without being used up","Something that prevents every change","A record of changes over time","A result caused by missing evidence","The complete sentence gives the specialized definition."),
  g4Item('The treaty required reciprocity: each nation would provide the same benefit it received. What does "reciprocity" mean?',"An equal exchange between sides","Control by the stronger side","A delay before an agreement","A benefit given to neither side","The colon explains reciprocity as each side giving the same kind of benefit."),
  g4Item('The law included a moratorium, or temporary stop, on new construction while safety rules were reviewed. What is a moratorium?',"A temporary stop","A permanent prohibition","A building inspection","A change in ownership","The phrase after or defines a moratorium as temporary, not permanent.")
]);

g4Register("eng","L3","4.3(B)","Use context within and beyond a sentence to determine the relevant meaning of unfamiliar or multiple-meaning words",[
  g4Item('Celestial objects, such as the Sun, Moon, and stars, can be seen in the sky. What does "celestial" mean?',"Related to the sky or space","Hidden underground","Made by people","Too small to see","The examples Sun, Moon, and stars are all objects in the sky or space."),
  g4Item('Aquatic animals, including whales, trout, and octopuses, live in water. What does "aquatic" mean?',"Living in or near water","Active at night","Covered with feathers","Able to breathe only air","All listed examples live in water."),
  g4Item('Durable materials, such as steel, brick, and thick leather, last a long time. What does "durable" mean?',"Able to last a long time","Easy to tear","Rarely used","Light in color","Steel, brick, and thick leather are examples of long-lasting materials."),
  g4Item('Many pollinators—bees, butterflies, moths, and some bats—carry pollen between flowers. What is a pollinator?',"An organism that carries pollen","A plant that grows fruit","An animal that eats roots","A tool that measures rain","Every example carries pollen between flowers."),
  g4Item('The museum displayed artifacts such as clay pots, stone tools, and woven baskets from the settlement. What are artifacts?',"Objects made or used by people in the past","Living organisms from long ago","Maps of future buildings","Natural rocks unchanged by people","Pots, tools, and baskets from a settlement are human-made objects from the past."),
  g4Item('The region grows citrus fruits, including oranges, lemons, limes, and grapefruit. What does "citrus" describe?',"A group of tart, juicy fruits","All fruit with a pit","Vegetables grown underground","Plants used only for decoration","The listed examples define the citrus fruit category."),
  g4Item('The orchestra\'s percussion instruments—drums, cymbals, and tambourines—kept the rhythm. What are percussion instruments?',"Instruments sounded by striking or shaking","Instruments played by blowing air","Instruments with only strings","Electronic recording devices","Drums, cymbals, and tambourines are sounded by striking or shaking."),
  g4Item('Arid places, such as deserts and dry plateaus, receive very little rain. What does "arid" mean?',"Very dry","Extremely cold","Densely forested","Frequently flooded","Deserts and dry plateaus illustrate a very dry climate."),
  g4Item('The essay used transitions—for example, meanwhile, however, and therefore—to connect ideas. What are transitions?',"Words that connect ideas","Words that name people","Marks ending sentences","Titles of sections","The examples all signal relationships and connect ideas."),
  g4Item('Predatory birds, including hawks, eagles, and owls, hunt other animals. What does "predatory" mean?',"Hunting other animals","Eating only seeds","Unable to fly","Living near people","Hawks, eagles, and owls are examples of hunting birds."),
  g4Item('The recipe called for aromatic herbs, such as basil, rosemary, and mint, that filled the room with scent. What does "aromatic" mean?',"Having a noticeable pleasant smell","Having a bitter flavor","Growing only indoors","Losing color when heated","The fragrant herb examples and room-filling scent show the meaning."),
  g4Item('The scientist recorded quantitative data—for instance, mass in grams, temperature in degrees, and time in seconds. What does "quantitative" mean?',"Expressed with numbers or measurements","Based only on opinions","Described with color words","Collected without tools","Mass, temperature, and time are numerical measurements."),
  g4Item('The animal showed defensive behaviors, including raising its spines, hissing, and retreating into a burrow. What does "defensive" mean?',"Used for protection","Used to attract food","Used to communicate location","Used only during sleep","Each behavior helps protect the animal from danger."),
  g4Item('Several indicators—falling air pressure, darkening clouds, and rising wind—suggested a storm. What is an indicator?',"A sign that points to a condition","A cause that guarantees an event","A tool used only indoors","A measurement with no meaning","The listed observations are signs pointing toward a storm."),
  g4Item('The author cites credible sources, including a university study, a government report, and an expert interview. What does "credible" mean?',"Trustworthy and believable","Entertaining but imaginary","Written very recently","Agreeing with the author","The examples are sources chosen for trustworthiness and expertise."),
  g4Item('The engineer considered constraints such as cost, available materials, safety rules, and the deadline. What are constraints?',"Limits or requirements a solution must meet","Ideas that can be ignored","Rewards for finishing early","Measurements taken after building","Cost, materials, rules, and time all limit what can be designed."),
  g4Item('The debate included opposing perspectives: one group prioritized lower cost, while another emphasized lasting quality. What are perspectives?',"Different ways of viewing an issue","Facts accepted by every person","Mistakes in an argument","Steps arranged by time","The groups view the same decision through different priorities."),
  g4Item('The habitat has scarce resources—for example, one seasonal pond, a few fruiting trees, and limited shelter. What does "scarce" mean?',"Available only in small amounts","Spread evenly everywhere","Impossible to use","Growing more each day","The few, limited examples show that the resources are scarce."),
  g4Item('The text contains implicit clues, such as a trembling voice, clenched hands, and repeated glances at the exit, that reveal fear without naming it. What does "implicit" mean?',"Suggested rather than directly stated","Repeated word for word","Unrelated to the character","Proven by a photograph","The examples suggest fear even though the text never states the word."),
  g4Item('The policy produced unintended consequences, including longer lines, extra paperwork, and delays that planners had not predicted. What does "unintended" mean?',"Not planned or meant to happen","Required by written rules","Helpful to every person","Caused before the policy","The consequences were not predicted or planned.")
]);

g4Register("eng","L4","4.3(B)","Use context within and beyond a sentence to determine the relevant meaning of unfamiliar or multiple-meaning words",[
  g4Item('Unlike the rigid metal rod, the rubber tube was flexible. What does "flexible" mean?',"Able to bend","Unable to move","Made of metal","Perfectly straight","Unlike signals a contrast with rigid, so flexible means able to bend."),
  g4Item('The room was chaotic before cleanup, but afterward everything was orderly. What does "chaotic" mean?',"Disorganized","Silent","Empty","Spotless","But contrasts chaotic with orderly, revealing the opposite meaning."),
  g4Item('While the rabbit was timid and hid, the squirrel boldly approached us. What does "timid" mean?',"Shy or fearful","Hungry","Quick","Curious","While contrasts hiding timidly with approaching boldly."),
  g4Item('The shallow stream reached my ankles, whereas the deep river rose above my waist. What does "shallow" mean?',"Not deep","Very cold","Fast-flowing","Wide","Whereas contrasts ankle-deep water with a deep river."),
  g4Item('Omar was stingy with supplies, but his generous partner shared everything. What does "stingy" mean?',"Unwilling to share","Eager to help","Unable to decide","Careful with tools","But contrasts stingy with generous sharing."),
  g4Item('The ancient manuscript was authentic, not a modern imitation. What does "authentic" mean?',"Genuine or real","Easy to copy","Recently written","Badly damaged","Not a modern imitation directly contrasts authentic with fake."),
  g4Item('The climb looked hazardous; in contrast, the paved trail was safe. What does "hazardous" mean?',"Dangerous","Short","Crowded","Steep only","In contrast pairs hazardous with the opposite of safe."),
  g4Item('Leah\'s first explanation was vague, but her revised one was precise and detailed. What does "vague" mean?',"Not clear or specific","Completely false","Very brief","Spoken with confidence","But contrasts vague with precise and detailed."),
  g4Item('The drought was temporary rather than permanent; rain returned the next month. What does "temporary" mean?',"Lasting a limited time","Happening every year","Impossible to end","Caused by weather","Rather than permanent reveals that temporary lasts only a limited time."),
  g4Item('The mayor remained composed during the emergency, while others panicked. What does "composed" mean?',"Calm and controlled","Unaware of danger","Ready to leave","Unable to speak","While contrasts composed behavior with panic."),
  g4Item('The material is opaque, unlike clear glass that lets light pass through. What does "opaque" mean?',"Not allowing light through","Easily broken","Smooth to touch","Able to magnify","Unlike clear glass signals that opaque blocks light."),
  g4Item('The evidence was abundant, not scarce: researchers filled twelve folders with records. What does "abundant" mean?',"Plentiful","Unreliable","Hidden","Recently discovered","Not scarce and twelve full folders both show a plentiful amount."),
  g4Item('Rather than being spontaneous, the performance was rehearsed for weeks. What does "spontaneous" mean?',"Done without advance planning","Practiced repeatedly","Performed for an audience","Finished ahead of schedule","Rather than rehearsed contrasts spontaneous with planned practice."),
  g4Item('The proposal was controversial; instead of agreeing, community members argued intensely about it. What does "controversial" mean?',"Likely to cause disagreement","Easy to approve","Based on no information","Helpful to all sides","Instead of agreeing points to strong disagreement."),
  g4Item('The change was subtle, not obvious; only a careful observer noticed it. What does "subtle" mean?',"Hard to notice","Impossible to explain","Quick to occur","Unimportant","Not obvious and requiring careful observation define subtle."),
  g4Item('Her explanation was objective rather than biased toward her own team. What does "objective" mean?',"Based on facts without favoritism","Supporting one preferred side","Missing supporting details","Written for a large audience","Rather than biased contrasts objectivity with favoritism."),
  g4Item('The two paintings were analogous, not identical: each used color in a similar way despite different subjects. What does "analogous" mean?',"Similar in an important way","Exactly the same","Completely unrelated","Made by one artist","Not identical plus similar use of color shows an important correspondence."),
  g4Item('The outcome was inevitable, not avoidable; without rain, the unwatered seedlings could not survive. What does "inevitable" mean?',"Certain to happen","Easy to prevent","Difficult to observe","Helpful in the long term","Not avoidable and the stated conditions show the outcome was certain."),
  g4Item('The witness gave an explicit description rather than merely hinting at what occurred. What does "explicit" mean?',"Clearly and directly stated","Suggested indirectly","Changed several times","Supported by another witness","Rather than hinting contrasts explicit language with indirect suggestion."),
  g4Item('The results were consistent, whereas the earlier trials had varied widely. What does "consistent" mean?',"Remaining similar across trials","Changing without a pattern","Incorrect in every trial","Collected with different tools","Whereas contrasts consistent results with results that varied widely.")
]);

g4Register("eng","L5","4.3(B)","Use context to determine the relevant meaning of words",[
  g4Item('In "The courageous firefighter entered the smoky room," which word could replace "courageous" without changing the meaning?',"brave","careless","silent","weary","Brave is a context-appropriate synonym for courageous."),
  g4Item('In "We purchased a sturdy table," which word is closest in meaning to "sturdy"?',"strong","tiny","ornate","used","Strong preserves the meaning of sturdy in this sentence."),
  g4Item('Which word best replaces "rapid" in "The rapid current carried the leaf downstream"?',"swift","shallow","muddy","cold","Swift and rapid both describe fast movement."),
  g4Item('Which word best replaces "observe" in "Observe the caterpillar closely"?',"watch","touch","move","draw","Watch has the same relevant meaning as observe here."),
  g4Item('Which word preserves the meaning of "The directions were precise"?',"exact","lengthy","optional","familiar","Precise means exact when describing directions."),
  g4Item('Which word best replaces "fortunate" in "We were fortunate to find shelter before the storm"?',"lucky","prepared","frightened","late","Lucky is the relevant synonym for fortunate."),
  g4Item('Which word best replaces "maintain" in "Workers maintain the trail each spring"?',"care for","discover","close","measure","To maintain a trail is to care for and keep it in good condition."),
  g4Item('Which word best replaces "departed" in "The train departed at noon"?',"left","arrived","waited","slowed","Departed and left have the same meaning in this context."),
  g4Item('Which word best replaces "concluded" in "Maya concluded that sunlight helped the plants grow"?',"determined","began","guessed wildly","forgot","Determined preserves the evidence-based meaning of concluded."),
  g4Item('Which phrase best replaces "retain" in "The soil can retain water after rain"?',"hold onto","move toward","turn into","measure","Retain means hold onto in this scientific context."),
  g4Item('Which word best replaces "significant" in "The team made significant progress"?',"important","ordinary","accidental","invisible","Significant progress is important or meaningful progress."),
  g4Item('Which word best replaces "demonstrate" in "Use the model to demonstrate how the lever works"?',"show","hide","question","repair","Demonstrate means show or explain through an example."),
  g4Item('Which phrase best replaces "declined" in "The bird population declined during the drought"?',"grew smaller","moved north","stayed stable","became diverse","In population context, declined means grew smaller."),
  g4Item('Which word best replaces "approach" in "The engineers tested a new approach to the problem"?',"method","arrival","distance","warning","Approach means method or way of handling a problem here."),
  g4Item('Which word best replaces "apparent" in "It became apparent that the container leaked"?',"clear","unlikely","hidden","debatable","Apparent means clear or evident in this context."),
  g4Item('Which phrase best replaces "allocate" in "The council will allocate funds among three projects"?',"distribute","collect secretly","borrow","count twice","Allocate means distribute resources for particular purposes."),
  g4Item('Which word best replaces "sustain" in "The wetland can sustain many species"?',"support","identify","attract briefly","separate","Sustain means support continued life in this ecological context."),
  g4Item('Which word best replaces "valid" in "The claim is valid because reliable evidence supports it"?',"sound","popular","lengthy","surprising","A valid claim is logically sound and supported."),
  g4Item('Which word best replaces "infer" in "Readers can infer the character is worried from her actions"?',"conclude","announce","memorize","describe directly","To infer is to reach a conclusion from evidence rather than a direct statement."),
  g4Item('Which phrase best replaces "counter" in "The author uses data to counter the opposing argument"?',"respond against","repeat exactly","avoid discussing","partly agree with","Counter means respond against with evidence in an argument.")
]);

g4Register("eng","L6","4.3(B)","Use context to determine the relevant meaning of words",[
  g4Item('Which word is the opposite of "scarce" in "Water was scarce during the drought"?',"abundant","muddy","necessary","stored","Abundant is the contextual antonym of scarce."),
  g4Item('Which word is the opposite of "ancient" in "They studied an ancient settlement"?',"modern","ruined","distant","stone","Modern contrasts with ancient in time."),
  g4Item('Which word is the opposite of "expand" in "Heat can make the metal expand"?',"contract","melt","shine","weaken","Contract is the opposite change from expand."),
  g4Item('Which word is the opposite of "permit" in "The rules permit reusable bottles"?',"forbid","describe","provide","label","Forbid is the antonym of permit in rules."),
  g4Item('Which word is the opposite of "temporary" in "The road closure is temporary"?',"permanent","sudden","necessary","announced","Permanent contrasts with temporary duration."),
  g4Item('Which word is the opposite of "visible" in "The lighthouse was visible from shore"?',"hidden","bright","distant","tall","Hidden is the relevant opposite of visible."),
  g4Item('Which word is the opposite of "flexible" in "The flexible branch bent in the wind"?',"rigid","smooth","short","green","Rigid means not flexible or bendable."),
  g4Item('Which word is the opposite of "increase" in "Exercise can increase heart rate"?',"decrease","measure","maintain","record","Decrease is the direct antonym of increase."),
  g4Item('Which word is the opposite of "complex" in "The machine has a complex design"?',"simple","useful","modern","metal","Simple contrasts with complex design."),
  g4Item('Which word is the opposite of "accurate" in "The scale gave an accurate measurement"?',"incorrect","precise","numerical","repeated","An incorrect measurement is not accurate."),
  g4Item('Which phrase is the opposite of "voluntary" in "Joining the club is voluntary"?',"required","encouraged","enjoyable","scheduled","Required contrasts with something chosen voluntarily."),
  g4Item('Which word is the opposite of "preserve" in "The coating helps preserve the wood"?',"damage","cover","color","measure","Damage works against preserving the wood."),
  g4Item('Which word is the opposite of "transparent" in "The transparent sheet let us see through it"?',"opaque","thin","smooth","flexible","Opaque material does not let a viewer see through it."),
  g4Item('Which word is the opposite of "combine" in "Combine the two sets of data"?',"separate","compare","graph","interpret","Separate reverses the action of combining."),
  g4Item('Which word is the opposite of "objective" in "The report gave an objective account"?',"biased","detailed","formal","published","Biased contrasts with objective, fact-focused reporting."),
  g4Item('Which phrase is the opposite of "explicit" in "The rule was explicit"?',"only implied","clearly stated","strictly enforced","recently changed","An implied rule is not stated explicitly."),
  g4Item('Which word is the opposite of "converge" in "The paths converge near the lake"?',"diverge","curve","continue","narrow","Diverge means move apart, the opposite of converge."),
  g4Item('Which word is the opposite of "stabilize" in "Tree roots stabilize the soil"?',"destabilize","absorb","enrich","cover","Destabilize means make less stable, reversing stabilize."),
  g4Item('Which phrase is the opposite of "consistent" in "The measurements were consistent"?',"widely varying","carefully recorded","nearly exact","scientifically useful","Widely varying results contrast with consistent ones."),
  g4Item('Which word is the opposite of "mitigate" in "Planting grass can mitigate erosion"?',"worsen","measure","predict","observe","Mitigate means lessen, so worsen is its contextual opposite.")
]);

g4Register("eng","L7","4.3(B)","Use context to determine the relevant meaning of words and relationships among them",[
  g4Item('Complete the relationship: kitten is to cat as puppy is to ___.',"dog","cub","foal","calf","A kitten is a young cat, and a puppy is a young dog."),
  g4Item('Complete the relationship: page is to book as brick is to ___.',"wall","paper","clay","window","Pages form a book just as bricks can form a wall."),
  g4Item('Complete the relationship: whisper is to quiet as shout is to ___.',"loud","angry","fast","clear","A whisper is quiet; a shout is loud."),
  g4Item('Complete the relationship: thermometer is to temperature as ruler is to ___.',"length","weight","time","volume","A thermometer measures temperature; a ruler measures length."),
  g4Item('Complete the relationship: author is to book as composer is to ___.',"music","painting","theater","camera","An author creates a book; a composer creates music."),
  g4Item('Complete the relationship: bark is to tree as skin is to ___.',"animal","leaf","root","stone","Bark covers a tree; skin covers an animal."),
  g4Item('Complete the relationship: evaporate is to liquid as melt is to ___.',"solid","gas","energy","mixture","Liquid evaporates, while a solid melts."),
  g4Item('Complete the relationship: generous is to stingy as ancient is to ___.',"modern","historic","valuable","ruined","Generous/stingy and ancient/modern are antonym pairs."),
  g4Item('Complete the relationship: evidence supports a claim as details support a ___.',"central idea","caption","question","pronunciation","Evidence supports a claim; details support a central idea."),
  g4Item('Complete the relationship: producer is to make food as consumer is to ___.',"obtain energy by eating","break down all matter","create sunlight","make carbon dioxide only","The relationship compares each organism role with how it gets energy."),
  g4Item('Complete the relationship: chapter is part of a book as scene is part of a ___.',"play","poem","dictionary","diagram","A chapter is a book division; a scene is a play division."),
  g4Item('Complete the relationship: numerator is above the fraction bar as denominator is ___.',"below the fraction bar","equal to the whole number","always larger","beside the decimal","The two terms are related by their positions in fraction notation."),
  g4Item('Complete the relationship: cause leads to effect as problem leads to ___.',"solution","comparison","description","setting","Cause/effect and problem/solution are linked relationships."),
  g4Item('Complete the relationship: compass shows direction as scale shows ___.',"mass","distance north","temperature","elapsed time","A compass indicates direction; a scale measures mass."),
  g4Item('Complete the relationship: fact supports an argument as observation supports an ___.',"inference","opinion only","unrelated question","imaginary event","An inference must be supported by observations just as an argument uses facts."),
  g4Item('Complete the relationship: renewable describes a resource that can be replaced as nonrenewable describes one that ___.',"forms too slowly to replace quickly","can never be used","comes only from water","costs no money","The relationship contrasts rates of natural replacement."),
  g4Item('Complete the relationship: literal language states directly as figurative language ___.',"creates meaning through comparison or imagery","always gives a definition","lists facts in time order","avoids descriptive words","Literal and figurative language differ in how they communicate meaning."),
  g4Item('Complete the relationship: hypothesis is tested by evidence as claim is evaluated by ___.',"reasons and evidence","font size","speaker volume","sentence length","Both relationships connect an idea to the support used to judge it."),
  g4Item('Complete the relationship: parallel lines never meet as perpendicular lines meet at ___.',"right angles","acute angles only","several points","no point","The relationship distinguishes line pairs by whether and how they meet."),
  g4Item('Complete the relationship: conservation reduces resource use as recycling ___.',"turns used material into usable material","creates nonrenewable resources","ends every environmental impact","increases waste disposal","Each action manages resources, but recycling specifically processes used material for reuse.")
]);

g4Register("eng","L8","4.11(C)","Revise drafts to improve sentence structure and word choice for coherence and clarity",[
  g4Item('Choose the most precise verb: "The rabbit ___ into its burrow when the hawk appeared."',"darted","went","did","was","Darted precisely shows quick movement caused by danger."),
  g4Item('Choose the most precise verb: "Rainwater ___ through the crack in the roof."',"seeped","came","moved","got","Seeped precisely describes liquid passing slowly through a small opening."),
  g4Item('Choose the strongest adjective: "The ___ wind bent the young trees."',"fierce","nice","some","regular","Fierce precisely communicates the wind\'s force."),
  g4Item('Choose the clearest noun: "The scientist placed the sample under the ___."',"microscope","thing","equipment","object","Microscope names the exact tool used to magnify a sample."),
  g4Item('Revise "The bird made a sound" with the most precise verb.',"The bird chirped.","The bird did.","The bird was loud.","The bird made it.","Chirped replaces a vague phrase with a specific sound verb."),
  g4Item('Choose the most precise verb: "The exhausted runner ___ across the finish line."',"staggered","went","moved","arrived somehow","Staggered shows unsteady movement caused by exhaustion."),
  g4Item('Which revision makes the sentence clearest? "The machine stopped because it had a problem."',"The machine stopped because its motor overheated.","The machine stopped because of something.","The machine had a problem and stopped it.","There was a machine problem.","Naming the overheated motor replaces a vague problem with a precise cause."),
  g4Item('Choose the best transition: "The first trial failed. ___, the team adjusted the design and tried again."',"Therefore","Meanwhile","For example","Similarly","Therefore clearly signals that the adjustment resulted from the failure."),
  g4Item('Which revision removes repetition? "The cold ice felt cold in my hand."',"The ice felt frigid in my hand.","The cold ice felt very cold in my hand.","The ice was ice and cold.","Cold ice in my hand felt cold.","Frigid conveys the idea precisely without repeating cold."),
  g4Item('Which revision uses a more exact comparison? "The moon was like something bright."',"The moon gleamed like a silver coin.","The moon was bright like brightness.","The moon was very, very bright.","The moon was like a thing in the sky.","A silver coin creates a specific visual comparison."),
  g4Item('Choose the sentence with the clearest pronoun reference.',"When Maya handed the notebook to Lena, Lena put it away.","When Maya handed Lena the notebook, she put it away.","She handed it to her, and she put it away.","Maya gave her it because she wanted it away.","Repeating Lena removes uncertainty about who put away the notebook."),
  g4Item('Which revision best combines the ideas? "The bridge is old. The bridge remains strong."',"Although the bridge is old, it remains strong.","The bridge is old, the bridge remains strong.","Old bridge and it remains strong.","The bridge remains old because strong.","Although accurately shows the contrast and combines the ideas coherently."),
  g4Item('Choose the most accurate academic verb: "The graph ___ that rainfall increased in May."',"indicates","talks","feels","guesses","Indicates precisely describes information communicated by a graph."),
  g4Item('Which revision puts ideas in logical order?',"After measuring the water, we recorded the result and then compared it with yesterday\'s data.","We compared it, after the water, and measured yesterday.","Yesterday was data, then the result measured water.","We recorded before measuring and compared before recording.","The revision sequences measure, record, then compare."),
  g4Item('Which word best communicates uncertainty? "The tracks ___ belong to a fox, but more evidence is needed."',"may","certainly","always","must","May accurately shows that the conclusion is possible but not proven."),
  g4Item('Which revision best matches a formal science report?',"The solution changed from clear to cloudy after heating.","The stuff got kind of weird when it got hot.","It did a cloudy thing after we messed with it.","Heating was cool and the stuff changed.","The formal revision names the solution, observable change, and condition precisely."),
  g4Item('Which revision makes the cause-and-effect relationship clearest?',"Because the soil lacked roots, heavy rain carried it downhill.","The soil lacked roots, and there was rain and downhill.","Heavy rain was there; soil was also there.","Roots, soil, and rain happened downhill.","Because explicitly links lack of roots to erosion by rain."),
  g4Item('Which revision states the comparison most precisely?',"Solar energy is renewable, whereas coal forms too slowly to be replaced quickly.","Solar and coal are different things.","Solar is better and coal is bad.","Energy is energy, but some is not.","The revision identifies the exact difference in renewability."),
  g4Item('Which revision best preserves a neutral, evidence-based tone?',"The survey results suggest that most respondents prefer the first design.","Obviously, everyone loves the amazing first design.","The first design is definitely perfect.","Anyone sensible would choose design one.","Suggest and most accurately limit the claim to the survey evidence."),
  g4Item('Which revision is most coherent and concise?',"The wetland stores floodwater, filters pollutants, and provides wildlife habitat.","The wetland stores water from floods, and it also filters pollutants, and it additionally has habitat for wildlife too.","Wetlands do many things that are good in lots of ways.","Floodwater and pollutants and wildlife are about wetlands.","The parallel verbs communicate three related functions clearly and without needless repetition.")
]);

/* The reading banks use increasingly longer evidence and subtler inferences. */
g4Register("eng","L9","4.8(A)","Infer basic themes supported by text evidence",[
  g4Item('Lina practiced the flute each day and finally played the song correctly. What theme is supported?',"Practice leads to improvement","Music is easy for everyone","Mistakes should be hidden","Talent never changes","Daily practice followed by success supports persistence and improvement."),
  g4Item('Marco returned a wallet he found even though no one saw him pick it up. What theme is supported?',"Integrity matters even when no one is watching","Found objects belong to the finder","Money solves every problem","Rules matter only in public","Returning the wallet privately shows integrity."),
  g4Item('Two neighbors worked together to clear a fallen branch blocking their street. What theme is supported?',"Cooperation can solve shared problems","One person should do all difficult work","Storms always bring people together","Neighbors should avoid one another","Their combined effort solves a problem affecting both."),
  g4Item('After losing the first race, Tessa studied her start, trained differently, and improved. What theme is supported?',"Setbacks can teach useful lessons","Winning the first time is most important","Changing a plan shows weakness","Competition prevents learning","Tessa uses the loss as information for improvement."),
  g4Item('Devin speaks up when classmates exclude a new student and then invites the student to join. What theme is supported?',"Courage can help create belonging","New students prefer being alone","Friendship should be effortless","Speaking up always ends conflict","Devin takes a social risk to include someone."),
  g4Item('A gardener cares for a damaged sapling for months before it grows new leaves. What theme is supported?',"Patient care can bring gradual results","Nature repairs itself immediately","Damaged things should be replaced","Waiting requires no effort","Months of care before recovery supports patient persistence."),
  g4Item('Mei admits that she broke the model, then helps rebuild it. What theme is supported?',"Taking responsibility helps repair harm","Admitting mistakes makes them worse","A new model is always better","Accidents do not affect others","Admission plus repair shows responsible action."),
  g4Item('Although his first invention fails, Eli keeps the useful parts and redesigns the rest. What theme is supported?',"Failure can provide ideas for a better solution","A failed design has no value","Inventors should avoid changing plans","Useful work must be perfect","Eli learns from the failure and reuses what worked."),
  g4Item('Nadia wants the lead role but congratulates the student chosen and helps with costumes. What theme is supported?',"Grace means supporting others despite disappointment","Competition destroys friendship","Only leading roles matter","Feelings should never be expressed","Her supportive choice despite disappointment demonstrates grace."),
  g4Item('A village ignores a small leak in its dam until the damage becomes expensive to repair. What theme is supported?',"Small problems can grow when neglected","Large problems appear without warning","Repairs are always expensive","Villages should avoid dams","The ignored small leak directly grows into major damage."),
  g4Item('Ravi wins the science fair but thanks the classmates who tested his design and found flaws. What theme is supported?',"Success often depends on help and honest feedback","Winners should work alone","Criticism prevents achievement","Awards prove one person did everything","Ravi recognizes that feedback and collaboration contributed to success."),
  g4Item('Mara refuses a shortcut that would damage a trail, even though the safe route takes longer. What theme is supported?',"Convenience should not outweigh responsibility","The shortest path is always best","Rules exist to delay people","Nature quickly repairs all damage","She chooses stewardship over personal convenience."),
  g4Item('A boastful hare mocks a steady tortoise, stops trying, and loses the race. What theme is best supported?',"Overconfidence can undermine ability","Speed never helps in a race","Slow work is always superior","Resting is irresponsible","The hare has ability but loses because confidence replaces sustained effort."),
  g4Item('A ruler asks only advisers who agree with him, so he never learns that the bridge plan is unsafe. What theme is supported?',"Ignoring differing views can lead to poor decisions","Leaders should decide quickly","Bridges are difficult to design","Advisers cause most problems","The ruler\'s refusal to hear disagreement hides essential evidence."),
  g4Item('Jules shares her water early in a hike; later, another hiker shares a map when Jules is lost. What theme is supported?',"Generosity can strengthen a community of support","Every favor must be repaid immediately","Hiking is unsafe without a group","Maps are more useful than water","Mutual help at different times shows how generosity builds support."),
  g4Item('A character hides a poor grade and becomes increasingly anxious until telling the truth brings help. What theme is supported?',"Honesty can open the way to solutions","Grades determine a person\'s worth","Worry improves school performance","Problems disappear when hidden","The truth allows the character to receive help, while hiding increases the problem."),
  g4Item('Residents argue about a park design, but listening reveals that both sides value safety and access. They create a new plan meeting both needs. What theme is supported?',"Listening can reveal common ground","Disagreement means compromise is impossible","Every plan should remain unchanged","Safety matters more than access","Listening uncovers shared values that enable a joint solution."),
  g4Item('A traveler carries every possession up a steep hill, then realizes that keeping only what matters makes the journey possible. What theme is supported?',"Letting go can make progress possible","Possessions always prevent happiness","Travelers should never prepare","Difficult journeys require no supplies","The unnecessary load blocks progress until the traveler chooses essentials."),
  g4Item('A student copies a successful project design, earns praise, but cannot explain how it works. The original designer can revise hers because she understands each choice. What theme is supported?',"Understanding is more valuable than imitation","Praise proves mastery","Original designs never fail","Explanations matter only after success","The copied success is shallow, while understanding supports explanation and revision."),
  g4Item('A town cuts down shade trees to widen a road quickly. Years later, residents spend more money cooling buildings and managing runoff. What theme is supported?',"Short-term choices can create long-term costs","Roads should never be widened","Trees solve every city problem","Money can reverse every decision","The quick benefit produces later costs, supporting thoughtful long-term decision-making.")
]);

g4Register("eng","L10","4.8(A)","Infer basic themes supported by text evidence",[
  g4Item('Ana is afraid to speak, but she presents her idea and the class adopts it. What theme is supported?',"Courage means acting despite fear","Fear disappears before brave action","Good ideas always win","Speaking is easier than writing","Ana remains afraid yet acts, showing courage despite fear."),
  g4Item('Ben offers half his lunch to a classmate who forgot theirs. What theme is supported?',"Kindness responds to another person\'s need","Lunch should be divided equally","Forgetting has no consequences","Friends always share food","Ben notices and responds to a specific need."),
  g4Item('A family repairs their garden together after a storm. What theme is supported?',"Shared effort can restore what was damaged","Storms improve gardens","Families should avoid difficult tasks","Gardens repair themselves","Working together leads to restoration."),
  g4Item('Sofia keeps a promise to attend her friend\'s play even when another exciting invitation arrives. What theme is supported?',"Reliability may require giving up something appealing","Plays are better than parties","Promises should change with opportunities","Friends must like the same events","Sofia honors a commitment despite a tempting alternative."),
  g4Item('Noah listens to instructions twice before assembling the complicated model correctly. What theme is supported?',"Careful preparation prevents avoidable mistakes","Instructions make every task easy","Models should be built slowly","Listening twice guarantees success","His deliberate preparation supports accurate work."),
  g4Item('When the team\'s plan fails, Priya asks what each member noticed before suggesting a revision. What theme is supported?',"Good solutions can grow from listening to others","Leaders should make every choice alone","Failure proves a team lacks skill","Observations are less useful than guesses","Priya uses multiple observations to improve the plan."),
  g4Item('After receiving harsh criticism, Malik separates the useful advice from the unkind words and improves his essay. What theme is supported?',"Useful learning can be found in an unpleasant experience","All criticism should be accepted","Unkind words improve writing","Feelings should be ignored","Malik evaluates the criticism and applies only useful information."),
  g4Item('Ava spends her prize money immediately, while Luz saves part for a future goal. Months later, Luz can afford the art class she wanted. What theme is supported?',"Planning ahead can create future opportunities","Prize money should never be spent","Art classes cost too much","Saving always brings a reward","Luz\'s choice connects present planning with a later opportunity."),
  g4Item('A new player makes errors, but teammates explain the plays rather than blame her. Soon the whole team improves. What theme is supported?',"Support can turn mistakes into team growth","Errors should never be discussed","New players improve automatically","Winning depends on one person","Constructive support helps both the player and team improve."),
  g4Item('A child envies a neighbor\'s large garden until learning how many hours the neighbor works to maintain it. What theme is supported?',"Visible success may hide unseen effort","Gardens require too much work","Envy motivates people","Neighbors should share every result","Learning about the hidden work changes the child\'s understanding of success."),
  g4Item('Keira tells a funny story at the wrong moment, sees that her friend is upset, apologizes, and listens. What theme is supported?',"Empathy requires noticing and responding to others\' feelings","Humor causes friendship problems","Apologies erase every hurt","Friends should always agree","Keira changes her behavior after recognizing another person\'s feelings."),
  g4Item('A shopkeeper refuses to replace a faulty item and loses many customers who hear about it. What theme is supported?',"Unfair choices can damage trust beyond one moment","Customers should never complain","Businesses cannot correct mistakes","Rumors always destroy shops","One unfair response causes broader loss of trust."),
  g4Item('A musician practices only pieces she already plays well and is surprised when she stops improving. What theme is supported?',"Growth requires facing challenges","Practice prevents all mistakes","Musicians should perform more often","Easy work builds the most skill","Avoiding challenge keeps the musician from developing new skill."),
  g4Item('Residents each assume someone else will clean the shared courtyard, so trash piles up. What theme is supported?',"Shared spaces depend on individual responsibility","Cleaning is a professional job","Trash appears without cause","Groups make work impossible","The shared problem worsens because every individual avoids responsibility."),
  g4Item('An inventor guards every idea, while another exchanges ideas with peers and develops a stronger design. What theme is supported?',"Collaboration can improve individual ideas","Secrets are never useful","Peers deserve ownership of inventions","The first design must be weak","Exchanging perspectives helps strengthen the second design."),
  g4Item('During a drought, one farmer uses all the well water; the well runs dry before anyone\'s crops mature. What theme is supported?',"Using a shared resource selfishly can harm everyone","Farming always depletes wells","Crops should not grow in dry areas","Water belongs to the first user","Taking all the shared resource prevents any member, including the farmer, from succeeding."),
  g4Item('A judge likes one contestant\'s style but scores another higher because the evidence matches the stated rules. What theme is supported?',"Fair decisions follow evidence rather than preference","Rules prevent personal judgment","Style is unimportant","Judges should hide their opinions","The judge sets aside preference and applies the criteria."),
  g4Item('A student notices two sources disagree, checks who wrote them and what evidence they cite, then revises her report. What theme is supported?',"Questioning information can lead to stronger understanding","A report should use only one source","Disagreement proves both sources false","Revisions show poor planning","Evaluating source quality improves the student\'s conclusion."),
  g4Item('A character works for a prize but, while helping others, discovers that the shared work matters more to him than winning. What theme is supported?',"Purpose can change as experience changes understanding","Prizes always reduce effort","Helping others prevents success","Goals should never change","The character\'s experience changes what he values."),
  g4Item('A town preserves an old market despite the cost; years later it becomes both a gathering place and a source of local jobs. What theme is supported?',"Protecting community heritage can create future value","Old buildings are always profitable","Costs should never affect decisions","Markets matter more than homes","The long-term social and economic value grows from preserving shared heritage.")
]);

g4Register("eng","L11","4.8(A)","Infer basic themes supported by text evidence",[
  g4Item('Carlos studies after failing a quiz and improves. Which action best supports the theme "Mistakes can lead to growth"?',"He changes his study habits after the failure","He puts the quiz away","He compares scores with friends","He asks when the next quiz occurs","Changing his habits because of the mistake directly supports growth."),
  g4Item('Nia includes a classmate who is alone. Which action supports the theme "Belonging grows through invitation"?',"She asks the classmate to join the game","She notices the classmate from far away","She wins the game","She arrives early","The invitation creates an opportunity to belong."),
  g4Item('A character admits breaking a window. Which action supports the theme "Honesty requires courage"?',"He tells the truth before anyone discovers it","He sweeps up the glass","He avoids the room","He asks who owns the ball","Voluntarily telling a difficult truth demonstrates courage."),
  g4Item('Which action supports the theme "Patience can prevent careless errors"?',"Lena rereads every direction before beginning","Lena finishes first","Lena chooses a blue pen","Lena asks for a longer break","Rereading before acting is a patient step that prevents errors."),
  g4Item('Which action supports the theme "Generosity can inspire generosity"?',"After receiving help, Omar volunteers to help another student","Omar thanks the teacher","Omar completes his own work","Omar remembers the assignment","Omar passes forward the help he received."),
  g4Item('Which action supports the theme "Real confidence accepts feedback"?',"The dancer asks how to improve and tests the suggestion","The dancer ignores every comment","The dancer performs the easiest routine","The dancer lists past awards","Seeking and applying feedback shows secure confidence focused on growth."),
  g4Item('Which action supports the theme "Responsibility includes repairing harm"?',"Mia apologizes for the spill and helps replace the damaged paper","Mia says the spill was accidental","Mia leaves before cleanup","Mia promises to be careful someday","Repairing the damage goes beyond words and demonstrates responsibility."),
  g4Item('Which action supports the theme "Wise leaders listen before deciding"?',"The captain asks each teammate what they observed","The captain chooses the first idea","The captain speaks the longest","The captain waits for someone else to decide","Gathering information before a choice demonstrates thoughtful leadership."),
  g4Item('Which action supports the theme "Perseverance may require a new strategy"?',"After three failures, the builder changes the support design","The builder repeats the identical design","The builder hides the results","The builder lowers the goal","Changing strategy while continuing toward the goal is adaptive perseverance."),
  g4Item('Which action supports the theme "Respect can exist during disagreement"?',"Jada summarizes her opponent\'s point accurately before responding","Jada speaks more loudly","Jada refuses to change her view","Jada ends the discussion","Accurately representing an opposing view shows respect despite disagreement."),
  g4Item('A character wants recognition but gives credit to the whole group. Which theme does this action support?',"Integrity values truth above personal praise","Leaders should avoid praise","Groups always deserve awards","Recognition harms teamwork","Sharing accurate credit sacrifices personal attention for truth."),
  g4Item('A runner stops to help an injured competitor and loses the race. Which theme does the action support?',"Compassion can matter more than achievement","Races are unsafe","Helping guarantees friendship","Winning requires selfishness","The runner chooses another person\'s need over a desired result."),
  g4Item('A student deletes a dramatic claim after finding that no source supports it. Which theme does the action support?',"Accuracy is more important than impressing readers","Research makes writing less interesting","Claims should always be short","Sources cannot be trusted","Removing an unsupported claim prioritizes truth over effect."),
  g4Item('A queen disguises herself and visits villages before making a new law. Which theme does the action support?',"Understanding others requires seeking their experience","Leaders should travel often","Laws should be kept secret","Disguises solve political problems","The queen seeks direct knowledge of lives affected by her decision."),
  g4Item('A boy laughs when his plan works, then notices that it embarrassed his sister and changes it. Which theme is supported?',"Good intentions do not remove the need to consider impact","Jokes always cause harm","Plans should never change","Siblings misunderstand each other","He responds to the actual impact rather than defending his intent."),
  g4Item('A village restores a wetland instead of building immediately; later the wetland reduces flood damage. Which theme is supported?',"Protecting natural systems can protect communities","Construction always causes floods","Wetlands prevent every disaster","Waiting always produces success","The conservation choice later provides a community benefit."),
  g4Item('A scholar finds evidence that contradicts her favorite theory and publishes it anyway. Which theme is supported?',"Honest inquiry follows evidence, not preference","Theories are usually wrong","Publishing guarantees respect","Evidence ends every debate","She places evidence above attachment to her own idea."),
  g4Item('A wealthy character gives expensive gifts but never listens; a poor character offers time and attention. Which theme is supported?',"Care is measured by understanding, not price","Gifts have no value","Wealth prevents friendship","Listening solves every problem","The contrast shows meaningful care through attention rather than cost."),
  g4Item('A council delays a popular project after discovering it could harm drinking water. Which theme is supported?',"Responsible choices may be unpopular in the short term","Popular projects are dangerous","Delay always improves a plan","Councils should avoid public opinion","The council accepts immediate criticism to protect long-term well-being."),
  g4Item('A character achieves her goal by lying but loses the trust needed for her next goal. Which theme is supported?',"The method of success can shape its lasting value","Every lie is discovered immediately","Goals create dishonesty","Trust is easy to rebuild","The dishonest method creates consequences that weaken the achievement.")
]);

g4Register("eng","L12","4.8(A)","Infer basic themes supported by text evidence",[
  g4Item('Theme: "Practice builds skill." Which evidence best supports it?',"Inez rehearses daily and her timing improves","Inez buys a new music stand","The concert is on Friday","Her friend likes the song","Daily rehearsal tied to improvement directly supports the theme."),
  g4Item('Theme: "Honesty builds trust." Which evidence best supports it?',"After Ty admits his mistake, his partner asks him to keep the team records","Ty writes neatly","The team meets weekly","His partner owns a notebook","Being trusted with records after honesty shows trust growing."),
  g4Item('Theme: "Kindness can change a community." Which evidence best supports it?',"One student starts a welcome table, and soon others volunteer there","The cafeteria has ten tables","A teacher prints a sign","The school opens at eight","The initial kind act spreads into broader participation."),
  g4Item('Theme: "Preparation makes challenges manageable." Which evidence best supports it?',"Because Mei packed a map and water, she calmly handles a wrong turn","Mei likes hiking boots","The trail is six miles","Clouds appear at noon","Her preparation directly helps her manage the challenge."),
  g4Item('Theme: "Mistakes can teach." Which evidence best supports it?',"After the tower falls, Luis studies its weak base and rebuilds it","Luis uses wooden blocks","The tower is tall","His sister watches","Luis uses the failure as evidence for improvement."),
  g4Item('Theme: "Teamwork uses different strengths." Which evidence best supports it?',"Ari measures accurately while Bo explains the design clearly","Both students wear goggles","The project uses cardboard","They finish on Tuesday","Different strengths combine to help the shared project."),
  g4Item('Theme: "Fairness is not always sameness." Which evidence best supports it?',"Each runner receives the support needed to reach the same starting line","Every runner receives identical shoes","The race has one winner","All runners follow the route","Different support serving equal access illustrates fairness rather than identical treatment."),
  g4Item('Theme: "Listening can reduce conflict." Which evidence best supports it?',"After each side restates the other\'s concern, they agree on a shared rule","The meeting lasts an hour","Four people attend","The rule is printed","Restating concerns demonstrates listening and leads to agreement."),
  g4Item('Theme: "Shortcuts can create larger problems." Which evidence best supports it?',"Skipping the foundation saves a day but causes the wall to crack","The workers use bricks","The plan shows three rooms","A truck delivers sand","The saved day leads directly to more serious damage."),
  g4Item('Theme: "True friendship includes truthful feedback." Which evidence best supports it?',"Nora kindly explains why Sam\'s plan may fail and helps revise it","Nora attends Sam\'s game","Sam shares a snack","They live nearby","Honest, helpful criticism demonstrates care beyond simple agreement."),
  g4Item('Theme: "Power should be used responsibly." Which evidence best supports it?',"The captain applies the same safety rule to herself and the crew","The captain has the largest cabin","The ship travels quickly","The crew wears uniforms","Holding herself to the rule shows responsible rather than privileged use of authority."),
  g4Item('Theme: "Curiosity can challenge assumptions." Which evidence best supports it?',"Instead of accepting the rumor, Darius asks questions and finds a different explanation","Darius reads many books","The rumor spreads quickly","His notebook is full","Questioning uncovers evidence that changes an assumed explanation."),
  g4Item('Theme: "Belonging does not require hiding differences." Which evidence best supports it?',"The newcomer teaches the group a game from home, and it becomes a favorite","The newcomer learns everyone\'s names","The group meets after school","Games require rules","Sharing a difference strengthens, rather than prevents, belonging."),
  g4Item('Theme: "A good goal does not excuse harmful methods." Which evidence best supports it?',"Though the project raises money, the class stops it when it damages wildlife habitat","The class counts the money","The project has posters","Wildlife lives near school","The class rejects harm even though the desired goal is worthwhile."),
  g4Item('Theme: "Perspective changes understanding." Which evidence best supports it?',"After reading both diary entries, Lena sees why each friend felt betrayed","Lena owns a diary","The entries are dated","Both friends write in ink","Two viewpoints deepen Lena\'s understanding of the same conflict."),
  g4Item('Theme: "Tradition can adapt without losing its meaning." Which evidence best supports it?',"The festival moves indoors during rain but keeps the songs and shared meal","The festival is old","Rain lasts all day","The hall is large","The form changes while the meaningful elements remain."),
  g4Item('Theme: "Evidence can require us to revise beliefs." Which evidence best supports it?',"Jae expected shade plants to grow fastest, but changes his conclusion after measuring the data","Jae waters every pot","The plants have labels","The experiment lasts two weeks","Jae allows measured evidence to change his prediction."),
  g4Item('Theme: "Silence can support injustice." Which evidence best supports it?',"Because witnesses say nothing, the student who reported the bullying is blamed","The hallway is quiet","A teacher arrives late","The class changes rooms","The witnesses\' silence allows an unfair outcome to continue."),
  g4Item('Theme: "Progress may involve preserving what already works." Which evidence best supports it?',"The engineer redesigns the engine but keeps the reliable cooling system","The engine has metal parts","The design receives a number","The workshop is modern","The best solution combines change with a proven component."),
  g4Item('Theme: "Lasting solutions address causes, not only symptoms." Which evidence best supports it?',"The town cleans the river, then also stops the factory leak polluting it","Volunteers collect trash","The river crosses town","Fish live downstream","Stopping the leak addresses why pollution keeps returning.")
]);

g4Register("eng","L13","4.9(D)(i)","Recognize the central idea with supporting evidence in informational text",[
  g4Item('Bees carry pollen between flowers. This helps many plants make seeds and fruit. What is the central idea?',"Bees help flowering plants reproduce","Bees live in groups","Fruit contains seeds","Pollen is yellow","Both sentences focus on bees helping plant reproduction."),
  g4Item('Mangrove roots slow waves, trap soil, and provide shelter for young fish. What is the central idea?',"Mangrove roots benefit coastlines and wildlife","All roots grow underwater","Young fish eat mangrove leaves","Waves create mangroves","The listed functions support the broad benefit of mangrove roots."),
  g4Item('Public libraries lend books, offer internet access, and host free classes. What is the central idea?',"Libraries provide communities with many learning resources","Libraries contain only books","Internet access should be free","Classes are held at night","All details name different community learning resources."),
  g4Item('Desert plants may store water, grow deep roots, or have waxy leaves. What is the central idea?',"Desert plants have structures that help conserve or reach water","All desert plants look alike","Waxy leaves produce rain","Roots are the only useful plant part","Each detail describes a structure helping survival with little water."),
  g4Item('A compass shows direction, a map shows location, and a scale shows distance. What is the central idea?',"Different map tools provide different navigation information","Compasses are more useful than maps","Distance is measured in miles","Travelers should carry tools","The sentence explains distinct roles of navigation tools."),
  g4Item('When water freezes in cracks, it expands and can split rock. Repeated heating and cooling can also weaken rock. What is the central idea?',"Temperature changes can weather rock","All rocks freeze","Cracks prevent weathering","Heat always melts rock","Both examples connect temperature change to rock breakdown."),
  g4Item('Recycling aluminum uses less energy than making new aluminum from ore. It also reduces mining waste. What is the central idea?',"Recycling aluminum conserves energy and reduces waste","Aluminum is difficult to mine","Ore is a renewable resource","Mining produces useful soil","Both supporting details state environmental benefits of aluminum recycling."),
  g4Item('Texas contains deserts, forests, plains, wetlands, and coastline. These regions support different plants, animals, and human activities. What is the central idea?',"Texas has diverse regions that support varied life and activities","Texas is mostly desert","Every Texas region has a coastline","Human activity prevents wildlife","The details emphasize diversity of regions and what each supports."),
  g4Item('Early bicycles had no pedals. Later designs added pedals, chains, rubber tires, and gears. What is the central idea?',"Bicycle design changed through multiple improvements","The first bicycles were fastest","Rubber tires came before pedals","Modern bicycles need no chains","The sequence of added features supports design development over time."),
  g4Item('Trees shade buildings in summer, slow rainwater runoff, and remove some pollutants from air. What is the central idea?',"Urban trees provide several environmental benefits","Trees grow best near buildings","Rainwater harms every city","Shade is the only value of trees","The three details are distinct environmental benefits."),
  g4Item('A budget lists expected income and expenses. It can help a person plan spending, save for goals, and avoid running out of money. What is the central idea?',"A budget helps manage money intentionally","Income should always exceed expenses","Saving is the only purpose of a budget","Budgets guarantee wealth","All details explain how a budget supports money management."),
  g4Item('Coral reefs cover a small part of the ocean floor, yet they shelter many marine species and protect some shores from waves. What is the central idea?',"Coral reefs have great ecological importance despite their limited area","Coral reefs cover most oceans","Every shore has a coral reef","Waves create marine species","Yet signals the central contrast between small area and large importance."),
  g4Item('In a closed circuit, current travels from the energy source through conductors and back to the source. A break anywhere stops the flow. What is the central idea?',"A complete path is necessary for current to flow","Conductors create electrical energy","Current flows only away from a source","Breaks make circuits brighter","Both details explain why a circuit path must be closed."),
  g4Item('Unlike weather, which can change within hours, climate describes patterns measured over many years. What is the central idea?',"Weather and climate describe atmospheric conditions over different time spans","Weather and climate mean the same thing","Climate changes every hour","Weather can never form a pattern","The comparison centers on their different time scales."),
  g4Item('The printing press made books faster and cheaper to produce. As books spread, more people could exchange ideas and learn to read. What is the central idea?',"Cheaper book production expanded access to ideas and literacy","Printing presses were easy to build","Every printed book taught reading","Ideas existed only after printing","The cause-and-effect details link printing to wider communication and literacy."),
  g4Item('Some invasive plants grow rapidly, crowd out native plants, and change animal habitat. Removing them early can limit these effects. What is the central idea?',"Early control can reduce harm caused by invasive plants","Native plants always grow slowly","Animals eat all invasive plants","Removing plants restores every habitat immediately","The passage explains harm and why early response matters."),
  g4Item('Models can show systems too large, small, or slow to observe directly. However, a model leaves out details and should not be mistaken for the real system. What is the central idea?',"Models are useful representations with limitations","Models must include every real detail","Only large systems need models","Real systems behave exactly like models","Both usefulness and limitations are essential to the central idea."),
  g4Item('A town first added buses to reduce traffic. Ridership remained low until routes became more frequent and connected neighborhoods to job centers. What is the central idea?',"Transportation works better when service matches people\' needs","Buses always eliminate traffic","Frequent routes cost less","Neighborhoods should contain job centers","The result changes only when service design addresses rider needs."),
  g4Item('Scientists once classified whales as fish because both live in water. Evidence that whales breathe air, give birth, and nurse young led to classifying them as mammals. What is the central idea?',"Classification can change when stronger evidence reveals important traits","Whales changed from fish into mammals","Living in water is never useful evidence","All mammals live in oceans","The passage shows evidence revising a scientific classification."),
  g4Item('A wetland restoration initially displaced a parking area, but later reduced flooding, improved water quality, and attracted visitors. What is the central idea?',"Long-term restoration benefits can outweigh an initial tradeoff","Parking areas cause every flood","Visitors prefer wetlands to cities","Restoration has no costs","But marks the initial tradeoff before multiple later benefits.")
]);

g4Register("eng","L14","4.9(D)(i)","Recognize the central idea with supporting evidence in informational text",[
  g4Item('Central idea: Owls are effective nighttime hunters. Which detail best supports it?',"Their large eyes gather light, and soft feathers quiet their flight","Owls build nests in many places","Some owls have brown feathers","Owls appear in folktales","Light-gathering eyes and silent flight directly support nighttime hunting."),
  g4Item('Central idea: Roots help plants survive. Which detail best supports it?',"Roots absorb water and anchor the plant in soil","Flowers may attract pollinators","Leaves can be different shapes","Seeds grow into new plants","Water absorption and anchoring are root functions tied to survival."),
  g4Item('Central idea: Exercise benefits the body. Which detail best supports it?',"Regular movement strengthens the heart and muscles","Many sports use a ball","People exercise indoors and outdoors","Shoes come in many sizes","Stronger heart and muscles are direct bodily benefits."),
  g4Item('Central idea: Maps communicate information with symbols. Which detail best supports it?',"A blue line may represent a river, while a star marks a capital","Maps can be folded","Some maps are old","Travelers carry maps","Specific symbols representing features directly support the central idea."),
  g4Item('Central idea: Composting returns useful matter to soil. Which detail best supports it?',"Decomposers break food scraps into nutrient-rich material","Compost bins may be made of plastic","Gardens need sunlight","Some scraps smell strong","Breaking scraps into soil nutrients describes matter returning to soil."),
  g4Item('Central idea: Friction can be helpful or harmful. Which detail best supports both parts?',"It lets shoes grip the ground but also wears down their soles","Friction occurs when surfaces interact","Rough surfaces create friction","Shoes protect feet","The single detail gives one benefit and one drawback."),
  g4Item('Central idea: Saving water requires attention to everyday choices. Which detail best supports it?',"Fixing a dripping faucet and turning off water while brushing prevent waste","Fresh water exists in lakes","Rain fills reservoirs","Water bills arrive monthly","The actions are everyday choices that directly conserve water."),
  g4Item('Central idea: A habitat must meet several organism needs. Which detail best supports it?',"A suitable habitat provides food, water, shelter, and space","Habitats can be large or small","Many animals move","Plants need sunlight","The detail lists the multiple needs a habitat must meet."),
  g4Item('Central idea: Reliable investigations control conditions. Which detail best supports it?',"A plant test changes light exposure while keeping soil, water, and pot size the same","The plants are labeled A and B","Data are written in a notebook","Leaves are measured in centimeters","Keeping other conditions the same isolates the tested variable."),
  g4Item('Central idea: Local governments provide community services. Which detail best supports it?',"City departments maintain roads, collect waste, and operate parks","A mayor gives speeches","People live within city limits","Elections occur on scheduled dates","The examples are concrete community services provided locally."),
  g4Item('Central idea: Sound transfers energy. Which detail best supports it?',"A vibrating speaker can make nearby grains of rice move","Speakers may be round","Music has rhythm","Rice is a solid","Movement caused by sound vibration is evidence of energy transfer."),
  g4Item('Central idea: Erosion and deposition are connected processes. Which detail best supports it?',"A river removes sediment from one bank and drops it where the current slows","River water flows downhill","Sediment includes small rock pieces","Banks border a river","The same sediment is transported by erosion and placed by deposition."),
  g4Item('Central idea: An author uses structure to support purpose. Which detail best supports it?',"A safety article uses numbered steps so readers can follow the procedure","The article has a title","The author researched safety","The page has margins","Numbered procedural structure directly helps readers complete the author\'s intended task."),
  g4Item('Central idea: A healthy ecosystem depends on interrelated roles. Which detail best supports it?',"Producers store energy, consumers transfer it, and decomposers return matter","Ecosystems have boundaries","Organisms vary in size","Sunlight warms soil","The roles work together in energy flow and matter cycling."),
  g4Item('Central idea: Renewable energy choices involve tradeoffs. Which detail best supports it?',"Wind power produces no fuel pollution during use, but output changes with wind speed","Wind is moving air","Turbines have blades","Electricity powers devices","The detail includes both an advantage and a limitation."),
  g4Item('Central idea: Source credibility depends on more than appearance. Which detail best supports it?',"A polished website may still make claims without naming evidence or authors","Websites use fonts","Some experts write online","Pictures attract readers","The detail contrasts professional appearance with missing evidence and authorship."),
  g4Item('Central idea: Adaptation of a plan can preserve its goal. Which detail best supports it?',"When rain cancels the outdoor fair, organizers move activities inside and still raise funds","The fair was planned in spring","Many people check the forecast","Indoor rooms have lights","Changing location preserves the fundraising goal."),
  g4Item('Central idea: Historical accounts reflect perspective. Which detail best supports it?',"Two diaries describe the same strike differently because one writer owned the factory and one worked there","Both diaries include dates","The strike lasted a week","The factory made cloth","Different social positions explain the contrasting descriptions."),
  g4Item('Central idea: Data can reveal a pattern without proving its cause. Which detail best supports it?',"Plant growth and temperature rose together, but water and sunlight also changed","The plants were measured weekly","A table contains numbers","Temperature is measured in degrees","Other changing variables prevent the pattern alone from proving causation."),
  g4Item('Central idea: Effective solutions consider the whole system. Which detail best supports it?',"Widening one road moved the traffic jam to the next intersection, so planners revised signal timing too","The road has four lanes","Traffic is busiest at five","Engineers use maps","The first change shifts rather than solves the problem until another system part is considered.")
]);

g4Register("eng","L15","4.10(A)","Explain the author's purpose and message within a text",[
  g4Item('A poster lists steps for washing hands safely. What is the author\'s main purpose?',"To instruct","To entertain","To persuade voters","To tell a personal story","Numbered safety steps are written to instruct readers."),
  g4Item('A story describes a dragon who loses every sock in a humorous way. What is the author\'s main purpose?',"To entertain","To report research","To explain a law","To give directions","A humorous fictional story is primarily meant to entertain."),
  g4Item('An article explains how clouds form using facts and diagrams. What is the author\'s main purpose?',"To inform","To sell a product","To entertain with fiction","To request help","Facts and diagrams explaining a process indicate an informative purpose."),
  g4Item('A letter asks the principal to add bicycle racks and gives three reasons. What is the author\'s main purpose?',"To persuade","To narrate","To define a word","To describe a character","A request supported by reasons aims to persuade."),
  g4Item('A biography recounts challenges an inventor faced and how she solved them. What is the author\'s main purpose?',"To inform readers about the inventor\'s life","To teach readers to build the invention","To sell the invention","To criticize all inventors","A biography informs through events from a person\'s life."),
  g4Item('A park sign says, "Stay on marked trails to protect nesting birds." What purpose is most important?',"To influence safe, protective behavior","To entertain hikers","To describe every bird","To advertise the park","The command and reason aim to change visitor behavior."),
  g4Item('A poem compares falling leaves to tiny boats drifting through air. What purpose does the comparison serve?',"To create a vivid image","To provide exact measurements","To prove a scientific claim","To list directions","The figurative comparison helps readers visualize movement."),
  g4Item('A review describes a game\'s strengths and weaknesses before recommending it for families. What is the author\'s purpose?',"To evaluate and recommend","To give game rules only","To narrate a true event","To define family","The author judges features in order to guide a choice."),
  g4Item('An editorial argues that recess should be longer and cites health research. What is the purpose?',"To persuade readers using evidence","To summarize a fictional plot","To entertain with jokes","To announce a schedule without opinion","A claim supported by research is designed to persuade."),
  g4Item('A news report gives verified details about a flood without stating whether officials acted wisely. What is the purpose?',"To inform with a neutral account","To praise officials","To frighten readers","To teach swimming","Verified details without judgment indicate neutral reporting."),
  g4Item('A manual uses warnings in bold before instructions. Why did the author use bold print?',"To draw attention to safety information","To make the page decorative","To hide difficult steps","To prove the tool works","Bold print emphasizes information readers must notice for safety."),
  g4Item('An author opens an article about food waste with a short story about one cafeteria tray, then gives national data. Why include the story?',"To make the large issue concrete and relatable","To replace the need for evidence","To prove every cafeteria wastes equally","To entertain without informing","The anecdote connects an individual experience to the broader data."),
  g4Item('A conservation article compares two towns, one that restored wetlands and one that did not. Why use this structure?',"To show differences in the outcomes of two choices","To list events by date","To define every scientific term","To conceal the author\'s message","The comparison highlights consequences of different decisions."),
  g4Item('A speech repeats "We can begin today" after each proposed action. What purpose does repetition serve?',"To emphasize urgency and possibility","To add unrelated details","To show events happened in the past","To weaken the call to action","Repeating the phrase reinforces the speaker\'s motivating message."),
  g4Item('An article explains benefits of solar panels but also discusses cost and cloudy days. What is the likely purpose?',"To provide a balanced evaluation","To advertise solar panels without limits","To argue energy is unnecessary","To entertain through conflict","Including both benefits and limitations signals balanced evaluation."),
  g4Item('A historical narrative follows one child during a migration rather than listing only dates. What purpose does that choice serve?',"To help readers understand the human experience of the event","To prove the child caused the migration","To provide a complete population count","To give travel instructions","An individual viewpoint makes a large event personally understandable."),
  g4Item('A writer describes a policy as a "bridge" between competing groups. What purpose does the metaphor serve?',"To frame the policy as a way to connect differences","To claim the policy is made of stone","To provide the policy\'s location","To show the groups crossed a river","Bridge figuratively emphasizes connection."),
  g4Item('An argumentative article places its strongest evidence immediately after stating the claim. Why?',"To establish support before addressing objections","To make the conclusion unnecessary","To change the subject","To hide the author\'s position","Strong early evidence grounds the claim for later reasoning."),
  g4Item('A public notice translates key instructions into several languages. How does this choice support the author\'s purpose?',"It makes the instructions accessible to more of the intended audience","It proves one language is easiest","It shortens the notice","It changes the safety rules","Multiple translations help the notice inform the full community."),
  g4Item('An essay ends by returning to the question asked in its opening and answering it with the evidence presented. Why?',"To create closure and reinforce the message","To introduce a new unrelated topic","To make the evidence seem uncertain","To avoid stating a conclusion","Returning to the opening question unifies the structure and clarifies the conclusion.")
]);

g4Register("eng","L16","4.10(E)","Identify and understand the use of first- or third-person point of view",[
  g4Item('"I tucked the map into my pocket." Which point of view is used?',"First person","Third person","Second person","No narrator","The pronoun I signals first-person narration."),
  g4Item('"She tucked the map into her pocket." Which point of view is used?',"Third person","First person","Second person","A speaker in dialogue","The narrator refers to the character as she, signaling third person."),
  g4Item('Which sentence uses first-person point of view?',"We hurried toward the shelter.","They hurried toward the shelter.","Maya hurried toward the shelter.","The hikers hurried toward the shelter.","We includes the narrator as a participant."),
  g4Item('Which sentence uses third-person point of view?',"Jon wondered whether the gate was locked.","I wondered whether the gate was locked.","We wondered about the gate.",'I asked, "Is it locked?"',"Jon is named from outside the action, so the narration is third person."),
  g4Item('"I could hear the crowd, but I did not know why it cheered." What can the narrator know directly?',"The narrator\'s own thoughts and senses","Every spectator\'s private thoughts","Events in places the narrator cannot see","The future result","A first-person narrator directly reports personal experience, not every mind or unseen event."),
  g4Item('"Amira feared the storm, although Leo believed it would pass quickly." What does the narrator reveal?',"The thoughts of more than one character","Only the narrator\'s feelings","No character\'s thoughts","Directions to the reader","The third-person narrator provides two characters\' beliefs."),
  g4Item('How would changing "I opened the mysterious letter" to "Niko opened the mysterious letter" affect point of view?',"It changes first person to third person","It changes third person to first person","It changes the event itself","It removes the narrator","I is first person; naming Niko from outside is third person."),
  g4Item('A first-person narrator says, "I knew Tia was lying." Why should a reader remain cautious?',"The narrator may be interpreting rather than knowing Tia\'s thoughts","First-person narrators cannot describe speech","Tia is always truthful","The sentence has no point of view","A participant can make an inference that may be biased or mistaken."),
  g4Item('Passage A says, "I hated the crowded market." Passage B says, "The market buzzed with lively conversation." How do viewpoints differ?',"A expresses personal dislike; B gives a more positive outside description","Both dislike the market","Both are first person","B proves the market was safe","The first-person opinion contrasts with the positive third-person description."),
  g4Item('Why might an author use first person for a survival story?',"To place readers close to one person\'s immediate experience","To reveal every character\'s thoughts equally","To remove all emotion","To guarantee the narrator is correct","First person creates closeness but limits information to the narrator\'s perspective."),
  g4Item('"Rosa smiled at the result, unaware that her brother had changed the labels." What advantage does third person provide?',"The reader knows something Rosa does not","Rosa tells her own thoughts directly","The reader receives no outside information","The brother becomes the narrator","The narrator can reveal an event outside Rosa\'s awareness."),
  g4Item('Two characters describe the same rainy day: one farmer calls it a relief; one traveler calls it a delay. What shapes their viewpoints?',"Their different needs and experiences","The amount of rain must be different","Only one can be truthful","Point of view changes the weather","Each character interprets the same event according to personal circumstances."),
  g4Item('A narrator says, "Of course, my plan was the only sensible one." What does this wording reveal?',"The narrator may be biased toward the narrator\'s own idea","The plan is proven best","The story uses third-person omniscient narration","No opinion is expressed","Of course and only sensible show subjective confidence, not proof."),
  g4Item('Which revision keeps third-person point of view consistent?',"Lena opened the box and wondered why it was empty.","Lena opened the box, and I wondered why it was empty.","I opened Lena\'s box, and she is me.","You open the box while Lena wondered.","Lena and it keep the narration in third person."),
  g4Item('A first-person account leaves out what happened in a closed meeting. What is the best explanation?',"The narrator was not present and cannot directly report it","The meeting had no events","First person cannot describe places","The author forgot the plot","First-person knowledge is limited to what the narrator experiences or later learns."),
  g4Item('How can two reliable first-person narrators give different accounts of one event?',"Each noticed and interpreted different details","At least one must be lying","Point of view cannot affect an account","Reliable narrators remember everything identically","Perspective affects attention and meaning even without dishonesty."),
  g4Item('A third-person narrator reports only Mara\'s thoughts but not anyone else\'s. What effect does this create?',"Readers stay close to Mara while still seeing her from outside","Readers know every character equally","Mara narrates using I","The story has no perspective","Limited third person centers one character without using first-person pronouns."),
  g4Item('In one chapter, a conflict is told by the team captain; in the next, by a new player. Why alternate viewpoints?',"To reveal how roles shape different interpretations","To prove one character is wrong","To repeat identical information","To remove tension from the conflict","Alternating perspectives can expose information and assumptions unique to each role."),
  g4Item('A narrator confidently predicts another character will fail, but that character succeeds. What may this reveal?',"The narrator\'s judgment was limited or biased","The point of view changed to second person","The success did not occur","The author made all narration false","The contrast reveals a limitation in the narrator\'s understanding."),
  g4Item('A historical event is presented through a child\'s diary and an official report. What should a reader compare?',"How personal experience and institutional purpose shape selected details","Which source uses more words","Whether both use first person","Which paper looks older","Each source\'s point of view and purpose influence what it emphasizes.")
]);

g4Register("eng","L17","4.6(F)","Make inferences and use evidence to support understanding",[
  g4Item('The sidewalk is wet and people close umbrellas. What most likely caused the wet sidewalk?',"Rain recently fell","The temperature dropped","A parade passed","The road was repaired","Umbrellas and wet pavement together support recent rain."),
  g4Item('Lena forgot to water a plant for two weeks; its leaves drooped. What caused the drooping?',"Lack of water","Too much fertilizer","A larger pot","Bright flowers","The missed watering directly explains loss of plant firmness."),
  g4Item('A ball rolls farther on tile than carpet. What likely causes the difference?',"Carpet creates more friction","Tile has stronger gravity","The ball changes mass","Carpet pulls the ball forward","Greater friction on carpet slows the ball sooner."),
  g4Item('The circuit\'s bulb goes out when one wire is removed. What caused the bulb to go out?',"The electrical path became open","The bulb became an insulator","The battery gained energy","The wire became magnetic","Removing a wire breaks the closed path required for current."),
  g4Item('After trees were removed from a slope, more soil washed into the creek. What is the best supported cause?',"Fewer roots held the soil in place","The creek stopped flowing","Soil became heavier","Rain became warmer","Tree roots stabilize soil; removing them increases erosion."),
  g4Item('A metal spoon in hot soup becomes warm, while a wooden spoon stays cooler. What causes the difference?',"Metal conducts thermal energy better","Wood produces cold energy","Soup heats only shiny objects","The metal spoon is heavier","Different conductivity explains the observed temperature change."),
  g4Item('The school added clearly labeled recycling bins, and the amount of recyclable material in trash decreased. What inference is supported?',"Clear labels helped people sort waste","Students produced no waste","Trash pickup became less frequent","Every person recycled perfectly","The change follows an intervention designed to make sorting easier."),
  g4Item('A town receives the same rain, but flooding worsens after fields are paved. What likely contributes to flooding?',"Less water can soak into the ground","Pavement increases rainfall","Fields used too much sunlight","Floodwater becomes heavier","Pavement reduces infiltration, increasing surface runoff."),
  g4Item('Seeds under blue light and white light grew equally; seeds in darkness did not. Which inference is supported?',"Light availability mattered more than light color in this test","Blue light always increases growth","Darkness made the seeds colder","White light contains no energy","Both light groups grew while the no-light group did not."),
  g4Item('Readers learn that a character checks the clock repeatedly and repacks her bag twice. What can they infer?',"She is anxious or eager about leaving","She cannot read a clock","She dislikes the bag","She has forgotten the destination","Repeated checking and repacking are behavioral evidence of anticipation or anxiety."),
  g4Item('A river deposits more sediment where it widens and slows. What cause-and-effect inference is supported?',"Slower water carries less sediment","Wide rivers contain no current","Sediment makes rivers widen instantly","Fast water always deposits more","Reduced water speed lowers its ability to transport sediment."),
  g4Item('Four plants receive equal water. The two by a window grow toward it. What inference is best supported?',"The plants respond to the direction of light","Window glass feeds plants","Water moves toward windows","Only two plants have roots","Equal water plus directional growth points to light direction."),
  g4Item('A student\'s first three measurements vary widely, but later measurements agree after the scale is leveled. What likely caused the early variation?',"An uneven scale introduced measurement error","The object changed mass repeatedly","Later data were copied","Level scales measure time","Agreement after leveling supports the scale position as the source of error."),
  g4Item('A bird species nests earlier during several unusually warm springs. Which conclusion is supported without overstating cause?',"Earlier nesting is associated with warmer spring conditions","Warmth definitely causes all birds to nest","The species will always nest early","Nest timing controls spring temperature","The repeated pattern supports association, but not an absolute universal cause."),
  g4Item('A character praises a plan aloud but quietly removes her name from it. What can a reader infer?',"Her public words may not match her private judgment","She forgot her name","She fully supports the plan","The plan has already succeeded","Removing her name conflicts with her praise and suggests doubt."),
  g4Item('A pond has fewer insects after pesticide use nearby, followed by fewer frogs. What causal chain is most plausible?',"Pesticide reduced insect prey, which reduced food for frogs","Frogs caused farmers to use pesticide","Fewer frogs created the pesticide","Insects left because frogs disappeared first","The sequence and food relationship support an indirect effect through prey loss."),
  g4Item('A city plants trees and temperatures fall on shaded blocks but not similar unshaded blocks. What inference is strongest?',"Tree shade likely contributed to lower local temperatures","Trees lowered the entire city\'s climate","Temperature caused the trees to be planted","Every shaded place has trees","The comparison between similar blocks isolates shade as a likely contributor."),
  g4Item('An article cites only successful examples of a program and omits data from places where it failed. What can a reader infer?',"The evidence may present a one-sided view","The program succeeds everywhere","Failure data are never useful","Examples are stronger than complete data","Selecting only favorable cases limits the fairness of the conclusion."),
  g4Item('Two groups use the same method, but one records temperature in sunlight and one in shade. Their results differ. What is the best inference?',"Different measurement conditions may explain the difference","One group must have invented its data","Temperature has no pattern","The method guarantees identical results","Sun and shade are uncontrolled conditions that can affect temperature."),
  g4Item('A policy reduces plastic bag use but increases purchases of thicker trash bags. What inference best reflects the evidence?',"The policy had an intended effect and an additional unintended effect","The policy completely eliminated plastic waste","Thicker bags caused the policy","Plastic use cannot be measured","Both outcomes must be considered to evaluate the policy fully.")
]);

g4Register("eng","L18","4.8(C)","Analyze plot elements, including rising action, climax, falling action, and resolution",[
  g4Item('Events: 1 Plant seed. 2 Water soil. 3 Sprout appears. Which event comes last?',"A sprout appears","Plant the seed","Water the soil","Choose the pot","Growth follows planting and watering."),
  g4Item('Which sequence is logical for mailing a letter?',"Write it, address the envelope, add postage, mail it","Mail it, write it, add postage, address it","Add postage, receive it, write it, mail it","Address it, mail it, write it, open it","The letter must be written and prepared before mailing."),
  g4Item('A story begins when a dog escapes. What event most likely belongs in the rising action?',"The family follows pawprints through the park","The dog is safely home and the gate is repaired","The author introduces the family before the escape","The family explains the lesson years later","Following clues builds the central conflict toward its turning point."),
  g4Item('In a story about a lost key, which event is most likely the climax?',"Maya realizes the key is inside the locked greenhouse","Maya is introduced as careful","Maya searches her backpack","Maya later labels a spare key","The realization at the most tense moment is the climax."),
  g4Item('After the hero stops the runaway cart, villagers gather the scattered supplies. Which plot stage is this?',"Falling action","Exposition","Rising action","Climax","The main danger is over; cleanup follows the climax."),
  g4Item('A conflict ends when two friends apologize and agree on a fair schedule. Which plot element is this?',"Resolution","Exposition","Rising action","Setting","The agreement resolves the story\'s main conflict."),
  g4Item('Order these plot events: A bridge rope snaps; travelers argue about turning back; they combine supplies to repair it; they cross safely. Which is the climax?',"They combine supplies to repair the bridge","The rope snaps","They argue about turning back","They cross safely","Repairing the bridge is the decisive action that resolves the danger."),
  g4Item('Why does an author place several failed attempts before the successful one?',"To build rising action and increase tension","To reveal the setting only","To end the conflict early","To remove the need for a climax","Obstacles escalate the conflict before its turning point."),
  g4Item('Which event best belongs in the exposition of a mystery?',"The narrator introduces the museum and its missing jewel exhibit","The detective identifies the thief","The thief returns the jewel","The police explain the sentence","Exposition establishes setting, characters, and the situation."),
  g4Item('A storm approaches, the power fails, and water enters the cabin. How do these events function?',"They form rising action by escalating the problem","They resolve the conflict","They provide only historical setting","They are all falling action","Each event increases difficulty and tension."),
  g4Item('The climax occurs when Niko must choose between winning and warning another racer of danger. Why is it the climax?',"It is the decisive moment of greatest conflict","It is the first description of Niko","It explains what happens years later","It introduces the race location","The choice forces the central internal and external conflict to a turning point."),
  g4Item('Which event is falling action after a debate team wins the final vote?',"Members thank their coach and pack their materials","The team discovers the debate topic","A speaker forgets her evidence","The final speaker gives a rebuttal","Thanking and packing occur after the decisive result."),
  g4Item('A story resolves when the community rebuilds a playground using a plan created during the conflict. What makes this a strong resolution?',"It shows how characters applied what they learned","It introduces a new unrelated villain","It repeats the opening without change","It leaves the central problem untouched","The action closes the conflict and demonstrates character growth."),
  g4Item('A flashback reveals why a character fears deep water. Where could it be placed most effectively?',"Before the character must decide whether to enter the river","After every conflict is completely resolved","Before any character is introduced and without context","Only in the title","Placed before the decision, the past experience clarifies motivation and raises tension."),
  g4Item('If the climax is removed from a story, what is most likely weakened?',"The turning point that determines the conflict\'s outcome","The names of characters","The physical setting","The spelling of dialogue","The climax is the decisive plot turn."),
  g4Item('A story alternates between rescuers approaching a cave and trapped hikers losing light. What effect does this sequence create?',"It builds tension by showing two connected timelines converging","It resolves the danger immediately","It proves the narrators disagree","It removes cause and effect","Alternating progress and dwindling light intensifies anticipation."),
  g4Item('The resolution shows the rival helping repair the damage he caused. What character change does this event confirm?',"He has moved from competition toward responsibility","He has become more skilled at causing damage","He still refuses all cooperation","He was never involved in the conflict","Repairing harm provides evidence of changed values."),
  g4Item('An author ends immediately after the climax, before showing consequences. What may readers lack?',"Falling action and evidence of how the conflict changed characters","An initial setting","The central conflict","Any moment of tension","Consequences after the turning point normally appear in falling action and resolution."),
  g4Item('A subplot about conserving water provides the tool used to stop a final fire. How does the subplot affect the main plot?',"It supplies earlier knowledge that becomes important at the climax","It distracts without any connection","It serves only as exposition","It changes the story to first person","The subplot prepares a skill or resource later used in the decisive moment."),
  g4Item('The opening shows a cracked dam ignored; later failures grow, and at the climax the town must evacuate. How does the sequence support meaning?',"It shows how neglecting a small problem can cause escalating consequences","It proves cracks repair themselves","It places the resolution before the conflict","It makes the setting unimportant","The ordered escalation develops a cause-and-effect message through plot.")
]);

g4Register("eng","L19","4.3(D)","Identify, use, and explain the meaning of homophones",[
  g4Item('Choose the correct homophone: "Please ___ your name at the top."',"write","right","rite","wright","Write means form words on a surface."),
  g4Item('Choose the correct homophone: "The dog wagged ___ tail."',"its","it\'s","its'","itts","Its is the possessive form; it\'s means it is."),
  g4Item('Choose the correct homophone: "We could ___ the music from outside."',"hear","here","heer","hare","Hear means perceive sound."),
  g4Item('Choose the correct homophone: "The sailboat crossed the ___."',"sea","see","cee","seam","Sea means a large body of salt water."),
  g4Item('Choose the correct homophone: "The knight rode a black ___."',"horse","hoarse","hors","whores","Horse names the animal; hoarse describes a rough voice."),
  g4Item('Choose the correct homophone: "The baker added wheat ___."',"flour","flower","floor","flare","Flour is the ground grain used in baking."),
  g4Item('Choose the correct homophone: "The storm ___ several branches down."',"blew","blue","blu","bloo","Blew is the past tense of blow; blue is a color."),
  g4Item('Choose the correct homophone: "The hikers followed the forest ___."',"trail","trial","trale","trill","Trail is a path; trial is a test or court proceeding."),
  g4Item('Choose the correct homophone: "The team celebrated ___ victory."',"their","there","they\'re","theirs'","Their shows possession by the team."),
  g4Item('Choose the correct homophone: "The dog buried ___ bone near the fence."',"its","it\'s","their","there","Its shows that the bone belongs to the dog."),
  g4Item('Choose the correct homophone: "The heavy rain did not ___ our plans."',"alter","altar","all-ter","author","Alter means change; altar is a ceremonial table."),
  g4Item('Choose the correct homophone: "The climber began the steep ___."',"ascent","assent","accent","asset","Ascent means an upward climb; assent means agreement."),
  g4Item('Choose the correct homophone: "The dog tracked the rabbit by its ___."',"scent","sent","cent","sense","Scent means smell; sent is past tense of send."),
  g4Item('Choose the correct homophone: "The committee will ___ the new member tomorrow."',"induct","indicted","indict","induced","Induct means formally admit; indict relates to a criminal charge."),
  g4Item('Choose the correct homophone: "Please ___ the source in your report."',"cite","site","sight","sitte","Cite means name a source; site means location and sight means vision."),
  g4Item('Choose the correct homophone: "The queen began her long ___."',"reign","rain","rein","ran","Reign is a period of rule; rain is weather and rein is a strap."),
  g4Item('Choose the correct homophone: "The rider tightened the horse\'s ___."',"rein","reign","rain","wren","A rein is a strap used to guide a horse."),
  g4Item('Choose the correct homophone: "The council voted to ___ the old rule."',"repeal","repel","repeel","repair","Repeal means officially cancel a law; repel means drive away."),
  g4Item('Choose the correct homophone: "The scientist used a neutral substance to ___ the acid\'s effect."',"counteract","counter attack","countered","contract","Counteract means act against an effect; the other choices do not fit the grammar or meaning."),
  g4Item('Which sentence correctly uses all three homophones?',"They\'re putting their bags over there.","Their putting they\'re bags over there.","There putting their bags over they\'re.","They\'re putting there bags over their.","They\'re means they are, their shows possession, and there indicates place.")
]);

g4Register("eng","L20","4.11(D)(i)","Edit complete simple and compound sentences for subject-verb agreement and avoid splices, run-ons, and fragments",[
  g4Item('Which is a complete sentence?',"The robin built a nest.","Under the porch.","Because the rain stopped.","Running toward home.","The correct choice has a subject and a complete predicate."),
  g4Item('Which fragment needs a main clause?',"After the final bell.","The final bell rang.","Students packed their bags.","We walked home together.","After the final bell is a dependent phrase, not a complete thought."),
  g4Item('Choose the sentence with correct subject-verb agreement.',"The basket of apples is heavy.","The basket of apples are heavy.","The apples in the basket is heavy.","The basket are heavy.","The singular subject basket takes the singular verb is."),
  g4Item('Choose the complete compound sentence.',"Mia read the map, and Luis checked the compass.","Mia read the map and.","While Luis checked the compass.","Mia, the map, and Luis.","Two independent clauses are correctly joined by comma plus and."),
  g4Item('Which revision fixes the fragment "Because the trail was flooded"?',"Because the trail was flooded, we chose another route.","The trail because flooded.","Because the flooded trail.","Was flooded because the trail.","Adding an independent clause completes the dependent clause."),
  g4Item('Which revision fixes the run-on?',"The sun set, so we turned on our lanterns.","The sun set we turned on our lanterns.","The sun set, we turned on our lanterns.","The sun set so, we turned on our lanterns.","Comma plus coordinating conjunction correctly joins the independent clauses."),
  g4Item('Which sentence correctly uses a verb with the singular subject "Each"?',"Each of the players carries a water bottle.","Each of the players carry a water bottle.","Each of the player carry water bottles.","Each carry a bottle.","Each is singular and requires carries."),
  g4Item('Which is a complete simple sentence with a compound predicate?',"The fox paused and listened.","The fox and the rabbit.","Paused and listened near the fence.","Although the fox listened.","Fox is the subject, and paused and listened form a complete compound predicate."),
  g4Item('Choose the best correction: "The clouds gathered, the rain began."',"The clouds gathered, and the rain began.","The clouds gathered, the rain, began.","The clouds, gathered the rain began.","The clouds gathered and, the rain began.","The original is a comma splice; and correctly joins the clauses."),
  g4Item('Which sentence avoids a run-on?',"I finished the model; then I tested it.","I finished the model then I tested it.","I finished the model, then I tested it.","Finished the model then testing it.","A semicolon correctly separates the closely related independent clauses."),
  g4Item('Which sentence correctly matches the verb to the nearer subject in a neither/nor construction?',"Neither the teacher nor the students are ready.","Neither the teacher nor the students is ready.","Neither the teacher or the students are ready.","Neither teacher nor students be ready.","With neither/nor, the verb agrees with the nearer plural subject students."),
  g4Item('Which revision makes the idea complete? "While the scientist recorded the temperature."',"While the scientist recorded the temperature, her partner measured mass.","While the scientist and the temperature.","The scientist while recorded.","Recording while the temperature.","The dependent while clause needs an independent clause."),
  g4Item('Choose the correctly formed compound sentence.',"The sample looked solid, but it slowly flowed.","The sample looked solid but, it slowly flowed.","The sample looked solid, it slowly flowed.","But the sample looked solid.","Comma plus but correctly joins contrasting independent clauses."),
  g4Item('Which sentence has correct agreement despite the interrupting phrase?',"The results from the final trial support the claim.","The results from the final trial supports the claim.","The result from the final trials support the claim.","The results supports the claim.","The plural subject results takes support; the phrase does not change the subject."),
  g4Item('Which revision best combines the short sentences? "The alarm sounded. Everyone exited calmly."',"The alarm sounded, and everyone exited calmly.","The alarm sounded, everyone exited calmly.","Sounding the alarm and everyone calmly.","The alarm, sounded everyone exited.","The coordinated independent clauses form a correct compound sentence."),
  g4Item('Which sentence avoids both a fragment and a run-on?',"Because the wind increased, the crew lowered the sail, and the boat slowed.","Because the wind increased.","The wind increased the crew lowered the sail the boat slowed.","The crew lowering the sail, and the boat.","The dependent cause clause is attached to complete, correctly joined clauses."),
  g4Item('Which sentence correctly matches a verb with the subject "list"?',"A list of required materials appears on the first page.","A list of required materials appear on the first page.","Required materials appears on the first page.","A list appear on page first.","The main subject list is singular, so it takes appears."),
  g4Item('Which revision corrects the fused sentence without changing its meaning?',"The experiment ended; however, the team continued recording observations.","The experiment ended however the team continued recording observations.","The experiment ended, however the team continued recording observations.","However the experiment ended the team.","A semicolon and comma correctly connect two independent clauses with however."),
  g4Item('Which sentence is grammatically complete and most coherent?',"Although the first solution failed, its results revealed which variable to change.","Although the first solution failed and its results.","The solution failed, its results revealed the variable.","Failing the solution because the variable.","The dependent clause is joined to a complete main clause, and pronoun agreement is clear."),
  g4Item('Which edit correctly fixes all errors? "The evidence support the claim it does not prove the cause."',"The evidence supports the claim, but it does not prove the cause.","The evidence support the claim, but it do not prove the cause.","The evidence supports, the claim it does not prove the cause.","The evidence supporting the claim but no cause.","Supports agrees with evidence, and comma plus but fixes the run-on while preserving contrast.")
]);

g4Register("eng","L21","4.11(D)(x)","Edit punctuation, including apostrophes in possessives, commas in compound sentences, and quotation marks in dialogue",[
  g4Item('Which sentence correctly shows one dog owning a collar?',`The dog's collar is red.`,`The dogs collar is red.`,`The dogs' collar is red.`,`The dog collar's is red.`,`A singular possessive noun takes apostrophe plus s.`),
  g4Item('Which sentence correctly punctuates a compound sentence?',`I packed lunch, and Maya filled the bottles.`,`I packed lunch and, Maya filled the bottles.`,`I packed lunch, Maya filled the bottles.`,`I packed, lunch and Maya filled the bottles.`,`A comma before and joins two independent clauses.`),
  g4Item('Which sentence correctly punctuates dialogue?',`Lena said, "The bus is here."`,`Lena said "The bus is here".`,`Lena said, The bus is here.`,`Lena "said, the bus is here."`,`Quotation marks enclose the exact spoken words, with comma and period correctly placed.`),
  g4Item('Which sentence correctly shows that the nest belongs to one bird?',`The bird's nest is hidden.`,`The birds nest is hidden.`,`The birds' nest is hidden.`,`The bird nest's hidden.`,`One bird takes the singular possessive bird's.`),
  g4Item('Which sentence correctly punctuates two speakers?',`"Wait," Ana called. "I found the key!"`,`"Wait" Ana called "I found the key!"`,`Wait, "Ana called. I found the key!"`,`"Wait, Ana called. I found" the key!`,`Each speaker's exact words are enclosed, and commas and end marks sit correctly.`),
  g4Item('Which sentence correctly shows a room shared by two sisters?',`The sisters' room has two desks.`,`The sister's room has two desks.`,`The sisters room has two desks.`,`The sisters's room has two desks.`,`A plural noun already ending in s forms the possessive with an apostrophe after s.`),
  g4Item('Which sentence needs a comma before "but"?',`The path was steep, but we reached the top.`,`The steep but safe path reached the top.`,`We packed boots but not sandals.`,`The path but also the bridge was open.`,`The comma is required because but joins two independent clauses.`),
  g4Item('Which sentence punctuates the dialogue tag correctly?',`"I agree," Marcus replied.`,`"I agree." Marcus replied.`,`"I agree" Marcus, replied.`,`I agree, "Marcus replied."`,`A comma replaces the period before a following dialogue tag.`),
  g4Item('Which sentence correctly shows separate tools belonging to several workers?',`The workers' tools were labeled.`,`The worker's tools were labeled for several workers.`,`The workers tools' were labeled.`,`The workers's tools were labeled.`,`Workers is plural ending in s, so the possessive apostrophe follows the s.`),
  g4Item('Which compound sentence is punctuated correctly?',`The rain stopped, yet the river continued rising.`,`The rain stopped yet, the river continued rising.`,`The rain stopped, the river continued rising.`,`The rain, stopped yet the river continued rising.`,`Comma plus yet correctly joins two independent clauses.`),
  g4Item('Which sentence correctly punctuates a quotation that asks a question?',`Mia asked, "Did you record the mass?"`,`Mia asked? "Did you record the mass".`,`Mia asked, "Did you record the mass"?`,`Mia asked "Did you record the mass."`,`The question mark belongs inside the quotation because the spoken words form the question.`),
  g4Item('Which sentence correctly punctuates interrupted dialogue?',`"If the clouds clear," Dad said, "we can see the eclipse."`,`"If the clouds clear" Dad said "we can see the eclipse."`,`"If the clouds clear," Dad said. "We can see the eclipse."`,`If the clouds clear, "Dad said, we can see the eclipse."`,`Commas and quotation marks correctly surround the interrupting dialogue tag.`),
  g4Item('Which sentence correctly shows the handle belonging to a box?',`The box's handle broke.`,`The boxs' handle broke.`,`The boxes handle broke.`,`The box handle's broke.`,`A singular noun ending in x still takes apostrophe plus s.`),
  g4Item('Which sentence correctly punctuates the independent clauses?',`We could leave now, or we could wait for the next bus.`,`We could leave now or, we could wait for the next bus.`,`We could leave now, or wait for the next bus.`,`We could, leave now or we could wait.`,`A comma before or joins two independent clauses with distinct subjects.`),
  g4Item('Which sentence correctly quotes a speaker and then asks about the quotation?',`Did Aria say, "The meeting starts at noon"?`,`Did Aria say, "The meeting starts at noon?"`,`Did Aria say "The meeting starts at noon."?`,`Did Aria say, The meeting starts at noon?`,`The overall sentence is a question, but the quoted words are a statement, so the question mark follows the closing quote.`),
  g4Item('Which sentence correctly shows one week of camp?',`We enjoyed a week's worth of activities.`,`We enjoyed a weeks worth of activities.`,`We enjoyed a weeks' worth of activities.`,`We enjoyed a week worth's of activities.`,`The singular possessive week's expresses an amount associated with one week.`),
  g4Item('Which sentence correctly punctuates dialogue within a compound sentence?',`"I will measure the water," Zoe said, "and Amir will record the result."`,`"I will measure the water" Zoe said, "and Amir will record the result".`,`"I will measure the water," Zoe said "and Amir will record the result."`,`I will measure "the water," Zoe said, and Amir will record the result.`,`The tag interrupts one quoted compound sentence, so commas and lowercase continuation are correct.`),
  g4Item('Which sentence correctly distinguishes a plural from a possessive?',`The three students carried the teacher's boxes.`,`The three student's carried the teachers boxes.`,`The three students' carried the teacher boxes.`,`The three students carried the teachers' box for one teacher.`,`Students is a plain plural subject; teacher's is singular possessive.`),
  g4Item('Which sentence correctly uses punctuation to prevent a comma splice?',`The data support the pattern; however, they do not prove its cause.`,`The data support the pattern, however, they do not prove its cause.`,`The data support the pattern however they do not prove its cause.`,`The data support, the pattern; however they do not prove its cause.`,`A semicolon separates the independent clauses, and a comma follows however.`),
  g4Item('Which sentence correctly punctuates possessives, dialogue, and a compound sentence?',`"That is Maya's notebook," Luis said, "but these pencils are ours."`,`"That is Mayas notebook" Luis said, "but these pencil's are ours".`,`"That is Maya's notebook," Luis said "but these pencils are our's."`,`That is "Maya's notebook," Luis said, but these pencils are ours.`,`Maya's is singular possessive, ours needs no apostrophe, and the interrupted quotation is correctly punctuated.`)
]);

/* Re-declare every Grade 4 ELAR generator so no legacy random pool is used. */
function gen_g4_eng_L1(){return g4BankQuestion("eng","L1");}
function gen_g4_eng_L2(){return g4BankQuestion("eng","L2");}
function gen_g4_eng_L3(){return g4BankQuestion("eng","L3");}
function gen_g4_eng_L4(){return g4BankQuestion("eng","L4");}
function gen_g4_eng_L5(){return g4BankQuestion("eng","L5");}
function gen_g4_eng_L6(){return g4BankQuestion("eng","L6");}
function gen_g4_eng_L7(){return g4BankQuestion("eng","L7");}
function gen_g4_eng_L8(){return g4BankQuestion("eng","L8");}
function gen_g4_eng_L9(){return g4BankQuestion("eng","L9");}
function gen_g4_eng_L10(){return g4BankQuestion("eng","L10");}
function gen_g4_eng_L11(){return g4BankQuestion("eng","L11");}
function gen_g4_eng_L12(){return g4BankQuestion("eng","L12");}
function gen_g4_eng_L13(){return g4BankQuestion("eng","L13");}
function gen_g4_eng_L14(){return g4BankQuestion("eng","L14");}
function gen_g4_eng_L15(){return g4BankQuestion("eng","L15");}
function gen_g4_eng_L16(){return g4BankQuestion("eng","L16");}
function gen_g4_eng_L17(){return g4BankQuestion("eng","L17");}
function gen_g4_eng_L18(){return g4BankQuestion("eng","L18");}
function gen_g4_eng_L19(){return g4BankQuestion("eng","L19");}
function gen_g4_eng_L20(){return g4BankQuestion("eng","L20");}
function gen_g4_eng_L21(){return g4BankQuestion("eng","L21");}

/* ---------- Grade 4 Math: 20 lesson-specific banks ---------- */

function g4ProductItems(rows){
  return rows.map(([a,b])=>{
    const answer=a*b;
    return g4Item(`${a} x ${b} = ?`,answer,answer+a,answer-a,answer+b,`${a} groups of ${b}, or ${b} groups of ${a}, have a product of ${answer}.`);
  });
}
function g4DivisionItems(rows){
  return rows.map(([dividend,divisor])=>{
    const quotient=Math.floor(dividend/divisor), remainder=dividend%divisor;
    const answer=remainder ? `${quotient} R ${remainder}` : String(quotient);
    const low=Math.max(0,quotient-1), high=quotient+1;
    return g4Item(`${dividend} / ${divisor} = ?`,answer,String(low),String(high),`${quotient} R ${remainder+1}`,remainder ? `${divisor} x ${quotient} = ${dividend-remainder}, leaving a remainder of ${remainder}.` : `${divisor} x ${quotient} = ${dividend}, so the quotient is ${quotient}.`);
  });
}

g4Register("math","L1","4.4(D)","Use strategies and algorithms to multiply up to a four-digit number by a one-digit number",g4ProductItems([
  [12,3],[21,4],[32,2],[14,6],[27,3],[36,4],[45,5],[62,3],[48,6],[57,7],
  [64,8],[79,4],[83,6],[92,7],[76,8],[89,9],[97,6],[68,9],[94,8],[99,7]
]));

g4Register("math","L2","4.4(D)","Use strategies and algorithms to multiply up to a four-digit number by a one-digit number",g4ProductItems([
  [101,3],[112,4],[205,2],[131,6],[246,3],[318,4],[425,5],[507,3],[364,6],[452,7],
  [619,8],[735,4],[826,6],[907,7],[684,8],[759,9],[948,6],[876,9],[995,8],[987,9]
]));

g4Register("math","L3","4.4(D)","Use strategies and algorithms to multiply a two-digit number by a two-digit number",g4ProductItems([
  [12,11],[14,12],[21,13],[22,14],[24,16],[31,15],[32,18],[27,23],[36,24],[42,19],
  [45,27],[53,32],[64,28],[72,35],[68,44],[76,53],[81,67],[89,74],[93,86],[98,87]
]));

g4Register("math","L4","4.4(H)","Solve with fluency one- and two-step multiplication and division problems, including interpreting remainders",[
  g4Item('Six bags hold 14 oranges each. How many oranges are there?',84,74,90,20,'Multiply 6 x 14 to find 84 oranges.'),
  g4Item('A theater has 8 rows with 23 seats in each row. How many seats are there?',184,176,192,31,'The equal rows are 8 groups of 23, which is 184.'),
  g4Item('A teacher buys 7 packs of 36 index cards. How many cards does she buy?',252,243,259,42,'Seven groups of 36 equal 252 cards.'),
  g4Item('A warehouse stacks 12 boxes on each of 15 pallets. How many boxes are stacked?',180,170,192,27,'Multiply 12 boxes by 15 pallets to get 180 boxes.'),
  g4Item('A school prints 28 pages for each of 24 students. How many pages are printed?',672,652,676,52,'The product 28 x 24 is 672 pages.'),
  g4Item('Nine buses carry 47 students each. If 18 more students arrive separately, how many students arrive in all?',441,423,459,488,'First 9 x 47 = 423, then 423 + 18 = 441.'),
  g4Item('A farmer packs 32 apples in each crate. After filling 18 crates, she sells 75 apples. How many remain?',501,576,491,426,'The crates hold 32 x 18 = 576 apples; 576 - 75 = 501.'),
  g4Item('A concert sells 26 tickets in each of 35 sections, then refunds 48 tickets. How many tickets remain sold?',862,910,888,814,'Calculate 26 x 35 = 910, then subtract 48 to get 862.'),
  g4Item('Four clubs each collect 125 cans in week one and 38 cans in week two. How many cans do they collect altogether?',652,500,163,690,'Each club collects 125 + 38 = 163; four clubs collect 4 x 163 = 652.'),
  g4Item('A printer makes 45 booklets with 16 pages each on Monday and 280 pages Tuesday. How many pages total?',1000,720,955,1280,'Monday uses 45 x 16 = 720 pages; adding 280 gives 1,000.'),
  g4Item('A shop has 936 beads and packs 8 beads per bag. How many full bags can it make?',117,116,118,928,'936 / 8 = 117 because 8 x 117 = 936.'),
  g4Item('A camp has 985 campers. Vans hold 8 campers each. How many vans are needed so every camper has a seat?',124,123,122,125,'985 / 8 is 123 remainder 1, so one additional van is required: 124.'),
  g4Item('A library places 1,458 books equally on 6 carts. How many books go on each cart?',243,242,248,1452,'1,458 / 6 = 243 because 6 x 243 = 1,458.'),
  g4Item('A factory makes 2,735 parts and packs 9 per box. How many full boxes and leftover parts result?','303 full boxes, 8 left','304 full boxes, 1 left','303 full boxes, 2 left','302 full boxes, 8 left','9 x 303 = 2,727, leaving 8 parts.'),
  g4Item('A museum orders 28 cases with 36 tiles each. It uses 275 tiles in one exhibit. How many tiles remain?',733,1008,723,743,'The order contains 28 x 36 = 1,008 tiles; 1,008 - 275 = 733.'),
  g4Item('Five teams each need 24 cones and 18 flags. How many total items are needed?',210,120,90,215,'Each team needs 42 items; 5 x 42 = 210.'),
  g4Item('A bakery makes 48 trays of 27 rolls. It gives 168 rolls away and packs the rest equally into 6 bins. How many rolls per bin?',188,216,1128,180,'48 x 27 = 1,296; 1,296 - 168 = 1,128; 1,128 / 6 = 188.'),
  g4Item('A stadium has 34 sections of 28 seats. Three sections are closed. How many seats remain available?',868,952,84,924,'Closing 3 leaves 31 sections; 31 x 28 = 868 seats.'),
  g4Item('A school buys 23 boxes of 48 pencils. It divides the pencils equally among 8 grades. How many pencils does each grade receive?',138,1104,128,148,'23 x 48 = 1,104 pencils, and 1,104 / 8 = 138.'),
  g4Item('A fundraiser sells 37 adult tickets at $24 and 46 child tickets at $15. How much money is collected?','$1,578','$888','$690','$1,563','Adult sales are 37 x 24 = 888 dollars; child sales are 46 x 15 = 690 dollars; total 1,578 dollars.')
]);

g4Register("math","L5","4.1(F)","Analyze mathematical relationships to connect and communicate mathematical ideas",[
  g4Item('Which number is a factor of 18?',6,5,7,8,'18 = 6 x 3, so 6 is a factor.'),
  g4Item('Which number is a factor of 24?',8,5,7,9,'24 = 8 x 3.'),
  g4Item('Which number is a factor of 35?',7,4,6,8,'35 = 7 x 5.'),
  g4Item('Which number is a factor of 42?',6,5,8,9,'42 = 6 x 7.'),
  g4Item('Which number is NOT a factor of 36?',5,4,6,9,'No whole number times 5 equals 36.'),
  g4Item('Which number is NOT a factor of 48?',7,6,8,12,'48 has factors 6, 8, and 12, but not 7.'),
  g4Item('Which list contains every factor of 16?','1, 2, 4, 8, 16','1, 2, 8, 16','2, 4, 8','1, 4, 6, 16','The factor pairs 1 x 16, 2 x 8, and 4 x 4 give the complete list.'),
  g4Item('Which list contains every factor of 20?','1, 2, 4, 5, 10, 20','1, 2, 5, 20','2, 4, 5, 10','1, 3, 4, 5, 20','The factor pairs are 1 x 20, 2 x 10, and 4 x 5.'),
  g4Item('A number has factor pairs 1 x 28, 2 x 14, and 4 x 7. What is the number?',28,24,32,56,'Every pair has product 28.'),
  g4Item('A number has factor pairs 1 x 45, 3 x 15, and 5 x 9. Which number is it?',45,40,48,54,'Each stated pair multiplies to 45.'),
  g4Item('Which statement about 54 is true?','6 and 9 are both factors','5 and 11 are both factors','7 is a factor','8 is a factor','6 x 9 = 54, so both are factors.'),
  g4Item('Which statement about 72 is true?','8 and 9 form a factor pair','7 and 10 form a factor pair','6 and 11 form a factor pair','5 and 14 form a factor pair','8 x 9 = 72.'),
  g4Item('If 12 is a factor of a number, which could be that number?',84,86,92,98,'12 x 7 = 84, so 12 is a factor of 84.'),
  g4Item('If both 5 and 8 are factors of a number less than 100, which could be the number?',40,45,56,75,'40 is divisible by both 5 and 8.'),
  g4Item('Which number has exactly the factor pairs 1 x n, 2 x 9, and 3 x 6?',18,12,24,27,'The known pairs both have product 18, so n is 18.'),
  g4Item('Which number has more factor pairs?',36,35,37,41,'36 has factor pairs 1x36, 2x18, 3x12, 4x9, and 6x6, more than the others.'),
  g4Item('A rectangle with whole-number sides has area 60. Which dimensions are impossible?','7 by 9','6 by 10','5 by 12','4 by 15','7 x 9 = 63, not 60.'),
  g4Item('A teacher can arrange 96 chairs in equal rows with no chairs left. Which row size works?',12,7,10,14,'96 / 12 = 8 exactly.'),
  g4Item('Number N is divisible by 4 and 6. Which choice could be N?',108,106,110,118,'108 / 4 = 27 and 108 / 6 = 18.'),
  g4Item('Which claim is always true when a and b are whole-number factors of n?','a x b = n for a factor pair','a + b = n','a must equal b','n must be even','By definition, the members of a factor pair multiply to n.')
]);

g4Register("math","L6","4.5(B)","Use an input-output table and numerical expressions to generate a number pattern that follows a given rule",[
  g4Item('Which number is the next multiple of 4 after 16?',20,18,21,24,'Multiples of 4 increase by 4: 4, 8, 12, 16, 20.'),
  g4Item('Which list shows the first five positive multiples of 6?','6, 12, 18, 24, 30','1, 2, 3, 4, 5','6, 11, 16, 21, 26','0, 6, 18, 30, 42','Adding 6 repeatedly gives the multiples.'),
  g4Item('What is the missing number: 7, 14, 21, __, 35?',28,27,29,42,'The rule is add 7, so 21 + 7 = 28.'),
  g4Item('Which number is a multiple of 9?',63,62,64,65,'9 x 7 = 63.'),
  g4Item('Input-output rule: multiply by 5. What is the output for input 8?',40,13,35,45,'8 x 5 = 40.'),
  g4Item('Input-output rule: multiply by 7, then add 2. What is the output for input 4?',30,28,33,36,'4 x 7 + 2 = 30.'),
  g4Item('The pattern is 12, 24, 36, 48. Which expression gives term n?','12 x n','12 + n','n x n','24 x n','Each term equals its position multiplied by 12.'),
  g4Item('Which value belongs in the pattern generated by 8 x n?',56,54,58,60,'For n = 7, 8 x 7 = 56.'),
  g4Item('A table maps 1->9, 2->18, 3->27, 4->36. What rule is shown?','Multiply the input by 9','Add 9 to the input','Multiply the input by 8','Add the input to 18','Every output is 9 times its input.'),
  g4Item('A table maps 2->13, 4->23, 6->33. Which rule fits?','Multiply by 5, then add 3','Multiply by 6, then add 1','Add 11','Multiply by 4, then add 5','5(2)+3=13, 5(4)+3=23, and 5(6)+3=33.'),
  g4Item('Which number is the least common positive multiple of 4 and 6?',12,10,18,24,'12 is the first positive number in both multiple lists.'),
  g4Item('Which number is a common multiple of 8 and 12?',48,36,40,56,'48 = 8 x 6 and 12 x 4.'),
  g4Item('Start at 5 and repeatedly add 7. What is the sixth term?',40,35,42,47,'The terms are 5, 12, 19, 26, 33, 40.'),
  g4Item('A machine applies 6n + 4. What output corresponds to n = 9?',58,54,60,64,'6 x 9 + 4 = 58.'),
  g4Item('The outputs are 11, 19, 27, 35 for inputs 1, 2, 3, 4. Which rule fits?','8n + 3','11n','7n + 4','9n + 2','8(1)+3=11 and each later input raises the output by 8.'),
  g4Item('A pattern starts 96, 84, 72, 60. Which positive term appears next?',48,50,52,56,'The rule subtracts 12, so 60 - 12 = 48.'),
  g4Item('Which expression generates 14, 26, 38, 50 for n = 1, 2, 3, 4?','12n + 2','14n','10n + 4','13n + 1','12n + 2 gives each listed output.'),
  g4Item('Two patterns are 6n and 8n. What is the first positive output they share?',24,12,16,48,'24 is 6 x 4 and 8 x 3.'),
  g4Item('Pattern A begins at 3 and adds 5; Pattern B begins at 8 and adds 10. Which number appears in both?',18,13,23,28,'Pattern A includes 3,8,13,18; Pattern B includes 8,18, so 18 is shared.'),
  g4Item('An output table follows an + b. Outputs increase by 9, and input 1 gives 14. What rule is it?','9n + 5','14n','5n + 9','9n + 14','An increase of 9 gives a=9; 9(1)+b=14, so b=5.')
]);

g4Register("math","L7","4.1(F)","Analyze mathematical relationships to connect and communicate mathematical ideas",[
  g4Item('Which statement correctly classifies 7?','7 is prime because its only factors are 1 and 7','7 is composite because 7 = 2 + 5','7 is composite because it is odd','7 is prime because all odd numbers are prime','A prime number has exactly two factors, and 7 has 1 and 7.'),
  g4Item('Which statement correctly classifies 12?','12 is composite because 3 x 4 = 12','12 is prime because it is even','12 is prime because 1 x 12 works','12 is neither because it has many factors','A nontrivial factor pair proves 12 is composite.'),
  g4Item('Which statement correctly classifies 19?','19 is prime because no whole-number factor pair exists besides 1 x 19','19 is composite because 19 = 20 - 1','19 is composite because it is greater than 10','19 is prime because its digits add to 10','Checking possible factors shows only 1 and 19.'),
  g4Item('Which statement correctly classifies 21?','21 is composite because 3 x 7 = 21','21 is prime because it is odd','21 is prime because 2 is not a factor','21 is neither prime nor composite','The factor pair 3 and 7 makes 21 composite.'),
  g4Item('Which number is prime?',29,27,33,39,'29 has no factor pair besides 1 x 29.'),
  g4Item('Which number is composite?',35,31,37,41,'35 = 5 x 7.'),
  g4Item('Which evidence proves 49 is composite?','49 = 7 x 7','49 is odd','49 is greater than 2','49 has two digits','The factor 7 is neither 1 nor 49, proving compositeness.'),
  g4Item('Which evidence supports that 43 is prime?','Testing 2, 3, 5, and 7 finds none divide 43 evenly','43 is not a multiple of 10','43 is odd','43 is close to 40','A factor of 43 other than 1 would have a paired factor no greater than its square root, so testing small primes is sufficient.'),
  g4Item('Which pair contains one prime and one composite number?','47 and 48','41 and 43','45 and 49','51 and 57','47 is prime while 48 has many factor pairs.'),
  g4Item('Which list contains only prime numbers?','2, 3, 5, 7','1, 2, 3, 5','3, 6, 7, 11','5, 9, 11, 13','2, 3, 5, and 7 each have exactly two factors; 1 is not prime.'),
  g4Item('Why is 1 neither prime nor composite?','It has exactly one positive factor','It is odd','It is smaller than 2','It cannot be multiplied','Prime numbers have exactly two factors and composite numbers more than two; 1 has only one.'),
  g4Item('Which statement about 2 is correct?','It is the only even prime number','It is composite because it is even','It is neither prime nor composite','It has three factors','The only factors of 2 are 1 and 2.'),
  g4Item('A number has factors 1, 2, 4, 8, and 16. How is it classified?','Composite','Prime','Neither','Cannot be determined','Having more than two factors makes it composite.'),
  g4Item('A number n is greater than 1 and has no factor pair except 1 x n. What is n?','Prime','Composite','Even','A perfect square','That is the definition of a prime number.'),
  g4Item('Which number is composite even though it is not divisible by 2, 3, or 5?',77,73,79,83,'77 = 7 x 11.'),
  g4Item('Which claim is false?','Every odd number is prime','Every composite number has more than two factors','2 is prime','A factor pair can prove a number composite','Odd composite numbers such as 9 show the claim is false.'),
  g4Item('What is the smallest prime factor of 91?',7,3,5,13,'91 = 7 x 13, and neither 2, 3, nor 5 divides it.'),
  g4Item('A rectangular array for n can be made only as 1 by n. What does that suggest for n > 1?','n is prime','n is always even','n is composite','n equals 1','Only the trivial array means no other factor pair exists.'),
  g4Item('Which argument correctly proves 97 is prime?','No prime number at or below 9 divides 97 evenly','97 is odd and ends in 7','97 is larger than every one-digit prime','97 has no factor of 10','A composite factor pair would include a factor no larger than the square root of 97, which is less than 10.'),
  g4Item('If p is prime, which statement must be true?','Exactly two positive whole numbers divide p evenly','p is always odd','p is less than 100','p has no factors','Prime means exactly the two factors 1 and p; 2 shows a prime need not be odd.')
]);

g4Register("math","L8","4.1(F)","Analyze mathematical relationships to connect and communicate mathematical ideas",[
  g4Item('Complete the factor pair for 18: 2 x __ = 18.',9,8,10,16,'18 / 2 = 9.'),
  g4Item('Complete the factor pair for 24: 3 x __ = 24.',8,6,9,21,'24 / 3 = 8.'),
  g4Item('Complete the factor pair for 35: 5 x __ = 35.',7,6,8,30,'35 / 5 = 7.'),
  g4Item('Complete the factor pair for 48: 6 x __ = 48.',8,7,9,42,'48 / 6 = 8.'),
  g4Item('Which is a factor pair of 54?','6 and 9','5 and 10','7 and 8','4 and 13','6 x 9 = 54.'),
  g4Item('Which is a factor pair of 63?','7 and 9','6 and 10','8 and 8','5 and 13','7 x 9 = 63.'),
  g4Item('Which is NOT a factor pair of 72?','6 and 11','8 and 9','3 and 24','4 and 18','6 x 11 = 66, not 72.'),
  g4Item('Which is NOT a factor pair of 90?','8 and 11','9 and 10','6 and 15','5 and 18','8 x 11 = 88, not 90.'),
  g4Item('The factor pairs of 32 include 1x32, 2x16, and __.','4x8','3x9','5x6','2x18','4 x 8 is the remaining whole-number factor pair.'),
  g4Item('The factor pairs of 40 include 1x40, 2x20, 4x10, and __.','5x8','6x7','3x13','4x12','5 x 8 = 40.'),
  g4Item('How many distinct factor pairs does 36 have?',5,4,6,9,'They are 1x36, 2x18, 3x12, 4x9, and 6x6.'),
  g4Item('How many distinct factor pairs does 48 have?',5,4,6,8,'They are 1x48, 2x24, 3x16, 4x12, and 6x8.'),
  g4Item('A rectangle has area 84 square units and one side 7. What is the other side?',12,11,13,77,'The missing dimension is 84 / 7 = 12.'),
  g4Item('A 96-tile array has 8 equal rows. How many tiles are in each row?',12,10,14,88,'96 / 8 = 12.'),
  g4Item('Which number has factor pairs 1x60, 2x30, 3x20, 4x15, 5x12, and 6x10?',60,30,90,120,'Every listed product is 60.'),
  g4Item('If a factor pair of n is 14 and 6, what are n and its paired division fact?','n=84 and 84/14=6','n=20 and 20/14=6','n=84 and 84/6=12','n=8 and 14/6=8','14 x 6 = 84, so 84 / 14 = 6.'),
  g4Item('A number has exactly three factor pairs: 1x18, 2x9, and 3x6. Which number is it?',18,9,36,54,'Each factor pair has product 18.'),
  g4Item('Which factor pair minimizes the difference between its factors for 96?','8 and 12','6 and 16','4 and 24','3 and 32','Among factor pairs, 8 and 12 are closest together.'),
  g4Item('For a whole number n, if 9 x k = n and n = 117, what is k?',13,11,12,14,'117 / 9 = 13.'),
  g4Item('A factor pair of n differs by 1 and has product 72. Which pair is it?','8 and 9','6 and 12','4 and 18','3 and 24','8 x 9 = 72 and the factors differ by 1.')
]);

g4Register("math","L9","4.3(C)","Determine whether two fractions are equivalent using a variety of methods",[
  g4Item('A strip has 1 of 2 equal parts shaded. Which fraction shades the same amount in fourths?','2/4','1/4','3/4','4/4','Multiplying numerator and denominator of 1/2 by 2 gives 2/4.'),
  g4Item('A model shows 2 of 3 equal parts shaded. Which sixths model is equivalent?','4/6','2/6','3/6','5/6','Each third split in two creates 4 shaded sixths.'),
  g4Item('Which fraction is equivalent to 3/4?','6/8','4/8','7/8','3/8','Multiplying 3/4 by 2/2 gives 6/8.'),
  g4Item('Which fraction is equivalent to 2/5?','4/10','5/10','2/10','6/10','Multiplying 2/5 by 2/2 gives 4/10.'),
  g4Item('A rectangle has 6 of 9 equal cells shaded. Which fraction names the same amount in thirds?','2/3','1/3','3/3','2/9','Dividing numerator and denominator by 3 gives 2/3.'),
  g4Item('A number line point is at 5/10. Which equivalent fraction locates the same point?','1/2','1/5','4/5','5/2','5/10 simplifies to 1/2.'),
  g4Item('Which pair would occupy the same point on a number line?','3/6 and 1/2','2/6 and 2/3','4/6 and 3/4','5/6 and 1/3','3/6 reduces to 1/2.'),
  g4Item('A model shades 8 of 12 squares. Which fraction is equivalent?','2/3','3/4','4/5','1/3','Dividing 8 and 12 by 4 gives 2/3.'),
  g4Item('Which equation correctly proves an equivalence?','3/5 = 9/15','3/5 = 6/15','3/5 = 8/10','3/5 = 12/15','Multiplying both terms by 3 gives 9/15.'),
  g4Item('Which fraction is NOT equivalent to 4/6?','8/10','2/3','6/9','10/15','4/6, 2/3, 6/9, and 10/15 are equivalent; 8/10 equals 4/5.'),
  g4Item('A fraction model shows 9/12. Which simplest equivalent fraction matches it?','3/4','2/3','4/5','1/4','Divide numerator and denominator by 3.'),
  g4Item('Which fraction is equivalent to 7/8 with denominator 24?','21/24','14/24','22/24','7/24','Multiplying both terms by 3 yields 21/24.'),
  g4Item('Fill the blank: 5/6 = __/18.',15,10,12,16,'The denominator is multiplied by 3, so the numerator is 5 x 3 = 15.'),
  g4Item('Fill the blank: 8/12 = __/3.',2,1,3,4,'Dividing numerator and denominator by 4 gives 2/3.'),
  g4Item('Which multiplication shows why 4/7 = 12/21?','(4x3)/(7x3)','(4+8)/(7+14)','(4x3)/(7x2)','(4+3)/(7+3)','Multiplying numerator and denominator by the same nonzero number preserves value.'),
  g4Item('A student says 3/8 = 6/12 because both numbers increased. What is the error?','The numerator and denominator were not multiplied by the same factor','Fractions cannot have even denominators','3/8 is greater than 1','Equivalent fractions must have equal numerators','3 became 6 by x2, but 8 became 12 by x1.5.'),
  g4Item('Which fraction equivalent to 5/12 has numerator 20?','20/48','20/36','20/24','20/60','The numerator was multiplied by 4, so 12 must also be multiplied by 4.'),
  g4Item('If a/b = 6/15 and the fraction is simplified fully, what is a/b?','2/5','3/5','2/3','1/5','The greatest common factor of 6 and 15 is 3; dividing gives 2/5.'),
  g4Item('Which statement proves 14/21 and 10/15 are equivalent?','Both simplify to 2/3','Both numerators are even','Their denominators differ by 6','14+21 equals 10+25','Simplifying both to the same fraction proves equivalence.'),
  g4Item('A model is repartitioned from eighths into twenty-fourths without changing the shaded area. If 5/8 was shaded, how many twenty-fourths are shaded?',15,10,13,18,'Each eighth becomes three twenty-fourths, so 5 x 3 = 15 shaded parts.')
]);

g4Register("math","L10","4.3(C)","Determine whether two fractions are equivalent using a variety of methods",[
  g4Item('Multiply numerator and denominator of 1/3 by 2. What fraction results?','2/6','2/3','1/6','3/6','(1x2)/(3x2)=2/6.'),
  g4Item('Multiply numerator and denominator of 2/5 by 3. What fraction results?','6/15','5/15','6/8','2/15','(2x3)/(5x3)=6/15.'),
  g4Item('Generate an equivalent fraction for 3/7 with denominator 14.','6/14','3/14','7/14','9/14','Multiply both terms by 2.'),
  g4Item('Generate an equivalent fraction for 4/9 with numerator 12.','12/27','12/18','12/21','12/36','Multiplying 4 by 3 requires multiplying 9 by 3.'),
  g4Item('Complete 5/8 = 10/___.',16,13,18,20,'The numerator doubles, so the denominator doubles to 16.'),
  g4Item('Complete 3/4 = 15/___.',20,16,18,24,'3 is multiplied by 5; 4 x 5 = 20.'),
  g4Item('Divide both terms of 12/18 by 6. What fraction results?','2/3','6/12','3/6','2/6','12/6=2 and 18/6=3.'),
  g4Item('Divide both terms of 16/24 by 8. What fraction results?','2/3','8/16','4/8','2/4','16/8=2 and 24/8=3.'),
  g4Item('Which operation generates an equivalent fraction from 7/10?','Multiply both terms by 4','Add 4 to both terms','Multiply only the numerator by 4','Subtract 2 from both terms','The same nonzero multiplicative factor must be applied to both terms.'),
  g4Item('Which fraction can be generated from 6/8 by dividing both terms by 2?','3/4','4/6','3/8','6/4','6/2=3 and 8/2=4.'),
  g4Item('Find n: 7/9 = 21/n.',27,18,28,30,'7 is multiplied by 3, so 9 x 3 = 27.'),
  g4Item('Find n: 18/30 = 3/n.',5,6,10,15,'Divide both terms by 6 to get 3/5.'),
  g4Item('Which sequence lists three fractions equivalent to 2/3?','4/6, 6/9, 8/12','3/4, 4/5, 5/6','2/6, 2/9, 2/12','4/5, 6/8, 8/10','Multiplying 2/3 by 2/2, 3/3, and 4/4 yields the sequence.'),
  g4Item('Generate a fraction equivalent to 11/12 with denominator 60.','55/60','44/60','48/60','59/60','12 x 5 = 60, so 11 x 5 = 55.'),
  g4Item('A student generates 12/20 from 3/5. Which factor was used?',4,3,5,8,'Both 3 and 5 were multiplied by 4.'),
  g4Item('Which missing factor makes (5 x __)/(6 x __) = 35/42?',7,6,8,5,'5 x 7 = 35 and 6 x 7 = 42.'),
  g4Item('Generate an equivalent fraction to 14/35 in simplest terms.','2/5','7/15','4/10','1/3','Divide both terms by their greatest common factor, 7.'),
  g4Item('Find n if 9/12 = n/36.',27,24,30,33,'The denominator triples, so the numerator becomes 9 x 3 = 27.'),
  g4Item('Which expression generates 24/32 from 3/4?','(3x8)/(4x8)','(3+21)/(4+28)','(3x8)/(4x6)','(3+8)/(4+8)','Both terms are multiplied by 8.'),
  g4Item('A fraction equivalent to 5/6 has a numerator and denominator whose sum is 55. Which fraction is it?','25/30','20/35','30/25','15/40','Equivalent terms are 5k and 6k; 11k=55 gives k=5, so 25/30.')
]);

g4Register("math","L11","4.3(D)","Compare two fractions with different numerators and denominators using >, =, or <",[
  g4Item('Compare 1/2 and 2/4.','1/2 = 2/4','1/2 > 2/4','1/2 < 2/4','They cannot be compared','2/4 simplifies to 1/2.'),
  g4Item('Compare 2/3 and 4/6.','2/3 = 4/6','2/3 > 4/6','2/3 < 4/6','Only numerators can be compared','4/6 simplifies to 2/3.'),
  g4Item('Compare 3/4 and 6/8.','3/4 = 6/8','3/4 > 6/8','3/4 < 6/8','The larger denominator wins','6/8 simplifies to 3/4.'),
  g4Item('Compare 2/5 and 5/10.','2/5 < 5/10','2/5 = 5/10','2/5 > 5/10','They are both greater than 1','2/5=4/10, which is less than 5/10.'),
  g4Item('Which fraction is greater: 3/8 or 1/2?','1/2','3/8','They are equal','Not enough information','1/2=4/8, which is greater than 3/8.'),
  g4Item('Which fraction is smaller: 5/6 or 3/4?','3/4','5/6','They are equal','Both equal 1','5/6=10/12 and 3/4=9/12.'),
  g4Item('Compare 7/10 and 2/3.','7/10 > 2/3','7/10 < 2/3','7/10 = 2/3','Denominators make comparison impossible','Cross-products are 21 and 20, so 7/10 is greater.'),
  g4Item('Compare 4/9 and 5/12.','4/9 > 5/12','4/9 < 5/12','4/9 = 5/12','Both equal 1/2','Cross-products are 48 and 45, so 4/9 is greater.'),
  g4Item('Which comparison between 5/8 and 7/10 is true?','5/8 < 7/10','5/8 > 7/10','5/8 = 7/10','5/8 = 5/10','Cross-products 50 and 56 show 5/8 is less.'),
  g4Item('Which comparison between 9/12 and 3/4 is true?','9/12 = 3/4','9/12 > 3/4','9/12 < 3/4','9/12 = 2/3','9/12 simplifies by 3 to 3/4.'),
  g4Item('Order from least to greatest: 1/2, 3/4, 2/3.','1/2, 2/3, 3/4','1/2, 3/4, 2/3','2/3, 1/2, 3/4','3/4, 2/3, 1/2','Using twelfths gives 6/12, 8/12, 9/12.'),
  g4Item('Order from greatest to least: 5/6, 7/8, 3/4.','7/8, 5/6, 3/4','5/6, 7/8, 3/4','7/8, 3/4, 5/6','3/4, 5/6, 7/8','Using twenty-fourths gives 21/24, 20/24, and 18/24.'),
  g4Item('Which fraction lies between 1/2 and 3/4?','2/3','2/5','4/5','1/4','2/3 is greater than 1/2 and less than 3/4.'),
  g4Item('Which fraction is closest to 1?','11/12','7/8','5/6','3/4','11/12 is only 1/12 below 1, the smallest gap.'),
  g4Item('Mina ran 5/8 mile and Luis ran 2/3 mile. Who ran farther?','Luis','Mina','They ran equal distances','Cannot compare different denominators','Cross-products: 5x3=15 and 2x8=16, so 2/3 is greater.'),
  g4Item('Which comparison can be justified using the benchmark 1/2?','3/7 < 5/9','3/7 > 5/9','3/7 = 5/9','Both are below 1/2','3/7 is below 1/2 while 5/9 is above 1/2.'),
  g4Item('Compare 13/16 and 4/5.','13/16 > 4/5','13/16 < 4/5','13/16 = 4/5','Both equal 3/4','Cross-products are 65 and 64, so 13/16 is slightly greater.'),
  g4Item('Which statement is true about 6/7 and 11/13?','6/7 > 11/13','6/7 < 11/13','6/7 = 11/13','Both equal 5/6','Cross-products are 78 and 77, so 6/7 is greater.'),
  g4Item('A student says 4/7 > 5/8 because 4+7 is greater than 5+8 is false. What valid comparison is correct?','4/7 < 5/8','4/7 > 5/8','4/7 = 5/8','The fractions cannot be compared','Cross-products 32 and 35 show 4/7 < 5/8.'),
  g4Item('Which fraction is greatest: 7/9, 11/14, 15/20, or 5/6?','5/6','7/9','11/14','15/20','Their approximate values are .833, .778, .786, and .75; 5/6 is greatest.')
]);

g4Register("math","L12","4.3(C)","Determine whether two fractions are equivalent using a variety of methods",[
  g4Item('Nora ate 1/2 of a sandwich. Which amount is equivalent?','2/4','1/4','3/4','2/3','One half equals two fourths.'),
  g4Item('A recipe uses 2/3 cup of oats. Which measuring combination is equivalent?','4/6 cup','3/6 cup','5/6 cup','2/6 cup','Multiplying both terms by 2 gives 4/6.'),
  g4Item('Four of eight garden rows have carrots. What fraction in simplest terms has carrots?','1/2','1/4','2/3','4/4','4/8 simplifies to 1/2.'),
  g4Item('Six of nine votes support a plan. What equivalent fraction in thirds represents support?','2/3','1/3','3/3','2/9','6/9 divided by 3/3 is 2/3.'),
  g4Item('A runner completes 3/5 of a route. The route is marked in tenths. How many tenths are complete?','6/10','3/10','5/10','8/10','3/5 x 2/2 = 6/10.'),
  g4Item('A tank is 7/8 full. On a 24-part gauge, how many parts show full?',21,18,20,22,'7/8 x 3/3 = 21/24.'),
  g4Item('Lena says 9 of 12 tiles equal 3/4 of the floor. Is she correct?','Yes, because 9/12 simplifies to 3/4','No, because 9 is greater than 3','No, because denominators differ','Yes, because both fractions add to 1','Dividing 9 and 12 by 3 gives 3/4.'),
  g4Item('A class finishes 15/20 of a project. Which simpler fraction describes the same progress?','3/4','2/3','4/5','1/4','Divide both numerator and denominator by 5.'),
  g4Item('A trail map shows 5/6 mile completed. Which equivalent distance has denominator 18?','15/18','10/18','12/18','16/18','Multiply numerator and denominator by 3.'),
  g4Item('Eight of fourteen trees are oaks. What simplest equivalent fraction are oaks?','4/7','3/7','4/14','7/8','8/14 divided by 2/2 is 4/7.'),
  g4Item('A jug is 12/16 full. A student labels it 2/3 full. What correction is needed?','The label should be 3/4','The label is correct','The label should be 1/2','The label should be 4/5','12/16 simplifies to 3/4, not 2/3.'),
  g4Item('A mosaic has 18/30 blue tiles. Which fraction represents the same portion?','3/5','2/5','3/10','5/6','Divide 18 and 30 by 6.'),
  g4Item('A team wins 14 of 21 games. Which equivalent fraction summarizes the wins?','2/3','3/4','7/21','4/7','14/21 simplifies by 7 to 2/3.'),
  g4Item('A container is 10/15 full. After repartitioning into sixths without changing volume, how many sixths are full?',4,3,5,6,'10/15=2/3=4/6.'),
  g4Item('A ribbon 9/12 meter long is described as 6/8 meter. Are the lengths equivalent?','Yes; both equal 3/4 meter','No; 9 is not 6','No; 12 is larger than 8','Yes; both equal 2/3 meter','Both fractions simplify to 3/4.'),
  g4Item('A survey reports 16/24 prefer option A. Another says 10/15. Do the reports show the same share?','Yes; both equal 2/3','No; 16 is greater than 10','No; 24 and 15 differ','Yes; both equal 3/4','16/24 and 10/15 each simplify to 2/3.'),
  g4Item('A recipe is doubled from 3/8 cup. Which fraction with denominator 16 represents the original single-recipe amount?','6/16','3/16','8/16','9/16','3/8 x 2/2 = 6/16; doubling the recipe amount is a separate operation.'),
  g4Item('A map labels 20/28 of a route paved. Which simplest fraction should replace the label?','5/7','4/7','5/14','10/21','The greatest common factor is 4, giving 5/7.'),
  g4Item('Two students shade equal-size grids. One shades 21/28; the other 18/24. Who shades more?','They shade equal amounts','The first student','The second student','Cannot compare grids','Both fractions simplify to 3/4.'),
  g4Item('A water goal is 5/6 liter. By noon, 20/24 liter is consumed. What fraction of the goal remains?','None; 20/24 equals 5/6','1/24','1/6','4/24','20/24 simplifies to 5/6, so the full goal has been met.')
]);

g4Register("math","L13","4.4(F)","Use strategies and algorithms to divide up to a four-digit dividend by a one-digit divisor",g4DivisionItems([
  [24,3],[35,5],[42,6],[56,7],[72,8],[81,9],[96,6],[108,9],[144,8],[156,6],
  [225,9],[312,8],[455,7],[648,9],[735,5],[864,6],[945,7],[1296,8],[1728,9],[2394,6]
]));

g4Register("math","L14","4.4(F)","Use strategies and algorithms to divide up to a four-digit dividend by a one-digit divisor",g4DivisionItems([
  [132,4],[175,5],[246,6],[319,7],[428,4],[563,5],[694,6],[785,8],[936,9],[1048,4],
  [1265,5],[1458,6],[1736,7],[1968,8],[2187,9],[2459,6],[3074,8],[3527,9],[4095,7],[4987,8]
]));

g4Register("math","L15","4.5(A)","Represent multi-step problems involving the four operations with whole numbers using equations with a letter for the unknown",[
  g4Item('A library had 1,250 books and bought 375 more. How many books now?',1625,1525,875,1675,'1,250 + 375 = 1,625.'),
  g4Item('A stadium had 2,400 seats and removed 185. How many remain?',2215,2285,2585,2115,'2,400 - 185 = 2,215.'),
  g4Item('Mia saved $468 and then $257 more. What is her total?','$725','$625','$711','$735','468 + 257 = 725.'),
  g4Item('A tank held 3,000 liters and used 846 liters. How many liters remain?','2,154','2,254','2,164','3,846','3,000 - 846 = 2,154.'),
  g4Item('A fair sold 685 tickets Friday and 927 Saturday. It refunded 46. How many tickets stayed sold?',1566,1612,1520,1658,'685 + 927 = 1,612; subtract 46 to get 1,566.'),
  g4Item('A warehouse had 4,250 boxes, shipped 1,375, then received 640. How many boxes now?',3515,2875,4890,3415,'4,250 - 1,375 = 2,875; plus 640 = 3,515.'),
  g4Item('Three classes collected 248, 316, and 275 cans. They recycled 790. How many cans remain?',49,839,39,59,'248 + 316 + 275 = 839; 839 - 790 = 49.'),
  g4Item('A trail is 5,000 meters. A hiker walks 1,685 meters, rests, then walks 2,140 meters. How much remains?',1175,3825,1075,1275,'5,000 - (1,685 + 2,140) = 1,175.'),
  g4Item('A school budget is $8,500. It spends $2,675 on books and $1,940 on equipment. How much remains?','$3,885','$4,615','$3,985','$5,825','8,500 - 2,675 - 1,940 = 3,885.'),
  g4Item('A museum counted 3,476 visitors. That was 582 more than last month. How many visited last month?',2894,4058,2994,2794,'Let v + 582 = 3,476; v = 2,894.'),
  g4Item('After receiving 735 supplies, a clinic had 2,418. How many did it have before?',1683,3153,1783,1583,'Let s + 735 = 2,418; s = 1,683.'),
  g4Item('A goal is 10,000 points. A team earns 3,845 then loses 375 and earns 2,960. How many more points are needed?',3570,6430,3195,3945,'Net points are 3,845 - 375 + 2,960 = 6,430; 10,000 - 6,430 = 3,570.'),
  g4Item('A farm harvests 4,875 kg and 3,690 kg, then sells 5,240 kg. How much remains?',3325,8565,3225,3425,'4,875 + 3,690 - 5,240 = 3,325.'),
  g4Item('Town A has 12,450 people. Town B has 3,875 fewer, and Town C has 1,260 more than B. What is Town C\'s population?',9835,8575,9715,11190,'Town B: 12,450 - 3,875 = 8,575; Town C: 8,575 + 1,260 = 9,835.'),
  g4Item('A factory target is 20,000 parts. It makes 6,485 Monday, 7,920 Tuesday, and 4,775 Wednesday. How many more are needed?',820,19180,920,720,'Total is 19,180; the shortfall is 20,000 - 19,180 = 820.'),
  g4Item('A concert fund starts with $5,600, pays $2,345, receives $4,275 in sales, then pays $1,890. What is the balance?','$5,640','$7,530','$3,255','$5,540','5,600 - 2,345 + 4,275 - 1,890 = 5,640.'),
  g4Item('An equation is n + 2,875 - 940 = 6,210. What is n?',4275,5210,3335,4270,'n + 1,935 = 6,210, so n = 4,275.'),
  g4Item('An equation is 15,000 - n + 2,450 = 9,825. What is n?',7625,5175,10075,7620,'17,450 - n = 9,825, so n = 7,625.'),
  g4Item('A reservoir gains 8,750 liters, loses 12,380, and ends with 21,640. How much water was present initially?',25270,21640,28990,16630,'Let w + 8,750 - 12,380 = 21,640; w - 3,630 = 21,640; w = 25,270.'),
  g4Item('A company budgeted $50,000. After two expenses, $18,675 remains. The first expense was $14,980. What was the second?','$16,345','$35,020','$20,695','$15,345','Second expense = 50,000 - 14,980 - 18,675 = 16,345.')
]);

g4Register("math","L16","4.3(D)","Compare two fractions with different numerators and denominators using >, =, or <",[
  g4Item('Which symbol makes 3/5 __ 2/5 true?','>','<','=','+','Same denominator: 3 parts are greater than 2 parts.'),
  g4Item('Which symbol makes 4/7 __ 6/7 true?','<','>','=','x','Same denominator: 4 parts are less than 6 parts.'),
  g4Item('Which is greater, 2/3 or 2/5?','2/3','2/5','They are equal','Cannot compare','With equal numerators, the fraction with fewer equal parts in the whole is larger.'),
  g4Item('Which is less, 5/8 or 5/6?','5/8','5/6','They are equal','Both exceed 1','With equal numerators, eighths are smaller than sixths.'),
  g4Item('Compare 3/4 and 5/8.','3/4 > 5/8','3/4 < 5/8','3/4 = 5/8','Both equal 1/2','3/4=6/8, which is greater than 5/8.'),
  g4Item('Compare 4/6 and 7/12.','4/6 > 7/12','4/6 < 7/12','4/6 = 7/12','Both equal 3/4','4/6=8/12, which is greater than 7/12.'),
  g4Item('Which fraction is below 1/2?','5/12','6/11','4/7','7/13','5/12 is below 6/12; the others exceed half their denominators.'),
  g4Item('Which fraction is above 3/4?','7/8','5/7','8/12','9/13','7/8 exceeds 6/8, which is 3/4.'),
  g4Item('Order least to greatest: 2/5, 3/8, 1/2.','3/8, 2/5, 1/2','2/5, 3/8, 1/2','1/2, 2/5, 3/8','3/8, 1/2, 2/5','Using fortieths: 15/40, 16/40, 20/40.'),
  g4Item('Order greatest to least: 7/10, 2/3, 3/5.','7/10, 2/3, 3/5','2/3, 7/10, 3/5','7/10, 3/5, 2/3','3/5, 2/3, 7/10','Decimal or common-denominator values are .7, about .667, and .6.'),
  g4Item('Which fraction is closer to 1/2?','6/11','4/9','7/10','3/8','6/11 is 1/22 above 1/2; the other distances are larger.'),
  g4Item('Which fraction is farther below 1?','5/8','7/9','11/12','13/16','5/8 lacks 3/8, the largest distance from 1.'),
  g4Item('Compare 7/12 and 5/9.','7/12 > 5/9','7/12 < 5/9','7/12 = 5/9','Both equal 2/3','Cross-products 63 and 60 show 7/12 is greater.'),
  g4Item('Compare 8/15 and 5/9.','8/15 < 5/9','8/15 > 5/9','8/15 = 5/9','Both equal 1/2','Cross-products 72 and 75 show 8/15 is less.'),
  g4Item('Which fraction belongs between 3/5 and 2/3?','5/8','7/10','1/2','3/4','3/5=.6, 5/8=.625, and 2/3 is about .667.'),
  g4Item('Which list is correctly ordered?','4/7 < 3/5 < 5/8','3/5 < 4/7 < 5/8','5/8 < 3/5 < 4/7','4/7 < 5/8 < 3/5','Values are about .571, .6, and .625.'),
  g4Item('A fraction a/b is greater than 1/2. Which condition must hold for positive whole numbers?','2a > b','a > b','2a < b','a = 1','Cross-multiplying a/b > 1/2 gives 2a > b.'),
  g4Item('Which comparison is closest but still true?','11/14 > 7/9','5/8 > 2/3','3/5 > 5/8','4/7 > 3/5','Cross-products for 11/14 and 7/9 are 99 and 98, a difference of only 1.'),
  g4Item('A student uses 1/2 as a benchmark for 7/13 and 5/9. What can be concluded?','Both exceed 1/2, so another strategy is needed to compare them','7/13 is smaller because 13 is larger','They are equal to 1/2','5/9 is automatically greater','Benchmarking shows location relative to 1/2 but does not order two fractions on the same side.'),
  g4Item('Which is greatest: 13/18, 8/11, 11/15, or 3/4?','3/4','13/18','8/11','11/15','Cross-comparisons or decimals show .75 exceeds about .722, .727, and .733.')
]);

g4Register("math","L17","4.3(A)","Represent a fraction a/b as a sum of unit fractions 1/b, including when a is greater than b",[
  g4Item('Write 5/4 as a mixed number.','1 1/4','1 4/5','2 1/4','4 1/5','Four fourths make 1, with 1/4 left.'),
  g4Item('Write 7/3 as a mixed number.','2 1/3','1 4/3','2 3/7','3 1/3','Six thirds make 2, with 1/3 left.'),
  g4Item('Write 9/5 as a mixed number.','1 4/5','2 1/5','1 5/9','4 1/5','Five fifths make 1, leaving four fifths.'),
  g4Item('Write 11/4 as a mixed number.','2 3/4','3 1/4','2 4/11','1 7/4','Eight fourths make 2, leaving 3/4.'),
  g4Item('Write 2 1/3 as an improper fraction.','7/3','6/3','5/3','7/2','Two wholes are 6/3; add 1/3 to get 7/3.'),
  g4Item('Write 3 2/5 as an improper fraction.','17/5','15/5','11/5','17/3','Three wholes are 15/5; plus 2/5 is 17/5.'),
  g4Item('Which sum of unit fractions equals 4/7?','1/7 + 1/7 + 1/7 + 1/7','1/4 + 1/4 + 1/4 + 1/4','1/7 + 3/7','4 x 1/4','Four copies of 1/7 sum to 4/7.'),
  g4Item('Which sum represents 6/5 as unit fractions?','six copies of 1/5','five copies of 1/6','one copy of 6/5','six copies of 1/6','The numerator counts six unit fractions of size 1/5.'),
  g4Item('Decompose 1 3/8 into a whole number and a fraction.','1 + 3/8','3 + 1/8','1 + 8/3','8/8 + 8/3','A mixed number directly names 1 whole plus 3/8.'),
  g4Item('Which decomposition equals 2 5/6?','2 + 3/6 + 2/6','2 + 5/12','1 + 5/6','2 + 6/5','3/6+2/6=5/6, so the sum is 2 5/6.'),
  g4Item('Write 14/6 as a mixed number in simplest form.','2 1/3','2 2/6','1 8/6','3 1/6','14/6=2 2/6, and 2/6 simplifies to 1/3.'),
  g4Item('Write 18/8 as a mixed number in simplest form.','2 1/4','2 2/8','1 10/8','3 1/8','18/8=2 2/8=2 1/4.'),
  g4Item('Which is greater, 2 3/5 or 13/5?','They are equal','2 3/5','13/5','Cannot compare forms','2 3/5 = (10+3)/5 = 13/5.'),
  g4Item('Which improper fraction equals 4 7/9?','43/9','36/9','35/9','43/4','4 x 9 + 7 = 43.'),
  g4Item('A trail is 17/4 miles. Which mixed number names the distance?','4 1/4','3 5/4','4 4/17','5 1/4','16/4 is 4 wholes, leaving 1/4.'),
  g4Item('A tank holds 3 5/8 liters. Which unit-fraction expression represents it?','3 + five copies of 1/8','3 + eight copies of 1/5','5 + three copies of 1/8','3 + one copy of 5/8 only','The numerator 5 counts five unit eighths after 3 wholes.'),
  g4Item('Complete: 2 7/10 = 1 + __/10.','17/10','7/10','27/10','10/17','One of the two wholes is 10/10; 10/10+7/10=17/10.'),
  g4Item('Which decomposition of 19/6 shows its mixed-number form?','18/6 + 1/6 = 3 1/6','12/6 + 7/6 = 2 7/6 only','19/6 + 0/6 = 19 0/6','6/6 + 13/6 = 1 13/6 only','18/6 forms 3 wholes with 1/6 remaining.'),
  g4Item('A mixed number is equivalent to 29/7. Which is it?','4 1/7','3 8/7','4 7/29','5 1/7','28/7 is 4, leaving 1/7.'),
  g4Item('If n/8 = 5 3/8, what is n?',43,40,45,53,'Five wholes are 40/8; adding 3/8 gives 43/8.')
]);

g4Register("math","L18","4.2(B)","Represent the value of digits in whole numbers and decimals to the hundredths using expanded notation and numerals",[
  g4Item('In 4.7, what value does the digit 7 represent?','seven tenths','seven hundredths','seven ones','seventy','The first place to the right of the decimal is tenths.'),
  g4Item('In 3.45, what value does the digit 5 represent?','five hundredths','five tenths','five ones','fifty','The second decimal place is hundredths.'),
  g4Item('Which numeral represents 6 ones and 2 tenths?',6.2,6.02,62,0.62,'Six ones plus two tenths is 6.2.'),
  g4Item('Which numeral represents 8 tenths and 4 hundredths?',0.84,8.4,0.48,84,'0.8 + 0.04 = 0.84.'),
  g4Item('Write 5.36 in expanded notation.','5 + 0.3 + 0.06','5 + 0.03 + 0.6','50 + 3 + 0.6','5 + 3 + 6','The digits represent 5 ones, 3 tenths, and 6 hundredths.'),
  g4Item('Which decimal equals 7 + 4/10 + 2/100?',7.42,7.24,74.2,7.402,'Four tenths and two hundredths after 7 make 7.42.'),
  g4Item('In 12.68, how many times the value of 8 is the value of 6?','7.5 times','10 times','75 times','8 times','Six tenths is 0.6 and eight hundredths is 0.08; 0.6 / 0.08 = 7.5.'),
  g4Item('Which statement about 0.40 and 0.4 is true?','They have equal value','0.40 is ten times 0.4','0.4 is ten times 0.40','0.40 is smaller','A trailing zero does not change decimal value.'),
  g4Item('Which digit is in the hundredths place of 19.27?',7,2,9,1,'The hundredths place is the second digit right of the decimal.'),
  g4Item('What is the value of the 3 in 403.52?',3,30,0.3,300,'The 3 is in the ones place.'),
  g4Item('Which decimal is greater, 4.09 or 4.9?',4.9,4.09,'They are equal',4.099,'4.9 is 4.90, greater than 4.09.'),
  g4Item('Order least to greatest: 0.7, 0.07, 0.77.','0.07, 0.7, 0.77','0.7, 0.07, 0.77','0.77, 0.7, 0.07','0.07, 0.77, 0.7','Write hundredths: 0.07, 0.70, 0.77.'),
  g4Item('Which number has a 6 worth six hundredths?','2.06','2.6','6.2','0.6','In 2.06, the 6 is in the hundredths place.'),
  g4Item('A number has 4 tens, 3 ones, 8 tenths, and 5 hundredths. What is it?',43.85,438.5,43.58,4.385,'40+3+0.8+0.05=43.85.'),
  g4Item('What number is 0.01 greater than 6.49?',6.5,6.48,6.59,7.49,'6.49+0.01=6.50, which is 6.5.'),
  g4Item('What number is one tenth less than 12.03?',11.93,12.02,11.03,12.13,'12.03-0.10=11.93.'),
  g4Item('Which expression equals 305.47?','300 + 5 + 0.4 + 0.07','30 + 5 + 0.4 + 0.7','300 + 50 + 0.47','305 + 4 + 7','Each addend represents the correct place value.'),
  g4Item('A student writes 9.305 for 9 ones, 3 tenths, and 5 hundredths. What is the correct numeral?',9.35,9.305,9.053,93.5,'There are no thousandths in the description; 9+0.3+0.05=9.35.'),
  g4Item('If the tenths digit in 18.64 is increased by 2, what number results?',18.84,20.64,18.66,18.46,'Increasing 6 tenths by 2 tenths changes it to 8 tenths.'),
  g4Item('Which number satisfies: its hundredths digit is twice its tenths digit, and its value is between 3.2 and 3.3?',3.24,3.42,3.28,3.12,'Between 3.2 and 3.3 fixes the tenths digit at 2; twice 2 is 4 hundredths.')
]);

g4Register("math","L19","4.7(E)","Determine an unknown angle measure formed by two non-overlapping adjacent angles",[
  g4Item('A right angle is split into 30 degrees and x. What is x?',60,30,90,120,'Adjacent parts total 90 degrees, so 90-30=60.'),
  g4Item('A right angle is split into 45 degrees and x. What is x?',45,35,55,90,'90-45=45.'),
  g4Item('A 100-degree angle is split into 35 degrees and x. Find x.',65,55,75,135,'100-35=65.'),
  g4Item('A 120-degree angle contains adjacent angles of 50 degrees and x. Find x.',70,60,80,170,'120-50=70.'),
  g4Item('Adjacent angles measure 25 degrees and 40 degrees. What is their combined angle?',65,55,75,100,'Non-overlapping adjacent angle measures add: 25+40=65.'),
  g4Item('Adjacent angles measure 38 degrees and 47 degrees. What is the whole angle?',85,75,95,90,'38+47=85.'),
  g4Item('A straight angle is split into 75 degrees and x. Find x.',105,95,115,255,'A straight angle is 180 degrees; 180-75=105.'),
  g4Item('A straight angle is split into 118 degrees and x. Find x.',62,52,72,298,'180-118=62.'),
  g4Item('Three adjacent angles form 150 degrees. Two are 35 and 48 degrees. Find the third.',67,57,77,83,'150-35-48=67.'),
  g4Item('Three adjacent angles form a right angle. Two are 18 and 27 degrees. Find the third.',45,35,55,63,'90-18-27=45.'),
  g4Item('An angle is 132 degrees. One part is twice 44 degrees? If one adjacent part is 44, find the other.',88,78,98,176,'132-44=88.'),
  g4Item('Two adjacent angles form 164 degrees. One is 29 degrees larger than 60 degrees. What is the other?',75,65,89,104,'The known angle is 89; 164-89=75.'),
  g4Item('Angles a and b are adjacent and total 90 degrees. If a=3x and b=2x, what is x?',18,15,20,30,'5x=90, so x=18.'),
  g4Item('Angles a and b form a straight angle. If a=110 degrees and b=x+20, what is x?',50,70,40,90,'110+x+20=180, so x=50.'),
  g4Item('A 140-degree angle is split in the ratio 3:4. What is the larger angle?',80,60,70,100,'Seven equal parts make 140, so each is 20; 4 parts are 80.'),
  g4Item('A right angle is divided into three angles in the ratio 1:2:3. What is the largest?',45,30,15,60,'Six equal parts total 90, so each is 15; the largest is 3x15=45.'),
  g4Item('Two adjacent angles total 126 degrees. The larger is 18 degrees more than the smaller. Find the larger.',72,54,63,90,'Half of 126-18 is 54; the larger is 54+18=72.'),
  g4Item('Three adjacent angles total 180 degrees. The first is 2x, second 3x, and third 4x. Find the second.',60,40,80,20,'9x=180, so x=20 and 3x=60.'),
  g4Item('A 160-degree angle is split into x, x+10, and x+30. Find x.',40,30,50,60,'3x+40=160, so 3x=120 and x=40.'),
  g4Item('A straight angle contains adjacent angles 2x+10 and 3x-5. Find the larger angle.',100,80,95,105,'5x+5=180, so x=35; the angles are 80 and 100 degrees.')
]);

g4Register("math","L20","4.5(D)","Solve problems related to perimeter and area of rectangles with whole-number dimensions",[
  g4Item('A rectangle is 6 units long and 4 units wide. What is its area?','24 square units','20 square units','10 square units','48 square units','Area=length x width=6x4=24.'),
  g4Item('A rectangle is 9 m long and 3 m wide. What is its perimeter?','24 m','27 m','12 m','18 m','Perimeter=2(9)+2(3)=24 m.'),
  g4Item('A square has side length 7 cm. What is its area?','49 square cm','28 square cm','14 square cm','56 square cm','Area=7x7=49 square cm.'),
  g4Item('A square has side length 12 ft. What is its perimeter?','48 ft','144 ft','24 ft','36 ft','Perimeter=4x12=48 ft.'),
  g4Item('A rectangle has area 40 square units and width 5. What is its length?',8,10,35,45,'Length=area/width=40/5=8.'),
  g4Item('A rectangle has perimeter 30 units and length 9. What is its width?',6,12,21,3,'2(9)+2w=30; 2w=12; w=6.'),
  g4Item('A garden is 14 m by 8 m. How much fencing surrounds it?','44 m','112 m','22 m','36 m','The fence is the perimeter: 2(14+8)=44 m.'),
  g4Item('A floor is 15 ft by 11 ft. How many square feet of tile are needed?','165 square ft','52 square ft','26 square ft','176 square ft','Tile covers area: 15x11=165.'),
  g4Item('Two rectangles both have area 36. Which could be their dimensions?','4x9 and 6x6','3x12 and 5x7','2x18 and 4x8','1x36 and 5x6','4x9 and 6x6 both have product 36.'),
  g4Item('Which rectangle has the greatest perimeter if each has area 24?','1 by 24','2 by 12','3 by 8','4 by 6','Perimeters are 50, 28, 22, and 20; 1 by 24 is greatest.'),
  g4Item('A rectangular field is 25 m by 18 m. A 4 m-wide gate needs no fence. How much fence is needed?','82 m','86 m','78 m','450 m','Full perimeter is 2(25+18)=86; subtract the 4 m gate to get 82.'),
  g4Item('A 16 by 12 rectangle is divided into two equal rectangles along the 16-unit side. What is each smaller area?','96 square units','192 square units','56 square units','48 square units','Total area is 192; half is 96.'),
  g4Item('A rectangle has length twice its width. If width is 7, what are its area and perimeter?','98 square units and 42 units','49 square units and 28 units','98 square units and 28 units','42 square units and 98 units','Length=14; area=14x7=98 and perimeter=2(14+7)=42.'),
  g4Item('A rectangle has perimeter 64 and width 12. What is its area?','240 square units','384 square units','320 square units','192 square units','2l+24=64, so l=20; area=20x12=240.'),
  g4Item('A square and a 6-by-24 rectangle have equal area. What is the square\'s side length?',12,24,6,18,'The rectangle area is 144; sqrt(144)=12.'),
  g4Item('A 20-by-15 garden has a 5-by-4 pond inside. What land area remains?','280 square units','300 square units','20 square units','320 square units','Garden area 300 minus pond area 20 equals 280.'),
  g4Item('A rectangle\'s length increases from 10 to 13 while width stays 6. How much does area increase?','18 square units','3 square units','60 square units','78 square units','Area increase=(13-10)x6=18.'),
  g4Item('A rectangle has area 180 and whole-number width 12. What is its perimeter?',54,27,192,384,'Length=180/12=15; perimeter=2(15+12)=54.'),
  g4Item('A farmer divides a 30-by-18 field into two rectangles with a fence parallel to the 18-unit side. What is the total outer perimeter plus divider length?',114,96,108,126,'Outer perimeter=96; divider=18; total fence=114.'),
  g4Item('A rectangle has perimeter 70. Its length is 5 more than its width. What is its area?','300 square units','350 square units','150 square units','275 square units','l+w=35 and l=w+5, so w=15, l=20, area=300.')
]);

function gen_g4_math_L1(){return g4BankQuestion("math","L1");}
function gen_g4_math_L2(){return g4BankQuestion("math","L2");}
function gen_g4_math_L3(){return g4BankQuestion("math","L3");}
function gen_g4_math_L4(){return g4BankQuestion("math","L4");}
function gen_g4_math_L5(){return g4BankQuestion("math","L5");}
function gen_g4_math_L6(){return g4BankQuestion("math","L6");}
function gen_g4_math_L7(){return g4BankQuestion("math","L7");}
function gen_g4_math_L8(){return g4BankQuestion("math","L8");}
function gen_g4_math_L9(){return g4BankQuestion("math","L9");}
function gen_g4_math_L10(){return g4BankQuestion("math","L10");}
function gen_g4_math_L11(){return g4BankQuestion("math","L11");}
function gen_g4_math_L12(){return g4BankQuestion("math","L12");}
function gen_g4_math_L13(){return g4BankQuestion("math","L13");}
function gen_g4_math_L14(){return g4BankQuestion("math","L14");}
function gen_g4_math_L15(){return g4BankQuestion("math","L15");}
function gen_g4_math_L16(){return g4BankQuestion("math","L16");}
function gen_g4_math_L17(){return g4BankQuestion("math","L17");}
function gen_g4_math_L18(){return g4BankQuestion("math","L18");}
function gen_g4_math_L19(){return g4BankQuestion("math","L19");}
function gen_g4_math_L20(){return g4BankQuestion("math","L20");}

/* ---------- Grade 4 Science: 28 lesson-specific banks ---------- */

g4Register("sci","L1","4.13(A)","Explore and explain how plant structures and functions enable survival in an environment",[
  g4Item('How do waxy leaves help a desert plant survive?','They reduce water loss','They absorb animals','They make soil wetter','They produce wind','A waxy coating slows evaporation from leaf surfaces.'),
  g4Item('How do deep roots help a plant in a dry environment?','They reach water far below the surface','They block all sunlight','They increase leaf temperature','They attract decomposers','Deep roots can reach water unavailable near the dry surface.'),
  g4Item('Why can broad leaves benefit a plant on a shaded forest floor?','They capture more available light','They stop roots from growing','They store rocks','They repel all insects','A larger leaf surface can intercept limited light.'),
  g4Item('How can spines benefit a cactus?','They discourage animals and reduce water-losing leaf area','They collect food from soil','They create carbon dioxide','They increase soft leaf area','Spines protect the plant and replace broad leaves that would lose more water.'),
  g4Item('What function does a thick succulent stem perform?','Stores water','Makes seeds move','Absorbs light underground','Carries pollen to other plants','Thick tissue stores water for dry periods.'),
  g4Item('Why are flexible stems useful to many water plants?','They bend with moving water instead of breaking','They keep every leaf underwater','They prevent photosynthesis','They make the plant sink','Flexibility reduces damage from currents and waves.'),
  g4Item('How do buttress roots help a tall tree in shallow tropical soil?','They provide wide support','They turn leaves into flowers','They stop rainfall','They make fruit sweeter','Wide above-ground roots stabilize a tall trunk where deep anchoring is limited.'),
  g4Item('Why do many floating leaves have air openings mainly on their upper surface?','The upper surface contacts air','The lower surface gets more sunlight','Water enters only from above','Roots cannot exchange gases','Openings above water permit gas exchange.'),
  g4Item('Air spaces in a water lily leaf most directly help the leaf do what?','Float near light','Grow deep underground','Become magnetic','Weather rock','Trapped air increases buoyancy, keeping the leaf near sunlight.'),
  g4Item('A vine has tendrils that wrap around supports. What survival function do tendrils serve?','Help the vine climb toward light','Store years of water','Make soil nutrients','Protect every seed from animals','Climbing gives leaves better access to light without building a thick trunk.'),
  g4Item('A plant in a windy grassland grows low to the ground. What advantage is most likely?','Less exposure to damaging wind','More shade from tall trees','Greater access to deep ocean water','Faster movement between habitats','Low growth reduces the force of wind on the plant.'),
  g4Item('Thick bark is most likely to help a plant survive by doing what?','Protecting living tissue from damage and temperature change','Increasing the speed of water loss','Replacing the root system','Producing food without light','Bark forms a protective outer layer.'),
  g4Item('A desert plant has shallow roots spreading far from its stem. How can this help?','Capture brief rain over a wide area','Reach the deepest groundwater only','Prevent any nearby plant growth','Store sunlight in soil','Wide shallow roots quickly collect surface water from short rains.'),
  g4Item('Needle-shaped leaves can help plants in cold or dry places because they have what advantage?','Less surface area for water loss','More surface area than broad leaves','No need for sunlight','No internal water','Small surface area and waxy coatings reduce water loss.'),
  g4Item('Why might rainforest leaves have pointed drip tips?','To shed excess water quickly','To absorb salt from air','To attach to other trees','To keep all insects away','Drip tips move heavy rain off leaves, limiting standing water and damage.'),
  g4Item('Mangrove roots rise above waterlogged mud. What challenge can this structure help solve?','Getting gases when soil spaces contain little air','Finding snow below the mud','Avoiding all salt contact','Producing fruit underwater','Above-mud root portions can exchange gases in low-oxygen soil.'),
  g4Item('A cactus and water lily have very different leaves. What best explains the difference?','Their structures function in different water conditions','One is a plant and one is not','Only the cactus needs energy','Leaves do not affect survival','Structure-function differences reflect the environmental challenges each plant faces.'),
  g4Item('During drought, plants with deeper roots survive more often than plants with shallow roots. Which explanation is supported?','Deep roots can access water that remains below dry surface soil','Deep roots create rainfall','Shallow roots use no water','Root depth changes sunlight','The survival pattern is explained by continued access to deeper moisture.'),
  g4Item('Which investigation best tests whether waxy leaves reduce water loss?','Compare equal leaves with and without a safe wax coating under the same conditions','Compare a cactus outdoors with a lily indoors','Water one plant and not the other','Measure two unrelated leaves once','Changing only the coating while holding conditions constant tests its effect.'),
  g4Item('A model plant has large leaves but no roots. What important limitation does the model have for explaining survival?','It cannot show water absorption and anchoring','It cannot show leaf color','It is too easy to carry','It contains no animal structures','Without roots, the model omits two essential plant functions.')
]);

g4Register("sci","L2","4.12(A)","Investigate and explain how most producers make food using sunlight, water, and carbon dioxide through cycling of matter",[
  g4Item('Which organism is a producer?','Grass','Rabbit','Hawk','Mushroom','Grass uses light, water, and carbon dioxide to make food.'),
  g4Item('What is the main energy source producers use to make food?','Sunlight','Soil','Wind','Moonlight','Most producers capture light energy from the Sun.'),
  g4Item('Which gas do most producers take in to make food?','Carbon dioxide','Oxygen only','Nitrogen only','Helium','Carbon dioxide supplies matter used to build sugars.'),
  g4Item('Which material do plant roots absorb that is used in food production?','Water','Sunlight','Carbon dioxide from rocks','Animal energy','Roots absorb water, which moves through the plant.'),
  g4Item('Why is a green plant called a producer?','It makes energy-rich food from simple materials','It hunts smaller organisms','It decomposes every dead organism','It creates sunlight','A producer builds its own food using light energy, water, and carbon dioxide.'),
  g4Item('Which set lists all three required inputs emphasized in Grade 4 producer studies?','Sunlight, water, and carbon dioxide','Soil, oxygen, and animals','Heat, minerals, and fungi','Rain, consumers, and decomposers','These inputs are identified in TEKS 4.12(A).'),
  g4Item('A plant receives water and carbon dioxide but is kept in darkness. What is most limited?','Its ability to make food using sunlight','Its ability to have mass','Its classification as matter','Its root depth','Without light energy, the usual food-making process is limited.'),
  g4Item('A plant has sunlight and water but no carbon dioxide. Why will food production be limited?','It lacks carbon matter used to build sugar','It lacks all energy','It cannot absorb water','It becomes a consumer','Carbon dioxide provides atoms incorporated into food molecules.'),
  g4Item('How does matter cycle when an animal eats a plant?','Matter built by the producer moves into the consumer','Sunlight becomes a solid animal','The animal creates new matter from nothing','All plant matter disappears','Atoms in producer tissue transfer to the consumer.'),
  g4Item('Which statement correctly separates matter from energy in producer food making?','Water and carbon dioxide provide matter; sunlight provides energy','Sunlight provides matter; water provides energy only','Soil creates both from nothing','Carbon dioxide is energy, not matter','Light transfers energy while water and carbon dioxide supply matter.'),
  g4Item('A student says plants get all their food from soil. What evidence challenges the claim?','Plant mass can increase using carbon dioxide, water, and light even with little soil material lost','Roots are underground','Soil can be dark','Plants may grow near animals','Much new plant matter comes from carbon dioxide and water, not pre-made food in soil.'),
  g4Item('In a sealed clear container, carbon dioxide decreases while a lit plant grows. What inference is supported?','The plant used carbon dioxide in making food','The plant destroyed matter','Light changed into carbon dioxide','The container leaked sunlight','The measured decrease during growth supports carbon dioxide use.'),
  g4Item('Which design best tests how light amount affects producer food-making growth?','Keep plant type, water, soil, and time equal while changing light amount','Use different plant species and different pots','Give one plant water and one none','Compare a plant with an animal','A fair test changes light while controlling other growth conditions.'),
  g4Item('A leaf is partly covered from light while the rest is exposed. Later, stored food is detected mostly in the exposed part. What does this support?','Light is needed for the leaf to make food','Covered leaves receive more carbon dioxide','Food comes only from roots','Darkness supplies extra energy','The within-leaf comparison links light exposure with food production.'),
  g4Item('Why are producers the entry point for most food-web energy?','They convert sunlight into stored chemical energy','They create energy from nothing','They consume every decomposer','They return all heat to the Sun','Producers capture solar energy in food that other organisms can eat.'),
  g4Item('Which change would most directly reduce food production in an aquatic producer near the water surface?','Water becomes so cloudy that little light enters','More dissolved carbon dioxide becomes available','The producer develops more leaf area','Day length increases','Cloudy water blocks the light energy the producer needs.'),
  g4Item('A plant loses leaves but keeps its roots and stem. Why may food production fall?','Less leaf surface is available to capture light and carbon dioxide','Roots stop containing matter','The stem becomes a consumer','Water no longer exists','Leaves are major sites for light capture and gas exchange.'),
  g4Item('How is conservation of matter shown when a producer grows?','Atoms from water and carbon dioxide are rearranged into plant matter','The plant creates atoms from light','Carbon dioxide loses all mass','New matter appears without inputs','Growth rearranges incoming matter rather than creating it from nothing.'),
  g4Item('Two equal plants receive the same light and water. Plant A gets normal air; Plant B gets air with much less carbon dioxide. What prediction is best supported?','Plant A will likely make more food and grow more','Plant B will create extra carbon dioxide','Both must grow identically','Plant A will stop using water','Carbon dioxide is a required material, so limiting it can limit growth.'),
  g4Item('Which explanation best connects producer structure, matter, and energy?','Roots collect water, leaves exchange gases and capture light, and the plant builds food','Roots capture sunlight while leaves absorb soil','Flowers create matter without inputs','Stems convert consumers into producers','Different structures obtain the required matter and energy for food production.')
]);

g4Register("sci","L3","4.12(B)","Describe cycling of matter and flow of energy through food webs, including the Sun, producers, consumers, and decomposers",[
  g4Item('In Sun -> grass -> rabbit, which organism is the producer?','Grass','Rabbit','Sun','None','Grass captures solar energy and makes food.'),
  g4Item('In grass -> mouse -> owl, what does the arrow from mouse to owl show?','Energy and matter move when the owl eats the mouse','The mouse hunts the owl','The owl makes food for grass','Sunlight moves backward','Food-web arrows point from a food source to its consumer.'),
  g4Item('Which sequence correctly shows one food-chain pathway?','Sun -> algae -> insect -> fish','Fish -> Sun -> algae -> insect','Insect -> algae -> Sun -> fish','Sun -> fish -> insect -> algae','Energy enters through the producer algae and transfers to consumers.'),
  g4Item('What role does a mushroom most often play in a food pathway?','Decomposer','Producer','Sun','Top consumer only','Fungi break down dead matter.'),
  g4Item('Where does most energy in a grassland food pathway begin?','The Sun','The hawk','The soil','The rabbit','Producers capture energy from the Sun.'),
  g4Item('In seeds -> mouse -> snake -> hawk, which organism is the first consumer?','Mouse','Seeds','Snake','Hawk','The mouse directly eats the producer material.'),
  g4Item('If insects eat leaves and frogs eat insects, which transfer is correct?','Leaf matter and stored energy move to insects, then frogs','Frog energy creates leaves','Insects transfer sunlight to leaves','Matter disappears at each step','Eating transfers matter and stored chemical energy along the pathway.'),
  g4Item('What happens to matter when decomposers break down a dead rabbit?','Matter returns to the environment and can cycle again','All matter becomes sunlight','Matter is destroyed','Only energy cycles into new atoms','Decomposition releases and rearranges matter for reuse.'),
  g4Item('Why does a food chain model have limitations?','Most organisms have more than one food source or predator','No organism ever eats another','Arrows cannot show direction','Chains contain too many pathways','A single chain omits the many connections in a real food web.'),
  g4Item('A drought reduces grass. What is the most direct likely effect on grass-eating insects?','Less food is available','They become producers','More solar energy is created','Decomposers disappear immediately','Reducing the producer reduces matter and stored energy available to its direct consumers.'),
  g4Item('In algae -> snail -> fish -> heron, which change most directly affects the snail first?','A drop in algae','A drop in herons','More fish predators of herons','More sunlight at night','The snail directly depends on algae as its food source.'),
  g4Item('Which statement about energy and matter is accurate?','Energy flows through a pathway, while matter can cycle','Both energy and matter disappear','Energy cycles forever with no loss','Matter flows once and cannot return','Energy is transferred and dispersed, while atoms can be reused.'),
  g4Item('A pesticide reduces caterpillars. Birds that eat caterpillars decline. Which relationship is supported?','Less prey can reduce energy available to predators','Birds make caterpillars','Pesticide adds solar energy','Caterpillars are decomposers','The predator population is affected by reduced food transfer.'),
  g4Item('What does a decomposer connect in a food pathway?','Dead organisms back to reusable matter in the environment','The Sun directly to top predators','Consumers back into sunlight','Water into new energy','Decomposers cycle matter from remains and wastes.'),
  g4Item('If an omnivore eats berries and insects, why can one straight chain be misleading?','The omnivore receives matter and energy through multiple pathways','Omnivores are producers','Berries are consumers','Insects do not contain energy','The organism participates in more than one feeding connection.'),
  g4Item('A producer stores 1,000 energy units, but its consumer obtains much less. Why?','Not all stored energy is eaten or transferred; organisms use and release energy','Energy is destroyed by arrows','Consumers cannot contain energy','Producers keep all matter forever','Transfers are incomplete because organisms use energy for life processes and some disperses as heat.'),
  g4Item('Which evidence best supports the direction of a food-chain arrow?','Observing a rabbit eat grass supports grass -> rabbit','Seeing a rabbit near grass supports rabbit -> grass','Measuring sunlight supports hawk -> Sun','Finding soil supports mouse -> soil','Direct feeding evidence identifies the food source and consumer.'),
  g4Item('A new predator eats many snakes in a chain grass -> mouse -> snake. What indirect change is plausible?','Mouse numbers may rise because fewer snakes eat them','Grass instantly disappears','Snakes become producers','Energy begins with the predator','Reducing a predator of mice can release mice from some predation.'),
  g4Item('Why must the Sun be included when explaining most food-chain energy?','It supplies the energy producers store in food','It supplies every atom in organisms','It eats producers','It decomposes dead matter','Solar energy is captured by producers at the chain base.'),
  g4Item('Which explanation fully traces matter through a pathway?','Carbon in air becomes plant tissue, moves to a rabbit, and returns through waste and decomposition','Sunlight becomes carbon and vanishes','A rabbit creates plant atoms','Matter moves only from predators to producers','The sequence shows atoms entering a producer, transferring to a consumer, and cycling back.')
]);

g4Register("sci","L4","4.12(B)","Describe cycling of matter and flow of energy through food webs, including the Sun, producers, consumers, and decomposers",[
  g4Item('What makes a food web different from a single food chain?','It shows many connected feeding pathways','It has no producers','It shows only decomposers','Its arrows point randomly','A web combines multiple intersecting food chains.'),
  g4Item('In a web, grass is eaten by rabbits and insects. What role does grass have?','Producer supporting multiple pathways','Consumer','Decomposer','Predator','Grass makes food and supplies more than one consumer.'),
  g4Item('A hawk eats mice and snakes. What does this show?','One consumer can have multiple food sources','The hawk is a producer','Mice decompose snakes','Arrows must point from hawk to Sun','Food webs include several energy pathways into one consumer.'),
  g4Item('Why are decomposers shown connected to many organisms in a web?','They use remains and waste from many parts of the web','They create every organism','They provide sunlight','They eat only producers','Dead matter and waste come from organisms at all feeding levels.'),
  g4Item('If rabbits decline, which predator relying only on rabbits is most directly affected?','The rabbit predator','Grass','The Sun','A producer not eaten by rabbits','A specialist predator loses its direct food source.'),
  g4Item('If one prey species declines, why might a generalist predator survive better than a specialist?','It can use another food pathway','It becomes a producer','It stops needing energy','It creates prey','Multiple food sources make the web more flexible.'),
  g4Item('In a pond web, algae feed insects and snails; both feed fish. How many pathways connect algae to fish?',2,1,3,4,'The paths are algae-insect-fish and algae-snail-fish.'),
  g4Item('Which arrow is correct if a fox eats a mouse?','mouse -> fox','fox -> mouse','Sun -> fox only','fox -> grass','The arrow follows transferred matter and energy from prey to consumer.'),
  g4Item('A disease reduces one producer, but herbivores switch to another producer. What web feature allows this?','Alternative feeding connections','Matter destruction','Creation of energy','Absence of consumers','Multiple pathways can buffer the effect of one change.'),
  g4Item('Why can removing a top predator increase pressure on producers?','Its prey may increase and consume more producers','Producers become predators','Sunlight decreases','Decomposers stop cycling matter','A predator decline can cause a consumer increase that affects producers.'),
  g4Item('In a web, a mouse eats seeds and insects and is eaten by owls. Which roles does it have?','Consumer in multiple pathways','Producer and Sun','Decomposer only','Nonliving resource','The mouse consumes two food sources and transfers energy to an owl.'),
  g4Item('Which change most likely reduces energy entering an entire meadow web?','Less plant growth from prolonged darkness','One owl moves away','More decomposers appear','One mouse changes nests','Producers are the main entry point for energy, so broad plant reduction affects the whole web.'),
  g4Item('A web model omits microorganisms. What important process may be underrepresented?','Decomposition and matter cycling','Solar energy input','Predation by hawks','Plant root depth','Many microorganisms are decomposers that recycle matter.'),
  g4Item('How can matter from a top predator return to producers?','Decomposers release matter that producers take up','Predators turn directly into sunlight','Energy creates new atoms','Producers eat the predator whole','Decomposition returns atoms to soil, water, and air.'),
  g4Item('A pesticide harms insects. Birds eat insects and hawks eat birds. Which indirect effect is plausible?','Hawks may receive less energy through fewer birds','Hawks become producers','Birds gain more insect food','Plants stop using sunlight','A change can move through connected consumer levels.'),
  g4Item('Which observation best validates two arrows in a web?','Repeatedly observing snails eat algae and fish eat snails','Seeing fish and algae in one pond','Counting rocks near snails','Measuring water once','Direct feeding observations support both transfer connections.'),
  g4Item('Why does energy not cycle through a food web the way matter does?','Organisms use energy and much disperses as heat','Energy is made of atoms','Decomposers destroy matter','The Sun recycles every heat unit','Energy transfers one way and becomes less available, while matter is reused.'),
  g4Item('Two webs have equal species counts. Web A has many alternate links; Web B has one link per consumer. Which may better resist loss of one food source?','Web A','Web B','Both must respond identically','Neither contains energy','Alternate links offer substitute pathways.'),
  g4Item('An invasive consumer eats both a native producer and insects. Why could its effect spread widely?','It changes more than one connected pathway','It creates a new Sun','Only producers are affected by consumers','Webs prevent indirect effects','The consumer competes for or removes resources in multiple pathways.'),
  g4Item('Which explanation best evaluates a food-web change?','Trace direct and indirect effects across several pathways and distinguish energy flow from matter cycling','Look only at the largest predator','Assume every population changes equally','Count arrows without interpreting them','A system explanation follows linked consequences and the different behavior of energy and matter.')
]);

g4Register("sci","L5","4.11(C)","Determine physical properties of rocks that allow Earth's natural resources to be stored there",[
  g4Item('Which rock property describes empty spaces between particles?','Porosity','Magnetism','Temperature','Color only','Porosity is the amount of open space in rock.'),
  g4Item('Which property describes how easily a fluid moves through connected spaces in rock?','Permeability','Mass','Hardness','Luster','Permeability depends on connected pathways.'),
  g4Item('A rock has many pores that are not connected. What can be high while fluid flow stays low?','Porosity','Permeability','Temperature','Magnetism','Unconnected pores provide storage space but poor flow.'),
  g4Item('Why can porous rock store groundwater?','Water can occupy pore spaces','Water becomes rock energy','Every pore creates sunlight','Rock destroys water mass','Open spaces can hold water.'),
  g4Item('Which sample would likely allow water to pass fastest?','A rock with large connected pores','A solid glass-like rock with no cracks','A rock with sealed pores','A metal block','Large connected spaces increase permeability.'),
  g4Item('Which observation is evidence of permeability?','Water poured on a sample emerges from its bottom','The sample has a dark color','The sample has greater mass','A magnet attracts the sample','Moving through the sample demonstrates connected pathways.'),
  g4Item('Two rocks have equal volume. Rock A absorbs more water. What property is probably greater in A?','Porosity','Temperature','Magnetism','Surface color','Greater absorbed volume suggests more pore space.'),
  g4Item('What does an impermeable rock layer do beneath a porous layer?','Limits downward fluid movement','Creates new groundwater','Increases solar energy','Turns oil into rock','Low permeability can trap fluids above it.'),
  g4Item('Why may oil or natural gas collect in porous rock under a sealing layer?','Pores store the fluid and the seal limits escape','The seal creates fossil fuels instantly','Porous rock has no spaces','Gravity stops acting underground','Storage plus a low-permeability barrier can form a reservoir.'),
  g4Item('Which model best represents a porous, permeable rock?','Connected gaps among packed beads','A solid block with no openings','Sealed bubbles in clay','One painted surface','Connected bead spaces can both store and transmit fluid.'),
  g4Item('A sponge is used as a rock model. What property can it represent well?','Pore space that holds fluid','Rock age','Mineral chemistry','Underground temperature','Sponge holes illustrate storage spaces.'),
  g4Item('What is a limitation of using a sponge to model reservoir rock?','Its material and pore structure differ from real rock','It contains visible holes','It can absorb water','It has measurable mass','The analogy shows pores but not all real rock properties.'),
  g4Item('Which investigation compares rock water-storage capacity fairly?','Use equal-volume dry samples and measure water absorbed','Use different sample sizes without recording them','Pour different water amounts on each sample','Judge storage by color','Equal volume and measured absorption isolate storage capacity.'),
  g4Item('Which investigation compares permeability fairly?','Time equal water volumes moving through equal-size samples','Weigh one wet rock and one dry rock','Compare colors after rain','Use different water volumes and times','Controlled size and volume allow flow rate comparison.'),
  g4Item('A rock stores much water but releases it very slowly. Which description fits?','High porosity and low permeability','Low porosity and high permeability','No pores and high flow','High magnetism only','Many poorly connected pores can store water but restrict movement.'),
  g4Item('A rock stores little water but water passes through cracks quickly. Which description fits?','Low pore volume with high crack permeability','High porosity with no permeability','No openings at all','High density creates water','Cracks can transmit water even when total storage space is limited.'),
  g4Item('Why is grain sorting relevant to pore space?','Similarly sized grains may leave more connected spaces than mixed grains that fill gaps','Sorting changes rock into sunlight','Large grains eliminate all gaps','Color controls every pore','Small particles can fill spaces between larger ones.'),
  g4Item('Pressure closes some rock pores. What change is most directly expected?','Storage capacity decreases','New matter appears','Magnetism doubles','Water becomes solid','Less open volume means less space for stored fluid.'),
  g4Item('Data show Sample A absorbs 18 mL and passes 10 mL/min; B absorbs 25 mL and passes 2 mL/min. Which conclusion is supported?','B stores more but transmits water more slowly','A stores more and flows more slowly','B has no pores','A is impermeable','Absorption estimates storage, while flow rate estimates permeability.'),
  g4Item('Which explanation links rock properties to responsible groundwater management?','Storage and flow measurements help predict supply and movement of contamination','Rock color alone identifies all water sources','Groundwater is not matter','Permeability prevents any pollution','Understanding porosity and permeability helps estimate reserves and contaminant pathways.')
]);

g4Register("sci","L6","4.10(B)","Model and describe slow changes to Earth's surface caused by weathering, erosion, and deposition from water, wind, and ice",[
  g4Item('What is weathering?','Breaking rock into smaller pieces in place','Moving sediment to a new place','Dropping sediment','Melting all rock','Weathering changes rock without necessarily moving it.'),
  g4Item('Water freezes in a rock crack and expands. What process can result?','Weathering','Deposition','Photosynthesis','Magnetism','Expansion widens the crack and breaks rock.'),
  g4Item('Plant roots grow into cracks and widen them. This is an example of what?','Weathering','Evaporation','Deposition','Energy production','Root growth physically breaks rock in place.'),
  g4Item('Sand carried by wind scrapes a cliff. What process wears the cliff surface?','Weathering by abrasion','Food-web cycling','Condensation','Electrical conduction','Moving particles grind the rock surface.'),
  g4Item('Why do repeated heating and cooling weather some rocks?','Different expansion and contraction can create cracks','Heat creates new rock matter','Cooling removes gravity','Temperature changes transport every fragment','Stress from repeated size change can fracture rock.'),
  g4Item('Acidic rainwater slowly dissolves some limestone. What type of surface change is this?','Chemical weathering','Deposition','Freezing only','Magnetic attraction','A chemical interaction changes and dissolves rock material.'),
  g4Item('Which observation shows weathering but not erosion?','A boulder develops cracks but remains in place','Sand moves down a river','Wind carries dust away','A delta grows','Breaking in place is weathering; movement would be erosion.'),
  g4Item('Why can smaller rock fragments weather faster than one solid rock of equal total mass?','They expose more surface area','They contain less matter','They stop contacting water','They create cold energy','More surface is available for water, air, and abrasion to act on.'),
  g4Item('Which model best shows freeze-thaw weathering?','Repeatedly freeze safe water in a cracked model material','Blow dry sand across a tray','Pour water down a slope','Drop sediment where flow slows','Freeze-thaw specifically involves water expansion in cracks.'),
  g4Item('What limitation should be stated for a quick classroom weathering model?','It speeds up a process that may take years outdoors','It cannot show any change','Models are identical to nature','Weathering occurs only in classrooms','Accelerated cycles model the mechanism, not the natural time scale.'),
  g4Item('A rock sample loses 2 g after repeated abrasion trials. What evidence does the mass change provide?','Material was weathered from the sample','The sample gained matter','Gravity stopped','The sample became a producer','Lost mass indicates fragments were worn away.'),
  g4Item('Two identical chalk pieces are placed in plain and mildly acidic water. More mass is lost in acidic water. What is supported?','Acidity increased chemical weathering in this test','Plain water creates more acid','Chalk mass is not measurable','The acid produced new chalk','The controlled comparison links acidity with greater material loss.'),
  g4Item('Why are mountain rocks often angular near where they break but rounder after long transport?','Weathering and abrasion wear sharp edges','Gravity creates corners during transport','Deposition sharpens every rock','Round rocks cannot weather','Repeated collisions wear projections over time.'),
  g4Item('How can weathering prepare material for erosion?','It creates smaller fragments that can be transported','It prevents all movement','It turns matter into energy','It deposits sediment immediately','Breaking rock produces sediment that agents can carry.'),
  g4Item('Which condition would likely increase freeze-thaw weathering?','Frequent temperature changes above and below freezing with water present','Constant warm dry weather','No cracks and no water','Permanent deep freezing without thawing','Repeated freezing and thawing drives expansion cycles.'),
  g4Item('Why may a sheltered rock surface weather more slowly than an exposed one?','It receives less water, wind abrasion, and temperature change','Shelter removes its mass','Exposed rocks contain no minerals','Weathering requires sunlight only','Exposure affects contact with weathering agents.'),
  g4Item('A student compares soft chalk and hard granite under equal abrasion. Why control the abrasion amount?','To test how material properties affect weathering','To make both samples identical materials','To eliminate all change','To measure sunlight','Equal abrasion isolates the sample property as the comparison.'),
  g4Item('Cracks increase after 20 wet-dry cycles. Which cause-and-effect claim fits the evidence?', 'Repeated wetting and drying contributed to cracking','Cracking caused the cycles','The rock created water','One cycle always destroys rock','The measured pattern links repeated cycles to gradual change.'),
  g4Item('Which sequence is most accurate?','Rock weathers into sediment, then sediment may be eroded','Sediment deposits, then creates weathering energy','Erosion creates unbroken bedrock','Weathering always follows deposition','Weathering commonly creates the particles later transported.'),
  g4Item('Why is weathering considered part of a system of surface change?','It interacts with erosion and deposition to reshape land over time','It occurs without matter','It always makes land higher','It has no causes or effects','The products of one process become material for the others.')
]);

g4Register("sci","L7","4.10(B)","Model and describe slow changes to Earth's surface caused by weathering, erosion, and deposition from water, wind, and ice",[
  g4Item('What is erosion?','Movement of sediment from one place to another','Breaking rock only in place','Dropping sediment','Making plant food','Erosion transports weathered material.'),
  g4Item('What is deposition?','Dropping transported sediment','Breaking bedrock in place','Creating water','Moving every rock uphill','Deposition occurs when an agent loses energy and leaves material.'),
  g4Item('A river carries sand downstream. Which process is occurring?','Erosion','Deposition only','Photosynthesis','Condensation','Flowing water transports sediment.'),
  g4Item('Sand settles where a river enters a calm lake. Which process is occurring?','Deposition','Weathering only','Evaporation','Magnetism','Slower water drops sediment.'),
  g4Item('Wind lifts soil from a bare field. What process is this?','Erosion by wind','Deposition by ice','Chemical weathering','Food production','Wind is moving sediment away.'),
  g4Item('A sand dune grows where wind slows behind plants. What process builds the dune?','Deposition','Weathering','Melting','Conduction','Slower wind drops carried sand.'),
  g4Item('How can a glacier erode land?','Moving ice drags and scrapes rock material','Ice creates soil from sunlight','A glacier never moves','Cold destroys matter','Flowing ice transports embedded rock and abrades surfaces.'),
  g4Item('A glacier melts and leaves a pile of rocks. What process formed the pile?','Deposition','Photosynthesis','Magnetic repulsion','Evaporation only','Melting ice loses its ability to carry the rock load.'),
  g4Item('Why does fast water usually carry larger particles than slow water?','Faster flow transfers more force to sediment','Large particles have no mass','Slow water increases gravity','Water creates the particles','Greater flow energy can move heavier material.'),
  g4Item('Which stream location is most likely to show deposition?','Inside a bend where water moves more slowly','A steep narrow rapid','The fastest center current','A waterfall edge','Lower speed on an inside bend favors sediment settling.'),
  g4Item('Which stream location often erodes fastest?','Outside a bend with faster current','A still backwater','A dry floodplain','Behind a barrier where sand collects','Faster outside flow exerts greater force on the bank.'),
  g4Item('How do plant roots often reduce erosion?','They hold soil and slow runoff','They eliminate gravity','They increase bare soil','They turn sediment into energy','Roots stabilize particles and vegetation reduces water speed.'),
  g4Item('Which fair model tests how slope affects water erosion?','Keep soil and water equal while changing only slope','Change soil, water, and slope together','Use one tray with no comparison','Measure plant height','Controlling other variables isolates slope.'),
  g4Item('A steeper tray loses 40 g of soil; a gentle tray loses 12 g under equal rain. What conclusion is supported?','Greater slope increased erosion in this model','Gentle slopes always gain soil','Rain has no effect','Soil was destroyed','The measured loss is greater for the steeper controlled condition.'),
  g4Item('What limitation does a stream-table model have?','Its time, scale, and materials differ from a real river','It cannot move any water','It shows every river exactly','It contains too much gravity','Models simplify natural systems.'),
  g4Item('After a wildfire removes plants, erosion increases during rain. What cause is most plausible?','Less root anchoring and ground cover','Fire increases gravity','Rain becomes solid','Sediment becomes magnetic','Vegetation loss exposes and loosens soil.'),
  g4Item('A dam slows river water and sediment collects behind it. What relationship is shown?','Reduced speed increases deposition','Reduced speed increases erosion only','The dam creates sediment atoms','Deposition speeds the water','Lower transport energy causes material to settle.'),
  g4Item('Beach sand disappears during strong waves and later returns during calmer waves. Which explanation fits?','Energy changes shift the balance between erosion and deposition','Sand is destroyed and recreated','Gravity turns off seasonally','Only weathering occurs','Stronger waves transport sand away; calmer conditions can deposit it.'),
  g4Item('Which evidence best distinguishes erosion from deposition on a slope?', 'A source area loses measured sediment while a lower area gains it','Both areas have the same color','The slope receives sunlight','A rock cracks without moving','Paired loss and gain show transport followed by settling.'),
  g4Item('How should an engineer reduce erosion beside a path while allowing water flow?','Use vegetation and a designed drainage route','Remove all plants and steepen the slope','Block every outlet so water pools','Add loose bare soil','Stabilization plus controlled runoff addresses both cause and function.')
]);

g4Register("sci","L8","4.10(B)","Model and describe slow changes to Earth's surface caused by weathering, erosion, and deposition from water, wind, and ice",[
  g4Item('Which processes can gradually reshape a canyon?','Weathering and erosion by water','Only plant food production','Magnetic attraction only','Moon phases only','Rock breakdown and sediment transport deepen and widen landforms.'),
  g4Item('How can deposition create a delta?','A river slows and drops sediment near its mouth','A river speeds up and dissolves every particle','Ice freezes the ocean instantly','Wind removes all sediment','Repeated deposits build land outward.'),
  g4Item('How can wind change a dune over time?','Erode sand from one side and deposit it on another','Create new sand matter','Stop gravity','Turn sand into water','Transport and deposition make dunes migrate.'),
  g4Item('How can a glacier change a valley?','Erode rock as it moves and deposit material as it melts','Produce sunlight underground','Prevent all weathering','Change rock into organisms','Ice both transports/abrades and later deposits sediment.'),
  g4Item('Which change is usually slow rather than sudden?','A river gradually widening its valley','A single landslide','A volcanic explosion','An earthquake crack','Valley reshaping by repeated flow commonly occurs over long periods.'),
  g4Item('Why can small yearly changes produce a large landform?','Effects accumulate over many cycles','Matter appears from nothing','Each year gravity doubles','The first change predicts exact size','Repeated erosion or deposition builds cumulative change.'),
  g4Item('A cliff retreats as waves remove material at its base. What sequence explains the change?','Weathering weakens rock, erosion removes it, and collapse moves the edge inland','Deposition builds the cliff seaward only','Sunlight creates waves','The cliff loses no matter','Connected processes undercut and shift the cliff.'),
  g4Item('A floodplain grows when floods spread and slow. Which process adds sediment?','Deposition','Weathering only','Evaporation','Magnetism','Slower floodwater drops fine material.'),
  g4Item('Why do meandering rivers move sideways over time?','Erosion on outer bends and deposition on inner bends','Equal erosion everywhere','Rivers create land without sediment','Water stops moving at bends','Unequal flow speeds shift the channel.'),
  g4Item('Which model best demonstrates landform change by runoff?','Repeatedly pour equal water over a sloped sand tray and map channel changes','Hold a dry rock once','Heat a sealed metal block','Observe a magnet','A repeated runoff model shows transport and channel development.'),
  g4Item('Photos show a riverbank at the same marker yearly. What measurement best shows change?','Distance from marker to bank edge','Sky color','Number of photo labels','Camera brand','A fixed reference permits direct position comparison.'),
  g4Item('A landform model changes in minutes, while nature takes centuries. What should a student conclude?','The model speeds up the process to make patterns observable','Natural change must also take minutes','The model disproves slow change','Time has no role','Scale in time is a known model limitation.'),
  g4Item('What data would best support that a delta is growing?','Mapped shoreline positions show land extending outward over years','One photo shows muddy water','A bird nests nearby','The river has a name','Repeated position data reveal directional change.'),
  g4Item('A road cuts off sediment reaching a beach, and the beach narrows. What system explanation fits?','Deposition falls below erosion because sediment supply is reduced','The road increases ocean matter','Beaches need no sediment','Narrowing proves no erosion','Landform stability depends on the balance of incoming and outgoing sediment.'),
  g4Item('Why can stabilizing one riverbank increase change downstream?','Engineering can redirect water energy and sediment through the system','Walls eliminate all energy','Downstream areas are unrelated','Sediment cannot move past structures','Changing one component can shift erosion and deposition elsewhere.'),
  g4Item('Aerial images show a dune 12 m east of its old position. What most likely occurred?','Wind eroded sand from the upwind side and deposited it downwind','The dune jumped without moving matter','New sand appeared only on the east','Gravity moved it uphill alone','Dune migration transfers existing sand across the surface.'),
  g4Item('Which comparison best tests the effect of vegetation on landform stability?','Matched slopes with and without plants under equal simulated rain','Different slopes with different soils and rain','One planted slope before rain only','Two maps with no dates','A matched controlled model isolates vegetation.'),
  g4Item('A restored marsh traps sediment and reduces wave force. What landform effect is expected?', 'Slower shoreline erosion and increased local deposition','Instant mountain formation','No matter cycling','Stronger waves everywhere','The marsh lowers transport energy and captures sediment.'),
  g4Item('Why should both erosion and deposition rates be measured when predicting shoreline change?','Net change depends on material lost compared with material added','Only erosion changes land','Deposition destroys sediment','The rates must always be equal','A shoreline can grow, shrink, or remain stable based on the balance.'),
  g4Item('Which explanation best connects scale, cause, and evidence in slow surface change?','Small measured changes from repeated water, wind, or ice action can accumulate into mapped landform change','Large landforms require one sudden event','Models prove exact future shapes','Surface change creates matter','The explanation links agents, repeated rates, and long-term cumulative evidence.')
]);

g4Register("sci","L9","4.6(A)","Classify and describe matter using temperature, mass, magnetism, relative density, and physical state",[
  g4Item('Which state of matter has a definite shape and volume?','Solid','Liquid','Gas','Energy','Solid particles maintain a fixed shape and volume.'),
  g4Item('Which state has a definite volume but takes the shape of its container?','Liquid','Solid','Gas','Light','A liquid flows while keeping nearly the same volume.'),
  g4Item('Which state fills the available container?','Gas','Solid','Liquid','Rock','Gas spreads through the available space.'),
  g4Item('Ice, liquid water, and water vapor are what?','Different states of the same matter','Different elements','Forms of energy only','Unrelated materials','State can change while the substance remains water.'),
  g4Item('Which observation best classifies a sample as a liquid?','It flows and keeps the same measured volume in a new container','It keeps its exact shape','It expands to fill a room','It has no mass','Flow plus fixed volume is a liquid pattern.'),
  g4Item('Which observation best classifies air as matter?','It has mass and occupies space','It is invisible','It can feel cool','It moves outdoors','Mass and volume are defining evidence of matter.'),
  g4Item('What usually happens to liquid water when its temperature falls below its freezing point?','It becomes solid ice','It becomes a gas','It loses all mass','It stops being matter','Cooling can change physical state from liquid to solid.'),
  g4Item('What usually happens when liquid water reaches its boiling point?','It changes into gas','It becomes magnetic','It gains new atoms','It turns into soil','Boiling is a liquid-to-gas state change.'),
  g4Item('A balloon is inflated. Which measurement most directly shows added gas has matter?','The inflated balloon has greater mass','The balloon changes color','The room is bright','The rubber stretches','Added gas increasing mass is direct evidence.'),
  g4Item('A sealed syringe of air is pushed inward. What property of gas is shown?','Gas volume can be compressed','Gas has no particles','Gas becomes solid instantly','Matter is destroyed','Gas particles can be pushed closer together.'),
  g4Item('Two equal-volume blocks have different masses. Which has greater relative density?','The block with greater mass','The block with less mass','Both must be equal','Density cannot compare solids','More mass in the same volume means greater density.'),
  g4Item('A solid sinks in water. What does this indicate about relative density?','It is denser than water','It has no mass','It must be magnetic','It is a liquid','Sinking indicates greater density than the displaced water.'),
  g4Item('A sample changes from solid to liquid in a sealed container. What happens to its matter?', 'Its state changes, but its matter remains present','Its atoms disappear','Its mass becomes energy only','It stops occupying space','A physical state change rearranges matter rather than eliminating it.'),
  g4Item('Why is shape alone insufficient to distinguish every solid from liquid?', 'Powders can take container shape even though each grain is solid','Liquids always have square shapes','Solids never move','Shape is not observable','Individual solid particles in a powder can move as a group.'),
  g4Item('Which set of properties best supports classifying an unknown sample?','Measured mass, temperature, magnetic response, sink/float behavior, and state','Name and price only','Color alone','Container label only','Multiple measurable physical properties support reliable classification.'),
  g4Item('A cold metal block and warm metal block are otherwise identical. Which property differs directly?', 'Temperature','Chemical identity','Number of atoms necessarily','Magnetism necessarily','Temperature is the controlled measured difference.'),
  g4Item('A student says gases have no mass because they cannot be seen. What test best challenges the claim?','Compare the mass of a sealed ball before and after inflation','Look through an empty cup','Warm the room','Listen to wind','A before-after mass comparison measures the added gas.'),
  g4Item('An unknown is nonmagnetic, sinks in water, and keeps its shape. Which classification is best supported?','A solid denser than water','A gas less dense than water','A magnetic liquid','Not matter','The three observations identify state, density relation, and magnetic response.'),
  g4Item('Why must temperature be recorded when describing state?','The same substance may have different states at different temperatures','Temperature determines mass exactly','Only gases have temperature','State changes create new elements','State depends partly on thermal conditions.'),
  g4Item('A sealed sample has the same mass before and after melting. What principle does the evidence support?','Matter is conserved during the state change','Melting creates matter','Solids have no mass','Temperature is conserved as mass','Equal mass in a closed system supports conservation of matter.')
]);

g4Register("sci","L10","4.6(A)","Classify and describe matter using temperature, mass, magnetism, relative density, and physical state",[
  g4Item('Which tool measures mass?','Balance','Thermometer','Magnet','Graduated cylinder only','A balance compares or measures mass.'),
  g4Item('Which tool measures temperature?','Celsius thermometer','Balance','Hand lens','Meter stick','A thermometer provides a numerical temperature.'),
  g4Item('Which test identifies magnetic response?','Bring a magnet near the sample and observe attraction','Measure color','Heat every sample','Put it in sunlight','Controlled magnet contact tests magnetism.'),
  g4Item('Which test compares relative density with water?','Observe whether the sample sinks or floats','Listen to the sample','Measure only length','Change its color','Sink/float behavior compares sample and water density.'),
  g4Item('An iron nail is attracted to a magnet. Which property is observed?','Magnetism','Temperature','State change','Porosity','Attraction indicates magnetic behavior.'),
  g4Item('A plastic cube floats while an equal-size metal cube sinks. What differs most directly?', 'Relative density','Amount of gravity','State of matter','Presence of volume','Their sink/float behaviors reveal different density relative to water.'),
  g4Item('Two objects have equal volume. A has mass 30 g and B 55 g. Which is denser?', 'Object B','Object A','They are equal','Cannot compare equal volumes','At equal volume, greater mass means greater density.'),
  g4Item('Two objects have equal mass. A is smaller in volume than B. Which is denser?', 'Object A','Object B','They are equal','Neither is matter','The same mass packed into less volume has greater density.'),
  g4Item('Why is "shiny" an observable physical property but "beautiful" is not a reliable scientific property?', 'Shine can be observed consistently; beauty is an opinion','Beauty has more mass','Shine changes matter','Opinions are measured in degrees','Scientific descriptions favor observable, repeatable traits.'),
  g4Item('A sample has mass 40 g before being cut. What is the combined mass of all pieces if none is lost?', '40 g','20 g','80 g','0 g','Cutting changes size and shape, not total matter.'),
  g4Item('Which data table entry is quantitative?', 'Mass = 47 g','Looks heavy','Feels unusual','Seems dense','A number with a unit is quantitative evidence.'),
  g4Item('Which data entry is qualitative?', 'Surface is rough and dull','Temperature = 22 C','Mass = 15 g','Volume = 8 mL','Rough and dull are descriptive observations without numbers.'),
  g4Item('A sample floats at first but sinks after air bubbles escape. What inference is supported?', 'Trapped air lowered the sample\'s overall density','Water lost gravity','The sample gained new atoms from nothing','Magnetism caused floating','Air spaces can reduce average density.'),
  g4Item('A student tests magnetism using different-size samples. What should be kept consistent for a fair strength comparison?', 'Sample size and magnet distance','Sample color only','Room name','Observation order only','Size and distance affect measured attraction.'),
  g4Item('Why should temperature be measured with a tool instead of touch?', 'Touch is relative and can misjudge temperature','Thermometers change the substance','Hands cannot sense any heat','Numbers are always warmer','A calibrated tool gives repeatable numerical data.'),
  g4Item('An unknown has mass, flows, keeps its volume, and is not attracted to a magnet. Which description fits?', 'A nonmagnetic liquid','A gas with fixed volume','A solid with fixed shape','Not matter','Flow and fixed volume identify liquid state; the magnet test adds another property.'),
  g4Item('Sample A and B both sink. Can we conclude they have equal density?', 'No; both exceed water density but may differ from each other','Yes; all sinking objects have identical density','No; sinking means no density','Yes; density equals mass','Sink/float provides a comparison to water, not an exact density value.'),
  g4Item('A rock has mass 60 g and an equal-volume block has mass 45 g. What claim is supported?', 'The rock has greater density','The block has greater density','They have equal density','The rock must be magnetic','Equal volume makes the mass comparison a density comparison.'),
  g4Item('Which plan best classifies four unknown samples?', 'Use the same tools and procedures to measure several properties of each','Guess from color alone','Use different tests for each without recording','Read unlabeled containers','Standardized multi-property data allow consistent classification.'),
  g4Item('A sample is heated and becomes less dense but remains the same substance. What explanation is most reasonable?', 'Its particles spread over more volume while mass stayed nearly constant','Matter was created','All heat became mass','The sample lost its identity','Thermal expansion can increase volume and lower density without a new substance.')
]);

function gen_g4_sci_L1(){return g4BankQuestion("sci","L1");}
function gen_g4_sci_L2(){return g4BankQuestion("sci","L2");}
function gen_g4_sci_L3(){return g4BankQuestion("sci","L3");}
function gen_g4_sci_L4(){return g4BankQuestion("sci","L4");}
function gen_g4_sci_L5(){return g4BankQuestion("sci","L5");}
function gen_g4_sci_L6(){return g4BankQuestion("sci","L6");}
function gen_g4_sci_L7(){return g4BankQuestion("sci","L7");}
function gen_g4_sci_L8(){return g4BankQuestion("sci","L8");}
function gen_g4_sci_L9(){return g4BankQuestion("sci","L9");}
function gen_g4_sci_L10(){return g4BankQuestion("sci","L10");}

/* Expose exact SE metadata on each rebuilt generator for the curriculum
   contract installer, which runs after this classic script. */
Object.entries(G4_TEKS_BANKS).forEach(([key, bank])=>{
  const fnName=`gen_g4_${bank.subject}_${bank.lesson}`;
  const fn=globalThis[fnName];
  if(typeof fn !== "function") return;
  const meta=bank.items[0].teksExpectation;
  fn.teksExpectation=meta;
  fn.teksStudentExpectation=meta;
  fn.questionCount=25;
  fn.difficultyTiers=5;
});

window.G4_TEKS_OWNED_AUDIT=(()=>{
  const failures=[];
  Object.entries(G4_TEKS_BANKS).forEach(([key,bank])=>{
    if(bank.items.length!==25) failures.push(`${key}:count`);
    if(new Set(bank.items.map(item=>item.q)).size!==25) failures.push(`${key}:duplicate`);
    if(bank.items.filter(item=>item.type==="truefalse").length!==6) failures.push(`${key}:truefalse`);
    const levels=bank.items.map(item=>item.difficulty).join("");
    if(levels!=="1111122222333334444455555") failures.push(`${key}:difficulty`);
    if(bank.items.some(item=>!item.teksExpectation?.code||!item.teksExpectation?.text||!item.teksExpectation?.source)) failures.push(`${key}:teks`);
  });
  return Object.freeze({lessons:Object.keys(G4_TEKS_BANKS).length,questions:Object.keys(G4_TEKS_BANKS).length*25,failures:Object.freeze(failures)});
})();

g4Register("sci","L11","4.6(C)","Demonstrate that matter is conserved when mixtures such as soil and water or oil and water are formed",[
  g4Item('Soil is stirred into water in a sealed jar. What happens to the soil matter?','It remains present in the mixture','It is destroyed','It becomes light energy','It loses all mass','Mixing changes the arrangement of matter, not whether the soil exists.'),
  g4Item('Oil and water are combined in a closed bottle. What happens to their total matter?','The same matter remains in the bottle','Half the matter disappears','New matter is created','Only the oil remains matter','Both liquids remain present even when they form layers.'),
  g4Item('A 40 g soil sample is mixed with 100 g water without spills. What total mass is expected?','140 g','60 g','100 g','400 g','Conservation predicts 40 + 100 = 140 grams.'),
  g4Item('A sealed cup has 75 g water and 15 g sand. What mass should the mixture have?','90 g','60 g','75 g','15 g','The combined mass is 75 + 15 = 90 grams.'),
  g4Item('Sand settles after being stirred into water. Which statement is accurate?','The sand is still present','The sand changed into water','The sand lost its mass','The water destroyed the sand','Settling changes location within the mixture, not the amount of sand.'),
  g4Item('Oil forms a top layer above water. What does the layer show?','The two liquids remain identifiable in the mixture','Oil is no longer matter','Water changed into oil','Mass was created at the boundary','Visible layers provide evidence that both starting materials remain.'),
  g4Item('A student filters a soil-water mixture. Where is the soil matter found?','Mostly on the filter','Converted to light','Destroyed by the filter','Only in the water vapor','The filter traps solid particles while water passes through.'),
  g4Item('After filtering muddy water, why may the measured masses not add exactly to the starting mass?','Some matter may remain on tools or spill','Conservation stops during filtering','The filter creates matter','Soil has no measurable mass','Unrecovered material or measurement error can affect the data.'),
  g4Item('Which procedure best demonstrates conservation in an oil-water mixture?','Measure the sealed container before and after mixing','Compare two open cups by sight only','Pour out part of the mixture before weighing','Estimate mass from color','A closed-system before-and-after mass comparison prevents matter loss.'),
  g4Item('A closed container weighs 225 g before shaking and 225 g after. What does this support?','Mixing conserved matter','Shaking destroyed matter','The liquids became energy','No mixture formed','Equal mass in the closed system supports conservation.'),
  g4Item('An open soil-water mixture weighs less after two days. What is the best explanation?','Some water evaporated from the open system','Soil stopped being matter','Mixing destroyed water','The balance created an error for certain','Matter may leave an open system as water vapor.'),
  g4Item('How could the evaporation explanation be tested more fairly?','Compare matched sealed and open mixtures over the same time','Use different starting masses and times','Change the soil type and container together','Observe only the soil color','The matched comparison isolates whether an open path allows water loss.'),
  g4Item('A 120 g closed mixture separates into layers overnight. What total mass is expected the next day?','120 g','60 g','240 g','0 g','Separation into layers does not remove matter from the closed container.'),
  g4Item('Which evidence is strongest that matter remains after mixing?','All components or their masses can be recovered or accounted for','The mixture changes color','The jar feels cool','The mixture is cloudy','Recovery and mass accounting directly track the matter.'),
  g4Item('A student adds 12 g salt to 88 g water in a sealed container. The salt is no longer visible. What mass is expected?','100 g','88 g','76 g','12 g','Dissolved salt remains as matter, so 12 + 88 = 100 grams.'),
  g4Item('Why does disappearing from view not mean dissolved matter was destroyed?','Its particles are distributed through the liquid','Invisible material has no mass','Water turns all solids into energy','Only visible particles count as matter','Matter can be present at a scale too small to see directly.'),
  g4Item('A mixture starts at 180 g but measures 174 g after pouring between cups. What should a scientist investigate first?','Spills or material left on the cups','Whether conservation is false','Whether mass can become color','Whether soil creates gravity','Transfer loss is a likely source for the missing measured mass.'),
  g4Item('How does separating a mixture support conservation of matter?','Recovered components show the original matter was rearranged, not destroyed','Separation creates new atoms','Only liquids can be recovered','Matter exists only before separation','Separation can make the starting materials observable again.'),
  g4Item('A closed jar contains 65 g water, 25 g soil, and 10 g oil. After shaking, what total component mass must be accounted for?','100 g','90 g','75 g','110 g','65 + 25 + 10 = 100 grams of matter.'),
  g4Item('Which conclusion is justified when repeated closed-system trials keep equal mass before and after mixing?','The data support conservation of matter during mixture formation','Every open-system trial must keep measured mass','Mixing never changes appearance','All mixtures are solutions','Consistent closed-system mass data support the conservation claim.')
]);

g4Register("sci","L12","4.6(B)","Investigate and compare mixtures, including solutions composed of liquids in liquids and solids in liquids",[
  g4Item('Which example is a solid mixed in a liquid?','Sand in water','Oil in water','Air in a balloon','Two metal blocks','Sand is a solid and water is a liquid.'),
  g4Item('Which example is a liquid mixed in a liquid?','Oil and water','Salt and water','Soil and pebbles','Ice and sand','Oil and water are both liquids.'),
  g4Item('Which mixture is a solution?','Salt evenly dissolved in water','Large stones in water','Oil floating on water','Sand settled under water','A solution is evenly mixed at the observable scale.'),
  g4Item('Which mixture is most likely to separate into visible liquid layers?','Oil and water','Vinegar and water','Food coloring and water','Rubbing alcohol and water','Oil and water do not mix evenly and have different densities.'),
  g4Item('What happens when sand is stirred into water and left still?','Much of the sand settles','The sand dissolves completely','The water becomes a solid','The sand loses mass','Sand particles are insoluble and denser than water.'),
  g4Item('What happens when a small amount of salt dissolves in water?','It spreads through the solution','It becomes sunlight','It always floats on top','It is destroyed','Salt particles distribute throughout the water.'),
  g4Item('Which tool can separate large insoluble solid particles from water?','Filter','Magnet for every solid','Thermometer','Mirror','A filter traps particles larger than its openings.'),
  g4Item('Which method can recover dissolved salt from saltwater?','Evaporate the water','Use a large-hole sieve','Use a magnet','Add more oil','Removing water by evaporation leaves the dissolved solid.'),
  g4Item('Mixture A is clear saltwater; Mixture B is cloudy sand-water. What key difference is observed?','Salt is dissolved evenly, while sand remains suspended or settles','Only B contains matter','A has no solid material','B is a pure substance','The two solid-liquid mixtures differ in how evenly the solid disperses.'),
  g4Item('Mixture A is vinegar-water; Mixture B is oil-water. How do they compare?','A mixes evenly, while B forms layers','Both always form layers','Neither contains liquids','B is a solid-liquid solution','Vinegar and water mix, whereas oil and water remain visibly separate.'),
  g4Item('Which evidence shows a solution is more concentrated?','Equal volumes contain different dissolved masses, and one contains more','One container is taller','One sample is stirred longer only','One label is darker','Concentration compares dissolved amount per amount of solution.'),
  g4Item('Two cups contain 100 mL water. Cup A dissolves 5 g salt; B dissolves 15 g. Which is more concentrated?','Cup B','Cup A','They are equal','Cannot compare equal water volumes','B has more dissolved salt in the same water volume.'),
  g4Item('Why should equal volumes be used when comparing two liquid mixtures?','It makes the component proportions easier to compare fairly','It guarantees both are solutions','It removes all measurement error','It changes liquids into solids','Equal total amounts support a fair comparison of composition.'),
  g4Item('A student says a clear mixture must be pure water. Which evidence challenges this?','Dissolved saltwater can also appear clear','All solutions are cloudy','Pure water always has color','Sandwater is always clear','Appearance alone cannot reveal dissolved matter.'),
  g4Item('Which plan best compares how well two solids dissolve?','Add equal masses to equal water volumes at equal temperatures and stir equally','Use different masses and temperatures','Judge each solid in its package','Mix one solid with oil and one with water','Controlling amount, liquid, temperature, and stirring isolates solubility behavior.'),
  g4Item('Sugar dissolves faster in warm water than cool water in matched trials. What conclusion is supported?','Temperature affected dissolving rate in this test','Warm water created more sugar','Cool water contains no matter','Sugar can dissolve only when boiling','The controlled temperature difference corresponds to the rate difference.'),
  g4Item('Why can filtration separate sand-water but not ordinary saltwater?','Dissolved salt particles pass through with water, while sand particles are trapped','Salt has no mass','Filters work only on liquids','Sand is magnetic','Particle size and dissolution determine whether the filter retains the solid.'),
  g4Item('A liquid mixture separates after standing but becomes cloudy when shaken. What does this indicate?','Its components disperse temporarily but do not form a lasting solution','The liquids become solids','Shaking destroys matter','The mixture is a pure substance','Temporary dispersion followed by layering distinguishes it from an even solution.'),
  g4Item('Which data best compare three mixtures scientifically?','Component amounts, total volume, appearance over time, and separation results','Container colors only','Student preferences','One photograph without labels','Multiple recorded properties reveal composition and behavior.'),
  g4Item('An unknown mixture is clear, passes through a filter unchanged, and leaves crystals after evaporation. What classification is best?','A solid-in-liquid solution','A suspension of large particles','Two unmixed liquids','A pure gas','The tests reveal dissolved solid that remains after the liquid evaporates.')
]);

g4Register("sci","L13","4.8(A)","Investigate and identify transfer of energy by objects in motion, waves in water, and sound",[
  g4Item('A rolling ball strikes a block and moves it. What was transferred?','Energy from the moving ball','New matter from the ball','Magnetism only','Coldness','The moving ball transfers energy during the collision.'),
  g4Item('A water wave rocks a floating cork. What does this show?','The wave transfers energy','The wave creates cork matter','Water leaves the container','The cork becomes a producer','The cork motion is evidence of energy transferred by the wave.'),
  g4Item('A ringing bell makes nearby air vibrate. What carries energy away?','Sound vibrations','Light only','New atoms','Gravity stopping','Sound transfers energy through vibrating matter.'),
  g4Item('Which event best shows motion energy transfer?','A moving marble hits a still marble and the second moves','A still book stays still','A rock remains on a table','A picture shows a car','The collision causes the second object to gain motion.'),
  g4Item('A faster toy car pushes a block farther than a slower identical car. What pattern is supported?','Greater motion can transfer more energy','Slow objects have no matter','Speed creates new mass','Blocks move without force','The controlled distance difference indicates more transferred energy.'),
  g4Item('A larger water wave moves a floating object farther than a smaller wave. What can be inferred?','The larger wave transferred more energy','The object made the wave','Water matter was destroyed','Wave height has no relationship to transfer','Greater object motion is evidence of greater transfer.'),
  g4Item('A loud speaker makes rice grains jump more than a quiet speaker. What does this demonstrate?','Sound transfers energy to the grains','Rice creates sound energy','Volume changes rice into gas','Sound has no effect on matter','Vibrations move the grains.'),
  g4Item('Why must sound travel through matter?','Sound energy transfers through particle vibrations','Sound is a solid object','Sound creates its own air','Matter blocks every vibration','Neighboring particles pass the vibration through a medium.'),
  g4Item('A pendulum ball hits an identical resting ball. The resting ball swings. Which system change is observed?','Energy transfers between objects','Mass moves completely from one ball','Gravity disappears','The balls become magnetic','The new motion of the second ball shows transfer.'),
  g4Item('Which fair test compares energy transfer at two car speeds?','Use the same car, block, track, and start point but change speed','Use cars of different mass on different tracks','Change speed and block size together','Observe one trial only','Holding other factors constant isolates speed.'),
  g4Item('How could water-wave transfer be measured quantitatively?','Record how far a floating object moves','Describe water color only','Count container labels','Listen without measuring','Object displacement provides numerical evidence of transfer.'),
  g4Item('How could sound-energy transfer be measured in a classroom model?','Compare movement of lightweight particles at controlled sound levels','Compare speaker colors','Touch an unplugged speaker','Measure only room length','Particle motion provides observable evidence caused by sound.'),
  g4Item('A ball hits a wall and rebounds more slowly. Where did some of its motion energy go?','It transferred to the wall, sound, and thermal motion','It was destroyed completely','It became new ball matter','It stopped existing as energy','Energy can transfer into several forms within the system.'),
  g4Item('Water particles mostly move up and down as a wave travels forward. What travels across the container most clearly?','Energy','All the same water particles','New mass','The container','Waves can transfer energy without carrying the same matter the full distance.'),
  g4Item('A drum is struck harder and produces larger vibrations. What prediction follows?','It can transfer more sound energy to nearby matter','It will contain less matter','It stops vibrating sooner in every case','No sound is produced','Larger vibrations can cause larger effects in surrounding matter.'),
  g4Item('Two balls move at the same speed, but one has greater mass. It pushes a block farther. Which factor affected transfer?','Mass of the moving object','Color of the ball','Name of the block','Time of day','With speed controlled, the greater mass explains the larger effect.'),
  g4Item('Why should repeated trials be used in an energy-transfer investigation?','To identify a consistent pattern and reduce the effect of unusual results','To guarantee the prediction is correct','To change the tested variable each time','To avoid recording data','Repeated measurements strengthen evidence for a pattern.'),
  g4Item('A student claims waves transport all water from one side of a pond to the other. Which observation challenges this?','A floating marker bobs near its location as the wave passes','The pond contains water','Waves reach shore','Wind can make waves','Bobbing with little net travel shows energy moves more than the water itself.'),
  g4Item('Data show car speed rises while block displacement rises in every matched trial. What claim is justified?','Within this setup, greater car speed was associated with greater energy transfer','Speed is the only factor in all collisions','The block created car speed','Energy was created from nothing','The controlled repeating pattern supports a relationship within the tested system.'),
  g4Item('Which explanation connects all three examples: collision, water wave, and sound?','Each transfers energy through interactions that cause matter to move','Each transfers identical matter across any distance','Each requires magnetism','Each destroys some matter','Object motion, waves, and sound all produce observable motion through energy transfer.')
]);

g4Register("sci","L14","4.8(C)","Demonstrate and describe how electrical energy travels in a closed path that can produce light and thermal energy",[
  g4Item('What must a simple circuit have for a bulb to light?','A closed conducting path','An open gap','Only plastic parts','No energy source','Current requires an unbroken path from and back to the source.'),
  g4Item('What happens when a switch opens a working circuit?','The bulb turns off because the path is broken','The bulb gets brighter','The battery creates matter','The wires disappear','An open switch interrupts electrical energy transfer.'),
  g4Item('What form of output does a lit bulb visibly produce?','Light energy','New matter','Gravity','Magnetism only','The bulb transforms electrical energy into visible light.'),
  g4Item('Why can a bulb become warm while lit?','Some electrical energy transfers as thermal energy','The bulb creates heat matter','The circuit loses all electricity','Light has mass','Electrical energy can be transformed into both light and thermal energy.'),
  g4Item('Which arrangement makes a complete circuit?','Battery-wire-bulb-wire-back to battery','Battery connected to one bulb terminal only','Bulb beside a battery with no wires','Two wires ending in an air gap','Every component must be joined in a closed loop.'),
  g4Item('A bulb does not light because one wire is loose. What repair is most direct?','Reconnect the wire to close the path','Add paper between contacts','Remove the battery','Cut another wire','Restoring the missing connection closes the circuit.'),
  g4Item('Why must both battery terminals be connected in a simple circuit?','They complete the path through the energy source','One terminal creates light by itself','Terminals are decorative','Both terminals stop current','The circuit path travels from one terminal through components and returns to the other.'),
  g4Item('Which material should be placed in a circuit gap to help the bulb light?','Metal strip','Rubber band','Dry wood','Plastic ruler','Metal is generally an electrical conductor.'),
  g4Item('A student replaces a metal connector with plastic. The bulb turns off. What is supported?','Plastic did not conduct enough current to complete the path','Plastic removed the battery mass','The bulb became an insulator permanently','Light destroyed the plastic','The only changed path material stopped the circuit.'),
  g4Item('Which evidence shows electrical energy became thermal energy?','A wire or bulb temperature increases while current flows','The circuit has a label','The battery has mass','The bulb is round','Measured temperature increase is evidence of thermal transfer.'),
  g4Item('A circuit has a battery, wires, and working bulb but remains dark. What should be checked first?','Whether every connection forms a closed path','The color of the table','The room temperature only','The bulb label font','A gap or poor contact is a common cause in an otherwise complete set of parts.'),
  g4Item('Which diagram description represents an open circuit?','A wire stops before reaching one bulb contact','Every component connects in one loop','A closed switch bridges two contacts','Two wires connect both battery terminals through a bulb','A physical gap makes the path open.'),
  g4Item('Why is a switch useful in a circuit?','It controls energy transfer by opening or closing the path','It creates electrical energy','It changes all conductors to insulators','It removes the source','The switch intentionally makes or breaks the circuit.'),
  g4Item('Two identical bulbs are tested with fresh and weak batteries in identical closed circuits. The fresh-battery bulb is brighter. What factor is supported?','The energy source condition affected light output','Bulb color caused the change','Closed paths do not matter','Brightness created battery energy','With other components controlled, the source difference explains output.'),
  g4Item('How should a student safely test circuit materials?','Use only classroom-approved low-voltage materials and follow directions','Connect wires to a wall outlet','Touch bare household wires','Heat batteries directly','Approved low-voltage circuits reduce electrical and thermal hazards.'),
  g4Item('A bulb produces light and heat in a closed circuit. Is matter being created?','No; energy is transferred and transformed','Yes; light is new matter','Yes; heat adds atoms','No; nothing changes','The outputs are energy transformations, not creation of matter.'),
  g4Item('A circuit model uses arrows around a closed loop. What do the arrows represent?','Direction around the complete energy-transfer path','Wire mass leaving the circuit','Light moving into the battery','Creation of electrons from nothing','Arrows help represent the continuity and direction of the path.'),
  g4Item('What limitation does a simple circuit diagram have?','It may not show actual component size, shape, or internal processes','It cannot show connections','It contains real electrical energy','It is always unsafe','A diagram represents relationships but simplifies physical details.'),
  g4Item('A student tests one circuit closed for 10 seconds and another for 60 seconds, then compares bulb temperature. What additional variable matters?','Time current flowed','Bulb name','Wire color','Drawing size','Different operating duration can change thermal output.'),
  g4Item('Which explanation best traces energy in a working bulb circuit?','The source supplies electrical energy through a closed path, and the bulb transfers it as light and heat','The bulb creates energy and sends it into an open path','Wires create matter that becomes light','The battery receives all energy from the room','The explanation includes source, closed path, and observable outputs.')
]);

g4Register("sci","L15","4.8(B)","Identify conductors and insulators of thermal and electrical energy",[
  g4Item('Which material is usually a good electrical conductor?','Copper','Rubber','Plastic','Dry wood','Copper allows electric charge to move readily.'),
  g4Item('Which material is usually an electrical insulator?','Rubber','Copper','Aluminum','Iron','Rubber resists electrical energy transfer.'),
  g4Item('Which material is usually a good thermal conductor?','Metal spoon','Foam cup','Wool mitten','Wooden handle','Metals transfer thermal energy relatively quickly.'),
  g4Item('Which material is usually a thermal insulator?','Foam','Copper','Steel','Aluminum','Foam slows thermal energy transfer through trapped air and poor-conducting material.'),
  g4Item('Why are many electrical wires coated in plastic?','Plastic insulates users from the conducting metal','Plastic creates current','Metal cannot carry energy','The coating makes electricity visible','The conductor carries current while insulation reduces unintended contact.'),
  g4Item('Why does a cooking pot often have a plastic or wooden handle?','The handle slows thermal energy transfer to a hand','The handle increases food temperature','Wood creates cold energy','Plastic conducts faster than metal','An insulating handle reduces heating from the pot.'),
  g4Item('A metal spoon and wooden spoon sit in hot water. Which handle likely warms faster?','Metal spoon','Wooden spoon','Both must warm at the same rate','Neither contains matter','Metal is a better thermal conductor.'),
  g4Item('A circuit gap is bridged by an aluminum strip. The bulb lights. What property is shown?','Electrical conductivity','Thermal insulation','Relative density only','Evaporation','Completing the circuit shows the strip conducts current.'),
  g4Item('A circuit gap is bridged by a rubber strip. The bulb stays dark. What conclusion is supported?','Rubber is an electrical insulator in this test','Rubber created an open battery','The bulb has no mass','All nonmetals are identical','The rubber did not complete a conducting path.'),
  g4Item('Which fair test compares thermal conduction?','Place equal-size material strips in the same warm water and measure temperature changes at equal times','Use different strip sizes and water temperatures','Touch each briefly and guess','Heat one sample but not another','Controlled dimensions, source, time, and measurement allow comparison.'),
  g4Item('Which fair test compares electrical conduction?','Place each material in the same circuit gap one at a time','Use a different battery and bulb for every material','Judge materials by color','Hold materials near a circuit without connecting them','Only the tested material should change.'),
  g4Item('Why is bulb brightness alone imperfect for comparing conductors?','Connection quality and battery condition can also affect brightness','Brightness is not observable','Conductors produce no light','Every conductor has identical resistance','Other system variables may influence the output.'),
  g4Item('Four equal rods warm at their far ends after 1, 4, 9, and 15 minutes. Which is the best thermal conductor?','The rod warming in 1 minute','The rod warming in 15 minutes','All are equal','The rod warming in 9 minutes','Faster transfer to the far end indicates greater thermal conduction.'),
  g4Item('Why are layers of air useful in insulated containers?','Still air transfers thermal energy slowly','Air has no matter','Air creates coldness','Air is always colder than every object','Trapped air limits conduction and movement that transfer heat.'),
  g4Item('A metal is both a thermal and electrical conductor. Does that mean the two properties are identical?','No; they describe transfer of different kinds of energy','Yes; heat and electricity are the same','No; metal cannot conduct heat','Yes; all properties are one property','The processes are distinct even though many metals conduct both well.'),
  g4Item('Which design best keeps a cold drink cold?','A container with insulating walls and a fitted lid','A thin metal cup in sunlight','An open conducting container','A black metal sheet','Insulation and a lid slow energy transfer from the surroundings.'),
  g4Item('Which design safely transfers heat into a pan while limiting transfer to the user?','Metal pan body with an insulating handle','Entire pan made of foam','Metal body and bare metal handle','Plastic cooking surface over flame','The body conducts heat to food; the handle reduces transfer to the hand.'),
  g4Item('Data show Material A completes a circuit and heats quickly; B does neither. How should they be classified?','A is a conductor of electrical and thermal energy; B is an insulator in both tests','A is an insulator; B a conductor','Both are conductors','No classification is possible from tests','The two independent results support both classifications within the tested conditions.'),
  g4Item('A thick and thin sample of the same insulation give different results. Why?','Thickness affects how much thermal energy transfers over a given time','Material identity changed','Thick samples contain no matter','Insulation creates energy','A fair material comparison must account for thickness.'),
  g4Item('Which explanation best connects material choice to engineering criteria?','Select conductors where energy must move and insulators where transfer must be limited for safety or efficiency','Always use conductors everywhere','Insulators are useful only for color','Material properties do not affect design','Design choices match energy-transfer function and safety needs.')
]);

g4Register("sci","L16","4.7","Plan and conduct descriptive investigations to explore patterns of gravity, friction, and magnetism acting by contact or at a distance",[
  g4Item('Which force pulls a dropped object toward Earth?','Gravity','Friction','Magnetism only','Sound','Gravity acts at a distance between Earth and the object.'),
  g4Item('Which force often slows a sliding book?','Friction','Gravity upward','Light','Electric current','Contact between surfaces produces friction opposing motion.'),
  g4Item('Which force can act between a magnet and iron without touching?','Magnetism','Friction','Sound','Thermal insulation','Magnetic attraction can act at a distance.'),
  g4Item('A hand pushes a cart. Is the push a contact or distance force?','Contact force','Distance force only','No force','Magnetic force','The hand must touch the cart to push it.'),
  g4Item('Why does a toy car travel farther on tile than carpet?','Tile usually creates less friction','Tile removes gravity','Carpet has no matter','The car becomes magnetic','Lower surface friction slows the car less.'),
  g4Item('A paper clip moves toward a nearby magnet. What pattern is observed?','Magnetic force acts before contact','Friction pulls it through air','Gravity points toward the magnet','The paper clip creates energy','Motion before touching demonstrates distance action.'),
  g4Item('A ball released from different heights always moves downward. What force pattern is shown?','Gravity pulls toward Earth','Friction pulls upward','Magnetism points down for every object','Sound controls direction','The repeated downward acceleration is a gravity pattern.'),
  g4Item('Which surfaces likely produce the most friction?','Two rough surfaces','Two smooth icy surfaces','A floating object and air only','Two surfaces not touching','Roughness increases interlocking between contacting surfaces.'),
  g4Item('Which investigation fairly compares friction on carpet and tile?','Use the same car, ramp height, and release while changing only surface','Use different cars and ramp heights','Push one car but release the other','Compare one trial with no measurement','Controlling car and start conditions isolates surface.'),
  g4Item('Which measurement would provide evidence about friction?','Distance a released car travels before stopping','Color of the car','Name of the surface','Number of observers','Stopping distance reflects how strongly the surface slows motion.'),
  g4Item('Which investigation explores gravity without changing several variables?','Drop equal-shape objects from the same height and time their falls','Drop different shapes from different heights','Throw one object upward and roll another','Use a magnet on one object','Matched conditions isolate the chosen comparison.'),
  g4Item('A student tests magnet distance using the same magnet and paper clip. What should be measured?','Greatest separation at which attraction moves the clip','Magnet color','Clip price','Room length','The maximum response distance describes the force pattern.'),
  g4Item('A cart slows faster when extra weight is added on the same surface. What should the student avoid claiming?','That weight affects every friction system exactly the same without more tests','That a pattern occurred in these trials','That stopping distance was measured','That the cart and surface interacted','Evidence from one setup supports a limited, not universal, claim.'),
  g4Item('Why is gravity classified as a force at a distance?','Objects are pulled even without touching Earth\'s surface','Gravity requires rubbing surfaces','Gravity works only on magnets','Objects have no mass until contact','Falling begins while an object is separated from the ground.'),
  g4Item('Why is friction classified as a contact force?','It arises where surfaces touch','It acts through empty space only','It pulls everything downward','It requires magnetic poles','Friction depends on interaction at a surface boundary.'),
  g4Item('Two like magnetic poles face each other. What motion pattern is expected?','They repel','They attract','They lose gravity','They create friction without contact','Like poles exert a repelling distance force.'),
  g4Item('Opposite magnetic poles face each other. What pattern is expected?','They attract','They repel','They stop having mass','They always remain still','Opposite poles exert attractive magnetic force.'),
  g4Item('A model shows force arrows of different lengths. What can arrow length represent?','Relative force strength','Object color','Exact matter type','Time of day','Longer arrows commonly represent greater force magnitude in a model.'),
  g4Item('Data from five trials vary slightly but all show shorter travel on sandpaper than tile. What conclusion is supported?','Sandpaper produced greater friction in this setup','Tile has no friction','Every rough surface gives the exact same distance','Variation means no pattern exists','The consistent direction across repeated trials supports the comparison.'),
  g4Item('Which explanation best compares the three force patterns?','Gravity and magnetism can act at a distance, while friction acts through contact; all can change motion','All forces require touching','Only friction changes motion','Gravity and magnetism are forms of matter','The explanation distinguishes contact and distance action while identifying their shared effect.')
]);

/* ---------- Grade 4 Science: current TEKS lessons L17-L28 ---------- */

function g4ScienceConcept(label, fact, w1, w2, w3, application, challenge){
  return {label, fact, wrongs:[w1,w2,w3], application, challenge};
}

function g4ScienceMasteryItems(lessonName, concepts){
  if(!Array.isArray(concepts) || concepts.length !== 5){
    throw new Error(`${lessonName} must define five lesson-owned science concepts.`);
  }
  const tiers = [
    concept=>g4Item(
      `Which statement accurately explains ${concept.label}?`,
      concept.fact, ...concept.wrongs,
      `${concept.fact} This is the defining relationship for ${concept.label}.`
    ),
    concept=>g4Item(
      `${concept.application} Which conclusion best applies ${concept.label}?`,
      concept.fact, ...concept.wrongs,
      `${concept.fact} The evidence in this situation matches ${concept.label}.`
    ),
    concept=>g4Item(
      `A class is evaluating ${concept.label}. Which claim is supported by the strongest Grade 4 science evidence?`,
      concept.fact, ...concept.wrongs,
      `${concept.fact} The other choices conflict with the observable pattern or system evidence.`
    ),
    concept=>g4Item(
      `${concept.challenge} Which reasoning produces the most defensible conclusion?`,
      concept.fact, ...concept.wrongs,
      `${concept.fact} This conclusion accounts for every condition in the challenge.`
    )
  ];
  return tiers.flatMap(build=>concepts.map(build));
}

g4Register("sci","L17","4.10(A)","Describe and illustrate the continuous movement of water above and on Earth's surface through the water cycle and explain the Sun's role as a major energy source",g4ScienceMasteryItems("The Water Cycle",[
  g4ScienceConcept("evaporation","Evaporation changes liquid water into water vapor as energy is transferred from the Sun","Evaporation changes water vapor into liquid","Evaporation is water falling from clouds","Evaporation stops the water cycle","A sunlit puddle becomes smaller while no water flows away.","Two equal trays begin with 200 mL of water; the sunny tray loses 35 mL while the shaded tray loses 9 mL."),
  g4ScienceConcept("condensation","Condensation changes cooled water vapor into tiny liquid droplets","Condensation changes ice directly into sunlight","Condensation is liquid soaking into soil","Condensation destroys water vapor","Droplets form on the outside of a cold cup even though the cup does not leak.","Warm moist air rises, cools, and a cloud forms without liquid water being poured into the sky."),
  g4ScienceConcept("precipitation","Precipitation returns water from clouds to Earth's surface as rain, snow, sleet, or hail","Precipitation moves groundwater upward through roots only","Precipitation is every cloud in the sky","Precipitation can occur only as rain","Ice crystals in a cloud grow heavy enough to fall to the ground.","A weather record shows water leaving clouds as rain one day and snow the next."),
  g4ScienceConcept("collection and runoff","Collection and runoff move water across land and into streams, lakes, oceans, soil, and groundwater","Runoff changes water into a gas","Collection means water disappears permanently","Runoff always moves uphill","Rainwater flows down a schoolyard into a creek and some also enters the soil.","A model must account for rain on a hill, water entering soil, and water reaching a lake."),
  g4ScienceConcept("the water cycle as a system","Water continuously changes location and state, while the Sun supplies much of the energy driving the cycle","Water completes the cycle once and is then used up","Only ocean water participates in the cycle","The Moon is the major energy source for evaporation","A drop evaporates, condenses in a cloud, falls as rain, and later reaches the ocean.","A model shows evaporation and precipitation but omits the Sun and all surface movement.")
]));

g4Register("sci","L18","4.10(C)","Differentiate between weather and climate",g4ScienceMasteryItems("Weather and Climate",[
  g4ScienceConcept("weather","Weather describes short-term atmospheric conditions at a particular time and place","Weather is the thirty-year average for a region","Weather never changes during a day","Weather describes only temperature","A forecast reports thunderstorms, 24 degrees Celsius, and south wind for tomorrow.","A city is cool and rainy today even though its summers are usually hot and dry."),
  g4ScienceConcept("climate","Climate describes long-term patterns of weather in a region","Climate is one afternoon's wind speed","Climate changes completely after one storm","Climate and weather are unrelated","Thirty years of records show that a region usually has mild, wet winters.","One unusually cold day occurs in a desert with a long-term hot, dry pattern."),
  g4ScienceConcept("weather measurements","Temperature, precipitation, wind, and cloud observations provide evidence about weather","Weather is measured only by looking at the season name","A single opinion is stronger than instrument data","Climate can be measured from one thermometer reading","Students record temperature, rainfall, wind direction, and cloud cover at noon.","Two towns must compare conditions at the same time using calibrated instruments."),
  g4ScienceConcept("climate evidence","Many years of organized weather data are needed to identify a climate pattern","One day's forecast proves a climate pattern","The hottest hour determines an entire region's climate","Climate evidence does not use precipitation records","A scientist graphs monthly temperature and rainfall averages across three decades.","A student tries to label a region's climate using only yesterday's high temperature."),
  g4ScienceConcept("weather-climate reasoning","A short-term event can differ from the long-term climate without disproving the climate pattern","Every weather event must exactly match the climate average","Climate determines the exact weather every hour","One storm permanently changes a region's climate","Snow falls once in a location whose winters are usually mild.","A claim says a warming climate is impossible because one week was colder than average.")
]));

g4Register("sci","L19","4.9(A)","Collect and analyze data to identify sequences and predict patterns of change in seasons, including temperature and length of daylight",g4ScienceMasteryItems("Season and Daylight Patterns",[
  g4ScienceConcept("season sequence","The seasons repeat in the order spring, summer, autumn, winter, and then spring again","The seasons occur in a random order","Winter is always followed by autumn","A season sequence happens only once","A calendar record moves from winter into spring and then summer.","A data table ends with autumn and asks for the next two seasons in the repeating sequence."),
  g4ScienceConcept("daylight pattern","In a yearly local pattern, daylight generally lengthens toward summer and shortens toward winter","Every season has exactly twelve hours of daylight","Daylight changes randomly from month to month","Winter always has the longest days","Sunset becomes later across repeated spring observations.","Monthly daylight records rise from January to June and then decline toward December."),
  g4ScienceConcept("temperature pattern","Seasonal temperature data usually show warmer and cooler parts of the year, although daily values vary","Every summer day is warmer than every winter day","Temperature never varies within a season","One warm winter day erases the annual pattern","Monthly averages rise toward summer while individual spring days move up and down.","A class must distinguish a repeating annual temperature pattern from daily variation."),
  g4ScienceConcept("evidence from repeated measurements","Measurements collected consistently across many dates reveal seasonal patterns more reliably than one observation","One afternoon is enough to establish an annual pattern","Changing instruments improves comparison","Only descriptive words can show seasonal change","Students measure daylight length on the first day of every month.","Two years of same-date measurements show nearly the same rise-and-fall pattern."),
  g4ScienceConcept("season prediction","A repeated sequence in past temperature and daylight data can support a prediction for the next season","A prediction should ignore all earlier data","A seasonal prediction must give the exact temperature of every day","Patterns cannot support predictions","Three years of records show daylight decreasing through autumn.","A model must predict the likely direction of daylight change after the shortest days of winter.")
]));

g4Register("sci","L20","4.9(B)","Collect and analyze data to identify sequences and predict patterns of change in the observable appearance of the Moon from Earth",g4ScienceMasteryItems("Moon Appearance Patterns",[
  g4ScienceConcept("reflected moonlight","The Moon appears bright because it reflects sunlight; it does not make its own visible light","The Moon produces all of its own visible light","Earth's clouds paint the Moon white","Moon phases are caused by Earth's shadow every night","The Moon remains visible after sunset although it is not a star.","A model needs to explain why the illuminated portion always faces the Sun."),
  g4ScienceConcept("phase sequence","The Moon's observable phases follow a repeating sequence over about one month","Moon phases appear in a random order","A full moon always follows a new moon the next night","The sequence repeats every twenty-four hours","A class sketches the Moon nightly and sees the lit portion grow and then shrink.","An observation log shows new, crescent, quarter, gibbous, and full appearances before reversing."),
  g4ScienceConcept("waxing","Waxing means the visible illuminated portion of the Moon is increasing from night to night","Waxing means the lit portion is shrinking","Waxing means the Moon is moving closer to Earth","Waxing occurs only during an eclipse","The bright portion is larger Tuesday than it was Monday.","Three sketches show a crescent, then a quarter, then a gibbous Moon."),
  g4ScienceConcept("waning","Waning means the visible illuminated portion of the Moon is decreasing from night to night","Waning means the illuminated portion is growing","Waning means sunlight has stopped reaching the Moon","Waning changes the Moon's actual size","After a full moon, the bright portion becomes smaller across several nights.","A sequence moves from full to gibbous to quarter to crescent."),
  g4ScienceConcept("moon observation evidence","Observations made at consistent times over many nights reveal the Moon's repeating appearance pattern","One drawing proves the complete monthly sequence","Cloudy nights mean the Moon has no phase","The Moon must be in the same sky position at all times","Students date and organize nightly drawings for four weeks.","Several observations are missing, so a student uses the established neighboring sequence to predict the absent phase.")
]));

g4Register("sci","L21","4.13(B)","Differentiate between inherited and acquired physical traits of organisms",g4ScienceMasteryItems("Inherited and Acquired Traits",[
  g4ScienceConcept("inherited physical traits","Inherited physical traits are passed from parents to offspring through biological information","Inherited traits are always learned by practice","Every inherited trait is caused by an accident","Organisms choose inherited traits after birth","A litter of kittens shares fur-color patterns with its parents.","Several generations of plants show similar flower color even when grown by different gardeners."),
  g4ScienceConcept("acquired physical traits","Acquired physical traits develop during an organism's life because of experience, use, injury, or environment","Acquired traits are automatically passed to every offspring","Acquired traits exist before birth in all cases","A species must share every acquired trait","A dog develops a scar after an injury.","Two identical plants grow to different heights when one receives less light and water."),
  g4ScienceConcept("trait evidence","Comparing parents, offspring, and environmental history helps classify a trait as inherited or acquired","Appearance alone always proves how a trait developed","One organism can establish a species-wide pattern","Environmental records cannot help classify traits","A scientist records parent leaf shapes and the growing conditions of young plants.","A claim about a bird's damaged beak must be tested against family traits and injury history."),
  g4ScienceConcept("learned behavior versus physical trait","A learned behavior is acquired through experience, while an inherited physical trait is a body feature present because of heredity","Every behavior is an inherited physical trait","Practice changes heredity immediately","Body structures are learned behaviors","A parrot learns a sound while retaining an inherited beak shape.","A trained route and natural wing structure must be sorted into behavior and physical-trait evidence."),
  g4ScienceConcept("interaction of heredity and environment","An organism's observed features can reflect inherited information, environmental conditions, or both","Only heredity affects every feature","Only environment affects every feature","Inherited and acquired traits mean the same thing","A plant inherits broad leaves but grows smaller leaves during drought.","Siblings share several body features but differ in scars and muscle development after different experiences.")
]));

g4Register("sci","L22","4.12(B)","Describe the cycling of matter and flow of energy through food webs, including the roles of the Sun, producers, consumers, and decomposers",g4ScienceMasteryItems("Food Webs",[
  g4ScienceConcept("the Sun's role","The Sun supplies the energy that begins most food-web energy pathways","Consumers create sunlight for producers","Decomposers are the original source of all energy","Energy begins with the largest predator","Grass captures sunlight before being eaten by a rabbit.","A web model begins with grass but omits the energy source that lets grass make food."),
  g4ScienceConcept("producers","Producers use sunlight, water, and carbon dioxide to make food and begin energy pathways","Producers must eat consumers to gain energy","Every producer is an animal","Producers break down all dead matter","Algae supports insects and fish in a pond food web.","Removing most plants changes the energy available to every connected consumer."),
  g4ScienceConcept("consumers","Consumers obtain energy by eating producers or other consumers","Consumers make all food directly from sunlight","Consumers return no matter to ecosystems","Only top predators are consumers","A hawk gains energy by eating a mouse that ate seeds.","An omnivore connects both plant and animal feeding pathways in one food web."),
  g4ScienceConcept("decomposers","Decomposers break down dead organisms and wastes, returning matter to the environment","Decomposers create new matter from nothing","Decomposers are always top predators","Decomposers prevent nutrients from cycling","Fungi grow on a fallen log and nutrients return to soil.","A closed model includes feeding arrows but no process returning matter from dead organisms."),
  g4ScienceConcept("food-web change","Changing one population can affect several connected populations because food webs contain many pathways","Each population changes without affecting any other","Removing a producer increases energy for all consumers","Food webs contain only one feeding path","A drought reduces grass, followed by fewer grasshoppers and lizards.","A predator decline produces changes in both prey abundance and the producers eaten by that prey.")
]));

g4Register("sci","L23","4.12(C)","Identify and describe past environments based on fossil evidence, including common Texas fossils",g4ScienceMasteryItems("Fossil Evidence",[
  g4ScienceConcept("fossils as evidence","Fossils are preserved remains, impressions, or traces that provide evidence about past life and environments","Fossils are predictions about future organisms","Every rock is a fossil","Fossils show only an organism's color","A shell impression is found in rock far from today's coast.","Tracks, pollen, shells, and bones from one rock layer must be combined to infer the setting."),
  g4ScienceConcept("environmental inference","Fossil type and surrounding rock can support an evidence-based inference about a past environment","A fossil proves every detail of an ancient environment","Current weather determines what a fossil means","Location never matters when interpreting fossils","Marine fossils occur in limestone in central Texas.","Plant fossils, coal, and amphibian traces occur together in a rock layer."),
  g4ScienceConcept("Texas fossil evidence","Common Texas marine fossils show that seas covered parts of Texas in the past","Texas has always had exactly today's environments","Marine fossils must have been carried inland recently","Texas fossils cannot reveal environmental change","Ammonite and oyster fossils are embedded in Texas bedrock.","Multiple undisturbed layers across a wide region contain similar marine organisms."),
  g4ScienceConcept("relative sequence in layers","In undisturbed sedimentary rock, lower layers generally formed before layers above them","The top layer is always the oldest","All rock layers form at the same instant","Fossil size determines layer age","A fossil lies below another fossil in an undisturbed cliff.","A sequence of changing fossils must be ordered using their positions in intact layers."),
  g4ScienceConcept("limits of fossil evidence","Fossil conclusions should state what the evidence supports and avoid claims the evidence cannot determine","One fossil reveals every organism that ever lived nearby","Missing fossils prove no life existed","A fossil record has no gaps or uncertainty","Only hard-shell fossils are preserved at a site.","Two reasonable environment explanations fit the same limited set of fossils, so more evidence is needed.")
]));

g4Register("sci","L24","4.12(B)","Describe the cycling of matter and flow of energy through food webs, including the roles of the Sun, producers, consumers, and decomposers",g4ScienceMasteryItems("Matter and Energy in Ecosystems",[
  g4ScienceConcept("energy flow direction","Energy flows from the Sun to producers and then through consumers; it is not recycled in a closed loop","Energy cycles back to the Sun unchanged","Consumers send all energy back to producers","Energy and matter follow identical paths","Sunlight supports grass, grass supports a rabbit, and the rabbit supports a hawk.","A student's arrows point from hawk to Sun and must be corrected using the source-to-consumer pathway."),
  g4ScienceConcept("matter cycling","Matter moves among organisms and the environment and can be reused through feeding, waste, death, and decomposition","Matter disappears when an organism dies","Only producers contain matter","Matter flows once and leaves Earth","A decomposer returns nutrients from dead leaves to soil used by a new plant.","A terrarium model must account for atoms moving from plant to animal to waste and back to soil."),
  g4ScienceConcept("food-web arrows","A food-web arrow points from the organism being eaten toward the organism receiving energy and matter","Every arrow points from predator to prey","Arrows show which organism is physically larger","Arrow direction has no meaning","An arrow connects grass to a grasshopper.","A web must trace energy from seeds through mice to an owl without reversing the evidence."),
  g4ScienceConcept("multiple pathways","A food web is more realistic than a single food chain because organisms can have several food sources and predators","Every ecosystem contains only one feeding sequence","Food webs exclude producers","Multiple pathways prevent any population change","A fox eats rabbits and mice, while mice eat seeds and insects.","One prey population falls, but a predator persists by using another connected food source."),
  g4ScienceConcept("system balance evidence","Population data across connected organisms help explain how a change moves through an ecosystem system","One population count explains every ecosystem process","A consumer loss cannot affect producers","Food-web effects occur without cause-and-effect relationships","Insect numbers fall, followed by fewer insect-eating birds and more leaves.","A restoration adds native plants; later records show changes across herbivores, predators, and decomposers.")
]));

g4Register("sci","L25","4.11(A)","Identify and explain advantages and disadvantages of using Earth's renewable and nonrenewable natural resources",g4ScienceMasteryItems("Natural Resources",[
  g4ScienceConcept("renewable resources","Renewable resources can be replenished naturally on a useful time scale when managed responsibly","Renewable means a resource has no environmental impact","Renewable resources can never be depleted locally","Coal and oil are rapidly renewable","Sunlight and wind supply energy repeatedly.","A community compares a steady wind supply with a fuel that took millions of years to form."),
  g4ScienceConcept("nonrenewable resources","Nonrenewable resources form far more slowly than people use them, so available supplies are limited","Nonrenewable resources replace themselves each season","Natural gas is produced by today's weather","Using a nonrenewable resource has only disadvantages","Oil is removed and burned much faster than new oil forms.","A plan depends on a deposit that cannot be replaced within many human lifetimes."),
  g4ScienceConcept("resource tradeoffs","A responsible resource decision compares benefits, costs, reliability, and environmental effects","The cheapest short-term choice is always best","Every resource has identical effects","A benefit proves there are no disadvantages","Solar power lowers fuel use but depends on sunlight and storage.","Two energy plans differ in reliability, land use, pollution, and long-term cost."),
  g4ScienceConcept("conservation","Conservation reduces resource use and waste so supplies last longer and environmental impacts can decrease","Conservation means never using any resource","Recycling creates unlimited matter","Waste has no connection to resource demand","Insulation reduces the energy needed to heat a building.","A town measures how repair, reuse, and recycling reduce new material extraction."),
  g4ScienceConcept("evidence-based resource choice","Resource choices should use local data and consider both immediate needs and long-term consequences","One advertisement is enough evidence for a major decision","Every location should choose the same resource","Long-term effects do not belong in resource decisions","A coastal town has strong wind data but must also study wildlife and grid needs.","A proposal supplies reliable power now but creates waste requiring safe management for decades.")
]));

g4Register("sci","L26","4.7","Plan and conduct descriptive investigations to explore patterns of magnetism acting by contact or at a distance on an object",g4ScienceMasteryItems("Magnetism",[
  g4ScienceConcept("magnetic attraction","A magnet attracts certain materials such as iron and steel, but not every metal or object","A magnet attracts every material","Only plastic is magnetic","Attraction requires the magnet to touch first","A paper clip moves toward a nearby magnet.","Several unlabeled objects must be classified by repeating the same distance test."),
  g4ScienceConcept("magnetic poles","Opposite magnetic poles attract and like poles repel","All magnetic poles only attract","Like poles attract and opposite poles repel","A magnet has no regions with different interactions","A north pole approaches a south pole.","Rotating one of two repelling magnets causes them to pull together."),
  g4ScienceConcept("force at a distance","Magnetic force can change an object's motion without the objects touching","Magnetism is always a contact force","Magnetic force creates matter between objects","Distance has no effect on magnetic interaction","A steel washer slides before the magnet reaches it.","A student must distinguish magnetic force from friction using evidence of separation."),
  g4ScienceConcept("distance pattern","Magnetic effects usually become weaker as the distance between a magnet and object increases","Magnetic force is identical at every distance","Moving farther always strengthens attraction","Only object color changes magnetic strength","A paper clip moves at 1 cm but not at 8 cm.","Repeated trials measure how many paper layers can separate a magnet and clip before motion stops."),
  g4ScienceConcept("fair magnetic investigation","A fair magnetism test changes one variable while keeping the magnet, object, measurement method, and other conditions consistent","A fair test changes every material and distance together","One unmeasured observation proves a general rule","Magnet color must be the measured outcome","Students compare attraction distance for equal-size iron and aluminum samples.","Two magnets are compared using the same paper clips, starting positions, and number of trials." )
]));

g4Register("sci","L27","4.8(A)","Investigate and identify the transfer of energy by sound",g4ScienceMasteryItems("Sound Energy",[
  g4ScienceConcept("sound and vibration","Sound begins with vibrating matter and transfers energy through a medium","Sound is produced by objects that never vibrate","Sound is a kind of matter stored in silence","Vibration prevents sound","A plucked rubber band moves back and forth and a sound is heard.","A tuning fork touches water and makes droplets move while the sound fades as vibration decreases."),
  g4ScienceConcept("sound energy transfer","Sound transfers energy when vibrations cause nearby matter to move","Sound transfers the vibrating object itself across the room","Sound destroys the air it crosses","Sound can travel without interacting with matter","A speaker makes lightweight rice grains bounce.","A sealed source causes a membrane at the other end of an air-filled tube to vibrate."),
  g4ScienceConcept("pitch","Pitch is related to vibration rate; faster vibrations generally produce higher pitch","Pitch describes only loudness","Slower vibrations always make a higher pitch","Pitch is determined only by object color","A shorter taut string vibrates faster and sounds higher.","A student changes string length while holding material and tension constant."),
  g4ScienceConcept("volume","Louder sounds are associated with larger vibrations and greater energy transfer","Volume and pitch are the same property","Louder sounds always vibrate more slowly","A quiet sound transfers no energy","A drum struck harder moves nearby grains farther.","Two recordings have the same pitch but different measured vibration sizes."),
  g4ScienceConcept("sound investigation evidence","A fair sound investigation measures vibration effects while changing one factor and controlling the rest","Judging speaker color is strong sound evidence","Changing distance, source, and volume together isolates one cause","One trial removes the need for measurement","Students compare grain movement at controlled speaker volume settings.","A class repeats matched trials and graphs particle displacement rather than relying on hearing alone." )
]));

g4Register("sci","L28","4.2(B)","Analyze data by identifying significant features and patterns",g4ScienceMasteryItems("Scientific Investigation",[
  g4ScienceConcept("testable questions","A scientific investigation begins with a question that can be answered using observations or measurements","A testable question asks only for a personal preference","Every question requires no evidence","A scientific question must have a predetermined answer","Students ask whether ramp height affects toy-car travel distance.","A class revises 'Which ramp is best?' into a measurable comparison with defined conditions."),
  g4ScienceConcept("controlled variables","A fair comparison changes the tested variable while keeping other relevant conditions consistent","A fair comparison changes all conditions at once","Controlled variables are the final results","Repeating a trial replaces the need for controls","The same car and surface are used while ramp height changes.","Two plant-light treatments require equal species, soil, water, pot size, and observation time."),
  g4ScienceConcept("organized data","Tables and graphs organize measurements so features, differences, and patterns can be identified","A memory of the results is stronger than recorded data","Graphs should omit units and labels","Data order cannot affect interpretation","A table lists trial number, ramp height, and distance in centimeters.","A graph must reveal whether distance consistently rises as height rises and show an unusual trial."),
  g4ScienceConcept("evidence-based conclusions","A valid conclusion answers the question using the collected data and states the limits of the evidence","A conclusion should repeat the prediction even when data disagree","One result supports every possible situation","Opinions are stronger than measurements","Four of five trials show greater distance on tile than carpet.","Data support a pattern in one car-and-surface setup but do not test all vehicles or surfaces."),
  g4ScienceConcept("repeated trials and revision","Repeated trials reveal consistency, reduce the influence of unusual results, and can guide improvements","Repeated trials guarantee a preferred answer","A scientist should remove every unexpected result","Revision means changing data to match a claim","One measurement differs greatly from four similar measurements.","A class checks the procedure, repeats the trial, and revises the model when new evidence remains different." )
]));

/* L11-L28 were registered after the original audit block. Rebind every
   Grade 4 science generator and then publish the final metadata/audit. */
for(let lessonNumber=1; lessonNumber<=28; lessonNumber++){
  const lesson=`L${lessonNumber}`;
  globalThis[`gen_g4_sci_${lesson}`]=()=>g4BankQuestion("sci",lesson);
}

Object.entries(G4_TEKS_BANKS).forEach(([key, bank])=>{
  const fn=globalThis[`gen_g4_${bank.subject}_${bank.lesson}`];
  if(typeof fn !== "function") return;
  const meta=bank.items[0].teksExpectation;
  fn.teksExpectation=meta;
  fn.teksStudentExpectation=meta;
  fn.questionCount=25;
  fn.difficultyTiers=5;
});

window.G4_TEKS_OWNED_AUDIT=(()=>{
  const failures=[];
  Object.entries(G4_TEKS_BANKS).forEach(([key,bank])=>{
    if(bank.items.length!==25) failures.push(`${key}:count`);
    if(new Set(bank.items.map(item=>item.q)).size!==25) failures.push(`${key}:duplicate`);
    if(bank.items.filter(item=>item.type==="truefalse").length!==6) failures.push(`${key}:truefalse`);
    if(bank.items.map(item=>item.difficulty).join("")!=="1111122222333334444455555") failures.push(`${key}:difficulty`);
    if(bank.items.slice(20).some(item=>/^(Error analysis|Evidence synthesis|Multi-condition reasoning|Challenge review|Mastery defense):/i.test(item.q))) failures.push(`${key}:mastery-prefix`);
  });
  return Object.freeze({lessons:Object.keys(G4_TEKS_BANKS).length,questions:Object.keys(G4_TEKS_BANKS).length*25,bands:Object.freeze(["Foundation","Apply","Reason","Challenge","Mastery"]),failures:Object.freeze(failures)});
})();
