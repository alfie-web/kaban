const { Router } = require('express')

const ListsController = require('../controllers/Lists')
const checkAuth = require('../middlewares/checkAuth')

const listsController = new ListsController()
const routes = new Router()

routes.get('/getCards/:id', listsController.getCards)
routes.get('/:boardId', checkAuth, listsController.getAll)
routes.post('/create', checkAuth, listsController.create)
routes.post('/moveCard', checkAuth, listsController.moveCard)

module.exports = routes
