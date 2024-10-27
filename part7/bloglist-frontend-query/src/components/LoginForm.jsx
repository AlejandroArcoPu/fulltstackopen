import PropTypes from 'prop-types'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import { useUserDispatch } from './UserContext'
import { useNotificationDispatch } from './NotificationContext'

const LoginForm = () => {
    const dispatchUser = useUserDispatch()
    const dispatchNotification = useNotificationDispatch()
    const handleLogin = async (event) => {
        try {
            event.preventDefault()
            const username = event.target.username.value
            const password = event.target.password.value
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem('loggedUserBlog', JSON.stringify(user))
            dispatchUser({ type: 'login', user: user })
            blogsService.setToken(user.token)
        } catch (error) {
            console.log(error)
            dispatchNotification({
                type: 'error',
                message: 'wrong username or password',
            })
            setTimeout(() => {
                dispatchNotification('')
            }, 5000)
        }
    }

    return (
        <div>
            <h1>log in to application</h1>
            <form onSubmit={handleLogin}>
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
