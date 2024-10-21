import { useState, useEffect } from 'react'
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

function App() {
    const [user, setUser] = useState(null)
    const blogFormRef = useRefShare()
    const dispatch = useNotificationDispatch()
    const queryClient = useQueryClient()

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUserBlog')
        if (loggedUser) {
            const parseUser = JSON.parse(loggedUser)
            setUser(parseUser)
            blogsService.setToken(parseUser.token)
        }
    }, [])

    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: blogsService.getAll,
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
            dispatch({ type: 'error', message: 'wrong username or password' })
            setTimeout(() => {
                dispatch('')
            }, 5000)
        }
    }

    const handleLogOut = () => {
        window.localStorage.removeItem('loggedUserBlog')
        dispatch({ type: 'success', message: 'bye, come back soon :)' })
        setTimeout(() => {
            dispatch('')
        }, 5000)
        setUser(null)
    }

    const handleSort = () => {
        const sortedBlogs = [...blogs].sort((bA, bB) => bB.likes - bA.likes)
        queryClient.setQueryData(['blogs'], sortedBlogs)
    }

    return (
        <div>
            <Notification />
            {user === null ? (
                <LoginForm handleSubmit={handleSubmit} />
            ) : (
                <>
                    <h1>blogs</h1>
                    <p>
                        {user.name} logged in
                        <button onClick={handleLogOut}>logout</button>
                    </p>
                    <Toggable label="create new blog" ref={blogFormRef}>
                        <BlogForm />
                    </Toggable>

                    <button onClick={handleSort}>sort by likes</button>

                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} user={user} />
                    ))}
                </>
            )}
        </div>
    )
}

export default App
