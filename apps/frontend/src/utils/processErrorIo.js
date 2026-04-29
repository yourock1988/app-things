import { IoEmptyError, IoRespError } from '@/errors.js'

export default function processErrorIo(err) {
  // if (err instanceof LatencyError) return { _errors: ['очень долгий ответ'] }
  if (err instanceof IoRespError) return err.cause
  if (err instanceof IoEmptyError) {
    if (err.cause === 409) return { _errors: ['Такой никнейм уже зареган'] }
    if (err.cause === 401) return { _errors: ['Войдите в систему'] }
    if (err.cause === 403) return { _errors: ['Недостаточно прав'] }
    if (err.cause === 404) return { _errors: ['Ресурс отсутствует'] }
    if (err.cause === 405) return { _errors: ['Недопустимый метод'] }
    if (err.cause === 500) return { _errors: ['Ошибка сервера'] }
  }
  return { _errors: [err.message] }
}
