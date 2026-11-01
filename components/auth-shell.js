(function(){
  class K12AuthShell extends HTMLElement {
    connectedCallback(){
      if(this.dataset.rendered === "true") return;
      this.dataset.rendered = "true";
      this.innerHTML = String.raw`
<!-- ACCOUNT ACCESS -->
<div id="loginWall" role="dialog" aria-modal="true" aria-hidden="false" aria-labelledby="authDialogTitle" aria-describedby="authDialogHelp">
  <div class="logincard auth-card">
    <span id="authDialogTitle" class="visually-hidden">LearnMaster K-12 account access</span>
    <span id="authDialogHelp" class="visually-hidden">Sign in with an existing account or create a new family account.</span>
    <aside class="auth-intro">
      <div class="auth-brand-lockup">
        <img class="lm-auth-logo" src="images/learnmaster-logo-header-v2.png" alt="LearnMaster K12">
        <strong id="authBrandName" class="visually-hidden">LearnMaster K12</strong>
      </div>

      <div class="auth-intro-copy">
        <span class="auth-eyebrow">Learn at your pace</span>
        <h1>Build skills. See progress. Keep growing.</h1>
        <p>Structured practice, clear feedback, and rewards for learners from Pre-K through Grade 12.</p>
      </div>

      <div class="auth-highlights" aria-label="Platform highlights">
        <div><strong>25</strong><span>questions per lesson</span></div>
        <div><strong>Classic</strong><span>question format</span></div>
      </div>

      <div class="auth-path" aria-hidden="true">
        <span class="is-complete">1</span><i></i><span class="is-complete">2</span><i></i><span>3</span>
      </div>
    </aside>

    <section class="auth-form-shell" aria-label="Account access">
      <label class="auth-language-control" for="loginLanguagePicker"><span>Language</span><select id="loginLanguagePicker" class="language-picker" aria-label="Choose language for login and learning" onchange="setLanguage(this.value)"><option value="en">English</option><option value="es">Spanish</option><option value="fr">French</option><option value="zh">Chinese</option><option value="hi">Hindi</option></select></label>
      <div class="auth-mobile-brand" aria-hidden="true">
        <img class="lm-auth-logo" src="images/learnmaster-logo-header-v2.png" alt="">
      </div>

      <div id="loginMsg" class="loginmsg" role="status" aria-live="polite" aria-atomic="true"></div>

      <div id="loginFormPanel" aria-hidden="false">
        <header class="auth-form-header">
          <span class="auth-eyebrow">Welcome back</span>
          <h2>Sign in to learn</h2>
          <p>Choose your learner profile after signing in.</p>
        </header>

        <div class="auth-field">
          <label for="loginUser">Username or email</label>
          <input id="loginUser" name="username" type="text" class="form-control rounded-xl" autocomplete="username" autocapitalize="none" spellcheck="false" required placeholder="your_username or you@email.com">
        </div>

        <div class="auth-field">
          <label for="loginPass">Password</label>
          <input id="loginPass" name="password" type="password" class="form-control rounded-xl" autocomplete="current-password" required placeholder="••••••">
        </div>

        <div class="auth-actions">
          <button type="button" class="btn btn-main auth-primary" onclick="doLogin()">Log in</button>
          <button type="button" class="btn btn-main auth-secondary" onclick="showSignup()">Sign up</button>
          <button type="button" class="btn btn-main auth-secondary auth-tutor-signup" onclick="showTutorSignup()">Sign up as a tutor</button>
        </div>
        <button type="button" class="btn btn-link auth-forgot" onclick="resetLoginPassword()">Forgot password?</button>
        <button type="button" id="resendSignupConfirmationButton" class="btn btn-link auth-forgot d-none" onclick="resendSignupConfirmation()">Resend confirmation email</button>
      </div>

      <div id="signupFormPanel" class="d-none" aria-hidden="true">
        <header class="auth-form-header">
          <span class="auth-eyebrow">New account</span>
          <h2>Create your account</h2>
          <p>Choose the account type first. Tutor accounts open a separate professional workspace and cannot enter the student app.</p>
        </header>

        <fieldset class="auth-role-picker">
          <legend>I am signing up as</legend>
          <label><input type="radio" name="signupRole" value="family" checked onchange="setSignupRole('family')"><span><b>Family or learner</b><small>Lessons, reading, progress, and rewards</small></span></label>
          <label><input type="radio" name="signupRole" value="tutor" onchange="setSignupRole('tutor')"><span><b>Tutor</b><small>Schedule, lessons, learners, and messages</small></span></label>
        </fieldset>

        <div class="auth-name-row">
          <div class="auth-field">
            <label for="signupFirstName">First name</label>
            <input id="signupFirstName" name="given-name" type="text" class="form-control rounded-xl" autocomplete="given-name" maxlength="80" required placeholder="First name">
          </div>

          <div class="auth-field">
            <label for="signupLastName">Last name</label>
            <input id="signupLastName" name="family-name" type="text" class="form-control rounded-xl" autocomplete="family-name" maxlength="80" required placeholder="Last name">
          </div>
        </div>

        <div class="auth-field">
          <label for="signupUser">Email address</label>
          <input id="signupUser" name="email" type="email" class="form-control rounded-xl" autocomplete="email" autocapitalize="none" spellcheck="false" required placeholder="you@email.com">
        </div>

        <div class="auth-field">
          <label for="signupName">Username</label>
          <input id="signupName" name="new-username" type="text" class="form-control rounded-xl" autocomplete="username" autocapitalize="none" spellcheck="false" required placeholder="letters, numbers, or underscore">
        </div>

        <div class="auth-field">
          <label for="signupPass">Password</label>
          <input id="signupPass" name="new-password" type="password" class="form-control rounded-xl" autocomplete="new-password" minlength="6" required placeholder="6 or more characters">
        </div>

        <div id="tutorSignupFields" class="tutor-signup-fields d-none" aria-hidden="true">
          <div class="auth-field"><label for="signupTutorQualification">Qualification</label><input id="signupTutorQualification" class="form-control rounded-xl" maxlength="180" placeholder="Example: B.Ed. and certified reading specialist"></div>
          <div class="auth-field"><label for="signupTutorSubjects">Subjects</label><input id="signupTutorSubjects" class="form-control rounded-xl" maxlength="180" placeholder="Example: Math, Science, Homework support"></div>
          <div class="auth-field"><label for="signupTutorAvailability">General availability</label><input id="signupTutorAvailability" class="form-control rounded-xl" maxlength="180" placeholder="Example: Monday–Thursday, 4–7 PM"></div>
        </div>

        <div class="auth-actions">
          <button type="button" id="signupSubmitButton" class="btn btn-main auth-primary" onclick="createSignupUser()">Create account</button>
          <button type="button" class="btn btn-main auth-secondary" onclick="showLoginForm()">Back to login</button>
        </div>
      </div>

      <div class="auth-security-note">
        <span aria-hidden="true">✓</span>
        <p><strong>Secure account access</strong>Authentication is protected by Supabase.</p>
      </div>
    </section>
  </div>
</div>

<!-- PROFILE CHOOSER (shown after account login) -->
<div id="profileChooser" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="profileChooserTitle">
  <div class="profile-chooser-layout">
  <div class="profile-chooser-card">
    <img class="lm-dialog-logo" src="images/learnmaster-logo-header-v2.png" alt="LearnMaster K12">
    <span class="profile-chooser-kicker">Your subscription</span>
    <h2 id="profileChooserTitle">Who is learning today?</h2>
    <p>Choose a learner, or enter the parent area.</p>
    <div id="profileChooserGrid" class="profile-chooser-grid"></div>
  </div>
  <aside class="profile-update-log" aria-labelledby="profileUpdateTitle">
    <span class="profile-chooser-kicker">What's new</span>
    <h2 id="profileUpdateTitle">Update log</h2>
    <div class="profile-update-entries">
      <article><time datetime="2026-11-01">November 1, 2026</time><h3>Family dashboard and five new Playground games</h3><p>The parent workspace now has separate progress, goals, and account sections without learner navigation. Playground is free for signed-in learners and features Escape the School, Math Parkour, Science Tower Defense, Stock Market Simulator, and Career Quest.</p></article>
      <article><time datetime="2026-11-01">November 1, 2026</time><h3>Clearer account confirmation and security</h3><p>A dedicated confirmation page now welcomes new members and helps families set their parent PIN. Settings adds on-site PIN controls and email links for password and PIN recovery. Saved color themes load with the account.</p></article>
      <article><time datetime="2026-10-31">October 31, 2026</time><h3>20 more Grade 1 English lessons and clearer questions</h3><p>New phonics, word meaning, grammar, story, and informational reading lessons add 500 questions. Grade 1 English questions now begin with the question itself instead of repeated opening phrases.</p></article>
      <article><time datetime="2026-10-31">October 31, 2026</time><h3>20 more Grade 1 English lessons</h3><p>Five lessons each in phonics, word work, grammar, and reading add 500 questions. Practice vowel sounds, word patterns, sentence skills, and short stories with multiple choice, dropdown, and matching questions.</p></article>
      <article><time datetime="2026-10-29">October 29, 2026</time><h3>Trial card for every plan</h3><p>The plan screen shows prefilled trial card details again. Choose Starter, Plus, or Max and start learning without entering a real card. No payment is processed.</p></article>
      <article><time datetime="2026-10-29">October 29, 2026</time><h3>Easier account access</h3><p>Choose a learning plan and start without entering a test card. Plan prices are previews; no payment is processed.</p></article>
      <article><time datetime="2026-10-29">October 29, 2026</time><h3>Reading pyramids and more ways to answer</h3><p>Kindergarten and Grade 1 English now have picture-guided reading pyramids. Grade 1 builds longer sentences. Grade 5 English questions begin with the question itself, and the new Grade 5 lessons add fill-in-the-blank practice alongside matching, multiple choice, dropdowns, and select-two questions.</p></article>
      <article><time datetime="2026-10-29">October 29, 2026</time><h3>30 more Grade 5 lessons</h3><p>Ten new lessons each in English, Math, and Science add 750 two-skill questions. Every lesson mixes multiple choice, dropdown, select-two, and drag-and-drop matching practice.</p></article>
      <article><time datetime="2026-10-24">October 24, 2026</time><h3>40 more Grade 11 and 12 lessons</h3><p>20 standard lessons and 20 interactive lessons add 1,000 questions across Grades 11 and 12. Interactive lessons now sit among other lessons under skill-based names across the site.</p></article>
      <article><time datetime="2026-10-24">October 24, 2026</time><h3>20 new Grade 11 and 12 lessons</h3><p>Grade 11 and Grade 12 each gain 10 lessons across English, Math, Science, and History. Every lesson has 25 questions, adding 500 new questions in all.</p></article>
      <article><time datetime="2026-10-24">October 24, 2026</time><h3>Cleaner early-grade lesson menus</h3><p>Pre-K, Kindergarten, and Grade 1 skill groups now open one at a time. Compact topic rows show lesson counts, and lessons appear in a clearer two-column layout when a group is opened.</p></article>
      <article><time datetime="2026-10-24">October 24, 2026</time><h3>Skill cards from Pre-K through Grade 1</h3><p>Pre-K, Kindergarten, and Grade 1 lessons now use the same topic card layout as Grade 2 English. Each subject is divided into short skill groups, including Grade 1 Science, while every lesson stays available.</p></article>
      <article><time datetime="2026-10-24">October 24, 2026</time><h3>Lesson menus grouped by skill</h3><p>Pre-K English and Math lessons are now in short, labeled groups. Grade 2 English is split into Words and Grammar, Build Sentences, Reading and Sounds, and Spelling and Challenges, with the dropdown lesson in its own box.</p></article>
      <article><time datetime="2026-10-23">October 23, 2026</time><h3>Cleaner Grade 2 English questions</h3><p>Lessons 11 and 12 now start each affected question with the instruction, without the repeated lesson label.</p></article>
      <article><time datetime="2026-10-23">October 23, 2026</time><h3>10 more Grade 8 lesson formats</h3><p>Two new 25-question lessons in each Grade 8 subject add 250 questions across English, Math, Algebra 1, Science, and History. Clearly labeled boxes mix checkboxes, dropdowns, drag-and-drop matching, and ranking. Every checkbox question has six options and exactly two correct choices.</p></article>
      <article><time datetime="2026-10-23">October 23, 2026</time><h3>Four new lesson formats</h3><p>New 25-question lessons add checkboxes in Grade 3 Math, dropdowns in Grade 2 English, drag-and-drop matching in Grade 4 Science, and drag-and-drop ranking in Grade 5 Math. Each has a labeled box in its subject menu. Checkbox questions show six choices and ask for exactly two.</p></article>
      <article><time datetime="2026-10-23">October 23, 2026</time><h3>Reading and Typing in grade menus</h3><p>Grade 2 now opens its reading passages directly from the subject choices. Grades 3, 4, and 5 now have Typing buttons that open the full keyboard practice course.</p></article>
      <article><time datetime="2026-10-23">October 23, 2026</time><h3>Kindergarten drag-and-drop practice</h3><p>Eight new English and Math sorting lessons add 200 nine-card rounds. Sort vowel sounds, blends, word families, sentences, sums, subtraction, number forms, and solid shapes by dragging or tapping cards.</p></article>
      <article><time datetime="2026-10-23">October 23, 2026</time><h3>More Kindergarten reading and Math</h3><p>10 new lessons add 250 questions. Practice beginning blends, word families, opposites, action words, reading sentences, small groups, shape features, picture graphs, and positions.</p></article>
      <article><time datetime="2026-10-22">October 22, 2026</time><h3>STAAR shortcut and easier lesson view</h3><p>STAAR testing now sits under Playground on the home page. Lesson questions load near the top, with answer choices easier to reach without scrolling.</p></article>
      <article><time datetime="2026-10-22">October 22, 2026</time><h3>More Grade 1 Math and Science practice</h3><p>10 new standard lessons add 250 questions: five Math lessons on numbers, stories, and coins, plus five Science lessons on animals, magnets, water, and weather safety.</p></article>
      <article><time datetime="2026-10-22">October 22, 2026</time><h3>Reading grade labels fit</h3><p>Pre-K and Kindergarten now use short labels inside the reading grade bubbles, with their full names beside them.</p></article>
      <article><time datetime="2026-10-22">October 22, 2026</time><h3>Account confirmation help</h3><p>After sign-up, the login screen now explains email confirmation and offers a resend button. Unconfirmed accounts get clear instructions instead of a password error.</p></article>
      <article><time datetime="2026-10-21">October 21, 2026</time><h3>More Pre-K picture sorting</h3><p>10 more drag-and-drop lessons add 250 questions in English and Math. Sort first sounds, word beats, feelings, colors, counting, number forms, and more with nine picture cards per question.</p></article>
      <article><time datetime="2026-10-21">October 21, 2026</time><h3>Pre-K drag-and-drop sorting</h3><p>10 new picture-led lessons add 250 sorting questions across English and Math. Drag or tap nine cards into three groups to practice animals, sounds, shapes, counting, patterns, and more.</p></article>
      <article><time datetime="2026-10-20">October 20, 2026</time><h3>20 new Grade 8 drag-and-drop lessons</h3><p>Four lessons each in English, Science, Math, Algebra 1, and History add 500 sorting questions. Every question has 15 cards and 3 categories.</p></article>
      <article><time datetime="2026-10-18">October 18, 2026</time><h3>30 more Grade 8 drag-and-drop lessons</h3><p>Six new lessons each in English, Science, Math, Algebra 1, and History add 750 sorting questions. Each question has 15 cards and 3 categories.</p></article>
      <article><time datetime="2026-10-18">October 18, 2026</time><h3>35 more Grade 8 sorting lessons</h3><p>Practice with 10 English, 10 Science, 5 Math, 5 Algebra 1, and 5 History drag-and-drop lessons. Each has 25 different sorting sets with 15 options in 3 categories: 875 questions in all.</p></article>
      <article><time datetime="2026-10-18">October 18, 2026</time><h3>Follow along and sort with confidence</h3><p>Read-aloud now highlights the passage, pauses and resumes, and lets you go back a sentence or choose a word. Sorting lessons have a separate options tray, clearer categories, a selected-card prompt, and live placement progress.</p></article>
      <article><time datetime="2026-10-18">October 18, 2026</time><h3>20 more Grade 8 sorting lessons</h3><p>10 new English lessons and 10 new Science lessons add 500 questions. Practice grammar, reading analysis, reasoning, and scientific models with 9 to 25 options across 3 to 5 categories.</p></article>
      <article><time datetime="2026-10-18">October 18, 2026</time><h3>Grade 8 drag-and-drop lessons</h3><p>10 new lessons across Math, Algebra 1, English, Science, and History. Each lesson has 25 sorting questions. Start with 9 options in 3 categories and work up to 25 options in 5 categories. Drag cards, tap to sort, or use Tab and Enter.</p></article>
      <article><time datetime="2026-10-13">October 13, 2026</time><h3>More ways to keep learning</h3><p>Earn badges, follow your learning streak, and track daily goals. Download 25-question lessons for offline practice from Settings.</p><p>Text resizing, clearer keyboard focus, and screen-reader progress announcements are now available.</p></article>
      <article><time datetime="2026-10-13">October 13, 2026</time><h3>New lessons that grow with you</h3><p>10 more lessons each for Pre-K, Kindergarten, and Grade 1. Every new lesson has 25 questions in five stages, from guided practice to applying the skill.</p><ul><li>Pre-K: counting, sorting, patterns, and listening to sounds.</li><li>Kindergarten: number relationships, measurement, and early reading.</li><li>Grade 1: arithmetic strategies, reading clues, and science investigations.</li></ul></article>
      <article><time datetime="2026-10-13">October 13, 2026</time><h3>More lessons for early learners</h3><ul><li>10 new Pre-K lessons in English and Math.</li><li>10 new Kindergarten lessons in reading and number skills.</li><li>10 new Grade 1 lessons, including four new Science lessons.</li><li>Grade 1 Science now offers 10 lessons.</li></ul></article>
      <article><time datetime="2026-10-12">October 12, 2026</time><h3>Grade 8 Algebra 1 expanded</h3><p>10 new lessons bring Algebra 1 to 50 lessons, with 25 questions per lesson.</p></article>
      <article><time datetime="2026-09-10">September 10, 2026</time><h3>Grade 7 science labs</h3><p>Interactive investigations now include visual models and activities learners can operate.</p></article>
    </div>
  </aside>
  </div>
</div>

<!-- PAYWALL -->
<div id="paywall" role="dialog" aria-modal="true" aria-hidden="true" onclick="if(event.target===this)hidePaywall()">
  <div class="paycard">
    <button type="button" class="payclose" onclick="hidePaywall()" aria-label="Close paywall">x</button>
    <div class="paygrid">
      <div class="payhead">
        <img class="lm-dialog-logo" src="images/learnmaster-logo-header-v2.png" alt="LearnMaster K12">
        <h1 class="visually-hidden">LearnMaster K12 subscription</h1>
        <div class="small-note">Choose a family plan and begin learning right away.</div>
        <div class="paypill mt-2">Trial card · no real charge</div>
        <div class="paytopline">
          <span class="paypill">Family learning access</span>
          <span class="paypill" id="trialTimerPill" hidden>Trial left: <span id="trialLeft">00:00</span></span>
        </div>

        <div id="subscriptionPaywallStatus" class="subscription-paywall-status status-pending"><strong>Choose a plan</strong><span>Pick any plan and use the prefilled trial card to start.</span></div>
      </div>

      <div class="plan">
        <h3>Starter</h3>
        <div class="price">$5</div>
        <ul>
          <li>Pre-K lessons</li>
          <li>English and Math foundations</li>
          <li>Progress and reading goals</li>
        </ul>
        <button type="button" class="btn btn-main w-100" onclick="openCheckout('elf')">Choose Starter</button>
      </div>

      <div class="plan">
        <h3>Plus</h3>
        <div class="price">$12</div>
        <ul>
          <li>Pre-K + Kindergarten</li>
          <li>Reading and progress tools</li>
          <li>Family reading and progress tools</li>
        </ul>
        <button type="button" class="btn btn-main w-100" onclick="openCheckout('santa')">Choose Plus</button>
      </div>

      <div class="plan" style="border-color:rgba(239,68,68,.45);">
        <h3>Max</h3>
        <div class="price">$20</div>
        <ul>
          <li>All grades (included)</li>
          <li>All subjects included</li>
          <li>Family progress overview</li>
        </ul>
        <button type="button" class="btn btn-main w-100" onclick="openCheckout('reindeer')">Choose Max</button>
      </div>

      <div class="paynote">
        <div class="small-note mb-2">Prices preview future monthly plans. The trial card is filled in for you. No payment is processed.</div>
      </div>
    </div>
  </div>

  <!-- PLAN CONFIRMATION MODAL -->
  <div class="modal fade" id="checkoutModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" style="border-radius:18px;">
        <div class="modal-header">
          <h5 class="modal-title fw-bold" id="checkoutTitle">Start a plan</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="small-note mb-2" id="checkoutDesc">Use the trial card shown below to start learning. No payment is processed.</div>

          <div class="cardish" style="padding:14px;">
            <div class="d-flex justify-content-between align-items-center">
              <div class="fw-bold">Plan</div>
              <div class="fw-bold" id="checkoutPlanName">—</div>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-1">
              <div class="fw-bold">Monthly plan price</div>
              <div class="fw-bold" id="checkoutPrice">$0</div>
            </div>
            <div class="small-note mt-2">Pricing previews the future monthly plan. No payment is processed.</div>
          </div>

          <div class="checkout-card-form mt-3" aria-labelledby="checkoutCardHeading">
            <div class="checkout-card-heading">
              <strong id="checkoutCardHeading">Trial card details</strong>
              <span>Test only</span>
            </div>
            <label class="checkout-card-number">
              <span>Card number</span>
              <input id="checkoutCardNumber" type="text" value="4242 4242 4242 4242" readonly aria-readonly="true">
            </label>
            <div class="checkout-card-row">
              <label><span>Expiration</span><input id="checkoutExpiry" type="text" value="12/30" readonly aria-readonly="true"></label>
              <label><span>CVC</span><input id="checkoutCvc" type="text" value="123" readonly aria-readonly="true"></label>
              <label><span>ZIP</span><input id="checkoutZip" type="text" value="12345" readonly aria-readonly="true"></label>
            </div>
            <p class="checkout-test-notice">These trial details are filled in for you. They are never sent or stored. No real card is accepted.</p>
          </div>

          <div class="checkout-request-explainer mt-3">
            <strong>What happens next</strong>
            <p>Your selected plan starts when you press Start plan. No payment is processed.</p>
            <ol>
              <li>Choose the plan that fits your family.</li>
              <li>Review the trial card, then press Start plan to open your lessons.</li>
            </ol>
          </div>

          <div class="mt-2 fw-bold" id="payErr" style="color:#b91c1c;"></div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-main" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-main" id="checkoutConfirmButton" onclick="confirmPayment()">Start plan</button>
        </div>
      </div>
    </div>
  </div>
</div>
`;
    }
  }

  customElements.define("k12-auth-shell", K12AuthShell);
})();
