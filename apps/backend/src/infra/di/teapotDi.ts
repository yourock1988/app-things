import bindSelf from '@yourock88/bind-self'
import serv from './servDi.js'
// import Orm from '../../utils/Orm.js'
// import teapotsTable from '../../utils/tables/teapotsTable.js'
// import TeapotRepositoryDb from '../repositories/TeapotRepositoryDb.js'
import TeapotService from '../../core/services/TeapotService.js'
// import TeapotControllerRest from '../controllers/TeapotControllerRest.js'
import TeapotControllerIo from '../controllers/TeapotControllerIo.js'
// import TeapotRouterRest from '../routers/TeapotRouterRest.js'
import TeapotRouterIo from '../routers/TeapotRouterIo.js'
// import mwTeapotRest from '../middlewares/mwTeapotRest.js'
import mwTeapotIo from '../middlewares/mwTeapotIo.js'
// import ID from '../middlewares/ID.js'
// import { AUTH } from './authDi.js'
import Teapot from '../../core/models/Teapot.js'

const teapot = new Teapot(42, 0)
// const teapotsOrm = new Orm(teapotsTable)
// const teapotRepositoryDb = new TeapotRepositoryDb(teapotsOrm)
// const teapotService = new TeapotService(teapotRepositoryDb)
const teapotService = new TeapotService(teapot)

// const teapotControllerRest = new TeapotControllerRest(teapotService)
// bindSelf(teapotControllerRest)
// const teapotRouterRest = new TeapotRouterRest(teapotControllerRest, {
//   ...mwTeapotRest,
//   ID,
//   AUTH,
// }).router

const teapotControllerIo = new TeapotControllerIo(teapotService, serv.getIo())
bindSelf(teapotControllerIo)
const teapotRouterIo = new TeapotRouterIo(teapotControllerIo, mwTeapotIo)
bindSelf(teapotRouterIo)

export default teapotRouterIo
// export { teapotRouterIo, teapotRouterRest }
