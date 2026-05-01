import compileMiddlewareRest from '../_utils/compileMiddlewareRest.js'
import zParamsIdDto from '../_domain/zParamsIdDto.js'

const IDrest = compileMiddlewareRest('params', zParamsIdDto)

export default IDrest
