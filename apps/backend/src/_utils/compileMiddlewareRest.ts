import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

type TVariant = 'body' | 'query' | 'params' | 'cookies'

export default function (variant: TVariant, schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
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
