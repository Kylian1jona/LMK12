/* K12 lesson runner core
   Split from components/k12-lessons.js. Keep loaded as a classic script.
*/

/* =========================================================
   UNIVERSAL LESSON RUNNER (Grade 2–5 / Eng-Math-Sci)
   - Uses your points system (correctReward / wrongPenalty)
   - Uses your voice system (speakGlobal) with audio per question
========================================================= */

function speakQ(text){
  if(!voiceOn) return;
  if(!text) return;
  speakGlobal(String(text));
}
let __lastQAudio = "";
function setQAudio(text){
  __lastQAudio = String(text || "");
  // Autoplay with small delay considered "safe" after user clicks
  speakQ(__lastQAudio);
}
function lrReplay(){
  safeClick();
  if(__lastQAudio) speakQ(__lastQAudio);
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
  backSection:"grades"
};
let LR_WRONG_ADVANCE_TIMER = null;

function lrAdvanceQuestion(){
  clearTimeout(LR_WRONG_ADVANCE_TIMER);
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
  if(LR.phase !== "lesson" || !LR.current) return;
  LR.revisionQueue.push(cloneRevisionQuestion(LR.current));
}

function lessonCorrect(feedback, rewardMessage){
  if(LR.phase === "lesson"){
    LR.score++;
    correctReward(rewardMessage || feedback);
    $("lrFb").textContent = feedback;
  }else{
    $("lrFb").textContent = "Revision complete — this does not change your score.";
  }
  $("lrNextBtn").disabled = false;
}

function lrWrongMoveOn(feedback = "Not quite. Moving on.", penalty = "", delayMs = 2600){
  clearInterval(SPEED_TIMER);
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
}

/* ---------- Question helpers ---------- */
function shuffle(arr){ return [...arr].sort(()=>Math.random()-0.5); }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function fallbackWrongChoice(answerText, used, index){
  const num = Number(answerText);
  if(Number.isFinite(num) && String(answerText).trim() !== ""){
    const offsets = [1, -1, 2, -2, 5, -5, 10, -10];
    for(const offset of offsets){
      const candidate = String(num + offset);
      if(!used.has(candidate)) return candidate;
    }
  }
  const generic = ["Almost", "Not this one", "Review the clue", "Try another answer", "Keep thinking"];
  for(const candidate of generic){
    if(!used.has(candidate)) return candidate;
  }
  return `Choice ${index + 1}`;
}

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
  while(choices.length < 4){
    const fallback = fallbackWrongChoice(answerText, used, choices.length);
    used.add(fallback);
    choices.push(fallback);
  }
  return shuffle(choices);
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
  if(q.type === "order" && Array.isArray(q.items)) return q.items.join(", ");
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
  if(q.type === "order"){
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
  const parts = [q.q || ""];
  if(q.audio && q.audio !== q.q) parts.push(q.audio);
  if((q.type === "mc" || q.type === "speed") && Array.isArray(q.choices)){
    parts.push("Choices: " + q.choices.join(", ") + ".");
  }
  if(q.type === "selectall" && Array.isArray(q.choices)){
    parts.push("Choose all that apply: " + q.choices.join(", ") + ".");
  }
  if(q.type === "order" && Array.isArray(q.items)){
    parts.push("Put these in order: " + q.items.join(", ") + ".");
  }
  if(q.type === "drag" && Array.isArray(q.pairs)){
    const clues = q.pairs.map(pair=>String(pair.match ?? pair.right ?? ""));
    const items = q.pairs.map(pair=>String(pair.word ?? pair.left ?? ""));
    parts.push("Items: " + items.join(", ") + ".");
    parts.push("Clues: " + clues.join(", ") + ".");
  }
  if(q.type === "match" && Array.isArray(q.pairs)){
    const cards = q.pairs.flatMap(pair=>[String(pair.left ?? ""), String(pair.right ?? "")]).filter(Boolean);
    parts.push("Match these cards: " + cards.join(", ") + ".");
  }
  return parts.filter(Boolean).join(" ");
}

