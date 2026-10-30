/* Five additional Grade 8 lessons per core subject, bringing each course to 25. */
(function(){
  const data=window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  const frames=[
    (term,prompt)=>`Which statement best explains ${term}? ${prompt}`,
    (term,prompt)=>`A student is reviewing ${term}. Which idea should the student use? ${prompt}`,
    (term,prompt)=>`Apply the lesson skill to ${term}: ${prompt}`,
    (term,prompt)=>`Which conclusion about ${term} is most accurate? ${prompt}`,
    (term,prompt)=>`Choose the strongest Grade 8 explanation of ${term}. ${prompt}`
  ];
  function lesson(subject,number,name,topic,concepts){
    const answers=concepts.map(item=>item.answer);
    const questions=[];
    concepts.forEach((item,index)=>frames.forEach((frame,variant)=>{
      const choices=[item.answer,...answers.filter(answer=>answer!==item.answer).slice(0,3)];
      const turn=(index+variant)%choices.length;
      questions.push({type:"mc",q:frame(item.term,item.prompt),choices:choices.slice(turn).concat(choices.slice(0,turn)),answer:item.answer,explain:item.explain||item.answer});
    }));
    data[`g8:${subject}:L${number}`]={name,topic,topicNumber:5,lessonInTopic:number-20,difficulty:number<23?"Developing":number<25?"Advanced":"Mastery",contentVersion:"20260907.3",questions};
  }
  const c=(term,prompt,answer,explain)=>({term,prompt,answer,explain});

  lesson("eng",21,"Argument and Counterclaim","Advanced Reading and Writing",[
    c("a defensible claim","Use evidence that directly addresses the issue.","A claim must be specific enough to support with relevant evidence."),
    c("a counterclaim","Represent an opposing position fairly before responding.","A counterclaim acknowledges a reasonable opposing view."),
    c("a rebuttal","Connect the response to evidence or reasoning.","A rebuttal explains why the counterclaim is limited or less convincing."),
    c("relevant evidence","Check whether a detail actually supports the reason.","Relevant evidence has a clear logical connection to the claim."),
    c("credible evidence","Examine expertise, methods, date, and corroboration.","Credible evidence comes from a trustworthy and verifiable source.")
  ]);
  lesson("eng",22,"Literary Analysis","Advanced Reading and Writing",[
    c("character motivation","Infer why a character acts from choices and context.","Motivation is supported by the character's actions, words, and circumstances."),
    c("theme development","Track a message through conflict and resolution.","A theme develops through repeated details and changes across the text."),
    c("symbolism","Explain how a concrete object carries a broader idea.","A symbol gains meaning from its repeated role and context."),
    c("point of view","Consider what the narrator knows and withholds.","Point of view shapes which details and judgments the reader receives."),
    c("dramatic irony","Compare a character's knowledge with the audience's.","Dramatic irony occurs when readers know something a character does not." )
  ]);
  lesson("eng",23,"Research and Source Synthesis","Advanced Reading and Writing",[
    c("source synthesis","Combine related findings instead of listing sources separately.","Synthesis explains how evidence from multiple sources connects."),
    c("primary sources","Identify material produced during the event studied.","A primary source provides direct evidence from the time or participants."),
    c("paraphrasing","Restate an idea accurately in new wording and structure.","A paraphrase still requires credit because the idea came from a source."),
    c("citation","Give readers enough information to locate the source.","A citation identifies the origin of borrowed evidence or ideas."),
    c("corroboration","Compare independent evidence before accepting a claim.","Corroboration increases confidence when separate sources agree." )
  ]);
  lesson("eng",24,"Precision, Style, and Revision","Advanced Reading and Writing",[
    c("precise diction","Replace vague wording with exact nouns and verbs.","Precise diction communicates meaning clearly and efficiently."),
    c("sentence variety","Vary openings, lengths, and structures with purpose.","Sentence variety can improve rhythm and emphasize relationships."),
    c("parallel structure","Use matching grammatical forms for related ideas.","Parallel structure makes a series balanced and easy to follow."),
    c("transitions","Name the logical relationship between nearby ideas.","Effective transitions signal contrast, cause, example, or sequence."),
    c("revision","Improve reasoning and organization before proofreading.","Revision changes ideas and structure; editing corrects surface errors." )
  ]);
  lesson("eng",25,"Multimedia and Rhetoric","Advanced Reading and Writing",[
    c("rhetorical purpose","Identify what the creator wants the audience to think or do.","Purpose guides choices about evidence, language, and design."),
    c("audience","Match detail and tone to the intended readers or viewers.","Audience expectations affect explanation, vocabulary, and examples."),
    c("visual evidence","Read labels, scale, source, and context before interpreting.","A visual supports a claim only when its data and design are relevant."),
    c("loaded language","Notice words selected mainly to trigger emotion.","Loaded language can influence judgment without adding evidence."),
    c("media comparison","Evaluate what each format shows well or leaves out.","Different media emphasize information through different tools." )
  ]);

  lesson("math",21,"Transformations and Congruence","Geometry and Mathematical Modeling",[
    c("translation","Track equal movement for every point.","A translation slides a figure without changing size or angle measures."),
    c("reflection","Use the mirror line to compare perpendicular distances.","A reflection places corresponding points equal distances across a line."),
    c("rotation","Identify a center, angle, and direction.","A rotation turns a figure around a fixed center while preserving shape."),
    c("congruence","Compare corresponding sides and angles.","Congruent figures have the same size and shape."),
    c("coordinate rules","Apply the same ordered-pair rule to every vertex.","A valid transformation rule maps every point consistently." )
  ]);
  lesson("math",22,"Scatter Plots and Trend Lines","Geometry and Mathematical Modeling",[
    c("positive association","As one variable rises, inspect the overall direction.","Positive association means larger x-values tend to occur with larger y-values."),
    c("negative association","Describe direction without claiming causation.","Negative association means larger x-values tend to occur with smaller y-values."),
    c("outlier","Find a point far from the overall pattern.","An outlier differs substantially from the trend shown by most data."),
    c("line of best fit","Balance residuals above and below a representative line.","A trend line summarizes the association and supports estimates."),
    c("interpolation","Estimate within the observed data range.","Interpolation is usually safer than extending a pattern far beyond known data." )
  ]);
  lesson("math",23,"Systems and Constraints","Geometry and Mathematical Modeling",[
    c("a system solution","Find where both equations are true at once.","The solution satisfies every equation in the system."),
    c("intersection","Connect the graph to the ordered-pair solution.","At an intersection, the graphs share the same x- and y-values."),
    c("substitution","Replace a variable with an equivalent expression.","Substitution preserves equality while reducing the number of variables."),
    c("elimination","Combine equations so one variable cancels.","Elimination creates an equivalent one-variable equation."),
    c("constraints","Translate limits such as budget or capacity into inequalities.","Constraints describe which possible solutions are allowed." )
  ]);
  lesson("math",24,"Exponents and Scientific Notation","Geometry and Mathematical Modeling",[
    c("product of powers","Multiply powers with the same base.","Keep the common base and add the exponents."),
    c("power of a power","Raise an exponential expression to another power.","Keep the base and multiply the exponents."),
    c("negative exponents","Rewrite a power using its reciprocal.","A negative exponent indicates a reciprocal, not a negative value."),
    c("scientific notation","Place one nonzero digit before the decimal.","Scientific notation has a coefficient from 1 up to 10 times a power of ten."),
    c("order of magnitude","Compare the powers of ten first.","The exponent gives the scale of a number in scientific notation." )
  ]);
  lesson("math",25,"Modeling and Error Analysis","Geometry and Mathematical Modeling",[
    c("model assumptions","State which real conditions were simplified.","Assumptions define when a mathematical model is useful."),
    c("unit analysis","Track units through every operation.","Compatible units help confirm that a calculation represents the intended quantity."),
    c("reasonable estimates","Use magnitude and context to test an answer.","An estimate can reveal misplaced decimals or impossible results."),
    c("error analysis","Locate the first step that breaks a mathematical rule.","Explaining the first incorrect step identifies the cause of an error."),
    c("model revision","Compare a prediction with evidence and update it.","A useful model can be refined when new data expose a limitation." )
  ]);

  const molecules=[
    ["H₂O","water",{H:2,O:1}],["CO₂","carbon dioxide",{C:1,O:2}],["O₂","oxygen gas",{O:2}],["N₂","nitrogen gas",{N:2}],["H₂","hydrogen gas",{H:2}],
    ["NH₃","ammonia",{N:1,H:3}],["CH₄","methane",{C:1,H:4}],["H₂O₂","hydrogen peroxide",{H:2,O:2}],["NaCl","sodium chloride",{Na:1,Cl:1}],["HCl","hydrogen chloride",{H:1,Cl:1}],
    ["SO₂","sulfur dioxide",{S:1,O:2}],["SO₃","sulfur trioxide",{S:1,O:3}],["NO₂","nitrogen dioxide",{N:1,O:2}],["NO","nitric oxide",{N:1,O:1}],["CO","carbon monoxide",{C:1,O:1}],
    ["CaO","calcium oxide",{Ca:1,O:1}],["MgO","magnesium oxide",{Mg:1,O:1}],["KCl","potassium chloride",{K:1,Cl:1}],["LiF","lithium fluoride",{Li:1,F:1}],["HF","hydrogen fluoride",{H:1,F:1}],
    ["C₂H₆","ethane",{C:2,H:6}],["C₃H₈","propane",{C:3,H:8}],["C₂H₄","ethene",{C:2,H:4}],["N₂O","nitrous oxide",{N:2,O:1}],["CS₂","carbon disulfide",{C:1,S:2}]
  ];
  data["g8:sci:L21"]={name:"Interactive Molecule Lab",topic:"Chemistry Lab",topicNumber:5,lessonInTopic:1,difficulty:"Developing",contentVersion:"20260910.1",questions:molecules.map(([formula,name,atoms],moleculeIndex)=>({type:"atom-build",q:`Build ${name} (${formula}) by moving the correct atoms into the reaction tray.`,formula,name,atoms,moleculeIndex,moleculeShape:["linear","bent","cluster","ring","branch"][moleculeIndex%5],themeHue:(moleculeIndex*43)%360,explain:`${formula} contains ${Object.entries(atoms).map(([symbol,count])=>`${count} ${symbol} atom${count===1?'':'s'}`).join(' and ')}.`}))};
  lesson("sci",22,"Periodic Table Patterns","Chemistry Lab",[
    c("a period","Compare elements across a horizontal row.","A period is a horizontal row whose elements share the same number of occupied electron shells."),c("a group","Compare a vertical column.","Elements in a group often have similar properties because of valence electrons."),c("atomic number","Identify what defines an element.","Atomic number equals the number of protons in each atom of an element."),c("metals","Use location and physical properties.","Most metals conduct heat and electricity and appear left of the staircase."),c("noble gases","Connect a full outer shell with reactivity.","Noble gases are generally unreactive because their outer electron shells are full.")
  ]);
  lesson("sci",23,"Chemical Equations and Conservation","Chemistry Lab",[
    c("conservation of mass","Count every atom before and after a reaction.","Chemical reactions rearrange atoms without creating or destroying them."),c("a coefficient","Change molecule counts without altering substances.","A coefficient multiplies an entire chemical formula."),c("a subscript","Read the number of atoms within one formula unit.","A subscript belongs to the element immediately before it."),c("reactants","Read the left side of an equation.","Reactants are starting substances consumed or changed in a reaction."),c("products","Read the right side of an equation.","Products are substances formed by a chemical reaction.")
  ]);
  lesson("sci",24,"Forces and Energy Systems","Integrated Physical Science",[
    c("net force","Combine forces with direction.","Net force is the vector sum of all forces acting on an object."),c("kinetic energy","Connect energy with motion.","Kinetic energy increases with mass and with the square of speed."),c("potential energy","Connect stored energy with position or arrangement.","Potential energy depends on a system's configuration or position."),c("energy transfer","Track energy across the system boundary.","Energy changes form or moves between objects while total energy is conserved."),c("friction","Identify a force opposing relative motion.","Friction often converts mechanical energy into thermal energy.")
  ]);
  lesson("sci",25,"Engineering Design Challenge","Integrated Physical Science",[
    c("criteria","Define what a successful design must accomplish.","Criteria are measurable goals used to judge a solution."),c("constraints","Identify limits on materials, time, cost, or safety.","Constraints restrict the range of possible designs."),c("a prototype","Build a testable version before final production.","A prototype provides evidence about how a design performs."),c("controlled testing","Change one important variable while holding others steady.","Controlled tests make comparisons between designs more meaningful."),c("iteration","Use test evidence to improve the next version.","Iteration repeats design, testing, evaluation, and revision.")
  ]);

  lesson("hist",21,"Reconstruction and Its Legacy","Historical Inquiry and Civics",[
    c("the Reconstruction Amendments","Connect constitutional changes to citizenship and voting.","The Thirteenth, Fourteenth, and Fifteenth Amendments reshaped freedom and citizenship."),c("the Freedmen's Bureau","Examine federal aid after the Civil War.","The bureau supported education, labor agreements, and relief for formerly enslaved people."),c("Black Codes","Evaluate state restrictions after emancipation.","Black Codes attempted to restrict the freedom and opportunities of Black Americans."),c("Reconstruction governments","Consider new political participation and public programs.","Reconstruction expanded biracial government while facing violent opposition."),c("the end of Reconstruction","Trace political compromise and federal withdrawal.","Reduced federal enforcement enabled segregation and voter suppression to expand.")
  ]);
  lesson("hist",22,"Industrialization and Labor","Historical Inquiry and Civics",[
    c("industrialization","Connect machinery, factories, and production.","Industrialization increased mass production and transformed work and cities."),c("immigration and cities","Examine both opportunity and difficult living conditions.","Industrial cities drew immigrants seeking work while housing and services strained."),c("labor unions","Identify collective action over wages and conditions.","Workers formed unions to negotiate and organize strikes for shared demands."),c("monopolies","Evaluate concentrated control of a market.","Monopolies can reduce competition and increase a company's economic power."),c("reform responses","Connect documented problems to proposed laws.","Reformers used investigation and organizing to seek workplace and consumer protections.")
  ]);
  lesson("hist",23,"Civic Rights and Responsibilities","Historical Inquiry and Civics",[
    c("civil liberties","Look for freedoms protected from government interference.","Civil liberties include constitutional protections such as speech and due process."),c("civil rights","Examine equal treatment and participation.","Civil rights protect people from discrimination and unequal application of law."),c("due process","Evaluate whether fair legal procedures were followed.","Due process requires government to respect established legal protections."),c("civic participation","Compare voting with other lawful forms of involvement.","Citizens participate through voting, petitions, meetings, service, and advocacy."),c("the rule of law","Apply law to officials as well as citizens.","Rule of law means public power is limited and governed by established laws.")
  ]);
  lesson("hist",24,"Historical Maps and Data","Historical Inquiry and Civics",[
    c("map scale","Relate map distance to real distance.","Scale converts a measurement on a map into actual distance."),c("a choropleth map","Read shading as a measured variable.","A choropleth map uses color or shading to compare values by area."),c("population data","Compare counts, rates, and denominators carefully.","Population claims require attention to time, place, and whether values are totals or rates."),c("change over time","Compare equivalent evidence from more than one date.","A valid trend uses consistently measured data across time."),c("spatial patterns","Describe clusters and gaps before explaining causes.","A map reveals location patterns, while other evidence is needed to explain them.")
  ]);
  lesson("hist",25,"Evidence-Based Historical Argument","Historical Inquiry and Civics",[
    c("historical context","Place a source within the conditions of its time.","Context helps explain the choices and assumptions visible in a source."),c("sourcing","Ask who created evidence, when, and for what purpose.","Sourcing helps evaluate perspective, knowledge, and possible limitations."),c("causation","Distinguish long-term conditions from immediate triggers.","Historical causes often interact and differ in relative importance."),c("continuity and change","Identify what changed as well as what persisted.","A balanced account compares change with ongoing patterns across a period."),c("a qualified thesis","Make a defensible claim without overstating evidence.","A qualified thesis states the main conclusion and recognizes meaningful limits.")
  ]);
  const equations=[{question:"Solve: 3x + 8 = 23.",answer:"x = 5",choices:["x = 5","x = 3","x = 7","x = 15"]},{question:"Solve: 5(y - 2) = 20.",answer:"y = 6",choices:["y = 6","y = 2","y = 4","y = 22"]},{question:"Solve: 4a - 9 = 19.",answer:"a = 7",choices:["a = 7","a = 5","a = 10","a = 28"]},{question:"What is 15% of 80?",answer:"12",choices:["12","8","15","20"]},{question:"What is the slope through (2, 3) and (4, 7)?",answer:"2",choices:["2","1/2","4","-2"]},{question:"What is the square root of 144?",answer:"12",choices:["12","14","72","24"]},{question:"Evaluate: 2^3 x 2^2.",answer:"32",choices:["32","16","64","8"]},{question:"A right triangle has legs 6 and 8. What is its hypotenuse?",answer:"10",choices:["10","14","48","7"]},{question:"What is the y-intercept of y = 4x - 9?",answer:"-9",choices:["-9","4","9","-4"]},{question:"Solve: 7n = 56.",answer:"n = 8",choices:["n = 8","n = 7","n = 49","n = 63"]}];
  function mathArcadeLesson(){const questions=Array.from({length:25},(_,round)=>{const problems=Array.from({length:5},(_,offset)=>equations[(round*5+offset)%equations.length]);return round%2?{type:"math-relay",q:`Math Relay ${round+1}: race through five laps and build your streak.`,problems,answer:"500",audio:"Math Relay."}:{type:"math-grid",q:`Equation Grid ${round+1}: solve the power tiles and crack the bonus vault.`,tiles:problems.slice(0,3),bonus:problems[3],answer:"500",audio:"Equation Grid."};});data["g8:math:L26"]={name:"Math Arcade: Grid and Relay",topic:"Math Challenge",topicNumber:6,lessonInTopic:1,difficulty:"Mastery",contentVersion:"20260908.1",questions};}
  function historyJeopardy(){
    const facts=[{"question":"Which amendment abolished slavery in the United States?","answer":"Thirteenth Amendment"},{"question":"What document established the framework of the U.S. national government?","answer":"The Constitution"},{"question":"Which branch writes federal laws?","answer":"Legislative branch"},{"question":"What was the purpose of the Bill of Rights?","answer":"To protect individual liberties"},{"question":"What is a primary source?","answer":"Evidence created during the time being studied"},{"question":"What does a census count?","answer":"The population"},{"question":"Which amendment guarantees equal protection under the law?","answer":"Fourteenth Amendment"},{"question":"Which document declared the colonies independent from Britain?","answer":"Declaration of Independence"},{"question":"Which branch is led by the president?","answer":"Executive branch"},{"question":"What right is protected by the First Amendment?","answer":"Freedom of speech"},{"question":"What era followed the Civil War and focused on rebuilding the nation?","answer":"Reconstruction"},{"question":"What does a timeline organize?","answer":"Events in chronological order"},{"question":"What does federalism divide?","answer":"Power between national and state governments"},{"question":"What migration moved many Black Americans from the South to Northern and Western cities?","answer":"The Great Migration"},{"question":"Which branch interprets laws?","answer":"Judicial branch"},{"question":"What protection requires fair legal procedures?","answer":"Due process"},{"question":"What is a secondary source?","answer":"An interpretation created after the time being studied"},{"question":"What is a historian's use of multiple sources called?","answer":"Corroboration"},{"question":"What system prevents one branch from gaining too much power?","answer":"Checks and balances"},{"question":"Which group has the power to approve treaties?","answer":"The Senate"},{"question":"What Supreme Court case established judicial review?","answer":"Marbury v. Madison"},{"question":"What does impeachment allow Congress to do?","answer":"Charge a federal official with misconduct"},{"question":"A source shows an event happened after a policy began. What is still needed to prove the policy caused it?","answer":"Comparison evidence that rules out other causes"},{"question":"What is a citizen participation method besides voting?","answer":"Petitioning government"},{"question":"Two independent accounts disagree about why a strike began. What should a historian do next?","answer":"Compare each source with additional independent evidence"},{"question":"A campaign poster praises a candidate. What source feature should a historian evaluate first?","answer":"Its purpose and intended audience"},{"question":"A law treats one group of citizens differently without a valid reason. Which constitutional protection is most relevant?","answer":"Equal protection under the Fourteenth Amendment"},{"question":"A map shows factory neighborhoods clustered by rail lines, while wage data show lower pay nearby. What is the strongest cautious claim?","answer":"The evidence suggests rail access and lower wages were associated"},{"question":"Several changes happened before a migration increase. What conclusion best avoids overclaiming?","answer":"Multiple factors may have contributed to the migration"},{"question":"A claim relies on one dramatic diary entry. What is the strongest evaluation?","answer":"It is useful perspective but needs corroboration before supporting a broad conclusion"}];
    const categories=["Civics","Founding Ideas","U.S. History","Rights and Law","Government","Historical Thinking"];
    const values=Array.from({length:5},(_,row)=>Array(6).fill((row+1)*100)).flat();
    const clues=facts.map((fact,index)=>{const choices=[fact.answer,...facts.filter(other=>other.answer!==fact.answer).slice(index%20,index%20+3).map(other=>other.answer)];return {value:values[index],category:categories[index%6],question:fact.question,choices,answer:fact.answer};});
    data["g8:hist:L26"]={name:"History Jeopardy: $9,000 Challenge",topic:"Jeopardy Challenge",topicNumber:6,lessonInTopic:1,difficulty:"Mastery",contentVersion:"20260908.3",questions:[{type:"jeopardy",targetScore:9000,q:"Clear the board to win $9,000.",categories,clues,answer:"9000",audio:"History Jeopardy."}]};
  }
  function scienceSimulatorLab(){data["g8:sci:L25"]={name:"Interactive Science Simulator Lab",topic:"Integrated Physical Science",topicNumber:5,lessonInTopic:5,difficulty:"Mastery",contentVersion:"20260908.3",questions:[{type:"science-sim",q:"Explore five interactive science simulations.",answer:"complete",audio:"Interactive science simulator lab."}]};}
    "use strict";
  {
  const data=window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  const topics=window.K12_CLASSIC_25_TOPICS=window.K12_CLASSIC_25_TOPICS||Object.create(null);
  const levels=["Foundation","Developing","Intermediate","Advanced","Mastery"];
  const prompts=[
    "Which answer is most accurate?",
    "A reader applies the idea to a new poem. Which answer is best supported?",
    "Which detail would provide the strongest evidence for that answer?",
    "Which analysis makes the clearest distinction between the tempting choices?",
    "Which conclusion is most defensible after considering the poem as a whole?"
  ];
  const lessons=[
    {name:"Poetry Elements: Foundations",sets:[
      [
        ["In a poem, what is a stanza?",["A grouped set of lines","The person who reads aloud","The title only","The final word"],"A grouped set of lines","Stanzas group lines so readers can notice shifts or related ideas."],
        ["Which feature tells who is speaking in a poem?",["The speaker","The page number","The publisher","The rhyme scheme"],"The speaker","The speaker is the voice presented by the poem; the speaker and poet are not automatically identical."],
        ["Which detail is imagery?",["Warm bread scented the quiet kitchen","The poem has four stanzas","The author was born in May","The line is numbered six"],"Warm bread scented the quiet kitchen","Sensory language helps readers imagine sight, sound, smell, taste, or touch."],
        ["What does a poem's structure include?",["Its arrangement of lines, stanzas, and patterns","Only the number of nouns","The poet's biography","The paper size"],"Its arrangement of lines, stanzas, and patterns","Structure describes how a poem is organized and how that organization shapes reading."],
        ["Which statement best describes a poetic theme?",["A complete message about life or people","One interesting word","The setting's street name","The number of syllables"],"A complete message about life or people","A theme is a message that develops from patterns and details across the poem."]
    ]]},
    {name:"Figurative Language in Poetry",sets:[
      [
        ["The phrase 'quiet as snowfall' is an example of...",["a simile","a metaphor","personification","a literal statement"],"a simile","The comparison uses 'as,' which signals a simile."],
        ["In 'The city is a furnace,' the city is compared directly to...",["a furnace","a snowfield","a person speaking","a clock"],"a furnace","A metaphor makes a direct comparison without like or as."],
        ["'The impatient alarm clock shouted' gives a human action to...",["an alarm clock","a person","a storm","a window"],"an alarm clock","Personification gives a nonhuman thing a human trait or action."],
        ["'I waited a million years' most likely uses...",["hyperbole","a factual measurement","a simile","onomatopoeia"],"hyperbole","Hyperbole is deliberate exaggeration used for emphasis, not a literal time claim."],
        ["A repeated image of a locked door may symbolize...",["a barrier or withheld opportunity","the exact brand of door","the poem's punctuation","a sound effect"],"a barrier or withheld opportunity","A symbol gains broader meaning from its repeated role and context."]
    ]]},
    {name:"Sound, Rhythm, and Structure",sets:[
      [
        ["The repeated beginning sound in 'silver streams softly' is...",["alliteration","a stanza","a metaphor","a speaker"],"alliteration","Alliteration repeats an initial consonant sound in nearby words."],
        ["What does rhyme most directly contribute to a poem?",["A pattern of similar sounds","A factual source","A character's motivation","A change in setting"],"A pattern of similar sounds","Rhyme links words through sound and can emphasize or unify lines."],
        ["Rhythm is best described as...",["the pattern of beats or stresses","the poem's historical date","the speaker's identity","a comparison using like"],"the pattern of beats or stresses","Rhythm is the movement created by stressed and unstressed syllables."],
        ["A long pause inside a line is called a...",["caesura","couplet","hyperbole","refrain"],"caesura","A caesura interrupts the flow and can create hesitation, emphasis, or reflection."],
        ["Why might a poet break a line before a key word?",["To slow the reader and emphasize the word","To prove the word is factual","To identify the speaker","To remove all rhythm"],"To slow the reader and emphasize the word","Line breaks control pacing and can make a word or phrase stand out."]
    ]]},
    {name:"Speaker, Tone, and Theme",sets:[
      [
        ["The speaker of a poem is...",["the voice presented in the poem","always the poet","the person who designed the book","the reader's friend"],"the voice presented in the poem","A poem's speaker is a constructed voice; evidence is needed before identifying it with the poet."],
        ["Tone is the speaker's...",["attitude toward the subject","physical location","number of lines","rhyme pattern"],"attitude toward the subject","Tone can be inferred from diction, imagery, syntax, and details."],
        ["Which word has a more hopeful connotation?",["renewal","ruin","burden","abandonment"],"renewal","Connotation is the feeling or association a word carries beyond its dictionary meaning."],
        ["A theme should be written as...",["a complete message or insight","one topic word","a plot summary only","the poet's birth date"],"a complete message or insight","A topic such as courage becomes a theme when expressed as a meaningful statement."],
        ["If a speaker praises a storm but describes broken windows, a reader should...",["examine the mismatch for irony or an unreliable attitude","accept every word literally","ignore the descriptions","assume the poet caused the storm"],"examine the mismatch for irony or an unreliable attitude","Tension between words and details can complicate tone and interpretation."]
    ]]},
    {name:"Advanced Poetry Analysis",sets:[
      [
        ["A strong poetry analysis should begin with...",["a claim about meaning supported by specific details","a biography unrelated to the lines","a list of every adjective","a plot invented by the reader"],"a claim about meaning supported by specific details","Analysis makes an arguable claim and connects it to evidence from the poem."],
        ["If a repeated river image changes from bright to polluted, the change most likely...",["develops a theme about change or loss","proves the poem is a news report","removes the speaker","shows that all rivers are polluted"],"develops a theme about change or loss","A recurring image that changes can reveal development in meaning or attitude."],
        ["Which evidence best supports a claim that a poem's tone becomes less certain?",["The final stanza replaces confident verbs with questions and conditional words","The title has five letters","The poem is printed in black ink","The speaker mentions a shoe"],"The final stanza replaces confident verbs with questions and conditional words","Specific diction and syntax in the ending directly support a shift in certainty."],
        ["Why should an analyst consider both sound and meaning?",["Sound patterns can reinforce, complicate, or undercut the literal words","Sound always matters more than meaning","Meaning is determined by rhyme alone","Sound cannot affect pacing"],"Sound patterns can reinforce, complicate, or undercut the literal words","A complete interpretation explains how formal choices interact with ideas."],
        ["Which thesis is most precise?",["Through clipped lines and recurring door imagery, the poem presents freedom as desired but difficult to reach","The poem is about a door","The poet uses words","The speaker has feelings"],"Through clipped lines and recurring door imagery, the poem presents freedom as desired but difficult to reach","A strong thesis names meaningful choices and the interpretation they help create."]
      ]]}
  ];
  lessons.forEach((lesson,lessonIndex)=>{
    const questions=[];
    Array.from({length:5},(_,tier)=>lesson.sets[0].forEach(([base,choices,answer,explain],index)=>{
      const prefix=prompts[tier];
      const q=tier===0?base:`${base} ${prefix}`;
      questions.push({type:"mc",difficulty:levels[tier],q,choices,answer,explain,audio:`${lesson.name}, question ${tier*5+index+1}.`});
    }));
    const number=26+lessonIndex;
    data[`g8:eng:L${number}`]={name:lesson.name,topic:"Poetry Analysis",topicNumber:5,lessonInTopic:lessonIndex+1,difficulty:levels[lessonIndex],contentVersion:"20260913.2",questions};
  });
  const current=Array.isArray(topics["g8:eng"])?topics["g8:eng"]:[];
  topics["g8:eng"]=current.filter(group=>group.name!=="Poetry Analysis").concat({topicNumber:5,name:"Poetry Analysis",lessons:lessons.map((lesson,index)=>({key:`g8:eng:L${26+index}`,name:lesson.name,difficulty:levels[index]}))});
  }
  const drama=[
    c("the script's organization","Identify scenes, acts, and stage directions as parts of a performance text.","A script combines dialogue and directions into a structure actors can perform.","Drama is written for performance, so its structure guides both readers and actors."),
    c("dialogue","Infer character goals from what is said and what is avoided.","Dialogue reveals character goals, relationships, and conflict through spoken choices.","What a character says, refuses to say, or repeats can reveal motivation."),
    c("stage directions","Use movement, setting, and sound cues as evidence about a scene.","Stage directions provide nonspoken information about action, setting, and delivery.","Directions can change how a line is understood without changing the words."),
    c("character conflict","Distinguish an internal struggle from an external obstacle.","Character conflict may be internal, external, or both, and it drives dramatic change.","Strong analysis identifies the source of pressure and its effect on choices."),
    c("dramatic irony","Compare what the audience knows with what a character believes.","Dramatic irony occurs when the audience understands an important truth a character misses.","The gap in knowledge creates tension and shapes how the audience interprets the scene.")
  ];
  const dramaLevels=["Foundation","Developing","Intermediate","Advanced","Mastery"];
  const topics=window.K12_CLASSIC_25_TOPICS=window.K12_CLASSIC_25_TOPICS||Object.create(null);
  lesson("eng",31,"Elements of Drama","Drama & Plays",drama);
  lesson("eng",32,"Dialogue and Stage Directions","Drama & Plays",drama);
  lesson("eng",33,"Character Conflict and Motivation","Drama & Plays",drama);
  lesson("eng",34,"Dramatic Irony and Structure","Drama & Plays",drama);
  lesson("eng",35,"Advanced Drama Analysis","Drama & Plays",drama);
  for(let n=31;n<=35;n++){data[`g8:eng:L${n}`].topicNumber=6;data[`g8:eng:L${n}`].lessonInTopic=n-30;data[`g8:eng:L${n}`].difficulty=dramaLevels[n-31];}
  const engTopics=topics["g8:eng"]||[];
  topics["g8:eng"]=engTopics.concat({topicNumber:6,name:"Drama & Plays",lessons:[31,32,33,34,35].map((n,i)=>({key:`g8:eng:L${n}`,name:["Elements of Drama","Dialogue and Stage Directions","Character Conflict and Motivation","Dramatic Irony and Structure","Advanced Drama Analysis"][i],difficulty:dramaLevels[i]}))});
  function richEnglishLesson(number,name,topic,topicNumber,lessonInTopic,seeds){
    const challenge=[
      excerpt=>`Read the text: “${excerpt}” Which answer identifies its most important feature?`,
      excerpt=>`Read the text: “${excerpt}” Which interpretation is best supported by a specific word or action?`,
      excerpt=>`Read the text: “${excerpt}” Which explanation best connects the writer's choice to its effect?`,
      excerpt=>`Read the text: “${excerpt}” Which analysis accounts for both the clear detail and its deeper implication?`,
      excerpt=>`Read the text: “${excerpt}” Which claim would form the strongest thesis about the text as a whole?`
    ];
    const questions=[];
    challenge.forEach((makeQuestion,tier)=>seeds.forEach((seed,index)=>{
      const choices=[seed.answer,...seed.distractors],turn=(tier+index)%4;
      questions.push({type:"mc",difficulty:dramaLevels[tier],q:makeQuestion(seed.excerpt),choices:choices.slice(turn).concat(choices.slice(0,turn)),answer:seed.answer,explain:seed.explain,audio:`${name}, question ${tier*5+index+1}.`});
    }));
    data[`g8:eng:L${number}`]={name,topic,topicNumber,lessonInTopic,difficulty:dramaLevels[lessonInTopic-1],contentVersion:"20260913.4",questions};
  }
  const poetrySeeds=[
    {excerpt:"The last leaf held its copper light / while every branch let go.",answer:"The leaf imagery suggests resistance as the season changes.",distractors:["The speaker gives a scientific report about leaves.","The rhyme proves the setting is indoors.","The lines show that nothing is changing."],explain:"The contrast between one leaf holding on and other branches letting go supports resistance during change."},
    {excerpt:"My worries knock like rain against the glass.",answer:"The simile makes the worries feel persistent and difficult to ignore.",distractors:["The worries are literally made of water.","The comparison creates a cheerful tone.","The glass symbolizes athletic skill."],explain:"Comparing worries to repeated rain taps emphasizes persistence and mental pressure."},
    {excerpt:"Run, river, run— / then hush beneath the bridge.",answer:"The repetition and pause shift the pace from urgent to calm.",distractors:["The punctuation removes all rhythm.","The speaker changes point of view.","The lines contain no sound devices."],explain:"Repetition accelerates the opening while the dash and quiet command slow the next line."},
    {excerpt:"I called the empty station home, / though every train moved on.",answer:"The speaker's attachment conflicts with the repeated image of departure.",distractors:["The speaker must be the poet.","The train schedule is the only subject.","The tone is purely celebratory."],explain:"Calling the station home suggests attachment, while departing trains create loneliness and tension."},
    {excerpt:"At dawn the locked gate wore a crown of frost; by noon, one drop had found the key.",answer:"The changing gate image develops hope that barriers can weaken over time.",distractors:["Keys are made from water.","The frost proves the speaker feels only anger.","The image has no connection to change."],explain:"The gate begins as a barrier, but melting frost becomes a figurative key, supporting hope."}
  ];
  const dramaSeeds=[
    {excerpt:"MARA: I never touched the letter. [She folds it quickly and hides it behind her back.]",answer:"The stage direction contradicts Mara's words and suggests dishonesty.",distractors:["The direction proves Mara cannot read.","The dialogue resolves the conflict.","The action describes the audience."],explain:"Her hidden action conflicts with her denial, giving the audience evidence that she may be lying."},
    {excerpt:"[Thunder. The lights fail.] DEV: Perfect timing. Exactly what we needed.",answer:"Dev's sarcastic dialogue emphasizes the worsening situation.",distractors:["Dev sincerely celebrates the failure.","Thunder functions as a character.","The scene has no conflict."],explain:"The situation makes the positive words sarcastic and reveals frustration."},
    {excerpt:"LENA: Take the scholarship. I will be fine. [She grips the letter until it tears.]",answer:"Lena's action reveals an internal conflict hidden by her supportive words.",distractors:["Lena does not understand scholarships.","The letter ends every relationship.","Her words and action express the same feeling."],explain:"Her words support someone else, while her tense action suggests disappointment or sacrifice."},
    {excerpt:"The audience sees smoke beneath the door, but ARI continues searching for a missing candle.",answer:"The audience's knowledge creates dramatic irony and suspense.",distractors:["Ari knows more than the audience.","The scene uses verbal irony only.","The smoke removes danger."],explain:"The audience recognizes a risk that Ari has not understood, increasing suspense."},
    {excerpt:"Act I ends with the brothers shaking hands. Act II opens with each secretly signing the same rival contract.",answer:"The act break turns apparent agreement into conflict built on betrayal.",distractors:["The brothers never met.","The contracts are stage directions.","The act break eliminates tension."],explain:"The secret actions after the handshake change how the audience reads their agreement."}
  ];
  const themeSeeds=[
    {excerpt:"Nia failed the audition, practiced each morning, and returned a month later to earn a smaller role.",answer:"Persistence can create progress even when success is gradual.",distractors:["Talent guarantees immediate success.","Failure means a goal should be abandoned.","Smaller roles have no value."],explain:"Nia responds to failure with sustained effort and achieves meaningful, gradual progress."},
    {excerpt:"Although Tomas wanted credit, he told the class that Mei had solved the design flaw.",answer:"Integrity requires honesty even when recognition is tempting.",distractors:["Recognition matters more than truth.","Teamwork requires hiding credit.","Tomas has no meaningful choice."],explain:"Tomas gives accurate credit despite his own desire, showing integrity under pressure."},
    {excerpt:"At first, Jalen calls the garden a waste. After working beside his neighbors, he saves seeds for spring.",answer:"Participation changes Jalen from dismissive to invested in his community.",distractors:["Jalen remains unchanged.","The garden matters only for money.","Saving seeds shows dislike."],explain:"His actions shift from rejection to planning for the garden's future, revealing changed values."},
    {excerpt:"The mayor promises repairs, but the narrator repeatedly describes fresh paint covering deeper cracks.",answer:"The paint image suggests appearances are masking unresolved problems.",distractors:["The repairs are complete.","The narrator only admires the color.","The cracks symbolize excellent planning."],explain:"Paint covers rather than repairs the cracks, creating a pattern of superficial solutions."},
    {excerpt:"Rosa wins the debate using her rival's private message, then deletes the trophy photo without sharing it.",answer:"The ending suggests that success gained unfairly brings guilt rather than satisfaction.",distractors:["Winning matters at any cost.","Rosa forgot the debate.","The private message has no thematic effect."],explain:"Rosa wins, but her response reveals moral discomfort and complicates the idea of victory."}
  ];
  ["Poetry Elements: Foundations","Figurative Language in Poetry","Sound, Rhythm, and Structure","Speaker, Tone, and Theme","Advanced Poetry Analysis"].forEach((name,i)=>richEnglishLesson(26+i,name,"Poetry Analysis",5,i+1,poetrySeeds));
  ["Elements of Drama","Dialogue and Stage Directions","Character Conflict and Motivation","Dramatic Irony and Structure","Advanced Drama Analysis"].forEach((name,i)=>richEnglishLesson(31+i,name,"Drama & Plays",6,i+1,dramaSeeds));
  const themeNames=["Identifying Theme","Character Traits and Motivation","Character Change","Connecting Character and Theme","Complex Theme Analysis"];
  themeNames.forEach((name,i)=>richEnglishLesson(36+i,name,"Theme & Character Development",7,i+1,themeSeeds));
  topics["g8:eng"]=(topics["g8:eng"]||[]).filter(group=>group.name!=="Theme & Character Development").concat({topicNumber:7,name:"Theme & Character Development",lessons:themeNames.map((name,i)=>({key:`g8:eng:L${36+i}`,name,difficulty:dramaLevels[i]}))});
  const craftSeeds=[
    {excerpt:"The hallway did not merely stretch ahead; it yawned, pale and endless, beneath the buzzing lights.",answer:"The personification and visual imagery make the hallway feel threatening and inescapable.",distractors:["The sentence presents a neutral building measurement.","The buzzing creates a peaceful pastoral mood.","The word endless proves the hallway has no physical end."],explain:"The verb 'yawned' gives the hallway a looming presence, while pale light and endless distance create unease."},
    {excerpt:"Grandfather kept the rusted compass on his desk, even after its needle stopped choosing north.",answer:"The broken compass can symbolize a valued connection to the past rather than a useful tool.",distractors:["The compass proves Grandfather is currently lost.","Rust symbolizes the object's increasing accuracy.","The sentence explains how to repair a compass."],explain:"Keeping an object after it loses its practical use suggests that its emotional or symbolic meaning matters more."},
    {excerpt:"A floorboard creaked. Mina froze. From downstairs came one slow scrape, then another.",answer:"Short sentences and delayed sounds slow the moment and build suspense.",distractors:["The pacing quickly resolves the danger.","Long explanations make the scene feel relaxed.","The author reveals exactly who is downstairs."],explain:"Brief actions separated by pauses make the reader wait with Mina and focus on each unexplained sound."},
    {excerpt:"After boasting that he never forgot a promise, Cal discovers the unopened invitation in his own coat.",answer:"The discovery creates situational irony by exposing the gap between Cal's claim and his actions.",distractors:["The invitation proves Cal kept every promise.","The moment is dramatic irony because only Cal knows the truth.","The coat functions only as setting."],explain:"The outcome contradicts Cal's confident claim, revealing a flaw the earlier boast tried to deny."},
    {excerpt:"The narrator calls the town 'perfect' while describing locked playgrounds, silent shops, and curtains that close whenever strangers pass.",answer:"The repeated unsettling details undercut the narrator's praise and create an unreliable or ironic tone.",distractors:["The details confirm that the town is welcoming.","The word perfect removes ambiguity from the passage.","The closed curtains establish a humorous tone only."],explain:"The positive label conflicts with a pattern of fear and isolation, so readers must question the narrator's judgment."}
  ];
  const craftNames=["Word Choice and Imagery","Figurative and Symbolic Language","Pacing and Suspense","Irony and Author's Choices","Advanced Author's Craft Analysis"];
  craftNames.forEach((name,i)=>richEnglishLesson(41+i,name,"Author's Craft",8,i+1,craftSeeds));
  topics["g8:eng"]=(topics["g8:eng"]||[]).filter(group=>group.name!=="Author's Craft").concat({topicNumber:8,name:"Author's Craft",lessons:craftNames.map((name,i)=>({key:`g8:eng:L${41+i}`,name,difficulty:dramaLevels[i]}))});
  function volumeQuestion(kind,index){
    const tier=Math.floor(index/5),step=index%5+1;
    if(kind==="cylinder"){
      const r=2+step+tier,h=4+step*2+tier,v=r*r*h;
      return {q:`A cylinder has radius ${r} cm and height ${h} cm. What is its exact volume?`,answer:`${v}π cm³`,choices:[`${v}π cm³`,`${2*r*h}π cm³`,`${r*r+h}π cm³`,`${3*v}π cm³`],explain:`Use V = πr²h: π(${r})²(${h}) = ${v}π cm³.`};
    }
    if(kind==="cone"){
      const r=2+step,h=3*(tier+step+1),v=r*r*h/3;
      return {q:`A cone has radius ${r} m and height ${h} m. What is its exact volume?`,answer:`${v}π m³`,choices:[`${v}π m³`,`${3*v}π m³`,`${v+r}π m³`,`${v+h}π m³`],explain:`Use V = ⅓πr²h: ⅓π(${r})²(${h}) = ${v}π m³.`};
    }
    if(kind==="sphere"){
      const r=3*(index+2),v=4*r*r*r/3;
      return {q:`A sphere has radius ${r} in. What is its exact volume?`,answer:`${v}π in³`,choices:[`${v}π in³`,`${4*r*r}π in³`,`${r*r*r}π in³`,`${v+r}π in³`],explain:`Use V = ⁴⁄₃πr³: ⁴⁄₃π(${r})³ = ${v}π in³.`};
    }
    if(kind==="composite"){
      const r=3+3*step,h=5+tier,r3=r*r*r,cylinder=r*r*h,hemisphere=2*r3/3,total=cylinder+hemisphere;
      return {q:`A solid combines a cylinder of radius ${r} cm and height ${h} cm with a hemisphere of the same radius. What is its exact volume?`,answer:`${total}π cm³`,choices:[`${total}π cm³`,`${cylinder}π cm³`,`${cylinder+4*r3/3}π cm³`,`${2*r*h}π cm³`],explain:`Add πr²h and ⅔πr³: ${cylinder}π + ${hemisphere}π = ${total}π cm³.`};
    }
    const r=3+step,h=6+tier,scale=tier+2,original=r*r*h,scaled=original*scale*scale*scale;
    return {q:`A cylindrical tank has radius ${r} ft and height ${h} ft. A similar tank has every dimension multiplied by ${scale}. How many times the original volume is the new volume?`,answer:`${scale**3} times`,choices:[`${scale**3} times`,`${scale} times`,`${scale**2} times`,`${scaled} times`],explain:`Volume scales by the cube of a linear scale factor, so ${scale}³ = ${scale**3}.`};
  }
  function addVolumeLesson(number,name,kind,lessonInTopic){
    const questions=Array.from({length:25},(_,index)=>{const item=volumeQuestion(kind,index),tier=Math.floor(index/5),turn=index%4;const choices=item.choices.slice(turn).concat(item.choices.slice(0,turn));return {type:"mc",difficulty:dramaLevels[tier],q:item.q,choices,answer:item.answer,explain:item.explain,audio:`${name}, question ${index+1}.`};});
    data[`g8:math:L${number}`]={name,topic:"Volume",topicNumber:7,lessonInTopic,difficulty:dramaLevels[lessonInTopic-1],contentVersion:"20260913.5",questions};
  }
  const volumeNames=["Volume of Cylinders","Volume of Cones","Volume of Spheres","Composite Solid Problems","Advanced Volume Applications"];
  ["cylinder","cone","sphere","composite","advanced"].forEach((kind,i)=>addVolumeLesson(27+i,volumeNames[i],kind,i+1));
  topics["g8:math"]=(topics["g8:math"]||[]).filter(group=>group.name!=="Volume").concat({topicNumber:7,name:"Volume",lessons:volumeNames.map((name,i)=>({key:`g8:math:L${27+i}`,name,difficulty:dramaLevels[i]}))});
  function evidenceLesson(subject,number,name,topic,topicNumber,lessonInTopic,seeds){
    const stems=[
      text=>`${text} Which answer correctly identifies the central concept?`,
      text=>`${text} Which explanation is best supported by the evidence?`,
      text=>`${text} Which cause-and-effect analysis is most accurate?`,
      text=>`${text} Which conclusion accounts for the evidence and avoids overclaiming?`,
      text=>`${text} Which claim would be strongest in a complete evidence-based analysis?`
    ];
    const questions=[];
    stems.forEach((stem,tier)=>seeds.forEach((seed,index)=>{const all=[seed.answer,...seed.distractors],turn=(tier+index)%4;questions.push({type:"mc",difficulty:dramaLevels[tier],q:stem(seed.text),choices:all.slice(turn).concat(all.slice(0,turn)),answer:seed.answer,explain:seed.explain,audio:`${name}, question ${tier*5+index+1}.`});}));
    data[`g8:${subject}:L${number}`]={name,topic,topicNumber,lessonInTopic,difficulty:dramaLevels[lessonInTopic-1],contentVersion:"20260913.6",questions};
  }
  const waveSeeds=[
    {text:"A floating cork completes 8 up-and-down cycles in 4 seconds.",answer:"The wave frequency is 2 hertz.",distractors:["The frequency is 32 hertz.","The wavelength is 2 meters.","The amplitude is 4 seconds."],explain:"Frequency is cycles divided by time: 8 ÷ 4 = 2 cycles per second, or 2 Hz."},
    {text:"Two waves travel at the same speed. Wave A has twice the frequency of Wave B.",answer:"Wave A has half the wavelength of Wave B.",distractors:["Wave A has twice the wavelength.","Both waves must have zero amplitude.","Wave speed doubles automatically."],explain:"Because speed equals frequency times wavelength, wavelength decreases when frequency increases at constant speed."},
    {text:"A student increases the height of each pulse on a rope without changing how often pulses are sent.",answer:"The amplitude and transported energy increase while frequency stays the same.",distractors:["Only frequency increases.","The wavelength must become zero.","The rope stops carrying energy."],explain:"Taller pulses have greater amplitude and energy; the unchanged pulse rate means frequency stays constant."},
    {text:"A sound travels from air into water and bends at the boundary.",answer:"Refraction occurs because the wave changes speed in the new medium.",distractors:["Reflection occurs because all energy returns to air.","Diffraction occurs because frequency becomes zero.","Interference eliminates the sound permanently."],explain:"A change in wave speed at a boundary can change direction, producing refraction."},
    {text:"Two equal pulses meet on a rope, one upward and one downward, then continue past each other.",answer:"They briefly undergo destructive interference before continuing.",distractors:["They permanently destroy each other.","They create a new mechanical medium.","They undergo only constructive interference."],explain:"Opposite displacements cancel temporarily during superposition; afterward the pulses continue."}
  ];
  const waveNames=["Wave Properties","Amplitude, Frequency, and Wavelength","Mechanical Waves","Wave Interactions","Advanced Wave Analysis"];
  waveNames.forEach((name,i)=>evidenceLesson("sci",26+i,name,"Waves",6,i+1,waveSeeds));
  topics["g8:sci"]=(topics["g8:sci"]||[]).filter(group=>group.name!=="Waves").concat({topicNumber:6,name:"Waves",lessons:waveNames.map((name,i)=>({key:`g8:sci:L${26+i}`,name,difficulty:dramaLevels[i]}))});
  const westwardSeeds=[
    {text:"An 1803 map shows the United States nearly doubling in size after land was purchased from France.",answer:"The Louisiana Purchase expanded U.S. territory and raised questions about governing new lands.",distractors:["The purchase immediately created all present state borders.","France gained control of the Mississippi River.","The map proves expansion caused no conflict."],explain:"The Louisiana Purchase greatly expanded national territory, creating new political and geographic questions."},
    {text:"An 1840s newspaper claims that U.S. settlement across the continent was destined and beneficial.",answer:"The source reflects Manifest Destiny and should be evaluated for its expansionist perspective.",distractors:["The source is neutral because it appeared in print.","The claim represents every resident's viewpoint.","The article proves expansion had no human costs."],explain:"Language about destiny reflects an ideology favoring expansion, so purpose and omitted perspectives matter."},
    {text:"A family diary describes fertile western land but also records disease, broken wagons, and scarce water on the trail.",answer:"The diary shows that migration offered opportunity while involving serious risks.",distractors:["The journey was easy for all migrants.","The diary proves land was unavailable.","One diary can establish every migrant's experience."],explain:"The same primary source documents both hopes and hardships, supporting a qualified conclusion."},
    {text:"A treaty cedes Native land after military pressure, while a government report describes the agreement as voluntary.",answer:"The conflicting evidence requires analysis of coercion, purpose, and Native perspectives.",distractors:["The government report settles the issue by itself.","Military pressure is irrelevant to consent.","The treaty affected only mapmaking."],explain:"Power differences and source purpose are essential when evaluating whether an agreement was voluntary."},
    {text:"Population records show rapid settler growth after a railroad opened, while Native accounts describe lost hunting grounds.",answer:"Expansion produced connected economic growth and displacement whose effects differed across groups.",distractors:["The railroad benefited every group equally.","Population growth proves displacement did not occur.","The sources cannot both be accurate."],explain:"Together the sources show simultaneous development and displacement from distinct perspectives."}
  ];
  const westwardNames=["Territorial Expansion","Manifest Destiny","Migration and Settlement","Native Nations and Expansion","Westward Expansion Analysis"];
  westwardNames.forEach((name,i)=>evidenceLesson("hist",27+i,name,"Westward Expansion",7,i+1,westwardSeeds));
  topics["g8:hist"]=(topics["g8:hist"]||[]).filter(group=>group.name!=="Westward Expansion").concat({topicNumber:7,name:"Westward Expansion",lessons:westwardNames.map((name,i)=>({key:`g8:hist:L${27+i}`,name,difficulty:dramaLevels[i]}))});
  function probabilityQuestion(kind,index){
    const model=index+1,tier=Math.floor(index/5);
    if(kind==="foundation"){
      const favorable=2+(index%7),total=10;
      return {q:`Probability model ${model}: A bag contains ${total} equally likely tiles, and ${favorable} are blue. What is P(blue)?`,answer:`${favorable}/${total}`,choices:[`${favorable}/${total}`,`${favorable+1}/${total}`,`${favorable+2}/${total}`,`${favorable}/${total*10}`],explain:`Probability is favorable outcomes divided by total outcomes: ${favorable}/${total}.`};
    }
    if(kind==="compound"){
      const sections=2+(index%5),total=8,number=1+(index%3);
      return {q:`Compound-event model ${model}: A spinner has ${sections} winning sections out of ${total}, and a number cube must show ${number}. What is the probability of both independent events?`,answer:`${sections}/48`,choices:[`${sections}/48`,`${sections}/8`,`${sections+6}/48`,`${sections*6}/48`],explain:`Multiply ${sections}/${total} by 1/6 to get ${sections}/48.`};
    }
    if(kind==="dependent"){
      const red=3+(index%5),total=10+index;
      return {q:`Without-replacement model ${model}: A bag has ${red} red and ${total-red} other counters. After one red counter is removed, which expression gives the probability that the next counter is red?`,answer:`${red-1}/${total-1}`,choices:[`${red-1}/${total-1}`,`${red}/${total}`,`${red-1}/${total}`,`${red}/${total-1}`],explain:`Both the red count and total count decrease by one after a red counter is removed.`};
    }
    if(kind==="experimental"){
      const trials=50+index*5,successes=15+index*2;
      return {q:`Data set ${model}: An event occurred ${successes} times in ${trials} trials. Which value is its experimental probability?`,answer:`${successes}/${trials}`,choices:[`${successes}/${trials}`,`${trials-successes}/${trials}`,`${successes}/${trials+successes}`,`${trials}/${successes}`],explain:`Experimental probability equals observed successes divided by the total number of trials.`};
    }
    const rain=20+index,late=5+(index%8);
    return {q:`Decision model ${model}: A forecast gives a ${rain}% chance of rain. If it rains, the chance a game starts late is ${late}%. Assuming the model's conditional rates, which product finds P(rain and late start)?`,answer:`0.${rain} × 0.${String(late).padStart(2,"0")}`,choices:[`0.${rain} × 0.${String(late).padStart(2,"0")}`,`0.${rain} + 0.${String(late).padStart(2,"0")}`,`${rain} × ${late}`,`1 − 0.${rain}`],explain:"For a joint event described by a conditional probability, multiply P(rain) by P(late given rain)."};
  }
  function addProbabilityLesson(number,name,kind,lessonInTopic){const questions=Array.from({length:25},(_,index)=>{const item=probabilityQuestion(kind,index),tier=Math.floor(index/5),turn=index%4,choices=item.choices.slice(turn).concat(item.choices.slice(0,turn));return {type:"mc",difficulty:dramaLevels[tier],q:item.q,choices,answer:item.answer,explain:item.explain,audio:`${name}, question ${index+1}.`};});data[`g8:math:L${number}`]={name,topic:"Probability",topicNumber:8,lessonInTopic,difficulty:dramaLevels[lessonInTopic-1],contentVersion:"20260913.7",questions};}
  const probabilityNames=["Probability Foundations","Compound Events","Independent and Dependent Events","Experimental vs. Theoretical Probability","Advanced Probability Modeling"];
  ["foundation","compound","dependent","experimental","advanced"].forEach((kind,i)=>addProbabilityLesson(32+i,probabilityNames[i],kind,i+1));
  topics["g8:math"]=(topics["g8:math"]||[]).filter(group=>group.name!=="Probability").concat({topicNumber:8,name:"Probability",lessons:probabilityNames.map((name,i)=>({key:`g8:math:L${32+i}`,name,difficulty:dramaLevels[i]}))});
  const emSeeds=[
    {text:"A radio signal and visible light travel through a vacuum.",answer:"Both are electromagnetic waves and travel at the same speed in a vacuum.",distractors:["Only visible light carries energy.","Radio waves require air to move.","Radio waves travel faster than light in a vacuum."],explain:"All electromagnetic waves travel at the speed of light in a vacuum, though their frequencies and wavelengths differ."},
    {text:"A wave has a longer wavelength than visible red light and is used for thermal imaging.",answer:"It is infrared radiation.",distractors:["It is ultraviolet radiation.","It is a sound wave.","It is a gamma ray."],explain:"Infrared lies just beyond red light at longer wavelengths and is associated with thermal radiation."},
    {text:"A medical image uses high-energy electromagnetic waves that pass through soft tissue more readily than bone.",answer:"The technology uses X-rays, balancing image benefit against ionizing-radiation exposure.",distractors:["It uses radio waves that cannot enter tissue.","It uses visible light only.","It uses mechanical waves traveling through vacuum."],explain:"X-rays are penetrating ionizing radiation, so their diagnostic value is managed with controlled exposure."},
    {text:"Two electromagnetic waves travel in space; Wave A has greater frequency than Wave B.",answer:"Wave A has a shorter wavelength and greater photon energy.",distractors:["Wave A has a longer wavelength and less energy.","Both must have the same wavelength.","Wave B must be a mechanical wave."],explain:"For electromagnetic waves, frequency increases as wavelength decreases, and photon energy rises with frequency."},
    {text:"A designer must transmit data through walls while limiting ionizing radiation risk.",answer:"Radio or microwave frequencies are suitable because they are non-ionizing and can carry encoded signals.",distractors:["Gamma rays are safest for continuous indoor use.","Ultraviolet is required because it has the longest wavelength.","Sound in a vacuum is the best electromagnetic option."],explain:"Radio and microwave bands support communication and are non-ionizing; design still accounts for power and interference."}
  ];
  const emNames=["Electromagnetic Waves","Radio through Visible Light","Ultraviolet through Gamma Rays","EM Waves and Technology","Electromagnetic Spectrum Analysis"];
  emNames.forEach((name,i)=>evidenceLesson("sci",31+i,name,"Electromagnetic Spectrum",7,i+1,emSeeds));
  topics["g8:sci"]=(topics["g8:sci"]||[]).filter(group=>group.name!=="Electromagnetic Spectrum").concat({topicNumber:7,name:"Electromagnetic Spectrum",lessons:emNames.map((name,i)=>({key:`g8:sci:L${31+i}`,name,difficulty:dramaLevels[i]}))});
  const gildedSeeds=[
    {text:"A late-1800s company buys competitors, controls shipping rates, and dominates one national market.",answer:"The evidence illustrates consolidation that could reduce competition and increase corporate power.",distractors:["The company is a small local partnership.","Market control guarantees lower prices for everyone.","The evidence concerns only farming technology."],explain:"Buying competitors and controlling transportation are methods associated with concentrated corporate power."},
    {text:"Rail lines connect western farms to eastern cities, while railroad companies receive land grants and set unequal freight rates.",answer:"Railroads expanded national markets but also created conflicts over subsidies and pricing power.",distractors:["Railroads affected travel but not commerce.","All shippers paid identical rates.","Land grants prevented railroad expansion."],explain:"The evidence supports both economic integration and criticism of railroad influence."},
    {text:"A city neighborhood gains thousands of immigrant residents near factories but lacks adequate housing and sanitation.",answer:"Industrial jobs encouraged urban growth while city services and housing failed to keep pace.",distractors:["Immigration caused factories to close.","Urban growth immediately improved every living condition.","The evidence shows no connection between work and settlement."],explain:"Factory employment drew residents, while overcrowding exposed limits in urban infrastructure."},
    {text:"A political organization provides food and jobs in exchange for votes, then awards contracts to its supporters.",answer:"The machine met some community needs while using patronage to preserve power and encourage corruption.",distractors:["The organization practiced direct democracy without influence.","Providing aid proves contracts were awarded fairly.","The arrangement had no political purpose."],explain:"A balanced analysis recognizes services while explaining how exchanged favors maintained control."},
    {text:"A newspaper condemns a wealthy industrialist, while company payroll records show rising employment but dangerous accident rates.",answer:"The sources should be combined to evaluate economic growth alongside labor costs and each source's purpose.",distractors:["The newspaper alone proves every claim.","Employment growth makes accident evidence irrelevant.","Because the sources differ, neither can be used."],explain:"Corroborating distinct sources supports a qualified account of benefits, harms, and perspective."}
  ];
  const gildedNames=["Rise of Big Business","Railroads and National Markets","Immigration and Urban Growth","Wealth, Poverty, and Political Machines","Gilded Age Source Analysis"];
  gildedNames.forEach((name,i)=>evidenceLesson("hist",32+i,name,"Gilded Age",8,i+1,gildedSeeds));
  topics["g8:hist"]=(topics["g8:hist"]||[]).filter(group=>group.name!=="Gilded Age").concat({topicNumber:8,name:"Gilded Age",lessons:gildedNames.map((name,i)=>({key:`g8:hist:L${32+i}`,name,difficulty:dramaLevels[i]}))});
  function addEvidenceUnit(subject,start,topic,topicNumber,names,seeds){names.forEach((name,i)=>evidenceLesson(subject,start+i,name,topic,topicNumber,i%5+1,seeds));topics[`g8:${subject}`]=(topics[`g8:${subject}`]||[]).filter(group=>group.name!==topic).concat({topicNumber,name:topic,lessons:names.map((name,i)=>({key:`g8:${subject}:L${start+i}`,name,difficulty:dramaLevels[i%5]}))});}
  function mathReasoningLesson(number,name,topic,topicNumber,lessonInTopic,seeds){
    const stems=["Find the correct result.","Choose the method and result that are both correct.","Which explanation shows valid mathematical reasoning?","Which conclusion avoids the most likely calculation or interpretation error?","Which solution would best defend the result in a complete analysis?"];
    const questions=[];stems.forEach((stem,tier)=>seeds.forEach((seed,index)=>{const all=[seed.answer,...seed.distractors],turn=(tier+index)%4;questions.push({type:"mc",difficulty:dramaLevels[tier],q:`${seed.text} ${stem}`,choices:all.slice(turn).concat(all.slice(0,turn)),answer:seed.answer,explain:seed.explain,audio:`${name}, question ${tier*5+index+1}.`});}));
    data[`g8:math:L${number}`]={name,topic,topicNumber,lessonInTopic,difficulty:dramaLevels[lessonInTopic-1],contentVersion:"20260913.8",questions};
  }
  function addMathUnit(start,topic,topicNumber,names,seeds){names.forEach((name,i)=>mathReasoningLesson(start+i,name,topic,topicNumber,i+1,seeds));topics["g8:math"]=(topics["g8:math"]||[]).filter(group=>group.name!==topic).concat({topicNumber,name:topic,lessons:names.map((name,i)=>({key:`g8:math:L${start+i}`,name,difficulty:dramaLevels[i]}))});}
  const statsSeeds=[
    {text:"The data are 4, 6, 6, 8, and 16.",answer:"The mean is 8, while the median is 6; the high value pulls the mean upward.",distractors:["The mean and median are both 6.","The mode is 16 because it is largest.","Removing 16 would increase the range."],explain:"The sum is 40, so the mean is 8; the middle value is 6, and 16 raises the mean."},
    {text:"Set A has Q1 = 12 and Q3 = 20. Set B has Q1 = 10 and Q3 = 25.",answer:"Set B has the greater interquartile range: 15 compared with 8.",distractors:["Set A has the greater IQR: 32.","Both IQRs equal 8.","An IQR cannot be found from quartiles."],explain:"IQR = Q3 − Q1, giving 8 for A and 15 for B."},
    {text:"A survey about school lunch is given only to students waiting in the pizza line.",answer:"The sample is biased because pizza-line students may not represent all students.",distractors:["The sample is random because many students eat pizza.","The survey proves every student prefers pizza.","Bias is impossible in a school survey."],explain:"The selection method favors students already choosing one lunch option."},
    {text:"Two dot plots have the same median, but one is tightly clustered while the other is widely spread.",answer:"Their centers match, but their variability differs.",distractors:["The plots must contain identical data.","The wider plot must have a larger median.","Spread cannot be compared visually."],explain:"Equal medians describe center; the different clustering describes variability."},
    {text:"A headline says a program caused higher scores because participants averaged 4 points more than nonparticipants.",answer:"The claim needs information about group selection, variability, and other possible causes.",distractors:["A 4-point difference always proves causation.","Averages make sample design irrelevant.","The lower group must have avoided studying."],explain:"An observed difference alone does not establish causation or rule out confounding variables."}
  ];
  const statsNames=["Data Distributions","Measures of Center","Measures of Spread","Comparing Data Sets","Statistical Claims and Conclusions"];
  addMathUnit(37,"Statistics",9,statsNames,statsSeeds);
  const angleSeeds=[
    {text:"Two complementary angles measure 3x° and (x + 10)°.",answer:"x = 20 because 3x + x + 10 = 90.",distractors:["x = 45 because both angles are equal.","x = 25 because they total 110.","x = 80 because complementary means subtract."],explain:"Complementary angles sum to 90°, so 4x + 10 = 90 and x = 20."},
    {text:"Parallel lines are cut by a transversal. One corresponding angle measures 68°.",answer:"Its corresponding angle is 68°.",distractors:["Its corresponding angle is 112°.","Its corresponding angle is 22°.","Parallel lines provide no angle relationship."],explain:"Corresponding angles formed by a transversal across parallel lines are congruent."},
    {text:"A triangle has interior angles 47° and 65°.",answer:"The third interior angle is 68°.",distractors:["The third angle is 112°.","The third angle is 18°.","The third angle is 72°."],explain:"Triangle angles total 180°, so 180 − 47 − 65 = 68."},
    {text:"An exterior angle of a triangle has remote interior angles 38° and 79°.",answer:"The exterior angle is 117°.",distractors:["The exterior angle is 41°.","The exterior angle is 63°.","The exterior angle is 180°."],explain:"An exterior angle equals the sum of its two remote interior angles: 38 + 79 = 117."},
    {text:"A diagram labels vertical angles (5x − 7)° and (3x + 29)°.",answer:"x = 18 because vertical angles are congruent.",distractors:["x = 11 because vertical angles are supplementary.","x = 36 because the expressions should be added.","x = 7 because only constants matter."],explain:"Set 5x − 7 = 3x + 29; then 2x = 36 and x = 18."}
  ];
  const angleNames=["Angle Relationships","Parallel Lines and Transversals","Interior and Exterior Angles","Multi-Step Angle Problems","Advanced Geometric Reasoning"];
  addMathUnit(42,"Geometry & Angles",10,angleNames,angleSeeds);
  const moonSeeds=[
    {text:"Earth rotates once about every 24 hours while orbiting the Sun once each year.",answer:"Rotation causes day and night; revolution defines the year.",distractors:["Revolution causes each daily sunrise.","Rotation causes the seasons by itself.","Earth does not move while the Sun moves around it."],explain:"Daily light cycles follow Earth's rotation; the yearly orbit is its revolution around the Sun."},
    {text:"The Moon appears half illuminated and is moving from new moon toward full moon.",answer:"The phase is first quarter.",distractors:["The phase is third quarter.","The phase is a lunar eclipse.","Earth's shadow covers half the Moon every month."],explain:"A waxing half-lit Moon is first quarter; normal phases result from viewing the sunlit half at different angles."},
    {text:"The Moon passes directly between Earth and the Sun, and its shadow reaches part of Earth.",answer:"A solar eclipse occurs.",distractors:["A lunar eclipse occurs.","A spring tide cannot occur.","The Moon enters Earth's shadow."],explain:"A solar eclipse occurs when the Moon blocks the Sun from an aligned region of Earth."},
    {text:"The Sun, Earth, and Moon are nearly aligned during a full moon.",answer:"The combined gravitational pulls produce a spring tide with a larger tidal range.",distractors:["A neap tide with no tidal range occurs.","Tides stop because gravity cancels.","Only Earth's rotation affects the oceans."],explain:"Alignment at new and full moon strengthens the tidal effect, producing spring tides."},
    {text:"A model shows the Moon's orbit tilted relative to Earth's orbital plane.",answer:"The tilt explains why eclipses do not occur at every new and full moon.",distractors:["The tilt causes every Moon phase.","The tilt prevents all eclipses.","The model proves the Moon produces its own light."],explain:"Most months the bodies do not align closely enough because the Moon's orbit is tilted."}
  ];
  addEvidenceUnit("sci",36,"Earth-Sun-Moon System",8,["Earth, Sun, and Moon","Moon Phases","Solar and Lunar Eclipses","Tides and Gravitational Effects","Earth-Sun-Moon System Analysis"],moonSeeds);
  const astronomySeeds=[
    {text:"Two stars have the same apparent brightness, but Star A is much farther away.",answer:"Star A must have greater intrinsic luminosity.",distractors:["Star A must be smaller.","Distance never affects apparent brightness.","Both stars must have identical temperatures."],explain:"A farther star must emit more light to appear as bright as a nearer one."},
    {text:"A Sun-like star exhausts hydrogen in its core.",answer:"It expands into a red giant before later shedding outer layers.",distractors:["It immediately becomes a black hole.","It returns to a protostar.","It stops changing permanently."],explain:"Low- and medium-mass stars expand into red giants and eventually form white dwarfs after losing outer layers."},
    {text:"Astronomers observe billions of stars, gas, and dust bound together by gravity.",answer:"They are observing a galaxy.",distractors:["They are observing one solar system.","They are observing a single constellation line.","They are observing an asteroid belt only."],explain:"A galaxy is a vast gravitationally bound system of stars, gas, dust, and dark matter."},
    {text:"Light from a distant galaxy has taken 2 million years to reach Earth.",answer:"The galaxy is observed as it existed about 2 million years ago.",distractors:["The light traveled instantly.","The galaxy must now be exactly unchanged.","Distance can be measured only in kilometers."],explain:"Because light has a finite speed, looking far into space also means looking back in time."},
    {text:"Spectral lines from a galaxy are shifted toward longer, redder wavelengths.",answer:"The redshift is evidence that the galaxy is moving away from us.",distractors:["The galaxy is necessarily getting colder.","The galaxy is moving toward us.","The spectrum contains no motion evidence."],explain:"A systematic shift to longer wavelengths indicates recession and supports evidence for cosmic expansion."}
  ];
  addEvidenceUnit("sci",41,"Astronomy",9,["Stars and Their Properties","Star Life Cycles","Galaxies","Scale of the Universe","Astronomy Evidence Challenge"],astronomySeeds);
  const progressiveSeeds=[
    {text:"Industrial cities grow rapidly while reports document unsafe factories, crowded housing, and political corruption.",answer:"Progressivism arose partly as a response to problems linked to industrialization and urbanization.",distractors:["Progressivism opposed every form of city government.","The reports prove reform was unnecessary.","Industrial growth eliminated social conflict."],explain:"Reformers targeted documented workplace, urban, consumer, and political problems."},
    {text:"A journalist photographs tenement conditions and publishes evidence of overcrowding.",answer:"The work uses investigation to build public support for housing reform.",distractors:["The photographs guarantee immediate reform.","The journalist is neutral simply because cameras were used.","Tenements were mainly rural farms."],explain:"Muckrakers publicized conditions, though their purpose and evidence still require evaluation."},
    {text:"A state adopts initiative, referendum, and recall procedures.",answer:"The reforms aim to increase direct public influence over government decisions and officials.",distractors:["The reforms end citizen participation.","They transfer all power to corporations.","They apply only to federal courts."],explain:"These mechanisms let voters propose laws, vote on measures, or remove officials."},
    {text:"Reformers campaign for child-labor limits, safer food, and women's voting rights.",answer:"Progressive reform included social, consumer, labor, and political goals.",distractors:["All reformers pursued one identical goal.","The campaigns focused only on foreign policy.","Voting rights were unrelated to reform."],explain:"The examples show the movement's broad and sometimes varied reform agenda."},
    {text:"A reform law passes, but enforcement records show uneven inspections and continued violations.",answer:"The law marked change, but implementation evidence limits claims about immediate success.",distractors:["Passing a law proves the problem ended.","Enforcement records are irrelevant.","Continued violations prove the law had no effect anywhere."],explain:"A strong evaluation distinguishes formal policy change from actual enforcement and outcomes."}
  ];
  addEvidenceUnit("hist",37,"Progressive Era",9,["Origins of Progressivism","Reformers and Muckrakers","Political and Economic Reform","Social Reform","Progressive Era Evidence Analysis"],progressiveSeeds);
  const imperialSeeds=[
    {text:"In the 1890s, supporters argue that overseas markets and naval bases will strengthen the United States.",answer:"Economic and strategic goals helped motivate American expansionism.",distractors:["Expansion had only humanitarian motives.","Naval power was unrelated to overseas policy.","Markets discouraged territorial interest."],explain:"Supporters frequently connected expansion to trade, military reach, and international power."},
    {text:"After reports of conflict in Cuba and the explosion of the USS Maine, the United States goes to war with Spain.",answer:"Multiple factors influenced intervention, and claims about the explosion require careful source evaluation.",distractors:["One newspaper headline proves Spain caused the explosion.","Cuban events had no role in the war.","The war began decades before the explosion."],explain:"Public opinion, Cuban conflict, strategic interests, and disputed claims all shaped the path to war."},
    {text:"After the war, the United States gains territories and increases political influence in the Caribbean and Pacific.",answer:"The outcome expanded U.S. power while raising questions about self-government in affected places.",distractors:["Every territory immediately became a state.","U.S. influence overseas ended.","Residents' political rights were never debated."],explain:"Overseas control increased strategic reach but produced major debates over consent and status."},
    {text:"One speech says empire will bring progress; another argues that ruling people without consent violates democratic ideals.",answer:"The debate contrasts claimed benefits of expansion with anti-imperialist arguments about self-determination.",distractors:["Both speakers make the same argument.","Neither speech involves political values.","The disagreement can be settled without evidence."],explain:"The sources frame competing ideas about power, democracy, duty, and consent."},
    {text:"A pro-expansion cartoon depicts distant peoples as children, while a petition from those people demands independence.",answer:"Comparing the sources reveals unequal assumptions and conflicting perspectives about political agency.",distractors:["The cartoon represents the petitioners' own view.","The petition has no relevance because it is biased.","Both sources prove expansion was universally welcomed."],explain:"Source perspective and language reveal who is granted or denied agency in the imperial debate."}
  ];
  addEvidenceUnit("hist",42,"U.S. Expansion Overseas",10,["American Expansionism","Spanish-American War","U.S. Influence Overseas","Arguments For and Against Imperialism","Imperialism Source Analysis"],imperialSeeds);
  const similaritySeeds=[
    {text:"A dilation centered at the origin maps (3, −2) using scale factor 2.",answer:"The image is (6, −4).",distractors:["The image is (5, 0).","The image is (1.5, −1).","The image is (6, 0)."],explain:"Multiply both coordinates by 2: (3 × 2, −2 × 2) = (6, −4)."},
    {text:"A 6 cm side corresponds to a 15 cm side in a similar figure.",answer:"The scale factor from the first figure to the second is 2.5.",distractors:["The scale factor is 9.","The scale factor is 0.4.","The scale factor is 21."],explain:"Divide corresponding image length by original length: 15 ÷ 6 = 2.5."},
    {text:"Two triangles have angle measures 42°, 63°, and 75°, but one triangle has sides three times as long.",answer:"The triangles are similar because corresponding angles match; their scale factor is 3.",distractors:["They are congruent because their angles match.","They are not similar because their side lengths differ.","Their scale factor is 9."],explain:"Equal corresponding angles establish similarity, while the side-length ratio gives scale factor 3."},
    {text:"Triangle ABC has A(0,0), B(4,0), C(0,3). Its image has A′(0,0), B′(10,0), C′(0,7.5).",answer:"The image is a dilation with scale factor 2.5.",distractors:["The image is a translation by 6 units.","The scale factor is 1.5.","The figures are not similar."],explain:"Each nonzero coordinate and corresponding side is multiplied by 2.5."},
    {text:"A 1:50 scale drawing shows a rectangular room as 8 cm by 6 cm.",answer:"The actual room is 4 m by 3 m with area 12 m².",distractors:["The room is 400 m by 300 m.","The actual area is 24 m².","The room is 0.16 m by 0.12 m."],explain:"Multiply lengths by 50: 400 cm by 300 cm, or 4 m by 3 m; area is 12 m²."}
  ];
  addMathUnit(47,"Dilations & Similarity",11,["Understanding Dilations","Scale Factor","Similar Figures","Similarity on the Coordinate Plane","Advanced Similarity Applications"],similaritySeeds);
  const scientificSeeds=[
    {text:"Write 0.000072 in scientific notation.",answer:"7.2 × 10⁻⁵",distractors:["7.2 × 10⁵","72 × 10⁻⁵","0.72 × 10⁻⁵"],explain:"Move the decimal five places right to make 7.2, so the exponent is −5."},
    {text:"A cell is 3.5 × 10⁻⁶ meter wide. What is this in standard notation?",answer:"0.0000035 meter",distractors:["0.000035 meter","3,500,000 meters","0.00000035 meter"],explain:"An exponent of −6 moves the decimal six places left."},
    {text:"Compare 6.2 × 10⁸ and 9.1 × 10⁷.",answer:"6.2 × 10⁸ is greater because its power of ten is larger.",distractors:["9.1 × 10⁷ is greater because 9.1 is greater than 6.2.","The quantities are equal.","They cannot be compared without units."],explain:"The exponent 8 represents a magnitude ten times the exponent 7 before coefficients are compared."},
    {text:"Multiply (3 × 10⁴)(2 × 10⁻³).",answer:"6 × 10¹",distractors:["6 × 10⁷","5 × 10¹","6 × 10⁻¹²"],explain:"Multiply coefficients and add exponents: 3 × 2 = 6 and 4 + (−3) = 1."},
    {text:"A reservoir holds 4.8 × 10⁹ liters and releases 1.2 × 10⁶ liters per day.",answer:"It would take 4 × 10³ days at that constant rate.",distractors:["It would take 4 × 10¹⁵ days.","It would take 4 × 10⁻³ day.","It would take 5.76 × 10¹⁵ days."],explain:"Divide coefficients and subtract exponents: 4.8 ÷ 1.2 = 4 and 10⁹ ÷ 10⁶ = 10³."}
  ];
  addMathUnit(52,"Scientific Number Sense",12,["Powers of Ten","Very Large and Small Quantities","Comparing Scientific Quantities","Operations with Scientific Quantities","Real-World Magnitude Problems"],scientificSeeds);
  const earthSystemsSeeds=[
    {text:"Rain falls from the atmosphere, runs across rock, and enters a river carrying sediment.",answer:"The atmosphere, geosphere, and hydrosphere are interacting.",distractors:["Only the biosphere is involved.","Matter disappears between systems.","The geosphere cannot interact with water."],explain:"Rain is atmospheric water, rock and sediment are geosphere materials, and the river belongs to the hydrosphere."},
    {text:"Carbon dioxide enters a plant, becomes sugar, and later returns to air during respiration.",answer:"Carbon cycles between the atmosphere and biosphere while changing chemical form.",distractors:["Carbon is destroyed by photosynthesis.","The cycle involves only the geosphere.","Respiration permanently stores all carbon."],explain:"Photosynthesis stores atmospheric carbon in living matter; respiration can return it to the atmosphere."},
    {text:"Sunlight warms the ocean surface, water evaporates, and rising vapor powers storm development.",answer:"Solar energy drives transfers through the hydrosphere and atmosphere.",distractors:["The storm creates energy from nothing.","Only matter moves; energy does not.","Earth's core directly powers evaporation."],explain:"Solar radiation supplies energy for evaporation and atmospheric motion."},
    {text:"A volcanic eruption adds ash to air, reduces incoming sunlight, and lowers plant growth for a season.",answer:"A geosphere event affects the atmosphere and then the biosphere.",distractors:["The systems operate independently.","Plants cause the eruption.","Ash increases sunlight reaching the surface."],explain:"Volcanic material enters the atmosphere and changes conditions that affect living organisms."},
    {text:"A model predicts that removing wetland plants increases runoff and sediment entering a lake.",answer:"The model links a biosphere change to hydrosphere flow and geosphere erosion.",distractors:["The model proves wetlands never affect water.","Runoff is unrelated to vegetation.","Only atmospheric pressure can move sediment."],explain:"Plant roots slow water and hold soil; removing them can increase runoff and erosion."}
  ];
  addEvidenceUnit("sci",46,"Earth Systems",10,["Earth's Major Systems","Cycling of Matter","Energy Through Earth Systems","Interactions Among Earth Systems","Earth Systems Modeling"],earthSystemsSeeds);
  const climateSeeds=[
    {text:"It rains heavily today in a city whose 30-year summers are usually dry.",answer:"The rain is weather; the long-term dry-summer pattern is climate.",distractors:["One rainy day changes the city's climate.","Weather and climate mean the same thing.","Climate describes only temperature."],explain:"Weather describes short-term conditions, while climate describes long-term patterns."},
    {text:"Cold, dense air advances beneath warm, moist air along a boundary.",answer:"A cold front is forming and may force rapid uplift, clouds, and storms.",distractors:["A warm front always produces clear skies.","No air mass interaction occurs.","The warm air sinks beneath the cold air."],explain:"Advancing cold air wedges under warmer air, often causing fast uplift and precipitation."},
    {text:"Strong solar heating near the equator causes air to rise, move poleward, cool, and sink.",answer:"Uneven heating helps drive global atmospheric circulation cells.",distractors:["Earth receives equal heating everywhere.","Air circulation is unrelated to density.","Only ocean tides move the atmosphere."],explain:"Temperature and density differences create convection that contributes to global circulation."},
    {text:"A coastal city has cooler summers and warmer winters than an inland city at the same latitude.",answer:"Nearby ocean water moderates temperature because it heats and cools slowly.",distractors:["Latitude has no effect anywhere.","Ocean water changes temperature faster than land.","The inland city must be at the equator."],explain:"Water's high heat capacity reduces seasonal temperature extremes near coasts."},
    {text:"A graph shows average temperature rising over 40 years, though individual years vary above and below the trend.",answer:"The long-term trend can rise even with short-term year-to-year variability.",distractors:["Any cool year disproves the trend.","A trend requires every year to be warmer.","Forty years of data describe one day's weather."],explain:"Climate trends are evaluated across long periods and can include natural short-term variation."}
  ];
  addEvidenceUnit("sci",51,"Weather & Climate",11,["Weather vs. Climate","Air Masses and Fronts","Atmospheric Circulation","Climate Patterns","Climate Data Analysis"],climateSeeds);
  const ww1Seeds=[
    {text:"European powers build alliances, expand armies, compete for empires, and promote nationalism before 1914.",answer:"Multiple long-term causes created tension that made a regional crisis more likely to spread.",distractors:["One event alone explains every cause of the war.","Alliances guaranteed peace.","Militarism reduced military preparation."],explain:"Militarism, alliances, imperial rivalry, and nationalism interacted before the immediate crisis."},
    {text:"The United States initially remains neutral, then faces unrestricted submarine warfare and the Zimmermann Telegram.",answer:"Security threats and German actions contributed to the U.S. decision to enter the war.",distractors:["The United States entered before the war began.","Submarine warfare protected neutral shipping.","The telegram had no diplomatic significance."],explain:"Renewed attacks and the intercepted proposal shifted political support toward intervention."},
    {text:"The government sells Liberty Bonds, regulates production, and promotes conservation campaigns.",answer:"The home front mobilized money, industry, and civilian behavior for the war effort.",distractors:["The war had no effect on civilians.","Bonds were military weapons.","Production declined because government avoided coordination."],explain:"Mobilization extended beyond soldiers to finance, factories, food, and public participation."},
    {text:"The Treaty of Versailles assigns Germany responsibility, demands reparations, and creates a League of Nations.",answer:"The treaty combined punishment and collective-security plans, creating debates about stability and fairness.",distractors:["The treaty restored conditions exactly as before the war.","Every nation immediately joined the League.","Reparations rewarded Germany."],explain:"Its mixed provisions led contemporaries and historians to debate both intended peace and future tensions."},
    {text:"A recruitment poster, a soldier's letter, and casualty records describe the same battle differently.",answer:"The sources should be compared by purpose, perspective, and evidence rather than forcing one simple account.",distractors:["The poster is automatically the most accurate.","Personal letters make records useless.","Different perspectives mean the battle did not occur."],explain:"Corroboration explains why sources differ and what each can reliably show."}
  ];
  addEvidenceUnit("hist",47,"World War I",11,["Causes of World War I","U.S. Entry into the War","Americans on the Home Front","Treaty of Versailles","World War I Historical Analysis"],ww1Seeds);
  const twentiesSeeds=[
    {text:"Factory productivity and consumer credit expand during the 1920s, while farm income remains weak.",answer:"Economic growth was substantial but uneven across sectors and groups.",distractors:["Every American benefited equally.","Consumer credit ended purchasing.","Farm weakness proves industry did not grow."],explain:"Industrial and consumer expansion coexisted with agricultural distress and unequal gains."},
    {text:"Writers, musicians, and artists gather in Harlem and explore Black life, identity, and modern expression.",answer:"The Harlem Renaissance was a major cultural movement that expanded Black artistic influence.",distractors:["The movement focused only on farming policy.","It had no connection to migration or cities.","All participants used one artistic style."],explain:"The movement included varied forms and viewpoints shaped partly by urban Black communities and migration."},
    {text:"National radio programs, movies, advertising, and chain stores reach growing audiences.",answer:"Mass media and consumer networks helped create shared national trends while promoting consumption.",distractors:["Media made regional differences impossible.","Advertising discouraged purchases.","Movies reached only isolated rural households."],explain:"New media and distribution spread products, entertainment, and messages more broadly."},
    {text:"Debates over immigration limits, Prohibition, evolution education, and changing gender roles intensify.",answer:"The decade included cultural conflict over identity, modernity, religion, and social change.",distractors:["The 1920s had complete social agreement.","Every dispute was solely economic.","Prohibition ended political conflict."],explain:"These controversies reveal competing values during rapid cultural and demographic change."},
    {text:"An advertisement celebrates prosperity, but debt records and farm reports show financial strain.",answer:"Using all sources produces a more qualified account than the advertisement alone.",distractors:["The advertisement proves universal prosperity.","Economic records cannot challenge cultural sources.","Conflicting evidence should be discarded."],explain:"Source purpose and broader economic evidence reveal both optimism and underlying vulnerability."}
  ];
  addEvidenceUnit("hist",52,"1920s America",12,["Economic and Cultural Change","Harlem Renaissance","Mass Media and Consumer Culture","Social Conflict in the 1920s","1920s Evidence Analysis"],twentiesSeeds);
  const bivariateSeeds=[
    {text:"A scatter plot of study time and test score rises from left to right.",answer:"The variables have a positive association, though the graph alone does not prove causation.",distractors:["The variables have a negative association.","Every point must lie on one line.","Studying is proven to be the only cause of scores."],explain:"An upward pattern indicates positive association; observational association alone cannot establish cause."},
    {text:"A two-way table shows 48 of 80 athletes and 18 of 60 nonathletes prefer morning classes.",answer:"60% of athletes and 30% of nonathletes prefer morning classes.",distractors:["48% and 18% prefer mornings.","The groups have equal relative frequencies.","Only the total of 66 can be compared."],explain:"Within-group relative frequencies are 48/80 = 60% and 18/60 = 30%."},
    {text:"A line of best fit predicts y = 3x + 12 for x = 8.",answer:"The predicted value is 36.",distractors:["The predicted value is 23.","The predicted value is 96.","The predicted value is 15."],explain:"Substitute 8: y = 3(8) + 12 = 36."},
    {text:"A data point has observed y = 42 and predicted y = 37.",answer:"Its residual is 5.",distractors:["Its residual is −5.","Its residual is 79.","Its residual is 0."],explain:"Residual = observed − predicted = 42 − 37 = 5."},
    {text:"A survey finds an association between owning a library card and higher reading scores.",answer:"The association may reflect other factors and does not by itself show that the card caused higher scores.",distractors:["The card certainly caused every score increase.","Association means the variables are unrelated.","The result applies to every population without checking the sample."],explain:"Reading habits or access may influence both variables, so causal claims require stronger design."}
  ];
  addMathUnit(57,"Bivariate Data",13,["Understanding Two-Variable Data","Two-Way Frequency Tables","Relative Frequency","Associations Between Variables","Drawing Conclusions from Data"],bivariateSeeds);
  const integratedMathSeeds=[
    {text:"A $72 jacket is discounted 25% and then taxed 8% on the sale price.",answer:"The final price is $58.32.",distractors:["The final price is $49.68.","The final price is $59.76.","The final price is $54.08."],explain:"The sale price is 72(0.75) = 54; tax gives 54(1.08) = 58.32."},
    {text:"A table follows y = 2x + 3. Find y when x = 7 and identify the graph's y-intercept.",answer:"y = 17 and the y-intercept is 3.",distractors:["y = 14 and the intercept is 2.","y = 10 and the intercept is 7.","y = 24 and the intercept is 3."],explain:"Substitute x = 7 to get 17; the constant term 3 is the y-intercept."},
    {text:"A rectangular garden has perimeter 50 m, length x + 5, and width x.",answer:"x = 10, so the dimensions are 15 m by 10 m.",distractors:["x = 20, so dimensions are 25 by 20.","x = 12.5, so both sides are 12.5.","x = 5, so dimensions are 10 by 5."],explain:"2(x + 5) + 2x = 50 gives 4x + 10 = 50, so x = 10."},
    {text:"A student solves 4(x − 3) = 20 as 4x − 3 = 20.",answer:"The error is failing to distribute 4 to −3; the correct solution is x = 8.",distractors:["The work is correct and x = 5.75.","The error is dividing both sides by 4.","The correct solution is x = 17."],explain:"Distribution gives 4x − 12 = 20, then 4x = 32 and x = 8."},
    {text:"Plan A costs $18 plus $4 per visit. Plan B costs $8 per visit.",answer:"The plans cost the same at 4.5 visits, so for whole visits Plan A first becomes cheaper at 5 visits.",distractors:["They are equal at 2 visits.","Plan B is always cheaper.","Plan A is cheaper at 1 visit."],explain:"Set 18 + 4v = 8v, giving v = 4.5; compare whole-number visits around that point."}
  ];
  addMathUnit(62,"Integrated Problem Solving",14,["Choosing Mathematical Strategies","Multi-Representation Problems","Multi-Step Real-World Problems","Detecting Mathematical Errors","Grade 8 Mathematical Reasoning Challenge"],integratedMathSeeds);
  const ecosystemSeeds=[
    {text:"Grass stores 20,000 kJ of energy and rabbits that eat it store about 2,000 kJ.",answer:"Only a fraction of energy transfers to the next trophic level; much is used or released as heat.",distractors:["Energy is created by rabbits.","All 20,000 kJ must transfer.","Grass receives energy from rabbits."],explain:"Energy transfer between trophic levels is inefficient because organisms use energy for life processes."},
    {text:"In a food web, hawks eat snakes and mice; snakes also eat mice.",answer:"Removing hawks could increase snakes and mice, with further indirect effects across the web.",distractors:["Removing hawks can affect only hawks.","Every prey population must decrease immediately.","Food webs contain no indirect effects."],explain:"Hawks regulate multiple prey species, so their removal can trigger interacting population changes."},
    {text:"A tick feeds on a deer and benefits while the deer is harmed.",answer:"The relationship is parasitism.",distractors:["The relationship is mutualism.","The relationship is commensalism.","The relationship is competition only."],explain:"In parasitism, one organism benefits while the host is harmed."},
    {text:"Fertilizer runoff causes rapid algae growth, followed by falling oxygen and fish deaths.",answer:"Nutrient pollution can cause eutrophication and oxygen depletion.",distractors:["Fertilizer always raises oxygen permanently.","The fish deaths are unrelated to decomposition.","Algae remove all nutrients immediately."],explain:"Algal blooms add decaying material; decomposers consume dissolved oxygen."},
    {text:"A model predicts fewer pollinators, reduced seed production, and then fewer fruit-eating birds.",answer:"The model shows how a disruption can propagate through dependent ecosystem relationships.",distractors:["Only pollinators can be affected.","Bird populations never depend on plants.","The model proves all ecosystems respond identically."],explain:"Changes in pollination affect plant reproduction and organisms that depend on plant products."}
  ];
  addEvidenceUnit("sci",56,"Ecosystems",12,["Energy in Ecosystems","Food Webs and Trophic Levels","Population Relationships","Ecosystem Disruptions","Advanced Ecosystem Modeling"],ecosystemSeeds);
  const energySeeds=[
    {text:"Solar panels generate electricity without fuel combustion but produce power only under suitable light.",answer:"Solar energy is renewable and low-emission in operation, but storage and intermittency matter.",distractors:["Solar energy is nonrenewable.","Panels generate equal power every hour.","Manufacturing and land use never matter."],explain:"A sound evaluation includes renewability and operating emissions along with timing, storage, and material tradeoffs."},
    {text:"A power plant burns coal that formed over millions of years.",answer:"Coal is nonrenewable and combustion releases carbon dioxide and other pollutants.",distractors:["Coal renews within one season.","Combustion removes carbon dioxide.","Mining has no environmental effects."],explain:"Coal forms far slower than it is consumed, and burning it releases stored carbon."},
    {text:"A proposed dam supplies reliable low-carbon electricity but floods habitat and blocks fish migration.",answer:"The decision requires weighing energy benefits against ecosystem and community impacts.",distractors:["Low carbon means no tradeoffs exist.","Habitat effects are unrelated to energy planning.","The dam produces fossil fuel."],explain:"Energy choices can provide benefits while producing environmental and social costs."},
    {text:"Two school energy plans have equal cost; one saves more electricity, while the other reduces peak demand.",answer:"The preferred plan depends on clearly stated goals and evidence about both total use and timing.",distractors:["Either plan is automatically best.","Peak demand never affects systems.","Equal cost means outcomes are identical."],explain:"Evaluation criteria must match the problem, such as total consumption, reliability, or peak load."},
    {text:"A remote clinic needs dependable power and has strong sunlight but occasional week-long storms.",answer:"A solar-plus-storage design with backup capacity best addresses both resources and reliability.",distractors:["Solar panels without storage guarantee continuous power.","A design should ignore weather records.","The clinic should use the least reliable source only."],explain:"A resilient system combines the local renewable resource with storage and contingency planning."}
  ];
  addEvidenceUnit("sci",61,"Energy Resources",13,["Renewable Energy","Nonrenewable Energy","Environmental Tradeoffs","Evaluating Energy Solutions","Energy Systems Design Challenge"],energySeeds);
  const depressionSeeds=[
    {text:"Stock prices collapse while bank failures, falling demand, and unemployment reinforce one another.",answer:"The Great Depression resulted from interacting financial and economic weaknesses rather than one cause alone.",distractors:["The stock crash was the only relevant cause.","Bank failures increased available credit.","Falling demand immediately raised employment."],explain:"A strong explanation connects multiple causes and feedback effects across the economy."},
    {text:"A family loses work, moves into temporary housing, and relies on local relief while searching for jobs.",answer:"The source illustrates unemployment, displacement, and dependence on limited aid.",distractors:["Every family experienced the Depression identically.","Unemployment improved housing security.","Relief eliminated hardship immediately."],explain:"Personal accounts show lived effects but should be combined with broader evidence."},
    {text:"One New Deal agency employs people on public projects; another insures bank deposits.",answer:"New Deal programs pursued both immediate relief and longer-term financial reform.",distractors:["Every program had the same purpose.","Deposit insurance was a construction job.","Public works ended all bank regulation."],explain:"Programs addressed different goals, including jobs, recovery, and reform."},
    {text:"Critics say the New Deal expanded federal power too far; other critics say it did too little for vulnerable groups.",answer:"Debate came from different views about government responsibility, effectiveness, and equality.",distractors:["All critics agreed on one alternative.","The debate concerned foreign policy only.","Federal power did not change."],explain:"Opposition came from multiple ideological positions and assessments of outcomes."},
    {text:"Unemployment declines after 1933 but remains high until wartime production expands.",answer:"The evidence suggests partial recovery under the New Deal while complicating claims that it ended the Depression alone.",distractors:["No recovery occurred before wartime.","Any decline proves complete recovery.","Employment data cannot evaluate policy."],explain:"The trend supports a qualified conclusion that separates improvement from full recovery."}
  ];
  addEvidenceUnit("hist",57,"Great Depression & New Deal",13,["Causes of the Great Depression","Life During the Depression","New Deal Programs","Debating the New Deal","Depression-Era Source Analysis"],depressionSeeds);
  const ww2Seeds=[
    {text:"Aggressive expansion by Axis powers, failed appeasement, and the attack on Pearl Harbor shape U.S. entry into World War II.",answer:"Long-term international aggression and the immediate Pearl Harbor attack both matter in explaining U.S. entry.",distractors:["Pearl Harbor began before Axis expansion.","Appeasement stopped all aggression.","The United States entered for one economic reason only."],explain:"Historical causation distinguishes background conditions from the direct trigger for entry."},
    {text:"The battles of Midway and Stalingrad halt major Axis advances in different theaters.",answer:"Both are considered turning points because they shifted strategic momentum against Axis forces.",distractors:["Both battles occurred in the same ocean.","They immediately ended the entire war.","Neither changed military strategy."],explain:"Turning points alter the direction or balance of a conflict without necessarily ending it at once."},
    {text:"Factories convert to war production while rationing, bond drives, migration, and women's industrial work expand.",answer:"The home front mobilized production and transformed work and daily life.",distractors:["Civilian life continued without change.","Rationing increased unlimited consumption.","War production reduced industrial employment."],explain:"Mobilization redirected resources and changed labor, migration, and consumption."},
    {text:"The government incarcerates Japanese Americans without individual evidence of disloyalty.",answer:"The policy violated civil liberties and was driven by wartime fear, racism, and broad government power.",distractors:["Every incarcerated person received an individual trial first.","Citizenship rights were unaffected.","The policy targeted military combatants only."],explain:"The incarceration is evaluated as a grave civil-liberties violation based on ancestry rather than individual proof."},
    {text:"A wartime poster, a civilian diary, military records, and casualty data describe victory from different viewpoints.",answer:"A complete analysis should corroborate the sources and explain how purpose and experience shape each account.",distractors:["The poster makes every other source unnecessary.","Different viewpoints mean no facts can be established.","Casualty data explain personal feelings by themselves."],explain:"Multiple source types reveal distinct dimensions and allow claims to be checked and qualified."}
  ];
  addEvidenceUnit("hist",62,"World War II",14,["Causes and U.S. Entry","Major Turning Points","The American Home Front","Civil Liberties and Wartime Decisions","World War II Evidence Challenge"],ww2Seeds);
  function addCompactUnit(subject,start,topic,topicNumber,names,concepts,isMath=false){
    const seeds=concepts.map((item,index)=>({text:item[0],answer:item[1],distractors:[1,2,3].map(offset=>concepts[(index+offset)%concepts.length][1]),explain:item[2]}));
    if(isMath) addMathUnit(start,topic,topicNumber,names,seeds); else addEvidenceUnit(subject,start,topic,topicNumber,names,seeds);
  }
  addCompactUnit("math",67,"Systems & Constraints",15,["Systems of Equations","Solving by Graphing","Solving by Substitution","Constraints and Feasible Solutions","Systems Modeling Challenge"],[
    ["The lines y = 2x + 1 and y = −x + 7 intersect.","Their solution is (2, 5).","Set the expressions equal: 2x + 1 = −x + 7, so x = 2 and y = 5."],
    ["Two graphed lines cross at (4, −1).","The ordered pair (4, −1) satisfies both equations.","A graphing solution is the intersection shared by both relations."],
    ["Solve y = x + 3 and 2x + y = 12.","Substitution gives x = 3 and y = 6.","Replace y with x + 3: 3x + 3 = 12, then solve."],
    ["A club can spend at most $240 on $12 shirts and $8 hats.","The constraint is 12s + 8h ≤ 240 with s,h ≥ 0.","At most creates an inequality, and item counts cannot be negative."],
    ["Plan A costs 20 + 5m and Plan B costs 8m.","The plans are equal at m = 20/3, and Plan A is cheaper for larger whole-number m.","Solve 20 + 5m = 8m, then interpret the boundary." ]
  ],true);
  addCompactUnit("math",72,"Functions & Modeling",16,["Functions and Inputs","Comparing Representations","Rate of Change","Nonlinear Patterns","Function Modeling Challenge"],[
    ["Each input in a table is paired with exactly one output.","The relation is a function.","A function assigns one output to every allowed input."],
    ["A table increases by 4 per step and a graph rises by 6 per step.","The graphed relation has the greater rate of change.","Compare the change in output for equal input intervals."],
    ["A line passes through (2,5) and (8,17).","Its rate of change is 2.","Slope is (17−5)/(8−2) = 12/6 = 2."],
    ["The outputs 1, 4, 9, 16 correspond to inputs 1, 2, 3, 4.","The pattern is nonlinear because first differences are not constant.","The outputs follow a square pattern rather than a constant rate."],
    ["A tank begins with 90 L and loses 7 L each minute.","V(t) = 90 − 7t models the volume until it reaches zero.","Initial value is 90 and the constant rate is −7." ]
  ],true);
  addCompactUnit("math",77,"Geometry Applications",17,["Pythagorean Theorem","Distance on the Coordinate Plane","Transformations","Surface Area","Geometry Design Challenge"],[
    ["A right triangle has legs 9 and 12.","The hypotenuse is 15.","Use c² = 9² + 12² = 225, so c = 15."],
    ["Find the distance from (1,2) to (7,10).","The distance is 10 units.","The horizontal and vertical changes are 6 and 8, forming a 6-8-10 triangle."],
    ["A figure rotates 90° counterclockwise about the origin.","The rule is (x,y) → (−y,x).","A quarter-turn counterclockwise maps coordinates with this rule."],
    ["A rectangular prism measures 3 by 4 by 8.","Its surface area is 136 square units.","Compute 2(3·4 + 3·8 + 4·8) = 136."],
    ["A 10-by-10 square must contain the largest possible circular garden.","The circle has radius 5 and area 25π.","The largest diameter equals the square's side length." ]
  ],true);
  addCompactUnit("math",82,"Financial Mathematics",18,["Unit Rates and Prices","Discounts and Markups","Simple Interest","Budget Constraints","Financial Decision Challenge"],[
    ["A 12-ounce package costs $4.20.","The unit price is $0.35 per ounce.","Divide cost by ounces: 4.20 ÷ 12 = 0.35."],
    ["A $60 item is discounted 20%.","The sale price is $48.","The discount is $12, so subtract from $60."],
    ["$500 earns 4% simple interest for 3 years.","The interest is $60.","Use I = Prt = 500(0.04)(3)."],
    ["A student has $90 for $15 tickets and $6 meals.","15t + 6m ≤ 90 represents the budget.","Total spending cannot exceed the available amount."],
    ["Option A costs $25 plus $3 monthly; Option B costs $7 monthly.","They break even after 6.25 months, so compare whole months around that point.","Solve 25 + 3m = 7m and interpret the result." ]
  ],true);
  addCompactUnit("sci",66,"Genetics & Heredity",14,["Genes and Traits","Punnett Squares","Variation and Mutation","Inheritance Patterns","Genetics Evidence Challenge"],[
    ["A DNA segment provides instructions for a protein linked to a trait.","A gene can influence a trait through the protein it helps produce.","Genes contain information used in protein production."],
    ["Two heterozygous parents are crossed for a simple dominant trait.","The model predicts a 1:2:1 genotype ratio.","A Punnett square gives AA, Aa, Aa, and aa."],
    ["Siblings differ even though they have the same parents.","Meiosis and fertilization create different allele combinations.","Sexual reproduction reshuffles inherited variation."],
    ["A trait appears only when two recessive alleles are present.","Heterozygous carriers can pass the allele without showing the trait.","A dominant allele masks the recessive phenotype in carriers."],
    ["Pedigree data conflict with a proposed dominant inheritance model.","The model should be revised using the family evidence.","Scientific models must fit observed inheritance patterns." ]
  ]);
  addCompactUnit("sci",71,"Evolution",15,["Natural Selection","Adaptation","Fossil Evidence","Common Ancestry","Evolution Evidence Challenge"],[
    ["Antibiotics kill susceptible bacteria while resistant bacteria reproduce.","Natural selection increases the frequency of resistance.","Existing heritable variation affects survival and reproduction."],
    ["A desert plant has waxy leaves that reduce water loss.","The inherited feature is an adaptation in that environment.","It improves survival under dry conditions."],
    ["Rock layers contain changing forms of related organisms over time.","The fossils provide evidence of evolutionary change.","Ordered layers preserve a historical sequence."],
    ["Different species share similar bone arrangements in their limbs.","Homologous structures support common ancestry.","A shared structural pattern can persist despite different functions."],
    ["DNA, fossils, and anatomy support the same branching relationship.","Independent evidence strengthens the evolutionary explanation.","Corroborating evidence makes the inference more reliable." ]
  ]);
  addCompactUnit("sci",76,"Chemistry of Matter",16,["Atoms and Elements","Chemical Bonds","Chemical Reactions","Conservation of Mass","Chemistry Investigation Challenge"],[
    ["Every atom of carbon contains six protons.","Proton number identifies the element.","All atoms of one element share the same atomic number."],
    ["Sodium transfers an electron to chlorine.","Oppositely charged ions form an ionic bond.","Electron transfer produces attraction between ions."],
    ["Gas forms and temperature changes when two substances mix.","The observations may indicate a chemical reaction.","New substances and energy changes are common reaction evidence."],
    ["A reaction occurs in a sealed container.","Total mass remains constant as atoms rearrange.","Chemical reactions conserve atoms and therefore mass in a closed system."],
    ["A student changes both temperature and concentration in one trial.","The test cannot isolate which variable changed the reaction rate.","A controlled investigation changes one independent variable at a time." ]
  ]);
  addCompactUnit("sci",81,"Engineering Design",17,["Defining Problems","Designing Solutions","Testing Prototypes","Optimizing Designs","Engineering Design Challenge"],[
    ["A team must build a bridge that holds 5 kg using under $20 of material.","Strength and cost are measurable criteria and constraints.","A clear problem defines desired performance and limits."],
    ["Three sketches meet the requirements in different ways.","A decision matrix can compare solutions against shared criteria.","Consistent criteria make tradeoffs visible."],
    ["A prototype bends at the same joint in repeated tests.","The failure pattern provides evidence for redesigning that joint.","Repeated test data identify a specific weakness."],
    ["Adding support increases strength but also weight and cost.","Optimization requires balancing competing criteria.","The best design fits priorities rather than maximizing one feature blindly."],
    ["The final design is tested only once under ideal conditions.","More trials under varied conditions are needed to judge reliability.","Robust evaluation checks repeatability and realistic use." ]
  ]);
  addCompactUnit("hist",67,"Civil Rights Era",15,["Origins of the Movement","Landmark Court Decisions","Nonviolent Protest","Federal Civil Rights Laws","Civil Rights Evidence Challenge"],[
    ["Black veterans return from war to segregation and unequal voting access.","The contrast helped intensify demands for full citizenship.","Wartime service sharpened challenges to discrimination at home."],
    ["The Supreme Court rules segregated public schools inherently unequal.","Brown v. Board challenged legal school segregation.","The decision rejected separate schooling under equal protection."],
    ["Students sit at segregated lunch counters and remain despite arrests.","Nonviolent direct action exposed injustice and pressured businesses and government.","The tactic combined moral witness with economic and political pressure."],
    ["Congress bans discrimination in public accommodations and employment.","The Civil Rights Act of 1964 expanded federal protection against discrimination.","The law addressed segregation and employment practices."],
    ["A speech, arrest record, photograph, and voter data describe one campaign.","Corroborating the sources reveals strategy, response, and measurable effects.","Different source types answer different historical questions." ]
  ]);
  addCompactUnit("hist",72,"Cold War",16,["Origins of the Cold War","Containment","Korean and Vietnam Wars","Nuclear Tensions","Cold War Source Analysis"],[
    ["Former wartime allies disagree over Eastern Europe and political systems.","Competing security goals and ideologies contributed to Cold War rivalry.","Postwar distrust grew from power and ideological conflict."],
    ["The United States provides aid to countries resisting communist influence.","The policy reflects containment.","Containment sought to limit further expansion of communism."],
    ["The United States fights in Korea and Vietnam without directly invading the Soviet Union.","The conflicts were proxy wars shaped by broader Cold War rivalry.","Superpower competition influenced regional wars."],
    ["During the Cuban Missile Crisis, leaders weigh invasion against blockade and negotiation.","Nuclear risk made escalation control central to decision-making.","Both sides faced catastrophic consequences from miscalculation."],
    ["U.S. and Soviet posters portray the same event in opposite ways.","The sources reveal propaganda goals and should be checked against independent evidence.","Purpose and intended audience shape political messaging." ]
  ]);
  addCompactUnit("hist",77,"Modern America",17,["Postwar Prosperity","Social Movements","Technology and Media","Globalization","Modern America Evidence Challenge"],[
    ["Homeownership and consumer spending rise after World War II, but access remains unequal.","Postwar prosperity expanded while discrimination limited benefits for many groups.","A qualified account includes growth and unequal opportunity."],
    ["Activists organize around women's rights, disability rights, Latino rights, and environmental issues.","Modern social movements broadened debates over equality and public policy.","Organized groups pursued distinct but sometimes connected reforms."],
    ["Television and later digital networks change how people receive news.","New media increased speed and reach while creating new questions about accuracy and influence.","Communication technology changes access and information systems."],
    ["Production and trade connect firms and workers across many countries.","Globalization creates economic opportunities and disruptions across regions.","Integrated markets distribute benefits and costs unevenly."],
    ["A national average rises while regional data move in different directions.","The national trend is real but does not describe every community.","Disaggregated evidence prevents overgeneralization." ]
  ]);
  addCompactUnit("hist",82,"Civics & Public Policy",18,["Constitutional Principles","Branches and Checks","Rights and Responsibilities","Evaluating Public Policy","Civic Reasoning Challenge"],[
    ["A court blocks a law that violates the Constitution.","Judicial review limits government through constitutional checks.","Courts can evaluate laws against higher constitutional rules."],
    ["The president vetoes a bill and Congress considers an override.","The sequence demonstrates checks and balances between branches.","Each branch has powers that can limit another."],
    ["Citizens vote, serve on juries, petition officials, and follow laws.","Citizenship includes protected rights and civic responsibilities.","Participation extends beyond elections."],
    ["A policy lowers one cost but creates a new burden for another group.","Evaluation should compare evidence, tradeoffs, distribution, and alternatives.","Public policy analysis asks who benefits, who bears costs, and whether goals are met."],
    ["Two credible studies reach different conclusions using different samples.","A careful citizen should compare methods and limits before deciding.","Evidence quality depends on design, relevance, and transparent reasoning." ]
  ]);
  addCompactUnit("eng",46,"Informational Text",9,["Main Ideas Across Sections","Cause, Effect, and Relationships","Comparing Text Structures","Evaluating Explanations and Evidence","Complex Informational Text Analysis"],[
    ["Section 1 explains how cities create heat islands; Section 2 describes trees and reflective roofs as responses.","The text develops a main idea about both the causes of urban heat and ways to reduce it.","A main idea across sections must account for the problem and the responses."],
    ["After a wetland was drained, floodwater reached nearby streets more often.","The evidence suggests wetland loss contributed to increased flooding, though other factors should also be checked.","The sequence supports a cautious causal link without claiming it is the only cause."],
    ["One article organizes renewable energy by type; another traces one community's energy change over time.","The first uses classification, while the second uses chronological structure.","Text structure depends on how ideas are arranged, not merely on topic."],
    ["A report claims a tutoring program works but gives results from only six volunteers.","The explanation is limited by a small, self-selected sample and needs broader evidence.","Sample size and selection affect whether a conclusion can be generalized."],
    ["A text combines a graph, expert quotation, case study, and counterargument about water use.","A strong analysis should explain how the different evidence types support and qualify the central claim.","Complex informational texts build meaning through relationships among claims, evidence, and qualifications." ]
  ]);
  addCompactUnit("eng",51,"Narrative Writing",10,["Narrative Elements","Building Characters and Settings","Dialogue and Description","Pacing and Narrative Structure","Advanced Narrative Revision"],[
    ["A draft has a clear character and setting but no central problem.","Adding a meaningful conflict would give the events direction and stakes.","Narratives develop through goals, obstacles, choices, and consequences."],
    ["Instead of saying Ana was nervous, a writer shows her rereading the address and gripping the envelope.","The concrete actions reveal character emotion indirectly.","Specific behavior lets readers infer an internal state."],
    ["A character says, 'I'm fine,' while pushing an untouched plate away.","The dialogue and action create subtext by showing that the words are incomplete or untrue.","Effective dialogue gains meaning from surrounding description and behavior."],
    ["A chase scene pauses for two pages of unrelated childhood history.","Moving or shortening the background would preserve urgency and improve pacing.","Narrative placement and detail length control how quickly a scene feels."],
    ["The ending solves the conflict through a new character who appears in the final sentence.","Revision should plant earlier evidence or let the protagonist's established choices drive the resolution.","A satisfying resolution grows from prior characterization, conflict, and causally connected events." ]
  ]);
  function addAlgebraUnit(start,topic,topicNumber,names,concepts){
    const seeds=concepts.map((item,index)=>({text:item[0],answer:item[1],distractors:[1,2,3].map(offset=>concepts[(index+offset)%concepts.length][1]),explain:item[2]}));
    names.forEach((name,i)=>{const questions=[],stems=["Find the correct result.","Choose the valid method.","Which explanation shows correct algebraic reasoning?","Which conclusion avoids the most likely error?","Which solution best justifies the model?"];stems.forEach((stem,tier)=>seeds.forEach((seed,index)=>{const all=[seed.answer,...seed.distractors],turn=(tier+index)%4;questions.push({type:"mc",difficulty:dramaLevels[tier],q:`${seed.text} ${stem}`,choices:all.slice(turn).concat(all.slice(0,turn)),answer:seed.answer,explain:seed.explain,audio:`${name}, question ${tier*5+index+1}.`});}));data[`g8:alg1:L${start+i}`]={name,topic,topicNumber,lessonInTopic:i+1,difficulty:dramaLevels[i],contentVersion:"20260914.1",questions};});
    topics["g8:alg1"]=(topics["g8:alg1"]||[]).filter(group=>group.name!==topic).concat({topicNumber,name:topic,lessons:names.map((name,i)=>({key:`g8:alg1:L${start+i}`,name,difficulty:dramaLevels[i]}))});
  }
  addAlgebraUnit(21,"Sequences",5,["Arithmetic Sequences","Common Difference","Explicit Sequence Rules","Recursive Sequence Rules","Advanced Sequence Modeling"],[
    ["The sequence is 7, 12, 17, 22, ...","It is arithmetic with common difference 5.","Consecutive terms increase by the same amount."],
    ["Find the common difference of 31, 24, 17, 10, ...","The common difference is −7.","Subtract consecutive terms: 24 − 31 = −7."],
    ["An arithmetic sequence has first term 4 and common difference 6.","An explicit rule is aₙ = 4 + 6(n − 1).","An arithmetic explicit rule is first term plus (n−1) common differences."],
    ["A sequence begins at 18 and decreases by 3 each term.","A recursive rule is a₁ = 18 and aₙ = aₙ₋₁ − 3.","A recursive rule states the starting term and how to obtain each next term."],
    ["A theater has 14 seats in row 1 and 4 more seats in each later row.","Row n has 14 + 4(n − 1) seats, so row 20 has 90.","Model the constant increase with an arithmetic sequence and evaluate n = 20." ]
  ]);
  addAlgebraUnit(26,"Radicals",6,["Understanding Radicals","Simplifying Radicals","Operations with Radicals","Radical Expressions","Advanced Radical Problems"],[
    ["Evaluate √144.","The principal square root is 12.","Twelve is nonnegative and 12² = 144."],
    ["Simplify √72.","√72 = 6√2.","Factor 72 as 36·2 and take √36 outside the radical."],
    ["Simplify 3√5 + 7√5 − 2√5.","The result is 8√5.","Like radicals combine by adding their coefficients: 3 + 7 − 2 = 8."],
    ["Multiply √6 · √15.","The product is 3√10.","Combine to √90, then factor out √9."],
    ["A square has area 98 square units.","Its exact side length is 7√2 units.","Side length is √98 = √(49·2) = 7√2." ]
  ]);
  addCompactUnit("eng",56,"Language & Style",11,["Active and Precise Language","Sentence Variety","Parallel Structure","Formal vs. Informal Style","Advanced Style Transformation"],[
    ["Revise: 'The decision was made by the committee.'","The committee made the decision.","Active voice names the actor and makes the sentence more direct."],
    ["A paragraph begins every sentence with 'The team.'","Varying sentence openings and lengths can improve rhythm and emphasis.","Purposeful variety helps ideas flow without changing meaning."],
    ["Revise: 'The job requires planning, accuracy, and to communicate clearly.'","The job requires planning, accuracy, and clear communication.","Items in a series should use matching grammatical forms."],
    ["A student is writing a research report for a school board.","Precise, formal language and complete evidence-based sentences fit the audience.","Style should match purpose, audience, and context."],
    ["A revision adds complex words but makes the claim harder to understand.","The writer should favor precise, clear wording over unnecessary complexity.","Effective style strengthens meaning rather than displaying vocabulary." ]
  ]);
  addCompactUnit("eng",61,"Comparative Reading",12,["Comparing Two Texts","Comparing Characters and Ideas","Conflicting Perspectives","Comparing Authors' Methods","Multi-Text Comparative Analysis"],[
    ["Two articles address city parks; one emphasizes health data and the other neighborhood interviews.","Both support parks but build their cases with different evidence.","Comparison should identify shared claims and distinct support."],
    ["Two protagonists face public failure; one asks for help while the other hides the mistake.","Their contrasting choices reveal different attitudes toward vulnerability.","Comparable conflicts make character differences visible."],
    ["A factory owner calls a strike unnecessary while workers describe unsafe conditions.","The perspectives conflict because each source has different interests and experiences.","Source position shapes what is emphasized or omitted."],
    ["One author opens with a personal story; another begins with statistics.","The first builds emotional connection while the second establishes a broad factual frame.","Authors choose structures and evidence to shape reader response."],
    ["Three texts agree that flooding increased but disagree about its main cause.","A synthesis should state the agreement, compare causal evidence, and explain remaining uncertainty.","Multi-text analysis integrates relationships instead of summarizing sources separately." ]
  ]);
  addAlgebraUnit(31,"Absolute Value",7,["Absolute Value Foundations","Absolute Value Equations","Absolute Value Inequalities","Graphing Absolute Value Functions","Absolute Value Modeling"],[
    ["Evaluate |−13|.","The value is 13.","Absolute value is distance from zero, so it is nonnegative."],
    ["Solve |x − 4| = 7.","The solutions are x = 11 and x = −3.","The expression can equal 7 or −7."],
    ["Solve |2x| < 10.","The solution is −5 < x < 5.","Values within 10 of zero satisfy the inequality; divide by 2."],
    ["Describe y = |x| − 3.","It is a V-shaped graph with vertex (0, −3).","Subtracting 3 shifts the parent graph down three units."],
    ["A measurement must be within 0.4 cm of 12 cm.","The constraint is |m − 12| ≤ 0.4.","Absolute value represents distance from the target value." ]
  ]);
  addAlgebraUnit(36,"Exponential Functions",8,["Exponential Growth","Exponential Decay","Writing Exponential Functions","Comparing Linear and Exponential Models","Advanced Exponential Modeling"],[
    ["A culture begins with 80 cells and doubles each hour.","The model is N(t) = 80(2)^t.","Repeated multiplication by 2 creates exponential growth."],
    ["A device worth $900 retains 75% of its value each year.","The model is V(t) = 900(0.75)^t.","A 25% decrease leaves a decay factor of 0.75."],
    ["A quantity starts at 12 and triples every 4 days.","The model is Q(t) = 12·3^(t/4).","The exponent counts the number of four-day growth periods."],
    ["One account gains $50 yearly; another grows by 8% yearly.","The first is linear and the second exponential.","Constant addition is linear; constant percent change is exponential."],
    ["Data grow by ratios near 1.5 but include small measurement variation.","An exponential model may be reasonable, but residuals should be checked.","Real data need not match perfectly; model fit requires evidence." ]
  ]);
  addCompactUnit("math",87,"Discrete Math & Networks",19,["Counting Principles","Permutations and Combinations","Network Paths","Scheduling Constraints","Discrete Modeling Challenge"],[
    ["A meal has 3 entrees and 4 sides.","There are 12 entree-side combinations.","Use the multiplication principle: 3 × 4."],
    ["Choose 2 representatives from 6 students where order does not matter.","There are 15 possible pairs.","Use combinations: 6·5/2 = 15."],
    ["A network has two routes from A to B and three from B to C.","There are 6 A-to-C routes through B.","Each first route can pair with each second route."],
    ["Three tasks share one machine and cannot overlap.","A valid schedule must assign nonoverlapping time intervals.","The shared resource creates a scheduling constraint."],
    ["A delivery route visits every required stop but repeats many roads.","Compare valid routes by total distance, not only stop coverage.","Optimization evaluates feasible solutions using a stated objective." ]
  ],true);
  addCompactUnit("math",92,"Mathematical Modeling & Proof",20,["Patterns and Conjectures","Counterexamples","Logical Arguments","Model Assumptions","Modeling and Proof Challenge"],[
    ["The sums of the first several odd numbers are 1, 4, 9, and 16.","A reasonable conjecture is that the first n odd numbers sum to n².","The observed pattern connects each partial sum to a square."],
    ["A claim says every prime number is odd.","The number 2 is a counterexample.","One valid counterexample disproves a universal statement."],
    ["If two angles are vertical, then they are congruent; these angles are vertical.","The angles are congruent by applying the stated conditional.","The conclusion follows from the premise and confirmed condition."],
    ["A population model assumes a constant growth rate.","Predictions weaken if resources cause the rate to change.","Model conclusions depend on whether assumptions remain reasonable."],
    ["Two models fit past data equally well but diverge later.","Use context, assumptions, and new validation data to choose between them.","Fit alone may not determine which model generalizes." ]
  ],true);
  addCompactUnit("sci",86,"Human Body Systems",18,["Cells and Tissues","Digestive and Circulatory Systems","Respiratory Exchange","Nervous System","Body Systems Investigation"],[
    ["Muscle cells with similar functions form a layer of the stomach.","The cells form tissue that contributes to an organ.","Biological organization builds from cells to tissues to organs."],
    ["Digested glucose enters blood vessels in the small intestine.","Digestive and circulatory systems interact to distribute nutrients.","Absorption moves nutrients into blood for transport."],
    ["Oxygen moves from lung air sacs into nearby capillaries.","Diffusion moves oxygen down its concentration gradient.","Thin surfaces and blood flow support gas exchange."],
    ["A hand touches a hot surface and withdraws before conscious awareness.","A reflex pathway produces a rapid protective response.","Sensory input can trigger spinal processing before full brain interpretation."],
    ["Heart rate and breathing rate rise together during exercise.","Multiple systems coordinate to deliver oxygen and remove carbon dioxide.","Body-system responses work together to meet cellular demand." ]
  ]);
  addCompactUnit("sci",91,"Environmental Science",19,["Biodiversity","Water Quality","Air Pollution","Human Population Impacts","Environmental Solutions Challenge"],[
    ["A habitat contains many species with varied ecological roles.","Greater biodiversity can increase resilience to some disturbances.","Functional variety can prevent one loss from eliminating every pathway."],
    ["Nitrate levels rise downstream from intensive fertilizer use.","Runoff is a plausible source that should be tested with spatial and timing data.","A pattern supports investigation without proving a cause alone."],
    ["Fine-particle levels increase near heavy traffic and asthma visits also rise.","The association warrants further study and pollution reduction while accounting for confounders.","Health and exposure evidence must be evaluated carefully."],
    ["A growing city uses more land, water, and energy.","Environmental impact depends on population, consumption, and technology choices.","Population size alone does not capture all resource pressure."],
    ["A watershed plan restores wetlands, reduces fertilizer loss, and monitors water quality.","The combined plan addresses sources, natural filtration, and measurable outcomes.","Strong solutions connect interventions to evidence and follow-up data." ]
  ]);
  addCompactUnit("hist",87,"Economics & Society",19,["Supply and Demand","Labor and Wages","Taxes and Public Services","Economic Inequality","Economic Evidence Challenge"],[
    ["Demand rises while supply stays constant.","Price pressure generally rises as buyers compete for limited supply.","The supply-demand model predicts a higher equilibrium price."],
    ["Workers organize to negotiate pay and safety conditions.","Collective bargaining can change workers' negotiating power.","Acting together alters the labor relationship."],
    ["A city collects taxes to fund roads, schools, and emergency services.","Taxes finance shared public goods and services.","Public revenue supports services difficult to provide through individual purchase alone."],
    ["Average income rises while gains concentrate among the highest earners.","Growth and inequality can increase at the same time.","An average does not show how gains are distributed."],
    ["Two policies create different benefits, costs, and incentives.","Compare outcomes, distribution, assumptions, and unintended effects.","Economic evaluation requires more than a single total." ]
  ]);
  addCompactUnit("hist",92,"Global Issues & Diplomacy",20,["International Organizations","Diplomacy and Treaties","Human Rights","Global Interdependence","Global Issues Evidence Challenge"],[
    ["Countries create an organization for negotiation, aid, and collective action.","International organizations coordinate cooperation but depend on member participation.","Shared institutions help address cross-border problems within political limits."],
    ["Two states exchange concessions and establish inspection rules.","The treaty uses negotiation and verification to manage conflict.","Agreements are stronger when obligations can be monitored."],
    ["A government signs a rights agreement but reports document continued abuses.","Formal commitment should be compared with implementation evidence.","Laws and treaties do not guarantee enforcement."],
    ["A supply disruption in one region raises prices worldwide.","Global interdependence transmits local events through trade networks.","Connected production and markets spread effects across borders."],
    ["Sources disagree about a humanitarian crisis and use different definitions.","Compare definitions, methods, dates, and independent evidence before concluding.","Careful sourcing is essential in contested global issues." ]
  ]);
  mathArcadeLesson();historyJeopardy();

})();
