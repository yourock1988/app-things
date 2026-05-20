import type { Request, Response } from 'express'
import type {
  TAccountAddDto,
  TAccountUpdFullDto,
} from '../../_domain/TAccountDtos.ts'
import type IAccountService from '../../_domain/IAccountService.ts'

type TParamsId = { id: number }

export default class AccountControllerRest {
  private readonly accountService: IAccountService

  constructor(accountService: IAccountService) {
    this.accountService = accountService
  }

  getAll(_: Request, res: Response): void {
    const accounts = this.accountService.getAll()
    res.status(200).json(accounts)
  }

  getById(req: Request<TParamsId>, res: Response): void {
    const id: number = +req.params.id
    const account = this.accountService.getById(id)
    if (account) res.status(200).json(account)
    else res.status(404).send()
  }

  add(req: Request, res: Response): void {
    const dto: TAccountAddDto = req.body
    const account = this.accountService.add(dto)
    if (account) res.status(201).json(account)
    else res.status(409).send()
  }

  updateById(req: Request<TParamsId>, res: Response): void {
    const id: number = +req.params.id
    const dto: TAccountUpdFullDto = req.body // тайпскрипту похуй
    const account = this.accountService.updateById(id, dto)
    if (account) res.status(200).json(account)
    else res.status(404).send()
  }

  removeById(req: Request<TParamsId>, res: Response): void {
    const id: number = +req.params.id
    const hasBeenExists = this.accountService.removeById(id)
    if (hasBeenExists) res.status(204).send()
    else res.status(404).send()
  }
}
