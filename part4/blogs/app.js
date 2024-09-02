const mongoose = require('mongoose')
const config = require('./utils/config')
require('express-async-errors')
const cors = require('cors')
const express = require('express')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')
const morgan = require('morgan')
const app = express()

logger.info('connecting to',config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error)
  })

app.use(cors())
app.use(express.json())

app.use(morgan('tiny', { skip: () => process.env.NODE_ENV === 'test' }))

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app