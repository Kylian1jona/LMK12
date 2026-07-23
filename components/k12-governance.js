const TEKS_SUBJECTS = {
  eng:{ label:"English Language Arts and Reading", chapter:"Chapter 110", focus:"foundational language, comprehension, response, and composition", href:"https://tea.texas.gov/laws-and-rules/texas-administrative-code/19-tac-chapter-110" },
  math:{ label:"Mathematics", chapter:"Chapter 111", focus:"mathematical process standards, computation, and reasoning", href:"https://tea.texas.gov/laws-and-rules/texas-administrative-code/19-tac-chapter-111" },
  sci:{ label:"Science", chapter:"Chapter 112", focus:"scientific practices, recurring themes, and grade-level concepts", href:"https://tea.texas.gov/laws-and-rules/texas-administrative-code/19-tac-chapter-112" },
  hist:{ label:"Social Studies", chapter:"Chapter 113", focus:"history, geography, government, citizenship, economics, and social studies skills", href:"https://tea.texas.gov/laws-and-rules/texas-administrative-code/19-tac-chapter-113" }
};

/* Shared TEKS course map. This file loads before curriculum extensions, so
   every grade-specific generator can attach its exact course and student
   expectation before the final contract audit runs. */
const TEKS_COURSES = {
  g2:{eng:["§110.4","English Language Arts and Reading, Grade 2"],math:["§111.4","Mathematics, Grade 2"],sci:["§112.4","Science, Grade 2"],hist:["§113.13","Social Studies, Grade 2"]},
  g3:{eng:["§110.5","English Language Arts and Reading, Grade 3"],math:["§111.5","Mathematics, Grade 3"],sci:["§112.5","Science, Grade 3"],hist:["§113.14","Social Studies, Grade 3"]},
  g4:{eng:["§110.6","English Language Arts and Reading, Grade 4"],math:["§111.6","Mathematics, Grade 4"],sci:["§112.6","Science, Grade 4"],hist:["§113.15","Social Studies, Grade 4"]},
  g5:{eng:["§110.7","English Language Arts and Reading, Grade 5"],math:["§111.7","Mathematics, Grade 5"],sci:["§112.7","Science, Grade 5"],hist:["§113.16","Social Studies, Grade 5"]},
  g6:{eng:["§110.22","English Language Arts and Reading, Grade 6"],math:["§111.26","Mathematics, Grade 6"],sci:["§112.26","Science, Grade 6"],hist:["§113.18","Social Studies, Grade 6"]},
  g7:{eng:["§110.23","English Language Arts and Reading, Grade 7"],math:["§111.27","Mathematics, Grade 7"],sci:["§112.27","Science, Grade 7"],hist:["§113.19","Social Studies, Grade 7"]},
  g8:{eng:["§110.24","English Language Arts and Reading, Grade 8"],math:["§111.28","Mathematics, Grade 8"],sci:["§112.28","Science, Grade 8"],hist:["§113.20","Social Studies, Grade 8"]},
  g9:{eng:["§110.36","English I"],math:["§111.39","Algebra I"],sci:["§112.42","Biology"],hist:["§113.43","World Geography Studies"]},
  g10:{eng:["§110.37","English II"],math:["§111.41","Geometry"],sci:["§112.43","Chemistry"],hist:["§113.42","World History Studies"]}
};

function teksStrandForLesson(subject, lessonName){
  const title=String(lessonName||"").toLowerCase();
  if(subject==="eng"){
    if(/vowel|syllable|blend|digraph|spelling|word|root|prefix|suffix|homophone|context/.test(title)) return "Foundational language and vocabulary";
    if(/edit|sentence|verb|noun|pronoun|punctuation|grammar|conjunction|preposition|writing|research/.test(title)) return "Composition, conventions, and inquiry";
    if(/author|purpose|craft|rhetoric|tone|mood/.test(title)) return "Author's purpose and craft";
    return "Comprehension, response, and multiple genres";
  }
  if(subject==="math"){
    if(/data|mean|median|range|probability|statistic/.test(title)) return "Data analysis and personal financial literacy";
    if(/shape|geometry|angle|area|volume|surface|coordinate|pythagorean|trigonometry|similarity|transformation/.test(title)) return "Geometry and measurement";
    if(/equation|expression|function|slope|quadratic|polynomial|inequal/.test(title)) return "Algebraic reasoning";
    return "Number and operations with mathematical processes";
  }
  if(subject==="sci"){
    if(/ecosystem|cell|body|plant|animal|life|genetic|dna|natural selection|photosynthesis/.test(title)) return "Organisms and environments";
    if(/earth|rock|weather|climate|space|planet|solar|star|galax/.test(title)) return "Earth and space";
    return "Matter and energy; force, motion, and energy";
  }
  if(/map|geograph|place|region|trade/.test(title)) return "Geography and economics with social studies skills";
  if(/rule|law|government|constitution|citizen|leader/.test(title)) return "Government and citizenship with social studies skills";
  return "History and culture with social studies skills";
}
let currentAccountIsAdmin = false;

