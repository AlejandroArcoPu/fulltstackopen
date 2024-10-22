import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogsService from '../services/blogs'

const initialState = null

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            return action.payload
        },
        logout(state, action) {
            return null
        },
    },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer

export const setLogin = (user) => {
    return async (dispatch) => {
        const response = await loginService.login(user)
        dispatch(login(response))
        window.localStorage.setItem('loggedUserBlog', JSON.stringify(response))
        blogsService.setToken(response.token)
    }
}

export const setLogout = () => {
    return (dispatch) => {
        window.localStorage.removeItem('loggedUserBlog')
        dispatch(logout())
    }
}

export const setUser = (user) => {
    return async (dispatch) => {
        dispatch(login(user))
        blogsService.setToken(user.token)
    }
}
