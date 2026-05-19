import type ICarRepository from './ICarRepository.js'
import type { TCarAddDto, TCarUpdateDto } from './TCarDtos.js'
import type Car from './Car.js'

export default class CarService {
  constructor(readonly carRepository: ICarRepository) {}

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
