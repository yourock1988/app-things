import { zTeapotAddDto, zTeapotUpdateDto } from '../domain/zTeapotDtos.ts'
import spawnMiddlewareValidatorIo from '../../_utils/spawnMiddlewareValidatorIo.ts'

const ADD = spawnMiddlewareValidatorIo('body', zTeapotAddDto)
const UPD = spawnMiddlewareValidatorIo('body', zTeapotUpdateDto)

const mwTeapotIo = { ADD, UPD }

export default mwTeapotIo
