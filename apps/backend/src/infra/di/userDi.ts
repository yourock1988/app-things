import bindSelf from '@yourock88/bind-self'
import UserService from '../../core/services/UserService.js'
import UserRepositoryDb from '../repositories/UserRepositoryDb.js'
import UserControllerRest from '../controllers/UserControllerRest.js'
import Orm from '../../utils/Orm.js'
import usersTable from '../../utils/tables/usersTable.js'
import UserControllerIo from '../controllers/UserControllerIo.js'
import UserRouterIo from '../routers/UserRouterIo.js'
import serv from './servDi.js'

const usersOrm = new Orm(usersTable)
const userRepositoryDb = new UserRepositoryDb(usersOrm)
const userService = new UserService(userRepositoryDb)
const userControllerRest = new UserControllerRest(userService)
const userControllerIo = new UserControllerIo(userService, serv.getIo())
const userRouterIo = new UserRouterIo(userControllerIo)

bindSelf(userControllerRest)
bindSelf(userControllerIo)
bindSelf(userRouterIo)

serv.addRouterIo(userRouterIo.registerHandlers)
serv.addMiddleware(userRouterIo.getMiddleware())

export { userControllerRest, serv, userRouterIo }
