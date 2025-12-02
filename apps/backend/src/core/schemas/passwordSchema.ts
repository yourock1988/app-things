import { z } from 'zod'

const msg = {
  require: 'Пришлите это поле',
  nonempty: 'Заполните поле',
  minlength: 'Увеличьте хотябы до 8 символов',
  maxlength: 'Сократите хотябы до 20 символов',
  uppercase: 'Добавьте хотябы один символ в верхнем регистре',
  lowercase: 'Добавьте хотябы один символ в нижнем регистре',
  digit: 'Добавьте хотябы одну цифру',
  special: 'Добавьте хотябы один спец-символ',
}

export default z
  .string({ required_error: msg.require })
  .nonempty({ message: msg.nonempty })
  .min(8, { message: msg.minlength })
  .max(20, { message: msg.maxlength })
  .refine(p => /[A-Z]/.test(p), { message: msg.uppercase })
  .refine(p => /[a-z]/.test(p), { message: msg.lowercase })
  .refine(p => /[0-9]/.test(p), { message: msg.digit })
  .refine(p => /[!@#$%^&*]/.test(p), { message: msg.special })
