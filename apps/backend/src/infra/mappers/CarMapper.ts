import { TCarAddDto } from '../../core/dtos/TCarDtos.js'
import { TCarRecord } from '../types/TCarRecord.js'
import Car from '../../core/models/Car.js'
import randId from '../../utils/randId.js'

export default class CarMapper {
  static toModel(record: TCarRecord): Car {
    return new Car(
      record.id,
      record.type,
      record.brand,
      record.model,
      record.price,
      record.engine,
      record.hasTurbo,
      record.hp,
    )
  }

  static toRecord(dto: TCarAddDto): TCarRecord {
    const userRecord: TCarRecord = {
      id: randId(),
      type: dto.type,
      brand: dto.brand,
      model: dto.model,
      price: dto.price,
      engine: dto.engine,
      hasTurbo: dto.hasTurbo,
      hp: dto.hp,
      isRunning: Math.random() > 0.5,
    }
    return userRecord
  }
}
