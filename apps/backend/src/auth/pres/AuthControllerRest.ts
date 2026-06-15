import type { RequestHandler } from 'express-serve-static-core'
import type IAuthService from '../../_domain/IAuthService.ts'

export default class AuthControllerRest {
  private readonly authService: IAuthService

  constructor(authService: IAuthService) {
    this.authService = authService
  }

  signUp: RequestHandler = (req, res) => {
    const dto = req.body
    const profile = this.authService.signUp(dto)
    if (profile) res.status(201).json(profile)
    else res.status(409).send()
  }

  signIn: RequestHandler = (req, res) => {
    const dto = req.body
    const session = this.authService.signIn(dto)
    if (session) res.status(201).json(session)
    else res.status(404).send()
  }

  // signOut(req: Request, res: Response): void {
  //   const { sessionId } = req.params
  //   // const { sessionId } = req.params as TAuthSessionSchema
  //   const hasBeenExists = this.authService.signOut(sessionId)
  //   if (hasBeenExists) res.status(204).send()
  //   else res.status(404).send()
  // }

  // changePassword(req: Request, res: Response): void {
  //   const { sessionId } = req.params
  //   const dto: TAccountUpdPasswordDto = req.body
  //   const auth = this.authService.changePassword(sessionId, dto)
  //   if (auth) res.status(200).json(auth)
  //   else res.status(404).send()
  // }

  // updateProfile(req: Request, res: Response): void {
  //   const { sessionId } = req.params
  //   const dto: TAccountUpdInfoDto = req.body
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
