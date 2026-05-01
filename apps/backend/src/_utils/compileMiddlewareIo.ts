/* eslint-disable no-param-reassign */

import { z } from 'zod'

type TVariant = 'body' | 'params'

const dict = {
  params: 0,
  body: 1,
}

export default function (variant: TVariant, schema: z.ZodSchema) {
  return (ctx, args: any[], next: any) => {
    const dto = args.at(dict[variant])
    const ack = args.at(2)
    const result = schema.safeParse(dto)
    if (result.success) {
      args[dict[variant]] = result.data
      next()
    } else {
      ack?.(result.error.format()) // 400
    }
  }
}
