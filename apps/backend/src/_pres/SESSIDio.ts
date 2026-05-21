import spawnMiddlewareValidatorIo from './spawnMiddlewareValidatorIo.ts'
import zCookiesSessId from '../_domain/zCookiesSessId.ts'

const SESSIDio = spawnMiddlewareValidatorIo('headersAuth', zCookiesSessId)

export default SESSIDio
