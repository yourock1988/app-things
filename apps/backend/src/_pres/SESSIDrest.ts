import compileMiddlewareRest from '../_utils/compileMiddlewareRest.ts'
import zCookiesSessId from '../_domain/zCookiesSessId.ts'

const SESSIDrest = compileMiddlewareRest('cookies', zCookiesSessId)

export default SESSIDrest
