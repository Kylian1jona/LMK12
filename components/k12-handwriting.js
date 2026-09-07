/* Guided print handwriting. Completion records practice, not automatic grading. */
(function(){
  const words = ['cat','dog','sun','map','bed','pig','cup','hen','fox','run','fish','ship','tree','book','rain','leaf','home','kite','milk','frog','hand','star','play','jump','nest'];
  const sentences = [
    'The sun is warm.','I can read a book.','My dog likes to run.','We play at the park.','A bird sits in a tree.',
    'Please close the gate.','The fish swims fast.','I see a little frog.','Our class plants seeds.','The rain helps flowers.',
    'Can you find my hat?','Where is the blue kite?','May I have a turn?','Who has the red pen?','Is the water cold?',
    'We share our crayons.','I help set the table.','My friend has a cat.','The bus stops here.','I wash my hands.',
    'Look at that rainbow!','What a big pumpkin!','Thank you for helping.','We walk home together.','Tomorrow is a new day.'
  ];
  const fluency = [
    'Bright stars shine above the quiet town.','We packed fresh fruit for our picnic.','The small stream flows under a bridge.','A curious rabbit paused by the garden.','Our team worked together on the project.',
    'Please return the book when you finish.','I noticed a pattern in the fallen leaves.','The museum displays tools from long ago.','We measured the shadow at noon today.','Each seed needs space, water, and light.',
    'First, gather the materials you will need.','Next, fold the paper along the dotted line.','Then, compare your shape with the model.','After that, explain what you observed.','Finally, put the supplies in their places.',
    'I think the character made a kind choice.','One detail supports my idea about her.','For example, she shared her last pencil.','This action helped her partner finish.','Her small choice made a big difference.',
    'Would you rather explore a forest or sea?','How could we make our classroom quieter?','Remember to leave space between words.','Careful practice helps my writing improve.','I am proud of the effort I made today.'
  ];
  const make = (id,name,tip,targets) => ({id,name,tip,targets});
  const lessons = {
    g1: [
      make('capitals','Capital Letters','Start at the top guide. Keep capital letters tall and on the baseline.',[...'ABCDEFGHIJKLMNOPQRSTUVWX','Y Z']),
      make('lowercase','Lowercase Letters','Notice tall letters and letters with tails. Trace slowly, then copy below.',[...'abcdefghijklmnopqrstuvwx','y z']),
      make('words','My First Written Words','Keep the letters in each word close together. Leave a clear gap before the next copy.',words)
    ],
    g2: [
      make('size','Letter Size and Word Shape','Keep small letters around the middle guide. Let tall letters rise and tails drop below the baseline.',words.map(word => `${word} ${word}`)),
      make('spacing','Word Spacing','Leave a finger-sized space between words and keep the baseline steady.', ['a red hat','the big dog','a warm day','my blue cup','a soft bed','the tall tree','a green leaf','my best friend','a little fish','the full moon','a new book','the small frog','a fast bus','my clean hands','a bright star','the long road','a kind helper','the quiet room','my school bag','a funny story','the deep pond','a cool breeze','my lunch box','the rainy day','a happy home']),
      make('sentences','Capitals and Punctuation','Begin with a capital, use spaces, and copy the ending punctuation.',sentences)
    ],
    g3: [
      make('fluency','Clear and Fluent Print','Aim for a comfortable pace, consistent letter size, and easy-to-read words.',fluency),
      make('editing','Copy and Check Sentences','Check capitals, word spaces, and punctuation after you copy each sentence.',sentences.map((sentence,index)=> index < 10 ? `Today: ${sentence}` : sentence)),
      make('paragraphs','Build Short Paragraphs','On paper, keep each group of five sentences together as a paragraph. On screen, copy one sentence at a time.',[
        'Our class planted a small garden.','First, we loosened the soil.','Next, we planted seeds in rows.','We watered the soil gently.','Soon, green shoots began to grow.',
        'I enjoy visiting the library.','The shelves hold many kinds of books.','I choose a story and a science book.','A quiet table helps me concentrate.','I always return my books on time.',
        'Yesterday, we made paper boats.','We folded each sheet carefully.','Then, we placed the boats in water.','One wide boat floated the longest.','We wondered why its shape helped.',
        'A good teammate listens to others.','Each person can share an idea.','We divide the work fairly.','When someone needs help, we offer it.','Together, we can solve hard problems.',
        'Rain changed our plans for the day.','We moved our picnic into the house.','A blanket became our picnic spot.','We told stories while we ate.','The rainy day was still full of fun.'
      ])
    ]
  };
  let active = null;
  let strokes = [];
  let drawing = null;
  let canvas = null;
  let paper = false;
  let reviewed = false;
  let modelLines = [];
  const storageKey = () => `${getStoreKey()}_handwriting_v1`;
  function readProgress(){
    try { return JSON.parse(learnMasterStore.getItem(storageKey()) || '{}') || {}; }
    catch { return {}; }
  }
  function saveProgress(){
    if(!active) return;
    const progress=readProgress();
    progress[`${active.grade}:${active.lesson.id}`]={completed:active.index,updatedAt:Date.now()};
    try { learnMasterStore.setItem(storageKey(),JSON.stringify(progress)); }
    catch { status('Practice continues, but progress could not be saved on this device.'); }
  }
  function status(message){
    const element=document.getElementById('handwritingStatus');
    if(element) element.textContent=message;
  }
  function sectionFor(grade){ return document.getElementById(`${grade}-handwriting`); }
  function allowed(){ return requireLessonSubjectAccess('eng'); }
  function validSession(){
    return active && active.learner === getActiveKidId() && allowed();
  }
  function openHandwriting(grade){
    if(!lessons[grade] || !allowed()) return;
    active=null;
    canvas=null;
    drawing=null;
    const progress=readProgress();
    const section=sectionFor(grade);
    section.innerHTML=`<div class="cardish handwriting-shell"><h1>Grade ${grade.slice(1)} Handwriting</h1><p>Practice on screen with a mouse, finger, or pen, or use pencil and paper. Each lesson has 25 practice steps.</p><div class="handwriting-lesson-grid">${lessons[grade].map(lesson=>{
      const completed=Math.max(0,Math.min(25,Number(progress[`${grade}:${lesson.id}`]?.completed)||0));
      return `<article><h2>${lesson.name}</h2><p>${lesson.tip}</p><p>${completed===25?'Practice completed':`${completed} of 25 steps completed`}</p><button type="button" class="btn btn-main" data-handwriting-lesson="${lesson.id}">${completed===25?'Practice again':completed?'Continue':'Start practice'}</button></article>`;
    }).join('')}</div><button type="button" class="btn btn-main" data-handwriting-back>Back to Grade ${grade.slice(1)}</button></div>`;
    section.querySelectorAll('[data-handwriting-lesson]').forEach(button=>button.addEventListener('click',()=>start(grade,button.dataset.handwritingLesson)));
    section.querySelector('[data-handwriting-back]').addEventListener('click',()=>show(`grade${grade.slice(1)}`));
    show(section.id);
  }
  function start(grade,id){
    if(!allowed()) return;
    const lesson=lessons[grade]?.find(item=>item.id===id);
    if(!lesson) return;
    const saved=Number(readProgress()[`${grade}:${id}`]?.completed)||0;
    active={grade,lesson,index:saved>=25?0:Math.max(0,Math.floor(saved)),learner:getActiveKidId()};
    paper=false;
    render();
  }
  function render(){
    strokes=[];
    drawing=null;
    reviewed=false;
    const {grade,lesson,index}=active;
    const section=sectionFor(grade);
    if(index===25){
      canvas=null;
      section.innerHTML=`<div class="cardish handwriting-shell"><h1>Practice complete!</h1><p>You finished all 25 steps in ${lesson.name}. Ask a teacher or grown-up to look at your letter shapes, spacing, and baseline.</p><p>These steps record practice and self-checking.</p><button type="button" class="btn btn-main" data-handwriting-menu>More handwriting lessons</button></div>`;
      section.querySelector('[data-handwriting-menu]').addEventListener('click',()=>openHandwriting(grade));
      section.querySelector('h1').tabIndex=-1;
      section.querySelector('h1').focus();
      return;
    }
    // Short model lines stay large enough to trace on narrow screens.
    modelLines=[''];
    for(const word of lesson.targets[index].split(' ')){
      const last=modelLines.length-1;
      if(modelLines[last] && modelLines[last].length+word.length+1>24) modelLines.push(word);
      else modelLines[last]+=(modelLines[last]?' ':'')+word;
    }
    section.innerHTML=`<div class="cardish handwriting-shell"><p class="small-note">Grade ${grade.slice(1)} · Step ${index+1} of 25</p><h1>${lesson.name}</h1><progress max="25" value="${index}" aria-label="Completed handwriting steps"></progress><p>${lesson.tip}</p><p class="handwriting-target" id="handwritingTarget">${lesson.targets[index]}</p><fieldset class="handwriting-mode"><legend>Where will you practice?</legend><label><input type="radio" name="handwritingMode" value="screen" ${paper?'':'checked'}> On screen</label><label><input type="radio" name="handwritingMode" value="paper" ${paper?'checked':''}> On paper</label></fieldset><div id="handwritingScreen"><p id="handwritingInstructions">Trace the pale model on the first row. Copy it on the second row. Use Undo or Clear to try again.</p><canvas id="handwritingCanvas" width="1000" height="420" aria-labelledby="handwritingTarget" aria-describedby="handwritingInstructions">Copy the displayed text on lined paper, then choose On paper to record your practice.</canvas><div class="handwriting-tools"><button type="button" class="btn btn-main" data-handwriting-undo>Undo</button><button type="button" class="btn btn-main" data-handwriting-clear>Clear</button></div></div><p id="handwritingPaper" ${paper?'':'hidden'}>Write the model on lined paper. Compare your letter shapes, spacing, and punctuation with the model.</p><label class="handwriting-check"><input type="checkbox" id="handwritingReview"> I practiced and checked my letter shapes, spaces, and baseline.</label><p id="handwritingStatus" role="status" aria-live="polite"></p><div class="handwriting-tools"><button type="button" class="btn btn-main" data-handwriting-menu>Back to lessons</button><button type="button" class="btn btn-main" id="handwritingNext" disabled>${index===24?'Finish practice':'Save and continue'}</button></div></div>`;
    canvas=section.querySelector('canvas');
    canvas.height=420*modelLines.length;
    section.querySelector('#handwritingInstructions').textContent='For each pair of rows, trace the pale model on the first row, then copy it on the second. Use Undo or Clear to try again.';
    section.querySelectorAll('[name="handwritingMode"]').forEach(input=>input.addEventListener('change',()=>{
      paper=input.value==='paper';
      reviewed=false;
      section.querySelector('#handwritingReview').checked=false;
      updateControls();
    }));
    section.querySelector('[data-handwriting-menu]').addEventListener('click',()=>openHandwriting(grade));
    section.querySelector('[data-handwriting-undo]').addEventListener('click',()=>{ drawing=null; strokes.pop(); invalidate(); paint(); });
    section.querySelector('[data-handwriting-clear]').addEventListener('click',()=>{ drawing=null; strokes=[]; invalidate(); paint(); });
    section.querySelector('#handwritingReview').addEventListener('change',event=>{ reviewed=event.target.checked; updateControls(); });
    section.querySelector('#handwritingNext').addEventListener('click',()=>{
      if(!validSession() || !reviewed || (!paper && !hasInk())) return;
      active.index++;
      render();
      saveProgress();
    });
    canvas.addEventListener('pointerdown',event=>{
      if(paper || drawing || event.button!==0) return;
      event.preventDefault();
      drawing={id:event.pointerId,points:[point(event)]};
      strokes.push(drawing.points);
      canvas.setPointerCapture(event.pointerId);
      invalidate();
      paint();
    });
    canvas.addEventListener('pointermove',event=>{
      if(!drawing || drawing.id!==event.pointerId) return;
      event.preventDefault();
      drawing.points.push(point(event));
      paint();
    });
    const finish=event=>{
      if(drawing?.id!==event.pointerId) return;
      drawing=null;
      if(canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      updateControls();
    };
    canvas.addEventListener('pointerup',finish);
    canvas.addEventListener('pointercancel',finish);
    canvas.addEventListener('lostpointercapture',finish);
    paint();
    updateControls();
    section.querySelector('h1').tabIndex=-1;
    section.querySelector('h1').focus();
  }
  function point(event){
    const rect=canvas.getBoundingClientRect();
    return {x:Math.max(0,Math.min(1000,(event.clientX-rect.left)*1000/rect.width)),y:Math.max(0,Math.min(canvas.height,(event.clientY-rect.top)*canvas.height/rect.height))};
  }
  function hasInk(){ return strokes.some(stroke=>stroke.length>1); }
  function invalidate(){
    reviewed=false;
    document.getElementById('handwritingReview').checked=false;
    updateControls();
  }
  function updateControls(){
    document.getElementById('handwritingScreen').hidden=paper;
    document.getElementById('handwritingPaper').hidden=!paper;
    document.getElementById('handwritingReview').disabled=!paper&&!hasInk();
    document.getElementById('handwritingNext').disabled=!reviewed||(!paper&&!hasInk());
    status(paper?'Copy on paper, then check your work.':hasInk()?'Compare your writing with the model, then check your work.':'Draw on the lines to begin, or choose On paper.');
  }
  function paint(){
    if(!canvas) return;
    const ctx=canvas.getContext('2d');
    ctx.clearRect(0,0,1000,canvas.height);
    ctx.fillStyle='#ffffff';
    ctx.fillRect(0,0,1000,canvas.height);
    for(const base of modelLines.flatMap((_,i)=>[160+i*420,340+i*420])){
      for(const offset of [-100,-50,0,30]){
        ctx.beginPath();
        ctx.strokeStyle=offset===0?'#6d75a8':'#c5cee2';
        ctx.lineWidth=offset===0?2:1;
        ctx.setLineDash(offset===-50?[10,8]:[]);
        ctx.moveTo(28,base+offset);
        ctx.lineTo(972,base+offset);
        ctx.stroke();
      }
    }
    ctx.setLineDash([]);
    ctx.fillStyle='#aeb8cc';
    modelLines.forEach((target,i)=>{
      let fontSize=target.length<4?118:74;
      const setFont=()=>{ctx.font=`${fontSize}px "Comic Sans MS", "Segoe Print", sans-serif`;};
      setFont();
      while(ctx.measureText(target).width>900){fontSize--;setFont();}
      ctx.fillText(target,48,160+i*420);
    });
    ctx.strokeStyle='#302a75';
    ctx.fillStyle='#302a75';
    ctx.lineWidth=4;
    ctx.lineCap='round';
    ctx.lineJoin='round';
    for(const points of strokes){
      if(points.length===1){ctx.beginPath();ctx.arc(points[0].x,points[0].y,2,0,Math.PI*2);ctx.fill();continue;}
      ctx.beginPath();
      points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
      ctx.stroke();
    }
  }
  function init(){
    const host=document.querySelector('.container');
    if(!host) return;
    for(const grade of Object.keys(lessons)){
      const section=document.createElement('div');
      section.id=`${grade}-handwriting`;
      section.className='section d-none';
      host.appendChild(section);
      const menu=document.querySelector(`#grade${grade.slice(1)} .d-flex.justify-content-center`);
      const english=document.querySelector(`#${grade}-eng .early-lesson-list, #${grade}-eng .lesson-column`);
      for(const target of [menu,english]){
        if(!target) continue;
        const button=document.createElement('button');
        button.type='button';
        button.className='btn btn-main';
        button.textContent='Handwriting';
        button.addEventListener('click',()=>openHandwriting(grade));
        if(target===menu&&target.lastElementChild) target.insertBefore(button,target.lastElementChild);
        else target.appendChild(button);
      }
    }
  }
  window.openHandwriting=openHandwriting;
  window.K12HandwritingLessons=lessons;
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
