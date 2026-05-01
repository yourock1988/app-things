import inject1 from './auth/infra/authDi.js'
import inject2 from './_infra/authistDi.js'
import { accountService, sessionService } from './infra/di/authDi.js'

const { authService, authRouterRest } = inject1(accountService, sessionService)

const authist = inject2(authService)

export { authist, authRouterRest }
