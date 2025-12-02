import { IAccountRepository } from '../../core/i-repositories/IAccountRepository.js'
import {
  TAccountAddDto,
  TAccountUpdateInfoDto,
} from '../../core/dtos/TAccountDtos.js'
import { TAccountRecord } from './TAccountRecord.js'
import Account from '../../core/models/Account.js'
import AccountMapper from './AccountMapper.js'
import Orm from '../../utils/Orm.js'

export default class AccountRepositoryDb implements IAccountRepository {
  constructor(readonly orm: Orm) {}

  getAll(): Account[] {
    const records: TAccountRecord[] = this.orm.selectAll()
    return records.map(AccountMapper.toModel)
  }

  getById(id: number): Account | null {
    const record: TAccountRecord = this.orm.selectById(id)
    return record ? AccountMapper.toModel(record) : null
  }

  add(dto: TAccountAddDto): Account {
    // TODO: поля, которые не пришли в dto база данных устанавливает по дефолту
    // TODO: пока временно буду делать дефолтные поля в маппере конструкторе
    // TODO: хотя можно и в конструкторе, но лучше не надо
    const record = AccountMapper.toRecord(dto)
    const appendedRecord: TAccountRecord = this.orm.insert(record)
    return AccountMapper.toModel(appendedRecord)
  }

  updateInfoById(id: number, dto: TAccountUpdateInfoDto): Account | null {
    const record: TAccountRecord = this.orm.updateById(id, dto)
    return record ? AccountMapper.toModel(record) : null
  }

  removeById(id: number): boolean {
    return this.orm.delete(id)
  }

  getByNickname(nickname: string): string {
    return this.orm.selectByNickname(nickname)
  }
}
