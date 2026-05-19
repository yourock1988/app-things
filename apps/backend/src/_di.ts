import { Router } from 'express'
import Orm from './_utils/Orm.js'
import authistDi from './_infra/authistDi.js'
import authDi from './auth/authDi.js'
import accountDi from './account/accountDi.js'
import sessionDi from './session/sessionDi.js'
import teapotDi from './teapot/teapotDi.js'
import personDi from './person/personDi.js'
import carDi from './car/carDi.js'

const { accountService, accountDiExtra } = accountDi(Router, Orm)
const { sessionService, sessionDiExtra } = sessionDi(Router, Orm)
const { authService, authRouterRest } = authDi(
  Router,
  accountService,
  sessionService,
)
const authist = authistDi(authService)

const accountRouterRest = accountDiExtra(authist)
const sessionRouterRest = sessionDiExtra(authist)
const { personRouterIo, personRouterRest, personService } = personDi(
  Router,
  Orm,
  authist,
)
const { carRouterIo, carRouterRest } = carDi(
  Router,
  Orm,
  authist,
  personService,
)
const { teapotRouterIo, teapotRouterRest } = teapotDi(Router, Orm, authist)

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
