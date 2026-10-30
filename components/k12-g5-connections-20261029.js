/* Thirty Grade 5 cross-skill lessons: ten each in English, Math, and Science. */
(function(){
  const plans={
    eng:[
      ['L25','L15','L16','Theme and Text Comparisons'],
      ['L26','L16','L17','Words Across Texts'],
      ['L27','L17','L18','Word Parts and Sentences'],
      ['L28','L18','L19','Sentences in Arguments'],
      ['L29','L19','L20','Arguments and Viewpoint'],
      ['L30','L20','L21','Viewpoint in Summaries'],
      ['L31','L21','L22','Summaries and Text Structure'],
      ['L32','L22','L23','Structure and Revision'],
      ['L33','L23','L24','Revising Research Writing'],
      ['L34','L24','L15','Research Evidence and Theme']
    ],
    math:[
      ['L22','L12','L13','Decimals and Fractions'],
      ['L23','L13','L14','Fraction Operations'],
      ['L24','L14','L15','Fractions and Volume'],
      ['L25','L15','L16','Measurement and Coordinates'],
      ['L26','L16','L17','Coordinates and Powers of Ten'],
      ['L27','L17','L18','Place Value and Expressions'],
      ['L28','L18','L19','Expressions and Shapes'],
      ['L29','L19','L20','Shapes and Measurement'],
      ['L30','L20','L21','Conversions and Data'],
      ['L31','L21','L12','Data and Decimal Reasoning']
    ],
    sci:[
      ['L22','L12','L13','Ecosystems and Matter'],
      ['L23','L13','L14','Matter and Earth Systems'],
      ['L24','L14','L15','Earth and Space Systems'],
      ['L25','L15','L16','Orbits and Evidence'],
      ['L26','L16','L17','Designs and Plant Growth'],
      ['L27','L17','L18','Plants and Properties of Matter'],
      ['L28','L18','L19','Matter and Energy Transfer'],
      ['L29','L19','L20','Energy and Space Patterns'],
      ['L30','L20','L21','Space and Resources'],
      ['L31','L21','L12','Resources and Ecosystems']
    ]
  };
  const data=window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  function firstFive(key){
    const record=data[key];
    if(!record)throw Error(`Missing Grade 5 source ${key}`);
    const picked=[];
    for(const q of record.questions||[]){
      if(q.type==='mc'&&Array.isArray(q.choices)&&q.choices.length>=4&&q.choices.includes(q.answer)&&!picked.some(item=>item.q===q.q))picked.push(q);
      if(picked.length===5)break;
    }
    if(picked.length!==5)throw Error(`${key} does not have five distinct multiple-choice prompts`);
    return picked;
  }
  function addLessons(){
    if(data['g5:eng:L25']?.contentVersion==='g5-connections-20261029.2')return;
    for(const [subject,lessons] of Object.entries(plans)){
      for(const [id,leftId,rightId,name] of lessons){
        const key=`g5:${subject}:${id}`;
        if(data[key])throw Error(`Duplicate Grade 5 lesson ${key}`);
        const left=firstFive(`g5:${subject}:${leftId}`);
        const right=firstFive(`g5:${subject}:${rightId}`);
        const questions=[];
        for(let i=0;i<5;i++)for(let j=0;j<5;j++){
          const a=left[i],b=right[j];
          const falseA=a.choices.filter(choice=>choice!==a.answer);
          const falseB=b.choices.filter(choice=>choice!==b.answer);
          const answer=`A: ${a.answer} | B: ${b.answer}`;
          const choices=[answer,`A: ${falseA[0]} | B: ${b.answer}`,`A: ${a.answer} | B: ${falseB[0]}`,`A: ${falseA[1]} | B: ${falseB[1]}`];
          const offset=(i+j)%4;
          const q=`1. ${a.q}\n2. ${b.q}`;
          const audio=`First prompt: ${a.q} Second prompt: ${b.q}`;
          const explain=`A: ${a.explain||a.answer} B: ${b.explain||b.answer}`;
          const mode=questions.length%5;
          if(mode===0)questions.push({type:'mc',q,choices:choices.slice(offset).concat(choices.slice(0,offset)),answer,explain,audio});
          else if(mode===1)questions.push({type:'dropdown',q,choices:choices.slice(offset).concat(choices.slice(0,offset)),answer,explain,audio});
          else if(mode===2){
            const answers=[`A: ${a.answer}`,`B: ${b.answer}`];
            const options=[...answers,`A: ${falseA[0]}`,`A: ${falseA[1]}`,`B: ${falseB[0]}`,`B: ${falseB[1]}`];
            const shift=(i+j)%6;
            questions.push({type:'selectall',q:`Select two correct answers, one for each question.\n1. ${a.q}\n2. ${b.q}`,choices:options.slice(shift).concat(options.slice(0,shift)),answers,requiredSelections:2,audio});
          }else if(mode===3){
            const candidates=[a,b,...left.slice(i+1),...right.slice(j+1),...left.slice(0,i),...right.slice(0,j)];
            const pairs=[];
            for(const item of candidates){
              if(!pairs.some(pair=>pair.match===item.answer))pairs.push({word:item.q,match:item.answer});
              if(pairs.length===4)break;
            }
            if(pairs.length!==4)throw Error(`${key} has too few distinct matching answers`);
            questions.push({type:'drag',q:'Connect each prompt to its answer.',pairs,audio:'Match each prompt to its answer. Drag or tap the cards.'});
          }else{
            const source=String(a.answer).length<=String(b.answer).length?a:b;
            const full=String(source.answer).trim();
            if(full.length<=32){
              questions.push({type:'fill',q:`${source.q}\nAnswer: ____`,answer:full,placeholder:'Type the answer',audio:source.q,explain:source.explain||full});
            }else{
              const words=full.match(/[A-Za-z]{5,}/g)||[];
              const missing=words.sort((x,y)=>y.length-x.length)[0];
              if(!missing)throw Error(`${key} cannot make a fill-in question`);
              questions.push({type:'fill',q:`${source.q}\nComplete the idea: ${full.replace(missing,'____')}`,answer:missing,placeholder:'Type the missing word',audio:source.q,explain:source.explain||full});
            }
          }
        }
        data[key]={name,topic:subject==='eng'?'Reading and Writing Connections':subject==='math'?'Math Connections':'Science Connections',contentVersion:'g5-connections-20261029.2',questions};
      }
    }
  }
  function renderMenus(){
    for(const [subject,lessons] of Object.entries(plans)){
      const container=document.querySelector(`#g5-${subject} .lesson-columns`);
      if(!container||container.dataset.connectionsAdded==='true')continue;
      container.dataset.connectionsAdded='true';
      for(let group=0;group<2;group++){
        const column=document.createElement('div');
        column.className='lesson-column';
        const title=group===0?'Connect Skills':'Apply Skills';
        const description=group===0?'Practice connected Grade 5 skills.':'Build confidence with reading, math, and science ideas.';
        column.innerHTML=`<h3>${title}</h3><p>${description}</p>${lessons.slice(group*5,group*5+5).map(([id,,,name])=>`<button type="button" class="btn btn-main" onclick="startLesson('g5','${subject}','${id}')">${name}</button>`).join('')}`;
        container.appendChild(column);
      }
    }
  }
  window.K12AddGrade5Connections=addLessons;
  window.K12_G5_CONNECTION_PLANS=plans;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',renderMenus,{once:true});
  else renderMenus();
})();
