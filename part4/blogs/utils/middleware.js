const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const unknownEndpoint = (request,response) => {
  response.status(404).send({ error: 'unknow endpoint' })
}

const errorHandler = (error,request,response,next) => {
  logger.error(error)
  if(error.name === 'ValidationError') return response.status(400).json({ error: error.message })
  if(error.name === 'CastError') return response.status(400).json({ error: 'ObjectId format is wrong' })
  if(error.name === 'MongoServerError') return response.status(400).json({ error: 'E11000 duplicate key error collection' })
  if(error.name === 'JsonWebTokenError') return response.status(401).json({ error: 'invalid token' })
  if(error.name === 'TokenExpiredError') return response.status(401).json({ error: 'token expired' })
  if(error.name === 'TypeError') return response.status(404).json({ error: 'input not found' })
  next(error)
}

const tokenExtractor = (request,response,next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer')){
    request.token = authorization.replace('Bearer ', '')
    console.log(request.token)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const result = jwt.verify(request.token,process.env.SECRET)
  const user = await User.findById(result.id)
  request.user = user

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}