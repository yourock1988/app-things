import { Router } from 'express'

export default class PersonRouterRest {
  public readonly router: Router

  constructor(
    readonly personControllerRest: any,
    readonly mwPersonRest: any,
  ) {
    const router = Router()
    const { ID, ADD, UPD, AUTH } = mwPersonRest
    const { getAll, getById, add, updateById, removeById } =
      personControllerRest

    router.get('', getAll)
    router.get('/:id', ID, getById)
    router.post('', ADD, AUTH, add)
    router.patch('/:id', ID, UPD, AUTH, updateById)
    router.delete('/:id', ID, AUTH, removeById)

    this.router = router
  }
}
