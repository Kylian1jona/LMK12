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
      <button type="button" class="btn btn-main" onclick="show('reading');renderReadingGrade('g2')">Reading</button>
      <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
    </div>
  </div>
</div>

<div id="g2-eng" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 2 English</h1>
    <p class="small-note">Choose a skill group, then pick a lesson.</p>
    <div class="lesson-columns" aria-label="Grade 2 English lesson groups">
      <div class="lesson-column">
        <h3>Words &amp; Grammar</h3>
        <p>Learn word types and how words change.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L1')">Nouns &amp; Verbs</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L4')">Adjectives</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L5')">Past vs Present</button>
      </div>
      <div class="lesson-column">
        <h3>Build Sentences</h3>
        <p>Complete and edit sentences.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L2')">Sentence Fix</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L7')">Fill in the Blank</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L8')">Sentence Editing</button>
      </div>
      <div class="lesson-column">
        <h3>Reading &amp; Sounds</h3>
        <p>Understand what you read and hear.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L3')">Reading Check</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L6')">Syllables</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L9')">Memory Match</button>
      </div>
      <div class="lesson-column">
        <h3>Spelling &amp; Challenges</h3>
        <p>Practice spelling with games and timed rounds.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L10')">Speed Challenge</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L11')">Spelling: Short Vowels</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','eng','L12')">Spelling Practice</button>
      </div>
      <div class="lesson-column">

        <h3>Choose One Word</h3>
        <p>Complete each Grade 2 sentence using a dropdown list.</p>
        <button type="button" class="btn btn-main" onclick="startUnifiedEarlyLesson('g2:eng:format-dropdown','g2-eng')">Complete a Sentence</button>
      </div>
    </div>
    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade2')">Back to Grade 2</button>
    </div>
  </div>
</div>

<div id="g2-math" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 2 Math</h1>
    <p class="small-note">Choose a math topic.</p>

    <div class="lesson-columns" data-number-sense-added="true">

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

      <div class="lesson-column">
        <h3>Place Value</h3>
        <p>Practice with 25 focused questions.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L8')">Place Value Names up to Ten Thousands</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L9')">Value of a Digit up to Ten Thousands</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L10')">Convert To and From a Number</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L11')">Convert Between Place Values</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L12')">Standard and Expanded Form</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L13')">Regroup Thousands, Hundreds, Tens, and Ones</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L14')">Place Value Word Problems</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L15')">Even or Odd</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L16')">Guess the Number</button>
      </div>

      <div class="lesson-column">
        <h3>Comparing and Ordering</h3>
        <p>Practice with 25 focused questions.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L17')">Compare and Order Numbers Using Number Lines</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L18')">Compare Numbers</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L19')">Greatest or Least Number</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L20')">Order Numbers</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L21')">Make the Largest or Smallest Number</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L22')">Ordering Puzzles</button>
      </div>

      <div class="lesson-column">
        <h3>Rounding</h3>
        <p>Practice with 25 focused questions.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L23')">Round Using a Number Line</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L24')">Round to the Nearest Ten or Hundred</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L25')">Round Numbers in a Table</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L26')">Rounding Puzzles</button>
      </div>

      <div class="lesson-column">
        <h3>Estimate Sums</h3>
        <p>Practice with 25 focused questions.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L27')">Estimate Sums by Rounding up to 1,000</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L28')">Estimate Sums Using Compatible Numbers</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L29')">Estimate Sums in Word Problems</button>
      </div>

      <div class="lesson-column">
        <h3>Estimate Differences</h3>
        <p>Practice with 25 focused questions.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L30')">Estimate Differences by Rounding up to 1,000</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L31')">Estimate Differences Using Compatible Numbers</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','math','L32')">Estimate Differences in Word Problems</button>
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
      <button type="button" class="btn btn-main" onclick="openGradeTyping()">Typing</button>
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

<div class="lesson-column">
  <h3>🔊 Vowel Patterns</h3>
  <p>Practice advanced vowel sounds and spelling patterns.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L13')">Variant Vowels</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L14')">Diphthongs</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L15')">R-Controlled Vowels</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L16')">Vowel Patterns</button>
</div>

<div class="lesson-column">
  <h3>Reading and Writing</h3>
  <p>Move from longer words to understanding, editing, and building paragraphs. Each lesson has 25 progressively harder questions.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L17')">1. Multisyllabic Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L18')">2. Main Idea and Supporting Details</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L19')">3. Context Clues</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L20')">4. Sentence Editing</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L21')">5. Paragraph Building</button>
</div>

<div class="lesson-column">
  <h3>Advanced Reading and Writing</h3>
  <p>Use evidence, analyze text, build vocabulary, and strengthen narratives.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L22')">Inference and Text Evidence</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L23')">Author's Purpose and Perspective</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L24')">Text Structures</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L25')">Prefixes, Suffixes, and Word Meaning</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L26')">Narrative Writing</button>
</div>

<div class="lesson-column">
  <h3>Language, Research, and Argument</h3>
  <p>Interpret language, connect texts, research carefully, and support written opinions.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L27')">Figurative Language</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L28')">Comparing Texts</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L29')">Fact, Opinion, and Evidence</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L30')">Research and Note-Taking</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L31')">Opinion Writing</button>
