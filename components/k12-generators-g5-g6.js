/* Grade 5-6 deterministic TEKS lesson generators.
   Every lesson produces a fixed 25-question sequence selected by LR.round.
   Questions 1-5 build foundations, 6-10 apply the skill, 11-15 reason with
   evidence, 16-20 handle a challenge, and 21-25 require lesson-owned error
   analysis, synthesis, and multi-condition mastery. No random pool is used. */

const G56_TEA_SOURCES = Object.freeze({
  g5eng: "https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect/ch110a.pdf",
  g6eng: "https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect/ch110b.pdf",
  g5math: "https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect/ch111a.pdf",
  g6math: "https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect/ch111b.pdf",
  g5sci: "https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect/ch112a-0.pdf",
  g6sci: "https://tea.texas.gov/laws-and-rules/sboe-rules-tac/sboe-tac-currently-effect/ch112b.pdf"
});

const G56_SPECS = Object.create(null);
const G56_LEVELS = ["Foundation", "Apply", "Reason", "Challenge", "Mastery"];

function g56RoundIndex(){
  const round = typeof LR === "object" ? Number(LR.round) : 1;
  return Math.max(0, Math.min(24, Number.isFinite(round) ? round - 1 : 0));
}

function g56Register(key, spec){
  if(G56_SPECS[key]) throw new Error(`Duplicate Grade 5-6 lesson spec: ${key}`);
  G56_SPECS[key] = Object.freeze(spec);
}

function g56Unique(values, answer){
  const result = [];
  const used = new Set([String(answer)]);
  values.forEach(value=>{
    const text = String(value);
    if(text && !used.has(text) && result.length < 3){ used.add(text); result.push(text); }
  });
  if(result.length < 3) throw new Error(`Lesson question supplied only ${result.length} unique distractors for “${answer}”`);
  return result;
}

function g56TaskText(value){
  return String(value || "").replace(/\s+/g, " ").trim().replace(/[.!?]+$/, "");
}

function g56CompactContext(value, limit){
  const text=g56TaskText(value);
  if(text.length<=limit) return text;
  const side=Math.max(18,Math.floor((limit-3)/2));
  return `${text.slice(0,side).trim()} … ${text.slice(-side).trim()}`;
}

function g56MC(spec, index, stem, answer, wrongs, explanation, trueFalseTask=stem){
  const uniqueWrongs=g56Unique(wrongs,answer);
  const explicitTrueFalse=(index+1)%5===0;
  const claimIsTrue=Math.floor(index/5)%2===0;
  const claim=claimIsTrue?String(answer):uniqueWrongs[0];
  const claimText=g56TaskText(claim);
  const contextLimit=Math.min(150,Math.max(54,250-claimText.length));
  const context=g56CompactContext(trueFalseTask,contextLimit);
  const trueFalseStem=`True or false: “${claimText}” correctly answers “${context}.”`;
  const question=explicitTrueFalse
    ? makeTrueFalseQuestion(trueFalseStem,claimIsTrue,trueFalseStem)
    : mcQuestion(stem,String(answer),uniqueWrongs,stem);
  question.explicitTrueFalse=explicitTrueFalse;
  question.explain = explicitTrueFalse
    ? (claimIsTrue?`True. ${explanation||answer}`:`False. ${explanation||`The supported answer is ${answer}.`}`)
    : (explanation || `${answer} follows from the evidence and rule in this lesson.`);
  question.sequenceIndex = index + 1;
  question.difficultyTier = Math.floor(index / 5) + 1;
  question.difficulty = G56_LEVELS[Math.floor(index / 5)];
  question.teksExpectation = {
    code: spec.teks,
    text: spec.expectation,
    source: spec.source
  };
  return question;
}

function g56Mastery(spec, index){
  const builder = G56_BUILDERS[spec.kind];
  const phase = index - 20;
  /*
    Each mastery item is anchored to a different challenge/reasoning item from
    this exact lesson. That keeps the evidence, computation, passage, language,
    and distractors lesson-owned while adding a genuinely new reasoning task.
  */
  const anchorIndexes = [15, 16, 17, 18, 13];
  const anchor = builder(spec, anchorIndexes[phase]);
  const answer = String(anchor.answer);
  const wrongs = Array.isArray(anchor.choices)
    ? anchor.choices
        .filter(choice=>String(choice)!==answer)
        .map(String)
        .sort((left,right)=>left.localeCompare(right))
    : [];
  if(wrongs.length < 3){
    throw new Error(`Mastery anchor for ${spec.title} did not supply three lesson-owned distractors.`);
  }
  const proposed = wrongs[phase % wrongs.length];
  const masteryPrompts = [
    `Which answer correctly resolves “${g56TaskText(anchor.q)}” and replaces “${proposed}” using the task's evidence or constraints?`,
    `Which answer to “${g56TaskText(anchor.q)}” fits all the given evidence and lesson rules?`,
    `Which answer satisfies every condition in “${g56TaskText(anchor.q)}”?`,
    `When “${answer}” and “${proposed}” are compared for “${g56TaskText(anchor.q)},” which answer remains defensible?`,
    `After “${proposed}” is eliminated, which answer remains valid for “${g56TaskText(anchor.q)}”?`
  ];
  const anchorExplanation=String(anchor.explain||"").trim();
  const explanation = `${anchorExplanation}${/[.!?]$/.test(anchorExplanation)?" ":". "}This evidence makes the correct response defensible. The response "${proposed}" fails at least one stated condition, so the correction uses the complete lesson evidence rather than a single clue.`;
  return g56MC(spec,index,masteryPrompts[phase],answer,wrongs,explanation,anchor.q);
}

function g56BuildAt(key, index){
  const spec = G56_SPECS[key];
  if(!spec) throw new Error(`Missing Grade 5-6 lesson spec: ${key}`);
  const builder = G56_BUILDERS[spec.kind];
  if(typeof builder !== "function") throw new Error(`Missing builder ${spec.kind} for ${key}`);
  return index >= 20 ? g56Mastery(spec, index) : builder(spec, index);
}

function g56Generate(key){
  return g56BuildAt(key, g56RoundIndex());
}

const G56_READING_SEQUENCE = Object.freeze([
  {text:"Nia saw the tomato leaves drooping, so she watered the soil before school.",main:"Nia cares for a thirsty plant",detail:"The tomato leaves were drooping",inference:"The plant needed water",evidence:"she watered the soil",theme:"Careful observation helps solve problems",summary:"Nia noticed a wilted plant and watered it",title:"The Thirsty Tomato",purpose:"to tell how Nia responded to a plant's need",tone:"concerned",mood:"hopeful",viewpoint:"third person",cause:"the leaves were drooping",effect:"Nia watered the soil",problem:"the plant appeared thirsty",solution:"Nia watered it",sequence:"notice the leaves, infer a need, water the soil",structure:"cause and effect"},
  {text:"After Malik practiced the difficult measure slowly each day, he performed it smoothly at the concert.",main:"Practice improved Malik's performance",detail:"He practiced the measure slowly each day",inference:"Malik persisted when the music was difficult",evidence:"he performed it smoothly",theme:"Steady practice leads to growth",summary:"Daily practice helped Malik master a hard musical measure",title:"Measure by Measure",purpose:"to show how practice produced improvement",tone:"encouraging",mood:"satisfied",viewpoint:"third person",cause:"Malik practiced carefully",effect:"his concert performance was smooth",problem:"a musical measure was difficult",solution:"he practiced it slowly every day",sequence:"identify the hard measure, practice slowly, perform smoothly",structure:"problem and solution"},
  {text:"The library added signs in three languages. More neighbors then asked questions, found books, and joined programs.",main:"Multilingual signs made the library more accessible",detail:"The signs used three languages",inference:"Some visitors previously faced a language barrier",evidence:"More neighbors joined programs",theme:"Welcoming communication strengthens a community",summary:"New multilingual signs helped more neighbors use library services",title:"Signs That Welcome",purpose:"to explain the effect of accessible signs",tone:"positive",mood:"welcoming",viewpoint:"third person",cause:"the library posted multilingual signs",effect:"more neighbors used its services",problem:"some visitors could not easily navigate the library",solution:"the library added signs in three languages",sequence:"add signs, help visitors navigate, increase participation",structure:"cause and effect"},
  {text:"A sudden storm canceled the field study. Instead of giving up, the class compared live weather maps and recorded changes from the classroom.",main:"The class adapted its investigation after a storm",detail:"Students compared live weather maps",inference:"The learning goal could be met in another way",evidence:"Instead of giving up",theme:"Flexible thinking can overcome obstacles",summary:"When a storm canceled fieldwork, students used weather maps indoors",title:"A New Plan for the Storm",purpose:"to show students adapting to an obstacle",tone:"resourceful",mood:"determined",viewpoint:"third person",cause:"a storm canceled the field study",effect:"students investigated from indoors",problem:"the class could not conduct outdoor fieldwork",solution:"students analyzed live maps in class",sequence:"storm arrives, fieldwork is canceled, students use maps",structure:"problem and solution"},
  {text:"Jules returned the wallet unopened and waited until its owner arrived. The owner thanked Jules for protecting everything inside.",main:"Jules acted honestly with a lost wallet",detail:"The wallet remained unopened",inference:"Jules valued doing what was right",evidence:"Jules waited until its owner arrived",theme:"Integrity means doing the right thing without a reward",summary:"Jules protected and returned a lost wallet",title:"The Unopened Wallet",purpose:"to illustrate an honest choice",tone:"respectful",mood:"reassured",viewpoint:"third person",cause:"Jules found a wallet",effect:"the owner recovered it safely",problem:"a wallet was lost",solution:"Jules guarded and returned it",sequence:"find the wallet, protect it, return it",structure:"chronological order"},
  {text:"City trees shade pavement and release water vapor. Measurements show that blocks with mature trees can be cooler than nearby blocks without them.",main:"Mature trees can reduce neighborhood heat",detail:"Trees shade pavement",inference:"Planting trees may help cities manage extreme heat",evidence:"tree-lined blocks measured cooler",theme:"Natural systems can support human communities",summary:"Shade and water release from mature trees can cool city blocks",title:"How Trees Cool a City",purpose:"to explain why tree-lined blocks may be cooler",tone:"informative",mood:"thoughtful",viewpoint:"third person",cause:"trees provide shade and release water vapor",effect:"nearby temperatures may decrease",problem:"paved city blocks absorb heat",solution:"maintain mature shade trees",sequence:"trees grow, shade pavement, blocks stay cooler",structure:"cause and effect"},
  {text:"Rosa's first model bridge bent under two kilograms. She reinforced the joints, tested one variable at a time, and the third design held six kilograms.",main:"Rosa improved a bridge through controlled redesign",detail:"She changed one variable at a time",inference:"Test results guided each revision",evidence:"the third design held six kilograms",theme:"Failure can provide evidence for improvement",summary:"Rosa used repeated tests and reinforced joints to strengthen a model bridge",title:"Stronger by Design",purpose:"to demonstrate evidence-based engineering",tone:"analytical",mood:"optimistic",viewpoint:"third person",cause:"weak joints made the first bridge bend",effect:"reinforcement increased the bridge's capacity",problem:"the bridge could not support enough mass",solution:"Rosa reinforced and retested its joints",sequence:"test, identify weakness, revise, retest",structure:"problem and solution"},
  {text:"The article presents a farmer's support for a new reservoir and a biologist's concern about habitat loss. Both cite data, but they weigh the consequences differently.",main:"Two experts interpret a reservoir proposal differently",detail:"Both experts cite data",inference:"Evidence can support competing priorities",evidence:"they weigh the consequences differently",theme:"Responsible decisions require considering multiple perspectives",summary:"A farmer and biologist use evidence to argue different positions on a reservoir",title:"One Reservoir, Two Views",purpose:"to compare evidence-based viewpoints",tone:"balanced",mood:"reflective",viewpoint:"third person",cause:"the proposal affects farming and habitat",effect:"experts reach different conclusions",problem:"the community must balance water and habitat needs",solution:"evaluate evidence from both perspectives",sequence:"present proposal, examine two views, compare consequences",structure:"compare and contrast"},
  {text:"Although the trail looked shorter on the old map, contour lines revealed a steep climb. The hikers chose the longer route and arrived before dark with water remaining.",main:"The hikers used map evidence to choose a safer route",detail:"Contour lines showed a steep climb",inference:"Distance alone did not determine travel time",evidence:"they arrived before dark with water remaining",theme:"Good decisions consider more than one kind of evidence",summary:"Hikers avoided a steep shortcut after analyzing a topographic map",title:"The Longer, Safer Route",purpose:"to show how map analysis informed a decision",tone:"cautious",mood:"relieved",viewpoint:"third person",cause:"contour lines showed difficult terrain",effect:"the hikers selected a longer route",problem:"the apparent shortcut was steep",solution:"choose the route with safer terrain",sequence:"read the map, compare routes, choose, arrive safely",structure:"cause and effect"},
  {text:"The school replaced disposable trays with washable ones. Water use rose slightly, but weekly trash volume fell by nearly one-third.",main:"A tray change created both costs and benefits",detail:"Trash volume fell by nearly one-third",inference:"Environmental choices can involve tradeoffs",evidence:"water use rose while trash decreased",theme:"Strong decisions examine more than one consequence",summary:"Washable trays increased water use but substantially reduced school trash",title:"Measuring the Tray Tradeoff",purpose:"to explain two effects of a sustainability decision",tone:"objective",mood:"considered",viewpoint:"third person",cause:"the school adopted washable trays",effect:"water use rose and trash fell",problem:"disposable trays created substantial waste",solution:"replace them with washable trays while monitoring water",sequence:"replace trays, measure resources, compare outcomes",structure:"advantages and disadvantages"},
  {text:"Kai claimed the creek was healthier because the water looked clear. Amara noted that dissolved oxygen and insect diversity had also increased, providing stronger evidence.",main:"Multiple measurements better support a creek-health claim",detail:"Dissolved oxygen and insect diversity increased",inference:"Appearance alone is weak evidence of ecosystem health",evidence:"two biological and chemical indicators improved",theme:"Reliable conclusions depend on relevant evidence",summary:"Amara strengthened a creek-health claim with oxygen and biodiversity data",title:"Beyond Clear Water",purpose:"to distinguish weak observation from stronger evidence",tone:"evaluative",mood:"curious",viewpoint:"third person",cause:"several health indicators increased",effect:"the creek-health claim became better supported",problem:"Kai relied only on water clarity",solution:"include oxygen and insect-diversity measurements",sequence:"make a claim, question evidence, add measurements, revise conclusion",structure:"problem and solution"},
  {text:"The narrator praises the mayor's 'brilliant' plan just after listing three obvious failures. The quotation marks and contrast signal that the praise is ironic.",main:"Context reveals that the narrator's praise is ironic",detail:"The passage lists three failures",inference:"The narrator doubts the mayor's plan",evidence:"praise appears immediately after failures",theme:"A speaker's literal words may hide a different judgment",summary:"Contrast between praise and failure creates irony",title:"Brilliant in Quotation Marks",purpose:"to criticize a failed plan through irony",tone:"sarcastic",mood:"skeptical",viewpoint:"first person observer",cause:"the plan repeatedly failed",effect:"the narrator uses ironic praise",problem:"literal reading hides the criticism",solution:"analyze contrast and quotation marks",sequence:"list failures, offer praise, recognize irony",structure:"contrast"},
  {text:"Researchers counted pollinators at equal-sized plots before and after native flowers were planted. Visits increased at the planted plots but stayed nearly constant at control plots.",main:"Controlled data link native flowers with more pollinator visits",detail:"Control-plot visits stayed nearly constant",inference:"The flowers, not a region-wide change, likely affected visits",evidence:"only planted plots showed a large increase",theme:"Comparisons strengthen scientific explanations",summary:"Pollinator visits rose after native flowers were added, unlike at control plots",title:"Flowers and a Fair Test",purpose:"to report evidence from a comparative investigation",tone:"scientific",mood:"inquisitive",viewpoint:"third person",cause:"native flowers were planted",effect:"pollinator visits increased",problem:"researchers needed to isolate the effect of planting",solution:"compare planted plots with control plots",sequence:"count visits, plant flowers, recount, compare",structure:"experimental sequence"},
  {text:"An editorial urges readers to support later bus service, citing attendance data and interviews with workers. It acknowledges the cost, then argues that a pilot program would test demand.",main:"The editorial argues for testing later bus service",detail:"It cites attendance data and worker interviews",inference:"The writer anticipates a budget objection",evidence:"the editorial acknowledges cost before proposing a pilot",theme:"Persuasive arguments address evidence and counterarguments",summary:"Using data and interviews, an editorial proposes a pilot for later buses",title:"A Later Ride Home",purpose:"to persuade readers to support a bus-service pilot",tone:"reasoned",mood:"hopeful",viewpoint:"first person editorial",cause:"current schedules limit some riders",effect:"the writer proposes a later-service test",problem:"workers and students lack late transportation",solution:"run a measured pilot program",sequence:"present need, cite evidence, address cost, propose pilot",structure:"claim and evidence"},
  {text:"Two biographies describe the same inventor. One emphasizes solitary insight; the other documents technicians whose experiments corrected early designs.",main:"Biographies can frame the same achievement differently",detail:"Technicians corrected early designs",inference:"The first biography may understate collaboration",evidence:"the second documents other contributors",theme:"Perspective shapes which details a history emphasizes",summary:"Two accounts differ on whether an invention was individual or collaborative",title:"Whose Invention?",purpose:"to compare how sources frame one achievement",tone:"probing",mood:"questioning",viewpoint:"third person",cause:"authors selected different evidence",effect:"readers receive different impressions of the invention",problem:"one account may omit collaborators",solution:"compare evidence across both biographies",sequence:"read first account, read second, compare emphasis",structure:"compare and contrast"},
  {text:"The council's report predicts savings but gives no baseline cost, and its chart begins above zero, making a small change look dramatic. A careful reader requests the full data scale.",main:"Missing context can make a data claim misleading",detail:"The chart's vertical axis begins above zero",inference:"The visual exaggerates the apparent savings",evidence:"no baseline cost or full scale is provided",theme:"Critical readers inspect how evidence is presented",summary:"A report exaggerates savings through missing baseline data and a truncated chart",title:"What the Chart Leaves Out",purpose:"to warn readers to evaluate data displays",tone:"critical",mood:"wary",viewpoint:"third person",cause:"the report omits context and truncates its scale",effect:"a small change appears dramatic",problem:"the chart may mislead readers",solution:"request baseline values and the full scale",sequence:"read claim, inspect chart, identify omissions, request data",structure:"problem and solution"},
  {text:"At first, Elena opposes closing a road to protect nesting birds. After reviewing traffic counts and a detour map, she proposes a weekend closure during nesting season.",main:"Evidence leads Elena to revise her position and propose a compromise",detail:"She reviews traffic counts and a detour map",inference:"Elena balances wildlife protection with transportation needs",evidence:"her proposal limits closure by time and season",theme:"New evidence can refine a responsible position",summary:"Elena changes from opposition to a seasonal weekend road closure after studying evidence",title:"A Road to Compromise",purpose:"to show evidence changing a viewpoint",tone:"deliberative",mood:"constructive",viewpoint:"third person",cause:"Elena examines traffic and habitat evidence",effect:"she proposes a limited closure",problem:"road use conflicts with nesting habitat",solution:"close the road on nesting-season weekends",sequence:"oppose, review evidence, reconsider, propose compromise",structure:"chronological order"},
  {text:"A report says the tutoring program 'caused' higher scores, yet students volunteered for it and began with different study habits. The data show correlation, but not a controlled causal test.",main:"The tutoring data do not by themselves prove causation",detail:"Students volunteered for the program",inference:"Preexisting motivation could influence the result",evidence:"groups differed before tutoring began",theme:"Claims should not exceed what evidence can support",summary:"Score gains correlate with voluntary tutoring, but group differences weaken a causal claim",title:"Correlation Is Not Proof",purpose:"to evaluate the limits of a causal claim",tone:"cautious",mood:"analytical",viewpoint:"third person",cause:"students self-selected into tutoring",effect:"the groups may not be fairly comparable",problem:"the report overstates correlation as causation",solution:"use a stronger comparison design and cautious wording",sequence:"observe scores, inspect group selection, identify confound, revise claim",structure:"claim and rebuttal"},
  {text:"The memoir describes a noisy market as confusing in childhood but comforting years later. Repeated sounds remain the same while the narrator's experience changes their meaning.",main:"The narrator's changing perspective transforms the meaning of the market",detail:"The market sounds remain similar over time",inference:"Memory and maturity influence interpretation",evidence:"the same noise shifts from confusing to comforting",theme:"Experience can change how a familiar place feels",summary:"A market once felt confusing but later becomes comforting to the narrator",title:"The Sound of Returning",purpose:"to reflect on how perspective changes over time",tone:"nostalgic",mood:"warm",viewpoint:"first person",cause:"the narrator matures and returns",effect:"familiar noise gains a comforting meaning",problem:"childhood confusion shaped the first impression",solution:"later experience reframes the memory",sequence:"remember childhood, return years later, reinterpret sounds",structure:"then and now comparison"},
  {text:"The proposal combines heat maps, resident interviews, and tree-canopy data. Because each source has limitations, the team explains how triangulating them supports—but does not guarantee—its conclusion.",main:"Combining imperfect sources can create a stronger, qualified conclusion",detail:"The team uses maps, interviews, and canopy data",inference:"No single source fully represents neighborhood heat",evidence:"the team states both support and limitations",theme:"Credible reasoning is transparent about uncertainty",summary:"A team triangulates three limited sources and carefully qualifies its heat finding",title:"Three Views of the Heat",purpose:"to model evidence synthesis with appropriate caution",tone:"measured",mood:"confident but careful",viewpoint:"third person",cause:"each evidence source has limitations",effect:"the team combines sources and qualifies its claim",problem:"one data source cannot capture the full pattern",solution:"triangulate sources and report uncertainty",sequence:"collect sources, examine limits, compare patterns, qualify conclusion",structure:"synthesis"}
]);

