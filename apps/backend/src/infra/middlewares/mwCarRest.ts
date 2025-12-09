import { zCarAddDto, zCarUpdateDto } from '../../core/schemas/zCarDtos.js'
import { TCarAddDto, TCarUpdateDto } from '../../core/dtos/TCarDtos.js'
import validateSchema from '../../utils/validateSchema.js'

import { authMW as AUTH } from '../di/authDi.js'

const ADD = validateSchema<TCarAddDto>(zCarAddDto)
const UPD = validateSchema<TCarUpdateDto>(zCarUpdateDto)

const mwCarRest = { ADD, UPD, AUTH }

export default mwCarRest
