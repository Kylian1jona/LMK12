/* ===========================
   Login (always required)
=========================== */
let loggedIn = false;
let currentPortalRole = "kid";
const INACTIVITY_LIMIT_MS = 3 * 60 * 60 * 1000;
const INACTIVITY_KEY = "learnmaster_last_activity_v1";
let INACTIVITY_TIMER = null;
let LAST_ACTIVITY_WRITE = 0;
let SUBSCRIPTION_WATCH_TIMER = null;

function stopInactivityTimer(clearSaved=false){
  clearTimeout(INACTIVITY_TIMER);
  INACTIVITY_TIMER = null;
  if(clearSaved) localStorage.removeItem(INACTIVITY_KEY);
}

function scheduleInactivityLogout(){
  if(!loggedIn) return;
  clearTimeout(INACTIVITY_TIMER);
  const last = Number(localStorage.getItem(INACTIVITY_KEY) || Date.now());
  const remaining = Math.max(0, INACTIVITY_LIMIT_MS - (Date.now() - last));
  INACTIVITY_TIMER = setTimeout(handleInactivityLogout, remaining);
}

function recordUserActivity(){
  if(!loggedIn) return;
  const now = Date.now();
  const last = Number(localStorage.getItem(INACTIVITY_KEY) || now);
  if(now - last >= INACTIVITY_LIMIT_MS){ handleInactivityLogout(); return; }
  if(now - LAST_ACTIVITY_WRITE < 15000) return;
  LAST_ACTIVITY_WRITE = now;
  localStorage.setItem(INACTIVITY_KEY, String(now));
  scheduleInactivityLogout();
}

async function handleInactivityLogout(){
  if(!loggedIn) return;
  await logout();
  loginMsg("You were logged out after 3 hours without activity. Please log in again.", false);
}

["pointerdown","keydown","touchstart","scroll"].forEach(eventName=>{
  window.addEventListener(eventName, recordUserActivity, {passive:true});
});
document.addEventListener("visibilitychange", ()=>{
  if(document.visibilityState !== "visible") return;
  recordUserActivity();
  if(loggedIn) enforceSubscriptionAccess();
});

function showLogin(prefillUser=""){
  loggedIn = false;
  stopInactivityTimer();
  stopSubscriptionAccessWatch();
  currentPortalRole = "kid";
  currentAccountIsAdmin = false;
  hidePaywall(true);
  hideProfileChooser();
  const wall = $("loginWall");
  if(!wall) return;
  wall.style.display = "flex";
  wall.setAttribute("aria-hidden", "false");
  document.body.classList.add("login-open");
  showLoginForm();
  if($("loginMsg")){
    $("loginMsg").textContent = "";
    $("loginMsg").className = "loginmsg";
  }
  if($("loginUser")) $("loginUser").value = prefillUser || "";
  if($("loginPass")) $("loginPass").value = "";
  setTimeout(()=>{ try{$("loginUser").focus();}catch(e){} }, 50);
}
function hideLogin(){
  loggedIn = true;
  if($("loginWall")){
    $("loginWall").style.display = "none";
    $("loginWall").setAttribute("aria-hidden", "true");
  }
  document.body.classList.remove("login-open");
  localStorage.setItem(INACTIVITY_KEY, String(Date.now()));
  scheduleInactivityLogout();
  startSubscriptionAccessWatch();
}
function loginMsg(text, bad=false){
  const el = $("loginMsg");
  if(!el) return;
  el.textContent = text;
  el.className = "loginmsg " + (bad ? "bad" : "ok");
}

function showLoginForm(){
  const loginPanel = $("loginFormPanel");
  const signupPanel = $("signupFormPanel");
  if(loginPanel){
    loginPanel.classList.remove("d-none");
    loginPanel.setAttribute("aria-hidden", "false");
  }
  if(signupPanel){
    signupPanel.classList.add("d-none");
    signupPanel.setAttribute("aria-hidden", "true");
  }
  document.querySelector(".auth-card")?.setAttribute("data-auth-mode", "login");
  if($("loginMsg")){
    $("loginMsg").textContent = "";
    $("loginMsg").className = "loginmsg";
  }
  setTimeout(()=>{ try{$("loginUser")?.focus();}catch(e){} }, 50);
}

function showSignup(){
  safeClick();
  const loginPanel = $("loginFormPanel");
  const signupPanel = $("signupFormPanel");
  if(loginPanel){
    loginPanel.classList.add("d-none");
    loginPanel.setAttribute("aria-hidden", "true");
  }
  if(signupPanel){
    signupPanel.classList.remove("d-none");
    signupPanel.setAttribute("aria-hidden", "false");
  }
  document.querySelector(".auth-card")?.setAttribute("data-auth-mode", "signup");
  if($("loginMsg")){
    $("loginMsg").textContent = "";
    $("loginMsg").className = "loginmsg";
  }
  ["signupFirstName","signupLastName","signupUser","signupName","signupPass"].forEach(id=>{
    const el = $(id);
    if(el) el.value = "";
  });
  setTimeout(()=>{ try{$("signupFirstName")?.focus();}catch(e){} }, 50);
}

function validateNewUserFields(username, pass, kids){
  if(!username) return "Enter a username.";
  if(!/^[a-z0-9_]+$/i.test(username)) return "Use only letters, numbers, and underscore.";
  if(username === "a") return "That username is reserved.";
  if(kids.some(k => String(k.username||"").toLowerCase() === username)) return "That username already exists.";
  if(!pass || pass.length < 4) return "Password must be 4 or more characters.";
  return "";
}

async function finishLoginForKid(kidId, message="Logged in!", openChooser=true){
  setActiveKidId(kidId);
  hideLogin();
  loadState();
  renderAllBadges();
  renderConvertButtons();
  renderShop();
  applyAccessUI();
  updateUserUI();
  if(openChooser) showProfileChooser();
  else show("home");
  toast(message);
}

function upsertLocalSupabaseKid(user, username, name){
  let kids = loadKids();
  if(!kids.some(k=>k.authUserId) && kids.every(k=>["kid1","kid2"].includes(String(k.username)))) kids = [];
  let kid = kids.find(k => k.authUserId === user.id);
  if(!kid) kid = kids.find(k => String(k.username || "").toLowerCase() === username);
  if(!kid){
    kid = { id: `kid_${user.id}`, username, name: name || username };
    kids.push(kid);
  }
  kid.authUserId = user.id;
  kid.username = username;
  kid.email = user.email || kid.email || "";
  kid.name = name || kid.name || username;
  delete kid.pass;
  saveKids(kids);
  return kid;
}

