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
    assert('id' in response.body[0])
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      id: '1a234b567b89a676234d17fa',
      title: 'Alejandros book',
      author: 'Alejandro Arco',
      url: 'https://alejandrosbook.com',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    const blogsEnd = await helper.blogsInBd()

    assert.strictEqual(blogsEnd.length,helper.initialBlogs.length + 1)
    const titleList = blogsEnd.map(b => b.title)
    assert(titleList.includes('Alejandros book'))
  })

  test('a blog without title can not be added', async () => {
    const invalidTitleBlog = {
      id: '1a234b567b89a676234d17fa',
      author: 'Alejandro Arco',
      url: 'https://alejandrosbook.com',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .send(invalidTitleBlog)
      .expect(400)

    const blogsEnd = await helper.blogsInBd()

    assert.strictEqual(blogsEnd.length,helper.initialBlogs.length)
  })

  after(async () => {
    await mongoose.connection.close()
  })

})
