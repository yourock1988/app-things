import bindSelf from '@yourock88/bind-self'
import type { Router as TRouter } from 'express'
import type TAuthist from '../_pres/TAuthist.ts'
import type TOrm from '../_utils/Orm.ts'
import IDrest from '../_pres/IDrest.ts'
import Session from './domain/Session.ts'
import SessionService from './domain/SessionService.ts'
import SessionMapper from './infra/SessionMapper.ts'
import sessionsTable from './infra/sessionsTable.ts'
import SessionRepositoryDb from './infra/SessionRepositoryDb.ts'
import SessionControllerRest from './pres/SessionControllerRest.ts'
import newSessionRouterRest from './pres/SessionRouterRest.ts'
import mwSessionRest from './pres/mwSessionRest.ts'

export default function sessionDi(Router: typeof TRouter, Orm: typeof TOrm) {
  const sessionsOrm = new Orm(sessionsTable)
  const sessionMapper = new SessionMapper(Session)
  bindSelf(sessionMapper)
  const sessionRepositoryDb = new SessionRepositoryDb(
    sessionsOrm,
    sessionMapper,
  )
  const sessionService = new SessionService(sessionRepositoryDb)
  function sessionDiExtra(authist: TAuthist) {
    const { AUTHrest } = authist
    const mwRest = { ...mwSessionRest, ID: IDrest, AUTH: AUTHrest }
    const sessionControllerRest = new SessionControllerRest(sessionService)
    bindSelf(sessionControllerRest)
    const sessionRouterRest = newSessionRouterRest(
      Router,
      sessionControllerRest,
      mwRest,
    )
    return sessionRouterRest
  }
  return { sessionService, sessionDiExtra }
}
