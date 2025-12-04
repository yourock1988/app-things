import { Router } from 'express'

export default class SessionRouterRest {
  public readonly router: Router

  constructor(
    readonly sessionControllerRest: any,
    readonly mwSessionRest: any
  ) {
    this.router = Router()
    const { sessionAdd, sessionUpdate } = mwSessionRest
    this.router.get('/', sessionControllerRest.getAll)
    this.router.get('/:id', sessionControllerRest.getById)
    this.router.post('/', sessionAdd, sessionControllerRest.add)
    this.router.patch('/:id', sessionUpdate, sessionControllerRest.updateById)
    this.router.delete('/:id', sessionControllerRest.removeById)
  }
}
