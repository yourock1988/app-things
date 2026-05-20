import type { CountryCode } from 'libphonenumber-js/max'
import parsePhoneNumberFromString from 'libphonenumber-js/max'

export default function validatePhoneStrict(
  phone: string,
  code: CountryCode = 'UA',
): boolean {
  const parsed = parsePhoneNumberFromString(phone.toString(), code)
  return (
    parsed !== undefined &&
    parsed.isValid() &&
    parsed.number === phone &&
    parsed.country === code
  )
}
