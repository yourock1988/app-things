import { z } from 'zod'
import passwordSchema from './passwordSchema.js'
import phoneSchema from './phoneSchema.js'
import msg from './messages.json' with { type: 'json' }

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

const roleSchema = z.string({ required_error: msg.require }).min(2).max(9)

export const zAuthSessionIdDto = z
  .object(
    {
      sessionId: z.string({ required_error: msg.require }).uuid(),
    },
    { required_error: msg.dto },
  )
  .strict({ message: msg.extra })

export const zAccountAddDto = z
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
    { required_error: msg.dto },
  )
  .strict({ message: msg.extra })
  .refine(d => d.password === d.repasswd, {
    message: msg.missmatch,
    path: ['repasswd'],
  })

export const zAccountGetDto = z
  .object(
    {
      nickname: nicknameSchema,
      password: stringSchema,
    },
    { required_error: msg.dto },
  )
  .strict({ message: msg.extra })

export const zAccountUpdPasswordDto = z
  .object(
    {
      currentPassword: stringSchema,
      password: passwordSchema,
      repasswd: stringSchema,
    },
    { required_error: msg.dto },
  )
  .strict({ message: msg.extra })
  .refine(d => d.password === d.repasswd, {
    message: msg.missmatch,
    path: ['repasswd'],
  })

export const zAccountUpdRoleDto = z
  .object(
    {
      role: roleSchema,
    },
    { required_error: msg.dto },
  )
  .strict({ message: msg.extra })

export const zAccountUpdInfoDto = z
  .object(
    {
      favoriteNumbers: favoriteNumbersSchema,
    },
    { required_error: msg.dto },
  )
  .strict({ message: msg.extra })
