import bindSelf from '@yourock88/bind-self'
// import serv from './servDi.js'
import Orm from '../../utils/Orm.js'
import carsTable from '../../utils/tables/carsTable.js'
import CarRepositoryDb from '../repositories/CarRepositoryDb.js'
import CarService from '../../core/services/CarService.js'
import CarControllerRest from '../controllers/CarControllerRest.js'
import CarControllerIo2 from '../controllers/CarControllerIo2.js'
import CarRouterRest from '../routers/CarRouterRest.js'
import CarRouterIo2 from '../routers/CarRouterIo2.js'
import mwCarRest from '../middlewares/mwCarRest.js'
import mwCarIo from '../middlewares/mwCarIo2.js'
import ID from '../middlewares/ID.js'
import IDio from '../middlewares/IDio.js'
import { AUTHrest, AUTHio } from './authDi.js'

const carsOrm = new Orm(carsTable)
const carRepositoryDb = new CarRepositoryDb(carsOrm)
const carService = new CarService(carRepositoryDb)

const carControllerRest = new CarControllerRest(carService)
bindSelf(carControllerRest)
const carRouterRest = new CarRouterRest(carControllerRest, {
  ...mwCarRest,
  ID,
  AUTH: AUTHrest,
}).router

const carControllerIo = new CarControllerIo2(carService)
bindSelf(carControllerIo)
const carRouterIo = new CarRouterIo2(carControllerIo, {
  ...mwCarIo,
  IDio,
  AUTHio,
})
bindSelf(carRouterIo)

export { carRouterIo, carRouterRest }
