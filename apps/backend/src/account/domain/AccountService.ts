import type {
  TAccountAddDto,
  TAccountUpdFullDto,
} from '../../_domain/TAccountDtos.ts'
import type IAccount from '../../_domain/IAccount.ts'
import type IAccountService from '../../_domain/IAccountService.ts'
import type { IAccountRepository } from './IAccountRepository.ts'

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
