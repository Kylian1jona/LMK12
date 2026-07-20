(function(){
  class K12MainNav extends HTMLElement {
    connectedCallback(){
      if(this.dataset.rendered === "true") return;
      this.dataset.rendered = "true";
      this.innerHTML = String.raw`
<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" onclick="show('home')" style="font-family:'Baloo 2',cursive;">LearnMaster K-12</a>

    <ul class="navbar-nav ms-auto align-items-lg-center gap-2">
      <li class="nav-item"><a class="nav-link" onclick="show('home')">Home</a></li>
      <li class="nav-item"><a class="nav-link" onclick="show('grades')">Grades</a></li>
      <li class="nav-item"><a class="nav-link" onclick="showReading()">Reading</a></li>
      <li class="nav-item"><a class="nav-link" onclick="show('playground')">Playground</a></li>
      <li class="nav-item language-picker-item">
        <label class="visually-hidden" for="languagePicker">Language</label>
        <select id="languagePicker" class="language-picker" aria-label="Language" onchange="setLanguage(this.value)">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="zh">中文</option>
          <option value="hi">हिन्दी</option>
        </select>
      </li>
      <li class="nav-item nav-search-item">
        <div class="lesson-search-nav" id="lessonSearchNav">
          <button type="button" class="lesson-search-toggle" onclick="toggleLessonSearch(event)" aria-label="Search lessons">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6"></circle>
              <path d="M16 16 L21 21"></path>
            </svg>
          </button>
          <div class="lesson-search-popover" id="lessonSearchPanel" hidden>
            <input id="lessonSearchInput" class="lesson-search-input" type="search" placeholder="Search lessons" autocomplete="off" />
            <div id="lessonSearchResults" class="lesson-search-results" aria-live="polite"></div>
          </div>
        </div>
      </li>

      <!-- USER DROPDOWN -->
      <li class="nav-item dropdown ms-lg-2">
        <button type="button" class="userbtn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="avatar" id="userAvatar">U</span>
          <span id="userNameNav">User</span>
        </button>

        <ul class="dropdown-menu dropdown-menu-end user-menu">
          <li class="px-3 py-3 user-head">
            <div class="user-mini">
              <div class="avatar" id="userAvatar2">U</div>
              <div>
                <b id="userNameMenu">User</b>
                <div class="user-sub">
                  Plan: <span class="user-chip" id="planChip">NONE</span>
                  <span class="ms-2">Trial: <span id="trialChip">Off</span></span>
                </div>
                <div class="user-sub mt-1">
                  ⭐ <span id="menuPoints">0</span> • <span class="learner-icon" role="img" aria-label="Learner"></span> <span id="menuLearners">0</span>
                </div>
              </div>
            </div>
          </li>

          <li><hr class="dropdown-divider"></li>

          <li class="dropdown-header">Switch user</li>
          <li><div class="user-switch-list" id="userListMenu"></div></li>

          <li><hr class="dropdown-divider"></li>

          <li><button type="button" class="dropdown-item" onclick="showPaywall()">💳 Subscription details</button></li>
          <li><button type="button" class="dropdown-item" onclick="toggleVoice()" id="voiceItem">🔊 Voice: On</button></li>

          <li><button type="button" class="dropdown-item" onclick="show('settings')">Settings & avatar</button></li>
          <li><button type="button" class="dropdown-item" onclick="show('analysis')">Progress analysis</button></li>
          <li><button type="button" class="dropdown-item" onclick="show('shop')">Shop</button></li>
          <li><button type="button" class="dropdown-item" onclick="show('playground')">Playground</button></li>

          <li><hr class="dropdown-divider"></li>
          <li><button type="button" class="dropdown-item text-white" style="background:var(--red)!important;" onclick="logout()">Sign out</button></li>
        </ul>
      </li>
    </ul>
  </div>
</nav>
`;
    }
  }

  customElements.define("k12-main-nav", K12MainNav);
})();
