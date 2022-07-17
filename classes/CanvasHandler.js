"use strict";

class CanvasHandler {

  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.#adjustSize(false);

    window.addEventListener('resize', () => this.#adjustSize(true))
  }

  #adjustSize(resize) {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    if(resize) {
      this.clearScreen();
      ball_handler.drawBalls();
    }
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

}