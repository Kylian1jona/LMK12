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
    <p class="small-note">Pick a lesson </p>
    <div class="lesson-columns">
      <div class="lesson-column">
    <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
      <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L1')">Nouns & Verbs</button>
      <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L2')">Sentence Fix</button>
      <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L3')">Reading Check</button>

      <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L4')">Adjectives</button>
<button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L5')">Past vs Present</button>
<button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L6')">Syllables</button>
<button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L7')">Fill in the Blank</button>
<button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L8')">Sentence Editing</button>
<button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L9')">Memory Match</button>
<button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L10')">Speed Challenge</button>
<button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L11')">Spelling: Short Vowels</button>
<button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L12')">Spelling Drag</button>
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
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L6')">Memory Match</button>
<button type="button" class="btn btn-main" onclick="startLesson('g2','math','L7')">Speed Challenge</button>
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


<!-- MULTISYLLABIC WORDS -->

<!-- IRREGULAR WORDS -->

<!-- MAIN IDEA -->

<!-- INFERENCE & THEME -->

<!-- AUTHOR'S PURPOSE -->

<!-- TEXT STRUCTURE -->

<!-- SENSORY DETAILS -->
<!-- TOPIC SENTENCES -->

<!-- LINKING WORDS -->

<!-- EDITING AND REVISING -->

<!-- DESCRIPTIVE DETAILS -->

<!-- PREFIXES AND SUFFIXES -->

<!-- COMPOUND WORDS -->

<!-- HOMOPHONES AND HOMONYMS -->

<!-- GREEK AND LATIN ROOTS -->

<!-- SPELLING -->

<!-- PREPOSITIONS -->

<!-- VERB TENSE -->

<!-- VERB TYPES -->

<!-- CONTRACTIONS -->

<!-- CONJUNCTIONS -->


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
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L4')">Word Form</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L5')">Digit Value</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L6')">Place Value Review</button>
</div>

<!-- COMPARING & ORDERING -->
<div class="lesson-column">
  <h3>⚖️ Comparing & Ordering</h3>
  <p>Compare and arrange numbers.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L7')">Compare Numbers</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L8')">Greater Than & Less Than</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L9')">Order Numbers Ascending</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L10')">Order Numbers Descending</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L11')">Compare 3-Digit Numbers</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L12')">Comparison Review</button>
</div>

<!-- ROUNDING -->
<div class="lesson-column">
  <h3>🎯 Rounding</h3>
  <p>Round numbers to the nearest ten or hundred.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L13')">Nearest Ten</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L14')">Nearest Hundred</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L15')">Rounding Rules</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L16')">Number Line Rounding</button>
</div>

<!-- ESTIMATE SUMS -->

<!-- ESTIMATE DIFFERENCES -->

<!-- ADDITION: THREE DIGITS -->

<!-- SUBTRACTION: THREE DIGITS -->

<!-- FINANCIAL LITERACY -->

<!-- MIXED OPERATIONS -->

<!-- DIVISION WORD PROBLEMS -->

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

      
      <!-- NEW GRADE 4 SCIENCE LESSONS -->




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
