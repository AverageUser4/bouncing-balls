"use strict";

class TheGame {

  #fps;

  constructor(fps) {
    this.#fps = 1000 / fps;
    this.startGame();
    window.addEventListener('keydown', (event) => this.keyDown(event));
  }

  keyDown(event) {
    switch(event.key) {
      case 'ArrowUp':
        ball_handler.createBall();
        break;

      case 'ArrowDown':
        ball_handler.destroyBall();
        break;
      
      case 'p':
        if(typeof this.interval !== 'undefined')
          this.stopGame();
        else
          this.startGame();
        break;
    }
  }

  startGame() {
    this.interval = setInterval(() => this.gameLoop(), this.#fps);
  }

  stopGame() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  gameLoop() {
    ball_handler.ballLogic();
    canvas.clearScreen();
    ball_handler.drawBalls();
  }

}