</div>

<div class="lesson-column">
  <h3>Reading and Writing Workshop</h3>
  <p>Read closely, study language, and revise clear writing.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L32')">Poetry and Sound</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L33')">Story Elements and Conflict</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L34')">Dialogue and Point of View</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L35')">Using Reference Tools</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L36')">Revision and Strong Details</button>
</div>

<div class="lesson-column">
  <h3>Understanding and Explaining Text</h3>
  <p>Summarize, infer, compare, edit, and explain with evidence.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L37')">Summarizing Informational Text</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L38')">Character Choices and Inference</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L39')">Comparing Two Texts</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L40')">Grammar for Clear Sentences</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L41')">Explaining an Idea in Writing</button>
</div>

<div class="lesson-column">
  <h3>Read Closely and Write Clearly</h3>
  <p>Use text features and clues, then edit and support ideas.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L42')">Understanding Nonfiction Features</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L43')">Reading Character Clues</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L44')">Word Meanings in Context</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L45')">Editing a Paragraph</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L46')">Writing Reasons and Evidence</button>
</div>

<div class="lesson-column">
  <h3>Research and Clear Communication</h3>
  <p>Follow directions, interpret language, ask questions, and organize a report.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L47')">Following Written Procedures</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L48')">Literal and Figurative Meaning</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L49')">Questioning While Reading</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L50')">Quoting and Paraphrasing Sources</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L51')">Organizing a Short Report</button>
</div>

<div class="lesson-column"><h3>📚 Story Detectives</h3><p>Track what characters say and do to find story clues.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L52')">Fiction Clues and Character Feelings</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L53')">Main Idea in School News</button>
</div>
<div class="lesson-column"><h3>💬 Words and Notes</h3><p>Build new words and write clear messages.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L54')">Prefixes That Unlock Words</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L55')">Writing a Helpful Note</button>
</div>
<div class="lesson-column"><h3>🐾 Stories and Strong Words</h3><p>Compare animal tales and choose lively action words.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L56')">Comparing Animal Stories</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L57')">Strong Verbs for Action</button>
</div>
<div class="lesson-column"><h3>📊 Read and Retell</h3><p>Use picture clues and put story events in order.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L58')">Reading Charts and Captions</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L59')">Beginning, Middle, and End</button>
</div>
<div class="lesson-column"><h3>📝 Clear Writing</h3><p>Use correct nouns and support an opinion with reasons.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L60')">Plural and Possessive Nouns</button>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L61')">Opinion Writing About Class Projects</button>
</div>
<div class="lesson-column"><h3>Stories and Characters</h3><p>Study characters, events, and story meaning.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L62')">Story Elements</button><button class="btn btn-main" onclick="startLesson('g3','eng','L63')">Character Traits</button><button class="btn btn-main" onclick="startLesson('g3','eng','L64')">Character Motivation</button><button class="btn btn-main" onclick="startLesson('g3','eng','L65')">Sequence and Plot</button><button class="btn btn-main" onclick="startLesson('g3','eng','L66')">Story Analysis Challenge</button>
</div>
<div class="lesson-column"><h3>Reading Information</h3><p>Find, connect, and compare important facts.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L67')">Main Idea and Details</button><button class="btn btn-main" onclick="startLesson('g3','eng','L68')">Text Features</button><button class="btn btn-main" onclick="startLesson('g3','eng','L69')">Cause and Effect</button><button class="btn btn-main" onclick="startLesson('g3','eng','L70')">Comparing Sources</button><button class="btn btn-main" onclick="startLesson('g3','eng','L71')">Information Reading Challenge</button>
</div>
<div class="lesson-column"><h3>Grammar and Sentences</h3><p>Build correct and descriptive sentences.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L72')">Complete Sentences</button><button class="btn btn-main" onclick="startLesson('g3','eng','L73')">Subjects and Predicates</button><button class="btn btn-main" onclick="startLesson('g3','eng','L74')">Verb Tense</button><button class="btn btn-main" onclick="startLesson('g3','eng','L75')">Adjectives and Adverbs</button><button class="btn btn-main" onclick="startLesson('g3','eng','L76')">Grammar Challenge</button>
</div>
<div class="lesson-column"><h3>Writing and Revision</h3><p>Organize, edit, and strengthen paragraphs.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L77')">Paragraph Main Idea</button><button class="btn btn-main" onclick="startLesson('g3','eng','L78')">Supporting Details</button><button class="btn btn-main" onclick="startLesson('g3','eng','L79')">Transitions</button><button class="btn btn-main" onclick="startLesson('g3','eng','L80')">Editing Conventions</button><button class="btn btn-main" onclick="startLesson('g3','eng','L81')">Writing Challenge</button>
</div>
<div class="lesson-column"><h3>Vocabulary and Word Study</h3><p>Use word parts and context to learn meanings.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L82')">Prefixes</button><button class="btn btn-main" onclick="startLesson('g3','eng','L83')">Suffixes</button><button class="btn btn-main" onclick="startLesson('g3','eng','L84')">Context Clues</button><button class="btn btn-main" onclick="startLesson('g3','eng','L85')">Multiple-Meaning Words</button><button class="btn btn-main" onclick="startLesson('g3','eng','L86')">Vocabulary Challenge</button>
</div>
<div class="lesson-column"><h3>Speaking and Listening</h3><p>Listen, discuss, and present ideas clearly.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L87')">Listening for Main Ideas</button><button class="btn btn-main" onclick="startLesson('g3','eng','L88')">Asking Questions</button><button class="btn btn-main" onclick="startLesson('g3','eng','L89')">Speaking Clearly</button><button class="btn btn-main" onclick="startLesson('g3','eng','L90')">Group Discussions</button><button class="btn btn-main" onclick="startLesson('g3','eng','L91')">Presentation Challenge</button>
</div>
<div class="lesson-column"><h3>Poetry and Fluency</h3><p>Read poems with rhythm, imagery, and expression.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L92')">Rhythm and Rhyme</button><button class="btn btn-main" onclick="startLesson('g3','eng','L93')">Poetic Imagery</button><button class="btn btn-main" onclick="startLesson('g3','eng','L94')">Reading with Expression</button><button class="btn btn-main" onclick="startLesson('g3','eng','L95')">Poem Structure</button><button class="btn btn-main" onclick="startLesson('g3','eng','L96')">Poetry Challenge</button>
</div>
<div class="lesson-column"><h3>Opinion and Informative Writing</h3><p>Support opinions and explain topics clearly.</p>
  <button class="btn btn-main" onclick="startLesson('g3','eng','L97')">Opinion Claims</button><button class="btn btn-main" onclick="startLesson('g3','eng','L98')">Reasons and Examples</button><button class="btn btn-main" onclick="startLesson('g3','eng','L99')">Informative Topics</button><button class="btn btn-main" onclick="startLesson('g3','eng','L100')">Facts and Definitions</button><button class="btn btn-main" onclick="startLesson('g3','eng','L101')">Writing Project Challenge</button>
