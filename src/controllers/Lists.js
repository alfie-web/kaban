const BoardModel = require('../models/Board')
const ListModel = require('../models/List')
const CardModel = require('../models/Card')

module.exports = class List {
   getAll = async (req, res) => {
      const { boardId } = req.params

      try {
         const board = await BoardModel.findOne({ _id: boardId })
         const lists = await ListModel.find({ boardId }).select('-cards')

         const sortedLists = lists.sort(function (a, b) {
            return (
               board.lists.indexOf(a._id) - board.lists.indexOf(b._id)
            )
         })

         res.json({
            status: 'success',
            data: sortedLists,
         })

      } catch (e) {
         res.status(400).json({
            status: 'error',
            e,
         })
      }
   }

   getCards = async (req, res) => {
      const listId = req.params.id

      const limit = 2
      const offset = +req.query.offset || 0

      try {
         const cardsCount = await CardModel.countDocuments({ listId })
         let isLastPage = offset + limit >= cardsCount

         const list = await ListModel.findById(listId)
            .select({'cards': { '$slice': [offset, limit] }})
            .populate({ 
               path: 'cards',
               populate: {
                 path: 'responsibleUsers',
                 model: 'User',
                 select: 'avatar fullname'
               } 
            })

         res.json({
            status: 'success',
            data: {
               cards: list.cards,
               isLastPage,
            }
         })
         
      } catch (error) {
         res.status(400).json({
            status: 'error',
            message: error,
         })
      }
   }

   create = async (req, res) => {
      const postData = {
         boardId: req.body.boardId,
         title: req.body.title,
         cards: [],
      }

      try {
         const list = new ListModel(postData)
         await list.save()

         await BoardModel.updateOne(
            { _id: list.boardId },
            { $push: { lists: { $each: [list._id], $position: req.body.position } } }
         )

         res.json({
            status: 'success',
            data: list,
         })
         
      } catch (error) {
         res.status(400).json({
            status: 'error',
            message: error,
         })
      }
   }

   // TODO: Проверить имеет ли пользователь право на удаление
   delete = async (req, res) => {
      const listId = req.params.id

      try {
         const list = await ListModel.findById(listId)
         list.cards.length && await CardModel.deleteMany({ _id: { $in: list.cards } })
         
         const board = await BoardModel.findById(list.boardId)
         if (board.lists.includes(listId)) {
            await board.lists.pull(listId)
            await board.save()
         }
         
         await list.delete()

         res.json({
            status: 'success',
            message: 'List and cards successfully deleted',
         })
         
      } catch (error) {
         res.status(400).json({
            status: 'error',
            message: error,
         })
      }
   }

   moveCard = async (req, res) => {
      const {
         startListId, // id листа из которого перемещаем карточку
         cardId, // id перемещаемой карточки
         endListId, // id листа в который перемещаем карточку
         currentPosition, // индекс текущей перемещаемой карточки
         newPosition, // индекс новой позиции в массиве
      } = req.body
      let successMsg = ''

      try {
         const list = await ListModel.findOne({ _id: startListId })

         if (startListId === endListId) {
            if (list.cards.includes(cardId)) {
               list.cards.splice(
                  newPosition,
                  0,
                  list.cards.splice(currentPosition, 1)[0]
               ) // На новой позиции ничего не вырезаем, но вставляем туда 1 элемент из текущей позиции
   
               await list.save()
    
               successMsg = 'moved inside the list'
               
            }
   
            // Тут кидаем ошибку в else
            
         } else {
            list.cards.splice(currentPosition, 1) 
            await list.save()
   
            await CardModel.updateOne(
               { _id: cardId },
               { listId: endListId }
            )
               
            await ListModel.updateOne(
               { _id: endListId },
               {
                  $push: {
                     cards: {
                        $each: [cardId],
                        $position: newPosition,
                     },
                  },
               }
            )

            successMsg = 'moved to another list'
         }

         res.json({
            status: 'success',
            message: successMsg,
         })
   
      } catch (error) {
         res.status(422).json({
            status: 'error',
            message: 'Invalid data',
            err,
         })
      }
   }
}
