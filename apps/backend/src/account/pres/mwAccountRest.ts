import {
  zAccountAddDto,
  zAccountUpdFullDto,
} from '../../_domain/zAccountDtos.ts'
import spawnMiddlewareValidatorRest from '../../_pres/spawnMiddlewareValidatorRest.ts'

const ADD = spawnMiddlewareValidatorRest('body', zAccountAddDto)
const UPD = spawnMiddlewareValidatorRest('body', zAccountUpdFullDto)

const mwAccountRest = { ADD, UPD }

export default mwAccountRest
