'use strict';

var game = {
  ctx: null,
  ball: null,
  platform: null,
  blocks: [],
  rows: 4,
  cols: 8,
  sprites: {
    background: null,
    ball: null,
    platform: null,
    block: null
  },
  init: function init() {
    this.ctx = document.getElementById('gamecanvas').getContext('2d');
  },
  preload: function preload(callback) {
    var loaded = 0;
    var required = Object.keys(this.sprites).length;

    var onImageLoad = function onImageLoad() {
      ++loaded;

      if (loaded >= required) {
        callback();
      }
    };

    for (var key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = 'img/' + key + '.png';
      this.sprites[key].addEventListener('load', onImageLoad);
    }
  },
  create: function create() {
    for (var row = 0; row < this.rows; row++) {
      for (var col = 0; col < this.cols; col++) {
        this.blocks.push({
          x: 64 * col + 65,
          y: 24 * row + 35
        });
      }
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
    this.renderBlocks();
  },
  renderBlocks: function renderBlocks() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.blocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var block = _step.value;
        this.ctx.drawImage(this.sprites.block, block.x, block.y);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },
  start: function start() {
    var _this2 = this;

    this.init();
    this.preload(function () {
      _this2.create();

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