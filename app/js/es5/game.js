'use strict';

var game = {
  ctx: null,
  sprites: {
    background: null,
    ball: null,
    platform: null
  },
  init: function init() {
    this.ctx = document.getElementById('gamecanvas').getContext('2d');
  },
  preload: function preload() {
    var _this = this;

    var loaded = 0;
    var required = Object.keys(this.sprites).length;

    for (var key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = 'img/' + key + '.png';
      this.sprites[key].addEventListener('load', function () {
        ++loaded;

        if (loaded >= required) {
          _this.run();
        }
      });
    }
  },
  run: function run() {
    var _this2 = this;

    window.requestAnimationFrame(function () {
      _this2.render();
    });
  },
  render: function render() {
    this.ctx.drawImage(this.sprites.background, 0, 0);
    this.ctx.drawImage(this.sprites.ball, 0, 0);
    this.ctx.drawImage(this.sprites.platform, 0, 0);
  },
  start: function start() {
    this.init();
    this.preload();
  }
};
window.addEventListener('load', function () {
  game.start();
});