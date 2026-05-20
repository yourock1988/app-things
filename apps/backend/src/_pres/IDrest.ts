import compileMiddlewareRest from '../_utils/compileMiddlewareRest.ts'
import zParamsIdDto from '../_domain/zParamsIdDto.ts'

const IDrest = compileMiddlewareRest('params', zParamsIdDto)

export default IDrest
