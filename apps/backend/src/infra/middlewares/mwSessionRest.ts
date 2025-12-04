import {
  zSessionAddDto,
  zSessionUpdateDto,
} from '../../core/schemas/zSessionDtos.js'
import {
  TSessionAddDto,
  TSessionUpdateDto,
} from '../../core/dtos/TSessionDtos.js'
import validateSchema from '../../utils/validateSchema.js'

const sessionAdd = validateSchema<TSessionAddDto>(zSessionAddDto)
const sessionUpdate = validateSchema<TSessionUpdateDto>(zSessionUpdateDto)

const mwSessionRest = { sessionAdd, sessionUpdate }

export default mwSessionRest
