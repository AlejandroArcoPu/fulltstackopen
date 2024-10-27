import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import loginService from './services/login'
import blogsService from './services/blogs'
import Notification from './components/Notification'
import { useNotificationDispatch } from './components/NotificationContext'
import { useQuery } from '@tanstack/react-query'
import { useUserDispatch, useUserValue } from './components/UserContext'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import userServices from './services/users'
import User from './components/user'

import {
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useMatch,
    useNavigate,
} from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {
    const dispatchNotification = useNotificationDispatch()
    const dispatchUser = useUserDispatch()
    const userValue = useUserValue()
    const matchUsers = useMatch('/users/:id')
    const matchBlogs = useMatch('/blogs/:id')

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUserBlog')
        if (loggedUser) {
            const parseUser = JSON.parse(loggedUser)
            dispatchUser({ type: 'login', user: parseUser })
            blogsService.setToken(parseUser.token)
        }
    }, [])

    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: blogsService.getAll,
        retry: 1,
    })

    const resultUsers = useQuery({
        queryFn: userServices.getAll,
        queryKey: ['users'],
        retry: 1,
    })

    if (result.isPending) {
        return <span>Loading data...</span>
    }

    if (result.isError) {
        return (
            <span>blogs service not available due to problems in server</span>
        )
    }

    const blogs = result.data
    const users = resultUsers.data

    const handleSubmit = async ({ username, password }) => {
        try {
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

    const user = matchUsers
        ? users.find((user) => user.id === matchUsers.params.id)
        : null

    const blog = matchBlogs
        ? blogs.find((blog) => blog.id === matchBlogs.params.id)
        : null

    return (
        <div>
            <Notification />
            {userValue === null ? (
                <LoginForm handleSubmit={handleSubmit} />
            ) : (
                <>
                    <NavBar />

                    <h1>blog app</h1>

                    <Routes>
                        <Route path="/" element={<BlogList blogs={blogs} />} />
                        <Route
                            path="/users"
                            element={<UserList users={users} />}
                        />
                        <Route
                            path="/users/:id"
                            element={<User user={user} />}
                        />
                        <Route
                            path="/blogs/:id"
                            element={<Blog blog={blog} />}
                        />
                    </Routes>
                </>
            )}
        </div>
    )
}

export default App
