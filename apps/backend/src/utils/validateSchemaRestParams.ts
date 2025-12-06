import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export default function validateSchemaRestParams(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto = req.params
    const result = schema.safeParse(dto)
    if (result.success) {
      req.params = result.data
      next()
    } else {
      res.status(400).json(result.error.format())
    }
  }
}
