"use strict";

class BallHandler {

  all_balls = [];

  createBall() {
    this.all_balls.push(new Ball());
  }

  destroyBall() {
    if(this.all_balls.length === 0)
      return;

    this.all_balls.splice(
      Math.floor(Math.random() * (this.all_balls.length + 1)), 1);
  }

  ballLogic() {
    for(let val of this.all_balls)
      val.logic();

    for(let val of this.all_balls)
      val.resolveCollisions();
  }

  drawBalls() {
    for(let val of this.all_balls)
      val.draw();
  }

}
