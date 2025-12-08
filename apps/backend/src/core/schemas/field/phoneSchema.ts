import z from 'zod'
import validatePhoneStrict from '../../../utils/validatePhoneStrict.js'
import messages from '../messages.json' with { type: 'json' }

const msg = { ...messages, ...messages.phone }

export default z
  .string({ required_error: msg.require })
  .refine(validatePhoneStrict, { message: msg.corrtel })
