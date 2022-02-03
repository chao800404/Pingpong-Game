/** @format */

import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

let lastTime;
const playerPaddle = new Paddle(document.querySelector(".paddle__left"));
const autoPaddle = new Paddle(document.querySelector(".paddle__right"));
const playerScoreElem = document.querySelector(".score__player");
const autoScoreElem = document.querySelector(".score__computer");

function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;

    //Update code
    Ball.update(delta, [playerPaddle.rect(), autoPaddle.rect()]);
    autoPaddle.update(delta, Ball.y);

    if (isLose()) handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = Ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = Ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    autoScoreElem.textContent = parseInt(autoScoreElem.textContent) + 1;
  }
  Ball.reset();
  autoPaddle.reset();
}

function controlPaddle(position) {
  playerPaddle.position = position;
}
function init() {
  playerPaddle.addHandler(controlPaddle);
  window.requestAnimationFrame(update);
}
init();
