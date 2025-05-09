import { greenButton, redButton, yellowButton, blueButton, reset, startButtonModal, modal, gameButtons, points } from "./selectors.js";

let pattern = [];
let player = [];
let score = 0;

let patternAmount = 4;

let randomButton;

// generates 4 random numbers
function patternDecider() {
  return (randomButton = Math.ceil(Math.random() * patternAmount));
}

// Pushes 4 numbers into an Array
function createPattern() {
  for (let i = 0; i < patternAmount; i++) {
    patternDecider();
    pattern.push(randomButton);
    console.log(pattern);
  }
}

//returns the button that is corresponding to the number from the pattern, will be used to flash the colors on the game
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

// function to light the colors from the game. adds classlist to flash the button. previous function is used to find the correct
// colored button to flash
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

  // buttons were instantly enabled after the buttons flashed, created a delay for the button enabling
  const totalTime = pattern.length * 800;
  setTimeout(() => {
    enableButton();
  }, totalTime);
}

//function to track each button press on the game from the player. After each press a corresponding number is pushed into
// the array and instantly checked to the pattern array.
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

//Functionality to start the next round, creates an additional number and pushes to pattern array
function playNextRound() {
  randomButton = Math.ceil(Math.random() * 4);
  pattern.push(randomButton);
  console.log(pattern);
}

//checking result from the player input against the pattern creation
function checkResult(playerNumber, patternNumber) {
  for (let i = 0; i < player.length; i++) {
    if (playerNumber[i] !== patternNumber[i]) {
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

startButtonModal.addEventListener("click", () => {
  modal.style.display = "none";
  createPattern();
  setTimeout(() => {
    lightButton();
  }, 1000);
});

reset.addEventListener("click", () => {
  resetGame();
});

function enableButton() {
  gameButtons.forEach((button) => {
    button.classList.add("hover-enabled");
    button.disabled = false;
    reset.disabled = false;
  });
}

function disableButton() {
  gameButtons.forEach((button) => {
    button.classList.remove("hover-enabled");
    button.disabled = true;
    reset.disabled = true;
  });
}

function resetGame() {
  modal.style.display = "flex";
  player = [];
  disableButton();
  pattern = [];
  score = 0;
  points.textContent = `Points ${score}`;
}

registerColorButton();
disableButton();
