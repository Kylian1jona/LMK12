let currentAccountIsAdmin = false;
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
  wrap.innerHTML=`<div class="parent-summary-grid"><article><span>Accounts</span><strong>${summary.accounts ?? "—"}</strong></article><article><span>Learner profiles</span><strong>${summary.learners ?? "—"}</strong></article><article><span>Parent consents</span><strong>${summary.consents ?? "—"}</strong></article></div><div class="admin-grid"><article><h2>Account readiness</h2><p>Supabase authentication, row-level access, profile records, and a three-hour inactivity logout are enabled.</p></article><article><h2>Privacy controls</h2><p>Parent notice and consent records are available. Complete a legal/privacy review before public launch.</p></article><article><h2>Lesson library</h2><p>The classic lesson generators and ten-question lesson format are active.</p></article></div><div class="parent-actions"><button class="btn btn-main" onclick="show('parentPortal')">Back to parent area</button></div>`;
}