const SUBJECT_LABELS = {
  eng:"English",
  math:"Math",
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
function launchLessonPack(grade, subj, lesson, pack, backSection){
  if(!pack){ toast("Lesson missing"); return; }
  const group=CURR?.[grade]?.[subj];
  if(!group){ toast("Lesson group missing"); return; }
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

  LR.backSection = backSection || `${grade}-${subj}`;

  $("lrDone").classList.add("d-none");
  $("lrQuestionCard")?.classList.remove("d-none");
  $("lrLessonActions")?.classList.remove("d-none");
  $("lrTitle").textContent = LR.title;
  const runner=$("lessonRunner");
  if(runner) runner.dataset.gradeBand=["prek","k","g1"].includes(grade)?"early":"upper";

  show("lessonRunner");
  lrLoadQuestion();
}

async function startLesson(grade, subj, lesson){
  safeClick();
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
  const record=window.K12_EARLY_BANKS?.[key];
  if(!record||!Array.isArray(record.questions)||record.questions.length!==25){
    console.error("Invalid early-grade lesson bank",key,record);
    toast("This lesson is still loading. Please try again.");
    return;
  }
  const [gradeToken,subj,lessonToken]=key.split(":");
  const grade=gradeToken;
  const gradeLabel=grade==="prek"?"Pre-K":grade==="k"?"Kindergarten":"Grade 1";
  if(!CURR[grade]) CURR[grade]={};
  if(!CURR[grade][subj]) CURR[grade][subj]={showName:`${gradeLabel} ${SUBJECT_LABELS[subj]||subj}`};
  const lesson=`EARLY_${lessonToken.replace(/[^a-z0-9]/gi,"_").toUpperCase()}`;
  const questions=record.questions.map(question=>({
    type:"mc",q:String(question.q||"Choose the best answer."),answer:String(question.a),
    choices:[String(question.a),...(question.w||[]).map(String)],audio:String(question.audio||question.q||"")
  }));
  const pack={name:record.name,questions,generatorSource:"early-unified-25"};
  pack.gen=()=>cloneRevisionQuestion(questions[Math.max(0,Math.min(24,Number(LR.round||1)-1))]);
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
  if(!$("lrNextBtn").disabled) return;

  const q = LR.current;
  LR.lastAnswer = String(choice);
  if(String(choice) === String(q.answer)){
    lessonCorrect("🎉 Correct!", "Correct!");
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
      lessonCorrect("🎉 Correct!", "Great matching!");
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
    lessonCorrect("🎉 Correct!", "Correct!");
  }else{
    lrWrongMoveOn(wrongExplanation(q, typed));
  }
}

function lrLoadQuestion(){
  if(LR.phase === "revision"){
    LR.current = LR.revisionQueue.shift();
    LR.revisionIndex++;
    lrRender();
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
  lrRender();
}

function fallbackLessonQuestion(pack){
  return mcQuestion(
    `${pack?.name || "This lesson"}: choose the best practice answer.`,
    "Keep practicing",
    ["Skip the lesson", "Guess without reading"],
    "Keep practicing."
  );
}

function normalizeLessonQuestion(q, pack){
  if(!q || typeof q !== "object") return fallbackLessonQuestion(pack);
  if(!q.type) q.type = Array.isArray(q.choices) ? "mc" : "input";
  if(!q.q) q.q = `${pack?.name || "Lesson"} question`;
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
      : fourChoices(q.answer, normalizedChoices.filter(choice=>choice !== q.answer));
  }
  if((q.type === "input" || q.type === "fill" || q.type === "edit") && (q.answer === undefined || q.answer === null)){
    q.answer = "";
  }
  if(q.type === "match"){
    if(!Array.isArray(q.pairs)) return fallbackLessonQuestion(pack);
    q.type = "drag";
  }
  if(q.type === "drag" && !Array.isArray(q.pairs)) return fallbackLessonQuestion(pack);
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
      : fourChoices(q.answer, normalizedChoices.filter(choice=>choice !== q.answer));
  }
  if(q.type === "truefalse"){
    q.choices = ["True", "False"];
    q.answer = q.answer ? "True" : "False";
    q.type = "mc";
  }
  if(q.type === "selectall"){
    if(!Array.isArray(q.choices) || !Array.isArray(q.answers)) return fallbackLessonQuestion(pack);
  }
  if(q.type === "order"){
    if(!Array.isArray(q.items) || q.items.length < 2) return fallbackLessonQuestion(pack);
  }
  return q;
}

