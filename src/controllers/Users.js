const { validationResult } = require('express-validator')
const createError = require('http-errors')
const { compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')

const {
   generateAccessToken,
   generateRefreshToken,
   replaceDbRefreshToken,
} = require('../helpers/authHelpers')
const UserModel = require('../models/User')
const TokenModel = require('../models/Token')

const updateTokens = (user) => {
   const { token, exp } = generateAccessToken(user)
   const refreshToken = generateRefreshToken()

   return replaceDbRefreshToken(refreshToken.id, user).then(() => {
      return {
         exp,
         accessToken: token,
         refreshToken: refreshToken.token,
         time: refreshToken.time,
      }
   })
}

class UserController {
   getMe = async (req, res, next) => {
      const userId = req.user._id

      try {
         const user = await UserModel.findById(userId).select('-password')

         res.json({
            status: 'success',
            data: user,
         })
      } catch (e) {
         return next(createError(400, `User '${userId}' not found`)) // 3-м параметром можно передать доп инфу
      }
   }

   login = async (req, res, next) => {
      const postData = req.body

      // Валидируем данные
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return next(createError(401, 'Некорректный email или пароль'))
      }

      try {
         const findedUser = await UserModel.findOne({ email: postData.email })
         if (
            findedUser &&
            compareSync(
               process.env.SECRET + postData.password,
               findedUser.password
            )
         ) {
            console.log('ТУТ', findedUser)
            // Генерируем пару токенов
            const tokens = await updateTokens(findedUser)

            res.cookie(
               'auth',
               JSON.stringify({ refreshToken: tokens.refreshToken }),
               { maxAge: tokens.time, httpOnly: true }
            )

            return res.json({
               status: 'success',
               data: {
                  exp: tokens.exp,
                  accessToken: tokens.accessToken,
                  serverTime: Date.now()
               },
            })
         } else {
            return next(createError(401, 'Некорректный email или пароль'))
         }
      } catch (e) {
         return next(createError(500, 'Самсинг вент ронг'))
      }
   }

   refreshTokens = (req, res, next) => {
      const secret = process.env.SECRET
      const refreshToken = req.cookies.auth
         ? JSON.parse(req.cookies.auth).refreshToken
         : ''

      let payload
      try {
         payload = jwt.verify(refreshToken, secret)
         if (payload.type !== 'refresh') {
            return next(createError(401, 'Невалидный токен'))
         }
      } catch (e) {
         if (e instanceof jwt.TokenExpiredError) {
            return next(createError(401, 'Время жизни токена истекло'))
         } else if (e instanceof jwt.JsonWebTokenError) {
            return next(createError(401, 'Невалидный токен'))
         }
      }

      // Как раз здесь происходит логика проверки, валиден ли refreshToken
      TokenModel.findOne({ tokenId: payload.id })
         .exec()
         .then((token) => {
            if (token === null) {
               return next(createError(401, 'Невалидный токен'))
            }

            return updateTokens(token.user)
         })
         .then((tokens) => {
            res.cookie(
               'auth',
               JSON.stringify({ refreshToken: tokens.refreshToken }),
               { maxAge: tokens.time, httpOnly: true }
            )

            res.json({
               status: 'success',
               data: {
                  exp: tokens.exp,
                  accessToken: tokens.accessToken,
                  serverTime: Date.now()
               },
            })
         })
         .catch((err) =>
            res.status(400).json({
               status: 'error',
               message: err.message,
            })
         )
   }

   removeToken = async (req, res, next) => {
      const userId = req.user._id

      try {
         await TokenModel.deleteMany({ 'user._id': userId })

         res.json({
            status: 'success',
         })
      } catch (e) {
         res.status(400).json({
            status: 'error',
            message: 'Что-то пошло не так',
         })
      }
   }

   create = async (req, res, next) => {
      const postData = req.body

      // Валидируем данные
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return next(createError(400, 'Некорректные данные'))
      }

      const findedUser = await UserModel.findOne({ email: postData.email })
      if (findedUser)
         return next(createError(400, 'Такой пользователь уже существует'))

      try {
         const newUser = await new UserModel(postData)
         await newUser.save()

         res.json({
            status: 'success',
            data: newUser,
         })
      } catch (e) {
         return next(createError(500, 'Самсинг вент ронг'))
      }
   }
}

module.exports = UserController