const G56_WORD_SEQUENCE = Object.freeze([
  ["reluctant","hesitant","eager","She was reluctant to cross until the bridge inspection ended."],
  ["abundant","plentiful","scarce","Rain made wildflowers abundant across the field."],
  ["vigilant","watchful","careless","The vigilant lifeguard noticed the weak swimmer."],
  ["deteriorate","worsen","improve","Without repairs, the wooden steps will deteriorate."],
  ["concise","brief and clear","wordy","His concise summary included every essential point."],
  ["ambiguous","open to more than one meaning","certain","The ambiguous direction could be interpreted two ways."],
  ["corroborate","confirm with added evidence","contradict","A second record may corroborate the witness's timeline."],
  ["meticulous","extremely careful","sloppy","The meticulous researcher labeled every sample."],
  ["mitigate","make less severe","intensify","Shade trees can mitigate heat on sidewalks."],
  ["plausible","reasonable or believable","impossible","The explanation is plausible because it fits the measurements."],
  ["substantiate","support with proof","dismiss","The writer must substantiate the claim with reliable evidence."],
  ["inadvertent","unintentional","deliberate","The duplicate entry was an inadvertent error."],
  ["equitable","fair according to need","biased","An equitable plan provides extra support where barriers are greater."],
  ["synthesize","combine ideas into a new understanding","separate without connecting","Readers synthesize details from both sources."],
  ["scrutinize","examine closely","glance at","Scientists scrutinize surprising results before publishing."],
  ["nuanced","showing subtle distinctions","oversimplified","Her nuanced argument recognized benefits and risks."],
  ["empirical","based on observation or experiment","imaginary","The team requested empirical evidence from repeated trials."],
  ["tentative","not yet final","certain","The committee reached a tentative conclusion pending new data."],
  ["infer","conclude from evidence","guess without evidence","Readers infer motive from actions and dialogue."],
  ["validate","check or confirm accuracy","ignore errors in","Independent tests validate the instrument's measurements."]
]);

const G56_ROOT_SEQUENCE = Object.freeze([
  ["bene","good or well","beneficial","harmful"],["mal","bad","malfunction","perfect operation"],
  ["scrib/script","write","manuscript","spoken-only message"],["jur/jus","law or right","justice","geology"],
  ["geo","earth","geography","biography"],["photo","light","photosynthesis","thermometer"],
  ["aud","hear","audience","visible"],["vis/vid","see","evidence","inaudible"],
  ["port","carry","transport","stationary"],["struct","build","construction","destruction without building"],
  ["tract","pull or draw","attract","repel"],["mit/miss","send","transmit","retain"],
  ["vac","empty","vacant","occupied"],["man","hand","manual","automatic"],
  ["bio","life","biology","geology"],["chron","time","chronology","location"],
  ["therm","heat","thermal","acoustic"],["micro","small","microscope","telescope"],
  ["trans","across or through","transport","remain"],["super","above or beyond","superstructure","subsurface"]
]);

const G56_IDIOM_SEQUENCE = Object.freeze([
  ["break the ice","make people feel more comfortable"],["hit the nail on the head","describe the exact issue"],
  ["under the weather","feeling ill"],["once in a blue moon","very rarely"],
  ["spill the beans","reveal a secret"],["cost an arm and a leg","be extremely expensive"],
  ["the ball is in your court","the next decision is yours"],["burn the midnight oil","work late into the night"],
  ["get cold feet","become nervous and hesitate"],["on the same page","share the same understanding"],
  ["bark up the wrong tree","pursue the wrong explanation"],["cut corners","skip necessary steps to save effort"],
  ["add fuel to the fire","make a conflict worse"],["read between the lines","infer an unstated meaning"],
  ["throw in the towel","stop trying"],["weather the storm","endure a difficult period"],
  ["a blessing in disguise","something helpful that first seemed harmful"],["cross that bridge when we come to it","deal with a problem when it occurs"],
  ["move the goalposts","unfairly change the requirements"],["put all your eggs in one basket","risk everything on one plan"]
]);

const G56_PROVERB_SEQUENCE = Object.freeze([
  ["Actions speak louder than words.","Behavior provides stronger evidence than promises."],
  ["Practice makes progress.","Repeated effort improves skill."],
  ["Look before you leap.","Consider consequences before acting."],
  ["Two heads are better than one.","Collaboration can improve a solution."],
  ["Honesty is the best policy.","Truthful choices build trust."],
  ["Where there's a will, there's a way.","Determination helps people overcome barriers."],
  ["Don't judge a book by its cover.","Appearance alone is not enough evidence."],
  ["The early bird catches the worm.","Timely preparation can create opportunity."],
  ["Measure twice, cut once.","Careful checking prevents costly errors."],
  ["Many hands make light work.","Shared effort can make a large task manageable."],
  ["A chain is only as strong as its weakest link.","One weak part can limit an entire system."],
  ["You reap what you sow.","Choices often shape later consequences."],
  ["Still waters run deep.","A quiet person or situation may contain hidden complexity."],
  ["Necessity is the mother of invention.","A pressing need can inspire a new solution."],
  ["The pen is mightier than the sword.","Ideas and communication can have lasting power."],
  ["Don't put the cart before the horse.","Complete steps in a logical order."],
  ["A stitch in time saves nine.","Addressing a small problem early prevents a larger one."],
  ["All that glitters is not gold.","Attractive appearances can hide low value."],
  ["Better to bend than to break.","Flexibility can protect a person or system under pressure."],
  ["The whole is greater than the sum of its parts.","Interacting components can produce a stronger system."]
]);

const G56_FIGURATIVE_SEQUENCE = Object.freeze([
  ["The moon was a silver coin above the field.","metaphor","It directly compares the moon to a coin to emphasize shape and shine."],
  ["The leaves whispered along the path.","personification","It gives leaves the human action of whispering to create a quiet mood."],
  ["Her explanation was as clear as glass.","simile","It uses as to compare clarity with transparent glass."],
  ["I waited forever for the page to load.","hyperbole","The exaggeration emphasizes that the wait felt very long."],
  ["The rain tapped a steady rhythm on the roof.","personification","The human-like action makes the rain sound deliberate and musical."],
  ["Ideas sparked across the room.","metaphor","Sparks represent the sudden spread of creative thought."],
  ["The engine coughed before becoming silent.","personification","The human action suggests an irregular mechanical sound."],
  ["The river curled like a ribbon through the valley.","simile","The comparison emphasizes the river's long, winding shape."],
  ["The deadline raced toward us.","personification","Giving the deadline motion creates urgency."],
  ["His promise was a fragile bridge.","metaphor","The bridge comparison suggests trust that could easily fail."],
  ["A blanket of fog swallowed the harbor.","metaphor and personification","The images emphasize dense fog covering and hiding the harbor."],
  ["Questions buzzed like bees after the announcement.","simile","The sound comparison conveys many rapid, energetic questions."],
  ["The empty stadium held its breath.","personification","The human action creates tense silence."],
  ["Her argument had a mountain of evidence.","hyperbole","The exaggeration emphasizes an unusually large amount of support."],
  ["Time is a thief that steals ordinary moments.","metaphor and personification","The comparison presents passing time as quietly taking experiences away."],
  ["The cheerful poster shouted above the gray wall.","personification","The verb shouted emphasizes the poster's striking visual contrast."],
  ["Rumors spread like ink through water.","simile","The comparison shows information moving quickly and becoming hard to contain."],
  ["The policy planted seeds of distrust.","metaphor","Seeds represent small actions that later develop into larger mistrust."],
  ["The final paragraph echoes the opening question.","metaphor","Echoes describes a repeated idea that unifies the text."],
  ["Hope was the compass that kept the team moving.","metaphor","The compass comparison shows hope guiding decisions during uncertainty."]
]);

const G56_READING_PROMPTS = Object.freeze({
  main:"Which statement best expresses the central or main idea?",
  detail:"Which detail most directly supports the passage's central idea?",
  inference:"Which inference is best supported by the passage?",
  evidence:"Which quoted or paraphrased evidence best supports the inference?",
  theme:"Which theme is developed through the events or ideas?",
  summary:"Which summary preserves the important meaning and logical order?",
  title:"Which title best reflects the passage's controlling idea?",
  purpose:"What is the author's most likely purpose?",
  tone:"Which word best describes the author's or narrator's tone?",
  mood:"Which word best describes the mood created for the reader?",
  viewpoint:"Which point of view or perspective shapes the passage?",
  cause:"Which detail functions as the most important cause?",
  effect:"Which result is the clearest effect?",
  problem:"What central problem must be addressed?",
  solution:"Which solution does the passage present or best support?",
  sequence:"Which sequence accurately preserves the order and relationships?",
  structure:"Which organizational pattern best describes the passage?"
});

function g56ReadingDistractors(record,mode){
  const misconception=`The passage proves the opposite: ${record.problem}`;
  const isolated=`${record.detail} only, treated as the whole answer`;
  const overclaim=`An unsupported certainty beyond the evidence: ${record.inference} in every case`;
  const alternatives={
    main:[isolated,record.theme,misconception],
    detail:[record.main,record.title,overclaim],
    inference:[record.detail,misconception,overclaim],
    evidence:[record.main,record.theme,`A claim with no textual support about ${record.title}`],
    theme:[record.main,record.detail,`The events teach the opposite of ${record.theme}`],
    summary:[record.detail,record.theme,`An unrelated account titled ${record.title}`],
    title:[record.detail,record.problem,`The Opposite of ${record.title}`],
    purpose:[`to list only this detail: ${record.detail}`,`to argue the opposite of ${record.main}`,`to conceal the issue of ${record.problem}`],
    tone:[record.mood,"careless","completely indifferent"],
    mood:[record.tone,"unreasonably comic","emotionless"],
    viewpoint:["second-person directions","omniscient access to every person's private thoughts","no perspective or speaker"],
    cause:[record.effect,record.solution,isolated],
    effect:[record.cause,record.problem,overclaim],
    problem:[record.solution,record.effect,isolated],
    solution:[record.problem,record.cause,`repeat the problem instead of ${record.solution}`],
    sequence:[record.sequence.split(", ").reverse().join(", "),`${record.effect}, then ${record.cause}`,`${record.solution}, then ignore ${record.problem}`],
    structure:[`spatial description of ${record.title}`,`a disconnected list about ${record.detail}`,`question and answer about ${record.problem}`]
  };
  return alternatives[mode];
}

function g56Reading(spec, index){
  const record = G56_READING_SEQUENCE[index];
  const mode = spec.mode;
  const answer = record[mode];
  const stem = `${record.text}\n\n${G56_READING_PROMPTS[mode]}`;
  return g56MC(spec,index,stem,answer,g56ReadingDistractors(record,mode),`${answer}. This choice accounts for the passage as a whole and is supported by ${record.evidence}.`);
}

function g56Vocabulary(spec,index){
  const [word,meaning,opposite,context]=G56_WORD_SEQUENCE[index];
  const tier=Math.floor(index/5);
  let stem,answer,wrongs;
  if(spec.mode==="context"){
    stem=`${context}\n\n${tier<2?"Use context":"Use the sentence's logic and connotation"} to determine the meaning of “${word}.”`;
    answer=meaning; wrongs=[opposite,"a location named in the sentence","a meaning that ignores the context clue"];
  }else if(spec.mode==="synonym"){
    stem=`${context}\n\nWhich replacement is the most precise synonym for “${word}” in this context?`;
    answer=meaning; wrongs=[opposite,"unrelated","more intense but incorrect"];
  }else if(spec.mode==="antonym"){
    stem=`${context}\n\nWhich expression is the clearest antonym of “${word}”?`;
    answer=opposite; wrongs=[meaning,word,"a word with the same connotation"];
  }else if(spec.mode==="strong"){
    stem=`A writer says, “The reviewer looked at the ${word} claim.” Which revision uses the strongest precise wording for the action?`;
    answer=tier<2?`The reviewer examined the ${word} claim.`:`The reviewer scrutinized the ${word} claim and tested it against evidence.`;
    wrongs=["The reviewer did stuff with the claim.","The reviewer claim looked.","The claim was kind of there."];
  }else{
    stem=`${context}\n\nWhich relationship accurately connects “${word},” its meaning, and its opposite?`;
    answer=`${word} means ${meaning}; ${opposite} expresses a contrast`;
    wrongs=[`${word} means ${opposite}; ${meaning} is unrelated`,`${word} and ${opposite} are exact synonyms`,`${meaning} is an example of ${opposite}`];
  }
  return g56MC(spec,index,stem,answer,wrongs,`${word} means ${meaning} in the provided context.`);
}

function g56Roots(spec,index){
  const [root,meaning,example,contrast]=G56_ROOT_SEQUENCE[index];
  const tier=Math.floor(index/5);
  let stem,answer;
  if(spec.mode==="root"){
    stem=`${tier<2?"Identify":"Analyze"} the contribution of the root “${root}” in “${example}.”`;
    answer=`It contributes the meaning “${meaning}.”`;
  }else if(spec.mode==="prefix"){
    stem=`A reader separates “${example}” into meaningful word parts. Which conclusion about “${root}” is supported?`;
    answer=`The word part ${root} signals “${meaning}.”`;
  }else{
    stem=`Without a dictionary, use the root “${root}” and the context “The technical term ${example} appears in the report.” Which meaning is most defensible?`;
    answer=`A meaning connected to ${meaning}`;
  }
  return g56MC(spec,index,stem,answer,[`A meaning connected to ${contrast}`,"The root changes only the punctuation","The root has no effect on meaning"],`The root ${root} carries the meaning ${meaning}, which helps explain ${example}.`);
}

function g56Figurative(spec,index){
  const [line,device,effect]=G56_FIGURATIVE_SEQUENCE[index];
  const askEffect=spec.mode==="effect" || index>=10;
  const stem=`${line}\n\n${askEffect?"How does the figurative language achieve a specific purpose?":"Which figurative device is used most clearly?"}`;
  const answer=askEffect?effect:device;
  const wrongs=askEffect?["It states only a literal measurement.","It removes all imagery and emotional effect.","It introduces an unrelated fact with no purpose."]:["literal statement","technical definition","chronological transition"];
  return g56MC(spec,index,stem,answer,wrongs,`${device}: ${effect}`);
}

function g56Idiom(spec,index){
  const source=spec.mode==="proverb"||spec.mode==="adage"?G56_PROVERB_SEQUENCE:G56_IDIOM_SEQUENCE;
  const [expression,meaning]=source[index];
  const stem=index<10?`What does “${expression}” mean in ordinary use?`:`A writer uses “${expression}” while explaining a difficult decision. Which interpretation preserves the figurative message rather than reading it literally?`;
  return g56MC(spec,index,stem,meaning,["the exact literal action only","a message opposite to the expression","an unrelated statement about weather"],`${expression} communicates this general meaning: ${meaning}`);
}

