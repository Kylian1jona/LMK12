(function(){
  const lessonCard=(key,back,title,description,tag)=>`<button type="button" class="early-lesson-card" onclick="startEarlyBank('${key}','${back}')"><span>${tag}</span><div><strong>${title}</strong><small>${description}</small></div><b>Start &rarr;</b></button>`;
  const subject=(name,icon,cards)=>`<section class="early-subject"><header><span>${icon}</span><div><small>SUBJECT</small><h2>${name}</h2></div></header><div class="early-lesson-list">${cards}</div></section>`;
  const gradePage=(id,level,title,copy,pointsId,learnersId,subjects)=>`
    <div id="${id}" class="section d-none early-grade-page" data-early-grade="${level}">
      <div class="early-grade-shell">
        <header class="early-grade-head">
          <button type="button" class="early-back-link" onclick="show('grades')">&larr; All grades</button>
          <div class="early-grade-title"><span>${level}</span><div><small>EARLY LEARNING</small><h1>${title}</h1><p>${copy}</p></div></div>
          <div class="early-grade-stats"><span>&#9733; <b id="${pointsId}">0</b> points</span><span><b id="${learnersId}">0</b> learners</span></div>
        </header>
        <div class="early-subject-grid">${subjects}</div>
      </div>
    </div>`;

  class K12EarlySections extends HTMLElement{
    connectedCallback(){
      if(this.dataset.rendered==="true") return;
      this.dataset.rendered="true";
      const prekEnglish=[
        lessonCard("prek:eng:letters","prek","Letter Names","Recognize uppercase letters.","ABC"),
        lessonCard("prek:eng:sounds","prek","Beginning Sounds","Match words to their first sound.","Aa"),
        lessonCard("prek:eng:rhymes","prek","Rhyming Words","Find words that sound alike.","&#9834;")
      ].join("");
      const prekMath=[
        lessonCard("prek:math:addition","prek","Picture Addition","Add small groups up to ten.","+"),
        lessonCard("prek:math:counting","prek","Counting to 20","Count objects and choose the total.","123"),
        lessonCard("prek:math:shapes","prek","Shape Match","Recognize everyday shapes.","O")
      ].join("");
      const kinderEnglish=[
        lessonCard("k:eng:syllables","kinder","Syllable Count","Clap and count word parts.","CLAP"),
        lessonCard("k:eng:words","kinder","Build the Word","Connect pictures, sounds, and words.","CAT"),
        lessonCard("k:eng:rhymes","kinder","Rhyming Words","Choose matching word endings.","&#9834;")
      ].join("");
      const kinderMath=[
        lessonCard("k:math:counting","kinder","Counting to 30","Build confident number sense.","123"),
        lessonCard("k:math:addition","kinder","Addition Within 10","Combine two small groups.","+"),
        lessonCard("k:math:patterns","kinder","Shapes & Patterns","Find what comes next.","PAT")
      ].join("");
      const g1English=[
        lessonCard("g1:eng:vowels","grade1","Vowel Sounds","Practice short and long vowels.","AEI"),
        lessonCard("g1:eng:sight","grade1","Sight Words","Read high-frequency words quickly.","SEE"),
        lessonCard("g1:eng:sentences","grade1","Sentence Basics","Build complete sentences.","Aa")
      ].join("");
      const g1Math=[
        lessonCard("g1:math:addsub","grade1","Addition & Subtraction","Solve two-digit number problems.","+/-"),
        lessonCard("g1:math:graphs","grade1","Data & Graphs","Compare simple picture data.","BAR"),
        lessonCard("g1:math:money","grade1","Money Counting","Count coins and find totals.","&#162;")
      ].join("");

      this.innerHTML=
        gradePage("prek","PK","Pre-K","Playful, picture-first practice built for first learners.","prekPoints","prekLearners",subject("English","A",prekEnglish)+subject("Math","+",prekMath))+
        gradePage("kinder","K","Kindergarten","Short lessons that turn early skills into confidence.","kPoints","kLearners",subject("English","A",kinderEnglish)+subject("Math","+",kinderMath))+
        gradePage("grade1","1","Grade 1","Independent practice across reading foundations and math.","g1Points","g1Learners",subject("English","A",g1English)+subject("Math","+",g1Math));
    }
  }
  customElements.define("k12-early-sections",K12EarlySections);
})();
