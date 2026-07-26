(function(){
  class K12AudioAssets extends HTMLElement {
    connectedCallback(){
      if(this.dataset.rendered === "true") return;
      this.dataset.rendered = "true";
      this.innerHTML = String.raw`
<div class="toast" id="toast"></div>

<!-- AUDIO -->
<audio id="correct" preload="none" data-tone="659,880" data-tone-duration="0.09"></audio>
<audio id="wrong" preload="none" data-tone="247,196" data-tone-duration="0.12"></audio>
<audio id="clickSfx" preload="none" data-tone="440" data-tone-duration="0.035"></audio>
<audio id="rewardSfx" preload="none" data-tone="523,659,784,1047" data-tone-duration="0.11"></audio>

<aside class="music-player collapsed" id="musicPlayerShell" aria-label="Music player">
  <button type="button" class="music-player-tab" onclick="toggleMusicPanel()" aria-expanded="false" id="musicPanelToggle">🎵 Music</button>
  <div class="music-player-panel">
    <div class="music-player-head">
      <div><span>NOW PLAYING</span><strong id="musicTrackTitle">Choose a song</strong></div>
      <button type="button" onclick="toggleMusicPanel()" aria-label="Close music player">×</button>
    </div>
    <div id="youtubeMusicPlayer" class="youtube-music-frame"></div>
    <div class="music-player-controls">
      <button type="button" onclick="previousMusicTrack()" aria-label="Previous song">⏮</button>
      <button type="button" onclick="toggleMusic()" id="musicPlayButton" aria-label="Play music">▶</button>
      <button type="button" onclick="nextMusicTrack()" aria-label="Next song">⏭</button>
    </div>
    <label for="musicTrackPicker" class="visually-hidden">Choose a song</label>
    <select id="musicTrackPicker" class="music-track-picker" onchange="selectMusicTrack(Number(this.value))">
      <option value="0">Dai Dai — Shakira & Burna Boy</option>
      <option value="1">Ramenez la coupe à la maison — Vegedream</option>
      <option value="2">Waka Waka — Shakira</option>
      <option value="3">Feet Don’t Fail Me Now — Joy Crookes</option>
    </select>
    <a id="musicYouTubeLink" class="music-youtube-link" href="https://www.youtube.com/watch?v=fcnDmrtj6Sk" target="_blank" rel="noopener">Open official video on YouTube</a>
  </div>
</aside>
`;
    }
  }

  customElements.define("k12-audio-assets", K12AudioAssets);

  const MUSIC_TRACKS=[
    {id:"fcnDmrtj6Sk",title:"Dai Dai",artist:"Shakira & Burna Boy"},
    {id:"RHb5LKnnxLg",title:"Ramenez la coupe à la maison",artist:"Vegedream"},
    {id:"pRpeEdMmmQ0",title:"Waka Waka (This Time for Africa)",artist:"Shakira"},
    {id:"xLFCcnYSCyE",title:"Feet Don’t Fail Me Now",artist:"Joy Crookes"}
  ];
  let musicOn=false, MUSIC_TIMER=null, musicTrackIndex=0;
  let youtubeMusicPlayer=null, youtubeMusicApiPromise=null;
  window.musicOn=false;
  window.MUSIC_TIMER=null;

  function loadYouTubeMusicApi(){
    if(window.YT?.Player) return Promise.resolve(window.YT);
    if(youtubeMusicApiPromise) return youtubeMusicApiPromise;
    youtubeMusicApiPromise=new Promise((resolve,reject)=>{
      const previousReady=window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady=()=>{
        if(typeof previousReady==="function") previousReady();
        resolve(window.YT);
      };
      const script=document.createElement("script");
      script.src="https://www.youtube.com/iframe_api";
      script.async=true;
      script.onerror=()=>reject(new Error("YouTube player could not load."));
      document.head.appendChild(script);
    });
    return youtubeMusicApiPromise;
  }

  function updateMusicPlayerUi(){
    window.musicOn=musicOn;
    const track=MUSIC_TRACKS[musicTrackIndex];
    const title=document.getElementById("musicTrackTitle");
    const picker=document.getElementById("musicTrackPicker");
    const link=document.getElementById("musicYouTubeLink");
    const play=document.getElementById("musicPlayButton");
    const menu=document.getElementById("musicItem");
    if(title) title.textContent=`${track.title} — ${track.artist}`;
    if(picker) picker.value=String(musicTrackIndex);
    if(link) link.href=`https://www.youtube.com/watch?v=${track.id}`;
    if(play) play.textContent=musicOn?"⏸":"▶";
    if(play) play.setAttribute("aria-label",musicOn?"Pause music":"Play music");
    if(menu) menu.textContent=musicOn?"🎵 Music: On":"🎵 Music: Off";
  }

  async function ensureYouTubeMusicPlayer(){
    if(youtubeMusicPlayer) return youtubeMusicPlayer;
    const YT=await loadYouTubeMusicApi();
    youtubeMusicPlayer=new YT.Player("youtubeMusicPlayer",{
      width:"100%",
      height:"210",
      videoId:MUSIC_TRACKS[musicTrackIndex].id,
      host:"https://www.youtube-nocookie.com",
      playerVars:{playsinline:1,rel:0},
      events:{
        onReady:()=>updateMusicPlayerUi(),
        onStateChange:event=>{
          if(event.data===YT.PlayerState.ENDED) nextMusicTrack();
          if(event.data===YT.PlayerState.PLAYING) musicOn=true;
          if(event.data===YT.PlayerState.PAUSED) musicOn=false;
          updateMusicPlayerUi();
        }
      }
    });
    return youtubeMusicPlayer;
  }

  window.toggleMusicPanel=function(){
    const shell=document.getElementById("musicPlayerShell");
    const toggle=document.getElementById("musicPanelToggle");
    if(!shell) return;
    const opening=shell.classList.contains("collapsed");
    shell.classList.toggle("collapsed",!opening);
    if(toggle) toggle.setAttribute("aria-expanded",String(opening));
    if(opening) ensureYouTubeMusicPlayer().catch(()=>{});
  };

  window.selectMusicTrack=async function(index){
    musicTrackIndex=(Number(index)+MUSIC_TRACKS.length)%MUSIC_TRACKS.length;
    const player=await ensureYouTubeMusicPlayer();
    player.loadVideoById(MUSIC_TRACKS[musicTrackIndex].id);
    musicOn=true;
    updateMusicPlayerUi();
  };

  window.nextMusicTrack=function(){
    selectMusicTrack(musicTrackIndex+1);
  };

  window.previousMusicTrack=function(){
    selectMusicTrack(musicTrackIndex-1);
  };

  window.startMusic=async function(){
    const shell=document.getElementById("musicPlayerShell");
    shell?.classList.remove("collapsed");
    const player=await ensureYouTubeMusicPlayer();
    player.playVideo();
    musicOn=true;
    updateMusicPlayerUi();
  };

  window.stopMusic=function(){
    youtubeMusicPlayer?.pauseVideo?.();
    musicOn=false;
    updateMusicPlayerUi();
  };

  window.toggleMusic=function(){
    if(musicOn) stopMusic();
    else startMusic().catch(()=>{});
  };

  document.addEventListener("visibilitychange",()=>{
    if(document.hidden&&musicOn) stopMusic();
  });
})();
