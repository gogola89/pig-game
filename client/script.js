'use strict';

const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.querySelector('#score--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const diceImg = document.querySelector('.dice');

let activePlayer = 0;
let currentScore = 0;
let scores = [0, 0];
let playing = true;

const init = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  document.querySelector(`.player--0`).classList.add('player--active');

  document.querySelector(`.player--1`).classList.remove('player--active');

  document.querySelector(`#current--${activePlayer}`).textContent = 0;

  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;

  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;

  diceImg.classList.add('hidden');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate random dice roll
    let dice = Math.floor(Math.random() * 6 + 1);
    // display dice
    diceImg.classList.remove('hidden');
    diceImg.src = `imgs/dice-${dice}.png`;
    // check for rolled dice condition
    // If dice is not 1 calculate score
    if (dice !== 1) {
      currentScore += dice;

      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
    // else switch player
    else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceImg.classList.add('hidden');
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
