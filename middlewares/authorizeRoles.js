const authorizeRoles = allowedRoles => (req, res, next) => {
  console.log(req.user)
  if (!req.user) {
    return res
      .status(401)
      .json({message: 'Unauthorized: No user Information found'})
  }
  if (!allowedRoles.includes(req.user.role)) {
    return res
      .status(403)
      .json({message: 'Forbidden: You do not have required role'})
  }
  next()
}

module.exports = {authorizeRoles}
