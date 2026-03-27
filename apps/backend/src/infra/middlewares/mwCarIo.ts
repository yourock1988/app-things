import { zCarAddDto, zCarUpdateDto } from '../../core/schemas/zCarDtos.js'
import compileMiddlewareIo from '../../utils/compileMiddlewareIo.js'

const ADD = compileMiddlewareIo('body', zCarAddDto)
const UPD = compileMiddlewareIo('body', zCarUpdateDto)

const mwCarIo = { ADD, UPD }

export default mwCarIo
