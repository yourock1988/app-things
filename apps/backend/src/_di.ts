import Orm from './_utils/Orm.js'
import authistDi from './_infra/authistDi.js'
import authDi from './auth/authDi.js'
import accountDi from './account/accountDi.js'
import sessionDi from './session/sessionDi.js'
import teapotDi from './teapot/teapotDi.js'
import personDi from './person/personDi.js'
import carDi from './car/carDi.js'

const { accountService, accountDiExtra } = accountDi(Orm)
const { sessionService, sessionDiExtra } = sessionDi(Orm)
const { authService, authRouterRest } = authDi(accountService, sessionService)
const authist = authistDi(authService)

const accountRouterRest = accountDiExtra(authist)
const sessionRouterRest = sessionDiExtra(authist)
const { carRouterIo, carRouterRest } = carDi(Orm, authist)
const { personRouterIo, personRouterRest } = personDi(Orm, authist)
const { teapotRouterIo, teapotRouterRest } = teapotDi(Orm, authist)

export {
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
