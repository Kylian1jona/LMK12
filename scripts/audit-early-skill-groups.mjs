import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=process.argv[2]||path.resolve(import.meta.dirname,'..');
const source=fs.readFileSync(path.join(root,'components/early-sections.js'),'utf8');
const names={
  'kinder-eng':'kinderEnglish',
  'kinder-math':'kinderMath',
  'g1-eng':'g1English',
  'g1-math':'g1Math',
  'g1-sci':'g1Science'
};
class Element{
  constructor(tagName='DIV'){
    this.tagName=tagName.toUpperCase();this.children=[];this.dataset={};this.attributes={};
    this.className='';this.parent=null;this.textContent='';this.id='';
    this.classList={add:(...names)=>{this.className=[...new Set([...this.className.split(' ').filter(Boolean),...names])].join(' ');}};
  }
  appendChild(child){
    if(child.parent) child.parent.children.splice(child.parent.children.indexOf(child),1);
    this.children.push(child);child.parent=this;return child;
  }
  insertBefore(child,before){
    if(child.parent) child.parent.children.splice(child.parent.children.indexOf(child),1);
    const index=before?this.children.indexOf(before):-1;
    if(index<0)this.children.push(child);else this.children.splice(index,0,child);
    child.parent=this;return child;
  }
  remove(){if(this.parent){this.parent.children.splice(this.parent.children.indexOf(this),1);this.parent=null;}}
  append(...children){children.forEach(child=>this.appendChild(child));}
  replaceChild(next,old){
    const index=this.children.indexOf(old);
    if(index<0) throw Error('Old child missing');
    if(next.parent) next.parent.children.splice(next.parent.children.indexOf(next),1);
    this.children[index]=next;next.parent=this;old.parent=null;
  }
  setAttribute(name,value){this.attributes[name]=value;}
  addEventListener(){}
  querySelectorAll(selector){
    if(selector===':scope > .early-lesson-group')return this.children.filter(child=>child.className.split(' ').includes('early-lesson-group'));
    if(selector===':scope > .early-skill-topic')return this.children.filter(child=>child.className.split(' ').includes('early-skill-topic'));
    if(selector==='button[data-lesson-key*="sort-"]')return this.children.flatMap(child=>child.querySelectorAll(selector)).concat(this.tagName==='BUTTON'&&this.dataset.lessonKey?.includes('sort-')?[this]:[]);
    return [];
  }
  querySelector(selector){
    if(selector==='h3'||selector==='p') return this.children[0]?.children.find(child=>child.tagName===selector.toUpperCase())||null;
    if(selector==='.early-lesson-group-cards') return this.children.find(child=>child.className==='early-lesson-group-cards')||null;
    if(selector==='.early-skill-count')return this.children[0]?.children.find(child=>child.className==='early-skill-count')||null;
    return null;
  }
}
const menus=new Map();
for(const id of ['prek-eng','prek-math']){
  const list=new Element(),keys=[];
  for(let groupNumber=0;groupNumber<3;groupNumber++){
    const group=new Element('SECTION');group.className='early-lesson-group';
    const header=new Element('HEADER'),title=new Element('H3'),description=new Element('P');
    title.textContent=`Group ${groupNumber+1}`;description.textContent='Practice these lessons.';
    header.append(title,description);
    const cards=new Element();cards.className='early-lesson-group-cards';
    for(let i=0;i<2;i++){
      const button=new Element('BUTTON');button.dataset.lessonKey=`${id}:${groupNumber}:${i}`;
      keys.push(button.dataset.lessonKey);cards.appendChild(button);
    }
    group.append(header,cards);list.appendChild(group);
  }
  menus.set(id,{list,keys});
}
for(const [id,name] of Object.entries(names)){
  const start=source.indexOf(`const ${name}=[`),end=source.indexOf('].join("");',start);
  if(start<0||end<0) throw Error(`Missing ${name} source`);
  const keys=[...source.slice(start,end).matchAll(/lessonCard\("([^"]+)"/g)].map(match=>match[1]);
  const list=new Element();
  for(const key of keys){const button=new Element('BUTTON');button.dataset.lessonKey=key;list.appendChild(button);}
  menus.set(id,{list,keys});
}
const document={
  readyState:'complete',
  querySelector(selector){return menus.get(selector.match(/^#([^ ]+)/)?.[1])?.list||null;},
  createElement(tag){return new Element(tag);}
};
vm.runInNewContext(fs.readFileSync(path.join(root,'components/k12-early-skill-groups.js'),'utf8'),{document});
for(const [id,{list,keys}] of menus){
  const groups=list.children;
  const buttons=groups.flatMap(group=>group.children[1]?.children||[]);
  const actual=buttons.map(button=>button.dataset.lessonKey);
  if(actual.length!==keys.length||new Set(actual).size!==keys.length||keys.some(key=>!actual.includes(key))) throw Error(`${id}: lesson lost or duplicated`);
  if(groups.length<3||groups.some(group=>group.tagName!=='DETAILS'||!group.children[1]?.children.length)) throw Error(`${id}: invalid groups`);
  if(!groups[0].open||groups.slice(1).some(group=>group.open)) throw Error(`${id}: initial open state incorrect`);
  if(!id.startsWith('prek-')&&groups.some(group=>group.children[0].children[0].textContent==='More Practice')) throw Error(`${id}: uncategorized lessons`);
  console.log(`${id}: ${keys.length} lessons in ${groups.length} skill cards`);
}
