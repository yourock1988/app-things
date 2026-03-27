import bindSelf from '@yourock88/bind-self'
import Orm from '../../utils/Orm.js'
import usersTable from '../../utils/tables/usersTable.js'
import UserRepositoryDb from '../repositories/UserRepositoryDb.js'
import UserService from '../../core/services/UserService.js'
import UserControllerRest from '../controllers/UserControllerRest.js'
import UserControllerIo from '../controllers/UserControllerIo.js'
import UserRouterRest from '../routers/UserRouterRest.js'
import UserRouterIo from '../routers/UserRouterIo.js'
import mwUserRest from '../middlewares/mwUserRest.js'
import mwUserIo from '../middlewares/mwUserIo.js'
import IDrest from '../middlewares/IDrest.js'
import IDio from '../middlewares/IDio.js'
import { AUTHrest, AUTHio } from './authDi.js'

const usersOrm = new Orm(usersTable)
const userRepositoryDb = new UserRepositoryDb(usersOrm)
const userService = new UserService(userRepositoryDb)

const userControllerRest = new UserControllerRest(userService)
bindSelf(userControllerRest)
const userRouterRest = new UserRouterRest(userControllerRest, {
  ...mwUserRest,
  ID: IDrest,
  AUTH: AUTHrest,
}).router

const userControllerIo = new UserControllerIo(userService)
bindSelf(userControllerIo)
const userRouterIo = new UserRouterIo(userControllerIo, {
  ...mwUserIo,
  ID: IDio,
  AUTH: AUTHio,
})
bindSelf(userRouterIo)

export { userRouterIo, userRouterRest }
