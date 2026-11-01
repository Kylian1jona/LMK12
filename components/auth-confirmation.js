(async()=>{
  const $=id=>document.getElementById(id);
  const set=(title,message,error=false)=>{
    $("resultTitle").textContent=title;
    $("resultMessage").textContent=message;
    $("resultIcon").textContent=error?"!":"✓";
    $("resultIcon").classList.toggle("error",error);
  };
  const params=new URLSearchParams(location.search);
  const hash=new URLSearchParams(location.hash.replace(/^#/,""));
  const mode=params.get("mode");
  const hasCallback=params.has("code")||params.has("token_hash")||hash.has("access_token")||hash.has("error_code")||hash.has("error");
  const client=window.supabase?.createClient(window.LEARNMASTER_SUPABASE_CONFIG.url,window.LEARNMASTER_SUPABASE_CONFIG.publishableKey,{auth:{persistSession:true,detectSessionInUrl:true}});
  if(!client){set("Service unavailable","Please try again shortly.",true);return;}
  if(hash.has("error")||params.has("error")){
    set("This link could not be used",hash.get("error_description")||params.get("error_description")||"Request a fresh email from the sign-in page.",true);return;
  }
  if(!hasCallback){set("Open your email link","Use the latest confirmation or recovery link sent to your inbox. Older links may have expired.",true);return;}
  try{
    let session;
    if(params.has("token_hash")){
      const type=params.get("type")==="recovery"?"recovery":"email";
      const {data,error}=await client.auth.verifyOtp({token_hash:params.get("token_hash"),type});
      if(error)throw error;
      session=data.session;
    }else{
      const result=await client.auth.getSession();
      if(result.error)throw result.error;
      session=result.data.session;
    }
    if(!session?.user)throw new Error("The link has expired. Request a new email from the sign-in page.");
    localStorage.setItem("learnmaster_last_activity_v1",String(Date.now()));
    history.replaceState(null,"",location.pathname);
    const recovery=mode==="password"||mode==="pin"||hash.get("type")==="recovery";
    if(recovery&&mode!=="pin"){
      set("Choose a new password","Your email link is verified. Set a new password below.");
      $("passwordForm").hidden=false;
      $("newPassword").focus();
      $("passwordForm").addEventListener("submit",async event=>{
        event.preventDefault();
        const first=$("newPassword").value,second=$("confirmPassword").value;
        if(first!==second){$("formMessage").textContent="The passwords do not match.";return;}
        const {error}=await client.auth.updateUser({password:first});
        if(error){$("formMessage").textContent=error.message;return;}
        $("passwordForm").hidden=true;
        set("Password changed","Your new password is ready. Return to LearnMaster to continue.");
      });
      return;
    }
    const data=session.user.user_metadata?.learnmaster_data||{};
    const pinKey="learnmaster_account_pin_v1";
    if(session.user.user_metadata?.account_role!=="tutor"&&(mode==="pin"||!/^\d{4,}$/.test(data[pinKey]||""))){
      set(mode==="pin"?"Reset your parent PIN":"Email confirmed!",mode==="pin"?"Your email link is verified. Choose a new parent PIN.":"Your account is ready. Create a parent PIN before you begin.");
      $("pinForm").hidden=false;
      $("parentPin").focus();
      $("pinForm").addEventListener("submit",async event=>{
        event.preventDefault();
        const pin=$("parentPin").value.trim();
        if(!/^\d{4,}$/.test(pin)){$("formMessage").textContent="Use at least four digits.";return;}
        const fresh=await client.auth.getUser();
        if(fresh.error||!fresh.data.user){$("formMessage").textContent="Your link expired. Request a new email.";return;}
        const existing=fresh.data.user.user_metadata?.learnmaster_data||{};
        const {error}=await client.auth.updateUser({data:{learnmaster_data:{...existing,[pinKey]:pin}}});
        if(error){$("formMessage").textContent=error.message;return;}
        $("pinForm").hidden=true;
        $("pinValue").textContent=pin;
        $("pinReveal").hidden=false;
        set("Parent PIN saved","Your account is ready to use.");
      });
      return;
    }
    set("Email confirmed!","Your LearnMaster account is ready. Continue to your learning space.");
  }catch(error){set("This link could not be used",error.message||"Request a fresh email from the sign-in page.",true);}
})();
