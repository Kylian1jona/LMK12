(function(){
  class K12HistoryRunner extends HTMLElement {
    connectedCallback(){
      if(this.dataset.rendered === "true") return;
      this.dataset.rendered = "true";
      this.innerHTML = String.raw`
<!-- =========================
   HISTORY LESSON MENUS
========================== -->
<div id="g2-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 2 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','hist','L1')">Families and Communities</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','hist','L2')">Rules and Laws</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','hist','L3')">Maps and Places</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','hist','L4')">Important People</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g2','hist','L5')">Then and Now</button>
      </div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade2')">Back to Grade 2</button>
    </div>
  </div>
</div>

<div id="g3-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 3 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L1')">Communities</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L2')">Maps and Globes</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L3')">Local Leaders</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L4')">Timelines</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L5')">Needs and Wants</button>
      </div>
      <div class="lesson-column">
        <h3>Evidence, Civics, and Economics</h3>
        <p>Study sources, community change, government, geography, and economic choices.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L6')">Sources and Evidence from the Past</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L7')">Communities Change Over Time</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L8')">Local Government and Civic Participation</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L9')">Geography and Human-Environment Connections</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L10')">Producers, Consumers, and Economic Choices</button>
      </div>
      <div class="lesson-column">
        <h3>People, Places, and Connections</h3>
        <p>Explore culture, movement, citizenship, trade, maps, and timelines.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L11')">Indigenous Communities and Place</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L12')">Migration and Settlement</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L13')">Rules, Rights, and Responsibilities</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L14')">Trade and Interdependence</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L15')">Reading Maps and Timelines</button>
      </div>
      <div class="lesson-column">
        <h3>Community and Historical Thinking</h3>
        <p>Study local history, maps, money choices, and civic action.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L16')">Historical Questions and Evidence</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L17')">Landmarks and Community History</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L18')">Maps, Routes, and Regions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L19')">Saving, Spending, and Budgets</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L20')">Community Problem Solving</button>
      </div>
      <div class="lesson-column">
        <h3>How Communities Connect and Change</h3>
        <p>Study communication, culture, services, resources, and historical change.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L21')">Communication Across Time</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L22')">Community Traditions and Culture</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L23')">Public Services and Shared Spaces</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L24')">Resources and Economic Choices</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L25')">Explaining Change in History</button>
      </div>
      <div class="lesson-column">
        <h3>Communities Through Time</h3>
        <p>Explore timelines, travel, citizenship, work, and places.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L26')">Reading a Community Timeline</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L27')">Transportation and Trade Routes</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L28')">Citizenship in Action</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L29')">Jobs, Goods, and Services</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L30')">Comparing Places and Cultures</button>
      </div>
      <div class="lesson-column">
        <h3>Evidence, Resources, and Decisions</h3>
        <p>Use historical sources and study how communities work and change.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L31')">Maps as Historical Evidence</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L32')">Remembering Community Stories</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L33')">Local Decisions and Public Needs</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L34')">From Resources to Products</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L35')">Making Claims About the Past</button>
      </div>
      <div class="lesson-column">
        <h3>🏘️ Neighborhoods and Maps</h3>
        <p>Compare familiar places and use map clues to find your way.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L36')">Our Neighborhood Then and Now</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L37')">Maps and Community Landmarks</button>
      </div>
      <div class="lesson-column">
        <h3>🏛️ Community Life</h3>
        <p>Learn how local leaders make choices and goods reach stores.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L38')">Local Leaders and Shared Rules</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L39')">How Goods Travel to Stores</button>
      </div>
      <div class="lesson-column">
        <h3>📷 Stories from the Past</h3>
        <p>Learn from family traditions and details in old photographs.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L40')">Family and Community Traditions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L41')">Photos as Clues About the Past</button>
      </div>
      <div class="lesson-column">
        <h3>✉️ Tools Across Time</h3>
        <p>Compare school routines and messages from different times.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L42')">School Days Across Time</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L43')">Ways People Communicate</button>
      </div>
      <div class="lesson-column">
        <h3>💰 Choices and Change</h3>
        <p>Make a budget and help your community solve a problem.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L44')">Needs, Wants, and Smart Choices</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L45')">How Communities Solve Problems</button>
      </div>
      <div class="lesson-column"><h3>Communities and Government</h3><p>Learn how leaders, services, and citizens work together.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L46')">Community Leaders</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L47')">Local Services</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L48')">Rules and Laws</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L49')">Civic Participation</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L50')">Community Challenge</button>
      </div>
      <div class="lesson-column"><h3>Geography and Economics</h3><p>Connect places, resources, work, and choices.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L51')">Maps and Regions</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L52')">Natural Resources</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L53')">Producers and Consumers</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L54')">Saving and Spending</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L55')">Geography and Economics Challenge</button>
      </div>
      <div class="lesson-column"><h3>Past and Present</h3><p>Use sources and timelines to study change.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L56')">Primary Sources</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L57')">Timelines</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L58')">Community Change</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L59')">Historical Perspectives</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L60')">Past and Present Challenge</button>
      </div>
      <div class="lesson-column"><h3>Citizenship and Economics</h3><p>Make responsible community choices.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L61')">Good Citizenship</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L62')">Community Decisions</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L63')">Goods and Services</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L64')">Scarcity and Choice</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L65')">Citizenship and Economics Challenge</button>
      </div>
      <div class="lesson-column"><h3>Maps and Culture</h3><p>Use maps and explore community traditions.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L66')">Cardinal Directions</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L67')">Map Scale</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L68')">Regions and Landmarks</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L69')">Cultural Traditions</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L70')">Maps and Culture Challenge</button>
      </div>
      <div class="lesson-column"><h3>Government and Community</h3><p>Learn how public choices and services work.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L71')">Levels of Government</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L72')">Community Rules</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L73')">Public Services</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L74')">Voting and Voice</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L75')">Government Challenge</button>
      </div>
      <div class="lesson-column"><h3>Communities Around the World</h3><p>Compare places, traditions, and transportation.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L76')">Urban and Rural Communities</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L77')">Cultural Celebrations</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L78')">Homes and Environment</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L79')">Transportation</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L80')">Community Comparison Challenge</button>
      </div>
      <div class="lesson-column"><h3>Economics and Decisions</h3><p>Learn about jobs, budgets, trade, and choices.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L81')">Needs and Wants</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L82')">Jobs and Income</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L83')">Budgets</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L84')">Trade</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L85')">Economic Decision Challenge</button>
      </div>
      <div class="lesson-column"><h3>U.S. Symbols and Leaders</h3><p>Study national symbols, documents, and leaders.</p><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L86')">National Symbols</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L87')">Important Documents</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L88')">Community Leaders</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L89')">Historical Leaders</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L90')">Civic Symbols Challenge</button></div>
      <div class="lesson-column"><h3>Community History and Geography</h3><p>Use records, maps, and timelines.</p><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L91')">Local History Sources</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L92')">Community Timelines</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L93')">Land Use</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L94')">Movement and Migration</button><button type="button" class="btn btn-main" onclick="startLesson('g3','hist','L95')">Community History Challenge</button></div>
      <div class="lesson-column"><h3>Investigating Local History</h3><p>Learn what memories, objects, buildings, and maps can tell us.</p><button class="btn btn-main" onclick="startLesson('g3','hist','L96')">Oral Histories</button><button class="btn btn-main" onclick="startLesson('g3','hist','L97')">Objects from the Past</button><button class="btn btn-main" onclick="startLesson('g3','hist','L98')">Buildings Tell Stories</button><button class="btn btn-main" onclick="startLesson('g3','hist','L99')">Comparing Old Maps</button><button class="btn btn-main" onclick="startLesson('g3','hist','L100')">Checking Historical Claims</button></div>
      <div class="lesson-column"><h3>Community Trade and Choices</h3><p>Trace products and weigh decisions that affect neighbors.</p><button class="btn btn-main" onclick="startLesson('g3','hist','L101')">How Products Travel</button><button class="btn btn-main" onclick="startLesson('g3','hist','L102')">Choices at a Market</button><button class="btn btn-main" onclick="startLesson('g3','hist','L103')">Public Budgets</button><button class="btn btn-main" onclick="startLesson('g3','hist','L104')">Land and Local Jobs</button><button class="btn btn-main" onclick="startLesson('g3','hist','L105')">Making a Community Decision</button></div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade3')">Back to Grade 3</button>
    </div>
  </div>
</div>

<div id="g4-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 4 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L1')">Regions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L2')">State History</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L3')">Native Peoples</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L4')">Exploration</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L5')">Civic Responsibility</button>
      </div>
      <div class="lesson-column"><h3>Places and Early America</h3><p>Use geography and evidence to study early communities.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L6')">Map Skills</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L7')">United States Regions</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L8')">Indigenous Nations</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L9')">Exploration and Exchange</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L10')">Colonial Communities</button>
      </div>
      <div class="lesson-column"><h3>Government and Historical Evidence</h3><p>Connect major events, civic ideas, and source analysis.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L11')">American Revolution</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L12')">Constitution and Government</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L13')">Westward Expansion</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L14')">Primary and Secondary Sources</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L15')">Civic Participation</button>
      </div>
      <div class="lesson-column"><h3>Communities and Change</h3><p>Study government, economics, movement, and culture.</p><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L16')">State and Local Government</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L17')">Economics and Resources</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L18')">Migration and Settlement</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L19')">Timelines and Chronology</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L20')">Culture and Community</button></div>
      <div class="lesson-column"><h3>Ideas That Shape Communities</h3><p>Connect civic life, innovation, trade, and historical evidence.</p><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L21')">Rights and Responsibilities</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L22')">Transportation and Trade</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L23')">Inventors and Innovation</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L24')">Landmarks and Historic Places</button><button type="button" class="btn btn-main" onclick="startLesson('g4','hist','L25')">Making Historical Arguments</button></div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade4')">Back to Grade 4</button>
    </div>
  </div>
</div>

<div id="g5-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 5 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L1')">Early America</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L2')">American Revolution</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L3')">Constitution</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L4')">Westward Expansion</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L5')">Civil War Basics</button>
      </div>
      <div class="lesson-column"><h3>Building the United States</h3><p>Connect causes, events, and lasting changes with evidence.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L6')">Colonial America</button><button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L7')">Road to Revolution</button><button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L8')">Constitution and Bill of Rights</button><button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L9')">The Early Republic</button><button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L10')">Civil War and Reconstruction</button>
      </div>
      <div class="lesson-column"><h3>People, Change and Evidence</h3><p>Examine diverse experiences and build claims from reliable sources.</p><button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L11')">Indigenous Nations and Cultures</button><button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L12')">Westward Expansion and Its Effects</button><button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L13')">Immigration and Industrialization</button><button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L14')">Civil Rights and Civic Action</button><button type="button" class="btn btn-main" onclick="startLesson('g5','hist','L15')">Historical Evidence and Claims</button></div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade5')">Back to Grade 5</button>
    </div>
  </div>
</div>

<div id="g6-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 6 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g6','hist','L1')">Ancient Civilizations</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g6','hist','L2')">Mesopotamia</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g6','hist','L3')">Ancient Egypt</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g6','hist','L4')">Ancient Greece</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g6','hist','L5')">Ancient Rome</button>
      </div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade6')">Back to Grade 6</button>
    </div>
  </div>
</div>

<div id="g7-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 7 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','hist','L1')">World Religions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','hist','L2')">Medieval Europe</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','hist','L3')">Islamic Golden Age</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','hist','L4')">African Kingdoms</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g7','hist','L5')">Early Americas</button>
      </div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade7')">Back to Grade 7</button>
    </div>
  </div>
</div>

<div id="g8-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 8 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','hist','L1')">Colonial America</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','hist','L2')">Independence</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','hist','L3')">The Constitution</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','hist','L4')">Reform Movements</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g8','hist','L5')">Civil War and Reconstruction</button>
      </div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade8')">Back to Grade 8</button>
    </div>
  </div>
</div>

<div id="g9-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 9 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','hist','L1')">World Geography</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','hist','L2')">Ancient Trade Routes</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','hist','L3')">Revolutions</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','hist','L4')">Industrialization</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g9','hist','L5')">Nationalism</button>
      </div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade9')">Back to Grade 9</button>
    </div>
  </div>
</div>

<div id="g10-hist" class="section d-none">
  <div class="cardish text-center kid-font">
    <h1>Grade 10 History</h1>
    <p class="small-note">Choose a history skill.</p>

    <div class="lesson-columns">
      <div class="lesson-column">
        <h3>History</h3>
        <p>Study people, places, events, and evidence from the past.</p>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','hist','L1')">Modern World History</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','hist','L2')">Imperialism</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','hist','L3')">World War I</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','hist','L4')">World War II</button>
        <button type="button" class="btn btn-main" onclick="startLesson('g10','hist','L5')">Cold War</button>
      </div>
    </div>

    <div class="lesson-back-row">
      <button type="button" class="btn btn-main px-4" onclick="show('grade10')">Back to Grade 10</button>
    </div>
  </div>
</div>

<!-- =========================
   UNIVERSAL LESSON RUNNER
========================== -->
<div id="lessonRunner" class="section d-none">
  <div class="cardish text-center kid-font lesson-quiz-shell">
    <div class="lesson-quiz-topbar">
      <button type="button" class="lesson-back-circle" onclick="lrBack()" aria-label="Back to lessons">‹</button>
      <h1 id="lrTitle" class="lesson-quiz-title">Lesson</h1>
      <div class="lesson-points-pill"><span aria-hidden="true">●</span> <span id="lrPoints">0</span> points</div>
      <div class="lesson-progress-track" role="progressbar" aria-label="Lesson progress" aria-valuemin="0" aria-valuemax="25" aria-valuenow="1">
        <span id="lrProgressFill"></span>
      </div>
      <div class="lesson-count-pill" aria-label="Question progress"><span id="lrProg">1 / 25 questions</span></div>
    </div>

    <div class="lesson-like-row"><button type="button" id="lrLikeButton" class="lesson-like-button" aria-pressed="false" aria-label="Like this lesson" onclick="window.K12LessonLikes?.toggle()" disabled><span class="lesson-like-heart" aria-hidden="true">♡</span><span class="lesson-like-label">Like</span><span class="lesson-like-count" id="lrLikeCount">—</span></button><span class="lesson-like-caption">Likes from learners everywhere</span></div>
    <div class="lesson-question-banner" id="lrQuestionBanner">Question 1 of 25</div>

    <div class="quiz-card mt-2" id="lrQuestionCard">
      <div class="lesson-question-text" id="lrQuestion" tabindex="-1" aria-live="polite" aria-atomic="true">Question text…</div>
      <div class="lesson-image-frame" id="lrImageFrame">
        <img id="lrImage" class="lesson-img" alt="">
      </div>
      <div class="lesson-topic-visual" id="lrTopicVisual" aria-hidden="true"><i id="lrTopicIcon" class="fi fi-rr-book-alt"></i><span id="lrTopicLabel">Explore the question</span></div>

      <!-- NORMAL CHOICES -->
<div id="lrChoices"></div>

<div id="lessonExtra" class="lesson-type-box"></div>
<!-- ✅ DRAG & DROP AREA -->
<div id="lrDragArea" class="d-none">

  <!-- draggable words -->
  <div id="lrDragWords" class="drag-words"></div>

  <!-- drop targets -->
  <div id="lrDropZones" class="drop-zones"></div>

</div>

      <div class="d-flex justify-content-center mt-2 d-none" id="lrInputWrap">
        <input id="lrInput" type="text" class="form-control"
          style="max-width:260px;font-size:22px;font-weight:900;text-align:center;border-radius:16px;border:2px solid rgba(239,68,68,.60)"
          placeholder="Type answer">
      </div>

      <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
        <button type="button" class="btn btn-main lesson-read-button" onclick="lrReplay()" aria-label="Read this question aloud"><i class="fi fi-rr-volume lm-ui-icon" aria-hidden="true"></i><span>Read aloud</span></button>
        <button type="button" class="btn btn-main" onclick="lrPrevious()" id="lrPrevBtn" disabled>Previous Question</button>
        <button type="button" class="btn btn-main" onclick="lrCheck()" id="lrCheckBtn">Check</button>
        <button type="button" class="btn btn-main" onclick="lrNext()" id="lrNextBtn" disabled>Next</button>
      </div>

      <div class="feedback" id="lrFb"></div>
    </div>

    <div class="d-flex justify-content-center gap-2 flex-wrap mt-3 lesson-footer-actions" id="lrLessonActions">
      <button type="button" class="btn btn-main" onclick="lrRestart()">Restart</button>
      <button type="button" class="btn btn-main" onclick="lrBack()">Back</button>
    </div>

    <div class="quiz-card mt-3 d-none special-complete-card" id="lrDone">
      <div class="lesson-complete-icon-row">
        <img class="lesson-complete-medal" src="images/lesson-gold-medal.png" alt="Gold star medal earned for completing the lesson">
        <span class="lesson-complete-medal-count" id="lrMedalCount">1 medal earned</span>
      </div>
      <div class="lesson-complete-kicker">Lesson complete</div>
      <h2 style="font-weight:900;">You did it!</h2>
      <div class="stars" id="lrStars"></div>
      <div class="small-note lesson-result-summary" id="lrSummary"></div>
    </div>

  </div>
</div>
`;
    }
  }

  customElements.define("k12-history-runner", K12HistoryRunner);
})();
