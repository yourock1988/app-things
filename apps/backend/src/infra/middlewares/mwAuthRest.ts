import {
  zAuthSessionIdDto,
  zAuthSignInDto,
  zAuthSignUpDto,
} from '../../core/schemas/zAuthDtos.js'
import { TAuthSignInDto, TAuthSignUpDto } from '../../core/dtos/TAuthDtos.js'
import validateSchema from '../../utils/validateSchema.js'
import validateSchemaRestParams from '../../utils/validateSchemaRestParams.js'

const SESSID = validateSchemaRestParams(zAuthSessionIdDto)
const SIGNUP = validateSchema<TAuthSignUpDto>(zAuthSignUpDto)
const SIGNIN = validateSchema<TAuthSignInDto>(zAuthSignInDto)

const mwAuthRest = { SESSID, SIGNUP, SIGNIN }

export default mwAuthRest
