'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
const displayMessage = function (msg) {
  document.querySelector('.message').textContent = msg;
};
const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};
const displayHighscore = function (highScore) {
  document.querySelector('.highscore').textContent = highScore;
};
const playGame = function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);
  if (!guess) {
    // err if invalid
    displayMessage('Please enter a valid guess!');
  } else if (guess === secretNumber) {
    winGame();
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'To high!' : 'To low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage("You've lost the game!");
      document.querySelector('.score').textContent = 0;
    }
  }
};
const resetGame = function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  displayMessage('Start guessing...');
  document.querySelector('.guess').value = '';
  displayScore(score);
  document.querySelector('.check').textContent = 'check!';
};

const winGame = function () {
  // logic when right number has been g
  displayMessage("You've won the game!");
  document.querySelector('body').style.backgroundColor = '#60b347';
  document.querySelector('.number').style.width = '30rem';
  document.querySelector('.number').textContent = secretNumber;
  if (score > highScore) {
    highScore = score;
    displayHighscore(highScore);
  }
  document.querySelector('.check').textContent = 'Play again!';
};

displayScore(score);
displayHighscore(highScore);
// Reset game
document.querySelector('.again').addEventListener('click', resetGame);
document.querySelector('.check').addEventListener('click', playGame);
