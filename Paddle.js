/** @format */

import { SPEED } from "./config.js";

export default class Paddle {
  constructor(paddleELem) {
    this.paddleElem = paddleELem;
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    );
  }

  set position(value) {
    this.paddleElem.style.setProperty("--position", value);
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  addHandler(handler) {
    document.addEventListener("mousemove", (e) => {
      const position = (e.y / window.innerHeight) * 100;
      handler(position);
    });
  }

  update(delta, ballHeight) {
    this.position += SPEED * delta * (ballHeight - this.position);
  }

  reset() {
    this.position = 50;
  }
}
