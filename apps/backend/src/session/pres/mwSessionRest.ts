import {
  zSessionAddDto,
  zSessionUpdateDto,
} from '../../_domain/zSessionDtos.ts'
import compileMiddlewareRest from '../../_utils/compileMiddlewareRest.ts'

const ADD = compileMiddlewareRest('body', zSessionAddDto)
const UPD = compileMiddlewareRest('body', zSessionUpdateDto)

const mwSessionRest = { ADD, UPD }

export default mwSessionRest
