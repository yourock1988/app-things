import { TEAPOT } from '@app-x/cmd'

const { CL } = TEAPOT

export default {
  '/api/v0/accounts': {
    admin: ['GET', 'POST'],
  },
  '/api/v0/accounts/:id': {
    admin: ['GET', 'PATCH', 'DELETE'],
  },
  '/api/v0/sessions': {
    admin: ['GET', 'POST'],
  },
  '/api/v0/sessions/:id': {
    admin: ['GET', 'PATCH', 'DELETE'],
  },
  '/api/v0/cars': {
    admin: ['GET', 'POST'],
    user: ['GET'],
  },
  '/api/v0/cars/:id': {
    admin: ['GET', 'PATCH', 'DELETE'],
    user: ['GET'],
  },
  '/api/v0/users': {
    admin: ['GET', 'POST'],
    user: ['GET'],
  },
  '/api/v0/users/:id': {
    admin: ['GET', 'PATCH', 'DELETE'],
    user: ['GET'],
  },
  '/api/v0/teapots': {
    admin: ['GET', 'POST'],
    user: ['GET'],
  },
  '/api/v0/teapots/:id': {
    admin: ['GET', 'PATCH', 'DELETE'],
    user: ['GET'],
  },
  '/cars': {
    admin: [
      'authorization',
      'car:getAll',
      'car:getById',
      'car:add',
      'car:updateById',
      'car:removeById',
    ],
    user: ['authorization', 'car:getAll', 'car:getById'],
  },
  '/users': {
    admin: [
      'authorization',
      'user:getAll',
      'user:getById',
      'user:add',
      'user:updateById',
      'user:removeById',
    ],
    user: ['authorization', 'user:getAll', 'user:getById'],
  },
  '/teapots': {
    admin: [
      'authorization',
      CL.SHOW,
      CL.TURN_ON,
      CL.TURN_OFF,
      CL.TURN_DRAIN,
      CL.GET_ALL,
      CL.GET_BY_ID,
      CL.ADD,
      CL.UPD_BY_ID,
      CL.DEL_BY_ID,
    ],
    user: ['authorization', 'user:getAll', 'user:getById'],
  },
} as const
