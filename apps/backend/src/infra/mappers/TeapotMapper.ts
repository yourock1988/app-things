import { TTeapotAddDto, TTeapotUpdateDto } from '../../core/dtos/TTeapotDtos.js'
import { TTeapotRecord } from '../types/TTeapotRecord.js'
import Teapot from '../../core/models/Teapot.js'
import randId from '../../utils/randId.js'

export default class TeapotMapper {
  static toModel(record: TTeapotRecord): Teapot {
    return new Teapot(record.id, record.temperature)
  }

  static toRecord(dto: TTeapotAddDto): TTeapotRecord {
    return {
      id: randId(),
      temperature: dto.temperature,
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
