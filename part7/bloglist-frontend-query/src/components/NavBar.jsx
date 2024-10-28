import { Link } from 'react-router-dom'
import { useState } from 'react'
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
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import ListItemIcon from '@mui/material/ListItemIcon'
import Logout from '@mui/icons-material/Logout'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'

const NavBar = () => {
    const userValue = useUserValue()
    const dispatchUser = useUserDispatch()
    const dispatchNotification = useNotificationDispatch()
    const [anchorEl, setAnchorEl] = useState(null)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
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
            </div> */}

                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>
                            {userValue.name[0]}
                        </Avatar>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <Avatar style={{ marginRight: 10 }} />{' '}
                            {userValue.name}
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogOut}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar
