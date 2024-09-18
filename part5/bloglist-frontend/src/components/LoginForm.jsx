import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit }) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    handleSubmit({username,password})
    setUsername('')
    setPassword('')
  }

  return (
    <div>
    <h1>log in to application</h1>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
        name="username" 
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password
        <input 
        name="password" 
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type="submit">login</button>
  </form>
  </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm