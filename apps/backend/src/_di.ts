import Orm from './_utils/Orm.js'
import inject1 from './auth/authDi.js'
import inject2 from './_infra/authistDi.js'
import inject3 from './account/accountDi.js'
import inject4 from './session/sessionDi.js'
import inject5 from './car/carDi.js'
import inject6 from './person/personDi.js'
import inject7 from './teapot/teapotDi.js'

const { accountService, extra: injectAccount } = inject3(Orm)
const { sessionService, extra: injectService } = inject4(Orm)
const { authService, authRouterRest } = inject1(accountService, sessionService)

const authist = inject2(authService)
const accountRouterRest = injectAccount(authist)
const sessionRouterRest = injectService(authist)
const { carRouterIo, carRouterRest } = inject5(Orm, authist)
const { personRouterIo, personRouterRest } = inject6(Orm, authist)
const { teapotRouterIo, teapotRouterRest } = inject7(Orm, authist)

export {
  authist,
  authRouterRest,
  accountRouterRest,
  sessionRouterRest,
  carRouterIo,
  carRouterRest,
  personRouterIo,
  personRouterRest,
  teapotRouterIo,
  teapotRouterRest,
}
