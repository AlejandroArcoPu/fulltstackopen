const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helpers')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('when some users are saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const users = helper.initialUsers.map(user => new User(user))
    const usersSave = users.map(user => user.save())
    await Promise.all(usersSave)
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type',/application\/json/)
  })

  test('all the users are returned', async () => {
    const users = await api.get('/api/users')
    assert.strictEqual(users.body.length, helper.initialUsers.length)
  })

  test('a valid user is created', async () => {
    const usersAtStart = await helper.usersInBd()

    const newUser = {
      username: 'BelenAgui',
      name: 'Belen',
      password: 'belensecret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const usersAtEnd = await helper.usersInBd()
    const usersUsername = usersAtEnd.map(user => user.username)

    assert(usersUsername.includes('BelenAgui'))
    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length)
  })

  test('an new user with an existing username is not created', async() => {
    const usersAtStart = await helper.usersInBd()

    const repeatedUser = {
      username: usersAtStart[0].username,
      name: usersAtStart[0].name,
      password: '12345'
    }

    const result = await api
      .post('/api/users')
      .send(repeatedUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('duplicate key error'))
    const usersAtEnd = await helper.usersInBd()
    assert.strictEqual(usersAtStart.length,usersAtEnd.length)
  })

  test('if a parameter in user body is missing the user is not created', async() => {
    const usersAtStart = await helper.usersInBd()

    const invalidUsername = {
      name: 'Belen',
      password: '12345mysecret'
    }
    const result = await api
      .post('/api/users')
      .send(invalidUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('User validation failed'))
    const usersAtEnd = await helper.usersInBd()
    assert.strictEqual(usersAtStart.length,usersAtEnd.length)
  })

  test('an user with a short password length is not created', async() => {
    const usersAtStart = await helper.usersInBd()

    const newUser = {
      username: 'BelenAgui',
      name: 'Belen',
      password: '12'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInBd()

    assert.strictEqual(result.body.error,'password length must be greater')
    assert.strictEqual(usersAtStart.length,usersAtEnd.length)
  })

  after(async() => {
    await mongoose.connection.close()
  })

})