</div>
<div class="lesson-column"><h3>Reading Comprehension</h3><p>Predict, infer, summarize, and compare.</p><button class="btn btn-main" onclick="startLesson('g3','eng','L102')">Making Predictions</button><button class="btn btn-main" onclick="startLesson('g3','eng','L103')">Drawing Inferences</button><button class="btn btn-main" onclick="startLesson('g3','eng','L104')">Summarizing Stories</button><button class="btn btn-main" onclick="startLesson('g3','eng','L105')">Comparing Characters</button><button class="btn btn-main" onclick="startLesson('g3','eng','L106')">Reading Challenge</button></div>
<div class="lesson-column"><h3>Language Conventions</h3><p>Edit nouns, verbs, punctuation, and contractions.</p><button class="btn btn-main" onclick="startLesson('g3','eng','L107')">Nouns and Pronouns</button><button class="btn btn-main" onclick="startLesson('g3','eng','L108')">Regular and Irregular Verbs</button><button class="btn btn-main" onclick="startLesson('g3','eng','L109')">Commas and Apostrophes</button><button class="btn btn-main" onclick="startLesson('g3','eng','L110')">Contractions</button><button class="btn btn-main" onclick="startLesson('g3','eng','L111')">Editing Challenge</button></div>

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

<div class="lesson-column">
  <h3>Operations: Step by Step</h3>
  <p>Start with addition and work toward two-step problems. Each lesson has 25 questions that build from practice to challenges.</p>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L17')">1. Addition Within 1,000</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L18')">2. Subtraction Within 1,000</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L19')">3. Multiplication: Groups to Problems</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L20')">4. Division: Sharing to Missing Numbers</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L21')">5. Two-Step Word Problems</button>
</div>

<div class="lesson-column">
  <h3>Fractions and Measurement</h3>
  <p>Build each skill from visual ideas to real-world challenges. Every lesson has 25 progressively harder questions.</p>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L22')">6. Fractions: Parts to Equivalence</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L23')">7. Area: Squares to Composite Shapes</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L24')">8. Perimeter: Sides to Missing Lengths</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L25')">9. Time: Clocks to Schedules</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L26')">10. Money: Coins to Multi-Step Problems</button>
</div>

<div class="lesson-column">
  <h3>Measurement, Data, and Reasoning</h3>
  <p>Apply Grade 3 math to measurements, graphs, shapes, patterns, and mixed problems.</p>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L27')">Measurement and Unit Conversions</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L28')">Data, Tables, and Graphs</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L29')">Geometry and Shape Attributes</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L30')">Multiplication and Division Patterns</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L31')">Mixed Multi-Step Problem Solving</button>
</div>

<div class="lesson-column">
  <h3>Fractions and Mathematical Thinking</h3>
  <p>Build fraction sense, use multiplication properties, and explain mathematical errors.</p>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L32')">Fractions on Number Lines</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L33')">Comparing Fractions</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L34')">Multiplication Properties</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L35')">Division and Unknown Factors</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L36')">Math Reasoning and Error Analysis</button>
</div>

<div class="lesson-column">
  <h3>Applied Math Practice</h3>
  <p>Estimate, measure, interpret data, and solve multi-step problems.</p>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L37')">Estimating and Checking Answers</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L38')">Weight, Capacity, and Length</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L39')">Fractions of Groups</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L40')">Interpreting Graphs and Data</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L41')">Multi-Step Real-World Challenges</button>
