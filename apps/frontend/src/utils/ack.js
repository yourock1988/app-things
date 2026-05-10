import { IoAuthError, IoEmptyError, IoRespError } from '@/errors.js'

export default function ack(res) {
  return (err, data) => {
    if (err) {
      if ([401, 403].includes(err.data)) {
        return res([new IoAuthError('auth error', { cause: err })])
      }
      if ([404, 405, 409, 500].includes(err)) {
        return res([new IoEmptyError('auth error', { cause: err })])
      }
      if (typeof err === 'object') {
        return res([new IoRespError('bad request', { cause: err })])
      }
      return res([new Error('unhandled error', { cause: err })])
    }
    return res([null, data])
    // if (err) {
    //   // FIXME: проверка на err, но отдаёт err.detils - что очень тупо
    //   // по сути обработка ошибок сломана тут
    //   console.log(err)
    //   return res([err.details ?? err])
    // }
    // return res([null, data])
  }
}
