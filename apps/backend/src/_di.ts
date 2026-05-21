import { Router } from 'express'
import Orm from './_utils/Orm.ts'
import authistDi from './_pres/authistDi.ts'
import authDi from './auth/authDi.ts'
import accountDi from './account/accountDi.ts'
import sessionDi from './session/sessionDi.ts'
import teapotDi from './teapot/teapotDi.ts'
import personDi from './person/personDi.ts'
import carDi from './car/carDi.ts'
import sharedMiddlewaresDi from './_pres/sharedMiddlewaresDi.ts'

const sharedMws = sharedMiddlewaresDi()
const { accountService, accountDiExtra } = accountDi(Router, Orm)
const { sessionService, sessionDiExtra } = sessionDi(Router, Orm)
const { authService, authRouterRest } = authDi(
  Router,
  accountService,
  sessionService,
)
const authist = authistDi(authService)

const accountRouterRest = accountDiExtra(authist, sharedMws)
const sessionRouterRest = sessionDiExtra(authist, sharedMws)
const { personRouterIo, personRouterRest, personService } = personDi(
  Router,
  Orm,
  authist,
  sharedMws,
)
const { carRouterIo, carRouterRest } = carDi(
  Router,
  Orm,
  authist,
  personService,
  sharedMws,
)
const { teapotRouterIo, teapotRouterRest } = teapotDi(
  Router,
  Orm,
  authist,
  sharedMws,
)

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
