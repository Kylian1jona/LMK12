(function(){
  class K12AudioAssets extends HTMLElement {
    connectedCallback(){
      if(this.dataset.rendered === "true") return;
      this.dataset.rendered = "true";
      this.innerHTML = String.raw`
<div class="toast" id="toast"></div>

<!-- AUDIO -->
<audio id="correct" preload="auto">
  <source src="https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3" type="audio/mpeg">
</audio>
<audio id="wrong" preload="auto">
  <source src="https://assets.mixkit.co/sfx/preview/mixkit-failure-arcade-alert-notification-240.mp3" type="audio/mpeg">
</audio>
<audio id="clickSfx" preload="auto">
  <source src="https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3" type="audio/mpeg">
</audio>
<audio id="rewardSfx" preload="auto">
  <source src="https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3" type="audio/mpeg">
</audio>
`;
    }
  }

  customElements.define("k12-audio-assets", K12AudioAssets);
})();
