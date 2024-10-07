// Get references to the DOM elements
const cards = document.querySelectorAll('.card');
const button = document.getElementById('btn');
const heading = document.querySelector('h1'); // Reference to the h1 element

// Variables to keep track of game state
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let gameStarted = false; // Variable to track if the game has started
let matchedPairs = 0; // Track the number of matched pairs

// Function to shuffle cards and assign numbers
function startGame() {
  let numbers = [];
  
  // Create pairs of numbers (6 unique numbers, each repeated twice)
  for (let i = 1; i <= 6; i++) {
    numbers.push(i, i);
  }
  
  // Shuffle numbers array
  numbers = numbers.sort(() => Math.random() - 0.5);
  
  // Assign shuffled numbers to cards
  cards.forEach((card, index) => {
    card.dataset.value = numbers[index];
    card.classList.remove('flip');
    card.textContent = '?'; // Hide the number initially
  });

  // Reset the game state variables
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0; // Reset matched pairs
  gameStarted = true; // Set game as started

  // Clear any previous message in the heading
  heading.textContent = "Memory Game";

  // Add event listeners to the cards after the game has started
  cards.forEach(card => card.addEventListener('click', flipCard));
}

// Function to flip a card
function flipCard() {
  if (!gameStarted || lockBoard || this === firstCard) return; // Only allow flipping if game has started

  this.classList.add('flip');
  this.textContent = this.dataset.value; // Display the number

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Function to check if two cards match
function checkForMatch() {
  let isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    disableCards();
    matchedPairs++; // Increment the number of matched pairs

    // Check if all pairs are matched
    if (matchedPairs === 6) {
      setTimeout(() => {
        heading.textContent = "Congrats! You matched all pairs!";
      }, 100); // Delay to allow the last flip to complete
    }
  } else {
    unflipCards();
  }
}

// Function to disable matched cards
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// Function to unflip cards if they do not match
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard.textContent = '?'; // Hide the number again
    secondCard.textContent = '?'; // Hide the number again

    resetBoard();
  }, 1000);
}

// Function to reset the board state
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Add event listener to start button to start the game
button.addEventListener('click', startGame);

// Initial state: game is not started, so no cards can be flipped
gameStarted = false;
