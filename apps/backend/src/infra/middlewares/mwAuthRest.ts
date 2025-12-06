import {
  zAuthSessionIdDto,
  zAuthSignInDto,
  zAuthSignUpDto,
} from '../../core/schemas/zAuthDtos.js'
import { TAuthSignInDto, TAuthSignUpDto } from '../../core/dtos/TAuthDtos.js'
import validateSchema from '../../utils/validateSchema.js'
import validateSchemaRestParams from '../../utils/validateSchemaRestParams.js'

const sessionId = validateSchemaRestParams(zAuthSessionIdDto)
const signUp = validateSchema<TAuthSignUpDto>(zAuthSignUpDto)
const signIn = validateSchema<TAuthSignInDto>(zAuthSignInDto)

const mwAuthRest = { sessionId, signUp, signIn }

export default mwAuthRest
