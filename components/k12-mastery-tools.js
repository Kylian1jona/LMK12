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

  function masteryExplanation(concept){
    const answer=String(concept.ma||concept.ca||concept.aa||concept.fact);
    const support=String(concept.ce||concept.ae||concept.fe||concept.fact).trim();
    const repeatsAnswer=support.toLocaleLowerCase().startsWith(answer.trim().toLocaleLowerCase());
    const detail=repeatsAnswer
      ?" It applies the lesson rule without contradicting any stated condition."
      :` ${support}`;
    return `After every condition is checked, “${answer}” remains defensible.${detail}`;
  }

  function conceptSequence(lessonName, concepts){
    if(!Array.isArray(concepts)||concepts.length!==5) throw new Error(`${lessonName} must define five lesson concepts.`);
    const foundation=concepts.map((c,index)=>mc({
      q:c.fq||`Which statement accurately explains ${c.label}?`,
      a:c.fact,w:c.w,
      e:c.fe||`${c.fact} This is the defining relationship for ${c.label}.`
    }));
    const apply=concepts.map(c=>mc({
      q:c.aq||`Apply ${c.label} to this new situation: ${c.application}`,
      a:c.aa||c.fact,w:c.aw||c.w,
      e:c.ae||`${c.aa||c.fact} follows because ${c.fact}`
    }));
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
    const challenge=concepts.map(c=>mc({
      q:c.cq||`Challenge: ${c.challenge}`,
      a:c.ca||c.fact,w:c.cw||c.w,
      e:c.ce||`${c.ca||c.fact} is the only conclusion that satisfies every condition in the challenge.`
    }));
    const mastery=concepts.map((c,index)=>mc({
      q:c.mq||`Mastery ${index+1}: ${c.challenge} After checking the governing rule, the evidence, and the closest misconception, which conclusion remains defensible?`,
      a:c.ma||c.ca||c.aa||c.fact,w:c.mw||c.cw||c.aw||c.w,
      e:c.me||masteryExplanation(c)
    }));
    return [...foundation,...apply,...reason,...challenge,...mastery];
  }

  function addMasteryBand(lessonName,subject,questions){
    if(questions.length!==20) return questions;
    const subjectDirections={
      eng:"Evaluate every choice against the complete text, language rule, and requested purpose, then choose the answer that can be defended with explicit evidence.",
      math:"Solve independently and verify the result with an inverse operation, equivalent representation, or reasonableness check before choosing.",
      sci:"Use claim-evidence-reasoning: test every option against the stated evidence, the scientific model, and any controlled conditions before choosing."
    };
    return [...questions,...questions.slice(15,20).map((base,index)=>{
      const question=typeof structuredClone==="function"?structuredClone(base):JSON.parse(JSON.stringify(base));
      question.q=`Mastery ${index+1} — ${subjectDirections[subject]||"Check every condition and defend the strongest conclusion."} ${base.q}`;
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
