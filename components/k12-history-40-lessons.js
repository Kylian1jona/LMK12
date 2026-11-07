/* Twenty additional history lessons in each of Grades 2 and 4. */
(function(){
  const data=window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  const grade2=[
    ['Community Helpers','Community Life',['teacher','firefighter','doctor','mail carrier','librarian'],[
      'Helps children learn in a classroom|teacher','Helps put out a dangerous fire|firefighter','Helps a sick person get well|doctor','Brings letters to homes|mail carrier','Helps people find books|librarian']],
    ['Needs and Wants','Community Life',['food','water','shelter','toy','video game'],[
      'Something people eat to live|food','Something people drink to live|water','A safe place to live|shelter','Something fun to play with but not needed to live|toy','An electronic game for fun|video game']],
    ['Goods and Services','Community Life',['good','service','store','worker','customer'],[
      'An object people can buy and take home|good','Work someone does to help another person|service','A place where people buy goods|store','A person who does a job|worker','A person who buys a good or service|customer']],
    ['Producers and Consumers','Community Life',['producer','consumer','farmer','baker','shopper'],[
      'A person who makes or grows something to sell|producer','A person who buys or uses a good|consumer','A worker who grows crops|farmer','A worker who makes bread|baker','A person choosing food to buy|shopper']],
    ['Map Symbols and Keys','Maps and Places',['map key','symbol','map title','scale','compass rose'],[
      'Explains what pictures and colors on a map mean|map key','A small picture that stands for a real place|symbol','Tells what area a map shows|map title','Helps compare map distance with real distance|scale','Shows north, south, east, and west|compass rose']],
    ['Cardinal Directions','Maps and Places',['north','south','east','west','compass'],[
      'Direction usually at the top of a map|north','Direction opposite north|south','Direction where the Sun usually rises|east','Direction where the Sun usually sets|west','Tool that helps find direction|compass']],
    ['Land and Water Features','Maps and Places',['river','lake','mountain','valley','island'],[
      'Flowing water that moves toward a larger body of water|river','Water surrounded by land|lake','Very high land rising above nearby areas|mountain','Low land between hills or mountains|valley','Land surrounded by water|island']],
    ['Neighborhood Places','Maps and Places',['school','library','park','clinic','post office'],[
      'Place where children attend classes|school','Place where people borrow books|library','Outdoor public place for play and rest|park','Place where people get basic health care|clinic','Place where letters and parcels are sent|post office']],
    ['Civic Responsibilities','Rules and Choices',['follow rules','help others','keep places clean','listen respectfully','take turns'],[
      'Doing what a shared safety agreement asks|follow rules','Offering support to someone who needs it|help others','Putting litter in a bin|keep places clean','Letting another person finish speaking|listen respectfully','Sharing a game so everyone gets a chance|take turns']],
    ['Voting and Fair Choices','Rules and Choices',['vote','ballot','majority','fairness','choice'],[
      'Show which option you prefer in a group decision|vote','Paper or screen used to record a vote|ballot','More than half of the votes|majority','Treating people by the same agreed rules|fairness','An option a person may select|choice']],
    ['Timelines and Order','Past and Present',['timeline','past','present','first','last'],[
      'Line showing events in time order|timeline','Time before today|past','Time happening now|present','Event that happens before the others|first','Event that happens after the others|last']],
    ['Sources from the Past','Past and Present',['photograph','letter','artifact','diary','interview'],[
      'Picture made by a camera that can show the past|photograph','Written message sent from one person to another|letter','Object people made or used long ago|artifact','Personal record of daily experiences|diary','Questions asked to learn from a person|interview']],
    ['Family Traditions','Culture and Change',['tradition','recipe','story','song','celebration'],[
      'A custom a family repeats over time|tradition','Directions for making a family dish|recipe','Something told about family experiences|story','Music a family may share across generations|song','Special event a family may observe together|celebration']],
    ['Cultural Celebrations','Culture and Change',['music','food','clothing','dance','language'],[
      'Sounds and songs shared at a celebration|music','Dishes prepared for a holiday|food','Garments worn for an event|clothing','Movement performed to a rhythm|dance','Words people use to communicate|language']],
    ['Transportation Then and Now','Culture and Change',['horse cart','bicycle','train','car','airplane'],[
      'Older road vehicle pulled by an animal|horse cart','Two-wheeled vehicle moved by pedaling|bicycle','Vehicle that runs on tracks|train','Road vehicle with an engine and wheels|car','Vehicle that carries people through the air|airplane']],
    ['Communication Then and Now','Culture and Change',['letter','telephone','email','radio','video call'],[
      'Written message carried to another place|letter','Device used to talk with someone far away|telephone','Digital message sent through the internet|email','Device that sends sound to many listeners|radio','Live conversation with picture and sound|video call']],
    ['How Communities Change','Culture and Change',['new school','new road','new homes','new park','new library'],[
      'Building where more children can attend classes|new school','Path that helps people travel across town|new road','Buildings where new neighbors can live|new homes','Outdoor space added for play and rest|new park','Place added so more people can borrow books|new library']],
    ['Saving and Spending','Community Life',['save','spend','budget','price','change'],[
      'Keep money for something later|save','Use money to buy something now|spend','Plan for how money will be used|budget','Amount an item costs|price','Money returned after paying more than the cost|change']],
    ['Caring for Shared Places','Rules and Choices',['recycle','pick up litter','plant a tree','save water','use a bin'],[
      'Turn used material into something usable again|recycle','Remove trash left on the ground|pick up litter','Put a young tree into the soil|plant a tree','Use only the water needed|save water','Place waste in the proper container|use a bin']],
    ['Local Landmarks','Maps and Places',['monument','historic building','bridge','museum','plaque'],[
      'Structure built to remember a person or event|monument','Older structure connected to the local past|historic building','Structure that crosses a river or road|bridge','Place that keeps and displays objects from the past|museum','Small sign explaining a historic place|plaque']]
  ];
  const grade4=[
    ['Physical Maps','Geography and Resources',['mountain','river','plain','desert','coast'],[
      'Land rising high above nearby areas|mountain','Natural channel of flowing water|river','Wide area of mostly level land|plain','Very dry area with little rainfall|desert','Land along an ocean or sea|coast']],
    ['Political Maps','Geography and Resources',['state boundary','capital','country','city','legend'],[
      'Line separating two states on a map|state boundary','City where a government is based|capital','Large political area with its own government|country','Community with many streets and buildings|city','Key explaining map symbols|legend']],
    ['Latitude and Longitude','Geography and Resources',['latitude','longitude','equator','prime meridian','coordinates'],[
      'Lines measuring distance north or south of the equator|latitude','Lines measuring distance east or west of the prime meridian|longitude','Imaginary line halfway between the North and South Poles|equator','Zero-degree line used to measure east and west|prime meridian','Pair of numbers used to locate a place on a map|coordinates']],
    ['Landforms and Climate','Geography and Resources',['mountain','valley','plateau','climate','weather'],[
      'High land with steep sides|mountain','Low land between higher areas|valley','High land with a mostly flat top|plateau','Usual weather pattern of a region over many years|climate','Conditions outside on a particular day|weather']],
    ['Natural Resources','Geography and Resources',['water','soil','forest','mineral','sunlight'],[
      'Resource people drink and use for crops|water','Ground material that supports many plants|soil','Area of trees providing wood and habitat|forest','Naturally occurring substance found in rock|mineral','Energy from the Sun used by plants|sunlight']],
    ['Adapting to Environments','Geography and Resources',['irrigation','insulation','terracing','shade','levee'],[
      'Bringing water to crops in dry areas|irrigation','Material that helps a building keep heat in or out|insulation','Making level steps on a steep slope for farming|terracing','Protection from strong sunlight|shade','Raised barrier that helps hold back floodwater|levee']],
    ['Indigenous Cultures','People and Movement',['oral tradition','nation','language','homeland','sovereignty'],[
      'History and knowledge passed through spoken stories|oral tradition','A distinct Indigenous political and cultural community|nation','Words and rules used by a community to communicate|language','Traditional place to which a people belongs|homeland','A nation’s authority to govern itself|sovereignty']],
    ['Exploration and Exchange','People and Movement',['trade','navigation','exchange','contact','route'],[
      'Buying and selling goods between groups|trade','Planning and following a path across land or water|navigation','Sharing goods or ideas between communities|exchange','Meeting between peoples who were previously apart|contact','Path traveled from one place to another|route']],
    ['Colonies and Settlements','People and Movement',['colony','settlement','charter','port','farming'],[
      'Territory controlled by a government from another place|colony','Community where people establish homes|settlement','Written grant giving permission or rights|charter','Place where ships load and unload goods|port','Growing crops and raising animals for food|farming']],
    ['Community Growth','People and Movement',['jobs','transportation','housing','schools','resources'],[
      'Work opportunities that may draw new residents|jobs','Ways people and goods move around a town|transportation','Places where growing numbers of people can live|housing','Places that serve children as a population grows|schools','Materials and supplies a community uses|resources']],
    ['State Government Branches','Government and Economics',['legislative','executive','judicial','law','governor'],[
      'Branch that writes and passes state laws|legislative','Branch that carries out state laws|executive','Branch that interprets laws in court cases|judicial','Rule passed by a government|law','Leader of a state executive branch|governor']],
    ['Local Government Services','Government and Economics',['fire service','public library','road repair','water service','parks'],[
      'Local help responding to fires|fire service','Public place offering books and information|public library','Work fixing damaged streets|road repair','System delivering clean water to homes|water service','Shared outdoor places maintained for recreation|parks']],
    ['Taxes and Public Goods','Government and Economics',['tax','public good','budget','service','revenue'],[
      'Money collected by government to help pay for shared needs|tax','Resource or benefit shared by a community|public good','Plan for spending available money|budget','Work provided to meet a need|service','Money received to fund activities|revenue']],
    ['Trade Routes','Government and Economics',['river route','railroad','highway','port','market'],[
      'Waterway used to move goods by boat|river route','Track system carrying trains and freight|railroad','Major road for long-distance travel|highway','Place where ships transfer goods|port','Place where buyers and sellers meet|market']],
    ['Supply and Demand','Government and Economics',['supply','demand','scarcity','price','consumer'],[
      'Amount of a good available for sale|supply','Amount buyers want to purchase|demand','Condition of having less of something than people want|scarcity','Amount paid for one good or service|price','Person who buys or uses a product|consumer']],
    ['Immigration Stories','People and Movement',['immigration','migration','push factor','pull factor','community'],[
      'Moving to a new country to live|immigration','Moving from one place to another|migration','Difficulty that may lead someone to leave a place|push factor','Opportunity that may attract someone to a place|pull factor','People connected by a shared place or interests|community']],
    ['Checking Historical Sources','Evidence and Civic Action',['primary source','secondary source','point of view','corroboration','evidence'],[
      'Record made by someone who witnessed an event|primary source','Later account using information from other sources|secondary source','Perspective a person brings to an account|point of view','Checking whether other sources support a claim|corroboration','Information used to support a conclusion|evidence']],
    ['Cause and Effect in History','Evidence and Civic Action',['cause','effect','sequence','turning point','timeline'],[
      'Reason an event happens|cause','Change that happens because of an event|effect','Order in which events happen|sequence','Event that leads to an important change|turning point','Display showing events in time order|timeline']],
    ['Comparing Historical Claims','Evidence and Civic Action',['claim','evidence','source','context','counterclaim'],[
      'Statement someone argues is true|claim','Facts or records supporting a claim|evidence','Record from which information comes|source','Surrounding circumstances that help explain an event|context','Different claim that challenges an argument|counterclaim']],
    ['Civic Action Projects','Evidence and Civic Action',['identify a need','gather evidence','make a plan','take action','evaluate results'],[
      'Notice a community problem worth solving|identify a need','Collect facts about the problem|gather evidence','Decide on steps and helpers|make a plan','Carry out the agreed steps|take action','Check what changed and what still needs work|evaluate results']]
  ];
  const stems=[
    clue=>`Which term matches this clue: ${clue}?`,
    clue=>`What does this describe: ${clue}?`,
    clue=>`Choose the idea that fits: ${clue}.`,
    clue=>`Name the concept described here: ${clue}.`,
    clue=>`Which answer goes with this clue: ${clue}?`
  ];
  function addGrade(grade,first,lessons){
    if(lessons.length!==20) throw Error(`${grade} needs 20 new history lessons.`);
    lessons.forEach(([name,group,options,clues],offset)=>{
      const key=`${grade}:hist:L${first+offset}`;
      if(data[key]) throw Error(`Duplicate history lesson: ${key}`);
      if(options.length!==5||clues.length!==5) throw Error(`Incomplete history lesson: ${key}`);
      const questions=[];
      for(let round=0;round<5;round++) for(let index=0;index<5;index++){
        const [clue,answer]=clues[(index+round)%5].split('|');
        if(!options.includes(answer)) throw Error(`Unknown answer in ${key}: ${answer}`);
        const q=stems[round](clue);
        const wrong=options.filter(option=>option!==answer);
        const choices=[answer,...wrong.slice((index+round)%wrong.length).concat(wrong).slice(0,3)];
        const shift=(index+round)%choices.length;
        questions.push({type:'mc',q,choices:choices.slice(shift).concat(choices.slice(0,shift)),answer,explain:`This clue describes ${answer}.`,audio:q});
      }
      data[key]={name,group,contentVersion:'20261107.1',questions};
    });
  }
  addGrade('g2',6,grade2);
  addGrade('g4',26,grade4);
})();
