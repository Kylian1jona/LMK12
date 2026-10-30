const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const context=vm.createContext({window:{K12_EARLY_BANKS:Object.create(null)}});
vm.runInContext(fs.readFileSync(path.join(root,'components/k12-g8-special-formats.js'),'utf8'),context);
const banks=context.window.K12_EARLY_BANKS;
const metadata=context.window.K12_G8_SPECIAL_FORMATS;
const failures=[];
const subjects={};
for(const item of metadata){
  subjects[item.subject]=(subjects[item.subject]||0)+1;
  if(!banks[item.key])failures.push(`${item.key}: missing bank`);
}
for(const [key,record] of Object.entries(banks)){
  if(record.questions.length!==25)failures.push(`${key}: expected 25 questions`);
  const sets=new Set();
  record.questions.forEach((q,index)=>{
    const label=`${key} question ${index+1}`;
    if(q.type==='selectall'){
      if(q.choices.length!==6||new Set(q.choices).size!==6||q.answers.length!==2||q.answers.some(value=>!q.choices.includes(value))||q.requiredSelections!==2)failures.push(`${label}: invalid six-choice, two-answer checkbox`);
      if(key.includes('checkbox-expressions')){
        const a=3+index%5,b=8+Math.floor(index/5);
        const value=expression=>Function('return '+expression.replaceAll('x','(2)').replace(/(\d)\(/g,'$1*('))();
        if(q.choices.filter(expression=>value(expression)===a*2+b).length!==2)failures.push(`${label}: not exactly two equivalent expressions`);
      }
    }
    if(q.type==='dropdown'&&(!q.choices.includes(q.answer)||new Set(q.choices).size!==q.choices.length))failures.push(`${label}: invalid dropdown`);
    if(q.type==='drag'&&(q.pairs.length!==4||new Set(q.pairs.map(pair=>pair.word)).size!==4||new Set(q.pairs.map(pair=>pair.match)).size!==4))failures.push(`${label}: invalid matching pairs`);
    if(q.type==='ranking'&&(q.items.length!==5||new Set(q.items).size!==5))failures.push(`${label}: invalid ranking`);
    const signature=JSON.stringify(q.choices||q.pairs||q.items);
    if(sets.has(signature))failures.push(`${label}: repeated answer set`);
    sets.add(signature);
  });
}
if(Object.keys(banks).length!==10)failures.push('Expected ten lessons');
if(['eng','math','alg1','sci','hist'].some(subject=>subjects[subject]!==2))failures.push('Expected two lessons in each subject');
console.log(JSON.stringify({lessons:Object.keys(banks).length,questions:Object.values(banks).reduce((sum,record)=>sum+record.questions.length,0),subjects,failures},null,2));
if(failures.length)process.exitCode=1;
