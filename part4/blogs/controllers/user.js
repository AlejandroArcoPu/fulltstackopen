const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request,response) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.post('/', async (request,response) => {
  const body = request.body

  const salt = 10
  const password = body.password

  if(password.length < 3) {
    return response.status(400).json({ error: 'password length must be greater' })
  }

  const passwordHash = await bcrypt.hash(password,salt)

  const newUser = new User ({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await newUser.save()

  response.status(201).json(savedUser)

})

module.exports = userRouter