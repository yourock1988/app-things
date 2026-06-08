import type { TTeapotAddDto, TTeapotUpdateDto } from '../domain/TTeapotDtos.ts'
import type { TTeapotRecord } from './TTeapotRecord.ts'
import type TTeapot from '../domain/Teapot.ts'

export default class TeapotMapper {
  private readonly Teapot: typeof TTeapot

  constructor(Teapot: typeof TTeapot) {
    this.Teapot = Teapot
  }

  // единственная точка инстансирования чайников! 👍
  toModel(record: TTeapotRecord): TTeapot {
    return new this.Teapot(record.id, record.temperature, record.accountId)
  }

  // eslint-disable-next-line class-methods-use-this
  toRecord(dtoFull: TTeapotAddDto & { accountId: number }): TTeapotRecord {
    return {
      id: -1,
      temperature: dtoFull.temperature,
      accountId: dtoFull.accountId,
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
