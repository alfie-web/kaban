const { Router } = require('express')

const UsersController = require('../controllers/Users')
const userValidations = require('../helpers/validation/newUser')
const loginValidations = require('../helpers/validation/login')

const checkAuth = require('../middlewares/checkAuth')

const usersController = new UsersController()
const routes = new Router()

routes.get('/getMe', checkAuth, usersController.getMe)
routes.post('/login', loginValidations, usersController.login)
routes.post('/create', userValidations, usersController.create)
routes.post('/refresh-tokens', usersController.refreshTokens)
routes.delete('/remove-token', checkAuth, usersController.removeToken)

module.exports = routes
