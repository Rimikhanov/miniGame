const player = document.querySelector(".player");
const gameArea = document.querySelector(".game-area");
const gameOverText = document.querySelector("#gameOver");
const restartButton = document.querySelector("#restartButton");
let counter = document.getElementById("counter");
let gameStatus = document.querySelector(".gameStatus");
const clearButton = document.querySelector(".clear");
let highscore = document.querySelector(".highscore");
let timerCount = 0;

let higherScore = 0;
counter.textContent = `${timerCount}`;
let timerInterval;
let gameActive = true;
const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  ц: false,
  ф: false,
  ы: false,
  в: false,
};
gameOverText.classList.remove("gameOverClass");
const step = 5;

document.addEventListener("keydown", function (e) {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = true;
  }
});

document.addEventListener("keyup", function (e) {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = false;
  }
});

function movePlayer() {
  let top = player.offsetTop;
  let left = player.offsetLeft;

  // Проверка текущих состояний клавиш
  if (keys.w || keys.ц) top -= step; // движение вверх
  if (keys.a || keys.ф) left -= step; // движение влево
  if (keys.s || keys.ы) top += step; // движение вниз
  if (keys.d || keys.в) left += step; // движение вправо


  // Проверка границ игрового поля
  if (left <= 10) {
    left = 10;
  } else if (left >= 500) {
    left = 500;
  }
  if (top <= 10) {
    top = 10;
  } else if (top >= 400) {
    top = 400;
  }

  player.style.top = `${top}px`;
  player.style.left = `${left}px`;

  requestAnimationFrame(movePlayer);
}

requestAnimationFrame(movePlayer);

function createEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  const side = ["top", "bottom", "left", "right"][
    Math.floor(Math.random() * 4)
  ];

  let top, left;
  if (side === "top") {
    top = 0;
    left = Math.random() * gameArea.offsetWidth;
  }
  if (side === "bottom") {
    top = gameArea.offsetHeight;
    left = Math.random() * gameArea.offsetWidth;
  }
  if (side === "left") {
    top = Math.random() * gameArea.offsetHeight;
    left = 0;
  }
  if (side === "right") {
    top = Math.random() * gameArea.offsetHeight;
    left = gameArea.offsetWidth;
  }
  enemy.style.top = `${top}px`;
  enemy.style.left = `${left}px`;
  gameArea.appendChild(enemy);

  requestAnimationFrame(() => moveEnemy(enemy, { top, left }));
}

function moveEnemy(enemy, position) {
  const targetX = gameArea.offsetWidth / 2 - player.offsetWidth / 2;
  const targetY = gameArea.offsetHeight / 2 - player.offsetHeight / 2;

  const angle = Math.atan2(targetY + position.top, targetX - position.left);
  const speed = 5;

  position.left += Math.cos(angle) * speed;
  position.top += Math.sin(angle) * speed;

  enemy.style.left = `${position.left}px`;
  enemy.style.top = `${position.top}px`;

  if (
    position.left >= 0 &&
    position.left <= gameArea.offsetWidth &&
    position.top >= 0 &&
    position.top <= gameArea.offsetHeight
  ) {
    requestAnimationFrame(() => moveEnemy(enemy, position));
  } else {
    enemy.remove();
  }
  const intervalId = setInterval(function () {
    const enemyLeft = parseFloat(enemy.style.left);
    const enemyTop = parseFloat(enemy.style.top);
    const playerLeft = parseFloat(player.style.left);
    const playerTop = parseFloat(player.style.top);

    if (
      Math.abs(enemyLeft - playerLeft) < 20 &&
      Math.abs(enemyTop - playerTop) < 20
    ) {
      gameOverText.classList.add("gameOverClass");
      gameOverText.classList.remove("opacity");
      restartButton.classList.remove("opacity");

      clearInterval(intervalId);
      enemySpawn.remove;
      gameActive = false;
    }
  }, 100);
}

const enemySpawn = setInterval(function () {
  if (gameActive) {
    createEnemy();
  }
}, 200);

restartButton.addEventListener("click", function (e) {
  gameOverText.classList.remove("gameOverClass");
  gameOverText.classList.add("opacity");
  restartButton.classList.add("opacity");
  createEnemy();
  timerCount = 0;
  gameActive = true;
});
// if(gameActive == true){
// timerInterval = setInterval(function(){
//   timerCount += 1;
//   counter.textContent = `${timerCount}`;
// }, 1000);
// }
// if(gameActive == false){
//   counter = 0
// }
// // function stopTimer (){
//   clearInterval(timerInterval)
// }

// if (gameActive == true){
//   startTimer()
// }
// if (gameActive == false) {
//   clearInterval(timerInterval)
// }

// setInterval(function(){
//   gameStatus.textContent = gameActive
// }, 500)
// clearButton.addEventListener('click', function(){
//   clearInterval(timerInterval)
// })

setInterval(function () {
  if (gameActive) {
    timerCount += 1;
    counter.textContent = `${timerCount}`;
  }
  if (timerCount > higherScore) {
    higherScore = timerCount;
  }
  highscore.textContent = `the highest score - ${higherScore}`;

}, 1000);
