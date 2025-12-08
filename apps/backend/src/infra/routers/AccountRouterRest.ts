import { Router } from 'express'

export default class AccountRouterRest {
  public readonly router: Router

  constructor(
    readonly accountControllerRest: any,
    readonly mwAccountRest: any,
  ) {
    this.router = Router()
    const { ID, ADD, UPD, AUTH } = mwAccountRest
    this.router.get('', AUTH, accountControllerRest.getAll)
    this.router.get('/:id', ID, AUTH, accountControllerRest.getById)
    this.router.post('', ADD, AUTH, accountControllerRest.add)
    this.router.patch('/:id', ID, UPD, AUTH, accountControllerRest.updateById)
    this.router.delete('/:id', ID, AUTH, accountControllerRest.removeById)
  }
}
