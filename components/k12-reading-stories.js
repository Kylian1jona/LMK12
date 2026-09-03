(function(){
  const grades=[
    ["prek","Pre-K",0],["k","Kindergarten",1],["g1","Grade 1",2],["g2","Grade 2",3],
    ["g3","Grade 3",4],["g4","Grade 4",5],["g5","Grade 5",6],["g6","Grade 6",7],
    ["g7","Grade 7",8],["g8","Grade 8",9],["g9","Grade 9",10],["g10","Grade 10",11],
    ["g11","Grade 11",12],["g12","Grade 12",13]
  ];
  const gradeWorlds=["Button Meadow","Sunbeam Lane","Acorn School","Willow Creek","Copper Hill","Juniper Harbor","Moonstone Park","Redwood Crossing","Glasswater City","Orchard Station","Northwind Province","Ashen Coast","Crown Vale","The Meridian Isles"];
  const heroes=["Mina","Theo","Amara","Jonah","Leila","Caleb","Sana","Eli","Rosa","Noah","Imani","Mateo","Zara","Darius"];
  const earlyOriginalStories={
    0:[
      {title:"Sam and the Red Cap",genre:"Friendship",body:["Sam had a red cap. The cap sat on his bed. Sam put it on and ran to see his pal, Max.","A gust hit the cap. Up it went, then down it fell in a mud pit. Sam felt sad, but Max had a plan.","Max got a long net. Sam held the net, and Max got the cap. They had to rub and scrub, but the cap was red again."]},
      {title:"Pam's Jam",genre:"Family story",body:["Pam had a big red pot. Dad had a bag of figs. Pam put the figs in the pot to make jam.","The jam got hot. Plop! A bit hit the top of the pot. Pam and Dad set the lid on it.","At last, the jam was set. Pam put it on a bun. She had one bite and gave Dad a big hug."]},
      {title:"The Pup in the Mud",genre:"Animal story",body:["A tan pup ran in the sun. He saw a bug and dug by a log. Then he fell in wet mud.","The pup sat in the mud and let out a sad yip. Kim got a tub, a rag, and a cup.","Kim gave the pup a bath. The pup was glad. He did not dig by the wet log again."]},
      {title:"Ben and the Hen",genre:"Farm story",body:["Ben fed a red hen. The hen pecked at corn, then ran past the pen. Ben ran to get her.","The hen hid by a hay bag. Ben did not grab or tug. He sat with a bit of corn in his hand.","The hen came to Ben. He led her back to the pen. Ben shut the gate and gave her one last pat."]},
      {title:"Kit and the Tin Bell",genre:"Mystery",body:["Kit had a tin bell. It had a soft ring. One day, the bell was not in its box.","Kit saw the cat run by. Ding, ding! The cat had the bell on a red bit of yarn.","Kit did not get mad. She made the cat a safe bell tag. Now Kit and the cat each had a bell."]},
      {title:"Dot's Hot Pot",genre:"Helping story",body:["Dot had a hot pot of yam and veg. She set it on a mat to let it sit.","A kid came in with wet socks and a sad look. Dot got a dry rug and a warm cup.","The kid had a sip and a bit of yam. Soon he felt warm. Dot was glad she had a lot to give."]},
      {title:"Gus Misses the Bus",genre:"School story",body:["Gus had his bag and cap. He ran to the bus stop, but the bus had just left.","Gus felt bad. Mom did not fuss. She got the map and said they could walk on the safe path.","Gus and Mom got to class on time. The next day, Gus got up when the sun came in."]},
      {title:"The Fox in the Box",genre:"Animal story",body:["A red fox cub hid in a box by the shed. The cub was wet and had a cut on one leg.","Mia sat by the box. She did not pet the fox. She got Dad, and Dad rang the wildlife vet.","The vet came with a safe crate. The cub got help and went back to its den when it was well."]},
      {title:"Meg Helps the Pet Vet",genre:"Community story",body:["Meg went to the pet vet with her old dog, Pip. Pip had a bad limp and did not hop.","The vet had Meg sit by Pip. Meg gave Pip a pat as the vet felt his leg.","Pip had to rest on his bed. In a week, he could jog. Meg sent the vet a thank-you card."]},
      {title:"Tim and the Lost Pin",genre:"Tiny mystery",body:["Tim had a pin with a sun on it. He put it on his bag, but the pin fell off.","Tim and Liv went back to the rug, the desk, and the art bin. No pin was in them.","At last, Liv saw a glint by Tim's shoe. The pin was in his cuff. Tim grinned and put it in a safe box."]}
    ],
    1:[
      {title:"Nell's Wet Tent",genre:"Camping story",body:["Nell and her dad set a tent by a hill. The sky was dim, but Nell said one bit of rain would be fun. She put her red bag in the tent.","A big gust bent one tent peg. Rain ran in and made Nell's bed wet. Nell did not quit. She got a rock, a dry mat, and a long bit of cord.","Dad held the tent as Nell fixed the peg. Soon the tent was snug and dry. They sat in it, had hot soup, and sang as the rain fell."]},
      {title:"The Map in the Sand",genre:"Adventure",body:["Jay found a map in a tin can by the sand. A red X sat next to a bent palm. Jay asked his pal, Ren, to help him hunt.","They went past a log and up a small hill. At the red X, they dug and hit a box. It held no gold, just seeds and a note.","The note asked them to plant a spot for bees. Jay and Ren made a bed in the sun. By spring, the bare sand had pink and red buds."]},
      {title:"Milo's Lost Sock",genre:"Home mystery",body:["Milo had one green sock, but its mate was gone. He checked the bed, the rug, and the big wash bin. It was not in any spot.","His cat, Pip, ran past with a lump under her chin. Milo saw a bit of green stick out from Pip's soft bed.","The lost sock was in the cat bed with a toy and a red cap. Milo got it back, then gave Pip an old sock of her own."]},
      {title:"The Duck at Sunset Pond",genre:"Animal story",body:["At sunset, Ana saw a duck sit still by the pond. The rest of the flock had gone. One webbed foot was stuck in a bit of net.","Ana did not step into the pond. She ran to get the park guide. The guide had a pole, thick gloves, and a calm voice.","Snip went the net, and the duck was free. It flapped to its flock. Ana put the old net in a bin so no pet or bird got stuck."]},
      {title:"The Best Nest",genre:"Nature tale",body:["A small bird made a nest on a low branch. A gust made the nest tip, and one twig fell. The bird tried to fix it with dry grass.","Sol saw the bird but did not touch the nest. He set bits of safe yarn and grass on the lawn, then went back inside.","The bird took one bit, then six. Soon the nest sat firm. Sol saw three eggs in it and felt glad he had helped from far away."]},
      {title:"A Gift for Nan",genre:"Family story",body:["Nan had a bad cold, so she had to rest. Inez wished she had a grand gift to make Nan grin. Her coin jar held just ten cents.","Inez got a pen, a pad, and a bit of red yarn. She made a book of fun notes about Nan, then tied the yarn in a bow.","Nan read each note in bed. She said the book was the best gift she had ever had. Inez learned that love did not need a big cost."]},
      {title:"The Wind and the Red Kite",genre:"Outdoor adventure",body:["Omar had a red kite with a long tail. He ran up a hill, but the wind sent the kite into a tall pine. The string went slack.","Omar did not climb the tree. He got the park worker, who had a long pole. A bird sat near the kite, so they had to go slow.","The pole set the kite free, and the bird did not flee its nest. Omar fixed the small rip. Then his red kite went up in the sky once more."]},
      {title:"The Crab in the Cup",genre:"Beach story",body:["Luz found a small crab in a cup left on the sand. The hot sun made the cup warm. The crab dug at the side but could not get out.","Luz did not grab it. She tipped the cup near a wet rock and let the crab step out. It hid in a gap with one quick hop.","Luz put the cup in a trash bin. Then she and her mom picked up six more bits of trash. The clean sand was safe for each crab and fish."]},
      {title:"The Wish on Top of the Hill",genre:"Gentle fantasy",body:["Bea went up a hill to make a wish at dusk. She wished for a pet, a big cake, and a gold ring. Yet none of the wishes felt quite right.","On the path, Bea saw a kid who had lost his map. She helped him find his camp at the base of the hill.","When Bea got back to the top, she knew her best wish. She wished to spot a way to help each day. A star lit up as if it had heard."]},
      {title:"The Small Drum Club",genre:"Music story",body:["Vic had a small drum, but he did not like to play for a crowd. His hands felt stiff, and each tap came out too fast.","His pals sat with him in the gym. One pal clapped a slow beat. Vic took a deep breath and let his drum match the clap.","Tap, tap, rest. The beat grew strong. At the school show, Vic still felt shy, but his pals played by him, and the crowd clapped along."]}
    ],
    2:[
      {title:"The Lantern in the Shed",genre:"Mystery",body:["Tess saw a soft glow in the old shed at the end of the yard. The lamp in the shed had no plug, and Dad said its last bulb had gone bad. Still, each night, a pale dot of light blinked near the locked door.","Tess asked her pal Dev to help her check the shed in the sun. They found a gap by the step and a set of tiny tracks in the dust. Inside, a glass jar sat on its side. A nest of fireflies had slipped in through the gap and become trapped.","Tess and Dev took the jar to the damp grass and let each bug fly out. That night, the yard was dark, but dots of light danced over the pond. The mystery was solved, and the bugs were back where they belonged."]},
      {title:"Maya and the Moon Seed",genre:"Gentle fantasy",body:["Maya found a flat white seed on the path behind her home. It gave off a dim glow, like a bit of moon had fallen into the mud. She set it in a pot and gave it one sip of water each night.","A pale stem came up, but it bent when the sun was high. Maya moved the pot to her room and let it rest by the window. At dusk, the stem stood tall and made one round bud that shone on her wall.","On the next full moon, the bud popped and cast soft light across the room. Maya did not pick it. She set the pot outside, where moths and bats came to visit. By dawn, ten new seeds sat in the grass."]},
      {title:"The Day the Pond Went Still",genre:"Nature mystery",body:["Cal liked to sit by the pond and hear frogs hum, ducks quack, and bugs buzz. One warm day, the pond was still. Not one frog sat on a log, and no duck came to the bank.","Cal did not step into the deep mud. He walked around the rim with a park guide and saw a thin film on top of the water. A tipped jug had let soap run down the hill after the rain.","The guide had the spill cleaned up, and Cal made signs that said, Keep Soap Off the Hill. It took time, but the pond grew clear. One night, Cal heard a frog call, then a whole wet band joined in."]},
      {title:"The Pocket-Sized Robot",genre:"Science fiction",body:["Jin built a small robot from a tin box, a bent clip, and an old toy kit. The bot could roll, nod, and pick up one sock at a time. Jin named it Dot and made a soft bed for it on his desk.","Dot tried to help with every job, but it mixed up the tasks. It put a wet rag in Jin's bag and fed a red pen to the pet dish. Jin felt mad at first, then saw that his code had one bad step.","Jin fixed the code and ran a new test. Dot put the rag in the tub, the pen in the bin, and the sock on the bed. Jin learned that a bad test was not the end; it was a hint for the next fix."]},
      {title:"The Last Muffin at Camp",genre:"Friendship",body:["At camp, Rosa and Beck came back from a long hike. One warm jam muffin sat in the pan. Both kids were hungry, and each had hoped to get the last one.","Beck said he had led the hike, so the muffin should be his. Rosa said she had held the map when the path split. Their fun day began to feel sour as they tugged at the same napkin.","The camp cook set down a small knife. Rosa and Beck cut the muffin in half and swapped bits of fruit from their packs. The snack was not big, but sharing it made the end of the day feel full."]},
      {title:"A Map for the Lost Pup",genre:"Animal adventure",body:["Lena found a wet pup under a park bench. Its tag had a name, Pip, but no phone number. Lena gave Pip a dry mat and asked an adult to help find its home.","They made a map of each spot where a lost dog sign might be seen. At the vet, they learned Pip had a chip. The chip led them to an address near the red barn past the hill.","Pip's owner ran out with tears in his eyes. He had looked all night and had begun to lose hope. Lena gave him their map, and he gave Pip a hug. One calm plan had led the pup home."]},
      {title:"The Storm at Pine Hill",genre:"Family adventure",body:["Noah and his aunt hiked up Pine Hill under a blue sky. At the top, a dark cloud rose fast. Wind bent the grass, and a low rumble rolled across the ridge.","Noah wanted to run to the car, but the open path was not safe. His aunt led him to a marked hut below the hilltop. They sat far from the glass and used the camp radio to call the park desk.","Rain hit the roof in hard taps, then the storm moved on. Noah was glad they had stayed calm and used the safe plan. When the sun came back, each wet pine gave off a fresh, sharp smell."]},
      {title:"The Secret Under the Steps",genre:"Mystery",body:["Ava heard a soft tap under the front steps each time the wind blew. Her brother said it was just a loose board, but Ava saw bits of blue yarn near a small gap.","With Mom beside her, Ava shone a lamp into the gap. A thin tin box sat in the dirt. Inside were six old pins, a faded class photo, and a note from a kid named Sal.","The note said Sal had lived in the home long ago and hid the box for a kind child to find. Ava put in one new pin and a note of her own. Then she set the box back for the next kid."]},
      {title:"The Wish Tree's Last Leaf",genre:"Fantasy",body:["In Mina's town, kids tied small wish tags to an old tree. By fall, the tree had just one leaf left. Mina's tag asked for the town fair to be the best one yet.","A hard gust tore down the tents the night before the fair. Mina felt her wish had failed. Then she saw one man lift a bent pole, one kid mend a sign, and one mom hand out hot buns.","Mina took down her wish tag and got to work. By noon, the fair was set again. The last leaf fell into her hand, and Mina knew a wish can start as hope but may need many hands to come true."]},
      {title:"Nico's Brave New Song",genre:"Music story",body:["Nico wrote a song for the class show, but he hid it in his desk. The tune was soft, and its last line did not rhyme. He feared the other kids might laugh.","His friend Emi found him humming by the art room. She did not ask to see the song. She sat down, tapped a calm beat, and let Nico sing just one line when he felt ready.","At the show, Nico's legs shook, but Emi kept the beat beside him. The room was still until his last note, then the class clapped. The song was not loud or perfect, but it was his, and he had let it be heard."]}
    ]
  };
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

  const library={};
  grades.forEach(([id,title,level])=>{
    const world=gradeWorlds[level];
    const isEarlyReader=level<=2;
    const topics=isEarlyReader?earlyOriginalStories[level]:pieces.map((piece,index)=>makePiece(piece,level,index,world));
    const subjectTitle=isEarlyReader?"Read-Aloud Stories":"Stories, Poems & More";
    library[id]={title,subjects:{stories:{title:subjectTitle,topics}}};
  });
  window.LearnMasterOriginalStories=Object.freeze(library);
})();
