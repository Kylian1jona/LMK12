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
<header class="lm-topbar">
  <button type="button" class="lm-logo-button" onclick="navigateFromAppMenu('home')" aria-label="LearnMaster home">
    <img src="images/learnmaster-logo-header-v2.png" alt="LearnMaster K12">
  </button>
  <nav class="lm-desktop-nav" aria-label="Main navigation">
    <button type="button" onclick="navigateFromAppMenu('home')">Home</button>
    <button type="button" onclick="navigateFromAppMenu('grades')">Grades</button>
    <button type="button" onclick="navigateFromAppMenu('reading')">Reading</button>
    <button type="button" onclick="navigateFromAppMenu('analysis')">Progress</button>
    <button type="button" class="is-coming" onclick="navigateFromAppMenu('worksheets')">Worksheets <small>Coming soon</small></button>
    <button type="button" onclick="navigateFromAppMenu('shop')">Shop</button>
    <button type="button" onclick="navigateFromAppMenu('settings')">Settings</button>
    <button type="button" class="is-coming" onclick="navigateFromAppMenu('playground')">Playground <small>Coming soon</small></button>
  </nav>
  <div class="lm-top-actions">
    <div class="lesson-search-nav lm-search" id="lessonSearchNav">
      <button type="button" class="lm-round-button lesson-search-toggle" onclick="toggleLessonSearch(event)" aria-label="Search lessons">Search</button>
      <div class="lesson-search-popover" id="lessonSearchPanel" hidden>
        <input id="lessonSearchInput" class="lesson-search-input" type="search" placeholder="Search lessons" autocomplete="off">
        <div id="lessonSearchResults" class="lesson-search-results" aria-live="polite"></div>
      </div>
    </div>
    <button type="button" class="lm-points" onclick="navigateFromAppMenu('shop')"><span>&#9733;</span><b id="menuPoints">0</b></button>
    <button type="button" id="appMenuButton" class="lm-menu-button" onclick="toggleAppNavigation()" aria-label="Open account menu" aria-controls="appNavShell" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</header>

<div id="appNavShell" class="app-nav-shell lm-menu-shell" aria-hidden="true">
  <button type="button" class="app-nav-scrim" onclick="toggleAppNavigation(false)" aria-label="Close menu"></button>
  <aside class="app-nav-drawer lm-menu-drawer" aria-label="Account and learning menu">
    <div class="lm-menu-head">
      <img src="images/learnmaster-logo-header-v2.png" alt="LearnMaster K12">
      <button type="button" onclick="toggleAppNavigation(false)" aria-label="Close menu">&times;</button>
    </div>
    <div class="lm-learner-card">
      <span class="avatar" id="userAvatar">U</span>
      <div><b id="userNameNav">User</b><small>My learning space</small></div>
      <span class="visually-hidden" id="userAvatar2">U</span><span class="visually-hidden" id="userNameMenu">User</span>
    </div>
    <nav class="lm-menu-links">
      <button type="button" onclick="navigateFromAppMenu('home')"><span>01</span><div><b>Home</b><small>Your daily starting point</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('grades')"><span>02</span><div><b>Grade library</b><small>Pre-K through Grade 10</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('reading')"><span>03</span><div><b>Reading room</b><small>Passages and practice</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('analysis')"><span>04</span><div><b>Progress</b><small>Goals, streaks, and accuracy</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('shop')"><span>05</span><div><b>Rewards shop</b><small>Spend Learners on toys</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('settings')"><span>06</span><div><b>Settings</b><small>Profile and learning preferences</small></div></button>
      <button type="button" onclick="showPaywall();toggleAppNavigation(false)"><span>07</span><div><b>Subscription</b><small>Plans and family access</small></div></button>
      <button type="button" class="is-disabled" onclick="navigateFromAppMenu('playground')"><span>08</span><div><b>Playground</b><small>Coming soon</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('worksheets')"><span>09</span><div><b>Worksheets</b><small>Being built</small></div></button>
      <button type="button" class="is-disabled" aria-disabled="true" onclick="toast('Awards are coming soon!')"><span>10</span><div><b>Awards</b><small>Coming soon</small></div></button>
    </nav>
    <div class="lm-grade-jump">
      <span>Jump to grade</span>
      <div><button onclick="navigateFromAppMenu('prek')">PK</button><button onclick="navigateFromAppMenu('kinder')">K</button><button onclick="navigateFromAppMenu('grade1')">1</button><button onclick="navigateFromAppMenu('grade2')">2</button><button onclick="navigateFromAppMenu('grade3')">3</button><button onclick="navigateFromAppMenu('grade4')">4</button><button onclick="navigateFromAppMenu('grade5')">5</button><button onclick="navigateFromAppMenu('grade6')">6</button><button onclick="navigateFromAppMenu('grade7')">7</button><button onclick="navigateFromAppMenu('grade8')">8</button><button onclick="navigateFromAppMenu('grade9')">9</button><button onclick="navigateFromAppMenu('grade10')">10</button></div>
    </div>
    <div class="lm-menu-preferences">
      <label for="languagePicker">Language</label>
      <select id="languagePicker" class="language-picker" onchange="setLanguage(this.value)"><option value="en">English</option><option value="es">Spanish</option><option value="fr">French</option><option value="zh">Chinese</option><option value="hi">Hindi</option></select>
      <button type="button" onclick="toggleVoice()" id="voiceItem">Voice: On</button>
      <button type="button" onclick="toggleMusic()" id="musicItem">Music: Off</button>
    </div>
    <div class="lm-menu-footer"><span>Plan: <b id="planChip">NONE</b></span><span>Trial: <b id="trialChip">Off</b></span><span>Learners: <b id="menuLearners">0</b></span><div id="userListMenu" class="user-switch-list"></div><button type="button" onclick="logout()">Sign out</button></div>
  </aside>
</div>`;
    }
  }
  customElements.define("k12-main-nav",K12MainNav);
})();
