export class Card {
  _open = false;
  _success = false;
  firstCard = null;
  secondCard = null;

  constructor(container, cardNumber, flip) {
    this.cardNumber = cardNumber;
    this.container = container;
    this.flip = flip;
    this.container.append(this.card);
  }

  createElement() {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.addEventListener('click', () => {
      if (!this.open && !this.success) {
        this.open = true;
        this.flip(this);
      }
    })
    return this.card;
  }

  set cardNumber(value) {
    this._cardNumber = value;
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    this._open = value;
    if (value) this.card.classList.add('is-open');
    else this.card.classList.remove('is-open');
  }

  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value;
    if (value) this.card.classList.add('success');
    else this.card.classList.remove('success');
  }

  get success() {
    return this._success;
  }
}
