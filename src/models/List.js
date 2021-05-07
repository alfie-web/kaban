const mongoose = require('mongoose')
// const mongoosePaginate = require('mongoose-paginate-v2')

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
      // cards: [{
      // 	type: mongoose.Schema.Types.ObjectId,
      // 	ref: 'Card'
      // }]
   },
   {
      timestamps: true,
   }
)
// mySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('List', ListSchema)
