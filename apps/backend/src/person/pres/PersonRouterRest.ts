import type { Router as TRouter } from 'express'
import type { RequestHandler } from 'express-serve-static-core'
import type PersonControllerRest from './PersonControllerRest.ts'

export default function (
  Router: typeof TRouter,
  personControllerRest: PersonControllerRest,
  mwPersonRest: Record<string, RequestHandler>,
): TRouter {
  const router = Router()
  const { ID, ADD, UPD, AUTH } = mwPersonRest
  const { getAll, getById, add, updateById, removeById } = personControllerRest

  if (!ID || !ADD || !UPD || !AUTH) throw new Error('no mware')

  router.get('', getAll)
  router.get('/:id', ID, getById)
  router.post('', ADD, AUTH, add)
  router.patch('/:id', ID, UPD, AUTH, updateById)
  router.delete('/:id', ID, AUTH, removeById)

  return router
}
