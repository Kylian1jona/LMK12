/* Final 25-question curriculum release guard.
   Load after every lesson pack and the TEKS contract wrapper. */
(function installCurriculumRelease(){
  "use strict";

  const RELEASE="current-lessons-20260725.2";
  const STAGES=Object.freeze(["Foundation","Apply","Reason","Challenge","Mastery"]);
  const GENERATED_LEAD=/^(?:undefined\b|Question \d+ of 25\b|Read:|Build the skill:|Apply the skill in context:|Apply grade-level orthographic and syllable patterns|Analyze this event:|Use two clues and reason:|Challenge—analyze the complex example:|Mastery—evaluate the evidence, diagnose errors, and justify the conclusion:|Error analysis:|Evidence synthesis:|Multi-condition reasoning:|Challenge review:|Mastery defense:|Apply the lesson to this evidence:|Challenge source analysis:|Mastery synthesis:|Mastery \d+\s*(?::|—)|Mastery:|Challenge:)/i;
  const STACKED_BOILERPLATE=/\?\s+Which (?:answer|response|conclusion) (?:also |corrects|fits all|addresses|remains|gives|states)/i;

  function questionSignature(question){
    return JSON.stringify([
      String(question?.q||"").replace(/\s+/g," ").trim(),
      question?.answer,
      Array.isArray(question?.answers)?[...question.answers].map(String).sort():null,
      Array.isArray(question?.items)?question.items.map(String):null,
      Array.isArray(question?.pairs)?question.pairs:null,
      Array.isArray(question?.choices)?[...question.choices].map(String).sort():null
    ]);
  }

  function verifyQuestion(question,key,round){
    const prompt=String(question?.q||"").replace(/\s+/g," ").trim();
    if(!question||!prompt) return `${key} round ${round} returned no question`;
    if(prompt.length<10) return `${key} round ${round} returned an incomplete question`;
    if(prompt.length>520) return `${key} round ${round} is too long to read comfortably (${prompt.length} characters)`;
    if(String(question.type||"").toLowerCase()==="truefalse"&&prompt.length>320) return `${key} round ${round} has an overlong true-or-false statement (${prompt.length} characters)`;
    if(GENERATED_LEAD.test(prompt)) return `${key} round ${round} begins with a generated instruction instead of the question`;
    if(STACKED_BOILERPLATE.test(prompt)) return `${key} round ${round} joins a question to a generic second question`;
    if(/§\s*\d|(?:^|\s)\d{1,3}\.\d+\s*\([A-Za-z0-9ivx]+\)/.test(prompt)) return `${key} round ${round} exposes a raw standards code in the student question`;
    if(/\b(?:undefined|null|NaN)\b|\[object Object\]/.test(prompt)) return `${key} round ${round} contains broken generated text`;
    const expectedDifficulty=Math.ceil(round/5);
    if(Number(question.difficulty)!==expectedDifficulty) return `${key} round ${round} has difficulty ${question.difficulty}; expected ${expectedDifficulty}`;
    if(question.difficultyLabel!==STAGES[expectedDifficulty-1]) return `${key} round ${round} has the wrong difficulty label`;
    const explanation=String(question.explain||question.explanation||"").replace(/\s+/g," ").trim();
    if(explanation.length<20) return `${key} round ${round} needs a question-specific explanation`;
    if(question.type==="mc"||question.type==="speed"){
      const choices=(question.choices||[]).map(String);
      if(choices.length!==4||new Set(choices).size!==4||!choices.includes(String(question.answer))) return `${key} round ${round} needs four lesson-owned choices including the answer`;
    }
    if(question.type==="truefalse"&&typeof question.answer!=="boolean") return `${key} round ${round} has an invalid true/false answer`;
    if(round>20&&!/mastery|evaluate|analy|justify|synthesi|defend|verify|compare|evidence|error|reason|multi-step|multiple conditions/i.test(`${question.q} ${explanation}`)){
      return `${key} round ${round} does not require mastery-level reasoning`;
    }
    return "";
  }

  function verifyQuestionBank(pack,key){
    const savedRound=LR.round;
    const seen=new Set();
    try{
      for(let round=1;round<=25;round++){
        LR.round=round;
        const question=pack.gen();
        const repeat=pack.gen();
        const invalid=verifyQuestion(question,key,round);
        if(invalid) return invalid;
        const signature=questionSignature(question);
        if(signature!==questionSignature(repeat)) return `${key} round ${round} is not deterministic`;
        if(seen.has(signature)) return `${key} repeats a question at round ${round}`;
        seen.add(signature);
      }
      return seen.size===25?"":`${key} does not expose 25 questions`;
    }catch(error){
      return `${key} failed release verification: ${error?.message||error}`;
    }finally{
      LR.round=savedRound;
    }
  }

  const audit={release:RELEASE,lessons:0,questions:0,failures:[],stages:Object.fromEntries(STAGES.map(stage=>[stage,0]))};
  Object.entries(CURR).forEach(([grade,subjects])=>{
    Object.entries(subjects||{}).forEach(([subject,lessons])=>{
      Object.entries(lessons||{}).forEach(([lessonId,pack])=>{
        if(lessonId==="showName"||!pack||typeof pack.gen!=="function") return;
        const key=`${grade}:${subject}:${lessonId}`;
        delete pack.image;
        if(pack.generatorSource!=="current-25-question"){
          audit.failures.push(`${key} is not bound to the current lesson catalog`);
          pack.releaseVerified=false;
          return;
        }
        const failure=verifyQuestionBank(pack,key);
        if(failure){
          audit.failures.push(failure);
          pack.releaseVerified=false;
          pack.gen=()=>{ throw new Error(`Updated 25-question bank unavailable for ${key}.`); };
          return;
        }
        const generator=pack.gen;
        pack.curriculumRelease=RELEASE;
        pack.releaseVerified=true;
        pack.gen=function currentQuestionGenerator(){
          const question=generator();
          delete question.image;
          question.curriculumRelease=RELEASE;
          return question;
        };
        audit.lessons++;
        audit.questions+=25;
        STAGES.forEach(stage=>{ audit.stages[stage]+=5; });
      });
    });
  });

  audit.selectorLabelsUpdated=window.K12CurrentLessons?.syncSelectorButtons?.()||0;
  const selectorAudit=window.K12_CURRENT_LESSONS_AUDIT;
  if(window.K12CurrentLessons?.count?.()!==audit.lessons) audit.failures.push("The current lesson catalog and verified release contain different lesson counts");
  if(selectorAudit?.invalidSelectors?.length) audit.failures.push(...selectorAudit.invalidSelectors);
  if(selectorAudit?.duplicateLessonKeys?.length) audit.failures.push(...selectorAudit.duplicateLessonKeys.map(key=>`${key} is registered more than once`));
  window.LEARNMASTER_CURRICULUM_RELEASE=RELEASE;
  window.LEARNMASTER_CURRICULUM_RELEASE_AUDIT=Object.freeze(audit);
  window.LEARNMASTER_CURRICULUM_TOOLS=Object.freeze({STAGES,questionSignature,syncLessonSelectorLabels:window.K12CurrentLessons?.syncSelectorButtons});
  if(audit.failures.length) console.error("Updated curriculum release blocked",audit.failures);
  else console.info(`${RELEASE}: ${audit.lessons} verified lessons and ${audit.questions} lesson-owned questions ready.`);
})();
