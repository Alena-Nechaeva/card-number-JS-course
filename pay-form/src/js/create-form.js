import { el, setChildren, mount } from 'redom';
import Inputmask from 'inputmask';
import '../scss/style.scss';

export default function createForm() {
  const form = el('form.form');
  const numberBlock = el('div.card-number');
  const cardImg = el('div.card-img');
  const cardNumber = el(
    'label.label.number-label',
    el('span', 'Card Number'),
    el('input.input.card-number', {
      type: 'text',
      required: true,
      placeholder: 'Card Number',
    })
  );
  setChildren(numberBlock, [cardNumber, cardImg]);

  const dateBlock = el('div.card-date');
  const expiry = el(
    'label.label',
    el('span', 'Expiration date'),
    el('input.input.expiry', {
      type: 'text',
      required: true,
      placeholder: 'mm/yy',
    })
  );
  mount(dateBlock, expiry);

  const cvcBlock = el('div.cvc-block');
  const cvcTxt = el('span', 'CVC code');
  const cvcLabel = el(
    'label.label.cvc-label',
    el('input.input.cvc', {
      type: 'password',
      autocomplete: 'on',
      required: true,
      placeholder: 'CVV/CVC',
    }),
    el('button.show')
  );
  setChildren(cvcBlock, [cvcTxt, cvcLabel]);

  const emailBlock = el('div.email-block');
  const email = el(
    'label.label',
    el('span', 'Email'),
    el('input.input.email', {
      type: 'text',
      autocomplete: 'on',
      required: true,
      placeholder: 'Email',
    })
  );
  mount(emailBlock, email);

  const btnSubmit = el('button.btn-submit', { disabled: true }, 'Pay');

  const month = new Date().getMonth() + 1;
  const currentMonth = month < 10 ? `0${month}` : `${month}`;
  const currentYear = new Date().getFullYear() - 2000;
  Inputmask('9999 9999 9999 9999[ 99]', { placeholder: ' ' }).mask(
    cardNumber.lastChild
  );
  Inputmask('email').mask(email.lastChild);
  Inputmask({
    alias: 'datetime',
    inputFormat: 'mm/yy',
    outputFormat: 'mmyy',
    // min: `${currentMonth}/${currentYear}`,
    max: `${currentMonth}/${currentYear + 5}`,
  }).mask(expiry.lastChild);
  Inputmask('999[9]', { placeholder: '' }).mask(cvcLabel.firstChild);

  cvcLabel.lastChild.addEventListener('click', (e) => {
    e.preventDefault();
    cvcLabel.lastChild.classList.toggle('is-open');

    if (cvcLabel.lastChild.classList.contains('is-open'))
      cvcLabel.firstChild.type = 'text';
    else cvcLabel.firstChild.type = 'password';
  });

  setChildren(form, [numberBlock, dateBlock, cvcBlock, emailBlock, btnSubmit]);

  return {
    form,
    cardNumber: {
      inputNumber: cardNumber.lastChild,
      cardImg,
    },
    inputExpiryDate: expiry.lastChild,
    inputCvc: cvcLabel.firstChild,
    inputEmail: email.lastChild,
    btnSubmit,
  };
}
