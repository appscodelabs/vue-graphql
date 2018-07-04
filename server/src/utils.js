const jwt = require('jsonwebtoken')

function getUserId(ctx) {
  console.log('ctx: ', ctx);
  const Authorization = ctx.request.get('Authorization')
  console.log('Authorization: ', Authorization);
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    console.log('userId: ', userId);
    return userId
  }

  throw new AuthError()
}

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

module.exports = {
  getUserId,
  AuthError
}