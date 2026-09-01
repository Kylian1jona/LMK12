(function(){
  window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  const lessons={
    "g11:eng:L1":{name:"Literary Interpretation",facts:[["motif","A recurring image or idea can develop a theme across a text."],["subtext","Subtext is meaning suggested beneath what characters explicitly say."],["unreliable narrator","An unreliable narrator gives readers reasons to question the account."],["historical context","Historical context can shape a text's conflicts, language, and assumptions."],["ambiguity","Ambiguity allows more than one well-supported interpretation."]]},
    "g11:eng:L2":{name:"Argument & Research",facts:[["claim","A precise claim states a position that evidence and reasoning can support."],["counterclaim","A counterclaim presents a relevant challenge that a writer should answer fairly."],["source credibility","Credibility depends on expertise, evidence, methods, currency, and possible bias."],["synthesis","Synthesis connects ideas from multiple sources instead of listing summaries."],["citation","A citation credits a source and lets a reader locate the evidence."]]},
    "g11:math:L1":{name:"Functions & Modeling",facts:[["domain","The domain is the set of allowable input values for a function."],["range","The range is the set of output values a function can produce."],["inverse function","An inverse function reverses the input-output relationship on a suitable domain."],["exponential model","An exponential model changes by a constant factor over equal intervals."],["residual","A residual is the observed value minus the value predicted by a model."]]},
    "g11:math:L2":{name:"Statistics & Probability",facts:[["random sample","A random sample gives population members a known chance of selection."],["confounding variable","A confounding variable is related to both an explanatory variable and an outcome."],["standard deviation","Standard deviation describes typical distance from the mean."],["conditional probability","Conditional probability measures an event given that another event occurred."],["margin of error","A margin of error describes expected sampling uncertainty around an estimate."]]},
    "g11:sci:L1":{name:"Scientific Systems",facts:[["system boundary","A system boundary defines what is included in an investigation."],["feedback loop","A feedback loop occurs when a system's output influences later behavior."],["energy transfer","Energy can move between objects or forms while total energy is conserved."],["equilibrium","Dynamic equilibrium balances opposing processes without requiring all motion to stop."],["emergent property","An emergent property arises from interactions among parts of a system."]]},
    "g11:sci:L2":{name:"Evidence & Investigation",facts:[["control group","A control group provides a comparison for the tested treatment."],["replication","Replication tests whether a result can be obtained again."],["measurement uncertainty","Measurement uncertainty describes a reasonable range around a measured value."],["correlation","Correlation describes association but does not by itself establish causation."],["peer review","Peer review lets qualified researchers examine methods and reasoning before publication."]]},
    "g11:hist:L1":{name:"Government & Civic Life",facts:[["rule of law","Rule of law means public power is exercised under established laws."],["federalism","Federalism divides governing authority between national and regional governments."],["civil liberty","A civil liberty protects individual freedom from improper government interference."],["due process","Due process requires fair legal procedures before government deprives a person of protected interests."],["civic participation","Civic participation includes informed actions people take to influence community life."]]},
    "g11:hist:L2":{name:"Historical Change & Evidence",facts:[["primary source","A primary source was created during the period or by a participant being studied."],["corroboration","Corroboration compares independent evidence to test a historical claim."],["continuity","Continuity identifies features that persist while other conditions change."],["turning point","A turning point marks a significant change in direction, not the only cause of later events."],["historical argument","A historical argument connects a defensible claim to contextualized evidence and reasoning."]]}
  };
  function questionsFor(record){
    const prompts=[
      term=>`Which statement best defines ${term}?`,
      term=>`A student encounters ${term} in a new problem. Which principle should guide the analysis?`,
      term=>`Which explanation of ${term} is accurate?`,
      term=>`Which statement would be the strongest note to record about ${term}?`,
      term=>`A class discussion confuses ${term} with an unrelated idea. Which correction is best?`
    ];
    return record.facts.flatMap(([term,answer],factIndex)=>prompts.map((prompt,variant)=>{
      const other=record.facts[(factIndex+(variant%4)+1)%record.facts.length][1];
      const wrong=[other,`${term} removes the need to examine evidence or conditions.`,`${term} always produces one certain result in every context.`];
      const choices=wrong.slice();
      choices.splice((factIndex+variant)%4,0,answer);
      return {type:"mc",q:prompt(term),choices,answer,explain:answer,audio:`Review ${term}.`};
    }));
  }
  Object.entries(lessons).forEach(([key,record])=>{ window.K12_CLASSIC_25_DATA[key]={name:record.name,questions:questionsFor(record)}; });
})();
