import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import loginService from './services/login'
import blogsService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

function App() {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [author,setAuthor] = useState('')
  const [title,setTitle] = useState('')
  const [url,setUrl] = useState('')
  const [message,setMessage] = useState(null)
  const [type, setType] = useState(null)


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
      setType('success')
      setMessage(
        `login successfully`
      )
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 5000)
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

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
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
      setTitle('')
      setAuthor('')
      setUrl('')
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
  
  return (
    <div>
      <Notification message={message} type={type}/>
      { user === null ? ( 
        <LoginForm 
        username={username} 
        password={password} 
        handleLogin={handleLogin} 
        setUsername={setUsername} 
        setPassword={setPassword}/>
      ) : (
        <>
          <h1>blogs</h1>
          <p>{user.username} logged in 
            <button onClick={handleLogOut}>
              logout
            </button>
          </p>
          
          <h1>create new</h1>
          <BlogForm title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} handleNewBlog={handleNewBlog}/>
          {blogs.map(blog => 
            <Blog key={blog.id} blog={blog}/>
          )}
        </>
      )}
    </div>
  )
}

export default App
