import createForm from '../src/js/create-form';

test('Функция создания DOM-дерева должна вернуть DOM-элемент, в котором содержится строго четыре поля для ввода с плейсхолдерами «Номер карты», «ММ/ГГ», CVV/CVC, Email', () => {
  const expectedContent =
    '<form class="form"><div class="card-number"><label class="label number-label"><span>Card Number</span><input class="input card-number" type="text" required="" placeholder="Card Number" inputmode="text"></label><div class="card-img"></div></div><div class="card-date"><label class="label"><span>Expiration date</span><input class="input expiry" type="text" required="" placeholder="mm/yy" inputmode="numeric"></label></div><div class="cvc-block"><span>CVC code</span><label class="label cvc-label"><input class="input cvc" type="password" autocomplete="on" required="" placeholder="CVV/CVC" inputmode="text"><button class="show"></button></label></div><div class="email-block"><label class="label"><span>Email</span><input class="input email" type="text" autocomplete="on" required="" placeholder="Email" inputmode="email"></label></div><button class="btn-submit" disabled="">Pay</button></form>';

  const formElement = createForm();
  expect(formElement.form).toBeInstanceOf(HTMLFormElement);
  expect(formElement.form.outerHTML).toBe(expectedContent);

  expect(formElement.form).toBeDefined();
  expect(formElement.cardNumber.inputNumber).toBeDefined();
  expect(formElement.inputExpiryDate).toBeDefined();
  expect(formElement.inputCvc).toBeDefined();
  expect(formElement.inputEmail).toBeDefined();
});
