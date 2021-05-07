const ListModel = require('../models/List')
const CardModel = require('../models/Card')

module.exports = class Card {
   getAllByListId = async (req, res) => {
      const page = req.query.page || 1
      try {
         const list = await ListModel.findOne({ _id: req.params.listId })
         // const cards = await CardModel.find({ listId: req.params.listId })

         const cards = await CardModel.paginate({ listId: req.params.listId }, {
            limit: 2,
            // offset: 0
            page
         })

         console.log('CARDS', cards)

         const sortedCards = cards.docs.sort(function (a, b) {
            return (
               list.cards.indexOf(a._id) - list.cards.indexOf(b._id)
            )
         })

         res.json({
            status: 'success',
            // data: sortedCards
            data: {
               cards: sortedCards,
               isLastPage: !cards.hasNextPage,
               page: cards.page
            },
         })

      } catch (error) {
         res.status(400).json({
            status: 'error',
            err,
         })
      }
   }


   // getAllByListId = async (req, res) => {
   //    try {
   //       const list = await ListModel.findOne({ _id: req.params.listId })
   //       const cards = await CardModel.find({ listId: req.params.listId })

   //       const sortedCards = cards.sort(function (a, b) {
   //          return (
   //             list.cards.indexOf(a._id) - list.cards.indexOf(b._id)
   //          )
   //       })

   //       res.json({
   //          status: 'success',
   //          data: sortedCards,
   //       })

   //    } catch (error) {
   //       res.status(400).json({
   //          status: 'error',
   //          err,
   //       })
   //    }
   // }

   create = (req, res) => {
      const postData = {
         listId: req.body.listId,
         title: req.body.title,
			description: req.body.description,
			marks: req.body.marks,
			date: req.body.date,
			time: req.body.time,
			todos: req.body.todos,
			responsibleUsers: req.body.responsibleUsers,
			author: req.user._id
      }

      const card = new CardModel(postData)

      card
         .save()
         .then((newCard) => {
            ListModel.updateOne(
               { _id: newCard.listId },
               { $push: { cards: newCard._id } }
            )
               .exec()
               .then(() => {
                  res.json({
                     status: 'success',
                     data: newCard,
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

   editCard = (req, res) => {
      const { cardId, text } = req.body

      CardModel.updateOne({ _id: cardId }, { text })
         .exec()
         .then(() => {
            res.json({
               status: 'success',
               data: 'Card has been successfully edited',
            })
         })
         .catch((err) =>
            res.status(404).json({
               status: 'error',
               message: 'Invalid card data provided',
               err,
            })
         )
   }

   deleteCard = (req, res) => {
      const { listId, cardId } = req.body

      // ListModel.updateOne({ _id: listId }, { $pull: { cards: cardId } })
      // 	.exec()
      // 	.then(() => {

      // 	})

      console.log(listId, cardId)

      ListModel.findOne({ _id: listId })
         .exec()
         .then((list) => {
            if (!list.cards.includes(cardId)) return

            // list.cards = list.cards.filter(card => card !== cardId);
            list.cards.pull(cardId)
            list.save().then(() => {
               CardModel.deleteOne({ _id: cardId })
                  .exec()
                  .then(() =>
                     res.json({
                        status: 'success',
                        message: 'Card successfully deleted',
                     })
                  )
                  .catch((err) =>
                     res.status(400).json({
                        status: 'error',
                        message: err,
                     })
                  )
            })
         })
         .catch((err) =>
            res.status(404).json({
               status: 'error',
               message: err,
            })
         )
   }
}