function getLessonTeksAlignment(grade, subj, lesson){
  const exact=typeof CURR==="object" ? CURR?.[grade]?.[subj]?.[lesson]?.teks : null;
  if(exact) return {
    framework:`${exact.expectation || exact.code} | ${exact.course}`,
    subject:exact.course,
    href:exact.source,
    status:"TEKS student expectation",
    focus:exact.expectationText || exact.strand
  };
  const source = TEKS_SUBJECTS[subj];
  const gradeLabel = String(grade || "").replace(/^g/i, "Grade ");
  if(!source) return null;
  return {
    framework:`${source.chapter} · ${gradeLabel}`,
    subject:source.label,
    href:source.href,
    focus:source.focus,
    status:"TEKS framework mapped"
  };
}

function openTeksStandards(){
  if(!loggedIn){ showLogin(""); return; }
  renderTeksStandards(); show("curriculumStandards");
}
function renderTeksStandards(){
  const grid = $("teksStandardsGrid"); if(!grid) return;
  grid.innerHTML = Object.values(TEKS_SUBJECTS).map(s=>`<article><span>Official TEA source</span><h2>${htmlSafe(s.label)}</h2><strong>${s.chapter}</strong><p>Framework source verified · lesson-level educator review tracked separately.</p><a href="${s.href}" target="_blank" rel="noopener">View TEA source</a></article>`).join("");
}
function openPrivacyNotice(){
  const modal = $("privacyNotice"); if(modal) modal.style.display = "flex";
  const check = $("parentConsentCheck"); if(check) check.checked = localStorage.getItem("learnmaster_parent_consent_v1") === "1";
}
function closePrivacyNotice(){ const modal=$("privacyNotice"); if(modal) modal.style.display="none"; }
async function recordParentConsent(){
  const status=$("privacyConsentStatus");
  if(!loggedIn){ if(status) status.textContent="Sign in to save parent consent."; return; }
  if(!$("parentConsentCheck")?.checked){ if(status) status.textContent="Check the consent box before saving."; return; }
  localStorage.setItem("learnmaster_parent_consent_v1","1");
  const client=window.learnMasterSupabase;
  if(client){
    const {data}=await client.auth.getUser();
    if(data?.user){
      const {error}=await client.from("learnmaster_parent_consents").upsert({user_id:data.user.id,privacy_version:"2026-07-22",consented_at:new Date().toISOString()},{onConflict:"user_id"});
      if(error) console.warn("Parent consent table is not installed yet:",error.message);
    }
  }
  if(status) status.textContent="Parent consent saved.";
  if(typeof renderParentPortal==="function" && currentPortalRole==="parent") renderParentPortal();
}
function openParentFromFooter(){ if(!loggedIn) showLogin(""); else if(currentPortalRole==="parent") show("parentPortal"); else showProfileChooser(); }

async function refreshAccountAuthority(){
  currentAccountIsAdmin=false;
  const client=window.learnMasterSupabase; if(!client) return false;
  const {data}=await client.auth.getUser(); if(!data?.user) return false;
  const {data:profile}=await client.from("learnmaster_profiles").select("is_admin").eq("user_id",data.user.id).maybeSingle();
  currentAccountIsAdmin=profile?.is_admin===true; return currentAccountIsAdmin;
}
async function openAdminPortal(){
  await refreshAccountAuthority();
  if(currentPortalRole!=="parent" || !currentAccountIsAdmin){ toast("Administrator access required."); return; }
  show("adminPortal");
  await renderAdminPortal();
}
async function renderAdminPortal(){
  const wrap=$("adminPortalContent"); if(!wrap) return;
  wrap.innerHTML='<div class="admin-loading">Checking secure administrator access…</div>';
  if(!await refreshAccountAuthority()){ wrap.innerHTML='<div class="standards-note"><strong>Access denied</strong><p>This account is not an authorized administrator.</p></div>'; return; }
  let summary={accounts:"—",learners:"—",consents:"—"};
  const client=window.learnMasterSupabase;
  const {data,error}=await client.rpc("learnmaster_admin_summary");
  if(!error && data) summary=data;
  wrap.innerHTML=`<div class="parent-summary-grid"><article><span>Accounts</span><strong>${summary.accounts ?? "—"}</strong></article><article><span>Learner profiles</span><strong>${summary.learners ?? "—"}</strong></article><article><span>Parent consents</span><strong>${summary.consents ?? "—"}</strong></article></div><div class="admin-grid"><article><h2>Account readiness</h2><p>Supabase authentication, row-level access, profile records, and a three-hour inactivity logout are enabled.</p></article><article><h2>Privacy controls</h2><p>Parent notice and consent records are available. Complete a legal/privacy review before public launch.</p></article><article><h2>Curriculum review</h2><p>4 official TEKS subject frameworks sourced. Lesson-level educator verification remains a separate review step.</p><button class="btn btn-main" onclick="openTeksStandards()">Review alignment</button></article></div><div class="parent-actions"><button class="btn btn-main" onclick="show('parentPortal')">Back to parent area</button></div>`;
}
