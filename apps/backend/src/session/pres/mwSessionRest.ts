import {
  zSessionAddDto,
  zSessionUpdateDto,
} from '../../_domain/zSessionDtos.ts'
import spawnMiddlewareValidatorRest from '../../_pres/spawnMiddlewareValidatorRest.ts'

const ADD = spawnMiddlewareValidatorRest('body', zSessionAddDto)
const UPD = spawnMiddlewareValidatorRest('body', zSessionUpdateDto)

const mwSessionRest = { ADD, UPD }

export default mwSessionRest
