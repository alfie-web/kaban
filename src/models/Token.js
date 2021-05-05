const { model, Schema } = require('mongoose')

const schema = new Schema({
   tokenId: String,
   user: {
      _id: String,
      // role: String
   },
})

module.exports = model('Token', schema)
