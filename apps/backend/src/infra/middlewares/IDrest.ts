import compileMiddlewareRest from '../../utils/compileMiddlewareRest.js'
import zParamsIdDto from '../../core/schemas/zParamsIdDto.js'

const IDrest = compileMiddlewareRest('params', zParamsIdDto)

export default IDrest
