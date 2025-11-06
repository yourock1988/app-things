import { Request, Response } from 'express'
import { TCarAddDto, TCarUpdateDto } from '../../core/dtos/TCarDtos.js'
import CarService from '../../core/services/CarService.js'

export default class CarControllerRest {
  constructor(readonly carService: CarService) {}

  getAll(_: Request, res: Response): void {
    const cars = this.carService.getAll()
    res.status(200).json(cars)
  }

  getById(req: Request, res: Response): void {
    const id: number = +req.params.id
    const car = this.carService.getById(id)
    if (car) res.status(200).json(car)
    else res.status(404).send()
  }

  add(req: Request, res: Response): void {
    const dto: TCarAddDto = req.body
    const car = this.carService.add(dto)
    res.status(201).json(car)
  }

  updateById(req: Request, res: Response): void {
    const id: number = +req.params.id
    const dto: TCarUpdateDto = req.body
    const car = this.carService.updateById(id, dto)
    if (car) res.status(200).json(car)
    else res.status(404).send()
  }

  removeById(req: Request, res: Response): void {
    const id: number = +req.params.id
    const hasBeenExists = this.carService.removeById(id)
    if (hasBeenExists) res.status(204).send()
    else res.status(404).send()
  }
}
