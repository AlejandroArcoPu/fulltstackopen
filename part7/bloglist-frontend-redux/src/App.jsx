import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import blogsService from './services/blogs'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'

function App() {
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUserBlog')
        if (loggedUser) {
            const parseUser = JSON.parse(loggedUser)
            setUser(parseUser)
            blogsService.setToken(parseUser.token)
        }
    }, [])

    const handleSubmit = async ({ username, password }) => {
        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem('loggedUserBlog', JSON.stringify(user))
            setUser(user)
            blogsService.setToken(user.token)
        } catch (error) {
            console.log(error)
            dispatch(
                setNotification({
                    type: 'error',
                    notification: 'wrong username or password',
                })
            )
        }
    }

    const handleLogOut = () => {
        window.localStorage.removeItem('loggedUserBlog')
        dispatch(
            setNotification({
                type: 'success',
                notification: 'bye, come back soon :)',
            })
        )
        setUser(null)
    }

    return (
        <div>
            <Notification />
            {user === null ? (
                <LoginForm handleSubmit={handleSubmit} />
            ) : (
                <BlogList user={user} handleLogOut={handleLogOut} />
            )}
        </div>
    )
}

export default App
