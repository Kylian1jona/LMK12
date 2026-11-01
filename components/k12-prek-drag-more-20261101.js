/* Four picture sorting lessons with 25 nine-card rounds apiece. */
(function(){
  const bank=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  const lessons=[
    ['prek:eng:sort-lrn-sounds','Listen for L, R, and N','Which letter starts the picture word?',[
      ['L','🦁 lion~🍋 lemon~🍃 leaf~🪜 ladder~💡 lamp~🦎 lizard~🔒 lock'],
      ['R','🌈 rainbow~🐇 rabbit~🤖 robot~💍 ring~🚀 rocket~🌹 rose~🛣️ road'],
      ['N','👃 nose~🪺 nest~🥜 nut~📓 notebook~🕸️ net~📰 newspaper~👩‍⚕️ nurse']]],
    ['prek:eng:sort-story-places','Places in Stories','Home, school, or park?',[
      ['Home','🛏️ bedroom~🛋️ couch~🛁 bathtub~🍳 kitchen~🪥 toothbrush~📺 television~🧺 laundry'],
      ['School','🎒 classroom backpack~✏️ pencil desk~📚 school books~🖍️ crayons~📓 notebook~📏 ruler~🧑‍🏫 teacher'],
      ['Park','🛝 slide~🪁 kite~🌳 park tree~⚽ soccer field~🚲 bike path~🪑 park bench~🌻 garden path']]],
    ['prek:math:sort-seven-nine','Count Bigger Groups','Seven, eight, or nine pictures?',[
      ['Seven','⭐⭐⭐⭐⭐⭐⭐~🍎🍎🍎🍎🍎🍎🍎~🐟🐟🐟🐟🐟🐟🐟~⚽⚽⚽⚽⚽⚽⚽~🌼🌼🌼🌼🌼🌼🌼~🔵🔵🔵🔵🔵🔵🔵~🐱🐱🐱🐱🐱🐱🐱'],
      ['Eight','⭐⭐⭐⭐⭐⭐⭐⭐~🍎🍎🍎🍎🍎🍎🍎🍎~🐟🐟🐟🐟🐟🐟🐟🐟~⚽⚽⚽⚽⚽⚽⚽⚽~🌼🌼🌼🌼🌼🌼🌼🌼~🔵🔵🔵🔵🔵🔵🔵🔵~🐱🐱🐱🐱🐱🐱🐱🐱'],
      ['Nine','⭐⭐⭐⭐⭐⭐⭐⭐⭐~🍎🍎🍎🍎🍎🍎🍎🍎🍎~🐟🐟🐟🐟🐟🐟🐟🐟🐟~⚽⚽⚽⚽⚽⚽⚽⚽⚽~🌼🌼🌼🌼🌼🌼🌼🌼🌼~🔵🔵🔵🔵🔵🔵🔵🔵🔵~🐱🐱🐱🐱🐱🐱🐱🐱🐱']]],
    ['prek:math:sort-lengths','Compare Lengths','Short, medium, or long?',[
      ['Short','━ red line~━━ blue line~╴ little line~🚗 small car~✏️ short pencil~🪵 tiny log~🧵 short string'],
      ['Medium','━━━━ red line~━━━━━ blue line~──── line~🚙 medium car~✏️ medium pencil~🪵 medium log~🧵 medium string'],
      ['Long','━━━━━━━━ red line~━━━━━━━━━ blue line~──────── line~🚌 long bus~✏️ long pencil~🪵 long log~🧵 long string']]]
  ];
  const triples=[];
  for(let a=0;a<7;a++)for(let b=a+1;b<7;b++)for(let c=b+1;c<7;c++)triples.push([a,b,c]);
  for(const [key,name,prompt,groups] of lessons){
    if(bank[key])throw Error(`Duplicate Pre-K sorting lesson: ${key}`);
    const categories=groups.map(([label],i)=>({id:`c${i}`,label}));
    const questions=Array.from({length:25},(_,round)=>{
      const options=groups.flatMap(([,source],group)=>{
        const pool=source.split('~');
        if(pool.length!==7)throw Error(`${name} needs seven cards in each category`);
        return triples[(round+group*9)%triples.length].map((i,card)=>({id:`q${round}-c${group}-o${card}`,text:pool[i],category:`c${group}`}));
      });
      const rotation=round*4%options.length;
      return {type:'drag',q:`${name}: ${prompt}`,audio:`${name}. ${prompt} Drag or tap each picture and choose its group.`,categories,options:options.slice(rotation).concat(options.slice(0,rotation)),explain:'Look at each picture and choose its group.'};
    });
    bank[key]={name,contentVersion:'20261101.1',questions};
  }
})();
