import bindSelf from '@yourock88/bind-self'
import type { Router as TRouter } from 'express'
import type IAccountService from '../_domain/IAccountService.js'
import type ISessionService from '../_domain/ISessionService.js'
import AuthService from './domain/AuthService.js'
import AuthControllerRest from './pres/AuthControllerRest.js'
import newAuthRouterRest from './pres/AuthRouterRest.js'
import mwAuthRest from './pres/mwAuthRest.js'

export default function authDi(
  Router: typeof TRouter,
  accountService: IAccountService,
  sessionService: ISessionService,
) {
  const authService = new AuthService(accountService, sessionService)
  const authControllerRest = new AuthControllerRest(authService)

  bindSelf(authService)
  bindSelf(authControllerRest)

  const authRouterRest = newAuthRouterRest(
    Router,
    authControllerRest,
    mwAuthRest,
  )

  return {
    authService,
    authRouterRest,
  }
}
