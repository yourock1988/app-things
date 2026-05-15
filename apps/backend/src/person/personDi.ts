import bindSelf from '@yourock88/bind-self'
import type { ClassOf } from '../_utils/ClassOf.js'
import type TAuthist from '../_pres/TAuthist.js'
import type TOrm from '../_utils/Orm.js'
import IDrest from '../_pres/IDrest.js'
import IDio from '../_pres/IDio.js'
import Person from './domain/Person.js'
import PersonService from './domain/PersonService.js'
import PersonMapper from './infra/PersonMapper.js'
import personsTable from './infra/personsTable.js'
import PersonRepositoryDb from './infra/PersonRepositoryDb.js'
import PersonControllerRest from './pres/PersonControllerRest.js'
import PersonControllerIo from './pres/PersonControllerIo.js'
import PersonRouterRest from './pres/PersonRouterRest.js'
import PersonRouterIo from './pres/PersonRouterIo.js'
import mwPersonRest from './pres/mwPersonRest.js'
import mwPersonIo from './pres/mwPersonIo.js'

export default function personDi(Orm: ClassOf<TOrm>, authist: TAuthist) {
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
  const personRouterRest = new PersonRouterRest(personControllerRest, mwRest)
    .router
  const personRouterIo = new PersonRouterIo(personControllerIo, mwIo)
  bindSelf(personRouterIo)

  return { personRouterIo, personRouterRest, personService }
}
