import { z } from 'zod'

const nicknameSchema = z.string().min(3).max(8)

export const zSessionAddDto = z
  .object({
    nickname: nicknameSchema,
  })
  .strict()

export const zSessionUpdateDto = z
  .object({
    nickname: nicknameSchema,
  })
  .strict()
