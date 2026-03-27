import bindSelf from '@yourock88/bind-self'
// import serv from './servDi.js'
import Orm from '../../utils/Orm.js'
import usersTable from '../../utils/tables/usersTable.js'
import UserRepositoryDb from '../repositories/UserRepositoryDb.js'
import UserService from '../../core/services/UserService.js'
import UserControllerRest from '../controllers/UserControllerRest.js'
import UserControllerIo2 from '../controllers/UserControllerIo2.js'
import UserRouterRest from '../routers/UserRouterRest.js'
import UserRouterIo2 from '../routers/UserRouterIo2.js'
import mwUserRest from '../middlewares/mwUserRest.js'
import mwUserIo from '../middlewares/mwUserIo2.js'
import ID from '../middlewares/ID.js'
import IDio from '../middlewares/IDio.js'
import { AUTHrest, AUTHio } from './authDi.js'

const usersOrm = new Orm(usersTable)
const userRepositoryDb = new UserRepositoryDb(usersOrm)
const userService = new UserService(userRepositoryDb)

const userControllerRest = new UserControllerRest(userService)
bindSelf(userControllerRest)
const userRouterRest = new UserRouterRest(userControllerRest, {
  ...mwUserRest,
  ID,
  AUTH: AUTHrest,
}).router

const userControllerIo = new UserControllerIo2(userService)
bindSelf(userControllerIo)
const userRouterIo = new UserRouterIo2(userControllerIo, {
  ...mwUserIo,
  IDio,
  AUTHio,
})
bindSelf(userRouterIo)

export { userRouterIo, userRouterRest }
