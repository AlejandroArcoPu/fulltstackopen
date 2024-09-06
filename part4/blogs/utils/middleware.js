const logger = require('../utils/logger')

const unknownEndpoint = (request,response) => {
  response.status(404).send({ error: 'unknow endpoint' })
}

const errorHandler = (error,request,response,next) => {
  logger.error(error)
  if(error.name === 'ValidationError') return response.status(400).json({ error: error.message })
  if(error.name === 'CastError') return response.status(400).json({ error: 'ObjectId format is wrong' })
  if(error.name === 'MongoServerError') return response.status(400).json({ error: 'E11000 duplicate key error collection' })

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}