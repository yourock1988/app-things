import z from 'zod'
import msg from '../messages.json' with { type: 'json' }

export default z
  .boolean({ message: msg.require })
  .refine(q => q, { message: msg.check })
