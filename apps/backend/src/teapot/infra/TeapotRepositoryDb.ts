import EventEmitter from 'node:events'
import { ITeapotRepository } from '../domain/ITeapotRepository.js'
import { TTeapotAddDto, TTeapotUpdateDto } from '../domain/TTeapotDtos.js'
import { TTeapotRecord } from './TTeapotRecord.js'
import TeapotMapper from './TeapotMapper.js'
import Teapot from '../domain/Teapot.js'
import Orm from '../../_utils/Orm.js'

export default class TeapotRepositoryDb
  extends EventEmitter
  implements ITeapotRepository
{
  constructor(readonly orm: Orm) {
    super()
  }

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
