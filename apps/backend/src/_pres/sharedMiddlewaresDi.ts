import type { TSharedMiddlewares } from './TSharedMiddlewares.ts'
import middlewareValidatorRest from './spawnMiddlewareValidatorRest.ts'
import middlewareValidatorIo from './spawnMiddlewareValidatorIo.ts'
import zCookiesSessId from '../_domain/zCookiesSessId.ts'
import zParamsIdDto from '../_domain/zParamsIdDto.ts'
import ACK from './ACK.ts'

export default function sharedMiddlewaresDi(): TSharedMiddlewares {
  return {
    IDio: middlewareValidatorIo('params', zParamsIdDto),
    IDrest: middlewareValidatorRest('params', zParamsIdDto),
    SESSIDio: middlewareValidatorIo('headersAuth', zCookiesSessId),
    SESSIDrest: middlewareValidatorRest('cookies', zCookiesSessId),
    ACK,
  }
}
