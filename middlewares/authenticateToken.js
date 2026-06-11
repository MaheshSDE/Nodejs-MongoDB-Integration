const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization')
  const token = authHeader?.split(' ')[1]
  if (!token) {
    return res.status(401).json({message: 'Access Denied: No Token Provided'})
  }
  jwt.verify(token, process.env.SECRETE_TOKEN, (err, payload) => {
    if (err) {
      const msg =
        err.name === 'TokenExpiredError' ? 'Token Expired' : 'Invalid Token'
      return res
        .status(err.name === 'TokenExpiredError' ? 401 : 403)
        .json({message: msg})
    }
    req.user = payload
    next()
  })
}
module.exports = {authenticateToken}
