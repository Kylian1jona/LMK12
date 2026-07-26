/* Final 25-question curriculum release guard.
   Load after every lesson pack and the TEKS contract wrapper. */
(function installCurriculumRelease(){
  "use strict";

  const RELEASE="teks25-20260722.1";
  const STAGES=Object.freeze(["Foundation","Apply","Reason","Challenge","Mastery"]);

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
    if(!question||!String(question.q||"").trim()) return `${key} round ${round} returned no question`;
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

  function syncLessonSelectorLabels(root=document){
    if(!root?.querySelectorAll) return 0;
    let updated=0;
    root.querySelectorAll('button[onclick*="startLesson("]').forEach(button=>{
      const call=button.getAttribute("onclick")||"";
      const match=call.match(/startLesson\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/);
      if(!match) return;
      const pack=CURR?.[match[1]]?.[match[2]]?.[match[3]];
      const label=String(pack?.name||"").trim();
      if(!label) return;
      const current=String(button.textContent||"").replace(/\s+/g," ").trim();
      if(current===label) return;
      const preserved=[...button.children].filter(child=>child.matches?.(".lesson-selector-medal,.lesson-medal-count"));
      button.replaceChildren();
      const labelNode=document.createElement("span");
      labelNode.className="lesson-selector-current-label";
      labelNode.textContent=label;
      button.append(labelNode,...preserved);
      button.setAttribute("aria-label",label);
      updated++;
    });
    return updated;
  }

  const audit={release:RELEASE,lessons:0,questions:0,failures:[],stages:Object.fromEntries(STAGES.map(stage=>[stage,0]))};
  Object.entries(CURR).forEach(([grade,subjects])=>{
    Object.entries(subjects||{}).forEach(([subject,lessons])=>{
      Object.entries(lessons||{}).forEach(([lessonId,pack])=>{
        if(lessonId==="showName"||!pack||typeof pack.gen!=="function") return;
        const key=`${grade}:${subject}:${lessonId}`;
        delete pack.image;
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

  audit.selectorLabelsUpdated=syncLessonSelectorLabels();
  window.LEARNMASTER_CURRICULUM_RELEASE=RELEASE;
  window.LEARNMASTER_CURRICULUM_RELEASE_AUDIT=Object.freeze(audit);
  window.LEARNMASTER_CURRICULUM_TOOLS=Object.freeze({STAGES,questionSignature,syncLessonSelectorLabels});
  if(audit.failures.length) console.error("Updated curriculum release blocked",audit.failures);
  else console.info(`${RELEASE}: ${audit.lessons} verified lessons and ${audit.questions} lesson-owned questions ready.`);
})();
