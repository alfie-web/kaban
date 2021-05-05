module.exports = (error, req, res, next) => {
   console.log('Error status: ', error.status)
   console.log('Message: ', error.message)

   res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
   })

   next()
}
