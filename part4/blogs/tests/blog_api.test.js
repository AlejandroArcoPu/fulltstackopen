const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helpers')
const User = require('../models/user')

describe('when some blogs are saved', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const users = helper.initialUsers.map(user => new User(user))
    const usersSave = users.map(user => user.save())

    await Promise.all(usersSave)

    const blogs = helper.initialBlogs.map(blog => new Blog(blog))
    const blogsSave = blogs.map(blog => blog.save())

    await Promise.all(blogsSave)
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

  describe('addition of a new blog', () => {
    test('an authorized user can add a valid blog', async () => {
      const users = await helper.usersInBd()
      const token = helper.userToken(users[0])

      const newBlog = {
        id: '1a234b567b89a676234d17fa',
        title: 'Alejandros book',
        author: 'Alejandro Arco',
        url: 'https://alejandrosbook.com',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type',/application\/json/)

      const blogsEnd = await helper.blogsInBd()

      assert.strictEqual(blogsEnd.length,helper.initialBlogs.length + 1)
      const titleList = blogsEnd.map(b => b.title)
      assert(titleList.includes('Alejandros book'))
    })

    test('an unauthorized user can not add a new blog', async () => {
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
        .expect(401)
        .expect('Content-Type',/application\/json/)

      const blogsEnd = await helper.blogsInBd()

      assert.strictEqual(blogsEnd.length,helper.initialBlogs.length)
      const titleList = blogsEnd.map(b => b.title)
      assert(!titleList.includes('Alejandros book'))
    })

    test('a blog without likes get 0 as default', async () => {
      const users = await helper.usersInBd()
      const token = helper.userToken(users[0])

      const noLikesBlog = {
        id: '1a234b567b89a676234d17fa',
        title: 'Alejandros book',
        author: 'Alejandro Arco',
        url: 'https://alejandrosbook.com'
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(noLikesBlog)
        .expect(201)
        .expect('Content-Type',/application\/json/)

      const blogsEnd = await helper.blogsInBd()
      assert.strictEqual(blogsEnd.length,helper.initialBlogs.length + 1)
      const newBlogLikes = blogsEnd.find(b => b.title === 'Alejandros book').likes
      assert.strictEqual(newBlogLikes, 0)
    })

    test('a blog without title can not be added', async () => {
      const users = await helper.usersInBd()
      const token = helper.userToken(users[0])

      const invalidTitleBlog = {
        id: '1a234b567b89a676234d17fa',
        author: 'Alejandro Arco',
        url: 'https://alejandrosbook.com',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidTitleBlog)
        .expect(400)

      const blogsEnd = await helper.blogsInBd()

      assert.strictEqual(blogsEnd.length,helper.initialBlogs.length)
    })

    test('a blog without url can not be added', async () => {
      const users = await helper.usersInBd()
      const token = helper.userToken(users[0])

      const invalidUrlBlog = {
        title: 'Alejandros book',
        id: '1a234b567b89a676234d17fa',
        author: 'Alejandro Arco',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidUrlBlog)
        .expect(400)

      const blogsEnd = await helper.blogsInBd()

      assert.strictEqual(blogsEnd.length,helper.initialBlogs.length)
    })

  })

  describe('removal of a blog', () => {
    test('an authorized user can delete a blog', async () => {
      const blogsStart = await helper.blogsInBd()
      const blogToDelete = blogsStart[0]
      const user = await User.findById(blogToDelete.user)
      const token = helper.userToken(user)

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsEnd = await helper.blogsInBd()
      const blogsIds = blogsEnd.map(b => b.id)
      assert(!blogsIds.includes(blogToDelete.id))
      assert.strictEqual(blogsStart.length - 1,blogsEnd.length)
    })

    test('an unauthorized user can not delete a blog', async () => {
      const blogsStart = await helper.blogsInBd()
      const blogToDelete = blogsStart[0]
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)

      const blogsEnd = await helper.blogsInBd()
      const blogsIds = blogsEnd.map(b => b.id)
      assert(blogsIds.includes(blogToDelete.id))
      assert.strictEqual(blogsStart.length,blogsEnd.length)
    })

    test('a wrong formed id can not be removed', async () => {
      const blogsStart = await helper.blogsInBd()

      const blogToDelete = {
        title: 'Alejandros book',
        id: '1234',
        author: 'Alejandro Arco',
        likes: 10,
        user: '66dc7c80b813d0b83636af0e'
      }
      const user = await User.findById(blogToDelete.user)
      const token = helper.userToken(user)

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      const blogsEnd = await helper.blogsInBd()
      assert.strictEqual(blogsEnd.length, blogsStart.length)
    })

    test('a not found id is not removing anything', async () => {
      const blogNotInBD = {
        title: 'Alejandros book',
        id: '1a234b567b89a676234d17fa',
        author: 'Alejandro Arco',
        likes: 10,
        user: '66dc7c80b813d0b83636af0e'
      }
      const user = await User.findById(blogNotInBD.user)
      const token = helper.userToken(user)

      const blogsStart = await helper.blogsInBd()
      await api
        .delete(`/api/blogs/${blogNotInBD.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)

      const blogsEnd = await helper.blogsInBd()

      assert.strictEqual(blogsStart.length, blogsEnd.length)

    })
  })

  describe('update of a blog', () => {
    test('an authorized user can update a valid blog', async () => {
      const newBlog =  {
        title: 'Second class tests',
        author: 'Bob C. Martin',
        url: 'https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
      }
      const blogsStart = await helper.blogsInBd()
      const blogToBeUpdated = blogsStart[3]

      const user = await User.findById(blogToBeUpdated.user)
      const token = helper.userToken(user)

      await api
        .put(`/api/blogs/${blogToBeUpdated.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type',/application\/json/)

      const blogsEnd = await helper.blogsInBd()
      assert(blogsEnd.some(b => b.title === newBlog.title))
    })

    test('an unauthorized user can not update a valid blog', async () => {
      const newBlog =  {
        title: 'Second class tests',
        author: 'Bob C. Martin',
        url: 'https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
      }
      const blogsStart = await helper.blogsInBd()
      const blogToBeUpdated = blogsStart[3]

      await api
        .put(`/api/blogs/${blogToBeUpdated.id}`)
        .send(newBlog)
        .expect(401)
        .expect('Content-Type',/application\/json/)

      const blogsEnd = await helper.blogsInBd()
      assert(blogsEnd.some(b => b.title !== newBlog.title))
    })

    test('an invalid blog id can not be updated', async () => {
      const blogInvalid = {
        title: 'Alejandros book',
        id: '1234',
        author: 'Alejandro Arco',
        likes: 10,
        user: '66dc7c80b813d0b83636af0e'
      }

      const user = await User.findById(blogInvalid.user)
      const token = helper.userToken(user)

      await api
        .put(`/api/blogs/${blogInvalid.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      const blogsEnd = await helper.blogsInBd()
      const blogsTitles = blogsEnd.map(b => b.title)

      assert(blogsTitles.some(b => b.title !== blogInvalid.title))
    })

    test('a not found blog id is not updating anything', async () => {
      const blogNotInBD = {
        title: 'Alejandros book',
        id: '1a234b567b89a676234d17fa',
        author: 'Alejandro Arco',
        likes: 10,
        user: '66dc7c80b813d0b83636af0e'
      }
      const user = await User.findById(blogNotInBD.user)
      const token = helper.userToken(user)

      await api
        .put(`/api/blogs/${blogNotInBD.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)

      const blogsEnd = await helper.blogsInBd()
      const blogTitles = blogsEnd.map(b => b.title)

      assert(blogTitles.some(b => blogNotInBD.title !== b.title))
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })

})
