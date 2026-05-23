import type { Router as TRouter } from 'express'
import type { RequestHandler } from 'express-serve-static-core'

export default function (
  Router: typeof TRouter,
  sessionControllerRest: any,
  mwSessionRest: Record<string, RequestHandler>,
): TRouter {
  const router = Router()
  const { ID, ADD, UPD, AUTH } = mwSessionRest
  const { getAll, getById, add, updateById, removeById } = sessionControllerRest

  if (!ID || !ADD || !UPD || !AUTH) throw new Error('no mware')

  router.get('', AUTH, getAll)
  router.get('/:id', ID, AUTH, getById)
  router.post('', ADD, AUTH, add)
  router.patch('/:id', ID, UPD, AUTH, updateById)
  router.delete('/:id', ID, AUTH, removeById)

  return router
}
