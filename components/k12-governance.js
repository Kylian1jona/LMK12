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
  wrap.innerHTML='<div class="admin-loading">Checking secure administrator access...</div>';
  if(!await refreshAccountAuthority()){ wrap.innerHTML='<div class="standards-note"><strong>Access denied</strong><p>This account is not an authorized administrator.</p></div>'; return; }
  let summary={accounts:"-",learners:"-",consents:"-",active_accounts:"-",pending_accounts:"-",late_accounts:"-",suspended_accounts:"-"};
  const client=window.learnMasterSupabase;
  const {data,error}=await client.rpc("learnmaster_admin_summary");
  if(!error && data) summary=data;
  wrap.innerHTML=`
    <div class="parent-summary-grid admin-summary-grid">
      <article><span>Accounts</span><strong>${summary.accounts ?? "-"}</strong></article>
      <article class="summary-active"><span>Active</span><strong>${summary.active_accounts ?? "-"}</strong></article>
      <article class="summary-pending"><span>Pending</span><strong>${summary.pending_accounts ?? "-"}</strong></article>
      <article class="summary-late"><span>Late</span><strong>${summary.late_accounts ?? "-"}</strong></article>
      <article class="summary-suspended"><span>Suspended</span><strong>${summary.suspended_accounts ?? "-"}</strong></article>
    </div>
    <div class="admin-grid">
      <article><h2>Payment status</h2><p>Review plans, due dates, standing, and overdue time. Only active accounts keep lesson access.</p><button type="button" class="btn btn-main" onclick="openPaymentStatusPage()">Open payment status</button></article>
      <article><h2>Account readiness</h2><p>Supabase authentication, row-level access, profile records, and a three-hour inactivity logout are enabled.</p></article>
      <article><h2>Privacy controls</h2><p>${summary.consents ?? "-"} parent consent record(s) are available for review.</p></article>
    </div>
    <div class="parent-actions"><button type="button" class="btn btn-main" onclick="show('parentPortal')">Back to parent area</button></div>`;
}

const ADMIN_PAYMENT_STATUSES = Object.freeze(["active","pending","late","suspended"]);
const ADMIN_SUBSCRIPTION_PLANS = Object.freeze(["elf","santa","reindeer","eng","math","sci","hist","all"]);

function paymentStatusOptions(selected){
  const current=ADMIN_PAYMENT_STATUSES.includes(selected)?selected:"pending";
  return ADMIN_PAYMENT_STATUSES.map(status=>`<option value="${status}" ${status===current?"selected":""}>${status.charAt(0).toUpperCase()+status.slice(1)}</option>`).join("");
}
function subscriptionPlanOptions(selected){
  const current=ADMIN_SUBSCRIPTION_PLANS.includes(selected)?selected:"";
  const label=planId=>PLAN_CATALOG?.[planId]?.name || planId;
  return `<option value="" ${!current?"selected":""}>No plan selected</option>${ADMIN_SUBSCRIPTION_PLANS.map(plan=>`<option value="${plan}" ${plan===current?"selected":""}>${htmlSafe(label(plan))}</option>`).join("")}`;
}
function paymentPlanLabel(planId){
  return PLAN_CATALOG?.[planId]?.name || (planId ? String(planId) : "No plan selected");
}

function formatAdminOverdue(account){
  const total=Math.max(0,Number(account.total_days_late)||0);
  if(!total) return account.payment_status==="late" ? "14 grace days left" : (account.payment_status==="suspended" ? "Grace period ended" : "On time");
  const months=Math.max(0,Number(account.months_late)||Math.floor(total/30));
  const days=Math.max(0,Number(account.remaining_days_late)||total%30);
  const parts=[];
  if(months) parts.push(`${months} month${months===1?"":"s"}`);
  if(days||!months) parts.push(`${days} day${days===1?"":"s"}`);
  const lateText=`${parts.join(", ")} late`;
  if(account.payment_status==="late"&&total<=14){
    const remaining=14-total;
    return `${lateText} - ${remaining} grace day${remaining===1?"":"s"} left`;
  }
  if(account.payment_status==="suspended") return `${lateText} - grace ended`;
  return lateText;
}

function filterPaymentStatusRows(){
  const query=String($("paymentAccountSearch")?.value||"").trim().toLowerCase();
  const status=String($("paymentStatusFilter")?.value||"all");
  document.querySelectorAll(".payment-account-row").forEach(row=>{
    const matchesQuery=!query||String(row.dataset.search||"").includes(query);
    const matchesStatus=status==="all"||row.dataset.status===status;
    row.hidden=!(matchesQuery&&matchesStatus);
  });
}

