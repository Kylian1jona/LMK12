/* Thirty additional Grade 8 drag-and-drop lessons: 25 sorting sets each. */
(function(){
  const data=window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  const lessons=[
    ['eng','Prefix Meanings',[
      ['un- means not','unfair|unknown|unsafe|unclear|unable|unhappy|unfinished'],
      ['pre- means before','preview|preheat|prepay|preschool|pretest|prehistoric|preorder'],
      ['re- means again','rewrite|reread|rebuild|replay|repaint|recheck|reopen']]],
    ['eng','Clauses and Phrases',[
      ['Independent clause','The bell rang|Our class began|The dog barked|Mina opened the door|We finished the project|The rain stopped|Everyone cheered'],
      ['Dependent clause','because the bell rang|when our class began|although the dog barked|after Mina opened the door|if we finish the project|until the rain stops|while everyone cheered'],
      ['Phrase','under the old bridge|beside the classroom|with a blue collar|near the open door|after the final project|during the heavy rain|around the cheering crowd']]],
    ['eng','Verb Voice and Linking Verbs',[
      ['Active voice','The chef baked the bread.|The student solved the puzzle.|A storm damaged the roof.|The artist painted the mural.|The team won the game.|The gardener planted roses.|The editor revised the article.'],
      ['Passive voice','The bread was baked by the chef.|The puzzle was solved by the student.|The roof was damaged by a storm.|The mural was painted by the artist.|The game was won by the team.|Roses were planted by the gardener.|The article was revised by the editor.'],
      ['Linking verb','The bread smells delicious.|The puzzle seems difficult.|The roof looks sturdy.|The mural is colorful.|The team feels ready.|The roses appear healthy.|The article remains clear.']]],
    ['eng','Types of Literary Conflict',[
      ['Character versus self','She must overcome her fear of speaking.|He debates whether to tell the truth.|Mira struggles with her own jealousy.|A player doubts his ability to lead.|She tries to resist a bad habit.|He weighs two personal values.|A student battles stage fright.'],
      ['Character versus nature','Hikers seek shelter from a blizzard.|A sailor navigates a violent storm.|A farmer protects crops from drought.|A climber faces an icy cliff.|A family evacuates a wildfire.|A swimmer fights a strong current.|A traveler survives desert heat.'],
      ['Character versus society','A student challenges an unfair school rule.|A writer protests a censorship law.|A worker opposes a discriminatory policy.|A town resident fights an unjust ordinance.|A voter confronts an exclusionary system.|A family resists a harmful tradition.|A reporter exposes a corrupt institution.']]],
    ['eng','Reasoning Errors',[
      ['Hasty generalization','One rude driver proves all drivers are rude.|Two rainy days mean it always rains here.|A single hard test means every test is hard.|One broken phone proves that brand always fails.|One slow bus means every bus is late.|A lone survey answer represents the whole school.|One poor meal means the restaurant is always bad.'],
      ['False dilemma','Either agree with me or hate learning.|We must cancel sports or cancel art.|There are only two ways to solve this complex issue.|Either buy this plan or give up entirely.|Choose my idea or accept failure.|We must use paper or use no materials.|Either walk to school or never arrive.'],
      ['Personal attack','Ignore her argument because she is young.|His evidence is wrong because his clothes are old.|Do not listen to that scientist because she is quiet.|Her proposal is bad because she lost a game.|His graph is false because I dislike him.|That claim fails because its speaker is awkward.|Reject the report because the author is unpopular.']]],
    ['eng','Informational Text Structures',[
      ['Chronological order','First the seed sprouts; later it flowers.|The article follows a trip from morning to night.|The report lists events by year.|Instructions begin with preparation and end with cleanup.|A biography moves from childhood to adulthood.|The timeline begins in 1900 and ends in 2000.|The recipe follows steps in sequence.'],
      ['Cause and effect','Heavy rain made the river rise.|Lack of sleep reduced concentration.|The road closed, so buses took another route.|The heater failed; the room became cold.|Plants wilted because they lacked water.|New rules led to fewer accidents.|A power outage stopped the machines.'],
      ['Compare and contrast','Both birds migrate, but at different times.|The two plans share a goal but differ in cost.|Unlike copper, plastic does not conduct well.|Both novels feature journeys in different settings.|Two ecosystems have similar food webs.|One route is shorter; the other is safer.|The old and new maps show different boundaries.']]],

    ['sci','Energy Transformation Examples',[
      ['Electrical to light','A plugged-in lamp glows.|An LED flashlight lights up.|A streetlight illuminates the road.|A television screen shines.|An electric sign lights its letters.|A projector displays an image.|A phone screen brightens.'],
      ['Electrical to motion','An electric fan spins.|A blender turns its blades.|An electric train moves.|A washing machine tumbles clothes.|A drill rotates its bit.|An elevator motor lifts the car.|A toy car motor turns its wheels.'],
      ['Chemical to thermal','Wood burns and warms a room.|A candle flame gives off heat.|Fuel burns in a furnace.|Charcoal heats a grill.|A hand warmer reacts and gets warm.|Natural gas burns under a pot.|A campfire releases heat from logs.']]],
    ['sci','Light Interactions',[
      ['Reflection','A mirror sends light back to your eyes.|A shiny spoon forms an image.|A calm lake shows a tree image.|A polished metal surface bounces light.|A reflector returns a headlight beam.|A periscope uses mirrors.|A white wall redirects some incoming light.'],
      ['Refraction','A straw looks bent through water.|A lens bends light to focus it.|A prism changes the direction of a ray.|Light changes direction entering glass.|A magnifying glass focuses sunlight.|An underwater object appears shifted.|Eyeglasses bend light toward the retina.'],
      ['Absorption','A black shirt takes in sunlight and warms.|Dark pavement warms in the sun.|A solar panel takes in light energy.|Black paper heats under a lamp.|A dark roof takes in more solar energy.|A leaf absorbs some wavelengths of light.|A dark curtain blocks and takes in light.']]],
    ['sci','Circuit Behavior',[
      ['Series circuit','One path runs through both bulbs.|Removing one bulb breaks the whole loop.|Current passes through each lamp in turn.|Two cells and bulbs form a single path.|A break anywhere stops every bulb.|The same current crosses each component.|Adding a bulb to the single path dims the others.'],
      ['Parallel circuit','Each bulb has its own branch.|One lamp can work when another is removed.|Current splits between two paths.|Branches reconnect near the battery.|A break in one branch leaves another working.|Each branch connects across the source.|Two separate paths power two lamps.'],
      ['Open circuit','The switch is off and the loop is broken.|A wire is disconnected from the battery.|A gap prevents current from flowing.|The bulb is removed from its only socket.|A broken wire interrupts the path.|An open switch stops the motor.|The path from one battery terminal ends at a gap.']]],
    ['sci','Allele Pair Patterns',[
      ['Homozygous dominant','AA|BB|CC|DD|EE|FF|GG'],
      ['Heterozygous','Aa|Bb|Cc|Dd|Ee|Ff|Gg'],
      ['Homozygous recessive','aa|bb|cc|dd|ee|ff|gg']]],
    ['sci','Changes and Energy',[
      ['Exothermic reaction','Burning wood releases heat.|A hand warmer reaction heats up.|Fuel combustion warms an engine.|A candle burns and warms nearby air.|A reaction gives heat to its surroundings.|Iron oxidation in a heat pack gives off warmth.|A chemical reaction raises the container temperature.'],
      ['Endothermic reaction','A cold pack reaction takes in heat.|A reaction cools its container.|Thermal energy enters the reacting mixture.|A chemical process draws warmth from nearby air.|A dissolving salt makes the beaker colder.|A reaction absorbs heat to continue.|The surroundings cool as a reaction occurs.'],
      ['Physical change','Ice melts without forming a new substance.|Paper is torn into strips.|Water boils into vapor.|A metal bar bends.|Sugar dissolves in water.|A glass cup shatters.|Wax hardens after cooling.']]],
    ['sci','Earth and Space Motions',[
      ['Earth rotation','Earth spins once about every 24 hours.|Day and night follow this spin.|A point on Earth turns eastward.|The planet turns about its axis.|The Sun seems to cross the daily sky because Earth spins.|A full turn carries a location through daylight and darkness.|Earth rotates from west to east.'],
      ['Earth revolution','Earth travels around the Sun.|One orbit takes about a year.|Earth follows a path around its star.|A full solar orbit lasts about 365 days.|The planet circles the Sun while tilted.|Our planet returns to a similar orbital position yearly.|Earth completes a revolution around the Sun.'],
      ['Gravity','Earth pulls objects toward its center.|The Sun attracts Earth into an orbit.|A dropped ball accelerates downward.|Masses attract one another.|The Moon is held in orbit by Earth’s pull.|Weight reflects gravitational force.|The tide is affected by the Moon’s pull.']]],

    ['math','Exponent Law Matches',[
      ['Multiply like bases','x² × x³ = x⁵|a⁴ × a² = a⁶|y × y⁷ = y⁸|b³ × b⁵ = b⁸|m⁶ × m = m⁷|p² × p⁶ = p⁸|t⁵ × t⁴ = t⁹'],
      ['Divide like bases','x⁷ ÷ x² = x⁵|a⁹ ÷ a⁴ = a⁵|y⁶ ÷ y = y⁵|b⁸ ÷ b³ = b⁵|m⁵ ÷ m² = m³|p¹⁰ ÷ p⁶ = p⁴|t⁹ ÷ t⁴ = t⁵'],
      ['Power of a power','(x²)³ = x⁶|(a³)² = a⁶|(y⁴)² = y⁸|(b²)⁴ = b⁸|(m³)³ = m⁹|(p⁵)² = p¹⁰|(t⁴)³ = t¹²']]],
    ['math','Angle Pair Relationships',[
      ['Complementary','Two angles add to 90°.|A 20° angle pairs with 70°.|An acute pair fills a right angle.|35° and 55° make a right angle.|48° pairs with 42°.|A 10° angle needs 80° to total 90°.|62° and 28° form this sum.'],
      ['Supplementary','Two angles add to 180°.|A 120° angle pairs with 60°.|A pair fills a straight angle.|75° and 105° total 180°.|133° pairs with 47°.|A 10° angle needs 170° to total 180°.|92° and 88° form this sum.'],
      ['Vertical angles','Opposite angles formed by crossing lines.|The nonadjacent angles at an X are equal.|Two intersecting lines make this equal pair.|The angle across an intersection matches it.|Opposite 40° angles at a crossing.|A 112° angle faces another 112° angle.|The equal angles do not share a side.']]],
    ['math','Coordinate Transformation Rules',[
      ['Translation','(x,y) → (x+3,y)|(x,y) → (x,y-4)|(x,y) → (x-2,y+5)|(x,y) → (x+1,y+1)|(x,y) → (x-6,y)|(x,y) → (x,y+7)|(x,y) → (x+4,y-3)'],
      ['Reflection','(x,y) → (-x,y) across y-axis|(x,y) → (x,-y) across x-axis|(x,y) → (y,x) across y=x|(x,y) → (-y,-x) across y=-x|Mirror every point across the x-axis|Flip a figure across a vertical line|Each image point lies opposite a mirror line'],
      ['Rotation','(x,y) → (-y,x), 90° counterclockwise|(x,y) → (y,-x), 90° clockwise|(x,y) → (-x,-y), 180°|Turn a figure a quarter-turn about the origin|Turn every point halfway around the origin|Rotate a shape 270° counterclockwise|An image is made by turning about a fixed center']]],
    ['math','Scatter Plot Patterns',[
      ['Positive association','As study time rises, scores usually rise.|Taller plants tend to have more leaves.|More practice is linked with faster typing.|Older trees tend to have wider trunks.|Greater distance traveled comes with more fuel used.|More tickets sold tends to mean more revenue.|Warmer days often mean more ice cream sold.'],
      ['Negative association','As price rises, demand usually falls.|More speed means less travel time for a fixed distance.|Higher altitude often means lower air pressure.|More insulation tends to mean less heat loss.|As remaining fuel falls, distance traveled rises.|More errors tend to come with lower scores.|More cloud cover tends to mean less sunlight measured.'],
      ['No clear association','Locker number shows no pattern with height.|Birth month number shows no pattern with pencil length.|Bus seat number does not predict reading speed.|Last-name letter count does not track shoe size.|A student ID number does not predict test time.|Bus route number does not track hand span.|Survey response number does not predict resting pulse.']]],
    ['math','Volume Formula Clues',[
      ['Cylinder','V = πr²h|Circular base with constant cross-section|A can-shaped solid|A stack of equal circles|Base area πr² times height|Two congruent circular bases joined by a curved side|A prism-like solid with round bases'],
      ['Cone','V = ⅓πr²h|Circular base tapering to a point|An ice-cream-cone-shaped solid|One-third the matching cylinders volume|A vertex above one round base|A pointed solid with one circular base|A round pyramid-like solid'],
      ['Sphere','V = ⁴⁄₃πr³|Every surface point is equally far from its center|A ball-shaped solid|Its volume depends on radius cubed|No edges and no flat faces|A perfectly round three-dimensional object|A solid made of all points within a fixed distance of a center']]],
    ['math','Real Number Membership',[
      ['Integer','-8|-3|0|4|11|27|-15'],
      ['Rational non-integer','1/2|-3/4|0.25|2.5|-1.2|7/3|0.125'],
      ['Irrational','√2|π|√3|√5|√7|√11|√13']]],

    ['alg1','Slope Sign from Equations',[
      ['Positive slope','y = 2x + 1|y = x - 4|y = 3x + 7|y = 0.5x - 2|y = 4x|y = 7x + 1|y = ⅓x - 6'],
      ['Negative slope','y = -2x + 1|y = -x - 4|y = -3x + 7|y = -0.5x - 2|y = -4x|y = -7x + 1|y = -⅓x - 6'],
      ['Zero slope','y = 2|y = -4|y = 0|y = 7|y = 12|y = -9|y = ½']]],
    ['alg1','Function Growth Types',[
      ['Linear','y = 2x + 3|y = -x + 8|y = 5x|y = 0.5x - 1|y = 7 - 3x|y = x + 12|y = 4x - 9'],
      ['Quadratic','y = x² + 3|y = 2x² - 1|y = x² - 4x|y = -x² + 5|y = 3x² + x|y = (x+1)²|y = x(x-2)'],
      ['Exponential','y = 2ˣ|y = 3ˣ + 1|y = 5(2ˣ)|y = 10(0.5ˣ)|y = 4(3ˣ)|y = 7(1.2ˣ)|y = 6(0.8ˣ)']]],
    ['alg1','Systems by Intersection',[
      ['One solution','y=x and y=-x|y=2x+1 and y=x+4|y=3x and y=x-2|y=-x+5 and y=2x|y=4x+1 and y=-2x+7|y=x-3 and y=5x+1|y=-3x+2 and y=x+6'],
      ['No solution','y=2x+1 and y=2x+4|y=x and y=x-5|y=-3x+2 and y=-3x+7|y=4x and y=4x-1|y=0.5x+3 and y=0.5x|y=-x+6 and y=-x-2|y=7x+1 and y=7x+9'],
      ['Infinitely many solutions','y=2x+1 and 2y=4x+2|y=x-3 and 2y=2x-6|y=-x+4 and 3y=-3x+12|y=5x and 2y=10x|y=3x-2 and 4y=12x-8|y=-2x+7 and 2y=-4x+14|y=0.5x+1 and 2y=x+2']]],
    ['alg1','Inequality Language',[
      ['Strictly greater','x > 5|more than 12|above 0, excluding 0|any value beyond 7|greater than -3|x exceeds 9|the number is over 20'],
      ['At least','x ≥ 5|no fewer than 12|0 or above|7 or more|greater than or equal to -3|x is not below 9|the number is 20 or more'],
      ['At most','x ≤ 5|no more than 12|0 or below|7 or less|less than or equal to -3|x is not above 9|the number is 20 or less']]],
    ['alg1','Polynomial Degree',[
      ['Degree one','2x+1|x-4|7x|3-5x|½x+2|9x-8|-x+6'],
      ['Degree two','x²+1|3x²-x|x²-9|5x²+2|x(x+3)|4-2x²|7x²+x-1'],
      ['Degree three','x³+1|2x³-x|x³-8|5x³+x²|x(x²+3)|4-2x³|7x³+x-1']]],
    ['alg1','Domain and Range Statements',[
      ['Domain','The possible x-values.|Inputs to a function.|All first coordinates of graph points.|Values allowed into the rule.|The horizontal values the graph covers.|Independent-variable values.|The set of valid inputs.'],
      ['Range','The possible y-values.|Outputs from a function.|All second coordinates of graph points.|Values produced by the rule.|The vertical values the graph reaches.|Dependent-variable values.|The set of actual outputs.'],
      ['Function rule','Each input has exactly one output.|A vertical line meets its graph at most once.|One x-value cannot have two y-values.|Input 3 must map to only one result.|The relation assigns one output per input.|Repeated inputs must give the same output.|Every valid input has a single image.']]],

    ['hist','Colonial Regional Patterns',[
      ['New England colonies','Rocky soil favored smaller farms.|Fishing and shipbuilding grew along the coast.|Massachusetts was in this region.|Puritan communities shaped many towns.|Cold winters limited growing seasons.|Harbors supported Atlantic trade.|Town meetings were common in local government.'],
      ['Middle colonies','Pennsylvania was in this region.|Grain farming earned the breadbasket nickname.|New York belonged to this region.|Religious and cultural diversity was notable.|The Delaware River supported trade.|Wheat farms supplied growing cities.|Philadelphia became a major port.'],
      ['Southern colonies','Tobacco plantations spread in Virginia.|Long growing seasons supported cash crops.|Georgia belonged to this region.|Rice was cultivated in coastal lowlands.|Large plantations relied on enslaved labor.|Maryland belonged to this region.|Indigo became a cash crop.']]],
    ['hist','Constitutional Design',[
      ['Federalism','Power is divided between national and state governments.|States govern many local matters.|The national government handles delegated powers.|Both state and national laws can apply.|Some powers are reserved to states.|Two levels of government share authority.|The Constitution assigns roles to states and the nation.'],
      ['Separation of powers','Legislative and executive roles are assigned to different branches.|Courts form a branch separate from Congress.|Lawmaking and law enforcement are assigned to different branches.|Three branches have distinct core duties.|The president does not sit as the Supreme Court.|Congress is separate from the presidency.|Judging cases is assigned to the judiciary.'],
      ['Checks and balances','A president can veto a bill.|Congress can override a veto.|The Senate confirms some appointments.|Courts can review laws for constitutionality.|The House can impeach officials.|The Senate tries impeachments.|Congress can propose constitutional amendments.']]],
    ['hist','Early Presidents and Events',[
      ['Washington administration','The first federal cabinet took shape.|The Whiskey Rebellion tested federal authority.|The Neutrality Proclamation was issued in 1793.|The first president set a two-term precedent.|Hamilton proposed a national bank.|The Jay Treaty was negotiated.|A farewell address warned against permanent alliances.'],
      ['Adams administration','The Alien and Sedition Acts were passed.|The XYZ Affair strained relations with France.|The second president faced an undeclared naval conflict with France.|The election of 1800 ended this presidency.|The Kentucky and Virginia Resolutions responded to federal laws.|A convention in 1800 helped end conflict with France.|John Adams served as the second president.'],
      ['Jefferson administration','The Louisiana Purchase was made.|Lewis and Clark explored western lands.|The Embargo Act was signed in 1807.|Marbury v. Madison was decided in 1803.|The third president took office in 1801.|The United States purchased land from France in 1803.|Jefferson sent an expedition toward the Pacific.']]],
    ['hist','Westward Expansion Effects',[
      ['Economic motive','Settlers sought farmland in the West.|Gold drew migrants to California.|Railroads promised new trade routes.|Merchants wanted access to Pacific ports.|Land speculation encouraged migration.|Farm families sought larger plots.|Mining opportunities attracted workers.'],
      ['Government action','Congress passed the Homestead Act.|The federal government funded railroad construction.|The Indian Removal Act became law.|The United States negotiated the Oregon Treaty.|The Louisiana Purchase expanded U.S. territory.|Federal treaties claimed Indigenous lands.|The Gadsden Purchase added southwestern land.'],
      ['Impact on Indigenous nations','Communities were forced from ancestral lands.|Treaties were repeatedly broken.|Bison loss damaged Plains lifeways.|Reservations confined many nations.|War and disease caused population loss.|Traditional food sources were disrupted.|Indigenous resistance defended homelands.']]],
    ['hist','Nineteenth-Century Reform Goals',[
      ['Abolition','End slavery in the United States.|Publish antislavery newspapers.|Organize against the slave trade.|Help people escape enslavement.|Petition Congress to oppose slavery.|Demand emancipation.|Challenge laws protecting enslavement.'],
      ['Women’s rights','Seek voting rights for women.|Demand equal access to education.|Call for equal property rights.|Organize the Seneca Falls Convention.|Challenge unequal legal status in marriage.|Campaign for women’s suffrage.|Ask for equal opportunities in public life.'],
      ['Temperance','Reduce consumption of alcoholic drinks.|Campaign against alcohol abuse.|Promote abstaining from liquor.|Organize local temperance societies.|Support restrictions on alcohol sales.|Warn about harms linked to drunkenness.|Urge families to avoid strong drink.']]],
    ['hist','Industrial Economy Roles',[
      ['Agriculture','Farmers grow wheat for markets.|Cotton is harvested in fields.|A family raises dairy cattle.|Crops are planted and gathered.|A farm produces corn.|Workers tend fruit orchards.|Ranchers raise livestock.'],
      ['Manufacturing','A textile mill turns cotton into cloth.|A factory assembles machines.|Steelworks produce rails.|Workers make shoes in a plant.|A workshop builds furniture.|A mill spins thread.|A plant produces canned food.'],
      ['Transportation','Railroads carry goods between cities.|A canal moves cargo by boat.|Steamships cross rivers with freight.|A train delivers grain to a port.|Horse-drawn wagons carry supplies.|A road links farms to markets.|A cargo ship moves products overseas.']]]
  ];
  const combinations=[];
  for(let a=0;a<7;a++)for(let b=a+1;b<7;b++)combinations.push([0,1,2,3,4,5,6].filter(i=>i!==a&&i!==b));
  const counts={eng:0,sci:0,math:0,alg1:0,hist:0};
  for(const [subject,name,groups] of lessons){
    const lesson=130+counts[subject]++;
    const categories=groups.map(([label],i)=>({id:`c${i}`,label}));
    const questions=Array.from({length:25},(_,round)=>{
      const options=groups.flatMap(([,source],group)=>{
        const pool=source.split('|');
        const offset=(round*(group+1)+Math.floor(round/21)*(group+2)+group*7)%21;
        return combinations[offset].map((i,card)=>({id:`q${round}-c${group}-o${card}`,text:pool[i],category:`c${group}`}));
      });
      const rotation=round*7%options.length;
      return {type:'drag',q:`${name}: sort all 15 cards. Set ${round+1}.`,categories,options:options.slice(rotation).concat(options.slice(0,rotation)),difficulty:['Foundation','Developing','Applying','Reasoning','Challenge'][Math.floor(round/5)],explain:'Read each category heading; every card belongs in exactly one category.'};
    });
    data[`g8:${subject}:L${lesson}`]={name:`${name}`,topic:'Category Sorting',difficulty:'Practice',contentVersion:'20261018.4',questions};
  }
})();
