import EventEmitter from 'node:events'
import { ICarRepository } from '../i-repositories/ICarRepository.js'
import { TCarAddDto, TCarUpdateDto } from '../dtos/TCarDtos.js'
import Car from '../models/Car.js'

export default class CarService extends EventEmitter {
  constructor(readonly carRepository: ICarRepository) {
    super()
  }

  getAll(): Car[] {
    const cars = this.carRepository.getAll()
    // cars.forEach(car => car.sayHello('all'))
    return cars
  }

  getById(id: number): Car | null {
    const car = this.carRepository.getById(id)
    // car?.sayHello('only')
    return car
  }

  add(dto: TCarAddDto): Car {
    const car = this.carRepository.add(dto)
    // car.sayHello('new')
    this.emit('car:added', car)
    return car
  }

  updateById(id: number, dto: TCarUpdateDto): Car | null {
    const car = this.carRepository.updateById(id, {
      ...dto,
      price: dto.price * 10,
      engine: `${dto.engine}!`,
    })
    // car?.sayHello('upd')
    return car
  }

  removeById(id: number): boolean {
    return this.carRepository.removeById(id)
  }
}
