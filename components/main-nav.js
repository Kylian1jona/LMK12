(function(){
  function setDrawer(open){
    const shell=document.getElementById("appNavShell");
    const button=document.getElementById("appMenuButton");
    if(!shell) return;
    shell.classList.toggle("is-open",Boolean(open));
    shell.setAttribute("aria-hidden",String(!open));
    button?.setAttribute("aria-expanded",String(Boolean(open)));
    document.body.classList.toggle("app-menu-open",Boolean(open));
  }

  window.toggleAppNavigation=function(force){
    const open=typeof force==="boolean"?force:!document.getElementById("appNavShell")?.classList.contains("is-open");
    setDrawer(open);
  };

  window.navigateFromAppMenu=function(sectionId){
    setDrawer(false);
    if(sectionId==="reading" && typeof showReading==="function") showReading();
    else if(typeof show==="function") show(sectionId);
  };

  if(!window.__learnMasterDrawerReady){
    window.__learnMasterDrawerReady=true;
    document.addEventListener("keydown",event=>{ if(event.key==="Escape") setDrawer(false); });
  }

  class K12MainNav extends HTMLElement{
    connectedCallback(){
      if(this.dataset.rendered==="true") return;
      this.dataset.rendered="true";
      this.innerHTML=String.raw`
<header class="app-shell-bar">
  <button type="button" id="appMenuButton" class="app-menu-button" onclick="toggleAppNavigation()" aria-label="Open learning menu" aria-controls="appNavShell" aria-expanded="false"><span></span><span></span><span></span></button>
  <button type="button" class="app-wordmark" onclick="navigateFromAppMenu('home')"><span class="app-wordmark-mark">LM</span><span><strong>LearnMaster</strong><small>K–12 Learning</small></span></button>
  <div class="appbar-actions">
    <div class="lesson-search-nav appbar-search" id="lessonSearchNav">
      <button type="button" class="appbar-icon-button lesson-search-toggle" onclick="toggleLessonSearch(event)" aria-label="Search lessons">⌕</button>
      <div class="lesson-search-popover" id="lessonSearchPanel" hidden>
        <input id="lessonSearchInput" class="lesson-search-input" type="search" placeholder="Search every lesson" autocomplete="off">
        <div id="lessonSearchResults" class="lesson-search-results" aria-live="polite"></div>
      </div>
    </div>
    <button type="button" class="app-points-chip" onclick="navigateFromAppMenu('shop')" aria-label="Open rewards shop"><span>★</span><b id="menuPoints">0</b><small>points</small></button>
    <div class="dropdown">
      <button type="button" class="app-profile-button dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="avatar" id="userAvatar">U</span><span class="app-profile-copy"><b id="userNameNav">User</b><small>My learning space</small></span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end user-menu app-profile-menu">
        <li class="user-head"><div class="user-mini"><div class="avatar" id="userAvatar2">U</div><div><b id="userNameMenu">User</b><div class="user-sub">Plan: <span class="user-chip" id="planChip">NONE</span> · Trial: <span id="trialChip">Off</span></div><div class="user-sub">Learners: <span id="menuLearners">0</span></div></div></div></li>
        <li><hr class="dropdown-divider"></li>
        <li class="dropdown-header">Switch learner</li><li><div class="user-switch-list" id="userListMenu"></div></li>
        <li><hr class="dropdown-divider"></li>
        <li><button type="button" class="dropdown-item" onclick="show('analysis')">Progress</button></li>
        <li><button type="button" class="dropdown-item" onclick="show('settings')">Settings & avatar</button></li>
        <li><button type="button" class="dropdown-item" onclick="showPaywall()">Subscription</button></li>
        <li><button type="button" class="dropdown-item" onclick="toggleVoice()" id="voiceItem">Voice: On</button></li>
        <li><button type="button" class="dropdown-item" onclick="toggleMusic()" id="musicItem">Music: Off</button></li>
        <li><hr class="dropdown-divider"></li>
        <li><button type="button" class="dropdown-item app-signout" onclick="logout()">Sign out</button></li>
      </ul>
    </div>
  </div>
</header>

<div id="appNavShell" class="app-nav-shell" aria-hidden="true">
  <button type="button" class="app-nav-scrim" onclick="toggleAppNavigation(false)" aria-label="Close learning menu"></button>
  <aside class="app-nav-drawer" aria-label="Learning navigation">
    <div class="app-nav-head"><div><span>LEARNMASTER</span><h2>Where to next?</h2></div><button type="button" onclick="toggleAppNavigation(false)" aria-label="Close menu">×</button></div>
    <nav class="app-nav-primary">
      <button type="button" onclick="navigateFromAppMenu('home')"><span>⌂</span><div><b>Today</b><small>Your learning dashboard</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('grades')"><span>▦</span><div><b>Grade library</b><small>Browse every level</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('reading')"><span>R</span><div><b>Reading room</b><small>Passages by grade</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('playground')"><span>◇</span><div><b>Playground</b><small>Reward games</small></div></button>
    </nav>
    <div class="app-nav-section">
      <span class="app-nav-label">JUMP TO A GRADE</span>
      <div class="app-grade-jump">
        <button type="button" onclick="navigateFromAppMenu('prek')">Pre-K</button><button type="button" onclick="navigateFromAppMenu('kinder')">K</button><button type="button" onclick="navigateFromAppMenu('grade1')">1</button>
        <button type="button" onclick="navigateFromAppMenu('grade2')">2</button><button type="button" onclick="navigateFromAppMenu('grade3')">3</button><button type="button" onclick="navigateFromAppMenu('grade4')">4</button>
        <button type="button" onclick="navigateFromAppMenu('grade5')">5</button><button type="button" onclick="navigateFromAppMenu('grade6')">6</button><button type="button" onclick="navigateFromAppMenu('grade7')">7</button>
        <button type="button" onclick="navigateFromAppMenu('grade8')">8</button><button type="button" onclick="navigateFromAppMenu('grade9')">9</button><button type="button" onclick="navigateFromAppMenu('grade10')">10</button>
      </div>
    </div>
    <div class="app-nav-bottom">
      <label for="languagePicker">Language</label>
      <select id="languagePicker" class="language-picker" aria-label="Language" onchange="setLanguage(this.value)"><option value="en">English</option><option value="es">Español</option><option value="fr">Français</option><option value="zh">中文</option><option value="hi">हिन्दी</option></select>
      <button type="button" onclick="navigateFromAppMenu('shop')">Rewards shop</button>
    </div>
  </aside>
</div>`;
    }
  }
  customElements.define("k12-main-nav",K12MainNav);
})();
