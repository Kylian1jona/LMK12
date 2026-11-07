(function(){
  const lessonIcon=key=>key.includes(":math:")?"calculator":key.includes(":sci:")?"flask":"book-alt";
  const lessonCard=(key,back,title,description)=>`<button type="button" class="early-lesson-card" data-lesson-key="${key}" onclick="startEarlyBank('${key}','${back}')"><span class="early-lesson-symbol" aria-hidden="true"><i class="fi fi-rr-${lessonIcon(key)}"></i></span><div><strong>${title}</strong><small>${description}</small></div><b>Start &rarr;</b></button>`;
  const pyramidCard=(grade,description)=>`<button type="button" class="early-lesson-card" data-lesson-key="${grade}:eng:pyramid-reading" onclick="openReadingPyramid('${grade}')"><span class="early-lesson-symbol" aria-hidden="true"><i class="fi fi-rr-book-open-cover"></i></span><div><strong>Reading Pyramid</strong><small>${description}</small></div><b>Start &rarr;</b></button>`;
  const prekLessonGroups=(cards,groups)=>groups.map(([title,description,start,end])=>`
    <section class="early-lesson-group" aria-label="${title}">
      <header><h3>${title}</h3><p>${description}</p></header>
      <div class="early-lesson-group-cards">${cards.slice(start,end).join("")}</div>
    </section>`).join("");
  const gradeMenu=(id,level,title,copy,pointsId,learnersId,hasScience=false)=>`
    <div id="${id}" class="section d-none early-grade-page grade-menu" data-early-grade="${level}" data-grade="${id}">
      <div class="cardish text-center kid-font early-grade-menu-card">
        <div class="early-grade-menu-heading">
          <span class="early-grade-level" aria-hidden="true">${level}</span>
          <h1>${title}</h1>
          <p class="small-note">Choose a subject</p>
          <p class="early-grade-copy">${copy}</p>
        </div>

        <div class="scorebar">
          <div class="badge-pill">&#9733; Points: <span id="${pointsId}">0</span></div>
          <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="${learnersId}">0</span></div>
        </div>

        <div class="d-flex justify-content-center gap-3 flex-wrap mt-3 early-subject-picker grade-subject-picker" aria-label="${title} subjects">
          <button type="button" class="btn btn-main early-subject-choice grade-subject-option" data-subject="eng" onclick="show('${id}-eng')">English</button>
          <button type="button" class="btn btn-main early-subject-choice grade-subject-option" data-subject="math" onclick="show('${id}-math')">Math</button>
          ${hasScience?`<button type="button" class="btn btn-main early-subject-choice grade-subject-option" data-subject="sci" onclick="show('g1-sci')">Science</button>`:""}
          <button type="button" class="btn btn-main early-grade-back" onclick="appBack('grades')">Back</button>
        </div>
      </div>
    </div>`;
  const subjectPage=(id,gradeId,gradeTitle,name,icon,cards)=>`
    <div id="${id}" class="section d-none early-subject-page subject-screen" data-grade="${gradeId}" data-subject="${id.endsWith("-math")?"math":id.endsWith("-sci")?"sci":"eng"}">
      <div class="cardish text-center kid-font early-subject-shell">
        <h1>${gradeTitle} ${name}</h1>
        <p class="small-note">Choose a lesson</p>
        <section class="early-subject" data-subject="${id.endsWith("-math")?"math":id.endsWith("-sci")?"sci":"eng"}">
          <header><span>${icon}</span><div><small>SUBJECT</small><h2>${name}</h2></div></header>
          <div class="early-lesson-list">${cards}</div>
        </section>
        <div class="lesson-back-row">
          <button type="button" class="btn btn-main px-4" onclick="appBack('${gradeId}')">Back to ${gradeTitle}</button>
        </div>
      </div>
    </div>`;

  class K12EarlySections extends HTMLElement{
    connectedCallback(){
      if(this.dataset.rendered==="true") return;
      this.dataset.rendered="true";
      const prekEnglish=[
        lessonCard("prek:general:colors","prek-eng","Identify Colors","Match everyday objects with their colors.","CLR"),
        lessonCard("prek:general:same-different","prek-eng","Same or Different","Compare two objects and tell how they match.","S=D"),
        lessonCard("prek:general:big-small","prek-eng","Big and Small","Use size words to compare familiar things.","BIG"),
        lessonCard("prek:general:above-below","prek-eng","Above and Below","Practice simple position words.","UP"),
        lessonCard("prek:eng:letters","prek-eng","Identify Uppercase Letters","Find and name capital letters.","ABC"),
        lessonCard("prek:eng:lowercase","prek-eng","Identify Lowercase Letters","Find and name lowercase letters.","abc"),
        lessonCard("prek:eng:match-case","prek-eng","Match Uppercase and Lowercase Letters","Connect each capital letter to its lowercase partner.","Aa"),
        lessonCard("prek:eng:sounds","prek-eng","Beginning Letter Sounds","Match words to their first sound.","SND"),
        lessonCard("prek:eng:rhymes","prek-eng","Rhyming Words","Find words that sound alike.","&#9834;"),
        lessonCard("prek:general:animals","prek-eng","Identify Animals","Use simple clues to name familiar animals.","PET"),
        lessonCard("prek:general:body-parts","prek-eng","Identify Body Parts","Connect body parts with what they do.","ME"),
        lessonCard("prek:general:weather","prek-eng","Weather","Recognize sunny, rainy, snowy, windy, and cloudy days.","SUN"),
        lessonCard("prek:general:days-week","prek-eng","Days of the Week","Put the seven days in order.","7"),
        lessonCard("prek:general:day-parts","prek-eng","Morning, Afternoon, Evening, and Night","Match daily routines to each part of the day.","DAY"),
        lessonCard("prek:eng:sort-animal-homes","prek-eng","Animal Homes","Sort picture cards into farm, ocean, and forest.","🐄"),
        lessonCard("prek:eng:sort-foods","prek-eng","Foods and Drinks","Sort fruit, vegetables, and drinks.","🍎"),
        lessonCard("prek:eng:sort-weather","prek-eng","Weather","Sort sunny, rainy, and snowy pictures.","☀️"),
        lessonCard("prek:eng:sort-first-sounds","prek-eng","First Sounds","Sort picture words by M, S, and T.","M"),
        lessonCard("prek:eng:sort-everyday-things","prek-eng","Everyday Things","Sort things we wear, eat, and ride.","👕"),
        lessonCard("prek:eng:sort-bdf-sounds","prek-eng","B, D, F Sounds","Sort picture words by their first sound.","BDF"),
        lessonCard("prek:eng:sort-syllables","prek-eng","Word Beats","Clap words with one, two, or three beats.","👏"),
        lessonCard("prek:eng:sort-living-things","prek-eng","Living Things","Sort animals, plants, and objects.","🌱"),
        lessonCard("prek:eng:sort-feelings","prek-eng","Feelings","Sort happy, sad, and scared faces.","😊"),
        lessonCard("prek:eng:sort-places","prek-eng","Places","Sort home, school, and playground pictures.","🏠"),
        lessonCard("prek:eng:opposite-words","prek-eng","Opposite Words","Find words with opposite meanings.","UP"),
        lessonCard("prek:eng:animal-babies","prek-eng","Animal Babies","Match familiar animals with their young.","CUB"),
        lessonCard("prek:eng:action-pictures","prek-eng","Action Pictures","Name the action in each picture.","GO"),
        lessonCard("prek:eng:daily-routines","prek-eng","Daily Routines","Connect activities to parts of the day.","DAY"),
        lessonCard("prek:eng:vowel-pictures","prek-eng","Vowel Picture Sounds","Hear the first sound of picture words.","AEI"),
        lessonCard("prek:eng:last-sounds","prek-eng","Last Sounds","Listen for a word's ending sound.","END"),
        lessonCard("prek:eng:story-clues","prek-eng","Picture Story Clues","Find where a little story takes place.","READ"),
        lessonCard("prek:eng:community-helpers","prek-eng","Community Helpers","Meet the people who help us.","HELP"),
        lessonCard("prek:eng:sort-lrn-sounds","prek-eng","L, R, and N Sounds","Sort picture words by their first sound.","LRN"),
        lessonCard("prek:eng:sort-story-places","prek-eng","Places in Stories","Sort scenes from home, school, and the park.","HOME"),
        lessonCard("prek:eng:more-pbc-sounds","prek-eng","P, B, and C Sounds","Practice p, b, and c sounds with short picture and word clues.","ABC"),
        lessonCard("prek:eng:more-hfr-sounds","prek-eng","H, F, and R Sounds","Practice h, f, and r sounds with short picture and word clues.","ABC"),
        lessonCard("prek:eng:more-rhyme-families","prek-eng","Rhyming Picture Words","Practice rhyming picture words with short picture and word clues.","ABC"),
        lessonCard("prek:eng:more-animal-moves","prek-eng","How Animals Move","Practice how animals move with short picture and word clues.","ABC"),
        lessonCard("prek:eng:more-room-objects","prek-eng","Things in Rooms","Practice things in rooms with short picture and word clues.","ABC"),
        lessonCard("prek:eng:more-vehicles","prek-eng","Ways to Travel","Practice ways to travel with short picture and word clues.","ABC"),
        lessonCard("prek:eng:more-feeling-clues","prek-eng","Feelings in Little Stories","Practice feelings in little stories with short picture and word clues.","ABC"),
        lessonCard("prek:eng:more-opposite-clues","prek-eng","Words That Are Opposites","Practice words that are opposites with short picture and word clues.","ABC"),
        lessonCard("prek:eng:more-senses","prek-eng","Look, Listen, or Smell","Practice look, listen, or smell with short picture and word clues.","ABC"),
        lessonCard("prek:eng:more-story-time","prek-eng","Story Time Clues","Practice story time clues with short picture and word clues.","ABC"),
        lessonCard("prek:eng:again-letter-order","prek-eng","Find the Next Letter","Practice find the next letter with short word and picture clues.","ABC"),
        lessonCard("prek:eng:again-gln-sounds","prek-eng","G, L, and N Sounds","Practice g, l, and n sounds with short word and picture clues.","ABC"),
        lessonCard("prek:eng:again-ending-sounds","prek-eng","M, S, and D Endings","Practice m, s, and d endings with short word and picture clues.","ABC"),
        lessonCard("prek:eng:again-rhyming-words","prek-eng","More Rhyming Words","Practice more rhyming words with short word and picture clues.","ABC"),
        lessonCard("prek:eng:again-word-beats","prek-eng","Clap More Word Beats","Practice clap more word beats with short word and picture clues.","ABC"),
        lessonCard("prek:eng:again-weather-gear","prek-eng","Dress for the Weather","Drag or tap nine cards into three groups.","ABC"),
        lessonCard("prek:eng:again-everyday-groups","prek-eng","Wear, Play, or Eat","Practice wear, play, or eat with short word and picture clues.","ABC"),
        lessonCard("prek:eng:again-helping-people","prek-eng","People Who Help Us","Practice people who help us with short word and picture clues.","ABC"),
        lessonCard("prek:eng:again-action-words","prek-eng","Run, Jump, or Sleep","Practice run, jump, or sleep with short word and picture clues.","ABC"),
        lessonCard("prek:eng:again-story-places","prek-eng","More Story Places","Practice more story places with short word and picture clues.","ABC"),
        lessonCard("prek:eng:kind-words","prek-eng","Kind Words","Choose friendly words for everyday moments."),
        lessonCard("prek:eng:story-characters","prek-eng","Story Characters","Find who is in a short story."),
        lessonCard("prek:eng:story-settings-new","prek-eng","Where Stories Happen","Find the place in a short story."),
        lessonCard("prek:eng:what-happens-next","prek-eng","What Happens Next","Use clues to choose the next action."),
        lessonCard("prek:eng:face-feelings","prek-eng","Feelings from Clues","Connect a situation to a feeling."),
        lessonCard("prek:eng:first-next-last","prek-eng","Before and After","Follow the order of everyday steps."),
        lessonCard("prek:eng:letters-in-names","prek-eng","First Letters in Words","Hear the first letter in familiar words."),
        lessonCard("prek:eng:picture-compounds","prek-eng","Two Words Together","Put two little words together."),
        lessonCard("prek:eng:color-clues","prek-eng","Color Clues","Name colors of familiar things."),
        lessonCard("prek:eng:size-clues","prek-eng","Size Clues","Choose words for different sizes.")
      ];
      const prekMath=[
        lessonCard("prek:math:shapes","prek-math","Identify Basic Shapes","Recognize circles, squares, triangles, and more.","O"),
        lessonCard("prek:math:count5","prek-math","Count to 5","Practice number order from one to five.","5"),
        lessonCard("prek:math:count10","prek-math","Count to 10","Practice number order from one to ten.","10"),
        lessonCard("prek:math:number-objects","prek-math","Match Numbers to Objects","Count a group and choose its number.","1:1"),
        lessonCard("prek:math:more-less","prek-math","More or Less","Compare two small numbers.","< >"),
        lessonCard("prek:math:patterns","prek-math","Patterns","Find what comes next in a repeating pattern.","AB"),
        lessonCard("prek:math:sort-shapes","prek-math","Shapes","Sort circles, squares, and triangles.","▲"),
        lessonCard("prek:math:sort-count-1-3","prek-math","Count Pictures","Sort groups of one, two, and three.","123"),
        lessonCard("prek:math:sort-patterns","prek-math","Patterns","Sort AB, AAB, and ABB patterns.","AB"),
        lessonCard("prek:math:sort-small-sums","prek-math","Small Sums","Sort sums that make three, four, or five.","+"),
        lessonCard("prek:math:sort-more-less-same","prek-math","Compare Groups","See which side has more, or if they match.","⚖"),
        lessonCard("prek:math:sort-colors","prek-math","Colors","Sort red, blue, and yellow pictures.","🎨"),
        lessonCard("prek:math:sort-count-4-6","prek-math","Count to Six","Sort groups of four, five, and six.","456"),
        lessonCard("prek:math:sort-number-forms","prek-math","Number Forms","Match ways to show one, two, and three.","123"),
        lessonCard("prek:math:sort-corners","prek-math","Shape Corners","Sort shapes with zero, three, and four corners.","▲"),
        lessonCard("prek:math:sort-group-changes","prek-math","Group Changes","Sort adding, taking away, and staying the same.","+−"),
        lessonCard("prek:math:five-frames","prek-math","Five Frames","Count filled dots in a row of five.","5"),
        lessonCard("prek:math:count-six-ten","prek-math","Count Six to Ten","Count colorful picture groups.","10"),
        lessonCard("prek:math:compare-small-groups","prek-math","Compare Small Groups","Find the side with more pictures.","MORE"),
        lessonCard("prek:math:shapes-around-us","prek-math","Shapes Around Us","Spot shapes in everyday objects.","SHAPE"),
        lessonCard("prek:math:inside-outside","prek-math","Inside and Outside","Tell where objects are.","IN"),
        lessonCard("prek:math:longer-shorter","prek-math","Longer and Shorter","Compare the lengths of two lines.","RUL"),
        lessonCard("prek:math:add-one","prek-math","Add One More","Count a group after one more joins.","+1"),
        lessonCard("prek:math:take-one-away","prek-math","Take One Away","Count what remains when one leaves.","-1"),
        lessonCard("prek:math:sort-seven-nine","prek-math","Count Bigger Groups","Sort groups of seven, eight, and nine.","789"),
        lessonCard("prek:math:sort-lengths","prek-math","Compare Lengths","Sort short, medium, and long pictures.","LEN"),
        lessonCard("prek:math:more-count-to-five","prek-math","Count Little Groups","Practice count little groups with pictures and number clues.","123"),
        lessonCard("prek:math:more-one-more","prek-math","One More Picture","Practice one more picture with pictures and number clues.","123"),
        lessonCard("prek:math:more-one-less","prek-math","One Goes Away","Practice one goes away with pictures and number clues.","123"),
        lessonCard("prek:math:more-next-number","prek-math","What Number Comes Next?","Practice what number comes next? with pictures and number clues.","123"),
        lessonCard("prek:math:more-before-number","prek-math","What Number Comes Before?","Practice what number comes before? with pictures and number clues.","123"),
        lessonCard("prek:math:more-make-five","prek-math","Groups That Make Five","Practice groups that make five with pictures and number clues.","123"),
        lessonCard("prek:math:more-shape-objects","prek-math","Everyday Shape Clues","Practice everyday shape clues with pictures and number clues.","123"),
        lessonCard("prek:math:more-new-colors","prek-math","Green, Orange, and Purple","Practice green, orange, and purple with pictures and number clues.","123"),
        lessonCard("prek:math:more-full-empty","prek-math","Full, Half, or Empty","Practice full, half, or empty with pictures and number clues.","123"),
        lessonCard("prek:math:more-position-words","prek-math","On, Under, or Beside","Practice on, under, or beside with pictures and number clues.","123"),
        lessonCard("prek:math:again-count-six-ten","prek-math","Count to Ten with Pictures","Practice count to ten with pictures with short number clues.","123"),
        lessonCard("prek:math:again-add-groups","prek-math","Put Two Groups Together","Practice put two groups together with short number clues.","123"),
        lessonCard("prek:math:again-take-away","prek-math","Take Away from a Group","Practice take away from a group with short number clues.","123"),
        lessonCard("prek:math:again-match-one-each","prek-math","One for Each Friend","Practice one for each friend with short number clues.","123"),
        lessonCard("prek:math:again-count-dots","prek-math","Dot Cards","Practice dot cards with short number clues.","123"),
        lessonCard("prek:math:again-before-six-ten","prek-math","Before Six to Ten","Practice before six to ten with short number clues.","123"),
        lessonCard("prek:math:again-compare-sets","prek-math","Compare Picture Sets","Practice compare picture sets with short number clues.","123"),
        lessonCard("prek:math:again-shape-sides","prek-math","Curves and Corners","Drag or tap nine cards into three groups.","123"),
        lessonCard("prek:math:again-lengths","prek-math","Short, Medium, and Long","Practice short, medium, and long with short number clues.","123"),
        lessonCard("prek:math:again-positions","prek-math","Top, Middle, or Bottom","Practice top, middle, or bottom with short number clues.","123"),
        lessonCard("prek:math:numbers-eleven-fifteen","prek-math","Count 11 to 15","Count dots beyond ten."),
        lessonCard("prek:math:numbers-sixteen-twenty","prek-math","Count 16 to 20","Count larger groups of dots."),
        lessonCard("prek:math:ten-frame-counts","prek-math","Count a Ten Frame","Read filled spaces in a ten frame."),
        lessonCard("prek:math:count-on-from-five","prek-math","Count On from Five","Find the number that comes next."),
        lessonCard("prek:math:compare-to-ten","prek-math","Compare Groups to 10","See which group has more."),
        lessonCard("prek:math:three-color-patterns","prek-math","Three-Color Patterns","Continue a repeating color pattern."),
        lessonCard("prek:math:add-within-five","prek-math","Add Within 5","Put small groups together."),
        lessonCard("prek:math:take-away-five","prek-math","Take Away Within 5","Find what remains after one leaves."),
        lessonCard("prek:math:flat-and-solid-shapes","prek-math","Flat and Solid Shapes","Tell flat shapes from solid shapes."),
        lessonCard("prek:math:measure-with-blocks","prek-math","Measure with Blocks","Count blocks along a line.")
      ];
      const kinderEnglish=[
        lessonCard("k:eng:syllables","kinder-eng","Syllable Count","Clap and count word parts.","CLAP"),
        lessonCard("k:eng:words","kinder-eng","Build the Word","Connect pictures, sounds, and words.","CAT"),
        lessonCard("k:eng:rhymes","kinder-eng","Rhyming Words","Choose matching word endings.","&#9834;"),
        lessonCard("k:eng:short-a","kinder-eng","Read Short A Stories","Read stories and practice the short a sound.","Aa"),
        lessonCard("k:eng:short-e","kinder-eng","Read Short E Stories","Read stories and practice the short e sound.","Ee"),
        lessonCard("k:eng:short-i","kinder-eng","Read Short I Stories","Read stories and practice the short i sound.","Ii"),
        lessonCard("k:eng:short-o","kinder-eng","Read Short O Stories","Read stories and practice the short o sound.","Oo"),
        lessonCard("k:eng:short-u","kinder-eng","Read Short U Stories","Read stories and practice the short u sound.","Uu"),
        lessonCard("k:eng:short-vowels","kinder-eng","Read Short Vowel Stories","Practice all five short vowel sounds.","AEI"),
        lessonCard("k:eng:blend-cvc","kinder-eng","Three-Letter Sound Blending","Follow the sound meter and blend CVC words.","C-A-T"),
        lessonCard("k:eng:days-week","kinder-eng","Days of the Week","Read, order, and name all seven days.","7 DAYS"),
        lessonCard("k:eng:alphabet-upper","kinder-eng","Find the Letter: Uppercase","Find and order uppercase letters.","ABC"),
        lessonCard("k:eng:alphabet-lower","kinder-eng","Find the Letter: Lowercase","Find and order lowercase letters.","abc"),
        lessonCard("k:eng:initial-blends","kinder-eng","Beginning Blends","Read words that start with two consonants.","BL"),
        lessonCard("k:eng:word-families","kinder-eng","Word Families","Hear and find matching word endings.","-AT"),
        lessonCard("k:eng:opposites","kinder-eng","Opposite Words","Match words with opposite meanings.","UP"),
        lessonCard("k:eng:action-words","kinder-eng","Find the Action Word","Find the word that tells what happens.","GO"),
        lessonCard("k:eng:sentence-meaning","kinder-eng","Read and Understand","Read a sentence and answer about it.","READ"),
        pyramidCard("k","Build short sentences one word at a time with picture clues."),
        lessonCard("k:eng:sort-short-vowels","kinder-eng","Short Vowels","Sort short A, E, and I words.","AEI"),
        lessonCard("k:eng:sort-blends","kinder-eng","Beginning Blends","Sort BL, CL, and FL words.","BL"),
        lessonCard("k:eng:sort-word-families","kinder-eng","Word Families","Sort words ending in -at, -an, and -ap.","-AT"),
        lessonCard("k:eng:sort-sentence-marks","kinder-eng","Sentences","Sort telling, asking, and excited sentences.","?!"),
        lessonCard("k:eng:more-initial-digraphs","kinder-eng","Sh, Ch, and Th Sounds","Practice sh, ch, and th sounds with short picture and word clues.","ABC"),
        lessonCard("k:eng:more-short-vowels","kinder-eng","Short Vowel Pictures","Practice short vowel pictures with short picture and word clues.","ABC"),
        lessonCard("k:eng:more-final-sounds","kinder-eng","Listen to Last Sounds","Practice listen to last sounds with short picture and word clues.","ABC"),
        lessonCard("k:eng:more-word-endings","kinder-eng","Build Word Families","Practice build word families with short picture and word clues.","ABC"),
        lessonCard("k:eng:more-sentence-marks","kinder-eng","Read Sentence Marks","Practice read sentence marks with short picture and word clues.","ABC"),
        lessonCard("k:eng:more-naming-actions","kinder-eng","Naming, Action, or Describing","Practice naming, action, or describing with short picture and word clues.","ABC"),
        lessonCard("k:eng:more-location-words","kinder-eng","Where Is It?","Practice where is it? with short picture and word clues.","ABC"),
        lessonCard("k:eng:more-story-characters","kinder-eng","Who Is in the Story?","Practice who is in the story? with short picture and word clues.","ABC"),
        lessonCard("k:eng:more-story-settings","kinder-eng","Where Does the Story Happen?","Practice where does the story happen? with short picture and word clues.","ABC"),
        lessonCard("k:eng:more-food-groups","kinder-eng","Food Word Groups","Practice food word groups with short picture and word clues.","ABC"),
        lessonCard("k:eng:again-blends","kinder-eng","Br, Cr, and Tr Blends","Practice br, cr, and tr blends with short word and picture clues.","ABC"),
        lessonCard("k:eng:again-cvc-vowels","kinder-eng","Read Short Vowel Words","Practice read short vowel words with short word and picture clues.","ABC"),
        lessonCard("k:eng:again-end-pairs","kinder-eng","Read Ending Letter Pairs","Practice read ending letter pairs with short word and picture clues.","ABC"),
        lessonCard("k:eng:again-word-families","kinder-eng","More Word Families","Practice more word families with short word and picture clues.","ABC"),
        lessonCard("k:eng:again-story-parts","kinder-eng","Who, Where, or What Happened","Practice who, where, or what happened with short word and picture clues.","ABC"),
        lessonCard("k:eng:again-question-words","kinder-eng","Who, Where, or When","Practice who, where, or when with short word and picture clues.","ABC"),
        lessonCard("k:eng:again-syllables","kinder-eng","Clap Syllable Beats","Practice clap syllable beats with short word and picture clues.","ABC"),
        lessonCard("k:eng:again-pronouns","kinder-eng","I, We, or They","Practice i, we, or they with short word and picture clues.","ABC"),
        lessonCard("k:eng:again-sentence-types","kinder-eng","Telling, Asking, and Excited","Practice telling, asking, and excited with short word and picture clues.","ABC"),
        lessonCard("k:eng:again-word-groups","kinder-eng","Read and Group Words","Drag or tap nine cards into three groups.","ABC")
      ].join("");
      const kinderMath=[
        lessonCard("k:math:counting","kinder-math","Counting to 30","Build confident number sense.","123"),
        lessonCard("k:math:addition","kinder-math","Addition Within 10","Combine two small groups.","+"),
        lessonCard("k:math:patterns","kinder-math","Shapes and Patterns","Find what comes next.","PAT"),
        lessonCard("k:math:count20","kinder-math","Counting Up to 20","Practice number order and comparisons.","20"),
        lessonCard("k:math:compare20","kinder-math","Comparing Up to 20","Compare numbers using greater than, less than, and equal.","<="),
        lessonCard("k:math:take-apart20","kinder-math","Taking Apart Up to 20","Break numbers into two smaller parts.","10+"),
        lessonCard("k:math:forwardback10","kinder-math","Counting Forward & Back to 10","Count forward and backward with confidence.","10"),
        lessonCard("k:math:subtraction","kinder-math","Subtraction Within 10","Take away from small groups.","-"),
        lessonCard("k:math:measurement","kinder-math","Measurement","Compare length, weight, and capacity.","RUL"),
        lessonCard("k:math:circles","kinder-math","Circles","Find circles using colorful emoji shapes.","●"),
        lessonCard("k:math:triangles","kinder-math","Triangles","Find triangles using colorful emoji shapes.","▲"),
        lessonCard("k:math:squares","kinder-math","Squares","Find squares using colorful emoji shapes.","■"),
        lessonCard("k:math:all-shapes","kinder-math","All Shapes","Practice circles, triangles, and squares together.","◆"),
        lessonCard("k:math:time","kinder-math","Time","Read times on analog clocks.","CLK"),
        lessonCard("k:math:time-seasons","kinder-math","Time and Seasons","Explore daily routines and the four seasons.","SUN"),
        lessonCard("k:math:subitize","kinder-math","See Small Groups","Count dots at a glance.","DOT"),
        lessonCard("k:math:compare-groups","kinder-math","Compare Two Groups","Tell which group has more.","MORE"),
        lessonCard("k:math:shape-attributes","kinder-math","Shape Features","Count corners and sides.","SHAPE"),
        lessonCard("k:math:picture-graphs","kinder-math","Read Picture Graphs","Count pictures in a graph row.","GRAPH"),
        lessonCard("k:math:ordinal-positions","kinder-math","First Through Fifth","Name an item by its place in line.","1ST"),
        lessonCard("k:math:sort-sums","kinder-math","Sums","Sort addition facts that make 6, 7, or 8.","+"),
        lessonCard("k:math:sort-differences","kinder-math","Take Away","Sort subtraction answers of 2, 3, or 4.","−"),
        lessonCard("k:math:sort-number-forms","kinder-math","Number Forms","Match ways to show 4, 5, and 6.","456"),
        lessonCard("k:math:sort-solid-shapes","kinder-math","Solid Shapes","Sort spheres, cubes, and cylinders.","3D"),
        lessonCard("k:math:more-teen-ones","kinder-math","Tens and Ones to Twenty","Practice tens and ones to twenty with pictures and number clues.","123"),
        lessonCard("k:math:more-add-to-ten","kinder-math","Add Two Small Groups","Practice add two small groups with pictures and number clues.","123"),
        lessonCard("k:math:more-subtract-to-ten","kinder-math","Take Away from Ten","Practice take away from ten with pictures and number clues.","123"),
        lessonCard("k:math:more-make-ten","kinder-math","Find the Missing Part of Ten","Practice find the missing part of ten with pictures and number clues.","123"),
        lessonCard("k:math:more-count-by-two","kinder-math","Count by Twos","Practice count by twos with pictures and number clues.","123"),
        lessonCard("k:math:more-before-teen","kinder-math","Numbers Before the Teens","Practice numbers before the teens with pictures and number clues.","123"),
        lessonCard("k:math:more-after-teen","kinder-math","Numbers After the Teens","Practice numbers after the teens with pictures and number clues.","123"),
        lessonCard("k:math:more-double-pictures","kinder-math","Double a Small Group","Practice double a small group with pictures and number clues.","123"),
        lessonCard("k:math:more-picture-rows","kinder-math","Count Two Rows","Practice count two rows with pictures and number clues.","123"),
        lessonCard("k:math:more-groups-of-five","kinder-math","Count Groups of Five","Practice count groups of five with pictures and number clues.","123"),
        lessonCard("k:math:again-bonds-ten","kinder-math","Parts of Ten","Practice parts of ten with short number clues.","123"),
        lessonCard("k:math:again-doubles","kinder-math","Double the Group","Practice double the group with short number clues.","123"),
        lessonCard("k:math:again-near-doubles","kinder-math","One More Than a Double","Practice one more than a double with short number clues.","123"),
        lessonCard("k:math:again-add-teen","kinder-math","Add to a Teen Number","Practice add to a teen number with short number clues.","123"),
        lessonCard("k:math:again-subtract-teen","kinder-math","Take Away from a Teen Number","Practice take away from a teen number with short number clues.","123"),
        lessonCard("k:math:again-count-tens","kinder-math","Count Groups of Ten","Practice count groups of ten with short number clues.","123"),
        lessonCard("k:math:again-tally-cards","kinder-math","Read Tally Cards","Practice read tally cards with short number clues.","123"),
        lessonCard("k:math:again-teen-frames","kinder-math","Count Past a Full Frame","Practice count past a full frame with short number clues.","123"),
        lessonCard("k:math:again-compare-teens","kinder-math","Compare Teen Numbers","Practice compare teen numbers with short number clues.","123"),
        lessonCard("k:math:again-corners","kinder-math","Count Shape Corners","Drag or tap nine cards into three groups.","123")
      ].join("");
      const g1English=[
        lessonCard("g1:eng:short-vowels","g1-eng","Short Vowel Sounds","Find the short vowel sound in simple words.","CAT"),
        lessonCard("g1:eng:long-vowels","g1-eng","Long Vowel Sounds","Find vowels that say their names.","CAKE"),
        lessonCard("g1:eng:sight","g1-eng","Sight Words in Sentences","Choose words that complete each sentence.","SEE"),
        lessonCard("g1:eng:sentences","g1-eng","Build and Read Simple Sentences","Practice complete sentences and punctuation.","Aa"),
        lessonCard("g1:eng:parts-speech","g1-eng","Nouns, Verbs, and Adjectives","Tell whether a word names, acts, or describes.","NVA"),
        lessonCard("g1:eng:story-questions","g1-eng","Read a Short Story and Answer Questions","Read short passages and recall key details.","READ"),
        pyramidCard("g1","Build longer sentences one word at a time with picture clues."),
        lessonCard("g1:eng:short-vowel-words","g1-eng","Short Vowels in Words","Read words with short A, E, I, O, and U.","AEIOU"),
        lessonCard("g1:eng:long-vowel-words","g1-eng","Long Vowels in Words","Read words with long vowel sounds.","LONG"),
        lessonCard("g1:eng:beginning-blends","g1-eng","Beginning Blends","Find words that start with two consonants.","BL"),
        lessonCard("g1:eng:letter-pairs","g1-eng","Letter Pairs and Qu","Read SH, CH, TH, WH, and QU words.","SH"),
        lessonCard("g1:eng:ending-sounds","g1-eng","Ending Letter Patterns","Read words ending in CK, NG, ND, ST, and MP.","END"),
        lessonCard("g1:eng:compound-words","g1-eng","Make Compound Words","Join two small words to make one.","JOIN"),
        lessonCard("g1:eng:contractions","g1-eng","Read Contractions","Connect short forms with their full words.","I'M"),
        lessonCard("g1:eng:plural-words","g1-eng","One and More Than One","Find the plural form of everyday words.","+S"),
        lessonCard("g1:eng:syllable-beats","g1-eng","Count Word Beats","Clap and count syllables in words.","CLAP"),
        lessonCard("g1:eng:opposite-words","g1-eng","Opposite Words","Match words with opposite meanings.","UP"),
        lessonCard("g1:eng:naming-words","g1-eng","Find Naming Words","Find the noun in a short sentence.","NOUN"),
        lessonCard("g1:eng:action-words","g1-eng","Find Action Words","Find what happens in a sentence.","VERB"),
        lessonCard("g1:eng:describing-words","g1-eng","Find Describing Words","Find words that tell what something is like.","ADJ"),
        lessonCard("g1:eng:pronouns","g1-eng","Use Pronouns","Replace names with he, she, they, it, or we.","SHE"),
        lessonCard("g1:eng:sentence-marks","g1-eng","Sentence End Marks","Choose a period, question mark, or exclamation mark.","?!"),
        lessonCard("g1:eng:story-characters","g1-eng","Find Story Characters","Tell who a short story is about.","WHO"),
        lessonCard("g1:eng:story-settings","g1-eng","Find Story Settings","Tell where a short story happens.","WHERE"),
        lessonCard("g1:eng:story-first","g1-eng","What Happened First?","Find the first event in a story.","1ST"),
        lessonCard("g1:eng:story-next","g1-eng","What Happened Next?","Find the next event in a story.","NEXT"),
        lessonCard("g1:eng:story-purpose","g1-eng","Why Did They Go?","Use story clues to tell why.","WHY"),
        lessonCard("g1:eng:rhyming-families","g1-eng","Rhyming Word Families","Find words with the same ending sound.","RHYME"),
        lessonCard("g1:eng:final-consonants","g1-eng","Final Consonant Sounds","Listen for the last sound in a word.","END"),
        lessonCard("g1:eng:vowel-team-spelling","g1-eng","Vowel Team Spelling","Read AI, AY, EE, EA, and OA words.","TEAM"),
        lessonCard("g1:eng:silent-e-words","g1-eng","Read Silent E Words","Notice how final E changes a word.","E"),
        lessonCard("g1:eng:same-meaning","g1-eng","Words with the Same Meaning","Match everyday synonyms.","SAME"),
        lessonCard("g1:eng:word-categories","g1-eng","Put Words in Groups","Group animals, foods, clothes, and more.","SORT"),
        lessonCard("g1:eng:word-clues","g1-eng","Read Word Clues","Use a short clue to find a word.","CLUE"),
        lessonCard("g1:eng:position-words","g1-eng","Words That Tell Where","Read on, under, beside, and other place words.","WHERE"),
        lessonCard("g1:eng:a-or-an","g1-eng","A or An?","Choose the right word before a noun.","A/AN"),
        lessonCard("g1:eng:capital-letters","g1-eng","Use Capital Letters","Find sentences with correct capitals.","ABC"),
        lessonCard("g1:eng:past-tense-verbs","g1-eng","Actions That Already Happened","Read words for actions in the past.","PAST"),
        lessonCard("g1:eng:word-order","g1-eng","Put Sentence Words in Order","Arrange words into a complete sentence.","ORDER"),
        lessonCard("g1:eng:story-problems","g1-eng","Find the Story Problem","Notice what went wrong in a short story.","PROBLEM"),
        lessonCard("g1:eng:story-solutions","g1-eng","Find the Story Solution","Find how a character solved a problem.","SOLVE"),
        lessonCard("g1:eng:story-results","g1-eng","Find the Story Result","Tell what happened after a choice.","RESULT"),
        lessonCard("g1:eng:story-feelings","g1-eng","Feelings in Stories","Notice how a character feels.","FEEL"),
        lessonCard("g1:eng:animal-facts","g1-eng","Read Animal Facts","Read short facts and name the animal.","FACT"),
        lessonCard("g1:eng:animal-features","g1-eng","Animal Body Features","Find a feature described in a text.","BODY"),
        lessonCard("g1:eng:animal-homes-reading","g1-eng","Where Animals Live","Read to find an animal's home.","HOME"),
        lessonCard("g1:eng:animal-food-reading","g1-eng","What Animals Eat","Read to find an animal's food.","FOOD"),
        lessonCard("g1:eng:more-meaning-groups","g1-eng","Words with Related Meanings","Practice words with related meanings with short picture and word clues.","READ"),
        lessonCard("g1:eng:more-pronoun-clues","g1-eng","Choose a Pronoun","Practice choose a pronoun with short picture and word clues.","READ"),
        lessonCard("g1:eng:more-sentence-purposes","g1-eng","What Is the Sentence Doing?","Practice what is the sentence doing? with short picture and word clues.","READ"),
        lessonCard("g1:eng:more-word-endings","g1-eng","Words with Endings","Practice words with endings with short picture and word clues.","READ"),
        lessonCard("g1:eng:more-text-types","g1-eng","Kinds of Reading","Practice kinds of reading with short picture and word clues.","READ"),
        lessonCard("g1:eng:more-question-words","g1-eng","Question Words","Practice question words with short picture and word clues.","READ"),
        lessonCard("g1:eng:more-story-order","g1-eng","First, Next, or Last","Practice first, next, or last with short picture and word clues.","READ"),
        lessonCard("g1:eng:again-contractions","g1-eng","Read Contractions","Practice read contractions with short word and picture clues.","READ"),
        lessonCard("g1:eng:again-plural-endings","g1-eng","Make Words Plural","Practice make words plural with short word and picture clues.","READ"),
        lessonCard("g1:eng:again-prefixes","g1-eng","Words with Beginnings","Practice words with beginnings with short word and picture clues.","READ"),
        lessonCard("g1:eng:again-story-clues","g1-eng","Cause, Result, or Place","Practice cause, result, or place with short word and picture clues.","READ"),
        lessonCard("g1:eng:again-feeling-evidence","g1-eng","Feelings from Clues","Practice feelings from clues with short word and picture clues.","READ"),
        lessonCard("g1:eng:again-main-ideas","g1-eng","Find the Main Topic","Drag or tap nine cards into three groups.","READ"),
        lessonCard("g1:eng:again-joining-words","g1-eng","And, But, or Or","Practice and, but, or or with short word and picture clues.","READ")
      ].join("");
      const g1Math=[
        lessonCard("g1:math:block-add","g1-math","Addition Block Builder","Move colored blocks into two groups and combine them.","BLOCKS"),
        lessonCard("g1:math:number-line-lab","g1-math","Number Line Jump Lab","Move along a number line to solve each problem.","0→20"),
        lessonCard("g1:math:fraction-builder","g1-math","Fraction Shape Builder","Shade equal parts to build simple fractions.","1/2"),
        lessonCard("g1:math:count100","g1-math","Count to 100","Read number sequences through one hundred.","100"),
        lessonCard("g1:math:skip2","g1-math","Skip Count by 2s","Build number patterns by twos.","2s"),
        lessonCard("g1:math:skip5","g1-math","Skip Count by 5s","Build number patterns by fives.","5s"),
        lessonCard("g1:math:skip10","g1-math","Skip Count by 10s","Build number patterns by tens.","10s"),
        lessonCard("g1:math:add10","g1-math","Addition Within 10","Add numbers with sums up to ten.","+10"),
        lessonCard("g1:math:add20","g1-math","Addition Within 20","Add numbers with sums up to twenty.","+20"),
        lessonCard("g1:math:sub10","g1-math","Subtraction Within 10","Subtract from numbers through ten.","-10"),
        lessonCard("g1:math:sub20","g1-math","Subtraction Within 20","Subtract from numbers through twenty.","-20"),
        lessonCard("g1:math:compare","g1-math","Compare Numbers","Use greater than, less than, and equal to.","<=>"),
        lessonCard("g1:math:place-value","g1-math","Place Value — Tens and Ones","Break two-digit numbers into tens and ones.","10+1"),
        lessonCard("g1:math:shape-properties","g1-math","Basic Shapes and Their Properties","Compare sides, corners, faces, and curves.","SHAPE"),
        lessonCard("g1:math:measurement","g1-math","Simple Measurement","Compare length, weight, height, and capacity.","RUL"),
        lessonCard("g1:math:time","g1-math","Tell Time to the Hour and Half Hour","Read clocks at whole and half hours.","CLK"),
        lessonCard("g1:math:money","g1-math","Identify Coins","Recognize pennies, nickels, dimes, and quarters.","&#162;"),
        lessonCard("g1:math:number-neighbors","g1-math","Numbers Before and After","Find neighboring numbers up to 120.","123"),
        lessonCard("g1:math:number-bonds","g1-math","Number Bonds to 20","Find the missing part of a number bond.","10"),
        lessonCard("g1:math:addition-stories","g1-math","Addition Story Problems","Add objects in everyday stories.","+"),
        lessonCard("g1:math:subtraction-stories","g1-math","Subtraction Story Problems","Find what remains in everyday stories.","−"),
        lessonCard("g1:math:coin-totals","g1-math","Count Coins","Add pennies, nickels, and dimes.","¢"),
        lessonCard("g1:math:more-add-twenty","g1-math","Add Within Twenty","Practice add within twenty with pictures and number clues.","MATH"),
        lessonCard("g1:math:more-sub-twenty","g1-math","Subtract Within Twenty","Practice subtract within twenty with pictures and number clues.","MATH"),
        lessonCard("g1:math:more-ten-more","g1-math","Ten More Than a Number","Practice ten more than a number with pictures and number clues.","MATH"),
        lessonCard("g1:math:more-ten-less","g1-math","Ten Less Than a Number","Practice ten less than a number with pictures and number clues.","MATH"),
        lessonCard("g1:math:more-five-count","g1-math","Skip Count by Fives","Practice skip count by fives with pictures and number clues.","MATH"),
        lessonCard("g1:math:more-place-value","g1-math","Tens and Ones to Fifty","Practice tens and ones to fifty with pictures and number clues.","MATH"),
        lessonCard("g1:math:more-equal-groups","g1-math","Two Equal Groups","Practice two equal groups with pictures and number clues.","MATH"),
        lessonCard("g1:math:again-three-addends","g1-math","Add Three Small Groups","Practice add three small groups with short number clues.","MATH"),
        lessonCard("g1:math:again-missing-addend","g1-math","Find the Missing Addend","Practice find the missing addend with short number clues.","MATH"),
        lessonCard("g1:math:again-back-by-tens","g1-math","Count Back by Tens","Practice count back by tens with short number clues.","MATH"),
        lessonCard("g1:math:again-coin-combinations","g1-math","Count Coin Values","Practice count coin values with short number clues.","MATH"),
        lessonCard("g1:math:again-measure-cubes","g1-math","Compare Cube Lengths","Practice compare cube lengths with short number clues.","MATH"),
        lessonCard("g1:math:again-compare-tens","g1-math","Compare Two-Digit Numbers","Practice compare two-digit numbers with short number clues.","MATH"),
        lessonCard("g1:math:again-fraction-pictures","g1-math","Whole, Half, or Quarter","Practice whole, half, or quarter with short number clues.","MATH")
      ].join("");
      const g1Science=[
        lessonCard("g1:sci:living-things","g1-sci","Living and Nonliving Things","Sort living things from nonliving objects.","LIFE"),
        lessonCard("g1:sci:plants","g1-sci","Plants and Their Needs","Explore plant parts and what plants need to grow.","PLANT"),
        lessonCard("g1:sci:animals","g1-sci","Animals and Habitats","Match animals with their needs and homes.","HOME"),
        lessonCard("g1:sci:weather","g1-sci","Weather and Seasons","Observe weather and connect it to the seasons.","SKY"),
        lessonCard("g1:sci:materials","g1-sci","Materials and Properties","Compare objects by texture, strength, and flexibility.","MAT"),
        lessonCard("g1:sci:light-sound-motion","g1-sci","Light, Sound, and Motion","Investigate how things move, shine, and make sounds.","MOVE"),
        lessonCard("g1:sci:animal-coverings","g1-sci","Animal Body Coverings","Compare fur, feathers, scales, and shells.","FUR"),
        lessonCard("g1:sci:animal-young","g1-sci","Young Animals","Match animals with the names of their young.","CUB"),
        lessonCard("g1:sci:magnet-test","g1-sci","What Magnets Attract","Predict which everyday objects a magnet attracts.","MAG"),
        lessonCard("g1:sci:water-changes","g1-sci","Water, Ice, and Vapor","Notice freezing, melting, evaporation, and drops.","H₂O"),
        lessonCard("g1:sci:weather-safety","g1-sci","Safe Choices in Weather","Choose safe actions for sun, rain, cold, and storms.","SKY"),
        lessonCard("g1:sci:more-plant-parts","g1-sci","What Plant Parts Do","Explore what plant parts do with everyday examples.","SCI"),
        lessonCard("g1:sci:more-animal-coverings","g1-sci","Animal Body Coverings","Explore animal body coverings with everyday examples.","SCI"),
        lessonCard("g1:sci:more-habitat-clues","g1-sci","Find the Habitat","Explore find the habitat with everyday examples.","SCI"),
        lessonCard("g1:sci:more-materials","g1-sci","Everyday Materials","Explore everyday materials with everyday examples.","SCI"),
        lessonCard("g1:sci:more-forces","g1-sci","Push, Pull, or No Change","Explore push, pull, or no change with everyday examples.","SCI"),
        lessonCard("g1:sci:more-weather-signs","g1-sci","Read Weather Signs","Explore read weather signs with everyday examples.","SCI"),
        lessonCard("g1:sci:again-senses","g1-sci","Use Your Senses","Explore use your senses with everyday examples.","SCI"),
        lessonCard("g1:sci:again-plant-needs","g1-sci","What Plants Need","Explore what plants need with everyday examples.","SCI"),
        lessonCard("g1:sci:again-material-tests","g1-sci","Test a Material","Explore test a material with everyday examples.","SCI"),
        lessonCard("g1:sci:again-light-sources","g1-sci","Sources of Light","Drag or tap nine cards into three groups.","SCI"),
        lessonCard("g1:sci:again-water-states","g1-sci","Ice, Water, or Vapor","Explore ice, water, or vapor with everyday examples.","SCI"),
        lessonCard("g1:sci:again-season-signs","g1-sci","Season Changes","Explore season changes with everyday examples.","SCI")
      ].join("");

      this.innerHTML=
        gradeMenu("prek","PK","Pre-K","Playful, picture-first practice built for first learners.","prekPoints","prekLearners")+
        subjectPage("prek-eng","prek","Pre-K","English","A",prekLessonGroups(prekEnglish,[
          ["Everyday Words","Colors, sizes, positions, and comparisons.",0,4],
          ["Letters & Sounds","Match letters, beginning sounds, and rhymes.",4,9],
          ["Our World","Animals, body parts, weather, and daily routines.",9,14],
          ["Picture Sorting","Drag and drop familiar pictures into groups.",14,19],
          ["More Sorting","Practice sounds, syllables, feelings, and places.",19,24],
          ["Words & Stories","Use picture clues for words, actions, and little stories.",24,32],
          ["Listen & Sort","Group beginning sounds and story places.",32,34],
          ["More Sounds & Words","Hear first sounds, rhymes, and opposite words.",34,39],
          ["Stories & Our World","Use picture clues for movement, places, and feelings.",39,44],
          ["Letters & Word Beats","Practice letter order, sounds, rhymes, and syllables.",44,49],
          ["More Picture Clues","Explore people, actions, weather, and story places.",49,54],
          ["People and Stories","Practice kind words, characters, settings, and feelings.",54,59],
          ["Words and Descriptions","Practice order, first letters, combined words, colors, and sizes.",59,64]
        ]))+
        subjectPage("prek-math","prek","Pre-K","Math","+",prekLessonGroups(prekMath,[
          ["Shapes & Counting","Identify shapes and count small groups.",0,4],
          ["Compare & Pattern","Find more, less, and what comes next.",4,6],
          ["Sort Math Pictures","Group shapes, counts, patterns, and sums.",6,11],
          ["More Math Sorting","Practice colors, number forms, and changes.",11,16],
          ["Numbers & Shapes","Count, compare, and spot shapes around you.",16,20],
          ["Measure & Change","Explore position, length, adding, and taking away.",20,24],
          ["Sort More Pictures","Sort counts and lengths by dragging or tapping.",24,26],
          ["More Counting","Find numbers before and after, and make five.",26,32],
          ["Shapes & Position","Explore colors, fullness, shapes, and locations.",32,36],
          ["Count & Combine","Count pictures, put groups together, and take away.",36,42],
          ["Compare & Measure","Use pictures to compare sets, shapes, length, and position.",42,46],
          ["Numbers and Patterns","Count to twenty and continue color patterns.",46,51],
          ["Small Math Stories","Add, take away, name shapes, and measure with blocks.",51,56]
        ]))+
        gradeMenu("kinder","K","Kindergarten","Short lessons that turn early skills into confidence.","kPoints","kLearners")+
        subjectPage("kinder-eng","kinder","Kindergarten","English","A",kinderEnglish)+
        subjectPage("kinder-math","kinder","Kindergarten","Math","+",kinderMath)+
        gradeMenu("grade1","1","Grade 1","Independent practice across reading, math, and science.","g1Points","g1Learners",true)+
        subjectPage("g1-eng","grade1","Grade 1","English","A",g1English)+
        subjectPage("g1-math","grade1","Grade 1","Math","+",g1Math)+
        subjectPage("g1-sci","grade1","Grade 1","Science","SCI",g1Science);
    }
  }
  customElements.define("k12-early-sections",K12EarlySections);
})();
