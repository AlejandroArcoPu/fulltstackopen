import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import blogsService from './services/blogs'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, setBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'

function App() {
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    const blogs = useSelector((state) => state.blogs)

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

    const increaseBlogLike = async (blogId) => {
        try {
            const blogToUpdate = blogs.find((blog) => blog.id === blogId)
            let initialLikes = blogToUpdate.likes
            initialLikes++
            const newBlog = { ...blogToUpdate, likes: initialLikes }
            const result = await blogsService.update(blogId, newBlog)
            setBlogs(
                blogs.map((blog) => (blog.id === result.id ? result : blog))
            )
        } catch (error) {
            console.log(error)
            dispatch(
                setNotification({
                    type: 'error',
                    notification: 'something is wrong with the update',
                })
            )
        }
    }

    const removeBlog = async (blogId, blogTitle, blogAuthor) => {
        try {
            if (window.confirm(`Remove blog ${blogTitle} by ${blogAuthor}`)) {
                await blogsService.remove(blogId)
                setBlogs(blogs.filter((blog) => blog.id !== blogId))
                dispatch(
                    setNotification({
                        type: 'success',
                        notification: `the blog ${blogTitle} by ${blogAuthor} removed`,
                    })
                )
            }
        } catch (error) {
            console.log(error)
            dispatch(
                setNotification({
                    type: 'error',
                    notification: `something is happening with the removal ${error}`,
                })
            )
        }
    }

    return (
        <div>
            <Notification />
            {user === null ? (
                <LoginForm handleSubmit={handleSubmit} />
            ) : (
                <BlogList
                    user={user}
                    handleLogOut={handleLogOut}
                    increaseBlogLike={increaseBlogLike}
                    removeBlog={removeBlog}
                />
            )}
        </div>
    )
}

export default App
