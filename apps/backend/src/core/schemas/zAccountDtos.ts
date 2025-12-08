import { z } from 'zod'
import passwordSchema from './field/passwordSchema.js'
import isAgreeSchema from './field/isAgreeSchema.js'
import emailSchema from './field/emailSchema.js'
import phoneSchema from './field/phoneSchema.js'
import msg from './messages.json' with { type: 'json' }

const nicknameSchema = z.string({ required_error: msg.require }).min(2).max(15)
const countrySchema = z.string({ required_error: msg.require }).min(3).max(21)
const stringSchema = z.string({ required_error: msg.require })
const favoriteNumbers = z.array(z.number().positive()).min(1).max(3)
const role = z.string({ required_error: msg.require }).min(2).max(9)

const required = { required_error: msg.dto }
const strict = { message: msg.extra }

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
    required,
  )
  .strict(strict)
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
    required,
  )
  .strict(strict)

export const zAccountUpdPasswordDto = z
  .object(
    {
      currentPassword: stringSchema,
      password: passwordSchema,
      repasswd: stringSchema,
    },
    required,
  )
  .strict(strict)
  .refine(d => d.password === d.repasswd, {
    message: msg.missmatch,
    path: ['repasswd'],
  })

export const zAccountUpdRoleDto = z.object({ role }, required).strict(strict)

export const zAccountUpdInfoDto = z
  .object({ favoriteNumbers }, required)
  .strict(strict)