async function syncSupabaseProfile(user, username, name, firstName="", lastName=""){
  const client = window.learnMasterSupabase;
  if(!client || !user?.id) return false;
  const metadata = user.user_metadata || {};
  const safeFirstName = String(firstName || metadata.first_name || "").trim();
  const safeLastName = String(lastName || metadata.last_name || "").trim();
  const displayName = String(name || metadata.display_name || [safeFirstName,safeLastName].filter(Boolean).join(" ") || username || user.email?.split("@")[0] || "Learner").trim();
  const profile = {
    user_id:user.id,
    email:user.email || null,
    username:username || user.email?.split("@")[0] || "learner",
    display_name:displayName,
    first_name:safeFirstName,
    last_name:safeLastName
  };
  let { error } = await client.from("learnmaster_profiles").upsert(profile, { onConflict:"user_id" });
  if(error && /first_name|last_name|schema cache/i.test(error.message || "")){
    const legacyProfile = {
      user_id:profile.user_id,
      email:profile.email,
      username:profile.username,
      display_name:profile.display_name
    };
    ({error} = await client.from("learnmaster_profiles").upsert(legacyProfile, {onConflict:"user_id"}));
  }
  if(error){
    console.warn("Supabase profile sync is waiting for the learnmaster_profiles schema:", error.message);
    return false;
  }
  return true;
}

async function createSignupUser(){
  safeClick();
  const client = window.learnMasterSupabase;
  if(!client){ loginMsg("Supabase is unavailable. Check your connection and try again.", true); return; }
  const kids = loadKids();
  const firstName = ($("signupFirstName")?.value || "").trim();
  const lastName = ($("signupLastName")?.value || "").trim();
  const email = ($("signupUser")?.value || "").trim().toLowerCase();
  const username = ($("signupName")?.value || "").trim().toLowerCase();
  const name = [firstName,lastName].filter(Boolean).join(" ");
  const pass = $("signupPass")?.value || "";
  const usernameError = validateNewUserFields(username, pass, kids);
  const error = !firstName
    ? "Enter your first name."
    : (!lastName
      ? "Enter your last name."
      : (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Enter a valid email address."
        : (usernameError || (!pass || pass.length < 6 ? "Password must be 6 or more characters." : ""))));
  if(error){ loginMsg(error, true); return; }
  loginMsg("Creating account…");
  const { data, error: authError } = await client.auth.signUp({
    email,
    password: pass,
    options: {
      emailRedirectTo:"https://k12-learning.netlify.app",
      data: { username, display_name: name, first_name:firstName, last_name:lastName, free_month_eligible: true }
    }
  });
  if(authError){ loginMsg(authError.message, true); return; }
  if(!data.user){ loginMsg("Supabase did not create the account.", true); return; }
  await syncSupabaseProfile(data.user, username, name, firstName, lastName);
  if(!data.session){
    showLoginForm();
    if($("loginUser")) $("loginUser").value = username;
    loginMsg("Account created. Check your email to confirm it, then log in with your username.");
    return;
  }
  await window.learnMasterStore.hydrate(data.user);
  const kid = upsertLocalSupabaseKid(data.user, username, name);
  await refreshSubscriptionAccess();
  clearTrial();
  learnMasterStore.setItem(REQUIRED_PLAN_KEY, "1");
  await finishLoginForKid(kid.id, "Account created — choose a plan to continue.", false);
  showPaywall(true);
}

