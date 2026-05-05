import Orm from './_utils/Orm.js'
import inject1 from './auth/authDi.js'
import inject2 from './_infra/authistDi.js'
import inject3, { accountService } from './account/accountDi.js'
import inject4, { sessionService } from './session/sessionDi.js'
import inject5 from './car/carDi.js'
import inject6 from './person/personDi.js'

const { authService, authRouterRest } = inject1(accountService, sessionService)

const authist = inject2(authService)

const accountRouterRest = inject3(authist)
const sessionRouterRest = inject4(authist)

const { carRouterIo, carRouterRest } = inject5(Orm, authist)
const { personRouterIo, personRouterRest } = inject6(Orm, authist)

export {
  authist,
  authRouterRest,
  accountRouterRest,
  sessionRouterRest,
  carRouterIo,
  carRouterRest,
  personRouterIo,
  personRouterRest,
}
