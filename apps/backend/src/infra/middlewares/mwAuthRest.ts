import {
  zAccountGetDto,
  zAccountAddDto,
} from '../../core/schemas/zAccountDtos.js'
import { TAccountAddDto, TAccountGetDto } from '../../core/dtos/TAccountDtos.js'
import validateSchema from '../../utils/validateSchema.js'

const SIGNUP = validateSchema<TAccountAddDto>(zAccountAddDto)
const SIGNIN = validateSchema<TAccountGetDto>(zAccountGetDto)

const mwAuthRest = { SIGNUP, SIGNIN }

export default mwAuthRest
