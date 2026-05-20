import type {
  TAccountAddDto,
  TAccountUpdFullDto,
} from '../../_domain/TAccountDtos.ts'
import type Orm from '../../_utils/Orm.ts'
import type Account from '../domain/Account.ts'
import type { IAccountRepository } from '../domain/IAccountRepository.ts'
import type { TAccountRecord } from './TAccountRecord.ts'
import type AccountMapper from './AccountMapper.ts'

export default class AccountRepositoryDb implements IAccountRepository {
  private readonly orm: Orm<TAccountRecord>

  private readonly accountMapper: AccountMapper

  constructor(orm: Orm<TAccountRecord>, accountMapper: AccountMapper) {
    this.orm = orm
    this.accountMapper = accountMapper
  }

  getAll(): Account[] {
    const records: TAccountRecord[] = this.orm.selectAll()
    return records.map(this.accountMapper.toModel)
  }

  getById(id: number): Account | null {
    const record = this.orm.selectById(id)
    return record ? this.accountMapper.toModel(record) : null
  }

  add(dto: TAccountAddDto): Account {
    const record = this.accountMapper.toRecord(dto)
    const appendedRecord: TAccountRecord = this.orm.insert(record)
    return this.accountMapper.toModel(appendedRecord)
  }

  updateInfoById(id: number, dto: TAccountUpdFullDto): Account | null {
    const record = this.orm.updateById(id, dto)
    return record ? this.accountMapper.toModel(record) : null
  }

  removeById(id: number): boolean {
    return this.orm.delete(id)
  }

  getByNickname(nickname: string): Account | null {
    const record = this.orm.selectByPropName('nickname', nickname)
    return record ? this.accountMapper.toModel(record) : null
  }
}
