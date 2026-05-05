import bindSelf from '@yourock88/bind-self'
import type { ClassOf } from '../_utils/ClassOf.js'
import type TAuthist from '../_pres/TAuthist.js'
import type TOrm from '../_utils/Orm.js'
import IDrest from '../_pres/IDrest.js'
import Session from './domain/Session.js'
import SessionService from './domain/SessionService.js'
import SessionMapper from './infra/SessionMapper.js'
import sessionsTable from './infra/sessionsTable.js'
import SessionRepositoryDb from './infra/SessionRepositoryDb.js'
import SessionControllerRest from './pres/SessionControllerRest.js'
import SessionRouterRest from './pres/SessionRouterRest.js'
import mwSessionRest from './pres/mwSessionRest.js'

export default function inject(Orm: ClassOf<TOrm>) {
  const sessionsOrm = new Orm(sessionsTable)
  const sessionMapper = new SessionMapper(Session)
  bindSelf(sessionMapper)
  const sessionRepositoryDb = new SessionRepositoryDb(
    sessionsOrm,
    sessionMapper,
  )
  const sessionService = new SessionService(sessionRepositoryDb)
  function extra(authist: TAuthist) {
    const { AUTHrest } = authist
    const mwRest = { ...mwSessionRest, ID: IDrest, AUTH: AUTHrest }
    const sessionControllerRest = new SessionControllerRest(sessionService)
    bindSelf(sessionControllerRest)
    const sessionRouterRest = new SessionRouterRest(
      sessionControllerRest,
      mwRest,
    ).router
    return sessionRouterRest
  }
  return { sessionService, extra }
}
