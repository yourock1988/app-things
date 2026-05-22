/* eslint-disable no-param-reassign */
/* eslint-disable no-lonely-if */

import { z } from 'zod'

type TVariant = 'body' | 'params' | 'headersAuth'

const dict = {
  params: 0,
  body: 1,
}

// spawnMiddlewareValidatorIo
export default function (
  variant: TVariant,
  schema: z.ZodSchema,
): ((ctx: any, args: any[], next: any) => void) & { msg?: string } {
  return (ctx, args: any[], next: any) => {
    const { headersAuth } = ctx.socket
    const dto = variant === 'headersAuth' ? headersAuth : args.at(dict[variant])
    const ack = args?.at(2)
    const result = schema.safeParse(dto)
    if (result.success) {
      if (variant !== 'headersAuth') args[dict[variant]] = result.data
      next()
    } else {
      if (variant !== 'headersAuth') ack?.(result.error.format())
      else next({ message: ctx.eventName })
    }
  }
}
