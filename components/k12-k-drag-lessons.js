/* Kindergarten sorting: eight lessons, 25 nine-card rounds each. */
(function(){
  const bank=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  const lessons=[
    ['k:eng:sort-short-vowels','Sort Short Vowel Words','Listen for the vowel sound in each word.',[
      ['Short A','cat~hat~map~bag~jam~fan~nap'],
      ['Short E','bed~red~hen~pen~web~jet~leg'],
      ['Short I','pig~sit~fin~lip~pin~wig~zip']]],
    ['k:eng:sort-blends','Sort Beginning Blends','Look at the first two letters.',[
      ['BL','blue~black~block~blink~blank~blow~blush'],
      ['CL','clap~clock~club~clay~clip~clown~climb'],
      ['FL','flag~flip~flat~flap~flower~fly~flame']]],
    ['k:eng:sort-word-families','Sort Word Families','Match each word to its ending.',[
      ['-at','cat~hat~bat~mat~sat~rat~pat'],
      ['-an','can~fan~man~pan~ran~tan~van'],
      ['-ap','cap~map~nap~tap~lap~gap~sap']]],
    ['k:eng:sort-sentence-marks','Sort Sentence Endings','Read each sentence and notice its ending mark.',[
      ['Tells something','The cat is asleep.~I have a red hat.~We went to the park.~The sun is bright.~My dog likes to run.~This book is new.~The cup is full.'],
      ['Asks a question','Where is my hat?~Can you see the bird?~Is it time to go?~Who has the ball?~What is in the box?~Do you like apples?~How old is the pup?'],
      ['Shows excitement','What a big splash!~I found it!~That was amazing!~Hooray for our team!~Look at that rainbow!~We won the game!~Wow, a shooting star!']]],
    ['k:math:sort-sums','Sort Sums to Eight','Find the sum, then place the card.',[
      ['Makes 6','0 + 6~1 + 5~2 + 4~3 + 3~4 + 2~5 + 1~6 + 0'],
      ['Makes 7','0 + 7~1 + 6~2 + 5~3 + 4~4 + 3~5 + 2~6 + 1'],
      ['Makes 8','0 + 8~1 + 7~2 + 6~3 + 5~4 + 4~5 + 3~6 + 2']]],
    ['k:math:sort-differences','Sort Take-Away Answers','Subtract, then place the card.',[
      ['Leaves 2','2 - 0~3 - 1~4 - 2~5 - 3~6 - 4~7 - 5~8 - 6'],
      ['Leaves 3','3 - 0~4 - 1~5 - 2~6 - 3~7 - 4~8 - 5~9 - 6'],
      ['Leaves 4','4 - 0~5 - 1~6 - 2~7 - 3~8 - 4~9 - 5~10 - 6']]],
    ['k:math:sort-number-forms','Sort Four, Five, or Six','Match the numeral, word, tally, or picture count.',[
      ['Four','4~four~||||~●●●●~★★★★~🍎🍎🍎🍎~2 + 2'],
      ['Five','5~five~|||||~●●●●●~★★★★★~🍎🍎🍎🍎🍎~2 + 3'],
      ['Six','6~six~||||||~●●●●●●~★★★★★★~🍎🍎🍎🍎🍎🍎~3 + 3']]],
    ['k:math:sort-solid-shapes','Sort Solid Shapes','Think about the shape of each object.',[
      ['Sphere','soccer ball~basketball~tennis ball~marble~globe~orange~round bead'],
      ['Cube','number die~ice cube~toy block shaped like a cube~cube-shaped gift box~sugar cube~puzzle cube~cube-shaped building block'],
      ['Cylinder','soup can~paper towel tube~drinking glass~candle~battery~crayon barrel~round oatmeal container']]]
  ];
  const triples=[];
  for(let a=0;a<7;a++)for(let b=a+1;b<7;b++)for(let c=b+1;c<7;c++)triples.push([a,b,c]);
  for(const [key,name,prompt,groups] of lessons){
    if(bank[key])throw Error(`Duplicate Kindergarten sorting lesson: ${key}`);
    const categories=groups.map(([label],index)=>({id:`c${index}`,label}));
    const pools=groups.map(([label,source])=>{
      const values=source.split('~');
      if(values.length!==7||new Set(values).size!==7)throw Error(`${key}: ${label} needs seven unique cards`);
      return values;
    });
    const questions=Array.from({length:25},(_,round)=>{
      const options=pools.flatMap((pool,group)=>triples[(round+group*9)%triples.length]
        .map((index,card)=>({id:`q${round}-c${group}-o${card}`,text:pool[index],category:`c${group}`})));
      const rotation=round*4%options.length;
      return {type:'drag',q:`${name}: ${prompt}`,audio:`${name}. ${prompt} Drag or tap each card and choose its group.`,categories,
        options:options.slice(rotation).concat(options.slice(0,rotation)),explain:'Each card belongs in one group.'};
    });
    bank[key]={name,contentVersion:'20261023.1',questions};
  }
})();