const G56_PEOPLE=["Amina","Ben","Carla","Dev","Elena","Finn","Gia","Hugo","Imani","Jae","Kira","Luis","Mina","Noah","Omar","Priya","Quinn","Rosa","Sam","Tariq"];
const G56_PLACES=["library","garden","laboratory","museum","studio","gym","cafeteria","auditorium","workshop","courtyard","greenhouse","archive","theater","clinic","observatory","market","harbor","trail","station","gallery"];
const G56_ACTIONS=["examines the map","records the data","repairs the model","organizes the notes","tests the bridge","summarizes the article","measures the sample","revises the paragraph","compares the sources","labels the diagram","calculates the rate","questions the claim","observes the pattern","explains the result","checks the scale","photographs the evidence","interviews the witness","plots the points","evaluates the design","defends the conclusion"];

function g56Grammar(spec,index){
  const person=G56_PEOPLE[index],place=G56_PLACES[index],action=G56_ACTIONS[index];
  let stem,answer,wrongs,why;
  if(spec.mode==="subject"){
    const sentence=`The careful student near the ${place} ${action}.`;
    stem=`In “${sentence}” identify the complete subject. ${index>=10?"Do not mistake a noun inside a prepositional phrase for the subject.":""}`;
    answer=`The careful student near the ${place}`; wrongs=[action,`the ${place}`,"careful"];
    why="The complete subject includes the main noun student and all words that modify it.";
  }else if(spec.mode==="verb"){
    const past=["went","saw","wrote","chose","brought"][index%5],base=["go","see","write","choose","bring"][index%5];
    stem=`Yesterday ${person} ___ to the ${place} before the team completed its review. Choose the consistent, correct past-tense verb.`;
    answer=past; wrongs=[base,base+"ed",`will ${base}`]; why=`Yesterday requires the past tense ${past}.`;
  }else if(spec.mode==="punctuation"){
    const raw=`After ${person} reviewed the evidence ${person.toLowerCase()} revised the claim and cited the source`;
    answer=`After ${person} reviewed the evidence, ${person.toLowerCase()} revised the claim and cited the source.`;
    stem=`Which revision correctly punctuates this complex sentence?\n${raw}`;
    wrongs=[raw+".",`After ${person}, reviewed the evidence ${person.toLowerCase()} revised the claim and cited the source.`,`After ${person} reviewed the evidence; ${person.toLowerCase()}, revised the claim and cited the source.`];
    why="A comma follows the introductory dependent clause, and the sentence ends with a period.";
  }else if(spec.mode==="preposition"){
    const prep=["beside","through","beneath","between","beyond","during","before","after","within","across"][index%10];
    const sentence=`${person} placed the verified notes ${prep} the display in the ${place}.`;
    stem=`In “${sentence}” which word begins the prepositional phrase that shows ${index%2?"time or relationship":"location or direction"}?`;
    answer=prep; wrongs=[person,"placed","verified"]; why=`${prep} begins the phrase “${prep} the display.”`;
  }else if(spec.mode==="phrase"){
    const prep=["near","inside","outside","before","after"][index%5];
    const sentence=`The reports ${prep} the ${place} explain the result.`;
    stem=`Which complete prepositional phrase modifies “reports” in “${sentence}”?`;
    answer=`${prep} the ${place}`; wrongs=["The reports","explain the result",place]; why=`The phrase begins with ${prep} and ends with its object, ${place}.`;
  }else if(spec.mode==="direct"){
    const object=["map","sample","bridge","article","diagram"][index%5];
    const sentence=`${person} carefully examined the ${object} in the ${place}.`;
    stem=`Which word is the direct object in “${sentence}”?`;
    answer=object; wrongs=[person,place,"carefully"]; why=`${object} receives the action examined.`;
  }else if(spec.mode==="indirect"){
    const item=["report","model","summary","diagram","proposal"][index%5];
    const sentence=`The teacher gave ${person} the revised ${item}.`;
    stem=`Which word is the indirect object in “${sentence}”?`;
    answer=person; wrongs=["teacher",item,"revised"]; why=`${person} receives the ${item}.`;
  }else if(spec.mode==="objects"){
    const sentence=`The curator showed ${person} the new exhibit near the ${place}.`;
    stem=`Which analysis correctly identifies the sentence objects in “${sentence}”?`;
    answer=`${person} is the indirect object; exhibit is the direct object`;
    wrongs=["curator is the direct object; place is the indirect object","exhibit is the subject; curator is a preposition","new is the direct object; showed is the indirect object"];
    why=`The curator shows the exhibit to ${person}.`;
  }else if(spec.mode==="sentence"){
    const sentence=`Although the evidence was incomplete, ${person} revised the model before the team voted.`;
    stem=`Which analysis of “${sentence}” is accurate?`;
    answer="It is a complete complex sentence with one independent clause and dependent clauses";
    wrongs=["It is a fragment with no subject","It is a run-on made of three independent clauses","It has no predicate"];
    why="The main clause can stand alone; the clauses beginning with Although and before depend on it.";
  }else{
    const antecedent=index%2?"Each scientist":"The scientists",pronoun=index%2?"his or her":"their";
    const sentence=`At the ${place}, ${antecedent.toLowerCase()} checked ${pronoun} measurements for study ${index+1} before publishing.`;
    stem=`Which explanation correctly evaluates pronoun agreement and clarity in “${sentence}”?`;
    answer=`${pronoun} agrees with ${antecedent}, and its reference is clear`;
    wrongs=[`the pronoun should be “its” because ${antecedent} is an object`,`the pronoun has no possible antecedent`,`the sentence must replace every pronoun with a preposition`];
    why=`The pronoun ${pronoun} agrees in number with ${antecedent}.`;
  }
  return g56MC(spec,index,stem,answer,wrongs,why);
}

function g56Homophone(spec,index){
  const person=G56_PEOPLE[index],place=G56_PLACES[index];
  const sets={there:["there","their","they're"],to:["to","too","two"],your:["your","you're"],its:["its","it's"]};
  const extras={there:["theyre"],to:["to'"],your:["yore","youre"],its:["its'","itss"]};
  const mode=spec.mode;
  if(mode==="mixed"){
    const item=[
      ["their","The students defended ___ conclusion."],["there","Set the samples over ___."],["they're","___ ready to begin."],
      ["to","Walk ___ the lab."],["too","The estimate is ___ high."],["two","Compare ___ trials."],
      ["your","Check ___ source."],["you're","___ using strong evidence."],["its","The cell performs ___ function."],["it's","___ a supported inference."]
    ][index%10];
    const wrongs=["there","their","they're","to","too","two","your","you're","its","it's"].filter(word=>word!==item[0]).slice(index%5,index%5+3);
    return g56MC(spec,index,`In ${person}'s study note from the ${place}, choose the correct term: ${item[1]}`,item[0],wrongs,`${item[0]} has the meaning and grammatical role required by the sentence.`);
  }
  const words=sets[mode],target=words[index%words.length];
  const sentences={
    there:{there:`${person} placed the model over there near the ${place}.`,their:`${person} and the team published their results from the ${place}.`,"they're":`They're checking ${person}'s evidence at the ${place}.`},
    to:{to:`${person} went to the ${place}.`,too:`${person} found the first ${place} estimate too broad.`,two:`${person}'s team compared two sources at the ${place}.`},
    your:{your:`${person}, revise your conclusion after checking the ${place} graph.`,"you're":`${person}, you're ready to defend the ${place} conclusion.`},
    its:{its:`The ${place} instrument lost its calibration during ${person}'s trial.`,"it's":`${person} concluded that it's important to report uncertainty at the ${place}.`}
  };
  const blank=sentences[mode][target].replace(target,"___");
  return g56MC(spec,index,`Choose the correctly spelled term to complete the sentence: ${blank}`,target,[...words,...extras[mode]].filter(word=>word!==target),`${target} is correct because its meaning and grammatical role fit.`);
}

function g56ThemeDifference(spec,index){
  const record=G56_READING_SEQUENCE[index];
  const answer=`Theme: ${record.theme}. Main idea: ${record.main}.`;
  return g56MC(spec,index,`${record.text}\n\nWhich option correctly distinguishes the theme from the main idea?`,answer,[`Theme: ${record.main}. Main idea: ${record.theme}.`,"The theme and main idea must always be identical words.","A theme is a character's name; a main idea is the page number."],`The main idea states what the text is about; the theme expresses ${record.theme}.`);
}

