import type { Request, Response } from 'express'
import type {
  TSessionAddDto,
  TSessionUpdateDto,
} from '../../_domain/TSessionDtos.ts'
import type ISessionService from '../../_domain/ISessionService.ts'

type TParamsId = { id: number }

export default class SessionControllerRest {
  private readonly sessionService: ISessionService

  constructor(sessionService: ISessionService) {
    this.sessionService = sessionService
  }

  getAll(_: Request, res: Response): void {
    const sessions = this.sessionService.getAll()
    res.status(200).json(sessions)
  }

  getById(req: Request<TParamsId>, res: Response): void {
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

  updateById(req: Request<TParamsId>, res: Response): void {
    const id: number = +req.params.id
    const dto: TSessionUpdateDto = req.body
    const session = this.sessionService.updateById(id, dto)
    if (session) res.status(200).json(session)
    else res.status(404).send()
  }

  removeById(req: Request<TParamsId>, res: Response): void {
    const id: number = +req.params.id
    const hasBeenExists = this.sessionService.removeById(id)
    if (hasBeenExists) res.status(204).send()
    else res.status(404).send()
  }
}
