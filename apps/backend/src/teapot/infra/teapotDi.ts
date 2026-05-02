import bindSelf from '@yourock88/bind-self'
import Orm from '../../_utils/Orm.js'
import teapotsTable from './teapotsTable.js'
import TeapotRepositoryDb from './TeapotRepositoryDb.js'
import TeapotService from '../domain/TeapotService.js'
import TeapotControllerRest from '../pres/TeapotControllerRest.js'
import TeapotControllerIo from '../pres/TeapotControllerIo.js'
import TeapotRouterRest from '../pres/TeapotRouterRest.js'
import TeapotRouterIo from '../pres/TeapotRouterIo.js'
import mwTeapotRest from '../pres/mwTeapotRest.js'
import mwTeapotIo from '../pres/mwTeapotIo.js'
import TeapotOnline from '../domain/TeapotOnline.js'
import IDrest from '../../_pres/IDrest.js'
import IDio from '../../_pres/IDio.js'
import { authist } from '../../_di.js'

const { AUTHrest, AUTHNio, AUTHZio } = authist

const teapotOnline = new TeapotOnline()
const teapotsOrm = new Orm(teapotsTable)
const teapotRepositoryDb = new TeapotRepositoryDb(teapotsOrm)
const teapotService = new TeapotService(teapotRepositoryDb, teapotOnline)

const teapotControllerRest = new TeapotControllerRest(teapotService)
bindSelf(teapotControllerRest)
const teapotRouterRest = new TeapotRouterRest(teapotControllerRest, {
  ...mwTeapotRest,
  ID: IDrest,
  AUTH: AUTHrest,
}).router

const teapotControllerIo = new TeapotControllerIo(teapotService)
bindSelf(teapotControllerIo)
const teapotRouterIo = new TeapotRouterIo(teapotControllerIo, {
  ...mwTeapotIo,
  ID: IDio,
  AUTHN: AUTHNio,
  AUTHZ: AUTHZio,
})
bindSelf(teapotRouterIo)

export { teapotRouterIo, teapotRouterRest }