function g56Gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ [a,b]=[b,a%b]; } return a||1; }
function g56Lcm(a,b){ return Math.abs(a*b)/g56Gcd(a,b); }
function g56Frac(n,d){
  if(d<0){ n=-n; d=-d; }
  const g=g56Gcd(n,d); n/=g; d/=g;
  return d===1?String(n):`${n}/${d}`;
}
function g56Fmt(value){
  const n=Math.round((Number(value)+Number.EPSILON)*1000)/1000;
  return Number.isInteger(n)?String(n):String(n).replace(/0+$/,"");
}
function g56NumericWrongs(value){
  const n=Number(value),step=Math.max(1,Math.abs(n)>=10?Math.round(Math.abs(n)*0.1):1);
  return [g56Fmt(n+step),g56Fmt(n-step),g56Fmt(n+2*step)];
}
function g56Math(spec,index){
  const i=index+1,tier=Math.floor(index/5),m=spec.mode;
  let stem,answer,wrongs,why;
  if(m==="g5decimalops"){
    if(tier===0){ const a=(i+12)/10,b=(i+3)/100; answer=g56Fmt(a+b); stem=`Compute ${g56Fmt(a)} + ${g56Fmt(b)}. Align place values and check with an estimate.`; }
    else if(tier===1){ const a=(i+20)/10,b=(i-2)/100; answer=g56Fmt(a-b); stem=`Compute ${g56Fmt(a)} − ${g56Fmt(b)}. Which result preserves tenths and hundredths?`; }
    else if(tier===2){ const a=(i+7)/10,b=(i+13)/100,c=(i+2)/100; answer=g56Fmt(a+b-c); stem=`Evaluate ${g56Fmt(a)} + ${g56Fmt(b)} − ${g56Fmt(c)}. Show both place-value steps and verify with an estimate.`; }
    else { const balance=20+i+(i/100),deposit=(i+7)/10,purchase=(i+3)/100; answer=g56Fmt(balance+deposit-purchase); stem=`An account begins with $${g56Fmt(balance)}, receives $${g56Fmt(deposit)}, then pays $${g56Fmt(purchase)}. What balance remains?`; }
    wrongs=g56NumericWrongs(answer); why=`Place-value reasoning gives ${answer}.`;
  }else if(m==="g5fracops"){
    const d1=2+(i%5),d2=3+((i+1)%5),n1=1+(i%d1),n2=1+((i+2)%d2),den=g56Lcm(d1,d2);
    const subtract=tier>=2 && (i%2===0); let num=n1*(den/d1)+(subtract?-1:1)*n2*(den/d2);
    if(num<0){ num=-num; }
    answer=g56Frac(num,den); stem=`${subtract?"Find the positive difference":"Add"} ${n1}/${d1} ${subtract?"and":"+"} ${n2}/${d2}. Use a common denominator and simplify.`;
    wrongs=[g56Frac(n1+n2,d1+d2),g56Frac(num+1,den),g56Frac(Math.max(1,num-1),den),g56Frac(num+den,den),g56Frac(num,den*2)]; why=`A common denominator of ${den} produces ${answer}.`;
  }else if(m==="g5order"){
    const a=i+2,b=2+(i%4),c=3+(i%3),d=1+(i%2);
    if(tier<2){ answer=String(a+b*c); stem=`Simplify ${a} + ${b} × ${c}.`; wrongs=[String((a+b)*c),String(a*b+c),String(a+b+c)]; }
    else { answer=String((a+b)*(c-d)); stem=`Simplify [${a} + ${b}] × (${c} − ${d}).`; wrongs=[String(a+b*c-d),String((a+b)*c-d),String(a+b+c-d)]; }
    why=`Grouping is evaluated first, then multiplication, then addition or subtraction.`;
  }else if(m==="g5place"){
    const decimalDigits=[1+(i%8),1+((i+2)%8),1+((i+4)%8)],number=`${10+i}.${decimalDigits.join("")}`;
    const positions=["tenths","hundredths","thousandths"],pos=positions[(i+1)%3],loc={tenths:1,hundredths:2,thousandths:3}[pos];
    const digits=number.split(".")[1],target=digits[loc-1],values={tenths:Number(target)/10,hundredths:Number(target)/100,thousandths:Number(target)/1000};
    answer=g56Fmt(values[pos]); stem=`In ${number}, what value is represented by the digit ${target} in the ${pos} place?`;
    wrongs=[target,g56Fmt(Number(target)/100),g56Fmt(Number(target)/1000),g56Fmt(Number(target)/10)].filter(v=>v!==answer); why=`The ${pos} place gives the value ${answer}.`;
  }else if(m==="g5compare"){
    const a=Number(`0.${(i%8)+1}${(i*3)%10}${(i*7)%10}`),b=Number(`0.${(i%8)+1}${(i*3)%10}${((i*7)+1)%10}`);
    answer=a<b?"<":a>b?">":"="; stem=`Choose the correct symbol: ${a.toFixed(3)} ___ ${b.toFixed(3)}.`;
    wrongs=["<",">","=","cannot be compared"].filter(x=>x!==answer); why="Compare tenths, then hundredths, then thousandths.";
  }else if(m==="g5equiv"){
    const n1=1+(i%4),d1=3+(i%5),n2=1+((i+2)%4),d2=4+((i+1)%5),den=g56Lcm(d1,d2);
    answer=`${n1*(den/d1)}/${den} and ${n2*(den/d2)}/${den}`;
    stem=`Before adding ${n1}/${d1} + ${n2}/${d2}, which equivalent pair correctly uses the least common denominator?`;
    wrongs=[`${n1+n2}/${den} and ${n2+n1}/${den}`,`${n1}/${den} and ${n2}/${den}`,`${n1*den}/${d1} and ${n2*den}/${d2}`,`${n1*(den/d1)+1}/${den} and ${n2*(den/d2)}/${den}`]; why=`The least common denominator is ${den}; multiply each numerator and denominator by its matching factor.`;
  }else if(m==="g5mixed"){
    const den=3+(i%5),w1=1+tier,w2=1+(i%3),f1=1+(i%(den-1)),f2=1+((i+1)%(den-1)),total=(w1+w2)*den+f1+f2,whole=Math.floor(total/den),rem=total%den;
    answer=rem?`${whole} ${g56Frac(rem,den)}`:String(whole);
    stem=`Add the mixed numbers ${w1} ${f1}/${den} + ${w2} ${f2}/${den}. Regroup and simplify when needed.`;
    wrongs=[`${w1+w2} ${g56Frac(Math.max(1,(f1+f2)%den),den)}`,`${whole+1} ${g56Frac(Math.max(1,rem),den)}`,g56Frac(total,den+1),String(w1+w2),g56Frac(total+1,den),`${Math.max(0,whole-1)} ${g56Frac(rem+1,den)}`]; why=`Combine whole and fractional parts, regroup ${den}/${den} when needed, and simplify to ${answer}.`;
  }else if(m==="g5volume"){
    const l=i+2,w=2+tier,h=3+(i%4); answer=String(l*w*h);
    stem=`A rectangular prism is ${l} units long, ${w} units wide, and ${h} units high. Determine its volume and connect the product to layers of unit cubes.`;
    wrongs=[String(2*(l*w+l*h+w*h)),String(l+w+h),String(l*w)]; why=`Volume is base area × height: ${l} × ${w} × ${h} = ${answer} cubic units.`;
  }else if(m==="g5coordinate"){
    const x=1+(i%9),y=2+((i*2)%8); answer=`(${x}, ${y})`;
    stem=`Starting at (0, 0), move ${x} units parallel to the x-axis and ${y} units parallel to the y-axis. Which ordered pair is reached?`;
    wrongs=[`(${y}, ${x})`,`(${x+y}, 0)`,`(0, ${x+y})`,`(${-x}, ${y})`,`(${x}, ${-y})`]; why=`The x-coordinate is the horizontal movement first; the y-coordinate is second.`;
  }else if(m==="g5patterns"){
    const mult=2+tier,start=i%4,term=start+mult*4; answer=String(term);
    stem=`The rule is y = ${mult}x + ${start}. What is y when x = 4, and which operation explains the pattern?`;
    wrongs=[String((mult+start)*4),String(mult+start+4),String(term+mult),String(term-mult),String(term+start+1)]; why=`Substitute 4: ${mult} × 4 + ${start} = ${term}.`;
  }else if(m==="g5word"){
    const boxes=3+tier,per=12+i,cost=2+(i%4),total=boxes*per*cost; answer=String(total);
    stem=`A school orders ${boxes} boxes with ${per} notebooks each. Every notebook costs $${cost}. What is the total cost? Represent the multi-step problem with an equation before solving.`;
    wrongs=[String(boxes+per+cost),String(boxes*per+cost),String(per*cost)]; why=`(${boxes} × ${per}) × ${cost} = ${total}.`;
  }else if(m==="ratio"){
    const a=2+(i%5),factor=2+tier,b=a*factor; answer=`${factor}:1`;
    stem=`A mixture uses ${b} cups of water for ${a} cups of concentrate. Express the simplified water-to-concentrate ratio.`;
    wrongs=[`${a}:${b}`,`${b+a}:1`,`1:${factor}`]; why=`Divide both terms ${b}:${a} by ${a} to get ${factor}:1.`;
  }else if(m==="integer"){
    const n=3+i,neg=i%2===0?-n:n; answer=String(Math.abs(neg));
    stem=`A value of ${neg} represents a position relative to zero. What is its absolute value?`;
    wrongs=[String(-Math.abs(neg)),String(neg+1),"0"]; why=`Absolute value is distance from zero, so |${neg}| = ${answer}.`;
  }else if(m==="expression"){
    const a=2+tier,b=i+3,c=2+(i%4),value=a*(b+c); answer=String(value);
    stem=`Evaluate ${a}(${b} + ${c}) and use the distributive property to identify an equivalent expression.`;
    wrongs=[String(a*b+c),String(a+b+c),String((a+b)*c),String(value+a),String(value-b),String(value+c)]; why=`${a}(${b}+${c}) = ${a*b}+${a*c} = ${value}.`;
  }else if(m==="ineqSolve"){
    const add=2+(i%7),bound=8+i,solution=bound-add; answer=`x ${i%2?"≤":"<"} ${solution}`;
    stem=`Solve x + ${add} ${i%2?"≤":"<"} ${bound}. Which inequality describes every solution?`;
    wrongs=[`x ${i%2?"≤":"<"} ${bound+add}`,`x ${i%2?"≥":">"} ${solution}`,`x = ${solution}`]; why=`Subtract ${add} from both sides to obtain ${answer}.`;
  }else if(m==="ineqGraph"){
    const point=i-8,symbol=i%2?"≤":">"; answer=symbol==="≤"?`closed point at ${point}, shaded left`:`open point at ${point}, shaded right`;
    stem=`How should x ${symbol} ${point} be represented on a number line?`;
    wrongs=[`open point at ${point}, shaded left`,`closed point at ${point}, shaded right`,`closed point at 0 with no shading`]; why=`${symbol==="≤"?"Including":"Excluding"} the boundary determines the point; the inequality determines shading.`;
  }else if(m==="ineqWrite"){
    const point=i-10,include=i%2===0; answer=`x ${include?"≥":">"} ${point}`;
    stem=`A number line has a ${include?"closed":"open"} point at ${point} and is shaded to the right. Which inequality matches it?`;
    wrongs=[`x ${include?"≤":"<"} ${point}`,`x ${include?">":"≥"} ${point+1}`,`x = ${point}`]; why=`Right means greater than; the ${include?"closed":"open"} point ${include?"includes":"excludes"} ${point}.`;
  }else if(m==="exponentWrite"){
    const base=2+(i%7),exp=2+tier; answer=`${base}^${exp}`;
    stem=`Write ${Array(exp).fill(base).join(" × ")} using an exponent.`;
    wrongs=[`${base*exp}^1`,`${exp}^${base}`,`${base} × ${exp}`,`${base}^${exp+1}`,`${base+1}^${exp}`]; why=`The base ${base} is used as a factor ${exp} times.`;
  }else if(m==="exponentEval"){
    const base=2+(i%5),exp=2+tier,value=base**exp; answer=String(value);
    stem=`Evaluate ${base}^${exp}. Do not multiply the base by the exponent.`;
    wrongs=[String(base*exp),String(base**(exp-1)),String(value+base),String(value-base),String(base+exp),String(value+1),String(value-1),String(value*2)]; why=`${base}^${exp} means ${Array(exp).fill(base).join(" × ")} = ${value}.`;
  }else if(m==="powersTen"){
    const exp=2+i; answer=`10^${exp}`;
    stem=`Write 1 followed by ${exp} zeros as a power of ten.`;
    wrongs=[`${exp}^10`,`10 × ${exp}`,`10^${exp-1}`,`10^${exp+1}`,`${exp} × 10`]; why=`10^${exp} is 1 followed by ${exp} zeros.`;
  }else if(m==="coordDescribe"){
    const x=i%2?-(i+1):i+1,y=i%3?i+2:-(i+2); const quad=x>0&&y>0?"Quadrant I":x<0&&y>0?"Quadrant II":x<0&&y<0?"Quadrant III":"Quadrant IV";
    answer=quad; stem=`In which quadrant is (${x}, ${y}) located? Use the signs of both coordinates.`;
    wrongs=["Quadrant I","Quadrant II","Quadrant III","Quadrant IV"].filter(q=>q!==quad); why=`The signs (${x>0?"positive":"negative"}, ${y>0?"positive":"negative"}) identify ${quad}.`;
  }else if(m==="coordObjects"){
    const x=(i%2?-1:1)*(i+1),y=(i%3?-1:1)*(i+2); answer=`(${x}, ${y})`;
    stem=`A sensor is ${Math.abs(x)} units ${x<0?"left":"right"} and ${Math.abs(y)} units ${y<0?"down":"up"} from the origin. Where is it?`;
    wrongs=[`(${y}, ${x})`,`(${-x}, ${y})`,`(${x}, ${-y})`]; why="Horizontal movement determines x; vertical movement determines y.";
  }else if(m==="coordGraph"){
    const x=(i%2?-1:1)*(i+2),y=(i%3?-1:1)*(i+1); answer=`move ${Math.abs(x)} ${x<0?"left":"right"}, then ${Math.abs(y)} ${y<0?"down":"up"}`;
    stem=`Which directions correctly graph (${x}, ${y}) from the origin?`;
    wrongs=[`move ${Math.abs(y)} ${y<0?"left":"right"}, then ${Math.abs(x)} ${x<0?"down":"up"}`,`move ${Math.abs(x)} ${x<0?"right":"left"}, then ${Math.abs(y)} ${y<0?"up":"down"}`,"remain at the origin"];
    why="The first coordinate controls horizontal motion; the second controls vertical motion.";
  }else if(m==="prime"){
    const nums=[11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89],n=nums[index]; answer="prime";
    stem=`Classify ${n} and justify the classification using factor pairs.`; wrongs=["composite","neither prime nor composite","even composite"]; why=`${n} has exactly two positive factors: 1 and ${n}.`;
  }else if(m==="factors"){
    const n=12+2*i; const factors=[]; for(let x=1;x<=n;x++)if(n%x===0)factors.push(x); answer=factors.join(", ");
    stem=`Which list contains every positive factor of ${n} and no nonfactors?`;
    wrongs=[`1, 2, ${n}`,`2, 4, ${n+2}`,`1, ${n-1}, ${n}`]; why=`Each listed factor divides ${n} with no remainder: ${answer}.`;
  }else if(m==="gcf"){
    const common=2+(i%6),a=common*(3+tier),b=common*(4+(i%3)); answer=String(g56Gcd(a,b));
    stem=`Find the greatest common factor of ${a} and ${b}. Use prime factors or factor lists to verify.`;
    wrongs=[String(common),String(g56Lcm(a,b)),"1",String(a),String(b),String(Number(answer)+common),String(Number(answer)*2)].filter(x=>x!==answer); why=`The greatest factor shared by ${a} and ${b} is ${answer}.`;
  }else if(m==="lcm"){
    const a=3+(i%5),b=4+(i%6),value=g56Lcm(a,b); answer=String(value);
    stem=`Find the least common multiple of ${a} and ${b}.`;
    wrongs=[String(a*b),String(g56Gcd(a,b)),String(value+a),String(value+b),String(value*2),String(Math.max(a,b)),String(value+1),String(Math.max(1,value-1)),String(value+3)]; why=`${value} is the first positive value appearing in both multiple lists.`;
  }else if(m==="unitRate"){
    const units=3+(i%7),rate=4+tier+i,quantity=units*rate; answer=`${rate} per 1`;
    stem=`A machine processes ${quantity} items in ${units} minutes. What is the unit rate?`;
    wrongs=[`${quantity} per 1`,`${units} per 1`,`${quantity+units} per 1`]; why=`${quantity} ÷ ${units} = ${rate} items per minute.`;
  }else if(m==="percent"){
    const perc=[10,20,25,40,50][index%5],whole=40+10*i,part=whole*perc/100; answer=g56Fmt(part);
    stem=`Find ${perc}% of ${whole}. Represent the percent as a decimal or fraction before multiplying.`;
    wrongs=[g56Fmt(whole+perc),g56Fmt(whole-perc),g56Fmt(part+10)]; why=`${perc/100} × ${whole} = ${answer}.`;
  }else if(m==="divideFractions"){
    const a=2+(i%5),b=3+(i%6),c=2+(tier%4),d=3+((i+2)%6); answer=g56Frac(a*d,b*c);
    stem=`Divide ${a}/${b} ÷ ${c}/${d}. Multiply by the reciprocal and simplify.`;
    wrongs=[g56Frac(a*c,b*d),g56Frac(a+c,b+d),g56Frac(a*d,b*d),g56Frac(b*c,a*d),g56Frac(a*d+1,b*c),g56Frac(a*d,b*c+1)]; why=`${a}/${b} × ${d}/${c} simplifies to ${answer}.`;
  }else if(m==="decimalOps"){
    const a=(i+15)/10,b=(i+4)/100; let value;
    if(tier===0){ const factor=2+(i%4); value=a*factor; stem=`Compute ${g56Fmt(a)} × ${factor}. Use place-value reasoning and estimate to verify.`; }
    else if(tier===1){ const divisor=2+(i%5),dividend=a*divisor; value=a; stem=`Compute ${g56Fmt(dividend)} ÷ ${divisor}. Verify by multiplying the quotient.`; }
    else if(tier===2){ value=a*b; stem=`Compute ${g56Fmt(a)} × ${g56Fmt(b)}. Determine the decimal placement from magnitude, not by guessing.`; }
    else { const divisor=2+(i%4),dividend=a*b*divisor; value=a*b; stem=`A total of ${g56Fmt(dividend)} units is divided equally among ${divisor} groups. Find each group's decimal quantity and verify by multiplication.`; }
    answer=g56Fmt(value); wrongs=g56NumericWrongs(answer); why=`Accurate place-value operations give ${answer}.`;
  }else if(m==="areaVolume"){
    const a=3+i,b=2+tier,c=3+(i%4);
    if(tier===0){
      const area=a*b; answer=String(area);
      stem=`A rectangle measures ${a} units by ${b} units. Determine its area and name the operation that models the rows and columns.`;
      wrongs=[String(2*(a+b)),String(a+b),String(a*b+c),String(area+a),String(Math.max(1,area-b)),String(a*b*2)]; why=`Rectangle area is length times width: ${a} × ${b} = ${area} square units.`;
    }else if(tier===1){
      const base=a*b,area=base/2; answer=g56Fmt(area);
      stem=`A triangle has base ${a} units and height ${b} units. Determine its area using one-half of the related parallelogram.`;
      wrongs=[String(base),String(a+b),g56Fmt(base/3),g56Fmt(area+a),g56Fmt(Math.max(1,area-b)),g56Fmt(base+1)]; why=`Triangle area is one-half base times height: (1/2)(${a})(${b}) = ${g56Fmt(area)} square units.`;
    }else if(tier===2){
      const h=3+(i%5),area=((a+b)*h)/2; answer=g56Fmt(area);
      stem=`A trapezoid has parallel bases ${a} and ${b} units and height ${h} units. Which value is its area?`;
      wrongs=[g56Fmt((a+b)*h),g56Fmt(a*b*h),g56Fmt(a+b+h),g56Fmt(area+h),g56Fmt(Math.max(1,area-b)),g56Fmt(a*b)]; why=`Trapezoid area is one-half the height times the sum of the bases: (1/2)(${h})(${a}+${b}) = ${g56Fmt(area)}.`;
    }else{
      const volume=a*b*c; answer=String(volume);
      stem=`A right rectangular prism has rational-number dimensions ${a}, ${b}, and ${c} units. Find its volume and verify the result from the base area and number of layers.`;
      wrongs=[String(2*(a*b+a*c+b*c)),String(a*b),String(a+b+c),String(volume+c),String(Math.max(1,volume-b)),String(a*b*(c+1))]; why=`The base area is ${a*b}; multiplying by ${c} layers gives ${a} × ${b} × ${c} = ${volume} cubic units.`;
    }
  }else if(m==="stats"){
    const data=[i,i+2,i+4,i+6,i+8]; const mean=i+4,range=8,median=i+4; answer=`mean ${mean}, median ${median}, range ${range}`;
    stem=`For the data set ${data.join(", ")}, calculate the mean, median, and range.`;
    wrongs=[`mean ${mean+1}, median ${median}, range ${range}`,`mean ${mean}, median ${median+2}, range ${range+2}`,`mean ${data.reduce((a,b)=>a+b,0)}, median ${median}, range ${data[4]}`]; why=`The sum divided by 5 is ${mean}; the middle value is ${median}; ${data[4]} − ${data[0]} = ${range}.`;
  }else throw new Error(`Unsupported Grade 5-6 math mode: ${m}`);
  return g56MC(spec,index,stem,answer,wrongs,why);
}

function g56Science(spec,index){
  const tier=Math.floor(index/5),phase=index%5;
  const prompts=[[
    `Which statement accurately explains ${spec.focus}?`,
    `Which real-world application best demonstrates ${spec.focus}?`,
    `Which observation provides the strongest evidence about ${spec.focus}?`,
    `Which systems-level connection best explains ${spec.focus}?`,
    `Which conclusion about ${spec.focus} is supported without overstating the evidence?`
  ],[
    `Which lesson principle should be applied when explaining ${spec.focus}?`,
    `Which example correctly applies ${spec.focus} in a real system?`,
    `Which lesson observation directly supports ${spec.focus}?`,
    `Which cause-and-effect connection follows from the evidence about ${spec.focus}?`,
    `Which conclusion follows from the lesson evidence about ${spec.focus}?`
  ],[
    `Which claim about ${spec.focus} is supported rather than assumed?`,
    `Which application of ${spec.focus} can be justified with the lesson evidence?`,
    `Which observation distinguishes evidence from a misconception about ${spec.focus}?`,
    `Which evidence-based connection explains how the parts of ${spec.focus} relate?`,
    `Which conclusion about ${spec.focus} uses the evidence without adding an assumption?`
  ],[
    `Which explanation of ${spec.focus} remains defensible after all lesson evidence is considered?`,
    `Which application of ${spec.focus} is supported by both the lesson principle and evidence?`,
    `Which observation provides the strongest basis for evaluating ${spec.focus}?`,
    `Which systems-level connection best integrates the lesson evidence about ${spec.focus}?`,
    `Which conclusion about ${spec.focus} accounts for the evidence without exceeding the model's limits?`
  ]];
  const answers=[spec.principle,spec.application,spec.evidence,spec.connection,spec.conclusion];
  const answer=answers[phase];
  const stem=prompts[tier][phase];
  return g56MC(spec,index,stem,answer,spec.misconceptions,`${answer} This matches ${spec.teks}: ${spec.expectation}`);
}

const G56_BUILDERS=Object.freeze({
  reading:g56Reading,
  vocabulary:g56Vocabulary,
  roots:g56Roots,
  figurative:g56Figurative,
  idiom:g56Idiom,
  grammar:g56Grammar,
  homophone:g56Homophone,
  themeDifference:g56ThemeDifference,
  math:g56Math,
  science:g56Science
});

/* Verbatim student-expectation text transcribed from the official TEA TAC PDFs above. */
const G56_EXACT_EXPECTATIONS=Object.freeze({
  "§110.7(b)(3)(B)":"use context within and beyond a sentence to determine the relevant meaning of unfamiliar words or multiple-meaning words;",
  "§110.7(b)(3)(C)":"identify the meaning of and use words with affixes such as trans-, super-, -ive, and -logy and roots such as geo and photo;",
  "§110.7(b)(6)(F)":"make inferences and use evidence to support understanding;",
  "§110.7(b)(9)(D)(i)":"the central idea with supporting evidence;",
  "§110.7(b)(10)(A)":"explain the author's purpose and message within a text;",
  "§110.7(b)(10)(B)":"analyze how the use of text structure contributes to the author's purpose;",
  "§110.7(b)(10)(D)":"describe how the author's use of imagery, literal and figurative language such as simile and metaphor, and sound devices achieves specific purposes;",
  "§110.7(b)(11)(D)(i)":"complete simple and compound sentences with subject-verb agreement and avoidance of splices, run-ons, and fragments;",
  "§110.7(b)(11)(D)(ii)":"past tense of irregular verbs;",
  "§110.7(b)(11)(D)(x)":"italics and underlining for titles and emphasis and punctuation marks, including quotation marks in dialogue and commas in compound and complex sentences;",
  "§110.22(b)(2)(B)":"use context such as definition, analogy, and examples to clarify the meaning of words;",
  "§110.22(b)(2)(C)":"determine the meaning and usage of grade-level academic English words derived from Greek and Latin roots such as mis/mit, bene, man, vac, scrib/script, and jur/jus;",
  "§110.22(b)(6)(C)":"use text evidence to support an appropriate response;",
  "§110.22(b)(6)(D)":"paraphrase and summarize texts in ways that maintain meaning and logical order;",
  "§110.22(b)(7)(A)":"infer multiple themes within and across texts using text evidence;",
  "§110.22(b)(8)(D)(i)":"the controlling idea or thesis with supporting evidence;",
  "§110.22(b)(9)(A)":"explain the author's purpose and message within a text;",
  "§110.22(b)(9)(B)":"analyze how the use of text structure contributes to the author's purpose;",
  "§110.22(b)(9)(D)":"describe how the author's use of figurative language such as metaphor and personification achieves specific purposes;",
  "§110.22(b)(9)(E)":"identify the use of literary devices, including omniscient and limited point of view, to achieve a specific purpose;",
  "§110.22(b)(9)(F)":"analyze how the author's use of language contributes to mood and voice;",
  "§110.22(b)(10)(C)":"revise drafts for clarity, development, organization, style, word choice, and sentence variety;",
  "§110.22(b)(10)(D)(i)":"complete complex sentences with subject-verb agreement and avoidance of splices, run-ons, and fragments;",
  "§110.22(b)(10)(D)(iv)":"prepositions and prepositional phrases and their influence on subject-verb agreement;",
  "§110.22(b)(10)(D)(v)":"pronouns, including relative;",
  "§110.22(b)(10)(D)(ix)":"correct spelling, including commonly confused terms such as its/it's, affect/effect, there/their/they're, and to/two/too;",
  "§111.7(b)(2)(A)":"represent the value of the digit in decimals through the thousandths using expanded notation and numerals;",
  "§111.7(b)(2)(B)":"compare and order two decimals to thousandths and represent comparisons using the symbols >, <, or =;",
  "§111.7(b)(3)(H)":"represent and solve addition and subtraction of fractions with unequal denominators referring to the same whole using objects and pictorial models and properties of operations;",
  "§111.7(b)(3)(K)":"add and subtract positive rational numbers fluently;",
  "§111.7(b)(4)(B)":"represent and solve multi-step problems involving the four operations with whole numbers using equations with a letter standing for the unknown quantity;",
  "§111.7(b)(4)(C)":"generate a numerical pattern when given a rule in the form y = ax or y = x + a and graph;",
  "§111.7(b)(4)(F)":"simplify numerical expressions that do not involve exponents, including up to two levels of grouping;",
  "§111.7(b)(6)(B)":"determine the volume of a rectangular prism with whole number side lengths in problems related to the number of layers times the number of unit cubes in the area of the base;"
});

function g56Eng(key,title,teks,expectation,kind,mode,grade){
  g56Register(key,{title,teks,expectation:G56_EXACT_EXPECTATIONS[teks]||expectation,kind,mode,source:G56_TEA_SOURCES[grade+"eng"]});
}

