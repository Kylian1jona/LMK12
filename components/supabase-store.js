(function(){
  const cache = Object.create(null);
  let userId = "";
  let saveTimer = 0;

  async function persist(){
    if(!userId || !window.learnMasterSupabase) return;
    const { error } = await window.learnMasterSupabase.auth.updateUser({
      data:{ learnmaster_data:{...cache} }
    });
    if(error) console.error("Could not back up LearnMaster data:", error.message);
  }
  function scheduleSave(){
    clearTimeout(saveTimer);
    saveTimer = setTimeout(persist, 1200);
  }
  async function hydrate(user){
    userId = user?.id || "";
    if(!userId) return;
    Object.keys(cache).forEach(key=>delete cache[key]);
    const cloudData = user?.user_metadata?.learnmaster_data;
    Object.assign(cache, cloudData && typeof cloudData === "object" ? cloudData : {});

    // One-time migration of legacy device data, followed by local removal.
    const legacy = {};
    for(let i=0; i<localStorage.length; i++){
      const key = localStorage.key(i);
      if(key && (key.startsWith("learnmaster_") || key === "k12Language")){
        legacy[key] = localStorage.getItem(key);
      }
    }
    if(!cloudData && Object.keys(legacy).length) Object.assign(cache, legacy);
    Object.keys(legacy).forEach(key=>localStorage.removeItem(key));
    await persist();
  }
  function clearUser(){ userId = ""; Object.keys(cache).forEach(key=>delete cache[key]); }

  window.learnMasterStore = {
    getItem(key){ return Object.prototype.hasOwnProperty.call(cache,key) ? cache[key] : null; },
    setItem(key,value){ cache[key] = String(value); scheduleSave(); },
    removeItem(key){ delete cache[key]; scheduleSave(); },
    hydrate,
    flush:persist,
    clearUser
  };
  window.addEventListener("pagehide", ()=>{ if(userId) persist(); });
})();
