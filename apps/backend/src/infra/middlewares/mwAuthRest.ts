import {
  zAccountGetDto,
  zAccountAddDto,
  zAuthSessionIdDto,
} from '../../core/schemas/zAccountDtos.js'
import validateSchema from '../../utils/validateSchema.js'
import validateSchemaRestParams from '../../utils/validateSchemaRestParams.js'
import { TAccountAddDto, TAccountGetDto } from '../../core/dtos/TAccountDtos.js'

const SESSID = validateSchemaRestParams(zAuthSessionIdDto)
const SIGNUP = validateSchema<TAccountAddDto>(zAccountAddDto)
const SIGNIN = validateSchema<TAccountGetDto>(zAccountGetDto)

const mwAuthRest = { SESSID, SIGNUP, SIGNIN }

export default mwAuthRest
