(function(){
  class K12Grade56Sections extends HTMLElement {
    connectedCallback(){
      if(this.dataset.rendered === "true") return;
      this.dataset.rendered = "true";
      this.innerHTML = String.raw`
<!-- =========================
   GRADE 5 MENU
========================== -->
<div id="grade5" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 5</h1>
    <p class="small-note">Choose a subject</p>

    <div class="scorebar">
      <div class="badge-pill">⭐ Points: <span id="g5Points">0</span></div>
      <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="g5Learners">0</span></div>
    </div>

    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <button type="button" class="btn btn-main" onclick="show('g5-eng')">English</button>
      <button type="button" class="btn btn-main" onclick="show('g5-math')">Math</button>
      <button type="button" class="btn btn-main" onclick="show('g5-sci')">Science</button>
      <button type="button" class="btn btn-main" onclick="show('g5-hist')">History</button>
      <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 5 ENGLISH
========================== -->
<div id="g5-eng" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 5 English</h1>
    <p class="small-note">Choose an English skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>📖 Reading Skills</h3>
        <p>Understand passages and key ideas.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L1')">Inference</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L4')">Main Idea</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L5')">Supporting Details</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L6')">Author's Purpose</button>
      </div>

      <div class="lesson-column">
        <h3>🎨 Language</h3>
        <p>Explore words and creative meanings.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L2')">Figurative Language</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L7')">Context Clues</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L8')">Synonyms & Antonyms</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L9')">Prefixes & Suffixes</button>
      </div>

      <div class="lesson-column">
        <h3>📝 Writing & Grammar</h3>
        <p>Practice sentence and text structure skills.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L3')">Text Structure</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L10')">Subject & Predicate</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L11')">Verb Tense</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L12')">Punctuation</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L13')">Spelling: Suffixes</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L14')">Spelling Drag</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade5')">
        Back to Grade 5
      </button>
    </div>
  </div>
</div>


<!-- =========================
   GRADE 5 MATH
========================== -->
<div id="g5-math" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 5 Math</h1>
    <p class="small-note">Choose a math skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>🔟 Numbers</h3>
        <p>Practice decimals and place value.</p>
<a></a>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L1')">Decimals</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L4')">Decimal Place Value</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L5')">Compare Decimals</button>
      </div>

      <div class="lesson-column">
        <h3>🍕 Fractions</h3>
        <p>Work with fractions and mixed numbers.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L2')">Fraction Operations</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L6')">Equivalent Fractions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L7')">Mixed Numbers</button>
      </div>

      <div class="lesson-column">
        <h3>📐 Operations & Geometry</h3>
        <p>Solve problems using math rules.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L3')">Order of Operations</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L8')">Volume</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L9')">Coordinate Plane</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L10')">Patterns</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L11')">Word Problems</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade5')">
        Back to Grade 5
      </button>
    </div>
  </div>
</div>


<!-- =========================
   GRADE 5 SCIENCE
========================== -->
<div id="g5-sci" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 5 Science</h1>
    <p class="small-note">Choose a science skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>🌎 Earth & Space</h3>
        <p>Explore planets, weather, and Earth systems.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L1')">Solar System</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L4')">Earth's Rotation</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L5')">Weather & Climate</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L6')">Water Cycle</button>
      </div>

      <div class="lesson-column">
        <h3>🔬 Life Science</h3>
        <p>Study cells and living systems.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L2')">Cells</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L7')">Plant Systems</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L8')">Food Chains</button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Matter & Energy</h3>
        <p>Learn about materials, forces, and energy.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L3')">Mixtures & Solutions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L9')">Physical Changes</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L10')">Force & Motion</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L11')">Forms of Energy</button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade5')">
        Back to Grade 5
      </button>
    </div>
  </div>
</div>
<!-- =========================
   GRADE 6 MENU
========================== -->
<div id="grade6" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 6</h1>
    <p class="small-note">Choose a subject</p>

    <div class="scorebar">
      <div class="badge-pill">⭐ Points: <span id="g6Points">0</span></div>
      <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="g6Learners">0</span></div>
    </div>

    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <button type="button" class="btn btn-main" onclick="show('g6-eng')">English</button>
      <button type="button" class="btn btn-main" onclick="show('g6-math')">Math</button>
      <button type="button" class="btn btn-main" onclick="show('g6-sci')">Science</button>
      <button type="button" class="btn btn-main" onclick="show('g6-hist')">History</button>
      <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
    </div>
  </div>
</div>

<div id="g6-eng" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 6 English</h1>
    <p class="small-note">Choose an English skill.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>💡 Theme & Summary</h3>
        <p>Find central messages and summarize texts.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g6','eng','L1')">
          Theme & Summary
        </button>
      </div>

      <div class="lesson-column">
        <h3>🔤 Vocabulary</h3>
        <p>Use clues in text to understand words.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g6','eng','L2')">
          Context Clues
        </button>
      </div>

      <div class="lesson-column">
        <h3>📖 Evidence</h3>
        <p>Support answers using details from text.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g6','eng','L3')">
          Text Evidence
        </button>
      </div>
      <div class="lesson-column">
  <h3>💡 Main Idea</h3>
  <p>Find the central message or point of a text.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L4')">Main Idea Basics</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L5')">Supporting Details</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L6')">Summarizing</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L7')">Theme vs Main Idea</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L8')">Find the Best Title</button>
</div>

<div class="lesson-column">
  <h3>🎯 Author's Purpose & Tone</h3>
  <p>Understand why authors write and how they sound.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L9')">Author's Purpose</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L10')">Persuade Inform Explain</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L11')">Tone Words</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L12')">Mood vs Tone</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L13')">Author's Viewpoint</button>
</div>

<div class="lesson-column">
  <h3>🏗️ Text Structure</h3>
  <p>Recognize how information is organized.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L14')">Cause and Effect</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L15')">Compare and Contrast</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L16')">Problem and Solution</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L17')">Sequence</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L18')">Description</button>
</div>

<div class="lesson-column">
  <h3>🔁 Synonyms & Antonyms</h3>
  <p>Work with words that mean the same or opposite.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L19')">Synonyms</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L20')">Antonyms</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L21')">Context Clues</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L22')">Strong Word Choice</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L23')">Word Relationships</button>
</div>

<div class="lesson-column">
  <h3>🗣️ Idioms & Adages</h3>
  <p>Learn figurative sayings and wise expressions.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L24')">Common Idioms</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L25')">Idiom Meaning</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L26')">Adages</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L27')">Proverbs</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L28')">Figurative Language</button>
</div>

<div class="lesson-column">
  <h3>🔊 Homophones</h3>
  <p>Choose the correct word that sounds the same.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L29')">There Their They're</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L30')">To Too Two</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L31')">Your You're</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L32')">Its It's</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L33')">Mixed Homophones</button>
</div>

<div class="lesson-column">
  <h3>📍 Prepositions</h3>
  <p>Use words that show location, direction, and time.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L34')">Preposition Basics</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L35')">Prepositional Phrases</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L36')">Location Words</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L37')">Time Words</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L38')">Preposition Review</button>
</div>

<div class="lesson-column">
  <h3>🏛️ Greek & Latin Roots</h3>
  <p>Decode word meanings using roots.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L39')">Root Basics</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L40')">Greek Roots</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L41')">Latin Roots</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L42')">Prefixes and Roots</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L43')">Word Meaning</button>
</div>

<div class="lesson-column">
  <h3>🎯 Direct & Indirect Objects</h3>
  <p>Find what receives the action in a sentence.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L44')">Direct Objects</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L45')">Indirect Objects</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L46')">Object Practice</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L47')">Sentence Parts</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L48')">Object Review</button>
</div>

<div class="lesson-column">
  <h3>👤 Pronouns & Antecedents</h3>
  <p>Match pronouns to the nouns they replace.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L49')">Pronoun Basics</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L50')">Antecedents</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L51')">Pronoun Agreement</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L52')">Clear Pronouns</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L53')">Pronoun Review</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L54')">Spelling: Homophones</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L55')">Spelling Drag</button>
</div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade6')">
        Back to Grade 6
      </button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 6 MATH
========================== -->
<div id="g6-math" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 6 Math</h1>
    <p class="small-note">Choose a math topic column and begin a lesson.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>🔢 Number Sense</h3>
        <p>Work with factors, multiples, and integers.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L1')">
          Ratios
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L2')">
          Integers
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L13')">
          Prime or Composite
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L14')">
          Identify Factors
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L15')">
          Greatest Common Factor
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L16')">
          Least Common Multiple
        </button>
      </div>

      <div class="lesson-column">
        <h3>🧮 Expressions & Inequalities</h3>
        <p>Write, solve, and graph algebraic relationships.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L3')">
          Expressions
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L4')">
          Solutions to Inequalities
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L5')">
          Graph Inequalities
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L6')">
          Write Inequalities
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L7')">
          Exponent Expressions
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L8')">
          Evaluate Powers
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L9')">
          Powers of Ten
        </button>
      </div>

      <div class="lesson-column">
        <h3>📊 Real-World Math</h3>
        <p>Use rates, percentages, decimals, and data.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L17')">
          Unit Rates
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L18')">
          Percent of a Number
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L19')">
          Divide Fractions
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L20')">
          Decimal Operations
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L22')">
          Mean, Median & Range
        </button>
      </div>

      <div class="lesson-column">
        <h3>📍 Geometry</h3>
        <p>Graph locations and measure three-dimensional figures.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L10')">
          Describe the Coordinate Plane
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L11')">
          Objects on a Coordinate Plane
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L12')">
          Graph Points
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L21')">
          Surface Area
        </button>
      </div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade6')">
        Back to Grade 6
      </button>
    </div>
  </div>
</div>

<!-- =========================
   GRADE 6 SCIENC
========================== -->
<div id="g6-sci" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 6 Science</h1>
    <p class="small-note">Choose a science topic.</p>

    <div class="lesson-columns">

      <div class="lesson-column">
        <h3>🪨 Earth Science</h3>
        <p>Study rocks, temperature, weather, and Earth systems.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L1')">
          How Rock Layers Form
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L2')">
          Rocks and Minerals
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L3')">
          Rock Cycle
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L4')">
          Classify Rocks
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L5')">
          Estimate Temperatures
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L21')">
          Weather and Climate
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L22')">
          Earth's Systems
        </button>
      </div>

      <div class="lesson-column">
        <h3>🔬 Matter & Measurement</h3>
        <p>Explore units, atoms, density, and energy transfer.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L6')">
          Customary Distance Units
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L7')">
          Metric Units
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L15')">
          Atoms and Elements
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L16')">
          Density
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L17')">
          Thermal Energy
        </button>
      </div>

      <div class="lesson-column">
        <h3>🧫 Life Science</h3>
        <p>Understand cells and interactions in ecosystems.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L8')">
          Plant Cell Parts
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L9')">
          Animal Cell Parts
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L10')">
          Compare Cells
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L19')">
          Ecosystems
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L20')">
          Photosynthesis & Respiration
        </button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Motion & Waves</h3>
        <p>Investigate speed, forces, and energy waves.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L11')">
          Calculate Speed
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L12')">
          Calculate Distance
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L13')">
          Newton's Third Law
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L14')">
          Balanced and Unbalanced Forces
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L18')">
          Waves
        </button>
      </div>
      <div class="lesson-column">
  <h3>⚡ Kinetic & Potential Energy</h3>
  <p>Explore how energy moves, is stored, and changes form.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L23')">
    What Is Energy?
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L24')">
    Kinetic Energy
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L25')">
    Potential Energy
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L26')">
    Energy Transformations
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L27')">
    Real-World Energy
  </button>
</div>

<div class="lesson-column">
  <h3>🫀 Anatomy</h3>
  <p>Learn about the structure and function of the human body.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L28')">
    Body Systems
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L29')">
    Skeletal System
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L30')">
    Muscular System
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L31')">
    Circulatory System
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L32')">
    Digestive System
  </button>
</div>

<div class="lesson-column">
  <h3>🧪 Biochemistry</h3>
  <p>Discover the chemistry that powers living organisms.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L33')">
    Molecules of Life
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L34')">
    Proteins
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L35')">
    Carbohydrates
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L36')">
    Lipids & Fats
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L37')">
    Enzymes
  </button>
</div>

<div class="lesson-column">
  <h3>🌱 Plant Reproduction</h3>
  <p>Study how plants grow, reproduce, and spread.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L38')">
    Flower Structures
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L39')">
    Pollination
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L40')">
    Fertilization
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L41')">
    Seed Formation
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L42')">
    Plant Life Cycles
  </button>
</div>

<div class="lesson-column">
  <h3>🌌 Astronomy</h3>
  <p>Explore planets, stars, galaxies, and the universe.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L43')">
    The Solar System
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L44')">
    Planets & Moons
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L45')">
    Stars & Constellations
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L46')">
    Galaxies
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L47')">
    Space Exploration
  </button>
</div>

    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade6')">
        Back to Grade 6
      </button>
    </div>
  </div>
</div>
`;
    }
  }

  customElements.define("k12-grade5-6-sections", K12Grade56Sections);
})();
