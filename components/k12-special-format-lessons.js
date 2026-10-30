/* Four clearly labeled lesson formats, with 25 questions in each lesson. */
(function(){
  const banks=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  function add(key,name,questions){
    if(banks[key])throw Error(`Duplicate special lesson: ${key}`);
    if(questions.length!==25)throw Error(`${key} needs 25 questions`);
    banks[key]={name,questions,contentVersion:'20261023.1'};
  }
  const complete=[
    ['The puppy slept on the rug.','puppy',['chair','quickly','blue']],
    ['Mia carried her books to school.','school',['jump','softly','yellow']],
    ['A bird built a nest in the tree.','nest',['sing','small','under']],
    ['Dad planted seeds in the garden.','garden',['run','happy','beside']],
    ['The class watched a bright rainbow.','rainbow',['swim','loudly','green']],
    ['Our team played soccer after lunch.','soccer',['eat','careful','around']],
    ['The baker made warm bread.','bread',['walk','quiet','above']],
    ['We saw a turtle beside the pond.','turtle',['climb','gentle','through']],
    ['The train stopped at the station.','station',['read','slowly','purple']],
    ['Nina drew a map of the park.','map',['dance','kind','below']],
    ['The farmer fed the hungry goats.','goats',['sleep','tiny','behind']],
    ['A small boat crossed the river.','river',['paint','soft','between']],
    ['Grandma told us a funny story.','story',['laugh','round','under']],
    ['The children found shells at the beach.','shells',['listen','bright','near']],
    ['A fox ran past the old fence.','fence',['write','sweet','before']],
    ['We packed apples for the picnic.','apples',['hop','gentle','inside']],
    ['The moon shone above the houses.','moon',['jump','green','across']],
    ['I found my mitten under the bench.','mitten',['sing','wide','after']],
    ['The fish swam around the rocks.','rocks',['dance','quietly','blue']],
    ['My friend shared a new game.','game',['sleep','little','through']],
    ['The garden grew after the rain.','rain',['skip','tall','beside']],
    ['Sam opened the door for his sister.','door',['fly','soft','around']],
    ['The artist painted a bright star.','star',['walk','tiny','under']],
    ['A rabbit hid behind the flowers.','flowers',['read','yellow','before']],
    ['We climbed the hill before sunset.','hill',['run','gentle','near']]
  ];
  add('g2:eng:format-dropdown','Complete a Sentence',complete.map(([sentence,answer,wrong],i)=>{
    const options=[answer,...wrong];const offset=i%4;
    return {type:'dropdown',q:`Choose the word that completes the sentence: ${sentence.replace(answer,'_____')}`,audio:`Choose one word to complete the sentence. ${sentence.replace(answer,'blank')}`,choices:options.slice(offset).concat(options.slice(0,offset)),answer};
  }));
  add('g3:math:format-checkboxes','Two Sums',Array.from({length:25},(_,i)=>{
    const target=8+i;
    const answers=[`${target-1} + 1`,`${target-2} + 2`];
    const wrong=[`${target-3} + 2`,`${target-4} + 2`,`${target-1} + 2`,`${target-1} + 3`];
    const choices=[...answers,...wrong],offset=i%6;
    return {type:'selectall',q:`Checkboxes: select exactly 2 expressions that equal ${target}.`,audio:`Select exactly two expressions that equal ${target}.`,choices:choices.slice(offset).concat(choices.slice(0,offset)),answers,requiredSelections:2};
  }));
  const sciencePairs=[
    ['evaporation','liquid water changes to water vapor'],['condensation','water vapor forms liquid drops'],
    ['precipitation','water falls from clouds'],['collection','water gathers in lakes and rivers'],
    ['producer','living thing that makes its own food'],['consumer','living thing that eats other organisms'],
    ['decomposer','living thing that breaks down dead matter'],['habitat','place where a living thing meets its needs'],
    ['conductor','material that lets electricity pass'],['insulator','material that resists electric flow'],
    ['magnet','object that attracts iron'],['gravity','force that pulls objects toward Earth'],
    ['friction','force that slows sliding surfaces'],['reflection','light bouncing off a surface'],
    ['shadow','dark shape made when light is blocked'],['rotation','Earth spinning on its axis'],
    ['orbit','path one object follows around another'],['erosion','moving of soil or rock by water or wind'],
    ['weathering','breaking rock into smaller pieces'],['sediment','small pieces of rock or soil'],
    ['mixture','materials combined without becoming a new substance'],['solution','mixture in which one material dissolves'],
    ['adaptation','trait that helps a living thing survive'],['food chain','path showing how energy moves between organisms'],
    ['variable','factor changed or measured in a test']
  ];
  add('g4:sci:format-matching','Science Terms and Meanings',Array.from({length:25},(_,i)=>({
    type:'drag',q:'Drag each science term to its matching meaning.',audio:'Match each science term with its meaning. Drag a term or tap it and then tap a meaning.',
    pairs:Array.from({length:4},(_,offset)=>{const [word,match]=sciencePairs[(i+offset*6)%sciencePairs.length];return {word,match};})
  })));
  add('g5:math:format-ranking','Decimals in Order',Array.from({length:25},(_,i)=>{
    const base=(i+1)*10;
    const items=[1,4,9,14,22].map(offset=>((base+offset)/100).toFixed(2));
    return {type:'ranking',q:'Drag the decimals from least to greatest.',audio:'Put these decimals in order from least to greatest. Drag a card, or use its arrow buttons.',items};
  }));
})();
