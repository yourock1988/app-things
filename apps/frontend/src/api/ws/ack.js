export default function ack(res) {
  return (err, data) => {
    if (err) {
      return res([err])
    }
    return res([null, data])
  }
}
