import { zTeapotAddDto, zTeapotUpdateDto } from '../domain/zTeapotDtos.js'
import compileMiddlewareIo from '../../_utils/compileMiddlewareIo.js'

const ADD = compileMiddlewareIo('body', zTeapotAddDto)
const UPD = compileMiddlewareIo('body', zTeapotUpdateDto)

const mwTeapotIo = { ADD, UPD }

export default mwTeapotIo
