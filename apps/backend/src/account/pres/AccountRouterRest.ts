import { Router } from 'express'

export default class AccountRouterRest {
  public readonly router: Router

  constructor(
    readonly accountControllerRest: any,
    readonly mwAccountRest: any,
  ) {
    const router = Router()
    const { ID, ADD, UPD, AUTH } = mwAccountRest
    const { getAll, getById, add, updateById, removeById } =
      accountControllerRest

    router.get('', AUTH, getAll)
    router.get('/:id', ID, AUTH, getById)
    router.post('', ADD, AUTH, add)
    router.patch('/:id', ID, UPD, AUTH, updateById)
    router.delete('/:id', ID, AUTH, removeById)

    this.router = router
  }
}
