import type { RequestHandler } from 'express-serve-static-core'
import type { TMwareIo } from './TMwareIo.ts'

export type TSharedMiddlewares = {
  IDio: TMwareIo
  IDrest: RequestHandler
  SESSIDio: TMwareIo
  SESSIDrest: RequestHandler
  ACK: TMwareIo
}
