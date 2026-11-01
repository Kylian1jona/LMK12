import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const stage=process.argv[2];
if(!stage||!fs.existsSync(path.join(stage,'index.html'))) throw Error('A prepared deploy directory is required');
const siteId='c080ae32-3f93-4c0a-aabc-fae4b336fca8';
const config=JSON.parse(fs.readFileSync(path.join(process.env.APPDATA,'netlify','Config','config.json'),'utf8'));
const token=Object.values(config.users||{}).find(user=>user?.auth?.token)?.auth?.token;
if(!token) throw Error('No Netlify access token found');
const auth={Authorization:`Bearer ${token}`};
const files={};const byHash=new Map();
function walk(dir){
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const absolute=path.join(dir,entry.name);
    if(entry.isDirectory()) walk(absolute);
    else if(entry.isFile()){
      const relative=path.relative(stage,absolute).replaceAll('\\','/');
      const hash=crypto.createHash('sha1').update(fs.readFileSync(absolute)).digest('hex');
      files['/'+relative]=hash;
      if(!byHash.has(hash)) byHash.set(hash,relative);
    }
  }
}
walk(stage);
const response=await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`,{
  method:'POST',headers:{...auth,'Content-Type':'application/json'},
  body:JSON.stringify({files,draft:true,title:'20 new Pre-K English and Math lessons'})
});
const deploy=await response.json();
if(!response.ok) throw Error(`Create draft failed: HTTP ${response.status} ${deploy.message||''}`);
console.log(JSON.stringify({id:deploy.id,state:deploy.state,draft:deploy.draft,required:deploy.required?.length,totalFiles:Object.keys(files).length,url:deploy.deploy_ssl_url}));
if(!deploy.id||!(deploy.draft===true||deploy.context==='deploy-preview')) throw Error('Netlify did not create a preview deploy');
for(const hash of deploy.required||[]){
  const relative=byHash.get(hash);
  if(!relative) throw Error(`Required content hash not found: ${hash}`);
  const url=`https://api.netlify.com/api/v1/deploys/${deploy.id}/files/${relative.split('/').map(encodeURIComponent).join('/')}`;
  const upload=await fetch(url,{method:'PUT',headers:{...auth,'Content-Type':'application/octet-stream'},body:fs.readFileSync(path.join(stage,relative))});
  if(!upload.ok) throw Error(`Upload failed for ${relative}: HTTP ${upload.status} ${(await upload.text()).slice(0,200)}`);
}
for(let i=0;i<30;i++){
  const poll=await fetch(`https://api.netlify.com/api/v1/deploys/${deploy.id}`,{headers:auth});
  const current=await poll.json();
  if(!poll.ok) throw Error(`Poll failed: HTTP ${poll.status}`);
  if(current.state==='ready'){console.log(JSON.stringify({id:current.id,state:current.state,draft:current.draft,url:current.deploy_ssl_url}));process.exit(0);}
  if(['error','failed'].includes(current.state))throw Error(`Deploy failed: ${current.error_message||current.state}`);
  await new Promise(resolve=>setTimeout(resolve,2000));
}
throw Error('Draft deploy did not become ready in time');
