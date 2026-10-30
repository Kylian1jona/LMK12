const DAY_MS=86400000;

function json(status,body){
  return new Response(JSON.stringify(body),{
    status,
    headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}
  });
}

function isoDate(date){
  return date.toISOString().slice(0,10);
}

function escapeHtml(value){
  return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}

function planName(value){
  const names={eng:"English",math:"Math",sci:"Science",hist:"History",all:"All Subjects",elf:"Elf Academy",santa:"Santa Academy",reindeer:"Reindeer Academy"};
  return names[String(value||"").toLowerCase()]||"LearnMaster";
}

export default async function handler(request,context){
  const supabaseUrl=process.env.SUPABASE_URL;
  const serviceKey=process.env.SUPABASE_SECRET_KEY;
  const resendKey=process.env.RESEND_API_KEY;
  const fromEmail=process.env.LEARNMASTER_FROM_EMAIL;
  if(!supabaseUrl||!serviceKey||!resendKey||!fromEmail){
    console.error("Payment reminder configuration is incomplete.");
    return json(503,{ok:false,error:"reminder service is not configured"});
  }

  const target=new Date(Date.now()+5*DAY_MS);
  const dueOn=isoDate(target);
  const query=new URL("/rest/v1/learnmaster_profiles",supabaseUrl);
  query.searchParams.set("select","user_id,email,display_name,first_name,selected_plan,payment_due_on");
  query.searchParams.set("payment_status","eq.active");
  query.searchParams.set("payment_due_on",`eq.${dueOn}`);
  query.searchParams.set("email","not.is.null");
  const databaseHeaders={apikey:serviceKey,authorization:`Bearer ${serviceKey}`,"content-type":"application/json"};
  const profilesResponse=await fetch(query,{headers:databaseHeaders});
  if(!profilesResponse.ok){
    const detail=await profilesResponse.text();
    console.error("Could not load payment reminders",profilesResponse.status,detail);
    return json(502,{ok:false,error:"could not load reminders"});
  }
  const profiles=await profilesResponse.json();
  const results=[];
  for(const profile of profiles){
    const recipient=String(profile.email||"").trim();
    if(!recipient) continue;
    const name=profile.first_name||profile.display_name||"there";
    const plan=planName(profile.selected_plan);
    const subject=`LearnMaster payment reminder for ${dueOn}`;
    const html=`<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#17324d"><h1 style="color:#087f83">Payment reminder</h1><p>Hi ${escapeHtml(name)},</p><p>Your ${escapeHtml(plan)} payment is scheduled for <strong>${escapeHtml(dueOn)}</strong>, which is five days away.</p><p>Please review your billing details before the due date if anything needs to change.</p><p>Thank you,<br>LearnMaster K12</p></div>`;
    const sendResponse=await fetch("https://api.resend.com/emails",{
      method:"POST",
      headers:{authorization:`Bearer ${resendKey}`,"content-type":"application/json","idempotency-key":`learnmaster-payment-${profile.user_id}-${dueOn}`},
      body:JSON.stringify({from:fromEmail,to:[recipient],subject,html})
    });
    if(!sendResponse.ok){
      const detail=await sendResponse.text();
      console.error("Payment reminder email failed",profile.user_id,sendResponse.status,detail);
      results.push({user_id:profile.user_id,sent:false});
      continue;
    }
    results.push({user_id:profile.user_id,sent:true});
  }
  return json(200,{ok:true,due_on:dueOn,matched:profiles.length,sent:results.filter(item=>item.sent).length});
}

export const config={schedule:"0 14 * * *"};
