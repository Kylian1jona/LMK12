/* The Extras workspace lives inside Grades and shares its navigation/access rules. */
(() => {
  'use strict';
  const library = document.querySelector('#grades .grade-library-v2');
  if (!library) return;
  const activities = [
    ['spelling', 'Aa', 'Spelling', 'Build words, discover spelling patterns, and learn from every try.', 'Words & sounds'],
    ['handwriting', '✎', 'Handwriting', 'Practice clear letters, even spacing, and confident sentences.', 'Write with care'],
    ['tracing', '〰', 'Tracing', 'Follow shapes and letter guides with your finger, mouse, or pen.', 'Move & create'],
    ['lifeskills', '☀', 'Life Skills', 'Work through everyday choices about routines, kindness, and independence.', 'Ready for real life'],
    ['typing', '⌨', 'Typing', 'Build keyboard confidence with live accuracy and a comfortable pace.', 'Find your flow'],
    ['money', '$', 'Money Skills', 'Practice coin values, change, budgets, and savings goals.', 'Make money count'],
    ['labs', '⚗', 'Labs', 'Explore science through observations, fair tests, data, and evidence.', 'Investigate & discover']
  ];
  const COURSE_GROUPS = {
    spelling:['Sounds & Patterns','Word Parts','Tricky Words'],
    handwriting:['Letters & Short Words','Sentences & Spacing','Clear Notes'],
    tracing:['Lines & Shapes','Capital Letters','Words & Control'],
    lifeskills:['Everyday Routines','Growing Independence','Real-World Decisions'],
    money:['Coins & Values','Prices & Change','Saving & Budgeting'],
    labs:['Observe & Predict','Plan a Fair Test','Evidence & Conclusions']
  };
  const TYPING_GROUPS = ['Home Row I','Home Row II','Top Row I','Top Row II','Bottom Row I','Bottom Row II','Numbers I','Numbers II & Capitals','Punctuation','Typing Fluency','Paragraphs: Beginner','Paragraphs: Intermediate','Paragraphs: Advanced'];
  const LESSONS_PER_LEVEL = 10;
  const courseGroupNotes = {
    spelling:['Hear each sound and connect it to a spelling pattern.','Build longer words from roots, beginnings, and endings.','Use memory clues to master words that do not sound exactly as expected.'],
    handwriting:['Form letters carefully and keep short words on the line.','Practice even letter size, word spacing, and punctuation.','Copy longer ideas so every line stays organized and readable.'],
    tracing:['Follow straight, curved, and turning paths with control.','Practice the stroke direction and shape of capital letters.','Trace full words smoothly while keeping their shapes balanced.'],
    lifeskills:['Practice safe, kind, and responsible choices for everyday moments.','Manage time, privacy, teamwork, and personal responsibilities.','Think through consequences before making more complex decisions.'],
    money:['Identify coin values and combine amounts accurately.','Subtract prices from the amount paid to find the correct change.','Plan how much to save, spend, and keep within a budget.'],
    labs:['Make careful observations and predict what the evidence may show.','Change one variable, keep conditions consistent, and compare results.','Use repeated evidence to support a conclusion and evaluate a claim.']
  };
  const typingGroupNotes = TYPING_GROUPS.map(()=> 'Choose a lesson and start typing.');
  const groupNames = id => id === 'typing' ? TYPING_GROUPS : COURSE_GROUPS[id];
  const groupNote = (id,level) => id === 'typing' ? typingGroupNotes[level] : courseGroupNotes[id][level];
  const studioTotal = id => groupNames(id).length * LESSONS_PER_LEVEL;
  const TOTAL_ACTIVITIES = activities.reduce((sum,[id]) => sum + studioTotal(id),0);
  const STORAGE_KEY = 'lmk12-extras-progress-v2';
  const TYPING_SETTINGS_KEY = 'lmk12-typing-settings-v1';
  const loadTypingSettings = () => {
    try { return {...{font:22,keyboard:true,sound:false,keyboardStyle:'classic',keyboardColor:'#3489df'},...JSON.parse(localStorage.getItem(TYPING_SETTINGS_KEY)||'{}')}; }
    catch (_) { return {font:22,keyboard:true,sound:false,keyboardStyle:'classic',keyboardColor:'#3489df'}; }
  };
  let typingSettings=loadTypingSettings();
  const saveTypingSettings=()=>{try{localStorage.setItem(TYPING_SETTINGS_KEY,JSON.stringify(typingSettings));}catch(_){}};
  const loadProgress = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {completed:saved.completed || {}, scores:saved.scores || {}, xp:Number(saved.xp) || 0, lastStudio:saved.lastStudio || 'spelling', lastLesson:saved.lastLesson || null};
    } catch (_) { return {completed:{},scores:{},xp:0,lastStudio:'spelling',lastLesson:null}; }
  };
  let progress = loadProgress();
  const saveProgress = () => {
    try { localStorage.setItem(STORAGE_KEY,JSON.stringify(progress)); } catch (_) { /* Progress is optional. */ }
  };
  const activityKey = (id,level,index) => `${id}:${level}:${index}`;
  const typingLessonNumber=(level,index)=>level*10+index+1;
  const typingLessonUnlocked=(level,index)=>{
    const number=typingLessonNumber(level,index);
    if(number===1)return true;
    for(let prior=1;prior<number;prior++)if(!progress.completed[activityKey('typing',Math.floor((prior-1)/10),(prior-1)%10)])return false;
    return true;
  };
  const studioCount = id => Object.keys(progress.completed).filter(key => key.startsWith(`${id}:`)).length;
  const totalComplete = () => Object.keys(progress.completed).filter(key => activities.some(([id]) => key.startsWith(`${id}:`))).length;
  const validLesson = lesson => lesson && activities.some(([id]) => id === lesson.id) && Number.isInteger(lesson.level) && lesson.level >= 0 && lesson.level < groupNames(lesson.id).length && Number.isInteger(lesson.index) && lesson.index >= 0 && lesson.index < LESSONS_PER_LEVEL;
  const nextIncomplete = id => {
    for (let level=0; level<groupNames(id).length; level++) {
      for (let index=0; index<LESSONS_PER_LEVEL; index++) {
        if (!progress.completed[activityKey(id,level,index)]) return {id,level,index};
      }
    }
    return {id,level:0,index:0};
  };
  const wordSets = [
    [['cat','A pet that meows.','The short a sound is in the middle.'],['ship','A large boat.','sh makes one sound.'],['rain','Water falling from clouds.','ai makes the long a sound.'],['tree','A plant with a trunk.','ee makes the long e sound.'],['light','The opposite of dark.','igh makes the long i sound.'],['jump','To push yourself up into the air.','Listen for the short u sound.'],['clock','It tells the time.','The word ends with ck.'],['green','The color made from blue and yellow.','The long e sound is spelled ee.'],['smile','A happy look on your face.','The silent e makes i say its name.'],['bright','Full of light.','The middle sound is spelled igh.']],
    [['because','Complete: I wore a coat ___ it was cold.','Remember the ending: cause.'],['friend','Someone you enjoy spending time with.','The vowel pair is ie.'],['careful','Taking care to avoid mistakes.','Add ful to care, with one l.'],['running','The -ing form of run.','Double the final n before adding ing.'],['happiness','The noun made from happy.','Change y to i, then add ness.'],['teacher','A person who helps students learn.','Add er to teach.'],['quickly','In a fast way.','Add ly to quick.'],['knowing','Understanding or being aware.','The k is silent.'],['beautiful','Very pleasing to see.','Begin with beau and end with tiful.'],['surprise','Something unexpected.','There is an r after the u.']],
    [['necessary','Needed or required.','One c, two s letters.'],['separate','To divide or keep apart.','There is an a after the p.'],['accommodate','To provide enough room for someone.','Double both c and m.'],['conscience','Your inner sense of right and wrong.','Look for science after con.'],['perseverance','Continuing even when something is difficult.','Start with persevere; replace the final e with ance.'],['achievement','Something completed through effort.','Start with achieve, then add ment.'],['environment','The natural world or your surroundings.','Listen for environ before ment.'],['rhythm','A repeated beat or pattern.','This word has no standard vowel.'],['recommend','To suggest something as a good choice.','Double the middle m.'],['independent','Able to work or act on your own.','Remember: in + depend + ent.']]
  ];
  const copySets = [
    ['Aa Bb Cc','Dd Ee Ff','Gg Hh Ii','Jj Kk Ll','Mm Nn Oo','Pp Qq Rr','Ss Tt Uu','Vv Ww Xx','Yy Zz','I can write.'],
    ['Leave space between words.','A bright bird visits our garden.','Can you find the blue notebook?','First, plan. Next, write.','Small steps lead to progress.','The quick fox jumps.','Every letter sits on the line.','Calm hands make clear words.','Please bring two sharp pencils.','Good notes help me remember.'],
    ['Clear notes make complex ideas easier to understand.','Compare the evidence before drawing a conclusion.','A thoughtful question can start a useful discussion.','Revise your explanation for precision and clarity.','Consistent practice builds confidence over time.','Headings help readers find important information.','Use examples to make your reasoning easy to follow.','Careful spacing keeps a full page readable.','Strong writers revise both ideas and presentation.','Organized notes turn details into useful knowledge.']
  ];
  const traceSets = [
    ['line','zigzag','circle','square','triangle','wave','loop','star','8','+'],
    ['A','B','C','M','S','H','T','E','R','O'],
    ['rain','grow','smile','brave','learn','create','focus','kindness','practice','confident']
  ];
  const typingSets = [
    [
      {title:'Meet F and J',tip:'Place your left index finger on F and your right index finger on J. Feel the small bumps.',keys:'F J',target:'fff jjj fff jjj'},
      {title:'Build the home row',tip:'Keep your fingers curved. Reach sideways, then return each finger home.',keys:'A S D F  J K L ;',target:'asdf jkl; asdf jkl;'},
      {title:'Use both hands',tip:'Let each hand type its own side. Move only the finger you need.',keys:'A S D F J K L',target:'sad dad fall ask'},
      {title:'Add G and H',tip:'Your index fingers reach inward for G and H, then come back to F and J.',keys:'G H',target:'flash glad hash'},
      {title:'Reach up for E and I',tip:'Use your middle fingers to reach up, then return to D and K.',keys:'E I',target:'like ride seed'},
      {title:'Reach up for R and U',tip:'Use your index fingers for R and U. Keep the other fingers relaxed.',keys:'R U',target:'run far sure'},
      {title:'Make a space',tip:'Tap the space bar gently with either thumb. Use one space between words.',keys:'SPACE',target:'the sun is up'},
      {title:'Reach for C and M',tip:'Move your middle finger down for C and your index finger down for M.',keys:'C M',target:'a cat can swim'},
      {title:'Add a capital',tip:'Hold Shift with one pinky while the other hand types the letter.',keys:'SHIFT',target:'We can learn.'},
      {title:'Type a full sentence',tip:'Choose accuracy over speed. Pause, reset your hands, and continue.',keys:'ALL STARTER KEYS',target:'A small bird can fly.'}
    ],
    [
      {title:'Top-row reach',tip:'Reach up without lifting your whole hand. Return to the home row after each letter.',keys:'Q W E R T Y U I O P',target:'quiet power trip'},
      {title:'Bottom-row reach',tip:'Curl your fingers down for the bottom row, then return home.',keys:'Z X C V B N M',target:'mix brown cubes'},
      {title:'Smooth word groups',tip:'Read one word ahead so your hands can move without rushing.',keys:'WORDS',target:'Small steps make a big difference.'},
      {title:'Comma and space',tip:'Type a comma with your right middle finger, then add one space.',keys:',',target:'We packed apples, bread, and water.'},
      {title:'Question marks',tip:'Hold Shift and tap the slash key with your right pinky.',keys:'?',target:'Can you type this question?'},
      {title:'Apostrophes',tip:'Use your right pinky for the apostrophe. Do not add a space around it.',keys:"'",target:"It's time to begin."},
      {title:'Numbers',tip:'Reach up from the home row. Look at the screen again after each number.',keys:'1 2 3 4 5',target:'Pack 2 books and 3 pens.'},
      {title:'Capital names',tip:'Use the opposite pinky for Shift so your typing hand stays balanced.',keys:'SHIFT',target:'Maya and Jordan read together.'},
      {title:'Sentence rhythm',tip:'Type in short, steady groups instead of racing one letter at a time.',keys:'FLUENCY',target:'Practice slowly, then build speed.'},
      {title:'Accuracy check',tip:'When something looks wrong, stop and fix it before moving on.',keys:'REVIEW',target:'Careful typing is clear typing.'}
    ],
    [
      {title:'Semicolons',tip:'A semicolon joins two closely related thoughts. Use your right pinky.',keys:';',target:'Accuracy comes first; speed follows.'},
      {title:'Lists with punctuation',tip:'Keep a steady rhythm through commas, spaces, and the final period.',keys:', .',target:'Plan, build, test, and review.'},
      {title:'Quotation marks',tip:'Hold Shift while tapping the apostrophe key. Watch both quotation marks.',keys:'"',target:'"Show your evidence," she said.'},
      {title:'Time and numbers',tip:'Use a light touch on the number row and check the colon carefully.',keys:'0–9 :',target:'We will meet at 10:30.'},
      {title:'Parentheses',tip:'Use Shift with 9 and 0. Return your hands to home position.',keys:'( )',target:'The result (after 12 trials) was clear.'},
      {title:'Hyphens',tip:'The hyphen sits beside zero. Type it without stretching your whole hand.',keys:'-',target:'A well-planned project is easier to finish.'},
      {title:'Mixed capitals',tip:'Switch Shift hands depending on which letter you need to capitalize.',keys:'SHIFT',target:'Dr. Lee visited New York in June.'},
      {title:'Precise editing',tip:'Correct errors as soon as you notice them, then rebuild your rhythm.',keys:'BACKSPACE',target:'Thoughtful revision improves clarity and tone.'},
      {title:'Longer passage',tip:'Pause at punctuation and keep your shoulders relaxed.',keys:'FLUENCY',target:'Strong typing feels steady, accurate, and comfortable.'},
      {title:'Final challenge',tip:'Focus on clean, exact typing. Speed is only useful when the words are right.',keys:'ALL KEYS',target:'At 8:45, Maya asked, "Is our well-planned project ready?"'}
    ]
  ];
  const TL = (title,keys,focus,target,tip,goalWpm=0,goalAccuracy=90) => ({title,keys,focus,target,tip,goalWpm,goalAccuracy});
  const legacyTypingCurriculum = [
    [
      TL('Finger Placement','HOME POSITION',['f','j'],'fff jjj fff jjj','Sit tall with relaxed shoulders. Place your index fingers on the raised F and J keys, then let the other fingers rest naturally.'),
      TL('Home Row I','F J',['f','j'],'fj jf ff jj fj jf','Use your index fingers only. Tap lightly and return to the raised keys after every press.'),
      TL('Home Row II','D K',['d','k'],'dk kd dd kk dk kd','Your middle fingers type D and K. Keep your index fingers resting on F and J.'),
      TL('Home Row III','S L',['s','l'],'sl ls ss ll sl ls','Your ring fingers type S and L. Move the finger, not the whole hand.'),
      TL('Home Row IV','A ;',['a',';'],'a; ;a aa ;; a; ;a','Your pinkies type A and semicolon. Keep your wrists level and your touch gentle.'),
      TL('Home Row Review','A S D F J K L ;',['a','s','d','f','j','k','l',';'],'asdf jkl; fdsa ;lkj','Reset on F and J between groups. Each finger owns one home-row key.'),
      TL('Simple Home-Row Words','HOME ROW',['a','s','d','f','j','k','l'],'sad fall ask dad flask','Read one word ahead and let the correct finger move while the others stay home.'),
      TL('Home-Row Accuracy','HOME ROW',['a','s','d','f','j','k','l',';'],'fall; ask dad; sad flask;','Accuracy comes before speed. Stop, correct errors, and reset your fingers.'),
      TL('Top Row I','E I',['e','i'],'ei ie ee ii lie see','Use your left middle finger for E and right middle finger for I, then return to D and K.'),
      TL('Top Row II','R U',['r','u'],'ru ur rr uu fur rule','Use your index fingers for R and U. Reach up, tap, and return home.')
    ],
    [
      TL('Top Row III','W O',['w','o'],'wo ow ww oo low row','Your ring fingers reach up for W and O. Keep your palms steady.'),
      TL('Top Row IV','Q P',['q','p'],'qp pq qq pp pop quip','Your pinkies reach for Q and P. Make the reach small and controlled.'),
      TL('Top Row V','T Y',['t','y'],'ty yt tt yy try yet','Your index fingers stretch to T and Y. Return to F and J after each tap.'),
      TL('Top + Home Rows','TWO ROWS',['q','w','e','r','t','y','u','i','o','p'],'quiet type power read','Keep a steady home position while your fingers reach to the top row.'),
      TL('Two-Row Words','WORDS',['q','w','e','r','t','y','u','i','o','p'],'red read write power quiet','Type each word as one smooth group, then use your thumb for the space.'),
      TL('Two-Row Sentences','SENTENCES',[],'We read. You write. It is quiet.','Use the opposite pinky for Shift and return both hands to home position.'),
      TL('Bottom Row I','C ,',['c',','],'c, ,c cc ,, can, ice,','Your left middle finger types C and right middle finger types comma.'),
      TL('Bottom Row II','V M',['v','m'],'vm mv vv mm move vim','Your left index finger reaches for V and your right index finger reaches for M.'),
      TL('Bottom Row III','X .',['x','.'],'x. .x xx .. mix. fix.','Your left ring finger types X and right ring finger types the period.'),
      TL('Bottom Row IV','Z /',['z','/'],'z/ /z zz // quiz/ zip/','Your pinkies reach down for Z and slash. Keep the movement small.')
    ],
    [
      TL('Bottom Row V','B N',['b','n'],'bn nb bb nn bend number','Your index fingers reach for B and N, then return to F and J.'),
      TL('All Letter Rows','A–Z',[],'quick brown fox jumps over the lazy dog','Use all three letter rows while keeping your hands centered on the home row.'),
      TL('Common Short Words','WORD FLOW',[],'the and you for are with','Common words should feel smooth. Read ahead and type in word-sized groups.'),
      TL('Common Long Words','LONG WORDS',[],'because people different together','Break long words into smaller chunks while keeping an even rhythm.'),
      TL('Accuracy Challenge','ALL LETTERS',[],'Pack my red box with five dozen quality jugs.','Slow down enough to keep every letter exact.',0,95),
      TL('Capital Letters I','LEFT SHIFT',['ShiftLeft'],'Jump Run Keep Move','Hold left Shift with your pinky while the right hand types the capital letter.'),
      TL('Capital Letters II','RIGHT SHIFT',['ShiftRight'],'Ask Fall Smile Write','Hold right Shift with your pinky while the left hand types the capital letter.'),
      TL('Capitalized Words','NAMES & PLACES',['ShiftLeft','ShiftRight'],'Maya visits Chicago with Jordan.','Choose the Shift key opposite the hand that types the capital letter.'),
      TL('Capitalized Sentences','SENTENCE STARTS',['ShiftLeft','ShiftRight'],'Every sentence begins with a capital letter.','Prepare the Shift key before the first letter, then release it right away.'),
      TL('Periods & Commas','. ,',['.',','],'We packed apples, bread, and water.','Use your right middle finger for comma and right ring finger for period.')
    ],
    [
      TL('Question Marks','?',['/','ShiftLeft'],'Can you type this question?','Hold a Shift key and tap slash with your right pinky.'),
      TL('Exclamation Marks','!',['1','ShiftRight'],'Great work! Keep typing!','Hold right Shift and tap 1 with your left pinky.'),
      TL('Apostrophes',"'",["'"],"I don't think we're late.",'Use your right pinky for apostrophes. Do not add spaces around them.'),
      TL('Quotation Marks','"',["'",'ShiftLeft'],'"Practice makes progress," she said.','Hold Shift while tapping the apostrophe key for each quotation mark.'),
      TL('Sentence Punctuation','MIXED',[],"Wait, are we ready? Yes, we're ready!",'Pause at punctuation, use the correct Shift key, and continue with a steady rhythm.'),
      TL('Numbers I','1 2 3 4 5',['1','2','3','4','5'],'1 2 3 4 5 54321','Reach from the home row with your left hand and check each number on screen.'),
      TL('Numbers II','6 7 8 9 0',['6','7','8','9','0'],'6 7 8 9 0 09876','Reach with your right hand and return your fingers to the home row.'),
      TL('Number Sequences','DATES · AGES · SCORES',[],'09/17/2026  age 12  score 98','Use light reaches for numbers and watch slashes and spaces carefully.'),
      TL('Numbers + Words','MIXED TEXT',[],'I have 12 books and 3 blue pens.','Look ahead so switching between letters and numbers does not break your rhythm.'),
      TL('Common Symbols','@ # $ % &',['@','#','$','%','&'],'email@home #1 $20 50% R&D','Hold Shift with the opposite hand and reach to the number row for each symbol.')
    ],
    [
      TL('More Symbols','( ) - _ + =',['(',')','-','_','+','='],'(ready) well-planned first_place 4+5=9','Use Shift only where needed and return your hands home after each symbol.'),
      TL('Paragraph Typing','SHORT PARAGRAPH',[],'A calm typist reads ahead and keeps a steady rhythm. Accuracy makes every message easier to understand.','Type in phrases, pause at punctuation, and keep your shoulders relaxed.'),
      TL('Accuracy Training','95%+ ACCURACY',[],'Careful typing builds reliable habits. Correct each mistake before you continue.','Aim for at least 95% accuracy. A smooth, correct rhythm matters more than rushing.',0,95),
      TL('Speed I','15 WPM',[],'I can type with calm hands and steady eyes. I choose accuracy first and let speed grow with practice.','Keep an even pace and aim for 15 words per minute.',15,95),
      TL('Speed II','20 WPM',[],'Daily practice helps my fingers find each key without looking down. I stay relaxed and correct mistakes quickly.','Read one or two words ahead and aim for 20 words per minute.',20,95),
      TL('Speed III','25 WPM',[],'Strong typing combines accurate fingers, steady breathing, and careful reading. Each sentence should feel smooth and controlled.','Use phrase-sized bursts and aim for 25 words per minute.',25,95),
      TL('Speed IV','30 WPM',[],'When I type a longer passage, I keep my wrists level, return to the home row, and maintain a comfortable rhythm.','Stay controlled while working toward 30 words per minute.',30,95),
      TL('Real-World Typing','MESSAGES & PASSAGES',[],'Hi Jordan, I finished the science notes. Can we review them at 4:30? Please bring the chart. Thanks!','Type a useful message with capitals, punctuation, numbers, and a friendly tone.',25,95),
      TL('Advanced Challenge','35–40 WPM',[],'Confident typists balance speed with precision. They read ahead, use the correct fingers, and fix errors without losing their rhythm.','Aim for 35 words per minute or more while keeping at least 95% accuracy.',35,95),
      TL('Typing Mastery','FULL TIMED TEST',[],'Typing is a practical skill built through patient repetition. Keep your eyes on the text, trust the finger patterns you learned, and finish this final passage with steady accuracy and confident speed.','Use every skill from the course. Aim for 40 words per minute and 95% accuracy.',40,95)
    ]
  ];
  const advancedTypingTargets = [
    ['Accuracy reset','Common word control','Short sentence control','Capital accuracy','Punctuation accuracy','Number accuracy','Mixed-key accuracy','Backspace control','No-look challenge','Accuracy checkpoint'],
    ['Warm-up sprint','Ten-word sprint','Fifteen-word sprint','Smooth sentences','Rhythm builder','Quick capitals','Quick punctuation','Quick numbers','Thirty-second push','Speed checkpoint'],
    ['Class notes','Science vocabulary','Math explanations','History notes','Reading response','Research keywords','Headings and lists','Directions and steps','Short email','School-work checkpoint'],
    ['Story opening','Character action','Setting details','Dialogue practice','Poetry lines','Game instructions','Friendly message','Journal entry','Creative paragraph','Creative checkpoint'],
    ['Precision review','Full keyboard review','Editing test','Timed paragraph I','Timed paragraph II','Data entry','Formal message','Two-paragraph test','Final speed test','Typing mastery']
  ];
  const advancedPassages = [
    'calm hands type clear words','The quick student checks every word.','Accuracy grows when I slow down and correct each mistake.','Maya brought 3 charts, 2 maps, and a blue notebook.','Can careful practice build speed? Yes, it can!',
    'A steady rhythm helps my fingers move without looking down.','Science notes explain how water changes from liquid to vapor.','First, solve the equation. Next, check each step and label the answer.','In 1969, people watched the first Moon landing on television.','I read the passage, found the evidence, and wrote a clear response.',
    'The lantern glowed beside the quiet path as rain touched the leaves.','"Wait for me," called Jordan, as the old gate swung open.','Plan the game, test each rule, and revise anything that feels unfair.','Hi Sam, I finished our outline. Can we review it at 4:15? Thanks!','Confident typists balance speed, accuracy, posture, and careful reading.'
  ];
  advancedTypingTargets.forEach((titles,groupIndex)=>legacyTypingCurriculum.push(titles.map((title,index)=>{
    const passage=advancedPassages[(groupIndex*3+index)%advancedPassages.length];
    const repeats=groupIndex>=3?`${passage} ${advancedPassages[(groupIndex*3+index+4)%advancedPassages.length]}`:passage;
    return TL(title,groupIndex===0?'ACCURACY':groupIndex===1?'SPEED':groupIndex===2?'SCHOOL TEXT':groupIndex===3?'CREATIVE TEXT':'ALL KEYS',[],repeats,'Keep your eyes on the screen, use a light touch, and correct mistakes as you go.',groupIndex===0?0:20+groupIndex*5,groupIndex===0?95:92);
  })));
  const typingPlanTitles=`Introducing F and J
Practicing F and J
Introducing D and K
Practicing D and K
Combining F, J, D, and K
Introducing S and L
Practicing S and L
Combining F, J, D, K, S, and L
Introducing A and ;
Practicing A and ;
Combining All Home Row Keys
Home Row Letter Patterns
Home Row Alternating Hands
Home Row Two-Letter Combinations
Home Row Three-Letter Combinations
Home Row Word Building
Introducing the Spacebar
Home Row Words and Spaces
Home Row Sentence Practice
Home Row Mastery
Introducing E and I
Practicing E and I
Combining E and I with Home Row
Introducing R and U
Practicing R and U
Combining R and U with Learned Keys
Introducing W and O
Practicing W and O
Combining W and O with Learned Keys
Introducing Q and P
Practicing Q and P
Combining Q and P with Learned Keys
Introducing T and Y
Practicing T and Y
Combining T and Y with Learned Keys
Top Row Letter Combinations
Top Row Word Building
Home and Top Row Words
Home and Top Row Sentences
Top Row Mastery
Introducing C and M
Practicing C and M
Combining C and M with Learned Keys
Introducing V and N
Practicing V and N
Combining V and N with Learned Keys
Introducing X and B
Practicing X and B
Combining X and B with Learned Keys
Introducing Z
Practicing Z
Combining Z with Learned Keys
Bottom Row Letter Combinations
Bottom Row Word Building
Combining All Three Rows
Three-Letter Word Practice
Four-Letter Word Practice
Five-Letter Word Practice
Full Alphabet Sentence Practice
Alphabet Mastery
Introducing 4 and 7
Practicing 4 and 7
Introducing 3 and 8
Practicing 3 and 8
Combining 3, 4, 7, and 8
Introducing 2 and 9
Practicing 2 and 9
Combining Learned Number Keys
Introducing 1 and 0
Practicing 1 and 0
Combining Learned Number Keys
Introducing 5 and 6
Practicing 5 and 6
Combining All Number Keys
Number Row Mastery
Introducing Left and Right Shift
Practicing Shift Keys
Capitalizing Individual Letters
Capitalizing Words and Names
Capitalization Mastery
Introducing Period and Comma
Practicing Period and Comma
Introducing Question Mark and Exclamation Mark
Practicing Question Mark and Exclamation Mark
Combining Sentence Punctuation
Introducing Apostrophe and Quotation Marks
Practicing Apostrophe and Quotation Marks
Introducing Hyphen and Parentheses
Practicing Hyphen and Parentheses
Punctuation Mastery
Combining Letters and Numbers
Combining Letters and Punctuation
Combining Capitalization and Punctuation
Short Sentence Typing
Medium Sentence Typing
Long Sentence Typing
Short Paragraph Typing
Multiple Paragraph Typing
Full Keyboard Review
Final Typing Mastery Test`.split('\n');
  const paragraphTopics=['My Favorite Season','A Day at the Beach','How Plants Grow','Why Exercise Is Important','The Importance of Drinking Water','How Rain Is Formed','A Visit to the Zoo','Why We Need Sleep','The Life Cycle of a Butterfly','How Animals Survive in the Wild','How Cars Work','What Causes Global Warming?','How Airplanes Fly','How the Internet Works','The History of Computers','How Electricity Is Generated','Why Earth Has Seasons','How the Human Brain Works','The Importance of Recycling','How Hurricanes Form','How Artificial Intelligence Works','The Causes and Effects of Climate Change','How Electric and Hybrid Cars Work','The History of Space Exploration','How the Human Immune System Works','The Science Behind Earthquakes','How Modern Cities Are Designed','The Advantages and Disadvantages of Social Media','How Renewable Energy Can Change the World','The Future of Transportation'];
  const homeTargets=['f j f j ff jj','fj jf fj jf fff jjj','d k d k dd kk','dk kd dd kk dk kd','fd jk df kj fj dk','s l s l ss ll','sl ls ss ll sl ls','sad lad fall flask','a ; a ; aa ;;','a; ;a as la; all','asdf jkl; fdsa ;lkj','asdf fdsa jkl; ;lkj','fj dk sl a; jf kd ls ;a','fa ja ds kl as ;l','fjd dks sla a;f','sad dad fall ask flask','f j  d k  s l','sad lad ask fall dad','A dad asks; a lad falls.','A skilled lad asks a dad; all fall.'];
  const topTargets=['e i e i ee ii','ei ie ee ii lie see','side like idea desk','r u r u rr uu','ru ur fur rule','read ride sure rude','w o w o ww oo','wo ow low row','slow word road wore','q p q p qq pp','qp pq pop quip','quiet paper power','t y t y tt yy','ty yt try yet','type today your','quiet type power write','read write quiet power','the red kite flew over us','We write our ideas with care.','Quiet writers type with steady hands.'];
  const bottomTargets=['c m c m cc mm','cm mc can calm','come music camera','v n v n vv nn','vn nv van never','seven move vine','x b x b xx bb','xb bx box extra','blue box next','z z zz zzz','zip zone lazy','amaze size dozen','zxcv bnm, mnbv','cat van box zoom','quick brown fox jumps over the lazy dog','cat dog sun map red','book fish jump rain','smile plant river cloud','Pack my box with five dozen jugs.','The quick brown fox jumps over the lazy dog.'];
  const numberTargets=['4 7 44 77 47 74','47 74 4477 7744','3 8 33 88 38 83','38 83 3388 8833','3478 7834 4738','2 9 22 99 29 92','29 92 2299 9922','234789 987432','1 0 11 00 10 01','10 01 1100 0011','10293847 74839201','5 6 55 66 56 65','56 65 5566 6655','1234567890 0987654321','Room 47 has 28 chairs and 15 desks.'];
  const punctuationTargets=['A a S s D d F f','Maya Lee Sam Jordan','Ava and Noah visit Chicago.','Maya, Jordan, Ava, and Leo','Every Sentence Starts With A Capital.','stop. pause, continue.','Plan, build, test, and review.','Ready? Begin!','Can you type this? Yes!','Wait, are we ready? Yes, we are!','I am ready. "Begin," she said.','"I can type," Maya said.','well-planned (clear) short-term','A well-planned trip (with maps) is safer.','At 4:30, Maya asked, "Is the well-planned test ready?"'];
  const fluencyTargets=['Room 12 has 4 blue chairs and 7 desks.','Type clearly, pause, and check every word.','Maya asked, "Can we begin at 3:15?"','Calm hands type clear words.','Daily practice builds speed while careful corrections protect accuracy.','Strong typists read ahead, use every finger, and keep a steady rhythm through longer sentences.','Typing is a useful skill for school, work, creativity, and communication. Practice with patience and track your progress.','First, read the full prompt. Next, type each sentence carefully. Finally, check capitalization, numbers, spacing, and punctuation.\n\nA second paragraph tests whether you can keep your rhythm after a short pause.','At 8:45, Dr. Lee sent 3 notes: "Bring the chart, review page 12, and check every result."','Confident typists combine accurate fingers, steady pacing, correct punctuation, and focused reading. This final test uses the full keyboard and rewards patient control.'];
  const paragraphPassages=paragraphTopics.map((topic,index)=>{
    const beginner=[
      'My favorite season is autumn because the air feels cool and the leaves turn bright colors. I enjoy walking outside, wearing a warm sweater, and hearing dry leaves crunch under my shoes.',
      'A day at the beach can be full of simple adventures. We build sandcastles, watch the waves, collect smooth shells, and rest beneath an umbrella when the sun feels strong.',
      'Plants begin as seeds. With water, light, air, and the right temperature, a seed can sprout roots and a stem. Leaves then help the growing plant make food from sunlight.'
    ];
    if(index<10)return beginner[index%3]+` This lesson explains ${topic.toLowerCase()} in clear, complete sentences.`;
    if(index<20)return `${topic} involves connected parts working together. A clear explanation identifies the main process, describes each important step, and uses accurate examples. Careful readers can then connect causes with results and ask useful follow-up questions.`;
    return `${topic} is a complex subject with scientific, social, and practical effects. Understanding it requires reliable evidence, clear definitions, and comparison of several possible outcomes. Thoughtful decisions also consider limits, tradeoffs, and how new evidence may change an earlier conclusion.`;
  });
  const typingTargets=[...homeTargets,...topTargets,...bottomTargets,...numberTargets,...punctuationTargets,...fluencyTargets,...paragraphPassages];
  const typingCurriculum=Array.from({length:13},(_,group)=>Array.from({length:10},(_,index)=>{
    const number=group*10+index+1,title=number<=100?typingPlanTitles[number-1]:paragraphTopics[number-101],target=typingTargets[number-1];
    const pair=(title.match(/(?:Introducing|Practicing) ([^w].*?)(?: with|$)/)||[])[1]||'';
    return TL(title,pair||(number<=20?'HOME ROW':number<=40?'TOP ROW':number<=60?'BOTTOM ROW':number<=75?'NUMBER ROW':number<=90?'SHIFT & PUNCTUATION':number<=100?'FULL KEYBOARD':'PARAGRAPH'),[],target,'',0,85);
  }));
  const typingWords=['a','as','ask','sad','dad','lad','fall','all','salad','desk','like','side','idea','read','ride','rule','sure','red','tree','write','row','low','slow','word','power','quiet','type','today','your','cat','can','calm','come','music','camera','van','never','seven','move','vine','box','extra','blue','next','zip','zone','lazy','amaze','size','dozen','quick','brown','fox','jumps','over','the','dog','sun','map','book','fish','rain','smile','plant','river','cloud'];
  const introduced={1:'fj',3:'dk',6:'sl',9:'a;',17:' ',21:'ei',24:'ru',27:'wo',30:'qp',33:'ty',41:'cm',44:'vn',47:'xb',50:'z',61:'47',63:'38',66:'29',69:'10',72:'56',76:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',81:'.,',83:'?!',86:'\'"',88:'-()'};
  const learned=new Set();
  const creativeTarget=(seed)=>{
    const keys=[...learned].filter(char=>char!==' ');
    const allowed=new Set([...learned].map(char=>char.toLowerCase()));
    const words=typingWords.filter(word=>[...word].every(char=>allowed.has(char)));
    const separator=learned.has(' ')?' ':'';
    const pieces=[];
    if(words.length>=4) for(let i=0;i<32;i++) pieces.push(words[(seed*7+i*5+i*i)%words.length]);
    else for(let i=0;i<72;i++) pieces.push(keys[(seed*5+i*3+i*i)%Math.max(1,keys.length)]||'f');
    const digits=keys.filter(char=>/\d/.test(char));
    if(digits.length) for(let i=0;i<12;i++) pieces.splice((i+1)*2,0,digits[(seed+i)%digits.length]+digits[(seed+i+3)%digits.length]);
    return pieces.join(separator);
  };
  const keepLearned=value=>String(value).replace(/[\r\n]+/g,learned.has(' ')?' ':'').split('').filter(char=>learned.has(char)).join('').replace(/ +/g,' ').trim();
  typingCurriculum.flat().slice(0,100).forEach((lesson,index)=>{
    const number=index+1;
    if(introduced[number]) [...introduced[number]].forEach(key=>learned.add(key));
    const safeBase=keepLearned(lesson.target);
    const generated=creativeTarget(index);
    if(/^Practicing |^Combining |Patterns|Word Building|Word Practice|Mastery/.test(lesson.title)) lesson.target=generated;
    else lesson.target=[safeBase,generated,safeBase.split('').reverse().join('')].filter(Boolean).join(learned.has(' ')?' ':'');
  });
  typingCurriculum.flat().forEach((lesson,index)=>{
    const number=index+1;
    if(number<=100){
      const base=lesson.target.replace(/[\r\n]+/g,' ').replace(/ +/g,' ').trim();
      if(base.length<150) lesson.target=`${base}${number>=17?' ':''}${base.split('').reverse().join('')}${number>=17?' ':''}${base}`;
      else lesson.target=base;
      return;
    }
    const topic=lesson.title.replace(/\?$/,'').toLowerCase();
    lesson.target=`${lesson.target.replace(/[\r\n]+/g,' ')} Careful writers organize facts about ${topic} in a clear order. They use complete sentences, accurate details, and helpful transitions so each idea connects to the next. After typing, reread the passage. Check every capital letter, space, punctuation mark, and difficult word before you finish.`;
  });
  // Each scenario includes a specific explanation, including on a retry.
  const lifeSets = [
    [
      ['You need to leave for school soon. What helps you get ready?', ['Pack your bag using a checklist','Start a long game','Hide your shoes'],0,'A checklist helps you remember what you need and finish your routine.'],
      ['A classmate wants a turn with the crayons.', ['Keep all the crayons','Agree to take turns','Walk away with them'],1,'Taking turns gives everyone a fair chance to participate.'],
      ['You spill water on the floor.', ['Leave it there','Cover it with your bag','Tell an adult and help clean it safely'],2,'A wet floor can be slippery. Let someone know and help make the space safe.'],
      ['A task feels too hard. What can you do?', ['Ask for help with the first step','Give up forever','Pretend it is finished'],0,'Asking for help and starting with one step makes a big task manageable.'],
      ['You borrow a book from a friend.', ['Keep it without asking','Return it in good condition','Write on its pages'],1,'Taking care of borrowed things shows respect and builds trust.'],
      ['Your room has clothes and toys on the floor.', ['Put each item where it belongs','Push everything under the bed','Wait for someone else'],0,'Putting items in their places makes the room safer and easier to use.'],
      ['You cough while sitting near other people.', ['Cough into your elbow','Cough toward the table','Touch everyone’s things'],0,'Coughing into your elbow helps keep germs away from your hands and other people.'],
      ['You are hungry before dinner.', ['Take someone else’s food','Ask about a healthy snack','Eat only candy'],1,'Asking first helps you choose a snack that works with the family plan.'],
      ['You cannot find your grown-up in a store.', ['Leave the store alone','Hide in a shelf','Ask a store worker for help'],2,'A uniformed worker or checkout employee can help you stay safe and reconnect.'],
      ['A friend says “stop” during a game.', ['Stop and check that they are okay','Keep going because it is funny','Tell them they cannot quit'],0,'Respecting “stop” keeps play safe and shows that you listen to boundaries.']
    ],
    [
      ['Homework and a game both need your time tonight.', ['Skip homework','Play until bedtime','Plan work time and a break'],2,'A simple plan protects time for responsibilities and rest.'],
      ['A friend seems upset and quiet.', ['Ask kindly if they want to talk','Demand an explanation','Tell everyone about it'],0,'Offer support while respecting their choice and privacy.'],
      ['An unfamiliar person online asks for your address.', ['Send it quickly','Keep it private and tell a trusted adult','Ask for their address first'],1,'Personal details should stay private. A trusted adult can help with an uncomfortable online situation.'],
      ['Your group disagrees about a project.', ['Let the loudest person decide','Quit the group','Listen to each idea and choose together'],2,'Listening and agreeing on a fair process helps a group make progress.'],
      ['You forgot a responsibility at home.', ['Acknowledge it and make a plan to finish','Blame someone else','Hide the unfinished task'],0,'Taking responsibility includes an honest explanation and a practical next step.']
      ,['You have $12 and want an $8 game plus a $6 snack.', ['Buy both anyway','Choose one or save more','Borrow money without asking'],1,'Comparing the total with what you have prevents overspending.'],
      ['A recipe says to wash your hands first.', ['Skip that step','Rinse only the food','Wash with soap and water'],2,'Clean hands help keep food safe to prepare and eat.'],
      ['You receive a mean group message.', ['Pause, save evidence, and tell a trusted adult','Send a meaner reply','Share it with more people'],0,'Pausing protects you from escalating the situation and gives a trusted adult useful context.'],
      ['You need to wake up earlier tomorrow.', ['Plan a bedtime and set an alarm','Stay up later than usual','Hope you wake up on time'],0,'A realistic bedtime and an alarm support enough rest and a calmer morning.'],
      ['A teammate makes a mistake.', ['Laugh at them','Offer help and focus on the next step','Tell them to leave'],1,'Helpful feedback keeps the team working and makes it safer to learn from mistakes.']
    ],
    [
      ['Two assignments are due on different days. How should you plan?', ['Do only the easiest one','Estimate time and prioritize deadlines','Wait until both are due'],1,'Consider urgency and effort, then divide the work into realistic blocks.'],
      ['An online message pressures you to share a login code.', ['Share it to be polite','Post it in a group chat','Keep it private and verify through the official service'],2,'Login codes protect access to your account. Use a known official channel to verify requests.'],
      ['You disagree with feedback on your work.', ['Ask for a specific example and listen','Reply with an insult','Ignore all feedback'],0,'Specific examples help you evaluate feedback and decide what to improve.'],
      ['You cannot keep a commitment you made.', ['Say nothing','Explain early and propose a new plan','Assume nobody will notice'],1,'Early communication gives others time to adjust and helps preserve trust.'],
      ['A project is overwhelming. What is a useful next step?', ['Keep worrying about all of it','Start several unrelated tasks','Break it into small actions and choose the first'],2,'Concrete, manageable actions make progress easier to begin and track.']
      ,['A website offers a prize for your birth date and school name.', ['Enter the details quickly','Share only your school','Close it and check with a trusted adult'],2,'Personal information can identify you. Verify offers before sharing anything private.'],
      ['Your weekly spending is higher than planned.', ['Review purchases and adjust the next week','Ignore the total','Hide the receipts'],0,'Reviewing real spending helps you make a practical change instead of guessing.'],
      ['A friend asks you to keep a secret about being unsafe.', ['Promise never to tell','Tell a trusted adult who can help','Post it online'],1,'Safety concerns need help from a trustworthy adult, even when secrecy was requested.'],
      ['You have three tests in one week.', ['Make a study plan across several days','Study everything the night before','Skip the hardest subject'],0,'Spreading practice across days supports memory and reduces last-minute pressure.'],
      ['You made a mistake that affected your group.', ['Explain it, apologize, and help repair it','Delete the shared work','Wait for someone else to notice'],0,'Owning the impact and helping fix it rebuilds trust through action.']
    ]
  ];
  const labSets = [
    [
      ['Sink or Float','Place a wooden craft stick and a metal spoon in a bowl of water.',['The stick floats and the spoon sinks','Both objects disappear','The spoon floats above the stick'],0,'Wood is less dense than water, while the metal spoon is denser than water.'],
      ['Light and Shadows','Shine a flashlight at a toy, then move the flashlight closer.',['The shadow usually grows larger','The shadow loses all shape','The toy changes color'],0,'Moving the light closer makes the object block a wider cone of light, so the shadow grows.'],
      ['Magnet Test','Test a paper clip, wooden pencil, plastic button, and steel washer with a magnet.',['The paper clip and steel washer','The pencil and button','Every object'],0,'Iron and steel are attracted to common magnets; wood and plastic are not.'],
      ['What Plants Need','Grow two similar seedlings. Give both light, but water only one.',['The watered seedling is more likely to stay healthy','The dry seedling grows faster','Both must grow exactly the same'],0,'Water is one resource plants need. Changing only water helps show its effect.'],
      ['Melting Ice','Place one ice cube in sunlight and one in shade.',['The cube in sunlight usually melts faster','The shaded cube instantly boils','Neither cube changes'],0,'The sunlit cube receives more thermal energy, so it usually melts faster.'],
      ['Ramp Roll','Roll the same ball down a low ramp and a steeper ramp.',['The steeper ramp usually makes it roll faster','The low ramp makes it fly upward','Ramp height cannot affect motion'],0,'A steeper ramp converts more stored energy into motion over the drop.'],
      ['Sound Vibrations','Stretch a rubber band and pluck it gently.',['The moving band creates vibrations you can hear','The band becomes a magnet','Sound appears without movement'],0,'The band vibrates, pushing the air and creating sound waves.'],
      ['Weather Watch','Record sky conditions at the same time for five days.',['You can compare a pattern across days','You can control tomorrow’s weather','One note proves the whole season'],0,'Repeated observations reveal patterns more reliably than one observation.'],
      ['Mix and Separate','Stir sand into water and let the cup rest.',['Much of the sand settles to the bottom','The sand becomes water','The mixture produces light'],0,'Sand does not dissolve in water, and gravity pulls the grains downward.'],
      ['Use Your Senses','Observe a sealed orange without tasting it.',['Color, shape, texture, and smell can be recorded','Only taste counts as evidence','Observations are always guesses'],0,'Scientists safely use several senses and tools to make detailed observations.']
    ],
    [
      ['Design a Fair Test','You want to test whether sunlight changes plant growth.',['Change sunlight and keep water and plant type the same','Change sunlight, water, and plant type','Measure only the pot color'],0,'A fair test changes one variable while keeping other important conditions the same.'],
      ['Measure Carefully','Three students measure a pencil as 14.8 cm, 14.9 cm, and 14.8 cm.',['The measurements are close and can be averaged','All measurements must be discarded','The pencil changes length each time'],0,'Repeated close measurements increase confidence and can be summarized with an average.'],
      ['Build a Circuit','A bulb, wire, and battery are connected, but the circuit has a gap.',['Close the gap to make a complete path','Add water to the battery','Remove every wire'],0,'Electric current needs a closed path from one battery terminal to the other.'],
      ['Evaporation Race','Place equal water in a wide dish and a narrow cup.',['The wide dish usually evaporates faster','The narrow cup always freezes','Container shape never matters'],0,'More exposed surface lets more water molecules escape into the air.'],
      ['Density Layers','Pour equal amounts of oil and water into a clear jar.',['Oil usually forms a layer above water','Water vanishes','Both turn into a solid'],0,'Oil is less dense than water and the liquids do not mix well, so layers form.'],
      ['Keep It Warm','Wrap identical warm cups in cotton, foil, and no material.',['Measure temperatures after equal times','Choose the prettiest cup','Use different starting temperatures'],0,'Equal starting conditions and timed measurements make the insulation comparison fair.'],
      ['Food Web Change','An insect population drops sharply in a habitat.',['Animals that eat those insects may have less food','Every plant immediately dies','The habitat cannot change'],0,'Food web parts are connected, so a change in one population can affect others.'],
      ['Friction Test','Slide the same block across tile and carpet.',['The carpet usually creates more friction','The tile removes gravity','The block gains mass on carpet'],0,'Rougher surfaces tend to resist sliding more strongly.'],
      ['Read the Data','A plant grew 2 cm, 4 cm, 5 cm, and 7 cm across four weeks.',['Its height increased each week','It shrank every week','No pattern can be described'],0,'The recorded values rise from week to week, showing continued growth.'],
      ['Choose a Control','You test whether fertilizer changes growth.',['A similar plant with no fertilizer','A different species with extra water','A plant measured only once'],0,'A no-fertilizer control provides a baseline for comparison.']
    ],
    [
      ['Write a Hypothesis','A student thinks warmer water dissolves sugar faster.',['If water is warmer, then equal sugar amounts will dissolve faster','Warm water is always better','Sugar is sweet'],0,'A useful hypothesis predicts a measurable result and names the changed condition.'],
      ['Repeat the Trials','One paper airplane flies much farther in a single test.',['Run several trials and compare the results','Declare it the best immediately','Change the design during every throw'],0,'Repeated trials show whether a result is consistent or just unusual.'],
      ['Reaction Evidence','Vinegar and baking soda produce many bubbles.',['Gas formation is evidence of a chemical change','Bubbles prove the cup is magnetic','No change occurred'],0,'The production of a new gas is observable evidence that a chemical reaction occurred.'],
      ['Energy Transfer','A metal spoon warms while resting in hot soup.',['Thermal energy moves from the soup into the spoon','Cold flows from the spoon into space','The spoon creates energy'],0,'Thermal energy transfers from warmer matter to cooler matter.'],
      ['Test Photosynthesis','You test whether light level affects an aquatic plant’s bubble rate.',['Count bubbles for equal times at measured light levels','Use different plant species each time','Change light and water temperature together'],0,'Controlled time and plant conditions isolate light level as the tested variable.'],
      ['Track Matter','An ice cube melts in a sealed container.',['The amount of matter stays the same','Matter disappears when solid becomes liquid','The liquid has no mass'],0,'A state change rearranges particles but does not destroy matter in the closed system.'],
      ['Improve a Model','A model shows Earth and the Moon at the same size.',['Revise the scale so the size relationship is clearer','Keep it because all models are exact','Remove all labels'],0,'Models simplify reality, but important relationships should still be represented accurately.'],
      ['Find Experimental Error','A balance was not set to zero before measuring.',['Every mass reading may be shifted','Only the object color changes','The error improves accuracy'],0,'An unzeroed instrument introduces a systematic measurement error.'],
      ['Support a Conclusion','Plants under blue light averaged 12 cm; plants in darkness averaged 3 cm.',['The data support that light affected growth in this test','Light never affects any plant','The colors prove the plants were identical'],0,'The conclusion matches the measured difference while staying within the limits of the test.'],
      ['Evaluate a Claim','An ad says a product works because one person liked it.',['Look for controlled tests and results from many participants','Treat the story as final proof','Ignore all evidence'],0,'A strong scientific claim needs systematic evidence, suitable comparisons, and enough observations.']
    ]
  ];
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const lessonTitle = (id,level,index) => {
    if (id === 'spelling') return `${['Sound pattern','Word-building pattern','Tricky spelling'][level]} ${index + 1}`;
    if (id === 'handwriting') return `${['Letter practice','Sentence practice','Note-writing practice'][level]} ${index + 1}`;
    if (id === 'tracing') return `Trace ${traceSets[level][index]}`;
    if (id === 'typing') return typingCurriculum[level][index].title;
    if (id === 'labs') return labSets[level][index][0];
    if (id === 'money') return `${['Count coin values','Find the change','Build a budget'][level]} ${index + 1}`;
    const prompt = lifeSets[level][index][0].replace(/[?.].*$/,'');
    return prompt.length > 44 ? `${prompt.slice(0,41)}…` : prompt;
  };
  const gradesPanel = document.createElement('div');
  gradesPanel.id = 'extrasGradePanel';
  gradesPanel.setAttribute('role','tabpanel');
  gradesPanel.setAttribute('aria-labelledby','extrasGradesTab');
  [...library.children].slice(1).forEach(child => gradesPanel.append(child));
  library.insertAdjacentHTML('beforeend', '<div class="extras-tabs" role="tablist" aria-label="Learning library"><button id="extrasGradesTab" role="tab" aria-selected="true" aria-controls="extrasGradePanel">Grade levels</button><button id="extrasTab" role="tab" aria-selected="false" aria-controls="extrasPanel" tabindex="-1">Extras <span>7 skill studios</span></button></div>');
  library.append(gradesPanel);
  const panel = document.createElement('div');
  panel.id = 'extrasPanel';
  panel.hidden = true;
  panel.setAttribute('role','tabpanel');
  panel.setAttribute('aria-labelledby','extrasTab');
  library.append(panel);
  let state = null;
  const tabs = [...library.querySelectorAll('[role="tab"]')];
  function selectTab(index) {
    tabs.forEach((tab,i) => { tab.setAttribute('aria-selected',String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
    gradesPanel.hidden = index === 1;
    panel.hidden = index === 0;
    if (index === 0 && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  }
  tabs.forEach((tab,i) => {
    tab.addEventListener('click',() => selectTab(i));
    tab.addEventListener('keydown',event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1-i;
      selectTab(next); tabs[next].focus();
    });
  });
  function home(focus = false) {
    state = null;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const completed = totalComplete();
    const percent = Math.round(completed / TOTAL_ACTIVITIES * 100);
    const recent = activities.find(item => item[0] === progress.lastStudio) || activities[0];
    const last = validLesson(progress.lastLesson) ? progress.lastLesson : null;
    const resume = last && !progress.completed[activityKey(last.id,last.level,last.index)] ? last : nextIncomplete(recent[0]);
    const resumeStudio = activities.find(item => item[0] === resume.id) || recent;
    const resumeAction = studioCount(resume.id) === studioTotal(resume.id) ? 'Review' : totalComplete() ? 'Continue' : 'Start';
    panel.innerHTML = `<header class="extras-hero"><div><span class="extras-eyebrow">EXTRAS LEARNING STUDIO</span><h2 tabindex="-1">Pick a skill and start practicing.</h2><p>Try typing, handwriting, and more. Your place is saved on this device.</p><div class="extras-hero-actions"><button data-continue="${resume.id}" data-level="${resume.level}" data-lesson="${resume.index}">${resumeAction} ${resumeStudio[2]} · Lesson ${resume.level*10+resume.index+1}</button><span><strong>${progress.xp}</strong> skill points</span></div></div><div class="extras-progress-orbit" style="--extras-progress:${percent * 3.6}deg" aria-label="${percent}% of all Extras lessons complete"><div><strong>${percent}%</strong><span>${completed} of ${TOTAL_ACTIVITIES}</span></div></div></header><section class="extras-dashboard" aria-label="Extras progress"><div><span class="extras-stat-icon" aria-hidden="true">★</span><p><strong>${progress.xp}</strong><span>Skill points earned</span></p></div><div><span class="extras-stat-icon" aria-hidden="true">✓</span><p><strong>${completed}</strong><span>Lessons mastered</span></p></div><div><span class="extras-stat-icon" aria-hidden="true">↗</span><p><strong>${activities.filter(([id]) => studioCount(id) < studioTotal(id)).length}</strong><span>Studios with lessons left</span></p></div></section><div class="extras-section-head"><div><span class="extras-eyebrow">CHOOSE A STUDIO</span><h3>What would you like to learn?</h3></div><p>Choose from 30 lessons in each studio and a complete ${studioTotal('typing')}-lesson Typing course.</p></div><div class="extras-grid">${activities.map(([id,icon,title,desc,kicker],i) => { const count=studioCount(id), max=studioTotal(id), pct=Math.round(count/max*100); return `<button class="extras-card extras-color-${i}" data-open="${id}"><span class="extras-icon" aria-hidden="true">${icon}</span><span class="extras-card-copy"><small>${kicker}</small><h3>${title}</h3><p>${desc}</p></span><span class="extras-card-progress"><span><b>${count}/${max}</b> lessons mastered</span><i aria-hidden="true"><i style="width:${pct}%"></i></i></span><b class="extras-card-cta">${count === max ? 'Review course' : count ? 'Continue learning' : 'Start learning'} <span aria-hidden="true">→</span></b></button>`; }).join('')}</div><p class="extras-note extras-privacy">Progress is saved only in this browser. Extras are for practice and do not change grade scores.</p>`;
    panel.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click',() => studioLibrary(button.dataset.open)));
    panel.querySelector('[data-continue]').addEventListener('click',event => start(event.currentTarget.dataset.continue,Number(event.currentTarget.dataset.level),Number(event.currentTarget.dataset.lesson)));
    if (focus) panel.querySelector('h2').focus();
  }
  function studioLibrary(id,focus = false) {
    state = null;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const [,icon,title,description] = activities.find(item => item[0] === id);
    const mastered = studioCount(id);
    const groups = groupNames(id);
    const recommended = nextIncomplete(id);
    const coursePercent = Math.round(mastered / studioTotal(id) * 100);
    panel.innerHTML = `<section class="extras-library extras-${id}"><div class="extras-library-bar"><button data-all>← All extras</button><span>★ ${progress.xp} skill points</span></div><header class="extras-library-head"><div class="extras-library-intro"><span class="extras-library-icon" aria-hidden="true">${icon}</span><div><span class="extras-eyebrow">${title.toUpperCase()} COURSE</span><h2 tabindex="-1">Choose a lesson</h2><p>${esc(description)} Start anywhere, repeat a lesson, or work through each group in order.</p></div></div><div class="extras-library-total"><strong>${mastered}</strong><span>of ${studioTotal(id)}<br>mastered</span></div></header><section class="extras-course-resume"><div class="extras-course-resume-copy"><span class="extras-eyebrow">${mastered === studioTotal(id) ? 'COURSE COMPLETE' : 'RECOMMENDED NEXT'}</span><h3>${esc(lessonTitle(id,recommended.level,recommended.index))}</h3><p>${groups[recommended.level]} · Lesson ${recommended.level*10+recommended.index+1} of ${studioTotal(id)}</p></div><div class="extras-course-progress"><span><b>${coursePercent}%</b> course progress</span><i aria-hidden="true"><i style="width:${coursePercent}%"></i></i></div><button data-resume data-level="${recommended.level}" data-lesson="${recommended.index}">${mastered === studioTotal(id) ? 'Review course' : mastered ? 'Continue lesson' : 'Start course'} →</button></section><div class="extras-level-groups">${groups.map((levelName,level) => { const count=Array.from({length:LESSONS_PER_LEVEL},(_,index) => progress.completed[activityKey(id,level,index)]).filter(Boolean).length; return `<section class="extras-level-group${count === LESSONS_PER_LEVEL ? ' is-complete' : ''}"><header><div><span>Group ${level+1}</span><h3>${levelName}</h3><p>${groupNote(id,level)}</p><div class="extras-group-progress" aria-label="${count} of ${LESSONS_PER_LEVEL} lessons mastered"><i style="width:${count*10}%"></i></div></div><strong>${count === LESSONS_PER_LEVEL ? '✓ Complete' : `${count}/${LESSONS_PER_LEVEL}`}</strong></header><div class="extras-lesson-grid">${Array.from({length:LESSONS_PER_LEVEL},(_,index) => { const done=Boolean(progress.completed[activityKey(id,level,index)]), score=progress.scores?.[activityKey(id,level,index)]; return `<button data-lesson="${index}" data-level="${level}" class="${done?'is-complete':''}"><span>${done?'✓':index+1}</span><span><b>${esc(lessonTitle(id,level,index))}</b><small>${done ? id === 'typing' && score ? `${'★'.repeat(score)}${'☆'.repeat(5-score)} · Practice again` : 'Mastered · Practice again' : 'Lesson '+(level*10+index+1)}</small></span><i aria-hidden="true">→</i></button>`; }).join('')}</div></section>`; }).join('')}</div></section>`;
    if(id==='typing') panel.querySelector('.extras-library-intro p').textContent=`${description} Complete lessons in order, or repeat any lesson you have finished.`;
    const search=document.createElement('div');
    search.className='extras-lesson-search';
    search.innerHTML='<label for="extrasLessonSearch">Find a lesson</label><div><input id="extrasLessonSearch" type="search" placeholder="Search by title, group, or lesson number" autocomplete="off"><button type="button" id="extrasSearchClear" hidden>Clear</button></div><p id="extrasSearchStatus" role="status" aria-live="polite"></p>';
    panel.querySelector('.extras-course-resume').after(search);
    const searchInput=search.querySelector('input'),clearSearch=search.querySelector('button'),searchStatus=search.querySelector('[role="status"]');
    const filterLessons=()=>{
      const query=searchInput.value.trim().toLocaleLowerCase();
      let shown=0;
      panel.querySelectorAll('.extras-level-group').forEach(group=>{
        const groupMatch=group.querySelector('h3').textContent.toLocaleLowerCase().includes(query);
        let visible=0;
        group.querySelectorAll('.extras-lesson-grid button').forEach(button=>{
          const number=Number(button.dataset.level)*LESSONS_PER_LEVEL+Number(button.dataset.lesson)+1;
          const numberQuery=query.startsWith('lesson ')?query.slice(7).trim():query;
          const match=!query||groupMatch||button.querySelector('b').textContent.toLocaleLowerCase().includes(query)||(/^\d+$/.test(numberQuery)&&Number(numberQuery)===number);
          button.hidden=!match;
          if(match)visible++;
        });
        group.hidden=visible===0;
        shown+=visible;
      });
      clearSearch.hidden=!query;
      searchStatus.textContent=query?`${shown} lesson${shown===1?'':'s'} found${shown?'':' — try a different word or number'}.`:'';
    };
    searchInput.addEventListener('input',filterLessons);
    clearSearch.addEventListener('click',()=>{searchInput.value='';filterLessons();searchInput.focus();});
    if(id==='typing'){
      const games=document.createElement('section');
      games.className='typing-games';
      games.innerHTML='<div><span class="extras-eyebrow">QUICK GAMES</span><h3>Play between lessons</h3></div><button data-typing-game="word"><b>Word Rush</b><span>Type words before time runs out.</span></button><button data-typing-game="key"><b>Key Burst</b><span>Clear short key patterns fast.</span></button>';
      panel.querySelector('.extras-course-resume').after(games);
      games.querySelectorAll('[data-typing-game]').forEach(button=>button.addEventListener('click',()=>typingGame(button.dataset.typingGame)));
      panel.querySelectorAll('.extras-lesson-grid [data-lesson]').forEach(button=>{
        const unlocked=typingLessonUnlocked(Number(button.dataset.level),Number(button.dataset.lesson));
        if(!unlocked){button.disabled=true;button.classList.add('is-locked');button.querySelector('small').textContent='Complete the previous lesson';button.querySelector('i').textContent='🔒';}
      });
    }
    panel.querySelector('[data-all]').addEventListener('click',() => home(true));
    panel.querySelector('[data-resume]').addEventListener('click',event => start(id,Number(event.currentTarget.dataset.level),Number(event.currentTarget.dataset.lesson)));
    panel.querySelectorAll('[data-lesson]').forEach(button => button.addEventListener('click',() => start(id,Number(button.dataset.level),Number(button.dataset.lesson))));
    if (focus) panel.querySelector('h2').focus();
  }
  function typingGame(mode){
    const words=mode==='word'?['planet','bright','river','school','friend','music','garden','puzzle','rocket','smile']:['fj','dk','sla','ruie','top','vmc','bn','qaz','plm','asdf','jkl;'];
    let score=0,time=45,current=words[Math.floor(Math.random()*words.length)],timer=null;
    panel.innerHTML=`<section class="typing-game-shell"><button id="typingGameBack">← Typing course</button><span class="extras-eyebrow">${mode==='word'?'WORD RUSH':'KEY BURST'}</span><h2 tabindex="-1">${mode==='word'?'Type the word':'Type the key pattern'}</h2><div class="typing-game-stats"><span><b id="typingGameScore">0</b> points</span><span><b id="typingGameTime">45</b> seconds</span></div><p class="typing-game-word" id="typingGameWord">${esc(current)}</p><input id="typingGameInput" autocomplete="off" autocapitalize="off" spellcheck="false"><p id="typingGameMessage">Type to begin.</p></section>`;
    const input=panel.querySelector('#typingGameInput'),word=panel.querySelector('#typingGameWord'),message=panel.querySelector('#typingGameMessage');
    const stop=()=>{clearInterval(timer);input.disabled=true;message.textContent=`Time! You scored ${score} points.`;};
    panel.querySelector('#typingGameBack').addEventListener('click',()=>{clearInterval(timer);studioLibrary('typing',true);});
    input.addEventListener('input',()=>{if(!timer)timer=setInterval(()=>{time--;panel.querySelector('#typingGameTime').textContent=time;if(time<=0)stop();},1000);if(input.value===current){score++;panel.querySelector('#typingGameScore').textContent=score;current=words[Math.floor(Math.random()*words.length)];word.textContent=current;input.value='';message.textContent=score%5===0?'Great streak!':'Keep going!';}});
    panel.querySelector('h2').focus();setTimeout(()=>input.focus(),50);
  }
  function start(id,level,index = 0) {
    if(id==='typing'&&!typingLessonUnlocked(level,index)){toast('Complete the previous typing lesson first.');studioLibrary('typing',true);return;}
    state = {id,level,index,correct:0,done:false,attempts:0,started:0,strokes:[],typedTotal:0,typingErrors:0,previousValue:''};
    progress.lastStudio = id; progress.lastLesson = {id,level,index}; saveProgress();
    render();
  }
  function feedback(text) { panel.querySelector('#extrasFeedback').textContent = text; }
  function showTypingResult({passed,accuracy,wpm,requiredWpm}){
    const rating=accuracy>=98&&wpm>=requiredWpm+5?'A+':accuracy>=95&&wpm>=requiredWpm?'A':accuracy>=90&&wpm>=requiredWpm?'B':passed?'C':'Keep practicing';
    const screen=document.createElement('div');
    screen.className='typing-result-screen';
    const sectionEnd=passed&&state.index===LESSONS_PER_LEVEL-1;
    screen.innerHTML=`<section class="${sectionEnd?'is-section-finish':''}"><div class="typing-result-sparkles" aria-hidden="true"><i>★</i><i>✦</i><i>★</i><i>✦</i><i>★</i></div><span>${sectionEnd?'SECTION COMPLETE':passed?'LESSON PASSED':'TRY AGAIN'}</span><div class="typing-rating">${sectionEnd?'🏆':rating}</div><h2 tabindex="-1">${sectionEnd?`${esc(groupNames('typing')[state.level])} mastered!`:esc(lessonTitle('typing',state.level,state.index))}</h2><div class="typing-result-stats"><div><strong>${accuracy}%</strong><small>Accuracy</small></div><div><strong>${wpm}</strong><small>WPM</small></div><div><strong>${requiredWpm}</strong><small>Required WPM</small></div></div><p>${sectionEnd?'Amazing work! You completed all ten lessons in this section.':passed?'You met both goals. Keep your rhythm going!':'Reach at least 85% accuracy and the required speed to pass.'}</p><div class="typing-result-actions">${passed?`<button data-result-next>${sectionEnd?'See section celebration':'Next lesson'}</button>`:'<button data-result-retry>Restart lesson</button>'}</div></section>`;
    document.body.appendChild(screen);
    screen.querySelector('[data-result-retry]')?.addEventListener('click',()=>{screen.remove();start('typing',state.level,state.index);});
    screen.querySelector('[data-result-next]')?.addEventListener('click',()=>{screen.remove();panel.querySelector('#extrasNext').click();});
    screen.querySelector('h2').focus();
  }
  function complete(message) {
    if (state.done) return;
    state.done = true;
    state.correct++;
    const key = activityKey(state.id,state.level,state.index);
    const firstTime = !progress.completed[key];
    if (firstTime) {
      progress.completed[key] = Date.now();
      progress.xp += 10 + state.level * 5;
      saveProgress();
    }
    feedback(message);
    const feedbackBox = panel.querySelector('#extrasFeedback');
    feedbackBox.classList.add('extras-success');
    feedbackBox.insertAdjacentHTML('afterbegin',`<span class="extras-feedback-icon" aria-hidden="true">✓</span>`);
    panel.querySelector('#extrasNext').disabled = false;
    panel.querySelector('#extrasNext').classList.add('extras-ready');
    if (firstTime) panel.querySelector('.extras-studio').insertAdjacentHTML('beforeend',`<div class="extras-xp-pop" aria-hidden="true">+${10 + state.level * 5} points</div>`);
  }
  function render() {
    const [id,icon,title] = activities.find(a => a[0] === state.id);
    const groupName = groupNames(id)[state.level];
    const levelDone = Array.from({length:LESSONS_PER_LEVEL},(_,index) => Boolean(progress.completed[activityKey(id,state.level,index)])).filter(Boolean).length;
    panel.innerHTML = `<section class="extras-studio extras-${id}"><div class="extras-toolbar"><div><button data-back>← ${title} lessons</button><button data-all>All extras</button></div><div class="extras-toolbar-stats"><span>★ ${progress.xp} points</span><span>${groupName} · Lesson ${state.level*10+state.index+1}</span></div></div><header class="extras-studio-head"><div><span class="extras-eyebrow">${title.toUpperCase()} · ${groupName.toUpperCase()}</span><h2 tabindex="-1"><span aria-hidden="true">${icon}</span> ${esc(lessonTitle(id,state.level,state.index))}</h2><p>${groupNote(id,state.level)}</p></div><div class="extras-lesson-count"><strong>${state.level*10+state.index+1}</strong><span>of ${studioTotal(id)}</span></div></header><div class="extras-stepper" aria-label="Lesson ${state.index+1} of ${LESSONS_PER_LEVEL} in this group">${Array.from({length:LESSONS_PER_LEVEL},(_,index) => `<button aria-label="Open lesson ${state.level*10+index+1}" data-jump="${index}" class="${index === state.index ? 'is-current' : ''}${progress.completed[activityKey(id,state.level,index)] ? ' is-mastered' : ''}"><i>${state.level*10+index+1}</i><b>${index === state.index ? 'Now' : progress.completed[activityKey(id,state.level,index)] ? 'Done' : ''}</b></button>`).join('')}</div><div class="extras-level-summary"><span>${groupName}</span><span>${levelDone}/${LESSONS_PER_LEVEL} lessons mastered</span></div><div id="extrasWork" class="extras-work"></div><p id="extrasFeedback" class="extras-feedback" role="status" aria-live="polite"><span class="extras-feedback-icon" aria-hidden="true">💡</span><span>Read the lesson, then take your time with the practice.</span></p><footer><button id="extrasNext" disabled>${state.index === LESSONS_PER_LEVEL - 1 ? 'Finish group' : 'Next lesson'} →</button></footer></section>`;
    panel.querySelector('[data-back]').addEventListener('click',() => studioLibrary(id,true));
    panel.querySelector('[data-all]').addEventListener('click',() => home(true));
    panel.querySelectorAll('[data-jump]').forEach(button => button.addEventListener('click',() => start(id,state.level,Number(button.dataset.jump))));
    panel.querySelector('#extrasNext').addEventListener('click',() => {
      if (!state.done) return;
      if (state.index === LESSONS_PER_LEVEL - 1) return finish();
      state.index++; state.done = false; state.attempts = 0; state.started = 0; state.strokes = []; state.typedTotal=0; state.typingErrors=0; state.previousValue=''; progress.lastLesson = {id,level:state.level,index:state.index}; saveProgress(); render();
    });
    const work = panel.querySelector('#extrasWork');
    if (id === 'spelling') spelling(work);
    else if (id === 'typing') typing(work);
    else if (id === 'handwriting' || id === 'tracing') drawing(work);
    else if (id === 'labs') {
      const [title,,choices,answer,explanation]=labSets[state.level][state.index];
      window.K12ExtrasLabs.render(work,{level:state.level,index:state.index,title,choices,answer,explanation,complete});
    }
    else quiz(work);
    panel.querySelector('h2').focus();
  }
  function spelling(work) {
    const [word,clue,hint] = wordSets[state.level][state.index];
    const mixed = [...word].sort((a,b) => (a.charCodeAt(0)*7%11)-(b.charCodeAt(0)*7%11)).join('');
    const strategy = ['Say the word slowly. Listen for the beginning, middle, and ending sounds.','Break the word into a base word and any beginning or ending parts.','Notice the word’s structure and use a memory clue for the tricky letters.'][state.level];
    work.innerHTML = `<div class="extras-task-heading"><span class="extras-task-number">${state.index+1}</span><div><span class="extras-eyebrow">LISTEN · THINK · SPELL</span><h3>Hear the word, then spell it</h3></div></div><section class="extras-mini-lesson"><div class="extras-teach-icon" aria-hidden="true">Aa</div><div><small>What you are learning</small><p>${esc(strategy)}</p></div></section><div class="extras-directions" aria-label="Lesson directions"><span><b>1</b> Hear the word</span><span><b>2</b> Use the clue</span><span><b>3</b> Type and check</span></div><div class="extras-clue-card"><span aria-hidden="true">?</span><div><small>Meaning clue</small><p class="extras-prompt">${esc(clue)}</p></div></div><div class="extras-word-meta"><span>${word.length} letters</span><span>Say it slowly</span><span>Check every sound</span></div><div class="extras-spell-tools"><button id="extrasListen"><span aria-hidden="true">♪</span> Hear the word</button><button id="extrasHint">Show a hint</button><button id="extrasLetters">Mix-up letters</button></div><p id="extrasHintText" class="extras-hint-box" hidden></p><form id="extrasForm"><label for="extrasAnswer">Spell the word here</label><div class="extras-answer-row"><input id="extrasAnswer" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="${word.length + 3}" required><button>Check my spelling</button></div></form><p class="extras-letter-count" id="extrasLetterCount">0 of ${word.length} letters</p>`;
    const listen = panel.querySelector('#extrasListen');
    listen.disabled = !('speechSynthesis' in window);
    if (listen.disabled) listen.textContent = 'Audio unavailable — use the clue';
    listen.addEventListener('click',() => { window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(word); utterance.lang = 'en-US'; utterance.rate = .8; window.speechSynthesis.speak(utterance); });
    panel.querySelector('#extrasHint').addEventListener('click',() => { const box=panel.querySelector('#extrasHintText'); box.hidden=false; box.textContent = `Hint: ${hint}`; });
    panel.querySelector('#extrasLetters').addEventListener('click',() => { const box=panel.querySelector('#extrasHintText'); box.hidden=false; box.innerHTML = `Mixed-up letters: <strong class="extras-scramble">${esc(mixed)}</strong>`; });
    panel.querySelector('#extrasAnswer').addEventListener('input',event => { panel.querySelector('#extrasLetterCount').textContent = `${event.target.value.length} of ${word.length} letters`; });
    panel.querySelector('#extrasForm').addEventListener('submit',event => {
      event.preventDefault(); if (state.done) return;
      const answer = panel.querySelector('#extrasAnswer');
      if (answer.value.trim().toLowerCase() === word) { answer.readOnly = true; complete(`You spelled ${word} correctly! ${hint}`); }
      else { state.attempts++; feedback(state.attempts > 1 ? `Study the word: ${word}. Now type it yourself to practice.` : `Not quite yet. ${hint} Try again.`); }
    });
  }
  function typing(work) {
    const lesson = typingCurriculum[state.level][state.index];
    const target = lesson.target;
    const rows = [['1','2','3','4','5','6','7','8','9','0','-','='],['q','w','e','r','t','y','u','i','o','p','[',']'],['a','s','d','f','g','h','j','k','l',';',"'"],['ShiftLeft','z','x','c','v','b','n','m',',','.','/','ShiftRight'],['Space']];
    const shifted = {'!':'1','@':'2','#':'3','$':'4','%':'5','^':'6','&':'7','*':'8','(':'9',')':'0','_':'-','+':'=','?':'/','"':"'"};
    const baseKey = key => shifted[key] || (key === ' ' ? 'Space' : key);
    const focusKeys = lesson.focus.map(baseKey);
    const fingerFor = key => {
      const k=baseKey(key).toLowerCase();
      if (['1','q','a','z','shiftleft'].includes(k)) return 'Left pinky';
      if (['2','w','s','x'].includes(k)) return 'Left ring';
      if (['3','e','d','c'].includes(k)) return 'Left middle';
      if (['4','5','r','t','f','g','v','b'].includes(k)) return 'Left index';
      if (['6','7','y','u','h','j','n','m'].includes(k)) return 'Right index';
      if (['8','i','k',','].includes(k)) return 'Right middle';
      if (['9','o','l','.'].includes(k)) return 'Right ring';
      if (['0','p',';','/','[',']',"'",'-','=','shiftright'].includes(k)) return 'Right pinky';
      return k === 'space' ? 'Thumb' : 'Use the shown key';
    };
    const keyLabel = key => key === 'ShiftLeft' || key === 'ShiftRight' ? 'Shift' : key === 'Space' ? 'Space' : key.toUpperCase();
    const keyboard = rows.map(row => `<div class="extras-key-row">${row.map(key => `<span data-key="${esc(key)}" class="${focusKeys.includes(key)?'is-focus':''} ${key === 'Space' ? 'is-space' : key.startsWith('Shift') ? 'is-shift' : ''}">${esc(keyLabel(key))}</span>`).join('')}</div>`).join('');
    const globalLesson=state.level*10+state.index+1;
    const requiredWpm=Math.round(3+(globalLesson-1)*37/129);
    const requiredAccuracy=85;
    lesson.goalWpm=requiredWpm;
    lesson.goalAccuracy=requiredAccuracy;
    const settingsMarkup=`<details class="extras-typing-settings"><summary>Typing settings</summary><div><label>Text size <input id="typingFont" type="range" min="18" max="34" value="${typingSettings.font}"></label><label>Keyboard style <select id="typingKeyboardStyle"><option value="classic" ${typingSettings.keyboardStyle==='classic'?'selected':''}>Classic</option><option value="rounded" ${typingSettings.keyboardStyle==='rounded'?'selected':''}>Rounded</option><option value="mechanical" ${typingSettings.keyboardStyle==='mechanical'?'selected':''}>Mechanical</option><option value="neon" ${typingSettings.keyboardStyle==='neon'?'selected':''}>Neon</option><option value="pastel" ${typingSettings.keyboardStyle==='pastel'?'selected':''}>Pastel</option><option value="typewriter" ${typingSettings.keyboardStyle==='typewriter'?'selected':''}>Typewriter</option><option value="glass" ${typingSettings.keyboardStyle==='glass'?'selected':''}>Glass</option><option value="high-contrast" ${typingSettings.keyboardStyle==='high-contrast'?'selected':''}>High contrast</option></select></label><label>Keyboard color <input id="typingKeyboardColor" type="color" value="${esc(typingSettings.keyboardColor)}"></label><label><input id="typingKeyboard" type="checkbox" ${typingSettings.keyboard?'checked':''}> Show keyboard</label><label><input id="typingSound" type="checkbox" ${typingSettings.sound?'checked':''}> Key sound</label></div></details>`;
    const goalText=lesson.goalWpm ? `${lesson.goalWpm} WPM · ${lesson.goalAccuracy}% accuracy` : `${lesson.goalAccuracy}%+ accuracy`;
    work.innerHTML = `<div class="extras-task-heading"><span class="extras-task-number">${globalLesson}</span><div><span class="extras-eyebrow">LEARN ONE STEP · PRACTICE SLOWLY</span><h3>${esc(lesson.title)}</h3></div></div><div class="extras-typing-goals"><span><small>Keys in this lesson</small><strong>${esc(lesson.keys)}</strong></span><span><small>Success goal</small><strong>${esc(goalText)}</strong></span><span class="extras-stars" aria-label="Five stars available">☆☆☆☆☆</span></div><section class="extras-mini-lesson"><div class="extras-teach-icon" aria-hidden="true">⌨</div><div><small>What you are learning</small><p>${esc(lesson.tip)}</p></div></section><div class="extras-directions" aria-label="Lesson directions"><span><b>1</b> Set your fingers</span><span><b>2</b> Follow the blue key</span><span><b>3</b> Fix errors as you type</span></div><div class="extras-finger-board"><div class="extras-finger-status"><small>Finger for the next key</small><strong id="extrasFinger">${esc(fingerFor(target[0]))}</strong></div><div class="extras-keyboard" aria-label="Keyboard guide">${keyboard}</div><div class="extras-hand-legend"><span><b>Left hand</b><i>Pinky</i><i>Ring</i><i>Middle</i><i>Index</i></span><span><b>Right hand</b><i>Index</i><i>Middle</i><i>Ring</i><i>Pinky</i></span></div></div><p class="extras-type-direction"><strong>Your practice:</strong> Type the text exactly as shown. The blue key and finger guide update after every character.</p><div class="extras-type-board"><div class="extras-type-top"><span>Copy this text</span><button id="extrasTypeReset">Start over</button></div><p class="extras-type-target" aria-label="Text to type">${esc(target)}</p><label for="extrasType">Type here</label><textarea id="extrasType" rows="3" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="Begin typing the text above…"></textarea><div class="extras-type-progress" aria-hidden="true"><i id="extrasTypeBar"></i></div><div class="extras-metrics"><span id="extrasAccuracy"><b>—</b> accuracy</span><span id="extrasSpeed"><b>—</b> words/min</span><span id="extrasTyped"><b>0</b>/${target.length} characters</span></div></div>`;
    work.querySelector('.extras-task-heading').insertAdjacentHTML('afterend',settingsMarkup);
    const keyboardGuide=panel.querySelector('.extras-finger-board');
    const targetText=panel.querySelector('.extras-type-target');
    const typeBoard=panel.querySelector('.extras-type-board');
    keyboardGuide.before(typeBoard);
    keyboardGuide.hidden=!typingSettings.keyboard;
    keyboardGuide.dataset.keyboardStyle=typingSettings.keyboardStyle;
    const keyboardContrast=color=>{const hex=String(color).replace('#','');const rgb=[0,2,4].map(offset=>parseInt(hex.slice(offset,offset+2),16)||0);return (rgb[0]*299+rgb[1]*587+rgb[2]*114)/1000>155?'#14243a':'#ffffff';};
    keyboardGuide.style.setProperty('--keyboard-accent',typingSettings.keyboardColor);
    keyboardGuide.style.setProperty('--keyboard-accent-text',keyboardContrast(typingSettings.keyboardColor));
    targetText.style.fontSize=`${typingSettings.font}px`;
    targetText.tabIndex=0;
    targetText.setAttribute('role','textbox');
    targetText.setAttribute('aria-label','Typing practice. Start typing the highlighted text.');
    panel.querySelector('#typingFont').addEventListener('input',event=>{typingSettings.font=Number(event.target.value);targetText.style.fontSize=`${typingSettings.font}px`;saveTypingSettings();});
    panel.querySelector('#typingKeyboard').addEventListener('change',event=>{typingSettings.keyboard=event.target.checked;keyboardGuide.hidden=!typingSettings.keyboard;saveTypingSettings();});
    panel.querySelector('#typingKeyboardStyle').addEventListener('change',event=>{typingSettings.keyboardStyle=event.target.value;keyboardGuide.dataset.keyboardStyle=typingSettings.keyboardStyle;saveTypingSettings();});
    panel.querySelector('#typingKeyboardColor').addEventListener('input',event=>{typingSettings.keyboardColor=event.target.value;keyboardGuide.style.setProperty('--keyboard-accent',typingSettings.keyboardColor);keyboardGuide.style.setProperty('--keyboard-accent-text',keyboardContrast(typingSettings.keyboardColor));saveTypingSettings();});
    panel.querySelector('#typingSound').addEventListener('change',event=>{typingSettings.sound=event.target.checked;saveTypingSettings();});
    const input = panel.querySelector('#extrasType');
    targetText.addEventListener('click',()=>input.focus());
    targetText.addEventListener('focus',()=>input.focus());
    input.addEventListener('focus',()=>targetText.classList.add('is-active'));
    input.addEventListener('blur',()=>targetText.classList.remove('is-active'));
    setTimeout(()=>input.focus(),120);
    const updateNextKey = value => {
      const next=baseKey(target[value.length] || '');
      panel.querySelectorAll('[data-key]').forEach(key => key.classList.toggle('is-next',key.dataset.key.toLowerCase() === String(next).toLowerCase()));
      panel.querySelector('#extrasFinger').textContent=value.length >= target.length ? 'Finished' : fingerFor(target[value.length]);
    };
    const resetTypingAttempt=(message='Fresh start. Settle into a smooth, accurate rhythm.')=>{
      input.value='';input.readOnly=false;state.started=0;state.typedTotal=0;state.typingErrors=0;state.previousValue='';
      panel.querySelector('#extrasAccuracy').innerHTML='<b>—</b> accuracy';panel.querySelector('#extrasSpeed').innerHTML='<b>—</b> words/min';panel.querySelector('#extrasTyped').innerHTML=`<b>0</b>/${target.length} characters`;panel.querySelector('#extrasTypeBar').style.width='0%';panel.querySelector('.extras-type-target').textContent=target;panel.querySelector('.extras-stars').textContent='☆☆☆☆☆';updateNextKey('');input.focus();feedback(message);
    };
    updateNextKey('');
    panel.querySelector('#extrasTypeReset').addEventListener('click',()=>resetTypingAttempt());
    input.addEventListener('paste',event => { event.preventDefault(); feedback('Type the text yourself to build keyboard confidence.'); });
    input.addEventListener('input',() => {
      if (state.done) return;
      const value = input.value;
      if(value===''&&state.previousValue!==''){resetTypingAttempt('Everything was cleared, so the lesson timer and score restarted.');return;}
      if (!state.started) state.started = performance.now();
      if(typingSettings.sound&&value.length>state.previousValue.length) safeClick();
      if (value.length > state.previousValue.length) {
        for(let i=state.previousValue.length;i<value.length;i++) { state.typedTotal++; if(value[i] !== target[i]) state.typingErrors++; }
      }
      state.previousValue=value;
      const matches = [...value].filter((letter,i) => letter === target[i]).length;
      const accuracy = state.typedTotal ? Math.max(0,Math.round((state.typedTotal-state.typingErrors)/state.typedTotal*100)) : 0;
      const seconds = (performance.now()-state.started)/1000;
      const wpm = Math.round(matches/5/(Math.max(seconds,1)/60));
      panel.querySelector('#extrasAccuracy').innerHTML = `<b>${accuracy}%</b> accuracy`;
      panel.querySelector('#extrasSpeed').innerHTML = `<b>${wpm}</b> words/min`;
      panel.querySelector('#extrasTyped').innerHTML = `<b>${Math.min(value.length,target.length)}</b>/${target.length} characters`;
      panel.querySelector('#extrasTypeBar').style.width = `${Math.min(100,value.length/target.length*100)}%`;
      panel.querySelector('.extras-type-target').innerHTML = [...target].map((char,i) => `<span class="${i < value.length ? char === value[i] ? 'extras-right' : 'extras-wrong' : i===value.length?'extras-current':''}">${esc(char)}</span>`).join('');
      updateNextKey(value);
      if (value.length >= target.length) {
        const passed=accuracy>=requiredAccuracy&&wpm>=requiredWpm;
        let stars=1;
        if(accuracy>=90) stars++;
        if(accuracy>=lesson.goalAccuracy) stars++;
        if(!lesson.goalWpm || wpm>=lesson.goalWpm) stars++;
        if(accuracy>=98 && (!lesson.goalWpm || wpm>=lesson.goalWpm+5)) stars++;
        panel.querySelector('.extras-stars').textContent='★'.repeat(stars)+'☆'.repeat(5-stars);
        const key=activityKey('typing',state.level,state.index);
        progress.scores[key]=Math.max(progress.scores[key]||0,stars); saveProgress();
        if(!passed){
          const needs=[];
          if(accuracy<requiredAccuracy)needs.push(`${requiredAccuracy}% accuracy`);
          if(wpm<requiredWpm)needs.push(`${requiredWpm} WPM`);
          input.readOnly=true;
          feedback(`Try again to pass. This lesson requires ${needs.join(' and ')}. You reached ${accuracy}% accuracy and ${wpm} WPM. Select Start over when you are ready.`);
          showTypingResult({passed,accuracy,wpm,requiredWpm});
          return;
        }
        input.readOnly = true;
        showTypingResult({passed,accuracy,wpm,requiredWpm});
        complete(`${stars} of 5 stars · ${accuracy}% accuracy · ${wpm} WPM. ${stars < 4 ? 'Repeat the lesson to improve your score.' : 'Excellent control and accuracy.'}`);
      }
      else feedback(value.length > target.length ? 'There are extra characters at the end. Use Backspace to correct them.' : 'Match the highlighted text. You can use Backspace to fix a mistake.');
    });
  }
  function quiz(work) {
    const {id,level,index} = state;
    let question, choices, answer, explanation, visual = '';
    if (id === 'lifeskills') [question,choices,answer,explanation] = lifeSets[level][index];
    else if (id === 'money') {
      const dollar = cents => `$${(cents/100).toFixed(2)}`;
      let value;
      if (level === 0) { const quarters = index+1; value = quarters*25+10; question = `You have ${quarters} US quarter${quarters>1?'s':''} and 1 dime. How much is that?`; explanation = `${quarters} × 25¢ + 10¢ = ${value}¢. A quarter is 25¢ and a dime is 10¢.`; visual = `<div class="extras-coins" aria-label="${quarters} quarters and 1 dime">${Array.from({length:quarters},() => '<span class="coin quarter">25¢</span>').join('')}<span class="coin dime">10¢</span></div>`; }
      else if (level === 1) { const price = 235+index*75; value = 1000-price; question = `You pay for a ${dollar(price)} item with $10.00. How much change should you get?`; explanation = `$10.00 − ${dollar(price)} = ${dollar(value)} in change.`; visual=`<div class="extras-money-model" aria-label="Paid ten dollars; item costs ${dollar(price)}; find the change"><span><small>Paid</small><b>$10.00</b></span><strong aria-hidden="true">−</strong><span><small>Price</small><b>${dollar(price)}</b></span><strong aria-hidden="true">=</strong><span><small>Change</small><b>?</b></span></div>`; }
      else { const budget = 4000+index*1000, cost = 1750+index*500, save = 1000; value = budget-cost-save; question = `You have ${dollar(budget)}. Set aside ${dollar(save)} for savings and spend ${dollar(cost)} on supplies. How much remains?`; explanation = `${dollar(budget)} − ${dollar(save)} − ${dollar(cost)} = ${dollar(value)}. Plan for savings as well as spending.`; visual=`<div class="extras-money-model" aria-label="Budget ${dollar(budget)}, savings ${dollar(save)}, supplies ${dollar(cost)}, remaining amount unknown"><span><small>Budget</small><b>${dollar(budget)}</b></span><strong aria-hidden="true">−</strong><span><small>Save</small><b>${dollar(save)}</b></span><strong aria-hidden="true">−</strong><span><small>Supplies</small><b>${dollar(cost)}</b></span><strong aria-hidden="true">=</strong><span><small>Left</small><b>?</b></span></div>`; }
      answer = index%3; choices = [dollar(value+25),dollar(value+100),dollar(value+50)]; choices[answer] = dollar(value);
    } else if (id === 'labs') {
      const [labTitle,setup,labChoices,labAnswer,labExplanation] = labSets[level][index];
      question = setup; choices = labChoices; answer = labAnswer; explanation = labExplanation;
      visual = `<div class="extras-lab-setup"><span aria-hidden="true">⚗</span><div><small>Investigation ${index+1}</small><strong>${esc(labTitle)}</strong><p>Read the setup, predict what the evidence will show, then choose the best conclusion.</p></div></div>`;
    }
    const heading = id === 'lifeskills' ? 'What would you do?' : id === 'money' ? 'Make a money decision' : labSets[level][index][0];
    const eyebrow = id === 'lifeskills' ? 'PAUSE · THINK · CHOOSE' : id === 'money' ? 'COUNT · PLAN · DECIDE' : 'PREDICT · OBSERVE · EXPLAIN';
    const teaching = id === 'lifeskills'
      ? ['Start with safety. Then think about kindness and responsibility.','Good choices protect privacy, time, money, and trust.','Strong decisions consider consequences and communicate early.'][level]
      : id === 'money'
        ? ['Name each coin value before you add the amounts.','To find change, subtract the price from the amount paid.','A budget gives every dollar a job: save, spend, or keep.'][level]
        : ['Observe carefully and describe only what the evidence shows.','Change one variable, measure consistently, and compare with a control.','Use repeated evidence to test claims and explain the limits of a conclusion.'][level];
    work.innerHTML = `<div class="extras-task-heading"><span class="extras-task-number">${index+1}</span><div><span class="extras-eyebrow">${eyebrow}</span><h3>${heading}</h3></div></div><section class="extras-mini-lesson extras-quiz-lesson"><div class="extras-teach-icon" aria-hidden="true">${id === 'lifeskills' ? '♥' : id === 'money' ? '$' : '⚗'}</div><div><small>What you are learning</small><p>${esc(teaching)}</p></div></section><div class="extras-directions" aria-label="Lesson directions"><span><b>1</b> Read the situation</span><span><b>2</b> Think through each choice</span><span><b>3</b> Choose the best answer</span></div>${visual}<div class="extras-question-card"><small class="extras-question-label">${id === 'labs' ? 'What does the evidence support?' : id === 'money' ? 'Solve one step at a time' : 'Choose the safest and most responsible action'}</small><p class="extras-prompt">${esc(question)}</p><div class="extras-choices">${choices.map((choice,i) => `<button data-choice="${i}"><span>${String.fromCharCode(65+i)}</span>${esc(choice)}</button>`).join('')}</div></div><div id="extrasExplanation" class="extras-explanation" hidden></div>`;
    work.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click',() => {
      if (state.done) return;
      if (Number(button.dataset.choice) === answer) { button.classList.add('extras-correct'); work.querySelectorAll('button').forEach(b => b.disabled = true); const detail=panel.querySelector('#extrasExplanation'); detail.hidden=false; detail.innerHTML=`<strong>Why it works</strong><p>${esc(explanation)}</p>`; complete(`That's it! ${explanation}`); }
      else { button.disabled = true; button.classList.add('extras-incorrect'); feedback(id === 'lifeskills' ? 'Think about which choice is safest, kindest, and most responsible. Try again.' : id === 'money' ? 'Check the value of each amount, then calculate one step at a time.' : 'Look again at the setup. Choose the conclusion supported by the observation or fair-test rule.'); }
    }));
  }
  function drawing(work) {
    const tracing = state.id === 'tracing';
    const target = tracing ? traceSets[state.level][state.index] : copySets[state.level][state.index];
    const writingTip = tracing
      ? ['Begin at one end and move slowly without rushing the corners.','Plan each stroke before you move and lift your pen only when the shape changes.','Use light, controlled movement and keep the whole word balanced.'][state.level]
      : ['Sit tall, relax your shoulders, and hold the pencil gently.','Keep letters on the line and leave a finger-width space between words.','Write at a steady size so longer ideas stay easy to read.'][state.level];
    work.innerHTML = `<div class="extras-task-heading"><span class="extras-task-number">${state.index+1}</span><div><span class="extras-eyebrow">${tracing ? 'FOLLOW · CONTROL · COMPLETE' : 'LOOK · COPY · CHECK'}</span><h3>${tracing ? 'Trace the complete path' : 'Copy the model clearly'}</h3></div></div><section class="extras-mini-lesson"><div class="extras-teach-icon" aria-hidden="true">✎</div><div><small>What you are learning</small><p>${esc(writingTip)}</p></div></section><div class="extras-directions" aria-label="Lesson directions"><span><b>1</b> Study the model</span><span><b>2</b> Draw the full target</span><span><b>3</b> Check your work</span></div><p class="extras-check-explainer">${tracing ? 'Trace slowly over the pale guide. The checker measures how much of the path you cover and how controlled your movement is.' : 'Copy the entire model onto the lines. The checker measures coverage, spacing, line use, and stroke control.'}</p><div class="extras-model-card"><small>${tracing ? 'Trace this path' : 'Copy this model'}</small><p class="extras-copy-model">${esc(target)}</p></div><div class="extras-draw-toolbar" aria-label="Drawing tools"><div><button class="is-active" data-ink="#5b46c9" aria-label="Purple ink"></button><button data-ink="#16745b" aria-label="Green ink"></button><button data-ink="#bc3f5e" aria-label="Red ink"></button></div><label>Pen size <input id="extrasPenSize" type="range" min="3" max="14" value="6"></label><label class="extras-guide-toggle"><input id="extrasGuide" type="checkbox" checked> Show guide</label></div><canvas id="extrasCanvas" width="1000" height="360" aria-label="Drawing pad. Use a mouse, touch, or stylus."></canvas><div class="extras-draw-actions"><button id="extrasUndo">↶ Undo</button><button id="extrasClear">Clear pad</button><button id="extrasDrawDone">Check my work</button></div><div id="extrasDrawResult" class="extras-draw-result" hidden role="status"></div>`;
    const canvas = panel.querySelector('canvas'), ctx = canvas.getContext('2d');
    let active = null, pointer = null, ink = '#5b46c9', penSize = 6, showGuide = true;
    function paint() {
      ctx.clearRect(0,0,1000,360); ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,1000,360);
      ctx.strokeStyle = '#dce2ee'; ctx.lineWidth = 2;
      for (const y of [90,180,270]) { ctx.setLineDash(y === 180 ? [9,9] : []); ctx.beginPath(); ctx.moveTo(20,y); ctx.lineTo(980,y); ctx.stroke(); }
      ctx.setLineDash([]);
      if (tracing && showGuide) {
        ctx.strokeStyle = '#bac6df'; ctx.fillStyle = '#bac6df'; ctx.lineWidth = 8; ctx.lineJoin = 'round'; ctx.beginPath();
        if (target === 'line') { ctx.moveTo(100,180); ctx.lineTo(900,180); }
        else if (target === 'zigzag') { ctx.moveTo(100,260); for(let i=1;i<=8;i++) ctx.lineTo(100+i*100,i%2?100:260); }
        else if (target === 'circle') ctx.arc(500,180,115,0,Math.PI*2);
        else if (target === 'square') ctx.rect(385,65,230,230);
        else if (target === 'triangle') { ctx.moveTo(500,55); ctx.lineTo(660,290); ctx.lineTo(340,290); ctx.closePath(); }
        else if (target === 'wave' || target === 'loop') { ctx.moveTo(100,180); for(let i=0;i<4;i++) ctx.bezierCurveTo(100+i*200,20,300+i*200,target==='loop'?340:20,300+i*200,180); }
        else if (target === 'star') { for(let i=0;i<10;i++) { const r = i%2 ? 55 : 135, a = i*Math.PI/5-Math.PI/2; const x=500+Math.cos(a)*r,y=180+Math.sin(a)*r; i ? ctx.lineTo(x,y) : ctx.moveTo(x,y); } ctx.closePath(); }
        else { const size = target.length > 7 ? 92 : target.length > 4 ? 120 : 180; ctx.font = `bold ${size}px sans-serif`; ctx.textAlign = 'center'; ctx.fillText(target,500,235); }
        ctx.stroke();
      }
      ctx.lineCap = 'round';
      state.strokes.forEach(stroke => { ctx.strokeStyle=stroke.ink || '#5b46c9'; ctx.lineWidth=stroke.size || 6; ctx.beginPath(); stroke.points.forEach(([x,y],i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y)); ctx.stroke(); });
    }
    const point = event => { const rect=canvas.getBoundingClientRect(); return [(event.clientX-rect.left)*1000/rect.width,(event.clientY-rect.top)*360/rect.height]; };
    canvas.addEventListener('pointerdown',event => { if (state.done || active || (event.pointerType === 'mouse' && event.button !== 0)) return; event.preventDefault(); pointer=event.pointerId; active={points:[point(event)],ink,size:penSize}; state.strokes.push(active); canvas.setPointerCapture(pointer); });
    canvas.addEventListener('pointermove',event => { if (!active || event.pointerId !== pointer) return; active.points.push(point(event)); paint(); });
    const release = () => { active=null; pointer=null; };
    canvas.addEventListener('pointerup',release); canvas.addEventListener('pointercancel',release); canvas.addEventListener('lostpointercapture',release);
    panel.querySelector('#extrasUndo').addEventListener('click',() => { if (!state.done) { state.strokes.pop(); paint(); } });
    panel.querySelector('#extrasClear').addEventListener('click',() => { if (!state.done) { state.strokes=[]; paint(); } });
    panel.querySelectorAll('[data-ink]').forEach(button => button.addEventListener('click',() => { ink=button.dataset.ink; panel.querySelectorAll('[data-ink]').forEach(item => item.classList.toggle('is-active',item===button)); }));
    panel.querySelector('#extrasPenSize').addEventListener('input',event => { penSize=Number(event.target.value); });
    panel.querySelector('#extrasGuide').addEventListener('change',event => { showGuide=event.target.checked; paint(); });
    function assessDrawing() {
      const strokes = state.strokes.filter(stroke => stroke.points.length > 1);
      const points = strokes.flatMap(stroke => stroke.points);
      if (!points.length) return {score:0,pass:false,message:'Add your writing to the pad before checking.'};
      let length = 0;
      strokes.forEach(stroke => stroke.points.slice(1).forEach((current,i) => {
        const previous = stroke.points[i];
        length += Math.hypot(current[0]-previous[0],current[1]-previous[1]);
      }));
      const xs=points.map(point=>point[0]), ys=points.map(point=>point[1]);
      const width=Math.max(...xs)-Math.min(...xs), height=Math.max(...ys)-Math.min(...ys);
      const minWidth = tracing ? (target === 'line' || target === 'zigzag' || target === 'wave' || target === 'loop' ? 520 : target.length > 4 ? 240 : 120) : Math.min(620,120 + target.length * 9);
      const minLength = tracing ? (target === 'line' ? 520 : target.length > 4 ? 500 : 300) : Math.min(1600,220 + target.length * 18);
      const expectedHeight = target === 'line' ? height < 75 : height > (tracing ? 45 : 25);
      const pointScore=Math.min(1,points.length/35)*20;
      const lengthScore=Math.min(1,length/minLength)*35;
      const widthScore=Math.min(1,width/minWidth)*30;
      const heightScore=expectedHeight ? 15 : Math.min(15,height/(tracing?45:25)*15);
      const score=Math.round(pointScore+lengthScore+widthScore+heightScore);
      const pass=score>=65;
      let message;
      if (pass) message = tracing ? 'The checker found good coverage and controlled movement across the guide.' : 'The checker found enough writing, spacing, and line coverage to pass this lesson.';
      else if (width < minWidth*.65) message = tracing ? 'Use more of the guide from beginning to end, then check again.' : 'Write the full model across more of the line, then check again.';
      else if (length < minLength*.65) message = 'Add the missing strokes and details, then check again.';
      else message = tracing ? 'Slow down and follow more of the complete path.' : 'Add clearer strokes and keep the writing on the guide lines.';
      return {score,pass,message};
    }
    panel.querySelector('#extrasDrawDone').addEventListener('click',() => {
      if (state.done) return;
      const result=assessDrawing(), box=panel.querySelector('#extrasDrawResult');
      box.hidden=false;
      box.className=`extras-draw-result ${result.pass?'is-pass':'is-retry'}`;
      box.innerHTML=`<strong>${result.pass?'Passed':'Keep working'} · ${result.score}%</strong><p>${esc(result.message)}</p>`;
      if (result.pass) complete(`${tracing ? 'Tracing' : 'Handwriting'} check passed at ${result.score}%. ${result.message}`);
      else feedback(`${result.score}% so far. ${result.message}`);
    });
    paint();
  }
  function finish() {
    const {id,level} = state;
    const title = activities.find(a => a[0] === id)[2];
    const groups = groupNames(id);
    const studioMastered = studioCount(id);
    panel.innerHTML = `<section class="extras-finish extras-${id}"><div class="extras-celebration" aria-hidden="true"><span>★</span><span>✦</span><b>🏆</b><span>✦</span><span>★</span></div><p class="extras-eyebrow">SECTION COMPLETE</p><h2 tabindex="-1">${groups[level]} complete!</h2><p class="extras-finish-lead">Fantastic work! You finished all ${LESSONS_PER_LEVEL} lessons in this ${title} section and unlocked the next challenge.</p><div class="extras-finish-stats"><div><strong>${LESSONS_PER_LEVEL}/${LESSONS_PER_LEVEL}</strong><span>lessons finished</span></div><div><strong>${studioMastered}/${studioTotal(id)}</strong><span>studio lessons mastered</span></div><div><strong>${progress.xp}</strong><span>total skill points</span></div></div><div class="extras-reward-ribbon">+ Section badge earned</div><div class="extras-finish-actions"><button id="extrasAgain">Practice this section again</button>${level < groups.length-1 ? '<button id="extrasHarder">Start the next section →</button>' : ''}<button id="extrasHome">Explore other studios</button></div></section>`;
    panel.querySelector('#extrasAgain').addEventListener('click',() => start(id,level));
    panel.querySelector('#extrasHarder')?.addEventListener('click',() => start(id,level+1));
    panel.querySelector('#extrasHome').addEventListener('click',() => home(true));
    panel.querySelector('h2').focus();
  }
  window.openGradeTyping=()=>{
    show('grades');
    if(document.getElementById('grades')?.classList.contains('d-none'))return;
    selectTab(1);
    studioLibrary('typing',true);
  };
  home();
})();
