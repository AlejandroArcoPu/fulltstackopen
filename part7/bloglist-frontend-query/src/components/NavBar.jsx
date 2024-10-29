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
import MenuIcon from '@mui/icons-material/Menu'

const NavBar = () => {
    const userValue = useUserValue()
    const dispatchUser = useUserDispatch()
    const dispatchNotification = useNotificationDispatch()
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)

    const handleMenuNav = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleMenuUser = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNav = () => {
        setAnchorElNav(null)
    }

    const handleCloseUser = () => {
        setAnchorElUser(null)
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

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenuNav}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNav}
                    >
                        <MenuItem component={Link} to="/">
                            Blogs
                        </MenuItem>
                        <MenuItem component={Link} to="/users">
                            Users
                        </MenuItem>
                    </Menu>
                </Box>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    📝 Blogs
                </Typography>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenuUser}
                    color="inherit"
                >
                    <Avatar sx={{ width: 32, height: 32 }}>
                        {userValue.name[0]}
                    </Avatar>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUser}
                >
                    <MenuItem onClick={handleCloseUser}>
                        <Avatar style={{ marginRight: 10 }} /> {userValue.name}
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
    )
}

export default NavBar
