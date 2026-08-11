(function(){
  class K12CoreSections extends HTMLElement {
    connectedCallback(){
      if(this.dataset.rendered === "true") return;
      this.dataset.rendered = "true";
      this.innerHTML = String.raw`
<!-- HOME -->
  <div id="home" class="section">
    <div class="lm-home">
      <section class="lm-home-hero">
        <div class="lm-home-copy"><span>LEARN &bull; GROW &bull; SUCCEED</span><h1>Big learning,<br>one calm step at a time.</h1><p>Short, focused lessons for every learner from Pre-K through Grade 10.</p><div><button type="button" class="lm-primary" onclick="show('grades')">Choose a grade</button><button type="button" class="lm-secondary" onclick="showReading()">Visit Reading</button></div></div>
        <aside class="lm-today-card"><span>TODAY'S GOAL</span><b>Complete one lesson</b><p>Every lesson has 25 questions and clear feedback.</p><button type="button" onclick="openLessonSearch()">Find a lesson</button></aside>
      </section>
      <section class="lm-home-paths" aria-labelledby="homeLaunchTitle"><header><span>START HERE</span><h2 id="homeLaunchTitle">Find your learning path</h2><p>Pick the group that feels right. You can change grades anytime.</p></header><div>
        <button type="button" data-zone="early" onclick="show('prek')"><span>PK-1</span><b>Early learners</b><small>Letters, sounds, numbers, and shapes</small></button>
        <button type="button" data-zone="elementary" onclick="show('grade2')"><span>2-5</span><b>Elementary</b><small>Build strong everyday skills</small></button>
        <button type="button" data-zone="middle" onclick="show('grade6')"><span>6-8</span><b>Middle school</b><small>Think deeper and practice independently</small></button>
        <button type="button" data-zone="high" onclick="show('grade9')"><span>9-10</span><b>High school</b><small>Advanced concepts and analysis</small></button>
      </div></section>
      <section class="lm-home-tools" aria-label="Learning tools"><button type="button" onclick="showReading()"><span>Reading</span><b>Read, listen, and respond</b></button><button type="button" onclick="show('analysis')"><span>Progress</span><b>See goals and growth</b></button><button type="button" class="is-coming" onclick="show('playground')"><span>Playground</span><b>Coming soon</b></button><button type="button" class="is-coming" aria-disabled="true" onclick="toast('Worksheets are coming soon!')"><span>Worksheets</span><b>Printable practice coming soon</b></button><button type="button" class="is-coming" aria-disabled="true" onclick="toast('Awards are coming soon!')"><span>Awards</span><b>Certificates and badges coming soon</b></button></section>
    </div>
  </div>

  <!-- PARENT PORTAL -->
  <div id="parentPortal" class="section d-none">
    <div class="parent-portal-shell">
      <div class="parent-portal-head">
        <span>Parent area</span>
        <h1>Subscription & learners</h1>
        <p>Manage the family learning space and review each learner.</p>
      </div>
      <div id="parentPortalContent"></div>
    </div>
  </div>

  <!-- ADMIN PORTAL -->
  <div id="adminPortal" class="section d-none">
    <div class="parent-portal-shell admin-portal-shell">
      <div class="parent-portal-head"><span>Authorized administrators only</span><h1>Administrator overview</h1><p>Account operations, privacy readiness, and curriculum review in one place.</p></div>
      <div id="adminPortalContent"></div>
    </div>
  </div>

  <!-- GRADES -->
  <div id="grades" class="section d-none grades-background">
    <div class="grade-library-v2">
      <header class="grade-library-head">
        <button type="button" onclick="show('home')">← Today</button>
        <div><span>GRADE LIBRARY</span><h1>Find your learning space.</h1><p>Every grade has its own subjects, lessons, progress, and quiz experience.</p></div>
        <aside><b>12</b><small>grade levels</small></aside>
      </header>

      <section class="suggested-lessons" aria-labelledby="suggestedLessonsTitle">
        <div class="suggested-lessons-head">
          <div>
            <span>Picked for you</span>
            <h2 id="suggestedLessonsTitle">Suggested lessons</h2>
          </div>
          <p>Based on lessons you have not completed yet.</p>
        </div>
        <div id="suggestedLessonsGrid" class="suggested-lessons-grid"></div>
      </section>

      <div class="grade-grid grade-library-grid" aria-label="Grade levels">
        <div class="grade-card" id="cardPrek">
          <div class="grade-title">🍎 Pre-K</div>
          <p class="grade-sub">Addition • Counting • Shapes</p>
          <button type="button" class="btn btn-main w-100" onclick="show('prek')">Open</button>
        </div>

        <div class="grade-card" id="cardKinder">
          <div class="grade-title">🧩 Kindergarten</div>
          <p class="grade-sub">Syllables • Build Word • Rhymes</p>
          <button type="button" class="btn btn-main w-100" onclick="show('kinder')">Open</button>
        </div>

        <div class="grade-card" id="cardGrade1">
          <div class="grade-title">➕ Grade 1</div>
          <p class="grade-sub">Add/Sub • Graphs • Money</p>
          <button type="button" class="btn btn-main w-100" onclick="show('grade1')">Open</button>
        </div>
<!-- ✅ NEW: Grade 2 -->
<div class="grade-card" id="cardGrade2">
  <div class="grade-title">📘 Grade 2</div>
  <p class="grade-sub">English • Math • Science</p>
  <button type="button" class="btn btn-main w-100" onclick="show('grade2')">Open</button>
</div>

<!-- ✅ NEW: Grade 3 -->
<div class="grade-card" id="cardGrade3">
  <div class="grade-title">📗 Grade 3</div>
  <p class="grade-sub">English • Math • Science</p>
  <button type="button" class="btn btn-main w-100" onclick="show('grade3')">Open</button>
</div>

<!-- ✅ NEW: Grade 4 -->
<div class="grade-card" id="cardGrade4">
  <div class="grade-title">📙 Grade 4</div>
  <p class="grade-sub">English • Math • Science</p>
  <button type="button" class="btn btn-main w-100" onclick="show('grade4')">Open</button>
</div>

<!-- ✅ NEW: Grade 5 -->
<div class="grade-card" id="cardGrade5">
  <div class="grade-title">📕 Grade 5</div>
  <p class="grade-sub">English • Math • Science</p>
  <button type="button" class="btn btn-main w-100" onclick="show('grade5')">Open</button>
</div>
<!-- ✅ NEW: Grade 6 -->
<div class="grade-card" id="cardGrade6">
  <div class="grade-title">📓 Grade 6</div>
  <p class="grade-sub">English • Math • Science</p>
  <button type="button" class="btn btn-main w-100" onclick="show('grade6')">Open</button>
</div>
<div class="grade-card" id="cardGrade7">
  <div class="grade-title">📝 Grade 7</div>
  <p class="grade-sub">English • Math • Science</p>
  <button type="button" class="btn btn-main w-100" onclick="show('grade7')">Open</button>
</div>
<div class="grade-card" id="cardGrade8">
  <div class="grade-title">📜 Grade 8</div>
  <p class="grade-sub">English • Math • Science</p>
  <button type="button" class="btn btn-main w-100" onclick="show('grade8')">Open</button>
</div>
<div class="grade-card" id="cardGrade9">
  <div class="grade-title">📔 Grade 9</div>
  <p class="grade-sub">English • Math • Science</p>
  <button type="button" class="btn btn-main w-100" onclick="show('grade9')">Open</button>
</div>
<div class="grade-card" id="cardGrade10">
  <div class="grade-title">🏫 Grade 10</div>
  <p class="grade-sub">English • Math • Science</p>
  <button type="button" class="btn btn-main w-100" onclick="show('grade10')">Open</button>
</div>
        <div class="grade-card" id="cardShop">
          <div class="grade-title">🧸 Shop</div>
          <p class="grade-sub">Spend <span class="learner-icon" role="img" aria-label="Learner"></span> Learners on toys</p>
          <button type="button" class="btn btn-main w-100" onclick="show('shop')">Go</button>
        </div>
        <div class="grade-card" id="cardPlayground">
          <div class="grade-title">Playground</div>
          <p class="grade-sub">Unlock toy games with 5 Learners</p>
          <button type="button" class="btn btn-main w-100" onclick="show('playground')">Unlock / Play</button>
        </div>
      </div>
    </div>
  </div>
<!-- =========================
   READING SECTION - NO JS
========================== -->

<div id="reading" class="section d-none">
  <div class="kid-font reading-box reading-workspace">
    <header class="reading-page-head">
      <span class="reading-page-icon" aria-hidden="true">📚</span>
      <div>
        <span class="reading-eyebrow">YOUR READING ADVENTURE</span>
        <h1>Pick a story. Learn something new.</h1>
        <p>Choose a grade, find a subject, and read at your own pace.</p>
      </div>
    </header>
    <div id="readingPanel"></div>
  </div>
</div>
<div id="reading-g5" class="reading-screen section">
  <div class="cardish text-center kid-font reading-box">
    <h1>Grade 5 Reading</h1>
    <p class="small-note">Choose a subject.</p>

    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <a class="btn btn-main" href="#reading-g5-eng">English</a>
      <a class="btn btn-main" href="#reading-g5-math">Math</a>
      <a class="btn btn-main" href="#reading-g5-sci">Science</a>
      <a class="btn btn-main" href="#reading-home">Back</a>
    </div>
  </div>
</div>
<div id="reading-g6" class="reading-screen section">
  <div class="cardish text-center kid-font reading-box">
    <h1>Grade 6 Reading</h1>
    <p class="small-note">Choose a subject.</p>

    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <a class="btn btn-main" href="#reading-g6-eng">English</a>
      <a class="btn btn-main" href="#reading-g6-math">Math</a>
      <a class="btn btn-main" href="#reading-g6-sci">Science</a>
      <a class="btn btn-main" href="#reading-home">Back</a>
    </div>
  </div>
</div>


<div id="reading-g6-eng" class="reading-screen section">
  <div class="cardish text-center kid-font reading-box">
    <h1>Grade 6 English Topics</h1>

    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <a class="btn btn-main" href="#read-main-idea">Main Idea</a>
      <a class="btn btn-main" href="#reading-g6">Back</a>
    </div>
  </div>
</div>

<div id="reading-g6-math" class="reading-screen section">
  <div class="cardish text-center kid-font reading-box">
    <h1>Grade 6 Math Topics</h1>

    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <a class="btn btn-main" href="#read-fractions">Fractions</a>
      <a class="btn btn-main" href="#reading-g6">Back</a>
    </div>
  </div>
</div>

<div id="reading-g6-sci" class="reading-screen section">
  <div class="cardish text-center kid-font reading-box">
    <h1>Grade 6 Science Topics</h1>

    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <a class="btn btn-main" href="#read-ecosystems">Ecosystems</a>
      <a class="btn btn-main" href="#reading-g6">Back</a>
    </div>
  </div>
</div>

<div id="read-main-idea" class="reading-screen section">
  <div class="cardish kid-font reading-box">
    <h1 class="text-center">💡 Main Idea</h1>

    <p>
      The main idea is what a passage is mostly about. It is the big point the author wants the reader to understand. Sometimes the main idea is stated clearly in one sentence. Other times, the reader must use clues from the whole passage.
    </p>

    <p>
      Supporting details are smaller pieces of information that explain the main idea. These details may include facts, examples, reasons, or descriptions. Good readers ask, “What do most of the details have in common?” to find the main idea.
    </p>

    <div class="text-center">
      <a class="btn btn-main" href="#reading-g6-eng">Back</a>
    </div>
  </div>
</div>

<div id="read-fractions" class="reading-screen section">
  <div class="cardish kid-font reading-box">
    <h1 class="text-center">➗ Fractions</h1>

    <p>
      A fraction shows part of a whole. The top number is called the numerator, and it tells how many parts are being counted. The bottom number is called the denominator, and it tells how many equal parts the whole is divided into.
    </p>

    <p>
      Fractions are used in everyday life. When you eat half of a pizza, measure ingredients, or divide something equally, you are using fractions. Understanding fractions helps students compare amounts and solve real-world math problems.
    </p>

    <div class="text-center">
      <a class="btn btn-main" href="#reading-g6-math">Back</a>
    </div>
  </div>
</div>

<div id="read-ecosystems" class="reading-screen section">
  <div class="cardish kid-font reading-box">
    <h1 class="text-center">🌱 Ecosystems</h1>

    <p>
      An ecosystem is made of living and nonliving things interacting in one area. Living things include plants, animals, fungi, and bacteria. Nonliving things include sunlight, water, air, rocks, and soil.
    </p>

    <p>
      Every organism in an ecosystem has a role. Producers make their own food, consumers eat other organisms, and decomposers break down dead material. These roles help energy move through the ecosystem and keep nature balanced.
    </p>

    <div class="text-center">
      <a class="btn btn-main" href="#reading-g6-sci">Back</a>
    </div>
  </div>
</div>
  <!-- SETTINGS -->
  <div id="settings" class="section d-none">
    <div class="cardish kid-font">
      <div id="settingsPanel"></div>
    </div>
  </div>

  <!-- ADD LEARNER -->
  <div id="addUserPage" class="section d-none">
    <div class="cardish kid-font">
      <div class="settings-head">
        <div>
          <h1>Add Learner</h1>
          <p class="small-note">Create one more learner profile, then finish the $5 account checkout.</p>
        </div>
      </div>

      <div id="addUserMsg" class="loginmsg mt-2"></div>

      <div class="settings-grid">
        <div class="settings-block">
          <h3>Learner Info</h3>
          <label class="settings-label" for="addUserName">Username</label>
          <input id="addUserName" class="form-control" autocomplete="off" placeholder="letters, numbers, underscore">

          <label class="settings-label" for="addUserDisplayName">Display name</label>
          <input id="addUserDisplayName" class="form-control" autocomplete="off" placeholder="name shown in the app">

          <label class="settings-label" for="addUserPass">Password</label>
          <input id="addUserPass" class="form-control" type="password" autocomplete="new-password" placeholder="4 or more characters">

          <div class="d-flex flex-wrap gap-2 mt-3">
            <button type="button" class="btn btn-main" id="addUserSubmitBtn" onclick="submitAddUserPage()">Continue to $5 checkout</button>
            <button type="button" class="btn btn-main" onclick="show('settings')">Back to settings</button>
          </div>
        </div>

        <div class="settings-block">
          <h3>Account Limit</h3>
          <p class="small-note">Learners: <span id="addUserCount">0</span> / 3</p>
          <p class="small-note" id="addUserPriceNote">Each extra learner account costs $5.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- ANALYSIS -->
  <div id="analysis" class="section d-none">
    <div class="cardish kid-font">
      <div id="analysisPanel"></div>
    </div>
  </div>

  <!-- SHOP -->
  <div id="shop" class="section d-none">
    <div class="cardish">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <h2 style="font-weight:900;font-family:'Baloo 2',cursive;margin:0;">Toy Shop</h2>
          <div class="small-note">Earn ⭐ points → convert to <span class="learner-icon" role="img" aria-label="Learner"></span> Learners → buy toys.</div>
          <div class="small-note" style="font-weight:900;">Shop opens with any active subject plan</div>
        </div>
        <div class="scorebar">
          <div class="badge-pill">⭐ Points: <span id="shopPoints">0</span></div>
          <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="shopLearners">0</span></div>
        </div>
      </div>

      <div class="mt-2 d-flex flex-wrap gap-2">
        <button type="button" class="btn btn-main" onclick="convertPoints()" id="convertBtn2">Convert 20⭐ → 5<span class="learner-icon" role="img" aria-label="Learner"></span></button>
        <button type="button" class="btn btn-main" onclick="show('playground')">Playground</button>
        <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
        <button type="button" class="btn btn-main" onclick="resetProgress()">Reset</button>
      </div>
      <div class="mt-3 small-note" id="ownedLine"></div>
      <div class="shop-grid" id="shopGrid"></div>

    </div>
  </div>

  <!-- PLAYGROUND -->
  <div id="playground" class="section d-none">
    <div class="playground-shell">
      <div id="playgroundPanel"><section class="lm-coming-soon"><span>COMING SOON</span><h1>Playground is being built.</h1><p>New reward games and creative activities are on the way. Lessons, Reading, and the Rewards Shop are still ready to use.</p><div><button type="button" class="lm-primary" onclick="show('grades')">Keep learning</button><button type="button" class="lm-secondary" onclick="show('shop')">Open rewards</button></div></section></div>
    </div>
  </div>

  <!-- PRE-K MENU (3 lessons) -->
`;
    }
  }

  customElements.define("k12-core-sections", K12CoreSections);
})();
