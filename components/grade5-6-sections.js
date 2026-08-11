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
    <p class="small-note">Choose a subject.</p>

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

        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L1')">Making Inferences</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L4')">Finding the Main Idea</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L5')">Choosing Supporting Details</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L6')">Identifying an Author’s Purpose</button>
      </div>

      <div class="lesson-column">
        <h3>🎨 Language</h3>
        <p>Explore words and creative meanings.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L2')">Understanding Figurative Language</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L7')">Using Context Clues</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L8')">Synonyms and Antonyms</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L9')">Prefixes and Suffixes</button>
      </div>

      <div class="lesson-column">
        <h3>📝 Writing & Grammar</h3>
        <p>Practice sentence and text structure skills.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L3')">Recognizing Text Structures</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L10')">Subjects and Predicates</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L11')">Using Verb Tenses</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L12')">Using Punctuation Correctly</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L13')">Spelling with Suffixes</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','eng','L14')">Spelling Practice</button>
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
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L1')">Understanding Decimals</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L4')">Decimal Place Value</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L5')">Comparing Decimals</button>
      </div>

      <div class="lesson-column">
        <h3>🍕 Fractions</h3>
        <p>Work with fractions and mixed numbers.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L2')">Operations with Fractions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L6')">Equivalent Fractions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L7')">Working with Mixed Numbers</button>
      </div>

      <div class="lesson-column">
        <h3>📐 Operations & Geometry</h3>
        <p>Solve problems using math rules.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L3')">Order of Operations</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L8')">Finding Volume</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L9')">The Coordinate Plane</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L10')">Identifying Number Patterns</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','math','L11')">Solving Multi-Step Word Problems</button>
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

        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L1')">The Solar System</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L4')">Earth’s Rotation</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L5')">Weather and Climate</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L6')">The Water Cycle</button>
      </div>

      <div class="lesson-column">
        <h3>🔬 Life Science</h3>
        <p>Study cells and living systems.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L2')">Cells and Their Functions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L7')">Plant Structures and Systems</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L8')">Food Chains and Food Webs</button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Matter & Energy</h3>
        <p>Learn about materials, forces, and energy.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L3')">Mixtures and Solutions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L9')">Physical Changes in Matter</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','sci','L10')">Force and Motion</button>
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
    <p class="small-note">Choose a subject.</p>

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
          Finding Themes and Writing Summaries
        </button>
      </div>

      <div class="lesson-column">
        <h3>🔤 Vocabulary</h3>
        <p>Use clues in text to understand words.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g6','eng','L2')">
          Using Context Clues
        </button>
      </div>

      <div class="lesson-column">
        <h3>📖 Evidence</h3>
        <p>Support answers using details from text.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g6','eng','L3')">
          Selecting Text Evidence
        </button>
      </div>
      <div class="lesson-column">
  <h3>💡 Main Idea</h3>
  <p>Find the central message or point of a text.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L4')">Finding the Main Idea</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L5')">Choosing Supporting Details</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L6')">Writing Effective Summaries</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L7')">Theme vs. Main Idea</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L8')">Choosing the Best Title</button>
</div>

<div class="lesson-column">
  <h3>🎯 Author's Purpose & Tone</h3>
  <p>Understand why authors write and how they sound.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L9')">Identifying an Author’s Purpose</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L10')">Inform, Persuade, Explain, or Entertain</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L11')">Analyzing Tone</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L12')">Distinguishing Mood from Tone</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L13')">Analyzing an Author’s Viewpoint</button>
</div>

<div class="lesson-column">
  <h3>🏗️ Text Structure</h3>
  <p>Recognize how information is organized.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L14')">Understanding Cause and Effect</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L15')">Comparing and Contrasting</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L16')">Problem-and-Solution Text Structure</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L17')">Sequence and Chronological Order</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L18')">Descriptive Text Structure</button>
</div>

<div class="lesson-column">
  <h3>🔁 Synonyms & Antonyms</h3>
  <p>Work with words that mean the same or opposite.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L19')">Choosing Precise Synonyms</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L20')">Choosing Precise Antonyms</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L21')">Determining Meaning from Context</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L22')">Choosing Precise and Powerful Words</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L23')">Synonyms, Antonyms, and Word Relationships</button>
</div>

<div class="lesson-column">
  <h3>🗣️ Idioms & Adages</h3>
  <p>Learn figurative sayings and wise expressions.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L24')">Understanding Common Idioms</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L25')">Interpreting Idioms in Context</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L26')">Understanding Adages</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L27')">Interpreting Proverbs</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L28')">How Figurative Language Creates Meaning</button>
</div>

<div class="lesson-column">
  <h3>🔊 Homophones</h3>
  <p>Choose the correct word that sounds the same.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L29')">Their, There, and They’re</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L30')">To, Too, and Two</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L31')">Your and You’re</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L32')">Its and It’s</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L33')">Choosing the Correct Homophone</button>
</div>

<div class="lesson-column">
  <h3>📍 Prepositions</h3>
  <p>Use words that show location, direction, and time.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L34')">Understanding Prepositions</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L35')">Identifying Prepositional Phrases</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L36')">Prepositions of Location</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L37')">Prepositions of Time</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L38')">Using Prepositions Correctly</button>
</div>

<div class="lesson-column">
  <h3>🏛️ Greek & Latin Roots</h3>
  <p>Decode word meanings using roots.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L39')">Understanding Word Roots</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L40')">Common Greek Roots</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L41')">Common Latin Roots</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L42')">Using Prefixes and Roots</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L43')">Building Meaning from Word Parts</button>
</div>

