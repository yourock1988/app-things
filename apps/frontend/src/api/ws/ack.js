export default function ack(res) {
  return (err, data) => {
    if (err) {
      return res([err.details])
    }
    return res([null, data])
  }
}
