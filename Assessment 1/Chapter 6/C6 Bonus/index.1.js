// DOM elements
const $ = (id) => document.getElementById(id);
const [startScreen, startButton, rgbDisplay, colorOptions, livesDisplay, scoreDisplay, gameOverScreen, finalScore, replayButton] = 
  ["start-screen", "start-btn", "rgb-value", "color-options", "lives", "score", "game-over", "final-score", "replay-btn"].map($);

// Start game on button click
startButton.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  resetGame();
});

// Game variables
let lives = 3, score = 0, correctColor;

// RGB functions
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const generateRandomColor = () => `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`;

// Game functions
const startRound = () => {
  colorOptions.innerHTML = ""; // Clear previous buttons
  correctColor = generateRandomColor();
  rgbDisplay.textContent = correctColor.toUpperCase();

  // Generate and shuffle color options
  const options = [correctColor, generateRandomColor(), generateRandomColor()].sort(() => Math.random() - 0.5);
  
  // Color buttons
  options.forEach((color) => {
    const button = document.createElement("button");
    button.style.backgroundColor = color;
    button.addEventListener("click", () => handleGuess(color));
    colorOptions.appendChild(button);
  });
};

// For answers
const handleGuess = (color) => {
  if (color === correctColor) {
    scoreDisplay.textContent = `Score: ${++score}`;
    startRound();
  } else {
    lives--;
    livesDisplay.textContent = `Lives: ${lives}`; // Update lives display immediately
    if (lives === 0) endGame(); // Only if lives are 0
  }
};

// End of the game with score and button
const endGame = () => {
  gameOverScreen.classList.remove("hidden"); 
  finalScore.textContent = score; 
  colorOptions.innerHTML = ""; 
};

// Command for the code to reset after clicking play again
const resetGame = () => {
  lives = 3;
  score = 0;
  livesDisplay.textContent = `Lives: ${lives}`;
  scoreDisplay.textContent = `Score: ${score}`;
  gameOverScreen.classList.add("hidden"); 
  startRound();
};

// Replay button
replayButton.addEventListener("click", resetGame);

// Start game
resetGame();
