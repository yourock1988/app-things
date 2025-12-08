import z from 'zod'
import messages from './messages.json' with { type: 'json' }

const msg = { ...messages, ...messages.id }

export default z
  .object(
    {
      id: z.coerce.number({
        required_error: msg.require,
        invalid_type_error: msg.mustNum,
      }),
    },
    { required_error: msg.dto },
  )
  .strict({ message: msg.extra })
