import type { Router as TRouter } from 'express'

export default function (
  Router: typeof TRouter,
  accountControllerRest: any,
  mwAccountRest: any,
): TRouter {
  const router = Router()
  const { ID, ADD, UPD, AUTH } = mwAccountRest
  const { getAll, getById, add, updateById, removeById } = accountControllerRest

  router.get('', AUTH, getAll)
  router.get('/:id', ID, AUTH, getById)
  router.post('', ADD, AUTH, add)
  router.patch('/:id', ID, UPD, AUTH, updateById)
  router.delete('/:id', ID, AUTH, removeById)

  return router
}
