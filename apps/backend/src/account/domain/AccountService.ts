import type {
  TAccountAddDto,
  TAccountUpdFullDto,
} from '../../_domain/TAccountDtos.js'
import type IAccount from '../../_domain/IAccount.js'
import type IAccountService from '../../_domain/IAccountService.js'
import type { IAccountRepository } from './IAccountRepository.js'

export default class AccountService implements IAccountService {
  private readonly accountRepository: IAccountRepository

  constructor(accountRepository: IAccountRepository) {
    this.accountRepository = accountRepository
  }

  getAll(): IAccount[] {
    const accounts = this.accountRepository.getAll()
    return accounts
  }

  getById(id: number): IAccount | null {
    const account = this.accountRepository.getById(id)
    return account
  }

  getByNickname(nickname: string): IAccount | null {
    const account = this.accountRepository.getByNickname(nickname)
    return account
  }

  add(dto: TAccountAddDto): IAccount | null {
    const existedAccount = this.accountRepository.getByNickname(dto.nickname)
    if (existedAccount) return null
    const account = this.accountRepository.add(dto)
    return account
  }

  updateById(id: number, dto: TAccountUpdFullDto): IAccount | null {
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
