import { zCarAddDto, zCarUpdateDto } from '../domain/zCarDtos.ts'
import compileMiddlewareIo from '../../_utils/compileMiddlewareIo.ts'

const ADD = compileMiddlewareIo('body', zCarAddDto)
const UPD = compileMiddlewareIo('body', zCarUpdateDto)

const mwCarIo = { ADD, UPD }

export default mwCarIo
