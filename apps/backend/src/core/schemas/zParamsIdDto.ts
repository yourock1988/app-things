import z from 'zod'

const msg = {
  dto: 'Пришлите объект в формате JSON',
  require: 'Пришлите это поле',
  extra: 'Уберите лишние поля из запроса',
  mustNum: 'Пришлите корректный ID',
}

export default z
  .object(
    {
      id: z.coerce.number({
        required_error: msg.require,
        invalid_type_error: msg.mustNum,
      }),
    },
    { required_error: msg.dto }
  )
  .strict({ message: msg.extra })
