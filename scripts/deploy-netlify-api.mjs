import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {execFileSync} from "node:child_process";

const siteId=process.env.NETLIFY_SITE_ID || "c080ae32-3f93-4c0a-aabc-fae4b336fca8";
const configPath=path.join(process.env.APPDATA||"", "netlify", "Config", "config.json");
const archivePath=path.join(os.tmpdir(),`lmk12-netlify-${Date.now()}.zip`);

async function deploy(){
  const config=JSON.parse(fs.readFileSync(configPath,"utf8"));
  const account=Object.values(config.users||{}).find(user=>user?.auth?.token);
  const token=account?.auth?.token;
  if(!token) throw new Error("No signed-in Netlify token was found.");

  execFileSync("git",[
    "archive","--format=zip","--output",archivePath,"HEAD",
    "index.html","k12.css","k12.js","components","images"
  ],{stdio:"inherit"});

  try{
    const response=await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`,{
      method:"POST",
      headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/zip"},
      body:fs.readFileSync(archivePath)
    });
    const payload=await response.json().catch(()=>({}));
    if(!response.ok) throw new Error(payload.message||`Netlify returned HTTP ${response.status}.`);
    console.log(JSON.stringify({
      id:payload.id,
      state:payload.state,
      productionUrl:payload.ssl_url,
      deployUrl:payload.deploy_ssl_url
    },null,2));
  }finally{
    if(fs.existsSync(archivePath)) fs.unlinkSync(archivePath);
  }
}

try{
  await deploy();
}catch(error){
  console.error(error.cause?.message || error.message);
  process.exitCode=1;
}
