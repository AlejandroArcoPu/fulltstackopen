const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helpers')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')

const api = supertest(app)

describe('when a user tries to login', () => {

  beforeEach(async() => {
    await User.deleteMany({})
    const users = helper.initialUsers.map(async (user) =>
      new User({
        username: user.username,
        name: user.name,
        passwordHash: await bcrypt.hash(user.password,10)
      }))

    const usersWithPasswords= await Promise.all(users)
    const usersSave = usersWithPasswords.map(user => user.save())

    await Promise.all(usersSave)
  })

  test('a valid user can generate a token', async() => {
    const users = await helper.usersInBd()

    const validUser = {
      username: users[0].username,
      password: '123456'
    }

    const result = await api
      .post('/api/login')
      .send(validUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert(['token','username','name'].every(property => Object.hasOwn(result.body,property)))
  })

  test('a user with a wrong password can not generate a token', async() => {
    const users = await helper.usersInBd()

    const invalidUser = {
      username: users[0].username,
      password: 'inventedpassword'
    }

    const result = await api
      .post('/api/login')
      .send(invalidUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('invalid username or password'))
  })

  test('a missing username can not generate a token', async() => {

    const invalidUser = {
      password: '1234'
    }

    const result = await api
      .post('/api/login')
      .send(invalidUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('invalid username or password'))

  })

  test('a missing password can not generate a token', async() => {

    const invalidUser = {
      username: 'root'
    }

    const result = await api
      .post('/api/login')
      .send(invalidUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('invalid username or password'))

  })

  after(async () => {
    await mongoose.connection.close()
  })
})