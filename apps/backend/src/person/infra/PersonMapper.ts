import type { TPersonAddDto } from '../../_domain/TPersonDtos.ts'
import type { TPersonRecord } from './TPersonRecord.ts'
import type TPerson from '../domain/Person.ts'

export default class PersonMapper {
  private readonly Person: typeof TPerson

  constructor(Person: typeof TPerson) {
    this.Person = Person
  }

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