<div class="lesson-column">
  <h3>🎯 Direct & Indirect Objects</h3>
  <p>Find what receives the action in a sentence.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L44')">Identifying Direct Objects</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L45')">Identifying Indirect Objects</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L46')">Direct and Indirect Object Practice</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L47')">Understanding Sentence Parts</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L48')">Direct and Indirect Object Review</button>
</div>

<div class="lesson-column">
  <h3>👤 Pronouns & Antecedents</h3>
  <p>Match pronouns to the nouns they replace.</p>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L49')">Understanding Pronouns</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L50')">Pronouns and Their Antecedents</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L51')">Pronoun-Antecedent Agreement</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L52')">Writing with Clear Pronouns</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L53')">Pronoun Usage Review</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L54')">Homophone Spelling</button>
  <button class="btn btn-main" onclick="startLesson('g6','eng','L55')">Homophone Meanings and Usage</button>
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
          Understanding Ratios
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L2')">
          Operations with Integers
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L13')">
          Prime and Composite Numbers
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L14')">
          Finding Factors
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
          Writing and Evaluating Expressions
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L4')">
          Testing Solutions to Inequalities
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L5')">
          Graphing Inequalities on Number Lines
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L6')">
          Writing Inequalities from Graphs
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L7')">
          Writing Exponential Expressions
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L8')">
          Evaluating Whole-Number Powers
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L9')">
          Powers of Ten
        </button>
      </div>

      <div class="lesson-column">
        <h3>📊 Real-World Math</h3>
        <p>Use rates, percentages, decimals, and data.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L17')">
          Finding and Using Unit Rates
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L18')">
          Finding a Percent of a Number
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L19')">
          Dividing Fractions
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L20')">
          Operations with Decimals
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L22')">
          Mean, Median, and Range
        </button>
      </div>

      <div class="lesson-column">
        <h3>📍 Geometry</h3>
        <p>Graph locations and measure three-dimensional figures.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L10')">
          Understanding the Coordinate Plane
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L11')">
          Locating Objects on a Coordinate Plane
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L12')">
          Graphing Points on a Coordinate Plane
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','math','L21')">
          Surface Area of Prisms
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
          Cells and Organelles
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L2')">
          Energy Forms and Conservation
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L3')">
          The Rock Cycle
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L4')">
          Classifying Igneous, Sedimentary, and Metamorphic Rocks
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L5')">
          Measuring and Estimating Temperature
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L21')">
          Weather Data and Climate Patterns
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L22')">
          Interactions Among Earth’s Systems
        </button>
      </div>

      <div class="lesson-column">
        <h3>🔬 Matter & Measurement</h3>
        <p>Explore units, atoms, density, and energy transfer.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L6')">
          Choosing Units for Distance
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L7')">
          Metric Units for Length, Mass, and Volume
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L15')">
          Atoms, Elements, and the Periodic Table
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L16')">
          Calculating and Comparing Density
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L17')">
          Thermal Energy and Heat Transfer
        </button>
      </div>

      <div class="lesson-column">
        <h3>🧫 Life Science</h3>
        <p>Understand cells and interactions in ecosystems.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L8')">
          Plant Cell Structures and Functions
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L9')">
          Animal Cell Structures and Functions
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L10')">
          Comparing Plant and Animal Cells
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L19')">
          Relationships in Ecosystems
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L20')">
          Photosynthesis and Cellular Respiration
        </button>
      </div>

      <div class="lesson-column">
        <h3>⚡ Motion & Waves</h3>
        <p>Investigate speed, forces, and energy waves.</p>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L11')">
          Calculating Speed
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L12')">
          Calculating Distance
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L13')">
          Newton’s Third Law of Motion
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L14')">
          Balanced and Unbalanced Forces
        </button>

        <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L18')">
          Wave Properties and Energy Transfer
        </button>
      </div>
      <div class="lesson-column">
  <h3>⚡ Kinetic & Potential Energy</h3>
  <p>Explore how energy moves, is stored, and changes form.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L23')">
          Forms of Energy
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L24')">
          Energy of Motion
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L25')">
          Stored Energy
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L26')">
          Tracing Energy Transformations
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L27')">
          Energy in Everyday Systems
        </button>
</div>

<div class="lesson-column">
  <h3>🫀 Anatomy</h3>
  <p>Learn about the structure and function of the human body.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L28')">
          Interactions Among Body Systems
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L29')">
          Skeletal System Structure and Function
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L30')">
          Muscular System and Movement
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L31')">
          Circulatory System Interactions
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L32')">
          Digestive System Interactions
        </button>
</div>

<div class="lesson-column">
  <h3>🧪 Biochemistry</h3>
  <p>Discover the chemistry that powers living organisms.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L33')">
          Biological Molecules
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L34')">
          Protein Structure and Function
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L35')">
          Carbohydrates and Energy
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L36')">
          Lipids and Long-Term Energy Storage
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L37')">
          Enzymes and Reaction Rates
        </button>
</div>

<div class="lesson-column">
  <h3>🌱 Plant Reproduction</h3>
  <p>Study how plants grow, reproduce, and spread.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L38')">
          Flower Structures and Functions
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L39')">
          How Pollination Works
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L40')">
          Fertilization in Flowering Plants
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L41')">
          Seed Formation and Dispersal
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L42')">
          Patterns in Plant Life Cycles
        </button>
</div>

<div class="lesson-column">
  <h3>🌌 Astronomy</h3>
  <p>Explore planets, stars, galaxies, and the universe.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L43')">
          Earth in the Solar System
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L44')">
          Planets, Moons, and Tides
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L45')">
          Stars, Constellations, and Perspective
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L46')">
          Galaxies and the Scale of the Universe
        </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g6','sci','L47')">
          Tools and Models for Space Exploration
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
