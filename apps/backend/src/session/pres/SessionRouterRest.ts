import { Router } from 'express'

export default class SessionRouterRest {
  public readonly router: Router

  constructor(
    readonly sessionControllerRest: any,
    readonly mwSessionRest: any,
  ) {
    const router = Router()
    const { ID, ADD, UPD, AUTH } = mwSessionRest
    const { getAll, getById, add, updateById, removeById } =
      sessionControllerRest

    router.get('', AUTH, getAll)
    router.get('/:id', ID, AUTH, getById)
    router.post('', ADD, AUTH, add)
    router.patch('/:id', ID, UPD, AUTH, updateById)
    router.delete('/:id', ID, AUTH, removeById)

    this.router = router
  }
}
