const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      boardId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Board',
      },
      cards: {
         type: [
            {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Card',
            },
         ],
         default: [],
      },
   },
   {
      timestamps: true,
   }
)
module.exports = mongoose.model('List', ListSchema)
