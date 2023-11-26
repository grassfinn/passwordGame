import {game, ui } from "./utils/utils.js";
// 97 - 122

// Todo
// separate password element with the game password
// add the intervals
// when the letter is === to the password element set the element to the correct element and stop the interval for that letter
// clean up code


ui.createInputs(game.password);

ui.timerElement.textContent = game.time;
ui.passwordElement.addEventListener(
  'pointerover',
  () => (ui.passwordElement.style.color = 'green')
);
ui.passwordElement.addEventListener(
  'pointerout',
  () => (ui.passwordElement.style.color = 'black')
);
ui.passwordElement.addEventListener('click', start);
// startIntervals();

// start
function start() {
  if (game.start) {
    console.log('Cant Do Dat!');
    return;
  }
  if (!game.start) {
    game.start = true;
    update(game);
    return;
  }
}

// update
function update(gameObj) {
  // ! Need logic in a timeout then call update
  // ? https://stackoverflow.com/questions/22154129/how-to-make-setinterval-behave-more-in-sync-or-how-to-use-settimeout-instea
  const timeOut = setTimeout(function () {
    // check if time is <= to zero to stop game
    // start === true create interval then turn start off
    if (!game.start) {
      !game.start;
    }
    // game over false
    if (gameObj.time === 0) {
      gameObj.start = false;
      ui.timerElement.textContent = 'Game Over!';
      clearTimeout(timeOut);
    }

    // check if gameOver is true
    if (gameObj.gameOver) {
      const intervals = startIntervals();
      console.log('Game Over');
      clearInterval(intervals);
      clearTimeout(timeOut);
      return 'Game Over';
    }
    // have letters change as well as light green if it is correct letter
    // call update to create a loop
    countDown();
    update(game);
  }, 1000);
}



function countDown() {
  if (typeof game.time === 'number' && game.time > 0) {
    game.time--;
    ui.timerElement.textContent = game.time;
    return game.time;
  }
  clearInterval();
}

// setInterval(countDown, 1000);

ui.createElements();
// need to add interval after creation
ui.checkPasswordButton.addEventListener('click', start);

// !when use clicks crack the password check if it it the write password
// ui.checkPasswordButton.addEventListener('click', checkPassword);
// ui.userInput.addEventListener('keypress', handlePress);
// window.onload = startIntervals;
