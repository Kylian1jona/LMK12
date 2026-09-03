(function(){
  const grades=[
    ["prek","Pre-K",0],["k","Kindergarten",1],["g1","Grade 1",2],["g2","Grade 2",3],
    ["g3","Grade 3",4],["g4","Grade 4",5],["g5","Grade 5",6],["g6","Grade 6",7],
    ["g7","Grade 7",8],["g8","Grade 8",9],["g9","Grade 9",10],["g10","Grade 10",11],
    ["g11","Grade 11",12],["g12","Grade 12",13]
  ];
  const gradeWorlds=["Button Meadow","Sunbeam Lane","Acorn School","Willow Creek","Copper Hill","Juniper Harbor","Moonstone Park","Redwood Crossing","Glasswater City","Orchard Station","Northwind Province","Ashen Coast","Crown Vale","The Meridian Isles"];
  const heroes=["Mina","Theo","Amara","Jonah","Leila","Caleb","Sana","Eli","Rosa","Noah","Imani","Mateo","Zara","Darius"];
  const earlyClassics=[
    {
      title:"Cinderella",
      genre:"Fairy tale",
      focus:"short a and short i",
      versions:[
        ["A kind girl had a sad day. She did each job. A pal came to help. The girl went to the ball. At last, she had hope."],
        ["A kind girl had to do each hard job. She was sad, but she did not quit. A kind helper gave her a dress for the ball. The girl had fun and ran home on time. Her lost shoe helped a prince find her."],
        ["Cinderella was a kind girl who worked from sunup to bedtime. Even when life felt unfair, she did not let go of hope. A magical helper sent her to a royal ball, but she had to leave before midnight. One small glass shoe helped the prince find her again, and Cinderella began a happier life." ]
      ]
    },
    {
      title:"Jack and the Beanstalk",
      genre:"Fairy tale",
      focus:"short a",
      versions:[
        ["Jack had a bag of beans. The beans fell in the mud. A big stem went up. Jack went up and met a giant. Jack ran back and was safe."],
        ["Jack got a bag of magic beans. A tall green stem grew from the dirt. Jack went up and found a giant in a big home. He had to be quick and brave. Jack came back down and kept his family safe."],
        ["Jack traded for a handful of magic beans. By morning, a huge beanstalk rose above his home. At the top, Jack entered a giant's castle and found treasure that could help his family. He escaped the angry giant by thinking fast. Jack returned safely and learned to use courage with care." ]
      ]
    },
    {
      title:"The Three Little Pigs",
      genre:"Folk tale",
      focus:"short i",
      versions:[
        ["Three pigs had to fix a hut. One hut was soft. One hut was thin. The last pig made a brick hut. The big bad wolf did not get in."],
        ["Three little pigs each made a home. The first used straw, and the next used sticks. The wolf blew both homes down. The last pig made a strong brick home. All three pigs got in, and the wolf could not win."],
        ["Three little pigs set out to build homes of their own. Two pigs rushed, using straw and sticks, but the third worked hard on a brick house. A hungry wolf easily blew down the first two homes. The pigs ran to the brick house, where they were safe. Their careful work and teamwork defeated the wolf." ]
      ]
    },
    {
      title:"Little Red Riding Hood",
      genre:"Cautionary tale",
      focus:"short e",
      versions:[
        ["Red had a red cap. She went on a path to see Gran. A sly wolf ran off. Red did not go with him. Red got help and was safe."],
        ["Red put on her red hood and went to see Gran. Her mom told her to stay on the path. A sly wolf tried to trick her in the woods. Red called for help. A kind adult came, and Red and Gran were safe."],
        ["Little Red Riding Hood carried a basket to her grandmother's cottage. Her mother warned her to stay on the path and not trust strangers. A sly wolf tried to learn where she was going. Red sensed danger and called for help. With a trusted adult beside her, she reached Gran safely and remembered the warning." ]
      ]
    },
    {
      title:"Goldilocks and the Three Bears",
      genre:"Fairy tale",
      focus:"short o",
      versions:[
        ["A girl saw a hut. She got in, had a sip, and sat on a bed. Then three bears got back. The girl said she was sorry and ran home."],
        ["Goldilocks saw a small home in the woods. She went in, ate from a pot, and sat in a chair. Then the three bears came back. Goldilocks knew she had made a bad choice. She said she was sorry and went home."],
        ["Goldilocks entered the bears' cottage without asking. She tasted their food, sat in their chairs, and fell asleep in a bed. When the bear family returned, she woke with a shock. Goldilocks apologized for touching things that were not hers. She went home determined to ask permission next time." ]
      ]
    },
    {
      title:"The Gingerbread Man",
      genre:"Folk tale",
      focus:"short a",
      versions:[
        ["A pan had a tan man. The man got up and ran. A hen ran. A pig ran. The man met a fox. He had to stop and plan."],
        ["A little gingerbread man sprang from a pan. He ran past a hen, a pig, and a cow. At the river, a fox said he could help. The man did not hop on the fox. He made a safe plan and went back home."],
        ["A gingerbread man leaped from the baking pan and dashed away. He bragged as a hen, a pig, and a cow tried to catch him. At a wide river, a clever fox offered him a ride. The gingerbread man recalled that a kind offer is not always a safe one. He stopped, made another plan, and hurried home wiser than before." ]
      ]
    },
    {
      title:"The Little Red Hen",
      genre:"Fable",
      focus:"short e",
      versions:[
        ["A red hen had a seed. She dug and set it in. Her pals did not help. The hen did each job. At last, she had a bun to eat."],
        ["The little red hen found a seed. She asked her pals to help her plant it, but they said no. The hen did each job until the wheat was ready. She made a warm loaf. Her hard work gave her food to share."],
        ["The Little Red Hen found a grain of wheat and asked her friends to help plant it. Each friend refused, so she planted, cut, ground, and baked by herself. When the warm bread was ready, everyone wanted a bite. The hen explained that sharing the work matters too. Her friends promised to help with the next loaf." ]
      ]
    },
    {
      title:"The Lion and the Mouse",
      genre:"Fable",
      focus:"short i",
      versions:[
        ["A big lion met a wee mouse. The lion let him go. Then the lion got in a net. The mouse bit the net. His small pal set him free."],
        ["A lion let a small mouse go free. Soon, the lion got stuck in a net. The mouse came back and bit the rope. Snip, snip, snip! The lion was free. A small pal can be a big help."],
        ["A lion laughed when a tiny mouse promised to help him someday. Still, the lion kindly let the mouse go. Later, hunters trapped the lion in a strong net. The mouse heard his roar and gnawed through the ropes. The grateful lion learned that even the smallest friend can offer great help." ]
      ]
    },
    {
      title:"The Tortoise and the Hare",
      genre:"Fable",
      focus:"short o",
      versions:[
        ["A fast hare ran with a slow pal. The hare had a nap. The slow pal did not stop. Step by step, he got to the end and won."],
        ["A fast hare said a slow tortoise could not win a race. The hare ran far, then took a nap. The tortoise kept on at a calm pace. Step by step, he got to the end first. Slow and steady won the race."],
        ["A proud hare challenged a steady tortoise to a race. Certain that he would win, the hare stopped for a long nap. The tortoise kept moving, one careful step at a time. He crossed the finish line before the hare woke. The race showed that patient effort can beat careless speed." ]
      ]
    },
    {
      title:"The Ugly Duckling",
      genre:"Fairy tale",
      focus:"short u",
      versions:[
        ["A young bird did not fit in. He felt sad and hid. He did not give up. The bird got big. At last, he saw he was a fine swan."],
        ["A young bird did not look like the ducks near him. They were unkind, so he felt sad and left. He kept going through the cold days. When spring came, he saw his face in the pond. He had grown into a fine swan."],
        ["A young bird was mocked because he looked different from the ducklings around him. Lonely and sad, he searched for a place where he might belong. He endured a hard winter without giving up. In spring, he discovered that he had grown into a graceful swan. At last, he found friendship and learned that being different did not make him less worthy." ]
      ]
    }
  ];
  const pieces=[
    {genre:"Animal tale",base:"The Fox and the Firefly",goal:"guide a frightened fox cub home before nightfall",obstacle:"the familiar trail had disappeared beneath the rain",choice:"follow the patient flashes of a tiny firefly",ending:"happy"},
    {genre:"Mystery",base:"The Door Without a Key",goal:"discover who kept leaving a blue door open at dawn",obstacle:"every clue pointed toward a different neighbor",choice:"compare footprints, weather records, and witness accounts",ending:"open"},
    {genre:"Poetry",base:"Song for a Small Tomorrow",goal:"listen for hope after a difficult day",obstacle:"the sky seemed too gray for any promise",choice:"collect small sounds and turn them into a poem",ending:"hopeful",poem:true},
    {genre:"Diary",base:"Pages from the Moving Train",goal:"say goodbye to a town that had always felt like home",obstacle:"every passing window held a memory",choice:"write honestly about excitement and grief together",ending:"bittersweet"},
    {genre:"Historical tale",base:"The Bell of the Old Watch",goal:"carry a warning across an ancient walled town",obstacle:"the gatekeepers doubted a young messenger",choice:"speak with courage and present the seal entrusted to them",ending:"triumphant",archaic:true},
    {genre:"Science fiction",base:"The Last Garden on Mars",goal:"protect the colony's final living apple tree",obstacle:"a broken seal was slowly draining the greenhouse air",choice:"use the last repair patch even though the return craft needed it",ending:"sad"},
    {genre:"Comedy",base:"When the Principal Became a Penguin",goal:"keep school running during a very unusual Monday",obstacle:"the principal could only honk during morning announcements",choice:"let students solve each ridiculous problem as a team",ending:"happy"},
    {genre:"Letter",base:"A Letter Left at Low Tide",goal:"answer a message found inside a weathered bottle",obstacle:"the writer might have lived many years ago",choice:"research the names in the letter and write back anyway",ending:"reflective"},
    {genre:"Ballad",base:"The Ballad of the Empty Chair",goal:"remember a friend who would not return",obstacle:"the celebration felt incomplete without them",choice:"sing both the joy they gave and the sorrow they left",ending:"sad",poem:true,archaic:true},
    {genre:"Realistic fiction",base:"The Vote at Cedar Hall",goal:"help a neighborhood decide what to build on an empty lot",obstacle:"every proposal helped someone while costing someone else",choice:"make the tradeoffs public and invite quieter voices to speak",ending:"uncertain"}
  ];
  const reflections=[
    "The first answer proved incomplete, so the group revised its plan instead of hiding the mistake.",
    "A respectful disagreement uncovered evidence that everyone had overlooked.",
    "The decision affected people who were not in the room, and their absence became part of the moral problem.",
    "Memory altered the way each witness described the same event, though none of them intended to lie.",
    "What appeared efficient at first became less convincing when fairness and long-term consequences were considered.",
    "No single person caused the crisis, yet each person still had some power to respond.",
    "Later evidence complicated the victory and required the community to revise the story it told about itself.",
    "The narrator recognized that uncertainty was not failure; it was an honest limit on what the evidence could prove.",
    "The conflict joined a practical problem to a deeper question about loyalty, responsibility, and belonging.",
    "Years later, people still disagreed about the choice, but they understood more clearly what had been at stake."
  ];

  function outcome(piece,hero){
    const endings={
      happy:`The plan worked. ${hero} returned to cheering friends, and the next morning felt brighter than the one before.`,
      hopeful:`Nothing was perfect yet, but ${hero} noticed one clear reason to begin again.`,
      open:`At sunset, one unexplained clue remained on the step. ${hero} closed the notebook, knowing the mystery was not finished.`,
      bittersweet:`The new place offered wonder, but the old town slipped beyond the horizon. ${hero} smiled through tears and kept both feelings.`,
      triumphant:`The warning arrived in time, and the bells answered from tower to tower until the danger had passed.`,
      sad:`The people survived, but the little tree did not. They saved its seeds and named the silent greenhouse after it.`,
      reflective:`No reply ever came. Still, the act of answering made the forgotten writer feel briefly present again.`,
      uncertain:`The vote settled what would be built, not whether the choice was right. That question belonged to the years ahead.`
    };
    return endings[piece.ending];
  }

  function poemFor(piece,level,hero,world,index){
    const old=piece.archaic&&level>=10;
    const lines=piece.ending==="sad"
      ? ["One chair waits where laughter grew,","One cup keeps the evening dew,",old?"Though thou art gone beyond our sight,":"Though you are gone beyond our sight,","We bear your kindness through the night."]
      : ["A sparrow taps the silver rain,","The daylight folds, then wakes again,",old?"Lift thou thy hope, though shadows stay,":"Hold one small hope through clouds of gray,","A quiet song can find the day."];
    const stanzas=[`${hero} heard a poem in ${world}:\n${lines.join("\n")}`];
    if(level>=4) stanzas.push(`The repeated images of light and absence gave the poem two emotions at once. Its rhyme made the words memorable, but its meaning depended on contrast rather than sound alone.`);
    for(let i=0;i<Math.min(8,Math.max(0,level-5));i++) stanzas.push(reflections[(index+i)%reflections.length]);
    return stanzas;
  }

  function earlyPiece(piece,hero){
    if(piece.poem) return [`Rain can fall.\nBirds can sing.\n${hero} waits.\nHope takes wing.`];
    const mood=piece.ending==="sad"?"The tree could not stay. They saved its seeds.":piece.ending==="happy"?"The friends helped. It ended well.":"They wondered what might happen next.";
    return [`${hero} had a job. ${hero} wanted to ${piece.goal}. A problem came. ${piece.obstacle.charAt(0).toUpperCase()+piece.obstacle.slice(1)}. ${mood}`];
  }

  function proseFor(piece,level,hero,world,index){
    if(level<2) return earlyPiece(piece,hero);
    const old=piece.archaic&&level>=10;
    const opening=old
      ? `In the elder quarter of ${world}, ${hero} was charged to ${piece.goal}. “Thou hast little time,” warned the keeper, “and the road shall not bend merely because thy purpose is just.” Soon, ${piece.obstacle}.`
      : `In ${world}, ${hero} hoped to ${piece.goal}. The task seemed possible until ${piece.obstacle}. That obstacle forced ${hero} to slow down and notice what an easier plan would have ignored.`;
    const action=old
      ? `${hero} answered, “If thou wilt hear me, judge not my years but the evidence I bear.” Then ${hero} chose to ${piece.choice}, accepting that courage could not guarantee a gentle ending.`
      : `After weighing several possibilities, ${hero} chose to ${piece.choice}. The choice required patience, cooperation, and a willingness to change direction when new evidence appeared.`;
    const paragraphs=[opening,action];
    for(let i=0;i<Math.min(reflections.length,Math.max(0,level-3));i++) paragraphs.push(reflections[(index*2+i)%reflections.length]);
    paragraphs.push(outcome(piece,hero));
    return paragraphs;
  }

  function makePiece(piece,level,index,world){
    const hero=heroes[(level*3+index)%heroes.length];
    const title=`${piece.base} of ${world}`;
    const body=piece.poem?poemFor(piece,level,hero,world,index):proseFor(piece,level,hero,world,index);
    return {title,genre:piece.genre,endingTone:piece.ending,body};
  }

  function makeEarlyClassic(piece,level){
    return {title:piece.title,genre:piece.genre,endingTone:"gentle",decodableFocus:piece.focus,body:piece.versions[level]};
  }

  const library={};
  grades.forEach(([id,title,level])=>{
    const world=gradeWorlds[level];
    const isEarlyReader=level<=2;
    const topics=isEarlyReader?earlyClassics.map(piece=>makeEarlyClassic(piece,level)):pieces.map((piece,index)=>makePiece(piece,level,index,world));
    const subjectTitle=isEarlyReader?"CVC Stories & Familiar Tales":"Stories, Poems & More";
    library[id]={title,subjects:{stories:{title:subjectTitle,topics}}};
  });
  window.LearnMasterOriginalStories=Object.freeze(library);
})();
