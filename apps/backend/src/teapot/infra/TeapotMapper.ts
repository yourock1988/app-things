import type { TTeapotUpdateDto } from '../domain/TTeapotDtos.js'
import type { TTeapotRecord } from './TTeapotRecord.js'
import type TTeapot from '../domain/Teapot.js'

// TTeapotAddDto

export default class TeapotMapper {
  constructor(readonly Teapot: typeof TTeapot) {}

  // единственная точка инстансирования чайников! 👍
  toModel(record: TTeapotRecord): TTeapot {
    return new this.Teapot(record.id, record.temperature, record.accountId)
  }

  // eslint-disable-next-line class-methods-use-this
  toRecord(dto: any): TTeapotRecord {
    return {
      id: -1,
      temperature: dto.temperature,
      accountId: dto.accountId,
      // ongoing: dto.ongoing,
    }
  }

  // eslint-disable-next-line class-methods-use-this
  toRecord2(teapot: TTeapot): TTeapotUpdateDto {
    return {
      temperature: teapot.temperature,
      // ongoing: teapot.ongoing,
    }
  }
}
