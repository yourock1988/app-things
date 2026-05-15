import compileMiddlewareIo from '../_utils/compileMiddlewareIo.js'
import zCookiesSessId from '../_domain/zCookiesSessId.js'

const SESSIDio = compileMiddlewareIo('headersAuth', zCookiesSessId)

export default SESSIDio
