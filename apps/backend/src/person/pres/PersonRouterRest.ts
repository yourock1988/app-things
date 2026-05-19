import type { Router as TRouter } from 'express'

export default function (
  Router: typeof TRouter,
  personControllerRest: any,
  mwPersonRest: any,
): TRouter {
  const router = Router()
  const { ID, ADD, UPD, AUTH } = mwPersonRest
  const { getAll, getById, add, updateById, removeById } = personControllerRest

  router.get('', getAll)
  router.get('/:id', ID, getById)
  router.post('', ADD, AUTH, add)
  router.patch('/:id', ID, UPD, AUTH, updateById)
  router.delete('/:id', ID, AUTH, removeById)

  return router
}