</div>

<div class="lesson-column">
  <h3>Reasoning with Everyday Math</h3>
  <p>Use time, arrays, shapes, fractions, and money to solve problems.</p>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L42')">Time and Elapsed Minutes</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L43')">Arrays and Missing Factors</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L44')">Area and Perimeter Decisions</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L45')">Fraction Models and Reasoning</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L46')">Planning Purchases and Change</button>
</div>

<div class="lesson-column">
  <h3>Patterns, Shapes, and Strategies</h3>
  <p>Practice multiplication, division, geometry, units, and mixed problems.</p>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L47')">Multiplication Facts and Patterns</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L48')">Division and Leftovers</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L49')">Classifying Shapes</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L50')">Measuring and Converting Units</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L51')">Choosing a Problem Strategy</button>
</div>

<div class="lesson-column">
  <h3>Apply and Explain Math</h3>
  <p>Connect facts, read data, reason with fractions, and solve real problems.</p>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L52')">Fact Families and Unknown Numbers</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L53')">Reading Tally Charts</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L54')">Fractions in Pictures and Groups</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L55')">Perimeter in Real Places</button>
  <button type="button" class="btn btn-main" onclick="startLesson('g3','math','L56')">Multi-Step Quantity Problems</button>
</div>

<div class="lesson-column"><h3>🧮 Groups and Sharing</h3><p>Count equal groups, then share supplies fairly.</p>
  <button class="btn btn-main" onclick="startLesson('g3','math','L57')">Multiplication with Classroom Supplies</button>
  <button class="btn btn-main" onclick="startLesson('g3','math','L58')">Division and Remainders</button>
</div>
<div class="lesson-column"><h3>🍕 Fractions and Shapes</h3><p>Show equal parts and measure around a shape.</p>
  <button class="btn btn-main" onclick="startLesson('g3','math','L59')">Fractions on Snack Trays</button>
  <button class="btn btn-main" onclick="startLesson('g3','math','L60')">Perimeter of Class Art</button>
</div>
<div class="lesson-column"><h3>⏰ Everyday Plans</h3><p>Plan time and count change for a small purchase.</p>
  <button class="btn btn-main" onclick="startLesson('g3','math','L61')">Elapsed Time in a School Day</button>
  <button class="btn btn-main" onclick="startLesson('g3','math','L62')">Money and Making Change</button>
</div>
<div class="lesson-column"><h3>📊 Numbers and Data</h3><p>Read class charts and understand larger numbers.</p>
  <button class="btn btn-main" onclick="startLesson('g3','math','L63')">Reading Bar Graphs</button>
  <button class="btn btn-main" onclick="startLesson('g3','math','L64')">Place Value to 10,000</button>
</div>
<div class="lesson-column"><h3>🏀 Build and Solve</h3><p>Solve two-step problems and measure tiled spaces.</p>
  <button class="btn btn-main" onclick="startLesson('g3','math','L65')">Two-Step Sports Problems</button>
  <button class="btn btn-main" onclick="startLesson('g3','math','L66')">Area with Tile Arrays</button>
</div>
<div class="lesson-column"><h3>Multiplication and Division</h3><p>Build facts and solve equal-group problems.</p>
  <button class="btn btn-main" onclick="startLesson('g3','math','L67')">Multiplication Facts</button><button class="btn btn-main" onclick="startLesson('g3','math','L68')">Arrays and Groups</button><button class="btn btn-main" onclick="startLesson('g3','math','L69')">Division Facts</button><button class="btn btn-main" onclick="startLesson('g3','math','L70')">Unknown Factors</button><button class="btn btn-main" onclick="startLesson('g3','math','L71')">Multiplication and Division Challenge</button>
</div>
<div class="lesson-column"><h3>Fractions and Measurement</h3><p>Compare fractions and solve measurement problems.</p>
  <button class="btn btn-main" onclick="startLesson('g3','math','L72')">Fractions on a Number Line</button><button class="btn btn-main" onclick="startLesson('g3','math','L73')">Equivalent Fractions</button><button class="btn btn-main" onclick="startLesson('g3','math','L74')">Comparing Fractions</button><button class="btn btn-main" onclick="startLesson('g3','math','L75')">Time and Length</button><button class="btn btn-main" onclick="startLesson('g3','math','L76')">Fraction Measurement Challenge</button>
</div>
<div class="lesson-column"><h3>Area and Perimeter</h3><p>Measure spaces and distances around shapes.</p>
  <button class="btn btn-main" onclick="startLesson('g3','math','L77')">Understanding Area</button><button class="btn btn-main" onclick="startLesson('g3','math','L78')">Area with Arrays</button><button class="btn btn-main" onclick="startLesson('g3','math','L79')">Understanding Perimeter</button><button class="btn btn-main" onclick="startLesson('g3','math','L80')">Missing Side Lengths</button><button class="btn btn-main" onclick="startLesson('g3','math','L81')">Area and Perimeter Challenge</button>
