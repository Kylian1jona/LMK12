/* K12 curriculum data and history wiring
   Split from components/k12-lessons.js. Keep loaded as a classic script.
*/

/* The explicit classic bank replaces this placeholder before a lesson starts. */
function classicQuestionPending(){
  throw new Error("The explicit 25-question lesson bank has not finished loading.");
}

const CURR = {
  g2: {
    eng: {
      showName: "Grade 2 English",
      L1: { name:"Nouns & Verbs",     gen: classicQuestionPending },
      L2: { name:"Sentence Fix",      gen: classicQuestionPending },
      L3: { name:"Reading Check",     gen: classicQuestionPending },
      L4: {name:"Parts of Speech (Drag)",gen: classicQuestionPending},
      L5: { name:"Past vs Present",   gen: classicQuestionPending },
      L6: { name:"Syllables",   gen: classicQuestionPending },
      L7: { name:"Fill in the Blank", gen: classicQuestionPending },
L8: { name:"Sentence Editing", gen: classicQuestionPending },
L9: { name:"Memory Match", gen: classicQuestionPending },
L10:{ name:"Speed Challenge", gen: classicQuestionPending }
    },
    math: {
      showName: "Grade 2 Math",
      L1: { name:"2–3 Digit Add/Sub", gen: classicQuestionPending, image:{ src:"images/Addq1.png", alt:"Addition modeled with place value blocks" } },
      L2: { name:"Place Value",       gen: classicQuestionPending, image:{ src:"images/PlaceValueq1.png", alt:"Place value blocks for hundreds, tens, and ones" } },
      L3: { name:"Time to 5 Minutes", gen: classicQuestionPending },
      L4: { name:"Skip Count (5s/10s)", gen: classicQuestionPending },
      L5: { name:"Word Problems",     gen: classicQuestionPending },
      L6: { name:"Money Memory Match",     gen: classicQuestionPending },
      L7: { name:"Add/Sub Speed Problems",     gen: classicQuestionPending }
    },
    sci: {
      showName: "Grade 2 Science",
      L1: { name:"States of Matter",  gen: classicQuestionPending, image:{ src:"images/130921.png", alt:"States of matter diagram" } },
      L2: { name:"Animal Groups",     gen: classicQuestionPending, image:{ src:"images/image copy.png", alt:"Animal classification diagram" } },
      L3: { name:"Life Cycles",       gen: classicQuestionPending, image:{ src:"images/image.png", alt:"Butterfly life cycle diagram" } },
      L4: { name:"Plant Parts",       gen: classicQuestionPending, image:{ src:"images/124016.png", alt:"Plant parts diagram" } }
    }
  },

g3: {

    eng: {
  showName: "Grade 3 English",

  L1:{name:"Short Vowels", gen: classicQuestionPending, image:{src:"images/g3-eng-l01-short-vowels-v2.png",alt:"Picture examples for short vowel sounds: cat, hen, fish, fox, and sun"}},
  L2:{name:"Long Vowels", gen: classicQuestionPending, image:{src:"images/g3-eng-l02-long-vowels-v2.png",alt:"Picture examples for long vowel sounds: cake, tree, kite, home, and cube"}},
  L3:{name:"Vowel Sounds", gen: classicQuestionPending, image:{src:"images/g3-eng-l03-vowel-sounds-v2.png",alt:"A learner listening to vowel sounds with picture clues"}},
  L4:{name:"CVC Words", gen: classicQuestionPending, image:{src:"images/g3-eng-l04-cvc-words-v2.png",alt:"Cat, pig, and dog pictures with three sound tiles"}},
  L5:{name:"Silent E Words", gen: classicQuestionPending, image:{src:"images/g3-eng-l05-silent-e-v2.png",alt:"Picture pairs showing how silent e changes a word"}},
  L6:{name:"Vowel Review", gen: classicQuestionPending, image:{src:"images/g3-eng-l06-vowel-review-v2.png",alt:"Vowel picture review path with familiar word examples"}},

  L7:{name:"Blends", gen: classicQuestionPending, image:{src:"images/g3-eng-l07-blends-v2.png",alt:"Picture examples for consonant blends: flag, crab, drum, frog, and brick"}},
  L8:{name:"Digraphs", gen: classicQuestionPending, image:{src:"images/g3-eng-l08-digraphs-v2.png",alt:"Picture examples for digraphs: ship, chair, thumb, and wheel"}},
  L9:{name:"Trigraphs", gen: classicQuestionPending, image:{src:"images/g3-eng-l09-trigraphs-v2.png",alt:"Picture examples for three-letter sound patterns"}},
  L10:{name:"Beginning Blends", gen: classicQuestionPending, image:{src:"images/g3-eng-l10-beginning-blends-v2.png",alt:"Beginning blend picture examples: star, cloud, frog, drum, and slide"}},
  L11:{name:"Ending Blends", gen: classicQuestionPending, image:{src:"images/g3-eng-l11-ending-blends-v2.png",alt:"Ending blend picture examples: nest, lamp, hand, milk, and gift"}},
  L12:{name:"Blends Review", gen: classicQuestionPending, image:{src:"images/g3-eng-l12-blends-review-v2.png",alt:"A playful consonant blends review path"}},

  L13:{name:"Variant Vowels", gen: classicQuestionPending, image:{src:"images/g3-eng-l13-variant-vowels-v2.png",alt:"Variant vowel picture examples: book, moon, ball, and saw"}},
  L14:{name:"Diphthongs", gen: classicQuestionPending, image:{src:"images/g3-eng-l14-diphthongs-v2.png",alt:"Diphthong picture examples: coin, toy boat, cloud, and cow"}},
  L15:{name:"R-Controlled Vowels", gen: classicQuestionPending, image:{src:"images/g3-eng-l15-r-controlled-vowels-v2.png",alt:"R-controlled vowel picture examples: car, bird, fork, and turtle"}},
  L16:{name:"Vowel Patterns", gen: classicQuestionPending, image:{src:"images/g3-eng-l16-vowel-patterns-v2.png",alt:"Vowel pattern picture examples: rain, beach, boat, and night"}},
  L17:{name:"R-Vowel Words", gen: classicQuestionPending},
  L18:{name:"Vowel Pattern Review", gen: classicQuestionPending},

  L19:{name:"Multisyllabic Words", gen: classicQuestionPending},
  L20:{name:"Syllable Parts", gen: classicQuestionPending},
  L21:{name:"Open Syllables", gen: classicQuestionPending},
  L22:{name:"Closed Syllables", gen: classicQuestionPending},
  L23:{name:"Divide Syllables", gen: classicQuestionPending},
  L24:{name:"Syllable Review", gen: classicQuestionPending},

  L25:{name:"Irregular Words", gen: classicQuestionPending},
  L26:{name:"Tricky Words", gen: classicQuestionPending},
  L27:{name:"High-Frequency Words", gen: classicQuestionPending},
  L28:{name:"Irregular Spelling", gen: classicQuestionPending},
  L29:{name:"Read Irregular Words", gen: classicQuestionPending},
  L30:{name:"Irregular Words Review", gen: classicQuestionPending},

  L31:{name:"Main Idea", gen: classicQuestionPending},
  L32:{name:"Supporting Details", gen: classicQuestionPending},
  L33:{name:"Find the Main Idea", gen: classicQuestionPending},
  L34:{name:"Key Details", gen: classicQuestionPending},
  L35:{name:"Main Idea Practice", gen: classicQuestionPending},
  L36:{name:"Main Idea Review", gen: classicQuestionPending},

  L37:{name:"Inference", gen: classicQuestionPending},
  L38:{name:"Use Text Clues", gen: classicQuestionPending},
  L39:{name:"Theme", gen: classicQuestionPending},
  L40:{name:"Infer Feelings", gen: classicQuestionPending},
  L41:{name:"Infer Meaning", gen: classicQuestionPending},
  L42:{name:"Inference Review", gen: classicQuestionPending},

  L43:{name:"Author's Purpose", gen: classicQuestionPending},
  L44:{name:"Persuade", gen: classicQuestionPending},
  L45:{name:"Inform", gen: classicQuestionPending},
  L46:{name:"Entertain", gen: classicQuestionPending},
  L47:{name:"Purpose Practice", gen: classicQuestionPending},
  L48:{name:"Author's Purpose Review", gen: classicQuestionPending},

  L49:{name:"Text Structure", gen: classicQuestionPending},
  L50:{name:"Sequence", gen: classicQuestionPending},
  L51:{name:"Compare and Contrast", gen: classicQuestionPending},
  L52:{name:"Cause and Effect", gen: classicQuestionPending},
  L53:{name:"Problem and Solution", gen: classicQuestionPending},
  L54:{name:"Text Structure Review", gen: classicQuestionPending},

  L55:{name:"Sensory Details", gen: classicQuestionPending},
  L56:{name:"Sight Details", gen: classicQuestionPending},
  L57:{name:"Sound Details", gen: classicQuestionPending},
  L58:{name:"Smell and Taste Details", gen: classicQuestionPending},
  L59:{name:"Touch Details", gen: classicQuestionPending},
  L60:{name:"Sensory Review", gen: classicQuestionPending},

  L61:{name:"Topic Sentences", gen: classicQuestionPending},
  L62:{name:"Strong Topic Sentences", gen: classicQuestionPending},
  L63:{name:"Paragraph Main Idea", gen: classicQuestionPending},
  L64:{name:"Choose Topic Sentence", gen: classicQuestionPending},
  L65:{name:"Fix Topic Sentence", gen: classicQuestionPending},
  L66:{name:"Topic Sentence Review", gen: classicQuestionPending},

  L67:{name:"Linking Words", gen: classicQuestionPending},
  L68:{name:"Sequence Words", gen: classicQuestionPending},
  L69:{name:"Compare Words", gen: classicQuestionPending},
  L70:{name:"Cause Words", gen: classicQuestionPending},
  L71:{name:"Transition Words", gen: classicQuestionPending},
  L72:{name:"Linking Words Review", gen: classicQuestionPending},

  L73:{name:"Editing", gen: classicQuestionPending},
  L74:{name:"Revising", gen: classicQuestionPending},
  L75:{name:"Capitalization", gen: classicQuestionPending},
  L76:{name:"Punctuation", gen: classicQuestionPending},
  L77:{name:"Sentence Fixes", gen: classicQuestionPending},
  L78:{name:"Editing Review", gen: classicQuestionPending},

  L79:{name:"Descriptive Details", gen: classicQuestionPending},
  L80:{name:"Add Details", gen: classicQuestionPending},
  L81:{name:"Describe Characters", gen: classicQuestionPending},
  L82:{name:"Describe Settings", gen: classicQuestionPending},
  L83:{name:"Strong Details", gen: classicQuestionPending},
  L84:{name:"Description Review", gen: classicQuestionPending},

  L85:{name:"Prefixes", gen: classicQuestionPending},
  L86:{name:"Suffixes", gen: classicQuestionPending},
  L87:{name:"Word Parts", gen: classicQuestionPending},
  L88:{name:"Prefix Meanings", gen: classicQuestionPending},
  L89:{name:"Suffix Meanings", gen: classicQuestionPending},
  L90:{name:"Prefixes and Suffixes Review", gen: classicQuestionPending},

  L91:{name:"Compound Words", gen: classicQuestionPending},
  L92:{name:"Build Compound Words", gen: classicQuestionPending},
  L93:{name:"Split Compound Words", gen: classicQuestionPending},
  L94:{name:"Compound Word Meanings", gen: classicQuestionPending},
  L95:{name:"Compound Word Practice", gen: classicQuestionPending},
  L96:{name:"Compound Words Review", gen: classicQuestionPending},

  L97:{name:"Homophones", gen: classicQuestionPending},
  L98:{name:"Homonyms", gen: classicQuestionPending},
  L99:{name:"There Their They're", gen: classicQuestionPending},
  L100:{name:"To Two Too", gen: classicQuestionPending},
  L101:{name:"Word Meaning Clues", gen: classicQuestionPending},
  L102:{name:"Homophones Review", gen: classicQuestionPending},

  L103:{name:"Greek Roots", gen: classicQuestionPending},
  L104:{name:"Latin Roots", gen: classicQuestionPending},
  L105:{name:"Root Meanings", gen: classicQuestionPending},
  L106:{name:"Root Word Practice", gen: classicQuestionPending},
  L107:{name:"Build Words from Roots", gen: classicQuestionPending},
  L108:{name:"Roots Review", gen: classicQuestionPending},

  L109:{name:"Spelling", gen: classicQuestionPending},
  L110:{name:"Common Spelling Patterns", gen: classicQuestionPending},
  L111:{name:"Word Families", gen: classicQuestionPending},
  L112:{name:"Spelling Rules", gen: classicQuestionPending},
  L113:{name:"Correct Spelling", gen: classicQuestionPending},
  L114:{name:"Spelling Review", gen: classicQuestionPending},

  L115:{name:"Prepositions", gen: classicQuestionPending},
  L116:{name:"Prepositional Phrases", gen: classicQuestionPending},
  L117:{name:"Location Words", gen: classicQuestionPending},
  L118:{name:"Time Words", gen: classicQuestionPending},
  L119:{name:"Choose Preposition", gen: classicQuestionPending},
  L120:{name:"Prepositions Review", gen: classicQuestionPending},

  L121:{name:"Verb Tense", gen: classicQuestionPending},
  L122:{name:"Past Tense", gen: classicQuestionPending},
  L123:{name:"Present Tense", gen: classicQuestionPending},
  L124:{name:"Future Tense", gen: classicQuestionPending},
  L125:{name:"Fix Verb Tense", gen: classicQuestionPending},
  L126:{name:"Verb Tense Review", gen: classicQuestionPending},

  L127:{name:"Verb Types", gen: classicQuestionPending},
  L128:{name:"Action Verbs", gen: classicQuestionPending},
  L129:{name:"Linking Verbs", gen: classicQuestionPending},
  L130:{name:"Helping Verbs", gen: classicQuestionPending},
  L131:{name:"Choose the Verb", gen: classicQuestionPending},
  L132:{name:"Verb Types Review", gen: classicQuestionPending},

  L133:{name:"Contractions", gen: classicQuestionPending},
  L134:{name:"Apostrophes", gen: classicQuestionPending},
  L135:{name:"Make Contractions", gen: classicQuestionPending},
  L136:{name:"Expand Contractions", gen: classicQuestionPending},
  L137:{name:"Contraction Practice", gen: classicQuestionPending},
  L138:{name:"Contractions Review", gen: classicQuestionPending},

  L139:{name:"Conjunctions", gen: classicQuestionPending},
  L140:{name:"And But Or", gen: classicQuestionPending},
  L141:{name:"Join Sentences", gen: classicQuestionPending},
  L142:{name:"Choose Conjunction", gen: classicQuestionPending},
  L143:{name:"Fix Conjunctions", gen: classicQuestionPending},
  L144:{name:"Conjunctions Review", gen: classicQuestionPending}
},
   math: {
  showName: "Grade 3 Math",

  L1: { name:"Place Value to 1,000", gen: classicQuestionPending },
  L2: { name:"Expanded Form", gen: classicQuestionPending },
  L3: { name:"Standard Form", gen: classicQuestionPending },
  L4: { name:"Word Form Match", gen: classicQuestionPending },
  L5: { name:"Place Value Fix", gen: classicQuestionPending },
  L6: { name:"Place Value Review", gen: classicQuestionPending },

  L7: { name:"Compare Numbers", gen: classicQuestionPending },
  L8: { name:"Greater Than & Less Than", gen: classicQuestionPending },
  L9: { name:"Order Numbers", gen: classicQuestionPending },
  L10: { name:"Compare Review", gen: classicQuestionPending },
  L11: { name:"Least to Greatest", gen: classicQuestionPending },
  L12: { name:"Ordering Practice", gen: classicQuestionPending },

  L13: { name:"Round to Tens", gen: classicQuestionPending },
  L14: { name:"Round to Hundreds", gen: classicQuestionPending },
  L15: { name:"Rounding Rules", gen: classicQuestionPending },
  L16: { name:"Rounding Tens Practice", gen: classicQuestionPending },
  L17: { name:"Rounding Hundreds Practice", gen: classicQuestionPending },
  L18: { name:"Rounding Review", gen: classicQuestionPending },

  L19: { name:"Estimate Sums Match", gen: classicQuestionPending },
  L20: { name:"Estimate Sums Fix", gen: classicQuestionPending },
  L21: { name:"Estimate Sums MC", gen: classicQuestionPending },
  L22: { name:"Estimate Sums Speed", gen: classicQuestionPending },
  L23: { name:"Estimate Sums Fill", gen: classicQuestionPending },
  L24: { name:"Estimate Sums Review", gen: classicQuestionPending },

  L25: { name:"Estimate Sums Correction", gen: classicQuestionPending },
  L26: { name:"Estimate Differences MC", gen: classicQuestionPending },
  L27: { name:"Estimate Differences Speed", gen: classicQuestionPending },
  L28: { name:"Estimate Differences Fill", gen: classicQuestionPending },
  L29: { name:"Estimate Differences Match", gen: classicQuestionPending },
  L30: { name:"Estimate Differences Fix", gen: classicQuestionPending },

  L31: { name:"Three-Digit Addition MC", gen: classicQuestionPending },
  L32: { name:"Three-Digit Addition Speed", gen: classicQuestionPending },
  L33: { name:"Three-Digit Addition Fill", gen: classicQuestionPending },
  L34: { name:"Three-Digit Addition Match", gen: classicQuestionPending },
  L35: { name:"Three-Digit Addition Fix", gen: classicQuestionPending },
  L36: { name:"Addition Word Problems", gen: classicQuestionPending },

  L37: { name:"Three-Digit Subtraction MC", gen: classicQuestionPending },
  L38: { name:"Three-Digit Subtraction Speed", gen: classicQuestionPending },
  L39: { name:"Three-Digit Subtraction Fill", gen: classicQuestionPending },
  L40: { name:"Three-Digit Subtraction Match", gen: classicQuestionPending },
  L41: { name:"Three-Digit Subtraction Fix", gen: classicQuestionPending },
  L42: { name:"Subtraction Word Problems", gen: classicQuestionPending },

  L43: { name:"Money Values", gen: classicQuestionPending },
  L44: { name:"Money Math", gen: classicQuestionPending },
  L45: { name:"Needs vs Wants", gen: classicQuestionPending },
  L46: { name:"Budget Basics", gen: classicQuestionPending },
  L47: { name:"Money Word Problems", gen: classicQuestionPending },
  L48: { name:"Financial Literacy Review", gen: classicQuestionPending },

  L49: { name:"Mixed Operations Fill", gen: classicQuestionPending },
  L50: { name:"Mixed Operations Match", gen: classicQuestionPending },
  L51: { name:"Mixed Operations Fix", gen: classicQuestionPending },
  L52: { name:"Choose the Operation", gen: classicQuestionPending },
  L53: { name:"Mixed Operations Speed", gen: classicQuestionPending },
  L54: { name:"Mixed Operations Challenge", gen: classicQuestionPending },

  L55: { name:"Division Facts Match", gen: classicQuestionPending },
  L56: { name:"Division Fix", gen: classicQuestionPending },
  L57: { name:"Division Word Problems", gen: classicQuestionPending },
  L58: { name:"Division Speed", gen: classicQuestionPending },
  L59: { name:"Division Fill Blanks", gen: classicQuestionPending },
  L60: { name:"Division Review", gen: classicQuestionPending }
},
    sci: {
      showName: "Grade 3 Science",
      L1: { name:"Habitats",          gen: classicQuestionPending, image:{ src:"images/Habitats.png", alt:"Habitats diagram showing different places and living things" } },
      L2: { name:"Weather Tools",     gen: classicQuestionPending, image:{ src:"images/123114.png", alt:"Weather tools diagram" } },
      L3: { name:"Forces & Motion",   gen: classicQuestionPending, image:{ src:"images/Forces.png", alt:"Forces and motion diagram showing pushes, pulls, and friction" } }
    }
  },

g4: {
  eng: {
    showName: "Grade 4 English",

    // CONTEXT CLUES
    L1:  { name:"Meaning from Sentences",        gen: classicQuestionPending },
    L2:  { name:"Definition Clues",              gen: classicQuestionPending },
    L3:  { name:"Example Clues",                 gen: classicQuestionPending },
    L4:  { name:"Contrast Clues",                gen: classicQuestionPending },

    // SYNONYMS AND ANTONYMS
    L5:  { name:"Synonym Match",                 gen: classicQuestionPending },
    L6:  { name:"Antonym Match",                 gen: classicQuestionPending },
    L7:  { name:"Word Relationships",            gen: classicQuestionPending },
    L8:  { name:"Choosing Better Words",         gen: classicQuestionPending },

    // THEME
    L9:  { name:"Finding the Lesson",            gen: classicQuestionPending },
    L10: { name:"Theme in Short Stories",        gen: classicQuestionPending },
    L11: { name:"Character Actions and Theme",   gen: classicQuestionPending },
    L12: { name:"Supporting the Theme", gen: classicQuestionPending },

// NEW READING SKILLS
L13: { name:"Main Idea",            gen: classicQuestionPending },
L14: { name:"Supporting Details",   gen: classicQuestionPending },
L15: { name:"Author's Purpose",     gen: classicQuestionPending },

// NEW STORY UNDERSTANDING
L16: { name:"Point of View",        gen: classicQuestionPending },
L17: { name:"Cause and Effect",     gen: classicQuestionPending },
L18: { name:"Sequence of Events",   gen: classicQuestionPending },

// NEW GRAMMAR AND WRITING
L19: { name:"Homophones",           gen: classicQuestionPending, image:{ src:"images/Homophones.png", alt:"Homophones poster showing see and sea" } },
L20: { name:"Complete Sentences",   gen: classicQuestionPending },
L21: { name:"Punctuation",          gen: classicQuestionPending }
  },

  math: {
    showName: "Grade 4 Math",

    // MULTI-DIGIT MULTIPLICATION
    L1:  { name:"2-Digit × 1-Digit Multiplication",    gen: classicQuestionPending },
    L2:  { name:"3-Digit × 1-Digit Multiplication",    gen: classicQuestionPending },
    L3:  { name:"2-Digit × 2-Digit Multiplication",    gen: classicQuestionPending },
    L4:  { name:"Multiplication Word Problems",        gen: classicQuestionPending },

    // FACTORS AND MULTIPLES
    L5:  { name:"Finding Factors",                      gen: classicQuestionPending },
    L6:  { name:"Finding Multiples",                    gen: classicQuestionPending },
    L7:  { name:"Prime and Composite Numbers",          gen: classicQuestionPending },
    L8:  { name:"Factor Pairs",                         gen: classicQuestionPending },

    // EQUIVALENT FRACTIONS
    L9:  { name:"Equivalent Fractions with Models",     gen: classicQuestionPending },
    L10: { name:"Generating Equivalent Fractions",      gen: classicQuestionPending },
    L11: { name:"Comparing Equivalent Fractions",       gen: classicQuestionPending },
L12: { name:"Equivalent Fraction Word Problems", gen: classicQuestionPending },

// NEW DIVISION
L13: { name:"Division Facts",          gen: classicQuestionPending },
L14: { name:"Long Division",           gen: classicQuestionPending },
L15: { name:"Add/Sub Word Problems",   gen: classicQuestionPending },

// NEW FRACTIONS AND DECIMALS
L16: { name:"Comparing Fractions",     gen: classicQuestionPending },
L17: { name:"Mixed Numbers",           gen: classicQuestionPending },
L18: { name:"Decimal Place Value",     gen: classicQuestionPending },

// NEW GEOMETRY
L19: { name:"Angles",                  gen: classicQuestionPending },
L20: { name:"Area and Perimeter",      gen: classicQuestionPending }
  },

  sci: {
    showName: "Grade 4 Science",

    // LIVING THINGS AND ECOSYSTEMS
    L1:  { name:"Plant and Animal Structures",    gen: classicQuestionPending , image:{ src:"images/g4-sci-l1-plant-animal-structures.png", alt:"Plant and animal structures diagram" } },
    L2:  { name:"Producers and Consumers",        gen: classicQuestionPending ,image:{ src:"images/131929.png", alt:"Plant parts diagram" } },
    L3:  { name:"Food Chains",                    gen: classicQuestionPending, image:{ src:"images/152905.png", alt:"Food chains diagram" } },
    L4:  { name:"Food Webs",                      gen: classicQuestionPending, image:{ src:"images/153230.png", alt:"Food webs diagram" } },

    // EARTH'S SURFACE
    L5:  { name:"Rocks and Minerals",              gen: classicQuestionPending, image:{ src:"images/153830.png", alt:"Rocks and minerals diagram" } },
    L6:  { name:"Weathering",                      gen: classicQuestionPending, image:{ src:"images/154640.png", alt:"Weathering diagram" } },
    L7:  { name:"Erosion and Deposition",          gen: classicQuestionPending},
    L8:  { name:"How Landforms Change",            gen: classicQuestionPending },

    // MATTER
    L9:  { name:"States of Matter",                gen: classicQuestionPending },
    L10: { name:"Properties of Matter",            gen: classicQuestionPending },
    L11: { name:"Physical Changes",                gen: classicQuestionPending },
    L12: { name:"Mixtures and Solutions",          gen: classicQuestionPending },

    // ENERGY AND MOTION
    L13: { name:"Forms of Energy",                 gen: classicQuestionPending, image:{ src:"images/93298.jpg", alt:"Different forms of energy diagram" } },
    L14: { name:"Light Energy",                    gen: classicQuestionPending },
    L15: { name:"Heat and Electrical Energy",      gen: classicQuestionPending },
    L16: { name:"Force and Motion",                gen: classicQuestionPending },

    // EARTH AND SPACE
    L17: { name:"The Water Cycle",                 gen: classicQuestionPending },
    L18: { name:"Weather Patterns",                gen: classicQuestionPending },
    L19: { name:"The Solar System",                gen: classicQuestionPending },
L20: { name:"Moon Phases",             gen: classicQuestionPending },

// NEW LIVING THINGS
L21: { name:"Animal Adaptations",      gen: classicQuestionPending },
L22: { name:"Habitats",                gen: classicQuestionPending },

// NEW EARTH SCIENCE
L23: { name:"Fossils",                 gen: classicQuestionPending },
L24: { name:"Earth's Layers",          gen: classicQuestionPending },
L25: { name:"Natural Resources",       gen: classicQuestionPending },

// NEW FORCES AND INVESTIGATION
L26: { name:"Magnetism",               gen: classicQuestionPending },
L27: { name:"Sound Energy",            gen: classicQuestionPending },
L28: { name:"Scientific Investigation",gen: classicQuestionPending }
  }
},

g5: {
  eng: {
    showName: "Grade 5 English",

    L1:  { name:"Inference",              gen: classicQuestionPending, image:{ src:"images/Inferences.png", alt:"Making inferences poster with text clues" } },
    L2:  { name:"Figurative Language",    gen: classicQuestionPending, image:{ src:"images/FigLang.png", alt:"Figurative language poster with examples" } },
    L3:  { name:"Text Structure",         gen: classicQuestionPending },

    L4:  { name:"Main Idea",              gen: classicQuestionPending },
    L5:  { name:"Supporting Details",     gen: classicQuestionPending },
    L6:  { name:"Author's Purpose",       gen: classicQuestionPending },
    L7:  { name:"Context Clues",          gen: classicQuestionPending },
    L8:  { name:"Synonyms & Antonyms",    gen: classicQuestionPending },
    L9:  { name:"Prefixes & Suffixes",    gen: classicQuestionPending },
    L10: { name:"Subject & Predicate",    gen: classicQuestionPending },
    L11: { name:"Verb Tense",             gen: classicQuestionPending },
    L12: { name:"Punctuation",            gen: classicQuestionPending }
  },

  math: {
    showName: "Grade 5 Math",

    L1:  { name:"Decimals",               gen: classicQuestionPending },
    L2:  { name:"Fraction Operations",    gen: classicQuestionPending },
    L3:  { name:"Order of Operations",    gen: classicQuestionPending },

    L4:  { name:"Decimal Place Value",    gen: classicQuestionPending },
    L5:  { name:"Compare Decimals",       gen: classicQuestionPending },
    L6:  { name:"Equivalent Fractions",   gen: classicQuestionPending },
    L7:  { name:"Mixed Numbers",          gen: classicQuestionPending },
    L8:  { name:"Volume",                 gen: classicQuestionPending },
    L9:  { name:"Coordinate Plane",       gen: classicQuestionPending },
    L10: { name:"Patterns",               gen: classicQuestionPending },
    L11: { name:"Word Problems",          gen: classicQuestionPending }
  },

  sci: {
    showName: "Grade 5 Science",

    L1:  { name:"Solar System",           gen: classicQuestionPending },
    L2:  { name:"Cells",                  gen: classicQuestionPending },
    L3:  { name:"Mixtures & Solutions",   gen: classicQuestionPending },

    L4:  { name:"Earth's Rotation",       gen: classicQuestionPending },
    L5:  { name:"Weather & Climate",      gen: classicQuestionPending },
    L6:  { name:"Water Cycle",            gen: classicQuestionPending },
    L7:  { name:"Plant Systems",          gen: classicQuestionPending },
    L8:  { name:"Food Chains",            gen: classicQuestionPending },
    L9:  { name:"Physical Changes",       gen: classicQuestionPending },
    L10: { name:"Force & Motion",         gen: classicQuestionPending },
    L11: { name:"Forms of Energy",        gen: classicQuestionPending }
  }
},
  g6: {
    eng: {
      showName: "Grade 6 English",
      L1: { name:"Theme & Summary",   gen: classicQuestionPending },
      L2: { name:"Context Clues",     gen: classicQuestionPending },
      L3: { name:"Text Evidence",     gen: classicQuestionPending },
L4:{ name:"Main Idea Basics", gen: classicQuestionPending },
L5:{ name:"Supporting Details", gen: classicQuestionPending },
L6:{ name:"Summarizing", gen: classicQuestionPending },
L7:{ name:"Theme vs Main Idea", gen: classicQuestionPending },
L8:{ name:"Find the Best Title", gen: classicQuestionPending },

L9:{ name:"Author's Purpose", gen: classicQuestionPending },
L10:{ name:"Persuade Inform Explain", gen: classicQuestionPending },
L11:{ name:"Tone Words", gen: classicQuestionPending },
L12:{ name:"Mood vs Tone", gen: classicQuestionPending },
L13:{ name:"Author's Viewpoint", gen: classicQuestionPending },

L14:{ name:"Cause and Effect", gen: classicQuestionPending },
L15:{ name:"Compare and Contrast", gen: classicQuestionPending },
L16:{ name:"Problem and Solution", gen: classicQuestionPending },
L17:{ name:"Sequence", gen: classicQuestionPending },
L18:{ name:"Description", gen: classicQuestionPending },

L19:{ name:"Synonyms", gen: classicQuestionPending },
L20:{ name:"Antonyms", gen: classicQuestionPending },
L21:{ name:"Context Clues", gen: classicQuestionPending },
L22:{ name:"Strong Word Choice", gen: classicQuestionPending },
L23:{ name:"Word Relationships", gen: classicQuestionPending },

L24:{ name:"Common Idioms", gen: classicQuestionPending },
L25:{ name:"Idiom Meaning", gen: classicQuestionPending },
L26:{ name:"Adages", gen: classicQuestionPending },
L27:{ name:"Proverbs", gen: classicQuestionPending },
L28:{ name:"Figurative Language", gen: classicQuestionPending },

L29:{ name:"There Their They're", gen: classicQuestionPending },
L30:{ name:"To Too Two", gen: classicQuestionPending },
L31:{ name:"Your You're", gen: classicQuestionPending },
L32:{ name:"Its It's", gen: classicQuestionPending },
L33:{ name:"Mixed Homophones", gen: classicQuestionPending },

L34:{ name:"Preposition Basics", gen: classicQuestionPending },
L35:{ name:"Prepositional Phrases", gen: classicQuestionPending },
L36:{ name:"Location Words", gen: classicQuestionPending },
L37:{ name:"Time Words", gen: classicQuestionPending },
L38:{ name:"Preposition Review", gen: classicQuestionPending },

L39:{ name:"Root Basics", gen: classicQuestionPending },
L40:{ name:"Greek Roots", gen: classicQuestionPending },
L41:{ name:"Latin Roots", gen: classicQuestionPending },
L42:{ name:"Prefixes and Roots", gen: classicQuestionPending },
L43:{ name:"Word Meaning", gen: classicQuestionPending },

L44:{ name:"Direct Objects", gen: classicQuestionPending },
L45:{ name:"Indirect Objects", gen: classicQuestionPending },
L46:{ name:"Object Practice", gen: classicQuestionPending },
L47:{ name:"Sentence Parts", gen: classicQuestionPending },
L48:{ name:"Object Review", gen: classicQuestionPending },

L49:{ name:"Pronoun Basics", gen: classicQuestionPending },
L50:{ name:"Antecedents", gen: classicQuestionPending },
L51:{ name:"Pronoun Agreement", gen: classicQuestionPending },
L52:{ name:"Clear Pronouns", gen: classicQuestionPending },
L53:{ name:"Pronoun Review", gen: classicQuestionPending }
    },
    math: {
      showName: "Grade 6 Math",
      L1: { name:"Ratios",            gen: classicQuestionPending },
      L2: { name:"Integers",          gen: classicQuestionPending },
      L3: { name:"Expressions",       gen: classicQuestionPending },
      L4:  { name:"Solutions to Inequalities", gen: classicQuestionPending },
L5:  { name:"Graph Inequalities on Number Lines", gen: classicQuestionPending },
L6:  { name:"Write Inequalities from Number Lines", gen: classicQuestionPending },
L7:  { name:"Write Multiplication Expressions Using Exponents", gen: classicQuestionPending },
L8:  { name:"Evaluate Powers with Whole Number Bases", gen: classicQuestionPending },
L9:  { name:"Write Powers of Ten with Exponents", gen: classicQuestionPending },
L10: { name:"Describe the Coordinate Plane", gen: classicQuestionPending },
L11: { name:"Objects on a Coordinate Plane", gen: classicQuestionPending },
L12: { name:"Graph Points on a Coordinate Plane", gen: classicQuestionPending },
L13: { name:"Prime or Composite", gen: classicQuestionPending },
L14: { name:"Identify Factors", gen: classicQuestionPending },
L15: { name:"Greatest Common Factor",  gen: classicQuestionPending },
L16: { name:"Least Common Multiple",   gen: classicQuestionPending },
L17: { name:"Unit Rates",              gen: classicQuestionPending },
L18: { name:"Percent of a Number",     gen: classicQuestionPending },
L19: { name:"Divide Fractions",        gen: classicQuestionPending },
L20: { name:"Decimal Operations",      gen: classicQuestionPending },
L21: { name:"Surface Area",            gen: classicQuestionPending },
L22: { name:"Mean, Median & Range",    gen: classicQuestionPending }

    },
    sci: {
      showName: "Grade 6 Science",
      L1: { name:"Cells & Organelles", gen: classicQuestionPending },
      L2: { name:"Energy",             gen: classicQuestionPending },
      L3:  { name:"Introduction to the rock cycle", gen: classicQuestionPending  },
      L4:  { name:"Classify rocks as igneous, sedimentary, or metamorphic", gen: classicQuestionPending  },
      L5:  { name:"Estimate temperatures", gen: classicQuestionPending  },
      L6:  { name:"Choose customary units of distance", gen: classicQuestionPending  },
      L7:  { name:"Choose metric units of distance, mass, and volume", gen: classicQuestionPending  },
      L8:  { name:"Identify functions of plant cell parts", gen: classicQuestionPending  },
      L9:  { name:"Identify functions of animal cell parts", gen: classicQuestionPending  },
      L10: { name:"Compare cells and cell parts", gen: classicQuestionPending },
      L11: { name:"Calculate speed from time and distance", gen: classicQuestionPending },
      L12: { name:"Calculate distance from speed and time", gen: classicQuestionPending },
      L13: { name:"Predict forces using Newton's third law", gen: classicQuestionPending },
      L14: { name:"Balanced and unbalanced forces", gen: classicQuestionPending },
      L15: { name:"Atoms and Elements",              gen: classicQuestionPending },
L16: { name:"Density",                         gen: classicQuestionPending },
L17: { name:"Thermal Energy",                  gen: classicQuestionPending },
L18: { name:"Waves",                           gen: classicQuestionPending },
L19: { name:"Ecosystems",                      gen: classicQuestionPending },
L20: { name:"Photosynthesis & Respiration", gen: classicQuestionPending },
L21: { name:"Weather and Climate",          gen: classicQuestionPending },
L22: { name:"Earth's Systems",              gen: classicQuestionPending },

// ⚡ Kinetic & Potential Energy
L23: { name:"What Is Energy?",              gen: classicQuestionPending },
L24: { name:"Kinetic Energy",               gen: classicQuestionPending },
L25: { name:"Potential Energy",             gen: classicQuestionPending },
L26: { name:"Energy Transformations",       gen: classicQuestionPending },
L27: { name:"Real-World Energy",            gen: classicQuestionPending },

// 🫀 Anatomy
L28: { name:"Body Systems",                 gen: classicQuestionPending },
L29: { name:"Skeletal System",              gen: classicQuestionPending },
L30: { name:"Muscular System",              gen: classicQuestionPending },
L31: { name:"Circulatory System",           gen: classicQuestionPending, image:{ src:"images/Circulatory.png", alt:"Circulatory system poster showing the heart, arteries, and blood" } },
L32: { name:"Digestive System",             gen: classicQuestionPending, image:{ src:"images/Digestive.png", alt:"Digestive system poster showing organs and nutrient absorption" } },

// 🧪 Biochemistry
L33: { name:"Molecules of Life",            gen: classicQuestionPending, image:{ src:"images/Nutrition.png", alt:"Molecules of life poster showing carbohydrates, proteins, lipids, and nucleic acids" } },
L34: { name:"Proteins",                     gen: classicQuestionPending },
L35: { name:"Carbohydrates",                gen: classicQuestionPending },
L36: { name:"Lipids & Fats",                gen: classicQuestionPending },
L37: { name:"Enzymes",                      gen: classicQuestionPending },

// 🌱 Plant Reproduction
L38: { name:"Flower Structures",            gen: classicQuestionPending },
L39: { name:"Pollination",                  gen: classicQuestionPending },
L40: { name:"Fertilization",                gen: classicQuestionPending },
L41: { name:"Seed Formation",               gen: classicQuestionPending },
L42: { name:"Plant Life Cycles",            gen: classicQuestionPending },

// 🌌 Astronomy
L43: { name:"The Solar System",             gen: classicQuestionPending },
L44: { name:"Planets & Moons",              gen: classicQuestionPending },
L45: { name:"Stars & Constellations",       gen: classicQuestionPending },
L46: { name:"Galaxies",                     gen: classicQuestionPending },
L47: { name:"Space Exploration",            gen: classicQuestionPending },
      
    }
  },
g7: {
  eng: {
    showName: "Grade 7 English",
    L1: { name:"Theme & Central Idea", gen: classicQuestionPending },
    L2: { name:"Text Evidence", gen: classicQuestionPending },
    L3: { name:"Author's Purpose", gen: classicQuestionPending },
    L4: { name:"Parts of Speech (Drag)", gen: classicQuestionPending },
    L5: { name:"Context Clues", gen: classicQuestionPending },
    L6: { name:"Sentence Structure", gen: classicQuestionPending },
    L7: { name:"Fill in the Blank", gen: classicQuestionPending },
    L8: { name:"Sentence Editing", gen: classicQuestionPending },
    L9: { name:"Memory Match", gen: classicQuestionPending },
    L10:{ name:"Speed Challenge", gen: classicQuestionPending }
  },
  math: {
    showName: "Grade 7 Math",
    L1: { name:"Integers", gen: classicQuestionPending },
    L2: { name:"Ratios & Proportions", gen: classicQuestionPending },
    L3: { name:"Expressions", gen: classicQuestionPending },
    L4: { name:"One-Step Equations", gen: classicQuestionPending },
    L5: { name:"Word Problems", gen: classicQuestionPending },
    L6: { name:"Integer Memory Match", gen: classicQuestionPending },
    L7: { name:"Equation Speed Problems", gen: classicQuestionPending }
  },
  sci: {
    showName: "Grade 7 Science",
    L1: { name:"Cells", gen: classicQuestionPending },
    L2: { name:"Body Systems", gen: classicQuestionPending },
    L3: { name:"Ecosystems", gen: classicQuestionPending },
    L4: { name:"Forces & Motion", gen: classicQuestionPending }
  }
},

g8: {
  eng: {
    showName: "Grade 8 English",
    L1: { name:"Central Idea", gen: classicQuestionPending },
    L2: { name:"Text Structure", gen: classicQuestionPending },
    L3: { name:"Argument & Claims", gen: classicQuestionPending },
    L4: { name:"Parts of Speech (Drag)", gen: classicQuestionPending },
    L5: { name:"Tone & Mood", gen: classicQuestionPending },
    L6: { name:"Vocabulary in Context", gen: classicQuestionPending },
    L7: { name:"Fill in the Blank", gen: classicQuestionPending },
    L8: { name:"Sentence Editing", gen: classicQuestionPending },
    L9: { name:"Memory Match", gen: classicQuestionPending },
    L10:{ name:"Speed Challenge", gen: classicQuestionPending }
  },
  math: {
    showName: "Grade 8 Math",
    L1: { name:"Linear Equations", gen: classicQuestionPending },
    L2: { name:"Slope", gen: classicQuestionPending, image:{ src:"images/slope.png", alt:"Slope quiz diagram" } },
    L3: { name:"Functions", gen: classicQuestionPending },
    L4: { name:"Square Numbers Match", gen: classicQuestionPending },
    L5: { name:"Pythagorean Theorem", gen: classicQuestionPending },
    L6: { name:"Slope Memory Match", gen: classicQuestionPending },
    L7: { name:"Linear Equation Speed Problems", gen: classicQuestionPending }
  },
  sci: {
    showName: "Grade 8 Science",
    L1: { name:"Atoms", gen: classicQuestionPending },
    L2: { name:"Chemical Reactions", gen: classicQuestionPending },
    L3: { name:"Genetics", gen: classicQuestionPending },
    L4: { name:"Natural Selection", gen: classicQuestionPending }
  }
},

g9: {
  eng: {
    showName: "Grade 9 English",
    L1: { name:"Literary Analysis", gen: classicQuestionPending },
    L2: { name:"Claims & Evidence", gen: classicQuestionPending },
    L3: { name:"Rhetoric", gen: classicQuestionPending },
    L4: { name:"Parts of Speech (Drag)", gen: classicQuestionPending },
    L5: { name:"Theme Development", gen: classicQuestionPending },
    L6: { name:"Grammar Review", gen: classicQuestionPending },
    L7: { name:"Fill in the Blank", gen: classicQuestionPending },
    L8: { name:"Sentence Editing", gen: classicQuestionPending },
    L9: { name:"Memory Match", gen: classicQuestionPending },
    L10:{ name:"Speed Challenge", gen: classicQuestionPending }
  },
  math: {
    showName: "Grade 9 Math",
    L1: { name:"Algebra Review", gen: classicQuestionPending },
    L2: { name:"Quadratics", gen: classicQuestionPending },
    L3: { name:"Systems of Equations", gen: classicQuestionPending },
    L4: { name:"Exponents", gen: classicQuestionPending },
    L5: { name:"Data Analysis", gen: classicQuestionPending },
    L6: { name:"Algebra Memory Match", gen: classicQuestionPending },
    L7: { name:"Quadratic Speed Problems", gen: classicQuestionPending }
  },
  sci: {
    showName: "Grade 9 Science",
    L1: { name:"Biology Cells", gen: classicQuestionPending },
    L2: { name:"DNA", gen: classicQuestionPending },
    L3: { name:"Ecology", gen: classicQuestionPending },
    L4: { name:"Energy Flow", gen: classicQuestionPending }
  }
},

g10: {
  eng: {
    showName: "Grade 10 English",
    L1: { name:"Theme Development", gen: classicQuestionPending },
    L2: { name:"Rhetorical Appeals", gen: classicQuestionPending },
    L3: { name:"Research Writing", gen: classicQuestionPending },
    L4: { name:"Parts of Speech (Drag)", gen: classicQuestionPending },
    L5: { name:"Syntax", gen: classicQuestionPending },
    L6: { name:"Poetry Analysis", gen: classicQuestionPending },
    L7: { name:"Fill in the Blank", gen: classicQuestionPending },
    L8: { name:"Sentence Editing", gen: classicQuestionPending },
    L9: { name:"Memory Match", gen: classicQuestionPending },
    L10:{ name:"Speed Challenge", gen: classicQuestionPending }
  },
  math: {
    showName: "Grade 10 Math",
    L1: { name:"Geometry Basics", gen: classicQuestionPending },
    L2: { name:"Similarity", gen: classicQuestionPending },
    L3: { name:"Trigonometry", gen: classicQuestionPending },
    L4: { name:"Polynomials", gen: classicQuestionPending },
    L5: { name:"Statistics", gen: classicQuestionPending },
    L6: { name:"Geometry Memory Match", gen: classicQuestionPending },
    L7: { name:"Trigonometry Speed Problems", gen: classicQuestionPending }
  },
  sci: {
    showName: "Grade 10 Science",
    L1: { name:"Chemistry Basics", gen: classicQuestionPending },
    L2: { name:"Periodic Table", gen: classicQuestionPending },
    L3: { name:"Chemical Bonding", gen: classicQuestionPending },
    L4: { name:"Climate Science", gen: classicQuestionPending }
  }
}

 
};


