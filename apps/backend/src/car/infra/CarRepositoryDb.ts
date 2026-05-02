import Orm from '../../_utils/Orm.js'
import Car from '../domain/Car.js'
import { ICarRepository } from '../domain/ICarRepository.js'
import { TCarAddDto, TCarUpdateDto } from '../domain/TCarDtos.js'
import { TCarRecord } from './TCarRecord.js'
import CarMapper from './CarMapper.js'

export default class CarRepositoryDb implements ICarRepository {
  constructor(readonly orm: Orm) {}

  getAll(): Car[] {
    const records: TCarRecord[] = this.orm.selectAll()
    return records.map(CarMapper.toModel)
  }

  getById(id: number): Car | null {
    const record: TCarRecord = this.orm.selectById(id)
    return record ? CarMapper.toModel(record) : null
  }

  add(dto: TCarAddDto): Car {
    const record = CarMapper.toRecord(dto)
    const appendedRecord: TCarRecord = this.orm.insert(record)
    return CarMapper.toModel(appendedRecord)
  }

  updateById(id: number, dto: TCarUpdateDto): Car | null {
    const record: TCarRecord = this.orm.updateById(id, dto)
    return record ? CarMapper.toModel(record) : null
  }

  removeById(id: number): boolean {
    return this.orm.delete(id)
  }
}
