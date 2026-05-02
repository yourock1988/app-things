import { Router } from 'express'

export default class TeapotRouterRest {
  public readonly router: Router

  constructor(
    readonly teapotControllerRest: any,
    readonly mwTeapotRest: any,
  ) {
    const { ID, ADD, UPD, AUTH } = mwTeapotRest
    this.router = Router()
    this.router.get('', teapotControllerRest.getAll)
    this.router.get('/:id', ID, teapotControllerRest.getById)
    this.router.post('', ADD, AUTH, teapotControllerRest.add)
    this.router.patch('/:id', ID, UPD, AUTH, teapotControllerRest.updateById)
    this.router.delete('/:id', ID, AUTH, teapotControllerRest.removeById)
  }
}
