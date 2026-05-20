import compileMiddlewareIo from '../_utils/compileMiddlewareIo.ts'
import zCookiesSessId from '../_domain/zCookiesSessId.ts'

const SESSIDio = compileMiddlewareIo('headersAuth', zCookiesSessId)

export default SESSIDio
