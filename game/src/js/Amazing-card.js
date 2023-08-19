import { Card } from './Card.js';

export class AmazingCard extends Card {
  constructor(container, cardNumber, flip) {
    super(container, cardNumber, flip);
  }

  set cardNumber(value) {
    let card = this.createElement();  // let card = super.createElement()- в данном случае без разницы так ведь?
    const cardsImgArray = {
      1: 'img/1.svg',
      2: 'img/2.svg',
      3: 'img/3.svg',
      4: 'img/4.svg',
      5: 'img/5.svg',
      6: 'img/6.svg',
      7: 'img/7.svg',
      8: 'img/8.svg',
    }
    const img = document.createElement('img');
    img.src = cardsImgArray[value];
    const p = document.createElement('p');
    p.style.display = 'none';
    img.onerror = function () {
      img.src = 'img/default.svg';
      p.style.display = 'block';
      p.textContent = 'Problem with load of current image';
      throw new Error('Problem with load of image');
    };
    card.setAttribute('data-number', value)
    card.append(img, p);
    this._cardNumber = value;
  }

  get cardNumber() {
    return this._cardNumber;
  }
}
