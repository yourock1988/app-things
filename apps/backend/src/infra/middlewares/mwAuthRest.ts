import {
  zAccountGetDto,
  zAccountAddDto,
} from '../../core/schemas/zAccountDtos.js'
import compileMiddlewareRest from '../../utils/compileMiddlewareRest.js'

const SIGNUP = compileMiddlewareRest('body', zAccountAddDto)
const SIGNIN = compileMiddlewareRest('body', zAccountGetDto)

const mwAuthRest = { SIGNUP, SIGNIN }

export default mwAuthRest
