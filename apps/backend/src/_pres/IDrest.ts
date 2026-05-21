import spawnMiddlewareValidatorRest from './spawnMiddlewareValidatorRest.ts'
import zParamsIdDto from '../_domain/zParamsIdDto.ts'

const IDrest = spawnMiddlewareValidatorRest('params', zParamsIdDto)

export default IDrest
