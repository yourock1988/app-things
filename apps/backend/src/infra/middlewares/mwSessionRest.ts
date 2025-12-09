import {
  zSessionAddDto,
  zSessionUpdateDto,
} from '../../core/schemas/zSessionDtos.js'
import {
  TSessionAddDto,
  TSessionUpdateDto,
} from '../../core/dtos/TSessionDtos.js'
import validateSchema from '../../utils/validateSchema.js'

import validateSchemaRestParams from '../../utils/validateSchemaRestParams.js'
import zParamsIdDto from '../../core/schemas/zParamsIdDto.js'
import { authMW as AUTH } from '../di/authDi.js'

const ID = validateSchemaRestParams(zParamsIdDto)
const ADD = validateSchema<TSessionAddDto>(zSessionAddDto)
const UPD = validateSchema<TSessionUpdateDto>(zSessionUpdateDto)

const mwSessionRest = { ID, ADD, UPD, AUTH }

export default mwSessionRest
