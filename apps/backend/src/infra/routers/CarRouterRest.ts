import { Router } from 'express'

export default class CarRouterRest {
  public readonly router: Router

  constructor(readonly carControllerRest: any, readonly mwCarRest: any) {
    this.router = Router()
    const { carAdd, carUpdate, carId } = mwCarRest
    this.router.get('/', carControllerRest.getAll)
    this.router.get('/:id', carId, carControllerRest.getById)
    this.router.post('/', carAdd, carControllerRest.add)
    this.router.patch('/:id', carId, carUpdate, carControllerRest.updateById)
    this.router.delete('/:id', carId, carControllerRest.removeById)
  }
}
