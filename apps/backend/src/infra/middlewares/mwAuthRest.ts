import {
  zAccountGetDto,
  zAccountAddDto,
} from '../../core/schemas/zAccountDtos.js'
import zCookiesSessIdDto from '../../core/schemas/zCookiesSessIdDto.js'
import validateSchema from '../../utils/validateSchema.js'
import validateSchemaRestParams from '../../utils/validateSchemaRestParams.js'
import { TAccountAddDto, TAccountGetDto } from '../../core/dtos/TAccountDtos.js'

const SESSID = validateSchemaRestParams(zCookiesSessIdDto)
const SIGNUP = validateSchema<TAccountAddDto>(zAccountAddDto)
const SIGNIN = validateSchema<TAccountGetDto>(zAccountGetDto)

const mwAuthRest = { SESSID, SIGNUP, SIGNIN }

export default mwAuthRest
