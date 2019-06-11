'use strict';

var game = {
  ctx: null,
  ball: null,
  platform: null,
  sprites: {
    background: null,
    ball: null,
    platform: null
  },
  init: function init() {
    this.ctx = document.getElementById('gamecanvas').getContext('2d');
  },
  preload: function preload(callback) {
    var loaded = 0;
    var required = Object.keys(this.sprites).length;

    for (var key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = 'img/' + key + '.png';
      this.sprites[key].addEventListener('load', function () {
        ++loaded;

        if (loaded >= required) {
          callback();
        }
      });
    }
  },
  run: function run() {
    var _this = this;

    window.requestAnimationFrame(function () {
      _this.render();
    });
  },
  render: function render() {
    this.ctx.drawImage(this.sprites.background, 0, 0);
    this.ctx.drawImage(this.sprites.ball, 0, 0, this.ball.width, this.ball.height, this.ball.x, this.ball.y, this.ball.width, this.ball.height);
    this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
  },
  start: function start() {
    var _this2 = this;

    this.init();
    this.preload(function () {
      _this2.run();
    });
  }
};
game.ball = {
  x: 320,
  y: 280,
  width: 20,
  height: 20
};
game.platform = {
  x: 280,
  y: 300
};
window.addEventListener('load', function () {
  game.start();
});