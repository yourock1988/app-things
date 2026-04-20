import bindSelf from '@yourock88/bind-self'
import Orm from '../../utils/Orm.js'
import accountsTable from '../../utils/tables/accountsTable.js'
import AccountRepositoryDb from '../repositories/AccountRepositoryDb.js'
import AuthService from '../../core/services/AuthService.js'
import AuthControllerRest from '../controllers/AuthControllerRest.js'
import AuthRouterRest from '../routers/AuthRouterRest.js'
import mwAuthRest from '../middlewares/mwAuthRest.js'
import SessionRepositoryDb from '../repositories/SessionRepositoryDb.js'
import sessionsTable from '../../utils/tables/sessionsTable.js'
import mwAuthorizeRest from '../middlewares/mwAuthorizeRest.js'
import mwAuthenticateIo from '../middlewares/mwAuthenticateIo.js'
import mwAuthorizeIo from '../middlewares/mwAuthorizeIo.js'
import AccountService from '../../core/services/AccountService.js'
import SessionService from '../../core/services/SessionService.js'

const accountsOrm = new Orm(accountsTable)
const sessionsOrm = new Orm(sessionsTable)
const accountRepositoryDb = new AccountRepositoryDb(accountsOrm)
const sessionRepositoryDb = new SessionRepositoryDb(sessionsOrm)
const accountService = new AccountService(accountRepositoryDb)
const sessionService = new SessionService(sessionRepositoryDb)
const authService = new AuthService(accountService, sessionService)
const authControllerRest = new AuthControllerRest(authService)
const AUTHrest = mwAuthorizeRest(authService, accountService)
const AUTHNio = mwAuthenticateIo(authService)
const AUTHZio = mwAuthorizeIo(authService, accountService)

bindSelf(authControllerRest)

const authRouterRest = new AuthRouterRest(authControllerRest, mwAuthRest).router

export {
  accountService,
  sessionService,
  authRouterRest,
  AUTHrest,
  AUTHZio,
  AUTHNio,
}
