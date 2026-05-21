import { zCarAddDto, zCarUpdateDto } from '../domain/zCarDtos.ts'
import spawnMiddlewareValidatorRest from '../../_utils/spawnMiddlewareValidatorRest.ts'

const ADD = spawnMiddlewareValidatorRest('body', zCarAddDto)
const UPD = spawnMiddlewareValidatorRest('body', zCarUpdateDto)

const mwCarRest = { ADD, UPD }

export default mwCarRest
