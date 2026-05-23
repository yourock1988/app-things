import type { RequestHandler } from 'express-serve-static-core'
import type { TMwareIo } from './TMwareIo.ts'

export type TAuthist = {
  AUTHrest: RequestHandler
  AUTHNio: TMwareIo
  AUTHZio: TMwareIo
}
