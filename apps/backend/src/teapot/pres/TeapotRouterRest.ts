import type { Router as TRouter } from 'express'
import type { RequestHandler } from 'express-serve-static-core'
import type TeapotControllerRest from './TeapotControllerRest.ts'

export default function (
  Router: typeof TRouter,
  teapotControllerRest: TeapotControllerRest,
  mwTeapotRest: Record<string, RequestHandler>,
): TRouter {
  const router = Router()
  const { ID, ADD, UPD, AUTH } = mwTeapotRest
  const { getAll, getById, add, updateById, removeById } = teapotControllerRest

  if (!ID || !ADD || !UPD || !AUTH) throw new Error('no mware')

  router.get('', (req, res, next) => getAll(req, res, next))
  router.get('/:id', (req, res, next) => ID(req, res, next), getById)
  router.post('', ADD, AUTH, add)
  router.patch('/:id', ID, UPD, AUTH, updateById)
  router.delete('/:id', ID, AUTH, removeById)

  return router
}
