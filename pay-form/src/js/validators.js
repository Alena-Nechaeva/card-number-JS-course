// eslint-disable-next-line import/no-extraneous-dependencies
const valid = require('card-validator');
// eslint-disable-next-line import/no-extraneous-dependencies
const emailValidator = require('email-validator');

export function checkInputValue(inpElem, validator) {
  const unmaskedvalue = inpElem.inputmask.unmaskedvalue();
  if (!validator(unmaskedvalue)) {
    if (inpElem.classList.contains('cvc')) {
      inpElem.closest('label').style.outline = '4px solid red';
    } else inpElem.style.outline = '4px solid red';
  }
  return validator(unmaskedvalue);
}

export function checkFirstNumbers(input) {
  const unmaskedvalue = input.inputmask.unmaskedvalue();
  if (unmaskedvalue.length >= 4) {
    const numberValidation = valid.number(unmaskedvalue);
    const { isPotentiallyValid } = numberValidation;

    if (!isPotentiallyValid) {
      input.style.outline = '4px solid red';
    }
  }
}

export function claenClass(imgblock) {
  const classArr = [
    'visa',
    'mastercard',
    'diners-club',
    'american-express',
    'discover',
  ];
  for (const className of classArr) {
    imgblock.classList.remove(className);
  }
}

export function getPaymentSistem(input, imgBlock) {
  const unmaskedvalue = input.inputmask.unmaskedvalue();

  if (unmaskedvalue.length >= 4) {
    const numberValidation = valid.number(unmaskedvalue);
    if (numberValidation.isPotentiallyValid) {
      imgBlock.classList.add(numberValidation.card.type);
      return numberValidation.card.type;
    }
  }
  return false;
}

export function checkNumber(number) {
  return valid.number(number).isValid;
}

export function checkDate(date) {
  return valid.expirationDate(date).isValid;
}

export function checkCode(code) {
  return valid.cvv(code).isValid;
}

export function checkCode4Digits(code) {
  return valid.cvv(code, 4).isValid;
}

export function checkMail(mail) {
  return emailValidator.validate(mail);
}

export function btnAvalible(arr, btn) {
  const isDataValid = arr.every((item) => item);
  if (isDataValid && arr.length >= 4) btn.disabled = false;
  else btn.disabled = true;
}
