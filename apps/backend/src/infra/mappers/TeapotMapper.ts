import { TTeapotUpdateDto } from '../../core/dtos/TTeapotDtos.js'
import { TTeapotRecord } from '../types/TTeapotRecord.js'
import Teapot from '../../core/models/Teapot.js'
import randId from '../../utils/randId.js'

// TTeapotAddDto

export default class TeapotMapper {
  static toModel(record: TTeapotRecord): Teapot {
    return new Teapot(record.id, record.temperature, record.accountId)
  }

  static toRecord(dto: any): TTeapotRecord {
    return {
      id: randId(),
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
