/* Picture-led Pre-K sorting: 10 lessons with 25 nine-card questions each. */
(function(){
  const bank=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  const lessons=[
    ['prek:eng:sort-animal-homes','Sort Animals by Home','Farm, ocean, or forest?',[
      ['Farm','🐄 cow~🐖 pig~🐓 rooster~🐑 sheep~🐎 horse~🐐 goat~🦆 duck'],
      ['Ocean','🐠 fish~🐬 dolphin~🐙 octopus~🦀 crab~🐳 whale~🦈 shark~🪼 jellyfish'],
      ['Forest','🦊 fox~🦉 owl~🐿️ squirrel~🦌 deer~🐻 bear~🐇 rabbit~🦔 hedgehog']]],
    ['prek:eng:sort-foods','Sort Foods and Drinks','Fruit, vegetable, or drink?',[
      ['Fruit','🍎 apple~🍌 banana~🍇 grapes~🍓 strawberry~🍍 pineapple~🍐 pear~🍉 watermelon'],
      ['Vegetable','🥕 carrot~🌽 corn~🥦 broccoli~🥬 lettuce~🥔 potato~🫑 pepper~🍆 eggplant'],
      ['Drink','🥛 milk~🧃 juice~💧 water~🍼 milk bottle~☕ hot cocoa~🥤 smoothie~🍵 tea']]],
    ['prek:eng:sort-weather','Sort Weather Pictures','Sunny, rainy, or snowy?',[
      ['Sunny','☀️ sun~🌞 sunshine~🕶️ sunglasses~🧢 sun hat~🏖️ sunny beach~🌻 sunflower~🧴 sunscreen'],
      ['Rainy','🌧️ rain cloud~☔ umbrella~🌂 closed umbrella~💧 raindrop~🥾 rain boots~🧥 raincoat~🌈 rainbow after rain'],
      ['Snowy','❄️ snowflake~☃️ snowman~⛄ snowy snowman~🧤 mittens~🧣 scarf~🛷 sled~🏔️ snow mountain']]],
    ['prek:eng:sort-first-sounds','Sort First Sounds','M, S, or T at the start?',[
      ['M','🐒 monkey~🌙 moon~🥛 milk~🗺️ map~🎵 music~🐭 mouse~🍈 melon'],
      ['S','☀️ sun~🧦 sock~🐍 snake~⭐ star~🥪 sandwich~🧼 soap~🐌 snail'],
      ['T','🐯 tiger~🌳 tree~🚂 train~🐢 turtle~🍅 tomato~🦷 tooth~⛺ tent']]],
    ['prek:eng:sort-everyday-things','Sort Everyday Things','Wear it, eat it, or ride it?',[
      ['Wear it','👕 shirt~👗 dress~🧢 hat~🧤 mitten~🧦 sock~👟 shoe~🧥 coat'],
      ['Eat it','🍞 bread~🧀 cheese~🍪 cookie~🍎 apple~🍚 rice~🍕 pizza~🍉 watermelon'],
      ['Ride it','🚗 car~🚌 bus~🚲 bike~🚂 train~✈️ airplane~🚤 boat~🛴 scooter']]],

    ['prek:math:sort-shapes','Sort Shapes','Circle, square, or triangle?',[
      ['Circle','🔴 red circle~🟠 orange circle~🟡 yellow circle~🟢 green circle~🔵 blue circle~🟣 purple circle~⚫ black circle'],
      ['Square','🟥 red square~🟧 orange square~🟨 yellow square~🟩 green square~🟦 blue square~🟪 purple square~⬛ black square'],
      ['Triangle','▲ solid triangle~△ outline triangle~▼ down triangle~▽ outline down triangle~◀ left triangle~▶ right triangle~🔺 red triangle']]],
    ['prek:math:sort-count-1-3','Count the Pictures','One, two, or three?',[
      ['One','🐶~🍎~⭐~🚗~🟦~🧸~🌼'],
      ['Two','🐶🐶~🍎🍎~⭐⭐~🚗🚗~🟦🟦~🧸🧸~🌼🌼'],
      ['Three','🐶🐶🐶~🍎🍎🍎~⭐⭐⭐~🚗🚗🚗~🟦🟦🟦~🧸🧸🧸~🌼🌼🌼']]],
    ['prek:math:sort-patterns','Sort Repeating Patterns','AB, AAB, or ABB?',[
      ['AB','🔴🔵🔴🔵~🟡🟢🟡🟢~🟣🟠🟣🟠~⭐❤️⭐❤️~🐱🐶🐱🐶~🍎🍐🍎🍐~⚫⚪⚫⚪'],
      ['AAB','🔴🔴🔵🔴🔴🔵~🟡🟡🟢🟡🟡🟢~🟣🟣🟠🟣🟣🟠~⭐⭐❤️⭐⭐❤️~🐱🐱🐶🐱🐱🐶~🍎🍎🍐🍎🍎🍐~⚫⚫⚪⚫⚫⚪'],
      ['ABB','🔴🔵🔵🔴🔵🔵~🟡🟢🟢🟡🟢🟢~🟣🟠🟠🟣🟠🟠~⭐❤️❤️⭐❤️❤️~🐱🐶🐶🐱🐶🐶~🍎🍐🍐🍎🍐🍐~⚫⚪⚪⚫⚪⚪']]],
    ['prek:math:sort-small-sums','Sort Small Sums','Does it make 3, 4, or 5?',[
      ['3','1 + 2~2 + 1~3 + 0~0 + 3~● + ●●~●● + ●~●●● + 0'],
      ['4','1 + 3~3 + 1~2 + 2~4 + 0~0 + 4~● + ●●●~●● + ●●'],
      ['5','1 + 4~4 + 1~2 + 3~3 + 2~5 + 0~0 + 5~●● + ●●●']]],
    ['prek:math:sort-more-less-same','Compare Two Groups','Left has more, right has more, or same?',[
      ['Left has more','🔵🔵 | 🔵~🔵🔵🔵 | 🔵~🔵🔵🔵 | 🔵🔵~🔵🔵🔵🔵 | 🔵~🔵🔵🔵🔵 | 🔵🔵~🔵🔵🔵🔵 | 🔵🔵🔵~🔵🔵🔵🔵🔵 | 🔵'],
      ['Right has more','🔵 | 🔵🔵~🔵 | 🔵🔵🔵~🔵🔵 | 🔵🔵🔵~🔵 | 🔵🔵🔵🔵~🔵🔵 | 🔵🔵🔵🔵~🔵🔵🔵 | 🔵🔵🔵🔵~🔵 | 🔵🔵🔵🔵🔵'],
      ['Same','🔵 | 🔵~🔵🔵 | 🔵🔵~🔵🔵🔵 | 🔵🔵🔵~🔵🔵🔵🔵 | 🔵🔵🔵🔵~🔵🔵🔵🔵🔵 | 🔵🔵🔵🔵🔵~⭐⭐ | ⭐⭐~🍎🍎🍎 | 🍎🍎🍎']]]
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
    bank[key]={name,contentVersion:'20261021.1',questions};
  }
})();
