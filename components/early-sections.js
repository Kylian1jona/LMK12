(function(){
  class K12EarlySections extends HTMLElement {
    connectedCallback(){
      if(this.dataset.rendered === "true") return;
      this.dataset.rendered = "true";
      this.innerHTML = String.raw`
<div id="prek" class="section d-none">
    <div class="cardish text-center kid-font">
      <h1>Pre-K</h1>
      <p class="small-note">Choose an English or Math lesson</p>
      <div class="scorebar">
        <div class="badge-pill">⭐ Points: <span id="prekPoints">0</span></div>
        <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="prekLearners">0</span></div>
      </div>

      <h2 class="mt-3">English</h2>
      <div class="d-flex justify-content-center gap-3 flex-wrap mt-2">
        <button type="button" class="btn btn-main" onclick="startEarlyBank('prek:eng:letters','prek')">Letter Names</button>
        <button type="button" class="btn btn-main" onclick="startEarlyBank('prek:eng:sounds','prek')">Beginning Sounds</button>
        <button type="button" class="btn btn-main" onclick="startEarlyBank('prek:eng:rhymes','prek')">Rhyming Words</button>
      </div>
      <h2 class="mt-3">Math</h2>
      <div class="d-flex justify-content-center gap-3 flex-wrap mt-2">
        <button type="button" class="btn btn-main" onclick="show('prek-add')">Emoji Addition</button>
        <button type="button" class="btn btn-main" onclick="show('prek-count')">Counting to 20</button>
        <button type="button" class="btn btn-main" onclick="show('prek-shapes')">Shapes Match</button>
      </div>
      <div class="d-flex justify-content-center mt-3">
        <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
      </div>
    </div>
  </div>

  <!-- PRE-K: ADDITION -->
  <div id="prek-add" class="section d-none">
    <div class="cardish text-center kid-font">
      <h1>Emoji Addition</h1>
      <div class="scorebar">
        <div class="badge-pill">⭐ Points: <span id="pkaPoints">0</span></div>
        <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="pkaLearners">0</span></div>
      </div>

      <div class="quiz-card mt-2">
        <div class="big-emoji" id="pkaObj1"></div>
        <div style="font-size:34px;font-weight:900;">+</div>
        <div class="big-emoji" id="pkaObj2"></div>
        <h2 id="pkaQ" style="font-weight:900;"></h2>

        <div class="d-flex justify-content-center flex-wrap">
          <button type="button" class="choice-btn" onclick="pkaAnswer(0)" id="pka0"></button>
          <button type="button" class="choice-btn" onclick="pkaAnswer(1)" id="pka1"></button>
          <button type="button" class="choice-btn" onclick="pkaAnswer(2)" id="pka2"></button>
          <button type="button" class="choice-btn" onclick="pkaAnswer(3)" id="pka3"></button>
        </div>

        <div class="feedback" id="pkaFb"></div>
        <div class="small-note" id="pkaProg">Exercise 1 of 20</div>
      </div>

      <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
        <button type="button" class="btn btn-main" onclick="pkaNext()" id="pkaNextBtn">Next</button>
        <button type="button" class="btn btn-main" onclick="pkaRestart()">Restart</button>
        <button type="button" class="btn btn-main" onclick="show('prek')">Back</button>
      </div>

      <div class="quiz-card mt-3 d-none" id="pkaReport">
        <h2 style="font-weight:900;">Great Job!</h2>
        <p id="pkaScoreLine"></p>
        <div class="stars" id="pkaStars"></div>
      </div>
    </div>
  </div>

  <!-- PRE-K: COUNTING -->
  <div id="prek-count" class="section d-none">
    <div class="cardish text-center kid-font">
      <h1>Count the Objects</h1>
      <div class="scorebar">
        <div class="badge-pill">⭐ Points: <span id="pkcPoints">0</span></div>
        <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="pkcLearners">0</span></div>
      </div>  

      <div class="quiz-card mt-2">
        <div class="small-note fw-bold" id="pkcProg">Round 1 of 10</div>
        <div class="big-emoji" id="pkcObjs" style="font-size:40px;word-break:break-word;"></div>

        <div class="d-flex justify-content-center flex-wrap">
          <button type="button" class="choice-btn" onclick="pkcPick(0)" id="pkc0"></button>
          <button type="button" class="choice-btn" onclick="pkcPick(1)" id="pkc1"></button>
          <button type="button" class="choice-btn" onclick="pkcPick(2)" id="pkc2"></button>
          <button type="button" class="choice-btn" onclick="pkcPick(3)" id="pkc3"></button>
        </div>

        <div class="feedback" id="pkcFb"></div>
      </div>

      <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
        <button type="button" class="btn btn-main" onclick="pkcNext()" id="pkcNextBtn">Next</button>
        <button type="button" class="btn btn-main" onclick="pkcReset()">Restart</button>
        <button type="button" class="btn btn-main" onclick="show('prek')">Back</button>
      </div>

      <div class="quiz-card mt-3 d-none" id="pkcReward">
        <h2 style="font-weight:900;">You Finished!</h2>
        <div class="stars" id="pkcStars"></div>
        <p class="small-note" id="pkcSummary"></p>
      </div>
    </div>
  </div>

  <!-- PRE-K: SHAPES -->
  <div id="prek-shapes" class="section d-none">
    <div class="cardish text-center kid-font">
      <h1>Shapes Match</h1>
      <div class="scorebar">
        <div class="badge-pill">⭐ Points: <span id="pksPoints">0</span></div>
        <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="pksLearners">0</span></div>
      </div>

      <div class="quiz-card mt-2">
        <div class="small-note fw-bold" id="pksProg">Round 1 of 10</div>
        <div style="font-size:30px;font-weight:900;" id="pksQ">Tap the CIRCLE</div>

        <div class="d-flex justify-content-center flex-wrap mt-3">
          <button type="button" class="choice-btn" style="width:120px;font-size:40px" onclick="pksPick(0)" id="pks0">🔴</button>
          <button type="button" class="choice-btn" style="width:120px;font-size:40px" onclick="pksPick(1)" id="pks1">🟥</button>
          <button type="button" class="choice-btn" style="width:120px;font-size:40px" onclick="pksPick(2)" id="pks2">🔺</button>
          <button type="button" class="choice-btn" style="width:120px;font-size:40px" onclick="pksPick(3)" id="pks3">🔷</button>
        </div>

        <div class="feedback" id="pksFb"></div>
        <button type="button" class="btn btn-main mt-2" onclick="pksNext()" id="pksNextBtn">Next</button>
      </div>

      <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
        <button type="button" class="btn btn-main" onclick="pksReset()">Restart</button>
        <button type="button" class="btn btn-main" onclick="show('prek')">Back</button>
      </div>

      <div class="quiz-card mt-3 d-none" id="pksDone">
        <h2 style="font-weight:900;">Awesome!</h2>
        <div class="stars" id="pksStars"></div>
      </div>
    </div>
  </div>

  <!-- KINDER MENU (3 lessons) -->
  <div id="kinder" class="section d-none">
    <div class="cardish text-center kid-font">
      <h1>Kindergarten</h1>
      <p class="small-note">Choose an English or Math lesson</p>
      <div class="scorebar">
        <div class="badge-pill">⭐ Points: <span id="kPoints">0</span></div>
        <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="kLearners">0</span></div>
      </div>

      <h2 class="mt-3">English</h2>
      <div class="d-flex justify-content-center gap-3 flex-wrap mt-2">
        <button type="button" class="btn btn-main" onclick="show('k-syll-count')">Syllable Count</button>
        <button type="button" class="btn btn-main" onclick="show('k-syll-build')">Build the Word</button>
        <button type="button" class="btn btn-main" onclick="show('k-rhymes')">Rhyming Words</button>
      </div>
      <h2 class="mt-3">Math</h2>
      <div class="d-flex justify-content-center gap-3 flex-wrap mt-2">
        <button type="button" class="btn btn-main" onclick="startEarlyBank('k:math:counting','kinder')">Counting to 30</button>
        <button type="button" class="btn btn-main" onclick="startEarlyBank('k:math:addition','kinder')">Addition Within 10</button>
        <button type="button" class="btn btn-main" onclick="startEarlyBank('k:math:patterns','kinder')">Shapes & Patterns</button>
      </div>
      <div class="d-flex justify-content-center mt-3">
        <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
      </div>
    </div>
  </div>

  <!-- KINDER: SYLLABLE COUNT -->
  <div id="k-syll-count" class="section d-none">
    <div class="cardish text-center kid-font">
      <h1>Syllable Count</h1>
      <div class="scorebar">
        <div class="badge-pill">⭐ Points: <span id="kscPoints">0</span></div>
        <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="kscLearners">0</span></div>
      </div>

      <div class="quiz-card mt-2">
        <div class="big-emoji" id="kscPic">🍌</div>
        <h2 style="font-weight:900;">Word: <span id="kscWord" style="cursor:pointer;text-decoration:underline;">BANANA</span></h2>
        <p class="small-note">How many syllables? (Tap the word to hear it)</p>

        <div class="d-flex justify-content-center flex-wrap">
          <button type="button" class="choice-btn" onclick="kscPick(1)">1</button>
          <button type="button" class="choice-btn" onclick="kscPick(2)">2</button>
          <button type="button" class="choice-btn" onclick="kscPick(3)">3</button>
        </div>

        <div class="feedback" id="kscFb"></div>
        <div class="small-note" id="kscProg">Round 1 of 12</div>
        <button type="button" class="btn btn-main mt-2" onclick="kscNext()" id="kscNextBtn">Next</button>
      </div>

      <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
        <button type="button" class="btn btn-main" onclick="kscReset()">Restart</button>
        <button type="button" class="btn btn-main" onclick="show('kinder')">Back</button>
      </div>
    </div>
  </div>

  <!-- KINDER: BUILD THE WORD -->
  <div id="k-syll-build" class="section d-none">
    <div class="cardish text-center kid-font">
      <h1>Build the Word</h1>
      <div class="scorebar">
        <div class="badge-pill">⭐ Points: <span id="ksbPoints">0</span></div>
        <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="ksbLearners">0</span></div>
      </div>

      <div class="quiz-card mt-2">
        <div class="big-emoji" id="ksbPic">🐘</div>
        <h2 style="font-weight:900;">Make the word: <span id="ksbWord">ELEPHANT</span></h2>
        <p class="small-note">Tap syllables in the correct order.</p>

        <div class="d-flex justify-content-center flex-wrap gap-2 mt-2" id="ksbTiles"></div>

        <div class="mt-3">
          <span class="badge-pill">Your build: <span id="ksbBuild" style="font-weight:900;"></span></span>
        </div>

        <div class="feedback" id="ksbFb"></div>

        <div class="d-flex justify-content-center gap-2 flex-wrap mt-2">
          <button type="button" class="btn btn-main" onclick="ksbClear()">Clear</button>
          <button type="button" class="btn btn-main" onclick="ksbCheck()">Check</button>
          <button type="button" class="btn btn-main" onclick="ksbNext()" id="ksbNextBtn">Next</button>
        </div>

        <div class="small-note" id="ksbProg">Round 1 of 10</div>
      </div>

      <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
        <button type="button" class="btn btn-main" onclick="ksbReset()">Restart</button>
        <button type="button" class="btn btn-main" onclick="show('kinder')">Back</button>
      </div>
    </div>
  </div>

  <!-- KINDER: RHYMES -->
  <div id="k-rhymes" class="section d-none">
    <div class="cardish text-center kid-font">
      <h1>Rhyming Words</h1>
      <div class="scorebar">
        <div class="badge-pill">⭐ Points: <span id="krPoints">0</span></div>
        <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="krLearners">0</span></div>
      </div>

      <div class="quiz-card mt-2">
        <div class="small-note fw-bold" id="krProg">Round 1 of 12</div>
        <div class="big-emoji" id="krPic">🐱</div>
        <h2 style="font-weight:900;">Word: <span id="krWord">CAT</span></h2>
        <p class="small-note">Pick the word that rhymes.</p>

        <div class="d-flex justify-content-center flex-wrap">
          <button type="button" class="choice-btn" onclick="krPick(0)" id="kr0">HAT</button>
          <button type="button" class="choice-btn" onclick="krPick(1)" id="kr1">DOG</button>
          <button type="button" class="choice-btn" onclick="krPick(2)" id="kr2">SUN</button>
          <button type="button" class="choice-btn" onclick="krPick(3)" id="kr3">MAP</button>
        </div>

        <div class="feedback" id="krFb"></div>
        <button type="button" class="btn btn-main mt-2" onclick="krNext()" id="krNextBtn">Next</button>
      </div>

      <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
        <button type="button" class="btn btn-main" onclick="krReset()">Restart</button>
        <button type="button" class="btn btn-main" onclick="show('kinder')">Back</button>
      </div>
    </div>
  </div>

  <!-- GRADE 1 MENU (3 lessons) -->
  <div id="grade1" class="section d-none">
    <div class="cardish text-center kid-font">
      <h1>Grade 1</h1>
      <p class="small-note">Choose an English or Math lesson</p>
      <div class="scorebar">
        <div class="badge-pill">⭐ Points: <span id="g1Points">0</span></div>
        <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="g1Learners">0</span></div>
      </div>

      <h2 class="mt-3">English</h2>
      <div class="d-flex justify-content-center gap-3 flex-wrap mt-2">
        <button type="button" class="btn btn-main" onclick="startEarlyBank('g1:eng:vowels','grade1')">Vowel Sounds</button>
        <button type="button" class="btn btn-main" onclick="startEarlyBank('g1:eng:sight','grade1')">Sight Words</button>
        <button type="button" class="btn btn-main" onclick="startEarlyBank('g1:eng:sentences','grade1')">Sentence Basics</button>
      </div>
      <h2 class="mt-3">Math</h2>
      <div class="d-flex justify-content-center gap-3 flex-wrap mt-2">
        <button type="button" class="btn btn-main" onclick="show('g1-addsub')">2–3 Digit Add/Sub</button>
        <button type="button" class="btn btn-main" onclick="show('g1-graphs')">Simple Data & Graphs</button>
        <button type="button" class="btn btn-main" onclick="show('g1-money')">Money Counting</button>
      </div>
      <div class="d-flex justify-content-center mt-3">
        <button type="button" class="btn btn-main" onclick="show('grades')">Back</button>
      </div>
    </div>
  </div>

  <!-- GRADE 1: ADD/SUB -->
  <div id="g1-addsub" class="section d-none">
    <div class="cardish text-center kid-font">
      <h1>2–3 Digit Add/Sub</h1>
      <div class="scorebar">
        <div class="badge-pill">⭐ Points: <span id="g1asPoints">0</span></div>
        <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="g1asLearners">0</span></div>
      </div>

      <div class="quiz-card mt-2">
        <div class="small-note fw-bold" id="g1asProg">Round 1 of 15</div>

        <div style="font-size:44px;font-weight:900;">
          <span id="g1asA">120</span>
          <span id="g1asOp"> + </span>
          <span id="g1asB">34</span>
          <span> = ?</span>
        </div>

        <div class="mt-2 small-note" id="g1asBlocks"></div>

        <div class="d-flex justify-content-center mt-3">
          <input id="g1asInput" type="number" class="form-control"
            style="max-width:180px;font-size:28px;font-weight:900;text-align:center;border-radius:16px;border:2px solid rgba(239,68,68,.60)"
            placeholder="Answer">
        </div>

        <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
          <button type="button" class="btn btn-main btn-lg" onclick="g1asCheck()">Check</button>
          <button type="button" class="btn btn-main btn-lg" onclick="g1asSpeak()">Read</button>
        </div>

        <div class="feedback" id="g1asFb"></div>
        <button type="button" class="btn btn-main mt-2" onclick="g1asNext()" id="g1asNextBtn">Next</button>
      </div>

      <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
        <button type="button" class="btn btn-main" onclick="g1asReset()">Restart</button>
        <button type="button" class="btn btn-main" onclick="show('grade1')">Back</button>
      </div>
    </div>
  </div>

  <!-- GRADE 1: GRAPHS -->
  <div id="g1-graphs" class="section d-none">
    <div class="cardish text-center kid-font">
      <h1>Simple Data & Graphs</h1>
      <div class="scorebar">
        <div class="badge-pill">⭐ Points: <span id="g1gPoints">0</span></div>
        <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="g1gLearners">0</span></div>
      </div>

      <div class="quiz-card mt-2">
        <div class="small-note fw-bold" id="g1gProg">Round 1 of 12</div>
        <h2 style="font-weight:900;" id="g1gTitle">Favorite Fruits</h2>
        <div class="small-note">Look at the picture graph and answer.</div>

        <div id="g1gGraph" class="mt-2" style="text-align:left;max-width:520px;margin:0 auto;"></div>

        <div class="mt-3" style="font-size:26px;font-weight:900;" id="g1gQ">Which has more?</div>

        <div class="d-flex justify-content-center flex-wrap">
          <button type="button" class="choice-btn" onclick="g1gPick(0)" id="g1g0"></button>
          <button type="button" class="choice-btn" onclick="g1gPick(1)" id="g1g1"></button>
          <button type="button" class="choice-btn" onclick="g1gPick(2)" id="g1g2"></button>
          <button type="button" class="choice-btn" onclick="g1gPick(3)" id="g1g3"></button>
        </div>

        <div class="d-flex justify-content-center gap-2 flex-wrap mt-2">
          <button type="button" class="btn btn-main" onclick="g1gSpeak()">Read</button>
        </div>

        <div class="feedback" id="g1gFb"></div>
        <button type="button" class="btn btn-main mt-2" onclick="g1gNext()" id="g1gNextBtn">Next</button>
      </div>

      <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
        <button type="button" class="btn btn-main" onclick="g1gReset()">Restart</button>
        <button type="button" class="btn btn-main" onclick="show('grade1')">Back</button>
      </div>
    </div>
  </div>

  <!-- GRADE 1: MONEY -->
  <div id="g1-money" class="section d-none">
    <div class="cardish text-center kid-font">
      <h1>Money Counting</h1>
      <div class="scorebar">
        <div class="badge-pill">⭐ Points: <span id="g1mPoints">0</span></div>
        <div class="badge-pill"><span class="learner-icon" role="img" aria-label="Learner"></span> Learners: <span id="g1mLearners">0</span></div>
      </div>

      <div class="quiz-card mt-2">
        <div class="small-note fw-bold" id="g1mProg">Round 1 of 12</div>
        <p class="small-note">Count the coins and choose the total (cents).</p>

        <div id="g1mCoins" style="text-align:left;max-width:520px;margin:0 auto;font-size:26px;font-weight:900;"></div>

        <div class="d-flex justify-content-center flex-wrap mt-3">
          <button type="button" class="choice-btn" onclick="g1mPick(0)" id="g1m0">0</button>
          <button type="button" class="choice-btn" onclick="g1mPick(1)" id="g1m1">0</button>
          <button type="button" class="choice-btn" onclick="g1mPick(2)" id="g1m2">0</button>
          <button type="button" class="choice-btn" onclick="g1mPick(3)" id="g1m3">0</button>
        </div>

        <div class="feedback" id="g1mFb"></div>
        <button type="button" class="btn btn-main mt-2" onclick="g1mNext()" id="g1mNextBtn">Next</button>
      </div>

      <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
        <button type="button" class="btn btn-main" onclick="g1mReset()">Restart</button>
        <button type="button" class="btn btn-main" onclick="show('grade1')">Back</button>
      </div>
    </div>
  </div>

  <div id="early-bank" class="section d-none">
    <div class="cardish text-center kid-font">
      <h1 id="earlyBankTitle">Lesson</h1>
      <div class="quiz-card mt-2">
        <div class="small-note fw-bold" id="earlyBankProgress">Question 1 of 25</div>
        <h2 id="earlyBankQuestion" class="mt-3"></h2>
        <div class="d-flex justify-content-center flex-wrap mt-3" id="earlyBankChoices"></div>
        <div class="feedback" id="earlyBankFeedback"></div>
        <button type="button" class="btn btn-main mt-2" id="earlyBankNext" onclick="earlyBankNext()" disabled>Next</button>
      </div>
      <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
        <button type="button" class="btn btn-main" onclick="earlyBankRestart()">Restart</button>
        <button type="button" class="btn btn-main" onclick="earlyBankBack()">Back</button>
      </div>
    </div>
  </div>

</div>
`;
    }
  }

  customElements.define("k12-early-sections", K12EarlySections);
})();
