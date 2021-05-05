const jwt = require('jsonwebtoken')

const secret = process.env.SECRET

module.exports = (req, res, next) => {
   console.log('middleware')
   // if (req.path === '/api/users/login' || !req.xhr) return next()
   if (req.path === '/api/users/login') return next()

   const token = req.headers.token

   if (!token) {
      res.status(401).json({
         status: 'error',
         message: "Token doesn't exist!",
      })
   }

   try {
      const payload = jwt.verify(token, secret)

      if (payload.type !== 'access') {
         return res.status(401).json({
            status: 'error',
            message: 'Invalid token!',
         })
      }

      console.log('payload.user', payload.user)

      req.user = payload.user
      next()
   } catch (e) {
      console.log('E', e)
      if (e instanceof jwt.TokenExpiredError) {
         res.status(401).json({
            status: 'error',
            message: 'Token expired!',
         })
      }
      if (e instanceof jwt.JsonWebTokenError) {
         res.status(401).json({
            status: 'error',
            message: 'Invalid token!',
         })
      }
   }
}
