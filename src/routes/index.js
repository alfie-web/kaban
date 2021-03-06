const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')

const userRoutes = require('./users')
const boardsRoutes = require('./boards')
const listsRoutes = require('./lists')
const cardsRoutes = require('./cards')

const errorsHandler = require('../middlewares/errorsHandler')

const corsOptions = {
   origin: [process.env.CLIENT_URL],
   credentials: true,
}

module.exports = function createRoutes(app) {
   app.use(express.json())
   app.use(cookieParser())
   app.use(cors(corsOptions))

   app.use(
      helmet({
         contentSecurityPolicy: false,
      })
   )

   app.use(morgan('dev'))

   // app.use(function (req, res, next) {
   //    if ('OPTIONS' == req.method) {
   //       return res.sendStatus(200)
   //    } else {
   //       next()
   //    }
   // })

   app.use('/api/users', userRoutes)
   app.use('/api/boards', boardsRoutes)
   app.use('/api/lists', listsRoutes)
   app.use('/api/cards', cardsRoutes)

   // app.all('*', (req, res) => {
	// 	res.status(404).json({
	// 		status: 'error',
	// 		message: 'Missing endpoint'
	// 	})
	// })

   if (process.env.NODE_ENV === 'production') {
      app.use(
         '/',
         express.static(path.join(__dirname, '../../', 'client', 'build'))
      )

      app.get('/*', (req, res) => {
         res.sendFile(
            path.resolve(__dirname, '../../', 'client', 'build', 'index.html')
         )
      })
   }

   app.use(errorsHandler)
}
