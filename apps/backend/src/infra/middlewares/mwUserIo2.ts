import { zUserAddDto, zUserUpdateDto } from '../../core/schemas/zUserDtos.js'
// import { TUserAddDto, TUserUpdateDto } from '../../core/dtos/TUserDtos.js'
import compileMiddlewareIo2 from '../../utils/compileMiddlewareIo2.js'

const ADD = compileMiddlewareIo2('body', zUserAddDto)
const UPD = compileMiddlewareIo2('body', zUserUpdateDto)

const mwUserIo2 = { ADD, UPD }

export default mwUserIo2
