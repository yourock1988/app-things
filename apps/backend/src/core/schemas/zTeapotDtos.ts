import { z } from 'zod'

const temperature = z.number().min(0).max(100)
// const ongoing = z.enum(['idle', 'boiling'])

export const zTeapotAddDto = z
  .object({
    temperature,
    // ongoing,
  })
  .strict()

export const zTeapotUpdateDto = z
  .object({
    temperature,
    // ongoing,
  })
  .strict()
