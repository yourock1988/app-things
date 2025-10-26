import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export default function validateSchema<T>(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto: T = req.body
    const result = schema.safeParse(dto)
    if (result.success) {
      next()
    } else {
      res.status(400).json(result.error.format())
    }
  }
}
