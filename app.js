// List of phrases for the game
const phrases = [
  "May the force be with you",
  "Just keep swimming",
  "A penny for your thoughts",
  "The show must go on",
  "Break a leg",
  "Life is like a box of chocolates",
  "Actions speak louder than words",
  "Beauty is in the eye of the beholder"
];

// Selecting DOM elements
const overlay = document.getElementById('overlay');
const startButton = document.querySelector('.btn__reset');
const phraseContainer = document.querySelector('#phrase ul');
const keyboard = document.querySelector('#qwerty');
const hearts = document.querySelectorAll('.tries img');

let missed = 0; // Counter for missed guesses

// Hide the start overlay when the start button is clicked
startButton.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// Get a random phrase from the phrases array
function getRandomPhrase() {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// Display the random phrase on the game board
function addPhraseToDisplay(phrase) {
  for (let i = 0; i < phrase.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = phrase[i];
    if (phrase[i] !== ' ') {
      listItem.classList.add('letter');
    } else {
      listItem.classList.add('space');
    }
    phraseContainer.appendChild(listItem);
  }
}

// Check if a letter is in the phrase
function checkLetter(button) {
  const letters = document.querySelectorAll('.letter');
  let match = null;
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].textContent.toLowerCase() === button.textContent) {
      letters[i].classList.add('show');
      match = button.textContent;
    }
  }
  return match;
}

// Check if the player has won
function checkWin() {
  const letters = document.querySelectorAll('.letter');
  const shownLetters = document.querySelectorAll('.show');
  if (letters.length === shownLetters.length) {
    overlay.classList.add('win');
    overlay.style.display = 'flex';
    overlay.querySelector('.title').textContent = 'Congratulations! You won!';
    startButton.textContent = 'Play Again';
  } else if (missed >= 5) {
    overlay.classList.add('lose');
    overlay.style.display = 'flex';
    overlay.querySelector('.title').textContent = 'Oops! You lost.';
    startButton.textContent = 'Try Again';
  }
}

// Event listener for the keyboard buttons
keyboard.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    button.classList.add('chosen');
    button.disabled = true;

    const letterFound = checkLetter(button);
    if (!letterFound) {
      hearts[missed].setAttribute('src', 'images/lostHeart.png');
      missed++;
    }

    checkWin();
  }
});

// Reset the game board for a new game
function resetGameBoard() {
  missed = 0;
  phraseContainer.innerHTML = '';
  const buttons = document.querySelectorAll('.keyrow button');
  buttons.forEach((button) => {
    button.classList.remove('chosen');
    button.disabled = false;
  });
  hearts.forEach((heart) => {
    heart.setAttribute('src', 'images/liveHeart.png');
  });
}

// Event listener for the start button to start a new game
startButton.addEventListener('click', () => {
  if (overlay.classList.contains('win') || overlay.classList.contains('lose')) {
    overlay.classList.remove('win', 'lose');
  }
  resetGameBoard();

  const randomPhrase = getRandomPhrase();
  addPhraseToDisplay(randomPhrase);
});