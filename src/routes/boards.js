const { Router } = require('express')

const BoardsController = require('../controllers/Boards')

const checkAuth = require('../middlewares/checkAuth')

const boardsController = new BoardsController()
const routes = new Router()

routes.get('/', checkAuth, boardsController.getAll)
routes.get('/:id', checkAuth, boardsController.getById)
routes.post('/create', checkAuth, boardsController.create)
routes.post('/moveList', checkAuth, boardsController.moveList)

module.exports = routes