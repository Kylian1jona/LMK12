(function(){
  const scenes={
    k:[
      {picture:'🐱',setting:'🌼 🌿 🐾',label:'A cat in the grass',words:['the','cat','can','nap']},
      {picture:'🐶',setting:'🦴 🌳 🐾',label:'A dog by a tree',words:['the','dog','can','run']},
      {picture:'🐸',setting:'🪷 💧 🌿',label:'A frog beside a pond',words:['a','frog','can','hop']},
      {picture:'🐦',setting:'🌳 🌸 ☁️',label:'A bird in a tree',words:['the','bird','can','sing']},
      {picture:'🐟',setting:'🫧 🪸 💧',label:'A fish in water',words:['a','fish','can','swim']},
      {picture:'🐻',setting:'🍯 🌼 🌳',label:'A bear with honey',words:['the','bear','likes','honey']},
      {picture:'🐰',setting:'🥕 🌿 🌼',label:'A rabbit with a carrot',words:['the','bunny','eats','carrots']},
      {picture:'🚌',setting:'🛣️ 🌳 ☀️',label:'A bus on the road',words:['the','bus','is','yellow']}
    ],
    g1:[
      {picture:'🦊',setting:'🌳 🍂 🌲',label:'A little fox jumping over logs',words:['the','little','fox','can','jump','over','logs']},
      {picture:'🐢',setting:'🌊 🪨 🌿',label:'A green turtle walking beside water',words:['the','green','turtle','walks','beside','the','pond']},
      {picture:'🦋',setting:'🌼 🌷 🌻',label:'A blue butterfly flying over flowers',words:['the','blue','butterfly','flies','over','bright','flowers']},
      {picture:'🐿️',setting:'🌳 🍃 🌰',label:'A squirrel gathering acorns under a tree',words:['the','small','squirrel','finds','acorns','under','trees']},
      {picture:'🐝',setting:'🌻 🌺 🌼',label:'A bee visiting a yellow flower',words:['the','busy','bee','visits','a','yellow','flower']},
      {picture:'🦆',setting:'🌊 🪷 🌤️',label:'A duck swimming across a quiet pond',words:['the','yellow','duck','swims','across','the','pond']},
      {picture:'🪁',setting:'☁️ 🌤️ 🌿',label:'A red kite floating in the sky',words:['the','red','kite','floats','high','above','us']},
      {picture:'🐧',setting:'❄️ 🧊 🌨️',label:'A penguin sliding down an icy hill',words:['the','happy','penguin','slides','down','an','icy','hill']}
    ]
  };
  let grade='k',sceneIndex=0,row=1,chosen=[],message='';
  let section;
  const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const current=()=>scenes[grade][sceneIndex];
  const shuffle=words=>words.map((word,index)=>({word,index})).sort((a,b)=>((a.index*7+row*3)%Math.max(words.length,2))-((b.index*7+row*3)%Math.max(words.length,2))||b.index-a.index);
  const speak=words=>{
    if(!('speechSynthesis' in window))return;
    window.speechSynthesis.cancel();
    const utterance=new SpeechSynthesisUtterance(words.join(' '));
    utterance.rate=.78;
    window.speechSynthesis.speak(utterance);
  };
  function render(){
    if(!section)return;
    const scene=current(),finished=row>scene.words.length;
    const rows=scene.words.map((_,index)=>{
      const level=index+1,active=level===row&&!finished,complete=level<row;
      const content=complete?scene.words.slice(0,level).map(escapeHtml).join(' '):active?Array.from({length:level},(_,slot)=>`<span class="rp-slot ${chosen[slot]?'rp-filled':''}">${chosen[slot]?`<button type="button" data-undo="${slot}" aria-label="Remove ${escapeHtml(chosen[slot].word)}">${escapeHtml(chosen[slot].word)}</button>`:'<span aria-hidden="true">&nbsp;</span>'}</span>`).join(''):'<span class="rp-upcoming">Build this line next</span>';
      return `<div class="rp-line ${complete?'rp-complete':''} ${active?'rp-active':''}" style="--rp-level:${level}" ${active?'aria-label="Current sentence"':''}>${content}</div>`;
    }).join('');
    const available=finished?[]:shuffle(scene.words.slice(0,row)).filter(tile=>!chosen.some(item=>item.index===tile.index));
    section.innerHTML=`<div class="cardish rp-card"><header class="rp-header"><button type="button" class="btn btn-outline-secondary" data-action="back">← English lessons</button><div><span class="rp-eyebrow">${grade==='k'?'Kindergarten':'Grade 1'} · English Language</span><h1>Reading Pyramid</h1><p>Look at the picture. Build each line by adding one word.</p></div></header><div class="rp-progress">Picture ${sceneIndex+1} of ${scenes[grade].length} · Line ${Math.min(row,scene.words.length)} of ${scene.words.length}</div><div class="rp-layout"><div class="rp-picture" role="img" aria-label="${escapeHtml(scene.label)}"><span class="rp-sun" aria-hidden="true">☀️</span><span class="rp-cloud" aria-hidden="true">☁️</span><span class="rp-main-picture" aria-hidden="true">${scene.picture}</span><span class="rp-setting" aria-hidden="true">${scene.setting}</span><strong>${escapeHtml(scene.label)}</strong></div><div class="rp-work"><h2>${finished?'Great reading!':'Build the next line'}</h2><div class="rp-pyramid" aria-label="Sentence pyramid">${rows}</div>${finished?`<p class="rp-success">You built and read the whole pyramid!</p><div class="rp-actions"><button type="button" class="btn btn-main" data-action="read">🔊 Read the sentence</button><button type="button" class="btn btn-main" data-action="next">${sceneIndex===scenes[grade].length-1?'Practice again':'Next picture →'}</button></div>`:`<p class="rp-instruction">Tap a word or drag it into the empty line. Tap a placed word to remove it.</p><div class="rp-tiles" aria-label="Word choices">${available.map(tile=>`<button type="button" class="rp-tile" draggable="true" data-word-index="${tile.index}">${escapeHtml(tile.word)}</button>`).join('')}</div><div class="rp-actions"><button type="button" class="btn btn-main" data-action="check" ${chosen.length!==row?'disabled':''}>Check line</button><button type="button" class="btn btn-outline-secondary" data-action="read">🔊 Hear the line</button></div>`}<p class="rp-feedback" role="status" aria-live="polite">${escapeHtml(message)}</p></div></div></div>`;
  }
  function addWord(index){
    const words=current().words.slice(0,row);
    if(chosen.length>=row||chosen.some(item=>item.index===index)||index<0||index>=words.length)return;
    chosen.push({word:words[index],index});message='';render();
  }
  function check(){
    if(chosen.length!==row)return;
    if(chosen.every((item,index)=>item.word===current().words[index])){
      speak(current().words.slice(0,row));row++;chosen=[];message=row>current().words.length?'Wonderful! You built the whole sentence.':'That is right! Add one more word.';
    }else{message='Try again. Read the words from left to right.';chosen=[];}
    render();
  }
  function next(){sceneIndex=(sceneIndex+1)%scenes[grade].length;row=1;chosen=[];message='';render();}
  function init(){
    const container=document.querySelector('.container');
    if(!container)return;
    section=document.createElement('section');section.id='readingPyramid';section.className='section d-none';
    container.appendChild(section);
    section.addEventListener('click',event=>{
      const word=event.target.closest('[data-word-index]');if(word){addWord(Number(word.dataset.wordIndex));return;}
      const undo=event.target.closest('[data-undo]');if(undo){chosen.splice(Number(undo.dataset.undo),1);message='';render();return;}
      const action=event.target.closest('[data-action]')?.dataset.action;
      if(action==='check')check();
      if(action==='next')next();
      if(action==='read')speak(current().words.slice(0,Math.min(row,current().words.length)));
      if(action==='back')appBack(grade==='k'?'kinder-eng':'g1-eng');
    });
    section.addEventListener('dragstart',event=>{const word=event.target.closest('[data-word-index]');if(word)event.dataTransfer.setData('text/plain',word.dataset.wordIndex);});
    section.addEventListener('dragover',event=>{if(event.target.closest('.rp-active'))event.preventDefault();});
    section.addEventListener('drop',event=>{if(!event.target.closest('.rp-active'))return;event.preventDefault();addWord(Number(event.dataTransfer.getData('text/plain')));});
  }
  window.openReadingPyramid=function(level){grade=level==='g1'?'g1':'k';sceneIndex=0;row=1;chosen=[];message='';render();show('readingPyramid');};
  window.K12_READING_PYRAMID_SCENES=scenes;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
