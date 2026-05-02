import inject1 from './auth/infra/authDi.js'
import inject2 from './_infra/authistDi.js'
import inject3, { accountService } from './account/infra/accountDi.js'
import inject4, { sessionService } from './asession/infra/sessionDi.js'

const { authService, authRouterRest } = inject1(accountService, sessionService)

const authist = inject2(authService)

const accountRouterRest = inject3(authist)
const sessionRouterRest = inject4(authist)

export { authist, authRouterRest, accountRouterRest, sessionRouterRest }
