import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import loginService from './services/login'
import blogsService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import { useNotificationDispatch } from './components/NotificationContext'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { useRefShare } from './components/ToggableContext'
import { useUserDispatch, useUserValue } from './components/UserContext'
import UserList from './components/UserList'
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

function App() {
    const blogFormRef = useRefShare()
    const dispatchNotification = useNotificationDispatch()
    const dispatchUser = useUserDispatch()
    const userValue = useUserValue()
    const queryClient = useQueryClient()
    const match = useMatch('/users/:id')

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
    // console.log(match)
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

    const handleLogOut = () => {
        window.localStorage.removeItem('loggedUserBlog')
        dispatchUser({ type: 'logout' })
        dispatchNotification({
            type: 'success',
            message: 'bye, come back soon :)',
        })
        setTimeout(() => {
            dispatchNotification('')
        }, 5000)
    }

    const handleSort = () => {
        const sortedBlogs = [...blogs].sort((bA, bB) => bB.likes - bA.likes)
        queryClient.setQueryData(['blogs'], sortedBlogs)
    }

    const user = match
        ? users.find((user) => user.id === Number(match.params.id))
        : null

    return (
        <div>
            <Notification />
            {userValue === null ? (
                <LoginForm handleSubmit={handleSubmit} />
            ) : (
                <>
                    <h1>blogs</h1>
                    <p>{userValue.name} logged in</p>
                    <button onClick={handleLogOut}>logout</button>

                    {/* <Toggable label="create new blog" ref={blogFormRef}>
                        <BlogForm />
                    </Toggable>

                    <button onClick={handleSort}>sort by likes</button>

                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))} */}
                    <Routes>
                        <Route
                            path="/users"
                            element={<UserList users={users} />}
                        />
                        <Route
                            path="/users/:id"
                            element={<User user={user} />}
                        />
                    </Routes>
                </>
            )}
        </div>
    )
}

export default App
