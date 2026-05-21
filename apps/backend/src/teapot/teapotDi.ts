import bindSelf from '@yourock88/bind-self'
import type { Router as TRouter } from 'express'
import type { TAuthist } from '../_pres/TAuthist.ts'
import type { TSharedMiddlewares } from '../_pres/TSharedMiddlewares.ts'
import type TOrm from '../_utils/Orm.ts'
import Teapot from './domain/Teapot.ts'
import RangeVo from './domain/RangeVo.ts'
import TeapotOnline from './domain/TeapotOnline.ts'
import TeapotService from './domain/TeapotService.ts'
import TeapotMapper from './infra/TeapotMapper.ts'
import teapotsTable from './infra/teapotsTable.ts'
import TeapotRepositoryDb from './infra/TeapotRepositoryDb.ts'
import TeapotControllerRest from './pres/TeapotControllerRest.ts'
import TeapotControllerIo from './pres/TeapotControllerIo.ts'
import newTeapotRouterRest from './pres/TeapotRouterRest.ts'
import TeapotRouterIo from './pres/TeapotRouterIo.ts'
import mwTeapotRest from './pres/mwTeapotRest.ts'
import mwTeapotIo from './pres/mwTeapotIo.ts'

export default function teapotDi(
  Router: typeof TRouter,
  Orm: typeof TOrm,
  authist: TAuthist,
  sharedMws: TSharedMiddlewares,
) {
  const { AUTHrest, AUTHNio, AUTHZio } = authist
  const { IDrest, SESSIDrest, IDio, SESSIDio, ACK } = sharedMws

  const mwRest = {
    ...mwTeapotRest,
    ID: IDrest,
    SESSID: SESSIDrest,
    AUTH: AUTHrest,
  }
  const mwIo = {
    ...mwTeapotIo,
    ID: IDio,
    SESSID: SESSIDio,
    AUTHN: AUTHNio,
    AUTHZ: AUTHZio,
    ACK,
  }
  const teapotOnline = new TeapotOnline()
  const teapotsOrm = new Orm(teapotsTable)
  const rangeVo = new RangeVo(0, 100)
  const teapotMapper = new TeapotMapper(Teapot)
  bindSelf(teapotMapper)
  const teapotRepositoryDb = new TeapotRepositoryDb(teapotsOrm, teapotMapper)
  const teapotService = new TeapotService(
    teapotRepositoryDb,
    teapotOnline,
    teapotMapper,
  )
  const teapotControllerIo = new TeapotControllerIo(teapotService)
  const teapotControllerRest = new TeapotControllerRest(teapotService)
  bindSelf(teapotControllerRest)
  bindSelf(teapotControllerIo)
  const teapotRouterIo = new TeapotRouterIo(teapotControllerIo, mwIo)
  const teapotRouterRest = newTeapotRouterRest(
    Router,
    teapotControllerRest,
    mwRest,
  )
  bindSelf(teapotRouterIo)
  Teapot.inject(rangeVo)

  return { teapotRouterIo, teapotRouterRest }
}
