import { TAccountAddDto } from '../../core/dtos/TAccountDtos.js'
import { TAccountRecord } from '../repositories/TAccountRecord.js'
import Account from '../../core/models/Account.js'
import randId from '../../utils/randId.js'

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
      record.favoriteNumbers,
      record.authorizationsCount,
      record.authenticationsCount,
      record.createdAt,
      record.updatedAt,
    )
  }

  static toRecord(dto: TAccountAddDto): TAccountRecord {
    const accountRecord: TAccountRecord = {
      id: randId(),
      nickname: dto.nickname,
      password: dto.password,
      email: dto.email,
      phone: dto.phone,
      country: dto.country,
      isAgree: dto.isAgree,
      role: 'user',
      isLoggedIn: false,
      favoriteNumbers: [],
      authorizationsCount: 0,
      authenticationsCount: 0,
      createdAt: 1764644565353,
      updatedAt: 1764644565353,
    }
    return accountRecord
  }
}
