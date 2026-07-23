(function(){
  class K12AudioAssets extends HTMLElement {
    connectedCallback(){
      if(this.dataset.rendered === "true") return;
      this.dataset.rendered = "true";
      this.innerHTML = String.raw`
<div class="toast" id="toast"></div>

<!-- AUDIO -->
<audio id="correct" preload="none" data-tone="659,880" data-tone-duration="0.09"></audio>
<audio id="wrong" preload="none" data-tone="247,196" data-tone-duration="0.12"></audio>
<audio id="clickSfx" preload="none" data-tone="440" data-tone-duration="0.035"></audio>
<audio id="rewardSfx" preload="none" data-tone="523,659,784,1047" data-tone-duration="0.11"></audio>
`;
    }
  }

  customElements.define("k12-audio-assets", K12AudioAssets);
})();
