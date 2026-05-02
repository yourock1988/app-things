import { zCarAddDto, zCarUpdateDto } from '../domain/zCarDtos.js'
import compileMiddlewareIo from '../../_utils/compileMiddlewareIo.js'

const ADD = compileMiddlewareIo('body', zCarAddDto)
const UPD = compileMiddlewareIo('body', zCarUpdateDto)

const mwCarIo = { ADD, UPD }

export default mwCarIo
