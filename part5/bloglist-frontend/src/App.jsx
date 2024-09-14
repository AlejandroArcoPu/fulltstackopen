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

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username,
        password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
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
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default App
