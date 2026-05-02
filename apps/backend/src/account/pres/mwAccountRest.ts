import {
  zAccountAddDto,
  zAccountUpdFullDto,
} from '../../_domain/zAccountDtos.js'
import compileMiddlewareRest from '../../_utils/compileMiddlewareRest.js'

const ADD = compileMiddlewareRest('body', zAccountAddDto)
const UPD = compileMiddlewareRest('body', zAccountUpdFullDto)

const mwAccountRest = { ADD, UPD }

export default mwAccountRest
