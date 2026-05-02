import { Request, Response } from 'express'
import { TTeapotAddDto, TTeapotUpdateDto } from '../domain/TTeapotDtos.js'
import TeapotService from '../domain/TeapotService.js'

export default class TeapotControllerRest {
  constructor(readonly teapotService: TeapotService) {}

  getAll(_: Request, res: Response): void {
    const teapots = this.teapotService.getAll()
    res.status(200).json(teapots)
  }

  getById(req: Request, res: Response): void {
    const id: number = +req.params.id
    const teapot = this.teapotService.getById(id)
    if (teapot) res.status(200).json(teapot)
    else res.status(404).send()
  }

  add(req: Request, res: Response): void {
    const dto: TTeapotAddDto = req.body
    const o = { ...dto, accountId: req.locals.account.id }
    const teapot = this.teapotService.add(o)
    res.status(201).json(teapot)
  }

  updateById(req: Request, res: Response): void {
    const id: number = +req.params.id
    const dto: TTeapotUpdateDto = req.body
    const teapot = this.teapotService.updateById(id, dto)
    if (teapot) res.status(200).json(teapot)
    else res.status(404).send()
  }

  removeById(req: Request, res: Response): void {
    const id: number = +req.params.id
    const hasBeenExists = this.teapotService.removeById(id)
    if (hasBeenExists) res.status(204).send()
    else res.status(404).send()
  }
}
