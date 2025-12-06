import {
  zAuthSessionIdDto,
  zAuthSignUpDto,
} from '../../core/schemas/zAuthDtos.js'
import { TAuthSignUpDto } from '../../core/dtos/TAuthDtos.js'
import validateSchema from '../../utils/validateSchema.js'
import validateSchemaRestParams from '../../utils/validateSchemaRestParams.js'

const sessionId = validateSchemaRestParams(zAuthSessionIdDto)
const signUp = validateSchema<TAuthSignUpDto>(zAuthSignUpDto)

const mwAuthRest = { sessionId, signUp }

export default mwAuthRest
