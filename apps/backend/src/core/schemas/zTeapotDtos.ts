import { z } from 'zod'

const id = z.number().min(1)
const temperature = z.number().min(0).max(100)
const ongoing = z.enum(['idle', 'boiling'])

export default z
  .object({
    id,
    temperature,
    ongoing,
  })
  .strict()
