'use strict';

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const player0NameEl = document.getElementById(`name--0`);
const player1NameEl = document.getElementById(`name--1`);
const scorePlayer1 = document.getElementById(`score--0`);
const scorePlayer2 = document.getElementById(`score--1`);
const currentPlayer1El = document.getElementById(`current--0`);
const currentPlayer2El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

let playerTurn, scores, current, playing;
const init = function () {
  playerTurn = 0;
  current = 0;
  scores = [0, 0];
  playing = true;

  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  currentPlayer1El.textContent = 0;
  currentPlayer2El.textContent = 0;

  diceEl.classList.add(`hidden`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};

const swichPlayer = function () {
  playerTurn = playerTurn === 0 ? 1 : 0;
  current = 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

init();
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      current += dice;
      document.getElementById(`current--${playerTurn}`).textContent = current;
    } else {
      document.getElementById(`current--${playerTurn}`).textContent = 0;
      swichPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    scores[playerTurn] += current;
    document.getElementById(`score--${playerTurn}`).textContent =
      scores[playerTurn];

    if (scores[playerTurn] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${playerTurn}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${playerTurn}`)
        .classList.remove(`player--active`);
      diceEl.classList.add('hidden');
      document.getElementById(`current--${playerTurn}`).textContent = 0;
    } else {
      swichPlayer();
    }
  }
});

btnNew.addEventListener(`click`, init);
