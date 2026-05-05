import type {
  TAccountAddDto,
  TAccountUpdFullDto,
} from '../../_domain/TAccountDtos.js'
import type Orm from '../../_utils/Orm.js'
import type Account from '../domain/Account.js'
import type { IAccountRepository } from '../domain/IAccountRepository.js'
import type { TAccountRecord } from './TAccountRecord.js'
import type AccountMapper from './AccountMapper.js'

export default class AccountRepositoryDb implements IAccountRepository {
  constructor(
    readonly orm: Orm,
    readonly accountMapper: AccountMapper,
  ) {}

  getAll(): Account[] {
    const records: TAccountRecord[] = this.orm.selectAll()
    return records.map(this.accountMapper.toModel)
  }

  getById(id: number): Account | null {
    const record: TAccountRecord = this.orm.selectById(id)
    return record ? this.accountMapper.toModel(record) : null
  }

  add(dto: TAccountAddDto): Account {
    const record = this.accountMapper.toRecord(dto)
    const appendedRecord: TAccountRecord = this.orm.insert(record)
    return this.accountMapper.toModel(appendedRecord)
  }

  updateInfoById(id: number, dto: TAccountUpdFullDto): Account | null {
    const record: TAccountRecord = this.orm.updateById(id, dto)
    return record ? this.accountMapper.toModel(record) : null
  }

  removeById(id: number): boolean {
    return this.orm.delete(id)
  }

  getByNickname(nickname: string): Account | null {
    const record: TAccountRecord = this.orm.selectByNickname(nickname)
    return record ? this.accountMapper.toModel(record) : null
  }
}
