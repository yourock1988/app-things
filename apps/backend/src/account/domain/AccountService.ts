import type {
  TAccountAddDto,
  TAccountUpdFullDto,
} from '../../_domain/TAccountDtos.js'
import type IAccountService from '../../_domain/IAccountService.js'
import type { IAccountRepository } from './IAccountRepository.js'
import type Account from './Account.js'

export default class AccountService implements IAccountService {
  constructor(readonly accountRepository: IAccountRepository) {}

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
