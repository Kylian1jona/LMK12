/* K12 lesson runner core
   Split from components/k12-lessons.js. Keep loaded as a classic script.
*/

/* =========================================================
   UNIVERSAL LESSON RUNNER (Grade 2–5 / Eng-Math-Sci)
   - Uses your points system (correctReward / wrongPenalty)
   - Uses your voice system (speakGlobal) with audio per question
========================================================= */

function speakQ(text,{force=false}={}){
  if(!text||(!voiceOn&&!force)) return false;
  return speakGlobal(String(text),{force});
}
let __lastQAudio = "";
function setQAudio(text){
  __lastQAudio = String(text || "");
  // Autoplay with small delay considered "safe" after user clicks
  speakQ(__lastQAudio);
}
function lrReplay(){
  safeClick();
  if(LR.current?.blend){
    if(!playBlendSequence(LR.current,{force:true})) toast("Read aloud is unavailable in this browser.");
    return;
  }
  if(__lastQAudio&&!speakQ(__lastQAudio,{force:true})) toast("Read aloud is unavailable in this browser.");
}

let BLEND_SEQUENCE_TOKEN = 0;
let BLEND_SEQUENCE_TIMER = null;

function cancelBlendSequence(cancelSpeech=false){
  BLEND_SEQUENCE_TOKEN++;
  clearTimeout(BLEND_SEQUENCE_TIMER);
  BLEND_SEQUENCE_TIMER = null;
  if(cancelSpeech){
    try{ speechSynthesis.cancel(); }catch(error){}
  }
}

function blendSpeechUtterance(text){
  const utterance = new SpeechSynthesisUtterance(String(text || ""));
  const preferredVoice = typeof getPreferredSpeechVoice === "function" ? getPreferredSpeechVoice() : null;
  if(preferredVoice) utterance.voice = preferredVoice;
  utterance.rate = 0.72;
  utterance.pitch = typeof voiceType !== "undefined" && voiceType === "male" ? 0.96 : 1;
  utterance.volume = 0.98;
  const language=typeof window.k12CurrentLanguage==="function"?window.k12CurrentLanguage():"en";
  utterance.lang = preferredVoice?.lang || ({es:"es-ES",fr:"fr-FR",zh:"zh-CN",hi:"hi-IN"}[language]||"en-US");
  return utterance;
}

function setBlendMeterStep(index,complete=false){
  const meter=document.querySelector("#lessonExtra .blend-meter");
  if(!meter) return;
  const letters=[...meter.querySelectorAll(".blend-letter")];
  const marker=meter.querySelector(".blend-meter-marker");
  letters.forEach((letter,letterIndex)=>{
    letter.classList.toggle("is-active",!complete&&letterIndex===index);
    letter.classList.toggle("is-blended",complete);
  });
  if(!marker) return;
  marker.classList.toggle("is-complete",complete);
  marker.style.width=complete ? "100%" : `${100/Math.max(1,letters.length)}%`;
  marker.style.transform=complete ? "translateX(0)" : `translateX(${Math.max(0,index)*100}%)`;
}

function renderBlendMeter(q){
  const extra=$("lessonExtra");
  const blend=q?.blend;
  if(!extra||!Array.isArray(blend?.letters)||blend.letters.length!==3) return;
  const meter=document.createElement("section");
  meter.className="blend-meter";
  meter.setAttribute("role","group");
  meter.setAttribute("aria-label",`Sound blending meter for ${blend.letters.join(" ")}`);

  const heading=document.createElement("div");
  heading.className="blend-meter-heading";
  heading.innerHTML='<span>Slide through each sound</span><button type="button" class="blend-replay-btn" aria-label="Replay the blending sounds">Replay sounds</button>';
  heading.querySelector("button").onclick=lrReplay;

  const letters=document.createElement("div");
  letters.className="blend-letters";
  blend.letters.forEach((value,index)=>{
    const letter=document.createElement("span");
    letter.className="blend-letter";
    letter.dataset.blendIndex=String(index);
    letter.textContent=String(value);
    letters.appendChild(letter);
  });

  const rail=document.createElement("div");
  rail.className="blend-meter-rail";
  rail.setAttribute("aria-hidden","true");
  const marker=document.createElement("span");
  marker.className="blend-meter-marker";
  rail.appendChild(marker);

  meter.append(heading,letters,rail);
  extra.appendChild(meter);
  setBlendMeterStep(0,false);
}

function playBlendSequence(q,{force=false}={}){
  const blend=q?.blend;
  if(!blend||!Array.isArray(blend.sounds)) return false;
  cancelBlendSequence(true);
  __lastQAudio=String(q.audio||q.q||"");
  setBlendMeterStep(0,false);
  if(typeof voiceOn!=="undefined"&&!voiceOn&&!force) return false;
  if(typeof speechSynthesis==="undefined"||typeof SpeechSynthesisUtterance==="undefined") return false;
  const token=BLEND_SEQUENCE_TOKEN;
  let soundIndex=0;
  const speakNext=()=>{
    if(token!==BLEND_SEQUENCE_TOKEN||LR.current!==q) return;
    if(soundIndex<blend.sounds.length){
      const currentIndex=soundIndex++;
      const utterance=blendSpeechUtterance(blend.sounds[currentIndex]);
      utterance.onstart=()=>setBlendMeterStep(currentIndex,false);
      let continued=false;
      const continueSequence=()=>{
        if(continued) return;
        continued=true;
        if(token!==BLEND_SEQUENCE_TOKEN) return;
        BLEND_SEQUENCE_TIMER=setTimeout(speakNext,180);
      };
      utterance.onend=continueSequence;
      utterance.onerror=continueSequence;
      speechSynthesis.speak(utterance);
      return;
    }
    setBlendMeterStep(0,true);
    const blendedWord=blendSpeechUtterance(`Blend them together: ${blend.word}. Which word did you make?`);
    speechSynthesis.speak(blendedWord);
  };
  BLEND_SEQUENCE_TIMER=setTimeout(speakNext,260);
  return true;
}

const LR = {
  grade:"",
  subj:"",
  lesson:"",
  title:"",
  image:null,
  total:25,
  round:1,
  score:0,
  phase:"lesson",
  revisionQueue:[],
  revisionTotal:0,
  revisionIndex:0,
  current:null, // {type, q, choices, answer}
  answered:false,
  answerCorrect:false,
  savedResponse:null,
  lastAnswer:"",
  questionHistory:[],
  historyIndex:-1,
  backSection:"grades"
};
let LR_WRONG_ADVANCE_TIMER = null;
let LR_CORRECT_ADVANCE_TIMER = null;
const LESSON_CHECKPOINT_VERSION = 1;

function lessonCheckpointKey(kidIdOverride=""){
  const kidId=kidIdOverride||(typeof getActiveKidId==="function" ? getActiveKidId() : "default");
  return `learnmaster_lesson_checkpoint_v${LESSON_CHECKPOINT_VERSION}_${kidId || "default"}`;
}

function currentQuestionSnapshot(){
  return {
    round:LR.round,
    phase:LR.phase,
    revisionIndex:LR.revisionIndex,
    current:cloneRevisionQuestion(LR.current),
    answered:LR.answered,
    answerCorrect:LR.answerCorrect,
    savedResponse:cloneRevisionQuestion(LR.savedResponse),
    lastAnswer:LR.lastAnswer
  };
}

function syncCurrentQuestionHistory(){
  if(!LR.current) return;
  const snapshot=currentQuestionSnapshot();
  if(LR.historyIndex<0){
    LR.questionHistory=[snapshot];
    LR.historyIndex=0;
  }else{
    LR.questionHistory[LR.historyIndex]=snapshot;
  }
}

function restoreQuestionSnapshot(snapshot){
  if(!snapshot?.current) return false;
  LR.round=Math.max(1,Number(snapshot.round)||1);
  LR.phase=snapshot.phase==="revision"?"revision":"lesson";
  LR.revisionIndex=Math.max(0,Number(snapshot.revisionIndex)||0);
  LR.current=cloneRevisionQuestion(snapshot.current);
  LR.answered=!!snapshot.answered;
  LR.answerCorrect=!!snapshot.answerCorrect;
  LR.savedResponse=cloneRevisionQuestion(snapshot.savedResponse);
  LR.lastAnswer=String(snapshot.lastAnswer||"");
  return true;
}

function appendCurrentQuestionHistory(){
  if(!LR.current) return;
  LR.questionHistory=LR.questionHistory.slice(0,LR.historyIndex+1);
  LR.questionHistory.push(currentQuestionSnapshot());
  LR.historyIndex=LR.questionHistory.length-1;
}

function saveLessonCheckpoint(){
  if(!LR.grade||!LR.subj||!LR.lesson||!LR.current) return;
  syncCurrentQuestionHistory();
  const checkpoint={
    version:LESSON_CHECKPOINT_VERSION,
    contentVersion:window.K12_CLASSIC_25_DATA?.[`${LR.grade}:${LR.subj}:${LR.lesson}`]?.contentVersion||null,
    grade:LR.grade,
    subj:LR.subj,
    lesson:LR.lesson,
    title:LR.title,
    total:LR.total,
    round:LR.round,
    score:LR.score,
    phase:LR.phase,
    revisionQueue:LR.revisionQueue,
    revisionTotal:LR.revisionTotal,
    revisionIndex:LR.revisionIndex,
    current:LR.current,
    answered:LR.answered,
    answerCorrect:LR.answerCorrect,
    savedResponse:LR.savedResponse,
    lastAnswer:LR.lastAnswer,
    questionHistory:LR.questionHistory,
    historyIndex:LR.historyIndex,
    backSection:LR.backSection,
    updatedAt:Date.now()
  };
  try{
    const key=lessonCheckpointKey(),value=JSON.stringify(checkpoint);
    window.localStorage?.setItem(key,value);
    window.learnMasterStore?.setItem(key,value);
  }catch(error){ console.warn("Lesson progress could not be saved.",error); }
}

function readLessonCheckpoint(grade,subj,lesson){
  try{
    const key=lessonCheckpointKey();
    const raw=window.learnMasterStore?.getItem(key)||window.localStorage?.getItem(key);
    const saved=raw?JSON.parse(raw):null;
    if(saved?.version!==LESSON_CHECKPOINT_VERSION||saved.grade!==grade||saved.subj!==subj||saved.lesson!==lesson||!saved.current) return null;
    const contentVersion=window.K12_CLASSIC_25_DATA?.[`${grade}:${subj}:${lesson}`]?.contentVersion||null;
    if((saved.contentVersion||null)!==contentVersion) return null;
    if(!Number.isInteger(saved.round)||saved.round<1||saved.round>Number(saved.total||25)) return null;
    return saved;
  }catch(error){ return null; }
}

function clearLessonCheckpoint(kidId=""){
  try{
    const key=lessonCheckpointKey(kidId);
    window.localStorage?.removeItem(key);
    window.learnMasterStore?.removeItem(key);
  }catch(error){}
}

function restoreLessonCheckpoint(saved){
  LR.total=Math.min(25,Math.max(1,Number(saved.total)||25));
  LR.round=Math.min(LR.total,Math.max(1,Number(saved.round)||1));
  LR.score=Math.max(0,Number(saved.score)||0);
  LR.phase=saved.phase==="revision"?"revision":"lesson";
  LR.revisionQueue=Array.isArray(saved.revisionQueue)?saved.revisionQueue:[];
  LR.revisionTotal=Math.max(0,Number(saved.revisionTotal)||0);
  LR.revisionIndex=Math.max(0,Number(saved.revisionIndex)||0);
  LR.current=saved.current;
  LR.answered=!!saved.answered;
  LR.answerCorrect=!!saved.answerCorrect;
  LR.savedResponse=saved.savedResponse??null;
  LR.lastAnswer=String(saved.lastAnswer||"");
  LR.questionHistory=Array.isArray(saved.questionHistory)&&saved.questionHistory.length?saved.questionHistory:[];
  const savedHistoryIndex=Number(saved.historyIndex);
  LR.historyIndex=Number.isInteger(savedHistoryIndex)?Math.min(LR.questionHistory.length-1,Math.max(0,savedHistoryIndex)):LR.questionHistory.length-1;
  if(!LR.questionHistory.length){
    LR.questionHistory=[currentQuestionSnapshot()];
    LR.historyIndex=0;
  }
  LR.backSection=saved.backSection||LR.backSection;
}

if(typeof window!=="undefined") window.addEventListener("pagehide",saveLessonCheckpoint);

function clearLessonAdvanceTimers(){
  cancelBlendSequence(true);
  clearTimeout(LR_WRONG_ADVANCE_TIMER);
  clearTimeout(LR_CORRECT_ADVANCE_TIMER);
  LR_WRONG_ADVANCE_TIMER = null;
  LR_CORRECT_ADVANCE_TIMER = null;
}

function lrAdvanceQuestion(){
  clearLessonAdvanceTimers();
  syncCurrentQuestionHistory();
  if(LR.historyIndex<LR.questionHistory.length-1){
    LR.historyIndex++;
    restoreQuestionSnapshot(LR.questionHistory[LR.historyIndex]);
    lrRender();
    saveLessonCheckpoint();
    return;
  }
  if(LR.phase === "revision"){
    if(LR.revisionQueue.length){
      lrLoadQuestion();
    }else{
      lrFinish();
    }
  }else if(LR.round < LR.total){
    LR.round++;
    lrLoadQuestion();
  }else if(LR.revisionQueue.length){
    LR.phase = "revision";
    LR.revisionTotal = LR.revisionQueue.length;
    LR.revisionIndex = 0;
    lrLoadQuestion();
  }else{
    lrFinish();
  }
}

function cloneRevisionQuestion(question){
  try{
    return typeof structuredClone === "function"
      ? structuredClone(question)
      : JSON.parse(JSON.stringify(question));
  }catch(error){
    return question;
  }
}

function queueRevisionQuestion(){
  if(LR.phase !== "lesson" || !LR.current || ["prek","k","g1"].includes(LR.grade)) return;
  LR.revisionQueue.push(cloneRevisionQuestion(LR.current));
}

