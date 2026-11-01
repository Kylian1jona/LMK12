/* Twenty Grade 1 English lessons, 25 questions each. */
(function(){
  const banks=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  const rotate=(items,index)=>items.slice(index%items.length).concat(items.slice(0,index%items.length));
  function choices(answer,pool,index){
    const wrong=[...new Set(pool.map(String).filter(value=>value!==String(answer)))];
    if(wrong.length<3)throw Error(`Too few choices for ${answer}`);
    return rotate([String(answer),...rotate(wrong,index).slice(0,3)],index);
  }
  function single(prompt,answer,pool,index){
    return {type:index%5===4?'dropdown':'mc',q:prompt,audio:prompt,choices:choices(answer,pool,index),answer:String(answer)};
  }
  function add(key,name,questions){
    if(banks[key])throw Error(`Duplicate Grade 1 English lesson: ${key}`);
    if(questions.length!==25)throw Error(`${key} has ${questions.length} questions`);
    banks[key]={name,questions};
  }
  const phonics=[
    ['short-vowel-words','Short Vowels in Words','short vowel',{
      'short a':'cat map bag jam fan','short e':'bed hen pen red jet','short i':'pig pin sit lip win','short o':'dog log pot fox hot','short u':'sun cup bug mud rug'
    }],
    ['long-vowel-words','Long Vowels in Words','long vowel',{
      'long a':'cake lake rain mail play','long e':'tree seed bee feet green','long i':'kite bike light night pie','long o':'boat coat home rope snow','long u':'cube mule tube flute blue'
    }],
    ['beginning-blends','Beginning Blends','beginning letters',{
      bl:'blue black block blow blanket',cl:'clap clock cloud climb clean',fl:'flag flip flower fly flat',gr:'green grass grape grin grow',tr:'tree train truck trip trap'
    }],
    ['letter-pairs','Letter Pairs and Qu','beginning letters',{
      sh:'ship shop shell shoe shark',ch:'chair chin cheese chick cherry',th:'thin thick thumb three thank',wh:'whale wheel white what when',qu:'queen quick quilt quiz quiet'
    }],
    ['ending-sounds','Ending Letter Patterns','ending letters',{
      ck:'duck sock rock pack back',ng:'ring king song wing long',nd:'hand sand pond bend wind',st:'nest best list fast rest',mp:'jump lamp camp bump damp'
    }]
  ];
  for(const [id,name,skill,groups] of phonics){
    const rows=Object.entries(groups).flatMap(([label,words])=>words.split(' ').map(word=>({label,word})));
    const all=rows.map(row=>row.word);
    const questions=rows.map((row,index)=>{
      const wrong=rows.filter(item=>item.label!==row.label).map(item=>item.word);
      const prompt=skill==='short vowel'||skill==='long vowel'
        ? `Which word has the ${row.label} sound?`
        : skill==='ending letters' ? `Which word ends with ${row.label}?` : `Which word begins with ${row.label}?`;
      return single(prompt,row.word,wrong,index);
    });
    questions[24]={type:'drag',q:`Match each word to its ${skill}.`,audio:`Match each word to its ${skill}.`,pairs:Object.entries(groups).slice(0,4).map(([label,words],index)=>({word:words.split(' ')[index],match:label}))};
    add(`g1:eng:${id}`,name,questions);
  }

  const pairLessons=[
    ['compound-words','Make Compound Words','Which word joins {left} and {right}?','sun+flower rain+bow snow+man foot+ball play+ground tooth+brush bed+room bath+tub pan+cake mail+box star+fish sea+shell fire+fly cup+cake moon+light day+light butter+fly book+mark dog+house bird+house tree+house air+plane back+pack rain+coat snow+ball',pair=>pair[0]+pair[1]],
    ['contractions','Read Contractions','Which contraction means {left}?',"I am|I'm;you are|you're;we are|we're;they are|they're;he is|he's;she is|she's;it is|it's;that is|that's;what is|what's;who is|who's;do not|don't;does not|doesn't;did not|didn't;is not|isn't;are not|aren't;was not|wasn't;were not|weren't;cannot|can't;will not|won't;I will|I'll;you will|you'll;we will|we'll;I have|I've;we have|we've;let us|let's",null],
    ['plural-words','One and More Than One','What word means more than one {left}?','cat|cats;dog|dogs;book|books;apple|apples;tree|trees;bird|birds;car|cars;kite|kites;cup|cups;box|boxes;bus|buses;dish|dishes;fox|foxes;bench|benches;wish|wishes;class|classes;glass|glasses;brush|brushes;church|churches;baby|babies;puppy|puppies;city|cities;berry|berries;story|stories;lady|ladies',null],
    ['opposite-words','Opposite Words','Which word means the opposite of {left}?','hot|cold;big|small;up|down;happy|sad;fast|slow;day|night;open|closed;wet|dry;full|empty;in|out;near|far;soft|hard;light|dark;young|old;early|late;high|low;front|back;clean|dirty;rich|poor;quiet|loud;start|finish;above|below;left|right;rough|smooth;awake|asleep',null]
  ];
  for(const [id,name,prompt,raw,build] of pairLessons){
    const rows=raw.includes(';')?raw.split(';').map(item=>item.split('|')):raw.split(' ').map(item=>item.split('+'));
    const answers=rows.map(row=>build?build(row):row[1]);
    const questions=rows.map((row,index)=>single(prompt.replace('{left}',row[0]).replace('{right}',row[1]),answers[index],answers,index));
    questions[24]={type:'drag',q:'Match each pair.',audio:'Match each pair.',pairs:rows.slice(20,24).map((row,index)=>({word:build?`${row[0]} + ${row[1]}`:row[0],match:answers[20+index]}))};
    add(`g1:eng:${id}`,name,questions);
  }
  const syllables='cat:1 dog:1 sun:1 fish:1 book:1 tree:1 ball:1 ship:1 frog:1 cake:1 apple:2 rabbit:2 pencil:2 table:2 flower:2 kitten:2 window:2 yellow:2 basket:2 paper:2 banana:3 butterfly:3 elephant:3 tomato:3 umbrella:3'.split(' ').map(item=>item.split(':'));
  add('g1:eng:syllable-beats','Count Word Beats',syllables.map(([word,count],index)=>single(`Clap the word ${word}. How many syllables do you hear?`,count,['1','2','3','4'],index)));

  const grammarRows=[
    ['playful','dog','runs'],['small','bird','sings'],['green','frog','hops'],['bright','sun','shines'],['fluffy','cat','sleeps'],
    ['happy','child','laughs'],['red','kite','flies'],['tiny','mouse','hides'],['yellow','bus','stops'],['brown','horse','gallops'],
    ['quiet','baby','rests'],['blue','fish','swims'],['tall','tree','grows'],['busy','bee','buzzes'],['soft','puppy','barks'],
    ['round','ball','rolls'],['white','cloud','floats'],['quick','rabbit','jumps'],['gentle','duck','paddles'],['shiny','star','twinkles'],
    ['warm','fire','glows'],['little','ant','crawls'],['purple','flower','blooms'],['brave','lion','roars'],['slow','turtle','walks']
  ];
  for(const [id,name,position,label] of [
    ['naming-words','Find Naming Words',1,'naming word'],
    ['action-words','Find Action Words',2,'action word'],
    ['describing-words','Find Describing Words',0,'describing word']
  ]){
    const questions=grammarRows.map((row,index)=>single(`The ${row[0]} ${row[1]} ${row[2]}. Which is the ${label}?`,row[position],[...row,'the'],index));
    questions[24]={type:'drag',q:`Match each sentence to its ${label}.`,audio:`Match each sentence to its ${label}.`,pairs:grammarRows.slice(20,24).map(row=>({word:`The ${row[0]} ${row[1]} ${row[2]}.`,match:row[position]}))};
    add(`g1:eng:${id}`,name,questions);
  }
  const pronounRows=[
    ['Ava','she','reads a book'],['Ben','he','rides a bike'],['the puppies','they','play outside'],['the ball','it','rolls away'],['Mia and I','we','sing together'],
    ['Dad','he','cooks dinner'],['Mom','she','waters plants'],['the birds','they','fly south'],['the kite','it','flies high'],['Leo and I','we','draw pictures'],
    ['Nina','she','opens the door'],['Sam','he','kicks the ball'],['the cats','they','nap here'],['the bus','it','stops now'],['Owen and I','we','walk home'],
    ['Grandma','she','tells stories'],['Grandpa','he','plants seeds'],['the children','they','read quietly'],['the clock','it','ticks softly'],['Ana and I','we','make lunch'],
    ['Lily','she','plays piano'],['Eli','he','feeds the fish'],['the ducks','they','swim together'],['the rain','it','falls gently'],['Zoe and I','we','build a fort']
  ];
  add('g1:eng:pronouns','Use Pronouns',pronounRows.map(([subject,answer,action],index)=>single(`${subject} ${action}. Which pronoun can replace ${subject}?`,answer,['he','she','they','it','we'],index)));
  const punctuationRows=[
    ['Where is my hat','?'],['The dog is asleep','.'],['Watch out','!'],['Can you help me','?'],['I like this book','.'],
    ['What a great surprise','!'],['Who has the blue crayon','?'],['We walk to school','.'],['Hooray, we won','!'],['Is the bus here','?'],
    ['The sky is blue','.'],['Stop right there','!'],['When will we eat','?'],['My sister can swim','.'],['That is amazing','!'],
    ['Why is the frog jumping','?'],['The apple is red','.'],['I am so excited','!'],['Do you see the bird','?'],['The sun is warm','.'],
    ['What a huge cake','!'],['Where did the kitten go','?'],['Dad reads a story','.'],['Look at that rainbow','!'],['Are you ready','?']
  ];
  add('g1:eng:sentence-marks','Sentence End Marks',punctuationRows.map(([sentence,answer],index)=>single(`Which mark belongs at the end? ${sentence}___`,answer,['.','?','!',','],index)));

  const stories=[
    ['Ava','garden','plant a seed','she dug a small hole','she covered the seed with soil'],
    ['Ben','library','find a dinosaur book','he asked the librarian for help','he read the book at a table'],
    ['Mia','park','fly a kite','she tied the string to the kite','she ran until the kite rose'],
    ['Leo','kitchen','make a sandwich','he put cheese on the bread','he closed the sandwich'],
    ['Nina','beach','build a sandcastle','she filled a bucket with sand','she turned the bucket upside down'],
    ['Sam','pond','watch the ducks','he sat quietly on a bench','he counted three ducklings'],
    ['Lily','classroom','paint a picture','she dipped her brush in blue paint','she painted a bright sky'],
    ['Owen','backyard','feed the birds','he filled a feeder with seeds','he watched a sparrow eat'],
    ['Zoe','playground','learn to swing','she held the chains tightly','she pushed her feet forward'],
    ['Eli','farm','pick apples','he carried a small basket','he placed red apples inside'],
    ['Ivy','bakery','buy a muffin','she looked at the tray','she chose a blueberry muffin'],
    ['Noah','museum','see a big whale model','he followed the blue signs','he looked up at the whale'],
    ['Emma','aquarium','watch the fish','she stood by the glass','she spotted a yellow fish'],
    ['Max','soccer field','practice kicking','he set the ball on the grass','he kicked it toward the goal'],
    ['Ruby','flower shop','choose a bouquet','she smelled the flowers','she picked yellow daisies'],
    ['Finn','bus stop','ride to school','he waited beside his dad','he stepped onto the bus'],
    ['Ada','pet store','choose fish food','she read the food labels','she bought a small bag'],
    ['Kai','hill','ride a sled','he sat on the red sled','he slid down the snowy slope'],
    ['June','orchard','collect pears','she reached for a ripe pear','she put it in her basket'],
    ['Tara','art room','make a paper bird','she folded a sheet of paper','she drew two wings'],
    ['Jude','pool','learn to float','he held the pool edge','he stretched out on the water'],
    ['Wren','trail','look for butterflies','she walked past tall flowers','she saw a blue butterfly'],
    ['Omar','garage','fix a toy truck','he found a loose wheel','he pressed the wheel into place'],
    ['Pia','market','choose fresh fruit','she checked the fruit baskets','she picked two ripe peaches'],
    ['Rex','music room','play a drum','he picked up two drumsticks','he tapped a steady beat']
  ];
  const storySkills=[
    ['story-characters','Find Story Characters','Who is the story about?',0],
    ['story-settings','Find Story Settings','Where does the story happen?',1],
    ['story-first','What Happened First?','What happened first?',3],
    ['story-next','What Happened Next?','What happened next?',4],
    ['story-purpose','Why Did They Go?','Why did the character go there?',2]
  ];
  for(const [id,name,prompt,position] of storySkills){
    const pool=stories.map(row=>row[position]);
    const questions=stories.map((row,index)=>{
      const [who,where,purpose,first,next]=row;
      const passage=`${who} went to the ${where} to ${purpose}. First, ${first}. Then, ${next}.`;
      return single(`${passage}\n${prompt}`,row[position],pool,index);
    });
    add(`g1:eng:${id}`,name,questions);
  }
  window.K12_G1_ENGLISH_MORE_KEYS=[...phonics.map(([id])=>id),...pairLessons.map(([id])=>id),'syllable-beats','naming-words','action-words','describing-words','pronouns','sentence-marks',...storySkills.map(([id])=>id)];
})();
