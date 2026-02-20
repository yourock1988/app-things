import zParamsIdDto from '../../core/schemas/zParamsIdDto.js'
import compileMiddlewareIo2 from '../../utils/compileMiddlewareIo2.js'

const IDio = compileMiddlewareIo2('params', zParamsIdDto)

export default IDio
