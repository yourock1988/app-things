import bindSelf from '@yourock88/bind-self'
import SessionControllerRest from '../controllers/SessionControllerRest.js'
import SessionRouterRest from '../routers/SessionRouterRest.js'
import mwSessionRest from '../middlewares/mwSessionRest.js'
import IDrest from '../middlewares/IDrest.js'
import { sessionService, AUTHrest } from './authDi.js'

const sessionControllerRest = new SessionControllerRest(sessionService)
bindSelf(sessionControllerRest)
const sessionRouterRest = new SessionRouterRest(sessionControllerRest, {
  ...mwSessionRest,
  ID: IDrest,
  AUTH: AUTHrest,
}).router

export default sessionRouterRest
