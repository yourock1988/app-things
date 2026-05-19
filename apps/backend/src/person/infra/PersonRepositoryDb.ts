import type Orm from '../../_utils/Orm.js'
import type IPerson from '../../_domain/IPerson.js'
import type IPersonRepository from '../domain/IPersonRepository.js'
import type {
  TPersonAddDto,
  TPersonUpdateDto,
} from '../../_domain/TPersonDtos.js'
import type { TPersonRecord } from './TPersonRecord.js'
import type TPersonMapper from './PersonMapper.js'

export default class PersonRepositoryDb implements IPersonRepository {
  private readonly orm: Orm<TPersonRecord>

  private readonly personMapper: TPersonMapper

  constructor(orm: Orm<TPersonRecord>, personMapper: TPersonMapper) {
    this.orm = orm
    this.personMapper = personMapper
  }

  getAll(): IPerson[] {
    const records: TPersonRecord[] = this.orm.selectAll()
    return records.map(this.personMapper.toModel)
  }

  getById(id: number): IPerson | null {
    const record = this.orm.selectById(id)
    return record ? this.personMapper.toModel(record) : null
  }

  add(dto: TPersonAddDto): IPerson {
    const record = this.personMapper.toRecord(dto)
    const appendedRecord: TPersonRecord = this.orm.insert(record)
    return this.personMapper.toModel(appendedRecord)
  }

  updateById(id: number, dto: TPersonUpdateDto): IPerson | null {
    const record = this.orm.updateById(id, dto)
    return record ? this.personMapper.toModel(record) : null
  }

  removeById(id: number): boolean {
    return this.orm.delete(id)
  }
}
