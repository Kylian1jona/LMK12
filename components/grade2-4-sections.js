(function(){
  class K12Grade24Sections extends HTMLElement {
    connectedCallback(){
      if(this.dataset.rendered === "true") return;
      this.dataset.rendered = "true";
      this.innerHTML = String.raw`
<!-- =========================
   GRADE 2 MENU
========================== -->
<div id="grade2" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 2</h1>
    <p class="small-note">Choose a subject</p>

    <div class="scorebar">
      <div class="badge-pill">⭐ Points: <span id="g2Points">0</span></div>
      <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="g2Learners">0</span></div>
    </div>

    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <button type="button" class="btn btn-main" onclick="show('g2-eng')">English</button>
      <button type="button" class="btn btn-main" onclick="show('g2-math')">Math</button>
      <button type="button" class="btn btn-main" onclick="show('g2-sci')">Science</button>
      <button type="button" class="btn btn-main" onclick="show('g2-hist')">History</button>
      <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
    </div>
  </div>
</div>

<div id="g2-eng" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 2 English</h1>
    <p class="small-note">Pick a lesson</p>
    <div class="lesson-columns">
      <div class="lesson-column">
        <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L1')">Nouns & Verbs</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L2')">Sentence Fix</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L3')">Reading Check</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L4')">Parts of Speech (Drag)</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L5')">Past vs Present</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L6')">Syllables</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L7')">Fill in the Blank</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L8')">Sentence Editing</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L9')">Memory Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L10')">Speed Challenge</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L11')">Spelling: Short Vowels</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L12')">Spelling Drag: Word Families</button>
        </div>
      </div>
    </div>
    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade2')">
        Back to Grade 2
      </button>
    </div>
  </div>
</div>

<div id="g2-math" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 2 Math</h1>
    <p class="small-note">Choose a math topic.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>🔢 Numbers & Operations</h3>
        <p>Work with number values and calculations.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L1')">
          2–3 Digit Add/Sub
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L2')">
          Place Value
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L4')">
          Skip Count (5s/10s)
        </button>
      </div>

      <div class="lesson-column">
        <h3>⏰ Real-Life Math</h3>
        <p>Use math in everyday situations.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L3')">
          Time to 5 Minutes
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L5')">
          Word Problems
        </button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L6')">Money Memory Match</button>
<button type="button" class="btn btn-main" onclick="startLesson('g2','math','L7')">Add/Sub Speed Problems</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade2')">
        Back to Grade 2
      </button>
    </div>
  </div>
</div>
<div id="g2-sci" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 2 Science</h1>
    <p class="small-note">Choose a science topic.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>🌱 Living Things</h3>
        <p>Learn about plants and animals.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g2','sci','L2')">
          Animal Groups
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g2','sci','L3')">
          Life Cycles
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g2','sci','L4')">
          Plant Parts
        </button>
      </div>

      <div class="lesson-column">
        <h3>🧊 Matter</h3>
        <p>Explore solids, liquids, and gases.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g2','sci','L1')">
          States of Matter
        </button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade2')">
        Back to Grade 2
      </button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 3 MENU
========================== -->
<div id="grade3" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 3</h1>
    <p class="small-note">Choose a subject</p>

    <div class="scorebar">
      <div class="badge-pill">⭐ Points: <span id="g3Points">0</span></div>
      <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="g3Learners">0</span></div>
    </div>

    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <button type="button" class="btn btn-main" onclick="show('g3-eng')">English</button>
      <button type="button" class="btn btn-main" onclick="show('g3-math')">Math</button>
      <button type="button" class="btn btn-main" onclick="show('g3-sci')">Science</button>
      <button type="button" class="btn btn-main" onclick="show('g3-hist')">History</button>
      <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
    </div>
  </div>
</div>

<div id="g3-eng" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 3 English</h1>
    <p class="small-note">Choose an English skill.</p>

    <div class="lesson-columns">

<!-- SHORT & LONG VOWELS -->
<div class="lesson-column">
  <h3>🔤 Short & Long Vowels</h3>
  <p>Learn vowel sounds and spelling patterns.</p>

  <button class="btn btn-main" onclick="startLesson('g3','eng','L1')">Short Vowels</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L2')">Long Vowels</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L3')">Vowel Sounds</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L4')">CVC Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L5')">Silent E Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L6')">Vowel Review</button>
</div>

<!-- BLENDS / DIGRAPHS / TRIGRAPHS -->
<div class="lesson-column">
  <h3>📝 Blends & Digraphs</h3>
  <p>Recognize common letter combinations.</p>

  <button class="btn btn-main" onclick="startLesson('g3','eng','L7')">Blends</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L8')">Digraphs</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L9')">Trigraphs</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L10')">Beginning Blends</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L11')">Ending Blends</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L12')">Blends Review</button>
</div>

<!-- VARIANT / DIPHTHONG / R-CONTROLLED -->
<div class="lesson-column">
  <h3>🎵 Vowel Patterns</h3>
  <p>Master advanced vowel sounds.</p>

  <button class="btn btn-main" onclick="startLesson('g3','eng','L13')">Variant Vowels</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L14')">Diphthongs</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L15')">R-Controlled Vowels</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L16')">Vowel Patterns</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L17')">R-Vowel Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L18')">Vowel Pattern Review</button>
</div>

<!-- MULTISYLLABIC WORDS -->
<div class="lesson-column">
  <h3>📚 Multisyllabic Words</h3>
  <p>Break words into syllables.</p>

  <button class="btn btn-main" onclick="startLesson('g3','eng','L19')">Multisyllabic Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L20')">Syllable Parts</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L21')">Open Syllables</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L22')">Closed Syllables</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L23')">Divide Syllables</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L24')">Syllable Review</button>
</div>

<!-- IRREGULAR WORDS -->
<div class="lesson-column">
  <h3>📖 Irregular Words</h3>
  <p>Read and spell tricky words.</p>

  <button class="btn btn-main" onclick="startLesson('g3','eng','L25')">Irregular Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L26')">Tricky Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L27')">High-Frequency Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L28')">Irregular Spelling</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L29')">Read Irregular Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L30')">Irregular Words Review</button>
</div>

<!-- MAIN IDEA -->
<div class="lesson-column">
  <h3>💡 Main Idea</h3>
  <p>Find what a text is mostly about.</p>

  <button class="btn btn-main" onclick="startLesson('g3','eng','L31')">Main Idea</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L32')">Supporting Details</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L33')">Find the Main Idea</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L34')">Key Details</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L35')">Main Idea Practice</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L36')">Main Idea Review</button>
</div>

<!-- INFERENCE & THEME -->
<div class="lesson-column">
  <h3>🔎 Inference & Theme</h3>
  <p>Read between the lines.</p>

  <button class="btn btn-main" onclick="startLesson('g3','eng','L37')">Inference</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L38')">Use Text Clues</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L39')">Theme</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L40')">Infer Feelings</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L41')">Infer Meaning</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L42')">Inference Review</button>
</div>

<!-- AUTHOR'S PURPOSE -->
<div class="lesson-column">
  <h3>✍️ Author's Purpose</h3>
  <p>Why did the author write it?</p>

  <button class="btn btn-main" onclick="startLesson('g3','eng','L43')">Author's Purpose</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L44')">Persuade</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L45')">Inform</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L46')">Entertain</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L47')">Purpose Practice</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L48')">Author's Purpose Review</button>
</div>

<!-- TEXT STRUCTURE -->
<div class="lesson-column">
  <h3>🏗️ Text Structure</h3>
  <p>Learn how texts are organized.</p>

  <button class="btn btn-main" onclick="startLesson('g3','eng','L49')">Text Structure</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L50')">Sequence</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L51')">Compare and Contrast</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L52')">Cause and Effect</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L53')">Problem and Solution</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L54')">Text Structure Review</button>
</div>

<!-- SENSORY DETAILS -->
<div class="lesson-column">
  <h3>🌈 Sensory Details</h3>
  <p>Make writing vivid and interesting.</p>

  <button class="btn btn-main" onclick="startLesson('g3','eng','L55')">Sensory Details</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L56')">Sight Details</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L57')">Sound Details</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L58')">Smell and Taste Details</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L59')">Touch Details</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L60')">Sensory Review</button>
</div>
<!-- TOPIC SENTENCES -->
<div class="lesson-column">
  <h3>🧾 Topic Sentences</h3>
  <p>Write strong opening sentences.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L61')">Topic Sentences</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L62')">Strong Topic Sentences</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L63')">Paragraph Main Idea</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L64')">Choose Topic Sentence</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L65')">Fix Topic Sentence</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L66')">Topic Sentence Review</button>
</div>

<!-- LINKING WORDS -->
<div class="lesson-column">
  <h3>🔗 Linking Words</h3>
  <p>Connect ideas clearly.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L67')">Linking Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L68')">Sequence Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L69')">Compare Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L70')">Cause Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L71')">Transition Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L72')">Linking Words Review</button>
</div>

<!-- EDITING AND REVISING -->
<div class="lesson-column">
  <h3>✏️ Editing & Revising</h3>
  <p>Improve sentences and writing.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L73')">Editing</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L74')">Revising</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L75')">Capitalization</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L76')">Punctuation</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L77')">Sentence Fixes</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L78')">Editing Review</button>
</div>

<!-- DESCRIPTIVE DETAILS -->
<div class="lesson-column">
  <h3>🌟 Descriptive Details</h3>
  <p>Add details that make writing stronger.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L79')">Descriptive Details</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L80')">Add Details</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L81')">Describe Characters</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L82')">Describe Settings</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L83')">Strong Details</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L84')">Description Review</button>
</div>

<!-- PREFIXES AND SUFFIXES -->
<div class="lesson-column">
  <h3>🧩 Prefixes & Suffixes</h3>
  <p>Use word parts to find meaning.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L85')">Prefixes</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L86')">Suffixes</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L87')">Word Parts</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L88')">Prefix Meanings</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L89')">Suffix Meanings</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L90')">Prefixes and Suffixes Review</button>
</div>

<!-- COMPOUND WORDS -->
<div class="lesson-column">
  <h3>🏠 Compound Words</h3>
  <p>Build words from two smaller words.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L91')">Compound Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L92')">Build Compound Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L93')">Split Compound Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L94')">Compound Word Meanings</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L95')">Compound Word Practice</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L96')">Compound Words Review</button>
</div>

<!-- HOMOPHONES AND HOMONYMS -->
<div class="lesson-column">
  <h3>👂 Homophones & Homonyms</h3>
  <p>Learn words that sound or look alike.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L97')">Homophones</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L98')">Homonyms</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L99')">There Their They're</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L100')">To Two Too</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L101')">Word Meaning Clues</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L102')">Homophones Review</button>
</div>

<!-- GREEK AND LATIN ROOTS -->
<div class="lesson-column">
  <h3>🏛️ Greek & Latin Roots</h3>
  <p>Use roots to understand words.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L103')">Greek Roots</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L104')">Latin Roots</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L105')">Root Meanings</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L106')">Root Word Practice</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L107')">Build Words from Roots</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L108')">Roots Review</button>
</div>

<!-- SPELLING -->
<div class="lesson-column">
  <h3>🔡 Spelling</h3>
  <p>Practice common spelling patterns.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L109')">Spelling</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L110')">Common Spelling Patterns</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L111')">Word Families</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L112')">Spelling Rules</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L113')">Correct Spelling</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L114')">Spelling Review</button>
</div>

<!-- PREPOSITIONS -->
<div class="lesson-column">
  <h3>📍 Prepositions</h3>
  <p>Show location, direction, and time.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L115')">Prepositions</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L116')">Prepositional Phrases</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L117')">Location Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L118')">Time Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L119')">Choose Preposition</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L120')">Prepositions Review</button>
</div>

<!-- VERB TENSE -->
<div class="lesson-column">
  <h3>⏰ Verb Tense</h3>
  <p>Use past, present, and future verbs.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L121')">Verb Tense</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L122')">Past Tense</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L123')">Present Tense</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L124')">Future Tense</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L125')">Fix Verb Tense</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L126')">Verb Tense Review</button>
</div>

<!-- VERB TYPES -->
<div class="lesson-column">
  <h3>🏃 Verb Types</h3>
  <p>Learn action, linking, and helping verbs.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L127')">Verb Types</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L128')">Action Verbs</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L129')">Linking Verbs</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L130')">Helping Verbs</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L131')">Choose the Verb</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L132')">Verb Types Review</button>
</div>

<!-- CONTRACTIONS -->
<div class="lesson-column">
  <h3>📎 Contractions</h3>
  <p>Combine words using apostrophes.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L133')">Contractions</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L134')">Apostrophes</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L135')">Make Contractions</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L136')">Expand Contractions</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L137')">Contraction Practice</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L138')">Contractions Review</button>
</div>

<!-- CONJUNCTIONS -->
<div class="lesson-column">
  <h3>🔀 Conjunctions</h3>
  <p>Join words and sentences.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L139')">Conjunctions</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L140')">And But Or</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L141')">Join Sentences</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L142')">Choose Conjunction</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L143')">Fix Conjunctions</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L144')">Conjunctions Review</button>
</div>

<div class="lesson-column">
  <h3>Spelling Practice</h3>
  <p>Fix common words and spelling patterns.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L145')">Spelling Drag: Fix the Word</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L146')">Spelling Patterns</button>
</div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade3')">
        Back to Grade 3
      </button>
    </div>
  </div>
</div>  

<div id="g3-math" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 3 Math</h1>
    <p class="small-note">Choose a math skill.</p>

    <div class="lesson-columns">

      <!-- PLACE VALUE -->
<div class="lesson-column">
  <h3>🔢 Place Value</h3>
  <p>Understand the value of digits in numbers.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L1')">Place Value to 1,000</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L2')">Expanded Form</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L3')">Standard Form</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L4')">Word Form Match</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L5')">Place Value Fix</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L6')">Place Value Review</button>
</div>

<!-- COMPARING & ORDERING -->
<div class="lesson-column">
  <h3>⚖️ Comparing & Ordering</h3>
  <p>Compare and arrange numbers.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L7')">Compare Numbers</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L8')">Greater Than & Less Than</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L9')">Order Numbers</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L10')">Compare Review</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L11')">Least to Greatest</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L12')">Ordering Practice</button>
</div>

<!-- ROUNDING -->
<div class="lesson-column">
  <h3>🎯 Rounding</h3>
  <p>Round numbers to the nearest ten or hundred.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L13')">Round to Tens</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L14')">Round to Hundreds</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L15')">Rounding Rules</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L16')">Rounding Tens Practice</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L17')">Rounding Hundreds Practice</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L18')">Rounding Review</button>
</div>

<!-- ESTIMATE SUMS -->
<div class="lesson-column">
  <h3>➕ Estimate Sums</h3>
  <p>Use rounding to estimate answers.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L19')">Estimate Sums Match</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L20')">Estimate Sums Fix</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L21')">Estimate Sums MC</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L22')">Estimate Sums Speed</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L23')">Estimate Sums Fill</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L24')">Estimate Sums Review</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L25')">Estimate Sums Correction</button>
</div>

<!-- ESTIMATE DIFFERENCES -->
<div class="lesson-column">
  <h3>➖ Estimate Differences</h3>
  <p>Estimate subtraction answers.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L26')">Estimate Differences MC</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L27')">Estimate Differences Speed</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L28')">Estimate Differences Fill</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L29')">Estimate Differences Match</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L30')">Estimate Differences Fix</button>
</div>

<!-- ADDITION: THREE DIGITS -->
<div class="lesson-column">
  <h3>➕ Three-Digit Addition</h3>
  <p>Add larger numbers accurately.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L31')">Three-Digit Addition MC</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L32')">Three-Digit Addition Speed</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L33')">Three-Digit Addition Fill</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L34')">Three-Digit Addition Match</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L35')">Three-Digit Addition Fix</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L36')">Addition Word Problems</button>
</div>

<!-- SUBTRACTION: THREE DIGITS -->
<div class="lesson-column">
  <h3>➖ Three-Digit Subtraction</h3>
  <p>Subtract larger numbers accurately.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L37')">Three-Digit Subtraction MC</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L38')">Three-Digit Subtraction Speed</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L39')">Three-Digit Subtraction Fill</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L40')">Three-Digit Subtraction Match</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L41')">Three-Digit Subtraction Fix</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L42')">Subtraction Word Problems</button>
</div>

<!-- FINANCIAL LITERACY -->
<div class="lesson-column">
  <h3>💵 Financial Literacy</h3>
  <p>Learn about money and spending.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L43')">Money Values</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L44')">Money Math</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L45')">Needs vs Wants</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L46')">Budget Basics</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L47')">Money Word Problems</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L48')">Financial Literacy Review</button>
</div>

<!-- MIXED OPERATIONS -->
<div class="lesson-column">
  <h3>🧮 Mixed Operations</h3>
  <p>Practice addition, subtraction, multiplication, and division.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L49')">Mixed Operations Fill</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L50')">Mixed Operations Match</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L51')">Mixed Operations Fix</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L52')">Choose the Operation</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L53')">Mixed Operations Speed</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L54')">Mixed Operations Challenge</button>
</div>

<!-- DIVISION WORD PROBLEMS -->
<div class="lesson-column">
  <h3>➗ Division Word Problems</h3>
  <p>Solve real-world division situations.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L55')">Division Facts Match</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L56')">Division Fix</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L57')">Division Word Problems</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L58')">Division Speed</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L59')">Division Fill Blanks</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L60')">Division Review</button>
</div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade3')">
        Back to Grade 3
      </button>
    </div>
  </div>
</div>
<div id="g3-sci" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 3 Science</h1>
    <p class="small-note">Choose a science skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>🌳 Habitats</h3>
        <p>Learn where plants and animals live.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L1')">
          Habitats
        </button>
      </div>

      <div class="lesson-column">
        <h3>🌦️ Weather</h3>
        <p>Explore tools used to measure weather.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L2')">
          Weather Tools
        </button>
      </div>

      <div class="lesson-column">
        <h3>🚗 Motion</h3>
        <p>Understand pushes, pulls, and movement.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L3')">
          Forces & Motion
        </button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade3')">
        Back to Grade 3
      </button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 4 MENU
========================== -->
<div id="grade4" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 4</h1>
    <p class="small-note">Choose a subject</p>

    <div class="scorebar">
      <div class="badge-pill">⭐ Points: <span id="g4Points">0</span></div>
      <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="g4Learners">0</span></div>
    </div>

    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <button type="button" class="btn btn-main" onclick="show('g4-eng')">English</button>
      <button type="button" class="btn btn-main" onclick="show('g4-math')">Math</button>
      <button type="button" class="btn btn-main" onclick="show('g4-sci')">Science</button>
      <button type="button" class="btn btn-main" onclick="show('g4-hist')">History</button>
      <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
    </div>
  </div>
</div>

<div id="g4-eng" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 4 English</h1>
    <p class="small-note">Choose a topic column and begin a lesson.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>📖 Context Clues</h3>
        <p>Use sentence clues to understand words.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L1')">
          Meaning from Sentences
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L2')">
          Definition Clues
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L3')">
          Example Clues
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L4')">
          Contrast Clues
        </button>
      </div>

      <div class="lesson-column">
        <h3>🔤 Word Relationships</h3>
        <p>Practice synonyms, antonyms, and vocabulary.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L5')">
          Synonym Match
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L6')">
          Antonym Match
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L7')">
          Word Relationships
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L8')">
          Choosing Better Words
        </button>
      </div>

      <div class="lesson-column">
        <h3>💡 Theme</h3>
        <p>Find the lesson or message in a story.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L9')">
          Finding the Lesson
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L10')">
          Theme in Short Stories
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L11')">
          Character Actions and Theme
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L12')">
          Supporting the Theme
        </button>
      </div>
      <!-- NEW GRADE 4 ENGLISH LESSONS -->

<div class="lesson-column">
  <h3>📚 Reading Skills</h3>
  <p>Understand important ideas in a passage.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L13')">
    Main Idea
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L14')">
    Supporting Details
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L15')">
    Author's Purpose
  </button>
</div>

<div class="lesson-column">
  <h3>🔍 Story Understanding</h3>
  <p>Study how events and ideas connect.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L16')">
    Point of View
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L17')">
    Cause and Effect
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L18')">
    Sequence of Events
  </button>
</div>

<div class="lesson-column">
  <h3>✏️ Grammar & Writing</h3>
  <p>Practice correct words and sentences.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L19')">
    Homophones
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L20')">
    Complete Sentences
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L21')">
    Punctuation
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L22')">
    Spelling: Prefixes
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L23')">
    Spelling Drag: Prefix Meanings
  </button>
</div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade4')">
        Back to Grade 4
      </button>
    </div>
  </div>
</div>

<div id="g4-math" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 4 Math</h1>
    <p class="small-note">Choose a topic column and begin a lesson.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>✖️ Multiplication</h3>
        <p>Build multiplication skills with larger numbers.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L1')">
          2-Digit × 1-Digit Multiplication
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L2')">
          3-Digit × 1-Digit Multiplication
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L3')">
          2-Digit × 2-Digit Multiplication
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L4')">
          Multiplication Word Problems
        </button>
      </div>

      <div class="lesson-column">
        <h3>🔢 Factors & Multiples</h3>
        <p>Understand number patterns and factor pairs.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L5')">
          Finding Factors
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L6')">
          Finding Multiples
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L7')">
          Prime and Composite Numbers
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L8')">
          Factor Pairs
        </button>
      </div>

      <div class="lesson-column">
        <h3>🍕 Equivalent Fractions</h3>
        <p>Compare and create equal fractions.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L9')">
          Equivalent Fractions with Models
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L10')">
          Generating Equivalent Fractions
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L11')">
          Comparing Equivalent Fractions
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L12')">
          Equivalent Fraction Word Problems
        </button>
      </div>
      <!-- NEW GRADE 4 MATH LESSONS -->

<div class="lesson-column">
  <h3>➗ Division</h3>
  <p>Divide numbers and solve real-life problems.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L13')">
    Division Facts
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L14')">
    Long Division
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L15')">
    Add/Sub Word Problems
  </button>
</div>

<div class="lesson-column">
  <h3>🍕 Fractions & Decimals</h3>
  <p>Compare and understand parts of numbers.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L16')">
    Comparing Fractions
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L17')">
    Mixed Numbers
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L18')">
    Decimal Place Value
  </button>
</div>

<div class="lesson-column">
  <h3>📐 Geometry</h3>
  <p>Explore shapes and measurements.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L19')">
    Angles
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','math','L20')">
    Area and Perimeter
  </button>
</div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade4')">
        Back to Grade 4
      </button>
    </div>
  </div>
</div>
<div id="g4-sci" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 4 Science</h1>
    <p class="small-note">Choose a science topic column and begin a lesson.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>🌿 Living Things</h3>
        <p>Explore organisms and ecosystems.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L1')">
          Plant and Animal Structures
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L2')">
          Producers and Consumers
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L3')">
          Food Chains
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L4')">
          Food Webs
        </button>
      </div>

      <div class="lesson-column">
        <h3>🏔️ Earth's Surface</h3>
        <p>Learn how land changes over time.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L5')">
          Rocks and Minerals
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L6')">
          Weathering
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L7')">
          Erosion and Deposition
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L8')">
          How Landforms Change
        </button>
      </div>

      <div class="lesson-column">
        <h3>🧪 Matter</h3>
        <p>Investigate materials and their changes.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L9')">
          States of Matter
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L10')">
          Properties of Matter
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L11')">
          Physical Changes
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L12')">
          Mixtures and Solutions
        </button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Energy & Motion</h3>
        <p>Understand energy, forces, and movement.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L13')">
          Forms of Energy
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L14')">
          Light Energy
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L15')">
          Heat and Electrical Energy
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L16')">
          Force and Motion
        </button>
      </div>

      <div class="lesson-column">
        <h3>🌎 Earth & Space</h3>
        <p>Study weather, planets, and the Moon.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L17')">
          The Water Cycle
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L18')">
          Weather and Climate
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L19')">
          Season and Daylight Patterns
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L20')">
          Moon Appearance Patterns
        </button>
      </div>

      
      <!-- NEW GRADE 4 SCIENCE LESSONS -->

<div class="lesson-column">
  <h3>🐾 Living Things</h3>
  <p>Learn how organisms survive and grow.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L21')">
    Inherited and Acquired Traits
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L22')">
    Food Webs
  </button>
</div>

<div class="lesson-column">
  <h3>🌍 Earth Science</h3>
  <p>Explore Earth's history and resources.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L23')">
    Fossil Evidence
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L24')">
    Matter and Energy in Ecosystems
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L25')">
    Natural Resources
  </button>
</div>

<div class="lesson-column">
  <h3>🧲 Forces & Investigation</h3>
  <p>Discover energy, magnets, and experiments.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L26')">
    Magnetism
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L27')">
    Sound Energy
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L28')">
    Scientific Investigation
  </button>
</div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade4')">
        Back to Grade 4
      </button>
    </div>
  </div>
</div>
`;
    }
  }

  customElements.define("k12-grade2-4-sections", K12Grade24Sections);
})();
