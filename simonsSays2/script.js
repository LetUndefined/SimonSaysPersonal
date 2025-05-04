import { greenButton, redButton, yellowButton, blueButton, start, nextRound, gameButtons, reset, points } from "./selectors.js";

let pattern = [];
let player = [];
let score = 0;

let patternAmount = 4;

let randomButton;

function patternDecider() {
  return (randomButton = Math.ceil(Math.random() * 4)); /*Belangrijk dat dit vier is, want dit is het totaal aantal knoppen*/
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
      console.log(player);
    });
  });
}

function checkResult(player, pattern) {
  console.log(player, pattern);
  if (JSON.stringify(player) === JSON.stringify(pattern)) {
    score++;
    points.textContent = `Points ${score}`;
    return true;
  } else {
    alert("Dat was fout, Game over!");
    resetGame();
    return false;
  }
}

start.addEventListener("click", () => {
  createPattern();
  lightButton();
  start.disabled = true;
});

nextRound.addEventListener("click", () => {
  if (checkResult(player, pattern)) {
    playNextRound();
    disableButton();
    setTimeout(() => {
      lightButton();
    }, 2000);
    player = [];
  } else {
    disableButton();
    return;
  }
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
    nextRound.disabled = false;
    reset.disabled = false;
  });
}

function disableButton() {
  nextRound.disabled = true;
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
}

registerColorButton();
disableButton();
