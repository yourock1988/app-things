import type { TCarAddDto } from '../domain/TCarDtos.ts'
import type { TCarRecord } from './TCarRecord.ts'
import type TCar from '../domain/Car.ts'

export default class CarMapper {
  private readonly Car: typeof TCar

  constructor(Car: typeof TCar) {
    this.Car = Car
  }

  toModel(record: TCarRecord): TCar {
    return new this.Car(
      record.id,
      record.type,
      record.brand,
      record.model,
      record.price,
      record.engine,
      record.hasTurbo,
      record.hp,
      record.personId,
    )
  }

  // eslint-disable-next-line class-methods-use-this
  toRecord(dto: TCarAddDto): TCarRecord {
    // создать/обновить запись Person и выковырять из неё id
    return {
      id: -1,
      type: dto.type,
      brand: dto.brand,
      model: dto.model,
      price: dto.price,
      engine: dto.engine,
      hasTurbo: dto.hasTurbo,
      hp: dto.hp,
      isRunning: Math.random() > 0.5,
      personId: 101,
    }
  }
}
