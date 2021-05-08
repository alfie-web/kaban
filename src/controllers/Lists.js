const BoardModel = require('../models/Board')
const ListModel = require('../models/List')
const CardModel = require('../models/Card')

module.exports = class List {
   // getAll = async (req, res) => {
   //    const { boardId } = req.params

   //    try {
   //       const board = await BoardModel.findOne({ _id: boardId })
   //       // const lists = await ListModel.find({ boardId }).select('-cards')
   //       const lists = await ListModel.paginate({ boardId }, {
   //          select: '-cards',
   //          limit: 2,
   //          offset: 0
   //       })

   //       console.log('LISTS', lists)

   //       // Приходится сортировать, ибо падла не соблюдает порядок
   //       // (эта штука сортирует массив в соответствии с другим такимже массивом)
   //       const sortedLists = lists.sort(function (a, b) {
   //          return (
   //             board.lists.indexOf(a._id) - board.lists.indexOf(b._id)
   //          )
   //       })

   //       res.json({
   //          status: 'success',
   //          data: sortedLists,
   //       })

   //    } catch (e) {
   //       res.status(400).json({
   //          status: 'error',
   //          e,
   //       })
   //    }
   // }

   getAll = async (req, res) => {
      const { boardId } = req.params

      try {
         const board = await BoardModel.findOne({ _id: boardId })
         const lists = await ListModel.find({ boardId }).select('-cards')

         // Приходится сортировать, ибо падла не соблюдает порядок
         // (эта штука сортирует массив в соответствии с другим такимже массивом)
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

      console.log('offset', offset)

      try {
         const cardsCount = await CardModel.countDocuments({ listId })
         let isLastPage = offset + limit >= cardsCount

         const list = await ListModel.findById(listId)
            .select({'cards': { '$slice': [offset, limit] }})
            .populate('cards')

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

   create = (req, res) => {
      const postData = {
         boardId: req.body.boardId,
         title: req.body.title,
         cards: [],
      }

      const list = new ListModel(postData)

      list
         .save()
         .then((newList) => {
            BoardModel.updateOne(
               { _id: newList.boardId },
               { $push: { lists: newList._id } }
            )
               .exec()
               .then(() => {
                  res.json({
                     status: 'success',
                     data: newList,
                  })
               })
               .catch((err) =>
                  res.status(400).json({
                     status: 'error',
                     message: err,
                  })
               )
         })
         .catch((err) =>
            res.status(422).json({
               status: 'error',
               message: 'Invalid data',
               err,
            })
         )
   }

   moveCard = (req, res) => {
      const {
         startListId, // id листа из которого перемещаем карточку
         cardId, // id перемещаемой карточки
         endListId, // id листа в который перемещаем карточку
         currentPosition, // индекс текущей перемещаемой карточки
         newPosition, // индекс новой позиции в массиве
      } = req.body

      if (startListId === endListId) {
         ListModel.findOne({ _id: startListId })
            .exec()
            .then((list) => {
               if (list.cards.includes(cardId)) {
                  list.cards.splice(
                     newPosition,
                     0,
                     list.cards.splice(currentPosition, 1)[0]
                  ) // На новой позиции ничего не вырезаем, но вставляем туда 1 элемент из текущей позиции

                  list
                     .save()
                     .then(() => {
                        res.json({
                           status: 'success',
                           message: 'moved inside the list',
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
               res.status(422).json({
                  status: 'error',
                  message: 'Invalid data',
                  err,
               })
            )
      } else {
         ListModel.findOne({ _id: startListId })
            .exec()
            .then((list) => {
               list.cards.splice(currentPosition, 1) // Элегантный способ с $pull не получился хз почему

               list.save().then(() => {
                  CardModel.updateOne(
                     { _id: cardId },
                     { listId: endListId }
                  ).then(() => {
                     ListModel.updateOne(
                        { _id: endListId },
                        {
                           $push: {
                              cards: {
                                 $each: [cardId],
                                 $position: newPosition,
                              },
                           },
                        }
                     ).then(() => {
                        res.json({
                           status: 'success',
                           message: 'moved to another list',
                        })
                     })
                  })
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
   }
}
