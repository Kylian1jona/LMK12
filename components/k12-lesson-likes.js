(function(){
  let activeKey='';
  let requestNumber=0;
  let busy=false;
  let refreshTimer=0;
  const button=()=>document.getElementById('lrLikeButton');
  const client=()=>window.learnMasterSupabase;
  function display(result){
    const element=button();
    if(!element) return;
    const count=Math.max(0,Number(result?.count)||0);
    const liked=!!result?.liked;
    element.setAttribute('aria-pressed',String(liked));
    element.setAttribute('aria-label',`${liked?'Unlike':'Like'} this lesson; ${count} ${count===1?'like':'likes'} worldwide`);
    element.querySelector('.lesson-like-heart').textContent=liked?'♥':'♡';
    element.querySelector('.lesson-like-label').textContent=liked?'Liked':'Like';
    element.querySelector('.lesson-like-count').textContent=new Intl.NumberFormat().format(count);
    element.classList.toggle('is-liked',liked);
    element.disabled=busy;
  }
  async function refresh(key=activeKey){
    if(!key||!client()) return;
    const sequence=++requestNumber;
    const {data,error}=await client().rpc('learnmaster_lesson_like_summary',{p_lesson_key:key});
    if(sequence!==requestNumber||key!==activeKey) return;
    if(error){
      console.error('Could not load lesson likes:',error);
      const element=button();
      if(element){element.disabled=true;element.querySelector('.lesson-like-count').textContent='—';}
      return;
    }
    display(data);
  }
  function open(key){
    activeKey=key;
    requestNumber++;
    busy=false;
    clearInterval(refreshTimer);
    const element=button();
    if(element){
      element.disabled=true;
      element.setAttribute('aria-pressed','false');
      element.querySelector('.lesson-like-heart').textContent='♡';
      element.querySelector('.lesson-like-label').textContent='Like';
      element.querySelector('.lesson-like-count').textContent='…';
      element.classList.remove('is-liked');
    }
    refresh(key);
    refreshTimer=setInterval(()=>{
      if(!document.getElementById('lessonRunner')?.classList.contains('d-none')&&!busy) refresh(key);
    },30000);
  }
  async function toggle(){
    if(!activeKey||busy||button()?.disabled||!client()) return;
    const key=activeKey;
    busy=true;
    button().disabled=true;
    const sequence=++requestNumber;
    const {data,error}=await client().rpc('learnmaster_toggle_lesson_like',{p_lesson_key:key});
    if(sequence!==requestNumber||key!==activeKey) return;
    busy=false;
    if(error){
      console.error('Could not save lesson like:',error);
      if(typeof toast==='function') toast('Could not save your like. Please try again.');
      button().disabled=false;
      return;
    }
    display(data);
  }
  window.K12LessonLikes={open,toggle,refresh};
})();
