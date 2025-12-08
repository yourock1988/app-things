import { Router } from 'express'

export default class AuthRouterRest {
  public readonly router: Router

  constructor(
    readonly authControllerRest: any,
    readonly mwAuthRest: any,
  ) {
    this.router = Router()
    const { SIGNUP, SIGNIN } = mwAuthRest

    this.router.post('/sign-up', SIGNUP, authControllerRest.signUp)

    this.router.post('/sign-in', SIGNIN, authControllerRest.signIn)

    // this.router.delete(
    //   '/sign-out/:sessionId',
    //   signOut,
    //   authControllerRest.signOut
    // )

    // this.router.patch(
    //   '/change-password/:sessionId',
    //   changePassword,
    //   authControllerRest.changePassword
    // )

    // this.router.patch(
    //   '/profile/:sessionId',
    //   updateProfile,
    //   authControllerRest.updateProfile
    // )

    // this.router.get(
    //   '/profile/:sessionId',
    //   getProfile,
    //   authControllerRest.getProfile
    // )
  }
}
