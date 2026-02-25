import bindSelf from '@yourock88/bind-self'
// import serv from './servDi.js'
import Orm from '../../utils/Orm.js'
import accountsTable from '../../utils/tables/accountsTable.js'
import AccountRepositoryDb from '../repositories/AccountRepositoryDb.js'
import AccountService from '../../core/services/AccountService.js'
import AccountControllerRest from '../controllers/AccountControllerRest.js'
// import AccountControllerIo from '../controllers/AccountControllerIo.js'
import AccountRouterRest from '../routers/AccountRouterRest.js'
// import AccountRouterIo from '../routers/AccountRouterIo.js'
import mwAccountRest from '../middlewares/mwAccountRest.js'
import ID from '../middlewares/ID.js'
import { AUTHrest } from './authDi.js'
// import mwAccountIo from '../middlewares/mwAccountIo.js'

const accountsOrm = new Orm(accountsTable)
const accountRepositoryDb = new AccountRepositoryDb(accountsOrm)
const accountService = new AccountService(accountRepositoryDb)

const accountControllerRest = new AccountControllerRest(accountService)
bindSelf(accountControllerRest)
const accountRouterRest = new AccountRouterRest(accountControllerRest, {
  ...mwAccountRest,
  ID,
  AUTH: AUTHrest,
}).router

// const accountControllerIo = new AccountControllerIo(
//   accountService,
//   serv.getIo()
// )
// bindSelf(accountControllerIo)
// const accountRouterIo = new AccountRouterIo(accountControllerIo, mwAccountIo)
// bindSelf(accountRouterIo)

// export { accountRouterIo, accountRouterRest }

export default accountRouterRest
