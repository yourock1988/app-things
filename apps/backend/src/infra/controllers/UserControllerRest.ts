import { Request, Response } from 'express'
import UserService from '../../core/services/UserService.js'
import { TUserAddDto, TUserUpdateDto } from '../../core/dtos/TUserDtos.js'

export default class UserControllerRest {
  constructor(readonly userService: UserService) {}

  getAll(_: Request, res: Response) {
    const users = this.userService.getAll()
    res.json(users)
  }

  getById(req: Request, res: Response) {
    const id: number = +req.params.id
    const user = this.userService.getById(id)
    res.json(user)
  }

  add(req: Request, res: Response) {
    const dto: TUserAddDto = req.body
    global.console.log('>>>', dto)
    const user = this.userService.add(dto)
    res.json(user)
  }

  updateById(req: Request, res: Response) {
    const id: number = +req.params.id
    const { body } = req
    const dto: TUserUpdateDto = { ...body, id }
    const user = this.userService.updateById(dto)
    res.json(user)
  }
}
