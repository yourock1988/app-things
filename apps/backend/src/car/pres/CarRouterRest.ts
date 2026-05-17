import { Router } from 'express'

export default class CarRouterRest {
  public readonly router: Router

  constructor(
    readonly carControllerRest: any,
    readonly mwCarRest: any,
  ) {
    const router = Router()
    const { ID, ADD, UPD, AUTH, SESSID } = mwCarRest
    const { getAll, getById, getFullById, add, updateById, removeById } =
      carControllerRest

    router.get('', getAll)
    router.get('/:id', ID, getById)
    router.get('/:id/full', ID, getFullById)
    router.post('', ADD, AUTH, add)
    router.patch('/:id', ID, SESSID, UPD, AUTH, updateById)
    router.delete('/:id', ID, AUTH, removeById)

    this.router = router
  }
}