function lrNext(){
  safeClick();
  if($("lrNextBtn").disabled) return;
  lrAdvanceQuestion();
}
function lrFinish(){
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
  launchConfetti(200);
  speakQ("Great job! You finished the lesson!");
}
function lrRestart(){
  safeClick();
  if(typeof restartUniversalLessonTimer==="function") restartUniversalLessonTimer();
  clearTimeout(LR_WRONG_ADVANCE_TIMER);
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
  lrLoadQuestion();
}
function lrBack(){
  safeClick();
  show(LR.backSection || "grades");
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
  img.src = src;
  img.alt = image?.alt || "Lesson image";
  img.style.display = "block";
  frame?.classList.remove("d-none");
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
  LR.lastAnswer = "";
  closeAnswerExplanation();

  const q = LR.current;

  renderLessonImage(q.image || LR.image);
  $("lrQuestion").textContent = q.q || "";
  $("lrChoices").innerHTML = "";
  $("lessonExtra").innerHTML = "";
  if($("lrDragWords")) $("lrDragWords").innerHTML = "";
  if($("lrDropZones")) $("lrDropZones").innerHTML = "";

  if($("lrInput")) $("lrInput").value = "";
  if($("lrInput")){
    $("lrInput").disabled = false;
    $("lrInput").classList.remove("answer-input-wrong");
  }

  $("lrInputWrap").classList.add("d-none");
  if($("lrDragArea")) $("lrDragArea").classList.add("d-none");
  $("lrCheckBtn").classList.add("d-none");

  clearInterval(SPEED_TIMER);

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

  else if(q.type === "speed"){
    renderSpeed(q);
  }

  else if(q.type === "selectall"){
    renderSelectAll(q);
  }

  else if(q.type === "order"){
    renderOrder(q);
  }

  if(typeof setQAudio === "function"){
    setQAudio(lessonQuestionSpeech(q));
  }
}

function lrCheck(){
  safeClick();
  if(!$("lrNextBtn").disabled) return;

  const q = LR.current;
  if(q.type === "drag"){
    const zones = document.querySelectorAll("#lrDropZones .drop-zone");
    let ok = zones.length > 0;
    zones.forEach(zone=>{
      if(zone.dataset.dropped !== zone.dataset.answer) ok = false;
    });
    if(ok){
      lessonCorrect("Correct!", "Great matching!");
    }else{
      LR.lastAnswer = "the current matches";
      showDragCorrections(q);
      lrWrongMoveOn(wrongExplanation(q), "Review the red corrections.", 4500);
    }
    return;
  }

  if(q.type === "selectall"){
    const picked = [...document.querySelectorAll("#lrChoices .selectall-choice:checked")].map(el=>el.value).sort();
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

  const user = $("lrInput").value.trim();
  LR.lastAnswer = user || "No answer";

  let ok = false;

  if(q.type === "input" || q.type === "fill" || q.type === "edit"){
    ok = cleanAnswer(user) === cleanAnswer(q.answer);
  }

  if(ok){
    lessonCorrect("🎉 Correct!", "Correct!");
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
          lessonCorrect("🎉 All matched!", "Great match!");
        }
      }else{
        LR.lastAnswer = `${MATCH_PICK.textContent} with ${b.textContent}`;
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
      lrWrongMoveOn(`Time is up. ${wrongExplanation(q)}`, "Too slow.", 3500);
    }
  },1000);
}

function renderSelectAll(q){
  $("lrCheckBtn").classList.remove("d-none");
  q.choices.forEach(choice=>{
    const label = document.createElement("label");
    label.className = "selectall-card";
    label.innerHTML = `
      <input class="selectall-choice" type="checkbox" value="${htmlSafe(choice)}">
      <span>${htmlSafe(answerOptionLabel(choice))}</span>
    `;
    $("lrChoices").appendChild(label);
  });
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
