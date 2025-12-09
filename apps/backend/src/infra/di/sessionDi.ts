import bindSelf from '@yourock88/bind-self'
// import serv from './servDi.js'
import Orm from '../../utils/Orm.js'
import sessionsTable from '../../utils/tables/sessionsTable.js'
import SessionRepositoryDb from '../repositories/SessionRepositoryDb.js'
import SessionService from '../../core/services/SessionService.js'
import SessionControllerRest from '../controllers/SessionControllerRest.js'
// import SessionControllerIo from '../controllers/SessionControllerIo.js'
import SessionRouterRest from '../routers/SessionRouterRest.js'
// import SessionRouterIo from '../routers/SessionRouterIo.js'
import mwSessionRest from '../middlewares/mwSessionRest.js'
import ID from '../middlewares/ID.js'
import { AUTH } from './authDi.js'
// import mwSessionIo from '../middlewares/mwSessionIo.js'

const sessionsOrm = new Orm(sessionsTable)
const sessionRepositoryDb = new SessionRepositoryDb(sessionsOrm)
const sessionService = new SessionService(sessionRepositoryDb)

const sessionControllerRest = new SessionControllerRest(sessionService)
bindSelf(sessionControllerRest)
const sessionRouterRest = new SessionRouterRest(sessionControllerRest, {
  ...mwSessionRest,
  ID,
  AUTH,
}).router

// const sessionControllerIo = new SessionControllerIo(
//   sessionService,
//   serv.getIo()
// )
// bindSelf(sessionControllerIo)
// const sessionRouterIo = new SessionRouterIo(sessionControllerIo, mwSessionIo)
// bindSelf(sessionRouterIo)

// export { sessionRouterIo, sessionRouterRest }

export default sessionRouterRest
