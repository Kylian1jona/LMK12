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
  const joins = words.map((word,index)=>`${word} ${words[(index+7)%words.length]} ${words[(index+13)%words.length]}`);
  const academic = [
    'Write the main idea in one clear sentence.','Use evidence before drawing a conclusion.','Label each step so the method is easy to follow.','Compare the two sources before taking notes.','A precise word can make an explanation stronger.',
    'Organize related details under one heading.','Show every unit in a measurement problem.','Revise the claim when the evidence changes.','Leave space between symbols in an equation.','Record the date and title at the top of the page.',
    'A strong paragraph develops one central point.','Use arrows to connect causes and effects.','Circle key terms before writing a summary.','Check names, dates, and numerical values carefully.','Indent a new paragraph and keep the margin even.',
    'Write questions in the margin while reading.','Separate observations from interpretations.','A labeled diagram can clarify a complex system.','Keep lowercase letters consistent in height.','Use punctuation to make long notes readable.',
    'Rewrite hurried notes while the ideas are fresh.','Number a sequence when order affects the result.','Define an abbreviation the first time it appears.','End the page with a brief summary statement.','Readable notes make later studying more effective.'
  ];
  const notation = [
    'x + 7 = 19','3x - 5 = 16','y = 2x + 4','a² + b² = c²','f(x) = x² - 3x',
    '2(x + 4) = 18','m = (y₂ - y₁)/(x₂ - x₁)','A = πr²','V = (1/3)πr²h','sin θ = opposite/hypotenuse',
    'log₂ 8 = 3','2³ × 2⁴ = 2⁷','√49 = 7','|x - 3| ≤ 5','P(A and B) = P(A)P(B)',
    'lim x→2 f(x) = 5','d/dx (x³) = 3x²','∫ 2x dx = x² + C','F = ma','E = mc²',
    'H₂O + CO₂','v = d/t','Δy/Δx','pH = -log[H⁺]','x = (-b ± √(b² - 4ac))/(2a)'
  ];
  const labNotes = [
    'Question: How does light affect growth?','Hypothesis: More light will increase growth.','Independent variable: hours of light.','Dependent variable: plant height in centimeters.','Control variables: water, soil, and temperature.',
    'Trial 1 began at 9:00 AM.','The liquid changed from clear to pale blue.','Temperature increased from 20°C to 27°C.','No bubbles appeared during the first minute.','The sample mass was 14.6 grams.',
    'Observation: the surface became rough.','Inference: a chemical reaction may have occurred.','Repeat the measurement three times.','Record uncertainty with every measurement.','Graph the mean result for each condition.',
    'The control group received plain water.','Results did not support the original hypothesis.','A larger sample could reduce uncertainty.','One trial was excluded because the sensor failed.','The method should be tested by another group.',
    'Conclusion: temperature changed the reaction rate.','Evidence: the warm sample reacted sooner.','Limitation: room temperature varied slightly.','Next question: does concentration affect the result?','Clean the station and return all equipment.'
  ];
  const sourceNotes = [
    'Source: author, title, publisher, and date.','Primary source: created during the period studied.','Secondary source: later analysis of past events.','Context: Who created this record, and why?','Corroborate the claim with independent evidence.',
    'Cause: long-term condition plus immediate trigger.','Effect: describe change and identify who experienced it.','Continuity: some institutions remained influential.','Turning point: later choices changed direction.','Perspective: this account represents one position.',
    'Claim: the reform expanded urban participation.','Evidence: registration records rose after the change.','Qualification: rural participation changed more slowly.','Counterevidence: access remained unequal by region.','Conclusion: change was significant but incomplete.',
    '1776 — Declaration of Independence','1787 — Constitutional Convention','1865 — Thirteenth Amendment ratified','1920 — Nineteenth Amendment ratified','1964 — Civil Rights Act enacted',
    'Use a timeline to verify chronological order.','Distinguish a source quotation from your own note.','Put uncertain dates in brackets until verified.','Avoid treating sequence alone as proof of cause.','End with the question the evidence still leaves open.'
  ];
  const revision = academic.map((line,index)=>index%5===0?`Heading: ${line}`:index%5===4?`Summary: ${line}`:line);
  const upperLessons = grade => [
    make('academic-print',`Grade ${grade} Academic Print`,'Build an efficient, readable print style for assignments and timed work.',academic),
    make('math-notation','Math and Symbol Spacing','Keep numbers, operations, exponents, and variables distinct and aligned.',notation),
    make('lab-notes','Science and Lab Notes','Practice compact observations with readable measurements and units.',labNotes),
    make('source-notes','History and Source Notes','Write dates, evidence, and source labels clearly enough to verify later.',sourceNotes),
    make('revision','Headings, Margins, and Revision','Use consistent headings and clean rewritten notes for longer study sessions.',revision)
  ];
  const make = (id,name,tip,targets) => ({id,name,tip,targets});
  const lessons = {
    g1: [
      make('capitals','Capital Letters','Start at the top guide. Keep capital letters tall and on the baseline.',[...'ABCDEFGHIJKLMNOPQRSTUVWX','Y Z']),
      make('lowercase','Lowercase Letters','Notice tall letters and letters with tails. Trace slowly, then copy below.',[...'abcdefghijklmnopqrstuvwx','y z']),
      make('words','My First Written Words','Keep the letters in each word close together. Leave a clear gap before the next copy.',words),
      make('numbers','Numbers and Number Words','Form each number from the top, then copy its number word.',Array.from({length:25},(_,i)=>`${i+1} ${['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twenty-one','twenty-two','twenty-three','twenty-four','twenty-five'][i]}`)),
      make('word-joins','Smooth Letter Connections','Practice moving smoothly from one letter to the next without crowding.',joins)
    ],
    g2: [
      make('size','Letter Size and Word Shape','Keep small letters around the middle guide. Let tall letters rise and tails drop below the baseline.',words.map(word => `${word} ${word}`)),
      make('spacing','Word Spacing','Leave a finger-sized space between words and keep the baseline steady.', ['a red hat','the big dog','a warm day','my blue cup','a soft bed','the tall tree','a green leaf','my best friend','a little fish','the full moon','a new book','the small frog','a fast bus','my clean hands','a bright star','the long road','a kind helper','the quiet room','my school bag','a funny story','the deep pond','a cool breeze','my lunch box','the rainy day','a happy home']),
      make('sentences','Capitals and Punctuation','Begin with a capital, use spaces, and copy the ending punctuation.',sentences),
      make('questions','Writing Questions','Keep question marks distinct and leave even spaces between words.',sentences.map((line,index)=>`Did ${line.charAt(0).toLowerCase()+line.slice(1).replace(/[.!?]$/,'?')}`)),
      make('descriptions','Descriptive Words','Keep longer words readable by maintaining consistent size and spacing.',fluency.map(line=>line.split(' ').slice(0,4).join(' ')))
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
      ]),
      make('note-taking','Neat Notes and Headings','Use a short heading, an even left margin, and readable key details.',academic),
      make('numbers-symbols','Numbers and Symbols','Align numbers carefully and leave clear space around operation signs.',notation)
    ],
    g8: upperLessons(8),
    g9: upperLessons(9),
    g10: upperLessons(10),
    g11: upperLessons(11),
    g12: upperLessons(12)
  };
  let active = null;
  let strokes = [];
  let drawing = null;
  let canvas = null;
  let paper = false;
  let reviewed = false;
  let modelLines = [];
  let strokeWidth=4;
  let inkColor='#302a75';
  let modelVisible=true;
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
  function renderLegacy(){
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
  function render(){
    if(!validSession()) return;
    const {grade,lesson}=active;
    const section=sectionFor(grade);
    strokes=[]; drawing=null; reviewed=false; paper=false;
    if(active.index>=25){
      section.innerHTML=`<div class="cardish handwriting-shell"><h1>Practice complete!</h1><p>You finished all 25 steps in ${lesson.name}. Ask a teacher or grown-up to review your shapes, spacing, alignment, and readability.</p><p>Your practice and self-check are saved for this learner.</p><button type="button" class="btn btn-main" data-handwriting-menu>More handwriting lessons</button></div>`;
      section.querySelector('[data-handwriting-menu]').addEventListener('click',()=>openHandwriting(grade));
      section.querySelector('h1').focus();
      return;
    }
    modelLines=[''];
    for(const word of lesson.targets[active.index].split(' ')){
      const last=modelLines.length-1;
      if(modelLines[last] && modelLines[last].length+word.length+1>24) modelLines.push(word);
      else modelLines[last]+=(modelLines[last]?' ':'')+word;
    }
    const nextLabel=active.index===24?'Finish practice':'Save and continue';
    section.innerHTML=`<div class="cardish handwriting-shell"><p class="small-note">Grade ${grade.slice(1)} · Step ${active.index+1} of 25</p><h1>${lesson.name}</h1><progress max="25" value="${active.index}" aria-label="Completed handwriting steps"></progress><p>${lesson.tip}</p><p class="handwriting-target" id="handwritingTarget">${lesson.targets[active.index]}</p><fieldset class="handwriting-mode"><legend>Where will you practice?</legend><label><input type="radio" name="handwritingMode" value="screen" checked> On screen</label><label><input type="radio" name="handwritingMode" value="paper"> On paper</label></fieldset><div id="handwritingScreen"><p id="handwritingInstructions">Trace the pale model, then copy it on the next row.</p><div class="handwriting-settings" aria-label="Writing tools"><label>Ink color <input type="color" id="handwritingInk" value="${inkColor}" aria-label="Ink color"></label><label>Pen size <input type="range" id="handwritingSize" min="2" max="10" value="${strokeWidth}" aria-label="Pen size"></label><label><input type="checkbox" id="handwritingModel" ${modelVisible?'checked':''}> Show trace model</label><button type="button" class="btn btn-main" data-handwriting-print>Print practice sheet</button></div><canvas id="handwritingCanvas" width="1000" height="420" aria-labelledby="handwritingTarget" aria-describedby="handwritingInstructions">Copy the displayed text on lined paper.</canvas><div class="handwriting-tools"><button type="button" class="btn btn-main" data-handwriting-undo>Undo</button><button type="button" class="btn btn-main" data-handwriting-clear>Clear</button></div></div><p id="handwritingPaper" hidden>Write the model on lined paper. Compare your shapes, spacing, punctuation, and alignment.</p><label class="handwriting-check"><input type="checkbox" id="handwritingReview"> I practiced, then checked shape, spacing, alignment, and readability.</label><p id="handwritingStatus" role="status" aria-live="polite"></p><div class="handwriting-tools"><button type="button" class="btn btn-main" data-handwriting-menu>Back to lessons</button><button type="button" class="btn btn-main" id="handwritingNext" disabled>${nextLabel}</button></div></div>`;
    canvas=section.querySelector('canvas');
    canvas.height=420*modelLines.length;
    section.querySelectorAll('[name="handwritingMode"]').forEach(input=>input.addEventListener('change',()=>{
      paper=input.value==='paper'; reviewed=false;
      section.querySelector('#handwritingReview').checked=false;
      updateControls();
    }));
    section.querySelector('[data-handwriting-menu]').addEventListener('click',()=>openHandwriting(grade));
    section.querySelector('[data-handwriting-undo]').addEventListener('click',()=>{drawing=null;strokes.pop();invalidate();paint();});
    section.querySelector('[data-handwriting-clear]').addEventListener('click',()=>{drawing=null;strokes=[];invalidate();paint();});
    section.querySelector('[data-handwriting-print]').addEventListener('click',()=>window.print());
    section.querySelector('#handwritingInk').addEventListener('input',event=>{inkColor=event.target.value;});
    section.querySelector('#handwritingSize').addEventListener('input',event=>{strokeWidth=Number(event.target.value);});
    section.querySelector('#handwritingModel').addEventListener('change',event=>{modelVisible=event.target.checked;paint();});
    section.querySelector('#handwritingReview').addEventListener('change',event=>{reviewed=event.target.checked;updateControls();});
    section.querySelector('#handwritingNext').addEventListener('click',()=>{
      if(!validSession() || !reviewed || (!paper&&!hasInk())) return;
      active.index++; render(); saveProgress();
    });
    canvas.addEventListener('pointerdown',event=>{
      if(paper||drawing||event.button!==0)return;
      event.preventDefault();
      const stroke={points:[point(event)],width:strokeWidth,color:inkColor};
      drawing={id:event.pointerId,stroke}; strokes.push(stroke);
      canvas.setPointerCapture(event.pointerId); invalidate(); paint();
    });
    canvas.addEventListener('pointermove',event=>{
      if(!drawing||drawing.id!==event.pointerId)return;
      event.preventDefault(); drawing.stroke.points.push(point(event)); paint();
    });
    const finish=event=>{
      if(drawing?.id!==event.pointerId)return;
      drawing=null;
      if(canvas.hasPointerCapture(event.pointerId))canvas.releasePointerCapture(event.pointerId);
      updateControls();
    };
    canvas.addEventListener('pointerup',finish);
    canvas.addEventListener('pointercancel',finish);
    canvas.addEventListener('lostpointercapture',finish);
    paint(); updateControls();
    section.querySelector('h1').tabIndex=-1; section.querySelector('h1').focus();
  }
  function point(event){
    const rect=canvas.getBoundingClientRect();
    return {x:Math.max(0,Math.min(1000,(event.clientX-rect.left)*1000/rect.width)),y:Math.max(0,Math.min(canvas.height,(event.clientY-rect.top)*canvas.height/rect.height))};
  }
  function hasInk(){ return strokes.some(stroke=>stroke.points.length>1); }
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
    if(modelVisible) modelLines.forEach((target,i)=>{
      let fontSize=target.length<4?118:74;
      const setFont=()=>{ctx.font=`${fontSize}px "Comic Sans MS", "Segoe Print", sans-serif`;};
      setFont();
      while(ctx.measureText(target).width>900){fontSize--;setFont();}
      ctx.fillText(target,48,160+i*420);
    });
    ctx.lineCap='round';
    ctx.lineJoin='round';
    for(const stroke of strokes){
      const points=stroke.points;
      ctx.strokeStyle=stroke.color;
      ctx.fillStyle=stroke.color;
      ctx.lineWidth=stroke.width;
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
