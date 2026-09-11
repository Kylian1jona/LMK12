/* Standalone Grade 7 and Grade 8 investigation labs. */
(function(){
  const data=window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  const labs=[
    ["g7","sci",5,"Virtual Circuit Board","circuit","Build a complete circuit, control the switch, and explain current flow."],
    ["g7","sci",6,"Mass and Springs Lab","springs","Test how mass, stiffness, gravity, and friction change a spring system."],
    ["g7","sci",7,"Projectile Motion Catapult","projectile","Tune angle, speed, and air resistance to reach a target."],
    ["g7","sci",8,"Natural Selection Simulator","selection","Run generations in changing habitats and analyze camouflage."],
    ["g7","sci",9,"Water Cycle Slider","water","Change temperature and humidity to produce water-cycle changes."],
    ["g7","sci",10,"Virtual Microscope","microscope","Change magnification, focus specimens, and identify cell structures."],
    ["g7","sci",11,"Density Lab","density","Predict float or sink, test objects, and explain density."],
    ["g7","sci",12,"Food Web Lab","foodweb","Build feeding links, remove an organism, and track population change."],
    ["g7","sci",13,"Motion and Forces Lab","forces","Control force, mass, friction, and slope, then interpret a motion graph."],
    ["g7","sci",14,"Cell Lab","cell","Compare plant and animal cells by examining structures and functions."],
    ["g7","math",8,"Coordinate Plane Explorer","coordinate","Plot points, transform them, and calculate distance."],
    ["g7","math",9,"Equation Balance Lab","balance","Keep both sides balanced while isolating the variable."],
    ["g7","math",10,"Probability Lab","probability","Generate experimental data with coins, dice, and spinners."],
    ["g7","math",11,"Scale Drawing Studio","scale","Resize plans and calculate model and real dimensions."],
    ["g7","math",12,"Percent Shopping Lab","shopping","Combine discounts, coupons, tax, tips, and markup."],
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
      return {type:"interactive-lab",lab,investigation:index+1,q:`Investigation ${index+1}: ${frame} ${brief}`,challenge:{prompt:`${basePrompt} Use the evidence from investigation ${index+1}.`,choices,correct:(baseCorrect-turn+baseChoices.length)%baseChoices.length},answer:baseChoices[baseCorrect],explain:`The model evidence supports: ${baseChoices[baseCorrect]}.`,audio:`${name}, investigation ${index+1}.`};
    });
  }
  labs.forEach(([grade,subject,number,name,lab,brief])=>{
    data[`${grade}:${subject}:L${number}`]={name,topic:"Interactive Labs",topicNumber:7,lessonInTopic:number,difficulty:"Mastery",contentVersion:"20260910.1",questions:makeQuestions(lab,brief,name)};
  });

  function shell(q){
    const root=document.createElement("section");root.className=`interactive-lab lab-${q.lab}`;
    root.innerHTML=`<header><span>${safe(tr("INTERACTIVE LESSON"))}</span><h3>${safe(tr(labNames[q.lab]||"Learning Lab"))}</h3><p>${safe(tr(q.q))}</p></header><div class="lab-workspace"></div><div class="lab-observation" aria-live="polite">${safe(tr("Change the controls, then run the investigation."))}</div><div class="lab-challenge"></div>`;
    return root;
  }
  function controls(workspace,items){workspace.innerHTML=`<div class="lab-controls">${items.map(item=>`<label>${safe(tr(item.label))}<input data-key="${item.key}" type="range" min="${item.min}" max="${item.max}" value="${item.value}"><output>${item.value}</output></label>`).join("")}</div><div class="lab-scene"></div><button type="button" class="lab-run">${safe(tr("Run experiment"))}</button>`;workspace.querySelectorAll("input").forEach(input=>input.oninput=()=>input.nextElementSibling.textContent=input.value);}
  function visualFor(lab){
    const visuals={
      springs:'<div class="spring-rig"><div class="rig-beam"></div><div class="rig-spring"></div><div class="lab-model mass-block">M</div><div class="motion-arrows">&#8597;</div></div><div class="mini-graph"><i></i><b>position over time</b></div>',
      projectile:'<div class="launch-ramp"></div><div class="lab-model soccer-ball">&#9917;</div><div class="trajectory"><i></i><i></i><i></i><i></i><i></i></div><div class="lab-target target-ring">TARGET</div>',
      forces:'<div class="incline"><div class="lab-model force-cart"><span></span><i></i><i></i></div><b class="force-arrow">FORCE &#8594;</b></div><div class="mini-graph"><i></i><b>velocity</b></div>',
      density:'<div class="graduated-cylinder"><i></i><em>100</em><em>50</em><div class="lab-model density-object"></div></div><div class="density-scale"><span>MASS</span><b></b></div>',
      coordinate:'<div class="coordinate-grid"><span class="x-axis">x</span><span class="y-axis">y</span><div class="lab-model point-dot"></div></div>',
      scale:'<div class="blueprint"><div class="room room-a">6 cm</div><div class="room room-b">?</div><span>1 cm = 4 m</span><div class="lab-model ruler-mark"></div></div>',
      shopping:'<div class="store-shelf"><article><b>$50</b><span>JACKET</span><i>20% OFF</i></article><article><b>TAX</b><span>8%</span></article><div class="receipt"><strong>TOTAL</strong><hr><span>calculate</span></div><div class="lab-model price-tag"></div></div>',
      water:'<div class="cycle-sun">SUN</div><div class="cycle-cloud">CLOUD</div><div class="cycle-lake">COLLECTION</div><div class="cycle-arrow evaporate">&#8593;<span>evaporation</span></div><div class="cycle-arrow rain">&#8595;<span>precipitation</span></div><div class="lab-model water-drop"></div>'
    };return visuals[lab]||'<div class="lab-axis"></div><div class="lab-model"></div><div class="lab-target"></div>';
  }
  function boardFor(lab){
    const boards={
      circuit:'<div class="circuit-diagram"><div class="wire wire-top"></div><div class="wire wire-bottom"></div><div class="component battery">+ | -</div><div class="component bulb"><i></i>BULB</div><div class="component resistor">/\/\/\/</div><div class="component switch"><i></i></div></div>',
      selection:'<div class="habitat-scene"><div class="predator-shape">PREDATOR</div><i class="prey green p1"></i><i class="prey green p2"></i><i class="prey green p3"></i><i class="prey brown p4"></i><i class="prey brown p5"></i><i class="prey brown p6"></i><div class="generation-bars"><b></b><b></b></div></div>',
      microscope:'<div class="microscope-bench"><div class="microscope"><i class="lens"></i><i class="stage"></i><i class="base"></i></div><div class="field-of-view"><i></i><i></i><i></i><i></i><b>100x</b></div></div>',
      foodweb:'<div class="food-web"><div class="web-node sun">SUN</div><div class="web-node grass">GRASS</div><div class="web-node rabbit">RABBIT</div><div class="web-node hawk">HAWK</div><i class="web-link l1">&#8594;</i><i class="web-link l2">&#8594;</i><i class="web-link l3">&#8594;</i></div>',
      cell:'<div class="cell-comparison"><div class="plant-cell"><i class="nucleus"></i><i class="vacuole"></i><i class="chloroplast c1"></i><i class="chloroplast c2"></i><b>PLANT</b></div><div class="animal-cell"><i class="nucleus"></i><i class="mito m1"></i><i class="mito m2"></i><b>ANIMAL</b></div></div>',
      balance:'<div class="balance-scale"><div class="balance-beam"></div><div class="balance-pan left"><b>x</b><i>7</i></div><div class="balance-pan right"><i>19</i></div><div class="balance-base"></div></div>',
      probability:'<div class="probability-devices"><div class="spinner"><i></i><b>SPIN</b></div><div class="die"><i></i><i></i><i></i><i></i><i></i></div><div class="coin">H</div><div class="trial-bars"><b></b><b></b><b></b></div></div>',
      map:'<div class="history-map"><div class="river"></div><div class="route"></div><i class="city c1"></i><i class="city c2"></i><i class="city c3"></i><span class="map-label north">N</span><span class="map-label route-label">OREGON TRAIL</span></div>',
      source:'<div class="source-desk"><article class="letter"><b>April 12, 1917</b><span>Dear Anna...</span><i>personal letter</i></article><article class="poster"><strong>JOIN!</strong><span>Who created this?</span></article><div class="source-lens"></div></div>',
      timeline:'<div class="timeline-track"><div><b>1776</b><span>Declaration</span></div><div><b>1787</b><span>Constitution</span></div><div><b>1791</b><span>Bill of Rights</span></div><div><b>1865</b><span>13th Amendment</span></div></div>',
      artifact:'<div class="artifact-stage"><div class="artifact-pot"><i></i><b></b></div><span class="hotspot h1">1</span><span class="hotspot h2">2</span><span class="hotspot h3">3</span><div class="artifact-shadow"></div></div>',
      government:'<div class="government-board"><div class="civic-card"><b>SITUATION</b><span>A city road needs repair.</span></div><div class="branch legislative">LAW</div><div class="branch executive">ACT</div><div class="branch judicial">REVIEW</div><i class="checks">&#8644;</i></div>',
      story:'<div class="detective-board"><article><b>MYSTERY FILE</b><span>Who entered the garden?</span></article><i class="clue boot"></i><i class="clue key"></i><i class="clue window"></i><svg viewBox="0 0 300 130"><path d="M55 95 L148 38 L245 90 M55 95 L245 90"/></svg></div>',
      editing:'<div class="editing-paper"><b>THE SCHOOL NEWS</b><p><mark>last monday</mark> our class visit the museum, <mark>it was amazing</mark>.</p><div class="editor-marks">CAP &nbsp; TENSE &nbsp; RUN-ON</div></div>',
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
    const scene=work.querySelector(".lab-scene");scene.classList.add(`scene-${q.lab}`);scene.innerHTML=visualFor(q.lab);
    function liveVisual(){const values=Object.fromEntries([...work.querySelectorAll("input")].map(input=>[input.dataset.key,+input.value])),model=scene.querySelector(".lab-model");scene.classList.add("is-running");
      if(q.lab==="springs"){const stretch=Math.min(78,values.mass*values.gravity/Math.max(1,values.stiff)*4);scene.querySelector(".rig-spring").style.height=(72+stretch)+"px";model.style.top=(95+stretch)+"px";scene.style.setProperty("--damping",Math.max(.25,2.2-values.friction/5)+"s");}
      if(q.lab==="projectile"){scene.querySelector(".trajectory").style.height=(25+values.speed/2)+"%";scene.querySelector(".trajectory").style.transform=`rotate(${45-values.angle}deg) scaleX(${1-values.air/18})`;}
      if(q.lab==="forces"){model.style.left=Math.min(86,18+values.force*3-values.mass-values.friction)+"%";scene.querySelector(".incline").style.transform=`rotate(${-values.slope/3}deg)`;}
      if(q.lab==="density"){const density=values.mass/Math.max(1,values.volume);model.style.bottom=(density>1?"12%":"52%");model.style.transform=`translate(-50%,50%) scale(${.75+values.volume/180})`;}
      if(q.lab==="coordinate"){model.style.left=((values.x+8)/16*88+6)+"%";model.style.bottom=((values.y+8)/16*80+8)+"%";}
      if(q.lab==="scale")scene.querySelector(".room-a").style.width=Math.min(70,20+values.model*3)+"%";
      if(q.lab==="shopping")scene.querySelector(".receipt span").textContent=`$${(values.price*(1-values.discount/100)*(1+values.tax/100)).toFixed(2)}`;
      if(q.lab==="water"){scene.classList.toggle("cold",values.temp<35);scene.classList.toggle("humid",values.humidity>60);scene.classList.toggle("hot",values.temp>65);}
    }
    work.querySelectorAll("input").forEach(input=>input.addEventListener("input",liveVisual));liveVisual();
    work.querySelector(".lab-run").onclick=()=>{const values=Object.fromEntries([...work.querySelectorAll("input")].map(input=>[input.dataset.key,+input.value]));let message="Model updated from your settings.";let level=50;
      if(q.lab==="springs"){level=Math.min(95,values.mass*values.gravity/values.stiff*5);message=`The spring stretches ${Math.round(level)} units; friction ${values.friction} controls damping.`;}
      if(q.lab==="projectile"){level=Math.min(95,values.speed*Math.sin(values.angle*Math.PI/90)*(1-values.air/14)/1.2);message=`The path reaches ${Math.round(level)}% of the field. Compare angle, speed, and drag.`;}
      if(q.lab==="forces"){const acceleration=Math.max(0,(values.force-values.friction)/values.mass+values.slope/20);level=Math.min(95,acceleration*18);message=`Acceleration is ${acceleration.toFixed(2)} m/s squared. The graph rises with speed.`;}
      if(q.lab==="density"){const density=values.mass/values.volume;level=Math.min(95,density*55);message=`Density is ${density.toFixed(2)} g/mL. The object ${density>1?"sinks":"floats"} in water.`;}
      if(q.lab==="coordinate"){level=(values.x+8)/16*90;message=`Point (${values.x}, ${values.y}); y-axis reflection is (${-values.x}, ${values.y}); distance from origin is ${Math.hypot(values.x,values.y).toFixed(1)}.`;scene.querySelector(".lab-model").style.bottom=((values.y+8)/16*80+8)+"%";}
      if(q.lab==="scale"){level=values.model/15*90;message=`${values.model} cm represents ${values.model*values.scale} meters at this scale.`;}
      if(q.lab==="shopping"){const subtotal=values.price*(1-values.discount/100),total=subtotal*(1+values.tax/100);level=Math.min(95,total);message=`Sale price: $${subtotal.toFixed(2)}. With tax: $${total.toFixed(2)}.`;}
      if(q.lab==="water"){level=values.temp;message=values.temp<35?"Snow forms as cold moisture condenses and freezes.":values.humidity>60?"Humid air condenses and precipitation falls.":values.temp>60?"Fast evaporation carries water vapor upward.":"The cycle is moving slowly under these conditions.";}
      scene.querySelector(".lab-model").style.left=Math.max(3,Math.min(94,level))+"%";scene.style.setProperty("--level",level+"%");note.textContent=message;challenge(root,q);};
  }
  function choiceLab(root,q){
    const work=root.querySelector(".lab-workspace"),note=root.querySelector(".lab-observation");
    const sets={
      circuit:["Battery","Bulb","Resistor","Switch"],selection:["Grass habitat","Dirt habitat","Run 1 generation","Run 5 generations"],microscope:["Onion cell 40x","Onion cell 400x","Pond water 100x","Cheek cell 400x"],foodweb:["Sun -> grass","Grass -> rabbit","Rabbit -> hawk","Remove hawk"],cell:["Plant cell","Animal cell","Nucleus","Membrane","Chloroplast"],balance:["x + 7 = 19","Subtract 7 from left","Subtract 7 from right","x = 12"],probability:["Flip coin x10","Roll die x12","Spin colors x20"],map:["Mississippi River","Oregon Trail","New Orleans","Great Plains"],source:["Letter","Recruitment poster","Newspaper","Photograph"],timeline:["1776 Declaration","1787 Constitution","1791 Bill of Rights","1865 Thirteenth Amendment"],artifact:["Material","Wear marks","Inscription","Shape and scale"],government:["City road repair","State school policy","Federal treaty","Rights complaint"],story:["Maya hid the muddy boots.","The window was open.","A key lay under the rug.","Maya denied going outside."],editing:["Fix capitalization","Repair comma splice","Match verb tense","Replace vague word"],paragraph:["Claim","Evidence","Reasoning","Transition","Conclusion"],words:["pre-","dict","-ion","contradict","prediction"],twosides:["Highlight claim A","Highlight evidence A","Highlight claim B","Mark loaded language"]
    };
    const items=sets[q.lab]||[];work.innerHTML=`<div class="lab-toolbox">${items.map((item,index)=>`<button type="button" data-index="${index}">${safe(tr(item))}</button>`).join("")}</div><div class="lab-canvas"><div class="lab-diagram">${boardFor(q.lab)}</div><p>${safe(tr("Click or drag tools into the workspace."))}</p><div class="lab-selected"></div></div><button type="button" class="lab-run">${safe(tr("Analyze selections"))}</button>`;
    const selected=new Set(),canvas=work.querySelector(".lab-canvas");function toggle(button){const item=items[Number(button.dataset.index)];button.classList.toggle("selected");selected.has(item)?selected.delete(item):selected.add(item);root.classList.toggle(`has-tool-${button.dataset.index}`,selected.has(item));work.querySelector(".lab-selected").innerHTML=[...selected].map(value=>`<span>${safe(tr(value))}</span>`).join("");}work.querySelectorAll(".lab-toolbox button").forEach(button=>{button.draggable=true;button.onclick=()=>toggle(button);button.ondragstart=event=>event.dataTransfer.setData("text/plain",button.dataset.index);});canvas.ondragover=event=>event.preventDefault();canvas.ondrop=event=>{event.preventDefault();const button=work.querySelector(`.lab-toolbox button[data-index="${event.dataTransfer.getData("text/plain")}"]`),item=button?items[Number(button.dataset.index)]:null;if(button&&!selected.has(item))toggle(button);};
    work.querySelector(".lab-run").onclick=()=>{let message=`You inspected ${selected.size} evidence item${selected.size===1?"":"s"}. Compare what each one can prove.`;
      if(q.lab==="circuit")message=selected.size===4?"The switch closes a complete path, so the bulb lights.":"The path is incomplete. Add every circuit component.";
      if(q.lab==="microscope")message=selected.has("Onion cell 400x")?"At 400x, cell walls and nuclei are more distinct, but the field of view is smaller.":"Choose a magnified specimen to compare detail and field of view.";
      if(q.lab==="selection")message=selected.has("Dirt habitat")?"Brown prey are harder to see on dirt; green prey are eaten more often.":"Green prey have a camouflage advantage on grass.";
      if(q.lab==="foodweb")message=selected.has("Remove hawk")?"With fewer hawks, rabbits rise and grass declines in the first modeled cycles.":"Energy flows from the sun to producers and then consumers.";
      if(q.lab==="cell")message=selected.has("Chloroplast")?"Chloroplasts identify a plant cell and convert light energy into stored chemical energy.":"The membrane and nucleus appear in both model cell types.";
      if(q.lab==="probability")message=`Generated trial: ${Math.floor(Math.random()*6)+1}. More trials usually bring experimental probability closer to theoretical probability.`;
      if(q.lab==="balance")message="Subtract the same amount from both sides to keep the equation balanced.";
      note.textContent=message;challenge(root,q);};
  }
  function render(q){
    $("lrCheckBtn")?.classList.add("d-none");const root=shell(q);$("lrChoices").appendChild(root);
    if(["springs","projectile","forces","density","coordinate","scale","shopping","water"].includes(q.lab))standard(root,q);else choiceLab(root,q);
  }
  window.K12InteractiveLabs={render,labs:labs.map(item=>item[4])};
})();
