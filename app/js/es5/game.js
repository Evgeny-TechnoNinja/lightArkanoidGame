'use strict';

var game = {
  start: function start() {
    var _this = this;

    this.ctx = document.getElementById('gamecanvas').getContext('2d');
    var background = new Image();
    background.src = 'img/background.png';
    window.requestAnimationFrame(function () {
      _this.ctx.drawImage(background, 0, 0);
    });
  }
};
window.addEventListener('load', function () {
  game.start();
});