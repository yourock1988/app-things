import { Router } from 'express'

export default class CarRouterRest {
  public readonly router: Router

  constructor(
    readonly carControllerRest: any,
    readonly mwCarRest: any,
  ) {
    const { carId, carAdd, carUpdate, authMW } = mwCarRest
    this.router = Router()
    this.router.get('', carControllerRest.getAll)
    this.router.get('/:id', carId, carControllerRest.getById)
    this.router.post('', carAdd, authMW, carControllerRest.add)
    this.router.patch(
      '/:id',
      carId,
      carUpdate,
      authMW,
      carControllerRest.updateById,
    )
    this.router.delete('/:id', carId, authMW, carControllerRest.removeById)
  }
}
