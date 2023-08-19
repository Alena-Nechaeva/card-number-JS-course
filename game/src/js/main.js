// eslint-disable-next-line import/extensions
import { AmazingCard } from './Amazing-card.js';
// import { Card } from './Card.js';

const container = document.getElementById('game');
let cardsNumbArr = [];
let cardsArr = [];
let firstCard = null;
let secondCard = null;

function flip(card) {
  if (firstCard !== null && secondCard !== null) {
    if (firstCard.cardNumber !== secondCard.cardNumber) {
      firstCard.open = false;
      secondCard.open = false;
      firstCard = null;
      secondCard = null;
    }
  }

  if (firstCard === null) {
    firstCard = card;
  } else if (secondCard === null) {
    secondCard = card;
  }

  if (firstCard !== null && secondCard !== null) {
    if (firstCard.cardNumber === secondCard.cardNumber) {
      firstCard.success = true;
      secondCard.success = true;
      firstCard = null;
      secondCard = null;
    }
  }

  if (
    document.querySelectorAll('.card.success').length === cardsNumbArr.length
  ) {
    setTimeout(() => {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Winner winner chicken dinner! Strart a new game?')) {
        cardsNumbArr = [];
        cardsArr = [];
        firstCard = null;
        secondCard = null;
        container.innerHTML = '';
        // eslint-disable-next-line no-use-before-define
        newGame(container, 4);
      }
    }, 500);
  }
}

function newGame(block, cardsAmount) {
  for (let i = 1; i <= cardsAmount / 2; i++) {
    cardsNumbArr.push(i);
    cardsNumbArr.push(i);
  }

  for (let i = cardsNumbArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardsNumbArr[i], cardsNumbArr[j]] = [cardsNumbArr[j], cardsNumbArr[i]];
  }

  for (const cardNumber of cardsNumbArr) {
    cardsArr.push(new AmazingCard(block, cardNumber, flip));
  }
}

newGame(container, 16);
