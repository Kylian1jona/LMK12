(function(){
  function setDrawer(open){
    const shell=document.getElementById("appNavShell");
    const button=document.getElementById("appMenuButton");
    if(!shell) return;
    shell.classList.toggle("is-open",Boolean(open));
    shell.setAttribute("aria-hidden",String(!open));
    button?.setAttribute("aria-expanded",String(Boolean(open)));
    document.body.classList.toggle("app-menu-open",Boolean(open));
    if(open) document.getElementById("menuDiscoveryHint")?.classList.remove("is-visible");
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

  const iconSets={
    eng:["book-alt","pencil","document","comment-alt","book-open-cover"],
    math:["calculator","ruler-triangle","chart-pie-alt","lightbulb-on","test"],
    sci:["flask","microscope","leaf","planet-ringed","magnet"],
    hist:["landmark-alt","globe","flag","scroll","map"],
    general:["backpack","rocket-lunch","clipboard-list-check","star","school"]
  };
  function addIcon(element,name){
    if(!element || element.querySelector(":scope > .lm-ui-icon")) return;
    const icon=document.createElement("i");
    icon.className=`fi fi-rr-${name} lm-ui-icon`;
    icon.setAttribute("aria-hidden","true");
    element.prepend(icon);
    element.classList.add("has-ui-icon");
  }
  function stripLeadingEmoji(element){
    if(!element || element.dataset.iconTextCleaned) return;
    element.dataset.iconTextCleaned="true";
    for(const node of element.childNodes){
      if(node.nodeType===Node.TEXT_NODE){
        node.textContent=node.textContent.replace(/^[^\p{L}\p{N}]+/u,"");
        break;
      }
    }
  }
  window.decorateLearnMasterIcons=function(root=document){
    const gradeIcons=["backpack","pencil","calculator","book-alt","flask","globe","school","graduation-cap"];
    root.querySelectorAll?.(".grade-card").forEach((card,index)=>{
      if(index%2===0) return;
      const title=card.querySelector(".grade-title");
      stripLeadingEmoji(title);
      addIcon(title,gradeIcons[index%gradeIcons.length]);
    });
    root.querySelectorAll?.(".settings-card-heading").forEach((heading,index)=>{
      const badge=heading.querySelector(":scope > span");
      if(badge && !badge.querySelector(":scope > .lm-ui-icon")) badge.textContent="";
      addIcon(badge,["user","headphones","palette","credit-card","users"][index%5]);
    });
    root.querySelectorAll?.(".early-subject-choice,.grade-subject-option").forEach((button,index)=>addIcon(button,["book-alt","calculator","flask","landmark-alt"][index%4]));
    root.querySelectorAll?.(".learner-icon").forEach(icon=>{
      icon.textContent="";
      icon.classList.add("fi","fi-rr-user","lm-ui-icon","has-ui-icon");
      icon.setAttribute("aria-hidden","true");
    });
    root.querySelectorAll?.('.section[id^="g"][id*="-"] .lesson-column .btn').forEach((button,index)=>{
      const id=button.closest('.section[id^="g"][id*="-"]')?.id||"";
      const subject=id.includes("-math")?"math":id.includes("-sci")?"sci":id.includes("-hist")?"hist":id.includes("-eng")?"eng":"general";
      const set=iconSets[subject];
      addIcon(button,set[index%set.length]);
    });
  };
  let iconRefreshQueued=false;
  function queueIconRefresh(){
    if(iconRefreshQueued) return;
    iconRefreshQueued=true;
    requestAnimationFrame(()=>{iconRefreshQueued=false;window.decorateLearnMasterIcons(document);});
  }
  document.addEventListener("DOMContentLoaded",()=>{
    queueIconRefresh();
    new MutationObserver(queueIconRefresh).observe(document.body,{childList:true,subtree:true});
  },{once:true});

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
    <button type="button" onclick="navigateFromAppMenu('grades')">Grades &amp; Extras</button>
    <button type="button" onclick="navigateFromAppMenu('reading')">Reading</button>
    <button type="button" onclick="navigateFromAppMenu('testPrep')">Test Prep</button>
    <button type="button" onclick="navigateFromAppMenu('tutorAssignments')">Tutor Assignments</button>
    <button type="button" onclick="navigateFromAppMenu('shop')">Shop</button>
    <button type="button" onclick="navigateFromAppMenu('settings')">Settings</button>
    <button type="button" onclick="navigateFromAppMenu('playground')">Playground</button>
  </nav>
  <div class="lm-top-actions">
    <div class="lesson-search-nav lm-search" id="lessonSearchNav">
      <button type="button" class="lm-round-button lesson-search-toggle" onclick="toggleLessonSearch(event)" aria-label="Search lessons" title="Search lessons"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m16.5 16.5 4 4"></path></svg></button>
      <div class="lesson-search-popover" id="lessonSearchPanel" hidden>
        <input id="lessonSearchInput" class="lesson-search-input" type="search" placeholder="Search lessons" autocomplete="off">
        <div id="lessonSearchResults" class="lesson-search-results" aria-live="polite"></div>
      </div>
    </div>
    <button type="button" class="lm-points" onclick="navigateFromAppMenu('shop')" aria-label="Open rewards shop"><i class="fi fi-rr-star lm-ui-icon" aria-hidden="true"></i><b id="menuPoints">0</b></button>
    <button type="button" id="appMenuButton" class="lm-menu-button" onclick="toggleAppNavigation()" aria-label="Open account menu" aria-controls="appNavShell" aria-expanded="false"><span></span><span></span><span></span></button>
    <div class="menu-discovery-hint" id="menuDiscoveryHint" role="status" aria-live="polite"><svg class="menu-hint-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20V5m0 0L6 11m6-6 6 6"></path></svg><span>Click the 3 bars to open your menu</span><button type="button" aria-label="Dismiss menu tip">&times;</button></div>
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
      <button type="button" onclick="navigateFromAppMenu('grades')"><span>02</span><div><b>Grades &amp; Extras</b><small>Grade courses and skill studios</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('reading')"><span>03</span><div><b>Reading room</b><small>Passages and practice</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('testPrep')"><span>04</span><div><b>Test preparation</b><small>SAT, ACT, STAAR, and state testing</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('tutorAssignments')"><span>05</span><div><b>Tutor assignments</b><small>Practice and tutor notes</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('shop')"><span>06</span><div><b>Rewards shop</b><small>Spend Learners on toys</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('settings')"><span>07</span><div><b>Settings</b><small>Profile and learning preferences</small></div></button>
      <button type="button" onclick="showPaywall();toggleAppNavigation(false)"><span>08</span><div><b>Subscription</b><small>Plans and family access</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('playground')"><span>09</span><div><b>Playground</b><small>Learning and fun games</small></div></button>
      <button type="button" onclick="navigateFromAppMenu('worksheets')"><span>10</span><div><b>Worksheets</b><small>Being built</small></div></button>
      <button type="button" class="is-disabled" aria-disabled="true" onclick="toast('Awards are coming soon!')"><span>11</span><div><b>Awards</b><small>Coming soon</small></div></button>
    </nav>
    <div class="lm-grade-jump">
      <span>Jump to grade</span>
      <div><button onclick="navigateFromAppMenu('prek')">PK</button><button onclick="navigateFromAppMenu('kinder')">K</button><button onclick="navigateFromAppMenu('grade1')">1</button><button onclick="navigateFromAppMenu('grade2')">2</button><button onclick="navigateFromAppMenu('grade3')">3</button><button onclick="navigateFromAppMenu('grade4')">4</button><button onclick="navigateFromAppMenu('grade5')">5</button><button onclick="navigateFromAppMenu('grade6')">6</button><button onclick="navigateFromAppMenu('grade7')">7</button><button onclick="navigateFromAppMenu('grade8')">8</button><button onclick="navigateFromAppMenu('grade9')">9</button><button onclick="navigateFromAppMenu('grade10')">10</button><button onclick="navigateFromAppMenu('grade11')">11</button><button onclick="navigateFromAppMenu('grade12')">12</button></div>
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
      const hint=this.querySelector("#menuDiscoveryHint");
      hint?.querySelector("button")?.addEventListener("click",()=>{
        hint.classList.remove("is-visible");
      });
      window.setTimeout(()=>{
        let showCount=0;
        try{ showCount=Number(localStorage.getItem("learnmaster_menu_hint_shows_v1")||0); }catch(error){}
        if(showCount<3 && !document.getElementById("appNavShell")?.classList.contains("is-open")){
          hint?.classList.add("is-visible");
          try{ localStorage.setItem("learnmaster_menu_hint_shows_v1",String(showCount+1)); }catch(error){}
        }
      },300000);
    }
  }
  customElements.define("k12-main-nav",K12MainNav);
})();
