import compileMiddlewareRest from '../_utils/compileMiddlewareRest.js'
import zCookiesSessId from '../_domain/zCookiesSessId.js'

const SESSIDrest = compileMiddlewareRest('cookies', zCookiesSessId)

export default SESSIDrest
