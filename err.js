const TransportError = {
  status: 400,
  details: {
    _errors: [],
    phone: {
      _errors: ['Пришлите это поле'],
    },
  },
}

const AppError = {
  message: 'Невалидный JSON: {,}',
  name: 'TransportError',
  code: 'ENOENT',
  stack: 'TransportError: omg!\n    at <anonymous>:1:1',
  cause: null,
  status: 400,
  _errors: [],
  phone: {
    _errors: ['Пришлите это поле'],
  },
}
