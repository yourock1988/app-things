import EventEmitter from 'node:events'
import type ICarRepository from './ICarRepository.js'
import type { TCarAddDto, TCarUpdateDto } from './TCarDtos.js'
import type Car from './Car.js'

export default class CarService extends EventEmitter {
  constructor(readonly carRepository: ICarRepository) {
    super()
  }

  getAll(): Car[] {
    const cars = this.carRepository.getAll()
    return cars
  }

  getById(id: number): Car | null {
    const car = this.carRepository.getById(id)
    return car
  }

  add(dto: TCarAddDto): Car {
    const car = this.carRepository.add(dto)
    this.emit('car:added', car)
    return car
  }

  updateById(id: number, dto: TCarUpdateDto): Car | null {
    const car = this.carRepository.updateById(id, {
      ...dto,
      price: dto.price * 10,
    })
    return car
  }

  removeById(id: number): boolean {
    return this.carRepository.removeById(id)
  }
}