</div>
<div class="lesson-column"><h3>Data and Graphs</h3><p>Read displays and answer data questions.</p>
  <button class="btn btn-main" onclick="startLesson('g3','math','L82')">Picture Graphs</button><button class="btn btn-main" onclick="startLesson('g3','math','L83')">Bar Graphs</button><button class="btn btn-main" onclick="startLesson('g3','math','L84')">Line Plots</button><button class="btn btn-main" onclick="startLesson('g3','math','L85')">Data Questions</button><button class="btn btn-main" onclick="startLesson('g3','math','L86')">Data Challenge</button>
</div>
<div class="lesson-column"><h3>Place Value and Computation</h3><p>Read, round, add, and subtract large numbers.</p>
  <button class="btn btn-main" onclick="startLesson('g3','math','L87')">Place Value to 100,000</button><button class="btn btn-main" onclick="startLesson('g3','math','L88')">Rounding Numbers</button><button class="btn btn-main" onclick="startLesson('g3','math','L89')">Multi-Digit Addition</button><button class="btn btn-main" onclick="startLesson('g3','math','L90')">Multi-Digit Subtraction</button><button class="btn btn-main" onclick="startLesson('g3','math','L91')">Computation Challenge</button>
</div>
<div class="lesson-column"><h3>Geometry and Patterns</h3><p>Study shapes, symmetry, angles, and patterns.</p>
  <button class="btn btn-main" onclick="startLesson('g3','math','L92')">Classifying Shapes</button><button class="btn btn-main" onclick="startLesson('g3','math','L93')">Lines and Angles</button><button class="btn btn-main" onclick="startLesson('g3','math','L94')">Symmetry</button><button class="btn btn-main" onclick="startLesson('g3','math','L95')">Number Patterns</button><button class="btn btn-main" onclick="startLesson('g3','math','L96')">Geometry and Patterns Challenge</button>
</div>
<div class="lesson-column"><h3>Fractions and Equal Shares</h3><p>Build, compare, and apply fractions.</p>
  <button class="btn btn-main" onclick="startLesson('g3','math','L97')">Unit Fractions</button><button class="btn btn-main" onclick="startLesson('g3','math','L98')">Fractions of Sets</button><button class="btn btn-main" onclick="startLesson('g3','math','L99')">Equivalent Fractions</button><button class="btn btn-main" onclick="startLesson('g3','math','L100')">Whole Numbers as Fractions</button><button class="btn btn-main" onclick="startLesson('g3','math','L101')">Fraction Challenge</button>
</div>
<div class="lesson-column"><h3>Time, Money, and Problems</h3><p>Solve practical multistep problems.</p>
  <button class="btn btn-main" onclick="startLesson('g3','math','L102')">Elapsed Time</button><button class="btn btn-main" onclick="startLesson('g3','math','L103')">Counting Money</button><button class="btn btn-main" onclick="startLesson('g3','math','L104')">Making Change</button><button class="btn btn-main" onclick="startLesson('g3','math','L105')">Two-Step Problems</button><button class="btn btn-main" onclick="startLesson('g3','math','L106')">Real-World Math Challenge</button>
</div>
<div class="lesson-column"><h3>Multiplication and Division Strategies</h3><p>Use flexible fact and problem-solving strategies.</p><button class="btn btn-main" onclick="startLesson('g3','math','L107')">Skip Counting</button><button class="btn btn-main" onclick="startLesson('g3','math','L108')">Distributive Property</button><button class="btn btn-main" onclick="startLesson('g3','math','L109')">Related Facts</button><button class="btn btn-main" onclick="startLesson('g3','math','L110')">Remainders</button><button class="btn btn-main" onclick="startLesson('g3','math','L111')">Strategy Challenge</button></div>
<div class="lesson-column"><h3>Measurement and Geometry</h3><p>Measure objects and classify shapes.</p><button class="btn btn-main" onclick="startLesson('g3','math','L112')">Measuring Length</button><button class="btn btn-main" onclick="startLesson('g3','math','L113')">Mass and Capacity</button><button class="btn btn-main" onclick="startLesson('g3','math','L114')">Quadrilaterals</button><button class="btn btn-main" onclick="startLesson('g3','math','L115')">Partitioning Shapes</button><button class="btn btn-main" onclick="startLesson('g3','math','L116')">Measurement Challenge</button></div>

<!-- ESTIMATE SUMS -->

<!-- ESTIMATE DIFFERENCES -->

<!-- ADDITION: THREE DIGITS -->

<!-- SUBTRACTION: THREE DIGITS -->

<!-- FINANCIAL LITERACY -->

<!-- MIXED OPERATIONS -->

