import { TCarRecord } from './TCarRecord.js'
import Car from '../../core/models/Car.js'

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
      record.hp
    )
  }

  static toRecord(model: Car): TCarRecord {
    const userRecord: TCarRecord = {
      id: model.id,
      type: model.type,
      brand: model.brand,
      model: model.model,
      price: model.price,
      engine: model.engine,
      hasTurbo: model.hasTurbo,
      hp: model.hp,
      isRunning: model.isRunning(),
    }
    return userRecord
  }
}
