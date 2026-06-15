import type { RequestHandler } from 'express-serve-static-core'
import type ISessionService from '../../_domain/ISessionService.ts'

type TParamsId = { id: string }

export default class SessionControllerRest {
  private readonly sessionService: ISessionService

  constructor(sessionService: ISessionService) {
    this.sessionService = sessionService
  }

  getAll: RequestHandler = (_, res) => {
    const sessions = this.sessionService.getAll()
    res.status(200).json(sessions)
  }

  getById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const session = this.sessionService.getById(id)
    if (session) res.status(200).json(session)
    else res.status(404).send()
  }

  add: RequestHandler = (req, res) => {
    const dto = req.body
    const session = this.sessionService.add(dto)
    res.status(201).json(session)
  }

  updateById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const dto = req.body
    const session = this.sessionService.updateById(id, dto)
    if (session) res.status(200).json(session)
    else res.status(404).send()
  }

  removeById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const hasBeenExists = this.sessionService.removeById(id)
    if (hasBeenExists) res.status(204).send()
    else res.status(404).send()
  }
}
