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
          <button type="button" class="btn btn-main early-grade-back" onclick="show('grades')">Back</button>
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
          <button type="button" class="btn btn-main px-4" onclick="show('${gradeId}')">Back to ${gradeTitle}</button>
        </div>
      </div>
    </div>`;

  class K12EarlySections extends HTMLElement{
    connectedCallback(){
      if(this.dataset.rendered==="true") return;
      this.dataset.rendered="true";
      const prekEnglish=[
        lessonCard("prek:eng:letters","prek-eng","Letter Names","Recognize uppercase letters.","ABC"),
        lessonCard("prek:eng:sounds","prek-eng","Beginning Sounds","Match words to their first sound.","Aa"),
        lessonCard("prek:eng:rhymes","prek-eng","Rhyming Words","Find words that sound alike.","&#9834;")
      ].join("");
      const prekMath=[
        lessonCard("prek:math:addition","prek-math","Picture Addition","Add small groups up to ten.","+"),
        lessonCard("prek:math:counting","prek-math","Counting to 20","Count objects and choose the total.","123"),
        lessonCard("prek:math:shapes","prek-math","Shape Match","Recognize everyday shapes.","O")
      ].join("");
      const kinderEnglish=[
        lessonCard("k:eng:syllables","kinder-eng","Syllable Count","Clap and count word parts.","CLAP"),
        lessonCard("k:eng:words","kinder-eng","Build the Word","Connect pictures, sounds, and words.","CAT"),
        lessonCard("k:eng:rhymes","kinder-eng","Rhyming Words","Choose matching word endings.","&#9834;")
      ].join("");
      const kinderMath=[
        lessonCard("k:math:counting","kinder-math","Counting to 30","Build confident number sense.","123"),
        lessonCard("k:math:addition","kinder-math","Addition Within 10","Combine two small groups.","+"),
        lessonCard("k:math:patterns","kinder-math","Shapes and Patterns","Find what comes next.","PAT")
      ].join("");
      const g1English=[
        lessonCard("g1:eng:vowels","g1-eng","Short and Long Vowel Sounds","Practice short and long vowels.","AEI"),
        lessonCard("g1:eng:sight","g1-eng","Sight Words in Sentences","Choose words that complete each sentence.","SEE"),
        lessonCard("g1:eng:sentences","g1-eng","Building Complete Sentences","Practice complete sentences and punctuation.","Aa")
      ].join("");
      const g1Math=[
        lessonCard("g1:math:addsub","g1-math","Addition and Subtraction Within 20","Solve addition and subtraction stories.","+/-"),
        lessonCard("g1:math:graphs","g1-math","Reading Picture Graphs and Data","Compare simple picture data.","BAR"),
        lessonCard("g1:math:money","g1-math","Coins and Counting Money","Count coins and find totals.","&#162;")
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
