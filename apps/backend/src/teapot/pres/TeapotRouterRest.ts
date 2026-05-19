import type { Router as TRouter } from 'express'

export default function (
  Router: typeof TRouter,
  teapotControllerRest: any,
  mwTeapotRest: any,
): TRouter {
  const router = Router()
  const { ID, ADD, UPD, AUTH } = mwTeapotRest
  const { getAll, getById, add, updateById, removeById } = teapotControllerRest

  router.get('', getAll)
  router.get('/:id', ID, getById)
  router.post('', ADD, AUTH, add)
  router.patch('/:id', ID, UPD, AUTH, updateById)
  router.delete('/:id', ID, AUTH, removeById)

  return router
}
