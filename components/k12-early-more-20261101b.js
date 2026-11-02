/* A second set of sixty 25-question lessons for Pre-K, K, and Grade 1. */
(function(){
  const banks=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  const added=[];
  const sources=new Map();
  const turn=(values,index)=>values.slice(index%values.length).concat(values.slice(0,index%values.length));
  function add(key,name,questions){
    if(banks[key]||questions.length!==25)throw Error(`Invalid early lesson: ${key}`);
    banks[key]={name,contentVersion:'20261101.3',questions};added.push(key);
  }
  function classify(key,name,prompt,groups){
    if(groups.length!==3||groups.some(([,items])=>items.split('~').length!==5))throw Error(`Invalid groups: ${key}`);
    sources.set(key,groups);
    const labels=groups.map(([label])=>label);
    add(key,name,Array.from({length:25},(_,i)=>{
      const category=i%3,pool=groups[category][1].split('~'),example=pool[Math.floor(i/3)%5];
      const q=i<15?`${prompt} ${example}?`:`What group matches both ${example} and ${pool[(Math.floor(i/3)+2)%5]}?`;
      return {type:i%7===6&&!key.startsWith('prek:')?'dropdown':'mc',q,audio:q,choices:turn(labels,i%3),answer:labels[category],explain:`${example} matches ${labels[category]}.`};
    }));
  }
  function numeric(key,name,make,{min=0,max=50}={}){
    add(key,name,Array.from({length:25},(_,i)=>{
      const {q,answer}=make(i,Math.floor(i/5),i%5),value=Number(answer);
      const choices=[String(value)];
      for(const delta of [1,-1,2,-2,3,-3,4,-4,5,-5]){
        const other=value+delta;
        if(other>=min&&other<=max&&!choices.includes(String(other)))choices.push(String(other));
        if(choices.length===4)break;
      }
      if(choices.length!==4)throw Error(`Invalid choices: ${key} ${i}`);
      return {type:i%7===6&&!key.startsWith('prek:')?'dropdown':'mc',q,audio:q,choices:turn(choices,i%4),answer:String(value),explain:`The answer is ${value}.`};
    }));
  }
  const things=['🍎 apples','🧸 toys','🐠 fish','🌼 flowers','⚽ balls'];
  const icons=['🍎','🧸','🐠','🌼','⚽'];

  // Pre-K English: new letter, sound, rhyme, and picture themes.
  add('prek:eng:again-letter-order','Find the Next Letter',Array.from({length:25},(_,i)=>{
    const current='ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i],answer='ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i+1];
    const choices=turn([answer,'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[(i+3)%26],'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[(i+7)%26]],i%3);
    const q=`What letter comes after ${current} in the alphabet?`;
    return {type:'mc',q,audio:q,choices,answer,explain:`${answer} comes after ${current}.`};
  }));
  classify('prek:eng:again-gln-sounds','G, L, and N Sounds','Which first letter sound begins',[
    ['G','🐐 goat~🎁 gift~🍇 grapes~🥅 goal~👧 girl'],
    ['L','🦁 lion~🍋 lemon~🍃 leaf~💡 lamp~🦎 lizard'],
    ['N','👃 nose~🪺 nest~🥜 nut~📓 notebook~📰 newspaper']]);
  classify('prek:eng:again-ending-sounds','M, S, and D Endings','Which last letter sound ends',[
    ['M','🥁 drum~🍦 cream~🌴 palm~🏊 swim~🐑 lamb'],
    ['S','🚌 bus~🍚 rice~🏠 house~🐭 mouse~🧃 juice'],
    ['D','🛏️ bed~🐦 bird~🖐️ hand~🌱 seed~🛣️ road']]);
  classify('prek:eng:again-rhyming-words','More Rhyming Words','Which word ending rhymes with',[
    ['-en','🐔 hen~🖊️ pen~🔟 ten~🕳️ den~👨 men'],
    ['-it','🪑 sit~🧤 mitt~🧰 kit~💡 lit~🧶 knit'],
    ['-op','🐇 hop~🧹 mop~🔝 top~🛑 stop~🍭 pop']]);
  classify('prek:eng:again-word-beats','Clap More Word Beats','How many beats do you hear in',[
    ['One','cat~dog~sun~fish~ball'],
    ['Two','apple~rabbit~pencil~turtle~cookie'],
    ['Three','banana~elephant~butterfly~umbrella~tomato']]);
  classify('prek:eng:again-weather-gear','Dress for the Weather','Which weather fits',[
    ['Sunny','🧢 sun hat~🕶️ sunglasses~🧴 sunscreen~👒 shade hat~☀️ sun visor'],
    ['Rainy','☂️ umbrella~🧥 raincoat~🥾 rain boots~🌧️ rain poncho~💧 waterproof jacket'],
    ['Snowy','🧣 scarf~🧤 mittens~🧥 winter coat~❄️ snow boots~🧶 warm hat']]);
  classify('prek:eng:again-everyday-groups','Wear, Play, or Eat','What do you do with',[
    ['Wear','👕 shirt~🧦 socks~👟 shoes~🧢 cap~🧥 coat'],
    ['Play','🧸 toy bear~🪀 yo-yo~🪁 kite~🎲 dice~🛝 slide'],
    ['Eat','🍎 apple~🥕 carrot~🍌 banana~🥪 sandwich~🍪 cookie']]);
  classify('prek:eng:again-helping-people','People Who Help Us','Which helper uses',[
    ['Doctor','🩺 stethoscope~🩹 bandage~🏥 clinic~🌡️ thermometer~💊 medicine'],
    ['Chef','🍳 frying pan~🥄 cooking spoon~👨‍🍳 chef hat~🥘 soup pot~🧂 seasoning'],
    ['Farmer','🚜 tractor~🌾 field~🐄 cow barn~🌱 seedlings~🥕 vegetable harvest']]);
  classify('prek:eng:again-action-words','Run, Jump, or Sleep','Which action is shown by',[
    ['Run','🏃 child on a track~🐕 dog chasing a ball~🐎 horse racing~👟 feet moving fast~🏃‍♀️ runner'],
    ['Jump','🤸 child leaping~🐸 frog hopping~🐇 rabbit hopping~🦘 kangaroo leaping~⛹️ child bouncing upward'],
    ['Sleep','😴 child in bed~🐈 cat napping~🐻 bear hibernating~🛌 person resting at night~💤 sleeping puppy']]);
  classify('prek:eng:again-story-places','More Story Places','Where could this happen:',[
    ['Library','📚 borrow a book~🤫 read quietly~📖 hear story time~🪪 get a library card~📚 find books on shelves'],
    ['Market','🛒 buy vegetables~💵 pay for groceries~🍎 choose apples for sale~🧺 carry shopping bags~🥖 buy bread'],
    ['Garden','🌱 plant a seed~💧 water flowers~🪴 pull weeds~🦋 watch butterflies on flowers~🥕 harvest carrots']]);

  // Pre-K Math: concrete quantities, shapes, size, and position.
  numeric('prek:math:again-count-six-ten','Count to Ten with Pictures',(i,context,n)=>{const amount=n+6;return {q:`Count the ${things[context]}: ${icons[context].repeat(amount)}. How many?`,answer:amount};},{min:4,max:12});
  numeric('prek:math:again-add-groups','Put Two Groups Together',(i,context,n)=>{const a=n+1,b=context%3+1;return {q:`A bowl has ${a} ${things[context]} and another has ${b}. How many together?`,answer:a+b};},{min:0,max:10});
  numeric('prek:math:again-take-away','Take Away from a Group',(i,context,n)=>{const a=n+4,b=context%3+1;return {q:`There are ${a} ${things[context]}. ${b} are taken away. How many remain?`,answer:a-b};},{min:0,max:10});
  numeric('prek:math:again-match-one-each','One for Each Friend',(i,context,n)=>{const children=n+1;return {q:`There are ${children} friends. Each friend gets one ${things[context].split(' ')[1].replace(/s$/,'')}. How many are needed?`,answer:children};},{min:0,max:7});
  numeric('prek:math:again-count-dots','Dot Cards',(i,context,n)=>{const amount=n+1;return {q:`Card ${context+1} shows ${'●'.repeat(amount)}. How many dots are on the card?`,answer:amount};},{min:0,max:7});
  numeric('prek:math:again-before-six-ten','Before Six to Ten',(i,context,n)=>{const value=n+6;return {q:`A counting line for ${things[context]} reaches ${value}. What number comes just before ${value}?`,answer:value-1};},{min:0,max:11});
  classify('prek:math:again-compare-sets','Compare Picture Sets','Which side has more, or are they the same, in',[
    ['Left','🍎🍎🍎 vs 🍎~⭐⭐⭐ vs ⭐~🐟🐟🐟🐟 vs 🐟🐟~⚽⚽ vs ⚽~🌼🌼🌼 vs 🌼🌼'],
    ['Right','🍎 vs 🍎🍎🍎~⭐ vs ⭐⭐⭐~🐟🐟 vs 🐟🐟🐟🐟~⚽ vs ⚽⚽~🌼🌼 vs 🌼🌼🌼'],
    ['Same','🍎🍎 vs 🍎🍎~⭐⭐⭐ vs ⭐⭐⭐~🐟🐟🐟🐟 vs 🐟🐟🐟🐟~⚽ vs ⚽~🌼🌼 vs 🌼🌼']]);
  classify('prek:math:again-shape-sides','Curves and Corners','Which shape group matches',[
    ['Round','⚽ ball face~🪙 coin~🍪 cookie~🛞 wheel~🕒 clock face'],
    ['Three corners','🍕 pizza slice~🚩 triangle flag~📐 triangle ruler~🏔️ mountain peak~🔺 red triangle'],
    ['Four corners','🚪 door~📘 book cover~🪟 window~📱 phone face~🟦 blue square']]);
  classify('prek:math:again-lengths','Short, Medium, and Long','Which length describes',[
    ['Short','━ line~━━ line~✏️ tiny pencil~🪵 tiny log~🧵 short string'],
    ['Medium','━━━━ line~━━━━━ line~✏️ medium pencil~🪵 medium log~🧵 medium string'],
    ['Long','━━━━━━━━ line~━━━━━━━━━ line~✏️ long pencil~🪵 long log~🧵 long string']]);
  classify('prek:math:again-positions','Top, Middle, or Bottom','Which place is described by',[
    ['Top','bird at the top of a tree~star at the top of a page~hat on top of a head~flag at the top of a pole~book on the top shelf'],
    ['Middle','button in the middle of a shirt~toy in the middle of a row~flower in the middle of a garden~child in the middle of a line~dot at the middle of a page'],
    ['Bottom','shoes at the bottom of a closet~roots at the bottom of a plant~last drawer at the bottom~rock at the bottom of a hill~box on the bottom shelf']]);

  // Kindergarten English: decoding and short-sentence understanding.
  classify('k:eng:again-blends','Br, Cr, and Tr Blends','Which beginning blend starts',[
    ['br','bread~brick~brush~brown~brave'],['cr','crab~crayon~crow~crack~cry'],['tr','tree~train~truck~trip~trap']]);
  classify('k:eng:again-cvc-vowels','Read Short Vowel Words','Which short vowel sound is in',[
    ['short a','bag~map~fan~ham~tap'],['short e','pet~hen~leg~web~ten'],['short o','dog~log~pot~fox~hop']]);
  classify('k:eng:again-end-pairs','Read Ending Letter Pairs','Which ending pair is in',[
    ['ck','duck~sock~back~neck~rock'],['ng','ring~song~king~wing~long'],['nd','hand~sand~pond~wind~bend']]);
  classify('k:eng:again-word-families','More Word Families','Which ending belongs to',[
    ['-an','fan~can~man~pan~van'],['-ap','cap~map~nap~tap~lap'],['-ad','dad~bad~mad~sad~pad']]);
  classify('k:eng:again-story-parts','Who, Where, or What Happened','Which story detail is this:',[
    ['Who','Mia the child~a brown dog~Grandpa Joe~a tiny frog~the new teacher'],
    ['Where','inside a classroom~at the beach~under a tall tree~on a farm~by the pond'],
    ['What happened','found a lost hat~jumped over a log~made a big cake~opened a red box~helped a friend']]);
  classify('k:eng:again-question-words','Who, Where, or When','Which question word begins',[
    ['Who','Who has my hat~Who made lunch~Who is at the door~Who can swim~Who found the key'],
    ['Where','Where is the ball~Where do ducks live~Where did Sam go~Where is my book~Where are the shoes'],
    ['When','When is lunch~When will we leave~When did it rain~When is your birthday~When does school start']]);
  classify('k:eng:again-syllables','Clap Syllable Beats','How many syllables are in',[
    ['One','dog~cat~sun~fish~book'],['Two','rabbit~pencil~turtle~apple~table'],['Three','banana~umbrella~dinosaur~butterfly~elephant']]);
  classify('k:eng:again-pronouns','I, We, or They','Which word fits the speaker in',[
    ['I','one child says I can read~Mia says I am hungry~Ben says I have a ball~one girl says I am ready~one boy says I see a bird'],
    ['We','Mia and I say we can read~Ben and I say we are hungry~our team says we have a ball~my sister and I say we are ready~our class says we see a bird'],
    ['They','Mia and Ben are reading~the dogs are hungry~those children have a ball~the girls are ready~the birds are flying']]);
  classify('k:eng:again-sentence-types','Telling, Asking, and Excited','How does this sentence sound:',[
    ['Telling','The dog is asleep.~I see three birds.~My cup is full.~We went home.~It is cold today.'],
    ['Asking','Where is the dog?~Do you see the birds?~Is your cup full?~Can we go home?~Is it cold today?'],
    ['Excited','The dog can dance!~Look at those birds!~What a huge cup!~Hooray, we are home!~Wow, it is cold!']]);
  classify('k:eng:again-word-groups','Read and Group Words','Is this an animal, a food, or a vehicle:',[
    ['Animal','rabbit~fox~duck~horse~turtle'],['Food','bread~cheese~apple~carrot~rice'],['Vehicle','train~bus~boat~truck~bike']]);

  // Kindergarten Math: more ways to combine and compare small numbers.
  numeric('k:math:again-bonds-ten','Parts of Ten',(i,context,n)=>{const part=n+context;return {q:`A ten-frame has ${part} ${things[context]}. How many more fill all ten spaces?`,answer:10-part};},{min:0,max:10});
  numeric('k:math:again-doubles','Double the Group',(i,context,n)=>{const group=n+1;return {q:`Two cups each have ${group} ${things[context]}. How many altogether?`,answer:group*2};},{min:0,max:12});
  numeric('k:math:again-near-doubles','One More Than a Double',(i,context,n)=>{const group=n+1;return {q:`One group has ${group} ${things[context]}; another has ${group+1}. How many together?`,answer:group*2+1};},{min:0,max:12});
  numeric('k:math:again-add-teen','Add to a Teen Number',(i,context,n)=>{const a=10+n,b=context%3+1;return {q:`There are ${a} ${things[context]}. Add ${b} more. How many now?`,answer:a+b};},{min:0,max:20});
  numeric('k:math:again-subtract-teen','Take Away from a Teen Number',(i,context,n)=>{const a=12+n+context,b=context%3+1;return {q:`There are ${a} ${things[context]}. Take away ${b}. How many remain?`,answer:a-b};},{min:0,max:20});
  numeric('k:math:again-count-tens','Count Groups of Ten',(i,context,n)=>{const groups=n+context+1;return {q:`There are ${groups} full groups of ten ${things[context]}. How many altogether?`,answer:groups*10};},{min:0,max:100});
  numeric('k:math:again-tally-cards','Read Tally Cards',(i,context,n)=>{const tally='|'.repeat(n+1);return {q:`Tally card ${context+1} shows ${tally}. How many marks are there?`,answer:n+1};},{min:0,max:7});
  numeric('k:math:again-teen-frames','Count Past a Full Frame',(i,context,n)=>{const extra=n+context+1;return {q:`One ten-frame is full. A second frame has ${extra} ${things[context]}. How many in all?`,answer:10+extra};},{min:0,max:20});
  classify('k:math:again-compare-teens','Compare Teen Numbers','Which side has more, or are they the same, in',[
    ['Left','13 vs 11~17 vs 14~15 vs 12~19 vs 16~18 vs 10'],
    ['Right','11 vs 13~14 vs 17~12 vs 15~16 vs 19~10 vs 18'],
    ['Same','13 vs 13~17 vs 17~15 vs 15~19 vs 19~18 vs 18']]);
  classify('k:math:again-corners','Count Shape Corners','How many corners does this shape have:',[
    ['0','circle~oval~round ball face~coin outline~clock face'],
    ['3','triangle~pizza-slice outline~triangular flag~three-sided sign~three-sided ruler'],
    ['4','square~rectangle~book cover~door outline~window frame']]);

  // Grade 1 English: word forms and reading meaning.
  classify('g1:eng:again-contractions','Read Contractions','Which short form replaces',[
    ["I'm",'I am ready~I am here~I am happy~I am first~I am tired'],
    ["you're",'you are ready~you are here~you are happy~you are first~you are tired'],
    ["we'll",'we will go~we will read~we will play~we will help~we will try']]);
  classify('g1:eng:again-plural-endings','Make Words Plural','Which ending makes this word plural:',[
    ['-s','cats from cat~dogs from dog~books from book~cars from car~trees from tree'],
    ['-es','boxes from box~buses from bus~dishes from dish~watches from watch~foxes from fox'],
    ['-ies','babies from baby~puppies from puppy~bunnies from bunny~stories from story~flies from fly']]);
  classify('g1:eng:again-prefixes','Words with Beginnings','Which beginning was added to the base word in',[
    ['un-','unhappy from happy~untie from tie~unfair from fair~unlock from lock~unsafe from safe'],
    ['re-','redo from do~reread from read~replay from play~repaint from paint~rewrite from write'],
    ['pre-','preheat from heat~preview from view~prewash from wash~preschool from school~preread from read']]);
  classify('g1:eng:again-story-clues','Cause, Result, or Place','What kind of story detail is this:',[
    ['Cause','because rain began~because the glass fell~because I studied~because the cat was hungry~because the light went out'],
    ['Result','so we went inside~so the glass broke~so I knew the answer~so the cat ate~so the room became dark'],
    ['Place','in the kitchen~at the playground~under the bridge~inside the classroom~beside the pond']]);
  classify('g1:eng:again-feeling-evidence','Feelings from Clues','How does the character likely feel:',[
    ['Proud','Mia shows her finished painting~Ben solves a hard puzzle~Lee wins a reading badge~Ana learns to ride a bike~Sam finishes a big project'],
    ['Worried','Mia cannot find her dog~Ben hears a strange noise~Lee thinks the bus left~Ana loses her homework~Sam sees dark storm clouds'],
    ['Excited','Mia is going to a party~Ben opens a birthday gift~Lee sees a parade~Ana gets tickets to a game~Sam visits the zoo']]);
  classify('g1:eng:again-main-ideas','Find the Main Topic','Which main topic fits',[
    ['Animals','A fox has a bushy tail~A whale breathes air~Birds build nests~A turtle has a shell~A rabbit eats grass'],
    ['Plants','Roots hold a plant in soil~A seed can sprout~Leaves catch sunlight~Flowers make seeds~Trees grow taller'],
    ['Weather','Rain falls from clouds~Wind moves leaves~Snow covers the ground~The sun warms a sidewalk~A storm brings thunder']]);
  classify('g1:eng:again-joining-words','And, But, or Or','Which joining word completes',[
    ['and','Mia has a pen ___ a book~The cat ___ dog nap~We sang ___ danced~Ben drew a sun ___ moon~I ate soup ___ bread'],
    ['but','It is cold ___ sunny~I ran ___ missed the bus~The box is small ___ heavy~She tried ___ could not open it~I like tea ___ not coffee'],
    ['or','Would you like milk ___ water~Is the ball red ___ blue~Can we read ___ draw~Do you want soup ___ salad~Should we walk ___ ride']]);

  // Grade 1 Math: adding, comparing, money, and measurement.
  numeric('g1:math:again-three-addends','Add Three Small Groups',(i,context,n)=>{const a=n+1,b=context%4+1,c=(n+context)%3+1;return {q:`A box has ${a} ${things[context]}, then ${b} more, then ${c} more. How many altogether?`,answer:a+b+c};},{min:0,max:20});
  numeric('g1:math:again-missing-addend','Find the Missing Addend',(i,context,n)=>{const total=12+context+n,part=2+(2*n+context)%7;return {q:`A collection has ${total} ${things[context]}. ${part} are in one cup. How many are in the other cup?`,answer:total-part};},{min:0,max:20});
  numeric('g1:math:again-back-by-tens','Count Back by Tens',(i,context,n)=>{const current=30+context*10+n;return {q:`Count back ten from ${current} ${things[context]}. What number comes next?`,answer:current-10};},{min:0,max:80});
  numeric('g1:math:again-coin-combinations','Count Coin Values',(i,context,n)=>{const pennies=n+1,nickels=context;return {q:`You have ${nickels} nickels and ${pennies} pennies. How many cents is that?`,answer:nickels*5+pennies};},{min:0,max:30});
  numeric('g1:math:again-measure-cubes','Compare Cube Lengths',(i,context,n)=>{const long=8+context+n,short=3+n%3,color=['red','blue','green','yellow','purple'][context];return {q:`A ${color} ribbon is ${long} cubes long and another is ${short} cubes long. How many cubes longer is the ${color} ribbon?`,answer:long-short};},{min:0,max:15});
  classify('g1:math:again-compare-tens','Compare Two-Digit Numbers','Which number is greater, or are they equal, in',[
    ['Left','42 vs 24~65 vs 56~73 vs 37~81 vs 18~94 vs 49'],
    ['Right','24 vs 42~56 vs 65~37 vs 73~18 vs 81~49 vs 94'],
    ['Equal','42 vs 42~65 vs 65~73 vs 73~81 vs 81~94 vs 94']]);
  classify('g1:math:again-fraction-pictures','Whole, Half, or Quarter','Which part is described by',[
    ['Whole','all of one apple~one full pizza~an uncut sandwich~a complete paper circle~one entire chocolate bar'],
    ['Half','one of two equal apple parts~one of two equal pizza parts~one of two equal sandwich parts~one of two equal circle parts~one of two equal chocolate parts'],
    ['Quarter','one of four equal apple parts~one of four equal pizza parts~one of four equal sandwich parts~one of four equal circle parts~one of four equal chocolate parts']]);

  // Grade 1 Science: observe the world and use evidence.
  classify('g1:sci:again-senses','Use Your Senses','Which sense helps you notice',[
    ['Sight','a rainbow in the sky~a red stop sign~a tiny ant walking~a bright star~a square window'],
    ['Hearing','a ringing bell~a barking dog~a drum beat~a bird song~a car horn'],
    ['Touch','a rough rock~a soft blanket~cold ice~warm sand~a smooth pebble']]);
  classify('g1:sci:again-plant-needs','What Plants Need','Which need is shown by',[
    ['Water','rain soaking roots~watering a seedling~damp soil after a shower~a plant drawing water from soil~a garden hose near plants'],
    ['Light','sun shining on leaves~a plant near a bright window~leaves catching sunlight~a seedling growing toward the sun~a sunny garden bed'],
    ['Space','roots spreading in soil~plants spaced apart in rows~a tree with room for branches~a seedling moved to a bigger pot~leaves with room to grow']]);
  classify('g1:sci:again-material-tests','Test a Material','Which material is this object mostly made from:',[
    ['Metal','iron nail~steel spoon~metal key~aluminum can~bicycle chain'],
    ['Plastic','plastic cup~toy brick~plastic ruler~water bottle~plastic lid'],
    ['Wood','tree branch~wooden pencil~oak table~wooden spoon~log']]);
  classify('g1:sci:again-light-sources','Sources of Light','Which kind of light source is',[
    ['Sun','daylight on a field~sunlight through a window~sunrise over hills~noon sunshine~sun shining on leaves'],
    ['Electric','flashlight~desk lamp~streetlight~light bulb~phone screen'],
    ['Fire','candle flame~campfire~fireplace~lantern flame~match flame']]);
  classify('g1:sci:again-water-states','Ice, Water, or Vapor','Which form of water is shown by',[
    ['Ice','frozen cube~icicle~frozen pond~frost on a window~solid hailstone'],
    ['Liquid water','rain drop~puddle~flowing stream~cup of water~ocean wave'],
    ['Water vapor','water gas in air~invisible vapor above warm water~water entering air after evaporation~gas from evaporating rain~water as an invisible gas']]);
  classify('g1:sci:again-season-signs','Season Changes','Which season matches',[
    ['Spring','new buds on trees~flowers begin to bloom~baby birds hatch~warmer days after winter~fresh green leaves grow'],
    ['Summer','long hot days~swimming on a hot afternoon~strong sunshine and warm nights~ripe summer berries~school summer break'],
    ['Winter','snow on the ground~icy pond~cold short days~bare trees after fall~wearing a heavy winter coat']]);

  const sortingKeys=[
    'prek:eng:again-weather-gear','prek:math:again-shape-sides',
    'k:eng:again-word-groups','k:math:again-corners',
    'g1:eng:again-main-ideas','g1:sci:again-light-sources'
  ];
  const triples=[];
  for(let a=0;a<5;a++)for(let b=a+1;b<5;b++)for(let c=b+1;c<5;c++)triples.push([a,b,c]);
  for(const key of sortingKeys){
    const groups=sources.get(key),name=banks[key].name;
    const categories=groups.map(([label],i)=>({id:`c${i}`,label}));
    banks[key].questions=Array.from({length:25},(_,round)=>{
      const options=groups.flatMap(([,text],group)=>{
        const pool=text.split('~'),selection=triples[(round+group*3+Math.floor(round/10)*group)%10];
        return selection.map((item,card)=>({id:`r${round}-g${group}-c${card}`,text:pool[item],category:`c${group}`}));
      });
      const q=`${name}: place each card in its group.`;
      return {type:'drag',q,audio:q,categories,options:turn(options,round*4%9),explain:'Each card belongs in one group.'};
    });
  }
  if(added.length!==60)throw Error(`Expected 60 lessons; found ${added.length}`);
  window.K12_EARLY_MORE_KEYS_2=added;
})();
