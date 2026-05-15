import { zPersonAddDto, zPersonUpdateDto } from '../../_domain/zPersonDtos.js'
import compileMiddlewareIo from '../../_utils/compileMiddlewareIo.js'

const ADD = compileMiddlewareIo('body', zPersonAddDto)
const UPD = compileMiddlewareIo('body', zPersonUpdateDto)

const mwPersonIo = { ADD, UPD }

export default mwPersonIo