function lessonCorrect(feedback, rewardMessage){
  if(LR.answered) return;
  const answeredQuestion=LR.current;
  LR.answered=true;
  LR.answerCorrect=true;
  if(LR.phase === "lesson"){
    LR.score++;
    correctReward(rewardMessage || feedback);
    $("lrFb").textContent = feedback;
  }else{
    $("lrFb").textContent = "Revision complete — this does not change your score.";
    if(typeof showCorrectFeedbackOverlay==="function") showCorrectFeedbackOverlay("Practice complete!");
  }
  $("lrNextBtn").disabled = true;
  saveLessonCheckpoint();
  clearTimeout(LR_CORRECT_ADVANCE_TIMER);
  let didAutoAdvance=false;
  LR_CORRECT_ADVANCE_TIMER=setTimeout(()=>{
    if(didAutoAdvance) return;
    didAutoAdvance=true;
    LR_CORRECT_ADVANCE_TIMER=null;
    if(LR.current!==answeredQuestion) return;
    if($("lessonRunner")?.classList.contains("d-none")) return;
    lrAdvanceQuestion();
  },2500);
}

function lrWrongMoveOn(feedback = "Not quite. Moving on.", penalty = "", delayMs = 2600){
  if(LR.answered) return;
  clearInterval(SPEED_TIMER);
  LR.answered=true;
  LR.answerCorrect=false;
  if(LR.phase === "lesson"){
    queueRevisionQuestion();
    $("lrFb").textContent = feedback;
    wrongPenalty(penalty || feedback);
  }else{
    $("lrFb").textContent = "Revision complete — review the correction and keep going. Your score stays the same.";
  }
  $("lrNextBtn").disabled = false;
  clearTimeout(LR_WRONG_ADVANCE_TIMER);
  highlightLessonAnswers(LR.current, LR.lastAnswer);
  showAnswerExplanation(LR.current, LR.lastAnswer);
  saveLessonCheckpoint();
}

/* ---------- Question helpers ---------- */
function shuffle(arr){ return [...arr].sort(()=>Math.random()-0.5); }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function fourChoices(answer, wrongs){
  const answerText = String(answer);
  const used = new Set([answerText]);
  const choices = [answerText];
  shuffle(wrongs || []).forEach(choice=>{
    const text = String(choice);
    if(text && !used.has(text) && choices.length < 4){
      used.add(text);
      choices.push(text);
    }
  });
  return shuffle(choices);
}

function preserveProvidedChoices(answer, providedChoices){
  const answerText=String(answer);
  const used=new Set();
  const choices=[];
  (providedChoices||[]).forEach(choice=>{
    const text=String(choice).trim();
    if(text&&!used.has(text)&&choices.length<5){
      used.add(text);
      choices.push(text);
    }
  });
  if(!used.has(answerText)) choices.unshift(answerText);
  return shuffle(choices.slice(0,5));
}

function setLessonChoiceLayout(container, question){
  if(!container) return;
  const count=Array.isArray(question?.choices) ? question.choices.length : 0;
  container.dataset.choiceCount=String(count);
  container.dataset.choiceStyle=question?.choiceStyle==="emoji" ? "emoji" : "standard";
  container.dataset.choiceLayout=count===3
    ? "two-one"
    : (count===5 ? "two-one-two" : "standard");
}

function mcQuestion(q, answer, wrongs, audioText){
  const answerText = String(answer);
  return { type:"mc", q, choices:fourChoices(answerText, wrongs), answer:answerText, audio: audioText || q };
}
function inputQuestion(q, answer, audioText){
  return { type:"input", q, answer:String(answer).trim().toLowerCase(), audio: audioText || q };
}



function imagePack(name, gen, src, alt){
  return { name, gen, image:{ src, alt:alt || name } };
}

function makeSelectAllQuestion(q, choices, answers, audio){
  return { type:"selectall", q, choices, answers, audio:audio || q };
}

function makeOrderQuestion(q, items, audio){
  return { type:"order", q, items, audio:audio || q };
}

function makeTrueFalseQuestion(q, answer, audio){
  return { type:"truefalse", q, answer, audio:audio || q };
}

function answerTextForFeedback(q){
  if(q.type === "selectall" && Array.isArray(q.answers)) return q.answers.join(", ");
  if(q.type === "ranking" && Array.isArray(q.items)) return q.items.join(", ");
  if(q.type === "order" && Array.isArray(q.items)) return q.items.join(", ");
  if(q.type === "category-sort" && Array.isArray(q.categories)) return q.categories.map(category=>`${category.name}: ${q.items.filter(item=>item.category===category.name).map(item=>item.text).join(", ")}`).join("; ");
  if((q.type === "drag" || q.type === "match") && Array.isArray(q.pairs)){
    return q.pairs.map(pair=>String(pair.word ?? pair.left ?? "") + " goes with " + String(pair.match ?? pair.right ?? "")).join("; ");
  }
  if(q.answer !== undefined) return String(q.answer);
  return "";
}

function wrongExplanation(q, userAnswer=""){
  if(q.explain) return String(q.explain);
  if(q.type === "drag"){
    return "Not quite. Red boxes show the mismatches. Match each item to the clue beside it.";
  }
  if(q.type === "match"){
    return `Not quite. Match cards that belong together. The correct pairs include ${answerTextForFeedback(q)}.`;
  }
  if(q.type === "selectall"){
    return `Not quite. The correct choices are ${answerTextForFeedback(q)}. Select only the choices that fit the question.`;
  }
  if(q.type === "order" || q.type === "ranking"){
    return `Not quite. The correct order is ${answerTextForFeedback(q)}. Check the sequence from first to last.`;
  }
  const answer = answerTextForFeedback(q);
  const picked = userAnswer ? ` You chose ${userAnswer}.` : "";
  return answer ? `Not quite.${picked} The correct answer is ${answer}. Reread the question and compare it with the answer.` : "Not quite. Review the correction, then try the next one.";
}

function explanationParagraphs(q, userAnswer=""){
  const question = String(q?.q || "this question").replace(/\s+/g, " ").trim();
  const correct = answerTextForFeedback(q) || "the corrected answer shown in green";
  const chosen = String(userAnswer || "No answer").trim();
  const supplied = q?.explain ? String(q.explain).trim() : "";
  const subject = SUBJECT_LABELS[LR.subj] || "this lesson";
  const first = `The question asked: “${question}” You answered “${chosen}.” That response is marked in red because it does not match what the question is asking for.`;
  const second = supplied
    ? `${supplied} The correct answer is “${correct},” which is highlighted in green so you can compare the two answers directly.`
    : `The correct answer is “${correct}.” It is highlighted in green. In ${subject}, the best answer must fit every important word or condition in the question, not just part of it.`;
  const third = `To solve a similar question next time, read the question once for the topic and again for the exact task. Then test each possible answer against the clue, rule, calculation, sequence, or relationship being assessed before making your choice.`;
  return [first, second, third];
}

function completedQuestionText(question, correct){
  if(/_{2,}|\bblank\b/i.test(question)) return question.replace(/_{2,}|\bblank\b/i, correct);
  return "";
}

function arithmeticExplanation(question, correct){
  const match = question.match(/(-?\d+(?:\.\d+)?)\s*([+x×*÷/−\-])\s*(-?\d+(?:\.\d+)?)/i);
  if(!match) return "";
  const operator = match[2].toLowerCase();
  const operation = operator === "+" ? "addition" : (operator === "-" || operator === "−") ? "subtraction" : (operator === "x" || operator === "×" || operator === "*") ? "multiplication" : "division";
  return `The calculation written in this question is ${match[0]}. Performing that ${operation} gives ${correct}, so ${correct} completes this exact problem.`;
}

function questionSpecificReason(q, question, correct, chosen){
  if(q?.explain) return String(q.explain).trim();
  const arithmetic = arithmeticExplanation(question, correct);
  if(arithmetic) return arithmetic;
  const completed = completedQuestionText(question, correct);
  if(completed) return `Putting “${correct}” into the blank makes the complete statement: “${completed}” That statement answers this question correctly, while “${chosen}” does not complete it correctly.`;
  if(q?.type === "selectall") return `Checking the choices one at a time leaves exactly these correct responses: ${correct}. Any selected choice outside that set makes the response incorrect.`;
  if(q?.type === "order") return `The prompt requires this sequence: ${correct}. Your answer changes that required order, so it cannot be accepted.`;
  if(q?.type === "drag" || q?.type === "match") return `For this exact question, the correct connections are ${correct}. The red connection joins items that do not describe one another.`;
  if(/spell|homophone|punctuat|apostrophe|comma|quotation|sentence|grammar|verb|noun|adjective|adverb/i.test(question)) return `“${correct}” is the choice that follows the spelling, word-use, or sentence rule named in this question. “${chosen}” breaks that rule or does not fit the sentence.`;
  if(/main idea|central idea|theme|evidence|detail|infer|summary|author|passage|text/i.test(question)) return `“${correct}” directly answers the reading clue in this prompt. “${chosen}” does not state the particular idea, evidence, detail, or conclusion the question requests.`;
  if(/fraction|place value|round|estimate|ratio|rate|equation|digit|area|perimeter|number|value|sum|difference|product|quotient/i.test(question)) return `The numbers and mathematical condition in this question produce “${correct}.” “${chosen}” represents a different value or operation, so it does not satisfy this problem’s exact directions.`;
  if(/plant|animal|habitat|force|energy|matter|weather|ecosystem|cell|earth|rock|water|organism|science/i.test(question)) return `“${correct}” accurately completes the scientific relationship or property named in this question. “${chosen}” describes something different from the property the prompt tests.`;
  if(/history|map|timeline|citizen|community|government|past|geography/i.test(question)) return `“${correct}” matches the specific history or social-studies idea named in this question. “${chosen}” refers to a different role, place, event, or tool.`;
  return `Reading the prompt with “${correct}” gives a direct response to the information it requests. Reading it with “${chosen}” does not satisfy the same wording or condition.`;
}

function questionSpecificStrategy(q, question, correct){
  if(arithmeticExplanation(question, correct)) return "For the next problem, copy the two numbers and operation sign, work that operation, and compare your result with the choices.";
  if(completedQuestionText(question, correct)) return "For another fill-in question, place each possible answer into the blank and read the complete statement. Choose the one that makes the whole statement accurate.";
  if(q?.type === "selectall") return "For another select-all question, judge every option as a separate true-or-false statement and select only those that independently answer the prompt.";
  if(q?.type === "order") return "For another ordering question, identify what must happen first, then use time, cause, or process clues to place the remaining items.";
  if(q?.type === "drag" || q?.type === "match") return "For another matching question, read each proposed pair in both directions and keep it only when the item and clue describe the same relationship.";
  return "For the next question, identify the exact words that say what to find. Read the prompt together with each choice and select the one that makes a complete, accurate response.";
}

function buildQuestionSpecificParagraphs(q, userAnswer=""){
  const question = String(q?.q || "this question").replace(/\s+/g, " ").trim();
  const correct = answerTextForFeedback(q) || "the corrected answer shown in green";
  const chosen = String(userAnswer || "No answer").trim();
  return [
    `This question asked: “${question}” You answered “${chosen}.” That answer is red because it does not satisfy this prompt; “${correct}” is green because it does.`,
    questionSpecificReason(q, question, correct, chosen),
    questionSpecificStrategy(q, question, correct)
  ];
}

function closeAnswerExplanation(){
  document.getElementById("answerExplanationScreen")?.remove();
}

function showAnswerExplanation(q, userAnswer=""){
  closeAnswerExplanation();
  const screen = document.createElement("div");
  screen.id = "answerExplanationScreen";
  screen.className = "answer-explanation-screen";
  screen.setAttribute("role", "dialog");
  screen.setAttribute("aria-modal", "true");
  screen.setAttribute("aria-labelledby", "answerExplanationTitle");
  const paragraphs = buildQuestionSpecificParagraphs(q, userAnswer);
  screen.innerHTML = `
    <div class="answer-explanation-card">
      <div class="answer-explanation-kicker">Let’s learn from this one</div>
      <h2 id="answerExplanationTitle">Question explanation</h2>
      <div class="answer-comparison" aria-label="Answer comparison">
        <div class="answer-comparison-wrong"><span>Your answer</span><strong>${htmlSafe(String(userAnswer || "No answer"))}</strong></div>
        <div class="answer-comparison-correct"><span>Correct answer</span><strong>${htmlSafe(answerTextForFeedback(q) || "See the corrected items")}</strong></div>
      </div>
      <div class="answer-explanation-copy">
        ${paragraphs.map(paragraph=>`<p>${htmlSafe(paragraph)}</p>`).join("")}
      </div>
      <button type="button" class="btn btn-main answer-explanation-continue">Continue</button>
    </div>`;
  screen.querySelector("button").addEventListener("click", ()=>{
    closeAnswerExplanation();
    lrAdvanceQuestion();
  });
  document.body.appendChild(screen);
  screen.querySelector("button").focus();
}

function highlightLessonAnswers(q, userAnswer=""){
  const correct = String(q?.answer ?? "");
  if(q?.type === "mc" || q?.type === "speed"){
    document.querySelectorAll("#lrChoices .choice-btn").forEach(button=>{
      const value = String(button.dataset.answerValue ?? button.textContent);
      button.disabled = true;
      button.classList.toggle("answer-correct", value === correct);
      button.classList.toggle("answer-wrong", value === String(userAnswer) && value !== correct);
    });
    return;
  }
  if(q?.type === "selectall"){
    const answers = new Set((q.answers || []).map(String));
    document.querySelectorAll("#lrChoices .selectall-card").forEach(label=>{
      const input = label.querySelector("input");
      input.disabled = true;
      label.classList.toggle("answer-correct", answers.has(input.value));
      label.classList.toggle("answer-wrong", input.checked && !answers.has(input.value));
    });
    return;
  }
  if(q?.type === "dropdown"){
    const select=document.querySelector("#lrChoices .lesson-dropdown");
    if(select){
      select.disabled=true;
      select.classList.toggle("answer-input-correct",select.value===correct);
      select.classList.toggle("answer-input-wrong",select.value!==correct);
    }
    return;
  }
  if(q?.type === "ranking"){
    document.querySelectorAll("#lrChoices .ranking-card").forEach((card,index)=>{
      card.classList.toggle("answer-correct",card.dataset.value===String(q.items[index]));
      card.classList.toggle("answer-wrong",card.dataset.value!==String(q.items[index]));
      card.draggable=false;
      card.querySelectorAll("button").forEach(button=>button.disabled=true);
    });
    return;
  }
  if(q?.type === "order"){
    document.querySelectorAll("#lrChoices .order-choice").forEach((button, index)=>{
      button.disabled = true;
      button.classList.toggle("answer-correct", String(button.dataset.value) === String(q.items?.[index]));
      button.classList.toggle("answer-wrong", button.classList.contains("picked") && String(button.dataset.value) !== String(q.items?.[index]));
    });
    return;
  }
  const input = $("lrInput");
  if(input && !$("lrInputWrap").classList.contains("d-none")){
    input.classList.add("answer-input-wrong");
    input.disabled = true;
  }
}

