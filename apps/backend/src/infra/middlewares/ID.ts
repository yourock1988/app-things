import compileMiddlewareRest from '../../utils/compileMiddlewareRest.js'
import zParamsIdDto from '../../core/schemas/zParamsIdDto.js'

const ID = compileMiddlewareRest('params', zParamsIdDto)

export default ID
