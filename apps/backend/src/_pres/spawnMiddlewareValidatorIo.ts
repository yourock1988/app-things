/* eslint-disable no-param-reassign */
/* eslint-disable no-lonely-if */
/* eslint-disable no-sparse-arrays */

import type { ZodSchema } from 'zod'
import type { TMwareIo } from './TMwareIo.ts'

type TVariant = 'body' | 'params' | 'headersAuth'

const dict = {
  params: 0,
  body: 1,
}

// spawnMiddlewareValidatorIo
export default function (variant: TVariant, schema: ZodSchema): TMwareIo {
  return (ctx, args, next) => {
    const { headersAuth } = ctx.socket
    const dto =
      variant === 'headersAuth' ? headersAuth : args?.at(dict[variant])
    const [, , ack] = args ?? [, , () => {}]
    const result = schema.safeParse(dto)
    if (result.success) {
      if (variant !== 'headersAuth' && args) args[dict[variant]] = result.data
      next()
    } else {
      if (variant !== 'headersAuth') ack?.(result.error.format())
      else next({ message: ctx.eventName, data: 400 })
    }
  }
}
