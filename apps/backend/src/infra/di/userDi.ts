import bindSelf from '@yourock88/bind-self'
import UserService from '../../core/services/UserService.js'
import UserRepositoryDb from '../repositories/UserRepositoryDb.js'
import UserControllerRest from '../controllers/UserControllerRest.js'
import Orm from '../../utils/Orm.js'
import usersTable from '../../utils/tables/usersTable.js'
import UserControllerIo from '../controllers/UserControllerIo.js'
import UserRouterIo from '../routers/UserRouterIo.js'
import serv from './servDi.js'
import UserRouterRest from '../routers/UserRouterRest.js'
import mwUserRest from '../middlewares/mwUserRest.js'
import mwUserIo from '../middlewares/mwUserIo.js'

const usersOrm = new Orm(usersTable)
const userRepositoryDb = new UserRepositoryDb(usersOrm)
const userService = new UserService(userRepositoryDb)

const userControllerRest = new UserControllerRest(userService)
bindSelf(userControllerRest)
const userRouterRest = new UserRouterRest(userControllerRest, mwUserRest).router

const userControllerIo = new UserControllerIo(userService, serv.getIo())
bindSelf(userControllerIo)
const userRouterIo = new UserRouterIo(userControllerIo, mwUserIo)
bindSelf(userRouterIo)

// serv.addRouterIo(userRouterIo.registerHandlers)
// serv.addMiddleware(userRouterIo.getMiddleware())

export { userRouterIo, userRouterRest }
