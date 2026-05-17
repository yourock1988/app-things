import { Router } from 'express'

export default class AuthRouterRest {
  public readonly router: Router

  constructor(
    readonly authControllerRest: any,
    readonly mwAuthRest: any,
  ) {
    const router = Router()
    const { SIGNUP, SIGNIN } = mwAuthRest
    const { signUp, signIn } = authControllerRest

    router.post('/sign-up', SIGNUP, signUp)
    router.post('/sign-in', SIGNIN, signIn)

    this.router = router

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
