import {
  zTeapotAddDto,
  zTeapotUpdateDto,
} from '../../core/schemas/zTeapotDtos.js'
import compileMiddlewareIo from '../../utils/compileMiddlewareIo.js'

const ADD = compileMiddlewareIo('body', zTeapotAddDto)
const UPD = compileMiddlewareIo('body', zTeapotUpdateDto)

const mwTeapotIo = { ADD, UPD }

export default mwTeapotIo
