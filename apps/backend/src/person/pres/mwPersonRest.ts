import { zPersonAddDto, zPersonUpdateDto } from '../../_domain/zPersonDtos.js'
import compileMiddlewareRest from '../../_utils/compileMiddlewareRest.js'

const ADD = compileMiddlewareRest('body', zPersonAddDto)
const UPD = compileMiddlewareRest('body', zPersonUpdateDto)

const mwPersonRest = { ADD, UPD }

export default mwPersonRest
