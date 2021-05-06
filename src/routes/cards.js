const { Router } = require('express')

const CardsController = require('../controllers/Cards')
const checkAuth = require('../middlewares/checkAuth')

const cardsController = new CardsController()
const routes = new Router()

routes.get('/:listId', checkAuth, cardsController.getAllByListId)
routes.post('/create', checkAuth, cardsController.create)
routes.post('/edit', checkAuth, cardsController.editCard)
routes.post('/delete', checkAuth, cardsController.deleteCard)

module.exports = routes