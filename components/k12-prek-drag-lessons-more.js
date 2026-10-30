/* Another ten picture-led Pre-K sorting lessons, 25 nine-card questions each. */
(function(){
  const bank=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  const lessons=[
    ['prek:eng:sort-bdf-sounds','Sort B, D, and F Sounds','Which sound starts the word?',[
      ['B','⚽ ball~🐻 bear~🍌 banana~🚌 bus~🛏️ bed~🎈 balloon~🐦 bird'],
      ['D','🐶 dog~🦆 duck~🥁 drum~🚪 door~🐬 dolphin~🍩 doughnut~🐲 dragon'],
      ['F','🐟 fish~🐸 frog~🔥 fire~🌼 flower~🪭 fan~🍴 fork~🦊 fox']]],
    ['prek:eng:sort-syllables','Clap Word Beats','One, two, or three beats?',[
      ['One beat','🐱 cat~🐶 dog~☀️ sun~🐟 fish~⚽ ball~🌳 tree~🥛 milk'],
      ['Two beats','🍎 apple~🐰 rabbit~🐢 turtle~🍪 cookie~✏️ pencil~🍕 pizza~🌈 rainbow'],
      ['Three beats','🍌 banana~🐘 elephant~🦋 butterfly~☂️ umbrella~🦕 dinosaur~💻 computer~🍅 tomato']]],
    ['prek:eng:sort-living-things','Sort Living Things','Animal, plant, or object?',[
      ['Animal','🐶 dog~🐱 cat~🐟 fish~🦋 butterfly~🐻 bear~🐢 turtle~🐦 bird'],
      ['Plant','🌳 tree~🌻 sunflower~🌵 cactus~🌷 tulip~🌱 sprout~🌿 herb~🌲 pine tree'],
      ['Object','🚗 car~⚽ ball~📘 book~🪑 chair~🧸 toy bear~🥄 spoon~🧱 brick']]],
    ['prek:eng:sort-feelings','Sort Feeling Faces','Happy, sad, or scared?',[
      ['Happy','😄 smiling face~😃 big smile~😊 gentle smile~🙂 small smile~🥰 loving smile~😁 toothy smile~😀 happy grin'],
      ['Sad','😢 tearful face~😭 crying face~🙁 unhappy face~😞 disappointed face~😔 downcast face~😿 crying cat~☹️ frowning face'],
      ['Scared','😨 frightened face~😱 screaming face~😰 worried face with sweat~😧 shocked face~🙀 scared cat~😟 worried face~😳 startled face']]],
    ['prek:eng:sort-places','Sort Everyday Places','Home, school, or playground?',[
      ['Home','🛏️ bed~🛋️ couch~🛁 bathtub~📺 television~🍳 kitchen pan~🪥 toothbrush~🚪 front door'],
      ['School','✏️ pencil~📚 books~🎒 backpack~🖍️ crayons~📓 notebook~📏 ruler~🧴 glue bottle'],
      ['Playground','🛝 slide~⚽ soccer ball~🪁 kite~🛴 scooter~🏀 basketball~🥅 goal~🪜 climbing ladder']]],

    ['prek:math:sort-colors','Sort Color Pictures','Red, blue, or yellow?',[
      ['Red','🍎 red apple~❤️ red heart~🟥 red square~🔴 red circle~🍓 strawberry~🚒 fire truck~🌹 red rose'],
      ['Blue','🫐 blueberries~🟦 blue square~🔵 blue circle~🌊 blue wave~🐋 blue whale~🧢 blue cap~💙 blue heart'],
      ['Yellow','🍌 banana~🍋 lemon~🟨 yellow square~🟡 yellow circle~🌻 sunflower~⭐ yellow star~🐥 yellow chick']]],
    ['prek:math:sort-count-4-6','Count Four, Five, or Six','How many pictures are there?',[
      ['Four','⭐⭐⭐⭐~🍎🍎🍎🍎~🔵🔵🔵🔵~🐶🐶🐶🐶~🌼🌼🌼🌼~🚗🚗🚗🚗~🧸🧸🧸🧸'],
      ['Five','⭐⭐⭐⭐⭐~🍎🍎🍎🍎🍎~🔵🔵🔵🔵🔵~🐶🐶🐶🐶🐶~🌼🌼🌼🌼🌼~🚗🚗🚗🚗🚗~🧸🧸🧸🧸🧸'],
      ['Six','⭐⭐⭐⭐⭐⭐~🍎🍎🍎🍎🍎🍎~🔵🔵🔵🔵🔵🔵~🐶🐶🐶🐶🐶🐶~🌼🌼🌼🌼🌼🌼~🚗🚗🚗🚗🚗🚗~🧸🧸🧸🧸🧸🧸']]],
    ['prek:math:sort-number-forms','Sort Number Forms','One, two, or three?',[
      ['One','1~one~⚀ one dot~| one tally~☝️ one finger~● one circle~🐶 one dog'],
      ['Two','2~two~⚁ two dots~|| two tallies~✌️ two fingers~●● two circles~🐶🐶 two dogs'],
      ['Three','3~three~⚂ three dots~||| three tallies~☝️☝️☝️ three fingers~●●● three circles~🐶🐶🐶 three dogs']]],
    ['prek:math:sort-corners','Sort Shape Corners','No corners, three, or four?',[
      ['No corners','🔴 red circle~🟠 orange circle~🟡 yellow circle~🟢 green circle~🔵 blue circle~🟣 purple circle~⚫ black circle'],
      ['Three corners','▲ solid triangle~△ outline triangle~▼ down triangle~▽ outline down triangle~◀ left triangle~▶ right triangle~🔺 red triangle'],
      ['Four corners','🟥 red square~🟧 orange square~🟨 yellow square~🟩 green square~🟦 blue square~🟪 purple square~⬛ black square']]],
    ['prek:math:sort-group-changes','Sort Group Changes','Add, take away, or stay the same?',[
      ['Add','🍎🍎 + 🍎~⭐⭐ + ⭐~🔵🔵 + 🔵~🐶🐶 + 🐶~🌼🌼 + 🌼~🚗🚗 + 🚗~🧸🧸 + 🧸'],
      ['Take away','🍎🍎🍎 − 🍎~⭐⭐⭐ − ⭐~🔵🔵🔵 − 🔵~🐶🐶🐶 − 🐶~🌼🌼🌼 − 🌼~🚗🚗🚗 − 🚗~🧸🧸🧸 − 🧸'],
      ['Stay the same','🍎🍎 = 🍎🍎~⭐⭐ = ⭐⭐~🔵🔵 = 🔵🔵~🐶🐶 = 🐶🐶~🌼🌼 = 🌼🌼~🚗🚗 = 🚗🚗~🧸🧸 = 🧸🧸']]]
  ];
  const triples=[];
  for(let a=0;a<7;a++)for(let b=a+1;b<7;b++)for(let c=b+1;c<7;c++)triples.push([a,b,c]);
  for(const [key,name,prompt,groups] of lessons){
    if(bank[key])throw Error(`Duplicate Pre-K sorting lesson: ${key}`);
    const categories=groups.map(([label],i)=>({id:`c${i}`,label}));
    const questions=Array.from({length:25},(_,round)=>{
      const options=groups.flatMap(([,source],group)=>{
        const pool=source.split('~');
        if(pool.length!==7)throw Error(`${name} needs seven pictures in category ${group}`);
        return triples[(round+group*9)%triples.length].map((i,card)=>({id:`q${round}-c${group}-o${card}`,text:pool[i],category:`c${group}`}));
      });
      const rotation=round*4%options.length;
      return {type:'drag',q:`${name}: ${prompt}`,audio:`${name}. ${prompt} Drag a picture or tap it, then choose where it belongs.`,categories,options:options.slice(rotation).concat(options.slice(0,rotation)),explain:'Each picture belongs in one group.'};
    });
    bank[key]={name,contentVersion:'20261021.2',questions};
  }
})();
