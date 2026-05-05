import type { RequestHandler } from 'express-serve-static-core'

type TAuthist = {
  AUTHrest: RequestHandler
  AUTHNio: (ctx: any, args: any[], next: any) => void
  AUTHZio: (ctx: any, args: any[], next: any) => void
}

export default TAuthist
