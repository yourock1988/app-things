import compileMiddlewareIo from '../_utils/compileMiddlewareIo.js'
import zCookiesSessId2 from '../_domain/zCookiesSessId2.js'

const SESSIDio = compileMiddlewareIo('headersAuth', zCookiesSessId2)

export default SESSIDio
