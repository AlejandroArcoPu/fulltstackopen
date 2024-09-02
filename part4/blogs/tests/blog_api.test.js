const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helpers')

describe('api blogs', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogList = helper.initialBlogs.map(blog => new Blog(blog))
    const blogPromises = blogList.map(blog => blog.save())
    await Promise.all(blogPromises)
    console.log('done clean bd')
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type',/application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blogs has id as unique identifier', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual('id' in response.body[0], true)
  })

  after(async () => {
    await mongoose.connection.close()
  })

})
