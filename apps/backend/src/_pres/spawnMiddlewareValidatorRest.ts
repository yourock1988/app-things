import type { NextFunction, Request, Response } from 'express'
import type { RequestHandler } from 'express-serve-static-core'
import type { ZodSchema } from 'zod'

type TVariant = 'body' | 'query' | 'params' | 'cookies'

// spawnMiddlewareValidatorRest
export default function (variant: TVariant, schema: ZodSchema): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const dto = req[variant]
    const result = schema.safeParse(dto)
    if (result.success) {
      req[variant] = result.data
      next()
    } else {
      res.status(400).json(result.error.format())
    }
  }
}
