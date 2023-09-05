// List of phrases for the game
const phrases = [
  "May the force be with you",
  "Just keep swimming",
  "A penny for your thoughts",
  "The show must go on",
  "Break a leg",
  "Life is like a box of chocolates",
  "Actions speak louder than words",
  "Beauty is in the eye of the beholder",
  "You have to realistic about these things",
  "You can never have too many knives"
];

// Selecting DOM elements
const overlay = document.getElementById('overlay'); // Get the game overlay element.
const startButton = document.querySelector('.btn__reset'); // Get the start button element.
const phraseContainer = document.querySelector('#phrase ul'); // Get the phrase container element.
const keyboard = document.querySelector('#qwerty'); // Get the on-screen keyboard element.
const hearts = document.querySelectorAll('.tries img'); // Get the heart life elements.

let missed = 0; // Counter for missed guesses

// Hide the start overlay when the start button is clicked
startButton.addEventListener('click', () => {
  overlay.style.display = 'none'; // Hide the game start overlay when the button is clicked.
});

// Get a random phrase from the phrases array
function getRandomPhrase() {
  return phrases[Math.floor(Math.random() * phrases.length)]; // Generate a random index to select a phrase from the array.
}

// Display the random phrase on the game board
function addPhraseToDisplay(phrase) {
  for (let i = 0; i < phrase.length; i++) {
    const listItem = document.createElement('li'); // Create a list item element.
    listItem.textContent = phrase[i]; // Set the text content of the list item to a character from the phrase.
    if (phrase[i] !== ' ') {
      listItem.classList.add('letter'); // Add 'letter' class if the character is a letter.
    } else {
      listItem.classList.add('space'); // Add 'space' class if the character is a space.
    }
    phraseContainer.appendChild(listItem); // Append the list item to the phrase container.
  }
}

// Check if a letter is in the phrase
function checkLetter(button) {
  const letters = document.querySelectorAll('.letter'); // Get all elements with class 'letter'.
  let match = null; // Initialize match variable.
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].textContent.toLowerCase() === button.textContent) {
      letters[i].classList.add('show'); // Add 'show' class to reveal the correctly guessed letter.
      match = button.textContent; // Store the matched letter.
    }
  }
  return match; // Return the matched letter or null if no match.
}

// Check if the player has won
function checkWin() {
  const letters = document.querySelectorAll('.letter'); // Get all elements with class 'letter'.
  const shownLetters = document.querySelectorAll('.show'); // Get all elements with class 'show'.
  if (letters.length === shownLetters.length) {
    // If all letters are revealed,
    overlay.classList.add('win'); // Add 'win' class to the overlay.
    overlay.style.display = 'flex'; // Display the overlay.
    overlay.querySelector('.title').textContent = 'Congratulations! You won!'; // Update overlay text.
    startButton.textContent = 'Play Again'; // Update button text.
  } else if (missed >= 5) {
    // If the player has missed 5 times,
    overlay.classList.add('lose'); // Add 'lose' class to the overlay.
    overlay.style.display = 'flex'; // Display the overlay.
    overlay.querySelector('.title').textContent = 'Oops! You lost.'; // Update overlay text.
    startButton.textContent = 'Try Again'; // Update button text.
  }
}

// Event listener for the keyboard buttons
keyboard.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    button.classList.add('chosen'); // Add 'chosen' class to the selected keyboard button.
    button.disabled = true; // Disable the selected button to prevent duplicate guesses.

    const letterFound = checkLetter(button); // Check if the selected letter is in the phrase.
    if (!letterFound) {
      hearts[missed].setAttribute('src', 'images/lostHeart.png'); // Replace a heart with a lost heart image.
      missed++; // Increment the missed guesses counter.
    }

    checkWin(); // Check if the player has won or lost.
  }
});

// Reset the game board for a new game
function resetGameBoard() {
  missed = 0; // Reset the missed guesses counter.
  phraseContainer.innerHTML = ''; // Clear the phrase container.
  const buttons = document.querySelectorAll('.keyrow button'); // Get all keyboard buttons.
  buttons.forEach((button) => {
    button.classList.remove('chosen'); // Remove 'chosen' class from all keyboard buttons.
    button.disabled = false; // Enable all keyboard buttons.
  });
  hearts.forEach((heart) => {
    heart.setAttribute('src', 'images/liveHeart.png'); // Reset all hearts to live hearts.
  });
}

// Event listener for the start button to start a new game
startButton.addEventListener('click', () => {
  if (overlay.classList.contains('win') || overlay.classList.contains('lose')) {
    overlay.classList.remove('win', 'lose'); // Remove 'win' or 'lose' class from the overlay if present.
  }
  resetGameBoard(); // Reset the game board.

  const randomPhrase = getRandomPhrase(); // Get a random phrase.
  addPhraseToDisplay(randomPhrase); // Display the random phrase on the game board.
});