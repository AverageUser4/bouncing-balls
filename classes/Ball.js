"use strict";

class Ball {

  #color;
  x;
  y;
  dir_x;
  dir_y;
  #speed;
  radius;
  #trail_arr = [];

  constructor() {
    this.radius = this.random(10, 30);

    this.dir_x = this.random(0, 1) ? 1 : -1;
    this.dir_y = this.random(0, 1) ? 1 : -1;

    this.x = this.random(0 + this.radius, canvas.width - this.radius);
    this.y = this.random(0 + this.radius, canvas.height - this.radius);

    this.#speed = this.random(5, 10);

    this.changeColor();
  }

  changeColor() {
    this.#color = 
      `rgb(${this.random(0, 255)},${this.random(0, 255)},${this.random(0, 255)})`;
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  logic() {
    this.x += this.#speed * this.dir_x;
    this.y += this.#speed * this.dir_y;

    if(this.x - this.radius < 0) {
      this.x = 0 + this.radius;
      this.dir_x *= -1;
    }
    else if(this.x + this.radius > canvas.width) {
      this.x = canvas.width - this.radius;
      this.dir_x *= -1;
    }

    if(this.y - this.radius < 0) {
      this.y = 0 + this.radius;
      this.dir_y *= -1;
    }
    else if(this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
      this.dir_y *= -1;
    }

    this.#trail_arr.push({ x: this.x, y: this.y });
    if(this.#trail_arr.length > 10)
      this.#trail_arr.splice(0, 1);
  }

  resolveCollisions() {
    for(let val of ball_handler.all_balls) {
      if(this === val)
        continue;

      let distance_x = this.x - val.x;
      let distance_y = this.y - val.y;
      let distance = Math.sqrt(Math.pow(distance_x, 2) + Math.pow(distance_y, 2));

      if(distance > this.radius + val.radius)
        continue;

      this.dir_x *= -1;
      this.dir_y *= -1;
      val.dir_x *= -1;
      val.dir_x *= -1;

      this.x += distance_x / 2;
      this.y += distance_y / 2;
      val.x += distance_x / 2;
      val.y += distance_y / 2;
    }
  }

  draw() {
    canvas.ctx.fillStyle = this.#color;
    canvas.ctx.globalAlpha = 0.1;

    for(let i = 0; i < this.#trail_arr.length - 1; i++) {
      canvas.ctx.beginPath();
      canvas.ctx.arc(this.#trail_arr[i].x, this.#trail_arr[i].y, this.radius, 0, 2 * Math.PI);
      canvas.ctx.fill();
      canvas.ctx.globalAlpha += 0.04;
    }

    canvas.ctx.globalAlpha = 1;

    canvas.ctx.beginPath();
    canvas.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    canvas.ctx.fill();
  }

}
