import { Request, Response } from 'express'
import { TUserAddDto, TUserUpdateDto } from '../../core/dtos/TUserDtos.js'
import UserService from '../../core/services/UserService.js'

export default class UserControllerRest {
  constructor(readonly userService: UserService) {}

  getAll(_: Request, res: Response): void {
    const users = this.userService.getAll()
    res.status(200).json(users)
  }

  getById(req: Request, res: Response): void {
    const id: number = +req.params.id
    const user = this.userService.getById(id)
    if (user) res.status(200).json(user)
    else res.status(404).send()
  }

  add(req: Request, res: Response): void {
    const dto: TUserAddDto = req.body
    const user = this.userService.add(dto)
    res.status(201).json(user)
  }

  updateById(req: Request, res: Response): void {
    const id: number = +req.params.id
    const dto: TUserUpdateDto = req.body
    const user = this.userService.updateById(id, dto)
    if (user) res.status(200).json(user)
    else res.status(404).send()
  }

  removeById(req: Request, res: Response): void {
    const id: number = +req.params.id
    const hasBeenExists = this.userService.removeById(id)
    if (hasBeenExists) res.status(204).send()
    else res.status(404).send()
  }
}
