import { zTeapotAddDto, zTeapotUpdateDto } from '../domain/zTeapotDtos.ts'
import compileMiddlewareIo from '../../_utils/compileMiddlewareIo.ts'

const ADD = compileMiddlewareIo('body', zTeapotAddDto)
const UPD = compileMiddlewareIo('body', zTeapotUpdateDto)

const mwTeapotIo = { ADD, UPD }

export default mwTeapotIo
