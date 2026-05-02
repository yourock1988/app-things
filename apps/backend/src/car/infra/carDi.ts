import bindSelf from '@yourock88/bind-self'
import Orm from '../../_utils/Orm.js'
import carsTable from './carsTable.js'
import CarRepositoryDb from './CarRepositoryDb.js'
import CarService from '../domain/CarService.js'
import CarControllerRest from '../pres/CarControllerRest.js'
import CarControllerIo from '../pres/CarControllerIo.js'
import CarRouterRest from '../pres/CarRouterRest.js'
import CarRouterIo from '../pres/CarRouterIo.js'
import mwCarRest from '../pres/mwCarRest.js'
import mwCarIo from '../pres/mwCarIo.js'
import IDrest from '../../_pres/IDrest.js'
import IDio from '../../_pres/IDio.js'
import { authist } from '../../_di.js'

const { AUTHrest, AUTHNio, AUTHZio } = authist

const carsOrm = new Orm(carsTable)
const carRepositoryDb = new CarRepositoryDb(carsOrm)
const carService = new CarService(carRepositoryDb)

const carControllerRest = new CarControllerRest(carService)
bindSelf(carControllerRest)
const carRouterRest = new CarRouterRest(carControllerRest, {
  ...mwCarRest,
  ID: IDrest,
  AUTH: AUTHrest,
}).router

const carControllerIo = new CarControllerIo(carService)
bindSelf(carControllerIo)
const carRouterIo = new CarRouterIo(carControllerIo, {
  ...mwCarIo,
  ID: IDio,
  AUTHN: AUTHNio,
  AUTHZ: AUTHZio,
})
bindSelf(carRouterIo)

export { carRouterIo, carRouterRest }
