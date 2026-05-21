import { zTeapotAddDto, zTeapotUpdateDto } from '../domain/zTeapotDtos.ts'
import spawnMiddlewareValidatorRest from '../../_pres/spawnMiddlewareValidatorRest.ts'

const ADD = spawnMiddlewareValidatorRest('body', zTeapotAddDto)
const UPD = spawnMiddlewareValidatorRest('body', zTeapotUpdateDto)

const mwTeapotRest = { ADD, UPD }

export default mwTeapotRest
