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

  function repairClassicBank(grade){
    const data=window.K12_CLASSIC_25_DATA||{};
    Object.entries(data).filter(([key])=>key.startsWith(`${grade}:`)).forEach(([,lesson])=>{
      if(!Array.isArray(lesson?.questions)) return;
      lesson.questions.forEach(uniqueChoices);
    });
  }

  window.K12RepairClassicBank=repairClassicBank;
})();