function renderGrade10LessonButtons(){
  // Grade 10 has static buttons in the HTML in this version.
}

const HISTORY_LESSON_BANK = {
  g2:["Families and Communities","Rules and Laws","Maps and Places","Important People","Then and Now"],
  g3:["Communities","Maps and Globes","Local Leaders","Timelines","Needs and Wants"],
  g4:["Regions","State History","Native Peoples","Exploration","Civic Responsibility"],
  g5:["Early America","American Revolution","Constitution","Westward Expansion","Civil War Basics"],
  g6:["Ancient Civilizations","Mesopotamia","Ancient Egypt","Ancient Greece","Ancient Rome"],
  g7:["World Religions","Medieval Europe","Islamic Golden Age","African Kingdoms","Early Americas"],
  g8:["Colonial America","Independence","The Constitution","Reform Movements","Civil War and Reconstruction"],
  g9:["World Geography","Ancient Trade Routes","Revolutions","Industrialization","Nationalism"],
  g10:["Modern World History","Imperialism","World War I","World War II","Cold War"]
};

function genHistoryQuestion(grade, lessonNo){
  const name = HISTORY_LESSON_BANK[grade]?.[lessonNo - 1] || "History";
  const samples = [
    {q:`In ${name}, historians use evidence to understand...`, a:"THE PAST", w:["ONLY FUTURE WEATHER","ONLY MULTIPLICATION"]},
    {q:`A primary source for ${name} comes from...`, a:"THE TIME BEING STUDIED", w:["A RANDOM GUESS","A FICTIONAL PLANET"]},
    {q:`Cause and effect in ${name} helps explain...`, a:"WHY EVENTS HAPPENED AND WHAT CHANGED", w:["HOW TO SPELL EVERY WORD","ONLY MAP COLORS"]}
  ];
  const it = pick(samples);
  return mcQuestion(it.q, it.a, it.w, `${name} history question.`);
}

