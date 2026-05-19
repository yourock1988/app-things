import type { Router as TRouter } from 'express'

export default function (
  Router: typeof TRouter,
  carControllerRest: any,
  mwCarRest: any,
): TRouter {
  const router = Router()
  const { ID, ADD, UPD, AUTH, SESSID } = mwCarRest
  const { getAll, getById, getFullById, add, updateById, removeById } =
    carControllerRest

  router.get('', getAll)
  router.get('/:id', ID, getById)
  router.get('/:id/full', ID, getFullById)
  router.post('', ADD, AUTH, add)
  router.patch('/:id', ID, SESSID, UPD, AUTH, updateById)
  router.delete('/:id', ID, AUTH, removeById)

  return router
}
