import type Orm from '../../_utils/Orm.ts'
import type TCar from '../domain/Car.ts'
import type ICarRepository from '../domain/ICarRepository.ts'
import type { TCarAddDto, TCarUpdateDto } from '../domain/TCarDtos.ts'
import type { TCarRecord } from './TCarRecord.ts'
import type TCarMapper from './CarMapper.ts'

export default class CarRepositoryDb implements ICarRepository {
  private readonly orm: Orm<TCarRecord>

  private readonly carMapper: TCarMapper

  constructor(orm: Orm<TCarRecord>, carMapper: TCarMapper) {
    this.orm = orm
    this.carMapper = carMapper
  }

  getAll(): TCar[] {
    const records: TCarRecord[] = this.orm.selectAll()
    return records.map(this.carMapper.toModel)
  }

  getById(id: number): TCar | null {
    const record = this.orm.selectById(id)
    return record ? this.carMapper.toModel(record) : null
  }

  add(dto: TCarAddDto): TCar {
    const record = this.carMapper.toRecord(dto)
    const appendedRecord: TCarRecord = this.orm.insert(record)
    return this.carMapper.toModel(appendedRecord)
  }

  updateById(id: number, dto: TCarUpdateDto): TCar | null {
    const record = this.orm.updateById(id, dto)
    return record ? this.carMapper.toModel(record) : null
  }

  removeById(id: number): boolean {
    return this.orm.delete(id)
  }
}
