const fs=require('node:fs');
const https=require('node:https');
const path=require('node:path');
const vm=require('node:vm');

const root=path.resolve(__dirname,'..');
const sources=JSON.parse(fs.readFileSync(path.join(__dirname,'.i18n-sources.json'),'utf8'));
const languages=['es','fr','zh-CN','hi'];

function request(url,retries=3){
  return new Promise((resolve,reject)=>{
    https.get(url,{headers:{'User-Agent':'Mozilla/5.0'}},response=>{
      let body='';response.setEncoding('utf8');response.on('data',chunk=>body+=chunk);
      response.on('end',()=>response.statusCode===200?resolve(body):reject(new Error(`HTTP ${response.statusCode}`)));
    }).on('error',error=>retries?setTimeout(()=>request(url,retries-1).then(resolve,reject),500):reject(error));
  });
}

function batches(items,maxLength=2800){
  const result=[];let batch=[],length=0;
  items.forEach(item=>{if(batch.length&&length+item.length>maxLength){result.push(batch);batch=[];length=0;}batch.push(item);length+=item.length+24;});
  if(batch.length)result.push(batch);return result;
}

async function translateBatch(items,target){
  const input=items.map((item,index)=>index?`ZXQSEP${String(index).padStart(4,'0')}ZXQ\n${item}`:item).join('\n');
  const url=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(input)}`;
  const parsed=JSON.parse(await request(url));
  const output=(parsed[0]||[]).map(part=>part[0]||'').join('').trim();
  const pieces=output.split(/\s*ZXQSEP\d{4}ZXQ\s*/);
  if(pieces.length!==items.length) throw new Error(`Translation batch split failed (${pieces.length}/${items.length})`);
  return pieces.map(value=>value.trim());
}

(async()=>{
  const catalog={};
  const existingPath=path.join(root,'components','k12-i18n-full-page.js');
  if(fs.existsSync(existingPath)){
    vm.runInNewContext(fs.readFileSync(existingPath,'utf8'),{
      window:{k12AddTranslations(entries){Object.assign(catalog,entries);}}
    });
  }
  for(const target of languages){
    const key=target==='zh-CN'?'zh':target;
    const table=catalog[key]||{};
    const pending=sources.filter(source=>!table[source]);
    const groups=batches(pending);
    for(let index=0;index<groups.length;index++){
      const translated=await translateBatch(groups[index],target);
      groups[index].forEach((source,itemIndex)=>table[source]=translated[itemIndex]);
      process.stdout.write(`\r${target}: ${index+1}/${groups.length}`);
    }
    process.stdout.write('\n');catalog[key]=table;
  }
  const output=`/* Generated full-page UI translations. Rebuild with scripts/build-full-page-translations.cjs. */\nwindow.k12AddTranslations(${JSON.stringify(catalog)}, {preserveExisting:true});\n`;
  fs.writeFileSync(path.join(root,'components','k12-i18n-full-page.js'),output);
  console.log(`Wrote ${sources.length} source strings in ${languages.length} languages.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
