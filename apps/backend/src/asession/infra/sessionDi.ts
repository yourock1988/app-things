import bindSelf from '@yourock88/bind-self'
import Orm from '../../_utils/Orm.js'
import sessionsTable from './sessionsTable.js'
import SessionRepositoryDb from './SessionRepositoryDb.js'
import SessionService from '../domain/SessionService.js'

import SessionControllerRest from '../pres/SessionControllerRest.js'
import SessionRouterRest from '../pres/SessionRouterRest.js'
import mwSessionRest from '../pres/mwSessionRest.js'
import IDrest from '../../_pres/IDrest.js'

const sessionsOrm = new Orm(sessionsTable)
const sessionRepositoryDb = new SessionRepositoryDb(sessionsOrm)
export const sessionService = new SessionService(sessionRepositoryDb)
const sessionControllerRest = new SessionControllerRest(sessionService)
bindSelf(sessionControllerRest)

export default function inject({ AUTHrest }) {
  const sessionRouterRest = new SessionRouterRest(sessionControllerRest, {
    ...mwSessionRest,
    ID: IDrest,
    AUTH: AUTHrest,
  }).router
  return sessionRouterRest
}
