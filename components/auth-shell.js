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
        <p>Structured practice, clear feedback, and rewards for learners from Pre-K through Grade 10.</p>
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
        </div>
        <button type="button" class="btn btn-link auth-forgot" onclick="resetLoginPassword()">Forgot password?</button>
      </div>

      <div id="signupFormPanel" class="d-none" aria-hidden="true">
        <header class="auth-form-header">
          <span class="auth-eyebrow">New family account</span>
          <h2>Create your account</h2>
          <p>Add the account holder's name, an email you can access, and a unique username.</p>
        </header>

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

        <div class="auth-actions">
          <button type="button" class="btn btn-main auth-primary" onclick="createSignupUser()">Create account</button>
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
  <div class="profile-chooser-card">
    <img class="lm-dialog-logo" src="images/learnmaster-logo-header-v2.png" alt="LearnMaster K12">
    <span class="profile-chooser-kicker">Your subscription</span>
    <h2 id="profileChooserTitle">Who is learning today?</h2>
    <p>Choose a learner, or enter the parent area.</p>
    <div id="profileChooserGrid" class="profile-chooser-grid"></div>
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
        <div class="small-note">Simple family plans with clear grade and subject access.</div>
        <div class="paypill mt-2">New families include one month free</div>
        <div class="paytopline">
          <span class="paypill">Family learning access</span>
          <span class="paypill" id="trialTimerPill">Trial left: <span id="trialLeft">05:00</span></span>
        </div>
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
          <li>Rewards Shop access</li>
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
        <div class="small-note mb-2">No Stripe here (demo storage on this device only).</div>
        <button type="button" class="btn btn-main fw-bold" onclick="startTrial()">Start 5-Minute Trial</button>
      </div>
    </div>
  </div>

  <!-- CHECKOUT MODAL -->
  <div class="modal fade" id="checkoutModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" style="border-radius:18px;">
        <div class="modal-header">
          <h5 class="modal-title fw-bold" id="checkoutTitle">Checkout</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="small-note mb-2" id="checkoutDesc">Complete payment to activate your plan.</div>

          <div class="cardish" style="padding:14px;">
            <div class="d-flex justify-content-between align-items-center">
              <div class="fw-bold">Plan</div>
              <div class="fw-bold" id="checkoutPlanName">—</div>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-1">
              <div class="fw-bold">Price</div>
              <div class="fw-bold" id="checkoutPrice">$0</div>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-1">
              <div class="fw-bold">Discount</div>
              <div class="fw-bold" id="checkoutDiscount">$0</div>
            </div>
            <hr class="my-2">
            <div class="d-flex justify-content-between align-items-center">
              <div class="fw-bold">Total</div>
              <div class="fw-bold" style="font-size:22px;color:var(--red)" id="checkoutTotal">$0</div>
            </div>
            <div class="small-note mt-1" id="checkoutPromoMsg"></div>
          </div>

          <div class="mt-3">
            <label class="fw-bold">Discount / Promo Code (optional)</label>
            <div class="d-flex gap-2">
              <input id="promoInput" class="form-control rounded-xl" placeholder="ex: SAVE20">
              <button type="button" class="btn btn-main" onclick="applyPromo()">Apply</button>
            </div>
          </div>

          <div class="mt-3">
            <label class="fw-bold">Card Number</label>
            <input id="cardNumber" class="form-control rounded-xl" inputmode="numeric" placeholder="4242 4242 4242 4242">
          </div>

          <div class="row g-2 mt-1">
            <div class="col-6">
              <label class="fw-bold">Expiry</label>
              <input id="cardExpiry" class="form-control rounded-xl" placeholder="MM/YY">
            </div>
            <div class="col-6">
              <label class="fw-bold">CVC</label>
              <input id="cardCVC" class="form-control rounded-xl" inputmode="numeric" placeholder="123">
            </div>
          </div>

          <div class="mt-3">
            <label class="fw-bold">Billing ZIP</label>
            <input id="cardZip" class="form-control rounded-xl" inputmode="numeric" placeholder="77001">
          </div>

          <div class="small-note mt-2">
            Demo checkout (stores plan on this device). No real payments.
          </div>

          <div class="mt-2 fw-bold" id="payErr" style="color:#b91c1c;"></div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-main" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-main" onclick="confirmPayment()">Pay & Activate</button>
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
