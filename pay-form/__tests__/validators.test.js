import { checkNumber, checkCode, checkCode4Digits } from '../src/js/validators';

test('Валидация номера карты пропускает корректный номер карты', () => {
  expect(checkNumber('4687387026979792')).toBe(true);
  expect(checkNumber('4687 3870 2697 9792')).toBe(true);
});

test('Валидация номера карты не пропускает произвольную строку, содержащую любые нецифровые символы', () => {
  expect(checkNumber('4v8t387"2697979,')).toBe(false);
});

test('Валидация номера карты не пропускает строку с недостаточным количеством цифр', () => {
  expect(checkNumber('468738702697')).toBe(false);
});

test('Валидация номера карты пропускает строку с 15 цифрами', () => {
  expect(checkNumber('374171611430411')).toBe(true);
});

test('Валидация CVV/CVC пропускает строку с тремя цифровыми символами', () => {
  expect(checkCode('123')).toBe(true);
});

test('Валидация CVV/CVC не пропускает строки с 1-2 цифровыми символами', () => {
  expect(checkCode('16')).toBe(false);
  expect(checkCode('7')).toBe(false);
});

test('Валидация CVV/CVC пропускает строки с 4 цифровыми символами', () => {
  expect(checkCode4Digits('1237')).toBe(true);
});

test('Валидация CVV/CVC не пропускает строки с тремя нецифровыми символами', () => {
  expect(checkCode('1a:')).toBe(false);
});
