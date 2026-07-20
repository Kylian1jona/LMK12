/* K12 curriculum data and history wiring
   Split from components/k12-lessons.js. Keep loaded as a classic script.
*/

/* ---------- Curriculum generators ---------- */
/*
Each lesson returns a question object:
{ type:"mc"|"input", q, choices?, answer, audio }
*/
const CURR = {
  g2: {
    eng: {
      showName: "Grade 2 English",
      L1: { name:"Nouns & Verbs",     gen: gen_g2_eng_L1 },
      L2: { name:"Sentence Fix",      gen: gen_g2_eng_L2 },
      L3: { name:"Reading Check",     gen: gen_g2_eng_L3 },
      L4: {name:"Parts of Speech (Drag)",gen: gen_g2_eng_L4},
      L5: { name:"Past vs Present",   gen: gen_g2_eng_L5 },
      L6: { name:"Syllables",   gen: gen_g2_eng_L6 },
      L7: { name:"Fill in the Blank", gen: gen_g2_eng_L7 },
L8: { name:"Sentence Editing", gen: gen_g2_eng_L8 },
L9: { name:"Memory Match", gen: gen_g2_eng_L9 },
L10:{ name:"Speed Challenge", gen: gen_g2_eng_L10 }
    },
    math: {
      showName: "Grade 2 Math",
      L1: { name:"2–3 Digit Add/Sub", gen: gen_g2_math_L1, image:{ src:"images/Addq1.png", alt:"Addition modeled with place value blocks" } },
      L2: { name:"Place Value",       gen: gen_g2_math_L2, image:{ src:"images/PlaceValueq1.png", alt:"Place value blocks for hundreds, tens, and ones" } },
      L3: { name:"Time to 5 Minutes", gen: gen_g2_math_L3 },
      L4: { name:"Skip Count (5s/10s)", gen: gen_g2_math_L4 },
      L5: { name:"Word Problems",     gen: gen_g2_math_L5 },
      L6: { name:"Money Memory Match",     gen: gen_g2_math_L6 },
      L7: { name:"Add/Sub Speed Problems",     gen: gen_g2_math_L7 }
    },
    sci: {
      showName: "Grade 2 Science",
      L1: { name:"States of Matter",  gen: gen_g2_sci_L1, image:{ src:"images/130921.png", alt:"States of matter diagram" } },
      L2: { name:"Animal Groups",     gen: gen_g2_sci_L2, image:{ src:"images/image copy.png", alt:"Animal classification diagram" } },
      L3: { name:"Life Cycles",       gen: gen_g2_sci_L3, image:{ src:"images/image.png", alt:"Butterfly life cycle diagram" } },
      L4: { name:"Plant Parts",       gen: gen_g2_sci_L4, image:{ src:"images/124016.png", alt:"Plant parts diagram" } }
    }
  },

g3: {

    eng: {
  showName: "Grade 3 English",

  L1:{name:"Short Vowels", gen:gen_g3_eng_L1, image:{ src:"images/Sounds.png", alt:"Short a sound poster with cat, hat, and bat examples" }},
  L2:{name:"Long Vowels", gen:gen_g3_eng_L2},
  L3:{name:"Vowel Sounds", gen:gen_g3_eng_L3},
  L4:{name:"CVC Words", gen:gen_g3_eng_L4},
  L5:{name:"Silent E Words", gen:gen_g3_eng_L5},
  L6:{name:"Vowel Review", gen:gen_g3_eng_L6},

  L7:{name:"Blends", gen:gen_g3_eng_L7},
  L8:{name:"Digraphs", gen:gen_g3_eng_L8},
  L9:{name:"Trigraphs", gen:gen_g3_eng_L9},
  L10:{name:"Beginning Blends", gen:gen_g3_eng_L10},
  L11:{name:"Ending Blends", gen:gen_g3_eng_L11},
  L12:{name:"Blends Review", gen:gen_g3_eng_L12},

  L13:{name:"Variant Vowels", gen:gen_g3_eng_L13},
  L14:{name:"Diphthongs", gen:gen_g3_eng_L14},
  L15:{name:"R-Controlled Vowels", gen:gen_g3_eng_L15},
  L16:{name:"Vowel Patterns", gen:gen_g3_eng_L16},
  L17:{name:"R-Vowel Words", gen:gen_g3_eng_L17},
  L18:{name:"Vowel Pattern Review", gen:gen_g3_eng_L18},

  L19:{name:"Multisyllabic Words", gen:gen_g3_eng_L19},
  L20:{name:"Syllable Parts", gen:gen_g3_eng_L20},
  L21:{name:"Open Syllables", gen:gen_g3_eng_L21},
  L22:{name:"Closed Syllables", gen:gen_g3_eng_L22},
  L23:{name:"Divide Syllables", gen:gen_g3_eng_L23},
  L24:{name:"Syllable Review", gen:gen_g3_eng_L24},

  L25:{name:"Irregular Words", gen:gen_g3_eng_L25},
  L26:{name:"Tricky Words", gen:gen_g3_eng_L26},
  L27:{name:"High-Frequency Words", gen:gen_g3_eng_L27},
  L28:{name:"Irregular Spelling", gen:gen_g3_eng_L28},
  L29:{name:"Read Irregular Words", gen:gen_g3_eng_L29},
  L30:{name:"Irregular Words Review", gen:gen_g3_eng_L30},

  L31:{name:"Main Idea", gen:gen_g3_eng_L31},
  L32:{name:"Supporting Details", gen:gen_g3_eng_L32},
  L33:{name:"Find the Main Idea", gen:gen_g3_eng_L33},
  L34:{name:"Key Details", gen:gen_g3_eng_L34},
  L35:{name:"Main Idea Practice", gen:gen_g3_eng_L35},
  L36:{name:"Main Idea Review", gen:gen_g3_eng_L36},

  L37:{name:"Inference", gen:gen_g3_eng_L37},
  L38:{name:"Use Text Clues", gen:gen_g3_eng_L38},
  L39:{name:"Theme", gen:gen_g3_eng_L39},
  L40:{name:"Infer Feelings", gen:gen_g3_eng_L40},
  L41:{name:"Infer Meaning", gen:gen_g3_eng_L41},
  L42:{name:"Inference Review", gen:gen_g3_eng_L42},

  L43:{name:"Author's Purpose", gen:gen_g3_eng_L43},
  L44:{name:"Persuade", gen:gen_g3_eng_L44},
  L45:{name:"Inform", gen:gen_g3_eng_L45},
  L46:{name:"Entertain", gen:gen_g3_eng_L46},
  L47:{name:"Purpose Practice", gen:gen_g3_eng_L47},
  L48:{name:"Author's Purpose Review", gen:gen_g3_eng_L48},

  L49:{name:"Text Structure", gen:gen_g3_eng_L49},
  L50:{name:"Sequence", gen:gen_g3_eng_L50},
  L51:{name:"Compare and Contrast", gen:gen_g3_eng_L51},
  L52:{name:"Cause and Effect", gen:gen_g3_eng_L52},
  L53:{name:"Problem and Solution", gen:gen_g3_eng_L53},
  L54:{name:"Text Structure Review", gen:gen_g3_eng_L54},

  L55:{name:"Sensory Details", gen:gen_g3_eng_L55},
  L56:{name:"Sight Details", gen:gen_g3_eng_L56},
  L57:{name:"Sound Details", gen:gen_g3_eng_L57},
  L58:{name:"Smell and Taste Details", gen:gen_g3_eng_L58},
  L59:{name:"Touch Details", gen:gen_g3_eng_L59},
  L60:{name:"Sensory Review", gen:gen_g3_eng_L60},

  L61:{name:"Topic Sentences", gen:gen_g3_eng_L61},
  L62:{name:"Strong Topic Sentences", gen:gen_g3_eng_L62},
  L63:{name:"Paragraph Main Idea", gen:gen_g3_eng_L63},
  L64:{name:"Choose Topic Sentence", gen:gen_g3_eng_L64},
  L65:{name:"Fix Topic Sentence", gen:gen_g3_eng_L65},
  L66:{name:"Topic Sentence Review", gen:gen_g3_eng_L66},

  L67:{name:"Linking Words", gen:gen_g3_eng_L67},
  L68:{name:"Sequence Words", gen:gen_g3_eng_L68},
  L69:{name:"Compare Words", gen:gen_g3_eng_L69},
  L70:{name:"Cause Words", gen:gen_g3_eng_L70},
  L71:{name:"Transition Words", gen:gen_g3_eng_L71},
  L72:{name:"Linking Words Review", gen:gen_g3_eng_L72},

  L73:{name:"Editing", gen:gen_g3_eng_L73},
  L74:{name:"Revising", gen:gen_g3_eng_L74},
  L75:{name:"Capitalization", gen:gen_g3_eng_L75},
  L76:{name:"Punctuation", gen:gen_g3_eng_L76},
  L77:{name:"Sentence Fixes", gen:gen_g3_eng_L77},
  L78:{name:"Editing Review", gen:gen_g3_eng_L78},

  L79:{name:"Descriptive Details", gen:gen_g3_eng_L79},
  L80:{name:"Add Details", gen:gen_g3_eng_L80},
  L81:{name:"Describe Characters", gen:gen_g3_eng_L81},
  L82:{name:"Describe Settings", gen:gen_g3_eng_L82},
  L83:{name:"Strong Details", gen:gen_g3_eng_L83},
  L84:{name:"Description Review", gen:gen_g3_eng_L84},

  L85:{name:"Prefixes", gen:gen_g3_eng_L85},
  L86:{name:"Suffixes", gen:gen_g3_eng_L86},
  L87:{name:"Word Parts", gen:gen_g3_eng_L87},
  L88:{name:"Prefix Meanings", gen:gen_g3_eng_L88},
  L89:{name:"Suffix Meanings", gen:gen_g3_eng_L89},
  L90:{name:"Prefixes and Suffixes Review", gen:gen_g3_eng_L90},

  L91:{name:"Compound Words", gen:gen_g3_eng_L91},
  L92:{name:"Build Compound Words", gen:gen_g3_eng_L92},
  L93:{name:"Split Compound Words", gen:gen_g3_eng_L93},
  L94:{name:"Compound Word Meanings", gen:gen_g3_eng_L94},
  L95:{name:"Compound Word Practice", gen:gen_g3_eng_L95},
  L96:{name:"Compound Words Review", gen:gen_g3_eng_L96},

  L97:{name:"Homophones", gen:gen_g3_eng_L97},
  L98:{name:"Homonyms", gen:gen_g3_eng_L98},
  L99:{name:"There Their They're", gen:gen_g3_eng_L99},
  L100:{name:"To Two Too", gen:gen_g3_eng_L100},
  L101:{name:"Word Meaning Clues", gen:gen_g3_eng_L101},
  L102:{name:"Homophones Review", gen:gen_g3_eng_L102},

  L103:{name:"Greek Roots", gen:gen_g3_eng_L103},
  L104:{name:"Latin Roots", gen:gen_g3_eng_L104},
  L105:{name:"Root Meanings", gen:gen_g3_eng_L105},
  L106:{name:"Root Word Practice", gen:gen_g3_eng_L106},
  L107:{name:"Build Words from Roots", gen:gen_g3_eng_L107},
  L108:{name:"Roots Review", gen:gen_g3_eng_L108},

  L109:{name:"Spelling", gen:gen_g3_eng_L109},
  L110:{name:"Common Spelling Patterns", gen:gen_g3_eng_L110},
  L111:{name:"Word Families", gen:gen_g3_eng_L111},
  L112:{name:"Spelling Rules", gen:gen_g3_eng_L112},
  L113:{name:"Correct Spelling", gen:gen_g3_eng_L113},
  L114:{name:"Spelling Review", gen:gen_g3_eng_L114},

  L115:{name:"Prepositions", gen:gen_g3_eng_L115},
  L116:{name:"Prepositional Phrases", gen:gen_g3_eng_L116},
  L117:{name:"Location Words", gen:gen_g3_eng_L117},
  L118:{name:"Time Words", gen:gen_g3_eng_L118},
  L119:{name:"Choose Preposition", gen:gen_g3_eng_L119},
  L120:{name:"Prepositions Review", gen:gen_g3_eng_L120},

  L121:{name:"Verb Tense", gen:gen_g3_eng_L121},
  L122:{name:"Past Tense", gen:gen_g3_eng_L122},
  L123:{name:"Present Tense", gen:gen_g3_eng_L123},
  L124:{name:"Future Tense", gen:gen_g3_eng_L124},
  L125:{name:"Fix Verb Tense", gen:gen_g3_eng_L125},
  L126:{name:"Verb Tense Review", gen:gen_g3_eng_L126},

  L127:{name:"Verb Types", gen:gen_g3_eng_L127},
  L128:{name:"Action Verbs", gen:gen_g3_eng_L128},
  L129:{name:"Linking Verbs", gen:gen_g3_eng_L129},
  L130:{name:"Helping Verbs", gen:gen_g3_eng_L130},
  L131:{name:"Choose the Verb", gen:gen_g3_eng_L131},
  L132:{name:"Verb Types Review", gen:gen_g3_eng_L132},

  L133:{name:"Contractions", gen:gen_g3_eng_L133},
  L134:{name:"Apostrophes", gen:gen_g3_eng_L134},
  L135:{name:"Make Contractions", gen:gen_g3_eng_L135},
  L136:{name:"Expand Contractions", gen:gen_g3_eng_L136},
  L137:{name:"Contraction Practice", gen:gen_g3_eng_L137},
  L138:{name:"Contractions Review", gen:gen_g3_eng_L138},

  L139:{name:"Conjunctions", gen:gen_g3_eng_L139},
  L140:{name:"And But Or", gen:gen_g3_eng_L140},
  L141:{name:"Join Sentences", gen:gen_g3_eng_L141},
  L142:{name:"Choose Conjunction", gen:gen_g3_eng_L142},
  L143:{name:"Fix Conjunctions", gen:gen_g3_eng_L143},
  L144:{name:"Conjunctions Review", gen:gen_g3_eng_L144}
},
   math: {
  showName: "Grade 3 Math",

  L1: { name:"Place Value to 1,000", gen: gen_g3_math_L1 },
  L2: { name:"Expanded Form", gen: gen_g3_math_L2 },
  L3: { name:"Standard Form", gen: gen_g3_math_L3 },
  L4: { name:"Word Form Match", gen: gen_g3_math_L4 },
  L5: { name:"Place Value Fix", gen: gen_g3_math_L5 },
  L6: { name:"Place Value Review", gen: gen_g3_math_L6 },

  L7: { name:"Compare Numbers", gen: gen_g3_math_L7 },
  L8: { name:"Greater Than & Less Than", gen: gen_g3_math_L8 },
  L9: { name:"Order Numbers", gen: gen_g3_math_L9 },
  L10: { name:"Compare Review", gen: gen_g3_math_L10 },
  L11: { name:"Least to Greatest", gen: gen_g3_math_L11 },
  L12: { name:"Ordering Practice", gen: gen_g3_math_L12 },

  L13: { name:"Round to Tens", gen: gen_g3_math_L13 },
  L14: { name:"Round to Hundreds", gen: gen_g3_math_L14 },
  L15: { name:"Rounding Rules", gen: gen_g3_math_L15 },
  L16: { name:"Rounding Tens Practice", gen: gen_g3_math_L16 },
  L17: { name:"Rounding Hundreds Practice", gen: gen_g3_math_L17 },
  L18: { name:"Rounding Review", gen: gen_g3_math_L18 },

  L19: { name:"Estimate Sums Match", gen: gen_g3_math_L19 },
  L20: { name:"Estimate Sums Fix", gen: gen_g3_math_L20 },
  L21: { name:"Estimate Sums MC", gen: gen_g3_math_L21 },
  L22: { name:"Estimate Sums Speed", gen: gen_g3_math_L22 },
  L23: { name:"Estimate Sums Fill", gen: gen_g3_math_L23 },
  L24: { name:"Estimate Sums Review", gen: gen_g3_math_L24 },

  L25: { name:"Estimate Sums Correction", gen: gen_g3_math_L25 },
  L26: { name:"Estimate Differences MC", gen: gen_g3_math_L26 },
  L27: { name:"Estimate Differences Speed", gen: gen_g3_math_L27 },
  L28: { name:"Estimate Differences Fill", gen: gen_g3_math_L28 },
  L29: { name:"Estimate Differences Match", gen: gen_g3_math_L29 },
  L30: { name:"Estimate Differences Fix", gen: gen_g3_math_L30 },

  L31: { name:"Three-Digit Addition MC", gen: gen_g3_math_L31 },
  L32: { name:"Three-Digit Addition Speed", gen: gen_g3_math_L32 },
  L33: { name:"Three-Digit Addition Fill", gen: gen_g3_math_L33 },
  L34: { name:"Three-Digit Addition Match", gen: gen_g3_math_L34 },
  L35: { name:"Three-Digit Addition Fix", gen: gen_g3_math_L35 },
  L36: { name:"Addition Word Problems", gen: gen_g3_math_L36 },

  L37: { name:"Three-Digit Subtraction MC", gen: gen_g3_math_L37 },
  L38: { name:"Three-Digit Subtraction Speed", gen: gen_g3_math_L38 },
  L39: { name:"Three-Digit Subtraction Fill", gen: gen_g3_math_L39 },
  L40: { name:"Three-Digit Subtraction Match", gen: gen_g3_math_L40 },
  L41: { name:"Three-Digit Subtraction Fix", gen: gen_g3_math_L41 },
  L42: { name:"Subtraction Word Problems", gen: gen_g3_math_L42 },

  L43: { name:"Money Values", gen: gen_g3_math_L43 },
  L44: { name:"Money Math", gen: gen_g3_math_L44 },
  L45: { name:"Needs vs Wants", gen: gen_g3_math_L45 },
  L46: { name:"Budget Basics", gen: gen_g3_math_L46 },
  L47: { name:"Money Word Problems", gen: gen_g3_math_L47 },
  L48: { name:"Financial Literacy Review", gen: gen_g3_math_L48 },

  L49: { name:"Mixed Operations Fill", gen: gen_g3_math_L49 },
  L50: { name:"Mixed Operations Match", gen: gen_g3_math_L50 },
  L51: { name:"Mixed Operations Fix", gen: gen_g3_math_L51 },
  L52: { name:"Choose the Operation", gen: gen_g3_math_L52 },
  L53: { name:"Mixed Operations Speed", gen: gen_g3_math_L53 },
  L54: { name:"Mixed Operations Challenge", gen: gen_g3_math_L54 },

  L55: { name:"Division Facts Match", gen: gen_g3_math_L55 },
  L56: { name:"Division Fix", gen: gen_g3_math_L56 },
  L57: { name:"Division Word Problems", gen: gen_g3_math_L57 },
  L58: { name:"Division Speed", gen: gen_g3_math_L58 },
  L59: { name:"Division Fill Blanks", gen: gen_g3_math_L59 },
  L60: { name:"Division Review", gen: gen_g3_math_L60 }
},
    sci: {
      showName: "Grade 3 Science",
      L1: { name:"Habitats",          gen: gen_g3_sci_L1, image:{ src:"images/Habitats.png", alt:"Habitats diagram showing different places and living things" } },
      L2: { name:"Weather Tools",     gen: gen_g3_sci_L2, image:{ src:"images/123114.png", alt:"Weather tools diagram" } },
      L3: { name:"Forces & Motion",   gen: gen_g3_sci_L3, image:{ src:"images/Forces.png", alt:"Forces and motion diagram showing pushes, pulls, and friction" } }
    }
  },

g4: {
  eng: {
    showName: "Grade 4 English",

    // CONTEXT CLUES
    L1:  { name:"Meaning from Sentences",        gen: gen_g4_eng_L1 },
    L2:  { name:"Definition Clues",              gen: gen_g4_eng_L2 },
    L3:  { name:"Example Clues",                 gen: gen_g4_eng_L3 },
    L4:  { name:"Contrast Clues",                gen: gen_g4_eng_L4 },

    // SYNONYMS AND ANTONYMS
    L5:  { name:"Synonym Match",                 gen: gen_g4_eng_L5 },
    L6:  { name:"Antonym Match",                 gen: gen_g4_eng_L6 },
    L7:  { name:"Word Relationships",            gen: gen_g4_eng_L7 },  
    L8:  { name:"Choosing Better Words",         gen: gen_g4_eng_L8 },

    // THEME
    L9:  { name:"Finding the Lesson",            gen: gen_g4_eng_L9 },
    L10: { name:"Theme in Short Stories",        gen: gen_g4_eng_L10 },
    L11: { name:"Character Actions and Theme",   gen: gen_g4_eng_L11 },
    L12: { name:"Supporting the Theme", gen: gen_g4_eng_L12 },

// NEW READING SKILLS
L13: { name:"Main Idea",            gen: gen_g4_eng_L13 },
L14: { name:"Supporting Details",   gen: gen_g4_eng_L14 },
L15: { name:"Author's Purpose",     gen: gen_g4_eng_L15 },

// NEW STORY UNDERSTANDING
L16: { name:"Point of View",        gen: gen_g4_eng_L16 },
L17: { name:"Cause and Effect",     gen: gen_g4_eng_L17 },
L18: { name:"Sequence of Events",   gen: gen_g4_eng_L18 },

// NEW GRAMMAR AND WRITING
L19: { name:"Homophones",           gen: gen_g4_eng_L19, image:{ src:"images/Homophones.png", alt:"Homophones poster showing see and sea" } },
L20: { name:"Complete Sentences",   gen: gen_g4_eng_L20 },
L21: { name:"Punctuation",          gen: gen_g4_eng_L21 }
  },

  math: {
    showName: "Grade 4 Math",

    // MULTI-DIGIT MULTIPLICATION
    L1:  { name:"2-Digit × 1-Digit Multiplication",    gen: gen_g4_math_L1 },
    L2:  { name:"3-Digit × 1-Digit Multiplication",    gen: gen_g4_math_L2 },
    L3:  { name:"2-Digit × 2-Digit Multiplication",    gen: gen_g4_math_L3 },
    L4:  { name:"Multiplication Word Problems",        gen: gen_g4_math_L4 },

    // FACTORS AND MULTIPLES
    L5:  { name:"Finding Factors",                      gen: gen_g4_math_L5 },
    L6:  { name:"Finding Multiples",                    gen: gen_g4_math_L6 },
    L7:  { name:"Prime and Composite Numbers",          gen: gen_g4_math_L7 },
    L8:  { name:"Factor Pairs",                         gen: gen_g4_math_L8 },

    // EQUIVALENT FRACTIONS
    L9:  { name:"Equivalent Fractions with Models",     gen: gen_g4_math_L9 },
    L10: { name:"Generating Equivalent Fractions",      gen: gen_g4_math_L10 },
    L11: { name:"Comparing Equivalent Fractions",       gen: gen_g4_math_L11 },
L12: { name:"Equivalent Fraction Word Problems", gen: gen_g4_math_L12 },

// NEW DIVISION
L13: { name:"Division Facts",          gen: gen_g4_math_L13 },
L14: { name:"Long Division",           gen: gen_g4_math_L14 },
L15: { name:"Add/Sub Word Problems",   gen: gen_g4_math_L15 },

// NEW FRACTIONS AND DECIMALS
L16: { name:"Comparing Fractions",     gen: gen_g4_math_L16 },
L17: { name:"Mixed Numbers",           gen: gen_g4_math_L17 },
L18: { name:"Decimal Place Value",     gen: gen_g4_math_L18 },

// NEW GEOMETRY
L19: { name:"Angles",                  gen: gen_g4_math_L19 },
L20: { name:"Area and Perimeter",      gen: gen_g4_math_L20 }
  },

  sci: {
    showName: "Grade 4 Science",

    // LIVING THINGS AND ECOSYSTEMS
    L1:  { name:"Plant and Animal Structures",    gen: gen_g4_sci_L1 , image:{ src:"images/g4-sci-l1-plant-animal-structures.png", alt:"Plant and animal structures diagram" } },
    L2:  { name:"Producers and Consumers",        gen: gen_g4_sci_L2 ,image:{ src:"images/131929.png", alt:"Plant parts diagram" } },
    L3:  { name:"Food Chains",                    gen: gen_g4_sci_L3, image:{ src:"images/152905.png", alt:"Food chains diagram" } },
    L4:  { name:"Food Webs",                      gen: gen_g4_sci_L4, image:{ src:"images/153230.png", alt:"Food webs diagram" } },

    // EARTH'S SURFACE
    L5:  { name:"Rocks and Minerals",              gen: gen_g4_sci_L5, image:{ src:"images/153830.png", alt:"Rocks and minerals diagram" } },
    L6:  { name:"Weathering",                      gen: gen_g4_sci_L6, image:{ src:"images/154640.png", alt:"Weathering diagram" } },
    L7:  { name:"Erosion and Deposition",          gen: gen_g4_sci_L7},
    L8:  { name:"How Landforms Change",            gen: gen_g4_sci_L8 },

    // MATTER
    L9:  { name:"States of Matter",                gen: gen_g4_sci_L9 },
    L10: { name:"Properties of Matter",            gen: gen_g4_sci_L10 },
    L11: { name:"Physical Changes",                gen: gen_g4_sci_L11 },
    L12: { name:"Mixtures and Solutions",          gen: gen_g4_sci_L12 },

    // ENERGY AND MOTION
    L13: { name:"Forms of Energy",                 gen: gen_g4_sci_L13, image:{ src:"images/93298.jpg", alt:"Different forms of energy diagram" } },
    L14: { name:"Light Energy",                    gen: gen_g4_sci_L14 },
    L15: { name:"Heat and Electrical Energy",      gen: gen_g4_sci_L15 },
    L16: { name:"Force and Motion",                gen: gen_g4_sci_L16 },

    // EARTH AND SPACE
    L17: { name:"The Water Cycle",                 gen: gen_g4_sci_L17 },
    L18: { name:"Weather Patterns",                gen: gen_g4_sci_L18 },
    L19: { name:"The Solar System",                gen: gen_g4_sci_L19 },
L20: { name:"Moon Phases",             gen: gen_g4_sci_L20 },

// NEW LIVING THINGS
L21: { name:"Animal Adaptations",      gen: gen_g4_sci_L21 },
L22: { name:"Habitats",                gen: gen_g4_sci_L22 },

// NEW EARTH SCIENCE
L23: { name:"Fossils",                 gen: gen_g4_sci_L23 },
L24: { name:"Earth's Layers",          gen: gen_g4_sci_L24 },
L25: { name:"Natural Resources",       gen: gen_g4_sci_L25 },

// NEW FORCES AND INVESTIGATION
L26: { name:"Magnetism",               gen: gen_g4_sci_L26 },
L27: { name:"Sound Energy",            gen: gen_g4_sci_L27 },
L28: { name:"Scientific Investigation",gen: gen_g4_sci_L28 }
  }
},

g5: {
  eng: {
    showName: "Grade 5 English",

    L1:  { name:"Inference",              gen: gen_g5_eng_L1, image:{ src:"images/Inferences.png", alt:"Making inferences poster with text clues" } },
    L2:  { name:"Figurative Language",    gen: gen_g5_eng_L2, image:{ src:"images/FigLang.png", alt:"Figurative language poster with examples" } },
    L3:  { name:"Text Structure",         gen: gen_g5_eng_L3 },

    L4:  { name:"Main Idea",              gen: gen_g5_eng_L4 },
    L5:  { name:"Supporting Details",     gen: gen_g5_eng_L5 },
    L6:  { name:"Author's Purpose",       gen: gen_g5_eng_L6 },
    L7:  { name:"Context Clues",          gen: gen_g5_eng_L7 },
    L8:  { name:"Synonyms & Antonyms",    gen: gen_g5_eng_L8 },
    L9:  { name:"Prefixes & Suffixes",    gen: gen_g5_eng_L9 },
    L10: { name:"Subject & Predicate",    gen: gen_g5_eng_L10 },
    L11: { name:"Verb Tense",             gen: gen_g5_eng_L11 },
    L12: { name:"Punctuation",            gen: gen_g5_eng_L12 }
  },

  math: {
    showName: "Grade 5 Math",

    L1:  { name:"Decimals",               gen: gen_g5_math_L1 },
    L2:  { name:"Fraction Operations",    gen: gen_g5_math_L2 },
    L3:  { name:"Order of Operations",    gen: gen_g5_math_L3 },

    L4:  { name:"Decimal Place Value",    gen: gen_g5_math_L4 },
    L5:  { name:"Compare Decimals",       gen: gen_g5_math_L5 },
    L6:  { name:"Equivalent Fractions",   gen: gen_g5_math_L6 },
    L7:  { name:"Mixed Numbers",          gen: gen_g5_math_L7 },
    L8:  { name:"Volume",                 gen: gen_g5_math_L8 },
    L9:  { name:"Coordinate Plane",       gen: gen_g5_math_L9 },
    L10: { name:"Patterns",               gen: gen_g5_math_L10 },
    L11: { name:"Word Problems",          gen: gen_g5_math_L11 }
  },

  sci: {
    showName: "Grade 5 Science",

    L1:  { name:"Solar System",           gen: gen_g5_sci_L1 },
    L2:  { name:"Cells",                  gen: gen_g5_sci_L2 },
    L3:  { name:"Mixtures & Solutions",   gen: gen_g5_sci_L3 },

    L4:  { name:"Earth's Rotation",       gen: gen_g5_sci_L4 },
    L5:  { name:"Weather & Climate",      gen: gen_g5_sci_L5 },
    L6:  { name:"Water Cycle",            gen: gen_g5_sci_L6 },
    L7:  { name:"Plant Systems",          gen: gen_g5_sci_L7 },
    L8:  { name:"Food Chains",            gen: gen_g5_sci_L8 },
    L9:  { name:"Physical Changes",       gen: gen_g5_sci_L9 },
    L10: { name:"Force & Motion",         gen: gen_g5_sci_L10 },
    L11: { name:"Forms of Energy",        gen: gen_g5_sci_L11 }
  }
},
  g6: {
    eng: {
      showName: "Grade 6 English",
      L1: { name:"Theme & Summary",   gen: gen_g6_eng_L1 },
      L2: { name:"Context Clues",     gen: gen_g6_eng_L2 },
      L3: { name:"Text Evidence",     gen: gen_g6_eng_L3 },
L4:{ name:"Main Idea Basics", gen:gen_g6_eng_L4 },
L5:{ name:"Supporting Details", gen:gen_g6_eng_L5 },
L6:{ name:"Summarizing", gen:gen_g6_eng_L6 },
L7:{ name:"Theme vs Main Idea", gen:gen_g6_eng_L7 },
L8:{ name:"Find the Best Title", gen:gen_g6_eng_L8 },

L9:{ name:"Author's Purpose", gen:gen_g6_eng_L9 },
L10:{ name:"Persuade Inform Explain", gen:gen_g6_eng_L10 },
L11:{ name:"Tone Words", gen:gen_g6_eng_L11 },
L12:{ name:"Mood vs Tone", gen:gen_g6_eng_L12 },
L13:{ name:"Author's Viewpoint", gen:gen_g6_eng_L13 },

L14:{ name:"Cause and Effect", gen:gen_g6_eng_L14 },
L15:{ name:"Compare and Contrast", gen:gen_g6_eng_L15 },
L16:{ name:"Problem and Solution", gen:gen_g6_eng_L16 },
L17:{ name:"Sequence", gen:gen_g6_eng_L17 },
L18:{ name:"Description", gen:gen_g6_eng_L18 },

L19:{ name:"Synonyms", gen:gen_g6_eng_L19 },
L20:{ name:"Antonyms", gen:gen_g6_eng_L20 },
L21:{ name:"Context Clues", gen:gen_g6_eng_L21 },
L22:{ name:"Strong Word Choice", gen:gen_g6_eng_L22 },
L23:{ name:"Word Relationships", gen:gen_g6_eng_L23 },

L24:{ name:"Common Idioms", gen:gen_g6_eng_L24 },
L25:{ name:"Idiom Meaning", gen:gen_g6_eng_L25 },
L26:{ name:"Adages", gen:gen_g6_eng_L26 },
L27:{ name:"Proverbs", gen:gen_g6_eng_L27 },
L28:{ name:"Figurative Language", gen:gen_g6_eng_L28 },

L29:{ name:"There Their They're", gen:gen_g6_eng_L29 },
L30:{ name:"To Too Two", gen:gen_g6_eng_L30 },
L31:{ name:"Your You're", gen:gen_g6_eng_L31 },
L32:{ name:"Its It's", gen:gen_g6_eng_L32 },
L33:{ name:"Mixed Homophones", gen:gen_g6_eng_L33 },

L34:{ name:"Preposition Basics", gen:gen_g6_eng_L34 },
L35:{ name:"Prepositional Phrases", gen:gen_g6_eng_L35 },
L36:{ name:"Location Words", gen:gen_g6_eng_L36 },
L37:{ name:"Time Words", gen:gen_g6_eng_L37 },
L38:{ name:"Preposition Review", gen:gen_g6_eng_L38 },

L39:{ name:"Root Basics", gen:gen_g6_eng_L39 },
L40:{ name:"Greek Roots", gen:gen_g6_eng_L40 },
L41:{ name:"Latin Roots", gen:gen_g6_eng_L41 },
L42:{ name:"Prefixes and Roots", gen:gen_g6_eng_L42 },
L43:{ name:"Word Meaning", gen:gen_g6_eng_L43 },

L44:{ name:"Direct Objects", gen:gen_g6_eng_L44 },
L45:{ name:"Indirect Objects", gen:gen_g6_eng_L45 },
L46:{ name:"Object Practice", gen:gen_g6_eng_L46 },
L47:{ name:"Sentence Parts", gen:gen_g6_eng_L47 },
L48:{ name:"Object Review", gen:gen_g6_eng_L48 },

L49:{ name:"Pronoun Basics", gen:gen_g6_eng_L49 },
L50:{ name:"Antecedents", gen:gen_g6_eng_L50 },
L51:{ name:"Pronoun Agreement", gen:gen_g6_eng_L51 },
L52:{ name:"Clear Pronouns", gen:gen_g6_eng_L52 },
L53:{ name:"Pronoun Review", gen:gen_g6_eng_L53 }
    },
    math: {
      showName: "Grade 6 Math",
      L1: { name:"Ratios",            gen: gen_g6_math_L1 },
      L2: { name:"Integers",          gen: gen_g6_math_L2 },
      L3: { name:"Expressions",       gen: gen_g6_math_L3 },
      L4:  { name:"Solutions to Inequalities", gen: gen_g6_math_L4 },
L5:  { name:"Graph Inequalities on Number Lines", gen: gen_g6_math_L5 },
L6:  { name:"Write Inequalities from Number Lines", gen: gen_g6_math_L6 },
L7:  { name:"Write Multiplication Expressions Using Exponents", gen: gen_g6_math_L7 },
L8:  { name:"Evaluate Powers with Whole Number Bases", gen: gen_g6_math_L8 },
L9:  { name:"Write Powers of Ten with Exponents", gen: gen_g6_math_L9 },
L10: { name:"Describe the Coordinate Plane", gen: gen_g6_math_L10 },
L11: { name:"Objects on a Coordinate Plane", gen: gen_g6_math_L11 },
L12: { name:"Graph Points on a Coordinate Plane", gen: gen_g6_math_L12 },
L13: { name:"Prime or Composite", gen: gen_g6_math_L13 },
L14: { name:"Identify Factors", gen: gen_g6_math_L14 },
L15: { name:"Greatest Common Factor",  gen: gen_g6_math_L15 },
L16: { name:"Least Common Multiple",   gen: gen_g6_math_L16 },
L17: { name:"Unit Rates",              gen: gen_g6_math_L17 },
L18: { name:"Percent of a Number",     gen: gen_g6_math_L18 },
L19: { name:"Divide Fractions",        gen: gen_g6_math_L19 },
L20: { name:"Decimal Operations",      gen: gen_g6_math_L20 },
L21: { name:"Surface Area",            gen: gen_g6_math_L21 },
L22: { name:"Mean, Median & Range",    gen: gen_g6_math_L22 }

    },
    sci: {
      showName: "Grade 6 Science",
      L1: { name:"Cells & Organelles", gen: gen_g6_sci_L1 },
      L2: { name:"Energy",             gen: gen_g6_sci_L2 },
      L3:  { name:"Introduction to the rock cycle", gen: gen_g6_sci_L3  },
      L4:  { name:"Classify rocks as igneous, sedimentary, or metamorphic", gen: gen_g6_sci_L4  },
      L5:  { name:"Estimate temperatures", gen: gen_g6_sci_L5  },
      L6:  { name:"Choose customary units of distance", gen: gen_g6_sci_L6  },
      L7:  { name:"Choose metric units of distance, mass, and volume", gen: gen_g6_sci_L7  },
      L8:  { name:"Identify functions of plant cell parts", gen: gen_g6_sci_L8  },
      L9:  { name:"Identify functions of animal cell parts", gen: gen_g6_sci_L9  },
      L10: { name:"Compare cells and cell parts", gen: gen_g6_sci_L10 },
      L11: { name:"Calculate speed from time and distance", gen: gen_g6_sci_L11 },
      L12: { name:"Calculate distance from speed and time", gen: gen_g6_sci_L12 },
      L13: { name:"Predict forces using Newton's third law", gen: gen_g6_sci_L13 },
      L14: { name:"Balanced and unbalanced forces", gen: gen_g6_sci_L14 },
      L15: { name:"Atoms and Elements",              gen: gen_g6_sci_L15 },
L16: { name:"Density",                         gen: gen_g6_sci_L16 },
L17: { name:"Thermal Energy",                  gen: gen_g6_sci_L17 },
L18: { name:"Waves",                           gen: gen_g6_sci_L18 },
L19: { name:"Ecosystems",                      gen: gen_g6_sci_L19 },
L20: { name:"Photosynthesis & Respiration", gen: gen_g6_sci_L20 },
L21: { name:"Weather and Climate",          gen: gen_g6_sci_L21 },
L22: { name:"Earth's Systems",              gen: gen_g6_sci_L22 },

// ⚡ Kinetic & Potential Energy
L23: { name:"What Is Energy?",              gen: gen_g6_sci_L23 },
L24: { name:"Kinetic Energy",               gen: gen_g6_sci_L24 },
L25: { name:"Potential Energy",             gen: gen_g6_sci_L25 },
L26: { name:"Energy Transformations",       gen: gen_g6_sci_L26 },
L27: { name:"Real-World Energy",            gen: gen_g6_sci_L27 },

// 🫀 Anatomy
L28: { name:"Body Systems",                 gen: gen_g6_sci_L28 },
L29: { name:"Skeletal System",              gen: gen_g6_sci_L29 },
L30: { name:"Muscular System",              gen: gen_g6_sci_L30 },
L31: { name:"Circulatory System",           gen: gen_g6_sci_L31, image:{ src:"images/Circulatory.png", alt:"Circulatory system poster showing the heart, arteries, and blood" } },
L32: { name:"Digestive System",             gen: gen_g6_sci_L32, image:{ src:"images/Digestive.png", alt:"Digestive system poster showing organs and nutrient absorption" } },

// 🧪 Biochemistry
L33: { name:"Molecules of Life",            gen: gen_g6_sci_L33, image:{ src:"images/Nutrition.png", alt:"Molecules of life poster showing carbohydrates, proteins, lipids, and nucleic acids" } },
L34: { name:"Proteins",                     gen: gen_g6_sci_L34 },
L35: { name:"Carbohydrates",                gen: gen_g6_sci_L35 },
L36: { name:"Lipids & Fats",                gen: gen_g6_sci_L36 },
L37: { name:"Enzymes",                      gen: gen_g6_sci_L37 },

// 🌱 Plant Reproduction
L38: { name:"Flower Structures",            gen: gen_g6_sci_L38 },
L39: { name:"Pollination",                  gen: gen_g6_sci_L39 },
L40: { name:"Fertilization",                gen: gen_g6_sci_L40 },
L41: { name:"Seed Formation",               gen: gen_g6_sci_L41 },
L42: { name:"Plant Life Cycles",            gen: gen_g6_sci_L42 },

// 🌌 Astronomy
L43: { name:"The Solar System",             gen: gen_g6_sci_L43 },
L44: { name:"Planets & Moons",              gen: gen_g6_sci_L44 },
L45: { name:"Stars & Constellations",       gen: gen_g6_sci_L45 },
L46: { name:"Galaxies",                     gen: gen_g6_sci_L46 },
L47: { name:"Space Exploration",            gen: gen_g6_sci_L47 },
      
    }
  },
g7: {
  eng: {
    showName: "Grade 7 English",
    L1: { name:"Theme & Central Idea", gen: gen_g7_eng_L1 },
    L2: { name:"Text Evidence", gen: gen_g7_eng_L2 },
    L3: { name:"Author's Purpose", gen: gen_g7_eng_L3 },
    L4: { name:"Parts of Speech (Drag)", gen: gen_g7_eng_L4 },
    L5: { name:"Context Clues", gen: gen_g7_eng_L5 },
    L6: { name:"Sentence Structure", gen: gen_g7_eng_L6 },
    L7: { name:"Fill in the Blank", gen: gen_g7_eng_L7 },
    L8: { name:"Sentence Editing", gen: gen_g7_eng_L8 },
    L9: { name:"Memory Match", gen: gen_g7_eng_L9 },
    L10:{ name:"Speed Challenge", gen: gen_g7_eng_L10 }
  },
  math: {
    showName: "Grade 7 Math",
    L1: { name:"Integers", gen: gen_g7_math_L1 },
    L2: { name:"Ratios & Proportions", gen: gen_g7_math_L2 },
    L3: { name:"Expressions", gen: gen_g7_math_L3 },
    L4: { name:"One-Step Equations", gen: gen_g7_math_L4 },
    L5: { name:"Word Problems", gen: gen_g7_math_L5 },
    L6: { name:"Integer Memory Match", gen: gen_g7_math_L6 },
    L7: { name:"Equation Speed Problems", gen: gen_g7_math_L7 }
  },
  sci: {
    showName: "Grade 7 Science",
    L1: { name:"Cells", gen: gen_g7_sci_L1 },
    L2: { name:"Body Systems", gen: gen_g7_sci_L2 },
    L3: { name:"Ecosystems", gen: gen_g7_sci_L3 },
    L4: { name:"Forces & Motion", gen: gen_g7_sci_L4 }
  }
},

g8: {
  eng: {
    showName: "Grade 8 English",
    L1: { name:"Central Idea", gen: gen_g8_eng_L1 },
    L2: { name:"Text Structure", gen: gen_g8_eng_L2 },
    L3: { name:"Argument & Claims", gen: gen_g8_eng_L3 },
    L4: { name:"Parts of Speech (Drag)", gen: gen_g8_eng_L4 },
    L5: { name:"Tone & Mood", gen: gen_g8_eng_L5 },
    L6: { name:"Vocabulary in Context", gen: gen_g8_eng_L6 },
    L7: { name:"Fill in the Blank", gen: gen_g8_eng_L7 },
    L8: { name:"Sentence Editing", gen: gen_g8_eng_L8 },
    L9: { name:"Memory Match", gen: gen_g8_eng_L9 },
    L10:{ name:"Speed Challenge", gen: gen_g8_eng_L10 }
  },
  math: {
    showName: "Grade 8 Math",
    L1: { name:"Linear Equations", gen: gen_g8_math_L1 },
    L2: { name:"Slope", gen: gen_g8_math_L2, image:{ src:"images/slope.png", alt:"Slope quiz diagram" } },
    L3: { name:"Functions", gen: gen_g8_math_L3 },
    L4: { name:"Square Numbers Match", gen: gen_g8_math_L4 },
    L5: { name:"Pythagorean Theorem", gen: gen_g8_math_L5 },
    L6: { name:"Slope Memory Match", gen: gen_g8_math_L6 },
    L7: { name:"Linear Equation Speed Problems", gen: gen_g8_math_L7 }
  },
  sci: {
    showName: "Grade 8 Science",
    L1: { name:"Atoms", gen: gen_g8_sci_L1 },
    L2: { name:"Chemical Reactions", gen: gen_g8_sci_L2 },
    L3: { name:"Genetics", gen: gen_g8_sci_L3 },
    L4: { name:"Natural Selection", gen: gen_g8_sci_L4 }
  }
},

g9: {
  eng: {
    showName: "Grade 9 English",
    L1: { name:"Literary Analysis", gen: gen_g9_eng_L1 },
    L2: { name:"Claims & Evidence", gen: gen_g9_eng_L2 },
    L3: { name:"Rhetoric", gen: gen_g9_eng_L3 },
    L4: { name:"Parts of Speech (Drag)", gen: gen_g9_eng_L4 },
    L5: { name:"Theme Development", gen: gen_g9_eng_L5 },
    L6: { name:"Grammar Review", gen: gen_g9_eng_L6 },
    L7: { name:"Fill in the Blank", gen: gen_g9_eng_L7 },
    L8: { name:"Sentence Editing", gen: gen_g9_eng_L8 },
    L9: { name:"Memory Match", gen: gen_g9_eng_L9 },
    L10:{ name:"Speed Challenge", gen: gen_g9_eng_L10 }
  },
  math: {
    showName: "Grade 9 Math",
    L1: { name:"Algebra Review", gen: gen_g9_math_L1 },
    L2: { name:"Quadratics", gen: gen_g9_math_L2 },
    L3: { name:"Systems of Equations", gen: gen_g9_math_L3 },
    L4: { name:"Exponents", gen: gen_g9_math_L4 },
    L5: { name:"Data Analysis", gen: gen_g9_math_L5 },
    L6: { name:"Algebra Memory Match", gen: gen_g9_math_L6 },
    L7: { name:"Quadratic Speed Problems", gen: gen_g9_math_L7 }
  },
  sci: {
    showName: "Grade 9 Science",
    L1: { name:"Biology Cells", gen: gen_g9_sci_L1 },
    L2: { name:"DNA", gen: gen_g9_sci_L2 },
    L3: { name:"Ecology", gen: gen_g9_sci_L3 },
    L4: { name:"Energy Flow", gen: gen_g9_sci_L4 }
  }
},

g10: {
  eng: {
    showName: "Grade 10 English",
    L1: { name:"Theme Development", gen: gen_g10_eng_L1 },
    L2: { name:"Rhetorical Appeals", gen: gen_g10_eng_L2 },
    L3: { name:"Research Writing", gen: gen_g10_eng_L3 },
    L4: { name:"Parts of Speech (Drag)", gen: gen_g10_eng_L4 },
    L5: { name:"Syntax", gen: gen_g10_eng_L5 },
    L6: { name:"Poetry Analysis", gen: gen_g10_eng_L6 },
    L7: { name:"Fill in the Blank", gen: gen_g10_eng_L7 },
    L8: { name:"Sentence Editing", gen: gen_g10_eng_L8 },
    L9: { name:"Memory Match", gen: gen_g10_eng_L9 },
    L10:{ name:"Speed Challenge", gen: gen_g10_eng_L10 }
  },
  math: {
    showName: "Grade 10 Math",
    L1: { name:"Geometry Basics", gen: gen_g10_math_L1 },
    L2: { name:"Similarity", gen: gen_g10_math_L2 },
    L3: { name:"Trigonometry", gen: gen_g10_math_L3 },
    L4: { name:"Polynomials", gen: gen_g10_math_L4 },
    L5: { name:"Statistics", gen: gen_g10_math_L5 },
    L6: { name:"Geometry Memory Match", gen: gen_g10_math_L6 },
    L7: { name:"Trigonometry Speed Problems", gen: gen_g10_math_L7 }
  },
  sci: {
    showName: "Grade 10 Science",
    L1: { name:"Chemistry Basics", gen: gen_g10_sci_L1 },
    L2: { name:"Periodic Table", gen: gen_g10_sci_L2 },
    L3: { name:"Chemical Bonding", gen: gen_g10_sci_L3 },
    L4: { name:"Climate Science", gen: gen_g10_sci_L4 }
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
