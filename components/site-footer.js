(function(){
  class K12SiteFooter extends HTMLElement {
    connectedCallback(){
      if(this.dataset.rendered === "true") return;
      this.dataset.rendered = "true";
      this.innerHTML = String.raw`
        <footer class="site-footer">
          <div class="site-footer-brand"><strong>LearnMaster K-12</strong><span>Practice, progress, and family learning.</span></div>
          <nav aria-label="Footer navigation">
            <button type="button" onclick="openTeksStandards()">TEKS alignment</button>
            <button type="button" onclick="openPrivacyNotice()">Children's privacy</button>
            <button type="button" onclick="openParentFromFooter()">Parent area</button>
            <a href="https://tea.texas.gov/curriculum-and-instruction/texas-essential-knowledge-and-skills-teks" target="_blank" rel="noopener">Official TEA standards</a>
          </nav>
          <small>© ${new Date().getFullYear()} LearnMaster. Independent educational software; not endorsed or approved by the Texas Education Agency.</small>
        </footer>
        <div id="privacyNotice" class="privacy-overlay" role="dialog" aria-modal="true" aria-labelledby="privacyTitle" style="display:none">
          <div class="privacy-card">
            <button class="privacy-close" type="button" aria-label="Close privacy notice" onclick="closePrivacyNotice()">×</button>
            <span class="standards-eyebrow">Parent notice</span><h2 id="privacyTitle">Children's privacy</h2>
            <p>LearnMaster stores learner names, lesson progress, answers, rewards, and family account information so the learning service works. A parent controls child profiles and can request access or deletion.</p>
            <p>We do not use a child's learning activity for targeted advertising. Parents should not enter sensitive information in learner names or answers.</p>
            <label class="consent-check"><input id="parentConsentCheck" type="checkbox"> I am the parent or guardian and consent to creating and managing child learning profiles.</label>
            <div class="privacy-actions"><button type="button" class="btn btn-main" onclick="recordParentConsent()">Save parent consent</button><button type="button" class="btn btn-main" onclick="closePrivacyNotice()">Close</button></div>
            <p class="small-note" id="privacyConsentStatus">Consent is recorded on the signed-in parent account.</p>
          </div>
        </div>`;
    }
  }
  customElements.define("k12-site-footer", K12SiteFooter);
})();
