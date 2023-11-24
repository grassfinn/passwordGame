// 97 - 122

// Todo
// separate password element with the game password
// add the intervals
// when the letter is === to the password element set the element to the correct element and stop the interval for that letter
// clean up code
const game = {
  start: false,
  gameOver: false,
  cracked: false,
  password: 'start',
  points: 0,
  time: 5,
  // methods
  randomLetter: function (ascii = 97) {
    const randomLetter = Math.floor(Math.random() * 26) + ascii;
    let char = String.fromCharCode(randomLetter);
    return char;
  },
  createPassword: function (length) {
    function startIntervals() {
      const passwordElement = document.getElementById('password');
      console.log(passwordElement);
      const letterElements =
        passwordElement.getElementsByClassName('password-letter');
      console.log(letterElements);

      // Create an array to store the intervals for each letter
      const intervals = [];

      // Start an interval for each letter element
      for (let i = 0; i < letterElements.length; i++) {
        // Use a random interval between 500ms and 2000ms (0.5s and 2s)

        const intervalDelay = Math.floor(Math.random() * 100) + 300;
        intervals.push(
          setInterval(function () {
            changeLetter(letterElements[i]);
            checkLetter(letterElements[i]);
          }, intervalDelay)
        );
      }
    }
    const password = [];
    while (length > 0) {
      password.push(game.randomLetter());
      length--;
    }
    console.log(password);
    startIntervals();
    return password;
  },
};

const ui = {
  timerElement: document.querySelector('#timer'),
  passwordElement: document.getElementById('password'),
  passwordInputElement: document.getElementById('password-input'),
  checkPasswordButton: document.getElementById('test'),
  userInput: document.getElementById('user-input'),
  // Methods
  createElements: function () {
    const passwordElement = document.getElementById('password');
    let passwordLetters = game.password.split('');

    passwordElement.style.visibility = 'visible';
    passwordLetters.map((letter, index) => {
      const span = document.createElement('span');
      document.querySelector('#password').append(span);
      span.className = 'password-letter';
      span.id = index;
      span.textContent = letter;
    });
  },
  createInputs: function (string) {
    const arr = string.split('');
    arr.map((char, index) => {
      const input = document.createElement('input');
      input.type = 'text';
      input.id = `${index}`;
      input.className = 'password-input';
      input.maxLength = 1;
      ui.passwordInputElement.appendChild(input);
      input.value = '_';
      // addEventlistener
      const inputs = Array.from(
        document.getElementsByClassName('password-input')
      );
      inputs.forEach((input, index) => {
        input.addEventListener('keypress', checkInput);
      });
      return arr;
    });
  },
  removeInputs: function (arr) {
    arr.forEach((item) => {
      item.remove();
    });
  },
};

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

function checkLetter(letterIndex) {
  if (letterIndex.textContent === game.password[letterIndex.id]) {
    letterIndex.style.color = 'green';
    return;
  }
  letterIndex.style.color = 'black';
}

function checkInput(input) {
  const index = +input.target.id;
  let userInput = input.target;
  userInput.value = input.key;
  let nextInputIndex = index + 1;
  const inputs = document.querySelectorAll(`.password-input`);
  let currentInputColor = document.getElementById(index).style.color;
  if (userInput.value === 'enter') return;

  if (userInput.value === game.password[index]) {
    input.target.style.borderColor = 'green';
    console.log('correct');
    console.log(game.password)
    // console.log(document.getElementById(index));
    currentInputColor = 'green';
    checkPassword()
    if (nextInputIndex > inputs.length - 1) {
      nextInputIndex = 0;
    }
    inputs[nextInputIndex].focus();
    return true ;
  }
  input.target.style.borderColor = 'red';
  currentInputColor = 'red';
  checkPassword()
  return false;
}

function checkPassword() {
  const userInput = document.querySelectorAll('input');
  const passwordArr = Array.from(userInput);
  let password = [];
  passwordArr.map((item) => {
    password.push(item.value);
    return;
  });
  password = password.join('');
  if (password === game.password) {
    game.cracked = true;
    game.time += 5;
    ui.timerElement.textContent = game.time
    console.log(game.time)
    game.password = game.createPassword(7).join('');
    game.cracked = false;
    ui.removeInputs(document.querySelectorAll('.password-input'));
    ui.createInputs(game.password);
    userInput.value = '';
    // countDown();
    return;
  }
  // game.time -= 5;
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

function changeLetter(letterElement) {
  const randomLetter = Math.floor(Math.random() * 26) + 97;
  let char = String.fromCharCode(randomLetter);

  letterElement.textContent = char;
}

function handlePress(e) {
  if (e.key === 'Enter') {
    checkPassword();
    return;
  }
}

ui.createElements();
// need to add interval after creation
ui.checkPasswordButton.addEventListener('click', start);

// !when use clicks crack the password check if it it the write password
// ui.checkPasswordButton.addEventListener('click', checkPassword);
// ui.userInput.addEventListener('keypress', handlePress);
// window.onload = startIntervals;
