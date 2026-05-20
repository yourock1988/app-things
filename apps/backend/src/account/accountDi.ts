import bindSelf from '@yourock88/bind-self'
import type { Router as TRouter } from 'express'
import type { TAuthist } from '../_pres/TAuthist.ts'
import type TOrm from '../_utils/Orm.ts'
import IDrest from '../_pres/IDrest.ts'
import Account from './domain/Account.ts'
import AccountService from './domain/AccountService.ts'
import AccountMapper from './infra/AccountMapper.ts'
import accountsTable from './infra/accountsTable.ts'
import AccountRepositoryDb from './infra/AccountRepositoryDb.ts'
import AccountControllerRest from './pres/AccountControllerRest.ts'
import newAccountRouterRest from './pres/AccountRouterRest.ts'
import mwAccountRest from './pres/mwAccountRest.ts'

export default function accountDi(Router: typeof TRouter, Orm: typeof TOrm) {
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
    const accountRouterRest = newAccountRouterRest(
      Router,
      accountControllerRest,
      mwRest,
    )
    return accountRouterRest
  }
  return { accountService, accountDiExtra }
}
