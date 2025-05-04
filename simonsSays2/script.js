import { greenButton, redButton, yellowButton, blueButton, start, gameButtons, reset, points } from "./selectors.js";

let pattern = [];
let player = [];
let score = 0;

let patternAmount = 4;

let randomButton;

function patternDecider() {
  return (randomButton = Math.ceil(Math.random() * patternAmount));
}

function createPattern() {
  for (let i = 0; i < patternAmount; i++) {
    patternDecider();
    pattern.push(randomButton);
    console.log(pattern);
  }
}

function playNextRound() {
  randomButton = Math.ceil(Math.random() * 4);
  pattern.push(randomButton);
  console.log(pattern);
}

function getButtonByNumber(num) {
  switch (num) {
    case 1:
      return greenButton;
    case 2:
      return redButton;
    case 3:
      return yellowButton;
    case 4:
      return blueButton;
  }
}

function lightButton() {
  pattern.forEach((num, index) => {
    setTimeout(() => {
      const button = getButtonByNumber(num);
      button.classList.add("lit");
      setTimeout(() => {
        button.classList.remove("lit");
      }, 200);
    }, index * 800);
  });

  const totalTime = pattern.length * 800;
  setTimeout(() => {
    enableButton();
  }, totalTime);
}

function registerColorButton() {
  gameButtons.forEach((number) => {
    number.addEventListener("click", () => {
      number.classList.add("lit");
      setTimeout(() => {
        number.classList.remove("lit");
      }, 200);
      switch (number) {
        case greenButton:
          player.push(1);
          break;
        case redButton:
          player.push(2);
          break;
        case yellowButton:
          player.push(3);
          break;
        case blueButton:
          player.push(4);
          break;
      }
      checkResult(player, pattern);
    });
  });
}

function checkResult(playerNumber, patternNumber) {
  for (let i = 0; i < player.length; i++) {
    if (playerNumber[i] === patternNumber[i]) {
      console.log("Correct number!");
    } else {
      alert("Wrong! Game Over!");
      resetGame();
      return;
    }

    if (JSON.stringify(player) === JSON.stringify(pattern)) {
      score++;
      points.textContent = `Points ${score}`;
      player = [];
      playNextRound();
      disableButton();
      setTimeout(() => {
        lightButton();
      }, 2000);
    }
  }
}

start.addEventListener("click", () => {
  createPattern();
  lightButton();
  start.disabled = true;
});

reset.addEventListener("click", () => {
  points.textContent = `Points 0`;
  resetGame();
});

function enableButton() {
  gameButtons.forEach((button) => {
    button.classList.add("hover-enabled");
    button.style.cursor = "pointer";
    button.disabled = false;
    reset.disabled = false;
  });
}

function disableButton() {
  gameButtons.forEach((button) => {
    button.classList.remove("hover-enabled");
    button.style.cursor = "default";
    button.disabled = true;
    reset.disabled = true;
  });
}

function resetGame() {
  player = [];
  disableButton();
  pattern = [];
  start.disabled = false;
  score = 0;
  points.textContent = `Points ${score}`;
}

registerColorButton();
disableButton();
