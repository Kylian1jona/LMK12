const base=process.argv[2];
if(!base)throw Error('Deploy URL required');
async function read(name){const url=new URL(name,base);const response=await fetch(url);if(!response.ok)throw Error(`${name}: HTTP ${response.status}`);return response.text();}
const [html,activity,css,menu,grade5,log]=await Promise.all(['index.html','components/k12-reading-pyramids.js','components/k12-reading-pyramids.css','components/early-sections.js','components/k12-g5-connections-20261029.js','components/auth-shell.js'].map(read));
for(const fragment of ['k12-reading-pyramids.js?v=20261029.1','k12-reading-pyramids.css?v=20261029.1','k12-g5-connections-20261029.js?v=20261029.2'])if(!html.includes(fragment))throw Error(`HTML missing ${fragment}`);
if(!activity.includes('openReadingPyramid')||!activity.includes('data-action="check"'))throw Error('Reading activity incomplete');
if(!css.includes('.rp-pyramid'))throw Error('Pyramid styling missing');
if(!menu.includes('pyramidCard("k"')||!menu.includes('pyramidCard("g1"'))throw Error('English lesson cards missing');
if(grade5.includes('Solve both Grade 5 prompts')||!grade5.includes("type:'fill'"))throw Error('Grade 5 question changes missing');
if(!log.includes('Reading pyramids and more ways to answer'))throw Error('Update log entry missing');
console.log(`PASS: ${base} serves the new lessons, formats, styling, and update log`);
