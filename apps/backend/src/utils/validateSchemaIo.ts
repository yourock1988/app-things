import { z } from 'zod'

export default function validateSchemaIo<T>(schema: z.ZodSchema) {
  return (args: any[], next: any) => {
    const data = args.find(a => typeof a === 'object')
    const ack = args.find(a => typeof a === 'function')
    const dto: T = data
    const result = schema.safeParse(dto)
    if (result.success) {
      next()
    } else {
      ack?.(result.error.format())
    }
  }
}
