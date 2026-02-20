import { zCarAddDto, zCarUpdateDto } from '../../core/schemas/zCarDtos.js'
// import { TCarAddDto, TCarUpdateDto } from '../../core/dtos/TCarDtos.js'
import compileMiddlewareIo2 from '../../utils/compileMiddlewareIo2.js'

const ADD = compileMiddlewareIo2('body', zCarAddDto)
const UPD = compileMiddlewareIo2('body', zCarUpdateDto)

const mwCarIo2 = { ADD, UPD }

export default mwCarIo2
