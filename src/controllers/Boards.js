const BoardModel = require('../models/Board')

module.exports = class Boards {
   getAll = async (req, res) => {
      try {
         const boards = await BoardModel.find({ users: req.user._id })

         res.json({
            status: 'success',
            data: boards,
         })
         
      } catch (error) {
         res.status(400).json({
            status: 'error',
            err,
         })
      }   
   }

   getById = async (req, res) => {
      const boardId = req.params.id
      const userId = req.user._id

      try {
         const board = await BoardModel.findOne({ _id: boardId, users: userId })
            .select('-lists')
            .populate({ 
               path: 'users',
               select: 'avatar fullname'
            })

         res.json({
            status: 'success',
            data: board,
         })
         
      } catch (error) {
         res.status(404).json({
            status: 'error',
            message: 'Board not found',
            err,
         })
      }
   }

   create = async (req, res) => {
      const userId = req.user._id
      const postData = {
         title: req.body.title,
         bg: req.body.bg,
			author: userId,
         users: [userId], // Потом это будет массив из userId user: [userId] - изначально с одним userId
      }

      try {
         const newBoard = new BoardModel(postData)
         await newBoard.save()

         res.json({
            status: 'success',
            data: newBoard,
         })
         
      } catch (error) {
         res.status(422).json({
            status: 'error',
            message: 'Invalid data',
            err,
         })
      }
   }

   moveList = async (req, res) => {
      const {
         boardId, 
         listId, 
         currentPosition, // индекс перемещаемого листа
         newPosition, // индекс новой позиции в массиве
      } = req.body

      try {
         const board = await BoardModel.findOne({ _id: boardId })

         if (board.lists.includes(listId)) {
            board.lists.splice(
               newPosition,
               0,
               board.lists.splice(currentPosition, 1)[0]
            ) // На новой позиции ничего не вырезаем, но вставляем туда 1 элемент из текущей позиции

            await board.save()

            res.json({
               status: 'success',
               message: 'List has been moved',
            })
         }
      } catch (error) {
         res.status(404).json({
            status: 'error',
            message: 'Board not found',
            err,
         })
      }
   }
}
