/* Integrated Grade 11–12 practice and interactive lessons. */
(function(){
  const classic=window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  const interactive=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  const metadata=[];
  const plans={
    g11:{
      eng:[['L3','L5','Claims and Evidence Connections'],['L4','L6','Literary Craft Connections']],
      math:[['L9','L13','Polar Models in Context'],['L10','L14','Sequence Reasoning'],['L11','L15','Probability Decisions'],['L12','L16','Matrix Applications']],
      sci:[['L3','L5','Cell Systems Connections'],['L4','L6','Chemical and Wave Connections']],
      hist:[['L3','L5','Constitutional Reasoning'],['L4','L6','Reform and Industry Connections']]
    },
    g12:{
      eng:[['L3','L5','Source Synthesis Connections'],['L4','L6','Writing and Literature Connections']],
      math:[['L9','L13','Integration in Context'],['L10','L14','Optimization Reasoning'],['L11','L15','Series Decisions'],['L12','L16','Change Models']],
      sci:[['L3','L5','Genetics in Context'],['L4','L6','Climate Evidence Connections']],
      hist:[['L3','L5','Global Systems Connections'],['L4','L6','Civic Evidence Connections']]
    }
  };
  const different=(q)=>q.choices.filter(choice=>choice!==q.answer);
  const rotate=(items,n)=>items.slice(n%items.length).concat(items.slice(0,n%items.length));
  for(const [grade,subjects] of Object.entries(plans)){
    for(const [subject,records] of Object.entries(subjects)){
      for(const [sourceId,newId,name] of records){
        const source=classic[`${grade}:${subject}:${sourceId}`];
        if(!source||source.questions.length!==25) throw Error(`Missing source for ${grade}:${subject}:${newId}`);
        const questions=source.questions.map((first,i)=>{
          const second=source.questions[(i+7)%25];
          const wrongA=different(first),wrongB=different(second);
          const answer=`1: ${first.answer} | 2: ${second.answer}`;
          const choices=rotate([
            answer,
            `1: ${wrongA[0]} | 2: ${second.answer}`,
            `1: ${first.answer} | 2: ${wrongB[0]}`,
            `1: ${wrongA[1]} | 2: ${wrongB[1]}`
          ],i);
          return {type:'mc',q:`Answer both prompts, then choose the correct pair.\n1. ${first.q}\n2. ${second.q}`,choices,answer,audio:`Answer both prompts. First: ${first.q} Second: ${second.q}`,explain:`1. ${first.explain} 2. ${second.explain}`};
        });
        const key=`${grade}:${subject}:${newId}`;
        if(classic[key]) throw Error(`Duplicate lesson ${key}`);
        classic[key]={name,topic:source.topic,contentVersion:'senior-more-20261024.1',questions};
      }
    }
  }
  function add(grade,subject,slug,title,questions){
    const key=`${grade}:${subject}:${slug}`;
    if(interactive[key]||questions.length!==25) throw Error(`Invalid lesson ${key}`);
    interactive[key]={name:title,questions,contentVersion:'senior-more-20261024.1'};
    metadata.push({key,grade,subject,title,description:'Practice this skill with 25 questions.'});
  }
  function dropdown(grade,subject,sourceId,slug,title){
    const source=classic[`${grade}:${subject}:${sourceId}`];
    add(grade,subject,slug,title,source.questions.map((q,i)=>({type:'dropdown',q:q.q,audio:q.audio||q.q,choices:rotate(q.choices,i),answer:q.answer,explain:q.explain})));
  }
  function checkbox(grade,subject,sourceId,slug,title){
    const source=classic[`${grade}:${subject}:${sourceId}`];
    add(grade,subject,slug,title,source.questions.map((first,i)=>{
      const second=source.questions[(i+9)%25];
      const falseA=different(first),falseB=different(second);
      const answers=[`1: ${first.answer}`,`2: ${second.answer}`];
      const choices=rotate([...answers,`1: ${falseA[0]}`,`1: ${falseA[1]}`,`2: ${falseB[0]}`,`2: ${falseB[1]}`],i);
      return {type:'selectall',q:`Select exactly two correct answers, one for each prompt.\n1. ${first.q}\n2. ${second.q}`,audio:`Choose one correct answer for each of these two prompts. First: ${first.q} Second: ${second.q}`,choices,answers,requiredSelections:2};
    }));
  }
  function matching(grade,subject,sourceId,slug,title){
    const source=classic[`${grade}:${subject}:${sourceId}`];
    add(grade,subject,slug,title,source.questions.map((_,i)=>{
      const selected=[];
      for(let offset=0;offset<25&&selected.length<4;offset++){
        const q=source.questions[(i+offset*3)%25];
        if(!selected.some(item=>item.match===q.answer)) selected.push({word:q.q,match:q.answer});
      }
      if(selected.length!==4) throw Error(`Not enough unique matches for ${grade}:${subject}:${slug}`);
      return {type:'drag',q:'Connect each prompt to its answer.',audio:'Match each prompt to its answer. Drag or tap the cards.',pairs:selected};
    }));
  }
  function ranking(grade,slug,title,kind){
    const questions=Array.from({length:25},(_,i)=>{
      let items;
      if(kind==='arithmetic'){
        const start=i-12,step=2+i%6;
        items=Array.from({length:5},(_,j)=>String(start+j*step));
      }else if(kind==='geometric'){
        const start=1+i%5,ratio=2+i%3;
        items=Array.from({length:5},(_,j)=>String(start*ratio**j));
      }else if(kind==='integrals'){
        const scale=i+1;
        items=[1,3,6,10,15].map(value=>String(value*scale));
      }else{
        const scale=i+2;
        items=[1,4,9,16,25].map(value=>String(value*scale));
      }
      return {type:'ranking',q:'Arrange the values from least to greatest.',audio:'Put the values in order from least to greatest. Drag or use the arrow buttons.',items};
    });
    add(grade,'math',slug,title,questions);
  }
  for(const grade of ['g11','g12']){
    if(grade==='g11'){
      dropdown(grade,'eng','L3','argument-choices','Arguments in Context');
      checkbox(grade,'eng','L4','literary-pairs','Poetry and Craft Decisions');
      dropdown(grade,'math','L9','polar-choices','Polar Coordinates Practice');
      checkbox(grade,'math','L11','probability-pairs','Counting and Chance Decisions');
      ranking(grade,'sequence-order','Sequence Values in Order','arithmetic');
      ranking(grade,'growth-order','Growth Patterns in Order','geometric');
      dropdown(grade,'sci','L3','cell-choices','Cell Systems Practice');
      matching(grade,'sci','L4','science-connections','Reactions and Wave Connections');
      dropdown(grade,'hist','L3','civic-choices','Constitutional Ideas Practice');
      matching(grade,'hist','L4','reform-connections','Industrial Change Connections');
    }else{
      dropdown(grade,'eng','L3','source-choices','Research Source Decisions');
      checkbox(grade,'eng','L4','writing-pairs','Writing and Literature Decisions');
      dropdown(grade,'math','L9','integration-choices','Integration Practice');
      checkbox(grade,'math','L10','optimization-pairs','Optimization Decisions');
      ranking(grade,'area-order','Areas in Order','integrals');
      ranking(grade,'growth-area-order','Growth Values in Order','squares');
      dropdown(grade,'sci','L3','genetics-choices','Genetics Decisions');
      matching(grade,'sci','L4','climate-connections','Climate System Connections');
      dropdown(grade,'hist','L3','global-choices','Global Connections Practice');
      matching(grade,'hist','L4','civic-connections','Civic Evidence Connections');
    }
  }
  window.K12_SENIOR_SPECIAL_FORMATS=metadata;
})();