<!-- DIVISION WORD PROBLEMS -->

    <div class="lesson-column"><h3>Two Sums</h3><p>Each question has six choices. Check the two expressions with the target sum.</p><button type="button" class="btn btn-main" onclick="startUnifiedEarlyLesson('g3:math:format-checkboxes','g3-math')">Two Sums</button></div>

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

      <div class="lesson-column">
        <h3>Life and Physical Science</h3>
        <p>Explore living things, matter, Earth changes, and scientific evidence.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L4')">Life Cycles</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L5')">Plant Structures and Functions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L6')">States and Changes of Matter</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L7')">Earth Materials and Surface Changes</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L8')">Scientific Investigation</button>
      </div>

      <div class="lesson-column">
        <h3>Living Systems, Weather, and Energy</h3>
        <p>Connect ecosystems, adaptations, weather, water, light, and sound.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L9')">Ecosystems and Food Chains</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L10')">Animal Adaptations</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L11')">Weather Patterns and Forecasting</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L12')">The Water Cycle</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L13')">Light and Sound</button>
      </div>

      <div class="lesson-column">
        <h3>Science in the World</h3>
        <p>Use evidence to understand traits, Earth, forces, space, and design.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L14')">Plant and Animal Traits</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L15')">Soil, Rocks, and Fossils</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L16')">Magnets and Forces</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L17')">Earth, Sun, and Moon</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L18')">Designing and Testing Solutions</button>
      </div>

      <div class="lesson-column">
        <h3>Investigating Our World</h3>
        <p>Explore new plants, changing habitats, machines, heat, and data.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L19')">Flowers, Seeds, and New Plants</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L20')">Living Things in Changing Places</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L21')">Simple Machines at Work</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L22')">Heat and Changing Materials</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L23')">Reading Scientific Data</button>
      </div>

      <div class="lesson-column">
        <h3>Observe, Compare, and Test</h3>
        <p>Explore soil, weather, energy, animal senses, and fair tests.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L24')">Soil and Decomposers</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L25')">Weather and Water Data</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L26')">Light and Sound in Action</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L27')">Animal Senses and Survival</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L28')">Planning a Fair Test</button>
      </div>

      <div class="lesson-column">
        <h3>Explain and Investigate</h3>
        <p>Connect ecosystems, Earth, materials, plants, and design evidence.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L29')">Roles in an Ecosystem</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L30')">How Earth's Surface Changes</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L31')">Testing Material Properties</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L32')">Plant Parts Working Together</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L33')">Building and Improving Models</button>
      </div>

      <div class="lesson-column"><h3>🌱 Gardens and Habitats</h3><p>See how plants and animals meet their needs.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L34')">Plants in Our School Garden</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L35')">Animal Traits and Habitats</button>
      </div>
      <div class="lesson-column"><h3>🌦 Weather and Motion</h3><p>Read the weather and test how playground objects move.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L36')">Weather Tools and Forecasts</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L37')">Forces on the Playground</button>
      </div>
      <div class="lesson-column"><h3>🧪 Classroom and Pond Science</h3><p>Explore matter and follow energy through a pond.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L38')">Matter Around the Classroom</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L39')">Food Chains in a Pond</button>
      </div>
      <div class="lesson-column"><h3>🏔️ Earth, Light, and Sound</h3><p>Find clues in changing land, light, and sounds.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L40')">Earth’s Changing Surface</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L41')">Light, Sound, and Shadows</button>
      </div>
      <div class="lesson-column"><h3>🌙 Moon and Engineering</h3><p>Watch Moon patterns and test a bridge design.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L42')">The Moon’s Changing Patterns</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','sci','L43')">Build a Strong Paper Bridge</button>
      </div>
      <div class="lesson-column"><h3>Plants and Animals</h3><p>Explore life cycles, traits, and behaviors.</p>
        <button class="btn btn-main" onclick="startLesson('g3','sci','L44')">Plant Structures</button><button class="btn btn-main" onclick="startLesson('g3','sci','L45')">Animal Life Cycles</button><button class="btn btn-main" onclick="startLesson('g3','sci','L46')">Inherited Traits</button><button class="btn btn-main" onclick="startLesson('g3','sci','L47')">Learned Behaviors</button><button class="btn btn-main" onclick="startLesson('g3','sci','L48')">Living Things Challenge</button>
      </div>
      <div class="lesson-column"><h3>Earth and Space</h3><p>Observe materials, weather, shadows, and the Moon.</p>
        <button class="btn btn-main" onclick="startLesson('g3','sci','L49')">Earth Materials</button><button class="btn btn-main" onclick="startLesson('g3','sci','L50')">Weather Changes</button><button class="btn btn-main" onclick="startLesson('g3','sci','L51')">Sun and Shadows</button><button class="btn btn-main" onclick="startLesson('g3','sci','L52')">Moon Patterns</button><button class="btn btn-main" onclick="startLesson('g3','sci','L53')">Earth and Space Challenge</button>
      </div>
      <div class="lesson-column"><h3>Matter and Energy</h3><p>Explore states, heat, and light.</p>
        <button class="btn btn-main" onclick="startLesson('g3','sci','L54')">States of Matter</button><button class="btn btn-main" onclick="startLesson('g3','sci','L55')">Changes of State</button><button class="btn btn-main" onclick="startLesson('g3','sci','L56')">Heat Energy</button><button class="btn btn-main" onclick="startLesson('g3','sci','L57')">Light Energy</button><button class="btn btn-main" onclick="startLesson('g3','sci','L58')">Matter and Energy Challenge</button>
      </div>
      <div class="lesson-column"><h3>Habitats and Environment</h3><p>Follow food chains and protect habitats.</p>
        <button class="btn btn-main" onclick="startLesson('g3','sci','L59')">Habitat Needs</button><button class="btn btn-main" onclick="startLesson('g3','sci','L60')">Food Chains</button><button class="btn btn-main" onclick="startLesson('g3','sci','L61')">Environmental Change</button><button class="btn btn-main" onclick="startLesson('g3','sci','L62')">Conservation</button><button class="btn btn-main" onclick="startLesson('g3','sci','L63')">Habitat Challenge</button>
      </div>
      <div class="lesson-column"><h3>Forces and Engineering</h3><p>Test motion, magnets, and designs.</p>
        <button class="btn btn-main" onclick="startLesson('g3','sci','L64')">Pushes and Pulls</button><button class="btn btn-main" onclick="startLesson('g3','sci','L65')">Gravity and Friction</button><button class="btn btn-main" onclick="startLesson('g3','sci','L66')">Magnets</button><button class="btn btn-main" onclick="startLesson('g3','sci','L67')">Designing Solutions</button><button class="btn btn-main" onclick="startLesson('g3','sci','L68')">Engineering Challenge</button>
      </div>
      <div class="lesson-column"><h3>Weather and Water</h3><p>Measure weather and follow water through its cycle.</p>
        <button class="btn btn-main" onclick="startLesson('g3','sci','L69')">Weather Tools</button><button class="btn btn-main" onclick="startLesson('g3','sci','L70')">Clouds and Rain</button><button class="btn btn-main" onclick="startLesson('g3','sci','L71')">Water Cycle</button><button class="btn btn-main" onclick="startLesson('g3','sci','L72')">Severe Weather Safety</button><button class="btn btn-main" onclick="startLesson('g3','sci','L73')">Weather Investigation Challenge</button>
      </div>
      <div class="lesson-column"><h3>Life Cycles and Adaptations</h3><p>Explore how organisms grow and survive.</p>
        <button class="btn btn-main" onclick="startLesson('g3','sci','L74')">Plant Life Cycles</button><button class="btn btn-main" onclick="startLesson('g3','sci','L75')">Animal Life Cycles</button><button class="btn btn-main" onclick="startLesson('g3','sci','L76')">Structural Adaptations</button><button class="btn btn-main" onclick="startLesson('g3','sci','L77')">Behavioral Adaptations</button><button class="btn btn-main" onclick="startLesson('g3','sci','L78')">Life Science Challenge</button>
      </div>
      <div class="lesson-column"><h3>Earth Changes and Resources</h3><p>Study land changes, soil, and resources.</p>
        <button class="btn btn-main" onclick="startLesson('g3','sci','L79')">Slow Earth Changes</button><button class="btn btn-main" onclick="startLesson('g3','sci','L80')">Fast Earth Changes</button><button class="btn btn-main" onclick="startLesson('g3','sci','L81')">Soil and Rocks</button><button class="btn btn-main" onclick="startLesson('g3','sci','L82')">Natural Resources</button><button class="btn btn-main" onclick="startLesson('g3','sci','L83')">Earth Science Challenge</button>
      </div>
      <div class="lesson-column"><h3>Organisms and Ecosystems</h3><p>Connect traits, habitats, and food webs.</p><button class="btn btn-main" onclick="startLesson('g3','sci','L84')">Organism Needs</button><button class="btn btn-main" onclick="startLesson('g3','sci','L85')">Traits and Survival</button><button class="btn btn-main" onclick="startLesson('g3','sci','L86')">Food Webs</button><button class="btn btn-main" onclick="startLesson('g3','sci','L87')">Habitat Change</button><button class="btn btn-main" onclick="startLesson('g3','sci','L88')">Ecosystem Challenge</button></div>
      <div class="lesson-column"><h3>Motion and Energy</h3><p>Investigate forces, sound, and light.</p><button class="btn btn-main" onclick="startLesson('g3','sci','L89')">Describing Motion</button><button class="btn btn-main" onclick="startLesson('g3','sci','L90')">Force Strength</button><button class="btn btn-main" onclick="startLesson('g3','sci','L91')">Sound Vibrations</button><button class="btn btn-main" onclick="startLesson('g3','sci','L92')">Light and Materials</button><button class="btn btn-main" onclick="startLesson('g3','sci','L93')">Motion and Energy Challenge</button></div>
      <div class="lesson-column"><h3>Plants and Pollinators</h3><p>Investigate flowers, seeds, and relationships in a garden.</p><button class="btn btn-main" onclick="startLesson('g3','sci','L94')">Flower Parts and Jobs</button><button class="btn btn-main" onclick="startLesson('g3','sci','L95')">Pollinators at Work</button><button class="btn btn-main" onclick="startLesson('g3','sci','L96')">Seeds on the Move</button><button class="btn btn-main" onclick="startLesson('g3','sci','L97')">Growing Plants Fairly</button><button class="btn btn-main" onclick="startLesson('g3','sci','L98')">Garden Food Webs</button></div>
      <div class="lesson-column"><h3>Water, Soil, and Design</h3><p>Follow rainwater, protect soil, and test useful models.</p><button class="btn btn-main" onclick="startLesson('g3','sci','L99')">Rainfall and Runoff</button><button class="btn btn-main" onclick="startLesson('g3','sci','L100')">Soil and Water</button><button class="btn btn-main" onclick="startLesson('g3','sci','L101')">Slowing Erosion</button><button class="btn btn-main" onclick="startLesson('g3','sci','L102')">Weather Shelter Design</button><button class="btn btn-main" onclick="startLesson('g3','sci','L103')">Explaining Earth Models</button></div>

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
      <button type="button" class="btn btn-main" onclick="openGradeTyping()">Typing</button>
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
  <h3>Grammar and Writing</h3>
  <p>Choose precise words, build complete sentences, and punctuate advanced writing.</p>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L19')">
    Homophones
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L20')">
    Complete Sentences
  </button>

  <button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L21')">
    Punctuation
  </button>
