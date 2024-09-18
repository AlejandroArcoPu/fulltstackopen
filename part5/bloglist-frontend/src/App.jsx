import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import loginService from './services/login'
import blogsService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import notifications from './utils/notifications'

function App() {

  const [user,setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message,setMessage] = useState(null)
  const [type, setType] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await blogsService.getAll()
      setBlogs(data)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUserBlog')
    if(loggedUser){
      const parseUser = JSON.parse(loggedUser)
      setUser(parseUser)
      blogsService.setToken(parseUser.token)
    }
  }, [])

  const handleSubmit = async ({username,password}) => {
    try{
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem(
        'loggedUserBlog', JSON.stringify(user)
      )
      setUser(user)
      blogsService.setToken(user.token)
    } catch (error) {
      console.log(error)
      notifications.notifyWithTimeout(
        setType,
        setMessage,
        'error',
        'wrong username or password'
      )
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUserBlog')
    notifications.notifyWithTimeout(
      setType,
      setMessage,
      'success',
      'bye, come back soon :)',
    )
    setUser(null)
  }

  const handleSort = () => {
    const sortedBlogs = [...blogs].sort((bA, bB) => bB.likes - bA.likes)
    setBlogs(sortedBlogs)
  }

  const addNewBlog = async ({title,author,url}) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = {
        title,
        author,
        url
      }
      const result = await blogsService.create(newBlog)
      setBlogs(blogs.concat(result))
      notifications.notifyWithTimeout(
        setType,
        setMessage,
        'success',
        `a new blog ${result.title} by ${result.author} added`
      )
    } catch (error) {
      console.log(error)
      notifications.notifyWithTimeout(
        setType,
        setMessage,
        'error',
        `something is wrong with your blog ${error}`
      )
    }
  }

  const increaseBlogLike = async (blogId) => {
    try{
      const blogToUpdate = blogs.find(blog => blog.id === blogId)
      let initialLikes = blogToUpdate.likes
      initialLikes++
      const newBlog = {...blogToUpdate, likes: initialLikes}
      const result = await blogsService.update(blogId,newBlog)
      setBlogs(blogs.map(blog => blog.id === result.id ? result : blog))
    } catch (error) {
      console.log(error)
      notifications.notifyWithTimeout(
        setType,
        setMessage,
        'error',
        'something is wrong with the update'
      )
    }
  }
  
  const removeBlog = async (blogId, blogTitle, blogAuthor) => {
    try{
      if(window.confirm(`Remove blog ${blogTitle} by ${blogAuthor}`)){
        await blogsService.remove(blogId)
        setBlogs(blogs.filter(blog => blog.id !== blogId))
        notifications.notifyWithTimeout(
          setType,
          setMessage,
          'success',
          `the blog ${blogTitle} by ${blogAuthor} removed`
        )
      }
    }catch (error) {
      console.log(error)
      notifications.notifyWithTimeout(
        setType,
        setMessage,
        'error',
        `something is happening with the removal ${error}`
      )
    }
  }

  return (
    <div>
      <Notification message={message} type={type}/>
      { user === null ? ( 
        <LoginForm 
        handleSubmit={handleSubmit} />
      ) : (
        <>
          <h1>blogs</h1>
          <p>{user.name} logged in 
            <button onClick={handleLogOut}>
              logout
            </button>
          </p>
          <Toggable label='create new blog' ref={blogFormRef}>
            <BlogForm 
            createNewBlog={addNewBlog}
            />
          </Toggable>

          <button onClick={handleSort}>sort by likes</button>

          {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} updateBlog={ () => increaseBlogLike(blog.id)} removeBlog={() => removeBlog(blog.id,blog.title,blog.author)} user={user} />
          )}
        </>
      )}
    </div>
  )
}

export default App
