// Build a clean publish directory containing only browser assets, never workspace backups.
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const stage=fs.mkdtempSync(path.join(os.tmpdir(),'learnmaster-publish-'));
for(const name of ['index.html','k12.css','k12.js','_headers']){
  fs.copyFileSync(path.join(root,name),path.join(stage,name));
}
for(const name of ['components','images','draft-media']){
  const source=path.join(root,name);
  if(fs.existsSync(source))fs.cpSync(source,path.join(stage,name),{recursive:true});
}
console.log(stage);
