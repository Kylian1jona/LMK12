(function(){
  const lessonCard=(key,back,title,description,tag)=>`<button type="button" class="early-lesson-card" data-lesson-key="${key}" onclick="startEarlyBank('${key}','${back}')"><span>${tag}</span><div><strong>${title}</strong><small>${description}</small></div><b>Start &rarr;</b></button>`;
  const gradeMenu=(id,level,title,copy,pointsId,learnersId)=>`
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
          <button type="button" class="btn btn-main early-grade-back" onclick="appBack('grades')">Back</button>
        </div>
      </div>
    </div>`;
  const subjectPage=(id,gradeId,gradeTitle,name,icon,cards)=>`
    <div id="${id}" class="section d-none early-subject-page subject-screen" data-grade="${gradeId}" data-subject="${id.endsWith("-math")?"math":"eng"}">
      <div class="cardish text-center kid-font early-subject-shell">
        <h1>${gradeTitle} ${name}</h1>
        <p class="small-note">Choose a lesson</p>
        <section class="early-subject" data-subject="${id.endsWith("-math")?"math":"eng"}">
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
        lessonCard("prek:general:day-parts","prek-eng","Morning, Afternoon, Evening, and Night","Match daily routines to each part of the day.","DAY")
      ].join("");
      const prekMath=[
        lessonCard("prek:math:shapes","prek-math","Identify Basic Shapes","Recognize circles, squares, triangles, and more.","O"),
        lessonCard("prek:math:count5","prek-math","Count to 5","Practice number order from one to five.","5"),
        lessonCard("prek:math:count10","prek-math","Count to 10","Practice number order from one to ten.","10"),
        lessonCard("prek:math:number-objects","prek-math","Match Numbers to Objects","Count a group and choose its number.","1:1"),
        lessonCard("prek:math:more-less","prek-math","More or Less","Compare two small numbers.","< >"),
        lessonCard("prek:math:patterns","prek-math","Patterns","Find what comes next in a repeating pattern.","AB")
      ].join("");
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
        lessonCard("k:eng:alphabet-lower","kinder-eng","Find the Letter: Lowercase","Find and order lowercase letters.","abc")
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
        lessonCard("k:math:time-seasons","kinder-math","Time and Seasons","Explore daily routines and the four seasons.","SUN")
      ].join("");
      const g1English=[
        lessonCard("g1:eng:short-vowels","g1-eng","Short Vowel Sounds","Find the short vowel sound in simple words.","CAT"),
        lessonCard("g1:eng:long-vowels","g1-eng","Long Vowel Sounds","Find vowels that say their names.","CAKE"),
        lessonCard("g1:eng:sight","g1-eng","Sight Words in Sentences","Choose words that complete each sentence.","SEE"),
        lessonCard("g1:eng:sentences","g1-eng","Build and Read Simple Sentences","Practice complete sentences and punctuation.","Aa"),
        lessonCard("g1:eng:parts-speech","g1-eng","Nouns, Verbs, and Adjectives","Tell whether a word names, acts, or describes.","NVA"),
        lessonCard("g1:eng:story-questions","g1-eng","Read a Short Story and Answer Questions","Read short passages and recall key details.","READ")
      ].join("");
      const g1Math=[
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
        lessonCard("g1:math:money","g1-math","Identify Coins","Recognize pennies, nickels, dimes, and quarters.","&#162;")
      ].join("");

      this.innerHTML=
        gradeMenu("prek","PK","Pre-K","Playful, picture-first practice built for first learners.","prekPoints","prekLearners")+
        subjectPage("prek-eng","prek","Pre-K","English","A",prekEnglish)+
        subjectPage("prek-math","prek","Pre-K","Math","+",prekMath)+
        gradeMenu("kinder","K","Kindergarten","Short lessons that turn early skills into confidence.","kPoints","kLearners")+
        subjectPage("kinder-eng","kinder","Kindergarten","English","A",kinderEnglish)+
        subjectPage("kinder-math","kinder","Kindergarten","Math","+",kinderMath)+
        gradeMenu("grade1","1","Grade 1","Independent practice across reading foundations and math.","g1Points","g1Learners")+
        subjectPage("g1-eng","grade1","Grade 1","English","A",g1English)+
        subjectPage("g1-math","grade1","Grade 1","Math","+",g1Math);
    }
  }
  customElements.define("k12-early-sections",K12EarlySections);
})();
