import {
  zSessionAddDto,
  zSessionUpdateDto,
} from '../../core/schemas/zSessionDtos.js'
import {
  TSessionAddDto,
  TSessionUpdateDto,
} from '../../core/dtos/TSessionDtos.js'
import validateSchema from '../../utils/validateSchema.js'

import { authMW as AUTH } from '../di/authDi.js'

const ADD = validateSchema<TSessionAddDto>(zSessionAddDto)
const UPD = validateSchema<TSessionUpdateDto>(zSessionUpdateDto)

const mwSessionRest = { ADD, UPD, AUTH }

export default mwSessionRest
