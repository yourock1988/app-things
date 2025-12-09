import validateSchemaRestParams from '../../utils/validateSchemaRestParams.js'
import zParamsIdDto from '../../core/schemas/zParamsIdDto.js'

const ID = validateSchemaRestParams(zParamsIdDto)

export default ID
