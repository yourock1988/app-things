import type { ITeapotRepository } from '../domain/ITeapotRepository.ts'
import type { TTeapotAddDto, TTeapotUpdateDto } from '../domain/TTeapotDtos.ts'
import type { TTeapotRecord } from './TTeapotRecord.ts'
import type TeapotMapper from './TeapotMapper.ts'
import type Teapot from '../domain/Teapot.ts'
import type Orm from '../../_utils/Orm.ts'

export default class TeapotRepositoryDb implements ITeapotRepository {
  private readonly orm: Orm<TTeapotRecord>

  private readonly teapotMapper: TeapotMapper

  constructor(orm: Orm<TTeapotRecord>, teapotMapper: TeapotMapper) {
    this.orm = orm
    this.teapotMapper = teapotMapper
  }

  getAll(): Teapot[] {
    const records = this.orm.selectAll()
    return records.map(this.teapotMapper.toModel)
  }

  getById(id: number): Teapot | null {
    const record = this.orm.selectById(id)
    return record ? this.teapotMapper.toModel(record) : null
  }

  add(dto: TTeapotAddDto): Teapot {
    const record = this.teapotMapper.toRecord(dto)
    const appendedRecord = this.orm.insert(record)
    return this.teapotMapper.toModel(appendedRecord)
  }

  updateById(id: number, dto: TTeapotUpdateDto): Teapot | null {
    const record = this.orm.updateById(id, dto)
    return record ? this.teapotMapper.toModel(record) : null
  }

  removeById(id: number): boolean {
    return this.orm.delete(id)
  }
}
