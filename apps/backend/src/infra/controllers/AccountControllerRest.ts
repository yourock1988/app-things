import { Request, Response } from 'express'
import {
  TAccountAddDto,
  TAccountUpdateInfoDto,
} from '../../core/dtos/TAccountDtos.js'
import AccountService from '../../core/services/AccountService.js'

export default class AccountControllerRest {
  constructor(readonly accountService: AccountService) {}

  getAll(_: Request, res: Response): void {
    const accounts = this.accountService.getAll()
    res.status(200).json(accounts)
  }

  getById(req: Request, res: Response): void {
    // next(new Error('BAR'))
    // throw new Error('FOO')
    const id: number = +req.params.id
    const account = this.accountService.getById(id)
    if (account) res.status(200).json(account)
    else res.status(404).send()
  }

  add(req: Request, res: Response): void {
    const dto: TAccountAddDto = req.body
    const account = this.accountService.add(dto)
    res.status(201).json(account)
  }

  updateById(req: Request, res: Response): void {
    const id: number = +req.params.id
    const dto: TAccountUpdateInfoDto = req.body
    const account = this.accountService.updateById(id, dto)
    if (account) res.status(200).json(account)
    else res.status(404).send()
  }

  removeById(req: Request, res: Response): void {
    const id: number = +req.params.id
    const hasBeenExists = this.accountService.removeById(id)
    if (hasBeenExists) res.status(204).send()
    else res.status(404).send()
  }
}
