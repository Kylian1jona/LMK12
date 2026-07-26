(function(){
  class K12Grade710Sections extends HTMLElement {
    connectedCallback(){
      if(this.dataset.rendered === "true") return;
      this.dataset.rendered = "true";
      this.innerHTML = String.raw`
<!-- =========================
   GRADE 7 MENU
========================== -->
<div id="grade7" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 7</h1>
    <p class="small-note">Choose a subject</p>

    <div class="scorebar">
      <div class="badge-pill">⭐ Points: <span id="g7Points">0</span></div>
      <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="g7Learners">0</span></div>
    </div>

    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <button type="button" class="btn btn-main" onclick="show('g7-eng')">English</button>
      <button type="button" class="btn btn-main" onclick="show('g7-math')">Math</button>
      <button type="button" class="btn btn-main" onclick="show('g7-sci')">Science</button>
      <button type="button" class="btn btn-main" onclick="show('g7-hist')">History</button>
      <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 7 ENGLISH
========================== -->
<div id="g7-eng" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 7 English</h1>
    <p class="small-note">Choose an English skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>📖 Reading Skills</h3>
        <p>Analyze meaning, purpose, and support.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g7','eng','L1')">Theme & Central Idea</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','eng','L2')">Text Evidence</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','eng','L3')">Author's Purpose</button>
      </div>

      <div class="lesson-column">
        <h3>🎨 Vocabulary</h3>
        <p>Build word meaning and language skills.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g7','eng','L4')">Parts of Speech (Drag)</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','eng','L5')">Context Clues</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','eng','L7')">Fill in the Blank</button>
      </div>

      <div class="lesson-column">
        <h3>📝 Grammar & Practice</h3>
        <p>Practice sentences, matching, and speed.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g7','eng','L6')">Sentence Structure</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','eng','L8')">Sentence Editing</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','eng','L9')">Memory Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','eng','L10')">Speed Challenge</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','eng','L11')">Spelling: Academic Words</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','eng','L12')">Spelling Drag: Word Parts</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade7')">
        Back to Grade 7
      </button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 7 MATH
========================== -->
<div id="g7-math" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 7 Math</h1>
    <p class="small-note">Choose a math skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>🔢 Numbers</h3>
        <p>Practice integers, ratios, and rates.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g7','math','L1')">Integers</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','math','L2')">Ratios &amp; Proportions</button>
      </div>

      <div class="lesson-column">
        <h3>🧮 Algebra</h3>
        <p>Use expressions and equations.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g7','math','L3')">Expressions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','math','L4')">One-Step Equations</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','math','L5')">Word Problems</button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Practice</h3>
        <p>Review with matching and speed.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g7','math','L6')">Integer Memory Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','math','L7')">Equation Speed Problems</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade7')">
        Back to Grade 7
      </button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 7 SCIENCE
========================== -->
<div id="g7-sci" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 7 Science</h1>
    <p class="small-note">Choose a science skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>🔬 Life Science</h3>
        <p>Study cells and body systems.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g7','sci','L1')">Cells</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','sci','L2')">Body Systems</button>
      </div>

      <div class="lesson-column">
        <h3>🌿 Ecosystems</h3>
        <p>Explore producers, consumers, and decomposers.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g7','sci','L3')">Ecosystems</button>
      </div>

      <div class="lesson-column">
        <h3>⚙️ Physical Science</h3>
        <p>Learn about forces and motion.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g7','sci','L4')">Forces &amp; Motion</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade7')">
        Back to Grade 7
      </button>
    </div>
  </div>
</div>
<!-- =========================
   GRADE 8 MENU
========================== -->
<div id="grade8" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 8</h1>
    <p class="small-note">Choose a subject</p>

    <div class="scorebar">
      <div class="badge-pill">⭐ Points: <span id="g8Points">0</span></div>
      <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="g8Learners">0</span></div>
    </div>

    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <button type="button" class="btn btn-main" onclick="show('g8-eng')">English</button>
      <button type="button" class="btn btn-main" onclick="show('g8-math')">Math</button>
      <button type="button" class="btn btn-main" onclick="show('g8-sci')">Science</button>
      <button type="button" class="btn btn-main" onclick="show('g8-hist')">History</button>
      <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 8 ENGLISH
========================== -->
<div id="g8-eng" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 8 English</h1>
    <p class="small-note">Choose an English skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>📖 Reading & Analysis</h3>
        <p>Understand ideas and text organization.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g8','eng','L1')">Central Idea</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','eng','L2')">Text Structure</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','eng','L3')">Argument &amp; Claims</button>
      </div>

      <div class="lesson-column">
        <h3>🎨 Vocabulary & Language</h3>
        <p>Develop vocabulary and language skills.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g8','eng','L4')">Parts of Speech (Drag)</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','eng','L5')">Tone & Mood</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','eng','L6')">Vocabulary in Context</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','eng','L7')">Fill in the Blank</button>
      </div>

      <div class="lesson-column">
        <h3>📝 Practice</h3>
        <p>Review with editing, matching, and speed.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g8','eng','L8')">Sentence Editing</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','eng','L9')">Memory Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','eng','L10')">Speed Challenge</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','eng','L11')">Spelling: Argument Words</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','eng','L12')">Spelling Drag: Argument Terms</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade8')">
        Back to Grade 8
      </button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 8 MATH
========================== -->
<div id="g8-math" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 8 Math</h1>
    <p class="small-note">Choose a math skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>🧮 Algebra</h3>
        <p>Solve equations and work with functions.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g8','math','L1')">Linear Equations</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','math','L2')">Slope</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','math','L3')">Functions</button>
      </div>

      <div class="lesson-column">
        <h3>📐 Geometry</h3>
        <p>Explore squares, triangles, and graphs.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g8','math','L4')">Square Numbers Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','math','L5')">Pythagorean Theorem</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','math','L10')">Graphing</button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Practice</h3>
        <p>Strengthen skills with review activities.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g8','math','L6')">Fill in the Blank</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','math','L7')">Sentence Editing</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','math','L8')">Memory Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','math','L9')">Speed Challenge</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade8')">
        Back to Grade 8
      </button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 8 SCIENCE
========================== -->
<div id="g8-sci" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 8 Science</h1>
    <p class="small-note">Choose a science skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>⚛️ Matter</h3>
        <p>Study atoms and chemical reactions.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L1')">Atomic Structure</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L2')">Chemical Reactions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L4')">Atomic Models</button>
      </div>

      <div class="lesson-column">
        <h3>🧬 Genetics</h3>
        <p>Learn about heredity and evolution.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L3')">Genetics</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L5')">Natural Selection</button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Practice</h3>
        <p>Review concepts through different activities.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L6')">Genetics Vocabulary</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L7')">Reaction Evidence</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L8')">Particle Model Connections</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L9')">Evolution Evidence</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L10')">Heredity Connections</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade8')">
        Back to Grade 8
      </button>
    </div>
  </div>
</div>
<!-- =========================
   GRADE 9 MENU
========================== -->
<div id="grade9" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 9</h1>
    <p class="small-note">Choose a subject</p>

    <div class="scorebar">
      <div class="badge-pill">⭐ Points: <span id="g9Points">0</span></div>
      <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="g9Learners">0</span></div>
    </div>

    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <button type="button" class="btn btn-main" onclick="show('g9-eng')">English</button>
      <button type="button" class="btn btn-main" onclick="show('g9-math')">Math</button>
      <button type="button" class="btn btn-main" onclick="show('g9-sci')">Science</button>
      <button type="button" class="btn btn-main" onclick="show('g9-hist')">History</button>
      <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 9 ENGLISH
========================== -->
<div id="g9-eng" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 9 English</h1>
    <p class="small-note">Choose an English skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>📖 Literature</h3>
        <p>Analyze literature and arguments.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L1')">Literary Analysis</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L2')">Claims & Evidence</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L3')">Rhetoric</button>
      </div>

      <div class="lesson-column">
        <h3>🎨 Language</h3>
        <p>Develop grammar and writing skills.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L4')">Parts of Speech in Context</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L5')">Theme Development</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L6')">Grammar Review</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L7')">Vocabulary in Context</button>
      </div>

      <div class="lesson-column">
        <h3>📝 Practice</h3>
        <p>Review with editing, matching, and speed.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L8')">Sentence Editing</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L9')">Synthesis</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L10')">Analysis Challenge</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L11')">Spelling: Literary Terms</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L12')">Spelling Drag: Literary Terms</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade9')">
        Back to Grade 9
      </button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 9 MATH
========================== -->
<div id="g9-math" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 9 Math</h1>
    <p class="small-note">Choose a math skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>🧮 Algebra</h3>
        <p>Work with equations and quadratics.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L1')">Linear Equations and Inequalities</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L2')">Quadratic Functions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L3')">Systems of Linear Equations</button>
      </div>

      <div class="lesson-column">
        <h3>📊 Data & Powers</h3>
        <p>Practice exponents and statistics.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L4')">Laws of Exponents</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L5')">Statistical Relationships</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L6')">Writing Linear Equations</button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Practice</h3>
        <p>Strengthen skills through review.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L7')">Algebra Error Analysis</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L8')">Function Representations</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L9')">Quadratic Problem Solving</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L10')">Algebra Connections</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade9')">
        Back to Grade 9
      </button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 9 SCIENCE
========================== -->
<div id="g9-sci" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 9 Science</h1>
    <p class="small-note">Choose a science skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>🧬 Biology</h3>
        <p>Study cells, DNA, and genetics.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L1')">Cell Biology</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L2')">DNA &amp; Gene Expression</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L4')">Biomolecules and Cells</button>
      </div>

      <div class="lesson-column">
        <h3>🌎 Ecology</h3>
        <p>Learn about ecosystems and energy.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L3')">Ecological Relationships</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L5')">Energy Flow and Matter Cycling</button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Practice</h3>
        <p>Review science concepts.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L6')">Genetics Vocabulary in Models</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L7')">Mutation and Evidence Analysis</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L8')">Cell Cycle and Differentiation</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L9')">Natural Selection</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L10')">Photosynthesis, Respiration, and Enzymes</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade9')">
        Back to Grade 9
      </button>
    </div>
  </div>
</div>
<!-- =========================
   GRADE 10 MENU
========================== -->
<div id="grade10" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 10</h1>
    <p class="small-note">Choose a subject</p>

    <div class="scorebar">
      <div class="badge-pill">⭐ Points: <span id="g10Points">0</span></div>
      <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="g10Learners">0</span></div>
    </div>

    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <button type="button" class="btn btn-main" onclick="show('g10-eng')">English</button>
      <button type="button" class="btn btn-main" onclick="show('g10-math')">Math</button>
      <button type="button" class="btn btn-main" onclick="show('g10-sci')">Science</button>
      <button type="button" class="btn btn-main" onclick="show('g10-hist')">History</button>
      <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 10 ENGLISH
========================== -->
<div id="g10-eng" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 10 English</h1>
    <p class="small-note">Choose an English skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>📖 Literature & Analysis</h3>
        <p>Analyze texts and persuasive writing.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L1')">Theme Across Cultures</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L2')">Rhetorical Appeals and Fallacies</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L3')">Research Writing</button>
      </div>

      <div class="lesson-column">
        <h3>🎨 Language</h3>
        <p>Strengthen grammar and writing.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L4')">Grammar in Complex Sentences</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L5')">Syntax and Meaning</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L6')">Poetry Analysis</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L7')">Advanced Vocabulary</button>
      </div>

      <div class="lesson-column">
        <h3>📝 Practice</h3>
        <p>Review with editing, matching, and speed.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L8')">Editing for Style and Precision</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L9')">Cross-Text Synthesis</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L10')">Timed Rhetorical Analysis</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L11')">Spelling: Rhetoric Words</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L12')">Spelling Drag: Rhetoric Words</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade10')">
        Back to Grade 10
      </button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 10 MATH
========================== -->
<div id="g10-math" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 10 Math</h1>
    <p class="small-note">Choose a math skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>📐 Geometry</h3>
        <p>Explore geometry and trigonometry.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L1')">Coordinate Geometry</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L2')">Similarity</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L3')">Right-Triangle Trigonometry</button>
      </div>

      <div class="lesson-column">
        <h3>🧭 Transformations & Statistics</h3>
        <p>Analyze coordinate transformations and data.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L4')">Proof and Congruence</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L5')">Coordinate Transformations</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L6')">Geometric Probability</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L7')">Logical Arguments</button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Practice</h3>
        <p>Review and reinforce math skills.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L8')">Geometry Error Analysis</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L9')">Two- and Three-Dimensional Measures</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L10')">Circle Relationships</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade10')">
        Back to Grade 10
      </button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 10 SCIENCE
========================== -->
<div id="g10-sci" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 10 Science</h1>
    <p class="small-note">Choose a science skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>⚛️ Chemistry</h3>
        <p>Study matter, atoms, and bonding.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L1')">Atomic Structure</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L2')">Periodic Trends</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L3')">Chemical Bonding</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L4')">Nomenclature and Molecular Geometry</button>
      </div>

      <div class="lesson-column">
        <h3>⚖️ Quantitative Chemistry</h3>
        <p>Use balanced equations and mole ratios.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L5')">Chemical Stoichiometry</button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Practice</h3>
        <p>Review science concepts in different ways.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L6')">Solutions and Molarity</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L7')">Reaction Equations and Types</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L8')">Moles and Chemical Composition</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L9')">Gas Laws</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L10')">Thermochemistry Connections</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade10')">
        Back to Grade 10
      </button>
    </div>
  </div>
</div>
`;
    }
  }

  customElements.define("k12-grade7-10-sections", K12Grade710Sections);
})();
