(function(){
  class K12AuthShell extends HTMLElement {
    connectedCallback(){
      if(this.dataset.rendered === "true") return;
      this.dataset.rendered = "true";
      this.innerHTML = String.raw`
<!-- LOGIN (always required on load) -->
<div id="loginWall" role="dialog" aria-modal="true" aria-hidden="false">
  <div class="logincard">
    <h1>LearnMaster K-12</h1>
    <p>Simple learning games for every grade.</p>

    <div id="loginMsg" class="loginmsg"></div>

    <div id="loginFormPanel">
      <div class="mt-2">
        <label class="fw-bold">Username or Gmail</label>
        <input id="loginUser" type="text" class="form-control rounded-xl" autocomplete="username" placeholder="your_username or you@gmail.com">
      </div>

      <div class="mt-2">
        <label class="fw-bold">Password</label>
        <input id="loginPass" type="password" class="form-control rounded-xl" autocomplete="current-password" placeholder="••••••">
      </div>

      <div class="d-flex gap-2 flex-wrap mt-3">
        <button type="button" class="btn btn-main px-4" onclick="doLogin()">Log in</button>
        <button type="button" class="btn btn-main px-4" onclick="showSignup()">Sign up</button>
      </div>
      <button type="button" class="btn btn-link px-0 mt-2" onclick="resetLoginPassword()">Forgot password?</button>
    </div>

    <div id="signupFormPanel" class="d-none">
      <div class="mt-2">
        <label class="fw-bold">Gmail / Email</label>
        <input id="signupUser" type="email" class="form-control rounded-xl" autocomplete="email" placeholder="you@gmail.com">
      </div>

      <div class="mt-2">
        <label class="fw-bold">Username</label>
        <input id="signupName" class="form-control rounded-xl" autocomplete="username" placeholder="letters, numbers, or underscore">
      </div>

      <div class="mt-2">
        <label class="fw-bold">Password</label>
        <input id="signupPass" type="password" class="form-control rounded-xl" autocomplete="new-password" placeholder="6 or more characters">
      </div>

      <div class="d-flex gap-2 flex-wrap mt-3">
        <button type="button" class="btn btn-main px-4" onclick="createSignupUser()">Create account</button>
        <button type="button" class="btn btn-main px-4" onclick="showLoginForm()">Back to login</button>
      </div>
    </div>

    <div class="small-note mt-2">
      Accounts are securely authenticated by Supabase.
    </div>
  </div>
</div>

<!-- PROFILE CHOOSER (shown after account login) -->
<div id="profileChooser" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="profileChooserTitle">
  <div class="profile-chooser-card">
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
        <h1 style="font-family:'Baloo 2',cursive;font-weight:800;margin:0;">LearnMaster K-12</h1>
        <div class="small-note">Choose a plan (or start a 5-minute trial) to use the website.</div>
        <div class="paypill mt-2">🎁 New accounts include one month free</div>
        <div class="paytopline">
          <span class="paypill">🔒 Locked until plan</span>
          <span class="paypill" id="trialTimerPill">⏳ Trial left: <span id="trialLeft">05:00</span></span>
        </div>
      </div>

      <div class="plan">
        <h3>Starter</h3>
        <div class="price">$5</div>
        <ul>
          <li>Pre-K lessons</li>
          <li>Earn ⭐ and convert to <span class="learner-icon" role="img" aria-label="Learner"></span></li>
          <li>Shop locked</li>
        </ul>
        <button type="button" class="btn btn-main w-100" onclick="openCheckout('elf')">Choose Starter</button>
      </div>

      <div class="plan">
        <h3>Plus</h3>
        <div class="price">$12</div>
        <ul>
          <li>Pre-K + Kindergarten</li>
          <li>Shop unlocked</li>
          <li>Rewards + toys</li>
        </ul>
        <button type="button" class="btn btn-main w-100" onclick="openCheckout('santa')">Choose Plus</button>
      </div>

      <div class="plan" style="border-color:rgba(239,68,68,.45);">
        <h3>Max</h3>
        <div class="price">$20</div>
        <ul>
          <li>All grades (included)</li>
          <li>Shop unlocked</li>
          <li>All subjects included</li>
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
