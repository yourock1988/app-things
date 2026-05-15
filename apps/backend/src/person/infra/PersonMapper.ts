import type { TPersonAddDto } from '../../_domain/TPersonDtos.js'
import type { TPersonRecord } from './TPersonRecord.js'
import type TPerson from '../domain/Person.js'

export default class PersonMapper {
  constructor(readonly Person: typeof TPerson) {}

  toModel(record: TPersonRecord): TPerson {
    return new this.Person(
      record.id,
      record.nickname,
      record.password,
      record.email,
      record.money,
    )
  }

  // eslint-disable-next-line class-methods-use-this
  toRecord(dto: TPersonAddDto): TPersonRecord {
    const personRecord: TPersonRecord = {
      id: -1,
      nickname: dto.nickname,
      password: dto.password,
      email: dto.email,
      money: 0,
    }
    return personRecord
  }
}
