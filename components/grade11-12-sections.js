(function(){
  class K12Grade1112Sections extends HTMLElement{
    connectedCallback(){
      if(this.dataset.rendered==="true") return;
      this.dataset.rendered="true";
      const gradePage=(number,focus)=>`
        <div id="grade${number}" class="section d-none">
          <div class="cardish senior-grade-shell">
            <button type="button" class="tutor-finder-back" onclick="appBack('grades')">&larr; Select Grade</button>
            <div class="senior-grade-head"><span>HIGH SCHOOL · GRADE ${number}</span><h1>${focus}</h1><p>Build independent reading, quantitative reasoning, college readiness, and test-taking confidence.</p></div>
            <div class="senior-path-grid">
              <button type="button" onclick="showReading()"><span>READING</span><b>Grade ${number} stories</b><small>Longer fiction and close-reading practice</small></button>
              <button type="button" onclick="show('analysis')"><span>PROGRESS</span><b>Level report</b><small>Reading, Math, goals, and college possibilities</small></button>
              <button type="button" onclick="show('testPrep')"><span>ASSESSMENTS</span><b>SAT, ACT &amp; STAAR prep</b><small>Strategies and focused practice plans</small></button>
              <button type="button" onclick="show('tutorFinder')"><span>SUPPORT</span><b>Community tutors</b><small>Find subject and test-prep help</small></button>
            </div>
          </div>
        </div>`;
      this.innerHTML=String.raw`
        ${gradePage(11,"Prepare for advanced coursework.")}
        ${gradePage(12,"Finish strong and plan what comes next.")}
        <div id="testPrep" class="section d-none">
          <div class="cardish test-prep-shell">
            <button type="button" class="tutor-finder-back" onclick="appBack('grades')">&larr; Back</button>
            <header><span>ASSESSMENT READINESS</span><h1>SAT, ACT, and STAAR prep</h1><p>Choose a test, build a weekly plan, and practice the skills that matter most.</p></header>
            <div class="test-prep-grid">
              <article><span>SAT</span><h2>Reading, Writing &amp; Math</h2><ul><li>Evidence and vocabulary in context</li><li>Grammar and rhetorical synthesis</li><li>Algebra, data, geometry, and advanced Math</li></ul><button type="button" onclick="showReading()">Practice reading</button></article>
              <article><span>ACT</span><h2>English, Math, Reading &amp; Science</h2><ul><li>Pacing across short timed sections</li><li>Concise editing and Math strategy</li><li>Data and experiment interpretation</li></ul><button type="button" onclick="show('grades')">Choose a grade</button></article>
              <article><span>STAAR</span><h2>Texas course and grade review</h2><ul><li>Reading-language arts evidence</li><li>Grade-level Mathematics</li><li>Science and social studies review</li></ul><button type="button" onclick="show('tutorFinder')">Find prep support</button></article>
            </div>
            <aside class="prep-note"><strong>Practice guidance</strong><p>Use official testing-program materials for current timing, scoring, dates, and policies. LearnMaster activities are supplemental preparation.</p></aside>
          </div>
        </div>`;
    }
  }
  customElements.define("k12-grade11-12-sections",K12Grade1112Sections);
})();
