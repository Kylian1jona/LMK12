/* Focused Pre-K and Grade 1 lesson banks requested for the early-grade menus. */
(function(){
  const banks=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);

  function choices(answer,pool,index){
    const values=[String(answer),...pool.map(String).filter(value=>value!==String(answer))].filter((value,pos,list)=>list.indexOf(value)===pos).slice(0,4);
    const shift=index%values.length;
    return values.slice(shift).concat(values.slice(0,shift));
  }
  function question(prompt,answer,pool,index,audio=prompt){
    return {type:"mc",q:prompt,choices:choices(answer,pool,index),answer:String(answer),audio};
  }
  const promptLeads=[
    "Let's begin:","Look closely:","Your turn:","Think about this:","Try this one:",
    "Show what you know:","Take a careful look:","Here is a new clue:","Use the skill you learned:","Choose with care:",
    "Ready for the next one?", "Keep going:","Check each choice:","Listen and think:","Solve this step:",
    "You are doing well:","Try a fresh example:","Focus on the key detail:","Use your best thinking:","Look for the pattern:",
    "Apply the idea:","Work this one out:","Pick the answer that fits:","One more challenge:","Finish strong:"
  ];
  function addBank(key,name,factory){
    const questions=Array.from({length:25},(_,index)=>{
      const item=factory(index);
      item.q=`${promptLeads[index]} ${item.q}`;
      item.audio=`${promptLeads[index]} ${item.audio}`;
      return item;
    });
    banks[key]={name,questions};
  }
  function numberChoices(answer,index,limit=100){
    const candidates=[answer-1,answer+1,answer+2,Math.max(0,answer-2)].filter(value=>value>=0&&value<=limit);
    return choices(answer,candidates,index);
  }
  function numberQuestion(prompt,answer,index,limit=100,audio=prompt){
    return {type:"mc",q:prompt,choices:numberChoices(answer,index,limit),answer:String(answer),audio};
  }

  const colorFacts=[
    ["a ripe strawberry","red"],["the sun in a simple drawing","yellow"],["grass","green"],["a clear daytime sky","blue"],["a pumpkin","orange"],
    ["a grape","purple"],["snow","white"],["a tire","black"],["a pig's nose in a cartoon","pink"],["a tree trunk","brown"],
    ["a stop sign","red"],["a lemon","yellow"],["a frog","green"],["the ocean in a picture","blue"],["a carrot","orange"],
    ["a plum","purple"],["milk","white"],["the night sky","black"],["cotton candy","pink"],["a bear's fur","brown"],
    ["a red fire truck","red"],["a yellow school bus","yellow"],["a green leaf","green"],["a blue rain boot","blue"],["an orange basketball","orange"]
  ];
  const colorPool=["red","yellow","green","blue","orange","purple","white","black","pink","brown"];
  addBank("prek:general:colors","Identify Colors",index=>{
    const [item,answer]=colorFacts[index];
    return question(`What color is ${item}?`,answer,colorPool.slice(index%6,index%6+5),index);
  });

  function addCountingBank(key,name,limit){
    addBank(key,name,index=>{
      const answer=index%limit+1;
      const mode=index%3;
      if(mode===0) return numberQuestion(`Count from 1. Which number do you say when you reach ${answer}?`,answer,index,limit);
      if(mode===1){
        const before=Math.max(0,answer-1);
        return numberQuestion(`What number comes after ${before}?`,answer,index,limit);
      }
      const start=Math.max(1,answer-2);
      return numberQuestion(`Fill in the blank: ${start}, ${start+1}, __.`,start+2,index,limit);
    });
  }
  addCountingBank("prek:math:count5","Count to 5",5);
  addCountingBank("prek:math:count10","Count to 10",10);

  const countIcons=["●","★","■","▲","♥"];
  addBank("prek:math:number-objects","Match Numbers to Objects",index=>{
    const amount=index%10+1;
    const icon=countIcons[index%countIcons.length];
    return numberQuestion(`Count the objects and pick the number: ${Array(amount).fill(icon).join(" ")}`,amount,index,10,`Count the ${amount===1?"object":"objects"}. Which number matches the group?`);
  });

  addBank("prek:math:more-less","More or Less",index=>{
    let left=index%9+1;
    let right=(index*2+3)%9+1;
    if(left===right) right=right===9?8:right+1;
    const asksMore=index%2===0;
    const answer=asksMore?Math.max(left,right):Math.min(left,right);
    return numberQuestion(`Which number is ${asksMore?"more":"less"}: ${left} or ${right}?`,answer,index,10);
  });

  const sameDifferentPairs=[
    ["red ball and red ball","Same"],["cat and dog","Different"],["small star and small star","Same"],["blue cup and green cup","Different"],["two dots and two dots","Same"],
    ["big box and small box","Different"],["sun and sun","Same"],["hat and sock","Different"],["round plate and round plate","Same"],["one apple and two apples","Different"]
  ];
  addBank("prek:general:same-different","Same or Different",index=>{
    const [pair,answer]=sameDifferentPairs[index%sameDifferentPairs.length];
    return question(`Look at this pair: ${pair}. Are they the same or different?`,answer,["Same","Different","I cannot tell"],index);
  });

  const sizeFacts=[
    ["An elephant next to a mouse","Big"],["A mouse next to an elephant","Small"],["A bus next to a bike","Big"],["A pea next to a pumpkin","Small"],["A tree next to a flower","Big"],
    ["A button next to a plate","Small"],["A bear next to a bee","Big"],["A cup next to a tub","Small"],["A bed next to a sock","Big"],["A seed next to a melon","Small"]
  ];
  addBank("prek:general:big-small","Big and Small",index=>{
    const [clue,answer]=sizeFacts[index%sizeFacts.length];
    return question(`${clue}: which size word fits the first thing?`,answer,["Big","Small","Same size","Long"],index);
  });

  const positionFacts=[
    ["A bird is over a nest","Above"],["A rug is under a bed","Below"],["A cloud is over a hill","Above"],["Shoes sit under a chair","Below"],["A lamp hangs over a desk","Above"],
    ["A cat naps under a table","Below"],["A kite flies over a tree","Above"],["A mat lies under a cup","Below"],["The sun is over the roof","Above"],["A ball rolls under the bench","Below"]
  ];
  addBank("prek:general:above-below","Above and Below",index=>{
    const [clue,answer]=positionFacts[index%positionFacts.length];
    return question(`${clue}. Is the first thing above or below the second thing?`,answer,["Above","Below","Beside","Inside"],index);
  });

  const patterns=[
    ["red, blue, red, blue","red"],["circle, square, circle, square","circle"],["1, 2, 1, 2","1"],["big, small, big, small","big"],["clap, tap, clap, tap","clap"],
    ["sun, moon, sun, moon","sun"],["A, B, A, B","A"],["green, green, yellow, green, green, yellow","green"],["cat, dog, cat, dog","cat"],["up, down, up, down","up"]
  ];
  addBank("prek:math:patterns","Patterns",index=>{
    const [pattern,answer]=patterns[index%patterns.length];
    return question(`What comes next? ${pattern}, __.`,answer,[answer,"blue","square","down","yellow"],index);
  });

  const alphabet="abcdefghijklmnopqrstuvwxyz".split("");
  addBank("prek:eng:lowercase","Identify Lowercase Letters",index=>{
    const answer=alphabet[index];
    const pool=[alphabet[(index+1)%26],alphabet[(index+4)%26],alphabet[(index+9)%26]];
    return question(`Tap the lowercase letter ${answer}.`,answer,pool,index,`Find the lowercase letter ${answer}.`);
  });
  addBank("prek:eng:match-case","Match Uppercase and Lowercase Letters",index=>{
    const lower=alphabet[index];
    const upper=lower.toUpperCase();
    const pool=[alphabet[(index+1)%26],alphabet[(index+5)%26],alphabet[(index+11)%26]];
    return question(`Which lowercase letter matches ${upper}?`,lower,pool,index);
  });

  const animalFacts=[
    ["says meow and has whiskers","cat"],["barks and may wag its tail","dog"],["has a trunk and large ears","elephant"],["has black and white stripes","zebra"],["hops and has long ears","rabbit"],
    ["lives in water and has fins","fish"],["has feathers and can lay eggs","bird"],["says moo on a farm","cow"],["has a long neck and spots","giraffe"],["swims and says quack","duck"],
    ["is pink and says oink","pig"],["has a mane and can roar","lion"],["climbs trees and likes nuts","squirrel"],["moves slowly with a shell","turtle"],["buzzes and makes honey","bee"],
    ["has eight arms and lives in the sea","octopus"],["croaks and hops by a pond","frog"],["has wool and says baa","sheep"],["can swing through trees","monkey"],["has claws and walks sideways","crab"],
    ["is a pet that can chirp","bird"],["pulls a wagon and says neigh","horse"],["has a pouch for its baby","kangaroo"],["is black and white and likes cold ice","penguin"],["spins a web with eight legs","spider"]
  ];
  const animalPool=animalFacts.map(item=>item[1]);
  addBank("prek:general:animals","Identify Animals",index=>{
    const [clue,answer]=animalFacts[index];
    return question(`Which animal ${clue}?`,answer,animalPool.slice((index+3)%18).concat(animalPool),index);
  });

  const bodyFacts=[
    ["see","eyes"],["hear","ears"],["smell","nose"],["taste","tongue"],["clap","hands"],
    ["walk","feet"],["bend your arm","elbow"],["bend your leg","knee"],["hold up your head","neck"],["chew food","teeth"],
    ["hug a pal","arms"],["kick a ball","foot"],["wink","eye"],["snap","fingers"],["stand tall","legs"],
    ["wear a hat","head"],["wear a ring","finger"],["wear a sock","foot"],["carry a backpack","back"],["smile","mouth"],
    ["nod yes","head"],["listen to music","ears"],["pick up a cup","hand"],["run","legs"],["blink","eyes"]
  ];
  const bodyPool=["eyes","ears","nose","tongue","hands","feet","elbow","knee","neck","teeth","arms","foot","eye","fingers","legs","head","finger","back","mouth","hand"];
  addBank("prek:general:body-parts","Identify Body Parts",index=>{
    const [action,answer]=bodyFacts[index];
    return question(`Which body part helps you ${action}?`,answer,bodyPool.slice((index+4)%16).concat(bodyPool),index);
  });

  const weatherFacts=[
    ["The sun is bright and there are few clouds","sunny"],["Drops fall from gray clouds","rainy"],["White flakes fall and the ground is cold","snowy"],["Trees sway and leaves blow","windy"],["The sky is full of gray clouds","cloudy"],
    ["You need boots and an umbrella","rainy"],["A kite flies high in a strong breeze","windy"],["You wear mittens and make a snow pal","snowy"],["You need shade and a sun hat","sunny"],["Dark clouds cover the sun","cloudy"]
  ];
  const weatherPool=["sunny","rainy","snowy","windy","cloudy"];
  addBank("prek:general:weather","Weather",index=>{
    const [clue,answer]=weatherFacts[index%weatherFacts.length];
    return question(`${clue}. What is the weather?`,answer,weatherPool,index);
  });

  const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  addBank("prek:general:days-week","Days of the Week",index=>{
    const dayIndex=index%7;
    const asksAfter=index%2===0;
    const answer=days[(dayIndex+(asksAfter?1:6))%7];
    return question(`Which day comes ${asksAfter?"after":"before"} ${days[dayIndex]}?`,answer,days.slice(dayIndex+2).concat(days),index);
  });

  const daypartFacts=[
    ["The sun comes up and you eat breakfast","Morning"],["You eat lunch and the sun is high","Afternoon"],["The sun begins to set and many families eat dinner","Evening"],["The sky is dark and you sleep","Night"],
    ["You wake up and get dressed","Morning"],["You play after lunch","Afternoon"],["You watch the sunset","Evening"],["You see stars and the moon","Night"],
    ["A new day starts","Morning"],["It is past noon but not yet dinner","Afternoon"],["Daylight grows dim","Evening"],["Most people rest in bed","Night"]
  ];
  addBank("prek:general:day-parts","Morning, Afternoon, Evening, and Night",index=>{
    const [clue,answer]=daypartFacts[index%daypartFacts.length];
    return question(`${clue}. What part of the day is it?`,answer,["Morning","Afternoon","Evening","Night"],index);
  });

  addBank("g1:math:count100","Count to 100",index=>{
    const start=(index*4)%96+1;
    const mode=index%3;
    if(mode===0) return numberQuestion(`What number comes after ${start}?`,start+1,index,100);
    if(mode===1) return numberQuestion(`What number comes before ${start+1}?`,start,index,100);
    return numberQuestion(`Fill in the blank: ${start}, ${start+1}, __.`,start+2,index,100);
  });

  function addSkipCountBank(key,name,step){
    addBank(key,name,index=>{
      const start=(index%10)*step;
      const answer=start+step*3;
      return numberQuestion(`Skip count by ${step}: ${start}, ${start+step}, ${start+step*2}, __.`,answer,index,120);
    });
  }
  addSkipCountBank("g1:math:skip2","Skip Count by 2s",2);
  addSkipCountBank("g1:math:skip5","Skip Count by 5s",5);
  addSkipCountBank("g1:math:skip10","Skip Count by 10s",10);

  function addAdditionBank(key,name,limit){
    addBank(key,name,index=>{
      const a=index%(limit===10?6:11);
      const b=(index*3+2)%(limit-a+1);
      const answer=a+b;
      return numberQuestion(`What is ${a} + ${b}?`,answer,index,limit);
    });
  }
  function addSubtractionBank(key,name,limit){
    addBank(key,name,index=>{
      const whole=index%(limit-1)+2;
      const take=(index*3+1)%(whole+1);
      const answer=whole-take;
      return numberQuestion(`What is ${whole} - ${take}?`,answer,index,limit);
    });
  }
  addAdditionBank("g1:math:add10","Addition Within 10",10);
  addAdditionBank("g1:math:add20","Addition Within 20",20);
  addSubtractionBank("g1:math:sub10","Subtraction Within 10",10);
  addSubtractionBank("g1:math:sub20","Subtraction Within 20",20);

  addBank("g1:math:compare","Compare Numbers",index=>{
    const left=(index*7)%51;
    const right=index%5===0?left:(index*3+11)%51;
    const answer=left===right?"equal to":left>right?"greater than":"less than";
    return question(`${left} is ___ ${right}.`,answer,["greater than","less than","equal to","one more than"],index);
  });

  addBank("g1:math:place-value","Place Value — Tens and Ones",index=>{
    const number=(index*3)%90+10;
    const tens=Math.floor(number/10);
    const ones=number%10;
    if(index%2===0) return numberQuestion(`How many tens are in ${number}?`,tens,index,10);
    return numberQuestion(`How many ones are in ${number}?`,ones,index,10);
  });

  const shapeFacts=[
    ["has 3 straight sides and 3 corners","triangle"],["has 4 equal sides and 4 corners","square"],["is round with no sides or corners","circle"],["has 4 sides with opposite sides equal","rectangle"],["has 5 sides","pentagon"],
    ["has 6 sides","hexagon"],["can roll and has no flat face","sphere"],["has 6 square faces","cube"],["has two round flat faces and can roll","cylinder"],["has one round base and one point","cone"]
  ];
  const shapePool=shapeFacts.map(item=>item[1]);
  addBank("g1:math:shape-properties","Basic Shapes and Their Properties",index=>{
    const [clue,answer]=shapeFacts[index%shapeFacts.length];
    return question(`Which shape ${clue}?`,answer,shapePool.slice((index+2)%7).concat(shapePool),index);
  });

  const measurementFacts=[
    ["Which tool can measure the length of a desk?","ruler",["scale","clock","cup"]],["Which tool can measure how heavy a bag is?","scale",["ruler","clock","thermometer"]],
    ["Which unit is best for the length of a pencil?","inches",["gallons","hours","pounds"]],["Which word means not as heavy?","lighter",["heavier","longer","taller"]],
    ["Which container holds more: a cup or a tub?","tub",["cup","spoon","both hold the same"]],["Which word describes a tall tree next to a short bush?","taller",["shorter","lighter","empty"]],
    ["Which tool tells temperature?","thermometer",["ruler","scale","clock"]],["Which unit is best for the height of a door?","feet",["cups","minutes","pounds"]]
  ];
  addBank("g1:math:measurement","Simple Measurement",index=>{
    const [prompt,answer,pool]=measurementFacts[index%measurementFacts.length];
    return question(prompt,answer,pool,index);
  });

  addBank("g1:math:time","Tell Time to the Hour and Half Hour",index=>{
    const hour=index%12+1;
    const half=index%2===1;
    const answer=`${hour}:${half?"30":"00"}`;
    const otherHour=hour===12?1:hour+1;
    return question(`The minute hand points to ${half?"6":"12"}, and the hour hand is ${half?`between ${hour} and ${otherHour}`:`on ${hour}`}. What time is it?`,answer,[`${otherHour}:${half?"30":"00"}`,`${hour}:${half?"00":"30"}`,`${otherHour}:${half?"00":"30"}`],index);
  });

  const shortVowelWords=[["cat","a"],["bed","e"],["pig","i"],["fox","o"],["sun","u"],["map","a"],["hen","e"],["sit","i"],["log","o"],["cup","u"],["jam","a"],["net","e"],["fin","i"],["top","o"],["bug","u"],["cap","a"],["red","e"],["zip","i"],["mop","o"],["rug","u"],["van","a"],["web","e"],["kid","i"],["pot","o"],["hut","u"]];
  addBank("g1:eng:short-vowels","Short Vowel Sounds",index=>{
    const [word,answer]=shortVowelWords[index];
    return question(`Which vowel makes the middle sound in ${word}?`,answer,["a","e","i","o","u"],index);
  });

  const longVowelWords=[["cake","a"],["seed","e"],["kite","i"],["home","o"],["cube","u"],["rain","a"],["feet","e"],["bike","i"],["boat","o"],["mule","u"],["game","a"],["leaf","e"],["five","i"],["rope","o"],["tune","u"],["day","a"],["team","e"],["light","i"],["snow","o"],["music","u"],["gate","a"],["beach","e"],["pie","i"],["road","o"],["flute","u"]];
  addBank("g1:eng:long-vowels","Long Vowel Sounds",index=>{
    const [word,answer]=longVowelWords[index];
    return question(`Which vowel says its name in ${word}?`,answer,["a","e","i","o","u"],index);
  });

  const grammarWords=[["cat","Noun"],["run","Verb"],["red","Adjective"],["teacher","Noun"],["jump","Verb"],["soft","Adjective"],["park","Noun"],["sing","Verb"],["tiny","Adjective"],["book","Noun"],["clap","Verb"],["happy","Adjective"],["dog","Noun"],["swim","Verb"],["fast","Adjective"],["school","Noun"],["write","Verb"],["warm","Adjective"],["friend","Noun"],["skip","Verb"],["green","Adjective"],["apple","Noun"],["help","Verb"],["big","Adjective"],["bird","Noun"]];
  addBank("g1:eng:parts-speech","Nouns, Verbs, and Adjectives",index=>{
    const [word,answer]=grammarWords[index];
    return question(`What kind of word is “${word}”?`,answer,["Noun","Verb","Adjective","Sentence"],index);
  });

  const shortStories=[
    {text:"Ben found a wet pup by the bus stop. He called his dad, and they read the tag. They took the pup home to Mia.",qas:[["Who found the pup?","Ben",["Mia","Dad","The bus driver"]],["Where was the pup?","By the bus stop",["In a shop","At school","On a farm"]],["What was on the pup?","A tag",["A hat","A bell","A red sock"]],["Who went with Ben?","His dad",["His teacher","His sister","His coach"]],["How did the story end?","The pup went home to Mia",["The pup got on a bus","Ben kept the pup hidden","The pup ran into a shop"]]]},
    {text:"Liv had six seeds. She put them in a pot and set it in the sun. She gave the soil a little water. Soon, three green stems came up.",qas:[["How many seeds did Liv have?","Six",["Three","Ten","One"]],["Where did she put them?","In a pot",["In a cup","In a bag","On a rug"]],["What did she give the soil?","Water",["Milk","Sand","Jam"]],["Where did she set the pot?","In the sun",["Under a bed","In a dark box","By a sink"]],["What came up?","Three green stems",["Six red flowers","One tall tree","A small bug"]]]},
    {text:"Max took a red kite to the hill. A gust sent it into a low tree. Max asked a park worker for help. The worker used a long pole to get it down.",qas:[["What did Max bring?","A red kite",["A blue ball","A toy boat","A green flag"]],["Where did Max go?","The hill",["The pond","The shop","The farm"]],["What moved the kite?","A gust",["A dog","A bus","A bird"]],["Who helped Max?","A park worker",["A vet","A cook","A mail carrier"]],["What tool did the worker use?","A long pole",["A net","A pan","A rope swing"]]]},
    {text:"Nia made a card for her gran. She drew a pink flower and wrote a kind note. Gran put the card by her bed and smiled each time she saw it.",qas:[["Who made the card?","Nia",["Gran","Ben","Max"]],["Who got the card?","Gran",["Nia's teacher","A park worker","Her friend"]],["What did Nia draw?","A pink flower",["A red bus","A green frog","A big house"]],["Where did Gran put it?","By her bed",["In the bin","Under a rug","On the bus"]],["How did the card make Gran feel?","Happy",["Mad","Scared","Cold"]]]},
    {text:"A frog sat on a log by the pond. It saw a small bug zip past. The frog made one quick hop, but the bug hid under a leaf. The frog went back to its sunny log.",qas:[["What sat on the log?","A frog",["A bug","A duck","A fish"]],["Where was the log?","By the pond",["In a class","On a bus","By a shop"]],["What went past?","A small bug",["A red kite","A cat","A boat"]],["Where did the bug hide?","Under a leaf",["In a cup","On the log","By a shoe"]],["Where did the frog go at the end?","Back to the log",["Into a house","Up a tree","Onto a bus"]]]}
  ];
  addBank("g1:eng:story-questions","Read a Short Story and Answer Questions",index=>{
    const story=shortStories[Math.floor(index/5)];
    const [ask,answer,pool]=story.qas[index%5];
    return question(`${story.text} ${ask}`,answer,pool,index,`${story.text} ${ask}`);
  });
})();
