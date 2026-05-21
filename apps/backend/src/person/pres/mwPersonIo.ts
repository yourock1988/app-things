import { zPersonAddDto, zPersonUpdateDto } from '../../_domain/zPersonDtos.ts'
import spawnMiddlewareValidatorIo from '../../_utils/spawnMiddlewareValidatorIo.ts'

const ADD = spawnMiddlewareValidatorIo('body', zPersonAddDto)
const UPD = spawnMiddlewareValidatorIo('body', zPersonUpdateDto)

const mwPersonIo = { ADD, UPD }

export default mwPersonIo
