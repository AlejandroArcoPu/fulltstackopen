const logger = require('../utils/logger')

const unknownEndpoint = (request,response) => {
  response.status(404).send({ error: 'unknow endpoint' })
}

const errorHandler = (error,request,response,next) => {
  logger.error(error)
  if(error.name === 'ValidationError') return response.status(400).json({ error: error.message })
  if(error.name === 'CastError') return response.status(400).json({ error: 'ObjectId format is wrong' })
  if(error.name === 'MongoServerError') return response.status(400).json({ error: 'E11000 duplicate key error collection' })
  if(error.name === 'JsonWebTokenError') return response.status(401).json({ error: 'token malformed' })
  if(error.name === 'TokenExpiredError') return response.status(401).json({ error: 'token expired' })

  next(error)
}

const tokenExtractor = (request,response,next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer')){
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}
module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}