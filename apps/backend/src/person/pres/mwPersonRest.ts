import { zPersonAddDto, zPersonUpdateDto } from '../../_domain/zPersonDtos.ts'
import spawnMiddlewareValidatorRest from '../../_pres/spawnMiddlewareValidatorRest.ts'

const ADD = spawnMiddlewareValidatorRest('body', zPersonAddDto)
const UPD = spawnMiddlewareValidatorRest('body', zPersonUpdateDto)

const mwPersonRest = { ADD, UPD }

export default mwPersonRest
