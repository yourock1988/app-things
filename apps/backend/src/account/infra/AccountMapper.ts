import type { TAccountAddDto } from '../../_domain/TAccountDtos.ts'
import type { TAccountRecord } from './TAccountRecord.ts'
import type TAccount from '../domain/Account.ts'

export default class AccountMapper {
  private readonly Account: typeof TAccount

  constructor(Account: typeof TAccount) {
    this.Account = Account
  }

  toModel(record: TAccountRecord): TAccount {
    return new this.Account(
      record.id,
      record.nickname,
      record.password,
      record.email,
      record.phone,
      record.country,
      record.isAgree,
      record.role,
      record.isLoggedIn,
      record.updatedAt,
      record.createdAt,
    )
  }

  // eslint-disable-next-line class-methods-use-this
  toRecord(dto: TAccountAddDto): TAccountRecord {
    return {
      id: -1,
      nickname: dto.nickname,
      password: dto.password,
      email: dto.email,
      phone: dto.phone,
      country: dto.country,
      isAgree: dto.isAgree,
      role: 'user',
      isLoggedIn: false,
      // favoriteNumbers: [],
      // authorizationsCount: 0,
      // authenticationsCount: 0,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    }
  }
}