</div>

<div class="lesson-column"><h3>Reading and Language</h3><p>Analyze texts and use language precisely.</p>
<button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L22')">Text Structures</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L23')">Drawing Inferences</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L24')">Summarizing Text</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L25')">Comparing Sources</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L26')">Figurative Language</button></div>
<div class="lesson-column"><h3>Writing and Research</h3><p>Strengthen grammar, arguments, and source use.</p>
<button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L27')">Greek and Latin Roots</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L28')">Relative Pronouns</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L29')">Consistent Verb Tense</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L30')">Opinion Writing</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L31')">Research and Citations</button></div>
<div class="lesson-column"><h3>Reading and Composition</h3><p>Connect close reading with clear, organized writing.</p><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L32')">Main Idea and Supporting Details</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L33')">Author Point of View</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L34')">Prefixes and Suffixes</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L35')">Complex Sentences</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L36')">Informative Writing</button></div>
<div class="lesson-column"><h3>Literature and Communication</h3><p>Interpret literature, edit writing, and present ideas clearly.</p><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L37')">Theme and Evidence</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L38')">Poetry Structure</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L39')">Dialogue and Description</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L40')">Editing Paragraphs</button><button type="button" class="btn btn-main" onclick="startLesson('g4','eng','L41')">Presentation and Speaking</button></div>

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

