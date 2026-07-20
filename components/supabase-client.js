(function(){
  const config = window.LEARNMASTER_SUPABASE_CONFIG;
  if(!config?.url || !config?.publishableKey || !window.supabase?.createClient){
    console.error("Supabase could not be initialized.");
    window.learnMasterSupabase = null;
    return;
  }

  window.learnMasterSupabase = window.supabase.createClient(
    config.url,
    config.publishableKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );
})();
