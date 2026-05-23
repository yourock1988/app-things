import type { Router as TRouter } from 'express'
import type { RequestHandler } from 'express-serve-static-core'

export default function (
  Router: typeof TRouter,
  teapotControllerRest: any,
  mwTeapotRest: Record<string, RequestHandler>,
): TRouter {
  const router = Router()
  const { ID, ADD, UPD, AUTH } = mwTeapotRest
  const { getAll, getById, add, updateById, removeById } = teapotControllerRest

  if (!ID || !ADD || !UPD || !AUTH) throw new Error('no mware')

  router.get('', getAll)
  router.get('/:id', ID, getById)
  router.post('', ADD, AUTH, add)
  router.patch('/:id', ID, UPD, AUTH, updateById)
  router.delete('/:id', ID, AUTH, removeById)

  return router
}
