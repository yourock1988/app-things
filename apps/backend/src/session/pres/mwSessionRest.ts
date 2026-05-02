import {
  zSessionAddDto,
  zSessionUpdateDto,
} from '../../_domain/zSessionDtos.js'
import compileMiddlewareRest from '../../_utils/compileMiddlewareRest.js'

const ADD = compileMiddlewareRest('body', zSessionAddDto)
const UPD = compileMiddlewareRest('body', zSessionUpdateDto)

const mwSessionRest = { ADD, UPD }

export default mwSessionRest
