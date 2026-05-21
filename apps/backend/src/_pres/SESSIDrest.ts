import spawnMiddlewareValidatorRest from './spawnMiddlewareValidatorRest.ts'
import zCookiesSessId from '../_domain/zCookiesSessId.ts'

const SESSIDrest = spawnMiddlewareValidatorRest('cookies', zCookiesSessId)

export default SESSIDrest
