/* Ten Kindergarten reading and math lessons, 25 questions each. */
(function(){
  const banks=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  function choice(prompt,answer,wrong,index){
    const correct=String(answer);
    const options=[...new Set([correct,...wrong.map(String)])].slice(0,4);
    const offset=index%options.length;
    return {type:"mc",q:prompt,audio:prompt,choices:options.slice(offset).concat(options.slice(0,offset)),answer:correct};
  }
  function number(prompt,answer,index,max=30){
    const wrong=[answer-2,answer-1,answer+1,answer+2,answer+3].filter(value=>value>=0&&value<=max&&value!==answer);
    return choice(prompt,answer,wrong,index);
  }
  function add(key,name,items,make){
    if(banks[key]) throw Error(`Duplicate Kindergarten lesson: ${key}`);
    if(items.length!==25) throw Error(`${key} needs 25 questions`);
    banks[key]={name,questions:items.map((item,index)=>make(item,index))};
  }

  const blends=[
    ["blue","bl"],["black","bl"],["block","bl"],["clap","cl"],["clock","cl"],
    ["cloud","cl"],["flag","fl"],["flower","fl"],["flip","fl"],["glass","gl"],
    ["glove","gl"],["glad","gl"],["play","pl"],["plant","pl"],["plug","pl"],
    ["slide","sl"],["sleep","sl"],["slow","sl"],["smile","sm"],["small","sm"],
    ["snail","sn"],["snow","sn"],["star","st"],["stop","st"],["step","st"]
  ];
  add("k:eng:initial-blends","Beginning Blends",blends,([word,blend],i)=>choice(`Which two letters begin the word ${word}?`,blend,["br","cr","fl","pl","sn","st"].filter(x=>x!==blend).slice(i%2,i%2+3),i));

  const families=[
    ["cat","-at"],["hat","-at"],["bat","-at"],["mat","-at"],["sat","-at"],
    ["dog","-og"],["log","-og"],["fog","-og"],["hog","-og"],["jog","-og"],
    ["sun","-un"],["run","-un"],["fun","-un"],["bun","-un"],["gun","-un"],
    ["pin","-in"],["win","-in"],["fin","-in"],["tin","-in"],["bin","-in"],
    ["hop","-op"],["mop","-op"],["top","-op"],["pop","-op"],["cop","-op"]
  ];
  const endings=["-at","-og","-un","-in","-op"];
  add("k:eng:word-families","Word Families",families,([word,ending],i)=>choice(`Which ending do you hear in ${word}?`,ending,endings.filter(x=>x!==ending).slice(i%2,i%2+3),i));

  const opposites=[
    ["hot","cold"],["big","small"],["up","down"],["in","out"],["happy","sad"],
    ["fast","slow"],["tall","short"],["wet","dry"],["open","closed"],["day","night"],
    ["full","empty"],["light","dark"],["soft","hard"],["clean","dirty"],["near","far"],
    ["first","last"],["quiet","loud"],["young","old"],["above","below"],["front","back"],
    ["inside","outside"],["high","low"],["thick","thin"],["smooth","rough"],["early","late"]
  ];
  const oppositeWrong=["round","green","sweet","warm","tiny","bright","soft","slow","long","wide"];
  add("k:eng:opposites","Opposite Words",opposites,([word,answer],i)=>choice(`What is the opposite of ${word}?`,answer,[oppositeWrong[i%10],oppositeWrong[(i+3)%10],oppositeWrong[(i+6)%10]].filter(x=>x!==answer),i));

  const actions=[
    ["The dog runs in the yard.","runs","dog","yard"],["Mia jumps over a log.","jumps","Mia","log"],
    ["The bird sings in the tree.","sings","bird","tree"],["Dad cooks our lunch.","cooks","Dad","lunch"],
    ["The baby crawls on the rug.","crawls","baby","rug"],["A fish swims in the pond.","swims","fish","pond"],
    ["Lee paints a red sun.","paints","Lee","sun"],["The cat sleeps on the mat.","sleeps","cat","mat"],
    ["Kim reads a book.","reads","Kim","book"],["A bee buzzes near a flower.","buzzes","bee","flower"],
    ["Sam kicks the ball.","kicks","Sam","ball"],["The duck walks to the lake.","walks","duck","lake"],
    ["Ana writes her name.","writes","Ana","name"],["The frog hops on a rock.","hops","frog","rock"],
    ["Mom washes the cup.","washes","Mom","cup"],["A horse trots across the field.","trots","horse","field"],
    ["The child laughs at the joke.","laughs","child","joke"],["Ben builds a tall tower.","builds","Ben","tower"],
    ["A mouse hides under the chair.","hides","mouse","chair"],["The wind blows the leaves.","blows","wind","leaves"],
    ["Nia draws a star.","draws","Nia","star"],["The rabbit digs in the dirt.","digs","rabbit","dirt"],
    ["Grandpa waves at us.","waves","Grandpa","us"],["The child claps for the song.","claps","child","song"],
    ["A seal dives into the sea.","dives","seal","sea"]
  ];
  add("k:eng:action-words","Find the Action Word",actions,([sentence,verb,noun,other],i)=>choice(`Which word tells the action? ${sentence}`,verb,[noun,other,"the"],i));

  const meaning=[
    ["The red bird sits in a tree.","What color is the bird?","red",["blue","green","yellow"]],
    ["The dog naps on a rug.","Where does the dog nap?","on a rug",["in a box","in a tree","on a bed"]],
    ["Mia puts two apples in a bag.","How many apples are in the bag?","two",["one","three","four"]],
    ["The frog jumps into the pond.","What jumps into the pond?","frog",["duck","fish","cat"]],
    ["Dad makes soup for lunch.","What does Dad make?","soup",["cake","bread","rice"]],
    ["The little cat is under the chair.","Where is the cat?","under the chair",["on the table","by the door","in the yard"]],
    ["Sam wears a blue hat.","What is blue?","hat",["shirt","coat","shoe"]],
    ["A bee lands on a pink flower.","What lands on the flower?","bee",["bird","bug","butterfly"]],
    ["Kim rides a bike to the park.","Where does Kim go?","the park",["the store","the lake","the farm"]],
    ["The sun is bright at noon.","When is the sun bright?","at noon",["at night","at bedtime","at dawn"]],
    ["Ben feeds the fish each morning.","What does Ben feed?","fish",["dog","bird","cat"]],
    ["A duck has three baby ducks.","How many baby ducks are there?","three",["one","two","four"]],
    ["The ball rolls behind the couch.","Where does the ball roll?","behind the couch",["under the desk","out the door","into a box"]],
    ["Nia draws a big star.","What does Nia draw?","star",["moon","sun","heart"]],
    ["The rabbit eats a carrot.","What does the rabbit eat?","carrot",["apple","leaf","berry"]],
    ["Lee wears boots in the rain.","What does Lee wear?","boots",["sandals","slippers","skates"]],
    ["The cow stands by the red barn.","What color is the barn?","red",["blue","white","green"]],
    ["Mom reads a book before bed.","What does Mom read?","a book",["a map","a note","a sign"]],
    ["The puppy sleeps in a basket.","Where does the puppy sleep?","in a basket",["on a rug","in a tent","under a tree"]],
    ["A snail moves slowly on a leaf.","How does the snail move?","slowly",["quickly","loudly","high"]],
    ["Jo picks five yellow flowers.","How many flowers does Jo pick?","five",["two","three","four"]],
    ["The child drinks cold water.","What does the child drink?","water",["milk","juice","tea"]],
    ["A green turtle swims in the lake.","Where does the turtle swim?","in the lake",["in the pool","in the sea","in the river"]],
    ["The kite flies above the house.","What flies above the house?","kite",["bird","plane","balloon"]],
    ["Grandpa plants seeds in spring.","When does Grandpa plant seeds?","in spring",["in summer","in fall","in winter"]]
  ];
  add("k:eng:sentence-meaning","Read and Understand",meaning,([sentence,ask,answer,wrong],i)=>choice(`${sentence} ${ask}`,answer,wrong,i));

  const dotCounts=Array.from({length:25},(_,i)=>({count:1+i%10,group:Math.floor(i/10),index:i}));
  add("k:math:subitize","See Small Groups",dotCounts,({count,group,index})=>{
    const dots=group===0?"● ".repeat(count).trim():group===1?`${"● ".repeat(Math.min(5,count)).trim()}  ${"● ".repeat(Math.max(0,count-5)).trim()}`:`${"● ".repeat(Math.ceil(count/2)).trim()} / ${"● ".repeat(Math.floor(count/2)).trim()}`;
    return number(`How many dots do you see? ${dots}`,count,index,10);
  });
  const comparisons=Array.from({length:25},(_,i)=>[2+i%8,2+(i*3+Math.floor(i/8))%8]);
  add("k:math:compare-groups","Compare Two Groups",comparisons,([left,right],i)=>choice(`Group A has ${left} blocks. Group B has ${right} blocks. Which group has more?`,left>right?"Group A":right>left?"Group B":"They have the same number",["Group A","Group B","They have the same number"],i));

  const shapes=[
    ["triangle","corners",3],["square","corners",4],["rectangle","corners",4],["circle","corners",0],["oval","corners",0],
    ["triangle","straight sides",3],["square","straight sides",4],["rectangle","straight sides",4],["circle","straight sides",0],["oval","straight sides",0],
    ["triangle","curved sides",0],["square","curved sides",0],["rectangle","curved sides",0],["circle","curved sides",1],["oval","curved sides",1],
    ["square","equal sides",4],["rectangle","longer sides",2],["triangle","points",3],["circle","points",0],["oval","points",0],
    ["square","edges",4],["rectangle","edges",4],["triangle","edges",3],["circle","edges",1],["oval","edges",1]
  ];
  add("k:math:shape-attributes","Shape Features",shapes,([shape,feature,answer],i)=>number(`How many ${feature} does a ${shape} have?`,answer,i,5));

  const graphItems=["apples","bananas","pears","cars","trucks","bikes","cats","dogs","birds","red hats","blue hats","green hats","stars","hearts","moons","books","pencils","crayons","flowers","leaves","shells","rocks","buttons","blocks","balls"];
  add("k:math:picture-graphs","Read Picture Graphs",graphItems,(item,i)=>{
    const count=1+(i*3)%8,other=1+(i*5+2)%8;
    return number(`On a picture graph, each picture means one. The ${item} row shows ${"★".repeat(count)}. How many ${item} are there?`,count,i,10);
  });

  const positions=["first","second","third","fourth","fifth"];
  const lineups=[
    ["cat","dog","fish","bird","rabbit"],["red","blue","green","yellow","purple"],
    ["apple","pear","plum","peach","grape"],["bus","car","bike","train","boat"],
    ["sun","moon","star","cloud","rain"],["hat","coat","shoe","sock","glove"],
    ["book","pen","pencil","ruler","eraser"],["cow","pig","sheep","goat","horse"],
    ["cake","pie","cookie","bread","muffin"],["oak","pine","palm","maple","elm"]
  ];
  const ordinalItems=Array.from({length:25},(_,i)=>({line:lineups[Math.floor(i/5)%10],position:i%5,variant:Math.floor(i/5)}));
  add("k:math:ordinal-positions","First Through Fifth",ordinalItems,({line,position,variant},i)=>choice(`Look at the line from left to right: ${line.join(", ")}. What is ${positions[position]}?`,line[position],line.filter(x=>x!==line[position]).slice(variant%2,variant%2+3),i));
})();
