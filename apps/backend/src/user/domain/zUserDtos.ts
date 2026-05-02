import { z } from 'zod'

const nicknameSchema = z.string().min(3).max(8)
const passwordSchema = z.string().min(5).max(12)
const emailSchema = z.string().email().min(8).max(15)
const moneySchema = z.number().min(0)

export const zUserAddDto = z
  .object({
    nickname: nicknameSchema,
    password: passwordSchema,
    email: emailSchema,
  })
  .strict()

export const zUserUpdateDto = z
  .object({
    password: passwordSchema,
    money: moneySchema,
  })
  .strict()
