import { Link } from 'react-router-dom'
import { useUserValue, useUserDispatch } from './UserContext'
import { useNotificationDispatch } from './NotificationContext'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'

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

    // const navbar = {
    //     paddingTop: 10,
    //     paddingLeft: 2,
    //     borderWidth: 1,
    //     marginBottom: 5,
    //     background: 'orange',
    //     gap: 5,
    //     display: 'flex',
    // }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        📝 Blog App
                    </Typography>
                    {/* <div>
                <Link to="/">blogs</Link>
                <Link to="/users">users</Link>
                <strong>{userValue.name}</strong> logged in
            </div> */}
                    <Button
                        onClick={handleLogOut}
                        endIcon={<ExitToAppIcon />}
                        color="inherit"
                    >
                        exit
                    </Button>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        // onClick={handleMenu}s
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar
