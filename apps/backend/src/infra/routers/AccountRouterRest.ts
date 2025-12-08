import { Router } from 'express'

export default class AccountRouterRest {
  public readonly router: Router

  constructor(
    readonly accountControllerRest: any,
    readonly mwAccountRest: any,
  ) {
    this.router = Router()
    const { accountAdd, accountUpdate } = mwAccountRest
    this.router.get('', accountControllerRest.getAll)
    this.router.get('/:id', accountControllerRest.getById)
    this.router.post('', accountAdd, accountControllerRest.add)
    this.router.patch('/:id', accountUpdate, accountControllerRest.updateById)
    this.router.delete('/:id', accountControllerRest.removeById)
  }
}
