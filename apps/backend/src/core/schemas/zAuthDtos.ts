import { z } from 'zod'
import passwordSchema from './passwordSchema.js'
import phoneSchema from './phoneSchema.js'

const msg = {
  dto: 'Пришлите объект в формате JSON',
  require: 'Пришлите это поле',
  extra: 'Уберите лишние поля из запроса',
  missmatch: 'Вводите символы аккуратней',
  check: 'Подтвердите согласие',
  email: 'Введите корректный email',
}

const nicknameSchema = z.string({ required_error: msg.require }).min(2).max(15)
const emailSchema = z
  .string({ required_error: msg.require })
  .email({ message: msg.email })
  .max(23)
const countrySchema = z.string({ required_error: msg.require }).min(3).max(21)
const favoriteNumbersSchema = z.array(z.number().positive()).min(1).max(3)
const stringSchema = z.string({ required_error: msg.require })
const isAgreeSchema = z
  .boolean({ message: msg.require })
  .refine(q => q, { message: msg.check })

export const zAuthSessionIdDto = z
  .object(
    {
      sessionId: z.string({ required_error: msg.require }).uuid(),
    },
    { required_error: msg.dto }
  )
  .strict({ message: msg.extra })

export const zAuthSignUpDto = z
  .object(
    {
      nickname: nicknameSchema,
      password: passwordSchema,
      repasswd: stringSchema,
      email: emailSchema,
      phone: phoneSchema,
      country: countrySchema,
      isAgree: isAgreeSchema,
    },
    { required_error: msg.dto }
  )
  .strict({ message: msg.extra })
  .refine(d => d.password === d.repasswd, {
    message: msg.missmatch,
    path: ['repasswd'],
  })

export const zAuthSignInDto = z
  .object(
    {
      nickname: nicknameSchema,
      password: stringSchema,
    },
    { required_error: msg.dto }
  )
  .strict({ message: msg.extra })

export const zAuthChangePasswordDto = z
  .object(
    {
      currentPassword: stringSchema,
      password: passwordSchema,
      repasswd: stringSchema,
    },
    { required_error: msg.dto }
  )
  .strict({ message: msg.extra })
  .refine(d => d.password === d.repasswd, {
    message: msg.missmatch,
    path: ['repasswd'],
  })

export const zAuthUpdateProfileDto = z
  .object(
    {
      favoriteNumbers: favoriteNumbersSchema,
    },
    { required_error: msg.dto }
  )
  .strict({ message: msg.extra })
