/* Exact TEKS course contracts, installed after the complete curriculum loads. */
function installTeksLessonContracts(){
  const audit={total:0,aligned:0,unmapped:[]};
  Object.entries(CURR).forEach(([grade,subjects])=>{
    Object.entries(subjects||{}).forEach(([subject,lessons])=>{
      if(!lessons||typeof lessons!=="object") return;
      Object.entries(lessons).forEach(([lessonId,pack])=>{
        if(lessonId==="showName"||!pack||typeof pack!=="object") return;
        audit.total++;
        const course=TEKS_COURSES[grade]?.[subject];
        if(!course||typeof pack.gen!=="function"){
          audit.unmapped.push(`${grade}:${subject}:${lessonId}`);
          return;
        }

        const generator=pack.gen;
        let sample=null;
        try{ sample=generator(); }
        catch(error){ console.warn(`Could not sample ${grade}:${subject}:${lessonId} while installing its TEKS contract.`,error); }
        const generatedExpectation=sample?.teksStudentExpectation||sample?.teksExpectation||sample?.teks||{};
        pack.teks={
          ...(pack.teks||{}),
          code:pack.teks?.code||course[0],
          course:pack.teks?.course||course[1],
          expectation:pack.teks?.expectation||generatedExpectation.code||generatedExpectation.expectation||"",
          expectationText:pack.teks?.expectationText||generatedExpectation.text||generatedExpectation.expectationText||"",
          strand:pack.teks?.strand||teksStrandForLesson(subject,pack.name),
          source:pack.teks?.source||generatedExpectation.source||TEKS_SUBJECTS[subject]?.href||""
        };

        pack.gen=function(){
          const question=generator();
          if(!question||typeof question!=="object"||!question.q) throw new Error(`Invalid TEKS lesson generator: ${grade}:${subject}:${lessonId}`);
          const difficulty=lessonDifficultyForRound();
          question.difficulty=difficulty.level;
          question.difficultyLabel=difficulty.label;
          const explanation=String(question.explain||question.explanation||"").replace(/\s+/g," ").trim();
          if(explanation.length<20){
            const answer=question.type==="truefalse"
              ? (question.answer?"true":"false")
              : String(question.answer??question.answers?.[0]??"the stated answer");
            const separator=explanation?(/[.!?]$/.test(explanation)?" ":". "):"";
            question.explain=`${explanation}${separator}The correct response is “${answer}” because it satisfies the evidence and conditions in this ${pack.name} question.`;
          }
          question.teks=pack.teks;
          question.lessonId=`${grade}:${subject}:${lessonId}`;
          return question;
        };
        audit.aligned++;
      });
    });
  });
  window.LEARNMASTER_TEKS_AUDIT=audit;
  if(audit.unmapped.length) console.error("Unmapped TEKS lessons",audit.unmapped);
  else console.info(`TEKS contracts installed for ${audit.aligned} lessons.`);
  return audit;
}
installTeksLessonContracts();
