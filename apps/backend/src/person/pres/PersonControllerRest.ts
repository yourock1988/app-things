import type { Request, Response } from 'express'
import type {
  TPersonAddDto,
  TPersonUpdateDto,
} from '../../_domain/TPersonDtos.ts'
import type IPersonService from '../../_domain/IPersonService.ts'

type TParamsId = { id: number }

export default class PersonControllerRest {
  private readonly personService: IPersonService

  constructor(personService: IPersonService) {
    this.personService = personService
  }

  getAll(_: Request, res: Response): void {
    const persons = this.personService.getAll()
    res.status(200).json(persons)
  }

  getById(req: Request<TParamsId>, res: Response): void {
    const id: number = +req.params.id
    const person = this.personService.getById(id)
    if (person) res.status(200).json(person)
    else res.status(404).send()
  }

  add(req: Request, res: Response): void {
    const dto: TPersonAddDto = req.body
    const person = this.personService.add(dto)
    res.status(201).json(person)
  }

  updateById(req: Request<TParamsId>, res: Response): void {
    const id: number = +req.params.id
    const dto: TPersonUpdateDto = req.body
    const person = this.personService.updateById(id, dto)
    if (person) res.status(200).json(person)
    else res.status(404).send()
  }

  removeById(req: Request<TParamsId>, res: Response): void {
    const id: number = +req.params.id
    const hasBeenExists = this.personService.removeById(id)
    if (hasBeenExists) res.status(204).send()
    else res.status(404).send()
  }
}
