import { ICarRepository } from '../../core/i-repositories/ICarRepository.js'
import { TCarAddDto, TCarUpdateDto } from '../../core/dtos/TCarDtos.js'
import { TCarRecord } from './TCarRecord.js'
import Car from '../../core/models/Car.js'
import Orm from '../../utils/Orm.js'

// TODO: в конструктор как mapper, потом в di
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
