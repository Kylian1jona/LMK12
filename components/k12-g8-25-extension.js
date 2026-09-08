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
  data["g8:sci:L21"]={name:"Interactive Molecule Lab",topic:"Chemistry Lab",topicNumber:5,lessonInTopic:1,difficulty:"Developing",contentVersion:"20260907.3",questions:molecules.map(([formula,name,atoms])=>({type:"atom-build",q:`Build ${name} (${formula}) by moving the correct atoms into the reaction tray.`,formula,name,atoms,explain:`${formula} contains ${Object.entries(atoms).map(([symbol,count])=>`${count} ${symbol} atom${count===1?'':'s'}`).join(' and ')}.`}))};
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
  function jeopardyLesson(subject,number,name,topic,facts){
    const questions=Array.from({length:25},(_,round)=>{
      const clues=[0,1,2].map(offset=>{
        const fact=facts[(round*3+offset)%facts.length];
        const wrongs=facts.filter(item=>item.answer!==fact.answer).slice(offset,offset+3).map(item=>item.answer);
        return {value:1000,question:fact.question,choices:[fact.answer,...wrongs].slice(0,4),answer:fact.answer};
      });
      return {type:"jeopardy",targetScore:3000,q:`Jeopardy round ${round+1}: earn $3,000 by solving all three clues.`,clues,answer:"3000",audio:`Jeopardy round ${round+1}. Earn three thousand points.`};
    });
    data[`g8:${subject}:L${number}`]={name,topic,topicNumber:6,lessonInTopic:1,difficulty:"Mastery",contentVersion:"20260907.5",questions};
  }
  function mathGridLesson(){
    const equations=[
      {question:"Solve: 3x + 8 = 23.",answer:"x = 5",choices:["x = 5","x = 3","x = 7","x = 15"]},{question:"Solve: 5(y - 2) = 20.",answer:"y = 6",choices:["y = 6","y = 2","y = 4","y = 22"]},{question:"Solve: 4a - 9 = 19.",answer:"a = 7",choices:["a = 7","a = 5","a = 10","a = 28"]},{question:"What is 15% of 80?",answer:"12",choices:["12","8","15","20"]},{question:"What is the slope through (2, 3) and (4, 7)?",answer:"2",choices:["2","1/2","4","-2"]},{question:"What is the square root of 144?",answer:"12",choices:["12","14","72","24"]},{question:"Evaluate: 2^3 x 2^2.",answer:"32",choices:["32","16","64","8"]},{question:"A right triangle has legs 6 and 8. What is its hypotenuse?",answer:"10",choices:["10","14","48","7"]},{question:"What is the y-intercept of y = 4x - 9?",answer:"-9",choices:["-9","4","9","-4"]}
    ];
    const questions=Array.from({length:25},(_,round)=>{const tiles=[0,1,2].map(offset=>equations[(round*3+offset)%equations.length]);return {type:"math-grid",q:`Equation grid ${round+1}: solve every tile to unlock the next round.`,tiles,answer:"3",audio:`Equation grid ${round+1}. Solve all three tiles.`};});
    data["g8:math:L26"]={name:"Equation Grid Challenge",topic:"Math Challenge",topicNumber:6,lessonInTopic:1,difficulty:"Mastery",contentVersion:"20260907.5",questions};
  }
  mathGridLesson();
  jeopardyLesson("hist",26,"History Jeopardy: Reach $3,000","Jeopardy Challenge",[
    {question:"Which amendment abolished slavery in the United States?",answer:"Thirteenth Amendment"},{question:"What document established the framework of the U.S. national government?",answer:"The Constitution"},{question:"What movement fought for women's voting rights?",answer:"Women's suffrage movement"},{question:"Which branch interprets laws?",answer:"Judicial branch"},{question:"What is a primary source?",answer:"Evidence created during the time being studied"},{question:"What does federalism divide?",answer:"Power between national and state governments"},{question:"What was the purpose of the Bill of Rights?",answer:"To protect individual liberties"},{question:"What is a historian's use of multiple sources called?",answer:"Corroboration"}
  ]);
})();
