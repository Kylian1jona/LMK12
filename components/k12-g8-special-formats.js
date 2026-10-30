/* Ten Grade 8 format lessons: two per subject, 25 questions each. */
(function(){
  const bank=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  const metadata=[
    {key:'g8:eng:checkbox-agreement',subject:'eng',position:1,tag:'CHECKBOXES',title:'Strong Sentences',description:'Six sentences; check exactly two with correct agreement and punctuation.'},
    {key:'g8:eng:dropdown-vocabulary',subject:'eng',position:4,tag:'DROPDOWN MENU',title:'Academic Vocabulary',description:'Choose the precise word for each definition.'},
    {key:'g8:math:ranking-rationals',subject:'math',position:0,tag:'DRAG & DROP RANKING',title:'Rational Numbers in Order',description:'Arrange signed decimals from least to greatest.'},
    {key:'g8:math:checkbox-expressions',subject:'math',position:3,tag:'CHECKBOXES',title:'Equivalent Expressions',description:'Six expressions; check exactly two that match the target.'},
    {key:'g8:alg1:dropdown-equations',subject:'alg1',position:2,tag:'DROPDOWN MENU',title:'Linear Equation Solutions',description:'Solve for x and choose one value.'},
    {key:'g8:alg1:matching-equations',subject:'alg1',position:5,tag:'DRAG & DROP MATCHING',title:'Equations and Solutions',description:'Match each linear equation to its solution.'},
    {key:'g8:sci:checkbox-metals',subject:'sci',position:1,tag:'CHECKBOXES',title:'Metals and Nonmetals',description:'Six elements; check exactly the two metals.'},
    {key:'g8:sci:matching-terms',subject:'sci',position:4,tag:'DRAG & DROP MATCHING',title:'Science Terms and Meanings',description:'Connect matter and energy terms to their meanings.'},
    {key:'g8:hist:ranking-timeline',subject:'hist',position:0,tag:'DRAG & DROP RANKING',title:'U.S. History Timeline',description:'Place five historical events in chronological order.'},
    {key:'g8:hist:dropdown-civics',subject:'hist',position:3,tag:'DROPDOWN MENU',title:'Civics Vocabulary',description:'Choose the government term that fits each definition.'}
  ];
  window.K12_G8_SPECIAL_FORMATS=metadata;
  function add(key,name,questions){
    if(bank[key])throw Error(`Duplicate Grade 8 format lesson: ${key}`);
    if(questions.length!==25)throw Error(`${key} needs 25 questions`);
    bank[key]={name,questions,contentVersion:'20261023.2'};
  }
  function rotate(values,round){const offset=round%values.length;return values.slice(offset).concat(values.slice(0,offset));}

  const grammar=[
    ['student','students','writes','write','a clear summary'],['author','authors','explains','explain','the main idea'],
    ['scientist','scientists','records','record','the results'],['reader','readers','notices','notice','the pattern'],
    ['teacher','teachers','checks','check','the evidence'],['speaker','speakers','presents','present','a strong claim'],
    ['artist','artists','sketches','sketch','a detailed scene'],['runner','runners','crosses','cross','the finish line'],
    ['editor','editors','revises','revise','the paragraph'],['student leader','student leaders','organizes','organize','the meeting'],
    ['historian','historians','studies','study','the source'],['coach','coaches','teaches','teach','a new strategy'],
    ['journalist','journalists','reports','report','the news'],['musician','musicians','practices','practice','the melody'],
    ['poet','poets','chooses','choose','a vivid image'],['engineer','engineers','designs','design','a safer bridge'],
    ['gardener','gardeners','waters','water','the seedlings'],['volunteer','volunteers','helps','help','the neighbors'],
    ['librarian','librarians','recommends','recommend','a useful book'],['captain','captains','guides','guide','the team'],
    ['researcher','researchers','compares','compare','the data'],['photographer','photographers','captures','capture','the moment'],
    ['mentor','mentors','supports','support','the group'],['visitor','visitors','observes','observe','the exhibit'],
    ['builder','builders','measures','measure','the materials']
  ];
  add('g8:eng:checkbox-agreement','Strong Sentences',grammar.map(([singular,plural,third,base,object],i)=>{
    const start=value=>value[0].toUpperCase()+value.slice(1);
    const answers=[`The ${singular} ${third} ${object}.`,`The ${plural} ${base} ${object}.`];
    const wrong=[`The ${singular} ${base} ${object}.`,`The ${plural} ${third} ${object}.`,`The ${singular} ${third} ${object}`,`The ${plural} ${base} ${object}`];
    return {type:'selectall',q:'Checkboxes: select exactly 2 complete sentences with correct subject–verb agreement.',audio:'Select exactly two complete sentences with correct subject verb agreement.',choices:rotate([...answers,...wrong].map(start),i),answers:answers.map(start),requiredSelections:2};
  }));

  const englishTerms=[
    ['inference','a conclusion drawn from clues and evidence'],['claim','a statement that someone tries to prove'],
    ['evidence','facts or examples that support a claim'],['counterclaim','a reasonable opposing claim'],
    ['theme','a central message about life in a story'],['tone','the author’s attitude toward a subject'],
    ['mood','the feeling a text creates for a reader'],['connotation','the feeling or association a word suggests'],
    ['denotation','the direct dictionary meaning of a word'],['metaphor','a comparison that says one thing is another'],
    ['simile','a comparison using like or as'],['allusion','a brief reference to a known person, work, or event'],
    ['analogy','a comparison that explains an idea or relationship'],['bias','a preference that can shape a person’s judgment'],
    ['paraphrase','a restatement in your own words'],['summary','a brief statement of the main points'],
    ['transition','a word or phrase connecting ideas'],['context','the surrounding words and situation that clarify meaning'],
    ['perspective','a particular way of viewing an issue'],['purpose','the reason an author creates a text'],
    ['citation','a note identifying the source of information'],['credible','worthy of trust because of reliable support'],
    ['objective','based on facts rather than personal feelings'],['subjective','shaped by personal opinions or feelings'],
    ['rhetoric','language chosen to persuade an audience']
  ];
  add('g8:eng:dropdown-vocabulary','Academic Vocabulary',englishTerms.map(([answer,meaning],i)=>({
    type:'dropdown',q:`Dropdown: which word means ${meaning}?`,audio:`Choose the word that means ${meaning}.`,
    choices:rotate([answer,...[3,7,11,15,19].map(step=>englishTerms[(i+step)%englishTerms.length][0])],i),answer
  })));

  add('g8:math:ranking-rationals','Rational Numbers in Order',Array.from({length:25},(_,i)=>{
    const base=i*7-120;
    const items=[0,18,43,67,101].map(offset=>((base+offset)/100).toFixed(2));
    return {type:'ranking',q:'Drag the signed decimals from least to greatest.',audio:'Order the rational numbers from least to greatest. Drag cards or use the arrow buttons.',items};
  }));
  add('g8:math:checkbox-expressions','Equivalent Expressions',Array.from({length:25},(_,i)=>{
    const a=3+i%5,b=8+Math.floor(i/5),target=`${a}x + ${b}`;
    const answers=[`x + ${a-1}x + ${b}`,`${a}(x + 1) + ${b-a}`];
    const wrong=[`${a}x + ${b+1}`,`${a-1}x + ${b}`,`${a}(x + 2) + ${b-a}`,`x + ${a}x + ${b}`];
    return {type:'selectall',q:`Checkboxes: select exactly 2 expressions equivalent to ${target}.`,audio:`Select exactly two expressions equivalent to ${target}.`,choices:rotate([...answers,...wrong],i),answers,requiredSelections:2};
  }));

  add('g8:alg1:dropdown-equations','Linear Equation Solutions',Array.from({length:25},(_,i)=>{
    const a=2+i%5,x=i-12,b=3+(i*2)%11,c=a*x+b;
    const answer=String(x),choices=rotate([x,x-3,x-2,x-1,x+1,x+2].map(String),i);
    return {type:'dropdown',q:`Dropdown: solve ${a}x + ${b} = ${c}. What is x?`,audio:`Solve ${a} x plus ${b} equals ${c}. Choose x.`,choices,answer};
  }));
  add('g8:alg1:matching-equations','Equations and Solutions',Array.from({length:25},(_,i)=>({
    type:'drag',q:'Drag each linear equation to its solution for x.',audio:'Match each equation with its solution for x. Drag or tap a card.',
    pairs:Array.from({length:4},(_,j)=>{const x=i-10+j,a=2+j,b=1+(i+j)%7;return {word:`${a}x + ${b} = ${a*x+b}`,match:`x = ${x}`};})
  })));

  const metals=['iron','copper','gold','silver','aluminum','sodium','magnesium','calcium','zinc','nickel','tin','titanium'];
  const nonmetals=['oxygen','carbon','nitrogen','hydrogen','sulfur','phosphorus','chlorine','fluorine','helium','neon','argon','iodine'];
  add('g8:sci:checkbox-metals','Metals and Nonmetals',Array.from({length:25},(_,i)=>{
    const cycle=Math.floor(i/metals.length);
    const answers=[metals[i%metals.length],metals[(i+5+cycle)%metals.length]];
    const wrong=[0,2,5,8].map(step=>nonmetals[(i+step+cycle*3)%nonmetals.length]);
    return {type:'selectall',q:'Checkboxes: select exactly 2 elements that are metals.',audio:'Choose exactly two metals from these six elements.',choices:rotate([...answers,...wrong],i),answers,requiredSelections:2};
  }));
  const scienceTerms=[
    ['atom','smallest unit of an element that keeps its properties'],['element','pure substance made of one kind of atom'],
    ['compound','substance formed when different elements chemically join'],['molecule','group of atoms bonded together'],
    ['proton','positively charged particle in the nucleus'],['neutron','uncharged particle in the nucleus'],
    ['electron','negatively charged particle around the nucleus'],['nucleus','dense center of an atom'],
    ['reactant','starting substance in a chemical reaction'],['product','substance formed by a chemical reaction'],
    ['conservation of mass','matter is not created or destroyed in a closed reaction'],['density','mass per unit of volume'],
    ['kinetic energy','energy of motion'],['potential energy','stored energy due to position or condition'],
    ['conduction','heat transfer through direct contact'],['convection','heat transfer by moving fluid'],
    ['radiation','energy transfer by electromagnetic waves'],['wavelength','distance between matching points on waves'],
    ['frequency','number of wave cycles passing each second'],['amplitude','height of a wave from its resting position'],
    ['ecosystem','living things and their nonliving environment'],['population','members of one species in an area'],
    ['mutation','change in genetic material'],['natural selection','process in which helpful inherited traits become more common'],
    ['homeostasis','maintenance of stable internal conditions']
  ];
  add('g8:sci:matching-terms','Science Terms and Meanings',Array.from({length:25},(_,i)=>({
    type:'drag',q:'Drag each Grade 8 science term to its meaning.',audio:'Match each science term with its meaning. Drag or tap a card.',
    pairs:Array.from({length:4},(_,j)=>{const [word,match]=scienceTerms[(i+j*6)%scienceTerms.length];return {word,match};})
  })));

  const timeline=[
    ['1607','Jamestown founded'],['1620','Mayflower arrives'],['1776','Declaration of Independence'],
    ['1787','Constitutional Convention'],['1803','Louisiana Purchase'],['1861','Civil War begins'],
    ['1863','Emancipation Proclamation'],['1865','Civil War ends'],['1869','Transcontinental railroad completed'],
    ['1898','Spanish-American War'],['1914','World War I begins'],['1917','United States enters World War I'],
    ['1918','World War I ends'],['1920','Nineteenth Amendment ratified'],['1929','Stock market crash'],
    ['1941','Attack on Pearl Harbor'],['1945','World War II ends'],['1954','Brown v. Board of Education'],
    ['1955','Montgomery bus boycott begins'],['1963','March on Washington'],['1964','Civil Rights Act'],
    ['1965','Voting Rights Act'],['1969','First Moon landing'],['1989','Berlin Wall falls'],['2001','September 11 attacks']
  ];
  add('g8:hist:ranking-timeline','U.S. History Timeline',Array.from({length:25},(_,i)=>{
    const indexes=i<21?Array.from({length:5},(_,j)=>i+j):Array.from({length:5},(_,j)=>(i-21)*5+j*2);
    const items=indexes.map(index=>timeline[index][1]);
    return {type:'ranking',q:'Drag these events into chronological order, earliest to latest.',audio:'Put these history events in chronological order. Drag cards or use the arrow buttons.',items};
  }));
  const civicsTerms=[
    ['constitution','written framework for a government'],['amendment','formal change to a constitution'],
    ['federalism','division of power between national and state governments'],['separation of powers','assignment of lawmaking, enforcing, and judging to different branches'],
    ['checks and balances','powers that let branches limit one another'],['legislature','branch of government that makes laws'],
    ['executive','branch of government that carries out laws'],['judiciary','branch of government that interprets laws'],
    ['veto','rejection of a bill by an executive'],['override','legislative vote that overcomes a veto'],
    ['bill','proposed law'],['statute','law passed by a legislature'],['citizen','legal member of a nation'],
    ['suffrage','the right to vote'],['referendum','direct public vote on a proposed measure'],
    ['primary election','vote to choose a party’s candidate'],['general election','vote to choose an officeholder'],
    ['due process','fair legal procedures before government acts against a person'],['petition','formal request asking government to act'],
    ['jury','group of citizens who decide facts in a trial'],['precedent','earlier court ruling used to guide later cases'],
    ['treaty','formal agreement between countries'],['tariff','tax on imported goods'],
    ['census','official count of a population'],['public policy','government plan or action addressing an issue']
  ];
  add('g8:hist:dropdown-civics','Civics Vocabulary',civicsTerms.map(([answer,meaning],i)=>({
    type:'dropdown',q:`Dropdown: which civics term means ${meaning}?`,audio:`Choose the civics term that means ${meaning}.`,
    choices:rotate([answer,...[3,7,11,15,19].map(step=>civicsTerms[(i+step)%civicsTerms.length][0])],i),answer
  })));
})();
