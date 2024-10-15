import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { setUser } from './reducers/userReducer'

function App() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(initializeBlogs())
        const loggedUser = window.localStorage.getItem('loggedUserBlog')
        if (loggedUser) {
            const parseUser = JSON.parse(loggedUser)
            dispatch(setUser(parseUser))
        }
    }, [])

    return (
        <div>
            <Notification />
            {user === null ? <LoginForm /> : <BlogList />}
        </div>
    )
}

export default App
