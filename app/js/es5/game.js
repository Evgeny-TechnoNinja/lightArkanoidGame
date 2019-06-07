'use strict';

var game = {
  ctx: null,
  background: null,
  ball: null,
  init: function init() {
    this.ctx = document.getElementById('gamecanvas').getContext('2d');
  },
  preload: function preload() {
    this.background = new Image();
    this.background.src = 'img/background.png';
    this.ball = new Image();
    this.ball.src = 'img/ball.png';
  },
  run: function run() {
    var _this = this;

    window.requestAnimationFrame(function () {
      _this.render();
    });
  },
  render: function render() {
    this.ctx.drawImage(this.background, 0, 0);
    this.ctx.drawImage(this.ball, 0, 0);
  },
  start: function start() {
    this.init();
    this.preload();
    this.run();
  }
};
window.addEventListener('load', function () {
  game.start();
});