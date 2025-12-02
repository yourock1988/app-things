import {
  zAccountAddDto,
  zAccountUpdateInfoDto,
} from '../../core/schemas/zAccountDtos.js'
import {
  TAccountAddDto,
  TAccountUpdateInfoDto,
} from '../../core/dtos/TAccountDtos.js'
import validateSchema from '../../utils/validateSchema.js'

const accountAdd = validateSchema<TAccountAddDto>(zAccountAddDto)
const accountUpdate = validateSchema<TAccountUpdateInfoDto>(
  zAccountUpdateInfoDto
)

const mwAccountRest = { accountAdd, accountUpdate }

export default mwAccountRest
