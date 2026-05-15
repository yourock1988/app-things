import bindSelf from '@yourock88/bind-self'
import type TAuthist from '../_pres/TAuthist.js'
import type TOrm from '../_utils/Orm.js'
import IDrest from '../_pres/IDrest.js'
import IDio from '../_pres/IDio.js'
import Teapot from './domain/Teapot.js'
import RangeVo from './domain/RangeVo.js'
import TeapotOnline from './domain/TeapotOnline.js'
import TeapotService from './domain/TeapotService.js'
import TeapotMapper from './infra/TeapotMapper.js'
import teapotsTable from './infra/teapotsTable.js'
import TeapotRepositoryDb from './infra/TeapotRepositoryDb.js'
import TeapotControllerRest from './pres/TeapotControllerRest.js'
import TeapotControllerIo from './pres/TeapotControllerIo.js'
import TeapotRouterRest from './pres/TeapotRouterRest.js'
import TeapotRouterIo from './pres/TeapotRouterIo.js'
import mwTeapotRest from './pres/mwTeapotRest.js'
import mwTeapotIo from './pres/mwTeapotIo.js'

export default function teapotDi(Orm: typeof TOrm, authist: TAuthist) {
  const { AUTHrest, AUTHNio, AUTHZio } = authist
  const mwRest = { ...mwTeapotRest, ID: IDrest, AUTH: AUTHrest }
  const mwIo = { ...mwTeapotIo, ID: IDio, AUTHN: AUTHNio, AUTHZ: AUTHZio }
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
  const teapotRouterRest = new TeapotRouterRest(teapotControllerRest, mwRest)
    .router
  bindSelf(teapotRouterIo)
  Teapot.inject(rangeVo)

  return { teapotRouterIo, teapotRouterRest }
}
