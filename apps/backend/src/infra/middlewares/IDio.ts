import zParamsIdDto from '../../core/schemas/zParamsIdDto.js'
import compileMiddlewareIo from '../../utils/compileMiddlewareIo.js'

const IDio = compileMiddlewareIo('params', zParamsIdDto)

export default IDio
