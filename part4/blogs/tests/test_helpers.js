const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '66dc7c80b813d0b83636af0e',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '66dc7c80b813d0b83636af0e',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '66dc7cd8b813d0b83636af0f',
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '66dc7cd8b813d0b83636af0f',
    __v: 0
  }
]

const initialUsers = [
  {
    _id: '66dc7cd8b813d0b83636af0f' ,
    username: 'root',
    name: 'Alejandro',
    passwordHash: '$2b$10$xwYqKgM4TiB8LNsuF5XnmugxA/tIzftYtBQ6XGiy0SYvVI.QuHMf2',
    blogs: ['5a422b891b54a676234d17fa','5a422b3a1b54a676234d17f9'],
    __v: '0'
  },
  {
    _id: '66dc7c80b813d0b83636af0e' ,
    username: 'alejandroarpu',
    name: 'Alejandro',
    passwordHash: '$2b$10$Z2ICgm4IcRWEdAxQlHnGJuaQuwFaK9q3rdcg9lF.lBKfQcrECavuu',
    blogs: ['5a422a851b54a676234d17f7','5a422aa71b54a676234d17f8'],
    __v: '0'
  }
]

const blogsInBd = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInBd = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const userToken = (user) => {
  const userToken = {
    username: user.username,
    id: user.id
  }
  const token = jwt.sign(userToken,process.env.SECRET, { expiresIn: 60 * 60 })

  return token
}

module.exports = {
  initialBlogs,
  blogsInBd,
  initialUsers,
  usersInBd,
  userToken
}