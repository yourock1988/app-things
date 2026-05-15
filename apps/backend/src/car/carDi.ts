import bindSelf from '@yourock88/bind-self'
import type TAuthist from '../_pres/TAuthist.js'
import type TOrm from '../_utils/Orm.js'
import type IPersonService from '../_domain/IPersonService.js'
import IDrest from '../_pres/IDrest.js'
import IDio from '../_pres/IDio.js'
import Car from './domain/Car.js'
import CarService from './domain/CarService.js'
import GetCarFullUseCase from './domain/GetCarFullUseCase.js'
import CarMapper from './infra/CarMapper.js'
import carsTable from './infra/carsTable.js'
import CarRepositoryDb from './infra/CarRepositoryDb.js'
import CarControllerRest from './pres/CarControllerRest.js'
import CarControllerIo from './pres/CarControllerIo.js'
import CarRouterRest from './pres/CarRouterRest.js'
import CarRouterIo from './pres/CarRouterIo.js'
import mwCarRest from './pres/mwCarRest.js'
import mwCarIo from './pres/mwCarIo.js'
import SESSIDrest from '../_pres/SESSIDrest.js'
import SESSIDio from '../_pres/SESSIDio.js'
import ACK from '../_pres/ACK.js'

export default function carDi(
  Orm: typeof TOrm,
  authist: TAuthist,
  personService: IPersonService,
) {
  const { AUTHrest, AUTHNio, AUTHZio } = authist
  const mwRest = {
    ...mwCarRest,
    ID: IDrest,
    AUTH: AUTHrest,
    SESSID: SESSIDrest,
  }
  const mwIo = {
    ...mwCarIo,
    ID: IDio,
    AUTHN: AUTHNio,
    AUTHZ: AUTHZio,
    SESSID: SESSIDio,
    ACK,
  }
  const carsOrm = new Orm(carsTable)
  const carMapper = new CarMapper(Car)
  bindSelf(carMapper)
  const carRepositoryDb = new CarRepositoryDb(carsOrm, carMapper)
  const carService = new CarService(carRepositoryDb)
  const getCarFullUseCase = new GetCarFullUseCase(carService, personService)
  const carControllerRest = new CarControllerRest(carService, getCarFullUseCase)
  const carControllerIo = new CarControllerIo(carService)
  bindSelf(carControllerRest)
  bindSelf(carControllerIo)
  const carRouterRest = new CarRouterRest(carControllerRest, mwRest).router
  const carRouterIo = new CarRouterIo(carControllerIo, mwIo)
  bindSelf(carRouterIo)

  return { carRouterIo, carRouterRest, getCarFullUseCase }
}
