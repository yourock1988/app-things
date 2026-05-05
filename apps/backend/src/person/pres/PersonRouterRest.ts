import { Router } from 'express'

export default class PersonRouterRest {
  public readonly router: Router

  constructor(
    readonly personControllerRest: any,
    readonly mwPersonRest: any,
  ) {
    const { ID, ADD, UPD, AUTH } = mwPersonRest
    this.router = Router()
    this.router.get('', personControllerRest.getAll)
    this.router.get('/:id', ID, personControllerRest.getById)
    this.router.post('', ADD, AUTH, personControllerRest.add)
    this.router.patch('/:id', ID, UPD, AUTH, personControllerRest.updateById)
    this.router.delete('/:id', ID, AUTH, personControllerRest.removeById)
  }
}
