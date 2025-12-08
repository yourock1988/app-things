import z from 'zod'
import msg from './messages.json' with { type: 'json' }

export default z
  .object(
    {
      sessionId: z.string({ required_error: msg.require }).uuid(),
    },
    { required_error: msg.dto },
  )
  .strict({ message: msg.extra })