<div class="lesson-column"><h3>Operations and Fractions</h3><p>Solve larger problems and reason with fractions.</p>
<button type="button" class="btn btn-main" onclick="startLesson('g4','math','L21')">Multi-Digit Addition</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L22')">Multi-Digit Subtraction</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L23')">Multiplicative Comparisons</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L24')">Multi-Step Problems</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L25')">Equivalent Fractions</button></div>
<div class="lesson-column"><h3>Decimals, Data, and Geometry</h3><p>Apply number sense to measurement and shapes.</p>
<button type="button" class="btn btn-main" onclick="startLesson('g4','math','L26')">Adding Fractions</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L27')">Decimal Fractions</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L28')">Measurement Conversions</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L29')">Lines, Angles, and Symmetry</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L30')">Data and Line Plots</button></div>
<div class="lesson-column"><h3>Place Value and Shapes</h3><p>Extend whole-number operations and geometric reasoning.</p><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L31')">Place Value to One Million</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L32')">Rounding Whole Numbers</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L33')">Multiplying by Tens and Hundreds</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L34')">Area and Perimeter</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L35')">Classifying Shapes</button></div>
<div class="lesson-column"><h3>Division, Fractions, and Patterns</h3><p>Build flexible strategies for advanced Grade 4 problems.</p><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L36')">Division with Remainders</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L37')">Fraction Comparison</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L38')">Mixed Numbers</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L39')">Angle Measurement</button><button type="button" class="btn btn-main" onclick="startLesson('g4','math','L40')">Patterns and Rules</button></div>

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

      <div class="lesson-column"><h3>Living Systems and Earth</h3><p>Explain cycles, ecosystems, and changing land.</p>
      <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L29')">Plant and Animal Life Cycles</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L30')">Inherited and Learned Traits</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L31')">Food Webs and Ecosystems</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L32')">Ecosystem Change</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L33')">Weathering and Erosion</button></div>
      <div class="lesson-column"><h3>Energy and Investigation</h3><p>Build, test, measure, and explain evidence.</p>
      <button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L34')">Electricity and Circuits</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L35')">Energy Resources</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L36')">Waves and Communication</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L37')">Engineering Design</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L38')">Scientific Evidence</button></div>
      <div class="lesson-column"><h3>Matter, Motion, and Earth</h3><p>Study physical science and repeating Earth patterns.</p><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L39')">States and Properties of Matter</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L40')">Changes in Matter</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L41')">Forces and Motion</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L42')">Earth and Moon Patterns</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L43')">Water Cycle and Weather</button></div>
      <div class="lesson-column"><h3>Earth Materials and Organisms</h3><p>Connect structures, materials, waves, and forces.</p><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L44')">Rocks and Minerals</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L45')">Animal Structures and Survival</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L46')">Plant Structures and Functions</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L47')">Magnetism</button><button type="button" class="btn btn-main" onclick="startLesson('g4','sci','L48')">Sound and Light</button></div>

      <div class="lesson-column"><h3>Science Terms and Meanings</h3><p>Drag or tap each term and connect it to its meaning.</p><button type="button" class="btn btn-main" onclick="startUnifiedEarlyLesson('g4:sci:format-matching','g4-sci')">Science Terms and Meanings</button></div>


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
