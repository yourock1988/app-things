// схемы у аккаунта и у аутх должны быть разные
// аутх более урезанный вроде как должен быть

import { zAccountGetDto, zAccountAddDto } from '../../_domain/zAccountDtos.ts'
import compileMiddlewareRest from '../../_utils/compileMiddlewareRest.ts'

const SIGNUP = compileMiddlewareRest('body', zAccountAddDto)
const SIGNIN = compileMiddlewareRest('body', zAccountGetDto)

const mwAuthRest = { SIGNUP, SIGNIN }

export default mwAuthRest
