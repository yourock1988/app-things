import User from '../domain/User.js'
import { TUserAddDto } from '../domain/TUserDtos.js'
import { TUserRecord } from './TUserRecord.js'

export default class UserMapper {
  static toModel(record: TUserRecord): User {
    return new User(
      record.id,
      record.nickname,
      record.password,
      record.email,
      record.money,
    )
  }

  static toRecord(dto: TUserAddDto): TUserRecord {
    const userRecord: TUserRecord = {
      id: -1,
      nickname: dto.nickname,
      password: dto.password,
      email: dto.email,
      money: 0,
    }
    return userRecord
  }
}
