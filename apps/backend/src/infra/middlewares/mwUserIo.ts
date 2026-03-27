import { zUserAddDto, zUserUpdateDto } from '../../core/schemas/zUserDtos.js'
// import { TUserAddDto, TUserUpdateDto } from '../../core/dtos/TUserDtos.js'
import compileMiddlewareIo from '../../utils/compileMiddlewareIo.js'

const ADD = compileMiddlewareIo('body', zUserAddDto)
const UPD = compileMiddlewareIo('body', zUserUpdateDto)

const mwUserIo = { ADD, UPD }

export default mwUserIo
