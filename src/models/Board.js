const mongoose = require('mongoose')

const schema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true
      },
      bg: {
         type: String,
         default: null
      },
      lists: {
         type: [
            {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'List',
            },
         ],
         default: [],
      },
		author: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
      },
      users: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
      }],
   },
   {
      timestamps: true,
   }
)

module.exports = mongoose.model('Board', schema)
