import z from 'zod'
import msg from './messages.json' with { type: 'json' }

// export default z.string({ required_error: msg.require }).uuid()

export default z.object(
  {
    sessionid: z.string({ required_error: msg.require }).min(4), // .uuid(),
  },
  { required_error: msg.dto },
)
// .strict({ message: msg.extra })
