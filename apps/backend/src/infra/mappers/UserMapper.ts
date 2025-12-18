import { TUserAddDto } from '../../core/dtos/TUserDtos.js'
import { TUserRecord } from '../types/TUserRecord.js'
import User from '../../core/models/User.js'
import randId from '../../utils/randId.js'

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
      id: randId(),
      nickname: dto.nickname,
      password: dto.password,
      email: dto.email,
      money: 0,
    }
    return userRecord
  }
}
