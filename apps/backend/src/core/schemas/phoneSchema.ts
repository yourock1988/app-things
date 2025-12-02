import z from 'zod'
import validatePhoneStrict from '../../utils/validatePhoneStrict.js'

const msg = {
  require: 'Пришлите это поле',
  corrtel: 'Введите корректный номер телефона',
}

export default z
  .string({ required_error: msg.require })
  .refine(validatePhoneStrict, { message: msg.corrtel })
