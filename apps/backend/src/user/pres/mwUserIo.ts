import { zUserAddDto, zUserUpdateDto } from '../domain/zUserDtos.js'
import compileMiddlewareIo from '../../_utils/compileMiddlewareIo.js'

const ADD = compileMiddlewareIo('body', zUserAddDto)
const UPD = compileMiddlewareIo('body', zUserUpdateDto)

const mwUserIo = { ADD, UPD }

export default mwUserIo
