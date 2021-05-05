const mongoose = require('mongoose')

const DB_URL = String(process.env.DB_URL)

const connectDB = () => {
   console.log('Connecting ...')
   mongoose
      .connect(DB_URL, {
         useNewUrlParser: true,
         useCreateIndex: true,
         useFindAndModify: false,
         useUnifiedTopology: true,
      })
      .then(() => {
         console.log(`DB connection has been established!`)
      })
      .catch((err) => console.error(`Error connecting to ${DB_URL}`, err))
}

module.exports = connectDB
