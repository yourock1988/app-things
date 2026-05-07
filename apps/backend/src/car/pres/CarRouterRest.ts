import { Router } from 'express'

export default class CarRouterRest {
  public readonly router: Router

  constructor(
    readonly carControllerRest: any,
    readonly mwCarRest: any,
  ) {
    const { ID, ADD, UPD, AUTH, SESSID } = mwCarRest
    this.router = Router()
    this.router.get('', carControllerRest.getAll)
    this.router.get('/:id', ID, carControllerRest.getById)
    this.router.post('', ADD, AUTH, carControllerRest.add)
    this.router.patch(
      '/:id',
      ID,
      SESSID,
      UPD,
      AUTH,
      carControllerRest.updateById,
    )
    this.router.delete('/:id', ID, AUTH, carControllerRest.removeById)
  }
}
