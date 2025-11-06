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
    // TODO: в репозиторий должны сохранятся модели, а не dto
    // TODO: точнее модель нужно конвертировать в запись
    // TODO: тоесть из dto нужно создать модель, а потом сконвертировать её в запись

    const car = this.carRepository.add(dto)
    // car.sayHello('new')
    this.emit('car:added', car)
    return car
    // TODO: и на выход должен уходить либо dto либо json
    // TODO: не нужно работающую модель выплёвывать в контроллер
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
