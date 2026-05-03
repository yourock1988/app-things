import bindSelf from '@yourock88/bind-self'
import Orm from '../_utils/Orm.js'
import accountsTable from './infra/accountsTable.js'
import AccountRepositoryDb from './infra/AccountRepositoryDb.js'
import AccountService from './domain/AccountService.js'

import AccountControllerRest from './pres/AccountControllerRest.js'
import AccountRouterRest from './pres/AccountRouterRest.js'
import mwAccountRest from './pres/mwAccountRest.js'
import IDrest from '../_pres/IDrest.js'

const accountsOrm = new Orm(accountsTable)
const accountRepositoryDb = new AccountRepositoryDb(accountsOrm)
export const accountService = new AccountService(accountRepositoryDb)
const accountControllerRest = new AccountControllerRest(accountService)
bindSelf(accountControllerRest)

export default function inject({ AUTHrest }) {
  const accountRouterRest = new AccountRouterRest(accountControllerRest, {
    ...mwAccountRest,
    ID: IDrest,
    AUTH: AUTHrest,
  }).router
  return accountRouterRest
}
