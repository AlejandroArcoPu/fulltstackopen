import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import loginService from './services/login'
import blogsService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'

function App() {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()
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
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
      setType('error')
      setMessage(
        `wrong username or password`
      )
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUserBlog')
    setType('success')
    setMessage(
      `bye, come back soon :)`
    )
    setTimeout(() => {
      setMessage(null)
      setType(null)
    }, 5000)
    setUser(null)
  }

  const addNewBlog = async ({title,author,url}) => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogsService.create({title,author,url})
      setBlogs(blogs.concat(response))
      setType('success')
      setMessage(
        `a new blog ${response.title} by ${response.author} added`
      )
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 5000)
      
    } catch (error) {
      console.log(error)
      setType('error')
      setMessage(
        `something is wrong with your blog ${error}`
      )
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 5000)
    }
  }

  const increaseBlogLike = async (blogId) => {
    try{
      const blogToUpdate = blogs.find(blog => blog.id === blogId)
      let initialLikes = blogToUpdate.likes
      initialLikes++
      const newBlog = {...blogToUpdate, likes: initialLikes}
      const result = await blogsService.update(blogId,newBlog)
      setBlogs(blogs.map(blog => blog.id === result.id ? newBlog : blog))
    } catch (error) {
      console.log(error)
      setType('error')
      setMessage('something is wrong with the update', error)
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 5000)
    }
  }
  
  return (
    <div>
      <Notification message={message} type={type}/>
      { user === null ? ( 
        <LoginForm 
        username={username} 
        password={password} 
        handleLogin={handleLogin} 
        handleUsername={({ target }) => setUsername(target.value)} 
        handlePassword={({ target }) => setPassword(target.value)}/>
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

          {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} updateBlog={ () => increaseBlogLike(blog.id)}/>
          )}
        </>
      )}
    </div>
  )
}

export default App
