/* Deterministic lesson-owned mastery banks used by the secondary TEKS rebuilds. */
(function installMasteryTools(){
  "use strict";

  function cleanWrongs(answer, values){
    const key=String(answer);
    const seen=new Set([key]);
    const result=[];
    (values||[]).forEach(value=>{
      const text=String(value);
      if(!text||seen.has(text)) return;
      seen.add(text); result.push(text);
    });
    if(result.length!==3) throw new Error(`Mastery item for "${key}" must own exactly three distinct distractors.`);
    return result;
  }

  function mc(item){
    const wrongs=cleanWrongs(item.a,item.w);
    return {type:"mc",q:item.q,choices:[String(item.a),...wrongs],answer:String(item.a),explain:item.e};
  }

  function taskText(value){
    return String(value || "").replace(/\s+/g, " ").trim().replace(/[.!?]+$/, "");
  }

  function sameAnswer(left,right){
    return String(left||"").replace(/\s+/g," ").trim().toLocaleLowerCase()
      ===String(right||"").replace(/\s+/g," ").trim().toLocaleLowerCase();
  }

  function stageContract(concept,stage){
    const fact=String(concept.fact);
    const label=String(concept.label);
    const application=taskText(concept.application);
    const challenge=taskText(concept.challenge);

    if(stage==="apply"){
      const answer=concept.aa||fact;
      const question=concept.aq||(concept.aa
        ?`Which conclusion correctly applies ${label} to “${application}”?`
        :`Which principle about ${label} should guide the answer to “${application}”?`);
      const explanation=concept.ae||(sameAnswer(answer,fact)
        ?`The situation “${application}” is an application of ${label}. ${fact}`
        :`${fact} Applying that principle to “${application}” supports “${answer}.”`);
      return {question,answer,wrongs:concept.aw||concept.w,explanation};
    }

    if(stage==="challenge"){
      const answer=concept.ca||fact;
      const question=concept.cq||(concept.ca
        ?`Which conclusion applies ${label} across every condition in “${challenge}”?`
        :`Which principle about ${label} must guide a correct analysis of “${challenge}”?`);
      const explanation=concept.ce||(sameAnswer(answer,fact)
        ?`The challenge “${challenge}” requires the ${label} relationship. ${fact}`
        :`${fact} Applying that principle across the challenge conditions supports “${answer}.”`);
      return {question,answer,wrongs:concept.cw||concept.w,explanation};
    }

    const hasAuthoredMasteryQuestion=Boolean(concept.mq);
    const answer=concept.ma||(hasAuthoredMasteryQuestion?(concept.ca||concept.aa||fact):fact);
    const question=concept.mq||(concept.ma
      ?`Which conclusion about ${label} remains defensible after “${challenge}” is checked against the lesson principle?`
      :`Which governing principle about ${label} remains valid when “${application}” and “${challenge}” are evaluated together?`);
    const explanation=concept.me||(sameAnswer(answer,fact)
      ?`The application and challenge both test the same ${label} relationship. ${fact}`
      :`${fact} Checking both contexts against that principle supports “${answer}.”`);
    const wrongs=concept.mw||(hasAuthoredMasteryQuestion
      ?concept.cw||concept.aw||concept.w
      :concept.w);
    return {question,answer,wrongs,explanation};
  }

  function conceptSequence(lessonName, concepts){
    if(!Array.isArray(concepts)||concepts.length!==5) throw new Error(`${lessonName} must define five lesson concepts.`);
    const foundation=concepts.map((c,index)=>mc({
      q:c.fq||`Which statement accurately explains ${c.label}?`,
      a:c.fact,w:c.w,
      e:c.fe||`${c.fact} This is the defining relationship for ${c.label}.`
    }));
    const apply=concepts.map(c=>{
      const contract=stageContract(c,"apply");
      return mc({q:contract.question,a:contract.answer,w:contract.wrongs,e:contract.explanation});
    });
    const reason=concepts.map((c,index)=>{
      const isTrue=index%2===0;
      const claim=isTrue?(c.rc||c.fact):(c.falseClaim||c.w[0]);
      return {
        type:"truefalse",
        q:c.rq||`True or false: ${claim}`,
        answer:isTrue,
        explain:isTrue?`True. ${c.re||c.fact}`:`False. ${c.re||c.fact} The claim confuses this with "${c.w[0]}."`
      };
    });
    const challenge=concepts.map(c=>{
      const contract=stageContract(c,"challenge");
      return mc({q:contract.question,a:contract.answer,w:contract.wrongs,e:contract.explanation});
    });
    const mastery=concepts.map(c=>{
      const contract=stageContract(c,"mastery");
      return mc({q:contract.question,a:contract.answer,w:contract.wrongs,e:contract.explanation});
    });
    return [...foundation,...apply,...reason,...challenge,...mastery];
  }

  function addMasteryBand(lessonName,subject,questions){
    if(questions.length!==20) return questions;
    const masteryPrompt={
      eng:base=>`Which answer is best supported by the complete text, language rule, and purpose in “${taskText(base.q)}”?`,
      math:base=>`Which answer solves “${taskText(base.q)}” and remains correct after the result is verified?`,
      sci:base=>`Which answer is supported by the evidence, scientific model, and controlled conditions in “${taskText(base.q)}”?`
    }[subject]||((base)=>`Which answer remains valid after every condition in “${taskText(base.q)}” is checked?`);
    return [...questions,...questions.slice(15,20).map(base=>{
      const question=typeof structuredClone==="function"?structuredClone(base):JSON.parse(JSON.stringify(base));
      question.q=masteryPrompt(base);
      question.explain=`${base.explain} This mastery item also requires a second check: the selected answer must satisfy every condition while the distractors each fail at least one condition.`;
      return question;
    })];
  }

  function installGrade(grade,subject,lessons){
    const course=TEKS_COURSES[grade]?.[subject];
    if(!course) throw new Error(`Missing TEKS course for ${grade}:${subject}`);
    const source=TEKS_SUBJECTS[subject]?.href;
    Object.entries(lessons).forEach(([lessonId,spec])=>{
      const questions=spec.questions?addMasteryBand(spec.name,subject,spec.questions):conceptSequence(spec.name,spec.concepts);
      if(questions.length!==25) throw new Error(`${grade}:${subject}:${lessonId} must own 25 questions.`);
      const signatures=new Set(questions.map(q=>String(q.q).replace(/\s+/g," ").trim()));
      if(signatures.size!==25) throw new Error(`${grade}:${subject}:${lessonId} has duplicate prompts.`);
      if(!questions.some(q=>q.type==="truefalse")) throw new Error(`${grade}:${subject}:${lessonId} needs an authored true/false item.`);
      questions.forEach((question,index)=>{
        if(!question.explain) throw new Error(`${grade}:${subject}:${lessonId} question ${index+1} needs an explanation.`);
        question.difficulty=Math.ceil((index+1)/5);
        question.difficultyLabel=["Foundation","Apply","Reason","Challenge","Mastery"][question.difficulty-1];
      });
      CURR[grade][subject][lessonId]={
        ...(CURR[grade][subject][lessonId]||{}),
        name:spec.name,
        teks:{
          code:course[0],course:course[1],expectation:spec.expectation,
          expectationText:spec.expectationText,strand:spec.strand||teksStrandForLesson(subject,spec.name),source
        },
        gen:()=>progressiveQuestion(questions)
      };
    });
  }

  window.K12MasteryTools=Object.freeze({conceptSequence,addMasteryBand,installGrade});
})();
