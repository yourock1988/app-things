import { zTeapotAddDto, zTeapotUpdateDto } from '../domain/zTeapotDtos.ts'
import compileMiddlewareRest from '../../_utils/compileMiddlewareRest.ts'

const ADD = compileMiddlewareRest('body', zTeapotAddDto)
const UPD = compileMiddlewareRest('body', zTeapotUpdateDto)

const mwTeapotRest = { ADD, UPD }

export default mwTeapotRest
