import bindSelf from '@yourock88/bind-self'
// import Orm from '../../utils/Orm.js'
// import sessionsTable from '../../utils/tables/sessionsTable.js'
// import SessionRepositoryDb from '../repositories/SessionRepositoryDb.js'
// import SessionService from '../../core/services/SessionService.js'
import SessionControllerRest from '../controllers/SessionControllerRest.js'
import SessionRouterRest from '../routers/SessionRouterRest.js'
import mwSessionRest from '../middlewares/mwSessionRest.js'
import IDrest from '../middlewares/IDrest.js'
import { sessionService, AUTHrest } from './authDi.js'

// const sessionsOrm = new Orm(sessionsTable)
// const sessionRepositoryDb = new SessionRepositoryDb(sessionsOrm)
// const sessionService = new SessionService(sessionRepositoryDb)

const sessionControllerRest = new SessionControllerRest(sessionService)
bindSelf(sessionControllerRest)
const sessionRouterRest = new SessionRouterRest(sessionControllerRest, {
  ...mwSessionRest,
  ID: IDrest,
  AUTH: AUTHrest,
}).router

export default sessionRouterRest
