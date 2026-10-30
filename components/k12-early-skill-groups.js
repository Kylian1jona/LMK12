(function(){
  const plans={
    'kinder-eng':[
      ['Letters & Sounds','Listen for sounds and match letters.','syllables rhymes alphabet-upper alphabet-lower ending-sounds'],
      ['Vowel Sounds','Read short vowels and changing vowel patterns.','short-a short-e short-i short-o short-u short-vowels silent-e'],
      ['Build Words','Blend sounds and find word families.','words blend-cvc digraph-sh digraph-ch digraph-th initial-blends word-families'],
      ['Read Sentences','Use words, punctuation, and story clues.','days-week word-spaces sentence-start question-words story-order sentence-endings opposites action-words sentence-meaning pyramid-reading']
    ],
    'kinder-math':[
      ['Numbers & Counting','Count, order, and recognize numbers.','counting count20 forwardback10 missing-number teen-numbers backward20 rows-count order10 subitize ordinal-positions'],
      ['Compare & Pattern','Compare amounts and find patterns.','compare20 patterns compare-groups'],
      ['Add & Subtract','Put numbers together and take them apart.','addition take-apart20 subtraction make-ten story-add story-sub number-bonds'],
      ['Shapes','Find shapes and describe their features.','circles triangles squares all-shapes shape-attributes'],
      ['Measure & Explore','Practice measurement, time, and graphs.','measurement time time-seasons length-units picture-graphs']
    ],
    'g1-eng':[
      ['Sounds & Spelling','Read vowel patterns and build words.','short-vowels long-vowels compound-words plurals blend-st vowel-teams'],
      ['Sentences & Grammar','Choose words and build complete sentences.','sight sentences parts-speech'],
      ['Reading Stories','Read short passages and use clues.','story-questions reading-clues pyramid-reading']
    ],
    'g1-math':[
      ['Hands-On Math','Explore numbers with blocks, lines, and shapes.','block-add number-line-lab fraction-builder'],
      ['Counting & Place Value','Count, compare, and use tens and ones.','count100 skip2 skip5 skip10 compare place-value ten-more add-tens-ones number-neighbors'],
      ['Addition Strategies','Build sums and solve addition stories.','add10 add20 missing-addend doubles equal-groups fact-families make10-strategy number-bonds addition-stories'],
      ['Subtraction','Take away and solve subtraction stories.','sub10 sub20 subtract-through10 subtraction-stories'],
      ['Shapes & Everyday Math','Use shapes, measurement, time, money, and graphs.','shape-properties measurement time money picture-graphs coin-totals']
    ],
    'g1-sci':[
      ['Living Things','Explore plants, animals, and their needs.','living-things plants animals plant-records animal-coverings animal-young'],
      ['Earth & Weather','Observe the sky, water, and weather safety.','weather day-night care-earth water-changes weather-safety'],
      ['Materials & Motion','Test materials, light, sound, and movement.','materials light-sound-motion five-senses push-pull shadow-tests magnet-test']
    ]
  };

  function disclosure(id,title,description,cards,index){
    const details=document.createElement('details');
    details.className='early-skill-topic';
    details.name=`${id}-skills`;
    details.open=index===0;
    const summary=document.createElement('summary');
    summary.className='early-skill-summary';
    const label=document.createElement('strong');
    label.className='early-skill-title';
    label.textContent=title;
    const copy=document.createElement('small');
    copy.className='early-skill-description';
    copy.textContent=description;
    const count=document.createElement('span');
    count.className='early-skill-count';
    count.textContent=`${cards.children.length} lessons`;
    summary.append(label,copy,count);
    details.append(summary,cards);
    details.addEventListener('toggle',()=>{
      if(details.open) details.parentElement.querySelectorAll(':scope > .early-skill-topic[open]').forEach(other=>{if(other!==details) other.open=false;});
    });
    return details;
  }

  function blendSorting(list,id){
    const groups=[...list.querySelectorAll(':scope > .early-skill-topic')];
    const target={
      'prek-eng':{'animal-homes':2,foods:2,weather:2,'first-sounds':1,'everyday-things':0,'bdf-sounds':1,syllables:1,'living-things':2,feelings:0,places:2},
      'prek-math':{shapes:0,'count-1-3':0,patterns:1,'small-sums':0,'more-less-same':1,colors:0,'count-4-6':0,'number-forms':0,corners:0,'group-changes':1},
      'kinder-eng':{'short-vowels':1,blends:2,'word-families':2,'sentence-marks':3},
      'kinder-math':{sums:2,differences:2,'number-forms':0,'solid-shapes':3}
    }[id];
    if(!target) return;
    for(const button of [...list.querySelectorAll('button[data-lesson-key*="sort-"]')]){
      const suffix=(button.dataset.lessonKey||'').split(':sort-')[1];
      const index=target[suffix];
      const cards=groups[index]?.querySelector('.early-lesson-group-cards');
      if(!cards) continue;
      const hash=[...button.dataset.lessonKey].reduce((value,char)=>((value*31+char.charCodeAt(0))>>>0),17);
      const siblings=[...cards.children];
      cards.insertBefore(button,siblings[hash%(siblings.length+1)]||null);
    }
    for(const group of groups){
      const count=group.querySelector('.early-lesson-group-cards')?.children.length||0;
      if(!count) group.remove();
      else group.querySelector('.early-skill-count').textContent=`${count} lessons`;
    }
  }

  function groupMenu(id){
    const list=document.querySelector(`#${id} .early-lesson-list`);
    if(!list||list.dataset.skillGroups==='true') return;
    list.dataset.skillGroups='true';
    list.classList.add('lesson-columns','early-skill-columns');
    const existing=list.querySelectorAll(':scope > .early-lesson-group');
    if(existing.length){
      existing.forEach((group,index)=>{
        const cards=group.querySelector('.early-lesson-group-cards');
        const title=group.querySelector('h3')?.textContent||'Lessons';
        const description=group.querySelector('p')?.textContent||'';
        if(cards) list.replaceChild(disclosure(id,title,description,cards,index),group);
      });
      blendSorting(list,id);
      return;
    }
    const buttons=[...list.children].filter(node=>node.tagName==='BUTTON');
    const used=new Set();
    function addGroup(title,description,items,index){
      if(!items.length) return;
      const cards=document.createElement('div');
      cards.className='early-lesson-group-cards';
      items.forEach(button=>{used.add(button);cards.appendChild(button);});
      list.appendChild(disclosure(id,title,description,cards,index));
    }
    (plans[id]||[]).forEach(([title,description,keys],index)=>{
      const allowed=new Set(keys.split(' '));
      const items=buttons.filter(button=>{
        if(used.has(button)) return false;
        const key=button.dataset.lessonKey||'';
        const suffix=key.split(':').at(-1);
        return allowed.has(suffix)||(allowed.has('sort-*')&&suffix.startsWith('sort-'));
      });
      addGroup(title,description,items,index);
    });
    addGroup('More Practice','More ways to keep learning.',buttons.filter(button=>!used.has(button)),(plans[id]||[]).length);
    blendSorting(list,id);
  }
  function init(){
    for(const id of ['prek-eng','prek-math',...Object.keys(plans)]) groupMenu(id);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
