import bindSelf from '@yourock88/bind-self'
import Orm from '../../utils/Orm.js'
import accountsTable from '../../utils/tables/accountsTable.js'
import AccountRepositoryDb from '../repositories/AccountRepositoryDb.js'
import AuthService from '../../core/services/AuthService.js'
import AuthControllerRest from '../controllers/AuthControllerRest.js'
import AuthRouterRest from '../routers/AuthRouterRest.js'
import mwAuthRest from '../middlewares/mwAuthRest.js'

const accountsOrm = new Orm(accountsTable)
const accountRepositoryDb = new AccountRepositoryDb(accountsOrm)
const authService = new AuthService(accountRepositoryDb)
const authControllerRest = new AuthControllerRest(authService)
bindSelf(authControllerRest)
const authRouterRest = new AuthRouterRest(authControllerRest, mwAuthRest).router

export default authRouterRest

// import serv from './servDi.js'
// import AccountControllerIo from '../controllers/AccountControllerIo.js'
// import AccountRouterIo from '../routers/AccountRouterIo.js'
// import mwAccountIo from '../middlewares/mwAccountIo.js'
// const accountControllerIo = new AccountControllerIo(
//   accountService,
//   serv.getIo()
// )
// bindSelf(accountControllerIo)
// const accountRouterIo = new AccountRouterIo(accountControllerIo, mwAccountIo)
// bindSelf(accountRouterIo)
// export { accountRouterIo, accountRouterRest }
