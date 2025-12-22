export default function ack(res) {
  return (err, data) => {
    if (err) {
      // FIXME: проверка на err, но отдаёт err.detils - что очень тупо
      // по сути обработка ошибок сломана тут
      return res([err.details])
    }
    return res([null, data])
  }
}
