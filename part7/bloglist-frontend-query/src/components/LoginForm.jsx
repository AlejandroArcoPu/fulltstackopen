import loginService from '../services/login'
import blogsService from '../services/blogs'
import { useUserDispatch } from './UserContext'
import { useNotificationDispatch } from './NotificationContext'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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
        <div
            style={{
                display: 'grid',
                placeItems: 'center',
            }}
        >
            <h1>Log in</h1>
            <form
                style={{
                    display: 'grid',
                    placeItems: 'center',
                }}
                onSubmit={handleLogin}
            >
                <div>
                    <TextField
                        required
                        name="username"
                        id="outlined-required"
                        label="Username"
                        sx={{ mb: 2 }}
                    />
                </div>
                <div>
                    <TextField
                        required
                        name="password"
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        sx={{ mb: 2 }}
                    />
                </div>
                <Button type="submit" variant="outlined">
                    login
                </Button>
            </form>
        </div>
    )
}

export default LoginForm
