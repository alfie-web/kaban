const jwt = require('jsonwebtoken')
const { nanoid } = require('nanoid')

const TokenModel = require('../models/Token')

const secret = process.env.SECRET

const generateAccessToken = (user) => {
   const payload = {
      user: {
         _id: user._id,
         // role: user.role
      },
      type: process.env.JWT_ACCESS_TYPE,
   }
   const options = { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN }

   const token = jwt.sign(payload, secret, options)
   const decoded = jwt.decode(token)

   // В exp находится время жизни токена в timestamp, только не в милисекундах, а в секундах
   // Поэтому на клиенте нужно умножать на 1000
   return {
      token,
      exp: decoded.exp,
   }
}

const generateRefreshToken = () => {
   const payload = {
      id: nanoid(),
      type: process.env.JWT_REFRESH_TYPE,
   }
   const options = { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN }

   const token = jwt.sign(payload, secret, options)
   const decoded = jwt.decode(token)

   const time = Math.abs(Date.now() - decoded.exp * 1000) // timestamp протухания		(чтобы задать время жизни куки)
   console.log('Время жизни refreshToken в мс', time)

   return {
      id: payload.id,
      token,
      time,
   }
}

const replaceDbRefreshToken = (tokenId, user) => {
   return TokenModel.findOneAndRemove({ 'user._id': user._id })
      .exec()
      .then(() => TokenModel.create({ tokenId, user }))
}

module.exports = {
   generateAccessToken,
   generateRefreshToken,
   replaceDbRefreshToken,
}
