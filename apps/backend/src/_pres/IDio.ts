import compileMiddlewareIo from '../_utils/compileMiddlewareIo.ts'
import zParamsIdDto from '../_domain/zParamsIdDto.ts'

const IDio = compileMiddlewareIo('params', zParamsIdDto)

export default IDio
