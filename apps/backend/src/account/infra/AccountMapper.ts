import { TAccountAddDto } from '../../_domain/TAccountDtos.js'
import { TAccountRecord } from './TAccountRecord.js'
import Account from '../domain/Account.js'

export default class AccountMapper {
  static toModel(record: TAccountRecord): Account {
    return new Account(
      record.id,
      record.nickname,
      record.password,
      record.email,
      record.phone,
      record.country,
      record.isAgree,
      record.role,
      record.isLoggedIn,
      // record.favoriteNumbers,
      // record.authorizationsCount,
      // record.authenticationsCount,
      record.updatedAt,
      record.createdAt,
    )
  }

  static toRecord(dto: TAccountAddDto): TAccountRecord {
    const accountRecord: TAccountRecord = {
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
    return accountRecord
  }
}
