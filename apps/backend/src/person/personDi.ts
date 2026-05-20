import bindSelf from '@yourock88/bind-self'
import type { Router as TRouter } from 'express'
import type { TAuthist } from '../_pres/TAuthist.ts'
import type TOrm from '../_utils/Orm.ts'
import IDrest from '../_pres/IDrest.ts'
import IDio from '../_pres/IDio.ts'
import Person from './domain/Person.ts'
import PersonService from './domain/PersonService.ts'
import PersonMapper from './infra/PersonMapper.ts'
import personsTable from './infra/personsTable.ts'
import PersonRepositoryDb from './infra/PersonRepositoryDb.ts'
import PersonControllerRest from './pres/PersonControllerRest.ts'
import PersonControllerIo from './pres/PersonControllerIo.ts'
import newPersonRouterRest from './pres/PersonRouterRest.ts'
import PersonRouterIo from './pres/PersonRouterIo.ts'
import mwPersonRest from './pres/mwPersonRest.ts'
import mwPersonIo from './pres/mwPersonIo.ts'

export default function personDi(
  Router: typeof TRouter,
  Orm: typeof TOrm,
  authist: TAuthist,
) {
  const { AUTHrest, AUTHNio, AUTHZio } = authist
  const mwRest = { ...mwPersonRest, ID: IDrest, AUTH: AUTHrest }
  const mwIo = { ...mwPersonIo, ID: IDio, AUTHN: AUTHNio, AUTHZ: AUTHZio }
  const personsOrm = new Orm(personsTable)
  const personMapper = new PersonMapper(Person)
  bindSelf(personMapper)
  const personRepositoryDb = new PersonRepositoryDb(personsOrm, personMapper)
  const personService = new PersonService(personRepositoryDb)
  const personControllerRest = new PersonControllerRest(personService)
  const personControllerIo = new PersonControllerIo(personService)
  bindSelf(personControllerRest)
  bindSelf(personControllerIo)
  const personRouterRest = newPersonRouterRest(
    Router,
    personControllerRest,
    mwRest,
  )
  const personRouterIo = new PersonRouterIo(personControllerIo, mwIo)
  bindSelf(personRouterIo)

  return { personRouterIo, personRouterRest, personService }
}
