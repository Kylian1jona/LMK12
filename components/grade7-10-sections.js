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

        <button type="button" class="btn btn-main" onclick="startLesson('g7','eng','L4')">Parts of Speech Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','eng','L5')">Vocabulary in Context</button>
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
        <button type="button" class="btn btn-main" onclick="startLesson('g7','eng','L12')">Spelling Drag</button>
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

        <button type="button" class="btn btn-main" onclick="startLesson('g7','math','L1')">Integer Operations</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','math','L2')">Ratios & Rates</button>
      </div>

      <div class="lesson-column">
        <h3>🧮 Algebra</h3>
        <p>Use expressions and equations.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g7','math','L3')">Expressions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','math','L4')">One-Step Equations</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','math','L5')">Real-World Math</button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Practice</h3>
        <p>Review with matching and speed.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g7','math','L6')">Memory Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','math','L7')">Speed Challenge</button>
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

        <button type="button" class="btn btn-main" onclick="startLesson('g7','sci','L4')">Forces</button>
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
        <button type="button" class="btn btn-main" onclick="startLesson('g8','eng','L3')">Claims & Evidence</button>
      </div>

      <div class="lesson-column">
        <h3>🎨 Vocabulary & Language</h3>
        <p>Develop vocabulary and language skills.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g8','eng','L4')">Parts of Speech Match</button>
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
        <button type="button" class="btn btn-main" onclick="startLesson('g8','eng','L12')">Spelling Drag</button>
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
        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L4')">Atomic Match</button>
      </div>

      <div class="lesson-column">
        <h3>🧬 Genetics</h3>
        <p>Learn about heredity and evolution.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L3')">Genetics</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L5')">Evolution</button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Practice</h3>
        <p>Review concepts through different activities.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L6')">Fill in the Blank</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L7')">Sentence Editing</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L8')">Memory Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L9')">Speed Challenge</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','sci','L10')">Matter & Heredity</button>
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
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L3')">Rhetorical Appeals</button>
      </div>

      <div class="lesson-column">
        <h3>🎨 Language</h3>
        <p>Develop grammar and writing skills.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L4')">Parts of Speech Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L5')">Theme Development</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L6')">Grammar & Usage</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L7')">Fill in the Blank</button>
      </div>

      <div class="lesson-column">
        <h3>📝 Practice</h3>
        <p>Review with editing, matching, and speed.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L8')">Sentence Editing</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L9')">Memory Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L10')">Speed Challenge</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L11')">Spelling: Literary Terms</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','eng','L12')">Spelling Drag</button>
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

        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L1')">Algebra Review</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L2')">Quadratics</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L3')">Systems of Equations</button>
      </div>

      <div class="lesson-column">
        <h3>📊 Data & Powers</h3>
        <p>Practice exponents and statistics.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L4')">Exponent Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L5')">Statistics</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L6')">Fill in the Blank</button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Practice</h3>
        <p>Strengthen skills through review.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L7')">Sentence Editing</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L8')">Memory Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','math','L9')">Speed Challenge</button>
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
        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L2')">DNA & Genes</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L4')">Cell Match</button>
      </div>

      <div class="lesson-column">
        <h3>🌎 Ecology</h3>
        <p>Learn about ecosystems and energy.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L3')">Ecology</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L5')">Energy Flow</button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Practice</h3>
        <p>Review science concepts.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L6')">Fill in the Blank</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L7')">Sentence Editing</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L8')">Memory Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L9')">Speed Challenge</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','sci','L10')">Biology Connections</button>
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

        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L1')">Theme Development</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L2')">Rhetorical Appeals</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L3')">Research Writing</button>
      </div>

      <div class="lesson-column">
        <h3>🎨 Language</h3>
        <p>Strengthen grammar and writing.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L4')">Parts of Speech Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L5')">Syntax</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L6')">Poetry</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L7')">Fill in the Blank</button>
      </div>

      <div class="lesson-column">
        <h3>📝 Practice</h3>
        <p>Review with editing, matching, and speed.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L8')">Sentence Editing</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L9')">Memory Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L10')">Speed Challenge</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L11')">Spelling: Rhetoric Words</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','eng','L12')">Spelling Drag</button>
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

        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L1')">Geometry Basics</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L2')">Similar Figures</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L3')">Trigonometry</button>
      </div>

      <div class="lesson-column">
        <h3>🧭 Transformations & Statistics</h3>
        <p>Analyze coordinate transformations and data.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L4')">Geometry Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L5')">Coordinate Transformations</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L6')">Statistics</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L7')">Fill in the Blank</button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Practice</h3>
        <p>Review and reinforce math skills.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L8')">Sentence Editing</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L9')">Memory Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','math','L10')">Speed Challenge</button>
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

        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L1')">Chemistry Basics</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L2')">Periodic Table</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L3')">Chemical Bonding</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L4')">Chemistry Match</button>
      </div>

      <div class="lesson-column">
        <h3>⚖️ Quantitative Chemistry</h3>
        <p>Use balanced equations and mole ratios.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L5')">Chemical Stoichiometry</button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Practice</h3>
        <p>Review science concepts in different ways.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L6')">Fill in the Blank</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L7')">Sentence Editing</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L8')">Memory Match</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L9')">Speed Challenge</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','sci','L10')">Chemistry Connections</button>
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
