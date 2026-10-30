/* Grade 8 category sorting: 35 lessons, 25 questions each. */
(function(){
  const data=window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  const split=value=>value.split('|').map(text=>text.trim());
  const lessons=[
    ['eng','Nouns, Verbs, and Adjectives',[
      ['Noun','telescope|curiosity|mountain|committee|solution|river|scientist'],
      ['Verb','investigate|glimmer|calculate|whisper|construct|compare|discover'],
      ['Adjective','brilliant|fragile|distant|ancient|careful|enormous|patient']]],
    ['eng','Sentence Purposes',[
      ['Statement','The library opens at nine.|Our team finished the model.|The river bends east.|Maya reads every evening.|The plants need water.|The museum is nearby.|The test begins tomorrow.'],
      ['Question','Where is the library?|Did our team finish?|Which way does the river bend?|Does Maya read daily?|Do the plants need water?|Is the museum nearby?|When does the test begin?'],
      ['Command','Open the library door.|Finish the model.|Follow the river east.|Read this evening.|Water the plants.|Visit the museum.|Begin the test now.']]],
    ['eng','Fact, Opinion, and Inference',[
      ['Fact','The chart lists 12 birds.|The bus arrived at 8:10.|The book has 240 pages.|The room has four windows.|The team scored three goals.|The garden grew six tomatoes.|The map shows two rivers.'],
      ['Opinion','Blue birds are the prettiest.|Buses are the best transport.|This book is wonderful.|That room feels perfect.|Our team is the greatest.|Tomatoes taste awful.|River maps are boring.'],
      ['Inference','Wet wings suggest the bird just bathed.|An empty stop suggests the bus left.|A worn cover suggests frequent reading.|Open windows suggest the room is warm.|Cheers suggest the team scored.|Fresh soil suggests recent planting.|A marked route suggests a planned trip.']]],
    ['eng','Figurative Language',[
      ['Simile','The lake shone like glass.|He ran as fast as lightning.|Her voice was like velvet.|The clouds floated like ships.|The snow was as soft as cotton.|The answer clicked like a lock.|The field was green as emerald.'],
      ['Metaphor','The classroom was a beehive.|Time is a thief.|Her smile was sunshine.|The city was a maze.|His words were arrows.|The moon was a silver coin.|The test was a mountain.'],
      ['Personification','The wind whispered at night.|The old house groaned.|The sun smiled on us.|The leaves danced across the yard.|The clock complained loudly.|The river sang past the stones.|The stars winked above us.']]],
    ['eng','Claims, Evidence, and Reasoning',[
      ['Claim','Schools should plant more trees.|The trail needs better lighting.|Students benefit from daily reading.|The garden should be expanded.|Buses should run later.|The library needs more seats.|Reusable bottles reduce waste.'],
      ['Evidence','The survey counted 84 supporters.|Light measurements were below the standard.|Reading scores rose 12 points.|The garden produced 40 meals.|The last bus leaves at 5 p.m.|Every seat was occupied at noon.|The school discarded 900 fewer bottles.'],
      ['Reasoning','Shade can make recess safer in heat.|Brighter paths help people see hazards.|Regular practice builds reading fluency.|More beds can grow more vegetables.|Later service helps evening workers.|Extra seats let more people study.|Refilling bottles avoids single-use plastic.']]],
    ['eng','Cause, Effect, and Comparison',[
      ['Cause','Heavy rain fell overnight.|The alarm battery died.|The team practiced daily.|The road was closed.|The temperature dropped below zero.|The seed received sunlight.|The power line broke.'],
      ['Effect','The creek overflowed its banks.|The alarm made no sound.|The team improved its passing.|Traffic took a detour.|Water froze in the pipes.|The seedling grew taller.|The lights went out.'],
      ['Comparison','Both storms brought strong winds.|Unlike the old alarm, the new one has a backup.|The two teams trained differently.|Both routes cross the river.|Ice and snow form at different temperatures.|These seedlings have similar leaves.|Both lamps use less energy.']]],
    ['eng','Sources and Support',[
      ['Primary source','A diary written during the trip|A photograph taken at the event|An interview with a witness|The original lab notebook|A letter from the inventor|A recording of the speech|The official meeting minutes'],
      ['Secondary source','A textbook chapter about the trip|An article analyzing the event|A biography of the witness|A review of several experiments|A documentary about the inventor|A historian’s interpretation of the speech|A summary of the meeting'],
      ['Unsupported claim','Everyone loved the trip, with no survey|The event changed everything, with no evidence|The witness could never be mistaken|The experiment proves every possible case|The invention has no flaws at all|The speech persuaded every listener|The meeting solved all problems forever']]],
    ['eng','Past, Present, and Future Tense',[
      ['Past','The team studied yesterday.|I walked to school.|She wrote a letter.|They built the bridge.|We measured the field.|He solved the puzzle.|The bird flew away.'],
      ['Present','The team studies each day.|I walk to school.|She writes a letter.|They build bridges.|We measure the field.|He solves puzzles.|The bird flies away.'],
      ['Future','The team will study tomorrow.|I will walk to school.|She will write a letter.|They will build the bridge.|We will measure the field.|He will solve the puzzle.|The bird will fly away.']]],
    ['eng','Tone in Writing',[
      ['Optimistic','We can improve the park together.|The new plan offers hope.|Every attempt brings progress.|The garden may thrive next year.|Our effort will make a difference.|The challenge is worth trying.|Better days are ahead.'],
      ['Neutral','The park opens at eight.|The plan has three steps.|The data include five attempts.|The garden covers two acres.|The group met on Tuesday.|The challenge begins tomorrow.|The report lists four results.'],
      ['Concerned','The broken gate may be unsafe.|The plan lacks a clear budget.|Repeated errors need attention.|The garden is losing plants.|Few volunteers have signed up.|The deadline may be missed.|The results raise questions.']]],
    ['eng','Complete Sentences and Errors',[
      ['Complete sentence','The students tested the water.|A red kite crossed the sky.|We reviewed the final draft.|The museum opened early.|Our group drew a map.|The cat slept by the window.|The storm ended at noon.'],
      ['Fragment','Because the students tested.|Under the bright red kite.|After reviewing the draft.|Near the museum entrance.|When our group drew.|The cat by the window.|After the storm at noon.'],
      ['Run-on','The students tested the water it was clear.|A kite flew the sky was blue.|We revised the draft it improved.|The museum opened visitors entered.|Our group drew a map we shared it.|The cat slept the dog barked.|The storm ended the sun appeared.']]],
    ['sci','States of Matter',[
      ['Solid','ice cube|wooden block|iron nail|salt crystal|glass marble|frozen wax|rock'],
      ['Liquid','water in a cup|cooking oil|liquid mercury|orange juice|melted wax|liquid ethanol|rain'],
      ['Gas','water vapor|oxygen in air|helium in a balloon|carbon dioxide gas|nitrogen in air|steam above a kettle|methane gas']]],
    ['sci','Physical and Chemical Changes',[
      ['Physical change','Ice melts into water.|Paper is cut in half.|Salt dissolves in water.|A can is crushed.|Water evaporates.|Glass breaks into pieces.|Wax melts.'],
      ['Chemical change','Iron rusts.|Wood burns.|Vinegar reacts with baking soda.|An egg cooks.|Milk turns sour.|A candle wick burns.|Fruit rots.'],
      ['No change','A sealed rock sits on a shelf.|A ruler rests on a desk.|A closed jar remains untouched.|A dry spoon stays in a drawer.|An unplugged lamp sits still.|A coin lies on a table.|A book remains closed.']]],
    ['sci','Plant Cells, Animal Cells, and Both',[
      ['Plant cell only','A rigid cell wall supports it.|Chloroplasts capture light.|A large central vacuole stores water.|Its chlorophyll absorbs sunlight.|It can make sugar by photosynthesis.|Cellulose strengthens its wall.|Its shape is often boxlike.'],
      ['Animal cell only','It has centrioles for cell division.|It lacks a cell wall.|It has many small vacuoles.|Its membrane can form flexible shapes.|Muscle cells contract to move the body.|Nerve cells transmit signals.|It obtains food from other organisms.'],
      ['Both cell types','A nucleus holds DNA.|A cell membrane controls entry.|Mitochondria release usable energy.|Ribosomes build proteins.|Cytoplasm fills the cell.|DNA stores instructions.|The cell uses energy to grow.']]],
    ['sci','Heat Transfer',[
      ['Conduction','A spoon warms in hot soup.|A pan handle heats by contact.|Heat passes through a metal rod.|Bare feet feel a hot sidewalk.|An ice cube cools your palm.|A flat iron heats fabric.|A mug warms a tabletop.'],
      ['Convection','Warm air rises above a heater.|Water circulates in a boiling pot.|Cool air sinks near a window.|Ocean currents carry warm water.|A convection oven moves hot air.|A lava lamp’s liquid rises and sinks.|A sea breeze forms as air circulates.'],
      ['Radiation','Sunlight warms your skin.|A campfire heats you from afar.|Infrared lamps warm food.|Earth absorbs solar energy.|A heat lamp warms a reptile.|You feel warmth from a glowing bulb.|Solar panels receive light energy.']]],
    ['sci','Forces and Motion',[
      ['Balanced forces','A book rests on a table.|Equal teams hold a tug-of-war rope still.|A picture hangs motionless.|A parked car remains still.|A box is pushed equally from both sides.|A floating boat stays at one depth.|A lamp sits on a shelf.'],
      ['Unbalanced forces','A soccer ball speeds up after a kick.|A cart starts rolling downhill.|A bike slows under braking.|A rocket lifts off.|A turning car changes direction.|A dropped stone accelerates downward.|A sled speeds up when pushed.'],
      ['Friction','Tires grip the road.|Shoes resist sliding on a floor.|Brake pads rub a wheel.|A box scrapes across carpet.|Hands warm when rubbed.|Sandpaper roughens wood.|Air resistance slows a parachute.']]],
    ['sci','Ecosystem Roles',[
      ['Producer','grass makes sugar using light|algae photosynthesize in a pond|an oak tree makes its food|moss captures sunlight|a sunflower produces sugars|seaweed uses sunlight|a cactus photosynthesizes'],
      ['Consumer','a rabbit eats grass|a hawk hunts mice|a deer browses leaves|a fish eats algae|a bee drinks nectar|a fox eats a rabbit|a caterpillar eats a leaf'],
      ['Decomposer','fungi break down a log|bacteria decay fallen leaves|mushrooms digest dead wood|soil microbes recycle nutrients|mold grows on old fruit|fungi digest dead insects|bacteria break down waste']]],
    ['sci','Inherited, Learned, and Environmental Traits',[
      ['Inherited','natural eye color|blood type|attached earlobes|natural hair texture|a cat’s coat pattern|a pea plant’s flower color|a dog’s inherited fur length'],
      ['Learned','playing a piano scale|reading a map|speaking a second language|riding a bicycle|typing quickly|solving a chess puzzle|making a paper crane'],
      ['Environmental effect','a sun tan after exposure|a scar from an injury|larger muscles after training|a plant bending toward light|a callus from repeated rubbing|temporary dehydration|a leaf damaged by frost']]],
    ['sci','Rock Types',[
      ['Igneous','granite cooled underground|basalt cooled from lava|obsidian volcanic glass|pumice full of gas holes|gabbro formed from magma|rhyolite cooled from lava|diorite crystallized underground'],
      ['Sedimentary','sandstone made of cemented sand|limestone formed from shells|shale formed from mud|conglomerate containing pebbles|rock salt from evaporation|chalk from marine remains|coal formed from ancient plants'],
      ['Metamorphic','marble changed from limestone|slate changed from shale|quartzite changed from sandstone|gneiss formed under heat and pressure|schist with aligned minerals|phyllite from altered slate|amphibolite altered from basalt']]],
    ['sci','Waves and Signals',[
      ['Transverse mechanical wave','a wave along a shaken rope|a ripple across water|a wave on a guitar string|a wave across a stretched sheet|a stadium-style wave in a spring|a crest traveling along a cord|a wave on a jump rope'],
      ['Longitudinal mechanical wave','sound moving through air|compressions in a slinky|a drumbeat traveling through air|ultrasound in tissue|sound traveling through water|a push pulse in a spring|a voice reaching a listener'],
      ['Electromagnetic wave','visible sunlight|radio signal|microwave signal|X-ray beam|infrared light|ultraviolet light|gamma radiation']]],
    ['sci','Stars, Planets, and Moons',[
      ['Star','the Sun makes energy by fusion|Sirius shines with its own light|Betelgeuse is a red supergiant|Polaris emits its own light|Vega is a bright star|Proxima Centauri is a star|Rigel is a blue supergiant'],
      ['Planet','Earth orbits the Sun|Mars has a thin atmosphere|Jupiter is a gas giant|Venus has a thick atmosphere|Mercury is closest to the Sun|Saturn has broad rings|Neptune is an ice giant'],
      ['Moon','Earth’s Moon orbits Earth|Europa orbits Jupiter|Titan orbits Saturn|Phobos orbits Mars|Ganymede orbits Jupiter|Triton orbits Neptune|Callisto orbits Jupiter']]],
    ['math','Slope and Linear Graphs',[
      ['Positive slope','y = 2x + 1|y = 3x - 4|y = x + 8|y = 0.5x - 2|y = 7x + 3|y = 4x - 9|y = 0.25x + 6'],
      ['Negative slope','y = -2x + 1|y = -3x - 4|y = -x + 8|y = -0.5x - 2|y = -7x + 3|y = -4x - 9|y = -0.25x + 6'],
      ['Zero slope','y = 1|y = -4|y = 8|y = -2|y = 3|y = -9|y = 6']]],
    ['math','Rational and Irrational Numbers',[
      ['Terminating decimal','0.5|1.25|-2.75|0.04|3.125|-0.8|7.2'],
      ['Repeating decimal','0.333...|1.272727...|-0.666...|2.181818...|0.090909...|4.555...|-3.121212...'],
      ['Irrational number','√2|√3|π|√5|√7|π ÷ 2|√10']]],
    ['math','Bivariate Data Patterns',[
      ['Positive association','Study hours rise as quiz scores rise.|Warmer days pair with more ice cream sales.|Weeks of growth pair with taller plants.|More practice pairs with better free throws.|More rain pairs with a higher river level.|Heavier parcels pair with higher shipping cost.|Longer trips pair with more fuel used.'],
      ['Negative association','Higher speed pairs with less travel time on one route.|Higher elevation pairs with lower air pressure.|Older cars tend to have lower resale value.|Warmer days pair with less home heating use.|More distance from a lamp pairs with less brightness.|More time spent reading pairs with fewer pages remaining.|More insulation pairs with less heat loss.'],
      ['No clear association','Shoe size and history scores show scattered points.|Favorite color and height show no trend.|Locker number and reading speed show no trend.|Birth month and pencil length show no trend.|Backpack color and math scores show no trend.|First-name length and running speed show no trend.|Desk number and hand span show no trend.']]],
    ['math','Direction of Percent Change',[
      ['Increase','A price moves from $40 to $50.|A class grows from 20 to 25 students.|Sales move from 100 to 120 units.|A tank fills from 60 to 75 liters.|A score moves from 80 to 88.|A plant grows from 30 to 36 cm.|A budget moves from $200 to $230.'],
      ['Decrease','A price moves from $50 to $40.|A class shrinks from 25 to 20 students.|Sales move from 120 to 100 units.|A tank drains from 75 to 60 liters.|A score moves from 88 to 80.|A plant is trimmed from 36 to 30 cm.|A budget moves from $230 to $200.'],
      ['No change','A price stays at $40.|A class stays at 20 students.|Sales stay at 100 units.|A tank remains at 60 liters.|A score remains 80.|A plant stays 30 cm tall.|A budget stays at $200.']]],
    ['math','Classify Triangles by Side Lengths',[
      ['Right triangle','sides 3, 4, 5|sides 5, 12, 13|sides 8, 15, 17|sides 7, 24, 25|sides 9, 40, 41|sides 12, 16, 20|sides 20, 21, 29'],
      ['Acute triangle','sides 4, 5, 6|sides 5, 6, 7|sides 6, 7, 8|sides 7, 8, 9|sides 8, 9, 10|sides 9, 10, 11|sides 10, 11, 12'],
      ['Obtuse triangle','sides 2, 3, 4|sides 3, 4, 6|sides 4, 5, 8|sides 5, 6, 9|sides 6, 7, 10|sides 7, 8, 12|sides 8, 9, 13']]],
    ['alg1','Expressions, Equations, and Inequalities',[
      ['Expression','3x + 5|2a - 7|4(y + 1)|x² + 2x|6m ÷ 3|9 - 2p|5r² - 1'],
      ['Equation','3x + 5 = 11|2a - 7 = 1|4(y + 1) = 20|x² + 2x = 0|6m ÷ 3 = 8|9 - 2p = 3|5r² - 1 = 19'],
      ['Inequality','3x + 5 > 11|2a - 7 < 1|4(y + 1) ≥ 20|x² + 2x ≤ 0|6m ÷ 3 > 8|9 - 2p < 3|5r² - 1 ≥ 19']]],
    ['alg1','How Many Solutions?',[
      ['One solution','2x + 3 = 11|3x - 4 = 8|5x + 1 = 16|4(x + 1) = 20|7x = 35|x ÷ 2 + 3 = 9|6x - 2 = 4x + 8'],
      ['No solution','2x + 3 = 2x + 5|3(x + 1) = 3x + 4|5x - 2 = 5x + 7|4(x - 1) = 4x + 1|x + 6 = x + 9|7x + 2 = 7x - 3|2(x + 5) = 2x + 12'],
      ['Infinitely many solutions','2(x + 3) = 2x + 6|3x + 9 = 3(x + 3)|5(x - 1) = 5x - 5|x + 4 = 4 + x|7x - 2 = 7x - 2|4(x + 2) = 4x + 8|x ÷ 2 + 1 = (x + 2) ÷ 2']]],
    ['alg1','Forms of a Line',[
      ['Slope-intercept form','y = 2x + 3|y = -x + 4|y = 0.5x - 1|y = 7x|y = -3x - 2|y = x + 9|y = -0.25x + 6'],
      ['Point-slope form','y - 2 = 3(x - 1)|y + 4 = -2(x - 5)|y - 7 = 0.5(x + 3)|y + 1 = 4(x - 2)|y - 9 = -x|y + 5 = 6(x + 1)|y - 3 = -0.25(x - 8)'],
      ['Standard form','2x + 3y = 12|x - y = 5|4x + y = 9|7x - 2y = 1|3x + 5y = 15|6x - y = 4|x + 8y = 16']]],
    ['alg1','Linear, Quadratic, or Exponential?',[
      ['Linear function','y = 2x + 1|y = -3x + 4|y = x - 8|y = 0.5x + 2|y = -x|y = 7x - 3|y = 4'],
      ['Quadratic function','y = x² + 1|y = 2x² - 3|y = (x - 4)²|y = -x² + 2x|y = 3x²|y = x² - 9|y = 0.5x² + 7'],
      ['Exponential function','y = 2^x|y = 3(2^x)|y = 5(0.5^x)|y = 4^x + 1|y = 10(1.2^x)|y = 7(3^x)|y = 0.8^x']]],
    ['alg1','Factoring Patterns',[
      ['Difference of squares','x² - 9|4x² - 25|9x² - 16|x² - 49|16x² - 1|25x² - 4|36x² - 49'],
      ['Perfect-square trinomial','x² + 6x + 9|x² - 10x + 25|4x² + 12x + 9|9x² - 6x + 1|x² + 14x + 49|25x² + 20x + 4|x² - 8x + 16'],
      ['Common factor first','3x + 6|5x² + 10x|4x³ - 8x²|7x² + 14x|6x² - 9x|8x³ + 12x²|2x² + 4x']]],
    ['hist','Branches of Government',[
      ['Legislative action','Congress passes a budget.|A state legislature writes a law.|The Senate votes on a bill.|The House proposes a tax bill.|Lawmakers hold a committee hearing.|Congress overrides a veto.|A city council passes an ordinance.'],
      ['Executive action','The president signs a bill.|A governor directs an agency.|A mayor enforces an ordinance.|The president vetoes a bill.|A cabinet agency carries out a rule.|The governor appoints an official.|The president issues an executive order.'],
      ['Judicial action','A court interprets a law.|A judge rules on a case.|The Supreme Court reviews an appeal.|A court decides a constitutional dispute.|A jury reaches a verdict.|A judge issues an injunction.|An appellate court reverses a ruling.']]],
    ['hist','Road to the American Revolution',[
      ['British policy','Parliament passes the Stamp Act.|Britain imposes the Townshend duties.|The Tea Act changes tea trade.|The Coercive Acts punish Boston.|Britain issues the Proclamation of 1763.|The Sugar Act taxes imports.|Parliament passes the Quartering Act.'],
      ['Colonial protest','Colonists boycott imported goods.|The Boston Tea Party destroys tea.|Sons of Liberty organize resistance.|Colonists petition against taxation.|Merchants sign nonimportation agreements.|The First Continental Congress meets.|Protesters challenge the Stamp Act.'],
      ['Move toward independence','The Second Continental Congress convenes.|Common Sense argues for independence.|Delegates vote for independence.|The Declaration of Independence is adopted.|Colonies form new state governments.|The Continental Army fights for self-rule.|American diplomats seek foreign support.']]],
    ['hist','Founding Documents',[
      ['Declaration of Independence','It lists grievances against the king.|It announces separation from Britain.|It argues governments need consent.|It states an independence decision.|It describes rights as a reason for revolt.|It was adopted in 1776.|Jefferson drafted its main text.'],
      ['U.S. Constitution','It sets up three federal branches.|It describes powers of Congress.|It establishes the presidency.|It creates a federal court system.|It explains how amendments are proposed.|It was signed in 1787.|It divides authority between nation and states.'],
      ['Bill of Rights','It protects free speech.|It protects religious exercise.|It bars unreasonable searches.|It protects the right to a jury trial.|It limits cruel and unusual punishment.|It includes the Tenth Amendment.|Its ten amendments were ratified in 1791.']]],
    ['hist','Civil War Era Timeline',[
      ['Before the war','The Missouri Compromise is enacted in 1820.|The Compromise of 1850 is adopted.|The Kansas-Nebraska Act passes in 1854.|The Dred Scott decision comes in 1857.|John Brown raids Harpers Ferry in 1859.|Lincoln wins the 1860 election.|South Carolina secedes in 1860.'],
      ['During the war','Fort Sumter is attacked in 1861.|First Bull Run occurs in 1861.|Antietam is fought in 1862.|The Emancipation Proclamation takes effect in 1863.|Gettysburg is fought in 1863.|Atlanta falls in 1864.|Lee surrenders at Appomattox in 1865.'],
      ['After the war','The Thirteenth Amendment is ratified in 1865.|Congress passes the Civil Rights Act of 1866.|Reconstruction Acts pass in 1867.|The Fourteenth Amendment is ratified in 1868.|The Fifteenth Amendment is ratified in 1870.|The Enforcement Acts are passed in the 1870s.|Federal Reconstruction ends in 1877.']]],
    ['hist','Reconstruction Amendments',[
      ['Thirteenth Amendment','It abolishes slavery in the United States.|It outlaws involuntary servitude except as punishment for crime.|It was ratified in 1865.|It gives Congress power to enforce abolition.|It ended slavery as a legal institution.|Its first section bars slavery.|Its exception refers to a criminal conviction.'],
      ['Fourteenth Amendment','It defines national citizenship.|It promises equal protection of the laws.|It requires due process from states.|It was ratified in 1868.|It addresses state limits on citizens’ rights.|Its first section includes a citizenship clause.|It gives Congress enforcement power for its protections.'],
      ['Fifteenth Amendment','It bars denying voting rights because of race.|It bars race-based voting restrictions tied to prior servitude.|It was ratified in 1870.|It addresses access to voting for male citizens.|It gives Congress power to enforce voting protections.|It limits racial discrimination in suffrage.|Its text names color as a forbidden voting barrier.']]]
  ];
  const combinations=[];
  for(let a=0;a<7;a++) for(let b=a+1;b<7;b++) combinations.push([0,1,2,3,4,5,6].filter(index=>index!==a&&index!==b));
  const prompts=['Sort each example by the idea it demonstrates.','Read every card and place it in the best category.','Use the definitions to group these examples.','Compare the examples and sort all 15 cards.','Choose the category that fits each card most precisely.'];
  const counts={eng:0,sci:0,math:0,alg1:0,hist:0};
  lessons.forEach(([subject,name,groups])=>{
    const number=120+(counts[subject]++);
    const categories=groups.map(([label],index)=>({id:`c${index}`,label}));
    const questions=Array.from({length:25},(_,round)=>{
      const options=groups.flatMap(([,source],groupIndex)=>{
        const pool=split(source);
        const offset=(round*(groupIndex+1)+Math.floor(round/21)*(groupIndex+2)+groupIndex*7)%21;
        return combinations[offset].map((index,cardIndex)=>({id:`q${round}-c${groupIndex}-o${cardIndex}`,text:pool[index],category:`c${groupIndex}`}));
      });
      const rotation=(round*7)%options.length;
      const ordered=options.slice(rotation).concat(options.slice(0,rotation));
      return {type:'drag',q:`${name}, set ${round+1}: ${prompts[round%prompts.length]}`,categories,options:ordered,difficulty:['Foundation','Developing','Applying','Reasoning','Challenge'][Math.floor(round/5)],audio:`${name}. ${prompts[round%prompts.length]}`,explain:'Each card belongs in exactly one category.'};
    });
    data[`g8:${subject}:L${number}`]={name:`${name}`,topic:'Category Sorting',difficulty:'Practice',contentVersion:'20261018.3',questions};
  });
})();