/* Grade 5 ELAR: each lesson is explicitly attached to a current student expectation. */
g56Eng("g5_eng_L1","Inference","§110.7(b)(6)(F)","make inferences and use evidence to support understanding","reading","inference","g5");
g56Eng("g5_eng_L2","Figurative Language","§110.7(b)(10)(D)","describe how imagery, literal and figurative language, and sound devices achieve specific purposes","figurative","effect","g5");
g56Eng("g5_eng_L3","Text Structure","§110.7(b)(10)(B)","analyze how the use of text structure contributes to the author's purpose","reading","structure","g5");
g56Eng("g5_eng_L4","Main Idea","§110.7(b)(9)(D)(i)","recognize the central idea of informational text with supporting evidence","reading","main","g5");
g56Eng("g5_eng_L5","Supporting Details","§110.7(b)(9)(D)(i)","recognize the central idea of informational text with supporting evidence","reading","detail","g5");
g56Eng("g5_eng_L6","Author's Purpose","§110.7(b)(10)(A)","explain the author's purpose and message within a text","reading","purpose","g5");
g56Eng("g5_eng_L7","Context Clues","§110.7(b)(3)(B)","use context within and beyond a sentence to determine relevant word meaning","vocabulary","context","g5");
g56Eng("g5_eng_L8","Synonyms and Antonyms","§110.7(b)(3)(B)","use context within and beyond a sentence to determine relevant word meaning","vocabulary","relation","g5");
g56Eng("g5_eng_L9","Prefixes and Suffixes","§110.7(b)(3)(C)","identify the meaning of and use words with affixes and roots","roots","prefix","g5");
g56Eng("g5_eng_L10","Subject and Predicate","§110.7(b)(11)(D)(i)","edit complete simple and compound sentences with subject-verb agreement and avoid fragments and run-ons","grammar","subject","g5");
g56Eng("g5_eng_L11","Verb Tense","§110.7(b)(11)(D)(ii)","edit drafts for correct past tense of irregular verbs","grammar","verb","g5");
g56Eng("g5_eng_L12","Punctuation","§110.7(b)(11)(D)(x)","edit punctuation including quotation marks and commas in compound and complex sentences","grammar","punctuation","g5");

/* Grade 6 ELAR */
g56Eng("g6_eng_L1","Theme and Summary","§110.22(b)(7)(A)","infer multiple themes within and across texts using text evidence","reading","theme","g6");
g56Eng("g6_eng_L2","Context Clues","§110.22(b)(2)(B)","use context such as definition, analogy, and examples to clarify word meaning","vocabulary","context","g6");
g56Eng("g6_eng_L3","Text Evidence","§110.22(b)(6)(C)","use text evidence to support an appropriate response","reading","evidence","g6");
g56Eng("g6_eng_L4","Main Idea Basics","§110.22(b)(8)(D)(i)","analyze the controlling idea or thesis with supporting evidence","reading","main","g6");
g56Eng("g6_eng_L5","Supporting Details","§110.22(b)(8)(D)(i)","analyze the controlling idea or thesis with supporting evidence","reading","detail","g6");
g56Eng("g6_eng_L6","Summarizing","§110.22(b)(6)(D)","paraphrase and summarize texts while maintaining meaning and logical order","reading","summary","g6");
g56Eng("g6_eng_L7","Theme vs Main Idea","§110.22(b)(7)(A)","infer multiple themes within and across texts using text evidence","themeDifference","theme","g6");
g56Eng("g6_eng_L8","Find the Best Title","§110.22(b)(8)(D)(i)","analyze the controlling idea or thesis with supporting evidence","reading","title","g6");
g56Eng("g6_eng_L9","Author's Purpose","§110.22(b)(9)(A)","explain the author's purpose and message within a text","reading","purpose","g6");
g56Eng("g6_eng_L10","Persuade Inform Explain","§110.22(b)(9)(A)","explain the author's purpose and message within a text","reading","purpose","g6");
g56Eng("g6_eng_L11","Tone Words","§110.22(b)(9)(F)","analyze how the author's use of language contributes to mood and voice","reading","tone","g6");
g56Eng("g6_eng_L12","Mood vs Tone","§110.22(b)(9)(F)","analyze how the author's use of language contributes to mood and voice","reading","mood","g6");
g56Eng("g6_eng_L13","Author's Viewpoint","§110.22(b)(9)(E)","identify literary point of view used to achieve a specific purpose","reading","viewpoint","g6");
g56Eng("g6_eng_L14","Cause and Effect","§110.22(b)(9)(B)","analyze how text structure contributes to the author's purpose","reading","cause","g6");
g56Eng("g6_eng_L15","Compare and Contrast","§110.22(b)(9)(B)","analyze how text structure contributes to the author's purpose","reading","structure","g6");
g56Eng("g6_eng_L16","Problem and Solution","§110.22(b)(9)(B)","analyze how text structure contributes to the author's purpose","reading","problem","g6");
g56Eng("g6_eng_L17","Sequence","§110.22(b)(9)(B)","analyze how text structure contributes to the author's purpose","reading","sequence","g6");
g56Eng("g6_eng_L18","Description","§110.22(b)(9)(B)","analyze how text structure contributes to the author's purpose","reading","detail","g6");
g56Eng("g6_eng_L19","Synonyms","§110.22(b)(2)(B)","use context such as definition, analogy, and examples to clarify word meaning","vocabulary","synonym","g6");
g56Eng("g6_eng_L20","Antonyms","§110.22(b)(2)(B)","use context such as definition, analogy, and examples to clarify word meaning","vocabulary","antonym","g6");
g56Eng("g6_eng_L21","Context Clues","§110.22(b)(2)(B)","use context such as definition, analogy, and examples to clarify word meaning","vocabulary","context","g6");
g56Eng("g6_eng_L22","Strong Word Choice","§110.22(b)(10)(C)","revise drafts for clarity, style, word choice, and sentence variety","vocabulary","strong","g6");
g56Eng("g6_eng_L23","Word Relationships","§110.22(b)(2)(B)","use context such as definition, analogy, and examples to clarify word meaning","vocabulary","relation","g6");
g56Eng("g6_eng_L24","Common Idioms","§110.22(b)(2)(B)","use context such as definition, analogy, and examples to clarify word meaning","idiom","idiom","g6");
g56Eng("g6_eng_L25","Idiom Meaning","§110.22(b)(2)(B)","use context such as definition, analogy, and examples to clarify word meaning","idiom","idiom","g6");
g56Eng("g6_eng_L26","Adages","§110.22(b)(2)(B)","use context such as definition, analogy, and examples to clarify word meaning","idiom","adage","g6");
g56Eng("g6_eng_L27","Proverbs","§110.22(b)(2)(B)","use context such as definition, analogy, and examples to clarify word meaning","idiom","proverb","g6");
g56Eng("g6_eng_L28","Figurative Language","§110.22(b)(9)(D)","describe how figurative language such as metaphor and personification achieves specific purposes","figurative","effect","g6");
g56Eng("g6_eng_L29","There Their They're","§110.22(b)(10)(D)(ix)","edit correct spelling including commonly confused terms","homophone","there","g6");
g56Eng("g6_eng_L30","To Too Two","§110.22(b)(10)(D)(ix)","edit correct spelling including commonly confused terms","homophone","to","g6");
g56Eng("g6_eng_L31","Your You're","§110.22(b)(10)(D)(ix)","edit correct spelling including commonly confused terms","homophone","your","g6");
g56Eng("g6_eng_L32","Its It's","§110.22(b)(10)(D)(ix)","edit correct spelling including commonly confused terms","homophone","its","g6");
g56Eng("g6_eng_L33","Mixed Homophones","§110.22(b)(10)(D)(ix)","edit correct spelling including commonly confused terms","homophone","mixed","g6");
g56Eng("g6_eng_L34","Preposition Basics","§110.22(b)(10)(D)(iv)","edit prepositions and prepositional phrases and their influence on subject-verb agreement","grammar","preposition","g6");
g56Eng("g6_eng_L35","Prepositional Phrases","§110.22(b)(10)(D)(iv)","edit prepositions and prepositional phrases and their influence on subject-verb agreement","grammar","phrase","g6");
g56Eng("g6_eng_L36","Location Words","§110.22(b)(10)(D)(iv)","edit prepositions and prepositional phrases and their influence on subject-verb agreement","grammar","preposition","g6");
g56Eng("g6_eng_L37","Time Words","§110.22(b)(10)(D)(iv)","edit prepositions and prepositional phrases and their influence on subject-verb agreement","grammar","preposition","g6");
g56Eng("g6_eng_L38","Preposition Review","§110.22(b)(10)(D)(iv)","edit prepositions and prepositional phrases and their influence on subject-verb agreement","grammar","phrase","g6");
g56Eng("g6_eng_L39","Root Basics","§110.22(b)(2)(C)","determine meaning and usage of academic words derived from Greek and Latin roots","roots","root","g6");
g56Eng("g6_eng_L40","Greek Roots","§110.22(b)(2)(C)","determine meaning and usage of academic words derived from Greek and Latin roots","roots","root","g6");
g56Eng("g6_eng_L41","Latin Roots","§110.22(b)(2)(C)","determine meaning and usage of academic words derived from Greek and Latin roots","roots","root","g6");
g56Eng("g6_eng_L42","Prefixes and Roots","§110.22(b)(2)(C)","determine meaning and usage of academic words derived from Greek and Latin roots","roots","prefix","g6");
g56Eng("g6_eng_L43","Word Meaning","§110.22(b)(2)(C)","determine meaning and usage of academic words derived from Greek and Latin roots","roots","meaning","g6");
g56Eng("g6_eng_L44","Direct Objects","§110.22(b)(10)(D)(i)","edit complete complex sentences with subject-verb agreement and avoid fragments and run-ons","grammar","direct","g6");
g56Eng("g6_eng_L45","Indirect Objects","§110.22(b)(10)(D)(i)","edit complete complex sentences with subject-verb agreement and avoid fragments and run-ons","grammar","indirect","g6");
g56Eng("g6_eng_L46","Object Practice","§110.22(b)(10)(D)(i)","edit complete complex sentences with subject-verb agreement and avoid fragments and run-ons","grammar","objects","g6");
g56Eng("g6_eng_L47","Sentence Parts","§110.22(b)(10)(D)(i)","edit complete complex sentences with subject-verb agreement and avoid fragments and run-ons","grammar","sentence","g6");
g56Eng("g6_eng_L48","Object Review","§110.22(b)(10)(D)(i)","edit complete complex sentences with subject-verb agreement and avoid fragments and run-ons","grammar","objects","g6");
g56Eng("g6_eng_L49","Pronoun Basics","§110.22(b)(10)(D)(v)","edit pronouns, including relative pronouns","grammar","pronoun","g6");
g56Eng("g6_eng_L50","Antecedents","§110.22(b)(10)(D)(v)","edit pronouns, including relative pronouns","grammar","pronoun","g6");
g56Eng("g6_eng_L51","Pronoun Agreement","§110.22(b)(10)(D)(v)","edit pronouns, including relative pronouns","grammar","pronoun","g6");
g56Eng("g6_eng_L52","Clear Pronouns","§110.22(b)(10)(D)(v)","edit pronouns, including relative pronouns","grammar","pronoun","g6");
g56Eng("g6_eng_L53","Pronoun Review","§110.22(b)(10)(D)(v)","edit pronouns, including relative pronouns","grammar","pronoun","g6");

function g56MathSpec(key,title,teks,expectation,mode,grade){
  g56Register(key,{title,teks,expectation:G56_EXACT_EXPECTATIONS[teks]||expectation,kind:"math",mode,source:G56_TEA_SOURCES[grade+"math"]});
}

/* Grade 5 mathematics */
g56MathSpec("g5_math_L1","Decimals","§111.7(b)(3)(K)","add and subtract positive rational numbers fluently","g5decimalops","g5");
g56MathSpec("g5_math_L2","Fraction Operations","§111.7(b)(3)(H)","represent and solve addition and subtraction of fractions with unequal denominators","g5fracops","g5");
g56MathSpec("g5_math_L3","Order of Operations","§111.7(b)(4)(F)","simplify numerical expressions without exponents, including two levels of grouping","g5order","g5");
g56MathSpec("g5_math_L4","Decimal Place Value","§111.7(b)(2)(A)","represent digit values in decimals through thousandths using expanded notation and numerals","g5place","g5");
g56MathSpec("g5_math_L5","Compare Decimals","§111.7(b)(2)(B)","compare and order decimals to thousandths using greater-than, less-than, and equal symbols","g5compare","g5");
g56MathSpec("g5_math_L6","Equivalent Fractions","§111.7(b)(3)(H)","represent and solve fraction addition and subtraction with unequal denominators using models and properties","g5equiv","g5");
g56MathSpec("g5_math_L7","Mixed Numbers","§111.7(b)(3)(K)","add and subtract positive rational numbers fluently","g5mixed","g5");
g56MathSpec("g5_math_L8","Volume","§111.7(b)(6)(B)","determine rectangular-prism volume using layers and unit cubes","g5volume","g5");
g56MathSpec("g5_math_L9","Coordinate Plane","§111.7(b)(8)(C)","graph first-quadrant ordered pairs from mathematical and real-world problems","g5coordinate","g5");
g56MathSpec("g5_math_L10","Patterns","§111.7(b)(4)(C)","generate and graph a numerical pattern from a rule of the form y=ax or y=x+a","g5patterns","g5");
g56MathSpec("g5_math_L11","Word Problems","§111.7(b)(4)(B)","represent and solve multi-step four-operation problems with equations and an unknown","g5word","g5");

/* Grade 6 mathematics */
g56MathSpec("g6_math_L1","Ratios","§111.26(b)(4)(C)","give examples of ratios as multiplicative comparisons of quantities with the same attribute","ratio","g6");
g56MathSpec("g6_math_L2","Integers","§111.26(b)(2)(B)","identify a number, its opposite, and its absolute value","integer","g6");
g56MathSpec("g6_math_L3","Expressions","§111.26(b)(7)(D)","generate equivalent expressions using properties of operations","expression","g6");
g56MathSpec("g6_math_L4","Solutions to Inequalities","§111.26(b)(10)(A)","model and solve one-variable, one-step equations and inequalities","ineqSolve","g6");
g56MathSpec("g6_math_L5","Graph Inequalities on Number Lines","§111.26(b)(9)(B)","represent solutions for one-variable, one-step equations and inequalities on number lines","ineqGraph","g6");
g56MathSpec("g6_math_L6","Write Inequalities from Number Lines","§111.26(b)(9)(A)","write one-variable, one-step inequalities representing constraints or conditions","ineqWrite","g6");
g56MathSpec("g6_math_L7","Write Multiplication Expressions Using Exponents","§111.26(b)(7)(A)","generate equivalent numerical expressions using order of operations and whole-number exponents","exponentWrite","g6");
g56MathSpec("g6_math_L8","Evaluate Powers with Whole Number Bases","§111.26(b)(7)(A)","generate equivalent numerical expressions using order of operations and whole-number exponents","exponentEval","g6");
g56MathSpec("g6_math_L9","Write Powers of Ten with Exponents","§111.26(b)(7)(A)","generate equivalent numerical expressions using order of operations and whole-number exponents","powersTen","g6");
g56MathSpec("g6_math_L10","Describe the Coordinate Plane","§111.26(b)(11)","graph points in all four quadrants using ordered pairs of rational numbers","coordDescribe","g6");
g56MathSpec("g6_math_L11","Objects on a Coordinate Plane","§111.26(b)(11)","graph points in all four quadrants using ordered pairs of rational numbers","coordObjects","g6");
g56MathSpec("g6_math_L12","Graph Points on a Coordinate Plane","§111.26(b)(11)","graph points in all four quadrants using ordered pairs of rational numbers","coordGraph","g6");
g56MathSpec("g6_math_L13","Prime or Composite","§111.26(b)(7)(A)","generate equivalent numerical expressions using prime factorization","prime","g6");
g56MathSpec("g6_math_L14","Identify Factors","§111.26(b)(7)(A)","generate equivalent numerical expressions using prime factorization","factors","g6");
g56MathSpec("g6_math_L15","Greatest Common Factor","§111.26(b)(7)(A)","generate equivalent numerical expressions using prime factorization","gcf","g6");
g56MathSpec("g6_math_L16","Least Common Multiple","§111.26(b)(7)(A)","generate equivalent numerical expressions using prime factorization","lcm","g6");
g56MathSpec("g6_math_L17","Unit Rates","§111.26(b)(4)(D)","give examples of rates as comparisons by division of quantities with different attributes","unitRate","g6");
g56MathSpec("g6_math_L18","Percent of a Number","§111.26(b)(5)(B)","solve real-world percent problems to find a whole, part, or percent","percent","g6");
g56MathSpec("g6_math_L19","Divide Fractions","§111.26(b)(3)(A)","recognize that division by a rational number is equivalent to multiplication by its reciprocal","divideFractions","g6");
g56MathSpec("g6_math_L20","Decimal Operations","§111.26(b)(3)(E)","multiply and divide positive rational numbers fluently","decimalOps","g6");
g56MathSpec("g6_math_L21","Area and Volume Applications","§111.26(b)(8)(D)","determine solutions for problems involving areas of rectangles, parallelograms, trapezoids, and triangles and volumes of right rectangular prisms with positive rational dimensions","areaVolume","g6");
g56MathSpec("g6_math_L22","Mean, Median and Range","§111.26(b)(12)(C)","summarize numeric data using mean, median, range, and interquartile range","stats","g6");

function g56Sci(key,title,teks,expectation,focus,principle,application,evidence,connection,conclusion,misconceptions,grade){
  g56Register(key,{title,teks,expectation:G56_EXACT_EXPECTATIONS[teks]||expectation,focus,principle,application,evidence,connection,conclusion,misconceptions,kind:"science",source:G56_TEA_SOURCES[grade+"sci"]});
}

/* Grade 5 science, adopted 2021 and implemented beginning in 2024-25. */
g56Sci("g5_sci_L1","Solar System","§112.7(b)(9)","demonstrate Earth's approximately 24-hour rotation and explain the day/night cycle and changing shadow positions",
  "Earth's rotation in the Sun-Earth system","Earth rotates once on its axis in about 24 hours.","Use a globe and fixed lamp to model daylight on one side and darkness on the other.","Repeated shadow measurements change predictably across one day.","As Earth rotates, a location faces toward and then away from the Sun, producing day and night.","The repeating light and shadow pattern supports a rotational, not a daily orbit, explanation.",
  ["The Sun circles Earth once each day.","Earth completes one solar orbit every 24 hours.","Night occurs because clouds block all sunlight."],"g5");
