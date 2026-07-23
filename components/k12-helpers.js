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
let K12_AUDIO_CONTEXT = null;
function safePlay(audioEl){
  try{
    if(!audioEl) return;
    const frequencies=String(audioEl.dataset?.tone||"").split(",").map(Number).filter(Number.isFinite);
    if(frequencies.length){
      const AudioContextClass=window.AudioContext||window.webkitAudioContext;
      if(!AudioContextClass) return;
      K12_AUDIO_CONTEXT=K12_AUDIO_CONTEXT||new AudioContextClass();
      if(K12_AUDIO_CONTEXT.state==="suspended") K12_AUDIO_CONTEXT.resume().catch(()=>{});
      const duration=Math.max(.025,Number(audioEl.dataset.toneDuration)||.08);
      const start=K12_AUDIO_CONTEXT.currentTime+.01;
      frequencies.forEach((frequency,index)=>{
        const noteStart=start+index*(duration*.72);
        const oscillator=K12_AUDIO_CONTEXT.createOscillator();
        const gain=K12_AUDIO_CONTEXT.createGain();
        oscillator.type="sine";
        oscillator.frequency.value=frequency;
        gain.gain.setValueAtTime(.0001,noteStart);
        gain.gain.exponentialRampToValueAtTime(.075,noteStart+.012);
        gain.gain.exponentialRampToValueAtTime(.0001,noteStart+duration);
        oscillator.connect(gain);
        gain.connect(K12_AUDIO_CONTEXT.destination);
        oscillator.start(noteStart);
        oscillator.stop(noteStart+duration+.02);
      });
      return;
    }
    audioEl.currentTime=0;
    const playback=audioEl.play();
    if(playback?.catch) playback.catch(()=>{});
  }catch(e){}
}
function safeClick(){
  safePlay($("clickSfx"));
  try{ if(musicOn && !MUSIC_TIMER && typeof startMusic === "function") startMusic(); }catch(e){}
}
function dragQuestion(question, pairs, audioText){
  return {
    type:"drag",
    q:question,
    pairs,
    audio:audioText || question
  };
}
