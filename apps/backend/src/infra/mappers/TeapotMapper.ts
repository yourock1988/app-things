import { TTeapotAddDto } from '../../core/dtos/TTeapotDtos.js'
import { TTeapotRecord } from '../types/TTeapotRecord.js'
import Teapot from '../../core/models/Teapot.js'
import randId from '../../utils/randId.js'

export default class TeapotMapper {
  static toModel(record: TTeapotRecord): Teapot {
    return new Teapot(record.id, record.temperature, record.ongoing)
  }

  static toRecord(dto: TTeapotAddDto): TTeapotRecord {
    const teapotRecord: TTeapotRecord = {
      id: randId(),
      temperature: dto.temperature,
      ongoing: dto.ongoing,
    }
    return teapotRecord
  }
}
