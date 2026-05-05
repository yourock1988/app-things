import EventEmitter from 'node:events'
import type IAccountService from '../../_domain/IAccountService.js'
import type Account from './Account.js'
import type { IAccountRepository } from './IAccountRepository.js'
import type {
  TAccountAddDto,
  TAccountUpdFullDto,
} from '../../_domain/TAccountDtos.js'

export default class AccountService
  extends EventEmitter
  implements IAccountService
{
  constructor(readonly accountRepository: IAccountRepository) {
    super()
  }

  getAll(): Account[] {
    const accounts = this.accountRepository.getAll()
    return accounts
  }

  getById(id: number): Account | null {
    const account = this.accountRepository.getById(id)
    return account
  }

  getByNickname(nickname: string): Account | null {
    const account = this.accountRepository.getByNickname(nickname)
    return account
  }

  add(dto: TAccountAddDto): Account | null {
    const existedAccount = this.accountRepository.getByNickname(dto.nickname)
    if (existedAccount) return null
    const account = this.accountRepository.add(dto)
    this.emit('account:added', account)
    return account
  }

  updateById(id: number, dto: TAccountUpdFullDto): Account | null {
    const account = this.accountRepository.updateInfoById(id, {
      ...dto,
      nickname: `${dto.nickname}!`,
    })
    return account
  }

  removeById(id: number): boolean {
    return this.accountRepository.removeById(id)
  }
}
