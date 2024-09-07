const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user','username name')
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const userInToken = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: userInToken.id
  })

  userInToken.blogs = userInToken.blogs.concat(blog.id)
  await userInToken.save()
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request,response) => {
  const blog = await Blog.findById(request.params.id)

  const userInToken = request.user

  const userIDInBlog = blog.user.toString()

  if(userInToken.id.toString() === userIDInBlog){
    await Blog.deleteOne({ _id: blog.id })
    response.status(204).end()
  }else{
    response.status(401).json({ error: 'only the creators can delete blogs' })
  }

})

blogsRouter.put('/:id',  middleware.userExtractor, async (request,response) => {
  const blog = await Blog.findById(request.params.id)
  const userInToken = request.user

  if(userInToken.id.toString() === blog.user.toString()){
    const body = request.body
    const newBlog = {
      author: body.author,
      title: body.title,
      likes: body.likes,
      url: body.url
    }
    const result = await Blog.findByIdAndUpdate(request.params.id,newBlog,{ new: true })
    response.json(result)
  }else{
    response.status(401).end()
  }

})

module.exports = blogsRouter