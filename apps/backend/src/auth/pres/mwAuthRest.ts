// схемы у аккаунта и у аутх должны быть разные
// аутх более урезанный вроде как должен быть

import { zAccountGetDto, zAccountAddDto } from '../../_domain/zAccountDtos.ts'
import spawnMiddlewareValidatorRest from '../../_pres/spawnMiddlewareValidatorRest.ts'

const SIGNUP = spawnMiddlewareValidatorRest('body', zAccountAddDto)
const SIGNIN = spawnMiddlewareValidatorRest('body', zAccountGetDto)

const mwAuthRest = { SIGNUP, SIGNIN }

export default mwAuthRest
