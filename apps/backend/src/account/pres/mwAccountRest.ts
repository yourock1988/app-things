import {
  zAccountAddDto,
  zAccountUpdFullDto,
} from '../../_domain/zAccountDtos.ts'
import compileMiddlewareRest from '../../_utils/compileMiddlewareRest.ts'

const ADD = compileMiddlewareRest('body', zAccountAddDto)
const UPD = compileMiddlewareRest('body', zAccountUpdFullDto)

const mwAccountRest = { ADD, UPD }

export default mwAccountRest
