import { z } from 'zod'
import SocketError from '../errors/SocketError.js'

/**
 * TODO:
 *
 * необходимо реализовать проверку входящей функции ack
 * она должна быть обязательно TAckFn (по схеме)
 */
export default function compileMiddlewareIo<T>(schema: z.ZodSchema) {
  return (args: any[], next: any) => {
    const data = args.find(a => typeof a === 'object')
    const ack: any = args.find(a => typeof a === 'function')
    const dto: T = data
    const result = schema.safeParse(dto)
    if (result.success) {
      next()
    } else {
      ack?.(
        new SocketError(
          400,
          'compileMiddlewareIo',
          'received data has invalid schema',
          result.error.format(),
        ),
      )
    }
  }
}
