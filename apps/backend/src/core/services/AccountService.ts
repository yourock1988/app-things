import EventEmitter from 'node:events'
import { IAccountRepository } from '../i-repositories/IAccountRepository.js'
import { TAccountAddDto, TAccountUpdFullDto } from '../dtos/TAccountDtos.js'
import Account from '../models/Account.js'

export default class AccountService extends EventEmitter {
  constructor(readonly accountRepository: IAccountRepository) {
    super()
  }

  getAll(): Account[] {
    const accounts = this.accountRepository.getAll()
    // accounts.forEach(account => account.sayHello('all'))
    return accounts
  }

  getById(id: number): Account | null {
    const account = this.accountRepository.getById(id)
    // account?.sayHello('only')
    return account
  }

  add(dto: TAccountAddDto): Account | null {
    const existedAccount = this.accountRepository.getByNickname(dto.nickname)
    if (existedAccount) return null
    const account = this.accountRepository.add(dto)
    // account.sayHello('new')
    this.emit('account:added', account)
    return account
  }

  updateById(id: number, dto: TAccountUpdFullDto): Account | null {
    const account = this.accountRepository.updateInfoById(id, {
      ...dto,
      nickname: `${dto.nickname}!`,
    })
    // account?.sayHello('upd')
    return account
  }

  removeById(id: number): boolean {
    return this.accountRepository.removeById(id)
  }
}
