import {
  zAccountAddDto,
  zAccountUpdInfoDto,
} from '../../core/schemas/zAccountDtos.js'
import {
  TAccountAddDto,
  TAccountUpdInfoDto,
} from '../../core/dtos/TAccountDtos.js'
import validateSchema from '../../utils/validateSchema.js'
import zParamsIdDto from '../../core/schemas/zParamsIdDto.js'
import validateSchemaRestParams from '../../utils/validateSchemaRestParams.js'
import { authMW as AUTH } from '../di/authDi.js'

const ID = validateSchemaRestParams(zParamsIdDto)
const ADD = validateSchema<TAccountAddDto>(zAccountAddDto)
const UPD = validateSchema<TAccountUpdInfoDto>(zAccountUpdInfoDto)

const mwAccountRest = { ID, ADD, UPD, AUTH }

export default mwAccountRest
