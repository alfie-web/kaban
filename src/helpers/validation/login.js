const { check } = require('express-validator/src')

module.exports = [
   check('email').isEmail(),
   check('password').isString().isLength({ min: 3 }),
]