function renderPaymentStatusRows(accounts){
  if(!accounts.length) return '<div class="payment-empty"><strong>No accounts yet</strong><p>New Supabase profiles will appear here.</p></div>';
  return `<div class="payment-table-wrap"><table class="payment-table">
    <thead><tr><th>Account holder</th><th>Email</th><th>Plan</th><th>Status</th><th>Due date</th><th>Overdue</th><th>Update</th></tr></thead>
    <tbody>${accounts.map(account=>{
      const userId=String(account.user_id||"");
      const first=String(account.first_name||"").trim();
      const last=String(account.last_name||"").trim();
      const fullName=[first,last].filter(Boolean).join(" ")||account.username||"Account holder";
      const username=String(account.username||"");
      const email=String(account.email||"");
      const status=ADMIN_PAYMENT_STATUSES.includes(account.payment_status)?account.payment_status:"pending";
      const selectedPlan=ADMIN_SUBSCRIPTION_PLANS.includes(account.selected_plan)?account.selected_plan:"";
      const due=account.payment_due_on?String(account.payment_due_on).slice(0,10):"";
      const search=htmlSafe(`${fullName} ${username} ${email}`.toLowerCase());
      return `<tr class="payment-account-row" data-user-id="${htmlSafe(userId)}" data-status="${status}" data-search="${search}">
        <td data-label="Account holder"><strong>${htmlSafe(fullName)}</strong><span>@${htmlSafe(username||"account")}</span></td>
        <td data-label="Email">${htmlSafe(email||"No email")}</td>
        <td data-label="Plan"><select class="payment-plan-select" aria-label="Subscription plan for ${htmlSafe(fullName)}">${subscriptionPlanOptions(selectedPlan)}</select></td>
        <td data-label="Status"><select class="payment-status-select" aria-label="Payment status for ${htmlSafe(fullName)}">${paymentStatusOptions(status)}</select></td>
        <td data-label="Due date"><input class="payment-due-input" type="date" value="${htmlSafe(due)}" aria-label="Payment due date for ${htmlSafe(fullName)}"></td>
        <td data-label="Overdue"><span class="payment-status-badge status-${status}">${htmlSafe(formatAdminOverdue(account))}</span></td>
        <td data-label="Update"><button type="button" class="btn btn-main payment-save-button" onclick="saveAdminPaymentStatus('${htmlSafe(userId)}')">Save</button></td>
      </tr>`;
    }).join("")}</tbody>
  </table></div>`;
}

async function openPaymentStatusPage(){
  await refreshAccountAuthority();
  if(currentPortalRole!=="parent"||!currentAccountIsAdmin){ toast("Administrator access required."); return; }
  show("paymentStatus");
  await renderPaymentStatusPage();
}

async function renderPaymentStatusPage(){
  const wrap=$("paymentStatusContent"); if(!wrap) return;
  wrap.innerHTML='<div class="admin-loading">Loading secure payment records...</div>';
  if(!await refreshAccountAuthority()){
    wrap.innerHTML='<div class="standards-note"><strong>Access denied</strong><p>This page is available only to authorized administrators.</p></div>';
    return;
  }
  const client=window.learnMasterSupabase;
  if(!client){ wrap.innerHTML='<div class="standards-note"><strong>Supabase unavailable</strong><p>Reconnect and try again.</p></div>'; return; }
  const {data,error}=await client.rpc("learnmaster_admin_payment_accounts");
  if(error){
    console.warn("Payment status RPC is unavailable:",error.message);
    wrap.innerHTML='<div class="standards-note payment-setup-note"><strong>Subscription database update needed</strong><p>Apply the protected payment and plan migrations before accounts can be reviewed or activated here.</p><button type="button" class="btn btn-main" onclick="openAdminPortal()">Back to administrator overview</button></div>';
    return;
  }
  const accounts=Array.isArray(data)?data:[];
  const counts=Object.fromEntries(ADMIN_PAYMENT_STATUSES.map(status=>[status,accounts.filter(account=>account.payment_status===status).length]));
  wrap.innerHTML=`
    <div class="payment-summary-grid">
      ${ADMIN_PAYMENT_STATUSES.map(status=>`<article class="payment-summary-card status-${status}"><span>${status}</span><strong>${counts[status]}</strong></article>`).join("")}
    </div>
    <div class="payment-grace-note"><strong>Automatic access is on.</strong><span>New plan selections start without approval. Late payments keep learning open for 14 days; no Stripe charge is processed yet.</span></div>
    <div class="payment-toolbar">
      <label><span>Find an account</span><input id="paymentAccountSearch" type="search" placeholder="Name, username, or email" oninput="filterPaymentStatusRows()"></label>
      <label><span>Show status</span><select id="paymentStatusFilter" onchange="filterPaymentStatusRows()"><option value="all">All statuses</option>${paymentStatusOptions("__none__")}</select></label>
    </div>
    ${renderPaymentStatusRows(accounts)}
    <div class="parent-actions"><button type="button" class="btn btn-main" onclick="openAdminPortal()">Back to administrator overview</button></div>`;
  const filter=$("paymentStatusFilter"); if(filter) filter.value="all";
}

async function saveAdminPaymentStatus(userId){
  const row=Array.from(document.querySelectorAll(".payment-account-row")).find(item=>item.dataset.userId===userId);
  if(!row) return;
  const status=String(row.querySelector(".payment-status-select")?.value||"");
  const selectedPlan=String(row.querySelector(".payment-plan-select")?.value||"");
  const dueOn=String(row.querySelector(".payment-due-input")?.value||"");
  if(!ADMIN_PAYMENT_STATUSES.includes(status)){ toast("Choose a valid payment status."); return; }
  if(status==="active"&&!selectedPlan){ toast("Choose a plan before activating this account."); return; }
  if(status==="active"&&!dueOn){ toast("Add the next payment due date before activating this account."); return; }
  if(["late","suspended"].includes(status)&&!dueOn){ toast("Add a due date to calculate overdue time."); return; }
  const button=row.querySelector(".payment-save-button");
  if(button){ button.disabled=true; button.textContent="Saving..."; }
  const client=window.learnMasterSupabase;
  const {error}=await client.rpc("learnmaster_admin_update_subscription",{account_user_id:userId,new_status:status,new_due_on:dueOn||null,new_plan:selectedPlan});
  if(error){
    console.warn("Payment status could not be updated:",error.message);
    if(button){ button.disabled=false; button.textContent="Save"; }
    toast("Payment status could not be saved.");
    return;
  }
  toast("Payment status saved.");
  await renderPaymentStatusPage();
}
