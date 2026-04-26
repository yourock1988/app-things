import bindSelf from '@yourock88/bind-self'
import AccountControllerRest from '../controllers/AccountControllerRest.js'
import AccountRouterRest from '../routers/AccountRouterRest.js'
import mwAccountRest from '../middlewares/mwAccountRest.js'
import IDrest from '../middlewares/IDrest.js'
import { accountService, AUTHrest } from './authDi.js'

const accountControllerRest = new AccountControllerRest(accountService)
bindSelf(accountControllerRest)
const accountRouterRest = new AccountRouterRest(accountControllerRest, {
  ...mwAccountRest,
  ID: IDrest,
  AUTH: AUTHrest,
}).router

export default accountRouterRest
