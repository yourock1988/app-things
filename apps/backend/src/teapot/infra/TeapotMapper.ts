import { TTeapotUpdateDto } from '../domain/TTeapotDtos.js'
import { TTeapotRecord } from './TTeapotRecord.js'
import Teapot from '../domain/Teapot.js'

// TTeapotAddDto

export default class TeapotMapper {
  static toModel(record: TTeapotRecord): Teapot {
    return new Teapot(record.id, record.temperature, record.accountId)
  }

  static toRecord(dto: any): TTeapotRecord {
    return {
      id: -1,
      temperature: dto.temperature,
      accountId: dto.accountId,
      // ongoing: dto.ongoing,
    }
  }

  static toRecord2(teapot: Teapot): TTeapotUpdateDto {
    return {
      temperature: teapot.temperature,
      // ongoing: teapot.ongoing,
    }
  }
}
