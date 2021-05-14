const ListModel = require('../models/List')
const CardModel = require('../models/Card')

module.exports = class Card {
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
               { $push: { cards: { $each: [newCard._id], $position: req.body.position } } }
               // { $push: { cards: newCard._id } }
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



   // create = (req, res) => {
   //    const postData = {
   //       listId: req.body.listId,
   //       title: req.body.title,
	// 		description: req.body.description,
	// 		marks: req.body.marks,
	// 		date: req.body.date,
	// 		time: req.body.time,
	// 		todos: req.body.todos,
	// 		responsibleUsers: req.body.responsibleUsers,
	// 		author: req.user._id
   //    }

   //    const card = new CardModel(postData)

   //    card
   //       .save()
   //       .then((newCard) => {
   //          ListModel.updateOne(
   //             { _id: newCard.listId },
   //             { $push: { cards: newCard._id } }
   //          )
   //             .exec()
   //             .then(() => {
   //                res.json({
   //                   status: 'success',
   //                   data: newCard,
   //                })
   //             })
   //             .catch((err) =>
   //                res.status(400).json({
   //                   status: 'error',
   //                   message: err,
   //                })
   //             )
   //       })
   //       .catch((err) =>
   //          res.status(422).json({
   //             status: 'error',
   //             message: 'Invalid data',
   //             err,
   //          })
   //       )
   // }

   editCard = async (req, res) => {
      const { cardId, prop, value } = req.body

      try {
         await CardModel.updateOne({ _id: cardId }, { [prop]: value })

         res.json({
            status: 'success',
            data: 'Card has been successfully edited',
         })

      } catch (error) {
         res.status(404).json({
            status: 'error',
            message: 'Invalid card data provided',
            err,
         })
      }
   }

   deleteCard = async (req, res) => {
      const { listId, cardId } = req.body
      console.log('listId and cardId', req.body)
      try {
         const list = await ListModel.findById(listId)

         if (!list.cards.includes(cardId)) throw 'Card not found'

         await list.cards.pull(cardId)
         await list.save()

         await CardModel.deleteOne({ _id: cardId })

         res.json({
            status: 'success',
            message: 'Card successfully deleted',
         })

      } catch (err) {
         res.status(400).json({
            status: 'error',
            message: err,
         })
      }           
   }

   // deleteCard = (req, res) => {
   //    const { listId, cardId } = req.body

   //    // ListModel.updateOne({ _id: listId }, { $pull: { cards: cardId } })
   //    // 	.exec()
   //    // 	.then(() => {

   //    // 	})

   //    console.log(listId, cardId)

   //    ListModel.findOne({ _id: listId })
   //       .exec()
   //       .then((list) => {
   //          if (!list.cards.includes(cardId)) return

   //          // list.cards = list.cards.filter(card => card !== cardId);
   //          list.cards.pull(cardId)
   //          list.save().then(() => {
   //             CardModel.deleteOne({ _id: cardId })
   //                .exec()
   //                .then(() =>
   //                   res.json({
   //                      status: 'success',
   //                      message: 'Card successfully deleted',
   //                   })
   //                )
   //                .catch((err) =>
   //                   res.status(400).json({
   //                      status: 'error',
   //                      message: err,
   //                   })
   //                )
   //          })
   //       })
   //       .catch((err) =>
   //          res.status(404).json({
   //             status: 'error',
   //             message: err,
   //          })
   //       )
   // }
}
