import { zCarAddDto, zCarUpdateDto } from '../domain/zCarDtos.ts'
import compileMiddlewareRest from '../../_utils/compileMiddlewareRest.ts'

const ADD = compileMiddlewareRest('body', zCarAddDto)
const UPD = compileMiddlewareRest('body', zCarUpdateDto)

const mwCarRest = { ADD, UPD }

export default mwCarRest
