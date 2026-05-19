import type { Router as TRouter } from 'express'

export default function (
  Router: typeof TRouter,
  authControllerRest: any,
  mwAuthRest: any,
): TRouter {
  const router = Router()
  const { SIGNUP, SIGNIN } = mwAuthRest
  const { signUp, signIn } = authControllerRest

  router.post('/sign-up', SIGNUP, signUp)
  router.post('/sign-in', SIGNIN, signIn)

  return router

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
