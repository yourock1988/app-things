/* eslint-disable no-param-reassign */

import { z } from 'zod'

type TVariant = 'body' | 'params' | 'headersAuth'

const dict = {
  params: 0,
  body: 1,
}

export default function (variant: TVariant, schema: z.ZodSchema) {
  return (ctx, args: any[], next: any) => {
    const { headersAuth } = ctx.socket
    const dto = variant === 'headersAuth' ? headersAuth : args.at(dict[variant])
    const ack = args?.at(2)
    const result = schema.safeParse(dto)
    if (result.success) {
      if (variant !== 'headersAuth') args[dict[variant]] = result.data
      next()
    } else {
      ack?.(result.error.format()) // 400
    }
  }
}
