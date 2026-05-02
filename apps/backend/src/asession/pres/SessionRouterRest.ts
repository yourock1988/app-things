import { Router } from 'express'

export default class SessionRouterRest {
  public readonly router: Router

  constructor(
    readonly sessionControllerRest: any,
    readonly mwSessionRest: any,
  ) {
    const { ID, ADD, UPD, AUTH } = mwSessionRest
    this.router = Router()
    this.router.get('', AUTH, sessionControllerRest.getAll)
    this.router.get('/:id', ID, AUTH, sessionControllerRest.getById)
    this.router.post('', ADD, AUTH, sessionControllerRest.add)
    this.router.patch('/:id', ID, UPD, AUTH, sessionControllerRest.updateById)
    this.router.delete('/:id', ID, AUTH, sessionControllerRest.removeById)
  }
}
