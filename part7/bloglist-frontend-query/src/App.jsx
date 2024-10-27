import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { useUserDispatch, useUserValue } from './components/UserContext'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import userServices from './services/users'
import User from './components/user'
import { jwtDecode } from 'jwt-decode'

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
    const dispatchUser = useUserDispatch()
    const userValue = useUserValue()
    const matchUsers = useMatch('/users/:id')
    const matchBlogs = useMatch('/blogs/:id')

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUserBlog')

        if (loggedUser) {
            const decodedToken = jwtDecode(JSON.parse(loggedUser).token)
            let currentDate = new Date()
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                dispatchUser({ type: 'logout' })
                window.localStorage.removeItem('loggedUserBlog')
            } else {
                const parseUser = JSON.parse(loggedUser)
                dispatchUser({ type: 'login', user: parseUser })
                blogsService.setToken(parseUser.token)
            }
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

    const user = matchUsers
        ? users.find((user) => user.id === matchUsers.params.id)
        : null

    const blog = matchBlogs
        ? blogs.find((blog) => blog.id === matchBlogs.params.id)
        : null

    return (
        <>
            <Notification />
            {userValue === null ? (
                <LoginForm />
            ) : (
                <>
                    <NavBar />

                    <h1>blog app 📝</h1>

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
        </>
    )
}

export default App
