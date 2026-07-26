/* Deterministic, lesson-owned TEKS social-studies progressions: 25 questions per lesson. */
(function installHistoryProgressions(){
  "use strict";

  const TEA_SOCIAL_STUDIES_SOURCE =
    "https://tea.texas.gov/laws-and-rules/texas-administrative-code/19-tac-chapter-113";
  const TIER_LABELS=["Foundation","Apply","Reason","Challenge","Mastery"];

  function idea(label,fact,evidence,inference,myth){
    return {label,fact,evidence,inference,myth};
  }

  function lesson(name,ideas){
    if(!Array.isArray(ideas)||ideas.length!==5){
      throw new Error(`${name} must define five lesson-owned social-studies ideas.`);
    }
    return {name,ideas};
  }

  const H={
    g2:[
      lesson("Community Landmarks and Celebrations",[
        idea("chronology","A timeline places community events in date order.","A festival program dates the first celebration before a later monument dedication.","The dates establish sequence, but another source is needed to explain why each event occurred.","A later event must have caused every earlier event."),
        idea("landmarks as evidence","Historic buildings and monuments can preserve evidence about a community's past.","An old courthouse cornerstone lists its construction year and original public purpose.","The inscription is useful evidence about when and why the building was created.","A landmark is evidence only when it is still used for its original purpose."),
        idea("commemoration","Celebrations can honor people, ideals, or events a community considers significant.","A city holds an annual ceremony on the date a local civil-rights leader opened a school.","The date and ceremony connect a present tradition to a remembered contribution.","Every celebration proves all community members remember the past in the same way."),
        idea("source perspective","Photographs, objects, and oral accounts may reveal different views of one community event.","A parade photograph shows spectators while an interview explains why one family attended.","The sources answer different questions and become stronger when interpreted together.","A photograph automatically explains what every person in it believed."),
        idea("continuity and change","Comparing sources from different years can show what a community kept and what it changed.","Two maps show the same town square but different roads and public buildings.","The town preserved a central place while transportation and services changed around it.","If one landmark remains, the entire community must be unchanged.")
      ]),
      lesson("Local Government and Services",[
        idea("public order","Local rules help communities protect safety, property, and fair use of shared spaces.","A town rule sets safe speeds near a school and identifies who enforces it.","The rule addresses a public safety problem and depends on lawful enforcement.","Local rules exist mainly to give officials unlimited authority."),
        idea("public services","Local governments commonly support services such as fire protection, libraries, parks, and roads.","A city budget lists spending for firefighters, library hours, and street repair.","The budget is evidence that local government allocates resources among community needs.","Libraries and road repair cannot be local public services."),
        idea("budget choices","Because money is limited, local officials must choose among competing service needs.","Residents request both a new park and more emergency equipment, but current revenue cannot fully fund both.","The decision involves scarcity and should be explained with costs, benefits, and community priorities.","A local budget can fund every request without tradeoffs."),
        idea("officials and citizens","Elected officials make public decisions, while citizens can communicate needs and evaluate those decisions.","Meeting minutes record council votes and comments from residents about a proposed bus route.","The record shows different civic roles working within a public decision process.","Citizens have no legitimate role after officials are elected."),
        idea("evaluating services","Evidence such as response times, use data, and public feedback can help evaluate a service.","Library visits rise after weekend hours begin, while staffing costs also rise.","A responsible evaluation weighs improved access against the additional cost.","One favorable comment proves a service meets every community need.")
      ]),
      lesson("Maps and Places",[
        idea("cardinal directions","A compass rose identifies north, south, east, and west on a map.","The school is drawn above the park on a map whose compass rose points north at the top.","The school is north of the park according to the map's stated orientation.","North changes to south whenever the paper is turned."),
        idea("map legends","A map legend explains what symbols and colors represent.","The legend identifies a blue line as a river and a star as the town hall.","The symbols can be interpreted only by applying the map's legend.","A legend shows how tomorrow's weather will change."),
        idea("relative location","Relative location describes one place by its position compared with another.","Directions say the library is west of the school and beside the park.","The description locates the library through relationships rather than coordinates.","Relative location gives an exact latitude and longitude."),
        idea("physical and human features","Maps can distinguish natural features from features built by people.","A map marks a river, hill, bridge, and highway.","The river and hill are physical features; the bridge and highway are human features.","Every line on a map represents a natural landform."),
        idea("maps as selected evidence","Different maps select information for different purposes.","A road map emphasizes streets while a physical map of the same place emphasizes elevation and water.","The maps can both be accurate because each answers a different geographic question.","Only one map of a place can contain valid information.")
      ]),
      lesson("Historical People and Contributions",[
        idea("documented actions","A claim about a historical person's contribution should identify an action supported by evidence.","A dated newspaper reports that a community leader organized the town's first public clinic.","The report supports a specific contribution more strongly than fame alone would.","Being well known automatically proves a person improved the community."),
        idea("cause and impact","A contribution matters historically when evidence connects an action to consequences.","School records show attendance increased after an organizer helped open a neighborhood school.","The records support a link between the organizer's action and expanded school access.","A contribution can be measured only by how many years ago it occurred."),
        idea("primary and secondary sources","A primary source comes from the time studied; a secondary source interprets the past later.","A leader's 1940 letter is compared with a historian's 2010 account of the same campaign.","The letter provides contemporary evidence, while the later account supplies interpretation and context.","Every modern textbook is a primary source."),
        idea("perspective","A source reflects what its creator could observe, valued, and intended to communicate.","A mayor's speech praises a project, while a resident's diary records disruption during construction.","The sources may both contain evidence even though their purposes and experiences differ.","One person's account proves everyone experienced an event identically."),
        idea("corroboration","Agreement among independent sources can strengthen a claim, while disagreement requires investigation.","A photograph, meeting record, and interview all place an organizer at the same relief effort.","The three sources corroborate participation, though they may not prove every claim about its impact.","A single rumor is stronger than several independent records.")
      ]),
      lesson("Technology: Then and Now",[
        idea("communication change","Communication technologies can change how quickly and widely information travels.","A mailed notice took days to arrive, while a later electronic alert reached residents within minutes.","The comparison shows increased speed, not that the purpose of communication disappeared.","Communication technology has never changed the speed of sharing news."),
        idea("transportation change","Transportation innovations can alter travel time, trade, and settlement connections.","A timetable shows a rail trip replaced a much longer wagon journey between two towns.","Faster travel could increase movement of people and goods between the towns.","New transportation always makes every older route immediately useless."),
        idea("work and recreation","Technology can change how people work and spend free time.","Photographs show hand tools in an older workshop and powered machines in a later one.","The sources show a change in tools and production, but not necessarily the loss of every skilled task.","Past and present tools are identical in both design and effect."),
        idea("continuity","A new tool may change a method while the underlying human need continues.","Families used letters and later video calls to maintain relationships across distance.","The method changed while the goal of staying connected continued.","If a tool changes, the human purpose must also disappear."),
        idea("benefits and tradeoffs","Technological change can create benefits while also producing costs or new problems.","Cars shortened many trips but increased traffic, fuel use, and road demand.","A balanced account evaluates improved mobility together with its public and environmental costs.","Every technological change has benefits and no tradeoffs.")
      ])
    ],
    g3:[
      lesson("Communities",[
        idea("settlement and environment","Communities often develop where people can obtain water, transportation, work, or other resources.","An early settlement map clusters homes near a river crossing and fertile land.","The location reflects opportunities provided by the environment and transportation.","Communities form without any relationship to people or place."),
        idea("institutions","Schools, markets, religious centers, and public spaces help organize community life.","A town directory shows a school, market, courthouse, and several places of worship around a central square.","The directory reveals institutions serving different educational, economic, civic, and cultural needs.","A community is defined only by the number of houses it contains."),
        idea("citizen contributions","People contribute through work, service, leadership, and participation.","Volunteer records show residents organizing food distribution after a flood.","The records document civic action responding to a shared community need.","Citizens contribute only when they hold elected office."),
        idea("local change over time","Economic, demographic, and transportation changes can reshape a community.","Census and street maps show population growth after a factory and rail stop opened.","Together the sources suggest jobs and transportation helped attract new residents.","Local decisions and economic changes never affect population."),
        idea("community evidence","Multiple local sources can build a more complete account than one source alone.","A map shows neighborhood growth, a newspaper explains a new road, and interviews describe residents' experiences.","The sources corroborate growth while contributing different kinds of evidence about its causes and effects.","One source should replace all other evidence about a community.")
      ]),
      lesson("Maps and Globes",[
        idea("absolute location","Latitude and longitude identify an absolute position on Earth's surface.","A map grid gives a city as 30 degrees north latitude and 97 degrees west longitude.","The coordinate pair identifies a fixed location rather than a location relative to another city.","Longitude measures height above sea level."),
        idea("map scale","A map scale relates distance on a map to distance on the ground.","A scale states that one centimeter represents five kilometers, and two towns are three centimeters apart.","The scale supports a ground-distance calculation of fifteen kilometers.","Map scale is decoration and cannot measure distance."),
        idea("physical and political maps","Physical and political maps emphasize different geographic information.","One map shows mountain elevation, while another shows state boundaries and capitals.","The physical map supports landform questions; the political map supports government-boundary questions.","A political map proves where every mountain is highest."),
        idea("spatial patterns","Maps can reveal clustering, movement, and relationships among places.","A population map shows dense settlement along a coast and sparse settlement inland.","The pattern raises questions about ports, water, jobs, and terrain that require further evidence.","A map pattern explains its own cause without any context."),
        idea("comparing representations","A globe reduces some distortions, while flat maps can display selected details more conveniently.","A world map enlarges areas near the poles compared with their appearance on a globe.","Projection choices affect shape and area, so readers should match a representation to the question.","A globe displays only one continent and has no scale.")
      ]),
      lesson("Local Government and Leaders",[
        idea("local responsibilities","Local governments make decisions about services and rules within their legal authority.","A council agenda includes zoning, fire services, road repair, and park hours.","The agenda documents local responsibilities rather than national foreign policy.","Local government has no role in community services."),
        idea("rule of law","Local leaders and residents are subject to constitutions, laws, and established procedures.","A court blocks a mayor's order because it exceeds authority granted by law.","The decision demonstrates limited authority and legal accountability.","An elected mayor may ignore every law."),
        idea("representation","Elections authorize representatives, but public meetings and records help citizens continue oversight.","Voters elect council members, then review recorded votes on a proposed development.","Representation and transparency allow citizens to evaluate officials after an election.","Election victory removes every need for public accountability."),
        idea("civic participation","Citizens may petition, speak at meetings, volunteer, and use evidence to advocate for policies.","Residents present traffic counts while requesting a safer crossing.","Their participation is stronger because the request connects evidence to a public problem.","Responsible citizenship requires avoiding all public discussion."),
        idea("evaluating leadership","Good evaluation considers goals, lawful process, evidence, and effects on different groups.","A mayor finishes a road project under budget, but records show one neighborhood lost safe access during construction.","A fair judgment recognizes efficient spending while examining unequal effects.","One success proves every leadership decision was fair.")
      ]),
      lesson("Timelines and Evidence",[
        idea("sequence","Timelines place events in chronological order.","A timeline lists a petition before a council vote and the vote before construction.","The sequence shows what happened first, but it does not by itself prove the petition caused approval.","A timeline makes later events occur before earlier ones."),
        idea("duration","Scaled timelines can show how long events or periods lasted.","A strike spans three months on a timeline, while negotiations span two weeks.","The timeline supports a comparison of duration as well as sequence.","All events on a timeline last the same amount of time."),
        idea("primary sources","Primary sources were created during the period or by participants in the event studied.","A diary entry written during a storm describes conditions that day.","The diary supplies contemporary perspective but may not represent every resident.","A historian's later summary is always the only primary source."),
        idea("historical context","A source is better understood when placed in its time, place, and circumstances.","A ration card is examined alongside records of wartime shortages.","The shortage context explains the card's purpose more fully than reading it alone.","Historical objects have meanings that never depend on context."),
        idea("corroboration and causation","Historians compare independent evidence before making a causal claim.","A newspaper, letter, and meeting record all show debate before a policy changed.","The sources corroborate the debate; additional evidence is needed to determine how much it caused the change.","Events occurring in sequence always prove one caused the next.")
      ]),
      lesson("Scarcity and Economic Choices",[
        idea("scarcity","Scarcity exists because wants can exceed available resources.","A town has funds for either one new ambulance or several smaller projects, but not all proposals.","Limited funds force a choice among valued uses.","Scarcity means resources are unlimited."),
        idea("opportunity cost","The opportunity cost of a choice is the most valued alternative given up.","A family chooses a repair instead of a planned trip using the same savings.","The forgone trip is the opportunity cost of paying for the repair.","Opportunity cost means a choice has no sacrificed alternative."),
        idea("household choices","Households compare needs, wants, prices, and income when making decisions.","A household delays entertainment spending after food prices rise while income stays fixed.","The budget response shows scarcity changing priorities.","Households never adjust choices when prices change."),
        idea("business choices","Businesses choose how to use labor, tools, money, and materials.","A bakery can use its last delivery slot for bread or cakes and compares expected demand.","The bakery must weigh expected benefits against what it gives up.","A business can use the same limited resource for every option at once."),
        idea("evidence and tradeoffs","Economic claims should be tested with cost, quantity, and outcome data.","A park option costs less, while a clinic option serves a more urgent but smaller group.","The decision cannot be reduced to price alone; decision-makers must explain priorities and tradeoffs.","The cheapest option is automatically best for every public purpose.")
      ])
    ],
    g4:[
      lesson("Texas Regions",[
        idea("regional classification","Texas regions are grouped using patterns in landforms, climate, vegetation, and other features.","A relief map separates high western plateaus from lower coastal plains.","The boundary represents a useful pattern, not a wall where every feature changes instantly.","Every Texas region has identical landforms and rainfall."),
        idea("settlement and water","Water availability and climate influence where people settle and what activities are practical.","Population maps show major settlements near rivers, coasts, and dependable water sources.","Water access helps explain settlement patterns but does not determine every human choice.","Water has no relationship to Texas settlement."),
        idea("resources and economies","Regional resources help shape agriculture, energy, trade, and other economic activity.","Oil fields cluster in some areas while ranching and farming dominate others.","Uneven resource distribution contributes to different regional economies.","Texas resources are distributed equally in every region."),
        idea("human modification","People modify environments through irrigation, dams, roads, cities, and resource extraction.","Before-and-after images show a reservoir replacing a river valley and supplying nearby cities.","The project increased water storage while transforming land and habitats.","Human activity cannot alter a regional environment."),
        idea("multiple geographic causes","Strong regional explanations combine physical and human evidence.","A student compares rainfall, soils, highways, and job data to explain population growth.","The combined evidence supports a multi-causal explanation better than one map alone.","Geography alone fixes every settlement and economic outcome.")
      ]),
      lesson("Texas Revolution and Republic",[
        idea("rising conflict","Immigration, Mexican policy, federalism disputes, and local political demands increased tension before 1835.","Petitions and government decrees reveal disagreement before fighting began.","The documents show a developing political conflict rather than a war without prior causes.","Texas independence began without earlier disputes."),
        idea("revolutionary chronology","Gonzales, the Alamo, Goliad, and San Jacinto occurred in a sequence with different consequences.","A dated campaign map places Gonzales before the Alamo and San Jacinto after Goliad.","Chronology clarifies how early setbacks preceded the decisive Texian victory.","San Jacinto occurred before the conflict at Gonzales."),
        idea("diverse participants","Tejanos, Anglo settlers, Mexican soldiers, Indigenous nations, women, and others experienced and shaped the era differently.","Letters reveal support, opposition, neutrality, military service, and civilian hardship among different people.","The evidence rejects a single story in which every group shared one position.","Every person in Texas supported the same side for the same reason."),
        idea("Republic challenges","The Republic of Texas faced debt, security, recognition, border, and Indigenous-relations problems.","Presidential messages discuss unpaid debt and competing policies toward Mexico and Indigenous nations.","Independence created a government but did not eliminate political and economic challenges.","The Republic had no debt or security concerns."),
        idea("cause and consequence","Revolution and republic policies reshaped government, borders, migration, and relations among peoples.","A treaty claim, annexation debate, and later boundary map show consequences extending beyond 1836.","The era's effects developed over time and differed among groups.","A revolutionary outcome affected government only and had no later consequences.")
      ]),
      lesson("Indigenous Peoples of Texas",[
        idea("distinct nations","Caddo, Karankawa, Jumano, Comanche, and other Indigenous peoples had distinct languages, governments, economies, and traditions.","Archaeological sites and oral histories show different settlement forms and trade practices.","The evidence supports diversity among Indigenous nations rather than one uniform culture.","All Indigenous peoples of Texas lived in the same way."),
        idea("environmental adaptation","Indigenous communities used knowledge of regional plants, animals, water, and seasons.","Evidence links Caddo agriculture to eastern woodlands and mobile bison hunting to the Plains.","Environment shaped opportunities, while communities made varied cultural choices.","Environment had no relationship to Indigenous lifeways."),
        idea("trade and diplomacy","Indigenous nations maintained trade, alliance, and conflict networks before and after Europeans arrived.","Artifacts made far from where they were found indicate long-distance exchange.","Material evidence shows Indigenous communities were connected political and economic actors.","Indigenous Texas had no trade or diplomacy before European settlement."),
        idea("sources and perspective","Archaeology, oral tradition, Indigenous accounts, and European records provide different evidence.","A Spanish report labels a community hostile, while trade evidence shows continued negotiation.","The report must be read for purpose and bias and compared with other sources.","A colonial report gives a complete, neutral account of Indigenous motives."),
        idea("continuity and change","Indigenous nations adapted to horses, missions, disease, settlement pressure, and changing trade while preserving cultural traditions.","Records show new horse-based mobility alongside continuing kinship and ceremonial practices.","Adaptation demonstrates both change and cultural continuity.","Contact with Europeans immediately erased every Indigenous culture.")
      ]),
      lesson("Exploration and Colonization",[
        idea("imperial competition","Spain, France, and other European powers explored Texas while competing for territory, trade, and influence.","Maps and royal instructions identify overlapping territorial claims and strategic routes.","Exploration served imperial goals as well as geographic inquiry.","European powers explored Texas with identical goals and no competition."),
        idea("missions and presidios","Spanish missions and presidios pursued religious, political, settlement, and defense goals.","A mission record and nearby military roster document conversion efforts, labor, farming, and protection.","The institutions combined several imperial purposes rather than one isolated function.","Missions were only trading posts with no religious or political purpose."),
        idea("Indigenous agency","Indigenous nations negotiated, traded, resisted, relocated, or entered missions for their own reasons.","Records show some communities requesting trade while others left missions or opposed settlement.","Indigenous responses varied according to circumstance and interest.","Indigenous peoples had no choices or influence during colonization."),
        idea("colonial consequences","Colonization brought exchange, disease, coercion, conflict, and environmental change.","Population records decline after epidemics while livestock and new crops spread.","Colonial contact produced interconnected demographic, cultural, and ecological effects.","Colonization caused no conflict, disease, or exchange."),
        idea("evaluating colonial sources","Colonial documents reveal goals and events but often center the colonizers' viewpoint.","An official report calls a mission successful, while population and escape records show instability.","Corroboration complicates the official claim and produces a more complete evaluation.","An official report should be accepted without checking other evidence.")
      ]),
      lesson("Texas Citizenship",[
        idea("rights and responsibilities","Citizenship connects protected rights with responsibilities such as obeying laws and participating responsibly.","A student newspaper defends free expression while following rules that protect others' safety.","Rights operate within a constitutional system rather than eliminating every responsibility.","Having rights removes all civic responsibilities."),
        idea("limited government","Texas officials exercise powers defined and limited by constitutions and laws.","A court reviews whether an agency acted beyond authority granted by statute.","Judicial review can enforce legal limits on public power.","Public officials are above the law when acting for the state."),
        idea("levels of government","Local, state, and national governments have different but sometimes overlapping responsibilities.","City, Texas, and federal agencies coordinate after a major flood.","The response illustrates divided authority and cooperation across levels.","Every public problem belongs to only one level of government."),
        idea("informed participation","Citizens can vote when eligible, contact officials, petition, serve, and evaluate public evidence.","Residents compare water data and budget costs before speaking at a hearing.","Evidence-based participation strengthens public deliberation.","Civic participation is useful only when everyone already agrees."),
        idea("public-policy evaluation","Responsible citizens examine legality, cost, effectiveness, and effects on different groups.","A highway plan reduces travel time but displaces homes and affects a wetland.","A serious evaluation weighs several public benefits and costs instead of one outcome.","A policy with one benefit cannot have any important cost.")
      ])
    ],
    g5:[
      lesson("Colonial America",[
        idea("regional development","Geography, settlement goals, labor systems, and markets contributed to different colonial regions.","Port records, crop data, and maps show contrasts among New England, Middle, and Southern colonies.","Regional patterns developed from interacting environmental and human choices.","All thirteen colonies had identical economies and settlement patterns."),
        idea("Indigenous diplomacy","Indigenous nations shaped colonial survival, trade, alliance, and war.","Treaty records show European colonies negotiating with powerful Native confederacies.","The records demonstrate Indigenous political agency, not an empty continent awaiting settlement.","Indigenous nations had no political or economic influence."),
        idea("labor systems","Colonial economies relied on varied forms of labor, including family labor, indenture, and racial slavery.","Shipping records and laws document the expansion of enslaved labor in plantation regions.","Economic growth was connected to unequal labor systems and coercion.","Colonial labor was entirely free and equally rewarded."),
        idea("self-government and empire","Colonial assemblies developed local practices while remaining under British imperial authority.","An assembly passes a tax, but a royal governor can veto it.","The example shows local participation coexisting with imperial limits.","Colonists possessed complete democracy and independence from the beginning."),
        idea("source perspectives","Colonial promoters, settlers, enslaved people, and Indigenous observers described colonization differently.","A promotional pamphlet praises opportunity while a laborer's letter reports hunger and debt.","Comparing purpose and experience reveals both aspiration and hardship.","A promotional source represents every person's colonial experience.")
      ]),
      lesson("American Revolution",[
        idea("imperial crisis","Postwar debt, British taxation, enforcement, and colonial arguments about representation intensified conflict.","A timeline links new revenue laws, protests, punishments, and organized resistance.","The conflict escalated through connected policies and responses rather than one isolated tax.","One battle alone caused the colonies to seek independence."),
        idea("natural-rights argument","The Declaration justified independence through equality, natural rights, consent, and grievances.","A passage states that governments derive just powers from the consent of the governed.","The argument challenges authority that violates rights and lacks consent.","The Declaration created the later structure of the U.S. Constitution."),
        idea("divided loyalties","Patriots, Loyalists, neutral colonists, enslaved people, and Indigenous nations made different choices.","Petitions and military records show people supporting opposing sides for varied reasons.","The Revolution was a civil and imperial conflict as well as a war for independence.","All colonists supported independence for identical reasons."),
        idea("war and diplomacy","American victory depended on military endurance, resources, leadership, and foreign assistance.","French naval action and the American siege combine at Yorktown.","The evidence shows diplomacy and alliance contributing directly to military success.","Foreign alliances had no effect on the Revolutionary War."),
        idea("limits and consequences","Independence created a republic but did not immediately extend equal rights to everyone.","State constitutions expanded some political participation while slavery and legal inequality continued.","The Revolution changed government while leaving major contradictions for later generations.","Independence instantly produced equal political rights for every resident.")
      ]),
      lesson("Constitutional Government",[
        idea("federalism","The Constitution divides authority between national and state governments.","Both national and state governments collect taxes while exercising other distinct powers.","Federalism combines shared and divided responsibilities rather than placing all power in one government.","Federalism gives every governing power to cities."),
        idea("separation of powers","Legislative, executive, and judicial functions are assigned to different branches.","Congress passes a bill, the president may veto it, and courts may review a resulting law.","The structure makes multiple institutions participate in governing.","One branch constitutionally controls all functions of the other two."),
        idea("checks and balances","Each branch has powers that can limit actions of another branch.","The Senate confirms executive appointments, while the president may veto legislation.","Checks make concentrated power more difficult without preventing all government action.","Checks and balances create one supreme branch."),
        idea("Bill of Rights","The first ten amendments protect specified liberties and legal safeguards.","A defendant invokes protections involving counsel and due process.","The amendments limit government action in defined areas.","The Bill of Rights grants government unlimited authority."),
        idea("constitutional evaluation","Constitutional conflicts often require balancing power, rights, representation, and effective government.","A security policy is challenged for burdening protected speech without clear evidence of necessity.","Evaluation should consider public purpose, constitutional limits, and less restrictive alternatives.","Any claimed public benefit automatically overrides a protected right.")
      ]),
      lesson("Westward Expansion",[
        idea("multiple motives","Land, resources, family decisions, transportation, and government policy encouraged westward migration.","Land advertisements, diaries, and federal acts identify both private hopes and public incentives.","Migration resulted from several interacting motives rather than one universal cause.","Every westward migrant moved for the same reason."),
        idea("Indigenous displacement","Expansion violated treaties and displaced Indigenous nations from homelands.","Treaty boundaries shrink on successive maps as settlement and military pressure increase.","Territorial growth for settlers imposed severe political and human costs on Native communities.","Expansion occurred on empty land and harmed no existing community."),
        idea("Mexican cession and conflict","War and treaty changed U.S. boundaries while raising disputes over slavery and citizenship.","Maps before and after the Treaty of Guadalupe Hidalgo show large territorial change.","Expansion altered national politics as well as borders.","New territory created no political conflict within the United States."),
        idea("transportation networks","Canals, trails, railroads, and telegraphs changed travel, markets, and communication.","Shipping records show lower travel times and costs after a rail connection opened.","Infrastructure linked regions while redirecting settlement and economic activity.","Railroads reduced movement and communication toward the West."),
        idea("competing perspectives","Settlers' opportunity narratives must be compared with Indigenous, Mexican American, and environmental evidence.","A migrant diary celebrates new land while a Native petition documents lost access to hunting grounds.","The sources reveal benefits for some people and dispossession for others.","One settler's account supplies a complete evaluation of expansion.")
      ]),
      lesson("Civil War and Reconstruction",[
        idea("slavery and secession","The protection and expansion of slavery were central to sectional conflict and secession.","Secession declarations repeatedly identify slavery and perceived threats to it.","Primary documents directly contradict explanations that remove slavery from secession.","Tariffs alone caused the Civil War."),
        idea("wartime strategy","Union and Confederate strategies connected armies, resources, geography, and political goals.","The Union blockaded ports while campaigning for control of the Mississippi River.","The strategy targeted transportation and economic capacity as well as enemy forces.","Civil War strategy consisted only of winning isolated battles."),
        idea("emancipation","Enslaved people's actions, wartime policy, and Union victory contributed to slavery's destruction.","Self-emancipation, Black military service, the Emancipation Proclamation, and the Thirteenth Amendment form a sequence.","Freedom resulted from intersecting actions and policies, not one event alone.","The Civil War ended without changing legal slavery."),
        idea("Reconstruction amendments","The Thirteenth, Fourteenth, and Fifteenth Amendments abolished slavery and redefined citizenship and voting protections.","Constitutional text removes slavery, defines national citizenship, and bars race-based voting exclusion for men.","Reconstruction transformed the Constitution even where enforcement failed.","Reconstruction produced no constitutional changes."),
        idea("gains and limits","Reconstruction expanded political participation while violence, discriminatory laws, and weak enforcement undermined rights.","Election records show Black officeholding, while reports document intimidation and disenfranchisement.","A complete evaluation recognizes constitutional gains and organized resistance to them.","New amendments immediately guaranteed equal treatment in every place.")
      ])
    ],
    g6:[
      lesson("Historical Influences on Contemporary Societies",[
        idea("colonial legacies","Colonial borders, languages, institutions, and trade patterns can continue after independence.","A modern border follows a colonial line that divided an older cultural region.","The present dispute has a historical context without being explained by history alone.","Contemporary borders have no historical origins."),
        idea("migration legacies","Past migrations can shape present languages, religions, foods, and population patterns.","Census and language maps show communities established through several migration waves.","The contemporary cultural pattern reflects both historical movement and later adaptation.","Migration never changes either origin or destination societies."),
        idea("trade connections","Long-term trade routes can influence urban growth and cultural exchange.","An old port remains a major city where regional routes met global shipping.","Historical connectivity helps explain the city's growth, though modern policy also matters.","Past trade cannot affect present settlement patterns."),
        idea("conflict and institutions","Societies may build laws and institutions in response to earlier conflict.","A constitution adopted after civil war divides power among regions and protects minority participation.","The design reflects lessons and compromises arising from historical experience.","Past conflict has no relationship to later political institutions."),
        idea("continuity and change","Comparing past and present evidence reveals what endured, changed, or was reinterpreted.","Older and current maps preserve a pilgrimage route while surrounding land use becomes urban.","The practice shows continuity within a transformed economic and physical setting.","Any visible continuity proves a society has not changed.")
      ]),
      lesson("Population, Migration, and World Regions",[
        idea("push and pull factors","Migration decisions may reflect interacting pressures and attractions.","Interviews mention drought and conflict at origin alongside jobs and family networks at destination.","The accounts support multiple push and pull factors rather than one universal motive.","Migration has only one economic cause."),
        idea("origin and destination effects","Migration can change labor, age structure, remittances, and culture in both places.","A destination gains working-age residents while families at origin receive remittances.","The same movement creates linked consequences across two regions.","Migration affects destinations but never origin communities."),
        idea("density and distribution","Population density measures people per unit of area, while distribution describes spatial pattern.","A small city district has fewer people than a state but many more people per square kilometer.","Total population and density answer different geographic questions.","Population density and total population are identical measures."),
        idea("physical and human geography","Climate, water, terrain, infrastructure, policy, and jobs all influence population patterns.","Settlements cluster in an arid region near rivers, roads, and employment centers.","The distribution reflects both environmental constraints and human systems.","Physical geography alone determines every population location."),
        idea("regional comparison","Comparable maps and data can reveal differences without treating regions as uniform.","National averages hide a dense coastal corridor and sparsely populated interior.","Analysis at more than one scale prevents an average from erasing internal variation.","Every part of a world region has identical human features.")
      ]),
      lesson("Economic Systems and Development",[
        idea("economic questions","Economic systems differ in how they answer what to produce, how to produce, and for whom.","Government plans set some prices while private firms make many other production decisions.","Real economies may combine market and government mechanisms.","Every economic system allocates resources in exactly the same way."),
        idea("factors of production","Land, labor, capital, and entrepreneurship shape production choices.","A region has mineral resources but lacks roads, trained workers, and investment.","Resources alone do not guarantee production without complementary factors.","Natural resources automatically create broad prosperity."),
        idea("scarcity and incentives","Scarcity requires choices, while incentives affect how households, firms, and governments respond.","A water shortage leads to higher prices, use limits, and investment in conservation.","Different policies can change behavior while distributing costs differently.","Scarcity has no effect on economic decisions."),
        idea("development indicators","GDP per capita, literacy, life expectancy, and inequality measure different dimensions.","Two countries have similar income averages but different health outcomes and income distributions.","Multiple indicators give a fuller picture than one national average.","One indicator completely measures human well-being."),
        idea("evaluating development","Development policies should be assessed for growth, distribution, sustainability, and local context.","A mine raises exports and tax revenue but displaces villages and pollutes water.","A responsible evaluation weighs economic gains against social and environmental costs.","Higher exports prove every group became better off.")
      ]),
      lesson("Limited Government and Citizenship",[
        idea("constitutional limits","Limited governments are constrained by constitutions, laws, institutions, and protected rights.","A court invalidates an executive action that exceeds authority granted by law.","The decision demonstrates a legal check on public power.","Limited government means government has no legitimate power."),
        idea("authoritarian contrast","Unlimited or authoritarian systems concentrate power and weaken meaningful checks.","An executive closes opposition media and cancels competitive elections.","The evidence indicates reduced accountability and political participation.","Citizens participate identically in every political system."),
        idea("participation","Political systems provide different opportunities to vote, organize, petition, and criticize officials.","Citizens can form competing parties and replace leaders through regular elections.","Competitive participation creates a method of accountability.","Voting alone guarantees every government decision protects rights."),
        idea("rights and duties","Rights, responsibilities, and civic duties interact in representative systems.","Citizens exercise speech rights while serving on juries and obeying lawful court decisions.","Citizenship includes both protected participation and obligations supporting institutions.","Rights never involve responsibilities or duties."),
        idea("evaluating government","Labels should be tested against actual institutions, procedures, and outcomes.","A constitution promises elections, but opposition candidates are barred and results cannot be reviewed.","Formal language alone does not prove meaningful political limits.","A written constitution automatically makes any government limited.")
      ]),
      lesson("Culture, Diffusion, and Innovation",[
        idea("diffusion pathways","Trade, migration, travel, conquest, and communication can spread cultural traits.","A food crop moves along merchant routes and becomes part of cuisines in distant regions.","Exchange networks help explain the trait's geographic spread.","Cultures never influence one another."),
        idea("local adaptation","Societies often modify borrowed ideas and technologies to fit local needs and values.","Builders adopt an outside architectural technique but use local materials and religious designs.","The result combines diffusion with local creativity.","A borrowed innovation remains identical everywhere."),
        idea("innovation and context","An innovation's effects depend on infrastructure, institutions, cost, and social choices.","Mobile banking expands quickly where phone access is high but bank branches are scarce.","Local conditions help explain why one technology has different effects across places.","Technology changes every society in exactly the same way."),
        idea("exchange and resistance","Cultural diffusion can produce cooperation, hybrid practices, debate, or resistance.","Young people adopt a global music style while using a local language and traditional instruments.","The example shows selective adaptation rather than total cultural replacement.","Diffusion always erases local culture."),
        idea("source-based interpretation","Artifacts, language maps, interviews, and trade records can trace diffusion but have limits.","Similar pottery appears along a trade route, while chemical analysis identifies different local clay.","The evidence supports shared design influence and local production.","Similar appearance alone proves every object came from one workshop.")
      ])
    ],
    g7:[
      lesson("Natural Texas and Indigenous Peoples",[
        idea("regional adaptation","Indigenous nations developed distinct economies and lifeways within Texas environments.","Caddo farming settlements appear in wetter eastern areas, while Plains groups used mobile bison economies.","Environment influenced opportunities without making every cultural choice inevitable.","All Texas Indigenous peoples were culturally identical."),
        idea("political diversity","Caddo, Karankawa, Jumano, Comanche, and other peoples had different political and diplomatic systems.","Spanish records describe separate alliances, trade negotiations, and conflicts among Native nations.","The evidence treats Indigenous nations as distinct political actors.","Indigenous Texas history began only when Europeans arrived."),
        idea("trade networks","Trade connected Texas peoples to broader regional networks before European colonization.","Marine shells and stone from distant sources appear at inland archaeological sites.","Material evidence supports long-distance exchange and movement.","Indigenous communities in Texas lived in complete isolation."),
        idea("source limitations","Archaeology, oral histories, and European records each preserve evidence and require contextual analysis.","A colonial report calls a nation nomadic and disorganized, while seasonal-site evidence shows planned movement.","Corroboration corrects the source's cultural bias and reveals organized adaptation.","Colonial labels should be accepted as neutral descriptions."),
        idea("continuity under change","Indigenous nations responded to horses, disease, warfare, markets, and settlement pressure while sustaining identities.","Comanche mobility expanded with horses, while kinship and diplomacy continued to organize society.","Historical change involved adaptation and continuity rather than cultural disappearance.","European contact immediately ended all Indigenous agency.")
      ]),
      lesson("Spanish and Mexican Texas",[
        idea("Spanish objectives","Spain used missions, presidios, settlements, and alliances to defend claims and extend influence.","A map places missions beside military posts along contested approaches to New Spain.","Location reveals religious and geopolitical purposes working together.","Spanish missions had no political or strategic purpose."),
        idea("mission experiences","Missions brought conversion efforts, labor demands, agriculture, disease, and cultural exchange.","Mission registers show baptisms and farming alongside deaths, departures, and repeated returns.","The records reveal negotiation and coercion rather than one uniform experience.","Every Indigenous person entered and remained in a mission voluntarily."),
        idea("Mexican independence","Mexican independence changed sovereignty and opened a new political period in Texas.","Official documents replace Spanish authority with Mexican institutions and citizenship rules.","The transition altered government even though some settlement practices continued.","Spanish and Mexican governments were identical in law and political context."),
        idea("colonization laws","Mexican colonization laws encouraged immigration while requiring conditions involving citizenship, loyalty, and law.","An empresario contract grants settlement authority but lists obligations to Mexican government.","The document shows opportunity bounded by public requirements.","Colonization laws gave settlers land with no obligations."),
        idea("growing conflict","Immigration, slavery, federalism, enforcement, and cultural differences contributed to disputes.","Petitions, decrees, and population data show tension building across several issues.","The conflict developed from interacting political and social causes.","One cultural disagreement alone explains every later conflict.")
      ]),
      lesson("Texas Revolution",[
        idea("political causes","Federalism disputes, Mexican policy changes, immigration, and local demands contributed to revolution.","Convention resolutions and government decrees show competing claims about lawful authority.","Primary documents locate the conflict within a broader political crisis.","The Revolution began without earlier political disputes."),
        idea("campaign chronology","Gonzales, the Alamo, Goliad, and San Jacinto had different places in the 1835–1836 campaign.","Dated maps show early resistance, Mexican advances, Texian retreat, and the final San Jacinto attack.","Sequence helps explain how defeat and retreat preceded decisive victory.","San Jacinto happened before Gonzales and the Alamo."),
        idea("strategic consequences","Battles mattered differently for time, morale, forces, and political momentum.","The Alamo delayed Mexican forces, while San Jacinto captured Santa Anna and ended the main campaign.","A battle's historical significance depends on its consequences, not casualty counts alone.","Every battle had the same strategic result."),
        idea("diverse participation","Tejanos, Anglo immigrants, Mexican soldiers, women, free and enslaved people, and Indigenous nations held varied positions.","Military rolls, petitions, and personal accounts record participation and disagreement within groups.","The Revolution cannot be accurately reduced to two culturally uniform sides.","Every Tejano supported the same political position."),
        idea("evaluating memory","Later monuments and narratives may emphasize some events while minimizing others.","A commemorative speech celebrates heroism, while a contemporary civilian letter describes fear and displacement.","Comparing memory with contemporary evidence creates a fuller interpretation.","A later commemoration is automatically a complete account of the event.")
      ]),
      lesson("Republic and Early Statehood",[
        idea("public debt","War costs, limited revenue, and currency problems created serious Republic debt.","Treasury reports show unpaid obligations and depreciating currency.","Fiscal evidence helps explain policy disputes during the Republic.","The Republic of Texas had no important debt."),
        idea("security and diplomacy","Relations with Mexico, Indigenous nations, and foreign governments shaped Republic policy.","Presidential messages seek recognition abroad while proposing different frontier policies.","Security involved diplomacy and contested policies, not only military action.","Republic leaders followed one identical foreign and Indigenous policy."),
        idea("annexation debate","Annexation supporters and opponents debated security, debt, sovereignty, slavery, and relations with Mexico.","Newspapers and congressional speeches emphasize different expected benefits and risks.","Annexation was controversial because it connected Texas questions to U.S. sectional politics.","Annexation involved no controversy in Texas or the United States."),
        idea("U.S.-Mexican War","Texas boundary claims contributed to a wider war that transformed territory and politics.","Prewar maps show disputed borders; the peace treaty transfers extensive land to the United States.","The war changed much more than Texas's immediate boundary.","Statehood ended every border dispute immediately and peacefully."),
        idea("consequences of statehood","Statehood connected Texas more fully to U.S. markets and politics while intensifying conflicts over slavery and expansion.","Rail, migration, and congressional records show economic integration and sectional debate.","Early statehood brought opportunities together with unresolved regional and national conflict.","Joining the United States solved every political and economic problem.")
      ]),
      lesson("Civil War and Reconstruction in Texas",[
        idea("secession and slavery","Texas secession documents identify slavery and white supremacy as central concerns.","The secession declaration describes threats to slaveholding society.","The primary source directly links the decision to protection of slavery.","Slavery played no role in Texas secession."),
        idea("wartime Texas","Texas supplied soldiers, livestock, cotton, and routes while also experiencing battles and internal dissent.","Military and trade records document coastal fighting, blockade running, and mobilization.","Texas was connected to the broader war despite distance from major eastern campaigns.","Texas was untouched by the Civil War."),
        idea("home-front disruption","Conscription, shortages, refugee movement, violence, and loss changed civilian life.","County records show price increases and reduced labor as soldiers left and trade narrowed.","The evidence reveals social and economic disruption beyond battlefield events.","The war affected soldiers but had no impact on Texas civilians."),
        idea("emancipation and labor","Juneteenth marked enforcement of emancipation in Texas, followed by struggles over labor and freedom.","Freedpeople's contracts and Bureau records show family reunification, wage negotiation, and coercive restrictions.","Legal freedom opened new choices while unequal power limited them.","Emancipation immediately created equal economic power."),
        idea("Reconstruction politics","New constitutional rules, Black political participation, federal policy, and violent resistance reshaped Texas.","Election data show expanded participation while reports document intimidation and segregation.","Reconstruction produced genuine political change that opponents worked to restrict.","Reconstruction restored the prewar political system without any change.")
      ])
    ],
    g8:[
      lesson("Colonial America",[
        idea("regional economies","Climate, land, markets, and labor systems helped produce distinct colonial regions.","Shipping and crop records contrast commercial ports, mixed farms, and plantation exports.","Regional economies reflected interacting geography and human institutions.","All British colonies developed identical economies."),
        idea("Indigenous power","Indigenous nations used diplomacy, trade, alliance, and warfare to protect interests.","Treaties show colonial governments negotiating with Native confederacies over land and security.","Native nations remained consequential political actors throughout colonization.","Indigenous nations had no diplomatic influence."),
        idea("racial slavery","Law and economic demand made hereditary racial slavery central to several colonial economies.","Statutes increasingly define enslaved status by ancestry while shipping records track forced migration.","The evidence shows slavery built through law, violence, and commerce.","Colonial labor systems were entirely voluntary."),
        idea("self-government within empire","Assemblies, town meetings, governors, and imperial rules created layered authority.","An elected assembly controls some taxes while a royal governor retains veto power.","Local political practice coexisted with British sovereignty and unequal participation.","Britain exercised no authority over its colonies."),
        idea("evaluating colonial narratives","Promotional accounts should be compared with Indigenous, enslaved, laborer, and demographic evidence.","A land pamphlet promises prosperity while mortality records and letters describe severe hardship.","Source purpose explains the contrast and cautions against treating promotion as full description.","A colonial advertisement objectively represents every inhabitant.")
      ]),
      lesson("Independence",[
        idea("escalation","British taxation, enforcement, colonial resistance, and punitive responses escalated imperial conflict.","A timeline connects the Stamp Act, protests, the Coercive Acts, and intercolonial organization.","The crisis developed through action and reaction over more than one policy.","Independence resulted from one isolated tax."),
        idea("Declaration principles","The Declaration grounds independence in equality, natural rights, consent, and listed grievances.","Its argument moves from general principles to accusations against the king.","The structure uses political theory to justify a specific break with authority.","The Declaration created the three branches of Congress."),
        idea("military turning points","Geography, resources, leadership, and strategy shaped the war's turning points.","The Saratoga victory encourages French alliance; Yorktown combines land and naval pressure.","Military success and diplomacy reinforced one another.","Foreign assistance had no effect on American victory."),
        idea("divided society","Patriots, Loyalists, neutral people, Indigenous nations, and enslaved people pursued different interests.","Petitions, runaway notices, and military records show choices that changed with location and opportunity.","The Revolution divided communities and offered unequal risks and possibilities.","All colonists supported independence from the beginning."),
        idea("outcomes and limits","Independence created republican governments but left slavery, dispossession, and unequal citizenship unresolved.","New state constitutions expand some representation while excluding women, enslaved people, and many poor men.","Revolutionary ideals changed politics without being fully applied.","Victory immediately secured equal rights for every person.")
      ]),
      lesson("The Constitution",[
        idea("weaknesses of the Articles","Financial, interstate, and enforcement problems under the Articles encouraged calls for revision.","Congress requests funds from states but lacks dependable power to collect revenue.","The weakness illustrates why delegates sought a stronger national framework.","The Articles gave Congress unlimited taxing and enforcement power."),
        idea("federalism","Federalism divides and shares authority between national and state governments.","Constitutional clauses grant national powers while reserving broad state responsibilities.","The system balances unity with continued state government.","Federalism eliminates state authority."),
        idea("separation and checks","Separated branches use checks to limit concentrated power.","The president nominates judges, the Senate confirms them, and courts interpret law.","The appointment process distributes authority among institutions.","Checks and balances create one unchecked supreme branch."),
        idea("ratification debate","Federalists and Anti-Federalists disagreed about power, liberty, representation, and the need for a bill of rights.","Pamphlets defend energetic national government while critics warn of distant consolidated power.","Ratification involved genuine constitutional tradeoffs rather than unanimous agreement.","Ratification produced no serious disagreement."),
        idea("constitutional reasoning","Applying the Constitution requires analyzing text, structure, precedent, rights, and governmental purposes.","A law pursues public safety but burdens political speech more broadly than necessary.","A sound evaluation considers both legitimate power and enforceable constitutional limits.","A useful policy cannot violate any constitutional protection.")
      ]),
      lesson("Reform Movements",[
        idea("reform conditions","Religious change, market growth, inequality, and democratic ideals encouraged antebellum reform.","Newspapers link revival meetings and voluntary societies to campaigns for education and temperance.","Reform grew from several social and intellectual conditions.","All reform movements arose from one event."),
        idea("abolition","Abolitionists used moral argument, testimony, newspapers, petitions, political action, and resistance.","Slave narratives and antislavery newspapers expose violence while demanding immediate change.","First-person evidence and organized advocacy challenged slavery publicly.","Abolitionists used no public argument or organizing."),
        idea("women's rights","Women's participation in reform helped generate organized demands for legal and political equality.","The Seneca Falls Declaration adapts language from the Declaration of Independence.","Reformers used familiar founding ideals to expose unequal citizenship.","Women's-rights activism had no relationship to other reform networks."),
        idea("strategy and disagreement","Reform coalitions disagreed over voting, parties, moral persuasion, immediacy, race, and gender.","Meeting records document splits even among people opposing the same injustice.","Shared goals did not erase strategic and ideological conflict.","Every reformer supported one identical strategy."),
        idea("evaluating impact","Reform impact includes legal change, public debate, institution building, backlash, and unfinished goals.","Petition totals rise and some state laws change, while national resistance remains strong.","The movement influenced politics before fully achieving its goals.","A movement matters only if it wins every demand immediately.")
      ]),
      lesson("Civil War and Reconstruction",[
        idea("sectional conflict and slavery","Slavery's expansion and political power drove sectional crisis and secession.","Party platforms, territorial debates, and secession declarations repeatedly center slavery.","Converging primary sources make slavery indispensable to a causal explanation.","The Civil War had no connection to slavery."),
        idea("Union and Confederate strategy","Strategy integrated armies, transportation, industry, diplomacy, and political objectives.","Union campaigns target the Mississippi and blockade trade while Confederate leaders seek survival and foreign recognition.","Strategy operated at military, economic, and political levels.","Strategy involved battlefield tactics only."),
        idea("emancipation as process","Enslaved people's flight and service, wartime policy, military victory, and amendment changed slavery's legal status.","Contraband camps, Black regiments, the Emancipation Proclamation, and the Thirteenth Amendment form connected evidence.","Emancipation emerged through actions from below and policy from above.","One presidential document alone immediately freed everyone everywhere."),
        idea("Reconstruction citizenship","The Fourteenth and Fifteenth Amendments transformed national definitions of citizenship and political rights.","The amendments establish birthright citizenship, equal protection, and voting protections for men regardless of race.","Constitutional change expanded federal responsibility for civil rights.","Reconstruction changed no constitutional rights."),
        idea("contested outcomes","Black political participation and institution building faced discriminatory law, economic coercion, and organized violence.","Election returns show officeholding while testimony documents terror and voter suppression.","Reconstruction combined democratic gains with a powerful counterrevolution.","Amendments instantly ended racial discrimination and violence.")
      ])
    ],
    g9:[
      lesson("World Regions and Spatial Patterns",[
        idea("region construction","Regions are analytical categories defined by selected physical, cultural, political, or economic traits.","The same countries appear in a climate region, a language region, and a trade region with different boundaries.","Regional boundaries depend on the question and criteria rather than existing as one permanent division.","Regions can be defined only by political borders."),
        idea("scale","Patterns visible at global scale may change at national or local scale.","A country appears densely populated nationally, but local data show concentration in two coastal corridors.","Changing scale exposes internal variation hidden by a national average.","Map scale never affects geographic interpretation."),
        idea("spatial association","Overlapping patterns can suggest a relationship but do not by themselves prove causation.","Maps show rainfall and crop production clustered together, while infrastructure also varies.","The overlap supports a hypothesis that should be tested with additional variables and evidence.","Two overlapping maps prove one pattern caused the other."),
        idea("formal and functional regions","Formal regions share a trait; functional regions organize around connections to a node.","A language area has a shared cultural trait, while a metropolitan commuter zone centers on a city.","Different region types describe similarity and interaction respectively.","Every region must have a single official border."),
        idea("evaluating map claims","Projection, classification, date, and source influence what a thematic map communicates.","Two maps use different class intervals and make inequality appear more or less dramatic.","Responsible interpretation checks methodology before comparing the visual patterns.","A map is objective evidence that requires no source evaluation.")
      ]),
      lesson("Physical Processes and Human Settlement",[
        idea("climate and settlement","Temperature and precipitation influence agriculture, water supply, building, and settlement costs.","Dense settlement clusters in a monsoon plain with water and fertile soils but recurring flood exposure.","Climate creates opportunities and risks that societies manage through choices.","Climate determines every human settlement decision."),
        idea("landforms and access","Mountains, rivers, coasts, and plains affect movement, trade, defense, and land use.","Ports cluster on navigable coasts while roads follow passes through a mountain chain.","Terrain channels access without making movement impossible.","Landforms have no effect on transportation networks."),
        idea("hazard and vulnerability","Disaster risk depends on the physical hazard, exposure, vulnerability, and capacity to respond.","Two cities face similar earthquakes, but stricter construction and emergency systems reduce losses in one.","Different vulnerability and preparedness explain different consequences.","The same hazard affects every society equally."),
        idea("adaptation and modification","People adapt to environments and also modify them through technology and institutions.","A dry city imports water, recycles wastewater, and limits outdoor use.","Human systems expand settlement possibilities while creating costs and dependencies.","Humans never modify physical environments."),
        idea("sustainability tradeoffs","Environmental decisions redistribute benefits, risks, and costs across places and generations.","A dam supplies power and irrigation but blocks fish migration and displaces communities.","Evaluation must compare energy and water gains with ecological and social consequences.","One economic benefit proves an environmental project is sustainable.")
      ]),
      lesson("Population and Migration",[
        idea("demographic transition","Birth and death rates can change at different stages of economic and social development.","A country's death rate falls before its birth rate, producing a period of rapid natural increase.","The timing of rate changes helps explain population growth better than total population alone.","Population growth depends only on immigration."),
        idea("push and pull factors","Conflict, environment, work, policy, education, and family networks can interact in migration.","Interviews cite drought and insecurity as pressures and jobs plus relatives as attractions.","Migration decisions are multi-causal and shaped by available routes and policies.","Migration has only economic causes."),
        idea("density and distribution","Density is a ratio; distribution describes where people are located.","A large country has low average density but several crowded urban corridors.","National density can conceal strong spatial concentration.","Population density and total population are identical."),
        idea("linked consequences","Migration changes labor markets, demographics, remittances, politics, and culture in origin and destination areas.","Workers abroad send income home while destination industries gain labor and cities face housing pressure.","The movement creates simultaneous and uneven effects in both places.","Migration affects destinations only."),
        idea("evaluating migration evidence","Rates, absolute totals, time periods, and source definitions must be compared carefully.","One graph reports a rising number of migrants while another shows migrants falling as a share of population.","Both can be accurate because they measure different quantities.","A single migration statistic gives complete context by itself.")
      ]),
      lesson("Economic Systems and Development",[
        idea("allocation systems","Market, command, and mixed systems differ in ownership, incentives, and allocation mechanisms.","Private firms set many prices while government funds health care and regulates pollution.","The economy combines market exchange with public decision-making.","Every economy makes production decisions identically."),
        idea("comparative advantage","Specialization can increase total output when trading partners focus on lower opportunity costs.","Country A sacrifices fewer machines per ton of grain, while Country B sacrifices fewer tons of grain per machine.","Opportunity costs support specialization even if one country is more productive in both goods.","The country producing more of everything can never benefit from trade."),
        idea("development measures","Income, health, education, inequality, and environmental indicators capture different outcomes.","GDP per capita rises while life expectancy stalls and regional inequality grows.","Growth in average income does not prove broad improvement in well-being.","One indicator completely measures development."),
        idea("trade distribution","Trade may create total gains while affecting workers, regions, firms, and consumers differently.","Consumers gain lower prices, export firms expand, and import-competing workers lose jobs.","Evaluation should distinguish aggregate benefits from distributional costs.","Trade benefits every group equally."),
        idea("policy evaluation","Development strategies should be tested for effectiveness, equity, resilience, and sustainability.","Export agriculture raises revenue but increases water stress and dependence on one volatile commodity.","A balanced assessment recognizes growth while identifying environmental and economic vulnerability.","Higher export revenue proves a policy has no serious risk.")
      ]),
      lesson("Culture and Globalization",[
        idea("culture as learned system","Culture includes learned beliefs, practices, institutions, identities, and expressions.","Children acquire language and customs through family, school, media, and community participation.","Cultural patterns are learned and can change rather than being biologically fixed.","Culture is inherited biologically and never changes."),
        idea("diffusion networks","Migration, trade, media, tourism, and digital communication spread cultural traits.","A music style travels through diaspora networks and online platforms.","Multiple connection networks explain diffusion without requiring conquest.","Cultural diffusion can occur only through military conquest."),
        idea("hybridity and adaptation","People adapt outside influences to local meanings and practices.","A global restaurant chain changes ingredients and menus to fit local dietary traditions.","The result reflects negotiation between global circulation and local culture.","Globalization makes every cultural product identical."),
        idea("power and globalization","Corporations, states, media platforms, and consumers have unequal influence over cultural circulation.","A streaming platform promotes some languages while its recommendation system makes others difficult to find.","Technology expands access while platform power shapes visibility.","Digital communication gives every culture equal influence."),
        idea("evaluating cultural change","Evidence can show exchange, resistance, continuity, and unequal effects at the same time.","Youth adopt global fashion while revitalizing a local language through social media.","Global connection can coexist with deliberate cultural preservation.","Adopting one outside practice proves local culture has disappeared.")
      ])
    ],
    g10:[
      lesson("Early Civilizations",[
        idea("agricultural transition","Agriculture supported larger settlements, food surplus, specialization, and new inequalities over time.","Storage facilities, irrigation works, and specialized tools appear in growing settlements.","The evidence supports gradual social reorganization rather than an instant single outcome.","Agriculture immediately created democracy everywhere."),
        idea("states and institutions","Early states developed taxation, law, administration, religion, and military authority in varied forms.","Tablets record grain taxes, labor obligations, and legal decisions.","Written administration helped rulers coordinate resources and authority.","All early civilizations used one identical government."),
        idea("environment and agency","Rivers, climate, and soils created opportunities and constraints that people addressed through institutions and technology.","Communities build canals in one river valley and flood-control works in another.","Similar environmental challenges could produce different organized responses.","Environment predetermined every political institution."),
        idea("social hierarchy","Surplus and state formation often accompanied occupational and status differences.","Burials, housing, and legal codes show unequal wealth and legal treatment.","Multiple sources indicate stratification while revealing that status systems differed.","Early cities had no social or economic inequality."),
        idea("source limits","Archaeology and surviving texts illuminate early societies but represent evidence unevenly.","Royal inscriptions praise a ruler, while settlement remains show ordinary households and periods of disruption.","Combining elite texts with material evidence produces a less one-sided interpretation.","A royal inscription objectively describes every person's experience.")
      ]),
      lesson("Classical Empires",[
        idea("imperial governance","Empires governed diverse peoples through combinations of administration, local elites, law, taxation, and force.","Provincial records show local officials collecting imperial taxes while retaining some customary law.","Imperial durability often depended on negotiation as well as coercion.","All classical empires governed every province identically."),
        idea("infrastructure and integration","Roads, ports, currencies, and legal systems connected imperial territories.","Travel records show reduced transport time after state road construction.","Infrastructure supported trade and administration while also enabling military control.","Imperial roads served commerce but never political power."),
        idea("trade and cultural exchange","Classical trade networks moved ideas, religions, technologies, and diseases with goods.","Coins, religious art, and imported ceramics appear along connected routes.","Material and cultural evidence shows exchange beyond luxury products alone.","Trade networks moved goods but never beliefs or technology."),
        idea("citizenship and hierarchy","Empires distributed rights, status, and obligations unequally and sometimes expanded citizenship strategically.","A decree grants provincial elites citizenship after military service.","Citizenship could integrate selected groups while preserving hierarchy.","Every imperial subject held equal political rights."),
        idea("integration and resistance","Conquest created exchange and political order but also rebellion, frontier conflict, and cultural resistance.","Tax records show integration while revolt accounts document opposition in the same province.","The evidence supports a mixed legacy rather than total acceptance or total failure.","Conquest permanently eliminated all resistance.")
      ]),
      lesson("Global Exchange",[
        idea("oceanic connections","After 1492, sustained oceanic routes linked the Americas, Africa, Europe, and Asia more intensively.","Shipping records trace silver from the Americas through Europe to Asian markets.","Global exchange connected distant regional systems through commodities and capital.","Global exchange moved only a few luxury goods."),
        idea("Columbian Exchange","Crops, animals, pathogens, and people moved between hemispheres with unequal effects.","American crops spread widely while Old World diseases devastated many Indigenous populations.","Biological exchange supported population growth in some regions and catastrophe in others.","Disease had no demographic effect in the Americas."),
        idea("coerced labor","Colonial production relied heavily on Indigenous coercion and transatlantic slavery.","Plantation ledgers and ship records document forced migration, labor, and mortality.","Commercial expansion was inseparable from institutions of violence and unfree labor.","Colonial labor was entirely voluntary."),
        idea("Indigenous and African agency","Colonized and enslaved people resisted, negotiated, preserved culture, and formed new communities.","Maroons establish independent settlements while Indigenous communities use courts and revolt.","People subjected to empire still shaped historical outcomes.","Colonized peoples had no agency within global exchange."),
        idea("evaluating global consequences","Exchange generated wealth and cultural connections while intensifying exploitation, ecological change, and inequality.","Port wealth grows as plantation zones experience deforestation and forced labor.","A global evaluation must trace who gained, who paid costs, and how effects changed over time.","Increased trade volume proves global exchange benefited everyone.")
      ]),
      lesson("Political and Industrial Revolutions",[
        idea("Enlightenment challenges","Enlightenment thinkers debated natural rights, sovereignty, toleration, and limits on authority.","Revolutionary declarations use consent and rights language against inherited privilege.","Political actors adapted Enlightenment ideas to justify challenges to established power.","Enlightenment ideas only defended absolute monarchy."),
        idea("different revolutionary outcomes","Atlantic revolutions shared some language but produced different citizenship, slavery, and political outcomes.","Declarations proclaim rights while constitutions and laws include different groups.","Revolutionary principles were applied unevenly according to power and context.","All political revolutions produced identical governments."),
        idea("industrial production","Mechanization, fossil energy, factories, and capital reorganized production.","Output records rise as spinning moves from households to powered mills.","Industrialization increased scale and productivity while changing control of work.","Industrialization reduced factory production."),
        idea("urban and labor change","Industrial growth accelerated urbanization and created new class, labor, health, and housing problems.","City censuses show rapid growth while investigations document crowded housing and dangerous factories.","Economic transformation produced both opportunity and severe social costs.","Industrialization reduced urban population and workplace conflict."),
        idea("comparative evaluation","Political and industrial revolutions redistributed power unevenly and generated reform as well as resistance.","Voting rules expand for some men while labor and abolition movements demand broader change.","Revolution should be evaluated through both institutional gains and exclusions that remained.","A revolution is successful only if it immediately solves every inequality.")
      ]),
      lesson("World Wars and Cold War",[
        idea("total war","The world wars mobilized states, economies, empires, technology, and civilian populations.","Rationing records, factory conversion, propaganda, and civilian casualty data extend beyond battlefields.","Total war blurred military and civilian spheres and expanded state power.","The world wars involved armies but not civilians or economies."),
        idea("genocide and civilian destruction","World War II included the Holocaust, other mass atrocities, strategic bombing, displacement, and enormous civilian death.","Deportation records, camp evidence, survivor testimony, and demographic loss corroborate systematic genocide.","Independent evidence establishes organized persecution and mass murder, not accidental wartime loss alone.","World War II violence affected soldiers only."),
        idea("postwar institutions","World War II reshaped borders and encouraged the United Nations, human-rights law, and new security institutions.","Founding documents cite failures to prevent aggression and atrocities.","Postwar institutions responded to wartime destruction even though they could not eliminate conflict.","World War II caused no important institutional change."),
        idea("Cold War rivalry","The Cold War combined ideological competition, alliances, proxy wars, economic aid, espionage, arms races, and deterrence.","Alliance treaties and records from Korea and Cuba show both indirect conflict and nuclear risk.","The rivalry was global and often violent without becoming one sustained direct U.S.–Soviet war.","The Cold War consisted only of direct battles between U.S. and Soviet armies."),
        idea("synthesis across eras","The world wars weakened empires, accelerated decolonization, and shaped Cold War conflicts in new states.","Independence movements grow as European empires weaken and superpowers compete for influence.","The postwar order joined decolonization with bipolar rivalry rather than beginning with a clean break from the past.","Decolonization and the Cold War developed independently of the world wars.")
      ])
    ]
  };

  const HISTORY_EXPECTATION_OVERRIDES={
    g2:["§113.13(c)(1)(A)","§113.13(c)(8)(A)","§113.13(c)(3)(A)","§113.13(c)(2)(A)","§113.13(c)(13)(A)"],
    g3:["§113.14(c)(1)(A)","§113.14(c)(4)(A)","§113.14(c)(7)(A)","§113.14(c)(14)(B)","§113.14(c)(6)(B)"],
    g4:["§113.15(c)(6)(A)","§113.15(c)(3)(A)","§113.15(c)(1)(B)","§113.15(c)(2)(B)","§113.15(c)(15)(A)"],
    g5:["§113.16(c)(1)(A)","§113.16(c)(2)(A)","§113.16(c)(15)(A)","§113.16(c)(4)(C)","§113.16(c)(4)(E)"],
    g6:["§113.18(c)(1)(A)","§113.18(c)(3)(B)","§113.18(c)(7)(B)","§113.18(c)(9)(A)","§113.18(c)(15)(D)"],
    g7:["§113.19(c)(2)(A)","§113.19(c)(2)(F)","§113.19(c)(3)(C)","§113.19(c)(4)(B)","§113.19(c)(5)(A)"],
    g8:["§113.20(c)(2)(B)","§113.20(c)(4)(A)","§113.20(c)(15)(D)","§113.20(c)(24)(B)","§113.20(c)(8)(B)"],
    g9:["§113.43(d)(9)(A)","§113.43(d)(8)(A)","§113.43(d)(7)(B)","§113.43(d)(10)(A)","§113.43(d)(18)(D)"],
    g10:["§113.42(d)(2)(A)","§113.42(d)(3)(A)","§113.42(d)(7)(B)","§113.42(d)(1)(E)","§113.42(d)(1)(F)"]
  };

  function rotate(values,amount){
    const offset=((amount%values.length)+values.length)%values.length;
    return values.slice(offset).concat(values.slice(0,offset));
  }

  function lessonWrongs(spec,slot){
    const values=[0,1,2,3,4]
      .map(offset=>spec.ideas[(slot+offset)%5].myth)
      .filter((value,index,list)=>value&&list.indexOf(value)===index);
    if(values.length<3) throw new Error(`${spec.name} needs three unique lesson-owned distractors.`);
    return values.slice(0,3);
  }

  function historyMc(q,answer,wrongs,explain,sequenceIndex){
    const answerText=String(answer);
    const uniqueWrongs=[...new Set(wrongs.map(String))].filter(value=>value!==answerText);
    if(uniqueWrongs.length!==3) throw new Error(`History question "${q}" needs three unique lesson-owned distractors.`);
    return {
      type:"mc",
      q,
      choices:rotate([answerText,...uniqueWrongs],sequenceIndex%4),
      answer:answerText,
      audio:q,
      explain
    };
  }

  function questionBase(tier,slot){
    const sequenceIndex=tier*5+slot+1;
    return {
      sequenceIndex,
      difficulty:tier+1,
      difficultyLabel:TIER_LABELS[tier]
    };
  }

  function buildHistoryQuestions(spec){
    const questions=[];
    spec.ideas.forEach((entry,slot)=>{
      const base=questionBase(0,slot);
      questions.push({...historyMc(
        `Which statement accurately establishes ${entry.label} in the lesson "${spec.name}"?`,
        entry.fact,
        lessonWrongs(spec,slot),
        `${entry.fact} This is the accurate foundation for ${entry.label}; each other choice contradicts evidence owned by this lesson.`,
        base.sequenceIndex
      ),...base});
    });
    spec.ideas.forEach((entry,slot)=>{
      const base=questionBase(1,slot);
      questions.push({...historyMc(
        `${entry.evidence} Which interpretation is best supported?`,
        entry.fact,
        lessonWrongs(spec,slot+1),
        `${entry.fact} The specific evidence in the prompt illustrates that relationship without claiming more than the source can show.`,
        base.sequenceIndex
      ),...base});
    });
    spec.ideas.forEach((entry,slot)=>{
      const base=questionBase(2,slot);
      const isTrue=slot%2===0;
      const claim=isTrue?entry.fact:entry.myth;
      questions.push({
        type:"truefalse",
        q:`True or false: ${claim}`,
        answer:isTrue,
        audio:`Evaluate this claim using the evidence from ${spec.name}.`,
        explain:isTrue
          ? `True. ${entry.fact} The lesson evidence supports this claim.`
          : `False. The claim conflicts with the lesson evidence. ${entry.fact}`,
        ...base
      });
    });
    spec.ideas.forEach((entry,slot)=>{
      const base=questionBase(3,slot);
      questions.push({...historyMc(
        `${entry.evidence} Which inference remains most defensible after checking chronology and context?`,
        entry.inference,
        lessonWrongs(spec,slot+2),
        `${entry.inference} This inference connects the named evidence to its context while avoiding an unsupported absolute conclusion.`,
        base.sequenceIndex
      ),...base});
    });
    spec.ideas.forEach((entry,slot)=>{
      const next=spec.ideas[(slot+1)%5];
      const base=questionBase(4,slot);
      const thesis=`Evidence A supports “${entry.fact}” Evidence B supports “${next.fact}” Together, the sources show related developments while preserving each source's context.`;
      const masteryWrongs=[
        `Evidence A proves “${entry.myth},” so Evidence B can be ignored.`,
        `Both sources prove that one event caused every later development, regardless of chronology or context.`,
        `Because the sources discuss related topics, neither source needs corroboration.`
      ];
      questions.push({...historyMc(
        `Evidence A: ${entry.evidence} Evidence B: ${next.evidence} Which thesis best evaluates both sources without overstating either one?`,
        thesis,
        masteryWrongs,
        `${thesis} This response states what each source supports and avoids turning related evidence into proof of a single, universal cause.`,
        base.sequenceIndex
      ),...base});
    });
    if(questions.length!==25||new Set(questions.map(item=>item.q)).size!==25){
      throw new Error(`${spec.name} must own exactly 25 unique history questions.`);
    }
    return questions;
  }

  Object.entries(H).forEach(([grade,specs])=>{
    const group=CURR[grade]?.hist;
    const course=TEKS_COURSES[grade]?.hist;
    if(!group||!course) return;
    specs.forEach((spec,index)=>{
      const lessonId=`L${index+1}`;
      const expectation=HISTORY_EXPECTATION_OVERRIDES[grade]?.[index];
      if(!expectation) throw new Error(`Missing TEKS expectation for ${grade}:hist:${lessonId}.`);
      const questions=buildHistoryQuestions(spec);
      if(Array.isArray(HISTORY_LESSON_BANK?.[grade])) HISTORY_LESSON_BANK[grade][index]=spec.name;
      group[lessonId]={
        name:spec.name,
        teks:{
          code:course[0],
          course:course[1],
          expectation,
          expectationText:`Analyze ${spec.name} using chronology, historical and geographic context, source evidence, corroboration, and cause-and-consequence reasoning.`,
          strand:"History and social studies skills",
          source:TEA_SOCIAL_STUDIES_SOURCE
        },
        gen:()=>progressiveQuestion(questions)
      };
    });
  });
})();
