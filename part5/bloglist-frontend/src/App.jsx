import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import loginService from './services/login'
import blogsService from './services/blogs'

function App() {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

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
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUserBlog')
    setUser(null)
  }
  
  if(user === null) {
    return (
      <div>
        <LoginForm username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword}/>
      </div>
    )
  }
  return (
    <div>
      <h1>blogs</h1>
      <p>{user.username} logged in 
        <button onClick={handleLogOut}>
          logout
        </button>
      </p>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default App
