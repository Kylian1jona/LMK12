/* Twenty more Grade 8 drag-and-drop lessons, each with 25 distinct sorting sets. */
(function(){
  const bank=window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  const lessons=[
    ['eng','Pronoun Forms',[
      ['Subject pronoun','I will lead.|You can begin.|He reads aloud.|She draws maps.|It rolls downhill.|We solved it.|They arrived early.'],
      ['Object pronoun','Call me tomorrow.|I will help you.|We saw him.|The prize surprised her.|Please move it.|The coach thanked us.|Mina invited them.'],
      ['Possessive pronoun','That book is mine.|The choice is yours.|The blue bag is his.|The drawing is hers.|The red jacket is mine.|The victory is ours.|The seats are theirs.']]],
    ['eng','Context Clue Signals',[
      ['Definition clue','A nocturnal animal, one active at night, emerged.|An archipelago, a group of islands, appeared on the map.|A habitat, the place an organism lives, can change.|An artisan, a skilled craft worker, made the vase.|A decade, a period of ten years, passed.|A catalyst, a substance that speeds a reaction, was added.|A novice, a beginner, joined the team.'],
      ['Example clue','Arboreal animals, such as tree frogs and squirrels, climb branches.|Citrus fruits, including lemons and oranges, taste tart.|Pollinators like bees and butterflies visit flowers.|Renewable sources such as wind and sunlight replenish naturally.|Invertebrates, including worms and snails, lack backbones.|Tools like chisels and planes shaped the wood.|Condiments such as mustard and relish were offered.'],
      ['Contrast clue','Unlike the timid rabbit, the bold fox approached.|The valley was arid, but the nearby forest was damp.|The flimsy bridge failed, while the sturdy one held.|Rather than vague, her directions were precise.|The first speech was brief, but the second was lengthy.|His tone was stern, not gentle.|The murky pond contrasted with the clear stream.']]],
    ['eng','Persuasive Appeals',[
      ['Evidence and logic','A survey of 500 riders found shorter waits.|The graph shows a 12 percent decrease.|Three independent studies report the same result.|The proposed route saves eight minutes.|Cost totals show the repair is cheaper.|Measured air quality improved after the change.|A comparison table supports the claim.'],
      ['Credibility','A licensed engineer inspected the bridge.|The author has studied this topic for twenty years.|A trained nurse explains the health guidance.|The report comes from the city records office.|An eyewitness describes what she observed.|The researcher lists her methods and sources.|A certified mechanic explains the repair.'],
      ['Emotion','Imagine a child waiting alone in the rain.|The lonely shelter felt cold and forgotten.|A rescue story brought the crowd to tears.|Picture the joy of a safe playground.|The speech asked listeners to feel the families fear.|A sad photograph urged people to help.|The writer described the relief of coming home.']]],
    ['eng','Punctuation Patterns',[
      ['Comma with conjunction','We studied, and we passed.|It rained, but the game continued.|She called, so I answered.|The bell rang, yet no one moved.|He cooked, and I cleaned.|I wanted to go, but I stayed.|The bus stopped, so we boarded.'],
      ['Semicolon between clauses','We studied; we passed.|It rained; the game continued.|She called; I answered.|The bell rang; no one moved.|He cooked; I cleaned.|I wanted to go; I stayed.|The bus stopped; we boarded.'],
      ['Colon introducing a list','Bring three things: paper, pencils, and tape.|We visited two cities: Austin and Dallas.|The recipe needs these items: rice, beans, and salt.|Choose one color: red, blue, or green.|The bag held supplies: rope, water, and a map.|Pack the following: shoes, socks, and a coat.|The team has three roles: writer, editor, and speaker.']]],

    ['sci','Subatomic Particle Clues',[
      ['Proton','This particle has a positive charge.|It is found in the atomic nucleus and is positive.|The atomic number counts these particles.|A hydrogen nucleus usually contains one.|Adding one changes the element identity.|It has much more mass than an electron.|Its charge is +1.'],
      ['Neutron','This particle has no electrical charge.|It is found in the nucleus and is neutral.|Isotopes of one element differ in this particle count.|A common carbon atom has six of these.|It has about the same mass as a proton.|Its charge is 0.|It can help stabilize an atomic nucleus.'],
      ['Electron','This particle has a negative charge.|It occupies the region outside the nucleus.|Chemical bonds involve these particles.|A neutral atom has as many of these as protons.|It has far less mass than a proton.|Its charge is -1.|Losing one can produce a positive ion.']]],
    ['sci','Ecological Relationships',[
      ['Mutualism','A bee gets nectar while a flower is pollinated.|A cleaner fish eats parasites from a larger fish.|Fungi and algae both benefit in a lichen.|A plant feeds bacteria that fix nitrogen for it.|A bird eats ticks from a mammal and gains food.|A fruit tree feeds an animal that disperses its seeds.|Coral and its resident algae exchange resources.'],
      ['Commensalism','A barnacle rides a whale without affecting it much.|An orchid grows on a tree branch without taking nutrients.|A cattle egret catches insects stirred up by cattle.|A bird nests in a tree without significantly affecting it.|A small fish shelters near a larger animal without harming it.|Moss grows on bark without drawing food from the tree.|A remora rides a shark and eats scraps without much effect.'],
      ['Parasitism','A tick feeds on a deer.|A tapeworm takes nutrients from its host.|A mosquito takes blood from a person.|Mistletoe draws water from a tree.|Fleas feed on a dogs blood.|A parasitic wasp larva feeds on its host.|A louse lives on a bird and feeds from it.']]],
    ['sci','Plate Boundary Motion',[
      ['Divergent boundary','Two plates move apart.|New crust forms at a mid-ocean ridge.|Magma rises into a spreading gap.|A rift valley can develop.|Seafloor spreading occurs here.|Tension pulls crust in opposite directions.|A ridge marks plates separating.'],
      ['Convergent boundary','Two plates move toward one another.|One plate may sink under another.|Collision can build a mountain range.|A trench can form at subduction.|Crust can be compressed by collision.|A volcanic arc may form above a sinking plate.|Plates meet head-on.'],
      ['Transform boundary','Two plates slide past each other.|Crust is neither made nor destroyed at this boundary.|Sideways motion occurs along a fault.|Friction builds as plates pass laterally.|A strike-slip fault is a common example.|The boundary motion is mainly horizontal.|Shallow earthquakes occur as plates grind past.']]],
    ['sci','Experiment Variables',[
      ['Independent variable','The amount of fertilizer the researcher changes.|The chosen light exposure for each plant group.|The temperature set for each trial.|The type of soil assigned to each pot.|The number of practice minutes varied by group.|The water amount deliberately changed.|The battery brand selected for testing.'],
      ['Dependent variable','Plant height measured after treatment.|The number of leaves counted at the end.|The time recorded until a reaction finishes.|The test score measured after practice.|The distance a toy car travels.|The brightness recorded by a sensor.|The mass of fruit harvested.'],
      ['Controlled variable','Every pot receives the same seed type.|All trials use identical containers.|Each group is measured at the same time of day.|The same ruler is used each time.|Every toy car starts on the same surface.|The same water source is used for all plants.|Each reaction uses the same container size.']]],

    ['math','Square Root Benchmarks',[
      ['Exact whole-number root','√1 = 1|√4 = 2|√9 = 3|√16 = 4|√25 = 5|√36 = 6|√49 = 7'],
      ['Between 1 and 2','√2|√3|√2.25|√2.56|√3.24|√2.89|√3.61'],
      ['Between 2 and 3','√5|√6|√7|√8|√6.25|√7.29|√8.41']]],
    ['math','Relations from Ordered Pairs',[
      ['Linear function','(0,1),(1,3),(2,5)|(0,4),(1,3),(2,2)|(0,0),(1,4),(2,8)|(0,2),(1,2),(2,2)|(0,-1),(1,1),(2,3)|(0,7),(1,5),(2,3)|(0,3),(1,6),(2,9)'],
      ['Nonlinear function','(0,0),(1,1),(2,4)|(0,1),(1,2),(2,5)|(0,0),(1,2),(2,8)|(0,3),(1,4),(2,7)|(0,5),(1,6),(2,9)|(0,2),(1,3),(2,6)|(0,4),(1,5),(2,8)'],
      ['Not a function','(1,2),(1,3),(2,4)|(0,1),(0,5),(2,3)|(3,2),(3,8),(4,1)|(2,7),(2,6),(5,0)|(4,1),(4,9),(6,2)|(5,3),(5,4),(7,8)|(6,0),(6,1),(8,2)']]],
    ['math','Pythagorean Relationship',[
      ['Right-triangle side lengths','3, 4, 5|5, 12, 13|8, 15, 17|7, 24, 25|6, 8, 10|9, 12, 15|10, 24, 26'],
      ['Acute-triangle side lengths','5, 5, 5|6, 6, 7|7, 8, 9|8, 8, 10|9, 10, 11|10, 10, 12|11, 12, 13'],
      ['Obtuse-triangle side lengths','3, 4, 6|4, 5, 8|5, 6, 10|6, 7, 11|7, 8, 13|8, 9, 15|9, 10, 17']]],
    ['math','Probability Language',[
      ['Impossible event','Roll a 7 on a standard six-sided die.|Draw a blue marble from a bag with only red marbles.|Flip a coin and land on a third side.|Choose a 13 from cards numbered 1 to 12.|Get a negative number on a die numbered 1 to 6.|Pick a vowel from a bag containing only consonants.|Spin 5 on a spinner labeled only 1 through 4.'],
      ['Certain event','Roll a number from 1 to 6 on a standard die.|Draw a red marble from a bag of only red marbles.|A coin lands on heads or tails in this model.|Choose a number from 1 to 12 on cards numbered 1 to 12.|A die numbered 1 to 6 shows a positive number.|Pick a letter from a bag containing only letters.|Spin 1 through 4 on a spinner labeled only 1 through 4.'],
      ['Possible but uncertain','Roll a 4 on a standard six-sided die.|Draw a red marble from a mixed red and blue bag.|Flip heads on a fair coin.|Choose an even card from cards numbered 1 to 12.|Roll a number greater than 3 on a standard die.|Pick a vowel from a bag with vowels and consonants.|Spin 2 on a spinner labeled 1 through 4.']]],

    ['alg1','Forms of Linear Equations',[
      ['Slope-intercept form','y = 2x + 3|y = -x + 5|y = 4x - 1|y = 0.5x + 7|y = -3x|y = x - 8|y = 6x + 2'],
      ['Point-slope form','y - 3 = 2(x - 1)|y + 4 = -3(x - 2)|y - 1 = 5(x + 2)|y + 2 = 4(x - 3)|y - 5 = -2(x + 1)|y + 7 = x - 4|y - 6 = 0.5(x + 3)'],
      ['Standard form','2x + 3y = 6|x - 4y = 8|5x + y = 10|3x - 2y = 7|6x + 5y = 1|4x - y = 9|7x + 2y = 14']]],
    ['alg1','Factoring Strategies',[
      ['Greatest common factor','3x + 6 = 3(x + 2)|4x² + 8x = 4x(x + 2)|5x - 10 = 5(x - 2)|6x² + 9x = 3x(2x + 3)|7x + 14 = 7(x + 2)|8x² - 4x = 4x(2x - 1)|10x + 15 = 5(2x + 3)'],
      ['Difference of squares','x² - 9 = (x - 3)(x + 3)|x² - 16 = (x - 4)(x + 4)|4x² - 25 = (2x - 5)(2x + 5)|9x² - 1 = (3x - 1)(3x + 1)|x² - 49 = (x - 7)(x + 7)|25x² - 4 = (5x - 2)(5x + 2)|16x² - 81 = (4x - 9)(4x + 9)'],
      ['Trinomial factoring','x² + 5x + 6 = (x + 2)(x + 3)|x² - 5x + 6 = (x - 2)(x - 3)|x² + 7x + 12 = (x + 3)(x + 4)|x² + 3x - 10 = (x + 5)(x - 2)|x² - x - 12 = (x - 4)(x + 3)|x² + 9x + 20 = (x + 4)(x + 5)|x² - 7x + 10 = (x - 5)(x - 2)']]],
    ['alg1','Sequence Patterns',[
      ['Arithmetic sequence','2, 5, 8, 11|10, 8, 6, 4|1, 5, 9, 13|7, 10, 13, 16|20, 15, 10, 5|3, 9, 15, 21|0, 4, 8, 12'],
      ['Geometric sequence','2, 4, 8, 16|81, 27, 9, 3|3, 6, 12, 24|1, 3, 9, 27|5, 10, 20, 40|64, 32, 16, 8|4, 12, 36, 108'],
      ['Neither pattern','1, 2, 4, 7|2, 3, 5, 8|1, 4, 9, 16|3, 5, 8, 12|2, 5, 10, 17|4, 7, 11, 16|1, 3, 6, 10']]],
    ['alg1','Features of a Line',[
      ['Slope','The rise divided by the run.|A line increases 3 units for each step right.|The coefficient of x in y = mx + b.|Change in y divided by change in x.|A negative value means the line falls to the right.|The rate of change of a linear function.|A horizontal line has this value equal to 0.'],
      ['Y-intercept','The point where a graph crosses the vertical axis.|Set x = 0 to find this value.|The b in y = mx + b.|The output when the input is zero.|A line crosses the y-axis at (0, 4).|The graph meets the vertical axis at 6.|The starting amount in a linear model.'],
      ['X-intercept','The point where a graph crosses the horizontal axis.|Set y = 0 to find this value.|A line crosses the x-axis at (3, 0).|The input that makes the output zero.|The graph meets the horizontal axis at -2.|This point has a y-coordinate of 0.|A root of a linear function gives this input.']]],

    ['hist','War of 1812',[
      ['Cause','British impressment angered Americans.|Trade restrictions disrupted U.S. commerce.|Some Americans wanted to resist British interference.|Conflicts on the western frontier raised tensions.|War Hawks urged a stronger response.|British support for some Native resistance alarmed settlers.|Disputes over neutral shipping increased friction.'],
      ['Event during the war','The United States declared war in 1812.|British troops burned public buildings in Washington.|The Battle of Lake Erie was fought.|Fort McHenry resisted a British attack.|The Battle of New Orleans was fought.|U.S. forces invaded parts of Canada.|The Treaty of Ghent was signed in 1814.'],
      ['Result or legacy','The Treaty of Ghent ended the war.|No major boundary changes followed the peace.|The national anthem drew from Fort McHenry.|Andrew Jackson gained national fame.|Federalist opposition weakened after the war.|Americans celebrated a sense of national pride.|The war encouraged some domestic manufacturing.']]],
    ['hist','First Amendment Protections',[
      ['Speech and press','A student expresses a political opinion.|A newspaper criticizes a public policy.|A writer publishes an editorial.|People debate a proposed law.|A reporter investigates officials.|A speaker argues for a candidate.|A magazine prints a viewpoint.'],
      ['Religion','A family attends a place of worship.|A person chooses no religion.|A community practices its faith.|A citizen follows a religious tradition.|The government cannot establish a national church.|A person changes religious beliefs.|A group worships according to its beliefs.'],
      ['Assembly and petition','Residents gather for a peaceful rally.|Neighbors ask officials to repair a road.|People sign a petition to change a rule.|A group holds a peaceful march.|Citizens meet to discuss a cause.|Voters submit a formal request to lawmakers.|A crowd peacefully demonstrates outside city hall.']]],
    ['hist','Historical Thinking Moves',[
      ['Sourcing','Who wrote this letter?|When was this source created?|What was the authors purpose?|Was the witness present at the event?|Who was the intended audience?|What role did the writer hold?|Where did this document come from?'],
      ['Corroboration','Do two accounts agree on the date?|Compare a diary with a newspaper report.|Check whether another record confirms the claim.|Find a second source about the same event.|Identify details shared by several witnesses.|Compare conflicting descriptions of the battle.|Test one account against independent evidence.'],
      ['Contextualization','What else was happening at the time?|How did contemporary laws shape this decision?|Place the event within its era.|Consider beliefs common in that period.|How did the economy affect this action?|What earlier events led to this document?|Explain the setting in which the speech was given.']]],
    ['hist','Migration and Industrial Cities',[
      ['Push factor','Crop failure made families leave home.|Political persecution drove people away.|War disrupted daily life.|A lack of jobs encouraged departure.|Food shortages forced migration.|Violence threatened a community.|High land costs made staying difficult.'],
      ['Pull factor','Factory jobs attracted newcomers.|Relatives invited families to join them.|Available land promised a new start.|Higher wages drew workers.|A city offered more schools.|Religious freedom appealed to migrants.|Rail links made a destination accessible.'],
      ['Urban challenge','Crowded tenements spread disease.|Factories sometimes exposed workers to injury.|Limited clean water threatened health.|Poor sanitation polluted streets.|Housing shortages raised rents.|Smoke worsened city air.|Child labor limited schooling.']]]
  ];
  const combinations=[];
  for(let a=0;a<7;a++)for(let b=a+1;b<7;b++)combinations.push([0,1,2,3,4,5,6].filter(i=>i!==a&&i!==b));
  const counts={eng:0,sci:0,math:0,alg1:0,hist:0};
  for(const [subject,name,groups] of lessons){
    const id=`g8:${subject}:L${140+counts[subject]++}`;
    if(bank[id])throw Error(`Duplicate Grade 8 lesson ID: ${id}`);
    const categories=groups.map(([label],i)=>({id:`c${i}`,label}));
    const questions=Array.from({length:25},(_,round)=>{
      const options=groups.flatMap(([,source],group)=>{
        const pool=source.split('|');
        if(pool.length!==7)throw Error(`${name} category ${group} needs seven examples`);
        const offset=(round*(group+1)+Math.floor(round/21)*(group+2)+group*7)%21;
        return combinations[offset].map((i,card)=>({id:`q${round}-c${group}-o${card}`,text:pool[i],category:`c${group}`}));
      });
      const rotation=round*7%options.length;
      return {type:'drag',q:`${name}: sort all 15 cards. Set ${round+1}.`,categories,options:options.slice(rotation).concat(options.slice(0,rotation)),difficulty:['Foundation','Developing','Applying','Reasoning','Challenge'][Math.floor(round/5)],explain:'Read each category heading; every card belongs in exactly one category.'};
    });
    bank[id]={name:`${name}`,topic:'Category Sorting',difficulty:'Practice',contentVersion:'20261020.1',questions};
  }
})();