async function doLogin(){
  safeClick();
  const loginName = ($("loginUser").value || "").trim().toLowerCase();
  const p = $("loginPass").value || "";
  if(!loginName || !p){ loginMsg("Enter username and password.", true); return; }

  const client = window.learnMasterSupabase;
  if(!client){ loginMsg("Supabase is unavailable. Check your connection and try again.", true); return; }
  loginMsg("Finding your account…");
  let email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginName) ? loginName : "";
  const localKid = loadKids().find(k=>String(k.username || "").toLowerCase() === loginName);
  if(localKid?.email) email = String(localKid.email).toLowerCase();
  if(!email){
    const { data:linkedEmail, error:lookupError } = await client.rpc("learnmaster_login_email", { login_username:loginName });
    if(lookupError || !linkedEmail){ loginMsg("Username not found. You can also sign in with your Gmail address.", true); return; }
    email = String(linkedEmail).toLowerCase();
  }
  loginMsg("Logging in…");
  const { data, error: authError } = await client.auth.signInWithPassword({
    email,
    password: p
  });
  if(authError){
    const message = /confirm/i.test(authError.message)
      ? "Confirm your email first, then try logging in again."
      : "Incorrect username or password.";
    loginMsg(message, true);
    return;
  }
  await window.learnMasterStore.hydrate(data.user);
  const metadata = data.user?.user_metadata || {};
  const username = metadata.username || email.split("@")[0];
  const accountName = metadata.display_name || [metadata.first_name,metadata.last_name].filter(Boolean).join(" ") || username;
  await syncSupabaseProfile(data.user, username, accountName, metadata.first_name, metadata.last_name);
  const kid = upsertLocalSupabaseKid(data.user, username, accountName);
  const hasLearningAccess = await refreshSubscriptionAccess();
  const isAdmin=await refreshAccountAuthority();
  await finishLoginForKid(kid.id, hasLearningAccess ? "Logged in!" : subscriptionActionMessage(), hasLearningAccess || isAdmin);
  if(!hasLearningAccess&&!isAdmin) showPaywall(true);
}
async function logout(){
  safeClick();
  try{ speechSynthesis.cancel(); }catch(e){}
  if(window.learnMasterSupabase) await window.learnMasterSupabase.auth.signOut();
  window.learnMasterStore?.clearUser();
  stopInactivityTimer(true);
  currentPortalRole = "kid";
  currentAccountIsAdmin = false;
  showLogin("");
}
async function resetLoginPassword(){
  const loginName = ($("loginUser")?.value || "").trim().toLowerCase();
  const client = window.learnMasterSupabase;
  if(!client){ loginMsg("Supabase is unavailable. Check your connection and try again.", true); return; }
  if(!loginName){ loginMsg("Enter your username or email address above first.", true); return; }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let email = emailPattern.test(loginName)
    ? loginName
    : String(loadKids().find(k=>String(k.username || "").toLowerCase() === loginName)?.email || "").toLowerCase();
  if(!email){
    const { data, error: lookupError } = await client.rpc("learnmaster_login_email", { login_username:loginName });
    if(lookupError){ loginMsg("That username could not be found. You can enter your email address instead.", true); return; }
    email = String(data || "").toLowerCase();
  }
  if(!emailPattern.test(email)){ loginMsg("Enter a valid username or email address above first.", true); return; }
  const { error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}${window.location.pathname}`
  });
  loginMsg(error ? error.message : `Password reset email sent to ${email}. Check your spam folder too.`, !!error);
}

/* Keyboard access for the account dialog. */
document.addEventListener("keydown", (e)=>{
  const wall = $("loginWall");
  if(!wall || getComputedStyle(wall).display !== "flex" || wall.getAttribute("aria-hidden") === "true") return;

  if(e.key === "Tab"){
    const focusable = [...wall.querySelectorAll("input, button, select, a[href], [tabindex]:not([tabindex='-1'])")]
      .filter(el=>!el.disabled && el.getClientRects().length > 0);
    if(!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if(e.shiftKey && (document.activeElement === first || !wall.contains(document.activeElement))){
      e.preventDefault();
      last.focus();
    }else if(!e.shiftKey && (document.activeElement === last || !wall.contains(document.activeElement))){
      e.preventDefault();
      first.focus();
    }
    return;
  }

  if(e.key !== "Enter" || e.repeat || e.isComposing) return;
  if(e.target?.closest?.("button")) return;
  if(!e.target?.matches?.("#loginFormPanel input, #signupFormPanel input")) return;
  e.preventDefault();
  if(!$("signupFormPanel")?.classList.contains("d-none")) createSignupUser();
  else doLogin();
});

/* ===========================
   Plan + Trial + Account PIN
=========================== */
const PLAN_KEY = "learnmaster_plan_v1";
const SUBJECT_ACCESS_KEY = "learnmaster_subject_access_v1";
const TRIAL_KEY = "learnmaster_trial_ends_v1";
const PIN_KEY  = "learnmaster_account_pin_v1";
const KIDS_KEY = "learnmaster_kids_v2";
const ACTIVE_KID_KEY = "learnmaster_active_kid_v1";
const REQUIRED_PLAN_KEY = "learnmaster_required_plan_v1";
const DEMO_SUBSCRIPTION_KEY = "learnmaster_demo_subscription_v1";
const THEME_KEY = "learnmaster_theme_v1";
const MAX_KIDS_PER_ACCOUNT = 3;

const THEMES = {
  warm: "Warm",
  ocean: "Ocean",
  forest: "Forest",
  berry: "Berry",
  sunset: "Sunset",
  galaxy: "Galaxy",
  lavender: "Lavender",
  mint: "Mint",
  school: "Classic School",
  night: "Night Mode",
  contrast: "High Contrast",
  candy: "Candy Pop",
  arctic: "Arctic Blue",
  sunshine: "Sunshine",
  coral: "Coral Reef",
  emerald: "Emerald",
  grape: "Grape Soda",
  slate: "Cool Slate"
};

function getTheme(){
  const saved = learnMasterStore.getItem(THEME_KEY) || "warm";
  return THEMES[saved] ? saved : "warm";
}
function applyTheme(){
  if(document.body) document.body.dataset.theme = getTheme();
}
function setTheme(themeId){
  if(!THEMES[themeId]) return;
  learnMasterStore.setItem(THEME_KEY, themeId);
  applyTheme();
  renderSettings();
  toast("Theme updated.");
}

/* The profile record is the authority for subscription access. Plan selection
   starts non-Stripe access automatically; overdue accounts receive 14 days of
   server-authorized grace before learning is paused. */
let subscriptionAuthority = {
  mode:"checking",
  status:"pending",
  selectedPlan:"",
  dueOn:null,
  accessAllowed:false,
  error:""
};

function supportedSubscriptionPlan(planId){
  const id=String(planId||"").trim().toLowerCase();
  return PLAN_CATALOG?.[id] && !PLAN_CATALOG[id].addon ? id : "";
}
function subscriptionAccessAllowed(){
  return ["server","demo"].includes(subscriptionAuthority.mode) && subscriptionAuthority.accessAllowed===true;
}
function subscriptionStatusLabel(status=subscriptionAuthority.status){
  const normalized=String(status||"pending").toLowerCase();
  return normalized ? normalized.charAt(0).toUpperCase()+normalized.slice(1) : "Pending";
}
function subscriptionGraceDaysRemaining(){
  if(!subscriptionAuthority.dueOn) return 0;
  const due=new Date(`${subscriptionAuthority.dueOn}T00:00:00Z`);
  if(Number.isNaN(due.getTime())) return 0;
  const now=new Date();
  const today=Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate());
  const daysLate=Math.max(0,Math.floor((today-due.getTime())/86400000));
  return Math.max(0,14-daysLate);
}
function subscriptionActionMessage(){
  if(subscriptionAuthority.mode==="setup") return "Choose a plan and use the test checkout to start learning.";
  if(subscriptionAuthority.status==="late"&&subscriptionAccessAllowed()){
    const days=subscriptionGraceDaysRemaining();
    return days
      ? `A payment needs attention. Learning stays open for ${days} more day${days===1?"":"s"}.`
      : "A payment needs attention. The 14-day grace period ends today.";
  }
  if(subscriptionAuthority.status==="late") return "The 14-day payment grace period ended. Update the payment status to continue learning.";
  if(subscriptionAuthority.status==="suspended") return "Your subscription is suspended. Choose a plan or contact the administrator.";
  if(subscriptionAuthority.selectedPlan) return "Your plan is being prepared. No real card is charged in this version.";
  return "Choose a plan and complete the test checkout to start learning access.";
}
function readDemoSubscription(){
  try{
    const record=JSON.parse(learnMasterStore.getItem(DEMO_SUBSCRIPTION_KEY)||"null");
    const planId=supportedSubscriptionPlan(record?.selectedPlan);
    return planId && record?.accessAllowed===true ? {...record,selectedPlan:planId} : null;
  }catch(error){
    return null;
  }
}
function storeDemoSubscription(planId, existingRecord=null){
  const normalized=supportedSubscriptionPlan(planId);
  if(!normalized) return false;
  const now=new Date();
  const due=new Date(now.getTime()+30*86400000);
  const record={
    selectedPlan:normalized,
    paymentStatus:"active",
    dueOn:existingRecord?.dueOn || due.toISOString().slice(0,10),
    accessAllowed:true,
    startedAt:existingRecord?.startedAt || now.toISOString()
  };
  learnMasterStore.setItem(DEMO_SUBSCRIPTION_KEY,JSON.stringify(record));
  subscriptionAuthority={mode:"demo",status:"active",selectedPlan:normalized,dueOn:record.dueOn,accessAllowed:true,error:""};
  clearTrial();
  setPlan(normalized);
  setPurchasedSubjects(PLAN_CATALOG[normalized].subjects || []);
  learnMasterStore.removeItem(REQUIRED_PLAN_KEY);
  return true;
}
function storeAuthoritativeSubscription(record){
  const planId=supportedSubscriptionPlan(record?.selected_plan || record?.selectedPlan);
  const active=record?.access_allowed===true || record?.accessAllowed===true;
  subscriptionAuthority={
    mode:"server",
    status:String(record?.payment_status || record?.paymentStatus || "pending").toLowerCase(),
    selectedPlan:planId,
    dueOn:record?.payment_due_on || record?.paymentDueOn || null,
    accessAllowed:Boolean(active && planId),
    error:""
  };
  clearTrial();
  if(subscriptionAuthority.accessAllowed){
    setPlan(planId);
    setPurchasedSubjects(PLAN_CATALOG[planId].subjects || []);
    learnMasterStore.removeItem(REQUIRED_PLAN_KEY);
  }else{
    clearPlan();
    learnMasterStore.setItem(REQUIRED_PLAN_KEY,"1");
  }
  return subscriptionAuthority.accessAllowed;
}
function lockSubscriptionForSetup(errorMessage=""){
  subscriptionAuthority={
    mode:"setup",
    status:"pending",
    selectedPlan:"",
    dueOn:null,
    accessAllowed:false,
    error:String(errorMessage||"")
  };
  clearPlan();
  clearTrial();
  learnMasterStore.setItem(REQUIRED_PLAN_KEY,"1");
  return false;
}
async function refreshSubscriptionAccess(){
  const client=window.learnMasterSupabase;
  const demo=readDemoSubscription();
  if(!client) return demo ? storeDemoSubscription(demo.selectedPlan,demo) : lockSubscriptionForSetup("Supabase is unavailable.");
  try{
    const {data,error}=await client.rpc("learnmaster_current_subscription");
    if(error){
      console.warn("Secure subscription access is waiting for its database migration:",error.message);
      return demo ? storeDemoSubscription(demo.selectedPlan,demo) : lockSubscriptionForSetup(error.message);
    }
    const record=Array.isArray(data)?data[0]:data;
    if(!record) return demo ? storeDemoSubscription(demo.selectedPlan,demo) : lockSubscriptionForSetup("No secure subscription profile was returned.");
    const recordStatus=String(record?.payment_status || record?.paymentStatus || "pending").toLowerCase();
    const recordAccess=record?.access_allowed===true || record?.accessAllowed===true;
    if(demo&&!recordAccess&&recordStatus==="pending") return storeDemoSubscription(demo.selectedPlan,demo);
    return storeAuthoritativeSubscription(record);
  }catch(error){
    console.warn("Secure subscription access could not be checked:",error?.message || error);
    return demo ? storeDemoSubscription(demo.selectedPlan,demo) : lockSubscriptionForSetup(error?.message || "The subscription service could not be reached.");
  }
}
async function requestSubscriptionPlan(planId){
  const normalized=supportedSubscriptionPlan(planId);
  if(!normalized) return {ok:false,message:"Choose a valid learning plan."};
  const client=window.learnMasterSupabase;
  if(!client){
    storeDemoSubscription(normalized);
    return {ok:true,data:{selectedPlan:normalized,mode:"demo"}};
  }
  try{
    const {data,error}=await client.rpc("learnmaster_request_subscription_plan",{new_plan:normalized});
    if(error){
      console.warn("Subscription plan request could not be saved:",error.message);
      storeDemoSubscription(normalized);
      return {ok:true,data:{selectedPlan:normalized,mode:"demo"}};
    }
    const active=data?.access_allowed===true || data?.accessAllowed===true;
    if(active) storeAuthoritativeSubscription(data);
    else storeDemoSubscription(normalized);
    return {ok:true,data};
  }catch(error){
    console.warn("Subscription plan request could not be completed:",error?.message || error);
    storeDemoSubscription(normalized);
    return {ok:true,data:{selectedPlan:normalized,mode:"demo"}};
  }
}
async function enforceSubscriptionAccess(){
  if(!loggedIn) return false;
  const hadAccess=subscriptionAccessAllowed();
  const hasAccess=await refreshSubscriptionAccess();
  applyAccessUI();
  if(hadAccess&&!hasAccess){
    toast(subscriptionActionMessage());
    showPaywall(true);
  }
  return hasAccess;
}
function startSubscriptionAccessWatch(){
  clearInterval(SUBSCRIPTION_WATCH_TIMER);
  if(!loggedIn) return;
  SUBSCRIPTION_WATCH_TIMER=setInterval(()=>{
    enforceSubscriptionAccess().catch(error=>console.warn("Subscription access check failed:",error));
  },5*60*1000);
}
function stopSubscriptionAccessWatch(){
  clearInterval(SUBSCRIPTION_WATCH_TIMER);
  SUBSCRIPTION_WATCH_TIMER=null;
}

function getPlan(){ return learnMasterStore.getItem(PLAN_KEY) || ""; }
function setPlan(p){ learnMasterStore.setItem(PLAN_KEY, p); }
function getPurchasedSubjects(){
  try{
    const parsed = JSON.parse(learnMasterStore.getItem(SUBJECT_ACCESS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  }catch(e){
    return [];
  }
}
function setPurchasedSubjects(subjects){
  learnMasterStore.setItem(SUBJECT_ACCESS_KEY, JSON.stringify([...new Set(subjects)]));
}
function addPurchasedSubjects(subjects){
  setPurchasedSubjects([...getPurchasedSubjects(), ...subjects]);
}
function clearPlan(){
  learnMasterStore.removeItem(PLAN_KEY);
  learnMasterStore.removeItem(SUBJECT_ACCESS_KEY);
}
function authoritativeSubscriptionSubjects(){
  if(!subscriptionAccessAllowed()) return [];
  const planId=supportedSubscriptionPlan(subscriptionAuthority.selectedPlan);
  return Array.isArray(PLAN_CATALOG?.[planId]?.subjects) ? [...PLAN_CATALOG[planId].subjects] : [];
}
function subjectAllowed(subj){
  const subjects=authoritativeSubscriptionSubjects();
  return subjects.includes("all") || subjects.includes(subj);
}
function anySubjectAllowed(){
  return authoritativeSubscriptionSubjects().length > 0;
}

function nowMs(){ return Date.now(); }
function getTrialEnds(){ return Number(learnMasterStore.getItem(TRIAL_KEY) || 0); }
function setTrialEnds(t){ learnMasterStore.setItem(TRIAL_KEY, String(t)); }
function clearTrial(){ learnMasterStore.removeItem(TRIAL_KEY); }
function trialActive(){ return false; }

function startTrial(){
  safeClick();
  showPaywall(true);
  toast("Choose a plan, then complete the test checkout to start access.");
}

function ensurePin(){
  let pin = learnMasterStore.getItem(PIN_KEY);
  if(pin && pin.length >= 4) return pin;
  const newPin = prompt("Create an account PIN (4+ digits). Keep it safe:");
  if(!newPin || newPin.length < 4 || !/^\d+$/.test(newPin)){ alert("PIN must be 4+ digits."); return ""; }
  learnMasterStore.setItem(PIN_KEY, newPin);
  return newPin;
}
function accountUnlock(action){
  safeClick();
  const pin = ensurePin();
  if(!pin) return false;
  const attempt = prompt("Enter account PIN:");
  if(attempt !== pin){ alert("Wrong PIN."); return false; }
  if(action === "addKid"){ addKidFlow(true); return true; }
  if(action === "managePlan"){ managePlanFlow(); return true; }
  if(action === "accountMenu"){ accountMenuFlow(true); return true; }
  if(action === "resetCurrentKid"){ resetCurrentKidFlow(); return true; }
  return true;
}
function accountMenuFlow(parentVerified=false){
  const choice = prompt(
`Account Tools:
1) Add user
2) Rename user
3) Delete user
4) Manage plan
5) Reset current user progress
Type 1-5`
  );
  if(choice === "1") addKidFlow(parentVerified);
  if(choice === "2") renameKidFlow();
  if(choice === "3") deleteKidFlow();
  if(choice === "4") managePlanFlow();
  if(choice === "5") resetCurrentKidFlow();
}
function managePlanFlow(){
  showPaywall(true);
  toast("Choose a plan below, then complete the test checkout.");
}

/* ===========================
   Non-Stripe plan access
=========================== */
const PLAN_CATALOG = {
  eng:     { name: "English Plan", price: 5, subjects:["eng"] },
  math:    { name: "Math Plan", price: 5, subjects:["math"] },
  sci:     { name: "Science Plan", price: 5, subjects:["sci"] },
  hist:    { name: "History Plan", price: 5, subjects:["hist"] },
  all:     { name: "All Subjects", price: 20, subjects:["all"] },
  elf:      { name: "English Plan", price: 5, subjects:["eng"] },
  santa:    { name: "Math + English Plan", price: 10, subjects:["eng","math"] },
  reindeer: { name: "All Subjects", price: 20, subjects:["all"] },
};
let checkout = { planId:"", base:0 };
const TEST_CHECKOUT_CARD = "4242424242424242";

function money(n){ return "$" + (Math.max(0, Number(n) || 0)).toFixed(2); }

function openCheckout(planId){
  safeClick();
  checkout.planId = planId;

  const plan = PLAN_CATALOG[planId];
  if(!plan){ toast("Unknown plan."); return; }
  checkout.base = plan.price;

  $("payErr").textContent = "";
  const requestButton=$("checkoutConfirmButton");
  if(requestButton){ requestButton.disabled=false; requestButton.textContent="Start plan"; }

  clearTestCheckoutCard();

  $("checkoutPlanName").textContent = plan.name;
  $("checkoutTitle").textContent = `Start ${plan.name}`;
  if($("checkoutDesc")) $("checkoutDesc").textContent = "Enter the test card below to start this plan immediately.";

  updateCheckoutUI();

  if($("paywall")) $("paywall").style.display = "flex";
  const modal = new bootstrap.Modal(document.getElementById("checkoutModal"));
  modal.show();
}
function updateCheckoutUI(){
  if($("checkoutPrice")) $("checkoutPrice").textContent = money(checkout.base);
}
function clearTestCheckoutCard(){
  ["checkoutCardNumber","checkoutExpiry","checkoutCvc","checkoutZip"].forEach(id=>{
    const input=$(id);
    if(input) input.value="";
  });
}
function validateTestCheckoutCard(){
  const card=String($("checkoutCardNumber")?.value||"").replace(/\D/g,"");
  const expiry=String($("checkoutExpiry")?.value||"").trim();
  const cvc=String($("checkoutCvc")?.value||"").trim();
  const zip=String($("checkoutZip")?.value||"").trim();
  if(card!==TEST_CHECKOUT_CARD) return "Use the test card 4242 4242 4242 4242. Real cards are not accepted.";
  const match=expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
  if(!match) return "Enter a future expiration date as MM/YY.";
  const expiryEnd=new Date(Date.UTC(2000+Number(match[2]),Number(match[1]),0,23,59,59));
  if(expiryEnd<=new Date()) return "Use a future expiration date.";
  if(!/^\d{3}$/.test(cvc)) return "Enter any 3-digit test CVC.";
  if(!/^\d{5}(?:-\d{4})?$/.test(zip)) return "Enter a valid 5-digit ZIP code.";
  return "";
}
async function confirmPayment(){
  safeClick();
  const errorBox=$("payErr");
  if(errorBox) errorBox.textContent = "";

  const requestedPlan=PLAN_CATALOG[checkout.planId];
  if(!requestedPlan){ if(errorBox) errorBox.textContent="Plan missing."; return; }
  const cardError=validateTestCheckoutCard();
  if(cardError){ if(errorBox) errorBox.textContent=cardError; return; }

  // The test fields are intentionally cleared before any network request. Card
  // values are never passed to Supabase, stored locally, or written to logs.
  clearTestCheckoutCard();

  const submit=$("checkoutConfirmButton");
  if(submit){ submit.disabled=true; submit.textContent="Starting access..."; }
  const request=await requestSubscriptionPlan(checkout.planId);
  if(submit){ submit.disabled=false; submit.textContent="Start plan"; }
  if(!request.ok){ if(errorBox) errorBox.textContent=request.message; return; }

  const modalEl=document.getElementById("checkoutModal");
  const instance=bootstrap.Modal.getInstance(modalEl);
  if(instance) instance.hide();
  applyAccessUI();
  updateUserUI();
  hidePaywall(true);
  show("home");
  toast("Plan access started. This was a test checkout; no card was charged.");
  speakGlobal("Your learning plan is ready. Let us start learning!");
}

/* ===========================
   Users (Kids)
=========================== */
function loadKids(){
  try{
    const raw = learnMasterStore.getItem(KIDS_KEY);
    if(raw){
      const parsed = JSON.parse(raw);
      if(Array.isArray(parsed) && parsed.length) return parsed;
    }
  }catch(e){}
  return [];
}
function saveKids(kids){ learnMasterStore.setItem(KIDS_KEY, JSON.stringify(kids)); }
function isLearnerKid(kid){ return !!kid; }
function learnerCount(kids=loadKids()){ return kids.filter(isLearnerKid).length; }
function getActiveKidId(){ return learnMasterStore.getItem(ACTIVE_KID_KEY) || loadKids()[0]?.id || ""; }
function setActiveKidId(id){ learnMasterStore.setItem(ACTIVE_KID_KEY, id); }
function getActiveKid(){
  const kids = loadKids();
  return kids.find(k=>k.id===getActiveKidId()) || kids[0];
}
function allLearnerKids(){
  return loadKids().filter(isLearnerKid);
}
const AVATAR_COLORS = {
  orange:{ bg:"#fff8e7", fg:"#df7f39" },
  blue:{ bg:"#eaf4ff", fg:"#2563eb" },
  green:{ bg:"#ecfdf3", fg:"#15803d" },
  pink:{ bg:"#fff0f6", fg:"#be185d" },
  purple:{ bg:"#f4efff", fg:"#7c3aed" },
  gray:{ bg:"#f8fafc", fg:"#475569" }
};
const AVATAR_PRESETS = [
  { id:"star", type:"text", value:"\u2b50", label:"Star" },
  { id:"rocket", type:"text", value:"\ud83d\ude80", label:"Rocket" },
  { id:"book", type:"text", value:"\ud83d\udcda", label:"Books" },
  { id:"game", type:"text", value:"\ud83c\udfae", label:"Game" },
  { id:"art", type:"text", value:"\ud83c\udfa8", label:"Art" },
  { id:"grad", type:"text", value:"\ud83c\udf93", label:"Graduate" },
  { id:"cat", type:"image", src:"images/pfpcat.webp", label:"Cat" },
  { id:"dog", type:"image", src:"images/pfpdog.png", label:"Dog" },
  { id:"car", type:"image", src:"images/pfpcar.webp", label:"Car" },
  { id:"soccer", type:"image", src:"images/pfpsoccer.webp", label:"Soccer" },
  { id:"sportsCar", type:"image", src:"images/pfpsportscar.webp", label:"Sports car" },
  { id:"tennis", type:"image", src:"images/pfptennis.webp", label:"Tennis" },
  { id:"mountainLake", type:"image", src:"images/pfpmountain.png", label:"Mountain Lake" },
  { id:"mountainSunset", type:"image", src:"images/pfpmountain1.png", label:"Mountain Sunset" }

];
function getKidAvatarText(kid){
  const name = kid ? (kid.name || kid.username || "User") : "User";
  const fallback = (name.trim()[0] || "U").toUpperCase();
  return String(kid?.avatar || fallback).trim().slice(0,2).toUpperCase() || fallback;
}
function getKidAvatarColors(kid){
  return AVATAR_COLORS[kid?.avatarColor] || AVATAR_COLORS.orange;
}
function applyAvatar(el, kid){
  if(!el) return;
  const colors = getKidAvatarColors(kid);
  el.innerHTML = "";
  if(kid?.avatarImage){
    const img = document.createElement("img");
    img.className = "avatar-img";
    img.src = kid.avatarImage;
    img.alt = "";
    el.appendChild(img);
  }else{
    el.textContent = getKidAvatarText(kid);
  }
  el.style.background = colors.bg;
  el.style.color = colors.fg;
}
function updateActiveKidProfile(patch){
  const kids = loadKids();
  const kid = kids.find(k=>k.id===getActiveKidId());
  if(!kid) return;
  Object.assign(kid, patch);
  saveKids(kids);
  updateUserUI();
}
function addKidFlow(parentVerified=false){
  showAddUserPage(parentVerified);
}
function setAddUserMessage(text, bad=false){
  const el = $("addUserMsg");
  if(!el) return;
  el.textContent = text;
  el.className = "loginmsg " + (bad ? "bad" : "ok");
}
function showAddUserPage(parentVerified=false){
  if(!loggedIn){ showLogin(""); return; }
  if(currentPortalRole !== "parent" && !parentVerified){
    toast("Open the parent area to add a learner.");
    showProfileChooser();
    return;
  }
  if(!subscriptionAccessAllowed()){
    toast(subscriptionActionMessage());
    showPaywall(true);
    return;
  }
  const kids = loadKids();
  if(learnerCount(kids) >= MAX_KIDS_PER_ACCOUNT){
    hideLogin();
    hidePaywall();
    show("addUserPage");
    setAddUserMessage(`This account can have up to ${MAX_KIDS_PER_ACCOUNT} learners.`, true);
    if($("addUserCount")) $("addUserCount").textContent = String(learnerCount(kids));
    return;
  }
  hideLogin();
  hidePaywall();
  show("addUserPage");
  setAddUserMessage("Contact an administrator to arrange the $5 extra-learner add-on. This page does not charge you or create a learner.");
  if($("addUserPriceNote")) $("addUserPriceNote").textContent = "No charge or learner profile is created here. Contact an administrator to arrange the $5 add-on securely.";
  if($("addUserSubmitBtn")){
    $("addUserSubmitBtn").textContent = "$5 extra learner — contact administrator";
    $("addUserSubmitBtn").disabled = true;
  }
  if($("addUserCount")) $("addUserCount").textContent = String(learnerCount(kids));
  ["addUserName","addUserDisplayName","addUserPass"].forEach(id=>{
    const el = $(id);
    if(el) el.value = "";
  });
  setTimeout(()=>{ try{$("addUserName").focus();}catch(e){} }, 50);
}
function submitAddUserPage(){
  safeClick();
  setAddUserMessage("Contact an administrator to arrange the $5 extra-learner add-on. This page does not charge you or create a learner.", true);
}
function renameKidFlow(){
  const kids = loadKids();
  const id = getActiveKidId();
  const kid = kids.find(k=>k.id===id);
  if(!kid) return;
  const name = prompt("Rename display name:", kid.name || kid.username);
  if(!name) return;
  kid.name = name;
  saveKids(kids);
  updateUserUI();
  toast("User renamed.");
}
function deleteKidFlow(){
  requestDeleteKid(getActiveKidId());
}
function requestDeleteKid(id){
  const pin = ensurePin();
  if(!pin) return;
  const answer = prompt("Parent check: enter the parent PIN to delete this learner:");
  if(answer !== pin){ alert("Wrong parent PIN. Learner was not deleted."); return; }
  deleteKidById(id, true);
}
function deleteKidById(id, parentVerified=false){
  safeClick();
  if(!parentVerified){ requestDeleteKid(id); return; }
  let kids = loadKids();
  if(kids.length <= 1){ alert("Need at least 1 user."); return; }
  const kid = kids.find(k=>k.id===id);
  if(!kid) return;
  if(!confirm(`Delete ${kid.name || kid.username}? This removes their saved progress.`)) return;
  try{ learnMasterStore.removeItem(getStoreKeyForKid(id)); }catch(e){}
  try{ if(typeof getPlaygroundUnlockKey === "function") learnMasterStore.removeItem(getPlaygroundUnlockKey(id)); }catch(e){}
  kids = kids.filter(k=>k.id!==id);
  saveKids(kids);
  if(getActiveKidId() === id){
    setActiveKidId(kids[0].id);
    loadState();
  }
  renderAllBadges(); renderConvertButtons(); renderShop(); updateUserUI();
  if($("settingsPanel")) renderSettings();
  toast("User deleted.");
}
function resetCurrentKidFlow(){
  if(!confirm("Reset ONLY this user's points/learners/owned?")) return;
  state = blankState();
  saveState();
  renderAllBadges(); renderConvertButtons(); renderShop(); updateUserUI();
  toast("Progress reset.");
}
function renderUserListMenu(){
  const wrap = $("userListMenu");
  if(!wrap) return;
  wrap.innerHTML = "";
  const kids = loadKids();
  kids.forEach(k=>{
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dropdown-item";
    btn.textContent = "👤 " + (k.name || k.username);
    btn.onclick = () => { safeClick(); showLogin(String(k.username||"")); try{ speechSynthesis.cancel(); }catch(e){} };
    wrap.appendChild(btn);
  });
}
function updateUserUI(){
  const k = getActiveKid();
  const name = k ? (k.name || k.username || "User") : "User";
  ["userAvatar","userAvatar2","settingsAvatarPreview"].forEach(id=>applyAvatar($(id), k));
  if($("userNameNav")) $("userNameNav").textContent = name;
  if($("userNameMenu")) $("userNameMenu").textContent = name;
  renderUserListMenu();
  if($("settingsPanel")) renderSettings();
  if($("analysisPanel")) renderAnalysis();
}

function hideProfileChooser(){
  const chooser = $("profileChooser");
  if(chooser){
    chooser.style.display = "none";
    chooser.setAttribute("aria-hidden", "true");
  }
  document.body.classList.remove("profile-chooser-open");
}

function showProfileChooser(){
  if(!loggedIn) return;
  if(planChoiceRequired()&&!currentAccountIsAdmin){ showPaywall(true); return; }
  const chooser = $("profileChooser");
  const grid = $("profileChooserGrid");
  if(!chooser || !grid) return;
  grid.innerHTML = "";
  loadKids().forEach(kid=>{
    const button = document.createElement("button");
    button.type = "button";
    button.className = "profile-choice";
    button.setAttribute("aria-label", `Continue as ${kid.name || kid.username || "learner"}`);
    const avatar = document.createElement("span");
    avatar.className = "profile-choice-avatar";
    avatar.setAttribute("aria-hidden", "true");
    applyAvatar(avatar, kid);
    const label = document.createElement("strong");
    label.textContent = kid.name || kid.username || "Learner";
    button.append(avatar, label);
    button.onclick = ()=>chooseSubscriptionProfile(kid.id);
    grid.appendChild(button);
  });
  const parent = document.createElement("button");
  parent.type = "button";
  parent.className = "profile-choice profile-choice-parent";
  parent.setAttribute("aria-label", "Enter the parent area");
  parent.innerHTML = '<span class="profile-choice-avatar">P</span><strong>Parent</strong>';
  parent.onclick = enterParentPortal;
  grid.appendChild(parent);
  chooser.style.display = "flex";
  chooser.setAttribute("aria-hidden", "false");
  document.body.classList.add("profile-chooser-open");
  requestAnimationFrame(()=>grid.querySelector(".profile-choice")?.focus());
}

document.addEventListener("keydown", event=>{
  const chooser = $("profileChooser");
  if(event.key !== "Tab" || chooser?.style.display !== "flex") return;
  const choices = [...chooser.querySelectorAll(".profile-choice:not([disabled])")];
  if(!choices.length) return;
  const first = choices[0];
  const last = choices[choices.length - 1];
  if(event.shiftKey && (document.activeElement === first || !chooser.contains(document.activeElement))){
    event.preventDefault();
    last.focus();
  }else if(!event.shiftKey && (document.activeElement === last || !chooser.contains(document.activeElement))){
    event.preventDefault();
    first.focus();
  }
});

function chooseSubscriptionProfile(kidId){
  if(!subscriptionAccessAllowed()){
    showPaywall(true);
    toast(subscriptionActionMessage());
    return;
  }
  setActiveKidId(kidId);
  currentPortalRole = "kid";
  loadState();
  renderAllBadges();
  renderConvertButtons();
  renderShop();
  updateUserUI();
  hideProfileChooser();
  show("home");
}

async function enterParentPortal(){
  const alreadyHasPin = /^\d{4,}$/.test(learnMasterStore.getItem(PIN_KEY) || "");
  const pin = ensurePin();
  if(!pin) return;
  if(alreadyHasPin){
    const attempt = prompt("Enter the parent PIN:");
    if(attempt !== pin){ alert("Wrong parent PIN."); return; }
  }
  currentPortalRole = "parent";
  hideProfileChooser();
  show("parentPortal");
  await renderParentPortal();
}

async function renderParentPortal(){
  const wrap = $("parentPortalContent");
  if(!wrap) return;
  const plan = PLAN_CATALOG[subscriptionAuthority.selectedPlan];
  const subscriptionStatus=subscriptionStatusLabel();
  const subscriptionClass=`status-${String(subscriptionAuthority.status||"pending").toLowerCase()}`;
  const kids = loadKids();
  const client = window.learnMasterSupabase;
  let accountEmail = "Account email unavailable";
  let emailVerified = false;
  if(client){
    const {data}=await client.auth.getUser();
    accountEmail=data?.user?.email || accountEmail;
    emailVerified=!!data?.user?.email_confirmed_at;
  }
  if(typeof refreshAccountAuthority === "function") await refreshAccountAuthority();
  const hasConsent = localStorage.getItem("learnmaster_parent_consent_v1") === "1";
  wrap.innerHTML = `
    <div class="parent-summary-grid">
      <article><span>Current plan</span><strong>${htmlSafe(plan?.name || (trialActive() ? "Free trial" : "No plan"))}</strong></article>
      <article class="parent-subscription-card ${htmlSafe(subscriptionClass)}"><span>Subscription status</span><strong>${htmlSafe(subscriptionStatus)}</strong><small>${htmlSafe(subscriptionAccessAllowed() ? "Learning access is on" : subscriptionActionMessage())}</small></article>
      <article><span>Learners</span><strong>${kids.length} / ${MAX_KIDS_PER_ACCOUNT}</strong></article>
      <article><span>Subjects</span><strong>${htmlSafe(authoritativeSubscriptionSubjects().includes("all") ? "All" : (authoritativeSubscriptionSubjects().join(", ") || "Plan access"))}</strong></article>
    </div>
    <div class="parent-learner-list">
      ${kids.map(kid=>{ const p=getProgressForKid(kid.id), s=p.stats||{}; const attempts=(Number(s.correct)||0)+(Number(s.wrong)||0); const accuracy=attempts?Math.round((Number(s.correct)||0)/attempts*100):0; return `<article class="parent-learner-report"><div><strong>${htmlSafe(kid.name || kid.username || "Learner")}</strong><span>@${htmlSafe(kid.username || "learner")}</span></div><div class="learner-metrics"><span><b>${Number(s.lessonsCompleted)||0}</b> lessons</span><span><b>${Number(s.medalsEarned)||0}</b> medals</span><span><b>${accuracy}%</b> accuracy</span><span><b>${p.points}</b> gems</span></div><button type="button" class="btn btn-main" onclick="chooseSubscriptionProfile('${htmlSafe(kid.id)}')">Open learner</button></article>`; }).join("")}
    </div>
    <div class="parent-account-grid">
      <article><span>Account security</span><h2>${emailVerified ? "Email verified" : "Email needs verification"}</h2><p>${htmlSafe(accountEmail)} · automatic logout after 3 hours inactive.</p></article>
      <article><span>Children's privacy</span><h2>${hasConsent ? "Parent consent recorded" : "Consent action needed"}</h2><p>Review the parent notice and control child learning profiles.</p><button type="button" class="btn btn-main" onclick="openPrivacyNotice()">Review privacy</button></article>
    </div>
    <div class="parent-actions">
      <button type="button" class="btn btn-main" onclick="showAddUserPage()">Add learner</button>
      <button type="button" class="btn btn-main" onclick="showPaywall(false)">View plans</button>
      <button type="button" class="btn btn-main" onclick="showProfileChooser()">Back to profiles</button>
      ${currentAccountIsAdmin ? '<button type="button" class="btn btn-main" onclick="openAdminPortal()">Administrator</button>' : ''}
    </div>`;
}

/* ===========================
   Paywall + gating
=========================== */
function planChoiceRequired(){ return !subscriptionAccessAllowed(); }
function renderSubscriptionPaywallStatus(){
  const status=$('subscriptionPaywallStatus');
  if(!status) return;
  const requestedPlan=PLAN_CATALOG[subscriptionAuthority.selectedPlan];
  const planText=requestedPlan ? requestedPlan.name : "No plan selected";
  const statusText=subscriptionStatusLabel();
  status.className=`subscription-paywall-status status-${String(subscriptionAuthority.status||"pending").toLowerCase()}`;
  if(subscriptionAccessAllowed()){
    const detail=subscriptionAuthority.status==="late"
      ? subscriptionActionMessage()
      : `${planText} is active. No Stripe charge is made in this version.`;
    status.innerHTML=`<strong>${htmlSafe(statusText)}</strong><span>${htmlSafe(detail)}</span>`;
  }else if(subscriptionAuthority.mode==="setup"){
    status.innerHTML='<strong>Choose a plan</strong><span>Use the test checkout to start immediately. No administrator approval is needed.</span>';
  }else if(subscriptionAuthority.selectedPlan){
    status.innerHTML=`<strong>${htmlSafe(statusText)}</strong><span>${htmlSafe(subscriptionActionMessage())}</span>`;
  }else{
    status.innerHTML='<strong>Choose a plan</strong><span>Enter the test card in checkout and start immediately. Stripe is not connected yet.</span>';
  }
}
function showPaywall(required=planChoiceRequired()){
  if(!loggedIn) return;
  const locked = required || planChoiceRequired();
  if(locked) learnMasterStore.setItem(REQUIRED_PLAN_KEY, "1");
  hideProfileChooser();
  renderSubscriptionPaywallStatus();
  const wall = $("paywall");
  if(wall){
    wall.style.display = "flex";
    wall.setAttribute("aria-hidden", "false");
  }
  document.body.classList.add("paywall-open");
  document.body.classList.toggle("plan-choice-required", locked);
}
function hidePaywall(force=false){
  if(planChoiceRequired() && !force && !currentAccountIsAdmin) return;
  const p=$("paywall");
  if(p){
    p.style.display = "none";
    p.setAttribute("aria-hidden", "true");
  }
  document.body.classList.remove("paywall-open");
  document.body.classList.remove("plan-choice-required");
}
function formatMs(ms){
  const s = Math.max(0, Math.floor(ms/1000));
  const m = Math.floor(s/60), r = s%60;
  return String(m).padStart(2,"0")+":"+String(r).padStart(2,"0");
}
function updateTrialUI(){
  const pill = $("trialTimerPill");
  const leftEl = $("trialLeft");
  const trialChip = $("trialChip");
  if(trialActive()){
    if(pill) pill.style.display = "inline-flex";
    const left = getTrialEnds() - nowMs();
    if(leftEl) leftEl.textContent = formatMs(left);
    if(trialChip) trialChip.textContent = "On ("+formatMs(left)+")";
  }else{
    if(pill) pill.style.display = "none";
    if(trialChip) trialChip.textContent = "Off";
  }
}
function gateAllowedSection(sectionId){
  if(!loggedIn) return false;
  if(sectionId === "parentPortal") return currentPortalRole === "parent";
  if(["adminPortal","paymentStatus"].includes(sectionId)) return currentPortalRole === "parent" && currentAccountIsAdmin;
  if(sectionId === "curriculumStandards") return true;
  if(["settings","analysis"].includes(sectionId)) return true;
  if(sectionId === "shop") return true;
  if(sectionId === "addUserPage") return currentPortalRole === "parent" && subscriptionAccessAllowed();
  if(!subscriptionAccessAllowed()) return false;
  if(["home","grades","reading","tutorFinder"].includes(sectionId)) return anySubjectAllowed();
  if(sectionId === "playground") return anySubjectAllowed();
  if(["prek","kinder","grade1"].includes(sectionId)) return anySubjectAllowed();
  const earlySubjectMatch = sectionId.match(/^(?:prek|kinder|g1)-(eng|math)$/);
  if(earlySubjectMatch) return subjectAllowed(earlySubjectMatch[1]);
  if(/^grade\d+$/.test(sectionId)) return anySubjectAllowed();
  const subjectMatch = sectionId.match(/^g\d+-(eng|math|sci|hist)$/);
  if(subjectMatch) return subjectAllowed(subjectMatch[1]);
  if(sectionId === "lessonRunner"){
    const activeLessonSubject=typeof LR!=="undefined" ? String(LR.subj||"") : "";
    return Boolean(activeLessonSubject && subjectAllowed(activeLessonSubject));
  }
  return subjectAllowed("all");
}
function applyAccessUI(){
  if(!loggedIn){ hidePaywall(); return; }
  const subjects = authoritativeSubscriptionSubjects();
  const label = subscriptionAccessAllowed()
    ? (subjects.includes("all") ? "ALL" : (subjects.length ? subjects.join("+").toUpperCase() : "ACTIVE"))
    : subscriptionStatusLabel().toUpperCase();

  if($("planChip")) $("planChip").textContent = label;
  updateTrialUI();

  function lockCard(id, lock){
    const card = $(id);
    if(!card) return;
    card.style.opacity = lock ? ".55" : "1";
    card.style.filter = lock ? "grayscale(1)" : "none";
    card.style.pointerEvents = lock ? "none" : "auto";
  }

  const hasAny = anySubjectAllowed();
  ["cardGrade2","cardGrade3","cardGrade4","cardGrade5","cardGrade6","cardGrade7","cardGrade8","cardGrade9","cardGrade10"].forEach(id=>lockCard(id, !hasAny));
  ["cardPrek","cardKinder","cardGrade1"].forEach(id=>lockCard(id, !hasAny));
  document.querySelectorAll(".grade-subject-option[data-subject]").forEach(button=>{
    const allowed = subjectAllowed(button.dataset.subject);
    button.classList.toggle("is-locked", !allowed);
    button.disabled = !allowed;
    button.setAttribute("aria-disabled", String(!allowed));
  });
  lockCard("cardShop", false);
  lockCard("cardPlayground", !hasAny);

  const freeSectionOpen=["settings","analysis","shop","curriculumStandards","parentPortal","adminPortal","paymentStatus"]
    .some(id=>{ const section=$(id); return section&&!section.classList.contains("d-none"); });
  if(!hasAny&&!currentAccountIsAdmin&&!freeSectionOpen) showPaywall(true);
  else hidePaywall(true);
}
