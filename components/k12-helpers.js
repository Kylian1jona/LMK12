/* ===========================
   Helpers
=========================== */
function $(id){ return document.getElementById(id); }
function clamp(n,min,max){ return Math.max(min, Math.min(max, n)); }
function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function toast(msg){
  const t = $("toast");
  if(!t) return;
  t.textContent = msg;
  t.style.display = "block";
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>t.style.display="none", 1800);
}
function make3Choices(ans, min, max){
  min = Math.min(min, max);
  const s = new Set([ans]);
  let guard = 0;
  while(s.size < 4 && guard++ < 200){
    let v = ans + randInt(-6,6);
    v = clamp(v, min, max);
    s.add(v);
  }
  const arr = [...s];
  let offset = 1;
  while(arr.length < 4){
    const plus = clamp(ans + offset, min, max);
    const minus = clamp(ans - offset, min, max);
    if(!arr.includes(plus)) arr.push(plus);
    if(arr.length < 4 && !arr.includes(minus)) arr.push(minus);
    offset++;
  }
  return arr.slice(0,4).sort(()=>Math.random()-0.5);
}
function safePlay(audioEl){ try{ if(!audioEl) return; audioEl.currentTime = 0; audioEl.play(); }catch(e){} }
function safeClick(){ safePlay($("clickSfx")); }
function dragQuestion(question, pairs, audioText){
  return {
    type:"drag",
    q:question,
    pairs,
    audio:audioText || question
  };
}
