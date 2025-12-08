import {
  zAccountAddDto,
  zAccountUpdInfoDto,
} from '../../core/schemas/zNewAccountDtos.js'
import {
  TAccountAddDto,
  TAccountUpdateInfoDto,
} from '../../core/dtos/TAccountDtos.js'
import validateSchema from '../../utils/validateSchema.js'
import zParamsIdDto from '../../core/schemas/zParamsIdDto.js'
import validateSchemaRestParams from '../../utils/validateSchemaRestParams.js'
import { authMW as AUTH } from '../di/authDi.js'

const ID = validateSchemaRestParams(zParamsIdDto)
const ADD = validateSchema<TAccountAddDto>(zAccountAddDto)
const UPD = validateSchema<TAccountUpdateInfoDto>(zAccountUpdInfoDto)

const mwAccountRest = { ID, ADD, UPD, AUTH }

export default mwAccountRest
