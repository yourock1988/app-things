import {
  zAccountAddDto,
  zAccountUpdInfoDto,
} from '../../core/schemas/zAccountDtos.js'
import {
  TAccountAddDto,
  TAccountUpdInfoDto,
} from '../../core/dtos/TAccountDtos.js'
import validateSchema from '../../utils/validateSchema.js'

const ADD = validateSchema<TAccountAddDto>(zAccountAddDto)
const UPD = validateSchema<TAccountUpdInfoDto>(zAccountUpdInfoDto)

const mwAccountRest = { ADD, UPD }

export default mwAccountRest
