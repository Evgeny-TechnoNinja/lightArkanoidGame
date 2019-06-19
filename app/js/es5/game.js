'use strict';

var KEYS = {
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32
};
var game = {
  ctx: null,
  ball: null,
  platform: null,
  blocks: [],
  rows: 4,
  cols: 8,
  width: 640,
  height: 360,
  sprites: {
    background: null,
    ball: null,
    platform: null,
    block: null
  },
  init: function init() {
    this.ctx = document.getElementById('gamecanvas').getContext('2d');
    this.setEvents();
  },
  setEvents: function setEvents() {
    var _this = this;

    window.addEventListener('keydown', function (e) {
      if (e.keyCode === KEYS.SPACE) {
        _this.platform.fire();
      } else if (e.keyCode === KEYS.LEFT || e.keyCode === KEYS.RIGHT) {
        _this.platform.start(e.keyCode);
      }
    });
    window.addEventListener('keyup', function (e) {
      _this.platform.stop();
    });
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
  update: function update() {
    this.platform.move();
    this.ball.move();
  },
  run: function run() {
    var _this2 = this;

    window.requestAnimationFrame(function () {
      _this2.update();

      _this2.render();

      _this2.run();
    });
  },
  render: function render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
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
    var _this3 = this;

    this.init();
    this.preload(function () {
      _this3.create();

      _this3.run();
    });
  },
  random: function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};
game.ball = {
  dx: 0,
  dy: 0,
  velocity: 3,
  x: 320,
  y: 280,
  width: 20,
  height: 20,
  start: function start() {
    this.dy = -this.velocity;
    this.dx = game.random(-this.velocity, this.velocity);
  },
  move: function move() {
    if (this.dy) {
      this.y += this.dy;
    }

    if (this.dx) {
      this.x += this.dx;
    }
  }
};
game.platform = {
  velocity: 6,
  dx: 0,
  x: 280,
  y: 300,
  ball: game.ball,
  fire: function fire() {
    this.ball.start();
    this.ball = null;
  },
  start: function start(direction) {
    if (direction === KEYS.LEFT) {
      this.dx = -this.velocity;
    } else if (direction === KEYS.RIGHT) {
      this.dx = this.velocity;
    }
  },
  stop: function stop() {
    this.dx = 0;
  },
  move: function move() {
    if (this.dx) {
      this.x += this.dx;

      if (this.ball) {
        this.ball.x += this.dx;
      }
    }
  }
};
window.addEventListener('load', function () {
  game.start();
});