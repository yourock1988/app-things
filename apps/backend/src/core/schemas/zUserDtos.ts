import { z } from 'zod'

export const zUserAddDto = z
  .object({
    nickname: z.string().min(3),
    password: z.string().min(8),
    email: z.string().email(),
  })
  .strict()

export const zUserUpdateDto = z
  .object({
    id: z.number().int().positive(),
    password: z.string().min(8),
    email: z.string().email(),
    money: z.number().min(0),
  })
  .strict()
