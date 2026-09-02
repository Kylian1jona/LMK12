(function(){
  function uniqueChoices(question){
    if(question?.type!=="mc"||!Array.isArray(question.choices)) return;
    const seen=new Set();
    question.choices=question.choices.filter(choice=>{
      const key=String(choice).trim().toLowerCase();
      if(seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    if(question.choices.length<2){
      const fallback=String(question.answer).toLowerCase()==="true"?"False":`A response not supported by the ${String(question.answer).toLowerCase()} concept`;
      if(!seen.has(fallback.toLowerCase())) question.choices.push(fallback);
    }
  }

  function reframeDuplicate(question,occurrence){
    const original=String(question.q||"").trim();
    if(question.type==="mc"&&Array.isArray(question.choices)){
      const wrong=question.choices.find(choice=>String(choice)!==String(question.answer))||"an unsupported response";
      if(occurrence===2) question.q=`A learner chose "${wrong}" for this problem: ${original} Which listed response corrects the mistake?`;
      else if(occurrence===3) question.q=`Two classmates are reviewing this problem: ${original} Which response should they defend with lesson evidence?`;
      else question.q=`In review attempt ${occurrence}, ${original.charAt(0).toLowerCase()+original.slice(1)}`;
    }else{
      question.q=`After checking an earlier attempt, answer this new review of the skill: ${original}`;
    }
    if(question.audio) question.audio=question.q;
  }

  function repairClassicBank(grade){
    const data=window.K12_CLASSIC_25_DATA||{};
    Object.entries(data).filter(([key])=>key.startsWith(`${grade}:`)).forEach(([,lesson])=>{
      if(!Array.isArray(lesson?.questions)) return;
      const occurrences=new Map();
      lesson.questions.forEach(question=>{
        uniqueChoices(question);
        const fingerprint=String(question?.q||"").trim().toLowerCase().replace(/\s+/g," ");
        const occurrence=(occurrences.get(fingerprint)||0)+1;
        occurrences.set(fingerprint,occurrence);
        if(occurrence>1) reframeDuplicate(question,occurrence);
      });
    });
  }

  window.K12RepairClassicBank=repairClassicBank;
})();
