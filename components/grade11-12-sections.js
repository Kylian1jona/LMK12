(function(){
  const SUBJECTS={
    eng:{label:"English",icon:"📖",description:"Literature, argument, research, and writing",lessons:[["L1","Literary Interpretation"],["L2","Argument & Research"]]},
    math:{label:"Math",icon:"📐",description:"Advanced algebra, functions, statistics, and modeling",lessons:[["L1","Functions & Modeling"],["L2","Statistics & Probability"]]},
    sci:{label:"Science",icon:"🔬",description:"Evidence, systems, energy, and scientific reasoning",lessons:[["L1","Scientific Systems"],["L2","Evidence & Investigation"]]},
    hist:{label:"History",icon:"🌍",description:"Government, economics, historical evidence, and change",lessons:[["L1","Government & Civic Life"],["L2","Historical Change & Evidence"]]}
  };

  function gradeMenu(number){
    return `<div id="grade${number}" class="section d-none"><div class="cardish text-center kid-font"><h1>${number===11?"📚":"🎓"} Grade ${number}</h1><p class="small-note">Choose a subject</p><div class="scorebar"><div class="badge-pill">⭐ Points: <span id="g${number}Points">0</span></div><div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="g${number}Learners">0</span></div></div><div class="d-flex justify-content-center gap-3 flex-wrap mt-3">${Object.entries(SUBJECTS).map(([id,subject])=>`<button type="button" class="btn btn-main" onclick="show('g${number}-${id}')">${subject.label}</button>`).join("")}<button type="button" class="btn btn-main" onclick="show('grades')">Back</button></div></div></div>`;
  }

  function subjectPage(number,id,subject){
    return `<div id="g${number}-${id}" class="section d-none"><div class="cardish text-center kid-font"><h1>${subject.icon} Grade ${number} ${subject.label}</h1><p class="small-note">${subject.description}.</p><div class="lesson-columns"><div class="lesson-column"><h3>${subject.icon} Core lessons</h3><p>Complete a full 25-question lesson.</p>${subject.lessons.map(([lesson,title])=>`<button type="button" class="btn btn-main" onclick="startLesson('g${number}','${id}','${lesson}')">${title}</button>`).join("")}</div><div class="lesson-column"><h3>Practice another way</h3><p>Read closely or review your current level.</p><button type="button" class="btn btn-main" onclick="openSeniorReading(${number})">Grade ${number} reading</button><button type="button" class="btn btn-main" onclick="show('analysis')">Progress report</button></div></div><div class="lesson-back-row"><button type="button" class="btn btn-main px-4" onclick="show('grade${number}')">Back to Grade ${number}</button></div></div></div>`;
  }

  function testingSection(){
    return `<div id="testPrep" class="section d-none"><div class="cardish test-prep-shell"><button type="button" class="tutor-finder-back" onclick="appBack('home')">&larr; Back</button><header><span>STANDARDIZED TESTING CENTER</span><h1>SAT, ACT, STAAR, and state testing</h1><p>This is a separate practice center for test strategy, pacing, and targeted review—not a Grade 11 or Grade 12 subject page.</p></header><div class="test-prep-grid"><article><span>SAT</span><h2>Reading, Writing &amp; Math</h2><ul><li>Evidence and vocabulary in context</li><li>Grammar and rhetorical synthesis</li><li>Algebra, data, geometry, and advanced Math</li></ul><button type="button" onclick="showReading()">Practice reading</button></article><article><span>ACT</span><h2>English, Math, Reading &amp; Science</h2><ul><li>Timed-section pacing</li><li>Concise editing and Math strategy</li><li>Data and experiment interpretation</li></ul><button type="button" onclick="show('grades')">Review subjects</button></article><article><span>STAAR</span><h2>Texas course and grade review</h2><ul><li>Reading-language arts evidence</li><li>Grade-level Mathematics</li><li>Science and social studies review</li></ul><button type="button" onclick="show('tutorFinder')">Find prep support</button></article><article><span>STATE TESTING</span><h2>Your state assessment</h2><ul><li>Review local standards and question types</li><li>Build a calm weekly practice routine</li><li>Check current dates and rules with your school</li></ul><button type="button" onclick="show('analysis')">Check learning levels</button></article></div><aside class="prep-note"><strong>Practice guidance</strong><p>Use your state education agency and each official testing program for current dates, timing, scoring, accommodations, and policies. LearnMaster activities are supplemental preparation.</p></aside></div></div>`;
  }

  class K12Grade1112Sections extends HTMLElement{
    connectedCallback(){
      if(this.dataset.rendered==="true") return;
      this.dataset.rendered="true";
      this.innerHTML=String.raw`${[11,12].map(number=>gradeMenu(number)+Object.entries(SUBJECTS).map(([id,subject])=>subjectPage(number,id,subject)).join("")).join("")}${testingSection()}`;
    }
  }
  window.openSeniorReading=function(number){ show("reading"); setTimeout(()=>renderReadingGrade(`g${number}`),0); };
  customElements.define("k12-grade11-12-sections",K12Grade1112Sections);
})();
