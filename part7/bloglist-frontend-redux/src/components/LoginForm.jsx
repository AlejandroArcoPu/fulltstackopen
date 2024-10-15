import { useDispatch } from 'react-redux'
import { setLogin } from '../reducers/userReducer'

const LoginForm = () => {
    const dispatch = useDispatch()

    const handleLogin = (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        dispatch(setLogin({ username: username, password: password }))
        event.target.username.value = ''
        event.target.password.value = ''
    }

    return (
        <div>
            <h1>log in to application</h1>
            <form onSubmit={(e) => handleLogin(e)}>
                <div>
                    username
                    <input name="username" type="text" data-testid="username" />
                </div>
                <div>
                    password
                    <input
                        name="password"
                        type="password"
                        data-testid="password"
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
