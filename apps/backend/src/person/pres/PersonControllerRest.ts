import type { RequestHandler } from 'express-serve-static-core'
import type IPersonService from '../../_domain/IPersonService.ts'

type TParamsId = { id: string }

export default class PersonControllerRest {
  private readonly personService: IPersonService

  constructor(personService: IPersonService) {
    this.personService = personService
  }

  getAll: RequestHandler = (_, res) => {
    const persons = this.personService.getAll()
    res.status(200).json(persons)
  }

  getById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const person = this.personService.getById(id)
    if (person) res.status(200).json(person)
    else res.status(404).send()
  }

  add: RequestHandler = (req, res) => {
    const dto = req.body
    const person = this.personService.add(dto)
    res.status(201).json(person)
  }

  updateById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const dto = req.body
    const person = this.personService.updateById(id, dto)
    if (person) res.status(200).json(person)
    else res.status(404).send()
  }

  removeById: RequestHandler<TParamsId> = (req, res) => {
    const id = +req.params.id
    const hasBeenExists = this.personService.removeById(id)
    if (hasBeenExists) res.status(204).send()
    else res.status(404).send()
  }
}
