const express = require('express')

require('dotenv').config()
require('./core/db')()

const app = express()

require('./routes')(app)

const PORT = process.env.PORT || 8989
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))