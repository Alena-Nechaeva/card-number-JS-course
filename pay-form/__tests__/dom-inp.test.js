import createForm from '../src/js/create-form';

test('Функция создания DOM-дерева должна вернуть DOM-элемент, в котором содержится строго четыре поля для ввода с плейсхолдерами «Card Number», «mm/yy», CVV/CVC, Email', () => {
  const formElement = createForm();
  expect(formElement.form instanceof HTMLElement).toBe(true);

  const inputElements = formElement.form.querySelectorAll(
    'input[type="text"], input[type="password"]'
  );
  expect(inputElements.length).toBe(4);

  const placeholders = Array.from(inputElements).map(
    (input) => input.placeholder
  );
  expect(placeholders).toEqual(['Card Number', 'mm/yy', 'CVV/CVC', 'Email']);
});
