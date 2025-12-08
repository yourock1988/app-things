import { Router } from 'express'

export default class UserRouterRest {
  public readonly router: Router

  constructor(
    readonly userControllerRest: any,
    readonly mwUserRest: any,
  ) {
    this.router = Router()
    const { ID, ADD, UPD, AUTH } = mwUserRest
    this.router.get('', userControllerRest.getAll)
    this.router.get('/:id', ID, userControllerRest.getById)
    this.router.post('', ADD, AUTH, userControllerRest.add)
    this.router.patch('/:id', ID, UPD, AUTH, userControllerRest.updateById)
    this.router.delete('/:id', ID, AUTH, userControllerRest.removeById)
  }
}
