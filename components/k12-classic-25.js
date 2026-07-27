/* Classic 25-question lesson banks.
   Each grade is loaded only when a learner opens one of its lessons. */
(function(){
  const loadedGrades=new Set();
  const pendingGrades=new Map();
  const release="classic25-20260727.1";

  function cloneQuestion(question){
    if(typeof structuredClone==="function") return structuredClone(question);
    return JSON.parse(JSON.stringify(question));
  }

  function installGrade(grade){
    const data=window.K12_CLASSIC_25_DATA||{};
    const entries=Object.entries(data).filter(([key])=>key.startsWith(`${grade}:`));
    if(!entries.length) throw new Error(`No classic question banks loaded for ${grade}.`);

    entries.forEach(([key,record])=>{
      const [,subject,lesson]=key.split(":");
      const group=CURR?.[grade]?.[subject];
      if(!group) throw new Error(`Missing lesson group ${grade}:${subject}.`);
      const pack=group[lesson]||makeFallbackLessonPack(grade,subject,lesson);
      const questions=Array.isArray(record.questions)?record.questions:[];
      if(questions.length!==25) throw new Error(`${key} must contain exactly 25 questions.`);
      pack.name=record.name||pack.name;
      pack.questions=questions;
      pack.gen=()=>cloneQuestion(questions[Math.max(0,Math.min(24,Number(LR.round||1)-1))]);
      pack.generatorSource="classic-explicit-25";
      group[lesson]=pack;
    });

    loadedGrades.add(grade);
    return entries.length;
  }

  function ensureGrade(grade){
    if(loadedGrades.has(grade)) return Promise.resolve(true);
    if(pendingGrades.has(grade)) return pendingGrades.get(grade);
    const promise=new Promise((resolve,reject)=>{
      const script=document.createElement("script");
      script.src=`components/k12-classic-25-${grade}.js?v=${release}`;
      script.async=true;
      script.onload=()=>{
        try{ installGrade(grade); resolve(true); }
        catch(error){ reject(error); }
      };
      script.onerror=()=>reject(new Error(`Could not load the 25-question bank for ${grade}.`));
      document.head.appendChild(script);
    }).finally(()=>pendingGrades.delete(grade));
    pendingGrades.set(grade,promise);
    return promise;
  }

  window.K12Classic25={
    ensureGrade,
    installGrade,
    isLoaded:grade=>loadedGrades.has(grade),
    release
  };
})();
