(function(){
  class K12HistoryRunner extends HTMLElement {
    connectedCallback(){
      if(this.dataset.rendered === "true") return;
      this.dataset.rendered = "true";
      this.innerHTML = String.raw`
<!-- =========================
   HISTORY LESSON MENUS
========================== -->
<div id="g2-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 2 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','hist','L1')">Families and Communities</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','hist','L2')">Rules and Laws</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','hist','L3')">Maps and Places</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','hist','L4')">Important People</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','hist','L5')">Then and Now</button>
      </div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade2')">Back to Grade 2</button>
    </div>
  </div>
</div>

<div id="g3-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 3 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L1')">Communities</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L2')">Maps and Globes</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L3')">Local Leaders</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L4')">Timelines</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L5')">Needs and Wants</button>
      </div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade3')">Back to Grade 3</button>
    </div>
  </div>
</div>

<div id="g4-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 4 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L1')">Regions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L2')">State History</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L3')">Native Peoples</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L4')">Exploration</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L5')">Civic Responsibility</button>
      </div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade4')">Back to Grade 4</button>
    </div>
  </div>
</div>

<div id="g5-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 5 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L1')">Early America</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L2')">American Revolution</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L3')">Constitution</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L4')">Westward Expansion</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L5')">Civil War Basics</button>
      </div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade5')">Back to Grade 5</button>
    </div>
  </div>
</div>

<div id="g6-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 6 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g6','hist','L1')">Ancient Civilizations</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g6','hist','L2')">Mesopotamia</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g6','hist','L3')">Ancient Egypt</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g6','hist','L4')">Ancient Greece</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g6','hist','L5')">Ancient Rome</button>
      </div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade6')">Back to Grade 6</button>
    </div>
  </div>
</div>

<div id="g7-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 7 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','hist','L1')">World Religions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','hist','L2')">Medieval Europe</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','hist','L3')">Islamic Golden Age</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','hist','L4')">African Kingdoms</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','hist','L5')">Early Americas</button>
      </div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade7')">Back to Grade 7</button>
    </div>
  </div>
</div>

<div id="g8-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 8 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','hist','L1')">Colonial America</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','hist','L2')">Independence</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','hist','L3')">The Constitution</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','hist','L4')">Reform Movements</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','hist','L5')">Civil War and Reconstruction</button>
      </div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade8')">Back to Grade 8</button>
    </div>
  </div>
</div>

<div id="g9-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 9 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','hist','L1')">World Geography</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','hist','L2')">Ancient Trade Routes</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','hist','L3')">Revolutions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','hist','L4')">Industrialization</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','hist','L5')">Nationalism</button>
      </div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade9')">Back to Grade 9</button>
    </div>
  </div>
</div>

<div id="g10-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 10 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','hist','L1')">Modern World History</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','hist','L2')">Imperialism</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','hist','L3')">World War I</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','hist','L4')">World War II</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','hist','L5')">Cold War</button>
      </div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade10')">Back to Grade 10</button>
    </div>
  </div>
</div>

<!-- =========================
   UNIVERSAL LESSON RUNNER
========================== -->
<div id="lessonRunner" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1 id="lrTitle">Lesson</h1>

    <div class="scorebar">
      <div class="badge-pill">⭐ Points: <span id="lrPoints">0</span></div>
      <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="lrLearners">0</span></div>
    </div>

    <div class="quiz-card mt-2">
      <div class="small-note fw-bold" id="lrProg">Question 1 of 10</div>
      <img id="lrImage" class="lesson-img" alt="">
      <div style="font-size:26px;font-weight:900;margin-top:6px" id="lrQuestion">Question text…</div>

      <!-- NORMAL CHOICES -->
<div id="lrChoices"></div>

<div id="lessonExtra" class="lesson-type-box"></div>
<!-- ✅ DRAG & DROP AREA -->
<div id="lrDragArea" class="d-none">

  <!-- draggable words -->
  <div id="lrDragWords" class="drag-words"></div>

  <!-- drop targets -->
  <div id="lrDropZones" class="drop-zones"></div>

</div>

      <div class="d-flex justify-content-center mt-2 d-none" id="lrInputWrap">
        <input id="lrInput" type="text" class="form-control"
          style="max-width:260px;font-size:22px;font-weight:900;text-align:center;border-radius:16px;border:2px solid rgba(239,68,68,.60)"
          placeholder="Type answer">
      </div>

      <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
        <button type="button" class="btn btn-main" onclick="lrReplay()">🔊 Replay</button>
        <button type="button" class="btn btn-main" onclick="lrCheck()" id="lrCheckBtn">Check</button>
        <button type="button" class="btn btn-main" onclick="lrNext()" id="lrNextBtn" disabled>Next</button>
      </div>

      <div class="feedback" id="lrFb"></div>
    </div>

    <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
      <button type="button" class="btn btn-main" onclick="lrRestart()">Restart</button>
      <button type="button" class="btn btn-main" onclick="lrBack()">Back</button>
    </div>

    <div class="quiz-card mt-3 d-none" id="lrDone">
      <img class="lesson-complete-medal" src="images/lesson-gold-medal.png" alt="Gold star medal earned for completing the lesson">
      <div class="lesson-complete-kicker">Lesson complete</div>
      <h2 style="font-weight:900;">Great Job!</h2>
      <div class="stars" id="lrStars"></div>
      <p class="small-note" id="lrSummary"></p>
    </div>
  </div>
</div>
`;
    }
  }

  customElements.define("k12-history-runner", K12HistoryRunner);
})();
