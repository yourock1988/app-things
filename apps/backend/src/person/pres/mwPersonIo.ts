import { zPersonAddDto, zPersonUpdateDto } from '../../_domain/zPersonDtos.ts'
import compileMiddlewareIo from '../../_utils/compileMiddlewareIo.ts'

const ADD = compileMiddlewareIo('body', zPersonAddDto)
const UPD = compileMiddlewareIo('body', zPersonUpdateDto)

const mwPersonIo = { ADD, UPD }

export default mwPersonIo
