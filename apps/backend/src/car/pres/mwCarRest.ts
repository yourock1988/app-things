import { zCarAddDto, zCarUpdateDto } from '../domain/zCarDtos.js'
import compileMiddlewareRest from '../../_utils/compileMiddlewareRest.js'

const ADD = compileMiddlewareRest('body', zCarAddDto)
const UPD = compileMiddlewareRest('body', zCarUpdateDto)

const mwCarRest = { ADD, UPD }

export default mwCarRest
