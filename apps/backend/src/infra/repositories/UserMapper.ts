import User from '../../core/models/User.js'
import { TUserRecord } from './TUserRecord.js'

export default class UserMapper {
  static toModel(record: TUserRecord): User {
    return new User(
      record.id,
      record.nickname,
      record.password,
      record.email,
      record.money,
      false
    )
  }

  static toRecord(model: User): TUserRecord {
    const userRecord: TUserRecord = {
      id: model.id,
      nickname: model.nickname,
      password: model.password,
      email: model.email,
      money: model.money,
    }
    return userRecord
  }
}
