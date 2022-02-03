/** @format */

import { INITIAL_VELOCITY, VELOCITY_INCREASE } from "./config.js";

class Ball {
  _BallElement = document.querySelector(".ball");
  _direction = {};
  _velocity = INITIAL_VELOCITY;

  constructor() {
    this.reset();
  }

  get x() {
    return parseFloat(
      getComputedStyle(this._BallElement).getPropertyValue("--x")
    );
  }

  set x(value) {
    this._BallElement.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(
      getComputedStyle(this._BallElement).getPropertyValue("--y")
    );
  }

  set y(value) {
    this._BallElement.style.setProperty("--y", value);
  }

  rect() {
    return this._BallElement.getBoundingClientRect();
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this._direction = { x: 0 };
    while (
      Math.abs(this._direction.x) <= 0.2 ||
      Math.abs(this._direction.x) >= 0.9
    ) {
      const heading = this._randomNumberBetween(0, 2 * Math.PI);
      this._direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this._velocity = INITIAL_VELOCITY;
  }

  update(delta, paddleRects) {
    this.x += this._direction.x * this._velocity * delta;
    this.y += this._direction.y * this._velocity * delta;
    this._velocity += VELOCITY_INCREASE * delta;
    const rect = this.rect();

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this._direction.y *= -1;
    }

    if (paddleRects.some((r) => this._isCollision(r, rect))) {
      this._direction.x *= -1;
    }
  }

  _randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  _isCollision(rect1, rect2) {
    return (
      rect1.left <= rect2.right &&
      rect1.right >= rect2.left &&
      rect1.top <= rect2.bottom &&
      rect1.bottom >= rect2.top
    );
  }
}

export default new Ball();
