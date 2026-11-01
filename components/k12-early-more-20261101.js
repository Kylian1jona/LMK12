/* Sixty additional 25-question lessons: 20 each for Pre-K, K, and Grade 1. */
(function(){
  const banks=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  const added=[];
  const classificationSources=new Map();
  const rotate=(items,amount)=>items.slice(amount%items.length).concat(items.slice(0,amount%items.length));
  function add(key,name,questions){
    if(banks[key]||questions.length!==25)throw Error(`Invalid new early lesson: ${key}`);
    banks[key]={name,contentVersion:'20261101.2',questions};added.push(key);
  }
  function classify(key,name,ask,groups){
    if(groups.length!==3||groups.some(group=>group[1].split('~').length!==5))throw Error(`Invalid examples: ${key}`);
    classificationSources.set(key,groups);
    const labels=groups.map(group=>group[0]);
    const questions=Array.from({length:25},(_,i)=>{
      const group=i%3;
      const clue=groups[group][1].split('~')[Math.floor(i/3)%5];
      const q=i<15?`${ask} ${clue}?`:`Choose the matching group for ${clue}.`;
      return {type:i%7===6&&key[0]!=='p'?'dropdown':'mc',q,audio:q,choices:rotate(labels,(i+Math.floor(i/15))%3),answer:labels[group],explain:`${clue} belongs with ${labels[group]}.`};
    });
    add(key,name,questions);
  }
  function numberLesson(key,name,make,{min=0,max=30}={}){
    const questions=Array.from({length:25},(_,i)=>{
      const {q,answer}=make(i,Math.floor(i/5),i%5);
      const value=Number(answer);
      const choices=[String(value)];
      for(const delta of [1,-1,2,-2,3,-3,4,-4]){
        const wrong=value+delta;
        if(wrong>=min&&wrong<=max&&!choices.includes(String(wrong)))choices.push(String(wrong));
        if(choices.length===4)break;
      }
      if(choices.length!==4)throw Error(`Not enough choices: ${key} ${i}`);
      return {type:i%7===6&&key[0]!=='p'?'dropdown':'mc',q,audio:q,choices:rotate(choices,i%4),answer:String(value),explain:`The answer is ${value}.`};
    });
    add(key,name,questions);
  }
  const pictures=['🍎 apples','⭐ stars','🐟 fish','⚽ balls','🌼 flowers'];
  const pictureIcons=['🍎','⭐','🐟','⚽','🌼'];

  // Pre-K English: pictures, sounds, words, and the world around a child.
  classify('prek:eng:more-pbc-sounds','P, B, and C Sounds','Which first sound goes with',[
    ['P','🐷 pig~✏️ pencil~🍕 pizza~🦜 parrot~🎃 pumpkin'],
    ['B','⚽ ball~🐻 bear~🚌 bus~🎈 balloon~🍌 banana'],
    ['C','🐱 cat~🚗 car~🎂 cake~🐄 cow~🧢 cap']]);
  classify('prek:eng:more-hfr-sounds','H, F, and R Sounds','Which first sound goes with',[
    ['H','🎩 hat~🏠 house~🐴 horse~❤️ heart~🖐️ hand'],
    ['F','🐟 fish~🦊 fox~🌸 flower~🪭 fan~🔥 fire'],
    ['R','🐇 rabbit~🌈 rainbow~🤖 robot~🚀 rocket~💍 ring']]);
  classify('prek:eng:more-rhyme-families','Rhyming Picture Words','Which ending sound do you hear in',[
    ['-at','🐱 cat~🎩 hat~🦇 bat~🧶 mat~🐀 rat'],
    ['-og','🐶 dog~🐸 frog~🪵 log~🌫️ fog~🐷 hog'],
    ['-un','☀️ sun~🏃 run~🎉 fun~🥯 bun~🎯 done']]);
  classify('prek:eng:more-animal-moves','How Animals Move','Does this animal mostly fly, swim, or walk:',[
    ['Fly','🦋 butterfly~🦅 eagle~🦇 bat~🐝 bee~🪰 fly'],
    ['Swim','🐟 fish~🐬 dolphin~🦈 shark~🐙 octopus~🦭 seal'],
    ['Walk','🐘 elephant~🐎 horse~🐕 dog~🐈 cat~🦒 giraffe']]);
  classify('prek:eng:more-room-objects','Things in Rooms','Where would you use this most often:',[
    ['Kitchen','🍳 frying pan~🥄 spoon~🍽️ plate~🧊 refrigerator~🫖 kettle'],
    ['Bedroom','🛏️ bed~🛌 pillow~🧸 bedtime bear~🛋️ bedside lamp~🧥 closet'],
    ['Bathroom','🪥 toothbrush~🛁 bathtub~🚿 shower~🧼 soap~🪞 bathroom mirror']]);
  classify('prek:eng:more-vehicles','Ways to Travel','Does this travel on land, in air, or on water:',[
    ['Land','🚗 car~🚌 bus~🚲 bicycle~🚂 train~🛴 scooter'],
    ['Air','✈️ airplane~🚁 helicopter~🎈 hot-air balloon~🛩️ small plane~🚀 rocket'],
    ['Water','⛵ sailboat~🚤 motorboat~🛶 canoe~🚢 ship~⛴️ ferry']]);
  classify('prek:eng:more-feeling-clues','Feelings in Little Stories','How might the child feel:',[
    ['Happy','😊 gets a hug~😄 sees a friend~🥳 has a party~😁 wins a game~😍 gets a puppy'],
    ['Sad','😢 loses a toy~☹️ misses a friend~😭 drops an ice cream~😞 gets left out~😔 waves goodbye'],
    ['Surprised','😮 finds a gift~😲 sees a rainbow~😯 hears a loud pop~🤩 sees a magic trick~😳 meets a new puppy']]);
  classify('prek:eng:more-opposite-clues','Words That Are Opposites','Which opposite word goes with',[
    ['small','🐘 big~🏠 huge~🌳 tall tree~🚌 large bus~🐋 giant whale'],
    ['cold','☀️ hot~🔥 warm fire~🍲 hot soup~🌡️ warm day~🏖️ hot sand'],
    ['down','⬆️ up~🪁 high kite~🛗 going up~🐦 flying high~⛰️ top of hill']]);
  classify('prek:eng:more-senses','Look, Listen, or Smell','Which sense would help you first with',[
    ['Look','🌈 rainbow~🔴 red ball~🖼️ picture~⭐ star shape~🟦 blue square'],
    ['Listen','🔔 ringing bell~🥁 beating drum~🎵 song~🐦 chirping bird~🚨 siren'],
    ['Smell','🌹 rose scent~🍪 baking cookies~🍋 lemon peel~🌸 perfume~🍿 fresh popcorn']]);
  classify('prek:eng:more-story-time','Story Time Clues','When might this happen:',[
    ['Morning','🌅 wake up~🥣 eat breakfast~🪥 brush teeth before school~🎒 leave for school~☀️ watch sunrise'],
    ['Afternoon','🥪 eat lunch~🏫 leave school~🛝 play after lunch~🌤️ afternoon walk~📚 afternoon reading'],
    ['Night','🌙 see stars~🛏️ go to bed~😴 sleep~🌃 look at the moon~🦉 hear an owl']]);

  // Pre-K Math: counting and comparing small, concrete groups.
  numberLesson('prek:math:more-count-to-five','Count Little Groups',(i,object,n)=>({q:`How many ${pictures[object]} do you see: ${pictureIcons[object].repeat(n+1)}?`,answer:n+1}),{min:0,max:6});
  numberLesson('prek:math:more-one-more','One More Picture',(i,object,n)=>({q:`There are ${n} ${pictures[object]}. One more joins. How many now?`,answer:n+1}),{min:0,max:6});
  numberLesson('prek:math:more-one-less','One Goes Away',(i,object,n)=>({q:`There are ${n+1} ${pictures[object]}. One goes away. How many remain?`,answer:n}),{min:0,max:6});
  numberLesson('prek:math:more-next-number','What Number Comes Next?',(i,object,n)=>({q:`Count ${pictures[object]}: ${n+1}, then what number comes next?`,answer:n+2}),{min:0,max:8});
  numberLesson('prek:math:more-before-number','What Number Comes Before?',(i,object,n)=>({q:`Before ${n+2} ${pictures[object]}, what number comes just before ${n+2}?`,answer:n+1}),{min:0,max:8});
  numberLesson('prek:math:more-make-five','Groups That Make Five',(i,object,n)=>({q:`There are ${n} ${pictures[object]}. How many more make five?`,answer:5-n}),{min:0,max:6});
  classify('prek:math:more-shape-objects','Everyday Shape Clues','Which shape does this look like:',[
    ['Circle','🛞 wheel~⚽ ball face~🍪 round cookie~🪙 coin~🕒 clock face'],
    ['Triangle','🍕 pizza slice~🚩 triangle flag~📐 triangle ruler~🔺 red triangle~🏔️ mountain peak'],
    ['Rectangle','🚪 door~📱 phone face~📖 book cover~🪟 wide window~📺 television']]);
  classify('prek:math:more-new-colors','Green, Orange, and Purple','Which color is shown by',[
    ['Green','🟢 green circle~🥦 broccoli~🍀 clover~🥒 cucumber~🐸 frog'],
    ['Orange','🟠 orange circle~🥕 carrot~🍊 orange fruit~🎃 pumpkin~🧡 orange heart'],
    ['Purple','🟣 purple circle~🍇 grapes~💜 purple heart~🍆 eggplant~🪻 lavender flower']]);
  classify('prek:math:more-full-empty','Full, Half, or Empty','How full is',[
    ['Full','🥛 milk to the top~🪣 water to the brim~🫙 jar filled with beads~🧺 basket packed with toys~📦 box filled with blocks'],
    ['Half','🥛 milk halfway up~🪣 water halfway up~🫙 jar half filled with beads~🧺 basket half filled with toys~📦 box half filled with blocks'],
    ['Empty','🥛 glass with no milk~🪣 bucket with no water~🫙 jar with no beads~🧺 basket with no toys~📦 box with no blocks']]);
  classify('prek:math:more-position-words','On, Under, or Beside','Where is the object:',[
    ['On','🐱 on a chair~📘 on a desk~🍎 on a plate~🧸 on a bed~🎩 on a head'],
    ['Under','🐶 under a table~⚽ under a chair~👟 under a bed~🐭 under a box~🧺 under a shelf'],
    ['Beside','🧸 beside a pillow~🚗 beside a tree~🐈 beside a dog~📚 beside a lamp~🌼 beside a rock']]);

  // Kindergarten English: phonics, sentences, and reading clues.
  classify('k:eng:more-initial-digraphs','Sh, Ch, and Th Sounds','Which beginning letter pair do you hear in',[
    ['sh','ship~shoe~shell~shark~sheep'],['ch','chair~cheese~chicken~cherry~chin'],['th','thumb~three~thunder~thin~thick']]);
  classify('k:eng:more-short-vowels','Short Vowel Pictures','Which vowel sound is in',[
    ['short a','cat~map~jam~bag~hat'],['short e','bed~hen~pen~net~red'],['short i','pig~pin~sit~fin~lid']]);
  classify('k:eng:more-final-sounds','Listen to Last Sounds','Which last letter sound is in',[
    ['t','cat~hat~boat~nut~feet'],['n','sun~fan~rain~pin~corn'],['p','cap~hop~cup~map~ship']]);
  classify('k:eng:more-word-endings','Build Word Families','Which word ending belongs to',[
    ['-et','pet~net~wet~jet~set'],['-ig','pig~dig~big~wig~fig'],['-op','hop~mop~top~pop~cop']]);
  classify('k:eng:more-sentence-marks','Read Sentence Marks','Which mark belongs at the end of',[
    ['.','The dog is asleep~I see a red bird~The cup is full~We went to school~It is raining'],
    ['?','Where is my hat~Can you help me~Who has the ball~Is the door open~What time is it'],
    ['!','Watch out~Hooray, we won~What a huge cake~Oh no, the milk spilled~Wow, that is fast']]);
  classify('k:eng:more-naming-actions','Naming, Action, or Describing','What kind of word is',[
    ['Naming','dog~teacher~table~apple~river'],['Action','run~jump~read~swim~sing'],['Describing','blue~soft~tall~quiet~round']]);
  classify('k:eng:more-location-words','Where Is It?','Which location word fits',[
    ['above','bird above the tree~kite above the roof~cloud above the house~star above the hill~lamp above the desk'],
    ['below','fish below the boat~ball below the shelf~roots below the soil~shoes below the bed~frog below the log'],
    ['beside','cat beside the bowl~chair beside the table~tree beside the house~book beside the lamp~dog beside the child']]);
  classify('k:eng:more-story-characters','Who Is in the Story?','Who is the story mostly about:',[
    ['Child','Maya paints a sun~Ben loses a sock~Lee rides a bike~Ana feeds a duck~Sam builds a tower'],
    ['Animal','A fox digs a den~A frog hops away~A bird makes a nest~A dog finds a ball~A cat naps all day'],
    ['Family','Mom and Dad bake bread~The twins play together~Grandma and I garden~Our family goes camping~Dad and Mia make lunch']]);
  classify('k:eng:more-story-settings','Where Does the Story Happen?','Where does this story take place:',[
    ['Farm','Mia feeds the cows~A hen lays an egg~The tractor crosses a field~A sheep eats grass~The farmer closes the barn'],
    ['Beach','Ben makes a sandcastle~A wave reaches my toes~We collect seashells~The seagull flies over sand~I swim in the sea'],
    ['School','Lee opens a workbook~The teacher reads aloud~We line up for class~The bell rings for lunch~I put my bag by my desk']]);
  classify('k:eng:more-food-groups','Food Word Groups','Which food group does this belong to:',[
    ['Fruit','apple~banana~orange~grape~pear'],['Vegetable','carrot~broccoli~pea~corn~spinach'],['Grain','bread~rice~oatmeal~pasta~cereal']]);

  // Kindergarten Math: number relationships through 20 and simple measures.
  numberLesson('k:math:more-teen-ones','Tens and Ones to Twenty',(i,context,n)=>{const value=11+n+context;return {q:`A ten-frame is full, with ${value-10} more ${pictures[context]}. How many are there?`,answer:value};},{min:8,max:20});
  numberLesson('k:math:more-add-to-ten','Add Two Small Groups',(i,context,n)=>{const a=n+1,b=(context%3)+1;return {q:`There are ${a} ${pictures[context]} and ${b} more. How many altogether?`,answer:a+b};},{min:0,max:12});
  numberLesson('k:math:more-subtract-to-ten','Take Away from Ten',(i,context,n)=>{const a=n+5,b=(context%3)+1;return {q:`There are ${a} ${pictures[context]}. ${b} go away. How many remain?`,answer:a-b};},{min:0,max:10});
  numberLesson('k:math:more-make-ten','Find the Missing Part of Ten',(i,context,n)=>{const a=n+context;return {q:`A box holds ten ${pictures[context]}. It has ${a} now. How many more fill it?`,answer:10-a};},{min:0,max:10});
  numberLesson('k:math:more-count-by-two','Count by Twos',(i,context,n)=>{const a=2*(n+context+1);return {q:`Count pairs of ${pictures[context]}: ${a}, then what comes next when one pair joins?`,answer:a+2};},{min:0,max:24});
  numberLesson('k:math:more-before-teen','Numbers Before the Teens',(i,context,n)=>{const a=11+n+context;return {q:`What number comes just before ${a} ${pictures[context]}?`,answer:a-1};},{min:0,max:20});
  numberLesson('k:math:more-after-teen','Numbers After the Teens',(i,context,n)=>{const a=10+n+context;return {q:`What number comes just after ${a} ${pictures[context]}?`,answer:a+1};},{min:0,max:20});
  numberLesson('k:math:more-double-pictures','Double a Small Group',(i,context,n)=>{const a=n+1;return {q:`One plate has ${a} ${pictures[context]}. Another plate has ${a}. How many in all?`,answer:a*2};},{min:0,max:12});
  numberLesson('k:math:more-picture-rows','Count Two Rows',(i,context,n)=>{const a=n+1,b=context+1;return {q:`A top row has ${a} ${pictures[context]}; a bottom row has ${b}. How many in both rows?`,answer:a+b};},{min:0,max:12});
  numberLesson('k:math:more-groups-of-five','Count Groups of Five',(i,context,n)=>{const a=n+context+1;return {q:`Five ${pictures[context]} are in one box and ${a} are outside. How many altogether?`,answer:5+a};},{min:0,max:16});

  // Grade 1 English: meaning, grammar, and kinds of text.
  classify('g1:eng:more-meaning-groups','Words with Related Meanings','Which idea is closest to the word',[
    ['Happy','cheerful~glad~joyful~delighted~pleased'],
    ['Fast','quick~speedy~rapid~swift~hasty'],
    ['Small','tiny~little~miniature~petite~teeny']]);
  classify('g1:eng:more-pronoun-clues','Choose a Pronoun','Which pronoun can replace the named person or people in',[
    ['He','Dad is reading~Ben runs fast~Grandpa waves~The boy sings~Mr. Lee teaches'],
    ['She','Mom is reading~Ana runs fast~Grandma waves~The girl sings~Ms. Lee teaches'],
    ['They','The children are reading~Ben and Ana run fast~My grandparents wave~The girls sing~The teachers help']]);
  classify('g1:eng:more-sentence-purposes','What Is the Sentence Doing?','Is this telling, asking, or giving a direction:',[
    ['Telling','The sun is bright.~My cat is asleep.~We have two dogs.~The bus is yellow.~I like apples.'],
    ['Asking','Where is my book?~Can you help me?~Who made this?~Is the bus late?~Do you like apples?'],
    ['Direction','Close the door.~Wash your hands.~Put the book away.~Line up here.~Point to the apple.']]);
  classify('g1:eng:more-word-endings','Words with Endings','Which ending was added to the base word in',[
    ['-ing','jumping from jump~playing from play~singing from sing~walking from walk~reading from read'],
    ['-ed','jumped from jump~played from play~helped from help~walked from walk~looked from look'],
    ['-s','jumps from jump~plays from play~sings from sing~walks from walk~reads from read']]);
  classify('g1:eng:more-text-types','Kinds of Reading','Is this a made-up story, a fact text, or a poem:',[
    ['Story','A dragon lost its crown~A talking fox found a key~The moon invited a child to tea~A robot learned to dance~A giant lived in a cloud'],
    ['Facts','Bees collect nectar~Plants need light~Whales breathe air~Rain comes from clouds~The Earth has one moon'],
    ['Poem','The moon is round, a silver light~Tap tap rain, dance again~Bright little star, shining afar~Leaves fall down, orange and brown~Birds sing high beneath the sky']]);
  classify('g1:eng:more-question-words','Question Words','Which question word is asking about a person, place, or time:',[
    ['Who','Who made lunch~Who found the dog~Who is calling~Who will read~Who has the key'],
    ['Where','Where is the park~Where do bears sleep~Where is my coat~Where did Mia go~Where is the door'],
    ['When','When is lunch~When will it rain~When did school end~When do we leave~When is the party']]);
  classify('g1:eng:more-story-order','First, Next, or Last','Which story step is described by',[
    ['First','Before baking, Mia gathers flour~At the start, Ben finds a seed~The dog first sees a ball~To begin, I fill the cup~First, we open the book'],
    ['Next','Then Mia stirs the batter~After that, Ben waters the seed~The dog runs after the ball~Next, I add water~Then, we read the page'],
    ['Last','Finally, Mia eats the cake~At the end, Ben sees a flower~The dog brings the ball home~Last, I drink the water~Finally, we close the book']]);

  // Grade 1 Math: arithmetic and place value with varied contexts.
  numberLesson('g1:math:more-add-twenty','Add Within Twenty',(i,context,n)=>{const a=5+n+context,b=1+(context+n)%5;return {q:`Mia has ${a} ${pictures[context]} and gets ${b} more. How many now?`,answer:a+b};},{min:0,max:22});
  numberLesson('g1:math:more-sub-twenty','Subtract Within Twenty',(i,context,n)=>{const a=10+n+context,b=1+(context+n)%5;return {q:`Lee has ${a} ${pictures[context]} and gives away ${b}. How many remain?`,answer:a-b};},{min:0,max:20});
  numberLesson('g1:math:more-ten-more','Ten More Than a Number',(i,context,n)=>{const a=10+context*5+n;return {q:`A shelf holds ${a} ${pictures[context]}. What number is ten more than ${a}?`,answer:a+10};},{min:5,max:50});
  numberLesson('g1:math:more-ten-less','Ten Less Than a Number',(i,context,n)=>{const a=21+context*5+n;return {q:`What number is ten less than ${a} ${pictures[context]}?`,answer:a-10};},{min:0,max:50});
  numberLesson('g1:math:more-five-count','Skip Count by Fives',(i,context,n)=>{const a=5*(context+n+1);return {q:`Count groups of five ${pictures[context]}: after ${a}, what is the next number?`,answer:a+5};},{min:0,max:55});
  numberLesson('g1:math:more-place-value','Tens and Ones to Fifty',(i,context,n)=>{const tens=context+1,ones=n+1;return {q:`What number has ${tens} tens and ${ones} ones?`,answer:tens*10+ones};},{min:0,max:60});
  numberLesson('g1:math:more-equal-groups','Two Equal Groups',(i,context,n)=>{const a=n+1;return {q:`Two equal groups each hold ${a} ${pictures[context]}. How many in both groups?`,answer:a*2};},{min:0,max:12});

  // Grade 1 Science: observations and simple explanations.
  classify('g1:sci:more-plant-parts','What Plant Parts Do','Which plant part helps with this job:',[
    ['Roots','holds a plant in soil~takes in water below ground~spreads under a tree~anchors a seedling~reaches into damp dirt'],
    ['Stem','holds leaves up~carries water upward~supports a flower~connects roots to leaves~helps a tall plant stand'],
    ['Leaves','catch sunlight~make food for a plant~grow on branches~turn colors in fall~take in light for growth']]);
  classify('g1:sci:more-animal-coverings','Animal Body Coverings','Which covering does this animal have:',[
    ['Fur','rabbit~bear~fox~cat~horse'],['Feathers','eagle~chicken~duck~owl~penguin'],['Scales','fish~snake~lizard~shark~iguana']]);
  classify('g1:sci:more-habitat-clues','Find the Habitat','Which habitat fits this clue:',[
    ['Desert','very dry land with cacti~hot sand with little rain~home of a camel~place with dunes~land where a desert fox lives'],
    ['Forest','many tall trees together~shade under branches~home of deer and squirrels~fallen leaves on the floor~place where an owl nests'],
    ['Ocean','wide salty water~home of whales~deep water with coral~place where a shark swims~waves reaching a shore']]);
  classify('g1:sci:more-materials','Everyday Materials','What material is this mostly made from:',[
    ['Wood','oak table~wooden pencil~tree branch~wooden spoon~log cabin'],
    ['Metal','steel spoon~iron nail~aluminum can~metal key~bicycle chain'],
    ['Fabric','cotton shirt~wool scarf~cloth towel~canvas bag~denim jeans']]);
  classify('g1:sci:more-forces','Push, Pull, or No Change','Which motion clue is shown by',[
    ['Push','shoving a cart away~pressing a button~kicking a ball away~closing a door with your hand~sliding a box away'],
    ['Pull','tugging a rope~opening a drawer toward you~drawing a wagon toward you~pulling a zipper up~bringing a chair closer'],
    ['No change','a parked bike stays still~a book rests on a table~a ball sits in a basket~a toy stays on a shelf~a rock lies on the ground']]);
  classify('g1:sci:more-weather-signs','Read Weather Signs','Which weather is shown by',[
    ['Sunny','bright sunlight and blue sky~sharp shadows outdoors~warm sun on the sidewalk~sun shining without clouds~a clear bright afternoon'],
    ['Rainy','water drops falling from clouds~wet streets and umbrellas~puddles forming outside~rain tapping on a roof~a gray sky with showers'],
    ['Windy','tree branches swaying~a kite lifting high~leaves blowing across a path~a flag flapping hard~hair blowing in the breeze']]);

  // A few lessons use the same topic as nine-card drag-and-drop sorting.
  const sortingKeys=[
    'prek:eng:more-vehicles','prek:math:more-new-colors',
    'k:eng:more-initial-digraphs','k:eng:more-food-groups',
    'g1:eng:more-meaning-groups','g1:sci:more-materials'
  ];
  const triples=[];
  for(let a=0;a<5;a++)for(let b=a+1;b<5;b++)for(let c=b+1;c<5;c++)triples.push([a,b,c]);
  for(const key of sortingKeys){
    const groups=classificationSources.get(key);
    const name=banks[key].name;
    const categories=groups.map(([label],i)=>({id:`c${i}`,label}));
    banks[key].questions=Array.from({length:25},(_,round)=>{
      const options=groups.flatMap(([,source],group)=>{
        const pool=source.split('~');
        const selection=triples[(round+group*3+Math.floor(round/10)*group)%triples.length];
        return selection.map((item,card)=>({id:`r${round}-g${group}-c${card}`,text:pool[item],category:`c${group}`}));
      });
      const q=`${name}: move each card into its group.`;
      return {type:'drag',q,audio:q,categories,options:rotate(options,round*4%9),explain:'Place each card with the matching group.'};
    });
  }

  if(added.length!==60)throw Error(`Expected 60 new early lessons; found ${added.length}`);
  window.K12_EARLY_MORE_KEYS=added;
})();
