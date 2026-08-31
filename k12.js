enforceUniqueLessonImages();

function setupImageZoom(){
  if(window.__k12ImageZoomReady) return;
  window.__k12ImageZoomReady = true;
  document.addEventListener("click", event=>{
    const img = event.target.closest?.("img");
    if(!img) return;
    document.querySelectorAll("img.img-zoomed").forEach(other=>{
      if(other !== img) other.classList.remove("img-zoomed");
    });
    img.classList.toggle("img-zoomed");
  });
}

let LESSON_SEARCH_INDEX = [];

function lessonSearchSafe(value){
  if(typeof htmlSafe === "function") return htmlSafe(value);
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function lessonSearchGradeName(grade){
  const gradeNames = {
    prek:"Pre-K",
    k:"Kindergarten",
    g1:"Grade 1",
    g2:"Grade 2",
    g3:"Grade 3",
    g4:"Grade 4",
    g5:"Grade 5",
    g6:"Grade 6",
    g7:"Grade 7",
    g8:"Grade 8",
    g9:"Grade 9",
    g10:"Grade 10"
  };
  return gradeNames[grade] || String(grade).toUpperCase();
}

function lessonSearchSubjectName(subj, group){
  if(group?.showName) return group.showName;
  if(typeof SUBJECT_LABELS !== "undefined" && SUBJECT_LABELS[subj]) return SUBJECT_LABELS[subj];
  return String(subj).toUpperCase();
}

function buildLessonSearchIndex(){
  if(typeof CURR === "undefined") return [];
  const index = [];
  Object.entries(CURR).forEach(([grade, subjects])=>{
    Object.entries(subjects || {}).forEach(([subj, group])=>{
      if(!group || typeof group !== "object") return;
      const gradeName = lessonSearchGradeName(grade);
      const subjectName = lessonSearchSubjectName(subj, group);
      Object.entries(group).forEach(([lesson, pack])=>{
        if(lesson === "showName" || !pack || typeof pack !== "object") return;
        const name = pack.name || lesson;
        const search = `${gradeName} ${grade} ${subjectName} ${subj} ${lesson} ${name}`.toLowerCase();
        index.push({ grade, subj, lesson, name, gradeName, subjectName, search });
      });
    });
  });
  LESSON_SEARCH_INDEX = index;
  return index;
}

function renderLessonSearch(query){
  const results = $("lessonSearchResults");
  if(!results) return;

  const terms = String(query || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
  if(!terms.length){
    results.innerHTML = `<div class="lesson-search-empty">Type a grade, subject, or lesson name.</div>`;
    return;
  }

  const matches = buildLessonSearchIndex()
    .filter(item=>terms.every(term=>item.search.includes(term)))
    .slice(0, 14);

  results.innerHTML = "";
  if(!matches.length){
    results.innerHTML = `<div class="lesson-search-empty">No lessons found.</div>`;
    return;
  }

  matches.forEach(item=>{
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lesson-search-result";
    button.innerHTML = `
      <span class="lesson-search-title">${lessonSearchSafe(item.name)}</span>
      <span class="lesson-search-meta">${lessonSearchSafe(item.gradeName)} - ${lessonSearchSafe(item.subjectName)} - ${lessonSearchSafe(item.lesson)}</span>
    `;
    button.onclick = ()=>{
      closeLessonSearch();
      startLesson(item.grade, item.subj, item.lesson);
    };
    results.appendChild(button);
  });
}

function setupLessonSearch(){
  const input = $("lessonSearchInput");
  if(!input || input.dataset.ready === "true") return;
  input.dataset.ready = "true";
  input.addEventListener("input", ()=>renderLessonSearch(input.value));
  input.addEventListener("keydown", event=>{
    if(event.key !== "Enter") return;
    const first = $("lessonSearchResults")?.querySelector(".lesson-search-result");
    if(first) first.click();
  });
  renderLessonSearch("");
}

function openLessonSearch(event){
  event?.preventDefault?.();
  event?.stopPropagation?.();
  setupLessonSearch();
  const nav = $("lessonSearchNav");
  const panel = $("lessonSearchPanel");
  const input = $("lessonSearchInput");
  if(!nav || !panel || !input) return;
  nav.classList.add("is-open");
  panel.hidden = false;
  renderLessonSearch(input.value);
  setTimeout(()=>input.focus(), 0);
}

function closeLessonSearch(){
  const nav = $("lessonSearchNav");
  const panel = $("lessonSearchPanel");
  if(nav) nav.classList.remove("is-open");
  if(panel) panel.hidden = true;
}

function toggleLessonSearch(event){
  event?.preventDefault?.();
  event?.stopPropagation?.();
  const nav = $("lessonSearchNav");
  if(nav?.classList.contains("is-open")) closeLessonSearch();
  else openLessonSearch();
}

document.addEventListener("click", event=>{
  const nav = $("lessonSearchNav");
  if(!nav || !nav.classList.contains("is-open")) return;
  if(event.target.closest?.("#lessonSearchNav")) return;
  closeLessonSearch();
});

/* ===========================
   Boot
=========================== */
let initialAppUIRendered = false;
let earlyLessonsPreloaded = false;
let restoredTutorUser = null;

function renderInitialAppUI(){
  if(initialAppUIRendered) return;
  initialAppUIRendered = true;
  applyTheme();
  loadKids();
  loadState();
  updateUserUI();
  renderVoiceControls();
  renderAllBadges();
  renderConvertButtons();
  renderShop();
  renderGrade10LessonButtons();
  renderHistorySections();
  setupLessonSearch();
  setupImageZoom();
}

function preloadEarlyLessons(){
  if(earlyLessonsPreloaded) return;
  earlyLessonsPreloaded = true;

  if(typeof pkaGen === "function") pkaGen();
  if(typeof pkcGen === "function") pkcGen();
  if(typeof pksGen === "function") pksGen();
  if(typeof kscLoad === "function") kscLoad();
  if(typeof ksbLoad === "function") ksbLoad();
  if(typeof krGen === "function") krGen();
  if(typeof g1asGen === "function") g1asGen();
  if(typeof g1gGen === "function") g1gGen();
  if(typeof g1mGen === "function") g1mGen();
}

async function restoreActiveSession(){
  const client = window.learnMasterSupabase;
  if(!client || !window.learnMasterStore) return false;

  let session = null;
  try{
    const { data, error } = await client.auth.getSession();
    if(error) throw error;
    session = data?.session || null;
  }catch(error){
    console.warn("Could not restore the LearnMaster session:", error?.message || error);
    return false;
  }
  if(!session?.user) return false;

  const lastActivity = Number(localStorage.getItem(INACTIVITY_KEY) || 0);
  const elapsed = Date.now() - lastActivity;
  const sessionExpired = !Number.isFinite(lastActivity)
    || lastActivity <= 0
    || elapsed < 0
    || elapsed >= INACTIVITY_LIMIT_MS;

  if(sessionExpired){
    try{ await client.auth.signOut(); }
    catch(error){ console.warn("Could not close the expired Supabase session:", error?.message || error); }
    window.learnMasterStore.clearUser();
    stopInactivityTimer(true);
    return false;
  }

  try{
    await window.learnMasterStore.hydrate(session.user);
  }catch(error){
    console.warn("Could not restore LearnMaster account data:", error?.message || error);
    return false;
  }

  const metadata = session.user.user_metadata || {};
  const restoredRole=typeof resolveAccountRole==="function"?await resolveAccountRole(session.user):(metadata.account_role==="tutor"?"tutor":"family");
  if(restoredRole === "tutor"){
    restoredTutorUser = session.user;
    hideLogin();
    return true;
  }
  const emailName = String(session.user.email || "").split("@")[0] || "learner";
  const username = String(metadata.username || emailName).trim().toLowerCase() || "learner";
  const displayName = String(metadata.display_name || username).trim() || username;
  const accountKid = upsertLocalSupabaseKid(session.user, username, displayName);
  const kids = loadKids();
  if(!kids.some(kid=>kid.id === getActiveKidId())) setActiveKidId(accountKid.id);

  await refreshSubscriptionAccess();
  await refreshAccountAuthority();
  hideLogin();
  return true;
}

async function bootLearnMaster(){
  const sessionRestored = await restoreActiveSession();
  renderInitialAppUI();
  preloadEarlyLessons();

  if(!sessionRestored){
    showLogin("");
    return;
  }

  if(restoredTutorUser){
    await enterTutorWorkspace(restoredTutorUser);
    return;
  }

  applyAccessUI();
  if(!subscriptionAccessAllowed()&&!currentAccountIsAdmin) showPaywall(true);
  else showProfileChooser();
}

document.addEventListener("DOMContentLoaded", ()=>{
  bootLearnMaster().catch(error=>{
    console.error("LearnMaster could not finish starting:", error);
    renderInitialAppUI();
    preloadEarlyLessons();
    showLogin("");
  });
}, { once:true });
