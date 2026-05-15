import type TOrm from '../../_utils/Orm.js'
import type TPerson from '../domain/Person.js'
import type IPersonRepository from '../domain/IPersonRepository.js'
import type {
  TPersonAddDto,
  TPersonUpdateDto,
} from '../../_domain/TPersonDtos.js'
import type { TPersonRecord } from './TPersonRecord.js'
import type TPersonMapper from './PersonMapper.js'

export default class PersonRepositoryDb implements IPersonRepository {
  constructor(
    readonly orm: TOrm,
    readonly personMapper: TPersonMapper,
  ) {}

  getAll(): TPerson[] {
    const records: TPersonRecord[] = this.orm.selectAll()
    return records.map(this.personMapper.toModel)
  }

  getById(id: number): TPerson | null {
    const record: TPersonRecord = this.orm.selectById(id)
    return record ? this.personMapper.toModel(record) : null
  }

  add(dto: TPersonAddDto): TPerson {
    const record = this.personMapper.toRecord(dto)
    const appendedRecord: TPersonRecord = this.orm.insert(record)
    return this.personMapper.toModel(appendedRecord)
  }

  updateById(id: number, dto: TPersonUpdateDto): TPerson | null {
    const record: TPersonRecord = this.orm.updateById(id, dto)
    return record ? this.personMapper.toModel(record) : null
  }

  removeById(id: number): boolean {
    return this.orm.delete(id)
  }
}
