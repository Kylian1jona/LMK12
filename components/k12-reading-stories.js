(function(){
  const grades=[
    ["prek","Pre-K",0],["k","Kindergarten",1],["g1","Grade 1",2],["g2","Grade 2",3],
    ["g3","Grade 3",4],["g4","Grade 4",5],["g5","Grade 5",6],["g6","Grade 6",7],
    ["g7","Grade 7",8],["g8","Grade 8",9],["g9","Grade 9",10],["g10","Grade 10",11],
    ["g11","Grade 11",12],["g12","Grade 12",13]
  ];
  const gradeWorlds=["Button Meadow","Sunbeam Lane","Acorn School","Willow Creek","Copper Hill","Juniper Harbor","Moonstone Park","Redwood Crossing","Glasswater City","Orchard Station","Northwind Province","Ashen Coast","Crown Vale","The Meridian Isles"];
  const heroes=["Mina","Theo","Amara","Jonah","Leila","Caleb","Sana","Eli","Rosa","Noah","Imani","Mateo","Zara","Darius"];
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
    library[id]={title,subjects:{stories:{title:"Stories, Poems & More",topics:pieces.map((piece,index)=>makePiece(piece,level,index,world))}}};
  });
  window.LearnMasterOriginalStories=Object.freeze(library);
})();
