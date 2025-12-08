import { Router } from 'express'

export default class UserRouterRest {
  public readonly router: Router

  constructor(
    readonly userControllerRest: any,
    readonly mwUserRest: any,
  ) {
    this.router = Router()
    const { userAdd, userUpdate } = mwUserRest
    this.router.get('', userControllerRest.getAll)
    this.router.get('/:id', userControllerRest.getById)
    this.router.post('', userAdd, userControllerRest.add)
    this.router.patch('/:id', userUpdate, userControllerRest.updateById)
    this.router.delete('/:id', userControllerRest.removeById)
  }
}
