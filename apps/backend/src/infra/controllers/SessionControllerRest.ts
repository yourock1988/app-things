import { Request, Response } from 'express'
import {
  TSessionAddDto,
  TSessionUpdateDto,
} from '../../core/dtos/TSessionDtos.js'
import SessionService from '../../core/services/SessionService.js'

export default class SessionControllerRest {
  constructor(readonly sessionService: SessionService) {}

  getAll(_: Request, res: Response): void {
    const sessions = this.sessionService.getAll()
    res.status(200).json(sessions)
  }

  getById(req: Request, res: Response): void {
    const id: number = +req.params.id
    const session = this.sessionService.getById(id)
    if (session) res.status(200).json(session)
    else res.status(404).send()
  }

  add(req: Request, res: Response): void {
    const dto: TSessionAddDto = req.body
    const session = this.sessionService.add(dto)
    res.status(201).json(session)
  }

  updateById(req: Request, res: Response): void {
    const id: number = +req.params.id
    const dto: TSessionUpdateDto = req.body
    const session = this.sessionService.updateById(id, dto)
    if (session) res.status(200).json(session)
    else res.status(404).send()
  }

  removeById(req: Request, res: Response): void {
    const id: number = +req.params.id
    const hasBeenExists = this.sessionService.removeById(id)
    if (hasBeenExists) res.status(204).send()
    else res.status(404).send()
  }
}
