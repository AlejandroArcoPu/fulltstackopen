import { useState } from 'react'
import LoginForm from './components/LoginForm'
import loginService from './services/login'

function App() {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)

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
  
  return (
    <>
      <LoginForm username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword}/>
      <Blog></Blog>
    </>
  )
}

export default App
