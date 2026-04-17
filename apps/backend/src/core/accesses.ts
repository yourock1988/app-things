import { TEAPOT } from '@app-x/cmd'

// const { CL } = TEAPOT

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
      TEAPOT.CL.GET_ALL,
      TEAPOT.CL.GET_BY_ID,
      TEAPOT.CL.ADD,
      TEAPOT.CL.UPD_BY_ID,
      TEAPOT.CL.DEL_BY_ID,
      TEAPOT.CL.SHOW,
      TEAPOT.CL.JOIN,
      TEAPOT.CL.LEAVE,
      TEAPOT.CL.TURN_ON,
      TEAPOT.CL.TURN_OFF,
      TEAPOT.CL.TURN_DRAIN,
    ],
    user: ['authorization', TEAPOT.CL.GET_ALL, TEAPOT.CL.GET_BY_ID],
    guest: ['authorization'],
  },
} as const
