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

  window.openStaarTesting=function(){
    show("testPrep");
    requestAnimationFrame(()=>document.getElementById("staarPrepCard")?.scrollIntoView({block:"start"}));
  };
  function testingSection(){
    return `<div id="testPrep" class="section d-none"><div class="cardish test-prep-shell"><button type="button" class="tutor-finder-back" onclick="appBack('home')">&larr; Back</button><header><span>STANDARDIZED TESTING CENTER</span><h1>SAT, ACT, STAAR, and state testing</h1><p>This is a separate practice center for test strategy, pacing, and targeted review—not a Grade 11 or Grade 12 subject page.</p></header><div class="test-prep-grid"><article><span>SAT</span><h2>Reading, Writing &amp; Math</h2><ul><li>Evidence and vocabulary in context</li><li>Grammar and rhetorical synthesis</li><li>Algebra, data, geometry, and advanced Math</li></ul><button type="button" onclick="showReading()">Practice reading</button></article><article><span>ACT</span><h2>English, Math, Reading &amp; Science</h2><ul><li>Timed-section pacing</li><li>Concise editing and Math strategy</li><li>Data and experiment interpretation</li></ul><button type="button" onclick="show('grades')">Review subjects</button></article><article id="staarPrepCard"><span>STAAR</span><h2>Texas course and grade review</h2><ul><li>Reading-language arts evidence</li><li>Grade-level Mathematics</li><li>Science and social studies review</li></ul><button type="button" onclick="show('tutorFinder')">Find prep support</button></article><article><span>STATE TESTING</span><h2>Your state assessment</h2><ul><li>Review local standards and question types</li><li>Build a calm weekly practice routine</li><li>Check current dates and rules with your school</li></ul><button type="button" onclick="show('analysis')">Check learning levels</button></article></div><aside class="prep-note"><strong>Practice guidance</strong><p>Use your state education agency and each official testing program for current dates, timing, scoring, accommodations, and policies. LearnMaster activities are supplemental preparation.</p></aside></div></div>`;
  }

  const prepBanks={
    SAT:[['Which revision is most concise?',['Due to the fact that rain fell, the game stopped.','Because it rained, the game stopped.','Rain was falling and this was why the game stopped.'],1,'The second choice states the same idea clearly with fewer words.'],['If 3x + 5 = 20, what is x?',['3','5','15'],1,'Subtract 5, then divide 15 by 3.']],
    ACT:[['Which sentence uses punctuation correctly?',['After class we studied, math.','After class, we studied math.','After, class we studied math.'],1,'The introductory phrase is followed by a comma.'],['A table shows 12, 18, and 24. What is the mean?',['18','20','54'],0,'Add the values and divide 54 by 3.']],
    STAAR:[['Which detail best supports a main idea about teamwork?',['The room had blue walls.','Each student completed one part of the model.','The bell rang at noon.'],1,'That detail shows people sharing the work.'],['A plant receives less light each day. What should a fair test keep the same?',['The amount of water','The final height','The result'],0,'A fair test changes light while controlling water and other conditions.']],
    STATE:[['What should you do first when a question feels difficult?',['Guess immediately','Read the question again and mark key words','Skip the entire section'],1,'Rereading and identifying what is asked gives you a useful next step.'],['Which pacing plan is strongest?',['Spend all your time on one item','Answer carefully and leave time to review','Rush so you finish early'],1,'A steady pace protects accuracy and leaves review time.']]
  };
  function openPrepPractice(kind){
    const shell=document.querySelector('#testPrep .test-prep-shell'),bank=prepBanks[kind];
    if(!shell||!bank)return;
    let index=0,score=0;
    const render=()=>{const [question,choices,answer,reason]=bank[index];shell.innerHTML=`<button type="button" class="tutor-finder-back" id="prepBack">← Test Prep</button><section class="prep-practice"><span>${kind} MINI PRACTICE</span><h1>Question ${index+1} of ${bank.length}</h1><div class="prep-progress"><i style="width:${index/bank.length*100}%"></i></div><p>${question}</p><div class="prep-choices">${choices.map((choice,i)=>`<button data-prep-choice="${i}"><b>${String.fromCharCode(65+i)}</b>${choice}</button>`).join('')}</div><div id="prepReason" hidden></div></section>`;shell.querySelector('#prepBack').onclick=()=>{show('home');show('testPrep');setTimeout(enhanceTestPrep,0);};shell.querySelectorAll('[data-prep-choice]').forEach(button=>button.onclick=()=>{const chosen=Number(button.dataset.prepChoice);shell.querySelectorAll('[data-prep-choice]').forEach((item,i)=>{item.disabled=true;if(i===answer)item.classList.add('is-correct');else if(i===chosen)item.classList.add('is-wrong');});if(chosen===answer)score++;const result=shell.querySelector('#prepReason');result.hidden=false;result.innerHTML=`<strong>${chosen===answer?'Correct':'Review the answer'}</strong><p>${reason}</p><button id="prepNext">${index===bank.length-1?'See results':'Next question'}</button>`;shell.querySelector('#prepNext').onclick=()=>{index++;if(index<bank.length)render();else shell.innerHTML=`<section class="prep-practice prep-result"><span>PRACTICE COMPLETE</span><h1>${score} of ${bank.length} correct</h1><p>Review explanations, then try another practice set.</p><button onclick="show('home');show('testPrep');setTimeout(enhanceTestPrep,0)">Back to Test Prep</button></section>`;};});};render();
  }
  function enhanceTestPrep(){
    const shell=document.querySelector('#testPrep .test-prep-shell');if(!shell||shell.dataset.enhanced)return;shell.dataset.enhanced='true';
    shell.querySelector('header').insertAdjacentHTML('afterend','<div class="prep-strategy"><b>Use a simple plan:</b><span>Read the question</span><span>Eliminate weak choices</span><span>Prove the answer</span></div>');
    [...shell.querySelectorAll('.test-prep-grid article')].forEach((card,index)=>{const kind=['SAT','ACT','STAAR','STATE'][index];const button=card.querySelector('button');button.textContent=`Start ${kind==='STATE'?'state':kind} mini practice`;button.onclick=()=>openPrepPractice(kind);});
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
  setTimeout(enhanceTestPrep,0);
})();