function showDragCorrections(q){
  const zones = document.querySelectorAll("#lrDropZones .drop-zone");
  zones.forEach(zone=>{
    const ok = zone.dataset.dropped === zone.dataset.answer;
    zone.classList.toggle("drop-zone-correct", ok);
    zone.classList.toggle("drop-zone-wrong", !ok);
    let correction = zone.querySelector(".drop-correction");
    if(!correction){
      correction = document.createElement("div");
      correction.className = "drop-correction";
      zone.appendChild(correction);
    }
    correction.textContent = ok ? "Correct" : `Correct: ${zone.dataset.answer || ""}`;
  });
  document.querySelectorAll("#lrDragWords .drag-item").forEach(item=>{
    item.draggable = false;
    item.classList.remove("picked");
  });
}

function lessonQuestionSpeech(q){
  const tx=value=>typeof window.k12Translate==="function"?window.k12Translate(String(value||"")):String(value||"");
  const list=values=>values.map(tx).join(", ");
  const parts = [tx(q.q || "")];
  if(q.audio && q.audio !== q.q) parts.push(tx(q.audio));
  if((q.type === "mc" || q.type === "speed") && Array.isArray(q.choices)){
    parts.push(tx("Choices") + ": " + list(q.choices) + ".");
  }
  if(q.type === "selectall" && Array.isArray(q.choices)){
    parts.push(tx("Choose all that apply") + ": " + list(q.choices) + ".");
  }
  if(q.type === "dropdown" && Array.isArray(q.choices)) parts.push(tx("Choose one option") + ": " + list(q.choices) + ".");
  if(q.type === "ranking" && Array.isArray(q.items)) parts.push(tx("Put these in order") + ": " + list(q.items) + ".");
  if(q.type === "order" && Array.isArray(q.items)){
    parts.push(tx("Put these in order") + ": " + list(q.items) + ".");
  }
  if(q.type === "category-sort" && Array.isArray(q.items)){
    parts.push(tx("Sort these cards") + ": " + list(q.items.map(item=>item.text)) + ".");
    parts.push(tx("Categories") + ": " + list(q.categories.map(item=>item.name)) + ".");
  }
  if(q.type === "drag" && Array.isArray(q.pairs)){
    const clues = q.pairs.map(pair=>String(pair.match ?? pair.right ?? ""));
    const items = q.pairs.map(pair=>String(pair.word ?? pair.left ?? ""));
    parts.push(tx("Items") + ": " + list(items) + ".");
    parts.push(tx("Clues") + ": " + list(clues) + ".");
  }
  if(q.type === "match" && Array.isArray(q.pairs)){
    const cards = q.pairs.flatMap(pair=>[String(pair.left ?? ""), String(pair.right ?? "")]).filter(Boolean);
    parts.push(tx("Match these cards") + ": " + list(cards) + ".");
  }
  return parts.filter(Boolean).join(" ");
}

const SUBJECT_LABELS = {
  eng:"English",
  math:"Math",
  alg1:"Algebra 1",
  sci:"Science",
  hist:"History"
};

function lessonImageSrc(image){
  return typeof image === "string" ? image : image?.src;
}

function answerOptionLabel(value){
  const text = String(value ?? "").trim();
  if(!/[A-Za-z]/.test(text)) return text;
  const letters = text.replace(/[^A-Za-z]/g, "");
  const upper = letters.replace(/[^A-Z]/g, "").length;
  const mostlyUpper = letters.length > 1 && upper / letters.length > 0.7;
  if(!mostlyUpper) return text.replace(/[A-Za-z]/, ch=>ch.toUpperCase());
  return text.toLowerCase().replace(/[A-Za-z]/, ch=>ch.toUpperCase());
}

function enforceUniqueLessonImages(){
  const used = new Set();
  Object.entries(CURR).forEach(([grade, subjects])=>{
    Object.entries(subjects || {}).forEach(([subj, lessons])=>{
      Object.entries(lessons || {}).forEach(([lessonId, pack])=>{
        if(!pack || typeof pack !== "object" || !pack.image) return;
        const src = lessonImageSrc(pack.image);
        if(!src) return;
        if(used.has(src)){
          console.warn("Duplicate lesson image removed", grade, subj, lessonId, src);
          delete pack.image;
          return;
        }
        used.add(src);
      });
    });
  });
}

function genericLessonQuestion(grade, subj, lesson, lessonName){
  const n = parseInt(String(lesson).replace(/\D/g, ""), 10) || 1;
  const round = Number(LR?.round || 1);
  const variant = (n + round) % 3;
  if(subj === "math"){
    if(variant === 0) return mcQuestion(`${lessonName}: what is ${n} + ${round}?`, String(n + round), [String(n + round + 1), String(Math.max(0, n + round - 1))], "Solve the math problem.");
    if(variant === 1) return inputQuestion(`${lessonName}: type ${n} times 2.`, String(n * 2), "Multiply by two.");
    return dragQuestion(`${lessonName}: match each math word.`, [
      { left:"sum", right:"answer to addition" },
      { left:"difference", right:"answer to subtraction" },
      { left:"product", right:"answer to multiplication" }
    ], "Match the math vocabulary.");
  }
  if(subj === "sci"){
    if(variant === 0) return mcQuestion(`${lessonName}: which one is living?`, "plant", ["rock", "pencil"], "Choose the living thing.");
    if(variant === 1) return inputQuestion(`${lessonName}: water can be solid, liquid, or ____.`, "gas", "Name the third state of water.");
    return dragQuestion(`${lessonName}: match each science word.`, [
      { left:"habitat", right:"where something lives" },
      { left:"force", right:"push or pull" },
      { left:"energy", right:"ability to do work" }
    ], "Match the science vocabulary.");
  }
  if(subj === "hist"){
    if(variant === 0) return mcQuestion(`${lessonName}: history studies people and events from the...`, "past", ["future", "weather"], "Choose the best history answer.");
    if(variant === 1) return inputQuestion(`${lessonName}: a map helps show where places are: type map.`, "map", "Type map.");
    return dragQuestion(`${lessonName}: match each social studies word.`, [
      { left:"community", right:"people living or working together" },
      { left:"timeline", right:"events in order" },
      { left:"citizen", right:"member of a community" }
    ], "Match the history vocabulary.");
  }
  if(variant === 0) return mcQuestion(`${lessonName}: which is a complete sentence?`, "The student reads.", ["reads student", "because the"], "Choose the complete sentence.");
  if(variant === 1) return inputQuestion(`${lessonName}: type the missing word: A noun names a person, place, or ____.`, "thing", "Complete the sentence.");
  return dragQuestion(`${lessonName}: match each reading word.`, [
    { left:"theme", right:"big message" },
    { left:"evidence", right:"proof from the text" },
    { left:"summary", right:"short retelling" }
  ], "Match the reading vocabulary.");
}

function makeFallbackLessonPack(grade, subj, lesson){
  const gradeNo = String(grade).replace("g", "");
  const subjectName = SUBJECT_LABELS[subj] || String(subj).toUpperCase();
  const lessonName = `Grade ${gradeNo} ${subjectName} ${lesson}`;
  return {
    name: lessonName,
    gen:()=>genericLessonQuestion(grade, subj, lesson, lessonName)
  };
}

function getLessonPack(grade, subj, lesson){
  const group = CURR[grade]?.[subj];
  if(!group) return null;
  if(!group[lesson]) group[lesson] = makeFallbackLessonPack(grade, subj, lesson);
  return group[lesson];
}

/* ---------- Start lesson ---------- */
function requireLessonSubjectAccess(subj){
  const hasSubscription=typeof subscriptionAccessAllowed==="function" && subscriptionAccessAllowed();
  const hasSubject=typeof subjectAllowed==="function" && subjectAllowed(subj);
  if(hasSubscription && hasSubject) return true;
  if(typeof showPaywall==="function") showPaywall(true);
  const message=hasSubscription
    ? "This subject is not included in your active plan."
    : (typeof subscriptionActionMessage==="function" ? subscriptionActionMessage() : "An active subscription is required for lessons.");
  toast(message);
  return false;
}

function launchLessonPack(grade, subj, lesson, pack, backSection){
  if(!requireLessonSubjectAccess(subj)) return;
  if(!pack){ toast("Lesson missing"); return; }
  const group=CURR?.[grade]?.[subj];
  if(!group){ toast("Lesson group missing"); return; }
  clearLessonAdvanceTimers();
  LR.grade = grade;
  LR.subj = subj;
  LR.lesson = lesson;
  LR.title = `${group.showName} — ${pack.name}`;
  LR.image = pack.image || null;
  LR.total = Math.min(25,Array.isArray(pack.questions)&&pack.questions.length?pack.questions.length:25);
  LR.round = 1;
  LR.score = 0;
  LR.phase = "lesson";
  LR.revisionQueue = [];
  LR.revisionTotal = 0;
  LR.revisionIndex = 0;
  LR.current = null;
  LR.answered = false;
  LR.answerCorrect = false;
  LR.savedResponse = null;
  LR.lastAnswer = "";
  LR.questionHistory = [];
  LR.historyIndex = -1;

  LR.backSection = backSection || `${grade}-${subj}`;
  const savedCheckpoint=readLessonCheckpoint(grade,subj,lesson);
  if(savedCheckpoint) restoreLessonCheckpoint(savedCheckpoint);

  $("lrDone").classList.add("d-none");
  $("lrQuestionCard")?.classList.remove("d-none");
  $("lrLessonActions")?.classList.remove("d-none");
  $("lrTitle").textContent = LR.title;
  window.K12LessonLikes?.open(`${grade}:${subj}:${lesson}`);
  const runner=$("lessonRunner");
  if(runner){
    const level=grade==="prek"||grade==="k"?0:Number(String(grade).replace("g",""));
    runner.dataset.gradeBand=level<=3?"early":"upper";
    runner.dataset.gradeLevel=String(level);
  }

  show("lessonRunner");
  if(savedCheckpoint) lrRender();
  else lrLoadQuestion();
}

async function startLesson(grade, subj, lesson){
  safeClick();
  if(!requireLessonSubjectAccess(subj)) return;
  try{
    if(!window.K12Classic25?.ensureGrade) throw new Error("The classic question bank loader is unavailable.");
    await window.K12Classic25.ensureGrade(grade);
  }catch(error){
    console.error("Could not load classic lesson questions",error);
    toast("The lesson questions could not be loaded. Please try again.");
    return;
  }
  launchLessonPack(grade,subj,lesson,getLessonPack(grade,subj,lesson),`${grade}-${subj}`);
}

function startUnifiedEarlyLesson(key,backSection){
  safeClick();
  const [gradeToken,subj,lessonToken]=key.split(":");
  if(!requireLessonSubjectAccess(subj)) return;
  const record=window.K12_EARLY_BANKS?.[key];
  if(!record||!Array.isArray(record.questions)||record.questions.length!==25){
    console.error("Invalid early-grade lesson bank",key,record);
    toast("This lesson is still loading. Please try again.");
    return;
  }
  const grade=gradeToken;
  const gradeLabel=grade==="prek"?"Pre-K":grade==="k"?"Kindergarten":`Grade ${String(grade).replace(/^g/,"")}`;
  if(!CURR[grade]) CURR[grade]={};
  if(!CURR[grade][subj]) CURR[grade][subj]={showName:`${gradeLabel} ${SUBJECT_LABELS[subj]||subj}`};
  const lesson=`EARLY_${lessonToken.replace(/[^a-z0-9]/gi,"_").toUpperCase()}`;
  const pack={name:record.name,questions:record.questions,image:record.image||null,generatorSource:"explicit-25"};
  pack.gen=()=>cloneRevisionQuestion(pack.questions[Math.max(0,Math.min(24,Number(LR.round||1)-1))]);
  CURR[grade][subj][lesson]=pack;
  launchLessonPack(grade,subj,lesson,pack,backSection||"grades");
}

