/* Topic-driven menus for the expanded lesson banks. */
(function(){
  const CONFIG={
    g8:{
      subjects:[
        ["eng","English","📖"],
        ["math","Math","➗"],
        ["alg1","Algebra 1","🧮"],
        ["sci","Science","🔬"],
        ["hist","History","🌍"]
      ]
    },
    g9:{
      subjects:[
        ["eng","English","📖"],
        ["math","Geometry","📐"],
        ["sci","Science","🔬"],
        ["hist","History","🌍"]
      ]
    },
    g10:{
      subjects:[
        ["eng","English","📖"],
        ["math","Algebra 2","🧮"],
        ["sci","Science","🔬"],
        ["hist","History","🌍"]
      ]
    },
    g11:{
      subjects:[
        ["eng","English","📖"],
        ["math","Precalculus","🧮"],
        ["sci","Science","🔬"],
        ["hist","History","🌍"]
      ]
    },
    g12:{
      subjects:[
        ["eng","English","📖"],
        ["math","Calculus","📐"],
        ["sci","Science","🔬"],
        ["hist","History","🌍"]
      ]
    }
  };
  const FALLBACK_TOPICS={
    eng:["Reading and Literature","Vocabulary and Language","Grammar and Writing","Research and Synthesis"],
    math:["Number and Algebra Skills","Linear Relationships","Functions and Models","Geometry and Applications"],
    alg1:["Algebra Foundations","Linear Functions","Systems and Inequalities","Polynomials and Quadratics"],
    sci:["Scientific Foundations","Systems and Change","Evidence and Investigation","Applications and Analysis"],
    hist:["Historical Foundations","Conflict and Change","Government and Society","Evidence and Analysis"]
  };

  function ensureCourseGroups(){
    if(typeof CURR!=="object") return;
    CURR.g8=CURR.g8||{};
    CURR.g9=CURR.g9||{};
    CURR.g10=CURR.g10||{};
    CURR.g8.alg1=CURR.g8.alg1||{showName:"Grade 8 Algebra 1"};
    for(const [grade,config] of Object.entries(CONFIG)){
      CURR[grade]=CURR[grade]||{};
      for(const [subject,label] of config.subjects){
        CURR[grade][subject]=CURR[grade][subject]||{};
        CURR[grade][subject].showName=`Grade ${grade.slice(1)} ${label}`;
      }
    }
  }

  function ensureSection(grade,subject){
    const id=`${grade}-${subject}`;
    let section=document.getElementById(id);
    if(section) return section;
    section=document.createElement("div");
    section.id=id;
    section.className="section d-none";
    document.querySelector("k12-grade7-10-sections")?.appendChild(section);
    return section;
  }

  function subjectInfo(grade,subject){
    return CONFIG[grade].subjects.find(item=>item[0]===subject)||[subject,subject.toUpperCase(),"📘"];
  }

  function lessonEntries(grade,subject){
    const prefix=`${grade}:${subject}:`;
    return Object.entries(window.K12_CLASSIC_25_DATA||{})
      .filter(([key])=>key.startsWith(prefix))
      .map(([key,record])=>({key,lesson:key.split(":")[2],name:record.name||key}))
      .sort((a,b)=>Number(a.lesson.slice(1))-Number(b.lesson.slice(1)));
  }

  function topicGroups(grade,subject,lessons){
    const supplied=window.K12_CLASSIC_25_TOPICS?.[`${grade}:${subject}`];
    if(Array.isArray(supplied)&&supplied.length){
      const groups=supplied.map(topic=>({
        name:topic.name,
        lessons:(topic.lessons||[]).map(item=>{
          const lesson=String(item.key||"").split(":")[2];
          const record=(window.K12_CLASSIC_25_DATA||{})[item.key]||{};
          return {lesson,name:record.name||item.name||item.key};
        }).filter(item=>item.lesson)
      }));
      const grouped=new Set(groups.flatMap(group=>group.lessons.map(item=>item.lesson)));
      const additions=lessons.filter(item=>!grouped.has(item.lesson));
      if(additions.length) groups.push({name:"Advanced Practice and Applications",lessons:additions});
      return groups;
    }
    const names=FALLBACK_TOPICS[subject]||FALLBACK_TOPICS.math;
    return names.map((name,index)=>({name,lessons:lessons.slice(index*5,index*5+5)})).filter(group=>group.lessons.length);
  }

  function renderSubject(grade,subject){
    const lessons=lessonEntries(grade,subject);
    const [,label,icon]=subjectInfo(grade,subject);
    const number=grade.slice(1);
    const section=ensureSection(grade,subject);
    const groups=topicGroups(grade,subject,lessons);
    section.innerHTML=`<div class="cardish text-center kid-font"><h1>${icon} Grade ${number} ${label}</h1><p class="small-note">Choose a named lesson. Every lesson contains 25 questions.</p><div class="lesson-columns">${groups.map(group=>`<div class="lesson-column"><h3>${group.name}</h3><p>Build the skill from foundations through mastery.</p>${group.lessons.map(item=>`<button type="button" class="btn btn-main" onclick="startLesson('${grade}','${subject}','${item.lesson}')">${item.name}</button>`).join("")}</div>`).join("")}</div><div class="lesson-back-row"><button type="button" class="btn btn-main px-4" onclick="show('grade${number}')">Back to Grade ${number}</button></div></div>`;
  }

  async function openExpandedSubject(grade,subject){
    if(typeof safeClick==="function") safeClick();
    ensureCourseGroups();
    const section=ensureSection(grade,subject);
    section.innerHTML=`<div class="cardish text-center kid-font"><h1>Loading lessons…</h1><p class="small-note">Preparing the named 25-question lessons.</p></div>`;
    show(section.id);
    try{
      await window.K12Classic25.ensureGrade(grade);
      renderSubject(grade,subject);
      show(section.id);
    }catch(error){
      console.error(error);
      section.innerHTML=`<div class="cardish text-center kid-font"><h1>Lessons could not load</h1><p class="small-note">Please refresh and try again.</p><button type="button" class="btn btn-main" onclick="show('grade${grade.slice(1)}')">Back</button></div>`;
    }
  }

  function renderGradeMenu(grade){
    const number=grade.slice(1);
    const menu=document.querySelector(`#grade${number} .d-flex.justify-content-center`);
    if(!menu) return;
    menu.innerHTML=CONFIG[grade].subjects.map(([,label])=>`<button type="button" class="btn btn-main" onclick="openExpandedSubject('${grade}','${CONFIG[grade].subjects.find(item=>item[1]===label)[0]}')">${label}</button>`).join("")+`<button type="button" class="btn btn-main" onclick="show('grades')">Back</button>`;
  }

  ensureCourseGroups();
  window.openExpandedSubject=openExpandedSubject;
  function init(){
    Object.keys(CONFIG).forEach(renderGradeMenu);
    for(const [grade,config] of Object.entries(CONFIG)){
      for(const [subject,label,icon] of config.subjects){
        const section=ensureSection(grade,subject);
        section.innerHTML=`<div class="cardish text-center kid-font"><h1>${icon} Grade ${grade.slice(1)} ${label}</h1><p>Explore named lessons with 25 questions each.</p><button type="button" class="btn btn-main" onclick="openExpandedSubject('${grade}','${subject}')">View ${label} lessons</button><button type="button" class="btn btn-main" onclick="show('grade${grade.slice(1)}')">Back to Grade ${grade.slice(1)}</button></div>`;
      }
    }

  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