g56Sci("g5_sci_L2","Cells as Systems","§112.7(b)(5)(D)","examine and model system parts and their interdependence in system function",
  "a cell represented as an interdependent system","A system's function depends on interactions among its parts, not merely a list of parts.","Use a labeled cell model to trace how boundary, internal material, and energy-releasing structures interact.","Disrupting one modeled component changes the behavior of the whole model.","A cell model is useful when it shows relationships, but its scale and materials limit what it can represent.","Evidence about interacting parts supports describing a cell as a system while recognizing model limitations.",
  ["Every part works independently of all others.","A model is identical to the real cell at every scale.","Removing any component can never affect system function."],"g5");
g56Sci("g5_sci_L3","Mixtures and Solutions","§112.7(b)(6)(C)","compare substance properties before and after forming a solution and demonstrate conservation of matter",
  "solutions and conservation of matter","Dissolving changes how particles are distributed but does not make the dissolved matter disappear.","Measure solute and water before combining them, then account for the total matter in the solution.","Recovering dissolved salt after water evaporates shows that the salt remained present.","A solution can have properties different from its ingredients while conserving the matter added.","Mass and recovery evidence support conservation in a solution even when a component is no longer visible.",
  ["Dissolved matter stops existing.","A solution always has less matter than its ingredients.","Only color can determine whether matter is conserved."],"g5");
g56Sci("g5_sci_L4","Earth's Rotation","§112.7(b)(9)","demonstrate Earth's approximately 24-hour rotation and explain day/night and changing shadows",
  "rotation, day/night, and shadow position","Earth's axial rotation causes predictable daily patterns of light and shadow.","Mark a globe location and rotate it past a fixed lamp to model sunrise, noon, sunset, and night.","A shadow's direction and length change in a repeating sequence during daylight.","The apparent motion of the Sun is explained by Earth's rotation, not by the Sun traveling around Earth daily.","A rotating-Earth model explains both the day/night cycle and systematic shadow changes.",
  ["Earth remains still while the Sun orbits it daily.","Shadows change only because objects grow.","Earth rotates once each year."],"g5");
g56Sci("g5_sci_L5","Weather and Climate","§112.7(b)(10)(A)","explain how the Sun and ocean interact in the water cycle and affect weather",
  "Sun-ocean interactions that affect weather","Solar energy warms ocean water and drives evaporation, supplying water vapor to the atmosphere.","Compare coastal air conditions after periods of strong and weak solar heating.","Rising water vapor followed by condensation and precipitation links ocean heating to weather.","Changing solar input affects evaporation, cloud formation, and short-term weather patterns.","Weather evidence is best explained through energy from the Sun and water cycling between ocean and atmosphere.",
  ["The ocean creates weather without energy input.","Evaporation occurs only when water boils.","Weather and climate mean exactly the same thing."],"g5");
g56Sci("g5_sci_L6","Water Cycle","§112.7(b)(10)(A)","explain how the Sun and ocean interact in the water cycle and affect weather",
  "energy and matter in the water cycle","The Sun supplies energy for evaporation while water matter cycles through evaporation, condensation, precipitation, and collection.","Model ocean water warming, vapor cooling into droplets, and water returning to a collection area.","The amount of water remains in the model while its state and location change.","Greater solar heating can increase evaporation and influence cloud and precipitation patterns.","A complete explanation tracks both energy input and conserved water through the cycle.",
  ["Water is destroyed during evaporation.","Condensation changes liquid directly into vapor.","The water cycle operates without solar energy."],"g5");
g56Sci("g5_sci_L7","Plant Systems","§112.7(b)(13)(A)","analyze structures and functions of species to identify how organisms survive in the same environment",
  "plant structures and survival functions","A plant structure contributes to survival through a specific function within its environment.","Compare waxy leaves that limit water loss with broad leaves that capture light in shaded habitats.","Plants with structure-function matches survive and reproduce more successfully under those conditions.","Changing water or light availability changes which structures provide the strongest advantage.","Structure, function, and environmental evidence together explain survival better than appearance alone.",
  ["Every plant structure serves the same function.","Plant survival never depends on environmental conditions.","A structure's color alone proves its function."],"g5");
g56Sci("g5_sci_L8","Food Webs","§112.7(b)(12)(B)","predict how ecosystem changes affect cycling of matter and flow of energy in a food web",
  "matter cycling and energy flow in food webs","Energy enters through producers and moves to consumers, while matter is recycled through organisms and decomposers.","Predict effects on hawks and plants after a major decrease in a shared prey population.","Population data before and after a food-web change show linked effects across trophic relationships.","Removing one population can alter several pathways because organisms have interconnected feeding relationships.","A supported prediction traces a change through multiple food-web links and distinguishes energy flow from matter cycling.",
  ["Energy cycles endlessly back to the Sun.","Changing one population can affect only that species.","Decomposers remove matter permanently from the ecosystem."],"g5");
g56Sci("g5_sci_L9","Physical Changes","§112.7(b)(6)(C)","compare properties before and after substances combine in a solution and demonstrate conservation of matter",
  "physical changes and conservation of matter","A physical change can alter state, size, or distribution without creating a new substance.","Dissolve, freeze, melt, or separate a substance and compare measurable properties before and after.","Recovering the original substance or conserving measured matter supports classification as a physical change.","Changing state can change visible form while particle identity and total matter remain conserved.","Multiple property measurements provide stronger evidence of physical change than appearance alone.",
  ["Every visible change creates a new substance.","Matter is lost whenever a solid melts.","Color is the only property relevant to classifying change."],"g5");
g56Sci("g5_sci_L10","Force and Motion","§112.7(b)(7)(A)","investigate and explain how equal and unequal forces cause patterns of motion and energy transfer",
  "equal and unequal forces acting on objects","Equal opposing forces produce zero net force; unequal forces can change an object's motion.","Compare a cart pulled equally in opposite directions with a cart experiencing a larger force on one side.","Measured motion changes when the forces become unequal but remains stable when net force is zero.","Changing one force changes net force, which changes the motion pattern and energy transfer.","Force diagrams and motion data together support conclusions about balanced and unbalanced interactions.",
  ["Any force guarantees motion in the force's direction.","Balanced forces always make an object speed up.","Force has no relationship to energy transfer."],"g5");
g56Sci("g5_sci_L11","Forms of Energy","§112.7(b)(8)(A)","investigate and describe energy transformations in systems",
  "energy transformations within systems","Energy changes form as it moves through a system rather than appearing from nothing.","Trace chemical energy in a battery to electrical energy and then to light and thermal energy in a flashlight.","Light output, warming, and battery changes provide evidence of transformation and transfer.","Changing a system component can redirect how much energy becomes light, motion, sound, or thermal energy.","A valid energy model identifies input, transformations, outputs, and energy that spreads to the surroundings.",
  ["A device creates energy from nothing.","Energy can have only one form in a system.","Thermal energy is unrelated to system outputs."],"g5");

/* Grade 6 science */
g56Sci("g6_sci_L1","Cells and Organelles","§112.26(b)(13)(A)","describe cell theory's development and explain that cells are the basic unit and arise from pre-existing cells",
  "cell theory","All organisms are made of one or more cells, cells are basic units of structure and function, and cells come from pre-existing cells.","Use microscope observations and historical evidence to evaluate a claim about how new cells form.","Repeated observations show cells dividing and no verified case of a cell appearing from nonliving material under controlled conditions.","New imaging evidence refined cell theory while preserving its evidence-supported core ideas.","Cell theory is a durable explanation supported by converging observations, not an unsupported guess.",
  ["Cells routinely appear from nonliving matter.","Only animals are composed of cells.","A scientific theory is merely a personal opinion."],"g6");
g56Sci("g6_sci_L2","Energy","§112.26(b)(8)(B)","describe conservation of energy through transfers and transformations in systems",
  "energy conservation","Total energy is conserved as energy transfers between objects and transforms among forms.","Trace energy from a battery through a circuit into light and thermal outputs.","Measuring several outputs reveals energy that a model might incorrectly label as lost.","When one output decreases, energy may be stored or transferred through another pathway rather than destroyed.","A complete system model accounts for inputs, transformations, transfers, storage, and dispersed thermal energy.",
  ["Energy disappears when a device stops.","Systems create extra energy without an input.","Only visible motion counts as energy."],"g6");
g56Sci("g6_sci_L3","Rock Cycle","§112.26(b)(10)(C)","describe how metamorphic, igneous, and sedimentary rocks form and change through rock-cycle processes",
  "rock-cycle processes","Cooling magma forms igneous rock, compacted sediments form sedimentary rock, and heat and pressure form metamorphic rock.","Use a process diagram to trace one possible path from igneous rock to sediment and then sedimentary rock.","Texture, layering, crystals, and formation setting provide evidence about rock history.","Any rock type can change along multiple paths when melting, cooling, weathering, deposition, heat, or pressure conditions change.","The rock cycle is a network of geologic processes rather than a single fixed circular sequence.",
  ["Every rock follows one required sequence.","Weathering directly creates magma.","Heat and pressure always melt rock completely."],"g6");
g56Sci("g6_sci_L4","Rock Classification","§112.26(b)(10)(C)","describe formation and change of metamorphic, igneous, and sedimentary rocks",
  "classifying rocks by formation evidence","Rock classification depends on evidence of formation processes, not color alone.","Classify a layered rock with cemented grains as sedimentary and connect its texture to deposition and compaction.","Interlocking crystals, foliation, or cemented layers provide more useful evidence than a single surface color.","A later metamorphic process can alter an earlier sedimentary or igneous rock while preserving clues to its history.","Multiple observations should support a rock classification and acknowledge uncertainty when diagnostic features are missing.",
  ["All dark rocks are igneous.","Rock type is determined only by where it was found.","Metamorphic rock must have been fully melted."],"g6");
g56Sci("g6_sci_L5","Estimate Temperatures","§112.26(b)(1)(E)","collect quantitative data using SI units and qualitative data as evidence",
  "measuring temperature as scientific evidence","Temperature data should be measured with an appropriate instrument, recorded in an SI-compatible unit, and reported with reasonable precision.","Select a Celsius thermometer with a suitable range before estimating and then measuring water temperature.","Repeated Celsius measurements near the estimate reveal both accuracy and variation.","Changing instrument resolution changes justified precision but not the actual thermal condition being measured.","An estimate is useful for checking reasonableness, while the calibrated measurement supplies quantitative evidence.",
  ["A touch estimate is always more precise than a thermometer.","Units can be omitted without changing a measurement.","More decimal places always guarantee greater accuracy."],"g6");
g56Sci("g6_sci_L6","Distance Units","§112.26(b)(1)(E)","collect quantitative data using the International System of Units as evidence",
  "selecting SI distance units","The unit and tool should match the scale of the object or distance being measured.","Use millimeters for a thin object, centimeters for a notebook, meters for a room, and kilometers for a long route.","Measurements taken with an appropriately scaled metric tool are easier to compare and reproduce.","Changing units changes the numerical representation but not the physical distance when conversion is correct.","A defensible measurement reports value, SI unit, tool, and precision instead of relying on an unlabeled estimate.",
  ["Use kilometers for the thickness of a coin.","Changing from meters to centimeters changes the actual length.","A number without a unit is a complete measurement."],"g6");
g56Sci("g6_sci_L7","Metric Measurement","§112.26(b)(1)(E)","collect quantitative data using SI units and qualitative data as evidence",
  "metric distance, mass, and volume measurement","Length, mass, and volume require different tools and appropriate metric units.","Use a metric ruler for length, a balance for mass, and a graduated cylinder for liquid volume.","Repeated trials with labeled SI units allow comparison and help identify measurement variation.","Choosing the wrong tool or reading the scale from an angle introduces systematic error into the data.","High-quality quantitative evidence includes an appropriate tool, unit, repeated measurements, and justified precision.",
  ["A ruler directly measures liquid volume.","A balance measures length in centimeters.","Units and tool choice do not affect data quality."],"g6");
g56Sci("g6_sci_L8","Plant Cell Models","§112.26(b)(5)(F)","analyze the complementary relationship between structure and function in organisms and systems",
  "structure and function in a plant-cell model","A structure's shape, location, and interactions help explain its function within the system.","Use a model to connect a boundary, energy-processing parts, and storage regions to coordinated cell function.","A model that shows interactions predicts effects of disrupting a part better than a list of labels.","Changing one modeled component can affect resource movement or energy availability across the whole system.","A useful model explains structure-function relationships while identifying limits in scale and material.",
  ["Every cell structure performs the same function.","A cell model has no limitations.","Structure provides no evidence about possible function."],"g6");
g56Sci("g6_sci_L9","Animal Cell Models","§112.26(b)(5)(F)","analyze the complementary relationship between structure and function in organisms and systems",
  "structure and function in an animal-cell model","Cell functions emerge from interacting structures within a bounded system.","Trace how materials cross a modeled boundary and are processed or stored inside the system.","A disruption followed by a measurable system change supports an interdependence claim.","The same basic function can be supported by structures that differ in size, number, or arrangement.","Structure-function explanations require evidence of interaction and should not treat the model as a perfect copy.",
  ["Cell parts function without interacting.","The largest structure must perform every function.","Models reproduce every molecular detail exactly."],"g6");
g56Sci("g6_sci_L10","Compare Cells","§112.26(b)(13)(B)","identify and compare prokaryotic/eukaryotic, unicellular/multicellular, and autotrophic/heterotrophic organisms",
  "basic organism and cell characteristics","Prokaryotic and eukaryotic describe cell organization; unicellular and multicellular describe cell number; autotrophic and heterotrophic describe resource acquisition.","Classify an organism using evidence about internal cell organization, number of cells, and how it obtains energy-rich matter.","Microscope structure, cell count, and nutrition data support three separate but related classifications.","Changing one characteristic does not automatically determine the other two categories.","Accurate comparison uses evidence for each classification axis rather than assuming all traits occur in fixed bundles.",
  ["All unicellular organisms are autotrophs.","Every prokaryote is multicellular.","Cell number and method of obtaining food are identical traits."],"g6");
g56Sci("g6_sci_L11","Calculate Speed","§112.26(b)(2)(C)","use mathematical calculations to assess quantitative relationships in scientific data",
  "speed as a distance-time relationship","Average speed is distance divided by elapsed time, with both quantities measured in compatible units.","Calculate and compare speeds from repeated distance and time trials rather than choosing the greatest distance alone.","A distance-time table with consistent units supports a reproducible speed calculation.","For fixed distance, less time means greater average speed; for fixed time, more distance means greater speed.","A valid conclusion shows the calculation, labels units, compares trials, and notes that average speed may hide changes during a trip.",
  ["Speed equals distance multiplied by time.","The farthest object is always fastest regardless of time.","A speed value needs no units."],"g6");
g56Sci("g6_sci_L12","Calculate Distance","§112.26(b)(2)(C)","use mathematical calculations to assess quantitative relationships in scientific data",
  "distance from speed and time","For constant average speed, distance equals speed multiplied by elapsed time.","Predict travel distance from a measured speed and time, then compare the prediction with a trial.","Matching units and repeated measurements support the calculated distance relationship.","Doubling time at constant speed doubles distance; changing speed at fixed time changes distance proportionally.","A strong model states the constant-speed assumption and evaluates differences between predicted and measured distance.",
  ["Distance equals speed divided by time in every case.","Doubling time halves distance at constant speed.","Units never need to be converted before calculation."],"g6");
g56Sci("g6_sci_L13","Newton's Third Law","§112.26(b)(7)(C)","identify equal-magnitude, opposite-direction simultaneous force pairs from object interactions",
  "Newton's Third Law force pairs","When two objects interact, each exerts a force on the other that is equal in magnitude and opposite in direction.","Identify the floor pushing upward on a student as the partner to the student pushing downward on the floor.","Two force sensors between interacting carts record equal magnitudes in opposite directions at the same time.","The paired forces act on different objects, so they do not cancel as forces on one object.","Interaction evidence supports simultaneous equal-and-opposite pairs even when the objects accelerate differently because their masses differ.",
  ["The larger object exerts a force but receives none.","Third-law force pairs act on the same object and cancel.","The reaction force begins after the action force ends."],"g6");
g56Sci("g6_sci_L14","Balanced and Unbalanced Forces","§112.26(b)(7)(B)","calculate net force and determine whether horizontal or vertical forces are balanced",
  "net force and force balance","Forces are balanced when their vector sum is zero and unbalanced when net force is not zero.","Add forces with direction from a diagram to determine net force and predict a motion change.","A force diagram paired with measured acceleration provides evidence of an unbalanced net force.","Changing one force can turn a balanced system into an unbalanced one and alter motion.","Net-force calculations support conclusions about balance; speed alone does not reveal whether net force is currently zero.",
  ["Balanced forces require that no forces act.","An object moving at constant velocity must have unbalanced forces.","Add opposite-direction force magnitudes without considering direction."],"g6");
g56Sci("g6_sci_L15","Atoms and Elements","§112.26(b)(6)(C)","identify periodic-table elements as metals, nonmetals, metalloids, and rare Earth elements using properties and importance",
  "elements and periodic-table property groups","An element is classified using its position and physical properties such as conductivity, luster, and brittleness.","Use observed properties and a periodic-table location to distinguish a metal, nonmetal, or metalloid.","Multiple property tests are stronger evidence than color alone for classifying an unknown element.","An element's category helps predict uses, but individual elements can vary within a broad group.","A supported classification integrates periodic position, measured properties, and limitations of the sample tests.",
  ["Every shiny substance is a metal element.","All elements have identical properties.","Color alone determines periodic-table classification."],"g6");
g56Sci("g6_sci_L16","Density","§112.26(b)(6)(D)","compare densities of substances relative to various fluids",
  "relative density in fluids","An object sinks when its average density is greater than the fluid and floats when it is less, under comparable conditions.","Place the same sample in fluids of different density and predict where it will sink or float.","Consistent floating and sinking observations across repeated trials provide relative-density evidence.","Changing fluid density can change the sample's position even though the sample's own mass and volume remain the same.","Floating behavior establishes relative, not necessarily exact numerical, density unless mass and volume are also measured.",
  ["Heavy objects always sink regardless of volume or fluid.","A sample's density changes merely because it enters another fluid.","One floating observation gives an exact density value."],"g6");
