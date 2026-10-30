/* Twenty new Grade 11–12 lessons. Loaded before the lazy classic grade banks. */
(function(){
  const bank=window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  const used=new Set();
  function question(prompt,answer,choices,explain){
    const options=[answer,...choices.filter(value=>value!==answer)].slice(0,4);
    if(options.length!==4||new Set(options).size!==4) throw Error(`Invalid choices: ${prompt}`);
    const turn=used.size%4; used.add(prompt);
    return {type:"mc",q:prompt,choices:options.slice(turn).concat(options.slice(0,turn)),answer,explain:explain||`The correct answer is ${answer}.`,audio:prompt};
  }
  function numeric(prompt,value,explain){
    const wrong=[value+1,value-1,value+2].map(String);
    return question(prompt,String(value),wrong,explain);
  }
  function add(key,name,topic,questions){
    if(questions.length!==25) throw Error(`${key} must contain 25 questions; found ${questions.length}`);
    if(bank[key]) throw Error(`${key} already exists`);
    bank[key]={name,topic,contentVersion:"senior-20261024.1",questions};
  }
  function verbal(key,name,topic,groups){
    if(groups.length!==5||groups.some(group=>group.length!==5)) throw Error(`${key} needs five groups of five`);
    const questions=[];
    for(const group of groups){
      const answers=group.map(item=>item[1]);
      if(new Set(answers).size!==5) throw Error(`${key} has repeated answers in a group`);
      group.forEach(([prompt,answer,explain],i)=>{
        const wrong=[1,2,3].map(step=>answers[(i+step)%5]);
        questions.push(question(prompt,answer,wrong,explain));
      });
    }
    add(key,name,topic,questions);
  }
  const range=[1,2,3,4,5];
  function math(key,name,topic,make){
    add(key,name,topic,range.flatMap(n=>make(n)));
  }

  math("g11:math:L9","Polar Coordinates","Advanced Precalculus",n=>{
    const r=n+2;
    return [
      question(`Convert polar (${r}, 0) to Cartesian coordinates.`,`(${r}, 0)`,[`(0, ${r})`,`(-${r}, 0)`,`(0, -${r})`],"At angle 0, x = r and y = 0."),
      question(`Convert polar (${r}, π/2) to Cartesian coordinates.`,`(0, ${r})`,[`(${r}, 0)`,`(-${r}, 0)`,`(0, -${r})`],"At π/2, x = 0 and y = r."),
      question(`Convert polar (${r}, π) to Cartesian coordinates.`,`(-${r}, 0)`,[`(${r}, 0)`,`(0, ${r})`,`(0, -${r})`],"At π, the point lies on the negative x-axis."),
      question(`Convert polar (${r}, 3π/2) to Cartesian coordinates.`,`(0, -${r})`,[`(0, ${r})`,`(${r}, 0)`,`(-${r}, 0)`],"At 3π/2, the point lies on the negative y-axis."),
      numeric(`What is the distance from the origin to (${3*n}, ${4*n})?`,5*n,"Use r = √(x² + y²); these coordinates form a scaled 3-4-5 triangle.")
    ];
  });
  math("g11:math:L10","Sequences and Series","Advanced Precalculus",n=>{
    const a=n+1,d=n+2,r=n+2;
    return [
      numeric(`An arithmetic sequence starts at ${a} and increases by ${d}. What is term 5?`,a+4*d,"The fifth term is the first term plus four common differences."),
      numeric(`What is the common difference of ${a}, ${a+d}, ${a+2*d}, ...?`,d,"Subtract consecutive terms."),
      numeric(`A geometric sequence starts at ${a} and has ratio ${r}. What is term 3?`,a*r*r,"The third term is the first term times the ratio squared."),
      numeric(`What is the ratio of ${a}, ${a*r}, ${a*r*r}, ...?`,r,"Divide a term by the previous term."),
      numeric(`Find the sum of the first 5 terms of ${a}, ${a+d}, ${a+2*d}, ... .`,5*a+10*d,"Five copies of the first term plus ten copies of the common difference give the sum.")
    ];
  });
  math("g11:math:L11","Counting and Probability","Advanced Precalculus",n=>{
    const m=n+4;
    return [
      numeric(`How many unordered pairs can be chosen from ${m} students?`,m*(m-1)/2,"Use m(m − 1)/2 because order does not matter."),
      numeric(`How many ways can first and second place be awarded among ${m} runners?`,m*(m-1),"There are m choices for first and m − 1 for second."),
      question(`A bag has ${n} red and ${n} blue marbles. What is P(red) on one draw?`,"1/2",["1/4","1/3","2/3"],"Half the marbles are red."),
      question(`A fair coin is flipped ${n+1} times. What is P(all heads)?`,`1/${2**(n+1)}`,[`1/${2**n}`,"1/3","0"].filter((x,i,a)=>x!==`1/${2**(n+1)}`&&a.indexOf(x)===i).concat("1").slice(0,3),"Multiply 1/2 once for each independent flip."),
      question(`An event has probability 1/${m}. What is the probability it does not happen?`,`${m-1}/${m}`,[`1/${m}`,`${m-2}/${m}`,"0"],"The complement is 1 minus the event probability.")
    ];
  });
  math("g11:math:L12","Matrices and Systems","Advanced Precalculus",n=>{
    const k=n+2;
    return [
      numeric(`Add the top-left entries of matrices A and B when they are ${k} and ${n}.`,k+n,"Add corresponding entries."),
      numeric(`Multiply a matrix entry ${k} by scalar ${n+1}.`,k*(n+1),"Scalar multiplication multiplies every entry."),
      numeric(`Find det [[${k}, 0], [0, ${n+1}]].`,k*(n+1),"For a 2×2 matrix, det = ad − bc."),
      numeric(`Solve x + y = ${2*k} and x − y = 0. What is x?`,k,"Add the equations to get 2x."),
      numeric(`For row [${k}, ${n}] and column [2, 3], find their dot product.`,2*k+3*n,"Multiply matching entries, then add.")
    ];
  });

  math("g12:math:L9","Integration Applications","Calculus Extensions",n=>{
    const k=n+1,b=2*n+2;
    return [
      numeric(`Find ∫ from 0 to ${b} of ${k}x dx.`,k*b*b/2,"An antiderivative is kx²/2; evaluate at the bounds."),
      numeric(`Find ∫ from 0 to ${b} of ${k} dx.`,k*b,"A constant rate times interval length gives total change."),
      numeric(`Find the average value of f(x)=${k}x on [0, ${b}].`,k*b/2,"Divide the definite integral by the interval length."),
      numeric(`A velocity is ${k} m/s for ${b} seconds. How far does the object travel?`,k*b,"Integrate the constant velocity over time."),
      numeric(`A graph forms a triangle above the x-axis with base ${b} and height ${k}. What is its area?`,b*k/2,"The definite integral equals the triangle's area.")
    ];
  });
  math("g12:math:L10","Optimization Models","Calculus Extensions",n=>{
    const a=n+2,b=n+3;
    return [
      numeric(`A rectangle has perimeter ${4*a}. What is its greatest possible area?`,a*a,"A square maximizes area for a fixed perimeter."),
      numeric(`Where does f(x)=−x²+${2*a}x attain its maximum? Give x.`,a,"Set f'(x)=−2x+2a to zero."),
      numeric(`What is the minimum of f(x)=(x−${a})²+${b}?`,b,"The squared term is smallest when it is zero."),
      numeric(`Revenue is R(x)=−x²+${2*a}x+${b}. What x maximizes revenue?`,a,"The vertex of this downward-opening parabola is at x=a."),
      numeric(`A rectangle has area ${a*b} and width ${a}. What length does it need?`,b,"Divide area by width.")
    ];
  });
  math("g12:math:L11","Series and Convergence","Calculus Extensions",n=>{
    const a=n+1,r=n+2;
    return [
      numeric(`Find the first three-term sum of ${a}, ${a*r}, ${a*r*r}, ... .`,a*(1+r+r*r),"Add the first three geometric terms."),
      question(`Does Σ 1/k^${n+1} from k=1 to infinity converge?`,"Converges",["Diverges","Oscillates","Cannot be determined"],"A p-series converges when p > 1."),
      question(`Does Σ ${a}/k from k=1 to infinity converge?`,"Diverges",["Converges","Oscillates","Has only one term"],"A nonzero multiple of the harmonic series diverges."),
      question(`Find the infinite sum ${a} + ${a}/2 + ${a}/4 + ... .`,String(2*a),[String(a),String(4*a),String(3*a)],"Use a/(1−r) with common ratio 1/2."),
      numeric(`What is the ${n+3}th partial sum of the constant series ${a}+${a}+...?`,a*(n+3),"Add the constant term once for each term.")
    ];
  });
  math("g12:math:L12","Differential Equations in Context","Calculus Extensions",n=>{
    const k=n+1,y=n+2;
    return [
      numeric(`Given y'=${k} and y(0)=${y}, find y(2).`,y+2*k,"A constant derivative adds rate times elapsed time."),
      numeric(`Given y'=2x and y(0)=${y}, find y(${k}).`,y+k*k,"Integrate 2x to x² and use the initial value."),
      numeric(`Euler's method starts at y=${y} with y'=${k} and step 1. Find the next y.`,y+k,"Euler's update is old y plus step times slope."),
      numeric(`A population doubles each year from ${k}. What is it after 2 years?`,4*k,"Two doublings multiply the starting amount by four."),
      question(`For y'=${k}−y, at which value is the population at equilibrium?`,String(k),[String(k+1),String(k-1),String(2*k)],"Equilibrium occurs when the derivative equals zero.")
    ];
  });

  // Each cluster of five questions uses its five answers as alternatives.
  verbal("g11:eng:L3","Rhetorical Analysis","Analysis and Research",[
    [
      ["A speaker cites a published study to support a policy. Which appeal leads?","logos"],
      ["A speaker describes a family's fear after a flood. Which appeal leads?","pathos"],
      ["A nurse mentions twenty years of emergency experience. Which appeal leads?","ethos"],
      ["A speaker repeats 'We can' at the start of three lines. Name the device.","anaphora"],
      ["A speaker calls two opposing choices 'either safety or freedom.' Name the flaw.","false dilemma"]
    ],[
      ["'Every student deserves a safe route to school.' What part of an argument is this?","claim"],
      ["'The city recorded 40 crashes there last year.' What part is this?","evidence"],
      ["'These figures show that a crossing guard would reduce risk.' What part is this?","reasoning"],
      ["'Some residents worry about the cost.' What part is this?","counterclaim"],
      ["'Yet the proposed grant covers the cost.' What part is this?","rebuttal"]
    ],[
      ["'The proposal is a bridge to a better future.' Which device is used?","metaphor"],
      ["'The wind whispered through the hall.' Which device is used?","personification"],
      ["'We waited a million years.' Which device is used?","hyperbole"],
      ["'The plan is as steady as a clock.' Which device is used?","simile"],
      ["'What will happen if we wait?' Which device is used?","rhetorical question"]
    ],[
      ["An argument quotes an expert but omits where the quote came from. What is needed?","source attribution"],
      ["An argument reports only favorable survey responses. What concern should a reader check?","selection bias"],
      ["An argument uses a 2001 statistic for a present-day claim. What should be checked?","currency"],
      ["An argument infers that one event caused another only because it came first. What flaw is this?","post hoc reasoning"],
      ["An argument attacks a speaker's hairstyle instead of the claim. What flaw is this?","ad hominem"]
    ],[
      ["Which change makes 'Stuff is bad' more precise?","Name the specific problem and effect"],
      ["Which change strengthens a claim based on a single story?","Add representative data"],
      ["Which change makes an opposing view fairer?","State it accurately before responding"],
      ["Which change helps readers trace a quotation?","Give the author's name and source"],
      ["Which change improves a conclusion?","Connect the evidence back to the claim"]
    ]
  ]);
  verbal("g11:eng:L4","Poetry and Literary Craft","Analysis and Research",[
    [
      ["A poem's speaker says 'I remember the old street.' Who is speaking?","persona"],
      ["A poem repeats an opening sound in 'silver streams slide.' Name the sound device.","alliteration"],
      ["A poem repeats the vowel sound in 'slow road home.' Name the sound device.","assonance"],
      ["A line continues its sentence into the next line without punctuation. Name the technique.","enjambment"],
      ["A line ends with a strong pause marked by a period. Name the pause.","end stop"]
    ],[
      ["'The moon was a lantern' directly identifies one thing as another. Name it.","metaphor"],
      ["'The moon was like a lantern' compares using 'like.' Name it.","simile"],
      ["'The moon watched the town' gives a human action to an object. Name it.","personification"],
      ["'A thousand moons lit the path' exaggerates for effect. Name it.","hyperbole"],
      ["'The lantern hissed' imitates a sound in a word. Name it.","onomatopoeia"]
    ],[
      ["A speaker longs for a childhood home. Which tone best fits?","nostalgic"],
      ["A speaker celebrates a hard-won victory. Which tone best fits?","triumphant"],
      ["A speaker mocks a foolish rule. Which tone best fits?","satirical"],
      ["A speaker grieves after a loss. Which tone best fits?","mournful"],
      ["A speaker calmly weighs several possibilities. Which tone best fits?","reflective"]
    ],[
      ["A line describes a rough stone scraping a palm. Which sense dominates?","touch"],
      ["A line describes the scent of pine after rain. Which sense dominates?","smell"],
      ["A line describes blue light on a wall. Which sense dominates?","sight"],
      ["A line describes bells ringing across a valley. Which sense dominates?","hearing"],
      ["A line describes the sharp flavor of lemon. Which sense dominates?","taste"]
    ],[
      ["Which part is the poem's central insight about life?","theme"],
      ["Which part is the poem's pattern of stressed beats?","meter"],
      ["Which part is a group of lines set apart by spacing?","stanza"],
      ["Which part is an object that suggests a larger idea?","symbol"],
      ["Which part is a repeated line or phrase?","refrain"]
    ]
  ]);
  verbal("g11:sci:L3","Cell Signals and Homeostasis","Biology and Physical Science",[
    [
      ["Which structure controls what enters and leaves a cell?","cell membrane"],
      ["Which organelle releases usable energy from food?","mitochondrion"],
      ["Which organelle builds proteins from instructions?","ribosome"],
      ["Which structure stores most of a eukaryotic cell's DNA?","nucleus"],
      ["Which cell structure helps plants turn light into chemical energy?","chloroplast"]
    ],[
      ["Water moving across a membrane toward higher solute concentration is what?","osmosis"],
      ["Particles moving from high to low concentration without energy use is what?","diffusion"],
      ["Movement against a concentration gradient using energy is what?","active transport"],
      ["A cell taking in a large particle by enclosing it is what?","endocytosis"],
      ["A vesicle releasing material outside a cell is what?","exocytosis"]
    ],[
      ["Blood glucose rises; insulin helps cells take up glucose. What response is this?","negative feedback"],
      ["A blood clot activates more clotting until a wound closes. What response is this?","positive feedback"],
      ["Maintaining a stable internal temperature is an example of what?","homeostasis"],
      ["A molecule that binds a receptor to start a response is what?","signal ligand"],
      ["A protein that detects a specific signal at a cell surface is what?","receptor"]
    ],[
      ["Which hormone helps lower blood glucose?","insulin"],
      ["Which hormone signals the liver to release stored glucose?","glucagon"],
      ["Which system sends rapid electrical messages?","nervous system"],
      ["Which system sends hormones through the bloodstream?","endocrine system"],
      ["Which brain region helps regulate body temperature?","hypothalamus"]
    ],[
      ["A plant cell in pure water becomes firm as water enters. Name the pressure.","turgor pressure"],
      ["A red blood cell shrinks in very salty water. The outside is what?","hypertonic"],
      ["A red blood cell swells in dilute water. The outside is what?","hypotonic"],
      ["A cell has no net water movement across its membrane. The solution is what?","isotonic"],
      ["A cell's ability to respond to a signal depends first on having what?","matching receptor"]
    ]
  ]);
  verbal("g11:sci:L4","Reactions and Waves","Biology and Physical Science",[
    [
      ["What is conserved in a balanced chemical reaction?","atoms of each element"],
      ["What speeds a reaction without being consumed?","catalyst"],
      ["What is the minimum energy needed to start a reaction?","activation energy"],
      ["What is a substance present before a reaction called?","reactant"],
      ["What is a substance formed by a reaction called?","product"]
    ],[
      ["A reaction takes in heat from its surroundings. What type is it?","endothermic"],
      ["A reaction releases heat to its surroundings. What type is it?","exothermic"],
      ["What happens to particles when temperature increases?","average kinetic energy rises"],
      ["What usually happens to reaction rate when reactant concentration increases?","rate increases"],
      ["Why does powder often react faster than a solid block?","greater surface area"]
    ],[
      ["What is the distance between successive wave crests?","wavelength"],
      ["What is the number of cycles passing a point each second?","frequency"],
      ["What is the maximum displacement from equilibrium?","amplitude"],
      ["What is the bending of a wave as it enters a new medium?","refraction"],
      ["What is a wave bouncing from a surface?","reflection"]
    ],[
      ["Which wave can travel through a vacuum?","electromagnetic wave"],
      ["Which wave requires a material medium?","sound wave"],
      ["Which electromagnetic band is visible to human eyes?","visible light"],
      ["Which band has shorter wavelengths than visible violet light?","ultraviolet"],
      ["Which band has longer wavelengths than visible red light?","infrared"]
    ],[
      ["In a closed system, what happens to total mass during a reaction?","it stays constant"],
      ["If a wave's frequency rises in the same medium, what happens to wavelength?","it decreases"],
      ["What makes a musical sound louder without changing pitch?","greater amplitude"],
      ["What makes a musical sound higher in pitch?","greater frequency"],
      ["What explains a prism spreading white light into colors?","different refraction by wavelength"]
    ]
  ]);
  verbal("g11:hist:L3","Constitutional Ideas","Civics and Historical Change",[
    [
      ["What divides national authority among legislative, executive, and judicial branches?","separation of powers"],
      ["What allows each branch to limit actions of the others?","checks and balances"],
      ["What divides authority between national and state governments?","federalism"],
      ["What principle says government power comes from the people?","popular sovereignty"],
      ["What principle requires leaders to follow the law?","rule of law"]
    ],[
      ["Which branch writes federal laws?","legislative branch"],
      ["Which branch carries out federal laws?","executive branch"],
      ["Which branch interprets federal laws in cases?","judicial branch"],
      ["What change to the Constitution requires a formal approval process?","amendment"],
      ["What is a court's power to test a law against the Constitution?","judicial review"]
    ],[
      ["Which amendment protects speech and religion?","First Amendment"],
      ["Which amendment protects against unreasonable searches?","Fourth Amendment"],
      ["Which amendment protects against self-incrimination?","Fifth Amendment"],
      ["Which amendment guarantees equal protection under the law?","Fourteenth Amendment"],
      ["Which amendment protects voting regardless of race?","Fifteenth Amendment"]
    ],[
      ["What is a proposed law before it is enacted?","bill"],
      ["What is a president's rejection of a bill?","veto"],
      ["What can Congress use to enact a bill after a veto?","override vote"],
      ["What is an earlier court decision used to guide a later case?","precedent"],
      ["What is a written explanation of a court's decision?","opinion"]
    ],[
      ["A chart compares powers held by two branches. What is its main focus?","institutional authority"],
      ["A historian reads the original text of a court ruling. What kind of source is it?","primary source"],
      ["A textbook summarizes several court rulings. What kind of source is it?","secondary source"],
      ["Two sources disagree about an event. What should a researcher do?","corroborate evidence"],
      ["A timeline shows when a law changed. What does it best establish?","chronology"]
    ]
  ]);
  verbal("g11:hist:L4","Industrialization and Reform","Civics and Historical Change",[
    [
      ["What is a shift from hand production to machine production called?","industrialization"],
      ["What is growth of cities as people move to them called?","urbanization"],
      ["What is movement from one country to another called?","immigration"],
      ["What is a business that dominates a market called?","monopoly"],
      ["What is an organization of workers seeking shared goals called?","labor union"]
    ],[
      ["What did rail networks mainly improve for factories?","transport of goods"],
      ["What did assembly lines mainly increase?","production speed"],
      ["What did crowded tenements often reveal?","urban housing shortages"],
      ["What did child labor reformers seek?","limits on child employment"],
      ["What did workplace safety reformers seek?","safer working conditions"]
    ],[
      ["What is the movement for women's voting rights called?","suffrage movement"],
      ["What is a law limiting monopoly practices called?","antitrust law"],
      ["What is a campaign to reduce alcohol use called?","temperance movement"],
      ["What is public reporting of corruption by journalists called?","investigative journalism"],
      ["What is direct selection of a candidate by party voters called?","primary election"]
    ],[
      ["What best reveals factory workers' lived experience at the time?","worker diary"],
      ["What best shows population shifts over decades?","census data"],
      ["What best shows a company's advertised claims?","period advertisement"],
      ["What best shows the text of a reform law?","statute"],
      ["What best shows how a strike was reported locally?","newspaper account"]
    ],[
      ["A factory opens and nearby housing expands. Which cause is most direct?","new jobs attract residents"],
      ["A machine raises output per worker. What changes first?","labor productivity"],
      ["A city builds sewers after repeated disease outbreaks. What response is this?","public health reform"],
      ["Workers bargain together over wages. What action is this?","collective bargaining"],
      ["A law requires disclosure of food ingredients. What aim does it serve?","consumer protection"]
    ]
  ]);
  verbal("g12:eng:L3","Synthesis Across Sources","Writing and Literature",[
    [
      ["Two sources independently report the same measurement. What does agreement strengthen?","corroboration"],
      ["A source contains the researcher's own observations. What type is it?","primary source"],
      ["A review summarizes several original studies. What type is it?","secondary source"],
      ["A source omits methods and author details. What quality is hard to assess?","credibility"],
      ["A 20-year-old source describes a fast-changing technology. What needs checking?","currency"]
    ],[
      ["A writer joins findings from three studies into one claim. What is this?","synthesis"],
      ["A writer restates a source's idea in new wording and cites it. What is this?","paraphrase"],
      ["A writer uses a source's exact words in quotation marks. What is this?","direct quotation"],
      ["A writer gives brief credit in the text after borrowed ideas. What is this?","in-text citation"],
      ["A writer lists full source details at the end. What is this?","reference list"]
    ],[
      ["A survey includes only volunteers from one club. What concern arises?","sampling bias"],
      ["A graph's y-axis begins near its highest value, exaggerating change. What concern arises?","misleading scale"],
      ["A source is funded by a company selling the tested product. What should be checked?","conflict of interest"],
      ["A study reports two variables moving together but no causal test. What is shown?","correlation"],
      ["A claim is supported by one unusual example. What is needed?","representative evidence"]
    ],[
      ["One source offers a statistic; another gives a personal account. How do they differ?","quantitative and qualitative evidence"],
      ["Two sources reach opposite conclusions using different samples. What should be compared?","methods and populations"],
      ["A source's conclusion goes beyond its data. What should the writer do?","narrow the claim"],
      ["A researcher quotes a claim from a summary instead of the original study. What should be sought?","original source"],
      ["A writer presents both support and limitations. What quality improves?","balance"]
    ],[
      ["Which sentence best connects evidence to a claim?","Explain how the evidence supports the claim"],
      ["Which step avoids treating all sources as equally reliable?","Evaluate source quality"],
      ["Which step makes conflicting results useful?","Describe why the findings differ"],
      ["Which step prevents accidental plagiarism?","Credit borrowed ideas"],
      ["Which step helps a reader verify a statistic?","Name its source and context"]
    ]
  ]);
  verbal("g12:eng:L4","Revision and Literary Context","Writing and Literature",[
    [
      ["A draft shifts tense without reason. What should be revised?","verb consistency"],
      ["A paragraph has no central idea. What should be revised?","topic sentence"],
      ["An essay repeats the same point in three paragraphs. What should be revised?","organization"],
      ["A claim says 'many things got better' without specifics. What should be revised?","precision"],
      ["A conclusion introduces unrelated evidence. What should be revised?","focus"]
    ],[
      ["'The report was written by Mira' can become 'Mira wrote the report.' What changes?","active voice"],
      ["'Due to the fact that' can become 'because.' What improves?","concision"],
      ["A long sentence with three unrelated ideas should be split for what?","clarity"],
      ["A paragraph moves between examples with no links. What is needed?","transitions"],
      ["A draft uses 'it' with two possible nouns. What is needed?","clear reference"]
    ],[
      ["A novel reflects the author's era of social change. What is being examined?","historical context"],
      ["A narrator knows only one character's thoughts. What is the point of view?","limited third person"],
      ["A narrator says 'I walked home.' What is the point of view?","first person"],
      ["A recurring object represents freedom. What is its role?","symbol"],
      ["A story begins after its central conflict has already started. What is this opening?","in medias res"]
    ],[
      ["A character's choices reveal a belief through action. What is this?","indirect characterization"],
      ["The narrator states that a character is generous. What is this?","direct characterization"],
      ["The reader knows a danger the character does not. What is this?","dramatic irony"],
      ["An outcome is the opposite of what is expected. What is this?","situational irony"],
      ["A narrator's account cannot be fully trusted. What kind of narrator?","unreliable narrator"]
    ],[
      ["Which revision strengthens an analytical paragraph?","Tie each example to the thesis"],
      ["Which revision makes a comparison clearer?","Use the same criterion for both texts"],
      ["Which revision best integrates a short quote?","Introduce and explain it"],
      ["Which revision gives a counterargument fair treatment?","Represent it accurately"],
      ["Which revision improves a final draft's readability?","Remove repeated wording"]
    ]
  ]);
  verbal("g12:sci:L3","Genetics and Biotechnology","Systems and Evidence",[
    [
      ["What molecule carries hereditary instructions?","DNA"],
      ["What is a segment of DNA that can influence a trait?","gene"],
      ["What is an alternative version of a gene?","allele"],
      ["What is an organism's allele combination for a trait?","genotype"],
      ["What is an observable trait called?","phenotype"]
    ],[
      ["What process copies DNA before cell division?","replication"],
      ["What process makes RNA from DNA?","transcription"],
      ["What process builds a protein from an RNA message?","translation"],
      ["What is a change in a DNA sequence?","mutation"],
      ["What process exchanges DNA segments during meiosis?","crossing over"]
    ],[
      ["What tool amplifies a selected DNA segment?","PCR"],
      ["What method separates DNA fragments by size?","gel electrophoresis"],
      ["What tool can edit DNA at a targeted sequence?","CRISPR-Cas9"],
      ["What method reads the order of DNA bases?","sequencing"],
      ["What method compares an unknown DNA profile to a reference?","DNA profiling"]
    ],[
      ["A heterozygote shows an intermediate trait. What inheritance pattern is this?","incomplete dominance"],
      ["A heterozygote shows both traits distinctly. What pattern is this?","codominance"],
      ["A trait depends on several genes. What is this?","polygenic inheritance"],
      ["A trait is linked to a gene on a sex chromosome. What is this?","sex-linked inheritance"],
      ["A trait changes with nutrition despite the same genotype. What influence is this?","environmental effect"]
    ],[
      ["Which evidence best tests whether an edit changed the intended DNA site?","sequence the target region"],
      ["Which practice protects donors in a genetic study?","informed consent"],
      ["Which concern arises when DNA data identify relatives?","genetic privacy"],
      ["Which comparison isolates the effect of a gene edit?","edited and unedited controls"],
      ["Which result suggests a gene is expressed?","its RNA or protein is detected"]
    ]
  ]);
  verbal("g12:sci:L4","Climate and Energy Systems","Systems and Evidence",[
    [
      ["What drives most energy entering Earth's climate system?","sunlight"],
      ["What process traps some outgoing infrared energy?","greenhouse effect"],
      ["What is surface reflectivity called?","albedo"],
      ["What large reservoir stores heat and moves it globally?","ocean"],
      ["What phase change turns liquid water into vapor?","evaporation"]
    ],[
      ["Which gas is released by burning fossil fuels?","carbon dioxide"],
      ["Which gas can leak during natural gas production?","methane"],
      ["Which process removes atmospheric carbon into plants?","photosynthesis"],
      ["Which process returns carbon from dead matter to air?","decomposition"],
      ["Which process moves carbon into the ocean surface?","air-sea exchange"]
    ],[
      ["A decade-long temperature average rises. What kind of pattern is this?","climate trend"],
      ["Tomorrow's rain chance is predicted. What kind of description is this?","weather forecast"],
      ["A model is run with and without one factor. What is tested?","factor contribution"],
      ["An ice core contains ancient trapped air. What kind of evidence is it?","proxy record"],
      ["A thermometer network records current conditions. What kind of evidence is it?","direct measurement"]
    ],[
      ["Melting ice exposes darker water that absorbs more sunlight. What loop is this?","positive feedback"],
      ["A response opposes the original change. What loop is this?","negative feedback"],
      ["Extra heat expands ocean water. What can this raise?","sea level"],
      ["A warmer atmosphere can hold more water vapor. What changes?","moisture capacity"],
      ["Plants store atmospheric carbon in biomass. What process is this?","carbon sequestration"]
    ],[
      ["Replacing fossil electricity with wind power primarily reduces what?","combustion emissions"],
      ["Building flood barriers is an example of what?","adaptation"],
      ["Cutting greenhouse gas output is an example of what?","mitigation"],
      ["Using less energy for the same service improves what?","efficiency"],
      ["Comparing many years of data helps separate climate from what?","short-term variation"]
    ]
  ]);
  verbal("g12:hist:L3","Global Connections","Global and Civic Analysis",[
    [
      ["Countries exchange goods across borders. What is this?","international trade"],
      ["A company places production stages in several countries. What is this?","global supply chain"],
      ["People move to live in another country. What is this?","migration"],
      ["A country imposes a tax on imported goods. What is this?","tariff"],
      ["Countries negotiate shared rules for commerce. What is this?","trade agreement"]
    ],[
      ["A country produces a good at lower opportunity cost. What does it have?","comparative advantage"],
      ["A disruption at one supplier affects factories elsewhere. What does this show?","interdependence"],
      ["A buyer considers workers' conditions in a supply chain. What issue is this?","labor standards"],
      ["A company moves production to another country. What process is this?","offshoring"],
      ["Money sent home by workers abroad is called what?","remittances"]
    ],[
      ["A treaty sets rules agreed to by several governments. What is it?","international agreement"],
      ["A state governs its territory independently. What principle is this?","sovereignty"],
      ["Countries work together on a common issue. What is this?","multilateral cooperation"],
      ["One country gives resources to another after a disaster. What is this?","humanitarian aid"],
      ["A government negotiates with another government. What practice is this?","diplomacy"]
    ],[
      ["A researcher studies a person's account of migration. What kind of source?","oral history"],
      ["A researcher examines population change by year. What kind of evidence?","demographic data"],
      ["A map marks cargo routes among ports. What does it show?","trade networks"],
      ["A treaty's original wording is consulted. What kind of source?","primary document"],
      ["An article explains several treaties in retrospect. What kind of source?","secondary analysis"]
    ],[
      ["A drought in one region raises global crop prices. What is illustrated?","linked markets"],
      ["A shared river crosses borders. What is needed to manage it?","cross-border coordination"],
      ["A historian compares two countries' responses to a crisis. What method is this?","comparative analysis"],
      ["A single export grows while other industries shrink. What concern arises?","economic dependence"],
      ["New communication tools connect distant communities. What process grows?","cultural exchange"]
    ]
  ]);
  verbal("g12:hist:L4","Civic Decisions and Evidence","Global and Civic Analysis",[
    [
      ["Residents speak at a school board meeting. What is this?","public participation"],
      ["Voters choose a representative. What is this?","election"],
      ["Neighbors collect signatures to request action. What is this?","petition"],
      ["People form an organization around a shared issue. What is this?","civic association"],
      ["A person serves on a local advisory committee. What is this?","community service"]
    ],[
      ["A city lists expected costs and funding for a project. What document is this?","budget"],
      ["An agency invites comments before a rule takes effect. What process is this?","public comment"],
      ["A council weighs several plans against shared criteria. What is this?","policy evaluation"],
      ["A report measures results after a program begins. What is this?","outcome assessment"],
      ["A board explains why it chose a plan. What supports trust?","transparency"]
    ],[
      ["A survey asks only people at one event. What issue affects the results?","sampling bias"],
      ["A chart omits its units. What is missing?","measurement context"],
      ["An article quotes an unnamed claim with no evidence. What should be sought?","verifiable source"],
      ["Two reports disagree; one used newer data. What should be compared?","time period"],
      ["A photo is shared without date or place. What should be checked?","provenance"]
    ],[
      ["A proposal states a problem and measurable goal. What is this?","policy objective"],
      ["A plan predicts a benefit and a cost. What is being weighed?","trade-off"],
      ["A decision affects different neighborhoods unequally. What should be examined?","distributional impact"],
      ["A pilot program tests an idea on a small scale. What is it?","trial implementation"],
      ["A review compares results with the original goal. What is it?","evaluation"]
    ],[
      ["What action best prepares a speaker for a public meeting?","Check the agenda and evidence"],
      ["What action helps a group hear residents with different views?","Invite broad participation"],
      ["What action helps compare two policy proposals fairly?","Apply the same criteria"],
      ["What action helps track whether a program worked?","Set measurable indicators"],
      ["What action makes a public claim easier to verify?","Provide a source link"]
    ]
  ]);
})();
