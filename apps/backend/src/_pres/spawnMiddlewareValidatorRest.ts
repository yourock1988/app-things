import type { RequestHandler } from 'express-serve-static-core'
import type { ZodSchema } from 'zod'

type TVariant = 'body' | 'query' | 'params' | 'cookies'

// spawnMiddlewareValidatorRest
export default function (variant: TVariant, schema: ZodSchema): RequestHandler {
  return (req, res, next) => {
    const dto = req[variant]
    const result = schema.safeParse(dto)
    if (result.success) {
      // eslint-disable-next-line no-param-reassign
      req[variant] = result.data
      next()
    } else {
      res.status(400).json(result.error.format())
    }
  }
}