g56Sci("g6_sci_L17","Thermal Energy and Particle Motion","§112.26(b)(6)(A)","compare solids, liquids, and gases by structure, shape, volume, and particle kinetic energy",
  "particle motion in states of matter","Particles in all states move, and average kinetic energy generally increases as thermal conditions increase.","Use a particle model to compare tightly arranged solid particles with flowing liquid particles and widely separated gas particles.","Temperature and expansion observations support changes in average particle motion.","Adding thermal energy can increase motion and contribute to state change without changing particle identity.","A particle model explains macroscopic shape and volume patterns but does not show particles at true scale.",
  ["Particles in a solid never move.","Gas particles have no mass or volume.","Heating always creates a new substance."],"g6");
g56Sci("g6_sci_L18","Waves","§112.26(b)(8)(C)","explain energy transfer through transverse and longitudinal waves",
  "energy transfer by waves","Waves transfer energy through a medium or field without transporting the same matter from source to destination.","Compare transverse motion perpendicular to travel with longitudinal compressions parallel to travel.","A marked particle oscillates near its position while a pulse moves along the medium.","Changing amplitude affects transferred energy while wave type describes the direction of disturbance.","Evidence from particle motion and pulse travel distinguishes energy transfer from bulk matter transport.",
  ["A wave carries every particle permanently to the destination.","All waves are longitudinal.","Amplitude and energy are completely unrelated."],"g6");
g56Sci("g6_sci_L19","Ecosystems","§112.26(b)(12)(B)","describe predatory, competitive, and symbiotic relationships including mutualism, parasitism, and commensalism",
  "ecological relationships","Organism interactions can benefit, harm, or have little effect on each participant and must be classified from evidence.","Use outcome data for both species to distinguish mutualism, parasitism, commensalism, competition, and predation.","Changes in survival or resource access for each participant reveal the relationship more reliably than proximity alone.","Changing resource availability can shift competition intensity and alter population relationships.","Classifications should identify effects on both organisms and allow that relationships can depend on environmental context.",
  ["Any two nearby organisms are mutualists.","Predation benefits prey equally.","Competition occurs only between different species."],"g6");
g56Sci("g6_sci_L20","Photosynthesis and Respiration","§112.26(b)(8)(B)","describe conservation of energy through transfers and transformations in systems such as photosynthesis and food webs",
  "energy transformations in photosynthesis and food systems","Photosynthesis transforms light energy into stored chemical energy that can later transfer through organisms and respiration.","Trace energy from sunlight to plant matter and then to an organism using that matter.","Growth, gas-exchange, and energy-use data support a transformation-and-transfer model.","Matter cycles through the system while energy enters, transforms, transfers, and eventually disperses as thermal energy.","A complete model distinguishes matter cycling from one-way energy transfer and does not claim that plants create energy.",
  ["Plants create energy from nothing.","Matter and energy follow exactly the same path forever.","Respiration occurs only in animals."],"g6");
g56Sci("g6_sci_L21","Weather and Climate Data","§112.26(b)(5)(A)","identify and apply patterns to understand and connect scientific phenomena",
  "weather and climate data patterns","Weather describes short-term conditions, while climate patterns require observations over long periods.","Compare daily measurements with multi-decade averages before labeling a result as weather or climate evidence.","A long, consistent record across comparable stations is stronger climate evidence than one unusual day.","A short-term event can occur within a long-term climate trend without disproving that trend.","A valid conclusion matches the time scale of the evidence and reports uncertainty and possible data limitations.",
  ["One cold day defines the region's climate.","Weather and climate are identical time scales.","Long-term patterns can be inferred from one measurement."],"g6");
g56Sci("g6_sci_L22","Earth's Systems","§112.26(b)(10)(A)","differentiate the biosphere, hydrosphere, atmosphere, and geosphere and identify components",
  "interactions among Earth's spheres","The geosphere, hydrosphere, atmosphere, and biosphere are distinct but interacting Earth systems.","Trace how rain in the atmosphere enters the hydrosphere, changes soil in the geosphere, and supports the biosphere.","Measurements from more than one sphere reveal connected causes and effects.","A change in one sphere can transfer matter or energy and alter conditions in the others.","Systems evidence supports analyzing interactions rather than treating each Earth sphere as isolated.",
  ["Earth's spheres never exchange matter or energy.","The atmosphere includes all solid rock.","Living organisms belong only to the hydrosphere."],"g6");

g56Sci("g6_sci_L23","What Is Energy?","§112.26(b)(8)(A)","compare gravitational, elastic, and chemical potential energies with kinetic energy",
  "potential and kinetic energy","Kinetic energy is associated with motion, while potential energy is stored because of position, shape, or chemical arrangement.","Classify a moving cart as kinetic and a raised, compressed, or fuel-containing system as having potential energy.","Motion measurements support kinetic-energy claims; height, deformation, or chemical state support potential-energy claims.","A system can transform potential energy into kinetic energy while total energy remains accounted for.","Energy classification depends on system evidence and can include more than one form at the same time.",
  ["Only moving objects have any energy.","Potential energy is energy that has vanished.","Kinetic and potential energy can never transform."],"g6");
g56Sci("g6_sci_L24","Kinetic Energy","§112.26(b)(8)(A)","compare gravitational, elastic, and chemical potential energies with kinetic energy",
  "kinetic energy","An object's kinetic energy is associated with its motion and changes when motion or mass changes.","Compare moving objects under controlled conditions rather than labeling a stationary object as kinetic.","Measured motion provides direct evidence that a system has kinetic energy.","When stored energy makes an object move, energy transforms into kinetic energy and may also transfer thermally.","Motion evidence supports a kinetic-energy claim, but a complete model also accounts for other simultaneous forms.",
  ["A stationary object has kinetic energy because it might move later.","Kinetic energy is stored only in chemical bonds.","Motion transfers matter but never energy."],"g6");
g56Sci("g6_sci_L25","Potential Energy","§112.26(b)(8)(A)","compare gravitational, elastic, and chemical potential energies with kinetic energy",
  "gravitational, elastic, and chemical potential energy","Potential energy can be stored by height in a gravitational system, deformation in an elastic system, or chemical arrangement.","Compare a raised mass, stretched band, and charged battery as systems storing different forms of potential energy.","Height, deformation, and chemical-state measurements provide form-specific evidence.","Releasing a constraint can transform stored potential energy into kinetic and other energy forms.","A defensible classification identifies the system interaction responsible for storage rather than calling all nonmoving objects identical.",
  ["Potential energy exists only in moving objects.","Every stationary object stores the same energy.","Stored energy is destroyed when released."],"g6");
g56Sci("g6_sci_L26","Energy Transformations","§112.26(b)(8)(B)","describe conservation of energy through transfers and transformations in systems",
  "energy transformation pathways","Energy changes form and transfers across system boundaries while total energy remains conserved.","Trace an amusement ride from gravitational potential energy to kinetic, sound, and thermal energy.","Measurements of height, speed, sound, and temperature account for several energy pathways.","Friction redirects some mechanical energy into thermal energy rather than destroying it.","A complete transformation diagram includes useful and dispersed outputs and defines the system boundary.",
  ["Friction destroys energy.","Only the desired output belongs in an energy model.","Energy transformation increases total energy without an input."],"g6");
g56Sci("g6_sci_L27","Real-World Energy","§112.26(b)(8)(B)","describe conservation of energy through transfers and transformations in real systems",
  "energy in real-world systems","Real systems have multiple transfers and transformations, including outputs that spread to the environment.","Analyze an electrical circuit, food web, or amusement ride by identifying input, storage, transfer, and output.","Quantitative output and environmental measurements reveal energy pathways missed by a simple diagram.","Improving efficiency changes the fraction reaching a desired output but does not violate conservation.","Evidence-based energy accounting explains both desired performance and thermal, sound, or motion outputs.",
  ["Efficiency above 100% is possible without input.","Unwanted thermal energy is destroyed energy.","Real systems contain only one energy form."],"g6");
g56Sci("g6_sci_L28","Body Systems","§112.26(b)(5)(D)","examine and model system parts and their interdependence in system function",
  "body systems as interdependent models","Organ systems contain interacting parts and exchange matter, energy, and information with other systems.","Model how respiratory and circulatory components cooperate to deliver oxygen to cells.","Changes in breathing and pulse during activity provide evidence of coordinated system response.","Disrupting one component can affect multiple connected processes rather than only a single isolated part.","A useful body-system model traces interactions and acknowledges that simplified diagrams omit detail.",
  ["Every organ system operates independently.","A body-system diagram is a full-size perfect copy.","Changing one organ can never influence another system."],"g6");
g56Sci("g6_sci_L29","Skeletal System","§112.26(b)(5)(F)","analyze complementary relationships between structure and function in organisms and systems",
  "skeletal structure and function","Bone shape, arrangement, and material properties support protection, leverage, support, and movement.","Relate a joint's structure and connected bones to the range and direction of motion it allows.","Comparing load, motion, and protection before and after a structural change supports a function claim.","Skeletal and muscular components interact, so bone movement cannot be explained by bone structure alone.","Structure-function evidence supports the model while avoiding the claim that every bone has an identical role.",
  ["All bones have the same shape and function.","Bones move without interacting muscles or joints.","Structure provides no evidence about protection or movement."],"g6");
g56Sci("g6_sci_L30","Muscular System","§112.26(b)(5)(F)","analyze complementary relationships between structure and function in organisms and systems",
  "muscle structure and movement function","Muscles exert force through contraction and work with attachments and opposing groups to produce controlled movement.","Use a joint model with paired elastic elements to represent opposing muscle actions.","Observed shortening and joint movement support the connection between contraction and force.","Changing one muscle group's force changes net motion because paired muscles interact across a joint.","A model explains coordinated force but must not imply that elastic bands reproduce all living muscle properties.",
  ["Muscles push by becoming longer during contraction.","One muscle alone explains every possible joint motion.","Muscles and bones function without interaction."],"g6");
g56Sci("g6_sci_L31","Circulatory System","§112.26(b)(5)(D)","examine and model system parts and their interdependence in system function",
  "circulatory-system interdependence","A pump, branching vessels, fluid, and exchange surfaces work together to transport materials through a body system.","Trace a material through a closed-loop model and identify where pumping, transport, and exchange occur.","Flow-rate and pressure changes after narrowing a model tube show that one component affects system performance.","Circulation interacts with respiratory and digestive processes to move gases and nutrients.","A supported model connects component roles, flow evidence, and limitations of representing living tissue with tubing.",
  ["Blood transport requires no pumping force.","Each vessel works independently of the system.","A diagram proves that flow never changes."],"g6");
g56Sci("g6_sci_L32","Digestive System","§112.26(b)(5)(D)","examine and model system parts and their interdependence in system function",
  "digestive-system interdependence","Mechanical processing, chemical breakdown, movement, and absorption are coordinated functions of interacting system parts.","Use a sequence model to trace food matter through processing and nutrient absorption without claiming matter disappears.","Changes in particle size and measurable dissolved nutrients provide evidence of processing and absorption.","Digestive outputs connect with circulatory transport and cellular energy transformations.","A complete system explanation follows matter across boundaries and identifies what a classroom model cannot reproduce.",
  ["Digestion destroys matter.","Every digestive part performs the identical action.","Nutrients move to cells without any interacting transport system."],"g6");
g56Sci("g6_sci_L33","Molecules of Life","§112.26(b)(5)(E)","analyze and explain how energy flows and matter cycles and is conserved through systems",
  "matter and energy in biological molecules","Biological systems rearrange matter into molecules and transfer stored chemical energy; atoms are conserved through the modeled processes.","Trace carbon-containing matter from food into a system output while distinguishing matter from energy.","Mass-accounting and energy-output evidence support conservation across transformations.","Changing available molecules can alter both matter pathways and usable chemical-energy transfers.","A valid system model tracks atoms and energy separately and identifies unmeasured outputs instead of claiming disappearance.",
  ["Atoms are converted directly into energy and vanish.","Matter and energy are the same quantity.","Biological transformations do not conserve matter."],"g6");
g56Sci("g6_sci_L34","Proteins","§112.26(b)(5)(F)","analyze complementary relationships between structure and function in organisms and systems",
  "protein structure-function models","A molecule's three-dimensional structure can influence how it interacts and functions within a system.","Compare model shapes to explain why one simulated molecule fits a target while another does not.","A changed shape followed by changed interaction is evidence of a structure-function relationship.","Environmental conditions can alter structure and therefore system performance without changing the model's intended target.","A model supports shape-function reasoning but cannot reproduce every molecular force or scale.",
  ["Molecular shape never affects interaction.","Every protein has the same structure and function.","A classroom model is chemically identical to a protein."],"g6");
g56Sci("g6_sci_L35","Carbohydrates","§112.26(b)(8)(B)","describe conservation of energy through transfers and transformations in systems such as food webs",
  "chemical energy transfer involving carbohydrates","Chemical energy stored in matter can transfer and transform as organisms obtain and use food.","Trace energy from a producer's stored carbohydrate to a consumer and then to motion and thermal outputs.","Food-energy and output observations support transfer rather than creation of energy by the consumer.","Matter can be rearranged and cycled while chemical energy transfers and eventually disperses.","A complete model separates carbon-matter pathways from energy pathways and accounts for environmental outputs.",
  ["Consumers create energy from carbohydrates.","Carbohydrate matter and energy are identical paths.","Energy cycles indefinitely back into the same molecule."],"g6");
g56Sci("g6_sci_L36","Lipids and Fats","§112.26(b)(5)(F)","analyze complementary relationships between structure and function in organisms and systems",
  "lipid structure-function relationships","Molecular arrangement and interactions with water help explain storage and boundary functions in biological systems.","Use a model showing water-interacting and water-avoiding regions to explain spontaneous boundary organization.","Consistent layer formation in a model provides evidence of structure-linked interaction.","Changing molecular composition can alter flexibility, permeability, or storage behavior at the system level.","Structure-function evidence supports the model while acknowledging that simplified pieces omit molecular scale and forces.",
  ["All molecules interact with water identically.","Boundary structure has no effect on system function.","A model piece is the same size as a real lipid molecule."],"g6");
g56Sci("g6_sci_L37","Enzymes","§112.26(b)(5)(G)","analyze how conditions affect stability and change in systems",
  "conditions affecting enzyme-system performance","System performance can change when temperature, concentration, or other conditions alter molecular interactions.","Compare reaction outcomes while changing one condition and holding other variables constant.","Repeated rate data across a range of conditions support an optimum-range conclusion.","Extreme conditions can reduce performance by changing structure or interaction, so a linear trend should not be assumed.","A supported conclusion uses controls, repeated trials, and a limited range rather than claiming the pattern holds under all conditions.",
  ["Reaction rate must increase forever as temperature rises.","Changing several variables at once isolates one cause.","One trial proves a universal optimum."],"g6");

g56Sci("g6_sci_L38","Flower Structures","§112.26(b)(5)(F)","analyze complementary relationships between structure and function in organisms and systems",
  "flower structure-function relationships","Flower structures perform interacting functions related to pollen transfer, protection, attraction, and seed development.","Use structure location and interaction evidence to explain how a flower model supports reproduction.","Observed pollen movement and later seed development support connections among modeled structures.","Changing access to one structure can alter later system outcomes, showing interdependence rather than isolated labels.","A useful structure-function explanation connects evidence across stages and states the limits of a static flower model.",
  ["Every flower structure performs the same function.","Seed development is unrelated to earlier interactions.","Structure gives no evidence about function."],"g6");
g56Sci("g6_sci_L39","Pollination","§112.26(b)(5)(D)","examine and model system parts and their interdependence in system function",
  "pollination as a system interaction","Pollination transfers pollen through interactions among plant structures and vectors such as animals or wind.","Model pollen movement while varying vector access and holding other conditions constant.","Differences in pollen transfer between access and control groups support a vector-effect conclusion.","Changing vector populations or flower structure can alter transfer success across the system.","A strong conclusion distinguishes pollen transfer from later fertilization and uses controlled evidence.",
  ["Pollination and fertilization are the same event.","Pollen moves without any physical interaction.","One flower observation proves how every plant pollinates."],"g6");
g56Sci("g6_sci_L40","Fertilization","§112.26(b)(5)(D)","examine and model system parts and their interdependence in system function",
  "fertilization within a plant reproduction model","Fertilization occurs after successful cell interactions and can lead to embryo and seed development.","Use a sequence model to distinguish pollen transfer, cell joining, and later seed formation.","Development following confirmed cell interaction supports the modeled relationship.","Blocking an earlier required interaction changes later outcomes, demonstrating dependence among stages.","A supported model preserves event order and does not treat pollination alone as proof of fertilization.",
  ["Fertilization always occurs before pollination.","Pollen transfer alone proves that an embryo formed.","Reproductive stages occur independently in any order."],"g6");
g56Sci("g6_sci_L41","Seed Formation","§112.26(b)(5)(F)","analyze complementary relationships between structure and function in organisms and systems",
  "seed structure and survival function","Seed structures can protect an embryo, store resources, and affect dispersal or germination conditions.","Compare coat thickness, stored material, and dispersal structures in a system model.","Germination and survival data under controlled conditions support a structure-function claim.","Changing moisture, temperature, or coat condition can alter stability and transition to germination.","A defensible explanation links a measured structure to a function and avoids assuming one design is best in every environment.",
  ["Seeds contain no living structure.","Every seed germinates under all conditions.","Seed structure cannot affect survival or dispersal."],"g6");
g56Sci("g6_sci_L42","Plant Life Cycles","§112.26(b)(5)(A)","identify and apply patterns to understand and connect scientific phenomena",
  "patterns in plant life-cycle models","Plant life cycles show recurring stages and transitions, but timing and conditions can vary among species.","Order seed, germination, growth, reproduction, and new-seed stages while connecting each transition to evidence.","Repeated observations across organisms reveal a recurring cycle rather than an isolated linear endpoint.","Environmental changes can affect timing or success without changing the model's core reproductive pattern.","A strong life-cycle model identifies repeated patterns, variation, and conditions rather than claiming every plant develops identically.",
  ["A life cycle ends permanently when an adult reproduces.","Every plant completes each stage at the same rate.","Environmental conditions never affect transitions."],"g6");
g56Sci("g6_sci_L43","The Sun-Earth System","§112.26(b)(9)(A)","model how tilted Earth revolves around the Sun, causing seasonal changes",
  "Earth's tilt, revolution, and seasons","Seasons result from Earth's axial tilt and revolution, which change sunlight angle and day length by hemisphere.","Use a tilted globe moving around a fixed lamp while keeping the axis pointed consistently.","Opposite seasonal patterns in the hemispheres and changing day length support the tilt-revolution model.","Distance from the Sun is not the main seasonal cause because both hemispheres share nearly the same distance at a given time.","A supported model combines tilt, revolution, sunlight angle, and day length without claiming the axis flips each season.",
  ["Seasons occur because Earth is much closer to the Sun each summer.","Earth's axis reverses direction every season.","Both hemispheres always have the same season."],"g6");
