import type IPersonService from '../../_domain/IPersonService.js'
import type CarService from './CarService.js'
import CarFull from './CarFull.js'

export default class GetCarFullUseCase {
  private readonly carService: CarService

  private readonly personService: IPersonService

  constructor(carService: CarService, personService: IPersonService) {
    this.carService = carService
    this.personService = personService
  }

  getCarFullById(id: number) {
    const car = this.carService.getById(id)
    if (!car) return null
    const person = this.personService.getById(car.personId)
    if (!person) return null
    const carFull = new CarFull(car, person)
    return carFull
  }
}
