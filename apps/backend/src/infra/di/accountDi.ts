import bindSelf from '@yourock88/bind-self'
// import Orm from '../../utils/Orm.js'
// import accountsTable from '../../utils/tables/accountsTable.js'
// import AccountRepositoryDb from '../repositories/AccountRepositoryDb.js'
// import AccountService from '../../core/services/AccountService.js'
import AccountControllerRest from '../controllers/AccountControllerRest.js'
import AccountRouterRest from '../routers/AccountRouterRest.js'
import mwAccountRest from '../middlewares/mwAccountRest.js'
import IDrest from '../middlewares/IDrest.js'
import { accountService, AUTHrest } from './authDi.js'

// const accountsOrm = new Orm(accountsTable)
// const accountRepositoryDb = new AccountRepositoryDb(accountsOrm)
// const accountService = new AccountService(accountRepositoryDb)

const accountControllerRest = new AccountControllerRest(accountService)
bindSelf(accountControllerRest)
const accountRouterRest = new AccountRouterRest(accountControllerRest, {
  ...mwAccountRest,
  ID: IDrest,
  AUTH: AUTHrest,
}).router

export default accountRouterRest
