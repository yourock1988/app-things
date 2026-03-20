import { z } from 'zod'
import msg from './messages.json' with { type: 'json' }

const required = { required_error: msg.dto }
const strict = { message: msg.extra }

const nicknameSchema = z.string({ required_error: msg.require }).min(3).max(8)

export const zSessionAddDto = z
  .object(
    {
      nickname: nicknameSchema,
    },
    required,
  )
  .strict(strict)

export const zSessionUpdateDto = z
  .object(
    {
      nickname: nicknameSchema,
    },
    required,
  )
  .strict(strict)
