/* ===========================
   Login (always required)
=========================== */
let loggedIn = false;
let currentPortalRole = "kid";
const INACTIVITY_LIMIT_MS = 3 * 60 * 60 * 1000;
const INACTIVITY_KEY = "learnmaster_last_activity_v1";
let INACTIVITY_TIMER = null;
let LAST_ACTIVITY_WRITE = 0;

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
  if(document.visibilityState === "visible") recordUserActivity();
});

function showLogin(prefillUser=""){
  loggedIn = false;
  stopInactivityTimer();
  currentPortalRole = "kid";
  hidePaywall(true);
  hideProfileChooser();
  const wall = $("loginWall");
  if(!wall) return;
  wall.style.display = "flex";
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
  if($("loginWall")) $("loginWall").style.display = "none";
  localStorage.setItem(INACTIVITY_KEY, String(Date.now()));
  scheduleInactivityLogout();
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
  if(loginPanel) loginPanel.classList.remove("d-none");
  if(signupPanel) signupPanel.classList.add("d-none");
  if($("loginMsg")){
    $("loginMsg").textContent = "";
    $("loginMsg").className = "loginmsg";
  }
}

function showSignup(){
  safeClick();
  const loginPanel = $("loginFormPanel");
  const signupPanel = $("signupFormPanel");
  if(loginPanel) loginPanel.classList.add("d-none");
  if(signupPanel) signupPanel.classList.remove("d-none");
  if($("loginMsg")){
    $("loginMsg").textContent = "";
    $("loginMsg").className = "loginmsg";
  }
  ["signupUser","signupName","signupPass"].forEach(id=>{
    const el = $(id);
    if(el) el.value = "";
  });
  setTimeout(()=>{ try{$("signupUser").focus();}catch(e){} }, 50);
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

async function syncSupabaseProfile(user, username, name){
  const client = window.learnMasterSupabase;
  if(!client || !user?.id) return false;
  const profile = {
    user_id:user.id,
    email:user.email || null,
    username:username || user.email?.split("@")[0] || "learner",
    display_name:name || username || user.email?.split("@")[0] || "Learner"
  };
  const { error } = await client.from("learnmaster_profiles").upsert(profile, { onConflict:"user_id" });
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
  const email = ($("signupUser")?.value || "").trim().toLowerCase();
  const username = ($("signupName")?.value || "").trim().toLowerCase();
  const name = username;
  const pass = $("signupPass")?.value || "";
  const usernameError = validateNewUserFields(username, pass, kids);
  const error = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? "Enter a valid email address."
    : (usernameError || (!pass || pass.length < 6 ? "Password must be 6 or more characters." : ""));
  if(error){ loginMsg(error, true); return; }
  loginMsg("Creating account…");
  const { data, error: authError } = await client.auth.signUp({
    email,
    password: pass,
    options: {
      emailRedirectTo:"https://k12-learning.netlify.app",
      data: { username, display_name: name, free_month_eligible: true }
    }
  });
  if(authError){ loginMsg(authError.message, true); return; }
  if(!data.user){ loginMsg("Supabase did not create the account.", true); return; }
  await syncSupabaseProfile(data.user, username, name);
  if(!data.session){
    showLoginForm();
    if($("loginUser")) $("loginUser").value = username;
    loginMsg("Account created. Check your email to confirm it, then log in with your username.");
    return;
  }
  await window.learnMasterStore.hydrate(data.user);
  const kid = upsertLocalSupabaseKid(data.user, username, name);
  setTrialEnds(Date.now() + 30*24*60*60*1000);
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
  await syncSupabaseProfile(data.user, username, metadata.display_name || username);
  const kid = upsertLocalSupabaseKid(data.user, username, metadata.display_name || username);
  const startsFreeMonth = metadata.free_month_eligible && !getTrialEnds() && !getPlan();
  if(startsFreeMonth) setTrialEnds(Date.now() + 30*24*60*60*1000);
  const needsPlan = !getPlan() && !trialActive();
  if(needsPlan) learnMasterStore.setItem(REQUIRED_PLAN_KEY, "1");
  await finishLoginForKid(kid.id, "Logged in!", !needsPlan);
  if(needsPlan) showPaywall(true);
}
async function logout(){
  safeClick();
  try{ speechSynthesis.cancel(); }catch(e){}
  if(window.learnMasterSupabase) await window.learnMasterSupabase.auth.signOut();
  window.learnMasterStore?.clearUser();
  stopInactivityTimer(true);
  currentPortalRole = "kid";
  showLogin("");
}
async function resetLoginPassword(){
  const loginName = ($("loginUser")?.value || "").trim().toLowerCase();
  const client = window.learnMasterSupabase;
  let email = String(loadKids().find(k=>String(k.username || "").toLowerCase() === loginName)?.email || "").toLowerCase();
  if(!email){
    const { data } = await client.rpc("learnmaster_login_email", { login_username:loginName });
    email = String(data || "").toLowerCase();
  }
  if(!email){ loginMsg("Enter a valid username above first.", true); return; }
  const { error } = await window.learnMasterSupabase.auth.resetPasswordForEmail(email);
  loginMsg(error ? error.message : "Password reset email sent.", !!error);
}

/* Enter-to-login */
document.addEventListener("keydown", (e)=>{
  const wall = $("loginWall");
  if(wall && wall.style.display === "flex" && e.key === "Enter"){
    if(!$("signupFormPanel")?.classList.contains("d-none")) createSignupUser();
    else doLogin();
  }
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
const THEME_KEY = "learnmaster_theme_v1";
const MAX_KIDS_PER_ACCOUNT = 3;
const EXTRA_KID_PRICE = 5;
let pendingNewKid = null;

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
function subjectAllowed(subj){
  if(trialActive()) return true;
  const subjects = getPurchasedSubjects();
  const planSubjects = PLAN_CATALOG[getPlan()]?.subjects || [];
  return subjects.includes("all") || subjects.includes(subj) || planSubjects.includes("all") || planSubjects.includes(subj);
}
function anySubjectAllowed(){
  return trialActive() || getPurchasedSubjects().length > 0 || !!getPlan();
}

function nowMs(){ return Date.now(); }
function getTrialEnds(){ return Number(learnMasterStore.getItem(TRIAL_KEY) || 0); }
function setTrialEnds(t){ learnMasterStore.setItem(TRIAL_KEY, String(t)); }
function clearTrial(){ learnMasterStore.removeItem(TRIAL_KEY); }
function trialActive(){ return getTrialEnds() > nowMs(); }

function startTrial(){
  safeClick();
  if(getPlan()){ toast("You already have a plan."); return; }
  setTrialEnds(nowMs() + 5*60*1000);
  learnMasterStore.removeItem(REQUIRED_PLAN_KEY);
  hidePaywall();
  applyAccessUI();
  showProfileChooser();
  toast("Trial started! 5 minutes.");
  speakGlobal("Trial started. Have fun learning!");
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
  if(action === "addKid"){ addKidFlow(); return true; }
  if(action === "managePlan"){ managePlanFlow(); return true; }
  if(action === "accountMenu"){ accountMenuFlow(); return true; }
  if(action === "resetCurrentKid"){ resetCurrentKidFlow(); return true; }
  return true;
}
function accountMenuFlow(){
  const choice = prompt(
`Account Tools:
1) Add user
2) Rename user
3) Delete user
4) Manage plan
5) Reset current user progress
Type 1-5`
  );
  if(choice === "1") addKidFlow();
  if(choice === "2") renameKidFlow();
  if(choice === "3") deleteKidFlow();
  if(choice === "4") managePlanFlow();
  if(choice === "5") resetCurrentKidFlow();
}
function managePlanFlow(){
  const cur = getPlan() || (trialActive() ? "trial" : "none");
  const ans = prompt(`Manage Plan (current: ${cur})\nType:\neng / math / sci / hist / all / none`);
  if(!ans) return;
  if(ans === "none"){ clearPlan(); clearTrial(); showPaywall(); applyAccessUI(); return; }
  if(["eng","math","sci","hist","all"].includes(ans)){
    setPlan(ans);
    setPurchasedSubjects(PLAN_CATALOG[ans].subjects);
    clearTrial();
    hidePaywall();
    applyAccessUI();
    toast("Plan updated.");
    updateUserUI();
  }
  else alert("Invalid.");
}

/* ===========================
   Checkout (Payment + Promo Codes)
=========================== */
const PLAN_CATALOG = {
  eng:     { name: "English Plan", price: 5, subjects:["eng"] },
  math:    { name: "Math Plan", price: 5, subjects:["math"] },
  sci:     { name: "Science Plan", price: 5, subjects:["sci"] },
  hist:    { name: "History Plan", price: 5, subjects:["hist"] },
  all:     { name: "All Subjects", price: 20, subjects:["all"] },
  member:  { name: "Extra Learner Account", price: EXTRA_KID_PRICE, addon:"member" },
  elf:      { name: "English Plan", price: 5, subjects:["eng"] },
  santa:    { name: "Math + English Plan", price: 10, subjects:["eng","math"] },
  reindeer: { name: "All Subjects", price: 20, subjects:["all"] },
};
const PROMO_CODES = {
  SAVE10:   { percent: 10 },
  SAVE20:   { percent: 20 },
  FIVE:     { amount: 5 },
  MAX50:    { percent: 50, plan: "reindeer"}
};
let checkout = { planId:"", base:0, discount:0, promo:"" };

function money(n){ return "$" + (Math.max(0, Number(n) || 0)).toFixed(2); }

function openCheckout(planId){
  safeClick();
  checkout.planId = planId;
  checkout.promo = "";
  checkout.discount = 0;

  const plan = PLAN_CATALOG[planId];
  if(!plan){ toast("Unknown plan."); return; }
  checkout.base = plan.price;

  $("promoInput").value = "";
  $("cardNumber").value = "";
  $("cardExpiry").value = "";
  $("cardCVC").value = "";
  $("cardZip").value = "";
  $("payErr").textContent = "";
  $("checkoutPromoMsg").textContent = "";

  $("checkoutTitle").textContent = `Checkout – ${plan.name}`;
  $("checkoutPlanName").textContent = plan.name;
  if($("checkoutDesc")) $("checkoutDesc").textContent = plan.addon === "member"
    ? "Add one learner account to this device."
    : "Complete payment to activate your plan.";

  updateCheckoutUI();

  if($("paywall")) $("paywall").style.display = "flex";
  const modal = new bootstrap.Modal(document.getElementById("checkoutModal"));
  modal.show();
}
function updateCheckoutUI(){
  const total = Math.max(0, checkout.base - checkout.discount);
  $("checkoutPrice").textContent = money(checkout.base);
  $("checkoutDiscount").textContent = "- " + money(checkout.discount);
  $("checkoutTotal").textContent = money(total);
}
function applyPromo(){
  safeClick();
  const raw = ($("promoInput").value || "").trim().toUpperCase();
  $("checkoutPromoMsg").textContent = "";
  $("payErr").textContent = "";

  if(!raw){
    checkout.promo = "";
    checkout.discount = 0;
    $("checkoutPromoMsg").textContent = "Promo cleared.";
    updateCheckoutUI();
    return;
  }

  const rule = PROMO_CODES[raw];
  if(!rule){
    checkout.promo = "";
    checkout.discount = 0;
    $("checkoutPromoMsg").textContent = "❌ Invalid code.";
    updateCheckoutUI();
    return;
  }
  if(rule.plan && rule.plan !== checkout.planId){
    checkout.promo = "";
    checkout.discount = 0;
    $("checkoutPromoMsg").textContent = `❌ Code only works for ${PLAN_CATALOG[rule.plan]?.name || rule.plan}.`;
    updateCheckoutUI();
    return;
  }

  let disc = 0;
  if(rule.percent) disc = checkout.base * (rule.percent / 100);
  else if(rule.amount) disc = rule.amount;

  disc = Math.min(checkout.base, disc);
  checkout.promo = raw;
  checkout.discount = disc;

  $("checkoutPromoMsg").textContent = `✅ Code applied: ${raw}`;
  updateCheckoutUI();
}
function validCardLike(){
  const num = ($("cardNumber").value || "").replace(/\s+/g,"");
  const exp = ($("cardExpiry").value || "").trim();
  const cvc = ($("cardCVC").value || "").trim();
  const zip = ($("cardZip").value || "").trim();

  if(num.length < 12) return "Enter a valid card number.";
  if(!/^\d+$/.test(num)) return "Card number must be digits only.";
  if(!/^\d{2}\/\d{2}$/.test(exp)) return "Expiry must be MM/YY.";
  if(cvc.length < 3) return "CVC must be 3+ digits.";
  if(!/^\d+$/.test(cvc)) return "CVC must be digits only.";
  if(zip.length < 4) return "Enter billing ZIP.";
  return "";
}
function confirmPayment(){
  safeClick();
  $("payErr").textContent = "";

  const planId = checkout.planId;
  const plan = PLAN_CATALOG[planId];
  if(!plan){ $("payErr").textContent = "Plan missing."; return; }

  const err = validCardLike();
  if(err){ $("payErr").textContent = err; return; }

  const total = Math.max(0, checkout.base - checkout.discount);

  learnMasterStore.setItem("learnmaster_last_payment_v1", JSON.stringify({
    planId, planName: plan.name, base: checkout.base, discount: checkout.discount,
    promo: checkout.promo || "", total, ts: Date.now()
  }));

  const modalEl = document.getElementById("checkoutModal");
  const instance = bootstrap.Modal.getInstance(modalEl);
  if(instance) instance.hide();

  if(plan.addon === "member"){
    finishPaidKidAdd();
    updateUserUI();
    toast("Extra learner account added.");
    speakGlobal("Extra learner account added.");
    return;
  }

  setPlan(planId);
  if(plan.subjects) addPurchasedSubjects(plan.subjects);
  clearTrial();
  learnMasterStore.removeItem(REQUIRED_PLAN_KEY);
  hidePaywall();
  applyAccessUI();
  updateUserUI();
  showProfileChooser();
  toast(`✅ Activated ${plan.name}!`);
  speakGlobal("Payment accepted. Plan activated!");
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
  { id:"cat", type:"image", src:"images/pfpcat.png", label:"Cat" },
  { id:"dog", type:"image", src:"images/pfpdog.png", label:"Dog" },
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
function addKidFlow(){
  showAddUserPage();
}
function setAddUserMessage(text, bad=false){
  const el = $("addUserMsg");
  if(!el) return;
  el.textContent = text;
  el.className = "loginmsg " + (bad ? "bad" : "ok");
}
function showAddUserPage(){
  const kids = loadKids();
  if(learnerCount(kids) >= MAX_KIDS_PER_ACCOUNT){
    loggedIn = true;
    hideLogin();
    hidePaywall();
    show("addUserPage");
    setAddUserMessage(`This account can have up to ${MAX_KIDS_PER_ACCOUNT} learners.`, true);
    if($("addUserCount")) $("addUserCount").textContent = String(learnerCount(kids));
    return;
  }
  loggedIn = true;
  hideLogin();
  hidePaywall();
  show("addUserPage");
  setAddUserMessage("");
  if($("addUserPriceNote")) $("addUserPriceNote").textContent = "Each extra learner account costs $5.";
  if($("addUserSubmitBtn")) $("addUserSubmitBtn").textContent = "Continue to $5 checkout";
  if($("addUserCount")) $("addUserCount").textContent = String(learnerCount(kids));
  ["addUserName","addUserDisplayName","addUserPass"].forEach(id=>{
    const el = $(id);
    if(el) el.value = "";
  });
  setTimeout(()=>{ try{$("addUserName").focus();}catch(e){} }, 50);
}
function submitAddUserPage(){
  safeClick();
  const kids = loadKids();
  if(learnerCount(kids) >= MAX_KIDS_PER_ACCOUNT){
    setAddUserMessage(`This account can have up to ${MAX_KIDS_PER_ACCOUNT} learners.`, true);
    return;
  }
  const username = ($("addUserName")?.value || "").trim().toLowerCase();
  const name = ($("addUserDisplayName")?.value || "").trim() || username;
  const pass = $("addUserPass")?.value || "";
  const error = validateNewUserFields(username, pass, kids);
  if(error){ setAddUserMessage(error, true); return; }
  pendingNewKid = { name, username, pass };
  setAddUserMessage("Ready. Continue through checkout to finish.", false);
  openCheckout("member");
}
function finishPaidKidAdd(){
  if(!pendingNewKid) return;
  const kids = loadKids();
  if(learnerCount(kids) >= MAX_KIDS_PER_ACCOUNT){
    pendingNewKid = null;
    setAddUserMessage(`This account can have up to ${MAX_KIDS_PER_ACCOUNT} learners.`, true);
    return;
  }
  const id = "kid" + String(Math.floor(Math.random()*999999));
  kids.push({id, ...pendingNewKid});
  pendingNewKid = null;
  saveKids(kids);
  setActiveKidId(id);
  loadState();
  renderAllBadges();
  renderConvertButtons();
  renderShop();
  updateUserUI();
  hidePaywall();
  show("home");
  toast("User added.");
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
  if(chooser) chooser.style.display = "none";
}

function showProfileChooser(){
  if(!loggedIn || planChoiceRequired()){ if(loggedIn) showPaywall(true); return; }
  const chooser = $("profileChooser");
  const grid = $("profileChooserGrid");
  if(!chooser || !grid) return;
  grid.innerHTML = "";
  loadKids().forEach(kid=>{
    const button = document.createElement("button");
    button.type = "button";
    button.className = "profile-choice";
    const avatar = document.createElement("span");
    avatar.className = "profile-choice-avatar";
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
  parent.innerHTML = '<span class="profile-choice-avatar">P</span><strong>Parent</strong>';
  parent.onclick = enterParentPortal;
  grid.appendChild(parent);
  chooser.style.display = "flex";
}

function chooseSubscriptionProfile(kidId){
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

function enterParentPortal(){
  const pin = ensurePin();
  if(!pin) return;
  const attempt = prompt("Enter the parent PIN:");
  if(attempt !== pin){ alert("Wrong parent PIN."); return; }
  currentPortalRole = "parent";
  hideProfileChooser();
  renderParentPortal();
  show("parentPortal");
}

async function renderParentPortal(){
  const wrap = $("parentPortalContent");
  if(!wrap) return;
  const plan = PLAN_CATALOG[getPlan()];
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
      <article><span>Learners</span><strong>${kids.length} / ${MAX_KIDS_PER_ACCOUNT}</strong></article>
      <article><span>Subjects</span><strong>${htmlSafe(getPurchasedSubjects().includes("all") ? "All" : (getPurchasedSubjects().join(", ") || "Plan access"))}</strong></article>
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
function planChoiceRequired(){ return learnMasterStore.getItem(REQUIRED_PLAN_KEY) === "1" && !getPlan() && !trialActive(); }
function showPaywall(required=planChoiceRequired()){
  if(!loggedIn) return;
  if(required) learnMasterStore.setItem(REQUIRED_PLAN_KEY, "1");
  const wall = $("paywall");
  if(wall) wall.style.display = "flex";
  document.body.classList.toggle("plan-choice-required", !!required);
}
function hidePaywall(force=false){
  if(planChoiceRequired() && !force) return;
  const p=$("paywall");
  if(p) p.style.display = "none";
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
  if(sectionId === "adminPortal") return currentPortalRole === "parent" && currentAccountIsAdmin;
  if(sectionId === "curriculumStandards") return true;
  if(["settings","analysis","addUserPage"].includes(sectionId)) return true;
  const plan = getPlan();
  const trial = trialActive();
  if(!plan && !trial) return false;
  if(trial) return true;
  if(["home","grades","reading"].includes(sectionId)) return anySubjectAllowed();
  if(sectionId === "shop" || sectionId === "playground") return anySubjectAllowed();
  if(["prek","prek-add","prek-count","prek-shapes","kinder","k-syll-count","k-syll-build","k-rhymes","grade1","g1-addsub","g1-graphs","g1-money"].includes(sectionId)){
    return subjectAllowed("all");
  }
  if(/^grade\d+$/.test(sectionId)) return anySubjectAllowed();
  const subjectMatch = sectionId.match(/^g\d+-(eng|math|sci|hist)$/);
  if(subjectMatch) return subjectAllowed(subjectMatch[1]);
  if(sectionId === "lessonRunner") return true;
  return subjectAllowed("all");
}
function applyAccessUI(){
  if(!loggedIn){ hidePaywall(); return; }
  const plan = getPlan();
  const trial = trialActive();
  const effective = plan || (trial ? "santa" : "");
  if($("planChip")) $("planChip").textContent = effective ? effective.toUpperCase() : "NONE";
  updateTrialUI();

function lockCard(id, lock){
  const card = $(id);
  if(!card) return;
  card.style.opacity = lock ? ".55" : "1";
  card.style.filter = lock ? "grayscale(1)" : "none";
  card.style.pointerEvents = lock ? "none" : "auto";
}

    if(effective === "elf"){
    // ELF: only Pre-K (assuming you have it elsewhere); everything here is locked
    lockCard("cardKinder", false);
    lockCard("cardGrade1", false);
    lockCard("cardGrade2", false);
    lockCard("cardGrade3", false);
    lockCard("cardGrade4", true);
    lockCard("cardGrade5", true);
    lockCard("cardGrade6", true);   // ✅ Grade 6 locked
    lockCard("cardShop", true);
  }
  else if(effective === "santa"){
    // SANTA: Kinder + Shop only (your current intent)
    lockCard("cardKinder", false);
    lockCard("cardGrade1", false);
    lockCard("cardGrade2", false);
    lockCard("cardGrade3", false);
    lockCard("cardGrade4", false);
    lockCard("cardGrade5", true);
    lockCard("cardGrade6", true);   // ✅ Grade 6 locked
    lockCard("cardShop", false);
  }
  else if(effective === "reindeer"){
    // REINDEER (MAX): unlock everything
    lockCard("cardKinder", false);
    lockCard("cardGrade1", false);
    lockCard("cardGrade2", false);
    lockCard("cardGrade3", false);
    lockCard("cardGrade4", false);
    lockCard("cardGrade5", false);
    lockCard("cardGrade6", false);
    lockCard("cardGrade7", false);        // ✅ Grade 6 unlocked ONLY here
    lockCard("cardGrade8", false);  
    lockCard("cardGrade9", false);  
    lockCard("cardGrade10", false);  
    lockCard("cardShop", false);
  }
  

  if(!plan && !trial) showPaywall();
  else hidePaywall();
}

function applyAccessUI(){
  if(!loggedIn){ hidePaywall(); return; }
  const trial = trialActive();
  const subjects = getPurchasedSubjects();
  const label = trial
    ? "TRIAL"
    : (subjects.includes("all") ? "ALL" : (subjects.length ? subjects.join("+").toUpperCase() : "NONE"));

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
  ["cardPrek","cardKinder","cardGrade1"].forEach(id=>lockCard(id, !subjectAllowed("all")));
  lockCard("cardShop", !hasAny);
  lockCard("cardPlayground", !hasAny);

  if(!hasAny) showPaywall();
  else hidePaywall();
}
