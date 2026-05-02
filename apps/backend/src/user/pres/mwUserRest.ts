import { zUserAddDto, zUserUpdateDto } from '../domain/zUserDtos.js'
import compileMiddlewareRest from '../../_utils/compileMiddlewareRest.js'

const ADD = compileMiddlewareRest('body', zUserAddDto)
const UPD = compileMiddlewareRest('body', zUserUpdateDto)

const mwUserRest = { ADD, UPD }

export default mwUserRest
