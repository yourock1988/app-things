import type {
  NextFunction,
  ParamsDictionary,
  Request,
  Response,
} from 'express-serve-static-core'

export type TSharedMiddlewares = {
  IDio: (ctx: any, args: any[], next: any) => void
  IDrest: (
    req: Request<ParamsDictionary, any, any, any, Record<string, any>>,
    res: Response,
    next: NextFunction,
  ) => void
  SESSIDio: (ctx: any, args: any[], next: any) => void
  SESSIDrest: (req: Request, res: Response, next: NextFunction) => void
  ACK: (ctx: any, args: any[], next: any) => void
}
