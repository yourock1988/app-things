import { zCarAddDto, zCarUpdateDto } from '../../core/schemas/zCarDtos.js'
// import { TCarAddDto, TCarUpdateDto } from '../../core/dtos/TCarDtos.js'
import compileMiddlewareIo from '../../utils/compileMiddlewareIo.js'

const ADD = compileMiddlewareIo('body', zCarAddDto)
const UPD = compileMiddlewareIo('body', zCarUpdateDto)

const mwCarIo = { ADD, UPD }

export default mwCarIo
