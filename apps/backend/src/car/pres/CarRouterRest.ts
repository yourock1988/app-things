import type { Router as TRouter } from 'express'
import type { RequestHandler } from 'express-serve-static-core'
import type CarControllerRest from './CarControllerRest.ts'

export default function (
  Router: typeof TRouter,
  carControllerRest: CarControllerRest,
  mwCarRest: Record<string, RequestHandler>,
): TRouter {
  const router = Router()
  const { ID, ADD, UPD, AUTH, SESSID } = mwCarRest
  const { getAll, getById, getFullById, add, updateById, removeById } =
    carControllerRest

  if (!ID || !ADD || !UPD || !AUTH || !SESSID) throw new Error('no mware')

  router.get('', getAll)
  router.get('/:id', ID, getById)
  router.get('/:id/full', ID, getFullById)
  router.post('', ADD, AUTH, add)
  router.patch('/:id', ID, SESSID, UPD, AUTH, updateById)
  router.delete('/:id', ID, AUTH, removeById)

  return router
}
