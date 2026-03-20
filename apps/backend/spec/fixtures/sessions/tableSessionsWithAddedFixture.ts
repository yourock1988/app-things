export default [
  {
    id: 11,
    sessionId: 'abcdef',
    nickname: 'aaa',
    createdAt: 1234567890,
    updatedAt: 1234567890,
  },
  {
    id: 12,
    sessionId: 'fedcba',
    nickname: 'uuu',
    createdAt: 1234567890,
    updatedAt: 1234567890,
  },
  {
    id: expect.any(Number),
    sessionId: expect.any(String),
    nickname: 'ooo',
    updatedAt: expect.any(Number),
    createdAt: expect.any(Number),
  },
]
