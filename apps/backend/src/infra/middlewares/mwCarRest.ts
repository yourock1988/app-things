import { zCarAddDto, zCarUpdateDto } from '../../core/schemas/zCarDtos.js'
import compileMiddlewareRest from '../../utils/compileMiddlewareRest.js'

const ADD = compileMiddlewareRest('body', zCarAddDto)
const UPD = compileMiddlewareRest('body', zCarUpdateDto)

const mwCarRest = { ADD, UPD }

export default mwCarRest
