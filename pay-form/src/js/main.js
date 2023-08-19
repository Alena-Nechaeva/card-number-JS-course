// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';
import { setChildren } from 'redom';
import createForm from './create-form';
import {
  checkInputValue,
  checkNumber,
  getPaymentSistem,
  checkDate,
  checkCode,
  checkCode4Digits,
  checkMail,
  btnAvalible,
  checkFirstNumbers,
  claenClass,
} from './validators';
// eslint-disable-next-line import/no-unresolved
import '../index.html';

window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const form = createForm();
  setChildren(container, form.form);

  // remove red border when typing
  [
    form.cardNumber.inputNumber,
    form.inputExpiryDate,
    form.inputCvc,
    form.inputEmail,
  ].forEach((item) =>
    item.addEventListener('focus', () => {
      item.style.outline = '';
      form.btnSubmit.disabled = true;
      if (item.classList.contains('cvc')) {
        item.closest('label').style.outline = '';
      }
    })
  );

  // add special events on card number input
  ['paste', 'input'].forEach((event) => {
    form.cardNumber.inputNumber.addEventListener(event, () => {
      claenClass(form.cardNumber.cardImg);
      checkFirstNumbers(form.cardNumber.inputNumber);
      getPaymentSistem(form.cardNumber.inputNumber, form.cardNumber.cardImg);
    });
  });

  // blur listeners
  const validCardArr = [];
  form.cardNumber.inputNumber.addEventListener('blur', () => {
    validCardArr[0] = checkInputValue(form.cardNumber.inputNumber, checkNumber);
    btnAvalible(validCardArr, form.btnSubmit);
  });

  form.inputExpiryDate.addEventListener('blur', () => {
    validCardArr[1] = checkInputValue(form.inputExpiryDate, checkDate);
    btnAvalible(validCardArr, form.btnSubmit);
  });

  form.inputCvc.addEventListener('blur', () => {
    const cardName = getPaymentSistem(
      form.cardNumber.inputNumber,
      form.cardNumber.cardImg
    );

    if (cardName === 'american-express') {
      validCardArr[2] = checkInputValue(form.inputCvc, checkCode4Digits);
    } else validCardArr[2] = checkInputValue(form.inputCvc, checkCode);

    btnAvalible(validCardArr, form.btnSubmit);
  });

  form.inputEmail.addEventListener('blur', () => {
    validCardArr[3] = checkInputValue(form.inputEmail, checkMail);
    btnAvalible(validCardArr, form.btnSubmit);
  });

  form.form.addEventListener('submit', (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('Done!');
  });
});

// 4687 3870 2697 9792 - visa // cvc 123
// 5408 3700 4067 0717 - master // cvc 123
// 3741 7161 1430 411 - american express // cvc  3812
// 6011 4664 7594 8565 - discover // cvc 6155
// 3608 2588 8479 43 - Diners Club // cvc 123
