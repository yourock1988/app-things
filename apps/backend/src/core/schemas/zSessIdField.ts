import z from 'zod'
import msg from './messages.json' with { type: 'json' }

export default z.string({ required_error: msg.require }).uuid()
