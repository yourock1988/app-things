import Orm from '../../_utils/Orm.js'
import User from '../domain/User.js'
import { IUserRepository } from '../domain/IUserRepository.js'
import { TUserAddDto, TUserUpdateDto } from '../domain/TUserDtos.js'
import { TUserRecord } from './TUserRecord.js'
import UserMapper from './UserMapper.js'

export default class UserRepositoryDb implements IUserRepository {
  constructor(readonly orm: Orm) {}

  getAll(): User[] {
    const records: TUserRecord[] = this.orm.selectAll()
    return records.map(UserMapper.toModel)
  }

  getById(id: number): User | null {
    const record: TUserRecord = this.orm.selectById(id)
    return record ? UserMapper.toModel(record) : null
  }

  add(dto: TUserAddDto): User {
    const record = UserMapper.toRecord(dto)
    const appendedRecord: TUserRecord = this.orm.insert(record)
    return UserMapper.toModel(appendedRecord)
  }

  updateById(id: number, dto: TUserUpdateDto): User | null {
    const record: TUserRecord = this.orm.updateById(id, dto)
    return record ? UserMapper.toModel(record) : null
  }

  removeById(id: number): boolean {
    return this.orm.delete(id)
  }
}
