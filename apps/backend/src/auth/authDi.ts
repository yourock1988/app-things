import bindSelf from '@yourock88/bind-self'
import type { Router as TRouter } from 'express'
import type IAccountService from '../_domain/IAccountService.ts'
import type ISessionService from '../_domain/ISessionService.ts'
import AuthService from './domain/AuthService.ts'
import AuthControllerRest from './pres/AuthControllerRest.ts'
import newAuthRouterRest from './pres/AuthRouterRest.ts'
import mwAuthRest from './pres/mwAuthRest.ts'

export default function authDi(
  Router: typeof TRouter,
  accountService: IAccountService,
  sessionService: ISessionService,
): {
  authService: AuthService
  authRouterRest: TRouter
} {
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
