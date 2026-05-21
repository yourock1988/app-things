import { zCarAddDto, zCarUpdateDto } from '../domain/zCarDtos.ts'
import spawnMiddlewareValidatorIo from '../../_pres/spawnMiddlewareValidatorIo.ts'

const ADD = spawnMiddlewareValidatorIo('body', zCarAddDto)
const UPD = spawnMiddlewareValidatorIo('body', zCarUpdateDto)

const mwCarIo = { ADD, UPD }

export default mwCarIo
