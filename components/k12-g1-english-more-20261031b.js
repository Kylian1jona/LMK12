/* Twenty more Grade 1 English lessons with 25 questions each. */
(function(){
  const banks=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  const keys=[];
  function options(answer,pool,index){
    const correct=String(answer);
    const wrong=[...new Set(pool.map(String).filter(value=>value!==correct))];
    if(wrong.length<3)throw Error(`Not enough choices for ${correct}`);
    const picked=[correct,...Array.from({length:3},(_,offset)=>wrong[(index*3+offset)%wrong.length])];
    return picked.slice(index%4).concat(picked.slice(0,index%4));
  }
  function choice(prompt,answer,pool,index){
    return {type:index%5===4?'dropdown':'mc',q:prompt,audio:prompt,choices:options(answer,pool,index),answer:String(answer)};
  }
  function add(id,name,questions){
    const key=`g1:eng:${id}`;
    if(banks[key]||questions.length!==25)throw Error(`Invalid or repeated Grade 1 English bank ${key}`);
    banks[key]={name,questions};keys.push(key);
  }
  function groupBank(id,name,groups,prompt){
    const rows=Object.entries(groups).flatMap(([label,words])=>words.split(' ').map(word=>({label,word})));
    const questions=rows.map((row,index)=>choice(prompt(row.label),row.word,rows.filter(item=>item.label!==row.label).map(item=>item.word),index));
    questions[24]={type:'drag',q:'Match each word to its pattern.',audio:'Match each word to its pattern.',pairs:Object.entries(groups).slice(0,4).map(([label,words],index)=>({word:words.split(' ')[index],match:label}))};
    add(id,name,questions);
  }
  groupBank('rhyming-families','Rhyming Word Families',{
    'rhymes with bat':'cat hat mat rat sat','rhymes with pan':'can fan man ran van',
    'rhymes with big':'dig fig pig rig wig','rhymes with top':'hop mop pop cop stop',
    'rhymes with fun':'bun run sun gun spun'
  },label=>`Which word ${label}?`);
  groupBank('final-consonants','Final Consonant Sounds',{
    'ends with b':'crab tub web job bib','ends with d':'bed red mud seed bird',
    'ends with g':'bag pig dog rug bug','ends with m':'jam gum ham drum swim',
    'ends with t':'cat hat boat foot nut'
  },label=>`Which word ${label}?`);
  groupBank('vowel-team-spelling','Vowel Team Spelling',{
    'has ai':'rain mail tail train paint','has ay':'day play stay say tray',
    'has ee':'bee tree seed feet green','has ea':'sea leaf bead meat peach',
    'has oa':'boat coat road soap goat'
  },label=>`Which word ${label}?`);
  const silentE='cake bake lake gate plane snake make take wave name kite bike time five line pine ride hide home hope rope nose note cube cute'.split(' ');
  const shortWords='cat bag hat pin kit sit hop not rod cub cut tub sun bed pig dog map tap red fox cup jam hen lip log'.split(' ');
  const silentQuestions=silentE.map((word,index)=>choice('Which word has a silent e at the end?',word,shortWords,index));
  silentQuestions[24]={type:'drag',q:'Match each short word to the word with silent e.',audio:'Match each short word to the word with silent e.',pairs:[['cap','cape'],['tap','tape'],['pin','pine'],['hop','hope']].map(([word,match])=>({word,match}))};
  add('silent-e-words','Read Silent E Words',silentQuestions);

  const synonyms='happy|glad;big|large;small|tiny;fast|quick;quiet|silent;smart|clever;pretty|lovely;angry|mad;scared|afraid;easy|simple;hard|difficult;warm|toasty;cold|chilly;funny|silly;nice|kind;begin|start;end|finish;jump|leap;look|see;shout|yell;close|shut;gift|present;child|kid;clean|neat;rest|relax'.split(';').map(item=>item.split('|'));
  const synonymAnswers=synonyms.map(row=>row[1]);
  const synonymQuestions=synonyms.map(([word,answer],index)=>choice(`Which word means about the same as ${word}?`,answer,synonymAnswers,index));
  synonymQuestions[24]={type:'drag',q:'Match words that mean almost the same thing.',audio:'Match words that mean almost the same thing.',pairs:synonyms.slice(20,24).map(([word,match])=>({word,match}))};
  add('same-meaning','Words with the Same Meaning',synonymQuestions);
  groupBank('word-categories','Put Words in Groups',{
    'names an animal':'rabbit turtle puppy kitten fox','names a food':'apple banana bread carrot cheese',
    'names clothing':'shirt sock hat coat mitten','names a vehicle':'bus train boat truck bike',
    'names a plant':'tree flower grass bush vine'
  },label=>`Which word ${label}?`);
  const clues=[
    ['It tells the time and has hands.','clock'],['It keeps rain off your head.','umbrella'],['You write with it and can erase it.','pencil'],['It holds books on your back.','backpack'],['It opens a locked door.','key'],
    ['You use it to brush your teeth.','toothbrush'],['It shines in the daytime sky.','sun'],['It shines at night and changes shape.','moon'],['You wear it on your foot inside a shoe.','sock'],['It carries people on roads and stops often.','bus'],
    ['It is a small animal that hops and has long ears.','rabbit'],['It is a round fruit that can be red or green.','apple'],['You use it to cut paper safely.','scissors'],['It gives light in a dark room.','lamp'],['You sit on it at a table.','chair'],
    ['It is a book of word meanings.','dictionary'],['It holds water for drinking.','cup'],['It is a place to borrow books.','library'],['It is a tool for measuring length.','ruler'],['It is a toy that flies on a string.','kite'],
    ['It is a flower that turns toward the sun.','sunflower'],['It is a small insect that makes honey.','bee'],['It is frozen water.','ice'],['It is a place where plants grow.','garden'],['It is a paper message you send to someone.','letter']
  ];
  add('word-clues','Read Word Clues',clues.map(([clue,answer],index)=>choice(`${clue} What is it?`,answer,clues.map(row=>row[1]),index)));
  const positions=[
    ['The cup rests on top of the table. It is ___ the table.','on'],['The shoes are below the bed. They are ___ the bed.','under'],['The dog sits next to the boy. It is ___ him.','beside'],['The cat hides at the back of the sofa. It is ___ the sofa.','behind'],['The child stands ahead of the line. She is ___ the line.','in front of'],
    ['The tree stands in the middle of two houses. It is ___ them.','between'],['The plane flies higher than the clouds. It is ___ them.','above'],['The fish swims lower than the boat. It is ___ the boat.','below'],['The puppy sleeps within its box. It is ___ the box.','inside'],['The bird sits beyond the house walls. It is ___ the house.','outside'],
    ['A book lies on top of the desk. It is ___ the desk.','on'],['A ball rolls below a chair. It is ___ the chair.','under'],['Mia stands next to Ava. Mia is ___ Ava.','beside'],['A shed is at the back of the home. It is ___ the home.','behind'],['The teacher stands ahead of the class. She is ___ the class.','in front of'],
    ['A bench sits in the middle of two trees. It is ___ the trees.','between'],['A kite flies higher than the roof. It is ___ the roof.','above'],['A worm moves lower than the soil surface. It is ___ the soil.','below'],['Seeds are within the packet. They are ___ it.','inside'],['The children play beyond the classroom walls. They are ___ the classroom.','outside'],
    ['The plate sits on top of the mat. It is ___ the mat.','on'],['The mouse hides below the shelf. It is ___ the shelf.','under'],['The lamp stands next to the chair. It is ___ the chair.','beside'],['The wagon is at the back of the truck. It is ___ the truck.','behind'],['The bus waits ahead of the cars. It is ___ the cars.','in front of']
  ];
  const positionWords=[...new Set(positions.map(row=>row[1]))];
  add('position-words','Words That Tell Where',positions.map(([sentence,answer],index)=>choice(sentence,answer,positionWords,index)));

  const articleNouns='apple egg igloo octopus umbrella ant insect orange owl acorn elephant elbow island animal inch airplane ice-cream apron ax ocean book cat dog flower kite'.split(' ');
  add('a-or-an','A or An?',articleNouns.map((noun,index)=>{
    const article=/^[aeiou]/.test(noun)?'an':'a';
    const answer=`${article} ${noun}`;
    return choice(`Which phrase uses a or an correctly with ${noun}?`,answer,[`a ${noun}`,`an ${noun}`,`a an ${noun}`,`an a ${noun}`],index);
  }));
  const capitals=[
    'Ava reads a book.','Ben has a kite.','Mia likes apples.','Sam walks home.','Lily paints a tree.',
    'We play on Monday.','I read on Tuesday.','Dad cooks on Wednesday.','The game is on Thursday.','We visit on Friday.',
    'Mom rests on Saturday.','The park opens on Sunday.','Leo has a puppy.','Nina rides a bike.','Owen sees a bird.',
    'June draws a house.','Emma sings a song.','Kai finds a shell.','Ivy plants a seed.','Noah helps his friend.',
    'The sun is bright.','My dog can swim.','We like to dance.','A frog can jump.','The bus is yellow.'
  ];
  add('capital-letters','Use Capital Letters',capitals.map((answer,index)=>{
    const wrong=[answer[0].toLowerCase()+answer.slice(1),answer.replace(/\.$/,''),answer.replace(/\b([a-z]{3,})\b/,word=>word.toUpperCase())].filter(item=>item!==answer);
    return choice('Which sentence has the correct capital letter and ending mark?',answer,wrong,index);
  }));
  const pastVerbs='jump|jumped;walk|walked;play|played;look|looked;help|helped;paint|painted;wash|washed;open|opened;close|closed;plant|planted;clean|cleaned;call|called;push|pushed;pull|pulled;clap|clapped;hop|hopped;skip|skipped;stop|stopped;drop|dropped;smile|smiled;wave|waved;dance|danced;bake|baked;ride|rode;run|ran'.split(';').map(item=>item.split('|'));
  add('past-tense-verbs','Actions That Already Happened',pastVerbs.map(([word,answer],index)=>choice(`Yesterday I did this action: ${word}. Which word tells it already happened?`,answer,pastVerbs.map(row=>row[1]),index)));
  const orderedSentences=[
    'The red fox jumps.','I can see birds.','We read many books.','A small dog barks.','The sun shines brightly.',
    'Mia rides her bike.','The blue kite flies.','Dad makes warm soup.','A green frog hops.','The yellow bus stops.',
    'Our cat likes fish.','The baby laughs loudly.','Ben draws a house.','The big tree grows.','I found my hat.',
    'Three ducks swim together.','We play after lunch.','A bird builds nests.','The moon looks bright.','She waters the flowers.',
    'He carries a backpack.','The rabbit eats carrots.','I hear a bell.','They walk to school.','A boat crosses water.'
  ];
  add('word-order','Put Sentence Words in Order',orderedSentences.map((answer,index)=>{
    const words=answer.replace(/\.$/,'').split(' ');
    const wrong=[`${words[1]} ${words[0]} ${words.slice(2).join(' ')}.`,`${words.slice(1).join(' ')} ${words[0]}.`,`${words[0]} ${words.slice(2).join(' ')} ${words[1]}.`];
    return choice(`Which sentence puts these words in the right order? ${words.slice().reverse().join(' / ')}`,answer,wrong,index);
  }));

  const problems=[
    ['Ava','lost her pencil','found it under her desk','she could write again','relieved'],['Ben','spilled water','used a towel to dry it','the floor was dry','calm'],['Mia','could not reach a book','asked an adult for help','she held the book','glad'],['Leo','forgot his lunch','called his dad','his lunch arrived','happy'],['Nina','tore her paper','used tape to fix it','the page stayed together','proud'],
    ['Sam','missed the bus','walked with his mom','he reached school safely','relieved'],['Lily','dropped her crayons','picked them up','her box was full again','calm'],['Owen','could not tie his shoe','asked his sister to show him','he tied it himself','proud'],['Zoe','lost her toy bear','looked beneath the couch','she found the bear','happy'],['Eli','broke a block tower','built it again','the tower stood tall','proud'],
    ['Ivy','had a muddy shoe','washed it with water','the shoe looked clean','glad'],['Noah','could not open a jar','asked Dad for help','the lid came off','relieved'],['Emma','lost her place in a book','used a bookmark','she found the right page','happy'],['Max','knocked over a cup','wiped up the juice','the table was clean','calm'],['Ruby','forgot her hat','went back for it','her head stayed warm','glad'],
    ['Finn','could not find the trail','looked at a map','he found the path','relieved'],['Ada','had a flat bike tire','asked an adult to fix it','the bike could roll','happy'],['Kai','lost his mitten','checked his coat pocket','he found the mitten','glad'],['June','bent her drawing','smoothed the paper','her picture looked neat','proud'],['Tara','could not hear the story','moved closer to the reader','she heard every word','happy'],
    ['Jude','forgot the rules','asked his teacher to explain','he knew how to play','confident'],['Wren','saw a thirsty plant','gave it water','the soil felt damp','glad'],['Omar','lost his library card','asked for a new card','he could borrow a book','relieved'],['Pia','had cold hands','put on warm gloves','her hands felt warm','happy'],['Rex','could not see the board','moved to a front seat','he could read the words','confident']
  ];
  for(const [id,name,prompt,position] of [
    ['story-problems','Find the Story Problem','What problem did the character have?',1],
    ['story-solutions','Find the Story Solution','What did the character do to solve the problem?',2],
    ['story-results','Find the Story Result','What happened after the solution?',3],
    ['story-feelings','Feelings in Stories','How did the character feel at the end?',4]
  ]){
    const pool=problems.map(row=>row[position]);
    add(id,name,problems.map((row,index)=>{
      const [who,problem,fix,result,feeling]=row;
      const passage=`${who} ${problem}. ${who} ${fix}. Soon, ${result}. ${who} felt ${feeling}.`;
      return choice(`${passage}\n${prompt}`,row[position],pool,index);
    }));
  }

  const animals=[
    ['duck','feathers','ponds','plants and bugs'],['rabbit','long ears','meadows','grass'],['turtle','a shell','ponds','plants and insects'],['cat','whiskers','homes','cat food'],['dog','fur','homes','dog food'],
    ['bee','wings','gardens','nectar'],['frog','webbed feet','wetlands','insects'],['fish','fins','water','small water plants'],['fox','a bushy tail','forests','small animals'],['owl','large eyes','woodlands','mice'],
    ['horse','a mane','fields','hay'],['cow','hooves','farms','grass'],['sheep','wool','farms','hay'],['goat','horns','hills','leaves'],['pig','a snout','farms','grains'],
    ['deer','antlers','forests','leaves'],['squirrel','a fluffy tail','trees','nuts'],['penguin','flippers','icy shores','fish'],['seal','flippers','coasts','fish'],['crab','claws','beaches','small sea animals'],
    ['snail','a shell','gardens','leaves'],['butterfly','colorful wings','gardens','flower nectar'],['mouse','a long tail','fields','seeds'],['bear','thick fur','forests','berries'],['camel','a hump','deserts','dry plants']
  ];
  for(const [id,name,prompt,position] of [
    ['animal-facts','Read Animal Facts','Which animal is described?',0],
    ['animal-features','Animal Body Features','What body feature does the animal have?',1],
    ['animal-homes-reading','Where Animals Live','Where can this animal live?',2],
    ['animal-food-reading','What Animals Eat','What can this animal eat?',3]
  ]){
    const pool=animals.map(row=>row[position]);
    add(id,name,animals.map((row,index)=>{
      const [animal,feature,home,food]=row;
      const passage=`${/^[aeiou]/.test(animal)?'An':'A'} ${animal} has ${feature}. It can live in or near ${home}. It can eat ${food}.`;
      return choice(`${passage}\n${prompt}`,row[position],pool,index);
    }));
  }
  window.K12_G1_ENGLISH_MORE_2_KEYS=keys;
})();
