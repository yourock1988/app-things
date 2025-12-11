import {
  zSessionAddDto,
  zSessionUpdateDto,
} from '../../core/schemas/zSessionDtos.js'
import compileMiddlewareRest from '../../utils/compileMiddlewareRest.js'

const ADD = compileMiddlewareRest('body', zSessionAddDto)
const UPD = compileMiddlewareRest('body', zSessionUpdateDto)

const mwSessionRest = { ADD, UPD }

export default mwSessionRest
