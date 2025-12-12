import validatePhoneStrict from '../../../src/utils/validatePhoneStrict'

test('correct phone is valid', () => {
  let phone = '+380991122333'

  let result = validatePhoneStrict(phone)

  expect(result).toBeTruthy()
})

test('correct phone from country is valid', () => {
  let phone = '+12133734253'

  let result = validatePhoneStrict(phone, 'US')

  expect(result).toBeTruthy()
})

test('phone in incorrect format is invalid', () => {
  let phone = '+38(099)11-22-333'

  let result = validatePhoneStrict(phone)

  expect(result).toBeFalsy()
})

test('phone from another country is invalid', () => {
  let phone = '+380991122333'

  let result = validatePhoneStrict(phone, 'RU')

  expect(result).toBeFalsy()
})

test('phone without + from bad country is invalid', () => {
  let phone = '380991122333'

  let result = validatePhoneStrict(phone, 'RU')

  expect(result).toBeFalsy()
})

test('phone without + is invalid', () => {
  let phone = '380991122333'

  let result = validatePhoneStrict(phone)

  expect(result).toBeFalsy()
})

test('phone starts with letter is invalid', () => {
  let phone = 'x+380991122333'

  let result = validatePhoneStrict(phone)

  expect(result).toBeFalsy()
})

test('phone with containing letter is invalid', () => {
  let phone = '+38099x1122333'

  let result = validatePhoneStrict(phone)

  expect(result).toBeFalsy()
})
