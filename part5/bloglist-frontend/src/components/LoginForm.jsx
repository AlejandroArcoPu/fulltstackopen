const LoginForm = ({username,password, handleLogin, handleUsername, handlePassword}) => {
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
        onChange={handleUsername}/>
      </div>
      <div>
        password
        <input 
        name="password" 
        type="password"
        value={password}
        onChange={handlePassword}/>
      </div>
      <button type="submit">login</button>
  </form>
  </div>
  )
}

export default LoginForm