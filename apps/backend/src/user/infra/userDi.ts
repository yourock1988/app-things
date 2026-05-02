import bindSelf from '@yourock88/bind-self'
import Orm from '../../_utils/Orm.js'
import usersTable from './usersTable.js'
import UserRepositoryDb from './UserRepositoryDb.js'
import UserService from '../domain/UserService.js'
import UserControllerRest from '../pres/UserControllerRest.js'
import UserControllerIo from '../pres/UserControllerIo.js'
import UserRouterRest from '../pres/UserRouterRest.js'
import UserRouterIo from '../pres/UserRouterIo.js'
import mwUserRest from '../pres/mwUserRest.js'
import mwUserIo from '../pres/mwUserIo.js'
import IDrest from '../../_pres/IDrest.js'
import IDio from '../../_pres/IDio.js'
import { authist } from '../../_di.js'

const { AUTHrest, AUTHNio, AUTHZio } = authist

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
  AUTHN: AUTHNio,
  AUTHZ: AUTHZio,
})
bindSelf(userRouterIo)

export { userRouterIo, userRouterRest }
