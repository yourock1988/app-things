import spawnMiddlewareValidatorRest from '../_utils/spawnMiddlewareValidatorRest.ts'
import zParamsIdDto from '../_domain/zParamsIdDto.ts'

const IDrest = spawnMiddlewareValidatorRest('params', zParamsIdDto)

export default IDrest