function addHistoryCurriculum(){
  Object.keys(HISTORY_LESSON_BANK).forEach(grade=>{
    if(!CURR[grade]) return;
    CURR[grade].hist = { showName:`Grade ${grade.replace("g", "")} History` };
    HISTORY_LESSON_BANK[grade].forEach((name, index)=>{
      const lessonNo = index + 1;
      CURR[grade].hist[`L${lessonNo}`] = {
        name,
        gen:()=>genHistoryQuestion(grade, lessonNo)
      };
    });
  });
}

function renderHistorySubjectButtons(){
  Object.keys(HISTORY_LESSON_BANK).forEach(grade=>{
    const gradeNo = grade.replace("g", "");
    const menu = document.querySelector(`#grade${gradeNo} .d-flex.justify-content-center`);
    if(!menu || menu.querySelector(`[data-history-button="${grade}"]`)) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-main";
    btn.dataset.historyButton = grade;
    btn.textContent = "History";
    btn.onclick = ()=>show(`${grade}-hist`);
    const backBtn = [...menu.querySelectorAll("button")].find(b=>String(b.getAttribute("onclick") || "").includes("show('grades')"));
    menu.insertBefore(btn, backBtn || null);
  });
}

function renderHistorySections(){
  const container = document.querySelector(".container");
  const runner = $("lessonRunner");
  if(!container || !runner) return;
  Object.keys(HISTORY_LESSON_BANK).forEach(grade=>{
    const id = `${grade}-hist`;
    if($(id)) return;
    const gradeNo = grade.replace("g", "");
    const section = document.createElement("div");
    section.id = id;
    section.className = "section d-none";
    section.innerHTML = `
      <div class="cardish text-center kid-font">
        <h1>Grade ${gradeNo} History</h1>
        <p class="small-note">Choose a history skill.</p>
        <div class="lesson-columns"></div>
        <div class="lesson-back-row">
          <button type="button" class="btn btn-main px-4">Back to Grade ${gradeNo}</button>
        </div>
      </div>
    `;
    const col = document.createElement("div");
    col.className = "lesson-column";
    col.innerHTML = "<h3>History</h3><p>Study people, places, events, and evidence from the past.</p>";
    HISTORY_LESSON_BANK[grade].forEach((name, index)=>{
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-main";
      btn.textContent = name;
      btn.onclick = ()=>startLesson(grade, "hist", `L${index + 1}`);
      col.appendChild(btn);
    });
    section.querySelector(".lesson-columns").appendChild(col);
    section.querySelector(".lesson-back-row button").onclick = ()=>show(`grade${gradeNo}`);
    container.insertBefore(section, runner);
  });
}

addHistoryCurriculum();
