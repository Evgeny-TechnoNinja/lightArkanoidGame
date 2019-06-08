'use strict';

let game = {
    ctx: null,
    sprites: {
        background: null,
        ball: null,
        platform: null
    },
    init: function() {
         this.ctx = document.getElementById('gamecanvas').getContext('2d');
    },
    preload() {
        let loaded = 0;
        let required = Object.keys(this.sprites).length;
        for (let key in this.sprites) {
            this.sprites[key] = new Image();
            this.sprites[key].src = 'img/' + key + '.png';
            this.sprites[key].addEventListener('load', () => {
                ++loaded;
                if (loaded >= required) {
                    this.run();
                }
            });
        }
    },
    run() {
        window.requestAnimationFrame(() => {
            this.render();
        });
    },
    render() {
        this.ctx.drawImage(this.sprites.background, 0, 0);
        this.ctx.drawImage(this.sprites.ball, 0, 0);
        this.ctx.drawImage(this.sprites.platform, 0, 0);
    },
    start: function() {
       this.init();
       this.preload();
    }  
};

window.addEventListener('load', () => {
    game.start();
});