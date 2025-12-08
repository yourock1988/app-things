import z from 'zod'
import messages from '../messages.json' with { type: 'json' }

const msg = { ...messages, ...messages.email }

export default z
  .string({ required_error: msg.require })
  .email({ message: msg.corrmail })
  .max(23)
