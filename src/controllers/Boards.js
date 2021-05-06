const BoardModel = require('../models/Board')

module.exports = class Boards {
   getAll = (req, res) => {
      // console.log('User: ', req.user)

      BoardModel.find({ users: req.user._id })
         .exec()
         .then((boards) => {
            res.json({
               status: 'success',
               data: boards,
            })
         })
         .catch((err) =>
            res.status(400).json({
               status: 'error',
               err,
            })
         )
   }

   getById = (req, res) => {
      const boardId = req.params.id
      const userId = req.user._id

      BoardModel.findOne({ _id: boardId, users: userId })
         .select('-lists')
         .exec()
         .then((board) => {
            res.json({
               status: 'success',
               data: board,
            })
         })
         .catch((err) =>
            res.status(404).json({
               status: 'error',
               message: 'Board not found',
               err,
            })
         )
   }

   create = (req, res) => {
      const userId = req.user._id
      const postData = {
         title: req.body.title,
         bg: req.body.bg,
			author: userId,
         users: [userId], // Потом это будет массив из userId user: [userId] - изначально с одним userId
      }

      const board = new BoardModel(postData)

      board
         .save()
         .then((newBoard) =>
            res.json({
               status: 'success',
               data: newBoard,
            })
         )
         .catch((err) =>
            res.status(422).json({
               status: 'error',
               message: 'Invalid data',
               err,
            })
         )
   }

   moveList = (req, res) => {
      const {
         boardId, // id доски
         listId, // id листа который перемещаем
         currentPosition, // индекс перемещаемого листа
         newPosition, // индекс новой позиции в массиве
      } = req.body

      BoardModel.findOne({ _id: boardId })
         .exec()
         .then((board) => {
            if (board.lists.includes(listId)) {
               board.lists.splice(
                  newPosition,
                  0,
                  board.lists.splice(currentPosition, 1)[0]
               ) // На новой позиции ничего не вырезаем, но вставляем туда 1 элемент из текущей позиции

               board
                  .save()
                  .then(() => {
                     res.json({
                        status: 'success',
                        message: 'List has been moved',
                     })
                  })
                  .catch((err) =>
                     res.status(422).json({
                        status: 'error',
                        message: 'Invalid data',
                        err,
                     })
                  )
            }
         })
         .catch((err) =>
            res.status(404).json({
               status: 'error',
               message: 'Board not found',
               err,
            })
         )
   }
}
