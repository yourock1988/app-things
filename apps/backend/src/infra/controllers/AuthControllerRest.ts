import { Request, Response } from 'express'
import {
  // TAuthChangePasswordDto,
  // TAuthUpdateProfileDto,
  TAuthSignUpDto,
  // TAuthSignInDto,
} from '../../core/dtos/TAuthDtos.js'
import AuthService from '../../core/services/AuthService.js'

export default class AuthControllerRest {
  constructor(readonly authService: AuthService) {}

  signUp(req: Request, res: Response): void {
    const dto: TAuthSignUpDto = req.body
    const profile = this.authService.signUp(dto)
    if (profile) res.status(201).json(profile)
    else res.status(409).send()
  }

  // signIn(req: Request, res: Response): void {
  //   const dto: TAuthSignInDto = req.body
  //   const sessionId = this.authService.signIn(dto)
  //   if (sessionId) res.status(201).json({ sessionId })
  //   else res.status(404).send()
  // }

  // signOut(req: Request, res: Response): void {
  //   const { sessionId } = req.params
  //   // const { sessionId } = req.params as TAuthSessionSchema
  //   const hasBeenExists = this.authService.signOut(sessionId)
  //   if (hasBeenExists) res.status(204).send()
  //   else res.status(404).send()
  // }

  // changePassword(req: Request, res: Response): void {
  //   const { sessionId } = req.params
  //   const dto: TAuthChangePasswordDto = req.body
  //   const auth = this.authService.changePassword(sessionId, dto)
  //   if (auth) res.status(200).json(auth)
  //   else res.status(404).send()
  // }

  // updateProfile(req: Request, res: Response): void {
  //   const { sessionId } = req.params
  //   const dto: TAuthUpdateProfileDto = req.body
  //   const auth = this.authService.updateProfile(sessionId, dto)
  //   if (auth) res.status(200).json(auth)
  //   else res.status(404).send()
  // }

  // // профайл - это урезанный аккаунт (без id и пароля)
  // getProfile(req: Request, res: Response): void {
  //   const { sessionId } = req.params
  //   const profile = this.authService.getProfile(sessionId)
  //   if (profile) res.status(200).json(profile)
  //   else res.status(404).send()
  // }
}
