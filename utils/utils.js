export function randomLetter(ascii = 97,letterIndex) {
  const randomLetter = Math.floor(Math.random() * 26) + ascii;
  let char = String.fromCharCode(randomLetter);
  return char;
}

export const game = {
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
  changeLetter: function(letterElement) {
  const randomLetter = Math.floor(Math.random() * 26) + 97;
  let char = String.fromCharCode(randomLetter);

  letterElement.textContent = char;
},
  createIntervals: function()  {
      const passwordElement = document.getElementById('password');
      // console.log(passwordElement);
      const letterElements =
        passwordElement.getElementsByClassName('password-letter');
      // console.log(letterElements);

      // Create an array to store the intervals for each letter
      const intervals = [];

      // Start an interval for each letter element
      for (let i = 0; i < letterElements.length; i++) {
        // Use a random interval between 500ms and 2000ms (0.5s and 2s)

        const intervalDelay = Math.floor(Math.random() * 100) + 300;
        intervals.push(
          setInterval(function () {
            game.changeLetter(letterElements[i]);
            game.checkLetter(letterElements[i]);
          }, intervalDelay)
        );
      }
    },
    
    createPassword: function (length) {
    game.createIntervals()
    const password = [];
    while (length > 0) {
      password.push(game.randomLetter());
      length--;
    }
    console.log(password);
    return password;
  },
  checkLetter: function (letterIndex) {
  if (letterIndex.textContent === game.password[letterIndex.id]) {
    letterIndex.style.color = 'green';
    return;
  }
  letterIndex.style.color = 'black';
},

checkInput: function(input) {
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
    game.checkPassword()
    if (nextInputIndex > inputs.length - 1) {
      nextInputIndex = 0;
    }
    inputs[nextInputIndex].focus();
    return true ;
  }
  input.target.style.borderColor = 'red';
  currentInputColor = 'red';
  game.checkPassword()
  return false;
},

checkPassword: function() {
  const userInput = document.querySelectorAll('input');
  const passwordArr = Array.from(userInput);
  let password = [];
  passwordArr.map((item) => {
    password.push(item.value);
    return;
  }),
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
};

export const ui = {
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
        input.addEventListener('keypress', game.checkInput);
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
