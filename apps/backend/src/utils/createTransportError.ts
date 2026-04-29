/* eslint-disable no-param-reassign */

export default function createTransportError(status: number, details?: any) {
  if (typeof details === 'string') {
    details = { _errors: [details] }
  }
  return {
    status,
    details,
  }
}
