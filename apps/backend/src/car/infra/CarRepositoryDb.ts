import type TOrm from '../../_utils/Orm.js'
import type TCar from '../domain/Car.js'
import type ICarRepository from '../domain/ICarRepository.js'
import type { TCarAddDto, TCarUpdateDto } from '../domain/TCarDtos.js'
import type { TCarRecord } from './TCarRecord.js'
import type TCarMapper from './CarMapper.js'

export default class CarRepositoryDb implements ICarRepository {
  constructor(
    readonly orm: TOrm,
    readonly carMapper: TCarMapper,
  ) {}

  getAll(): TCar[] {
    const records: TCarRecord[] = this.orm.selectAll()
    return records.map(this.carMapper.toModel)
  }

  getById(id: number): TCar | null {
    const record: TCarRecord = this.orm.selectById(id)
    return record ? this.carMapper.toModel(record) : null
  }

  add(dto: TCarAddDto): TCar {
    const record = this.carMapper.toRecord(dto)
    const appendedRecord: TCarRecord = this.orm.insert(record)
    return this.carMapper.toModel(appendedRecord)
  }

  updateById(id: number, dto: TCarUpdateDto): TCar | null {
    const record: TCarRecord = this.orm.updateById(id, dto)
    return record ? this.carMapper.toModel(record) : null
  }

  removeById(id: number): boolean {
    return this.orm.delete(id)
  }
}
