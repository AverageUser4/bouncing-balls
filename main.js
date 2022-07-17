"use strict";

const canvas = new CanvasHandler();
const ball_handler = new BallHandler();
for(let i = 0; i < 8; i++) {
  ball_handler.createBall();
}

const the_game = new TheGame(30);