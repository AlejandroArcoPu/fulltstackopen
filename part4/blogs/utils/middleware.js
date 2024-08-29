const logger = require('../utils/logger')

const unknownEndpoint = (request,response) => {
    response.status(404).send({error: 'unknow endpoint'})
}

const errorHandler = (error,request,response,next) => {
    logger.error(error)
    
    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler
}