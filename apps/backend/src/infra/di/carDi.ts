import bindSelf from '@yourock88/bind-self'
import serv from './servDi.js'
import Orm from '../../utils/Orm.js'
import carsTable from '../../utils/tables/carsTable.js'
import CarRepositoryDb from '../repositories/CarRepositoryDb.js'
import CarService from '../../core/services/CarService.js'
import CarControllerRest from '../controllers/CarControllerRest.js'
import CarControllerIo from '../controllers/CarControllerIo.js'
import CarRouterRest from '../routers/CarRouterRest.js'
import CarRouterIo from '../routers/CarRouterIo.js'
import mwCarRest from '../middlewares/mwCarRest.js'
import mwCarIo from '../middlewares/mwCarIo.js'

const carsOrm = new Orm(carsTable)
const carRepositoryDb = new CarRepositoryDb(carsOrm)
const carService = new CarService(carRepositoryDb)

const carControllerRest = new CarControllerRest(carService)
bindSelf(carControllerRest)
const carRouterRest = new CarRouterRest(carControllerRest, mwCarRest).router

const carControllerIo = new CarControllerIo(carService, serv.getIo())
bindSelf(carControllerIo)
const carRouterIo = new CarRouterIo(carControllerIo, mwCarIo)
bindSelf(carRouterIo)

export { carRouterIo, carRouterRest }
