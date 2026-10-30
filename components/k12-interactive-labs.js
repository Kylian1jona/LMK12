/* Standalone Grade 7 and Grade 8 investigation labs. */
(function(){
  const data=window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  const labs=[
    ["g7","sci",5,"Virtual Circuit Board","circuit","Build a complete circuit, control the switch, and explain current flow."],
    ["g7","sci",6,"Mass and Springs Lab","springs","Test how mass, stiffness, gravity, and friction change a spring system."],
    ["g7","sci",7,"Projectile Motion Catapult","projectile","Tune angle, speed, and air resistance to reach a target."],
    ["g7","sci",8,"Natural Selection Simulator","selection","Run generations in changing habitats and analyze camouflage."],
    ["g7","sci",9,"Water Cycle Slider","water","Change temperature and humidity to produce water-cycle changes."],
    ["g7","sci",10,"Virtual Microscope","microscope","Compare specimens at different magnifications."],
    ["g7","sci",11,"Density Lab","density","Predict float or sink, test objects, and explain density."],
    ["g7","sci",12,"Food Web Lab","foodweb","Build feeding links and compare the effects of removing a predator."],
    ["g7","sci",13,"Motion and Forces Lab","forces","Control force, mass, friction, and slope, then interpret a motion graph."],
    ["g7","sci",14,"Cell Lab","cell","Compare plant and animal cells by examining structures and functions."],
    ["g7","math",8,"Coordinate Plane Explorer","coordinate","Plot a point, reflect it across the y-axis, and measure its distance from the origin."],
    ["g7","math",9,"Equation Balance Lab","balance","Keep both sides balanced while isolating the variable."],
    ["g7","math",10,"Probability Lab","probability","Generate experimental data with coins, dice, and spinners."],
    ["g7","math",11,"Scale Drawing Studio","scale","Resize plans and calculate model and real dimensions."],
    ["g7","math",12,"Percent Shopping Lab","shopping","Calculate a discount, then apply tax to the sale price."],
    ["g7","hist",6,"Historical Map Explorer","map","Inspect routes and regions to answer questions from map evidence."],
    ["g7","hist",7,"Primary Source Lab","source","Evaluate letters, posters, photographs, and newspapers as evidence."],
    ["g7","hist",8,"Timeline Builder","timeline","Order events and reason about chronology, cause, and effect."],
    ["g7","hist",9,"Artifact Explorer","artifact","Inspect artifact details and infer purpose, period, and significance."],
    ["g7","hist",10,"Government Decision Lab","government","Analyze civic situations, powers, rights, and consequences."],
    ["g7","eng",13,"Story Detective","story","Collect textual evidence to solve an inference mystery."],
    ["g7","eng",14,"Editing Desk","editing","Repair a messy article and explain each edit."],
    ["g7","eng",15,"Build-a-Paragraph","paragraph","Organize a claim, evidence, reasoning, transition, and conclusion."],
    ["g7","eng",16,"Word Workshop","words","Build words from roots and affixes, then infer new meanings."],
    ["g7","eng",17,"Two-Sides Text Lab","twosides","Compare claims, evidence, facts, opinions, and loaded language."]
  ];
  const $=id=>document.getElementById(id);
  const safe=value=>String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const tr=value=>window.k12Translate?window.k12Translate(value):value;
  const copy=(key,values={})=>{
    const language=window.k12CurrentLanguage?window.k12CurrentLanguage():"en";
    const text=({
      en:{ready:"Build or inspect the model, then analyze your evidence.",more:"Complete the required steps before analyzing the model.",inspected:"You inspected {count} evidence items. Compare what each one can prove.",complete:"Model complete. The evidence panel is now unlocked.",order:"Put the parts in the correct order before analyzing.",coin:"Coin results — heads: {a}, tails: {b}.",die:"Die results — average roll: {a}; results: {b}.",spin:"Spinner results — blue: {a}, gold: {b}, green: {c}."},
      es:{ready:"Construye o examina el modelo y luego analiza la evidencia.",more:"Completa los pasos necesarios antes de analizar el modelo.",inspected:"Examinaste {count} elementos de evidencia. Compara lo que demuestra cada uno.",complete:"Modelo completo. El panel de evidencia ya está disponible.",order:"Coloca las partes en el orden correcto antes de analizar.",coin:"Resultados de la moneda — cara: {a}, cruz: {b}.",die:"Resultados del dado — promedio: {a}; resultados: {b}.",spin:"Resultados de la ruleta — azul: {a}, dorado: {b}, verde: {c}."},
      fr:{ready:"Construisez ou examinez le modèle, puis analysez les preuves.",more:"Terminez les étapes requises avant d’analyser le modèle.",inspected:"Vous avez examiné {count} éléments. Comparez ce que chacun peut prouver.",complete:"Modèle terminé. Le panneau d’analyse est maintenant accessible.",order:"Placez les éléments dans le bon ordre avant l’analyse.",coin:"Résultats de la pièce — face : {a}, pile : {b}.",die:"Résultats du dé — moyenne : {a} ; tirages : {b}.",spin:"Résultats de la roue — bleu : {a}, or : {b}, vert : {c}."},
      zh:{ready:"构建或检查模型，然后分析证据。",more:"请完成必要步骤后再分析模型。",inspected:"你检查了 {count} 项证据。比较每项证据能够证明什么。",complete:"模型已完成。证据面板现已解锁。",order:"请先按正确顺序排列各部分。",coin:"硬币结果 — 正面：{a}，反面：{b}。",die:"骰子结果 — 平均点数：{a}；结果：{b}。",spin:"转盘结果 — 蓝色：{a}，金色：{b}，绿色：{c}。"},
      hi:{ready:"मॉडल बनाएँ या जाँचें, फिर प्रमाण का विश्लेषण करें।",more:"मॉडल का विश्लेषण करने से पहले आवश्यक चरण पूरे करें।",inspected:"आपने {count} प्रमाण वस्तुओं की जाँच की। तुलना करें कि प्रत्येक क्या सिद्ध करता है।",complete:"मॉडल पूरा हुआ। प्रमाण पैनल अब खुला है।",order:"विश्लेषण से पहले भागों को सही क्रम में रखें।",coin:"सिक्के के परिणाम — चित: {a}, पट: {b}।",die:"पासे के परिणाम — औसत: {a}; परिणाम: {b}।",spin:"स्पिनर परिणाम — नीला: {a}, सुनहरा: {b}, हरा: {c}।"}
    }[language]||{})[key]||key;
    return Object.entries(values).reduce((result,[name,value])=>result.replaceAll(`{${name}}`,value),text);
  };
  const labNames=Object.fromEntries(labs.map(item=>[item[4],item[3]]));
  const challengeBank={
    circuit:["Why does the bulb light only when the switch is closed?",["A closed path lets current flow","The resistor becomes a battery","The switch creates new energy"],0],
    springs:["Which change produces more spring stretch?",["Adding mass","Increasing stiffness","Reducing gravity"],0],
    projectile:["With the same speed, which launch angle usually gives the longest ideal range?",["45 degrees","10 degrees","80 degrees"],0],
    selection:["Why can a population's common color change over generations?",["Better-camouflaged prey survive and reproduce more","Individuals choose new inherited colors","Predators stop eating"],0],
    water:["What directly powers evaporation in this model?",["Thermal energy","Gravity alone","Low humidity alone"],0],
    microscope:["Why should you refocus after increasing magnification?",["The sharp focal range becomes smaller","The specimen changes species","More light always makes details sharp"],0],
    density:["An object sinks when its density is...",["greater than the liquid's density","less than the liquid's density","unrelated to mass and volume"],0],
    foodweb:["Removing a predator usually causes its prey population to...",["increase at first","disappear instantly","remain mathematically fixed"],0],
    forces:["For the same net force, increasing mass causes acceleration to...",["decrease","increase","stay exactly equal"],0],
    cell:["Which structure controls what enters and leaves both plant and animal cells?",["Cell membrane","Cell wall","Chloroplast"],0],
    coordinate:["Reflecting (x, y) across the y-axis produces...",["(-x, y)","(x, -y)","(-x, -y)"],0],
    balance:["What must happen to preserve an equation's balance?",["Perform the same operation on both sides","Change only the larger side","Remove the variable"],0],
    probability:["Why can experimental probability differ from theoretical probability?",["Random variation, especially in small samples","Theoretical probability changes each roll","Results are never countable"],0],
    scale:["At 1 cm = 4 m, a 6 cm wall represents...",["24 m","10 m","1.5 m"],0],
    shopping:["A 20% discount on $50 removes...",["$10","$20","$40"],0],
    map:["Which evidence best supports a claim about movement?",["A route connecting dated locations","A decorative compass rose","A map border color"],0],
    source:["What should be checked first when evaluating a source?",["Creator, date, audience, and purpose","Whether it agrees with you","Its paper color"],0],
    timeline:["Chronology helps historians determine...",["whether one event could precede and influence another","that later events always caused earlier ones","that every event had one cause"],0],
    artifact:["A worn handle most directly suggests...",["repeated use","the owner's exact name","the artifact was ceremonial"],0],
    government:["Which principle limits each branch with powers held by others?",["Checks and balances","Popular culture","Judicial biography"],0],
    story:["Which evidence most strongly supports an inference?",["A specific action or line of dialogue","A guess unrelated to the text","The reader's favorite ending"],0],
    editing:["Why revise a run-on sentence?",["To clarify relationships between complete ideas","To make it longer","To remove every verb"],0],
    paragraph:["What should reasoning do after evidence?",["Explain how the evidence supports the claim","Repeat the evidence word for word","Introduce an unrelated topic"],0],
    words:["The prefix pre- most often means...",["before","against","again"],0],
    twosides:["A strong comparison of two authors should...",["use evidence from both texts","assume both authors agree","ignore word choice"],0]
  };
  const investigationFrames=[
    "Establish a baseline before changing one variable.","Increase the first control and predict the result.","Decrease the first control and compare the result.","Hold the first variable constant and change the second.","Choose settings that create the greatest visible change.",
    "Choose settings that create the smallest visible change.","Run a trial that tests a cause-and-effect claim.","Repeat the trial with one controlled variable.","Look for evidence that challenges your first prediction.","Compare two conditions and identify the important difference.",
    "Use the diagram to locate the strongest evidence.","Test an extreme setting and describe its limitation.","Return to the midpoint and explain what changed.","Create a fair comparison between two trials.","Use numerical evidence from the model in your explanation.",
    "Identify the independent and dependent variables.","Find a pattern that appears across repeated trials.","Select evidence that supports a cautious conclusion.","Separate an observation from an inference.","Explain how the visual model represents the real system.",
    "Test whether reversing the change reverses the result.","Find a setting that produces an unexpected result.","Use two pieces of evidence to defend a conclusion.","Evaluate one limitation of the simulation.","Complete a final challenge using everything you observed."
  ];
  function makeQuestions(lab,brief,name){
    const [basePrompt,baseChoices,baseCorrect]=challengeBank[lab];
    return investigationFrames.map((frame,index)=>{
      const turn=index%baseChoices.length,choices=baseChoices.slice(turn).concat(baseChoices.slice(0,turn));
      return {type:"interactive-lab",lab,investigation:index+1,q:`Investigation ${index+1}: ${brief}`,challenge:{prompt:basePrompt,choices,correct:(baseCorrect-turn+baseChoices.length)%baseChoices.length},answer:baseChoices[baseCorrect],explain:`The model evidence supports: ${baseChoices[baseCorrect]}.`,audio:`${name}, investigation ${index+1}.`};
    });
  }
  labs.forEach(([grade,subject,number,name,lab,brief])=>{
    data[`${grade}:${subject}:L${number}`]={name,topic:"Interactive Labs",topicNumber:7,lessonInTopic:number,difficulty:"Mastery",contentVersion:"20260910.1",questions:makeQuestions(lab,brief,name)};
  });

  function shell(q){
    const root=document.createElement("section");root.className=`interactive-lab lab-${q.lab}`;
    root.innerHTML=`<header><span>${safe(tr("INTERACTIVE LESSON"))}</span><h3>${safe(tr(labNames[q.lab]||"Learning Lab"))}</h3><p>${safe(tr(q.q))}</p></header><div class="lab-workspace"></div><div class="lab-observation" aria-live="polite">${safe(copy("ready"))}</div><div class="lab-challenge"></div>`;
    return root;
  }
  function controls(workspace,items){workspace.innerHTML=`<div class="lab-controls">${items.map(item=>`<label>${safe(tr(item.label))}<input data-key="${item.key}" type="range" min="${item.min}" max="${item.max}" value="${item.value}"><output>${item.value}</output></label>`).join("")}</div><div class="lab-scene"></div><button type="button" class="lab-run">${safe(tr("Run experiment"))}</button>`;workspace.querySelectorAll("input").forEach(input=>input.oninput=()=>input.nextElementSibling.textContent=input.value);}
  function boardFor(lab){
    const boards={
      circuit:'<div class="circuit-diagram"><div class="wire wire-top"></div><div class="wire wire-bottom"></div><div class="component battery">+ | -</div><div class="component bulb"><i></i>BULB</div><div class="component resistor">/\/\/\/</div><div class="component switch"><i></i></div></div>',
      selection:'<div class="habitat-scene"><div class="predator-shape">PREDATOR</div><i class="prey green p1"></i><i class="prey green p2"></i><i class="prey green p3"></i><i class="prey brown p4"></i><i class="prey brown p5"></i><i class="prey brown p6"></i><div class="generation-bars"><b></b><b></b></div></div>',
      microscope:'<div class="microscope-bench"><div class="microscope"><i class="lens"></i><i class="stage"></i><i class="base"></i></div><div class="field-of-view"><i></i><i></i><i></i><i></i><b>100x</b></div></div>',
      foodweb:'<div class="food-web"><div class="web-node sun">SUN</div><div class="web-node grass">GRASS</div><div class="web-node rabbit">RABBIT</div><div class="web-node hawk">HAWK</div><i class="web-link l1">&#8594;</i><i class="web-link l2">&#8594;</i><i class="web-link l3">&#8594;</i></div>',
      cell:'<div class="cell-comparison"><div class="plant-cell"><i class="nucleus"></i><i class="vacuole"></i><i class="chloroplast c1"></i><i class="chloroplast c2"></i><b>PLANT</b></div><div class="animal-cell"><i class="nucleus"></i><i class="mito m1"></i><i class="mito m2"></i><b>ANIMAL</b></div></div>',
      balance:'<div class="balance-scale"><div class="balance-beam"></div><div class="balance-pan left"><b>x</b><i>7</i></div><div class="balance-pan right"><i>19</i></div><div class="balance-base"></div></div>',
      probability:'<div class="probability-devices"><div class="spinner"><i></i><b>SPIN</b></div><div class="die"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="coin">H</div><div class="trial-bars"><b></b><b></b><b></b></div></div>',
      map:'<div class="history-map"><div class="river"></div><div class="route"></div><i class="city c1"></i><i class="city c2"></i><i class="city c3"></i><span class="map-label north">N</span><span class="map-label route-label">OREGON TRAIL</span></div>',
      source:'<div class="source-desk"><article class="letter"><b>April 12, 1917</b><span>Dear Anna...</span><i>personal letter</i></article><article class="poster"><strong>JOIN!</strong><span>Who created this?</span></article><div class="source-lens"></div></div>',
      timeline:'<div class="timeline-track"><div><b>1776</b><span>Declaration</span></div><div><b>1787</b><span>Constitution</span></div><div><b>1791</b><span>Bill of Rights</span></div><div><b>1865</b><span>13th Amendment</span></div></div>',
      artifact:'<div class="artifact-stage"><div class="artifact-pot"><i></i><b></b></div><span class="hotspot h1">1</span><span class="hotspot h2">2</span><span class="hotspot h3">3</span><div class="artifact-shadow"></div></div>',
      government:'<div class="government-board"><div class="civic-card"><b>SITUATION</b><span>A city road needs repair.</span></div><div class="branch legislative">LAW</div><div class="branch executive">ACT</div><div class="branch judicial">REVIEW</div><i class="checks">&#8644;</i></div>',
      story:'<div class="detective-board"><article><b>MYSTERY FILE</b><span>Who entered the garden?</span></article><i class="clue boot"></i><i class="clue key"></i><i class="clue window"></i><svg viewBox="0 0 300 130"><path d="M55 95 L148 38 L245 90 M55 95 L245 90"/></svg></div>',
      editing:'<div class="editing-paper" data-no-translate><b>THE SCHOOL NEWS</b><p><mark>last monday</mark> our class visit the museum, <mark>it was amazing</mark>.</p><div class="editor-marks">CAP &nbsp; TENSE &nbsp; RUN-ON</div></div>',
      paragraph:'<div class="paragraph-stack"><div>CLAIM</div><div>EVIDENCE</div><div>REASONING</div><div>TRANSITION</div><div>CONCLUSION</div></div>',
      words:'<div class="word-machine"><div class="word-slot prefix">pre-</div><div class="word-slot root">dict</div><div class="word-slot suffix">-ion</div><div class="word-output">PREDICTION</div><span>before + say + noun</span></div>',
      twosides:'<div class="two-texts"><article><b>AUTHOR A</b><p><mark>Community gardens improve access</mark> to fresh food...</p><i>CLAIM</i></article><article><b>AUTHOR B</b><p>Gardens help, but <mark>water costs remain a concern</mark>...</p><i>COUNTERPOINT</i></article></div>'
    };return boards[lab]||'<div class="diagram-placeholder"></div>';
  }
  function challenge(root,q){const challenge=q.challenge||{prompt:challengeBank[q.lab][0],choices:challengeBank[q.lab][1],correct:challengeBank[q.lab][2]};const {prompt,choices,correct}=challenge;const box=root.querySelector(".lab-challenge");box.innerHTML=`<h4>${safe(tr("Explain what happened"))}</h4><p>${safe(tr(prompt))}</p><div class="lab-answers"></div>`;const answers=box.querySelector(".lab-answers");choices.forEach((choice,index)=>{const button=document.createElement("button");button.type="button";button.textContent=tr(choice);button.onclick=()=>{button.classList.add(index===correct?"correct":"wrong");if(index===correct){answers.querySelectorAll("button").forEach(item=>item.disabled=true);LR.savedResponse={lab:q.lab,investigation:q.investigation,answer:choice};LR.lastAnswer=choice;lessonCorrect(tr("Investigation complete!"),tr("You tested the model and explained the evidence."));}else{root.querySelector(".lab-observation").textContent=tr("Use the evidence from your investigation and try again.");}};answers.appendChild(button);});}
  function standard(root,q){
    const work=root.querySelector(".lab-workspace"),note=root.querySelector(".lab-observation");
    const configs={springs:[["Mass","mass",1,10,5],["Stiffness","stiff",1,10,5],["Gravity","gravity",1,10,10],["Friction","friction",0,10,3]],projectile:[["Angle","angle",10,80,45],["Speed","speed",10,80,48],["Air resistance","air",0,10,2]],forces:[["Force","force",1,20,10],["Mass","mass",1,15,5],["Friction","friction",0,10,2],["Slope","slope",0,30,8]],density:[["Mass","mass",1,100,48],["Volume","volume",1,100,60]],coordinate:[["X","x",-8,8,3],["Y","y",-8,8,4]],scale:[["Scale meters/cm","scale",1,10,4],["Drawing cm","model",1,15,6]],shopping:[["Price","price",10,100,50],["Discount %","discount",0,50,20],["Tax %","tax",0,12,8]],water:[["Temperature","temp",10,100,65],["Humidity","humidity",0,100,55]]};
    controls(work,(configs[q.lab]||[["Setting A","a",1,10,5],["Setting B","b",1,10,5]]).map(([label,key,min,max,value])=>({label,key,min,max,value})));
    const scene=work.querySelector(".lab-scene");scene.classList.add(`scene-${q.lab}`);
    const units={mass:q.lab==="density"?"g":"kg",stiff:"N/m",gravity:"m/s²",friction:q.lab==="forces"?"N":"",angle:"°",speed:"m/s",air:"",force:"N",slope:"°",volume:"mL",temp:"°C",humidity:"%",price:"$",discount:"%",tax:"%",model:"cm",scale:"m/cm"};
    work.querySelectorAll("input").forEach(input=>{input.setAttribute("aria-label",tr(configs[q.lab].find(row=>row[1]===input.dataset.key)[0]));input.addEventListener("input",()=>{input.nextElementSibling.textContent=`${input.value} ${units[input.dataset.key]||""}`;root.querySelector(".lab-challenge").replaceChildren();update(false);});input.dispatchEvent(new Event("input"));});
    const history=[];
    const log=document.createElement("div");log.className="lab-trials";work.appendChild(log);
    const reset=document.createElement("button");reset.type="button";reset.className="lab-reset";reset.textContent=tr("Reset experiment");work.appendChild(reset);
    reset.onclick=()=>{history.length=0;log.replaceChildren();work.querySelectorAll("input").forEach(input=>{input.value=input.defaultValue;input.dispatchEvent(new Event("input"));});note.textContent=tr("Change one control, then compare two trials.");root.querySelector(".lab-challenge").replaceChildren();};
    function update(record){
      const v=Object.fromEntries([...work.querySelectorAll("input")].map(input=>[input.dataset.key,+input.value]));
      const label=(x,y,value)=>`<text x="${x}" y="${y}" text-anchor="middle">${safe(tr(value))}</text>`;
      const line=(x1,y1,x2,y2,color="#8196aa")=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3"/>`;
      const rect=(x,y,w,h,fill)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}"/>`;
      let drawing="",result="";
      if(q.lab==="projectile"){
        // Numerical integration with linear drag; launch and landing have equal height.
        const dt=.025,drag=v.air*.035;let x=0,y=0,vx=v.speed*Math.cos(v.angle*Math.PI/180),vy=v.speed*Math.sin(v.angle*Math.PI/180),t=0,points=[[0,0]];
        while(t<30){const px=x,py=y;x+=vx*dt;y+=vy*dt;vx-=drag*vx*dt;vy-=(9.81+drag*vy)*dt;t+=dt;if(y<0){x=px+(x-px)*py/(py-y);points.push([x,0]);break;}points.push([x,y]);}
        const sx=620/660,sy=270/340;
        drawing=line(60,340,710,340)+label(390,386,"Horizontal distance (m)")+label(380,30,"Trajectory")+`<polyline points="${points.map(([px,py])=>`${60+px*sx},${340-py*sy}`).join(" ")}" fill="none" stroke="#146fa8" stroke-width="4"/>`;
        for(let tick=0;tick<=600;tick+=100)drawing+=line(60+tick*sx,340,60+tick*sx,347)+label(60+tick*sx,367,String(tick));
        drawing+=rect(60+200*sx-6,320,12,20,"#e98231")+label(60+200*sx,306,"Target")+`<circle cx="${60+x*sx}" cy="340" r="8" fill="#146fa8"/>`;
        result=`${tr("Range")}: ${x.toFixed(1)} m · ${tr("Target distance")}: 200 m · Δ ${(x-200).toFixed(1)} m`;
      }else if(q.lab==="springs"){
        const stretch=v.mass*v.gravity/v.stiff,extension=stretch*1.8;
        drawing=rect(170,40,190,16,"#304c64");let path="M265 56";for(let i=0;i<18;i++)path+=` L${265+(i%2?18:-18)} ${65+i*(70+extension)/18}`;
        drawing+=`<path d="${path} L265 ${145+extension}" fill="none" stroke="#d97b25" stroke-width="5"/>`+rect(220,145+extension,90,48,"#146fa8")+label(265,175+extension,`${v.mass} kg`)+label(520,100,"Equilibrium extension")+label(520,132,`${stretch.toFixed(2)} m`)+label(520,175,"x = mg / k");
        const pts=Array.from({length:121},(_,i)=>`${410+i*2.2},${265-38*Math.exp(-v.friction*i/180)*Math.cos(i*Math.sqrt(v.stiff/v.mass)/7)}`);
        drawing+=line(410,220,410,320)+line(410,265,690,265)+`<polyline points="${pts.join(" ")}" fill="none" stroke="#d97b25" stroke-width="3"/>`+label(550,353,"Displacement over time");
        result=`${tr("Equilibrium extension")}: ${stretch.toFixed(2)} m · ${tr("Friction")}: ${v.friction}`;
      }else if(q.lab==="forces"){
        const net=v.force+v.mass*9.81*Math.sin(v.slope*Math.PI/180)-v.friction,a=Math.max(0,net/v.mass);
        drawing=line(80,260,340,260)+rect(140,200,110,50,"#146fa8")+label(195,231,`${v.mass} kg`)+line(255,218,330,218,"#d97b25")+label(235,175,`${v.force} N →`)+label(195,300,`${tr("Slope")}: ${v.slope}°`)+label(195,335,"Positive direction: downhill")+line(420,80,420,300)+line(420,300,690,300)+line(420,300,660,300-Math.min(210,a*5*2),"#146fa8")+label(550,340,"Time (s)")+label(550,58,"Velocity (m/s)")+label(665,322,"5");
        result=`${tr("Acceleration")}: ${a.toFixed(2)} m/s² · v(5 s) = ${(a*5).toFixed(2)} m/s`;
      }else if(q.lab==="density"){
        const d=v.mass/v.volume,state=d>1?"Sinks":d<1?"Floats":"Neutrally buoyant",size=35+Math.cbrt(v.volume)*9,oy=d>1?333-size:d<1?155-size*(1-d):220;
        drawing=rect(170,85,210,260,"#d8ebf4")+rect(177,155,196,181,"#82c9ef")+rect(220,oy,size,size,"#d97b25")+label(520,135,"Water density")+label(520,170,"1.00 g/mL")+label(520,235,"Object density")+label(520,270,`${d.toFixed(2)} g/mL`);
        result=`ρ = ${v.mass} g / ${v.volume} mL = ${d.toFixed(2)} g/mL · ${tr(state)}`;
      }else if(q.lab==="coordinate"){
        for(let n=-8;n<=8;n++){drawing+=line(380+n*18,40,380+n*18,328,"#d5e2eb")+line(236,184+n*18,524,184+n*18,"#d5e2eb");if(n%2===0&&n!==0)drawing+=label(380+n*18,205,String(n))+label(220,190-n*18,String(n));}
        drawing+=line(230,184,540,184)+line(380,335,380,30)+label(553,190,"x")+label(380,22,"y")+`<circle cx="${380+v.x*18}" cy="${184-v.y*18}" r="7" fill="#146fa8"/><circle cx="${380-v.x*18}" cy="${184-v.y*18}" r="9" fill="none" stroke="#d97b25" stroke-width="3"/>`+label(380,375,`● (${v.x}, ${v.y})    ○ (${-v.x}, ${v.y})`);
        result=`${tr("Distance from origin")}: ${Math.hypot(v.x,v.y).toFixed(2)} · ${tr("Reflection across y-axis")}: (${-v.x}, ${v.y})`;
      }else if(q.lab==="scale"){
        drawing=rect(100,90,v.model*30,180,"#b9dcf0")+label(100+v.model*15,70,`${v.model} cm`);
        result=`${v.model} cm × ${v.scale} m/cm = ${v.model*v.scale} m`;
        drawing+=label(380,325,`1 cm = ${v.scale} m`)+label(380,365,result);
      }else if(q.lab==="shopping"){
        const subtotal=v.price*(1-v.discount/100),tax=subtotal*v.tax/100;
        drawing=rect(170,40,420,320,"#fff")+label(380,90,"Receipt")+label(380,145,`${tr("Price")}: $${v.price.toFixed(2)}`)+label(380,195,`${tr("Discount")}: −$${(v.price-subtotal).toFixed(2)}`)+label(380,245,`${tr("Tax")}: $${tax.toFixed(2)}`)+label(380,310,`${tr("Total")}: $${(subtotal+tax).toFixed(2)}`);
        result=`${tr("Sale price")}: $${subtotal.toFixed(2)} · ${tr("Total")}: $${(subtotal+tax).toFixed(2)}`;
      }else if(q.lab==="water"){
        const rate=(v.temp/100)*(1-v.humidity/100);
        drawing=rect(90,290,580,65,"#82c9ef")+label(380,330,"Collection")+`<circle cx="135" cy="85" r="38" fill="#f3bd48"/>`+label(135,92,"Sun")+rect(440,70,210,75,"#d8ebf4")+label(545,114,"Condensation")+line(245,275,245,130,"#d97b25")+label(245,110,"Evaporation")+line(545,155,545,270,"#146fa8")+label(545,289,"Precipitation")+label(245,215,`${(rate*100).toFixed(0)}%`);
        result=`${tr("Relative evaporation rate")}: ${(rate*100).toFixed(0)}% · ${tr("Simplified model: precipitation requires cooling to saturation.")}`;
      }
      scene.innerHTML=`<svg viewBox="0 0 760 410" role="img" aria-label="${safe(tr(labNames[q.lab]))}">${drawing}</svg>`;
      if(record){note.textContent=result;history.push(result);log.innerHTML=`<h4>${safe(tr("Trial results"))}</h4><ol>${history.slice(-5).map(row=>`<li>${safe(row)}</li>`).join("")}</ol>`;challenge(root,q);}
      else note.textContent=result;
    }
    update(false);work.querySelector(".lab-run").onclick=()=>update(true);
  }

  function choiceLab(root,q){
    const work=root.querySelector(".lab-workspace"),note=root.querySelector(".lab-observation");
    const sets={
      circuit:["Battery","Bulb","Resistor","Switch"],selection:["Grass habitat","Dirt habitat","Run 1 generation","Run 5 generations"],microscope:["Onion cell 40x","Onion cell 400x","Pond water 100x","Cheek cell 400x"],foodweb:["Sun -> grass","Grass -> rabbit","Rabbit -> hawk","Remove hawk"],cell:["Plant cell","Animal cell","Nucleus","Membrane","Chloroplast"],balance:["x + 7 = 19","Subtract 7 from left","Subtract 7 from right","x = 12"],probability:["Flip coin x10","Roll die x12","Spin colors x20"],map:["Mississippi River","Oregon Trail","New Orleans","Great Plains"],source:["Letter","Recruitment poster","Newspaper","Photograph"],timeline:["1776 Declaration","1787 Constitution","1791 Bill of Rights","1865 Thirteenth Amendment"],artifact:["Material","Wear marks","Inscription","Shape and scale"],government:["City road repair","State school policy","Federal treaty","Rights complaint"],story:["Maya hid the muddy boots.","The window was open.","A key lay under the rug.","Maya denied going outside."],editing:["Fix capitalization","Repair comma splice","Match verb tense","Replace vague word"],paragraph:["Claim","Evidence","Reasoning","Transition","Conclusion"],words:["pre-","dict","-ion","contradict","prediction"],twosides:["Highlight claim A","Highlight evidence A","Highlight claim B","Mark loaded language"]
    };
    const items=sets[q.lab]||[];work.innerHTML=`<div class="lab-toolbox">${items.map((item,index)=>`<button type="button" aria-pressed="false" data-index="${index}">${safe(tr(item))}</button>`).join("")}</div><div class="lab-canvas"><div class="lab-diagram">${boardFor(q.lab)}</div><p>${safe(tr("Select tools to inspect the model, then analyze your evidence."))}</p><div class="lab-selected"></div></div><button type="button" class="lab-run">${safe(tr("Analyze selections"))}</button>`;
    const selected=new Set(),sequence=[],canvas=work.querySelector(".lab-canvas"),buttons=[...work.querySelectorAll(".lab-toolbox button")];
    const exclusive={selection:[[0,1],[2,3]],microscope:[[0,1,2,3]],cell:[[0,1]],probability:[[0,1,2]],government:[[0,1,2,3]]};
    function setButton(index,on){const button=buttons[index],item=items[index];button.setAttribute("aria-pressed",String(on));button.classList.toggle("selected",on);root.classList.toggle(`has-tool-${index}`,on);on?selected.add(item):selected.delete(item);if(!on){const at=sequence.indexOf(index);if(at>=0)sequence.splice(at,1);}}
    function toggle(button){const index=Number(button.dataset.index),item=items[index],turningOn=!selected.has(item);if(turningOn)(exclusive[q.lab]||[]).filter(group=>group.includes(index)).flat().filter(other=>other!==index).forEach(other=>setButton(other,false));setButton(index,turningOn);if(turningOn)sequence.push(index);work.querySelector(".lab-selected").innerHTML=sequence.filter(index=>selected.has(items[index])).map((index,step)=>`<span><b>${step+1}</b>${safe(tr(items[index]))}</span>`).join("");note.textContent=copy("ready");root.querySelector(".lab-challenge").replaceChildren();root.classList.remove("experiment-complete");updateBoard();root.classList.remove("needs-action");}
    buttons.forEach(button=>{button.draggable=true;button.onclick=()=>toggle(button);button.ondragstart=event=>event.dataTransfer.setData("text/plain",button.dataset.index);});canvas.ondragover=event=>event.preventDefault();canvas.ondrop=event=>{event.preventDefault();const button=work.querySelector(`.lab-toolbox button[data-index="${event.dataTransfer.getData("text/plain")}"]`),item=button?items[Number(button.dataset.index)]:null;if(button&&!selected.has(item))toggle(button);};
    const evidencePanel=document.createElement("div");evidencePanel.className="lab-evidence";canvas.appendChild(evidencePanel);
    const evidence={
      source:["Practice source (fictional): A private letter says, ‘I miss home, but I want Anna to think I am brave.’ The audience may affect what the writer admits.","Practice source (fictional): A recruitment poster says, ‘Join today!’ Its purpose is persuasion; it cannot tell us how every recruit felt.","Practice source (fictional): A newspaper reports that 200 people attended a meeting, but quotes only the organizer. Compare with an independent account.","Practice source (fictional): A photograph shows a crowded station. It records one moment; the image alone does not explain why people traveled."],
      artifact:["Practice artifact: Fired clay suggests pottery. Material alone does not establish an exact date.","The handle is smoother than the body. Repeated handling is a plausible explanation.","A stamped mark may identify a workshop. Without a reference, the maker remains uncertain.","The vessel is 20 cm tall with a narrow opening. Storing or pouring liquid is a reasonable hypothesis."],
      map:["The Mississippi River connects inland regions with the Gulf of Mexico; river access can support trade.","The Oregon Trail connected Missouri with the Pacific Northwest. This diagram is schematic, not to scale.","New Orleans lies near the mouth of the Mississippi River, linking river and sea transport.","The Great Plains lie east of the Rocky Mountains. Terrain affects the routes travelers can take."],
      story:["Muddy boots connect Maya with wet ground, but do not prove when she went outside.","An open window is a possible entry point. It does not identify who used it.","The hidden key shows that another way inside existed. Its owner is unknown.","Maya’s denial conflicts with the muddy boots. Compare both clues before making a claim."],
      foodweb:["The sun supplies energy that grass captures through photosynthesis.","Rabbits eat grass. The arrow points from the food to the consumer.","Hawks eat rabbits. Energy passes from prey to predator.","Prediction: fewer hawks can mean more rabbits and less grass at first. Other factors can change this outcome."],
      cell:["Plant cells have a cell wall, a membrane, and a nucleus; photosynthetic cells also contain chloroplasts.","Animal cells have a membrane and a nucleus, but no cell wall or chloroplasts.","The nucleus contains genetic information in both model cell types.","The cell membrane regulates what enters and leaves a cell.","Chloroplasts capture light energy in photosynthetic plant cells."],
      words:["pre- means before.","dict comes from a root meaning say.","-ion forms a noun describing an action or result.","contra- means against: contradict means to speak against a statement.","prediction combines pre- + dict + -ion: a statement about what will happen."],
      twosides:["Author A claims that community gardens improve access to fresh food.","Practice text A: ‘Our garden supplied 30 households last summer.’ This numerical example supports access, but describes only one garden.","Author B agrees gardens can help, but argues that water costs must be planned for.","Practice text B: ‘Only a fool would ignore water bills.’ The insult adds emotion, not evidence."]
    };
    let generation=0,green=50;
    function updateBoard(){
      evidencePanel.innerHTML=(evidence[q.lab]?sequence.filter(index=>selected.has(items[index])).map(index=>`<p><strong>${safe(tr(items[index]))}</strong> — ${safe(tr(evidence[q.lab][index]))}</p>`).join(""):"");
      if(q.lab==="balance"){
        const left=selected.has(items[1])?0:7,right=selected.has(items[2])?12:19;
        canvas.querySelector(".balance-pan.left").innerHTML=`<b>x</b><i>${left}</i>`;
        canvas.querySelector(".balance-pan.right i").textContent=right;
        canvas.querySelector(".balance-beam").style.transform=`rotate(${left+12===right?0:left+12>right?-8:8}deg)`;
        note.textContent=`x + ${left} = ${right} · ${tr(left+12===right?"Balanced":"Unbalanced")}`;
      }
      if(q.lab==="editing")canvas.querySelector(".editing-paper p").textContent=`${selected.has(items[0])?"Last Monday":"last monday"} our class ${selected.has(items[2])?"visited":"visit"} the museum${selected.has(items[1])?". It":", it"} was ${selected.has(items[3])?"filled with ancient pottery":"amazing"}.`;
      if(q.lab==="cell"&&selected.has("Animal cell")&&selected.has("Chloroplast"))note.textContent=tr("Animal cells do not have chloroplasts.");
      if(q.lab==="microscope"){
        const chosen=sequence.at(-1),magnification=[40,400,100,400][chosen]||40;
        canvas.querySelector(".field-of-view b").textContent=`${magnification}×`;
        canvas.querySelectorAll(".field-of-view i").forEach(cell=>cell.style.transform=`scale(${magnification/150})`);
      }
      if(q.lab==="government")canvas.querySelector(".civic-card span").textContent=tr(["A city road needs repair.","A state sets school policy.","The federal government negotiates a treaty.","A court reviews a rights complaint."][sequence.at(-1)]||"A city road needs repair.");
    }
    function valid(){const count=selected.size,indexes=sequence.filter(index=>selected.has(items[index]));if(q.lab==="circuit")return count===4;if(q.lab==="selection")return (selected.has(items[0])||selected.has(items[1]))&&(selected.has(items[2])||selected.has(items[3]));if(["microscope","probability","government"].includes(q.lab))return count===1;if(q.lab==="foodweb")return [0,1,2].every(index=>selected.has(items[index]));if(q.lab==="cell")return (selected.has(items[0])||selected.has(items[1]))&&indexes.some(index=>index>=2)&&!(selected.has("Animal cell")&&selected.has("Chloroplast"));if(q.lab==="balance")return [0,1,2,3].every(index=>selected.has(items[index]))&&indexes.join(",")==="0,1,2,3";if(["timeline","paragraph"].includes(q.lab))return indexes.join(",")===items.map((_,index)=>index).join(",");if(q.lab==="words")return [0,1,2].every(index=>selected.has(items[index]));return count>=Math.min(2,items.length);}
    work.querySelector(".lab-run").onclick=()=>{if(!valid()){root.classList.remove("needs-action");void root.offsetWidth;root.classList.add("needs-action");note.textContent=["timeline","paragraph","balance"].includes(q.lab)?copy("order"):copy("more");return;}let message=copy("inspected",{count:selected.size});
      if(q.lab==="circuit")message=selected.size===4?"The switch closes a complete path, so the bulb lights.":"The path is incomplete. Add every circuit component.";
      if(q.lab==="microscope")message=selected.has("Onion cell 400x")?"At 400x, cell walls and nuclei are more distinct, but the field of view is smaller.":"Choose a magnified specimen to compare detail and field of view.";
      if(q.lab==="selection"){generation+=selected.has(items[3])?5:1;const advantage=selected.has(items[1])?.8:1.25;green=100/(1+(100/green-1)/Math.pow(advantage,selected.has(items[3])?5:1));canvas.querySelectorAll(".generation-bars b").forEach((bar,index)=>bar.style.height=`${index?100-green:green}%`);note.dataset.generation=generation;message=`${tr("Generation")}: ${generation} · ${tr("Green")}: ${green.toFixed(1)}% · ${tr("Brown")}: ${(100-green).toFixed(1)}%`; }
      if(q.lab==="foodweb")message=selected.has("Remove hawk")?"With fewer hawks, rabbits rise and grass declines in the first modeled cycles.":"Energy flows from the sun to producers and then consumers.";
      if(q.lab==="cell")message=selected.has("Chloroplast")?"Chloroplasts identify a plant cell and convert light energy into stored chemical energy.":"The membrane and nucleus appear in both model cell types.";
      if(q.lab==="probability"){const chosen=sequence.at(-1);if(chosen===0){const results=Array.from({length:10},()=>Math.random()<.5?"H":"T"),heads=results.filter(value=>value==="H").length;message=copy("coin",{a:heads,b:10-heads});canvas.querySelector(".coin").textContent=results.at(-1);}else if(chosen===1){const results=Array.from({length:12},()=>1+Math.floor(Math.random()*6));message=copy("die",{a:(results.reduce((a,b)=>a+b,0)/12).toFixed(1),b:results.join(", ")});canvas.querySelectorAll(".die i").forEach((dot,index)=>dot.style.opacity=index<results.at(-1)?1:.08);}else{const results=Array.from({length:20},()=>Math.floor(Math.random()*3)),counts=[0,0,0];results.forEach(value=>counts[value]++);message=copy("spin",{a:counts[0],b:counts[1],c:counts[2]});canvas.querySelector(".spinner").style.rotate=`${Math.floor(Math.random()*360)}deg`;}}
      if(q.lab==="balance")message="Subtract the same amount from both sides to keep the equation balanced.";
      root.classList.add("experiment-complete");note.textContent=tr(message)||copy("complete");challenge(root,q);};
  }
  function render(q){
    $("lrCheckBtn")?.classList.add("d-none");const root=shell(q);$("lrChoices").appendChild(root);
    if(["springs","projectile","forces","density","coordinate","scale","shopping","water"].includes(q.lab))standard(root,q);else choiceLab(root,q);
  }
  window.K12InteractiveLabs={render,labs:labs.map(item=>item[4])};
})();
