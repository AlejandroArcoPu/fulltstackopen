import { Link } from 'react-router-dom'
import { useUserValue, useUserDispatch } from './UserContext'
import { useNotificationDispatch } from './NotificationContext'

const NavBar = () => {
    const userValue = useUserValue()
    const dispatchUser = useUserDispatch()
    const dispatchNotification = useNotificationDispatch()

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

    const navbar = {
        paddingTop: 10,
        paddingLeft: 2,
        borderWidth: 1,
        marginBottom: 5,
        background: 'orange',
        gap: 5,
        display: 'flex',
    }
    return (
        <nav style={navbar}>
            <Link to="/">blogs</Link>
            <Link to="/users">users</Link>
            <strong>{userValue.name}</strong> logged in
            <button onClick={handleLogOut}>logout</button>
        </nav>
    )
}

export default NavBar
