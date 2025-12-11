import { zUserAddDto, zUserUpdateDto } from '../../core/schemas/zUserDtos.js'
import compileMiddlewareRest from '../../utils/compileMiddlewareRest.js'

const ADD = compileMiddlewareRest('body', zUserAddDto)
const UPD = compileMiddlewareRest('body', zUserUpdateDto)

const mwUserRest = { ADD, UPD }

export default mwUserRest
