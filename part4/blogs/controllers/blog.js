const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user','username name')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(request.token)
  const decodedToken= jwt.verify(request.token,process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  user.blogs = user.blogs.concat(blog.id)
  await user.save()
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request,response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)
  if(result){
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request,response) => {
  const body = request.body

  const blog = {
    author: body.author,
    title: body.title,
    likes: body.likes,
    url: body.url
  }

  const result = await Blog.findByIdAndUpdate(request.params.id,blog,{ new: true })
  if(result){
    response.json(result)
  }else{
    response.status(404).end()
  }
})

module.exports = blogsRouter