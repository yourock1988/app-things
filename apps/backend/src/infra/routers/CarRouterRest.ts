import { Router } from 'express'
// import mwAuthorize from '../middlewares/mwAuthorize.js'

export default class CarRouterRest {
  public readonly router: Router

  constructor(readonly carControllerRest: any, readonly mwCarRest: any) {
    this.router = Router()
    const { carId, authMW, carAdd, carUpdate } = mwCarRest
    this.router.get('/', authMW, carControllerRest.getAll)
    this.router.get('/:id', carId, authMW, carControllerRest.getById)
    this.router.post('/', carAdd, carControllerRest.add)
    this.router.patch('/:id', carId, carUpdate, carControllerRest.updateById)
    this.router.delete('/:id', carId, carControllerRest.removeById)
  }
}
