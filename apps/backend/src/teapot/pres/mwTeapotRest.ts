import { zTeapotAddDto, zTeapotUpdateDto } from '../domain/zTeapotDtos.js'
import compileMiddlewareRest from '../../_utils/compileMiddlewareRest.js'

const ADD = compileMiddlewareRest('body', zTeapotAddDto)
const UPD = compileMiddlewareRest('body', zTeapotUpdateDto)

const mwTeapotRest = { ADD, UPD }

export default mwTeapotRest
