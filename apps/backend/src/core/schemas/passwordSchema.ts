import { z } from 'zod'
import messages from './messages.json' with { type: 'json' }

const msg = { ...messages, ...messages.password }

export default z
  .string({ required_error: msg.require })
  .nonempty({ message: msg.nonempty })
  .min(8, { message: msg.minlength })
  .max(20, { message: msg.maxlength })
  .refine(p => /[A-Z]/.test(p), { message: msg.uppercase })
  .refine(p => /[a-z]/.test(p), { message: msg.lowercase })
  .refine(p => /[0-9]/.test(p), { message: msg.digit })
  .refine(p => /[!@#$%^&*]/.test(p), { message: msg.special })
