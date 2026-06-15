import type { RequestHandler } from 'express-serve-static-core'
import type IAccountService from '../../_domain/IAccountService.ts'

type TParamsId = { id: string }

export default class AccountControllerRest {
  private readonly accountService: IAccountService

  constructor(accountService: IAccountService) {
    this.accountService = accountService
  }

  getAll: RequestHandler = (_, res) => {
    const accounts = this.accountService.getAll()
    res.status(200).json(accounts)
  }

  getById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const account = this.accountService.getById(id)
    if (account) res.status(200).json(account)
    else res.status(404).send()
  }

  add: RequestHandler = (req, res) => {
    const dto = req.body
    const account = this.accountService.add(dto)
    if (account) res.status(201).json(account)
    else res.status(409).send()
  }

  updateById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const dto = req.body // тайпскрипту похуй
    const account = this.accountService.updateById(id, dto)
    if (account) res.status(200).json(account)
    else res.status(404).send()
  }

  removeById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const hasBeenExists = this.accountService.removeById(id)
    if (hasBeenExists) res.status(204).send()
    else res.status(404).send()
  }
}
