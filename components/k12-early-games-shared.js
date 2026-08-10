/* Shared helpers for Pre-K, Kindergarten, and Grade 1 lessons. */
function setChoiceButtons(prefix, choices){
  choices.forEach((choice, index)=>{
    const btn = $(prefix + index);
    if(btn) btn.textContent = typeof answerOptionLabel === "function" ? answerOptionLabel(choice) : choice;
  });
}

function padTextChoices(choices, fillers){
  const out = [...choices];
  fillers.forEach(filler=>{
    if(out.length < 4 && !out.includes(filler)) out.push(filler);
  });
  return out.slice(0,4).sort(()=>Math.random()-0.5);
}

function speakQuestionWithChoices(question, choices){
  speakGlobal(`${question} Choices: ${choices.join(", ")}.`);
}

function prepareSpecialLesson(sectionId){
  if(typeof restartUniversalLessonTimer==="function") restartUniversalLessonTimer();
  const section = $(sectionId);
  section?.querySelector(":scope > .cardish > .quiz-card")?.classList.remove("d-none");
  section?.querySelector(".special-complete-card")?.remove();
}

function finishSpecialLesson(sectionId, title, lessonId){
  if(typeof pauseUniversalLessonTimer==="function") pauseUniversalLessonTimer();
  const section = $(sectionId);
  const shell = section?.querySelector(":scope > .cardish");
  const question = shell?.querySelector(":scope > .quiz-card");
  if(!shell || !question) return;
  question.classList.add("d-none");
  shell.querySelector(".special-complete-card")?.remove();
  const done = document.createElement("div");
  done.className = "quiz-card special-complete-card lesson-complete-celebrate";
  done.innerHTML = `<img class="lesson-complete-medal" src="images/lesson-gold-medal.png" alt="Gold lesson medal"><div class="lesson-complete-kicker">Lesson complete</div><h2>${title}</h2><p>You finished every question and earned another lesson medal.</p>`;
  shell.appendChild(done);
  recordLearningStat("lesson", {title, lessonId:`special:${lessonId}`});
  safePlay($("rewardSfx"));
  launchConfetti(190);
  speakGlobal(`${title}. Lesson complete!`);
  setTimeout(()=>done.scrollIntoView({behavior:"smooth",block:"center"}),50);
}

window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
let earlyBankKey="", earlyBankBackId="grades", earlyBankRound=0, earlyBankAnswered=false;

function earlyBankRecord(){
  return window.K12_EARLY_BANKS[earlyBankKey];
}

function earlyBankChoices(question){
  const choices=[String(question.a),...(question.w||[]).map(String)];
  const shift=earlyBankRound%choices.length;
  return choices.slice(shift).concat(choices.slice(0,shift));
}

function earlyBankClearWork(){
  const work=$("earlyBankWork");
  if(work) work.value="";
}

function renderEarlyBankQuestion(){
  const record=earlyBankRecord();
  const question=record?.questions?.[earlyBankRound];
  if(!record||!question) return;
  earlyBankAnswered=false;
  $("earlyBankTitle").textContent=record.name;
  $("earlyBankProgress").textContent=`Question ${earlyBankRound+1} of ${record.questions.length}`;
  $("earlyBankQuestion").textContent=question.q;
  $("earlyBankFeedback").textContent="";
  earlyBankClearWork();
  $("earlyBankNext").disabled=true;
  const shell=$("earlyBankChoices");
  shell.innerHTML="";
  earlyBankChoices(question).forEach(choice=>{
    const button=document.createElement("button");
    button.type="button";
    button.className="choice-btn";
    button.textContent=typeof answerOptionLabel==="function"?answerOptionLabel(choice):choice;
    button.onclick=()=>earlyBankPick(choice);
    shell.appendChild(button);
  });
  speakQuestionWithChoices(question.q,earlyBankChoices(question));
}

function startEarlyBank(key,backId){
  const record=window.K12_EARLY_BANKS[key];
  if(!record||record.questions?.length!==25) throw new Error(`${key} must contain exactly 25 questions.`);
  if(typeof startUnifiedEarlyLesson==="function"){
    startUnifiedEarlyLesson(key,backId||"grades");
    return;
  }
  earlyBankKey=key;
  earlyBankBackId=backId||"grades";
  earlyBankRound=0;
  prepareSpecialLesson("early-bank");
  show("early-bank");
  renderEarlyBankQuestion();
}

function earlyBankPick(choice){
  if(earlyBankAnswered) return;
  const question=earlyBankRecord().questions[earlyBankRound];
  if(String(choice)===String(question.a)){
    earlyBankAnswered=true;
    $("earlyBankFeedback").textContent="Correct!";
    $("earlyBankNext").disabled=false;
    correctReward("Correct!");
  }else{
    const message=`Try again. Think carefully about ${question.q}`;
    $("earlyBankFeedback").textContent=message;
    wrongPenalty(message);
  }
}

function earlyBankNext(){
  if(!earlyBankAnswered) return;
  const record=earlyBankRecord();
  if(earlyBankRound<record.questions.length-1){
    earlyBankRound++;
    renderEarlyBankQuestion();
    return;
  }
  finishSpecialLesson("early-bank",record.name,earlyBankKey);
}

function earlyBankRestart(){
  if(!earlyBankKey) return;
  earlyBankRound=0;
  prepareSpecialLesson("early-bank");
  renderEarlyBankQuestion();
}

function earlyBankBack(){
  show(earlyBankBackId);
}
