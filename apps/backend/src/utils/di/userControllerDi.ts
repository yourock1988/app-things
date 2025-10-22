import bindSelf from '../bindSelf.js'
import UserService from '../../core/services/UserService.js'
import UserRepositoryDb from '../../infra/repositories/UserRepositoryDb.js'
import UserControllerRest from '../../infra/controllers/UserControllerRest.js'
import Orm from '../Orm.js'
import usersTable from '../tables/usersTable.js'
// import UserControllerIo from '../../infra/controllers/UserControllerIo.js'
// import { sv } from '../../appIo.js'

const usersOrm = new Orm(usersTable)
const userRepositoryDb = new UserRepositoryDb(usersOrm)
const userService = new UserService(userRepositoryDb)
const userControllerRest = new UserControllerRest(userService)
// const userControllerIo = new UserControllerIo(userService, sv)

bindSelf(userControllerRest)
// bindSelf(userControllerIo)

// export { userControllerRest, userControllerIo }

export { userControllerRest }
