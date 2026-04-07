import bindSelf from '@yourock88/bind-self'
import Orm from '../../utils/Orm.js'
import teapotsTable from '../../utils/tables/teapotsTable.js'
import TeapotRepositoryDb from '../repositories/TeapotRepositoryDb.js'
import TeapotService from '../../core/services/TeapotService.js'
import TeapotService2 from '../../core/services/TeapotService2.js'
import TeapotControllerRest from '../controllers/TeapotControllerRest.js'
import TeapotControllerIo from '../controllers/TeapotControllerIo.js'
import TeapotControllerIo2 from '../controllers/TeapotControllerIo2.js'
import TeapotRouterRest from '../routers/TeapotRouterRest.js'
import TeapotRouterIo from '../routers/TeapotRouterIo.js'
import mwTeapotRest from '../middlewares/mwTeapotRest.js'
import mwTeapotIo from '../middlewares/mwTeapotIo.js'
import IDrest from '../middlewares/IDrest.js'
import IDio from '../middlewares/IDio.js'
import { AUTHrest, AUTHNio, AUTHZio } from './authDi.js'
// import { AUTHrest } from './authDi.js'
// import Teapot from '../../core/models/Teapot.js'

// const teapot = new Teapot(42, 0)
const teapotsOrm = new Orm(teapotsTable)
const teapotRepositoryDb = new TeapotRepositoryDb(teapotsOrm)
const teapotService = new TeapotService(teapotRepositoryDb)
const teapotService2 = new TeapotService2(teapotRepositoryDb)

const teapotControllerRest = new TeapotControllerRest(teapotService2)
bindSelf(teapotControllerRest)
const teapotRouterRest = new TeapotRouterRest(teapotControllerRest, {
  ...mwTeapotRest,
  ID: IDrest,
  AUTH: AUTHrest,
}).router

const teapotControllerIo = new TeapotControllerIo(teapotService)
const teapotControllerIo2 = new TeapotControllerIo2(teapotService2)
bindSelf(teapotControllerIo)
bindSelf(teapotControllerIo2)
const teapotRouterIo = new TeapotRouterIo(
  teapotControllerIo,
  {
    ...mwTeapotIo,
    ID: IDio,
    AUTHN: AUTHNio,
    AUTHZ: AUTHZio,
  },
  teapotControllerIo2,
)
bindSelf(teapotRouterIo)

// const teapotRouterIo = {}

export { teapotRouterIo, teapotRouterRest }
