import { Router } from 'express'

export default class TeapotRouterRest {
  public readonly router: Router

  constructor(
    readonly teapotControllerRest: any,
    readonly mwTeapotRest: any,
  ) {
    const router = Router()
    const { ID, ADD, UPD, AUTH } = mwTeapotRest
    const { getAll, getById, add, updateById, removeById } =
      teapotControllerRest

    router.get('', getAll)
    router.get('/:id', ID, getById)
    router.post('', ADD, AUTH, add)
    router.patch('/:id', ID, UPD, AUTH, updateById)
    router.delete('/:id', ID, AUTH, removeById)

    this.router = router
  }
}
