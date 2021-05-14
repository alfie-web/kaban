const { Router } = require('express')

const CardsController = require('../controllers/Cards')
const checkAuth = require('../middlewares/checkAuth')

const cardsController = new CardsController()
const routes = new Router()

routes.post('/create', checkAuth, cardsController.create)
routes.patch('/edit', checkAuth, cardsController.editCard)
routes.delete('/delete', checkAuth, cardsController.deleteCard)

module.exports = routes