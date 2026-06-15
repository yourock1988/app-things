import type { RequestHandler } from 'express-serve-static-core'
import type TeapotService from '../domain/TeapotService.ts'

type TParamsId = { id: string }

export default class TeapotControllerRest {
  private readonly teapotService: TeapotService

  constructor(teapotService: TeapotService) {
    this.teapotService = teapotService
  }

  getAll: RequestHandler = (_, res) => {
    const teapots = this.teapotService.getAll()
    res.status(200).json(teapots)
  }

  getById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const teapot = this.teapotService.getById(id)?.toJSON()
    if (teapot) res.status(200).json(teapot)
    else res.status(404).send()
  }

  add: RequestHandler = (req, res) => {
    const dto = req.body
    const dtoFull = { ...dto, accountId: res.locals['account'].id }
    const teapot = this.teapotService.add(dtoFull)
    res.status(201).json(teapot)
  }

  updateById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const dto = req.body
    const teapot = this.teapotService.updateById(id, dto)
    if (teapot) res.status(200).json(teapot)
    else res.status(404).send()
  }

  removeById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const hasBeenExists = this.teapotService.removeById(id)
    if (hasBeenExists) res.status(204).send()
    else res.status(404).send()
  }
}
