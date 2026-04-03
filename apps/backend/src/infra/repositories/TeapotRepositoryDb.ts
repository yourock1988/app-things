import { ITeapotRepository } from '../../core/i-repositories/ITeapotRepository.js'
import { TTeapotAddDto, TTeapotUpdateDto } from '../../core/dtos/TTeapotDtos.js'
import { TTeapotRecord } from '../types/TTeapotRecord.js'
import TeapotMapper from '../mappers/TeapotMapper.js'
import Teapot from '../../core/models/Teapot.js'
import Orm from '../../utils/Orm.js'

export default class TeapotRepositoryDb implements ITeapotRepository {
  constructor(readonly orm: Orm) {}

  getAll(): Teapot[] {
    const records: TTeapotRecord[] = this.orm.selectAll()
    return records.map(TeapotMapper.toModel)
  }

  getById(id: number): Teapot | null {
    const record: TTeapotRecord = this.orm.selectById(id)
    return record ? TeapotMapper.toModel(record) : null
  }

  add(dto: TTeapotAddDto): Teapot {
    const record = TeapotMapper.toRecord(dto)
    const appendedRecord: TTeapotRecord = this.orm.insert(record)
    return TeapotMapper.toModel(appendedRecord)
  }

  updateById(id: number, dto: TTeapotUpdateDto): Teapot | null {
    const record: TTeapotRecord = this.orm.updateById(id, dto)
    return record ? TeapotMapper.toModel(record) : null
  }

  removeById(id: number): boolean {
    return this.orm.delete(id)
  }
}
