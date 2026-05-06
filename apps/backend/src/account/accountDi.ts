import bindSelf from '@yourock88/bind-self'
import type { ClassOf } from '../_utils/ClassOf.js'
import type TAuthist from '../_pres/TAuthist.js'
import type TOrm from '../_utils/Orm.js'
import IDrest from '../_pres/IDrest.js'
import Account from './domain/Account.js'
import AccountService from './domain/AccountService.js'
import AccountMapper from './infra/AccountMapper.js'
import accountsTable from './infra/accountsTable.js'
import AccountRepositoryDb from './infra/AccountRepositoryDb.js'
import AccountControllerRest from './pres/AccountControllerRest.js'
import AccountRouterRest from './pres/AccountRouterRest.js'
import mwAccountRest from './pres/mwAccountRest.js'

export default function accountDi(Orm: ClassOf<TOrm>) {
  const accountsOrm = new Orm(accountsTable)
  const accountMapper = new AccountMapper(Account)
  bindSelf(accountMapper)
  const accountRepositoryDb = new AccountRepositoryDb(
    accountsOrm,
    accountMapper,
  )
  const accountService = new AccountService(accountRepositoryDb)
  function accountDiExtra(authist: TAuthist) {
    const { AUTHrest } = authist
    const mwRest = { ...mwAccountRest, ID: IDrest, AUTH: AUTHrest }
    const accountControllerRest = new AccountControllerRest(accountService)
    bindSelf(accountControllerRest)
    const accountRouterRest = new AccountRouterRest(
      accountControllerRest,
      mwRest,
    ).router
    return accountRouterRest
  }
  return { accountService, accountDiExtra }
}