/* ---------- Render runner ---------- */
function lrRender(){

  renderAllBadges();

  $("lrPoints").textContent = String(state.points);
  if($("lrLearners")) $("lrLearners").textContent = String(state.learners);

  $("lrProg").textContent = LR.phase === "revision"
    ? `Revision Question ${LR.revisionIndex} of ${LR.revisionTotal} · unscored`
    : `Question ${LR.round} of ${LR.total}`;
  $("lrFb").textContent = "";
  $("lrNextBtn").disabled = true;

  const q = LR.current;
  $("lrQuestion").textContent = q.q;

  const choicesWrap = $("lrChoices");
  const dragArea = $("lrDragArea");
  const dragWords = $("lrDragWords");
  const dropZones = $("lrDropZones");
  const inputWrap = $("lrInputWrap");

  // Reset everything
  choicesWrap.innerHTML = "";
  setLessonChoiceLayout(choicesWrap,q);
  dragWords.innerHTML = "";
  dropZones.innerHTML = "";
  $("lrInput").value = "";

  choicesWrap.classList.remove("d-none");
  dragArea.classList.add("d-none");
  inputWrap.classList.add("d-none");
  $("lrCheckBtn").classList.add("d-none");

  /* ================= MC ================= */
  if(q.type === "mc"){

    q.choices.forEach((c)=>{
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice-btn";
      b.textContent = answerOptionLabel(c);
      b.onclick = ()=> lrPick(c);
      choicesWrap.appendChild(b);
    });
  }

  /* ================= INPUT ================= */
  else if(q.type === "input"){
    inputWrap.classList.remove("d-none");
    $("lrCheckBtn").classList.remove("d-none");

    setTimeout(()=>{
      try{ $("lrInput").focus(); }catch(e){}
    },50);
  }

  /* ================= DRAG ================= */
  else if(q.type === "drag"){

    choicesWrap.classList.add("d-none");
    dragArea.classList.remove("d-none");
    $("lrCheckBtn").classList.remove("d-none");

    // Create draggable words
    shuffle(q.pairs.map(p=>p.word)).forEach(word=>{
      const el = document.createElement("div");
      el.className = "drag-item";
      el.draggable = true;
      el.textContent = word;

      el.addEventListener("dragstart", e=>{
        e.dataTransfer.setData("text", word);
      });

      dragWords.appendChild(el);
    });

    // Create drop zones
    q.pairs.forEach(pair=>{
      const zone = document.createElement("div");
      zone.className = "drop-zone";
      zone.dataset.answer = pair.word;

      zone.innerHTML = `
        <div>${pair.match}</div>
        <div class="drop-slot">Drop here</div>
      `;

      zone.addEventListener("dragover", e=>e.preventDefault());

      zone.addEventListener("drop", e=>{
        e.preventDefault();
        const val = e.dataTransfer.getData("text");
        zone.querySelector(".drop-slot").textContent = val;
        zone.dataset.dropped = val;
      });

      dropZones.appendChild(zone);
    });
  }

  setQAudio(lessonQuestionSpeech(q));
}
function lrPick(choice){
  safeClick();
  if(LR.answered) return;
  if(!$("lrNextBtn").disabled) return;

  const q = LR.current;
  LR.lastAnswer = String(choice);
  LR.savedResponse = String(choice);
  if(String(choice) === String(q.answer)){
    lessonCorrect("Correct!", "Correct!");
  }else{
    lrWrongMoveOn(wrongExplanation(q, choice));
  }
}

function lrCheck(){
  safeClick();

  const q = LR.current;

  /* ===== DRAG CHECK ===== */
  if(q.type === "drag"){
    const zones = document.querySelectorAll(".drop-zone");
    let correct = true;

    zones.forEach(zone=>{
      if(zone.dataset.dropped !== zone.dataset.answer){
        correct = false;
      }
    });

    if(correct){
      lessonCorrect("Correct!", "Great matching!");
    }else{
      showDragCorrections(q);
      lrWrongMoveOn(wrongExplanation(q), "Review the red corrections.", 4500);
    }
    return;
  }

  /* ===== INPUT CHECK ===== */
  const typed = String(($("lrInput").value || "")).trim().toLowerCase();
  if(!typed){
    $("lrFb").textContent = "Type an answer!";
    speakQ("Type an answer.");
    return;
  }

  if(typed === String(q.answer)){
    lessonCorrect("Correct!", "Correct!");
  }else{
    lrWrongMoveOn(wrongExplanation(q, typed));
  }
}

function lrLoadQuestion(){
  clearLessonAdvanceTimers();
  LR.answered=false;
  LR.answerCorrect=false;
  LR.savedResponse=null;
  LR.lastAnswer="";
  if(LR.phase === "revision"){
    LR.current = LR.revisionQueue.shift();
    LR.revisionIndex++;
    appendCurrentQuestionHistory();
    lrRender();
    saveLessonCheckpoint();
    return;
  }
  const pack = getLessonPack(LR.grade, LR.subj, LR.lesson);
  if(!pack) return;
  try{
    const q = typeof pack.gen === "function" ? pack.gen() : null;
    LR.current = normalizeLessonQuestion(q, pack);
  }catch(err){
    console.error("Lesson generator failed", LR.grade, LR.subj, LR.lesson, err);
    LR.current = fallbackLessonQuestion(pack);
  }
  appendCurrentQuestionHistory();
  lrRender();
  saveLessonCheckpoint();
}

function fallbackLessonQuestion(pack){
  return mcQuestion(
    `${pack?.name || "This lesson"}: choose the best practice answer.`,
    "Keep practicing",
    ["Skip the lesson", "Guess without reading"],
    "Keep practicing."
  );
}

