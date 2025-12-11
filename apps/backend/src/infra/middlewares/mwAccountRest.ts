import {
  zAccountAddDto,
  zAccountUpdInfoDto,
} from '../../core/schemas/zAccountDtos.js'
import compileMiddlewareRest from '../../utils/compileMiddlewareRest.js'

const ADD = compileMiddlewareRest('body', zAccountAddDto)
const UPD = compileMiddlewareRest('body', zAccountUpdInfoDto)

const mwAccountRest = { ADD, UPD }

export default mwAccountRest
