(function(){
  const grades=[
    ["prek","Pre-K",0],["k","Kindergarten",1],["g1","Grade 1",2],["g2","Grade 2",3],
    ["g3","Grade 3",4],["g4","Grade 4",5],["g5","Grade 5",6],["g6","Grade 6",7],
    ["g7","Grade 7",8],["g8","Grade 8",9],["g9","Grade 9",10],["g10","Grade 10",11],
    ["g11","Grade 11",12],["g12","Grade 12",13]
  ];
  const seeds=[
    {title:"The Lantern in the Rain",hero:"Mina",place:"a rain-soaked neighborhood",goal:"return a lost lantern to its owner",challenge:"the street signs had blown sideways",choice:"ask neighbors to compare their memories of the block",result:"the lantern reached an elderly gardener who used it every evening",theme:"A careful question can light the way forward.",deeper:"Mina realized that solving the problem depended less on moving quickly than on listening closely. Each neighbor held only part of the route, but their accounts formed a reliable map when considered together."},
    {title:"Theo and the Quiet Garden",hero:"Theo",place:"a crowded apartment courtyard",goal:"help a wilted community garden",challenge:"everyone offered a different explanation for the dry soil",choice:"record sunlight, water, and soil conditions for one week",result:"the neighbors changed the watering plan and the seedlings recovered",theme:"Observation turns guesses into useful evidence.",deeper:"The garden became a shared experiment. Rather than treating the first explanation as certain, Theo invited the group to revise its ideas as new evidence appeared."},
    {title:"The Blue Kite Promise",hero:"Amara",place:"a windy hill above town",goal:"repair a kite she had promised to share",challenge:"the frame cracked just before the festival",choice:"use spare reeds and ask a younger child to test each knot",result:"the kite flew steadily and two new friends guided its string",theme:"Keeping a promise may require patience and cooperation.",deeper:"Amara's promise changed from a private obligation into a public act of trust. The repaired kite mattered, but the way she included others mattered more."},
    {title:"A Map for Monday",hero:"Jonah",place:"a busy school",goal:"help a new student find every classroom",challenge:"the official map left out a recently opened hallway",choice:"walk the route, mark landmarks, and invite feedback",result:"the new map helped the whole school move more confidently",theme:"Useful designs improve when real people test them.",deeper:"Jonah learned that accuracy is not simply a feature of a document; it is a responsibility to the people who depend on it. Revision made the map more humane as well as more precise."},
    {title:"The Clockmaker's Sparrow",hero:"Leila",place:"her grandfather's clock shop",goal:"discover why a wooden sparrow no longer appeared at noon",challenge:"every gear seemed correct when examined alone",choice:"study how the gears transferred motion as a system",result:"a tiny loose pin was secured and the sparrow returned",theme:"Small connections can shape an entire system.",deeper:"The repair showed Leila the limits of examining parts in isolation. Function emerged from relationships, timing, and the transfer of force across the mechanism."},
    {title:"River of Paper Boats",hero:"Caleb",place:"a park beside a narrow creek",goal:"trace where litter entered the water",challenge:"the debris appeared after storms but had many possible sources",choice:"map drains, interview caretakers, and compare rainfall records",result:"the community installed filters and reduced waste upstream",theme:"Lasting solutions begin by finding causes, not hiding effects.",deeper:"Caleb's investigation revealed that visible pollution was the endpoint of decisions made throughout the watershed. The creek connected households that rarely thought of themselves as neighbors."},
    {title:"The Library After Sunset",hero:"Sana",place:"a small coastal library",goal:"save books before a rising tide reached the lower shelves",challenge:"there was little time and no single person could move everything",choice:"organize volunteers by shelf, weight, and safe exit route",result:"the collection was moved and a stronger emergency plan followed",theme:"Clear plans help courage become effective action.",deeper:"Urgency could easily have produced confusion. Sana's calm division of labor turned individual concern into coordinated action without ignoring anyone's safety."},
    {title:"The Robot That Asked Why",hero:"Eli",place:"a regional science fair",goal:"teach a robot to sort recyclable materials",challenge:"the robot repeated errors when objects were dirty or crushed",choice:"expand the examples and document uncertainty instead of hiding it",result:"the robot improved and the judges praised the honest explanation",theme:"Good inventions acknowledge limits and learn from mistakes.",deeper:"Eli rejected the temptation to present accuracy as perfection. By describing uncertainty, he made the project more trustworthy and created a clearer path for future improvement."},
    {title:"Voices Across the Bridge",hero:"Rosa",place:"two neighborhoods divided by an old bridge",goal:"design a mural both communities would value",challenge:"each group remembered the bridge's history differently",choice:"collect oral histories and preserve disagreements alongside shared hopes",result:"the mural became a layered record rather than a single simple story",theme:"A community grows stronger when many perspectives remain visible.",deeper:"Rosa discovered that unity did not require erasing conflict. The mural could hold competing memories while still expressing a commitment to a shared future."},
    {title:"The Last Seat on the Observatory Bus",hero:"Noah",place:"a mountain observatory",goal:"decide who should receive the final student research seat",challenge:"several candidates had different strengths and unequal access to prior opportunities",choice:"create transparent criteria and add remote roles for the full team",result:"the project gained a diverse crew and produced stronger observations",theme:"Fair decisions consider both standards and opportunity.",deeper:"The team distinguished equality from equity: identical treatment would not address unequal starting points. Transparent reasoning made the decision open to challenge and revision."}
  ];
  const enrichments=[
    "The next morning, the hero wrote down what had happened so the lesson would not be forgotten.",
    "A friend questioned the first plan, and that respectful disagreement revealed a detail everyone else had missed.",
    "The group compared two possible solutions, considering time, safety, cost, and the people each choice would affect.",
    "Evidence changed the direction of the work. Instead of defending an early guess, the team treated revision as a sign of stronger thinking.",
    "The experience raised a broader question about responsibility: when a problem belongs to a whole community, who should act first and who should be heard?",
    "Looking back, the hero recognized that the final outcome depended on a chain of decisions rather than one dramatic moment.",
    "The story also exposes a tension between efficiency and inclusion. A faster choice might have produced an answer, but a more deliberate process produced trust.",
    "From another perspective, the solution remained incomplete. Future leaders would need to test whether its benefits lasted and whether unexpected costs appeared.",
    "The central conflict therefore operates on two levels: an immediate practical obstacle and a deeper challenge involving knowledge, power, and shared obligation.",
    "The conclusion resists certainty. Progress is real, yet it depends on continued attention, transparent evidence, and a willingness to revise the systems people inherit."
  ];

  function earlyStory(seed,level){
    const short=[
      `${seed.hero} had a job. ${seed.hero} wanted to ${seed.goal}.`,
      `A problem came. ${seed.challenge.charAt(0).toUpperCase()+seed.challenge.slice(1)}.`,
      `${seed.hero} made a good choice. The friends helped.`,
      `${seed.result.charAt(0).toUpperCase()+seed.result.slice(1)}. ${seed.theme}`
    ];
    return [short.slice(0,level===0?2:4).join(" ")];
  }
  function storyFor(seed,level,index){
    if(level<2) return {title:seed.title,body:earlyStory(seed,level)};
    const opening=`${seed.hero} lived near ${seed.place} and hoped to ${seed.goal}. At first, the task seemed manageable, but ${seed.challenge}. The obstacle forced ${seed.hero} to slow down and notice details that had been easy to overlook.`;
    const action=`After considering several ideas, ${seed.hero} chose to ${seed.choice}. The decision required patience, cooperation, and a willingness to change course when the evidence did not support the first plan.`;
    const ending=`In the end, ${seed.result}. ${seed.theme} ${seed.deeper}`;
    const extraCount=Math.max(0,Math.min(enrichments.length,level-3));
    const extras=Array.from({length:extraCount},(_,offset)=>enrichments[(index+offset)%enrichments.length]);
    const paragraphs=[opening];
    if(level>=3) paragraphs.push(action);
    if(extras.length){
      const midpoint=Math.ceil(extras.length/2);
      paragraphs.push(extras.slice(0,midpoint).join(" "));
      if(extras.length>midpoint) paragraphs.push(extras.slice(midpoint).join(" "));
    }
    paragraphs.push(ending);
    return {title:seed.title,body:paragraphs};
  }

  const library={};
  grades.forEach(([id,title,level])=>{
    library[id]={title,subjects:{stories:{title:"Original Stories",topics:seeds.map((seed,index)=>storyFor(seed,level,index))}}};
  });
  window.LearnMasterOriginalStories=Object.freeze(library);
})();
