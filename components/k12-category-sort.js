(function(){
  let selected=null;
  const root=()=>document.querySelector('#lessonExtra .category-sort');
  const cards=()=>[...root().querySelectorAll('.sort-card')];
  function update(){
    const board=root();
    if(!board) return;
    const count=cards().filter(card=>card.dataset.placed).length;
    board.querySelector('.sort-progress').textContent=`${count} of ${board.dataset.total} placed`;
    board.querySelectorAll('.sort-zone').forEach(zone=>{
      zone.querySelector('.sort-count').textContent=String(zone.querySelectorAll('.sort-card').length);
    });
  }
  function move(card,target){
    if(!card||!target||!root()||root().classList.contains('is-checked')) return;
    target.querySelector('.sort-cards').appendChild(card);
    card.dataset.placed=target.dataset.category||'';
    card.setAttribute('aria-label',`${card.dataset.text}. ${card.dataset.placed||'Options tray'}`);
    card.classList.remove('is-selected');
    selected=null;
    update();
  }
  function render(q){
    const host=document.getElementById('lessonExtra');
    if(!host) return;
    selected=null;
    const board=document.createElement('section');
    board.className='category-sort';
    board.dataset.total=String(q.items.length);
    board.setAttribute('aria-label','Category sorting activity');
    board.innerHTML=`<p class="sort-directions">Drag a card into a category, or select a card and then select a category. You can move cards again before checking.</p><div class="sort-progress" role="status" aria-live="polite">0 of ${q.items.length} placed</div><div class="sort-tray sort-zone" data-category=""><button type="button" class="sort-zone-target">Options tray <span class="sort-count">${q.items.length}</span></button><div class="sort-cards"></div></div><div class="sort-categories"></div>`;
    host.appendChild(board);
    const tray=board.querySelector('.sort-tray');
    q.categories.forEach(category=>{
      const zone=document.createElement('div');
      zone.className='sort-zone';
      zone.dataset.category=category.name;
      const heading=document.createElement('button');
      heading.type='button';
      heading.className='sort-zone-target';
      heading.textContent=category.name;
      const count=document.createElement('span');
      count.className='sort-count';
      count.textContent='0';
      heading.appendChild(count);
      const container=document.createElement('div');
      container.className='sort-cards';
      zone.append(heading,container);
      board.querySelector('.sort-categories').appendChild(zone);
    });
    board.querySelectorAll('.sort-zone').forEach(zone=>{
      zone.querySelector('.sort-zone-target').addEventListener('click',()=>move(selected,zone));
      zone.addEventListener('dragover',event=>event.preventDefault());
      zone.addEventListener('drop',event=>{
        event.preventDefault();
        const card=board.querySelector(`.sort-card[data-id="${event.dataTransfer.getData('text/plain')}"]`);
        move(card,zone);
      });
    });
    q.items.forEach((item,index)=>{
      const card=document.createElement('button');
      card.type='button';
      card.className='sort-card';
      card.draggable=true;
      card.dataset.id=String(index);
      card.dataset.text=item.text;
      card.dataset.placed='';
      card.textContent=item.text;
      card.setAttribute('aria-label',`${item.text}. Options tray`);
      card.addEventListener('click',()=>{
        if(board.classList.contains('is-checked')) return;
        if(selected) selected.classList.remove('is-selected');
        selected=selected===card?null:card;
        card.classList.toggle('is-selected',selected===card);
      });
      card.addEventListener('dragstart',event=>event.dataTransfer.setData('text/plain',String(index)));
      tray.querySelector('.sort-cards').appendChild(card);
    });
    document.getElementById('lrCheckBtn')?.classList.remove('d-none');
    update();
  }
  function check(q){
    const placements={};
    cards().forEach(card=>placements[card.dataset.id]=card.dataset.placed||'');
    const placed=Object.values(placements).filter(Boolean).length;
    if(placed<q.items.length){
      document.getElementById('lrFb').textContent=`Place all ${q.items.length} cards before checking. ${q.items.length-placed} remaining.`;
      return null;
    }
    return {placements,placed,correct:q.items.every((item,index)=>placements[index]===item.category)};
  }
  function showCorrections(q,placements){
    const board=root();
    if(!board) return;
    board.classList.add('is-checked');
    cards().forEach(card=>{
      const expected=q.items[Number(card.dataset.id)].category;
      const correct=placements[card.dataset.id]===expected;
      card.classList.add(correct?'is-correct':'is-wrong');
      if(!correct){
        const hint=document.createElement('small');
        hint.textContent=`Correct: ${expected}`;
        card.appendChild(hint);
      }
      card.disabled=true;
      card.draggable=false;
    });
    board.querySelectorAll('.sort-zone-target').forEach(button=>button.disabled=true);
  }
  function restore(q,placements){
    const board=root();
    if(!board) return;
    Object.entries(placements).forEach(([id,category])=>{
      const card=board.querySelector(`.sort-card[data-id="${id}"]`);
      const zone=[...board.querySelectorAll('.sort-zone')].find(item=>item.dataset.category===category);
      if(card&&zone) move(card,zone);
    });
    showCorrections(q,placements);
    update();
  }
  window.K12CategorySort={render,check,showCorrections,restore};
})();
