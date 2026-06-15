import bindSelf from '@yourock88/bind-self'
import type { Router as TRouter } from 'express'
import type { TAuthist } from '../_pres/TAuthist.ts'
import type { TSharedMiddlewares } from '../_pres/TSharedMiddlewares.ts'
import type TOrm from '../_utils/Orm.ts'
import type IPersonService from '../_domain/IPersonService.ts'
import Car from './domain/Car.ts'
import CarService from './domain/CarService.ts'
import GetCarFullUseCase from './domain/GetCarFullUseCase.ts'
import CarMapper from './infra/CarMapper.ts'
import carsTable from './infra/carsTable.ts'
import CarRepositoryDb from './infra/CarRepositoryDb.ts'
import CarControllerRest from './pres/CarControllerRest.ts'
import CarControllerIo from './pres/CarControllerIo.ts'
import newCarRouterRest from './pres/CarRouterRest.ts'
import CarRouterIo from './pres/CarRouterIo.ts'
import mwCarRest from './pres/mwCarRest.ts'
import mwCarIo from './pres/mwCarIo.ts'

export default function carDi(
  Router: typeof TRouter,
  Orm: typeof TOrm,
  authist: TAuthist,
  sharedMws: TSharedMiddlewares,
  personService: IPersonService,
): {
  carRouterIo: CarRouterIo
  carRouterRest: TRouter
  getCarFullUseCase: GetCarFullUseCase
} {
  const { AUTHrest, AUTHNio, AUTHZio } = authist
  const { IDrest, SESSIDrest, IDio, SESSIDio, ACK } = sharedMws
  const mwRest = {
    ...mwCarRest,
    ID: IDrest,
    SESSID: SESSIDrest,
    AUTH: AUTHrest,
  }
  const mwIo = {
    ...mwCarIo,
    ID: IDio,
    SESSID: SESSIDio,
    AUTHN: AUTHNio,
    AUTHZ: AUTHZio,
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
  const carRouterRest = newCarRouterRest(Router, carControllerRest, mwRest)
  const carRouterIo = new CarRouterIo(carControllerIo, mwIo)
  bindSelf(carRouterIo)

  return { carRouterIo, carRouterRest, getCarFullUseCase }
}