g56Sci("g6_sci_L44","Earth and Moon","§112.26(b)(9)(B)","describe and predict daily, spring, and neap ocean-tide cycles from Earth-Sun-Moon positions and gravity",
  "Earth-Sun-Moon positions and tide cycles","Relative positions and gravitational interactions produce predictable daily and spring-neap tide patterns.","Use a three-body position model to compare aligned spring-tide conditions with right-angle neap-tide conditions.","Repeated tide-height timing and lunar-position data support a cyclical relationship.","Changing alignment changes the combined gravitational effect and therefore the tidal range.","A model predicts patterns but must account for local coastline and depth when comparing exact tide heights.",
  ["Tides are caused only by ocean winds.","Neap tides occur only when Sun, Earth, and Moon align.","The Moon has no gravitational relationship with ocean tides."],"g6");
g56Sci("g6_sci_L45","Stars and Constellation Models","§112.26(b)(5)(C)","analyze how scale, proportion, or quantity affect a system's structure or performance",
  "scale and perspective in star-pattern models","A constellation is an apparent pattern from Earth's viewpoint; its stars can be at very different distances.","Compare a flat sky map with a three-dimensional distance model before inferring physical closeness.","Parallax or distance data can show that stars appearing adjacent are separated in space.","Changing the observer's position can change an apparent pattern even though the stars retain their spatial locations.","A two-dimensional constellation map is useful for direction but limited as a model of three-dimensional distance.",
  ["Stars in one constellation must be physically touching.","A sky map shows exact three-dimensional distances.","Observer position can never affect an apparent pattern."],"g6");
g56Sci("g6_sci_L46","Galaxies and Scale","§112.26(b)(5)(C)","analyze how differences in scale, proportion, or quantity affect systems",
  "scale in galaxy models","Galaxies are vast systems of stars, gas, dust, and other matter, and models must use extreme scale reduction.","Compare a scale model's stated ratio before using it to infer real distances or sizes.","Consistent proportional calculations support model-based comparisons across astronomical scales.","Changing the scale factor changes model distances but not the represented ratio when applied consistently.","A valid galaxy-scale inference reports the conversion and acknowledges that a small display cannot preserve every size and distance simultaneously.",
  ["A tabletop galaxy model preserves every distance at full size.","Changing scale changes the actual galaxy.","Astronomical comparisons require no units or ratios."],"g6");
g56Sci("g6_sci_L47","Space Exploration Models","§112.26(b)(1)(G)","develop and use models to represent phenomena, systems, processes, or engineering solutions",
  "models used in space exploration","Models and simulations allow testing of spacecraft systems and distant phenomena while retaining limitations.","Use a scaled trajectory or engineering prototype to test one design variable before a costly mission.","Agreement between repeated model predictions and observations increases confidence while discrepancies guide revision.","Changing assumptions or scale can alter predictions, so inputs and uncertainty must be documented.","A responsible conclusion treats a successful model as evidence, not proof that every real condition has been reproduced.",
  ["A simulation has no assumptions or limitations.","One successful model trial guarantees a mission outcome.","Scale and input values never affect predictions."],"g6");

/* Explicit curriculum entry points. Each resolves only its own deterministic sequence. */
function gen_g5_eng_L1(){ return g56Generate("g5_eng_L1"); }
function gen_g5_eng_L2(){ return g56Generate("g5_eng_L2"); }
function gen_g5_eng_L3(){ return g56Generate("g5_eng_L3"); }
function gen_g5_eng_L4(){ return g56Generate("g5_eng_L4"); }
function gen_g5_eng_L5(){ return g56Generate("g5_eng_L5"); }
function gen_g5_eng_L6(){ return g56Generate("g5_eng_L6"); }
function gen_g5_eng_L7(){ return g56Generate("g5_eng_L7"); }
function gen_g5_eng_L8(){ return g56Generate("g5_eng_L8"); }
function gen_g5_eng_L9(){ return g56Generate("g5_eng_L9"); }
function gen_g5_eng_L10(){ return g56Generate("g5_eng_L10"); }
function gen_g5_eng_L11(){ return g56Generate("g5_eng_L11"); }
function gen_g5_eng_L12(){ return g56Generate("g5_eng_L12"); }
function gen_g5_math_L1(){ return g56Generate("g5_math_L1"); }
function gen_g5_math_L2(){ return g56Generate("g5_math_L2"); }
function gen_g5_math_L3(){ return g56Generate("g5_math_L3"); }
function gen_g5_math_L4(){ return g56Generate("g5_math_L4"); }
function gen_g5_math_L5(){ return g56Generate("g5_math_L5"); }
function gen_g5_math_L6(){ return g56Generate("g5_math_L6"); }
function gen_g5_math_L7(){ return g56Generate("g5_math_L7"); }
function gen_g5_math_L8(){ return g56Generate("g5_math_L8"); }
function gen_g5_math_L9(){ return g56Generate("g5_math_L9"); }
function gen_g5_math_L10(){ return g56Generate("g5_math_L10"); }
function gen_g5_math_L11(){ return g56Generate("g5_math_L11"); }
function gen_g5_sci_L1(){ return g56Generate("g5_sci_L1"); }
function gen_g5_sci_L2(){ return g56Generate("g5_sci_L2"); }
function gen_g5_sci_L3(){ return g56Generate("g5_sci_L3"); }
function gen_g5_sci_L4(){ return g56Generate("g5_sci_L4"); }
function gen_g5_sci_L5(){ return g56Generate("g5_sci_L5"); }
function gen_g5_sci_L6(){ return g56Generate("g5_sci_L6"); }
function gen_g5_sci_L7(){ return g56Generate("g5_sci_L7"); }
function gen_g5_sci_L8(){ return g56Generate("g5_sci_L8"); }
function gen_g5_sci_L9(){ return g56Generate("g5_sci_L9"); }
function gen_g5_sci_L10(){ return g56Generate("g5_sci_L10"); }
function gen_g5_sci_L11(){ return g56Generate("g5_sci_L11"); }
function gen_g6_eng_L1(){ return g56Generate("g6_eng_L1"); }
function gen_g6_eng_L2(){ return g56Generate("g6_eng_L2"); }
function gen_g6_eng_L3(){ return g56Generate("g6_eng_L3"); }
function gen_g6_eng_L4(){ return g56Generate("g6_eng_L4"); }
function gen_g6_eng_L5(){ return g56Generate("g6_eng_L5"); }
function gen_g6_eng_L6(){ return g56Generate("g6_eng_L6"); }
function gen_g6_eng_L7(){ return g56Generate("g6_eng_L7"); }
function gen_g6_eng_L8(){ return g56Generate("g6_eng_L8"); }
function gen_g6_eng_L9(){ return g56Generate("g6_eng_L9"); }
function gen_g6_eng_L10(){ return g56Generate("g6_eng_L10"); }
function gen_g6_eng_L11(){ return g56Generate("g6_eng_L11"); }
function gen_g6_eng_L12(){ return g56Generate("g6_eng_L12"); }
function gen_g6_eng_L13(){ return g56Generate("g6_eng_L13"); }
function gen_g6_eng_L14(){ return g56Generate("g6_eng_L14"); }
function gen_g6_eng_L15(){ return g56Generate("g6_eng_L15"); }
function gen_g6_eng_L16(){ return g56Generate("g6_eng_L16"); }
function gen_g6_eng_L17(){ return g56Generate("g6_eng_L17"); }
function gen_g6_eng_L18(){ return g56Generate("g6_eng_L18"); }
function gen_g6_eng_L19(){ return g56Generate("g6_eng_L19"); }
function gen_g6_eng_L20(){ return g56Generate("g6_eng_L20"); }
function gen_g6_eng_L21(){ return g56Generate("g6_eng_L21"); }
function gen_g6_eng_L22(){ return g56Generate("g6_eng_L22"); }
function gen_g6_eng_L23(){ return g56Generate("g6_eng_L23"); }
function gen_g6_eng_L24(){ return g56Generate("g6_eng_L24"); }
function gen_g6_eng_L25(){ return g56Generate("g6_eng_L25"); }
function gen_g6_eng_L26(){ return g56Generate("g6_eng_L26"); }
function gen_g6_eng_L27(){ return g56Generate("g6_eng_L27"); }
function gen_g6_eng_L28(){ return g56Generate("g6_eng_L28"); }
function gen_g6_eng_L29(){ return g56Generate("g6_eng_L29"); }
function gen_g6_eng_L30(){ return g56Generate("g6_eng_L30"); }
function gen_g6_eng_L31(){ return g56Generate("g6_eng_L31"); }
function gen_g6_eng_L32(){ return g56Generate("g6_eng_L32"); }
function gen_g6_eng_L33(){ return g56Generate("g6_eng_L33"); }
function gen_g6_eng_L34(){ return g56Generate("g6_eng_L34"); }
function gen_g6_eng_L35(){ return g56Generate("g6_eng_L35"); }
function gen_g6_eng_L36(){ return g56Generate("g6_eng_L36"); }
function gen_g6_eng_L37(){ return g56Generate("g6_eng_L37"); }
function gen_g6_eng_L38(){ return g56Generate("g6_eng_L38"); }
function gen_g6_eng_L39(){ return g56Generate("g6_eng_L39"); }
function gen_g6_eng_L40(){ return g56Generate("g6_eng_L40"); }
function gen_g6_eng_L41(){ return g56Generate("g6_eng_L41"); }
function gen_g6_eng_L42(){ return g56Generate("g6_eng_L42"); }
function gen_g6_eng_L43(){ return g56Generate("g6_eng_L43"); }
function gen_g6_eng_L44(){ return g56Generate("g6_eng_L44"); }
function gen_g6_eng_L45(){ return g56Generate("g6_eng_L45"); }
function gen_g6_eng_L46(){ return g56Generate("g6_eng_L46"); }
function gen_g6_eng_L47(){ return g56Generate("g6_eng_L47"); }
function gen_g6_eng_L48(){ return g56Generate("g6_eng_L48"); }
function gen_g6_eng_L49(){ return g56Generate("g6_eng_L49"); }
function gen_g6_eng_L50(){ return g56Generate("g6_eng_L50"); }
function gen_g6_eng_L51(){ return g56Generate("g6_eng_L51"); }
function gen_g6_eng_L52(){ return g56Generate("g6_eng_L52"); }
function gen_g6_eng_L53(){ return g56Generate("g6_eng_L53"); }
function gen_g6_math_L1(){ return g56Generate("g6_math_L1"); }
function gen_g6_math_L2(){ return g56Generate("g6_math_L2"); }
function gen_g6_math_L3(){ return g56Generate("g6_math_L3"); }
function gen_g6_math_L4(){ return g56Generate("g6_math_L4"); }
function gen_g6_math_L5(){ return g56Generate("g6_math_L5"); }
function gen_g6_math_L6(){ return g56Generate("g6_math_L6"); }
function gen_g6_math_L7(){ return g56Generate("g6_math_L7"); }
function gen_g6_math_L8(){ return g56Generate("g6_math_L8"); }
function gen_g6_math_L9(){ return g56Generate("g6_math_L9"); }
function gen_g6_math_L10(){ return g56Generate("g6_math_L10"); }
function gen_g6_math_L11(){ return g56Generate("g6_math_L11"); }
function gen_g6_math_L12(){ return g56Generate("g6_math_L12"); }
function gen_g6_math_L13(){ return g56Generate("g6_math_L13"); }
function gen_g6_math_L14(){ return g56Generate("g6_math_L14"); }
function gen_g6_math_L15(){ return g56Generate("g6_math_L15"); }
function gen_g6_math_L16(){ return g56Generate("g6_math_L16"); }
function gen_g6_math_L17(){ return g56Generate("g6_math_L17"); }
function gen_g6_math_L18(){ return g56Generate("g6_math_L18"); }
function gen_g6_math_L19(){ return g56Generate("g6_math_L19"); }
function gen_g6_math_L20(){ return g56Generate("g6_math_L20"); }
function gen_g6_math_L21(){ return g56Generate("g6_math_L21"); }
function gen_g6_math_L22(){ return g56Generate("g6_math_L22"); }
function gen_g6_sci_L1(){ return g56Generate("g6_sci_L1"); }
function gen_g6_sci_L2(){ return g56Generate("g6_sci_L2"); }
function gen_g6_sci_L3(){ return g56Generate("g6_sci_L3"); }
function gen_g6_sci_L4(){ return g56Generate("g6_sci_L4"); }
function gen_g6_sci_L5(){ return g56Generate("g6_sci_L5"); }
function gen_g6_sci_L6(){ return g56Generate("g6_sci_L6"); }
function gen_g6_sci_L7(){ return g56Generate("g6_sci_L7"); }
function gen_g6_sci_L8(){ return g56Generate("g6_sci_L8"); }
function gen_g6_sci_L9(){ return g56Generate("g6_sci_L9"); }
function gen_g6_sci_L10(){ return g56Generate("g6_sci_L10"); }
function gen_g6_sci_L11(){ return g56Generate("g6_sci_L11"); }
function gen_g6_sci_L12(){ return g56Generate("g6_sci_L12"); }
function gen_g6_sci_L13(){ return g56Generate("g6_sci_L13"); }
function gen_g6_sci_L14(){ return g56Generate("g6_sci_L14"); }
function gen_g6_sci_L15(){ return g56Generate("g6_sci_L15"); }
function gen_g6_sci_L16(){ return g56Generate("g6_sci_L16"); }
function gen_g6_sci_L17(){ return g56Generate("g6_sci_L17"); }
function gen_g6_sci_L18(){ return g56Generate("g6_sci_L18"); }
function gen_g6_sci_L19(){ return g56Generate("g6_sci_L19"); }
function gen_g6_sci_L20(){ return g56Generate("g6_sci_L20"); }
function gen_g6_sci_L21(){ return g56Generate("g6_sci_L21"); }
function gen_g6_sci_L22(){ return g56Generate("g6_sci_L22"); }
function gen_g6_sci_L23(){ return g56Generate("g6_sci_L23"); }
function gen_g6_sci_L24(){ return g56Generate("g6_sci_L24"); }
function gen_g6_sci_L25(){ return g56Generate("g6_sci_L25"); }
function gen_g6_sci_L26(){ return g56Generate("g6_sci_L26"); }
function gen_g6_sci_L27(){ return g56Generate("g6_sci_L27"); }
function gen_g6_sci_L28(){ return g56Generate("g6_sci_L28"); }
function gen_g6_sci_L29(){ return g56Generate("g6_sci_L29"); }
function gen_g6_sci_L30(){ return g56Generate("g6_sci_L30"); }
function gen_g6_sci_L31(){ return g56Generate("g6_sci_L31"); }
function gen_g6_sci_L32(){ return g56Generate("g6_sci_L32"); }
function gen_g6_sci_L33(){ return g56Generate("g6_sci_L33"); }
function gen_g6_sci_L34(){ return g56Generate("g6_sci_L34"); }
function gen_g6_sci_L35(){ return g56Generate("g6_sci_L35"); }
function gen_g6_sci_L36(){ return g56Generate("g6_sci_L36"); }
function gen_g6_sci_L37(){ return g56Generate("g6_sci_L37"); }
function gen_g6_sci_L38(){ return g56Generate("g6_sci_L38"); }
function gen_g6_sci_L39(){ return g56Generate("g6_sci_L39"); }
function gen_g6_sci_L40(){ return g56Generate("g6_sci_L40"); }
function gen_g6_sci_L41(){ return g56Generate("g6_sci_L41"); }
function gen_g6_sci_L42(){ return g56Generate("g6_sci_L42"); }
function gen_g6_sci_L43(){ return g56Generate("g6_sci_L43"); }
function gen_g6_sci_L44(){ return g56Generate("g6_sci_L44"); }
function gen_g6_sci_L45(){ return g56Generate("g6_sci_L45"); }
function gen_g6_sci_L46(){ return g56Generate("g6_sci_L46"); }
function gen_g6_sci_L47(){ return g56Generate("g6_sci_L47"); }

/* Publish exact 25-question metadata and verify the file-local contract. */
Object.entries(G56_SPECS).forEach(([key,spec])=>{
  const fn=globalThis[`gen_${key}`];
  if(typeof fn!=="function") return;
  const meta=Object.freeze({code:spec.teks,text:spec.expectation,source:spec.source});
  fn.teksExpectation=meta;
  fn.teksStudentExpectation=meta;
  fn.questionCount=25;
  fn.difficultyTiers=5;
});

window.G56_TEKS_OWNED_AUDIT=(()=>{
  const failures=[];
  Object.entries(G56_SPECS).forEach(([key,spec])=>{
    const items=Array.from({length:25},(_,index)=>g56BuildAt(key,index));
    if(items.length!==25) failures.push(`${key}:count`);
    if(new Set(items.map(item=>String(item.q).trim().toLowerCase())).size!==25){
      failures.push(`${key}:duplicate`);
    }
    if(items.filter(item=>item.type==="truefalse" && item.explicitTrueFalse).length!==5){
      failures.push(`${key}:truefalse`);
    }
    if(items.map(item=>item.difficultyTier).join("")!=="1111122222333334444455555"){
      failures.push(`${key}:difficulty`);
    }
    if(items.some((item,index)=>item.sequenceIndex!==index+1)){
      failures.push(`${key}:sequence`);
    }
    if(items.some(item=>item.teksExpectation?.code!==spec.teks || item.teksExpectation?.source!==spec.source)){
      failures.push(`${key}:teks`);
    }
    const repeated=Array.from({length:25},(_,index)=>g56BuildAt(key,index));
    if(items.some((item,index)=>item.q!==repeated[index].q || String(item.answer)!==String(repeated[index].answer))){
      failures.push(`${key}:determinism`);
    }
    const mastery=items.slice(20);
    if(mastery.some(item=>/^(Error analysis|Evidence synthesis|Multi-condition reasoning|Challenge review|Mastery defense):/i.test(item.q))){
      failures.push(`${key}:mastery-prefix`);
    }
  });
  return Object.freeze({
    lessons:Object.keys(G56_SPECS).length,
    questions:Object.keys(G56_SPECS).length*25,
    bands:Object.freeze(["Foundation","Apply","Reason","Challenge","Mastery"]),
    failures:Object.freeze(failures)
  });
})();