const LESSON_PROMPT_LEAD=/^(?:(?:analyze this example|apply the lesson|check the key detail|choose the precise answer|use what you know|reason through this|study the evidence|solve this carefully|find the best-supported answer|review this case|connect the ideas|test your understanding|examine this new example|make the strongest choice|think one step further|use the relevant rule|evaluate each option|work from the information given|identify the accurate conclusion|focus on the central skill|select the defensible response|check your reasoning|consider the context|complete this challenge|demonstrate mastery|choose the best answer|select the correct answer|read carefully and answer|pick the best response|think about the lesson and answer|choose the correct response|look closely and answer|select the best response|answer this question)\s*:\s*)+/i;
const EARLY_PROMPT_LEAD=/^(?:(?:let's begin|look closely|your turn|think about this|try this one|show what you know|take a careful look|here is a new clue|use the skill you learned|choose with care|keep going|check each choice|listen and think|solve this step|you are doing well|try a fresh example|focus on the key detail|use your best thinking|look for the pattern|apply the idea|work this one out|pick the answer that fits|one more challenge|finish strong)\s*:\s*|ready for the next one\?\s*)+/i;
function removeLessonPromptLead(value){
  return String(value||"").replace(LESSON_PROMPT_LEAD,"").replace(EARLY_PROMPT_LEAD,"").trim();
}

function normalizeLessonQuestion(q, pack){
  if(!q || typeof q !== "object") return fallbackLessonQuestion(pack);
  if(!q.type) q.type = Array.isArray(q.choices) ? "mc" : "input";
  if(!q.q) q.q = `${pack?.name || "Lesson"} question`;
  q.q=removeLessonPromptLead(q.q);
  if(q.audio) q.audio=removeLessonPromptLead(q.audio);
  if(q.type === "mc"){
    if(!Array.isArray(q.choices) || !q.choices.length){
      q.answer = q.answer || "Correct";
      q.choices = fourChoices(q.answer, ["Try again", "Not this one"]);
    }
    if(q.answer === undefined || q.answer === null) q.answer = q.choices[0];
    q.answer = String(q.answer);
    const normalizedChoices = q.choices.map(choice=>String(choice));
    const isTrueFalse = normalizedChoices.length === 2
      && normalizedChoices.includes("True")
      && normalizedChoices.includes("False");
    q.choices = isTrueFalse
      ? ["True", "False"]
      : preserveProvidedChoices(q.answer, normalizedChoices);
  }
  if((q.type === "input" || q.type === "fill" || q.type === "edit") && (q.answer === undefined || q.answer === null)){
    q.answer = "";
  }
  if(q.type === "match"){
    if(!Array.isArray(q.pairs)) return fallbackLessonQuestion(pack);
    q.type = "drag";
  }
  if(q.type === "drag" && !Array.isArray(q.pairs)){
    const categories=q.categories;
    const options=q.options;
    const ids=new Set((categories||[]).map(category=>category.id));
    if(!Array.isArray(categories)||categories.length<3||!Array.isArray(options)||options.length<9||new Set(options.map(option=>option.id)).size!==options.length||options.some(option=>!ids.has(option.category)))return fallbackLessonQuestion(pack);
    const names=new Map(categories.map(category=>[category.id,category.label]));
    q={...q,type:"category-sort",categories:categories.map(category=>({name:category.label})),items:options.map(option=>({text:option.text,category:names.get(option.category)}))};
  }
  if(q.type === "speed"){
    if(!Array.isArray(q.choices) || !q.choices.length) q.choices = fourChoices(q.answer || "Correct", ["Try again", "Not this one"]);
    if(q.answer === undefined || q.answer === null) q.answer = q.choices[0];
    q.answer = String(q.answer);
    const normalizedChoices = q.choices.map(choice=>String(choice));
    const isTrueFalse = normalizedChoices.length === 2
      && normalizedChoices.includes("True")
      && normalizedChoices.includes("False");
    q.choices = isTrueFalse
      ? ["True", "False"]
      : preserveProvidedChoices(q.answer, normalizedChoices);
  }
  if(q.type === "truefalse"){
    q.choices = ["True", "False"];
    q.answer = q.answer ? "True" : "False";
    q.type = "mc";
  }
  if(q.type === "selectall"){
    if(!Array.isArray(q.choices) || !Array.isArray(q.answers)) return fallbackLessonQuestion(pack);
  }
  if(q.type === "dropdown"){
    if(!Array.isArray(q.choices)||q.choices.length<3||!q.choices.map(String).includes(String(q.answer)))return fallbackLessonQuestion(pack);
  }
  if(q.type === "ranking"){
    if(!Array.isArray(q.items)||q.items.length<3||new Set(q.items.map(String)).size!==q.items.length)return fallbackLessonQuestion(pack);
  }
  if(q.type === "order"){
    if(!Array.isArray(q.items) || q.items.length < 2) return fallbackLessonQuestion(pack);
  }
  if(q.type === "category-sort"){
    if(!Array.isArray(q.categories)||q.categories.length<3||!Array.isArray(q.items)||q.items.length<9||q.items.some(item=>!q.categories.some(category=>category.name===item.category))) return fallbackLessonQuestion(pack);
  }
  return q;
}

function lrNext(){
  safeClick();
  if($("lrNextBtn").disabled) return;
  lrAdvanceQuestion();
}
function lrPrevious(){
  safeClick();
  if(LR.historyIndex<=0) return;
  clearLessonAdvanceTimers();
  syncCurrentQuestionHistory();
  LR.historyIndex--;
  if(!restoreQuestionSnapshot(LR.questionHistory[LR.historyIndex])) return;
  lrRender();
  saveLessonCheckpoint();
}
function lrFinish(){
  clearLessonAdvanceTimers();
  clearLessonCheckpoint();
  if(typeof pauseUniversalLessonTimer==="function") pauseUniversalLessonTimer();
  $("lrQuestionCard")?.classList.add("d-none");
  $("lrDone").classList.remove("d-none");
  $("lrDone").classList.remove("lesson-complete-celebrate");
  void $("lrDone").offsetWidth;
  $("lrDone").classList.add("lesson-complete-celebrate");
  const percent = Math.round((LR.score/LR.total)*100);
  const stars = clamp(Math.round((LR.score/LR.total)*5), 1, 5);
  let verdict = "You kept going and finished every question — that is real progress. Review the tricky ideas, then try again and watch your score grow.";
  if(percent >= 90){
    verdict = "Outstanding work! You showed excellent understanding and handled the lesson with confidence. Keep challenging yourself — you are ready for what comes next.";
  }else if(percent >= 75){
    verdict = "Great job! You understand most of the lesson and worked through every revision question. A little more practice will make these skills even stronger.";
  }else if(percent >= 60){
    verdict = "Good effort! You have a solid start, and the revision questions helped you revisit the toughest parts. Keep practicing — each attempt builds your confidence.";
  }
  $("lrStars").textContent = "⭐".repeat(stars);
  $("lrSummary").innerHTML = `
    <span class="lesson-result-percent">${percent}%</span>
    <strong>${LR.score} of ${LR.total} scored questions correct</strong>
    <span>${verdict}</span>
    <small>Revision questions were practice only and did not change this result.</small>`;
  recordLearningStat("lesson", { title:LR.title });
  const medals=typeof ensureStats==="function"?(Number(ensureStats().medalsEarned)||1):1;
  if($("lrMedalCount")) $("lrMedalCount").textContent=`${medals} medal${medals===1?"":"s"} earned`;
  launchConfetti(200);
  speakQ("Great job! You finished the lesson!");
}
function lrRestart(){
  safeClick();
  clearLessonCheckpoint();
  if(typeof restartUniversalLessonTimer==="function") restartUniversalLessonTimer();
  clearLessonAdvanceTimers();
  $("lrDone").classList.add("d-none");
  $("lrDone").classList.remove("lesson-complete-celebrate");
  $("lrQuestionCard")?.classList.remove("d-none");
  $("lrLessonActions")?.classList.remove("d-none");
  LR.round = 1;
  LR.score = 0;
  LR.phase = "lesson";
  LR.revisionQueue = [];
  LR.revisionTotal = 0;
  LR.revisionIndex = 0;
  LR.answered = false;
  LR.answerCorrect = false;
  LR.savedResponse = null;
  LR.lastAnswer = "";
  LR.questionHistory = [];
  LR.historyIndex = -1;
  lrLoadQuestion();
}
function lrBack(){
  safeClick();
  saveLessonCheckpoint();
  clearLessonAdvanceTimers();
  if(typeof hideCorrectFeedbackOverlay==="function") hideCorrectFeedbackOverlay();
  if(typeof appBack==="function") appBack(LR.backSection || "grades");
  else show(LR.backSection || "grades");
}
function cleanAnswer(x){
  return String(x)
    .toLowerCase()
    .replace(/[“”]/g,'"')
    .replace(/[‘’]/g,"'")
    .replace(/[?.!,]/g,"")
    .replace(/\s+/g," ")
    .trim();
}

function fillBlankQuestion(sentence, answer, hint){
  return {
    type:"fill",
    q:sentence,
    answer:answer,
    placeholder:"Fill in the blank",
    audio:hint || sentence
  };
}

function editSentenceQuestion(bad, good){
  return {
    type:"edit",
    q:`Fix this sentence:\n${bad}`,
    answer:good,
    placeholder:"Type the corrected sentence",
    audio:"Fix the sentence."
  };
}

function speedQuestion(q, answer, wrongs, seconds){
  const answerText = String(answer);
  return {
    type:"speed",
    q:q,
    answer:answerText,
    choices:fourChoices(answerText, wrongs),
    seconds:seconds || 10,
    audio:q
  };
}

function matchQuestion(pairs){
  return {
    type:"drag",
    q:"Drag each word to the correct answer.",
    pairs:pairs,
    audio:"Drag the pairs to match them."
  };
}

let MATCH_PICK = null;
let SPEED_TIMER = null;
let SPEED_LEFT = 10;

function renderLessonImage(image){
  const img = $("lrImage");
  const frame = $("lrImageFrame");
  if(!img) return;
  const src = typeof image === "string" ? image : image?.src;
  if(!src){
    img.style.display = "none";
    frame?.classList.add("d-none");
    img.removeAttribute?.("src");
    img.alt = "";
    return;
  }
  frame?.classList.remove("d-none");
  if(frame) frame.hidden = false;
  img.hidden = false;
  img.style.removeProperty("display");
  img.src = src;
  img.alt = image?.alt || "Lesson image";
  img.style.display = "block";
}

function restoreSavedAnswerView(){
  if(!LR.answered||!LR.current) return;
  const q=LR.current,response=LR.savedResponse;
  clearInterval(SPEED_TIMER);
  if(q.type==="input"||q.type==="fill"||q.type==="edit"){
    const input=$("lrInput");
    if(input){
      input.value=String(response??LR.lastAnswer??"");
      input.disabled=true;
      input.classList.toggle("answer-input-wrong",!LR.answerCorrect);
      input.classList.toggle("answer-input-correct",LR.answerCorrect);
    }
  }else if(q.type==="selectall"&&Array.isArray(response)){
    const selected=new Set(response.map(String));
    document.querySelectorAll("#lrChoices .selectall-choice").forEach(input=>{ input.checked=selected.has(input.value); });
    highlightLessonAnswers(q,LR.lastAnswer);
  }else if(q.type==="dropdown"){
    const select=document.querySelector("#lrChoices .lesson-dropdown");
    if(select)select.value=String(response??"");
    highlightLessonAnswers(q,LR.lastAnswer);
  }else if(q.type==="ranking"&&Array.isArray(response)){
    const list=document.querySelector("#lrChoices .ranking-list");
    if(list){
      const cards=[...list.querySelectorAll(".ranking-card")];
      response.forEach(value=>{const card=cards.find(item=>item.dataset.value===String(value));if(card)list.appendChild(card);});
    }
    highlightLessonAnswers(q,LR.lastAnswer);
  }else if(q.type==="order"&&Array.isArray(response)){
    document.querySelectorAll("#lrChoices .order-choice").forEach(button=>{
      const position=response.map(String).indexOf(String(button.dataset.value));
      button.disabled=true;
      if(position>=0){
        button.classList.add("picked");
        button.textContent=`${position+1}. ${button.dataset.value}`;
        button.classList.toggle("answer-correct",String(q.items?.[position])===String(button.dataset.value));
        button.classList.toggle("answer-wrong",String(q.items?.[position])!==String(button.dataset.value));
      }
    });
  }else if(q.type==="drag"&&Array.isArray(response)){
    response.forEach(saved=>{
      const zone=[...document.querySelectorAll("#lrDropZones .drop-zone")].find(item=>item.dataset.answer===String(saved.answer));
      if(zone&&saved.dropped){ zone.dataset.dropped=String(saved.dropped); zone.querySelector(".drop-slot").textContent=String(saved.dropped); }
    });
    showDragCorrections(q);
  }else if(q.type==="category-sort"&&response&&typeof response==="object"){
    window.K12CategorySort?.restore(q,response);
  }else if(q.type==="atom-build"&&response&&typeof response==="object"){
    ATOM_BUILD_COUNTS={...response};
    ATOM_BUILD_REDRAW?.();
    document.querySelector(".atom-lab")?.classList.toggle("is-correct",LR.answerCorrect);
    document.querySelectorAll(".atom-element,.atom-chip").forEach(element=>element.disabled=true);
  }else{
    highlightLessonAnswers(q,response??LR.lastAnswer);
  }
  $("lrCheckBtn")?.classList.add("d-none");
  $("lrNextBtn").disabled=false;
  $("lrFb").textContent=LR.answerCorrect
    ? `Saved answer: ${LR.lastAnswer||"Completed"} — Correct.`
    : `Saved answer: ${LR.lastAnswer||"No answer"}. The correct answer is shown.`;
}

function lrRender(){
  renderAllBadges();

  $("lrPoints").textContent = String(state.points);
  if($("lrLearners")) $("lrLearners").textContent = String(state.learners);
  const questionNumber = LR.phase === "revision" ? LR.revisionIndex : LR.round;
  const questionTotal = LR.phase === "revision" ? LR.revisionTotal : LR.total;
  const progressText = LR.phase === "revision"
    ? `Revision ${questionNumber} of ${questionTotal}`
    : `${questionNumber} / ${questionTotal}`;
  $("lrProg").textContent = progressText;
  if($("lrQuestionBanner")){
    $("lrQuestionBanner").textContent = LR.phase === "revision"
      ? `Revision Question ${questionNumber} of ${questionTotal}`
      : `Question ${questionNumber} of ${questionTotal}`;
  }
  const progressTrack = document.querySelector(".lesson-progress-track");
  const progressFill = $("lrProgressFill");
  const progressPercent = questionTotal ? Math.max(0, Math.min(100, (questionNumber / questionTotal) * 100)) : 0;
  if(progressFill) progressFill.style.width = `${progressPercent}%`;
  if(progressTrack){
    progressTrack.setAttribute("aria-valuemax", String(questionTotal || 0));
    progressTrack.setAttribute("aria-valuenow", String(questionNumber || 0));
  }
  $("lrFb").textContent = "";
  $("lrNextBtn").disabled = true;
  if($("lrPrevBtn")) $("lrPrevBtn").disabled=LR.historyIndex<=0;
  if(!LR.answered) LR.lastAnswer = "";
  closeAnswerExplanation();

  const q = LR.current;

  renderLessonImage(q.image || LR.image);
  $("lrQuestion").textContent = q.q || "";
  $("lrChoices").innerHTML = "";
  setLessonChoiceLayout($("lrChoices"),q);
  $("lessonExtra").innerHTML = "";
  if(q.blend) $("lrChoices").before($("lessonExtra"));
  else $("lrChoices").after($("lessonExtra"));
  if($("lrDragWords")) $("lrDragWords").innerHTML = "";
  if($("lrDropZones")) $("lrDropZones").innerHTML = "";

  if($("lrInput")) $("lrInput").value = "";
  if($("lrInput")){
    $("lrInput").disabled = false;
    $("lrInput").classList.remove("answer-input-wrong");
    $("lrInput").classList.remove("answer-input-correct");
  }

  $("lrInputWrap").classList.add("d-none");
  if($("lrDragArea")) $("lrDragArea").classList.add("d-none");
  $("lrCheckBtn").classList.add("d-none");
  $("lrCheckBtn").textContent="Check answer";

  clearInterval(SPEED_TIMER);

  if(q.blend) renderBlendMeter(q);

  if(q.type === "mc"){
    q.choices.forEach(c=>{
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice-btn";
      b.textContent = answerOptionLabel(c);
      b.dataset.answerValue = String(c);
      b.onclick = ()=>lrPick(c);
      $("lrChoices").appendChild(b);
    });
  }

  else if(q.type === "input" || q.type === "fill" || q.type === "edit"){
    $("lrInputWrap").classList.remove("d-none");
    $("lrCheckBtn").classList.remove("d-none");
    $("lrInput").placeholder = q.placeholder || "Type answer";
  }

  else if(q.type === "match"){
    renderMatch(q);
  }

  else if(q.type === "drag"){
    renderDrag(q);
  }
  else if(q.type === "category-sort"){
    window.K12CategorySort?.render(q);
  }

  else if(q.type === "speed"){
    renderSpeed(q);
  }

  else if(q.type === "selectall"){
    renderSelectAll(q);
  }

  else if(q.type === "dropdown"){
    renderDropdown(q);
  }

  else if(q.type === "ranking"){
    renderRanking(q);
  }

  else if(q.type === "order"){
    renderOrder(q);
  }

  else if(q.type === "atom-build"){
    renderAtomBuild(q);
  }

  else if(q.type === "jeopardy"){
    renderJeopardy(q);
  }

  else if(q.type === "science-sim"){
    renderScienceSimulator(q);
  }

  else if(q.type === "interactive-lab"){
    window.K12InteractiveLabs?.render(q);
  }

  else if(q.type === "math-grid"){
    renderMathGrid(q);
  }

  else if(["block-add","number-line","fraction-build"].includes(q.type)){
    renderMathManipulative(q);
  }

  if(LR.answered){
    restoreSavedAnswerView();
    if(typeof setQAudio === "function") setQAudio(lessonQuestionSpeech(q));
  }else if(q.blend){
    playBlendSequence(q);
  }else if(typeof setQAudio === "function"){
    setQAudio(lessonQuestionSpeech(q));
  }
  requestAnimationFrame(()=>{
    if(!$("lessonRunner")?.classList.contains("d-none")) $("lrQuestionCard")?.scrollIntoView({behavior:"instant",block:"start"});
  });
}

function lrCheck(){
  safeClick();
  if(!$("lrNextBtn").disabled) return;

  const q = LR.current;
  if(LR.phase!=="revision"&&LR.total===1&&q.type==="jeopardy"){
    $("lrProg").textContent="Board challenge";
    if($("lrQuestionBanner")) $("lrQuestionBanner").textContent="History Jeopardy";
  }
  if(["block-add","number-line","fraction-build"].includes(q.type)){
    const result=checkMathManipulative(q);
    LR.savedResponse=cloneRevisionQuestion(MATH_MANIPULATIVE_STATE);
    LR.lastAnswer=result.response;
    if(result.correct){
      lessonCorrect(result.message,result.message);
      clearTimeout(LR_CORRECT_ADVANCE_TIMER);
      LR_CORRECT_ADVANCE_TIMER=null;
      $("lrNextBtn").disabled=false;
      document.querySelector(".math-manipulative")?.classList.add("is-correct");
      saveLessonCheckpoint();
    }else{
      $("lrFb").textContent=result.message;
      document.querySelector(".math-manipulative")?.classList.add("needs-review");
    }
    return;
  }
  if(q.type === "atom-build"){
    const expected=q.atoms||{};
    const symbols=new Set([...Object.keys(expected),...Object.keys(ATOM_BUILD_COUNTS)]);
    const ok=[...symbols].every(symbol=>Number(ATOM_BUILD_COUNTS[symbol]||0)===Number(expected[symbol]||0));
    LR.savedResponse={...ATOM_BUILD_COUNTS};
    LR.lastAnswer=Object.entries(ATOM_BUILD_COUNTS).filter(([,count])=>count).map(([symbol,count])=>`${symbol} × ${count}`).join(", ")||"No atoms selected";
    if(ok){
      lessonCorrect(`Correct — you built ${q.formula}!`, `${q.formula} built correctly!`);
      clearTimeout(LR_CORRECT_ADVANCE_TIMER);
      LR_CORRECT_ADVANCE_TIMER=null;
      $("lrNextBtn").disabled=false;
      document.querySelector(".atom-lab")?.classList.add("is-correct");
      document.querySelectorAll(".atom-element,.atom-chip").forEach(element=>element.disabled=true);
      saveLessonCheckpoint();
    }else{
      $("lrFb").textContent="That atom count does not match yet. Adjust the tray and check again.";
      document.querySelector(".atom-lab")?.classList.add("needs-review");
    }
    return;
  }
  if(q.type === "drag"){
    const zones = document.querySelectorAll("#lrDropZones .drop-zone");
    LR.savedResponse=[...zones].map(zone=>({answer:zone.dataset.answer||"",dropped:zone.dataset.dropped||""}));
    LR.lastAnswer=LR.savedResponse.filter(item=>item.dropped).map(item=>`${item.dropped} → ${item.answer}`).join(", ")||"No matches selected";
    let ok = zones.length > 0;
    zones.forEach(zone=>{
      if(zone.dataset.dropped !== zone.dataset.answer) ok = false;
    });
    if(ok){
      lessonCorrect("Correct!", "Great matching!");
    }else{
      showDragCorrections(q);
      lrWrongMoveOn(wrongExplanation(q), "Review the red corrections.", 4500);
    }
    return;
  }

  if(q.type === "category-sort"){
    const result=window.K12CategorySort?.check(q);
    if(!result) return;
    LR.savedResponse=result.placements;
    LR.lastAnswer=`${result.placed} of ${q.items.length} cards placed`;
    if(result.correct){
      window.K12CategorySort?.showCorrections(q,result.placements);
      lessonCorrect(`All ${q.items.length} cards are in the right categories!`,"Great sorting!");
    }else{
      window.K12CategorySort?.showCorrections(q,result.placements);
      lrWrongMoveOn("Review the highlighted cards and their correct categories.","Review the corrections.",4500);
    }
    return;
  }

  if(q.type === "selectall"){
    const picked = [...document.querySelectorAll("#lrChoices .selectall-choice:checked")].map(el=>el.value).sort();
    if(q.requiredSelections && picked.length!==q.requiredSelections){
      $("lrFb").textContent=`Select exactly ${q.requiredSelections} choices before checking.`;
      return;
    }
    LR.savedResponse=[...picked];
    LR.lastAnswer=picked.join(", ")||"No choices selected";
    const answers = [...q.answers].map(String).sort();
    const ok = picked.length === answers.length && picked.every((v,i)=>v === answers[i]);
    if(ok){
      lessonCorrect("Correct!", "Great choices!");
    }else{
      LR.lastAnswer = picked.join(", ") || "No choices selected";
      lrWrongMoveOn(wrongExplanation(q, picked.join(", ")), "Review the correct choices.", 3500);
    }
    return;
  }

  if(q.type === "order"){
    const picked = [...document.querySelectorAll("#lrChoices .order-choice")].filter(b=>b.classList.contains("picked")).map(b=>b.dataset.value);
    LR.savedResponse=[...picked];
    LR.lastAnswer=picked.join(", ")||"No order selected";
    const ok = picked.length === q.items.length && picked.every((v,i)=>v === String(q.items[i]));
    if(ok){
      lessonCorrect("Correct order!", "Correct order!");
    }else{
      LR.lastAnswer = picked.join(", ") || "No order selected";
      lrWrongMoveOn(wrongExplanation(q, picked.join(", ")), picked.length < q.items.length ? "Finish the order before checking." : "Review the correct order.", 3500);
      document.querySelectorAll("#lrChoices .order-choice").forEach(b=>b.classList.remove("picked"));
    }
    return;
  }

  if(q.type === "dropdown"){
    const picked=document.querySelector("#lrChoices .lesson-dropdown")?.value||"";
    if(!picked){$("lrFb").textContent="Choose an option before checking.";return;}
    LR.savedResponse=picked;LR.lastAnswer=picked;
    if(picked===String(q.answer))lessonCorrect("Correct!","Correct!");
    else lrWrongMoveOn(wrongExplanation(q,picked),"Review the correct choice.",3500);
    return;
  }

  if(q.type === "ranking"){
    const picked=[...document.querySelectorAll("#lrChoices .ranking-card")].map(item=>item.dataset.value);
    LR.savedResponse=[...picked];LR.lastAnswer=picked.join(", ");
    if(picked.every((value,index)=>value===String(q.items[index])))lessonCorrect("Correct order!","Correct order!");
    else lrWrongMoveOn(wrongExplanation(q,picked.join(", ")),"Review the correct order.",3500);
    return;
  }

  const user = $("lrInput").value.trim();
  LR.lastAnswer = user || "No answer";
  LR.savedResponse=user;

  let ok = false;

  if(q.type === "input" || q.type === "fill" || q.type === "edit"){
    ok = cleanAnswer(user) === cleanAnswer(q.answer);
  }

  if(ok){
    lessonCorrect("Correct!", "Correct!");
  }else{
    lrWrongMoveOn(wrongExplanation(q, user));
  }
}

function renderMatch(q){
  MATCH_PICK = null;

  const cards = [];

  q.pairs.forEach((p,i)=>{
    cards.push({txt:p.left, id:i, side:"left"});
    cards.push({txt:p.right, id:i, side:"right"});
  });

  shuffle(cards).forEach(card=>{
    const b = document.createElement("button");
    b.type = "button";
    b.className = "match-card";
    b.textContent = card.txt;
    b.dataset.id = card.id;
    b.dataset.side = card.side;

    b.onclick = ()=>{
      if(b.classList.contains("done")) return;

      if(!MATCH_PICK){
        MATCH_PICK = b;
        b.classList.add("picked");
        return;
      }

      if(MATCH_PICK === b) return;

      if(MATCH_PICK.dataset.id === b.dataset.id && MATCH_PICK.dataset.side !== b.dataset.side){
        MATCH_PICK.classList.remove("picked");
        MATCH_PICK.classList.add("done");
        b.classList.add("done");
        MATCH_PICK = null;

        if(document.querySelectorAll("#lessonExtra .done").length === q.pairs.length * 2){
          LR.savedResponse=q.pairs.map(pair=>({left:pair.left,right:pair.right}));
          LR.lastAnswer="All pairs matched";
          lessonCorrect("All matched!", "Great match!");
        }
      }else{
        LR.lastAnswer = `${MATCH_PICK.textContent} with ${b.textContent}`;
        LR.savedResponse=LR.lastAnswer;
        MATCH_PICK.classList.add("answer-wrong");
        b.classList.add("answer-wrong");
        document.querySelectorAll("#lessonExtra .match-card").forEach(card=>{
          if(card.dataset.id === MATCH_PICK.dataset.id) card.classList.add("answer-correct");
        });
        MATCH_PICK.classList.remove("picked");
        MATCH_PICK = null;
        lrWrongMoveOn(wrongExplanation(q), "Review the correct matches.", 3500);
      }
    };

    $("lessonExtra").appendChild(b);
  });
}

function renderDrag(q){
  const area = $("lrDragArea");
  const words = $("lrDragWords");
  const zones = $("lrDropZones");
  if(!area || !words || !zones) return;

  area.classList.remove("d-none");
  $("lrCheckBtn").classList.remove("d-none");
  $("lrChoices").innerHTML = "";
  words.innerHTML = "";
  zones.innerHTML = "";

  const pairs = q.pairs.map(pair=>({
    word:String(pair.word ?? pair.left ?? ""),
    match:String(pair.match ?? pair.right ?? "")
  })).filter(pair=>pair.word && pair.match);

  let pickedDragWord = null;

  shuffle(pairs.map(p=>p.word)).forEach(word=>{
    const el = document.createElement("div");
    el.className = "drag-item";
    el.draggable = true;
    el.textContent = word;
    el.addEventListener("dragstart", e=>e.dataTransfer.setData("text", word));
    el.addEventListener("click", ()=>{
      pickedDragWord = word;
      words.querySelectorAll(".drag-item").forEach(item=>item.classList.remove("picked"));
      el.classList.add("picked");
    });
    words.appendChild(el);
  });

  pairs.forEach(pair=>{
    const zone = document.createElement("div");
    zone.className = "drop-zone";
    zone.dataset.answer = pair.word;
    zone.innerHTML = `<div>${pair.match}</div><div class="drop-slot">Drop here</div>`;
    zone.addEventListener("dragover", e=>e.preventDefault());
    zone.addEventListener("drop", e=>{
      e.preventDefault();
      const val = e.dataTransfer.getData("text");
      zone.querySelector(".drop-slot").textContent = val;
      zone.dataset.dropped = val;
    });
    zone.addEventListener("click", ()=>{
      if(!pickedDragWord) return;
      zone.querySelector(".drop-slot").textContent = pickedDragWord;
      zone.dataset.dropped = pickedDragWord;
      pickedDragWord = null;
      words.querySelectorAll(".drag-item").forEach(item=>item.classList.remove("picked"));
    });
    zones.appendChild(zone);
  });
}

function renderSpeed(q){
  clearInterval(SPEED_TIMER);
  SPEED_LEFT = q.seconds || 10;

  const timer = document.createElement("div");
  timer.className = "speed-timer";
  timer.id = "speedTimer";
  timer.textContent = `⏱ ${SPEED_LEFT}`;
  $("lessonExtra").appendChild(timer);

  q.choices.forEach(c=>{
    const b = document.createElement("button");
    b.type = "button";
    b.className = "choice-btn";
    b.textContent = answerOptionLabel(c);
    b.dataset.answerValue = String(c);

    b.onclick = ()=>{
      clearInterval(SPEED_TIMER);
      lrPick(c);
    };

    $("lrChoices").appendChild(b);
  });

  SPEED_TIMER = setInterval(()=>{
    SPEED_LEFT--;

    if($("speedTimer")){
      $("speedTimer").textContent = `⏱ ${SPEED_LEFT}`;
    }

    if(SPEED_LEFT <= 0){
      clearInterval(SPEED_TIMER);
      LR.lastAnswer = "Time expired before an answer was selected";
      LR.savedResponse="";
      lrWrongMoveOn(`Time is up. ${wrongExplanation(q)}`, "Too slow.", 3500);
    }
  },1000);
}

function renderSelectAll(q){
  $("lrCheckBtn").classList.remove("d-none");
  if(q.requiredSelections){
    const note=document.createElement("p");note.className="special-choice-note";note.textContent=`Choose exactly ${q.requiredSelections} of ${q.choices.length} options.`;
    $("lrChoices").appendChild(note);
  }
  q.choices.forEach(choice=>{
    const label = document.createElement("label");
    label.className = "selectall-card";
    label.innerHTML = `
      <input class="selectall-choice" type="checkbox" value="${htmlSafe(choice)}">
      <span>${htmlSafe(answerOptionLabel(choice))}</span>
    `;
    $("lrChoices").appendChild(label);
  });
  if(q.requiredSelections){
    $("lrChoices").querySelectorAll(".selectall-choice").forEach(input=>input.addEventListener("change",()=>{
      const count=$("lrChoices").querySelectorAll(".selectall-choice:checked").length;
      if(count>q.requiredSelections){input.checked=false;$("lrFb").textContent=`Choose exactly ${q.requiredSelections} options.`;}
      else $("lrFb").textContent="";
    }));
  }
}

function renderDropdown(q){
  $("lrCheckBtn").classList.remove("d-none");
  const box=document.createElement("div");box.className="special-dropdown-box";
  const label=document.createElement("label");label.textContent="Choose one answer";
  const select=document.createElement("select");select.className="lesson-dropdown";
  select.innerHTML='<option value="">Choose an option</option>';
  q.choices.forEach(choice=>{const option=document.createElement("option");option.value=String(choice);option.textContent=String(choice);select.appendChild(option);});
  label.appendChild(select);box.appendChild(label);$("lrChoices").appendChild(box);
}

function renderRanking(q){
  $("lrCheckBtn").classList.remove("d-none");
  const list=document.createElement("div");list.className="ranking-list";list.setAttribute("role","list");
  let dragged=null;
  shuffle([...q.items]).forEach(value=>{
    const card=document.createElement("div");card.className="ranking-card";card.dataset.value=String(value);card.draggable=true;card.tabIndex=0;card.setAttribute("role","listitem");
    const handle=document.createElement("span");handle.className="ranking-handle";handle.textContent="☰";handle.setAttribute("aria-hidden","true");
    const text=document.createElement("strong");text.textContent=String(value);
    const controls=document.createElement("span");controls.className="ranking-controls";
    for(const [label,direction] of [["Move up",-1],["Move down",1]]){
      const button=document.createElement("button");button.type="button";button.textContent=direction<0?"↑":"↓";button.setAttribute("aria-label",`${label}: ${value}`);
      button.onclick=()=>{const sibling=direction<0?card.previousElementSibling:card.nextElementSibling;if(sibling)list.insertBefore(card,direction<0?sibling:sibling.nextElementSibling);card.focus();};
      controls.appendChild(button);
    }
    card.append(handle,text,controls);
    card.addEventListener("dragstart",event=>{dragged=card;event.dataTransfer.setData("text/plain",String(value));});
    card.addEventListener("dragover",event=>event.preventDefault());
    card.addEventListener("drop",event=>{event.preventDefault();if(dragged&&dragged!==card){const after=event.clientY>card.getBoundingClientRect().top+card.offsetHeight/2;list.insertBefore(dragged,after?card.nextElementSibling:card);dragged.focus();}});
    card.addEventListener("dragend",()=>{dragged=null;});
    card.addEventListener("keydown",event=>{if(event.key!=="ArrowUp"&&event.key!=="ArrowDown")return;event.preventDefault();const sibling=event.key==="ArrowUp"?card.previousElementSibling:card.nextElementSibling;if(sibling)list.insertBefore(card,event.key==="ArrowUp"?sibling:sibling.nextElementSibling);card.focus();});
    list.appendChild(card);
  });
  $("lrChoices").appendChild(list);
}

function renderOrder(q){
  $("lrCheckBtn").classList.remove("d-none");
  const picked = [];
  shuffle([...q.items]).forEach(item=>{
    const b = document.createElement("button");
    b.type = "button";
    b.className = "choice-btn order-choice";
    b.dataset.value = String(item);
    b.textContent = answerOptionLabel(item);
    b.onclick = ()=>{
      if(b.classList.contains("picked")) return;
      picked.push(String(item));
      b.classList.add("picked");
      b.textContent = `${picked.length}. ${item}`;
    };
    $("lrChoices").appendChild(b);
  });
}

let MATH_MANIPULATIVE_STATE={};
function renderMathManipulative(q){
  $("lrCheckBtn").classList.remove("d-none");
  $("lrCheckBtn").textContent="Check my work";
  const wrap=document.createElement("section");
  wrap.className=`math-manipulative ${q.type}`;
  if(q.type==="block-add"){
    MATH_MANIPULATIVE_STATE={left:0,right:0};
    wrap.innerHTML=`<div class="manipulative-heading"><span>Block Builder</span><strong>${q.left} + ${q.right} = ?</strong></div><p>Build the first number with blue blocks and the second number with gold blocks.</p><div class="block-groups"><div><h3>First group: ${q.left}</h3><div class="block-tray" data-block-tray="left"></div><div class="mini-controls"><button type="button" data-block-add="left">+ Blue block</button><button type="button" data-block-remove="left">− Remove</button></div></div><div class="math-symbol">+</div><div><h3>Second group: ${q.right}</h3><div class="block-tray" data-block-tray="right"></div><div class="mini-controls"><button type="button" data-block-add="right">+ Gold block</button><button type="button" data-block-remove="right">− Remove</button></div></div></div><div class="manipulative-result" aria-live="polite"></div>`;
    const draw=()=>{
      for(const side of ["left","right"]){
        const tray=wrap.querySelector(`[data-block-tray="${side}"]`);
        tray.innerHTML=Array.from({length:MATH_MANIPULATIVE_STATE[side]},()=>`<span class="build-block ${side}"></span>`).join("")||'<span class="tray-help">Add blocks</span>';
      }
      wrap.querySelector(".manipulative-result").textContent=`Total blocks: ${MATH_MANIPULATIVE_STATE.left+MATH_MANIPULATIVE_STATE.right}`;
      wrap.classList.remove("needs-review");
    };
    wrap.querySelectorAll("[data-block-add]").forEach(button=>button.onclick=()=>{const side=button.dataset.blockAdd;if(MATH_MANIPULATIVE_STATE[side]<20)MATH_MANIPULATIVE_STATE[side]++;draw();});
    wrap.querySelectorAll("[data-block-remove]").forEach(button=>button.onclick=()=>{const side=button.dataset.blockRemove;MATH_MANIPULATIVE_STATE[side]=Math.max(0,MATH_MANIPULATIVE_STATE[side]-1);draw();});
    draw();
  }else if(q.type==="number-line"){
    MATH_MANIPULATIVE_STATE={position:Number(q.start)};
    wrap.innerHTML=`<div class="manipulative-heading"><span>Number Line Lab</span><strong>Start: ${q.start}</strong></div><p>Move one space at a time. Count your jumps, then check your landing point.</p><div class="number-line-track" role="group" aria-label="Number line"></div><div class="number-line-controls"><button type="button" data-line-move="-1">← Jump back</button><button type="button" data-line-reset>Reset to ${q.start}</button><button type="button" data-line-move="1">Jump forward →</button></div><div class="manipulative-result" aria-live="polite"></div>`;
    const draw=()=>{
      wrap.querySelector(".number-line-track").innerHTML=Array.from({length:Number(q.max||20)+1},(_,number)=>`<button type="button" class="number-point ${number===MATH_MANIPULATIVE_STATE.position?'active':''}" data-line-point="${number}"><span>${number}</span></button>`).join("");
      wrap.querySelector(".manipulative-result").textContent=`Current position: ${MATH_MANIPULATIVE_STATE.position}`;
      wrap.querySelectorAll("[data-line-point]").forEach(button=>button.onclick=()=>{MATH_MANIPULATIVE_STATE.position=Number(button.dataset.linePoint);draw();});
      wrap.classList.remove("needs-review");
    };
    wrap.querySelectorAll("[data-line-move]").forEach(button=>button.onclick=()=>{MATH_MANIPULATIVE_STATE.position=Math.max(0,Math.min(Number(q.max||20),MATH_MANIPULATIVE_STATE.position+Number(button.dataset.lineMove)));draw();});
    wrap.querySelector("[data-line-reset]").onclick=()=>{MATH_MANIPULATIVE_STATE.position=Number(q.start);draw();};
    draw();
  }else{
    MATH_MANIPULATIVE_STATE={selected:[]};
    wrap.innerHTML=`<div class="manipulative-heading"><span>Fraction Builder</span><strong>Build ${q.numerator}/${q.denominator}</strong></div><p>Click equal parts to shade or unshade them.</p><div class="fraction-shape" style="--fraction-parts:${q.denominator}" role="group" aria-label="${q.denominator} equal parts"></div><div class="manipulative-result" aria-live="polite"></div>`;
    const draw=()=>{
      const selected=new Set(MATH_MANIPULATIVE_STATE.selected);
      wrap.querySelector(".fraction-shape").innerHTML=Array.from({length:q.denominator},(_,index)=>`<button type="button" class="fraction-part ${selected.has(index)?'selected':''}" data-fraction-part="${index}" aria-pressed="${selected.has(index)}"><span>Part ${index+1}</span></button>`).join("");
      wrap.querySelector(".manipulative-result").textContent=`Shaded: ${selected.size} of ${q.denominator}`;
      wrap.querySelectorAll("[data-fraction-part]").forEach(button=>button.onclick=()=>{const index=Number(button.dataset.fractionPart);MATH_MANIPULATIVE_STATE.selected=selected.has(index)?MATH_MANIPULATIVE_STATE.selected.filter(value=>value!==index):[...MATH_MANIPULATIVE_STATE.selected,index];draw();});
      wrap.classList.remove("needs-review");
    };
    draw();
  }
  $("lrChoices").appendChild(wrap);
}
function checkMathManipulative(q){
  if(q.type==="block-add"){
    const correct=MATH_MANIPULATIVE_STATE.left===Number(q.left)&&MATH_MANIPULATIVE_STATE.right===Number(q.right);
    return {correct,response:`${MATH_MANIPULATIVE_STATE.left} + ${MATH_MANIPULATIVE_STATE.right}`,message:correct?`Correct! ${q.left} + ${q.right} = ${q.answer}.`:`Build exactly ${q.left} blue blocks and ${q.right} gold blocks, then check again.`};
  }
  if(q.type==="number-line"){
    const correct=MATH_MANIPULATIVE_STATE.position===Number(q.answer);
    return {correct,response:String(MATH_MANIPULATIVE_STATE.position),message:correct?`Correct! You landed on ${q.answer}.`:`You are on ${MATH_MANIPULATIVE_STATE.position}. Count ${q.jump} jumps ${q.direction} from ${q.start}.`};
  }
  const shaded=(MATH_MANIPULATIVE_STATE.selected||[]).length;
  const correct=shaded===Number(q.numerator);
  return {correct,response:`${shaded}/${q.denominator}`,message:correct?`Correct! You built ${q.answer}.`:`You shaded ${shaded} parts. Shade exactly ${q.numerator} of the ${q.denominator} equal parts.`};
}

function renderJeopardy(q){
  $("lrCheckBtn").classList.add("d-none");const board=document.createElement("section");board.className="jeopardy-board";const target=Number(q.targetScore||7000),solved=new Set();let score=0,active=null;const categories=q.categories||[];
  board.innerHTML=`<header><span>GRADE 8 HISTORY CHALLENGE</span><h3>Jeopardy</h3><strong class="jeopardy-score">$0 / $${target.toLocaleString()}</strong></header><p class="jeopardy-status">Clear the board to win $${target.toLocaleString()}.</p><div class="jeopardy-categories">${categories.map(category=>`<span>${htmlSafe(category)}</span>`).join("")}</div><div class="jeopardy-cards"></div><div class="jeopardy-clue"></div>`;
  const cards=board.querySelector(".jeopardy-cards"),panel=board.querySelector(".jeopardy-clue");function draw(){board.querySelector(".jeopardy-score").textContent=`$${score.toLocaleString()} / $${target.toLocaleString()}`;cards.innerHTML="";q.clues.forEach((clue,index)=>{const button=document.createElement("button");button.type="button";button.className=`jeopardy-card ${solved.has(index)?"solved":""}`;button.textContent=solved.has(index)?"Solved":`$${clue.value}`;button.disabled=solved.has(index);button.onclick=()=>{active=index;show();};cards.appendChild(button);});}function show(){const clue=q.clues[active];panel.innerHTML=`<p>${htmlSafe(clue.question)}</p><div class="jeopardy-answers"></div>`;const answers=panel.querySelector(".jeopardy-answers");clue.choices.forEach(choice=>{const button=document.createElement("button");button.type="button";button.textContent=choice;button.onclick=()=>{if(choice!==clue.answer){board.querySelector(".jeopardy-status").textContent="Not that answer. Try again.";button.classList.add("answer-wrong");return;}score+=clue.value;solved.add(active);panel.innerHTML=`<p class="jeopardy-correct">Correct: ${htmlSafe(clue.answer)}</p>`;draw();if(score>=target){LR.savedResponse={score,solved:[...solved]};LR.lastAnswer=`$${target.toLocaleString()}`;lessonCorrect(`Board cleared. $${target.toLocaleString()} won!`,`$${target.toLocaleString()} earned!`);clearTimeout(LR_CORRECT_ADVANCE_TIMER);LR_CORRECT_ADVANCE_TIMER=null;$("lrNextBtn").disabled=false;}};answers.appendChild(button);});}$("lrChoices").appendChild(board);draw();
}
function renderMathGrid(q){$("lrCheckBtn").classList.add("d-none");const grid=document.createElement("section");grid.className="math-grid-challenge";const solved=new Set();let active=null,points=0;grid.innerHTML=`<header><span>GRADE 8 MATH ARCADE</span><h3>Equation Grid</h3><strong class="math-grid-count">0 / ${q.tiles.length}</strong></header><p class="math-grid-status">Solve each power tile, then crack the bonus vault.</p><div class="math-grid-tiles"></div><div class="math-grid-work"></div>`;const tiles=grid.querySelector(".math-grid-tiles"),work=grid.querySelector(".math-grid-work");function finish(){LR.savedResponse={solved:[...solved],points};LR.lastAnswer=`${points} arcade points`;lessonCorrect("Vault unlocked - grid complete!","Math arcade complete!");clearTimeout(LR_CORRECT_ADVANCE_TIMER);LR_CORRECT_ADVANCE_TIMER=null;$("lrNextBtn").disabled=false;}function solve(item,after){work.innerHTML=`<p>Solve: <strong>${htmlSafe(item.question)}</strong></p><div class="math-grid-answers"></div>`;const answers=work.querySelector(".math-grid-answers");item.choices.forEach(choice=>{const button=document.createElement("button");button.type="button";button.textContent=choice;button.onclick=()=>{if(choice!==item.answer){button.classList.add("answer-wrong");return;}points+=item===q.bonus?200:100;after();};answers.appendChild(button);});}function draw(){grid.querySelector(".math-grid-count").textContent=`${solved.size} / ${q.tiles.length}`;tiles.innerHTML="";q.tiles.forEach((tile,index)=>{const button=document.createElement("button");button.type="button";button.className=`math-grid-tile ${solved.has(index)?"solved":""}`;button.disabled=solved.has(index);button.innerHTML=solved.has(index)?`<span>Unlocked</span><strong>${htmlSafe(tile.answer)}</strong>`:`<span>Power tile ${index+1}</span><strong>${htmlSafe(tile.question)}</strong>`;button.onclick=()=>{active=index;solve(tile,()=>{solved.add(active);draw();if(solved.size===q.tiles.length)solve(q.bonus,finish);});};tiles.appendChild(button);});}$("lrChoices").appendChild(grid);draw();}
function renderMathRelay(q){$("lrCheckBtn").classList.add("d-none");const relay=document.createElement("section");relay.className="math-relay-challenge";let lap=0,points=0;relay.innerHTML=`<header><span>GRADE 8 MATH ARCADE</span><h3>Math Relay</h3><strong class="math-relay-score">0 points</strong></header><p class="math-relay-status">Answer each lap correctly to reach the finish.</p><div class="math-relay-track"></div><div class="math-relay-work"></div>`;const track=relay.querySelector(".math-relay-track"),work=relay.querySelector(".math-relay-work");function draw(){relay.querySelector(".math-relay-score").textContent=`${points} points`;track.innerHTML=q.problems.map((_,i)=>`<span class="${i<lap?"done":i===lap?"active":""}">${i<lap?"OK":i+1}</span>`).join("");if(lap===q.problems.length){LR.savedResponse={points};LR.lastAnswer=`${points} relay points`;lessonCorrect("Relay complete!","Math Relay complete!");clearTimeout(LR_CORRECT_ADVANCE_TIMER);LR_CORRECT_ADVANCE_TIMER=null;$("lrNextBtn").disabled=false;return;}const problem=q.problems[lap];work.innerHTML=`<p>Lap ${lap+1}: <strong>${htmlSafe(problem.question)}</strong></p><div class="math-relay-answers"></div>`;const answers=work.querySelector(".math-relay-answers");problem.choices.forEach(choice=>{const button=document.createElement("button");button.type="button";button.textContent=choice;button.onclick=()=>{if(choice!==problem.answer){button.classList.add("answer-wrong");return;}lap++;points+=100;draw();};answers.appendChild(button);});}$("lrChoices").appendChild(relay);draw();}

﻿function renderScienceSimulator(q){
  $("lrCheckBtn").classList.add("d-none");
  const lab=document.createElement("section");
  lab.className="science-sim-lab";
  const circuitParts=new Set();
  let circuitClosed=false;
  let prey={green:8,brown:8,generation:0};
  lab.innerHTML='<header class="science-sim-header"><span>GRADE 8 INTERACTIVE SCIENCE</span><h3>Simulation Studio</h3><p>Build, test, adjust, and observe five connected science models.</p></header><div class="science-sim-tabs"></div><div class="science-sim-stage"></div><button type="button" class="science-sim-finish">Finish lab</button>';
  const tabs=lab.querySelector(".science-sim-tabs"),stage=lab.querySelector(".science-sim-stage");
  const simulations=[
    ["circuit","Virtual Circuit Board"],["springs","Mass and Springs"],["projectile","Projectile Motion Catapult"],["selection","Natural Selection Simulator"],["water","Water Cycle Slider"]
  ];
  let active="circuit";
  function tabBar(){tabs.innerHTML="";simulations.forEach(([id,label])=>{const button=document.createElement("button");button.type="button";button.className=id===active?"active":"";button.textContent=label;button.onclick=()=>{active=id;tabBar();draw();};tabs.appendChild(button);});}
  function circuit(){
    stage.innerHTML='<div class="sim-intro"><h4>Build a closed circuit</h4><p>Drag each component into the matching slot, then close the switch to light the bulb.</p></div><div class="circuit-kit"></div><div class="circuit-workspace"><div class="circuit-slot" data-part="battery">Battery slot</div><div class="circuit-slot" data-part="bulb">Lightbulb slot</div><div class="circuit-slot" data-part="resistor">Resistor slot</div><div class="circuit-slot" data-part="switch">Switch slot</div></div><div class="circuit-actions"><button type="button" class="circuit-toggle">Close switch</button><strong class="circuit-result"></strong></div>';
    const kit=stage.querySelector(".circuit-kit"),toggle=stage.querySelector(".circuit-toggle"),result=stage.querySelector(".circuit-result");
    ["battery","bulb","resistor","switch"].forEach(part=>{const piece=document.createElement("button");piece.type="button";piece.draggable=true;piece.className="circuit-piece";piece.textContent=part;piece.ondragstart=e=>e.dataTransfer.setData("text/plain",part);piece.onclick=()=>{circuitParts.add(part);paint();};kit.appendChild(piece);});
    function paint(){stage.querySelectorAll(".circuit-slot").forEach(slot=>{const part=slot.dataset.part,placed=circuitParts.has(part);slot.classList.toggle("placed",placed);slot.textContent=placed?part+" connected":part+" slot";});const ready=["battery","bulb","resistor","switch"].every(part=>circuitParts.has(part));toggle.disabled=!ready;toggle.textContent=circuitClosed?"Open switch":"Close switch";const lit=ready&&circuitClosed;stage.querySelector('[data-part="bulb"]').classList.toggle("lit",lit);result.textContent=lit?"Current flows: the bulb is lit.":ready?"Circuit ready. Close the switch.":"Add all four components.";}
    stage.querySelectorAll(".circuit-slot").forEach(slot=>{slot.ondragover=e=>e.preventDefault();slot.ondrop=e=>{e.preventDefault();if(e.dataTransfer.getData("text/plain")===slot.dataset.part){circuitParts.add(slot.dataset.part);paint();}};});
    toggle.onclick=()=>{circuitClosed=!circuitClosed;paint();};paint();
  }
  function springs(){
    stage.innerHTML='<div class="sim-intro"><h4>Mass and Springs: Hooke\'s Law</h4><p>Change the load, spring stiffness, gravity, and friction. Observe the equilibrium stretch and damping.</p></div><div class="sim-controls"><label>Mass <input data-control="mass" type="range" min="1" max="10" value="5"></label><label>Stiffness <input data-control="stiffness" type="range" min="1" max="10" value="5"></label><label>Gravity <select data-control="gravity"><option value="9.8">Earth</option><option value="1.6">Moon</option></select></label><label>Friction <input data-control="friction" type="range" min="0" max="10" value="3"></label></div><div class="spring-scene"><div class="spring-hook"></div><div class="spring-coil"></div><div class="spring-mass">5 kg</div></div><p class="sim-readout"></p>';
    const inputs=[...stage.querySelectorAll("[data-control]")],coil=stage.querySelector(".spring-coil"),massEl=stage.querySelector(".spring-mass"),readout=stage.querySelector(".sim-readout");function update(){const mass=+stage.querySelector('[data-control="mass"]').value,stiffness=+stage.querySelector('[data-control="stiffness"]').value,gravity=+stage.querySelector('[data-control="gravity"]').value,friction=+stage.querySelector('[data-control="friction"]').value,stretch=Math.min(170,Math.round(mass*gravity/stiffness*9));coil.style.height=(46+stretch)+"px";coil.style.animationDuration=(1.8+friction/3)+"s";massEl.style.transform="translateY("+stretch+"px)";massEl.textContent=mass+" kg";readout.textContent="Equilibrium stretch: "+stretch+" cm. Higher friction settles the bounce sooner.";}inputs.forEach(input=>input.oninput=update);update();
  }
  function projectile(){
    stage.innerHTML='<div class="sim-intro"><h4>Projectile Motion Catapult</h4><p>Set the launch conditions and use the path to aim at the target.</p></div><div class="sim-controls"><label>Angle <input data-control="angle" type="range" min="10" max="80" value="45"></label><label>Initial speed <input data-control="speed" type="range" min="10" max="80" value="48"></label><label>Air resistance <input data-control="air" type="range" min="0" max="10" value="2"></label></div><div class="projectile-field"><svg viewBox="0 0 640 250" preserveAspectRatio="none"><polyline class="projectile-path" points=""></polyline></svg><div class="catapult">CATAPULT</div><div class="projectile-ball"></div><div class="projectile-target">TARGET</div></div><p class="sim-readout"></p>';
    const field=stage.querySelector(".projectile-field"),path=stage.querySelector(".projectile-path"),ball=stage.querySelector(".projectile-ball"),readout=stage.querySelector(".sim-readout");function update(){const angle=+stage.querySelector('[data-control="angle"]').value,speed=+stage.querySelector('[data-control="speed"]').value,air=+stage.querySelector('[data-control="air"]').value,radians=angle*Math.PI/180,range=Math.min(590,Math.max(100,(speed*speed*Math.sin(2*radians)/9.8)*(1-air/14)));const peak=Math.min(210,Math.max(25,(speed*speed*Math.sin(radians)**2/19.6)*(1-air/18)));let points=[];for(let i=0;i<=24;i++){const x=30+range*i/24,y=220-4*peak*i/24*(1-i/24);points.push(x.toFixed(0)+","+y.toFixed(0));}path.setAttribute("points",points.join(" "));ball.style.left=(30+range)+"px";ball.style.bottom="20px";readout.textContent="Projected range: "+Math.round(range)+" m. Peak height: "+Math.round(peak)+" m.";}stage.querySelectorAll("[data-control]").forEach(input=>input.oninput=update);update();
  }
  function selection(){
    stage.innerHTML='<div class="sim-intro"><h4>Natural Selection Simulator</h4><p>Change the habitat, then run generations to see which camouflage color leaves more survivors.</p></div><div class="sim-controls"><label>Environment <select data-control="environment"><option value="grass">Grass</option><option value="dirt">Dirt</option></select></label><button type="button" class="run-generation">Run generation</button></div><div class="selection-habitat grass"><div class="predator">PREDATOR</div><div class="prey-field"></div></div><p class="sim-readout"></p>';
    const habitat=stage.querySelector(".selection-habitat"),field=stage.querySelector(".prey-field"),readout=stage.querySelector(".sim-readout");function drawPrey(){field.innerHTML="";["green","brown"].forEach(color=>{for(let i=0;i<prey[color];i++){const dot=document.createElement("i");dot.className="prey-dot "+color;dot.style.left=((i*31+(color==="green"?11:23))%88+4)+"%";dot.style.top=((i*47+(color==="green"?17:7))%68+18)+"%";field.appendChild(dot);}});readout.textContent="Generation "+prey.generation+": green "+prey.green+", brown "+prey.brown+". Better camouflage is eaten less often.";}function run(){const environment=stage.querySelector('[data-control="environment"]').value;const favored=environment==="grass"?"green":"brown",other=favored==="green"?"brown":"green";prey[favored]=Math.min(18,Math.max(2,Math.round(prey[favored]*1.22)));prey[other]=Math.max(1,Math.round(prey[other]*0.56));prey.generation++;drawPrey();}stage.querySelector('[data-control="environment"]').onchange=e=>{habitat.className="selection-habitat "+e.target.value;};stage.querySelector(".run-generation").onclick=run;drawPrey();
  }
  function water(){
    stage.innerHTML='<div class="sim-intro"><h4>Water Cycle Slider</h4><p>Change temperature and humidity to control evaporation, clouds, rain, and snow.</p></div><div class="sim-controls"><label>Temperature <input data-control="temperature" type="range" min="10" max="100" value="65"></label><label>Humidity <input data-control="humidity" type="range" min="0" max="100" value="55"></label></div><div class="water-scene"><div class="water-sun">SUN</div><div class="water-cloud">CLOUD</div><div class="water-vapor">^^^^</div><div class="water-precip"></div><div class="water-lake">LAKE</div></div><p class="sim-readout"></p>';
    const scene=stage.querySelector(".water-scene"),vapor=stage.querySelector(".water-vapor"),precip=stage.querySelector(".water-precip"),readout=stage.querySelector(".sim-readout");function update(){const temperature=+stage.querySelector('[data-control="temperature"]').value,humidity=+stage.querySelector('[data-control="humidity"]').value,snow=temperature<35,rain=humidity>60&&!snow,evaporation=temperature>60;scene.classList.toggle("snow",snow);scene.classList.toggle("rain",rain);vapor.style.opacity=evaporation?"1":"0.2";precip.textContent=snow?"* * * * *":rain?"| | | | |":"";readout.textContent=snow?"Cold air produces snow.":rain?"High humidity condenses into rainfall.":evaporation?"Heat drives active evaporation from the lake.":"Water remains mostly calm while humidity builds.";}stage.querySelectorAll("[data-control]").forEach(input=>input.oninput=update);update();
  }
  function draw(){if(active==="circuit")circuit();if(active==="springs")springs();if(active==="projectile")projectile();if(active==="selection")selection();if(active==="water")water();}
  lab.querySelector(".science-sim-finish").onclick=()=>{LR.savedResponse={simulations:simulations.map(item=>item[0])};LR.lastAnswer="Five science simulations explored";lessonCorrect("Science lab complete!","You explored five interactive science simulations.");clearTimeout(LR_CORRECT_ADVANCE_TIMER);LR_CORRECT_ADVANCE_TIMER=null;$("lrNextBtn").disabled=false;};
  $("lrChoices").appendChild(lab);tabBar();draw();
}

let ATOM_BUILD_COUNTS={};
let ATOM_BUILD_REDRAW=null;
const ATOM_DETAILS={
  H:[1,"Hydrogen"],He:[2,"Helium"],Li:[3,"Lithium"],C:[6,"Carbon"],N:[7,"Nitrogen"],O:[8,"Oxygen"],F:[9,"Fluorine"],Na:[11,"Sodium"],Mg:[12,"Magnesium"],S:[16,"Sulfur"],Cl:[17,"Chlorine"],K:[19,"Potassium"],Ca:[20,"Calcium"]
};
function renderAtomBuild(q){
  ATOM_BUILD_COUNTS={};
  const atomHistory=[];
  $("lrCheckBtn").classList.remove("d-none");
  $("lrCheckBtn").textContent="Check molecule";
  const lab=document.createElement("section");
  lab.className=`atom-lab atom-shape-${q.moleculeShape||"cluster"}`;
  lab.style.setProperty("--molecule-hue",String(q.themeHue||205));
  const modelAtoms=[];Object.entries(q.atoms||{}).forEach(([symbol,count])=>{for(let index=0;index<count;index++)modelAtoms.push(symbol);});
  const model=modelAtoms.map((symbol,index)=>{const angle=(Math.PI*2*index/Math.max(1,modelAtoms.length))-Math.PI/2,radius=q.moleculeShape==="linear"?0:Math.min(34,14+modelAtoms.length*3),x=q.moleculeShape==="linear"?18+index*(64/Math.max(1,modelAtoms.length-1)):50+Math.cos(angle)*radius,y=q.moleculeShape==="linear"?50:50+Math.sin(angle)*radius;return `<i class="molecule-node atom-${symbol.toLowerCase()}" style="left:${x}%;top:${y}%">${htmlSafe(symbol)}</i>`;}).join("");
  lab.innerHTML=`<div class="atom-lab-heading"><div><span class="atom-lab-kicker">Molecule ${Number(q.moleculeIndex||0)+1} of 25</span><h3>${htmlSafe(q.name||"Molecule")} Assembly</h3><p>Build the exact composition, inspect its unique model, and check conservation atom by atom.</p></div><strong class="atom-formula-goal">Goal: ${htmlSafe(q.formula||"")}</strong></div><div class="molecule-blueprint"><div class="molecule-bonds"></div>${model}<b>${htmlSafe(q.moleculeShape||"molecular")} model</b></div><div class="atom-tray" tabindex="0" role="group" aria-label="Selected atoms"><span class="atom-tray-empty">Drag atoms into the assembly chamber</span></div><div class="atom-formula-preview" aria-live="polite">Your formula: —</div><div class="atom-lab-actions"><button type="button" class="btn btn-main atom-undo">Undo atom</button><button type="button" class="btn btn-main atom-clear">Clear tray</button><button type="button" class="btn btn-main atom-hint">Analyze formula</button><span class="atom-count">0 / 24 atoms</span></div><p class="atom-hint-copy" hidden></p><div class="atom-palette" role="list" aria-label="Elements"></div>`;
  const tray=lab.querySelector(".atom-tray");
  const palette=lab.querySelector(".atom-palette");
  const symbols=[...new Set([...Object.keys(q.atoms||{}),"H","C","N","O","Na","Cl","S","Ca"])].slice(0,10);
  function drawTray(){
    tray.innerHTML="";
    let total=0;
    Object.entries(ATOM_BUILD_COUNTS).forEach(([symbol,count])=>{
      for(let index=0;index<count;index++){
        total++;
        const atom=document.createElement("button");
        atom.type="button";atom.className=`atom-chip atom-${symbol.toLowerCase()}`;
        atom.textContent=symbol;atom.setAttribute("aria-label",`Remove one ${ATOM_DETAILS[symbol]?.[1]||symbol} atom`);
        atom.onclick=()=>{ATOM_BUILD_COUNTS[symbol]--;atomHistory.push({symbol,action:"remove"});drawTray();};
        tray.appendChild(atom);
      }
    });
    if(!total) tray.innerHTML='<span class="atom-tray-empty">Add atoms here</span>';
    lab.querySelector(".atom-count").textContent=`${total} / 24 atoms`;
    lab.querySelector(".atom-formula-preview").textContent=`Your formula: ${Object.entries(ATOM_BUILD_COUNTS).filter(([,count])=>count).map(([symbol,count])=>symbol+(count>1?String(count).replace(/0/g,'₀').replace(/1/g,'₁').replace(/2/g,'₂').replace(/3/g,'₃').replace(/4/g,'₄').replace(/5/g,'₅').replace(/6/g,'₆').replace(/7/g,'₇').replace(/8/g,'₈').replace(/9/g,'₉'):'')).join('')||'—'}`;
    lab.classList.remove("needs-review");
  }
  function add(symbol){
    const total=Object.values(ATOM_BUILD_COUNTS).reduce((sum,count)=>sum+count,0);
    if(total>=24)return;
    ATOM_BUILD_COUNTS[symbol]=Number(ATOM_BUILD_COUNTS[symbol]||0)+1;atomHistory.push({symbol,action:"add"});drawTray();
  }
  ATOM_BUILD_REDRAW=drawTray;
  symbols.forEach(symbol=>{
    const detail=ATOM_DETAILS[symbol]||["?",symbol];
    const button=document.createElement("button");
    button.type="button";button.className=`atom-element atom-${symbol.toLowerCase()}`;button.draggable=true;button.dataset.symbol=symbol;
    button.innerHTML=`<small>${detail[0]}</small><strong>${symbol}</strong><span>${detail[1]}</span>`;
    button.onclick=()=>add(symbol);
    button.addEventListener("dragstart",event=>event.dataTransfer.setData("text/plain",symbol));
    palette.appendChild(button);
  });
  tray.addEventListener("dragover",event=>event.preventDefault());
  tray.addEventListener("drop",event=>{event.preventDefault();const symbol=event.dataTransfer.getData("text/plain");if(symbols.includes(symbol))add(symbol);});
  lab.querySelector(".atom-undo").onclick=()=>{const last=atomHistory.pop();if(!last)return;ATOM_BUILD_COUNTS[last.symbol]=Math.max(0,Number(ATOM_BUILD_COUNTS[last.symbol]||0)+(last.action==="add"?-1:1));drawTray();};
  lab.querySelector(".atom-clear").onclick=()=>{ATOM_BUILD_COUNTS={};atomHistory.length=0;drawTray();};
  lab.querySelector(".atom-hint").onclick=()=>{const hint=lab.querySelector(".atom-hint-copy");hint.hidden=!hint.hidden;hint.textContent=`Hint: ${q.formula} needs ${Object.values(q.atoms||{}).reduce((sum,count)=>sum+count,0)} atoms total. Read each subscript carefully.`;};
  $("lrChoices").appendChild(lab);
  drawTray();
}

function bankQuestion(items, audioText){
  const it = pick(items);
  if(it.bad && it.good) return editSentenceQuestion(it.bad, it.good);
  if(it.pairs) return matchQuestion(it.pairs);
  if(it.fill) return fillBlankQuestion(it.q, it.a, audioText);
  if(it.type === "selectall") return { type:"selectall", q:it.q, choices:it.choices, answers:it.answers, audio:audioText || it.q };
  if(it.type === "order") return { type:"order", q:it.q, items:it.items, audio:audioText || it.q };
  if(it.type === "truefalse") return { type:"truefalse", q:it.q, answer:!!it.answer, audio:audioText || it.q };
  return mcQuestion(it.q, it.a, it.w || ["Try again","Not this one"], audioText || it.q);
}

function g4Question(items, audioText){ return bankQuestion(items, audioText); }
function g5Question(items, audioText){ return bankQuestion(items, audioText); }
function g6ExtraQuestion(items, audioText){ return bankQuestion(items, audioText); }
