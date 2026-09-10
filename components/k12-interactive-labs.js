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
  labs.forEach(([grade,subject,number,name,lab,brief])=>{
    data[`${grade}:${subject}:L${number}`]={name,topic:"Interactive Labs",topicNumber:7,lessonInTopic:number,difficulty:"Mastery",contentVersion:"20260909.1",questions:[{type:"interactive-lab",lab,q:brief,answer:"complete",audio:name}]};
  });

  const $=id=>document.getElementById(id);
  const safe=value=>String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
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

  function shell(q){
    const root=document.createElement("section");root.className=`interactive-lab lab-${q.lab}`;
    root.innerHTML=`<header><span>INTERACTIVE LESSON</span><h3>${safe(labNames[q.lab]||"Learning Lab")}</h3><p>${safe(q.q)}</p></header><div class="lab-workspace"></div><div class="lab-observation" aria-live="polite">Change the controls, then run the investigation.</div><div class="lab-challenge"></div>`;
    return root;
  }
  function controls(workspace,items){workspace.innerHTML=`<div class="lab-controls">${items.map(item=>`<label>${item.label}<input data-key="${item.key}" type="range" min="${item.min}" max="${item.max}" value="${item.value}"><output>${item.value}</output></label>`).join("")}</div><div class="lab-scene"></div><button type="button" class="lab-run">Run experiment</button>`;workspace.querySelectorAll("input").forEach(input=>input.oninput=()=>input.nextElementSibling.textContent=input.value);}
  function challenge(root,q){const [prompt,choices,correct]=challengeBank[q.lab];const box=root.querySelector(".lab-challenge");box.innerHTML=`<h4>Explain what happened</h4><p>${safe(prompt)}</p><div class="lab-answers"></div>`;const answers=box.querySelector(".lab-answers");choices.forEach((choice,index)=>{const button=document.createElement("button");button.type="button";button.textContent=choice;button.onclick=()=>{button.classList.add(index===correct?"correct":"wrong");if(index===correct){answers.querySelectorAll("button").forEach(item=>item.disabled=true);LR.savedResponse={lab:q.lab,answer:choice};LR.lastAnswer=choice;lessonCorrect("Investigation complete!","You tested the model and explained the evidence.");clearTimeout(LR_CORRECT_ADVANCE_TIMER);LR_CORRECT_ADVANCE_TIMER=null;$("lrNextBtn").disabled=false;}else{root.querySelector(".lab-observation").textContent="Use the evidence from your investigation and try again.";}};answers.appendChild(button);});}
  function standard(root,q){
    const work=root.querySelector(".lab-workspace"),note=root.querySelector(".lab-observation");
    const configs={springs:[["Mass","mass",1,10,5],["Stiffness","stiff",1,10,5],["Gravity","gravity",1,10,10],["Friction","friction",0,10,3]],projectile:[["Angle","angle",10,80,45],["Speed","speed",10,80,48],["Air resistance","air",0,10,2]],forces:[["Force","force",1,20,10],["Mass","mass",1,15,5],["Friction","friction",0,10,2],["Slope","slope",0,30,8]],density:[["Mass","mass",1,100,48],["Volume","volume",1,100,60]],coordinate:[["X","x",-8,8,3],["Y","y",-8,8,4]],scale:[["Scale meters/cm","scale",1,10,4],["Drawing cm","model",1,15,6]],shopping:[["Price","price",10,100,50],["Discount %","discount",0,50,20],["Tax %","tax",0,12,8]],water:[["Temperature","temp",10,100,65],["Humidity","humidity",0,100,55]]};
    controls(work,(configs[q.lab]||[["Setting A","a",1,10,5],["Setting B","b",1,10,5]]).map(([label,key,min,max,value])=>({label,key,min,max,value})));
    const scene=work.querySelector(".lab-scene");scene.innerHTML='<div class="lab-axis"></div><div class="lab-model"></div><div class="lab-target"></div>';
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
    const items=sets[q.lab]||[];work.innerHTML=`<div class="lab-toolbox">${items.map((item,index)=>`<button type="button" data-index="${index}">${safe(item)}</button>`).join("")}</div><div class="lab-canvas"><p>Select evidence or components to build the model.</p><div class="lab-selected"></div></div><button type="button" class="lab-run">Analyze selections</button>`;
    const selected=new Set(),canvas=work.querySelector(".lab-canvas");function toggle(button){button.classList.toggle("selected");selected.has(button.textContent)?selected.delete(button.textContent):selected.add(button.textContent);work.querySelector(".lab-selected").innerHTML=[...selected].map(item=>`<span>${safe(item)}</span>`).join("");}work.querySelectorAll(".lab-toolbox button").forEach(button=>{button.draggable=true;button.onclick=()=>toggle(button);button.ondragstart=event=>event.dataTransfer.setData("text/plain",button.dataset.index);});canvas.ondragover=event=>event.preventDefault();canvas.ondrop=event=>{event.preventDefault();const button=work.querySelector(`.lab-toolbox button[data-index="${event.dataTransfer.getData("text/plain")}"]`);if(button&&!selected.has(button.textContent))toggle(button);};
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
