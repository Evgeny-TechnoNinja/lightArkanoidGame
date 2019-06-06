'use strict';

let game = {
    start: function() {
        this.ctx = document.getElementById('gamecanvas').getContext('2d');
        let background = new Image(); 
        background.src = 'img/background.png';
        window.requestAnimationFrame(() => {
            this.ctx.drawImage(background, 0, 0);
        });
    }  
};

window.addEventListener('load', () => {
    game.start();
});