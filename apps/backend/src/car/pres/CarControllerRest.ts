import type { RequestHandler } from 'express-serve-static-core'
import type CarService from '../domain/CarService.ts'
import type GetCarFullUseCase from '../domain/GetCarFullUseCase.ts'

type TParamsId = { id: string }

export default class CarControllerRest {
  private readonly carService: CarService

  private readonly getCarFullUseCase: GetCarFullUseCase

  constructor(carService: CarService, getCarFullUseCase: GetCarFullUseCase) {
    this.carService = carService
    this.getCarFullUseCase = getCarFullUseCase
  }

  getAll: RequestHandler = (_, res) => {
    const cars = this.carService.getAll()
    res.status(200).json(cars)
  }

  getFullById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const carFull = this.getCarFullUseCase.getCarFullById(id)
    if (carFull) res.status(200).json(carFull)
    else res.status(404).send()
  }

  getById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const car = this.carService.getById(id)
    if (car) res.status(200).json(car)
    else res.status(404).send()
  }

  add: RequestHandler = (req, res) => {
    const dto = req.body
    const car = this.carService.add(dto)
    res.status(201).json(car)
  }

  updateById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const dto = req.body
    const car = this.carService.updateById(id, dto)
    if (car) res.status(200).json(car)
    else res.status(404).send()
  }

  removeById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const hasBeenExists = this.carService.removeById(id)
    if (hasBeenExists) res.status(204).send()
    else res.status(404).send()
  }
}
