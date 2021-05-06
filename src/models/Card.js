const mongoose = require('mongoose')

const schema = new mongoose.Schema(
   {
      title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			default: ''
		},
		marks: {
			type: [String],
			default: []
		},
		date: {
			type: String,
			default: ''
		},
		time: {
			type: String,
			default: ''
		},
		todos: {
			type: [{
				title: String,
				completed: Boolean
			}],
			default: []
		},
		responsibleUsers: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		}],
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
      listId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'List',
      },
      boardId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Board',
      },
   },
   {
      timestamps: true,
   }
)

module.exports = mongoose.models.Card || mongoose.model('Card', schema)
