import {
  zTeapotAddDto,
  zTeapotUpdateDto,
} from '../../core/schemas/zTeapotDtos.js'
import compileMiddlewareRest from '../../utils/compileMiddlewareRest.js'

const ADD = compileMiddlewareRest('body', zTeapotAddDto)
const UPD = compileMiddlewareRest('body', zTeapotUpdateDto)

const mwTeapotRest = { ADD, UPD }

export default mwTeapotRest
