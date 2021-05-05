const { models, model, Schema } = require('mongoose')
const bcrypt = require('bcrypt')

const schema = new Schema(
   {
      fullname: {
         type: String,
         required: true,
      },
		avatar: {
			type: String
		},
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
)

schema.pre('save', function (next) {
   const user = this

   if (!user.isModified('password')) return next() //Returns true if this document was modified, else false.

   const SECRET = process.env.SECRET || ''

   bcrypt.hash(SECRET + user.password, 10, function (err, hash) {
      if (err) return next()

      user.password = String(hash)

      next()
   })
})

module.exports = models.User || model('User', schema)
